'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 1,
    title: '조현병 스펙트럼 장애',
    questions: [
      { id: 1, question: '조현병의 양성 증상과 음성 증상을 비교 설명하시오', answer: '양성 증상: 환각(환청, 환시), 망상(피해, 관계, 과대), 와해된 언어, 와해된 행동. 음성 증상: 무감동, 무욕증, 무언어증, 사회적 위축, 정서둔마.' },
      { id: 2, question: '조현병의 인지 증상을 설명하시오', answer: '주의력 장애, 작업기억 결함, 실행기능 저하, 처리속도 감소가 나타납니다. 사회적 인지와 학습 능력도 저하되어 일상생활에 영향을 줍니다.' },
      { id: 3, question: '조현병 환자의 망상에 대한 간호중재를 설명하시오', answer: '망상에 동의하거나 반박하지 않습니다. 환자의 감정에 공감하고 현실적 대안을 제시합니다. 안전한 환경을 유지하고 약물순응도를 높입니다.' },
      { id: 4, question: '조현병 환자의 환청에 대한 간호중재를 설명하시오', answer: '환청의 존재를 인정하되 간호사에게는 들리지 않음을 설명합니다. 환청과의 대화보다 현실적 활동에 참여하도록 격려합니다. 환청 대처기술을 교육합니다.' },
      { id: 5, question: '조현병 환자의 약물치료와 부작용 관리를 설명하시오', answer: '항정신병약물이 주요 치료입니다. 정형 항정신병약물은 추체외로 증상(파킨슨증상, 급성근긴장이상, 좌불안석증, 지연성운동장애)이, 비정형은 대사증후군이 주요 부작용입니다.' },
      { id: 6, question: '조현병 환자의 재활 간호를 설명하시오', answer: '사회기술훈련, 직업재활, 인지재활, 가족교육, 지역사회 적응훈련을 실시합니다. 회복 모델에 기반하여 강점을 강화하고 자기결정권을 존중합니다.' },
      { id: 7, question: '조현정동장애의 특성과 간호를 설명하시오', answer: '조현병 증상과 기분장애 증상이 함께 나타납니다. 양극성형과 우울형이 있습니다. 항정신병약물과 기분안정제 또는 항우울제를 병용합니다.' },
      { id: 8, question: '망상장애의 특성과 간호를 설명하시오', answer: '비기이한 망상이 최소 1개월 지속되며 사회적 기능은 비교적 유지됩니다. 피해형, 색정형, 과대형, 질투형, 신체형이 있습니다. 신뢰관계 형성이 중요합니다.' },
      { id: 9, question: '단기 정신병적 장애의 특성을 설명하시오', answer: '1일 이상 1개월 미만의 정신병적 증상(망상, 환각, 와해된 언어, 와해된 행동)이 나타납니다. 스트레스 요인과 관련될 수 있으며 완전 회복됩니다.' },
      { id: 10, question: '조현병 환자의 급성기 간호를 설명하시오', answer: '안전 확보가 최우선입니다. 자타해 위험을 평가하고 자극을 최소화합니다. 약물치료 순응을 돕고 기본 욕구를 충족시킵니다. 짧고 명확한 의사소통을 합니다.' },
    ]
  },
  {
    id: 2,
    title: '기분장애',
    questions: [
      { id: 11, question: '주요우울장애의 진단기준을 설명하시오', answer: '우울한 기분 또는 흥미상실을 포함하여 5개 이상의 증상이 2주 이상 지속됩니다. 체중변화, 수면장애, 정신운동초조/지체, 피로, 무가치감, 집중력저하, 자살사고 등.' },
      { id: 12, question: '우울증 환자의 자살위험 평가를 설명하시오', answer: '자살사고, 계획, 의도, 수단, 시도력, 가족력을 평가합니다. 위험요인(절망감, 사회적 고립, 물질사용)과 보호요인(사회적 지지, 치료참여)을 확인합니다.' },
      { id: 13, question: '우울증 환자의 간호중재를 설명하시오', answer: '안전 확보, 지지적 관계 형성, 감정 표현 격려, 활동 참여 촉진, 인지왜곡 수정, 약물순응도 증진, 자기관리 교육을 실시합니다.' },
      { id: 14, question: '양극성장애 I형과 II형을 비교 설명하시오', answer: 'I형은 조증 삽화가 있고, II형은 경조증과 우울 삽화가 있습니다. I형이 더 심한 기능장애를 보이며 입원치료가 필요할 수 있습니다.' },
      { id: 15, question: '조증 삽화의 특성과 간호를 설명하시오', answer: '과대성, 수면욕구 감소, 말이 많음, 사고비약, 주의산만, 활동증가, 쾌락추구가 나타납니다. 자극을 줄이고 안전을 확보하며 기본욕구를 충족시킵니다.' },
      { id: 16, question: '경조증의 특성을 설명하시오', answer: '조증보다 경한 증상으로 4일 이상 지속됩니다. 기능 저하가 현저하지 않고 입원이 필요하지 않습니다. 정신병적 양상이 없습니다.' },
      { id: 17, question: '양극성장애의 약물치료를 설명하시오', answer: '기분안정제(리튬, 발프로에이트, 카바마제핀)가 기본입니다. 비정형 항정신병약물, 항우울제를 병용할 수 있습니다. 리튬은 혈중농도 모니터링이 필수입니다.' },
      { id: 18, question: '리튬 독성의 증상과 간호를 설명하시오', answer: '초기: 오심, 구토, 설사, 미세진전. 진행: 운동실조, 어눌한 말, 의식저하, 발작. 탈수, 저나트륨, NSAID 사용 시 위험이 증가합니다. 수분섭취와 나트륨 균형이 중요합니다.' },
      { id: 19, question: '지속성우울장애(기분저하장애)의 특성을 설명하시오', answer: '만성적 우울한 기분이 2년 이상 지속됩니다. 주요우울장애보다 경하지만 기능에 영향을 줍니다. 식욕변화, 수면장애, 피로, 자존감 저하, 절망감이 나타납니다.' },
      { id: 20, question: '기분장애 환자의 가족교육 내용을 설명하시오', answer: '질병의 특성, 재발 경고징후, 약물치료의 중요성, 자살위험 징후, 스트레스 관리, 지지방법, 자원 정보를 교육합니다. 가족의 정서적 부담도 다룹니다.' },
    ]
  },
  {
    id: 3,
    title: '불안장애 및 강박장애',
    questions: [
      { id: 21, question: '공황장애의 특성과 간호를 설명하시오', answer: '갑자기 강렬한 두려움과 신체증상(심계항진, 호흡곤란, 발한)이 나타납니다. 발작 시 안심시키고 호흡조절을 돕습니다. 인지행동치료와 약물치료를 병행합니다.' },
      { id: 22, question: '광장공포증의 특성을 설명하시오', answer: '탈출이 어렵거나 도움받기 힘든 상황에 대한 공포입니다. 대중교통, 개방된 공간, 밀폐된 공간, 줄서기, 혼자 외출을 회피합니다. 점진적 노출치료가 효과적입니다.' },
      { id: 23, question: '범불안장애의 특성과 간호를 설명하시오', answer: '과도한 불안과 걱정이 6개월 이상 지속됩니다. 안절부절, 피로, 집중곤란, 과민, 근육긴장, 수면장애가 나타납니다. 이완기법과 인지행동치료가 효과적입니다.' },
      { id: 24, question: '특정공포증의 유형과 치료를 설명하시오', answer: '동물형, 자연환경형, 혈액주사손상형, 상황형, 기타형이 있습니다. 체계적 둔감법, 노출치료가 효과적입니다. 회피행동을 강화하지 않습니다.' },
      { id: 25, question: '사회불안장애의 특성과 간호를 설명하시오', answer: '사회적 상황에서 부정적 평가에 대한 두려움이 있습니다. 발표, 대화, 낯선 사람과의 만남을 회피합니다. 사회기술훈련과 인지행동치료가 효과적입니다.' },
      { id: 26, question: '강박장애의 특성을 설명하시오', answer: '강박사고(침습적 사고)와 강박행동(반복적 행위)이 특징입니다. 오염, 대칭, 금기적 사고, 해해가 흔합니다. 확인, 씻기, 정리, 반복이 흔한 강박행동입니다.' },
      { id: 27, question: '강박장애 환자의 간호중재를 설명하시오', answer: '강박행동을 직접 제지하지 않습니다. 노출 및 반응방지(ERP)를 지지합니다. 불안을 인정하고 점진적으로 강박행동 시간을 줄입니다. SSRI가 효과적입니다.' },
      { id: 28, question: '신체이형장애의 특성과 간호를 설명하시오', answer: '외모의 사소한 결함에 집착합니다. 거울 확인, 피부뜯기, 성형수술 추구가 나타납니다. 현실을 직면시키기보다 고통에 공감합니다. 인지행동치료가 효과적입니다.' },
      { id: 29, question: '저장장애의 특성을 설명하시오', answer: '물건을 버리지 못하고 과도하게 수집합니다. 생활공간이 물건으로 가득 차 기능을 방해합니다. 인지행동치료와 동기면담이 효과적입니다.' },
      { id: 30, question: '불안장애의 비약물적 치료를 설명하시오', answer: '인지행동치료, 노출치료, 이완훈련, 마음챙김, 바이오피드백이 효과적입니다. 규칙적 운동과 수면위생, 카페인 제한도 도움이 됩니다.' },
    ]
  },
  {
    id: 4,
    title: '외상 및 해리장애',
    questions: [
      { id: 31, question: '외상후스트레스장애(PTSD)의 진단기준을 설명하시오', answer: '외상 노출 후 1개월 이상 침습증상(재경험), 회피, 인지와 감정의 부정적 변화, 각성과 반응성 변화가 나타납니다. 기능 저하를 동반합니다.' },
      { id: 32, question: 'PTSD 환자의 간호중재를 설명하시오', answer: '안전한 환경 제공, 신뢰관계 형성, 감정 표현 격려, 트리거 확인, 대처기술 교육을 합니다. 외상 중심 인지행동치료, EMDR이 효과적입니다.' },
      { id: 33, question: '급성스트레스장애의 특성을 설명하시오', answer: 'PTSD와 유사하나 외상 후 3일-1개월 사이에 나타납니다. 해리증상이 두드러집니다. 1개월 이상 지속되면 PTSD로 진단됩니다.' },
      { id: 34, question: '해리성 정체감장애의 특성과 간호를 설명하시오', answer: '두 가지 이상의 분리된 정체성이 나타납니다. 심한 아동기 외상과 관련됩니다. 안전 확보, 일관된 접근, 각 정체성 존중, 통합 지지가 중요합니다.' },
      { id: 35, question: '해리성 기억상실의 특성을 설명하시오', answer: '중요한 자전적 정보를 회상하지 못합니다. 국소적(특정 사건), 선택적, 전반적, 연속적, 체계화된 유형이 있습니다. 외상이나 스트레스와 관련됩니다.' },
      { id: 36, question: '이인증/비현실감 장애의 특성을 설명하시오', answer: '자신(이인증)이나 환경(비현실감)이 비현실적으로 느껴집니다. 현실검증력은 유지됩니다. 불안장애, 우울증, 외상과 동반될 수 있습니다.' },
      { id: 37, question: '복합외상의 개념과 영향을 설명하시오', answer: '반복적, 만성적, 대인관계적 외상입니다. 아동학대, 가정폭력 등이 해당됩니다. 정서조절 곤란, 부정적 자기개념, 대인관계 문제가 나타납니다.' },
      { id: 38, question: '외상 환자의 안정화 단계 개입을 설명하시오', answer: '안전 확보, 증상 관리, 정서조절 기술, 대처자원 강화가 목표입니다. 접지기법, 호흡법, 자기위안 기술을 교육합니다. 외상처리 전 안정화가 필수입니다.' },
      { id: 39, question: '외상정보치료(TIC)의 원칙을 설명하시오', answer: '안전, 신뢰, 선택, 협력, 역량강화, 문화적 민감성이 원칙입니다. 외상의 영향을 이해하고 재외상화를 예방합니다. 모든 서비스에 적용됩니다.' },
      { id: 40, question: '대리외상과 소진의 예방을 설명하시오', answer: '외상 환자를 돌보는 직원에게 나타납니다. 수퍼비전, 동료지지, 자기돌봄, 업무분배, 교육이 예방에 도움이 됩니다. 조직 차원의 지원이 필요합니다.' },
    ]
  },
  {
    id: 5,
    title: '성격장애',
    questions: [
      { id: 41, question: '성격장애의 일반적 특성을 설명하시오', answer: '내적 경험과 행동 양상이 문화적 기대에서 현저히 벗어납니다. 청소년기/초기 성인기에 시작되어 지속적이고 융통성이 없습니다. 기능장애와 고통을 유발합니다.' },
      { id: 42, question: '경계선 성격장애의 특성과 간호를 설명하시오', answer: '대인관계, 자아상, 정동의 불안정성과 충동성이 특징입니다. 버림받음에 대한 두려움, 자해행동, 분열(splitting)이 나타납니다. 일관된 한계설정이 중요합니다.' },
      { id: 43, question: '반사회성 성격장애의 특성을 설명하시오', answer: '타인의 권리 무시, 속임, 충동성, 공격성, 무책임, 죄책감 결여가 특징입니다. 15세 이전 품행장애 병력이 있습니다. 치료 동기가 낮습니다.' },
      { id: 44, question: '자기애성 성격장애의 특성을 설명하시오', answer: '과대성, 찬사에 대한 욕구, 공감 결여가 특징입니다. 특별대우 기대, 착취적 행동, 질투, 오만함이 나타납니다. 비판에 취약합니다.' },
      { id: 45, question: '회피성 성격장애의 특성을 설명하시오', answer: '사회적 억제, 부적절감, 부정적 평가에 대한 민감성이 특징입니다. 거절이나 비판이 두려워 관계를 회피합니다. 사회공포증과 구별이 필요합니다.' },
      { id: 46, question: '의존성 성격장애의 특성을 설명하시오', answer: '돌봄받고자 하는 과도한 욕구, 복종적 행동, 분리불안이 특징입니다. 의사결정이 어렵고 혼자 있기를 두려워합니다. 관계 종결 시 즉시 새 관계를 찾습니다.' },
      { id: 47, question: '강박성 성격장애의 특성을 설명하시오', answer: '질서, 완벽주의, 통제에 대한 집착이 특징입니다. 융통성이 없고 효율성이 떨어집니다. 강박장애와 달리 자아동조적입니다.' },
      { id: 48, question: '편집성 성격장애의 특성을 설명하시오', answer: '타인에 대한 전반적인 불신과 의심이 특징입니다. 악의적 의도를 추정하고 원한을 품습니다. 비밀 유지에 집착합니다. 망상장애로 발전할 수 있습니다.' },
      { id: 49, question: '조현성 성격장애의 특성을 설명하시오', answer: '사회적 관계에서의 분리, 제한된 감정표현이 특징입니다. 친밀한 관계를 원하지 않고 혼자 있는 활동을 선호합니다. 칭찬이나 비판에 무관심합니다.' },
      { id: 50, question: '성격장애 환자와의 치료적 관계 수립 전략을 설명하시오', answer: '일관성, 명확한 한계설정, 비심판적 태도, 인내가 필요합니다. 분열(splitting)에 대비하여 팀 접근을 합니다. 역전이 감정을 인식하고 관리합니다.' },
    ]
  }
];

export default function PsychiatricNursingPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([1]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mental-health-nurse-psychiatric-nursing-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('mental-health-nurse-psychiatric-nursing-completed', JSON.stringify(completedQuestions));
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
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-teal-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/mental-health-nurse" className="text-gray-600 hover:text-teal-600">정신건강간호사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">정신간호학</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🏥</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">정신간호학</h1>
              <p className="text-gray-600">정신건강간호사 필기시험 대비</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">학습 진행률</span>
              <span className="text-sm font-medium text-teal-600">{completedCount}/{totalQuestions} 완료 ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
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
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.includes(q.id) ? 'bg-teal-50 border-teal-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${completedQuestions.includes(q.id) ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-300'}`}
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
