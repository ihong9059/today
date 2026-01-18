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
      name: '전화 상황 대처',
      icon: '📞',
      questions: [
        { id: 1, q: '상사 부재 중 급한 전화가 왔을 때 대처 방법을 설명하시오.', a: '용건 파악, 긴급도 판단, 메모 작성, 연락 가능 시간 안내, 상사 보고' },
        { id: 2, q: '상대방이 화가 난 상태로 전화했을 때 대처를 설명하시오.', a: '침착하게 경청, 공감, 사과, 해결방안 제시, 담당자 연결' },
        { id: 3, q: '전화 연결 중 끊어졌을 때 대처를 설명하시오.', a: '먼저 전화 건 쪽에서 재연결, 번호 확인 후 다시 연결' },
        { id: 4, q: '외국인이 전화했을 때 대처를 설명하시오.', a: '영어로 인사, 천천히 말해달라 요청, 담당자 연결' },
        { id: 5, q: '동시에 여러 전화가 왔을 때 대처를 설명하시오.', a: '양해 구하고 대기, 순서대로 처리, 긴급도 판단' },
        { id: 6, q: '상사 회의 중 급한 전화 처리를 설명하시오.', a: '용건 파악, 긴급도 판단, 메모 전달 또는 잠시 후 연락 안내' },
        { id: 7, q: '잘못된 정보 전달 시 수정 방법을 설명하시오.', a: '즉시 정정 연락, 사과, 정확한 정보 재전달' },
        { id: 8, q: '상대방 연락처를 모를 때 대처를 설명하시오.', a: '전화번호/이메일 요청, 회사명으로 검색' },
        { id: 9, q: '기밀 정보 요청 전화 대응을 설명하시오.', a: '정중히 거절, 담당자 확인 후 연락 안내' },
        { id: 10, q: '녹음 안내 후 메시지 남기기를 설명하시오.', a: '이름, 연락처, 용건, 회신 요청 여부' }
      ]
    },
    {
      id: 'visitor-situation',
      name: '방문객 상황 대처',
      icon: '🚶',
      questions: [
        { id: 1, q: '약속 없는 중요한 방문객 대응을 설명하시오.', a: '정중히 맞이, 용건 파악, 상사 확인, 대기 안내' },
        { id: 2, q: '상사 지연으로 방문객이 오래 기다릴 때 대처를 설명하시오.', a: '사과, 예상 시간 안내, 음료 제공, 편의 제공' },
        { id: 3, q: '불쾌한 방문객 대응을 설명하시오.', a: '침착하게 응대, 경청, 담당자 연결, 보안 연락' },
        { id: 4, q: '외국인 방문객 응대를 설명하시오.', a: '영어로 인사, 안내, 통역 지원 확인' },
        { id: 5, q: '방문객이 길을 잃었을 때 안내를 설명하시오.', a: '친절히 안내, 동행 또는 약도 제공' },
        { id: 6, q: '동시에 여러 방문객 응대를 설명하시오.', a: '순서대로 접수, 대기 안내, 우선순위 판단' },
        { id: 7, q: 'VIP 방문객 의전을 설명하시오.', a: '사전 준비, 영접, 세심한 배려, 의전 절차' },
        { id: 8, q: '방문객이 상사 면담 거절당했을 때 대처를 설명하시오.', a: '정중히 안내, 대안 제시, 연락처 전달' },
        { id: 9, q: '응급 상황 발생 시 대처를 설명하시오.', a: '119 연락, 응급처치, 안전 확보, 보고' },
        { id: 10, q: '보안 문제 발생 시 대처를 설명하시오.', a: '보안 담당자 연락, 방문객 안내, 상황 보고' }
      ]
    },
    {
      id: 'schedule-situation',
      name: '일정 상황 대처',
      icon: '📅',
      questions: [
        { id: 1, q: '일정 충돌 시 조정 방법을 설명하시오.', a: '우선순위 확인, 상사 판단 요청, 관련자 조율' },
        { id: 2, q: '급한 일정 추가 요청 시 대처를 설명하시오.', a: '기존 일정 확인, 조정 가능 여부 파악, 보고' },
        { id: 3, q: '상사가 일정을 잊었을 때 대처를 설명하시오.', a: '사전 리마인드, 준비물 확인, 이동 시간 안내' },
        { id: 4, q: '외부 약속 취소 시 대처를 설명하시오.', a: '즉시 상대방 연락, 사과, 대안 일정 제시' },
        { id: 5, q: '출장 일정 변경 시 대처를 설명하시오.', a: '항공/숙박 변경, 관련자 안내, 서류 수정' },
        { id: 6, q: '중요 회의 준비물 누락 시 대처를 설명하시오.', a: '빠르게 준비, 대체 방법 찾기, 사전 점검 강화' },
        { id: 7, q: '이중 약속 발견 시 대처를 설명하시오.', a: '즉시 보고, 우선순위 결정, 조정 연락' },
        { id: 8, q: '해외 출장 비자 문제 발생 시 대처를 설명하시오.', a: '대사관 확인, 긴급 신청, 대안 일정' },
        { id: 9, q: '회의 참석자 변경 시 대처를 설명하시오.', a: '변경 사항 공지, 자료 수정, 좌석 조정' },
        { id: 10, q: '날씨/교통 문제로 일정 차질 시 대처를 설명하시오.', a: '대안 마련, 관련자 안내, 온라인 전환 검토' }
      ]
    },
    {
      id: 'document-situation',
      name: '문서 상황 대처',
      icon: '📄',
      questions: [
        { id: 1, q: '급한 문서 작성 요청 시 대처를 설명하시오.', a: '우선순위 조정, 핵심 내용 먼저, 검토 후 제출' },
        { id: 2, q: '문서에서 오류 발견 시 대처를 설명하시오.', a: '즉시 수정, 관련자 안내, 재배포' },
        { id: 3, q: '기밀 문서 분실 시 대처를 설명하시오.', a: '즉시 보고, 수색, 보안 조치, 재발 방지' },
        { id: 4, q: '컴퓨터 고장으로 문서 손실 시 대처를 설명하시오.', a: '백업 확인, IT 지원 요청, 복구 시도' },
        { id: 5, q: '결재 서류 급히 필요할 때 대처를 설명하시오.', a: '결재권자 확인, 긴급 결재 요청, 대리 결재' },
        { id: 6, q: '외부 발송 문서 오류 시 대처를 설명하시오.', a: '즉시 정정 문서 발송, 사과, 원본 회수' },
        { id: 7, q: '회의 자료 미완성 시 대처를 설명하시오.', a: '핵심 내용 우선 작성, 보완 약속, 추후 배포' },
        { id: 8, q: '문서 양식 없을 때 대처를 설명하시오.', a: '유사 양식 참고, 기본 형식 작성, 검토 요청' },
        { id: 9, q: '인쇄 문제 발생 시 대처를 설명하시오.', a: '다른 프린터 사용, IT 지원, 외부 출력' },
        { id: 10, q: '영문 문서 번역 필요 시 대처를 설명하시오.', a: '자체 번역, 번역기 활용, 전문 번역 의뢰' }
      ]
    },
    {
      id: 'general-situation',
      name: '기타 상황 대처',
      icon: '⚡',
      questions: [
        { id: 1, q: '상사 개인 용무 처리 요청 시 대처를 설명하시오.', a: '업무 범위 내 처리, 과도한 요청은 정중히 조율' },
        { id: 2, q: '부서 간 갈등 상황에서 역할을 설명하시오.', a: '중립 유지, 정확한 정보 전달, 조율 역할' },
        { id: 3, q: '업무 과중 시 대처를 설명하시오.', a: '우선순위 설정, 상사 상담, 효율적 배분' },
        { id: 4, q: '경조사 발생 시 대처를 설명하시오.', a: '경조사 확인, 화환/조화, 참석 여부 판단' },
        { id: 5, q: '상사 건강 문제 발생 시 대처를 설명하시오.', a: '응급조치, 119 연락, 가족 연락, 일정 조정' },
        { id: 6, q: '사무용품 부족 시 대처를 설명하시오.', a: '재고 확인, 긴급 구매, 공용품 활용' },
        { id: 7, q: '정전/재해 시 대처를 설명하시오.', a: '안전 확보, 비상 연락, 업무 백업, 보고' },
        { id: 8, q: '개인 정보 요청 대응을 설명하시오.', a: '권한 확인, 정당한 요청만 처리, 보안 준수' },
        { id: 9, q: '언론 문의 대응을 설명하시오.', a: '홍보 담당자 연결, 직접 답변 지양' },
        { id: 10, q: '업무 인수인계를 설명하시오.', a: '문서화, 핵심 사항 전달, 연락처 공유' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('secretary-2-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('secretary-2-practical-progress', JSON.stringify(updated));
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
    const prompt = `비서 2급 실기 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">✍️ 비서실무 (실기)</h1>
          <p className="text-gray-600 mb-4">필답형 실기 시험 대비</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-4 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
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
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-pink-300'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>{isCompleted && '✓'}</button>
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
