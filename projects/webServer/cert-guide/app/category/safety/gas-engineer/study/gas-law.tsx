'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'high-pressure-gas-law',
    name: '고압가스 안전관리법',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '고압가스의 정의와 적용범위를 설명하시오.', answer: '상용압력 1MPa 이상 압축가스, 상용온도 35℃에서 0.2MPa 이상 액화가스', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 고압가스의 정의와 적용범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압축가스 기준\n2. 액화가스 기준\n3. 용해가스 기준\n4. 적용 제외 대상\n5. 법령 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '고압가스 제조허가 및 신고를 설명하시오.', answer: '제조허가: 일정규모 이상, 신고: 소규모, 기술기준 적합', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 고압가스 제조허가 및 신고를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허가 대상 규모\n2. 신고 대상\n3. 제출 서류\n4. 기술기준\n5. 검사 절차\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '고압가스 저장소의 기준을 설명하시오.', answer: '안전거리, 보유공지, 방호벽, 표지 설치', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 고압가스 저장소의 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전거리 기준\n2. 보유공지\n3. 방호벽 규격\n4. 표지 설치\n5. 소화설비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '고압가스 용기검사 제도를 설명하시오.', answer: '제조검사, 재검사(5년), 내압·기밀시험, 각인', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 고압가스 용기검사 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조검사 항목\n2. 재검사 주기\n3. 시험 종류\n4. 각인 내용\n5. 폐기 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '고압가스 운반기준을 설명하시오.', answer: '용기 고정, 통풍·환기, 화기 금지, 운반책임자 동승', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 고압가스 운반기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용기 적재 방법\n2. 통풍·환기 기준\n3. 화기 금지 조치\n4. 운반책임자 자격\n5. 사고 시 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'lpg-law',
    name: '액화석유가스법',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: 'LPG의 정의와 종류를 설명하시오.', answer: '프로판(C3), 부탄(C4) 주성분, 상온에서 가압 액화', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: LPG의 정의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. LPG 정의\n2. 프로판 특성\n3. 부탄 특성\n4. 혼합 비율\n5. 용도별 분류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'LPG 충전사업 허가기준을 설명하시오.', answer: '충전시설 기준, 저장능력, 안전거리, 기술인력', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: LPG 충전사업 허가기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 충전시설 기준\n2. 저장능력 요건\n3. 안전거리\n4. 기술인력 배치\n5. 안전관리자 선임\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'LPG 판매사업 신고기준을 설명하시오.', answer: '저장탱크 용량, 배관 기준, 안전설비, 표지 설치', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: LPG 판매사업 신고기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저장탱크 기준\n2. 배관 설치 기준\n3. 안전설비 종류\n4. 표지 설치\n5. 정기검사\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'LPG 용기 색상 및 표시를 설명하시오.', answer: '회색(프로판), 밝은 황색(부탄), 충전증명서, 경고 표시', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: LPG 용기 색상 및 표시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가스별 용기 색상\n2. 충전증명서 내용\n3. 경고 표시\n4. 검사 표시\n5. 재검사 기한\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'LPG 집단공급사업을 설명하시오.', answer: '공동주택 등 집단 공급, 허가제, 배관망 설치, 안전관리', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: LPG 집단공급사업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단공급 정의\n2. 허가 요건\n3. 배관망 기준\n4. 안전관리자\n5. 정기검사\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'city-gas-law',
    name: '도시가스사업법',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '도시가스의 정의와 종류를 설명하시오.', answer: 'LNG(액화천연가스), LPG 혼합, 배관망으로 공급', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 도시가스의 정의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도시가스 정의\n2. LNG 특성\n3. LPG 혼합 기준\n4. 열량 기준\n5. 공급 방식\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '도시가스 사업 종류(일반, 도매, 충전)를 설명하시오.', answer: '일반: 최종 소비자 공급, 도매: 일반도시가스사업자 공급, 충전: LNG 차량 충전', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 도시가스 사업 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일반도시가스사업\n2. 도매도시가스사업\n3. LNG 충전사업\n4. 허가 절차\n5. 요금 규제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '도시가스 배관 안전관리 기준을 설명하시오.', answer: '매설깊이, 표시테이프, 손상방지, 부식방지', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 도시가스 배관 안전관리 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매설 깊이 기준\n2. 표시테이프 설치\n3. 손상 방지 조치\n4. 부식 방지\n5. 근접 공사 협의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '도시가스 사용시설 검사를 설명하시오.', answer: '시공검사, 정기검사(3년), 수시검사, 기밀·연소시험', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 도시가스 사용시설 검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시공검사 항목\n2. 정기검사 주기\n3. 수시검사 대상\n4. 기밀시험 기준\n5. 연소시험 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '도시가스 안전관리자 선임을 설명하시오.', answer: '제조·공급시설: 가스기사 이상, 사용시설: 사업장별 기준', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 도시가스 안전관리자 선임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 대상\n2. 자격 요건\n3. 선임 신고\n4. 직무 범위\n5. 교육 이수\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'technical-standards',
    name: '가스 기술기준',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '압력용기 설계 기준을 설명하시오.', answer: '최고사용압력, 허용응력, 용접효율, 부식여유', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 압력용기 설계 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최고사용압력 결정\n2. 허용응력\n3. 용접효율\n4. 부식여유\n5. 두께 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '배관 설계 기준을 설명하시오.', answer: '압력, 온도, 재료, 용접·플랜지, 지지', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 배관 설계 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압력·온도 기준\n2. 재료 선정\n3. 용접 기준\n4. 플랜지 규격\n5. 지지 간격\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '안전밸브 설치기준을 설명하시오.', answer: '설정압력, 방출량, 설치위치, 방출관', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 안전밸브 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설정압력 기준\n2. 방출량 계산\n3. 설치 위치\n4. 방출관 구경\n5. 시험 주기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가스검지경보장치 설치기준을 설명하시오.', answer: '경보농도(LEL 1/4), 설치위치(비중 고려), 경보 발신', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 가스검지경보장치 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경보 농도 설정\n2. 설치 위치(비중)\n3. 경보 발신\n4. 긴급차단 연동\n5. 점검 주기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '긴급차단장치 설치기준을 설명하시오.', answer: '저장탱크 입출구, 온도·지진감지, 수동조작', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 긴급차단장치 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 위치\n2. 자동차단 조건\n3. 수동조작 방법\n4. 작동 시험\n5. 유지관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'penalties',
    name: '벌칙 및 과태료',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      { id: 1, question: '무허가 가스제조 등의 벌칙을 설명하시오.', answer: '5년 이하 징역 또는 5천만원 이하 벌금', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 무허가 가스제조 등의 벌칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무허가 제조\n2. 무허가 판매\n3. 무신고 변경\n4. 양벌규정\n5. 행정처분\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '안전관리자 미선임의 벌칙을 설명하시오.', answer: '1년 이하 징역 또는 1천만원 이하 벌금', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 안전관리자 미선임의 벌칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 의무 대상\n2. 미선임 시 벌칙\n3. 해임 후 미선임\n4. 겸직 제한 위반\n5. 시정명령\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '검사 미이행 시 과태료를 설명하시오.', answer: '정기검사 미이행: 500만원 이하, 시설검사 미이행: 300만원 이하', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 검사 미이행 시 과태료를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기검사 미이행\n2. 시설검사 미이행\n3. 용기검사 미이행\n4. 과태료 부과 기준\n5. 이의신청\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '교육 미이수의 과태료를 설명하시오.', answer: '안전관리자 교육 미이수: 200만원 이하', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 교육 미이수의 과태료를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전관리자 교육\n2. 판매종사자 교육\n3. 운반책임자 교육\n4. 교육 주기\n5. 과태료 금액\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '사고 미보고의 벌칙을 설명하시오.', answer: '300만원 이하 벌금 또는 과태료', prompt: '가스기사 가스관계법규 문제입니다.\n\n문제: 사고 미보고의 벌칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사고 보고 의무\n2. 보고 시한\n3. 보고 내용\n4. 미보고 시 벌칙\n5. 허위보고 처벌\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function GasLawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('gas-engineer-gas-law-progress');
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
    localStorage.setItem('gas-engineer-gas-law-progress', JSON.stringify(arr));
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
            <span className="text-red-600 font-medium">가스관계법규</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔥</span>
            <h1 className="text-2xl font-bold text-gray-800">가스관계법규 학습하기</h1>
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
