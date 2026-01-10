'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SQLDSQLBasicPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('sqld-sqlbasic-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('sqld-sqlbasic-completed', JSON.stringify(items));
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
      title: "관계형 데이터베이스 개요",
      icon: "🗃️",
      items: [
        "DBMS: 데이터베이스를 관리하는 소프트웨어 시스템",
        "관계형 DB 특징: 2차원 테이블 구조, 집합 연산, 정규화",
        "SQL 종류: DDL, DML, DCL, TCL로 분류",
        "테이블(Table): 행(Row)과 열(Column)로 구성된 데이터 저장소",
        "기본키(Primary Key): 테이블에서 행을 유일하게 식별하는 컬럼",
        "외래키(Foreign Key): 다른 테이블의 기본키를 참조하는 컬럼",
        "NULL: 값이 없음(알 수 없음)을 의미, 0이나 공백과 다름",
        "ERD와 테이블 관계 이해: 1:1, 1:N, M:N",
        "무결성 제약조건: 개체, 참조, 도메인, 사용자 정의",
        "ANSI SQL 표준과 DBMS별 차이점"
      ]
    },
    {
      title: "DDL (Data Definition Language)",
      icon: "🏗️",
      items: [
        "CREATE TABLE: 테이블 생성 명령어",
        "데이터 타입: CHAR, VARCHAR, NUMBER, DATE 등",
        "CHAR vs VARCHAR: 고정길이 vs 가변길이",
        "제약조건: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK",
        "DEFAULT: 기본값 설정",
        "ALTER TABLE ADD: 컬럼 추가",
        "ALTER TABLE MODIFY: 컬럼 속성 변경",
        "ALTER TABLE DROP: 컬럼 삭제",
        "DROP TABLE: 테이블 삭제 (구조+데이터 모두)",
        "TRUNCATE TABLE: 데이터만 삭제 (구조 유지, DDL)",
        "RENAME: 테이블명 변경",
        "CASCADE: 참조 무결성에 따른 연쇄 삭제"
      ]
    },
    {
      title: "DML (Data Manipulation Language)",
      icon: "📝",
      items: [
        "SELECT: 데이터 조회 명령어",
        "INSERT INTO: 데이터 삽입",
        "INSERT 컬럼 지정: INSERT INTO 테이블(컬럼) VALUES(값)",
        "UPDATE SET: 데이터 수정",
        "UPDATE WHERE: 조건부 수정 (WHERE 없으면 전체 수정)",
        "DELETE FROM: 데이터 삭제 (DML, ROLLBACK 가능)",
        "DELETE vs TRUNCATE vs DROP 차이 완벽 이해",
        "MERGE: INSERT와 UPDATE를 한번에 처리",
        "DML은 트랜잭션 대상 (COMMIT/ROLLBACK 가능)",
        "AUTO COMMIT 설정에 따른 차이"
      ]
    },
    {
      title: "SELECT 문법 기초",
      icon: "🔍",
      items: [
        "SELECT 절: 조회할 컬럼 지정",
        "FROM 절: 조회할 테이블 지정",
        "WHERE 절: 조회 조건 지정",
        "SELECT DISTINCT: 중복 제거",
        "컬럼 별칭(Alias): AS 키워드 또는 공백으로 지정",
        "테이블 별칭: FROM 테이블명 별칭",
        "연결 연산자(||): 문자열 결합 (Oracle)",
        "CONCAT 함수: 문자열 결합 (SQL Server)",
        "산술 연산자: +, -, *, /",
        "NULL 연산: NULL과의 연산 결과는 NULL"
      ]
    },
    {
      title: "WHERE 절과 연산자",
      icon: "🎯",
      items: [
        "비교 연산자: =, <>, <, >, <=, >=",
        "SQL 연산자: BETWEEN, IN, LIKE, IS NULL",
        "BETWEEN A AND B: A 이상 B 이하",
        "IN (값1, 값2, ...): OR 조건의 간편 표현",
        "LIKE: 패턴 매칭 (%: 0개 이상, _: 1개 문자)",
        "IS NULL / IS NOT NULL: NULL 비교 (=로 비교 불가)",
        "논리 연산자: AND, OR, NOT",
        "연산자 우선순위: (), NOT, AND, OR 순서",
        "ESCAPE: LIKE에서 특수문자 검색 시 사용",
        "부정 연산: <>, !=, ^=, NOT BETWEEN, NOT IN, NOT LIKE"
      ]
    },
    {
      title: "함수 - 문자형",
      icon: "📄",
      items: [
        "UPPER/LOWER/INITCAP: 대문자/소문자/첫글자대문자",
        "LENGTH/LEN: 문자열 길이 (Oracle/SQL Server)",
        "SUBSTR/SUBSTRING: 문자열 자르기 (시작위치, 길이)",
        "INSTR: 특정 문자 위치 찾기 (Oracle)",
        "CHARINDEX: 특정 문자 위치 찾기 (SQL Server)",
        "REPLACE: 문자열 치환",
        "LPAD/RPAD: 왼쪽/오른쪽 문자 채우기",
        "LTRIM/RTRIM/TRIM: 공백 제거",
        "CONCAT: 문자열 결합 함수",
        "ASCII/CHR: ASCII 코드 변환"
      ]
    },
    {
      title: "함수 - 숫자형",
      icon: "🔢",
      items: [
        "ROUND: 반올림 (소수점 자리 지정)",
        "TRUNC: 버림 (Oracle)",
        "FLOOR: 내림 (정수 부분만)",
        "CEIL/CEILING: 올림",
        "MOD: 나머지 연산",
        "ABS: 절대값",
        "SIGN: 부호 (양수:1, 음수:-1, 0:0)",
        "POWER: 거듭제곱",
        "SQRT: 제곱근",
        "EXP/LN/LOG: 지수/자연로그/로그"
      ]
    },
    {
      title: "함수 - 날짜형",
      icon: "📅",
      items: [
        "SYSDATE: 현재 날짜/시간 (Oracle)",
        "GETDATE(): 현재 날짜/시간 (SQL Server)",
        "날짜 연산: 날짜 + 숫자 = 날짜",
        "ADD_MONTHS: 월 더하기 (Oracle)",
        "DATEADD: 날짜 더하기 (SQL Server)",
        "MONTHS_BETWEEN: 두 날짜 간 월 수 (Oracle)",
        "DATEDIFF: 날짜 차이 (SQL Server)",
        "LAST_DAY: 해당 월의 마지막 날짜",
        "NEXT_DAY: 다음 특정 요일의 날짜",
        "EXTRACT: 날짜에서 특정 부분 추출"
      ]
    },
    {
      title: "함수 - 변환형",
      icon: "🔄",
      items: [
        "TO_CHAR: 숫자/날짜를 문자로 변환 (Oracle)",
        "TO_NUMBER: 문자를 숫자로 변환 (Oracle)",
        "TO_DATE: 문자를 날짜로 변환 (Oracle)",
        "CAST: 데이터 타입 변환 (표준 SQL)",
        "CONVERT: 데이터 타입 변환 (SQL Server)",
        "날짜 포맷: YYYY, MM, DD, HH24, MI, SS",
        "숫자 포맷: 9, 0, $, L (화폐), , (콤마)",
        "암시적 형변환: 자동 변환 (성능 저하 주의)",
        "명시적 형변환: 함수를 사용한 명확한 변환",
        "NLS 설정: 국가별 언어 설정"
      ]
    },
    {
      title: "함수 - NULL 관련",
      icon: "❓",
      items: [
        "NVL(expr1, expr2): NULL이면 expr2 반환 (Oracle)",
        "ISNULL(expr1, expr2): NULL이면 expr2 반환 (SQL Server)",
        "NVL2(expr1, expr2, expr3): NULL이면 expr3, 아니면 expr2",
        "NULLIF(expr1, expr2): 같으면 NULL, 다르면 expr1",
        "COALESCE(expr1, expr2, ...): 첫 번째 NOT NULL 값 반환",
        "NULL과 집계함수: COUNT(*) vs COUNT(컬럼)",
        "NULL의 정렬: Oracle(마지막), SQL Server(처음)",
        "NULLS FIRST / NULLS LAST: NULL 정렬 순서 지정",
        "NULL 비교 시 주의사항: = 대신 IS NULL 사용",
        "빈 문자열과 NULL: Oracle에서는 같은 취급"
      ]
    },
    {
      title: "CASE 표현식",
      icon: "🔀",
      items: [
        "Simple CASE: CASE 컬럼 WHEN 값 THEN 결과",
        "Searched CASE: CASE WHEN 조건 THEN 결과",
        "ELSE 절: 조건에 맞지 않을 때 기본값",
        "CASE 중첩: CASE 안에 CASE 사용 가능",
        "DECODE (Oracle): CASE의 간단한 형태",
        "DECODE vs CASE: DECODE는 동등 비교만 가능",
        "SELECT 절에서 CASE 사용",
        "WHERE 절에서 CASE 사용",
        "ORDER BY 절에서 CASE 사용",
        "집계 함수와 CASE 결합: 조건부 집계"
      ]
    },
    {
      title: "TCL (Transaction Control Language)",
      icon: "💾",
      items: [
        "트랜잭션: 논리적 작업 단위 (All or Nothing)",
        "ACID 속성: 원자성, 일관성, 고립성, 지속성",
        "COMMIT: 트랜잭션 확정 (영구 저장)",
        "ROLLBACK: 트랜잭션 취소 (이전 상태로)",
        "SAVEPOINT: 트랜잭션 중간 저장점",
        "ROLLBACK TO SAVEPOINT: 특정 지점까지만 취소",
        "자동 COMMIT: DDL, 정상 종료 시",
        "자동 ROLLBACK: 비정상 종료 시",
        "LOCK: 동시성 제어를 위한 잠금",
        "트랜잭션 격리 수준: READ UNCOMMITTED ~ SERIALIZABLE"
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
            <span className="text-4xl">💾</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">SQL 기본</h1>
              <p className="text-gray-600">2과목 기초 문법 핵심 개념</p>
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
          <h3 className="font-bold text-orange-800 mb-3">💡 SQL 기본 학습 전략</h3>
          <ul className="space-y-2 text-orange-700 text-sm">
            <li>• <strong>핵심</strong>: DDL/DML/TCL 문법 완벽 이해</li>
            <li>• <strong>실습</strong>: 직접 SQL 쿼리 작성 연습 필수</li>
            <li>• <strong>주의</strong>: NULL 처리, 함수별 DBMS 차이</li>
            <li>• <strong>빈출</strong>: CASE 표현식, 날짜 함수, 형변환</li>
          </ul>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestion}</p>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(`SQLD SQL 기본 관련 질문입니다: "${currentQuestion}" - 예시 SQL과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`SQLD SQL 기본 관련 질문입니다: "${currentQuestion}" - 예시 SQL과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`SQLD SQL 기본 관련 질문입니다: "${currentQuestion}" - 예시 SQL과 함께 자세히 설명해주세요.`)}`}
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
