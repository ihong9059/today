'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CivilService9ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'interview'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/category/civil/civil-service-9"
            className="text-slate-600 hover:text-slate-800 flex items-center gap-2"
          >
            ← 9급 공채로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 시험 상세 정보</h1>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('written')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'written'
                  ? 'bg-gradient-to-r from-slate-500 to-gray-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              필기시험
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'interview'
                  ? 'bg-gradient-to-r from-slate-500 to-gray-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              면접시험
            </button>
          </div>

          {activeTab === 'written' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600">총 문항</p>
                  <p className="text-2xl font-bold text-slate-800">100문항</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600">시험 시간</p>
                  <p className="text-2xl font-bold text-gray-800">100분</p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-zinc-600">문제 유형</p>
                  <p className="text-2xl font-bold text-zinc-800">객관식</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-stone-600">과락 기준</p>
                  <p className="text-2xl font-bold text-stone-800">40점</p>
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
                    행정학개론, 사회, 과학, 수학, 행정법총론 등에서 2과목 선택 (각 20문항)
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 합격 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 과목별 과락(40점) 주의, 균형 있는 학습 필요</li>
                  <li>• 국어·영어·한국사는 기출문제 반복 학습</li>
                  <li>• 선택과목은 전공/적성에 맞게 선택</li>
                  <li>• 시간 관리: 문항당 1분</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600">면접 유형</p>
                  <p className="text-2xl font-bold text-slate-800">개별면접</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600">면접 시간</p>
                  <p className="text-2xl font-bold text-gray-800">약 10분</p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-zinc-600">평가 요소</p>
                  <p className="text-2xl font-bold text-zinc-800">5개 항목</p>
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
                    <li>• 적극성: 직무에 대한 열의와 적극성</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">🎤 면접 준비 포인트</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 자기소개서 기반 예상질문 준비</li>
                  <li>• 공직가치와 윤리관 정립</li>
                  <li>• 시사 이슈 파악</li>
                  <li>• 간결하고 논리적인 답변 연습</li>
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
                  <td className="py-3 px-4 font-medium">국가직</td>
                  <td className="py-3 px-4">2~3월</td>
                  <td className="py-3 px-4">4월</td>
                  <td className="py-3 px-4">6~7월</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">지방직</td>
                  <td className="py-3 px-4">5월</td>
                  <td className="py-3 px-4">6월</td>
                  <td className="py-3 px-4">8~9월</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* 정확한 일정은 사이버국가고시센터 확인</p>
        </div>
      </div>
    </div>
  );
}
