---
name: work-start
description: 작업 시작 시 사용. git pull, 세션 복원, 작업보고서 확인, 오늘 할일 표시. 세션 시작할 때 호출
---

# 작업 시작 Skill (통합)

작업 시작 시 저장소 동기화, 이전 세션 복원, 작업보고서 확인을 한 번에 수행합니다.

## 실행 절차

### 1. git pull로 저장소 동기화
```bash
git pull
```

### 2. 최근 세션 파일 확인 및 복원

```bash
powershell -Command "Get-ChildItem 'C:\todo\today\.claude\sessions\session_*.md' -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1 -ExpandProperty FullName"
```

세션 파일이 있으면:
- Read 도구로 세션 파일 읽기
- 이전 작업 요약, 완료/미완료 작업, 중요 정보 표시
- "다음에 할 일" 항목을 TodoWrite로 할 일 목록에 추가

세션 파일이 없으면:
- "저장된 세션이 없습니다" 안내 후 다음 단계 진행

### 3. 작업보고서 확인

작업보고서/ 폴더에서:
- 어제 작업보고서 확인 (완료/미완료 파악)
- 오늘 작업보고서(YYYY-MM-DD_작업보고서.md) 확인 또는 생성

### 4. 오늘 할일 통합 표시

다음 항목들을 통합하여 테이블 형식으로 표시:
- 세션의 "다음에 할 일"
- 어제 미완료 작업
- 오늘 작업보고서의 할일

| 순번 | 할일 | 출처 | 상태 |
|:----:|------|------|:----:|
| 1 | ... | 세션 | ⬜ |
| 2 | ... | 어제 미완료 | ⬜ |
| 3 | ... | 오늘 할일 | ⬜ |

### 5. 작업 시작 질문

사용자에게 질문:
- "이전 작업을 이어서 진행할까요?"
- "다른 작업을 시작할까요?"

## 세션 목록 보기

사용자가 "세션 목록 보여줘"라고 요청하면:

```bash
powershell -Command "Get-ChildItem 'C:\todo\today\.claude\sessions\session_*.md' -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object Name, LastWriteTime"
```

## 특정 세션 복원

사용자가 특정 날짜 세션을 요청하면 해당 날짜의 세션 파일을 찾아서 복원

## 트리거 키워드

- "작업 시작"
- "세션 시작"
- "세션 복원해줘"
- "이전 작업 이어서"
- "work start"

## 참고

- 위시캣 프로젝트 체크는 /wishket-check 로 별도 진행
