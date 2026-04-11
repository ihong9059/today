@echo off
set MSYSTEM=
set IDF_PATH=C:\Espressif\frameworks\esp-idf-v5.5.1
set IDF_PYTHON_ENV_PATH=C:\Espressif\python_env\idf5.5_py3.13_env
call C:\Espressif\idf_cmd_init.bat >nul 2>&1
cd C:\todo\today\aiHardStudy\firmware\led_blink

echo [BUILD] Starting build...
idf.py build 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo BUILD_FAILED
    exit /b 1
)

echo [BUILD] Build OK, flashing to COM20...
idf.py -p COM20 flash 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [BUILD] First flash attempt failed, retrying in 3 seconds...
    timeout /t 3 /nobreak >nul
    idf.py -p COM20 flash 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo FLASH_FAILED
        exit /b 2
    )
)
echo BUILD_FLASH_OK
