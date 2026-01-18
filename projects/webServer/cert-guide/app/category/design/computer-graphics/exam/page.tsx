'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ComputerGraphicsOperatorExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/design/computer-graphics" className="text-purple-700 hover:text-purple-900 flex items-center gap-2">
            ← 컴퓨터그래픽스운용기능사로 돌아가기
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
                <h3 className="font-bold text-gray-800">시험과목 (4과목)</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🎨 산업디자인일반</span><span className="text-sm text-gray-500">15문항</span></div>
                  <p className="text-sm text-gray-600">디자인 원리, 조형요소, 디자인사</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🌈 색채및도법</span><span className="text-sm text-gray-500">15문항</span></div>
                  <p className="text-sm text-gray-600">색채학, 배색, 도법, 투상법</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">📐 디자인재료</span><span className="text-sm text-gray-500">15문항</span></div>
                  <p className="text-sm text-gray-600">재료의 특성, 인쇄, 표현기법</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">💻 컴퓨터그래픽스</span><span className="text-sm text-gray-500">15문항</span></div>
                  <p className="text-sm text-gray-600">그래픽 SW, 이미지 편집, 파일형식</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 합격 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 디자인 기초이론 완벽 숙지</li>
                  <li>• 색채학과 배색원리 이해</li>
                  <li>• 포토샵, 일러스트레이터 기능 파악</li>
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
                  <h4 className="font-medium text-gray-800 mb-2">🖥️ 컴퓨터그래픽스운용작업</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 포토샵을 이용한 이미지 편집</li>
                    <li>• 일러스트레이터를 이용한 벡터 디자인</li>
                    <li>• 인디자인을 이용한 편집디자인</li>
                    <li>• 시안 제작 및 출력</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">📋 실기 준비 포인트</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 포토샵 단축키 및 기능 숙지</li>
                  <li>• 펜툴 사용법 완벽 마스터</li>
                  <li>• 레이어, 마스크 활용법 학습</li>
                  <li>• 실제 작업 시간 배분 연습</li>
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
