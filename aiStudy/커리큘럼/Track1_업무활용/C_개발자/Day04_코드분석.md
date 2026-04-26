# Day 4: 코드 분석 + AI 도구 — "레거시 코드 해독, NotebookLM, Perplexity"

## 학습 목표
- 처음 보는 코드/레거시 코드를 Claude로 빠르게 파악
- Claude 멀티모달로 아키텍처 다이어그램/에러 스크린샷 분석
- NotebookLM으로 기술 문서 분석
- Perplexity로 기술 리서치

---

## 실습 1: 레거시 코드 분석 (15분)

### 샘플 코드 (또는 자기 프로젝트의 어려운 코드)
```
아래 코드가 무엇을 하는지 분석해주세요.

```python
import hashlib, hmac, time, struct

def gen_otp(secret, interval=30):
    t = struct.pack('>Q', int(time.time()) // interval)
    h = hmac.new(secret.encode(), t, hashlib.sha1).digest()
    o = h[-1] & 0x0F
    code = struct.unpack('>I', h[o:o+4])[0] & 0x7FFFFFFF
    return str(code % 10**6).zfill(6)
```

다음을 포함해주세요:
1. 전체 목적 (한 줄 요약)
2. 줄별 설명 (주석 형태)
3. 사용된 알고리즘/프로토콜
4. 보안 관점에서의 평가
5. 개선 제안 (타입 힌트, 에러 처리, 테스트)
```

---

## 실습 2: 멀티모달 — 에러/다이어그램 분석 (10분)

### 실습 2-1: 에러 스크린샷 분석
에러 화면을 캡처하여 Claude에 업로드:
```
이 에러 스크린샷을 분석해주세요.
에러 원인, 해결 방법, 관련 문서 링크를 알려주세요.
```

### 실습 2-2: 아키텍처 다이어그램 분석
화이트보드나 기존 아키텍처 다이어그램 사진 업로드:
```
이 시스템 아키텍처 다이어그램을 분석해주세요.
- 각 컴포넌트의 역할
- 데이터 흐름
- 잠재적 병목 지점
- 개선 제안
```

### 실습 2-3: UI 디자인 → 코드
UI 모형/와이어프레임 사진 업로드:
```
이 UI 디자인을 React + Tailwind CSS로 구현하는 코드를 생성해줘.
반응형으로, 모바일 우선.
```

---

## 실습 3: NotebookLM으로 기술 문서 분석 (10분)

### 사용 방법
1. notebooklm.google.com 접속
2. 기술 문서 업로드 (RFC, 라이브러리 문서 PDF, 사내 설계 문서)
3. 질문: "이 문서의 핵심 API 3가지는?", "breaking change는?"
4. 오디오 요약 → 출퇴근길에 새 기술 학습

### 활용 시나리오
- 새 라이브러리 문서 50페이지 → "5분 요약"
- RFC 문서 → "이 프로토콜의 핵심 구조는?"
- 사내 레거시 설계 문서 → "현재 아키텍처와 차이점은?"

---

## 실습 4: Perplexity로 기술 리서치 (10분)

### perplexity.ai에서 검색
```
FastAPI vs Django 2026 performance benchmark
```
```
PostgreSQL vs MySQL for time-series data
```
```
React Server Components best practices 2026
```

### Claude vs Perplexity 개발자 활용
| 상황 | Claude | Perplexity |
|------|--------|-----------|
| 코드 작성/리뷰 | ★★★ | ★ |
| 최신 라이브러리 정보 | ★ | ★★★ |
| 벤치마크/비교 | ★★ | ★★★ |
| 에러 해결 | ★★★ | ★★ |
| 아키텍처 설계 | ★★★ | ★ |

> **워크플로우**: Perplexity로 최신 정보 수집 → Claude로 설계/코드 작성

---

## 과제

### 제출물: 코드 분석 리포트

1. 레거시 코드(샘플 또는 자기 코드) 분석 결과
2. 멀티모달 실습 1건 (에러/다이어그램/UI)
3. Perplexity 기술 리서치 1건
4. (선택) NotebookLM 체험 소감

---

## 강사 참고 사항
- 레거시 코드 분석이 실무에서 가장 시간을 아껴주는 활용법
- 에러 스크린샷 분석은 "스택오버플로우 검색보다 빠르다"는 체험
- 자기 프로젝트 코드를 가져오면 즉시 실용적
- NotebookLM은 시연 위주, Perplexity는 직접 검색
