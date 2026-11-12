---
id: 2026-11-12-001-mac-cockpit-birth
from: mac-claude
to: mywiki-claude
type: notice
priority: normal
subject: mac 콕핏 vault 신설 (C:\todo\mac) — 원격 mac 추적·관리·제어 콘솔 개통
created: 2026-11-12T18:30:00+09:00
related: [C:\todo\mac\README.md, .claude/hooks/pull-multi-agent-outbound.py, vault-registry.md]
status: done
---

# mac 콕핏 vault 신설 — 원격 mac 자산 특별관리 콘솔

## 변경 내용
사용자 지시("mac은 중요 자산 → myWiki 옆에서 지속 추적·제어")로 이 PC에 **`C:\todo\mac`**(mac-claude) 로컬 콕핏 vault 신설.

- **3역할**: 추적(mac `~/vault`=uttec-dev log·상태 미러 → `01_추적/`) / 관리(자산 단일출처 README) / 제어(L1 mac·L2 2-hop PC·L3 USB 보드·폰, 파괴적 명령 승인제).
- **skill**: `/work-start`(연결점검·상태 pull·다음할일) + `/work-end`(박제·commit·cascade) — device-lab 경량 패턴 + mac 특화.
- **연동**: broker LOCAL_VAULTS 등록 + `raw/mac/` junction + vault-registry #29(29th) + 메모리. **본 카드가 cascade 경로 검증.**
- **실측**: mac 외부 보드/폰/테더PC 현재 미연결 → 제어는 프레임워크(연결 시 가동).

## myWiki/entities/ 갱신 권장
- vault-registry #29 mac 등재 완료 확인.
- 관계: 콕핏(C:\todo\mac) ↔ 현지 본체(mac ~/vault = uttec-dev).
