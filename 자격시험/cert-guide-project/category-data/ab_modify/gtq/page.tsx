'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GTQPage() {
  const [showAIModal, setShowAIModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-fuchsia-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-fuchsia-600 hover:text-fuchsia-800">홈</Link>
            <span className="text-gray-400">/</span>
            <Link href="/category/design" className="text-fuchsia-600 hover:text-fuchsia-800">디자인</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">GTQ(그래픽기술자격)</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500"></div>
        <div className="absolute inset-0 opacity-40" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              한국생산성본부 공인 민간자격
            </div>
            <h1 className="text-4xl lg:text-6xl font-black mb-4">
              GTQ
              <span className="block text-2xl lg:text-3xl font-medium mt-2 text-fuchsia-100">
                그래픽기술자격
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-fuchsia-100 mb-8 max-w-2xl mx-auto">
              포토샵 활용 능력을 검증하는 국가공인 그래픽 디자인 자격증
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/category/design/gtq/exam"
                className="inline-flex items-center justify-center gap-2 bg-white text-fuchsia-600 px-8 py-4 rounded-2xl font-bold hover:bg-fuchsia-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                시험 정보 보기
              </Link>
              <button
                onClick={() => setShowAIModal(true)}
                className="inline-flex items-center justify-center gap-2 bg-fuchsia-700/50 backdrop-blur text-white px-8 py-4 rounded-2xl font-bold hover:bg-fuchsia-700/70 transition-all border border-white/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                AI 학습 가이드
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "🖼️", label: "자격 종류", value: "국가공인 민간자격" },
            { icon: "📊", label: "등급 구분", value: "1급 / 2급" },
            { icon: "⏱️", label: "시험 시간", value: "90분" },
            { icon: "💰", label: "응시료", value: "1급 25,000원" }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-lg border border-fuchsia-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <p className="text-gray-500 text-sm">{item.label}</p>
              <p className="font-bold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certification Overview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">자격증 개요</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            GTQ(Graphic Technology Qualification)는 디자인 분야의 핵심 역량인 포토샵 활용 능력을 평가하는 자격증입니다
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-fuchsia-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-fuchsia-100 rounded-xl flex items-center justify-center">📋</span>
              GTQ란?
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong className="text-fuchsia-600">GTQ(Graphic Technology Qualification)</strong>는
                한국생산성본부에서 시행하는 국가공인 민간자격으로, Adobe Photoshop을 활용한
                그래픽 디자인 능력을 평가합니다.
              </p>
              <p>
                디자인 분야 취업 시 포트폴리오와 함께 실무 능력을 증명할 수 있는 대표적인 자격증으로,
                1급과 2급으로 구분되며, 실기 시험으로만 진행됩니다.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-fuchsia-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">🎯</span>
              활용 분야
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {["웹 디자인", "편집 디자인", "광고 디자인", "UI/UX 디자인", "영상 편집", "게임 그래픽", "브랜드 디자인", "포토 리터칭"].map((field, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {field}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grade Comparison */}
      <section className="bg-gradient-to-r from-fuchsia-500 to-rose-500 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">등급별 비교</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <span className="inline-block bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold mb-3">1급</span>
                <h3 className="text-2xl font-bold text-white">GTQ 1급</h3>
                <p className="text-fuchsia-100 mt-2">전문가 수준</p>
              </div>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-300 rounded-full"></span>
                  시험 시간: 90분
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-300 rounded-full"></span>
                  문항 수: 4문항
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-300 rounded-full"></span>
                  합격 기준: 70점 이상 (100점 만점)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-300 rounded-full"></span>
                  응시료: 25,000원
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-300 rounded-full"></span>
                  고급 합성, 필터, 색상 보정 등
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <span className="inline-block bg-gray-300 text-gray-700 px-4 py-1 rounded-full text-sm font-bold mb-3">2급</span>
                <h3 className="text-2xl font-bold text-white">GTQ 2급</h3>
                <p className="text-fuchsia-100 mt-2">실무 기초 수준</p>
              </div>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-300 rounded-full"></span>
                  시험 시간: 90분
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-300 rounded-full"></span>
                  문항 수: 4문항
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-300 rounded-full"></span>
                  합격 기준: 60점 이상 (100점 만점)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-300 rounded-full"></span>
                  응시료: 22,000원
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-300 rounded-full"></span>
                  기본 편집, 레이어, 선택 도구 등
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Study Topics */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">학습 과목</h2>
          <p className="text-gray-600">포토샵의 핵심 기능을 체계적으로 학습하세요</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "포토샵 도구",
              desc: "선택, 브러시, 이동 등 기본 도구 활용법",
              icon: "🔧",
              href: "/category/design/gtq/study/ps-tools",
              color: "from-fuchsia-500 to-pink-500"
            },
            {
              title: "이미지 편집",
              desc: "색상 보정, 레이어, 마스크 활용",
              icon: "🎨",
              href: "/category/design/gtq/study/ps-editing",
              color: "from-pink-500 to-rose-500"
            },
            {
              title: "이미지 합성",
              desc: "다양한 합성 기법과 필터 효과",
              icon: "🖼️",
              href: "/category/design/gtq/study/ps-composite",
              color: "from-rose-500 to-red-500"
            },
            {
              title: "실기 유형",
              desc: "실제 시험 유형별 문제 풀이",
              icon: "📝",
              href: "/category/design/gtq/study/gtq-practical",
              color: "from-purple-500 to-fuchsia-500"
            }
          ].map((subject, index) => (
            <Link
              key={index}
              href={subject.href}
              className="group bg-white rounded-2xl p-6 shadow-lg border border-fuchsia-100 hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${subject.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {subject.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{subject.title}</h3>
              <p className="text-sm text-gray-500">{subject.desc}</p>
              <div className="mt-4 flex items-center text-fuchsia-600 text-sm font-medium">
                학습하기
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Study Order */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">추천 학습 순서</h2>
            <p className="text-gray-600">효율적인 GTQ 준비를 위한 단계별 학습 가이드</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: 1, title: "포토샵 기초", desc: "인터페이스와 기본 도구 익히기", duration: "1~2주" },
              { step: 2, title: "이미지 편집", desc: "색상 보정, 레이어 활용", duration: "2~3주" },
              { step: 3, title: "합성 기법", desc: "마스크, 필터, 효과 학습", duration: "2~3주" },
              { step: 4, title: "기출 연습", desc: "실전 문제 풀이 및 시간 관리", duration: "2주" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-fuchsia-100 h-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
                  <span className="text-xs bg-fuchsia-100 text-fuchsia-700 px-2 py-1 rounded-full">{item.duration}</span>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-4 text-fuchsia-400 -translate-y-1/2">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Schedule */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">시험 일정</h2>
          <p className="text-gray-600">GTQ는 연간 12회 이상 정기 시험이 시행됩니다</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-fuchsia-100">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-fuchsia-100 rounded-lg flex items-center justify-center text-fuchsia-600">📅</span>
                정기시험
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full"></span>
                  월 1회 이상 전국 CBT 센터에서 시행
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full"></span>
                  시험 접수: 시험일 2주 전까지
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full"></span>
                  합격 발표: 시험 후 2주 이내
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600">🏫</span>
                상시시험
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
                  상시 운영 시험장에서 수시 응시 가능
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
                  원하는 날짜와 시간 선택 가능
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
                  결과 즉시 확인 가능
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-gradient-to-br from-fuchsia-50 to-pink-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">합격 팁</h2>
            <p className="text-gray-600">GTQ 시험 합격을 위한 핵심 전략</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "⏰",
                title: "시간 관리",
                tips: ["4문항 90분, 문항당 약 22분", "어려운 문항은 나중에 해결", "마지막 5분은 저장 확인"]
              },
              {
                icon: "🎯",
                title: "핵심 기능 숙달",
                tips: ["레이어 마스크 완벽 이해", "색상 보정 도구 숙달", "단축키 암기 필수"]
              },
              {
                icon: "📐",
                title: "정확도 향상",
                tips: ["가이드와 룰러 적극 활용", "출력 사이즈 정확히 맞추기", "파일 형식과 해상도 확인"]
              }
            ].map((tip, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-fuchsia-100">
                <span className="text-3xl mb-4 block">{tip.icon}</span>
                <h3 className="font-bold text-gray-800 mb-4">{tip.title}</h3>
                <ul className="space-y-2">
                  {tip.tips.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-fuchsia-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">취득 후 혜택</h2>
          <p className="text-gray-600">GTQ 자격증 취득 시 받을 수 있는 다양한 혜택</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🏢", title: "취업 우대", desc: "디자인 관련 기업 채용 시 우대" },
            { icon: "🎓", title: "대학 학점 인정", desc: "일부 대학 학점 인정" },
            { icon: "📊", title: "실무 능력 인증", desc: "포토샵 실무 능력 공식 인증" },
            { icon: "🔗", title: "자격증 연계", desc: "GTQi, 웹디자인기능사 등 연계" }
          ].map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-md border border-fuchsia-100 hover:shadow-lg transition-all">
              <span className="text-4xl mb-4 block">{benefit.icon}</span>
              <h3 className="font-bold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-500">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Certifications */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">관련 자격증</h2>
            <p className="text-gray-600">GTQ와 함께 취득하면 좋은 자격증</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "GTQi (일러스트)", desc: "일러스트레이터 활용 자격", href: "/category/design/gtqi" },
              { name: "웹디자인기능사", desc: "웹 디자인 국가기술자격", href: "/category/design/web-design" },
              { name: "컴퓨터그래픽스운용기능사", desc: "그래픽 디자인 국가기술자격", href: "/category/design/computer-graphics" }
            ].map((cert, index) => (
              <Link
                key={index}
                href={cert.href}
                className="bg-white rounded-2xl p-6 shadow-md border border-fuchsia-100 hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-fuchsia-600 transition-colors">{cert.name}</h3>
                <p className="text-sm text-gray-500">{cert.desc}</p>
                <div className="mt-4 flex items-center text-fuchsia-600 text-sm font-medium">
                  자세히 보기
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 rounded-3xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">지금 바로 GTQ 학습을 시작하세요!</h2>
          <p className="text-fuchsia-100 mb-8 max-w-2xl mx-auto">
            체계적인 학습 자료와 실전 문제로 GTQ 1급 합격을 목표로 도전해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/category/design/gtq/study/ps-tools"
              className="inline-flex items-center justify-center gap-2 bg-white text-fuchsia-600 px-8 py-4 rounded-2xl font-bold hover:bg-fuchsia-50 transition-all"
            >
              학습 시작하기
            </Link>
            <Link
              href="/category/design/gtq/exam"
              className="inline-flex items-center justify-center gap-2 bg-fuchsia-700/50 text-white px-8 py-4 rounded-2xl font-bold hover:bg-fuchsia-700/70 transition-all border border-white/20"
            >
              시험 정보 확인
            </Link>
          </div>
        </div>
      </section>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAIModal(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">AI 학습 가이드</h3>
              <button onClick={() => setShowAIModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-fuchsia-50 rounded-2xl p-6">
                <h4 className="font-bold text-fuchsia-800 mb-3">📚 GTQ 1급 학습 전략</h4>
                <ul className="space-y-2 text-fuchsia-700">
                  <li>• <strong>1단계:</strong> 포토샵 인터페이스와 기본 도구 숙지</li>
                  <li>• <strong>2단계:</strong> 레이어, 마스크, 블렌딩 모드 이해</li>
                  <li>• <strong>3단계:</strong> 색상 보정과 필터 효과 학습</li>
                  <li>• <strong>4단계:</strong> 기출 유형별 반복 실습</li>
                </ul>
              </div>
              <div className="bg-pink-50 rounded-2xl p-6">
                <h4 className="font-bold text-pink-800 mb-3">⏰ 학습 시간 배분</h4>
                <ul className="space-y-2 text-pink-700">
                  <li>• 하루 2시간 기준, 약 4~6주 학습 권장</li>
                  <li>• 기초 도구 학습: 1주</li>
                  <li>• 편집/합성 기법: 2~3주</li>
                  <li>• 실전 문제 풀이: 1~2주</li>
                </ul>
              </div>
              <div className="bg-rose-50 rounded-2xl p-6">
                <h4 className="font-bold text-rose-800 mb-3">🎯 출제 경향 분석</h4>
                <ul className="space-y-2 text-rose-700">
                  <li>• 1번 문항: 포스터/배너 디자인 (25점)</li>
                  <li>• 2번 문항: 이미지 합성 (25점)</li>
                  <li>• 3번 문항: 사진 보정 (25점)</li>
                  <li>• 4번 문항: 종합 디자인 (25점)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
