---
name: calendar
description: 일정 등록. Notion DB 저장 + Google Calendar 브라우저 자동 오픈. "일정 등록", "캘린더 추가", "일정 추가" 요청 시 사용
---

# 일정 등록 Skill

일정을 Notion DB에 저장하고 Google Calendar에 자동으로 추가합니다.

## Notion 일정 DB 정보

- **DB ID**: `82339590-e321-46ec-b62f-43746b265ef6` (제목: "📅 일정")
- **이전 ID** (deprecated, 2026-05-05 갱신): ~~`34acb620-8c2b-814f-a466-f24646527957`~~
- **스키마** (한국어 properties — 정확한 이름 사용 필수):
  - `일정` (title) — 일정 이름
  - `날짜` (date) — 시작/종료 ISO 8601 (timezone 포함, 예: `2026-05-07T18:00:00.000+09:00`)
  - `카테고리` (select) — 경조사 / 업무 / 개인 / 미팅
  - `메모` (rich_text) — 부가 정보 (시간 등)
  - `장소` (rich_text) — 위치
- **카테고리 옵션 색상**: 경조사(pink), 업무(blue), 개인(green), 미팅(orange)
- **접근 방법**: `NOTION_TOKEN` 환경변수 + REST API ("Claude MCP 연동" Integration 공유 필수)
- **변경 이력**: 2026-05-05 ID 갱신 — DB 재구성으로 변경됨

## 실행 절차

### 1. 사용자 입력 파싱

- **제목** (필수)
- **날짜** YYYY-MM-DD (필수)
- **시간** HH:MM (선택, 없으면 종일)
- **장소** (선택)
- **카테고리** 자동 판별 (아래 표)
- **종료** 없으면 시작 +2시간

부족한 정보는 사용자에게 질문.

### 2. 통합 실행 (검증된 패턴, 2026-05-07 동작 확인)

Notion 등록 + Google Calendar Chrome 오픈을 단일 Python 스크립트로 처리.

**중요 — Windows 환경에서 검증된 호출 방식**:
- Notion: REST API + `NOTION_TOKEN` 환경변수 (Notion MCP 인증 불필요)
- Chrome: **chrome.exe 절대 경로 + `subprocess.Popen([chrome, url])`** (cmd 우회 필수)

```python
import os
import urllib.parse
import subprocess

import requests

# === 입력값 (사용자 파싱 결과를 채워 사용) ===
TITLE = "당정 모임"
DATE_KST_START = "2026-05-07T18:00:00.000+09:00"  # ISO 8601 with KST timezone
DATE_KST_END = "2026-05-07T20:00:00.000+09:00"
DATES_UTC = "20260507T090000Z/20260507T110000Z"   # Google Calendar URL 형식 (UTC)
CATEGORY = "미팅"     # 경조사 / 업무 / 개인 / 미팅
LOCATION = ""         # 장소 (선택)
MEMO = "18:00~20:00 (KST)"  # 메모 (선택)

# === Notion 등록 ===
TOKEN = os.environ.get("NOTION_TOKEN", "")
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
}
DB_ID = "82339590-e321-46ec-b62f-43746b265ef6"

properties = {
    "일정": {"title": [{"text": {"content": TITLE}}]},
    "날짜": {"date": {"start": DATE_KST_START, "end": DATE_KST_END}},
    "카테고리": {"select": {"name": CATEGORY}},
    "메모": {"rich_text": [{"text": {"content": MEMO}}]},
}
if LOCATION:
    properties["장소"] = {"rich_text": [{"text": {"content": LOCATION}}]}

r = requests.post(
    "https://api.notion.com/v1/pages",
    headers=HEADERS,
    json={"parent": {"database_id": DB_ID}, "properties": properties},
)
print(f"Notion 등록: HTTP {r.status_code}")
if r.status_code != 200:
    print(r.text[:500])

# === Google Calendar URL 생성 ===
qs = {
    "action": "TEMPLATE",
    "text": TITLE,
    "dates": DATES_UTC,
}
if LOCATION:
    qs["location"] = LOCATION
if MEMO:
    qs["details"] = MEMO

url = "https://calendar.google.com/calendar/render?" + urllib.parse.urlencode(
    qs, quote_via=urllib.parse.quote
)

# === Chrome 직접 호출 (Windows, cmd 우회) ===
# CRITICAL: 절대 cmd 경유 금지.
#   - cmd /c start chrome <URL> → URL의 '&'가 cmd 분리자로 해석되어 잘림
#   - webbrowser.open() → 기본 브라우저(Edge)로 열림 (사용자는 Chrome 선호)
CHROME_CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
]
chrome = next((p for p in CHROME_CANDIDATES if os.path.exists(p)), None)

if chrome:
    subprocess.Popen([chrome, url], close_fds=True)
    print(f"Chrome 직접 호출 OK")
else:
    print(f"Chrome 못 찾음. 수동 클릭 URL:\n  {url}")
```

### 3. 결과 안내

등록 완료 후 사용자에게 요약 표시:
- 일정명, 날짜/시간, 장소, 카테고리
- "Google Calendar에서 '저장' 버튼을 눌러주세요" 안내
- **안전망**: 위 `url` 변수를 출력하여 사용자가 수동 클릭도 가능하게

## 시간 변환 규칙 (KST → UTC)

- KST 18:00 → UTC 09:00 (같은 날)
- KST 13:30 → UTC 04:30 (같은 날)
- KST 09:00 → UTC 00:00 (같은 날)
- KST 00:30 → UTC 15:30 (전날)
- **공식**: UTC = KST − 9시간
- **dates 형식**: `YYYYMMDDTHHMMSSZ/YYYYMMDDTHHMMSSZ` (UTC 기준, T로 날짜·시간 분리, Z 접미)

## 카테고리 자동 판별

| 키워드 | 카테고리 |
|--------|----------|
| 결혼, 장례, 돌잔치, 축의, 부의 | 경조사 |
| 회의, 미팅, 면접, 상담, 모임 | 미팅 |
| 출장, 마감, 프로젝트, 발표 | 업무 |
| 기타 | 개인 |

## 트리거 키워드

- "일정 등록"
- "일정 추가"
- "캘린더 추가"
- "캘린더에 등록"
- "calendar"

## 알려진 함정 — 피해야 할 패턴

이 스킬에서 과거 반복 발생한 실패 패턴들. 절대 사용 금지:

1. ❌ **`cmd /c start chrome <URL>`** — URL의 `&` 문자가 cmd 분리자로 해석되어 URL이 잘림. `&text=`, `&dates=` 등이 별도 명령어로 실행 시도되어 "'text'은(는) 인식되지 않습니다" 오류 발생. Chrome은 열리지만 일정 폼이 비어있음.

2. ❌ **`webbrowser.open(url)`** — Windows 기본 브라우저(Edge)를 엶. 사용자는 Chrome 선호 (메모리 `feedback_browser_chrome.md` 참조).

3. ❌ **`MCP 도구 notion-create-pages`** — Notion MCP 인증되지 않은 환경에서 호출 실패. REST API + `NOTION_TOKEN`으로 우회.

✅ **반드시 사용할 패턴** — 위 §2의 `subprocess.Popen([chrome, url])` + REST API.

## 예시

사용자: "다음주 수요일 14시 강남에서 미팅 등록해줘"
→ 날짜 계산 (KST 14:00 → UTC 05:00, +2h 종료) → 위 §2 통합 스크립트 실행 → 결과 안내
