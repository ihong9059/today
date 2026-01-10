'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Paramedic1ExamPage() {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <Link
            href="/자격시험/medical/paramedic-1"
            className="text-red-600 hover:text-red-800 font-semibold mb-4 inline-block"
          >
            ← 응급구조사 1급 홈으로
          </Link>
          <h1 className="text-4xl font-bold text-red-600 mb-2">시험 정보</h1>
          <p className="text-gray-600">응급구조사 1급 시험 상세 안내</p>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-6 py-4 font-semibold transition-colors ${
                selectedTab === 'overview'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              시험 개요
            </button>
            <button
              onClick={() => setSelectedTab('subjects')}
              className={`px-6 py-4 font-semibold transition-colors ${
                selectedTab === 'subjects'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              시험 과목
            </button>
            <button
              onClick={() => setSelectedTab('schedule')}
              className={`px-6 py-4 font-semibold transition-colors ${
                selectedTab === 'schedule'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              시험 일정
            </button>
            <button
              onClick={() => setSelectedTab('tips')}
              className={`px-6 py-4 font-semibold transition-colors ${
                selectedTab === 'tips'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              합격 전략
            </button>
          </div>

          <div className="p-8">
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">시험 개요</h2>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <p className="text-gray-700">
                      응급구조사 1급은 대학 또는 전문대학에서 응급구조학을 전공한 자에게 부여되는 국가자격증으로,
                      응급환자에 대한 전문적인 응급처치를 수행할 수 있는 자격을 인정받게 됩니다.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">응시자격</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>응급구조학과 4년제 대학 졸업자 또는 졸업예정자</li>
                    <li>응급구조학과 3년제 전문대학 졸업자 또는 졸업예정자</li>
                    <li>보건복지부장관이 인정하는 외국의 응급구조사 면허 소지자</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">시험 정보</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-700 mb-2">시험 구분</p>
                      <p className="text-gray-600">필기시험 + 실기시험</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-700 mb-2">합격 기준</p>
                      <p className="text-gray-600">각 과목 40점 이상, 전 과목 평균 60점 이상</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-700 mb-2">난이도</p>
                      <p className="text-gray-600">4/5 (높음)</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-700 mb-2">평균 합격률</p>
                      <p className="text-gray-600">약 45%</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'subjects' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">시험 과목</h2>

                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">1. 응급의학총론</h3>
                    <p className="text-gray-600 mb-2">응급의료체계, 응급처치 원칙, 환자평가 및 기록</p>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>응급의료체계의 구성과 운영</li>
                      <li>환자평가 및 기본 응급처치</li>
                      <li>응급의료 기록 및 법적 문제</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">2. 해부생리학</h3>
                    <p className="text-gray-600 mb-2">인체의 구조와 기능, 생리학적 원리</p>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>골격계, 근육계, 신경계</li>
                      <li>순환계, 호흡계, 소화계</li>
                      <li>내분비계, 비뇨생식계, 감각기계</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">3. 약리학</h3>
                    <p className="text-gray-600 mb-2">응급약물의 종류, 투여방법, 약물작용</p>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>약물의 기본원리 및 투여경로</li>
                      <li>응급상황별 주요 약물</li>
                      <li>약물 부작용 및 금기사항</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">4. 외상처치</h3>
                    <p className="text-gray-600 mb-2">외상환자의 평가와 처치</p>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>손상기전 및 외상환자 평가</li>
                      <li>두부, 척추, 흉부, 복부 외상</li>
                      <li>골절, 탈구, 염좌 처치</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">5. 심장응급</h3>
                    <p className="text-gray-600 mb-2">심폐소생술 및 심혈관 응급</p>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>심폐소생술 (CPR) 및 제세동</li>
                      <li>심전도 판독 및 부정맥</li>
                      <li>급성 심근경색 및 심부전</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-pink-500 pl-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">6. 실기시험</h3>
                    <p className="text-gray-600 mb-2">실제 응급처치 술기 수행 및 평가</p>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>기도관리 및 산소투여</li>
                      <li>심폐소생술 및 제세동</li>
                      <li>정맥로 확보 및 약물투여</li>
                      <li>외상환자 처치 및 고정</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'schedule' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">시험 일정</h2>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <p className="font-semibold text-gray-800 mb-2">2026년 시험 일정</p>
                  <p className="text-gray-600">정확한 일정은 한국보건의료인국가시험원 공고를 참조하세요.</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white border-2 border-red-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-red-600 mb-4">제1회 시험</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">필기시험 원서접수</p>
                        <p className="text-gray-600">1월 중순 (약 1주일)</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">필기시험</p>
                        <p className="text-gray-600">3월 중순</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">필기시험 합격자 발표</p>
                        <p className="text-gray-600">4월 초순</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">실기시험</p>
                        <p className="text-gray-600">5월 중순</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">최종 합격자 발표</p>
                        <p className="text-gray-600">6월 초순</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">시험 준비 타임라인</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                      <div>
                        <p className="font-semibold text-gray-800">6개월 전: 전체 교재 1회독 시작</p>
                        <p className="text-gray-600">전 과목 기본 개념 학습</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                      <div>
                        <p className="font-semibold text-gray-800">4개월 전: 심화 학습 및 2회독</p>
                        <p className="text-gray-600">약한 과목 집중 보완</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                      <div>
                        <p className="font-semibold text-gray-800">2개월 전: 기출문제 풀이</p>
                        <p className="text-gray-600">최근 5개년 기출문제 반복</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                      <div>
                        <p className="font-semibold text-gray-800">1개월 전: 실기 준비 및 최종 정리</p>
                        <p className="text-gray-600">실기 술기 연습 및 약한 부분 보완</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'tips' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">합격 전략</h2>

                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h3 className="font-bold text-gray-800 mb-2">핵심 전략</h3>
                  <p className="text-gray-700">
                    응급구조사 1급은 전문적인 의학 지식과 실기 능력을 모두 요구하는 고난도 자격증입니다.
                    체계적인 학습 계획과 꾸준한 실습이 필수입니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">과목별 학습 전략</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-red-600 mb-2">응급의학총론</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>응급의료체계의 전체 흐름 이해가 중요</li>
                        <li>환자평가 순서와 우선순위 암기</li>
                        <li>법적 문제와 윤리적 이슈 정리</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-blue-600 mb-2">해부생리학</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>인체 구조를 그림으로 그려가며 학습</li>
                        <li>각 기관의 기능과 상호작용 이해</li>
                        <li>병태생리와 연결하여 학습</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-600 mb-2">약리학</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>응급약물 종류별 작용기전 이해</li>
                        <li>용량, 투여경로, 부작용 표로 정리</li>
                        <li>금기사항 반드시 암기</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-orange-600 mb-2">외상처치</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>손상기전에 따른 예상 손상 패턴 학습</li>
                        <li>부위별 처치법 반복 학습</li>
                        <li>실제 사례와 연결하여 이해</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-600 mb-2">심장응급</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>심전도 판독 연습 필수</li>
                        <li>CPR 가이드라인 완벽 숙지</li>
                        <li>알고리즘 순서도 암기</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-pink-600 mb-2">실기시험</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>실습실에서 반복 연습 필수</li>
                        <li>술기 순서와 주의사항 암기</li>
                        <li>시뮬레이션 평가 여러 번 연습</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">공부 방법</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">📚</span>
                      <div>
                        <p className="font-semibold text-gray-800">교재 선정</p>
                        <p className="text-gray-600">학교 교재 + 기출문제집 + 요약집</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">✍️</span>
                      <div>
                        <p className="font-semibold text-gray-800">필기 정리</p>
                        <p className="text-gray-600">핵심 개념을 직접 손으로 쓰며 정리</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">🔄</span>
                      <div>
                        <p className="font-semibold text-gray-800">반복 학습</p>
                        <p className="text-gray-600">최소 3회독 이상, 약한 부분은 더 많이</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">🎯</span>
                      <div>
                        <p className="font-semibold text-gray-800">기출문제</p>
                        <p className="text-gray-600">최근 5개년 기출문제 완벽 분석</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">👥</span>
                      <div>
                        <p className="font-semibold text-gray-800">스터디 그룹</p>
                        <p className="text-gray-600">동료들과 함께 실기 연습 및 문제 풀이</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <h3 className="font-bold text-gray-800 mb-2">합격자 조언</h3>
                  <p className="text-gray-700 italic">
                    "이론과 실기를 분리하지 말고 항상 연결해서 공부하세요. 실제 응급상황을 상상하며 학습하면
                    암기가 아닌 이해로 접근할 수 있습니다. 특히 실기는 반복 연습이 전부입니다!"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 학습 시작 버튼 */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">지금 바로 학습을 시작하세요!</h2>
          <p className="mb-6">체계적인 학습으로 응급구조사 1급 합격에 도전하세요.</p>
          <Link
            href="/자격시험/medical/paramedic-1"
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors"
          >
            학습 과목 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
