'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 1,
    title: '치료적 의사소통의 기초',
    questions: [
      { id: 1, question: '치료적 의사소통의 정의와 목적을 설명하시오', answer: '환자의 건강회복과 성장을 촉진하기 위한 목적지향적 의사소통입니다. 신뢰관계 형성, 감정표현 촉진, 문제해결 지원, 자기인식 증진이 목적입니다.' },
      { id: 2, question: '치료적 의사소통과 사회적 의사소통의 차이를 설명하시오', answer: '치료적 의사소통은 환자중심, 목적지향적이며 전문적 경계가 있습니다. 사회적 의사소통은 상호호혜적이고 친밀감 형성이 목적이며 자유롭습니다.' },
      { id: 3, question: '언어적 의사소통과 비언어적 의사소통을 비교 설명하시오', answer: '언어적: 말과 글로 전달되는 메시지. 비언어적: 표정, 눈맞춤, 자세, 몸짓, 목소리 톤, 공간 사용. 메시지의 70% 이상이 비언어적으로 전달됩니다.' },
      { id: 4, question: '의사소통의 구성요소를 설명하시오', answer: '발신자(메시지 전달), 수신자(메시지 받음), 메시지(내용), 채널(전달방법), 피드백(반응), 맥락(환경과 상황), 잡음(방해요소)으로 구성됩니다.' },
      { id: 5, question: '효과적 의사소통의 특성을 설명하시오', answer: '명확성, 간결성, 적시성, 적절성, 융통성, 일치성(언어와 비언어 일치), 신뢰성, 적응성이 특성입니다. 상대방의 반응을 확인합니다.' },
      { id: 6, question: '의사소통 장애요인을 설명하시오', answer: '발신자 요인(불명확한 표현), 수신자 요인(선입견, 방어), 환경 요인(소음, 프라이버시 부족), 메시지 요인(모호함, 불일치), 관계 요인(불신, 권력 차이).' },
      { id: 7, question: '문화적 차이가 의사소통에 미치는 영향을 설명하시오', answer: '눈맞춤, 신체접촉, 개인공간, 감정표현, 침묵의 의미가 문화마다 다릅니다. 문화적 민감성을 갖고 편견 없이 접근해야 합니다.' },
      { id: 8, question: '치료적 의사소통에서 침묵의 활용을 설명하시오', answer: '생각 정리 시간 제공, 감정 표현 격려, 내면 탐색 촉진의 기능이 있습니다. 불편함을 참고 기다리는 것이 중요합니다. 너무 긴 침묵은 불안을 유발합니다.' },
      { id: 9, question: '치료적 환경의 요소를 설명하시오', answer: '물리적 환경(안전, 프라이버시, 편안함), 심리적 환경(신뢰, 수용, 존중), 사회적 환경(지지, 상호작용 기회)이 치료적 환경의 요소입니다.' },
      { id: 10, question: '의사소통에서 자기인식의 중요성을 설명하시오', answer: '자신의 편견, 가치관, 감정, 비언어적 행동을 인식해야 합니다. 자기인식이 부족하면 환자에게 부정적 영향을 줄 수 있습니다. 성찰이 중요합니다.' },
    ]
  },
  {
    id: 2,
    title: '치료적 의사소통 기법',
    questions: [
      { id: 11, question: '적극적 경청의 구성요소와 기법을 설명하시오', answer: '신체적 주의(자세, 눈맞춤), 심리적 주의(판단 보류), 언어적 촉진(음, 예), 비언어적 촉진(고개 끄덕임), 요약과 반영이 구성요소입니다.' },
      { id: 12, question: '개방형 질문과 폐쇄형 질문을 비교 설명하시오', answer: '개방형: 자유로운 답변 유도, 탐색과 감정표현에 적합. 예: "어떻게 느끼세요?" 폐쇄형: 예/아니오 또는 단답, 구체적 정보수집에 적합. 예: "잠은 잘 주무셨나요?"' },
      { id: 13, question: '반영(Reflection)의 유형과 활용을 설명하시오', answer: '내용 반영: 말의 내용을 되돌려줌. 감정 반영: 감정을 명명하여 되돌려줌. 의미 반영: 말에 담긴 의미를 되돌려줌. 환자가 이해받는 느낌을 갖게 합니다.' },
      { id: 14, question: '명료화(Clarification)의 목적과 방법을 설명하시오', answer: '모호한 메시지를 명확히 하고 오해를 방지합니다. "~라고 말씀하시는 것인가요?", "좀 더 설명해 주시겠어요?"와 같이 확인합니다.' },
      { id: 15, question: '요약(Summarizing)의 목적과 시점을 설명하시오', answer: '주요 내용을 정리하여 되돌려주는 기법입니다. 면담 중간과 끝에 사용하여 이해를 확인하고 다음 단계로 진행합니다. 환자가 중요한 점을 인식하게 돕습니다.' },
      { id: 16, question: '공감적 반응의 특성과 표현방법을 설명하시오', answer: '환자의 입장에서 감정을 이해하고 전달하는 것입니다. "그런 상황이라면 정말 힘드셨겠네요"와 같이 감정을 인정하고 이해를 표현합니다.' },
      { id: 17, question: '타당화(Validation)의 의미와 중요성을 설명하시오', answer: '환자의 경험과 감정이 이해 가능하고 정당함을 인정하는 것입니다. 자존감을 높이고 신뢰관계를 강화합니다. "그런 상황에서 화가 나는 것은 당연해요."' },
      { id: 18, question: '초점 맞추기(Focusing)의 목적과 방법을 설명하시오', answer: '주제에서 벗어날 때 핵심 문제로 되돌리는 기법입니다. "아까 말씀하신 ~에 대해 더 이야기해볼까요?"와 같이 부드럽게 안내합니다.' },
      { id: 19, question: '탐색(Exploring)의 목적과 기법을 설명하시오', answer: '문제를 더 깊이 이해하기 위해 추가 정보를 얻는 것입니다. 개방형 질문, "그때 어떤 생각이 드셨어요?", "좀 더 말씀해 주세요" 등을 사용합니다.' },
      { id: 20, question: '정보제공의 원칙과 방법을 설명하시오', answer: '정확하고 이해하기 쉬운 정보를 적절한 시기에 제공합니다. 환자의 지식수준과 준비도를 확인하고 이해를 확인합니다. 일방적 교육이 아닌 대화여야 합니다.' },
    ]
  },
  {
    id: 3,
    title: '비치료적 의사소통',
    questions: [
      { id: 21, question: '충고와 지시적 태도가 비치료적인 이유를 설명하시오', answer: '환자의 자기결정권을 무시하고 의존성을 높입니다. 간호사의 가치관을 강요합니다. 대신 정보제공과 선택지 제시가 적절합니다.' },
      { id: 22, question: '거짓 안심이 비치료적인 이유를 설명하시오', answer: '"걱정 마세요, 다 잘 될 거예요"와 같은 반응은 환자의 감정을 무시하고 비현실적 기대를 줍니다. 대신 감정을 인정하고 현실적 지지를 제공합니다.' },
      { id: 23, question: '판단적 반응의 문제점을 설명하시오', answer: '"그건 잘못된 생각이에요"와 같은 반응은 방어적 태도를 유발하고 신뢰를 손상시킵니다. 비심판적 태도로 환자의 관점을 이해하려 노력해야 합니다.' },
      { id: 24, question: '주제 전환의 문제점을 설명하시오', answer: '환자가 중요한 이야기를 할 때 주제를 바꾸면 감정이 무시받는 느낌을 줍니다. 불편한 주제라도 환자의 페이스를 따르는 것이 중요합니다.' },
      { id: 25, question: '상투적 반응의 문제점을 설명하시오', answer: '"시간이 약이에요", "남들도 다 그래요"와 같은 반응은 진정한 이해가 아닙니다. 개별적인 반응과 진심어린 관심이 필요합니다.' },
      { id: 26, question: '과도한 질문의 문제점을 설명하시오', answer: '연속적인 질문은 취조하는 느낌을 주고 방어적 태도를 유발합니다. 질문 후 충분한 응답 시간을 주고 경청해야 합니다.' },
      { id: 27, question: '"왜"로 시작하는 질문의 문제점을 설명하시오', answer: '"왜 그랬어요?"는 비난처럼 들릴 수 있고 방어적 반응을 유발합니다. 대신 "어떤 일이 있었나요?"와 같이 대체합니다.' },
      { id: 28, question: '자기 노출의 적절한 사용과 주의점을 설명하시오', answer: '간호사의 경험 공유가 환자에게 도움이 될 때 제한적으로 사용합니다. 과도한 자기 노출은 초점을 간호사에게로 옮기고 전문적 경계를 흐립니다.' },
      { id: 29, question: '방어적 반응의 문제점을 설명하시오', answer: '환자의 비판이나 불만에 변명하거나 반박하면 대화가 단절됩니다. 환자의 감정을 먼저 인정하고 문제를 탐색해야 합니다.' },
      { id: 30, question: '동의 구하기의 문제점을 설명하시오', answer: '"그렇죠?", "제가 맞죠?"와 같이 동의를 요구하면 환자가 자신의 의견을 표현하기 어렵습니다. 열린 질문으로 환자의 생각을 물어야 합니다.' },
    ]
  },
  {
    id: 4,
    title: '치료적 관계',
    questions: [
      { id: 31, question: '치료적 관계의 특성을 설명하시오', answer: '목적지향적, 환자중심, 전문적 경계, 시간제한적, 신뢰기반입니다. 환자의 성장과 회복을 목표로 합니다. 상호호혜적 관계와 구별됩니다.' },
      { id: 32, question: '치료적 관계의 단계를 설명하시오', answer: '오리엔테이션 단계(신뢰형성, 계약), 작업 단계(문제탐색, 목표달성), 종결 단계(성과 평가, 이별 준비)로 진행됩니다.' },
      { id: 33, question: '오리엔테이션 단계의 과업을 설명하시오', answer: '신뢰관계 형성, 역할 명확화, 계약 수립(목표, 빈도, 비밀유지), 초기 자료수집이 과업입니다. 환자의 검증(testing) 행동이 나타날 수 있습니다.' },
      { id: 34, question: '작업 단계의 특성과 과업을 설명하시오', answer: '문제의 탐색과 분석, 감정의 표현과 처리, 새로운 대처기술 학습, 행동 변화 실행이 과업입니다. 저항과 퇴행이 나타날 수 있습니다.' },
      { id: 35, question: '종결 단계의 과업과 반응을 설명하시오', answer: '성취 평가, 미래 계획, 이별감정 처리가 과업입니다. 환자는 분리불안, 퇴행, 분노를 보일 수 있습니다. 충분한 종결 준비가 필요합니다.' },
      { id: 36, question: '신뢰관계 형성을 위한 전략을 설명하시오', answer: '일관성 있는 행동, 약속 이행, 진실성, 비심판적 태도, 비밀유지, 적극적 경청, 공감적 반응, 환자의 자율성 존중이 전략입니다.' },
      { id: 37, question: '전문적 경계의 개념과 중요성을 설명하시오', answer: '치료적 관계의 한계를 정하는 것입니다. 경계 침해는 환자에게 해를 끼치고 전문성을 손상시킵니다. 시간, 장소, 접촉, 자기 노출, 선물에 경계를 둡니다.' },
      { id: 38, question: '경계 침해와 경계 횡단의 차이를 설명하시오', answer: '경계 횡단은 일시적이고 치료적 목적이 있을 수 있습니다(예: 위급상황에서 신체접촉). 경계 침해는 환자에게 해가 되는 것으로 항상 부적절합니다.' },
      { id: 39, question: '전이(Transference)의 개념과 관리를 설명하시오', answer: '환자가 과거 중요 인물에 대한 감정을 간호사에게 투사하는 것입니다. 인식하고 탐색하여 치료적으로 활용합니다. 개인적으로 받아들이지 않습니다.' },
      { id: 40, question: '역전이(Countertransference)의 인식과 관리를 설명하시오', answer: '간호사가 환자에게 갖는 무의식적 반응입니다. 과도한 감정, 회피, 특별대우 욕구 등으로 나타납니다. 자기인식, 수퍼비전, 성찰이 필요합니다.' },
    ]
  },
  {
    id: 5,
    title: '특수 상황에서의 의사소통',
    questions: [
      { id: 41, question: '자살사고가 있는 환자와의 의사소통을 설명하시오', answer: '직접적으로 자살사고를 질문합니다. 판단하지 않고 경청합니다. 고통을 인정하고 도움을 제공합니다. 안전계획을 수립하고 전문가에게 보고합니다.' },
      { id: 42, question: '초조하거나 공격적인 환자와의 의사소통을 설명하시오', answer: '안전 확보가 최우선입니다. 차분하고 비위협적인 자세를 취합니다. 개인공간을 존중하고 선택지를 제공합니다. 한계를 명확히 설정합니다.' },
      { id: 43, question: '망상이 있는 환자와의 의사소통을 설명하시오', answer: '망상에 동의하거나 반박하지 않습니다. 환자의 감정에 초점을 맞춥니다. 현실적 주제로 대화를 이끕니다. 신뢰관계를 유지합니다.' },
      { id: 44, question: '환청이 있는 환자와의 의사소통을 설명하시오', answer: '환청 경험을 인정하되 간호사에게는 들리지 않음을 표현합니다. 환청과 대화하기보다 현실적 활동에 참여하도록 돕습니다. 대처기술을 교육합니다.' },
      { id: 45, question: '우울한 환자와의 의사소통을 설명하시오', answer: '조용히 곁에 있어주고 경청합니다. 감정을 표현하도록 격려합니다. 무기력함을 인정하고 작은 성취를 격려합니다. 자살위험을 평가합니다.' },
      { id: 46, question: '불안한 환자와의 의사소통을 설명하시오', answer: '차분하고 안정된 태도를 유지합니다. 단순하고 명확한 언어를 사용합니다. 호흡조절을 함께 합니다. 불안을 인정하고 안전감을 제공합니다.' },
      { id: 47, question: '인지장애가 있는 환자와의 의사소통을 설명하시오', answer: '단순하고 구체적인 언어를 사용합니다. 한 번에 하나의 지시를 합니다. 시각적 단서를 활용합니다. 충분한 반응 시간을 줍니다. 존중하는 태도를 유지합니다.' },
      { id: 48, question: '분노한 환자와의 의사소통을 설명하시오', answer: '분노를 인정하고 표현하도록 허용합니다. 방어적이지 않게 경청합니다. 원인을 탐색합니다. 문제해결에 초점을 맞춥니다. 필요시 한계를 설정합니다.' },
      { id: 49, question: '말이 없는(무언) 환자와의 의사소통을 설명하시오', answer: '침묵을 견디고 곁에 있어줍니다. 비언어적 의사소통에 주의를 기울입니다. 압박하지 않고 개방형 질문을 사용합니다. 다른 표현방법을 제안합니다.' },
      { id: 50, question: '가족과의 치료적 의사소통을 설명하시오', answer: '가족을 치료 파트너로 인식합니다. 정보제공과 교육을 합니다. 가족의 감정과 부담을 인정합니다. 지지자원을 연결합니다. 비밀유지 경계를 명확히 합니다.' },
    ]
  }
];

export default function TherapeuticCommunicationPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([1]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mental-health-nurse-therapeutic-communication-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('mental-health-nurse-therapeutic-communication-completed', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: number) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleQuestion = (questionId: number) => {
    setCompletedQuestions(prev =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = completedQuestions.length;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-orange-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/mental-health-nurse" className="text-gray-600 hover:text-orange-600">정신건강간호사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">치료적 의사소통</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">💬</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">치료적 의사소통</h1>
              <p className="text-gray-600">정신건강간호사 필기시험 대비</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">학습 진행률</span>
              <span className="text-sm font-medium text-orange-600">{completedCount}/{totalQuestions} 완료 ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📘</span>
                  <span className="font-medium text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-500">({topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length})</span>
                </div>
                <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map(q => (
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.includes(q.id) ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${completedQuestions.includes(q.id) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300'}`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 bg-white p-3 rounded border">{q.answer}</p>
                          <div className="mt-2 flex gap-2">
                            <a href={`https://claude.ai/new?q=${encodeURIComponent(q.question)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200">Claude</a>
                            <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.question)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">ChatGPT</a>
                            <a href={`https://gemini.google.com/?q=${encodeURIComponent(q.question)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Gemini</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
