'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ComputerizedTax2ExamPage() {
  const [activeTab, setActiveTab] = useState<'theory' | 'practical'>('theory');

  const theorySubjects = [
    {
      name: '재무회계',
      questions: 10,
      time: '15분',
      difficulty: '★★★☆☆',
      topics: ['재무제표의 구성', '유동자산/비유동자산', '유형자산 감가상각', '부채의 분류', '자본의 구성', '수익인식 기준', '비용의 인식', '회계변경과 오류수정'],
      tips: '재무제표 4개 구조와 계정과목 분류를 확실히 익혀두세요.',
      link: '/category/accounting/computerized-tax-2/study/financial-accounting'
    },
    {
      name: '원가회계',
      questions: 10,
      time: '15분',
      difficulty: '★★★☆☆',
      topics: ['원가의 개념과 분류', '원가흐름', '개별원가계산', '종합원가계산', '부문별 원가배부', '표준원가계산', '변동원가/전부원가', 'CVP분석'],
      tips: '원가계산 과정과 배부기준을 명확히 이해하세요.',
      link: '/category/accounting/computerized-tax-2/study/cost-accounting'
    },
    {
      name: '소득세',
      questions: 10,
      time: '15분',
      difficulty: '★★★☆☆',
      topics: ['소득세 과세체계', '종합소득금액', '근로소득 계산', '사업소득', '이자/배당소득', '연금/기타소득', '원천징수', '종합소득 공제'],
      tips: '소득 종류별 계산 구조와 원천징수 세율을 암기하세요.',
      link: '/category/accounting/computerized-tax-2/study/income-tax'
    },
    {
      name: '부가가치세',
      questions: 10,
      time: '15분',
      difficulty: '★★★★☆',
      topics: ['부가세 과세체계', '과세표준', '세금계산서', '매입세액 공제', '대손세액 공제', '신고납부 절차', '간이과세자', '영세율과 면세'],
      tips: '세금계산서 발급요건과 매입세액 불공제 사유를 정리하세요.',
      link: '/category/accounting/computerized-tax-2/study/vat'
    },
  ];

  const practicalAreas = [
    { name: '전표입력', percent: 30, desc: '일반전표, 매입매출전표 입력', items: ['일반전표 입력', '매입전표 입력', '매출전표 입력', '전표 수정/삭제'] },
    { name: '결산처리', percent: 25, desc: '결산정리분개, 재무제표', items: ['결산정리분개', '수정분개', '마감분개', '재무제표 조회'] },
    { name: '부가세신고', percent: 25, desc: '부가가치세 신고서 작성', items: ['부가세 신고서', '매출/매입 집계', '세액계산', '신고서 출력'] },
    { name: '원천징수', percent: 20, desc: '원천세 계산 및 신고', items: ['급여자료 입력', '원천세 계산', '지급명세서', '원천징수영수증'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-tax-2" className="text-gray-500 hover:text-gray-700">전산세무 2급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-amber-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <section className="bg-gradient-to-r from-amber-600 to-yellow-500 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">전산세무 2급 시험 상세</h1>
          <p className="text-amber-100">필기시험(이론)과 실기시험(케이렙)의 상세 정보를 확인하세요.</p>
        </section>

        {/* Tab Navigation */}
        <div className="flex border-b mb-8 bg-white rounded-t-xl">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex-1 py-4 font-medium transition ${activeTab === 'theory' ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50' : 'text-gray-500 hover:text-gray-700'}`}
          >
            📝 필기시험 (이론)
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`flex-1 py-4 font-medium transition ${activeTab === 'practical' ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50' : 'text-gray-500 hover:text-gray-700'}`}
          >
            💻 실기시험 (케이렙)
          </button>
        </div>

        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-amber-500">📋</span> 필기시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">4과목</div>
                  <div className="text-sm text-gray-600">시험과목</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">40문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">60분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">60점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
              </div>
            </section>

            {/* Subject Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-amber-500">📚</span> 과목별 상세
              </h2>
              {theorySubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{idx + 1}. {subject.name}</h3>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">{subject.questions}문항</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">{subject.time}</span>
                    <span className="text-amber-500">{subject.difficulty}</span>
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
                    <div className="bg-amber-50 rounded-lg p-4">
                      <h4 className="font-medium text-amber-800 mb-2">💡 합격 TIP</h4>
                      <p className="text-sm text-amber-700">{subject.tips}</p>
                    </div>
                  </div>
                  <Link href={subject.link} className="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm font-medium">
                    {subject.name} 학습하기 →
                  </Link>
                </div>
              ))}
            </section>

            {/* Strategy */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-amber-500">🎯</span> 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">시간 배분 전략</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">재무회계</span>
                      <span className="font-medium">15분</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">원가회계</span>
                      <span className="font-medium">15분</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">소득세</span>
                      <span className="font-medium">15분</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">부가가치세</span>
                      <span className="font-medium">15분</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">학습 우선순위</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <span className="text-gray-700">부가가치세 (출제 비중 높음)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <span className="text-gray-700">재무회계 (기초 필수)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <span className="text-gray-700">소득세 (실기 연계)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                      <span className="text-gray-700">원가회계 (계산 집중)</span>
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
                <span className="text-amber-500">💻</span> 실기시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">케이렙</div>
                  <div className="text-sm text-gray-600">시험 프로그램</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">60분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">70점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">4영역</div>
                  <div className="text-sm text-gray-600">출제범위</div>
                </div>
              </div>
            </section>

            {/* Area Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-amber-500">📊</span> 영역별 상세
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {practicalAreas.map((area, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800">{area.name}</h3>
                      <span className="px-3 py-1 bg-amber-600 text-white rounded-full text-sm font-medium">{area.percent}%</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{area.desc}</p>
                    <div className="space-y-2">
                      {area.items.map((item, iidx) => (
                        <div key={iidx} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
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
                <span className="text-amber-500">📈</span> 출제 경향
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
                      <td className="py-3 font-medium">전표입력</td>
                      <td className="text-center text-green-600">일반전표, 매입매출전표</td>
                      <td className="text-center text-amber-600">수정/삭제</td>
                      <td className="text-center text-gray-400">-</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">결산</td>
                      <td className="text-center text-green-600">결산정리분개</td>
                      <td className="text-center text-amber-600">재무제표 조회</td>
                      <td className="text-center text-gray-400">마감분개</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">부가세</td>
                      <td className="text-center text-green-600">부가세 신고서</td>
                      <td className="text-center text-amber-600">매출/매입 집계</td>
                      <td className="text-center text-gray-400">수정신고</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">원천세</td>
                      <td className="text-center text-green-600">원천세 계산</td>
                      <td className="text-center text-amber-600">지급명세서</td>
                      <td className="text-center text-gray-400">연말정산</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Time Management */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-amber-500">⏱️</span> 시간 관리 가이드 (60분)
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">0~20분</div>
                  <div className="flex-1 bg-green-100 rounded-lg p-3">
                    <span className="font-medium text-green-800">전표입력</span>
                    <span className="text-green-600 text-sm ml-2">- 일반전표, 매입매출전표 빠르게 입력</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">20~35분</div>
                  <div className="flex-1 bg-amber-100 rounded-lg p-3">
                    <span className="font-medium text-amber-800">결산처리</span>
                    <span className="text-amber-600 text-sm ml-2">- 결산정리분개 정확하게</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">35~50분</div>
                  <div className="flex-1 bg-yellow-100 rounded-lg p-3">
                    <span className="font-medium text-yellow-800">부가세/원천세</span>
                    <span className="text-yellow-600 text-sm ml-2">- 신고서 작성 및 출력</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">50~60분</div>
                  <div className="flex-1 bg-blue-100 rounded-lg p-3">
                    <span className="font-medium text-blue-800">검토/수정</span>
                    <span className="text-blue-600 text-sm ml-2">- 전체 검토 및 오류 수정</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips */}
            <section className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>💡</span> 실기 대비 핵심 TIP
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-amber-800 mb-2">케이렙 단축키 필수</h3>
                  <p className="text-sm text-gray-600">F2(저장), F3(삭제), F4(조회) 등 자주 쓰는 단축키를 완벽히 익히세요.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-amber-800 mb-2">전표 입력 순서</h3>
                  <p className="text-sm text-gray-600">일반전표 → 매입전표 → 매출전표 순서로 체계적으로 입력하세요.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-amber-800 mb-2">결산 분개 암기</h3>
                  <p className="text-sm text-gray-600">감가상각, 대손설정, 선급/미지급 조정 분개를 확실히 외우세요.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-amber-800 mb-2">부가세 신고서 패턴</h3>
                  <p className="text-sm text-gray-600">매출/매입 집계 후 신고서 작성 순서를 반복 연습하세요.</p>
                </div>
              </div>
              <Link href="/category/accounting/computerized-tax-2/study/practical" className="mt-6 block text-center py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-medium">
                실무연습 문제 풀러가기 →
              </Link>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. 전산세무 2급 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
