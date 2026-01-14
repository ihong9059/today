'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CareerCounselor1ExamPage() {
  const [activeTab, setActiveTab] = useState('written');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold">💼 직업상담사 1급 시험정보</h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('written')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'written' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>필기시험</button>
          <button onClick={() => setActiveTab('practical')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'practical' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>실기시험</button>
        </div>

        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">시험형태</p><p className="font-medium">객관식 4지선다</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">문항수</p><p className="font-medium">과목당 20문항 (총 100문항)</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">시험시간</p><p className="font-medium">2시간 30분</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">합격기준</p><p className="font-medium">과목당 40점, 평균 60점</p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 시험과목</h2>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg flex justify-between"><span>고급직업상담학</span><span className="text-gray-500">20문항</span></div>
                <div className="p-3 bg-blue-50 rounded-lg flex justify-between"><span>고급직업심리학</span><span className="text-gray-500">20문항</span></div>
                <div className="p-3 bg-blue-50 rounded-lg flex justify-between"><span>고급직업정보론</span><span className="text-gray-500">20문항</span></div>
                <div className="p-3 bg-blue-50 rounded-lg flex justify-between"><span>노동시장론</span><span className="text-gray-500">20문항</span></div>
                <div className="p-3 bg-blue-50 rounded-lg flex justify-between"><span>노동관계법규</span><span className="text-gray-500">20문항</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practical' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실기시험</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">시험형태</p><p className="font-medium">필답형</p></div>
              <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">시험시간</p><p className="font-medium">3시간</p></div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">실기 내용</h3>
              <p className="text-sm text-gray-600">직업상담 실무(사례분석, 상담기법 적용, 검사해석)</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
