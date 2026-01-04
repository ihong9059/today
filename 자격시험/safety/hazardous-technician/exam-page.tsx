'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function WrittenExamContent() {
  const subjects = [
    {
      id: 'general-chemistry',
      name: '일반화학',
      icon: '⚗️',
      color: 'from-purple-500 to-violet-500',
      questions: 20,
      topics: ['원자구조', '화학결합', '화학반응', '반응속도', '열역학'],
      studyLink: '/category/safety/hazardous-technician/study/general-chemistry',
    },
    {
      id: 'fire-prevention',
      name: '화재예방과 소화방법',
      icon: '🧯',
      color: 'from-red-500 to-orange-500',
      questions: 20,
      topics: ['연소이론', '소화이론', '소화약제', '소화설비', '화재조사'],
      studyLink: '/category/safety/hazardous-technician/study/fire-prevention',
    },
    {
      id: 'hazardous-properties',
      name: '위험물의 성질과 취급',
      icon: '☢️',
      color: 'from-orange-500 to-amber-500',
      questions: 20,
      topics: ['위험물 분류', '제1류 산화성고체', '제2류 가연성고체', '제3류 자연발화성', '제4~6류'],
      studyLink: '/category/safety/hazardous-technician/study/hazardous-properties',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <h3 className="font-bold text-red-800 mb-2">📝 필기시험 안내</h3>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• 시험시간: 1시간 30분 (90분)</li>
          <li>• 문항수: 총 60문항 (과목당 20문항)</li>
          <li>• 합격기준: 전과목 평균 60점 이상, 과목당 40점 이상</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
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
          <li>• 시험시간: 약 2시간</li>
          <li>• 시험형태: 필답형</li>
          <li>• 합격기준: 60점 이상</li>
          <li>• 출제범위: 위험물 취급 실무</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
          <div className="flex items-center gap-3 text-white">
            <span className="text-3xl">📋</span>
            <div>
              <h3 className="font-bold text-lg">실기시험 (필답형)</h3>
              <p className="text-white/80 text-sm">위험물 취급 실무</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">주요 출제 범위</p>
              <div className="flex flex-wrap gap-1">
                {['위험물 취급법', '저장탱크 안전관리', '화재예방 실무', '소화설비 점검', '위험물 운송', '사고사례 분석'].map((topic, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{topic}</span>
                ))}
              </div>
            </div>
            <Link
              href="/category/safety/hazardous-technician/study/practical"
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
            <span className="text-xl">📦</span>
            <div>
              <p className="font-medium text-gray-800">위험물 저장·취급 기준</p>
              <p className="text-sm text-gray-600">각 류별 저장 및 취급 기준 숙지</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-xl">🧯</span>
            <div>
              <p className="font-medium text-gray-800">소화설비 점검</p>
              <p className="text-sm text-gray-600">소화기, 소화전, 스프링클러 점검 방법</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-medium text-gray-800">사고사례 분석</p>
              <p className="text-sm text-gray-600">실제 위험물 사고 원인 및 대응방법</p>
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
                ? 'bg-red-500 text-white shadow-md'
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

export default function HazardousTechnicianExamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-red-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/hazardous-technician" className="text-gray-600 hover:text-red-600">위험물산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-4xl">☢️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">위험물산업기사 시험정보</h1>
              <p className="text-red-100">Industrial Engineer Hazardous Materials Examination</p>
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
