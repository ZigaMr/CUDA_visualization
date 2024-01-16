#include <stdio.h>
#include <cuda.h>
#include <cufft.h>

__global__ void elementwiseMulAndScale(cufftComplex *A, cufftComplex *B, int size, float scale) {
    int i = blockDim.x * blockIdx.x + threadIdx.x;
    if (i < size) {
        cufftComplex a = A[i];
        cufftComplex b = B[i];
        A[i] = make_cuFloatComplex((a.x * b.x - a.y * b.y) * scale, (a.x * b.y + a.y * b.x) * scale);
    }
}

extern "C" {

    void complexMulFFT(float *A, float *B, float *C, int size) {
        int total = size;
        int msize = total * sizeof(cufftComplex);

        // Allocate host memory for complex numbers:
        cufftComplex *h_A = reinterpret_cast<cufftComplex*>(A);
        cufftComplex *h_B = reinterpret_cast<cufftComplex*>(B);
        cufftComplex *h_C = reinterpret_cast<cufftComplex*>(C);

        // Allocate device memory:
        cufftComplex *gpu_A, *gpu_B;
        cudaMalloc((void**)&gpu_A, msize);
        cudaMemcpy(gpu_A, h_A, msize, cudaMemcpyHostToDevice);
        cudaMalloc((void**)&gpu_B, msize);
        cudaMemcpy(gpu_B, h_B, msize, cudaMemcpyHostToDevice);

        // Create cuFFT plan:
        cufftHandle plan;
        cufftPlan1d(&plan, size, CUFFT_C2C, 1);

        // Perform FFT on both vectors:
        cufftExecC2C(plan, gpu_A, gpu_A, CUFFT_FORWARD);
        cufftExecC2C(plan, gpu_B, gpu_B, CUFFT_FORWARD);

        // Element-wise multiplication and scaling:
        int threadsPerBlock = 256;
        int blocksPerGrid = (size + threadsPerBlock - 1) / threadsPerBlock;
        elementwiseMulAndScale<<<blocksPerGrid, threadsPerBlock>>>(gpu_A, gpu_B, size, 1.0f / size);

        // Inverse FFT:
        cufftExecC2C(plan, gpu_A, gpu_A, CUFFT_INVERSE);

        // Copy the result back to host memory:
        cudaMemcpy(h_C, gpu_A, msize, cudaMemcpyDeviceToHost);

        // Cleanup:
        cufftDestroy(plan);
        cudaFree(gpu_A);
        cudaFree(gpu_B);
    }
}
