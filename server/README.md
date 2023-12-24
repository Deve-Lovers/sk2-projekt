
# Server Setup in C

This guide provides instructions for setting up and running a basic server written in C.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **GCC (GNU Compiler Collection)** - A compiler system for C/C++ languages.

   To check if GCC is installed, run:
   ```bash
   gcc --version
   ```

   If GCC is not installed, you will need to install it using your system's package manager.

2. **Jansson** - A C library for encoding, decoding, and manipulating JSON data.

   Install Jansson using Homebrew:
   ```bash
   brew install jansson
   ```

3. **SQLite3** - A C library that provides a lightweight disk-based database.

   Install SQLite3 using Homebrew:
   ```bash
   brew install sqlite3
   ```

   *(Note: Some systems come with SQLite3 pre-installed. You can check by running `sqlite3 --version`.)*

## Compilation

To compile the server, use the following GCC command:

```bash
gcc server.c -o server.out -I/opt/homebrew/include -L/opt/homebrew/lib -lsqlite3 -ljansson
```

This command compiles `server.c` and creates an executable file named `server.out`. The flags `-I` and `-L` specify the include and library paths for SQLite3 and Jansson. The `-l` flags link against the SQLite3 and Jansson libraries.

## Running the Server

After compilation, you can run the server using:

```bash
./server.out
```

This starts the server using the compiled executable.

## Notes

- Ensure that the paths specified in the compilation command match the actual paths of your SQLite3 and Jansson installations. These paths can vary based on your system's configuration and the method of installation.
- For troubleshooting, refer to the documentation of GCC, Jansson, and SQLite3 respective to your operating system.
