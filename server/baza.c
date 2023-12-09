#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <sqlite3.h>

typedef struct {
    int id;
    char *name;
    char *surname;
} User;

// Funkcja do obsługi błędów SQLite
static int callback(void *NotUsed, int argc, char **argv, char **azColName) {
    int i;
    User *user = (User *)NotUsed;

    for (i = 0; i < argc; i++) {
        if (strcmp(azColName[i], "id") == 0) {
            user->id = atoi(argv[i]);
        } else if (strcmp(azColName[i], "name") == 0) {
            user->name = strdup(argv[i]);
        } else if (strcmp(azColName[i], "surname") == 0) {
            user->surname = strdup(argv[i]);
        }
    }

    return 0;
}

// Funkcja do dodawania użytkownika do bazy danych
void add_user(sqlite3 *db, const char *name, const char *surname) {
    char sql[100];
    sprintf(sql, "INSERT INTO users (name, surname) VALUES ('%s', '%s');", name, surname);

    int rc = sqlite3_exec(db, sql, 0, 0, 0);
    if (rc != SQLITE_OK) {
        fprintf(stderr, "SQL error: %s\n", sqlite3_errmsg(db));
    } else {
        printf("User added successfully.\n");
    }
}

// Funkcja do uzyskiwania użytkownika z bazy danych na podstawie ID
User get_user_by_id(sqlite3 *db, int user_id) {
    User user = {0};

    char sql[100];
    sprintf(sql, "SELECT * FROM users WHERE id=%d;", user_id);

    int rc = sqlite3_exec(db, sql, callback, &user, 0);
    if (rc != SQLITE_OK) {
        fprintf(stderr, "SQL error: %s\n", sqlite3_errmsg(db));
    }

    return user;
}

int main() {
    sqlite3 *db;
    int rc = sqlite3_open("db.sqlite3", &db); // Otwórz bazę danych z pliku 'db'

    if (rc != SQLITE_OK) {
        fprintf(stderr, "Cannot open database: %s\n", sqlite3_errmsg(db));
        return 1;
    }

    // Utwórz tabelę users, jeśli nie istnieje
    const char *create_table_sql = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT);";
    rc = sqlite3_exec(db, create_table_sql, 0, 0, 0);

    if (rc != SQLITE_OK) {
        fprintf(stderr, "SQL error: %s\n", sqlite3_errmsg(db));
        sqlite3_close(db);
        return 1;
    }

    // Dodaj użytkownika do bazy danych
    add_user(db, "Zbyszek", "Wytryszek");

    // Sprawdź, czy użytkownik istnieje w bazie danych
    User user = get_user_by_id(db, 1);

    // Przykład korzystania z danych użytkownika
    if (user.id != 0) {
        printf("User found. ID: %d, Name: %s, Surname: %s\n", user.id, user.name, user.surname);
    } else {
        printf("User not found.\n");
    }

    // Zwolnij zasoby
    free(user.name);
    free(user.surname);

    // Zamknij bazę danych
    sqlite3_close(db);

    return 0;
}
