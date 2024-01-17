
nvcc --ptxas-options=-v --compiler-options '-fPIC' -o libfourier.so --shared fourier_transform.cu
LD_LIBRARY_PATH=${PWD}${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}} go run cuda_bindings.go