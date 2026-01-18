'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HealthEducator2ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      id: 1,
      name: '보건교육학개론',
      icon: '📚',
      color: 'pink',
      questions: 20,
      difficulty: 3,
      passRate: 55,
      topics: [
        { name: '보건교육의 개념', desc: '정의, 목적, 필요성, 역사' },
        { name: '보건교육 대상', desc: '개인, 집단, 지역사회 특성' },
        { name: '교육과정 개발', desc: '요구분석, 목표설정, 내용선정' },
        { name: '학습원리', desc: '성인학습, 참여학습, 경험학습' },
        { name: '교수방법', desc: '강의, 토론, 시범, 역할극' },
        { name: '교육매체', desc: '인쇄물, 시청각자료, 디지털매체' },
        { name: '교육평가', desc: '과정평가, 결과평가, 영향평가' },
        { name: '보건교육사 역할', desc: '윤리, 전문성, 자격관리' },
      ],
      studyLink: '/category/medical/health-educator-2/study/health-education-intro',
    },
    {
      id: 2,
      name: '보건의사소통',
      icon: '💬',
      color: 'blue',
      questions: 20,
      difficulty: 3,
      passRate: 60,
      topics: [
        { name: '의사소통 이론', desc: '언어적/비언어적 의사소통' },
        { name: '건강 커뮤니케이션', desc: '헬스 리터러시, 건강정보 전달' },
        { name: '상담기법', desc: '동기강화상담, 공감적 경청' },
        { name: '집단 의사소통', desc: '그룹 다이내믹스, 촉진기법' },
        { name: '미디어 활용', desc: 'SNS, 웹, 모바일 헬스' },
        { name: '캠페인 기획', desc: '건강캠페인, 사회마케팅' },
        { name: '위기 커뮤니케이션', desc: '감염병, 재난 시 소통' },
        { name: '문화적 역량', desc: '다문화 대상 의사소통' },
      ],
      studyLink: '/category/medical/health-educator-2/study/health-communication',
    },
    {
      id: 3,
      name: '건강행동이론',
      icon: '🧠',
      color: 'green',
      questions: 20,
      difficulty: 4,
      passRate: 50,
      topics: [
        { name: '건강신념모형', desc: 'HBM의 구성요소와 적용' },
        { name: '계획행동이론', desc: 'TPB, 태도/주관적규범/통제감' },
        { name: '범이론적 모형', desc: '변화단계, 변화과정' },
        { name: '사회인지이론', desc: '자기효능감, 관찰학습' },
        { name: '생태학적 모형', desc: '다수준 접근, 환경요인' },
        { name: '건강행동 결정요인', desc: '개인/사회/환경 요인' },
        { name: '행동변화 전략', desc: '목표설정, 자기모니터링' },
        { name: '이론의 실제 적용', desc: '프로그램 설계 사례' },
      ],
      studyLink: '/category/medical/health-educator-2/study/health-behavior',
    },
    {
      id: 4,
      name: '지역사회보건',
      icon: '🏘️',
      color: 'orange',
      questions: 20,
      difficulty: 3,
      passRate: 55,
      topics: [
        { name: '지역사회 진단', desc: '건강요구도 조사, 자원파악' },
        { name: '건강증진사업', desc: '금연, 절주, 영양, 운동' },
        { name: '보건정책', desc: '국민건강증진법, HP2030' },
        { name: '보건소 기능', desc: '지역보건법, 보건사업' },
        { name: '건강형평성', desc: '건강불평등, 취약계층' },
        { name: '지역사회 참여', desc: '주민조직, 파트너십' },
        { name: '건강도시', desc: 'WHO 건강도시 프로젝트' },
        { name: '사업평가', desc: '과정/결과/영향 평가' },
      ],
      studyLink: '/category/medical/health-educator-2/study/community-health',
    },
  ];

  const practicalAreas = [
    { name: '교육내용 구성', weight: 25, items: ['주제선정', '목표설정', '내용조직', '시간배분'] },
    { name: '교육매체 활용', weight: 25, items: ['PPT 구성', '시청각자료', '교구활용', '판서'] },
    { name: '교육진행', weight: 30, items: ['도입', '전개', '정리', '시간관리'] },
    { name: '상호작용', weight: 20, items: ['질문기법', '참여유도', '피드백', '동기부여'] },
  ];

  const colorClasses: { [key: string]: { bg: string; text: string; light: string; border: string } } = {
    pink: { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50', border: 'border-pink-200' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-200' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-200' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-pink-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/health-educator-2" className="text-gray-600 hover:text-pink-600">보건교육사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="bg-gradient-to-r from-pink-400 to-rose-400 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-4xl">📋</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">보건교육사 2급 시험 정보</h1>
              <p className="text-pink-100 mt-1">필기시험 4과목 + 실기시험(교육시연)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 탭 네비게이션 */}
      <div className="bg-white border-b sticky top-[57px] z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('written')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'written'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🎤 실기시험
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 필기시험 탭 */}
        {activeTab === 'written' && (
          <div className="space-y-8">
            {/* 필기시험 개요 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600">4과목</div>
                  <div className="text-sm text-gray-500">시험 과목</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">80문항</div>
                  <div className="text-sm text-gray-500">총 문항수</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">120분</div>
                  <div className="text-sm text-gray-500">시험시간</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">60점</div>
                  <div className="text-sm text-gray-500">합격기준(평균)</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                <strong>합격기준:</strong> 각 과목 40점 이상, 전 과목 평균 60점 이상
              </div>
            </div>

            {/* 과목별 상세 */}
            <div className="space-y-6">
              {writtenSubjects.map((subject) => (
                <div key={subject.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className={`${colorClasses[subject.color].bg} p-4 text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{subject.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold">{subject.id}과목: {subject.name}</h3>
                          <p className="text-white/80 text-sm">{subject.questions}문항 | 난이도 {'★'.repeat(subject.difficulty)}{'☆'.repeat(5-subject.difficulty)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{subject.passRate}%</div>
                        <div className="text-xs text-white/80">평균 합격률</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-semibold text-gray-800 mb-3">출제 토픽</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {subject.topics.map((topic, idx) => (
                        <div key={idx} className={`p-3 ${colorClasses[subject.color].light} rounded-lg border ${colorClasses[subject.color].border}`}>
                          <div className={`font-medium ${colorClasses[subject.color].text}`}>{topic.name}</div>
                          <div className="text-sm text-gray-600">{topic.desc}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link
                        href={subject.studyLink}
                        className={`px-4 py-2 ${colorClasses[subject.color].bg} text-white rounded-lg hover:opacity-90 transition text-sm font-medium`}
                      >
                        {subject.name} 학습하기 →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 합격 전략 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 필기시험 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <h3 className="font-bold text-pink-700 mb-2">✅ 핵심 전략</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 기본 이론 완벽 이해 후 응용</li>
                    <li>• 건강행동이론 모형 암기 필수</li>
                    <li>• 기출문제 3회독 이상</li>
                    <li>• 오답노트 작성 및 복습</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-700 mb-2">⏰ 시간 배분</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 과목당 약 30분 배분</li>
                    <li>• 어려운 문제는 표시 후 넘기기</li>
                    <li>• 마지막 10분은 검토 시간</li>
                    <li>• OMR 마킹 시간 확보</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 실기시험 탭 */}
        {activeTab === 'practical' && (
          <div className="space-y-8">
            {/* 실기시험 개요 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎤 실기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">교육시연</div>
                  <div className="text-sm text-gray-500">시험 유형</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600">15분</div>
                  <div className="text-sm text-gray-500">총 시험시간</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">10분</div>
                  <div className="text-sm text-gray-500">시연시간</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">60점</div>
                  <div className="text-sm text-gray-500">합격기준</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg text-sm text-gray-600 border border-purple-200">
                <strong>시험 진행:</strong> 준비시간 5분 + 교육시연 10분 | 주제는 당일 현장에서 발표
              </div>
            </div>

            {/* 평가 영역별 상세 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📊 평가 영역별 배점</h2>
              <div className="space-y-4">
                {practicalAreas.map((area, idx) => (
                  <div key={idx} className="border rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-3 text-white flex items-center justify-between">
                      <span className="font-bold">{area.name}</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{area.weight}%</span>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {area.items.map((item, i) => (
                          <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-200">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 시연 주제 예시 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 시연 주제 예시</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <h3 className="font-bold text-pink-700 mb-2">생활습관 주제</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 금연 교육</li>
                    <li>• 절주 교육</li>
                    <li>• 운동 생활화</li>
                    <li>• 건강한 식습관</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-700 mb-2">질병예방 주제</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 고혈압 예방</li>
                    <li>• 당뇨병 관리</li>
                    <li>• 암 예방 수칙</li>
                    <li>• 감염병 예방</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 실기 대비 팁 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기시험 대비 팁</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                  <div className="text-2xl mb-2">📋</div>
                  <h3 className="font-bold text-pink-700 mb-2">사전 준비</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 다양한 주제 연습</li>
                    <li>• 10분 타이머 연습</li>
                    <li>• PPT 템플릿 준비</li>
                  </ul>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="font-bold text-blue-700 mb-2">시연 중</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 자신감 있는 태도</li>
                    <li>• 시선 처리</li>
                    <li>• 적절한 제스처</li>
                  </ul>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="text-2xl mb-2">✅</div>
                  <h3 className="font-bold text-green-700 mb-2">주의사항</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 시간 엄수</li>
                    <li>• 준비물 확인</li>
                    <li>• 긴장 관리</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 실기 학습 링크 */}
            <div className="text-center">
              <Link
                href="/category/medical/health-educator-2/study/practical"
                className="inline-block bg-gradient-to-r from-purple-500 to-violet-500 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg"
              >
                🎤 실기 준비 학습하기 →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
