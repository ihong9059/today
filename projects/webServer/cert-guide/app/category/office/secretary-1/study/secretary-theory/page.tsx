'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SecretaryTheoryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'secretary-role',
      name: '비서직의 이해',
      icon: '👩‍💼',
      questions: [
        { id: 1, q: '비서의 정의와 역할을 설명하시오.', a: '경영자 보좌, 업무 지원, 커뮤니케이션 중개, 정보 관리' },
        { id: 2, q: '비서의 유형을 설명하시오.', a: '개인비서, 팀비서, 부서비서, 법률비서, 의료비서' },
        { id: 3, q: '비서의 자질과 역량을 설명하시오.', a: '전문성, 충성심, 비밀유지, 의사소통, 문제해결력' },
        { id: 4, q: '비서의 직업윤리를 설명하시오.', a: '기밀유지, 충성, 성실, 공정성, 전문성 개발' },
        { id: 5, q: '비서직의 발전 과정을 설명하시오.', a: '사무보조→전문비서→경영파트너→전략적 보좌' },
        { id: 6, q: '비서와 상사의 관계를 설명하시오.', a: '신뢰관계, 업무 스타일 파악, 보완적 역할' },
        { id: 7, q: '비서의 경력개발을 설명하시오.', a: '전문성 강화, 자격증 취득, 네트워킹, 교육' },
        { id: 8, q: '글로벌 비서의 역량을 설명하시오.', a: '외국어, 이문화 이해, 국제 비즈니스 매너' },
        { id: 9, q: '비서실의 조직 내 위치를 설명하시오.', a: '스태프 조직, CEO 직속, 수평적 협력' },
        { id: 10, q: '비서직의 미래 전망을 설명하시오.', a: 'AI 활용, 전략적 역할 강화, 전문화' }
      ]
    },
    {
      id: 'schedule-mgmt',
      name: '일정관리',
      icon: '📅',
      questions: [
        { id: 1, q: '일정관리의 중요성을 설명하시오.', a: '시간 효율화, 업무 우선순위, 생산성 향상' },
        { id: 2, q: '일정표 작성 원칙을 설명하시오.', a: '정확성, 유연성, 우선순위, 여유시간 확보' },
        { id: 3, q: '일정 조정 방법을 설명하시오.', a: '우선순위 판단, 관련자 협의, 대안 제시' },
        { id: 4, q: '전자 일정관리 도구를 설명하시오.', a: 'Outlook, Google Calendar, 사내 그룹웨어' },
        { id: 5, q: '정기 일정과 비정기 일정을 설명하시오.', a: '정기: 회의/보고, 비정기: 출장/면담/행사' },
        { id: 6, q: '일정 충돌 시 대처 방법을 설명하시오.', a: '우선순위 확인, 상사 판단 요청, 조정 협의' },
        { id: 7, q: '일일/주간/월간 일정관리를 설명하시오.', a: '일일 체크리스트, 주간 계획, 월간 주요일정' },
        { id: 8, q: '외부 약속 관리 방법을 설명하시오.', a: '장소/시간 확인, 참석자 연락, 사전 준비' },
        { id: 9, q: '일정 공유와 보안을 설명하시오.', a: '공개범위 설정, 민감 일정 보호' },
        { id: 10, q: '일정 리마인더 설정을 설명하시오.', a: '사전 알림, 준비사항 체크, 이동시간 고려' }
      ]
    },
    {
      id: 'travel-mgmt',
      name: '출장관리',
      icon: '✈️',
      questions: [
        { id: 1, q: '출장 계획 수립 절차를 설명하시오.', a: '목적/일정/경비 확인, 교통/숙박 예약' },
        { id: 2, q: '항공권 예약 시 고려사항을 설명하시오.', a: '직항/경유, 좌석 등급, 시간대, 마일리지' },
        { id: 3, q: '호텔 예약 시 확인사항을 설명하시오.', a: '위치, 시설, 체크인/아웃, 취소정책' },
        { id: 4, q: '출장 서류 준비를 설명하시오.', a: '여권/비자, 출장신청서, 회의자료, 명함' },
        { id: 5, q: '해외 출장 시 비자 관리를 설명하시오.', a: '비자 종류, 신청 기간, 필요 서류' },
        { id: 6, q: '출장 경비 처리 방법을 설명하시오.', a: '법인카드, 가불금, 정산, 영수증 관리' },
        { id: 7, q: '출장 일정표(Itinerary) 작성을 설명하시오.', a: '시간대별 일정, 연락처, 주소, 비고사항' },
        { id: 8, q: '출장 중 비상상황 대응을 설명하시오.', a: '비상연락처, 보험, 대사관 연락처' },
        { id: 9, q: '출장 후 업무 처리를 설명하시오.', a: '출장보고서, 경비정산, 후속조치' },
        { id: 10, q: '온라인 출장(화상회의)을 설명하시오.', a: 'Zoom, Teams, 사전 테스트, 자료 공유' }
      ]
    },
    {
      id: 'protocol',
      name: '의전과 프로토콜',
      icon: '🎩',
      questions: [
        { id: 1, q: '의전(Protocol)의 정의를 설명하시오.', a: '공식 행사의 절차와 예절, 의례적 관행' },
        { id: 2, q: '좌석 배치 원칙을 설명하시오.', a: '상석 기준, 직급/연령/성별, 문화적 차이' },
        { id: 3, q: '명함 교환 예절을 설명하시오.', a: '두 손 전달, 받은 명함 확인, 테이블 배치' },
        { id: 4, q: '소개 순서를 설명하시오.', a: '하위→상위, 내부→외부, 젊은→연장자' },
        { id: 5, q: '국기 게양 순서를 설명하시오.', a: '자국기 우선, 알파벳/가나다 순' },
        { id: 6, q: '공식 만찬 좌석 배치를 설명하시오.', a: '호스트 기준, 주빈 우측, 교차 배치' },
        { id: 7, q: 'VIP 영접 절차를 설명하시오.', a: '출영접, 의전차량, 수행원 배치' },
        { id: 8, q: '국제 비즈니스 에티켓을 설명하시오.', a: '문화별 인사법, 선물, 식사 예절' },
        { id: 9, q: '경조사 의전을 설명하시오.', a: '화환/조화, 경조금, 참석 여부 판단' },
        { id: 10, q: '행사 진행 의전을 설명하시오.', a: '식순, 내빈 소개, 기념촬영, 환송' }
      ]
    },
    {
      id: 'communication',
      name: '커뮤니케이션',
      icon: '💬',
      questions: [
        { id: 1, q: '비서의 커뮤니케이션 역할을 설명하시오.', a: '정보 전달, 조정, 갈등 관리, 관계 구축' },
        { id: 2, q: '전화 응대 기본 원칙을 설명하시오.', a: '3콜 내 수신, 밝은 목소리, 메모, 확인' },
        { id: 3, q: '전화 연결/보류/전환을 설명하시오.', a: '양해 구하기, 대기 중 안내, 정확한 전환' },
        { id: 4, q: '방문객 응대 절차를 설명하시오.', a: '인사, 안내, 대기, 차 접대, 배웅' },
        { id: 5, q: '이메일 작성 원칙을 설명하시오.', a: '명확한 제목, 두괄식, 간결함, CC/BCC' },
        { id: 6, q: '보고의 유형과 방법을 설명하시오.', a: '정기/수시, 구두/서면, 간결/상세' },
        { id: 7, q: '비밀 정보 관리 방법을 설명하시오.', a: '등급 분류, 접근 제한, 폐기 절차' },
        { id: 8, q: '효과적인 청취 기술을 설명하시오.', a: '경청, 메모, 확인 질문, 피드백' },
        { id: 9, q: '불만/항의 전화 대응을 설명하시오.', a: '경청, 공감, 사과, 해결방안 제시' },
        { id: 10, q: '상사 부재 시 업무 처리를 설명하시오.', a: '권한 범위, 긴급 연락, 보고 체계' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('secretary-1-theory-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('secretary-1-theory-progress', JSON.stringify(updated));
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
    const prompt = `비서 1급 - 비서실무론 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/office/secretary-1" className="text-rose-600 hover:text-rose-800 flex items-center gap-2">
            ← 비서 1급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📋 비서실무론</h1>
          <p className="text-gray-600 mb-4">비서직의 역할, 업무수행, 의전 등</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-4 rounded-full transition-all"
                style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}
              />
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
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                >
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
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-rose-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleQuestion(topic.id, q.id)}
                              className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button
                                onClick={() => handleAskAI(q.q)}
                                className="mt-2 text-sm text-rose-600 hover:text-rose-800 flex items-center gap-1"
                              >
                                🤖 AI에게 자세히 물어보기
                              </button>
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
                  <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                    <span className="text-2xl">🧡</span>
                    <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                  </a>
                  <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                    <span className="text-2xl">💚</span>
                    <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                  </a>
                  <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
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
