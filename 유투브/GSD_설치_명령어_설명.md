# GSD 설치 명령어 설명

## npx란?

`npx`는 **Node.js 패키지를 설치 없이 바로 실행**하는 도구입니다.

### npm vs npx

| 구분 | npm | npx |
|------|-----|-----|
| 역할 | 패키지 설치/관리 | 패키지 즉시 실행 |
| 예시 | `npm install create-react-app` | `npx create-react-app my-app` |
| 결과 | 로컬에 패키지 설치됨 | 임시로 다운받아 실행 후 삭제 |

### 주요 사용 사례

```bash
# 1. 일회성 도구 실행 (설치 없이)
npx create-react-app my-app
npx gsd-init

# 2. 특정 버전 실행
npx node@16 -v

# 3. GitHub 저장소 직접 실행
npx github:user/repo
```

### 장점

1. **디스크 공간 절약** - 한 번 쓸 도구를 설치하지 않아도 됨
2. **항상 최신 버전** - 실행할 때마다 최신 버전 사용
3. **빠른 시작** - 설치 단계 생략

---

## npx get-shit-done-cc@latest

`npx get-shit-done-cc@latest`는 **GSD(Get Shit Done) 도구를 최신 버전으로 설치/실행**하는 명령입니다.

### 명령어 분석

| 부분 | 의미 |
|------|------|
| `npx` | 설치 없이 바로 실행 |
| `get-shit-done-cc` | GSD 패키지 이름 (cc = Claude Code) |
| `@latest` | 최신 버전 사용 |

### 실행 결과

이 명령을 실행하면:

1. **Claude Code에 슬래시 커맨드 추가**
   - `/gsd new-project` - 새 프로젝트 시작 (질문으로 기획 구체화)
   - `/gsd discuss-phase` - 모호한 부분 논의
   - `/gsd plan-phase` - 계획서 생성
   - `/gsd execute-phase` - 웨이브 기반 실행
   - `/gsd verify-work` - 검증

2. **프로젝트 폴더에 설정 파일 생성**
   - `.claude/` 폴더에 GSD 관련 커맨드/설정 추가

### 영상에서 언급된 내용과의 관계

영상에서는 `npx gsd-init`이라고 했는데, 실제 패키지 이름은 `get-shit-done-cc`입니다. 동일한 도구를 지칭하며, Context Rot 문제를 해결하기 위한 메타프롬프팅 시스템을 Claude Code에 설치합니다.

---

*작성일: 2026-03-24*
