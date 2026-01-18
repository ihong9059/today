'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function InstructionMethodStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['topic1']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-2-instruction-method-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-instructor-2-instruction-method-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(t => t !== topicId) : [...prev, topicId]
    );
  };

  const topics = [
    {
      id: 'topic1',
      title: '청소년지도의 개념',
      icon: '📚',
      questions: [
        { id: 1, question: '청소년지도의 정의를 설명하시오.', answer: '청소년의 균형 있는 성장을 돕기 위해 전문적으로 지원하는 활동', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년지도의 정의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 청소년지도의 목적\n3. 지도와 교육의 차이\n4. 지도의 특성\n5. 연습문제 3개' },
        { id: 2, question: '청소년지도의 3대 원리는?', answer: '자발성의 원리, 자치활동의 원리, 현장체험의 원리', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년지도의 3대 원리는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 원리의 상세 설명\n3. 실제 적용 사례\n4. 원리 간 관계\n5. 연습문제 3개' },
        { id: 3, question: '청소년지도의 특성 4가지를 설명하시오.', answer: '자발성, 다양성, 융통성, 민주성', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년지도의 특성 4가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 특성의 의미\n3. 학교교육과의 비교\n4. 현장 적용 예시\n5. 연습문제 3개' },
        { id: 4, question: '형식교육과 비형식교육의 차이점은?', answer: '형식교육은 학교 중심의 체계적 교육, 비형식교육은 학교 밖 다양한 교육', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 형식교육과 비형식교육의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각각의 특성\n3. 청소년활동과의 관계\n4. 상호보완적 역할\n5. 연습문제 3개' },
        { id: 5, question: '체험학습의 정의와 특성을 설명하시오.', answer: '직접 경험을 통해 배움을 얻는 학습 방식', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 체험학습의 정의와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 체험학습의 이론적 배경\n3. 청소년활동에서의 적용\n4. 효과와 한계\n5. 연습문제 3개' },
        { id: 6, question: '콜브(Kolb)의 경험학습 4단계는?', answer: '구체적 경험 → 반성적 관찰 → 추상적 개념화 → 능동적 실험', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 콜브의 경험학습 4단계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 단계의 상세 설명\n3. 학습자 유형\n4. 프로그램 적용 방법\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic2',
      title: '청소년지도사의 역할',
      icon: '👨‍🏫',
      questions: [
        { id: 7, question: '청소년지도사의 주요 역할 5가지는?', answer: '기획자, 교수자, 상담자, 촉진자, 관리자', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년지도사의 주요 역할 5가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 역할의 내용\n3. 상황별 역할 수행\n4. 역할 간 균형\n5. 연습문제 3개' },
        { id: 8, question: '청소년지도사에게 필요한 핵심 역량 3가지는?', answer: '지식, 기술, 태도', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년지도사에게 필요한 핵심 역량 3가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 역량의 세부 요소\n3. 역량 개발 방법\n4. 현장 적용\n5. 연습문제 3개' },
        { id: 9, question: '촉진자(facilitator)로서 청소년지도사의 역할은?', answer: '청소년의 자발적 참여와 학습을 돕는 조력자', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 촉진자로서 청소년지도사의 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 촉진 기법\n3. 지시적 역할과의 차이\n4. 실제 적용 사례\n5. 연습문제 3개' },
        { id: 10, question: '청소년지도사 윤리강령의 주요 내용은?', answer: '청소년 존중, 전문성 유지, 비밀보장, 사회적 책임', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년지도사 윤리강령의 주요 내용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 윤리강령 조항\n3. 윤리적 딜레마 상황\n4. 실천 방안\n5. 연습문제 3개' },
        { id: 11, question: '청소년지도사의 전문성 개발을 위한 방법은?', answer: '보수교육, 수퍼비전, 자기성찰, 연구활동', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년지도사의 전문성 개발을 위한 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 방법의 내용\n3. 효과적인 전문성 개발\n4. 기관 지원 방안\n5. 연습문제 3개' },
        { id: 12, question: '청소년지도사 보수교육의 주기와 시간은?', answer: '3년마다 40시간 이상', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년지도사 보수교육의 주기와 시간은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 보수교육 내용\n3. 이수 방법\n4. 미이수 시 조치\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic3',
      title: '프로그램 기획',
      icon: '📝',
      questions: [
        { id: 13, question: '청소년 프로그램 기획의 5단계는?', answer: '요구분석 → 목표설정 → 내용구성 → 실행 → 평가', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년 프로그램 기획의 5단계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 단계의 세부 내용\n3. 단계별 주의사항\n4. 실제 적용 예시\n5. 연습문제 3개' },
        { id: 14, question: '요구분석(needs assessment)의 방법 3가지는?', answer: '설문조사, 면접, 문헌조사', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 요구분석의 방법 3가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 방법의 특성\n3. 적용 상황\n4. 장단점 비교\n5. 연습문제 3개' },
        { id: 15, question: 'SMART 목표의 구성요소를 설명하시오.', answer: 'Specific(구체적), Measurable(측정가능), Achievable(달성가능), Relevant(관련성), Time-bound(기한)', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: SMART 목표의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 요소의 상세 설명\n3. SMART 목표 작성 예시\n4. 청소년 프로그램 적용\n5. 연습문제 3개' },
        { id: 16, question: '프로그램 목표와 목적의 차이는?', answer: '목적은 궁극적 방향, 목표는 구체적 달성 기준', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 프로그램 목표와 목적의 차이는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 목적과 목표의 관계\n3. 작성 방법\n4. 예시\n5. 연습문제 3개' },
        { id: 17, question: '논리모형(Logic Model)의 구성요소는?', answer: '투입 → 활동 → 산출 → 성과(단기/중기/장기)', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 논리모형의 구성요소는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 구성요소 설명\n3. 논리모형 작성법\n4. 활용 방안\n5. 연습문제 3개' },
        { id: 18, question: '프로그램 예산 편성 시 고려해야 할 비용 항목은?', answer: '인건비, 사업비, 운영비, 예비비', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 프로그램 예산 편성 시 고려해야 할 비용 항목은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 비용 항목의 내용\n3. 예산 편성 원칙\n4. 예산 관리 방법\n5. 연습문제 3개' },
        { id: 19, question: 'SWOT 분석의 4가지 요소는?', answer: '강점(Strengths), 약점(Weaknesses), 기회(Opportunities), 위협(Threats)', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: SWOT 분석의 4가지 요소는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 요소의 분석 방법\n3. 전략 수립 방법\n4. 프로그램 기획 적용\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic4',
      title: '프로그램 운영',
      icon: '⚙️',
      questions: [
        { id: 20, question: '프로그램 홍보 방법을 나열하시오.', answer: 'SNS, 웹사이트, 포스터, 언론보도, 학교 연계', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 프로그램 홍보 방법을 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 홍보 방법의 특성\n3. 대상별 효과적 홍보\n4. 홍보 전략 수립\n5. 연습문제 3개' },
        { id: 21, question: '프로그램 참가자 모집 시 고려사항은?', answer: '대상 연령, 정원, 참가비, 일정, 장소', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 프로그램 참가자 모집 시 고려사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 모집 절차\n3. 선발 기준\n4. 유의사항\n5. 연습문제 3개' },
        { id: 22, question: '프로그램 진행 시 지도자의 역할은?', answer: '안전관리, 동기부여, 갈등조정, 분위기 조성', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 프로그램 진행 시 지도자의 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상황별 역할 수행\n3. 효과적인 진행 기법\n4. 문제 상황 대처\n5. 연습문제 3개' },
        { id: 23, question: '청소년 프로그램의 안전관리 원칙은?', answer: '사전예방, 위험요소 제거, 응급처치 준비, 보험가입', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년 프로그램의 안전관리 원칙은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 안전관리 체크리스트\n3. 사고 발생 시 대응\n4. 안전교육 방법\n5. 연습문제 3개' },
        { id: 24, question: '아이스브레이킹(Ice Breaking)의 목적과 방법은?', answer: '참가자 간 긴장 완화와 친밀감 형성', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 아이스브레이킹의 목적과 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 다양한 활동 예시\n3. 상황별 적용\n4. 주의사항\n5. 연습문제 3개' },
        { id: 25, question: '프로그램 중 돌발 상황 대처 방법은?', answer: '침착한 대응, 상황 파악, 대안 실행, 사후 보고', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 프로그램 중 돌발 상황 대처 방법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 돌발 상황 유형\n3. 대처 절차\n4. 사례별 대응\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic5',
      title: '프로그램 평가',
      icon: '📊',
      questions: [
        { id: 26, question: '프로그램 평가의 목적 3가지는?', answer: '효과성 검증, 개선점 도출, 책무성 확보', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 프로그램 평가의 목적 3가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 목적의 상세 설명\n3. 평가 활용 방안\n4. 평가의 중요성\n5. 연습문제 3개' },
        { id: 27, question: '형성평가와 총괄평가의 차이는?', answer: '형성평가는 과정 중 피드백, 총괄평가는 종료 후 성과 측정', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 형성평가와 총괄평가의 차이는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 평가의 특성\n3. 적용 시점\n4. 활용 방법\n5. 연습문제 3개' },
        { id: 28, question: '커크패트릭(Kirkpatrick)의 4단계 평가모형은?', answer: '반응 → 학습 → 행동 → 결과', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 커크패트릭의 4단계 평가모형은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 단계의 평가 내용\n3. 측정 방법\n4. 청소년 프로그램 적용\n5. 연습문제 3개' },
        { id: 29, question: '양적 평가와 질적 평가의 차이는?', answer: '양적 평가는 수치화된 자료, 질적 평가는 심층적 이해', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 양적 평가와 질적 평가의 차이는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 방법의 특성\n3. 자료수집 방법\n4. 통합적 활용\n5. 연습문제 3개' },
        { id: 30, question: '만족도 조사의 설계 시 고려사항은?', answer: '문항 구성, 척도 선정, 조사 시점, 익명성', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 만족도 조사의 설계 시 고려사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 조사지 설계 방법\n3. 분석 방법\n4. 결과 활용\n5. 연습문제 3개' },
        { id: 31, question: '프로그램 평가 결과 보고서에 포함할 내용은?', answer: '사업개요, 운영내용, 평가결과, 개선방안, 첨부자료', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 프로그램 평가 결과 보고서에 포함할 내용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 보고서 구성 요소\n3. 작성 방법\n4. 효과적인 보고\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic6',
      title: '집단지도 기법',
      icon: '👥',
      questions: [
        { id: 32, question: '집단역동(Group Dynamics)의 정의는?', answer: '집단 내 구성원 간 상호작용과 영향력의 과정', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 집단역동의 정의는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 집단역동의 요소\n3. 지도자의 역할\n4. 활용 방법\n5. 연습문제 3개' },
        { id: 33, question: '터크만(Tuckman)의 집단발달 5단계는?', answer: '형성기 → 갈등기 → 규범기 → 수행기 → 해체기', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 터크만의 집단발달 5단계는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 단계의 특성\n3. 단계별 지도 전략\n4. 실제 적용\n5. 연습문제 3개' },
        { id: 34, question: '소집단 활동의 장점 3가지는?', answer: '참여도 증가, 개별화된 피드백, 협동심 향상', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 소집단 활동의 장점 3가지는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 장점의 상세 설명\n3. 효과적인 소집단 구성\n4. 활동 예시\n5. 연습문제 3개' },
        { id: 35, question: '브레인스토밍(Brainstorming)의 4대 원칙은?', answer: '비판 금지, 자유분방, 양산, 결합개선', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 브레인스토밍의 4대 원칙은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 원칙의 의미\n3. 진행 방법\n4. 활용 상황\n5. 연습문제 3개' },
        { id: 36, question: '토의법의 종류를 나열하시오.', answer: '원탁토의, 패널토의, 심포지엄, 포럼, 버즈세션', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 토의법의 종류를 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 토의법의 특성\n3. 적용 상황\n4. 진행 방법\n5. 연습문제 3개' },
        { id: 37, question: '역할극(Role Play)의 교육적 효과는?', answer: '공감능력 향상, 문제해결력 증진, 의사소통 능력 개발', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 역할극의 교육적 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 효과의 상세 설명\n3. 진행 단계\n4. 청소년 활동 적용\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic7',
      title: '개인지도 기법',
      icon: '🧑',
      questions: [
        { id: 38, question: '멘토링(Mentoring)의 정의와 효과는?', answer: '경험자가 미경험자를 지도하고 지원하는 관계', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 멘토링의 정의와 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 멘토링의 유형\n3. 효과적인 멘토링 방법\n4. 청소년 멘토링 프로그램\n5. 연습문제 3개' },
        { id: 39, question: '코칭(Coaching)과 멘토링의 차이점은?', answer: '코칭은 특정 목표 달성 중심, 멘토링은 전인적 성장 지원', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 코칭과 멘토링의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각각의 특성\n3. 적용 상황\n4. 청소년 지도에서의 활용\n5. 연습문제 3개' },
        { id: 40, question: 'GROW 코칭 모델의 구성요소는?', answer: 'Goal(목표), Reality(현실), Options(대안), Will(의지)', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: GROW 코칭 모델의 구성요소는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 요소의 질문\n3. 진행 방법\n4. 청소년 상담 적용\n5. 연습문제 3개' },
        { id: 41, question: '적극적 경청(Active Listening)의 기법은?', answer: '눈 맞춤, 고개 끄덕임, 반영, 요약, 명료화', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 적극적 경청의 기법은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 기법의 상세 설명\n3. 효과\n4. 연습 방법\n5. 연습문제 3개' },
        { id: 42, question: '개별지도 시 유의사항은?', answer: '비밀보장, 존중, 객관성 유지, 의뢰 필요성 판단', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 개별지도 시 유의사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 유의사항 설명\n3. 윤리적 고려\n4. 사례별 대응\n5. 연습문제 3개' },
        { id: 43, question: '또래상담(Peer Counseling)의 정의와 효과는?', answer: '비슷한 연령의 또래가 상담하는 방식', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 또래상담의 정의와 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 또래상담의 장점\n3. 또래상담자 양성\n4. 프로그램 운영\n5. 연습문제 3개' },
      ]
    },
    {
      id: 'topic8',
      title: '청소년 리더십 개발',
      icon: '🌟',
      questions: [
        { id: 44, question: '청소년 리더십의 정의는?', answer: '청소년이 공동체 목표 달성을 위해 영향력을 발휘하는 능력', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년 리더십의 정의는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 리더십의 구성요소\n3. 청소년 리더십 특성\n4. 개발 방법\n5. 연습문제 3개' },
        { id: 45, question: '서번트 리더십(Servant Leadership)의 특성은?', answer: '섬기는 자세, 경청, 공감, 치유, 인식', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 서번트 리더십의 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 그린리프의 이론\n3. 10가지 특성\n4. 청소년 활동 적용\n5. 연습문제 3개' },
        { id: 46, question: '청소년 자치활동의 유형을 나열하시오.', answer: '청소년운영위원회, 청소년참여위원회, 동아리활동', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년 자치활동의 유형을 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 활동의 역할\n3. 운영 방법\n4. 참여 효과\n5. 연습문제 3개' },
        { id: 47, question: '청소년참여예산제의 정의와 효과는?', answer: '청소년이 예산 편성에 직접 참여하는 제도', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년참여예산제의 정의와 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 운영 절차\n3. 참여 효과\n4. 국내외 사례\n5. 연습문제 3개' },
        { id: 48, question: '청소년운영위원회의 역할과 구성은?', answer: '청소년수련시설 운영에 대한 자문·평가, 청소년 10~20명', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년운영위원회의 역할과 구성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 법적 근거\n3. 주요 활동\n4. 운영 방법\n5. 연습문제 3개' },
        { id: 49, question: '청소년 사회참여 활동의 유형은?', answer: '자원봉사, 캠페인, 정책제안, 지역사회 활동', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 청소년 사회참여 활동의 유형은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 활동의 특성\n3. 참여 효과\n4. 지도 방법\n5. 연습문제 3개' },
        { id: 50, question: '리더십 개발 프로그램 설계 시 고려사항은?', answer: '발달 단계, 다양한 경험 제공, 실습 기회, 피드백', prompt: '청소년지도사 2급 청소년지도방법론 문제입니다.\n\n문제: 리더십 개발 프로그램 설계 시 고려사항은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 프로그램 구성 요소\n3. 활동 예시\n4. 효과 측정\n5. 연습문제 3개' },
      ]
    },
  ];

  const allQuestions = topics.flatMap(t => t.questions);
  const progress = (completedQuestions.length / allQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-500 hover:text-gray-700">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-instructor-2" className="text-gray-500 hover:text-gray-700">청소년지도사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">청소년지도방법론</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-4xl">🎓</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">청소년지도방법론</h1>
              <p className="text-blue-100">프로그램 기획, 운영, 평가의 전문 역량</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">학습 진행률</span>
            <span className="text-sm text-blue-600 font-bold">{completedQuestions.length} / {allQuestions.length}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-800">{topic.title}</h3>
                    <p className="text-sm text-gray-500">{topic.questions.filter(q => completedQuestions.includes(q.id)).length} / {topic.questions.length} 완료</p>
                  </div>
                </div>
                <span className={`text-gray-400 transition-transform ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${completedQuestions.includes(q.id) ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 hover:border-blue-500'}`}>
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{q.id}. {q.question}</p>
                          <p className="text-sm text-blue-600 mt-1">💡 {q.answer}</p>
                          <button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition">🤖 AI에게 질문하기</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
