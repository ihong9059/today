'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 1,
    title: '항정신병약물',
    questions: [
      { id: 1, question: '정형 항정신병약물과 비정형 항정신병약물의 차이를 설명하시오', answer: '정형은 도파민 D2 수용체 차단이 주 기전으로 양성증상에 효과적이나 추체외로 증상이 많습니다. 비정형은 세로토닌-도파민 길항작용으로 음성증상에도 효과가 있고 추체외로 증상이 적습니다.' },
      { id: 2, question: '추체외로 증상(EPS)의 유형과 간호를 설명하시오', answer: '급성근긴장이상(근육 경직), 파킨슨증상(진전, 경직), 좌불안석증(안절부절), 지연성운동장애(불수의운동). 조기발견, 용량조절, 항콜린제 투여가 필요합니다.' },
      { id: 3, question: '지연성운동장애의 특성과 예방을 설명하시오', answer: '입, 혀, 얼굴의 불수의적 반복운동입니다. 장기 투약 시 발생하며 비가역적일 수 있습니다. 최소 유효용량 사용, 정기적 평가(AIMS), 비정형 약물 선택이 예방법입니다.' },
      { id: 4, question: '악성증후군(NMS)의 증상과 대처를 설명하시오', answer: '고열, 근육경직, 자율신경 불안정, 의식변화가 특징입니다. 응급상황으로 즉시 약물 중단, 지지요법, 단트롤렌/브로모크립틴 투여, 집중치료가 필요합니다.' },
      { id: 5, question: '클로자핀(Clozapine)의 특성과 모니터링을 설명하시오', answer: '치료저항성 조현병에 사용됩니다. 무과립구증 위험으로 정기적 혈액검사가 필수입니다. 발작, 심근염, 대사증후군, 과다침분비도 부작용입니다.' },
      { id: 6, question: '리스페리돈(Risperidone)의 특성과 부작용을 설명하시오', answer: '세로토닌-도파민 길항제로 양성/음성 증상에 효과적입니다. 고프로락틴혈증(유루증, 무월경, 성기능장애), 체중증가, 기립성저혈압이 주요 부작용입니다.' },
      { id: 7, question: '올란자핀(Olanzapine)의 특성과 대사적 부작용을 설명하시오', answer: '다수용체 차단작용을 합니다. 체중증가, 고혈당, 고지혈증, 대사증후군이 심각한 부작용입니다. 정기적인 체중, 혈당, 지질 모니터링이 필요합니다.' },
      { id: 8, question: '아리피프라졸(Aripiprazole)의 작용기전과 특성을 설명하시오', answer: '도파민 부분 효현제로 도파민 활성을 안정화합니다. 대사적 부작용이 적고 추체외로 증상도 적습니다. 좌불안석증, 불면이 나타날 수 있습니다.' },
      { id: 9, question: '항정신병약물의 대사증후군 관리를 설명하시오', answer: '복부비만, 고혈당, 고중성지방, 저HDL, 고혈압이 기준입니다. 체중/허리둘레 측정, 혈당/지질 검사, 생활습관 교육, 약물 변경을 고려합니다.' },
      { id: 10, question: '항정신병약물 장기지속형 주사제의 장점을 설명하시오', answer: '복약순응도 향상, 안정적 혈중농도 유지, 재발률 감소가 장점입니다. 2주-3개월 간격으로 투여합니다. 복약 누락 확인이 용이합니다.' },
    ]
  },
  {
    id: 2,
    title: '항우울제',
    questions: [
      { id: 11, question: 'SSRI(선택적 세로토닌 재흡수 억제제)의 작용기전과 특성을 설명하시오', answer: '세로토닌 재흡수를 선택적으로 차단하여 시냅스 세로토닌을 증가시킵니다. 부작용이 적어 1차 선택약물입니다. 효과 발현까지 2-4주 소요됩니다.' },
      { id: 12, question: 'SSRI의 주요 부작용과 간호를 설명하시오', answer: '오심, 두통, 불면/졸림, 성기능장애, 체중변화가 흔합니다. 세로토닌증후군, 출혈위험 증가도 있습니다. 초기 부작용은 대부분 일시적입니다.' },
      { id: 13, question: '세로토닌증후군의 증상과 대처를 설명하시오', answer: '인지변화, 자율신경불안정, 신경근육이상(진전, 반사항진, 근육경직)이 나타납니다. 세로토닌성 약물 병용 시 위험합니다. 원인약물 중단, 지지요법이 필요합니다.' },
      { id: 14, question: 'SNRI(세로토닌-노르에피네프린 재흡수 억제제)의 특성을 설명하시오', answer: '세로토닌과 노르에피네프린 재흡수를 억제합니다. 우울증, 불안장애, 통증(신경병증, 섬유근통)에 효과적입니다. 혈압상승, 발한이 부작용입니다.' },
      { id: 15, question: '삼환계 항우울제(TCA)의 특성과 부작용을 설명하시오', answer: '세로토닌, 노르에피네프린 재흡수를 억제합니다. 항콜린작용(구갈, 변비, 요정체, 시력장애), 기립성저혈압, 심장독성, 진정작용이 부작용입니다.' },
      { id: 16, question: 'TCA 과량복용의 위험성과 대처를 설명하시오', answer: '심장부정맥, 발작, 저혈압, 의식저하가 나타납니다. 치명적일 수 있어 자살위험 환자에게 주의가 필요합니다. 응급처치, 활성탄, 지지요법이 필요합니다.' },
      { id: 17, question: 'MAO억제제(MAOI)의 특성과 식이제한을 설명하시오', answer: '모노아민 산화효소를 억제하여 신경전달물질을 증가시킵니다. 티라민 함유 식품(치즈, 와인, 발효식품) 섭취 시 고혈압 위기가 발생합니다.' },
      { id: 18, question: '미르타자핀(Mirtazapine)의 특성과 부작용을 설명하시오', answer: '노르에피네프린과 세로토닌 방출을 증가시킵니다. 진정작용과 식욕증가로 불면과 체중감소가 있는 우울증에 유용합니다. 체중증가, 졸림이 부작용입니다.' },
      { id: 19, question: '부프로피온(Bupropion)의 특성과 적응증을 설명하시오', answer: '노르에피네프린-도파민 재흡수 억제제입니다. 성기능장애와 체중증가가 적어 유용합니다. 금연보조제로도 사용됩니다. 발작 위험이 있어 식이장애에 금기입니다.' },
      { id: 20, question: '항우울제 치료의 유지요법과 중단 시 주의사항을 설명하시오', answer: '첫 삽화는 6-12개월, 재발 시 더 긴 유지요법이 필요합니다. 갑작스러운 중단 시 중단증상(어지러움, 불안, 감각이상)이 나타날 수 있어 서서히 감량합니다.' },
    ]
  },
  {
    id: 3,
    title: '기분안정제',
    questions: [
      { id: 21, question: '리튬(Lithium)의 작용기전과 적응증을 설명하시오', answer: '세포내 신호전달체계에 작용합니다. 양극성장애의 조증과 우울 삽화 예방, 급성 조증 치료에 사용됩니다. 자살예방 효과도 있습니다.' },
      { id: 22, question: '리튬의 치료적 혈중농도와 모니터링을 설명하시오', answer: '치료농도: 0.6-1.2mEq/L. 독성농도: 1.5mEq/L 이상. 정기적 혈중농도 검사, 신기능, 갑상선기능 모니터링이 필요합니다. 복용 12시간 후 채혈합니다.' },
      { id: 23, question: '리튬 독성의 단계별 증상을 설명하시오', answer: '경증(1.5-2.0): 오심, 설사, 미세진전, 졸림. 중등도(2.0-2.5): 운동실조, 어눌한 말, 혼돈. 중증(2.5이상): 발작, 혼수, 부정맥, 신부전.' },
      { id: 24, question: '리튬 사용 시 환자교육 내용을 설명하시오', answer: '일정한 나트륨/수분 섭취, 탈수 예방, NSAID/이뇨제 주의, 정기 검사, 독성 증상 인지, 임신 시 의사 상담이 필요합니다.' },
      { id: 25, question: '발프로에이트(Valproate)의 특성과 부작용을 설명하시오', answer: 'GABA 증가, 나트륨 채널 차단 기전입니다. 양극성장애, 간질에 사용됩니다. 간독성, 혈소판감소, 체중증가, 탈모, 기형유발이 부작용입니다.' },
      { id: 26, question: '카바마제핀(Carbamazepine)의 특성과 약물상호작용을 설명하시오', answer: '나트륨 채널 차단 기전입니다. 간효소 유도로 많은 약물과 상호작용합니다. 재생불량성빈혈, 스티븐스-존슨증후군이 심각한 부작용입니다.' },
      { id: 27, question: '라모트리진(Lamotrigine)의 특성과 주의사항을 설명하시오', answer: '양극성 우울증 예방에 특히 효과적입니다. 스티븐스-존슨증후군 위험으로 서서히 증량해야 합니다. 발진 발생 시 즉시 중단합니다.' },
      { id: 28, question: '기분안정제의 임신 중 사용에 대해 설명하시오', answer: '리튬은 엡스타인 기형, 발프로에이트는 신경관결손 위험이 있습니다. 라모트리진이 상대적으로 안전합니다. 위험-이득을 평가하여 결정합니다.' },
      { id: 29, question: '비정형 항정신병약물의 기분안정 작용을 설명하시오', answer: '퀘티아핀, 올란자핀, 아리피프라졸 등이 양극성장애에 승인되었습니다. 급성 조증, 유지치료, 양극성 우울증에 사용됩니다.' },
      { id: 30, question: '기분안정제 병용요법의 원칙을 설명하시오', answer: '단독요법으로 효과가 불충분할 때 병용합니다. 작용기전이 다른 약물을 선택합니다. 부작용 중첩을 고려합니다. 약물상호작용을 확인합니다.' },
    ]
  },
  {
    id: 4,
    title: '항불안제와 수면제',
    questions: [
      { id: 31, question: '벤조디아제핀의 작용기전과 종류를 설명하시오', answer: 'GABA-A 수용체에 결합하여 억제효과를 증강합니다. 단시간형(알프라졸람), 중간형(로라제팜), 장시간형(디아제팜, 클로나제팜)이 있습니다.' },
      { id: 32, question: '벤조디아제핀의 부작용과 주의사항을 설명하시오', answer: '졸림, 어지러움, 인지장애, 운동실조가 흔합니다. 호흡억제(특히 오피오이드 병용 시), 역설적 반응, 의존성/내성이 위험합니다. 노인에게 주의합니다.' },
      { id: 33, question: '벤조디아제핀 의존과 금단증상을 설명하시오', answer: '장기 사용 시 내성과 의존이 발생합니다. 금단증상: 불안, 불면, 진전, 발한, 발작. 서서히 감량하고 장시간형으로 교체 후 중단합니다.' },
      { id: 34, question: '부스피론(Buspirone)의 특성과 장점을 설명하시오', answer: '세로토닌 5-HT1A 부분 효현제입니다. 범불안장애에 사용됩니다. 진정작용, 의존성, 금단증상이 없습니다. 효과 발현까지 2-4주 소요됩니다.' },
      { id: 35, question: '비벤조디아제핀 수면제(Z-drugs)의 특성을 설명하시오', answer: '졸피뎀, 졸피클론, 에스조피클론 등입니다. GABA-A 수용체의 아단위에 선택적으로 작용합니다. 수면 유도에 효과적이나 복잡수면행동이 부작용입니다.' },
      { id: 36, question: '불면증의 비약물적 치료를 설명하시오', answer: '수면위생 교육, 자극조절법, 수면제한법, 이완훈련, 인지행동치료(CBT-I)가 효과적입니다. 약물보다 장기적 효과가 우수합니다.' },
      { id: 37, question: '항히스타민제의 수면 효과와 한계를 설명하시오', answer: '디펜히드라민, 독실아민 등이 진정작용이 있습니다. 내성이 빨리 발생하고 항콜린작용이 있어 노인에게 부적절합니다.' },
      { id: 38, question: '멜라토닌 수용체 효현제의 특성을 설명하시오', answer: '라멜테온이 대표적입니다. 의존성이 없고 규제물질이 아닙니다. 일주기리듬 조절에 효과적이며 수면 개시를 돕습니다.' },
      { id: 39, question: '오렉신 수용체 길항제의 특성을 설명하시오', answer: '수보렉산트, 렘보렉산트 등입니다. 각성을 촉진하는 오렉신을 차단합니다. 수면 개시와 유지에 효과적입니다. 기면증 환자에게 금기입니다.' },
      { id: 40, question: '노인의 수면제 사용 시 주의사항을 설명하시오', answer: '낙상위험, 인지장애, 섬망 위험이 증가합니다. 저용량부터 시작하고 단기간 사용합니다. 비벤조디아제핀보다 벤조디아제핀이 위험합니다.' },
    ]
  },
  {
    id: 5,
    title: '기타 정신과 약물',
    questions: [
      { id: 41, question: 'ADHD 치료제의 종류와 특성을 설명하시오', answer: '자극제(메틸페니데이트, 암페타민)가 1차 선택입니다. 비자극제로 아토목세틴이 있습니다. 식욕감소, 불면, 심혈관 영향이 부작용입니다.' },
      { id: 42, question: '치매 치료제의 종류와 기전을 설명하시오', answer: '콜린에스테라제 억제제(도네페질, 리바스티그민, 갈란타민)와 NMDA 수용체 길항제(메만틴)가 있습니다. 인지기능 저하 속도를 늦춥니다.' },
      { id: 43, question: '알코올 사용장애의 약물치료를 설명하시오', answer: '날트렉손(갈망 감소), 아캄프로세이트(금단증상 완화), 디설피람(혐오요법). 급성 금단에는 벤조디아제핀을 사용합니다.' },
      { id: 44, question: '오피오이드 사용장애의 약물치료를 설명하시오', answer: '메타돈, 부프레노르핀이 유지치료에 사용됩니다. 날트렉손이 재발예방에 효과적입니다. 급성 금단에는 클로니딘이 도움됩니다.' },
      { id: 45, question: '담배 사용장애의 약물치료를 설명하시오', answer: '니코틴대체요법(패치, 껌), 바레니클린(니코틴 수용체 부분 효현제), 부프로피온이 사용됩니다. 행동치료와 병용하면 효과가 높습니다.' },
      { id: 46, question: '약물상호작용의 유형과 관리를 설명하시오', answer: '약동학적(흡수, 대사, 배설 변화), 약력학적(효과 증강/감소) 상호작용이 있습니다. CYP450 효소 유도/억제를 확인합니다. 다약제 사용 시 주의합니다.' },
      { id: 47, question: '정신과 약물의 복약순응도 증진 전략을 설명하시오', answer: '질병과 약물에 대한 교육, 부작용 관리, 간단한 투약 일정, 환자 참여, 가족 지지, 장기지속형 주사제 고려가 전략입니다.' },
      { id: 48, question: '정신과 약물 투여 시 간호사의 역할을 설명하시오', answer: '투약 전 평가(활력징후, 정신상태), 정확한 투여, 부작용 모니터링, 환자교육, 복약순응도 평가, 의사와의 협력이 역할입니다.' },
      { id: 49, question: '정신과 응급상황에서의 약물 사용을 설명하시오', answer: '급성 초조: 벤조디아제핀 또는 항정신병약물. 자살위험: 안전 확보 후 약물 평가. 세로토닌증후군/악성증후군: 원인약물 중단, 지지요법.' },
      { id: 50, question: '약물유전학의 정신과 약물치료 적용을 설명하시오', answer: 'CYP2D6, CYP2C19 다형성이 약물 대사에 영향을 줍니다. 빠른대사자, 느린대사자에 따라 용량 조절이 필요합니다. 개인화 의료의 기반이 됩니다.' },
    ]
  }
];

export default function PsychopharmacologyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([1]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mental-health-nurse-psychopharmacology-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('mental-health-nurse-psychopharmacology-completed', JSON.stringify(completedQuestions));
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
            <Link href="/" className="text-gray-600 hover:text-green-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-green-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/mental-health-nurse" className="text-gray-600 hover:text-green-600">정신건강간호사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">정신약리학</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">💊</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">정신약리학</h1>
              <p className="text-gray-600">정신건강간호사 필기시험 대비</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">학습 진행률</span>
              <span className="text-sm font-medium text-green-600">{completedCount}/{totalQuestions} 완료 ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
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
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.includes(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${completedQuestions.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
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
