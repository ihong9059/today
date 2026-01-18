'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InteriorArchitectExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    { id: 1, name: '실내디자인론', topics: 5, questions: 50, path: '/category/construction/interior-architect/study/interior-planning' },
    { id: 2, name: '실내환경', topics: 5, questions: 50, path: '/category/construction/interior-architect/study/interior-environment' },
    { id: 3, name: '실내건축구조', topics: 5, questions: 50, path: '/category/construction/interior-architect/study/interior-structure' },
    { id: 4, name: '실내건축재료', topics: 5, questions: 50, path: '/category/construction/interior-architect/study/interior-materials' },
  ];

  const practicalSubjects = [
    { id: 1, name: '실기시험 대비', topics: 5, questions: 25, path: '/category/construction/interior-architect/study/practical' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/construction/interior-architect" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <span className="mr-2">←</span> 실내건축기사
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">시험 정보</h1>
          <p className="text-white/90">과목별 학습을 시작하세요</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'written'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'practical'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            실기시험
          </button>
        </div>

        {activeTab === 'written' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800 font-medium">필기시험 안내</p>
              <p className="text-blue-700 text-sm mt-1">
                4과목 100문항, 2시간 30분 / 과목당 40점 이상, 평균 60점 이상
              </p>
            </div>
            {writtenSubjects.map((subject) => (
              <Link
                key={subject.id}
                href={subject.path}
                className="block bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                      {subject.id}
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-800">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.topics}개 주제 · {subject.questions}문제</p>
                    </div>
                  </div>
                  <span className="text-purple-600">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'practical' && (
          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800 font-medium">실기시험 안내</p>
              <p className="text-yellow-700 text-sm mt-1">
                작업형 시험으로 5시간 동안 진행됩니다. 도면 작성이 핵심입니다.
              </p>
            </div>
            {practicalSubjects.map((subject) => (
              <Link
                key={subject.id}
                href={subject.path}
                className="block bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                      {subject.id}
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-800">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.topics}개 주제 · {subject.questions}문제</p>
                    </div>
                  </div>
                  <span className="text-purple-600">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
