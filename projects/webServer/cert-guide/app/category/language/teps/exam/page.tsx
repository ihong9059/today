'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TEPSExamPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const examParts = [
    {
      title: "청해 (Listening) - 40문항, 40분",
      content: `Part 1: 한 문장 듣고 응답 (10문항)
• 짧은 문장을 듣고 가장 적절한 응답 선택
• 의문사별 응답 패턴 숙지 필요
• 시제/주어 일치 확인
• 간접 응답 유형 주의

Part 2: 짧은 대화 (10문항)
• 2~3개의 대화 턴으로 구성
• 마지막 발화에 대한 응답 선택
• 상황/장소 추론 문제
• 화자 관계/의도 파악

Part 3: 긴 대화 (10문항)
• 4~5개의 대화 턴으로 구성
• 대화 주제/목적 파악
• 세부 정보 확인 문제
• 추론/암시 문제

Part 4: 담화 (10문항)
• 강의, 뉴스, 안내문 등 독백
• 주제/요지 파악
• 세부 정보 확인
• 화자 의도/태도 추론

청해 배점: 총 240점`
    },
    {
      title: "어휘 (Vocabulary) - 30문항, 25분",
      content: `Part 1: 대화문 빈칸 (15문항)
• 짧은 대화에서 빈칸에 들어갈 어휘 선택
• 구어체/관용표현 출제
• 상황에 맞는 어휘 선택
• Collocation(연어) 문제

예시:
A: How was your job interview?
B: I think I really _____ it up.

Part 2: 단문 빈칸 (15문항)
• 단문에서 빈칸에 들어갈 어휘 선택
• 문어체/학술 어휘 출제
• 문맥상 적절한 어휘 선택
• 동의어/유의어 구분

예시:
The new policy was designed to _____ economic growth.

어휘 배점: 총 60점
문항당 약 50초 배분`
    },
    {
      title: "문법 (Grammar) - 30문항, 25분",
      content: `Part 1: 대화문 빈칸 (15문항)
• 대화 상황에서 문법적으로 적절한 표현 선택
• 구어체 문법 특징 (생략, 도치 등)
• 시제/조동사 문제
• 의문문/응답 패턴

예시:
A: Do you know when the meeting starts?
B: I'm not sure, but it _____ at 3 o'clock.

Part 2: 단문 빈칸 (15문항)
• 문법적으로 올바른 표현 선택
• 문장 구조 분석 필요
• 시제/태/법 문제
• 수일치/관계사/접속사

예시:
The report, _____ was submitted last week, contains several errors.

주요 출제 문법:
• 시제 (완료시제 포함)
• 조동사 (추측/의무/가능)
• 관계사 (관계대명사/관계부사)
• 가정법 (과거/과거완료)
• 분사구문
• 도치/강조

문법 배점: 총 60점`
    },
    {
      title: "독해 (Reading) - 35문항, 40분",
      content: `Part 1: 빈칸 완성 (10문항)
• 지문 내 빈칸에 적절한 어구/문장 선택
• 글의 논리적 흐름 파악
• 연결어/접속사 활용
• 전후 문맥 단서 활용

Part 2: 독해 (25문항)
• 다양한 유형의 지문 독해
• 주제/요지 파악 (Main Idea)
• 세부 정보 확인 (Detail)
• 추론 문제 (Inference)
• NOT/TRUE 문제

지문 유형:
• 설명문 (Expository)
• 논설문 (Argumentative)
• 기사문 (News Article)
• 실용문 (Practical)

독해 전략:
• 첫 문장/마지막 문장 주목
• 전환어(However, Therefore 등) 주의
• 대명사 지시 대상 확인
• 시간 배분: 지문당 3~4분

독해 배점: 총 240점`
    },
    {
      title: "점수 환산 및 등급",
      content: `점수 구성:
• 청해: 240점 (40%)
• 어휘: 60점 (10%)
• 문법: 60점 (10%)
• 독해: 240점 (40%)
• 총점: 600점

등급별 점수:
• 1+ 등급: 526~600점 (원어민 수준)
• 1 등급: 453~525점 (고급)
• 2+ 등급: 387~452점 (중상급)
• 2 등급: 327~386점 (중급)
• 3+ 등급: 268~326점 (중하급)
• 3 등급: 212~267점 (초급)
• 4+ 등급: 163~211점
• 4 등급: 0~162점

공무원 영어대체 기준:
• 5급 공채: 340점 이상
• 7급 공채: 340점 이상
• 9급 공채: 268점 이상
• 경찰/소방: 268점 이상
• 국가정보원: 340점 이상`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/teps" className="text-sky-600 hover:text-sky-800 flex items-center gap-2">
            <span>←</span>
            <span>TEPS로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">TEPS 시험 안내</h1>
          <p className="text-gray-600">New TEPS 영역별 구성 및 점수 체계</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">🎧</div>
            <div className="text-sm text-gray-500">청해</div>
            <div className="font-bold text-sky-600">40문항 / 240점</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-sm text-gray-500">어휘</div>
            <div className="font-bold text-blue-600">30문항 / 60점</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-sm text-gray-500">문법</div>
            <div className="font-bold text-indigo-600">30문항 / 60점</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-sm text-gray-500">독해</div>
            <div className="font-bold text-purple-600">35문항 / 240점</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-sky-500 to-blue-500 p-4">
            <h2 className="text-xl font-bold text-white">📋 영역별 상세 분석</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {examParts.map((part, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-sky-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{part.title}</span>
                  <span className={`transform transition-transform ${openSection === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openSection === index && (
                  <div className="px-6 pb-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-line text-sm">
                      {part.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>⏱️</span> 시간 배분 전략
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>청해</span>
                <span className="font-semibold">40분 (음원 진행)</span>
              </li>
              <li className="flex justify-between">
                <span>어휘</span>
                <span className="font-semibold">25분 (50초/문항)</span>
              </li>
              <li className="flex justify-between">
                <span>문법</span>
                <span className="font-semibold">25분 (50초/문항)</span>
              </li>
              <li className="flex justify-between">
                <span>독해</span>
                <span className="font-semibold">40분 (3~4분/지문)</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📊</span> TOEIC 환산 (참고)
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>TEPS 526+</span>
                <span className="font-semibold">TOEIC 950+</span>
              </li>
              <li className="flex justify-between">
                <span>TEPS 453~525</span>
                <span className="font-semibold">TOEIC 850~945</span>
              </li>
              <li className="flex justify-between">
                <span>TEPS 387~452</span>
                <span className="font-semibold">TOEIC 750~845</span>
              </li>
              <li className="flex justify-between">
                <span>TEPS 327~386</span>
                <span className="font-semibold">TOEIC 650~745</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
          <h3 className="font-bold text-sky-800 mb-3">💡 TEPS 시험 특징</h3>
          <ul className="space-y-2 text-sky-700 text-sm">
            <li>• 청해는 한 번만 들려주므로 집중력이 매우 중요</li>
            <li>• 어휘/문법은 TOEIC보다 난이도가 높음</li>
            <li>• 독해 지문이 길고 학술적인 내용 다수 출제</li>
            <li>• 105분 동안 135문항을 풀어야 하므로 시간 관리 필수</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
