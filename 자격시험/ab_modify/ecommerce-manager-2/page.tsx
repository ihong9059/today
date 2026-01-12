'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Ecommerce2Page() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects'>('overview');

  const subjects = [
    { name: '전자상거래 일반', icon: '📚', desc: '전자상거래 개념, 유형, 비즈니스 모델', href: '/category/office/ecommerce-2/study/ec-basics', questions: 50 },
    { name: '전자상거래 마케팅', icon: '📢', desc: '온라인 마케팅, 고객관리, 판촉전략', href: '/category/office/ecommerce-2/study/ec-marketing', questions: 50 },
    { name: '전자상거래 기술', icon: '💻', desc: '웹기술, 보안, 결제시스템 기초', href: '/category/office/ecommerce-2/study/ec-tech', questions: 50 },
    { name: '전자상거래 실무', icon: '📋', desc: '실기 - 쇼핑몰 운영 실무', href: '/category/office/ecommerce-2/study/practical', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/category/office"
            className="text-teal-600 hover:text-teal-800 flex items-center gap-2"
          >
            ← 사무·경영 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">
              🛍️
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">전자상거래관리사 2급</h1>
              <p className="text-gray-600">온라인 쇼핑몰 운영의 기초 실무 역량을 검증하는 국가공인 자격증</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'overview'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              시험 개요
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'subjects'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              과목별 학습
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-teal-50 rounded-xl p-4">
                  <p className="text-sm text-teal-600 mb-1">시험 시간</p>
                  <p className="text-xl font-bold text-teal-800">필기 60분 / 실기 60분</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4">
                  <p className="text-sm text-cyan-600 mb-1">합격 기준</p>
                  <p className="text-xl font-bold text-cyan-800">각 과목 40점, 평균 60점</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-600 mb-1">필기 구성</p>
                  <p className="text-xl font-bold text-blue-800">3과목 60문항</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <p className="text-sm text-indigo-600 mb-1">합격률</p>
                  <p className="text-xl font-bold text-indigo-800">필기 45% / 실기 35%</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-2">시험 일정</h3>
                <p className="text-gray-600">연 4회 (3월, 5월, 9월, 11월)</p>
                <p className="text-gray-600">대한상공회의소 주관</p>
              </div>

              <Link
                href="/category/office/ecommerce-2/exam"
                className="block w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition"
              >
                시험 상세 정보 보기 →
              </Link>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div className="space-y-4">
              {subjects.map((subject) => (
                <Link
                  key={subject.name}
                  href={subject.href}
                  className="block bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-teal-700">
                          {subject.name}
                        </h3>
                        <p className="text-sm text-gray-500">{subject.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">{subject.questions}문제</span>
                      <span className="ml-2 text-teal-500 group-hover:translate-x-1 inline-block transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📌 2급 vs 1급 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">구분</th>
                  <th className="text-center py-2">2급</th>
                  <th className="text-center py-2">1급</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">필기 과목</td>
                  <td className="text-center">3과목</td>
                  <td className="text-center">4과목</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">필기 시간</td>
                  <td className="text-center">60분</td>
                  <td className="text-center">100분</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">실기 유형</td>
                  <td className="text-center">필답형</td>
                  <td className="text-center">필답형+작업형</td>
                </tr>
                <tr>
                  <td className="py-2">난이도</td>
                  <td className="text-center text-teal-600 font-medium">기초 실무</td>
                  <td className="text-center text-indigo-600 font-medium">전문 관리</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
