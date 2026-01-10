'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HotelAdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'exam' | 'career'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service" className="text-rose-600 hover:text-rose-800 font-medium">
            ← 서비스 분야
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">🛎️</span>
            <div>
              <h1 className="text-4xl font-bold">호텔관리사</h1>
              <p className="text-rose-100 text-lg">Hotel Administrator</p>
            </div>
          </div>
          <p className="text-xl text-rose-100 max-w-2xl">
            호텔 현장 운영과 고객 서비스 관리 전문가를 양성하는 국가기술자격
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-rose-600 font-bold text-2xl">연 2회</p>
            <p className="text-gray-500 text-sm">시험 횟수</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-rose-600 font-bold text-2xl">45%</p>
            <p className="text-gray-500 text-sm">평균 합격률</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-rose-600 font-bold text-2xl">19,400원</p>
            <p className="text-gray-500 text-sm">필기 응시료</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-rose-600 font-bold text-2xl">한국산업인력공단</p>
            <p className="text-gray-500 text-sm">시행기관</p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 rounded-xl font-bold transition ${activeTab === 'overview' ? 'bg-rose-600 text-white' : 'text-gray-600 hover:bg-rose-50'}`}
          >
            📋 자격 개요
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`flex-1 py-3 rounded-xl font-bold transition ${activeTab === 'exam' ? 'bg-rose-600 text-white' : 'text-gray-600 hover:bg-rose-50'}`}
          >
            📝 시험 정보
          </button>
          <button
            onClick={() => setActiveTab('career')}
            className={`flex-1 py-3 rounded-xl font-bold transition ${activeTab === 'career' ? 'bg-rose-600 text-white' : 'text-gray-600 hover:bg-rose-50'}`}
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
              <h2 className="text-xl font-bold text-gray-800 mb-4">🛎️ 호텔관리사란?</h2>
              <p className="text-gray-600 leading-relaxed">
                호텔관리사는 호텔의 현장 운영 및 고객 서비스를 담당하는 실무 전문가입니다.
                프런트 오피스, 하우스키핑, 식음료 서비스 등 호텔 각 부문의 업무를 수행하며,
                고객 만족과 효율적인 호텔 운영에 기여합니다.
              </p>
            </div>

            {/* 호텔경영사와의 차이 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📊 호텔경영사 vs 호텔관리사</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
                  <h3 className="font-bold text-amber-700 mb-2">호텔경영사</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 경영 전략 및 관리 중심</li>
                    <li>• 재무, 마케팅, 인사 관리</li>
                    <li>• 관리자/임원급 포지션</li>
                    <li>• 난이도 상대적으로 높음</li>
                  </ul>
                </div>
                <div className="p-4 bg-rose-50 rounded-xl border-2 border-rose-200">
                  <h3 className="font-bold text-rose-700 mb-2">호텔관리사</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 현장 운영 및 서비스 중심</li>
                    <li>• 프런트, 하우스키핑, F&B</li>
                    <li>• 실무자/팀장급 포지션</li>
                    <li>• 실무 중심 평가</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 응시 자격 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📌 응시 자격</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-rose-50 rounded-xl">
                  <span className="text-rose-600 font-bold">1</span>
                  <p className="text-gray-700">제한 없음 (누구나 응시 가능)</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-rose-50 rounded-xl">
                  <span className="text-rose-600 font-bold">※</span>
                  <p className="text-gray-700">호텔서비스사 취득 후 응시 시 일부 과목 면제 가능</p>
                </div>
              </div>
            </div>

            {/* 주요 업무 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💼 주요 업무</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-pink-50 rounded-xl">
                  <h3 className="font-bold text-pink-700 mb-2">프런트 오피스</h3>
                  <p className="text-sm text-gray-600">체크인/아웃, 예약 관리, 고객 응대, 컨시어지 서비스</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-xl">
                  <h3 className="font-bold text-pink-700 mb-2">하우스키핑</h3>
                  <p className="text-sm text-gray-600">객실 청소, 린넨 관리, 품질 점검, 분실물 처리</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-xl">
                  <h3 className="font-bold text-pink-700 mb-2">식음료 서비스</h3>
                  <p className="text-sm text-gray-600">레스토랑 서빙, 연회 진행, 룸서비스, 바 운영</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-xl">
                  <h3 className="font-bold text-pink-700 mb-2">고객 관리</h3>
                  <p className="text-sm text-gray-600">VIP 응대, 불만 처리, 고객 피드백 관리</p>
                </div>
              </div>
            </div>

            {/* 취득 혜택 */}
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 자격 취득 혜택</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">✓</span>
                  <div>
                    <p className="font-medium">호텔 취업 시 우대</p>
                    <p className="text-rose-100 text-sm">국내외 호텔 채용 가산점</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">✓</span>
                  <div>
                    <p className="font-medium">실무 능력 인증</p>
                    <p className="text-rose-100 text-sm">호텔 현장 업무 수행 능력 검증</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">✓</span>
                  <div>
                    <p className="font-medium">경력 개발 기반</p>
                    <p className="text-rose-100 text-sm">호텔경영사 취득을 위한 디딤돌</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">✓</span>
                  <div>
                    <p className="font-medium">서비스업 전반 활용</p>
                    <p className="text-rose-100 text-sm">리조트, 크루즈, 항공 등 서비스업 취업</p>
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
                <div className="border-2 border-rose-200 rounded-xl p-4">
                  <h3 className="font-bold text-rose-700 text-lg mb-3">1차 필기시험</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between"><span>문항 수</span><span className="font-medium">60문항</span></li>
                    <li className="flex justify-between"><span>시험 시간</span><span className="font-medium">60분</span></li>
                    <li className="flex justify-between"><span>문제 유형</span><span className="font-medium">객관식 4지선다</span></li>
                    <li className="flex justify-between"><span>합격 기준</span><span className="font-medium">100점 만점 60점 이상</span></li>
                  </ul>
                </div>
                <div className="border-2 border-pink-200 rounded-xl p-4">
                  <h3 className="font-bold text-pink-700 text-lg mb-3">2차 실기시험</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between"><span>시험 유형</span><span className="font-medium">필답형</span></li>
                    <li className="flex justify-between"><span>시험 시간</span><span className="font-medium">2시간 30분</span></li>
                    <li className="flex justify-between"><span>출제 범위</span><span className="font-medium">호텔관리 실무</span></li>
                    <li className="flex justify-between"><span>합격 기준</span><span className="font-medium">60점 이상</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 필기 과목 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필기시험 과목</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-xl">
                  <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">호텔실무론</h3>
                    <p className="text-sm text-gray-500">프런트, 하우스키핑, F&B 기초 이론</p>
                  </div>
                  <span className="px-3 py-1 bg-rose-200 text-rose-800 rounded-full text-sm font-medium">20문항</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-xl">
                  <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">고객서비스론</h3>
                    <p className="text-sm text-gray-500">서비스 마인드, 고객 응대, 불만 처리</p>
                  </div>
                  <span className="px-3 py-1 bg-rose-200 text-rose-800 rounded-full text-sm font-medium">20문항</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-xl">
                  <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">호텔영어</h3>
                    <p className="text-sm text-gray-500">예약, 체크인/아웃, 안내 영어 표현</p>
                  </div>
                  <span className="px-3 py-1 bg-rose-200 text-rose-800 rounded-full text-sm font-medium">20문항</span>
                </div>
              </div>
            </div>

            {/* 시험 상세 링크 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <Link href="/category/service/hotel-admin/exam" className="block w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-center rounded-xl font-bold text-lg hover:from-rose-700 hover:to-pink-700 transition">
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
                <div className="p-4 border-2 border-rose-200 rounded-xl">
                  <h3 className="font-bold text-rose-700 mb-2">호텔 프런트</h3>
                  <p className="text-sm text-gray-600">프런트 데스크, 컨시어지, 예약 담당</p>
                </div>
                <div className="p-4 border-2 border-rose-200 rounded-xl">
                  <h3 className="font-bold text-rose-700 mb-2">객실 관리</h3>
                  <p className="text-sm text-gray-600">하우스키핑, 객실 점검, 린넨룸</p>
                </div>
                <div className="p-4 border-2 border-rose-200 rounded-xl">
                  <h3 className="font-bold text-rose-700 mb-2">식음료 부서</h3>
                  <p className="text-sm text-gray-600">레스토랑, 바, 연회, 룸서비스</p>
                </div>
                <div className="p-4 border-2 border-rose-200 rounded-xl">
                  <h3 className="font-bold text-rose-700 mb-2">리조트·콘도</h3>
                  <p className="text-sm text-gray-600">휴양시설 프런트 및 서비스</p>
                </div>
                <div className="p-4 border-2 border-rose-200 rounded-xl">
                  <h3 className="font-bold text-rose-700 mb-2">크루즈·항공</h3>
                  <p className="text-sm text-gray-600">크루즈선 호텔부, 항공사 라운지</p>
                </div>
                <div className="p-4 border-2 border-rose-200 rounded-xl">
                  <h3 className="font-bold text-rose-700 mb-2">서비스 교육</h3>
                  <p className="text-sm text-gray-600">호텔 서비스 강사, 트레이너</p>
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
                    <div className="bg-rose-400 h-4 rounded-full" style={{width: '30%'}}></div>
                  </div>
                  <span className="font-bold text-gray-700">2,400~2,800만원</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-gray-500">경력 3~5년</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-rose-500 h-4 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <span className="font-bold text-gray-700">2,800~3,500만원</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-gray-500">팀장급</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-rose-600 h-4 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <span className="font-bold text-gray-700">3,500~4,500만원</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-gray-500">관리자급</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-pink-600 h-4 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <span className="font-bold text-gray-700">5,000만원 이상</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">※ 호텔 등급, 위치, 외국어 능력에 따라 상이</p>
            </div>

            {/* 전망 */}
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">📈 향후 전망</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  <p>관광산업 성장으로 호텔 인력 수요 지속 증가</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  <p>외국어 능력 보유 시 해외 호텔 취업 기회</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  <p>호텔경영사로 경력 발전 가능</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                  <p>서비스업 전반으로 이직 용이</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 학습 시작하기 */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 학습 시작하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/category/service/hotel-admin/study/front-office" className="py-4 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">프런트오피스</Link>
            <Link href="/category/service/hotel-admin/study/housekeeping" className="py-4 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">하우스키핑</Link>
            <Link href="/category/service/hotel-admin/study/fb-service" className="py-4 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">F&B서비스</Link>
            <Link href="/category/service/hotel-admin/study/hotel-english" className="py-4 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">호텔영어</Link>
            <Link href="/category/service/hotel-admin/study/practical" className="py-4 px-4 bg-pink-100 text-pink-700 rounded-xl text-center font-medium hover:bg-pink-200 transition">실기시험</Link>
            <Link href="/category/service/hotel-admin/exam" className="py-4 px-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl text-center font-medium hover:from-rose-700 hover:to-pink-700 transition">시험 안내 →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
