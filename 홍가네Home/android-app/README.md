# 홍가네 Android App

가족 소통 플랫폼 "홍가네" 접속용 Android 앱입니다.

## 앱 정보

| 항목 | 내용 |
|:-----|:-----|
| 앱 이름 | 홍가네 |
| 패키지명 | com.hongane.app |
| 버전 | 1.0.0 |
| 최소 SDK | Android 7.0 (API 24) |
| 대상 SDK | Android 14 (API 34) |

## 주요 기능

- 🏠 홍가네 웹사이트 바로 접속
- 🎨 예쁜 스플래시 화면
- ↻ 당겨서 새로고침 (Pull-to-Refresh)
- ← 뒤로가기 버튼 지원
- 📶 오프라인 안내 화면
- 🌙 다크모드 지원

## 빌드 방법

### 방법 1: Android Studio에서 빌드

1. Android Studio에서 `android-app` 폴더 열기
2. `Build > Build Bundle(s) / APK(s) > Build APK(s)` 선택
3. 빌드 완료 후 `app/build/outputs/apk/debug/app-debug.apk` 생성

### 방법 2: 명령줄에서 빌드

```bash
cd android-app

# Windows
gradlew.bat assembleDebug

# Mac/Linux
./gradlew assembleDebug
```

### 방법 3: 온라인 빌드 서비스 (추천)

Android Studio가 없는 경우:

1. **Appetize.io** - 웹에서 테스트
2. **GitHub Actions** - 자동 빌드
3. **Codemagic** - 클라우드 빌드

## APK 설치 방법

1. 스마트폰에 APK 파일 전송 (카카오톡, 이메일, USB 등)
2. 파일 관리자에서 APK 파일 선택
3. "알 수 없는 앱 설치" 허용
4. 설치 완료!

## 서버 URL 변경

`app/src/main/res/values/strings.xml` 파일에서:

```xml
<string name="home_url">http://121.137.66.41:7001</string>
```

## 프로젝트 구조

```
android-app/
├── app/
│   ├── src/main/
│   │   ├── java/com/hongane/app/
│   │   │   ├── SplashActivity.kt    # 스플래시 화면
│   │   │   └── MainActivity.kt      # 메인 WebView
│   │   ├── res/
│   │   │   ├── drawable/            # 아이콘, 배경
│   │   │   ├── layout/              # 레이아웃
│   │   │   ├── mipmap-*/            # 앱 아이콘
│   │   │   └── values/              # 색상, 문자열, 테마
│   │   └── AndroidManifest.xml
│   └── build.gradle
├── build.gradle
└── settings.gradle
```

## 앱 아이콘 디자인

- **배경색**: #E53935 (따뜻한 레드)
- **전경**: 흰색 집 + 하트 조합
- **의미**: 가족의 사랑과 따뜻한 집

---

*홍가네 - 우리 가족의 소통 공간* 🏠❤️
