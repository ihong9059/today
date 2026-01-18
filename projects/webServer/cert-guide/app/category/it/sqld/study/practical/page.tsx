'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SQLDPracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('sqld-practical-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('sqld-practical-completed', JSON.stringify(items));
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
      title: "시험 당일 준비",
      icon: "📅",
      items: [
        "시험 시작 30분 전까지 입실 완료하기",
        "신분증 필수 지참 (주민등록증, 운전면허증, 여권)",
        "수험표 출력 또는 캡처 준비",
        "컴퓨터 사인펜 준비 (일부 시험장)",
        "시험장 위치 사전 확인하기"
      ]
    },
    {
      title: "시험 시간 관리",
      icon: "⏱️",
      items: [
        "총 90분, 50문항 → 문항당 평균 1분 48초",
        "1과목(10문항): 15분 이내 목표",
        "2과목(40문항): 65분 이내 목표",
        "마지막 10분은 검토 시간으로 확보",
        "어려운 문제는 표시 후 다음으로 넘어가기"
      ]
    },
    {
      title: "1과목 출제 포인트",
      icon: "📊",
      items: [
        "ERD 읽기: IE/Barker 표기법 구분",
        "엔티티 유형: 기본/중심/행위 엔티티 구분",
        "정규화: 1NF~3NF, BCNF 단계별 특징",
        "식별자 관계 vs 비식별자 관계: 실선/점선 구분",
        "반정규화: 성능 향상을 위한 정규화 역행"
      ]
    },
    {
      title: "2과목 DDL/DML 출제 포인트",
      icon: "💾",
      items: [
        "CREATE TABLE 제약조건 문법",
        "ALTER TABLE 컬럼 추가/변경/삭제",
        "DELETE vs TRUNCATE vs DROP 차이",
        "INSERT 컬럼 지정 여부에 따른 값 순서",
        "UPDATE SET WHERE 없으면 전체 수정"
      ]
    },
    {
      title: "2과목 함수 출제 포인트",
      icon: "🔧",
      items: [
        "NVL/ISNULL/COALESCE NULL 처리 차이",
        "CASE 표현식 Simple vs Searched 구분",
        "날짜 함수: DBMS별 차이 (Oracle vs SQL Server)",
        "TO_CHAR 포맷: YYYY, MM, DD, HH24, MI, SS",
        "DECODE는 Oracle 전용, CASE는 표준 SQL"
      ]
    },
    {
      title: "2과목 JOIN 출제 포인트",
      icon: "🔗",
      items: [
        "INNER JOIN: 양쪽 모두 존재하는 데이터만",
        "NATURAL JOIN: 동일 컬럼명 자동 조인",
        "USING vs ON: USING은 괄호 필수",
        "LEFT/RIGHT/FULL OUTER JOIN 결과 차이",
        "Oracle (+) 기호 = LEFT/RIGHT OUTER JOIN"
      ]
    },
    {
      title: "2과목 서브쿼리 출제 포인트",
      icon: "📦",
      items: [
        "스칼라 서브쿼리: SELECT 절, 단일값 반환",
        "인라인 뷰: FROM 절, 임시 테이블",
        "IN vs EXISTS: EXISTS가 대용량에서 성능 우수",
        "> ANY: 최소값보다 큼, > ALL: 최대값보다 큼",
        "연관 서브쿼리 vs 비연관 서브쿼리 실행 방식"
      ]
    },
    {
      title: "2과목 그룹함수 출제 포인트",
      icon: "📈",
      items: [
        "GROUP BY에 없는 컬럼은 집계함수 필수",
        "HAVING: 그룹 조건 (집계 함수 사용 가능)",
        "ROLLUP: 계층적 집계 (소계+총계)",
        "CUBE: 모든 조합의 집계",
        "GROUPING 함수: 집계 행 구분 (0=실제, 1=집계)"
      ]
    },
    {
      title: "2과목 윈도우함수 출제 포인트",
      icon: "🪟",
      items: [
        "ROW_NUMBER: 동일값도 다른 순번 (1,2,3,4)",
        "RANK: 동일값 같은 순위, 건너뜀 (1,2,2,4)",
        "DENSE_RANK: 동일값 같은 순위, 연속 (1,2,2,3)",
        "LAG/LEAD: 이전/이후 행 값 참조",
        "SUM() OVER(): 누적합 계산"
      ]
    },
    {
      title: "빈출 SQL 결과 계산",
      icon: "📐",
      items: [
        "NULL 연산: NULL + 10 = NULL",
        "NULL 비교: NULL = NULL은 FALSE",
        "COUNT(*) vs COUNT(컬럼): NULL 포함 여부",
        "UNION: 중복 제거, UNION ALL: 중복 포함",
        "OUTER JOIN: 매칭 없으면 NULL로 채움"
      ]
    },
    {
      title: "자주 틀리는 문제 유형",
      icon: "⚠️",
      items: [
        "NULL IS NULL (O) vs NULL = NULL (X)",
        "빈 문자열과 NULL: Oracle에서는 동일 취급",
        "ORDER BY 컬럼 순번은 SELECT 절 순서",
        "집합 연산자 후 ORDER BY는 마지막에 1번만",
        "비식별자 관계는 점선, 식별자 관계는 실선"
      ]
    },
    {
      title: "마무리 체크리스트",
      icon: "✅",
      items: [
        "기출문제 최소 3회분 풀어보기",
        "오답노트 작성 및 복습",
        "Oracle vs SQL Server 문법 차이 정리",
        "정규화 단계별 특징 최종 암기",
        "시험 전날은 가볍게 복습만"
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
            <span className="text-4xl">🎯</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">실전 대비</h1>
              <p className="text-gray-600">시험 전략 및 핵심 정리</p>
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
          <h3 className="font-bold text-orange-800 mb-3">💡 합격 전략 요약</h3>
          <ul className="space-y-2 text-orange-700 text-sm">
            <li>• <strong>2과목 집중</strong>: 80% 배점이므로 2과목에 가장 많은 시간 투자</li>
            <li>• <strong>기출문제</strong>: 기출 유형이 반복되므로 기출 분석 필수</li>
            <li>• <strong>SQL 실습</strong>: 직접 SQL 작성해보기 (Oracle APEX 활용)</li>
            <li>• <strong>60점 목표</strong>: 과락(40%) 없이 총점 60점 이상이면 합격</li>
          </ul>
        </div>

        <div className="mt-4 bg-amber-50 rounded-xl p-6 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3">📚 추천 학습 자료</h3>
          <ul className="space-y-2 text-amber-700 text-sm">
            <li>• 한국데이터산업진흥원 SQLD 가이드</li>
            <li>• SQL 자격검정 실전문제 (노랭이)</li>
            <li>• Oracle APEX 무료 SQL 실습 환경</li>
            <li>• 유튜브 SQLD 강의 (무료)</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`SQLD 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 예시와 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`SQLD 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 예시와 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`SQLD 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 예시와 함께 설명해주세요.`)}`}
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
