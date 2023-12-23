// IMPORTS ===================================
// ===========================================
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <ctype.h>

#include <jansson.h>




// db imports
#include <sqlite3.h>

// json imports ???
// #include <jansson.h>
// ===========================================

#define PORT 8080
#define MAX_CONNECTIONS 5
#define MAX_BUFFER_SIZE 1024


// STRUCTS ===================================
typedef struct {
    int is_authenticated;
    int user_id;
} User;
typedef struct {
    int id;
    char *email;
    char *name;
    char *surname;
    char *password;
} DbUser;
typedef struct {
    int size;
    char keys[7][255];
    char values[7][255];
    int valid;
} Payload;
typedef struct {
    int status_code;
    char *status_code_info;
    char *data;
} Response;
typedef struct {
    int message_id;
    int author_id;
    char *created;
    char *text;
} ChatMessage;
typedef struct {
    ChatMessage *messages; // Dynamiczna tablica wiadomości
    int count;             // Licznik wiadomości
} ChatMessages;

// ===========================================


char *required_login_payload[] = {"email", "password"};
char *required_register_payload[] = {"name", "surname", "email", "password"};
char *required_add_friend_payload[] = {"user_id"};
char *required_message_payload[] = {"user_id", "message"};
char *required_get_chat_payload[] = {"user_id"};

// STATUS CODES ==============================

void set_status_code_200(Response *response) {
    response->status_code = 200;
    response->status_code_info = "OK";
}
void set_status_code_204(Response *response) {
    response->status_code = 204;
    response->status_code_info = "NO CONTENT";
}
void set_status_code_400(Response *response) {
    response->status_code = 400;
    response->status_code_info = "BAD REQUEST";
}
void set_status_code_401(Response *response) {
    response->status_code = 401;
    response->status_code_info = "UNAUTHORIZED";
}
void set_status_code_403(Response *response) {
    response->status_code = 403;
    response->status_code_info = "FORBIDDEN";
}
void set_status_code_404(Response *response) {
    response->status_code = 404;
    response->status_code_info = "NOT FOUND";
}

// ===========================================

// UTILS =====================================

void get_payload(const char *request, Payload *payload, int expected_size) {
    payload->valid = 0;
    const char *payload_start = strstr(request, "\r\n\r\n");
    if (payload_start == NULL) {
        return;
    }

    // Przesuń wskaźnik, aby wskazywał na początek payloadu JSON.
    payload_start += 4;

    // Parsowanie JSON
    json_t *root;
    json_error_t error;
    root = json_loads(payload_start, 0, &error);

    if (!root) {
        // Błąd parsowania
        fprintf(stderr, "JSON error: on line %d: %s\n", error.line, error.text);
        return;
    }

    // Sprawdzanie, czy obiekt JSON jest słownikiem
    if (!json_is_object(root)) {
        fprintf(stderr, "error: root is not an object\n");
        json_decref(root);
        return;
    }

    const char *key;
    json_t *value;
    payload->size = 0;

    json_object_foreach(root, key, value) {
        if (payload->size >= expected_size) {
            break; // Przerwij, jeśli osiągnięto oczekiwaną ilość elementów
        }
        strncpy(payload->keys[payload->size], key, sizeof(payload->keys[payload->size]) - 1);
        strncpy(payload->values[payload->size], json_string_value(value), sizeof(payload->values[payload->size]) - 1);
        payload->size++;
    }

    json_decref(root);
    payload->valid = 1;
}


int validate_payload(char* required_payload[], size_t payloadSize, Payload *payload) {    
    printf("Keys:\n");
    for (size_t i = 0; i < payload->size; ++i) {
        printf("Key[%zu]: \"%s\"\n", i, payload->keys[i]);
        printf("Value[%zu]: \"%s\"\n", i, payload->values[i]);
    }

    for (size_t i = 0; i < payloadSize; i++) {

        if(strcmp(required_payload[i], payload->keys[i]) != 0) {
            printf("left:%sright:%sKONIEC \n", required_payload[i], payload->keys[i]);
            return 0;
        }
    }

    return 1;
}

// ===========================================

// CALLBACKS =================================

static int user_callback(void *NotUsed, int argc, char **argv, char **azColName) {
    int i;
    DbUser *user = (DbUser *)NotUsed;
    for (i = 0; i < argc; i++) {
        if (strcmp(azColName[i], "id") == 0) {
            user->id = atoi(argv[i]);
        } else if (strcmp(azColName[i], "name") == 0) {
            user->name = strdup(argv[i]);
        } else if (strcmp(azColName[i], "surname") == 0) {
            user->surname = strdup(argv[i]);
        } else if (strcmp(azColName[i], "email") == 0) {
            user->email = strdup(argv[i]);
        } else if (strcmp(azColName[i], "password") == 0) {
            user->password = strdup(argv[i]);
        }
    }
    return 0;
}

static int chat_callback(void *data, int argc, char **argv, char **azColName) {
    ChatMessages *chatData = (ChatMessages *)data;

    // Alokacja pamięci dla pojedynczej wiadomości
    ChatMessage *message = malloc(sizeof(ChatMessage));
    if (!message) {
        fprintf(stderr, "Memory allocation failed.\n");
        return 1; // Zwracanie 1 w przypadku błędu
    }

    // Inicjalizacja pól struktury na NULL
    memset(message, 0, sizeof(ChatMessage));

    for (int i = 0; i < argc; i++) {
        if (strcmp(azColName[i], "message_id") == 0) {
            message->message_id = atoi(argv[i] ? argv[i] : "0");
        } else if (strcmp(azColName[i], "author_id") == 0) {
            message->author_id = atoi(argv[i] ? argv[i] : "0");
        } else if (strcmp(azColName[i], "created") == 0) {
            message->created = argv[i] ? strdup(argv[i]) : NULL;
        } else if (strcmp(azColName[i], "message") == 0) {
            message->text = argv[i] ? strdup(argv[i]) : NULL;
        }
    }

    // Realokacja tablicy wiadomości i dodanie nowej wiadomości
    chatData->messages = realloc(chatData->messages, (chatData->count + 1) * sizeof(ChatMessage));
    if (!chatData->messages) {
        free(message->created); // Zwolnienie pamięci, jeśli została już zaalokowana
        free(message->text);
        free(message);
        return 1;
    }

    chatData->messages[chatData->count] = *message;
    chatData->count++;

    free(message); // Zwolnienie tymczasowej struktury ChatMessage
    return 0;
}


int callback(void *NotUsed, int argc, char **argv, char **azColName) {
    NotUsed = 0;
    for (int i = 0; i < argc; i++) {

        printf("%s = %s\n", azColName[i], argv[i] ? argv[i] : "NULL");
    }
    return 0;
}

// ===========================================


// DATABASE ==================================

DbUser get_user_by_email(sqlite3 *db, char * user_email, int *ok) {
    DbUser user = {0};
    char sql[255];
    sprintf(sql, "SELECT * FROM users WHERE email=\"%s\"", user_email);
    int rc = sqlite3_exec(db, sql, user_callback, &user, 0);
    if (rc != SQLITE_OK) {
        *ok = 0;
        fprintf(stderr, "SQL error: %s\n", sqlite3_errmsg(db));
    } else {
        *ok = 1;
    }
    return user;
}

int add_user(sqlite3 *db, const char *name, const char *surname, const char *email, const char *password) {
    printf("PRINT0\n");
    char sql[255];
    sprintf(sql, "INSERT INTO users (email, name, surname, password) VALUES ('%s', '%s', '%s', '%s');", email, name, surname, password);

    //printf("SQLPRZED: %s\n", sql);
    int rc = sqlite3_exec(db, sql, 0, 0, 0);

    printf("PRINT0,5\n");
    if (rc != SQLITE_OK) {
        printf("PRINT1\n");
        fprintf(stderr, "SQL error: %s\n", sqlite3_errmsg(db));
        return 0;
    } else {
        printf("User added successfully.\n");
        return 1;
    }
}

int add_friend(sqlite3 *db, int main_id, int related_id) {
    char sql[255];
    sprintf(sql, "INSERT INTO friends (main_id, related_id) VALUES (%d, %d);", main_id, related_id);
    int rc = sqlite3_exec(db, sql, 0, 0, 0);

    if (rc != SQLITE_OK) {
        fprintf(stderr, "SQL error: %s\n", sqlite3_errmsg(db));
        return 0;
    } else {
        printf("Friend added successfully.\n");
        return 1;
    }
}

int create_message(sqlite3 *db, int author_id, int target_id, const char *message) {
    char sql[255];
    sprintf(sql, "INSERT INTO messages (author_id, target_id, message) VALUES (%d, %d, '%s');", author_id, target_id, message);
    int rc = sqlite3_exec(db, sql, 0, 0, 0);

    if (rc != SQLITE_OK) {
        fprintf(stderr, "SQL error: %s\n", sqlite3_errmsg(db));
        return 0;
    } else {
        printf("Message created successfully.\n");
        return 1;
    }
}

void setup_db(sqlite3 *db, int rc) {
    const char *create_table_sql = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, name TEXT, surname TEXT, password TEXT);";
    rc = sqlite3_exec(db, create_table_sql, 0, 0, 0);

    if (rc != SQLITE_OK) {
        fprintf(stderr, "SQL error: %s\n", sqlite3_errmsg(db));
        sqlite3_close(db);
        return;
    } else {
        printf("SQL status OK\n");
    }

    // Create 'friends' table
    const char *create_friends_table_sql = 
        "CREATE TABLE IF NOT EXISTS friends ("
        "main_id INTEGER, "
        "related_id INTEGER);";
    rc = sqlite3_exec(db, create_friends_table_sql, 0, 0, 0);

    // Create 'messages' table
    const char *create_messages_table_sql = 
        "CREATE TABLE IF NOT EXISTS messages ("
        "message_id INTEGER PRIMARY KEY AUTOINCREMENT, "
        "author_id INTEGER, "
        "target_id INTEGER, "
        "message TEXT, "
        "created DATETIME DEFAULT CURRENT_TIMESTAMP);";
    rc = sqlite3_exec(db, create_messages_table_sql, 0, 0, 0);
}

ChatMessage* get_chat(sqlite3 *db, int author_id, int target_id, int *message_count) {
    char sql[1024];
    sprintf(sql, "SELECT * FROM messages WHERE (author_id = %d AND target_id = %d) OR (author_id = %d AND target_id = %d);", author_id, target_id, target_id, author_id);

    ChatMessages chatData = {NULL, 0};
    int rc = sqlite3_exec(db, sql, chat_callback, &chatData, NULL);

    if (rc != SQLITE_OK) {
        fprintf(stderr, "SQL error: %s\n", sqlite3_errmsg(db));
        for (int i = 0; i < chatData.count; i++) {
            free(chatData.messages[i].created);
            free(chatData.messages[i].text);
        }
        free(chatData.messages);
        return NULL;
    }

    *message_count = chatData.count;
    return chatData.messages;
}


void sample_database(sqlite3 *db) {
    add_user(db, "zbyszek@test.pl", "Zbyszek", "Wytryszek", "pass1234");
    add_user(db, "zosia@test.pl", "Zosia", "Samosia", "pass1234");
}
// ===========================================

// LOGS ======================================

void log_call(const char * method, const char *path, User user) {
    const char *temp_authorized = "false";
    if(user.is_authenticated == 1) {
        temp_authorized = "true";
    }
    printf("(log) <-- Method: %s Endpoint: %s Authorized: %s user_id: %d\n", method, path, temp_authorized, user.user_id);
    return;
}

void log_response(const char * method, const char *path, User user) {
    printf("(log) --> Method\n");
    return;
}
// ===========================================

// MIDDLEWARES ===============================

int get_user_by_auth_header(const char *authorization) {
    int user_id;
    const char *client_prefix = "CLIENT";
    const char *client_ptr = strstr(authorization, client_prefix);

    if (client_ptr != NULL) {
        client_ptr += strlen(client_prefix);

        // Konwersja na liczby całkowite
        char *endptr;
        user_id = strtol(client_ptr, &endptr, 10);
        if (endptr != client_ptr && *endptr == '\0') {
            return user_id;
        }
    }

    return -1;
}

void get_header_value_by_key(const char *headers, const char *key, char *value, size_t value_size) {
    const char *key_start = strstr(headers, key);
    if (key_start != NULL) {
        key_start += strlen(key);
        const char *value_start = strchr(key_start, ' ');
        const char *value_end = strchr(key_start, '\r');
        if (value_start != NULL && value_end != NULL && value_start < value_end) {
            snprintf(value, value_size, "%.*s", (int)(value_end - value_start), value_start);
        }
    }
}


User middleware_auth(const char *request) {
    User user;
    user.is_authenticated = 0;
    user.user_id = -1;

    const char *headers_start = strstr(request, "\r\n") + 2;
    const char *headers_end = strstr(headers_start, "\r\n\r\n");
    if (headers_start != NULL && headers_end != NULL) {
        char authorization[MAX_BUFFER_SIZE];
        get_header_value_by_key(headers_start, "Authorization", authorization, sizeof(authorization));
        printf("Authorization Header: %s\n", authorization);
        user.user_id = get_user_by_auth_header(authorization);
        if (user.user_id > 0) {
            user.is_authenticated = 1;
        }
    }
    return user;
}

// ===========================================

// ENDPOINTS =================================


void endpoint_register(sqlite3 *db, const char *request, Response *response_object, Response *response) {
    Payload payload;
    get_payload(request, &payload, 5);

    DbUser user;
    user.id = -1;

    // validation
    int validation_status = 1;

    if (payload.valid == 0) {
        validation_status = 0;
    } else {
        size_t payloadSize = sizeof(required_register_payload) / sizeof(required_register_payload[0]);
        validation_status = validate_payload(required_register_payload, payloadSize, &payload);
    }
    if (validation_status == 0) {
        response_object->status_code = 400;
        response_object->data = "{ \"message\": \"Invalid Payload\" }";
        return;
    }

    int status = add_user(
        db,
        payload.values[0],
        payload.values[1],
        payload.values[2],
        payload.values[3]
    );

    if (status == 1) {
        int ok;
        DbUser db_user = get_user_by_email(db, payload.values[2], &ok);
        if (ok == 1) {
            set_status_code_200(response_object);
            snprintf(response, 255, "{ \"id\": \"%d\", \"email\": \"%s\", \"name\": \"%s\", \"surname\": \"%s\"}", db_user.id, db_user.email, db_user.name, db_user.surname);
            return;
        }
    }
    set_status_code_400(response_object);
    response_object->data = "{ \"message\": \"Something went wrong UNEXPECTED ERROR.\" }";
    return;
}


void endpoint_login(sqlite3 *db, const char *request, Response *response_object, Response *response) {
    Payload payload;
    get_payload(request, &payload, 2);

    DbUser user;
    user.id = -1;
    int validation_status = 1;

    if (payload.valid == 0) {
        validation_status = 0;
    } else {
        size_t payloadSize = sizeof(required_login_payload) / sizeof(required_login_payload[0]);
        validation_status = validate_payload(required_login_payload, payloadSize, &payload);
    }
    if (validation_status == 0) {
        set_status_code_400(response_object);
        snprintf(response, 100, "{ \"message\": \"Invalid Payload\" }");
        return;
    }

    int ok;
    DbUser db_user = get_user_by_email(db, payload.values[0], &ok);
    if (ok == 1) {
        if(db_user.id == NULL) {
            set_status_code_400(response_object);
            snprintf(response, 100, "{ \"message\": \"User does not exist.\" }");
            return;
        }

        if(strcmp(db_user.password, payload.values[1]) == 0) {
            set_status_code_200(response_object);
            snprintf(response, 255, "{ \"id\": \"%d\" }", db_user.id);
            return;
        }
        printf("left:%sright:%sKONIEC \n", db_user.password, payload.values[1]);
        set_status_code_400(response_object);
        snprintf(response, 100, "{ \"message\": \"Invalid password.\" }");
        return;
    }
    set_status_code_400(response_object);
    snprintf(response, 100, "{ \"message\": \"Something went wrong.\" }");
    return;
}

void endpoint_add_friend(sqlite3 *db, const char *request, Response *response_object, Response *response, User authenticated_user) {
    Payload payload;
    get_payload(request, &payload, 1);

    DbUser user;
    user.id = -1;
    int validation_status = 1;

    if (payload.valid == 0) {
        validation_status = 0;
    } else {
        size_t payloadSize = sizeof(required_add_friend_payload) / sizeof(required_add_friend_payload[0]);
        validation_status = validate_payload(required_add_friend_payload, payloadSize, &payload);
    }
    if (validation_status == 0) {
        set_status_code_400(response_object);
        snprintf(response, 100, "{ \"message\": \"Invalid Payload\" }");
        return;
    }

    int status = add_friend(
        db,
        authenticated_user.user_id,
        atoi(payload.values[0])
    );

    if (status == 1) {
        set_status_code_204(response_object);
        snprintf(response, 2, "");
        return;
    }
    set_status_code_400(response_object);
    snprintf(response, 100, "{ \"message\": \"Something went wrong.\" }");
    return;
}

char* convert_messages_to_json(ChatMessage *messages, int message_count) {
    // Przy założeniu, że pojedynczy JSON nie przekracza 512 znaków
    int buffer_size = message_count * 512;
    char *json_result = malloc(buffer_size);
    if (json_result == NULL) {
        return NULL;
    }

    strcpy(json_result, "[");
    for (int i = 0; i < message_count; i++) {
        char message_json[512];
        snprintf(message_json, sizeof(message_json), 
                 "{\"_id\": %d, \"createdAt\": \"%s\", \"text\": \"%s\", \"user\": {\"_id\": %d}}%s", 
                 messages[i].message_id, messages[i].created, messages[i].text, messages[i].author_id, 
                 (i < message_count - 1) ? ", " : "");

        strcat(json_result, message_json);
    }
    strcat(json_result, "]");

    return json_result;
}


void endpoint_chat(sqlite3 *db, const char *request, Response *response_object, char *response, User authenticated_user) {
    Payload payload;
    get_payload(request, &payload, 1);

    if (payload.valid == 0 || authenticated_user.is_authenticated == 0) {
        set_status_code_400(response_object);
        snprintf(response, 100, "{ \"message\": \"Invalid request or unauthorized.\" }");
        return;
    }

    size_t payloadSize = sizeof(required_get_chat_payload) / sizeof(required_get_chat_payload[0]);
    if (!validate_payload(required_get_chat_payload, payloadSize, &payload)) {
        set_status_code_400(response_object);
        snprintf(response, 100, "{ \"message\": \"Invalid Payload\" }");
        return;
    }

    int target_id = atoi(payload.values[0]);
    int message_count;
    ChatMessage *messages = get_chat(db, authenticated_user.user_id, target_id, &message_count);

    printf("messages count %d\n", message_count);

    if (messages == NULL) {
        set_status_code_404(response_object);
        snprintf(response, MAX_BUFFER_SIZE, "{ \"message\": \"No messages found.\" }");
        return;
    }

    // Zakładając, że masz funkcję do konwersji ChatMessage na JSON.
    char *json_result = convert_messages_to_json(messages, message_count);
    
    set_status_code_200(response_object);
    snprintf(response, MAX_BUFFER_SIZE, "%s", json_result);

    // Zwolnienie pamięci
    for (int i = 0; i < message_count; i++) {
        free(messages[i].created);
        free(messages[i].text);
    }
    free(messages);
    free(json_result);
}


void endpoint_message(sqlite3 *db, const char *request, Response *response_object, Response *response, User authenticated_user) {
    Payload payload;
    get_payload(request, &payload, 2);

    int validation_status = 1;

    if (payload.valid == 0) {
        validation_status = 0;
    } else {
        size_t payloadSize = sizeof(required_message_payload) / sizeof(required_message_payload[0]);
        validation_status = validate_payload(required_message_payload, payloadSize, &payload);
    }
    if (validation_status == 0) {
        set_status_code_400(response_object);
        snprintf(response, 100, "{ \"message\": \"Invalid Payload\" }");
        return;
    }

    int status = create_message(
        db,
        authenticated_user.user_id,
        atoi(payload.values[0]),
        payload.values[1]
    );

    if (status == 1) {
        set_status_code_204(response_object);
        snprintf(response, 2, "");
        return;
    }
    set_status_code_400(response_object);
    snprintf(response, 100, "{ \"message\": \"Something went wrong.\" }");
    return;
}

// ===========================================

// SERVER ====================================
void handle_client(sqlite3 *db, int client_socket, const char *request) {
    char method[MAX_BUFFER_SIZE];
    char path[MAX_BUFFER_SIZE];

    if (sscanf(request, "%s %s HTTP/1.1", method, path) != 2) {
        printf("Invalid HTTP request\n");
        close(client_socket);
        return;
    }

    // Headers check
    User user = middleware_auth(request);

    log_call(method, path, user);

    char response[MAX_BUFFER_SIZE];


    Response response_object;

    // routing
    if (strcmp(path, "/api/ping/") == 0) {
        snprintf(response, sizeof(response), "{ \"message\": \"PING from C server!\" }");
    } else if (strcmp(path, "/api/login/") == 0) {
        endpoint_login(db, request, &response_object, response);
    } else if (strcmp(path, "/api/register/") == 0) {
        endpoint_register(db, request, &response_object, response);
    } else if (strcmp(path, "/api/add-friend/") == 0) {
        endpoint_add_friend(db, request, &response_object, response, user);
    } else if (strcmp(path, "/api/chat/") == 0) {
        endpoint_chat(db, request, &response_object, response, user);
    } else if (strcmp(path, "/api/message/") == 0) {
        endpoint_message(db, request, &response_object, response, user);
    } else {
        set_status_code_404(&response_object);
        snprintf(response, sizeof(response), "{ \"message\": \"Unknown endpoint\" }");
    }

    char http_response[MAX_BUFFER_SIZE];
    snprintf(http_response, sizeof(http_response), "HTTP/1.1 %d %s\r\nContent-Type: application/json\r\n\r\n%s", response_object.status_code, response_object.status_code_info, response);
    send(client_socket, http_response, strlen(http_response), 0);
    close(client_socket);
}

int main() {
    int server_socket, client_socket;
    struct sockaddr_in server_address, client_address;
    socklen_t address_len = sizeof(server_address);

    sqlite3 *db;
    int rc = sqlite3_open("db.sqlite3", &db); // Otwórz bazę danych z pliku 'db'
    setup_db(db, rc);

    // Create socket
    if ((server_socket = socket(AF_INET, SOCK_STREAM, 0)) == -1) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    // Initialize server address structure
    memset(&server_address, 0, sizeof(server_address));
    server_address.sin_family = AF_INET;
    server_address.sin_addr.s_addr = INADDR_ANY;
    server_address.sin_port = htons(PORT);

    // Bind the socket
    if (bind(server_socket, (struct sockaddr*)&server_address, sizeof(server_address)) == -1) {
        perror("Bind failed");
        exit(EXIT_FAILURE);
    }

    // Listen for incoming connections
    if (listen(server_socket, MAX_CONNECTIONS) == -1) {
        perror("Listen failed");
        exit(EXIT_FAILURE);
    }

    printf("Server listening on port %d...\n", PORT);

    while (1) {
        // Accept a connection
        if ((client_socket = accept(server_socket, (struct sockaddr*)&client_address, &address_len)) == -1) {
            perror("Accept failed");
            continue;
        }

        printf("Connection accepted from %s:%d\n", inet_ntoa(client_address.sin_addr), ntohs(client_address.sin_port));

        // Receive the client's request
        char buffer[MAX_BUFFER_SIZE];
        ssize_t bytes_received = recv(client_socket, buffer, sizeof(buffer) - 1, 0);

        if (bytes_received <= 0) {
            perror("Error receiving data");
            close(client_socket);
            continue;
        }

        buffer[bytes_received] = '\0';  // Null-terminate the received data

        // Handle the client request based on the endpoint
        handle_client(db, client_socket, buffer);
    }

    close(server_socket);

    return 0;
}
// ===========================================
