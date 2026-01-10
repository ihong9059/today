'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CareerCounselorExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-blue-600">교육·상담</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/career-counselor" className="text-gray-600 hover:text-blue-600">직업상담사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">💼</span>
            <div>
              <h1 className="text-2xl font-bold">직업상담사 2급 시험정보</h1>
              <p className="text-blue-100">Vocational Counselor Level 2</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'written'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'practical'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🔧 실기시험
          </button>
        </div>

        {activeTab === 'written' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필기시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 형태</p>
                  <p className="font-medium text-gray-800">객관식 5지선다형</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">문항 수</p>
                  <p className="font-medium text-gray-800">과목당 25문항 (총 125문항)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 시간</p>
                  <p className="font-medium text-gray-800">2시간 30분</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">합격 기준</p>
                  <p className="font-medium text-gray-800">과목당 40점 이상, 평균 60점 이상</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 시험 과목</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💼</span>
                    <div>
                      <p className="font-medium text-gray-800">직업상담학</p>
                      <p className="text-sm text-gray-500">상담이론, 상담기법, 상담과정, 집단상담</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🧠</span>
                    <div>
                      <p className="font-medium text-gray-800">직업심리학</p>
                      <p className="text-sm text-gray-500">진로발달이론, 심리검사, 직업적성, 성격이론</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-medium text-gray-800">직업정보론</p>
                      <p className="text-sm text-gray-500">직업분류, 직업정보수집, 직업전망, 고용정보</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="font-medium text-gray-800">노동시장론</p>
                      <p className="text-sm text-gray-500">노동수요·공급, 임금이론, 실업, 고용정책</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚖️</span>
                    <div>
                      <p className="font-medium text-gray-800">노동관계법규</p>
                      <p className="text-sm text-gray-500">근로기준법, 고용보험법, 노동조합법, 산업안전보건법</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📅 2026년 시험 일정</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">회차</th>
                      <th className="text-left py-3 px-4">원서접수</th>
                      <th className="text-left py-3 px-4">시험일</th>
                      <th className="text-left py-3 px-4">합격발표</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">1회</td>
                      <td className="py-3 px-4">2월</td>
                      <td className="py-3 px-4">3월</td>
                      <td className="py-3 px-4">4월</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">2회</td>
                      <td className="py-3 px-4">5월</td>
                      <td className="py-3 px-4">6월</td>
                      <td className="py-3 px-4">7월</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">3회</td>
                      <td className="py-3 px-4">8월</td>
                      <td className="py-3 px-4">9월</td>
                      <td className="py-3 px-4">10월</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 필기시험 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">직업상담학과 직업심리학은 이론 중심으로 체계적으로 학습하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">직업정보론은 한국고용직업분류(KECO)와 한국표준직업분류(KSCO)를 숙지하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">노동시장론은 경제학 기본 개념과 그래프 분석에 익숙해지세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">노동관계법규는 최신 개정 법령을 반드시 확인하세요.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실기시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 형태</p>
                  <p className="font-medium text-gray-800">필답형</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 시간</p>
                  <p className="font-medium text-gray-800">2시간 30분</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">합격 기준</p>
                  <p className="font-medium text-gray-800">60점 이상</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 과목</p>
                  <p className="font-medium text-gray-800">직업상담 실무</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 실기시험 내용</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">상담 사례 분석</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 내담자 문제 파악 및 진단</li>
                    <li>• 적절한 상담이론 및 기법 선택</li>
                    <li>• 상담 목표 설정 및 계획 수립</li>
                    <li>• 상담 과정 및 결과 평가</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">심리검사 해석</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 적성검사 결과 해석</li>
                    <li>• 성격검사 결과 분석</li>
                    <li>• 흥미검사 활용방안</li>
                    <li>• 검사 결과 피드백 방법</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">직업정보 활용</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 직업분류체계 적용</li>
                    <li>• 직업정보 수집 및 분석</li>
                    <li>• 노동시장 동향 파악</li>
                    <li>• 취업지원 프로그램 설계</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기시험 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">실제 상담 사례를 많이 접하고 분석 연습을 하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">상담이론을 실제 사례에 적용하는 연습을 반복하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">심리검사 도구의 특성과 해석 방법을 숙지하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">논술형 답안 작성 연습을 충분히 하세요.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
