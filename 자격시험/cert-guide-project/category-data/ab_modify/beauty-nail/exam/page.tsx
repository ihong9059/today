'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BeautyNailExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '네일 개론',
      questions: 15,
      topics: ['손발의 구조', '네일의 구조와 기능', '위생 및 소독', '피부 질환', '화장품학'],
      tips: '네일의 해부학적 구조와 위생 관리가 핵심입니다.',
      passRate: 50,
    },
    {
      name: '네일 아트',
      questions: 15,
      topics: ['컬러링 이론', '네일 아트 기법', '디자인 원리', '재료와 도구', '트렌드'],
      tips: '다양한 아트 기법의 특징과 사용 재료를 숙지하세요.',
      passRate: 48,
    },
    {
      name: '매니큐어',
      questions: 15,
      topics: ['매니큐어 절차', '큐티클 관리', '폴리시 도포', '네일 케어', '제품 지식'],
      tips: '시술 순서와 각 단계별 목적을 이해하세요.',
      passRate: 47,
    },
    {
      name: '페디큐어',
      questions: 15,
      topics: ['페디큐어 절차', '발 구조', '각질 관리', '풋케어', '위생 관리'],
      tips: '매니큐어와의 차이점을 명확히 구분하세요.',
      passRate: 46,
    },
  ];

  const practicalTasks = [
    { name: '프리엣지 네일 팁', desc: '네일 팁을 이용한 연장 시술', time: '15분', weight: '20%' },
    { name: '젤 네일 컬러링', desc: '젤 폴리시 컬러링 시술', time: '20분', weight: '25%' },
    { name: '네일 아트', desc: '지정 디자인 아트 시술', time: '20분', weight: '25%' },
    { name: '매니큐어', desc: '풀코스 매니큐어 시술', time: '15분', weight: '15%' },
    { name: '페디큐어', desc: '기본 페디큐어 시술', time: '15분', weight: '15%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/category/service/beauty-nail" className="text-rose-600 hover:text-rose-800 font-medium">
              ← 미용사(네일)
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💅 미용사(네일) 시험 안내</h1>
          <p className="text-gray-500">필기시험과 실기시험 상세 정보</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              activeTab === 'written'
                ? 'bg-rose-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-rose-50'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              activeTab === 'practical'
                ? 'bg-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-pink-50'
            }`}
          >
            💅 실기시험
          </button>
        </div>

        {/* Written Exam Content */}
        {activeTab === 'written' && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-rose-50 rounded-xl p-4">
                  <p className="text-rose-600 font-bold text-2xl">60문항</p>
                  <p className="text-sm text-gray-500">총 문항수</p>
                </div>
                <div className="bg-rose-50 rounded-xl p-4">
                  <p className="text-rose-600 font-bold text-2xl">60분</p>
                  <p className="text-sm text-gray-500">시험 시간</p>
                </div>
                <div className="bg-rose-50 rounded-xl p-4">
                  <p className="text-rose-600 font-bold text-2xl">60점</p>
                  <p className="text-sm text-gray-500">합격 기준</p>
                </div>
                <div className="bg-rose-50 rounded-xl p-4">
                  <p className="text-rose-600 font-bold text-2xl">객관식</p>
                  <p className="text-sm text-gray-500">문제 유형</p>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="grid md:grid-cols-2 gap-4">
              {writtenSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                      {subject.questions}문항
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">주요 토픽</p>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-3">
                    <p className="text-sm text-rose-700">💡 {subject.tips}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-400">평균 합격률</span>
                    <span className="text-rose-600 font-bold">{subject.passRate}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Study Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/category/service/beauty-nail/study/nail-theory" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">
                  네일 개론
                </Link>
                <Link href="/category/service/beauty-nail/study/nail-art" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">
                  네일 아트
                </Link>
                <Link href="/category/service/beauty-nail/study/manicure" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">
                  매니큐어
                </Link>
                <Link href="/category/service/beauty-nail/study/pedicure" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">
                  페디큐어
                </Link>
              </div>
            </div>

            {/* Pass Strategy */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 필기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <p>네일의 구조와 기능, 위생 관리를 완벽히 숙지하세요</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <p>시술 순서와 각 단계별 목적을 이해하고 암기하세요</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <p>네일 아트 재료와 도구의 특성을 파악하세요</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <p>기출문제를 반복적으로 풀어 출제 경향을 파악하세요</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practical Exam Content */}
        {activeTab === 'practical' && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-pink-50 rounded-xl p-4">
                  <p className="text-pink-600 font-bold text-2xl">5과제</p>
                  <p className="text-sm text-gray-500">총 과제수</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <p className="text-pink-600 font-bold text-2xl">85분</p>
                  <p className="text-sm text-gray-500">총 시험시간</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <p className="text-pink-600 font-bold text-2xl">60점</p>
                  <p className="text-sm text-gray-500">합격 기준</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <p className="text-pink-600 font-bold text-2xl">작업형</p>
                  <p className="text-sm text-gray-500">시험 유형</p>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기 과제 상세</h2>
              <div className="space-y-4">
                {practicalTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl">
                    <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{task.name}</h3>
                      <p className="text-sm text-gray-500">{task.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-pink-600 font-bold">{task.time}</p>
                      <p className="text-xs text-gray-400">배점 {task.weight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📦 준비물 목록</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-pink-50 rounded-xl p-4">
                  <h3 className="font-bold text-pink-700 mb-2">기본 도구</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 네일 팁, 글루</li>
                    <li>• 큐티클 푸셔/니퍼</li>
                    <li>• 네일 파일, 버퍼</li>
                    <li>• 브러시 세트</li>
                  </ul>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <h3 className="font-bold text-pink-700 mb-2">젤/폴리시</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 베이스 젤/탑 젤</li>
                    <li>• 컬러 젤</li>
                    <li>• 네일 폴리시</li>
                    <li>• 아트용 젤</li>
                  </ul>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <h3 className="font-bold text-pink-700 mb-2">위생용품</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 소독용 알코올</li>
                    <li>• 일회용 장갑</li>
                    <li>• 화장솜, 거즈</li>
                    <li>• 쓰레기 봉투</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Study Link */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 실기 학습</h2>
              <Link href="/category/service/beauty-nail/study/practical" className="block py-4 px-6 bg-pink-100 text-pink-700 rounded-xl text-center font-medium hover:bg-pink-200 transition">
                실기 문제 풀기 →
              </Link>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 실기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <p>시간 배분을 철저히 연습하세요 (각 과제별 시간 엄수)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <p>위생 관리에 주의하세요 (감점 요인)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <p>재료와 도구를 미리 정리하여 효율적으로 작업하세요</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <p>실제 모델을 대상으로 충분히 연습하세요</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
