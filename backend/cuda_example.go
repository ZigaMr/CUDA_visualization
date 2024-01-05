package main

/*
#include <stdlib.h>
#include <stdio.h>
#include <cuda.h>

void printPath() {
    const char* path = getenv("PATH");
    if (path == NULL) {
        printf("PATH is NULL\n");
    } else {
        printf("PATH from CGo: %s\n", path);
    }
}
*/
import "C"
import (
	"fmt"
	"os"
)

func main() {
	// Print PATH using Go
	path := os.Getenv("PATH")
	fmt.Println("PATH from Go:", path)

	// Print PATH using CGo
	C.printPath()
}

