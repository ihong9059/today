'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GTQExamPage() {
  const [activeTab, setActiveTab] = useState<'grade1' | 'grade2'>('grade1');

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
            <Link href="/category/design/gtq" className="text-fuchsia-600 hover:text-fuchsia-800">GTQ</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">시험 정보</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">GTQ 시험 정보</h1>
          <p className="text-fuchsia-100 max-w-2xl mx-auto">
            그래픽기술자격 시험의 상세한 정보를 확인하세요
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex w-full md:w-auto">
          <button
            onClick={() => setActiveTab('grade1')}
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'grade1'
                ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            1급
          </button>
          <button
            onClick={() => setActiveTab('grade2')}
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'grade2'
                ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            2급
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'grade1' ? (
          <div className="space-y-8">
            {/* 1급 Overview */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-fuchsia-100">
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-block bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold">1급</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">GTQ 1급 시험 개요</h2>
                  <p className="text-gray-500">전문가 수준의 포토샵 활용 능력 평가</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "시험 시간", value: "90분", icon: "⏱️" },
                  { label: "문항 수", value: "4문항", icon: "📝" },
                  { label: "합격 기준", value: "70점 이상", icon: "✅" },
                  { label: "응시료", value: "25,000원", icon: "💰" }
                ].map((item, index) => (
                  <div key={index} className="bg-fuchsia-50 rounded-2xl p-4 text-center">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="font-bold text-fuchsia-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 1급 문항별 상세 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-fuchsia-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-fuchsia-100 rounded-xl flex items-center justify-center">📋</span>
                문항별 출제 내용 (1급)
              </h3>
              <div className="space-y-4">
                {[
                  {
                    num: 1,
                    title: "고급 툴 활용",
                    score: 25,
                    time: "약 20분",
                    skills: ["펜 도구 활용", "패스 편집", "브러시 커스터마이징", "클리핑 마스크"]
                  },
                  {
                    num: 2,
                    title: "사진 편집",
                    score: 25,
                    time: "약 20분",
                    skills: ["고급 색상 보정", "HDR 효과", "피부 보정", "배경 제거"]
                  },
                  {
                    num: 3,
                    title: "이미지 합성",
                    score: 25,
                    time: "약 25분",
                    skills: ["레이어 마스크 합성", "블렌딩 모드", "그림자/반사 효과", "원근 왜곡"]
                  },
                  {
                    num: 4,
                    title: "포스터 제작",
                    score: 25,
                    time: "약 25분",
                    skills: ["레이아웃 구성", "타이포그래피", "필터 효과", "최종 출력물 완성"]
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-fuchsia-50 to-pink-50 rounded-2xl p-6 border border-fuchsia-100">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="w-10 h-10 bg-fuchsia-500 text-white rounded-full flex items-center justify-center font-bold">
                        {item.num}
                      </span>
                      <h4 className="font-bold text-gray-800 text-lg">{item.title}</h4>
                      <span className="bg-fuchsia-200 text-fuchsia-800 px-3 py-1 rounded-full text-sm font-medium">
                        {item.score}점
                      </span>
                      <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm">
                        {item.time}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <span key={i} className="bg-white px-3 py-1 rounded-lg text-sm text-gray-600 border border-fuchsia-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 1급 핵심 스킬 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-fuchsia-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">🎯</span>
                1급 필수 스킬
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { skill: "레이어 마스크", level: "필수", desc: "비파괴 편집의 핵심" },
                  { skill: "펜 도구", level: "필수", desc: "정밀한 선택 영역 생성" },
                  { skill: "블렌딩 모드", level: "필수", desc: "자연스러운 합성" },
                  { skill: "커브/레벨", level: "고급", desc: "전문적인 색상 보정" },
                  { skill: "스마트 오브젝트", level: "고급", desc: "비파괴 변형 작업" },
                  { skill: "액션/자동화", level: "선택", desc: "작업 효율성 향상" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{item.skill}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.level === '필수' ? 'bg-fuchsia-100 text-fuchsia-700' :
                        item.level === '고급' ? 'bg-pink-100 text-pink-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {item.level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 2급 Overview */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-fuchsia-100">
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-block bg-gray-300 text-gray-700 px-4 py-2 rounded-full font-bold">2급</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">GTQ 2급 시험 개요</h2>
                  <p className="text-gray-500">실무 기초 수준의 포토샵 활용 능력 평가</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "시험 시간", value: "90분", icon: "⏱️" },
                  { label: "문항 수", value: "4문항", icon: "📝" },
                  { label: "합격 기준", value: "60점 이상", icon: "✅" },
                  { label: "응시료", value: "22,000원", icon: "💰" }
                ].map((item, index) => (
                  <div key={index} className="bg-fuchsia-50 rounded-2xl p-4 text-center">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="font-bold text-fuchsia-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2급 문항별 상세 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-fuchsia-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-fuchsia-100 rounded-xl flex items-center justify-center">📋</span>
                문항별 출제 내용 (2급)
              </h3>
              <div className="space-y-4">
                {[
                  {
                    num: 1,
                    title: "기본 툴 활용",
                    score: 25,
                    time: "약 20분",
                    skills: ["선택 도구", "이동/변형", "자르기 도구", "기본 브러시"]
                  },
                  {
                    num: 2,
                    title: "기초 편집",
                    score: 25,
                    time: "약 20분",
                    skills: ["기본 색상 보정", "밝기/대비", "색조/채도", "크기 조절"]
                  },
                  {
                    num: 3,
                    title: "레이어 활용",
                    score: 25,
                    time: "약 25분",
                    skills: ["레이어 생성/삭제", "레이어 순서", "투명도 조절", "레이어 스타일"]
                  },
                  {
                    num: 4,
                    title: "간단한 합성",
                    score: 25,
                    time: "약 25분",
                    skills: ["이미지 배치", "텍스트 입력", "기본 효과", "최종 저장"]
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-fuchsia-50 to-pink-50 rounded-2xl p-6 border border-fuchsia-100">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center font-bold">
                        {item.num}
                      </span>
                      <h4 className="font-bold text-gray-800 text-lg">{item.title}</h4>
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.score}점
                      </span>
                      <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm">
                        {item.time}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <span key={i} className="bg-white px-3 py-1 rounded-lg text-sm text-gray-600 border border-fuchsia-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2급 핵심 스킬 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-fuchsia-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">🎯</span>
                2급 필수 스킬
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { skill: "선택 도구", level: "필수", desc: "사각형, 원형, 올가미 선택" },
                  { skill: "레이어 기본", level: "필수", desc: "레이어 개념과 활용" },
                  { skill: "텍스트 도구", level: "필수", desc: "문자 입력과 편집" },
                  { skill: "색상 도구", level: "기본", desc: "전경색/배경색 활용" },
                  { skill: "변형 도구", level: "기본", desc: "크기 조절, 회전" },
                  { skill: "저장 형식", level: "기본", desc: "PSD, JPG, PNG 이해" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{item.skill}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.level === '필수' ? 'bg-fuchsia-100 text-fuchsia-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Common Info */}
        <div className="mt-8 space-y-8">
          {/* 시험 환경 */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-fuchsia-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">💻</span>
              시험 환경
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-700 mb-3">소프트웨어</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full"></span>
                    Adobe Photoshop CC (최신 버전)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full"></span>
                    한글 또는 영문 버전 선택 가능
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full"></span>
                    버전별 UI 차이 숙지 필요
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 mb-3">제출 형식</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                    PSD(원본) + JPG(결과물) 제출
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                    지정된 파일명과 해상도 준수
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                    레이어 구조 유지 (PSD)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 접수 안내 */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-fuchsia-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">📝</span>
              접수 안내
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-fuchsia-50 rounded-2xl">
                <span className="text-3xl mb-3 block">🌐</span>
                <h4 className="font-bold text-gray-800 mb-2">온라인 접수</h4>
                <p className="text-sm text-gray-600">license.kpc.or.kr</p>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-2xl">
                <span className="text-3xl mb-3 block">📸</span>
                <h4 className="font-bold text-gray-800 mb-2">필요 서류</h4>
                <p className="text-sm text-gray-600">증명사진 1매 (6개월 이내)</p>
              </div>
              <div className="text-center p-4 bg-rose-50 rounded-2xl">
                <span className="text-3xl mb-3 block">🆔</span>
                <h4 className="font-bold text-gray-800 mb-2">신분증</h4>
                <p className="text-sm text-gray-600">시험 당일 지참 필수</p>
              </div>
            </div>
          </div>

          {/* 합격 전략 */}
          <div className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">🏆</span>
              합격 전략
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "단축키 암기", desc: "작업 속도 2배 향상" },
                { title: "시간 분배", desc: "문항당 20~25분 배정" },
                { title: "기출 반복", desc: "유형별 최소 5회 연습" },
                { title: "저장 습관", desc: "작업 중 수시 저장" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-fuchsia-100">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/category/design/gtq"
            className="inline-flex items-center gap-2 text-fuchsia-600 hover:text-fuchsia-800 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            GTQ 메인으로 돌아가기
          </Link>
        </div>
      </section>
    </div>
  );
}
