# Claude Skills 완전 분석 - 영상 요약

## 영상 정보

| 항목 | 내용 |
|------|------|
| **제목** | Claude가 워크플로 도구가 됐습니다 \| Skills 완전 분석 |
| **영상 ID** | vqLONWXfMsI |
| **재생 시간** | 37분 04초 |
| **언어** | 한국어 |
| **링크** | https://www.youtube.com/watch?v=vqLONWXfMsI |

---

## 핵심 주제

Claude Skills는 Anthropic이 새롭게 출시한 기능으로, Claude를 **워크플로 자동화 도구**로 변환시켜주는 기능입니다. 기존의 n8n, Make, Zapier 같은 노코드 워크플로 도구와 달리, Skills는 자연어 기반으로 복잡한 작업을 수행할 수 있게 해줍니다.

---

## 핵심 내용 요약

### 1. Claude Skills란?

- **정의**: Claude가 특정 작업을 수행하는 방법을 정의한 문서 기반 시스템
- **특징**: "Vibe Workflow" - 자연어로 워크플로를 정의하고 실행
- **지원 플랫폼**: Claude Desktop, Claude Web, Claude Mobile, Claude Code

### 2. 기본 제공 Skills (Built-in Skills)

Anthropic이 기본으로 제공하는 Skills 목록:

| Skill 이름 | 기능 |
|-----------|------|
| **Slack GIF Creator** | Slack용 GIF 애니메이션 생성 |
| **PPT (PowerPoint)** | 프레젠테이션 문서 생성 |
| **PDF** | PDF 문서 생성 및 편집 |
| **Excel/Spreadsheet** | 스프레드시트 작업 |
| **Word/Docs** | 워드 문서 작업 |
| **Frontend Design** | 프론트엔드 UI 디자인 |
| **Canvas Design** | 캔버스 기반 디자인 |
| **Web Artifacts Builder** | 웹 아티팩트 생성 |
| **MCP Builder** | MCP 서버 구축 가이드 |
| **Skill Creator** | 새로운 Skill 생성 가이드 |

### 3. Skill 문서 구조

Skills는 마크다운 문서로 구성되며, 세 가지 핵심 요소로 이루어집니다:

```markdown
---
# Front Matter (YAML)
name: skill-name
description: Skill 설명
tools: [사용할 도구들]
---

# Body (Markdown)
Claude에게 전달할 지시사항 및 워크플로 정의

# Reference Documents (선택)
@reference-file.md
```

#### Front Matter 주요 속성
- `name`: Skill 이름
- `description`: Skill 설명 (Claude가 언제 이 Skill을 사용할지 판단하는 기준)
- `tools`: 필요한 도구 목록
- `trigger`: 자동 실행 조건 (선택)

### 4. Skill 작동 방식

1. 사용자가 요청을 입력
2. Claude가 요청을 분석하고 적절한 Skill 선택
3. Skill 문서의 지시사항에 따라 작업 수행
4. 결과물 생성 및 반환

### 5. Custom Skill 생성

사용자가 직접 Skill을 만들 수 있습니다:

1. **Claude Desktop/Web**: Settings > Skills에서 마크다운 파일 업로드
2. **Claude Code**: `.claude/skills/` 폴더에 마크다운 파일 저장

#### 예시: BigQuery 분석 Skill

```markdown
---
name: bigquery-analysis
description: BigQuery 데이터 분석 및 시각화
tools: [mcp__bigquery__execute_query]
---

# BigQuery 분석 Skill

이 Skill은 BigQuery 데이터를 분석하고 시각화합니다.

## 작업 순서
1. 사용자 요청 분석
2. 적절한 SQL 쿼리 작성
3. BigQuery에서 데이터 조회
4. 결과 시각화 및 인사이트 제공
```

### 6. MCP와 Skills의 조합

- **MCP (Model Context Protocol)**: 외부 서비스와 연동하는 프로토콜
- **Skills + MCP**: Skills에서 MCP 도구를 활용하여 더 강력한 워크플로 구축 가능

예시:
- BigQuery MCP 서버 + 데이터 분석 Skill
- Slack MCP 서버 + 메시지 자동화 Skill
- GitHub MCP 서버 + 코드 리뷰 Skill

### 7. Claude Code에서 Skills 설치

```bash
# Anthropic 공식 Skills 설치
/add-anthropic-skills

# 설치 위치
.claude/plugins/marketplace/example-skills@anthropic-agent-skills/
```

### 8. Skills vs MCP vs Sub-agents 비교

| 구분 | Skills | MCP | Sub-agents |
|------|--------|-----|------------|
| **정의** | 문서 기반 워크플로 | 프로토콜 기반 도구 연동 | 독립적 AI 에이전트 |
| **용도** | 반복 작업 자동화 | 외부 서비스 연결 | 복잡한 다단계 작업 |
| **설정 난이도** | 쉬움 (마크다운) | 중간 (서버 구성) | 어려움 (코드 작성) |
| **유연성** | 중간 | 높음 | 매우 높음 |
| **조합** | MCP 도구 사용 가능 | Skills에서 호출 가능 | 둘 다 활용 가능 |

---

## 논리 전개

1. **문제 제기**: 기존 노코드 워크플로 도구들은 복잡한 노드 연결과 설정이 필요
2. **해결책 제시**: Claude Skills는 자연어로 워크플로를 정의하여 진입 장벽을 낮춤
3. **실용적 예시**: PPT, PDF 생성부터 BigQuery 분석까지 다양한 활용 사례 시연
4. **확장성**: MCP와 결합하여 무한한 확장 가능성 제시
5. **접근성**: Claude Desktop, Web, Mobile, Code 등 다양한 플랫폼에서 사용 가능

---

## 숫자 기반 인사이트

- **10개 이상**의 기본 제공 Skills
- **3가지** 플랫폼 지원 (Desktop, Web/Mobile, Code)
- **2가지** Skill 추가 방법 (업로드, 폴더 저장)
- **37분** 분량의 심층 분석 영상

---

## 폴더 구조

```
.claude/
├── skills/           # 사용자 정의 Skills
│   └── my-skill.md
└── plugins/
    └── marketplace/  # 마켓플레이스 Skills
        └── example-skills@anthropic-agent-skills/
            ├── pptx.md
            ├── pdf.md
            ├── xlsx.md
            └── ...
```

---

## 탐구형 질문

1. **Skills와 기존 워크플로 도구의 차이점은?**
   - 노코드 도구는 시각적 노드 연결, Skills는 자연어 기반
   - Skills는 Claude의 추론 능력을 활용하여 더 유연한 처리 가능

2. **어떤 상황에서 Skills를 사용해야 할까?**
   - 반복적인 문서 생성 작업
   - 데이터 분석 및 시각화
   - 코드 리뷰 및 문서화
   - 정형화된 워크플로 자동화

3. **MCP 없이 Skills만으로 충분할까?**
   - 기본 작업은 Skills만으로 충분
   - 외부 서비스 연동이 필요하면 MCP 추가 필요

4. **Custom Skill을 잘 만드는 팁은?**
   - 명확한 description 작성 (Claude가 언제 사용할지 판단하는 기준)
   - 단계별 지시사항 포함
   - 필요한 tools 명시
   - 예시 포함으로 일관된 결과 유도

---

## 타임라인별 주요 내용

| 시간 | 내용 |
|------|------|
| 0:00 | 인트로 - Skills 소개 |
| 2:00 | Skills란 무엇인가 |
| 5:00 | 기본 제공 Skills 둘러보기 |
| 10:00 | Skill 문서 구조 분석 |
| 15:00 | PPT Skill 데모 |
| 20:00 | PDF Skill 데모 |
| 25:00 | Custom Skill 생성 |
| 28:00 | BigQuery + Skills 연동 |
| 32:00 | Claude Code에서 Skills 설치 |
| 35:00 | Skills vs MCP vs Sub-agents |

---

## 결론

Claude Skills는 AI 워크플로 자동화의 새로운 패러다임을 제시합니다. 마크다운 문서 하나로 복잡한 워크플로를 정의하고, Claude의 추론 능력과 결합하여 기존 노코드 도구보다 더 유연하고 강력한 자동화를 실현할 수 있습니다.

특히 MCP와의 조합을 통해 외부 서비스와의 연동까지 가능해져, 실질적인 업무 자동화 도구로서의 가치가 높습니다.

---

*요약 생성일: 2026-01-05*
*원본 영상: https://www.youtube.com/watch?v=vqLONWXfMsI*
