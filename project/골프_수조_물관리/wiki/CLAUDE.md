# 한림용인CC 고가수조 자동급수 무선제어 — sub-vault Claude 가이드

> **Tier 2 sub-vault** — 한림용인CC 시공 프로젝트의 격리된 위키 공간. 본 sub-vault는 시공·진행·결정을 단계별로 박제하며, myWiki의 [[한림용인cc-고가수조]] entity와 cross-link로 연결된다.
>
> **신설일**: 2026-05-17 (Tier 2 sub-vault 패턴 1번째 적용 사례)

## 본 sub-vault의 역할

1. **시공 단계별 박제** — D-3 자재 발주 → D-7 현장 답사 → D-10 펌웨어 포팅 → 시공 → 사후 운영
2. **기술 트레이드오프 기록** — `thoughts/2026-Q2/`에 (예: nRF52832 vs ESP32, 920MHz E22 변종 선정)
3. **객체 관리** — 현장·발주자·노드·자재는 `entities/`에
4. **시공 완료 후 흡수** — 핵심 자산 (한림그룹 재거래 패턴·LoRa 시공 노하우·하자보증 한계 명시 계약 템플릿)을 myWiki로 흡수 + `archive/`로 산출물 이전

## 프로젝트 기본 정보

| 항목 | 값 |
|---|---|
| 발주자 | 한림용인CC (골프존카운티 한림용인) |
| 시공자 | UTTEC |
| 견적 | 11,022,108원 (VAT 포함, 초경제형 1,000만원) |
| 단계 | ★ 시공 직전 (D-3, 5/20 D-day) |
| myWiki entity | `today/myWiki/second-brain/entities/한림용인cc-고가수조.md` |
| 상위 폴더 | `C:/todo/today/project/골프_수조_물관리/` |

## 인접 자산

- `../README.md` — 프로젝트 1차 기획 (10KB)
- `../설계_요구자료.md` — 설계 요구사항
- `../시공_체크리스트.md` — 시공 체크리스트
- `../references/견적서_초경제형_1000만원.pdf`
- `../references/급수인프라_지도.png`
- `../설계/수위측정_방법.md`

## 작성 규칙

본 sub-vault는 **표준 sub-vault 가이드**(`templates/sub-vault-template/wiki/CLAUDE.md`)를 따른다. 한림용인CC 고유 규칙:

### log.md 박제 우선순위

1. **시공 직전 단계 (현재 ~5/20)**:
   - 자재 발주 결정 (920MHz E22 변종 / 수위센서 / 펌프 제어반)
   - 현장 답사 결과 (8노드 GPS·LoS·NLOS 환경 실측)
   - 펌웨어 포팅 진척 (nRF52832 → 920MHz)

2. **시공 단계 (5/20~)**:
   - 노드 설치 위치 확정 (펌프 2 + 중계기 2 + 고가수조 2)
   - LoRa 통달 테스트 결과
   - 시공 일정 박제

3. **사후 운영 단계 (시공 완료 후)**:
   - 운영 안정성 (3개월~6개월)
   - 한림용인CC 만족도
   - 한림그룹 내 다음 골프장 영업 시도 결과

### 시공 완료 후 myWiki 흡수 체크리스트

- [ ] `myWiki/entities/한림용인cc-고가수조.md` — 시공 결과 박제 + status: 운영중
- [ ] `myWiki/entities/회사소개.md` — 골프장 고객 리스트에 정식 등재 (한림광릉CC 2020 + 한림용인CC 2026)
- [ ] `myWiki/skills.md` — LoRa E22 풀스택 시공 실증 사례 (~1.5km NLOS 골프장)
- [ ] `myWiki/strengths.md` — 한림그룹 재거래 영업 패턴 검증
- [ ] `myWiki/영업전략.md` — 기존 고객 신규 영역 확장 패턴 강화
- [ ] `myWiki/uttec-stage-package.md` — Stage 3 (1,000만) 첫 실증 사례
- [ ] `myWiki/log.md` — `## [날짜] complete | 한림용인CC 시공 완료 + 흡수`

### 후속 골프장 시공 시 sub-vault 재사용

본 sub-vault의 entities·thoughts는 한림그룹 내 다른 골프장 시공 시 그대로 참조 가능. **golf-template** 가능성 검토 (재사용 패턴이 2~3건 누적되면 별도 템플릿화).

## 승격 검토 트리거

본 sub-vault가 다음 조건 충족 시 **Tier 3 별도 repo로 승격**:

- 한림그룹 내 골프장 3개 이상 시공 누적 → `hanlimGolf` 또는 `golfWaterControl` repo 분리
- 자체 펌웨어 코드베이스가 oldProject/test/bleModule에서 독립 → 별도 repo
- 다른 호스트(Ubuntu/RPi)에서 모니터링 운영 시작 → 분산 호스트 vault 필요

승격 절차: `obsidian/myWikiSetup/` 참조 (분리 lifecycle 3단계 진화 패턴).
