---
name: session-restore
description: 이전 세션 상태를 복원하여 작업 이어하기. "세션 복원해줘", "이전 작업 이어서", "지난 세션 불러와" 요청 시 사용
---

# 세션 복원 Skill

이전에 저장한 세션 파일을 불러와 작업을 이어서 진행할 수 있도록 합니다.

## 실행 절차

### 1. 최근 세션 파일 찾기

```bash
powershell -Command "Get-ChildItem 'C:\todo\today\.claude\sessions\session_*.md' -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1 -ExpandProperty FullName"
```

### 2. 세션 파일 읽기

Read 도구를 사용하여 최근 세션 파일 내용 읽기

### 3. 세션 내용 요약 및 안내

읽은 세션 파일에서 다음 정보를 사용자에게 요약:

1. **이전 작업 요약**: 지난 세션에서 무엇을 했는지
2. **완료된 작업**: 이미 끝난 작업들
3. **진행 중인 작업**: 아직 완료되지 않은 작업
4. **다음에 할 일**: 오늘 해야 할 작업
5. **중요 정보**: 기억해야 할 설정, 경로 등

### 4. 할 일 목록 생성

"다음에 할 일" 항목들을 TodoWrite 도구로 할 일 목록에 추가

### 5. 작업 시작 질문

사용자에게 질문:
- "이전 작업을 이어서 진행할까요?"
- "다음에 할 일 목록에서 시작할까요?"
- "새로운 작업을 시작할까요?"

## 세션 목록 보기

사용자가 "세션 목록 보여줘"라고 요청하면:

```bash
powershell -Command "Get-ChildItem 'C:\todo\today\.claude\sessions\session_*.md' -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object Name, LastWriteTime"
```

## 특정 세션 복원

사용자가 특정 날짜 세션을 요청하면 해당 날짜의 세션 파일을 찾아서 복원

## 트리거 키워드

- "세션 복원해줘"
- "이전 작업 이어서 해줘"
- "지난 세션 불러와줘"
- "작업 복원해줘"
- "work start"

## 세션 파일이 없을 경우

"저장된 세션이 없습니다. 새로운 작업을 시작하시겠습니까?"라고 안내
