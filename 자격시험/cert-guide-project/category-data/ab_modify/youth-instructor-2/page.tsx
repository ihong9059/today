'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function YouthInstructor2Page() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const subjects = [
    { id: 'youth-policy', name: '청소년육성제도론', icon: '📋', description: '청소년 정책, 법규, 제도의 이해', difficulty: '중', passRate: '48%' },
    { id: 'instruction-method', name: '청소년지도방법론', icon: '🎓', description: '프로그램 기획, 운영, 평가 방법', difficulty: '중', passRate: '45%' },
    { id: 'psychology-counseling', name: '청소년심리및상담', icon: '🧠', description: '발달심리, 상담이론, 문제행동 이해', difficulty: '상', passRate: '42%' },
    { id: 'youth-culture', name: '청소년문화', icon: '🎭', description: '청소년 문화현상, 미디어, 여가활동', difficulty: '중', passRate: '50%' },
    { id: 'youth-activity', name: '청소년활동', icon: '⚽', description: '체험활동, 봉사활동, 국제교류', difficulty: '중', passRate: '47%' },
  ];

  const examInfo = [
    { label: '필기시험', value: '5과목', sub: '과목당 20문항, 총 100문항' },
    { label: '면접시험', value: '구술면접', sub: '실무능력 및 자질 평가' },
    { label: '응시료', value: '필기 18,000원', sub: '면접 20,000원' },
    { label: '시행기관', value: '한국산업인력공단', sub: '청소년 정책관리원' },
  ];

  const studyOrder = [
    { step: 1, subject: '청소년육성제도론', tip: '법령과 정책의 기본 틀을 먼저 이해하세요', weeks: '3주' },
    { step: 2, subject: '청소년심리및상담', tip: '발달이론과 상담기법은 면접에도 출제됩니다', weeks: '4주' },
    { step: 3, subject: '청소년지도방법론', tip: '프로그램 기획 단계를 순서대로 암기하세요', weeks: '3주' },
    { step: 4, subject: '청소년문화', tip: '최신 트렌드와 미디어 관련 이슈를 정리하세요', weeks: '2주' },
    { step: 5, subject: '청소년활동', tip: '활동 유형별 특성과 운영 방법을 정리하세요', weeks: '2주' },
    { step: 6, subject: '면접 준비', tip: '예상 질문과 답변을 미리 연습하세요', weeks: '2주' },
  ];

  const aiPrompts = [
    '청소년기본법의 주요 조항과 청소년지도사의 역할에 대해 설명해주세요.',
    '에릭슨의 청소년기 정체성 발달이론을 쉽게 설명하고 지도 적용 방안을 알려주세요.',
    '청소년 프로그램 기획의 5단계와 각 단계별 핵심 포인트를 정리해주세요.',
  ];

  const relatedCerts = [
    { name: '청소년지도사 1급', path: '/category/education/youth-instructor-1' },
    { name: '청소년지도사 3급', path: '/category/education/youth-instructor-3' },
    { name: '청소년상담사 2급', path: '/category/welfare/youth-counselor-2' },
    { name: '사회복지사 2급', path: '/category/welfare/social-worker-2' },
  ];

  const schedule2026 = [
    { round: '1회', apply: '3월 초', written: '5월 중순', interview: '7월', result: '8월' },
    { round: '2회', apply: '8월 초', written: '10월 중순', interview: '12월', result: '익년 1월' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-500 hover:text-gray-700">교육</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">청소년지도사 2급</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="bg-white/20 backdrop-blur p-6 rounded-2xl">
              <span className="text-6xl">🎯</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">청소년지도사 2급</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가자격증</span>
              </div>
              <p className="text-green-100 text-lg mb-4">Youth Instructor Level 2</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">★★★☆☆</span>
                  <span>난이도</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 약 8,000명 응시</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>합격률 필기 45% / 면접 75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {examInfo.map((info, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition">
              <p className="text-xs text-gray-500 mb-1">{info.label}</p>
              <p className="text-lg font-bold text-green-600">{info.value}</p>
              <p className="text-xs text-gray-400 mt-1">{info.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* 자격 개요 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  <strong className="text-gray-800">청소년지도사</strong>는 「청소년기본법」 제21조에 따른 국가자격으로,
                  청소년활동(수련활동, 교류활동, 문화활동 등)을 전담하여 지도하는 전문 인력입니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-2">주요 업무</h4>
                    <ul className="text-sm space-y-1 text-green-700">
                      <li>• 청소년 수련활동 프로그램 기획·운영</li>
                      <li>• 청소년 상담 및 생활지도</li>
                      <li>• 청소년단체 활동 지도</li>
                      <li>• 청소년 교류·봉사활동 지원</li>
                    </ul>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-4">
                    <h4 className="font-bold text-teal-800 mb-2">취업 분야</h4>
                    <ul className="text-sm space-y-1 text-teal-700">
                      <li>• 청소년수련관, 청소년문화의집</li>
                      <li>• 청소년상담복지센터</li>
                      <li>• 학교 밖 청소년 지원센터</li>
                      <li>• 청소년단체, 청소년쉼터</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 필기시험 과목 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/education/youth-instructor-2/study/${subject.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-2xl text-white shadow-md">
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-800">{subject.name}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">20문항</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{subject.description}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-gray-400">난이도 <span className="text-green-600 font-medium">{subject.difficulty}</span></p>
                      <p className="text-gray-400">합격률 <span className="text-green-600 font-medium">{subject.passRate}</span></p>
                    </div>
                    <span className="text-green-500 group-hover:translate-x-1 transition">→</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>💡 합격 기준:</strong> 각 과목 40점 이상, 전 과목 평균 60점 이상
                </p>
              </div>
            </div>

            {/* 면접시험 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎤</span> 면접시험 (2차)
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-2">평가 영역</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 청소년 정책 및 사업 이해도</li>
                      <li>• 지도자로서의 품성과 자질</li>
                      <li>• 청소년 지도 전문성</li>
                      <li>• 의사소통 능력</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-2">면접 형식</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 구술면접 (개별 면접)</li>
                      <li>• 소요시간: 약 15~20분</li>
                      <li>• 면접위원: 2~3인</li>
                      <li>• 합격기준: 평균 60점 이상</li>
                    </ul>
                  </div>
                </div>
                <Link
                  href="/category/education/youth-instructor-2/study/practical"
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-green-300 hover:border-green-400 hover:bg-green-50 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl text-white">
                    🎯
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">면접 대비 학습</h3>
                    <p className="text-sm text-gray-500">예상 질문과 모범 답안으로 준비하세요</p>
                  </div>
                  <span className="text-green-500">→</span>
                </Link>
              </div>
            </div>

            {/* 추천 공부 순서 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📖</span> 추천 공부 순서
              </h2>
              <div className="relative">
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-green-200"></div>
                <div className="space-y-4">
                  {studyOrder.map((item) => (
                    <div key={item.step} className="flex items-start gap-4 relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-md z-10">
                        {item.step}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-gray-800">{item.subject}</h4>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{item.weeks}</span>
                        </div>
                        <p className="text-sm text-gray-600">{item.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI 학습 도우미 */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
              <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🤖</span> AI 학습 도우미
              </h2>
              <p className="text-green-700 mb-4">AI에게 청소년지도사 관련 질문을 해보세요!</p>
              <div className="space-y-2">
                {aiPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setCurrentPrompt(prompt); setShowAIModal(true); }}
                    className="w-full text-left p-3 bg-white rounded-lg hover:bg-green-100 transition text-sm text-gray-700 border border-green-200"
                  >
                    💬 {prompt}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">🧡 Claude</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">💚 ChatGPT</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">💙 Gemini</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-4">
                {schedule2026.map((item) => (
                  <div key={item.round} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-green-600 mb-2">{item.round}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <p>접수: {item.apply}</p>
                      <p>필기: {item.written}</p>
                      <p>면접: {item.interview}</p>
                      <p>발표: {item.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 과목별 목표점수 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <div key={subject.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{subject.name}</span>
                      <span className="text-green-600 font-medium">70점</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                ))}
                <hr className="my-3" />
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">평균 목표</span>
                  <span className="font-bold text-green-600">70점 이상</span>
                </div>
              </div>
            </div>

            {/* 응시자격 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📌</span> 응시자격
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-800">학력 요건 (택1)</p>
                  <ul className="text-green-700 mt-1 space-y-1">
                    <li>• 대학 관련학과 졸업(예정)자</li>
                    <li>• 2년제 관련학과 + 관련분야 2년 경력</li>
                    <li>• 3급 청소년지도사 + 3년 경력</li>
                  </ul>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <p className="font-medium text-teal-800">비관련 학과 졸업자</p>
                  <ul className="text-teal-700 mt-1 space-y-1">
                    <li>• 대학 졸업 + 청소년학 관련 과목 이수</li>
                    <li>• 필수 8과목 이수 필요</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {relatedCerts.map((cert) => (
                  <Link
                    key={cert.name}
                    href={cert.path}
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition text-sm text-gray-700"
                  >
                    {cert.name} →
                  </Link>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📚</span> 추천 교재
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">시대에듀 청소년지도사 2급</p>
                  <p className="text-gray-500">이론 + 기출문제 통합</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">에듀윌 청소년지도사 한권끝장</p>
                  <p className="text-gray-500">핵심요약 + 적중예상</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/category/education/youth-instructor-2/exam"
              className="block w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white text-center rounded-xl font-bold hover:opacity-90 transition shadow-lg"
            >
              📝 시험 상세 정보 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">청소년지도사 시험 정보는 한국산업인력공단 및 여성가족부 공고를 참조하세요.</p>
        </div>
      </footer>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                      className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
