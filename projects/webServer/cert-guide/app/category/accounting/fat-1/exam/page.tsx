'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FAT1ExamPage() {
  const [activeTab, setActiveTab] = useState<'theory' | 'practical'>('theory');

  const theorySubjects = [
    {
      name: '회계원리',
      questions: 15,
      time: '18분',
      difficulty: '★★★☆☆',
      topics: ['회계의 기초개념', '복식부기 원리', '계정과목 분류', '분개와 전기', '시산표 작성', '결산정리', '재무제표 기초', '회계순환과정'],
      tips: '차변/대변 분류와 계정과목 암기가 핵심입니다.',
      link: '/category/accounting/fat-1/study/accounting-principle'
    },
    {
      name: '재무회계',
      questions: 15,
      time: '18분',
      difficulty: '★★★☆☆',
      topics: ['유동자산 회계', '재고자산 평가', '유형자산 감가상각', '무형자산', '부채 회계', '자본 회계', '수익인식', '재무제표 분석'],
      tips: '감가상각 계산과 재고자산 평가방법을 확실히 익히세요.',
      link: '/category/accounting/fat-1/study/financial-accounting'
    },
    {
      name: '원가관리회계',
      questions: 10,
      time: '12분',
      difficulty: '★★★☆☆',
      topics: ['원가의 개념', '원가흐름', '개별원가계산', '종합원가계산', '표준원가', 'CVP분석', '예산편성', '성과평가'],
      tips: '원가계산 과정과 손익분기점 계산을 반복 연습하세요.',
      link: '/category/accounting/fat-1/study/cost-management'
    },
    {
      name: '세무회계',
      questions: 10,
      time: '12분',
      difficulty: '★★★☆☆',
      topics: ['부가세 과세체계', '세금계산서', '매입세액공제', '신고납부', '소득세 기초', '원천징수', '근로소득', '종합소득'],
      tips: '부가세 신고서 작성 흐름을 이해하는 것이 중요합니다.',
      link: '/category/accounting/fat-1/study/tax-accounting'
    },
  ];

  const practicalAreas = [
    { name: '기초정보등록', percent: 10, desc: '회사정보, 거래처 등록', items: ['회사정보 등록', '거래처 등록', '계정과목 설정', '기초잔액 입력'] },
    { name: '전표입력', percent: 35, desc: '일반전표, 매입매출전표', items: ['일반전표 입력', '매입전표 입력', '매출전표 입력', '전표 수정/조회'] },
    { name: '결산처리', percent: 30, desc: '결산정리, 재무제표', items: ['결산정리분개', '감가상각비 계상', '재고자산 평가', '재무제표 조회'] },
    { name: '부가세신고', percent: 25, desc: '부가세 신고서 작성', items: ['매출/매입 집계', '부가세 신고서', '세금계산서합계표', '신고서 출력'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/fat-1" className="text-gray-500 hover:text-gray-700">FAT 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <section className="bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">FAT 1급 시험 상세</h1>
          <p className="text-emerald-100">이론시험과 실무시험의 상세 정보를 확인하세요.</p>
        </section>

        {/* Tab Navigation */}
        <div className="flex border-b mb-8 bg-white rounded-t-xl">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex-1 py-4 font-medium transition ${activeTab === 'theory' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-gray-500 hover:text-gray-700'}`}
          >
            📝 이론시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`flex-1 py-4 font-medium transition ${activeTab === 'practical' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-gray-500 hover:text-gray-700'}`}
          >
            💻 실무시험 (더존 Smart A)
          </button>
        </div>

        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📋</span> 이론시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">4과목</div>
                  <div className="text-sm text-gray-600">시험과목</div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">50문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">60분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">70점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
              </div>
            </section>

            {/* Subject Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-emerald-500">📚</span> 과목별 상세
              </h2>
              {theorySubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{idx + 1}. {subject.name}</h3>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">{subject.questions}문항</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{subject.time}</span>
                    <span className="text-emerald-500">{subject.difficulty}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">출제 토픽</h4>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, tidx) => (
                          <span key={tidx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{topic}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <h4 className="font-medium text-emerald-800 mb-2">💡 합격 TIP</h4>
                      <p className="text-sm text-emerald-700">{subject.tips}</p>
                    </div>
                  </div>
                  <Link href={subject.link} className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-medium">
                    {subject.name} 학습하기 →
                  </Link>
                </div>
              ))}
            </section>

            {/* Strategy */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎯</span> 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">시간 배분 전략</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">회계원리 (15문항)</span>
                      <span className="font-medium">18분</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">재무회계 (15문항)</span>
                      <span className="font-medium">18분</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">원가관리회계 (10문항)</span>
                      <span className="font-medium">12분</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">세무회계 (10문항)</span>
                      <span className="font-medium">12분</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">학습 우선순위</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <span className="text-gray-700">회계원리 (기초, 30%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <span className="text-gray-700">재무회계 (핵심, 30%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <span className="text-gray-700">세무회계 (실무 연계)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                      <span className="text-gray-700">원가관리회계 (계산)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Practical Tab */}
        {activeTab === 'practical' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">💻</span> 실무시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">더존</div>
                  <div className="text-sm text-gray-600">Smart A</div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">60분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">70점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">4영역</div>
                  <div className="text-sm text-gray-600">출제범위</div>
                </div>
              </div>
            </section>

            {/* Area Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-emerald-500">📊</span> 영역별 상세
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {practicalAreas.map((area, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800">{area.name}</h3>
                      <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-sm font-medium">{area.percent}%</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{area.desc}</p>
                    <div className="space-y-2">
                      {area.items.map((item, iidx) => (
                        <div key={iidx} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Frequency */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📈</span> 출제 경향
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-gray-600">유형</th>
                      <th className="text-center py-3 text-gray-600">매회 출제</th>
                      <th className="text-center py-3 text-gray-600">자주 출제</th>
                      <th className="text-center py-3 text-gray-600">간헐 출제</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 font-medium">기초등록</td>
                      <td className="text-center text-green-600">거래처 등록</td>
                      <td className="text-center text-emerald-600">계정과목</td>
                      <td className="text-center text-gray-400">기초잔액</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">전표입력</td>
                      <td className="text-center text-green-600">일반/매입/매출전표</td>
                      <td className="text-center text-emerald-600">어음거래</td>
                      <td className="text-center text-gray-400">외화거래</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">결산</td>
                      <td className="text-center text-green-600">결산정리분개</td>
                      <td className="text-center text-emerald-600">감가상각</td>
                      <td className="text-center text-gray-400">대손설정</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">부가세</td>
                      <td className="text-center text-green-600">부가세 신고서</td>
                      <td className="text-center text-emerald-600">세금계산서합계표</td>
                      <td className="text-center text-gray-400">수정신고</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Time Management */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">⏱️</span> 시간 관리 가이드 (60분)
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">0~5분</div>
                  <div className="flex-1 bg-blue-100 rounded-lg p-3">
                    <span className="font-medium text-blue-800">기초정보등록</span>
                    <span className="text-blue-600 text-sm ml-2">- 거래처, 계정과목 확인</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">5~25분</div>
                  <div className="flex-1 bg-green-100 rounded-lg p-3">
                    <span className="font-medium text-green-800">전표입력</span>
                    <span className="text-green-600 text-sm ml-2">- 일반전표, 매입매출전표 입력</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">25~40분</div>
                  <div className="flex-1 bg-emerald-100 rounded-lg p-3">
                    <span className="font-medium text-emerald-800">결산처리</span>
                    <span className="text-emerald-600 text-sm ml-2">- 결산정리분개, 재무제표</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">40~55분</div>
                  <div className="flex-1 bg-yellow-100 rounded-lg p-3">
                    <span className="font-medium text-yellow-800">부가세신고</span>
                    <span className="text-yellow-600 text-sm ml-2">- 신고서 작성 및 출력</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">55~60분</div>
                  <div className="flex-1 bg-red-100 rounded-lg p-3">
                    <span className="font-medium text-red-800">검토</span>
                    <span className="text-red-600 text-sm ml-2">- 전체 검토 및 오류 수정</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips */}
            <section className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>💡</span> 실무 대비 핵심 TIP
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-emerald-800 mb-2">더존 단축키 필수</h3>
                  <p className="text-sm text-gray-600">F2(저장), F3(삭제), F4(조회), F7(분개) 등 단축키를 익히세요.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-emerald-800 mb-2">전표 입력 순서</h3>
                  <p className="text-sm text-gray-600">일반전표 → 매입전표 → 매출전표 순서로 체계적으로 입력하세요.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-emerald-800 mb-2">결산 분개 암기</h3>
                  <p className="text-sm text-gray-600">감가상각, 대손설정, 선급/미지급 조정 분개를 확실히 외우세요.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-emerald-800 mb-2">부가세 신고서 패턴</h3>
                  <p className="text-sm text-gray-600">매출/매입 집계 후 신고서 작성 순서를 반복 연습하세요.</p>
                </div>
              </div>
              <Link href="/category/accounting/fat-1/study/practical" className="mt-6 block text-center py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium">
                실무연습 문제 풀러가기 →
              </Link>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. FAT 1급 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
