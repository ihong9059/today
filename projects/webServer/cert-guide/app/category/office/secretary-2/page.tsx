'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Secretary2Page() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects'>('overview');

  const subjects = [
    { name: '비서실무', icon: '📋', desc: '비서의 역할, 업무처리, 전화/방문객 응대', href: '/category/office/secretary-2/study/secretary-basics', questions: 50 },
    { name: '사무영어', icon: '🌐', desc: '기초 비즈니스 영어, 전화/이메일 표현', href: '/category/office/secretary-2/study/office-english', questions: 50 },
    { name: '사무정보관리', icon: '💻', desc: 'OA 기초, 문서작성, 정보관리', href: '/category/office/secretary-2/study/office-apps', questions: 50 },
    { name: '비서실무 (실기)', icon: '✍️', desc: '필답형 실기 시험', href: '/category/office/secretary-2/study/practical', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/category/office"
            className="text-pink-600 hover:text-pink-800 flex items-center gap-2"
          >
            ← 사무·경영 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center text-3xl">
              👩‍💼
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">비서 2급</h1>
              <p className="text-gray-600">중간관리자를 보좌하는 일반 비서 역량을 검증하는 국가기술자격증</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'overview'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              시험 개요
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'subjects'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              과목별 학습
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-xl p-4">
                  <p className="text-sm text-pink-600 mb-1">시험 시간</p>
                  <p className="text-xl font-bold text-pink-800">필기 60분 / 실기 90분</p>
                </div>
                <div className="bg-rose-50 rounded-xl p-4">
                  <p className="text-sm text-rose-600 mb-1">합격 기준</p>
                  <p className="text-xl font-bold text-rose-800">각 과목 40점, 평균 60점</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-sm text-red-600 mb-1">필기 구성</p>
                  <p className="text-xl font-bold text-red-800">3과목 60문항</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-sm text-orange-600 mb-1">합격률</p>
                  <p className="text-xl font-bold text-orange-800">필기 50% / 실기 40%</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-2">시험 일정</h3>
                <p className="text-gray-600">연 3회 (상시) - 한국산업인력공단 주관</p>
                <p className="text-gray-600">필기 합격 후 2년 내 실기 응시</p>
              </div>

              <div className="bg-pink-50 rounded-xl p-4">
                <h3 className="font-bold text-pink-800 mb-2">2급 특징</h3>
                <ul className="text-sm text-pink-700 space-y-1">
                  <li>• 1급보다 난이도가 낮아 입문자에게 적합</li>
                  <li>• 기초 비서 실무 역량 검증</li>
                  <li>• 취업 시 기본 자격으로 활용</li>
                  <li>• 1급 취득 전 단계로 추천</li>
                </ul>
              </div>

              <Link
                href="/category/office/secretary-2/exam"
                className="block w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center rounded-xl font-medium hover:from-pink-600 hover:to-rose-600 transition"
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
                  className="block bg-gray-50 hover:bg-pink-50 rounded-xl p-4 transition group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-pink-700">
                          {subject.name}
                        </h3>
                        <p className="text-sm text-gray-500">{subject.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">{subject.questions}문제</span>
                      <span className="ml-2 text-pink-500 group-hover:translate-x-1 inline-block transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📊 1급 vs 2급 비교</h2>
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
                  <td className="py-2">실기 시간</td>
                  <td className="text-center">90분</td>
                  <td className="text-center">150분</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">실기 유형</td>
                  <td className="text-center">필답형</td>
                  <td className="text-center">필답형+작업형</td>
                </tr>
                <tr>
                  <td className="py-2">난이도</td>
                  <td className="text-center text-pink-600 font-medium">기초 실무</td>
                  <td className="text-center text-rose-600 font-medium">고급 전문</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
