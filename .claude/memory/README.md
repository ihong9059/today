# Claude Memory — 양 PC 동기화 영역

## 이 폴더의 정체

이 폴더(`today/.claude/memory/`)는 Claude의 **장기 기억 (memory)** 실제 파일이 저장되는 곳입니다.

Claude는 이 위치를 **직접 보지 않고**, 사용자 폴더의 link를 통해 접근합니다:

```
Windows:  C:\Users\lenovo\.claude\projects\C--todo-today\memory  (junction)
              ↓ 가리킴
          C:\todo\today\.claude\memory                            (실제 파일)

Mac:      ~/.claude/projects/C--todo-today/memory                (symlink)
              ↓ 가리킴
          ~/path/to/today/.claude/memory                         (실제 파일)
```

이 구조 덕분에:
- 양 PC가 같은 git repo에서 같은 메모리 파일을 공유
- 한 쪽에서 메모리 추가/수정 시 git push/pull로 자동 동기화
- Claude는 평소처럼 사용자 폴더의 memory만 보면 됨 (link 인식 안 함)

## 신규 PC 셋업 (자동)

`/work-start` 스킬이 매번 자동으로 link 상태를 확인합니다.

- 이미 올바르게 설정 → 침묵
- 신규 PC에서 link 없음 → **자동으로 셋업 후 알림**
- 오류 → 수동 가이드 표시

수동 셋업이 필요한 경우:

### Windows
```powershell
python "C:\todo\today\.claude\hooks\setup-memory-sync.py"
```

### Mac/Linux
```bash
python3 ~/path/to/today/.claude/hooks/setup-memory-sync.py
```

## 셋업 스크립트 동작 원리

`.claude/hooks/setup-memory-sync.py`:

1. **OS 감지** (Windows/macOS/Linux)
2. **현재 상태 확인**
   - 이미 link이고 올바른 target → 종료 (idempotent)
   - 일반 폴더이고 파일 있음 → 백업
3. **파일 이동** (사용자 폴더 → repo 폴더)
4. **link 생성** (Windows: junction / Mac/Linux: symlink)
5. **검증**

Cross-platform 안전: 양 PC에서 동일하게 동작.

## 메모리 종류

| Type | Prefix | 용도 |
|------|--------|------|
| user | `user_*.md` | 사용자 정체성·역할 |
| feedback | `feedback_*.md` | 행동 규칙 (이렇게 해라/하지 마라) |
| project | `project_*.md` | 진행 중 사업 정보 |
| reference | `reference_*.md` | 외부 시스템 위치 |

`MEMORY.md` = 인덱스 (자동으로 시스템 프롬프트에 로드됨)

## 양 PC 동시 사용 주의사항

- 양 PC에서 동시에 같은 메모리 파일 수정 시 git merge conflict 발생 가능
- 작업 시작 전 `/work-start` 실행으로 git pull 먼저 (스킬 자동 처리)
- 작업 중 메모리 추가는 자유, 종료 시 `/work-end`로 commit·push
- 이미 [project_dual_pc.md](project_dual_pc.md) 메모리에 충돌 주의 안내 있음

## git 추적 정책

`.gitignore` 설정:
```
.claude/*                    # 기본 제외
!.claude/skills/             # 예외: skills 추적
!.claude/hooks/              # 예외: hooks 추적
!.claude/settings.json       # 예외: 설정 추적
!.claude/memory/             # 예외: memory 추적 ← 본 폴더
```

→ memory 폴더만 추적, 다른 .claude 항목 (sessions, commands 등)은 로컬 전용.
