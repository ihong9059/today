'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ConstructionSafetyPage() {
  const [completedSubjects, setCompletedSubjects] = useState<Set<string>>(new Set());

  useEffect(() => {
    const subjects = ['safety-management', 'construction-safety', 'construction-materials', 'safety-law', 'practical'];
    const completed = new Set<string>();
    subjects.forEach(subject => {
      const saved = localStorage.getItem(`construction-safety-${subject}-completed`);
      if (saved) {
        const count = JSON.parse(saved).length;
        if (count >= 40) completed.add(subject);
      }
    });
    setCompletedSubjects(completed);
  }, []);

  const subjects = [
    { id: 'safety-management', name: '안전관리론', icon: '🛡️', desc: '안전관리 체계와 기법', questions: 50 },
    { id: 'construction-safety', name: '건설안전기술', icon: '🏗️', desc: '건설현장 안전관리', questions: 50 },
    { id: 'construction-materials', name: '건설재료학', icon: '🧱', desc: '건설재료의 특성과 활용', questions: 50 },
    { id: 'safety-law', name: '산업안전관계법규', icon: '⚖️', desc: '산업안전보건법 등', questions: 50 },
    { id: 'practical', name: '실기(필답형)', icon: '📝', desc: '건설안전 실무', questions: 25 },
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
            <span className="text-amber-600 font-medium">건설안전기사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="bg-white/20 backdrop-blur p-5 rounded-2xl">
              <span className="text-6xl">🦺</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">건설안전기사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-amber-100 text-lg mb-4">Construction Safety Engineer</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <span>⭐</span><span>난이도: ★★★☆☆</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <span>👥</span><span>연간 약 2.5만명 응시</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <span>📊</span><span>합격률: 필기 35% / 실기 45%</span>
                </div>
              </div>
            </div>
            <Link
              href="/category/construction/construction-safety/exam"
              className="bg-white text-amber-600 px-6 py-3 rounded-xl font-bold hover:bg-amber-50 transition shadow-lg"
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
            <div className="text-2xl mb-1">🔧</div>
            <div className="text-xs text-gray-500">실기시험</div>
            <div className="font-bold text-gray-800">필답형</div>
            <div className="text-xs text-gray-400">3시간</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl mb-1">💰</div>
            <div className="text-xs text-gray-500">응시료</div>
            <div className="font-bold text-gray-800">필기 19,400원</div>
            <div className="text-xs text-gray-400">실기 22,600원</div>
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
                <span className="text-amber-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                건설안전기사는 건설공사의 안전관리 계획수립, 위험요인 분석, 재해예방 대책 수립 등
                건설현장의 안전관리 업무를 수행하는 국가기술자격입니다. 산업안전보건법에 따라
                일정 규모 이상의 건설현장에는 안전관리자 선임이 의무화되어 있어 수요가 꾸준합니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-amber-50 rounded-lg p-4">
                  <h3 className="font-bold text-amber-700 mb-2">📌 주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 건설안전 관리계획 수립</li>
                    <li>• 작업환경 위험요소 분석</li>
                    <li>• 안전시설물 점검 및 관리</li>
                    <li>• 근로자 안전교육 실시</li>
                    <li>• 산업재해 예방 및 대응</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-bold text-orange-700 mb-2">💼 취업 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 종합건설업체 안전관리부</li>
                    <li>• 전문건설업체</li>
                    <li>• 안전관리 전문회사</li>
                    <li>• 건설감리회사</li>
                    <li>• 공공기관 안전담당</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 필기시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-amber-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {[
                  { name: '안전관리론', items: 25, topics: ['안전관리 조직', '재해예방이론', '위험성평가', 'KOSHA-MS'], difficulty: '중', tip: '개념 이해 중심' },
                  { name: '건설안전기술', items: 25, topics: ['가설공사', '굴착·발파공사', '콘크리트공사', '해체공사'], difficulty: '상', tip: '현장사례 암기 필수' },
                  { name: '건설재료학', items: 25, topics: ['시멘트·콘크리트', '금속재료', '목재·석재', '방수·단열재료'], difficulty: '중', tip: '재료 특성 비교' },
                  { name: '산업안전관계법규', items: 25, topics: ['산업안전보건법', '건설기술진흥법', '시행령·시행규칙', '안전보건기준'], difficulty: '중', tip: '최신 개정법령 확인' },
                ].map((subject, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-lg p-4 hover:border-amber-200 transition">
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
                <span className="text-amber-500">🔧</span> 실기시험 구성
              </h2>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl">📝</span>
                  <div>
                    <h3 className="font-bold text-gray-800">필답형 (작업형 없음)</h3>
                    <p className="text-sm text-gray-600">시험시간 3시간, 100점 만점 중 60점 이상 합격</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { area: '안전관리계획', percent: 30, items: ['작업별 위험성평가', '안전관리조직 구성', '비상대응계획'] },
                  { area: '가설공사 안전', percent: 25, items: ['비계·동바리 설계', '작업발판 설치기준', '안전시설물 점검'] },
                  { area: '건설기계 안전', percent: 20, items: ['타워크레인 안전', '굴착기 작업안전', '양중작업 계획'] },
                  { area: '재해사례 분석', percent: 25, items: ['재해원인 분석', '재발방지 대책', '법규 적용 판단'] },
                ].map((item, idx) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-800">{item.area}</span>
                      <span className="text-amber-600 font-bold">{item.percent}%</span>
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
                <span className="text-amber-500">📖</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-amber-400 pl-4">
                  <h3 className="font-bold text-gray-800 mb-3">비전공자 추천 (4개월)</h3>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2"><span className="bg-amber-100 text-amber-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">1</span><span>안전관리론 기초 (2주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-amber-100 text-amber-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">2</span><span>건설재료학 암기 (3주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-amber-100 text-amber-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">3</span><span>건설안전기술 (4주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-amber-100 text-amber-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">4</span><span>법규 + 기출문제 (3주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-amber-100 text-amber-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">5</span><span>실기 필답형 준비 (4주)</span></li>
                  </ol>
                </div>
                <div className="border-l-4 border-orange-400 pl-4">
                  <h3 className="font-bold text-gray-800 mb-3">전공자/경력자 (2개월)</h3>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2"><span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">1</span><span>기출문제 분석 (1주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">2</span><span>취약 과목 집중 (3주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">3</span><span>법규 최신개정 확인 (1주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-orange-100 text-orange-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">4</span><span>실기 기출 연습 (3주)</span></li>
                  </ol>
                </div>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-amber-100 mb-4">Claude, ChatGPT, Gemini와 함께 건설안전기사를 학습하세요!</p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  '가설공사에서 비계 설치 시 안전기준을 체크리스트로 정리해줘',
                  '위험성평가 4단계를 건설현장 사례와 함께 설명해줘',
                  '타워크레인 작업 시 재해유형과 예방대책을 알려줘',
                ].map((q, i) => (
                  <div key={i} className="bg-white/10 rounded-lg p-3 text-sm">
                    <span className="text-amber-200">💬</span> "{q}"
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
                <span className="text-amber-500">📚</span> 과목별 학습
              </h3>
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/construction/construction-safety/study/${subject.id}`}
                    className="block bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">{subject.name}</h4>
                          {completedSubjects.has(subject.id) && <span className="text-xs">✅</span>}
                        </div>
                        <p className="text-xs text-amber-100">{subject.desc}</p>
                      </div>
                      <span className="text-amber-200 text-sm">{subject.questions}문항</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-amber-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { round: '1회', apply: '1.7~1.13', written: '2.7~3.2', practical: '4.5~4.20' },
                  { round: '2회', apply: '3.25~3.31', written: '4.19~5.8', practical: '6.21~7.6' },
                  { round: '3회', apply: '6.10~6.16', written: '7.5~7.27', practical: '9.20~10.5' },
                ].map((schedule, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-2 last:border-0">
                    <div className="font-bold text-amber-600">{schedule.round}</div>
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
                <span className="text-amber-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '안전관리론', target: 70, color: 'bg-amber-500' },
                  { name: '건설안전기술', target: 65, color: 'bg-orange-500' },
                  { name: '건설재료학', target: 70, color: 'bg-yellow-500' },
                  { name: '법규', target: 75, color: 'bg-red-500' },
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
                <span className="text-amber-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '산업안전기사', desc: '전 산업분야 안전관리' },
                  { name: '건설안전산업기사', desc: '건설안전 하위 자격' },
                  { name: '토목기사', desc: '건설 실무 역량 강화' },
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
                <span className="text-amber-500">📖</span> 추천 교재
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { name: '2026 건설안전기사 필기', publisher: '성안당' },
                  { name: '건설안전기사 실기 완전정복', publisher: '예문사' },
                  { name: '산업안전보건법 해설', publisher: '고용노동부' },
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
