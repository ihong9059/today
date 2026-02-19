/**
 * hello_cuda_v2.cu - 블록과 스레드 인덱스 이해하기
 *
 * 컴파일: nvcc hello_cuda_v2.cu -o hello_cuda_v2
 * 실행: ./hello_cuda_v2
 */

#include <stdio.h>

__global__ void helloFromGPU() {
    // 전역 스레드 ID 계산
    // blockIdx.x: 블록 번호 (0, 1, 2, ...)
    // blockDim.x: 블록 크기 (스레드 수)
    // threadIdx.x: 블록 내 스레드 번호
    int globalIdx = blockIdx.x * blockDim.x + threadIdx.x;

    printf("Hello! Global ID: %2d (Block: %d, Thread: %d)\n",
           globalIdx, blockIdx.x, threadIdx.x);
}

int main() {
    printf("=== CUDA Hello World v2 ===\n\n");

    int numBlocks = 3;
    int threadsPerBlock = 4;

    printf("CPU: Launching kernel with %d blocks, %d threads each\n",
           numBlocks, threadsPerBlock);
    printf("Total threads: %d\n\n", numBlocks * threadsPerBlock);

    // 커널 호출
    helloFromGPU<<<numBlocks, threadsPerBlock>>>();

    // GPU 작업 완료 대기
    cudaDeviceSynchronize();

    printf("\nCPU: Kernel finished!\n");

    return 0;
}
