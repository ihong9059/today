cmake_minimum_required(VERSION 3.20.0)
find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
project(lora_tx_water_level)

target_sources(app PRIVATE
	src/main.c
	src/sw_uart.c
	src/sw_uart_rx.c
)
