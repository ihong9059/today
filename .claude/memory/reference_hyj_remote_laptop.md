---
name: reference_hyj_remote_laptop
description: hyj 노트북 원격 — ssh hyj 별칭 + RDP(.\hyj/hyj) + vault 사본 경로
metadata: 
  node_type: memory
  type: reference
  originSessionId: c0a27081-9e51-4135-b5ae-379b76ed4b3a
---

아들 홍영진 노트북 = **LAPTOP-9IGAL73G** (Windows 10 Pro). Tailscale `100.91.240.106`. 2026-11-05 셋업.

- **SSH**: `ssh hyj` (= `ihong@100.91.240.106`, 키 인증 id_ed25519, 암호 불필요). 본 PC `~/.ssh/config`에 Host hyj 등재. 원격 셸=cmd(출력 한글은 cp949로 깨져 보이나 디스크 파일명은 정상).
- **RDP**: `mstsc /v:100.91.240.106` → 사용자 `.\hyj` / 암호 `hyj` (로컬 관리자 계정, 2026-11-05 신설). 3389는 Tailscale 테일넷 내에서만 개방(외부 미노출). Windows 클라이언트라 콘솔↔RDP 동시 세션 불가.
- **ihong 계정은 Microsoft 계정**(PrincipalSource=MicrosoftAccount) → `net user`로 로컬 암호 재설정 불가(오류 8646). ihong 본인 바탕화면 접속은 MS계정 온라인 암호 필요. 그래서 전용 로컬 관리자 `hyj` 생성한 것.
- **hyj vault 사본**: 원격 `C:\todo\hyj` = 본 PC `C:\todo\hyj`([[project_hong_youngjin_selfdev]]) 복사본(`.git` 포함 독립 이력). tar(UTF-8)→scp→원격 해제 방식(한글 파일명·숨김 `.claude` 보존, [[feedback_verify_deliverable_end_to_end]] 준수).
- 주의: `hyj`/`hyj`는 약한 자격증명(아들이 쓰기 쉽게). 불요 시 `ssh hyj "net user hyj /delete"`.
