'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Secretary3ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/category/office/secretary-3"
            className="text-violet-600 hover:text-violet-800 flex items-center gap-2"
          >
            ← 비서 3급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 시험 상세 정보</h1>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('written')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'written'
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'practical'
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              실기시험
            </button>
          </div>

          {activeTab === 'written' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-violet-600">문항 수</p>
                  <p className="text-2xl font-bold text-violet-800">40문항</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-purple-600">시험 시간</p>
                  <p className="text-2xl font-bold text-purple-800">40분</p>
                </div>
                <div className="bg-fuchsia-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-fuchsia-600">합격 기준</p>
                  <p className="text-2xl font-bold text-fuchsia-800">60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">과목별 구성</h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">1. 비서기초</span>
                    <span className="text-sm text-gray-500">20문항</span>
                  </div>
                  <p className="text-sm text-gray-600">비서의 정의, 역할, 자질, 직업윤리, 업무태도</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">2. 사무매너</span>
                    <span className="text-sm text-gray-500">20문항</span>
                  </div>
                  <p className="text-sm text-gray-600">인사예절, 전화응대, 방문객 응대, 복장 및 용모</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 합격 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 기출문제 유형이 비슷하므로 반복 학습</li>
                  <li>• 전화응대, 방문객 응대가 자주 출제</li>
                  <li>• 비서의 자질과 직업윤리 암기</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'practical' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-violet-600">시험 유형</p>
                  <p className="text-2xl font-bold text-violet-800">필답형</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-purple-600">시험 시간</p>
                  <p className="text-2xl font-bold text-purple-800">60분</p>
                </div>
                <div className="bg-fuchsia-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-fuchsia-600">합격 기준</p>
                  <p className="text-2xl font-bold text-fuchsia-800">60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">실기 출제 범위</h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium mb-2">비서실무 필답형</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 전화 응대 상황 처리</li>
                    <li>• 방문객 응대 절차</li>
                    <li>• 인사예절 상황</li>
                    <li>• 기본 사무 처리</li>
                    <li>• 상황 판단 문제</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-medium text-green-800 mb-2">✅ 실기 준비 포인트</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 전화/방문객 응대 멘트 연습</li>
                  <li>• 상황별 대처 방법 숙지</li>
                  <li>• 서술형 답안 작성 연습</li>
                  <li>• 비서 기본 매너 숙지</li>
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
                  <th className="text-left py-3 px-4">필기 원서접수</th>
                  <th className="text-left py-3 px-4">필기 시험</th>
                  <th className="text-left py-3 px-4">실기 시험</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">1회</td>
                  <td className="py-3 px-4">1월</td>
                  <td className="py-3 px-4">2월</td>
                  <td className="py-3 px-4">4월</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">2회</td>
                  <td className="py-3 px-4">4월</td>
                  <td className="py-3 px-4">5월</td>
                  <td className="py-3 px-4">7월</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">3회</td>
                  <td className="py-3 px-4">8월</td>
                  <td className="py-3 px-4">9월</td>
                  <td className="py-3 px-4">11월</td>
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
