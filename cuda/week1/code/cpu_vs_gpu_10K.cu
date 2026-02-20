/**
 * cpu_vs_gpu_10K.cu - CPU vs GPU 성능 비교 (1만 개 - GPU가 느린 경우)
 *
 * 컴파일: nvcc cpu_vs_gpu_10K.cu -o cpu_vs_gpu_10K
 * 실행: ./cpu_vs_gpu_10K
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <cuda_runtime.h>

#define N 10000  // 1만 개 요소

__global__ void gpu_compute(float *a, float *b, float *c, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        float temp = a[idx] + b[idx];
        temp = temp * temp;
        temp = sqrtf(temp);
        c[idx] = temp;
    }
}

void cpu_compute(float *a, float *b, float *c, int n) {
    for (int i = 0; i < n; i++) {
        float temp = a[i] + b[i];
        temp = temp * temp;
        temp = sqrtf(temp);
        c[i] = temp;
    }
}

double get_time_ms() {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec * 1000.0 + ts.tv_nsec / 1000000.0;
}

int main() {
    printf("\n");
    printf("╔══════════════════════════════════════════════════════════════╗\n");
    printf("║  CPU vs GPU 성능 비교 - 작은 데이터 (1만 개)                 ║\n");
    printf("║  → GPU가 오히려 느린 경우를 보여줍니다                       ║\n");
    printf("╚══════════════════════════════════════════════════════════════╝\n\n");

    printf("📊 데이터 정보\n");
    printf("   - 요소 수: %d개\n", N);
    printf("   - 메모리: %.2f KB\n\n", N * sizeof(float) / 1024.0);

    float *h_a = (float*)malloc(N * sizeof(float));
    float *h_b = (float*)malloc(N * sizeof(float));
    float *h_c_cpu = (float*)malloc(N * sizeof(float));
    float *h_c_gpu = (float*)malloc(N * sizeof(float));

    srand(42);
    for (int i = 0; i < N; i++) {
        h_a[i] = (float)rand() / RAND_MAX;
        h_b[i] = (float)rand() / RAND_MAX;
    }

    // ========== CPU 실행 ==========
    printf("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    printf("🖥️  CPU 실행\n");
    printf("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    double cpu_start = get_time_ms();
    cpu_compute(h_a, h_b, h_c_cpu, N);
    double cpu_time = get_time_ms() - cpu_start;

    printf("   연산 완료: %.3f ms\n\n", cpu_time);

    // ========== GPU 실행 ==========
    printf("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    printf("🎮 GPU 실행 (단계별 시간 측정)\n");
    printf("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    float *d_a, *d_b, *d_c;

    // 1단계: GPU 메모리 할당
    double step1_start = get_time_ms();
    cudaMalloc(&d_a, N * sizeof(float));
    cudaMalloc(&d_b, N * sizeof(float));
    cudaMalloc(&d_c, N * sizeof(float));
    double step1_time = get_time_ms() - step1_start;
    printf("   [1] GPU 메모리 할당:     %6.3f ms\n", step1_time);

    // 2단계: CPU → GPU 복사
    double step2_start = get_time_ms();
    cudaMemcpy(d_a, h_a, N * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_b, h_b, N * sizeof(float), cudaMemcpyHostToDevice);
    double step2_time = get_time_ms() - step2_start;
    printf("   [2] CPU → GPU 복사:      %6.3f ms\n", step2_time);

    // 3단계: GPU 커널 실행
    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    int blockSize = 256;
    int gridSize = (N + blockSize - 1) / blockSize;

    cudaEventRecord(start);
    gpu_compute<<<gridSize, blockSize>>>(d_a, d_b, d_c, N);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float gpu_kernel_time;
    cudaEventElapsedTime(&gpu_kernel_time, start, stop);
    printf("   [3] GPU 커널 실행:       %6.3f ms  ⭐ 실제 연산\n", gpu_kernel_time);

    // 4단계: GPU → CPU 복사
    double step4_start = get_time_ms();
    cudaMemcpy(h_c_gpu, d_c, N * sizeof(float), cudaMemcpyDeviceToHost);
    double step4_time = get_time_ms() - step4_start;
    printf("   [4] GPU → CPU 복사:      %6.3f ms\n", step4_time);

    double gpu_total_time = step1_time + step2_time + gpu_kernel_time + step4_time;
    printf("   ─────────────────────────────────\n");
    printf("   GPU 전체 시간:           %6.3f ms\n\n", gpu_total_time);

    // ========== 결과 분석 ==========
    printf("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    printf("📈 결과 분석\n");
    printf("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    printf("   CPU 시간:                %6.3f ms\n", cpu_time);
    printf("   GPU 전체 시간:           %6.3f ms\n", gpu_total_time);
    printf("   GPU 커널만:              %6.3f ms\n\n", gpu_kernel_time);

    double overhead = gpu_total_time - gpu_kernel_time;
    printf("   ⚠️  오버헤드 (메모리 전송 등): %.3f ms (%.1f%%)\n",
           overhead, overhead / gpu_total_time * 100);

    if (gpu_total_time > cpu_time) {
        printf("\n   ❌ GPU가 %.2fx 더 느림!\n", gpu_total_time / cpu_time);
        printf("   → 데이터가 너무 작아서 오버헤드가 연산 시간보다 큼\n");
    }

    printf("\n");
    printf("╔══════════════════════════════════════════════════════════════╗\n");
    printf("║  💡 교훈: 작은 데이터에서는 GPU 사용이 오히려 손해!          ║\n");
    printf("╚══════════════════════════════════════════════════════════════╝\n\n");

    free(h_a); free(h_b); free(h_c_cpu); free(h_c_gpu);
    cudaFree(d_a); cudaFree(d_b); cudaFree(d_c);
    cudaEventDestroy(start); cudaEventDestroy(stop);

    return 0;
}
