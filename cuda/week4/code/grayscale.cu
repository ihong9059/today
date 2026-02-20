/**
 * grayscale.cu - GPU 이미지 그레이스케일 변환
 *
 * 컴파일: nvcc grayscale.cu -o grayscale
 * 실행: ./grayscale input.jpg output.jpg
 *
 * stb_image 라이브러리 필요 (같은 폴더에 헤더 파일)
 */

#include <stdio.h>
#include <stdlib.h>
#include <cuda_runtime.h>

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

// GPU 커널: RGB -> Grayscale
// 공식: Gray = 0.299*R + 0.587*G + 0.114*B (인간의 눈 민감도 기반)
__global__ void rgbToGrayscale(unsigned char* input, unsigned char* output,
                                int width, int height, int channels) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int idx = (y * width + x) * channels;
        int outIdx = y * width + x;

        unsigned char r = input[idx];
        unsigned char g = input[idx + 1];
        unsigned char b = input[idx + 2];

        // 가중치 적용 그레이스케일
        output[outIdx] = (unsigned char)(0.299f * r + 0.587f * g + 0.114f * b);
    }
}

// CPU 버전 (비교용)
void rgbToGrayscaleCPU(unsigned char* input, unsigned char* output,
                        int width, int height, int channels) {
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            int idx = (y * width + x) * channels;
            int outIdx = y * width + x;

            unsigned char r = input[idx];
            unsigned char g = input[idx + 1];
            unsigned char b = input[idx + 2];

            output[outIdx] = (unsigned char)(0.299f * r + 0.587f * g + 0.114f * b);
        }
    }
}

int main(int argc, char* argv[]) {
    printf("==========================================\n");
    printf("  GPU Grayscale Conversion\n");
    printf("==========================================\n\n");

    // 테스트 이미지 생성 (파일이 없을 경우)
    int width = 1920;
    int height = 1080;
    int channels = 3;
    unsigned char* h_input;

    if (argc >= 2) {
        // 파일에서 이미지 로드
        h_input = stbi_load(argv[1], &width, &height, &channels, 3);
        if (!h_input) {
            printf("Error: Cannot load image '%s'\n", argv[1]);
            printf("Using generated test image instead.\n\n");
            argc = 1;  // 테스트 이미지 사용
        } else {
            channels = 3;
            printf("Loaded: %s (%dx%d)\n\n", argv[1], width, height);
        }
    }

    if (argc < 2) {
        // 테스트용 그라데이션 이미지 생성
        printf("Generating test image (%dx%d)...\n\n", width, height);
        h_input = (unsigned char*)malloc(width * height * 3);
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int idx = (y * width + x) * 3;
                h_input[idx] = (unsigned char)(255.0f * x / width);      // R
                h_input[idx + 1] = (unsigned char)(255.0f * y / height); // G
                h_input[idx + 2] = 128;                                   // B
            }
        }
    }

    size_t inputSize = width * height * channels;
    size_t outputSize = width * height;

    unsigned char* h_output_cpu = (unsigned char*)malloc(outputSize);
    unsigned char* h_output_gpu = (unsigned char*)malloc(outputSize);

    // CPU 실행
    printf("Running CPU version...\n");
    clock_t cpu_start = clock();
    rgbToGrayscaleCPU(h_input, h_output_cpu, width, height, channels);
    clock_t cpu_end = clock();
    double cpu_time = (double)(cpu_end - cpu_start) / CLOCKS_PER_SEC * 1000;

    // GPU 메모리 할당
    unsigned char *d_input, *d_output;
    cudaMalloc(&d_input, inputSize);
    cudaMalloc(&d_output, outputSize);

    // 데이터 복사 (Host -> Device)
    cudaMemcpy(d_input, h_input, inputSize, cudaMemcpyHostToDevice);

    // GPU 커널 실행
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
    rgbToGrayscale<<<blocks, threads>>>(d_input, d_output, width, height, channels);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float gpu_time;
    cudaEventElapsedTime(&gpu_time, start, stop);

    // 결과 복사 (Device -> Host)
    cudaMemcpy(h_output_gpu, d_output, outputSize, cudaMemcpyDeviceToHost);

    // 결과 비교
    printf("========== Results ==========\n");
    printf("Image size: %d x %d (%d pixels)\n", width, height, width * height);
    printf("CPU Time: %.3f ms\n", cpu_time);
    printf("GPU Time: %.3f ms\n", gpu_time);
    if (gpu_time > 0) {
        printf("Speedup: %.2fx\n", cpu_time / gpu_time);
    }
    printf("=============================\n\n");

    // 검증
    int errors = 0;
    for (int i = 0; i < width * height; i++) {
        if (abs(h_output_cpu[i] - h_output_gpu[i]) > 1) {
            errors++;
        }
    }
    printf("Verification: %s (%d errors)\n\n", errors == 0 ? "PASSED" : "FAILED", errors);

    // 결과 저장
    const char* outputFile = (argc >= 3) ? argv[2] : "grayscale_output.jpg";
    if (stbi_write_jpg(outputFile, width, height, 1, h_output_gpu, 90)) {
        printf("Output saved: %s\n", outputFile);
    }

    // 메모리 해제
    if (argc >= 2) stbi_image_free(h_input);
    else free(h_input);
    free(h_output_cpu);
    free(h_output_gpu);
    cudaFree(d_input);
    cudaFree(d_output);
    cudaEventDestroy(start);
    cudaEventDestroy(stop);

    return 0;
}
