/**
 * vector_add.cu - GPU Vector Addition
 *
 * 컴파일: nvcc vector_add.cu -o vector_add
 * 실행: ./vector_add
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// GPU 커널
__global__ void vectorAddGPU(float* a, float* b, float* c, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        c[idx] = a[idx] + b[idx];
    }
}

// CPU 함수 (비교용)
void vectorAddCPU(float* a, float* b, float* c, int n) {
    for (int i = 0; i < n; i++) {
        c[i] = a[i] + b[i];
    }
}

// 결과 검증
int verify(float* cpu, float* gpu, int n) {
    for (int i = 0; i < n; i++) {
        if (abs(cpu[i] - gpu[i]) > 0.0001) {
            printf("Mismatch at %d: CPU=%f, GPU=%f\n", i, cpu[i], gpu[i]);
            return 0;
        }
    }
    return 1;
}

int main() {
    int n = 1000000;  // 100만 개
    size_t size = n * sizeof(float);

    printf("========================================\n");
    printf("  Vector Addition: %d elements\n", n);
    printf("========================================\n\n");

    // Unified Memory 할당
    float *a, *b, *c_gpu;
    float *c_cpu = (float*)malloc(size);

    cudaMallocManaged(&a, size);
    cudaMallocManaged(&b, size);
    cudaMallocManaged(&c_gpu, size);

    // 데이터 초기화
    srand(42);
    for (int i = 0; i < n; i++) {
        a[i] = rand() / (float)RAND_MAX;
        b[i] = rand() / (float)RAND_MAX;
    }

    // ===== CPU 실행 =====
    clock_t cpu_start = clock();
    vectorAddCPU(a, b, c_cpu, n);
    clock_t cpu_end = clock();
    double cpu_time = (double)(cpu_end - cpu_start) / CLOCKS_PER_SEC * 1000;

    // ===== GPU 실행 =====
    int threadsPerBlock = 256;
    int blocksPerGrid = (n + threadsPerBlock - 1) / threadsPerBlock;

    printf("Grid: %d blocks\n", blocksPerGrid);
    printf("Block: %d threads\n\n", threadsPerBlock);

    // CUDA 이벤트로 정확한 시간 측정
    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);
    vectorAddGPU<<<blocksPerGrid, threadsPerBlock>>>(a, b, c_gpu, n);
    cudaEventRecord(stop);

    cudaEventSynchronize(stop);
    float gpu_time = 0;
    cudaEventElapsedTime(&gpu_time, start, stop);

    // 결과 출력
    printf("CPU Time: %.3f ms\n", cpu_time);
    printf("GPU Time: %.3f ms\n", gpu_time);

    if (gpu_time > 0) {
        printf("Speedup: %.2fx\n\n", cpu_time / gpu_time);
    }

    // 검증
    if (verify(c_cpu, c_gpu, n)) {
        printf("Results match!\n\n");
    }

    // 처음 5개 결과 확인
    printf("First 5 results:\n");
    for (int i = 0; i < 5; i++) {
        printf("  %.4f + %.4f = %.4f\n", a[i], b[i], c_gpu[i]);
    }

    // 메모리 해제
    cudaFree(a);
    cudaFree(b);
    cudaFree(c_gpu);
    free(c_cpu);

    cudaEventDestroy(start);
    cudaEventDestroy(stop);

    return 0;
}
