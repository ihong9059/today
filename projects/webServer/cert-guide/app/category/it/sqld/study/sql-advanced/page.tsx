'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SQLDSQLAdvancedPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('sqld-sqladvanced-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('sqld-sqladvanced-completed', JSON.stringify(items));
    setCompletedItems(items);
  };

  const toggleItem = (id: string) => {
    const newItems = completedItems.includes(id)
      ? completedItems.filter(i => i !== id)
      : [...completedItems, id];
    saveProgress(newItems);
  };

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const openAIHelper = (question: string) => {
    setCurrentQuestion(question);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: "표준 조인 (Standard JOIN)",
      icon: "🔗",
      items: [
        "INNER JOIN: 양쪽 테이블에 모두 존재하는 데이터만 조회",
        "INNER JOIN ON: 명시적 조인 조건 지정",
        "NATURAL JOIN: 동일 컬럼명을 자동으로 조인 (컬럼명 일치 필수)",
        "USING 절: 조인 컬럼 직접 지정 (괄호 필수)",
        "ON 절: 조인 조건 명시적 작성 (컬럼명 다를 때 사용)",
        "LEFT OUTER JOIN: 왼쪽 테이블 기준, 오른쪽 NULL 허용",
        "RIGHT OUTER JOIN: 오른쪽 테이블 기준, 왼쪽 NULL 허용",
        "FULL OUTER JOIN: 양쪽 모두 기준 (어느 쪽이든 NULL 허용)",
        "CROSS JOIN: 카테시안 곱 (모든 조합)",
        "Oracle 전용 문법: (+) 기호로 OUTER JOIN 표현"
      ]
    },
    {
      title: "집합 연산자",
      icon: "∪",
      items: [
        "UNION: 두 쿼리 결과 합집합 (중복 제거)",
        "UNION ALL: 두 쿼리 결과 합집합 (중복 포함, 성능 우수)",
        "INTERSECT: 두 쿼리 결과 교집합",
        "EXCEPT/MINUS: 차집합 (SQL Server/Oracle)",
        "집합 연산 규칙: 컬럼 수/데이터 타입 일치 필수",
        "ORDER BY: 집합 연산 마지막에 한 번만 사용",
        "NULL 처리: 집합 연산에서 NULL은 같은 값으로 취급",
        "컬럼명: 첫 번째 쿼리의 컬럼명이 결과의 컬럼명",
        "정렬: 집합 연산 결과는 기본적으로 정렬되지 않음",
        "성능: UNION보다 UNION ALL이 빠름 (정렬 생략)"
      ]
    },
    {
      title: "서브쿼리 (Subquery)",
      icon: "📦",
      items: [
        "서브쿼리 정의: 쿼리 안에 포함된 또 다른 쿼리",
        "스칼라 서브쿼리: SELECT 절에서 단일 값 반환",
        "인라인 뷰: FROM 절에서 임시 테이블처럼 사용",
        "중첩 서브쿼리: WHERE 절에서 조건 비교에 사용",
        "단일행 서브쿼리: =, <, >, <> 등 단일행 연산자 사용",
        "다중행 서브쿼리: IN, ANY, ALL, EXISTS 사용",
        "다중컬럼 서브쿼리: 여러 컬럼을 동시에 비교",
        "연관 서브쿼리: 외부 쿼리의 값을 참조 (행별로 실행)",
        "비연관 서브쿼리: 외부 쿼리와 독립적 (한 번만 실행)",
        "서브쿼리 vs 조인: 성능과 가독성 고려하여 선택"
      ]
    },
    {
      title: "서브쿼리 연산자",
      icon: "🔍",
      items: [
        "IN: 서브쿼리 결과 중 하나와 일치하면 참",
        "NOT IN: 서브쿼리 결과와 모두 일치하지 않으면 참",
        "ANY/SOME: 서브쿼리 결과 중 하나라도 조건 만족",
        "> ANY: 최소값보다 크면 참",
        "< ANY: 최대값보다 작으면 참",
        "ALL: 서브쿼리 결과 모두와 조건 만족",
        "> ALL: 최대값보다 크면 참",
        "< ALL: 최소값보다 작으면 참",
        "EXISTS: 서브쿼리 결과가 존재하면 참 (성능 우수)",
        "NOT EXISTS: 서브쿼리 결과가 없으면 참"
      ]
    },
    {
      title: "GROUP BY와 HAVING",
      icon: "📊",
      items: [
        "GROUP BY: 특정 컬럼 기준으로 그룹화",
        "집계 함수: COUNT, SUM, AVG, MAX, MIN",
        "COUNT(*): NULL 포함 전체 행 수",
        "COUNT(컬럼): NULL 제외 행 수",
        "HAVING: 그룹에 대한 조건 (집계 함수 사용 가능)",
        "WHERE vs HAVING: WHERE는 그룹화 전, HAVING은 후",
        "SELECT 절 규칙: GROUP BY에 없으면 집계 함수 필수",
        "여러 컬럼 GROUP BY: 복합 그룹화",
        "ORDER BY와 함께 사용: 그룹 결과 정렬",
        "집계 함수 중첩 제한: MAX(SUM(col))은 서브쿼리 필요"
      ]
    },
    {
      title: "ORDER BY 절",
      icon: "📋",
      items: [
        "ORDER BY: 결과 집합 정렬",
        "ASC: 오름차순 (기본값)",
        "DESC: 내림차순",
        "다중 정렬: 여러 컬럼으로 순차 정렬",
        "컬럼 순번 사용: ORDER BY 1, 2 (SELECT 순서)",
        "별칭 사용: SELECT에서 정의한 별칭으로 정렬",
        "표현식 정렬: ORDER BY salary * 12",
        "NULL 정렬: NULLS FIRST / NULLS LAST",
        "정렬과 성능: 인덱스 활용으로 성능 향상",
        "CASE 정렬: 조건부 정렬 순서 지정"
      ]
    },
    {
      title: "그룹 함수 고급",
      icon: "📈",
      items: [
        "ROLLUP: 소계와 총계 생성 (계층적 집계)",
        "ROLLUP 결과: 그룹별 + 상위 그룹 소계 + 총계",
        "CUBE: 모든 조합의 소계 생성",
        "CUBE 결과: 가능한 모든 그룹 조합의 집계",
        "GROUPING SETS: 원하는 그룹 조합만 선택",
        "GROUPING 함수: 소계/총계 행 구분 (0: 실제, 1: 집계)",
        "GROUPING_ID: 여러 컬럼의 그룹핑 상태를 비트로 표현",
        "ROLLUP vs CUBE: ROLLUP은 계층적, CUBE는 모든 조합",
        "빈 GROUP BY: 테이블 전체를 하나의 그룹으로",
        "집계 함수와 DISTINCT: COUNT(DISTINCT col)"
      ]
    },
    {
      title: "윈도우 함수 기본",
      icon: "🪟",
      items: [
        "윈도우 함수: 행별로 집계 결과를 함께 표시",
        "OVER 절: 윈도우 함수의 범위 지정",
        "PARTITION BY: 그룹 지정 (GROUP BY와 유사)",
        "ORDER BY (윈도우): 파티션 내 정렬",
        "ROW_NUMBER(): 순차 번호 부여 (동일값도 다른 번호)",
        "RANK(): 순위 (동일값 같은 순위, 다음 순위 건너뜀)",
        "DENSE_RANK(): 순위 (동일값 같은 순위, 다음 순위 연속)",
        "ROW_NUMBER vs RANK vs DENSE_RANK 차이 이해",
        "NTILE(n): n개 그룹으로 균등 분할",
        "윈도우 함수 실행 순서: WHERE 이후, ORDER BY 이전"
      ]
    },
    {
      title: "윈도우 함수 고급",
      icon: "📐",
      items: [
        "집계 윈도우 함수: SUM, AVG, COUNT, MAX, MIN",
        "SUM() OVER(): 누적합, 이동합 계산",
        "AVG() OVER(): 이동 평균 계산",
        "LAG(col, n): n행 이전 값 (기본 1)",
        "LEAD(col, n): n행 이후 값 (기본 1)",
        "FIRST_VALUE: 파티션 내 첫 번째 값",
        "LAST_VALUE: 파티션 내 마지막 값 (RANGE 주의)",
        "ROWS BETWEEN: 물리적 행 범위 지정",
        "RANGE BETWEEN: 논리적 값 범위 지정",
        "UNBOUNDED PRECEDING/FOLLOWING: 처음/끝까지"
      ]
    },
    {
      title: "계층형 쿼리 (Oracle)",
      icon: "🌳",
      items: [
        "START WITH: 계층의 시작점 지정",
        "CONNECT BY: 부모-자식 관계 정의",
        "PRIOR: 이전 행(부모) 참조",
        "CONNECT BY PRIOR 자식 = 부모: 순방향 전개",
        "CONNECT BY PRIOR 부모 = 자식: 역방향 전개",
        "LEVEL: 현재 계층의 깊이",
        "SYS_CONNECT_BY_PATH: 루트부터 경로 표시",
        "CONNECT_BY_ROOT: 루트 노드의 값",
        "ORDER SIBLINGS BY: 같은 레벨에서 정렬",
        "CONNECT_BY_ISLEAF: 리프 노드 여부 (0/1)"
      ]
    },
    {
      title: "옵티마이저와 실행계획",
      icon: "⚡",
      items: [
        "옵티마이저: SQL 실행 최적 경로 결정",
        "규칙 기반 옵티마이저(RBO): 미리 정의된 규칙 적용",
        "비용 기반 옵티마이저(CBO): 통계 정보 기반 최적화",
        "실행계획: SQL 처리 절차를 트리 형태로 표현",
        "EXPLAIN PLAN: 실행계획 확인 명령",
        "SET AUTOTRACE: 실행계획+통계 자동 출력 (Oracle)",
        "풀 테이블 스캔: 테이블 전체 읽기",
        "인덱스 스캔: 인덱스 활용한 조회",
        "조인 방식: Nested Loop, Sort Merge, Hash Join",
        "힌트(Hint): 옵티마이저 실행계획 유도"
      ]
    },
    {
      title: "인덱스",
      icon: "📑",
      items: [
        "인덱스: 검색 성능 향상을 위한 데이터 구조",
        "B-Tree 인덱스: 가장 일반적인 인덱스 구조",
        "클러스터드 인덱스: 데이터 물리적 정렬 (테이블당 1개)",
        "비클러스터드 인덱스: 별도 인덱스 공간 (여러 개 가능)",
        "복합 인덱스: 여러 컬럼으로 구성",
        "인덱스 선두 컬럼: 복합 인덱스 첫 번째 컬럼 중요",
        "인덱스 스캔 유형: Unique, Range, Full, Skip Scan",
        "인덱스를 사용하지 못하는 경우: 부정형, 형변환, 함수",
        "WHERE 절 인덱스 컬럼에 함수 사용 시 주의",
        "인덱스 생성: CREATE INDEX idx_name ON table(col)"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/it/sqld" className="text-orange-600 hover:text-orange-800 flex items-center gap-2">
            <span>←</span>
            <span>SQLD로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">⚡</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">SQL 활용</h1>
              <p className="text-gray-600">2과목 고급 문법 핵심 개념</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-amber-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{completedItems.length}/{totalItems}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicItems = topic.items.map((_, i) => `${topicIndex}-${i}`);
            const completedInTopic = topicItems.filter(id => completedItems.includes(id)).length;

            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-orange-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{completedInTopic}/{topic.items.length} 완료</p>
                    </div>
                  </div>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {openTopics.includes(topicIndex) && (
                  <div className="px-6 pb-4 space-y-2">
                    {topic.items.map((item, itemIndex) => {
                      const itemId = `${topicIndex}-${itemIndex}`;
                      const isCompleted = completedItems.includes(itemId);

                      return (
                        <div
                          key={itemIndex}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                            isCompleted ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-orange-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-orange-500 hover:text-orange-700 text-xs px-2 py-1 rounded bg-orange-100 hover:bg-orange-200"
                          >
                            AI
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h3 className="font-bold text-orange-800 mb-3">💡 SQL 활용 학습 전략</h3>
          <ul className="space-y-2 text-orange-700 text-sm">
            <li>• <strong>핵심</strong>: JOIN, 서브쿼리, 윈도우 함수가 고득점 포인트</li>
            <li>• <strong>빈출</strong>: ROLLUP/CUBE, ROW_NUMBER, RANK 차이</li>
            <li>• <strong>주의</strong>: 집합 연산 규칙, NULL 처리 방식</li>
            <li>• <strong>실습</strong>: 복잡한 쿼리 직접 작성하며 익히기</li>
          </ul>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestion}</p>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(`SQLD SQL 활용 관련 질문입니다: "${currentQuestion}" - 예시 SQL과 실행 결과를 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`SQLD SQL 활용 관련 질문입니다: "${currentQuestion}" - 예시 SQL과 실행 결과를 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`SQLD SQL 활용 관련 질문입니다: "${currentQuestion}" - 예시 SQL과 실행 결과를 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600"
              >
                Gemini에게 질문
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
