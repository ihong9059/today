/**
 * cpu_vs_gpu.cu - CPU와 GPU 성능 비교
 *
 * 컴파일: nvcc cpu_vs_gpu.cu -o cpu_vs_gpu
 * 실행: ./cpu_vs_gpu
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <cuda_runtime.h>

#define N 10000000  // 1천만 개 요소

// GPU 커널: 배열의 각 요소에 연산 수행
__global__ void gpu_compute(float *a, float *b, float *c, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        // 약간의 연산 부하 추가
        float temp = a[idx] + b[idx];
        temp = temp * temp;
        temp = sqrtf(temp);
        c[idx] = temp;
    }
}

// CPU 함수: 동일한 연산 수행
void cpu_compute(float *a, float *b, float *c, int n) {
    for (int i = 0; i < n; i++) {
        float temp = a[i] + b[i];
        temp = temp * temp;
        temp = sqrtf(temp);
        c[i] = temp;
    }
}

// 시간 측정 함수 (밀리초)
double get_time_ms() {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec * 1000.0 + ts.tv_nsec / 1000000.0;
}

int main() {
    printf("==========================================\n");
    printf("  CPU vs GPU 성능 비교\n");
    printf("  배열 크기: %d (%.1f MB)\n", N, N * sizeof(float) / 1024.0 / 1024.0);
    printf("==========================================\n\n");

    // 호스트 메모리 할당
    float *h_a = (float*)malloc(N * sizeof(float));
    float *h_b = (float*)malloc(N * sizeof(float));
    float *h_c_cpu = (float*)malloc(N * sizeof(float));
    float *h_c_gpu = (float*)malloc(N * sizeof(float));

    // 데이터 초기화
    srand(42);
    for (int i = 0; i < N; i++) {
        h_a[i] = (float)rand() / RAND_MAX;
        h_b[i] = (float)rand() / RAND_MAX;
    }

    // ========== CPU 실행 ==========
    printf("[CPU 실행 중...]\n");
    double cpu_start = get_time_ms();

    cpu_compute(h_a, h_b, h_c_cpu, N);

    double cpu_end = get_time_ms();
    double cpu_time = cpu_end - cpu_start;
    printf("CPU 완료: %.2f ms\n\n", cpu_time);

    // ========== GPU 실행 ==========
    printf("[GPU 실행 중...]\n");

    // 디바이스 메모리 할당
    float *d_a, *d_b, *d_c;
    cudaMalloc(&d_a, N * sizeof(float));
    cudaMalloc(&d_b, N * sizeof(float));
    cudaMalloc(&d_c, N * sizeof(float));

    // GPU 타이밍을 위한 이벤트
    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    // 전체 GPU 시간 (메모리 전송 포함)
    double gpu_total_start = get_time_ms();

    // 호스트 → 디바이스 복사
    cudaMemcpy(d_a, h_a, N * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_b, h_b, N * sizeof(float), cudaMemcpyHostToDevice);

    // 커널 실행 (순수 GPU 연산 시간 측정)
    int blockSize = 256;
    int gridSize = (N + blockSize - 1) / blockSize;

    cudaEventRecord(start);
    gpu_compute<<<gridSize, blockSize>>>(d_a, d_b, d_c, N);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float gpu_kernel_time;
    cudaEventElapsedTime(&gpu_kernel_time, start, stop);

    // 디바이스 → 호스트 복사
    cudaMemcpy(h_c_gpu, d_c, N * sizeof(float), cudaMemcpyDeviceToHost);

    double gpu_total_end = get_time_ms();
    double gpu_total_time = gpu_total_end - gpu_total_start;

    printf("GPU 커널만: %.2f ms\n", gpu_kernel_time);
    printf("GPU 전체 (메모리 전송 포함): %.2f ms\n\n", gpu_total_time);

    // ========== 결과 검증 ==========
    int errors = 0;
    for (int i = 0; i < N; i++) {
        if (fabsf(h_c_cpu[i] - h_c_gpu[i]) > 0.0001f) {
            errors++;
        }
    }

    // ========== 결과 출력 ==========
    printf("==========================================\n");
    printf("  결과 비교\n");
    printf("==========================================\n");
    printf("CPU 시간:           %8.2f ms\n", cpu_time);
    printf("GPU 커널 시간:      %8.2f ms\n", gpu_kernel_time);
    printf("GPU 전체 시간:      %8.2f ms\n", gpu_total_time);
    printf("------------------------------------------\n");
    printf("GPU 커널 속도 향상: %8.2fx\n", cpu_time / gpu_kernel_time);
    printf("GPU 전체 속도 향상: %8.2fx\n", cpu_time / gpu_total_time);
    printf("------------------------------------------\n");
    printf("결과 검증: %s (오차: %d개)\n", errors == 0 ? "통과" : "실패", errors);
    printf("==========================================\n");

    // 샘플 결과 출력
    printf("\n샘플 결과 (처음 5개):\n");
    for (int i = 0; i < 5; i++) {
        printf("  [%d] CPU: %.6f, GPU: %.6f\n", i, h_c_cpu[i], h_c_gpu[i]);
    }

    // 메모리 해제
    free(h_a);
    free(h_b);
    free(h_c_cpu);
    free(h_c_gpu);
    cudaFree(d_a);
    cudaFree(d_b);
    cudaFree(d_c);
    cudaEventDestroy(start);
    cudaEventDestroy(stop);

    return 0;
}
