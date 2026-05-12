/*
 * Minimal Cortex-M3 startup for STM32F103C8T6.
 *
 *  - 0x08000000 (Flash 시작) 위치에 vector table 배치
 *  - Reset_Handler가 .data를 Flash에서 RAM으로 복사
 *  - .bss를 0으로 초기화
 *  - main() 호출
 *
 * 본 startup은 CMSIS / ST HAL을 사용하지 않음. 점멸용 최소 구성.
 */

#include <stdint.h>

/* linker.ld에서 정의되는 심볼 */
extern uint32_t _estack;   /* 스택 최상단 (RAM의 끝)   */
extern uint32_t _sidata;   /* .data의 초기값이 저장된 Flash 주소 */
extern uint32_t _sdata;    /* .data의 RAM 시작        */
extern uint32_t _edata;    /* .data의 RAM 끝          */
extern uint32_t _sbss;     /* .bss의 RAM 시작         */
extern uint32_t _ebss;     /* .bss의 RAM 끝           */

int main(void);

void Reset_Handler(void)
{
    /* .data 초기값을 Flash에서 RAM으로 복사 */
    uint32_t *src = &_sidata;
    uint32_t *dst = &_sdata;
    while (dst < &_edata) {
        *dst++ = *src++;
    }

    /* .bss 영역을 0으로 초기화 */
    dst = &_sbss;
    while (dst < &_ebss) {
        *dst++ = 0;
    }

    main();

    /* main이 절대 return하지 않아야 하지만 안전망 */
    while (1) { }
}

/* 처리되지 않은 모든 예외는 무한 루프로 잡힘 (디버거에서 발견 용이) */
void Default_Handler(void)
{
    while (1) { }
}

#define WEAK_ALIAS  __attribute__((weak, alias("Default_Handler")))
void NMI_Handler(void)        WEAK_ALIAS;
void HardFault_Handler(void)  WEAK_ALIAS;
void MemManage_Handler(void)  WEAK_ALIAS;
void BusFault_Handler(void)   WEAK_ALIAS;
void UsageFault_Handler(void) WEAK_ALIAS;
void SVC_Handler(void)        WEAK_ALIAS;
void DebugMon_Handler(void)   WEAK_ALIAS;
void PendSV_Handler(void)     WEAK_ALIAS;
void SysTick_Handler(void)    WEAK_ALIAS;

/* Cortex-M3 표준 vector table (첫 16 엔트리만 채움 — STM32 IRQ는 LED 점멸에 불필요) */
__attribute__((section(".isr_vector"), used))
const void * const vector_table[] = {
    (void *)&_estack,       /*  0  Initial SP            */
    Reset_Handler,          /*  1  Reset                 */
    NMI_Handler,            /*  2  NMI                   */
    HardFault_Handler,      /*  3  HardFault             */
    MemManage_Handler,      /*  4  MemManage             */
    BusFault_Handler,       /*  5  BusFault              */
    UsageFault_Handler,     /*  6  UsageFault            */
    0, 0, 0, 0,             /*  7-10 Reserved            */
    SVC_Handler,            /* 11  SVCall                */
    DebugMon_Handler,       /* 12  DebugMon              */
    0,                      /* 13  Reserved              */
    PendSV_Handler,         /* 14  PendSV                */
    SysTick_Handler,        /* 15  SysTick               */
};
