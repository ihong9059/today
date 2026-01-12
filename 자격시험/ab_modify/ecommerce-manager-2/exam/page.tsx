'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Ecommerce2ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/category/office/ecommerce-2"
            className="text-teal-600 hover:text-teal-800 flex items-center gap-2"
          >
            ← 전자상거래관리사 2급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 시험 상세 정보</h1>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('written')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'written'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'practical'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              실기시험
            </button>
          </div>

          {activeTab === 'written' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-teal-600">문항 수</p>
                  <p className="text-2xl font-bold text-teal-800">60문항</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-cyan-600">시험 시간</p>
                  <p className="text-2xl font-bold text-cyan-800">60분</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-blue-600">합격 기준</p>
                  <p className="text-2xl font-bold text-blue-800">60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">과목별 구성</h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">1. 전자상거래 일반</span>
                    <span className="text-sm text-gray-500">20문항</span>
                  </div>
                  <p className="text-sm text-gray-600">전자상거래 개념, 유형, 비즈니스 모델, 시장동향, 성공사례</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">2. 전자상거래 마케팅</span>
                    <span className="text-sm text-gray-500">20문항</span>
                  </div>
                  <p className="text-sm text-gray-600">온라인 마케팅 전략, 고객관계관리, 판촉활동, SNS 마케팅</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">3. 전자상거래 기술</span>
                    <span className="text-sm text-gray-500">20문항</span>
                  </div>
                  <p className="text-sm text-gray-600">웹 기술 기초, 보안, 결제시스템, 네트워크 기초</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-medium text-yellow-800 mb-2">💡 합격 전략</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 기출문제 패턴 분석 (유사 문제 반복 출제)</li>
                  <li>• 전자상거래 용어 정리 필수</li>
                  <li>• 최신 트렌드 (소셜커머스, 라이브커머스) 체크</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'practical' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-teal-600">시험 유형</p>
                  <p className="text-2xl font-bold text-teal-800">필답형</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-cyan-600">시험 시간</p>
                  <p className="text-2xl font-bold text-cyan-800">60분</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-blue-600">합격 기준</p>
                  <p className="text-2xl font-bold text-blue-800">60점</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">실기 출제 범위</h3>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium mb-2">전자상거래 실무</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 쇼핑몰 구축 및 운영 기초</li>
                    <li>• 상품 등록 및 관리</li>
                    <li>• 주문/배송/CS 처리</li>
                    <li>• 온라인 마케팅 실무</li>
                    <li>• 매출 분석 및 보고서 작성</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-medium text-green-800 mb-2">✅ 실기 준비 포인트</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 서술형 답안 작성 연습</li>
                  <li>• 실무 프로세스 흐름 이해</li>
                  <li>• 주요 용어 정확한 설명 능력</li>
                  <li>• 사례 기반 문제 대비</li>
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
                  <th className="text-left py-3 px-4">접수 기간</th>
                  <th className="text-left py-3 px-4">시험일</th>
                  <th className="text-left py-3 px-4">발표일</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">1회</td>
                  <td className="py-3 px-4">2월 중</td>
                  <td className="py-3 px-4">3월 중</td>
                  <td className="py-3 px-4">4월 중</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">2회</td>
                  <td className="py-3 px-4">4월 중</td>
                  <td className="py-3 px-4">5월 중</td>
                  <td className="py-3 px-4">6월 중</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">3회</td>
                  <td className="py-3 px-4">8월 중</td>
                  <td className="py-3 px-4">9월 중</td>
                  <td className="py-3 px-4">10월 중</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">4회</td>
                  <td className="py-3 px-4">10월 중</td>
                  <td className="py-3 px-4">11월 중</td>
                  <td className="py-3 px-4">12월 중</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* 정확한 일정은 대한상공회의소 자격평가사업단 확인</p>
        </div>
      </div>
    </div>
  );
}
