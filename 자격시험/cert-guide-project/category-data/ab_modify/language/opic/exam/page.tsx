'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OPIcExamPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const examParts = [
    {
      title: "자기소개 (Self Introduction)",
      content: `출제 빈도: 매 시험 첫 번째 문제

질문 예시:
• "Let's start the interview now. Tell me something about yourself."
• "Tell me a little bit about yourself and your background."

답변 구조 (약 1분):
1. 인사 + 이름 소개
2. 직업/학교 정보
3. 거주지 정보
4. 가족 구성
5. 취미/관심사
6. 마무리 인사

핵심 포인트:
• 자연스럽고 편안하게 말하기
• 1분 내외로 적절한 길이
• 주요 정보 빠짐없이 포함
• 암기한 티 내지 않기

예시 답변:
"Hi, my name is [이름]. I'm [나이] years old and I currently work at [회사] as a [직책]. I've been working there for about [기간]. I live in [지역] with my [가족]. In my free time, I enjoy [취미] because it helps me relax. That's a bit about me."`
    },
    {
      title: "묘사형 질문 (Description)",
      content: `출제 유형:
• 장소 묘사 (집, 회사, 동네, 좋아하는 장소)
• 사람 묘사 (친구, 가족, 동료)
• 물건 묘사 (스마트폰, 자동차, 가구)
• 활동 묘사 (취미, 운동, 루틴)

질문 예시:
• "Describe your home. What does it look like?"
• "Tell me about your favorite restaurant."
• "Describe a typical day at your workplace."

답변 구조:
1. 주제 소개 (5초)
2. 일반적 특징 (15초)
3. 구체적 세부사항 (20초)
4. 개인적 느낌/평가 (10초)

유용한 표현:
• "Let me tell you about..."
• "It's located in/at..."
• "The thing I like most about... is..."
• "It has [특징], which is great for..."
• "Overall, I really enjoy..."`
    },
    {
      title: "경험 서술 (Past Experience)",
      content: `출제 유형:
• 최근 경험 (지난 주말, 최근 여행)
• 기억에 남는 경험 (memorable experience)
• 특별한 사건 (challenging experience)
• 변화 경험 (before and after)

질문 예시:
• "Tell me about your last vacation."
• "Describe a memorable experience you had."
• "What did you do last weekend?"

답변 구조:
1. 언제/어디서 (When/Where) - 5초
2. 누구와 (Who with) - 5초
3. 무엇을 했는지 (What happened) - 25초
4. 어떤 느낌이었는지 (How you felt) - 10초

시제 활용:
• 과거형: went, saw, ate, enjoyed
• 과거진행형: was walking, were talking
• 과거완료: had never been, had already finished

유용한 표현:
• "I remember when..."
• "One of the best experiences was..."
• "It was such a great time because..."
• "I'll never forget..."`
    },
    {
      title: "롤플레이 (Role Play)",
      content: `출제 유형:
• 전화로 정보 문의하기
• 예약/취소/변경하기
• 문제 상황 해결하기
• 불만 제기하기

질문 예시:
• "I'd like to give you a situation. You want to join a gym. Call the gym and ask 3-4 questions."
• "You have a problem with your hotel room. Call the front desk and explain the problem."

답변 구조:
1. 인사 (Greeting) - 5초
2. 용건 설명 (Purpose) - 10초
3. 질문 3개 이상 (Questions) - 25초
4. 감사/마무리 (Closing) - 5초

예시 (헬스장 문의):
"Hello, I'm calling to ask about gym membership.

I have a few questions:
First, how much is the monthly membership fee?
Second, what are your operating hours?
Third, do you offer personal training sessions?

Also, are there any discounts for new members?

Thank you for your help. I'll visit soon."`
    },
    {
      title: "의견/비교 질문",
      content: `출제 유형:
• 찬반 의견 제시
• 두 가지 비교하기
• 선호도 말하기
• 변화 설명하기

질문 예시:
• "Do you think working from home is a good idea? Why?"
• "Compare shopping online to shopping at stores."
• "How has technology changed the way people communicate?"

답변 구조:
1. 의견 표명 (10초)
2. 이유 1 + 예시 (20초)
3. 이유 2 + 예시 (15초)
4. 결론 (5초)

유용한 표현:
• "In my opinion..."
• "I think/believe that..."
• "The main reason is..."
• "For example/For instance..."
• "On the other hand..."
• "Compared to..., ... is more..."
• "All things considered..."`
    },
    {
      title: "등급 체계 (ACTFL Scale)",
      content: `9단계 등급:

Advanced Low (AL):
• 복잡한 주제도 유창하게 설명
• 거의 원어민 수준의 의사소통
• 추상적 주제 토론 가능

Intermediate High (IH):
• 복잡한 상황도 대처 가능
• 다양한 시제/표현 활용
• 대기업 고급 요건

Intermediate Mid 3 (IM3):
• 익숙한 주제 유창하게
• 구체적 에피소드 서술
• 대기업 우대 등급

Intermediate Mid 2 (IM2):
• 기본적 대화 무난히 수행
• 문장 단위 의사소통
• 대기업 기본 요건

Intermediate Mid 1 (IM1):
• 간단한 주제 대화 가능
• 기본 문장 구사

Intermediate Low (IL):
• 짧은 문장으로 의사소통
• 제한적 어휘 사용

Novice High/Mid/Low (NH/NM/NL):
• 단어/구 수준 의사소통
• 암기된 표현 위주`
    }
  ];

  const levelGuide = [
    { level: "AL", score: "Advanced Low", desc: "원어민에 가까운 수준" },
    { level: "IH", score: "Intermediate High", desc: "복잡한 상황도 대처 가능" },
    { level: "IM3", score: "Intermediate Mid 3", desc: "익숙한 주제 유창" },
    { level: "IM2", score: "Intermediate Mid 2", desc: "기본 대화 수행 (대기업 기본)" },
    { level: "IM1", score: "Intermediate Mid 1", desc: "간단한 대화 가능" },
    { level: "IL", score: "Intermediate Low", desc: "제한적 의사소통" },
    { level: "NH", score: "Novice High", desc: "암기 표현 위주" },
    { level: "NM/NL", score: "Novice Mid/Low", desc: "단어 수준" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/opic" className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
            <span>←</span>
            <span>OPIc으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">OPIc 시험 안내</h1>
          <p className="text-gray-600">문제 유형별 분석 및 등급 체계</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-sm text-gray-500">총 문항</div>
            <div className="font-bold text-emerald-600">12~15문항</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-sm text-gray-500">시험 시간</div>
            <div className="font-bold text-teal-600">약 40분</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-sm text-gray-500">난이도 선택</div>
            <div className="font-bold text-cyan-600">1~7 레벨</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-sm text-gray-500">등급</div>
            <div className="font-bold text-gray-800">9단계</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
            <h2 className="text-xl font-bold text-white">📋 문제 유형별 분석</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {examParts.map((part, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-emerald-50 transition-colors"
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

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4">
            <h2 className="text-xl font-bold text-white">📊 등급 체계</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 text-gray-700">등급</th>
                    <th className="text-left py-3 px-2 text-gray-700">명칭</th>
                    <th className="text-left py-3 px-2 text-gray-700">수준</th>
                  </tr>
                </thead>
                <tbody>
                  {levelGuide.map((item, index) => (
                    <tr key={index} className={`border-b border-gray-100 ${index < 4 ? 'bg-emerald-50' : ''}`}>
                      <td className="py-3 px-2 font-semibold text-emerald-700">{item.level}</td>
                      <td className="py-3 px-2 text-gray-700">{item.score}</td>
                      <td className="py-3 px-2 text-gray-600 text-sm">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>🏢</span> 기업별 기준
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>삼성그룹</span>
                <span className="font-semibold text-emerald-600">IM2~IH</span>
              </li>
              <li className="flex justify-between">
                <span>현대자동차</span>
                <span className="font-semibold text-emerald-600">IM2+</span>
              </li>
              <li className="flex justify-between">
                <span>LG그룹</span>
                <span className="font-semibold text-emerald-600">IM2+</span>
              </li>
              <li className="flex justify-between">
                <span>SK그룹</span>
                <span className="font-semibold text-emerald-600">IM2~IH</span>
              </li>
              <li className="flex justify-between">
                <span>공기업</span>
                <span className="font-semibold text-emerald-600">IM2~IH</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📅</span> 시험 정보
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>응시료</span>
                <span className="font-semibold">78,100원</span>
              </li>
              <li className="flex justify-between">
                <span>시험 빈도</span>
                <span className="font-semibold">상시 응시</span>
              </li>
              <li className="flex justify-between">
                <span>결과 발표</span>
                <span className="font-semibold">5~7일 후</span>
              </li>
              <li className="flex justify-between">
                <span>성적 유효기간</span>
                <span className="font-semibold">2년</span>
              </li>
              <li className="flex justify-between">
                <span>시험 방식</span>
                <span className="font-semibold">CBT (컴퓨터)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <h3 className="font-bold text-emerald-800 mb-3">💡 시험 당일 체크리스트</h3>
          <ul className="space-y-2 text-emerald-700 text-sm">
            <li>• 신분증(주민등록증/운전면허증/여권) 필수 지참</li>
            <li>• 시험 15분 전까지 입실</li>
            <li>• Background Survey 선택 항목 미리 생각해두기</li>
            <li>• 마이크 테스트 시간 활용하여 목소리 워밍업</li>
            <li>• 질문을 끝까지 듣고 차분하게 답변</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
