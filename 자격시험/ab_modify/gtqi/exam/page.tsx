'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GTQiExamPage() {
  const [activeTab, setActiveTab] = useState<'grade1' | 'grade2'>('grade1');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-orange-600 hover:text-orange-800">홈</Link>
            <span className="text-gray-400">/</span>
            <Link href="/category/design" className="text-orange-600 hover:text-orange-800">디자인</Link>
            <span className="text-gray-400">/</span>
            <Link href="/category/design/gtqi" className="text-orange-600 hover:text-orange-800">GTQi</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">시험 정보</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">GTQi 시험 정보</h1>
          <p className="text-orange-100 max-w-2xl mx-auto">
            그래픽기술자격 일러스트 시험의 상세한 정보를 확인하세요
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
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            1급
          </button>
          <button
            onClick={() => setActiveTab('grade2')}
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'grade2'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
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
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-block bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold">1급</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">GTQi 1급 시험 개요</h2>
                  <p className="text-gray-500">전문가 수준의 일러스트레이터 활용 능력 평가</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "시험 시간", value: "90분", icon: "⏱️" },
                  { label: "문항 수", value: "4문항", icon: "📝" },
                  { label: "합격 기준", value: "70점 이상", icon: "✅" },
                  { label: "응시료", value: "25,000원", icon: "💰" }
                ].map((item, index) => (
                  <div key={index} className="bg-orange-50 rounded-2xl p-4 text-center">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="font-bold text-orange-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 1급 문항별 상세 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">📋</span>
                문항별 출제 내용 (1급)
              </h3>
              <div className="space-y-4">
                {[
                  {
                    num: 1,
                    title: "고급 도형 활용",
                    score: 25,
                    time: "약 20분",
                    skills: ["패스파인더 고급", "복합 패스", "정렬/분포", "도형 변형"]
                  },
                  {
                    num: 2,
                    title: "펜 도구 응용",
                    score: 25,
                    time: "약 20분",
                    skills: ["복잡한 곡선", "앵커 포인트 편집", "패스 연결", "클리핑 마스크"]
                  },
                  {
                    num: 3,
                    title: "효과와 스타일",
                    score: 25,
                    time: "약 25분",
                    skills: ["그라디언트 메쉬", "블렌드", "3D 효과", "어피어런스"]
                  },
                  {
                    num: 4,
                    title: "종합 디자인",
                    score: 25,
                    time: "약 25분",
                    skills: ["레이아웃 구성", "심볼/패턴", "타이포그래피", "최종 출력물"]
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                        {item.num}
                      </span>
                      <h4 className="font-bold text-gray-800 text-lg">{item.title}</h4>
                      <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        {item.score}점
                      </span>
                      <span className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm">
                        {item.time}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <span key={i} className="bg-white px-3 py-1 rounded-lg text-sm text-gray-600 border border-orange-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 1급 핵심 스킬 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">🎯</span>
                1급 필수 스킬
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { skill: "펜 도구", level: "필수", desc: "정밀한 베지어 곡선 제어" },
                  { skill: "패스파인더", level: "필수", desc: "도형 결합/나누기/교차" },
                  { skill: "그라디언트", level: "필수", desc: "선형/방사형/메쉬 그라디언트" },
                  { skill: "클리핑 마스크", level: "고급", desc: "이미지/패스 마스킹" },
                  { skill: "블렌드", level: "고급", desc: "오브젝트 간 변형 효과" },
                  { skill: "심볼", level: "선택", desc: "반복 요소 효율적 관리" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{item.skill}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.level === '필수' ? 'bg-orange-100 text-orange-700' :
                        item.level === '고급' ? 'bg-amber-100 text-amber-700' :
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
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-block bg-gray-300 text-gray-700 px-4 py-2 rounded-full font-bold">2급</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">GTQi 2급 시험 개요</h2>
                  <p className="text-gray-500">실무 기초 수준의 일러스트레이터 활용 능력 평가</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "시험 시간", value: "90분", icon: "⏱️" },
                  { label: "문항 수", value: "4문항", icon: "📝" },
                  { label: "합격 기준", value: "60점 이상", icon: "✅" },
                  { label: "응시료", value: "22,000원", icon: "💰" }
                ].map((item, index) => (
                  <div key={index} className="bg-orange-50 rounded-2xl p-4 text-center">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="font-bold text-orange-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2급 문항별 상세 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">📋</span>
                문항별 출제 내용 (2급)
              </h3>
              <div className="space-y-4">
                {[
                  {
                    num: 1,
                    title: "기본 도형 활용",
                    score: 25,
                    time: "약 20분",
                    skills: ["사각형/원형 도구", "도형 변형", "기본 정렬", "색상 적용"]
                  },
                  {
                    num: 2,
                    title: "펜 도구 기초",
                    score: 25,
                    time: "약 20분",
                    skills: ["직선 패스", "간단한 곡선", "앵커 포인트 추가/삭제", "패스 연결"]
                  },
                  {
                    num: 3,
                    title: "기본 효과",
                    score: 25,
                    time: "약 25분",
                    skills: ["기본 그라디언트", "획/면 설정", "단순 효과", "레이어 관리"]
                  },
                  {
                    num: 4,
                    title: "간단한 디자인",
                    score: 25,
                    time: "약 25분",
                    skills: ["텍스트 입력", "기본 레이아웃", "오브젝트 배치", "파일 저장"]
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center font-bold">
                        {item.num}
                      </span>
                      <h4 className="font-bold text-gray-800 text-lg">{item.title}</h4>
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.score}점
                      </span>
                      <span className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm">
                        {item.time}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <span key={i} className="bg-white px-3 py-1 rounded-lg text-sm text-gray-600 border border-orange-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2급 핵심 스킬 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">🎯</span>
                2급 필수 스킬
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { skill: "도형 도구", level: "필수", desc: "사각형, 원형, 다각형 생성" },
                  { skill: "선택 도구", level: "필수", desc: "오브젝트 선택 및 이동" },
                  { skill: "펜 도구 기초", level: "필수", desc: "직선과 간단한 곡선" },
                  { skill: "색상 패널", level: "기본", desc: "면색/획색 설정" },
                  { skill: "정렬 패널", level: "기본", desc: "오브젝트 정렬" },
                  { skill: "문자 도구", level: "기본", desc: "텍스트 입력/편집" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{item.skill}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.level === '필수' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
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
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">💻</span>
              시험 환경
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-700 mb-3">소프트웨어</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                    Adobe Illustrator CC (최신 버전)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                    한글 또는 영문 버전 선택 가능
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                    버전별 UI 차이 숙지 필요
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 mb-3">제출 형식</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    AI(원본) + JPG(결과물) 제출
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    지정된 파일명과 크기 준수
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    아웃라인/레이어 구조 유지
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* GTQ와의 비교 */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-lime-100 rounded-xl flex items-center justify-center">⚖️</span>
              GTQ vs GTQi 비교
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">구분</th>
                    <th className="text-left py-3 px-4 font-medium text-fuchsia-600">GTQ (포토샵)</th>
                    <th className="text-left py-3 px-4 font-medium text-orange-600">GTQi (일러스트)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">주요 소프트웨어</td>
                    <td className="py-3 px-4">Adobe Photoshop</td>
                    <td className="py-3 px-4">Adobe Illustrator</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">이미지 유형</td>
                    <td className="py-3 px-4">비트맵 (픽셀)</td>
                    <td className="py-3 px-4">벡터 (패스)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">주요 활용</td>
                    <td className="py-3 px-4">사진 편집, 합성</td>
                    <td className="py-3 px-4">로고, 아이콘, 일러스트</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">핵심 도구</td>
                    <td className="py-3 px-4">브러시, 레이어 마스크</td>
                    <td className="py-3 px-4">펜 도구, 패스파인더</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">확대 시</td>
                    <td className="py-3 px-4">화질 저하</td>
                    <td className="py-3 px-4">화질 유지</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 합격 전략 */}
          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">🏆</span>
              합격 전략
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "펜 도구 연습", desc: "매일 30분씩 곡선 연습" },
                { title: "단축키 암기", desc: "작업 속도 2배 향상" },
                { title: "패스파인더 숙달", desc: "도형 조합의 핵심" },
                { title: "기출 반복", desc: "유형별 최소 5회 연습" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-orange-100">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/category/design/gtqi"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            GTQi 메인으로 돌아가기
          </Link>
        </div>
      </section>
    </div>
  );
}
