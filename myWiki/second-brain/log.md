---
title: 위키 로그
type: log
created: 2026-04-19
updated: 2026-05-05 (K-문샷 엔티티 신설 + 문샷 폴더 + Memory MCP 첫 활용)
---

# Second Brain 위키 로그

## [2026-05-05] ingest | K-문샷 (한국 정부 거대 R&D) 엔티티 신설 — 영업전략 정부지원 연계 핵심 추가
- 참조: [[k-문샷]], [[영업전략]], [[uttec-edu]], [[스마트팩토리]], [[ai-direction]]
- 내용: 2026-03-11 출범한 한국 K-Moonshot R&D 프로그램을 entity로 정리. 거버넌스(MSIT 배경훈 부총리, 161개 기업), 예산(2026 AI 10.1조, +206% YoY, R&D/GDP 5.2% 세계 2위), 12대 국가미션(2035 목표), AI Co-Scientist 6대 분야(2027~31, 4,640억) 종합. UTTEC 직접 응모는 비현실적이지만 간접 진입 경로 5종 도출(하위 발주 / AI Co-Scientist 도입 컨설팅 / 휴머노이드 양산 인프라 / AI 가속기 검증 / 인재양성 정부조달).
- 산출물:
  - `myWiki/second-brain/entities/k-문샷.md` (entity 신설)
  - `문샷/` 폴더 신설 + `UTTEC_액션플랜.md` (간접 진입 5경로 상세 + 즉시 액션 4건)
- 핵심 결론: **인재양성 미션 #10 (2만 명 AI 전문가)이 uttec-edu 13가이드·5 Track 영상과 직접 매칭**. AI Co-Scientist 출시(2027~) 대비 영업 메시지 사전 준비 — "K-문샷이 만든 AI를 1/100 가격에 도입시켜드립니다"는 3.5-Stage 패키지와 정확히 맞물림.
- 다음 액션: NTIS 회원가입 + K-문샷 키워드 알림 / 미션 #10 정부조달 응모 가능성 조사 / 휴머노이드 양산 발주처 조사

## [2026-05-05] init | Memory MCP 첫 활용 — 시드 지식 그래프 12 entities + 20 relations 구축
- 참조: [[Memory MCP]], [[3.5-Stage 패키지]], [[Foundry 5층 아키텍처]], [[claude-code]], [[스마트팩토리]]
- 내용: 어제(05-05 오후) 설치한 Memory MCP를 실제 사용. 12개 핵심 비즈니스 엔티티를 시드로 생성(UTTEC, 이형근, 3.5-Stage 패키지, 스마트팩토리, uttec-edu, 한국기계, 태명과학, n8n, revita 서버, Memory MCP, Obsidian myWiki, Foundry 5층 아키텍처) + 관계 20건(운영한다/사업라인이다/도구로포함한다/고객후보다/Stage1_2시범견적후보다 등). read_graph·create_entities·create_relations·open_nodes·search_nodes 모두 정상 동작 확인.
- 주요 발견:
  1. **search_nodes 패턴**: 단일 키워드는 정상, 다중 단어는 AND 매칭 (모든 단어 포함 필요). 한글 entityType("고객후보")로 검색 시 빈 결과 — 영문 entityType("customer-prospect") 일관 사용 권장 또는 observation 본문에 한글 키워드 포함.
  2. **영구 저장 이슈 발견·해결**: `.claude.json` MCP env 블록이 `{}`로 비어있어 MEMORY_FILE_PATH가 서버에 전달되지 않음. 데이터가 메모리에만 있고 디스크 미저장 상태였음. 수정 후 `C:\todo\today\myWiki\ontology\memory.json`에 시드 JSONL 12+20행 직접 배치 → 다음 Claude Code 재시작 시 자동 로드됨.
- 산출물:
  - `myWiki/ontology/memory.json` (시드 파일, JSONL 형식)
  - `myWiki/ontology/memory_seed_2026-05-05.jsonl` (백업)
  - `~/.claude.json` (env 블록 수정: MEMORY_FILE_PATH 추가)
  - `~/.claude/projects/C--todo-today/memory/reference_memory_mcp.md` (검증 결과 + 검색 노하우 갱신)
- 핵심 결론: **Memory MCP가 영업 컨텍스트의 "AI용 백본"** 역할 가능성 입증 — Obsidian이 사람용 1차 저장소면, Memory MCP는 AI가 즉시 쿼리 가능한 구조화 그래프. 다음 단계는 **위시캣 신규 검토 결과를 entities로 자동 누적**하는 워크플로우 구축(n8n 첫 워크플로우와 결합 가능).
- 다음 액션: (1) Claude Code 재시작 후 read_graph로 시드 12 entities 로드 확인 (2) 위시캣 #155041~#155060 검토 시 발주사를 customer-prospect entity로 자동 추가 (3) entities/.md frontmatter `links:` 필드를 Memory MCP relations로 일괄 마이그레이션 검토

## [2026-05-05] thought | Pipeline Builder 적용 검토 — 직접 구현 ❌, n8n + Obsidian + Claude로 같은 가치 1/100 비용
- 참조: [[스마트팩토리]], [[ai-direction]], [[영업전략]], [[claude-code]]
- 내용: 팔란티어 파운드리 #2 학습의 자연스러운 후속 질문 — Pipeline Builder를 우리가 구현할 수 있나? 3가지 야망 수준에서 평가. (1) 1:1 클론은 수십억 달러·20년·수천 엔지니어 규모로 불가능. (2) Lite 자체구현은 4~8주로 가능하지만 동일 도구 5개+ 무료 존재로 Not Invented Here 함정. (3) 철학을 본인 도구 스택에 적용은 이미 80% 완료 — 빠진 건 시각 UI 한 가지뿐. 시각 UI는 직접 만들지 말고 n8n(오픈소스, 노드 400+, AI 노드 포함, Self-host) 활용 권장.
- 산출물: smartFactory/업무효율화/참고/Pipeline_Builder_적용_검토.md (8섹션, frontmatter 포함)
- 핵심 결론: **Pipeline Builder를 만드는 게 아니라, Pipeline Builder가 풀려는 문제(사일로 해체 + 비코더 협업 + AI 통합)를 우리 도구 스택(n8n + Obsidian + Claude)으로 1/100 비용에 해결하는 컨설팅** — 이게 영업 무기.
- 사업 적용: 3-Stage 패키지에 n8n 시각 워크플로우 구축 추가 → Stage 2 가격 1,500만 → **2,500만** (가치 1.7배). 총 4,300만 → **5,300만**. n8n 추가 가치 = 비코더 인계 후 자립 + 의사결정자에게 시각 설명 + 자체 호스팅으로 대기업 보안 대응. 첫 시범 견적: 태명과학 또는 한국기계에 Stage 1+2 통합 ~2,800만.
- 다음 액션: n8n 환경 구축(revita 서버) → 태명과학 데이터로 워크플로우 1개 → 5분 데모 영상(Remotion + n8n 캡처) → 견적서 항목 추가

## [2026-05-05] ingest | AI 도구 13종 5 Track 소개 영상 제작 완료 — Remotion + edge-tts 9씬, 5분 53초
- 참조: [[aiStudy]], [[remotion-project]], [[uttec-edu]], [[claude-code]]
- 내용: 어제 작성한 시나리오_AI교육_소개동영상.md를 Remotion 코드로 구현. edge-tts(ko-KR-InJoonNeural 남성 차분한 톤)로 9개 씬 내레이션 mp3 생성, 실제 오디오 길이 측정 후 씬 duration 정확히 매핑. 9 Scene 컴포넌트 작성 — Hook(문제 제기) → 5 Track 솔루션 → Track A 즉시 효용 3종 → Track B Claude 확장 → Track C 인프라 → Track D 협업 → Track E 콘텐츠/클라우드 → Before/After 사례 → CTA. 5 Track 컬러 시스템(보라/초록/파랑/분홍/청록), 13 도구 ToolBadge 재사용 컴포넌트, 씬별 데모(터미널·Obsidian Graph·VS Code·MCP 방사형·Tailscale 메시·Slack 알림·Before/After).
- 산출물:
  - remotion-project/src/AIToolsIntroVideo.tsx (9 Scene 컴포넌트, 1500+ 줄)
  - remotion-project/src/Root.tsx (Composition 등록)
  - remotion-project/scripts/intro-tools-video/ (9 .txt + generate-tts.py + measure-audio.py)
  - remotion-project/public/audio/intro-tools/ (9 mp3 파일)
  - remotion-project/out/AIToolsIntro/AI도구_5Track_소개영상.mp4 (63.5 MB, 1920×1080, 30fps)
- 특이사항: 시나리오 7분(420초) 계획 → 실제 5분 53초(353초)로 자연스러운 페이스. UTTEC-Lab 로고 좌측 상단 항상 표시. 영상 자체에 "이 영상도 Remotion으로 제작" 메타 강조 포함. 3-Stage 패키지 Stage 1 교육 자료의 핵심 무기 확보 — 영업 미팅·정부지원 입찰·온보딩 모두 활용 가능.

## [2026-05-04] ingest | AI 교육 패키지 마무리 — 13가이드 옵션 B 재편성 + 동영상 시나리오 + 강사용 마스터 가이드
- 참조: [[uttec-edu]], [[aiStudy]], [[claude-code]], [[remotion-project]]
- 내용: aiStudy/introductionAi의 13개 가이드를 학습 곡선 우선(옵션 B) 순서로 재편성. 5 Track 재정의(A: Claude+Obsidian+VSCode 즉시 효용 / B: Skill+MCP / C: GitHub+SSH+Tailscale / D: Slack / E: Colab+NotebookLM+Remotion+AWS). git mv로 12개 파일 rename, 00_목차·HTML Deep Dive 13카드·CTA·Track 섹션·각 가이드 "다음 단계" 링크 모두 일관되게 갱신.
- 산출물:
  - 시나리오_AI교육_소개동영상.md — 7분 영상 9씬 시나리오 (Remotion 제작용, TTS·BGM·자막 가이드 포함)
  - 교육_전체_설명서.md — 강사용 마스터 가이드 (3·5·7일 옵션, 13개 모듈 상세, 검증 체크리스트, 트러블슈팅, FAQ)
- 핵심 결론: **단일 도구(Obsidian+Claude) 체제를 유지하면서 교육 콘텐츠 일관성 확보**. 본 자료가 보완의견의 "Stage 1 AI 도구 교육"(3-Stage 패키지의 첫 단계)의 실행 자료가 됨. 정부지원 교육·기업 사내 교육·1인 사업자 학습용으로 즉시 활용 가능.
- 사업 적용: 태명과학·한국기계 등 기존 simulation 4개 wiki에 본 교육 패키지를 결합하면 4,000-5,000만원/건의 통합 패키지 영업 가능

## [2026-05-04] thought | 보완의견 — 교육 사업화 + web 앱 액션 점진추가로 약점이 강점이 됨
- 참조: [[스마트팩토리]], [[ai-direction]], [[uttec-edu]], [[aiStudy]]
- 내용: 오전 작성한 도구 적합성 검토(Obsidian+Claude 약점 진단)를 본인이 보완·반박. UTTEC이 이미 보유한 자산(AI_도구_가이드.html 60KB + demo_live.html 4종)을 사업 모델에 통합하면 약점이 강점으로 전환됨. (1) "고객사 인계 부적합" → 교육 사업화로 학습 곡선 자체가 매출이 됨, (2) "액션 불가능" → demo_live.html에 액션 Lv1~4 점진 추가
- 산출물: smartFactory/업무효율화/참고/Obsidian_Claude_적합성_보완의견.md
- 핵심 결론: **3-Stage 패키지(교육→위키 공동구축→web앱+액션) = 4,000-5,000만원/건**. 단일 도구 체제 유지 + 다층 가치 추가. 어제 권한 도구 전환(Obsidian→ChatGPT GPT→RAG)은 1인/소규모 또는 대기업에만 적용. 5인+ 중소기업 고객은 본 패키지가 우월.
- 사업 적용: 태명과학 또는 한국기계 1개사에 시범 견적 제안. AI_도구_가이드.html 3일 커리큘럼화. wiki→web앱 자동 빌드 스크립트 PoC가 핵심 차별점

## [2026-05-04] thought | 도구 적합성 검토 — Obsidian+Claude는 큐레이션 도구이지 배포 도구가 아님
- 참조: [[스마트팩토리]], [[ai-direction]], [[claude-code]]
- 내용: 어제 도출한 "위키 구조 = 목적·사용자·데이터의 함수" 원칙의 자연스러운 후속 질문 — 만약 simulation wiki가 myWiki와 본질적으로 다른 구조라면, Obsidian+Claude 조합 자체가 중소기업 업무효율화에 최선인가? 8개 대안 도구(Notion AI, ChatGPT GPT, Claude Projects, Copilot Studio, Dify, RAG 직접구축, Palantir Foundry) 비교 후 4단계 로드맵 제시.
- 산출물: smartFactory/업무효율화/참고/Obsidian_Claude_적합성_검토.md
- 핵심 결론: **Obsidian+Claude는 '제작 도구'이지 '배포 도구'가 아님**. 단계별 도구 분업이 정답 — (1)큐레이션 단계: Obsidian (현재 최선) → (2)시연 단계: 동일 → (3)고객 인계 단계: ChatGPT GPT/Notion → (4)운영 앱 단계: RAG/Dify로 진화. 마크다운 자산은 모든 다음 도구의 출발점이 되므로 락인 없음.
- 사업 적용: Phase 2(3-6개월)에 태명과학 Vault를 ChatGPT GPT로 1차 변환 + 1개 고객사 시범 운영 → Phase 3(6-12개월)에 RAG 운영 앱화 + 유료 구축 사업 (1건당 500-1,500만원)

## [2026-05-04] lint | 첫 정원사 사이클 실행 — Karpathy LLM Wiki 패턴 적용 완료
- 참조: [[skills]], [[claude-code]]
- 내용: myWiki second-brain에 Karpathy LLM Wiki "정원사 사이클" 패턴 도입. wiki-lint skill 신규 작성, wiki-query skill 신규 작성, work-end skill에 자동 lint 통합 (5-C 섹션). 첫 lint 실행에서 23건 이슈 발견 → 자동 fix 스크립트로 21개 entities/thoughts 파일에 frontmatter `links:` 필드 자동 추가. lint script에 index/log/dashboard 메타 페이지 예외 처리 추가. 최종 0 이슈 상태 달성.
- 산출물: .claude/skills/wiki-lint/SKILL.md, .claude/skills/wiki-query/SKILL.md, myWiki/second-brain/.lint-script.ps1, .lint-fix.ps1, work-end SKILL.md 5-C 섹션
- 특이사항: 정원사 사이클이 매 work-end마다 자동 실행되어 위키 건강 상태가 지속적으로 유지됨. 향후 STALE 임계값(30일) 조정 가능. wiki-query는 Grep 기반이지만 향후 그래프 탐색 강화 여지 있음

## [2026-05-04] ingest | 팔란티어 파운드리 시리즈 #3 학습 — Ontology Manager + Action 개념 + 4단계 End-to-End
- 참조: [[스마트팩토리]], [[ai-landscape]], [[ai-direction]]
- 내용: Kelly Ontology Hub 채널 #온톨로지매니저 #End-to-End #workshop 영상 학습 (시리즈 #3 자리). 오피스굿즈+뷰로SAS M&A 시나리오로 파운드리 4단계(수집→통합→온톨로지→운영앱)를 압축 시연. 핵심 통찰: **분석 툴 vs 운영 앱의 결정적 차이는 '액션(동사)' 개념**. 객체(명사)+액션(동사)=클릭 한 번으로 디지털 세상 변경.
- 산출물: 유투브/04_AI_이론/팔란티어_파운드리_3_OntologyManager_End-to-End_상세.md, #0/#1/#2 파일 시리즈 링크 갱신, 스마트팩토리.md "팔란티어 학습 5가지 적용 인사이트" 섹션 신설
- 특이사항: 시리즈 #3 명시 영상은 채널 미공개 → 가장 직접적인 후속작(qCn5aCLA9TY) 사용. "진짜_최종_V3 끝" 비유는 온톨로지 가치 마케팅 카피로 즉시 재사용 가능. 우리 디지털 트윈/스마트팩토리 영업 자료에 5가지 개념 직접 활용 가능

## [2026-05-04] thought | 위키 아키텍처 판단 원칙 도출 — 자기 이해형 vs 도메인 룩업형
- 참조: [[claude-code]], [[skills]], [[projects]], [[스마트팩토리]]
- 내용: simulation 예제(태명과학/한국기계)가 Karpathy LLM Wiki 패턴을 따르지 않는 이유 분석. 두 위키의 목적·사용자·데이터 성격이 본질적으로 다르며, Karpathy 패턴(Raw/Wiki/Schema + log + thoughts + identity)을 강제 적용하면 죽은 파일·중복 보관·환각 위험 발생.
- 산출물: 작업보고서/checkFile/simulation_구조차이_이유.md
- 판단 원칙: **위키 구조는 목적·사용자·데이터 성격의 함수다.** 자기 이해형 위키(개인 second brain) → Karpathy 패턴, 도메인 룩업형 위키(고객사 컨설팅 봇) → 도메인 카테고리 + 호환 매트릭스 + Dataview. simulation의 CLAUDE.md는 "스키마"가 아니라 "AI 페르소나 정의서" 역할.
- 특이사항: 향후 새 도메인 위키 제작 시 참고 가이드. simulation 제작 경험·인사이트는 second-brain의 thoughts/, projects.md에 ingest 되어야 두 위키가 분리되면서도 연결됨.

## [2026-05-04] ingest | LLM Wiki 패턴 학습 + 유투브 자료 카테고리 정리
- 참조: [[claude-code]], [[skills]], [[ai-landscape]]
- 내용: Andrej Karpathy의 LLM Wiki 패턴(Raw/Wiki/Schema + Ingest/Query/Lint) 영상 2편 + gist 원본 학습. 유투브 폴더 11개 파일을 4개 카테고리(LLM위키_지식관리/클로드_활용/AI_영상제작/AI_이론)로 분류. /yt-summary skill을 상세본 전용으로 단순화. 5개 영상 상세본 신규 생성 + Karpathy gist 한글 번역
- 산출물: 유투브/01~04 폴더 구조, 5개 상세본 md, llm-wiki-ko.md, .claude/skills/yt-summary/SKILL.md 단순화
- 특이사항: LLM Wiki의 "정원사 비유"가 myWiki second-brain의 lint/ingest 사이클과 정확히 일치 — 향후 second-brain에도 동일 패턴 적용 검토

## [2026-05-04] ingest | 팔란티어 파운드리 아키텍처 시리즈 학습 (#0/#1/#2)
- 참조: [[ai-landscape]], [[스마트팩토리]], [[ai-direction]]
- 내용: Kelly Ontology Hub 채널 팔란티어 파운드리 시리즈 3편 학습. 5층 아키텍처(Core→Data Connection→Ontology→Analysis→Application), Closed Feedback Loop, Hyperauto(SAP 통합 2개월→8시간), Writeback(양방향), Pipeline Builder(코더+비코더 협업 + AI 통합 + 온톨로지 직접 연결)
- 산출물: 유투브/04_AI_이론/팔란티어_파운드리_*.md (3편)
- 특이사항: 스마트팩토리 사업 영역에 직접 연결 — 온톨로지 + 디지털 트윈 + Operational Feedback Loop 개념을 자체 제안서/교육에 활용 가능. 다음 편(#3) Ontology Manager 예정

## [2026-05-03] ingest | AI 업무효율화 base tool 교육 가이드 13종 + 통합 HTML 제작
- 참조: [[aiStudy]], [[claude-code]], [[skill-자동화]], [[tailscale네트워크]]
- 내용: 초보자 대상 AI 도구 설치/사용 가이드 13종(MD) + 통합 HTML. 5 Track 체계(AI환경/인프라/콘텐츠/개발환경/팀협업). 기존 AI_도구_활용_가이드.md + myWiki 분석하여 누락 도구(Obsidian, Tailscale, VS Code, Slack) 식별 후 추가
- 산출물: aiStudy/introductionAi/ 01~13 MD + AI_도구_가이드.html + 00_목차.md
- 특이사항: 도구 간 상호 연결 관계를 아키텍처 맵 + 시나리오 7개로 시각화

## [2026-05-03] ingest | AI 공장자동화 교육자료 8종 제작 (8일 커리큘럼 + 포트맵 + LoRa + 동영상)
- 참조: [[aiHardStudy]], [[스마트팩토리]], [[uttec-edu]]
- 내용: RPi 3B+ + UTTEC Shield 기반 8일(32시간) 교육 커리큘럼, 보드 포트맵(port_map.py), E22-900T30D LoRa 매뉴얼 확보, TX/RX 크로스 연결 분석, 구현가능 기능 10개 카테고리 정리, 동영상 시나리오(5분30초 8씬) + 내레이션 대사 + 슬라이드용 설명자료
- 산출물: 교육자료/8일_교육커리큘럼.md, port_map.py, 구현가능_기능목록.md, 동영상_시나리오.md, 동영상_대사.md, 커리큘럼_설명자료.md, E22-900T30D_Manual.pdf
- 특이사항: RPi 3B+ UART/Bluetooth 충돌 이슈 문서화 (dtoverlay=miniuart-bt 필수)

## [2026-05-03] ingest | UTTEC 사업분야 종합 정리
- 참조: [[영업전략]], [[goals]], [[projects]], [[ai-direction]], [[strengths]]
- 내용: myWiki 전체(me, goals, projects, 영업전략, ai-direction, strengths, gaps, 위시캣활동, 스마트팩토리) 분석하여 UTTEC 사업분야 종합 문서 작성. AI 3대 사업(교육/스마트팩토리/제품) + 프리랜서 캐시카우, 정부지원 연계, 채널별 전략, 우선순위 액션 포함
- 산출물: 영업/UTTEC_사업분야_종합.md

## [2026-05-03] ingest | TwinCAT 서비스 비활성화 + 위시캣 검토
- 참조: [[projects]], [[위시캣활동]]
- 내용: Beckhoff TwinCAT 서비스 6개 Disabled 처리 + 관리 문서 작성. 위시캣 #154982~#155023 검토 (공개 7건 중 적합 0, 검토필요 1건 #154940 밸브/엑츄에이터)
- 산출물: twinCat/TwinCAT_서비스_관리.md, disable_twincat.ps1, 위시캣/2026-05/가능프로젝트/2026-05-03_가능프로젝트.md

## [2026-05-01] ingest | 약국+한의원 Wiki+데모 구축
- 참조: [[projects]], [[스마트팩토리]]
- 내용: 약국 Wiki 29파일(의약품DB/상호작용/DUR/보험) + 한의원 Wiki 24파일(처방/약재/경혈/체질/변증) + 각 전과정 설명서 + demo 웹 4종. 태명과학/한국기계 DB 테이블 엑셀 생성
- 산출물: 업무효율화/약국/(31파일), 업무효율화/한의원/(27파일), 태명과학/db/(7파일), 한국기계/db/(10파일)

## [2026-05-01] ingest | 업무효율화 데모 웹 제작 (태명과학 + 한국기계)
- 참조: [[projects]], [[스마트팩토리]]
- 내용: 태명과학(FRITSCH 장비) 데모 웹 2종 + 한국기계(분쇄장비) 데모 웹 2종 제작. 고정결과 버전 + 실시간 로직 버전. 한국기계 조달/외주 Wiki 데이터(BOM, 구매품, 외주가공, 간트차트) 추가
- 산출물: 태명과학/demo.html, demo_live.html, 한국기계/demo.html, demo_live.html, 조달/ 폴더

## [2026-05-01] ingest | 출석체크 인증 시스템 구축
- 참조: [[projects]], [[aiHardStudy]]
- 내용: Claude 접속 제어 웹 시스템 구축 (Flask 서버 + Pi Hook + uttecEdu 명령 + 교육 만료 자동 삭제)
- 산출물: aiHardStudy/중소기업교육/출석체크/ (app.py, 사용설명서.html 등 6파일)

## [2026-04-30] ingest | 중소기업교육 커리큘럼 작성 + Shield 포트 연결 정리
- 참조: [[aiHardStudy]], [[스마트팩토리]]
- 내용: 용인 중소기업진흥원 대면교육 커리큘럼 (3h x 5회 = 15시간), Shield CN1 40핀 핀맵 문서화, Claude 설치/삭제 가이드
- 산출물: aiHardStudy/중소기업교육/교육자료/, Claude_설치_및_삭제_가이드.md

## [2026-04-29] ingest | 업무효율화 시뮬레이션 Wiki 2종 구축 (한국기계 31파일 + 태명과학 48파일)
- 참조: [[스마트팩토리]]
- 내용: Obsidian+Claude 업무효율화 대상업종 28개 도출, 한국기계/태명과학 시뮬레이션 Wiki 구축
- 산출물: smartFactory/업무효율화/ (대상업종_리스트 + 한국기계/ + 태명과학/)

## [2026-04-28] ingest | 중소기업육성회 Pi 공장자동화+AI 교육 커리큘럼 작성
- 반영: [[projects]] — 신규 프로젝트 추가
- 핵심: 대면(5일 30h) / 원격(8주 32h) 2안, Pi4B+자체Shield+Camera 키트, AI(이상탐지+비전+API) 포함
- uttec Pi(192.168.1.27) 한글 입력 환경 설정 (fcitx+hangul)

## [2026-04-28] ingest | 한국기계/태명과학 AI 업무효율화 계획서 완성
- 반영: [[projects]] — 스마트팩토리 데모/영업에 2개 계획서 추가
- 핵심: Obsidian+Claude+Notion 기반 업무 지원 플랫폼 설계, 각 md+html+pdf 3종 생성
- 태명과학 차별점: 부속품 호환성 매트릭스 DB, 재질 의사결정 트리, 입도분석 자동 해석

## [2026-04-28] ingest | C6-LCD 사전빌드 105개 완성
- 반영: [[projects]] — C6-LCD 상태 업데이트 (105개 빌드+SDLOAD 파이프라인 완성)
- 핵심: SD 카드 SDLOAD 방식으로 서버 없이 교육 가능, BLE 콜백 스택 오버플로우 해결

## [2026-04-28] ingest | multiCore Claude 교육 시스템 위키 등록
- 참조: [[multiCore]], [[projects]], [[skills]]
- Odroid C2 서버(100.89.56.69) 실환경 검증 결과 정리
- 상세 문서 9개: 서버환경, 학생계정, 웹서버, SSH 가이드, 인증, 코어할당, 검증결과, 갭분석, 비밀번호관리
- 핵심 교훈: Claude TUI는 SSH만 가능, .claude.json 독립 필수, OAuth 동시 불안정
- raw/multiCore junction 생성

## [2026-04-27] lost | 위시캣 #154780 무산 — 가격 불일치
- 참조: [[위시캣활동]]
- PVDF 층간소음 MVP, 매칭률 100%, 미팅+계획서까지 진행했으나 가격 협상 결렬
- 교훈: 소규모 MVP(1,000만원)는 클라이언트 가격 기대치가 낮을 수 있음

## [2026-04-27] ingest | 위시캣 #154889 지원
- 참조: [[위시캣활동]], [[experience]]
- 소각장 멀티모달 화재 탐지 AI SW (2,000만원/60일)
- Jetson Orin + TensorRT + Modbus/GPIO — AI 모델 개발 핵심, 산업 인터페이스 강점 부각
- 매칭 8항목 중 O:4 △:4, 솔직한 갭 분석 포함

## [2026-04-27] ingest | CC1101 리모콘 데모 프로젝트 완성
- 참조: [[revita]], [[skills]]
- revita 서버 /home/uttec/revita/remocon/ 에 Zephyr 프로젝트 구축
- pca10056 2대 + CC1101 HW-863 2개 → 433.92MHz 무선 버튼→LED 토글 데모
- SPI pinctrl 오버라이드로 pinmap.md 배선 그대로 사용 (DTS 기본 핀과 다름)
- CC1101 커스텀 SPI 드라이버 작성 (Zephyr 공식 미지원)
- Windows nrfjprog 원격 플래시 워크플로우 확립

## [2026-04-25] use | 삼환 제안서 전면 재작성 — 전기차 충전 안전관리 추가
- 참조: [[revita]], [[양산제품]], [[위시캣활동]]
- 판단: 조명제어만으로는 가격 경쟁에 불리 → 전기차 충전소 안전관리를 결합하여 차별화
- 5중 감시(열화상/전류/가스/연기/환경) + 3단계 자동 대응 + 스마트 전력관리
- 핵심 메시지: 조명+EV안전을 하나의 LoRa 무선 플랫폼으로 통합 (경쟁사 대비 유일)
- 결과: 제안서 MD + 시스템구성도 HTML + 프레젠테이션 HTML + PDF 2종 생성

## [2026-04-25] market | 위시캣 #154809 TI C2000 검토 → 불가 확정
- 참조: [[위시캣활동]]
- TI C2000 기반 AE iHP 국산화 (2.3억/548일) — 기술 매칭 높으나 규모/부담 과대
- 위시캣 지원 4건 추적: #154763, #154800, #154806 미팅대기, #154780 계약대기

## [2026-04-24] use | PVDF 층간소음 경고 시스템 개발계획서 제출
- 참조: [[위시캣활동]], [[experience]], [[skills]]
- 판단: PVDF 미팅 결과 → 아이 뛰기 충격 감지 경고 시스템으로 구체화
- Charge Amplifier + ESP32 + FreeRTOS 설계, 45일 일정
- 결과: 클라이언트에게 계획서 PDF 제출 완료, 계약 대기

## [2026-04-24] ingest | 초등학교 AI 바이브코딩 교육 준비
- 참조: [[사전빌드]], [[experience]]
- 5월부터 초등 4/5/6학년 대상 주 1회 교육 가능성
- 사전빌드 155개 예제 기반 8주 교안 + AI교육 이력서 작성
- 교육 사업 확장의 첫 실전 기회

## [2026-04-23] use | 삼환 아파트 조명제어 시스템 제안서 작성
- 참조: [[revita]], [[회사소개]], [[양산제품]], [[위시캣활동]]
- 판단: REVITA RAK4630 기술을 아파트 조명제어로 확장 적용
- UTTEC 조명 납품 이력(골프장, 하나금융, 일본 3,800대)과 LoRa 기술 결합
- 결과: 삼환제안서/ 폴더에 제안서 + 시스템 구성도 생성

## [2026-04-23] market | 위시캣 #154780 PVDF 미팅 확정
- 참조: [[위시캣활동]]
- 클라이언트: 임수정 (matmall), 안산 POST-BI센터
- 미팅: 2026-04-24(금) 16:00~16:50 대면
- 의미: 지원 당일 미팅 확정 — 매칭률 100% (9/9)가 속도에 영향

## [2026-04-23] update | 위시캣 4건 지원 + wiki 연계 체계 구축
- 위시캣활동.md: 4건 지원 이력 추가 (#154780, #154806, #154800, #154763)
- experience.md: 4월 활동에 위시캣 4건 지원 + BLE Mesh 부각 기록
- /wishket-apply 스킬 개선: wiki 참고(영업전략, 회사소개, 위시캣활동) + wiki 업데이트 절차 추가
- 교훈: 지원서 작성 시 wiki 영업전략/회사소개의 수출 실적, 사업 방향을 반드시 반영해야 함

## [2026-04-22] thought | 사업 전환 선언 — LED→AI 3대 사업
- thoughts/2026-04-22_사업전환-AI시대.md 작성 — 전환 배경, 3대 사업 정의, 복리 인사이트, 리스크
- ai-direction.md 재정의: 사업 전환 선언 + 판단 로그 4건 추가 + 전략적 방향 재작성
- goals.md 장기 비전 3대 사업으로 교체, 핵심 질문 업데이트
- 영업전략.md: 신규 AI 3대 사업 추가, 기존 사업은 "참고용" 분류
- me.md: 사업가 섹션 전면 개편

## [2026-04-22] ingest | 회사소개서 수집 + 회사 엔티티 생성
- raw/회사소개 → homepage/회사소개 junction 연결
- entities/회사소개.md 신규 생성: 연혁(2016~2023), 인증(KC/TELEC/CE), 특허(한일), 납품처 8곳, 기술 진화 스토리
- 회사소개서(2024.10) PDF 18페이지 분석 반영

## [2026-04-22] update | 위키 목적 체계 확장 (3→6 목적)
- CLAUDE.md 목적을 3개 → 6개로 확장: 내부 역량(자기 이해, 개선점 도출) + 외부 환경(시장 이해, 사업 성과 추적) + 의사결정(방향 판단, 복리 성장)
- 해석 워크플로우에 고객/매출/경쟁 재료 추가
- 활용 로그에 revenue/lost/market 카테고리 추가
- 사업 방향 판단 프레임워크 5개 질문 추가
- 페이지 업데이트 주기에 시장/고객/경쟁 엔티티 트리거 추가

## [2026-04-22] ingest | revitaProject junction 추가
- raw/revitaProject → C:\todo\revitaProject junction 연결
- revita.md 엔티티에 revitaProject 코드베이스 정보 통합 (별도 엔티티 불필요)

## [2026-04-22] ingest | 미반영 폴더 10개 일괄 수집 + 엔티티 생성
- raw/ junction 10개 추가: aiStudy, remotion-project, 유투브, 동영상, ffmpeg, figma, gsd, skill, nlm, 전시회
- 신규 엔티티 10개: aiStudy, remotion-project, 유투브, 동영상, ffmpeg, figma, gsd, skill-자동화, nlm, 전시회
- ubuntu-s-2vcpu-4gb-sgp1-01은 서버인프라 엔티티에 통합, pem은 제외 (민감 데이터)
- CLAUDE.md에 반자동 엔티티 감지 규칙 + raw/ 추가 체크리스트 추가
- root 폴더 전수 대조 → 미반영 0건 달성

## [2026-04-22] update | P1~P9 Wiki 개선 전체 완료
- experience.md: 4/20~4/22 활동 9개 항목 추가
- 서버인프라.md: 5대 서버 전수 조사 결과 반영, 요약 테이블 추가
- tailscale네트워크.md: IP 오류 수정, 3대 추가, 용도 컬럼
- goals.md: 단기 +4, 중기 +2, 완료 목표 6건, 핵심 질문 +1
- dashboard.md: dataview 대시보드 신규 생성 (6개 쿼리)
- raw/: webServer, 응원봉 junction 추가, CLAUDE.md 구조 업데이트
- Notion 연동 설계 완료 (Obsidian=원본, Notion=모바일 창구)
- obsidian-git 확인: data.json 없음, 자동 백업 미설정 상태

## [2026-04-22] thought | Wiki 운영 3일차 소감
- thoughts/2026-04-22_wiki-운영-소감.md: 유지 습관, Lint 한계(교차검증), 프로젝트 분리, 작업보고서 이원화, Claude+Obsidian 조합
- index.md: 새 thought 페이지 등록

## [2026-04-22] lint | Wiki 정합성 첫 점검
- Lint 전 항목 PASS (A+): 깨진 링크 0, 고아 0, 모순 0, 프론트매터 정상
- experience.md: 4/20~4/22 활동 반영 (9개 항목 추가)
- Wiki 작업보고서 체계 신설 (myWiki/작업보고서/날짜별/)
- /wiki-log Skill 생성, /work-end wiki 마무리 기능 추가

## [2026-04-19] update | Claude Design 발견 + Figma MCP 판단
- ai-landscape.md: Claude Design (2026-04-17, Opus 4.7) 추가
- ai-direction.md: 판단 로그 2건 (Claude Design 발견, Figma 학습 보류)
- gaps.md: 프론트엔드 디자인 갭 해결 방안 업데이트

## [2026-04-19] entity | Notion 연동 + 위시캣 수주 반영
- thoughts/2026-04-19_notion-연계.md: Notion 역할 분담 계획
- thoughts/2026-04-19_notion-data.md: Notion 첫 수집 + RPi Claude 아이디어
- 위시캣활동.md: #153090 스마트팜 수주 성공 추가 (주3회, 월500만)
- projects.md, gaps.md: 수주 정보 반영

## [2026-04-19] ingest | 10개 프로젝트 폴더 수집
- raw/ junction 10개 추가: 충전기, ai-education-web, aiHardStudy, cuda, doctor, homepage, revita, smartFactory, tailscale, xerix
- 신규 엔티티 7개: 충전기, 의료AI, cuda교육, tailscale네트워크, uttec-homepage, ai-education-web, aiHardStudy
- 기존 엔티티 3개 보강: revita (Zephyr 아키텍처), xerix (상세 기술), 스마트팩토리 (코드베이스)

## [2026-04-19] ingest | 영업 + 외벽로봇 자료 수집
- raw/영업, raw/외벽로봇 junction 링크 생성
- 영업 자료 5건 분석: 교육 SaaS, 스마트팩토리, 영업관리 마케팅 계획서
- 외벽로봇 자료 3건 분석: 컨셉 분석, 개선 설계, ESP32 모바일 리서치
- entities/영업전략.md, entities/외벽로봇.md 생성

## [2026-04-19] entity | 엔티티 페이지 11개 생성
- 사전빌드, python-vibe, uttec-edu, claude-code, ai-fanstick
- xerix, revita, 위시캣활동, 스마트팩토리, 양산제품, 서버인프라
- 각 엔티티가 핵심 위키 페이지들과 상호 연결 (총 60개+ 링크 추가)
- 인덱스 업데이트

## [2026-04-19] ingest | 작업보고서 전체 수집 (2025-12 ~ 2026-04)
- 110개+ 작업보고서 분석 (12월 17개, 1월 33개, 2월 29개, 3월 29개, 4월 19개)
- experience.md 대폭 보강: 월별 핵심 활동 타임라인 추가
- projects.md 대폭 보강: 완료/운영 프로젝트 10개+, 이월 항목 패턴 발견
- skills.md 대폭 보강: 사용 빈도 + 양산 제품 5개 목록 추가
- ai-direction.md 보강: 판단 로그 14건, 위시캣 시장 인사이트 추가
- strengths.md 보강: 실적 증거 + 작업 패턴 강점 추가
- gaps.md 보강: 이월 패턴, 계획 vs 실행 불일치, 시장 미스매치 발견
- ai-landscape.md 보강: 검증된 도구 조합 5세트 추가

## [2026-04-19] ingest | 위시캣 지원서 수집 (2026-02 ~ 2026-04)
- 16건 지원서 분석 (2월 2건, 3월 8건, 4월 6건)
- ai-direction.md에 위시캣 시장 인사이트 + 차별화 전략 추가
- 지원서 진화 패턴 발견: 단순→아키텍처→갭분석
- 핵심 브랜딩: "38년 경력 + 5개 양산 제품"

## [2026-04-19] init | 위키 초기 구축
- 스키마(CLAUDE.md) 작성
- 핵심 페이지 9개 생성: me, skills, experience, projects, goals, ai-landscape, ai-direction, strengths, gaps
- 첫 번째 생각 페이지 작성
- 인덱스 생성
- raw/ 폴더 구조 구축 (위시캣, 작업보고서 junction 링크)
