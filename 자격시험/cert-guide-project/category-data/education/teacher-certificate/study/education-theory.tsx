'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'philosophy',
    name: '교육철학',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '플라톤의 교육사상을 설명하시오.', answer: '이데아론, 동굴의 비유, 철인정치, 국가론', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 플라톤의 교육사상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 플라톤의 이데아론\n2. 동굴의 비유와 교육의 의미\n3. 국가론에서의 교육관\n4. 철인교육과 교육과정\n5. 현대 교육에 주는 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '듀이의 실용주의 교육철학을 설명하시오.', answer: '경험중심교육, 문제해결학습, 반성적 사고, 민주주의와 교육', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 듀이의 실용주의 교육철학을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 듀이의 실용주의 철학\n2. 경험중심 교육론\n3. 반성적 사고와 문제해결학습\n4. 민주주의와 교육\n5. 진보주의 교육운동과 현대적 의의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '페스탈로치의 교육사상을 설명하시오.', answer: '직관교육, 합자연의 원리, 전인교육, 노작교육', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 페스탈로치의 교육사상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 페스탈로치의 생애와 교육실천\n2. 직관교육의 원리\n3. 합자연의 원리와 삼육론 (지·덕·체)\n4. 노작교육과 기초도야\n5. 현대 초등교육에 주는 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '프뢰벨의 유치원 교육사상을 설명하시오.', answer: '은물, 놀이중심교육, 자기활동의 원리, 통일의 원리', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 프뢰벨의 유치원 교육사상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프뢰벨의 인간관과 교육관\n2. 은물(Gabe)과 작업(Occupation)\n3. 놀이중심 교육과 자기활동의 원리\n4. 통일의 원리와 조화로운 발달\n5. 현대 유아교육에 주는 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '홀리스틱 교육(전인교육)을 설명하시오.', answer: '전인적 발달, 통합교육, 영성교육, 생태교육', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 홀리스틱 교육(전인교육)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 홀리스틱 교육의 개념과 배경\n2. 전인적 발달 (지·정·의·체)\n3. 교과통합과 연계학습\n4. 영성교육과 생태교육\n5. 한국 교육과정에서의 전인교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'psychology',
    name: '교육심리',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '피아제의 인지발달 단계를 설명하시오.', answer: '감각운동기, 전조작기, 구체적 조작기, 형식적 조작기', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 피아제의 인지발달 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피아제의 인지발달 이론 개요\n2. 4단계 발달단계 (감각운동기, 전조작기, 구체적 조작기, 형식적 조작기)\n3. 각 단계별 특징과 연령\n4. 교육적 함의 (적기교육, 발달에 적합한 교육)\n5. 초등교육 현장 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '비고츠키의 사회문화적 인지이론을 설명하시오.', answer: '근접발달영역(ZPD), 비계설정, 내면화, 언어와 사고', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 비고츠키의 사회문화적 인지이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비고츠키의 사회문화적 접근\n2. 근접발달영역(ZPD) 개념\n3. 비계설정(Scaffolding)과 교사의 역할\n4. 언어와 사고의 관계, 내면화\n5. 협력학습과 또래교수에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '에릭슨의 심리사회적 발달 단계를 설명하시오.', answer: '8단계 발달, 각 단계별 위기, 정체성 형성', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 에릭슨의 심리사회적 발달 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 에릭슨의 심리사회적 발달이론 개요\n2. 8단계 발달단계와 각 단계별 위기\n3. 학령기(근면성 vs 열등감) 특징\n4. 청소년기(정체성 vs 역할혼란) 특징\n5. 교사의 역할과 교육적 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '콜버그의 도덕성 발달 단계를 설명하시오.', answer: '전인습, 인습, 후인습 수준, 6단계 발달', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 콜버그의 도덕성 발달 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 콜버그의 도덕성 발달이론 배경\n2. 3수준 6단계 (전인습, 인습, 후인습)\n3. 각 단계별 특징과 판단 기준\n4. 도덕적 딜레마 토론법\n5. 학교 인성교육에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가드너의 다중지능이론을 설명하시오.', answer: '8가지 지능, 개인차 존중, 강점기반 교육', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 가드너의 다중지능이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다중지능이론의 배경과 개념\n2. 8가지 지능 (언어, 논리수학, 공간, 음악, 신체운동, 대인관계, 개인이해, 자연탐구)\n3. 전통적 지능관과의 차이\n4. 개인차 존중과 강점기반 교육\n5. 교실 수업에서의 적용 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'curriculum',
    name: '교육과정',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '2022 개정 교육과정의 주요 특징을 설명하시오.', answer: '역량중심, 깊이있는 학습, 디지털 소양, 고교학점제', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 2022 개정 교육과정의 주요 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 2022 개정 교육과정 개정 배경\n2. 핵심역량과 교과역량\n3. 깊이있는 학습과 학습량 적정화\n4. 디지털·AI 소양 교육 강화\n5. 고교학점제 전면 도입\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '백워드 설계(Understanding by Design)를 설명하시오.', answer: '목표→평가→수업 설계, 거꾸로 설계, Wiggins & McTighe', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 백워드 설계(Understanding by Design)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 백워드 설계의 개념과 개발자\n2. 3단계 설계 과정 (목표 확인 → 평가계획 → 학습활동)\n3. 전통적 교육과정 설계와의 차이\n4. 영속적 이해(Enduring Understanding)\n5. 교실 수업설계 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '타일러의 합리적 교육과정 개발모형을 설명하시오.', answer: '목표→학습경험→조직→평가, 4단계 모형', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 타일러의 합리적 교육과정 개발모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 타일러의 교육과정 개발 4단계\n2. 교육목표의 설정 (학습자, 사회, 교과)\n3. 학습경험의 선정과 조직\n4. 평가와 환류\n5. 합리적 모형의 장단점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '통합교육과정의 유형을 설명하시오.', answer: '다학문적, 간학문적, 탈학문적 통합', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 통합교육과정의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통합교육과정의 필요성\n2. 다학문적(Multidisciplinary) 통합\n3. 간학문적(Interdisciplinary) 통합\n4. 탈학문적(Transdisciplinary) 통합\n5. 초등학교 통합교과 운영 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '잠재적 교육과정을 설명하시오.', answer: '숨은 교육과정, 학교문화, 비의도적 학습', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 잠재적 교육과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 잠재적 교육과정의 개념\n2. 공식적 교육과정과의 차이\n3. 잠재적 교육과정의 사례 (학교문화, 교사-학생 상호작용)\n4. 긍정적·부정적 영향\n5. 교사의 성찰과 개선 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'teaching',
    name: '교수학습이론',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '구성주의 학습이론을 설명하시오.', answer: '지식의 구성, 학습자 중심, 협력학습, 실제적 맥락', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 구성주의 학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구성주의의 철학적 배경\n2. 인지적 구성주의 vs 사회적 구성주의\n3. 구성주의 학습원리 (지식의 구성, 학습자 중심)\n4. 구성주의 교수전략 (문제중심학습, 프로젝트학습)\n5. 교실 수업 적용 시 유의점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '문제중심학습(PBL)을 설명하시오.', answer: '실제 문제, 자기주도학습, 협력학습, 촉진자 역할', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 문제중심학습(PBL)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PBL의 개념과 배경\n2. PBL의 특징 (실제적 문제, 비구조화)\n3. PBL 수업 절차 (문제제시→탐구→해결)\n4. 교사의 촉진자 역할\n5. 초·중등 교실 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '협력학습의 주요 모형을 설명하시오.', answer: 'Jigsaw, STAD, LT, GI 모형', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 협력학습의 주요 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 협력학습의 개념과 원리\n2. Jigsaw(직소) 모형\n3. STAD(Student Teams Achievement Division) 모형\n4. LT(Learning Together) 모형\n5. 협력학습의 효과와 유의점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '거꾸로 학습(Flipped Learning)을 설명하시오.', answer: '사전학습, 교실활동 중심, 블렌디드 러닝', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 거꾸로 학습(Flipped Learning)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 거꾸로 학습의 개념과 배경\n2. 전통적 수업과의 차이\n3. 사전학습(동영상 강의)과 교실 활동\n4. 거꾸로 학습의 장점과 단점\n5. 효과적인 운영 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '탐구학습 모형을 설명하시오.', answer: '문제인식, 가설설정, 자료수집, 검증, 일반화', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 탐구학습 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탐구학습의 개념과 원리\n2. 탐구학습 5단계 (문제인식→가설→자료수집→검증→일반화)\n3. 안내된 탐구 vs 자유 탐구\n4. 과학·사회 교과에서의 탐구학습\n5. 탐구기능 신장 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'evaluation',
    name: '교육평가',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '타당도와 신뢰도의 개념을 설명하시오.', answer: '타당도(측정하고자 하는 것), 신뢰도(일관성), 관계', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 타당도와 신뢰도의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 타당도의 개념과 종류 (내용, 준거, 구인 타당도)\n2. 신뢰도의 개념과 종류 (검사-재검사, 동형검사, 내적일관성)\n3. 타당도와 신뢰도의 관계\n4. 평가도구 제작 시 고려사항\n5. 교실 평가에서의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '형성평가와 총괄평가를 설명하시오.', answer: '형성평가(과정), 총괄평가(결과), 블룸', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 형성평가와 총괄평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 블룸의 완전학습이론\n2. 형성평가의 목적과 특징\n3. 총괄평가의 목적과 특징\n4. 두 평가의 차이점과 상호보완\n5. 과정중심평가와의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '수행평가의 특징과 유형을 설명하시오.', answer: '실제 수행, 과정과 결과, 포트폴리오, 프로젝트', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 수행평가의 특징과 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수행평가의 개념과 필요성\n2. 수행평가의 특징 (과정평가, 실제적 과제)\n3. 수행평가의 유형 (서술형, 논술형, 포트폴리오, 프로젝트)\n4. 채점 루브릭(rubric) 개발\n5. 수행평가의 장단점과 개선 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '절대평가와 상대평가를 설명하시오.', answer: '준거참조평가, 규준참조평가, 성취기준', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 절대평가와 상대평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 준거참조평가(절대평가)의 개념과 특징\n2. 규준참조평가(상대평가)의 개념과 특징\n3. 두 평가방식의 장단점\n4. 성취평가제와 성취기준\n5. 학교 현장 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '과정중심평가를 설명하시오.', answer: '학습과정 평가, 피드백, 성장 중심, 2015 개정 교육과정', prompt: '교원임용시험 교육학 문제입니다.\n\n문제: 과정중심평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과정중심평가의 개념과 배경\n2. 과정중심평가의 특징 (학습과정, 성장중심)\n3. 즉각적 피드백의 중요성\n4. 과정중심평가 방법 (관찰, 면담, 자기평가)\n5. 2022 개정 교육과정에서의 강조점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function EducationTheoryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('teacher-certificate-education-theory-progress');
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
    localStorage.setItem('teacher-certificate-education-theory-progress', JSON.stringify(arr));
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
            <Link href="/category/education/teacher-certificate" className="text-gray-600 hover:text-indigo-600">교원자격증</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">교육학</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl font-bold text-gray-800">교육학 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">교원임용시험 1차 - 교육철학, 교육심리, 교육과정, 교수학습, 교육평가</p>
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
                            Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}>
                            {isCompleted ? '완료 취소' : '완료'}
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
