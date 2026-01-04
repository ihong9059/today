'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'gas-production',
    name: '가스 제조설비',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '공기액화분리법으로 산소를 제조하는 원리를 설명하시오.', answer: '공기 압축→냉각→액화→증류탑에서 비점 차이로 분리(O2 -183℃, N2 -196℃)', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 공기액화분리법으로 산소를 제조하는 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공기 압축 과정\n2. 냉각 및 액화\n3. 증류탑 분리 원리\n4. 비점 차이\n5. 순도 향상 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'PSA(Pressure Swing Adsorption) 방식을 설명하시오.', answer: '압력 변화를 이용한 흡착·탈착으로 가스 분리(흡착제: 제올라이트)', prompt: '가스기사 가스설비 문제입니다.\n\n문제: PSA 방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PSA 원리\n2. 흡착제 종류\n3. 가압/감압 사이클\n4. 적용 대상 가스\n5. 장단점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '수소 제조방법(수증기 개질법)을 설명하시오.', answer: '천연가스(CH4) + 수증기 → H2 + CO (촉매 반응, 800~900℃)', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 수소 제조방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수증기 개질법 원리\n2. 반응 조건\n3. 촉매 종류\n4. CO 전환 반응\n5. 정제 공정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'LNG 제조공정을 설명하시오.', answer: '천연가스 → 전처리(황·수분제거) → 압축·냉각 → 액화(-162℃)', prompt: '가스기사 가스설비 문제입니다.\n\n문제: LNG 제조공정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전처리 과정\n2. 압축 방식\n3. 냉각 사이클\n4. 액화 온도\n5. 저장 및 운반\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '아세틸렌 제조법(카바이드법)을 설명하시오.', answer: 'CaC2 + H2O → C2H2 + Ca(OH)2 (발열반응)', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 아세틸렌 제조법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 카바이드법 반응식\n2. 발열 제어\n3. 불순물 제거\n4. 정제 공정\n5. 안전 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'storage',
    name: '가스 저장설비',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '고압가스 저장탱크의 종류를 설명하시오.', answer: '구형 탱크, 원통형 탱크, 볼형 탱크 - 압력용기 설계 기준 적용', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 고압가스 저장탱크의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구형 탱크 특징\n2. 원통형 탱크 구조\n3. 볼형 탱크 장점\n4. 압력용기 두께 계산\n5. 안전거리 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'LNG 저장탱크의 구조와 단열방식을 설명하시오.', answer: '이중벽 구조, 내조(9% Ni강), 외조(콘크리트/탄소강), 단열재(펄라이트, 유리섬유)', prompt: '가스기사 가스설비 문제입니다.\n\n문제: LNG 저장탱크의 구조와 단열방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이중벽 구조\n2. 내조 재질\n3. 단열재 종류\n4. BOG(Boil-Off Gas) 처리\n5. 롤오버 방지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'LPG 저장탱크의 종류와 설치기준을 설명하시오.', answer: '지상탱크, 지하탱크, 반지하탱크 - 안전거리, 방호벽, 살수장치', prompt: '가스기사 가스설비 문제입니다.\n\n문제: LPG 저장탱크의 종류와 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지상/지하/반지하 탱크\n2. 안전거리 기준\n3. 방호벽 설치\n4. 살수장치\n5. 가스검지기 배치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '아세틸렌 저장 시 안전조치를 설명하시오.', answer: '다공질물 충전(활성탄), 아세톤 용해, 15kg/cm² 이하, 동합금 사용 금지', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 아세틸렌 저장 시 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다공질물 충전 이유\n2. 아세톤 용해 방식\n3. 압력 제한\n4. 동합금 금지 이유\n5. 역화 방지장치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가스 저장량 계산과 충전비를 설명하시오.', answer: '충전비 = (가스중량/용기내용적), 액화가스 충전비 제한(안전계수)', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 가스 저장량 계산과 충전비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 충전비 정의\n2. 액화가스 충전비 제한\n3. 압축가스 충전량\n4. 온도 보정\n5. 계산 예제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'supply',
    name: '가스 공급설비',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '가스 배관재료와 선정기준을 설명하시오.', answer: '강관(탄소강, 스테인리스), 동관, PE관 - 압력, 온도, 가스 종류에 따라 선정', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 가스 배관재료와 선정기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강관 종류와 특성\n2. 동관 적용 범위\n3. PE관 사용 조건\n4. 재료 선정 기준\n5. 부식 방지 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '배관의 두께 계산(최소 두께 산정)을 설명하시오.', answer: 't = PD/(2σηE) + C (P:압력, D:직경, σ:허용응력, η:용접효율, E:관두께 계수, C:부식여유)', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 배관의 두께 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최소두께 산정식\n2. 허용응력\n3. 용접효율\n4. 부식여유\n5. 계산 예제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '감압밸브(조정기)의 구조와 작동원리를 설명하시오.', answer: '고압→저압 감압, 다이어프램+스프링 방식, 1차/2차 압력 조절', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 감압밸브의 구조와 작동원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감압 원리\n2. 다이어프램 작동\n3. 1차/2차 조정기\n4. 압력 설정\n5. 고장 시 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가스미터의 종류와 특성을 설명하시오.', answer: '막식(다이어프램), 터빈식, 로터리식, 초음파식 - 유량 측정 원리', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 가스미터의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 막식 미터 구조\n2. 터빈식 미터 원리\n3. 로터리식 미터\n4. 초음파식 미터\n5. 적용 범위\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '도시가스 배관망 설계(환상식, 수지상식)를 설명하시오.', answer: '환상식: 공급 안정성 높음, 수지상식: 경제적, 압력손실 계산', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 도시가스 배관망 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환상식 배관 특징\n2. 수지상식 배관 특징\n3. 압력손실 계산\n4. 배관 구경 결정\n5. 안전성 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety-device',
    name: '안전장치',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '안전밸브의 종류와 작동원리를 설명하시오.', answer: '스프링식, 레버식, 파열판식 - 설정압력 초과 시 자동 방출', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 안전밸브의 종류와 작동원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 스프링식 안전밸브\n2. 레버식 안전밸브\n3. 파열판 특성\n4. 설정압력 기준\n5. 방출량 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '긴급차단장치의 종류와 설치기준을 설명하시오.', answer: '수동, 자동(온도감지, 지진감지, 가스누출감지), 저장탱크 입출구 설치', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 긴급차단장치의 종류와 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수동차단장치\n2. 자동차단장치 종류\n3. 설치 위치\n4. 작동 조건\n5. 유지관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '역화방지기의 구조와 작동원리를 설명하시오.', answer: '건식(플래시백 어레스터), 습식(수봉식) - 역화 시 화염 차단', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 역화방지기의 구조와 작동원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 건식 역화방지기\n2. 습식 역화방지기\n3. 화염 차단 원리\n4. 설치 위치\n5. 점검 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가스누출검지경보장치를 설명하시오.', answer: '접촉연소식, 반도체식, 열선형 - 폭발하한계 1/4 이하에서 경보', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 가스누출검지경보장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접촉연소식 원리\n2. 반도체식 원리\n3. 열선형 검지기\n4. 경보 설정 농도\n5. 설치 위치 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '압력방출장치(PRD)의 종류와 설계를 설명하시오.', answer: '안전밸브, 파열판, 용전마개 - 압력 이상 시 방출', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 압력방출장치의 종류와 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PRD 종류\n2. 설정압력 결정\n3. 방출량 계산\n4. 방출관 설계\n5. 조합 설치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'compressor-pump',
    name: '압축기 및 펌프',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      { id: 1, question: '압축기의 종류(왕복동식, 원심식, 스크류식)를 설명하시오.', answer: '왕복동: 피스톤 왕복운동, 원심: 회전날개, 스크류: 나사식 압축', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 압축기의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 왕복동식 압축기\n2. 원심식 압축기\n3. 스크류식 압축기\n4. 적용 범위\n5. 효율 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '압축일과 압축효율을 설명하시오.', answer: '이론압축일, 실제압축일, 단열효율, 체적효율', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 압축일과 압축효율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론압축일 계산\n2. 실제압축일\n3. 단열효율\n4. 체적효율\n5. 다단압축\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '액화가스 펌프의 종류와 특성을 설명하시오.', answer: '원심펌프, 왕복펌프, 잠액펌프 - 저온 대응, 캐비테이션 방지', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 액화가스 펌프의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원심펌프 구조\n2. 왕복펌프 특성\n3. 잠액펌프 장점\n4. 캐비테이션 방지\n5. 재질 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '압축기의 냉각방식을 설명하시오.', answer: '공랭식(핀), 수랭식(재킷), 중간냉각기(인터쿨러)', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 압축기의 냉각방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공랭식 냉각\n2. 수랭식 냉각\n3. 중간냉각기\n4. 후부냉각기\n5. 냉각 효과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '압축기의 용량제어 방법을 설명하시오.', answer: '흡입밸브 개폐, 회전수 제어, 언로더, 바이패스', prompt: '가스기사 가스설비 문제입니다.\n\n문제: 압축기의 용량제어 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 흡입밸브 제어\n2. 회전수 제어\n3. 언로더 방식\n4. 바이패스 방식\n5. 에너지 절감\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function GasEquipmentStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('gas-engineer-gas-equipment-progress');
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
    localStorage.setItem('gas-engineer-gas-equipment-progress', JSON.stringify(arr));
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
            <Link href="/category/safety/gas-engineer" className="text-gray-600 hover:text-red-600">가스기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">가스설비</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔥</span>
            <h1 className="text-2xl font-bold text-gray-800">가스설비 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">가스기사 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-red-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-red-500 text-white hover:bg-red-600'}`}>
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
