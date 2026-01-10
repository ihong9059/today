'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HazardousMaterialsExamPage() {
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
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry" className="text-gray-600 hover:text-orange-600">화학·환경</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry/hazardous-materials" className="text-gray-600 hover:text-orange-600">위험물산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">⚠️</span>
            <div>
              <h1 className="text-2xl font-bold">위험물산업기사 시험정보</h1>
              <p className="text-orange-100">Industrial Engineer Hazardous Materials</p>
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
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'practical'
                ? 'bg-orange-500 text-white'
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
                  <p className="font-medium text-gray-800">객관식 4지선다형</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">문항 수</p>
                  <p className="font-medium text-gray-800">과목당 20문항 (총 60문항)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 시간</p>
                  <p className="font-medium text-gray-800">1시간 30분</p>
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
                    <span className="text-2xl">⚗️</span>
                    <div>
                      <p className="font-medium text-gray-800">일반화학</p>
                      <p className="text-sm text-gray-500">원자구조, 화학결합, 반응, 용액</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">20문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="font-medium text-gray-800">화재예방과 소화방법</p>
                      <p className="text-sm text-gray-500">연소, 소화, 방폭, 소방시설</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">20문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="font-medium text-gray-800">위험물의 성질과 취급</p>
                      <p className="text-sm text-gray-500">1~6류 위험물, 저장·취급, 법규</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">20문항</span>
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
                      <td className="py-3 px-4">4월</td>
                      <td className="py-3 px-4">5월</td>
                      <td className="py-3 px-4">6월</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">3회</td>
                      <td className="py-3 px-4">7월</td>
                      <td className="py-3 px-4">8월</td>
                      <td className="py-3 px-4">9월</td>
                    </tr>
                  </tbody>
                </table>
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
                  <p className="font-medium text-gray-800">위험물 취급 실무</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 실기시험 내용</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">위험물 성상 및 취급</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1~6류 위험물의 성질과 특성</li>
                    <li>• 위험물 저장 및 취급 방법</li>
                    <li>• 위험물 운반 및 운송 기준</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">시설 및 안전관리</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 제조소등의 위치·구조·설비 기준</li>
                    <li>• 소화설비 및 경보설비</li>
                    <li>• 안전거리 및 보유공지</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">법규 및 행정</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 위험물안전관리법 및 시행령</li>
                    <li>• 허가·신고·검사 절차</li>
                    <li>• 안전관리자 선임 및 의무</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기시험 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">1~6류 위험물의 품명, 지정수량, 성질을 완벽히 암기하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">제조소등의 시설기준을 표로 정리하여 학습하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">계산문제(지정수량 배수, 저장량 등)를 반복 연습하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">법규 관련 문제는 최신 법령 개정사항을 확인하세요.</p>
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
