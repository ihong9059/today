'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LifelongEducatorExamPage() {
  const [activeTab, setActiveTab] = useState<'required' | 'elective' | 'practice'>('required');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-indigo-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/lifelong-educator" className="text-gray-600 hover:text-indigo-600">평생교육사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">자격정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">📚</span>
            <div>
              <h1 className="text-2xl font-bold">평생교육사 자격정보</h1>
              <p className="text-indigo-100">Lifelong Educator Certificate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('required')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'required'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📚 필수과목
          </button>
          <button
            onClick={() => setActiveTab('elective')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'elective'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📖 선택과목
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'practice'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🎯 실습
          </button>
        </div>

        {activeTab === 'required' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필수과목 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">이수 방법</p>
                  <p className="font-medium text-gray-800">대학 수업 또는 학점은행제</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">과목 수</p>
                  <p className="font-medium text-gray-800">5과목 (각 3학점)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">총 학점</p>
                  <p className="font-medium text-gray-800">15학점</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">평가 방식</p>
                  <p className="font-medium text-gray-800">출석, 과제, 시험 (학교별 상이)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필수과목 상세</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <p className="font-medium text-gray-800">평생교육론</p>
                      <p className="text-sm text-gray-500">평생교육의 철학, 역사, 제도 및 정책</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">3학점</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎓</span>
                    <div>
                      <p className="font-medium text-gray-800">평생교육방법론</p>
                      <p className="text-sm text-gray-500">교수학습 이론, 방법, 매체 활용 전략</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">3학점</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-medium text-gray-800">평생교육경영론</p>
                      <p className="text-sm text-gray-500">평생교육기관 운영, 인적자원 관리</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">3학점</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <p className="font-medium text-gray-800">평생교육프로그램개발론</p>
                      <p className="text-sm text-gray-500">프로그램 요구분석, 설계, 실행, 평가</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">3학점</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-medium text-gray-800">성인학습및상담</p>
                      <p className="text-sm text-gray-500">성인학습자 특성, 학습이론, 상담기법</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">3학점</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 필수과목 학습 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">평생교육론부터 시작하여 전체적인 개념을 먼저 이해하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">각 과목별 주요 학자와 이론을 정리하여 체계적으로 학습하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">실제 평생교육 사례를 찾아보며 이론과 실무를 연결하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">평생교육법과 관련 정책을 숙지하세요.</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'elective' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📖 선택과목 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">이수 학점</p>
                  <p className="font-medium text-gray-800">18학점 이상</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">선택 방법</p>
                  <p className="font-medium text-gray-800">관련 과목 중 자유 선택</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">과목당 학점</p>
                  <p className="font-medium text-gray-800">보통 3학점</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">이수 기간</p>
                  <p className="font-medium text-gray-800">학교별 상이 (보통 2-3학기)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 선택과목 목록 (예시)</h2>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">아동교육론</p>
                  <p className="text-sm text-gray-600">아동 발달과 교육 이론</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">청소년교육론</p>
                  <p className="text-sm text-gray-600">청소년 특성과 교육 방법</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">여성교육론</p>
                  <p className="text-sm text-gray-600">여성 평생교육의 이해</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">노인교육론</p>
                  <p className="text-sm text-gray-600">고령사회와 노인학습</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">시민교육론</p>
                  <p className="text-sm text-gray-600">민주시민 역량 교육</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">문해교육론</p>
                  <p className="text-sm text-gray-600">문자해득 및 기초교육</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">인적자원개발론</p>
                  <p className="text-sm text-gray-600">기업 교육 및 HRD</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">직업·진로설계</p>
                  <p className="text-sm text-gray-600">진로상담 및 코칭</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">원격교육론</p>
                  <p className="text-sm text-gray-600">이러닝 및 온라인 교육</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">교육사회학</p>
                  <p className="text-sm text-gray-600">교육과 사회의 관계</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">교육심리학</p>
                  <p className="text-sm text-gray-600">학습심리와 동기이론</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">교육공학</p>
                  <p className="text-sm text-gray-600">교육매체 및 테크놀로지</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 선택과목 이수 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">본인이 관심 있는 교육 분야(아동, 청소년, 노인 등)를 중심으로 선택하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">취업 희망 분야에 따라 인적자원개발, 원격교육 등을 전략적으로 이수하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">교육심리학, 교육사회학 등 기초 이론 과목도 균형있게 이수하세요.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 현장실습 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">실습 기간</p>
                  <p className="font-medium text-gray-800">4주 (160시간)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">실습 장소</p>
                  <p className="font-medium text-gray-800">평생교육 관련 기관</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">이수 시기</p>
                  <p className="font-medium text-gray-800">필수과목 이수 후</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">평가 방식</p>
                  <p className="font-medium text-gray-800">실습일지, 보고서, 기관평가</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 실습 가능 기관</h2>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">평생학습관·평생교육원</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 지역 평생학습관 (구청, 문화센터 등)</li>
                    <li>• 대학 부설 평생교육원</li>
                    <li>• 시민대학, 주민자치센터</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">직업훈련기관</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 고용노동부 인정 직업훈련기관</li>
                    <li>• 기업 교육센터</li>
                    <li>• 폴리텍대학, 기능대학</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">사회복지·문화시설</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 사회복지관 교육 프로그램</li>
                    <li>• 청소년수련관, 노인복지관</li>
                    <li>• 도서관, 박물관 평생학습 프로그램</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 실습 내용</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">프로그램 기획 참여</p>
                  <p className="text-sm text-gray-600">요구조사, 프로그램 설계 보조</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">수업 참관 및 보조</p>
                  <p className="text-sm text-gray-600">강의 참관, 교수자료 준비, 학습자 지원</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">행정 업무 지원</p>
                  <p className="text-sm text-gray-600">수강생 관리, 홍보물 제작, 시설 운영</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">평가 및 보고</p>
                  <p className="text-sm text-gray-600">프로그램 평가, 실습일지 작성, 최종보고서</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실습 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">실습 3개월 전부터 실습기관을 알아보고 신청하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">실습 전 해당 기관의 프로그램과 운영방식을 미리 파악하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">실습일지는 매일 성실하게 작성하고 지도교수 피드백을 받으세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">실습 기관과의 네트워크를 구축하여 취업 기회로 연결하세요.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
