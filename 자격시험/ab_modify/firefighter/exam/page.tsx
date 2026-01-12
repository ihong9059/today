'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FirefighterExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'physical' | 'interview'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil/firefighter" className="text-red-600 hover:text-red-800 flex items-center gap-2">
            ← 소방공무원으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 시험 상세 정보</h1>

          <div className="flex gap-2 mb-6 flex-wrap">
            <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'written' ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>필기시험</button>
            <button onClick={() => setActiveTab('physical')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'physical' ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>체력시험</button>
            <button onClick={() => setActiveTab('interview')} className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'interview' ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>면접시험</button>
          </div>

          {activeTab === 'written' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-red-600">총 문항</p>
                  <p className="text-2xl font-bold text-red-800">75문항</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-orange-600">시험 시간</p>
                  <p className="text-2xl font-bold text-orange-800">75분</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-amber-600">문제 유형</p>
                  <p className="text-2xl font-bold text-amber-800">객관식</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-yellow-600">과락 기준</p>
                  <p className="text-2xl font-bold text-yellow-800">40점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">필기시험 과목 (3과목)</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🔥 소방학개론</span><span className="text-sm text-gray-500">25문항</span></div>
                  <p className="text-sm text-gray-600">연소·화재이론, 소화원리, 소방시설, 재난관리</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">📋 소방관계법규</span><span className="text-sm text-gray-500">25문항</span></div>
                  <p className="text-sm text-gray-600">소방기본법, 소방시설법, 위험물안전관리법</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">⚖️ 행정법총론</span><span className="text-sm text-gray-500">25문항</span></div>
                  <p className="text-sm text-gray-600">행정법 일반이론, 행정작용, 행정구제</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 합격 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 소방학개론은 이론 + 실무 지식 병행 학습</li>
                  <li>• 소방관계법규는 최신 개정 내용 반영</li>
                  <li>• 행정법총론은 판례 중심 학습</li>
                  <li>• 시간 관리: 문항당 1분</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'physical' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-red-600">평가 종목</p>
                  <p className="text-2xl font-bold text-red-800">6종목</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-orange-600">합격 기준</p>
                  <p className="text-2xl font-bold text-orange-800">총점 60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">체력시험 종목 (남/여)</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🪜 악력</span></div>
                  <p className="text-sm text-gray-600">남 61kg/여 40kg 이상 (10점)</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🏃 왕복오래달리기</span></div>
                  <p className="text-sm text-gray-600">남 72회/여 42회 이상 (10점)</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">💪 윗몸일으키기</span></div>
                  <p className="text-sm text-gray-600">남 51회/여 42회 이상 (10점, 60초)</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🤸 좌굴유연성</span></div>
                  <p className="text-sm text-gray-600">남 22cm/여 25cm 이상 (10점)</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🏋️ 제자리멀리뛰기</span></div>
                  <p className="text-sm text-gray-600">남 254cm/여 201cm 이상 (10점)</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="font-medium">🏃‍♂️ 배근력</span></div>
                  <p className="text-sm text-gray-600">남 192kg/여 102kg 이상 (10점)</p>
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                <h4 className="font-medium text-rose-800 mb-2">⚠️ 주의사항</h4>
                <ul className="text-sm text-rose-700 space-y-1">
                  <li>• 1개 종목이라도 1점이면 불합격</li>
                  <li>• 6종목 총점 60점 이상 필요</li>
                  <li>• 체력 준비는 최소 6개월 전부터</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-red-600">면접 유형</p>
                  <p className="text-2xl font-bold text-red-800">개별면접</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-orange-600">면접 시간</p>
                  <p className="text-2xl font-bold text-orange-800">약 15분</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-amber-600">평가 요소</p>
                  <p className="text-2xl font-bold text-amber-800">5개 항목</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">면접 평가 항목</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 소방공무원으로서의 적성: 직무수행 자질</li>
                    <li>• 전문지식: 소방 관련 기본 지식</li>
                    <li>• 의사표현력: 논리적 사고와 표현</li>
                    <li>• 품성: 정직성, 성실성, 도덕성</li>
                    <li>• 예의 및 태도: 면접 예절</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-medium text-green-800 mb-2">🎤 면접 준비 포인트</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 소방관 지원 동기와 비전 명확히 준비</li>
                  <li>• 최근 화재·재난 사례와 대응 숙지</li>
                  <li>• 소방조직과 소방정책 이해</li>
                  <li>• 위기상황 대처 능력 질문 대비</li>
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
                  <td className="py-3 px-4 font-medium">상반기</td>
                  <td className="py-3 px-4">2~3월</td>
                  <td className="py-3 px-4">4월</td>
                  <td className="py-3 px-4">5~6월</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">하반기</td>
                  <td className="py-3 px-4">8~9월</td>
                  <td className="py-3 px-4">10월</td>
                  <td className="py-3 px-4">11~12월</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* 정확한 일정은 소방청 채용사이트 확인</p>
        </div>
      </div>
    </div>
  );
}
