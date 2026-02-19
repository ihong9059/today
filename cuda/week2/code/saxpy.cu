/**
 * saxpy.cu - SAXPY: Y = a*X + Y
 *
 * SAXPY는 기계학습에서 자주 사용되는 기본 연산입니다.
 *
 * 컴파일: nvcc saxpy.cu -o saxpy
 * 실행: ./saxpy
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// SAXPY 커널: Y = a*X + Y
__global__ void saxpy(float a, float* x, float* y, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        y[idx] = a * x[idx] + y[idx];
    }
}

// CPU 버전 (검증용)
void saxpy_cpu(float a, float* x, float* y, int n) {
    for (int i = 0; i < n; i++) {
        y[i] = a * x[i] + y[i];
    }
}

int main() {
    int n = 1000000;  // 100만 개
    float a = 2.0f;   // 스칼라
    size_t size = n * sizeof(float);

    printf("========================================\n");
    printf("  SAXPY: Y = %.1f * X + Y\n", a);
    printf("  Elements: %d\n", n);
    printf("========================================\n\n");

    // Unified Memory 할당
    float *x, *y_gpu, *y_cpu;
    cudaMallocManaged(&x, size);
    cudaMallocManaged(&y_gpu, size);
    y_cpu = (float*)malloc(size);

    // 초기화: X = [1, 2, 3, ...], Y = [1, 1, 1, ...]
    for (int i = 0; i < n; i++) {
        x[i] = i + 1;
        y_gpu[i] = 1.0f;
        y_cpu[i] = 1.0f;
    }

    // CPU 실행 (검증용)
    saxpy_cpu(a, x, y_cpu, n);

    // GPU 실행
    int threads = 256;
    int blocks = (n + threads - 1) / threads;

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);
    saxpy<<<blocks, threads>>>(a, x, y_gpu, n);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float gpu_time;
    cudaEventElapsedTime(&gpu_time, start, stop);

    printf("GPU Time: %.3f ms\n\n", gpu_time);

    // 검증
    int errors = 0;
    for (int i = 0; i < n; i++) {
        if (fabs(y_gpu[i] - y_cpu[i]) > 0.0001f) {
            errors++;
            if (errors <= 5) {
                printf("Mismatch at %d: GPU=%.2f, CPU=%.2f\n",
                       i, y_gpu[i], y_cpu[i]);
            }
        }
    }

    if (errors == 0) {
        printf("Verification PASSED!\n\n");
    } else {
        printf("Verification FAILED! (%d errors)\n\n", errors);
    }

    // 결과 확인
    printf("Sample results (Y = %.1f * X + 1):\n", a);
    printf("  X[0]=%.0f -> Y[0]=%.0f (expected: %.0f)\n",
           x[0], y_gpu[0], a * x[0] + 1);
    printf("  X[1]=%.0f -> Y[1]=%.0f (expected: %.0f)\n",
           x[1], y_gpu[1], a * x[1] + 1);
    printf("  X[2]=%.0f -> Y[2]=%.0f (expected: %.0f)\n",
           x[2], y_gpu[2], a * x[2] + 1);

    // 메모리 해제
    cudaFree(x);
    cudaFree(y_gpu);
    free(y_cpu);

    cudaEventDestroy(start);
    cudaEventDestroy(stop);

    return 0;
}
