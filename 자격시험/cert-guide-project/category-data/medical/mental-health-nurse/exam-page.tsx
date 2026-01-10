'use client';

import { useState } from 'react';

export default function MentalHealthNurseExamPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            정신건강간호사 시험 정보
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
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              시험 개요
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'subjects'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              시험 과목
            </button>
            <button
              onClick={() => setActiveTab('qualification')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'qualification'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              응시 자격
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'schedule'
                  ? 'border-b-2 border-purple-500 text-purple-600'
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
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">시험 형식</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 필기시험: 객관식 5지선다형</li>
                    <li>• 실기시험: 사례 분석 및 간호계획 수립</li>
                    <li>• 과목당 60점 이상 합격</li>
                  </ul>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">난이도 및 합격률</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 난이도: ★★★★☆ (4/5)</li>
                    <li>• 평균 합격률: 약 35%</li>
                    <li>• 전문 간호 분야 중 난이도 상위권</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">자격의 특징</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  정신건강간호사는 정신질환자와 정신건강 문제를 가진 대상자에게 전문적인 간호를 제공하는
                  전문 간호사입니다. 정신병원, 정신건강증진센터, 지역사회 정신보건 기관 등에서 활동하며,
                  정신질환의 예방, 치료, 재활에 이르는 전 과정에 참여합니다.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">전문과정</div>
                    <div className="text-sm text-gray-600">이수 필수</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">5과목</div>
                    <div className="text-sm text-gray-600">시험 과목</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">35%</div>
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
                <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-r-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">1. 정신간호학</h3>
                  <p className="text-gray-700 mb-3">
                    정신질환별 간호 중재, 위기 개입, 정신간호 과정의 적용을 다룹니다.
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• 정신질환 분류 및 진단</li>
                    <li>• 조현병, 우울증, 양극성 장애 간호</li>
                    <li>• 위기 개입 및 응급 상황 관리</li>
                    <li>• 정신간호 과정 적용</li>
                  </ul>
                </div>

                <div className="border-l-4 border-indigo-500 bg-indigo-50 p-6 rounded-r-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">2. 정신건강이론</h3>
                  <p className="text-gray-700 mb-3">
                    정신건강의 개념, 발달이론, 스트레스 대처 이론 등을 학습합니다.
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• 정신건강의 개념과 모델</li>
                    <li>• 성격 발달 이론</li>
                    <li>• 스트레스와 적응 이론</li>
                    <li>• 방어기제와 대처 전략</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">3. 정신약리학</h3>
                  <p className="text-gray-700 mb-3">
                    향정신성 약물의 작용기전, 부작용, 간호 관리를 다룹니다.
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• 항정신병 약물</li>
                    <li>• 항우울제 및 기분조절제</li>
                    <li>• 항불안제 및 수면제</li>
                    <li>• 약물 부작용 및 간호 관리</li>
                  </ul>
                </div>

                <div className="border-l-4 border-cyan-500 bg-cyan-50 p-6 rounded-r-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">4. 치료적의사소통</h3>
                  <p className="text-gray-700 mb-3">
                    치료적 관계 형성과 의사소통 기법을 학습합니다.
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• 치료적 관계의 원리</li>
                    <li>• 의사소통 기법 (경청, 공감, 명료화)</li>
                    <li>• 면담 기술</li>
                    <li>• 집단 치료 의사소통</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">5. 실기</h3>
                  <p className="text-gray-700 mb-3">
                    정신간호 실무 능력과 사례 분석 능력을 평가합니다.
                  </p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• 정신질환 사례 분석</li>
                    <li>• 간호계획 수립 및 평가</li>
                    <li>• 위기 상황 대처</li>
                    <li>• 치료적 환경 조성</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qualification' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">응시 자격</h2>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">기본 요건</h3>
                <p className="text-gray-700 text-lg font-semibold">
                  간호사 면허 소지자로서 정신건강간호 전문과정을 이수한 자
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">전문과정 이수 요건</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 정신간호학 석사 학위 과정 이수</li>
                    <li>• 또는 정신건강간호사 자격 인정 교육과정 이수</li>
                    <li>• 정신건강 실무 임상 실습 1,000시간 이상</li>
                    <li>• 정신의료기관 또는 정신건강증진센터 실습 포함</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">실무 경력 인정 기관</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 정신병원 및 정신건강의학과 병동</li>
                    <li>• 정신건강증진센터</li>
                    <li>• 알코올상담센터</li>
                    <li>• 자살예방센터</li>
                    <li>• 정신재활시설</li>
                    <li>• 중독관리통합지원센터</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">제출 서류</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 간호사 면허증 사본</li>
                    <li>• 전문과정 이수 증명서</li>
                    <li>• 임상 실습 확인서</li>
                    <li>• 응시원서 및 사진</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">주의사항</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 전문과정 이수 후 5년 이내 시험 응시 권장</li>
                    <li>• 실습 시간은 전문과정 인증 실습만 인정</li>
                    <li>• 서류 미비 시 응시 불가</li>
                    <li>• 허위 서류 제출 시 자격 박탈</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">시험 일정</h2>

              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">2026년 시험 일정</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">원서 접수</span>
                      <span className="text-purple-600 font-semibold">2026년 4월</span>
                    </div>
                    <p className="text-sm text-gray-600">온라인 접수 (대한간호협회)</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">필기시험</span>
                      <span className="text-indigo-600 font-semibold">2026년 5월</span>
                    </div>
                    <p className="text-sm text-gray-600">전국 주요 도시 시험장</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">필기 합격 발표</span>
                      <span className="text-blue-600 font-semibold">2026년 6월</span>
                    </div>
                    <p className="text-sm text-gray-600">협회 홈페이지 공고</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">실기시험</span>
                      <span className="text-cyan-600 font-semibold">2026년 7월</span>
                    </div>
                    <p className="text-sm text-gray-600">필기 합격자 대상</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">최종 합격 발표</span>
                      <span className="text-green-600 font-semibold">2026년 8월</span>
                    </div>
                    <p className="text-sm text-gray-600">자격증 발급 신청 가능</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">시험 시간</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 1교시 (09:00-10:30): 정신간호학, 정신건강이론</li>
                    <li>• 2교시 (11:00-12:30): 정신약리학, 치료적의사소통</li>
                    <li>• 실기시험: 별도 공지 (약 2시간)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">시험 장소</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 서울, 부산, 대구, 광주, 대전 등</li>
                    <li>• 원서 접수 시 지역 선택 가능</li>
                    <li>• 수험표에 상세 주소 및 유의사항 기재</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-3">문의처</h3>
                <p className="text-gray-700">
                  대한간호협회 또는 보건복지부 정신건강정책과
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
