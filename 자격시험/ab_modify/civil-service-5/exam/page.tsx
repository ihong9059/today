'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CivilService5ExamPage() {
  const [activeTab, setActiveTab] = useState<'psat' | 'essay' | 'interview'>('psat');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/category/civil/civil-service-5"
            className="text-slate-600 hover:text-slate-800 flex items-center gap-2"
          >
            ← 5급 공채로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 시험 상세 정보</h1>

          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setActiveTab('psat')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'psat'
                  ? 'bg-gradient-to-r from-slate-600 to-gray-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              1차 PSAT
            </button>
            <button
              onClick={() => setActiveTab('essay')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'essay'
                  ? 'bg-gradient-to-r from-slate-600 to-gray-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              2차 논술
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'interview'
                  ? 'bg-gradient-to-r from-slate-600 to-gray-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              3차 면접
            </button>
          </div>

          {activeTab === 'psat' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600">총 문항</p>
                  <p className="text-2xl font-bold text-slate-800">120문항</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600">총 시간</p>
                  <p className="text-2xl font-bold text-gray-800">270분</p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-zinc-600">문제 유형</p>
                  <p className="text-2xl font-bold text-zinc-800">객관식</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-stone-600">합격 기준</p>
                  <p className="text-2xl font-bold text-stone-800">고득점순</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">과목별 구성</h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">📖 언어논리</span>
                    <span className="text-sm text-gray-500">40문항 / 90분</span>
                  </div>
                  <p className="text-sm text-gray-600">논증분석, 비판적 독해, 추론, 언어추리</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">📊 자료해석</span>
                    <span className="text-sm text-gray-500">40문항 / 90분</span>
                  </div>
                  <p className="text-sm text-gray-600">통계분석, 수치추론, 자료비교, 계산</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">🎯 상황판단</span>
                    <span className="text-sm text-gray-500">40문항 / 90분</span>
                  </div>
                  <p className="text-sm text-gray-600">법규적용, 상황추론, 의사결정, 퍼즐</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 PSAT 준비 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 시간 관리가 핵심 (문항당 약 2분 15초)</li>
                  <li>• 기출문제 반복 학습으로 유형 파악</li>
                  <li>• 언어논리는 독해 속도와 정확성이 중요</li>
                  <li>• 자료해석은 계산 속도 훈련 필수</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'essay' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600">필수과목</p>
                  <p className="text-2xl font-bold text-slate-800">4과목</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600">과목당 시간</p>
                  <p className="text-2xl font-bold text-gray-800">120분</p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-zinc-600">문제 유형</p>
                  <p className="text-2xl font-bold text-zinc-800">논술형</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-stone-600">시험 기간</p>
                  <p className="text-2xl font-bold text-stone-800">2일</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">필수과목 (행정직)</h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">⚖️ 헌법</span>
                    <span className="text-sm text-gray-500">1일차</span>
                  </div>
                  <p className="text-sm text-gray-600">헌법총론, 기본권론, 통치구조론</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">📜 행정법</span>
                    <span className="text-sm text-gray-500">1일차</span>
                  </div>
                  <p className="text-sm text-gray-600">행정법총론, 행정구제법, 행정조직법</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">🏛️ 행정학</span>
                    <span className="text-sm text-gray-500">2일차</span>
                  </div>
                  <p className="text-sm text-gray-600">행정이론, 조직론, 인사행정, 정책학</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">💹 경제학</span>
                    <span className="text-sm text-gray-500">2일차</span>
                  </div>
                  <p className="text-sm text-gray-600">미시경제학, 거시경제학, 재정학</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-medium text-green-800 mb-2">✅ 논술 준비 포인트</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 기본서 완독 후 심화학습 진행</li>
                  <li>• 판례와 학설 정리 필수</li>
                  <li>• 실제 논술 답안 작성 연습</li>
                  <li>• 최신 정책 이슈 파악</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600">면접 유형</p>
                  <p className="text-2xl font-bold text-slate-800">개별+집단</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600">면접 기간</p>
                  <p className="text-2xl font-bold text-gray-800">2일</p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-zinc-600">평가 요소</p>
                  <p className="text-2xl font-bold text-zinc-800">5개 항목</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">면접 평가 항목</h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium mb-2">개별면접</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 공직관 및 국가관</li>
                    <li>• 전문지식과 응용능력</li>
                    <li>• 의사표현력과 논리성</li>
                    <li>• 창의성과 문제해결력</li>
                    <li>• 품성과 예의</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium mb-2">집단토의</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 정책 주제에 대한 토론</li>
                    <li>• 협조성과 리더십</li>
                    <li>• 설득력과 경청 능력</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">🎤 면접 준비 포인트</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 시사 이슈와 정책 동향 파악</li>
                  <li>• 자기소개서 기반 예상질문 준비</li>
                  <li>• 스터디를 통한 모의면접 연습</li>
                  <li>• 공직자로서의 가치관 정립</li>
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
                  <th className="text-left py-3 px-4">시험일</th>
                  <th className="text-left py-3 px-4">합격발표</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">1차 PSAT</td>
                  <td className="py-3 px-4">1월</td>
                  <td className="py-3 px-4">3월</td>
                  <td className="py-3 px-4">4월</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">2차 논술</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">6~7월</td>
                  <td className="py-3 px-4">8월</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">3차 면접</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">9~10월</td>
                  <td className="py-3 px-4">11월</td>
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
