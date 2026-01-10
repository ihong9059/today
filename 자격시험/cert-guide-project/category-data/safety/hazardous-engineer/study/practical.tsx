'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'storage-handling',
    name: '위험물 저장·취급 실무',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '제4류 위험물(가솔린) 저장 탱크의 주입 작업 시 안전조치를 설명하시오.', answer: '접지, 유속 제한(1m/s 이하), 환기, 화기엄금, 정전기 방지복 착용, 주입관 하부 삽입, 증기 농도 측정', prompt: '위험물기사 실기 문제입니다.\n\n문제: 제4류 위험물 주입 작업 시 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접지 방법\n2. 유속 제한 이유\n3. 정전기 방지\n4. 화기 관리\n5. 증기 농도 관리\n6. 주입관 삽입 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '옥외탱크저장소에서 위험물 누출 시 응급조치를 설명하시오.', answer: '1. 비상연락(119, 관계기관), 2. 누출 차단(밸브 폐쇄), 3. 방유제 내 유입 확인, 4. 흡착포·모래 살포, 5. 화기 엄금, 6. 증기 확산 방지(물분무), 7. 회수·처리', prompt: '위험물기사 실기 문제입니다.\n\n문제: 위험물 누출 시 응급조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비상연락 체계\n2. 누출 차단 방법\n3. 유출 확산 방지\n4. 회수 방법\n5. 화기 관리\n6. 인명 안전\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '위험물 혼재 저장 시 주의사항을 설명하시오.', answer: '1. 류별 구분 저장 원칙, 2. 혼촉 금지물질 격리(산화성·환원성), 3. 제4류는 품명별 구분, 4. 표지 부착, 5. 통로 확보, 6. 온도·습도 관리', prompt: '위험물기사 실기 문제입니다.\n\n문제: 위험물 혼재 저장 시 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 류별 구분 저장\n2. 혼촉 위험물질\n3. 격리 거리\n4. 표지·게시\n5. 통로 확보\n6. 환경 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'facility-inspection',
    name: '제조소등 시설 점검',
    color: 'from-red-500 to-pink-500',
    questions: [
      { id: 1, question: '옥외탱크저장소의 정기점검 항목과 방법을 설명하시오.', answer: '점검항목: 1. 탱크 변형·부식, 2. 배관 누설, 3. 밸브 작동, 4. 방유제 균열, 5. 통기관 막힘, 6. 계량장치, 7. 접지. 방법: 육안점검, 작동시험, 누설시험', prompt: '위험물기사 실기 문제입니다.\n\n문제: 옥외탱크저장소의 정기점검을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탱크 본체 점검\n2. 배관·밸브 점검\n3. 방유제 점검\n4. 통기관·계량장치\n5. 접지 측정\n6. 점검 기록\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '지하탱크의 누설검사 방법을 설명하시오.', answer: '1. 압력검사: 탱크 내 가압, 압력 유지 확인. 2. 진공검사: 탱크 내 감압, 진공도 유지. 3. 삼중관 검사: 관찰관 내 액체 확인. 4. 압력선 검사: 압력선 내 압력 변화. 기록: 검사 결과 3년 보존', prompt: '위험물기사 실기 문제입니다.\n\n문제: 지하탱크 누설검사 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압력검사법\n2. 진공검사법\n3. 삼중관 검사\n4. 검사 주기\n5. 합격 기준\n6. 기록 보존\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '방유제의 용량 산정과 점검 방법을 설명하시o.', answer: '용량: 최대탱크 용량의 110% 이상(2개 이상 시 최대탱크 용량 + 나머지 탱크 용량의 10%). 점검: 균열·침하, 배수밸브, 유분리장치, 펌프실', prompt: '위험물기사 실기 문제입니다.\n\n문제: 방유제의 용량 산정과 점검을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방유제 용량 산정식\n2. 단일 탱크 시\n3. 복수 탱크 시\n4. 구조 점검 항목\n5. 배수 관리\n6. 보수·개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'fire-equipment-calc',
    name: '소화설비 계산',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '제조소의 소화기 능력단위 계산 방법을 설명하시오.', answer: '능력단위 = 연면적(㎡) ÷ 100 (최소 10단위). 예: 연면적 350㎡ → 350÷100=3.5 → 10단위. 제4류: 바닥면적 ÷ 50. 소형: 1단위, 대형: 5단위', prompt: '위험물기사 실기 문제입니다.\n\n문제: 제조소의 소화기 능력단위를 계산하시오.\n\n다음 순서로 설명해주세요:\n1. 능력단위 산정식\n2. 최소 단위\n3. 제4류 특례\n4. 소형·대형 소화기\n5. 계산 예시\n6. 적응 소화기 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '옥외탱크저장소의 포소화설비 방출량 계산을 설명하시오.', answer: '고정포: 방출량(L/min) = 액표면적(㎡) × 방출률(L/min·㎡). 방출률: 제4류 1석유류 4L/min·㎡, 2석유류 2L/min·㎡. 방출시간: 30분 이상. 약제량 = 방출량 × 30 × 혼합비', prompt: '위험물기사 실기 문제입니다.\n\n문제: 포소화설비 방출량을 계산하시o.\n\n다음 순서로 설명해주세요:\n1. 액표면적 계산\n2. 방출률 기준\n3. 방출량 산정\n4. 방출시간\n5. 약제량 계산\n6. 혼합비 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '옥내소화전의 수원 용량 계산을 설명하시오.', answer: '수원 용량 = 2.6㎥ × 동시사용 개수 (최소 2개). 예: 소화전 5개 → 동시사용 2개 → 2.6 × 2 = 5.2㎥. 방수압력: 0.17MPa 이상, 방수량: 130L/min', prompt: '위험물기사 실기 문제입니다.\n\n문제: 옥내소화전의 수원 용량을 계산하시오.\n\n다음 순서로 설명해주세요:\n1. 수원 용량 산정식\n2. 동시사용 개수\n3. 최소 용량\n4. 방수압력 기준\n5. 방수량 기준\n6. 계산 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'emergency-response',
    name: '화재 및 비상 대응',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      { id: 1, question: '제4류 위험물 탱크 화재 시 소화 방법을 설명하시오.', answer: '1. 119 신고, 2. 주변 탱크 냉각살수, 3. 포소화(고정포 또는 이동포), 4. 화원 차단(밸브 폐쇄), 5. 물 직접 주수 금지(비등 폭발), 6. 재발화 감시', prompt: '위험물기사 실기 문제입니다.\n\n문제: 제4류 위험물 탱크 화재 시 소화 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초기 대응\n2. 포소화 방법\n3. 냉각살수\n4. 물 직접 주수 금지 이유\n5. 화원 차단\n6. 재발화 방지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '금속화재(마그네슘) 발생 시 대응 방법을 설명하시오.', answer: '1. 물 사용 금지(수소 발생·폭발), 2. 건조사·팽창질석 살포(질식), 3. 화원과 가연물 격리, 4. 고온 주의(2500℃), 5. 완전 소화 확인(재발화)', prompt: '위험물기사 실기 문제입니다.\n\n문제: 금속화재 발생 시 대응 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물 사용 금지 이유\n2. 적절한 소화약제\n3. 질식소화 방법\n4. 고온 화재 주의\n5. 재발화 방지\n6. 안전장비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '위험물 화재 시 인명 안전 조치를 설명하시오.', answer: '1. 즉시 대피(위험구역 설정), 2. 유독가스 흡입 방지(방독면), 3. 화상 방지(방화복), 4. 폭발 대비(엄폐), 5. 2차 피해 방지(전원 차단), 6. 응급처치', prompt: '위험물기사 실기 문제입니다.\n\n문제: 위험물 화재 시 인명 안전 조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대피 및 위험구역\n2. 개인보호장비\n3. 유독가스 대응\n4. 폭발 대비\n5. 2차 피해 방지\n6. 응급처치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'law-application',
    name: '법령 적용 실무',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '제조소의 안전거리와 보유공지를 계산하시오. (예: 제4류 위험물 제조소)', answer: '안전거리: 주거용 건축물 10m 이상, 학교·병원 30m 이상, 고압가스·LPG시설 20m 이상. 보유공지: 3m 이상(지정수량 10배 이하), 5m 이상(10배 초과)', prompt: '위험물기사 실기 문제입니다.\n\n문제: 제조소의 안전거리와 보유공지를 계산하시오.\n\n다음 순서로 설명해주세요:\n1. 안전거리 정의\n2. 보호대상물별 거리\n3. 보유공지 정의\n4. 지정수량 배수별 폭\n5. 축소·면제 조건\n6. 계산 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '위험물 혼합 저장 시 지정수량 배수를 계산하시오. (예: 가솔린 100L, 경유 500L, 등유 300L)', answer: '가솔린(200L) 배수: 100÷200=0.5. 경유(1000L) 배수: 500÷1000=0.5. 등유(1000L) 배수: 300÷1000=0.3. 합계: 0.5+0.5+0.3=1.3 → 규제 대상', prompt: '위험물기사 실기 문제입니다.\n\n문제: 위험물 혼합 저장 시 지정수량 배수를 계산하시오.\n\n다음 순서로 설명해주세요:\n1. 각 위험물의 지정수량\n2. 배수 계산식\n3. 배수 합계\n4. 규제 대상 판정\n5. 허가 필요 여부\n6. 계산 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '예방규정의 작성 대상과 포함 내용을 설명하시오.', answer: '대상: 지정수량 10배 이상(제조소), 100배 이상(주유취급소), 150배 이상(일반취급소). 내용: 1. 안전관리 조직, 2. 점검·정비, 3. 교육·훈련, 4. 재해 시 응급조치, 5. 작업 기준', prompt: '위험물기사 실기 문제입니다.\n\n문제: 예방규정의 작성 대상과 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작성 대상 시설\n2. 지정수량 배수 기준\n3. 필수 포함 내용\n4. 작성·인가 절차\n5. 변경 시 조치\n6. 준수 의무\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-engineer-practical-progress');
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
    localStorage.setItem('hazardous-engineer-practical-progress', JSON.stringify(arr));
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
            <span className="text-red-600 font-medium">실기 (위험물취급실무)</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🧯</span>
            <h1 className="text-2xl font-bold text-gray-800">실기 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">위험물기사 실기시험 - 위험물취급실무 (필답형)</p>
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
