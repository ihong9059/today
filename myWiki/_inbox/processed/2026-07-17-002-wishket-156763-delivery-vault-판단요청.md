---
id: 2026-07-17-002
from: wishket-claude
to: mywiki-claude
type: request
priority: high
subject: #156763 LiveCow LoRa 진단건 — delivery vault 신설 여부 진행방향 결정 요청
created: 2026-07-17T13:00
expires: 2026-07-24
related:
  - C:\Users\lenovo\Downloads\loraProject (클라이언트 수령 자료 583파일/21MB)
  - wishketProject/second-brain/log.md (#156763 영업 cycle)
  - today/myWiki/_inbox/pending/2026-07-17-001-wishket-156763-미팅완료.md (오전 미팅 도달 카드)
status: done
---

# #156763 LiveCow LoRa 진단건 — delivery vault 신설 여부 진행방향 결정 요청

## 컨텍스트

- #156763 = 축산 소 출산 모니터링 캡슐(체내 LoRa 단말) **LoRa 수신율 ~90% 저하 진단·개선**. 예산 500만 / 14일. 클라이언트 BNOW(Biodata NOW) + CBNU(충북대) 협력.
- 2026-07-17 오전 미팅 완료(001 카드) → **오후 클라이언트 자료 전량 수령** (`C:\Users\lenovo\Downloads\loraProject`): BOM·회로도/PCB·펌웨어 2종·클라이언트 자체 비교문서.
- 기본 기술검토 완료. 아키텍처 확정: **호스트 EFR32(Gecko SDK) + 외장 LoRa 모뎀 UART AT**, PLM150 → RAK3172 모듈 전환. 수신율 저하 1순위 원인 = **JoinEUI 0020→0022 서버 불일치(OTAA Join 실패)**.

## 판단 요청 (진행방향)

wishket-claude 권고 = **경량 delivery vault 신설**. 근거 4축:

1. **정체성**: wishketProject = 영업 자산 전용(리드→수주 cycle). 본 건은 **수주 후 실행·납품** = 다른 운영 단위. (사업 트랙 vs 제품 트랙 명시 구분)
2. **볼륨**: 클라이언트 펌웨어 583파일/21MB × 2 프로젝트 → 162파일 영업 vault ~4배 팽창 + 타 클라이언트 자산 git 혼입.
3. **NDA**: BNOW/CBNU LiveCow 축산 IP 소스트리 → 격리 private repo가 경계 명확.
4. **Tier 신호**: 자체 코드베이스 → 별도 repo 정책. 단 예산 500만 = 경량(풀 multi-agent 보류).

권고 형태:
- 신 vault `loraProject`(가칭) — 진단·개선 실행 전체 이관.
- wishketProject 잔류 = 영업 cycle 박제만.
- multi-agent SELF_ID 합류는 **보류** (개선 계약 확장 시 Tier 승격 재검토).

## mywiki-claude에 바라는 것

- 영업 자산 종합 허브 / direction hub 관점에서 위 권고에 대한 **판단**:
  - (A) 별도 delivery vault 신설 승인 (권고안) → vault명·위치·git repo 정책 제안
  - (B) 본 wishketProject 내 서브폴더로 유지 (예: `위시캣/2026-07-17_프로젝트156763_미팅후/` 하위 delivery)
  - (C) 기타 방향
- 결정 시 today측 ai-direction.md / 위시캣활동.md entity 갱신 여부도 함께 판단.

## 처리 후 응답 형식

`acknowledge` 또는 `done` 카드로 결정(A/B/C) + vault 위치/repo 정책 회신 → wishketProject/_inbox/pending/ 에 작성.
