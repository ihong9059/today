'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VisualDesignEngineerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/design/visual-design-engineer" className="text-pink-700 hover:text-pink-900 flex items-center gap-2">
            ← 시각디자인기사로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 시험 상세 정보</h1>

          <div className="flex gap-2 mb-6">
            <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'written' ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>필기시험</button>
            <button onClick={() => setActiveTab('practical')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'practical' ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>실기시험</button>
          </div>

          {activeTab === 'written' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-pink-600">총 문항</p>
                  <p className="text-2xl font-bold text-pink-800">100문항</p>
                </div>
                <div className="bg-rose-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-rose-600">시험 시간</p>
                  <p className="text-2xl font-bold text-rose-800">150분</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-red-600">문제 유형</p>
                  <p className="text-2xl font-bold text-red-800">객관식</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-orange-600">합격 기준</p>
                  <p className="text-2xl font-bold text-orange-800">60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">시험과목 (4과목)</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">👁️ 시각디자인론</span><span className="text-sm text-gray-500">25문항</span></div>
                  <p className="text-sm text-gray-600">디자인 원리, 조형요소, 디자인사</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🌈 색채학</span><span className="text-sm text-gray-500">25문항</span></div>
                  <p className="text-sm text-gray-600">색채이론, 배색, 색채심리</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">✏️ 타이포그래피</span><span className="text-sm text-gray-500">25문항</span></div>
                  <p className="text-sm text-gray-600">문자디자인, 레이아웃, 편집디자인</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">📢 광고학</span><span className="text-sm text-gray-500">25문항</span></div>
                  <p className="text-sm text-gray-600">광고기획, 마케팅, 브랜드전략</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 합격 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 디자인 기초이론과 역사 완벽 숙지</li>
                  <li>• 색채학 표색계와 배색원리 이해</li>
                  <li>• 타이포그래피 용어와 원리 파악</li>
                  <li>• 광고 마케팅 전략 학습</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'practical' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-pink-600">시험 유형</p>
                  <p className="text-2xl font-bold text-pink-800">작업형</p>
                </div>
                <div className="bg-rose-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-rose-600">시험 시간</p>
                  <p className="text-2xl font-bold text-rose-800">5시간</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-red-600">합격 기준</p>
                  <p className="text-2xl font-bold text-red-800">60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">실기 시험과목</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-2">🎨 시각디자인 실무</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 포스터 디자인</li>
                    <li>• 브랜드 아이덴티티 제작</li>
                    <li>• 편집디자인</li>
                    <li>• 광고 시안 제작</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">📋 실기 준비 포인트</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 포토샵, 일러스트레이터 숙련</li>
                  <li>• 시간 배분 전략 수립</li>
                  <li>• 다양한 시안 작업 연습</li>
                  <li>• 출력 및 마감 처리 숙지</li>
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
