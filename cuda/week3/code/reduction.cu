/**
 * reduction.cu - Shared Memory를 이용한 배열 합계
 *
 * 컴파일: nvcc reduction.cu -o reduction
 * 실행: ./reduction
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define BLOCK_SIZE 256

// GPU Reduction 커널
__global__ void sumReduction(float* data, float* blockSums, int n) {
    __shared__ float partialSum[BLOCK_SIZE];

    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    int tid = threadIdx.x;

    // 1. Global → Shared Memory
    partialSum[tid] = (idx < n) ? data[idx] : 0;
    __syncthreads();

    // 2. Reduction (트리 구조로 합산)
    //    stride: 128 → 64 → 32 → 16 → 8 → 4 → 2 → 1
    for (int stride = blockDim.x / 2; stride > 0; stride /= 2) {
        if (tid < stride) {
            partialSum[tid] += partialSum[tid + stride];
        }
        __syncthreads();
    }

    // 3. 각 블록의 합을 저장
    if (tid == 0) {
        blockSums[blockIdx.x] = partialSum[0];
    }
}

// CPU 합계 (검증용)
float sumCPU(float* data, int n) {
    float sum = 0;
    for (int i = 0; i < n; i++) {
        sum += data[i];
    }
    return sum;
}

int main() {
    int n = 1000000;  // 100만 개
    size_t size = n * sizeof(float);

    printf("========================================\n");
    printf("  Array Sum with Reduction\n");
    printf("  Elements: %d\n", n);
    printf("========================================\n\n");

    // 메모리 할당
    float *data, *blockSums;
    cudaMallocManaged(&data, size);

    int numBlocks = (n + BLOCK_SIZE - 1) / BLOCK_SIZE;
    cudaMallocManaged(&blockSums, numBlocks * sizeof(float));

    printf("Grid: %d blocks\n", numBlocks);
    printf("Block: %d threads\n\n", BLOCK_SIZE);

    // 초기화
    srand(42);
    for (int i = 0; i < n; i++) {
        data[i] = (float)(rand() % 100) / 100.0f;  // 0.00 ~ 0.99
    }

    // CPU 실행
    clock_t cpu_start = clock();
    float cpu_sum = sumCPU(data, n);
    clock_t cpu_end = clock();
    double cpu_time = (double)(cpu_end - cpu_start) / CLOCKS_PER_SEC * 1000;

    // GPU 실행
    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);
    sumReduction<<<numBlocks, BLOCK_SIZE>>>(data, blockSums, n);
    cudaDeviceSynchronize();
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float gpu_time;
    cudaEventElapsedTime(&gpu_time, start, stop);

    // CPU에서 블록 합계를 최종 합산
    float gpu_sum = 0;
    for (int i = 0; i < numBlocks; i++) {
        gpu_sum += blockSums[i];
    }

    // 결과 출력
    printf("CPU Sum: %.2f (Time: %.3f ms)\n", cpu_sum, cpu_time);
    printf("GPU Sum: %.2f (Time: %.3f ms)\n", gpu_sum, gpu_time);
    printf("Difference: %.6f\n", abs(cpu_sum - gpu_sum));
    printf("Speedup: %.2fx\n\n", cpu_time / gpu_time);

    // 검증
    if (abs(cpu_sum - gpu_sum) < 1.0f) {
        printf("Verification PASSED!\n");
    } else {
        printf("Verification FAILED!\n");
    }

    // 메모리 해제
    cudaFree(data);
    cudaFree(blockSums);

    cudaEventDestroy(start);
    cudaEventDestroy(stop);

    return 0;
}
