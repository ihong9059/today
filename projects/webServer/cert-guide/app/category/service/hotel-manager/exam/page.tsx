'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HotelManagerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    { name: '호텔경영론', questions: 20, topics: ['호텔 조직', '객실관리', '식음료 운영', '연회관리', '하우스키핑'], tips: '호텔 운영 전반의 흐름을 이해하세요.', passRate: 42 },
    { name: '호텔회계', questions: 20, topics: ['재무제표', '원가관리', '예산관리', '손익분석', '세무회계'], tips: '회계 기초 개념과 호텔 특수 회계를 구분하세요.', passRate: 35 },
    { name: '호텔마케팅', questions: 20, topics: ['마케팅 믹스', '고객관리', '디지털 마케팅', '브랜딩', '가격전략'], tips: '최신 마케팅 트렌드를 파악하세요.', passRate: 45 },
    { name: '관광법규', questions: 20, topics: ['관광기본법', '관광진흥법', '소비자보호', '노동법', '위생법규'], tips: '주요 법규 조항과 사례를 숙지하세요.', passRate: 38 },
    { name: '관광학개론', questions: 20, topics: ['관광 개념', '관광산업', '서비스론', '관광트렌드', '지속가능관광'], tips: '관광 이론의 기본 개념을 정리하세요.', passRate: 48 },
  ];

  const practicalTopics = [
    { name: '호텔 운영 전략', desc: '객실 점유율 분석, 레비뉴 매니지먼트 전략 수립', weight: '25%' },
    { name: '마케팅 기획', desc: '프로모션 기획, 고객 세분화, 채널 전략', weight: '25%' },
    { name: '재무 분석', desc: '손익계산, 원가 분석, 예산 편성', weight: '25%' },
    { name: '인사·조직 관리', desc: '인력 배치, 교육 훈련, 서비스 품질 관리', weight: '25%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/hotel-manager" className="text-amber-600 hover:text-amber-800 font-medium">← 호텔경영사</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏨 호텔경영사 시험 안내</h1>
          <p className="text-gray-500">필기시험과 실기시험 상세 정보</p>
        </div>

        <div className="flex gap-2 mb-8 justify-center">
          <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'written' ? 'bg-amber-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-amber-50'}`}>📝 필기시험</button>
          <button onClick={() => setActiveTab('practical')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'practical' ? 'bg-orange-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-orange-50'}`}>📋 실기시험</button>
        </div>

        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-amber-50 rounded-xl p-4"><p className="text-amber-600 font-bold text-2xl">100문항</p><p className="text-sm text-gray-500">총 문항수</p></div>
                <div className="bg-amber-50 rounded-xl p-4"><p className="text-amber-600 font-bold text-2xl">150분</p><p className="text-sm text-gray-500">시험 시간</p></div>
                <div className="bg-amber-50 rounded-xl p-4"><p className="text-amber-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">평균 합격</p></div>
                <div className="bg-amber-50 rounded-xl p-4"><p className="text-amber-600 font-bold text-2xl">객관식</p><p className="text-sm text-gray-500">4지선다</p></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {writtenSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">{subject.questions}문항</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">주요 토픽</p>
                    <div className="flex flex-wrap gap-2">{subject.topics.map((topic, i) => (<span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{topic}</span>))}</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3"><p className="text-sm text-amber-700">💡 {subject.tips}</p></div>
                  <div className="mt-3 flex items-center justify-between"><span className="text-xs text-gray-400">평균 합격률</span><span className="text-amber-600 font-bold">{subject.passRate}%</span></div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/category/service/hotel-manager/study/hotel-management" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔경영론</Link>
                <Link href="/category/service/hotel-manager/study/hotel-accounting" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔회계</Link>
                <Link href="/category/service/hotel-manager/study/hotel-marketing" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔마케팅</Link>
                <Link href="/category/service/hotel-manager/study/hotel-law" className="py-3 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">관광법규</Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 필기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>호텔경영론은 객실·식음료 운영의 핵심 개념을 암기하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>회계 과목은 계산 문제 유형을 반복 연습하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>마케팅은 사례 중심으로 4P, STP 전략을 이해하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>법규는 출제빈도 높은 조항 위주로 정리하세요</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practical' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-orange-50 rounded-xl p-4"><p className="text-orange-600 font-bold text-2xl">필답형</p><p className="text-sm text-gray-500">시험 유형</p></div>
                <div className="bg-orange-50 rounded-xl p-4"><p className="text-orange-600 font-bold text-2xl">180분</p><p className="text-sm text-gray-500">시험 시간</p></div>
                <div className="bg-orange-50 rounded-xl p-4"><p className="text-orange-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">합격 기준</p></div>
                <div className="bg-orange-50 rounded-xl p-4"><p className="text-orange-600 font-bold text-2xl">서술형</p><p className="text-sm text-gray-500">답변 형식</p></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기 평가 영역</h2>
              <div className="space-y-4">
                {practicalTopics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                    <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                    <div className="flex-1"><h3 className="font-bold text-gray-800">{topic.name}</h3><p className="text-sm text-gray-500">{topic.desc}</p></div>
                    <div className="text-right"><p className="text-orange-600 font-bold">{topic.weight}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 자주 출제되는 실기 문제</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-xl p-4">
                  <h3 className="font-bold text-orange-700 mb-2">운영 전략</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 객실 점유율 향상 방안</li><li>• 레비뉴 매니지먼트 전략</li><li>• 성수기/비수기 대응 전략</li><li>• 고객 불만 처리 절차</li></ul>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <h3 className="font-bold text-orange-700 mb-2">마케팅 기획</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 패키지 상품 기획</li><li>• 온라인 마케팅 전략</li><li>• 충성고객 프로그램</li><li>• 경쟁 호텔 분석</li></ul>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <h3 className="font-bold text-orange-700 mb-2">재무 분석</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• RevPAR 계산</li><li>• 손익분기점 분석</li><li>• 부서별 예산 편성</li><li>• 원가 절감 방안</li></ul>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <h3 className="font-bold text-orange-700 mb-2">인사 관리</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 인력 배치 계획</li><li>• 직원 교육 프로그램</li><li>• 서비스 품질 평가</li><li>• 동기부여 방안</li></ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 실기 학습</h2>
              <Link href="/category/service/hotel-manager/study/practical" className="block py-4 px-6 bg-orange-100 text-orange-700 rounded-xl text-center font-medium hover:bg-orange-200 transition">실기 문제 풀기 →</Link>
            </div>

            <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 실기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>실제 호텔 운영 사례를 많이 접하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>답안은 논리적 구조로 체계적으로 작성하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>시간 배분을 철저히 하고 모든 문제에 답하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>호텔 경영 지표(KPI)와 전문 용어를 활용하세요</p></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
