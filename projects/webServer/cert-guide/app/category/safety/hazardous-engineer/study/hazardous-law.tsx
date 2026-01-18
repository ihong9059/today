'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'law-general',
    name: '위험물안전관리법 총칙',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      { id: 1, question: '위험물안전관리법의 목적과 적용 범위를 설명하시오.', answer: '목적: 위험물의 저장·취급·운반 시 안전 확보, 공공 안전 유지. 적용: 지정수량 이상의 위험물', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 위험물안전관리법의 목적과 적용 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 적용 대상\n3. 지정수량의 의미\n4. 제조소등의 정의\n5. 관계 법령\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '위험물의 정의와 분류를 설명하시오.', answer: '정의: 인화성·발화성 등의 성질을 가진 물품. 분류: 제1류~제6류(성질에 따라)', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 위험물의 정의와 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위험물 정의\n2. 제1류~제6류 분류\n3. 각 류별 성질\n4. 지정수량 개념\n5. 배수 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '지정수량과 배수 계산 방법을 설명하시오.', answer: '지정수량: 위험물별 규제량 기준. 배수 = 저장량÷지정수량. 배수 합계 1 이상이면 규제 대상', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 지정수량과 배수 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지정수량 정의\n2. 배수 계산식\n3. 혼합 저장 시 배수 합\n4. 규제 대상 기준\n5. 계산 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '제조소등의 종류를 설명하시오.', answer: '제조소, 저장소(옥내·옥외·옥내탱크·옥외탱크·지하탱크·간이탱크·이동탱크·암반탱크), 취급소(주유·판매·이송·일반)', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 제조소등의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조소\n2. 저장소 종류\n3. 취급소 종류\n4. 각 시설의 용도\n5. 허가·신고 구분\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 관련 벌칙과 과태료를 설명하시오.', answer: '무허가 제조·저장: 5년 이하 징역 또는 5천만원 이하 벌금. 안전관리자 선임 위반: 과태료', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 위험물 관련 벌칙과 과태료를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무허가 제조·저장 벌칙\n2. 안전관리 위반 벌칙\n3. 과태료 부과 대상\n4. 양벌규정\n5. 행정처분\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'facility-standards',
    name: '제조소등의 시설기준',
    color: 'from-red-500 to-pink-500',
    questions: [
      { id: 1, question: '제조소등의 위치·구조·설비 기준을 설명하시오.', answer: '안전거리, 보유공지, 표지·게시판, 소화설비, 경보설비, 피뢰침, 방유제', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 제조소등의 위치·구조·설비 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전거리\n2. 보유공지\n3. 표지·게시판\n4. 소화설비\n5. 기타 설비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '안전거리와 보유공지를 설명하시오.', answer: '안전거리: 제조소등과 보호대상물 간 이격거리. 보유공지: 제조소등 주위의 공지(3m 이상)', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 안전거리와 보유공지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전거리 정의\n2. 보호대상물\n3. 거리 기준\n4. 보유공지 정의\n5. 보유공지 폭\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '옥내저장소의 시설기준을 설명하시오.', answer: '벽·기둥·보·바닥: 내화구조. 창·출입구: 방화문. 환기·채광·배출설비. 위험물 품명별 구분 저장', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 옥내저장소의 시설기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 건축물 구조\n2. 창·출입구\n3. 환기설비\n4. 조명·채광\n5. 저장 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '옥외탱크저장소의 시설기준을 설명하시o.', answer: '탱크: 두께 기준, 방유제(탱크 용량의 110% 이상), 통기관, 계량구, 주입구, 안전장치', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 옥외탱크저장소의 시설기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탱크 두께 기준\n2. 방유제 용량\n3. 통기관\n4. 계량구·주입구\n5. 안전장치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '주유취급소의 시설기준을 설명하시오.', answer: '고정주유설비, 전용탱크(지하 또는 간이탱크), 보호시설, 고정급유설비, 방화·방폭 전기설비', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 주유취급소의 시설기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정주유설비\n2. 전용탱크\n3. 보호시설\n4. 방화·방폭 전기\n5. 표지·게시판\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety-management',
    name: '안전관리',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '위험물안전관리자의 선임과 직무를 설명하시o.', answer: '선임: 제조소등마다 선임(14일 이내). 자격: 위험물기능장·기사·산업기사·기능사. 직무: 시설 점검·감독, 안전교육', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 위험물안전관리자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 대상\n2. 선임 기한\n3. 자격 요건\n4. 직무 내용\n5. 해임·변경 신고\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '예방규정의 작성과 내용을 설명하시오.', answer: '작성대상: 지정수량 배수 일정 이상. 내용: 안전관리 조직, 점검·정비, 교육·훈련, 재해 시 응급조치', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 예방규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작성 대상\n2. 작성 시기\n3. 포함 내용\n4. 인가·변경\n5. 준수 의무\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '정기점검과 정기검사를 설명하시오.', answer: '정기점검: 안전관리자가 실시(1년 1회 이상). 정기검사: 탱크안전성능검사(5년마다), 지하탱크 누설검사(3년마다)', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 정기점검과 정기검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기점검 주기\n2. 점검 내용\n3. 정기검사 종류\n4. 검사 주기\n5. 기록 보존\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '위험물 운반 기준을 설명하시오.', answer: '운반용기: 규격품 사용, 내압·기밀 시험. 수납률: 98% 이하(액체 95% 이하). 혼재 금지, 표지 부착', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 위험물 운반 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 운반용기 기준\n2. 수납률\n3. 혼재 금지\n4. 표지·주의사항\n5. 운반 중 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '이동탱크저장소의 운반 기준을 설명하시오.', answer: '위험물운송자 동승, 위험물안전카드 휴대, 이동탱크 표지, 소화기 비치, 정전기 제거', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 이동탱크저장소의 운반 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위험물운송자\n2. 안전카드\n3. 표지 부착\n4. 소화기 비치\n5. 정전기 제거\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'fire-equipment',
    name: '소화설비',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '제조소등에 설치하는 소화설비의 종류를 설명하시오.', answer: '소화기, 옥내소화전, 옥외소화전, 스프링클러, 물분무, 포, 이산화탄소, 할론, 분말', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 제조소등의 소화설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소화기 설치 기준\n2. 옥내·옥외 소화전\n3. 스프링클러설비\n4. 특수 소화설비\n5. 위험물별 적응 소화설비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '제조소의 소화설비 설치 기준을 설명하시오.', answer: '소화기: 능력단위 합계 산정. 옥내소화전: 연면적 기준. 옥외소화전: 바닥면적 기준. 자동소화설비', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 제조소의 소화설비 설치 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소화기 능력단위\n2. 옥내소화전 기준\n3. 옥외소화전 기준\n4. 자동소화설비\n5. 대형소화기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '옥내저장소의 소화설비 설치 기준을 설명하시오.', answer: '소화기, 옥내소화전(700㎡ 이상), 스프링클러(1,000㎡ 이상), 자동화재탐지설비', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 옥내저장소의 소화설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소화기 설치\n2. 옥내소화전 설치 조건\n3. 스프링클러 설치 조건\n4. 자동화재탐지설비\n5. 비상경보설비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '옥외탱크저장소의 소화설비를 설명하시오.', answer: '포소화설비(고정포·이동포), 옥외소화전, 냉각살수장치, 소화기, 대형소화기', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 옥외탱크저장소의 소화설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 포소화설비\n2. 고정포 방출구\n3. 이동포 방출구\n4. 냉각살수장치\n5. 옥외소화전\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '소화설비의 점검과 유지관리를 설명하시오.', answer: '정기점검: 1년 1회 이상. 작동점검: 수시. 기록 보존: 3년. 정비·개선 즉시 실시', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 소화설비의 점검·유지관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기점검\n2. 작동점검\n3. 점검 기록\n4. 정비·보수\n5. 성능 유지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'license-inspection',
    name: '허가·신고·검사',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '제조소등의 설치 허가와 완공검사를 설명하시오.', answer: '허가: 시·도지사. 완공검사: 설치 완료 후, 검사 합격 후 사용. 변경허가: 위치·구조·설비 변경 시', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 제조소등의 설치 허가와 완공검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 허가 절차\n2. 허가권자\n3. 완공검사\n4. 변경허가 대상\n5. 경미한 변경\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '탱크안전성능검사를 설명하시오.', answer: '대상: 옥외탱크·옥내탱크·지하탱크. 검사: 기초·지반 침하, 탱크 변형·부식, 누설. 주기: 5년마다', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 탱크안전성능검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검사 대상 탱크\n2. 검사 내용\n3. 검사 주기\n4. 검사기관\n5. 검사 합격 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '지하탱크 누설검사를 설명하시오.', answer: '대상: 지하탱크·이중벽탱크. 검사: 누설 여부. 주기: 3년마다(설치 후 5년 이내 최초 검사)', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 지하탱크 누설검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검사 대상\n2. 검사 방법\n3. 검사 주기\n4. 최초 검사 시기\n5. 검사 기록\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '제조소등의 사용정지와 폐쇄 명령을 설명하시오.', answer: '사유: 무허가 설치, 위반사항 미개선, 화재 위험. 명령: 시·도지사. 효과: 사용 금지', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 제조소등의 사용정지와 폐쇄 명령을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사용정지 사유\n2. 폐쇄 명령 사유\n3. 명령권자\n4. 개선 명령\n5. 이의신청\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '제조소등의 용도폐지와 양도·양수를 설명하시오.', answer: '용도폐지: 신고(15일 이내), 허가 취소. 양도·양수: 지위 승계 신고, 안전관리자 재선임', prompt: '위험물기사 위험물안전관리법 문제입니다.\n\n문제: 제조소등의 용도폐지와 양도·양수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용도폐지 신고\n2. 잔존 위험물 처리\n3. 양도·양수 신고\n4. 지위 승계\n5. 안전관리자 선임\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function HazardousLawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-engineer-hazardous-law-progress');
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
    localStorage.setItem('hazardous-engineer-hazardous-law-progress', JSON.stringify(arr));
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
            <span className="text-red-600 font-medium">위험물안전관리법</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📋</span>
            <h1 className="text-2xl font-bold text-gray-800">위험물안전관리법 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">위험물기사 필기시험 법규 과목</p>
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
