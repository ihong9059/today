'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SocialWelfarePracticeStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '실천 개념과 가치', icon: '💎' },
    { id: 1, name: '관계형성', icon: '🤝' },
    { id: 2, name: '면접기술', icon: '💬' },
    { id: 3, name: '과정론', icon: '📋' },
    { id: 4, name: '개입기술', icon: '🎯' },
    { id: 5, name: '사례관리', icon: '📁' },
    { id: 6, name: '기록과 평가', icon: '📝' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '사회복지실천의 정의와 목적은 무엇인가?', answer: '사회복지실천은 개인, 집단, 지역사회가 사회적 기능을 향상시키고 사회정의를 실현하도록 돕는 전문적 활동이다.', explanation: '인간의 존엄성, 사회정의, 클라이언트 자기결정권 존중' },
      { id: 2, question: '사회복지실천의 6대 가치는 무엇인가?', answer: '서비스, 사회정의, 인간의 존엄성과 가치, 인간관계의 중요성, 성실성, 역량이다.', explanation: 'NASW 윤리강령 핵심 가치' },
      { id: 3, question: '클라이언트 자기결정권의 의미와 한계는?', answer: '클라이언트가 스스로 선택하고 결정할 권리이나, 타인에게 해가 되거나 자해 위험이 있을 때는 제한된다.', explanation: '자율성 존중의 원칙' },
      { id: 4, question: '비밀보장의 원칙과 예외 상황은?', answer: '클라이언트 정보를 보호해야 하나, 아동학대, 자살위험, 타인에 대한 위험 등 특수상황에서는 예외가 적용된다.', explanation: '법적 의무와 윤리적 책임' },
      { id: 5, question: '통합적 방법론(Generalist Practice)이란?', answer: '다양한 수준(개인, 가족, 집단, 지역사회)에 적용 가능한 포괄적 실천방법으로, 단일한 이론에 국한되지 않는다.', explanation: '문제해결 중심의 통합적 접근' },
      { id: 6, question: '사회복지사의 이중관계 금지 원칙은?', answer: '사회복지사는 클라이언트와 전문적 관계 외의 개인적, 사업적 관계를 맺지 않아야 한다.', explanation: '권력 불균형과 착취 방지' },
      { id: 7, question: '강점관점(Strengths Perspective)이란?', answer: '클라이언트의 문제나 결함보다 강점, 자원, 잠재력에 초점을 맞추는 관점이다.', explanation: '임파워먼트와 연결되는 관점' }
    ],
    1: [
      { id: 8, question: '전문적 원조관계의 특성은?', answer: '목적지향성, 시간제한성, 객관성, 권위와 책임, 통제된 정서적 관여 등이 있다.', explanation: '일반 대인관계와의 차이점' },
      { id: 9, question: '비에스텍(Biestek)의 관계형성 7대 원칙은?', answer: '개별화, 의도적 감정표현, 통제된 정서적 관여, 수용, 비심판적 태도, 자기결정, 비밀보장이다.', explanation: '전문적 관계형성의 기본 원칙' },
      { id: 10, question: '라포(Rapport) 형성의 중요성과 방법은?', answer: '라포는 신뢰와 친밀감의 형성으로, 경청, 공감, 존중을 통해 형성되며 효과적 개입의 기반이 된다.', explanation: '초기 단계에서 가장 중요' },
      { id: 11, question: '저항(Resistance)의 유형과 대처방법은?', answer: '침묵, 지각, 약속 불이행 등이 있으며, 저항을 인정하고 원인을 탐색하며 안전한 환경을 제공한다.', explanation: '저항은 자연스러운 반응' },
      { id: 12, question: '전이(Transference)와 역전이(Counter-transference)란?', answer: '전이는 클라이언트가 과거 관계를 사회복지사에게 투사하는 것이고, 역전이는 사회복지사가 클라이언트에게 투사하는 것이다.', explanation: '인식하고 적절히 다루어야 함' },
      { id: 13, question: '경계설정(Boundary Setting)의 중요성은?', answer: '전문적 관계의 한계를 명확히 하여 양 당사자를 보호하고 효과적 서비스를 제공하기 위함이다.', explanation: '이중관계 방지와 연결' },
      { id: 14, question: '공감(Empathy)과 동정(Sympathy)의 차이는?', answer: '공감은 클라이언트의 입장에서 이해하고 느끼는 것이고, 동정은 불쌍히 여기는 감정으로 전문적이지 않다.', explanation: '정서적 거리두기 필요' }
    ],
    2: [
      { id: 15, question: '면접의 유형과 특성을 설명하시오.', answer: '정보수집 면접, 사정 면접, 치료적 면접, 종결 면접 등이 있으며 목적에 따라 구분된다.', explanation: '면접 목적에 따른 분류' },
      { id: 16, question: '개방형 질문과 폐쇄형 질문의 차이와 활용은?', answer: '개방형은 자유로운 응답을, 폐쇄형은 예/아니오 같은 간단한 답변을 유도한다. 상황에 따라 적절히 혼용한다.', explanation: '탐색에는 개방형, 확인에는 폐쇄형' },
      { id: 17, question: '적극적 경청(Active Listening)의 기법은?', answer: '언어적/비언어적 반응, 바꾸어 말하기, 요약, 명료화 등을 통해 집중하고 있음을 전달한다.', explanation: '관심과 이해의 표현' },
      { id: 18, question: '반영(Reflection)과 재진술(Restatement)의 차이는?', answer: '반영은 감정을 되돌려주는 것이고, 재진술은 내용을 다른 말로 요약하는 것이다.', explanation: '감정 vs 내용 초점' },
      { id: 19, question: '침묵에 대한 대처 방법은?', answer: '침묵의 의미를 파악하고, 충분한 시간을 주며, 필요시 부드럽게 탐색하거나 주제를 전환한다.', explanation: '침묵도 의사소통의 일부' },
      { id: 20, question: '직면(Confrontation) 기법의 사용 시기와 방법은?', answer: '클라이언트의 말과 행동 간 불일치를 지적할 때 사용하며, 라포 형성 후 비공격적으로 한다.', explanation: '주의 깊게 사용해야 하는 기법' },
      { id: 21, question: '면접 기록의 유형과 특징은?', answer: '과정기록, 요약기록, 문제중심기록(SOAP), 이야기체기록 등이 있다.', explanation: '기관과 목적에 따라 선택' }
    ],
    3: [
      { id: 22, question: '사회복지실천 과정의 단계를 설명하시오.', answer: '접수(Intake) → 자료수집 → 사정 → 계획 → 개입 → 점검/평가 → 종결의 순서로 진행된다.', explanation: '순환적이고 역동적인 과정' },
      { id: 23, question: '접수(Intake) 단계의 주요 과업은?', answer: '문제 확인, 클라이언트 적격성 판단, 기관 서비스 설명, 라포 형성, 계약 여부 결정이다.', explanation: '첫 만남의 중요성' },
      { id: 24, question: '사정(Assessment)의 목적과 내용은?', answer: '클라이언트의 문제, 욕구, 강점, 자원을 파악하여 개입 방향을 결정하는 것이다.', explanation: '생태도, 가계도 등 도구 활용' },
      { id: 25, question: 'PIE(Person-In-Environment) 분류체계란?', answer: '개인의 사회적 기능수행 문제, 환경적 문제, 정신건강 문제, 신체건강 문제를 분류하는 체계이다.', explanation: '사회복지 고유의 사정 체계' },
      { id: 26, question: '개입 계획 수립 시 고려사항은?', answer: '목표의 구체성, 측정가능성, 달성가능성, 시간제한성, 클라이언트 참여가 중요하다.', explanation: 'SMART 목표 설정' },
      { id: 27, question: '종결(Termination)의 유형과 과업은?', answer: '계획된 종결, 조기종결, 의뢰 등이 있으며, 성취 요약, 감정 다루기, 사후관리 계획이 필요하다.', explanation: '분리불안 다루기' },
      { id: 28, question: '사후관리(Follow-up)의 중요성은?', answer: '종결 후 변화 유지 여부를 확인하고, 필요시 추가 서비스를 연계하기 위함이다.', explanation: '지속적 지원 체계' }
    ],
    4: [
      { id: 29, question: '위기개입(Crisis Intervention)의 특성은?', answer: '즉각적, 단기적, 집중적 개입으로 위기 해결과 이전 기능 수준 회복을 목표로 한다.', explanation: '6주 이내 단기 개입' },
      { id: 30, question: '과제중심모델(Task-Centered Model)이란?', answer: '구체적이고 측정 가능한 과제를 설정하여 단기간에 문제를 해결하는 모델이다.', explanation: '8-12회 단기 개입' },
      { id: 31, question: '인지행동모델(CBT)의 핵심 개념은?', answer: '인지(생각)가 감정과 행동에 영향을 미치므로, 부정적 인지 왜곡을 수정하여 변화를 이끈다.', explanation: '인지재구조화 기법' },
      { id: 32, question: '해결중심모델(Solution-Focused)의 특징은?', answer: '문제 원인보다 해결책에 초점을 맞추며, 클라이언트의 강점과 예외상황을 활용한다.', explanation: '기적질문, 척도질문 활용' },
      { id: 33, question: '임파워먼트(Empowerment) 접근의 원칙은?', answer: '클라이언트가 자신의 삶에 대한 통제력을 갖도록 역량을 강화하는 것이다.', explanation: '권한부여와 역량강화' },
      { id: 34, question: '옹호(Advocacy)의 유형과 방법은?', answer: '사례옹호, 집단옹호, 정책옹호 등이 있으며 클라이언트 권리 보호를 위해 대변하고 행동한다.', explanation: '사회정의 실현의 방법' },
      { id: 35, question: '네트워킹(Networking)과 자원연계의 중요성은?', answer: '클라이언트에게 필요한 서비스와 자원을 연결하여 통합적 지원을 제공한다.', explanation: '사례관리의 핵심 기능' }
    ],
    5: [
      { id: 36, question: '사례관리(Case Management)의 정의와 목적은?', answer: '복합적 욕구를 가진 클라이언트에게 포괄적이고 지속적인 서비스를 조정·연계하는 것이다.', explanation: '서비스 파편화 해결' },
      { id: 37, question: '사례관리의 구성요소는?', answer: '사례발굴, 접수, 사정, 계획, 서비스 연계, 점검, 평가, 종결의 과정으로 이루어진다.', explanation: '일반 실천과정과 유사하나 더 포괄적' },
      { id: 38, question: '사례관리자의 역할은?', answer: '조정자, 옹호자, 중개자, 상담가, 교사, 행정가 등 다양한 역할을 수행한다.', explanation: '직접·간접 서비스 모두 포함' },
      { id: 39, question: '서비스 조정(Coordination)의 방법은?', answer: '사례회의, 정기적 모니터링, 서비스 제공자 간 의사소통, 자원 목록 관리 등이 있다.', explanation: '통합적 서비스 제공' },
      { id: 40, question: '다학제적 팀 접근(Multidisciplinary Team)이란?', answer: '다양한 전문 분야의 전문가들이 협력하여 클라이언트에게 서비스를 제공하는 방식이다.', explanation: '의료, 심리, 사회복지 등 협력' },
      { id: 41, question: '모니터링(Monitoring)의 목적과 방법은?', answer: '서비스 제공 상태를 점검하고 계획대로 진행되는지 확인하며, 정기적 접촉과 기록을 통해 수행한다.', explanation: '지속적 관리의 핵심' },
      { id: 42, question: '사례관리의 윤리적 쟁점은?', answer: '클라이언트 이익 vs 비용통제, 자기결정 vs 보호, 비밀보장 vs 정보공유 등이 있다.', explanation: '다양한 이해관계 조정 필요' }
    ],
    6: [
      { id: 43, question: '사회복지 기록의 목적과 원칙은?', answer: '서비스의 연속성, 책임성, 질 향상을 위해 정확하고 객관적으로 기록해야 한다.', explanation: '법적 문서로서의 가치' },
      { id: 44, question: '과정기록(Process Recording)의 특징은?', answer: '면접 내용을 상세하게 기록하며, 사회복지사의 사고와 감정도 포함한다. 교육과 슈퍼비전에 활용된다.', explanation: '훈련 목적으로 주로 사용' },
      { id: 45, question: 'SOAP 기록방식이란?', answer: 'Subjective(주관적 정보), Objective(객관적 정보), Assessment(사정), Plan(계획)의 구조이다.', explanation: '의료사회복지에서 주로 사용' },
      { id: 46, question: '형성평가와 총괄평가의 차이는?', answer: '형성평가는 진행 중 개선을 위한 것이고, 총괄평가는 종결 후 전체 효과를 측정한다.', explanation: '과정 vs 결과 평가' },
      { id: 47, question: '단일사례설계(Single-Subject Design)란?', answer: '개별 클라이언트를 대상으로 기준선과 개입 후를 비교하여 효과를 측정하는 방법이다.', explanation: 'AB, ABA, ABAB 설계 등' },
      { id: 48, question: '슈퍼비전(Supervision)의 기능은?', answer: '행정적 기능(관리), 교육적 기능(지식·기술 발전), 지지적 기능(정서적 지원)이 있다.', explanation: '사회복지사 성장의 핵심' },
      { id: 49, question: '자기인식(Self-awareness)의 중요성은?', answer: '자신의 가치, 편견, 감정을 인식하여 클라이언트에게 미치는 영향을 관리해야 한다.', explanation: '전문성의 핵심 요소' },
      { id: 50, question: '소진(Burnout) 예방과 자기관리 방법은?', answer: '적절한 업무량 관리, 슈퍼비전 활용, 동료 지지, 휴식, 자기돌봄 활동이 필요하다.', explanation: '지속가능한 실천을 위해 필수' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`사회복지사 2급 사회복지실천론 관련 질문입니다:\n\n${question}\n\n이 개념에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/welfare" className="hover:text-white">사회복지·상담</Link><span>/</span>
            <Link href="/category/welfare/social-worker-2" className="hover:text-white">사회복지사 2급</Link><span>/</span>
            <Link href="/category/welfare/social-worker-2/study" className="hover:text-white">학습</Link><span>/</span>
            <span className="text-white">사회복지실천론</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">🤝 사회복지실천론</h1>
          <p className="text-blue-100">개입과정, 면접기술, 관계형성, 사례관리</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-blue-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">📚 학습 토픽</h3>
              <div className="space-y-2">
                {topics.map((topic) => (
                  <button key={topic.id} onClick={() => setCurrentTopic(topic.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-blue-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg"><p className="font-medium text-blue-900">✅ 정답</p><p className="text-blue-800 mt-1">{q.answer}</p></div>
                    <div className="p-4 bg-gray-50 rounded-lg"><p className="font-medium text-gray-700">💡 해설</p><p className="text-gray-600 mt-1">{q.explanation}</p></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">🤖 AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto"><p className="text-gray-700 text-sm whitespace-pre-wrap">{currentPrompt}</p></div>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 rounded-lg font-medium">Claude에서 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg font-medium">ChatGPT에서 질문하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 rounded-lg font-medium">Gemini에서 질문하기</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
