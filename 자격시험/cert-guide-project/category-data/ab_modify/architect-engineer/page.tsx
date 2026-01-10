'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ArchitectEngineerPage() {
  const [completedSubjects, setCompletedSubjects] = useState<Set<string>>(new Set());

  useEffect(() => {
    const subjects = ['building-planning', 'building-structure', 'building-equipment', 'building-construction', 'practical'];
    const completed = new Set<string>();
    subjects.forEach(subject => {
      const saved = localStorage.getItem(`architect-engineer-${subject}-completed`);
      if (saved) {
        const count = JSON.parse(saved).length;
        if (count >= 40) completed.add(subject);
      }
    });
    setCompletedSubjects(completed);
  }, []);

  const subjects = [
    { id: 'building-planning', name: '건축계획', icon: '📐', desc: '건축물 기획 및 계획', questions: 50 },
    { id: 'building-structure', name: '건축구조', icon: '🏗️', desc: '건축물 구조 설계', questions: 50 },
    { id: 'building-equipment', name: '건축설비', icon: '🔧', desc: '급배수, 냉난방, 환기', questions: 50 },
    { id: 'building-construction', name: '건축시공', icon: '👷', desc: '건축물 시공 관리', questions: 50 },
    { id: 'practical', name: '실기(작업형)', icon: '✍️', desc: '건축설계 및 적산', questions: 25 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction" className="text-gray-500 hover:text-gray-700">건축·토목</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">건축기사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="bg-white/20 backdrop-blur p-5 rounded-2xl">
              <span className="text-6xl">🏛️</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">건축기사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-orange-100 text-lg mb-4">Architect Engineer</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <span>⭐</span><span>난이도: ★★★★☆</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <span>👥</span><span>연간 약 4만명 응시</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <span>📊</span><span>합격률: 필기 30% / 실기 25%</span>
                </div>
              </div>
            </div>
            <Link
              href="/category/construction/architect-engineer/exam"
              className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition shadow-lg"
            >
              시험 상세정보 →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl mb-1">📝</div>
            <div className="text-xs text-gray-500">필기시험</div>
            <div className="font-bold text-gray-800">4과목 100문항</div>
            <div className="text-xs text-gray-400">2시간 30분</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl mb-1">✍️</div>
            <div className="text-xs text-gray-500">실기시험</div>
            <div className="font-bold text-gray-800">필답형+작업형</div>
            <div className="text-xs text-gray-400">약 6시간</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl mb-1">💰</div>
            <div className="text-xs text-gray-500">응시료</div>
            <div className="font-bold text-gray-800">필기 19,400원</div>
            <div className="text-xs text-gray-400">실기 27,600원</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl mb-1">🏛️</div>
            <div className="text-xs text-gray-500">주관기관</div>
            <div className="font-bold text-gray-800">한국산업인력공단</div>
            <div className="text-xs text-gray-400">Q-Net</div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* 자격 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                건축기사는 건축물의 계획, 설계, 시공, 감리 등에 관한 전문지식과 기술을 갖추고,
                건축물의 안전하고 기능적인 설계와 시공을 담당하는 국가기술자격입니다.
                건축사사무소, 건설회사, 공공기관 등에서 건축 실무를 수행합니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-bold text-orange-700 mb-2">📌 주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 건축물 설계 및 도면 작성</li>
                    <li>• 건축 구조 계산 및 검토</li>
                    <li>• 시공 현장 관리 및 감독</li>
                    <li>• 건축 적산 및 견적 작성</li>
                    <li>• 건축법규 검토 및 인허가</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-red-700 mb-2">💼 취업 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 건축설계사무소</li>
                    <li>• 종합건설회사</li>
                    <li>• 공공기관 건축직</li>
                    <li>• 감리회사</li>
                    <li>• 건축시공업체</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 필기시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {[
                  { name: '건축계획', items: 25, topics: ['건축계획 각론', '주거건축', '상업건축', '공공건축'], difficulty: '중', tip: '각 건물 유형별 특성 암기' },
                  { name: '건축구조', items: 25, topics: ['구조역학', '철근콘크리트', '철골구조', '기초구조'], difficulty: '상', tip: '구조계산 공식 숙지 필수' },
                  { name: '건축설비', items: 25, topics: ['급배수설비', '냉난방설비', '환기·공조', '전기·조명'], difficulty: '중', tip: '설비 시스템 이해 중심' },
                  { name: '건축시공', items: 25, topics: ['가설공사', '철근콘크리트공사', '마감공사', '적산·견적'], difficulty: '중', tip: '시공 순서와 품질관리 암기' },
                ].map((subject, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-lg p-4 hover:border-orange-200 transition">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{idx + 1}과목: {subject.name}</h3>
                      <span className="text-sm text-gray-500">{subject.items}문항</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {subject.topics.map((topic, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{topic}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>난이도: {subject.difficulty}</span>
                      <span>💡 {subject.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 실기시험 구성 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">✍️</span> 실기시험 구성
              </h2>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl">📐</span>
                  <div>
                    <h3 className="font-bold text-gray-800">필답형 + 작업형 (복합형)</h3>
                    <p className="text-sm text-gray-600">시험시간 약 6시간, 100점 만점 중 60점 이상 합격</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { area: '건축설계 도면', percent: 40, items: ['평면도 작성', '입면도 작성', '단면도 작성'] },
                  { area: '건축적산', percent: 25, items: ['수량산출', '단가적용', '견적서 작성'] },
                  { area: '구조계산', percent: 20, items: ['보·기둥 설계', '하중산정', '철근배근'] },
                  { area: '설비계획', percent: 15, items: ['급배수계획', '냉난방부하', '환기설비'] },
                ].map((item, idx) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-800">{item.area}</span>
                      <span className="text-orange-600 font-bold">{item.percent}%</span>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {item.items.map((i, j) => (
                        <li key={j}>• {i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 공부 순서 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📖</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-orange-400 pl-4">
                  <h3 className="font-bold text-gray-800 mb-3">비전공자 추천 (6개월)</h3>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2"><span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">1</span><span>건축계획 기초 (3주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">2</span><span>건축구조 이론 (5주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">3</span><span>건축설비 이해 (3주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">4</span><span>건축시공 암기 (4주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">5</span><span>기출문제 풀이 (3주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">6</span><span>실기 도면연습 (6주)</span></li>
                  </ol>
                </div>
                <div className="border-l-4 border-red-400 pl-4">
                  <h3 className="font-bold text-gray-800 mb-3">전공자/경력자 (3개월)</h3>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2"><span className="bg-red-100 text-red-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">1</span><span>기출문제 분석 (1주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-red-100 text-red-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">2</span><span>취약 과목 집중 (4주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-red-100 text-red-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">3</span><span>구조계산 연습 (2주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-red-100 text-red-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">4</span><span>실기 도면 집중 (5주)</span></li>
                  </ol>
                </div>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-orange-100 mb-4">Claude, ChatGPT, Gemini와 함께 건축기사를 학습하세요!</p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  '철근콘크리트 보의 설계 순서를 단계별로 설명해줘',
                  '건축계획에서 동선계획의 원칙과 유형을 정리해줘',
                  '건축설비에서 냉난방 부하 계산 방법을 알려줘',
                ].map((q, i) => (
                  <div key={i} className="bg-white/10 rounded-lg p-3 text-sm">
                    <span className="text-orange-200">💬</span> "{q}"
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 과목별 학습 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📚</span> 과목별 학습
              </h3>
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/construction/architect-engineer/study/${subject.id}`}
                    className="block bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">{subject.name}</h4>
                          {completedSubjects.has(subject.id) && <span className="text-xs">✅</span>}
                        </div>
                        <p className="text-xs text-orange-100">{subject.desc}</p>
                      </div>
                      <span className="text-orange-200 text-sm">{subject.questions}문항</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { round: '1회', apply: '1.7~1.13', written: '2.7~3.2', practical: '4.5~4.20' },
                  { round: '2회', apply: '3.25~3.31', written: '4.19~5.8', practical: '6.21~7.6' },
                  { round: '3회', apply: '6.10~6.16', written: '7.5~7.27', practical: '9.20~10.5' },
                ].map((schedule, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-2 last:border-0">
                    <div className="font-bold text-orange-600">{schedule.round}</div>
                    <div className="text-gray-500">원서접수: {schedule.apply}</div>
                    <div className="text-gray-500">필기: {schedule.written}</div>
                    <div className="text-gray-500">실기: {schedule.practical}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 과목별 목표점수 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '건축계획', target: 70, color: 'bg-orange-500' },
                  { name: '건축구조', target: 65, color: 'bg-red-500' },
                  { name: '건축설비', target: 70, color: 'bg-amber-500' },
                  { name: '건축시공', target: 75, color: 'bg-yellow-500' },
                ].map((subject, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{subject.name}</span>
                      <span className="font-bold text-gray-800">{subject.target}점</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${subject.color} h-2 rounded-full`} style={{ width: `${subject.target}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">※ 평균 60점 이상, 과목당 40점 이상</p>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '건축사', desc: '건축설계 최상위 자격' },
                  { name: '실내건축기사', desc: '인테리어 설계 전문' },
                  { name: '건설안전기사', desc: '건설현장 안전관리' },
                ].map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <span className="text-xl">📜</span>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{cert.name}</div>
                      <div className="text-xs text-gray-500">{cert.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📖</span> 추천 교재
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { name: '2026 건축기사 필기 한권끝장', publisher: '성안당' },
                  { name: '건축기사 실기 완전정복', publisher: '예문사' },
                  { name: '건축구조학', publisher: '기문당' },
                ].map((book, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <span className="text-gray-700">{book.name}</span>
                    <span className="text-xs text-gray-400">{book.publisher}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">본 사이트는 자격시험 정보 제공 목적으로 운영됩니다.</p>
        </div>
      </footer>
    </div>
  );
}
