'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TOEICSpeakingExamPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const questionTypes = [
    {
      title: "Questions 1-2: Read a text aloud",
      content: `문제 유형:
• 지문을 소리 내어 읽기
• 광고문, 공지사항, 안내문 등

시간 배분:
• 준비시간: 45초
• 답변시간: 45초 (각 문항)

평가 요소:
• 발음 (Pronunciation)
• 억양과 강세 (Intonation and Stress)

출제 예시:
"Welcome to the annual technology conference. This year, we are excited to present over 50 innovative companies from around the world. Please visit the registration desk to pick up your name badge and conference materials. Sessions will begin promptly at 9 AM in the main auditorium."

고득점 전략:
• 45초 준비시간에 지문 2회 묵독
• 어려운 단어 발음 미리 확인
• 의미 단위로 끊어 읽기
• 자연스러운 속도 유지`
    },
    {
      title: "Questions 3-4: Describe a picture",
      content: `문제 유형:
• 주어진 사진 묘사하기
• 실내/실외 장면, 인물 활동

시간 배분:
• 준비시간: 45초
• 답변시간: 30초 (각 문항)

평가 요소:
• 문법 (Grammar)
• 어휘 (Vocabulary)
• 내용 일관성 (Coherence)

답변 구조:
1. 전체적인 장면 소개 (5초)
   "In this picture, I can see..."
2. 주요 인물/사물 묘사 (10초)
   "There is a man who is..."
3. 세부 사항 설명 (10초)
   "In the background, there are..."
4. 마무리 (5초)
   "It seems like they are..."

고득점 전략:
• 현재진행형 시제 주로 사용
• 위치 표현 활용 (in the foreground, on the left)
• 보이는 것만 객관적으로 묘사
• 30초 충분히 활용`
    },
    {
      title: "Questions 5-7: Respond to questions",
      content: `문제 유형:
• 일상생활/개인 경험 질문
• 선호도, 의견 표현

시간 배분:
• Q5: 준비 없음 / 답변 15초
• Q6: 준비 없음 / 답변 15초
• Q7: 준비 없음 / 답변 30초

평가 요소:
• 관련성 (Relevance)
• 완성도 (Completeness)
• 발음과 어휘

예시 질문:
Q5: "What is your favorite season?"
Q6: "Why do you like that season?"
Q7: "Describe your most memorable experience during that season."

답변 전략:
Q5 (15초): 직접적인 답변
"My favorite season is summer because I love going to the beach."

Q6 (15초): 이유 추가
"I enjoy the warm weather and longer days. It's perfect for outdoor activities."

Q7 (30초): 상세 답변
"Last summer, I went to Busan with my friends. We spent three days at Haeundae Beach, swimming and trying local seafood. It was unforgettable."`
    },
    {
      title: "Questions 8-10: Respond using information",
      content: `문제 유형:
• 제공된 정보(일정표, 표) 활용
• 전화 문의 상황 시나리오

시간 배분:
• 준비시간: 45초 (정보 파악)
• Q8: 답변 15초
• Q9: 답변 15초
• Q10: 답변 30초

평가 요소:
• 정보 전달 정확성
• 문장 구성력
• 발음과 유창성

예시 시나리오:
"A customer calls to ask about the computer training course."

[Course Schedule]
Course: Excel Basics
Date: March 15-17
Time: 9 AM - 12 PM
Fee: $150
Location: Room 301

Q8: "What time does the course start?"
Q9: "How much is the course fee?"
Q10: "Can you tell me about the course schedule in detail?"

답변 예시:
Q10: "The Excel Basics course runs from March 15th to 17th. Classes are held from 9 AM to noon each day in Room 301. The total fee is $150, which includes all materials."`
    },
    {
      title: "Question 11: Express an opinion",
      content: `문제 유형:
• 주어진 주제에 대한 의견 제시
• 일반적 사회 이슈, 직장/학교 관련

시간 배분:
• 준비시간: 45초
• 답변시간: 60초

평가 요소:
• 논리적 구조 (Organization)
• 이유와 예시 (Reasons and Examples)
• 언어 사용 (Language Use)

예시 질문:
"Do you think companies should allow employees to work from home? Why or why not?"

답변 구조 (60초):
1. 의견 제시 (10초)
"I believe that companies should allow employees to work from home."

2. 이유 1 + 예시 (20초)
"First, working from home increases productivity. For example, employees can avoid long commutes and focus better without office distractions."

3. 이유 2 + 예시 (20초)
"Second, it improves work-life balance. Workers can spend more time with their families and maintain better health."

4. 결론 (10초)
"For these reasons, I think remote work is beneficial for both employees and companies."

유용한 연결어:
• First / Second / Finally
• For example / For instance
• In addition / Moreover
• Therefore / As a result`
    }
  ];

  const scoringGuide = [
    { level: "Level 8", score: "200점", desc: "원어민에 가까운 수준, 모든 상황에서 효과적 의사소통" },
    { level: "Level 7", score: "170-190점", desc: "유창하게 의사소통, 복잡한 주제도 효과적 설명 가능" },
    { level: "Level 6", score: "140-160점", desc: "효과적 의사소통, 대부분의 업무 상황 처리 가능" },
    { level: "Level 5", score: "120-130점", desc: "원활한 의사소통, 일반적 업무 대화 가능" },
    { level: "Level 4", score: "100-110점", desc: "기본적 의사소통, 익숙한 주제에서 대화 가능" },
    { level: "Level 3", score: "70-90점", desc: "제한적 의사소통, 간단한 주제만 가능" },
    { level: "Level 2", score: "40-60점", desc: "기초적 의사소통, 암기된 표현 위주" },
    { level: "Level 1", score: "0-30점", desc: "의사소통 어려움, 기초 학습 필요" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/toeic-speaking" className="text-sky-600 hover:text-sky-800 flex items-center gap-2">
            <span>←</span>
            <span>TOEIC Speaking으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">TOEIC Speaking 시험 안내</h1>
          <p className="text-gray-600">문제 유형별 상세 분석 및 등급 체계</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-sm text-gray-500">총 문항</div>
            <div className="font-bold text-sky-600">11문항</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-sm text-gray-500">시험 시간</div>
            <div className="font-bold text-blue-600">약 20분</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">🎤</div>
            <div className="text-sm text-gray-500">시험 방식</div>
            <div className="font-bold text-gray-800">CBT (녹음)</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-sky-500 to-blue-500 p-4">
            <h2 className="text-xl font-bold text-white">📋 문제 유형별 분석</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {questionTypes.map((type, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-sky-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{type.title}</span>
                  <span className={`transform transition-transform ${openSection === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openSection === index && (
                  <div className="px-6 pb-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-line text-sm">
                      {type.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
            <h2 className="text-xl font-bold text-white">📊 등급 체계</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 text-gray-700">등급</th>
                    <th className="text-left py-3 px-2 text-gray-700">점수</th>
                    <th className="text-left py-3 px-2 text-gray-700">수준</th>
                  </tr>
                </thead>
                <tbody>
                  {scoringGuide.map((item, index) => (
                    <tr key={index} className={`border-b border-gray-100 ${index < 3 ? 'bg-sky-50' : ''}`}>
                      <td className="py-3 px-2 font-semibold text-sky-700">{item.level}</td>
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
                <span className="font-semibold text-sky-600">Level 6+</span>
              </li>
              <li className="flex justify-between">
                <span>현대자동차</span>
                <span className="font-semibold text-sky-600">Level 5-6+</span>
              </li>
              <li className="flex justify-between">
                <span>LG그룹</span>
                <span className="font-semibold text-sky-600">Level 5-6+</span>
              </li>
              <li className="flex justify-between">
                <span>SK그룹</span>
                <span className="font-semibold text-sky-600">Level 5-6+</span>
              </li>
              <li className="flex justify-between">
                <span>공기업</span>
                <span className="font-semibold text-sky-600">Level 5-6+</span>
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
                <span className="font-semibold">84,000원</span>
              </li>
              <li className="flex justify-between">
                <span>시험 빈도</span>
                <span className="font-semibold">월 2-4회</span>
              </li>
              <li className="flex justify-between">
                <span>결과 발표</span>
                <span className="font-semibold">약 5일 후</span>
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

        <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
          <h3 className="font-bold text-sky-800 mb-3">💡 시험 당일 체크리스트</h3>
          <ul className="space-y-2 text-sky-700 text-sm">
            <li>• 신분증(주민등록증/운전면허증/여권) 필수 지참</li>
            <li>• 시험 시작 30분 전까지 입실</li>
            <li>• 마이크/헤드셋 테스트 시간 활용</li>
            <li>• 목소리 크기 일정하게 유지</li>
            <li>• 답변 시작/끝 명확히 표시</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
