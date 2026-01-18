'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AppraiserExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');
  const [showAIModal, setShowAIModal] = useState(false);

  const firstExamSubjects = [
    {
      name: '감정평가관계법규',
      description: '감정평가 및 감정평가사에 관한 법률, 부동산 가격공시에 관한 법률 등',
      topics: [
        '감정평가 및 감정평가사에 관한 법률',
        '부동산 가격공시에 관한 법률',
        '국유재산법',
        '공익사업을 위한 토지 등의 취득 및 보상에 관한 법률',
        '도시 및 주거환경정비법',
        '자산재평가법'
      ],
      tips: '법률 조문 암기보다 실제 적용 사례 중심 학습이 효과적',
      difficulty: '중상',
      weight: 20
    },
    {
      name: '경제학원론',
      description: '미시경제학, 거시경제학, 재정학 기초 이론',
      topics: [
        '수요와 공급 이론',
        '탄력성과 응용',
        '시장구조론',
        '생산자이론',
        '소득분배론',
        '국민소득과 경제성장',
        '화폐금융론',
        '국제경제학 기초'
      ],
      tips: '미시경제학 비중이 높으므로 그래프 분석 능력 강화 필요',
      difficulty: '중',
      weight: 20
    },
    {
      name: '부동산학원론',
      description: '부동산의 개념, 특성, 시장분석, 투자론 기초',
      topics: [
        '부동산의 개념과 특성',
        '부동산 시장론',
        '부동산 정책론',
        '부동산 투자론',
        '부동산 금융론',
        '부동산 개발론',
        '부동산 관리론'
      ],
      tips: '감정평가와 연계하여 종합적 이해 필요',
      difficulty: '중',
      weight: 20
    },
    {
      name: '민법 (총칙, 물권)',
      description: '민법 총칙과 물권법 주요 내용',
      topics: [
        '권리의 주체 (자연인, 법인)',
        '권리의 객체 (물건)',
        '법률행위 일반',
        '의사표시',
        '대리',
        '무효와 취소',
        '조건과 기한',
        '소멸시효',
        '물권 총론',
        '점유권과 소유권',
        '용익물권',
        '담보물권'
      ],
      tips: '물권법과 감정평가의 연관성 이해가 중요',
      difficulty: '상',
      weight: 20
    },
    {
      name: '회계학',
      description: '재무회계, 원가회계 기초 이론',
      topics: [
        '회계의 기초개념',
        '재무제표',
        '자산의 분류와 평가',
        '부채와 자본',
        '손익계산',
        '현금흐름표',
        '원가회계 기초',
        '관리회계 기초'
      ],
      tips: '감정평가 시 기업가치 평가와 연계하여 학습',
      difficulty: '중상',
      weight: 20
    }
  ];

  const secondExamSubjects = [
    {
      name: '감정평가실무',
      description: '감정평가 3방식과 실무 적용, 물건별 평가방법',
      topics: [
        '감정평가 기준',
        '시장가치 기준 평가',
        '원가방식 (원가법, 적산법)',
        '비교방식 (거래사례비교법, 임대사례비교법)',
        '수익방식 (수익환원법, 수익분석법)',
        '토지평가',
        '건물평가',
        '복합부동산 평가',
        '특수물건 평가',
        '권리평가'
      ],
      tips: '계산문제 풀이 능력이 합격을 좌우',
      difficulty: '상',
      weight: 40
    },
    {
      name: '감정평가이론',
      description: '감정평가의 이론적 기초와 가치론',
      topics: [
        '감정평가의 의의와 기능',
        '가치 이론',
        '지대 및 지가 이론',
        '가격제원칙',
        '최유효이용 분석',
        '감정평가 방법론',
        '감정평가 절차',
        '평가보고서 작성'
      ],
      tips: '실무와 연계하여 이론의 실제 적용 방법 학습',
      difficulty: '상',
      weight: 30
    },
    {
      name: '보상법규',
      description: '공익사업 보상에 관한 법률 및 실무',
      topics: [
        '공익사업을 위한 토지 등의 취득 및 보상에 관한 법률',
        '토지보상법 시행령 및 시행규칙',
        '손실보상의 원칙',
        '토지 보상',
        '건물 보상',
        '영업보상',
        '이주대책',
        '재결 및 불복'
      ],
      tips: '보상 사례별 적용 조항 정확히 암기',
      difficulty: '상',
      weight: 30
    }
  ];

  const examSchedule = {
    firstExam: {
      period: '매년 3월 중순',
      subjects: 5,
      questions: 100,
      time: 150,
      passScore: '과목당 40점, 전과목 평균 60점 이상'
    },
    secondExam: {
      period: '매년 7월 중순',
      subjects: 3,
      format: '논술형',
      time: 210,
      passScore: '과목당 40점, 전과목 평균 60점 이상'
    }
  };

  const passStrategies = [
    {
      phase: '기초 다지기',
      period: '6개월',
      description: '경제학, 회계학, 민법 기초 이론 학습',
      tasks: [
        '경제학 기본 개념 정립',
        '회계 원리 이해',
        '민법 총칙, 물권 기초',
        '부동산학 기본서 1회독'
      ]
    },
    {
      phase: '심화 학습',
      period: '6개월',
      description: '감정평가 이론 및 실무 집중 학습',
      tasks: [
        '감정평가 3방식 완벽 이해',
        '계산문제 유형별 풀이법',
        '보상법규 조문 학습',
        '기출문제 분석'
      ]
    },
    {
      phase: '실전 대비',
      period: '3개월',
      description: '모의고사 및 취약점 보완',
      tasks: [
        '모의고사 반복 풀이',
        '오답노트 정리',
        '시간 관리 연습',
        '최신 판례 및 개정법률 확인'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 text-emerald-100">
            <Link href="/" className="hover:text-white">홈</Link>
            <span className="mx-2">/</span>
            <Link href="/category/real-estate" className="hover:text-white">부동산·건설</Link>
            <span className="mx-2">/</span>
            <Link href="/category/real-estate/appraiser" className="hover:text-white">감정평가사</Link>
            <span className="mx-2">/</span>
            <span>시험정보</span>
          </nav>
          <h1 className="text-4xl font-bold mb-4">감정평가사 시험정보</h1>
          <p className="text-xl text-emerald-100">
            1차·2차 시험 과목별 상세 정보와 합격 전략
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('first')}
                  className={`flex-1 py-4 text-center font-semibold transition-colors ${
                    activeTab === 'first'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  1차 시험 (객관식)
                </button>
                <button
                  onClick={() => setActiveTab('second')}
                  className={`flex-1 py-4 text-center font-semibold transition-colors ${
                    activeTab === 'second'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  2차 시험 (논술형)
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'first' ? (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-emerald-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-emerald-600">{examSchedule.firstExam.subjects}과목</div>
                        <div className="text-gray-600 text-sm">시험과목</div>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-emerald-600">{examSchedule.firstExam.questions}문제</div>
                        <div className="text-gray-600 text-sm">총 문항수</div>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-emerald-600">{examSchedule.firstExam.time}분</div>
                        <div className="text-gray-600 text-sm">시험시간</div>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-emerald-600">60점</div>
                        <div className="text-gray-600 text-sm">평균 합격점수</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-4">1차 시험 과목별 상세</h3>
                    <div className="space-y-4">
                      {firstExamSubjects.map((subject, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-semibold text-emerald-700">{subject.name}</h4>
                            <div className="flex gap-2">
                              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-sm">
                                배점 {subject.weight}%
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                난이도 {subject.difficulty}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{subject.description}</p>
                          <div className="mb-3">
                            <span className="font-medium text-gray-700">주요 출제 범위:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {subject.topics.map((topic, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="bg-yellow-50 p-3 rounded-lg">
                            <span className="font-medium text-yellow-800">💡 학습 TIP:</span>
                            <span className="text-yellow-700 ml-2">{subject.tips}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-teal-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-teal-600">{examSchedule.secondExam.subjects}과목</div>
                        <div className="text-gray-600 text-sm">시험과목</div>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-teal-600">{examSchedule.secondExam.format}</div>
                        <div className="text-gray-600 text-sm">시험형식</div>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-teal-600">{examSchedule.secondExam.time}분</div>
                        <div className="text-gray-600 text-sm">시험시간</div>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-teal-600">60점</div>
                        <div className="text-gray-600 text-sm">평균 합격점수</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-4">2차 시험 과목별 상세</h3>
                    <div className="space-y-4">
                      {secondExamSubjects.map((subject, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-semibold text-teal-700">{subject.name}</h4>
                            <div className="flex gap-2">
                              <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-sm">
                                배점 {subject.weight}%
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                난이도 {subject.difficulty}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{subject.description}</p>
                          <div className="mb-3">
                            <span className="font-medium text-gray-700">주요 출제 범위:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {subject.topics.map((topic, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="bg-yellow-50 p-3 rounded-lg">
                            <span className="font-medium text-yellow-800">💡 학습 TIP:</span>
                            <span className="text-yellow-700 ml-2">{subject.tips}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pass Strategy Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">합격 전략 로드맵</h2>
              <div className="relative">
                {passStrategies.map((strategy, index) => (
                  <div key={index} className="flex mb-8 last:mb-0">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      {index < passStrategies.length - 1 && (
                        <div className="w-0.5 h-full bg-emerald-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{strategy.phase}</h3>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                          {strategy.period}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{strategy.description}</p>
                      <ul className="space-y-2">
                        {strategy.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-center text-gray-700">
                            <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Tips Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">시험 응시 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h3 className="font-semibold text-emerald-800 mb-3">1차 시험 전략</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 문제당 1.5분 배분, 어려운 문제는 표시 후 패스</li>
                    <li>• 경제학, 회계학 계산문제는 반드시 검산</li>
                    <li>• 민법은 판례 중심 암기가 효과적</li>
                    <li>• 법규 과목은 최신 개정사항 반드시 확인</li>
                    <li>• 부동산학은 용어 정의 정확히 암기</li>
                  </ul>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <h3 className="font-semibold text-teal-800 mb-3">2차 시험 전략</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 답안 구성 시간 10분, 작성 시간 배분 철저</li>
                    <li>• 감정평가실무 계산문제 풀이과정 상세 서술</li>
                    <li>• 이론 문제는 논리적 흐름 중요</li>
                    <li>• 보상법규는 조문 번호 정확히 기재</li>
                    <li>• 글씨는 읽기 쉽게, 줄 맞춰 작성</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recent Pass Rate */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">최근 합격률 현황</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-700">연도</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">1차 응시자</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">1차 합격률</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">2차 응시자</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">2차 합격률</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3">2024</td>
                      <td className="px-4 py-3">5,234명</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">28.5%</td>
                      <td className="px-4 py-3">2,156명</td>
                      <td className="px-4 py-3 text-teal-600 font-semibold">15.8%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3">2023</td>
                      <td className="px-4 py-3">4,892명</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">31.2%</td>
                      <td className="px-4 py-3">1,987명</td>
                      <td className="px-4 py-3 text-teal-600 font-semibold">14.2%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">2022</td>
                      <td className="px-4 py-3">4,567명</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">29.8%</td>
                      <td className="px-4 py-3">1,876명</td>
                      <td className="px-4 py-3 text-teal-600 font-semibold">16.5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">빠른 링크</h3>
              <div className="space-y-2">
                <Link
                  href="/category/real-estate/appraiser"
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors text-gray-700"
                >
                  📋 자격증 개요
                </Link>
                <Link
                  href="/category/real-estate/appraiser/study/appraisal-theory"
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors text-gray-700"
                >
                  📚 감정평가이론 학습
                </Link>
                <Link
                  href="/category/real-estate/appraiser/study/appraisal-law"
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors text-gray-700"
                >
                  ⚖️ 감정평가법규 학습
                </Link>
              </div>
            </div>

            {/* Study Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">시험 일정</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <div className="font-semibold text-gray-800">1차 시험</div>
                  <div className="text-sm text-gray-600">매년 3월 중순</div>
                  <div className="text-xs text-gray-500">원서접수: 2월 초</div>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <div className="font-semibold text-gray-800">2차 시험</div>
                  <div className="text-sm text-gray-600">매년 7월 중순</div>
                  <div className="text-xs text-gray-500">원서접수: 6월 초</div>
                </div>
              </div>
            </div>

            {/* AI Helper */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">AI 학습 도우미</h3>
              <p className="text-sm text-emerald-100 mb-4">
                AI와 함께 감정평가사 시험을 준비하세요
              </p>
              <button
                onClick={() => setShowAIModal(true)}
                className="w-full bg-white text-emerald-600 font-semibold py-2 px-4 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                AI 도우미 시작하기
              </button>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">시험 관련 문의</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-700">한국산업인력공단</div>
                  <div className="text-gray-600">☎ 1644-8000</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">큐넷</div>
                  <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                    www.q-net.or.kr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">AI 학습 도우미 선택</h3>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <a
                href="https://claude.ai/new?q=%EA%B0%90%EC%A0%95%ED%8F%89%EA%B0%80%EC%82%AC%20%EC%8B%9C%ED%97%98%20%EC%A4%80%EB%B9%84%EB%A5%BC%20%EB%8F%84%EC%99%80%EC%A3%BC%EC%84%B8%EC%9A%94.%20%EA%B3%BC%EB%AA%A9%EB%B3%84%20%ED%95%99%EC%8A%B5%20%EC%A0%84%EB%9E%B5%EA%B3%BC%20%EC%A4%91%EC%9A%94%20%EA%B0%9C%EB%85%90%EC%9D%84%20%EC%84%A4%EB%AA%85%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🟠</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Claude</div>
                  <div className="text-sm text-gray-600">Anthropic의 AI 어시스턴트</div>
                </div>
              </a>
              <a
                href="https://chat.openai.com/?q=%EA%B0%90%EC%A0%95%ED%8F%89%EA%B0%80%EC%82%AC%20%EC%8B%9C%ED%97%98%20%EC%A4%80%EB%B9%84%EB%A5%BC%20%EB%8F%84%EC%99%80%EC%A3%BC%EC%84%B8%EC%9A%94.%20%EA%B3%BC%EB%AA%A9%EB%B3%84%20%ED%95%99%EC%8A%B5%20%EC%A0%84%EB%9E%B5%EA%B3%BC%20%EC%A4%91%EC%9A%94%20%EA%B0%9C%EB%85%90%EC%9D%84%20%EC%84%A4%EB%AA%85%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🟢</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">ChatGPT</div>
                  <div className="text-sm text-gray-600">OpenAI의 AI 어시스턴트</div>
                </div>
              </a>
              <a
                href="https://gemini.google.com/app?q=%EA%B0%90%EC%A0%95%ED%8F%89%EA%B0%80%EC%82%AC%20%EC%8B%9C%ED%97%98%20%EC%A4%80%EB%B9%84%EB%A5%BC%20%EB%8F%84%EC%99%80%EC%A3%BC%EC%84%B8%EC%9A%94.%20%EA%B3%BC%EB%AA%A9%EB%B3%84%20%ED%95%99%EC%8A%B5%20%EC%A0%84%EB%9E%B5%EA%B3%BC%20%EC%A4%91%EC%9A%94%20%EA%B0%9C%EB%85%90%EC%9D%84%20%EC%84%A4%EB%AA%85%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🔵</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Gemini</div>
                  <div className="text-sm text-gray-600">Google의 AI 어시스턴트</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
