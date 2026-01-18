'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TradeEnglish1ExamPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'schedule'>('overview');

  const subjects = [
    { name: '영문해석', questions: 40, topics: ['무역계약서', '신용장(L/C)', '무역서신', '국제협약', '선적서류'], tips: '문맥을 파악하고 핵심 용어를 정확히 이해하세요.', passRate: 30 },
    { name: '영작문', questions: 30, topics: ['무역서신 작성', '오퍼/주문', '클레임 대응', '선적통지', '결제요청'], tips: '정형화된 표현과 문장 구조를 암기하세요.', passRate: 25 },
    { name: '무역실무', questions: 30, topics: ['Incoterms 2020', '결제조건', 'L/C 거래', '선적서류', '보험/클레임'], tips: 'Incoterms와 L/C 조건을 완벽히 숙지하세요.', passRate: 35 },
  ];

  const schedules = [
    { round: '제1회', apply: '1월 중순', exam: '2월 중순', result: '3월 초' },
    { round: '제2회', apply: '4월 중순', exam: '5월 중순', result: '6월 초' },
    { round: '제3회', apply: '7월 중순', exam: '8월 중순', result: '9월 초' },
    { round: '제4회', apply: '10월 중순', exam: '11월 중순', result: '12월 초' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/trade/trade-english-1" className="text-blue-600 hover:text-blue-800 font-medium">← 무역영어 1급</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 무역영어 1급 시험 안내</h1>
          <p className="text-gray-500">시험 구성 및 합격 기준 상세 정보</p>
        </div>

        <div className="flex gap-2 mb-8 justify-center flex-wrap">
          <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-blue-50'}`}>📝 시험 개요</button>
          <button onClick={() => setActiveTab('subjects')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'subjects' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-indigo-50'}`}>📚 과목별 안내</button>
          <button onClick={() => setActiveTab('schedule')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'schedule' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-purple-50'}`}>📅 시험 일정</button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-blue-50 rounded-xl p-4"><p className="text-blue-600 font-bold text-2xl">100문항</p><p className="text-sm text-gray-500">총 문항수</p></div>
                <div className="bg-blue-50 rounded-xl p-4"><p className="text-blue-600 font-bold text-2xl">80분</p><p className="text-sm text-gray-500">시험 시간</p></div>
                <div className="bg-blue-50 rounded-xl p-4"><p className="text-blue-600 font-bold text-2xl">70점</p><p className="text-sm text-gray-500">합격 기준</p></div>
                <div className="bg-blue-50 rounded-xl p-4"><p className="text-blue-600 font-bold text-2xl">객관식</p><p className="text-sm text-gray-500">4지선다</p></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">과목 구성</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div><h3 className="font-bold text-gray-800">영문해석</h3><p className="text-sm text-gray-500">무역 영문 독해</p></div>
                  </div>
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-full font-bold">40문항</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✍️</span>
                    <div><h3 className="font-bold text-gray-800">영작문</h3><p className="text-sm text-gray-500">무역 영문 작성</p></div>
                  </div>
                  <span className="px-4 py-2 bg-indigo-600 text-white rounded-full font-bold">30문항</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div><h3 className="font-bold text-gray-800">무역실무</h3><p className="text-sm text-gray-500">무역 용어 및 서류</p></div>
                  </div>
                  <span className="px-4 py-2 bg-purple-600 text-white rounded-full font-bold">30문항</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">합격 기준</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                  <h3 className="font-bold text-green-800 mb-2">합격</h3>
                  <p className="text-green-700">총점 100점 만점 중 <strong>70점 이상</strong> 취득</p>
                  <p className="text-sm text-green-600 mt-1">과목별 과락 기준 없음</p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                  <h3 className="font-bold text-red-800 mb-2">불합격</h3>
                  <p className="text-red-700">총점 70점 미만</p>
                  <p className="text-sm text-red-600 mt-1">재응시 제한 없음</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Link href="/category/trade/trade-english-1/study/english-reading" className="py-3 px-4 bg-blue-100 text-blue-700 rounded-xl text-center font-medium hover:bg-blue-200 transition">영문해석</Link>
                <Link href="/category/trade/trade-english-1/study/english-writing" className="py-3 px-4 bg-blue-100 text-blue-700 rounded-xl text-center font-medium hover:bg-blue-200 transition">영작문</Link>
                <Link href="/category/trade/trade-english-1/study/trade-terms" className="py-3 px-4 bg-blue-100 text-blue-700 rounded-xl text-center font-medium hover:bg-blue-200 transition">무역용어</Link>
                <Link href="/category/trade/trade-english-1/study/business-letter" className="py-3 px-4 bg-blue-100 text-blue-700 rounded-xl text-center font-medium hover:bg-blue-200 transition">비즈니스 서신</Link>
                <Link href="/category/trade/trade-english-1/study/trade-documents" className="py-3 px-4 bg-blue-100 text-blue-700 rounded-xl text-center font-medium hover:bg-blue-200 transition">무역서류</Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>Incoterms 2020 11가지 조건을 완벽히 암기하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>L/C 관련 용어와 UCP 600 규정을 숙지하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>무역서신 정형 표현을 패턴화하여 학습하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>기출문제를 반복 풀이하여 출제 경향을 파악하세요</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="space-y-6">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{subject.name}</h2>
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold">{subject.questions}문항</span>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">주요 출제 영역</p>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.map((topic, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{topic}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 mb-3">
                  <p className="text-blue-700"><span className="font-bold">💡 학습 팁:</span> {subject.tips}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">평균 정답률</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${subject.passRate}%` }}></div>
                    </div>
                    <span className="text-blue-600 font-bold">{subject.passRate}%</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📖 영문해석 주요 유형</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-blue-700 mb-2">계약서 해석</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 매매계약서 조항 해석</li>
                    <li>• 대리점 계약서 분석</li>
                    <li>• 라이센스 계약 조건</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <h3 className="font-bold text-indigo-700 mb-2">신용장(L/C) 해석</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• L/C 개설조건 분석</li>
                    <li>• 서류요건 해석</li>
                    <li>• UCP 600 관련 규정</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">✍️ 영작문 주요 유형</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-blue-700 mb-2">오퍼/주문 서신</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 가격 인용 (Quotation)</li>
                    <li>• 주문서 (Purchase Order)</li>
                    <li>• 주문 승낙/거절</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <h3 className="font-bold text-indigo-700 mb-2">클레임/선적 서신</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 클레임 제기/대응</li>
                    <li>• 선적통지 (Shipping Advice)</li>
                    <li>• 결제 요청/독촉</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">2026년 시험 일정</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left font-bold text-gray-700">회차</th>
                      <th className="py-3 px-4 text-center font-bold text-gray-700">접수 기간</th>
                      <th className="py-3 px-4 text-center font-bold text-gray-700">시험일</th>
                      <th className="py-3 px-4 text-center font-bold text-gray-700">합격 발표</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {schedules.map((schedule, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-blue-600">{schedule.round}</td>
                        <td className="py-3 px-4 text-center">{schedule.apply}</td>
                        <td className="py-3 px-4 text-center font-medium">{schedule.exam}</td>
                        <td className="py-3 px-4 text-center">{schedule.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-400 mt-4">※ 정확한 일정은 대한상공회의소 홈페이지에서 확인하세요.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">접수 방법</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-gray-800">대한상공회의소 자격평가사업단 접속</h3>
                    <p className="text-sm text-gray-600">license.korcham.net</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-gray-800">회원가입 및 로그인</h3>
                    <p className="text-sm text-gray-600">본인인증 후 회원가입</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-gray-800">시험 접수 및 응시료 결제</h3>
                    <p className="text-sm text-gray-600">응시료: 30,000원</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">시험 당일 준비물</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-xl">🪪</span>
                  <span className="text-gray-700">신분증 (주민등록증, 운전면허증, 여권)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-xl">🎫</span>
                  <span className="text-gray-700">수험표 (출력 또는 모바일)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-xl">✏️</span>
                  <span className="text-gray-700">컴퓨터용 사인펜</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-xl">⌚</span>
                  <span className="text-gray-700">아날로그 손목시계 (선택)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
