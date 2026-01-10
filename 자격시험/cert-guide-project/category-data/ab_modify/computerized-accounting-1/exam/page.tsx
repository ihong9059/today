'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ComputerizedAccounting1ExamPage() {
  const [activeTab, setActiveTab] = useState<'theory' | 'practical'>('theory');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-accounting-1" className="text-gray-500 hover:text-gray-700">전산회계 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전산회계 1급 시험 상세</h1>
          <p className="text-gray-600">필기시험과 실기시험의 상세 정보 및 출제 경향을 확인하세요.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('theory')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'theory' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border'}`}>
            📝 필기시험
          </button>
          <button onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'practical' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border'}`}>
            💻 실기시험
          </button>
        </div>

        {/* Theory Tab Content */}
        {activeTab === 'theory' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📋</span> 필기시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">과목 수</div>
                  <div className="text-2xl font-bold text-indigo-600">3과목</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">총 문항</div>
                  <div className="text-2xl font-bold text-indigo-600">30문항</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">시험 시간</div>
                  <div className="text-2xl font-bold text-indigo-600">40분</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">합격 기준</div>
                  <div className="text-2xl font-bold text-indigo-600">70점</div>
                </div>
              </div>
            </section>

            {/* Subject 1: 회계원리 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold">1</span>
                  회계원리
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">10문항</span>
                  <span className="text-yellow-500">★★★☆☆</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">📌 주요 출제 토픽</h3>
                  <div className="space-y-2">
                    {[
                      { topic: '회계의 기본원리', freq: '매회', desc: '회계의 정의, 목적, 기본가정' },
                      { topic: '계정과목 분류', freq: '매회', desc: '자산, 부채, 자본, 수익, 비용 분류' },
                      { topic: '분개와 전기', freq: '매회', desc: '거래의 8요소, 분개 방법' },
                      { topic: '결산 절차', freq: '자주', desc: '결산정리분개, 수정분개' },
                      { topic: '재무제표 작성', freq: '자주', desc: '재무상태표, 손익계산서' },
                      { topic: '현금및현금성자산', freq: '자주', desc: '현금과부족, 당좌예금' },
                      { topic: '채권채무', freq: '간헐', desc: '매출채권, 대손충당금' },
                      { topic: '유형자산', freq: '간헐', desc: '감가상각, 자산처분' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{item.topic}</span>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${item.freq === '매회' ? 'bg-red-100 text-red-600' : item.freq === '자주' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                          {item.freq}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">💡 학습 전략</h3>
                  <div className="space-y-3">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <h4 className="font-medium text-indigo-800 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• 계정과목별 차변/대변 성격 완벽 암기</li>
                        <li>• 분개 문제 반복 연습 (최소 100문제)</li>
                        <li>• 결산정리분개 유형별 정리</li>
                        <li>• 재무제표 작성 순서 이해</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 mb-2">자주 틀리는 유형</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• 선급/미지급 vs 선수/미수 혼동</li>
                        <li>• 감가상각비 계산 실수</li>
                        <li>• 대손충당금 설정/환입 분개</li>
                      </ul>
                    </div>
                  </div>
                  <Link href="/category/accounting/computerized-accounting-1/study/accounting-principle"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    <span>📚</span> 회계원리 학습하기
                  </Link>
                </div>
              </div>
            </section>

            {/* Subject 2: 원가회계 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">2</span>
                  원가회계
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">10문항</span>
                  <span className="text-yellow-500">★★★★☆</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">📌 주요 출제 토픽</h3>
                  <div className="space-y-2">
                    {[
                      { topic: '원가의 개념', freq: '매회', desc: '원가의 정의, 분류, 흐름' },
                      { topic: '재료비 계산', freq: '매회', desc: '선입선출, 평균법, 후입선출' },
                      { topic: '노무비 계산', freq: '자주', desc: '직접노무비, 간접노무비' },
                      { topic: '제조간접비 배부', freq: '매회', desc: '배부기준, 배부차이' },
                      { topic: '개별원가계산', freq: '자주', desc: '작업지시서별 원가계산' },
                      { topic: '종합원가계산', freq: '자주', desc: '완성품환산량, 공손품' },
                      { topic: '표준원가', freq: '간헐', desc: '표준원가 설정, 차이분석' },
                      { topic: '원가계산 흐름', freq: '매회', desc: '제조원가명세서, 손익계산서' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{item.topic}</span>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${item.freq === '매회' ? 'bg-red-100 text-red-600' : item.freq === '자주' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                          {item.freq}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">💡 학습 전략</h3>
                  <div className="space-y-3">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-800 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• 제조원가 흐름도 완벽 이해</li>
                        <li>• 재료비 계산 공식 암기</li>
                        <li>• 제조간접비 배부율 계산 연습</li>
                        <li>• 완성품환산량 개념 정확히 이해</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 mb-2">자주 틀리는 유형</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• 기초재공품 처리 방법 혼동</li>
                        <li>• 정상공손 vs 비정상공손 구분</li>
                        <li>• 배부차이 조정 분개</li>
                      </ul>
                    </div>
                  </div>
                  <Link href="/category/accounting/computerized-accounting-1/study/cost-accounting"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    <span>📚</span> 원가회계 학습하기
                  </Link>
                </div>
              </div>
            </section>

            {/* Subject 3: 세무회계 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold">3</span>
                  세무회계
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">10문항</span>
                  <span className="text-yellow-500">★★★☆☆</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">📌 주요 출제 토픽</h3>
                  <div className="space-y-2">
                    {[
                      { topic: '부가가치세 개요', freq: '매회', desc: '납세의무자, 과세기간' },
                      { topic: '과세거래', freq: '매회', desc: '재화·용역 공급, 수입' },
                      { topic: '영세율과 면세', freq: '자주', desc: '영세율 적용, 면세사업' },
                      { topic: '세금계산서', freq: '매회', desc: '발급의무, 필요적 기재사항' },
                      { topic: '과세표준', freq: '자주', desc: '공급가액, 부수재화' },
                      { topic: '매입세액공제', freq: '자주', desc: '공제요건, 불공제 항목' },
                      { topic: '신고와 납부', freq: '매회', desc: '예정·확정신고, 납부기한' },
                      { topic: '가산세', freq: '자주', desc: '신고불성실, 납부불성실' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{item.topic}</span>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${item.freq === '매회' ? 'bg-red-100 text-red-600' : item.freq === '자주' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                          {item.freq}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">💡 학습 전략</h3>
                  <div className="space-y-3">
                    <div className="bg-pink-50 rounded-lg p-4">
                      <h4 className="font-medium text-pink-800 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-pink-700 space-y-1">
                        <li>• 부가세 신고서 작성 흐름 이해</li>
                        <li>• 세금계산서 발급 시기 정확히 암기</li>
                        <li>• 매입세액 불공제 항목 암기</li>
                        <li>• 가산세 종류별 계산 방법 정리</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 mb-2">자주 틀리는 유형</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• 영세율 vs 면세 차이 혼동</li>
                        <li>• 공급시기 판단 오류</li>
                        <li>• 가산세 계산 실수</li>
                      </ul>
                    </div>
                  </div>
                  <Link href="/category/accounting/computerized-accounting-1/study/tax-accounting"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
                    <span>📚</span> 세무회계 학습하기
                  </Link>
                </div>
              </div>
            </section>

            {/* Pass Strategy */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 필기시험 합격 전략</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">1단계: 기본기 다지기</h3>
                  <p className="text-sm text-indigo-100">회계원리의 분개를 완벽히 익히세요. 모든 과목의 기초입니다.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">2단계: 계산 연습</h3>
                  <p className="text-sm text-indigo-100">원가회계 계산문제를 반복하여 속도와 정확도를 높이세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">3단계: 기출 분석</h3>
                  <p className="text-sm text-indigo-100">최근 10회분 기출문제를 풀며 출제 패턴을 파악하세요.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Practical Tab Content */}
        {activeTab === 'practical' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-purple-500">💻</span> 실기시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">시험 유형</div>
                  <div className="text-xl font-bold text-purple-600">실무형</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">시험 시간</div>
                  <div className="text-2xl font-bold text-purple-600">70분</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">사용 프로그램</div>
                  <div className="text-xl font-bold text-purple-600">케이렙</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">합격 기준</div>
                  <div className="text-2xl font-bold text-purple-600">70점</div>
                </div>
              </div>
            </section>

            {/* Practical Areas */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-purple-500">📊</span> 실기시험 영역별 상세
              </h2>

              <div className="space-y-6">
                {/* Area 1 */}
                <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">기초정보관리</h3>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">10%</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">출제 내용</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 회사등록정보 수정</li>
                        <li>• 거래처 등록 및 수정</li>
                        <li>• 계정과목 설정</li>
                        <li>• 기초잔액 입력</li>
                        <li>• 전기분 재무제표 입력</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ 거래처코드 체계 이해</li>
                        <li>✓ 기초잔액 차변/대변 확인</li>
                        <li>✓ 전기 재무제표 입력 순서</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Area 2 */}
                <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">거래자료입력</h3>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">30%</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">출제 내용</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 일반전표 입력 (현금, 대체)</li>
                        <li>• 매입매출전표 입력</li>
                        <li>• 어음거래 처리</li>
                        <li>• 고정자산 등록/처분</li>
                        <li>• 통장거래 입력</li>
                        <li>• 카드거래 처리</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ 전표 유형 선택 정확히</li>
                        <li>✓ 부가세 자동분개 확인</li>
                        <li>✓ 거래처 연결 필수</li>
                        <li>✓ 적요 입력 습관화</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Area 3 */}
                <div className="border-l-4 border-orange-500 bg-orange-50 rounded-r-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">부가가치세</h3>
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">30%</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">출제 내용</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 매출/매입처별세금계산서합계표</li>
                        <li>• 부가가치세 신고서 작성</li>
                        <li>• 영세율 첨부서류</li>
                        <li>• 대손세액공제</li>
                        <li>• 신용카드매출전표 등 수령명세</li>
                        <li>• 건물 등 감가상각자산취득명세서</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ 신고서 자동작성 후 검토</li>
                        <li>✓ 불공제 매입세액 확인</li>
                        <li>✓ 가산세 자동계산 검증</li>
                        <li>✓ 첨부서류 누락 주의</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Area 4 */}
                <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">결산/재무제표</h3>
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">30%</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">출제 내용</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 결산자료 입력</li>
                        <li>• 감가상각비 계산/입력</li>
                        <li>• 대손충당금 설정</li>
                        <li>• 재고자산평가</li>
                        <li>• 재무상태표 조회/인쇄</li>
                        <li>• 손익계산서 조회/인쇄</li>
                        <li>• 합계잔액시산표 조회</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ 결산정리분개 정확히</li>
                        <li>✓ 감가상각 월할계산</li>
                        <li>✓ 재무제표 일치 확인</li>
                        <li>✓ 출력 전 검토 필수</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Frequency Table */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-purple-500">📈</span> 최근 출제 빈도
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium">출제 내용</th>
                      <th className="text-center p-3 font-medium">빈도</th>
                      <th className="text-center p-3 font-medium">배점</th>
                      <th className="text-left p-3 font-medium">대비 전략</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { content: '일반전표입력', freq: '매회', score: '15점', strategy: '분개 실력이 기본' },
                      { content: '매입매출전표', freq: '매회', score: '10점', strategy: '세금계산서 연동 숙지' },
                      { content: '부가세 신고서', freq: '매회', score: '20점', strategy: '자동작성 후 검토 필수' },
                      { content: '결산자료입력', freq: '매회', score: '15점', strategy: '결산정리분개 암기' },
                      { content: '재무제표출력', freq: '매회', score: '10점', strategy: '출력 형식 익히기' },
                      { content: '합계표작성', freq: '자주', score: '10점', strategy: '거래처 연결 확인' },
                      { content: '고정자산관리', freq: '자주', score: '10점', strategy: '감가상각 방법 이해' },
                      { content: '어음관리', freq: '간헐', score: '10점', strategy: '어음거래 흐름 파악' }
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="p-3 font-medium">{item.content}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs ${item.freq === '매회' ? 'bg-red-100 text-red-600' : item.freq === '자주' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                            {item.freq}
                          </span>
                        </td>
                        <td className="p-3 text-center font-medium text-purple-600">{item.score}</td>
                        <td className="p-3 text-gray-600">{item.strategy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* KcLep Tips */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-purple-500">⌨️</span> 케이렙(KcLep) 단축키
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3 text-gray-900">기본 단축키</h3>
                  <div className="space-y-2">
                    {[
                      { key: 'F2', desc: '코드도움 (거래처, 계정과목 검색)' },
                      { key: 'F3', desc: '달력 호출' },
                      { key: 'F4', desc: '전표 저장' },
                      { key: 'F5', desc: '조회/검색' },
                      { key: 'F7', desc: '인쇄' },
                      { key: 'F8', desc: '삭제' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-mono text-sm">{item.key}</span>
                        <span className="text-sm">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3 text-gray-900">전표입력 단축키</h3>
                  <div className="space-y-2">
                    {[
                      { key: 'Ctrl+N', desc: '새 전표 추가' },
                      { key: 'Ctrl+D', desc: '전표 복사' },
                      { key: 'Tab', desc: '다음 필드로 이동' },
                      { key: 'Enter', desc: '입력 확인 / 다음 행' },
                      { key: 'Page Down', desc: '다음 전표' },
                      { key: 'Ctrl+S', desc: '저장 후 계속' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-mono text-sm">{item.key}</span>
                        <span className="text-sm">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Pass Strategy */}
            <section className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 실기시험 합격 전략</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">1단계: 프로그램 익히기</h3>
                  <p className="text-sm text-purple-100">케이렙 메뉴 구조와 단축키를 완벽히 숙지하세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">2단계: 속도 올리기</h3>
                  <p className="text-sm text-purple-100">반복 연습으로 전표입력 속도를 높이세요. 70분은 짧습니다.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">3단계: 실전 연습</h3>
                  <p className="text-sm text-purple-100">기출문제를 시간 재고 풀어보며 실전 감각을 키우세요.</p>
                </div>
              </div>
              <Link href="/category/accounting/computerized-accounting-1/study/practical"
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition">
                <span>💻</span> 실기 연습 시작하기
              </Link>
            </section>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            본 사이트는 학습 참고용이며, 정확한 시험 정보는
            <a href="https://license.kacpta.or.kr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline ml-1">한국세무사회 자격시험</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
