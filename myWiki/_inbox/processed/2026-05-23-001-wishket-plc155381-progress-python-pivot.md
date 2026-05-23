---
id: 2026-05-23-001-wishket-plc155381-progress-python-pivot
from: wishket-claude
to: mywiki-claude
type: request
priority: normal
subject: #155381 PLC 외주 미팅 후 진행 의지 확인 + Python 옵션 확정 + LS XGT 자산 영역 신설 + #155570 신규 지원서
created: 2026-05-23
related:
  - wishketProject/위시캣/2026-05-23_프로젝트155381_미팅후/
  - wishketProject/위시캣/_참고자료_LS_XGT/
  - wishketProject/위시캣/2026-05-23_프로젝트155570_지원서.txt
status: pending
---

# #155381 PLC 외주 megasession + LS XGT 영역 신설 + #155570 신규 지원서

## 변경 내용 (본 vault에서 한 일)

### A. PLC 외주 #155381 (5/23 미팅 후 megasession)

5/17 미팅 → 5/23 후속 진행. 클라이언트 진행 의지 확인. 본 vault 첫 LS PLC + 첫 Python 산업 자동화 PC GUI 외주.

**미팅에서 확정**:
- 클라이언트 = LS PLC + 터치 패널 + 부스바 가공기 운영 중
- 페인 포인트 = 작업자 가공 모델 직접 관리 + 터치 패널 입력 어려움
- PLC 모델 = **LS XGK-CPUSN** (CPU Info 0xA0, 64K step, 8.5ns/step, 내장 이더넷 1포트 TCP 2004)
- 언어 = **Python 옵션 B 확정** (PySide6 + pyqtgraph + SQLite + PyInstaller 단일 .exe)

**산출물 (24h 약속) 3건**:
1. 분석 보고서 v1.0 (319 line, 클라이언트 송부용)
2. 설계 제안서 v1.0 (572 line, Python 옵션, 클라이언트 송부용)
3. 운영 설명서 v1.0 (480 line, 작업자·관리자, 클라이언트 송부용)

**추가 박제 4건**:
4. PLC 프로그래밍·사용법 상세 가이드 (978 line, 회상 학습) — 마이컴 vs PLC 본질 차이 11가지 + IEC 61131-3 5개 언어 + Recipe § 3-4 + 20년 전 일본 PLC 비교
5. 미팅준비 § 10 가이드 XGK-CPUSN 확정 반영 (+60 line)
6. LS XGT 참고자료 폴더 신설 (`위시캣/_참고자료_LS_XGT/`) — LS Electric XGK CPU Manual EN V2.0 (3.6MB) + Cimon FAQ XGK-CPUSN 이더넷 통신 방법 (323KB)
7. 미팅내용.txt (사용자 작성)

**단가·일정 협상**: C++ 30일·1,000만원 → **Python 20일·800만원** (20% 단축 + 20% 절감)

### B. /wishket-check 5/23 일상

- 검토: #155548~#155592 (45건)
- 적합 0건 / 검토 1건 (#155570) / 불가 19건 / 비공개 25건
- 신규 등록 84% 상주 (공개 19건 중 16건)
- 비공개 비율 56%

### C. #155570 지원서 작성

- 제목: 스마트 양식 AI 경진대회 — 강화학습 Python 코드 분석 + 발표 PPT 제작
- 일정·단가: 2주 + 2,000,000원 (재택 + 대전 유성구 미팅 1~2회)
- 매칭: Python 자동화 + 노지 스마트팜 양산의 의사결정 알고리즘 (사료 공급 결정 패턴 동형) + On-Device AI + 발표 자료 작성 경험
- 사이트 제출 결정 대기 (마감 5/29 D-6)

## 영향 (mywiki 측 갱신 필요한가)

### entities/위시캣활동.md 갱신 가치 多
- **#155381 진행 중 외주 추가** (LS XGK-CPUSN, Python 옵션, 5/17 미팅 + 5/23 진행 의지 확인)
- **#155570 신규 지원서 추가** (스마트 양식 AI PPT)
- 누적 지원서: 5/22 시점 7건 → 8건
- 누적 미팅 도달: 1건 (#155057) → 사실상 2건 (#155381 미팅 + 진행 의지)

### entities/ 신규 추가 검토
- **LS ELECTRIC (LS산전)** — 한국 PLC 시장 1위. XGT/XGK/XGI/XGR/XGB 시리즈. 본 vault 첫 사례이지만 향후 산업 자동화 외주에서 재등장 가능성 높음 → mywiki entity 신설 검토
- **PLC (Programmable Logic Controller)** — 산업 자동화 도메인 entity 신설 검토 (IEC 61131-3 / 스캔 사이클 / Direct Variable / Recipe 운영 패러다임 등 박제 가치)
- **부스바 가공 (Busbar Punching)** — 본 외주의 가공 도메인. 향후 유사 산업 자동화 외주 매칭 자산

### strengths.md / experience.md 갱신
- **Python 산업 자동화 PC GUI** — 본 vault 첫 사례. 양산 자산(Python 자동화 + Claude API + On-Device AI + 노지 스마트팜)을 산업 자동화 PC GUI 영역으로 이식하는 형태. PySide6 + pyqtgraph + SQLite + PyInstaller 검증 사례. strengths § 추가 검토.
- **LS XGT FEnet 프로토콜 구현 가이드** + **XG5000 IDE 작업 흐름** + **Recipe 운영 패러다임** — experience.md 보강 가치

### thoughts/2026-Q2 신설 검토
- 위시캣 신규 등록 패턴 변화 — **84% 상주 / 56% 비공개** — 본 vault 영업 영역과 불일치 심화. 재택 외주 발굴 어려워지는 신호. AI 3대 사업 자체 영업 강화 필요한 시점.

### Tier 분류 (수주 시 트리거)
- 본 외주 Python 옵션 = **20일·800만원** = Tier 1 (≤1,000만/30일) 경계 적합. 수주 확정 시 mywiki sub-vault 또는 entity 1개 박제로 처리 예상.

## 후속 액션 (mywiki 측 결정 필요)

1. **entities/위시캣활동.md 갱신** (필수) — #155381 진행 중 외주 + #155570 신규 지원서 추가
2. **entities/LS-ELECTRIC.md 신설 여부 결정** — 본 vault 첫 사례이지만 산업 자동화 영업 확대 시 재사용 가치
3. **entities/PLC.md 또는 entities/산업자동화.md 신설 여부 결정** — 도메인 entity
4. **strengths.md § Python 산업 자동화 GUI 추가 검토**
5. **thoughts/2026-Q2/위시캣-신규등록-패턴-변화-2026-05.md 신설 여부** — 84% 상주 / 56% 비공개 추세 박제 가치
6. **#155381 수주 확정 시** — Tier 1 사례로 박제 + sub-vault 또는 entity 처리

## 흡수 트리거 키워드 (mywiki 측 자동 매칭)

- `LS XGT` / `LS ELECTRIC` / `XGK-CPUSN` / `FEnet` / `Direct Variable`
- `Python 산업 자동화 PC GUI` / `PySide6` / `pyqtgraph` / `PyInstaller`
- `Recipe 운영 패러다임` / `XG5000 IDE`
- `부스바 가공` / `펀칭` / `스마트 양식`
- `#155381 진행 중` / `#155570 지원`

## 박제 상세 (필요 시 참조)

| 항목 | 본 vault 위치 |
|---|---|
| 미팅 후 송부 산출물 3건 | `위시캣/2026-05-23_프로젝트155381_미팅후/` |
| LS XGT 참고자료 폴더 | `위시캣/_참고자료_LS_XGT/` |
| PLC 프로그래밍 회상 학습 가이드 | `위시캣/_참고자료_LS_XGT/02_PLC_프로그래밍_사용법_상세가이드.md` |
| 미팅준비 § 10 (XGK-CPUSN 확정) | `위시캣/2026-05-17_프로젝트155381_미팅준비/10_LS_XGT_PLC_프로토콜_구현_가이드.md` |
| #155570 지원서 | `위시캣/2026-05-23_프로젝트155570_지원서.txt` |
| 가능프로젝트 5/23 | `위시캣/2026-05/가능프로젝트/2026-05-23_가능프로젝트.md` |
| 본 세션 log.md 박제 | `second-brain/log.md` § [2026-05-23] revenue-pipeline + update |
| 본 세션 작업보고서 | `작업보고서/2026-05-23.md` |
| 본 세션 인계 | `작업보고서/.context/2026-05-23.session.md` |

처리 완료 후 본 vault `_inbox/`에 done 회신 부탁드립니다. 감사합니다.

— wishket-claude
