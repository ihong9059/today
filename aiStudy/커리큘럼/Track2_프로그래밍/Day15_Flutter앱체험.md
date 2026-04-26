# Day 15: Flutter 앱 체험 (선택) — "UTTEC Flutter 앱을 분석하고 수정하자"

## 학습 목표
- Flutter 프레임워크의 기본 구조 이해
- UTTEC Flutter 앱의 코드 분석 (Dart 언어 기초)
- 간단한 UI 수정을 Claude Code로 수행
- 스마트폰 앱과 Python 서버의 연결 구조 파악

## 준비물
- Day 1-14에서 설정한 개발 환경
- Flutter SDK (선택 — 없으면 코드 분석만 진행)
- UTTEC Flutter 앱 소스 코드 (강사 제공)
- 안드로이드 스마트폰 또는 에뮬레이터 (선택)

---

## 실습 1: Flutter 프로젝트 구조 파악 (15분)

1. Claude Code에게 요청:
```
flutter_app/ 프로젝트의 구조를 분석해줘.
1. Flutter 프로젝트의 기본 폴더 구조 설명
   - lib/ (Dart 소스 코드)
   - pubspec.yaml (의존성 관리 — pip의 requirements.txt와 비교)
   - android/, ios/ (플랫폼별 설정)
2. main.dart가 앱의 시작점인 이유
3. 주요 화면(Screen/Page) 파일 목록
4. Python과 Dart 문법의 공통점/차이점 비교
5. 이 앱이 어떤 기능을 제공하는지 분석

초보자도 이해할 수 있는 수준으로 설명해줘.
```

### 관찰 포인트
- Flutter 프로젝트 구조가 Python 프로젝트와 어떻게 다른지
- pubspec.yaml이 requirements.txt와 같은 역할
- Dart 문법이 Python과 유사한 부분 (함수, 클래스, 변수)

---

## 실습 2: UTTEC 앱 코드 분석 (20분)

1. Claude Code에게 요청:
```
UTTEC Flutter 앱의 핵심 기능을 분석해줘.
1. 서버 연결 코드: Python 서버와 어떻게 통신하는지
   - HTTP 요청 코드 찾기 (http 패키지 또는 dio)
   - API 엔드포인트 URL 목록
2. 센서 데이터 표시 화면 분석
3. UTTEC 보드 제어 화면 분석 (LED, 모터 등)
4. UI 위젯 구조 (Widget 트리)

Day 11에서 분석한 server.py와 이 앱이 어떻게 연결되는지
데이터 흐름도를 텍스트로 그려줘.
```

2. Claude Code에게 Dart 문법 질문:
```
Python과 Dart의 문법을 비교해줘.
같은 기능을 Python과 Dart로 각각 작성한 예제를 보여줘:
1. 변수 선언
2. 함수 정의
3. 클래스 정의
4. 리스트/딕셔너리
5. 비동기 처리 (async/await)
```

### 관찰 포인트
- 앱에서 서버로 HTTP 요청을 보내는 코드가 Day 6의 requests와 유사
- Flutter의 Widget 개념 — HTML 태그와 비슷한 역할
- async/await가 Python에도 Dart에도 있는 공통 패턴

---

## 실습 3: 간단한 UI 수정 (20분)

1. Claude Code에게 요청:
```
UTTEC Flutter 앱에서 다음을 수정해줘:
1. 앱 타이틀 변경: "UTTEC Controller" → "나의 IoT 컨트롤러"
2. 메인 화면 색상 테마 변경 (파란색 → 초록색)
3. 센서 데이터 표시 카드에 아이콘 추가
4. 서버 연결 상태 표시 (연결됨/끊김)
5. "About" 페이지 추가 (내 이름과 설명)

수정할 파일과 수정 위치를 정확히 알려줘.
```

2. (Flutter SDK가 있는 경우) 빌드 및 실행:
```bash
cd flutter_app
flutter run
```

3. (Flutter SDK가 없는 경우) 코드 변경만 확인:
```
수정된 코드를 보여주고, 어떤 화면이 어떻게 바뀌는지 설명해줘.
```

### 관찰 포인트
- Claude Code가 Flutter 코드도 수정할 수 있다는 점
- UI 변경이 코드 몇 줄 수정으로 가능한 것이 프레임워크의 장점
- 앱 개발도 Python 학습 패턴과 동일하게 접근 가능

---

## 실습 4: Python 서버 ↔ Flutter 앱 연동 테스트 (15분)

1. Claude Code에게 요청:
```
Day 11의 시뮬레이터(simulator.py)와 Flutter 앱을 연결하는 방법을 알려줘.
1. Flutter 앱의 서버 URL 설정 변경 (localhost → PC IP 주소)
2. 같은 Wi-Fi 네트워크에서 스마트폰 → PC 서버 통신
3. 연결 테스트: 앱에서 센서 데이터 받기
4. 앱에서 LED 제어 → 시뮬레이터에서 확인

네트워크 연결이 안 될 때 체크리스트도 만들어줘:
- 방화벽 설정
- IP 주소 확인 (ipconfig)
- 포트 확인
```

2. 연동 테스트 (시뮬레이터 실행 중):
```bash
# PC에서 시뮬레이터 실행
python simulator.py
# 스마트폰에서 Flutter 앱 → 서버 IP 입력 → 연결
```

### 관찰 포인트
- 스마트폰 앱이 Python 서버와 HTTP로 통신하는 전체 흐름
- localhost vs 실제 IP 주소의 차이
- 네트워크 문제 디버깅 방법

---

## 과제

### 제출물: "Flutter 앱 분석 및 수정 보고서"

```markdown
# Flutter 앱 분석 및 수정 보고서

## 앱 구조 분석
- 주요 화면 목록:
- 서버 통신 방식:
- 사용된 주요 패키지:

## Python vs Dart 비교
| 항목 | Python | Dart |
|------|--------|------|
| 변수 선언 | x = 10 | |
| 함수 | def func(): | |
| 클래스 | class MyClass: | |

## UI 수정 내용
| 수정 항목 | 파일 | 변경 전 | 변경 후 |
|----------|------|--------|--------|
| | | | |

## 서버 연동 결과
- 연결 성공 여부:
- 센서 데이터 수신:
- 제어 명령 전송:

## Flutter 앱 개발에 대한 소감
```

---

## 강사 참고 사항
- Flutter SDK 설치는 시간이 오래 걸리므로 사전 설치 안내 또는 코드 분석만으로 대체
- "Flutter를 모르더라도 Claude Code에게 수정을 요청할 수 있다"는 점이 핵심 메시지
- 이 Day는 선택이므로, 앱 개발에 관심 없는 학생은 Day 14 심화(테스트 추가 작성)로 대체 가능
