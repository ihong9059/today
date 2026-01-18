"use client";

import { useState } from "react";
import Link from "next/link";

export default function CookWesternPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const handleAIHelper = (topic: string) => {
    const prompt = `양식조리기능사 ${topic}에 대해 상세히 설명해주세요.

다음 순서로 답변해주세요:
1. 핵심 개념 정리
2. 시험 출제 포인트
3. 실무 적용 사례
4. 암기 팁
5. 관련 예상 문제 3개`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/service" className="text-gray-500 hover:text-gray-700">서비스</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 font-medium">양식조리기능사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl">
                <span className="text-6xl">🍝</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">양식조리기능사</h1>
                <p className="text-indigo-100 text-lg">Western Cuisine Cook Certificate</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">한국산업인력공단</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/category/service/cook-western/exam" className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg">시험 상세보기</Link>
              <Link href="/category/service/cook-western/study/food-hygiene" className="bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-800 transition">학습 시작하기</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-md p-5 text-center">
                <p className="text-gray-500 text-sm mb-1">난이도</p>
                <p className="text-2xl font-bold text-indigo-600">★★★☆☆</p>
                <p className="text-xs text-gray-400 mt-1">중간</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-5 text-center">
                <p className="text-gray-500 text-sm mb-1">연간 응시자</p>
                <p className="text-2xl font-bold text-indigo-600">약 8만명</p>
                <p className="text-xs text-gray-400 mt-1">인기 자격증</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-5 text-center">
                <p className="text-gray-500 text-sm mb-1">필기 합격률</p>
                <p className="text-2xl font-bold text-green-600">약 48%</p>
                <p className="text-xs text-gray-400 mt-1">2024년 기준</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-5 text-center">
                <p className="text-gray-500 text-sm mb-1">실기 합격률</p>
                <p className="text-2xl font-bold text-blue-600">약 32%</p>
                <p className="text-xs text-gray-400 mt-1">2024년 기준</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>양식조리기능사는 서양 요리를 위생적이고 안전하게 조리할 수 있는 전문 인력을 양성하기 위한 국가기술자격입니다.</p>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-bold text-indigo-800 mb-2">주요 업무</h3>
                  <ul className="text-sm space-y-1 text-indigo-700">
                    <li>• 서양 요리 메뉴 개발 및 조리</li>
                    <li>• 스톡, 소스 제조 및 관리</li>
                    <li>• 육류, 해산물, 채소 조리</li>
                    <li>• 위생 관리 및 조리기구 관리</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-blue-800 mb-2">취업 분야</h3>
                  <ul className="text-sm space-y-1 text-blue-700">
                    <li>• 호텔, 리조트 레스토랑</li>
                    <li>• 패밀리 레스토랑, 파인다이닝</li>
                    <li>• 단체급식 (학교, 기업, 병원)</li>
                    <li>• 케이터링, 연회 서비스</li>
                    <li>• 크루즈, 항공사 기내식</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📝</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {[
                  { name: "식품위생 및 법규", items: 15, difficulty: "중", tip: "식품위생법, HACCP, 식중독 집중", href: "/category/service/cook-western/study/food-hygiene", color: "red" },
                  { name: "식품학", items: 15, difficulty: "중상", tip: "영양소, 식품의 성분과 변화", href: "/category/service/cook-western/study/food-science", color: "green" },
                  { name: "조리이론과 원가계산", items: 15, difficulty: "중", tip: "양식 조리법, 원가계산 공식", href: "/category/service/cook-western/study/cooking-theory", color: "blue" },
                  { name: "공중보건학", items: 15, difficulty: "중하", tip: "전염병, 환경위생, 보건행정", href: "/category/service/cook-western/study/public-health", color: "purple" },
                ].map((subject, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 bg-${subject.color}-100 text-${subject.color}-600 rounded-lg flex items-center justify-center font-bold`}>{i + 1}</span>
                      <div>
                        <h3 className="font-bold text-gray-800">{subject.name}</h3>
                        <p className="text-sm text-gray-500">{subject.items}문항 | 난이도: {subject.difficulty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">💡 {subject.tip}</span>
                      <Link href={subject.href} className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">학습하기 →</Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-700"><strong>합격 기준:</strong> 과목당 40점 이상, 전과목 평균 60점 이상 (60문항 60분)</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-indigo-500">👨‍🍳</span> 실기시험 구성
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-5 border border-indigo-200">
                  <h3 className="font-bold text-indigo-800 mb-3">실기 개요</h3>
                  <ul className="text-sm space-y-2 text-indigo-700">
                    <li className="flex justify-between"><span>시험 형태</span><span className="font-medium">작업형</span></li>
                    <li className="flex justify-between"><span>시험 시간</span><span className="font-medium">70분 내외</span></li>
                    <li className="flex justify-between"><span>합격 기준</span><span className="font-medium">60점 이상</span></li>
                    <li className="flex justify-between"><span>응시료</span><span className="font-medium">29,600원</span></li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-5 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">출제 품목 (30종)</h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>수프:</strong> 콘소메, 포타주, 차우더</p>
                    <p><strong>소스:</strong> 브라운소스, 화이트소스</p>
                    <p><strong>육류:</strong> 스테이크, 커틀릿, 로스트</p>
                    <p><strong>해산물:</strong> 생선뫼니에르, 관자버터구이</p>
                    <p><strong>에그:</strong> 오믈렛, 수란, 스크램블</p>
                    <p><strong>샐러드:</strong> 시저, 발도프 등</p>
                  </div>
                </div>
              </div>
              <Link href="/category/service/cook-western/study/practical" className="mt-4 block text-center bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">실기 대비 학습하기 →</Link>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📚</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-indigo-200 rounded-lg p-4">
                  <h3 className="font-bold text-indigo-600 mb-3">🔰 비전공자 (8주 과정)</h3>
                  <ol className="text-sm space-y-2 text-gray-600">
                    <li className="flex gap-2"><span className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>공중보건학 (기초, 2주)</li>
                    <li className="flex gap-2"><span className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>식품위생 및 법규 (2주)</li>
                    <li className="flex gap-2"><span className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>식품학 (2주)</li>
                    <li className="flex gap-2"><span className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>조리이론과 원가계산 (2주)</li>
                  </ol>
                </div>
                <div className="border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-600 mb-3">🎓 전공자/경력자 (4주 과정)</h3>
                  <ol className="text-sm space-y-2 text-gray-600">
                    <li className="flex gap-2"><span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>식품위생법규 핵심 정리 (1주)</li>
                    <li className="flex gap-2"><span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>식품학 심화 (1주)</li>
                    <li className="flex gap-2"><span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>원가계산 공식 암기 (1주)</li>
                    <li className="flex gap-2"><span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>기출문제 집중 풀이 (1주)</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-indigo-100 mb-4">궁금한 주제를 선택하면 AI가 상세히 설명해드립니다.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["5대 모체 소스", "스톡 만들기", "스테이크 굽기", "루(Roux) 종류", "브레이징 기법", "에멀전 원리"].map((topic, i) => (
                  <button key={i} onClick={() => handleAIHelper(topic)} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-3 text-sm font-medium transition">{topic}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3">
                {[
                  { round: "1회", apply: "1.7~1.10", written: "2.1~2.15", practical: "3.15~4.5" },
                  { round: "2회", apply: "3.25~3.28", written: "4.19~5.3", practical: "5.31~6.21" },
                  { round: "3회", apply: "6.17~6.20", written: "7.12~7.26", practical: "8.23~9.13" },
                  { round: "4회", apply: "9.9~9.12", written: "10.11~10.25", practical: "11.22~12.13" },
                ].map((schedule, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-3 text-sm">
                    <div className="font-bold text-indigo-600 mb-1">{schedule.round}</div>
                    <div className="text-gray-600 space-y-0.5">
                      <p>접수: {schedule.apply}</p>
                      <p>필기: {schedule.written}</p>
                      <p>실기: {schedule.practical}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer" className="mt-4 block text-center text-indigo-600 hover:text-indigo-700 text-sm font-medium">큐넷에서 상세 일정 확인 →</a>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-indigo-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: "한식조리기능사", href: "/category/service/cook-korean" },
                  { name: "중식조리기능사", href: "/category/service/cook-chinese" },
                  { name: "일식조리기능사", href: "/category/service/cook-japanese" },
                  { name: "조리산업기사", href: "/category/service/cook-industrial" },
                ].map((cert, i) => (
                  <Link key={i} href={cert.href} className="block p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition text-sm text-gray-700 hover:text-indigo-600">{cert.name} →</Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📖</span> 추천 교재
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <p className="font-medium text-indigo-800">2026 양식조리기능사 필기</p>
                  <p className="text-indigo-600 text-xs">시대고시기획</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-800">양식조리기능사 실기</p>
                  <p className="text-blue-600 text-xs">크라운출판사</p>
                </div>
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <p className="font-medium text-cyan-800">르 꼬르동 블루 기초 요리</p>
                  <p className="text-cyan-600 text-xs">르 꼬르동 블루</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>

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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert("프롬프트가 복사되었습니다!"); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
