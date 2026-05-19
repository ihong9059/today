cmake_minimum_required(VERSION 3.20.0)
find_package(Zephyr REQUIRED HINTS $ENV{ZEPHYR_BASE})
project(pca10040_e22_900t_tx)
target_sources(app PRIVATE src/main.c)
