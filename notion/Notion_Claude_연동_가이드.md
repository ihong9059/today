# Notion + Claude 연동 가이드

## 목차

1. [개요](#1-개요)
2. [연동 방법 총정리](#2-연동-방법-총정리)
3. [Notion MCP 서버 설정 (상세)](#3-notion-mcp-서버-설정-상세)
4. [Python 코드 예시: Notion API + Claude API 직접 연동](#4-python-코드-예시-notion-api--claude-api-직접-연동)
5. [실용적 활용 시나리오](#5-실용적-활용-시나리오)
6. [주의사항 및 팁](#6-주의사항-및-팁)

---

## 1. 개요

### Notion과 Claude를 함께 사용하는 이점

| 항목 | 설명 |
|------|------|
| **지식 베이스 활용** | Notion에 축적된 문서를 Claude가 읽고 분석하여 즉각적인 인사이트 제공 |
| **자동화** | 반복적인 문서 작성, 데이터베이스 업데이트, 보고서 생성을 자동화 |
| **분석 능력** | Notion 데이터베이스의 대량 데이터를 Claude가 요약/분석/패턴 파악 |
| **자연어 인터페이스** | "이번 주 회의록 요약해줘"처럼 자연어로 Notion 데이터 조회 가능 |
| **콘텐츠 생성** | Claude가 생성한 콘텐츠를 Notion에 자동 저장하여 팀과 공유 |

### 연동 아키텍처 개념도

```
┌──────────┐     API/MCP     ┌──────────┐     API      ┌──────────┐
│  Notion  │ ◄────────────► │  중간계층  │ ◄──────────► │  Claude  │
│ (데이터)  │                │ (Python/  │              │  (AI)    │
│          │                │  MCP서버) │              │          │
└──────────┘                └──────────┘              └──────────┘
```

---

## 2. 연동 방법 총정리

### 2-a. Notion API + Claude API 직접 연동 (Python)

가장 유연한 방법. Python 스크립트로 양쪽 API를 직접 호출한다.

**장점:** 완전한 커스터마이징 가능, 복잡한 워크플로우 구현 가능
**단점:** 코드 작성/유지보수 필요, API 비용 발생

```
[사용자/스케줄러] → [Python 스크립트] → Notion API로 데이터 읽기
                                     → Claude API로 분석/생성
                                     → Notion API로 결과 저장
```

> 상세 코드는 [4장](#4-python-코드-예시-notion-api--claude-api-직접-연동)에서 다룬다.

### 2-b. Notion MCP (Model Context Protocol) 서버 활용

Claude Desktop 또는 Claude Code에서 MCP 서버를 통해 Notion에 직접 접근하는 방법. 코드를 작성하지 않고도 Claude가 Notion 페이지를 읽고 쓸 수 있다.

**장점:** 코드 없이 Claude 대화 내에서 Notion 직접 조작, 빠른 설정
**단점:** MCP 서버에서 지원하는 기능 범위로 제한됨

```
[Claude Desktop / Claude Code]
        │
        ▼
[Notion MCP 서버] ◄──── stdio/SSE 통신
        │
        ▼
[Notion API] → Notion 워크스페이스
```

> 상세 설정은 [3장](#3-notion-mcp-서버-설정-상세)에서 다룬다.

### 2-c. Zapier / Make 등 자동화 도구를 통한 연동

노코드(No-Code) 자동화 플랫폼을 활용하여 Notion과 Claude를 연결한다.

**Zapier 예시 워크플로우:**

```
트리거: Notion 데이터베이스에 새 항목 추가
  → 액션 1: Notion에서 페이지 내용 가져오기
  → 액션 2: Claude (Anthropic API) 에 분석 요청
  → 액션 3: Claude 응답을 Notion 페이지에 업데이트
```

**Make (구 Integromat) 설정:**

1. Notion 모듈: "Watch Database Items" 트리거 설정
2. HTTP 모듈: Anthropic API 엔드포인트(`https://api.anthropic.com/v1/messages`)로 POST 요청
3. Notion 모듈: "Update a Page" 액션으로 결과 저장

**장점:** 코드 없이 GUI로 설정, 다양한 서비스와 추가 연동 쉬움
**단점:** 월별 실행 횟수 제한(무료 플랜), 복잡한 로직 구현 어려움, 추가 비용

### 2-d. 수동 복사 방법

가장 단순한 방법. Notion 내용을 복사하여 Claude에 붙여넣기 한다.

**실용적인 수동 워크플로우:**

1. Notion 페이지에서 `Ctrl+A` → `Ctrl+C`로 전체 내용 복사
2. Claude (claude.ai 또는 Claude Desktop)에 붙여넣기
3. "이 내용을 요약해줘 / 분석해줘 / 개선해줘" 등 프롬프트 입력
4. Claude 응답을 다시 Notion에 붙여넣기

**Notion의 마크다운 내보내기 활용:**

1. Notion 페이지 우상단 `⋯` → `Export` → Markdown 형식으로 내보내기
2. `.md` 파일을 Claude에 업로드하거나 내용 붙여넣기
3. 대량의 페이지를 한번에 내보내서 분석 가능

**장점:** 설정 불필요, 즉시 사용 가능
**단점:** 수동 작업 반복, 자동화 불가능, 대량 데이터 처리 비효율적

---

## 3. Notion MCP 서버 설정 (상세)

### 3-1. 사전 준비: Notion Integration 생성 (API 키 발급)

1. [Notion Developers](https://developers.notion.com/) 접속
2. **"My Integrations"** → **"New integration"** 클릭
3. 설정 항목:
   - **Name:** `Claude MCP 연동` (임의 이름)
   - **Associated workspace:** 사용할 워크스페이스 선택
   - **Capabilities:**
     - Read content ✅
     - Update content ✅
     - Insert content ✅
     - Read user information (선택)
4. **"Submit"** 클릭 후 **Internal Integration Secret** 복사
   - `ntn_` 또는 `secret_`으로 시작하는 토큰

5. **Notion 페이지/데이터베이스에 Integration 연결:**
   - 접근할 Notion 페이지 열기
   - 우상단 `⋯` → `Connections` → 방금 만든 Integration 추가
   - **이 단계를 빠뜨리면 API가 해당 페이지에 접근 불가**

### 3-2. 공식 Notion MCP 서버

Notion에서 공식으로 제공하는 MCP 서버 패키지:

```bash
# npm 패키지
npx @notionhq/notion-mcp-server
```

**지원 기능 (Tools):**

| Tool | 설명 |
|------|------|
| `notion_search` | 워크스페이스 내 페이지/데이터베이스 검색 |
| `notion_retrieve_page` | 특정 페이지 조회 |
| `notion_retrieve_block_children` | 블록(내용) 조회 |
| `notion_retrieve_database` | 데이터베이스 스키마 조회 |
| `notion_query_database` | 데이터베이스 쿼리 (필터/정렬) |
| `notion_create_page` | 새 페이지 생성 |
| `notion_update_page_properties` | 페이지 속성 업데이트 |
| `notion_append_block_children` | 페이지에 블록(내용) 추가 |
| `notion_delete_block` | 블록 삭제 |
| `notion_retrieve_comments` | 댓글 조회 |
| `notion_create_comment` | 댓글 추가 |

### 3-3. Claude Desktop에서 MCP 설정

`claude_desktop_config.json` 파일 위치:
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "ntn_여기에_발급받은_토큰_입력"
      }
    }
  }
}
```

**설정 후:**

1. Claude Desktop 완전 종료 후 재시작
2. 채팅창 하단에 도구(Tools) 아이콘이 표시되는지 확인
3. "내 Notion에서 최근 페이지를 검색해줘"라고 입력하여 테스트

### 3-4. Claude Code에서 MCP 설정

Claude Code CLI에서 MCP 서버를 등록하는 방법:

```bash
# 프로젝트 단위 설정 (.mcp.json에 저장됨)
claude mcp add notion -- npx -y @notionhq/notion-mcp-server

# 환경변수 포함 설정
claude mcp add notion -e NOTION_API_KEY=ntn_여기에_토큰 -- npx -y @notionhq/notion-mcp-server
```

또는 프로젝트 루트의 `.mcp.json` 파일을 직접 작성:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "ntn_여기에_발급받은_토큰_입력"
      }
    }
  }
}
```

**Claude Code에서 사용 예시:**

```
> Notion에서 "작업보고서" 페이지를 검색해서 내용을 요약해줘
> Notion 데이터베이스에 오늘 작업 내용을 추가해줘
> Notion의 프로젝트 데이터베이스를 분석해서 지연되고 있는 작업을 알려줘
```

### 3-5. 커뮤니티 MCP 서버 (대안)

공식 서버 외에 커뮤니티에서 개발한 MCP 서버도 있다:

| 패키지 | 특징 |
|--------|------|
| `@notionhq/notion-mcp-server` | **공식.** 안정적, Notion에서 직접 유지보수 |
| `notion-mcp` (GitHub) | 커뮤니티. 추가 기능 포함 가능 |
| 직접 구현 | MCP SDK로 커스텀 서버 구축 가능 |

공식 서버 사용을 권장한다.

---

## 4. Python 코드 예시: Notion API + Claude API 직접 연동

### 4-1. 환경 설정

```bash
pip install notion-client anthropic python-dotenv
```

`.env` 파일:

```env
NOTION_API_KEY=ntn_여기에_노션_토큰
ANTHROPIC_API_KEY=sk-ant-여기에_클로드_API키
NOTION_DATABASE_ID=여기에_데이터베이스_ID
```

> **데이터베이스 ID 찾는 법:**
> Notion 데이터베이스 페이지 URL이 `https://notion.so/myworkspace/a1b2c3d4e5f6...?v=...`일 때
> `a1b2c3d4e5f6...` 부분(32자리 hex)이 데이터베이스 ID다.

### 4-2. 기본 연동 클래스

```python
"""
Notion + Claude API 연동 모듈
"""

import os
from datetime import datetime
from dotenv import load_dotenv
from notion_client import Client as NotionClient
import anthropic

load_dotenv()


class NotionClaude:
    """Notion API와 Claude API를 연동하는 클래스."""

    def __init__(self):
        self.notion = NotionClient(auth=os.getenv("NOTION_API_KEY"))
        self.claude = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.model = "claude-sonnet-4-20250514"

    # ── Notion 읽기 ──────────────────────────────────────────

    def get_page_content(self, page_id: str) -> str:
        """Notion 페이지의 텍스트 내용을 추출한다."""
        blocks = self.notion.blocks.children.list(block_id=page_id)
        texts = []
        for block in blocks["results"]:
            block_type = block["type"]
            if block_type in ("paragraph", "heading_1", "heading_2", "heading_3",
                              "bulleted_list_item", "numbered_list_item", "quote"):
                rich_texts = block[block_type].get("rich_text", [])
                line = "".join(rt["plain_text"] for rt in rich_texts)
                if line:
                    texts.append(line)
            elif block_type == "to_do":
                rich_texts = block["to_do"].get("rich_text", [])
                checked = block["to_do"].get("checked", False)
                line = "".join(rt["plain_text"] for rt in rich_texts)
                prefix = "[x]" if checked else "[ ]"
                texts.append(f"{prefix} {line}")
        return "\n".join(texts)

    def query_database(self, database_id: str, filter_obj: dict = None) -> list:
        """Notion 데이터베이스를 쿼리하여 항목 목록을 반환한다."""
        params = {"database_id": database_id}
        if filter_obj:
            params["filter"] = filter_obj
        response = self.notion.databases.query(**params)
        return response["results"]

    def search_pages(self, query: str) -> list:
        """Notion 워크스페이스에서 페이지를 검색한다."""
        response = self.notion.search(query=query, filter={"property": "object", "value": "page"})
        return response["results"]

    # ── Claude 분석 ──────────────────────────────────────────

    def ask_claude(self, prompt: str, system: str = None) -> str:
        """Claude API에 질문하고 응답을 받는다."""
        messages = [{"role": "user", "content": prompt}]
        kwargs = {
            "model": self.model,
            "max_tokens": 4096,
            "messages": messages,
        }
        if system:
            kwargs["system"] = system
        response = self.claude.messages.create(**kwargs)
        return response.content[0].text

    # ── Notion 쓰기 ──────────────────────────────────────────

    def create_page(self, parent_page_id: str, title: str, content: str) -> str:
        """Notion에 새 페이지를 생성하고 페이지 ID를 반환한다."""
        # 마크다운 텍스트를 Notion 블록으로 변환 (간단 버전)
        children = []
        for line in content.split("\n"):
            if not line.strip():
                continue
            if line.startswith("# "):
                children.append({
                    "object": "block",
                    "type": "heading_1",
                    "heading_1": {
                        "rich_text": [{"type": "text", "text": {"content": line[2:]}}]
                    }
                })
            elif line.startswith("## "):
                children.append({
                    "object": "block",
                    "type": "heading_2",
                    "heading_2": {
                        "rich_text": [{"type": "text", "text": {"content": line[3:]}}]
                    }
                })
            elif line.startswith("- "):
                children.append({
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [{"type": "text", "text": {"content": line[2:]}}]
                    }
                })
            else:
                children.append({
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [{"type": "text", "text": {"content": line}}]
                    }
                })

        new_page = self.notion.pages.create(
            parent={"page_id": parent_page_id},
            properties={
                "title": [{"type": "text", "text": {"content": title}}]
            },
            children=children[:100]  # Notion API 블록 제한: 한 번에 최대 100개
        )
        return new_page["id"]

    def append_to_page(self, page_id: str, content: str):
        """기존 Notion 페이지에 텍스트 블록을 추가한다."""
        self.notion.blocks.children.append(
            block_id=page_id,
            children=[{
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [{"type": "text", "text": {"content": content}}]
                }
            }]
        )

    def update_database_item(self, page_id: str, properties: dict):
        """Notion 데이터베이스 항목의 속성을 업데이트한다."""
        self.notion.pages.update(page_id=page_id, properties=properties)
```

### 4-3. 활용 예시: 회의록 요약 후 Notion 저장

```python
def summarize_meeting_notes(nc: NotionClaude, meeting_page_id: str, save_to_page_id: str):
    """회의록을 Claude로 요약하여 Notion에 저장한다."""

    # 1. Notion에서 회의록 가져오기
    raw_notes = nc.get_page_content(meeting_page_id)
    print(f"원본 회의록 길이: {len(raw_notes)}자")

    # 2. Claude로 요약 요청
    summary = nc.ask_claude(
        prompt=f"""다음 회의록을 정리해주세요.

## 요청 형식
- 핵심 안건 (3줄 이내)
- 결정 사항 (번호 목록)
- 액션 아이템 (담당자 + 기한 포함)
- 다음 회의 안건

## 회의록 원문
{raw_notes}""",
        system="회의록 정리 전문가입니다. 간결하고 실행 가능한 형태로 정리합니다."
    )

    # 3. 요약 결과를 Notion에 저장
    today = datetime.now().strftime("%Y-%m-%d")
    nc.create_page(
        parent_page_id=save_to_page_id,
        title=f"회의록 요약 - {today}",
        content=summary,
    )
    print("요약 저장 완료")


# 실행
if __name__ == "__main__":
    nc = NotionClaude()
    summarize_meeting_notes(
        nc,
        meeting_page_id="원본_회의록_페이지_ID",
        save_to_page_id="저장할_부모_페이지_ID",
    )
```

### 4-4. 활용 예시: 데이터베이스 분석

```python
def analyze_project_database(nc: NotionClaude, database_id: str):
    """Notion 프로젝트 데이터베이스를 Claude로 분석한다."""

    # 1. 데이터베이스 전체 조회
    items = nc.query_database(database_id)

    # 2. 항목 정보 추출
    rows = []
    for item in items:
        props = item["properties"]
        row = {}
        for key, val in props.items():
            prop_type = val["type"]
            if prop_type == "title":
                row[key] = "".join(t["plain_text"] for t in val["title"])
            elif prop_type == "select":
                row[key] = val["select"]["name"] if val["select"] else ""
            elif prop_type == "status":
                row[key] = val["status"]["name"] if val["status"] else ""
            elif prop_type == "date":
                row[key] = val["date"]["start"] if val["date"] else ""
            elif prop_type == "number":
                row[key] = val["number"]
            elif prop_type == "rich_text":
                row[key] = "".join(t["plain_text"] for t in val["rich_text"])
            elif prop_type == "people":
                row[key] = ", ".join(p.get("name", "") for p in val["people"])
        rows.append(row)

    # 3. Claude에 분석 요청
    import json
    data_text = json.dumps(rows, ensure_ascii=False, indent=2)

    analysis = nc.ask_claude(
        prompt=f"""다음 프로젝트 데이터베이스를 분석해주세요.

## 분석 요청
1. 전체 진행 현황 요약
2. 지연되고 있는 작업 식별
3. 리스크 요인
4. 개선 권장 사항

## 데이터
{data_text}""",
        system="프로젝트 관리 전문가입니다. 데이터 기반으로 객관적 분석을 제공합니다."
    )

    print(analysis)
    return analysis


# 실행
if __name__ == "__main__":
    nc = NotionClaude()
    analyze_project_database(nc, database_id=os.getenv("NOTION_DATABASE_ID"))
```

### 4-5. 활용 예시: 일일 작업보고서 자동 생성

```python
def generate_daily_report(nc: NotionClaude, database_id: str, report_parent_id: str):
    """오늘 완료/진행 중인 작업을 기반으로 일일 보고서를 자동 생성한다."""
    from datetime import datetime

    today = datetime.now().strftime("%Y-%m-%d")

    # 1. 오늘 날짜 기준 작업 조회
    items = nc.query_database(
        database_id,
        filter_obj={
            "or": [
                {
                    "property": "상태",
                    "status": {"equals": "진행 중"}
                },
                {
                    "property": "완료일",
                    "date": {"equals": today}
                }
            ]
        }
    )

    # 2. 작업 목록 텍스트화
    task_lines = []
    for item in items:
        props = item["properties"]
        title_parts = props.get("이름", {}).get("title", [])
        title = "".join(t["plain_text"] for t in title_parts) if title_parts else "(제목 없음)"
        status = props.get("상태", {}).get("status", {})
        status_name = status.get("name", "") if status else ""
        task_lines.append(f"- [{status_name}] {title}")

    task_text = "\n".join(task_lines) if task_lines else "(오늘 등록된 작업 없음)"

    # 3. Claude로 보고서 생성
    report = nc.ask_claude(
        prompt=f"""다음 작업 목록을 기반으로 일일 작업보고서를 작성해주세요.

## 날짜: {today}

## 오늘의 작업
{task_text}

## 보고서 형식
- 오늘의 성과 (완료 항목 중심)
- 진행 중인 작업 (현재 상태, 예상 완료일)
- 이슈 및 블로커
- 내일 계획""",
        system="일일 작업보고서를 간결하고 명확하게 작성하는 어시스턴트입니다."
    )

    # 4. Notion에 보고서 저장
    nc.create_page(
        parent_page_id=report_parent_id,
        title=f"일일 작업보고서 - {today}",
        content=report,
    )
    print(f"일일 보고서 생성 완료: {today}")


# 실행
if __name__ == "__main__":
    nc = NotionClaude()
    generate_daily_report(
        nc,
        database_id=os.getenv("NOTION_DATABASE_ID"),
        report_parent_id="보고서_저장할_페이지_ID",
    )
```

---

## 5. 실용적 활용 시나리오

### 시나리오 1: 회의록 자동 정리 및 Notion 저장

```
[음성 녹음/메모] → [텍스트 변환] → [Claude로 구조화된 회의록 생성]
                                           │
                                           ▼
                                  [Notion 페이지로 저장]
                                  - 안건별 정리
                                  - 액션 아이템 추출
                                  - 담당자/기한 자동 태깅
```

**MCP 활용 시 (코드 없이):**

Claude Desktop에서 대화로 처리 가능:

```
사용자: "다음 회의 내용을 정리해서 Notion의 '2026년 회의록' 페이지 아래에 저장해줘.
        [회의 내용 붙여넣기]"

Claude: (Notion MCP를 통해 자동으로 페이지 생성 및 저장)
```

### 시나리오 2: Notion 데이터베이스를 Claude로 분석

- 프로젝트 진행률 분석 및 병목 구간 파악
- 고객 피드백 데이터베이스 감정 분석
- 매출/비용 데이터 트렌드 분석
- 팀원 업무 부하 분석

### 시나리오 3: 프로젝트 진행 상황 자동 업데이트

```python
# 스케줄러 (cron / Windows Task Scheduler)와 결합
# 매일 오후 6시 자동 실행

def auto_update_status(nc: NotionClaude, database_id: str):
    """기한이 지난 작업을 자동으로 '지연' 상태로 업데이트한다."""
    from datetime import datetime

    today = datetime.now().strftime("%Y-%m-%d")
    items = nc.query_database(
        database_id,
        filter_obj={
            "and": [
                {"property": "기한", "date": {"before": today}},
                {"property": "상태", "status": {"does_not_equal": "완료"}},
                {"property": "상태", "status": {"does_not_equal": "지연"}},
            ]
        }
    )

    for item in items:
        nc.update_database_item(
            page_id=item["id"],
            properties={
                "상태": {"status": {"name": "지연"}}
            }
        )

    # 지연 현황 보고서를 Claude로 생성
    if items:
        titles = []
        for item in items:
            t = item["properties"].get("이름", {}).get("title", [])
            titles.append("".join(x["plain_text"] for x in t))

        alert = nc.ask_claude(
            prompt=f"다음 {len(items)}개 작업이 기한을 초과했습니다. 간단한 알림 메시지를 작성해주세요:\n"
                   + "\n".join(f"- {t}" for t in titles)
        )
        print(alert)
```

### 시나리오 4: Notion 문서 기반 Q&A 봇

```python
def notion_qa_bot(nc: NotionClaude, knowledge_page_ids: list[str]):
    """Notion 문서를 지식 베이스로 활용하는 Q&A 봇."""

    # 1. 지식 베이스 로드
    knowledge = ""
    for pid in knowledge_page_ids:
        content = nc.get_page_content(pid)
        knowledge += f"\n---\n{content}\n"

    print("Q&A 봇이 시작되었습니다. 'quit'으로 종료합니다.")

    while True:
        question = input("\n질문: ").strip()
        if question.lower() == "quit":
            break

        answer = nc.ask_claude(
            prompt=f"""아래 문서 내용을 참고하여 질문에 답변하세요.
문서에 없는 내용은 "문서에서 해당 정보를 찾을 수 없습니다"라고 답하세요.

## 참고 문서
{knowledge}

## 질문
{question}""",
            system="주어진 문서만을 근거로 정확하게 답변하는 어시스턴트입니다."
        )
        print(f"\n답변: {answer}")
```

### 시나리오 5: 일일 작업보고서 자동 생성

> 코드 예시는 [4-5장](#4-5-활용-예시-일일-작업보고서-자동-생성) 참조.

자동 실행 설정 (Linux cron 예시):

```bash
# 매일 오후 6시에 자동 실행
0 18 * * * cd /path/to/project && python daily_report.py
```

Windows Task Scheduler 설정:

```
프로그램: python
인수: C:\path\to\daily_report.py
트리거: 매일 18:00
```

---

## 6. 주의사항 및 팁

### API 키 보안

- API 키를 코드에 직접 하드코딩하지 말 것. 반드시 `.env` 파일 또는 환경변수 사용
- `.env` 파일은 `.gitignore`에 반드시 추가
- MCP 설정 파일(`claude_desktop_config.json`)에 API 키가 포함되므로 공유 시 주의

```gitignore
# .gitignore
.env
claude_desktop_config.json
.mcp.json
```

### Notion API 제한 사항

| 항목 | 제한 |
|------|------|
| Rate Limit | 평균 3 requests/sec |
| 블록 생성 | 한 번에 최대 100개 블록 |
| 페이지 내용 조회 | 한 번에 최대 100개 블록 (페이지네이션 필요) |
| 텍스트 길이 | rich_text 하나당 최대 2,000자 |
| 검색 결과 | 한 번에 최대 100개 |

### Claude API 사용 시 팁

- **토큰 관리:** Notion에서 가져온 데이터가 클 경우 요약 후 Claude에 전달하거나, 필요한 부분만 추출하여 전달
- **시스템 프롬프트 활용:** `system` 파라미터로 역할을 명확히 지정하면 응답 품질 향상
- **모델 선택:**
  - 간단한 요약/분류: `claude-haiku-4-20250414` (빠르고 저렴)
  - 분석/보고서: `claude-sonnet-4-20250514` (균형)
  - 복잡한 분석: `claude-opus-4-20250514` (최고 성능)

### MCP 서버 관련 팁

- MCP 서버가 동작하지 않으면 Claude Desktop 로그 확인:
  - Windows: `%APPDATA%\Claude\logs\`
  - macOS: `~/Library/Logs/Claude/`
- `npx` 실행 시 Node.js 18 이상 필요
- 방화벽/프록시 환경에서는 npm 레지스트리 접근이 차단될 수 있음

### 일반적인 주의사항

- **개인정보:** Notion에 민감한 개인정보가 있는 경우, Claude API로 전송 전에 마스킹 처리 필요
- **비용:** Notion API는 무료이나 Claude API는 토큰 사용량에 따라 과금됨
- **데이터 정합성:** Claude가 생성한 내용을 Notion에 저장할 때 사람이 검토하는 프로세스를 권장
- **Notion 연결 권한:** Integration에 연결하지 않은 페이지는 API로 접근 불가 (가장 흔한 실수)
- **블록 제한 우회:** 100개 블록 제한 시 `notion.blocks.children.list`에 `start_cursor`로 페이지네이션 구현

---

> 작성일: 2026-03-30
