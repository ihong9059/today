/**
 * gugudan.cu - GPU로 구구단 출력하기
 *
 * 컴파일: nvcc gugudan.cu -o gugudan
 * 실행: ./gugudan
 */

#include <stdio.h>

// 특정 단의 구구단을 출력하는 커널
__global__ void gugudan(int dan) {
    int num = threadIdx.x + 1;  // 1 ~ 9
    printf("%d x %d = %2d\n", dan, num, dan * num);
}

// 모든 단을 출력하는 커널 (도전 과제)
__global__ void gugudanAll() {
    int dan = blockIdx.x + 2;   // 2 ~ 9단
    int num = threadIdx.x + 1;  // 1 ~ 9

    printf("%d x %d = %2d\n", dan, num, dan * num);
}

int main() {
    int dan;

    printf("=== GPU 구구단 ===\n\n");

    // 3단 출력
    dan = 3;
    printf("[ %d단 ]\n", dan);
    gugudan<<<1, 9>>>(dan);
    cudaDeviceSynchronize();

    printf("\n");

    // 7단 출력
    dan = 7;
    printf("[ %d단 ]\n", dan);
    gugudan<<<1, 9>>>(dan);
    cudaDeviceSynchronize();

    printf("\n");

    // 도전: 2~9단 전체 출력
    printf("[ 2~9단 전체 (8블록 x 9스레드 = 72개 출력) ]\n");
    gugudanAll<<<8, 9>>>();
    cudaDeviceSynchronize();

    return 0;
}
