'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'atomic-structure',
    name: '원자구조와 주기율표',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '원자의 구성 입자(양성자, 중성자, 전자)와 특성을 설명하시오.', answer: '양성자: 원자핵 내, +전하, 질량 1. 중성자: 원자핵 내, 전하 없음, 질량 1. 전자: 궤도, -전하, 질량 거의 0', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 원자의 구성 입자와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 양성자의 특성\n2. 중성자의 특성\n3. 전자의 특성\n4. 원자번호와 질량수\n5. 동위원소 개념\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '주기율표의 주기와 족의 의미를 설명하시오.', answer: '주기: 전자껍질 수, 가로줄. 족: 최외각전자 수(가전자), 세로줄, 화학적 성질 유사', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 주기율표의 주기와 족의 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주기의 정의\n2. 족의 정의\n3. 같은 족 원소의 특징\n4. 주기율 성질\n5. 대표 원소족\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '이온화에너지, 전자친화도, 전기음성도의 개념을 설명하시오.', answer: '이온화에너지: 전자 떼는데 필요한 에너지. 전자친화도: 전자 얻을 때 방출하는 에너지. 전기음성도: 전자 끌어당기는 능력', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 이온화에너지, 전자친화도, 전기음성도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이온화에너지 정의\n2. 전자친화도 정의\n3. 전기음성도 정의\n4. 주기율표에서의 경향성\n5. 화학결합과의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '화학결합의 종류(이온결합, 공유결합, 금속결합)를 설명하시오.', answer: '이온결합: 전자 이동, 이온 간 정전기력. 공유결합: 전자쌍 공유. 금속결합: 자유전자의 이동', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 화학결합의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이온결합 원리\n2. 공유결합 원리\n3. 금속결합 원리\n4. 각 결합의 특성\n5. 물질 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '산화수와 산화·환원 반응을 설명하시오.', answer: '산화수: 화합물 내 원자의 전하 상태. 산화: 산화수 증가, 전자 잃음. 환원: 산화수 감소, 전자 얻음', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 산화수와 산화환원 반응을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산화수 정의\n2. 산화수 규칙\n3. 산화 반응\n4. 환원 반응\n5. 산화환원 반응 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'gas-laws',
    name: '기체법칙',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '보일의 법칙과 샤를의 법칙을 설명하시오.', answer: '보일: PV=일정(온도일정). 샤를: V/T=일정(압력일정)', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 보일의 법칙과 샤를의 법칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보일의 법칙\n2. 샤를의 법칙\n3. 압력-부피-온도 관계\n4. 적용 예시\n5. 실생활 응용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '이상기체 방정식 PV=nRT를 설명하시오.', answer: 'P: 압력, V: 부피, n: 몰수, R: 기체상수(0.082 atm·L/mol·K), T: 절대온도', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 이상기체 방정식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 변수의 의미\n2. 기체상수 R\n3. 표준상태(STP)\n4. 계산 문제 풀이법\n5. 실제기체와의 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '기체의 확산과 분자운동론을 설명하시오.', answer: '확산: 농도차에 의한 기체 이동. 분자운동론: 기체 분자의 무작위 운동, 온도↑→속도↑', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 기체의 확산과 분자운동론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 확산 현상\n2. 그레이엄의 법칙\n3. 분자운동론 기본 가정\n4. 온도와 분자 속도\n5. 위험물 증기와의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '증기압과 끓는점, 증발을 설명하시오.', answer: '증기압: 액체-기체 평형 시 증기의 압력. 끓는점: 증기압=대기압인 온도. 증발: 액체→기체 상변화', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 증기압과 끓는점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 증기압 정의\n2. 끓는점 정의\n3. 온도와 증기압 관계\n4. 인화점과의 관계\n5. 위험물 저장 시 고려사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '돌턴의 분압법칙을 설명하시오.', answer: '혼합기체의 전체압력 = 각 성분기체의 부분압력의 합. P전체 = P1 + P2 + P3 + ...', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 돌턴의 분압법칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분압의 정의\n2. 분압법칙 수식\n3. 몰분율과의 관계\n4. 계산 예시\n5. 위험물 혼합 시 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'solution',
    name: '용액',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '용액의 농도 표현법(몰농도, 몰랄농도, 백분율)을 설명하시오.', answer: '몰농도(M): mol/L. 몰랄농도(m): mol/kg용매. 질량백분율: (용질질량/용액질량)×100', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 용액의 농도 표현법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 몰농도(M)\n2. 몰랄농도(m)\n3. 질량백분율(%)\n4. 부피백분율\n5. 농도 환산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '용해도와 용해도곱을 설명하시오.', answer: '용해도: 일정온도에서 녹을 수 있는 최대량. 용해도곱(Ksp): 포화용액에서 이온농도의 곱', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 용해도와 용해도곱을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용해도 정의\n2. 온도와 용해도 관계\n3. 용해도곱 정의\n4. 침전 생성 조건\n5. 계산 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '콜로이드 용액의 특성을 설명하시오.', answer: '입자크기 1~100nm. 틴들현상, 브라운운동, 전기영동, 응석. 친수·소수콜로이드', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 콜로이드 용액의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 콜로이드 정의\n2. 틴들현상\n3. 브라운운동\n4. 친수·소수콜로이드\n5. 응집\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '묽은 용액의 총괄성(증기압내림, 끓는점오름, 어는점내림)을 설명하시오.', answer: '증기압내림: 용질 첨가 시 증기압 감소. 끓는점오름: ΔTb=Kb·m. 어는점내림: ΔTf=Kf·m', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 묽은 용액의 총괄성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 증기압내림\n2. 끓는점오름\n3. 어는점내림\n4. 삼투압\n5. 실생활 응용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '산과 염기의 정의(아레니우스, 브뢴스테드-로우리)를 설명하시오.', answer: '아레니우스: 산-H⁺ 내놓음, 염기-OH⁻ 내놓음. 브뢴스테드: 산-양성자 주개, 염기-양성자 받개', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 산과 염기의 정의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아레니우스 정의\n2. 브뢴스테드-로우리 정의\n3. 루이스 정의\n4. 산-염기 반응\n5. pH와 pOH\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'chemical-reaction',
    name: '화학반응',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      { id: 1, question: '발열반응과 흡열반응을 설명하시오.', answer: '발열: 열 방출, ΔH<0, 생성물 에너지 낮음. 흡열: 열 흡수, ΔH>0, 생성물 에너지 높음', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 발열반응과 흡열반응을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발열반응 정의\n2. 흡열반응 정의\n3. 엔탈피 변화(ΔH)\n4. 반응 예시\n5. 위험물과의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '화학반응 속도와 촉매를 설명하시오.', answer: '반응속도: 단위시간당 농도변화. 영향인자: 농도, 온도, 촉매, 표면적. 촉매: 활성화에너지 낮춤', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 화학반응 속도와 촉매를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 반응속도 정의\n2. 반응속도 영향 인자\n3. 활성화에너지\n4. 촉매의 역할\n5. 위험물 반응 제어\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '화학평형과 르샤틀리에 원리를 설명하시오.', answer: '화학평형: 정반응속도=역반응속도. 르샤틀리에: 평형계에 변화 가하면 그 변화를 상쇄하는 방향으로 이동', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 화학평형과 르샤틀리에 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화학평형 정의\n2. 평형상수\n3. 르샤틀리에 원리\n4. 농도·압력·온도 영향\n5. 평형 이동 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '산화환원 반응의 전자 이동과 산화제·환원제를 설명하시오.', answer: '산화제: 전자 받음(자신은 환원). 환원제: 전자 줌(자신은 산화). 전자 이동 수 균형 맞춰야 함', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 산화환원 반응의 전자 이동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산화제 역할\n2. 환원제 역할\n3. 전자 이동\n4. 반응식 균형\n5. 위험물 반응 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '연소 반응과 완전연소·불완전연소를 설명하시오.', answer: '연소: 가연물과 산소의 급격한 산화반응. 완전연소: CO₂+H₂O. 불완전연소: CO+C 생성', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 연소 반응을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연소 정의\n2. 완전연소\n3. 불완전연소\n4. 연소 생성물\n5. 위험물 연소 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'electrochemistry',
    name: '전기화학',
    color: 'from-red-500 to-pink-500',
    questions: [
      { id: 1, question: '산화·환원 반응과 전지의 원리를 설명하시오.', answer: '전지: 화학에너지→전기에너지. 산화: 음극(전자 방출), 환원: 양극(전자 수용)', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 전지의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전지의 정의\n2. 산화 반응(음극)\n3. 환원 반응(양극)\n4. 전자 이동\n5. 기전력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '전기분해와 패러데이 법칙을 설명하시오.', answer: '전기분해: 전기에너지→화학에너지. 패러데이법칙: 석출량은 통과 전기량에 비례', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 전기분해와 패러데이 법칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전기분해 정의\n2. 전기분해 반응\n3. 패러데이 법칙\n4. 전기량 계산\n5. 도금 응용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '일차전지와 이차전지의 차이를 설명하시오.', answer: '일차전지: 방전만 가능, 재충전 불가(건전지). 이차전지: 충·방전 반복 가능(배터리)', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 일차전지와 이차전지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일차전지 특성\n2. 이차전지 특성\n3. 일차전지 종류\n4. 이차전지 종류\n5. 장단점 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '금속의 이온화 경향과 표준전극전위를 설명하시오.', answer: '이온화경향: 금속이 전자 잃고 양이온 되려는 경향. K>Ca>Na>Mg>Al>Zn>Fe>Ni>Sn>Pb>(H)>Cu>Hg>Ag>Pt>Au', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 금속의 이온화 경향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이온화 경향 정의\n2. 이온화 서열\n3. 표준전극전위\n4. 금속의 반응성\n5. 부식과의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '부식과 방식법을 설명하시오.', answer: '부식: 금속의 산화반응. 방식법: 도금, 도장, 희생양극법, 전기방식법', prompt: '위험물기사 일반화학 문제입니다.\n\n문제: 부식과 방식법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부식 원리\n2. 부식 조건\n3. 도금·도장\n4. 희생양극법\n5. 전기방식법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function GeneralChemistryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-engineer-general-chemistry-progress');
    if (saved) {
      const arr = JSON.parse(saved);
      const obj: Record<string, boolean> = {};
      arr.forEach((key: string) => { obj[key] = true; });
      setCompletedQuestions(obj);
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    const arr = Object.keys(newCompleted).filter(k => newCompleted[k]);
    localStorage.setItem('hazardous-engineer-general-chemistry-progress', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-red-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/hazardous-engineer" className="text-gray-600 hover:text-red-600">위험물기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">일반화학</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚗️</span>
            <h1 className="text-2xl font-bold text-gray-800">일반화학 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">위험물기사 필기시험 필수 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-red-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">({getCompletedCount(topic.id)}/{topic.questions.length})</span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '▲' : '▼'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => {
                    const key = `${topic.id}-${q.id}`;
                    const isCompleted = completedQuestions[key];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">
                            🧡 Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            💚 ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            💙 Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:opacity-90'}`}>
                            {isCompleted ? '완료 취소' : '✓ 완료'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
