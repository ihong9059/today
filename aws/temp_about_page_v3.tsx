'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Brain, Briefcase, Users, GraduationCap, CheckCircle, ArrowRight, Sparkles, BookOpen, Zap, Target, Clock, Award, Play } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">AI 시대, 새로운 진로교육</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI 기반 진로교육 시스템
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            AI와 함께 다양한 직업을 <span className="text-yellow-400 font-semibold">간접 경험</span>하고,<br />
            나에게 맞는 진로를 찾아 <span className="text-green-400 font-semibold">실무 역량</span>까지 갖추세요!
          </p>

          {/* 큰 강좌 목록 버튼 */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <BookOpen className="w-7 h-7" />
            강좌 목록 바로가기
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </section>

      {/* 소개 동영상 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4">
              <Play className="w-5 h-5" />
              <span className="font-semibold">소개 영상</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI 기반 진로교육이란?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              영상을 통해 UTTEC Edu의 교육 철학과 방향을 확인해보세요
            </p>
          </div>

          {/* 동영상 플레이어 */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
            <video
              controls
              className="w-full aspect-video"
              poster="/video-poster.jpg"
              preload="metadata"
            >
              <source src="/edu_advertizing.mp4" type="video/mp4" />
              브라우저가 동영상을 지원하지 않습니다.
            </video>
          </div>

          {/* 동영상 하단 안내 */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              * 추후 YouTube 채널에서도 시청하실 수 있습니다
            </p>
          </div>
        </div>
      </section>

      {/* 교육 필요성 섹션 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">왜 AI 기반 진로교육인가?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              AI 시대, 직업의 70%가 10년 내 변화가 예상됩니다.<br />
              단순 지식보다 <strong>AI 활용 능력</strong>이 핵심 경쟁력입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 현재의 문제점 */}
            <div className="bg-red-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-2">
                ❌ 현재의 문제점
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm">1</span>
                  </span>
                  <span className="text-gray-700">다양한 분야와 세분화된 직업군으로 <strong>선택의 어려움</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm">2</span>
                  </span>
                  <span className="text-gray-700">직접 경험의 기회를 갖기 어려움 (인턴 경쟁률 상승)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm">3</span>
                  </span>
                  <span className="text-gray-700">사회 변화 속도가 빨라 <strong>판단할 시간적 여유 부족</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm">4</span>
                  </span>
                  <span className="text-gray-700">잘못된 진로 선택 시 시간과 비용 낭비</span>
                </li>
              </ul>
            </div>

            {/* AI가 제공하는 해결책 */}
            <div className="bg-green-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center gap-2">
                ✅ AI가 제공하는 해결책
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>간접 경험:</strong> 실제 업무를 AI와 함께 시뮬레이션</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>빠른 탐색:</strong> 여러 분야를 단기간에 체험 가능</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>맞춤형 학습:</strong> 개인 성향에 맞는 진로 추천</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>즉시 활용:</strong> 수료 후 바로 쓸 수 있는 포트폴리오</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 교육 목표 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">교육 목표</h2>
            <p className="text-gray-600">세 가지 핵심 역량을 키워드립니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl text-center">
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI 활용 능력 습득</h3>
              <p className="text-gray-600">
                어떤 분야에서든 AI를 도구로 활용하는 능력을 갖춥니다.
                ChatGPT, Claude, Copilot 등 다양한 AI 도구를 익힙니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">진로 간접 경험</h3>
              <p className="text-gray-600">
                AI와 함께 다양한 직업을 미리 체험합니다.
                코딩, 교육, 디자인 등 여러 분야를 단기간에 탐색할 수 있습니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">실무 기초 역량</h3>
              <p className="text-gray-600">
                선택한 분야의 기초 지식과 실습을 통해
                취업에 바로 활용할 수 있는 포트폴리오를 완성합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 교육 대상 섹션 */}
      <section className="py-16 bg-gradient-to-r from-slate-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">교육 대상</h2>
            <p className="text-gray-600">누구나 AI 시대에 맞는 진로를 찾을 수 있습니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">학부형</h3>
                  <p className="text-gray-500 text-sm">자녀 진로 고민</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                자녀와 함께 진로를 탐색하고, AI 시대를 이해하며
                자녀의 적성에 맞는 진로 방향을 파악합니다.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-700 font-medium">
                  추천 트랙: 학부형 트랙 (AI 기초 + 진로 탐색)
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">사회 초년생</h3>
                  <p className="text-gray-500 text-sm">취업 준비 중</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                실무 역량을 강화하고 취업에 필요한
                포트폴리오를 확보합니다.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700 font-medium">
                  추천 트랙: 사회초년생 트랙 (AI 실무 + 포트폴리오)
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">진로 전환자</h3>
                  <p className="text-gray-500 text-sm">새로운 분야 도전</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                새로운 분야의 기초를 습득하고
                전환 가능성을 확인합니다.
              </p>
              <div className="bg-rose-50 rounded-lg p-4">
                <p className="text-sm text-rose-700 font-medium">
                  추천 트랙: 진로전환자 트랙 (분야 탐색 + 전환 준비)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 학습 단계 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">학습 단계</h2>
            <p className="text-gray-600">체계적인 5단계 학습 과정</p>
          </div>

          <div className="relative">
            {/* 연결선 */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-blue-200 to-green-200 -translate-y-1/2 z-0" />

            <div className="grid md:grid-cols-5 gap-6 relative z-10">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
                <h4 className="font-bold text-gray-900 mb-2">성향 파악</h4>
                <p className="text-gray-600 text-sm">MBTI/MMTIC 검사 → AI 분석 → 추천 직업군 도출</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-200 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
                <h4 className="font-bold text-gray-900 mb-2">탐색</h4>
                <p className="text-gray-600 text-sm">추천 직업군 3~5개 간략 체험 → 1개 선택</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-200 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
                <h4 className="font-bold text-gray-900 mb-2">집중 학습</h4>
                <p className="text-gray-600 text-sm">선택 분야 15일 과정 → AI와 함께 실무 시뮬레이션</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-200 text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">4</div>
                <h4 className="font-bold text-gray-900 mb-2">결과물 제작</h4>
                <p className="text-gray-600 text-sm">포트폴리오 완성 → 실제 활용 가능한 결과물</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-rose-200 text-center">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">5</div>
                <h4 className="font-bold text-gray-900 mb-2">진로 결정</h4>
                <p className="text-gray-600 text-sm">만족 시 → 중급/고급 진행 또는 다른 트랙 체험</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 과정 안내 */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">교육 과정 안내</h2>
            <p className="text-blue-200">단계별 학습으로 성장하세요</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center text-white">
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">초급 과정</h3>
              <p className="text-3xl font-bold mb-2">15일</p>
              <p className="text-blue-200 text-sm mb-4">하루 1~2시간</p>
              <p className="text-green-400 font-semibold">무료 체험 가능</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center text-white">
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">중급 과정</h3>
              <p className="text-3xl font-bold mb-2">30일</p>
              <p className="text-blue-200 text-sm mb-4">하루 2시간</p>
              <p className="text-blue-200">심화 학습</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center text-white">
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">고급 과정</h3>
              <p className="text-3xl font-bold mb-2">60일</p>
              <p className="text-blue-200 text-sm mb-4">하루 2~3시간</p>
              <p className="text-blue-200">전문가 양성</p>
            </div>
          </div>
        </div>
      </section>

      {/* 차별화 전략 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">기존 서비스와의 차이점</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">구분</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-500">기존 서비스</th>
                  <th className="px-6 py-4 text-left font-semibold text-blue-600">UTTEC Edu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">방식</td>
                  <td className="px-6 py-4 text-gray-500">적성검사 → 직업 추천</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">적성검사 + AI 실무 체험</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">결과</td>
                  <td className="px-6 py-4 text-gray-500">직업 목록 제공</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">실제 업무 경험 + 포트폴리오</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">AI 활용</td>
                  <td className="px-6 py-4 text-gray-500">제한적</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">전 과정 AI 협업</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">기간</td>
                  <td className="px-6 py-4 text-gray-500">1회성 검사</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">15일 집중 과정</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-rose-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 시작하세요!
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            MBTI 검사로 나에게 맞는 진로를 찾아보세요
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/mbti"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition shadow-lg"
            >
              <Brain className="w-6 h-6" />
              MBTI 검사 시작
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-lg"
            >
              <BookOpen className="w-6 h-6" />
              강좌 둘러보기
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
