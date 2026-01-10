'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HazardousEngineerExamPage() {
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
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-red-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/hazardous-engineer" className="text-gray-600 hover:text-red-600">위험물기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">⚠️</span>
            <div>
              <h1 className="text-2xl font-bold">위험물기사 시험정보</h1>
              <p className="text-orange-100">Engineer Hazardous Materials</p>
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
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'practical'
                ? 'bg-red-500 text-white'
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
                  <p className="font-medium text-gray-800">총 100문항 (과목당 25문항)</p>
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
                    <span className="text-2xl">⚗️</span>
                    <div>
                      <p className="font-medium text-gray-800">일반화학</p>
                      <p className="text-sm text-gray-500">화학 기초, 물질의 상태, 화학반응, 용액, 전기화학</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="font-medium text-gray-800">화재예방과 소화방법</p>
                      <p className="text-sm text-gray-500">연소이론, 화재예방, 소화원리, 소화설비, 방폭</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="font-medium text-gray-800">위험물의 성질과 취급</p>
                      <p className="text-sm text-gray-500">제1류~제6류 위험물의 특성, 저장·취급방법, 소화방법</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    <div>
                      <p className="font-medium text-gray-800">위험물안전관리법</p>
                      <p className="text-sm text-gray-500">위험물안전관리법령, 제조소등의 시설기준, 안전관리</p>
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
                      <td className="py-3 px-4">2월 중</td>
                      <td className="py-3 px-4">3월 초</td>
                      <td className="py-3 px-4">3월 말</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">2회</td>
                      <td className="py-3 px-4">4월 중</td>
                      <td className="py-3 px-4">5월 초</td>
                      <td className="py-3 px-4">5월 말</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">3회</td>
                      <td className="py-3 px-4">8월 중</td>
                      <td className="py-3 px-4">9월 초</td>
                      <td className="py-3 px-4">9월 말</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h2 className="text-xl font-bold text-red-800 mb-4">💡 필기시험 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-red-700">일반화학 기초 원리를 정확히 이해하고 암기하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-red-700">제1류~제6류 위험물의 성질과 소화방법을 체계적으로 정리하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-red-700">위험물안전관리법령의 주요 조항과 수치를 암기하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-red-700">과거 기출문제를 반복해서 풀어보세요.</p>
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
                  <p className="font-medium text-gray-800">위험물취급실무</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 실기시험 출제 내용</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">위험물 안전관리</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 위험물 저장·취급 안전관리</li>
                    <li>• 제조소등의 위치·구조·설비 기준</li>
                    <li>• 위험물 운반·운송 기준</li>
                    <li>• 위험물 안전관리자 직무</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">소화설비</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 소화설비의 종류와 설치 기준</li>
                    <li>• 소화약제 선정 및 적용</li>
                    <li>• 소화설비 점검 및 유지관리</li>
                    <li>• 포소화설비 계산 문제</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">위험물 성질 및 화재 대응</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 위험물의 성질 및 반응성</li>
                    <li>• 혼촉 위험물질</li>
                    <li>• 위험물 화재 시 대응방법</li>
                    <li>• 누출 및 비상조치</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">법령 적용</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 위험물안전관리법 적용 사례</li>
                    <li>• 제조소등의 허가 및 신고</li>
                    <li>• 예방규정 작성</li>
                    <li>• 안전거리 계산</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기시험 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">위험물 저장소의 구조와 설비 기준을 정확히 숙지하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">소화설비 계산 문제를 반복 연습하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">위험물 관련 법규와 실무를 연계하여 학습하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">과거 실기 기출문제를 분석하고 답안 작성 연습을 하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                  <p className="text-gray-600">답안은 간결하고 정확하게 작성하는 연습이 필요합니다.</p>
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
