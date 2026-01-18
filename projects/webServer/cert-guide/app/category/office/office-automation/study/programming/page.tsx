'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ProgrammingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'algorithm',
      name: '알고리즘',
      icon: '🔄',
      questions: [
        { id: 1, q: '알고리즘의 정의와 조건을 설명하시오.', a: '문제 해결 절차, 입력/출력/명확성/유한성/효과성' },
        { id: 2, q: '순차 탐색과 이진 탐색을 비교하시오.', a: '순차: O(n) 모든 요소, 이진: O(log n) 정렬 필요' },
        { id: 3, q: '버블 정렬의 원리를 설명하시오.', a: '인접 요소 비교/교환 반복, O(n²), 안정 정렬' },
        { id: 4, q: '퀵 정렬의 원리를 설명하시오.', a: '피벗 기준 분할/정복, O(n log n), 불안정 정렬' },
        { id: 5, q: '재귀 알고리즘을 설명하시오.', a: '자기 자신 호출, 기저 조건 필요, 스택 사용' },
        { id: 6, q: '순서도 기호를 설명하시오.', a: '타원(시작/끝), 사각형(처리), 마름모(판단), 화살표(흐름)' },
        { id: 7, q: '시간 복잡도 표기법을 설명하시오.', a: 'O(1), O(log n), O(n), O(n log n), O(n²)' },
        { id: 8, q: '탐욕 알고리즘을 설명하시오.', a: '각 단계 최선 선택, 거스름돈/크루스칼 등' },
        { id: 9, q: '동적 프로그래밍을 설명하시오.', a: '하위 문제 해결 후 조합, 메모이제이션 활용' },
        { id: 10, q: '분할 정복을 설명하시오.', a: '문제 분할→정복→결합, 합병정렬/퀵정렬' }
      ]
    },
    {
      id: 'data-structure',
      name: '자료구조',
      icon: '📊',
      questions: [
        { id: 1, q: '배열의 특성을 설명하시오.', a: '동일 타입, 연속 메모리, 인덱스 접근 O(1)' },
        { id: 2, q: '연결 리스트의 특성을 설명하시오.', a: '노드+포인터, 동적 크기, 삽입/삭제 O(1)' },
        { id: 3, q: '스택의 특성과 연산을 설명하시오.', a: 'LIFO, push/pop/peek, 함수호출/수식계산' },
        { id: 4, q: '큐의 특성과 연산을 설명하시오.', a: 'FIFO, enqueue/dequeue, 작업 스케줄링' },
        { id: 5, q: '트리의 용어를 설명하시오.', a: '루트, 노드, 리프, 부모/자식, 깊이, 높이' },
        { id: 6, q: '이진 트리의 종류를 설명하시오.', a: '완전/포화/균형 이진 트리, 이진 탐색 트리' },
        { id: 7, q: '트리 순회 방법을 설명하시오.', a: '전위(VLR), 중위(LVR), 후위(LRV), 레벨' },
        { id: 8, q: '그래프의 표현 방법을 설명하시오.', a: '인접 행렬(2차원 배열), 인접 리스트(연결 리스트)' },
        { id: 9, q: '해시 테이블을 설명하시오.', a: '키→해시함수→인덱스, O(1) 검색, 충돌 처리' },
        { id: 10, q: '힙의 특성을 설명하시오.', a: '완전 이진 트리, 최대힙/최소힙, 우선순위 큐' }
      ]
    },
    {
      id: 'language',
      name: '프로그래밍 언어',
      icon: '💻',
      questions: [
        { id: 1, q: '프로그래밍 언어의 세대별 특징을 설명하시오.', a: '1세대(기계어), 2세대(어셈블리), 3세대(고급어), 4세대(4GL)' },
        { id: 2, q: '컴파일러와 인터프리터를 비교하시오.', a: '컴파일러: 전체 번역→실행, 인터프리터: 한 줄씩 해석' },
        { id: 3, q: '변수의 개념과 선언을 설명하시오.', a: '데이터 저장 공간, 타입+이름 선언' },
        { id: 4, q: '자료형의 종류를 설명하시오.', a: '정수(int), 실수(float/double), 문자(char), 논리(bool)' },
        { id: 5, q: '연산자의 종류를 설명하시오.', a: '산술, 비교, 논리, 비트, 대입 연산자' },
        { id: 6, q: '제어문의 종류를 설명하시오.', a: '조건문(if/switch), 반복문(for/while/do-while)' },
        { id: 7, q: '함수의 개념을 설명하시오.', a: '특정 작업 수행 코드 블록, 재사용성/모듈화' },
        { id: 8, q: '매개변수 전달 방식을 설명하시오.', a: '값 전달(복사), 참조 전달(주소 전달)' },
        { id: 9, q: '변수의 유효 범위를 설명하시오.', a: '지역변수(함수 내), 전역변수(프로그램 전체)' },
        { id: 10, q: '포인터의 개념을 설명하시오.', a: '메모리 주소 저장 변수, *연산자로 값 접근' }
      ]
    },
    {
      id: 'os',
      name: '운영체제',
      icon: '⚙️',
      questions: [
        { id: 1, q: '운영체제의 정의와 기능을 설명하시오.', a: '하드웨어/소프트웨어 자원 관리, 사용자 인터페이스 제공' },
        { id: 2, q: '프로세스와 스레드를 비교하시오.', a: '프로세스: 실행 프로그램, 스레드: 프로세스 내 실행 단위' },
        { id: 3, q: '프로세스 상태 전이를 설명하시오.', a: '생성→준비→실행→대기→종료' },
        { id: 4, q: 'CPU 스케줄링 알고리즘을 설명하시오.', a: 'FCFS, SJF, RR, 우선순위 스케줄링' },
        { id: 5, q: '교착상태의 발생 조건을 설명하시오.', a: '상호배제, 점유대기, 비선점, 순환대기' },
        { id: 6, q: '메모리 관리 기법을 설명하시오.', a: '연속할당, 페이징, 세그먼테이션, 가상 메모리' },
        { id: 7, q: '페이지 교체 알고리즘을 설명하시오.', a: 'FIFO, LRU, LFU, 최적 교체' },
        { id: 8, q: '파일 시스템을 설명하시오.', a: '파일 저장/관리, 디렉터리 구조, 접근 권한' },
        { id: 9, q: '인터럽트의 개념을 설명하시오.', a: 'CPU 실행 중단 요청, 하드웨어/소프트웨어 인터럽트' },
        { id: 10, q: '커널의 역할을 설명하시오.', a: 'OS 핵심, 자원 관리, 시스템 호출 처리' }
      ]
    },
    {
      id: 'database',
      name: '데이터베이스',
      icon: '🗄️',
      questions: [
        { id: 1, q: '데이터베이스의 정의와 특성을 설명하시오.', a: '통합/저장/공유/운영 데이터, 실시간/동시공유/내용참조' },
        { id: 2, q: 'DBMS의 기능을 설명하시오.', a: '정의/조작/제어 기능, 데이터 독립성 보장' },
        { id: 3, q: '스키마의 3계층을 설명하시오.', a: '외부(사용자), 개념(전체), 내부(물리적) 스키마' },
        { id: 4, q: 'E-R 모델을 설명하시오.', a: '개체-관계 모델, 개체/속성/관계로 구성' },
        { id: 5, q: '관계형 데이터베이스 용어를 설명하시오.', a: '릴레이션(테이블), 튜플(행), 속성(열), 도메인' },
        { id: 6, q: '정규화의 개념을 설명하시오.', a: '중복 제거, 이상 현상 방지, 1NF~BCNF' },
        { id: 7, q: 'SQL의 분류를 설명하시오.', a: 'DDL(정의), DML(조작), DCL(제어)' },
        { id: 8, q: 'SELECT 문의 구조를 설명하시오.', a: 'SELECT-FROM-WHERE-GROUP BY-HAVING-ORDER BY' },
        { id: 9, q: '트랜잭션의 특성(ACID)을 설명하시오.', a: '원자성, 일관성, 격리성, 영속성' },
        { id: 10, q: '인덱스의 개념을 설명하시오.', a: '검색 속도 향상, B-트리, 해시 인덱스' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('oa-programming-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('oa-programming-progress', JSON.stringify(updated));
  };

  const handleAIClick = (question: string, answer: string) => {
    const prompt = `사무자동화산업기사 프로그래밍 일반 과목 문제입니다.

문제: ${question}
정답: ${answer}

다음 형식으로 상세히 설명해주세요:
1. 핵심 개념 정리
2. 상세 설명
3. 코드 예시 (해당시)
4. 시험 출제 포인트
5. 연습문제 3개 (정답 포함)`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/office/office-automation" className="text-gray-600 hover:text-green-600">사무자동화산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">프로그래밍 일반</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">💻</span></div>
              <div>
                <h1 className="text-2xl font-bold">프로그래밍 일반</h1>
                <p className="text-green-200">사무자동화산업기사 필기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-green-200 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map(topic => {
            const topicCompleted = topic.questions.filter(q => completedQuestions[`${topic.id}-${q.id}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedTopics(prev => ({ ...prev, [topic.id]: !prev[topic.id] }))}
                  className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>
                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-3">
                    {topic.questions.map(q => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.q}</p>
                              <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.a}</p>
                              <button
                                onClick={() => handleAIClick(q.q, q.a)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
                              >
                                🤖 AI에게 질문하기
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/category/office/office-automation/study/office-management" className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition">← 사무경영관리개론</Link>
          <Link href="/category/office/office-automation/study/info-comm" className="px-6 py-3 bg-cyan-600 text-white rounded-xl font-medium hover:bg-cyan-700 transition">정보통신개론 →</Link>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div className="text-left"><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
