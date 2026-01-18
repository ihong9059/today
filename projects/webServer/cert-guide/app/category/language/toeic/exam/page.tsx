'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TOEICExamPage() {
  const [activeTab, setActiveTab] = useState<'listening' | 'reading'>('listening');

  const listeningParts = [
    {
      name: "Part 1: 사진 묘사",
      questions: 6,
      time: "약 3분",
      description: "사진을 보고 4개의 설명 중 가장 적절한 것 선택",
      tips: ["인물의 동작/상태 파악", "사물의 위치/상태 파악", "시제와 태(능동/수동) 구분"],
      examples: ["A woman is typing on a keyboard.", "The chairs are arranged in a row."],
      difficulty: "하",
      strategy: "사진이 나오면 즉시 인물/사물/배경을 파악하세요. 보기를 들으면서 소거법으로 오답을 제거합니다."
    },
    {
      name: "Part 2: 질의응답",
      questions: 25,
      time: "약 9분",
      description: "질문을 듣고 3개의 응답 중 가장 적절한 것 선택",
      tips: ["의문사(5W1H) 집중 청취", "Yes/No 질문 vs 선택 질문 구분", "간접 응답 유형 주의"],
      examples: ["Q: Where is the meeting room?", "A: It's on the third floor."],
      difficulty: "중",
      strategy: "첫 단어(의문사)를 놓치지 마세요. 간접 응답(우회적 답변)도 자주 출제됩니다."
    },
    {
      name: "Part 3: 짧은 대화",
      questions: 39,
      time: "약 17분",
      description: "2~3인 대화를 듣고 3문항씩 답하기 (13세트)",
      tips: ["대화 전 질문 먼저 읽기", "화자 관계, 장소, 목적 파악", "세부 정보 및 추론 문제"],
      examples: ["What are the speakers discussing?", "Where does the conversation take place?"],
      difficulty: "중상",
      strategy: "대화가 시작되기 전 질문과 보기를 빠르게 읽으세요. 키워드를 미리 파악하면 정답률이 올라갑니다."
    },
    {
      name: "Part 4: 설명문",
      questions: 30,
      time: "약 16분",
      description: "1인 화자의 담화를 듣고 3문항씩 답하기 (10세트)",
      tips: ["담화 유형 파악 (공지, 광고, 안내 등)", "주제, 목적, 세부사항 청취", "그래픽 연계 문제 주의"],
      examples: ["What is being announced?", "Look at the graphic. Which item..."],
      difficulty: "상",
      strategy: "전화 메시지, 회의 안내, 라디오 광고 등 유형별 패턴을 익히세요. 그래픽 문제는 도표를 미리 분석하세요."
    }
  ];

  const readingParts = [
    {
      name: "Part 5: 단문 빈칸 채우기",
      questions: 30,
      time: "권장 10분",
      description: "문장 내 빈칸에 적절한 어휘/문법 선택",
      tips: ["품사 문제: 빈칸 전후 단어 확인", "어휘 문제: 문맥 파악", "문법 문제: 시제, 관계사, 접속사"],
      types: ["품사 (30%)", "어휘 (40%)", "문법 (30%)"],
      difficulty: "중",
      strategy: "문제당 20초 이내로 풀어야 합니다. 모르는 문제는 빠르게 찍고 넘어가세요."
    },
    {
      name: "Part 6: 장문 빈칸 채우기",
      questions: 16,
      time: "권장 8분",
      description: "지문 내 4개 빈칸 채우기 (4지문 × 4문항)",
      tips: ["문맥 흐름 파악", "문장 삽입 문제 주의", "접속부사로 논리 파악"],
      types: ["어휘/문법 (12문항)", "문장 삽입 (4문항)"],
      difficulty: "중상",
      strategy: "먼저 지문 전체를 훑어보고 흐름을 파악하세요. 문장 삽입 문제는 전후 문맥이 핵심입니다."
    },
    {
      name: "Part 7: 독해",
      questions: 54,
      time: "권장 52분",
      description: "단일지문(29문항) + 복수지문(25문항)",
      tips: ["질문 먼저 읽고 키워드 파악", "지문 유형별 접근법 숙지", "NOT/TRUE 문제 시간 관리"],
      types: ["이메일/편지", "광고/공지", "기사/리뷰", "양식/일정표", "채팅/문자"],
      difficulty: "상",
      strategy: "단일지문은 문제당 1분, 복수지문(2~3개 지문)은 세트당 4분을 목표로 시간을 배분하세요."
    }
  ];

  const scoreGuide = [
    { range: "900~990", level: "원어민 수준", desc: "업무상 완벽한 의사소통, 통번역 가능" },
    { range: "800~895", level: "고급", desc: "대기업/외국계 지원 가능, 해외 업무 가능" },
    { range: "700~795", level: "중상급", desc: "대부분 기업 지원 가능, 기본 업무 소통" },
    { range: "600~695", level: "중급", desc: "일상 의사소통 가능, 추가 학습 권장" },
    { range: "500~595", level: "초중급", desc: "기본 의사소통 가능, 문법/어휘 보강 필요" },
    { range: "~495", level: "초급", desc: "기초부터 체계적 학습 필요" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/toeic" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            <span>←</span>
            <span>TOEIC으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">📋</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">시험 정보</h1>
              <p className="text-gray-600">TOEIC Listening & Reading 상세 안내</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 시험 개요</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-600">총 문항</span>
                <span className="font-bold text-blue-700">200문항</span>
              </div>
              <div className="flex justify-between p-3 bg-indigo-50 rounded-lg">
                <span className="text-gray-600">시험 시간</span>
                <span className="font-bold text-indigo-700">약 2시간</span>
              </div>
              <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-600">만점</span>
                <span className="font-bold text-purple-700">990점</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-gray-600">LC (Listening)</span>
                <span className="font-bold text-green-700">100문항 / 45분</span>
              </div>
              <div className="flex justify-between p-3 bg-teal-50 rounded-lg">
                <span className="text-gray-600">RC (Reading)</span>
                <span className="font-bold text-teal-700">100문항 / 75분</span>
              </div>
              <div className="flex justify-between p-3 bg-amber-50 rounded-lg">
                <span className="text-gray-600">응시료</span>
                <span className="font-bold text-amber-700">52,000원</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('listening')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'listening' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            🎧 Listening (LC)
          </button>
          <button
            onClick={() => setActiveTab('reading')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'reading' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            📖 Reading (RC)
          </button>
        </div>

        {activeTab === 'listening' ? (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Listening Comprehension 개요</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">4 Parts</div>
                  <div className="text-sm text-gray-600">Part 1~4</div>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600">100문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">45분</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
              </div>
            </div>

            {listeningParts.map((part, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">{part.name}</h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white/20 rounded text-white text-sm">{part.questions}문항</span>
                      <span className="px-2 py-1 bg-white/20 rounded text-white text-sm">{part.time}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 mb-4">{part.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">📌 핵심 포인트</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {part.tips.map((tip, i) => (
                          <li key={i}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">💡 출제 예시</h4>
                      <ul className="text-sm text-blue-600 space-y-1">
                        {part.examples.map((ex, i) => (
                          <li key={i} className="italic">"{ex}"</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">🎯 공략 전략</h4>
                    <p className="text-sm text-blue-700">{part.strategy}</p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">난이도: {part.difficulty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Reading Comprehension 개요</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600">3 Parts</div>
                  <div className="text-sm text-gray-600">Part 5~7</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">100문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="p-4 bg-pink-50 rounded-xl">
                  <div className="text-2xl font-bold text-pink-600">75분</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
              </div>
            </div>

            {readingParts.map((part, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">{part.name}</h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white/20 rounded text-white text-sm">{part.questions}문항</span>
                      <span className="px-2 py-1 bg-white/20 rounded text-white text-sm">{part.time}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 mb-4">{part.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">📌 핵심 포인트</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {part.tips.map((tip, i) => (
                          <li key={i}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">📊 출제 유형</h4>
                      <ul className="text-sm text-indigo-600 space-y-1">
                        {part.types.map((type, i) => (
                          <li key={i}>• {type}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium text-indigo-800 mb-1">🎯 공략 전략</h4>
                    <p className="text-sm text-indigo-700">{part.strategy}</p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">난이도: {part.difficulty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📈 점수별 수준 가이드</h3>
          <div className="space-y-3">
            {scoreGuide.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-24 text-center">
                  <span className="font-bold text-blue-600">{item.range}</span>
                </div>
                <div className="w-20">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{item.level}</span>
                </div>
                <div className="flex-1 text-gray-600 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">💡 시험 당일 TIP</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• LC 시작 전 Direction 시간에 Part 3-4 질문을 미리 읽으세요</li>
            <li>• RC는 Part 5(10분) → Part 6(8분) → Part 7(52분) 시간 배분 필수</li>
            <li>• 모르는 문제는 과감히 찍고 넘어가세요 - 시간 관리가 핵심입니다</li>
            <li>• 마지막 5분은 OMR 마킹 검토 시간으로 남겨두세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
