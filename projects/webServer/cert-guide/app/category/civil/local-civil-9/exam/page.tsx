'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LocalCivil9ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'interview'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/category/civil/local-civil-9"
            className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2"
          >
            ← 지방직 9급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 시험 상세 정보</h1>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('written')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'written'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              필기시험
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'interview'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              면접시험
            </button>
          </div>

          {activeTab === 'written' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-emerald-600">총 문항</p>
                  <p className="text-2xl font-bold text-emerald-800">100문항</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-teal-600">시험 시간</p>
                  <p className="text-2xl font-bold text-teal-800">100분</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-cyan-600">문제 유형</p>
                  <p className="text-2xl font-bold text-cyan-800">객관식</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-green-600">과락 기준</p>
                  <p className="text-2xl font-bold text-green-800">40점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">필수과목 (3과목)</h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">📝 국어</span>
                    <span className="text-sm text-gray-500">20문항</span>
                  </div>
                  <p className="text-sm text-gray-600">문법, 어휘, 독해, 작문, 국문학</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">🌐 영어</span>
                    <span className="text-sm text-gray-500">20문항</span>
                  </div>
                  <p className="text-sm text-gray-600">어휘, 문법, 독해</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">🏛️ 한국사</span>
                    <span className="text-sm text-gray-500">20문항</span>
                  </div>
                  <p className="text-sm text-gray-600">선사시대~현대사</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">선택과목 (2과목)</h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600">
                    행정학개론, 지방자치론, 사회복지학개론, 사회, 과학, 수학 등에서 2과목 선택 (각 20문항)
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 합격 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 국가직과 유사하나 지역별 커트라인 상이</li>
                  <li>• 지방자치론은 지방직 특화 과목으로 유리</li>
                  <li>• 각 지자체 선발 인원 확인 필수</li>
                  <li>• 시간 관리: 문항당 1분</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-emerald-600">면접 유형</p>
                  <p className="text-2xl font-bold text-emerald-800">개별면접</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-teal-600">면접 시간</p>
                  <p className="text-2xl font-bold text-teal-800">약 10분</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-cyan-600">평가 요소</p>
                  <p className="text-2xl font-bold text-cyan-800">5개 항목</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">면접 평가 항목</h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 공직관: 국가관, 공직윤리, 책임감</li>
                    <li>• 전문성: 직무수행에 필요한 기본 지식</li>
                    <li>• 의사표현: 의사표현의 정확성과 논리성</li>
                    <li>• 예의·품행: 예의바른 태도와 성실성</li>
                    <li>• 지역이해: 해당 지역에 대한 관심과 이해</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">🎤 면접 준비 포인트</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 해당 지자체의 주요 정책과 현안 파악</li>
                  <li>• 지역 특성과 발전 방향 이해</li>
                  <li>• 지방공무원으로서의 비전 준비</li>
                  <li>• 주민 서비스 마인드 강조</li>
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
                  <th className="text-left py-3 px-4">구분</th>
                  <th className="text-left py-3 px-4">원서접수</th>
                  <th className="text-left py-3 px-4">필기시험</th>
                  <th className="text-left py-3 px-4">면접시험</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">지방직 통합</td>
                  <td className="py-3 px-4">5월</td>
                  <td className="py-3 px-4">6월</td>
                  <td className="py-3 px-4">8~9월</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">서울시</td>
                  <td className="py-3 px-4">5월</td>
                  <td className="py-3 px-4">6월</td>
                  <td className="py-3 px-4">9월</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* 정확한 일정은 각 지자체 인사위원회 확인</p>
        </div>
      </div>
    </div>
  );
}
