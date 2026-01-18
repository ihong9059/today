'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WebDesignTechnicianExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/design/web-design" className="text-purple-700 hover:text-purple-900 flex items-center gap-2">
            ← 웹디자인기능사로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 시험 상세 정보</h1>

          <div className="flex gap-2 mb-6">
            <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'written' ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>필기시험</button>
            <button onClick={() => setActiveTab('practical')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'practical' ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>실기시험</button>
          </div>

          {activeTab === 'written' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-purple-600">총 문항</p>
                  <p className="text-2xl font-bold text-purple-800">60문항</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-indigo-600">시험 시간</p>
                  <p className="text-2xl font-bold text-indigo-800">60분</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-blue-600">문제 유형</p>
                  <p className="text-2xl font-bold text-blue-800">객관식</p>
                </div>
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-violet-600">합격 기준</p>
                  <p className="text-2xl font-bold text-violet-800">60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">시험과목 (3과목)</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🎨 디자인일반</span><span className="text-sm text-gray-500">20문항</span></div>
                  <p className="text-sm text-gray-600">디자인 원리, 색채, 조형요소</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🌐 인터넷일반</span><span className="text-sm text-gray-500">20문항</span></div>
                  <p className="text-sm text-gray-600">웹 기술, 네트워크, 프로토콜</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">💻 웹그래픽디자인</span><span className="text-sm text-gray-500">20문항</span></div>
                  <p className="text-sm text-gray-600">HTML/CSS, 웹 표준, UI/UX</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 합격 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 디자인 기초이론 완벽 숙지</li>
                  <li>• HTML/CSS 태그와 속성 암기</li>
                  <li>• 웹 표준과 접근성 이해</li>
                  <li>• 기출문제 반복 학습</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'practical' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-purple-600">시험 유형</p>
                  <p className="text-2xl font-bold text-purple-800">작업형</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-indigo-600">시험 시간</p>
                  <p className="text-2xl font-bold text-indigo-800">4시간</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-blue-600">합격 기준</p>
                  <p className="text-2xl font-bold text-blue-800">60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">실기 시험과목</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-2">🖥️ 웹디자인 실무</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• HTML 문서 구조 작성</li>
                    <li>• CSS 스타일링</li>
                    <li>• JavaScript 기초 기능 구현</li>
                    <li>• 반응형 웹 레이아웃</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">📋 실기 준비 포인트</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 시멘틱 태그 활용법 숙지</li>
                  <li>• CSS 레이아웃 (Flexbox, Grid) 연습</li>
                  <li>• 메뉴, 슬라이드 구현 연습</li>
                  <li>• 시간 배분 전략 수립</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📅 시험 일정 (2026년)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4">회차</th>
                  <th className="text-left py-3 px-4">필기접수</th>
                  <th className="text-left py-3 px-4">필기시험</th>
                  <th className="text-left py-3 px-4">실기시험</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">1회</td>
                  <td className="py-3 px-4">1월</td>
                  <td className="py-3 px-4">2월</td>
                  <td className="py-3 px-4">3~4월</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">2회</td>
                  <td className="py-3 px-4">4월</td>
                  <td className="py-3 px-4">5월</td>
                  <td className="py-3 px-4">6~7월</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">3회</td>
                  <td className="py-3 px-4">8월</td>
                  <td className="py-3 px-4">9월</td>
                  <td className="py-3 px-4">10~11월</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* 정확한 일정은 Q-Net 확인</p>
        </div>
      </div>
    </div>
  );
}
