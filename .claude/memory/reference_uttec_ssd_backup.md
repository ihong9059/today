---
name: UTTEC_SSD 외장 disk + /backup skill
description: 정기 백업 외장 disk 사양 + skill 호출 방법
type: reference
originSessionId: d8f1303f-55e6-48a2-804d-d4ee83e0dda1
---
**외장 disk**: SanDisk Portable SSD 1TB, 라벨 `UTTEC_SSD`, exFAT, 마운트 `G:\` (Windows·Ubuntu 5.4+ 양방향)

**Skill**: `/backup` — `C:\todo\today` → `G:\today_backup_YYYY-MM-DD` (robocopy /E /MT:32 /XJ /NFL /NDL, incremental)

**박제 경로**: `.claude/skills/backup/SKILL.md`

**핵심 박제 사항**:
- ⭐ **반드시 PowerShell 호출** — Git Bash에서 호출 시 `/E` 옵션이 `E:/` 경로로 mangling되어 exit 16 (6/1 첫 시도 실패 박제)
- ⭐ **`/XJ` 필수** — `myWiki/second-brain/raw/`의 junction 20+개 (revitaProject, onDevice_AI, search, 신규사업, 응원봉 등 외부 vault)를 따라가면 무한 루프 + 외부 vault 별도 백업과 충돌
- 첫 포맷: 5/31 (exFAT 라벨 UTTEC_SSD)
- 5/31 surface scan으로 528GB `surface_scan.bin` 남겨서 6/1에 재포맷 + skill 박제

**자주 묻는 질문**:
- 매번 호출 OK (incremental, 변경분만 copy)
- 같은 날 여러 번 → 같은 폴더에 덮어쓰기
- work-end 자동 호출 안 함 (외장 disk가 항상 연결돼 있지 않음)
