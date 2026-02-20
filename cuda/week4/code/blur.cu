/**
 * blur.cu - GPU 박스 블러 필터
 *
 * 컴파일: nvcc blur.cu -o blur
 * 실행: ./blur [input.jpg] [output.jpg]
 *
 * 3x3 박스 블러: 주변 9픽셀의 평균값
 */

#include <stdio.h>
#include <stdlib.h>
#include <cuda_runtime.h>

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

#define BLUR_SIZE 1  // 블러 반경 (1 = 3x3, 2 = 5x5)

// GPU 커널: 박스 블러
__global__ void boxBlur(unsigned char* input, unsigned char* output,
                        int width, int height, int channels) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        for (int c = 0; c < channels; c++) {
            float sum = 0;
            int count = 0;

            // 주변 픽셀 합산
            for (int dy = -BLUR_SIZE; dy <= BLUR_SIZE; dy++) {
                for (int dx = -BLUR_SIZE; dx <= BLUR_SIZE; dx++) {
                    int nx = x + dx;
                    int ny = y + dy;

                    // 경계 체크
                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        sum += input[(ny * width + nx) * channels + c];
                        count++;
                    }
                }
            }

            // 평균 계산
            output[(y * width + x) * channels + c] = (unsigned char)(sum / count);
        }
    }
}

// CPU 버전 (비교용)
void boxBlurCPU(unsigned char* input, unsigned char* output,
                int width, int height, int channels) {
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            for (int c = 0; c < channels; c++) {
                float sum = 0;
                int count = 0;

                for (int dy = -BLUR_SIZE; dy <= BLUR_SIZE; dy++) {
                    for (int dx = -BLUR_SIZE; dx <= BLUR_SIZE; dx++) {
                        int nx = x + dx;
                        int ny = y + dy;

                        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                            sum += input[(ny * width + nx) * channels + c];
                            count++;
                        }
                    }
                }

                output[(y * width + x) * channels + c] = (unsigned char)(sum / count);
            }
        }
    }
}

int main(int argc, char* argv[]) {
    printf("==========================================\n");
    printf("  GPU Box Blur Filter (%dx%d)\n", BLUR_SIZE*2+1, BLUR_SIZE*2+1);
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
        // 테스트 이미지 생성 (체크 패턴)
        printf("Generating test image (%dx%d)...\n\n", width, height);
        h_input = (unsigned char*)malloc(width * height * 3);
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int idx = (y * width + x) * 3;
                int checker = ((x / 50) + (y / 50)) % 2;
                h_input[idx] = checker ? 255 : 0;
                h_input[idx + 1] = checker ? 255 : 0;
                h_input[idx + 2] = checker ? 255 : 0;
            }
        }
    }

    size_t imageSize = width * height * channels;

    unsigned char* h_output_cpu = (unsigned char*)malloc(imageSize);
    unsigned char* h_output_gpu = (unsigned char*)malloc(imageSize);

    // CPU 실행
    printf("Running CPU version...\n");
    clock_t cpu_start = clock();
    boxBlurCPU(h_input, h_output_cpu, width, height, channels);
    clock_t cpu_end = clock();
    double cpu_time = (double)(cpu_end - cpu_start) / CLOCKS_PER_SEC * 1000;

    // GPU 메모리 할당
    unsigned char *d_input, *d_output;
    cudaMalloc(&d_input, imageSize);
    cudaMalloc(&d_output, imageSize);
    cudaMemcpy(d_input, h_input, imageSize, cudaMemcpyHostToDevice);

    // GPU 실행
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
    boxBlur<<<blocks, threads>>>(d_input, d_output, width, height, channels);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float gpu_time;
    cudaEventElapsedTime(&gpu_time, start, stop);

    cudaMemcpy(h_output_gpu, d_output, imageSize, cudaMemcpyDeviceToHost);

    // 결과
    printf("========== Results ==========\n");
    printf("Image: %d x %d (%d pixels)\n", width, height, width * height);
    printf("CPU Time: %.3f ms\n", cpu_time);
    printf("GPU Time: %.3f ms\n", gpu_time);
    if (gpu_time > 0) {
        printf("Speedup: %.2fx\n", cpu_time / gpu_time);
    }
    printf("=============================\n\n");

    // 검증
    int errors = 0;
    for (int i = 0; i < width * height * channels; i++) {
        if (abs(h_output_cpu[i] - h_output_gpu[i]) > 1) errors++;
    }
    printf("Verification: %s\n\n", errors == 0 ? "PASSED" : "FAILED");

    // 저장
    const char* outputFile = (argc >= 3) ? argv[2] : "blur_output.jpg";
    stbi_write_jpg(outputFile, width, height, channels, h_output_gpu, 90);
    printf("Output saved: %s\n", outputFile);

    // 정리
    if (argc >= 2) stbi_image_free(h_input);
    else free(h_input);
    free(h_output_cpu);
    free(h_output_gpu);
    cudaFree(d_input);
    cudaFree(d_output);

    return 0;
}
