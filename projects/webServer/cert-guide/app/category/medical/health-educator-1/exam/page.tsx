'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HealthEducator1ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      id: 1,
      name: '보건교육학',
      icon: '📚',
      color: 'pink',
      questions: 25,
      difficulty: 4,
      passRate: 65,
      topics: [
        { name: '보건교육 철학과 윤리', desc: '보건교육의 철학적 기반, 전문가 윤리' },
        { name: '학습이론 심화', desc: '성인학습이론, 경험학습, 전환학습' },
        { name: '교수설계와 개발', desc: 'ADDIE 모형, 교수체제설계, 매체개발' },
        { name: '교육평가 방법론', desc: '형성평가, 총괄평가, 메타평가' },
        { name: '보건교육 연구방법', desc: '질적/양적 연구, 효과성 평가' },
        { name: '보건교육 정책', desc: '국가 건강증진정책, 보건교육 법규' },
        { name: '보건교육 현장적용', desc: '학교, 산업장, 지역사회 보건교육' },
        { name: '보건교육 트렌드', desc: '디지털 헬스, 비대면 교육, AI 활용' },
      ],
      studyLink: '/category/medical/health-educator-1/study/health-education-theory',
    },
    {
      id: 2,
      name: '건강증진이론',
      icon: '💪',
      color: 'blue',
      questions: 25,
      difficulty: 5,
      passRate: 55,
      topics: [
        { name: '건강행동 이론', desc: '건강신념모형, 계획행동이론, 범이론적모형' },
        { name: '사회인지이론', desc: '자기효능감, 관찰학습, 호혜적 결정론' },
        { name: '생태학적 모형', desc: '사회생태학적 접근, 다수준 개입' },
        { name: '임파워먼트 이론', desc: '개인/조직/지역사회 임파워먼트' },
        { name: '사회마케팅', desc: '건강 커뮤니케이션, 행동경제학' },
        { name: '건강형평성', desc: '건강불평등, 사회적 결정요인' },
        { name: '건강증진 근거', desc: '근거기반 실천, 체계적 문헌고찰' },
        { name: '국제 건강증진', desc: 'WHO 헌장, 오타와 헌장, SDGs' },
      ],
      studyLink: '/category/medical/health-educator-1/study/health-promotion',
    },
    {
      id: 3,
      name: '보건정책',
      icon: '📋',
      color: 'green',
      questions: 25,
      difficulty: 4,
      passRate: 60,
      topics: [
        { name: '보건정책 분석', desc: '정책과정, 정책분석 모형, 정책평가' },
        { name: '보건의료체계', desc: '한국 보건의료체계, OECD 비교' },
        { name: '건강보험제도', desc: '국민건강보험, 의료급여, 장기요양' },
        { name: '공중보건법', desc: '국민건강증진법, 감염병예방법' },
        { name: '보건행정', desc: '보건조직, 보건기획, 보건재정' },
        { name: '건강증진정책', desc: 'HP2030, 국가건강증진종합계획' },
        { name: '지역사회보건', desc: '지역보건법, 보건소 기능' },
        { name: '국제보건정책', desc: 'IHR, 글로벌 헬스 거버넌스' },
      ],
      studyLink: '/category/medical/health-educator-1/study/health-policy',
    },
    {
      id: 4,
      name: '프로그램개발',
      icon: '🎯',
      color: 'orange',
      questions: 25,
      difficulty: 5,
      passRate: 50,
      topics: [
        { name: '요구도 평가', desc: '건강요구도 조사, 우선순위 설정' },
        { name: 'PRECEDE-PROCEED', desc: '모형의 각 단계별 적용' },
        { name: '프로그램 기획', desc: '목표 설정, 전략 수립, 자원배분' },
        { name: '프로그램 실행', desc: '실행계획, 모니터링, 품질관리' },
        { name: '프로그램 평가', desc: '과정평가, 영향평가, 결과평가' },
        { name: '비용효과분석', desc: '경제성 평가, 비용편익분석' },
        { name: '프로그램 사례', desc: '금연, 절주, 운동, 영양 프로그램' },
        { name: '프로그램 확산', desc: 'RE-AIM, 확산이론, 지속가능성' },
      ],
      studyLink: '/category/medical/health-educator-1/study/program-planning',
    },
  ];

  const practicalAreas = [
    { name: '교육기획', weight: 25, items: ['요구분석', '목표설정', '내용구성', '시간배분'] },
    { name: '교육매체', weight: 25, items: ['PPT 제작', '시청각자료', '유인물', '디지털도구'] },
    { name: '교육진행', weight: 30, items: ['도입/전개/정리', '발표력', '시간관리', '돌발상황대처'] },
    { name: '상호작용', weight: 20, items: ['질의응답', '참여유도', '피드백', '동기부여'] },
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
            <Link href="/category/medical/health-educator-1" className="text-gray-600 hover:text-pink-600">보건교육사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-4xl">📋</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">보건교육사 1급 시험 정보</h1>
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
                  <div className="text-2xl font-bold text-blue-600">100문항</div>
                  <div className="text-sm text-gray-500">총 문항수</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">150분</div>
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
                    <li>• 2급 내용을 기반으로 심화 학습</li>
                    <li>• 이론 + 현장 적용 사례 연계 학습</li>
                    <li>• 최신 정책 및 트렌드 파악</li>
                    <li>• 기출문제 분석 및 오답노트 작성</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-700 mb-2">⏰ 시간 배분</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 과목당 약 37분 배분</li>
                    <li>• 어려운 문제는 표시 후 넘어가기</li>
                    <li>• 마지막 10분은 검토 시간</li>
                    <li>• OMR 마킹 실수 주의</li>
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
                  <div className="text-2xl font-bold text-pink-600">20분</div>
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
                <strong>시험 진행:</strong> 준비시간 10분 + 교육시연 10분 | 주제는 당일 현장에서 발표
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
                  <h3 className="font-bold text-pink-700 mb-2">건강증진 주제</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 금연 교육 프로그램</li>
                    <li>• 절주 및 음주 폐해 예방</li>
                    <li>• 신체활동 증진 교육</li>
                    <li>• 영양 및 비만 관리</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-700 mb-2">질병예방 주제</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 만성질환 예방 및 관리</li>
                    <li>• 감염병 예방 교육</li>
                    <li>• 정신건강 증진</li>
                    <li>• 구강건강 관리</li>
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
                    <li>• 다양한 주제로 시연 연습</li>
                    <li>• 10분 시간 엄수 훈련</li>
                    <li>• PPT 템플릿 준비</li>
                  </ul>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="font-bold text-blue-700 mb-2">시연 중</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 도입-전개-정리 구조화</li>
                    <li>• 시선 처리 및 제스처</li>
                    <li>• 참여자 상호작용 유도</li>
                  </ul>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="text-2xl mb-2">✅</div>
                  <h3 className="font-bold text-green-700 mb-2">주의사항</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 시간 초과 시 감점</li>
                    <li>• 준비물 미지참 주의</li>
                    <li>• 긴장 관리 필수</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 실기 학습 링크 */}
            <div className="text-center">
              <Link
                href="/category/medical/health-educator-1/study/practical"
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
