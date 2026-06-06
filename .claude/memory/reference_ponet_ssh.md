---
name: Ponet (조대홍 사장) SSH 연결 방법
description: Ponet 조대홍 사장 관련 PC 2대 SSH 연결 정보 (회사 desktop + 조대홍 노트북). 본 PC ~/.ssh/config에 alias 등록 완료. 사용자 잊어버리면 알려드릴 것
type: reference
originSessionId: b70fa337-bca6-4689-a4b4-60237c72dd19
---
2026-06-06 사용자 명시 박제 — Ponet 조대홍 사장 관련 PC 2대 SSH 연결 방법. **2026-06-06 야간 갱신**: 본 PC ~/.ssh/config alias 정착 (`ponet` 신규 + `desktop` → `joNotebook` 정정).

## 본 PC alias 표준 (~/.ssh/config 등재)

| alias | 호스트 | 인증 | Tailscale IP | 본질 |
|---|---|---|---|---|
| **`ssh ponet`** ⭐ | `user@100.108.118.44` | 비밀번호 `Ponet1234!` | 100.108.118.44 | **Ponet 회사 desktop** (Main-ponet-win11pro, Windows 11 Pro) |
| **`ssh joNotebook`** | `USER@100.99.53.24` | 키 인증 (`~/.ssh/id_ed25519_desktop`) | 100.99.53.24 | **조대홍 노트북** (이전 alias: `desktop` → 명칭 안 맞아서 정정) |

## Posh-SSH (Windows, 자동화 SSH 자격 사용)

```powershell
$pw = ConvertTo-SecureString "Ponet1234!" -AsPlainText -Force
$cred = New-Object PSCredential("user", $pw)
$session = New-SSHSession -ComputerName "100.108.118.44" -Credential $cred -AcceptKey
Invoke-SSHCommand -SessionId $session.SessionId -Command "{commands}"
Remove-SSHSession -SessionId $session.SessionId
```

## 사용 패턴

사용자가 "Ponet ssh", "조대홍 desktop·노트북", "100.108.118.44", "ssh ponet", "ssh joNotebook" 등 키워드 + 연결 방법 질문 시 본 메모리 참조하여 즉시 답변.

## 보안 측면 (carry)

- 본 메모리는 today repo `.claude/memory/`와 link되어 GitHub `ihong9059/today` **private repo**에 push됨 — 외부 노출 0건 (private 한정)
- 향후 협업자 추가 시 비밀번호 노출 위험 → 1Password / Bitwarden 같은 vault 도구 분리 carry
- Ponet 측 비밀번호 변경 시 본 메모리 즉시 갱신 필수
- **ponet alias 키 기반 인증 전환 carry** (`ssh-copy-id ponet` 후 비밀번호 의존 0)

## carry — Ponet 관계 정의 (사용자 답변 후 박제)

✅ **2026-06-06 야간 fact-finding 결과 사업 본질 확정**:
- Ponet = 광주 소재 **정보통신공사·가로등설계·도시정비·농공단지 환경설비 공사** 회사 (조달청 MAS + 직접생산확인서 + 환경설비협회 회원 + 건설 감리원)
- UTTEC LED 디밍 원조사업 ([[양산제품]] #0 UTSOL 10만 등기) 자산과 **직접 정합** = 무선 가로등 IoT 공공 조달 first mover 결정타 가설
- 본 vault: `C:/todo/ponet/` (Tier 3, multi-agent 15번째 ponet-claude)
- mywiki 박제: `entities/ponet.md` + `조대홍.md` + `ai-direction § 결정 46·47` + `strengths §13 사례 3번째 행`
