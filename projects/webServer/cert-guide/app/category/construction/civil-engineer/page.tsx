'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CivilEngineerPage() {
  const [completedSubjects, setCompletedSubjects] = useState<Set<string>>(new Set());

  useEffect(() => {
    const subjects = ['applied-mechanics', 'surveying', 'hydraulics', 'soil-mechanics', 'reinforced-concrete', 'practical'];
    const completed = new Set<string>();
    subjects.forEach(subject => {
      const saved = localStorage.getItem(`civil-engineer-${subject}-completed`);
      if (saved) {
        const count = JSON.parse(saved).length;
        if (count >= 40) completed.add(subject);
      }
    });
    setCompletedSubjects(completed);
  }, []);

  const subjects = [
    { id: 'applied-mechanics', name: '응용역학', icon: '⚙️', desc: '재료역학, 구조역학', questions: 50 },
    { id: 'surveying', name: '측량학', icon: '📐', desc: '지형측량, GPS 측량', questions: 50 },
    { id: 'hydraulics', name: '수리학', icon: '💧', desc: '수리·수문학', questions: 50 },
    { id: 'soil-mechanics', name: '토질 및 기초', icon: '🏔️', desc: '토질역학, 기초공학', questions: 50 },
    { id: 'reinforced-concrete', name: '철근콘크리트', icon: '🏗️', desc: '철근콘크리트 및 강구조', questions: 50 },
    { id: 'practical', name: '실기(필답형)', icon: '✍️', desc: '토목설계 및 시공', questions: 25 },
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
            <span className="text-teal-600 font-medium">토목기사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="bg-white/20 backdrop-blur p-5 rounded-2xl">
              <span className="text-6xl">🌉</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">토목기사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-teal-100 text-lg mb-4">Civil Engineer</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <span>⭐</span><span>난이도: ★★★★☆</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <span>👥</span><span>연간 약 3.5만명 응시</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <span>📊</span><span>합격률: 필기 25% / 실기 30%</span>
                </div>
              </div>
            </div>
            <Link
              href="/category/construction/civil-engineer/exam"
              className="bg-white text-teal-600 px-6 py-3 rounded-xl font-bold hover:bg-teal-50 transition shadow-lg"
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
            <div className="font-bold text-gray-800">5과목 125문항</div>
            <div className="text-xs text-gray-400">3시간</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl mb-1">✍️</div>
            <div className="text-xs text-gray-500">실기시험</div>
            <div className="font-bold text-gray-800">필답형</div>
            <div className="text-xs text-gray-400">약 3시간</div>
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
                <span className="text-teal-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                토목기사는 도로, 교량, 항만, 터널, 댐 등 사회기반시설의 계획, 설계, 시공, 감리 등에
                관한 전문지식과 기술을 갖추고, 안전하고 경제적인 토목구조물의 건설을 담당하는
                국가기술자격입니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-teal-50 rounded-lg p-4">
                  <h3 className="font-bold text-teal-700 mb-2">📌 주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 도로·교량 설계 및 시공</li>
                    <li>• 터널·지하구조물 설계</li>
                    <li>• 항만·하천 구조물 설계</li>
                    <li>• 지반조사 및 기초 설계</li>
                    <li>• 측량 및 공정관리</li>
                  </ul>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4">
                  <h3 className="font-bold text-cyan-700 mb-2">💼 취업 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 종합건설회사</li>
                    <li>• 토목설계사무소</li>
                    <li>• 공공기관(도로공사, 철도공단)</li>
                    <li>• 감리회사</li>
                    <li>• 지방자치단체 토목직</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 필기시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-teal-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {[
                  { name: '응용역학', items: 25, topics: ['재료역학', '구조역학', '정정·부정정', '트러스'], difficulty: '상', tip: '공식 암기와 계산 연습 필수' },
                  { name: '측량학', items: 25, topics: ['평면측량', '지형측량', 'GPS측량', '사진측량'], difficulty: '중', tip: '측량기기와 오차보정 이해' },
                  { name: '수리학', items: 25, topics: ['정수역학', '동수역학', '관수로', '개수로'], difficulty: '상', tip: '수리공식 유도과정 이해' },
                  { name: '토질 및 기초', items: 25, topics: ['흙의 성질', '토압', '사면안정', '기초'], difficulty: '중', tip: '현장 적용사례 연계' },
                  { name: '철근콘크리트 및 강구조', items: 25, topics: ['RC설계', '강구조설계', '용접접합', 'PSC'], difficulty: '중', tip: '설계기준 숙지' },
                ].map((subject, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-lg p-4 hover:border-teal-200 transition">
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
                <span className="text-teal-500">✍️</span> 실기시험 구성
              </h2>
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl">📝</span>
                  <div>
                    <h3 className="font-bold text-gray-800">필답형 (서술형)</h3>
                    <p className="text-sm text-gray-600">시험시간 약 3시간, 100점 만점 중 60점 이상 합격</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { area: '구조설계', percent: 30, items: ['RC보·슬래브 설계', '강재접합부 설계', '기둥 단면 설계'] },
                  { area: '토질·기초', percent: 25, items: ['지지력 산정', '침하량 계산', '흙막이 설계'] },
                  { area: '측량·수리', percent: 25, items: ['측량계산', '수리계산', '유량 산정'] },
                  { area: '시공·적산', percent: 20, items: ['공정관리', '물량산출', '품질관리'] },
                ].map((item, idx) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-800">{item.area}</span>
                      <span className="text-teal-600 font-bold">{item.percent}%</span>
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
                <span className="text-teal-500">📖</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-teal-400 pl-4">
                  <h3 className="font-bold text-gray-800 mb-3">비전공자 추천 (6개월)</h3>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2"><span className="bg-teal-100 text-teal-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">1</span><span>응용역학 기초 (4주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-teal-100 text-teal-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">2</span><span>측량학 이론 (3주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-teal-100 text-teal-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">3</span><span>수리학 공식 (4주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-teal-100 text-teal-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">4</span><span>토질 및 기초 (4주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-teal-100 text-teal-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">5</span><span>철근콘크리트 (3주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-teal-100 text-teal-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">6</span><span>기출문제 + 실기 (6주)</span></li>
                  </ol>
                </div>
                <div className="border-l-4 border-cyan-400 pl-4">
                  <h3 className="font-bold text-gray-800 mb-3">전공자/경력자 (3개월)</h3>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2"><span className="bg-cyan-100 text-cyan-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">1</span><span>기출문제 분석 (1주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-cyan-100 text-cyan-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">2</span><span>취약 과목 집중 (4주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-cyan-100 text-cyan-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">3</span><span>계산문제 연습 (3주)</span></li>
                    <li className="flex items-start gap-2"><span className="bg-cyan-100 text-cyan-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">4</span><span>실기 기출 연습 (4주)</span></li>
                  </ol>
                </div>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-teal-100 mb-4">Claude, ChatGPT, Gemini와 함께 토목기사를 학습하세요!</p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  '단순보에서 등분포하중 시 최대 휨모멘트 계산과정을 알려줘',
                  '토압계수의 종류와 각각의 적용 조건을 설명해줘',
                  '베르누이 정리를 실제 수리계산에 적용하는 방법을 알려줘',
                ].map((q, i) => (
                  <div key={i} className="bg-white/10 rounded-lg p-3 text-sm">
                    <span className="text-teal-200">💬</span> "{q}"
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
                <span className="text-teal-500">📚</span> 과목별 학습
              </h3>
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/construction/civil-engineer/study/${subject.id}`}
                    className="block bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">{subject.name}</h4>
                          {completedSubjects.has(subject.id) && <span className="text-xs">✅</span>}
                        </div>
                        <p className="text-xs text-teal-100">{subject.desc}</p>
                      </div>
                      <span className="text-teal-200 text-sm">{subject.questions}문항</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-teal-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { round: '1회', apply: '1.7~1.13', written: '2.7~3.2', practical: '4.5~4.20' },
                  { round: '2회', apply: '3.25~3.31', written: '4.19~5.8', practical: '6.21~7.6' },
                  { round: '3회', apply: '6.10~6.16', written: '7.5~7.27', practical: '9.20~10.5' },
                ].map((schedule, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-2 last:border-0">
                    <div className="font-bold text-teal-600">{schedule.round}</div>
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
                <span className="text-teal-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '응용역학', target: 60, color: 'bg-teal-500' },
                  { name: '측량학', target: 70, color: 'bg-cyan-500' },
                  { name: '수리학', target: 60, color: 'bg-blue-500' },
                  { name: '토질 및 기초', target: 65, color: 'bg-emerald-500' },
                  { name: '철근콘크리트', target: 65, color: 'bg-green-500' },
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
                <span className="text-teal-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '건축기사', desc: '건축 분야 확장' },
                  { name: '측량및지형공간정보기사', desc: '측량 전문화' },
                  { name: '건설안전기사', desc: '현장안전관리' },
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
                <span className="text-teal-500">📖</span> 추천 교재
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { name: '2026 토목기사 필기 한권끝장', publisher: '성안당' },
                  { name: '토목기사 실기 완전정복', publisher: '예문사' },
                  { name: '토목기사 응용역학', publisher: '일진사' },
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
