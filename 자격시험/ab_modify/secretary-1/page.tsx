'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Secretary1Page() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects'>('overview');

  const subjects = [
    { name: '비서실무론', icon: '📋', desc: '비서직의 역할, 업무수행, 의전 등', href: '/category/office/secretary-1/study/secretary-theory', questions: 50 },
    { name: '사무관리론', icon: '🗂️', desc: '사무환경, 문서관리, 회의관리 등', href: '/category/office/secretary-1/study/office-management', questions: 50 },
    { name: '비서영어', icon: '🌐', desc: '비즈니스 영어, 영문서 작성, 커뮤니케이션', href: '/category/office/secretary-1/study/office-english', questions: 50 },
    { name: '사무정보관리론', icon: '💻', desc: 'OA시스템, 정보관리, 데이터베이스', href: '/category/office/secretary-1/study/office-info', questions: 50 },
    { name: '비서실무 (실기)', icon: '✍️', desc: '필답형+작업형 실기 시험', href: '/category/office/secretary-1/study/practical', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/category/office"
            className="text-rose-600 hover:text-rose-800 flex items-center gap-2"
          >
            ← 사무·경영 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center text-3xl">
              👩‍💼
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">비서 1급</h1>
              <p className="text-gray-600">최고경영자를 보좌하는 전문 비서 역량을 검증하는 국가기술자격증</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'overview'
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              시험 개요
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'subjects'
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              과목별 학습
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-rose-50 rounded-xl p-4">
                  <p className="text-sm text-rose-600 mb-1">시험 시간</p>
                  <p className="text-xl font-bold text-rose-800">필기 100분 / 실기 150분</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <p className="text-sm text-pink-600 mb-1">합격 기준</p>
                  <p className="text-xl font-bold text-pink-800">각 과목 40점, 평균 60점</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-600 mb-1">필기 구성</p>
                  <p className="text-xl font-bold text-purple-800">4과목 80문항</p>
                </div>
                <div className="bg-fuchsia-50 rounded-xl p-4">
                  <p className="text-sm text-fuchsia-600 mb-1">합격률</p>
                  <p className="text-xl font-bold text-fuchsia-800">필기 40% / 실기 30%</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-2">시험 일정</h3>
                <p className="text-gray-600">연 3회 (상시) - 한국산업인력공단 주관</p>
                <p className="text-gray-600">필기 합격 후 2년 내 실기 응시</p>
              </div>

              <div className="bg-rose-50 rounded-xl p-4">
                <h3 className="font-bold text-rose-800 mb-2">1급 vs 2급 vs 3급</h3>
                <ul className="text-sm text-rose-700 space-y-1">
                  <li>• 1급: 최고경영자 보좌, 고급 의전, 전략적 업무</li>
                  <li>• 2급: 중간관리자 보좌, 일반 업무 수행</li>
                  <li>• 3급: 기초 사무보조 업무</li>
                </ul>
              </div>

              <Link
                href="/category/office/secretary-1/exam"
                className="block w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-center rounded-xl font-medium hover:from-rose-600 hover:to-pink-600 transition"
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
                  className="block bg-gray-50 hover:bg-rose-50 rounded-xl p-4 transition group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-rose-700">
                          {subject.name}
                        </h3>
                        <p className="text-sm text-gray-500">{subject.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">{subject.questions}문제</span>
                      <span className="ml-2 text-rose-500 group-hover:translate-x-1 inline-block transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">💼 취업 및 진로</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-800 mb-2">주요 취업처</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 대기업 CEO/임원 비서실</li>
                <li>• 외국계 기업</li>
                <li>• 금융기관</li>
                <li>• 법률/회계법인</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-800 mb-2">우대 사항</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 공기업/공공기관 가산점</li>
                <li>• 대기업 채용 시 우대</li>
                <li>• 해외 취업 시 활용</li>
                <li>• 승진/이직 시 유리</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
