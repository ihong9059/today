'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CorrectionsOfficerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'physical' | 'interview'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil/corrections-officer" className="text-slate-600 hover:text-slate-800 flex items-center gap-2">
            ← 교정직 공무원으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 시험 상세 정보</h1>

          <div className="flex gap-2 mb-6 flex-wrap">
            <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'written' ? 'bg-gradient-to-r from-slate-600 to-zinc-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>필기시험</button>
            <button onClick={() => setActiveTab('physical')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'physical' ? 'bg-gradient-to-r from-slate-600 to-zinc-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>체력검정</button>
            <button onClick={() => setActiveTab('interview')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'interview' ? 'bg-gradient-to-r from-slate-600 to-zinc-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>면접시험</button>
          </div>

          {activeTab === 'written' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600">총 문항</p>
                  <p className="text-2xl font-bold text-slate-800">100문항</p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-zinc-600">시험 시간</p>
                  <p className="text-2xl font-bold text-zinc-800">100분</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600">문제 유형</p>
                  <p className="text-2xl font-bold text-gray-800">객관식</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-stone-600">과락 기준</p>
                  <p className="text-2xl font-bold text-stone-800">40점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">공통과목 (3과목)</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">📝 국어</span><span className="text-sm text-gray-500">20문항</span></div>
                  <p className="text-sm text-gray-600">문법, 어휘, 독해, 작문</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🌐 영어</span><span className="text-sm text-gray-500">20문항</span></div>
                  <p className="text-sm text-gray-600">어휘, 문법, 독해</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🏛️ 한국사</span><span className="text-sm text-gray-500">20문항</span></div>
                  <p className="text-sm text-gray-600">선사시대~현대사</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">전문과목 (2과목)</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🔒 교정학개론</span><span className="text-sm text-gray-500">20문항</span></div>
                  <p className="text-sm text-gray-600">교정이론, 수용관리, 교정처우, 교정시설</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">⚖️ 형사소송법</span><span className="text-sm text-gray-500">20문항</span></div>
                  <p className="text-sm text-gray-600">수사, 공판, 증거, 상소</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 합격 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 교정학개론은 형집행법, 교정시설 규정 숙지</li>
                  <li>• 형사소송법은 수사·공판절차 중점 학습</li>
                  <li>• 공통과목은 다른 9급과 동일 수준</li>
                  <li>• 시간 관리: 문항당 1분</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'physical' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600">평가 종목</p>
                  <p className="text-2xl font-bold text-slate-800">5종목</p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-zinc-600">합격 기준</p>
                  <p className="text-2xl font-bold text-zinc-800">종목별 기준</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">체력검정 종목 (남/여)</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🏃 100m 달리기</span></div>
                  <p className="text-sm text-gray-600">남 14.0초/여 16.5초 이내</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🏃‍♂️ 1,000m 달리기</span></div>
                  <p className="text-sm text-gray-600">남 4분 10초/여 4분 50초 이내</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">💪 윗몸일으키기</span></div>
                  <p className="text-sm text-gray-600">남 50회/여 40회 이상 (60초)</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🤸 좌우 악력</span></div>
                  <p className="text-sm text-gray-600">남 왼47/오른52kg, 여 왼27/오른30kg</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🏋️ 팔굽혀펴기</span></div>
                  <p className="text-sm text-gray-600">남 50회/여 25회 이상 (60초)</p>
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                <h4 className="font-medium text-rose-800 mb-2">⚠️ 주의사항</h4>
                <ul className="text-sm text-rose-700 space-y-1">
                  <li>• 1개 종목이라도 기준 미달 시 불합격</li>
                  <li>• 체력검정은 필기 합격 후 진행</li>
                  <li>• 신체검사도 별도로 진행</li>
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
                <div className="bg-zinc-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-zinc-600">면접 시간</p>
                  <p className="text-2xl font-bold text-zinc-800">약 15분</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600">평가 요소</p>
                  <p className="text-2xl font-bold text-gray-800">5개 항목</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">면접 평가 항목</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 공무원으로서의 정신자세</li>
                    <li>• 전문지식과 응용능력</li>
                    <li>• 의사표현의 정확성과 논리성</li>
                    <li>• 예의·품행 및 성실성</li>
                    <li>• 창의력·의지력 및 발전가능성</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-medium text-green-800 mb-2">🎤 면접 준비 포인트</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 교정공무원 지원 동기와 비전 준비</li>
                  <li>• 교정시설 운영과 수용자 처우 이해</li>
                  <li>• 인권 존중과 재사회화 관점 정립</li>
                  <li>• 위기상황 대처 능력 준비</li>
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
                  <td className="py-3 px-4 font-medium">국가직 9급</td>
                  <td className="py-3 px-4">2월</td>
                  <td className="py-3 px-4">4월</td>
                  <td className="py-3 px-4">6~7월</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">지방직 9급</td>
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
