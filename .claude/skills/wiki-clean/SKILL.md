---
name: wiki-clean
description: Obsidian 보관함 목록에서 특정 폴더명(또는 경로 키워드)에 매칭되는 vault 항목만 제거. 폴더와 파일은 그대로 보존. "wiki-clean", "vault 목록 정리", "Obsidian 보관함 제거" 요청 시 사용
---

# Wiki Clean Skill

Obsidian 보관함 목록에서 **특정 폴더명/경로 키워드를 포함하는 vault 항목만** 제거합니다. 디스크의 폴더와 파일은 **건드리지 않음** (안전).

## 사용법

```
/wiki-clean <폴더명_또는_키워드>
```

### 예시
```
/wiki-clean 1_readerWiki         → path에 "1_readerWiki" 포함된 항목만 제거
/wiki-clean examWiki             → path에 "examWiki" 포함된 모든 항목 제거 (일괄 정리)
/wiki-clean 태명과학             → 한글 폴더명도 OK
/wiki-clean 업무효율화/태명과학  → 더 구체적 경로 매칭
```

## 동작 원리

1. `C:\Users\lenovo\AppData\Roaming\obsidian\obsidian.json` 읽기
2. `vaults` 객체의 각 항목에서 `path` 값 확인
3. 인자 키워드가 path에 **포함**되는 항목 식별
4. 매칭된 항목 제거 (디스크 파일은 손대지 않음)

## 실행 절차

### Step 1: Obsidian 종료 확인

```bash
tasklist 2>/dev/null | grep -i obsidian
```

- 프로세스 있으면 → 사용자에게 **"Obsidian을 완전 종료해 주세요"** 안내 + 중단
- 프로세스 없으면 → 다음 단계

### Step 2: 백업 생성

```bash
cp "C:/Users/lenovo/AppData/Roaming/obsidian/obsidian.json" \
   "C:/Users/lenovo/AppData/Roaming/obsidian/obsidian.json.bak"
```

### Step 3: 현재 vault 목록 확인 + 매칭 항목 식별

obsidian.json을 Read하여 모든 vault 출력:
```
| ID | Path | 매칭 |
|----|------|------|
| ddb6efdd... | C:\todo\today\myWiki | ❌ |
| 521b914c... | C:\todo\today\smartFactory\examWiki\1_readerWiki | ✅ |
```

### Step 4: 사용자 확인 (안전장치)

매칭 항목이 1개 이상이면 사용자에게 표시:
```
다음 N개 항목을 보관함 목록에서 제거합니다 (폴더는 유지):
- C:\todo\today\smartFactory\examWiki\1_readerWiki
- C:\todo\today\smartFactory\examWiki\2_healthWiki

진행할까요? (yes/no)
```

매칭 0개면: "해당 키워드로 매칭되는 vault 없음" 안내 후 종료.

### Step 5: 항목 제거

Edit 도구로 obsidian.json에서 매칭 항목들을 제거.

JSON 형식 주의:
- 첫 항목 제거 시 `"id":{...},` 패턴 (뒤 쉼표 포함)
- 중간 항목 제거 시 `,"id":{...}` 패턴 (앞 쉼표 포함)
- 마지막 항목 제거 시 `,"id":{...}` 패턴 (앞 쉼표 포함)
- 단일 항목만 있을 때는 `"id":{...}` (쉼표 없음)

### Step 6: 결과 검증 + 보고

Read로 갱신된 obsidian.json 확인 후:
```
✅ 완료
- 제거: 2개
- 남은 vault: 3개 (myWiki, revitaWiki, 태명과학)
- 백업: obsidian.json.bak (문제 시 복구 가능)
- 디스크 폴더: 그대로 보존
```

## 안전 규칙

### ❌ 절대 하지 말 것
- 디스크의 실제 폴더/파일 삭제 (Skill 범위 아님)
- 사용자 확인 없이 myWiki, revitaWiki 같은 핵심 vault 제거
- Obsidian 실행 중에 obsidian.json 수정
- 백업 없이 진행

### ✅ 반드시 할 것
- 백업 먼저 (`obsidian.json.bak`)
- 사용자에게 매칭 목록 보여주고 확인
- 핵심 vault(myWiki·revitaWiki) 매칭 시 별도 경고
- 작업 후 결과 보고

## 핵심 vault 보호 (자동)

다음 키워드는 **경고 + 추가 확인** 필요 (실수로 제거하면 큰 손실):
- `myWiki` (사용자 second-brain)
- `revitaWiki` (REVITA 프로젝트)
- `업무효율화` (시뮬레이션 wiki — 영업 자료)

이 키워드가 인자에 포함되면:
```
⚠️ 경고: 핵심 vault가 매칭됩니다.
- C:\todo\today\myWiki

이 항목은 사용자의 핵심 자산입니다. 정말 제거할까요?
다시 한 번 "yes 확실히" 응답 필요.
```

## 트리거 키워드

- "wiki-clean"
- "vault 목록 정리"
- "Obsidian 보관함 제거"
- "/wiki-clean"

## 위치 참고

- Obsidian 설정: `C:\Users\lenovo\AppData\Roaming\obsidian\obsidian.json`
- 백업 자동 생성: `obsidian.json.bak` (같은 폴더)

## 관련 Skill
- `wiki-lint` — myWiki second-brain 점검 (별개 skill, 유지보수용)
- `wiki-query` — myWiki 횡단 질의

## 변경 이력
- 2026-05-04: 초기 작성. examWiki 체험 후 정리 자동화 목적
