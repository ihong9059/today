'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OrganicFarmingEngineerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/agriculture/organic-farming-engineer" className="text-green-700 hover:text-green-900 flex items-center gap-2">
            ← 유기농업기사로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 시험 상세 정보</h1>

          <div className="flex gap-2 mb-6">
            <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'written' ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>필기시험</button>
            <button onClick={() => setActiveTab('practical')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'practical' ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>실기시험</button>
          </div>

          {activeTab === 'written' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-green-600">총 문항</p>
                  <p className="text-2xl font-bold text-green-800">80문항</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-emerald-600">시험 시간</p>
                  <p className="text-2xl font-bold text-emerald-800">100분</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-teal-600">문제 유형</p>
                  <p className="text-2xl font-bold text-teal-800">객관식</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-cyan-600">합격 기준</p>
                  <p className="text-2xl font-bold text-cyan-800">60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">시험과목 (4과목)</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🌱 재배원론</span><span className="text-sm text-gray-500">20문항</span></div>
                  <p className="text-sm text-gray-600">작물 재배의 기초이론과 환경</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🪨 토양학</span><span className="text-sm text-gray-500">20문항</span></div>
                  <p className="text-sm text-gray-600">토양의 성질, 비옥도, 유기물 관리</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🥗 유기식품학</span><span className="text-sm text-gray-500">20문항</span></div>
                  <p className="text-sm text-gray-600">유기식품 가공, 품질관리, 인증</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🌾 유기농업일반</span><span className="text-sm text-gray-500">20문항</span></div>
                  <p className="text-sm text-gray-600">유기농업 원리, 병해충 관리, 인증제도</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 합격 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 친환경농업 관련 법규 및 인증기준 숙지</li>
                  <li>• 토양 유기물 관리와 퇴비 제조 이해</li>
                  <li>• 생물적 방제와 천적 활용 학습</li>
                  <li>• 기출문제로 출제 경향 파악</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'practical' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-green-600">시험 유형</p>
                  <p className="text-2xl font-bold text-green-800">필답형</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-emerald-600">시험 시간</p>
                  <p className="text-2xl font-bold text-emerald-800">150분</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-teal-600">합격 기준</p>
                  <p className="text-2xl font-bold text-teal-800">60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">실기 시험과목</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-2">🌿 유기농업 실무</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 유기농산물 생산계획 수립</li>
                    <li>• 토양관리 및 퇴비제조</li>
                    <li>• 병해충 친환경 방제</li>
                    <li>• 인증심사 및 품질관리</li>
                    <li>• 유기식품 가공관리</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">📋 실기 준비 포인트</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 유기농산물 생산계획서 작성 연습</li>
                  <li>• 퇴비 제조 과정과 품질기준 숙지</li>
                  <li>• 친환경 인증기준 세부 내용 파악</li>
                  <li>• 실제 현장 사례 학습</li>
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
                  <td className="py-3 px-4">4월</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">2회</td>
                  <td className="py-3 px-4">4월</td>
                  <td className="py-3 px-4">5월</td>
                  <td className="py-3 px-4">7월</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">3회</td>
                  <td className="py-3 px-4">6월</td>
                  <td className="py-3 px-4">8월</td>
                  <td className="py-3 px-4">10월</td>
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
