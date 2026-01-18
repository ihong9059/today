'use client';

import { useState } from 'react';

export default function WordProcessorExamPage() {
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
            <a href="/category/office/word-processor" className="text-gray-600 hover:text-blue-600">워드프로세서</a>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">시험상세</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">📄</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">워드프로세서 시험 상세</h1>
              <p className="text-blue-100">필기시험 3과목 60문항 / 실기시험 문서편집 작업형</p>
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
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-blue-500 text-blue-600'
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
                <span className="text-blue-500">📋</span> 필기시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">과목수</p>
                  <p className="text-2xl font-bold text-blue-600">3과목</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">문항수</p>
                  <p className="text-2xl font-bold text-indigo-600">60문항</p>
                </div>
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-violet-600">60분</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">합격기준</p>
                  <p className="text-2xl font-bold text-purple-600">60점 이상</p>
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
                <span className="text-blue-500">📚</span> 과목별 상세
              </h2>

              {/* 1과목: 워드프로세싱 용어 및 기능 */}
              <div className="mb-8 border-b pb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-gray-800">워드프로세싱 용어 및 기능</h3>
                    <p className="text-sm text-gray-500">20문항 | 난이도 ★★☆☆☆ | 합격률 70%</p>
                  </div>
                  <a href="/category/office/word-processor/study/word-theory" className="ml-auto px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition">
                    학습하기 →
                  </a>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { topic: '워드프로세서 개요', items: ['워드프로세서 정의', '워드프로세서 기능', '워드프로세서 종류'] },
                    { topic: '문서 작성', items: ['문서 작성 순서', '입력 장치 활용', '자판 배열'] },
                    { topic: '편집 기능', items: ['블록 지정/편집', '찾기/바꾸기', '복사/이동'] },
                    { topic: '서식 기능', items: ['글꼴/문단 서식', '스타일 적용', '번호/글머리'] },
                    { topic: '표/차트', items: ['표 삽입/편집', '차트 삽입', '셀 병합/분할'] },
                    { topic: '출력/저장', items: ['인쇄 설정', '파일 형식', '문서 보안'] },
                    { topic: '기타 기능', items: ['머리말/꼬리말', '각주/미주', '색인/목차'] },
                    { topic: '단축키', items: ['주요 단축키', 'Ctrl 조합키', 'Alt 조합키'] },
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

              {/* 2과목: PC 운영체제 */}
              <div className="mb-8 border-b pb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-500 text-white rounded-lg flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-gray-800">PC 운영체제</h3>
                    <p className="text-sm text-gray-500">20문항 | 난이도 ★★★☆☆ | 합격률 60%</p>
                  </div>
                  <a href="/category/office/word-processor/study/pc-basic" className="ml-auto px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg text-sm hover:bg-indigo-200 transition">
                    학습하기 →
                  </a>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { topic: '운영체제 기초', items: ['운영체제 정의/역할', '운영체제 종류', '부팅 과정'] },
                    { topic: 'Windows 기초', items: ['바탕화면 구성', '시작 메뉴', '작업 표시줄'] },
                    { topic: '파일 관리', items: ['파일/폴더 개념', '탐색기 사용', '파일 속성'] },
                    { topic: '제어판', items: ['시스템 설정', '프로그램 추가/제거', '사용자 계정'] },
                    { topic: '보조프로그램', items: ['메모장/그림판', '계산기/캡처도구', '명령 프롬프트'] },
                    { topic: '네트워크', items: ['네트워크 설정', '공유 폴더', '인터넷 옵션'] },
                    { topic: '시스템 관리', items: ['디스크 관리', '장치 관리자', '시스템 복원'] },
                    { topic: '보안/백업', items: ['방화벽 설정', 'Windows 업데이트', '백업/복원'] },
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

              {/* 3과목: PC 기본상식 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-violet-500 text-white rounded-lg flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-gray-800">PC 기본상식</h3>
                    <p className="text-sm text-gray-500">20문항 | 난이도 ★★☆☆☆ | 합격률 65%</p>
                  </div>
                  <a href="/category/office/word-processor/study/pc-basic" className="ml-auto px-4 py-2 bg-violet-100 text-violet-600 rounded-lg text-sm hover:bg-violet-200 transition">
                    학습하기 →
                  </a>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { topic: '컴퓨터 구조', items: ['하드웨어 구성', 'CPU 역할/종류', '주기억장치'] },
                    { topic: '보조기억장치', items: ['HDD/SSD 특징', 'USB/메모리카드', '광학드라이브'] },
                    { topic: '입출력 장치', items: ['키보드/마우스', '모니터 종류', '프린터 종류'] },
                    { topic: '소프트웨어', items: ['시스템 소프트웨어', '응용 소프트웨어', '유틸리티'] },
                    { topic: '데이터 표현', items: ['진법 변환', '문자 코드', '데이터 단위'] },
                    { topic: '네트워크 기초', items: ['네트워크 종류', 'IP 주소', '프로토콜'] },
                    { topic: '인터넷', items: ['인터넷 서비스', '웹 브라우저', '검색 엔진'] },
                    { topic: '정보 보안', items: ['악성코드 종류', '암호화 기법', '보안 수칙'] },
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
                <span className="text-blue-500">🎯</span> 필기 합격 전략
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-blue-700 mb-2">1과목 전략</h3>
                  <p className="text-sm text-gray-600 mb-2">워드프로세싱 용어</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 용어 암기가 핵심</li>
                    <li>• 단축키 외우기</li>
                    <li>• 반복 출제 문제 파악</li>
                    <li className="text-blue-600 font-medium">→ 목표: 16/20 (80점)</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-bold text-indigo-700 mb-2">2과목 전략</h3>
                  <p className="text-sm text-gray-600 mb-2">PC 운영체제</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Windows 실습 병행</li>
                    <li>• 설정 화면 익히기</li>
                    <li>• 경로/메뉴 구조 파악</li>
                    <li className="text-indigo-600 font-medium">→ 목표: 14/20 (70점)</li>
                  </ul>
                </div>
                <div className="bg-violet-50 rounded-lg p-4">
                  <h3 className="font-bold text-violet-700 mb-2">3과목 전략</h3>
                  <p className="text-sm text-gray-600 mb-2">PC 기본상식</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 암기 위주 학습</li>
                    <li>• 진법 변환 연습</li>
                    <li>• 네트워크 용어 정리</li>
                    <li className="text-violet-600 font-medium">→ 목표: 15/20 (75점)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-center">
                  <span className="text-green-700 font-bold text-lg">45/60 정답 = 평균 75점 = </span>
                  <span className="text-green-600 font-bold text-xl">합격!</span>
                </p>
              </div>
            </section>

            {/* 출제 경향 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">📊</span> 최근 출제 경향
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🔄</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">기출 반복률 높음</p>
                    <p className="text-sm text-gray-500">과거 기출문제에서 70% 이상 유사 문제 출제</p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">필수</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">⌨️</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">단축키 문제 다수</p>
                    <p className="text-sm text-gray-500">한글/워드 단축키 10문제 이상 출제</p>
                  </div>
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">중요</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🖼️</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">화면 캡처 문제</p>
                    <p className="text-sm text-gray-500">실제 프로그램 화면 보고 기능 선택</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-medium">주의</span>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 실기시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">📋</span> 실기시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험유형</p>
                  <p className="text-xl font-bold text-blue-600">작업형</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-indigo-600">30분</p>
                </div>
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">사용프로그램</p>
                  <p className="text-lg font-bold text-violet-600">한글/MS Word</p>
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

            {/* 실기 영역별 상세 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-blue-500">✍️</span> 영역별 배점 및 상세
              </h2>

              {/* 스타일 지정 */}
              <div className="mb-6 p-4 border rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="font-bold text-gray-800">스타일 지정</h3>
                      <p className="text-sm text-gray-500">글꼴, 크기, 정렬, 색상 등</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">25점</p>
                    <p className="text-sm text-gray-500">25%</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    '글꼴 종류 및 크기 변경',
                    '굵게/기울임/밑줄 적용',
                    '정렬 (왼쪽/가운데/오른쪽)',
                    '줄간격/문단간격 설정',
                    '글자색/배경색 지정',
                    '들여쓰기/내어쓰기',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-blue-500">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 표 작성 */}
              <div className="mb-6 p-4 border rounded-xl border-red-200 bg-red-50/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="font-bold text-gray-800">표 작성</h3>
                      <p className="text-sm text-red-600 font-medium">⭐ 가장 배점 높음!</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">30점</p>
                    <p className="text-sm text-gray-500">30%</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    '표 삽입 (행/열 지정)',
                    '셀 병합/분할',
                    '표 테두리 스타일',
                    '셀 배경색 지정',
                    '셀 내 정렬',
                    '표 크기 조절',
                    '대각선 긋기',
                    '캡션 삽입',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-red-500">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 그림/차트 */}
              <div className="mb-6 p-4 border rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="font-bold text-gray-800">그림/차트 삽입</h3>
                      <p className="text-sm text-gray-500">이미지, 도형, 차트 활용</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">25점</p>
                    <p className="text-sm text-gray-500">25%</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    '그림 삽입 및 크기 조절',
                    '그림 위치 지정',
                    '글자처럼 취급/어울림',
                    '도형 삽입/편집',
                    '차트 삽입 (막대/원형)',
                    '워터마크 삽입',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 문서 서식 */}
              <div className="p-4 border rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-lg flex items-center justify-center font-bold">4</div>
                    <div>
                      <h3 className="font-bold text-gray-800">문서 서식</h3>
                      <p className="text-sm text-gray-500">페이지 설정, 머리말/꼬리말</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">20점</p>
                    <p className="text-sm text-gray-500">20%</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    '용지 방향/크기 설정',
                    '여백 설정',
                    '머리말/꼬리말 삽입',
                    '쪽 번호 삽입',
                    '다단 설정',
                    '각주/미주 삽입',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-purple-500">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 실기 합격 전략 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">🎯</span> 실기 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800">⚡ 시간 관리 (30분)</h3>
                  <div className="space-y-2">
                    {[
                      { time: '0~5분', task: '문제 파악 + 기본 입력', color: 'bg-blue-100 text-blue-700' },
                      { time: '5~15분', task: '스타일 지정 완료', color: 'bg-indigo-100 text-indigo-700' },
                      { time: '15~22분', task: '표 작성 (가장 중요!)', color: 'bg-red-100 text-red-700' },
                      { time: '22~27분', task: '그림/서식 작업', color: 'bg-green-100 text-green-700' },
                      { time: '27~30분', task: '최종 검토 + 저장', color: 'bg-purple-100 text-purple-700' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${item.color}`}>{item.time}</span>
                        <span className="text-gray-600">{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800">💡 핵심 TIP</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <p className="font-medium text-amber-800">⌨️ 단축키 필수 암기</p>
                      <p className="text-sm text-amber-700">Ctrl+S(저장), Ctrl+A(전체선택) 등</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="font-medium text-red-800">📊 표 작업 연습 집중</p>
                      <p className="text-sm text-red-700">30점 배점, 완벽히 마스터해야 합격</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-800">💾 수시로 저장!</p>
                      <p className="text-sm text-blue-700">작업 중 프로그램 오류 대비</p>
                    </div>
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
                  { mistake: '표 테두리 스타일 누락', solution: '모든 테두리 속성 확인' },
                  { mistake: '셀 병합 방향 오류', solution: '가로/세로 방향 주의' },
                  { mistake: '글꼴 크기 오차', solution: 'pt 단위 정확히 입력' },
                  { mistake: '정렬 방식 혼동', solution: '문단/셀 정렬 구분' },
                  { mistake: '그림 위치 설정 오류', solution: '어울림/글자처럼 취급 구분' },
                  { mistake: '저장 안 하고 종료', solution: '작업 완료 후 반드시 저장' },
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

            {/* 실기 학습하기 링크 */}
            <section className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-md p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">실기 문제 연습하기</h2>
                  <p className="text-blue-100">실기 출제 유형별 25문항으로 연습하세요</p>
                </div>
                <a href="/category/office/word-processor/study/word-practical"
                   className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition">
                  실기 학습 시작 →
                </a>
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
