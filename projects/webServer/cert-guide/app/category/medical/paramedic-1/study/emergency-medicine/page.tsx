'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 1,
    title: '응급의료체계',
    questions: [
      { id: 1, question: '응급의료체계의 구성요소를 설명하시오', answer: '인력(응급구조사, 의사, 간호사), 시설(응급실, 외상센터), 장비(구급차, 의료장비), 통신체계(119, 응급의료정보센터), 이송체계, 법적체계로 구성됩니다.' },
      { id: 2, question: '응급환자 분류체계(START Triage)를 설명하시오', answer: '즉시(빨강): 즉각적 치료 필요, 지연(노랑): 치료 지연 가능, 경증(녹색): 경미한 손상, 사망/기대난(검정): 소생 불가능. 보행가능, 호흡, 맥박, 의식으로 평가합니다.' },
      { id: 3, question: '응급의료에 관한 법률상 응급환자의 정의를 설명하시오', answer: '질병, 분만, 각종 사고 및 재해로 인한 부상이나 그 밖의 위급한 상태로 인하여 즉시 필요한 응급처치를 받지 아니하면 생명을 보존할 수 없거나 심신상의 중대한 위해가 발생할 가능성이 있는 환자입니다.' },
      { id: 4, question: '응급구조사 1급의 업무범위를 설명하시오', answer: '심폐소생술, 기도확보(기관내삽관 포함), 정맥로확보, 약물투여(의사 지시), 제세동, 심박조율, 흉관삽입 보조, 기본 외상처치 등을 수행합니다.' },
      { id: 5, question: '의료지도(Medical Direction)의 유형을 설명하시오', answer: '직접의료지도: 실시간 통신을 통한 의사 지시. 간접의료지도: 사전에 정해진 프로토콜에 따른 처치. 둘 다 의사의 지도 하에 응급처치가 이루어집니다.' },
      { id: 6, question: '응급의료정보센터의 역할을 설명하시오', answer: '응급환자 이송 조정, 응급의료기관 정보 제공, 의료지도, 대량재해 시 자원 배분, 응급의료 통계 관리 등의 역할을 수행합니다.' },
      { id: 7, question: '구급차의 종류와 장비기준을 설명하시오', answer: '일반구급차: 기본 이송장비. 특수구급차: 전문 응급장비(모니터, 제세동기, 흡인기, 산소, 약물 등). 법적으로 정해진 필수 장비를 갖추어야 합니다.' },
      { id: 8, question: '현장 안전 확보의 원칙을 설명하시오', answer: 'Scene Safety가 최우선입니다. 위험요소(교통, 화재, 전기, 유해물질) 확인, 개인보호장비 착용, 2차 사고 예방, 필요시 지원 요청을 합니다.' },
      { id: 9, question: '감염관리의 표준주의를 설명하시오', answer: '모든 환자를 잠재적 감염원으로 간주합니다. 손위생, 개인보호장비(장갑, 마스크, 가운), 날카로운 기구 관리, 환경 소독, 의료폐기물 관리를 시행합니다.' },
      { id: 10, question: '응급처치 거부권과 동의에 대해 설명하시오', answer: '성인 환자는 처치를 거부할 권리가 있습니다. 명시적 동의, 묵시적 동의(의식없는 환자), 법적 대리인 동의가 있습니다. 거부 시 기록을 남깁니다.' },
    ]
  },
  {
    id: 2,
    title: '환자평가',
    questions: [
      { id: 11, question: '1차 평가(Primary Survey)의 순서와 내용을 설명하시오', answer: 'ABCDE: A(기도)-기도개방 확인, B(호흡)-호흡 유무와 질, C(순환)-맥박과 출혈, D(신경)-의식수준, E(노출)-전신 확인. 생명 위협 요소를 먼저 처치합니다.' },
      { id: 12, question: '2차 평가(Secondary Survey)의 내용을 설명하시오', answer: '활력징후 측정, SAMPLE 병력청취, 두부에서 발끝까지 신체검진, 상세한 손상 평가를 시행합니다. 1차 평가에서 발견하지 못한 문제를 확인합니다.' },
      { id: 13, question: 'SAMPLE 병력청취의 의미를 설명하시오', answer: 'S(증상/Signs), A(알레르기/Allergies), M(약물/Medications), P(과거병력/Past medical history), L(마지막 음식/Last oral intake), E(사건/Events prior).' },
      { id: 14, question: 'Glasgow Coma Scale(GCS)의 평가항목과 점수를 설명하시오', answer: '눈뜨기(4점): 자발-4, 음성-3, 통증-2, 없음-1. 언어반응(5점): 지남력-5, 혼돈-4, 부적절-3, 이해불가-2, 없음-1. 운동반응(6점): 명령-6, 통증위치-5, 회피-4, 굴곡-3, 신전-2, 없음-1.' },
      { id: 15, question: '활력징후 측정의 정상범위와 의의를 설명하시오', answer: '성인: 맥박 60-100회/분, 호흡 12-20회/분, 혈압 90-140/60-90mmHg, 체온 36-37.5°C, 산소포화도 95% 이상. 비정상은 응급상황을 시사합니다.' },
      { id: 16, question: '의식수준 평가 방법(AVPU)을 설명하시오', answer: 'A(Alert): 명료, V(Verbal): 음성에 반응, P(Painful): 통증에 반응, U(Unresponsive): 무반응. 빠른 의식평가에 사용합니다.' },
      { id: 17, question: '동공 반응 평가의 의미를 설명하시오', answer: '정상: 양측 동일 크기, 빛에 수축. 비정상: 동공부동(뇌손상), 산동(약물, 저산소증), 축동(아편제), 빛반사 소실(심한 뇌손상).' },
      { id: 18, question: '피부 상태 평가의 의미를 설명하시오', answer: '색깔: 창백(쇼크), 청색증(저산소), 홍조(발열). 온도: 차갑고 축축(쇼크), 뜨겁고 건조(열사병). 모세혈관 재충전시간: 2초 이상은 순환장애.' },
      { id: 19, question: '외상환자 평가 시 주의사항을 설명하시오', answer: '경추 고정 유지, 손상기전 파악, 전신 노출 평가, 저체온 예방, 반복 평가가 중요합니다. 경추손상 의심 시 모든 처치에서 경추를 보호합니다.' },
      { id: 20, question: '내과환자와 외상환자 평가의 차이를 설명하시오', answer: '내과환자: 증상 중심 평가, 병력청취 중요, 점진적 악화. 외상환자: 손상기전 중심, 신체검진 중요, 급성 발생. 평가 우선순위가 다릅니다.' },
    ]
  },
  {
    id: 3,
    title: '기도관리',
    questions: [
      { id: 21, question: '기도폐쇄의 원인을 설명하시오', answer: '혀(의식저하), 이물질(음식, 치아), 분비물(혈액, 구토물), 부종(알레르기, 화상), 외상(후두골절), 종양. 의식저하 시 혀가 가장 흔한 원인입니다.' },
      { id: 22, question: '기본 기도유지 방법을 설명하시오', answer: '두부후굴-하악거상(Head tilt-Chin lift): 비외상. 하악밀기(Jaw thrust): 경추손상 의심. 기도유지기(OPA, NPA) 삽입, 흡인, 회복자세.' },
      { id: 23, question: '구인두기도기(OPA)의 적응증과 삽입방법을 설명하시오', answer: '적응증: 의식없는 환자의 기도유지. 금기: 구역반사 존재. 삽입: 볼록면이 위로 향하게 넣고 180도 회전 또는 직접 삽입. 크기는 입꼬리-귀볼.' },
      { id: 24, question: '비인두기도기(NPA)의 적응증과 삽입방법을 설명하시오', answer: '적응증: 구역반사가 있는 환자. 금기: 두개저골절 의심, 비출혈. 삽입: 윤활제 도포 후 비중격과 평행하게. 크기는 코끝-귀볼.' },
      { id: 25, question: '기관내삽관의 적응증을 설명하시오', answer: '기도보호 불가(의식저하), 환기부전, 저산소증, 기도폐쇄, 심정지, 중증 외상. 확실한 기도확보가 필요한 모든 상황에서 고려합니다.' },
      { id: 26, question: '기관내삽관 튜브 크기 선택을 설명하시오', answer: '성인 남성: 7.5-8.5mm, 성인 여성: 7.0-8.0mm. 소아: (나이/4)+4 또는 새끼손가락 굵기. 커프가 있는 튜브를 사용합니다.' },
      { id: 27, question: '기관내삽관 후 확인 방법을 설명하시오', answer: '직접 확인(성대 통과), 청진(양측 폐음, 위 청진 음성), 호기말 CO2(ETCO2), 산소포화도, 흉부 팽창, 튜브 김서림. 복합 확인이 필요합니다.' },
      { id: 28, question: '성문위기도기(LMA, i-gel)의 특성을 설명하시오', answer: '기관내삽관보다 삽입이 쉬움, 성대 손상 적음, 직접 후두경 불필요. 단점: 흡인 보호 불완전. 기관내삽관 실패 시 대안입니다.' },
      { id: 29, question: '기도흡인의 적응증과 방법을 설명하시오', answer: '적응증: 분비물, 혈액, 구토물. 방법: 음압 80-120mmHg, 1회 10-15초 이내, 100% 산소 투여 후 시행. 카테터 삽입 시 흡인하지 않습니다.' },
      { id: 30, question: '기도확보 곤란 시 대처방법을 설명하시오', answer: '기본 기도유지, 자세 조절, 보조기구(부지, 비디오 후두경), 성문위기도기, 외과적 기도(윤상갑상막절개). 단계적 접근이 필요합니다.' },
    ]
  },
  {
    id: 4,
    title: '쇼크',
    questions: [
      { id: 31, question: '쇼크의 정의와 병태생리를 설명하시오', answer: '조직으로의 산소 공급이 부족한 상태입니다. 심박출량 감소 또는 말초혈관 이상으로 발생합니다. 보상기, 진행기, 비가역기로 진행됩니다.' },
      { id: 32, question: '쇼크의 분류를 설명하시오', answer: '저혈량성(출혈, 탈수), 심인성(심근경색, 부정맥), 분포성(패혈성, 아나필락시스, 신경인성), 폐쇄성(긴장성 기흉, 심낭압전). 원인에 따라 치료가 다릅니다.' },
      { id: 33, question: '쇼크의 초기 징후를 설명하시오', answer: '빈맥, 빈호흡, 창백, 발한, 불안, 모세혈관 재충전 지연, 맥압 감소. 혈압은 초기에 정상일 수 있으므로 다른 징후를 주의깊게 관찰합니다.' },
      { id: 34, question: '저혈량성 쇼크의 분류와 특성을 설명하시오', answer: 'Class I(15%미만): 경미한 빈맥. Class II(15-30%): 빈맥, 빈호흡. Class III(30-40%): 저혈압, 빈맥, 의식변화. Class IV(40%이상): 심한 저혈압, 무맥.' },
      { id: 35, question: '저혈량성 쇼크의 처치를 설명하시오', answer: '출혈 조절, 산소 투여, 정맥로 확보(대구경 2개), 수액 투여(등장성 결정질액), 보온, 신속한 이송. 출혈 원인을 찾아 조절합니다.' },
      { id: 36, question: '심인성 쇼크의 원인과 처치를 설명하시오', answer: '원인: 급성심근경색, 부정맥, 심근병증, 판막질환. 처치: 산소투여, 원인치료(PCI, 항부정맥제), 수액(주의), 승압제, IABP. 과도한 수액은 금기입니다.' },
      { id: 37, question: '아나필락시스 쇼크의 처치를 설명하시오', answer: '원인물질 제거, 에피네프린 0.3-0.5mg 근주(가장 중요), 기도확보, 산소, 수액, 항히스타민제, 스테로이드. 반복 투여가 필요할 수 있습니다.' },
      { id: 38, question: '패혈성 쇼크의 특성과 처치를 설명하시오', answer: '특성: 감염에 의한 전신 염증반응, 따뜻한 피부(초기), 혈관확장. 처치: 항생제, 수액(30ml/kg), 승압제(노르에피네프린), 감염원 제거.' },
      { id: 39, question: '신경인성 쇼크의 특성을 설명하시오', answer: '경추/흉추 손상에 의한 교감신경 차단. 특성: 서맥+저혈압(저혈량성과 구별), 따뜻하고 건조한 피부, 체온조절 장애. 승압제와 아트로핀이 필요합니다.' },
      { id: 40, question: '긴장성 기흉에 의한 쇼크의 처치를 설명하시오', answer: '즉각적 감압이 필요합니다. 바늘 흉강감압술: 쇄골중앙선 2-3번째 늑간 또는 중앙액와선 4-5번째 늑간. 이후 흉관 삽입. 생명을 위협하는 응급상황입니다.' },
    ]
  },
  {
    id: 5,
    title: '내과응급',
    questions: [
      { id: 41, question: '호흡곤란 환자의 감별진단을 설명하시오', answer: '폐: 천식, COPD, 폐렴, 폐색전. 심장: 심부전, 폐부종. 상기도: 크룹, 에피글로티스. 기타: 과호흡, 대사성 산증. 병력과 신체검진으로 감별합니다.' },
      { id: 42, question: '급성 천식 발작의 처치를 설명하시오', answer: '산소투여, 흡입 속효성 베타작용제(살부타몰), 이프라트로피움, 전신 스테로이드, 중증 시 마그네슘, 에피네프린. 반복 평가가 중요합니다.' },
      { id: 43, question: 'COPD 급성 악화의 처치를 설명하시오', answer: '조절된 산소(목표 88-92%), 기관지확장제 흡입, 스테로이드, 항생제(감염 시), 비침습적 환기(NPPV). 과도한 산소는 CO2 저류를 악화시킵니다.' },
      { id: 44, question: '저혈당의 정의와 처치를 설명하시오', answer: '혈당 70mg/dL 미만. 증상: 발한, 빈맥, 의식변화, 경련. 처치: 의식있으면 경구 포도당, 의식없으면 50% 포도당 정주 또는 글루카곤 근주.' },
      { id: 45, question: '당뇨병성 케톤산증(DKA)의 특성과 처치를 설명하시오', answer: '특성: 고혈당, 케톤증, 대사성 산증, 쿠스마울 호흡, 과일냄새. 처치: 수액(생리식염수), 인슐린, 전해질 보충(칼륨), 원인 치료.' },
      { id: 46, question: '뇌졸중 의심 환자의 평가(FAST)를 설명하시오', answer: 'F(Face): 안면마비, A(Arm): 팔 처짐, S(Speech): 언어장애, T(Time): 증상 발생 시간. 시간이 중요하므로 신속한 이송이 필수입니다.' },
      { id: 47, question: '발작(경련) 환자의 처치를 설명하시오', answer: '안전 확보, 기도유지(측위), 산소, 지속 시 벤조디아제핀(미다졸람, 디아제팜), 혈당 확인, 원인 파악. 입에 물건을 넣지 않습니다.' },
      { id: 48, question: '과호흡 증후군의 평가와 처치를 설명하시오', answer: '증상: 빈호흡, 손발 저림, 현기증, 불안. 진단: 다른 원인 배제 후. 처치: 안심, 호흡 조절 유도, 종이봉투는 권장하지 않음(저산소 위험).' },
      { id: 49, question: '급성 복통의 감별진단을 설명하시오', answer: '외과적: 충수염, 장폐색, 천공. 내과적: 췌장염, 담낭염, 신산통. 혈관성: 대동맥류, 장허혈. 부인과: 자궁외임신. 위치와 양상으로 감별합니다.' },
      { id: 50, question: '환경응급(열사병, 저체온증)의 처치를 설명하시오', answer: '열사병: 즉각적 냉각(증발냉각, 얼음), 수액, 기도관리. 저체온증: 보온, 따뜻한 수액, 능동적 가온, 심정지 시 체외순환. 빠른 조치가 중요합니다.' },
    ]
  }
];

export default function EmergencyMedicinePage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([1]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('paramedic-1-emergency-medicine-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('paramedic-1-emergency-medicine-completed', JSON.stringify(completedQuestions));
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
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-red-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/paramedic-1" className="text-gray-600 hover:text-red-600">응급구조사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">응급의학총론</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🚑</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">응급의학총론</h1>
              <p className="text-gray-600">응급구조사 1급 필기시험 대비</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">학습 진행률</span>
              <span className="text-sm font-medium text-red-600">{completedCount}/{totalQuestions} 완료 ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
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
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.includes(q.id) ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${completedQuestions.includes(q.id) ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300'}`}
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
