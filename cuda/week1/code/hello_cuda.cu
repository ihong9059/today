/**
 * hello_cuda.cu - 첫 번째 CUDA 프로그램
 *
 * 컴파일: nvcc hello_cuda.cu -o hello_cuda
 * 실행: ./hello_cuda
 */

#include <stdio.h>

// __global__ : GPU에서 실행되는 함수 (커널)
__global__ void helloFromGPU() {
    printf("Hello from GPU! I am thread %d\n", threadIdx.x);
}

int main() {
    // CPU에서 출력
    printf("Hello from CPU!\n");
    printf("-------------------\n");

    // GPU 커널 호출
    // <<<1, 5>>> : 1개 블록, 5개 스레드
    helloFromGPU<<<1, 5>>>();

    // GPU 작업 완료 대기
    cudaDeviceSynchronize();

    printf("-------------------\n");
    printf("Done!\n");

    return 0;
}
