'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ConventionPlanner2ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    { name: '컨벤션산업개론', questions: 25, topics: ['MICE 개념', '컨벤션 유형', '산업 구조', '국내외 현황', '관련 기관'], tips: 'MICE 산업의 기본 개념을 확실히 이해하세요.', passRate: 48 },
    { name: '컨벤션마케팅개론', questions: 25, topics: ['마케팅 기초', '홍보 전략', '참가자 유치', '고객 관리', '디지털 마케팅'], tips: '마케팅 기초 이론을 숙지하세요.', passRate: 45 },
    { name: '컨벤션실무개론', questions: 25, topics: ['기획 절차', '예산 기초', '운영 실무', '등록 관리', '평가 방법'], tips: '기획 프로세스를 단계별로 암기하세요.', passRate: 42 },
    { name: '관광자원해설', questions: 25, topics: ['관광 자원', '관광 개발', '문화 관광', '지역 관광', '관광 정책'], tips: '한국 관광 자원에 대해 학습하세요.', passRate: 50 },
  ];

  const practicalTopics = [
    { name: '기획서 개요', desc: '행사 개요, 목적, 기대효과 작성', weight: '25%' },
    { name: '프로그램 구성', desc: '세션 구성, 일정표 작성', weight: '25%' },
    { name: '예산 계획', desc: '수입·지출 예산 수립', weight: '20%' },
    { name: '운영 계획', desc: '인력, 시설, 동선 계획', weight: '20%' },
    { name: '홍보 계획', desc: '마케팅·홍보 방안', weight: '10%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/convention-planner-2" className="text-teal-600 hover:text-teal-800 font-medium">← 컨벤션기획사2급</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 컨벤션기획사2급 시험 안내</h1>
          <p className="text-gray-500">필기시험과 실기시험 상세 정보</p>
        </div>

        <div className="flex gap-2 mb-8 justify-center">
          <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'written' ? 'bg-teal-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-teal-50'}`}>📝 필기시험</button>
          <button onClick={() => setActiveTab('practical')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'practical' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-cyan-50'}`}>📋 실기시험</button>
        </div>

        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-teal-50 rounded-xl p-4"><p className="text-teal-600 font-bold text-2xl">100문항</p><p className="text-sm text-gray-500">총 문항수</p></div>
                <div className="bg-teal-50 rounded-xl p-4"><p className="text-teal-600 font-bold text-2xl">100분</p><p className="text-sm text-gray-500">시험 시간</p></div>
                <div className="bg-teal-50 rounded-xl p-4"><p className="text-teal-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">합격 기준 (과목별 40점)</p></div>
                <div className="bg-teal-50 rounded-xl p-4"><p className="text-teal-600 font-bold text-2xl">객관식</p><p className="text-sm text-gray-500">4지선다</p></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {writtenSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">{subject.questions}문항</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">주요 토픽</p>
                    <div className="flex flex-wrap gap-2">{subject.topics.map((topic, i) => (<span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{topic}</span>))}</div>
                  </div>
                  <div className="bg-teal-50 rounded-xl p-3"><p className="text-sm text-teal-700">💡 {subject.tips}</p></div>
                  <div className="mt-3 flex items-center justify-between"><span className="text-xs text-gray-400">평균 합격률</span><span className="text-teal-600 font-bold">{subject.passRate}%</span></div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Link href="/category/service/convention-planner-2/study/convention-basics" className="py-3 px-4 bg-teal-100 text-teal-700 rounded-xl text-center font-medium hover:bg-teal-200 transition">컨벤션 기초</Link>
                <Link href="/category/service/convention-planner-2/study/convention-marketing" className="py-3 px-4 bg-teal-100 text-teal-700 rounded-xl text-center font-medium hover:bg-teal-200 transition">컨벤션 마케팅</Link>
                <Link href="/category/service/convention-planner-2/study/convention-operation" className="py-3 px-4 bg-teal-100 text-teal-700 rounded-xl text-center font-medium hover:bg-teal-200 transition">컨벤션 운영</Link>
                <Link href="/category/service/convention-planner-2/study/tourism-resource" className="py-3 px-4 bg-teal-100 text-teal-700 rounded-xl text-center font-medium hover:bg-teal-200 transition">관광자원론</Link>
                <Link href="/category/service/convention-planner-2/study/practical" className="py-3 px-4 bg-teal-100 text-teal-700 rounded-xl text-center font-medium hover:bg-teal-200 transition">실기시험</Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 필기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>MICE 산업 기본 개념을 확실히 이해하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>기획 프로세스 단계를 순서대로 암기하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>마케팅 기초 용어와 개념을 숙지하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>기출문제를 반복 풀이하여 출제 경향 파악</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practical' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-cyan-50 rounded-xl p-4"><p className="text-cyan-600 font-bold text-2xl">기획서 작성</p><p className="text-sm text-gray-500">시험 유형</p></div>
                <div className="bg-cyan-50 rounded-xl p-4"><p className="text-cyan-600 font-bold text-2xl">2시간</p><p className="text-sm text-gray-500">시험 시간</p></div>
                <div className="bg-cyan-50 rounded-xl p-4"><p className="text-cyan-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">합격 기준</p></div>
                <div className="bg-cyan-50 rounded-xl p-4"><p className="text-cyan-600 font-bold text-2xl">서술형</p><p className="text-sm text-gray-500">답변 형식</p></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기 평가 영역</h2>
              <div className="space-y-4">
                {practicalTopics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-cyan-50 rounded-xl">
                    <div className="w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                    <div className="flex-1"><h3 className="font-bold text-gray-800">{topic.name}</h3><p className="text-sm text-gray-500">{topic.desc}</p></div>
                    <div className="text-right"><p className="text-cyan-600 font-bold">{topic.weight}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📄 출제 예시 주제</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-cyan-50 rounded-xl p-4">
                  <h3 className="font-bold text-cyan-700 mb-2">학술·전문 행사</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 학술 세미나 기획</li>
                    <li>• 전문가 포럼 개최</li>
                    <li>• 워크숍 운영</li>
                  </ul>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4">
                  <h3 className="font-bold text-cyan-700 mb-2">기업·단체 행사</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 기업 행사 기획</li>
                    <li>• 단체 컨퍼런스</li>
                    <li>• 전시회 운영</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 기획서 작성 체크리스트</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-cyan-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">행사 개요 (명칭, 일시, 장소)</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-cyan-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">목적 및 기대효과</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-cyan-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">프로그램 일정표</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-cyan-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">예산 계획</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-cyan-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">운영 조직</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-cyan-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">홍보 방안</span></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 실기 학습</h2>
              <Link href="/category/service/convention-planner-2/study/practical" className="block py-4 px-6 bg-cyan-100 text-cyan-700 rounded-xl text-center font-medium hover:bg-cyan-200 transition">기획서 작성 연습하기 →</Link>
            </div>

            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 실기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>기획서 표준 양식을 숙지하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>시간 배분을 계획하고 연습하세요 (2시간)</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>각 항목을 빠짐없이 작성하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>구체적인 수치와 내용을 포함하세요</p></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
