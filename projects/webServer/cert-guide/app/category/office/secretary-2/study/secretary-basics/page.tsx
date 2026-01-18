'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SecretaryBasicsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'secretary-role',
      name: '비서의 역할',
      icon: '👩‍💼',
      questions: [
        { id: 1, q: '비서의 정의를 설명하시오.', a: '상사의 업무를 보좌하고 지원하는 전문직' },
        { id: 2, q: '비서의 기본 역할을 설명하시오.', a: '일정관리, 문서처리, 전화응대, 방문객응대' },
        { id: 3, q: '비서의 자질을 설명하시오.', a: '성실, 책임감, 비밀유지, 의사소통능력' },
        { id: 4, q: '비서의 직업윤리를 설명하시오.', a: '기밀유지, 충성, 정직, 전문성' },
        { id: 5, q: '비서의 업무 범위를 설명하시오.', a: '상사 보좌, 일정, 문서, 회의, 출장 관리' },
        { id: 6, q: '비서와 상사의 관계를 설명하시오.', a: '신뢰, 협력, 보완적 관계, 업무 스타일 파악' },
        { id: 7, q: '비서의 이미지 관리를 설명하시오.', a: '단정한 복장, 밝은 표정, 전문적 태도' },
        { id: 8, q: '비서의 시간관리를 설명하시오.', a: '우선순위, 효율적 업무 처리, 여유시간 확보' },
        { id: 9, q: '비서의 대인관계를 설명하시오.', a: '부서 간 협조, 원만한 소통, 갈등 관리' },
        { id: 10, q: '비서의 자기개발을 설명하시오.', a: '지속 학습, 자격증 취득, 역량 강화' }
      ]
    },
    {
      id: 'phone-response',
      name: '전화 응대',
      icon: '📞',
      questions: [
        { id: 1, q: '전화 응대 기본 원칙을 설명하시오.', a: '3콜 내 수신, 밝은 목소리, 정확한 메모' },
        { id: 2, q: '전화 받을 때 인사를 설명하시오.', a: '회사명+부서명+이름 순서로 소개' },
        { id: 3, q: '상대방 확인 방법을 설명하시오.', a: '성함, 회사명, 연락처, 용건 확인' },
        { id: 4, q: '전화 연결 방법을 설명하시오.', a: '양해 구하기, 정확한 내선번호 연결' },
        { id: 5, q: '대기 요청 방법을 설명하시오.', a: '잠시 기다려 주시겠습니까, 30초 이내' },
        { id: 6, q: '부재중 응대를 설명하시오.', a: '부재 사유 안내, 메시지 접수, 회신 약속' },
        { id: 7, q: '전화 메모 작성을 설명하시오.', a: '날짜/시간, 상대방 정보, 용건, 회신 여부' },
        { id: 8, q: '불만 전화 대응을 설명하시오.', a: '경청, 사과, 해결방안 제시, 보고' },
        { id: 9, q: '전화 종료 예절을 설명하시오.', a: '용건 확인, 인사, 상대가 먼저 끊기' },
        { id: 10, q: '잘못 걸린 전화 대응을 설명하시오.', a: '정중히 안내, 올바른 번호 제공' }
      ]
    },
    {
      id: 'visitor-response',
      name: '방문객 응대',
      icon: '🚶',
      questions: [
        { id: 1, q: '방문객 응대 기본 원칙을 설명하시오.', a: '친절, 신속, 정확, 안내' },
        { id: 2, q: '방문객 맞이 절차를 설명하시오.', a: '일어서서 인사, 용건 확인, 안내' },
        { id: 3, q: '약속 있는 방문객 응대를 설명하시오.', a: '예약 확인, 담당자 연락, 대기 안내' },
        { id: 4, q: '약속 없는 방문객 응대를 설명하시오.', a: '용건 파악, 담당자 확인, 대기/귀가 안내' },
        { id: 5, q: '대기 중 응대를 설명하시오.', a: '음료 제공, 잡지 제공, 예상 시간 안내' },
        { id: 6, q: '안내 방법을 설명하시오.', a: '앞서서 걷기, 방향 안내, 문 열기' },
        { id: 7, q: '명함 받는 예절을 설명하시오.', a: '두 손으로 받기, 확인, 정중히 보관' },
        { id: 8, q: '차 접대 방법을 설명하시오.', a: '음료 종류 확인, 상석부터 제공' },
        { id: 9, q: '배웅 예절을 설명하시오.', a: '엘리베이터/현관까지, 인사, 감사' },
        { id: 10, q: 'VIP 응대를 설명하시오.', a: '사전 준비, 의전, 세심한 배려' }
      ]
    },
    {
      id: 'schedule-mgmt',
      name: '일정관리',
      icon: '📅',
      questions: [
        { id: 1, q: '일정관리의 중요성을 설명하시오.', a: '효율적 시간 활용, 업무 누락 방지' },
        { id: 2, q: '일정표 작성 방법을 설명하시오.', a: '일시, 장소, 참석자, 준비물, 비고' },
        { id: 3, q: '일정 확인 절차를 설명하시오.', a: '전날, 당일 아침 확인, 상사에게 보고' },
        { id: 4, q: '일정 변경 시 대처를 설명하시오.', a: '관련자 연락, 일정 조정, 상사 보고' },
        { id: 5, q: '일정 충돌 시 대처를 설명하시오.', a: '우선순위 확인, 상사 판단 요청' },
        { id: 6, q: '정기 일정 관리를 설명하시오.', a: '회의, 보고, 정기 약속 등 반복 일정' },
        { id: 7, q: '출장 일정 관리를 설명하시오.', a: '교통, 숙박, 회의 일정 종합 관리' },
        { id: 8, q: '전자 일정관리 도구를 설명하시오.', a: 'Outlook, Google Calendar, 그룹웨어' },
        { id: 9, q: '리마인더 설정을 설명하시오.', a: '사전 알림으로 준비 시간 확보' },
        { id: 10, q: '일정 공유를 설명하시오.', a: '관련자 공유, 보안 범위 설정' }
      ]
    },
    {
      id: 'document-basics',
      name: '문서관리 기초',
      icon: '📁',
      questions: [
        { id: 1, q: '문서의 종류를 설명하시오.', a: '공문서, 사문서, 대내문서, 대외문서' },
        { id: 2, q: '문서 작성 원칙을 설명하시오.', a: '정확, 간결, 명확, 일관성' },
        { id: 3, q: '문서 결재 과정을 설명하시오.', a: '기안→검토→결재→시행' },
        { id: 4, q: '문서 분류 방법을 설명하시오.', a: '종류별, 부서별, 날짜별 분류' },
        { id: 5, q: '문서 보관 방법을 설명하시오.', a: '파일링, 보존기간, 폐기 절차' },
        { id: 6, q: '기안문 작성을 설명하시오.', a: '제목, 목적, 내용, 결재 요청' },
        { id: 7, q: '회의록 작성을 설명하시오.', a: '일시, 참석자, 안건, 결정사항' },
        { id: 8, q: '메모 작성을 설명하시오.', a: '간결하게, 5W1H, 날짜' },
        { id: 9, q: '문서 보안 관리를 설명하시오.', a: '등급 분류, 접근 제한, 폐기' },
        { id: 10, q: '전자문서 관리를 설명하시오.', a: '저장, 백업, 폴더 체계' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('secretary-2-basics-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('secretary-2-basics-progress', JSON.stringify(updated));
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
    const prompt = `비서 2급 - 비서실무 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/office/secretary-2" className="text-pink-600 hover:text-pink-800 flex items-center gap-2">
            ← 비서 2급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📋 비서실무</h1>
          <p className="text-gray-600 mb-4">비서의 역할, 업무처리, 전화/방문객 응대</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-4 rounded-full transition-all"
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
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-pink-300'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button onClick={() => handleAskAI(q.q)} className="mt-2 text-sm text-pink-600 hover:text-pink-800 flex items-center gap-1">🤖 AI에게 자세히 물어보기</button>
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
