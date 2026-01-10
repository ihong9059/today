'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function WrittenExamContent() {
  const subjects = [
    {
      id: 'drawing',
      name: '기계제도',
      icon: '📐',
      color: 'from-blue-500 to-cyan-500',
      questions: 20,
      topics: ['제도통칙', 'KS규격', '투상법', '단면도', '치수기입법', '공차와 끼워맞춤'],
      studyLink: '/category/mechanical/mechanical-craftsman/study/drawing',
    },
    {
      id: 'material',
      name: '기계재료',
      icon: '🔩',
      color: 'from-gray-500 to-slate-500',
      questions: 20,
      topics: ['금속재료', '철강재료', '비철금속', '열처리', '비금속재료', '재료시험'],
      studyLink: '/category/mechanical/mechanical-craftsman/study/material',
    },
    {
      id: 'design',
      name: '기계설계',
      icon: '⚙️',
      color: 'from-amber-500 to-orange-500',
      questions: 20,
      topics: ['나사', '볼트너트', '축', '베어링', '기어', '벨트/체인', '스프링'],
      studyLink: '/category/mechanical/mechanical-craftsman/study/design',
    },
    {
      id: 'manufacturing',
      name: '기계제작법',
      icon: '🏭',
      color: 'from-green-500 to-emerald-500',
      questions: 20,
      topics: ['주조', '소성가공', '용접', '절삭가공', '연삭가공', '특수가공'],
      studyLink: '/category/mechanical/mechanical-craftsman/study/manufacturing',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h3 className="font-bold text-amber-800 mb-2">📝 필기시험 안내</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• 시험시간: 2시간 (120분)</li>
          <li>• 문항수: 총 80문항 (과목당 20문항)</li>
          <li>• 합격기준: 전과목 평균 60점 이상, 과목당 40점 이상</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className={`bg-gradient-to-r ${subject.color} p-4`}>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{subject.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{subject.name}</h3>
                    <p className="text-white/80 text-sm">{subject.questions}문항</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-2">주요 출제 범위</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {subject.topics.map((topic, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{topic}</span>
                ))}
              </div>
              <Link
                href={subject.studyLink}
                className={`block w-full text-center py-2.5 rounded-lg text-white font-medium bg-gradient-to-r ${subject.color} hover:opacity-90 transition`}
              >
                학습하기 →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticalExamContent() {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <h3 className="font-bold text-green-800 mb-2">🔧 실기시험 안내</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• 시험시간: 2시간 30분</li>
          <li>• 시험형태: 필답형</li>
          <li>• 합격기준: 60점 이상</li>
          <li>• 출제범위: 기계제도 및 설계, 기계가공법</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
          <div className="flex items-center gap-3 text-white">
            <span className="text-3xl">📋</span>
            <div>
              <h3 className="font-bold text-lg">실기시험 (필답형)</h3>
              <p className="text-white/80 text-sm">기계제도 및 설계 작업</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">주요 출제 범위</p>
              <div className="flex flex-wrap gap-1">
                {['도면 해독', '치수 계산', '공차 적용', '기계요소 설계', '가공방법 선정', '절삭조건 계산'].map((topic, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{topic}</span>
                ))}
              </div>
            </div>
            <Link
              href="/category/mechanical/mechanical-craftsman/study/practical"
              className="block w-full text-center py-2.5 rounded-lg text-white font-medium bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 transition"
            >
              실기 학습하기 →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-gray-800 mb-4">💡 실기시험 합격 전략</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-xl">📐</span>
            <div>
              <p className="font-medium text-gray-800">도면 해독 능력</p>
              <p className="text-sm text-gray-600">KS규격에 맞는 도면 해독과 3면도 이해 필수</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-xl">🔢</span>
            <div>
              <p className="font-medium text-gray-800">계산 문제 대비</p>
              <p className="text-sm text-gray-600">절삭속도, 이송속도, 가공시간 계산 공식 암기</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-xl">⚙️</span>
            <div>
              <p className="font-medium text-gray-800">기계요소 설계</p>
              <p className="text-sm text-gray-600">축, 기어, 베어링 등 설계 계산 문제 연습</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExamPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'practical') setActiveTab('practical');
    else if (tab === 'written') setActiveTab('written');
  }, [searchParams]);

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'written'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'practical'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🔧 실기시험
          </button>
        </div>

        {activeTab === 'written' ? <WrittenExamContent /> : <PracticalExamContent />}
      </section>
    </>
  );
}

export default function MechanicalCraftsmanExamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-amber-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-amber-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/mechanical-craftsman" className="text-gray-600 hover:text-amber-600">기계산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-amber-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-4xl">🔧</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">기계산업기사 시험정보</h1>
              <p className="text-amber-100">Industrial Engineer Mechanical Examination</p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-6">Loading...</div>}>
        <ExamPageContent />
      </Suspense>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
