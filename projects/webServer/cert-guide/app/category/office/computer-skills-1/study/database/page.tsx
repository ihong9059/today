'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function DatabaseStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [progress, setProgress] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    const saved = localStorage.getItem('computer-skills-1-database-progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const newProgress = { ...progress, [id]: !progress[id] };
    setProgress(newProgress);
    localStorage.setItem('computer-skills-1-database-progress', JSON.stringify(newProgress));
  };

  const topics = [
    {
      title: '데이터베이스 기초',
      questions: [
        { id: 1, question: '데이터베이스의 정의와 특징을 설명하시오.', answer: '통합된 데이터의 집합, 실시간 접근성/계속적 변화/동시 공유/내용에 의한 참조' },
        { id: 2, question: 'DBMS의 정의와 주요 기능을 설명하시오.', answer: '데이터베이스 관리 시스템, 정의/조작/제어 기능 (DDL, DML, DCL)' },
        { id: 3, question: '데이터베이스 스키마의 3계층을 설명하시오.', answer: '외부 스키마(사용자 뷰), 개념 스키마(논리적 구조), 내부 스키마(물리적 구조)' },
        { id: 4, question: '데이터 독립성의 종류를 설명하시오.', answer: '논리적 독립성(개념-외부), 물리적 독립성(내부-개념)' },
        { id: 5, question: '데이터 모델의 종류를 설명하시오.', answer: '계층형, 네트워크형, 관계형, 객체지향형' },
        { id: 6, question: '관계형 데이터베이스의 특징을 설명하시오.', answer: '테이블 형태, SQL 사용, 데이터 무결성, 정규화 지원' },
        { id: 7, question: 'E-R 다이어그램의 구성 요소를 설명하시오.', answer: '개체(Entity): 사각형, 속성(Attribute): 타원, 관계(Relationship): 마름모' },
        { id: 8, question: '카디널리티(Cardinality)의 종류를 설명하시오.', answer: '1:1, 1:N, M:N 관계, 개체 간 대응 수' },
        { id: 9, question: '데이터 딕셔너리의 역할을 설명하시오.', answer: '메타데이터 저장, 스키마/제약조건/사용자 정보 관리' },
        { id: 10, question: 'NoSQL의 특징과 종류를 설명하시오.', answer: '비관계형, 대용량/분산 처리, 키-값/문서/컬럼/그래프 DB' },
      ]
    },
    {
      title: '관계형 데이터베이스',
      questions: [
        { id: 11, question: '릴레이션(Relation)의 구성 요소를 설명하시오.', answer: '튜플(행, 레코드), 속성(열, 필드), 도메인(속성 값의 범위)' },
        { id: 12, question: '기본 키(Primary Key)의 특징을 설명하시오.', answer: '유일성(Unique), NULL 불가, 레코드 식별자' },
        { id: 13, question: '외래 키(Foreign Key)의 역할을 설명하시오.', answer: '다른 테이블의 기본 키 참조, 테이블 간 관계 설정' },
        { id: 14, question: '후보 키와 대체 키의 차이를 설명하시오.', answer: '후보 키: 기본 키가 될 수 있는 키들, 대체 키: 기본 키 제외 후보 키' },
        { id: 15, question: '참조 무결성 제약조건을 설명하시오.', answer: '외래 키 값은 참조하는 테이블의 기본 키 값이거나 NULL' },
        { id: 16, question: 'NULL 값의 의미와 처리 방법을 설명하시오.', answer: '값이 없음/알 수 없음, IS NULL/IS NOT NULL로 검사' },
        { id: 17, question: '인덱스(Index)의 역할과 종류를 설명하시오.', answer: '검색 속도 향상, B-Tree/Hash 인덱스, 클러스터드/넌클러스터드' },
        { id: 18, question: '뷰(View)의 정의와 장점을 설명하시오.', answer: '가상 테이블, 보안/편의성/독립성 제공' },
        { id: 19, question: '트리거(Trigger)의 역할을 설명하시오.', answer: '이벤트 발생 시 자동 실행되는 프로시저, 데이터 무결성 유지' },
        { id: 20, question: '저장 프로시저(Stored Procedure)의 장점을 설명하시오.', answer: '미리 컴파일, 성능 향상, 보안 강화, 재사용성' },
      ]
    },
    {
      title: '정규화',
      questions: [
        { id: 21, question: '정규화의 목적을 설명하시오.', answer: '데이터 중복 제거, 이상현상 방지, 데이터 무결성 유지' },
        { id: 22, question: '이상현상(Anomaly)의 3가지 종류를 설명하시오.', answer: '삽입 이상, 삭제 이상, 갱신 이상' },
        { id: 23, question: '함수적 종속(FD)의 개념을 설명하시오.', answer: 'X→Y: X 값이 Y 값을 결정, X가 결정자, Y가 종속자' },
        { id: 24, question: '제1정규형(1NF)의 조건을 설명하시오.', answer: '모든 속성이 원자값(Atomic Value)을 가짐, 반복 그룹 제거' },
        { id: 25, question: '제2정규형(2NF)의 조건을 설명하시오.', answer: '1NF + 부분 함수적 종속 제거 (완전 함수적 종속)' },
        { id: 26, question: '제3정규형(3NF)의 조건을 설명하시오.', answer: '2NF + 이행적 함수적 종속 제거' },
        { id: 27, question: 'BCNF의 조건을 설명하시오.', answer: '모든 결정자가 후보 키인 정규형' },
        { id: 28, question: '반정규화(Denormalization)의 목적을 설명하시오.', answer: '성능 향상을 위해 의도적으로 중복 허용' },
        { id: 29, question: '부분 함수적 종속과 완전 함수적 종속의 차이를 설명하시오.', answer: '부분: 기본 키 일부에 종속, 완전: 기본 키 전체에 종속' },
        { id: 30, question: '이행적 함수적 종속의 예시를 설명하시오.', answer: 'A→B, B→C이면 A→C, 중간 속성을 거쳐 종속' },
      ]
    },
    {
      title: 'SQL 기초',
      questions: [
        { id: 31, question: 'SELECT 문의 기본 구조를 설명하시오.', answer: 'SELECT 열 FROM 테이블 WHERE 조건 ORDER BY 정렬' },
        { id: 32, question: 'WHERE 절의 비교 연산자를 나열하시오.', answer: '=, <>, <, >, <=, >=, BETWEEN, IN, LIKE, IS NULL' },
        { id: 33, question: 'LIKE 연산자의 와일드카드를 설명하시오.', answer: '%: 0개 이상 문자, _: 정확히 1개 문자' },
        { id: 34, question: 'ORDER BY 절의 사용법을 설명하시오.', answer: 'ORDER BY 열 ASC/DESC, 여러 열 지정 가능' },
        { id: 35, question: 'GROUP BY와 HAVING의 차이를 설명하시오.', answer: 'GROUP BY: 그룹화, HAVING: 그룹 조건(집계함수 사용)' },
        { id: 36, question: 'SQL 집계 함수 5가지를 나열하시오.', answer: 'COUNT, SUM, AVG, MAX, MIN' },
        { id: 37, question: 'DISTINCT의 역할을 설명하시오.', answer: '중복 제거, SELECT DISTINCT 열 FROM 테이블' },
        { id: 38, question: 'INNER JOIN과 OUTER JOIN의 차이를 설명하시오.', answer: 'INNER: 일치 행만, OUTER: 한쪽/양쪽 모든 행 포함' },
        { id: 39, question: 'LEFT JOIN의 동작 방식을 설명하시오.', answer: '왼쪽 테이블 모든 행 + 오른쪽 일치 행, 불일치는 NULL' },
        { id: 40, question: '서브쿼리(Subquery)의 사용법을 설명하시오.', answer: 'SELECT 내 SELECT, WHERE 조건에서 결과값 사용' },
      ]
    },
    {
      title: 'Access 쿼리',
      questions: [
        { id: 41, question: 'Access 쿼리의 종류를 나열하시오.', answer: '선택, 매개변수, 크로스탭, 실행(테이블만들기/추가/업데이트/삭제)' },
        { id: 42, question: '선택 쿼리의 용도를 설명하시오.', answer: '데이터 검색/조회, 조건에 맞는 레코드 선택' },
        { id: 43, question: '매개변수 쿼리의 작성법을 설명하시오.', answer: '조건에 [입력 프롬프트] 사용, 실행 시 값 입력' },
        { id: 44, question: '크로스탭 쿼리의 용도를 설명하시오.', answer: '행/열 기준 데이터 요약, 피벗 테이블 형태' },
        { id: 45, question: '테이블 만들기 쿼리의 사용법을 설명하시오.', answer: 'SELECT INTO 새테이블 FROM 원본테이블, 결과로 새 테이블 생성' },
        { id: 46, question: '추가 쿼리의 사용법을 설명하시오.', answer: 'INSERT INTO 테이블 SELECT..., 다른 테이블 데이터 추가' },
        { id: 47, question: '업데이트 쿼리의 사용법을 설명하시오.', answer: 'UPDATE 테이블 SET 열=값 WHERE 조건, 데이터 수정' },
        { id: 48, question: '삭제 쿼리의 사용법을 설명하시오.', answer: 'DELETE FROM 테이블 WHERE 조건, 레코드 삭제' },
        { id: 49, question: '폼과 보고서에서 쿼리 활용법을 설명하시오.', answer: '쿼리를 레코드 원본으로 사용, 필터링된 데이터 표시' },
        { id: 50, question: 'Access SQL과 표준 SQL의 차이를 설명하시오.', answer: '*: 모든 열, &: 문자열 연결, #: 날짜 구분자' },
      ]
    },
  ];

  const allQuestions = topics.flatMap(t => t.questions);
  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / allQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a><span className="text-gray-300">›</span>
            <a href="/category/office/computer-skills-1" className="text-gray-600 hover:text-blue-600">컴활 1급</a><span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">데이터베이스 일반</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl"><span className="text-3xl">🗄️</span></div>
            <div><h1 className="text-2xl font-bold">데이터베이스 일반</h1><p className="text-cyan-100">3과목 | 50문항 학습</p></div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2"><span>학습 진행률</span><span className="font-bold">{completedCount}/{allQuestions.length} ({progressPercent}%)</span></div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPercent}%` }} /></div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={() => setOpenTopics(prev => prev.includes(topicIndex) ? prev.filter(i => i !== topicIndex) : [...prev, topicIndex])}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">{topicIndex + 1}</div>
                  <span className="font-bold text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-500">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {openTopics.includes(topicIndex) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-lg border-2 transition ${progress[q.id] ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-transparent'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => saveProgress(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${progress[q.id] ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{progress[q.id] && '✓'}</button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-cyan-600 bg-cyan-50 px-3 py-2 rounded-lg">💡 {q.answer}</p>
                        </div>
                        <button onClick={() => { setCurrentPrompt(`컴퓨터활용능력 1급 필기시험 "데이터베이스 일반" 과목 문제입니다.\n\n문제: ${q.question}\n\n다음 순서로 상세히 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명 (예시 포함)\n3. 시험 출제 포인트\n4. 관련 개념 연결\n5. 연습문제 3개 (정답 포함)`); setShowAIModal(true); }}
                          className="px-3 py-1 bg-cyan-100 text-cyan-600 rounded-lg text-sm hover:bg-cyan-200 transition">🤖 AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <a href="/category/office/computer-skills-1/study/spreadsheet" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 스프레드시트 일반</a>
          <a href="/category/office/computer-skills-1/study/spreadsheet-practical" className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition">다음: 엑셀 실기 →</a>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
