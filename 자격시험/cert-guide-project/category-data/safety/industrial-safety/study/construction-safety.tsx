'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'fall-prevention',
    name: '추락재해 방지',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '추락방호망의 설치 기준을 설명하시오.', answer: '높이 10m 이하마다 설치, 수평면과 20~30°, 망코 10cm 이하', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 추락방호망의 설치 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 높이 기준\n2. 설치 각도\n3. 망코 크기\n4. 내측거리\n5. 점검 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '안전대 사용 기준을 설명하시오.', answer: '높이 2m 이상 작업 시 착용, 안전대 부착설비 설치, 85kg 충격에 견딤', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 안전대 사용 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 착용 기준(2m)\n2. 안전대 종류\n3. 부착설비 기준\n4. 충격하중 기준\n5. 점검 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '개구부 방호조치를 설명하시오.', answer: '덮개(100kgf 하중), 안전난간(높이 90cm 이상), 추락방호망', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 개구부 방호조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개구부 정의\n2. 덮개 설치 기준\n3. 안전난간 설치\n4. 추락방호망\n5. 표지판 설치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '안전난간의 구조를 설명하시오.', answer: '상부난간대(90~120cm), 중간난간대, 발끝막이판(10cm 이상)', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 안전난간의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상부난간대 높이\n2. 중간난간대\n3. 발끝막이판\n4. 난간기둥 간격\n5. 강도 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '지붕작업 시 안전조치를 설명하시오.', answer: '폭 30cm 이상 발판, 경사도 34% 초과 시 추가 조치, 미끄럼방지', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 지붕작업 시 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발판 설치\n2. 경사도 기준\n3. 미끄럼방지\n4. 안전대 착용\n5. 악천후 작업중지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'scaffold',
    name: '비계 안전',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '강관비계의 구조 기준을 설명하시오.', answer: '비계기둥 간격 1.85m 이하, 띠장 간격 1.5m 이하, 벽이음 수직5m 수평5m', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 강관비계의 구조 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비계기둥 간격\n2. 띠장 간격\n3. 장선 간격\n4. 벽이음 기준\n5. 가새 설치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '달비계(달대비계)의 안전기준을 설명하시오.', answer: '작업발판 폭 40cm 이상, 와이어로프 안전계수 10, 승강설비 설치', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 달비계의 안전기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업발판 규격\n2. 와이어로프 기준\n3. 안전계수\n4. 승강설비\n5. 과부하방지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '시스템비계의 특성을 설명하시오.', answer: '표준화된 부재, 조립/해체 용이, 안전성 우수, 수직재/수평재/가새재', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 시스템비계의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구성 부재\n2. 장점\n3. 조립 순서\n4. 해체 순서\n5. 점검 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '이동식비계(롤링타워)의 안전기준을 설명하시오.', answer: '높이의 4배 이상 받침면적, 바퀴잠금, 전도방지 아웃트리거', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 이동식비계의 안전기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 받침면적 기준\n2. 바퀴잠금장치\n3. 아웃트리거\n4. 승강설비\n5. 이동 시 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '작업발판의 설치 기준을 설명하시오.', answer: '폭 40cm 이상, 발판재료 2개 이상 걸침, 틈새 3cm 이하', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 작업발판의 설치 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발판 폭 기준\n2. 발판재료 걸침\n3. 틈새 기준\n4. 고정 방법\n5. 하중 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'formwork',
    name: '거푸집 및 동바리',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '거푸집동바리의 구조검토 기준을 설명하시오.', answer: '높이 5m 이상, 콘크리트 타설높이 1일 1.5m 초과 시 구조검토', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 거푸집동바리의 구조검토 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조검토 대상\n2. 작용하중 산정\n3. 좌굴 검토\n4. 안전율\n5. 조립도 작성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '파이프서포트의 조립기준을 설명하시오.', answer: '높이 3.5m 이하, 수평연결재 2개 방향 설치, 받침철물 사용', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 파이프서포트의 조립기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 높이 제한\n2. 수평연결재 설치\n3. 받침철물\n4. 이음 방법\n5. 해체 시 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '거푸집 붕괴 원인을 분석하시오.', answer: '조기 탈형, 편심하중, 콘크리트 타설속도 과다, 동바리 부실', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 거푸집 붕괴 원인을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 조기탈형\n2. 편심하중\n3. 타설속도\n4. 동바리 문제\n5. 예방대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '콘크리트 측압 계산을 설명하시오.', answer: 'P = W × H (W: 콘크리트 단위중량, H: 타설높이)', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 콘크리트 측압 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측압 산정 공식\n2. 영향 요인\n3. 타설높이 영향\n4. 온도 영향\n5. 설계적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '거푸집 해체 시 주의사항을 설명하시오.', answer: '압축강도 확인, 해체순서 준수, 낙하물 방지, 동바리 재설치', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 거푸집 해체 시 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압축강도 기준\n2. 해체순서\n3. 낙하물 방지\n4. 동바리 재설치\n5. 안전점검\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'excavation',
    name: '굴착 및 흙막이',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      { id: 1, question: '굴착면 기울기 기준을 설명하시오.', answer: '보통흙 1:1~1:1.5, 암반 1:0.5, 연약지반 1:1.5 이상', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 굴착면 기울기 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지반별 기울기\n2. 점검 시기\n3. 붕괴 징후\n4. 보강 방법\n5. 배수 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '흙막이 지보공의 점검 사항을 설명하시오.', answer: '부재 변형, 버팀대 풀림, 침하, 용수, 지반 이완', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 흙막이 지보공의 점검 사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부재 변형\n2. 버팀대 상태\n3. 침하 계측\n4. 용수 처리\n5. 계측관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '지하매설물 굴착 시 안전조치를 설명하시오.', answer: '매설물 확인, 시험굴착, 이격거리 유지, 방호조치, 관리자 배치', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 지하매설물 굴착 시 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사전조사\n2. 시험굴착\n3. 이격거리\n4. 방호조치\n5. 관리감독\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '굴착기계 작업 시 안전수칙을 설명하시오.', answer: '유도자 배치, 접근금지구역 설정, 신호 준수, 작업반경 내 진입금지', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 굴착기계 작업 시 안전수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유도자 배치\n2. 접근금지구역\n3. 신호 방법\n4. 작업반경\n5. 장비 안전점검\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '지반 붕괴 방지대책을 설명하시오.', answer: '흙막이 설치, 배수, 기울기 확보, 점검 강화, 지반개량', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 지반 붕괴 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 흙막이 설치\n2. 배수 조치\n3. 기울기 확보\n4. 점검 강화\n5. 지반개량\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'lifting',
    name: '양중작업 안전',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '타워크레인 설치/해체 시 안전조치를 설명하시오.', answer: '작업계획서 작성, 신호수 배치, 해체순서 준수, 풍속 10m/s 이상 작업중지', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 타워크레인 설치/해체 시 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업계획서\n2. 신호수 배치\n3. 설치/해체 순서\n4. 풍속 기준\n5. 점검 사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '달기기구의 안전계수를 설명하시오.', answer: '와이어로프 6 이상, 체인 5 이상, 훅 4 이상, 섬유로프 10 이상', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 달기기구의 안전계수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 와이어로프 안전계수\n2. 체인 안전계수\n3. 훅 안전계수\n4. 섬유로프 안전계수\n5. 사용금지 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '양중작업 신호방법을 설명하시오.', answer: '수신호, 무전기, 경광등 신호, 전용 신호수 배치', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 양중작업 신호방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수신호 종류\n2. 무전기 사용\n3. 신호수 자격\n4. 신호 위치\n5. 비상 시 신호\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '곤돌라 작업 안전조치를 설명하시오.', answer: '안전대 착용, 과부하 방지, 풍속 10m/s 이상 작업중지, 정격하중 표시', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 곤돌라 작업 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전대 착용\n2. 과부하 방지\n3. 풍속 기준\n4. 정격하중 표시\n5. 정기점검 항목\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '인양하중 산정 방법을 설명하시오.', answer: '인양물 중량 + 달기기구 중량 + 여유율, 정격하중 이내 작업', prompt: '산업안전기사 건설안전기술 문제입니다.\n\n문제: 인양하중 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인양물 중량\n2. 달기기구 중량\n3. 여유율\n4. 정격하중 확인\n5. 안전작업하중\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ConstructionSafetyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('industrial-safety-construction-safety-completed');
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
    localStorage.setItem('industrial-safety-construction-safety-completed', JSON.stringify(arr));
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
            <Link href="/category/safety/industrial-safety" className="text-gray-600 hover:text-red-600">산업안전기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">건설안전기술</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏗️</span>
            <h1 className="text-2xl font-bold text-gray-800">건설안전기술 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">산업안전기사 필기시험 핵심 과목</p>
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
