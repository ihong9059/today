'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'phone-situation',
      name: '전화 상황',
      icon: '📞',
      questions: [
        { id: 1, q: '상사 부재 시 전화 응대를 설명하시오.', a: '부재 안내 → 메모 접수 → 회신 약속' },
        { id: 2, q: '긴급 전화 처리를 설명하시오.', a: '긴급도 판단 → 상사 확인 → 신속 연결' },
        { id: 3, q: '불만 전화 대응을 설명하시오.', a: '경청 → 공감 → 사과 → 해결책 제시' },
        { id: 4, q: '전화 회의 준비를 설명하시오.', a: '참석자 확인, 장비 점검, 자료 배포' },
        { id: 5, q: '외국어 전화 대응을 설명하시오.', a: '천천히 말하기, 담당자 연결, 통역 요청' },
        { id: 6, q: '동시 전화 상황을 설명하시오.', a: '첫 번째 전화 보류, 두 번째 용건 확인 후 처리' },
        { id: 7, q: '잘못 전달된 전화를 설명하시오.', a: '사과 후 정확한 부서/담당자 안내' },
        { id: 8, q: '통화 중 끊김 대응을 설명하시오.', a: '다시 걸어서 사과, 통화 재개' },
        { id: 9, q: '비밀 통화 요청 대응을 설명하시오.', a: '조용한 공간 안내, 프라이버시 보장' },
        { id: 10, q: '야근 중 전화 대응을 설명하시오.', a: '간단히 용건 파악, 다음 날 회신 약속' }
      ]
    },
    {
      id: 'visitor-situation',
      name: '방문객 상황',
      icon: '🚶',
      questions: [
        { id: 1, q: '예약 없는 방문객 대응을 설명하시오.', a: '용건 확인 → 상사 확인 → 대기/안내' },
        { id: 2, q: 'VIP 방문객 응대를 설명하시오.', a: '정중한 인사, 상석 안내, 음료 제공' },
        { id: 3, q: '다수 방문객 응대를 설명하시오.', a: '순서대로 접수, 대기 안내, 순차 처리' },
        { id: 4, q: '방문객 대기 중 대응을 설명하시오.', a: '음료 제공, 읽을거리 안내, 상황 업데이트' },
        { id: 5, q: '담당자 지연 시 대응을 설명하시오.', a: '사과 → 예상 시간 안내 → 대안 제시' },
        { id: 6, q: '불쾌한 방문객 대응을 설명하시오.', a: '침착하게 대응, 상급자 보고' },
        { id: 7, q: '보안이 필요한 방문객 응대를 설명하시오.', a: '신분 확인, 방문증 발급, 동행 안내' },
        { id: 8, q: '갑작스런 회의 참석자 안내를 설명하시오.', a: '회의실 위치, 필요 물품 안내' },
        { id: 9, q: '외국인 방문객 응대를 설명하시오.', a: '영어로 간단히 인사, 통역 준비' },
        { id: 10, q: '방문객 배웅 시 주의점을 설명하시오.', a: '감사 인사, 엘리베이터/출입구까지 안내' }
      ]
    },
    {
      id: 'schedule-situation',
      name: '일정 상황',
      icon: '📅',
      questions: [
        { id: 1, q: '일정 충돌 시 대응을 설명하시오.', a: '우선순위 판단, 상사 확인, 조정' },
        { id: 2, q: '급한 일정 추가를 설명하시오.', a: '기존 일정 확인, 조정 가능성 검토' },
        { id: 3, q: '일정 취소 통보를 설명하시오.', a: '상대방에게 신속 통보, 사과, 재일정 조율' },
        { id: 4, q: '상사 출장 일정 관리를 설명하시오.', a: '교통/숙박 예약, 일정표 작성, 자료 준비' },
        { id: 5, q: '회의 일정 조율을 설명하시오.', a: '참석자 시간 확인, 회의실 예약' },
        { id: 6, q: '일정 변경 알림을 설명하시오.', a: '관련자 전원에게 신속히 통보' },
        { id: 7, q: '중요 일정 리마인드를 설명하시오.', a: '하루 전, 당일 아침 알림' },
        { id: 8, q: '외부 일정 확인을 설명하시오.', a: '장소, 시간, 참석자, 준비물 확인' },
        { id: 9, q: '정기 회의 관리를 설명하시오.', a: '고정 시간 확보, 안건 사전 공유' },
        { id: 10, q: '긴급 상황 일정 처리를 설명하시오.', a: '신속한 판단, 최우선 처리, 후속 조치' }
      ]
    },
    {
      id: 'document-situation',
      name: '문서 상황',
      icon: '📄',
      questions: [
        { id: 1, q: '기밀문서 처리를 설명하시오.', a: '보안 유지, 열람 제한, 안전 보관' },
        { id: 2, q: '문서 분실 시 대응을 설명하시오.', a: '수색 → 상사 보고 → 재발방지책' },
        { id: 3, q: '급한 문서 작성을 설명하시오.', a: '핵심 내용 우선, 빠른 검토 후 제출' },
        { id: 4, q: '문서 오류 발견 시 대응을 설명하시오.', a: '즉시 수정, 관련자 통보' },
        { id: 5, q: '문서 결재 지연 시 대응을 설명하시오.', a: '결재자 확인, 독촉, 대안 모색' },
        { id: 6, q: '외부 발송 문서 점검을 설명하시오.', a: '내용, 수신자, 첨부파일 확인' },
        { id: 7, q: '문서 보관 기한 관리를 설명하시오.', a: '보존기간 확인, 정리 및 폐기' },
        { id: 8, q: '복사/출력 요청 처리를 설명하시오.', a: '부수 확인, 양면/컬러 여부, 제본' },
        { id: 9, q: '전자문서 관리를 설명하시오.', a: '폴더 분류, 백업, 접근권한 설정' },
        { id: 10, q: '문서 양식 관리를 설명하시오.', a: '표준양식 유지, 최신버전 관리' }
      ]
    },
    {
      id: 'general-situation',
      name: '일반 상황',
      icon: '💼',
      questions: [
        { id: 1, q: '상사 지시 불명확 시 대응을 설명하시오.', a: '재확인 질문, 메모 후 복창' },
        { id: 2, q: '업무 과부하 시 대응을 설명하시오.', a: '우선순위 조정, 상사와 상의' },
        { id: 3, q: '실수 발생 시 대응을 설명하시오.', a: '즉시 보고, 사과, 수습 방안 제시' },
        { id: 4, q: '부서 간 갈등 시 대응을 설명하시오.', a: '중립 유지, 상급자 보고' },
        { id: 5, q: '개인정보 요청 대응을 설명하시오.', a: '원칙대로 거절, 정당한 절차 안내' },
        { id: 6, q: '선물/뇌물 대응을 설명하시오.', a: '회사 규정 확인, 정중히 거절' },
        { id: 7, q: '야근/휴일 근무 요청을 설명하시오.', a: '상황 파악, 필요시 수락, 보상 확인' },
        { id: 8, q: '갑작스런 출장 준비를 설명하시오.', a: '체크리스트 활용, 필수 준비물 확보' },
        { id: 9, q: '회사 행사 지원을 설명하시오.', a: '행사 기획, 준비물 점검, 현장 지원' },
        { id: 10, q: '비상 상황 대응을 설명하시오.', a: '침착하게 행동, 상급자 보고, 대피 안내' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('secretary-3-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('secretary-3-practical-progress', JSON.stringify(updated));
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
    const prompt = `비서 3급 - 실기 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">✍️ 실기</h1>
          <p className="text-gray-600 mb-4">상황별 대처, 실무 처리</p>
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
