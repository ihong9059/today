'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 1,
    title: '순환계통',
    questions: [
      { id: 1, question: '심장의 구조와 혈액순환 경로를 설명하시오', answer: '4개의 방(좌우심방, 좌우심실)과 4개의 판막으로 구성. 체순환: 좌심실→대동맥→전신→대정맥→우심방. 폐순환: 우심실→폐동맥→폐→폐정맥→좌심방.' },
      { id: 2, question: '심장의 전도계를 설명하시오', answer: 'SA node(동방결절, 60-100회/분)→AV node(방실결절)→His bundle(히스속)→Bundle branches(좌우각)→Purkinje fibers(푸르키니에 섬유). 자동성과 전도성을 가집니다.' },
      { id: 3, question: '관상동맥의 분포를 설명하시오', answer: '좌관상동맥: 좌전하행지(LAD, 전벽), 회선지(LCX, 측벽). 우관상동맥(RCA): 하벽, 우심실. 전도계 혈류는 주로 RCA에서 공급됩니다.' },
      { id: 4, question: '심박출량과 관련 요인을 설명하시오', answer: 'CO = HR × SV (심박출량 = 심박수 × 일회박출량). SV에 영향: 전부하(정맥환류), 후부하(말초저항), 수축력. 정상 CO: 5L/분.' },
      { id: 5, question: '혈압 조절 기전을 설명하시오', answer: 'BP = CO × PVR. 신경성 조절(압력수용체, 교감신경), 호르몬 조절(RAAS, ADH, ANP), 국소 조절(자동조절). 빠른 조절과 느린 조절이 있습니다.' },
      { id: 6, question: '혈관의 종류와 기능을 설명하시오', answer: '동맥: 탄력혈관(대동맥), 근육혈관(중동맥), 세동맥(저항혈관). 모세혈관: 교환. 정맥: 용량혈관(혈액의 70% 저장). 정맥환류에 판막이 중요합니다.' },
      { id: 7, question: '혈액의 구성과 기능을 설명하시오', answer: '혈장(55%): 물, 단백질, 전해질. 혈구(45%): 적혈구(산소운반), 백혈구(면역), 혈소판(지혈). Hct 남 40-54%, 여 36-48%.' },
      { id: 8, question: '적혈구의 산소운반 기능을 설명하시오', answer: '헤모글로빈이 산소와 결합(옥시헤모글로빈). 산소해리곡선: pH↓, CO2↑, 온도↑, 2,3-DPG↑ 시 우측이동(산소 방출 증가). Bohr effect.' },
      { id: 9, question: '지혈과정을 설명하시오', answer: '1차 지혈: 혈관수축, 혈소판 부착·응집(혈소판마개). 2차 지혈: 응고인자 활성화→트롬빈→피브린. 섬유소 용해로 완료됩니다.' },
      { id: 10, question: '림프계의 구조와 기능을 설명하시오', answer: '림프관, 림프절, 비장, 흉선으로 구성. 조직액 회수, 지방 흡수, 면역 기능. 림프절에서 림프구가 이물질을 제거합니다.' },
    ]
  },
  {
    id: 2,
    title: '호흡계통',
    questions: [
      { id: 11, question: '호흡기의 구조를 설명하시오', answer: '상기도: 비강, 인두, 후두. 하기도: 기관, 기관지, 세기관지, 폐포. 기관은 C자형 연골로 지지되고 약 10-12cm입니다.' },
      { id: 12, question: '후두의 구조와 기능을 설명하시오', answer: '갑상연골, 윤상연골, 피열연골, 후두개로 구성. 기도 보호(연하 시 후두개 폐쇄), 발성(성대), 기도 유지. 윤상연골이 기관내삽관의 랜드마크입니다.' },
      { id: 13, question: '폐의 구조와 엽 구분을 설명하시오', answer: '우폐 3엽(상, 중, 하), 좌폐 2엽(상, 하). 폐문에서 기관지, 혈관 출입. 흉막(장측, 벽측)이 폐를 감싸고 흉막강에 음압(-5cmH2O)이 있습니다.' },
      { id: 14, question: '호흡의 기전(흡기와 호기)을 설명하시오', answer: '흡기: 횡격막·외늑간근 수축→흉강 확장→폐 확장→음압→공기 유입. 호기: 근육 이완→탄성반동→양압→공기 배출. 정상 호기는 수동적입니다.' },
      { id: 15, question: '폐용적과 폐용량을 설명하시오', answer: '일회호흡량(TV): 500mL, 흡기예비량(IRV): 3000mL, 호기예비량(ERV): 1100mL, 잔기량(RV): 1200mL. 폐활량(VC)=TV+IRV+ERV, 총폐용량(TLC)=VC+RV.' },
      { id: 16, question: '가스교환(외호흡)의 원리를 설명하시오', answer: '확산: 분압차에 의해 O2는 폐포→혈액, CO2는 혈액→폐포. 폐포 PO2 104mmHg, PCO2 40mmHg. 모세혈관 통과 시간 0.75초 내 완료.' },
      { id: 17, question: '산소해리곡선의 의미를 설명하시오', answer: 'S자 곡선: PO2와 산소포화도 관계. 우측이동(산소방출↑): pH↓, PCO2↑, 온도↑, 2,3-DPG↑. 좌측이동(산소친화력↑): 반대 조건, CO 중독.' },
      { id: 18, question: '호흡조절 기전을 설명하시오', answer: '중추: 연수(호흡중추), 뇌교(조절). 화학수용체: 중추(CO2, H+), 말초(O2). CO2가 주 자극이나 COPD에서는 O2가 자극이 됩니다.' },
      { id: 19, question: '환기-관류 비(V/Q)를 설명하시오', answer: '정상 V/Q = 0.8. V/Q 증가(사강): 폐색전. V/Q 감소(단락): 폐렴, 무기폐. 불일치는 저산소증을 유발합니다.' },
      { id: 20, question: '호흡부전의 분류를 설명하시오', answer: 'Type I(저산소성): PaO2 < 60mmHg, PaCO2 정상/낮음. Type II(고탄산성): PaCO2 > 50mmHg. 원인에 따라 치료가 다릅니다.' },
    ]
  },
  {
    id: 3,
    title: '신경계통',
    questions: [
      { id: 21, question: '중추신경계의 구조를 설명하시오', answer: '뇌(대뇌, 소뇌, 뇌간)와 척수. 뇌간: 중뇌, 뇌교, 연수(생명중추). 척수: 31쌍의 척수신경. 뇌척수막(경막, 지주막, 연막)과 뇌척수액이 보호합니다.' },
      { id: 22, question: '대뇌의 기능적 영역을 설명하시오', answer: '전두엽: 운동, 판단, 인격. 두정엽: 감각. 측두엽: 청각, 기억. 후두엽: 시각. 좌뇌: 언어(Broca, Wernicke), 우뇌: 공간지각.' },
      { id: 23, question: '뇌간의 기능을 설명하시오', answer: '중뇌: 눈운동, 각성. 뇌교: 호흡조절, 안면감각. 연수: 심혈관중추, 호흡중추, 구토중추. 뇌신경 핵이 위치하며 생명유지에 필수적입니다.' },
      { id: 24, question: '자율신경계를 비교 설명하시오', answer: '교감신경: 흥분(fight or flight) - 동공산대, 심박↑, 기관지확장, 혈관수축. 부교감신경: 이완(rest and digest) - 동공축소, 심박↓, 소화촉진.' },
      { id: 25, question: '뇌혈류와 조절기전을 설명하시오', answer: '뇌혈류량(CBF): 750mL/분(심박출량의 15%). 자동조절: MAP 60-150mmHg 범위. CO2↑→혈관확장. 두개내압↑시 쿠싱반응(고혈압, 서맥, 불규칙호흡).' },
      { id: 26, question: '척수의 기능과 손상 레벨을 설명하시오', answer: '감각, 운동, 자율신경 전달. C3-5: 횡격막(호흡). C5-T1: 상지. T1-L2: 교감신경. L2-S4: 하지, 방광. 손상 레벨에 따라 증상이 다릅니다.' },
      { id: 27, question: '뇌신경 12쌍을 열거하시오', answer: 'I후각, II시각, III동안, IV활차, V삼차, VI외전, VII안면, VIII청신경, IX설인, X미주, XI부신경, XII설하. 뇌간에서 기시합니다.' },
      { id: 28, question: '통증 전달 경로를 설명하시오', answer: '수용체→1차 뉴런(후근신경절)→척수 후각→2차 뉴런(척수시상로)→시상→3차 뉴런→대뇌피질. 빠른 통증(A-delta)과 느린 통증(C fiber).' },
      { id: 29, question: '반사의 종류와 의미를 설명하시오', answer: '심부건반사: 무릎반사(L3-4), 상완이두근(C5-6). 병적반사: 바빈스키(추체로 손상). 반사 소실/항진은 신경학적 이상을 시사합니다.' },
      { id: 30, question: '뇌압상승의 증상과 기전을 설명하시오', answer: '두통, 구토, 유두부종, 의식변화, 쿠싱삼징후. Monroe-Kellie 교리: 두개강 내 뇌, 혈액, 뇌척수액 용적 일정. 뇌탈출 시 사망 위험.' },
    ]
  },
  {
    id: 4,
    title: '근골격계통',
    questions: [
      { id: 31, question: '골격계의 기능을 설명하시오', answer: '지지(체형 유지), 보호(장기 보호), 운동(근육 부착점), 조혈(적색골수), 저장(칼슘, 인). 성인 뼈는 206개입니다.' },
      { id: 32, question: '뼈의 분류와 구조를 설명하시오', answer: '장골(대퇴골), 단골(손목뼈), 편평골(두개골), 불규칙골(척추). 구조: 골막, 치밀골, 해면골, 골수. 골단, 골간, 골단판(성장판).' },
      { id: 33, question: '척추의 구조를 설명하시오', answer: '경추 7개, 흉추 12개, 요추 5개, 천추 5개(융합), 미추 4개(융합). 추체, 추궁, 추간판, 척추관. 정상 만곡: 경추·요추 전만, 흉추·천추 후만.' },
      { id: 34, question: '관절의 종류와 구조를 설명하시오', answer: '부동관절(봉합), 반가동관절(추간판), 가동관절(활막관절). 활막관절: 관절연골, 활막, 관절낭, 인대. 윤활액이 마찰을 줄입니다.' },
      { id: 35, question: '골절의 분류를 설명하시오', answer: '개방성/폐쇄성, 완전/불완전, 분쇄/단순. 형태: 횡골절, 사선골절, 나선골절, 견열골절. 소아: 유연골절(greenstick), 토러스골절.' },
      { id: 36, question: '골절 치유 과정을 설명하시오', answer: '혈종 형성→염증기→가골(연골) 형성→가골(뼈) 형성→리모델링. 6-12주 소요. 혈류, 고정, 영양이 치유에 중요합니다.' },
      { id: 37, question: '근육의 종류와 특성을 설명하시오', answer: '골격근: 수의근, 횡문근, 빠른 수축. 심근: 불수의근, 횡문근, 자동성. 평활근: 불수의근, 민무늬근, 내장 벽.' },
      { id: 38, question: '근수축의 기전을 설명하시오', answer: '신경자극→아세틸콜린→근섬유막 탈분극→Ca2+ 방출→액틴-미오신 결합(활주설)→수축. ATP가 에너지원입니다.' },
      { id: 39, question: '골반의 구조와 임상적 의의를 설명하시오', answer: '장골, 좌골, 치골이 융합. 대혈관과 장기 보호. 골반골절: 대량출혈(3-4L) 가능. 불안정 골반은 생명 위협적입니다.' },
      { id: 40, question: '상지와 하지의 주요 골격을 설명하시오', answer: '상지: 쇄골, 견갑골, 상완골, 요골, 척골, 수근골, 중수골, 지골. 하지: 대퇴골, 슬개골, 경골, 비골, 족근골, 중족골, 지골.' },
    ]
  },
  {
    id: 5,
    title: '기타 계통',
    questions: [
      { id: 41, question: '소화계의 구조와 기능을 설명하시오', answer: '구강→인두→식도→위→소장(십이지장, 공장, 회장)→대장→직장. 부속기관: 간, 담낭, 췌장. 기계적·화학적 소화와 흡수를 담당합니다.' },
      { id: 42, question: '간의 기능을 설명하시오', answer: '대사(탄수화물, 단백질, 지방), 담즙 생성, 해독, 저장(글리코겐, 비타민), 응고인자 합성, 면역(쿠퍼세포). 우상복부에 위치합니다.' },
      { id: 43, question: '비뇨계의 구조와 기능을 설명하시오', answer: '신장: 여과, 재흡수, 분비. 요관: 소변 이동. 방광: 소변 저장(300-500mL). 요도: 배출. 노폐물 제거, 수분·전해질·산염기 조절을 담당합니다.' },
      { id: 44, question: '신장의 기능을 설명하시오', answer: '사구체에서 여과(GFR 125mL/분), 세뇨관에서 재흡수·분비. 레닌-안지오텐신, 에리스로포이에틴 분비. 비타민D 활성화. 혈압과 조혈에 관여합니다.' },
      { id: 45, question: '내분비계의 주요 호르몬을 설명하시오', answer: '뇌하수체: GH, TSH, ACTH, FSH, LH. 갑상선: T3, T4, 칼시토닌. 부신: 코르티솔, 알도스테론, 에피네프린. 췌장: 인슐린, 글루카곤.' },
      { id: 46, question: '혈당 조절 기전을 설명하시오', answer: '인슐린: 혈당↓(세포 내 포도당 유입, 글리코겐 합성). 글루카곤: 혈당↑(글리코겐 분해, 포도당신생). 에피네프린, 코르티솔도 혈당을 올립니다.' },
      { id: 47, question: '피부의 구조와 기능을 설명하시오', answer: '표피(보호), 진피(혈관, 신경, 부속기), 피하조직(지방). 기능: 보호, 체온조절, 감각, 비타민D 합성, 배설.' },
      { id: 48, question: '체온 조절 기전을 설명하시오', answer: '시상하부가 조절. 열생산: 대사, 근육활동, 식품열효과. 열손실: 복사, 전도, 대류, 증발. 발열: 세트포인트 상승, 저체온: 열손실>열생산.' },
      { id: 49, question: '면역계의 구성을 설명하시오', answer: '선천면역: 피부, 점막, 식세포, NK세포. 적응면역: B세포(항체), T세포(세포면역). 1차·2차 림프기관(흉선, 비장, 림프절).' },
      { id: 50, question: '산-염기 균형을 설명하시오', answer: '정상 pH 7.35-7.45. 완충계(중탄산, 인산, 단백질), 폐(CO2 배출), 신장(HCO3- 재흡수, H+ 배출). 산증/알칼리증은 호흡성 또는 대사성으로 분류.' },
    ]
  }
];

export default function AnatomyPhysiologyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([1]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('paramedic-1-anatomy-physiology-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('paramedic-1-anatomy-physiology-completed', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: number) => {
    setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]);
  };

  const toggleQuestion = (questionId: number) => {
    setCompletedQuestions(prev => prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]);
  };

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = completedQuestions.length;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-pink-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/paramedic-1" className="text-gray-600 hover:text-pink-600">응급구조사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">해부생리학</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🫀</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">해부생리학</h1>
              <p className="text-gray-600">응급구조사 1급 필기시험 대비</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">학습 진행률</span>
              <span className="text-sm font-medium text-pink-600">{completedCount}/{totalQuestions} 완료 ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
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
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.includes(q.id) ? 'bg-pink-50 border-pink-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleQuestion(q.id)} className={`mt-1 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${completedQuestions.includes(q.id) ? 'bg-pink-500 border-pink-500 text-white' : 'border-gray-300'}`}>
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
