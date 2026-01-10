'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ComputerizedAccounting2ExamPage() {
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
            <Link href="/category/accounting/computerized-accounting-2" className="text-gray-500 hover:text-gray-700">전산회계 2급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전산회계 2급 시험 상세</h1>
          <p className="text-gray-600">필기시험과 실기시험의 상세 정보 및 출제 경향을 확인하세요.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('theory')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'theory' ? 'bg-teal-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border'}`}>
            📝 필기시험
          </button>
          <button onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'practical' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border'}`}>
            💻 실기시험
          </button>
        </div>

        {/* Theory Tab Content */}
        {activeTab === 'theory' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📋</span> 필기시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">과목 수</div>
                  <div className="text-2xl font-bold text-teal-600">1과목</div>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">총 문항</div>
                  <div className="text-2xl font-bold text-teal-600">20문항</div>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">시험 시간</div>
                  <div className="text-2xl font-bold text-teal-600">30분</div>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">합격 기준</div>
                  <div className="text-2xl font-bold text-teal-600">70점</div>
                </div>
              </div>
            </section>

            {/* Subject Detail */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold">1</span>
                  회계원리 기초
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">20문항</span>
                  <span className="text-yellow-500">★★☆☆☆</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">📌 주요 출제 토픽</h3>
                  <div className="space-y-2">
                    {[
                      { topic: '회계의 기본개념', freq: '매회', desc: '회계의 정의, 목적, 기본원리' },
                      { topic: '계정과목 분류', freq: '매회', desc: '자산, 부채, 자본, 수익, 비용' },
                      { topic: '분개의 원리', freq: '매회', desc: '거래의 8요소, 차변/대변 구분' },
                      { topic: '전표의 종류', freq: '자주', desc: '입금, 출금, 대체전표' },
                      { topic: '장부의 종류', freq: '자주', desc: '분개장, 총계정원장, 일계표' },
                      { topic: '재무제표 기초', freq: '자주', desc: '재무상태표, 손익계산서 구조' },
                      { topic: '현금과 예금', freq: '간헐', desc: '현금및현금성자산, 당좌예금' },
                      { topic: '채권과 채무', freq: '간헐', desc: '외상매출금, 외상매입금' }
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
                    <div className="bg-teal-50 rounded-lg p-4">
                      <h4 className="font-medium text-teal-800 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-teal-700 space-y-1">
                        <li>• 차변(왼쪽)은 자산 증가, 부채/자본 감소</li>
                        <li>• 대변(오른쪽)은 자산 감소, 부채/자본 증가</li>
                        <li>• 계정과목 30개만 완벽히 암기</li>
                        <li>• 기본 분개 유형 10가지 반복</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 mb-2">자주 틀리는 유형</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• 수익/비용의 차대변 혼동</li>
                        <li>• 선급금 vs 선수금 구분</li>
                        <li>• 외상매출금 vs 미수금 구분</li>
                      </ul>
                    </div>
                  </div>
                  <Link href="/category/accounting/computerized-accounting-2/study/accounting-basics"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                    <span>📚</span> 회계기초 학습하기
                  </Link>
                </div>
              </div>
            </section>

            {/* Key Concepts */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📖</span> 핵심 개념 정리
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">계정과목 분류</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">분류</th>
                        <th className="text-left py-2">성격</th>
                        <th className="text-left py-2">예시</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr><td className="py-2 font-medium text-blue-600">자산</td><td>소유 재산</td><td>현금, 매출채권</td></tr>
                      <tr><td className="py-2 font-medium text-red-600">부채</td><td>갚을 의무</td><td>매입채무, 차입금</td></tr>
                      <tr><td className="py-2 font-medium text-green-600">자본</td><td>순자산</td><td>자본금, 이익잉여금</td></tr>
                      <tr><td className="py-2 font-medium text-purple-600">수익</td><td>벌어들인 것</td><td>매출, 이자수익</td></tr>
                      <tr><td className="py-2 font-medium text-orange-600">비용</td><td>쓴 것</td><td>급여, 임차료</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">차변/대변 증감 규칙</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">계정</th>
                        <th className="text-center py-2">차변(왼쪽)</th>
                        <th className="text-center py-2">대변(오른쪽)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr><td className="py-2 font-medium text-blue-600">자산</td><td className="text-center text-green-600">증가 (+)</td><td className="text-center text-red-600">감소 (-)</td></tr>
                      <tr><td className="py-2 font-medium text-red-600">부채</td><td className="text-center text-red-600">감소 (-)</td><td className="text-center text-green-600">증가 (+)</td></tr>
                      <tr><td className="py-2 font-medium text-green-600">자본</td><td className="text-center text-red-600">감소 (-)</td><td className="text-center text-green-600">증가 (+)</td></tr>
                      <tr><td className="py-2 font-medium text-purple-600">수익</td><td className="text-center text-red-600">감소 (-)</td><td className="text-center text-green-600">증가 (+)</td></tr>
                      <tr><td className="py-2 font-medium text-orange-600">비용</td><td className="text-center text-green-600">증가 (+)</td><td className="text-center text-red-600">감소 (-)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Pass Strategy */}
            <section className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 필기시험 합격 전략</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">1단계: 개념 이해</h3>
                  <p className="text-sm text-teal-100">회계가 왜 필요한지, 차변/대변이 무엇인지 이해하세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">2단계: 분개 연습</h3>
                  <p className="text-sm text-teal-100">기본 거래 10가지의 분개를 반복 연습하세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">3단계: 기출 풀이</h3>
                  <p className="text-sm text-teal-100">최근 5회 기출문제로 출제 패턴을 파악하세요.</p>
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
                <span className="text-cyan-500">💻</span> 실기시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">시험 유형</div>
                  <div className="text-xl font-bold text-cyan-600">실무형</div>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">시험 시간</div>
                  <div className="text-2xl font-bold text-cyan-600">60분</div>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">사용 프로그램</div>
                  <div className="text-xl font-bold text-cyan-600">케이렙</div>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">합격 기준</div>
                  <div className="text-2xl font-bold text-cyan-600">70점</div>
                </div>
              </div>
            </section>

            {/* Practical Areas */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-cyan-500">📊</span> 실기시험 영역별 상세
              </h2>

              <div className="space-y-6">
                {/* Area 1 */}
                <div className="border-l-4 border-teal-500 bg-teal-50 rounded-r-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">기초정보관리</h3>
                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold">15%</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">출제 내용</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 거래처 등록 및 수정</li>
                        <li>• 계정과목 확인</li>
                        <li>• 기초잔액 입력</li>
                        <li>• 전기분 재무제표 확인</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ 거래처코드 규칙 이해</li>
                        <li>✓ F2로 코드 검색 익히기</li>
                        <li>✓ 기초잔액 차대변 맞추기</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Area 2 */}
                <div className="border-l-4 border-cyan-500 bg-cyan-50 rounded-r-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">일반전표입력</h3>
                    <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold">40%</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">출제 내용</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 입금전표 (현금 수입)</li>
                        <li>• 출금전표 (현금 지출)</li>
                        <li>• 대체전표 (현금 無)</li>
                        <li>• 복합전표 입력</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ 전표 종류 선택 정확히</li>
                        <li>✓ 차대변 금액 일치 확인</li>
                        <li>✓ 적요 입력 습관화</li>
                        <li>✓ 거래처 연결 필수</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Area 3 */}
                <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">매입매출전표</h3>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">25%</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">출제 내용</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 과세 매입/매출 처리</li>
                        <li>• 세금계산서 연동</li>
                        <li>• 현금영수증 처리</li>
                        <li>• 카드 매출 입력</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ 부가세 자동계산 확인</li>
                        <li>✓ 매입/매출 구분 정확히</li>
                        <li>✓ 거래처 연결 필수</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Area 4 */}
                <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">장부조회</h3>
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">20%</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">출제 내용</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 거래처별 원장 조회</li>
                        <li>• 총계정원장 조회</li>
                        <li>• 일계표/월계표 조회</li>
                        <li>• 합계잔액시산표 조회</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ 조회 조건 설정 익히기</li>
                        <li>✓ 기간 설정 정확히</li>
                        <li>✓ 출력 형식 확인</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* KcLep Tips */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">⌨️</span> 케이렙(KcLep) 기본 단축키
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3 text-gray-900">필수 단축키</h3>
                  <div className="space-y-2">
                    {[
                      { key: 'F2', desc: '코드도움 (거래처, 계정과목 검색)' },
                      { key: 'F3', desc: '달력 호출' },
                      { key: 'F4', desc: '전표 저장' },
                      { key: 'F5', desc: '조회/검색' },
                      { key: 'Enter', desc: '다음 칸으로 이동' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded font-mono text-sm">{item.key}</span>
                        <span className="text-sm">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3 text-gray-900">메뉴 위치</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { menu: '거래처등록', path: '기초정보관리 → 거래처등록' },
                      { menu: '일반전표입력', path: '전표관리 → 일반전표입력' },
                      { menu: '매입매출전표', path: '전표관리 → 매입매출전표' },
                      { menu: '거래처원장', path: '장부조회 → 거래처원장' },
                      { menu: '합계잔액시산표', path: '결산/재무제표 → 합계잔액시산표' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-medium">{item.menu}</span>
                        <span className="text-gray-500">{item.path}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Pass Strategy */}
            <section className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 실기시험 합격 전략</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">1단계: 메뉴 익히기</h3>
                  <p className="text-sm text-cyan-100">케이렙 메뉴 위치와 단축키를 익히세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">2단계: 전표 연습</h3>
                  <p className="text-sm text-cyan-100">입금/출금/대체전표 입력을 반복 연습하세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">3단계: 속도 향상</h3>
                  <p className="text-sm text-cyan-100">기출문제를 시간 재고 풀어 속도를 높이세요.</p>
                </div>
              </div>
              <Link href="/category/accounting/computerized-accounting-2/study/practical"
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-white text-cyan-600 rounded-lg font-medium hover:bg-cyan-50 transition">
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
            <a href="https://license.kacpta.or.kr" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline ml-1">한국세무사회 자격시험</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
