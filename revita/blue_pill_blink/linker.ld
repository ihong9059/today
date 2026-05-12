/*
 * Linker script — STM32F103C8T6 (Blue Pill)
 *   Flash: 64 KB at 0x08000000
 *   RAM:   20 KB at 0x20000000
 */

MEMORY
{
    FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 64K
    RAM (rwx)  : ORIGIN = 0x20000000, LENGTH = 20K
}

/* 스택 포인터 초기값 — RAM의 최상단 (Cortex-M은 full descending) */
_estack = ORIGIN(RAM) + LENGTH(RAM);

ENTRY(Reset_Handler)

SECTIONS
{
    /* 1) Vector table — Flash 시작 위치 (0x08000000)에 고정 */
    .isr_vector :
    {
        . = ALIGN(4);
        KEEP(*(.isr_vector))
        . = ALIGN(4);
    } > FLASH

    /* 2) 코드와 read-only 데이터 */
    .text :
    {
        . = ALIGN(4);
        *(.text*)
        *(.rodata*)
        *(.glue_7)
        *(.glue_7t)
        . = ALIGN(4);
    } > FLASH

    /* .data의 LMA(Load Address) = Flash, VMA(Virtual Address) = RAM
     * Reset_Handler에서 _sidata→_sdata로 복사
     */
    _sidata = LOADADDR(.data);

    .data :
    {
        . = ALIGN(4);
        _sdata = .;
        *(.data*)
        . = ALIGN(4);
        _edata = .;
    } > RAM AT> FLASH

    /* 4) .bss — RAM에만 위치, 0으로 초기화 */
    .bss :
    {
        . = ALIGN(4);
        _sbss = .;
        *(.bss*)
        *(COMMON)
        . = ALIGN(4);
        _ebss = .;
    } > RAM

    /* 디스카드 — 정적 초기화 배열 등 본 minimal 환경에서 불필요 */
    /DISCARD/ :
    {
        *(.ARM.attributes)
        *(.ARM.exidx*)
        *(.ARM.extab*)
    }
}
