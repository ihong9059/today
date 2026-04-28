---
name: notion
description: Notion 페이지 읽기/쓰기. 메모 추가, 페이지 생성, 내용 조회. "Notion에 추가해줘", "Notion 확인해줘" 요청 시 사용
---

# Notion 연동 Skill

Notion API를 통해 페이지를 읽고 쓰는 Skill입니다.

## 설정

- **토큰**: 환경변수 `NOTION_TOKEN` 사용 (settings.json에 설정됨)
- **API 버전**: `2022-06-28`
- **워크스페이스**: 홍광선님의 워크스페이스

## 페이지 ID

| 페이지 | ID | 타입 |
|--------|-----|------|
| 오늘 할 일 | `349cb620-8c2b-817d-a7fe-c887ecdee292` | page |
| 오늘 작업 | `343cb620-8c2b-8032-829c-e4655bf9e974` | page |
| 위시캣 프로젝트 추적 | `34bcb620-8c2b-8109-bc86-d635a4e18479` | database |
| 내일 작업 | `347cb620-8c2b-80fb-b8bf-ecb17003a86c` |
| 라즈베리 시스템 | `343cb620-8c2b-80fe-9696-f12ac5e8887d` |
| 내일 작업 준비 | `347cb620-8c2b-80cb-8500-c9bad19d2db2` |

새 페이지가 추가되면 이 테이블을 업데이트한다.

## 기능

### 1. 페이지에 메모 추가

사용자가 "Notion에 추가해줘: {내용}" 또는 "Notion {페이지명}에 추가: {내용}" 요청 시:

- 페이지명이 없으면 **"오늘 작업"** 페이지에 추가
- "내일" 키워드가 있으면 **"내일 작업 준비"** 페이지에 추가

**중요: Windows에서 curl은 한글이 깨지므로 반드시 Python을 사용한다.**

```python
python -c "
import requests, json
TOKEN = '$NOTION_TOKEN'
PAGE_ID = '{PAGE_ID}'
headers = {'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28'}
data = {'children': [{'object': 'block', 'type': 'bulleted_list_item', 'bulleted_list_item': {'rich_text': [{'type': 'text', 'text': {'content': '{내용}'}}]}}]}
r = requests.patch(f'https://api.notion.com/v1/blocks/{PAGE_ID}/children', headers=headers, json=data)
print('성공!' if r.status_code == 200 else f'실패: {r.text}')
"
```

여러 항목을 한번에 추가할 때는 children 배열에 여러 블록을 넣는다.
읽기(GET) 요청은 한글 문제가 없으므로 curl 사용 가능.

### 2. 페이지 내용 읽기

사용자가 "Notion 확인해줘", "Notion 오늘 작업 뭐있어" 요청 시:

```bash
curl -s -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  "https://api.notion.com/v1/blocks/{PAGE_ID}/children?page_size=100"
```

응답에서 각 블록의 `rich_text[].plain_text`를 추출하여 사용자에게 보여준다.
하위 블록이 있으면 (`has_children: true`) 해당 블록 ID로 재귀 조회한다.

### 3. 새 페이지 생성

사용자가 "Notion에 새 페이지 만들어줘: {제목}" 요청 시:

```bash
curl -s -X POST \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  "https://api.notion.com/v1/pages" \
  -d '{
    "parent": {"page_id": "343cb620-8c2b-8032-829c-e4655bf9e974"},
    "properties": {
      "title": {"title": [{"text": {"content": "{제목}"}}]}
    },
    "children": [
      {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
          "rich_text": [{"type": "text", "text": {"content": "{초기 내용}"}}]
        }
      }
    ]
  }'
```

생성 후 페이지 ID를 위 테이블에 추가한다.

### 4. 전체 페이지 목록 조회

```bash
curl -s -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  "https://api.notion.com/v1/search" -X POST \
  -H "Content-Type: application/json" \
  -d '{"page_size": 100}'
```

### 5. 세컨드 브레인 요약 → Notion 업로드

사용자가 "세컨드 브레인 요약을 Notion에 올려줘" 요청 시:
1. 세컨드 브레인 위키에서 핵심 정보 추출 (projects, goals, ai-direction)
2. Notion 새 페이지 또는 기존 페이지에 요약 추가
3. 출장 중 모바일에서 참조 가능

### 6. 마크다운 파일을 Notion에 예쁘게 업로드

사용자가 "Notion에 올려줘", "Notion에 업로드" 요청 시, **md 파일을 Notion 블록으로 변환**하여 업로드한다.
Notion에서 보기만 할 때가 많으므로, **보기 좋은 서식이 핵심**이다.

**반드시 아래 Python 변환 함수를 사용한다:**

```python
import requests, json, os, re

TOKEN = os.environ.get('NOTION_TOKEN')
HEADERS = {'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28'}

def md_to_notion_blocks(md_text):
    """마크다운 텍스트를 Notion API 블록 리스트로 변환"""
    blocks = []
    lines = md_text.split('\n')
    i = 0

    while i < len(lines):
        line = lines[i]

        # 빈 줄 무시
        if not line.strip():
            i += 1
            continue

        # 제목
        if line.startswith('##### '):
            blocks.append({'object': 'block', 'type': 'heading_3', 'heading_3': {'rich_text': parse_inline(line[6:])}})
        elif line.startswith('#### '):
            blocks.append({'object': 'block', 'type': 'heading_3', 'heading_3': {'rich_text': parse_inline(line[5:])}})
        elif line.startswith('### '):
            blocks.append({'object': 'block', 'type': 'heading_3', 'heading_3': {'rich_text': parse_inline(line[4:])}})
        elif line.startswith('## '):
            blocks.append({'object': 'block', 'type': 'heading_2', 'heading_2': {'rich_text': parse_inline(line[3:])}})
        elif line.startswith('# '):
            blocks.append({'object': 'block', 'type': 'heading_1', 'heading_1': {'rich_text': parse_inline(line[2:])}})

        # 구분선
        elif line.strip() == '---':
            blocks.append({'object': 'block', 'type': 'divider', 'divider': {}})

        # 인용구
        elif line.startswith('> '):
            blocks.append({'object': 'block', 'type': 'quote', 'quote': {'rich_text': parse_inline(line[2:])}})

        # 번호 목록
        elif re.match(r'^\d+\.\s', line):
            text = re.sub(r'^\d+\.\s', '', line)
            blocks.append({'object': 'block', 'type': 'numbered_list_item', 'numbered_list_item': {'rich_text': parse_inline(text)}})

        # 글머리 목록
        elif line.startswith('- ') or line.startswith('* '):
            blocks.append({'object': 'block', 'type': 'bulleted_list_item', 'bulleted_list_item': {'rich_text': parse_inline(line[2:])}})

        # 코드 블록
        elif line.startswith('```'):
            lang = line[3:].strip() or 'plain text'
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].startswith('```'):
                code_lines.append(lines[i])
                i += 1
            code_text = '\n'.join(code_lines)
            if len(code_text) > 1900:
                code_text = code_text[:1900] + '\n...(truncated)'
            blocks.append({'object': 'block', 'type': 'code', 'code': {'rich_text': [{'type': 'text', 'text': {'content': code_text}}], 'language': lang if lang in NOTION_LANGUAGES else 'plain text'}})

        # 테이블 (| col1 | col2 | 형식)
        elif line.startswith('|'):
            table_rows = []
            while i < len(lines) and lines[i].startswith('|'):
                row = lines[i]
                # 구분선 행 (|---|---| ) 건너뛰기
                if re.match(r'^\|[\s\-:]+\|', row):
                    i += 1
                    continue
                cells = [c.strip() for c in row.split('|')[1:-1]]
                table_rows.append(cells)
                i += 1
            i -= 1  # for 루프 증가분 보정

            if table_rows:
                width = max(len(r) for r in table_rows)
                notion_rows = []
                for row in table_rows:
                    while len(row) < width:
                        row.append('')
                    notion_rows.append({'type': 'table_row', 'table_row': {'cells': [[{'type': 'text', 'text': {'content': cell[:2000]}}] for cell in row]}})
                blocks.append({'object': 'block', 'type': 'table', 'table': {'table_width': width, 'has_column_header': True, 'has_row_header': False, 'children': notion_rows}})

        # 일반 텍스트
        else:
            if len(line) > 2000:
                line = line[:2000]
            blocks.append({'object': 'block', 'type': 'paragraph', 'paragraph': {'rich_text': parse_inline(line)}})

        i += 1

    return blocks

def parse_inline(text):
    """인라인 서식 파싱 (볼드, 이탤릭, 코드, 링크)"""
    result = []
    pattern = re.compile(r'(\*\*(.+?)\*\*|`(.+?)`|\[(.+?)\]\((.+?)\)|(.+?))')

    remaining = text.strip()
    while remaining:
        m_bold = re.search(r'\*\*(.+?)\*\*', remaining)
        m_code = re.search(r'`(.+?)`', remaining)
        m_link = re.search(r'\[(.+?)\]\((.+?)\)', remaining)

        matches = [(m.start(), m) for m in [m_bold, m_code, m_link] if m]
        if not matches:
            if remaining:
                result.append({'type': 'text', 'text': {'content': remaining}})
            break

        matches.sort(key=lambda x: x[0])
        pos, match = matches[0]

        if pos > 0:
            result.append({'type': 'text', 'text': {'content': remaining[:pos]}})

        if match == m_bold:
            result.append({'type': 'text', 'text': {'content': m_bold.group(1)}, 'annotations': {'bold': True}})
        elif match == m_code:
            result.append({'type': 'text', 'text': {'content': m_code.group(1)}, 'annotations': {'code': True}})
        elif match == m_link:
            result.append({'type': 'text', 'text': {'content': m_link.group(1), 'link': {'url': m_link.group(2)}}})

        remaining = remaining[match.end():]

    return result if result else [{'type': 'text', 'text': {'content': text.strip() or ' '}}]

NOTION_LANGUAGES = ['abap','arduino','bash','basic','c','clojure','coffeescript','c++','c#','css','dart',
    'database','docker','elixir','elm','erlang','flow','fortran','f#','gherkin','glsl','go','graphql',
    'groovy','haskell','html','java','javascript','json','julia','kotlin','latex','less','lisp',
    'livescript','lua','makefile','markdown','markup','matlab','mermaid','nix','objective-c','ocaml',
    'pascal','perl','php','plain text','powershell','prolog','protobuf','python','r','reason','ruby',
    'rust','sass','scala','scheme','scss','shell','sql','swift','toml','typescript','vb.net',
    'verilog','vhdl','visual basic','webassembly','xml','yaml','java/c/c++/c#']

def upload_md_to_notion(md_text, title, parent_id):
    """마크다운을 Notion 페이지로 업로드"""
    blocks = md_to_notion_blocks(md_text)

    # Notion API는 한 번에 최대 100 블록
    first_batch = blocks[:100]
    remaining = blocks[100:]

    data = {
        'parent': {'page_id': parent_id},
        'properties': {'title': {'title': [{'text': {'content': title}}]}},
        'children': first_batch
    }
    r = requests.post('https://api.notion.com/v1/pages', headers=HEADERS, json=data)
    if r.status_code != 200:
        return False, r.text[:200]

    page_id = r.json()['id']

    # 100개 초과 블록은 append로 추가
    while remaining:
        batch = remaining[:100]
        remaining = remaining[100:]
        r = requests.patch(f'https://api.notion.com/v1/blocks/{page_id}/children', headers=HEADERS, json={'children': batch})
        if r.status_code != 200:
            return False, r.text[:200]

    return True, page_id
```

**사용법**: md 파일을 Notion에 올릴 때 반드시 `md_to_notion_blocks()` 함수로 변환 후 업로드한다. 절대 텍스트 블록으로 통째로 넣지 않는다.

## 트리거 키워드

- "Notion에 추가해줘"
- "Notion 확인해줘"
- "Notion 오늘 작업"
- "Notion 내일 작업"
- "Notion 새 페이지"
- "Notion에 올려줘"
- "notion"

## 주의사항

- 토큰이 변경되면 이 파일의 토큰을 업데이트한다
- 새 페이지 생성 시 Notion에서 해당 페이지에 Integration 연결이 자동으로 됨 (부모 페이지에 연결되어 있으면)
- API Rate Limit: 평균 3 요청/초
