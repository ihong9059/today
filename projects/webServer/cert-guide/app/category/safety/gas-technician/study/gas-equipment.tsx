'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'high-pressure-gas',
    name: '고압가스 설비',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '고압가스의 정의를 설명하시오.', answer: '상용압력 1MPa(10kgf/cm²) 이상 압축가스, 또는 상용압력 0.2MPa 이상 액화가스', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 고압가스의 정의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압축가스 기준\n2. 액화가스 기준\n3. 상용압력 개념\n4. 고압가스 종류\n5. 법적 규제 대상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '압축기의 종류와 특징을 설명하시오.', answer: '왕복식(고압·소량), 원심식(저압·대량), 회전식(중압·중량)', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 압축기의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 왕복식 압축기\n2. 원심식 압축기\n3. 회전식 압축기\n4. 압력·용량별 선정\n5. 냉각 방식\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '압력용기의 안전장치를 설명하시오.', answer: '안전밸브, 파열판, 압력계, 온도계, 액면계', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 압력용기의 안전장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전밸브 종류와 설정압력\n2. 파열판 특성\n3. 압력계 설치 위치\n4. 온도계 필요성\n5. 액면계 종류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가스 저장탱크의 종류를 설명하시오.', answer: '구형탱크(고압), 원통형탱크(중압), 저온저장탱크(LNG)', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 가스 저장탱크의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구형탱크 특징\n2. 원통형탱크 특징\n3. 저온저장탱크 특징\n4. 압력별 선정 기준\n5. 재료 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '기화기(Vaporizer)의 원리와 종류를 설명하시오.', answer: '액체 → 기체 변환 장치, 온수식·증기식·전기식·공기식', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 기화기의 원리와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기화 원리\n2. 온수식 기화기\n3. 증기식 기화기\n4. 전기식 기화기\n5. 용량 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'lpg-equipment',
    name: 'LPG 설비',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: 'LPG의 성분과 특성을 설명하시오.', answer: '프로판(C₃H₈)·부탄(C₄H₁₀) 혼합, 상온에서 압력으로 액화, 비중 1.5~2.0', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: LPG의 성분과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프로판·부탄 특성\n2. 액화 조건\n3. 증기압 특성\n4. 비중과 거동\n5. 발열량\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'LPG 충전소 설비를 설명하시오.', answer: '저장탱크, 펌프, 충전기, 기화기, 압축기, 계량기', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: LPG 충전소 설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저장탱크 용량 기준\n2. 충전펌프 종류\n3. 충전기 구조\n4. 안전거리 기준\n5. 소화설비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'LPG 용기의 종류와 검사를 설명하시오.', answer: '가정용(50kg 이하), 산업용, 자동차용 / 제조검사·재검사(5년)·중간검사', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: LPG 용기의 종류와 검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용기 종류별 특징\n2. 제조검사 항목\n3. 재검사 주기와 방법\n4. 중간검사 조건\n5. 폐기 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '압력조정기(레귤레이터)의 원리를 설명하시오.', answer: '고압 → 저압 감압, 다이어프램 방식, 1단·2단 조정', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 압력조정기의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감압 원리\n2. 다이어프램 구조\n3. 1단 조정기\n4. 2단 조정기\n5. 설정압력 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'LPG 배관 설계 시 고려사항을 설명하시오.', answer: '압력강하, 유량, 배관길이, 관경 선정, 경사 설치', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: LPG 배관 설계 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압력강하 계산\n2. 유량 산정\n3. 관경 선정 기준\n4. 경사 및 배수\n5. 재료 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'city-gas',
    name: '도시가스 설비',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: 'LNG(액화천연가스)의 특성을 설명하시오.', answer: '메탄(CH₄) 주성분, -162℃ 액화, 비중 0.6, 무색·무취', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: LNG의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성분과 순도\n2. 액화온도와 압력\n3. 비중과 거동\n4. 부취제 첨가\n5. 환경 장점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '도시가스 공급 시스템을 설명하시오.', answer: 'LNG기지 → 고압배관(1MPa) → 정압기 → 중압배관(0.1~1MPa) → 정압기 → 저압배관(2.5kPa) → 수요자', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 도시가스 공급 시스템을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. LNG 수입 및 저장\n2. 고압배관망\n3. 정압기 역할\n4. 중·저압 배관망\n5. 공급압력 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '정압기(Governor)의 구조와 기능을 설명하시오.', answer: '압력 자동조정, 안전차단기능, 여과기·조압부·차단부 구성', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 정압기의 구조와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압력조정 원리\n2. 여과기 기능\n3. 조압부 구조\n4. 안전차단장치\n5. 모니터 정압기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '도시가스 배관의 매설 기준을 설명하시오.', answer: '고압: 1.2m 이상, 중압: 1.0m 이상, 저압: 0.6m 이상 / 표시테이프·경고판 설치', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 도시가스 배관의 매설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압력별 매설깊이\n2. 배관 재료 기준\n3. 표시테이프 설치\n4. 경고판 설치\n5. 타 매설물과 이격거리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가스미터(계량기)의 종류를 설명하시오.', answer: '막식(다이어프램), 터빈식, 로터리식, 초음파식', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 가스미터의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 막식 미터 원리\n2. 터빈식 미터 원리\n3. 로터리식 미터 원리\n4. 초음파식 미터 원리\n5. 용량별 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'valve-fittings',
    name: '밸브 및 부속품',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '밸브의 종류와 용도를 설명하시오.', answer: '게이트밸브(개폐), 글로브밸브(유량조절), 체크밸브(역류방지), 볼밸브(급속개폐)', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 밸브의 종류와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 게이트밸브 특징\n2. 글로브밸브 특징\n3. 체크밸브 종류\n4. 볼밸브 장점\n5. 나비밸브 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '긴급차단밸브의 종류와 작동원리를 설명하시오.', answer: '수동식, 자동식(온도·압력·가스검지), 원격조작식', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 긴급차단밸브의 종류와 작동원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수동 긴급차단밸브\n2. 온도감지식 자동차단\n3. 압력감지식 자동차단\n4. 가스검지 연동\n5. 원격조작 시스템\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '안전밸브의 종류와 설정압력을 설명하시오.', answer: '스프링식(일반용), 파일럿식(대용량) / 설정압력: 최고사용압력 이하', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 안전밸브의 종류와 설정압력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 스프링식 안전밸브\n2. 파일럿식 안전밸브\n3. 설정압력 기준\n4. 분출압력과 재착좌압력\n5. 용량 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가스 배관 부속품의 종류를 설명하시오.', answer: '엘보(방향전환), 티(분기), 레듀서(관경변경), 플랜지(접합), 유니온(분해접합)', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 가스 배관 부속품의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 엘보(45°, 90°)\n2. 티와 크로스\n3. 레듀서\n4. 플랜지 종류\n5. 유니온과 소켓\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가스 필터(여과기)의 종류와 기능을 설명하시오.', answer: 'Y형, T형, 바스켓형 / 이물질·수분 제거, 압력강하 최소화', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 가스 필터의 종류와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Y형 필터 특징\n2. T형 필터 특징\n3. 바스켓형 필터 특징\n4. 여과 메시 선정\n5. 청소 및 교체 주기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'piping-materials',
    name: '배관 재료 및 시공',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      { id: 1, question: '가스 배관 재료의 종류를 설명하시오.', answer: '강관(고압·중압), PE관(저압), 동관(소형), 스테인리스관(부식성)', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 가스 배관 재료의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강관(탄소강, 합금강)\n2. PE관(폴리에틸렌)\n3. 동관\n4. 스테인리스관\n5. 압력별 재료 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '배관 접합 방법을 설명하시오.', answer: '용접(맞대기·필렛), 플랜지(볼트), 나사(작은관경), 압착(PE관)', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 배관 접합 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용접 접합 (맞대기, 필렛)\n2. 플랜지 접합\n3. 나사 접합\n4. PE관 융착\n5. 압착 접합\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '배관 시공 시 주의사항을 설명하시오.', answer: '경사(배수), 신축이음, 방식(부식방지), 지지대, 표시', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 배관 시공 시 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경사 및 배수\n2. 신축이음 설치\n3. 방식(도장·피복)\n4. 지지대 간격\n5. 배관 표시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '배관 비파괴 시험 방법을 설명하시오.', answer: '방사선투과시험(RT), 초음파탐상시험(UT), 자분탐상시험(MT), 침투탐상시험(PT)', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 배관 비파괴 시험 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방사선투과시험(RT)\n2. 초음파탐상시험(UT)\n3. 자분탐상시험(MT)\n4. 침투탐상시험(PT)\n5. 적용 대상별 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '배관 기밀시험(누설시험) 방법을 설명하시오.', answer: '공기·질소 가압 → 비눗물·검지액 도포 → 압력강하 측정', prompt: '가스산업기사 가스설비 문제입니다.\n\n문제: 배관 기밀시험 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시험 매체 (공기, 질소)\n2. 시험 압력 기준\n3. 시험 시간\n4. 누설 검사 방법\n5. 합격 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function GasEquipmentStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('gas-technician-gas-equipment-progress');
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
    localStorage.setItem('gas-technician-gas-equipment-progress', JSON.stringify(arr));
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
            <Link href="/category/safety/gas-technician" className="text-gray-600 hover:text-red-600">가스산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">가스설비</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚙️</span>
            <h1 className="text-2xl font-bold text-gray-800">가스설비 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">가스산업기사 필기시험 핵심 과목</p>
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
