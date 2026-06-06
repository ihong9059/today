---
title: Zotero — 참고문헌·자료 관리 도구 (도입 2026-06-06)
type: entity
created: 2026-06-06
updated: 2026-06-06 (도입 진입 — weldRobot research/ 첫 적용, 단계적 5-vault 확장 carry)
tags: [zotero, 참고문헌, 자료관리, citation, PDF라이브러리, Obsidian통합, BetterBibTeX, 도구도입, weldRobot우선]
links: [strengths, skills, ai-direction, weldRobot, 영업전략, 위시캣활동, onDevice-ai, revita, lemonLabs]
---

# Zotero — 참고문헌·자료 관리 도구

## 한 줄 정의

학술·기술·시장 자료 (PDF·논문·웹 캡처 + 메타데이터) 통합 라이브러리 + citation 자동화 표준 오픈소스. **2026-06-06 [[weldRobot]] research/ 첫 적용**, 단계적 5-vault 확장 carry.

## 도입 상태

| 축 | 상태 |
|---|---|
| 도입 결단 | ✅ 2026-06-06 사용자 명시 "a" (옵션 a 즉시 도입) |
| Zotero 7 본체 설치 | ⬜ 사용자 행동 |
| Zotero Connector (Chrome) | ⬜ 사용자 행동 |
| Better BibTeX 플러그인 | ⬜ 사용자 행동 |
| Obsidian Zotero Integration 플러그인 (myWiki) | ⬜ 사용자 행동 |
| **weldRobot research/ 첫 적용** | ⭐ 진행 중 (_ZOTERO_GUIDE.md + 3 콜렉션 시드 작성 완료) |
| 다른 vault 확장 | (carry) revita·wishket·onDevice_AI·lemonLabs |

## 본질 — 핵심 기능 7건

1. **자동 메타데이터 수집** — Connector 1클릭에 저자·발행처·날짜·DOI 추출 + PDF 자동 다운로드
2. **PDF 라이브러리 + 주석** — highlight·note·tag·fulltext 검색
3. **태그·콜렉션** — Obsidian 폴더+태그 동일 패턴
4. **citation 자동 생성** — BibTeX·RIS·Markdown·Word·LibreOffice 9,000+ 스타일
5. **로컬 우선 + free sync** — Zotero Cloud 300MB 무료 + WebDAV·S3 자유 host
6. **그룹 라이브러리** — 협업 (lemonLabs 협업 vault 적합)
7. **API + 외부 통합** — Obsidian/Notion/Logseq plugin 연동

## UTTEC 자산 매칭 (vault별 활용)

| vault | Zotero 활용 |
|---|---|
| **weldRobot** ⭐ (첫 적용) | research/시장조사·기술벤더·경쟁사·학술 논문 (Path Robotics·IFR·두산·Basler·Photoneo 등) |
| **myWiki** | `raw/articles/` 대체·보강 (현재 markdown 스크랩 → PDF·메타데이터 자동화) |
| **wishketProject** | 위시캣 산업 자료 (PLC·SCADA·반도체·전력설비 datasheet·표준) |
| **onDevice_AI** | CMSIS-NN·STM32H7 reference manual·IEEE 산업 응용 논문 |
| **revitaProject** | 농업 IoT·Sentinel-2·농림위성·CropX·Climate FieldView 자료 |
| **lemonLabs** | 정부 R&D 공고 PDF·예비창업패키지·창업·법인 자료 |

## 사업 자산 가치 ⭐⭐

### 1. 출처 신뢰도 narrative (영업 무기)

- mywiki #155220 ReportLab 사양서·견적서 양식에 citation 자동 첨부
- "Path Robotics: $1.2B (Crunchbase, 2024-XX)" 같은 출처 명시 = 1인 컨설팅 신뢰도 결정타
- 위시캣 매칭 SOP 자가 패스 옵션 강화 후보 ([[영업전략]] § 응답율 검증 누적 단계)

### 2. 자산 인덱스 cross-vault 통일

- mywiki [[ai-direction]] § 결정 44 자산 인덱스 우선 SOP 강화
- Zotero가 모든 vault의 출처 자료 단일 라이브러리 = 자산 인덱스 누락 재발 방지

### 3. carrier 패턴 templates 강화

- mywiki [[strengths]] § 13 carrier 역량 = vault 분리 패턴
- Zotero = vault별 콜렉션 분리 + 자료는 통합 라이브러리 = carrier 패턴 강화
- 새 vault 신설 시 Zotero 콜렉션 신설 = templates 적용 1단계

## 본 vault (weldRobot) 첫 적용 상세

### 작성 완료 (2026-06-06)

- `weldRobot/research/_ZOTERO_GUIDE.md` — 설치·셋업·박제 라이프사이클
- `weldRobot/research/시장조사/_collection_seed.md` — 첫 수집 후보 16건 (한국 용접 시장·글로벌·정부 R&D·통계)
- `weldRobot/research/기술벤더/_collection_seed.md` — 첫 수집 후보 22건 (두산·카메라·라인 레이저·3D scan·컴퓨팅·토치·PLC)
- `weldRobot/research/경쟁사/_collection_seed.md` — 첫 수집 후보 16건 (Path Robotics·Vectis·Hirebotics·Augmentus·인접)
- 비교 매트릭스 생성 carry ([[strengths]] § 차별화 가설 1 사실 검증)

### 사용자 행동 carry (Zotero 설치 후)

1. Zotero 7 + Connector + Better BibTeX 설치
2. Obsidian Zotero Integration 플러그인 (myWiki vault에)
3. 콜렉션 계층 생성 (`UTTEC/weldRobot/시장조사·기술벤더·경쟁사·학술 논문`)
4. 첫 자료 박제 시범 (Path Robotics Crunchbase 페이지 1건)
5. Zotero data 위치 결단 (default vs WebDAV vs S3)
6. mywiki `raw/zotero/` junction 신설 후보 (Zotero PDF 라이브러리 vault 통합)

## 5-vault 확장 carry (단계적)

| 단계 | vault | 시점 |
|---|---|---|
| 1단계 ⭐ | **weldRobot** | 2026-06 (진행 중) |
| 2단계 | myWiki `raw/zotero/` 통합 | weldRobot 정착 후 |
| 3단계 | wishketProject | 다음 위시캣 미팅 자료 작성 시 (산업 datasheet 출처) |
| 4단계 | onDevice_AI | 다음 R+1 검증 사이클 (CMSIS-NN 논문) |
| 5단계 | revita + lemonLabs | 농업·창업 자료 정착 시 |

## 강점 신설 후보 — § 17 참고문헌·자료 관리 도구 통합 (carry)

본 도구 정착 검증 시 [[strengths]] § 17 신설 후보:

> "PDF·논문·웹 자료 통합 라이브러리 + citation 자동화 + cross-vault 콜렉션 분리 = 1인 컨설팅 출처 신뢰도 narrative 결정타. 양산 9종 + 모바일 + AWS + AI + **자료 관리** = 풀스택 carrier 6 트랙."

→ 정착 검증 = (a) weldRobot research/ 첫 적용 + (b) 첫 사양서·견적서 citation 첨부 결과 사용자 평가 후 결단.

## 의문점 (carry)

1. Zotero Cloud 무료 300MB vs 자체 WebDAV (Synology NAS 등) 결단?
2. mywiki `raw/zotero/` junction 위치 (`C:/Users/.../Zotero/storage/`)?
3. Better BibTeX citation key 양식 (`{author}{year}` vs `{author}{shortTitle}{year}` 등)?
4. Obsidian Zotero Integration 템플릿 (PDF 본문 + 메타데이터 삽입 양식)?
5. 그룹 라이브러리 도입 시점 (lemonLabs 협업 트랙)?

## 관련 페이지

- [[weldRobot]] — 첫 적용 vault
- [[strengths]] § 17 후보 (참고문헌 자산 관리 도구)
- [[ai-direction]] § 결정 44 (자산 인덱스 우선 SOP) — Zotero가 SOP 강화
- [[skills]] (도구 추가 후보)
- [[영업전략]] — 출처 신뢰도 narrative 영업 무기
- [[위시캣활동]] — 매칭 SOP 자가 패스 옵션 강화 후보
