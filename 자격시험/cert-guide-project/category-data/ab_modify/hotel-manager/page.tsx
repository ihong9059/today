'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HotelManagerPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'exam' | 'career'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service" className="text-amber-600 hover:text-amber-800 font-medium">
            ← 서비스 분야
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">🏨</span>
            <div>
              <h1 className="text-4xl font-bold">호텔경영사</h1>
              <p className="text-amber-100 text-lg">Hotel Manager</p>
            </div>
          </div>
          <p className="text-xl text-amber-100 max-w-2xl">
            호텔 및 관광숙박업의 경영관리 전문가를 양성하는 국가공인 자격증
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-amber-600 font-bold text-2xl">연 2회</p>
            <p className="text-gray-500 text-sm">시험 횟수</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-amber-600 font-bold text-2xl">30%</p>
            <p className="text-gray-500 text-sm">평균 합격률</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-amber-600 font-bold text-2xl">62,000원</p>
            <p className="text-gray-500 text-sm">응시료</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-amber-600 font-bold text-2xl">한국산업인력공단</p>
            <p className="text-gray-500 text-sm">시행기관</p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 rounded-xl font-bold transition ${activeTab === 'overview' ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-amber-50'}`}
          >
            📋 자격 개요
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`flex-1 py-3 rounded-xl font-bold transition ${activeTab === 'exam' ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-amber-50'}`}
          >
            📝 시험 정보
          </button>
          <button
            onClick={() => setActiveTab('career')}
            className={`flex-1 py-3 rounded-xl font-bold transition ${activeTab === 'career' ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-amber-50'}`}
          >
            💼 진로·전망
          </button>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 자격 소개 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🏨 호텔경영사란?</h2>
              <p className="text-gray-600 leading-relaxed">
                호텔경영사는 호텔 및 관광숙박시설의 운영과 관리에 필요한 전문 지식과 능력을 갖춘 자를 말합니다.
                객실, 식음료, 연회, 마케팅 등 호텔의 전반적인 경영 업무를 수행하며,
                고객 서비스 품질 향상과 수익 극대화를 위한 전략을 수립합니다.
              </p>
            </div>

            {/* 응시 자격 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📌 응시 자격</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                  <span className="text-amber-600 font-bold">1</span>
                  <p className="text-gray-700">관광 관련 학과 졸업자 또는 졸업예정자</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                  <span className="text-amber-600 font-bold">2</span>
                  <p className="text-gray-700">호텔 관련 실무 경력 2년 이상인 자</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                  <span className="text-amber-600 font-bold">3</span>
                  <p className="text-gray-700">호텔서비스사 자격 취득 후 1년 이상 경력자</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                  <span className="text-amber-600 font-bold">4</span>
                  <p className="text-gray-700">기타 관련 법령에 따른 자격 요건 충족자</p>
                </div>
              </div>
            </div>

            {/* 주요 업무 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💼 주요 업무</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 rounded-xl">
                  <h3 className="font-bold text-orange-700 mb-2">객실 관리</h3>
                  <p className="text-sm text-gray-600">객실 예약, 배정, 점유율 관리 및 요금 전략 수립</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <h3 className="font-bold text-orange-700 mb-2">식음료 운영</h3>
                  <p className="text-sm text-gray-600">레스토랑, 바, 연회장 운영 및 메뉴 개발</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <h3 className="font-bold text-orange-700 mb-2">마케팅·영업</h3>
                  <p className="text-sm text-gray-600">고객 유치 전략, 프로모션 기획, 온라인 마케팅</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <h3 className="font-bold text-orange-700 mb-2">인사·재무 관리</h3>
                  <p className="text-sm text-gray-600">직원 교육, 예산 관리, 원가 분석, 수익성 개선</p>
                </div>
              </div>
            </div>

            {/* 취득 혜택 */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 자격 취득 혜택</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">✓</span>
                  <div>
                    <p className="font-medium">호텔 관리자 채용 우대</p>
                    <p className="text-amber-100 text-sm">국내외 호텔 취업 시 가산점</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">✓</span>
                  <div>
                    <p className="font-medium">승진 시 우대</p>
                    <p className="text-amber-100 text-sm">호텔 내 관리자 승진 요건</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">✓</span>
                  <div>
                    <p className="font-medium">전문성 인증</p>
                    <p className="text-amber-100 text-sm">호텔경영 전문가로서 역량 증명</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">✓</span>
                  <div>
                    <p className="font-medium">창업·컨설팅</p>
                    <p className="text-amber-100 text-sm">숙박업 창업 및 경영 컨설팅</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exam' && (
          <div className="space-y-6">
            {/* 시험 구조 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 시험 구조</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-amber-200 rounded-xl p-4">
                  <h3 className="font-bold text-amber-700 text-lg mb-3">1차 필기시험</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between"><span>문항 수</span><span className="font-medium">100문항</span></li>
                    <li className="flex justify-between"><span>시험 시간</span><span className="font-medium">150분</span></li>
                    <li className="flex justify-between"><span>문제 유형</span><span className="font-medium">객관식 4지선다</span></li>
                    <li className="flex justify-between"><span>합격 기준</span><span className="font-medium">과목당 40점, 평균 60점</span></li>
                  </ul>
                </div>
                <div className="border-2 border-orange-200 rounded-xl p-4">
                  <h3 className="font-bold text-orange-700 text-lg mb-3">2차 실기시험</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between"><span>시험 유형</span><span className="font-medium">필답형</span></li>
                    <li className="flex justify-between"><span>시험 시간</span><span className="font-medium">180분</span></li>
                    <li className="flex justify-between"><span>출제 범위</span><span className="font-medium">호텔경영 실무</span></li>
                    <li className="flex justify-between"><span>합격 기준</span><span className="font-medium">60점 이상</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 필기 과목 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필기시험 과목</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">호텔경영론</h3>
                    <p className="text-sm text-gray-500">호텔 조직, 객실관리, 식음료 운영, 연회 관리</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium">20문항</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">호텔회계</h3>
                    <p className="text-sm text-gray-500">재무제표, 원가관리, 예산관리, 수익성 분석</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium">20문항</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">호텔마케팅</h3>
                    <p className="text-sm text-gray-500">마케팅 전략, 고객관리, 온라인 마케팅, 브랜딩</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium">20문항</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">관광법규</h3>
                    <p className="text-sm text-gray-500">관광기본법, 관광진흥법, 소비자보호법, 노동법</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium">20문항</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg">5</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">관광학개론</h3>
                    <p className="text-sm text-gray-500">관광 개념, 관광산업, 관광 트렌드, 서비스론</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium">20문항</span>
                </div>
              </div>
            </div>

            {/* 시험 상세 링크 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <Link href="/category/service/hotel-manager/exam" className="block w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center rounded-xl font-bold text-lg hover:from-amber-700 hover:to-orange-700 transition">
                시험 상세 정보 보기 →
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'career' && (
          <div className="space-y-6">
            {/* 진출 분야 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🏢 진출 분야</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-amber-200 rounded-xl">
                  <h3 className="font-bold text-amber-700 mb-2">특급 호텔</h3>
                  <p className="text-sm text-gray-600">5성급 호텔 객실부, 식음부, 연회부, 마케팅부</p>
                </div>
                <div className="p-4 border-2 border-amber-200 rounded-xl">
                  <h3 className="font-bold text-amber-700 mb-2">리조트·콘도</h3>
                  <p className="text-sm text-gray-600">종합 리조트, 콘도미니엄 경영관리</p>
                </div>
                <div className="p-4 border-2 border-amber-200 rounded-xl">
                  <h3 className="font-bold text-amber-700 mb-2">외국계 호텔</h3>
                  <p className="text-sm text-gray-600">글로벌 호텔 체인 (메리어트, 힐튼, IHG 등)</p>
                </div>
                <div className="p-4 border-2 border-amber-200 rounded-xl">
                  <h3 className="font-bold text-amber-700 mb-2">관광공사·공기업</h3>
                  <p className="text-sm text-gray-600">한국관광공사, 지자체 관광 관련 기관</p>
                </div>
                <div className="p-4 border-2 border-amber-200 rounded-xl">
                  <h3 className="font-bold text-amber-700 mb-2">컨설팅·창업</h3>
                  <p className="text-sm text-gray-600">숙박업 경영 컨설팅, 펜션·게스트하우스 창업</p>
                </div>
                <div className="p-4 border-2 border-amber-200 rounded-xl">
                  <h3 className="font-bold text-amber-700 mb-2">교육·연구</h3>
                  <p className="text-sm text-gray-600">호텔관광 전공 교수, 연구원</p>
                </div>
              </div>
            </div>

            {/* 연봉 정보 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💰 예상 연봉</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-24 text-gray-500">신입</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-amber-400 h-4 rounded-full" style={{width: '35%'}}></div>
                  </div>
                  <span className="font-bold text-gray-700">2,800~3,500만원</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-gray-500">경력 3~5년</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-amber-500 h-4 rounded-full" style={{width: '50%'}}></div>
                  </div>
                  <span className="font-bold text-gray-700">3,500~5,000만원</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-gray-500">과장급</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-amber-600 h-4 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <span className="font-bold text-gray-700">5,000~7,000만원</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-gray-500">임원급</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-orange-600 h-4 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <span className="font-bold text-gray-700">8,000만원 이상</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">※ 호텔 등급, 위치, 개인 역량에 따라 상이</p>
            </div>

            {/* 전망 */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">📈 향후 전망</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  <p>외국인 관광객 증가로 호텔산업 지속 성장</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  <p>럭셔리 호텔, 부티크 호텔 등 다양한 숙박 형태 확대</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  <p>MICE 산업 성장으로 호텔 수요 증가</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                  <p>디지털 마케팅, AI 도입 등 첨단 경영 인재 필요</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 학습 시작하기 */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 학습 시작하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/category/service/hotel-manager/study/hotel-management" className="py-4 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔경영론</Link>
            <Link href="/category/service/hotel-manager/study/hotel-accounting" className="py-4 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔회계</Link>
            <Link href="/category/service/hotel-manager/study/hotel-marketing" className="py-4 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">호텔마케팅</Link>
            <Link href="/category/service/hotel-manager/study/hotel-law" className="py-4 px-4 bg-amber-100 text-amber-700 rounded-xl text-center font-medium hover:bg-amber-200 transition">관광법규</Link>
            <Link href="/category/service/hotel-manager/study/practical" className="py-4 px-4 bg-orange-100 text-orange-700 rounded-xl text-center font-medium hover:bg-orange-200 transition">실기시험</Link>
            <Link href="/category/service/hotel-manager/exam" className="py-4 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl text-center font-medium hover:from-amber-700 hover:to-orange-700 transition">시험 안내 →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
