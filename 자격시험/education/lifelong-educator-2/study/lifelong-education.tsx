'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'philosophy',
    name: '평생교육의 철학적 기초',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '평생교육의 개념과 특성을 설명하시오.', answer: '요람에서 무덤까지, 수직적·수평적 통합교육, 자기주도학습', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 평생교육의 개념과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생교육의 정의\n2. 수직적 통합 (요람에서 무덤까지)\n3. 수평적 통합 (형식·비형식·무형식 교육)\n4. 평생교육의 필요성\n5. 한국 평생교육의 특징\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'UNESCO의 평생교육 발전 과정을 설명하시오.', answer: '랭그랑(1970) → 평생교육(1972 포레보고서) → 학습사회(1996 들로르보고서)', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: UNESCO의 평생교육 발전 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 랭그랑의 평생교육 개념 제안 (1970)\n2. 포레보고서 "존재를 위한 학습" (1972)\n3. 들로르보고서 "학습: 내재하는 보물" (1996)\n4. 학습의 4대 기둥\n5. 현대 평생학습 트렌드\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '평생교육의 철학적 기초 사상을 설명하시오.', answer: '인본주의, 진보주의, 급진주의, 행동주의', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 평생교육의 철학적 기초 사상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인본주의 철학 (매슬로우, 로저스)\n2. 진보주의 철학 (듀이)\n3. 급진주의 철학 (프레이리)\n4. 행동주의 철학 (스키너)\n5. 각 철학의 교육적 함의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '학습사회의 개념과 특징을 설명하시오.', answer: '지식기반사회, 학습조직, 학습도시, 학습공동체', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 학습사회의 개념과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습사회 개념\n2. 지식기반사회 특징\n3. 학습조직과 학습도시\n4. 평생학습도시 사례\n5. 학습사회 구현 과제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '평생학습의 4대 기둥을 설명하시오.', answer: '알기 위한 학습, 행동하기 위한 학습, 존재하기 위한 학습, 더불어 살기 위한 학습', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 평생학습의 4대 기둥을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 알기 위한 학습 (Learning to know)\n2. 행동하기 위한 학습 (Learning to do)\n3. 존재하기 위한 학습 (Learning to be)\n4. 더불어 살기 위한 학습 (Learning to live together)\n5. 4대 기둥의 통합적 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'history',
    name: '평생교육의 역사',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '한국 평생교육의 발전 과정을 설명하시오.', answer: '사회교육(1982)→평생교육(1999)→평생학습사회(2007)', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 한국 평생교육의 발전 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사회교육 시대 (1982 헌법)\n2. 평생교육법 제정 (1999)\n3. 평생교육진흥원 설립 (2008)\n4. 평생학습도시 사업\n5. 최근 평생교육 정책 동향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '외국의 평생교육 발전 사례를 설명하시오.', answer: '영국(성인교육), 독일(민중대학), 북유럽(학습서클), 미국(커뮤니티칼리지)', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 외국의 평생교육 발전 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영국의 성인교육 전통\n2. 독일의 민중대학 (Volkshochschule)\n3. 북유럽의 학습서클\n4. 미국의 커뮤니티칼리지\n5. 한국 평생교육에 주는 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '평생교육기관의 역사적 발전을 설명하시오.', answer: '도서관, 박물관, 사회교육원, 평생교육원, 평생학습관', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 평생교육기관의 역사적 발전을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전통적 평생교육기관 (도서관, 박물관)\n2. 사회교육원 시대\n3. 대학 평생교육원 확대\n4. 평생학습관 설립\n5. 온라인 평생교육 플랫폼\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '한국 문해교육의 역사를 설명하시오.', answer: '문맹퇴치운동 → 새마을교육 → 성인문해교육 → 다문화문해교육', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 한국 문해교육의 역사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 해방 이후 문맹퇴치운동\n2. 새마을운동과 성인교육\n3. 성인문해교육 지원사업\n4. 다문화가정 문해교육\n5. 디지털 문해력 교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '직업교육훈련의 발전 과정을 설명하시오.', answer: '기능사 양성 → 직업훈련 → 평생직업능력개발 → HRD', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 직업교육훈련의 발전 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기능사 양성 시대\n2. 직업훈련법 제정\n3. 평생직업능력개발법\n4. 국가직무능력표준 (NCS)\n5. K-디지털 트레이닝\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'law',
    name: '평생교육법과 제도',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '평생교육법의 목적과 기본이념을 설명하시오.', answer: '교육기회 확대, 학습권 보장, 평생학습사회 구현', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 평생교육법의 목적과 기본이념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생교육법 목적 (제1조)\n2. 기본이념 (제2조)\n3. 국가 및 지방자치단체의 임무\n4. 평생학습권 보장\n5. 평생교육진흥 기본계획\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '평생교육사 자격제도를 설명하시오.', answer: '1급/2급/3급, 자격요건, 양성기관, 직무', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 평생교육사 자격제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생교육사 등급 (1급/2급/3급)\n2. 각 급별 자격요건\n3. 평생교육사 양성기관\n4. 평생교육사의 직무\n5. 평생교육사 배치 의무기관\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '평생교육기관의 종류를 설명하시오.', answer: '학교형태, 사내대학, 원격대학, 학점은행, 평생학습관, 시민단체', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 평생교육기관의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학교형태 평생교육시설\n2. 사내대학, 원격대학\n3. 사업장 부설 평생교육시설\n4. 시민사회단체 평생교육시설\n5. 평생학습관\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '학점은행제도를 설명하시오.', answer: '학점인정, 학위취득, 평가인정, 학점인정 기준', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 학점은행제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학점은행제 목적\n2. 학점인정 방법 (평가인정, 자격, 독학사)\n3. 학위 취득 요건\n4. 학점은행제 운영기관\n5. 학점은행제 활용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '평생학습도시 제도를 설명하시오.', answer: '지정 요건, 지원 사업, 학습공동체, 지역 평생교육 활성화', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 평생학습도시 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생학습도시 개념\n2. 지정 요건 및 절차\n3. 평생학습도시 지원 사업\n4. 학습동아리, 학습공동체\n5. 평생학습축제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'theory',
    name: '평생교육 이론',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '안드라고지(성인교육학)를 설명하시오.', answer: '놀즈(Knowles), 자기주도학습, 경험중심, 문제중심', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 안드라고지(성인교육학)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안드라고지 개념 (놀즈)\n2. 페다고지와의 차이\n3. 성인학습자 특성 6가지\n4. 자기주도학습\n5. 안드라고지 교수전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '전환학습 이론을 설명하시오.', answer: '메지로우(Mezirow), 관점전환, 성찰적 사고, 의미체계', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 전환학습 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 메지로우의 전환학습 이론\n2. 의미체계와 의미관점\n3. 혼란스러운 딜레마\n4. 성찰적 사고 과정\n5. 관점전환의 단계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '자기주도학습 이론을 설명하시오.', answer: '학습자 주도성, 학습계획, 실행, 평가, 촉진자 역할', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 자기주도학습 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기주도학습 개념\n2. 자기주도학습 준비도\n3. 자기주도학습 단계 (계획-실행-평가)\n4. 촉진자의 역할\n5. 자기주도학습 촉진 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '경험학습 이론을 설명하시오.', answer: '콜브(Kolb), 구체적 경험→성찰→추상화→실험', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 경험학습 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 콜브의 경험학습 이론\n2. 경험학습 4단계 순환모형\n3. 학습양식 4가지 (수렴자, 발산자, 동화자, 조절자)\n4. 경험학습의 교육적 적용\n5. 성인교육에서의 경험 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '비판적 교육학을 설명하시오.', answer: '프레이리(Freire), 의식화, 문제제기식 교육, 대화', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 비판적 교육학을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프레이리의 비판적 교육학\n2. 의식화(conscientization)\n3. 문제제기식 교육 vs 은행저금식 교육\n4. 대화(dialogue)의 중요성\n5. 해방적 교육 실천\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'policy',
    name: '평생교육 정책과 동향',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '한국 평생교육 정책의 주요 방향을 설명하시오.', answer: '학습권 보장, 교육격차 해소, 4차산업혁명 대응, 100세시대 대비', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 한국 평생교육 정책의 주요 방향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생학습 참여율 제고\n2. 교육격차 해소 (소외계층 지원)\n3. 4차산업혁명 대응 역량 개발\n4. 100세 시대 생애주기별 교육\n5. 지역 평생학습 생태계 구축\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'K-MOOC 등 온라인 평생교육을 설명하시오.', answer: '대규모 온라인 공개강좌, 원격교육, 이러닝, 스마트러닝', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: K-MOOC 등 온라인 평생교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. K-MOOC 개념과 현황\n2. 이러닝과 블렌디드러닝\n3. 스마트러닝 특징\n4. 온라인 평생교육의 장점과 단점\n5. 디지털 격차 해소 과제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '생애주기별 평생교육을 설명하시오.', answer: '아동-청소년-성인-노인 단계별 교육 과제', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 생애주기별 평생교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아동기 평생교육 (방과후학교)\n2. 청소년기 평생교육 (진로교육)\n3. 성인기 평생교육 (직업능력개발)\n4. 노년기 평생교육 (노인대학)\n5. 생애전환기 교육지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '다문화 평생교육을 설명하시오.', answer: '다문화가정, 한국어교육, 문화적응, 사회통합', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 다문화 평생교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다문화사회와 평생교육\n2. 결혼이민자 대상 교육\n3. 한국어 및 기초문해교육\n4. 문화적응 및 사회통합 프로그램\n5. 다문화가족 자녀 교육지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '미래 평생교육의 과제와 전망을 설명하시오.', answer: 'AI시대, 초고령사회, 기후위기, 평생직업능력개발', prompt: '평생교육사 2급 평생교육론 문제입니다.\n\n문제: 미래 평생교육의 과제와 전망을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AI·디지털 시대 역량 개발\n2. 초고령사회 대비 교육\n3. 기후위기 대응 교육\n4. 평생직업능력개발 체계\n5. 학습복지 실현 과제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function LifelongEducationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('lifelong-educator-lifelong-education-progress');
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
    localStorage.setItem('lifelong-educator-lifelong-education-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-indigo-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/lifelong-educator" className="text-gray-600 hover:text-indigo-600">평생교육사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">평생교육론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl font-bold text-gray-800">평생교육론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">평생교육사 2급 필수과목 - 평생교육의 철학과 이론</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}>
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
