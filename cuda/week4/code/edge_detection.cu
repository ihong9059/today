/**
 * edge_detection.cu - GPU 소벨 엣지 검출
 *
 * 컴파일: nvcc edge_detection.cu -o edge_detection
 * 실행: ./edge_detection [input.jpg] [output.jpg]
 *
 * 소벨 필터로 이미지의 가장자리(엣지)를 검출합니다.
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <cuda_runtime.h>

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

// 소벨 커널 (상수 메모리에 저장)
__constant__ int d_sobelX[9] = {-1, 0, 1, -2, 0, 2, -1, 0, 1};
__constant__ int d_sobelY[9] = {-1, -2, -1, 0, 0, 0, 1, 2, 1};

// GPU 커널: 소벨 엣지 검출
__global__ void sobelEdge(unsigned char* input, unsigned char* output,
                          int width, int height) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
        float gx = 0, gy = 0;

        // 3x3 컨볼루션
        for (int dy = -1; dy <= 1; dy++) {
            for (int dx = -1; dx <= 1; dx++) {
                int idx = (y + dy) * width + (x + dx);
                int kidx = (dy + 1) * 3 + (dx + 1);

                float pixel = input[idx];
                gx += pixel * d_sobelX[kidx];
                gy += pixel * d_sobelY[kidx];
            }
        }

        // 그래디언트 크기 계산
        float magnitude = sqrtf(gx * gx + gy * gy);

        // 0-255 범위로 클램핑
        output[y * width + x] = (unsigned char)fminf(255.0f, magnitude);
    } else if (x < width && y < height) {
        output[y * width + x] = 0;  // 경계는 0으로
    }
}

// RGB를 그레이스케일로 변환 (엣지 검출 전처리)
__global__ void rgbToGray(unsigned char* input, unsigned char* output,
                          int width, int height, int channels) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int idx = (y * width + x) * channels;
        float r = input[idx];
        float g = input[idx + 1];
        float b = input[idx + 2];
        output[y * width + x] = (unsigned char)(0.299f * r + 0.587f * g + 0.114f * b);
    }
}

// CPU 버전 (비교용)
void sobelEdgeCPU(unsigned char* input, unsigned char* output,
                  int width, int height) {
    int sobelX[9] = {-1, 0, 1, -2, 0, 2, -1, 0, 1};
    int sobelY[9] = {-1, -2, -1, 0, 0, 0, 1, 2, 1};

    for (int y = 1; y < height - 1; y++) {
        for (int x = 1; x < width - 1; x++) {
            float gx = 0, gy = 0;

            for (int dy = -1; dy <= 1; dy++) {
                for (int dx = -1; dx <= 1; dx++) {
                    int idx = (y + dy) * width + (x + dx);
                    int kidx = (dy + 1) * 3 + (dx + 1);

                    float pixel = input[idx];
                    gx += pixel * sobelX[kidx];
                    gy += pixel * sobelY[kidx];
                }
            }

            float magnitude = sqrtf(gx * gx + gy * gy);
            output[y * width + x] = (unsigned char)fminf(255.0f, magnitude);
        }
    }
}

int main(int argc, char* argv[]) {
    printf("==========================================\n");
    printf("  GPU Sobel Edge Detection\n");
    printf("==========================================\n\n");

    int width = 1920;
    int height = 1080;
    int channels = 3;
    unsigned char* h_input;

    if (argc >= 2) {
        h_input = stbi_load(argv[1], &width, &height, &channels, 3);
        if (!h_input) {
            printf("Error: Cannot load '%s'\n", argv[1]);
            argc = 1;
        } else {
            channels = 3;
            printf("Loaded: %s (%dx%d)\n\n", argv[1], width, height);
        }
    }

    if (argc < 2) {
        // 테스트 이미지 (사각형 패턴)
        printf("Generating test image (%dx%d)...\n\n", width, height);
        h_input = (unsigned char*)malloc(width * height * 3);
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int idx = (y * width + x) * 3;
                // 중앙에 사각형
                if (x > width/4 && x < width*3/4 && y > height/4 && y < height*3/4) {
                    h_input[idx] = h_input[idx+1] = h_input[idx+2] = 200;
                } else {
                    h_input[idx] = h_input[idx+1] = h_input[idx+2] = 50;
                }
            }
        }
    }

    size_t rgbSize = width * height * channels;
    size_t graySize = width * height;

    unsigned char* h_gray = (unsigned char*)malloc(graySize);
    unsigned char* h_output_cpu = (unsigned char*)malloc(graySize);
    unsigned char* h_output_gpu = (unsigned char*)malloc(graySize);

    // CPU: RGB -> Gray
    for (int i = 0; i < width * height; i++) {
        float r = h_input[i * 3];
        float g = h_input[i * 3 + 1];
        float b = h_input[i * 3 + 2];
        h_gray[i] = (unsigned char)(0.299f * r + 0.587f * g + 0.114f * b);
    }

    // CPU 엣지 검출
    printf("Running CPU version...\n");
    clock_t cpu_start = clock();
    sobelEdgeCPU(h_gray, h_output_cpu, width, height);
    clock_t cpu_end = clock();
    double cpu_time = (double)(cpu_end - cpu_start) / CLOCKS_PER_SEC * 1000;

    // GPU 메모리
    unsigned char *d_input, *d_gray, *d_output;
    cudaMalloc(&d_input, rgbSize);
    cudaMalloc(&d_gray, graySize);
    cudaMalloc(&d_output, graySize);

    cudaMemcpy(d_input, h_input, rgbSize, cudaMemcpyHostToDevice);

    dim3 threads(16, 16);
    dim3 blocks((width + threads.x - 1) / threads.x,
                (height + threads.y - 1) / threads.y);

    printf("Running GPU version...\n");
    printf("  Grid: %d x %d blocks\n", blocks.x, blocks.y);
    printf("  Block: %d x %d threads\n\n", threads.x, threads.y);

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);
    // RGB -> Gray
    rgbToGray<<<blocks, threads>>>(d_input, d_gray, width, height, channels);
    // 소벨 엣지
    sobelEdge<<<blocks, threads>>>(d_gray, d_output, width, height);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float gpu_time;
    cudaEventElapsedTime(&gpu_time, start, stop);

    cudaMemcpy(h_output_gpu, d_output, graySize, cudaMemcpyDeviceToHost);

    // 결과
    printf("========== Results ==========\n");
    printf("Image: %d x %d (%d pixels)\n", width, height, width * height);
    printf("CPU Time: %.3f ms\n", cpu_time);
    printf("GPU Time: %.3f ms (includes grayscale)\n", gpu_time);
    if (gpu_time > 0) {
        printf("Speedup: %.2fx\n", cpu_time / gpu_time);
    }
    printf("=============================\n\n");

    // 검증
    int errors = 0;
    for (int i = 0; i < width * height; i++) {
        if (abs(h_output_cpu[i] - h_output_gpu[i]) > 2) errors++;
    }
    printf("Verification: %s (%d differences)\n\n",
           errors < 100 ? "PASSED" : "FAILED", errors);

    // 저장
    const char* outputFile = (argc >= 3) ? argv[2] : "edge_output.jpg";
    stbi_write_jpg(outputFile, width, height, 1, h_output_gpu, 90);
    printf("Output saved: %s\n", outputFile);

    // 정리
    if (argc >= 2) stbi_image_free(h_input);
    else free(h_input);
    free(h_gray);
    free(h_output_cpu);
    free(h_output_gpu);
    cudaFree(d_input);
    cudaFree(d_gray);
    cudaFree(d_output);

    return 0;
}
