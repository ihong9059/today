'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function OfficeManagementStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'office-env',
      name: '사무환경관리',
      icon: '🏢',
      questions: [
        { id: 1, q: '사무환경의 구성요소를 설명하시오.', a: '물리적 환경(조명/온도), 인적 환경, 기술적 환경' },
        { id: 2, q: '사무실 레이아웃 유형을 설명하시오.', a: '개방형, 폐쇄형, 혼합형, 자유좌석제' },
        { id: 3, q: '인체공학적 사무환경을 설명하시오.', a: '책상/의자 높이, 모니터 위치, 조명 각도' },
        { id: 4, q: '5S 운동을 설명하시오.', a: '정리, 정돈, 청소, 청결, 생활화' },
        { id: 5, q: '사무실 안전관리를 설명하시오.', a: '화재예방, 비상구, 전기안전, 응급처치' },
        { id: 6, q: '친환경 사무실(Green Office)을 설명하시오.', a: '에너지 절감, 재활용, 친환경 소모품' },
        { id: 7, q: '사무용품 관리를 설명하시오.', a: '재고관리, 발주, 비용절감, 보관' },
        { id: 8, q: '사무기기 관리를 설명하시오.', a: '복합기, PC, 전화, 유지보수, 교체주기' },
        { id: 9, q: '스마트 오피스를 설명하시오.', a: 'IoT, 클라우드, 원격근무, 협업 도구' },
        { id: 10, q: '업무공간 효율화 방안을 설명하시오.', a: '동선 최적화, 공용공간, 집중업무공간' }
      ]
    },
    {
      id: 'document-mgmt',
      name: '문서관리',
      icon: '📁',
      questions: [
        { id: 1, q: '문서의 정의와 종류를 설명하시오.', a: '공문서, 사문서, 전자문서, 대외/대내문서' },
        { id: 2, q: '문서 작성 원칙을 설명하시오.', a: '정확성, 간결성, 명확성, 통일성, 적시성' },
        { id: 3, q: '공문서 구성요소를 설명하시오.', a: '두문(발신기관), 본문(제목/내용), 결문(발신명의)' },
        { id: 4, q: '문서 결재 과정을 설명하시오.', a: '기안→검토→결재→시행→보관' },
        { id: 5, q: '전자결재 시스템을 설명하시오.', a: '기안→결재선 지정→전자서명→시행' },
        { id: 6, q: '문서 분류 체계를 설명하시오.', a: '기능별, 부서별, 연도별, 중요도별' },
        { id: 7, q: '문서 보존 기간을 설명하시오.', a: '영구, 준영구, 10년, 5년, 3년, 1년' },
        { id: 8, q: '문서 폐기 절차를 설명하시오.', a: '보존기간 확인, 폐기심사, 폐기목록, 파쇄' },
        { id: 9, q: '기록물관리 원칙을 설명하시오.', a: '진본성, 무결성, 신뢰성, 이용가능성' },
        { id: 10, q: '문서 보안 등급을 설명하시오.', a: '극비, 비밀, 대외비, 일반' }
      ]
    },
    {
      id: 'meeting-mgmt',
      name: '회의관리',
      icon: '👥',
      questions: [
        { id: 1, q: '회의의 유형을 설명하시오.', a: '정기회의, 임시회의, 보고회의, 의사결정회의' },
        { id: 2, q: '회의 준비 절차를 설명하시오.', a: '목적/안건 확정, 참석자, 장소, 자료 준비' },
        { id: 3, q: '회의록 작성 방법을 설명하시오.', a: '일시/장소/참석자, 안건, 논의내용, 결정사항' },
        { id: 4, q: '효과적인 회의 진행 방법을 설명하시오.', a: '시간 준수, 안건 집중, 참여 유도, 결론 도출' },
        { id: 5, q: '화상회의 준비를 설명하시오.', a: '장비 테스트, 자료 공유, 참가 링크, 에티켓' },
        { id: 6, q: '회의실 예약 관리를 설명하시오.', a: '그룹웨어, 캘린더 연동, 충돌 방지' },
        { id: 7, q: '브레인스토밍을 설명하시오.', a: '자유로운 아이디어 발상, 비판 금지, 양 우선' },
        { id: 8, q: '회의 후 Follow-up을 설명하시오.', a: '회의록 배포, 실행과제 추적, 진행상황 확인' },
        { id: 9, q: '퍼실리테이션을 설명하시오.', a: '중립적 회의 진행, 참여 촉진, 합의 도출' },
        { id: 10, q: '비효율적 회의 개선 방법을 설명하시오.', a: '목적 명확화, 시간 제한, 참석자 최소화' }
      ]
    },
    {
      id: 'management-basics',
      name: '경영일반',
      icon: '📊',
      questions: [
        { id: 1, q: '경영의 기능을 설명하시오.', a: '계획, 조직, 지휘, 통제' },
        { id: 2, q: '조직 구조의 유형을 설명하시오.', a: '기능별, 사업부별, 매트릭스, 네트워크형' },
        { id: 3, q: '리더십 유형을 설명하시오.', a: '전제적, 민주적, 자유방임적, 변혁적' },
        { id: 4, q: '의사결정 과정을 설명하시오.', a: '문제인식→대안개발→평가→선택→실행' },
        { id: 5, q: '동기부여 이론을 설명하시오.', a: '매슬로 욕구단계, 허즈버그 2요인' },
        { id: 6, q: '기업의 사회적 책임(CSR)을 설명하시오.', a: '경제적, 법적, 윤리적, 자선적 책임' },
        { id: 7, q: '기업문화를 설명하시오.', a: '조직 구성원 공유 가치관, 행동양식, 신념' },
        { id: 8, q: 'SWOT 분석을 설명하시오.', a: '강점, 약점, 기회, 위협 분석' },
        { id: 9, q: '비전과 미션을 설명하시오.', a: '비전: 미래상, 미션: 존재 이유와 목적' },
        { id: 10, q: 'KPI(핵심성과지표)를 설명하시오.', a: '목표 달성도 측정 지표, 정량적 평가' }
      ]
    },
    {
      id: 'time-stress',
      name: '시간/스트레스관리',
      icon: '⏰',
      questions: [
        { id: 1, q: '시간관리의 원칙을 설명하시오.', a: '우선순위, 계획, 집중, 위임, 거절' },
        { id: 2, q: '아이젠하워 매트릭스를 설명하시오.', a: '긴급/중요 기준 4분면 업무 분류' },
        { id: 3, q: '파레토 법칙(80/20)을 설명하시오.', a: '20% 노력이 80% 성과 창출' },
        { id: 4, q: '업무 위임 방법을 설명하시오.', a: '업무 선정, 적임자, 권한/책임, 점검' },
        { id: 5, q: '스트레스의 원인과 증상을 설명하시오.', a: '업무 과부하, 인간관계, 두통, 피로' },
        { id: 6, q: '스트레스 관리 방법을 설명하시오.', a: '운동, 취미, 휴식, 긍정적 사고' },
        { id: 7, q: '번아웃 예방 방법을 설명하시오.', a: '업무량 조절, 경계 설정, 지지체계' },
        { id: 8, q: '워라밸(Work-Life Balance)을 설명하시오.', a: '일과 삶의 균형, 유연근무, 휴가 활용' },
        { id: 9, q: '집중력 향상 방법을 설명하시오.', a: '방해요소 제거, 포모도로, 멀티태스킹 줄이기' },
        { id: 10, q: '효율적 업무 습관을 설명하시오.', a: '아침 루틴, 정리정돈, 마감시간 설정' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('secretary-1-office-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('secretary-1-office-progress', JSON.stringify(updated));
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
    const prompt = `비서 1급 - 사무관리론 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🗂️ 사무관리론</h1>
          <p className="text-gray-600 mb-4">사무환경, 문서관리, 회의관리 등</p>
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
