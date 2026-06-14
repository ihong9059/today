# Higgsfield MCP 실행 준비 설명서 (Claude Code / CLI 기준)

> 원본 분석: [`../03_AI_영상제작/이제_클로드가_영상까지_직접_만들어버립니다_Higgsfield_MCP_상세.md`](../03_AI_영상제작/이제_클로드가_영상까지_직접_만들어버립니다_Higgsfield_MCP_상세.md)
> 목적: 영상처럼 **Higgsfield MCP로 이미지/영상을 직접 생성**하되, **Claude 데스크톱 앱이 아니라 지금 사용 중인 Claude Code(CLI) 환경**에서 그대로 진행하기 위한 준비 설명서.
> 작업 위치: `C:\todo\today` (현재 Claude Code 세션 디렉토리)
> 작성일: 2026-06-14 · 수정: 2026-06-14 (데스크톱 앱 → Claude Code CLI 전환)

> ℹ️ **영상과의 차이**: 영상은 데스크톱 앱에서 "사이드바 → 커넥터" GUI로 연결합니다. Claude Code에서는 동일 MCP 서버를 **`claude mcp add` 명령**으로 등록하고, **`/mcp` 슬래시 커맨드**로 OAuth 인증하며, 권한은 **`settings.json` 또는 `/permissions`** 로 관리합니다. 기능은 동일합니다.

---

## 0. 한눈에 보는 준비 흐름 (CLI)

```
[1] 계정·크레딧 준비   →  Higgsfield 가입 + 크레딧 확인 + MCP URL 확보
[2] 환경 준비           →  Claude Code 설치 확인 (지금 이 환경)
[3] MCP 서버 등록        →  claude mcp add --transport http higgsfield <URL>
[4] OAuth 인증           →  세션 안에서 /mcp → Authenticate (브라우저)
[5] 연결·도구 확인       →  claude mcp list / /mcp
[6] 권한 사전 허용        →  settings.json 의 mcp__higgsfield__* (또는 /permissions)
[7] 작업 자산 준비        →  레퍼런스 사진 / 정보 폴더 / 스크립트 / 스토리라인
[8] 소량 테스트           →  이미지 1장 생성 → 크레딧·품질 확인
```

---

## 1. 계정 · 크레딧 · MCP URL 준비

| 항목 | 내용 | 확인 |
|------|------|:--:|
| Higgsfield 계정 | https://higgsfield.ai 가입 | ☐ |
| 크레딧 잔액 | 이미지/영상 생성 시 **건당 크레딧 소모** → 잔액 확인 | ☐ |
| 요금제 | 무료 크레딧 소진 후 유료 필요. 장편 영상은 소모 큼 | ☐ |
| **MCP 서버 주소(URL)** | `https://mcp.higgsfield.ai/mcp` (공식, 2026-06-14 확인) | ☑ |
| 인증 방식 확인 | 대부분 OAuth. (서버가 정적 토큰 방식이면 6장 참고) | ☐ |

> ⚠️ **비용 주의**: 생성마다 실제 크레딧이 빠집니다. 테스트는 소량부터.

---

## 2. 환경 준비 (Claude Code)

| 항목 | 내용 | 확인 |
|------|------|:--:|
| Claude Code 설치 | 지금 이 세션이 Claude Code → **이미 충족** | ☑ |
| 버전 | 원격 HTTP MCP + OAuth는 최신 버전 권장 (`claude --version`) | ☐ |
| 작업 디렉토리 | `C:\todo\today` (또는 작업 전용 폴더) | ☑ |
| 브라우저 | OAuth 창은 기본 브라우저로 열림. 본 PC 선호는 **Chrome** (기본 Edge라면 인증 후 Chrome에서 재확인) | ☐ |

> 💡 데스크톱 앱은 필요 없습니다. 모든 과정을 이 CLI에서 진행합니다.

---

## 3. MCP 서버 등록 (`claude mcp add`)

> 🪟 Windows PowerShell에서 실행. 백슬래시 줄바꿈(`\`) 대신 한 줄로 입력하세요.

**기본형 (OAuth 원격 HTTP 서버):**
```powershell
claude mcp add --transport http higgsfield <Higgsfield_MCP_URL>
```
- `higgsfield` = 등록 이름(임의). 이후 도구는 `mcp__higgsfield__*` 로 노출됨.
- `<Higgsfield_MCP_URL>` = 1장에서 복사한 MCP 주소.

**스코프(저장 위치) 선택 — 셋 중 택1:**

| 스코프 | 명령 | 저장 위치 | 용도 |
|------|------|----------|------|
| local (기본) | `claude mcp add --transport http higgsfield <URL>` | `~/.claude.json` (이 프로젝트 전용) | 나만, 이 프로젝트 |
| user | `claude mcp add --transport http higgsfield <URL> --scope user` | `~/.claude.json` (전역) | 모든 프로젝트에서 |
| project | `claude mcp add --transport http higgsfield <URL> --scope project` | 프로젝트 루트 `.mcp.json` | 팀 공유(git 커밋) |

> ✅ **권장**: 개인 작업이면 **user** 스코프(어느 폴더에서든 사용). 단, 토큰은 개인 인증이므로 `.mcp.json`(project)에 **비밀은 들어가지 않음** — OAuth라 안전.

| 체크 | 항목 |
|:--:|------|
| ☐ | `claude mcp add` 명령 실행 완료 |
| ☐ | `claude mcp list` 에 `higgsfield` 가 보임 (처음엔 `! Needs authentication`) |

---

## 4. OAuth 인증 (`/mcp`)

1. Claude Code 세션 진입 (지금 이 환경) 후, 프롬프트에 입력:
   ```
   /mcp
   ```
2. 목록에서 **`higgsfield`** 선택 → **Authenticate** 선택
3. **브라우저가 열림** → Higgsfield 로그인/승인
4. 세션으로 복귀 → 상태가 **`✓ Connected`** 로 바뀌면 완료

| 체크 | 항목 |
|:--:|------|
| ☑ | `/mcp` → Authenticate 진행 (2026-06-14 완료) |
| ☑ | 브라우저 OAuth 승인 완료 |
| ☑ | 상태 `✓ Connected` 확인 (`claude mcp list`) |

> 🔐 토큰은 설정 파일이 아니라 OS 보안 저장소(키체인/자격증명)에 보관됩니다.

---

## 5. 연결 · 도구 확인

```powershell
claude mcp list          # 전체 서버 상태 한눈에 (✓ Connected / 도구 개수)
claude mcp get higgsfield # higgsfield 상세 설정·OAuth 상태·도구
```
- 세션 안에서는 `/mcp` 로도 연결 상태·도구 수 확인 가능.
- 검증 질문도 유효: 클로드에 **"Higgsfield MCP로 어떤 작업을 할 수 있지?"** → 가능 작업 목록 응답.

| 체크 | 항목 |
|:--:|------|
| ☐ | `claude mcp list` 에서 `✓ Connected` |
| ☐ | 도구(이미지/영상 생성 등) 목록 정상 노출 |

---

## 6. 권한 사전 허용 (데스크톱 "항상 허용"의 CLI 대응)

생성 동작은 크레딧이 소모되므로 권한 방식을 의도적으로 정합니다.

**방법 A — 매번 확인(기본):** 도구 첫 호출 시 권한 프롬프트가 뜸. 그때 **"Yes, don't ask again"** 선택 시 **현재 세션 동안** 자동 허용.

**방법 B — 영구 사전 허용:** `settings.json`(또는 프로젝트 `.claude/settings.json`)에 패턴 등록.
```json
{
  "permissions": {
    "allow": [
      "mcp__higgsfield__*"
    ]
  }
}
```
- `mcp__higgsfield__*` = higgsfield 서버의 모든 도구 허용
- 특정 도구만: `mcp__higgsfield__<tool_name>`
- 세션 안에서 `/permissions` 로 대화형 관리도 가능.

| 방식 | 장점 | 단점 | 추천 |
|------|------|------|------|
| 매번 확인 | 크레딧 통제·실수 방지 | 매번 클릭 | 초기 테스트 (권장) |
| 사전 허용(`allow`) | 끊김 없는 자동 실행 | 의도치 않은 크레딧 소모 | 워크플로우 안정화 후 |

> ✅ **권장 순서**: 처음엔 "매번 확인" → 흐름이 익으면 `mcp__higgsfield__*` 를 `allow` 에 추가.

> (참고) 정적 토큰 방식 서버라면 등록 시 헤더로 전달:
> ```powershell
> claude mcp add --transport http higgsfield <URL> --header "Authorization: Bearer <TOKEN>"
> ```

---

## 7. 작업 자산 사전 준비 (사례별)

작업 전에 미리 준비해 두면 바로 진행 가능. (영상의 5개 사례 대응)

### 공통
- ☐ 결과물 저장용 **로컬 폴더** 미리 지정 (예: `C:\todo\today\유투브\test\output\`) — 클로드에게 "이 폴더에 저장" 지시

### 사례 1 — 썸네일
- ☐ **캐릭터 레퍼런스 시트용 얼굴 사진** (여러 각도, 다수 장) — 폴더에 미리 넣기
- ☐ 배경/레이아웃/문구 아이디어 메모

### 사례 2 — 랜딩 페이지
- ☐ **본인/주제 정보 폴더** (소개·이력·링크 텍스트 — 클로드가 읽어 코드 작성)
- ☐ 비주얼 콘셉트(헤더 영상, 3D 아이콘 주제)

### 사례 3 — 카드 뉴스
- ☐ 슬라이드별 본문 텍스트
- ☐ (선택) 스케줄/크론 자동 발행 계획

### 사례 4 — 모션 그래픽
- ☐ 삽입할 **구간 스크립트**(해당 장면 내레이션)
- ☐ 선호 프리셋 콘셉트(예: 3D 렌더)

### 사례 5 — 스토리보드 장편
- ☐ **스토리라인** 한 문단(예: "맥북으로 코딩하며 일하는 인디해커의 하루, 브이로그")
- ☐ 톤·길이·씬 흐름 방향성

---

## 8. 소량 테스트 & 함정 대비

1. 이미지 1장만 먼저 생성 → 크레딧 차감/품질 확인.
2. **Seedance 안전 필터**가 본인 사진도 차단할 수 있음 → 막히면 **Higgsfield 웹에서 직접 재시도**.
3. Claude Code는 파일 시스템 접근이 자유로우므로, 생성물을 지정 폴더에 저장하고 **ffmpeg 등으로 클립 합성**까지 한 세션에서 파이프라인화 가능(데스크톱 앱 대비 이점).

| 체크 | 항목 |
|:--:|------|
| ☐ | 첫 이미지 1장 생성 성공 & 크레딧 확인 |
| ☐ | 안전 필터 차단 시 웹 우회 경로 숙지 |

---

## 9. (확장) Claude Code만의 자동화 메모

- 동일 MCP가 CLI에 붙어 있으므로, **스크립트 → 이미지 → 클립 → 합성**을 한 세션에서 자동화 가능.
- 기존 `ai-lesson` 스킬(Remotion 기반)과 **역할 분담**: 정형 모션그래픽=Remotion, 자유 비주얼·실사풍=Higgsfield.
- 반복 발행물(카드뉴스 등)은 외부 스케줄러/크론 + Claude Code 호출로 무인 발행 고려.

---

## 최종 준비 완료 체크리스트

- ☐ Higgsfield 계정 + 크레딧 확보 + **MCP URL 복사**
- ☐ Claude Code 환경 확인 (이 세션) + 브라우저 준비
- ☐ `claude mcp add --transport http higgsfield <URL>` 등록 (스코프 선택)
- ☐ `/mcp` → Authenticate → `✓ Connected`
- ☐ `claude mcp list` 로 연결·도구 확인
- ☐ 권한 정책 결정 (매번 확인 / `settings.json` 사전 허용)
- ☐ 저장 폴더 + 사례별 자산(사진·정보·스크립트·스토리라인) 준비
- ☐ 소량 테스트 1장 성공

> 위 항목이 모두 체크되면, 이 Claude Code 세션에서 영상의 5개 사례를 순서대로 진행할 준비가 끝납니다.

---

## 빠른 명령 모음 (복붙용)

```powershell
# 1) 등록 (user 스코프 = 모든 프로젝트에서 사용)  ※ 2026-06-14 등록 완료
claude mcp add --transport http --scope user higgsfield https://mcp.higgsfield.ai/mcp

# 2) 상태 확인 (처음엔 ! Needs authentication)
claude mcp list

# 3) 세션 안에서 인증
#    /mcp  → higgsfield → Authenticate → 브라우저 승인

# 4) 상세/도구 확인
claude mcp get higgsfield

# 5) 제거(필요 시)
claude mcp remove higgsfield
```

권한 사전 허용 (`settings.json`):
```json
{ "permissions": { "allow": ["mcp__higgsfield__*"] } }
```

---

*설명서 작성일: 2026-06-14 (Claude Code/CLI 기준) · 원본 영상: https://www.youtube.com/watch?v=gC0qIatTldg*
*MCP 명령 레퍼런스: https://code.claude.com/docs/en/mcp*
