'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 1,
    title: '정신건강의 개념과 이해',
    questions: [
      { id: 1, question: '정신건강의 정의와 WHO의 정신건강 개념을 설명하시오', answer: '정신건강이란 단순히 정신질환이 없는 상태가 아니라, 개인이 자신의 능력을 실현하고 일상적인 스트레스에 대처하며 생산적으로 일하고 지역사회에 기여할 수 있는 안녕 상태를 의미합니다.' },
      { id: 2, question: '정상과 비정상의 구분 기준에 대해 설명하시오', answer: '통계적 기준(평균에서 벗어난 정도), 사회문화적 기준(사회 규범 이탈), 주관적 기준(개인의 고통), 기능적 기준(일상생활 수행 능력), 이상적 기준(최적 기능 상태)으로 구분합니다.' },
      { id: 3, question: '정신건강의 구성요소를 설명하시오', answer: '정서적 안녕(감정 조절), 심리적 안녕(자아실현, 자율성), 사회적 안녕(대인관계, 사회적 통합), 신체적 안녕(심신 연결)으로 구성됩니다.' },
      { id: 4, question: '정신건강에 영향을 미치는 생물학적 요인을 설명하시오', answer: '유전적 요인(가족력), 신경전달물질 불균형(도파민, 세로토닌), 뇌구조 이상, 호르몬 변화, 신체질환, 물질 사용 등이 영향을 미칩니다.' },
      { id: 5, question: '정신건강에 영향을 미치는 심리사회적 요인을 설명하시오', answer: '초기 양육환경, 애착관계, 트라우마 경험, 스트레스, 사회적 지지, 문화적 요인, 경제적 상태, 교육수준 등이 영향을 미칩니다.' },
      { id: 6, question: '1차 정신건강 예방의 개념과 활동을 설명하시오', answer: '질병 발생 이전에 위험요인을 감소시키는 활동입니다. 정신건강 교육, 스트레스 관리 프로그램, 약물남용 예방 교육, 자살예방 교육 등이 해당됩니다.' },
      { id: 7, question: '2차 정신건강 예방의 개념과 활동을 설명하시오', answer: '질병의 조기발견과 조기치료를 통해 유병률을 낮추는 활동입니다. 정신건강 선별검사, 위기개입, 응급정신건강서비스 제공 등이 해당됩니다.' },
      { id: 8, question: '3차 정신건강 예방의 개념과 활동을 설명하시오', answer: '만성 정신질환자의 재활과 사회복귀를 돕는 활동입니다. 직업재활, 사회기술훈련, 주거서비스, 사례관리 등이 해당됩니다.' },
      { id: 9, question: '정신건강복지법의 주요 내용을 설명하시오', answer: '정신질환자 인권보호, 자의입원 원칙, 비자의 입원 절차 강화, 지역사회 정신건강서비스 확대, 정신건강복지센터 설치 등을 규정합니다.' },
      { id: 10, question: '회복(Recovery) 모델의 개념과 원칙을 설명하시오', answer: '정신질환에서의 회복은 증상 제거가 아닌 의미 있는 삶을 사는 것입니다. 희망, 자기결정권, 강점 중심, 사회적 포함, 전인적 접근을 원칙으로 합니다.' },
    ]
  },
  {
    id: 2,
    title: '인간발달이론',
    questions: [
      { id: 11, question: 'Freud의 심리성적 발달단계를 설명하시오', answer: '구강기(0-1세), 항문기(1-3세), 남근기(3-6세), 잠복기(6-12세), 생식기(12세 이후)로 구분됩니다. 각 단계의 갈등 해결이 성격 발달에 영향을 줍니다.' },
      { id: 12, question: 'Erikson의 심리사회적 발달 8단계를 설명하시오', answer: '신뢰vs불신, 자율성vs수치심, 주도성vs죄책감, 근면성vs열등감, 정체감vs역할혼란, 친밀감vs고립, 생산성vs침체, 자아통합vs절망으로 구성됩니다.' },
      { id: 13, question: 'Piaget의 인지발달이론 4단계를 설명하시오', answer: '감각운동기(0-2세), 전조작기(2-7세), 구체적 조작기(7-11세), 형식적 조작기(11세 이후)로 구분됩니다. 각 단계에서 인지 능력이 질적으로 발달합니다.' },
      { id: 14, question: 'Bowlby의 애착이론을 설명하시오', answer: '영아가 주 양육자와 형성하는 정서적 유대입니다. 안정애착, 회피애착, 저항애착, 혼란애착으로 분류됩니다. 초기 애착이 이후 대인관계에 영향을 줍니다.' },
      { id: 15, question: 'Kohlberg의 도덕발달이론을 설명하시오', answer: '전인습적 수준(처벌회피, 보상추구), 인습적 수준(사회규범 순응, 법과 질서), 후인습적 수준(사회계약, 보편윤리)의 3수준 6단계로 구분됩니다.' },
      { id: 16, question: 'Maslow의 욕구위계이론을 설명하시오', answer: '생리적 욕구, 안전 욕구, 소속과 사랑의 욕구, 존경의 욕구, 자아실현 욕구의 5단계로 구성됩니다. 하위 욕구가 충족되어야 상위 욕구가 동기화됩니다.' },
      { id: 17, question: '청소년기 정신건강의 특성과 발달과업을 설명하시오', answer: '정체성 확립이 주요 과업입니다. 신체 변화, 또래관계 중요성 증가, 독립 추구, 가치관 형성 등의 특성이 있으며 정서적 불안정이 나타날 수 있습니다.' },
      { id: 18, question: '중년기 정신건강의 특성과 발달과업을 설명하시오', answer: '생산성 vs 침체의 위기를 경험합니다. 자녀 독립, 직업적 성취 재평가, 신체 노화 적응, 노년기 준비가 과업입니다. 갱년기 우울, 빈둥지 증후군이 나타날 수 있습니다.' },
      { id: 19, question: '노년기 정신건강의 특성과 발달과업을 설명하시오', answer: '자아통합 vs 절망의 과업이 있습니다. 은퇴 적응, 건강 관리, 배우자 상실 대처, 죽음 준비가 과업입니다. 우울, 치매, 고독 등의 문제가 발생할 수 있습니다.' },
      { id: 20, question: '발달위기와 정신건강의 관계를 설명하시오', answer: '각 발달단계의 위기를 건강하게 해결하면 심리적 성장이 이루어지고, 해결하지 못하면 이후 적응에 어려움이 생길 수 있습니다. 발달지연이나 퇴행이 나타날 수 있습니다.' },
    ]
  },
  {
    id: 3,
    title: '정신역동이론',
    questions: [
      { id: 21, question: 'Freud의 정신구조 이론(원초아, 자아, 초자아)을 설명하시오', answer: '원초아(id)는 쾌락원칙에 따르는 본능, 자아(ego)는 현실원칙에 따라 중재, 초자아(superego)는 도덕원칙에 따르는 양심입니다.' },
      { id: 22, question: 'Freud의 의식 수준 이론을 설명하시오', answer: '의식(현재 자각하는 것), 전의식(노력하면 의식할 수 있는 것), 무의식(자각할 수 없으나 행동에 영향을 주는 것)으로 구분됩니다.' },
      { id: 23, question: '방어기제의 개념과 기능을 설명하시오', answer: '자아가 불안으로부터 자신을 보호하기 위해 무의식적으로 사용하는 심리적 기제입니다. 건강한 적응을 돕기도 하지만 과도하게 사용하면 문제가 됩니다.' },
      { id: 24, question: '억압과 부정의 방어기제를 비교 설명하시오', answer: '억압은 고통스러운 생각이나 감정을 무의식으로 밀어내는 것이고, 부정은 불쾌한 현실을 인정하지 않는 것입니다.' },
      { id: 25, question: '투사와 투입의 방어기제를 비교 설명하시오', answer: '투사는 자신의 받아들이기 어려운 감정을 타인에게 돌리는 것이고, 투입은 타인의 특성을 자신의 것으로 내면화하는 것입니다.' },
      { id: 26, question: '합리화와 지성화의 방어기제를 비교 설명하시오', answer: '합리화는 그럴듯한 이유를 만들어 자신의 행동을 정당화하는 것이고, 지성화는 감정을 회피하기 위해 지적으로 분석하는 것입니다.' },
      { id: 27, question: '퇴행과 고착의 방어기제를 설명하시오', answer: '퇴행은 스트레스 상황에서 이전 발달단계의 행동으로 돌아가는 것이고, 고착은 특정 발달단계에 머물러 있는 것입니다.' },
      { id: 28, question: '승화와 반동형성의 방어기제를 설명하시오', answer: '승화는 수용되지 않는 충동을 사회적으로 인정되는 활동으로 전환하는 것이고, 반동형성은 억압된 감정과 반대되는 태도를 취하는 것입니다.' },
      { id: 29, question: '전이와 역전이의 개념과 간호에서의 활용을 설명하시오', answer: '전이는 환자가 과거 중요한 인물에 대한 감정을 치료자에게 투사하는 것이고, 역전이는 치료자가 환자에게 갖는 무의식적 반응입니다. 치료적으로 활용할 수 있습니다.' },
      { id: 30, question: 'Jung의 분석심리학의 주요 개념을 설명하시오', answer: '집단무의식, 원형(페르소나, 그림자, 아니마/아니무스, 자기), 개성화 과정 등의 개념을 제시했습니다. 의식과 무의식의 통합을 강조합니다.' },
    ]
  },
  {
    id: 4,
    title: '스트레스와 적응',
    questions: [
      { id: 31, question: 'Selye의 일반적응증후군(GAS)을 설명하시오', answer: '스트레스에 대한 신체반응으로 경고반응기(교감신경 활성화), 저항기(적응 시도), 소진기(적응 실패 시)의 3단계로 진행됩니다.' },
      { id: 32, question: 'Lazarus의 스트레스 인지평가 모델을 설명하시오', answer: '1차 평가(위협인지), 2차 평가(대처자원 평가)를 통해 스트레스 반응이 결정됩니다. 인지적 평가가 스트레스 반응에 중요한 역할을 합니다.' },
      { id: 33, question: '스트레스의 신체적 반응을 설명하시오', answer: '교감신경 활성화로 심박수 증가, 혈압 상승, 호흡 빨라짐, 근육 긴장, 땀 분비 증가가 나타납니다. 만성화되면 심혈관질환, 면역저하 등이 발생합니다.' },
      { id: 34, question: '스트레스의 심리적 반응을 설명하시오', answer: '불안, 우울, 분노, 좌절감, 무력감, 집중력 저하, 기억력 감소 등이 나타납니다. 만성화되면 정신질환으로 발전할 수 있습니다.' },
      { id: 35, question: '문제중심 대처와 정서중심 대처를 비교 설명하시오', answer: '문제중심 대처는 스트레스 원인을 직접 해결하려는 것(문제해결, 계획수립)이고, 정서중심 대처는 부정적 감정을 조절하려는 것(회피, 재해석)입니다.' },
      { id: 36, question: '적응적 대처와 부적응적 대처의 예를 설명하시오', answer: '적응적 대처: 문제해결, 사회적 지지 추구, 이완기법, 운동. 부적응적 대처: 회피, 음주, 약물사용, 자해, 공격행동.' },
      { id: 37, question: '스트레스 관리를 위한 이완기법을 설명하시오', answer: '점진적 근육이완, 복식호흡, 명상, 바이오피드백, 심상요법, 자율훈련법 등이 있습니다. 교감신경 활성화를 감소시켜 이완반응을 유도합니다.' },
      { id: 38, question: '위기(crisis)의 개념과 특성을 설명하시오', answer: '평소의 대처방법으로 해결되지 않는 급성 스트레스 상황입니다. 일시적이고 자기 제한적이며, 위험과 기회를 동시에 포함합니다. 4-6주 내에 해결됩니다.' },
      { id: 39, question: '상황적 위기와 발달적 위기를 비교 설명하시오', answer: '상황적 위기는 예측 불가능한 외부 사건(사고, 재해, 질병)에 의한 것이고, 발달적 위기는 발달과업 수행 과정에서 예측 가능하게 발생합니다.' },
      { id: 40, question: '위기개입의 원칙과 단계를 설명하시오', answer: '즉각성, 단기성, 현재 문제 초점, 지시적 접근이 원칙입니다. 평가, 계획, 개입, 추후관리의 단계로 진행됩니다.' },
    ]
  },
  {
    id: 5,
    title: '정신건강 서비스 체계',
    questions: [
      { id: 41, question: '지역사회 정신건강 서비스의 원칙을 설명하시오', answer: '접근성, 포괄성, 연속성, 지역사회 참여, 최소 제한, 당사자 중심, 회복 지향, 다학제적 접근 등이 원칙입니다.' },
      { id: 42, question: '정신건강복지센터의 기능과 역할을 설명하시오', answer: '정신건강 증진, 정신질환 예방, 조기발견 및 상담, 정신질환자 사례관리, 재활서비스, 가족지원, 지역사회 자원 연계 등을 수행합니다.' },
      { id: 43, question: '정신재활시설의 유형과 기능을 설명하시오', answer: '생활시설(공동생활가정, 지역사회전환시설), 재활훈련시설(주간재활시설, 직업재활시설), 그밖의시설(생산품판매시설, 종합시설)로 구분됩니다.' },
      { id: 44, question: '사례관리의 개념과 기능을 설명하시오', answer: '복합적 욕구를 가진 대상자에게 서비스를 조정하고 연계하는 것입니다. 사정, 계획, 연결, 점검, 옹호의 기능을 수행합니다.' },
      { id: 45, question: '자살예방 정신건강서비스 체계를 설명하시오', answer: '자살예방상담전화(1393), 정신건강위기상담전화(1577-0199), 자살예방센터, 생명의전화 등이 있습니다. 선별, 개입, 사후관리 체계로 운영됩니다.' },
      { id: 46, question: '중독관리통합지원센터의 역할을 설명하시오', answer: '알코올, 도박, 마약 등 중독문제 예방, 상담, 재활서비스를 제공합니다. 조기선별, 단기개입, 사례관리, 가족지원, 지역사회 연계를 수행합니다.' },
      { id: 47, question: '정신건강 서비스에서 다학제팀의 구성과 역할을 설명하시오', answer: '정신건강의학과 전문의, 정신건강간호사, 정신건강사회복지사, 정신건강임상심리사 등으로 구성됩니다. 각 전문 영역의 관점에서 통합적 서비스를 제공합니다.' },
      { id: 48, question: '정신질환자 인권보호를 위한 제도를 설명하시오', answer: '입퇴원 심사위원회, 정신건강심의위원회, 국가인권위원회, 권익옹호기관 등이 있습니다. 자의입원 원칙, 격리제한 최소화, 인권교육이 시행됩니다.' },
      { id: 49, question: '정신건강 서비스의 질 관리 방안을 설명하시오', answer: '서비스 표준 개발, 성과 측정, 이용자 만족도 조사, 전문가 보수교육, 인증제도, 근거기반실무 적용 등을 통해 질 관리를 합니다.' },
      { id: 50, question: '지역사회 정신건강 서비스의 발전 방향을 설명하시오', answer: '탈원화 지속, 지역사회 기반 서비스 확대, 회복 모델 적용, 당사자 참여 강화, 낙인 감소, 디지털 정신건강서비스 개발 등이 방향입니다.' },
    ]
  }
];

export default function MentalHealthTheoryPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([1]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mental-health-nurse-mental-health-theory-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('mental-health-nurse-mental-health-theory-completed', JSON.stringify(completedQuestions));
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
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-blue-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/mental-health-nurse" className="text-gray-600 hover:text-blue-600">정신건강간호사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">정신건강이론</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🧠</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">정신건강이론</h1>
              <p className="text-gray-600">정신건강간호사 필기시험 대비</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">학습 진행률</span>
              <span className="text-sm font-medium text-blue-600">{completedCount}/{totalQuestions} 완료 ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
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
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.includes(q.id) ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${completedQuestions.includes(q.id) ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'}`}
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
