#include <cuda.h>

__global__ void vecAdd(float *A, float *B, float *C, int N) {
    int i = threadIdx.x + blockDim.x * blockIdx.x;
    if (i < N) {
        C[i] = A[i] + B[i];
    }
}

extern "C" {
    void runVecAdd(float *A, float *B, float *C, int N) {
        float *d_A, *d_B, *d_C;
        int size = N * sizeof(float);

        // Allocate device memory
        cudaMalloc((void **)&d_A, size);
        cudaMalloc((void **)&d_B, size);
        cudaMalloc((void **)&d_C, size);

        // Copy inputs to device
        cudaMemcpy(d_A, A, size, cudaMemcpyHostToDevice);
        cudaMemcpy(d_B, B, size, cudaMemcpyHostToDevice);

        // Launch the vector addition kernel
        int threadsPerBlock = 256;
        int blocksPerGrid = (N + threadsPerBlock - 1) / threadsPerBlock;
        vecAdd<<<blocksPerGrid, threadsPerBlock>>>(d_A, d_B, d_C, N);

        // Copy result back to host
        cudaMemcpy(C, d_C, size, cudaMemcpyDeviceToHost);

        // Free device memory
        cudaFree(d_A);
        cudaFree(d_B);
        cudaFree(d_C);
    }
}

