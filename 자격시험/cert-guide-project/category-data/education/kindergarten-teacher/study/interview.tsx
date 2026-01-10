'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'philosophy',
    name: '교직관 및 교육철학',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '유치원 교사가 된 동기를 말씀해 주세요.', answer: '유아기 중요성, 성장 지원 보람, 교육 열정', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 유치원 교사가 된 동기를 말씀해 주세요.\n\n답변 준비 가이드:\n1. 유아기의 중요성에 대한 인식\n2. 유아의 성장을 돕는 보람\n3. 교육에 대한 열정\n4. 구체적인 경험 (실습, 봉사 등)\n5. 교사로서의 각오\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 2, question: '좋은 유치원 교사란 무엇이라고 생각하십니까?', answer: '유아 존중, 전문성, 소통, 성찰', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 좋은 유치원 교사란 무엇이라고 생각하십니까?\n\n답변 준비 가이드:\n1. 유아를 존중하고 이해하는 교사\n2. 전문성을 갖춘 교사\n3. 소통과 협력을 중시하는 교사\n4. 끊임없이 성찰하는 교사\n5. 구체적 실천 방안\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 3, question: '유아중심·놀이중심 교육과정에 대해 어떻게 생각하십니까?', answer: '유아 주도성, 놀이 가치, 교사 역할', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 유아중심·놀이중심 교육과정에 대해 어떻게 생각하십니까?\n\n답변 준비 가이드:\n1. 유아중심의 의미와 가치\n2. 놀이를 통한 배움\n3. 교사의 관찰과 지원 역할\n4. 2019 개정 누리과정의 철학\n5. 실천 의지\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 4, question: '교사로서 가장 중요하게 생각하는 가치는 무엇입니까?', answer: '존중, 사랑, 책임감, 전문성', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 교사로서 가장 중요하게 생각하는 가치는 무엇입니까?\n\n답변 준비 가이드:\n1. 핵심 가치 제시 (존중, 사랑, 책임감 등)\n2. 그 가치를 선택한 이유\n3. 구체적 실천 사례\n4. 교육 현장에서의 적용\n5. 다짐\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 5, question: '10년 후 자신의 교사상을 말씀해 주세요.', answer: '전문성 신장, 배움의 공동체, 리더십', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 10년 후 자신의 교사상을 말씀해 주세요.\n\n답변 준비 가이드:\n1. 전문성을 갖춘 교사\n2. 동료와 함께 성장하는 교사\n3. 유아와 학부모에게 신뢰받는 교사\n4. 지역사회에 기여하는 교사\n5. 구체적 계획\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' }
    ]
  },
  {
    id: 'situation',
    name: '교육 상황 대처',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '공격적인 행동을 보이는 유아를 어떻게 지도하시겠습니까?', answer: '원인 파악, 대체행동 지도, 일관성, 부모 협력', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 공격적인 행동을 보이는 유아를 어떻게 지도하시겠습니까?\n\n답변 준비 가이드:\n1. 행동의 원인 파악 (관찰, 면담)\n2. 대체 행동 지도\n3. 일관된 규칙 적용\n4. 긍정적 행동 강화\n5. 부모와의 협력\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 2, question: '친구들과 어울리지 못하고 혼자 있는 유아를 어떻게 도와주시겠습니까?', answer: '관찰, 사회성 지원, 또래 연결, 작은 성공 경험', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 친구들과 어울리지 못하고 혼자 있는 유아를 어떻게 도와주시겠습니까?\n\n답변 준비 가이드:\n1. 유아 행동 관찰 및 원인 파악\n2. 사회성 기술 지도\n3. 또래와의 자연스러운 연결\n4. 작은 성공 경험 제공\n5. 강점 발견 및 격려\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 3, question: '부모가 과잉보호를 하여 유아의 자립심이 부족합니다. 어떻게 하시겠습니까?', answer: '유아 자립심 지원, 부모 상담, 협력적 해결', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 부모가 과잉보호를 하여 유아의 자립심이 부족합니다. 어떻게 하시겠습니까?\n\n답변 준비 가이드:\n1. 유치원에서 자립심 기르기 (스스로 하기)\n2. 부모와의 신뢰 형성\n3. 관찰 내용 공유 및 상담\n4. 가정 연계 방안 제안\n5. 점진적 변화 지원\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 4, question: '놀이 시간에 위험한 행동을 하는 유아가 있습니다. 어떻게 대처하시겠습니까?', answer: '즉시 중지, 안전 교육, 대체 방법 제시', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 놀이 시간에 위험한 행동을 하는 유아가 있습니다. 어떻게 대처하시겠습니까?\n\n답변 준비 가이드:\n1. 위험 행동 즉시 중지\n2. 안전의 중요성 교육\n3. 안전한 대체 방법 제시\n4. 환경 점검 및 개선\n5. 지속적 관찰과 지도\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 5, question: '유아가 거짓말을 했습니다. 어떻게 지도하시겠습니까?', answer: '발달적 이해, 공감, 솔직함의 가치 교육', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 유아가 거짓말을 했습니다. 어떻게 지도하시겠습니까?\n\n답변 준비 가이드:\n1. 유아기 거짓말의 발달적 특성 이해\n2. 유아의 마음 공감하기\n3. 솔직함의 가치 교육\n4. 처벌보다는 관계적 접근\n5. 신뢰 형성\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' }
    ]
  },
  {
    id: 'parents',
    name: '학부모 관계',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '학부모가 교사의 지도 방식에 불만을 제기했습니다. 어떻게 대응하시겠습니까?', answer: '경청, 설명, 협력적 해결, 개선 노력', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 학부모가 교사의 지도 방식에 불만을 제기했습니다. 어떻게 대응하시겠습니까?\n\n답변 준비 가이드:\n1. 학부모 의견 경청\n2. 교육적 의도 설명\n3. 오해 부분 소통\n4. 협력적 해결 방안 모색\n5. 개선 노력 및 성찰\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 2, question: '학부모가 자녀에게만 특별한 관심을 요구합니다. 어떻게 하시겠습니까?', answer: '공정성, 이해, 모든 유아 존중, 개별 배려', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 학부모가 자녀에게만 특별한 관심을 요구합니다. 어떻게 하시겠습니까?\n\n답변 준비 가이드:\n1. 학부모 마음 이해\n2. 모든 유아에 대한 공정한 교육\n3. 개별 유아의 특성 존중\n4. 관찰 내용 공유로 안심시키기\n5. 신뢰 관계 형성\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 3, question: '학부모가 다른 유아의 문제행동에 대해 불만을 제기했습니다.', answer: '공감, 비밀 보장, 학급 운영 설명, 협력', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 학부모가 다른 유아의 문제행동에 대해 불만을 제기했습니다.\n\n답변 준비 가이드:\n1. 학부모의 걱정 공감\n2. 다른 유아 정보는 비밀 보장\n3. 학급 운영 원칙 설명\n4. 안전하고 긍정적 환경 조성 노력 전달\n5. 협력 요청\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 4, question: '학부모가 과제를 너무 많이 낸다고 불만을 제기했습니다.', answer: '경청, 교육 목적 설명, 조정, 가정 상황 고려', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 학부모가 과제를 너무 많이 낸다고 불만을 제기했습니다.\n\n답변 준비 가이드:\n1. 학부모 의견 경청\n2. 과제의 교육적 목적 설명\n3. 유아·놀이중심 교육과정 안내\n4. 가정 상황 고려한 조정\n5. 협력적 소통\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 5, question: '효과적인 학부모 상담을 위해 어떻게 준비하시겠습니까?', answer: '관찰 기록, 긍정적 태도, 경청, 협력적 분위기', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 효과적인 학부모 상담을 위해 어떻게 준비하시겠습니까?\n\n답변 준비 가이드:\n1. 관찰 기록 및 포트폴리오 준비\n2. 긍정적 측면 먼저 전달\n3. 경청하는 태도\n4. 협력적 분위기 조성\n5. 구체적 개선 방안 함께 모색\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' }
    ]
  },
  {
    id: 'professionalism',
    name: '전문성 및 자기계발',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '교사로서 전문성 향상을 위해 어떤 노력을 하시겠습니까?', answer: '연수, 연구, 동료 협력, 성찰', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 교사로서 전문성 향상을 위해 어떤 노력을 하시겠습니까?\n\n답변 준비 가이드:\n1. 연수 및 자격 연수 참여\n2. 교육 관련 연구 및 독서\n3. 동료 교사와의 협력 학습\n4. 수업 성찰 및 개선\n5. 최신 교육 동향 파악\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 2, question: '동료 교사와의 협력이 중요한 이유는 무엇입니까?', answer: '전문적 학습공동체, 상호 성장, 교육 질 향상', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 동료 교사와의 협력이 중요한 이유는 무엇입니까?\n\n답변 준비 가이드:\n1. 전문적 학습공동체 형성\n2. 서로의 강점 공유\n3. 문제 해결의 다양한 관점\n4. 교육 질 향상\n5. 협력 실천 의지\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 3, question: '교육실습 중 가장 어려웠던 점과 극복 방법을 말씀해 주세요.', answer: '구체적 사례, 노력, 배움, 성장', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 교육실습 중 가장 어려웠던 점과 극복 방법을 말씀해 주세요.\n\n답변 준비 가이드:\n1. 구체적 어려움 제시\n2. 극복을 위한 노력\n3. 지도교사 및 동료의 도움\n4. 배운 점\n5. 교사로서의 성장\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 4, question: '최근 읽은 교육 관련 책이나 논문에 대해 말씀해 주세요.', answer: '책 내용, 인상 깊은 부분, 적용 계획', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 최근 읽은 교육 관련 책이나 논문에 대해 말씀해 주세요.\n\n답변 준비 가이드:\n1. 책이나 논문 소개\n2. 주요 내용\n3. 인상 깊었던 부분\n4. 교육 현장 적용 계획\n5. 지속적 학습 의지\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 5, question: '교사로서 스트레스 관리는 어떻게 하시겠습니까?', answer: '자기 돌봄, 워라밸, 긍정적 마인드, 지지체계', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 교사로서 스트레스 관리는 어떻게 하시겠습니까?\n\n답변 준비 가이드:\n1. 자기 돌봄의 중요성 인식\n2. 일과 생활의 균형\n3. 긍정적 마인드 유지\n4. 동료 교사와의 지지체계\n5. 건강한 교사, 행복한 유아\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' }
    ]
  },
  {
    id: 'recent',
    name: '최근 교육 이슈',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '유아 인권 존중에 대해 어떻게 생각하십니까?', answer: '존중, 경청, 권리 보호, 실천', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 유아 인권 존중에 대해 어떻게 생각하십니까?\n\n답변 준비 가이드:\n1. 유아 인권의 중요성\n2. 유아의 목소리 경청\n3. 체벌 금지 및 권리 보호\n4. 일상 속 인권 존중 실천\n5. 교사의 역할과 책임\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 2, question: '아동학대 예방을 위해 교사는 어떤 역할을 해야 합니까?', answer: '조기 발견, 신고 의무, 예방교육, 보호', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 아동학대 예방을 위해 교사는 어떤 역할을 해야 합니까?\n\n답변 준비 가이드:\n1. 학대 징후 조기 발견\n2. 신고 의무자로서의 책임\n3. 유아 대상 예방교육\n4. 안전하고 보호적인 환경 조성\n5. 학부모 지원 및 연계\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 3, question: '디지털 시대 유아교육은 어떻게 변화해야 한다고 생각하십니까?', answer: '디지털 리터러시, 균형, 창의성, 인성', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 디지털 시대 유아교육은 어떻게 변화해야 한다고 생각하십니까?\n\n답변 준비 가이드:\n1. 디지털 리터러시 교육\n2. 디지털 기기 과의존 예방\n3. 놀이와 직접 경험의 중요성\n4. 창의성과 인성 교육\n5. 균형 잡힌 접근\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 4, question: '다문화 유아 교육에 대해 어떻게 생각하십니까?', answer: '다양성 존중, 편견 없는 교육, 통합, 가족 존중', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 다문화 유아 교육에 대해 어떻게 생각하십니까?\n\n답변 준비 가이드:\n1. 문화적 다양성 존중\n2. 편견 없는 교육\n3. 자연스러운 통합 지원\n4. 다문화 가족 존중\n5. 모든 유아에게 다문화 교육\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' },
      { id: 5, question: '공립유치원 교사로서의 공직자 윤리에 대해 말씀해 주세요.', answer: '봉사정신, 책임감, 청렴, 전문성', prompt: '유치원 임용시험 2차 면접 문제입니다.\n\n문제: 공립유치원 교사로서의 공직자 윤리에 대해 말씀해 주세요.\n\n답변 준비 가이드:\n1. 전체 봉사자로서의 자세\n2. 책임감과 사명감\n3. 청렴과 공정성\n4. 전문성과 품위 유지\n5. 실천 의지\n\n모범 답변 작성 및 유사 문제 2개를 만들어주세요.' }
    ]
  }
];

export default function InterviewStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('kindergarten-teacher-interview-progress');
    if (saved) {
      const arr = JSON.parse(saved);
      const obj: Record<string, boolean> = {};
      arr.forEach((key: string) => { obj[key] = true; });
      setCompletedQuestions(obj);
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    const arr = Object.keys(newCompleted).filter(k => newCompleted[k]);
    localStorage.setItem('kindergarten-teacher-interview-progress', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-indigo-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/kindergarten-teacher" className="text-gray-600 hover:text-indigo-600">유치원정교사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">면접</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎯</span>
            <h1 className="text-2xl font-bold text-gray-800">면접 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">유치원 임용시험 2차 - 교직 인성 및 상황 대처 능력</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">({getCompletedCount(topic.id)}/{topic.questions.length})</span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '▲' : '▼'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => {
                    const key = `${topic.id}-${q.id}`;
                    const isCompleted = completedQuestions[key];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-pink-50 border-pink-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>답변 키워드:</strong> {q.answer}</p>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">
                            🧡 Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            💚 ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            💙 Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-pink-500 text-white hover:bg-pink-600'}`}>
                            {isCompleted ? '완료 취소' : '✓ 완료'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
