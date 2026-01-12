'use client';

import { useState } from 'react';

export default function ComputerSkills1ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/office" className="text-gray-600 hover:text-blue-600">사무·행정</a>
            <span className="text-gray-300">›</span>
            <a href="/category/office/computer-skills-1" className="text-gray-600 hover:text-blue-600">컴퓨터활용능력 1급</a>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">시험상세</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">💻</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">컴퓨터활용능력 1급 시험 상세</h1>
              <p className="text-emerald-100">필기 3과목 60문항 / 실기 엑셀+액세스 90분</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-[57px] z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('written')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'written'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              ✍️ 실기시험
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' ? (
          <div className="space-y-8">
            {/* 필기시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📋</span> 필기시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">과목수</p>
                  <p className="text-2xl font-bold text-emerald-600">3과목</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">문항수</p>
                  <p className="text-2xl font-bold text-teal-600">60문항</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-cyan-600">60분</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">합격기준</p>
                  <p className="text-2xl font-bold text-blue-600">60점 이상</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>⚠️ 과락 기준:</strong> 과목당 40점 미만 과락 (8문제 미만 정답 시 과락)
                </p>
              </div>
            </section>

            {/* 과목별 상세 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-emerald-500">📚</span> 과목별 상세
              </h2>

              {/* 1과목: 컴퓨터 일반 */}
              <div className="mb-8 border-b pb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-gray-800">컴퓨터 일반</h3>
                    <p className="text-sm text-gray-500">20문항 | 난이도 ★★★☆☆ | 합격률 65%</p>
                  </div>
                  <a href="/category/office/computer-skills-1/study/computer-general" className="ml-auto px-4 py-2 bg-emerald-100 text-emerald-600 rounded-lg text-sm hover:bg-emerald-200 transition">
                    학습하기 →
                  </a>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { topic: '컴퓨터 시스템', items: ['하드웨어 구성', 'CPU/메모리 구조', '입출력 장치'] },
                    { topic: '운영체제', items: ['Windows 기능', '프로세스 관리', '파일 시스템'] },
                    { topic: '네트워크', items: ['네트워크 개념', '프로토콜', 'IP 주소'] },
                    { topic: '정보보안', items: ['암호화 기법', '악성코드', '보안 수칙'] },
                    { topic: '멀티미디어', items: ['파일 형식', '압축 방식', '코덱'] },
                    { topic: '최신 IT', items: ['클라우드', 'IoT', 'AI 기초'] },
                  ].map((section, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-800 mb-2">{section.topic}</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {section.items.map((item, j) => (
                          <li key={j}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2과목: 스프레드시트 일반 */}
              <div className="mb-8 border-b pb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-gray-800">스프레드시트 일반</h3>
                    <p className="text-sm text-gray-500">20문항 | 난이도 ★★★★☆ | 합격률 55%</p>
                  </div>
                  <a href="/category/office/computer-skills-1/study/spreadsheet" className="ml-auto px-4 py-2 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition">
                    학습하기 →
                  </a>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { topic: '기본 함수', items: ['SUM, AVERAGE, COUNT', 'MAX, MIN, RANK', 'ROUND, INT, MOD'] },
                    { topic: '찾기/참조 함수', items: ['VLOOKUP, HLOOKUP', 'INDEX, MATCH', 'CHOOSE, OFFSET'] },
                    { topic: '논리/조건 함수', items: ['IF, AND, OR', 'SUMIF, COUNTIF', 'IFERROR, IFS'] },
                    { topic: '텍스트 함수', items: ['LEFT, RIGHT, MID', 'CONCATENATE, CONCAT', 'TRIM, SUBSTITUTE'] },
                    { topic: '날짜/시간 함수', items: ['TODAY, NOW', 'YEAR, MONTH, DAY', 'DATEDIF, WEEKDAY'] },
                    { topic: '데이터 관리', items: ['정렬, 필터', '피벗 테이블', '데이터 유효성'] },
                    { topic: '차트', items: ['차트 종류', '차트 편집', '차트 서식'] },
                    { topic: '매크로', items: ['매크로 기록', 'VBA 기초', '매크로 실행'] },
                  ].map((section, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-800 mb-2">{section.topic}</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {section.items.map((item, j) => (
                          <li key={j}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3과목: 데이터베이스 일반 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-500 text-white rounded-lg flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-gray-800">데이터베이스 일반</h3>
                    <p className="text-sm text-gray-500">20문항 | 난이도 ★★★★☆ | 합격률 50%</p>
                  </div>
                  <a href="/category/office/computer-skills-1/study/database" className="ml-auto px-4 py-2 bg-cyan-100 text-cyan-600 rounded-lg text-sm hover:bg-cyan-200 transition">
                    학습하기 →
                  </a>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { topic: 'DB 기초', items: ['데이터베이스 개념', 'DBMS 종류', '데이터 모델'] },
                    { topic: '관계형 DB', items: ['테이블, 레코드, 필드', '기본키, 외래키', '관계 설정'] },
                    { topic: '정규화', items: ['1NF, 2NF, 3NF', '이상현상', '함수적 종속'] },
                    { topic: 'SQL 기초', items: ['SELECT, FROM, WHERE', 'ORDER BY, GROUP BY', 'JOIN 종류'] },
                    { topic: 'SQL 고급', items: ['서브쿼리', '집계 함수', 'HAVING 절'] },
                    { topic: '액세스 쿼리', items: ['선택 쿼리', '매개변수 쿼리', '실행 쿼리'] },
                    { topic: '폼과 보고서', items: ['폼 디자인', '컨트롤 활용', '보고서 작성'] },
                    { topic: 'DB 관리', items: ['데이터 무결성', '트랜잭션', '백업/복구'] },
                  ].map((section, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-800 mb-2">{section.topic}</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {section.items.map((item, j) => (
                          <li key={j}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 합격 전략 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎯</span> 필기 합격 전략
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h3 className="font-bold text-emerald-700 mb-2">1과목 전략</h3>
                  <p className="text-sm text-gray-600 mb-2">컴퓨터 일반</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 암기 위주 학습</li>
                    <li>• 기출 반복률 높음</li>
                    <li>• 네트워크 용어 정리</li>
                    <li className="text-emerald-600 font-medium">→ 목표: 15/20 (75점)</li>
                  </ul>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <h3 className="font-bold text-teal-700 mb-2">2과목 전략</h3>
                  <p className="text-sm text-gray-600 mb-2">스프레드시트 일반</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 함수 문법 완벽 이해</li>
                    <li>• VLOOKUP, INDEX 집중</li>
                    <li>• 실제 엑셀 실습 병행</li>
                    <li className="text-teal-600 font-medium">→ 목표: 14/20 (70점)</li>
                  </ul>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4">
                  <h3 className="font-bold text-cyan-700 mb-2">3과목 전략</h3>
                  <p className="text-sm text-gray-600 mb-2">데이터베이스 일반</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 정규화 개념 필수</li>
                    <li>• SQL 문법 연습</li>
                    <li>• 쿼리 종류 구분</li>
                    <li className="text-cyan-600 font-medium">→ 목표: 13/20 (65점)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-center">
                  <span className="text-green-700 font-bold text-lg">42/60 정답 = 평균 70점 = </span>
                  <span className="text-green-600 font-bold text-xl">합격!</span>
                </p>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 실기시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📋</span> 실기시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험유형</p>
                  <p className="text-xl font-bold text-emerald-600">작업형</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-teal-600">90분</p>
                  <p className="text-xs text-gray-500">각 45분씩</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">사용프로그램</p>
                  <p className="text-lg font-bold text-cyan-600">Excel + Access</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">합격기준</p>
                  <p className="text-2xl font-bold text-red-600">70점 이상</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-800">
                  <strong>⚠️ 주의:</strong> 실기 합격 기준은 70점으로 필기(60점)보다 높습니다!
                </p>
              </div>
            </section>

            {/* 스프레드시트 실무 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-emerald-500">📊</span> 스프레드시트 실무 (Excel)
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* 필수 함수 */}
                <div className="p-4 border rounded-xl">
                  <h3 className="font-bold text-emerald-700 mb-3">📌 필수 함수 (매회 출제)</h3>
                  <div className="space-y-2">
                    {[
                      { func: 'VLOOKUP', desc: '세로 검색, 표에서 값 찾기' },
                      { func: 'INDEX/MATCH', desc: '행/열 교차점 값 반환' },
                      { func: 'SUMIF/COUNTIF', desc: '조건부 합계/개수' },
                      { func: 'IF/IFS', desc: '조건 분기' },
                      { func: 'ROUND/ROUNDUP', desc: '반올림, 올림' },
                      { func: 'LEFT/RIGHT/MID', desc: '문자열 추출' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-emerald-50 rounded">
                        <code className="text-emerald-700 font-mono text-sm">{item.func}</code>
                        <span className="text-xs text-gray-500">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 작업 영역 */}
                <div className="p-4 border rounded-xl">
                  <h3 className="font-bold text-teal-700 mb-3">🔧 주요 작업 영역</h3>
                  <div className="space-y-3">
                    {[
                      { area: '피벗 테이블', point: '15-20점', desc: '데이터 요약/분석' },
                      { area: '차트', point: '10-15점', desc: '막대/원형/꺾은선' },
                      { area: '데이터 유효성', point: '5-10점', desc: '목록, 범위 제한' },
                      { area: '조건부 서식', point: '5-10점', desc: '셀 강조, 데이터 막대' },
                      { area: '매크로', point: '10-15점', desc: '자동화 기록/실행' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-teal-50 rounded">
                        <span className="font-medium text-gray-800">{item.area}</span>
                        <span className="text-teal-600 font-bold">{item.point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a href="/category/office/computer-skills-1/study/spreadsheet-practical" className="mt-4 block text-center py-3 bg-emerald-100 text-emerald-700 rounded-lg font-medium hover:bg-emerald-200 transition">
                스프레드시트 실기 학습하기 →
              </a>
            </section>

            {/* 데이터베이스 실무 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-cyan-500">🗄️</span> 데이터베이스 실무 (Access)
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* 테이블/관계 */}
                <div className="p-4 border rounded-xl">
                  <h3 className="font-bold text-cyan-700 mb-3">📌 테이블 및 관계 설정</h3>
                  <div className="space-y-2">
                    {[
                      { task: '필드 속성 설정', desc: '데이터 형식, 크기, 기본값' },
                      { task: '기본 키 지정', desc: '고유 식별자 설정' },
                      { task: '입력 마스크', desc: '전화번호, 주민번호 형식' },
                      { task: '관계 설정', desc: '1:N, 참조 무결성' },
                      { task: '조회 속성', desc: '콤보 상자, 목록 상자' },
                    ].map((item, i) => (
                      <div key={i} className="p-2 bg-cyan-50 rounded">
                        <p className="font-medium text-gray-800">{item.task}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 쿼리 */}
                <div className="p-4 border rounded-xl border-red-200 bg-red-50/30">
                  <h3 className="font-bold text-red-700 mb-3">⭐ 쿼리 (가장 중요!)</h3>
                  <div className="space-y-2">
                    {[
                      { type: '선택 쿼리', desc: 'SELECT, WHERE, ORDER BY', point: '필수' },
                      { type: '매개변수 쿼리', desc: '[입력 프롬프트] 활용', point: '필수' },
                      { type: '요약 쿼리', desc: 'GROUP BY, COUNT, SUM', point: '자주' },
                      { type: '크로스탭 쿼리', desc: '행/열 교차 요약', point: '자주' },
                      { type: '실행 쿼리', desc: '테이블 만들기/추가/삭제', point: '간헐' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div>
                          <p className="font-medium text-gray-800">{item.type}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.point === '필수' ? 'bg-red-100 text-red-600' :
                          item.point === '자주' ? 'bg-orange-100 text-orange-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>{item.point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 폼과 보고서 */}
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-xl">
                  <h3 className="font-bold text-blue-700 mb-3">📋 폼 (Form)</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 폼 마법사로 기본 생성</li>
                    <li>• 컨트롤 추가 (텍스트, 콤보, 명령 버튼)</li>
                    <li>• 계산 컨트롤 (=필드명*수량)</li>
                    <li>• 하위 폼 연결</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-xl">
                  <h3 className="font-bold text-purple-700 mb-3">📊 보고서 (Report)</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 그룹화 및 정렬</li>
                    <li>• 머리글/바닥글 설정</li>
                    <li>• 요약 계산 (합계, 평균)</li>
                    <li>• 페이지 나누기</li>
                  </ul>
                </div>
              </div>

              <a href="/category/office/computer-skills-1/study/database-practical" className="mt-4 block text-center py-3 bg-cyan-100 text-cyan-700 rounded-lg font-medium hover:bg-cyan-200 transition">
                데이터베이스 실기 학습하기 →
              </a>
            </section>

            {/* 실기 시간 배분 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">⏱️</span> 실기 시간 배분 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border-2 border-emerald-200 rounded-xl">
                  <h3 className="font-bold text-emerald-700 mb-3">📊 Excel (45분)</h3>
                  <div className="space-y-2">
                    {[
                      { time: '0~15분', task: '함수 작성 (VLOOKUP 등)', color: 'bg-emerald-100 text-emerald-700' },
                      { time: '15~25분', task: '피벗 테이블 / 차트', color: 'bg-teal-100 text-teal-700' },
                      { time: '25~35분', task: '조건부 서식 / 유효성', color: 'bg-cyan-100 text-cyan-700' },
                      { time: '35~42분', task: '매크로 / 기타', color: 'bg-blue-100 text-blue-700' },
                      { time: '42~45분', task: '검토 및 저장', color: 'bg-purple-100 text-purple-700' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${item.color}`}>{item.time}</span>
                        <span className="text-gray-600">{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-2 border-cyan-200 rounded-xl">
                  <h3 className="font-bold text-cyan-700 mb-3">🗄️ Access (45분)</h3>
                  <div className="space-y-2">
                    {[
                      { time: '0~10분', task: '테이블 설계 / 관계', color: 'bg-cyan-100 text-cyan-700' },
                      { time: '10~25분', task: '쿼리 작성 (핵심!)', color: 'bg-red-100 text-red-700' },
                      { time: '25~35분', task: '폼 디자인', color: 'bg-blue-100 text-blue-700' },
                      { time: '35~42분', task: '보고서 작성', color: 'bg-purple-100 text-purple-700' },
                      { time: '42~45분', task: '검토 및 저장', color: 'bg-gray-100 text-gray-700' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${item.color}`}>{item.time}</span>
                        <span className="text-gray-600">{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 자주 틀리는 포인트 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-red-500">⚠️</span> 자주 틀리는 포인트
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { mistake: 'VLOOKUP 범위 고정 누락', solution: 'F4로 절대참조 $A$1:$D$10' },
                  { mistake: '액세스 쿼리 저장 안 함', solution: '작업 후 반드시 Ctrl+S' },
                  { mistake: '매개변수 쿼리 대괄호 누락', solution: '[검색할 이름을 입력하세요]' },
                  { mistake: '관계 설정 시 참조 무결성 누락', solution: '참조 무결성 체크박스 확인' },
                  { mistake: '피벗 테이블 새로고침 안 함', solution: '데이터 변경 후 새로고침' },
                  { mistake: '보고서 그룹화 순서 오류', solution: '그룹화 순서 확인 후 정렬' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-red-500">✗</span>
                    <div>
                      <p className="font-medium text-gray-800">{item.mistake}</p>
                      <p className="text-sm text-green-600">→ {item.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">
            본 페이지의 정보는 참고용이며, 정확한 정보는 대한상공회의소에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
