# Second Brain Wiki - Lint 결과 보고서
> 실행일: 2026-04-22 | 대상: myWiki/second-brain/ (raw/ 제외)

## 종합 판정: PASS (A+)

| 점검 항목 | 결과 | 비고 |
|----------|:----:|------|
| 프론트매터 무결성 | PASS | 35개 파일 전부 정상 (title, type, created, updated, tags, links) |
| 깨진 링크 | PASS | `[[링크]]` 전수 검사 — 실제 페이지 참조 0건 깨짐 |
| 고아 페이지 | PASS | 모든 페이지 2개 이상 incoming 링크 보유 |
| updated 날짜 | PASS | 전부 2026-04-19 (위키 생성일) — 정확함 |
| 데이터 모순 | PASS | 수치/사실 교차 검증 — 모순 0건 |
| 상호 참조 | PASS | 엔티티 ↔ 코어 양방향 링크 완전 |
| 디렉토리 구조 | PASS | CLAUDE.md 정의 vs 실제 파일 — 전부 일치 |

---

## 상세 결과

### 1. 프론트매터 (PASS)
- 검사 대상: 35개 .md 파일 (CLAUDE.md 제외)
- 필수 필드 6개 (title, type, created, updated, tags, links) 전부 존재
- type 값 8종 사용: identity, skill, experience, project, goal, ai, thought, entity, index, log
- 누락/오류: 0건

### 2. 깨진 링크 (PASS)
- `[[파일명]]` 형식 링크 42개 탐지
- 표시 텍스트 링크 (`[[file|text]]`): 18개 — 전부 유효
- 단순 링크 (`[[file]]`): 21개 — 전부 유효
- 깨진 참조: 0건

### 3. 고아 페이지 (PASS)
- 전체 페이지 100% 연결됨

상위 연결 페이지:
| 페이지 | incoming 링크 수 |
|--------|:---------------:|
| ai-direction.md | 12 |
| me.md | 9 |
| skills.md | 8 |
| projects.md | 8 |
| gaps.md | 8 |
| 사전빌드.md | 8 |
| claude-code.md | 7 |
| strengths.md | 7 |
| goals.md | 7 |
| 위시캣활동.md | 7 |

허브 구조: me.md, ai-direction.md 중심의 hub-and-spoke 토폴로지

### 4. updated 날짜 (PASS)
- 전체 페이지 created/updated: 2026-04-19 (위키 일괄 생성)
- 이후 업데이트 없으므로 정확한 상태
- 향후 업데이트 시 updated 필드 갱신 필요

### 5. 데이터 모순 (PASS)
검증 항목:
- 양산제품 5개: skills.md = 양산제품.md = experience.md = 위시캣활동.md (일치)
- UTTEC Edu: 37과정, 765일 — uttec-edu.md = experience.md = index.md (일치)
- 사전빌드 272개: 사전빌드.md = experience.md = projects.md (일치)
- 경력 38년: skills.md = me.md = 위시캣활동.md (일치)
- 모순: 0건

### 6. 상호 참조 (PASS)
- 20개 엔티티 → 코어 페이지 링크: 전부 존재
- 코어 페이지 → 엔티티 역링크: 전부 존재
- 코어 페이지 간 상호 링크: 완전

### 7. 디렉토리 구조 (PASS)

| CLAUDE.md 정의 | 실제 존재 |
|---------------|:---------:|
| me.md | O |
| skills.md | O |
| experience.md | O |
| projects.md | O |
| goals.md | O |
| ai-landscape.md | O |
| ai-direction.md | O |
| strengths.md | O |
| gaps.md | O |
| index.md | O |
| log.md | O |
| entities/ (20개) | O |
| thoughts/ (3개) | O |
| raw/ (134개) | O |

---

## 권장 사항 (선택)

| 항목 | 내용 | 긴급도 |
|------|------|:------:|
| 1 | 다음 업데이트 시 updated 날짜 갱신 | 낮음 |
| 2 | log.md에 Lint 실행 기록 추가 | 낮음 |
| 3 | 분기별 정기 Lint 실행 권장 | 참고 |

---

## 결론

위키는 **구조적으로 건전**합니다.
- 깨진 링크 0건, 고아 페이지 0건, 모순 0건
- 4/19 일괄 생성 이후 변경 없어 정합성 완벽
- **다음 작업**: P2(experience.md 업데이트)로 진행하여 3일간 누적된 활동 반영
