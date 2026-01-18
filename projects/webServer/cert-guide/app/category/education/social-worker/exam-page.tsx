'use client';

import { useState } from 'react';

export default function SocialWorkerExamPage() {
  const [activeSubject, setActiveSubject] = useState<string>('인간행동과사회환경');

  const subjects = [
    { id: '인간행동과사회환경', name: '인간행동과 사회환경', area: '사회복지기초' },
    { id: '사회복지조사론', name: '사회복지조사론', area: '사회복지기초' },
    { id: '사회복지실천론', name: '사회복지실천론', area: '사회복지실천' },
    { id: '사회복지실천기술론', name: '사회복지실천기술론', area: '사회복지실천' },
    { id: '지역사회복지론', name: '지역사회복지론', area: '사회복지실천' },
    { id: '사회복지정책론', name: '사회복지정책론', area: '정책과 제도' },
    { id: '사회복지행정론', name: '사회복지행정론', area: '정책과 제도' },
    { id: '사회복지법제론', name: '사회복지법제론', area: '정책과 제도' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="text-gray-600 hover:text-pink-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/education/social-worker" className="text-gray-600 hover:text-pink-600">사회복지사 1급</a>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🤝</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">사회복지사 1급 시험 상세</h1>
              <p className="text-pink-100">시험 과목 및 출제 경향</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Tabs */}
      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setActiveSubject(subject.id)}
                className={`px-4 py-3 font-medium text-sm border-b-2 transition whitespace-nowrap ${
                  activeSubject === subject.id
                    ? 'border-pink-500 text-pink-600 bg-pink-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <SubjectContent subjectId={activeSubject} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">
            본 페이지의 정보는 참고용이며, 정확한 정보는 한국사회복지사협회에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}

function SubjectContent({ subjectId }: { subjectId: string }) {
  const subjectData: Record<string, {
    name: string;
    area: string;
    color: string;
    topics: string[];
    tips: string[];
    studyLink: string;
  }> = {
    '인간행동과사회환경': {
      name: '인간행동과 사회환경',
      area: '사회복지기초',
      color: 'pink',
      topics: [
        '인간행동, 발달과 사회복지',
        '정신역동이론 (프로이트, 융, 아들러)',
        '행동주의이론 (파블로프, 스키너, 반두라)',
        '인본주의이론 (매슬로우, 로저스)',
        '인지이론 (피아제, 콜버그)',
        '생애주기별 발달과 사회복지',
        '가족, 집단, 조직, 문화와 사회복지',
      ],
      tips: [
        '이론가별 핵심 개념 정리',
        '발달단계별 특징 암기',
        '실천 연계성 이해',
        '사례 적용 연습',
      ],
      studyLink: '/education/social-worker/study/human-behavior',
    },
    '사회복지조사론': {
      name: '사회복지조사론',
      area: '사회복지기초',
      color: 'pink',
      topics: [
        '과학적 방법과 조사연구',
        '조사문제와 가설',
        '조사설계 (실험설계, 비실험설계)',
        '측정과 척도 (신뢰도, 타당도)',
        '표집 (확률표집, 비확률표집)',
        '자료수집방법 (설문, 면접, 관찰)',
        '자료분석 (기술통계, 추리통계)',
      ],
      tips: [
        '조사설계 유형 구분',
        '표집방법 정확히 이해',
        '척도 종류 암기',
        '통계 기본 개념',
      ],
      studyLink: '/education/social-worker/study/research-methods',
    },
    '사회복지실천론': {
      name: '사회복지실천론',
      area: '사회복지실천',
      color: 'rose',
      topics: [
        '사회복지실천의 개념과 정의',
        '사회복지실천의 가치와 윤리',
        '사회복지실천 관계론',
        '사회복지실천 과정 (접수-종결)',
        '사회복지실천 면접기술',
        '사례관리',
        '사회복지실천 현장',
      ],
      tips: [
        '실천과정 7단계 암기',
        '면접기술 사례 적용',
        '윤리적 딜레마 이해',
        '관계형성 원칙',
      ],
      studyLink: '/education/social-worker/study/practice-theory',
    },
    '사회복지실천기술론': {
      name: '사회복지실천기술론',
      area: '사회복지실천',
      color: 'rose',
      topics: [
        '정신역동모델',
        '인지행동모델',
        '과제중심모델',
        '위기개입모델',
        '역량강화모델',
        '집단대상 실천기술',
        '가족대상 실천기술',
      ],
      tips: [
        '모델별 특징 비교',
        '개입기법 정리',
        '사례 적용 연습',
        '집단·가족 기술 구분',
      ],
      studyLink: '/education/social-worker/study/practice-skills',
    },
    '지역사회복지론': {
      name: '지역사회복지론',
      area: '사회복지실천',
      color: 'rose',
      topics: [
        '지역사회복지의 개념과 이념',
        '지역사회복지 역사',
        '지역사회복지 실천모델',
        '지역사회복지 실천과정',
        '사회복지관',
        '지역사회보장협의체',
        '지역사회 자원개발과 활용',
      ],
      tips: [
        '실천모델 비교 (로스만)',
        '협의체 구조 이해',
        '복지관 기능',
        '자원개발 전략',
      ],
      studyLink: '/education/social-worker/study/community-welfare',
    },
    '사회복지정책론': {
      name: '사회복지정책론',
      area: '정책과 제도',
      color: 'red',
      topics: [
        '사회복지정책의 개념과 영역',
        '사회복지정책의 가치와 이념',
        '사회복지정책 발달이론',
        '복지국가 유형론 (에스핑 앤더슨)',
        '사회복지정책 분석틀',
        '사회복지정책 과정',
        '소득보장, 의료보장, 사회서비스',
      ],
      tips: [
        '복지국가 유형 암기',
        '정책과정 단계',
        '급여형태 구분',
        '이론가별 주장',
      ],
      studyLink: '/education/social-worker/study/policy',
    },
    '사회복지행정론': {
      name: '사회복지행정론',
      area: '정책과 제도',
      color: 'red',
      topics: [
        '사회복지행정의 개념과 특성',
        '사회복지행정의 이론',
        '사회복지조직의 구조와 조직이론',
        '리더십과 의사결정',
        '인적자원관리',
        '재정관리와 마케팅',
        '프로그램 개발과 평가',
      ],
      tips: [
        '조직이론 비교',
        '리더십 유형',
        '인사관리 절차',
        '평가 방법',
      ],
      studyLink: '/education/social-worker/study/administration',
    },
    '사회복지법제론': {
      name: '사회복지법제론',
      area: '정책과 제도',
      color: 'red',
      topics: [
        '사회복지법의 개념과 체계',
        '사회보장기본법',
        '사회복지사업법',
        '국민기초생활보장법',
        '국민연금법, 건강보험법',
        '아동복지법, 노인복지법',
        '장애인복지법',
      ],
      tips: [
        '법률 조문 암기',
        '급여 종류 정리',
        '수급자격 요건',
        '최신 개정사항',
      ],
      studyLink: '/education/social-worker/study/legislation',
    },
  };

  const subject = subjectData[subjectId];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
          subject.color === 'pink' ? 'bg-pink-100 text-pink-700' :
          subject.color === 'rose' ? 'bg-rose-100 text-rose-700' :
          'bg-red-100 text-red-700'
        }`}>
          {subject.area}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{subject.name}</h2>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className={`p-4 bg-gradient-to-r ${
          subject.color === 'pink' ? 'from-pink-500 to-pink-400' :
          subject.color === 'rose' ? 'from-rose-500 to-rose-400' :
          'from-red-500 to-red-400'
        } text-white`}>
          <h3 className="font-bold text-lg">📖 출제 범위</h3>
        </div>
        <div className="p-6">
          <ul className="space-y-2">
            {subject.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-pink-500 mt-1">•</span>
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <h3 className="font-bold text-lg">💡 학습 팁</h3>
        </div>
        <div className="p-6">
          <ul className="space-y-2">
            {subject.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-green-500 mt-1">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Study Link */}
      <div className="text-center">
        <a
          href={subject.studyLink}
          className={`inline-flex items-center gap-2 px-6 py-3 ${
            subject.color === 'pink' ? 'bg-pink-500 hover:bg-pink-600' :
            subject.color === 'rose' ? 'bg-rose-500 hover:bg-rose-600' :
            'bg-red-500 hover:bg-red-600'
          } text-white rounded-lg transition font-medium`}
        >
          📚 {subject.name} 학습하기 →
        </a>
      </div>
    </div>
  );
}
