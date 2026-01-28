# 홍가네 APK 빌드 가이드

## 방법 1: Android Studio 사용 (권장)

### 1. Android Studio 설치
- https://developer.android.com/studio 에서 다운로드
- 설치 후 SDK 자동 다운로드됨

### 2. 프로젝트 열기
1. Android Studio 실행
2. `File > Open` 클릭
3. `C:\todo\today\homepage\android-app` 폴더 선택
4. Gradle 동기화 대기 (자동)

### 3. APK 빌드
1. 메뉴: `Build > Build Bundle(s) / APK(s) > Build APK(s)`
2. 빌드 완료 알림 클릭 → "locate" 클릭
3. `app-debug.apk` 파일 확인

### 4. 릴리즈 APK 빌드 (서명된 앱)
1. 메뉴: `Build > Generate Signed Bundle / APK`
2. APK 선택 > Next
3. 새 키스토어 생성 또는 기존 키 사용
4. release 선택 > Finish

---

## 방법 2: 명령줄 빌드

### Windows
```cmd
cd C:\todo\today\homepage\android-app
gradlew.bat assembleDebug
```

### Mac/Linux
```bash
cd ~/homepage/android-app
chmod +x gradlew
./gradlew assembleDebug
```

---

## 방법 3: GitHub Actions 자동 빌드

1. 이 프로젝트를 GitHub에 push
2. `.github/workflows/build.yml` 파일 추가:

```yaml
name: Build APK

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Set up JDK 17
      uses: actions/setup-java@v4
      with:
        java-version: '17'
        distribution: 'temurin'

    - name: Build Debug APK
      run: |
        cd android-app
        chmod +x gradlew
        ./gradlew assembleDebug

    - name: Upload APK
      uses: actions/upload-artifact@v4
      with:
        name: hongane-app
        path: android-app/app/build/outputs/apk/debug/app-debug.apk
```

3. Actions 탭에서 빌드된 APK 다운로드

---

## 방법 4: 온라인 빌드 서비스

### Codemagic (무료)
1. https://codemagic.io 가입
2. GitHub 연동
3. 이 프로젝트 선택 > Build

### AppCenter (Microsoft)
1. https://appcenter.ms 가입
2. 새 앱 추가 > Android 선택
3. GitHub 연동 > 빌드

---

## APK 설치 방법

### 스마트폰에서 설치

1. **APK 파일 전송**
   - 카카오톡으로 전송
   - 이메일 첨부
   - USB 케이블 연결
   - Google Drive 업로드

2. **알 수 없는 앱 설치 허용**
   - 설정 > 보안 > 알 수 없는 앱 설치
   - 파일 관리자 앱에서 허용

3. **APK 실행하여 설치**

---

## URL 변경 시

`app/src/main/res/values/strings.xml`:

```xml
<!-- 현재 설정 -->
<string name="home_url">http://121.137.66.41:7001</string>

<!-- 다른 서버로 변경 예시 -->
<string name="home_url">https://your-domain.com</string>
```

---

## 문제 해결

### Gradle 동기화 실패
- Android Studio에서 `File > Invalidate Caches / Restart`

### SDK 버전 오류
- `File > Project Structure > Project`에서 SDK 버전 확인

### 빌드 느림
- `gradle.properties`에 추가:
  ```
  org.gradle.daemon=true
  org.gradle.parallel=true
  ```

---

*빌드 문의: 앱 관련 문의는 개발자에게 연락*
