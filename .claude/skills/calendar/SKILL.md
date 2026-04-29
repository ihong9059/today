---
name: calendar
description: 일정 등록. Notion DB 저장 + Google Calendar 브라우저 자동 오픈. "일정 등록", "캘린더 추가", "일정 추가" 요청 시 사용
---

# 일정 등록 Skill

일정을 Notion DB에 저장하고 Google Calendar에 자동으로 추가합니다.

## Notion 일정 DB 정보

- **DB 페이지**: `34acb620-8c2b-814f-a466-f24646527957`
- **Data Source ID**: `24384ac4-e322-41f4-9e38-d6cecc61a98e`
- **스키마**: 일정(TITLE), 날짜(DATE), 장소(TEXT), 카테고리(SELECT), 메모(TEXT)
- **카테고리 옵션**: 경조사(pink), 업무(blue), 개인(green), 미팅(orange)

## 실행 절차

### 1. 사용자 입력 파싱

사용자가 일정 정보를 알려주면 다음을 추출:
- **제목**: 일정 이름 (필수)
- **날짜**: YYYY-MM-DD 형식으로 변환 (필수)
- **시간**: HH:MM 형식 (선택, 없으면 종일)
- **장소**: 위치 (선택)
- **카테고리**: 경조사/업무/개인/미팅 중 자동 판별
- **종료시간**: 없으면 시작 +2시간 기본값

부족한 정보는 사용자에게 질문한다.

### 2. Notion DB에 등록

MCP 도구 `notion-create-pages`로 등록:

```
parent: {"data_source_id": "24384ac4-e322-41f4-9e38-d6cecc61a98e"}
properties:
  일정: {제목}
  date:날짜:start: {YYYY-MM-DD}
  date:날짜:is_datetime: 1 (시간 있으면) / 0 (종일)
  장소: {장소}
  카테고리: {카테고리}
  메모: {시간 등 추가 정보}
```

### 3. Google Calendar 브라우저 자동 오픈

URL을 생성하고 브라우저에서 자동으로 연다:

```bash
# URL 생성 규칙
# - dates: UTC 변환 (KST -9시간), 형식 YYYYMMDDTHHMMSSZ
# - 종일이면: YYYYMMDD/YYYYMMDD (다음날)
# - text, location, details는 URL 인코딩
# - 반드시 webbrowser.open() 사용 (cmd start는 한글 URL 깨짐)
# - urllib.parse.urlencode에 quote_via=urllib.parse.quote 사용

python -c "
import urllib.parse, webbrowser

title = '{제목}'
start = '{YYYYMMDDTHHMMSSZ}'  # UTC 변환된 시작시간
end = '{YYYYMMDDTHHMMSSZ}'    # UTC 변환된 종료시간
location = '{장소}'
details = '{메모}'

params = urllib.parse.urlencode({
    'action': 'TEMPLATE',
    'text': title,
    'dates': start + '/' + end,
    'location': location,
    'details': details
}, quote_via=urllib.parse.quote)
url = 'https://calendar.google.com/calendar/render?' + params
webbrowser.open(url)
print(f'Google Calendar 열림: {title}')
"
```

### 4. 결과 안내

등록 완료 후 요약 표시:
- 일정명, 날짜/시간, 장소, 카테고리
- "Google Calendar에서 '저장' 버튼을 눌러주세요" 안내

## 시간 변환 규칙 (KST → UTC)

- KST 13:30 → UTC 04:30 (같은 날)
- KST 09:00 → UTC 00:00 (같은 날)
- KST 00:30 → UTC 15:30 (전날)
- 공식: UTC = KST - 9시간

## 카테고리 자동 판별

| 키워드 | 카테고리 |
|--------|----------|
| 결혼, 장례, 돌잔치, 축의, 부의 | 경조사 |
| 회의, 미팅, 면접, 상담 | 미팅 |
| 출장, 마감, 프로젝트, 발표 | 업무 |
| 기타 | 개인 |

## 트리거 키워드

- "일정 등록"
- "일정 추가"
- "캘린더 추가"
- "캘린더에 등록"
- "calendar"

## 예시

사용자: "다음주 수요일 14시 강남에서 미팅 등록해줘"
→ 날짜 계산, Notion DB 등록, Google Calendar 오픈 자동 실행
