package main

import (
    "log"
    "net/http"
)

func main() {
    // Serve static files from the 'build' directory
    fs := http.FileServer(http.Dir("build"))
    http.Handle("/", fs)

    // Define more routes here, e.g., API endpoints

    log.Println("Server started on :8080")
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        log.Fatal(err)
    }
}

