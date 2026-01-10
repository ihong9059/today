'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AirEnvironmentExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><Link href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></Link><nav className="flex items-center gap-2 text-sm"><Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link><span className="text-gray-300">›</span><Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link><span className="text-gray-300">›</span><Link href="/category/chemistry/air-environment" className="text-gray-600 hover:text-sky-600">대기환경기사</Link><span className="text-gray-300">›</span><span className="text-sky-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span></nav></div></header>

      <section className="bg-gradient-to-r from-sky-500 to-blue-600 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-3"><span className="text-4xl">💨</span><div><h1 className="text-2xl font-bold">대기환경기사 시험정보</h1><p className="text-sky-100">Engineer Air Environment</p></div></div></div></section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('written')} className={`px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'written' ? 'bg-sky-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>📝 필기시험</button>
          <button onClick={() => setActiveTab('practical')} className={`px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'practical' ? 'bg-sky-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>🔧 실기시험</button>
        </div>

        {activeTab === 'written' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필기시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">시험 형태</p><p className="font-medium text-gray-800">객관식 4지선다형</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">문항 수</p><p className="font-medium text-gray-800">과목당 20문항 (총 80문항)</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">시험 시간</p><p className="font-medium text-gray-800">2시간</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">합격 기준</p><p className="font-medium text-gray-800">과목당 40점 이상, 평균 60점 이상</p></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 시험 과목</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg"><div className="flex items-center gap-3"><span className="text-2xl">🌍</span><div><p className="font-medium text-gray-800">대기오염개론</p><p className="text-sm text-gray-500">대기오염 원인, 영향, 기상학</p></div></div><span className="text-sm text-gray-500">20문항</span></div>
                <div className="flex items-center justify-between p-4 border rounded-lg"><div className="flex items-center gap-3"><span className="text-2xl">🔥</span><div><p className="font-medium text-gray-800">연소공학</p><p className="text-sm text-gray-500">연소 이론, 연료, 배기가스</p></div></div><span className="text-sm text-gray-500">20문항</span></div>
                <div className="flex items-center justify-between p-4 border rounded-lg"><div className="flex items-center gap-3"><span className="text-2xl">🏭</span><div><p className="font-medium text-gray-800">대기오염방지기술</p><p className="text-sm text-gray-500">집진, 유해가스 처리</p></div></div><span className="text-sm text-gray-500">20문항</span></div>
                <div className="flex items-center justify-between p-4 border rounded-lg"><div className="flex items-center gap-3"><span className="text-2xl">🔬</span><div><p className="font-medium text-gray-800">대기오염공정시험기준</p><p className="text-sm text-gray-500">측정방법, 시료채취, 분석</p></div></div><span className="text-sm text-gray-500">20문항</span></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실기시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">시험 형태</p><p className="font-medium text-gray-800">필답형 + 작업형</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">시험 시간</p><p className="font-medium text-gray-800">필답형 2시간 30분 / 작업형 4시간</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">합격 기준</p><p className="font-medium text-gray-800">60점 이상</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">시험 과목</p><p className="font-medium text-gray-800">대기오염방지 실무</p></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기시험 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span><p className="text-gray-600">집진효율, 통풍력, 연소계산 공식을 완벽히 숙지하세요.</p></div>
                <div className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span><p className="text-gray-600">대기오염공정시험기준의 측정방법을 학습하세요.</p></div>
                <div className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span><p className="text-gray-600">배출가스 농도 환산(표준상태, 산소보정)을 연습하세요.</p></div>
                <div className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span><p className="text-gray-600">대기환경보전법의 주요 조항을 정리하세요.</p></div>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
