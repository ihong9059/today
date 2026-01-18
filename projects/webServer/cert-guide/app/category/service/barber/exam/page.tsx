'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BarberExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    { name: '이용이론', questions: 15, topics: ['이용의 역사', '두발 형태학', '이용 도구', '고객 상담', '서비스 매너'], tips: '이용의 기초 이론과 역사를 숙지하세요.', passRate: 52 },
    { name: '피부학', questions: 15, topics: ['피부 구조', '모발 구조', '두피 유형', '피부 질환', '모발 성장 주기'], tips: '피부와 모발의 구조를 완벽히 이해하세요.', passRate: 48 },
    { name: '공중위생학', questions: 15, topics: ['공중위생 개론', '감염병 관리', '환경 위생', '식품 위생', '위생 법규'], tips: '위생 관련 법규와 개념을 정리하세요.', passRate: 50 },
    { name: '소독학', questions: 15, topics: ['소독 개론', '소독 방법', '소독제 종류', '멸균법', '감염 예방'], tips: '소독 방법과 소독제 특성을 암기하세요.', passRate: 49 },
  ];

  const practicalTasks = [
    { name: '기본 커트', desc: '클리퍼와 가위를 이용한 기본 커트', time: '25분', weight: '30%' },
    { name: '스포츠 커트', desc: '짧은 스타일의 스포츠 커트', time: '20분', weight: '25%' },
    { name: '면도', desc: '안전면도기를 이용한 면도', time: '15분', weight: '25%' },
    { name: '아이롱', desc: '아이롱을 이용한 스타일링', time: '15분', weight: '20%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/barber" className="text-slate-600 hover:text-slate-800 font-medium">← 이용사</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💈 이용사 시험 안내</h1>
          <p className="text-gray-500">필기시험과 실기시험 상세 정보</p>
        </div>

        <div className="flex gap-2 mb-8 justify-center">
          <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'written' ? 'bg-slate-700 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-slate-50'}`}>📝 필기시험</button>
          <button onClick={() => setActiveTab('practical')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'practical' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-blue-50'}`}>✂️ 실기시험</button>
        </div>

        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-50 rounded-xl p-4"><p className="text-slate-700 font-bold text-2xl">60문항</p><p className="text-sm text-gray-500">총 문항수</p></div>
                <div className="bg-slate-50 rounded-xl p-4"><p className="text-slate-700 font-bold text-2xl">60분</p><p className="text-sm text-gray-500">시험 시간</p></div>
                <div className="bg-slate-50 rounded-xl p-4"><p className="text-slate-700 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">합격 기준</p></div>
                <div className="bg-slate-50 rounded-xl p-4"><p className="text-slate-700 font-bold text-2xl">객관식</p><p className="text-sm text-gray-500">문제 유형</p></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {writtenSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">{subject.questions}문항</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">주요 토픽</p>
                    <div className="flex flex-wrap gap-2">{subject.topics.map((topic, i) => (<span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{topic}</span>))}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3"><p className="text-sm text-slate-700">💡 {subject.tips}</p></div>
                  <div className="mt-3 flex items-center justify-between"><span className="text-xs text-gray-400">평균 합격률</span><span className="text-slate-700 font-bold">{subject.passRate}%</span></div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/category/service/barber/study/barber-theory" className="py-3 px-4 bg-slate-100 text-slate-700 rounded-xl text-center font-medium hover:bg-slate-200 transition">이용이론</Link>
                <Link href="/category/service/barber/study/hair-cutting" className="py-3 px-4 bg-slate-100 text-slate-700 rounded-xl text-center font-medium hover:bg-slate-200 transition">커트기법</Link>
                <Link href="/category/service/barber/study/hair-design" className="py-3 px-4 bg-slate-100 text-slate-700 rounded-xl text-center font-medium hover:bg-slate-200 transition">헤어디자인</Link>
                <Link href="/category/service/barber/study/shave-care" className="py-3 px-4 bg-slate-100 text-slate-700 rounded-xl text-center font-medium hover:bg-slate-200 transition">면도·관리</Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-700 to-blue-700 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 필기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>이용의 역사와 기초 이론을 먼저 학습하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>피부와 모발의 구조를 완벽히 이해하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>위생 법규와 소독 방법을 암기하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>기출문제를 반복 풀이하여 출제 경향을 파악하세요</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practical' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-blue-50 rounded-xl p-4"><p className="text-blue-600 font-bold text-2xl">4과제</p><p className="text-sm text-gray-500">총 과제수</p></div>
                <div className="bg-blue-50 rounded-xl p-4"><p className="text-blue-600 font-bold text-2xl">75분</p><p className="text-sm text-gray-500">총 시험시간</p></div>
                <div className="bg-blue-50 rounded-xl p-4"><p className="text-blue-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">합격 기준</p></div>
                <div className="bg-blue-50 rounded-xl p-4"><p className="text-blue-600 font-bold text-2xl">작업형</p><p className="text-sm text-gray-500">시험 유형</p></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기 과제 상세</h2>
              <div className="space-y-4">
                {practicalTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                    <div className="flex-1"><h3 className="font-bold text-gray-800">{task.name}</h3><p className="text-sm text-gray-500">{task.desc}</p></div>
                    <div className="text-right"><p className="text-blue-600 font-bold">{task.time}</p><p className="text-xs text-gray-400">배점 {task.weight}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📦 준비물 목록</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-blue-700 mb-2">커트 도구</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 클리퍼 (바리깡)</li><li>• 커트 가위</li><li>• 숱가위</li><li>• 빗 세트</li></ul>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-blue-700 mb-2">면도 도구</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 안전면도기</li><li>• 면도 크림/폼</li><li>• 스팀타월</li><li>• 애프터쉐이브</li></ul>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-blue-700 mb-2">기타</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 아이롱</li><li>• 드라이어</li><li>• 케이프, 넥스트립</li><li>• 소독 용품</li></ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 실기 학습</h2>
              <Link href="/category/service/barber/study/practical" className="block py-4 px-6 bg-blue-100 text-blue-700 rounded-xl text-center font-medium hover:bg-blue-200 transition">실기 문제 풀기 →</Link>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-slate-700 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 실기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>시간 배분을 철저히 연습하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>클리퍼와 가위 사용법을 완벽히 익히세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>면도 시 피부 보호와 안전에 주의하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>마네킹이나 실제 모델로 충분히 연습하세요</p></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
