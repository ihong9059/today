'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DesignGeneralStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('visual-design-technician-design-general-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('visual-design-technician-design-general-completed', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const topics = [
    {
      id: 1,
      name: '디자인 역사',
      icon: '📜',
      questions: [
        { id: 1, question: '바우하우스(Bauhaus)가 설립된 연도와 국가는?', answer: '1919년, 독일 바이마르', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 바우하우스(Bauhaus)가 설립된 연도와 국가는?\n\n다음 순서로 설명해주세요:\n1. 바우하우스의 설립 배경\n2. 바우하우스의 교육 이념과 특징\n3. 주요 교수진과 그들의 작품\n4. 바우하우스가 현대 디자인에 미친 영향\n5. 연습문제 3개' },
        { id: 2, question: '아르누보(Art Nouveau) 운동의 특징은?', answer: '곡선적, 유기적 형태와 자연 모티브 사용', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 아르누보(Art Nouveau) 운동의 특징은?\n\n다음 순서로 설명해주세요:\n1. 아르누보의 시대적 배경 (19세기 말~20세기 초)\n2. 조형적 특징과 표현 기법\n3. 대표 작가와 작품\n4. 아르누보가 건축, 제품, 그래픽에 미친 영향\n5. 연습문제 3개' },
        { id: 3, question: '아르데코(Art Deco) 양식의 조형적 특징은?', answer: '기하학적 형태, 화려한 장식, 대칭 구성', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 아르데코(Art Deco) 양식의 조형적 특징은?\n\n다음 순서로 설명해주세요:\n1. 아르데코의 발생 배경 (1920-30년대)\n2. 조형적 특징과 디자인 요소\n3. 아르데코와 아르누보의 차이점\n4. 대표 작품과 현대적 영향\n5. 연습문제 3개' },
        { id: 4, question: '산업혁명이 디자인에 미친 영향은?', answer: '대량생산 체제, 디자인과 생산의 분리, 미술공예운동 촉발', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 산업혁명이 디자인에 미친 영향은?\n\n다음 순서로 설명해주세요:\n1. 산업혁명 이전의 제작 방식\n2. 대량생산이 디자인에 가져온 변화\n3. 미술공예운동(Arts & Crafts)의 등장\n4. 산업디자인의 탄생과 발전\n5. 연습문제 3개' },
        { id: 5, question: '울름조형대학(HfG Ulm)의 디자인 철학은?', answer: '체계적 디자인 방법론, 기능주의, 과학적 접근', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 울름조형대학(HfG Ulm)의 디자인 철학은?\n\n다음 순서로 설명해주세요:\n1. 울름조형대학의 설립과 배경\n2. 바우하우스와의 관계와 차이점\n3. 체계적 디자인 방법론\n4. 브라운(Braun) 사와의 협력\n5. 연습문제 3개' },
        { id: 6, question: '윌리엄 모리스(William Morris)의 디자인 운동은?', answer: '미술공예운동(Arts and Crafts Movement)', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 윌리엄 모리스(William Morris)의 디자인 운동은?\n\n다음 순서로 설명해주세요:\n1. 윌리엄 모리스의 생애와 사상\n2. 미술공예운동의 핵심 이념\n3. 대표 작품과 켈름스코트 프레스\n4. 현대 디자인에 미친 영향\n5. 연습문제 3개' },
        { id: 7, question: '데 스틸(De Stijl) 운동의 특징은?', answer: '기본 색상(빨강, 파랑, 노랑)과 기하학적 형태, 직선', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 데 스틸(De Stijl) 운동의 특징은?\n\n다음 순서로 설명해주세요:\n1. 데 스틸의 발생 배경 (네덜란드, 1917년)\n2. 조형 원리와 특징\n3. 몬드리안, 리트벨트 등 주요 작가\n4. 건축, 가구, 그래픽에 미친 영향\n5. 연습문제 3개' },
        { id: 8, question: '러시아 구성주의(Constructivism)의 특징은?', answer: '기하학적 추상, 역동성, 사회적 기능 강조', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 러시아 구성주의(Constructivism)의 특징은?\n\n다음 순서로 설명해주세요:\n1. 구성주의의 역사적 배경 (러시아 혁명 후)\n2. 조형적 특징과 표현 방식\n3. 타틀린, 로드첸코 등 주요 작가\n4. 포스터, 타이포그래피에 미친 영향\n5. 연습문제 3개' },
        { id: 9, question: '포스트모더니즘 디자인의 특징은?', answer: '역사적 참조, 장식성, 다양성과 복잡성 추구', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 포스트모더니즘 디자인의 특징은?\n\n다음 순서로 설명해주세요:\n1. 포스트모더니즘의 등장 배경 (1970년대~)\n2. 모더니즘과의 차이점\n3. 멤피스 그룹과 대표 작품\n4. 그래픽 디자인에서의 포스트모더니즘\n5. 연습문제 3개' },
        { id: 10, question: '스위스 국제 타이포그래피 양식의 특징은?', answer: '그리드 시스템, 산세리프체, 객관성, 명료성', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 스위스 국제 타이포그래피 양식의 특징은?\n\n다음 순서로 설명해주세요:\n1. 스위스 스타일의 발생 배경\n2. 그리드 시스템과 타이포그래피 원칙\n3. 뮐러-브로크만 등 주요 디자이너\n4. 현대 그래픽 디자인에 미친 영향\n5. 연습문제 3개' },
      ]
    },
    {
      id: 2,
      name: '디자인 원리',
      icon: '⚖️',
      questions: [
        { id: 11, question: '디자인의 4대 조형 원리는?', answer: '통일, 변화, 균형, 조화', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 디자인의 4대 조형 원리는?\n\n다음 순서로 설명해주세요:\n1. 각 원리의 정의와 개념\n2. 실제 디자인에서의 적용 예시\n3. 원리들 간의 상호관계\n4. 효과적인 활용 방법\n5. 연습문제 3개' },
        { id: 12, question: '시각적 균형의 유형 3가지는?', answer: '대칭균형, 비대칭균형, 방사균형', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 시각적 균형의 유형 3가지는?\n\n다음 순서로 설명해주세요:\n1. 각 균형 유형의 정의\n2. 특징과 시각적 효과\n3. 적용 분야와 예시\n4. 균형을 만드는 방법\n5. 연습문제 3개' },
        { id: 13, question: '반복(Repetition)의 디자인 효과는?', answer: '리듬감, 통일성, 패턴 형성, 시각적 연속성', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 반복(Repetition)의 디자인 효과는?\n\n다음 순서로 설명해주세요:\n1. 반복의 개념과 유형\n2. 리듬과 패턴 생성 원리\n3. 그래픽 디자인에서의 활용\n4. 효과적인 반복 사용법\n5. 연습문제 3개' },
        { id: 14, question: '대비(Contrast)의 종류와 효과는?', answer: '크기, 색상, 형태, 방향 대비로 강조와 시선 유도', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 대비(Contrast)의 종류와 효과는?\n\n다음 순서로 설명해주세요:\n1. 대비의 종류 (크기, 색상, 형태, 질감, 방향)\n2. 각 대비의 시각적 효과\n3. 디자인에서 대비 활용법\n4. 주의점과 과용의 문제\n5. 연습문제 3개' },
        { id: 15, question: '강조(Emphasis)의 방법은?', answer: '크기, 색상, 위치, 고립을 통한 시선 집중', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 강조(Emphasis)의 방법은?\n\n다음 순서로 설명해주세요:\n1. 강조의 개념과 목적\n2. 강조를 만드는 다양한 방법\n3. 시각적 위계 설정\n4. 효과적인 강조 전략\n5. 연습문제 3개' },
        { id: 16, question: '조형의 기본 요소 4가지는?', answer: '점, 선, 면, 입체', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 조형의 기본 요소 4가지는?\n\n다음 순서로 설명해주세요:\n1. 각 요소의 정의와 특성\n2. 요소들의 상호관계\n3. 디자인에서의 활용\n4. 조형 요소와 원리의 관계\n5. 연습문제 3개' },
        { id: 17, question: '그리드 시스템(Grid System)의 역할은?', answer: '레이아웃 구조화, 일관성 유지, 정보 조직화', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 그리드 시스템(Grid System)의 역할은?\n\n다음 순서로 설명해주세요:\n1. 그리드 시스템의 정의와 역사\n2. 그리드의 유형 (칼럼, 모듈, 베이스라인)\n3. 편집디자인에서의 활용\n4. 그리드 설계 방법\n5. 연습문제 3개' },
        { id: 18, question: '황금비율(Golden Ratio)이란?', answer: '1:1.618의 비율, 자연에서 발견되는 미적 비율', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 황금비율(Golden Ratio)이란?\n\n다음 순서로 설명해주세요:\n1. 황금비율의 수학적 정의\n2. 자연과 예술에서의 황금비율\n3. 디자인에서의 활용 방법\n4. 황금비율 작도법\n5. 연습문제 3개' },
        { id: 19, question: '게슈탈트(Gestalt) 법칙의 종류는?', answer: '근접성, 유사성, 연속성, 폐쇄성, 전경-배경', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 게슈탈트(Gestalt) 법칙의 종류는?\n\n다음 순서로 설명해주세요:\n1. 게슈탈트 심리학의 개념\n2. 각 법칙의 정의와 예시\n3. 디자인에서의 활용\n4. 시각적 인지와의 관계\n5. 연습문제 3개' },
        { id: 20, question: '프로포션(Proportion)이란?', answer: '부분과 전체의 크기 관계, 비례', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 프로포션(Proportion)이란?\n\n다음 순서로 설명해주세요:\n1. 프로포션의 정의와 중요성\n2. 비례의 종류 (등차, 등비, 황금)\n3. 디자인에서의 비례 활용\n4. 인체 비례와 디자인\n5. 연습문제 3개' },
      ]
    },
    {
      id: 3,
      name: '디자인 방법론',
      icon: '🔄',
      questions: [
        { id: 21, question: '디자인 씽킹(Design Thinking) 5단계는?', answer: '공감, 정의, 아이디어, 프로토타입, 테스트', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 디자인 씽킹(Design Thinking) 5단계는?\n\n다음 순서로 설명해주세요:\n1. 각 단계의 정의와 목적\n2. 단계별 수행 방법\n3. 실제 프로젝트 적용 예시\n4. 디자인 씽킹의 장단점\n5. 연습문제 3개' },
        { id: 22, question: '브레인스토밍(Brainstorming)의 원칙은?', answer: '비판 금지, 자유 발상, 양 우선, 결합 개선', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 브레인스토밍(Brainstorming)의 원칙은?\n\n다음 순서로 설명해주세요:\n1. 브레인스토밍의 정의와 역사\n2. 4가지 기본 원칙 상세 설명\n3. 효과적인 진행 방법\n4. 변형 기법 (역브레인스토밍, 브레인라이팅)\n5. 연습문제 3개' },
        { id: 23, question: '마인드맵(Mind Map)의 작성 방법은?', answer: '중심 주제에서 방사형으로 연관 키워드 확장', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 마인드맵(Mind Map)의 작성 방법은?\n\n다음 순서로 설명해주세요:\n1. 마인드맵의 개념과 창시자\n2. 작성 단계와 원칙\n3. 디자인 기획에서의 활용\n4. 디지털 마인드맵 도구\n5. 연습문제 3개' },
        { id: 24, question: '무드보드(Mood Board)란?', answer: '프로젝트의 분위기와 방향을 시각화한 참고 자료 모음', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 무드보드(Mood Board)란?\n\n다음 순서로 설명해주세요:\n1. 무드보드의 정의와 목적\n2. 구성 요소 (이미지, 색상, 질감, 타이포)\n3. 제작 방법과 과정\n4. 클라이언트 커뮤니케이션에서의 활용\n5. 연습문제 3개' },
        { id: 25, question: 'SCAMPER 기법이란?', answer: '대체, 결합, 적용, 수정, 용도전환, 제거, 재배열 아이디어 발상법', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: SCAMPER 기법이란?\n\n다음 순서로 설명해주세요:\n1. SCAMPER 각 글자의 의미\n2. 각 기법의 적용 방법\n3. 디자인 아이디어 발상 예시\n4. SCAMPER의 장점과 활용 분야\n5. 연습문제 3개' },
        { id: 26, question: '프로토타입(Prototype)의 목적은?', answer: '아이디어 검증, 사용자 테스트, 문제점 발견', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 프로토타입(Prototype)의 목적은?\n\n다음 순서로 설명해주세요:\n1. 프로토타입의 정의와 유형\n2. 저충실도 vs 고충실도 프로토타입\n3. 제작 도구와 방법\n4. 프로토타입 테스트 방법\n5. 연습문제 3개' },
        { id: 27, question: '디자인 리서치의 방법은?', answer: '설문조사, 인터뷰, 관찰, 사용성 테스트', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 디자인 리서치의 방법은?\n\n다음 순서로 설명해주세요:\n1. 디자인 리서치의 목적\n2. 정량적 vs 정성적 리서치\n3. 각 방법의 특징과 적용 시점\n4. 리서치 결과 분석과 활용\n5. 연습문제 3개' },
        { id: 28, question: '페르소나(Persona)란?', answer: '타겟 사용자를 대표하는 가상의 인물 프로필', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 페르소나(Persona)란?\n\n다음 순서로 설명해주세요:\n1. 페르소나의 정의와 목적\n2. 페르소나 작성 요소\n3. 페르소나 활용 방법\n4. 좋은 페르소나의 조건\n5. 연습문제 3개' },
        { id: 29, question: '디자인 브리프(Design Brief)의 구성 요소는?', answer: '목표, 타겟, 범위, 일정, 예산, 참고자료', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 디자인 브리프(Design Brief)의 구성 요소는?\n\n다음 순서로 설명해주세요:\n1. 디자인 브리프의 정의와 중요성\n2. 필수 구성 요소 상세 설명\n3. 효과적인 브리프 작성법\n4. 브리프 검토 체크리스트\n5. 연습문제 3개' },
        { id: 30, question: '반복 설계(Iterative Design)란?', answer: '디자인-테스트-개선을 반복하는 점진적 개선 방식', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 반복 설계(Iterative Design)란?\n\n다음 순서로 설명해주세요:\n1. 반복 설계의 개념과 원리\n2. 폭포수 모델과의 비교\n3. 반복 설계의 장단점\n4. 애자일 방법론과의 관계\n5. 연습문제 3개' },
      ]
    },
    {
      id: 4,
      name: '디자인 분야',
      icon: '🎨',
      questions: [
        { id: 31, question: '시각디자인(Visual Design)의 영역은?', answer: '광고, 편집, 패키지, CI/BI, 인포그래픽', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 시각디자인(Visual Design)의 영역은?\n\n다음 순서로 설명해주세요:\n1. 시각디자인의 정의\n2. 각 영역의 특징과 예시\n3. 시각디자이너의 역할\n4. 최신 트렌드\n5. 연습문제 3개' },
        { id: 32, question: '제품디자인(Product Design)의 고려 요소는?', answer: '기능, 심미성, 인체공학, 생산성, 지속가능성', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 제품디자인(Product Design)의 고려 요소는?\n\n다음 순서로 설명해주세요:\n1. 제품디자인의 정의와 범위\n2. 각 고려 요소의 중요성\n3. 제품디자인 프로세스\n4. 성공적인 제품디자인 사례\n5. 연습문제 3개' },
        { id: 33, question: 'UX 디자인이란?', answer: '사용자 경험을 설계하는 디자인, 사용성과 만족도 중심', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: UX 디자인이란?\n\n다음 순서로 설명해주세요:\n1. UX의 정의와 구성 요소\n2. UI와 UX의 차이\n3. UX 디자인 프로세스\n4. UX 디자이너의 역할과 스킬\n5. 연습문제 3개' },
        { id: 34, question: 'UI 디자인의 원칙은?', answer: '일관성, 피드백, 가시성, 유연성, 오류 방지', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: UI 디자인의 원칙은?\n\n다음 순서로 설명해주세요:\n1. UI 디자인의 정의\n2. 각 원칙의 상세 설명\n3. 좋은 UI의 특징\n4. UI 디자인 가이드라인\n5. 연습문제 3개' },
        { id: 35, question: '환경디자인(Environmental Design)의 범위는?', answer: '인테리어, 전시, 사인, 공공 환경 디자인', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 환경디자인(Environmental Design)의 범위는?\n\n다음 순서로 설명해주세요:\n1. 환경디자인의 정의와 목적\n2. 세부 분야와 특징\n3. 공간과 사용자의 관계\n4. 환경디자인 사례\n5. 연습문제 3개' },
        { id: 36, question: '패션디자인의 프로세스는?', answer: '리서치, 컨셉, 스케치, 패턴, 샘플, 생산', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 패션디자인의 프로세스는?\n\n다음 순서로 설명해주세요:\n1. 패션디자인의 정의\n2. 각 단계의 내용과 목적\n3. 트렌드 분석 방법\n4. 지속가능한 패션\n5. 연습문제 3개' },
        { id: 37, question: '모션그래픽(Motion Graphics)이란?', answer: '움직이는 그래픽 디자인, 영상과 애니메이션 활용', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 모션그래픽(Motion Graphics)이란?\n\n다음 순서로 설명해주세요:\n1. 모션그래픽의 정의와 역사\n2. 애니메이션 원리\n3. 활용 분야 (광고, 영화 타이틀, UI)\n4. 제작 도구와 기법\n5. 연습문제 3개' },
        { id: 38, question: '서비스디자인(Service Design)이란?', answer: '서비스 전체 경험을 설계하는 디자인', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 서비스디자인(Service Design)이란?\n\n다음 순서로 설명해주세요:\n1. 서비스디자인의 정의와 특징\n2. 고객 여정 맵(Customer Journey Map)\n3. 터치포인트 설계\n4. 서비스디자인 방법론\n5. 연습문제 3개' },
        { id: 39, question: '유니버설 디자인(Universal Design)의 원칙은?', answer: '공평성, 유연성, 단순성, 정보 인지, 오류 허용', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 유니버설 디자인(Universal Design)의 원칙은?\n\n다음 순서로 설명해주세요:\n1. 유니버설 디자인의 정의와 배경\n2. 7가지 원칙 상세 설명\n3. 적용 사례\n4. 접근성 디자인과의 관계\n5. 연습문제 3개' },
        { id: 40, question: '지속가능한 디자인(Sustainable Design)이란?', answer: '환경 영향 최소화, 순환 경제 고려, 친환경 소재', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 지속가능한 디자인(Sustainable Design)이란?\n\n다음 순서로 설명해주세요:\n1. 지속가능 디자인의 정의와 필요성\n2. 친환경 디자인 원칙\n3. 순환 경제와 디자인\n4. 실천 사례와 트렌드\n5. 연습문제 3개' },
      ]
    },
    {
      id: 5,
      name: '기타 개념',
      icon: '📚',
      questions: [
        { id: 41, question: '저작권(Copyright)의 보호 대상은?', answer: '창작물의 표현 형식, 아이디어 자체는 보호 대상 아님', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 저작권(Copyright)의 보호 대상은?\n\n다음 순서로 설명해주세요:\n1. 저작권의 정의와 범위\n2. 보호되는 것과 보호되지 않는 것\n3. 디자이너를 위한 저작권 상식\n4. 저작권 침해 사례\n5. 연습문제 3개' },
        { id: 42, question: '디자인권(Design Right)이란?', answer: '물품의 외관 디자인을 보호하는 산업재산권', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 디자인권(Design Right)이란?\n\n다음 순서로 설명해주세요:\n1. 디자인권의 정의와 요건\n2. 등록 절차와 기간\n3. 저작권과의 차이\n4. 디자인 분쟁 사례\n5. 연습문제 3개' },
        { id: 43, question: '트레이드마크(Trademark)와 로고의 차이는?', answer: '트레이드마크는 법적 보호받는 상표, 로고는 시각적 식별 표시', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 트레이드마크(Trademark)와 로고의 차이는?\n\n다음 순서로 설명해주세요:\n1. 트레이드마크의 정의와 종류\n2. 로고의 개념과 유형\n3. 등록 절차와 보호 범위\n4. 브랜드 아이덴티티와의 관계\n5. 연습문제 3개' },
        { id: 44, question: '인체공학(Ergonomics)의 디자인 적용은?', answer: '인체 치수, 동작 범위, 감각 특성 고려한 설계', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 인체공학(Ergonomics)의 디자인 적용은?\n\n다음 순서로 설명해주세요:\n1. 인체공학의 정의와 목적\n2. 인체 측정과 디자인\n3. 제품, 환경 디자인에서의 적용\n4. 인체공학적 디자인 사례\n5. 연습문제 3개' },
        { id: 45, question: '디지털 인쇄와 옵셋 인쇄의 차이는?', answer: '디지털은 직접 출력, 옵셋은 판을 사용한 간접 인쇄', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 디지털 인쇄와 옵셋 인쇄의 차이는?\n\n다음 순서로 설명해주세요:\n1. 각 인쇄 방식의 원리\n2. 장단점 비교\n3. 적합한 사용 상황\n4. 인쇄물 디자인 시 고려사항\n5. 연습문제 3개' },
        { id: 46, question: 'CMYK와 RGB의 차이는?', answer: 'CMYK는 감산혼합(인쇄), RGB는 가산혼합(디스플레이)', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: CMYK와 RGB의 차이는?\n\n다음 순서로 설명해주세요:\n1. 각 색상 모드의 원리\n2. 사용 분야와 특징\n3. 색상 변환 시 주의점\n4. 디자인 작업에서의 색상 설정\n5. 연습문제 3개' },
        { id: 47, question: 'DPI와 PPI의 차이는?', answer: 'DPI는 인쇄 해상도(도트), PPI는 디스플레이 해상도(픽셀)', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: DPI와 PPI의 차이는?\n\n다음 순서로 설명해주세요:\n1. DPI와 PPI의 정의\n2. 인쇄물과 디지털 해상도 기준\n3. 적절한 해상도 설정 방법\n4. 해상도와 이미지 품질\n5. 연습문제 3개' },
        { id: 48, question: '벡터 그래픽과 래스터 그래픽의 차이는?', answer: '벡터는 수학적 곡선(확대 가능), 래스터는 픽셀 기반(확대시 깨짐)', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 벡터 그래픽과 래스터 그래픽의 차이는?\n\n다음 순서로 설명해주세요:\n1. 각 그래픽 유형의 원리\n2. 장단점 비교\n3. 적합한 사용 분야\n4. 대표 파일 형식\n5. 연습문제 3개' },
        { id: 49, question: '그래픽 디자인 소프트웨어의 종류는?', answer: 'Illustrator(벡터), Photoshop(이미지), InDesign(편집)', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 그래픽 디자인 소프트웨어의 종류는?\n\n다음 순서로 설명해주세요:\n1. 주요 소프트웨어와 용도\n2. Adobe 제품군 특징\n3. 대안 소프트웨어 (Figma, Sketch 등)\n4. 소프트웨어 선택 기준\n5. 연습문제 3개' },
        { id: 50, question: '디자인 윤리의 중요성은?', answer: '사회적 책임, 정직한 표현, 표절 금지, 환경 고려', prompt: '시각디자인산업기사 디자인일반 문제입니다.\n\n문제: 디자인 윤리의 중요성은?\n\n다음 순서로 설명해주세요:\n1. 디자인 윤리의 정의\n2. 디자이너의 사회적 책임\n3. 윤리적 딜레마 사례\n4. 윤리적 디자인 실천 방법\n5. 연습문제 3개' },
      ]
    },
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  const toggleTopic = (topicId: number) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleQuestion = (questionId: number) => {
    setCompletedQuestions(prev =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design" className="text-gray-500 hover:text-gray-700">디자인</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design/visual-design-technician" className="text-gray-500 hover:text-gray-700">시각디자인산업기사</Link>
          <span className="text-gray-400">/</span>
          <span className="text-purple-600 font-medium">디자인일반</span>
        </nav>

        {/* Title Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-3xl">
                🎯
              </div>
              <div>
                <h1 className="text-2xl font-bold">디자인일반</h1>
                <p className="text-purple-100">디자인 역사, 원리, 방법론</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">학습 진행률</span>
              <span className="font-bold text-purple-600">{completedQuestions.length}/{totalQuestions} ({progress}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">{topic.name}</h3>
                    <p className="text-sm text-gray-500">{topic.questions.length}문항</p>
                  </div>
                </div>
                <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            completedQuestions.includes(q.id)
                              ? 'bg-purple-500 border-purple-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                            Q{q.id}. {q.question}
                          </p>
                          <p className="text-purple-600 text-sm mt-1">A. {q.answer}</p>
                          <button
                            onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="mt-2 px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition"
                          >
                            🤖 AI에게 자세히 물어보기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/category/design/visual-design-technician"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl shadow hover:shadow-md transition"
          >
            ← 시각디자인산업기사 메인으로
          </Link>
        </div>
      </div>

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
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
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
      <footer className="max-w-4xl mx-auto px-4 py-8 mt-8">
        <div className="text-center text-gray-500 text-sm">
          <p>© 2026 자격증 가이드. 디자인일반 학습 화이팅! 🎯</p>
        </div>
      </footer>
    </div>
  );
}
