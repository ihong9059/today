---
name: notion
description: Notion 페이지 읽기/쓰기. 메모 추가, 페이지 생성, 내용 조회. "Notion에 추가해줘", "Notion 확인해줘" 요청 시 사용
---

# Notion 연동 Skill

Notion API를 통해 페이지를 읽고 쓰는 Skill입니다.

## 설정

- **토큰**: `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`
- **API 버전**: `2022-06-28`
- **워크스페이스**: 홍광선님의 워크스페이스

## 페이지 ID

| 페이지 | ID |
|--------|-----|
| 오늘 작업 | `343cb620-8c2b-8032-829c-e4655bf9e974` |
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
TOKEN = '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'
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
curl -s -H "Authorization: Bearer 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" \
  -H "Notion-Version: 2022-06-28" \
  "https://api.notion.com/v1/blocks/{PAGE_ID}/children?page_size=100"
```

응답에서 각 블록의 `rich_text[].plain_text`를 추출하여 사용자에게 보여준다.
하위 블록이 있으면 (`has_children: true`) 해당 블록 ID로 재귀 조회한다.

### 3. 새 페이지 생성

사용자가 "Notion에 새 페이지 만들어줘: {제목}" 요청 시:

```bash
curl -s -X POST \
  -H "Authorization: Bearer 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" \
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
curl -s -H "Authorization: Bearer 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" \
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
