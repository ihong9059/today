'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'cognitive',
    name: '인지발달',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '피아제의 인지발달 이론을 설명하시오.', answer: '감각운동기→전조작기→구체적 조작기→형식적 조작기', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 피아제의 인지발달 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인지발달의 4단계\n2. 전조작기 유아의 특징 (자기중심성, 물활론, 중심화)\n3. 도식, 동화, 조절, 평형화\n4. 보존개념의 발달\n5. 유아교육에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '비고츠키의 사회문화적 이론을 설명하시오.', answer: '근접발달영역, 비계설정, 언어와 사고', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 비고츠키의 사회문화적 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근접발달영역 (ZPD)\n2. 비계설정 (Scaffolding)\n3. 사회적 상호작용의 중요성\n4. 언어와 사고의 관계\n5. 유아교육에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '정보처리 이론을 설명하시오.', answer: '주의, 기억, 초인지, 처리속도', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 정보처리 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정보처리 과정 (입력-처리-출력)\n2. 주의집중력의 발달\n3. 기억의 발달 (단기·장기기억)\n4. 초인지의 발달\n5. 유아의 정보처리 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '언어발달 이론을 설명하시오.', answer: '행동주의, 생득주의, 상호작용주의', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 언어발달 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 행동주의 이론 (스키너)\n2. 생득주의 이론 (촘스키)\n3. 상호작용주의 이론\n4. 언어 발달 단계\n5. 유아 언어교육에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '유아기 문해 발달을 설명하시오.', answer: '발생적 문해, 읽기·쓰기 발달 단계', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 유아기 문해 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발생적 문해 개념\n2. 읽기 발달 단계\n3. 쓰기 발달 단계\n4. 문해 환경의 중요성\n5. 문해 지도 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'socioemotional',
    name: '사회정서발달',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '애착 이론을 설명하시오.', answer: '볼비, 에인스워스, 안정애착, 불안정애착', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 애착 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 볼비의 애착 이론\n2. 에인스워스의 낯선 상황 실험\n3. 애착 유형 (안정, 회피, 저항, 혼란)\n4. 애착의 발달 단계\n5. 초기 애착의 중요성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '에릭슨의 심리사회적 발달 이론을 설명하시오.', answer: '8단계, 신뢰감, 자율성, 주도성', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 에릭슨의 심리사회적 발달 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 심리사회적 발달 8단계\n2. 영아기: 신뢰감 vs 불신감\n3. 걸음마기: 자율성 vs 수치심\n4. 유아기: 주도성 vs 죄책감\n5. 유아교육에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '정서발달과 정서조절을 설명하시오.', answer: '기본정서, 자의식적 정서, 정서조절 전략', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 정서발달과 정서조절을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본정서의 출현\n2. 자의식적 정서 (자랑, 수치심, 죄책감)\n3. 정서 이해 능력 발달\n4. 정서조절 전략의 발달\n5. 정서교육의 중요성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '자아개념과 자아존중감 발달을 설명하시오.', answer: '자기인식, 자아존중감, 성 개념', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 자아개념과 자아존중감 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기인식의 출현 (거울실험)\n2. 자아개념의 발달\n3. 자아존중감의 형성\n4. 성 개념과 성역할 발달\n5. 긍정적 자아개념 형성 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '친사회적 행동 발달을 설명하시오.', answer: '공감, 나누기, 돕기, 협력', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 친사회적 행동 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공감 능력의 발달\n2. 나누기 행동\n3. 돕기 행동\n4. 협력 행동\n5. 친사회적 행동 촉진 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'moral',
    name: '도덕성발달',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '피아제의 도덕성 발달 이론을 설명하시오.', answer: '타율적 도덕성, 자율적 도덕성', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 피아제의 도덕성 발달 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도덕성 발달 단계\n2. 타율적 도덕성 (5~7세)\n3. 자율적 도덕성 (10세 이후)\n4. 도덕적 판단의 변화\n5. 유아 도덕교육에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '콜버그의 도덕성 발달 이론을 설명하시오.', answer: '전인습-인습-후인습 수준', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 콜버그의 도덕성 발달 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도덕성 발달 3수준 6단계\n2. 전인습 수준 (처벌과 복종, 도구적 목적)\n3. 인습 수준\n4. 후인습 수준\n5. 유아기 도덕성의 특징\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '양심과 죄책감의 발달을 설명하시오.', answer: '초자아, 내면화, 자기조절', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 양심과 죄책감의 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초자아의 형성 (프로이트)\n2. 도덕 규범의 내면화\n3. 죄책감의 출현\n4. 자기조절 능력 발달\n5. 양심 발달 촉진 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '공격성 발달을 설명하시오.', answer: '도구적 공격성, 적대적 공격성, 관계적 공격성', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 공격성 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공격성의 유형 (도구적, 적대적, 관계적)\n2. 공격성의 발달적 변화\n3. 공격성의 원인 (좌절-공격 가설)\n4. 공격성 감소 방법\n5. 사회적 기술 지도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '규칙과 질서 이해 발달을 설명하시오.', answer: '규칙의 이해, 게임규칙, 사회규범', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 규칙과 질서 이해 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 규칙에 대한 이해 발달\n2. 게임 규칙의 습득\n3. 사회적 규범의 내면화\n4. 공정성 개념의 발달\n5. 규칙 지도 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'play',
    name: '놀이발달',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '놀이 발달 단계를 설명하시오.', answer: '파튼의 사회적 놀이 발달 6단계', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 놀이 발달 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 파튼의 사회적 놀이 발달\n2. 비참여 행동, 방관자 행동\n3. 혼자놀이, 병행놀이\n4. 연합놀이, 협동놀이\n5. 연령에 따른 놀이 발달\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인지적 놀이 발달을 설명하시오.', answer: '기능놀이, 구성놀이, 상징놀이, 규칙놀이', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 인지적 놀이 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 스밀란스키의 인지적 놀이 유형\n2. 기능놀이 (감각운동놀이)\n3. 구성놀이\n4. 상징놀이 (가상놀이)\n5. 규칙있는 게임\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '극놀이 발달을 설명하시오.', answer: '가상놀이, 사회극놀이, 역할놀이', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 극놀이 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가상놀이의 출현 (18~24개월)\n2. 사회극놀이의 발달\n3. 역할놀이의 특징\n4. 극놀이의 교육적 가치\n5. 극놀이 지원 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '놀이와 발달의 관계를 설명하시오.', answer: '인지, 사회성, 정서, 신체 발달', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 놀이와 발달의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 놀이와 인지발달\n2. 놀이와 사회성 발달\n3. 놀이와 정서발달\n4. 놀이와 신체발달\n5. 놀이와 창의성 발달\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '놀이 이론을 설명하시오.', answer: '정신분석, 인지발달, 각성조절 이론', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 놀이 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정신분석 이론 (카타르시스)\n2. 인지발달 이론 (피아제)\n3. 각성조절 이론\n4. 사회문화적 이론 (비고츠키)\n5. 현대 놀이 이론의 통합\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'physical',
    name: '신체발달',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '대근육 운동 발달을 설명하시오.', answer: '이동운동, 평형성, 조작운동', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 대근육 운동 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이동운동 (걷기, 달리기, 뛰기)\n2. 평형성 (균형잡기)\n3. 조작운동 (던지기, 받기, 차기)\n4. 연령별 대근육 발달\n5. 대근육 활동 지도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '소근육 운동 발달을 설명하시오.', answer: '손-눈 협응, 쥐기, 그리기, 쓰기', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 소근육 운동 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손-눈 협응력 발달\n2. 쥐기 기술 (손바닥쥐기→손가락쥐기)\n3. 그리기 발달 단계\n4. 쓰기 기술 발달\n5. 소근육 활동 지도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '지각-운동 발달을 설명하시오.', answer: '시지각, 청지각, 신체상, 공간지각', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 지각-운동 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시지각 발달\n2. 청지각 발달\n3. 신체상 발달\n4. 공간지각 발달\n5. 지각-운동 통합 활동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '신체발달의 원리를 설명하시오.', answer: '두미발달, 중심부발달, 분화와 통합', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 신체발달의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 두미발달의 원리\n2. 중심부에서 말초부로 발달\n3. 전체에서 특수로 (분화)\n4. 통합의 원리\n5. 개인차 존중\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '건강과 안전 발달을 설명하시오.', answer: '건강습관, 안전의식, 영양, 휴식', prompt: '유치원 임용시험 유아발달 문제입니다.\n\n문제: 건강과 안전 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본 건강습관 형성\n2. 안전의식 발달\n3. 영양과 발달\n4. 휴식과 수면의 중요성\n5. 건강·안전교육 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ChildDevelopmentStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('kindergarten-teacher-child-development-progress');
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
    localStorage.setItem('kindergarten-teacher-child-development-progress', JSON.stringify(arr));
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
            <Link href="/category/education/kindergarten-teacher" className="text-gray-600 hover:text-indigo-600">유치원정교사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">유아발달</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🧒</span>
            <h1 className="text-2xl font-bold text-gray-800">유아발달 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">유치원 임용시험 - 발달이론과 영역별 발달</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-purple-500 text-white hover:bg-purple-600'}`}>
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
