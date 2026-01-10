'use client';

import { useState } from 'react';

export default function HealthEducator3ExamPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">보건교육사 3급 시험정보</h1>
          <p className="text-gray-600">건강증진과 보건교육 전문가 자격시험</p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-t-2xl shadow-xl">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              시험개요
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'schedule'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              시험일정
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'subjects'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              시험과목
            </button>
            <button
              onClick={() => setActiveTab('application')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'application'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              접수방법
            </button>
          </div>

          {/* 탭 컨텐츠 */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">시험 개요</h2>
                  <div className="bg-green-50 p-6 rounded-lg space-y-3">
                    <div className="flex">
                      <span className="font-semibold text-green-800 w-32">자격 등급:</span>
                      <span className="text-gray-700">보건교육사 3급</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-green-800 w-32">응시자격:</span>
                      <span className="text-gray-700">학력 제한 없음 (누구나 응시 가능)</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-green-800 w-32">시험 주관:</span>
                      <span className="text-gray-700">보건복지인력개발원</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-green-800 w-32">시험 방식:</span>
                      <span className="text-gray-700">필기시험 + 실기시험</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-green-800 w-32">합격률:</span>
                      <span className="text-gray-700">약 50%</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">합격기준</h2>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800 w-32">필기시험:</span>
                      <span className="text-gray-700">과목당 40점 이상, 전체 평균 60점 이상</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800 w-32">실기시험:</span>
                      <span className="text-gray-700">60점 이상</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">주요 직무</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">보건교육 프로그램 기획 및 운영</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">건강증진 사업 수행</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">보건교육 자료 개발 및 보급</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">건강상담 및 정보 제공</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">지역사회 건강조사 및 분석</span>
                    </li>
                  </ul>
                </section>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">2026년 시험일정</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="border border-green-200 px-4 py-3 text-left font-semibold text-green-800">구분</th>
                          <th className="border border-green-200 px-4 py-3 text-left font-semibold text-green-800">필기 접수</th>
                          <th className="border border-green-200 px-4 py-3 text-left font-semibold text-green-800">필기 시험</th>
                          <th className="border border-green-200 px-4 py-3 text-left font-semibold text-green-800">필기 발표</th>
                          <th className="border border-green-200 px-4 py-3 text-left font-semibold text-green-800">실기 시험</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-green-50">
                          <td className="border border-gray-200 px-4 py-3 font-semibold">1회</td>
                          <td className="border border-gray-200 px-4 py-3">1월 중</td>
                          <td className="border border-gray-200 px-4 py-3">3월 중</td>
                          <td className="border border-gray-200 px-4 py-3">4월 중</td>
                          <td className="border border-gray-200 px-4 py-3">5월 중</td>
                        </tr>
                        <tr className="hover:bg-green-50">
                          <td className="border border-gray-200 px-4 py-3 font-semibold">2회</td>
                          <td className="border border-gray-200 px-4 py-3">7월 중</td>
                          <td className="border border-gray-200 px-4 py-3">9월 중</td>
                          <td className="border border-gray-200 px-4 py-3">10월 중</td>
                          <td className="border border-gray-200 px-4 py-3">11월 중</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    * 정확한 일정은 보건복지인력개발원 홈페이지에서 확인하시기 바랍니다.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">시험 시간</h2>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                    <div className="flex">
                      <span className="font-semibold text-gray-800 w-32">필기시험:</span>
                      <span className="text-gray-700">09:00 ~ 12:00 (180분)</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-gray-800 w-32">실기시험:</span>
                      <span className="text-gray-700">별도 공지 (약 60분)</span>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'subjects' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">필기 시험과목</h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">1. 보건교육기초</h3>
                      <p className="text-gray-700 text-sm mb-2">보건교육의 이론적 기초와 원리</p>
                      <ul className="text-gray-600 text-sm space-y-1 ml-4">
                        <li>• 보건교육의 개념과 역사</li>
                        <li>• 보건교육 이론 및 모형</li>
                        <li>• 보건교육 방법론</li>
                        <li>• 보건교육 평가</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">2. 공중보건학</h3>
                      <p className="text-gray-700 text-sm mb-2">공중보건의 개념과 실제</p>
                      <ul className="text-gray-600 text-sm space-y-1 ml-4">
                        <li>• 공중보건학 총론</li>
                        <li>• 역학 및 질병관리</li>
                        <li>• 환경보건</li>
                        <li>• 보건행정 및 정책</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">3. 건강심리학</h3>
                      <p className="text-gray-700 text-sm mb-2">건강행동과 심리적 요인</p>
                      <ul className="text-gray-600 text-sm space-y-1 ml-4">
                        <li>• 건강심리학 기초</li>
                        <li>• 건강행동 이론</li>
                        <li>• 스트레스와 건강</li>
                        <li>• 건강증진 심리학</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">실기 시험</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">보건교육 실무</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• 보건교육 프로그램 기획안 작성</li>
                      <li>• 보건교육 자료 개발</li>
                      <li>• 사례 분석 및 문제 해결</li>
                      <li>• 건강증진 사업 기획</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">출제 기준</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="border border-green-200 px-4 py-3 text-left font-semibold text-green-800">과목</th>
                          <th className="border border-green-200 px-4 py-3 text-center font-semibold text-green-800">문항수</th>
                          <th className="border border-green-200 px-4 py-3 text-center font-semibold text-green-800">배점</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-green-50">
                          <td className="border border-gray-200 px-4 py-3">보건교육기초</td>
                          <td className="border border-gray-200 px-4 py-3 text-center">40문항</td>
                          <td className="border border-gray-200 px-4 py-3 text-center">100점</td>
                        </tr>
                        <tr className="hover:bg-green-50">
                          <td className="border border-gray-200 px-4 py-3">공중보건학</td>
                          <td className="border border-gray-200 px-4 py-3 text-center">40문항</td>
                          <td className="border border-gray-200 px-4 py-3 text-center">100점</td>
                        </tr>
                        <tr className="hover:bg-green-50">
                          <td className="border border-gray-200 px-4 py-3">건강심리학</td>
                          <td className="border border-gray-200 px-4 py-3 text-center">40문항</td>
                          <td className="border border-gray-200 px-4 py-3 text-center">100점</td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td className="border border-gray-200 px-4 py-3">합계</td>
                          <td className="border border-gray-200 px-4 py-3 text-center">120문항</td>
                          <td className="border border-gray-200 px-4 py-3 text-center">300점</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'application' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">접수 방법</h2>
                  <div className="bg-green-50 p-6 rounded-lg space-y-4">
                    <div>
                      <h3 className="font-semibold text-green-800 mb-2">인터넷 접수</h3>
                      <p className="text-gray-700">보건복지인력개발원 홈페이지에서 온라인 접수</p>
                      <a
                        href="https://edu.khi.or.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline text-sm"
                      >
                        https://edu.khi.or.kr
                      </a>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">응시료</h2>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-2">
                    <div className="flex">
                      <span className="font-semibold text-gray-800 w-32">필기시험:</span>
                      <span className="text-gray-700">50,000원</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-gray-800 w-32">실기시험:</span>
                      <span className="text-gray-700">30,000원</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">제출 서류</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">응시원서 (온라인 작성)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">증명사진 (최근 6개월 이내 촬영)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">신분증 사본</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">유의사항</h2>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• 접수 기간 내에만 접수 가능하며, 기간 경과 후에는 접수 불가</li>
                      <li>• 응시료 납부 후 환불 불가 (단, 시험 중지 시 예외)</li>
                      <li>• 시험 당일 신분증 지참 필수</li>
                      <li>• 필기시험 합격자에 한해 실기시험 응시 가능</li>
                      <li>• 필기시험 합격 후 2년간 필기시험 면제</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">문의처</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-semibold">기관:</span> 보건복지인력개발원
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">전화:</span> 043-710-9114
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">홈페이지:</span>{' '}
                        <a
                          href="https://edu.khi.or.kr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline"
                        >
                          https://edu.khi.or.kr
                        </a>
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
