# 전시회용 단독 웹 서버

## 개요

스마트 파쇄기 AI 모니터링 시스템 소개 페이지를 전시회 현장에서 단독으로 운영하기 위한 웹 서버입니다.

- **원본 URL**: https://uttec-sensor.duckdns.org/demo/hankookmech/
- **용도**: AW 2026, 인터배터리 2026 전시회 부스 운영
- **특징**: 인터넷 연결 없이 로컬에서 운영 가능

---

## 파일 구성

```
webserver/
├── index.html          # 메인 페이지 (단일 파일)
├── server.py           # Python 웹 서버
├── start_server.bat    # Windows 실행 스크립트
└── README.md           # 사용 가이드
```

---

## 실행 방법

### 방법 1: 배치 파일 실행 (권장)

```
start_server.bat 더블클릭
```

### 방법 2: 명령어 실행

```bash
# 기본 포트 (8080)
python server.py

# 특정 포트 지정
python server.py 3000
```

### 방법 3: Python 내장 서버

```bash
cd webserver
python -m http.server 8080
```

---

## 접속 방법

서버 실행 후:

| 접속 유형 | URL |
|----------|-----|
| **로컬 PC** | http://localhost:8080 |
| **같은 네트워크** | http://[IP주소]:8080 |

서버 시작 시 네트워크 IP 주소가 표시됩니다.

---

## 전시회 현장 운영

### 필요 장비

- 노트북 또는 PC (Python 3.x 설치)
- 60인치 대형 모니터 (HDMI 연결)
- 태블릿 (선택: 상담용 데모)

### 설정 순서

1. 노트북에 Python 3.x 설치 확인
2. `start_server.bat` 실행
3. 대형 모니터에 브라우저 전체화면(F11)으로 표시
4. 태블릿에서 네트워크 IP로 접속

### 권장 브라우저 설정

```
1. Chrome 또는 Edge 사용
2. F11 키로 전체화면
3. 키오스크 모드 권장 (chrome --kiosk http://localhost:8080)
```

### 키오스크 모드 실행 (자동 시작)

```batch
@echo off
start chrome --kiosk --app=http://localhost:8080
```

---

## 페이지 구성

### 섹션

| 섹션 | 내용 |
|------|------|
| **Hero** | 메인 타이틀, CTA 버튼 |
| **Stats** | 핵심 성과 (70% 감소, 145% ROI 등) |
| **Problems** | 4가지 문제점 |
| **Solutions** | 4가지 솔루션 |
| **Equipment** | 적용 설비 (파쇄기, 분쇄기, 핀밀) |
| **ROI** | 투자 효과 분석 |
| **CTA** | 상담 유도 |
| **Footer** | 연락처 |

### 디자인 특징

- 다크 모드 UI
- 반응형 레이아웃 (모바일/태블릿 지원)
- 스크롤 애니메이션
- 60인치 대형 화면 최적화

---

## 수정 방법

### 연락처 수정

`index.html` 파일에서 검색:

```html
<!-- Footer 섹션에서 수정 -->
<p>Tel: 031-427-7783~5</p>
```

### 성과 수치 수정

```html
<!-- Stats 섹션 -->
<div class="stat-number">70%</div>
<div class="stat-label">다운타임 감소</div>
```

### 색상 변경

```css
:root {
    --primary: #1a5f7a;       /* 메인 색상 */
    --secondary: #57c5b6;      /* 보조 색상 */
    --accent: #ff6b6b;         /* 강조 색상 */
}
```

---

## 문제 해결

### 서버가 시작되지 않음

```
오류: Python이 설치되어 있지 않습니다.
해결: Python 3.x 설치 (https://python.org)
```

### 포트가 이미 사용 중

```
오류: 포트 8080가 사용 중입니다.
해결: 다른 포트 사용 (python server.py 3000)
```

### 네트워크 접속 불가

```
원인: 방화벽 차단
해결: Windows 방화벽에서 Python 허용
```

### 화면이 깨짐

```
원인: 브라우저 캐시
해결: Ctrl+Shift+R (강력 새로고침)
```

---

## 오프라인 운영

이 웹 서버는 완전히 오프라인으로 운영 가능합니다:

- 외부 CDN 의존 없음 (폰트 제외)
- 모든 CSS/JS 인라인 포함
- 이미지 대신 이모지 사용

**폰트 오프라인 대비**:
Google Fonts 로드 실패 시 시스템 폰트로 대체됩니다.

---

## 라이선스

UTTEC & 한국기계엔지니어링 내부 사용

---

*2026-02-10 작성*
