# Notion + Claude 연동 가이드

## 목차

1. [개요](#1-개요)
2. [연동 방법 총정리](#2-연동-방법-총정리)
3. [Notion MCP 서버 설정 (상세)](#3-notion-mcp-서버-설정-상세)
4. [Python 코드 예시: Notion API + Claude API 직접 연동](#4-python-코드-예시-notion-api--claude-api-직접-연동)
5. [실용적 활용 시나리오](#5-실용적-활용-시나리오)
6. [주의사항 및 팁](#6-주의사항-및-팁)
7. [실제 설정 실습 — Notion 계정에 바로 적용하기](#7-실제-설정-실습--notion-계정에-바로-적용하기) ⭐ NEW
8. [일정/할일 관리 특화 워크플로우](#8-일정할일-관리-특화-워크플로우-) ⭐ NEW
9. [스마트폰/태블릿에서 사용하기](#9-스마트폰태블릿에서-사용하기-) 📱 NEW

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

## 7. 실제 설정 실습 — Notion 계정에 바로 적용하기

> 이 장은 **처음부터 끝까지 따라하면 10분 안에 Claude ↔ Notion 연동이 완료**되도록 구성했다.
> 스크린샷 대신 각 단계의 정확한 URL과 클릭 경로를 기재한다.

### 7-1. 사전 준비 체크리스트

| # | 항목 | 확인 |
|:-:|------|:----:|
| 1 | Notion 계정 (무료 OK) | ⬜ |
| 2 | Node.js 18 이상 설치 (`node -v`로 확인) | ⬜ |
| 3 | Claude Desktop 또는 Claude Code 설치 | ⬜ |

### 7-2. Step 1 — Notion Integration 생성 (API 키 발급)

1. 브라우저에서 **https://www.notion.so/profile/integrations** 접속
2. **"새 API 통합"** (또는 "New integration") 클릭
3. 설정 입력:

| 항목 | 값 |
|------|-----|
| 이름 | `Claude 연동` |
| 연결된 워크스페이스 | 본인 워크스페이스 선택 |
| 유형 | 내부 통합 (Internal) |

4. **"제출"** 클릭
5. **내부 통합 비밀 (Internal Integration Secret)** 복사 → 메모장에 임시 저장

```
ntn_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

> ⚠️ 이 토큰은 비밀번호와 같다. 절대 공개 저장소에 올리지 말 것.

### 7-3. Step 2 — Notion에 테스트 페이지 & 데이터베이스 생성

#### A. 할일 데이터베이스 생성

1. Notion 좌측 사이드바에서 **"+ 새 페이지"** 클릭
2. 페이지 제목: `📋 할일 관리`
3. 본문에 `/database` 입력 → **"데이터베이스 - 전체 페이지"** 선택
4. 속성(Property) 설정:

| 속성 이름 | 타입 | 옵션 |
|-----------|------|------|
| 이름 | 제목 (Title) | (기본값) |
| 상태 | 상태 (Status) | 시작 전 / 진행 중 / 완료 |
| 우선순위 | 선택 (Select) | 🔴 긴급 / 🟡 보통 / 🟢 낮음 |
| 기한 | 날짜 (Date) | - |
| 카테고리 | 선택 (Select) | 업무 / 개인 / 학습 |
| 메모 | 텍스트 (Rich text) | - |

5. 테스트 데이터 2~3개 입력:

```
예시:
- [시작 전] 프로젝트 제안서 작성 / 🔴 긴급 / 기한: 2026-04-16 / 업무
- [진행 중] Flutter 앱 테스트 / 🟡 보통 / 기한: 2026-04-18 / 업무
- [시작 전] Notion 사용법 정리 / 🟢 낮음 / 기한: 없음 / 학습
```

#### B. 일정 데이터베이스 생성

1. 새 페이지 생성, 제목: `📅 일정 캘린더`
2. `/database` → **"데이터베이스 - 전체 페이지"** 선택
3. 속성 설정:

| 속성 이름 | 타입 | 옵션 |
|-----------|------|------|
| 이름 | 제목 (Title) | (기본값) |
| 날짜 | 날짜 (Date) | 시작~종료 범위 사용 |
| 유형 | 선택 (Select) | 회의 / 마감 / 개인 / 출장 |
| 장소 | 텍스트 (Rich text) | - |
| 관련 할일 | 관계형 (Relation) | → 📋 할일 관리 연결 |

4. 테스트 일정 1~2개 입력

#### C. Integration 연결 (필수!)

> 🚨 **가장 흔한 실수**: 이 단계를 빠뜨리면 API가 "Not Found" 에러를 반환한다.

1. `📋 할일 관리` 페이지 열기
2. 우상단 **`⋯`** (점 3개) 클릭
3. **"연결"** (Connections) → **"Claude 연동"** 검색 후 선택
4. `📅 일정 캘린더` 페이지에도 동일하게 반복

### 7-4. Step 3 — 데이터베이스 ID 확인

1. `📋 할일 관리` 데이터베이스 페이지를 브라우저에서 열기
2. URL 확인:

```
https://www.notion.so/myworkspace/a1b2c3d4e5f6789012345678abcdef01?v=...
                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                  이 32자리가 데이터베이스 ID
```

3. 하이픈 포함 형식으로 변환 (선택):

```
a1b2c3d4-e5f6-7890-1234-5678abcdef01
```

> Notion API는 하이픈 있는 형식과 없는 형식 모두 허용한다.

4. `📅 일정 캘린더`의 ID도 같은 방식으로 확인

### 7-5. Step 4 — Claude Code에서 MCP 연결

#### 방법 A: 공식 Notion MCP (OAuth 방식, 가장 간편)

```bash
# Claude Code에서 실행
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

실행 후 브라우저에서 OAuth 인증 화면이 뜨면 **"허용"** 클릭.

#### 방법 B: npm 패키지 (토큰 방식)

```bash
# 환경변수에 토큰 설정
claude mcp add notion -e NOTION_API_KEY=ntn_여기에_토큰 -- npx -y @notionhq/notion-mcp-server
```

### 7-6. Step 5 — 연동 테스트

Claude Code (또는 Claude Desktop)에서 다음 명령어를 실행하여 연동을 확인한다:

**테스트 1: 검색**

```
> Notion에서 "할일 관리" 페이지를 검색해줘
```

✅ 기대 결과: 페이지 ID와 제목이 표시됨

**테스트 2: 데이터베이스 읽기**

```
> Notion 할일 데이터베이스의 모든 항목을 가져와서 표로 보여줘
```

✅ 기대 결과: 입력한 테스트 데이터가 표로 표시됨

**테스트 3: 항목 추가**

```
> Notion 할일 데이터베이스에 새 항목 추가해줘:
> - 이름: Claude 연동 테스트
> - 상태: 진행 중
> - 우선순위: 🟢 낮음
> - 기한: 2026-04-20
```

✅ 기대 결과: Notion에서 새 항목이 추가된 것을 확인

**테스트 4: 항목 수정**

```
> 방금 추가한 "Claude 연동 테스트" 항목의 상태를 "완료"로 변경해줘
```

✅ 기대 결과: Notion에서 상태가 변경된 것을 확인

### 7-7. 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| `Could not find page` | Integration 연결 안 됨 | Step 3-C 다시 확인 |
| `Invalid API key` | 토큰 오타 또는 만료 | Integration 페이지에서 토큰 재생성 |
| `npx` 실행 에러 | Node.js 미설치 또는 구버전 | `node -v` 확인, 18+ 설치 |
| MCP 도구 안 보임 | Claude 재시작 안 함 | Claude Desktop/Code 완전 종료 후 재시작 |
| Rate limit 에러 | 요청 과다 (3회/초 초과) | 잠시 대기 후 재시도 |

---

## 8. 일정/할일 관리 특화 워크플로우 ⭐

> **이 장이 핵심이다.** Claude + Notion을 활용한 실전 일정/할일 관리 시스템을 구축한다.

### 8-1. 전체 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    Notion 워크스페이스                      │
│                                                         │
│  📋 할일 관리 DB ◄──── 관계형 ────► 📅 일정 캘린더 DB     │
│       │                                    │            │
│       ▼                                    ▼            │
│  📊 대시보드 (캘린더뷰 + 보드뷰 + 리스트뷰)              │
└─────────────┬───────────────────────┬───────────────────┘
              │  Notion MCP / API     │
              ▼                       ▼
┌─────────────────────────────────────────────────────────┐
│                    Claude (AI 비서)                       │
│                                                         │
│  🌅 아침: 오늘 할일 브리핑      🌙 저녁: 일일 리뷰       │
│  📝 수시: 할일 추가/수정        📊 주간: 주간 분석 리포트  │
│  🔔 알림: 기한 임박 경고        🧠 분석: 우선순위 제안     │
└─────────────────────────────────────────────────────────┘
```

### 8-2. 핵심 워크플로우 5가지

#### 워크플로우 1: 🌅 아침 브리핑 — "오늘 뭐 하지?"

Claude에게 매일 아침 오늘의 할일과 일정을 정리해달라고 요청한다.

**Claude에게 이렇게 말한다:**

```
Notion 할일 데이터베이스에서 다음을 정리해줘:

1. 오늘 기한인 항목 (긴급 표시)
2. 진행 중인 항목
3. 이번 주 내 기한인 항목
4. 오늘 일정 캘린더에 등록된 일정

표 형태로 정리하고, 추천 작업 순서도 제안해줘.
```

**Claude 응답 예시:**

```markdown
## 🌅 2026-04-15 아침 브리핑

### 🔴 오늘 마감
| 할일 | 우선순위 | 카테고리 |
|------|---------|---------|
| 프로젝트 제안서 작성 | 🔴 긴급 | 업무 |

### 🟡 진행 중
| 할일 | 기한 | 카테고리 |
|------|------|---------|
| Flutter 앱 테스트 | 04-18 | 업무 |

### 📅 오늘 일정
| 시간 | 일정 | 장소 |
|------|------|------|
| 14:00-15:00 | 팀 미팅 | Zoom |

### 💡 추천 작업 순서
1. (오전) 프로젝트 제안서 작성 ← 오늘 마감이므로 최우선
2. (오후 미팅 전) Flutter 앱 테스트 진행
3. (미팅 후) Notion 사용법 정리
```

#### 워크플로우 2: 📝 자연어로 할일 추가 — "이것 좀 등록해줘"

복잡한 양식 없이 자연어로 할일을 추가한다.

**Claude에게 이렇게 말한다:**

```
Notion 할일 데이터베이스에 추가해줘:

- 내일까지 ESP32 OTA 테스트 완료하기 (긴급, 업무)
- 금요일까지 주간 보고서 작성 (보통, 업무)
- 시간 될 때 Notion 템플릿 정리 (낮음, 개인)
```

Claude가 자동으로 파싱하여 각 속성에 맞게 데이터베이스에 추가한다:
- "내일" → `2026-04-16`
- "금요일" → `2026-04-17`
- "시간 될 때" → 기한 없음

#### 워크플로우 3: 🌙 저녁 리뷰 — "오늘 뭐 했지?"

하루를 마무리하며 진행 상황을 업데이트하고 내일을 계획한다.

**Claude에게 이렇게 말한다:**

```
오늘 일일 리뷰 해줘:

1. Notion 할일 DB에서 오늘 기한인 항목 중 아직 "완료"가 아닌 것 찾아줘
2. 내가 알려줄 테니 상태 업데이트해줘
3. 완료 못한 항목은 기한을 내일로 연장해줘
4. 오늘 완료한 작업 요약을 Notion 페이지로 만들어줘
```

**대화 흐름:**

```
Claude: 오늘 기한 항목 중 미완료:
        - 프로젝트 제안서 작성 (🔴 긴급)
        이 항목의 상태를 어떻게 할까요?

사용자: 80% 완료했어. 내일 오전에 마무리할게.

Claude: 알겠습니다.
        - "프로젝트 제안서 작성" 기한을 2026-04-16으로 변경했습니다.
        - 메모에 "80% 완료, 내일 오전 마무리 예정" 추가했습니다.

        오늘의 작업 요약 페이지를 생성했습니다:
        📄 "일일 리뷰 - 2026-04-15"
```

#### 워크플로우 4: 📊 주간 분석 리포트 — "이번 주 어땠지?"

일주일간의 할일 완료율, 지연 패턴, 카테고리별 시간 배분을 분석한다.

**Claude에게 이렇게 말한다:**

```
이번 주(4/13~4/19) 주간 분석 해줘:

Notion 할일 DB에서:
1. 완료/미완료/지연 비율
2. 카테고리별 작업 수
3. 우선순위별 완료율
4. 가장 오래 지연된 항목 Top 3
5. 다음 주 권장 사항

분석 결과를 Notion 페이지로 저장해줘.
```

**Claude 응답 예시:**

```markdown
## 📊 주간 리포트 (2026-04-13 ~ 2026-04-19)

### 완료 현황
- ✅ 완료: 8개 (62%)
- 🔄 진행 중: 3개 (23%)
- ❌ 지연: 2개 (15%)

### 카테고리별 분포
| 카테고리 | 완료 | 미완료 | 완료율 |
|---------|------|--------|-------|
| 업무 | 5 | 3 | 63% |
| 학습 | 2 | 1 | 67% |
| 개인 | 1 | 1 | 50% |

### ⚠️ 지연 항목 Top 3
1. SDK 전환 (7일 지연) — 이월 반복, 분할 필요
2. Google Play 배포 (5일 지연) — 선행 작업 미완료

### 💡 다음 주 권장 사항
- SDK 전환을 3단계로 분할하여 매일 1단계씩 진행
- 긴급 업무를 오전에 배치하여 완료율 향상
```

#### 워크플로우 5: 🧠 스마트 우선순위 제안 — "뭐부터 하면 좋을까?"

할일이 많을 때 Claude가 우선순위를 분석하고 최적 순서를 제안한다.

**Claude에게 이렇게 말한다:**

```
Notion 할일 DB에서 "시작 전"과 "진행 중" 항목을 전부 가져와서
다음 기준으로 우선순위를 다시 정리해줘:

1. 기한 긴급도 (오늘/내일 > 이번 주 > 다음 주 이후)
2. 의존성 (다른 작업의 선행 조건인지)
3. 예상 소요 시간 (짧은 것 먼저 = Quick Win)
4. 카테고리 균형 (업무만 몰리지 않게)

추천 순서와 이유를 함께 알려줘.
```

### 8-3. Python 자동화: 아침 브리핑 + 저녁 리뷰 자동 실행

위 워크플로우를 매일 자동으로 실행하는 스크립트:

```python
"""
daily_workflow.py — Notion + Claude 일일 자동화
아침에는 브리핑, 저녁에는 리뷰를 자동 생성하여 Notion에 저장한다.
"""

import os
import json
from datetime import datetime, timedelta
from dotenv import load_dotenv
from notion_client import Client as NotionClient
import anthropic

load_dotenv()


class DailyWorkflow:
    """일일 할일/일정 자동화 워크플로우."""

    def __init__(self):
        self.notion = NotionClient(auth=os.getenv("NOTION_API_KEY"))
        self.claude = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.todo_db = os.getenv("NOTION_TODO_DB_ID")
        self.calendar_db = os.getenv("NOTION_CALENDAR_DB_ID")
        self.report_parent = os.getenv("NOTION_REPORT_PAGE_ID")
        self.model = "claude-sonnet-4-20250514"

    def _query_todos(self, filter_obj: dict) -> list[dict]:
        """할일 DB 쿼리 후 속성을 딕셔너리로 변환한다."""
        results = self.notion.databases.query(
            database_id=self.todo_db, filter=filter_obj
        )["results"]

        items = []
        for r in results:
            p = r["properties"]
            items.append({
                "id": r["id"],
                "이름": "".join(t["plain_text"] for t in p.get("이름", {}).get("title", [])),
                "상태": (p.get("상태", {}).get("status") or {}).get("name", ""),
                "우선순위": (p.get("우선순위", {}).get("select") or {}).get("name", ""),
                "기한": (p.get("기한", {}).get("date") or {}).get("start", ""),
                "카테고리": (p.get("카테고리", {}).get("select") or {}).get("name", ""),
                "메모": "".join(t["plain_text"] for t in p.get("메모", {}).get("rich_text", [])),
            })
        return items

    def _query_calendar(self, date_str: str) -> list[dict]:
        """특정 날짜의 일정을 가져온다."""
        results = self.notion.databases.query(
            database_id=self.calendar_db,
            filter={"property": "날짜", "date": {"equals": date_str}}
        )["results"]

        events = []
        for r in results:
            p = r["properties"]
            events.append({
                "이름": "".join(t["plain_text"] for t in p.get("이름", {}).get("title", [])),
                "날짜": (p.get("날짜", {}).get("date") or {}).get("start", ""),
                "유형": (p.get("유형", {}).get("select") or {}).get("name", ""),
                "장소": "".join(t["plain_text"] for t in p.get("장소", {}).get("rich_text", [])),
            })
        return events

    def _ask_claude(self, prompt: str, system: str = "") -> str:
        """Claude API 호출."""
        msg = self.claude.messages.create(
            model=self.model,
            max_tokens=4096,
            system=system or "일정/할일 관리 전문 비서입니다. 간결하고 실행 가능한 형태로 정리합니다.",
            messages=[{"role": "user", "content": prompt}],
        )
        return msg.content[0].text

    def _save_to_notion(self, title: str, content: str) -> str:
        """Notion에 보고서 페이지를 생성한다."""
        children = []
        for line in content.split("\n"):
            if not line.strip():
                continue
            if line.startswith("### "):
                children.append({"object": "block", "type": "heading_3",
                    "heading_3": {"rich_text": [{"type": "text", "text": {"content": line[4:]}}]}})
            elif line.startswith("## "):
                children.append({"object": "block", "type": "heading_2",
                    "heading_2": {"rich_text": [{"type": "text", "text": {"content": line[3:]}}]}})
            elif line.startswith("- "):
                children.append({"object": "block", "type": "bulleted_list_item",
                    "bulleted_list_item": {"rich_text": [{"type": "text", "text": {"content": line[2:]}}]}})
            else:
                children.append({"object": "block", "type": "paragraph",
                    "paragraph": {"rich_text": [{"type": "text", "text": {"content": line}}]}})

        page = self.notion.pages.create(
            parent={"page_id": self.report_parent},
            properties={"title": [{"type": "text", "text": {"content": title}}]},
            children=children[:100],
        )
        return page["id"]

    # ── 워크플로우 실행 ─────────────────────────────────────

    def morning_briefing(self):
        """아침 브리핑: 오늘 할일 + 일정 정리."""
        today = datetime.now().strftime("%Y-%m-%d")
        week_end = (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")

        # 오늘 기한 + 진행 중 + 이번 주 기한
        urgent = self._query_todos({"property": "기한", "date": {"equals": today}})
        in_progress = self._query_todos({"property": "상태", "status": {"equals": "진행 중"}})
        this_week = self._query_todos({
            "and": [
                {"property": "기한", "date": {"on_or_after": today}},
                {"property": "기한", "date": {"on_or_before": week_end}},
                {"property": "상태", "status": {"does_not_equal": "완료"}},
            ]
        })
        events = self._query_calendar(today)

        prompt = f"""오늘 날짜: {today}

## 오늘 기한 항목
{json.dumps(urgent, ensure_ascii=False, indent=2)}

## 진행 중 항목
{json.dumps(in_progress, ensure_ascii=False, indent=2)}

## 이번 주 기한 항목
{json.dumps(this_week, ensure_ascii=False, indent=2)}

## 오늘 일정
{json.dumps(events, ensure_ascii=False, indent=2)}

위 데이터를 기반으로 아침 브리핑을 작성해주세요:
1. 오늘 마감 (긴급 표시)
2. 진행 중 현황
3. 오늘 일정
4. 추천 작업 순서 (이유 포함)"""

        briefing = self._ask_claude(prompt)
        page_id = self._save_to_notion(f"🌅 아침 브리핑 - {today}", briefing)
        print(f"아침 브리핑 생성 완료: {page_id}")
        return briefing

    def evening_review(self):
        """저녁 리뷰: 완료 현황 + 지연 항목 분석."""
        today = datetime.now().strftime("%Y-%m-%d")

        completed = self._query_todos({
            "and": [
                {"property": "상태", "status": {"equals": "완료"}},
                {"property": "기한", "date": {"equals": today}},
            ]
        })
        overdue = self._query_todos({
            "and": [
                {"property": "기한", "date": {"on_or_before": today}},
                {"property": "상태", "status": {"does_not_equal": "완료"}},
            ]
        })

        prompt = f"""오늘 날짜: {today}

## 오늘 완료
{json.dumps(completed, ensure_ascii=False, indent=2)}

## 미완료/지연
{json.dumps(overdue, ensure_ascii=False, indent=2)}

일일 리뷰를 작성해주세요:
1. 오늘 완료한 작업 요약
2. 미완료 항목과 지연 사유 추정
3. 내일로 이월할 항목 제안
4. 내일 집중해야 할 작업 Top 3"""

        review = self._ask_claude(prompt)
        self._save_to_notion(f"🌙 일일 리뷰 - {today}", review)
        print("일일 리뷰 생성 완료")
        return review


# ── 실행 ────────────────────────────────────────────────

if __name__ == "__main__":
    import sys
    wf = DailyWorkflow()

    if len(sys.argv) > 1 and sys.argv[1] == "evening":
        wf.evening_review()
    else:
        wf.morning_briefing()
```

**자동 실행 설정:**

```bash
# Linux/macOS cron
0  8 * * * cd /path/to/project && python daily_workflow.py          # 매일 오전 8시 브리핑
0 19 * * * cd /path/to/project && python daily_workflow.py evening  # 매일 오후 7시 리뷰
```

```
# Windows 작업 스케줄러
프로그램: python
인수(아침): C:\path\to\daily_workflow.py
인수(저녁): C:\path\to\daily_workflow.py evening
트리거: 매일 08:00 / 19:00
```

### 8-4. .env 파일 템플릿

```env
# Notion
NOTION_API_KEY=ntn_여기에_토큰
NOTION_TODO_DB_ID=할일_데이터베이스_ID_32자리
NOTION_CALENDAR_DB_ID=일정_데이터베이스_ID_32자리
NOTION_REPORT_PAGE_ID=보고서_저장할_페이지_ID

# Claude
ANTHROPIC_API_KEY=sk-ant-여기에_API키
```

### 8-5. Claude Code에서 MCP로 바로 사용하기 (코드 없이)

Python 스크립트 없이, Claude Code 대화에서 바로 사용할 수 있는 프롬프트 모음:

**아침 루틴:**

```
Notion 할일 DB에서 오늘(2026-04-15) 기한이거나 진행 중인 항목,
그리고 일정 캘린더에서 오늘 일정을 가져와서
아침 브리핑 형태로 정리해줘. 추천 작업 순서도 포함해줘.
```

**빠른 할일 추가:**

```
Notion 할일 DB에 추가: "OTA 테스트 완료" / 긴급 / 기한 내일 / 업무
```

**상태 일괄 업데이트:**

```
Notion 할일 DB에서 "진행 중"인 항목 목록을 보여주고,
내가 완료 여부를 알려줄 테니 상태를 업데이트해줘.
```

**주간 분석:**

```
Notion 할일 DB에서 이번 주(월~금) 데이터를 분석해서
완료율, 카테고리별 분포, 지연 항목을 정리하고
Notion에 "주간 리포트 - 2026-04-W16" 페이지로 저장해줘.
```

---

---

## 9. 스마트폰/태블릿에서 사용하기 📱

> **핵심 요약:** PC 없이도 스마트폰/태블릿만으로 Notion + Claude 할일/일정 관리가 가능하다.
> 방법에 따라 설정 난이도와 자동화 수준이 다르므로, 본인에게 맞는 방법을 선택한다.

### 9-1. 방법 비교 — 어떤 걸 선택할까?

| 방법 | 난이도 | 자동화 | 설명 |
|------|:------:|:------:|------|
| **A. Notion앱 + Claude앱 (수동)** | ★☆☆ | 없음 | 가장 간단. 두 앱 사이에서 복사/붙여넣기 |
| **B. Notion AI (내장)** | ★☆☆ | 부분 | Notion 앱 안에서 바로 AI 사용 (Claude와 별개) |
| **C. iOS 단축어 자동화** | ★★☆ | 높음 | iPhone/iPad에서 한 번 탭으로 전체 워크플로우 실행 |
| **D. Android Tasker 자동화** | ★★★ | 높음 | Android에서 HTTP 요청으로 자동화 |
| **E. 서버 경유 자동화** | ★★☆ | 최고 | PC 서버가 매일 자동 실행, 모바일은 결과만 확인 |

---

### 9-2. 사전 준비: 앱 설치

| 앱 | iOS | Android | 비용 |
|----|:---:|:-------:|------|
| **Notion** | App Store | Google Play | 무료 (AI는 유료) |
| **Claude** | App Store | Google Play | 무료 (Pro 유료) |

> 두 앱 모두 설치 후 각각 로그인해둔다.

---

### 9-3. 방법 A: Notion앱 + Claude앱 (수동, 가장 쉬움)

코딩 없이 지금 바로 시작할 수 있는 방법이다.

#### 사용 흐름

```
┌──────────────┐     복사      ┌──────────────┐     복사      ┌──────────────┐
│  Notion 앱   │ ──────────► │  Claude 앱   │ ──────────► │  Notion 앱   │
│ (할일 확인)   │              │ (분석/정리)   │              │ (결과 저장)   │
└──────────────┘              └──────────────┘              └──────────────┘
```

#### Step 1: Notion에서 할일 복사

1. Notion 앱에서 `📋 할일 관리` 데이터베이스 열기
2. 리스트뷰에서 오늘 할일 항목들을 **길게 눌러 선택** → **복사**
3. 또는 페이지 우상단 `⋯` → **"마크다운으로 복사"** (텍스트가 더 깔끔함)

#### Step 2: Claude앱에서 분석 요청

1. Claude 앱 열기
2. 복사한 내용 붙여넣기 + 프롬프트 입력:

```
다음은 내 Notion 할일 목록이야.
오늘(4/15) 기준으로 정리해줘:
1. 오늘 해야 할 것 (긴급순)
2. 이번 주 마감 항목
3. 추천 작업 순서

[붙여넣기]
```

3. Claude 응답을 **길게 눌러 복사**

#### Step 3: Notion에 결과 저장

1. Notion 앱에서 원하는 페이지 열기 (또는 새 페이지 생성)
2. 본문에 **붙여넣기**
3. Notion이 마크다운을 자동으로 서식 변환함

#### 팁: 프로젝트 기능 활용

Claude 앱에서 **프로젝트**를 만들면 매번 같은 맥락을 반복 입력할 필요가 없다:

1. Claude 앱 → **"프로젝트"** → **"새 프로젝트"**
2. 이름: `일정 관리`
3. 지침(Instructions)에 입력:

```
나는 개발자이고, Notion으로 할일/일정을 관리한다.
내가 할일 목록을 붙여넣으면:
- 오늘 날짜 기준으로 긴급/보통/낮음 분류
- 추천 작업 순서 제안
- 지연 항목 경고
형식으로 정리해줘. 한국어로 답변해줘.
```

4. 이후 이 프로젝트에서 대화하면 매번 맥락 설명이 불필요

---

### 9-4. 방법 B: Notion AI 활용 (앱 내장)

Notion 앱 자체에 내장된 AI 기능을 활용한다. Claude와는 별개의 AI이지만, 모바일에서 가장 매끄러운 경험을 제공한다.

#### Notion AI 사용법 (모바일)

1. Notion 앱에서 아무 페이지 열기
2. **빈 줄에서 스페이스 키** 또는 **`/ai`** 입력
3. AI 명령어 입력:

```
이 데이터베이스에서 오늘 마감인 항목을 정리해줘
```

#### Notion AI vs Claude 비교

| 항목 | Notion AI | Claude |
|------|-----------|--------|
| 접근성 | Notion 앱 안에서 바로 사용 | 별도 앱 필요 |
| Notion 데이터 접근 | 직접 접근 가능 | 복사/붙여넣기 또는 API |
| 분석 능력 | 기본적 | 깊은 분석, 코드 생성 가능 |
| 비용 | Notion AI 추가요금 ($10/월) | 무료~Pro ($20/월) |
| 자동화 | Notion 내부만 | 외부 연동 가능 |

> **추천:** 간단한 요약/정리는 Notion AI, 깊은 분석이나 코드가 필요하면 Claude

#### Notion AI 모바일 위젯

홈 화면에 Notion AI 바로가기 위젯을 추가할 수 있다:

**iOS:**
1. 홈 화면 길게 누르기 → 좌상단 **`+`** 탭
2. **Notion** 검색 → **"AI 단축어"** 위젯 선택
3. 위젯 크기 선택 후 추가

**Android:**
1. 홈 화면 길게 누르기 → **"위젯"**
2. **Notion** → 원하는 위젯 드래그

---

### 9-5. 방법 C: iOS 단축어 자동화 (iPhone/iPad) ⭐ 추천

> **가장 강력한 모바일 방법.** 한 번 설정하면 매일 자동으로 실행된다.

#### 개념

```
┌──────────────┐     HTTP      ┌──────────────┐     HTTP      ┌──────────────┐
│  iOS 단축어   │ ──────────► │  Notion API  │              │  Claude API  │
│  (자동 실행)  │              │  (할일 읽기)  │              │  (분석)       │
│              │ ◄──────────  │              │ ◄──────────  │              │
└──────────────┘    JSON       └──────────────┘   응답 텍스트  └──────────────┘
        │
        ▼
   📱 알림으로 결과 표시 + Notion에 저장
```

#### 단축어 1: "오늘 할일 브리핑" 만들기

1. **단축어** 앱 열기 → **`+`** → 이름: `오늘 할일`

2. **Notion에서 할일 가져오기** — 액션 추가:

```
[URL 내용 가져오기]
  URL: https://api.notion.com/v1/databases/DB_ID_여기에/query
  방법: POST
  헤더:
    Authorization: Bearer ntn_여기에_토큰
    Notion-Version: 2022-06-28
    Content-Type: application/json
  본문(JSON):
    {
      "filter": {
        "and": [
          {"property": "상태", "status": {"does_not_equal": "완료"}},
          {"property": "기한", "date": {"on_or_before": "2026-04-15"}}
        ]
      }
    }
```

3. **결과를 텍스트로 변환** — 액션 추가:

```
[사전 값 가져오기]
  results 키에서 배열 추출

[각 항목에서 반복]
  properties.이름.title[0].plain_text → 변수에 추가

[텍스트]
  "오늘 할일: (변수)"
```

4. **Claude에 분석 요청** — 액션 추가:

```
[URL 내용 가져오기]
  URL: https://api.anthropic.com/v1/messages
  방법: POST
  헤더:
    x-api-key: sk-ant-여기에_API키
    anthropic-version: 2023-06-01
    Content-Type: application/json
  본문(JSON):
    {
      "model": "claude-haiku-4-5-20251001",
      "max_tokens": 1024,
      "messages": [{
        "role": "user",
        "content": "다음 할일을 긴급순으로 정리하고 추천 순서 알려줘:\n(위 텍스트 변수)"
      }]
    }
```

> 💡 모바일에서는 빠른 응답이 중요하므로 `claude-haiku-4-5-20251001` 모델 사용 (저렴 + 빠름)

5. **결과 표시** — 액션 추가:

```
[알림 표시]
  제목: 🌅 오늘 할일 브리핑
  본문: (Claude 응답 텍스트)
```

6. **자동화 설정** — 매일 아침 자동 실행:

```
단축어 앱 → "자동화" 탭 → "+" → "시간"
  시간: 매일 오전 8:00
  실행할 단축어: "오늘 할일"
  실행 전 묻기: 끄기 (완전 자동)
```

#### 단축어 2: "할일 빠른 추가" (음성 입력)

```
[받아쓰기]
  언어: 한국어

[URL 내용 가져오기] — Claude API
  "다음 문장에서 할일 제목, 우선순위(긴급/보통/낮음), 기한, 카테고리를 추출해서 JSON으로 반환해줘: (받아쓰기 결과)"

[URL 내용 가져오기] — Notion API
  POST https://api.notion.com/v1/pages
  본문: (Claude가 반환한 JSON으로 Notion 페이지 생성)

[알림 표시]
  "할일 추가 완료: (제목)"
```

**사용법:** "Hey Siri, 할일 추가해줘" → 음성으로 말하기 → 자동으로 Notion에 등록

#### 단축어 3: "할일 완료 체크" (위젯에서 원탭)

```
[메뉴에서 선택] — Notion에서 "진행 중" 항목 목록 표시
  (각 항목을 선택지로 표시)

[URL 내용 가져오기] — Notion API
  PATCH https://api.notion.com/v1/pages/(선택한 항목 ID)
  본문: {"properties": {"상태": {"status": {"name": "완료"}}}}

[알림 표시]
  "✅ 완료: (항목 이름)"
```

#### 홈 화면에 단축어 위젯 배치

```
┌─────────────────────────────────┐
│         iPhone 홈 화면           │
│                                 │
│  ┌───────────┐ ┌───────────┐   │
│  │ 📋 오늘   │ │ ➕ 할일   │   │
│  │   할일    │ │   추가    │   │
│  └───────────┘ └───────────┘   │
│  ┌───────────┐ ┌───────────┐   │
│  │ ✅ 완료   │ │ 📊 주간   │   │
│  │   체크    │ │   리포트  │   │
│  └───────────┘ └───────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  Notion 즐겨찾기 위젯    │   │
│  │  📋 할일관리  📅 일정    │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

위젯 추가 방법:
1. 홈 화면 길게 누르기 → `+`
2. **"단축어"** 검색 → 2x2 또는 4x2 위젯 선택
3. 위젯 탭하여 실행할 단축어 선택

---

### 9-6. 방법 D: Android Tasker 자동화

Android에서는 **Tasker** 앱 (유료, ~₩4,000)으로 유사한 자동화가 가능하다.

#### 기본 구조

```
[Tasker 프로필]
  트리거: 매일 08:00
  →
[태스크: 아침 브리핑]
  1. HTTP Request → Notion API (할일 조회)
  2. Variable Set → 결과 파싱
  3. HTTP Request → Claude API (분석 요청)
  4. Notify → 알림으로 결과 표시
```

#### 태스크 설정: "아침 브리핑"

**액션 1: Notion에서 할일 가져오기**

```
Action: HTTP Request
  Method: POST
  URL: https://api.notion.com/v1/databases/DB_ID/query
  Headers:
    Authorization: Bearer ntn_토큰
    Notion-Version: 2022-06-28
    Content-Type: application/json
  Body: {"filter":{"property":"상태","status":{"does_not_equal":"완료"}}}
  Output Variable: %notion_result
```

**액션 2: Claude에 분석 요청**

```
Action: HTTP Request
  Method: POST
  URL: https://api.anthropic.com/v1/messages
  Headers:
    x-api-key: sk-ant-API키
    anthropic-version: 2023-06-01
    Content-Type: application/json
  Body: {
    "model": "claude-haiku-4-5-20251001",
    "max_tokens": 1024,
    "messages": [{"role":"user","content":"할일 정리해줘: %notion_result"}]
  }
  Output Variable: %claude_result
```

**액션 3: 알림 표시**

```
Action: Notify
  Title: 🌅 오늘 할일
  Text: %claude_result
  Icon: notion_icon
```

#### 무료 대안: Nautomate

Tasker가 복잡하다면 **Nautomate** 앱 (무료)으로 간단한 Notion 자동화가 가능하다:

- Notion DB에 항목 추가
- 페이지 생성
- GUI로 설정 (코드 불필요)
- 단, Claude API 연동은 미지원 → Notion 조작만 가능

---

### 9-7. 방법 E: 서버 경유 자동화 (모바일은 결과만 확인)

> **가장 안정적인 방법.** PC/서버에서 자동 실행하고, 모바일에서는 결과만 본다.

#### 구조

```
┌──────────────────────────────┐
│  서버 (PC / DO / AWS)         │
│                              │
│  cron → daily_workflow.py    │
│    → Notion API (읽기/쓰기)   │
│    → Claude API (분석)        │
│    → 결과를 Notion 페이지 저장  │
└──────────────────────────────┘
              │
              │ (Notion이 자동 동기화)
              ▼
┌──────────────────────────────┐
│  📱 스마트폰 Notion 앱        │
│                              │
│  아침에 앱 열면               │
│  "🌅 아침 브리핑 - 2026-04-15" │
│  페이지가 이미 생성되어 있음     │
└──────────────────────────────┘
```

#### 설정 방법

1. 8장의 `daily_workflow.py`를 서버에 배포
2. cron으로 매일 아침/저녁 자동 실행 (8-3장 참조)
3. 스마트폰에서는 Notion 앱만 열면 끝

#### Notion 모바일에서 빠르게 접근하기

**즐겨찾기 등록:**
1. `🌅 아침 브리핑` 페이지의 부모 페이지를 **즐겨찾기**에 추가
2. Notion 앱 열면 바로 접근 가능

**위젯 설정:**
1. Notion 즐겨찾기 위젯을 홈 화면에 배치
2. 원탭으로 브리핑 페이지 열기

---

### 9-8. 태블릿(iPad) 활용 팁

태블릿은 화면이 크므로 **Split View**로 Notion + Claude를 동시에 사용할 수 있다.

#### iPad Split View 활용

```
┌──────────────────┬──────────────────┐
│   Notion 앱      │    Claude 앱     │
│                  │                  │
│  📋 할일 관리     │  "이 할일 목록을  │
│  ├ 제안서 작성    │   분석해줘..."    │
│  ├ OTA 테스트    │                  │
│  └ 문서 정리     │  📊 분석 결과:    │
│                  │  1. 제안서 우선   │
│  📅 일정         │  2. OTA 오후에   │
│  └ 14:00 미팅    │  3. 문서는 내일   │
│                  │                  │
└──────────────────┴──────────────────┘
```

**설정 방법:**
1. Notion 앱 열기
2. 화면 하단에서 위로 스와이프 → Dock 표시
3. Claude 앱을 Dock에서 끌어 화면 오른쪽에 놓기
4. 양쪽 앱 사이에서 **드래그&드롭**으로 텍스트 이동 가능

#### iPad에서 Claude 프로젝트 + Notion 병행 워크플로우

1. Claude 앱에서 "일정 관리" 프로젝트 열기
2. Notion에서 이번 주 할일 전체 선택 → 드래그하여 Claude로 이동
3. Claude가 분석/정리한 결과를 다시 Notion으로 드래그
4. Notion에서 바로 편집하여 마무리

---

### 9-9. 모바일 사용 시 주의사항

| 항목 | 주의점 |
|------|--------|
| **API 키 보안** | 단축어/Tasker에 API 키가 저장됨. 기기 분실 시 즉시 키 재발급 |
| **네트워크** | WiFi 없이 셀룰러만 사용 시 API 호출 데이터 소모 (1회 ~10-50KB) |
| **배터리** | 자동화 빈도를 하루 2-3회로 제한 권장 |
| **Notion 오프라인** | 오프라인에서 수정 후 온라인 시 동기화. 충돌 가능성 있음 |
| **Claude 요금** | Haiku 모델 사용 시 하루 10회 기준 월 ~$1 이하 |
| **MCP 미지원** | 2026-04 현재, Claude 모바일 앱은 MCP를 지원하지 않음. API 직접 호출 필요 |

### 9-10. 추천 조합

| 사용자 유형 | 추천 방법 | 이유 |
|------------|-----------|------|
| **코딩 모름, 빠르게 시작** | 방법 A (수동) | 설정 없이 바로 시작 |
| **iPhone 사용자, 자동화 원함** | 방법 C (iOS 단축어) | 음성 입력 + 자동 실행 + 위젯 |
| **Android 사용자, 자동화 원함** | 방법 D (Tasker) | HTTP 요청으로 전체 자동화 |
| **PC도 사용, 가장 안정적** | 방법 E (서버) + A | 서버가 자동 생성, 모바일은 확인만 |
| **iPad 사용자** | 방법 A + Split View | 두 앱 동시 사용으로 효율 극대화 |

---

> 작성일: 2026-03-30 | 업데이트: 2026-04-15 (실습 가이드 + 할일/일정 워크플로우 + 모바일/태블릿 가이드 추가)
