'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InsuranceBrokerExamPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects'>('overview');

  const subjects = [
    {
      name: '보험이론',
      topics: ['보험의 개념과 역사', '보험의 원리와 기능', '보험계약의 구성요소', '보험상품의 종류', '국제보험시장'],
      time: 30,
      questions: 25,
      strategy: '기본 개념을 확실히 이해하고 보험 원리의 실무 적용 사례를 학습하세요.'
    },
    {
      name: '보험관계법규',
      topics: ['보험업법', '보험계약법', '보험모집규제', '보험중개사 관련 규정', '금융소비자보호법'],
      time: 30,
      questions: 25,
      strategy: '조문 암기가 필수입니다. 특히 보험중개사 관련 조항을 집중 학습하세요.'
    },
    {
      name: '보험업무',
      topics: ['생명보험 상품', '손해보험 상품', '언더라이팅', '보험요율', '재보험'],
      time: 30,
      questions: 25,
      strategy: '다양한 보험상품의 특성과 언더라이팅 기준을 숙지하세요.'
    },
    {
      name: '위험관리론',
      topics: ['위험의 개념과 분류', '위험관리 프로세스', '위험평가 기법', '위험처리 방법', '기업위험관리(ERM)'],
      time: 30,
      questions: 25,
      strategy: '위험관리 프로세스와 각 단계별 기법을 체계적으로 이해하세요.'
    },
    {
      name: '중개실무',
      topics: ['보험중개의 개념', '중개계약', '보험분석 방법', '제안서 작성', '클레임 지원'],
      time: 30,
      questions: 25,
      strategy: '실무 사례 중심으로 학습하고, 중개 프로세스를 이해하세요.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/insurance/insurance-broker" className="inline-flex items-center text-teal-100 hover:text-white mb-4 transition">
            ← 보험중개사
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">보험중개사 시험 정보</h1>
          <p className="text-teal-100">필기시험 상세 안내</p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg inline-flex p-1">
          <button onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'overview' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            시험 개요
          </button>
          <button onClick={() => setActiveTab('subjects')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'subjects' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            과목별 상세
          </button>
        </div>
      </div>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' ? (
          <div className="space-y-6">
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-teal-800 mb-2">필기시험 개요</h2>
              <p className="text-teal-700">객관식 4지선다형 | 총 125문항 150분 | 과목당 40점 이상, 평균 60점 이상</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4">📋 시험 구성</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex justify-between border-b pb-2"><span>시험 과목</span><span className="font-medium">5과목</span></li>
                  <li className="flex justify-between border-b pb-2"><span>총 문항수</span><span className="font-medium">125문항</span></li>
                  <li className="flex justify-between border-b pb-2"><span>시험 시간</span><span className="font-medium">150분</span></li>
                  <li className="flex justify-between"><span>출제 형식</span><span className="font-medium">객관식 4지선다</span></li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4">✅ 합격 기준</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex justify-between border-b pb-2"><span>과목별 기준</span><span className="font-medium">40점 이상</span></li>
                  <li className="flex justify-between border-b pb-2"><span>전과목 평균</span><span className="font-medium">60점 이상</span></li>
                  <li className="flex justify-between border-b pb-2"><span>합격자 결정</span><span className="font-medium">절대평가</span></li>
                  <li className="flex justify-between"><span>합격 유효기간</span><span className="font-medium">2년</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">📅 시험 일정 (2026년 기준)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-lg">구분</th>
                      <th className="px-4 py-3">원서접수</th>
                      <th className="px-4 py-3">시험일</th>
                      <th className="px-4 py-3 rounded-tr-lg">합격발표</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">정기시험</td>
                      <td className="px-4 py-3">8월 중</td>
                      <td className="px-4 py-3">10월 중</td>
                      <td className="px-4 py-3">11월 중</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {subjects.map((subject, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{subject.name}</h3>
                  <div className="flex gap-4 text-sm">
                    <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full">{subject.questions}문항</span>
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
                <div className="bg-teal-50 rounded-lg p-4">
                  <h4 className="font-semibold text-teal-800 mb-1">💡 합격 전략</h4>
                  <p className="text-teal-700 text-sm">{subject.strategy}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 합격 후 절차 */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">합격 후 절차</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-teal-50 rounded-lg p-4">
              <h3 className="font-bold text-teal-800 mb-2">1. 실무수습</h3>
              <ul className="text-teal-700 space-y-1 text-sm">
                <li>• 보험중개법인에서 6개월 수습</li>
                <li>• 또는 보험회사에서 1년 수습</li>
              </ul>
            </div>
            <div className="bg-cyan-50 rounded-lg p-4">
              <h3 className="font-bold text-cyan-800 mb-2">2. 등록</h3>
              <ul className="text-cyan-700 space-y-1 text-sm">
                <li>• 금융감독원에 등록 신청</li>
                <li>• 배상책임보험 가입</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-blue-800 mb-2">3. 업무 개시</h3>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• 개인 또는 법인 형태로 영업</li>
                <li>• 보수교육 이수 의무</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
