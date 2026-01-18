'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function HRManagementStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, isPaid } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('labor-attorney-hr-management-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('labor-attorney-hr-management-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (idx: number) => {
    setOpenTopics(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const topics = [
    {
      title: '인적자원관리 기초',
      desc: 'HRM 개념, 전략적 HRM',
      questions: [
        { id: 1, q: '인적자원관리(HRM)의 정의와 목표는?', a: '조직목표 달성을 위한 인력 확보·개발·활용·유지 활동, 효율성과 공정성 추구' },
        { id: 2, q: '전략적 인적자원관리(SHRM)의 특징은?', a: '경영전략과 HRM의 연계, 인적자원의 전략적 자산화, 장기적 관점' },
        { id: 3, q: 'HRM의 주요 기능 4가지는?', a: '확보(채용), 개발(교육훈련), 보상(임금·복리후생), 유지(노사관계)' },
        { id: 4, q: '하드 HRM과 소프트 HRM의 차이는?', a: '하드: 비용·통제 중심 / 소프트: 몰입·참여·개발 중심' },
        { id: 5, q: '인적자원의 경쟁우위 조건(VRIO)은?', a: '가치(Value), 희소성(Rarity), 모방불가(Inimitability), 조직화(Organization)' },
        { id: 6, q: '고성과 작업시스템(HPWS)의 구성요소는?', a: '선택적 채용, 광범위 교육, 성과급, 참여, 고용안정 등' },
        { id: 7, q: 'HR 스코어카드의 기능은?', a: 'HRM 활동의 성과 측정, 전략과의 연계성 평가' },
        { id: 8, q: 'HRM 아웃소싱의 장단점은?', a: '장점: 비용절감, 전문성 / 단점: 통제력 상실, 기밀유출' }
      ]
    },
    {
      title: '채용관리',
      desc: '모집, 선발, 배치',
      questions: [
        { id: 9, q: '직무분석의 목적과 방법은?', a: '직무내용·요건 파악, 관찰법·면접법·설문법·작업일지법 등' },
        { id: 10, q: '직무기술서와 직무명세서의 차이는?', a: '기술서: 직무내용·책임·환경 / 명세서: 수행자 요건(자격·능력)' },
        { id: 11, q: '내부모집과 외부모집의 장단점 비교는?', a: '내부: 동기부여, 비용절감 vs 외부: 새로운 시각, 인재풀 확대' },
        { id: 12, q: '선발도구의 타당성 종류는?', a: '내용타당성, 기준관련타당성(예측·동시), 구성타당성' },
        { id: 13, q: '선발도구의 신뢰성이란?', a: '측정의 일관성, 재검사·동형검사·반분신뢰도' },
        { id: 14, q: '구조화 면접의 장점은?', a: '일관된 질문, 평가 객관성, 법적 방어 용이' },
        { id: 15, q: '평가센터(AC)법의 특징은?', a: '복수 평가자, 복수 기법(토론, 역할연기 등), 관리직 선발에 활용' },
        { id: 16, q: '역량기반 채용(Competency-based)이란?', a: '직무성공에 필요한 역량 중심 선발, 행동기반 면접' }
      ]
    },
    {
      title: '교육훈련',
      desc: '인재개발, 경력관리',
      questions: [
        { id: 17, q: '교육훈련 필요분석의 3단계는?', a: '조직분석, 직무분석, 개인분석' },
        { id: 18, q: 'OJT와 Off-JT의 비교는?', a: 'OJT: 현장훈련, 비용저렴 / Off-JT: 집합교육, 체계적' },
        { id: 19, q: '액션러닝의 특징은?', a: '실제 문제 해결 과정에서 학습, 팀기반, 성찰 강조' },
        { id: 20, q: '멘토링과 코칭의 차이는?', a: '멘토링: 선배-후배, 장기적 / 코칭: 특정 기술·성과, 단기적' },
        { id: 21, q: '교육훈련 평가의 4수준(Kirkpatrick)은?', a: '반응→학습→행동→결과(ROI)' },
        { id: 22, q: '경력개발의 단계(Super)는?', a: '성장기→탐색기→확립기→유지기→쇠퇴기' },
        { id: 23, q: '경력닻(Career Anchor)이론이란?', a: 'Schein, 8가지 경력지향성(기술/관리/안정/창업 등)' },
        { id: 24, q: '승계계획(Succession Planning)의 내용은?', a: '핵심직위 후계자 발굴·육성, 리더십 파이프라인' }
      ]
    },
    {
      title: '성과관리',
      desc: '인사평가, 목표관리',
      questions: [
        { id: 25, q: '인사평가의 목적은?', a: '보상결정, 승진배치, 교육훈련 필요 파악, 동기부여' },
        { id: 26, q: '절대평가와 상대평가의 비교는?', a: '절대: 기준 대비 평가 / 상대: 구성원 간 비교(강제배분)' },
        { id: 27, q: '목표관리(MBO)의 특징은?', a: '참여적 목표설정, 과정관리, 결과평가, Drucker' },
        { id: 28, q: '행동기준평가(BARS)란?', a: '직무관련 행동 기술문으로 평가, 개발비용 높음' },
        { id: 29, q: '다면평가(360도 피드백)의 장단점은?', a: '장점: 다양한 시각, 공정성 / 단점: 시간·비용, 관대화' },
        { id: 30, q: '평가오류의 종류는?', a: '관대화/엄격화, 중심화, 후광효과, 최근효과, 유사효과' },
        { id: 31, q: '평가자 훈련의 유형은?', a: '오류훈련, 정확성훈련, 관찰훈련, 프레임 오브 레퍼런스' },
        { id: 32, q: 'BSC(균형성과표)의 4관점은?', a: '재무, 고객, 내부프로세스, 학습과 성장' }
      ]
    },
    {
      title: '보상관리',
      desc: '임금체계, 성과급, 복리후생',
      questions: [
        { id: 33, q: '보상의 공정성 이론(Adams)을 설명하시오.', a: '투입/산출 비율 비교, 내적·외적·개인 공정성' },
        { id: 34, q: '임금체계의 종류는?', a: '연공급, 직무급, 직능급, 성과급, 역량급' },
        { id: 35, q: '직무급의 장단점은?', a: '장점: 동일노동 동일임금, 합리적 / 단점: 직무평가 어려움' },
        { id: 36, q: '성과급제의 유형은?', a: '개인성과급(인센티브), 집단성과급(이익배분, 성과배분)' },
        { id: 37, q: '스캔론 플랜의 내용은?', a: '노동비용 절감 성과 배분, 제안제도, 노사협력' },
        { id: 38, q: '연봉제의 장단점은?', a: '장점: 성과연계, 동기부여 / 단점: 단기성과 편중, 협력 저해' },
        { id: 39, q: '스톡옵션의 기능은?', a: '장기적 성과연계, 인재유치, 주인의식 제고' },
        { id: 40, q: '선택적 복리후생(카페테리아)의 특징은?', a: '근로자 욕구에 맞는 선택, 비용효율성, 만족도 향상' }
      ]
    },
    {
      title: '노사관계',
      desc: '단체교섭, 노사협력',
      questions: [
        { id: 41, q: '노사관계의 유형은?', a: '대립적 노사관계, 협력적 노사관계, 참여적 노사관계' },
        { id: 42, q: '단체교섭의 유형을 설명하시오.', a: '분배적(영합게임) vs 통합적(윈윈) 교섭' },
        { id: 43, q: '고충처리제도의 기능은?', a: '갈등 조기 해결, 소통 채널, 노사관계 안정' },
        { id: 44, q: '노사협의회의 법적 의의는?', a: '30인 이상 사업장 설치 의무, 근로자 경영참여 제도' },
        { id: 45, q: '품질분임조(QC)의 특징은?', a: '자발적 소집단, 품질개선 활동, 참여적 관리' },
        { id: 46, q: '노사파트너십의 요소는?', a: '정보공유, 협의·협상, 공동의사결정, 상호신뢰' },
        { id: 47, q: '근로자 참여의 단계별 수준은?', a: '정보제공→협의→공동결정→자주관리' },
        { id: 48, q: '유연근무제의 종류와 효과는?', a: '시차출퇴근, 재택근무, 압축근무 / 일-생활 균형, 생산성 향상' },
        { id: 49, q: '조직시민행동(OCB)의 유형은?', a: '이타행동, 양심행동, 스포츠맨십, 예의, 시민덕목' },
        { id: 50, q: '이직관리의 전략은?', a: '이직원인 분석, 유지 프로그램, 핵심인재 관리, 퇴직관리' }
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
            <span className="text-amber-600 font-medium">인사노무관리론</span>
          </nav>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">👥 인사노무관리론 핵심문제</h1>
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
                            setCurrentPrompt(`공인노무사 시험 인사노무관리론 문제입니다.

문제: ${q.q}

다음 순서로 상세히 설명해주세요:
1. 핵심 개념과 정의
2. 이론적 배경 (학자, 연구)
3. 실무 적용 사례
4. 장단점 및 한계
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
