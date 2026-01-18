'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ProductDesignEngineerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '제품디자인론',
      questions: 25,
      difficulty: '중',
      passRate: '50%',
      icon: '📐',
      color: 'blue',
      topics: [
        { name: '디자인 역사', desc: '산업혁명부터 현대 디자인까지' },
        { name: '디자인 프로세스', desc: '리서치, 컨셉, 개발, 평가' },
        { name: '디자인 미학', desc: '조형원리, 시각요소, 구성' },
        { name: '디자인 방법론', desc: '체계적 디자인 접근법' },
        { name: '디자인 마케팅', desc: '시장분석, 트렌드, 포지셔닝' },
        { name: '지속가능 디자인', desc: '환경, 사회적 책임' },
        { name: '디자인 경영', desc: '디자인 전략, 브랜딩' },
        { name: '디자인 윤리', desc: '저작권, 표절, 사회적 책임' },
      ],
      studyLink: '/category/design/product-design-engineer/study/product-design-theory',
    },
    {
      name: '인간공학',
      questions: 25,
      difficulty: '중상',
      passRate: '45%',
      icon: '🧍',
      color: 'indigo',
      topics: [
        { name: '인체측정학', desc: '인체치수, 동작범위, 백분위' },
        { name: '작업생리학', desc: '근력, 피로, 에너지 소비' },
        { name: '인지공학', desc: '정보처리, 의사결정, 오류' },
        { name: '감성공학', desc: '감성측정, 감성디자인' },
        { name: '사용성 평가', desc: '휴리스틱, 사용자 테스트' },
        { name: '작업환경', desc: '조명, 소음, 온열환경' },
        { name: '제어장치 설계', desc: '버튼, 스위치, 레버' },
        { name: '표시장치 설계', desc: '디스플레이, 경고신호' },
      ],
      studyLink: '/category/design/product-design-engineer/study/human-factors',
    },
    {
      name: '재료 및 공정',
      questions: 25,
      difficulty: '중상',
      passRate: '42%',
      icon: '🔧',
      color: 'violet',
      topics: [
        { name: '금속재료', desc: '철강, 비철금속, 합금' },
        { name: '플라스틱', desc: '열가소성, 열경화성, 복합재' },
        { name: '목재/세라믹', desc: '자연재료, 신소재' },
        { name: '사출성형', desc: '금형, 공정조건, 불량' },
        { name: '프레스/판금', desc: '굽힘, 드로잉, 절단' },
        { name: '표면처리', desc: '도금, 도장, 인쇄' },
        { name: '조립공정', desc: '접합, 체결, 용접' },
        { name: '품질관리', desc: '검사, 시험, 공차' },
      ],
      studyLink: '/category/design/product-design-engineer/study/material-process',
    },
    {
      name: 'CAD/CAM',
      questions: 25,
      difficulty: '중',
      passRate: '55%',
      icon: '💻',
      color: 'purple',
      topics: [
        { name: '2D CAD 기초', desc: '도면 작성, 치수기입' },
        { name: '3D 모델링', desc: '서피스, 솔리드 모델링' },
        { name: '렌더링', desc: '재질, 조명, 카메라' },
        { name: 'CAM 기초', desc: 'NC 프로그래밍, 공구경로' },
        { name: '데이터 관리', desc: '파일 형식, 변환, PDM' },
        { name: '3D 프린팅', desc: '적층제조, 후가공' },
        { name: '리버스 엔지니어링', desc: '3D 스캔, 데이터 처리' },
        { name: '협업 도구', desc: 'PLM, 버전관리' },
      ],
      studyLink: '/category/design/product-design-engineer/study/cad-cam',
    },
  ];

  const practicalAreas = [
    { name: '아이디어 발상', percentage: 20, items: ['컨셉 설정', '아이디어 스케치', '변형/발전'] },
    { name: '디자인 전개', percentage: 25, items: ['형태 구체화', '비례/조형', '구조 설계'] },
    { name: '렌더링 표현', percentage: 30, items: ['마커 렌더링', '재질 표현', '그림자/하이라이트'] },
    { name: '완성도', percentage: 25, items: ['도면 정확성', '전체 조화', '프레젠테이션'] },
  ];

  const examTrends = {
    always: ['인체측정 백분위', '플라스틱 사출성형', '디자인 프로세스', '3D 모델링 기초'],
    often: ['작업생리학', '금속 가공법', '디자인 역사', '렌더링 기법'],
    sometimes: ['감성공학', '신소재', '지속가능 디자인', 'PLM/PDM'],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design" className="text-gray-500 hover:text-gray-700">디자인</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design/product-design-engineer" className="text-gray-500 hover:text-gray-700">제품디자인기사</Link>
          <span className="text-gray-400">/</span>
          <span className="text-blue-600 font-medium">시험 상세</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-4xl">
                📝
              </div>
              <div>
                <h1 className="text-2xl font-bold">제품디자인기사 시험 상세</h1>
                <p className="text-blue-100">필기 4과목 100문항 + 실기 작업형 6시간</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('written')}
              className={`flex-1 py-4 px-6 font-medium transition ${
                activeTab === 'written'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`flex-1 py-4 px-6 font-medium transition ${
                activeTab === 'practical'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
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
                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <p className="text-sm text-blue-600">과목수</p>
                  <p className="text-2xl font-bold text-blue-800">4과목</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl text-center">
                  <p className="text-sm text-indigo-600">총 문항</p>
                  <p className="text-2xl font-bold text-indigo-800">100문항</p>
                </div>
                <div className="p-4 bg-violet-50 rounded-xl text-center">
                  <p className="text-sm text-violet-600">시험시간</p>
                  <p className="text-2xl font-bold text-violet-800">150분</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl text-center">
                  <p className="text-sm text-purple-600">합격기준</p>
                  <p className="text-2xl font-bold text-purple-800">60점</p>
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
                  subject.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  subject.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                  subject.color === 'violet' ? 'from-violet-500 to-violet-600' :
                  'from-purple-500 to-purple-600'
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
                      subject.color === 'blue' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                      subject.color === 'indigo' ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' :
                      subject.color === 'violet' ? 'bg-violet-100 text-violet-700 hover:bg-violet-200' :
                      'bg-purple-100 text-purple-700 hover:bg-purple-200'
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
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-2">1️⃣ 인체측정 데이터 암기</h4>
                  <p className="text-gray-700 text-sm">백분위 개념과 주요 인체치수 데이터를 정확히 암기하세요. 매회 2-3문항 출제됩니다.</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <h4 className="font-semibold text-indigo-800 mb-2">2️⃣ 재료별 가공법 정리</h4>
                  <p className="text-gray-700 text-sm">플라스틱 사출성형, 금속 프레스 가공의 원리와 불량 유형을 체계적으로 정리하세요.</p>
                </div>
                <div className="p-4 bg-violet-50 rounded-xl">
                  <h4 className="font-semibold text-violet-800 mb-2">3️⃣ 실기와 병행 학습</h4>
                  <p className="text-gray-700 text-sm">필기 공부와 함께 렌더링 연습을 병행하면 CAD/CAM 과목 이해도가 높아집니다.</p>
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
                <div className="p-4 bg-indigo-50 rounded-xl text-center">
                  <p className="text-sm text-indigo-600">시험 유형</p>
                  <p className="text-2xl font-bold text-indigo-800">작업형</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <p className="text-sm text-blue-600">시험 시간</p>
                  <p className="text-2xl font-bold text-blue-800">6시간</p>
                </div>
                <div className="p-4 bg-violet-50 rounded-xl text-center">
                  <p className="text-sm text-violet-600">합격 기준</p>
                  <p className="text-2xl font-bold text-violet-800">60점</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl text-center">
                  <p className="text-sm text-purple-600">응시료</p>
                  <p className="text-2xl font-bold text-purple-800">46,900원</p>
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
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">{area.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: `${area.percentage}%` }}></div>
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

            {/* Exam Process */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 실기시험 진행 과정</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold flex-shrink-0">1</div>
                  <div className="flex-1 p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-semibold text-blue-800">과제 확인 (10분)</h4>
                    <p className="text-sm text-gray-600">제품 주제, 요구사항, 제출물 확인</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">2</div>
                  <div className="flex-1 p-4 bg-indigo-50 rounded-xl">
                    <h4 className="font-semibold text-indigo-800">아이디어 발상 (60분)</h4>
                    <p className="text-sm text-gray-600">썸네일 스케치, 아이디어 전개, 컨셉 선정</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold flex-shrink-0">3</div>
                  <div className="flex-1 p-4 bg-violet-50 rounded-xl">
                    <h4 className="font-semibold text-violet-800">디자인 전개 (120분)</h4>
                    <p className="text-sm text-gray-600">형태 구체화, 비례 조정, 3면도 작성</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold flex-shrink-0">4</div>
                  <div className="flex-1 p-4 bg-purple-50 rounded-xl">
                    <h4 className="font-semibold text-purple-800">렌더링 (150분)</h4>
                    <p className="text-sm text-gray-600">마커 렌더링, 재질 표현, 그림자/하이라이트</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold flex-shrink-0">5</div>
                  <div className="flex-1 p-4 bg-pink-50 rounded-xl">
                    <h4 className="font-semibold text-pink-800">마무리 (20분)</h4>
                    <p className="text-sm text-gray-600">레이아웃 정리, 제목/설명 작성, 최종 검토</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Required Materials */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🛠️ 준비물</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-2">✏️ 필수 준비물</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 마커 세트 (코픽, 프리즈마 등)</li>
                    <li>• 연필, 샤프 (0.5mm)</li>
                    <li>• 지우개, 수정테이프</li>
                    <li>• 자, 삼각자, 곡선자</li>
                    <li>• 스케치북 (지급)</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <h4 className="font-semibold text-indigo-800 mb-2">📦 권장 준비물</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 색연필, 파스텔</li>
                    <li>• 화이트 펜 (하이라이트용)</li>
                    <li>• 마스킹 테이프</li>
                    <li>• 템플릿 (원, 타원)</li>
                    <li>• 여분 마커 (주요 색상)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기시험 대비 팁</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-2">1️⃣ 시간 배분 엄수</h4>
                  <p className="text-gray-700 text-sm">아이디어 발상에 너무 많은 시간을 쓰지 마세요. 렌더링 시간을 충분히 확보해야 합니다.</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <h4 className="font-semibold text-indigo-800 mb-2">2️⃣ 마커 연습 필수</h4>
                  <p className="text-gray-700 text-sm">매일 30분씩 마커 그라데이션과 재질 표현을 연습하세요. 손에 익어야 빠르게 표현할 수 있습니다.</p>
                </div>
                <div className="p-4 bg-violet-50 rounded-xl">
                  <h4 className="font-semibold text-violet-800 mb-2">3️⃣ 기출 과제 분석</h4>
                  <p className="text-gray-700 text-sm">최근 3년 기출 과제를 분석하고, 유사한 주제로 모의 실기를 수행해보세요.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href="/category/design/product-design-engineer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl shadow hover:shadow-md transition"
          >
            ← 제품디자인기사 메인으로
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-8 mt-8">
        <div className="text-center text-gray-500 text-sm">
          <p>© 2026 자격증 가이드. 제품디자인기사 합격을 응원합니다! 🛋️</p>
        </div>
      </footer>
    </div>
  );
}
