'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ActuaryExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');

  const firstExamInfo = {
    subjects: [
      {
        name: '보험수학',
        topics: ['확률론 기초', '생명표와 사망률', '순보험료 계산', '책임준비금', '연금수리', '손해보험수학'],
        weight: '33%',
        tips: '수학적 기초가 중요합니다. 확률론과 미적분학을 선행 학습하세요.'
      },
      {
        name: '보험계약법',
        topics: ['보험계약 총론', '고지의무', '보험금 청구권', '손해보험계약', '생명보험계약', '보험업법'],
        weight: '33%',
        tips: '상법 보험편과 보험업법의 조문을 정확히 숙지해야 합니다.'
      },
      {
        name: '경제학',
        topics: ['미시경제학 기초', '시장균형이론', '거시경제학', '금융시장론', '리스크관리', '금융경제학'],
        weight: '34%',
        tips: '미시·거시경제학 기본이론을 먼저 정립한 후 금융경제를 학습하세요.'
      }
    ],
    examFormat: {
      type: '객관식(4지선다)',
      questions: 75,
      time: 150,
      passing: '과목당 40점 이상, 전과목 평균 60점 이상'
    }
  };

  const secondExamInfo = {
    subjects: [
      {
        name: '회계학',
        topics: ['재무회계 기초', '자산회계', '부채·자본회계', '보험회계', '원가관리회계', 'IFRS17'],
        weight: '50%',
        tips: '보험회계 특유의 처리방법과 IFRS17 기준을 집중 학습하세요.'
      },
      {
        name: '보험업법및실무',
        topics: ['보험업법', '보험감독규정', '계리업무 실무', '상품개발 절차', '준비금 적립', '건전성 규제'],
        weight: '50%',
        tips: '실제 계리업무 사례를 바탕으로 이론과 실무를 연결하여 학습하세요.'
      }
    ],
    examFormat: {
      type: '논술형',
      questions: 10,
      time: 180,
      passing: '과목당 40점 이상, 전과목 평균 60점 이상'
    }
  };

  const currentExam = activeTab === 'first' ? firstExamInfo : secondExamInfo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance/actuary" className="text-gray-500 hover:text-gray-700">보험계리사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">보험계리사 시험정보</h1>
          <p className="text-gray-500">Actuary Examination Information</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-sm border inline-flex">
            <button
              onClick={() => setActiveTab('first')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'first' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              1차 시험
            </button>
            <button
              onClick={() => setActiveTab('second')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'second' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              2차 시험
            </button>
          </div>
        </div>

        {/* Exam Format Card */}
        <div className={`bg-gradient-to-r ${activeTab === 'first' ? 'from-indigo-600 to-indigo-500' : 'from-purple-600 to-purple-500'} rounded-2xl p-6 text-white mb-8`}>
          <h2 className="text-xl font-bold mb-4">{activeTab === 'first' ? '1차' : '2차'} 시험 개요</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-sm opacity-80">시험 유형</div>
              <div className="font-bold">{currentExam.examFormat.type}</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-sm opacity-80">문항 수</div>
              <div className="font-bold">{currentExam.examFormat.questions}문항</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-sm opacity-80">시험 시간</div>
              <div className="font-bold">{currentExam.examFormat.time}분</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-sm opacity-80">합격 기준</div>
              <div className="font-bold text-sm">{currentExam.examFormat.passing}</div>
            </div>
          </div>
        </div>

        {/* Subject Details */}
        <div className="space-y-6">
          {currentExam.subjects.map((subject, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{subject.name}</h3>
                  <span className={`text-sm ${activeTab === 'first' ? 'text-indigo-600' : 'text-purple-600'}`}>
                    배점 비중: {subject.weight}
                  </span>
                </div>
                <Link
                  href={`/category/insurance/actuary/study/${
                    subject.name === '보험수학' ? 'insurance-math' :
                    subject.name === '보험계약법' ? 'insurance-law' :
                    subject.name === '경제학' ? 'economics' :
                    subject.name === '회계학' ? 'accounting' : 'insurance-business'
                  }`}
                  className={`px-4 py-2 rounded-lg text-white text-sm ${
                    activeTab === 'first' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  학습하기 →
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`${activeTab === 'first' ? 'bg-indigo-50' : 'bg-purple-50'} rounded-xl p-4`}>
                  <h4 className={`font-medium ${activeTab === 'first' ? 'text-indigo-700' : 'text-purple-700'} mb-2`}>주요 출제범위</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.map((topic, tidx) => (
                      <span key={tidx} className="bg-white px-2 py-1 rounded text-sm text-gray-600">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-700 mb-2">학습 TIP</h4>
                  <p className="text-sm text-gray-600">{subject.tips}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 시험 일정 */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="text-xl font-bold mb-4">시험 일정 안내</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 rounded-xl p-4">
              <h3 className="font-bold text-indigo-700 mb-3">1차 시험</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-gray-500">원서접수</span><span>매년 2~3월</span></li>
                <li className="flex justify-between"><span className="text-gray-500">시험일</span><span>매년 4월</span></li>
                <li className="flex justify-between"><span className="text-gray-500">합격발표</span><span>시험 후 약 1개월</span></li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="font-bold text-purple-700 mb-3">2차 시험</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-gray-500">원서접수</span><span>매년 5~6월</span></li>
                <li className="flex justify-between"><span className="text-gray-500">시험일</span><span>매년 7월</span></li>
                <li className="flex justify-between"><span className="text-gray-500">합격발표</span><span>시험 후 약 2개월</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 합격 전략 */}
        <div className="mt-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 border border-indigo-200">
          <h2 className="text-xl font-bold mb-4">합격 전략</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-indigo-700 mb-2">1차 시험 전략</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 확률론과 미적분학 기초 완벽 정립</li>
                <li>• 보험수학은 생명보험/손해보험 구분하여 학습</li>
                <li>• 경제학은 그래프 해석 능력 배양</li>
                <li>• 보험계약법 조문 암기 필수</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-purple-700 mb-2">2차 시험 전략</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 논술형 답안 작성 연습 반복</li>
                <li>• IFRS17 기준 보험회계 중점 학습</li>
                <li>• 실무 사례 기반 문제풀이</li>
                <li>• 기출문제 분석을 통한 출제경향 파악</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/category/insurance/actuary"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← 보험계리사 메인으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
