/**
 * cpu_vs_gpu_50M.cu - CPU vs GPU 성능 비교 (5000만 개 - GPU가 빠른 경우)
 *
 * 컴파일: nvcc cpu_vs_gpu_50M.cu -o cpu_vs_gpu_50M
 * 실행: ./cpu_vs_gpu_50M
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <cuda_runtime.h>

#define N 50000000  // 5천만 개 요소

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
    printf("║  CPU vs GPU 성능 비교 - 큰 데이터 (5천만 개)                 ║\n");
    printf("║  → GPU의 진정한 성능을 보여줍니다                            ║\n");
    printf("╚══════════════════════════════════════════════════════════════╝\n\n");

    printf("📊 데이터 정보\n");
    printf("   - 요소 수: %d개 (5천만)\n", N);
    printf("   - 메모리: %.1f MB\n\n", N * sizeof(float) / 1024.0 / 1024.0);

    float *h_a = (float*)malloc(N * sizeof(float));
    float *h_b = (float*)malloc(N * sizeof(float));
    float *h_c_cpu = (float*)malloc(N * sizeof(float));
    float *h_c_gpu = (float*)malloc(N * sizeof(float));

    printf("   데이터 초기화 중...\n");
    srand(42);
    for (int i = 0; i < N; i++) {
        h_a[i] = (float)rand() / RAND_MAX;
        h_b[i] = (float)rand() / RAND_MAX;
    }
    printf("   초기화 완료!\n\n");

    // ========== CPU 실행 ==========
    printf("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    printf("🖥️  CPU 실행 (시간이 걸립니다...)\n");
    printf("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    double cpu_start = get_time_ms();
    cpu_compute(h_a, h_b, h_c_cpu, N);
    double cpu_time = get_time_ms() - cpu_start;

    printf("   연산 완료: %.2f ms (%.2f 초)\n\n", cpu_time, cpu_time / 1000);

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
    printf("   [1] GPU 메모리 할당:     %8.2f ms\n", step1_time);

    // 2단계: CPU → GPU 복사
    double step2_start = get_time_ms();
    cudaMemcpy(d_a, h_a, N * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(d_b, h_b, N * sizeof(float), cudaMemcpyHostToDevice);
    double step2_time = get_time_ms() - step2_start;
    printf("   [2] CPU → GPU 복사:      %8.2f ms  (%.1f MB 전송)\n",
           step2_time, 2 * N * sizeof(float) / 1024.0 / 1024.0);

    // 3단계: GPU 커널 실행
    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    int blockSize = 256;
    int gridSize = (N + blockSize - 1) / blockSize;

    printf("   [3] GPU 커널 실행...\n");
    printf("       - 그리드 크기: %d 블록\n", gridSize);
    printf("       - 블록 크기: %d 스레드\n", blockSize);
    printf("       - 총 스레드: %d개\n", gridSize * blockSize);

    cudaEventRecord(start);
    gpu_compute<<<gridSize, blockSize>>>(d_a, d_b, d_c, N);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float gpu_kernel_time;
    cudaEventElapsedTime(&gpu_kernel_time, start, stop);
    printf("       → 커널 실행 시간:   %8.2f ms  ⭐ 실제 연산\n", gpu_kernel_time);

    // 4단계: GPU → CPU 복사
    double step4_start = get_time_ms();
    cudaMemcpy(h_c_gpu, d_c, N * sizeof(float), cudaMemcpyDeviceToHost);
    double step4_time = get_time_ms() - step4_start;
    printf("   [4] GPU → CPU 복사:      %8.2f ms  (%.1f MB 전송)\n",
           step4_time, N * sizeof(float) / 1024.0 / 1024.0);

    double gpu_total_time = step1_time + step2_time + gpu_kernel_time + step4_time;
    printf("   ─────────────────────────────────────\n");
    printf("   GPU 전체 시간:           %8.2f ms\n\n", gpu_total_time);

    // ========== 결과 비교 ==========
    printf("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    printf("📈 결과 비교\n");
    printf("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n");

    printf("   ┌─────────────────┬────────────┬────────────┐\n");
    printf("   │     구분        │   시간(ms) │   속도향상 │\n");
    printf("   ├─────────────────┼────────────┼────────────┤\n");
    printf("   │ CPU             │ %10.2f │     -      │\n", cpu_time);
    printf("   │ GPU 커널만      │ %10.2f │   %5.1fx   │\n", gpu_kernel_time, cpu_time / gpu_kernel_time);
    printf("   │ GPU 전체        │ %10.2f │   %5.1fx   │\n", gpu_total_time, cpu_time / gpu_total_time);
    printf("   └─────────────────┴────────────┴────────────┘\n\n");

    // 시간 구성 분석
    printf("   ⏱️  GPU 시간 구성:\n");
    printf("   ┌────────────────────────────────────────────────────┐\n");
    printf("   │ 메모리 할당:  %5.1f%% │", step1_time / gpu_total_time * 100);
    for(int i = 0; i < (int)(step1_time / gpu_total_time * 30); i++) printf("█");
    printf("\n");
    printf("   │ CPU→GPU 복사: %5.1f%% │", step2_time / gpu_total_time * 100);
    for(int i = 0; i < (int)(step2_time / gpu_total_time * 30); i++) printf("█");
    printf("\n");
    printf("   │ 커널 실행:    %5.1f%% │", gpu_kernel_time / gpu_total_time * 100);
    for(int i = 0; i < (int)(gpu_kernel_time / gpu_total_time * 30); i++) printf("█");
    printf("\n");
    printf("   │ GPU→CPU 복사: %5.1f%% │", step4_time / gpu_total_time * 100);
    for(int i = 0; i < (int)(step4_time / gpu_total_time * 30); i++) printf("█");
    printf("\n");
    printf("   └────────────────────────────────────────────────────┘\n\n");

    // 결과 검증
    int errors = 0;
    for (int i = 0; i < N; i++) {
        if (fabsf(h_c_cpu[i] - h_c_gpu[i]) > 0.0001f) errors++;
    }
    printf("   ✅ 결과 검증: %s\n\n", errors == 0 ? "통과" : "실패");

    printf("╔══════════════════════════════════════════════════════════════╗\n");
    printf("║  💡 교훈:                                                    ║\n");
    printf("║  - GPU 커널 자체는 CPU보다 %.1fx 빠름                       ║\n", cpu_time / gpu_kernel_time);
    printf("║  - 메모리 전송을 포함해도 %.1fx 빠름                        ║\n", cpu_time / gpu_total_time);
    printf("║  - 데이터가 클수록 GPU의 효과가 커짐!                        ║\n");
    printf("╚══════════════════════════════════════════════════════════════╝\n\n");

    free(h_a); free(h_b); free(h_c_cpu); free(h_c_gpu);
    cudaFree(d_a); cudaFree(d_b); cudaFree(d_c);
    cudaEventDestroy(start); cudaEventDestroy(stop);

    return 0;
}
