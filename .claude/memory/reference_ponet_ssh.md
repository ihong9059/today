---
name: Ponet (조대홍 사장) SSH 연결 방법
description: Ponet 조대홍 사장 관련 PC 2대 SSH 연결 정보. notebook=ssh alias, 회사 desktop=Tailscale IP + 비밀번호. 사용자 잊어버리면 알려드릴 것
type: reference
originSessionId: b70fa337-bca6-4689-a4b4-60237c72dd19
---
2026-06-06 사용자 명시 박제 — Ponet 조대홍 사장 관련 PC 2대 SSH 연결 방법.

## SSH 연결 정보

| 대상 PC | 명령어 | 비밀번호 |
|---|---|---|
| **notebook** | `ssh desktop` | (alias, ssh config 별도 등록됨) |
| **회사 desktop** | `ssh user@100.108.118.44` | `Ponet1234!` |

## 메모

- `100.108.118.44` = Tailscale IP (100.x.x.x 대역 = Tailscale mesh)
- 본 vault 다른 Tailscale 머신: `factory-rpi4` 100.109.84.79 / `shield-rpi4` 100.110.51.14 / `uttec-vault` 100.90.158.36 (참고: [[reference_factory_rpi4_uttec_factory]])
- notebook `ssh desktop` alias = 본 PC `~/.ssh/config`에 별도 Host 등록 가정 (검증 carry)

## 사용 패턴

사용자가 "Ponet ssh", "조대홍 desktop", "조대홍 노트북" 등 키워드 + 연결 방법 질문 시 본 메모리 참조하여 즉시 답변.

## 보안 측면 (carry)

- 본 메모리는 today repo `.claude/memory/`와 link되어 GitHub `ihong9059/today` **private repo**에 push됨 — 외부 노출 0건 (private 한정)
- 향후 협업자 추가 시 비밀번호 노출 위험 → 1Password / Bitwarden 같은 vault 도구 분리 carry
- Ponet 측 비밀번호 변경 시 본 메모리 즉시 갱신 필수

## carry — Ponet 관계 정의 (사용자 답변 대기)

- UTTEC 사업 관계? (고객 / 거래처 / 협업 / 다른 카테고리)
- weldRobot·revita·onDevice 등 vault 신사업 trigger 후보?
- 위시캣 일감 채널?
- mywiki entity 신설 후보?

사용자가 추가 정보 주시면 myWiki `entities/ponet.md` 또는 적절한 vault entity 박제 진행.
