'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BeautyMakeupExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    { name: '메이크업 개론', questions: 15, topics: ['메이크업 역사', '피부학', '위생 및 소독', '화장품학', '뷰티 트렌드'], tips: '메이크업의 기초 이론과 역사를 숙지하세요.', passRate: 54 },
    { name: '색채 디자인', questions: 15, topics: ['색채 이론', '배색 원리', '퍼스널 컬러', '이미지 메이킹', '조명과 색채'], tips: '색의 3속성과 배색 원리를 완벽히 이해하세요.', passRate: 50 },
    { name: '베이스 메이크업', questions: 15, topics: ['스킨케어', '파운데이션', '컨투어링', '하이라이팅', '피부 보정'], tips: '피부 타입별 베이스 메이크업 기법을 익히세요.', passRate: 52 },
    { name: '포인트 메이크업', questions: 15, topics: ['아이 메이크업', '립 메이크업', '치크 메이크업', '눈썹 정리', '속눈썹'], tips: '얼굴형별 포인트 메이크업 포인트를 파악하세요.', passRate: 51 },
  ];

  const practicalTasks = [
    { name: '내추럴 메이크업', desc: '자연스러운 일상 메이크업', time: '20분', weight: '25%' },
    { name: '웨딩 메이크업', desc: '신부 메이크업 연출', time: '25분', weight: '30%' },
    { name: '무대 메이크업', desc: '공연/방송용 메이크업', time: '20분', weight: '25%' },
    { name: '캐릭터 메이크업', desc: '특정 캐릭터 분장', time: '20분', weight: '20%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-fuchsia-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/beauty-makeup" className="text-fuchsia-600 hover:text-fuchsia-800 font-medium">← 미용사(메이크업)</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💄 미용사(메이크업) 시험 안내</h1>
          <p className="text-gray-500">필기시험과 실기시험 상세 정보</p>
        </div>

        <div className="flex gap-2 mb-8 justify-center">
          <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'written' ? 'bg-fuchsia-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-fuchsia-50'}`}>📝 필기시험</button>
          <button onClick={() => setActiveTab('practical')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'practical' ? 'bg-pink-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-pink-50'}`}>🎭 실기시험</button>
        </div>

        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-fuchsia-50 rounded-xl p-4"><p className="text-fuchsia-600 font-bold text-2xl">60문항</p><p className="text-sm text-gray-500">총 문항수</p></div>
                <div className="bg-fuchsia-50 rounded-xl p-4"><p className="text-fuchsia-600 font-bold text-2xl">60분</p><p className="text-sm text-gray-500">시험 시간</p></div>
                <div className="bg-fuchsia-50 rounded-xl p-4"><p className="text-fuchsia-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">합격 기준</p></div>
                <div className="bg-fuchsia-50 rounded-xl p-4"><p className="text-fuchsia-600 font-bold text-2xl">객관식</p><p className="text-sm text-gray-500">문제 유형</p></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {writtenSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                    <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-medium">{subject.questions}문항</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">주요 토픽</p>
                    <div className="flex flex-wrap gap-2">{subject.topics.map((topic, i) => (<span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{topic}</span>))}</div>
                  </div>
                  <div className="bg-fuchsia-50 rounded-xl p-3"><p className="text-sm text-fuchsia-700">💡 {subject.tips}</p></div>
                  <div className="mt-3 flex items-center justify-between"><span className="text-xs text-gray-400">평균 합격률</span><span className="text-fuchsia-600 font-bold">{subject.passRate}%</span></div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/category/service/beauty-makeup/study/makeup-theory" className="py-3 px-4 bg-fuchsia-100 text-fuchsia-700 rounded-xl text-center font-medium hover:bg-fuchsia-200 transition">메이크업 개론</Link>
                <Link href="/category/service/beauty-makeup/study/color-design" className="py-3 px-4 bg-fuchsia-100 text-fuchsia-700 rounded-xl text-center font-medium hover:bg-fuchsia-200 transition">색채 디자인</Link>
                <Link href="/category/service/beauty-makeup/study/base-makeup" className="py-3 px-4 bg-fuchsia-100 text-fuchsia-700 rounded-xl text-center font-medium hover:bg-fuchsia-200 transition">베이스 메이크업</Link>
                <Link href="/category/service/beauty-makeup/study/point-makeup" className="py-3 px-4 bg-fuchsia-100 text-fuchsia-700 rounded-xl text-center font-medium hover:bg-fuchsia-200 transition">포인트 메이크업</Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 필기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>메이크업 역사와 기초 이론을 먼저 학습하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>색채학은 색의 3속성과 배색 원리가 핵심입니다</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>피부 타입별, 얼굴형별 메이크업 기법을 숙지하세요</p></div>
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
                <div className="bg-pink-50 rounded-xl p-4"><p className="text-pink-600 font-bold text-2xl">4과제</p><p className="text-sm text-gray-500">총 과제수</p></div>
                <div className="bg-pink-50 rounded-xl p-4"><p className="text-pink-600 font-bold text-2xl">85분</p><p className="text-sm text-gray-500">총 시험시간</p></div>
                <div className="bg-pink-50 rounded-xl p-4"><p className="text-pink-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">합격 기준</p></div>
                <div className="bg-pink-50 rounded-xl p-4"><p className="text-pink-600 font-bold text-2xl">작업형</p><p className="text-sm text-gray-500">시험 유형</p></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기 과제 상세</h2>
              <div className="space-y-4">
                {practicalTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl">
                    <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                    <div className="flex-1"><h3 className="font-bold text-gray-800">{task.name}</h3><p className="text-sm text-gray-500">{task.desc}</p></div>
                    <div className="text-right"><p className="text-pink-600 font-bold">{task.time}</p><p className="text-xs text-gray-400">배점 {task.weight}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📦 준비물 목록</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-pink-50 rounded-xl p-4">
                  <h3 className="font-bold text-pink-700 mb-2">베이스 제품</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 프라이머, 파운데이션</li><li>• 컨실러, 파우더</li><li>• 컨투어, 하이라이터</li><li>• 세팅 스프레이</li></ul>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <h3 className="font-bold text-pink-700 mb-2">색조 제품</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 아이섀도 팔레트</li><li>• 아이라이너, 마스카라</li><li>• 립스틱, 립글로스</li><li>• 블러셔</li></ul>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <h3 className="font-bold text-pink-700 mb-2">도구</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 브러시 세트</li><li>• 스펀지, 퍼프</li><li>• 뷰러, 핀셋</li><li>• 클렌징 제품</li></ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 실기 학습</h2>
              <Link href="/category/service/beauty-makeup/study/practical" className="block py-4 px-6 bg-pink-100 text-pink-700 rounded-xl text-center font-medium hover:bg-pink-200 transition">실기 문제 풀기 →</Link>
            </div>

            <div className="bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 실기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>시간 배분을 철저히 연습하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>다양한 피부 타입과 얼굴형에 맞는 메이크업을 연습하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>위생 관리와 도구 정리에 주의하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>실제 모델을 대상으로 충분히 연습하세요</p></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
