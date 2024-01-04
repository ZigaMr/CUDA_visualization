package main

import (
    "fmt"
    "gonum.org/v1/gonum/floats"
    "gonum.org/v1/gonum/stat"
)

func main() {
    data := make([]float64, 1000)
    // Run your CUDA code to fill 'data' array with values

    // Print some statistics
    fmt.Println("Mean:", stat.Mean(data, nil))
    fmt.Println("StdDev:", stat.StdDev(data, nil))
}

