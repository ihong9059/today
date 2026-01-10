'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'classification',
    name: '분류 이론',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '도서분류의 개념과 원리를 설명하시오.', answer: '주제별 조직화, 계층구조, 기호법, 상대적 위치', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 도서분류의 개념과 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분류의 정의와 목적\n2. 분류의 원리 (계층구조, 열거식·합성식)\n3. 분류기호의 기능\n4. 상대적 위치 vs 고정위치\n5. 브라우징과 서가 검색\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '한국십진분류법(KDC)을 설명하시오.', answer: '10개 주류, 100개 강, 전개 방식, 보조표', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 한국십진분류법(KDC)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. KDC의 역사와 개정\n2. 10주류 체계\n3. 분류기호 전개 방식\n4. 보조표 (형식구분, 지역구분 등)\n5. KDC 6판 특징\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '듀이십진분류법(DDC)을 설명하시오.', answer: '10개 Class, 상대색인, MARC 연동, 웹듀이', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 듀이십진분류법(DDC)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DDC의 역사 (듀이, 1876)\n2. 10개 주류 구조\n3. 상대색인 (Relative Index)\n4. 표준세분 (Standard Subdivisions)\n5. WebDewey와 OCLC\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '분류 실무를 설명하시오.', answer: '주제 분석, 분류기호 부여, 청구기호, 서가 배열', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 분류 실무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자료의 주제 분석 방법\n2. 분류기호 선정 및 부여\n3. 청구기호 구성 (분류기호+저자기호)\n4. 서가 배열 원칙\n5. 재분류 및 오분류 정정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '주제명표목표를 설명하시오.', answer: 'LCSH, 통제어휘, 시소러스, 관계 표시', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 주제명표목표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주제명표목표의 개념과 기능\n2. LCSH (미국의회도서관 주제명표목표)\n3. 통제어휘와 자연어\n4. 시소러스 구조 (BT, NT, RT)\n5. 한국 주제명표목표\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'cataloging',
    name: '목록 이론',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '목록의 개념과 기능을 설명하시오.', answer: '서지기술, 탐색·식별·선택·입수, FRBR', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 목록의 개념과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 목록의 정의와 역사\n2. 목록의 4대 기능 (탐색, 식별, 선택, 입수)\n3. FRBR 모형 (저작-표현형-구현형-개별자료)\n4. 목록 규칙의 발전\n5. 온라인 목록 (OPAC)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'KORMARC을 설명하시오.', answer: '필드, 지시기호, 식별기호, 태그, 형식', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: KORMARC을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MARC의 역사와 목적\n2. KORMARC 구조 (리더, 디렉토리, 필드)\n3. 필드의 종류 (0XX~9XX)\n4. 지시기호와 식별기호\n5. KORMARC 통합서지용 주요 필드\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'RDA(Resource Description and Access)를 설명하시오.', answer: 'FRBR 기반, 속성·관계, 국제목록원칙, 디지털 환경', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: RDA(Resource Description and Access)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RDA 개발 배경 (AACR2 대체)\n2. FRBR·FRAD 모형 기반\n3. 핵심요소와 속성 기술\n4. 관계 표현 (저작-표현형)\n5. 국제목록원칙(ICP)과의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '전거 통제를 설명하시오.', answer: '표목 통일, 참조 구조, VIAF, 전거레코드', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 전거 통제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전거 통제의 개념과 필요성\n2. 표목의 선정과 통일\n3. 참조 구조 (See, See also)\n4. 전거레코드 작성\n5. VIAF (가상국제전거파일)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '목록 작성 실무를 설명하시오.', answer: '서지사항 기술, 표목 선정, 주기사항, 검수', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 목록 작성 실무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서지정보원 확인 (표제지, 판권지)\n2. 기술영역 (책임표시, 판사항, 발행사항)\n3. 표목 (저자명, 서명, 주제명)\n4. 주기사항 작성\n5. 원복제 목록 검수 및 수정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'metadata',
    name: '메타데이터',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '메타데이터의 개념을 설명하시오.', answer: '데이터에 관한 데이터, 기술·관리·구조·보존 메타데이터', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 메타데이터의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 메타데이터의 정의\n2. 메타데이터의 유형 (기술·관리·구조·보존)\n3. 전통 목록과의 차이\n4. 메타데이터의 기능\n5. 디지털 환경에서의 중요성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '더블린코어(Dublin Core)를 설명하시오.', answer: '15개 요소, 단순성, 상호운용성, 웹자원 기술', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 더블린코어(Dublin Core)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 더블린코어의 역사와 목적\n2. 15개 핵심 요소\n3. Simple DC vs Qualified DC\n4. 상호운용성과 확장성\n5. 웹 자원 기술 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '디지털 객체 식별자(DOI)를 설명하시오.', answer: '영구 식별, 학술논문, Handle 시스템, 메타데이터 연결', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 디지털 객체 식별자(DOI)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DOI의 개념과 목적\n2. DOI 구조 (접두사/접미사)\n3. Handle 시스템\n4. 학술논문 관리에 활용\n5. ISBN, ISSN과의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '링크드데이터(Linked Data)를 설명하시오.', answer: 'RDF, URI, 시맨틱 웹, 5성 개방데이터', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 링크드데이터(Linked Data)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 링크드데이터의 개념\n2. RDF (Resource Description Framework)\n3. URI를 통한 식별\n4. 팀 버너스리의 5성 개방데이터\n5. 도서관 분야 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '온톨로지와 시맨틱 웹을 설명하시오.', answer: '개념·관계 정의, OWL, SKOS, 의미적 검색', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 온톨로지와 시맨틱 웹을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온톨로지의 정의\n2. 개념과 관계의 명시적 정의\n3. OWL (Web Ontology Language)\n4. SKOS (Simple Knowledge Organization System)\n5. 시맨틱 웹과 지능형 검색\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'special-materials',
    name: '특수자료 조직',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '비도서자료 조직을 설명하시오.', answer: 'AV자료, 멀티미디어, 전자자료, GMD', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 비도서자료 조직을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비도서자료의 유형 (AV, 멀티미디어)\n2. GMD (일반자료표시) 기술\n3. 비도서자료 분류 및 청구기호\n4. 특수 보관 및 관리\n5. 학교도서관 비도서자료 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '전자책(e-Book) 조직을 설명하시오.', answer: 'MARC, URL, 접근제어, 라이선스, DRM', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 전자책(e-Book) 조직을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전자책의 특성\n2. MARC 레코드 작성 (856 필드)\n3. URL 및 접근 정보\n4. 라이선스와 DRM\n5. 학교도서관 전자책 서비스\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '연속간행물 조직을 설명하시오.', answer: 'ISSN, 계속자료, 소장정보, 체크인', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 연속간행물 조직을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연속간행물의 정의와 유형\n2. ISSN (International Standard Serial Number)\n3. 계속자료 목록 작성\n4. 소장정보 기록\n5. 체크인 및 클레임 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '향토자료 조직을 설명하시오.', answer: '지역 주제, 특수분류, 귀중본, 디지털화', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 향토자료 조직을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 향토자료의 범위와 유형\n2. 지역 주제 분류 및 청구기호\n3. 특수 컬렉션 관리\n4. 귀중본 보존 처리\n5. 디지털화 및 온라인 제공\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '회색문헌 조직을 설명하시오.', answer: '학위논문, 연구보고서, 회의자료, 기관 리포지터리', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 회색문헌 조직을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회색문헌의 정의와 특성\n2. 학위논문 조직\n3. 연구보고서 및 회의자료\n4. 기관 리포지터리 구축\n5. 접근성 향상 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'automation',
    name: '도서관 자동화',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '도서관 자동화 시스템을 설명하시오.', answer: '수서·정리·대출·검색 통합, ILS, RFID', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 도서관 자동화 시스템을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도서관 자동화의 역사\n2. 통합도서관시스템(ILS) 기능\n3. 수서·정리·대출·검색 모듈\n4. RFID와 바코드 기술\n5. 학교도서관 자동화 현황\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'OPAC(온라인 목록)을 설명하시오.', answer: '키워드 검색, 패싯 네비게이션, 추천, 개인화', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: OPAC(온라인 목록)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. OPAC의 개념과 발전\n2. 검색 기능 (키워드, 불린, 근접)\n3. 패싯 네비게이션\n4. 차세대 목록 (Discovery Service)\n5. 모바일 OPAC\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '원복제 목록을 설명하시오.', answer: 'KERIS, 국립중앙도서관, ISBN 검색, 복사·수정', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 원복제 목록을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원복제 목록의 개념과 장점\n2. KERIS 통합목록\n3. 국립중앙도서관 서지정보유통지원시스템\n4. ISBN을 통한 검색 및 복사\n5. 복사 레코드 수정 및 검수\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'Z39.50 프로토콜을 설명하시오.', answer: '분산검색, 클라이언트-서버, 통합검색, 상호운용성', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: Z39.50 프로토콜을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Z39.50의 개념과 목적\n2. 클라이언트-서버 구조\n3. 분산검색 및 원격복사\n4. 도서관 간 상호운용성\n5. SRU/SRW와의 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '클라우드 기반 도서관 시스템을 설명하시오.', answer: 'SaaS, 협력망, 자동 업데이트, 비용 절감', prompt: '사서교사 임용시험 정보조직론 문제입니다.\n\n문제: 클라우드 기반 도서관 시스템을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 클라우드 컴퓨팅 개념\n2. SaaS 모델 도서관 시스템\n3. 협력망 구축 및 데이터 공유\n4. 자동 업데이트 및 유지보수\n5. 학교도서관 도입 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function InformationOrganizationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('librarian-teacher-information-organization-progress');
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
    localStorage.setItem('librarian-teacher-information-organization-progress', JSON.stringify(arr));
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
            <Link href="/category/education/librarian-teacher" className="text-gray-600 hover:text-indigo-600">사서교사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">정보조직론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📑</span>
            <h1 className="text-2xl font-bold text-gray-800">정보조직론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">사서교사 임용시험 - 분류, 목록, 메타데이터</p>
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
