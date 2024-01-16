
package main
/*
void complexMulFFT(float *A, float* B, float *C, int size);
#cgo LDFLAGS: -L. -lfourier -L/usr/local/cuda/lib64 -lcufft
#cgo CFLAGS: -I/usr/local/cuda/include
*/
import "C"
import(
	"fmt"
	"math/rand"
	"time"
)
// func Maxmul(a []C.float, b []C.float, c []C.float, size int) {
// 	C.maxmul(&a[0], &b[0], &c[0], C.int(size))
// }

func Fourier(a []C.float, b []C.float, c []C.float, size int) {
	C.complexMulFFT(&a[0], &b[0], &c[0], C.int(size))
}


func main() {
	// Size of the vectors
	size := 200100 // Adjust this size as needed

	// Initialize the vectors with random values
	a := make([]C.float, size)
	b := make([]C.float, size)
	for i := range a {
		a[i] = C.float(rand.Float32() * 100) // Random float between 0 and 100
		b[i] = C.float(rand.Float32() * 100)
	}

	// Allocate space for the result vector
	c := make([]C.float, size)

	// Run the Fourier function
	start := time.Now()
	Fourier(a, b, c, size)
	duration := time.Since(start)

	fmt.Printf("Processing time: %v\n", duration)
	// fmt.Println(c[0])
}