'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function VisualDesignTechnicianExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '디자인일반',
      questions: 20,
      difficulty: '중',
      passRate: '60%',
      icon: '🎯',
      color: 'purple',
      topics: [
        { name: '디자인 역사', desc: '근대~현대 디자인 사조와 운동' },
        { name: '디자인 원리', desc: '조형원리, 구성요소, 미적 기준' },
        { name: '디자인 방법론', desc: '디자인 프로세스, 리서치, 기획' },
        { name: '디자인 분야', desc: '시각, 제품, 환경, 패션 디자인' },
        { name: '디자인 심리학', desc: '지각심리, 소비자 행동' },
        { name: '조형의 기초', desc: '점, 선, 면, 형태, 공간' },
        { name: '디자인 윤리', desc: '저작권, 표절, 사회적 책임' },
        { name: '디자인 트렌드', desc: '최신 디자인 경향과 기술' },
      ],
      studyLink: '/category/design/visual-design-technician/study/design-general',
    },
    {
      name: '시각디자인',
      questions: 20,
      difficulty: '중상',
      passRate: '55%',
      icon: '👁️',
      color: 'pink',
      topics: [
        { name: '시각전달 원리', desc: '커뮤니케이션, 기호학, 의미작용' },
        { name: '타이포그래피', desc: '문자디자인, 서체, 편집' },
        { name: '레이아웃', desc: '그리드 시스템, 구성, 여백' },
        { name: '편집디자인', desc: '잡지, 책, 브로슈어 디자인' },
        { name: '광고디자인', desc: '광고 기획, 카피, 비주얼' },
        { name: '패키지디자인', desc: '포장디자인, 라벨, 용기' },
        { name: 'CI/BI 디자인', desc: '기업아이덴티티, 브랜딩' },
        { name: '인포그래픽', desc: '정보시각화, 다이어그램' },
      ],
      studyLink: '/category/design/visual-design-technician/study/visual-design',
    },
    {
      name: '색채 및 도해',
      questions: 20,
      difficulty: '중',
      passRate: '58%',
      icon: '🌈',
      color: 'rose',
      topics: [
        { name: '색의 기초', desc: '빛과 색, 색의 물리적 성질' },
        { name: '색채 체계', desc: '먼셀, PCCS, NCS 표색계' },
        { name: '색채 심리', desc: '색의 감정효과, 연상, 상징' },
        { name: '배색 원리', desc: '색채 조화론, 배색 기법' },
        { name: '색채 활용', desc: '분야별 색채 계획, 트렌드' },
        { name: '도해 기초', desc: '투시도법, 제도, 스케치' },
        { name: '표현기법', desc: '렌더링, 마커, 디지털 도해' },
        { name: '도해 응용', desc: '프레젠테이션, 시안 표현' },
      ],
      studyLink: '/category/design/visual-design-technician/study/color-theory',
    },
  ];

  const practicalAreas = [
    { name: '아이디어 발상', percentage: 20, items: ['컨셉 설정', '아이디어 스케치', '시각적 표현 계획'] },
    { name: '디자인 구성', percentage: 30, items: ['레이아웃 설계', '타이포그래피 적용', '시각적 위계 설정'] },
    { name: '표현 기법', percentage: 25, items: ['그래픽 요소 활용', '색채 적용', '이미지 편집'] },
    { name: '완성도', percentage: 25, items: ['디테일 마무리', '일관성 유지', '품질 관리'] },
  ];

  const examTrends = {
    always: ['디자인 역사 (바우하우스, 아르데코 등)', '먼셀 표색계', '타이포그래피 기초', 'CI/BI 개념'],
    often: ['색채 조화론', '그리드 시스템', '시각전달 원리', '디자인 방법론'],
    sometimes: ['최신 디자인 트렌드', '디지털 디자인', '사용자 경험(UX)', '지속가능 디자인'],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design" className="text-gray-500 hover:text-gray-700">디자인</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design/visual-design-technician" className="text-gray-500 hover:text-gray-700">시각디자인산업기사</Link>
          <span className="text-gray-400">/</span>
          <span className="text-purple-600 font-medium">시험 상세</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-4xl">
                📝
              </div>
              <div>
                <h1 className="text-2xl font-bold">시각디자인산업기사 시험 상세</h1>
                <p className="text-purple-100">필기 3과목 60문항 + 실기 작업형 5시간</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('written')}
              className={`flex-1 py-4 px-6 font-medium transition ${
                activeTab === 'written'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`flex-1 py-4 px-6 font-medium transition ${
                activeTab === 'practical'
                  ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🎨 실기시험
            </button>
          </div>
        </div>

        {/* Written Exam Content */}
        {activeTab === 'written' && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-purple-50 rounded-xl text-center">
                  <p className="text-sm text-purple-600">과목수</p>
                  <p className="text-2xl font-bold text-purple-800">3과목</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-xl text-center">
                  <p className="text-sm text-pink-600">총 문항</p>
                  <p className="text-2xl font-bold text-pink-800">60문항</p>
                </div>
                <div className="p-4 bg-rose-50 rounded-xl text-center">
                  <p className="text-sm text-rose-600">시험시간</p>
                  <p className="text-2xl font-bold text-rose-800">90분</p>
                </div>
                <div className="p-4 bg-fuchsia-50 rounded-xl text-center">
                  <p className="text-sm text-fuchsia-600">합격기준</p>
                  <p className="text-2xl font-bold text-fuchsia-800">60점</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  <strong>💡 합격 조건:</strong> 과목당 40점 이상 + 전과목 평균 60점 이상
                </p>
              </div>
            </div>

            {/* Subject Details */}
            {writtenSubjects.map((subject, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${
                  subject.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  subject.color === 'pink' ? 'from-pink-500 to-pink-600' :
                  'from-rose-500 to-rose-600'
                } p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{subject.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold">{subject.name}</h3>
                        <p className="text-white/80 text-sm">{subject.questions}문항 · 난이도 {subject.difficulty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-sm">평균 합격률</p>
                      <p className="text-xl font-bold">{subject.passRate}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-700 mb-3">📚 주요 출제 토픽</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {subject.topics.map((topic, tidx) => (
                      <div key={tidx} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-800">{topic.name}</p>
                        <p className="text-sm text-gray-500">{topic.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={subject.studyLink}
                    className={`block mt-4 py-3 text-center rounded-xl font-medium transition ${
                      subject.color === 'purple' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' :
                      subject.color === 'pink' ? 'bg-pink-100 text-pink-700 hover:bg-pink-200' :
                      'bg-rose-100 text-rose-700 hover:bg-rose-200'
                    }`}
                  >
                    📖 {subject.name} 학습하기 →
                  </Link>
                </div>
              </div>
            ))}

            {/* Exam Trends */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📊 출제 경향 분석</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <h4 className="font-semibold text-red-700 mb-2">🔴 매회 출제</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {examTrends.always.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <h4 className="font-semibold text-yellow-700 mb-2">🟡 자주 출제</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {examTrends.often.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-semibold text-green-700 mb-2">🟢 간헐 출제</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {examTrends.sometimes.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Study Strategy */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 합격 전략</h2>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-semibold text-purple-800 mb-2">1️⃣ 디자인 역사 완벽 정리</h4>
                  <p className="text-gray-700 text-sm">바우하우스, 아르누보, 아르데코 등 주요 사조와 대표 디자이너를 암기하세요. 매회 2~3문항 출제됩니다.</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-xl">
                  <h4 className="font-semibold text-pink-800 mb-2">2️⃣ 색채학 표색계 숙지</h4>
                  <p className="text-gray-700 text-sm">먼셀, PCCS, NCS 표색계의 구조와 표기법을 정확히 이해하세요. 계산 문제가 출제될 수 있습니다.</p>
                </div>
                <div className="p-4 bg-rose-50 rounded-xl">
                  <h4 className="font-semibold text-rose-800 mb-2">3️⃣ 기출문제 반복 학습</h4>
                  <p className="text-gray-700 text-sm">최근 5개년 기출문제를 3회 이상 풀어보세요. 반복 출제되는 유형이 많습니다.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practical Exam Content */}
        {activeTab === 'practical' && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎨 실기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-pink-50 rounded-xl text-center">
                  <p className="text-sm text-pink-600">시험 유형</p>
                  <p className="text-2xl font-bold text-pink-800">작업형</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl text-center">
                  <p className="text-sm text-purple-600">시험 시간</p>
                  <p className="text-2xl font-bold text-purple-800">5시간</p>
                </div>
                <div className="p-4 bg-rose-50 rounded-xl text-center">
                  <p className="text-sm text-rose-600">합격 기준</p>
                  <p className="text-2xl font-bold text-rose-800">60점</p>
                </div>
                <div className="p-4 bg-fuchsia-50 rounded-xl text-center">
                  <p className="text-sm text-fuchsia-600">응시료</p>
                  <p className="text-2xl font-bold text-fuchsia-800">44,000원</p>
                </div>
              </div>
            </div>

            {/* Practical Areas */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📐 평가 영역별 배점</h2>
              <div className="space-y-4">
                {practicalAreas.map((area, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{area.name}</h4>
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">{area.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${area.percentage}%` }}></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {area.items.map((item, iidx) => (
                        <span key={iidx} className="px-2 py-1 bg-white text-gray-600 rounded text-sm">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Tasks */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 실기시험 과제 유형</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <h4 className="font-semibold text-purple-800 mb-2">🖼️ 포스터 디자인</h4>
                  <p className="text-sm text-gray-700">주어진 주제에 맞는 광고 포스터 또는 홍보물 제작</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-xl border border-pink-100">
                  <h4 className="font-semibold text-pink-800 mb-2">📰 편집 디자인</h4>
                  <p className="text-sm text-gray-700">잡지 레이아웃, 브로슈어, 리플렛 등 편집물 제작</p>
                </div>
                <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                  <h4 className="font-semibold text-rose-800 mb-2">📦 패키지 디자인</h4>
                  <p className="text-sm text-gray-700">제품 포장 디자인 및 라벨 제작</p>
                </div>
                <div className="p-4 bg-fuchsia-50 rounded-xl border border-fuchsia-100">
                  <h4 className="font-semibold text-fuchsia-800 mb-2">🏢 CI/BI 디자인</h4>
                  <p className="text-sm text-gray-700">로고, 심볼, 브랜드 아이덴티티 시스템 제작</p>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🛠️ 사용 소프트웨어</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <div className="text-4xl mb-2">🎨</div>
                  <h4 className="font-semibold text-blue-800">Adobe Illustrator</h4>
                  <p className="text-sm text-gray-600">벡터 그래픽</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <h4 className="font-semibold text-indigo-800">Adobe Photoshop</h4>
                  <p className="text-sm text-gray-600">이미지 편집</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <h4 className="font-semibold text-purple-800">Adobe InDesign</h4>
                  <p className="text-sm text-gray-600">편집 디자인</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ 참고:</strong> 시험장에서 제공하는 PC와 소프트웨어를 사용합니다. 개인 장비 반입 불가합니다.
                </p>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기시험 대비 팁</h2>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-semibold text-purple-800 mb-2">1️⃣ 시간 배분 전략</h4>
                  <p className="text-gray-700 text-sm">아이디어 구상 30분 → 기본 구조 1시간 → 디자인 작업 2시간 30분 → 마무리 1시간으로 배분하세요.</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-xl">
                  <h4 className="font-semibold text-pink-800 mb-2">2️⃣ 기본기 숙달</h4>
                  <p className="text-gray-700 text-sm">일러스트레이터 펜툴, 포토샵 마스크 등 기본 기능을 빠르게 사용할 수 있도록 연습하세요.</p>
                </div>
                <div className="p-4 bg-rose-50 rounded-xl">
                  <h4 className="font-semibold text-rose-800 mb-2">3️⃣ 포트폴리오 준비</h4>
                  <p className="text-gray-700 text-sm">다양한 유형의 디자인 작업물을 미리 만들어보고, 자신만의 스타일을 개발하세요.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href="/category/design/visual-design-technician"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl shadow hover:shadow-md transition"
          >
            ← 시각디자인산업기사 메인으로
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-8 mt-8">
        <div className="text-center text-gray-500 text-sm">
          <p>© 2026 자격증 가이드. 시각디자인산업기사 합격을 응원합니다! 🎨</p>
        </div>
      </footer>
    </div>
  );
}
