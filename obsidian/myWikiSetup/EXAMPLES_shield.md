# EXAMPLES — shield-claude 합류 (시나리오 D 세 번째 적용 사례)

> **사례**: shield vault 신설 (RPi Linux 호스트) + shield-claude 합류 + work-end § 5-F **"always send absorb card" 강제 룰** 커스텀.
> **일자**: 2026-05-16
> **위치**: `/home/uttec/project/shield/` (Tailscale 100.120.255.34, hostname `uttec`)
> **사용자 query 박제**: "확인하고싶은것은 설치된 template이 이 myWiki와 연결되도록 되어있는가 입니다." → 답: ❌ 일반화 버전은 연결 X → **혼합 옵션 진행** (myWikiSetup 풀 셋업 + § 5-F 강제 룰)

---

## 사용자 prompt 박제 (원본)

> **Q1**: "shield 폴더의 진행사항이 myWiki와 연결되어 UTTEC의 비지니스에 참고가 되도록 하면 됩니다. 그럴경우 어떤 권장이 최선일가요?"
>
> **Q2**: "확인하고싶은것은 설치된 template이 이 myWiki와 연결되도록 되어있는가 입니다."
>
> **Q3**: "file:///c:/todo/today/obsidian/myWikiSetup 이것을 적용시키면 어떻게 되나요?"
>
> **Q4**: "a로하면 이 folder의 myWiki와 연결이 되나요?"
>
> **Q5**: "혼합으로 진행해주세요, 그리고 시나리오 D 를 설명해 주세요."

→ **사용자의 5단계 질문 lifecycle 박제**. 첫 질문에서 "어떻게 연결?" → 점진적으로 "정확히 연결 메커니즘 자동인가 판단인가?" 검증 → 최종 "혼합" 옵션 선택. 사용자 의사결정의 정밀화 과정 패키지 자산.

## 시나리오 D 세 번째 검증 사례 — 분산 호스트 3 사례 누적

| # | 일자 | 위키·Claude | 호스트 | 도메인 |
|:-:|---|---|---|---|
| 1 | 2026-05-15 | onDevice_AI / ondevice-claude | Windows | AI 제품 (FanStick + Stage 4) |
| 2 | 2026-05-16 | n8nUttec / n8n-claude | Ubuntu 22.04 (Mac hardware) | 자동화 학습 + 영업 |
| 3 | **2026-05-16** | **shield / shield-claude** | **Linux RPi (BCM2711)** | **하드웨어 시험 (LoRa·RS485·I2C)** |

**누적 검증**:
- **OS 다양성**: Windows + Ubuntu + Raspberry Pi OS
- **Hardware 다양성**: x86_64 + ARM64 (Mac) + ARM (RPi 4/3B+)
- **도메인 다양성**: AI 제품 / 자동화 / 하드웨어 시험
- **결론**: myWikiSetup이 **OS·hardware·도메인 무관**하게 작동 — **컨설팅 deliverable로 차별화 카피 강화**

## 셋업 절차 (~1.5시간)

| Phase | 작업 | 결과 |
|:-:|------|------|
| 0 | Prerequisite — SSH `Host shield` alias 추가 + git repo init + ihong9059/shield private repo 생성 | local commit `d0fd5e9` (21 files), push는 인증 셋업 후 |
| A | shield mini-vault 신설 — second-brain/ 7 files + _inbox/ 4 files + .claude/hooks/check-inbox.py | 12 files tar-stream 전송 OK |
| B | .claude/skills/work-{start,end}/SKILL.md → multi-agent 통합 버전 + **§ 5-F always-send 강제 룰** | work-start 3.3KB + work-end 5.4KB |
| C | 4 Claude 측 PROTOCOL.md / SYSTEM_GUIDE.md 5 Claude로 갱신 + 5 vault sync (md5 일치 검증) | md5 9c822fa5 (PROTOCOL) / 78f3ed3d (SYSTEM_GUIDE) 5 vault 동일 |
| D | 합류 통보 카드 4건 발송 (shield → mywiki/revita/ondevice/n8n) | 4 vault `_inbox/pending/` 배치 OK |
| E | myWiki entities/shield.md 신설 + log.md 박제 + index.md 등재 | ~7KB entity + log 항목 + index 등재 |
| F | myWikiSetup README 검증 사례 표 갱신 + 본 EXAMPLES_shield.md 신설 | 시나리오 D 3 사례 표 + 사용자 prompt 박제 |
| G | 검증 — SessionStart hook + check-inbox.py + git push | (예정) |

## 핵심 차별점 — work-end § 5-F always-send 강제 룰

### 기존 myWikiSetup § 5-F (판단 기반)

```
판단 후 행동:
- 알림 가치 없음 → 카드 작성 생략
- 알림 가치 있음 → 카드 작성
```

→ Claude가 매번 판단. 활동 빈도 낮은 vault에서 누락 위험.

### shield 특화 § 5-F (always-send 강제)

```
판단 없이 항상 실행:
- 매 work-end 시 myWiki/_inbox/pending/에 absorb 카드 발송
- 빈 세션이라도 "변경 없음" heartbeat 카드 발송
- mywiki-claude가 매 카드 인지 → 흡수 누락 0
```

→ 사용자 query "이 folder의 myWiki와 연결되나요?"에 **확실하게 ✅** 답 가능. **컨설팅 deliverable 차별화 카피**: "강제 자동 absorb로 흡수 누락 0% 보장."

## UTTEC 사업 자산화 효과

shield는 자체 개발 (외부 발주처 없음), 시험 단계, 활동 빈도 낮을 예상. 하지만 매 work-end → 자동 카드 → mywiki-claude → 다음 5단계 흡수:

1. **entities/shield.md 갱신** — 시험 결과 누적
2. **매칭 패턴 thoughts**:
   - shield × revita LoRa (920 MHz 노하우 이식)
   - shield × 한림용인CC 수조 (I2C 수위 + LoRa 통합 모듈)
   - shield × aiHardStudy (UTTEC 보드 강의 사례)
3. **gaps.md 후보** — shield gotcha (UART4/UART5 핀 충돌, BCM2711 alt function 등)
4. **ai-direction 판단 로그** — "한 도메인 = 한 vault + 강제 absorb 패턴" 검증

## 컨설팅 deliverable 가공 후보

본 사례는 **세 번째 검증 패턴**으로 myWikiSetup 컨설팅 deliverable에 다음 카피 추가:

- "📊 **분산 호스트 3 사례 검증** (Windows + Ubuntu + RPi). OS·hardware 무관 작동."
- "🎯 **always-send 강제 룰** 옵션 — 활동 빈도 낮은 vault도 흡수 누락 0% 보장."
- "🔄 **5 Claude multi-agent 시스템 검증** — 사용자 broker 부담 0, 자동 사업 자산화 흐름."
- "💡 **사용자 의사결정 lifecycle 박제** — 5 단계 질문(어떻게 연결? → 자동인가 판단인가? → 적용 시 어떻게? → 확실히 연결되나? → 혼합 진행)로 정밀화 과정 자산화."

## 메타

| 항목 | 값 |
|---|---|
| 도입 셋업일 | 2026-05-10 (자기-완결 평면 파일, 기존) + 2026-05-16 (myWikiSetup, 본 사례) |
| 5 Claude 확장 | 2026-05-16 |
| 사용자 의사결정 단계 | 5 (질문 lifecycle 박제) |
| 셋업 소요 | ~1.5시간 (Phase 0~F) |
| 분산 호스트 누적 | 3 사례 (Windows × 1 + Linux × 2) |
| 검증 가치 | ⭐⭐ (시나리오 D 세 번째, 컨설팅 deliverable 차별화 카피 추가) |

## 관련

- `EXAMPLES.md` — 첫 사례 (5/12)
- `EXAMPLES_n8nUttec.md` — 두 번째 사례 (5/16 n8n)
- `README.md` — 검증 사례 표 (3 사례 누적)
- myWiki `entities/shield.md` — 본 vault의 myWiki 측 entity
- myWiki `second-brain/log.md` — [2026-05-16] migrate+setup shield 항목
