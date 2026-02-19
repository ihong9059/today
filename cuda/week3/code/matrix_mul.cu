/**
 * matrix_mul.cu - GPU 행렬 곱셈 (기본 + 타일링)
 *
 * 컴파일: nvcc matrix_mul.cu -o matrix_mul
 * 실행: ./matrix_mul
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define TILE_SIZE 16

// 기본 GPU 커널
__global__ void matrixMulBasic(float* A, float* B, float* C,
                                int M, int K, int N) {
    int row = blockIdx.y * blockDim.y + threadIdx.y;
    int col = blockIdx.x * blockDim.x + threadIdx.x;

    if (row < M && col < N) {
        float sum = 0;
        for (int k = 0; k < K; k++) {
            sum += A[row * K + k] * B[k * N + col];
        }
        C[row * N + col] = sum;
    }
}

// 타일링 GPU 커널 (Shared Memory 사용)
__global__ void matrixMulTiled(float* A, float* B, float* C,
                                int M, int K, int N) {
    __shared__ float tileA[TILE_SIZE][TILE_SIZE];
    __shared__ float tileB[TILE_SIZE][TILE_SIZE];

    int row = blockIdx.y * TILE_SIZE + threadIdx.y;
    int col = blockIdx.x * TILE_SIZE + threadIdx.x;

    float sum = 0;

    // 타일 단위로 반복
    for (int t = 0; t < (K + TILE_SIZE - 1) / TILE_SIZE; t++) {
        // A 타일 로드
        int aCol = t * TILE_SIZE + threadIdx.x;
        if (row < M && aCol < K) {
            tileA[threadIdx.y][threadIdx.x] = A[row * K + aCol];
        } else {
            tileA[threadIdx.y][threadIdx.x] = 0;
        }

        // B 타일 로드
        int bRow = t * TILE_SIZE + threadIdx.y;
        if (bRow < K && col < N) {
            tileB[threadIdx.y][threadIdx.x] = B[bRow * N + col];
        } else {
            tileB[threadIdx.y][threadIdx.x] = 0;
        }

        __syncthreads();

        // 타일 내 계산
        for (int k = 0; k < TILE_SIZE; k++) {
            sum += tileA[threadIdx.y][k] * tileB[k][threadIdx.x];
        }

        __syncthreads();
    }

    // 결과 저장
    if (row < M && col < N) {
        C[row * N + col] = sum;
    }
}

// CPU 버전 (검증용)
void matrixMulCPU(float* A, float* B, float* C,
                  int M, int K, int N) {
    for (int i = 0; i < M; i++) {
        for (int j = 0; j < N; j++) {
            float sum = 0;
            for (int k = 0; k < K; k++) {
                sum += A[i * K + k] * B[k * N + j];
            }
            C[i * N + j] = sum;
        }
    }
}

// 결과 검증
int verify(float* cpu, float* gpu, int size) {
    for (int i = 0; i < size; i++) {
        if (abs(cpu[i] - gpu[i]) > 1.0f) {  // 행렬 곱셈은 오차가 클 수 있음
            printf("Mismatch at %d: CPU=%f, GPU=%f\n", i, cpu[i], gpu[i]);
            return 0;
        }
    }
    return 1;
}

int main() {
    int M = 512;  // A의 행, C의 행
    int K = 512;  // A의 열, B의 행
    int N = 512;  // B의 열, C의 열

    printf("========================================\n");
    printf("  Matrix Multiplication\n");
    printf("  A(%dx%d) x B(%dx%d) = C(%dx%d)\n", M, K, K, N, M, N);
    printf("========================================\n\n");

    size_t sizeA = M * K * sizeof(float);
    size_t sizeB = K * N * sizeof(float);
    size_t sizeC = M * N * sizeof(float);

    // 메모리 할당
    float *A, *B, *C_basic, *C_tiled, *C_cpu;
    cudaMallocManaged(&A, sizeA);
    cudaMallocManaged(&B, sizeB);
    cudaMallocManaged(&C_basic, sizeC);
    cudaMallocManaged(&C_tiled, sizeC);
    C_cpu = (float*)malloc(sizeC);

    // 초기화
    srand(42);
    for (int i = 0; i < M * K; i++) A[i] = rand() % 10;
    for (int i = 0; i < K * N; i++) B[i] = rand() % 10;

    // CPU 실행
    printf("Running CPU version...\n");
    clock_t cpu_start = clock();
    matrixMulCPU(A, B, C_cpu, M, K, N);
    clock_t cpu_end = clock();
    double cpu_time = (double)(cpu_end - cpu_start) / CLOCKS_PER_SEC * 1000;

    // GPU 설정
    dim3 threads(TILE_SIZE, TILE_SIZE);
    dim3 blocks((N + TILE_SIZE - 1) / TILE_SIZE,
                (M + TILE_SIZE - 1) / TILE_SIZE);

    printf("Grid: %d x %d blocks\n", blocks.x, blocks.y);
    printf("Block: %d x %d threads\n\n", threads.x, threads.y);

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);
    float ms;

    // 기본 GPU
    printf("Running GPU Basic version...\n");
    cudaEventRecord(start);
    matrixMulBasic<<<blocks, threads>>>(A, B, C_basic, M, K, N);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);
    cudaEventElapsedTime(&ms, start, stop);
    float basic_time = ms;

    // 타일링 GPU
    printf("Running GPU Tiled version...\n");
    cudaEventRecord(start);
    matrixMulTiled<<<blocks, threads>>>(A, B, C_tiled, M, K, N);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);
    cudaEventElapsedTime(&ms, start, stop);
    float tiled_time = ms;

    // 결과 출력
    printf("\n========== Results ==========\n");
    printf("CPU Time:        %8.3f ms\n", cpu_time);
    printf("GPU Basic Time:  %8.3f ms (%.1fx faster than CPU)\n",
           basic_time, cpu_time / basic_time);
    printf("GPU Tiled Time:  %8.3f ms (%.1fx faster than CPU)\n",
           tiled_time, cpu_time / tiled_time);
    printf("Tiled vs Basic:  %.2fx faster\n", basic_time / tiled_time);
    printf("=============================\n\n");

    // 검증
    printf("Verifying Basic... ");
    if (verify(C_cpu, C_basic, M * N)) printf("PASSED!\n");
    printf("Verifying Tiled... ");
    if (verify(C_cpu, C_tiled, M * N)) printf("PASSED!\n");

    // 샘플 출력
    printf("\nSample results (first 3x3 of C):\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%8.1f ", C_tiled[i * N + j]);
        }
        printf("\n");
    }

    // 메모리 해제
    cudaFree(A);
    cudaFree(B);
    cudaFree(C_basic);
    cudaFree(C_tiled);
    free(C_cpu);

    cudaEventDestroy(start);
    cudaEventDestroy(stop);

    return 0;
}
