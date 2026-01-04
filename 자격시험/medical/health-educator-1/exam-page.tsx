'use client';

import { useState } from 'react';

export default function HealthEducator1ExamPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            보건교육사 1급 시험 정보
          </h1>
          <p className="text-xl text-gray-600">
            시험 일정 및 상세 정보 안내
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              시험 개요
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'subjects'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              시험 과목
            </button>
            <button
              onClick={() => setActiveTab('qualification')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'qualification'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              응시 자격
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'schedule'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              시험 일정
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">시험 개요</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-emerald-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">시험 형식</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 필기시험: 객관식 5지선다형</li>
                    <li>• 실기시험: 작업형 평가</li>
                    <li>• 과목당 60점 이상 합격</li>
                  </ul>
                </div>

                <div className="bg-teal-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">난이도 및 합격률</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 난이도: ★★★★☆ (4/5)</li>
                    <li>• 평균 합격률: 약 30%</li>
                    <li>• 응시자 대부분 실무 경력자</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">자격의 특징</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  보건교육사 1급은 보건교육 분야의 최고 전문가 자격증으로, 보건교육 프로그램의 총괄 기획,
                  실행, 평가를 담당합니다. 지역사회 건강증진 사업을 주도하며, 보건교육 정책 수립에 참여할 수
                  있는 고급 전문 인력으로 인정받습니다.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">3년+</div>
                    <div className="text-sm text-gray-600">실무 경력 요구</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-teal-600 mb-1">5과목</div>
                    <div className="text-sm text-gray-600">시험 과목</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-cyan-600 mb-1">30%</div>
                    <div className="text-sm text-gray-600">평균 합격률</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">시험 과목</h2>

              <div className="space-y-6">
                <div className="border-l-4 border-emerald-500 bg-emerald-50 p-6 rounded-r-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">1. 보건교육학</h3>
                  <p className="text-gray-700 mb-3">
                    보건교육의 이론적 기초, 교육 방법론, 교수-학습 원리 등을 다룹니다.
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• 보건교육 철학과 역사</li>
                    <li>• 교육 이론 및 모델</li>
                    <li>• 교수-학습 방법</li>
                    <li>• 교육 매체 활용</li>
                  </ul>
                </div>

                <div className="border-l-4 border-teal-500 bg-teal-50 p-6 rounded-r-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">2. 건강증진이론</h3>
                  <p className="text-gray-700 mb-3">
                    건강 행동 변화 이론과 건강증진 프로그램 적용 전략을 학습합니다.
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• 건강 행동 이론</li>
                    <li>• 생태학적 모델</li>
                    <li>• 커뮤니티 기반 접근</li>
                    <li>• 건강증진 전략</li>
                  </ul>
                </div>

                <div className="border-l-4 border-cyan-500 bg-cyan-50 p-6 rounded-r-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">3. 보건정책</h3>
                  <p className="text-gray-700 mb-3">
                    국가 보건의료 정책, 제도, 법규 및 보건 행정 관리를 다룹니다.
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• 보건의료 정책과 제도</li>
                    <li>• 보건 관련 법규</li>
                    <li>• 보건 행정 관리</li>
                    <li>• 국제 보건 정책</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">4. 보건프로그램개발</h3>
                  <p className="text-gray-700 mb-3">
                    보건교육 프로그램의 기획, 실행, 평가 전 과정을 학습합니다.
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• 요구도 사정</li>
                    <li>• 프로그램 기획 및 설계</li>
                    <li>• 예산 및 자원 관리</li>
                    <li>• 프로그램 평가</li>
                  </ul>
                </div>

                <div className="border-l-4 border-indigo-500 bg-indigo-50 p-6 rounded-r-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">5. 실기</h3>
                  <p className="text-gray-700 mb-3">
                    보건교육 실습 및 실무 역량을 평가합니다.
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• 보건교육 실습</li>
                    <li>• 사례 분석 및 문제 해결</li>
                    <li>• 교육 자료 개발</li>
                    <li>• 프로그램 운영 실무</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qualification' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">응시 자격</h2>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">기본 요건</h3>
                <p className="text-gray-700 text-lg font-semibold">
                  보건교육사 2급 자격 취득 후 보건교육 실무 경력 3년 이상
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">실무 경력 인정 범위</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 보건소 및 보건지소에서의 보건교육 업무</li>
                    <li>• 의료기관 건강증진센터 근무</li>
                    <li>• 학교 보건실 및 보건교육 담당</li>
                    <li>• 산업체 보건관리자로서 보건교육 실시</li>
                    <li>• 보건교육 관련 연구기관 근무</li>
                    <li>• 건강증진사업지원단 근무</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">제출 서류</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 보건교육사 2급 자격증 사본</li>
                    <li>• 경력증명서 (재직증명서)</li>
                    <li>• 응시원서</li>
                    <li>• 사진 (최근 6개월 이내)</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">주의사항</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 경력 기간은 2급 자격 취득 이후만 인정</li>
                    <li>• 파트타임 근무는 실제 근무 시간 환산 적용</li>
                    <li>• 중복 경력은 인정되지 않음</li>
                    <li>• 경력증명서는 발급일로부터 3개월 이내 유효</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">시험 일정</h2>

              <div className="bg-emerald-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">2026년 시험 일정</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">원서 접수</span>
                      <span className="text-emerald-600 font-semibold">2026년 3월</span>
                    </div>
                    <p className="text-sm text-gray-600">온라인 접수만 가능</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">필기시험</span>
                      <span className="text-teal-600 font-semibold">2026년 4월</span>
                    </div>
                    <p className="text-sm text-gray-600">전국 주요 도시에서 실시</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">필기 합격 발표</span>
                      <span className="text-cyan-600 font-semibold">2026년 5월</span>
                    </div>
                    <p className="text-sm text-gray-600">협회 홈페이지 공고</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">실기시험</span>
                      <span className="text-blue-600 font-semibold">2026년 6월</span>
                    </div>
                    <p className="text-sm text-gray-600">필기 합격자 대상</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">최종 합격 발표</span>
                      <span className="text-indigo-600 font-semibold">2026년 7월</span>
                    </div>
                    <p className="text-sm text-gray-600">자격증 발급 신청 가능</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">시험 시간</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 1교시 (09:00-10:30): 보건교육학, 건강증진이론</li>
                    <li>• 2교시 (11:00-12:30): 보건정책, 보건프로그램개발</li>
                    <li>• 실기시험: 별도 공지</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">시험 장소</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 서울, 부산, 대구, 광주, 대전 등</li>
                    <li>• 원서 접수 시 지역 선택</li>
                    <li>• 수험표에 상세 주소 기재</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-3">문의처</h3>
                <p className="text-gray-700">
                  한국보건의료인국가시험원 또는 한국보건복지인력개발원
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
