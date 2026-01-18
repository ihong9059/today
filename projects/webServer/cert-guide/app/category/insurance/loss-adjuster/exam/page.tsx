'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LossAdjusterExamPage() {
  const [activeTab, setActiveTab] = useState<'1st' | '2nd'>('1st');

  const exam1st = [
    {
      name: '보험이론',
      topics: ['보험의 개념과 역사', '보험의 원리와 기능', '보험계약의 구성요소', '위험관리와 보험', '보험상품의 종류'],
      time: 60,
      questions: 40,
      strategy: '기본 개념 이해가 핵심입니다. 보험의 원리와 구성요소를 확실히 암기하세요.'
    },
    {
      name: '보험업법',
      topics: ['보험업법 총칙', '보험회사의 설립과 운영', '보험모집 규제', '보험계약 보호', '손해사정 관련 조문'],
      time: 60,
      questions: 40,
      strategy: '조문 암기가 필수입니다. 특히 손해사정사 관련 조항을 집중 학습하세요.'
    },
    {
      name: '손해사정이론',
      topics: ['손해사정의 개념', '손해사정 절차', '손해액 산정 원칙', '보험금 지급기준', '손해사정 윤리'],
      time: 60,
      questions: 40,
      strategy: '손해액 산정 방법과 절차를 정확히 이해해야 합니다.'
    }
  ];

  const exam2nd = [
    {
      name: '재물손해사정',
      topics: ['화재보험 손해사정', '재물보험 손해액 산정', '특종보험 실무', '재조달가액 산정', '감가상각 계산'],
      time: 90,
      questions: 50,
      strategy: '재조달가액, 감가상각 계산문제를 집중 연습하세요.'
    },
    {
      name: '차량손해사정',
      topics: ['자동차보험 약관', '대물배상 손해사정', '자기차량손해 사정', '자동차 수리비 산정', '렌터카 손해'],
      time: 90,
      questions: 50,
      strategy: '자동차보험 약관과 수리비 산정 기준을 숙지하세요.'
    },
    {
      name: '신체손해사정',
      topics: ['상해보험 손해사정', '후유장해 평가', '의료비 적정성 심사', '휴업손해 산정', '위자료 산정기준'],
      time: 90,
      questions: 50,
      strategy: '후유장해등급표와 손해배상 산정 공식을 암기하세요.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/insurance/loss-adjuster" className="inline-flex items-center text-orange-100 hover:text-white mb-4 transition">
            ← 손해사정사
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">손해사정사 시험 정보</h1>
          <p className="text-orange-100">1차 필기시험 + 2차 실기시험 상세 안내</p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg inline-flex p-1">
          <button onClick={() => setActiveTab('1st')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === '1st' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            1차 필기시험
          </button>
          <button onClick={() => setActiveTab('2nd')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === '2nd' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            2차 실기시험
          </button>
        </div>
      </div>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === '1st' ? (
          <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-orange-800 mb-2">1차 필기시험 개요</h2>
              <p className="text-orange-700">객관식 4지선다형 | 과목당 40문항 60분 | 과목당 40점 이상, 평균 60점 이상</p>
            </div>

            {exam1st.map((subject, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{subject.name}</h3>
                  <div className="flex gap-4 text-sm">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">{subject.questions}문항</span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{subject.time}분</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">출제 범위</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.map((topic, i) => (
                      <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{topic}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-1">💡 합격 전략</h4>
                  <p className="text-orange-700 text-sm">{subject.strategy}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-red-800 mb-2">2차 실기시험 개요</h2>
              <p className="text-red-700">서술형 + 계산형 혼합 | 과목당 50문항 90분 | 1차 합격 후 응시 가능</p>
            </div>

            {exam2nd.map((subject, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{subject.name}</h3>
                  <div className="flex gap-4 text-sm">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">{subject.questions}문항</span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{subject.time}분</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">출제 범위</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.map((topic, i) => (
                      <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{topic}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-1">💡 합격 전략</h4>
                  <p className="text-red-700 text-sm">{subject.strategy}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 합격 기준 */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">합격 기준</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-bold text-orange-800 mb-2">1차 필기시험</h3>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• 매 과목 100점 만점 기준 40점 이상</li>
                <li>• 전 과목 평균 60점 이상</li>
                <li>• 합격 후 2년간 1차 면제</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-bold text-red-800 mb-2">2차 실기시험</h3>
              <ul className="text-red-700 space-y-1 text-sm">
                <li>• 매 과목 100점 만점 기준 40점 이상</li>
                <li>• 전 과목 평균 60점 이상</li>
                <li>• 분야별 선택 응시 가능</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
