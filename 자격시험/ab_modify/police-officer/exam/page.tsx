'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PoliceOfficerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'physical' | 'interview'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil/police-officer" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            ← 경찰공무원(순경)으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 시험 상세 정보</h1>

          <div className="flex gap-2 mb-6 flex-wrap">
            <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'written' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>필기시험</button>
            <button onClick={() => setActiveTab('physical')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'physical' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>체력검사</button>
            <button onClick={() => setActiveTab('interview')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'interview' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>면접시험</button>
          </div>

          {activeTab === 'written' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-blue-600">총 문항</p>
                  <p className="text-2xl font-bold text-blue-800">120문항</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-indigo-600">시험 시간</p>
                  <p className="text-2xl font-bold text-indigo-800">120분</p>
                </div>
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-violet-600">문제 유형</p>
                  <p className="text-2xl font-bold text-violet-800">객관식</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600">과락 기준</p>
                  <p className="text-2xl font-bold text-slate-800">40점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">필기시험 과목 (3과목)</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">👮 경찰학개론</span><span className="text-sm text-gray-500">40문항</span></div>
                  <p className="text-sm text-gray-600">경찰행정학, 범죄예방론, 경비·경호론, 수사론</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">⚖️ 형사법</span><span className="text-sm text-gray-500">40문항</span></div>
                  <p className="text-sm text-gray-600">형법총론·각론, 형사소송법 통합</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">📜 헌법</span><span className="text-sm text-gray-500">40문항</span></div>
                  <p className="text-sm text-gray-600">헌법총론, 기본권, 통치구조</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 합격 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 형사법 비중이 가장 높음 - 철저히 대비</li>
                  <li>• 경찰학개론은 최신 경찰 정책 반영</li>
                  <li>• 헌법은 판례 중심 학습 필수</li>
                  <li>• 영어·한국사 검정 미리 취득</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'physical' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-blue-600">평가 종목</p>
                  <p className="text-2xl font-bold text-blue-800">5종목</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-indigo-600">합격 기준</p>
                  <p className="text-2xl font-bold text-indigo-800">평균 60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">체력검사 종목 (남/여)</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🏃 100m 달리기</span></div>
                  <p className="text-sm text-gray-600">남 13초/여 16초 이내 (1급)</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🏃‍♂️ 1,000m 달리기</span></div>
                  <p className="text-sm text-gray-600">남 3분50초/여 4분40초 이내 (1급)</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">💪 윗몸일으키기</span></div>
                  <p className="text-sm text-gray-600">남 58회/여 52회 이상 (1급, 60초)</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🤸 좌우 악력</span></div>
                  <p className="text-sm text-gray-600">남 61kg/여 40kg 이상 (1급)</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🏋️ 팔굽혀펴기</span></div>
                  <p className="text-sm text-gray-600">남 58회/여 28회 이상 (1급, 60초)</p>
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                <h4 className="font-medium text-rose-800 mb-2">⚠️ 주의사항</h4>
                <ul className="text-sm text-rose-700 space-y-1">
                  <li>• 1개 종목이라도 1점이면 불합격</li>
                  <li>• 5종목 평균 60점 이상 필요</li>
                  <li>• 체력 준비는 최소 6개월 전부터</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-blue-600">면접 유형</p>
                  <p className="text-2xl font-bold text-blue-800">개별면접</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-indigo-600">면접 시간</p>
                  <p className="text-2xl font-bold text-indigo-800">약 20분</p>
                </div>
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-violet-600">평가 요소</p>
                  <p className="text-2xl font-bold text-violet-800">6개 항목</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">면접 평가 항목</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 경찰관으로서의 적성: 직무수행에 필요한 자질</li>
                    <li>• 의사표현력: 논리적 사고력과 표현력</li>
                    <li>• 품성: 정직성, 성실성, 도덕성</li>
                    <li>• 예의 및 태도: 면접 태도와 예절</li>
                    <li>• 창의력: 문제해결 능력</li>
                    <li>• 전문지식: 경찰 직무 관련 지식</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-medium text-green-800 mb-2">🎤 면접 준비 포인트</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 경찰 지원 동기와 비전 명확히 준비</li>
                  <li>• 최근 치안 이슈와 경찰 정책 숙지</li>
                  <li>• 경찰 조직문화와 가치관 이해</li>
                  <li>• 상황 대처 능력 질문 대비</li>
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
                  <th className="text-left py-3 px-4">체력/면접</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">1차 공채</td>
                  <td className="py-3 px-4">1~2월</td>
                  <td className="py-3 px-4">3월</td>
                  <td className="py-3 px-4">4~5월</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">2차 공채</td>
                  <td className="py-3 px-4">5~6월</td>
                  <td className="py-3 px-4">7월</td>
                  <td className="py-3 px-4">8~9월</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">3차 공채</td>
                  <td className="py-3 px-4">8~9월</td>
                  <td className="py-3 px-4">10월</td>
                  <td className="py-3 px-4">11~12월</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* 정확한 일정은 경찰청 채용사이트 확인</p>
        </div>
      </div>
    </div>
  );
}
