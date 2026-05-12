# Blue Pill blink — build script
# STM32CubeIDE 번들 GCC 사용 (별도 설치 불필요)

$ErrorActionPreference = "Stop"

# === 도구 경로 ===
$GccDir = "C:\ST\STM32CubeIDE_1.19.0\STM32CubeIDE\plugins\com.st.stm32cube.ide.mcu.externaltools.gnu-tools-for-stm32.13.3.rel1.win32_1.0.0.202411081344\tools\bin"
$Gcc     = Join-Path $GccDir "arm-none-eabi-gcc.exe"
$ObjCopy = Join-Path $GccDir "arm-none-eabi-objcopy.exe"
$Size    = Join-Path $GccDir "arm-none-eabi-size.exe"

if (-not (Test-Path $Gcc)) {
    Write-Error "ARM GCC not found at: $Gcc`nSTM32CubeIDE 경로가 변경됐는지 확인하세요."
    exit 1
}

# === 컴파일 플래그 ===
$CFlags = @(
    "-mcpu=cortex-m3", "-mthumb",
    "-O2", "-g3",
    "-ffreestanding", "-nostdlib", "-nostartfiles",
    "-Wall", "-Wextra",
    "-fdata-sections", "-ffunction-sections"
)

$LdFlags = @(
    "-T", "linker.ld",
    "-Wl,--gc-sections",
    "-Wl,-Map=blink.map",
    "-Wl,--print-memory-usage"
)

Push-Location $PSScriptRoot

try {
    Write-Host "[1/3] Compile..." -ForegroundColor Cyan
    & $Gcc @CFlags -c main.c    -o main.o
    & $Gcc @CFlags -c startup.c -o startup.o

    Write-Host "[2/3] Link..." -ForegroundColor Cyan
    & $Gcc @CFlags @LdFlags main.o startup.o -o blink.elf

    Write-Host "[3/3] HEX / BIN..." -ForegroundColor Cyan
    & $ObjCopy -O ihex   blink.elf blink.hex
    & $ObjCopy -O binary blink.elf blink.bin

    Write-Host ""
    Write-Host "=== Section sizes ===" -ForegroundColor Green
    & $Size blink.elf

    $binSize = (Get-Item blink.bin).Length
    Write-Host ""
    Write-Host "Build OK.  blink.bin = $binSize bytes  (Flash 64 KB의 $('{0:F2}' -f ($binSize / 65536 * 100)) %)" -ForegroundColor Green
}
finally {
    Pop-Location
}
