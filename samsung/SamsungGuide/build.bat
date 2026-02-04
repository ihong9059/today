@echo off
setlocal enabledelayedexpansion

set ANDROID_SDK=C:\Users\lenovo\AppData\Local\Android\Sdk
set BUILD_TOOLS=%ANDROID_SDK%\build-tools\34.0.0
set PLATFORM=%ANDROID_SDK%\platforms\android-34
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=%JAVA_HOME%\bin;%PATH%

set PROJECT=C:\todo\today\tablet\LenovoGuide
set SRC=%PROJECT%\app\src\main
set BUILD=%PROJECT%\build
set GEN=%BUILD%\gen
set OBJ=%BUILD%\obj

echo [1/6] Cleaning...
rmdir /s /q "%BUILD%" 2>nul
mkdir "%GEN%"
mkdir "%OBJ%"

echo [2/6] Compiling resources...
"%BUILD_TOOLS%\aapt2.exe" compile --dir "%SRC%\res" -o "%BUILD%\compiled_res.zip"

echo [3/6] Linking resources...
"%BUILD_TOOLS%\aapt2.exe" link -o "%BUILD%\app.unsigned.apk" -I "%PLATFORM%\android.jar" --manifest "%SRC%\AndroidManifest.xml" -R "%BUILD%\compiled_res.zip" --java "%GEN%" --auto-add-overlay --min-sdk-version 26 --target-sdk-version 34

echo [4/6] Compiling Java...
dir /s /b "%SRC%\java\*.java" > "%BUILD%\sources.txt"
dir /s /b "%GEN%\*.java" >> "%BUILD%\sources.txt"
"%JAVA_HOME%\bin\javac.exe" -source 11 -target 11 -classpath "%PLATFORM%\android.jar" -d "%OBJ%" @"%BUILD%\sources.txt"
if errorlevel 1 (
    echo Java compilation failed
    exit /b 1
)

echo [5/6] Creating DEX...
set CLASSFILES=
for /r "%OBJ%" %%f in (*.class) do set CLASSFILES=!CLASSFILES! "%%f"
"%BUILD_TOOLS%\d8.bat" --output "%BUILD%" !CLASSFILES!
if errorlevel 1 (
    echo DEX creation failed
    exit /b 1
)

echo [6/6] Packaging APK...
copy "%BUILD%\app.unsigned.apk" "%BUILD%\app.apk"
cd "%BUILD%"
"%JAVA_HOME%\bin\jar.exe" uf app.apk classes.dex

echo Creating debug keystore if not exists...
if not exist "%PROJECT%\debug.keystore" (
    "%JAVA_HOME%\bin\keytool.exe" -genkeypair -v -keystore "%PROJECT%\debug.keystore" -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
)

echo Signing APK...
"%BUILD_TOOLS%\apksigner.bat" sign --ks "%PROJECT%\debug.keystore" --ks-pass pass:android --key-pass pass:android "%BUILD%\app.apk"

echo Aligning APK...
"%BUILD_TOOLS%\zipalign.exe" -f 4 "%BUILD%\app.apk" "%BUILD%\LenovoGuide.apk"

echo.
echo ===================================
echo APK created: %BUILD%\LenovoGuide.apk
echo ===================================

endlocal
