#!/bin/bash

# Android SDK paths
ANDROID_SDK="/usr/local/share/android-commandlinetools"
BUILD_TOOLS="$ANDROID_SDK/build-tools/34.0.0"
PLATFORM="$ANDROID_SDK/platforms/android-34"

# Project paths
PROJECT="$(cd "$(dirname "$0")" && pwd)"
SRC="$PROJECT/app/src/main"
BUILD="$PROJECT/build"
GEN="$BUILD/gen"
OBJ="$BUILD/obj"

echo "[1/7] Cleaning..."
rm -rf "$BUILD"
mkdir -p "$GEN"
mkdir -p "$OBJ"

echo "[2/7] Compiling resources..."
"$BUILD_TOOLS/aapt2" compile --dir "$SRC/res" -o "$BUILD/compiled_res.zip"
if [ $? -ne 0 ]; then
    echo "Resource compilation failed"
    exit 1
fi

echo "[3/7] Linking resources..."
"$BUILD_TOOLS/aapt2" link -o "$BUILD/app.unsigned.apk" \
    -I "$PLATFORM/android.jar" \
    --manifest "$SRC/AndroidManifest.xml" \
    -R "$BUILD/compiled_res.zip" \
    --java "$GEN" \
    --auto-add-overlay \
    --min-sdk-version 26 \
    --target-sdk-version 34
if [ $? -ne 0 ]; then
    echo "Resource linking failed"
    exit 1
fi

echo "[4/7] Compiling Java..."
find "$SRC/java" -name "*.java" > "$BUILD/sources.txt"
find "$GEN" -name "*.java" >> "$BUILD/sources.txt"
javac -source 11 -target 11 \
    -classpath "$PLATFORM/android.jar" \
    -d "$OBJ" \
    @"$BUILD/sources.txt" 2>&1
if [ $? -ne 0 ]; then
    echo "Java compilation failed"
    exit 1
fi

echo "[5/7] Creating DEX..."
"$BUILD_TOOLS/d8" --output "$BUILD" $(find "$OBJ" -name "*.class")
if [ $? -ne 0 ]; then
    echo "DEX creation failed"
    exit 1
fi

echo "[6/7] Packaging APK..."
cp "$BUILD/app.unsigned.apk" "$BUILD/app.apk"
cd "$BUILD"
zip -u app.apk classes.dex

# Create debug keystore if not exists
if [ ! -f "$PROJECT/debug.keystore" ]; then
    echo "Creating debug keystore..."
    keytool -genkeypair -v \
        -keystore "$PROJECT/debug.keystore" \
        -storepass android \
        -alias androiddebugkey \
        -keypass android \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -dname "CN=Android Debug,O=Android,C=US"
fi

echo "[7/7] Aligning and Signing APK..."
# Align first, then sign
"$BUILD_TOOLS/zipalign" -f 4 "$BUILD/app.apk" "$BUILD/app_aligned.apk"

"$BUILD_TOOLS/apksigner" sign \
    --ks "$PROJECT/debug.keystore" \
    --ks-pass pass:android \
    --key-pass pass:android \
    --out "$BUILD/SamsungGuide.apk" \
    "$BUILD/app_aligned.apk"

echo ""
echo "==================================="
echo "APK created: $BUILD/SamsungGuide.apk"
echo "==================================="
