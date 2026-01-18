'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'school-library-theory',
    name: '학교도서관 이론',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '학교도서관의 개념과 기능을 설명하시오.', answer: '교수학습센터, 정보센터, 독서문화센터, 교육과정 지원', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 학교도서관의 개념과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학교도서관의 정의\n2. 교수학습지원센터 기능\n3. 정보센터 기능\n4. 독서문화센터 기능\n5. 교육과정 운영 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '학교도서관의 교육적 역할을 설명하시오.', answer: '독서교육, 정보활용교육, 협력수업, 창의적 체험활동', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 학교도서관의 교육적 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독서교육 및 독서문화 조성\n2. 정보활용능력 교육\n3. 교과-도서관 협력수업\n4. 창의적 체험활동 지원\n5. 평생학습 기반 조성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '학교도서관 관련 법규를 설명하시오.', answer: '도서관법, 학교도서관진흥법, 기준령, 인력·시설·장서', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 학교도서관 관련 법규를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도서관법과 학교도서관진흥법\n2. 학교도서관 설치·운영 기준령\n3. 사서교사 배치 기준\n4. 시설 및 장서 기준\n5. 학교도서관운영위원회\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '학교도서관 발전 정책을 설명하시오.', answer: '진흥법 제정, 활성화 정책, 평가인증제, 미래형 도서관', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 학교도서관 발전 정책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학교도서관진흥법 제정 (2007)\n2. 활성화 종합방안\n3. 평가인증제도\n4. 사서교사 확대 배치\n5. 미래형 학교도서관 구축\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'IFLA 학교도서관 가이드라인을 설명하시오.', answer: '국제 기준, 사명, 인력, 장서, 서비스, 협력', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: IFLA 학교도서관 가이드라인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. IFLA 학교도서관 가이드라인 개요\n2. 학교도서관의 사명\n3. 인력 기준 및 역할\n4. 장서 개발 기준\n5. 서비스 및 협력 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'curriculum-instruction',
    name: '교육과정과 수업',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '교육과정과 학교도서관의 연계를 설명하시오.', answer: '국가교육과정, 교과별 연계, 범교과 학습, 역량 함양', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 교육과정과 학교도서관의 연계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 2022 개정 교육과정과 도서관\n2. 교과별 독서·정보활용 연계\n3. 범교과 학습주제 지원\n4. 핵심역량 함양 지원\n5. 교육과정 재구성 협력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '협력수업(협동교수) 모형을 설명하시오.', answer: '공동 기획, 역할 분담, 팀티칭, 프로젝트 학습', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 협력수업(협동교수) 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 협력수업의 개념과 필요성\n2. 교과교사-사서교사 공동 기획\n3. 역할 분담 및 팀티칭\n4. 프로젝트 기반 학습 (PBL)\n5. 평가 및 환류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '정보활용교육 교육과정을 설명하시오.', answer: 'Big6, AASL 기준, 단계별 교육, 교과 통합', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 정보활용교육 교육과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AASL 정보 리터러시 기준\n2. Big6 Skills 모형 적용\n3. 학년별·단계별 교육 내용\n4. 교과 통합 정보활용교육\n5. 프로젝트 학습 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '독서교육 교육과정을 설명하시오.', answer: '교과서 독서, 한 학기 한 권 읽기, 독서 활동', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 독서교육 교육과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교육과정 내 독서 영역\n2. 한 학기 한 권 읽기\n3. 국어과 독서 단원 연계\n4. 교과별 독서 활동 지원\n5. 자유학기제 독서 프로그램\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '수행평가와 학교도서관을 설명하시오.', answer: '과제 설계, 자료 제공, 과정 지원, 평가 참여', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 수행평가와 학교도서관을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수행평가 과제 설계 협력\n2. 정보자료 및 공간 제공\n3. 정보탐색 과정 지원\n4. 프로젝트 수행 지도\n5. 평가 기준 개발 참여\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'collection-development',
    name: '장서 개발',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '장서 개발 정책을 설명하시오.', answer: '목표, 선정 기준, 수집 범위, 폐기 기준', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 장서 개발 정책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 장서 개발 정책의 필요성\n2. 장서 개발 목표 설정\n3. 자료 선정 기준\n4. 수집 범위 및 제외 자료\n5. 장서 폐기 및 제적 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '자료 선정 과정을 설명하시오.', answer: '요구분석, 추천, 검토, 구입, 등록', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 자료 선정 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이용자 요구 분석\n2. 교사·학생 추천 수렴\n3. 선정 자료 검토 및 평가\n4. 구입 및 기증 처리\n5. 등록 및 배치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '균형잡힌 장서 구성을 설명하시오.', answer: '주제별·형태별 균형, 교육과정 반영, 다양성', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 균형잡힌 장서 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주제별 장서 구성 비율\n2. 형태별 자료 (도서, 비도서, 전자자료)\n3. 교육과정 반영 자료\n4. 독서 수준별 자료\n5. 다양성과 대표성 확보\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '장서 평가를 설명하시오.', answer: '정량적·정성적 평가, 대출 통계, 이용률, 노후화', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 장서 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정량적 평가 (장서 수, 1인당 장서)\n2. 정성적 평가 (적합성, 최신성)\n3. 대출 통계 분석\n4. 이용률 및 회전율\n5. 노후 자료 파악 및 폐기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '전자자료 구축을 설명하시오.', answer: '전자책, 데이터베이스, 라이선스, 접근 관리', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 전자자료 구축을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전자책 구독 및 구매\n2. 학술 데이터베이스 선정\n3. 라이선스 관리\n4. 원격 접근 설정\n5. 이용 통계 수집\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'service-operation',
    name: '서비스 및 운영',
    color: 'from-rose-500 to-red-500',
    questions: [
      { id: 1, question: '학교도서관 서비스 유형을 설명하시오.', answer: '대출·반납, 참고봉사, 정보서비스, 독서 프로그램', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 학교도서관 서비스 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대출·반납·예약 서비스\n2. 참고봉사 및 정보안내\n3. 독서 프로그램 운영\n4. 정보활용교육 서비스\n5. 협력수업 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '학교도서관 운영 계획을 설명하시오.', answer: '연간 계획, 예산, 인력, 시설, 프로그램', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 학교도서관 운영 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연간 운영 계획 수립\n2. 예산 편성 및 확보\n3. 인력 배치 및 역할 분담\n4. 시설 및 장비 관리\n5. 프로그램 및 행사 계획\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '이용자 서비스 규정을 설명하시오.', answer: '개관시간, 대출 규정, 이용 수칙, 이용자 권리', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 이용자 서비스 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개관 시간 및 휴관일\n2. 대출 권수 및 기간\n3. 연체 및 분실 처리\n4. 이용 수칙 및 매너\n5. 이용자 권리와 책임\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '학교도서관운영위원회를 설명하시오.', answer: '구성, 기능, 심의사항, 정책 자문', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 학교도서관운영위원회를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 운영위원회의 법적 근거\n2. 위원 구성 (교사, 학부모, 전문가)\n3. 주요 기능 및 역할\n4. 심의 사항 (예산, 장서 등)\n5. 회의 운영 및 기록\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '학교도서관 통계 및 평가를 설명하시오.', answer: '국가통계, 대출·이용 통계, 만족도, 평가인증', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 학교도서관 통계 및 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국가도서관통계시스템 입력\n2. 대출 및 이용 통계 분석\n3. 이용자 만족도 조사\n4. 학교도서관 평가인증\n5. 성과 보고 및 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'space-technology',
    name: '공간 및 기술',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '학교도서관 공간 구성을 설명하시오.', answer: '열람 공간, 자료 공간, 사무 공간, 다목적 공간', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 학교도서관 공간 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열람 공간 (개인석, 그룹석)\n2. 자료 공간 (개가서고)\n3. 사무 및 대출 공간\n4. 다목적 공간 (수업, 행사)\n5. 특별 공간 (메이커스페이스)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '미래형 학교도서관 공간을 설명하시오.', answer: '학습 코먼스, 메이커스페이스, 융복합 공간, 유연성', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 미래형 학교도서관 공간을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습 코먼스 (Learning Commons)\n2. 메이커스페이스 구축\n3. 융복합 학습 공간\n4. 유연한 가구 및 배치\n5. 스마트 기술 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '도서관 자동화 시스템을 설명하시오.', answer: 'ILS, RFID, 모바일 앱, 통합검색', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 도서관 자동화 시스템을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통합도서관시스템 (ILS)\n2. RFID 무인 대출·반납\n3. 모바일 앱 서비스\n4. 통합검색 시스템\n5. 클라우드 기반 시스템\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '디지털 도서관 서비스를 설명하시오.', answer: '전자책, 데이터베이스, 온라인 참고봉사, 큐레이션', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 디지털 도서관 서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전자책 및 오디오북\n2. 학술 데이터베이스\n3. 온라인 참고봉사\n4. 디지털 큐레이션\n5. 소셜미디어 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '학교도서관 ICT 활용을 설명하시오.', answer: 'AI 추천, VR·AR, 코딩교육, 디지털 리터러시', prompt: '사서교사 임용시험 학교도서관운영 문제입니다.\n\n문제: 학교도서관 ICT 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AI 기반 도서 추천\n2. VR·AR 체험 콘텐츠\n3. 코딩·메이커 교육\n4. 디지털 리터러시 교육\n5. 에듀테크 도구 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function SchoolLibraryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('librarian-teacher-school-library-progress');
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
    localStorage.setItem('librarian-teacher-school-library-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-violet-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-violet-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/librarian-teacher" className="text-gray-600 hover:text-violet-600">사서교사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">학교도서관운영</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏫</span>
            <h1 className="text-2xl font-bold text-gray-800">학교도서관운영 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">사서교사 임용시험 - 학교도서관 특화 실무</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-violet-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-violet-50 border-violet-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-violet-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-violet-500 text-white hover:bg-violet-600'}`}>
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
