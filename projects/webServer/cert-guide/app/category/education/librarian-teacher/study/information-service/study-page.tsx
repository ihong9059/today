'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'reference-service',
    name: '참고봉사 이론',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '참고봉사의 개념과 유형을 설명하시오.', answer: '정보제공, 지도, 교육, 직접·간접 서비스', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 참고봉사의 개념과 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 참고봉사의 정의와 목적\n2. 직접 서비스 vs 간접 서비스\n3. 정보봉사, 교육봉사, 지도봉사\n4. 참고면담 (Reference Interview)\n5. 학교도서관 참고봉사의 특징\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '참고질문의 유형을 설명하시오.', answer: '사실질문, 탐색질문, 정책질문, 연구질문', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 참고질문의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사실질문 (Fact Question)\n2. 탐색질문 (Search Question)\n3. 정책질문 (Policy Question)\n4. 연구질문 (Research Question)\n5. 질문 유형별 대응 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '참고면담 기법을 설명하시오.', answer: '개방형 질문, 경청, 재진술, 확인, RUSA 지침', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 참고면담 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 참고면담의 목적\n2. 개방형 질문 vs 폐쇄형 질문\n3. 적극적 경청과 재진술\n4. 확인 및 추적 질문\n5. RUSA의 참고면담 지침\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '참고정보원의 유형을 설명하시오.', answer: '백과사전, 사전, 연감, 색인, 서지, 디렉토리', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 참고정보원의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일반 백과사전과 주제 백과사전\n2. 언어사전과 주제사전\n3. 연감, 편람, 통계자료\n4. 색인·초록지, 서지\n5. 디렉토리와 인명사전\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '레퍼런스 컬렉션 구축을 설명하시오.', answer: '선정, 배치, 평가, 업데이트, 홍보', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 레퍼런스 컬렉션 구축을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 참고자료 선정 기준\n2. 레퍼런스 코너 배치\n3. 정기적 평가 및 폐기\n4. 최신 자료 업데이트\n5. 이용자 홍보 및 안내\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'information-retrieval',
    name: '정보검색',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '정보검색 시스템의 구조를 설명하시오.', answer: '색인, 질의처리, 매칭, 랭킹, 재현율·정확률', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 정보검색 시스템의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정보검색의 개념\n2. 색인 생성 및 저장\n3. 질의 처리 및 매칭\n4. 결과 랭킹 알고리즘\n5. 재현율과 정확률\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '불린 검색을 설명하시오.', answer: 'AND, OR, NOT, 괄호, 연산자 우선순위', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 불린 검색을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불린 논리의 개념\n2. AND, OR, NOT 연산자\n3. 괄호를 이용한 복합 검색\n4. 연산자 우선순위\n5. 벤다이어그램 설명\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '검색 전략을 설명하시오.', answer: '탐색전략, 핵심어 선정, 확장·축소, 필터링', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 검색 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검색 주제 분석\n2. 핵심어(키워드) 선정\n3. 검색 확장 (OR, 시소러스)\n4. 검색 축소 (AND, 필터)\n5. 검색 결과 평가 및 수정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '데이터베이스 검색을 설명하시오.', answer: '학술DB, 필드 검색, 절단검색, 근접연산자', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 데이터베이스 검색을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학술 데이터베이스의 종류\n2. 필드 검색 (저자, 제목, 초록)\n3. 절단검색 (*, ?, #)\n4. 근접연산자 (NEAR, ADJ)\n5. 검색 결과 내보내기 및 인용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '웹 검색엔진을 설명하시오.', answer: 'Google, 크롤링, 페이지랭크, SEO', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 웹 검색엔진을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검색엔진의 작동 원리\n2. 크롤링과 인덱싱\n3. 페이지랭크 알고리즘\n4. 구글 검색 연산자\n5. SEO와 정보 리터러시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'user-education',
    name: '이용자 교육',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '정보활용교육의 개념을 설명하시오.', answer: '정보 리터러시, Big6, ACRL 기준', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 정보활용교육의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정보활용능력(Information Literacy)의 정의\n2. 정보활용교육의 필요성\n3. ACRL 정보 리터러시 기준\n4. Big6 모형\n5. 학교 교육과정과의 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Big6 Skills 모형을 설명하시오.', answer: '과제정의, 정보탐색전략, 위치파악·접근, 정보이용, 종합, 평가', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: Big6 Skills 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과제 정의 (Task Definition)\n2. 정보 탐색 전략 (Information Seeking Strategies)\n3. 위치 파악과 접근 (Location and Access)\n4. 정보 이용 (Use of Information)\n5. 종합 (Synthesis)과 평가 (Evaluation)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '도서관 이용 지도를 설명하시오.', answer: '오리엔테이션, 서가안내, 검색교육, 실습', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 도서관 이용 지도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신입생 오리엔테이션\n2. 도서관 공간 및 서비스 안내\n3. 서가 배치 및 청구기호 교육\n4. OPAC 검색 실습\n5. 대출·반납 절차 안내\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '협력수업(협동교수)을 설명하시오.', answer: '교사-사서 협력, 공동기획, 팀티칭, 프로젝트 학습', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 협력수업(협동교수)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 협력수업의 개념과 필요성\n2. 교과교사-사서교사 역할 분담\n3. 공동 수업 계획 및 설계\n4. 팀티칭 및 프로젝트 학습\n5. 평가 및 환류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '디지털 리터러시 교육을 설명하시오.', answer: '디지털 정보 검색, 평가, 윤리, 미디어 리터러시', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 디지털 리터러시 교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 디지털 리터러시의 개념\n2. 디지털 정보 검색 능력\n3. 정보 신뢰성 평가 (CRAAP 테스트)\n4. 디지털 시민성과 윤리\n5. 미디어 리터러시와의 통합\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'digital-service',
    name: '디지털 정보서비스',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '전자도서관 서비스를 설명하시오.', answer: '전자책, 전자저널, 데이터베이스, 원격접근', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 전자도서관 서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전자도서관의 개념\n2. 전자책(e-Book) 서비스\n3. 전자저널(e-Journal) 제공\n4. 학술 데이터베이스 접근\n5. 원격접근 및 모바일 서비스\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'SDI 서비스를 설명하시오.', answer: 'Selective Dissemination of Information, 프로파일, 정기 제공', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: SDI 서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SDI의 개념과 목적\n2. 이용자 프로파일 작성\n3. 정보 모니터링 및 필터링\n4. 정기적 정보 제공 (이메일, RSS)\n5. 학교도서관 신간 안내 서비스\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '온라인 참고봉사를 설명하시오.', answer: '채팅, 이메일, 협력형 디지털 레퍼런스', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 온라인 참고봉사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온라인 참고봉사의 유형\n2. 이메일 레퍼런스\n3. 실시간 채팅 레퍼런스\n4. 협력형 디지털 레퍼런스\n5. SNS 및 메신저 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '도서관 포털 및 웹사이트를 설명하시오.', answer: '정보 게이트웨이, 통합검색, 큐레이션, 가이드', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 도서관 포털 및 웹사이트를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도서관 포털의 역할\n2. 통합검색 (Discovery Service)\n3. 주제별 정보 가이드\n4. 큐레이션 및 추천 서비스\n5. 웹 접근성 및 사용성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '소셜 미디어를 활용한 서비스를 설명하시오.', answer: 'SNS, 블로그, 유튜브, 커뮤니티', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 소셜 미디어를 활용한 서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소셜 미디어 마케팅\n2. 페이스북·인스타그램 홍보\n3. 유튜브 북트레일러 제작\n4. 블로그 북큐레이션\n5. 학급 단체 채팅방 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'special-service',
    name: '특수 정보서비스',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '상호대차 서비스를 설명하시오.', answer: 'ILL, 도서관 협력망, 신청·제공, 복사 서비스', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 상호대차 서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상호대차(ILL)의 개념\n2. 도서관 협력망 구축\n3. 신청 및 제공 절차\n4. 원문복사 서비스\n5. 학교도서관 간 협력 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '정보 리터러시 평가를 설명하시오.', answer: '루브릭, 포트폴리오, 퍼포먼스 평가, 자기평가', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 정보 리터러시 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정보활용능력 평가의 목적\n2. 루브릭 개발 및 활용\n3. 포트폴리오 평가\n4. 퍼포먼스 평가 (프로젝트)\n5. 자기평가 및 동료평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '맞춤형 정보서비스를 설명하시오.', answer: '개인화, 추천 시스템, 협업 필터링, 프로파일링', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 맞춤형 정보서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개인화 서비스의 개념\n2. 이용자 프로파일링\n3. 추천 시스템 (협업 필터링)\n4. 맞춤형 도서 추천\n5. 학생 맞춤 독서지도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '저작권과 정보윤리를 설명하시오.', answer: '인용, 표절, 공정이용, CC 라이선스', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 저작권과 정보윤리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저작권의 개념과 범위\n2. 올바른 인용과 표절 방지\n3. 공정이용 (Fair Use)\n4. Creative Commons 라이선스\n5. 학생 정보윤리 교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '장애인 정보서비스를 설명하시오.', answer: '점자도서, 녹음도서, 화면낭독, 웹 접근성', prompt: '사서교사 임용시험 정보서비스론 문제입니다.\n\n문제: 장애인 정보서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 장애인 정보접근권\n2. 점자도서 및 촉각도서\n3. 녹음도서 및 화면낭독 프로그램\n4. 웹 접근성 (WCAG)\n5. 통합교육 환경에서의 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function InformationServiceStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('librarian-teacher-information-service-progress');
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
    localStorage.setItem('librarian-teacher-information-service-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-purple-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-purple-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/librarian-teacher" className="text-gray-600 hover:text-purple-600">사서교사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-purple-600 font-medium">정보서비스론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔍</span>
            <h1 className="text-2xl font-bold text-gray-800">정보서비스론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">사서교사 임용시험 - 참고봉사와 정보검색</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-purple-600">{totalCompleted}/{totalQuestions} 완료</span>
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
