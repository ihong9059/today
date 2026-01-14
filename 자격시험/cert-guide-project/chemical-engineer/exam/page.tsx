'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ChemicalEngineerExamPage() {
  const [activeTab, setActiveTab] = useState('written');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry" className="text-gray-600 hover:text-orange-600">화학·환경</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry/chemical-engineer" className="text-gray-600 hover:text-orange-600">화공기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold">🏭 화공기사 시험정보</h1>
          <p className="text-orange-100 mt-1">Chemical Engineer Examination</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'written' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'practical' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            실기시험
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'schedule' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            시험일정
          </button>
        </div>

        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험형태</p>
                  <p className="font-medium text-gray-800">객관식 4지선다형</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">문항수</p>
                  <p className="font-medium text-gray-800">과목당 20문항 (총 100문항)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험시간</p>
                  <p className="font-medium text-gray-800">2시간 30분</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">합격기준</p>
                  <p className="font-medium text-gray-800">과목당 40점, 평균 60점 이상</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필기시험 과목</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🔥</span>
                    <span className="font-medium">화공열역학</span>
                  </div>
                  <span className="text-sm text-gray-500">20문항</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚙️</span>
                    <span className="font-medium">단위조작</span>
                  </div>
                  <span className="text-sm text-gray-500">20문항</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚗️</span>
                    <span className="font-medium">반응공학</span>
                  </div>
                  <span className="text-sm text-gray-500">20문항</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <span className="font-medium">공정제어</span>
                  </div>
                  <span className="text-sm text-gray-500">20문항</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🏭</span>
                    <span className="font-medium">화학공장설계</span>
                  </div>
                  <span className="text-sm text-gray-500">20문항</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 출제 경향</h2>
              <ul className="space-y-2 text-gray-600">
                <li>• 화공열역학: 열역학 법칙, 상평형, 화학평형 계산</li>
                <li>• 단위조작: 유체흐름, 열교환기, 증류탑 설계</li>
                <li>• 반응공학: 반응속도, 반응기 종류별 특성</li>
                <li>• 공정제어: 제어루프, 전달함수, 안정성 분석</li>
                <li>• 화학공장설계: P&ID 해석, 배관설계, 안전기준</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'practical' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실기시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험형태</p>
                  <p className="font-medium text-gray-800">필답형</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험시간</p>
                  <p className="font-medium text-gray-800">3시간</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">합격기준</p>
                  <p className="font-medium text-gray-800">60점 이상</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험과목</p>
                  <p className="font-medium text-gray-800">화공공정 설계 실무</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 실기시험 내용</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">물질수지 및 에너지수지</h3>
                  <p className="text-sm text-gray-600">공정 흐름에 대한 물질 및 에너지 수지 계산</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">공정도 작성 및 해석</h3>
                  <p className="text-sm text-gray-600">PFD, P&ID 작성 및 해석 능력</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">장치 설계</h3>
                  <p className="text-sm text-gray-600">열교환기, 반응기, 증류탑 등 주요 장치 설계</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">공정 안전</h3>
                  <p className="text-sm text-gray-600">화학공정 안전관리 및 위험성 평가</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📅 2026년 시험일정</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">구분</th>
                      <th className="text-left py-3 px-4">필기원서접수</th>
                      <th className="text-left py-3 px-4">필기시험</th>
                      <th className="text-left py-3 px-4">실기원서접수</th>
                      <th className="text-left py-3 px-4">실기시험</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">1회</td>
                      <td className="py-3 px-4">1.21~1.24</td>
                      <td className="py-3 px-4">3.2</td>
                      <td className="py-3 px-4">3.25~3.28</td>
                      <td className="py-3 px-4">5.10~5.23</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">2회</td>
                      <td className="py-3 px-4">4.14~4.17</td>
                      <td className="py-3 px-4">5.11</td>
                      <td className="py-3 px-4">6.24~6.27</td>
                      <td className="py-3 px-4">7.26~8.8</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">3회</td>
                      <td className="py-3 px-4">6.10~6.13</td>
                      <td className="py-3 px-4">8.3</td>
                      <td className="py-3 px-4">9.9~9.12</td>
                      <td className="py-3 px-4">10.18~10.31</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📌 응시자격</h2>
              <div className="space-y-3 text-gray-600">
                <p>• 관련학과 대학졸업(예정)자</p>
                <p>• 3년제 전문대학 관련학과 졸업자로서 1년 이상 실무경력자</p>
                <p>• 2년제 전문대학 관련학과 졸업자로서 2년 이상 실무경력자</p>
                <p>• 기능사 + 3년 이상 실무경력자</p>
                <p>• 산업기사 수준 이상의 자격 취득자</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💰 수수료</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500">필기시험</p>
                  <p className="text-2xl font-bold text-orange-600">19,400원</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500">실기시험</p>
                  <p className="text-2xl font-bold text-orange-600">22,600원</p>
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
