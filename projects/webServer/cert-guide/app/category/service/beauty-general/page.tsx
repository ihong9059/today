"use client";

import { useState } from "react";
import Link from "next/link";

export default function BeautyGeneralPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const aiQuestions = [
    "미용사(일반) 필기시험에서 가장 출제빈도가 높은 과목과 핵심 내용을 알려주세요.",
    "헤어 커트 기법 중 그라데이션 커트와 레이어 커트의 차이점과 적용법을 설명해주세요.",
    "펌 시술 시 약제의 작용 원리와 모발 손상을 최소화하는 방법을 알려주세요.",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              자격증
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/category/service"
              className="text-gray-500 hover:text-gray-700"
            >
              서비스
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-pink-600 font-medium">미용사(일반)</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-600 to-rose-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl">💇‍♀️</div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                미용사(일반)
              </h1>
              <p className="text-xl text-pink-100 mb-4">Hairdresser (General)</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  ⭐ 난이도: ★★★☆☆
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  👥 연간 약 8만명 응시
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  📊 합격률: 필기 55% / 실기 50%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-sm text-gray-500">필기시험</div>
                <div className="font-bold text-gray-900">60문항/60분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">✂️</div>
                <div className="text-sm text-gray-500">실기시험</div>
                <div className="font-bold text-gray-900">약 2시간</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-500">응시료</div>
                <div className="font-bold text-gray-900">필기 14,500원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">🏛️</div>
                <div className="text-sm text-gray-500">주관기관</div>
                <div className="font-bold text-gray-900">한국산업인력공단</div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong className="text-gray-900">미용사(일반)</strong>은 헤어
                  분야의 전문 미용 기술을 인정받는 국가기술자격으로, 샴푸,
                  헤어커트, 퍼머넌트 웨이브, 염색, 드라이, 헤어스타일링 등의
                  업무를 수행합니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-pink-50 rounded-xl p-4">
                    <h3 className="font-bold text-pink-800 mb-2">
                      💼 주요 업무
                    </h3>
                    <ul className="text-sm text-pink-700 space-y-1">
                      <li>• 두피 및 모발 상태 진단</li>
                      <li>• 헤어 커트(샤기, 레이어, 그라데이션 등)</li>
                      <li>• 퍼머넌트 웨이브(콜드펌, 열펌)</li>
                      <li>• 염색 및 탈색</li>
                      <li>• 드라이 및 스타일링</li>
                    </ul>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-4">
                    <h3 className="font-bold text-rose-800 mb-2">
                      🎯 취업 분야
                    </h3>
                    <ul className="text-sm text-rose-700 space-y-1">
                      <li>• 헤어 살롱(미용실)</li>
                      <li>• 호텔 뷰티샵</li>
                      <li>• 방송/영화/연극 스타일리스트</li>
                      <li>• 웨딩업체 헤어 담당</li>
                      <li>• 미용 교육 강사</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Exam Subjects - 필기 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-3">
                {[
                  {
                    name: "미용이론",
                    questions: 15,
                    desc: "미용의 역사, 미용기기, 모발 관리",
                    link: "/category/service/beauty-general/study/hair-theory",
                    difficulty: "★★★☆☆",
                  },
                  {
                    name: "두피·모발학",
                    questions: 15,
                    desc: "두피의 구조, 모발의 특성, 탈모",
                    link: "/category/service/beauty-general/study/scalp-hair",
                    difficulty: "★★★☆☆",
                  },
                  {
                    name: "헤어 커팅",
                    questions: 15,
                    desc: "커트 기법, 도구 사용법, 스타일링",
                    link: "/category/service/beauty-general/study/hair-cutting",
                    difficulty: "★★★★☆",
                  },
                  {
                    name: "헤어 펌·염색",
                    questions: 15,
                    desc: "펌 원리, 약제, 염모제, 탈색",
                    link: "/category/service/beauty-general/study/hair-perm",
                    difficulty: "★★★★☆",
                  },
                ].map((subject, idx) => (
                  <Link href={subject.link} key={idx}>
                    <div className="border border-gray-200 rounded-xl p-4 hover:border-pink-300 hover:bg-pink-50 transition cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {idx + 1}. {subject.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {subject.desc}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-pink-600 bg-pink-100 px-2 py-1 rounded-full">
                            {subject.questions}문항
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            {subject.difficulty}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  💡 <strong>합격 기준:</strong> 100점 만점에 60점 이상 (과락
                  40점 미만 없어야 함)
                </p>
              </div>
            </div>

            {/* Exam Subjects - 실기 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">✂️</span> 실기시험 구성
              </h2>
              <Link href="/category/service/beauty-general/study/practical">
                <div className="border border-gray-200 rounded-xl p-4 hover:border-pink-300 hover:bg-pink-50 transition cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        미용 실무 작업형
                      </h3>
                      <div className="text-sm text-gray-600 mt-2 space-y-1">
                        <p>• 헤어 커트 (그라데이션, 레이어, 원랭스 등)</p>
                        <p>• 블로우 드라이 (C컬, S컬 등)</p>
                        <p>• 아이론 (직모, 웨이브 등)</p>
                        <p>• 업스타일 (롤셋팅, 핀컬 등)</p>
                        <p>• 컬러링 (원터치, 새치염색, 탈색 등)</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-rose-600 bg-rose-100 px-2 py-1 rounded-full">
                        작업형
                      </span>
                      <div className="text-xs text-gray-500 mt-1">약 2시간</div>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="mt-4 p-4 bg-rose-50 rounded-xl">
                <p className="text-sm text-rose-700">
                  ⚠️ <strong>실기시험 주의:</strong> 마네킹(위그)를 직접 지참해야
                  하며, 지정된 도구 외에는 사용할 수 없습니다.
                </p>
              </div>
            </div>

            {/* Study Order */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📖</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-pink-700 flex items-center gap-2">
                    🌱 비전공자 / 입문자
                  </h3>
                  <ol className="space-y-2">
                    {[
                      "미용이론 - 기초 개념 확립",
                      "두피·모발학 - 모발 구조 이해",
                      "헤어 커팅 - 기초 기법부터",
                      "헤어 펌·염색 - 약품 이해",
                      "실기 연습 - 반복 훈련",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-rose-700 flex items-center gap-2">
                    🎓 전공자 / 실무 경험자
                  </h3>
                  <ol className="space-y-2">
                    {[
                      "헤어 펌·염색 - 약제 원리 심화",
                      "두피·모발학 - 문제 유형 파악",
                      "헤어 커팅 - 고급 기법",
                      "미용이론 - 역사/법규 암기",
                      "실기 마무리 - 시간 단축 연습",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* AI Learning Assistant */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-600 mb-4">
                AI에게 미용사(일반) 관련 질문을 해보세요. 아래 예시 질문을
                클릭하면 바로 AI에게 물어볼 수 있습니다.
              </p>
              <div className="space-y-2">
                {aiQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentPrompt(q);
                      setShowAIModal(true);
                    }}
                    className="w-full text-left p-3 bg-white rounded-xl border border-pink-200 hover:border-pink-400 hover:bg-pink-50 transition"
                  >
                    <span className="text-pink-500 mr-2">💬</span>
                    <span className="text-gray-700">{q}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exam Schedule */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3">
                {[
                  { round: "1회", apply: "1.2~1.8", test: "2.1~2.14" },
                  { round: "2회", apply: "4.1~4.7", test: "5.9~5.22" },
                  { round: "3회", apply: "6.24~6.30", test: "7.26~8.8" },
                  { round: "4회", apply: "9.2~9.8", test: "10.11~10.24" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-900">
                      {item.round}
                    </span>
                    <div className="text-right text-sm">
                      <div className="text-gray-500">접수: {item.apply}</div>
                      <div className="text-pink-600">시험: {item.test}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://www.q-net.or.kr/crf005.do?id=crf00503&gSite=Q&gId="
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full py-2 bg-pink-600 text-white text-center rounded-xl hover:bg-pink-700 transition"
              >
                큐넷에서 접수하기 →
              </a>
            </div>

            {/* Target Score */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">🎯</span> 과목별 목표 점수
              </h3>
              <div className="space-y-4">
                {[
                  { name: "미용이론", target: 70, color: "bg-pink-500" },
                  { name: "두피·모발학", target: 65, color: "bg-rose-500" },
                  { name: "헤어 커팅", target: 65, color: "bg-fuchsia-500" },
                  { name: "헤어 펌·염색", target: 60, color: "bg-purple-500" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="text-gray-900 font-medium">
                        {item.target}점
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.target}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                💡 평균 60점 이상, 과락 40점 미만 없어야 합격
              </p>
            </div>

            {/* Related Certifications */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: "미용사(피부)", link: "/category/service/beauty-skin" },
                  { name: "미용사(네일)", link: "/category/service/beauty-nail" },
                  { name: "미용사(메이크업)", link: "/category/service/beauty-makeup" },
                  { name: "이용사", link: "/category/service/barber" },
                ].map((cert, idx) => (
                  <Link key={idx} href={cert.link}>
                    <div className="p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition cursor-pointer">
                      <span className="text-gray-700">{cert.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recommended Books */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📚</span> 추천 교재
              </h3>
              <div className="space-y-3">
                {[
                  { title: "미용사(일반) 필기 기출문제집", publisher: "예문사" },
                  { title: "NCS 미용이론", publisher: "크라운출판사" },
                  { title: "헤어 커트 테크닉 완전정복", publisher: "광문각" },
                ].map((book, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900 text-sm">
                      {book.title}
                    </p>
                    <p className="text-xs text-gray-500">{book.publisher}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Detail Link */}
            <Link href="/category/service/beauty-general/exam">
              <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-2xl p-6 hover:from-pink-700 hover:to-rose-600 transition cursor-pointer">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  📋 시험 상세 정보
                </h3>
                <p className="text-sm text-pink-100">
                  필기/실기 상세 출제 기준과 합격 전략 보기 →
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                원하는 AI를 선택하세요:
              </p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"
                >
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"
                >
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"
                >
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentPrompt);
                  alert("프롬프트가 복사되었습니다!");
                }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition"
              >
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 자격증 가이드. 미용사(일반) 학습 페이지
          </p>
        </div>
      </footer>
    </div>
  );
}
