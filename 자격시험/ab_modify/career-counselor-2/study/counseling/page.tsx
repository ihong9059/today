'use client';
import { useState } from 'react';

export default function CounselingStudyPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);

  const toggleTopic = (index: number) => {
    setExpandedTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const topics = [
    {
      title: '직업상담의 개념과 역사',
      questions: [
        { id: 1, question: '직업상담의 정의와 목적을 설명하시오.', answer: '개인의 직업선택, 직업적응, 직업전환을 돕는 전문적 조력과정', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직업상담의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직업상담의 정의\n2. 직업상담의 목적\n3. 일반상담과의 차이점\n4. 직업상담의 필요성\n5. 연습문제 3개' },
        { id: 2, question: 'Parsons의 특성-요인 이론의 3단계를 설명하시오.', answer: '자기이해 → 직업세계 이해 → 합리적 연결', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: Parsons의 특성-요인 이론의 3단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Parsons의 이론 배경\n2. 3단계 상세 설명\n3. 이론의 장단점\n4. 현대 직업상담에서의 적용\n5. 연습문제 3개' },
        { id: 3, question: '직업상담의 역사적 발전과정을 시대별로 설명하시오.', answer: '직업지도운동(1900s) → 특성요인이론 → 발달이론 → 현대 통합적 접근', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직업상담의 역사적 발전과정을 시대별로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직업지도운동의 시작\n2. 주요 이론의 등장 시기\n3. 한국 직업상담의 발전\n4. 현대 직업상담의 특징\n5. 연습문제 3개' },
        { id: 4, question: '직업상담사의 역할과 자질에 대해 설명하시오.', answer: '조력자, 정보제공자, 촉진자 역할 / 전문성, 윤리성, 공감능력', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직업상담사의 역할과 자질에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직업상담사의 주요 역할\n2. 필수 자질과 역량\n3. 전문성 개발 방법\n4. 윤리적 책임\n5. 연습문제 3개' },
        { id: 5, question: '직업상담의 유형(개인상담, 집단상담)을 비교하시오.', answer: '개인상담: 심층적, 1:1 / 집단상담: 상호작용, 효율성', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직업상담의 유형(개인상담, 집단상담)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 개인상담의 특징과 장단점\n2. 집단상담의 특징과 장단점\n3. 상황별 적합한 상담 유형\n4. 효과적인 운영 방법\n5. 연습문제 3개' },
        { id: 6, question: '직업상담에서 라포(rapport) 형성의 중요성을 설명하시오.', answer: '신뢰관계 구축, 상담효과 증진, 내담자 개방성 향상', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직업상담에서 라포(rapport) 형성의 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 라포의 정의\n2. 라포 형성 방법\n3. 상담 효과와의 관계\n4. 라포 형성 장애요인\n5. 연습문제 3개' },
        { id: 7, question: '직업상담 윤리강령의 주요 내용을 설명하시오.', answer: '비밀보장, 이중관계 금지, 전문성 유지, 내담자 권리 존중', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직업상담 윤리강령의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 윤리강령의 필요성\n2. 주요 윤리 원칙\n3. 윤리적 딜레마 상황\n4. 윤리 위반 시 대처\n5. 연습문제 3개' },
        { id: 8, question: '직업상담의 과정(단계)을 설명하시오.', answer: '관계형성 → 문제파악 → 목표설정 → 개입 → 종결', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직업상담의 과정(단계)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 단계별 목표\n2. 단계별 주요 활동\n3. 단계 간 연결성\n4. 효과적인 진행 방법\n5. 연습문제 3개' },
      ]
    },
    {
      title: '상담이론 (정신분석, 인간중심, 행동주의)',
      questions: [
        { id: 9, question: '정신분석 상담이론의 핵심 개념을 설명하시오.', answer: '무의식, 방어기제, 전이, 자유연상, 꿈 분석', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 정신분석 상담이론의 핵심 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Freud의 성격구조(이드, 자아, 초자아)\n2. 무의식의 역할\n3. 방어기제의 종류\n4. 직업상담에서의 적용\n5. 연습문제 3개' },
        { id: 10, question: 'Rogers의 인간중심 상담이론의 3가지 핵심조건을 설명하시오.', answer: '무조건적 긍정적 존중, 공감적 이해, 진솔성(일치성)', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: Rogers의 인간중심 상담이론의 3가지 핵심조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 조건의 정의\n2. 상담에서의 구체적 적용\n3. 인간중심 상담의 목표\n4. 직업상담에서의 활용\n5. 연습문제 3개' },
        { id: 11, question: '행동주의 상담이론의 주요 기법을 설명하시오.', answer: '체계적 둔감법, 토큰강화, 모델링, 행동계약', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 행동주의 상담이론의 주요 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 행동주의의 기본 가정\n2. 주요 상담기법\n3. 강화와 처벌의 원리\n4. 직업상담에서의 적용 사례\n5. 연습문제 3개' },
        { id: 12, question: '인지행동 상담이론(Beck, Ellis)의 핵심 개념을 설명하시오.', answer: '자동적 사고, 인지적 왜곡, ABC 모델, 비합리적 신념', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 인지행동 상담이론(Beck, Ellis)의 핵심 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Beck의 인지치료 이론\n2. Ellis의 REBT 이론\n3. 인지적 왜곡의 유형\n4. 직업상담에서의 활용\n5. 연습문제 3개' },
        { id: 13, question: '게슈탈트 상담이론의 주요 기법을 설명하시오.', answer: '빈 의자 기법, 자각 실험, 과장하기, 현재에 머물기', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 게슈탈트 상담이론의 주요 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 게슈탈트 이론의 기본 개념\n2. 주요 상담기법\n3. "지금-여기"의 원리\n4. 직업상담에서의 적용\n5. 연습문제 3개' },
        { id: 14, question: '현실치료(Glasser) 상담이론의 WDEP 기법을 설명하시오.', answer: 'W(바람) D(행동) E(평가) P(계획)', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 현실치료(Glasser) 상담이론의 WDEP 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현실치료의 기본 가정\n2. WDEP 각 단계 설명\n3. 선택이론과의 관계\n4. 직업상담에서의 활용\n5. 연습문제 3개' },
        { id: 15, question: '해결중심 단기상담의 주요 기법을 설명하시오.', answer: '기적질문, 예외질문, 척도질문, 대처질문', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 해결중심 단기상담의 주요 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 해결중심 상담의 철학\n2. 주요 질문 기법\n3. 강점 기반 접근\n4. 직업상담에서의 적용\n5. 연습문제 3개' },
        { id: 16, question: '실존주의 상담이론의 핵심 주제를 설명하시오.', answer: '자유와 책임, 죽음, 고립, 무의미, 실존적 불안', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 실존주의 상담이론의 핵심 주제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실존주의의 철학적 배경\n2. 4가지 궁극적 관심사\n3. 의미 추구와 직업\n4. 직업상담에서의 적용\n5. 연습문제 3개' },
      ]
    },
    {
      title: '상담기법과 기술',
      questions: [
        { id: 17, question: '적극적 경청의 기법과 중요성을 설명하시오.', answer: '주의집중, 비언어적 반응, 재진술, 요약, 감정반영', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 적극적 경청의 기법과 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적극적 경청의 정의\n2. 구체적인 경청 기법\n3. 비언어적 요소\n4. 직업상담에서의 적용\n5. 연습문제 3개' },
        { id: 18, question: '공감적 반응의 수준과 기법을 설명하시오.', answer: '1수준(무시) ~ 5수준(심층공감), 감정반영, 의미반영', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 공감적 반응의 수준과 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공감의 정의와 유형\n2. 공감 수준 5단계\n3. 공감적 반응 표현 방법\n4. 공감의 치료적 효과\n5. 연습문제 3개' },
        { id: 19, question: '질문기법(개방형, 폐쇄형)의 활용방법을 설명하시오.', answer: '개방형: 탐색, 확장 / 폐쇄형: 확인, 초점화', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 질문기법(개방형, 폐쇄형)의 활용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개방형 질문의 특징과 예시\n2. 폐쇄형 질문의 특징과 예시\n3. 상황별 적절한 질문 유형\n4. 효과적인 질문 순서\n5. 연습문제 3개' },
        { id: 20, question: '직면(confrontation) 기법의 적절한 사용방법을 설명하시오.', answer: '불일치 지적, 지지적 분위기에서, 타이밍 중요', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직면(confrontation) 기법의 적절한 사용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직면의 정의와 목적\n2. 직면의 유형\n3. 효과적인 직면 방법\n4. 직면 사용 시 주의사항\n5. 연습문제 3개' },
        { id: 21, question: '해석(interpretation) 기법의 활용을 설명하시오.', answer: '내담자 행동/감정의 의미 설명, 통찰 촉진', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 해석(interpretation) 기법의 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 해석의 정의와 목적\n2. 해석의 유형\n3. 효과적인 해석 방법\n4. 해석 사용 시 주의사항\n5. 연습문제 3개' },
        { id: 22, question: '요약(summarization)과 명료화(clarification) 기법을 비교하시오.', answer: '요약: 내용 정리 / 명료화: 모호한 부분 구체화', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 요약과 명료화 기법을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 요약의 정의와 방법\n2. 명료화의 정의와 방법\n3. 두 기법의 차이점\n4. 상담 단계별 활용\n5. 연습문제 3개' },
        { id: 23, question: '자기개방(self-disclosure)의 적절한 활용방법을 설명하시오.', answer: '내담자 이익 위해, 적절한 수준, 목적 명확', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 자기개방(self-disclosure)의 적절한 활용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기개방의 정의\n2. 자기개방의 유형\n3. 효과적인 자기개방 조건\n4. 주의사항\n5. 연습문제 3개' },
        { id: 24, question: '즉시성(immediacy)의 개념과 활용을 설명하시오.', answer: '"지금-여기"의 상담관계를 다룸, 관계 점검', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 즉시성(immediacy)의 개념과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 즉시성의 정의\n2. 즉시성의 유형\n3. 활용 시점과 방법\n4. 상담관계에서의 효과\n5. 연습문제 3개' },
      ]
    },
    {
      title: '집단상담의 원리',
      questions: [
        { id: 25, question: '집단상담의 치료적 요인(Yalom)을 설명하시오.', answer: '보편성, 희망 고취, 이타심, 정보전달, 사회화 기술 발달 등 11요인', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 집단상담의 치료적 요인(Yalom)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Yalom의 11가지 치료적 요인\n2. 각 요인의 설명\n3. 직업상담 집단에서의 적용\n4. 치료적 요인 촉진 방법\n5. 연습문제 3개' },
        { id: 26, question: '집단상담의 발달단계를 설명하시오.', answer: '초기(탐색) → 과도기(갈등) → 작업(생산) → 종결', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 집단상담의 발달단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 단계의 특징\n2. 단계별 집단원 행동\n3. 상담자의 역할\n4. 단계 전환 촉진 방법\n5. 연습문제 3개' },
        { id: 27, question: '집단상담에서 리더의 역할과 기능을 설명하시오.', answer: '촉진자, 중재자, 모델링, 보호자, 과정 관찰자', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 집단상담에서 리더의 역할과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 리더의 주요 역할\n2. 리더십 유형\n3. 효과적인 개입 방법\n4. 리더의 자질\n5. 연습문제 3개' },
        { id: 28, question: '집단상담에서 문제 집단원 유형과 대처방법을 설명하시오.', answer: '독점자, 침묵자, 저항자, 의존자 등', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 집단상담에서 문제 집단원 유형과 대처방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문제 집단원의 유형\n2. 각 유형별 특징\n3. 효과적인 대처 전략\n4. 예방 방법\n5. 연습문제 3개' },
        { id: 29, question: '직업상담 집단프로그램의 구성요소를 설명하시오.', answer: '목표설정, 대상선정, 회기구성, 활동계획, 평가', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직업상담 집단프로그램의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프로그램 기획 단계\n2. 주요 구성요소\n3. 회기별 구성 예시\n4. 효과성 평가 방법\n5. 연습문제 3개' },
        { id: 30, question: '취업준비 집단상담 프로그램의 예시를 제시하시오.', answer: '자기이해, 직업탐색, 구직기술, 면접준비 등 8~12회기', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 취업준비 집단상담 프로그램의 예시를 제시하시오.\n\n다음 순서로 설명해주세요:\n1. 프로그램 목표\n2. 대상자 특성\n3. 회기별 주제와 활동\n4. 기대 효과\n5. 연습문제 3개' },
        { id: 31, question: '구조화 집단과 비구조화 집단의 차이를 설명하시오.', answer: '구조화: 계획된 활동 / 비구조화: 자유로운 상호작용', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 구조화 집단과 비구조화 집단의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조화 집단의 특징\n2. 비구조화 집단의 특징\n3. 각 유형의 장단점\n4. 적합한 상황\n5. 연습문제 3개' },
        { id: 32, question: '집단상담의 윤리적 문제와 대처방안을 설명하시오.', answer: '비밀보장, 사전동의, 집단원 보호, 이중관계', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 집단상담의 윤리적 문제와 대처방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단상담의 윤리적 쟁점\n2. 비밀보장의 한계\n3. 집단원 보호 방안\n4. 윤리적 의사결정\n5. 연습문제 3개' },
      ]
    },
    {
      title: '직업상담의 실제',
      questions: [
        { id: 33, question: '초기 상담에서 내담자 정보수집 방법을 설명하시오.', answer: '면담, 심리검사, 관찰, 기록 검토', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 초기 상담에서 내담자 정보수집 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정보수집의 목적\n2. 수집 방법별 특징\n3. 수집해야 할 정보 항목\n4. 효과적인 정보 활용\n5. 연습문제 3개' },
        { id: 34, question: '상담 목표 설정의 원칙(SMART)을 설명하시오.', answer: 'Specific, Measurable, Achievable, Relevant, Time-bound', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담 목표 설정의 원칙(SMART)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SMART 각 요소 설명\n2. 목표 설정의 중요성\n3. 직업상담 목표 예시\n4. 목표 수정 방법\n5. 연습문제 3개' },
        { id: 35, question: '직업상담 기록의 유형과 작성방법을 설명하시오.', answer: '접수면접기록, 상담기록, 종결기록, SOAP 형식', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직업상담 기록의 유형과 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상담기록의 목적\n2. 기록 유형별 특징\n3. SOAP 형식 설명\n4. 기록 작성 시 주의사항\n5. 연습문제 3개' },
        { id: 36, question: '상담 종결의 시기와 방법을 설명하시오.', answer: '목표 달성, 추수상담 계획, 의뢰 필요시', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담 종결의 시기와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 종결의 기준\n2. 종결 과정\n3. 조기 종결 처리\n4. 추수상담 계획\n5. 연습문제 3개' },
        { id: 37, question: '전직지원(Outplacement) 상담의 과정을 설명하시오.', answer: '심리안정 → 자기분석 → 목표설정 → 구직활동 → 취업', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 전직지원(Outplacement) 상담의 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전직지원의 정의와 목적\n2. 단계별 상담 내용\n3. 퇴직자의 심리적 특성\n4. 효과적인 지원 방법\n5. 연습문제 3개' },
        { id: 38, question: '경력개발 상담의 주요 내용을 설명하시오.', answer: '경력목표 설정, 경력경로 탐색, 역량개발 계획', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 경력개발 상담의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경력개발의 개념\n2. 경력단계별 과업\n3. 경력개발 상담 과정\n4. 조직 내 경력개발 지원\n5. 연습문제 3개' },
        { id: 39, question: '창업상담의 주요 내용과 절차를 설명하시오.', answer: '창업동기 확인, 사업아이템 검토, 사업계획서 작성 지원', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 창업상담의 주요 내용과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 창업상담의 목적\n2. 창업적합성 평가\n3. 상담 절차\n4. 창업 지원 자원 연계\n5. 연습문제 3개' },
        { id: 40, question: '특수집단(장애인, 고령자) 직업상담의 특성을 설명하시오.', answer: '개별화된 접근, 관련 법규 이해, 지원체계 연계', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 특수집단(장애인, 고령자) 직업상담의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 장애인 직업상담의 특성\n2. 고령자 직업상담의 특성\n3. 관련 법규와 제도\n4. 효과적인 상담 전략\n5. 연습문제 3개' },
      ]
    },
    {
      title: '상담 평가와 슈퍼비전',
      questions: [
        { id: 41, question: '상담 효과 평가의 방법을 설명하시오.', answer: '목표달성도, 내담자 만족도, 행동변화, 추수조사', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담 효과 평가의 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평가의 목적\n2. 평가 방법의 유형\n3. 평가 도구\n4. 결과 활용\n5. 연습문제 3개' },
        { id: 42, question: '상담 슈퍼비전의 목적과 유형을 설명하시오.', answer: '전문성 향상, 윤리적 실천, 개인/집단/동료 슈퍼비전', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담 슈퍼비전의 목적과 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 슈퍼비전의 정의와 목적\n2. 슈퍼비전의 유형\n3. 슈퍼바이저의 역할\n4. 효과적인 슈퍼비전 방법\n5. 연습문제 3개' },
        { id: 43, question: '상담자 소진(Burnout)의 원인과 예방을 설명하시오.', answer: '과도한 업무, 감정노동, 자기돌봄, 지지체계 구축', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담자 소진(Burnout)의 원인과 예방을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소진의 정의와 증상\n2. 소진의 원인\n3. 예방 전략\n4. 회복 방법\n5. 연습문제 3개' },
        { id: 44, question: '상담자의 전문성 개발 방법을 설명하시오.', answer: '지속교육, 자격갱신, 학회활동, 사례연구', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담자의 전문성 개발 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전문성 개발의 필요성\n2. 개발 방법\n3. 전문가 네트워크 구축\n4. 자기성찰의 중요성\n5. 연습문제 3개' },
        { id: 45, question: '상담 사례개념화의 방법을 설명하시오.', answer: '문제 정의, 원인 분석, 상담목표, 전략 수립', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담 사례개념화의 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사례개념화의 정의\n2. 구성요소\n3. 이론별 사례개념화\n4. 작성 예시\n5. 연습문제 3개' },
        { id: 46, question: '의뢰(Referral)의 시기와 절차를 설명하시오.', answer: '전문성 한계, 윤리적 문제 시, 적절한 기관 연계', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 의뢰(Referral)의 시기와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의뢰의 필요성\n2. 의뢰 시기 판단\n3. 의뢰 절차\n4. 의뢰 시 주의사항\n5. 연습문제 3개' },
        { id: 47, question: '다문화 내담자 상담의 고려사항을 설명하시오.', answer: '문화적 감수성, 언어장벽, 가치관 차이 존중', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 다문화 내담자 상담의 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다문화 상담의 정의\n2. 문화적 역량\n3. 상담 시 고려사항\n4. 효과적인 접근 방법\n5. 연습문제 3개' },
        { id: 48, question: '온라인/비대면 직업상담의 특성과 유의점을 설명하시오.', answer: '접근성 향상, 비언어적 단서 제한, 기술적 준비 필요', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 온라인/비대면 직업상담의 특성과 유의점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비대면 상담의 장단점\n2. 기술적 준비사항\n3. 라포 형성 방법\n4. 윤리적 고려사항\n5. 연습문제 3개' },
        { id: 49, question: '상담에서 저항의 유형과 대처방법을 설명하시오.', answer: '침묵, 지각, 과제 불이행 등 / 수용, 탐색, 직면', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담에서 저항의 유형과 대처방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저항의 정의와 의미\n2. 저항의 유형\n3. 저항의 원인\n4. 효과적인 대처 방법\n5. 연습문제 3개' },
        { id: 50, question: '상담관계에서 전이와 역전이를 설명하시오.', answer: '전이: 내담자→상담자 / 역전이: 상담자→내담자 감정 투사', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담관계에서 전이와 역전이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전이의 정의와 유형\n2. 역전이의 정의와 유형\n3. 상담에서의 영향\n4. 효과적인 활용 방법\n5. 연습문제 3개' },
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const completedKey = 'career-counselor-2-counseling-completed';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-teal-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/education" className="text-gray-600 hover:text-teal-600">교육</a>
            <span className="text-gray-300">›</span>
            <a href="/category/education/career-counselor-2" className="text-gray-600 hover:text-teal-600">직업상담사 2급</a>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">직업상담학</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📖</span>
            <div>
              <h1 className="text-2xl font-bold">직업상담학</h1>
              <p className="text-teal-100">총 {totalQuestions}문항 | 상담이론과 기법</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIdx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-sm">
                    {topicIdx + 1}
                  </div>
                  <span className="font-medium text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-400">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${expandedTopics.includes(topicIdx) ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {expandedTopics.includes(topicIdx) && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-teal-600">A. {q.answer}</p>
                        </div>
                        <button
                          onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                          className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition flex-shrink-0"
                        >
                          🤖 AI
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© 2026 자격시험 가이드. 시험 정보는 Q-Net 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
