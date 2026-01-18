'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function BusinessOrganizationStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, isPaid } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('labor-attorney-business-org-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('labor-attorney-business-org-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (idx: number) => {
    setOpenTopics(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const topics = [
    {
      title: '조직이론 기초',
      desc: '조직의 정의, 유형, 이론 발전',
      questions: [
        { id: 1, q: '조직의 정의와 구성요소는?', a: '공동목표 달성을 위한 사회적 체계, 구성요소: 목표·구조·인간·환경' },
        { id: 2, q: '고전적 조직이론(과학적 관리론)의 특징은?', a: 'Taylor의 시간동작연구, 과업관리, 경제적 동기 강조' },
        { id: 3, q: 'Weber의 관료제이론의 특징은?', a: '합법적 권한, 계층구조, 규칙·절차, 비인격화, 전문화' },
        { id: 4, q: 'Fayol의 관리과정론을 설명하시오.', a: '계획-조직-지휘-조정-통제의 관리 5기능, 14개 관리원칙' },
        { id: 5, q: '인간관계론(Hawthorne 실험)의 의의는?', a: '비공식조직, 사회적 욕구, 감정·태도의 중요성 발견' },
        { id: 6, q: '체계이론(시스템이론)의 관점은?', a: '조직을 환경과 상호작용하는 개방시스템으로 파악' },
        { id: 7, q: '상황이론(상황적합이론)의 핵심은?', a: '유일최선의 조직 없음, 상황(환경, 기술, 규모)에 따라 적합한 구조 상이' },
        { id: 8, q: '거래비용이론의 조직 설명은?', a: '시장과 계층의 선택, 거래비용 최소화 관점에서 조직 경계 결정' }
      ]
    },
    {
      title: '조직구조',
      desc: '조직설계, 부서화, 조정기제',
      questions: [
        { id: 9, q: '조직구조의 3가지 차원은?', a: '복잡성(분화), 공식화(규칙), 집권화(권한 집중)' },
        { id: 10, q: '수평적 분화와 수직적 분화를 비교하시오.', a: '수평: 부서·직무 분화 / 수직: 계층수, 통솔범위' },
        { id: 11, q: '부서화의 방식들을 설명하시오.', a: '기능별, 사업부별, 지역별, 고객별, 프로젝트별 등' },
        { id: 12, q: '기능별 조직의 장단점은?', a: '장점: 전문화, 규모의 경제 / 단점: 부서이기주의, 조정 어려움' },
        { id: 13, q: '사업부제 조직의 장단점은?', a: '장점: 신속한 의사결정, 책임 명확 / 단점: 중복투자, 부문이기주의' },
        { id: 14, q: '매트릭스 조직의 특징은?', a: '기능과 프로젝트의 이중 구조, 복수 보고체계, 유연성' },
        { id: 15, q: '네트워크 조직의 특징은?', a: '핵심역량 집중, 외부 전문기관 연결, 유연성과 효율성' },
        { id: 16, q: '조정기제의 종류를 설명하시오.', a: '상호조정, 직접감독, 표준화(작업·산출·기술·규범)' }
      ]
    },
    {
      title: '동기부여 이론',
      desc: '내용이론, 과정이론',
      questions: [
        { id: 17, q: 'Maslow의 욕구계층이론을 설명하시오.', a: '생리→안전→사회→존경→자아실현, 순차적 충족' },
        { id: 18, q: 'Herzberg의 2요인이론의 핵심은?', a: '위생요인(불만족 예방)과 동기요인(만족·동기유발) 구분' },
        { id: 19, q: 'Alderfer의 ERG이론의 특징은?', a: '존재-관계-성장 욕구, 좌절-퇴행 가설, 동시 추구 가능' },
        { id: 20, q: 'McClelland의 성취동기이론을 설명하시오.', a: '성취·권력·친교 욕구, 학습에 의해 형성' },
        { id: 21, q: 'Vroom의 기대이론의 공식은?', a: '동기=기대×수단성×유의성, 주관적 확률에 기반' },
        { id: 22, q: 'Adams의 공정성이론의 핵심은?', a: '투입/산출 비율 비교, 불공정 인식 시 행동변화' },
        { id: 23, q: 'Locke의 목표설정이론의 원리는?', a: '구체적이고 도전적인 목표, 피드백, 참여' },
        { id: 24, q: '자기결정이론(SDT)의 내용은?', a: '자율성·유능감·관계성이 내재적 동기의 기본욕구' }
      ]
    },
    {
      title: '리더십 이론',
      desc: '특성론, 행동론, 상황론',
      questions: [
        { id: 25, q: '리더십 특성이론의 한계는?', a: '보편적 특성 발견 실패, 상황 무시, 리더 개발 어려움' },
        { id: 26, q: 'Ohio 주립대 연구의 리더 행동 유형은?', a: '구조주도(과업)와 배려(관계)의 2차원' },
        { id: 27, q: 'Blake & Mouton의 관리격자모형은?', a: '생산관심×인간관심, 9,9 팀형 리더십이 이상적' },
        { id: 28, q: 'Fiedler의 상황이론의 핵심은?', a: 'LPC 점수로 리더유형 분류, 상황호의성에 따라 효과 상이' },
        { id: 29, q: 'Hersey & Blanchard의 상황적 리더십이론은?', a: '부하 성숙도에 따라 지시형→코칭형→참여형→위임형' },
        { id: 30, q: 'House의 경로-목표이론을 설명하시오.', a: '지시적·지원적·참여적·성취지향적 리더십, 상황에 따라 선택' },
        { id: 31, q: '변혁적 리더십의 4가지 구성요소는?', a: '이상적 영향력, 영감적 동기부여, 지적 자극, 개별적 배려' },
        { id: 32, q: '서번트 리더십의 특징은?', a: '섬김과 봉사, 구성원 성장 지원, 윤리적 행동' }
      ]
    },
    {
      title: '조직문화',
      desc: '문화유형, 변화관리',
      questions: [
        { id: 33, q: 'Schein의 조직문화 3수준은?', a: '인공물→표방가치→기본가정, 가정이 핵심' },
        { id: 34, q: 'Cameron & Quinn의 경쟁가치모형 4유형은?', a: '관계(협력), 혁신(창조), 위계(통제), 시장(경쟁)' },
        { id: 35, q: 'Hofstede의 문화차원 5가지는?', a: '권력거리, 개인주의, 남성성, 불확실성회피, 장기지향성' },
        { id: 36, q: '강한 문화와 약한 문화의 비교는?', a: '강한: 공유도 높음, 일관성 / 약한: 하위문화 다양' },
        { id: 37, q: '조직문화 변화의 저항요인은?', a: '기득권, 습관, 불확실성 공포, 선택적 정보처리' },
        { id: 38, q: 'Lewin의 변화 3단계 모형은?', a: '해빙(unfreezing)→변화(changing)→재동결(refreezing)' },
        { id: 39, q: 'Kotter의 변화 8단계를 설명하시오.', a: '위기감→연합→비전→전파→장애제거→단기성과→통합→제도화' },
        { id: 40, q: '조직개발(OD)의 주요 기법은?', a: '감수성훈련, 팀빌딩, 서베이 피드백, 프로세스 컨설팅' }
      ]
    },
    {
      title: '조직행동',
      desc: '의사소통, 갈등, 집단역학',
      questions: [
        { id: 41, q: '의사소통의 장애요인은?', a: '여과, 선택적 지각, 정보과부하, 언어, 감정' },
        { id: 42, q: '공식적·비공식적 의사소통 채널 비교는?', a: '공식: 수직·수평적 / 비공식: 포도넝쿨(grapevine)' },
        { id: 43, q: '집단의사결정의 장단점은?', a: '장점: 정보다양성, 수용성 / 단점: 시간, 동조압력' },
        { id: 44, q: '집단사고(groupthink)의 증상은?', a: '무적 환상, 집단 합리화, 만장일치 환상, 자기검열' },
        { id: 45, q: '갈등의 순기능과 역기능은?', a: '순기능: 창의성, 변화 / 역기능: 스트레스, 분열' },
        { id: 46, q: '갈등관리 5가지 스타일은?', a: '경쟁, 협력, 타협, 회피, 수용 (Thomas-Kilmann)' },
        { id: 47, q: '조직시민행동(OCB)이란?', a: '공식적 역할 외의 자발적 행동, 조직 효과성에 기여' },
        { id: 48, q: '심리적 계약의 의미와 중요성은?', a: '비문서적 상호기대, 위반 시 불신·이직 증가' },
        { id: 49, q: '직무만족의 결정요인은?', a: '직무특성, 보상, 동료관계, 성장기회, 상사' },
        { id: 50, q: '조직몰입의 3가지 구성요소는?', a: '정서적(애착), 지속적(비용), 규범적(의무감) 몰입' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm mb-2">
            <Link href="/category/legal/labor-attorney" className="text-gray-500 hover:text-gray-700">공인노무사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-amber-600 font-medium">경영조직론</span>
          </nav>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">🏢 경영조직론 핵심문제</h1>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-sm text-gray-600">{completedQuestions.length}/{totalQuestions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {topics.map((topic, tidx) => (
          <div key={tidx} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <button
              onClick={() => toggleTopic(tidx)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold">
                  {tidx + 1}
                </span>
                <div className="text-left">
                  <h2 className="font-bold">{topic.title}</h2>
                  <p className="text-sm text-gray-500">{topic.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length}
                </span>
                <span className={`transform transition ${openTopics.includes(tidx) ? 'rotate-180' : ''}`}>▼</span>
              </div>
            </button>

            {openTopics.includes(tidx) && (
              <div className="border-t divide-y">
                {topic.questions.map((q) => (
                  <div key={q.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleQuestion(q.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                          completedQuestions.includes(q.id) ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-300'
                        }`}
                      >
                        {completedQuestions.includes(q.id) && '✓'}
                      </button>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-2">{q.id}. {q.q}</p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{q.a}</p>
                        <button
                          onClick={() => {
                            setCurrentPrompt(`공인노무사 시험 경영조직론 문제입니다.

문제: ${q.q}

다음 순서로 상세히 설명해주세요:
1. 핵심 개념 정의와 배경
2. 이론의 내용과 특징
3. 장점과 한계점
4. 실제 적용 사례
5. 시험 출제 포인트`);
                            if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } if (!isPaid) { alert('결제 후 이용할 수 있는 기능입니다.'); return; } setShowAIModal(true);
                          }}
                          className="mt-2 px-3 py-1 bg-amber-100 text-amber-600 rounded-lg text-sm hover:bg-amber-200 transition"
                        >
                          🤖 AI 해설
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

      {/* AI Modal */}
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
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인노무사 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
