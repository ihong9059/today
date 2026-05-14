---
name: PC 인프라 — 역할 분리 시대
description: today/myWiki 운영 PC 구성. 2026-05-14부터 Mac이 Ubuntu 개발 전용으로 컨버전되어 역할 분리 체제로 전환
type: project
---

today 저장소(github.com/ihong9059/today.git)와 myWiki는 **Windows lenovo PC가 단일 source**.

**Why:** 2026-05-14 이전에는 Windows + Mac 2대 동시 사용 → git/obsidian-git 동시 편집 충돌 위험. 그 Mac이 Ubuntu 22.04로 컨버전되어 **개발 전용 노드로 역할 분리**됨. 더 이상 myWiki 동기화 파트너 아님.

**How to apply:**
- myWiki/today repo 편집은 **Windows lenovo PC에서만** 수행 (단일 source of truth)
- Ubuntu PC (`ssh ubuntu`)는 빌드·실험·백그라운드 개발 노드로 사용 — myWiki clone 금지 권장
- 모든 작업보고서·세션·메모리는 Windows에서만 갱신
- 만약 향후 Mac이 아닌 다른 2번째 PC가 추가되면, 이 메모리 다시 갱신

**현재 PC 구성 (2026-05-14):**
| 노드 | 역할 | 호스트 |
|---|---|---|
| Windows lenovo | myWiki/today 마스터 + 일상 작업 | DESKTOP-MD6RE2A |
| Ubuntu PC | 개발 전용 (빌드·실험) | uttec-MacBookPro (`ssh ubuntu`, 100.90.158.36) |
| Debian ARM64 | 항시 가동 서버 | 192.168.0.23 |
| 기타 임베디드 | Raspberry Pi 등 | rasp_b3 등 |

**과거 컨텍스트 (2026-05-14 이전):**
- Windows + Mac 2대가 myWiki를 동시에 사용
- `.claude/memory/`는 양 PC가 git으로 공유 (이 메모리도 그렇게 동기화됨 → 단일 source 체제로 바뀌어도 그대로 유지)
- 일부 스킬·훅의 `C:\todo\today\...` 절대경로 하드코딩은 단일 source 체제에서는 문제 없음 (향후 다중 PC 다시 필요해지면 추상화 검토)
