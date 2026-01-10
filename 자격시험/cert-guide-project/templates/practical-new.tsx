'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'wiring',
    name: '배선설계',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '전선의 굵기 선정 시 고려사항 3가지를 쓰시오.', answer: '허용전류, 전압강하, 기계적 강도', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 전선의 굵기 선정 시 고려사항 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 허용전류 조건\n2. 전압강하 조건\n3. 기계적 강도\n4. 선정 절차\n5. 안전율 고려\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '옥내배선의 전압강하 허용값을 쓰시오.', answer: '간선 3%, 분기회로 2% 이내 (합계 5% 이내)', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 옥내배선의 전압강하 허용값을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 간선 허용 전압강하\n2. 분기회로 허용 전압강하\n3. 합계 허용값\n4. 계산 공식\n5. 저감 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '배선용차단기(MCCB) 정격전류 선정 방법을 설명하시오.', answer: '부하전류 ≤ 정격전류 ≤ 전선허용전류', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 배선용차단기(MCCB) 정격전류 선정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부하전류 계산\n2. 전선 허용전류\n3. IB ≤ In ≤ Iz\n4. 차단기 선정\n5. 협조 보호\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '접지저항 측정방법을 설명하시오.', answer: '3전극법(전위강하법), 보조전극 간격 10m 이상', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 접지저항 측정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 3전극법 원리\n2. 전극 배치\n3. 측정 절차\n4. 보조전극 조건\n5. 측정 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '누전차단기(ELB) 동작원리를 설명하시오.', answer: '영상변류기(ZCT)로 누설전류 검출', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 누전차단기(ELB) 동작원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ZCT 원리\n2. 누설전류 검출\n3. 감도전류\n4. 동작시간\n5. 테스트 버튼\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'power-calc',
    name: '전력설비계산',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '3상 전력 P=50kW, 역률 0.8, 선간전압 380V일 때 전류는?', answer: 'I = P/(√3VLcosφ) = 95A', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 3상 전력 P=50kW, 역률 0.8, 선간전압 380V일 때 전류는?\n\n다음 순서로 설명해주세요:\n1. 3상 전력 공식\n2. P = √3VLILcosφ\n3. IL = P/(√3VLcosφ)\n4. 대입하여 계산\n5. 검산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '역률 0.8을 0.95로 개선하기 위한 콘덴서 용량을 구하시오. (P=100kW)', answer: 'Qc = P(tanφ1-tanφ2) = 42.5kVar', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 역률 0.8을 0.95로 개선하기 위한 콘덴서 용량을 구하시오. (P=100kW)\n\n다음 순서로 설명해주세요:\n1. tanφ1, tanφ2 계산\n2. Qc = P(tanφ1-tanφ2)\n3. 대입하여 계산\n4. 콘덴서 선정\n5. 개선 효과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '변압기 용량 선정 방법을 설명하시오.', answer: '설비용량 × 수용률 × 여유율', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 변압기 용량 선정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설비용량 산정\n2. 수용률 적용\n3. 여유율 고려\n4. 표준용량 선정\n5. 병렬운전 고려\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '전선의 전압강하 계산 공식을 쓰시오. (3상)', answer: 'e = √3IR(cosφ + Xsinφ/R) [V]', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 전선의 전압강하 계산 공식을 쓰시오. (3상)\n\n다음 순서로 설명해주세요:\n1. 전압강하 공식\n2. 저항 R 계산\n3. 리액턴스 X\n4. 역률 영향\n5. 간략식\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '단락전류 계산 방법을 설명하시오.', answer: 'Is = 100In/%Z', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 단락전류 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. %임피던스법\n2. Is = 100In/%Z\n3. 기준용량 환산\n4. 단락용량\n5. 차단기 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'lighting',
    name: '조명설계',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '조도 계산 공식(광속법)을 쓰시오.', answer: 'E = F×N×U×M/A [lx]', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 조도 계산 공식(광속법)을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 광속법 공식\n2. F(광속), N(등수)\n3. U(조명률)\n4. M(감광보상률)\n5. A(면적)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '사무실 조명 설계 시 권장 조도는?', answer: '500 lx (정밀작업 750~1000 lx)', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 사무실 조명 설계 시 권장 조도는?\n\n다음 순서로 설명해주세요:\n1. KS 조도기준\n2. 사무실 500 lx\n3. 정밀작업장\n4. 복도, 창고\n5. 균제도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '조명률에 영향을 주는 요소를 쓰시오.', answer: '실지수, 반사율, 조명기구 형태', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 조명률에 영향을 주는 요소를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 실지수(Room Index)\n2. 천장/벽 반사율\n3. 조명기구 배광\n4. 조명률표 사용\n5. 직접/간접조명\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'LED 조명의 장점 5가지를 쓰시오.', answer: '고효율, 장수명, 저발열, 친환경, 순간점등', prompt: '전기산업기사 실기 문제입니다.\n\n문제: LED 조명의 장점 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 고효율 (lm/W)\n2. 장수명 (50,000h)\n3. 저발열\n4. 친환경 (수은 없음)\n5. 순간점등/소등\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '비상조명 설치 기준을 설명하시오.', answer: '바닥면 1 lx 이상, 60분 이상 점등', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 비상조명 설치 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 대상\n2. 조도 기준\n3. 점등 시간\n4. 축전지 용량\n5. 피난경로 표시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'sequence',
    name: '시퀀스제어',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '자기유지회로의 동작원리를 설명하시오.', answer: 'MC 보조접점(a접점)으로 기동버튼 대체', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 자기유지회로의 동작원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기유지 원리\n2. MC 보조접점 역할\n3. 기동/정지 동작\n4. 회로도 설명\n5. 인터록과 조합\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Y-Δ 기동회로의 동작순서를 설명하시오.', answer: 'Y결선 기동 → 타이머 → Δ결선 운전', prompt: '전기산업기사 실기 문제입니다.\n\n문제: Y-Δ 기동회로의 동작순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Y결선 기동\n2. 타이머 동작\n3. Y해제 → Δ투입\n4. 인터록 회로\n5. 기동전류 감소 효과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '정역운전회로의 인터록 방법을 설명하시오.', answer: '전기적 인터록(MC b접점) + 기계적 인터록', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 정역운전회로의 인터록 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정역운전 원리\n2. 전기적 인터록\n3. 기계적 인터록\n4. 동시투입 방지\n5. 회로도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '타이머(한시계전기)의 종류와 용도를 설명하시오.', answer: 'On-delay, Off-delay, 플리커', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 타이머(한시계전기)의 종류와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. On-delay 타이머\n2. Off-delay 타이머\n3. 플리커 릴레이\n4. 각각의 접점\n5. 적용 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'PLC 프로그램의 기본 명령어 5가지를 쓰시오.', answer: 'LD, AND, OR, OUT, TMR', prompt: '전기산업기사 실기 문제입니다.\n\n문제: PLC 프로그램의 기본 명령어 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. LD (로드)\n2. AND (직렬)\n3. OR (병렬)\n4. OUT (출력)\n5. TMR (타이머)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety',
    name: '전기안전관리',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '감전사고 방지대책 5가지를 쓰시오.', answer: '절연, 접지, 누전차단기, 보호구, 안전거리', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 감전사고 방지대책 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 절연 보호\n2. 보호접지\n3. 누전차단기\n4. 보호구 착용\n5. 안전거리 확보\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '절연저항 측정 방법과 허용값을 쓰시오.', answer: '메거로 측정, 저압 0.1MΩ 이상', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 절연저항 측정 방법과 허용값을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 메거 사용법\n2. 측정 전압\n3. 저압 허용값\n4. 고압 허용값\n5. 불량 시 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '정전작업 시 안전작업 절차를 설명하시오.', answer: '개폐기 개방→검전→접지→표지판', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 정전작업 시 안전작업 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업계획\n2. 개폐기 개방\n3. 검전 확인\n4. 단락접지\n5. 표지판/감시인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '접지공사의 종류별 접지저항값을 쓰시오.', answer: '특고압 10Ω, 고압 75Ω, 저압 100Ω', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 접지공사의 종류별 접지저항값을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 특고압 계통\n2. 고압 계통\n3. 저압 계통\n4. 접지선 굵기\n5. 접지봉 시공\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '활선작업 시 안전조치를 설명하시오.', answer: '절연용 보호구/방호구 착용, 안전거리 확보', prompt: '전기산업기사 실기 문제입니다.\n\n문제: 활선작업 시 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업 자격\n2. 절연장갑/장화\n3. 절연봉/절연시트\n4. 안전거리\n5. 감시인 배치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ElectricCraftsmanPracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('electric-craftsman-practical-completed');
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
    localStorage.setItem('electric-craftsman-practical-completed', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-orange-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/electric-craftsman" className="text-gray-600 hover:text-orange-600">전기산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-rose-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🔧</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">전기설비실기</h1>
              <p className="text-red-100">전기산업기사 실기 핵심 내용</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold">{totalCompleted}/{totalQuestions}</div>
              <div className="text-red-100 text-sm">문제 완료</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
                    {getCompletedCount(topic.id)}/{topic.questions.length}
                  </span>
                </div>
                <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => {
                    const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border-2 transition ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleComplete(topic.id, q.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                          >
                            {isCompleted && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                            <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                            <div className="flex gap-2 flex-wrap">
                              <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">🧡 Claude</a>
                              <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">💚 ChatGPT</a>
                              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">💙 Gemini</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
