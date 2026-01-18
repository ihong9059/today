'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'atomic',
    name: '원자구조',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '원자의 구성 입자와 특성을 설명하시오.', answer: '양성자(+), 중성자(0), 전자(-) / 질량수=양성자+중성자', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 원자의 구성 입자와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 양성자의 특성\n2. 중성자의 특성\n3. 전자의 특성\n4. 원자번호와 질량수\n5. 동위원소\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '보어의 수소 원자 모형을 설명하시오.', answer: '전자가 특정 궤도에서만 존재, E = -13.6/n² eV', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 보어의 수소 원자 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정상상태 가정\n2. 양자화 조건\n3. 에너지 준위\n4. 스펙트럼 설명\n5. 한계점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '전자 배치 규칙을 설명하시오.', answer: '쌓음원리, 훈트규칙, 파울리배타원리', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 전자 배치 규칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 쌓음원리 (Aufbau)\n2. 훈트규칙\n3. 파울리배타원리\n4. 오비탈 채움 순서\n5. 예외 원소\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '양자수의 종류와 의미를 설명하시오.', answer: 'n(주양자수), l(부양자수), ml(자기양자수), ms(스핀양자수)', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 양자수의 종류와 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주양자수 n\n2. 부양자수 l\n3. 자기양자수 ml\n4. 스핀양자수 ms\n5. 양자수 허용값\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '주기율표의 주기성을 설명하시오.', answer: '원자반지름, 이온화에너지, 전기음성도의 주기적 변화', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 주기율표의 주기성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원자반지름 경향\n2. 이온화에너지 경향\n3. 전자친화도 경향\n4. 전기음성도 경향\n5. 금속성/비금속성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'bonding',
    name: '화학결합',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '이온결합의 특성을 설명하시오.', answer: '금속+비금속, 전자이동, 높은 녹는점, 수용액 전도성', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 이온결합의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이온결합 형성 조건\n2. 격자에너지\n3. 물리적 성질\n4. 전기전도성\n5. 용해성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '공유결합의 종류를 설명하시오.', answer: '단일결합, 이중결합, 삼중결합 / σ결합, π결합', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 공유결합의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단일결합 특성\n2. 다중결합 형성\n3. σ결합과 π결합\n4. 결합길이와 결합에너지\n5. 극성 공유결합\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '혼성오비탈을 설명하시오.', answer: 'sp³(정사면체), sp²(평면삼각형), sp(직선형)', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 혼성오비탈을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 혼성화 개념\n2. sp³ 혼성\n3. sp² 혼성\n4. sp 혼성\n5. 분자 구조 예측\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'VSEPR 이론을 설명하시오.', answer: '전자쌍 반발로 분자 구조 결정', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: VSEPR 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. VSEPR 원리\n2. 전자쌍 배치\n3. 비공유전자쌍 영향\n4. 분자 구조 종류\n5. 결합각 예측\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '분자간 힘의 종류를 설명하시오.', answer: '수소결합, 쌍극자-쌍극자, 런던분산력', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 분자간 힘의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 런던분산력\n2. 쌍극자-쌍극자 힘\n3. 수소결합\n4. 분자간 힘과 물성\n5. 끓는점 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'reaction',
    name: '화학반응',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '화학반응식 균형 맞추기를 설명하시오.', answer: '질량보존법칙, 계수 조정으로 원자수 일치', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 화학반응식 균형 맞추기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 질량보존법칙\n2. 계수 결정 방법\n3. 산화-환원 균형\n4. 반쪽반응법\n5. 몰 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '반응속도에 영향을 주는 요인을 설명하시오.', answer: '온도, 농도, 촉매, 표면적', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 반응속도에 영향을 주는 요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 농도 영향\n2. 온도 영향 (아레니우스 식)\n3. 촉매 효과\n4. 표면적 영향\n5. 활성화에너지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '반응차수와 속도법칙을 설명하시오.', answer: 'v = k[A]^m[B]^n, 차수=m+n', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 반응차수와 속도법칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 속도법칙 표현\n2. 반응차수 결정\n3. 0차 반응\n4. 1차 반응 (반감기)\n5. 2차 반응\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '화학평형과 평형상수를 설명하시오.', answer: 'K = [생성물]/[반응물], 온도만 영향', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 화학평형과 평형상수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 동적평형\n2. 평형상수 표현\n3. Kc와 Kp 관계\n4. 평형상수와 반응방향\n5. 온도 영향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '르샤틀리에 원리를 설명하시오.', answer: '평형계에 변화 → 변화를 상쇄하는 방향으로 이동', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 르샤틀리에 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 르샤틀리에 원리\n2. 농도 변화 영향\n3. 압력 변화 영향\n4. 온도 변화 영향\n5. 촉매 영향 (없음)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'acid-base',
    name: '산-염기',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '산-염기의 정의를 비교하시오.', answer: '아레니우스, 브뢴스테드-로우리, 루이스', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 산-염기의 정의를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 아레니우스 정의\n2. 브뢴스테드-로우리 정의\n3. 루이스 정의\n4. 짝산-짝염기\n5. 양쪽성 물질\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'pH와 pOH의 관계를 설명하시오.', answer: 'pH = -log[H⁺], pH + pOH = 14 (25°C)', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: pH와 pOH의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. pH 정의\n2. pOH 정의\n3. Kw = [H⁺][OH⁻]\n4. pH + pOH = pKw\n5. pH 계산 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '완충용액의 원리를 설명하시오.', answer: '약산 + 짝염기, pH 변화 억제', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 완충용액의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 완충용액 구성\n2. 완충작용 원리\n3. 헨더슨-하셀바흐 식\n4. 완충용량\n5. 생물학적 중요성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '적정곡선의 특성을 설명하시오.', answer: '당량점, 반당량점(pH=pKa), 완충구간', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 적정곡선의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강산-강염기 적정\n2. 약산-강염기 적정\n3. 당량점 pH\n4. 반당량점 의미\n5. 지시약 선택\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가수분해 반응을 설명하시오.', answer: '염이 물과 반응하여 산성 또는 염기성', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 가수분해 반응을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 염의 분류\n2. 강산-약염기 염\n3. 약산-강염기 염\n4. 약산-약염기 염\n5. 가수분해상수\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'thermodynamics',
    name: '열화학',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '엔탈피 변화를 설명하시오.', answer: 'ΔH = qp, 발열반응(-), 흡열반응(+)', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 엔탈피 변화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 엔탈피 정의\n2. 발열/흡열 반응\n3. 표준생성엔탈피\n4. 헤스의 법칙\n5. 결합에너지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '엔트로피를 설명하시오.', answer: 'S = 무질서도, ΔSuniverse > 0 (자발적)', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 엔트로피를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 엔트로피 정의\n2. 열역학 제2법칙\n3. 엔트로피 변화 예측\n4. 표준엔트로피\n5. ΔS 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '깁스 자유에너지를 설명하시오.', answer: 'ΔG = ΔH - TΔS, ΔG < 0 자발적', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 깁스 자유에너지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 깁스에너지 정의\n2. 자발성 판단\n3. 표준자유에너지\n4. 평형상수와 관계\n5. 온도 영향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '열용량과 비열을 설명하시오.', answer: 'C = q/ΔT, 비열 = 단위질량당 열용량', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 열용량과 비열을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열용량 정의\n2. 비열 정의\n3. Cp와 Cv\n4. 열량계산\n5. 열량측정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '열역학 법칙을 설명하시오.', answer: '0법칙(열평형), 1법칙(에너지보존), 2법칙(엔트로피증가), 3법칙(절대영도)', prompt: '화학분석기사 일반화학 문제입니다.\n\n문제: 열역학 법칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열역학 제0법칙\n2. 열역학 제1법칙\n3. 열역학 제2법칙\n4. 열역학 제3법칙\n5. 응용 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function GeneralChemistryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('chemical-analyst-general-chemistry-completed');
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
    localStorage.setItem('chemical-analyst-general-chemistry-completed', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-green-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry" className="text-gray-600 hover:text-green-600">화학·환경</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry/chemical-analyst" className="text-gray-600 hover:text-green-600">화학분석기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">일반화학</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚗️</span>
            <h1 className="text-2xl font-bold text-gray-800">일반화학 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">화학분석기사 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-green-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-green-500 text-white hover:bg-green-600'}`}>
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
