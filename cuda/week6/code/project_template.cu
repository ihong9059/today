/**
 * project_template.cu - CUDA 프로젝트 템플릿
 *
 * 이 파일을 복사하여 자신만의 프로젝트를 시작하세요.
 *
 * 컴파일: nvcc project_template.cu -o my_project
 * 실행: ./my_project
 */

#include <stdio.h>
#include <stdlib.h>
#include <cuda_runtime.h>
#include <time.h>

// ============================================================
// 설정
// ============================================================
#define DATA_SIZE 1000000  // 데이터 크기
#define BLOCK_SIZE 256     // 블록당 스레드 수

// ============================================================
// GPU 커널
// ============================================================

/**
 * TODO: 여기에 GPU 커널을 구현하세요
 *
 * 예시: 배열의 각 요소에 연산 수행
 */
__global__ void myKernel(float* input, float* output, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;

    if (idx < n) {
        // TODO: 실제 연산을 구현하세요
        output[idx] = input[idx] * 2.0f;  // 예시: 2배
    }
}

/**
 * Shared Memory를 사용하는 커널 예시
 */
__global__ void myKernelShared(float* input, float* output, int n) {
    __shared__ float sharedData[BLOCK_SIZE];

    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    int tid = threadIdx.x;

    // Global -> Shared
    if (idx < n) {
        sharedData[tid] = input[idx];
    }
    __syncthreads();

    // TODO: Shared Memory를 활용한 연산

    // Shared -> Global
    if (idx < n) {
        output[idx] = sharedData[tid];
    }
}

// ============================================================
// CPU 버전 (검증용)
// ============================================================

void myCPUFunction(float* input, float* output, int n) {
    for (int i = 0; i < n; i++) {
        output[i] = input[i] * 2.0f;  // GPU와 동일한 연산
    }
}

// ============================================================
// 유틸리티 함수
// ============================================================

// 시간 측정
double getTimeMs() {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec * 1000.0 + ts.tv_nsec / 1000000.0;
}

// CUDA 에러 체크
#define CUDA_CHECK(call) \
    do { \
        cudaError_t err = call; \
        if (err != cudaSuccess) { \
            printf("CUDA Error: %s at line %d\n", \
                   cudaGetErrorString(err), __LINE__); \
            exit(1); \
        } \
    } while(0)

// 결과 검증
int verifyResults(float* cpu, float* gpu, int n, float tolerance) {
    int errors = 0;
    for (int i = 0; i < n; i++) {
        if (fabsf(cpu[i] - gpu[i]) > tolerance) {
            if (errors < 5) {
                printf("Mismatch at %d: CPU=%.6f, GPU=%.6f\n",
                       i, cpu[i], gpu[i]);
            }
            errors++;
        }
    }
    return errors;
}

// ============================================================
// 메인 함수
// ============================================================

int main(int argc, char* argv[]) {
    printf("╔══════════════════════════════════════════════════════════════╗\n");
    printf("║  My CUDA Project                                             ║\n");
    printf("║  TODO: 프로젝트 설명을 여기에 작성하세요                     ║\n");
    printf("╚══════════════════════════════════════════════════════════════╝\n\n");

    int n = DATA_SIZE;
    size_t size = n * sizeof(float);

    printf("Data size: %d elements (%.2f MB)\n\n", n, size / (1024.0 * 1024.0));

    // ========== 메모리 할당 ==========
    printf("Allocating memory...\n");

    // Host 메모리
    float* h_input = (float*)malloc(size);
    float* h_output_cpu = (float*)malloc(size);
    float* h_output_gpu = (float*)malloc(size);

    // Device 메모리
    float *d_input, *d_output;
    CUDA_CHECK(cudaMalloc(&d_input, size));
    CUDA_CHECK(cudaMalloc(&d_output, size));

    // ========== 데이터 초기화 ==========
    printf("Initializing data...\n");
    srand(42);
    for (int i = 0; i < n; i++) {
        h_input[i] = (float)rand() / RAND_MAX;
    }

    // ========== CPU 실행 ==========
    printf("\nRunning CPU version...\n");
    double cpu_start = getTimeMs();
    myCPUFunction(h_input, h_output_cpu, n);
    double cpu_time = getTimeMs() - cpu_start;
    printf("CPU Time: %.3f ms\n", cpu_time);

    // ========== GPU 실행 ==========
    printf("\nRunning GPU version...\n");

    // 데이터 복사 (Host -> Device)
    CUDA_CHECK(cudaMemcpy(d_input, h_input, size, cudaMemcpyHostToDevice));

    // 커널 설정
    int gridSize = (n + BLOCK_SIZE - 1) / BLOCK_SIZE;
    printf("Grid: %d blocks, Block: %d threads\n", gridSize, BLOCK_SIZE);

    // 시간 측정 시작
    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);

    // 커널 실행
    myKernel<<<gridSize, BLOCK_SIZE>>>(d_input, d_output, n);

    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float gpu_time;
    cudaEventElapsedTime(&gpu_time, start, stop);
    printf("GPU Time: %.3f ms\n", gpu_time);

    // 결과 복사 (Device -> Host)
    CUDA_CHECK(cudaMemcpy(h_output_gpu, d_output, size, cudaMemcpyDeviceToHost));

    // ========== 결과 비교 ==========
    printf("\n========== Results ==========\n");
    printf("CPU Time: %.3f ms\n", cpu_time);
    printf("GPU Time: %.3f ms\n", gpu_time);
    if (gpu_time > 0) {
        printf("Speedup:  %.2fx\n", cpu_time / gpu_time);
    }
    printf("==============================\n\n");

    // 검증
    int errors = verifyResults(h_output_cpu, h_output_gpu, n, 0.0001f);
    printf("Verification: %s (%d errors)\n",
           errors == 0 ? "PASSED" : "FAILED", errors);

    // ========== 정리 ==========
    free(h_input);
    free(h_output_cpu);
    free(h_output_gpu);
    cudaFree(d_input);
    cudaFree(d_output);
    cudaEventDestroy(start);
    cudaEventDestroy(stop);

    printf("\nDone!\n");
    return 0;
}
