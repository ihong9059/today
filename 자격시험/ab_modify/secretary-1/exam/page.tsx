'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Secretary1ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/category/office/secretary-1"
            className="text-rose-600 hover:text-rose-800 flex items-center gap-2"
          >
            ← 비서 1급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 시험 상세 정보</h1>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('written')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'written'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'practical'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              실기시험
            </button>
          </div>

          {activeTab === 'written' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-rose-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-rose-600">문항 수</p>
                  <p className="text-2xl font-bold text-rose-800">80문항</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-pink-600">시험 시간</p>
                  <p className="text-2xl font-bold text-pink-800">100분</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-purple-600">합격 기준</p>
                  <p className="text-2xl font-bold text-purple-800">60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">과목별 구성</h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">1. 비서실무론</span>
                    <span className="text-sm text-gray-500">20문항</span>
                  </div>
                  <p className="text-sm text-gray-600">비서직의 역할, 업무수행 능력, 의전, 출장관리, 일정관리</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">2. 사무관리론</span>
                    <span className="text-sm text-gray-500">20문항</span>
                  </div>
                  <p className="text-sm text-gray-600">사무환경, 문서관리, 회의관리, 경영일반</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">3. 비서영어</span>
                    <span className="text-sm text-gray-500">20문항</span>
                  </div>
                  <p className="text-sm text-gray-600">비즈니스 영어, 영문서 작성, 전화/이메일 영어</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">4. 사무정보관리론</span>
                    <span className="text-sm text-gray-500">20문항</span>
                  </div>
                  <p className="text-sm text-gray-600">OA시스템, 정보관리, 데이터베이스, 통신</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 합격 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 기출문제 반복 학습 (유사 문제 출제 많음)</li>
                  <li>• 비서영어는 비즈니스 표현 암기 필수</li>
                  <li>• 의전/프로토콜 관련 세부 내용 숙지</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'practical' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-rose-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-rose-600">시험 유형</p>
                  <p className="text-2xl font-bold text-rose-800">필답+작업</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-pink-600">시험 시간</p>
                  <p className="text-2xl font-bold text-pink-800">150분</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-purple-600">합격 기준</p>
                  <p className="text-2xl font-bold text-purple-800">60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">실기 출제 범위</h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium mb-2">필답형</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 비서실무 상황 판단 문제</li>
                    <li>• 의전/프로토콜 실무</li>
                    <li>• 영문 비즈니스 레터 작성</li>
                    <li>• 일정/출장 관리 계획</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium mb-2">작업형</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 문서 작성 (한글/워드)</li>
                    <li>• 엑셀 데이터 처리</li>
                    <li>• 프레젠테이션 작성</li>
                    <li>• 이메일/공문 작성</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-medium text-green-800 mb-2">✅ 실기 준비 포인트</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• OA 프로그램 숙련도 향상 (한글, 엑셀, PPT)</li>
                  <li>• 영문 이메일/레터 양식 암기</li>
                  <li>• 실제 비서 업무 시나리오 연습</li>
                  <li>• 시간 배분 연습 필수</li>
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
