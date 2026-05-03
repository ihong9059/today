# LLM Wiki 입문 가이드 (편집자P) - 상세 분석

## 영상 정보
- **채널**: 편집자P
- **연사**: 편집자P (한빛미디어 출판사 편집자, 옵시디언 개정판 저자 측)
- **재생시간**: 40:10
- **업로드일**: 2026-04-06
- **링크**: https://www.youtube.com/watch?v=S6w4g2OQlVQ

---

## 핵심 한줄 요약
Andrej Karpathy가 제안한 **LLM Wiki**(파편화 지식 → AI 정원사가 가드닝하여 위키화하는 시스템)를 옵시디언 + Codex/Claude Code + 로컬 스킬 조합으로 처음부터 빈 볼트에서 구축하는 입문 실습. 핵심은 **Raw/Wiki/Schema** 구조 + **Ingest/Query/Lint** 명령 사이클.

---

## 핵심 구조도

```
┌─────────────── Structure (구조) ───────────────┐
│   Raw       Wiki         Schema                │
│  (원본)   (정리됨)    (운영규칙)              │
└───────────────────────────────────────────────┘
                  ↑↓
┌─────────────── Commands (명령) ────────────────┐
│   Ingest    →   Query    →   Lint              │
│  (위키화)    (검색/답변)   (정원관리)         │
└───────────────────────────────────────────────┘
```

---

## 구간별 상세 내용

### 1. 도입 — 편집자 관점에서 본 LLM Wiki (0:00-1:00)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=0)

#### 핵심 메시지
편집자(지식을 모아 글로 풀어내는 사람) 관점에서 LLM Wiki 컨셉이 매우 신기하게 느껴져, 주말 8시간 + 아침 3-4시간 직접 사용해보고 영상 제작.

#### 상세 내용
- 발표자 본업: 편집자 — 지식을 모으고 글로 풀어내는 직무
- 사전 학습: 주말 8시간 + 아침 3-4시간 직접 사용
- 결론: 기본 컨셉은 명확히 이해

---

### 2. 옵시디언 책 광고 + 면책 (1:00-2:55)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=60)

#### 핵심 메시지
"옵시디언 고수 아님" 면책. 한빛미디어에서 옵시디언 개정판 출간(국내 2-3번째 옵시디언 책)이며 Claude Code로 옵시디언 CLI 관리 내용 포함.

#### 상세 내용
- 출판사 책 광고: 옵시디언 개정판
- 옵시디언 CLI를 Claude Code로 관리하는 내용 포함
- LLM Wiki는 "도구가 아니라 쓰는 사람의 지식이 훨씬 중요"

#### 주요 발언
> "이 LLM 위키라는 거는 쓰는 사람의 지식이 훨씬 중요한 거 같습니다. 도구가 중요한 게 아니라 쓰는 사람이 어떤 분야에서 연구를 하고 있거나 자료를 모으고 있거나 큰 고민을 하고 있고, 그런 와중에 현업에서의 실력 그리고 갖고 있는 지식들을 어떻게 조합해야겠다 이런 아이디어 도메인 지식 같은 게 있는 사람이 썼을 때 시너지가 엄청날 것 같다."

---

### 3. LLM Wiki란? — Andrej Karpathy의 동기 (2:55-4:55)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=175)

#### 핵심 메시지
Karpathy의 문제의식: 에이전트와 탐색하는 시간이 늘어나는데 컨텍스트는 계속 날아간다 → AGENT.md 문서화는 너무 귀찮다 → "에이전트가 알아서 정리해 주는 체계"가 필요. **정원사(Gardener) 비유**로 LLM이 텃밭(지식)을 자동 관리.

#### 상세 내용
- **문제**: 에이전트와의 대화/탐색 → 유용한 내용 손실 → 매번 재검색
- **대안 거부**: AGENT.md/문서화는 귀찮음
- **해결**: LLM 자체에게 문서 정리 전문 작업 위임
- **비유**: 정원사가 풀을 심으면 잡초도 같이 자라 텃밭이 지저분해짐 → LLM 정원사가 가드닝

#### 주요 발언
> "이 정원사가 풀이 좋으니까 풀을 다 심었어요. 근데 풀을 심으니까 막 잡초도 나고 막 계속 나는 거야. 내가 원하는 형태로 꽃이 잘 안 자라니까 내 텃밭이 좀 지저분해져요. 이걸 계속 관리해 줘야 되는데 이 관리하는 정원사가 LLM이 되면 어떨까."

---

### 4. 핵심 구조 — Raw / Wiki / Schema (4:55-8:10)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=295)

#### 핵심 메시지
LLM Wiki의 구조는 3개 폴더 + 3개 명령. 사용자는 거의 만질 필요 없고 컨셉만 이해하면 됨.

#### 상세 내용

| 폴더 | 역할 | 사용자 직접 조작 |
|------|------|------------------|
| **Raw** | 파편화된 지식을 일단 모으는 통 (검색 결과, 코드, 사이트 주소 등) | 자료 던져넣기 |
| **Wiki** | LLM이 가드닝해서 정리한 지식 네트워크 | 결과 확인 |
| **Schema** | 운영 규칙 (AGENT.md, CLAUDE.md 등) — 라우/위키 처리법, 중복 처리 규칙 | 거의 안 봄 |

**워크플로우 비유**:
- 사용자: "야, 너 이리 와 봐. 이렇게 모아 놨는데 가서 가드닝해. 위키로 만들어"
- LLM: "예, 알겠습니다 — 이 세 개는 관련이 있고, 얘하고 얘는 비슷한 느낌인데 합쳐 볼게요"
- 결과: 위키 노트가 정렬·통합되며 연결 시각화

#### 주요 발언
> "Raw는 파편화된 지식을 일단 모은다. 통에다가 쪽지를 그냥 막 모으는 거라고 생각하시면 됩니다."

> "에이전트한테 야 가서 가드닝해. 그래가지고 위키로 만들어, 그러면 얘가 가서..."

---

### 5. 핵심 명령 — Ingest / Query / Lint (8:10-10:15)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=490)

#### 핵심 메시지
3대 명령 중 **Lint는 자주 해줘야 함**. Raw가 변하거나 Wiki 형태가 변할 때마다 정원사를 호출해 정리 시킴.

#### 상세 내용

| 명령 | 역할 | 사용 빈도 |
|------|------|-----------|
| **Ingest** | Raw 폴더 뒤져서 위키화 진행 (의미 분석, 중복 발견, 품질 평가) | 자료 추가 시 |
| **Query** | 위키 안에서만 답변 → 신뢰도/방향성 확보 | 사용 시 |
| **Lint** ★ | 위키 정원 검수 (잡초 제거, 연결 보강, 누락 체크) | 자주! |

**Query의 핵심 가치**:
- 일반 LLM은 "아무렇게나" 동작
- LLM Wiki는 **위키화된 정보 안에서만** 가져옴 → 신뢰도 + 내가 모은 방향성

#### 주요 발언
> "결국은 인제스트, 쿼리, 린트 중에 린트는 진짜 자주 해 주셔야 되는 거예요. 로우가 변해도, 위키의 형태가 변해도 계속 처리를 해서 시켜야 된다는 거예요."

> "원래 LLM은 아무렇게나 동작하잖아요. 근데 LLM 위키 시스템 안에서는 위키화했던 것들 안에서만 지식을 가져오니까... 좀 더 신뢰 있는 답을 얻을 수 있다."

---

### 6. 옵시디언 + Vault 활용 + 그래프 뷰 (10:15-13:00)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=615)

#### 핵심 메시지
옵시디언의 **Vault**는 일반 프로젝트 폴더와 같음. 그래프 뷰가 LLM Wiki의 시각화에 적합. 옵시디언 철학: "정리할지 고민하지 말고 일단 다 넣어라, 연관성만 이어 주면 시간이 갈수록 강력한 지식 집합이 된다."

#### 상세 내용
- **Vault** = 옵시디언의 프로젝트 폴더 (Cursor/Codex가 여는 폴더와 동일)
- **그래프 뷰**: 점조직(연결 없는 Raw) vs 묶인 클러스터(연결된 Wiki)
- 시각화의 가치: LLM이 못 보는 "전혀 상관없는 것끼리의 연관성"을 사람이 발견

#### 옵시디언 철학
> 메모를 어떻게 정리할지 고민하지 말고 일단 다 넣어라. 메모끼리 연관성만 이어 주면 시간이 길어질수록 그 메모 총 집합체는 점점 강력한 메시지/주제로 향한다.

---

### 7. 저자 의견 — Vault 분리 + 향후 전망 (13:00-14:25)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=780)

#### 핵심 메시지
**관심사별 Vault 분리 권장** (자동차 + 웹 인터랙션 같이 두면 컨텍스트 혼잡으로 Query 성능 저하). 향후 옵시디언 진영이 LLM Wiki를 흡수할 가능성 높음.

#### 상세 내용
**Vault 분리 권장 이유**:
- 위키 안에서만 답변 → 다른 도메인 섞이면 컨텍스트 혼잡
- "에이전트는 컨텍스트가 혼잡해지면 답변이 이상해진다"

**향후 전망**:
- 누군가는 애플리케이션화 진행 중일 것
- **옵시디언 CLI** 출시 → 옵시디언이 LLM Wiki 흡수 확률 가장 높음
- 영상 내용은 영원한 답이 아니라 "이런 결도 있구나" 정도로 보라

#### 주요 발언
> "옵시디언이 흡수할 확률이 가장 높아 보입니다."

---

### 8. 옵시디언 설치 + 볼트 생성 (14:25-16:00)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=865)

#### 핵심 메시지
옵시디언 다운로드 → 보관함(Vault) 생성 → 폴더 위치 지정. 실습 볼트 이름: `LLM위키_carInfo` (자동차 정보).

#### 상세 내용

**설치 단계**:
1. 옵시디언 검색 → Get Obsidian for Mac/Windows
2. 첫 화면 → "오픈 볼트(Open Vault)" 또는 "보관함 생성"
3. 보관함 이름: `LLM위키_carInfo`
4. 위치: 동일 이름 폴더 생성 → 그 안에 볼트 생성
5. 볼트 열기 → 환영 메모 등 기본 파일 삭제

**환영 메모도 지식 중 하나**: 옵시디언이 던져주는 환영 쪽지조차 노트 네트워크의 시작점이 될 수 있음을 시연.

---

### 9. 터미널 플러그인 설치 (16:00-17:30)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=960)

#### 핵심 메시지
설정 → 커뮤니티 플러그인 활성화 → "Terminal" 플러그인 설치(다운로드 17만회). 옵시디언 화면 안에 시스템 터미널을 띄우는 단순 임베딩 도구.

#### 상세 내용
- 설정 → 커뮤니티 플러그인 사용 설정
- "터미널" 검색 → 17만 다운로드 플러그인 설치 + 활성화
- 화면 우측에 터미널 배치, 좌측 탐색기 + 노트 화면 → 세팅 완료

#### 언급된 사례/개념
- **Terminal 플러그인의 본질**: 새 터미널을 만든 것이 아니라, 기존 시스템 터미널(Antigravity/VSCode/Cursor의 터미널과 동일)을 옵시디언 안에 띄움

---

### 10. 에이전트(Codex/Claude Code) 실행 (17:30-18:50)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=1050)

#### 핵심 메시지
선호하는 에이전트(Codex 또는 Claude Code) 실행. 본 영상은 Codex로 진행.

#### 상세 내용
- 옵시디언 우측 터미널에서 `codex` 또는 `claude` 입력
- 빈 볼트 + 에이전트 활성 상태 → 시작 준비 완료

---

### 11. LLM Wiki 문서 링크로 자동 셋업 (18:50-21:00)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=1130)

#### 핵심 메시지
Karpathy의 LLM Wiki 사용법 문서 URL을 그대로 에이전트에 던짐 → 에이전트가 폴더 구조/AGENT.md 자동 구성.

#### 상세 내용

**프롬프트 예시**:
> "내가 인터넷에서 찾은 LLM 위키의 사용법인데, 이거 사용하려면 어떻게 해야 돼? 파악 좀 해 봐"

**에이전트 동작**:
1. 문서를 읽고 분석
2. "폴더 구조는 이렇고, AGENT.md는 이렇게 구성하라고 합니다"
3. "Raw 폴더 만들고, AGENT.md 구성하고, ... 진행할까요?"
4. 사용자 승인 → 좌측 폴더 트리에 골격 완성

**검수 필요**:
- LLM Wiki는 프로그램이 아니라 가이드라인 — 에이전트가 어떻게 해석할지는 그때그때 다름
- 사용자가 AGENT.md 내용을 직접 검토 필요

---

### 12. 핵심 운영 — 명령을 Skill로 등록 (21:00-23:00)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=1260)

#### 핵심 메시지
Ingest/Query/Lint 명령을 **Codex/Claude의 Skill로 등록**해 재사용성 + 명확성 확보. AGENT.md가 너무 길어지는 것도 방지.

#### 상세 내용

**스킬화의 이점**:
- 재사용성: 다른 볼트에서도 동일 패턴 적용
- 명확성: AGENT.md 건너뛰어도 명령 동작 보장
- AGENT.md 길이 단축

**Skill 이름**:
- `llm-wiki-ingest`
- `llm-wiki-query`
- `llm-wiki-lint`

**Local 등록 권장**: 글로벌 등록 시 다른 프로젝트에 영향 → 볼트 폴더 내 로컬로만

#### 주요 발언
> "스킬화를 하는 게 좋겠다라는 얘기를 해 줄 겁니다. 왜냐하면 여기다 다 때려박고 나서 인제스트 쿼리 린트를 이렇게 해라라고 하면 얘가 AGENT.md를 건너뛰어서 읽거나 하면 '인스터가 뭔 말인데요' 이럴 수도 있거든요."

---

### 13. Raw에 자료 모으기 — 자동차 데이터 수집 (23:00-27:30)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=1380)

#### 핵심 메시지
관심 주제(자동차 판매량/탑5/특징/중고차)를 검색해 마크다운으로 Raw에 저장. 이미지는 별도 자산 폴더(SS)에 → 위키화 시 LLM이 참조.

#### 상세 내용

**수집 패턴**:
1. 검색: "한국 차종별 브랜드별 자동차 판매량"
2. 결과 페이지 → 에이전트에 "Raw 폴더에 마크다운으로 저장해 줘"
3. 이미지: 별도 저장 → SS 폴더 → 나중에 위키화 시 참조

**Raw 저장 양식**:
- Article / Note / Transcript / Clip / Page
- SS = Screenshots/이미지 자산

**수집된 주제 예시**:
- 우리나라 차종별 브랜드별 판매량
- 탑5 특징 분석
- 30대 남성 중고차
- 가성비/현대 아반떼 등

#### 주요 발언
> "여러분이 자동차에 관심이 많으시면 막 이런 거 하시겠죠. 30대 남성 중고차 관련된 거 모으실 수도 있고... 그냥 열심히 모으기만 하는 거예요."

---

### 14. Skill 누락 트러블슈팅 (27:30-29:00)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=1650)

#### 핵심 메시지
Codex 클리어/재시작 후에도 Skill이 인식되지 않음 → 에이전트가 AGENT.md에서 스킬 항목은 지웠는데 실제 Skill 등록 작업을 빠뜨림. 다시 명시적으로 Skill 등록 요청.

#### 상세 내용

**증상**:
- `lm-wiki-ingest` 명령 호출 시 스킬 미인식
- 클리어 + 재시작도 효과 없음

**원인**:
- AGENT.md에서 스킬 항목은 정리했으나 실제 Skill 폴더 등록을 빠뜨림

**해결**:
> "Ingest, Query, Lint 스킬 등록해 주면 좋겠는데 이 폴더 내에서만 쓸 로컬 스킬이야"

→ 명시적 재요청으로 등록 완료

---

### 15. Ingest 실행 — 1차 가드닝 (29:00-31:30)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=1740)

#### 핵심 메시지
`/llm-wiki-ingest` 실행 → 에이전트가 Raw 분석 → Source/Concept/Entity 페이지 생성 → 1차 위키 가드닝 완료.

#### 상세 내용

**Ingest의 결과물**:
| 위키 분류 | 의미 | 예시 |
|----------|------|------|
| **Sources** | 원문 보관 (Raw에서 정제) | 기사 원본 |
| **Entities** | 정보와 연관된 자료/개체 | 기아 모닝, 현대 그랜저 |
| **Concepts** | 추상적 개념/주제 | 전기차 확산, 한국 자동차 시장, 연령대별 중고차 |
| **Analysis** | 재사용 가치 있는 분석 (Query 후 자동 생성) | (다음 단계) |

**Ingest 작업 내용**:
- 첫 실행: 중복 없음 → 모든 자료 위키화
- 이후 실행: 겹치는 정보 → 강화된 쪽으로 통합 / 중복 제거 / 연결 보강

#### 주요 발언
> "관련된 거를 더 강화된 쪽으로 바꿔 주고, 중복이 쓸데없는 게 있으면 빼 주고, 예전에 정보를 모았는데 중간에 연결고리가 좀 부족한 게 있으면 파악해서 위키를 더 좋게 만들어 줍니다."

---

### 16. 추가 자료 + 재 Ingest — 점진적 보강 (31:30-34:00)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=1890)

#### 핵심 메시지
"돈 없어도 이거 탑시다" 같은 추가 기사를 Raw에 넣고 다시 Ingest → 기존 페이지에 숫자/연결 보강 + 새 차량 1대 추가됨. 그래프 뷰에서 클러스터 시각화 확인.

#### 상세 내용
- 새 기사: 1월~9월 중고차 통계 → 기존 "중고차" 페이지에 숫자 보강
- 그래프 뷰 → 한국 자동차 시장 ↔ 현대 그랜저 ↔ 전기차 확산 등 연결 시각화

---

### 17. Query 실행 — Analysis 페이지 자동 생성 (34:00-36:00)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=2040)

#### 핵심 메시지
"기아 모닝은 어떤 차야?" 같은 질문 → 위키 안에서만 답변. **재사용 가치 있는 분석은 Analysis 페이지로 자동 저장**되어 위키가 점진적으로 진화.

#### 상세 내용

**LLM 위키의 자가 진화 메커니즘**:
- LLM과의 대화 자체가 위키에 쌓여야 할 지식
- 분석 결과는 Analysis 페이지로 보존
- 반복 질문 → Analysis 누적 → 중요도 상승 → Lint 시 중복 제거 후 강화

#### 주요 발언
> "결국은 LLM하고 나누는 이 대화 자체가 LLM한테는 쌓여야 되는 지식 중에 하나가 되는 거거든요. 그래서 Analysis에 이렇게 또 남겨 줍니다."

---

### 18. Lint 실행 — 정원 점검 (36:00-37:30)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=2160)

#### 핵심 메시지
Lint는 가드닝 점검: 누락 체크, 고립 페이지 제거, 잘못된 위키 링크 수정, 파일명 규칙 위반 정정.

#### 상세 내용

**Lint가 검사하는 것**:
| 항목 | 처리 |
|------|------|
| 누락된 페이지 | 보강 |
| 고립 페이지 (연결 없음) | 빼주거나 연결 추가 |
| 존재하지 않는 페이지를 가리키는 위키 링크 | 수정 |
| 파일명 규칙 위반 | 정정 |
| 탐색성을 망치는 잘못된 위치 | 재배치 |

#### 주요 발언
> "이건 탐색성을 망치기 때문에 서로 연결도 되어 있지 않은데 위키에다 집어넣으면 위키를 탐색할 때 좀 이상하다 이런 거예요. 그리고 엔티 파일명이나 이런 건 분명히 이렇게 하기로 했는데 파일명을 좀 잘못 입력을 했다, 수정을 하고 오겠다, 그래서 요런 걸 해 주는 겁니다."

---

### 19. 실전 활용 — 자기 블로그 인터랙션 개선 (37:30-39:50)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=2250)

#### 핵심 메시지
연사 본인의 블로그에 "웹 인터랙션 위키"를 별도 구축하고, 메타프롬프팅 방식으로 위키 기반 개선안 도출. 결과: 카드 등장 속도/확대 효과/다크모드 가독성 개선.

#### 상세 내용

**연사의 메타프롬프팅 패턴**:
> "이 지식 체계 안에서, 웹 인터랙션을 내 사이트인 [URL]에 적용해야 되는데, 부족한 게 있으면 어떻게 프롬프트해서 처리하는 게 좋을까?"

→ LLM이 위키 기반으로 부족한 점 진단 + 적용 프롬프트 추출 → 본인이 그 프롬프트로 실제 사이트 수정

**개선 결과** (블로그):
- 카드 등장 속도: 사용자가 인지 가능한 속도로 조정
- 클릭 시 확대 효과: 일관성 포함
- 다크 모드 가독성 개선

#### 주요 발언
> "그냥 아무런 아이디어 없이 하는 것보다는 요렇게 하니까 좀 이쁘게 잘 나오더라."

---

### 20. 마무리 (39:50-40:10)
[바로가기](https://www.youtube.com/watch?v=S6w4g2OQlVQ&t=2390)

#### 핵심 메시지
이 정도면 입문자가 큰 어려움 없이 시작 가능. 더 좋은 패턴을 발견하면 후속 영상 예정.

---

## 전체 사례 모음

| 사례명 | 구간 | 핵심 내용 | 시사점 |
|--------|------|-----------|--------|
| 정원사 비유 | 3:00 | 텃밭에 잡초가 자라듯 메모도 어지러워짐 → LLM 정원사가 가드닝 | LLM Wiki의 정체성 |
| 옵시디언 그래프 뷰 | 11:00 | 점조직(Raw) vs 클러스터(Wiki) 시각화 | 사람이 보는 검수 도구 |
| Vault 분리 권장 | 13:00 | 자동차+웹 한 볼트 = 컨텍스트 혼잡 | 도메인별 분리 원칙 |
| Terminal 플러그인 | 16:30 | 옵시디언 안에 시스템 터미널 임베딩 | 단일 화면 워크플로우 |
| LLM Wiki URL 던지기 | 19:00 | 문서 URL 1개로 자동 셋업 | 자료 기반 자율 구축 |
| Skill 로컬 등록 | 22:00 | 명령을 Skill화 + AGENT.md 단축 | 재사용성 + 컨텍스트 절약 |
| Skill 누락 트러블 | 27:30 | AGENT.md 정리만 하고 실제 등록 빠뜨림 | 검수 필요 |
| 자동차 데이터 수집 | 23:00 | 판매량/탑5/중고차 등 검색 결과 → Raw | 관심 주제 단일 볼트 |
| 1차 Ingest | 29:00 | Source/Concept/Entity 자동 분류 | 위키화의 첫 출력 |
| 재 Ingest 보강 | 31:30 | 새 자료 → 기존 페이지에 숫자 추가 | 점진적 진화 |
| Query → Analysis 자동 생성 | 34:00 | 대화 결과가 위키에 추가됨 | 자가 진화 메커니즘 |
| Lint로 깨진 링크 정정 | 36:30 | 고립 페이지/잘못된 위키 링크 검출 | 정원 청소 자동화 |
| 블로그 메타프롬프팅 | 37:30 | 위키 기반으로 개선 프롬프트 도출 | 실전 적용 패턴 |

---

## 전체 인용구 모음

### LLM Wiki 본질
> "이 LLM 위키라는 거는 쓰는 사람의 지식이 훨씬 중요한 거 같습니다. 도구가 중요한 게 아니라 쓰는 사람이..." (2:18)

> "이 정원사가 풀이 좋으니까 풀을 다 심었어요. 근데 풀을 심으니까 막 잡초도 나고... 이걸 계속 관리해 줘야 되는데 이 관리하는 정원사가 LLM이 되면 어떨까." (3:13)

### 구조 / 명령
> "Raw는 파편화된 지식을 일단 모은다. 통에다가 쪽지를 그냥 막 모으는 거라고 생각하시면 됩니다." (5:01)

> "에이전트한테 야 가서 가드닝해. 그래가지고 위키로 만들어." (5:33)

> "결국은 인제스트, 쿼리, 린트 중에 린트는 진짜 자주 해 주셔야 되는 거예요." (9:53)

### LLM Wiki vs 일반 LLM
> "원래 LLM은 아무렇게나 동작하잖아요. 근데 LLM 위키 시스템 안에서는 위키화했던 것들 안에서만 지식을 가져오니까... 좀 더 신뢰 있는 답을 얻을 수 있다." (7:13)

### 옵시디언 철학
> "메모를 어떻게 정리할지 고민을 하지 말고 일단 다 넣어라. 그다음에 그 메모끼리의 연관성만 네가 연관을 지어 주기만 해도 그 시간이 길어지면 길어질수록 너의 그 메모들의 그 총 집합체는 점점 강력한 어떤 메시지, 어떤 주제로 향하는 어떤 무엇이 될 것이다." (10:49)

### 자가 진화
> "결국은 LLM하고 나누는 이 대화 자체가 LLM한테는 쌓여야 되는 지식 중에 하나가 되는 거거든요. 그래서 Analysis에 이렇게 또 남겨 줍니다." (35:34)

### Vault 분리
> "위키 안에서만 답을 하게 되어 있는데 그 안에 자동차 얘기와 웹 인터랙션 얘기가 같이 있으면 컨텍스트가 혼잡해지겠죠. 우리 에이전트는 컨텍스트가 혼잡해지면 답변이 이상해진다." (13:07)

### 향후 전망
> "옵시디언이 흡수할 확률이 가장 높아 보입니다." (14:19)

### 마무리
> "지식 체계를 모으는 걸 좋아하니까 저는 원래 모아서 블로그에다 모았었어요... LLM 위키가 생기니까 이제 그걸 할 필요가 없어졌죠. 그냥 여기다 모으면 되니까요." (39:30)

---

## 용어 및 개념 설명

| 용어 | 설명 | 언급 시간 |
|------|------|-----------|
| **LLM Wiki** | Andrej Karpathy가 제안한 LLM 기반 자가 가드닝 위키 시스템 | 1:53 |
| **Andrej Karpathy** | OpenAI 출신 AI 연구자, LLM Wiki 컨셉 제안자 | 0:33 |
| **Gardener (정원사)** | LLM Wiki 비유 — 지식 정원을 관리하는 LLM | 4:09 |
| **Raw** | 파편화된 원본 자료 보관 폴더 | 5:01 |
| **Wiki** | LLM이 가드닝해 정리한 지식 네트워크 | 6:21 |
| **Schema** | 운영 규칙(AGENT.md/CLAUDE.md)이 담긴 폴더 | 7:39 |
| **Ingest** | Raw → Wiki 위키화 명령 | 8:09 |
| **Query** | Wiki 내에서 답변 추출 명령 | 8:46 |
| **Lint** | Wiki 가드닝 검수 명령 (자주 실행) | 9:18 |
| **Sources** | 위키 분류 — 원문 보관소 | 30:14 |
| **Concepts** | 위키 분류 — 추상 개념/주제 | 32:34 |
| **Entities** | 위키 분류 — 정보와 연관된 개체 | 32:30 |
| **Analysis** | 위키 분류 — 재사용 가치 있는 분석 (Query 후 자동 생성) | 35:34 |
| **Vault (보관함)** | 옵시디언의 프로젝트 폴더 | 10:35 |
| **Graph View** | 옵시디언의 노트 연결 시각화 뷰 | 11:25 |
| **Terminal Plugin** | 옵시디언 내 시스템 터미널 임베딩 (17만 다운로드) | 16:54 |
| **Codex** | OpenAI의 코드 에이전트 CLI | 17:57 |
| **Claude Code** | Anthropic의 코드 에이전트 CLI | 18:01 |
| **Local Skill** | 특정 폴더 내에서만 사용되는 에이전트 스킬 | 22:35 |
| **메타프롬프팅** | LLM에게 적용 프롬프트를 만들게 하는 기법 | 38:38 |

---

## 실용 체크리스트 (영상 따라하기)

### 사전 준비
- [ ] 옵시디언 설치 (Mac/Windows)
- [ ] Codex 또는 Claude Code 설치
- [ ] 관심 주제 1개 결정 (Vault는 도메인별 분리)

### 볼트 셋업
- [ ] "보관함 생성" → 이름 + 위치 지정
- [ ] 환영 메모 등 기본 파일 삭제
- [ ] 설정 → 커뮤니티 플러그인 활성화 → "Terminal" 플러그인 설치
- [ ] 우측에 터미널 + 좌측에 탐색기/노트 레이아웃

### LLM Wiki 골격 구축
- [ ] Codex/Claude 실행
- [ ] LLM Wiki 가이드 문서 URL 던지기 + "사용법 파악해 봐"
- [ ] 폴더 구조/AGENT.md 자동 생성 승인
- [ ] AGENT.md 내용 검토

### 명령 Skill화 (권장)
- [ ] "Ingest, Query, Lint를 Skill로 등록해 줘"
- [ ] "이 폴더 내에서만 쓸 로컬 스킬이야" 명시
- [ ] AGENT.md 단축 확인
- [ ] **검수**: Skill 폴더에 실제 파일 생성됐는지 확인 (영상 트러블슈팅 사례)

### 운영 사이클
- [ ] Raw에 자료 수집 (검색 결과 → 마크다운, 이미지 → SS 폴더)
- [ ] `llm-wiki-ingest` 실행
- [ ] 그래프 뷰로 시각 검수
- [ ] `llm-wiki-query`로 활용
- [ ] **자주 `llm-wiki-lint` 실행** ★

---

## 관련 자료 및 참고

### 영상에서 언급된 자료
- **LLM Wiki 가이드 문서** (Karpathy 또는 관련) — 상세 영상 설명에 링크 명시
- **옵시디언 개정판** (한빛미디어) — Claude Code로 옵시디언 CLI 관리 포함
- **편집자P 블로그** — 메타프롬프팅으로 인터랙션 개선한 사례

### 동일 카테고리 영상
- [카파시 LLM위키 클로드코드](카파시_LLM위키_클로드코드_상세.md) — 같은 LLM Wiki를 freAiner 채널에서 시연
- [카파시의 LLM Wiki AI 세컨드 브레인](카파시의_LLM_Wiki로_나만의_AI_세컨드브레인_만들기_상세.md) — 더 긴 시연
- [카파시 + 루만 자가컴파일 지식시스템](카파시_루만_자가컴파일_지식시스템_상세.md) — 제텔카스텐과의 결합
- [AI로 나를 복제했습니다 (Jay Choi)](AI로_나를_복제했습니다_클로드코드_옵시디언_LLM_Wiki_상세.md) — 인디 개발자 실전 사례
- [클로드 MCP × 옵시디언](클로드_MCP_옵시디언_노트작성부터_유튜브요약까지_상세.md) — MCP로 옵시디언 자동화

### 추가 조사가 필요한 주제
- LLM Wiki 공식 문서 URL과 실제 권장 폴더 구조 차이
- Codex vs Claude Code의 Skill 시스템 차이
- 다중 Vault 환경에서 Cross-Vault Query 가능성
- 옵시디언 CLI에 LLM Wiki 흡수 시 예상되는 형태
- 에이전트 컨텍스트 혼잡 해결 패턴 (RAG vs Wiki 비교)

---

## 부록 — Andrej Karpathy의 LLM Wiki 원본 (GitHub Gist)

> **원본**: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
> **공개일**: 2026-04-04
> **작성자**: Andrej Karpathy
> **목적**: "LLM Agent에 복사-붙여넣기하여 사용하도록 설계된 아이디어 파일"

### 원문 (English, Verbatim)

```markdown
# LLM Wiki

A pattern for building personal knowledge bases using LLMs.

This is an idea file, it is designed to be copy pasted to your own LLM Agent
(e.g. OpenAI Codex, Claude Code, OpenCode / Pi, or etc.). Its goal is to
communicate the high level idea, but your agent will build out the specifics
in collaboration with you.

## The core idea

Most people's experience with LLMs and documents looks like RAG: you upload a
collection of files, the LLM retrieves relevant chunks at query time, and
generates an answer. This works, but the LLM is rediscovering knowledge from
scratch on every question. There's no accumulation. Ask a subtle question
that requires synthesizing five documents, and the LLM has to find and piece
together the relevant fragments every time. Nothing is built up. NotebookLM,
ChatGPT file uploads, and most RAG systems work this way.

The idea here is different. Instead of just retrieving from raw documents at
query time, the LLM **incrementally builds and maintains a persistent wiki**
— a structured, interlinked collection of markdown files that sits between
you and the raw sources. When you add a new source, the LLM doesn't just
index it for later retrieval. It reads it, extracts the key information, and
integrates it into the existing wiki — updating entity pages, revising topic
summaries, noting where new data contradicts old claims, strengthening or
challenging the evolving synthesis. The knowledge is compiled once and then
*kept current*, not re-derived on every query.

This is the key difference: **the wiki is a persistent, compounding artifact.**
The cross-references are already there. The contradictions have already been
flagged. The synthesis already reflects everything you've read. The wiki
keeps getting richer with every source you add and every question you ask.

You never (or rarely) write the wiki yourself — the LLM writes and maintains
all of it. You're in charge of sourcing, exploration, and asking the right
questions. The LLM does all the grunt work — the summarizing, cross-referencing,
filing, and bookkeeping that makes a knowledge base actually useful over time.
In practice, I have the LLM agent open on one side and Obsidian open on the
other. The LLM makes edits based on our conversation, and I browse the
results in real time — following links, checking the graph view, reading the
updated pages. Obsidian is the IDE; the LLM is the programmer; the wiki is
the codebase.

This can apply to a lot of different contexts. A few examples:

- **Personal**: tracking your own goals, health, psychology, self-improvement
  — filing journal entries, articles, podcast notes, and building up a
  structured picture of yourself over time.
- **Research**: going deep on a topic over weeks or months — reading papers,
  articles, reports, and incrementally building a comprehensive wiki with
  an evolving thesis.
- **Reading a book**: filing each chapter as you go, building out pages for
  characters, themes, plot threads, and how they connect. By the end you
  have a rich companion wiki. Think of fan wikis like Tolkien Gateway —
  thousands of interlinked pages covering characters, places, events,
  languages, built by a community of volunteers over years. You could build
  something like that personally as you read, with the LLM doing all the
  cross-referencing and maintenance.
- **Business/team**: an internal wiki maintained by LLMs, fed by Slack
  threads, meeting transcripts, project documents, customer calls. Possibly
  with humans in the loop reviewing updates. The wiki stays current because
  the LLM does the maintenance that no one on the team wants to do.
- **Competitive analysis, due diligence, trip planning, course notes,
  hobby deep-dives** — anything where you're accumulating knowledge over
  time and want it organized rather than scattered.

## Architecture

There are three layers:

**Raw sources** — your curated collection of source documents. Articles,
papers, images, data files. These are immutable — the LLM reads from them
but never modifies them. This is your source of truth.

**The wiki** — a directory of LLM-generated markdown files. Summaries,
entity pages, concept pages, comparisons, an overview, a synthesis. The LLM
owns this layer entirely. It creates pages, updates them when new sources
arrive, maintains cross-references, and keeps everything consistent. You
read it; the LLM writes it.

**The schema** — a document (e.g. CLAUDE.md for Claude Code or AGENTS.md for
Codex) that tells the LLM how the wiki is structured, what the conventions
are, and what workflows to follow when ingesting sources, answering
questions, or maintaining the wiki. This is the key configuration file —
it's what makes the LLM a disciplined wiki maintainer rather than a generic
chatbot. You and the LLM co-evolve this over time as you figure out what
works for your domain.

## Operations

**Ingest.** You drop a new source into the raw collection and tell the LLM
to process it. An example flow: the LLM reads the source, discusses key
takeaways with you, writes a summary page in the wiki, updates the index,
updates relevant entity and concept pages across the wiki, and appends an
entry to the log. A single source might touch 10-15 wiki pages. Personally
I prefer to ingest sources one at a time and stay involved — I read the
summaries, check the updates, and guide the LLM on what to emphasize. But
you could also batch-ingest many sources at once with less supervision.
It's up to you to develop the workflow that fits your style and document
it in the schema for future sessions.

**Query.** You ask questions against the wiki. The LLM searches for
relevant pages, reads them, and synthesizes an answer with citations.
Answers can take different forms depending on the question — a markdown
page, a comparison table, a slide deck (Marp), a chart (matplotlib), a
canvas. The important insight: **good answers can be filed back into the
wiki as new pages.** A comparison you asked for, an analysis, a connection
you discovered — these are valuable and shouldn't disappear into chat
history. This way your explorations compound in the knowledge base just
like ingested sources do.

**Lint.** Periodically, ask the LLM to health-check the wiki. Look for:
contradictions between pages, stale claims that newer sources have
superseded, orphan pages with no inbound links, important concepts
mentioned but lacking their own page, missing cross-references, data gaps
that could be filled with a web search. The LLM is good at suggesting new
questions to investigate and new sources to look for. This keeps the wiki
healthy as it grows.

## Indexing and logging

Two special files help the LLM (and you) navigate the wiki as it grows.
They serve different purposes:

**index.md** is content-oriented. It's a catalog of everything in the wiki
— each page listed with a link, a one-line summary, and optionally metadata
like date or source count. Organized by category (entities, concepts,
sources, etc.). The LLM updates it on every ingest. When answering a query,
the LLM reads the index first to find relevant pages, then drills into them.
This works surprisingly well at moderate scale (~100 sources, ~hundreds of
pages) and avoids the need for embedding-based RAG infrastructure.

**log.md** is chronological. It's an append-only record of what happened
and when — ingests, queries, lint passes. A useful tip: if each entry
starts with a consistent prefix (e.g. `## [2026-04-02] ingest | Article
Title`), the log becomes parseable with simple unix tools —
`grep "^## \[" log.md | tail -5` gives you the last 5 entries. The log
gives you a timeline of the wiki's evolution and helps the LLM understand
what's been done recently.

## Optional: CLI tools

At some point you may want to build small tools that help the LLM operate
on the wiki more efficiently. A search engine over the wiki pages is the
most obvious one — at small scale the index file is enough, but as the
wiki grows you want proper search. **qmd** is a good option: it's a local
search engine for markdown files with hybrid BM25/vector search and LLM
re-ranking, all on-device. It has both a CLI (so the LLM can shell out to
it) and an MCP server (so the LLM can use it as a native tool). You could
also build something simpler yourself — the LLM can help you vibe-code a
naive search script as the need arises.

## Tips and tricks

- **Obsidian Web Clipper** is a browser extension that converts web
  articles to markdown. Very useful for quickly getting sources into your
  raw collection.
- **Download images locally.** In Obsidian Settings → Files and links, set
  "Attachment folder path" to a fixed directory (e.g. `raw/assets/`). Then
  in Settings → Hotkeys, search for "Download" to find "Download attachments
  for current file" and bind it to a hotkey (e.g. Ctrl+Shift+D). After
  clipping an article, hit the hotkey and all images get downloaded to
  local disk. This is optional but useful — it lets the LLM view and
  reference images directly instead of relying on URLs that may break.
  Note that LLMs can't natively read markdown with inline images in one
  pass — the workaround is to have the LLM read the text first, then view
  some or all of the referenced images separately to gain additional
  context. It's a bit clunky but works well enough.
- **Obsidian's graph view** is the best way to see the shape of your wiki
  — what's connected to what, which pages are hubs, which are orphans.
- **Marp** is a markdown-based slide deck format. Obsidian has a plugin
  for it. Useful for generating presentations directly from wiki content.
- **Dataview** is an Obsidian plugin that runs queries over page
  frontmatter. If your LLM adds YAML frontmatter to wiki pages (tags,
  dates, source counts), Dataview can generate dynamic tables and lists.
- The wiki is just a git repo of markdown files. You get version history,
  branching, and collaboration for free.

## Why this works

The tedious part of maintaining a knowledge base is not the reading or the
thinking — it's the bookkeeping. Updating cross-references, keeping
summaries current, noting when new data contradicts old claims, maintaining
consistency across dozens of pages. Humans abandon wikis because the
maintenance burden grows faster than the value. LLMs don't get bored,
don't forget to update a cross-reference, and can touch 15 files in one
pass. The wiki stays maintained because the cost of maintenance is near
zero.

The human's job is to curate sources, direct the analysis, ask good
questions, and think about what it all means. The LLM's job is everything
else.

The idea is related in spirit to Vannevar Bush's Memex (1945) — a personal,
curated knowledge store with associative trails between documents. Bush's
vision was closer to this than to what the web became: private, actively
curated, with the connections between documents as valuable as the
documents themselves. The part he couldn't solve was who does the
maintenance. The LLM handles that.

## Note

This document is intentionally abstract. It describes the idea, not a
specific implementation. The exact directory structure, the schema
conventions, the page formats, the tooling — all of that will depend on
your domain, your preferences, and your LLM of choice. Everything mentioned
above is optional and modular — pick what's useful, ignore what isn't. For
example: your sources might be text-only, so you don't need image handling
at all. Your wiki might be small enough that the index file is all you
need, no search engine required. You might not care about slide decks and
just want markdown pages. You might want a completely different set of
output formats. The right way to use this is to share it with your LLM
agent and work together to instantiate a version that fits your needs.
The document's only job is to communicate the pattern. Your LLM can figure
out the rest.
```

---

### 한국어 핵심 정리 (Karpathy 원문)

#### 핵심 차이 — RAG vs LLM Wiki

| 구분 | 기존 RAG | LLM Wiki |
|------|---------|----------|
| **질의 시점** | 매번 raw 문서에서 청크 검색 | 미리 정리된 위키에서 답변 |
| **지식 누적** | 없음 — 매번 처음부터 재발견 | 누적됨 — 새 소스 추가 시 위키 갱신 |
| **교차 참조** | 질의 시점에 LLM이 매번 재구성 | 미리 작성·유지됨 |
| **모순 처리** | 모순 감지 안 됨 | 새 데이터가 기존 주장과 충돌 시 플래그 |
| **종합(Synthesis)** | 매번 재합성 | 미리 합성된 결과를 갱신 |
| **사례** | NotebookLM, ChatGPT 파일 업로드 | 본 패턴 |

#### Karpathy의 실제 워크플로우

> "한쪽에는 LLM 에이전트, 다른 쪽에는 옵시디언을 켜둡니다. 대화에 따라 LLM이 편집하고, 저는 결과를 실시간으로 브라우징합니다 — 링크 따라가기, 그래프 뷰 확인, 갱신된 페이지 읽기. **옵시디언은 IDE, LLM은 프로그래머, 위키는 코드베이스.**"

#### 적용 분야 (5가지 예시)

| 분야 | 활용 예 |
|------|---------|
| **개인(Personal)** | 목표/건강/심리/자기계발 — 일기/기사/팟캐스트 노트 → 자기 자신의 구조화된 그림 |
| **연구(Research)** | 한 주제를 수주~수개월 깊이 — 논문/기사/보고서 → 진화하는 thesis 위키 |
| **독서(Reading)** | 챕터별 정리 — 등장인물/주제/플롯 페이지 → Tolkien Gateway 같은 동반 위키 |
| **비즈니스/팀** | Slack 스레드/회의록/프로젝트 문서/고객 통화 → 자동 유지 사내 위키 |
| **기타** | 경쟁 분석, 실사, 여행 계획, 강의 노트, 취미 깊이 파기 |

#### 3계층 아키텍처 (원문 정의)

| 레이어 | 정의 | 소유권 |
|--------|------|--------|
| **Raw sources** | 큐레이션된 원본 문서 (불변) — articles, papers, images, data files | 사람 |
| **The wiki** | LLM이 생성한 마크다운 파일 디렉토리 — summaries, entity pages, concept pages, comparisons, overview, synthesis | LLM |
| **The schema** | CLAUDE.md (Claude Code) 또는 AGENTS.md (Codex) — 위키 구조/관습/워크플로우 정의 | 사람+LLM 공동 진화 |

#### 3대 명령 (원문 정의)

**Ingest**: 새 소스를 raw에 떨어뜨림 → LLM이 읽고, 핵심 요약 토론, summary 페이지 작성, index 갱신, entity/concept 페이지 갱신, log 항목 추가. **단일 소스가 10-15개 wiki 페이지에 영향**.

**Query**: 위키에 질문 → LLM이 관련 페이지 검색·읽기·합성 (인용 포함). 답변 형식: 마크다운 페이지, 비교 표, Marp 슬라이드, matplotlib 차트, 캔버스. **핵심 통찰: 좋은 답변은 위키에 새 페이지로 다시 저장**되어 탐색이 누적됨.

**Lint**: 정기적 위키 건강 점검 — 페이지 간 모순, 새 소스에 의해 대체된 stale claim, 인바운드 링크 없는 orphan 페이지, 페이지가 없는 중요 개념, 누락된 교차 참조, 웹 검색으로 채울 수 있는 데이터 갭. LLM이 새 질문/소스 제안.

#### 인덱싱과 로깅 (특수 파일 2개)

**`index.md`** (콘텐츠 중심):
- 위키 전체 카탈로그 — 각 페이지 링크 + 한 줄 요약 + 메타데이터(날짜/소스 수)
- 카테고리(entities/concepts/sources)별 정리
- 매 ingest마다 LLM이 갱신
- Query 시 LLM이 먼저 index를 읽어 관련 페이지 탐색 → 임베딩 RAG 인프라 불필요
- **중간 규모(~100 소스, ~수백 페이지)에서 놀라울 정도로 잘 작동**

**`log.md`** (시간순):
- append-only 활동 기록 — ingest/query/lint
- **유용한 팁**: 일관된 prefix (`## [2026-04-02] ingest | Article Title`) → 유닉스 도구로 파싱 가능
  - `grep "^## \[" log.md | tail -5` → 최근 5개 항목

#### 선택적 도구 — qmd (CLI 검색)

- **qmd** (https://github.com/tobi/qmd): 마크다운 파일용 로컬 검색 엔진
  - BM25 + 벡터 하이브리드 검색
  - LLM 리랭킹
  - 모두 on-device
  - CLI + MCP 서버 둘 다 제공

#### Tips & Tricks (Karpathy 추천)

| 도구/팁 | 용도 |
|---------|------|
| **Obsidian Web Clipper** | 웹 기사 → 마크다운 변환 (브라우저 확장) |
| **Download Local Hotkey** | Settings → Files and links → Attachment folder path 설정 → Hotkey 바인딩 (Ctrl+Shift+D) → 클리핑 후 1키로 이미지 다운로드 |
| **Graph View** | 위키 모양 시각화 — 허브/orphan/연결 파악 |
| **Marp 플러그인** | 마크다운 기반 슬라이드 덱 생성 |
| **Dataview 플러그인** | YAML frontmatter 쿼리 → 동적 테이블/리스트 |
| **Git** | 위키는 마크다운 git repo — 버전 히스토리/브랜치/협업 무료 |

#### 왜 작동하는가 (원문)

> "지식 베이스 유지의 지루한 부분은 읽기나 사고가 아니라 **bookkeeping(기록 관리)**입니다. 교차 참조 갱신, 요약 최신화, 새 데이터가 기존 주장과 충돌함을 표시, 수십 개 페이지의 일관성 유지. 사람들이 위키를 포기하는 이유는 유지 부담이 가치보다 빨리 증가하기 때문입니다. LLM은 지루해지지 않고, 교차 참조 갱신을 잊지 않으며, **한 번에 15개 파일을 건드릴 수 있습니다.** 유지 비용이 0에 가까워서 위키가 유지됩니다."

> "**사람의 일**: 소스 큐레이션, 분석 방향 설정, 좋은 질문, 의미 사고
> **LLM의 일**: 그 외 전부."

#### 사상적 뿌리 — Memex (1945)

Vannevar Bush의 **Memex** (1945) 개념과 정신적으로 연결됨:
- 개인적·큐레이션된 지식 저장소
- 문서 간 **연관 트레일(associative trails)**
- Bush의 비전은 오늘날 웹보다 LLM Wiki에 더 가까움 (private, 능동 큐레이션, 연결의 가치)
- Bush가 못 푼 문제: **누가 유지하나?** → LLM이 해결

#### 의도적 추상성 (Karpathy 면책)

원문 마지막 문단:
- 이 문서는 **의도적으로 추상적**
- 정확한 디렉토리 구조, 스키마 관습, 페이지 형식, 도구 — 모두 도메인/선호/LLM 선택에 따라 결정
- 모두 **선택적 모듈식** — 유용한 것만 골라 쓰고 나머지는 무시
- 사용법: 이 문서를 LLM 에이전트와 공유하고, 함께 자신에게 맞는 버전을 인스턴스화

---

### 영상(편집자P) vs 원본(Karpathy) 비교

| 항목 | Karpathy 원문 | 편집자P 영상 |
|------|---------------|------------|
| **3계층 명칭** | Raw sources / Wiki / Schema | Raw / Wiki / Schema (동일) |
| **3대 명령** | Ingest / Query / Lint (동일) | Ingest / Query / Lint (동일) |
| **위키 페이지 카테고리** | summaries, entities, concepts, comparisons, overview, synthesis | sources, entities, concepts, analysis (편집자P가 시연한 4개) |
| **특수 파일** | index.md + log.md 강조 | (영상에 명시 없음) |
| **Schema 위치** | CLAUDE.md / AGENTS.md | AGENT.md (스킬화 권장) |
| **에이전트** | Codex / Claude Code / OpenCode / Pi 모두 가능 | Codex로 시연 |
| **선택 도구** | qmd (BM25+vector+rerank) | (영상에 언급 없음) |
| **Obsidian 활용** | Web Clipper, 이미지 다운로드 핫키, 그래프 뷰, Marp, Dataview | 그래프 뷰, Terminal 플러그인 |
| **명령 스킬화** | 언급 없음 (스키마/AGENTS.md에 워크플로우 기술 권장) | Codex Local Skill로 등록 권장 (영상의 추가 통찰) |

#### 영상이 원문보다 추가/강조한 부분
1. **Local Skill 등록 패턴** — `llm-wiki-ingest`, `llm-wiki-query`, `llm-wiki-lint` 스킬화 (재사용성 + AGENT.md 단축)
2. **Vault 분리 권장** — 도메인별 분리로 컨텍스트 혼잡 방지
3. **메타프롬프팅 패턴** — 위키 기반으로 적용 프롬프트 도출 → 본인 블로그 인터랙션 개선 사례
4. **옵시디언 CLI 흡수 가능성** — 향후 옵시디언이 LLM Wiki 패턴을 흡수할 것이라는 전망

#### 영상에서 빠진 부분 (원문에는 있음)
1. `index.md` / `log.md` 명시적 활용
2. Memex(1945) 사상적 배경
3. qmd 같은 CLI 검색 도구
4. Marp, Dataview, Obsidian Web Clipper 같은 보조 도구
5. 위키가 "compounding artifact"라는 핵심 표현
6. 비즈니스/팀 사용 케이스 (Slack 스레드 자동 위키화 등)

---

### 커뮤니티 구현체 (참고)

원본 gist에 영감받아 만들어진 오픈소스 구현체들:

| 레포 | 특징 |
|------|------|
| **lucasastorian/llmwiki** | Karpathy LLM Wiki spec 오픈소스 구현 (MCP 연결) |
| **Pratiyush/llm-wiki** | Claude Code/Codex/Copilot/Cursor/Gemini 세션 → 지식 베이스 |
| **toolboxmd/karpathy-wiki** | Claude Code 스킬 — 자동 유지 LLM 위키 |
| **kfchou/wiki-skills** | Claude Code용 LLM-maintained personal wiki skills |
| **NicholasSpisak/second-brain** | Obsidian용 LLM-maintained 지식 베이스 |
| **skyllwt/OmegaWiki** | "Karpathy LLM-Wiki vision, fully realized" |
| **Ss1024sS/LLM-wiki** | 원본 gist 기반 단순 구현 |

### 출처

- **Andrej Karpathy의 LLM Wiki gist (원본)**: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- 공개일: 2026-04-04
- 라이선스: 명시 없음 (gist) — "복사-붙여넣기하여 LLM 에이전트에 사용" 권장됨

---

*상세 분석 생성일: 2026-05-04*
*Karpathy 원본 추가일: 2026-05-04*
