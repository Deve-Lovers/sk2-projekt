#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080
#define MAX_CONNECTIONS 5
#define MAX_BUFFER_SIZE 1024


// STRUCTS ===================================
typedef struct {
    int is_authenticated;
    int user_id;
} User;
// ===========================================



void log_call(const char * method, const char *path, User user) {
    const char *temp_authorized = "false";
    if(user.is_authenticated == 1) {
        temp_authorized = "true";
    }
    printf("Method: %s Endpoint: %s Authorized: %s user_id: %d\n", method, path, temp_authorized, user.user_id);
    return;
}


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

        // Find the end of the header value
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


void handle_client(int client_socket, const char *request) {
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

    // routing
    if (strcmp(path, "/api/hello/") == 0) {
        snprintf(response, sizeof(response), "{ \"message\": \"HELLO from C server!\" }");
    } else if (strcmp(path, "/api/siem/") == 0) {
        snprintf(response, sizeof(response), "{ \"message\": \"SIEM from C server!\" }");
    } else {
        snprintf(response, sizeof(response), "{ \"message\": \"Unknown endpoint\" }");
    }

    int status_code = 400;
    char *code_message = "BAD REQUEST";

    char http_response[MAX_BUFFER_SIZE];
    snprintf(http_response, sizeof(http_response), "HTTP/1.1 %d %s\r\nContent-Type: application/json\r\n\r\n%s", status_code, code_message, response);
    send(client_socket, http_response, strlen(http_response), 0);

    close(client_socket);
}

int main() {
    int server_socket, client_socket;
    struct sockaddr_in server_address, client_address;
    socklen_t address_len = sizeof(server_address);

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
        handle_client(client_socket, buffer);
    }

    close(server_socket);

    return 0;
}
