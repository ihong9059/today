'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function AdminScienceStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'admin-theory',
      name: '행정이론',
      icon: '📚',
      questions: [
        { id: 1, q: '행정의 개념을 설명하시오.', a: '공익실현을 위한 정부의 정책집행 활동' },
        { id: 2, q: '행정학의 성립 배경을 설명하시오.', a: '산업화, 행정국가화, 정부역할 확대' },
        { id: 3, q: '고전적 행정학을 설명하시오.', a: '과학적 관리론, 관료제이론, 행정관리론' },
        { id: 4, q: '행태주의 접근법을 설명하시오.', a: '인간행태 과학적 연구, 사이먼의 합리적 의사결정' },
        { id: 5, q: '신행정학을 설명하시오.', a: '사회적 형평성 강조, 참여·분권화, 가치 중시' },
        { id: 6, q: '신공공관리론(NPM)을 설명하시오.', a: '시장원리 도입, 성과중심, 고객지향' },
        { id: 7, q: '뉴거버넌스를 설명하시오.', a: '네트워크, 협력·참여, 정부-시민사회 협치' },
        { id: 8, q: '공공가치관리론을 설명하시오.', a: '공공가치 창출, 민주적 거버넌스' },
        { id: 9, q: '행정의 가치를 설명하시오.', a: '효율성, 효과성, 형평성, 민주성, 합법성' },
        { id: 10, q: '행정과 정치의 관계를 설명하시오.', a: '정치행정이원론→일원론→새이원론' }
      ]
    },
    {
      id: 'organization-theory',
      name: '조직론',
      icon: '🏢',
      questions: [
        { id: 1, q: '베버의 관료제를 설명하시오.', a: '계층제, 규칙, 전문화, 문서화, 비인격성' },
        { id: 2, q: '관료제의 역기능을 설명하시오.', a: '형식주의, 경직성, 목표대치, 권위주의' },
        { id: 3, q: '조직구조의 유형을 설명하시오.', a: '기능별, 사업별, 매트릭스, 네트워크' },
        { id: 4, q: '조직의 환경을 설명하시오.', a: '일반환경, 과업환경, 불확실성 대응' },
        { id: 5, q: '조직문화를 설명하시오.', a: '조직구성원 공유 가치·신념·행동양식' },
        { id: 6, q: '동기부여이론을 설명하시오.', a: '욕구이론(매슬로우), 동기위생이론(허즈버그)' },
        { id: 7, q: '리더십이론을 설명하시오.', a: '특성론→행동론→상황론→변혁적 리더십' },
        { id: 8, q: '의사소통을 설명하시오.', a: '공식/비공식, 수직/수평, 의사소통 장애' },
        { id: 9, q: '조직갈등과 관리를 설명하시오.', a: '갈등원인, 순기능/역기능, 관리전략' },
        { id: 10, q: '조직변화와 혁신을 설명하시오.', a: '계획적 변화, 저항관리, 조직학습' }
      ]
    },
    {
      id: 'personnel-admin',
      name: '인사행정',
      icon: '👥',
      questions: [
        { id: 1, q: '엽관제와 실적제를 설명하시오.', a: '엽관: 정치적 임용 / 실적: 능력기반 임용' },
        { id: 2, q: '직위분류제와 계급제를 설명하시오.', a: '직위분류: 직무중심 / 계급: 사람중심' },
        { id: 3, q: '공직분류체계를 설명하시오.', a: '경력직(일반/특정/기능), 특수경력직(정무/별정)' },
        { id: 4, q: '임용제도를 설명하시오.', a: '신규채용, 승진, 전보, 파견, 겸임' },
        { id: 5, q: '성과관리제도를 설명하시오.', a: '목표관리(MBO), 성과계약, 성과평가' },
        { id: 6, q: '공무원 보수체계를 설명하시오.', a: '봉급, 수당, 연봉제, 성과급' },
        { id: 7, q: '공무원 교육훈련을 설명하시오.', a: '신규자교육, 직무교육, 역량개발' },
        { id: 8, q: '공무원 복무제도를 설명하시오.', a: '성실의무, 복종의무, 비밀엄수의무, 품위유지' },
        { id: 9, q: '공무원 권익보장을 설명하시오.', a: '신분보장, 소청심사, 고충처리' },
        { id: 10, q: '대표관료제를 설명하시오.', a: '사회구성 반영 임용, 소극적/적극적 대표성' }
      ]
    },
    {
      id: 'policy-studies',
      name: '정책학',
      icon: '📋',
      questions: [
        { id: 1, q: '정책의 유형을 설명하시오.', a: '분배, 재분배, 규제, 구성정책(로위)' },
        { id: 2, q: '정책과정 모형을 설명하시오.', a: '의제설정→결정→집행→평가' },
        { id: 3, q: '의제설정이론을 설명하시오.', a: '외부주도, 내부접근, 동원모형' },
        { id: 4, q: '합리적 정책결정모형을 설명하시오.', a: '목표 설정, 대안 탐색, 결과 예측, 최적 선택' },
        { id: 5, q: '점증주의를 설명하시오.', a: '기존정책 기반 소폭 수정, 린드블롬' },
        { id: 6, q: '쓰레기통 모형을 설명하시오.', a: '문제·해결책·참여자·선택기회 우연적 결합' },
        { id: 7, q: '정책집행이론을 설명하시오.', a: '하향식(고전적) vs 상향식(현장중심)' },
        { id: 8, q: '정책평가의 유형을 설명하시오.', a: '형성평가, 총괄평가, 효과성/효율성/형평성' },
        { id: 9, q: '정책변동을 설명하시오.', a: '정책승계, 유지, 종결, 혁신' },
        { id: 10, q: '정책네트워크를 설명하시오.', a: '정책공동체, 이슈네트워크, 하위정부' }
      ]
    },
    {
      id: 'financial-admin',
      name: '재무행정',
      icon: '💰',
      questions: [
        { id: 1, q: '예산의 원칙을 설명하시오.', a: '완전성, 단일성, 통일성, 한정성, 공개성' },
        { id: 2, q: '예산의 종류를 설명하시오.', a: '일반회계, 특별회계, 기금' },
        { id: 3, q: '예산과정을 설명하시오.', a: '편성(행정부)→심의·의결(국회)→집행→결산' },
        { id: 4, q: '품목별 예산을 설명하시오.', a: '지출대상별 분류, 통제 중심' },
        { id: 5, q: '성과주의 예산을 설명하시오.', a: '사업·활동 중심, 투입-산출 연계' },
        { id: 6, q: '계획예산제도(PPBS)를 설명하시오.', a: '장기계획-예산 연계, 체계분석' },
        { id: 7, q: '영기준예산(ZBB)을 설명하시오.', a: '매년 제로에서 출발, 우선순위 결정' },
        { id: 8, q: '결과기반 예산을 설명하시오.', a: '성과정보 기반, 재정성과관리' },
        { id: 9, q: '발생주의 회계를 설명하시오.', a: '경제적 거래 발생시점 기준 인식' },
        { id: 10, q: '재정건전성을 설명하시오.', a: '재정수지, 국가채무, 재정준칙' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('civil5-adminscience-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil5-adminscience-progress', JSON.stringify(updated));
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
    const prompt = `5급 공채(행정고시) 행정학 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil/civil-service-5" className="text-slate-600 hover:text-slate-800 flex items-center gap-2">
            ← 5급 공채로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🏛️ 행정학</h1>
          <p className="text-gray-600 mb-4">행정이론, 조직론, 정책학</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-slate-500 to-gray-600 h-4 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
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
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-slate-300'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>{isCompleted && '✓'}</button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button onClick={() => handleAskAI(q.q)} className="mt-2 text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1">🤖 AI에게 자세히 물어보기</button>
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
