'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SecretaryBasicStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'secretary-concept',
      name: '비서의 개념',
      icon: '📋',
      questions: [
        { id: 1, q: '비서의 정의를 설명하시오.', a: '상사의 업무를 보좌하고 사무를 지원하는 전문가' },
        { id: 2, q: '비서의 역할을 설명하시오.', a: '업무보좌, 일정관리, 문서처리, 내외부 연락' },
        { id: 3, q: '개인비서의 특징을 설명하시오.', a: '특정 상사 1인을 전담하여 보좌' },
        { id: 4, q: '그룹비서의 특징을 설명하시오.', a: '여러 상사 또는 부서를 함께 보좌' },
        { id: 5, q: '비서직의 발전과정을 설명하시오.', a: '타자, 속기 → 사무보조 → 경영지원 전문가' },
        { id: 6, q: '비서의 업무 범위를 설명하시오.', a: '정형업무(일상반복)와 비정형업무(상황대처)' },
        { id: 7, q: '비서의 직무분석을 설명하시오.', a: '업무내용, 책임범위, 필요능력 파악' },
        { id: 8, q: '비서의 근무형태를 설명하시오.', a: '정규직, 계약직, 파견직 등' },
        { id: 9, q: '법률비서의 특징을 설명하시오.', a: '법률사무소에서 변호사 업무 보좌' },
        { id: 10, q: '의료비서의 특징을 설명하시오.', a: '병원에서 의사 업무 및 환자 응대 보좌' }
      ]
    },
    {
      id: 'secretary-quality',
      name: '비서의 자질',
      icon: '⭐',
      questions: [
        { id: 1, q: '비서의 인성적 자질을 설명하시오.', a: '성실성, 책임감, 신뢰성, 융통성' },
        { id: 2, q: '비서의 업무적 자질을 설명하시오.', a: '전문지식, 기획력, 문제해결력' },
        { id: 3, q: '비서의 대인관계 자질을 설명하시오.', a: '의사소통, 협조성, 친화력' },
        { id: 4, q: '성실성의 중요성을 설명하시오.', a: '맡은 업무를 정확하게 수행하는 태도' },
        { id: 5, q: '책임감의 중요성을 설명하시오.', a: '업무 결과에 대해 끝까지 책임지는 자세' },
        { id: 6, q: '신뢰성의 중요성을 설명하시오.', a: '기밀유지, 약속이행으로 신뢰 구축' },
        { id: 7, q: '융통성의 중요성을 설명하시오.', a: '상황에 따라 유연하게 대처하는 능력' },
        { id: 8, q: '적극성의 중요성을 설명하시오.', a: '능동적으로 업무를 찾아 처리하는 자세' },
        { id: 9, q: '인내심의 중요성을 설명하시오.', a: '어려운 상황에서도 침착하게 대응' },
        { id: 10, q: '비서의 이미지 관리를 설명하시오.', a: '복장, 용모, 언행을 통한 전문성 표현' }
      ]
    },
    {
      id: 'secretary-ethics',
      name: '직업윤리',
      icon: '⚖️',
      questions: [
        { id: 1, q: '비서의 직업윤리를 설명하시오.', a: '기밀유지, 정직, 충성, 전문성 유지' },
        { id: 2, q: '기밀유지의 중요성을 설명하시오.', a: '업무상 알게 된 정보를 외부에 누설하지 않음' },
        { id: 3, q: '충성심의 의미를 설명하시오.', a: '상사와 회사에 대한 헌신적 태도' },
        { id: 4, q: '정직의 중요성을 설명하시오.', a: '업무처리 시 거짓 없이 사실대로 보고' },
        { id: 5, q: '공정성의 의미를 설명하시오.', a: '편파적이지 않은 균형 잡힌 업무처리' },
        { id: 6, q: '전문성 유지를 설명하시오.', a: '지속적인 자기계발과 역량 향상' },
        { id: 7, q: '이해충돌 상황을 설명하시오.', a: '개인이익과 회사이익이 충돌하는 경우' },
        { id: 8, q: '이해충돌 대처방법을 설명하시오.', a: '회사이익 우선, 상사에게 보고' },
        { id: 9, q: '업무태도의 기본을 설명하시오.', a: '적극적, 신속정확, 협조적 자세' },
        { id: 10, q: '비서의 의무를 설명하시오.', a: '성실의무, 복종의무, 비밀유지의무' }
      ]
    },
    {
      id: 'basic-tasks',
      name: '기본 업무',
      icon: '📁',
      questions: [
        { id: 1, q: '일정관리의 기본을 설명하시오.', a: '상사 스케줄 파악, 조정, 알림' },
        { id: 2, q: '전화업무의 기본을 설명하시오.', a: '수신, 발신, 메모, 전달' },
        { id: 3, q: '문서관리의 기본을 설명하시오.', a: '문서작성, 분류, 보관, 폐기' },
        { id: 4, q: '방문객 응대의 기본을 설명하시오.', a: '맞이, 안내, 대기, 배웅' },
        { id: 5, q: '우편물 처리를 설명하시오.', a: '수신, 분류, 배포, 발송' },
        { id: 6, q: '사무용품 관리를 설명하시오.', a: '재고파악, 주문, 배분, 정리' },
        { id: 7, q: '회의준비의 기본을 설명하시오.', a: '장소예약, 자료준비, 참석자 확인' },
        { id: 8, q: '출장업무의 기본을 설명하시오.', a: '교통, 숙박 예약, 일정표 작성' },
        { id: 9, q: '경비처리의 기본을 설명하시오.', a: '영수증 정리, 지출내역 기록' },
        { id: 10, q: '보고업무의 기본을 설명하시오.', a: '업무진행상황 및 결과 보고' }
      ]
    },
    {
      id: 'work-attitude',
      name: '업무태도',
      icon: '💼',
      questions: [
        { id: 1, q: '시간관리의 중요성을 설명하시오.', a: '업무효율 향상, 마감 준수' },
        { id: 2, q: '우선순위 설정을 설명하시오.', a: '긴급도와 중요도에 따라 업무 순서 결정' },
        { id: 3, q: '업무계획 수립을 설명하시오.', a: '일일/주간/월간 계획 작성' },
        { id: 4, q: '업무보고 방법을 설명하시오.', a: '결론부터, 간결하게, 정확하게' },
        { id: 5, q: '지시받는 자세를 설명하시오.', a: '경청, 메모, 확인, 실행' },
        { id: 6, q: '업무 협조 자세를 설명하시오.', a: '타 부서와 원활한 소통과 협력' },
        { id: 7, q: '문제해결 자세를 설명하시오.', a: '원인파악 → 대안모색 → 실행' },
        { id: 8, q: '자기계발의 중요성을 설명하시오.', a: '업무역량 향상을 위한 지속 학습' },
        { id: 9, q: '스트레스 관리를 설명하시오.', a: '긍정적 마인드, 적절한 휴식' },
        { id: 10, q: '팀워크의 중요성을 설명하시오.', a: '협력을 통한 시너지 효과 창출' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('secretary-3-basic-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('secretary-3-basic-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const getTopicProgress = (topicId: string, questionCount: number) => {
    let completed = 0;
    for (let i = 1; i <= questionCount; i++) {
      if (completedQuestions[`${topicId}-${i}`]) completed++;
    }
    return completed;
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;

  const handleAskAI = (question: string) => {
    const prompt = `비서 3급 - 비서기초 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/office/secretary-3" className="text-violet-600 hover:text-violet-800 flex items-center gap-2">
            ← 비서 3급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📋 비서기초</h1>
          <p className="text-gray-600 mb-4">비서 개념, 역할, 자질, 윤리</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-4 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
            </div>
            <span className="text-sm font-medium text-gray-600">{totalCompleted} / {totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => {
            const progress = getTopicProgress(topic.id, topic.questions.length);
            const isExpanded = expandedTopics[topic.id];
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={() => toggleTopic(topic.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <span className="font-semibold text-gray-800">{topic.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{progress}/{topic.questions.length}</span>
                    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-6 pb-4 space-y-3">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-violet-300'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>{isCompleted && '✓'}</button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button onClick={() => handleAskAI(q.q)} className="mt-2 text-sm text-violet-600 hover:text-violet-800 flex items-center gap-1">🤖 AI에게 자세히 물어보기</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                  <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
                </div>
                <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
                <div className="space-y-3">
                  <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                    <span className="text-2xl">🧡</span>
                    <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                  </a>
                  <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                    <span className="text-2xl">💚</span>
                    <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                  </a>
                  <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                    <span className="text-2xl">💙</span>
                    <div className="text-left"><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
