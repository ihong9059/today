'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  answer: string;
  prompt: string;
}

interface Topic {
  title: string;
  questions: Question[];
}

export default function PublicHealthStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '공중보건의 개념과 역사',
      questions: [
        { id: 1, question: '공중보건의 정의는?', answer: '공중보건은 조직적인 지역사회 노력을 통해 질병을 예방하고 건강을 증진하며 수명을 연장시키는 과학과 기술이다.', prompt: '보건교육사 3급 시험 준비: 공중보건의 정의를 설명해주세요.' },
        { id: 2, question: '공중보건과 임상의학의 차이는?', answer: '공중보건은 집단/예방 중심, 임상의학은 개인/치료 중심이다.', prompt: '보건교육사 3급 시험 준비: 공중보건과 임상의학의 차이를 설명해주세요.' },
        { id: 3, question: '공중보건의 3대 기능은?', answer: '평가(Assessment), 정책개발(Policy Development), 보장(Assurance)이다.', prompt: '보건교육사 3급 시험 준비: 공중보건의 3대 기능을 설명해주세요.' },
        { id: 4, question: '공중보건의 역사적 발전 과정은?', answer: '미아즈마설 → 세균설 → 사회의학 → 건강증진으로 발전했다.', prompt: '보건교육사 3급 시험 준비: 공중보건의 역사적 발전 과정을 설명해주세요.' },
        { id: 5, question: '역학(Epidemiology)의 정의는?', answer: '역학은 인구집단에서 질병의 발생 분포와 원인을 연구하는 학문이다.', prompt: '보건교육사 3급 시험 준비: 역학의 정의를 설명해주세요.' },
        { id: 6, question: '역학의 기본 3요소는?', answer: '숙주(Host), 병인(Agent), 환경(Environment)의 상호작용이다.', prompt: '보건교육사 3급 시험 준비: 역학의 기본 3요소를 설명해주세요.' },
        { id: 7, question: '발생률(Incidence Rate)이란?', answer: '일정 기간 동안 특정 집단에서 새로 발생한 환자 수의 비율이다.', prompt: '보건교육사 3급 시험 준비: 발생률을 설명해주세요.' },
        { id: 8, question: '유병률(Prevalence Rate)이란?', answer: '특정 시점에 질병을 가진 사람의 비율이다.', prompt: '보건교육사 3급 시험 준비: 유병률을 설명해주세요.' },
        { id: 9, question: '사망률의 종류는?', answer: '조사망률, 연령별 사망률, 영아사망률, 모성사망률 등이 있다.', prompt: '보건교육사 3급 시험 준비: 사망률의 종류를 설명해주세요.' },
        { id: 10, question: '건강지표의 종류는?', answer: '사망지표, 질병지표, 건강행태지표, 건강수준지표 등이 있다.', prompt: '보건교육사 3급 시험 준비: 건강지표의 종류를 설명해주세요.' },
      ],
    },
    {
      title: '감염병 관리',
      questions: [
        { id: 11, question: '감염병 발생의 3요소는?', answer: '감염원(병원체), 전파경로, 감수성 숙주가 있어야 감염이 성립한다.', prompt: '보건교육사 3급 시험 준비: 감염병 발생의 3요소를 설명해주세요.' },
        { id: 12, question: '감염병의 전파경로는?', answer: '직접전파(접촉), 간접전파(매개물, 매개곤충), 공기전파가 있다.', prompt: '보건교육사 3급 시험 준비: 감염병의 전파경로를 설명해주세요.' },
        { id: 13, question: '감염병 예방법상 감염병 분류는?', answer: '제1급~제4급 및 기생충감염병, 의료관련감염병으로 분류된다.', prompt: '보건교육사 3급 시험 준비: 감염병 분류를 설명해주세요.' },
        { id: 14, question: '제1급 감염병의 특징은?', answer: '에볼라 등 치명률이 높거나 전파력이 강해 즉시 신고하고 격리가 필요하다.', prompt: '보건교육사 3급 시험 준비: 제1급 감염병의 특징을 설명해주세요.' },
        { id: 15, question: '예방접종의 원리는?', answer: '약독화 또는 사멸 병원체를 투여하여 면역을 형성시킨다.', prompt: '보건교육사 3급 시험 준비: 예방접종의 원리를 설명해주세요.' },
        { id: 16, question: '능동면역과 수동면역의 차이는?', answer: '능동면역은 스스로 항체 생성, 수동면역은 외부에서 항체 주입이다.', prompt: '보건교육사 3급 시험 준비: 능동면역과 수동면역의 차이를 설명해주세요.' },
        { id: 17, question: '국가필수예방접종의 종류는?', answer: 'BCG, B형간염, DTaP, 폴리오, MMR, 수두, 일본뇌염, 인플루엔자 등이 있다.', prompt: '보건교육사 3급 시험 준비: 국가필수예방접종의 종류를 설명해주세요.' },
        { id: 18, question: '집단면역(Herd Immunity)이란?', answer: '인구의 일정 비율이 면역을 가지면 감염병 확산이 억제되는 현상이다.', prompt: '보건교육사 3급 시험 준비: 집단면역을 설명해주세요.' },
        { id: 19, question: '검역의 목적과 방법은?', answer: '해외 유입 감염병을 차단하기 위해 입국자를 검사하고 격리한다.', prompt: '보건교육사 3급 시험 준비: 검역의 목적과 방법을 설명해주세요.' },
        { id: 20, question: '손 위생의 중요성은?', answer: '감염병 전파를 차단하는 가장 기본적이고 효과적인 방법이다.', prompt: '보건교육사 3급 시험 준비: 손 위생의 중요성을 설명해주세요.' },
      ],
    },
    {
      title: '만성질환 관리',
      questions: [
        { id: 21, question: '만성질환의 정의와 특성은?', answer: '3개월 이상 지속되는 질환으로, 서서히 발병하고 완치가 어려우며 관리가 필요하다.', prompt: '보건교육사 3급 시험 준비: 만성질환의 정의와 특성을 설명해주세요.' },
        { id: 22, question: '주요 만성질환의 종류는?', answer: '심혈관질환, 암, 당뇨병, 만성호흡기질환 등이 있다.', prompt: '보건교육사 3급 시험 준비: 주요 만성질환의 종류를 설명해주세요.' },
        { id: 23, question: '만성질환의 위험요인은?', answer: '흡연, 음주, 신체활동 부족, 불건강한 식습관이 주요 위험요인이다.', prompt: '보건교육사 3급 시험 준비: 만성질환의 위험요인을 설명해주세요.' },
        { id: 24, question: '고혈압의 기준과 관리는?', answer: '수축기 140mmHg 이상 또는 이완기 90mmHg 이상이며, 약물과 생활습관 관리가 필요하다.', prompt: '보건교육사 3급 시험 준비: 고혈압의 기준과 관리를 설명해주세요.' },
        { id: 25, question: '당뇨병의 종류와 관리는?', answer: '제1형(인슐린 의존)과 제2형(인슐린 저항)이 있으며, 식이, 운동, 약물 관리가 필요하다.', prompt: '보건교육사 3급 시험 준비: 당뇨병의 종류와 관리를 설명해주세요.' },
        { id: 26, question: '비만의 정의와 판정 기준은?', answer: 'BMI 25 이상이 비만이며, 허리둘레도 복부비만 판정에 활용된다.', prompt: '보건교육사 3급 시험 준비: 비만의 정의와 판정 기준을 설명해주세요.' },
        { id: 27, question: '암 예방 생활수칙은?', answer: '금연, 절주, 건강한 식단, 운동, 정기검진, 예방접종 등이 있다.', prompt: '보건교육사 3급 시험 준비: 암 예방 생활수칙을 설명해주세요.' },
        { id: 28, question: '국가암검진 대상과 주기는?', answer: '위암(40세~), 대장암(50세~), 유방암(40세~), 자궁경부암(20세~), 간암(고위험군)이다.', prompt: '보건교육사 3급 시험 준비: 국가암검진 대상과 주기를 설명해주세요.' },
        { id: 29, question: '심뇌혈관질환 예방법은?', answer: '혈압, 혈당, 콜레스테롤 관리와 금연, 건강한 식단, 운동이 중요하다.', prompt: '보건교육사 3급 시험 준비: 심뇌혈관질환 예방법을 설명해주세요.' },
        { id: 30, question: '만성질환 자기관리의 중요성은?', answer: '환자 스스로 식이, 운동, 약물, 스트레스를 관리하여 합병증을 예방한다.', prompt: '보건교육사 3급 시험 준비: 만성질환 자기관리의 중요성을 설명해주세요.' },
      ],
    },
    {
      title: '건강생활 실천',
      questions: [
        { id: 31, question: '흡연의 건강영향은?', answer: '폐암, 심혈관질환, 만성폐쇄성폐질환, 뇌졸중 등의 위험을 높인다.', prompt: '보건교육사 3급 시험 준비: 흡연의 건강영향을 설명해주세요.' },
        { id: 32, question: '금연의 효과는?', answer: '심장병 위험 감소, 폐 기능 개선, 암 발생 위험 감소 등의 효과가 있다.', prompt: '보건교육사 3급 시험 준비: 금연의 효과를 설명해주세요.' },
        { id: 33, question: '적정 음주량의 기준은?', answer: '남성 하루 2잔, 여성 하루 1잔 이하가 저위험 음주 기준이다.', prompt: '보건교육사 3급 시험 준비: 적정 음주량의 기준을 설명해주세요.' },
        { id: 34, question: '과음의 건강영향은?', answer: '간질환, 심혈관질환, 암, 정신건강 문제 등의 위험을 높인다.', prompt: '보건교육사 3급 시험 준비: 과음의 건강영향을 설명해주세요.' },
        { id: 35, question: '균형 잡힌 식사의 원칙은?', answer: '다양한 식품 섭취, 적절한 열량, 영양소 균형, 규칙적 식사가 중요하다.', prompt: '보건교육사 3급 시험 준비: 균형 잡힌 식사의 원칙을 설명해주세요.' },
        { id: 36, question: '나트륨 과다 섭취의 문제는?', answer: '고혈압, 심장질환, 뇌졸중, 위암 등의 위험을 높인다.', prompt: '보건교육사 3급 시험 준비: 나트륨 과다 섭취의 문제를 설명해주세요.' },
        { id: 37, question: '규칙적 신체활동의 효과는?', answer: '만성질환 예방, 체중 관리, 정신건강 개선, 수명 연장 효과가 있다.', prompt: '보건교육사 3급 시험 준비: 규칙적 신체활동의 효과를 설명해주세요.' },
        { id: 38, question: '권장 신체활동량은?', answer: '중강도 150분 또는 고강도 75분 이상/주, 근력운동 주 2회 이상이다.', prompt: '보건교육사 3급 시험 준비: 권장 신체활동량을 설명해주세요.' },
        { id: 39, question: '충분한 수면의 중요성은?', answer: '면역력 강화, 인지기능 유지, 정서 안정, 만성질환 예방에 중요하다.', prompt: '보건교육사 3급 시험 준비: 충분한 수면의 중요성을 설명해주세요.' },
        { id: 40, question: '스트레스 관리 방법은?', answer: '운동, 취미활동, 이완기법, 사회적 지지, 전문가 상담 등이 있다.', prompt: '보건교육사 3급 시험 준비: 스트레스 관리 방법을 설명해주세요.' },
      ],
    },
    {
      title: '보건의료체계와 정책',
      questions: [
        { id: 41, question: '보건의료체계의 구성요소는?', answer: '자원(인력, 시설), 조직, 재정, 관리로 구성된다.', prompt: '보건교육사 3급 시험 준비: 보건의료체계의 구성요소를 설명해주세요.' },
        { id: 42, question: '국민건강보험제도의 특성은?', answer: '사회보험 방식으로 전 국민 의무가입, 균등급여 원칙이다.', prompt: '보건교육사 3급 시험 준비: 국민건강보험제도의 특성을 설명해주세요.' },
        { id: 43, question: '의료급여제도란?', answer: '저소득층에게 의료비를 국가가 지원하는 공공부조 제도이다.', prompt: '보건교육사 3급 시험 준비: 의료급여제도를 설명해주세요.' },
        { id: 44, question: '보건소의 기능은?', answer: '건강증진, 질병예방, 방문건강관리, 보건교육 등 지역 공중보건 업무를 수행한다.', prompt: '보건교육사 3급 시험 준비: 보건소의 기능을 설명해주세요.' },
        { id: 45, question: '1차, 2차, 3차 의료기관의 차이는?', answer: '1차(의원), 2차(병원), 3차(상급종합병원)로 진료 수준이 구분된다.', prompt: '보건교육사 3급 시험 준비: 1차, 2차, 3차 의료기관의 차이를 설명해주세요.' },
        { id: 46, question: '건강검진제도의 종류는?', answer: '일반건강검진, 생애전환기검진, 암검진, 영유아검진 등이 있다.', prompt: '보건교육사 3급 시험 준비: 건강검진제도의 종류를 설명해주세요.' },
        { id: 47, question: '건강증진사업의 종류는?', answer: '금연, 절주, 영양, 신체활동, 정신건강, 구강건강 사업 등이 있다.', prompt: '보건교육사 3급 시험 준비: 건강증진사업의 종류를 설명해주세요.' },
        { id: 48, question: '모자보건사업의 내용은?', answer: '임산부 관리, 영유아 건강검진, 예방접종, 영양 지원 등이 있다.', prompt: '보건교육사 3급 시험 준비: 모자보건사업의 내용을 설명해주세요.' },
        { id: 49, question: '학교보건의 목표는?', answer: '학생과 교직원의 건강 유지·증진, 건강한 학교 환경 조성이 목표이다.', prompt: '보건교육사 3급 시험 준비: 학교보건의 목표를 설명해주세요.' },
        { id: 50, question: '산업보건의 목표는?', answer: '근로자의 건강 보호, 직업병 예방, 안전한 작업환경 조성이 목표이다.', prompt: '보건교육사 3급 시험 준비: 산업보건의 목표를 설명해주세요.' },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-3-public-health-progress');
    if (saved) {
      setCompletedQuestions(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleQuestion = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedQuestions(newCompleted);
    localStorage.setItem('health-educator-3-public-health-progress', JSON.stringify([...newCompleted]));
  };

  const toggleTopic = (index: number) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTopics(newExpanded);
  };

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = completedQuestions.size;
  const progressPercentage = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-cyan-600">홈</Link>
            <span>›</span>
            <Link href="/category/medical" className="hover:text-cyan-600">의료·보건</Link>
            <span>›</span>
            <Link href="/category/medical/health-educator-3" className="hover:text-cyan-600">보건교육사 3급</Link>
            <span>›</span>
            <span className="text-cyan-600 font-medium">공중보건학</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">🏥 공중보건학 학습 가이드</h1>
          <p className="text-sm text-gray-500 mt-1">보건교육사 3급 필기 2과목</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">학습 진도</span>
            <span className="text-sm text-gray-500">{completedCount} / {totalQuestions} 완료</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="text-right mt-1 text-sm text-cyan-600 font-medium">{progressPercentage}%</div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicCompleted = topic.questions.filter(q => completedQuestions.has(q.id)).length;
            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{expandedTopics.has(topicIndex) ? '📂' : '📁'}</span>
                    <span className="font-medium text-gray-800">{topic.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length}</span>
                    <span className="text-gray-400">{expandedTopics.has(topicIndex) ? '▲' : '▼'}</span>
                  </div>
                </button>
                {expandedTopics.has(topicIndex) && (
                  <div className="p-4 space-y-3">
                    {topic.questions.map((q) => (
                      <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.has(q.id) ? 'bg-cyan-50 border-cyan-200' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${completedQuestions.has(q.id) ? 'bg-cyan-500 border-cyan-500 text-white' : 'border-gray-300 hover:border-cyan-500'}`}
                          >
                            {completedQuestions.has(q.id) && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                            <p className="text-sm text-gray-600 mb-3">{q.answer}</p>
                            <div className="flex gap-2">
                              <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition">Claude</a>
                              <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition">ChatGPT</a>
                              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Gemini</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
