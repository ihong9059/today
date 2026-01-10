'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OPIcPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const sections = [
    {
      title: "1. OPIc 개요",
      content: `OPIc(Oral Proficiency Interview - computer)은 ACTFL(미국외국어교육협회)에서 개발한 컴퓨터 기반 영어 말하기 시험입니다.

주요 특징:
• ACTFL 주관, 미국 공인 어학 평가
• 컴퓨터 기반 인터뷰 형식
• 실생활 의사소통 능력 측정
• 개인 맞춤형 질문 출제
• Background Survey로 주제 선택 가능

활용 분야:
• 대기업/공기업 입사 필수 스펙
• 승진/인사고과 반영
• 해외 파견/주재원 선발
• 공무원 영어 가산점
• TOEIC Speaking 대안`
    },
    {
      title: "2. 시험 구성",
      content: `시험 형식:
• 총 12~15문항 (난이도 선택에 따라 변동)
• 시험시간: 약 40분
• 응시료: 78,100원
• CBT(Computer Based Test) 방식

시험 진행 순서:
1. Orientation (오리엔테이션) - 약 20분
2. Background Survey (배경 설문) - 약 10분
3. Self Assessment (난이도 선택)
4. 본 시험 - 약 40분

난이도 선택:
• 초급 (1-2): 일상생활 관련 기본 질문
• 중급 (3-4): 일반적 주제 + 경험 묘사
• 중상급 (5-6): 복잡한 상황 설명 + 의견 제시
• 고급 (7): 추상적 주제 + 토론 형식

문제 유형:
• 자기소개
• 취미/관심사 묘사
• 일상생활 설명
• 과거 경험 이야기
• 롤플레이 (상황극)
• 의견 제시/비교`
    },
    {
      title: "3. 등급 체계 (ACTFL)",
      content: `등급 구분 (9단계):
• AL (Advanced Low): 유창하고 자연스러운 의사소통
• IH (Intermediate High): 복잡한 상황도 처리 가능
• IM3 (Intermediate Mid 3): 익숙한 주제 유창하게
• IM2 (Intermediate Mid 2): 문장 단위 대화 가능
• IM1 (Intermediate Mid 1): 기본적 대화 가능
• IL (Intermediate Low): 간단한 문장으로 의사소통
• NH (Novice High): 암기된 표현 위주
• NM (Novice Mid): 단어/구 수준
• NL (Novice Low): 의사소통 어려움

기업별 기준:
• 삼성그룹: IM2~IH 이상
• 현대자동차: IM2 이상
• LG그룹: IM2 이상
• SK그룹: IM2~IH 이상
• 공기업: IM2~IH 이상

등급별 수준:
• AL: 원어민에 가까운 수준
• IH: 업무상 의사소통 원활
• IM3: 다양한 주제 대화 가능
• IM2: 대기업 지원 기본 요건
• IM1: 기본적인 대화 가능`
    },
    {
      title: "4. Background Survey 전략",
      content: `Background Survey란?
• 시험 전 자신의 배경 정보 입력
• 선택한 항목에서 질문 출제
• 전략적 선택으로 준비된 답변 가능

선택 영역:
1. 여가활동/취미
2. 관심사
3. 운동/스포츠
4. 엔터테인먼트
5. 음악
6. 영화
7. 집에서 하는 활동
8. 가정환경

추천 선택 전략:
• 실제 경험이 있는 주제 선택
• 에피소드가 풍부한 주제 선택
• 비슷한 답변 재활용 가능한 주제
• 너무 전문적인 주제는 피하기

예시 조합:
• 영화 감상 + 음악 듣기 + 집에서 휴식
• 운동(헬스) + 여행 + 요리
• 독서 + 카페 가기 + 친구 만나기`
    },
    {
      title: "5. 자기소개 전략",
      content: `자기소개 구조 (약 1분):
1. 인사 + 이름 (5초)
2. 직업/학교 (15초)
3. 거주지 (10초)
4. 가족 (10초)
5. 취미/관심사 (15초)
6. 마무리 (5초)

예시 답변:
"Hi, let me introduce myself. My name is [이름], and I'm [나이] years old.

I'm currently working at [회사명] as a [직책]. I've been working there for about [기간].

I live in [지역], which is located in [도시]. I live with my [가족구성].

In my free time, I enjoy [취미1] and [취미2]. Especially, I love [취미] because it helps me relax and relieve stress.

That's a little bit about myself. Thank you."

주의사항:
• 너무 길지 않게 (1분 내외)
• 자연스럽게 말하기
• 주요 키워드 미리 준비
• 긴장하지 않고 편안하게`
    },
    {
      title: "6. 묘사형 질문 전략",
      content: `묘사 유형:
• 장소 묘사 (집, 동네, 회사 등)
• 사람 묘사 (친구, 가족, 동료 등)
• 물건 묘사 (스마트폰, 차 등)
• 활동 묘사 (취미, 운동 등)

답변 구조:
1. 주제 소개 (Introduction)
2. 일반적 특징 (General)
3. 구체적 묘사 (Details)
4. 느낌/평가 (Opinion)

예시 (집 묘사):
"Let me tell you about my home.

I live in an apartment in [지역]. It's on the [층] floor of a [규모]-story building.

My apartment has [방 수] bedrooms, a living room, and a kitchen. The living room is my favorite place because it's spacious and has a nice view.

I really like my home because it's cozy and convenient. It's close to a subway station, so commuting is easy."

유용한 표현:
• Let me describe...
• The best thing about... is...
• It's located in...
• I especially like... because...`
    },
    {
      title: "7. 경험 서술 전략",
      content: `경험 서술 구조:
1. 언제/어디서 (When/Where)
2. 누구와 (With whom)
3. 무엇을 했는지 (What)
4. 어떤 느낌이었는지 (How you felt)

시제 사용:
• 과거형(Past tense) 기본
• 과거진행형(was ~ing) 생생함 추가
• 현재완료(have p.p.) 경험 강조

예시 (여행 경험):
"I'd like to talk about my trip to Jeju Island last summer.

I went there with my friends for 3 days. We stayed at a nice hotel near the beach.

During the trip, we visited many famous places like Seongsan Ilchulbong and enjoyed delicious seafood. The weather was perfect, so we also went swimming.

It was such a memorable experience. I really want to go back there someday."

유용한 표현:
• I remember when...
• One of my best experiences was...
• It was such a great time.
• I'll never forget...`
    },
    {
      title: "8. 롤플레이 전략",
      content: `롤플레이 유형:
• 전화로 질문하기 (가게, 회사 등)
• 문제 상황 해결하기
• 정보 요청하기
• 예약/취소/변경하기

기본 구조:
1. 인사/상황 설명 (Greeting)
2. 용건 말하기 (Purpose)
3. 질문하기 (Questions - 3개 이상)
4. 감사 인사 (Closing)

예시 (호텔 예약 문의):
"Hello, I'm calling to make a reservation at your hotel.

I'd like to book a room for this weekend, from Friday to Sunday.

I have a few questions:
First, how much is a double room per night?
Second, is breakfast included?
Third, do you have a swimming pool or gym?

Thank you for your help. I'll call back to confirm my reservation."

주의사항:
• 질문은 최소 3개 이상
• 예의 바른 표현 사용
• 구체적으로 질문하기
• 마무리 인사 필수`
    },
    {
      title: "9. 의견 제시 전략",
      content: `의견 제시 구조:
1. 의견 표명 (Opinion)
2. 이유 1 + 예시 (Reason 1)
3. 이유 2 + 예시 (Reason 2)
4. 결론 (Conclusion)

예시 (재택근무 찬성):
"In my opinion, working from home is a great option for employees.

First, it saves commuting time. For example, I used to spend 2 hours commuting every day. Now I can use that time more productively.

Second, it improves work-life balance. People can spend more time with their families and take better care of their health.

For these reasons, I believe remote work is beneficial for both employees and companies."

유용한 표현:
• In my opinion / I believe that...
• The main reason is...
• For example / For instance...
• That's why I think...
• All things considered...`
    },
    {
      title: "10. 고득점 전략",
      content: `IH/AL 등급 달성 전략:

1. 유창성 (Fluency):
• 막힘 없이 자연스럽게 말하기
• 필러(um, uh) 최소화
• 적절한 속도 유지

2. 내용 (Content):
• 질문에 정확히 답변
• 구체적인 예시/에피소드
• 논리적인 구조

3. 어휘 (Vocabulary):
• 다양한 표현 사용
• 상황에 맞는 어휘
• 고급 표현 활용

4. 문법 (Grammar):
• 다양한 시제 활용
• 복문 구조 사용
• 큰 실수 피하기

5. 발음 (Pronunciation):
• 명확한 발음
• 자연스러운 억양
• 적절한 강세

연습 방법:
• 매일 10분 이상 영어로 말하기
• 본인 답변 녹음 후 분석
• 템플릿 외워서 활용
• 실전 모의고사 연습`
    },
    {
      title: "11. 시험 일정 및 접수",
      content: `시험 일정:
• 연중 상시 응시 가능
• 전국 공인 시험장에서 진행
• 주중/주말 선택 가능

접수 방법:
• OPIc 공식 홈페이지 접수
• www.opic.or.kr
• 원하는 날짜/시간/장소 선택

준비물:
• 신분증 (주민등록증/운전면허증/여권)
• 수험표 (출력 또는 모바일)

성적 발표:
• 시험일 기준 5~7일 후
• 온라인 성적 조회
• 성적표 발급 (유효기간 2년)

응시료:
• 정기시험: 78,100원
• 성적표 재발급: 5,000원

주의사항:
• 시험 15분 전까지 입실
• 휴대폰/전자기기 반입 금지
• 신분증 미지참 시 응시 불가`
    }
  ];

  const subjects = [
    { name: "자기소개/일상", path: "introduction", icon: "👋", desc: "자기소개 및 일상생활 50문항" },
    { name: "주제별 답변", path: "topics", icon: "💬", desc: "취미/여행/음식 등 50문항" },
    { name: "롤플레이", path: "roleplay", icon: "🎭", desc: "상황별 롤플레이 50문항" },
    { name: "실전 대비", path: "practical", icon: "🎯", desc: "등급별 전략 25문항" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language" className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
            <span>←</span>
            <span>언어 분야로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">💬</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">OPIc</h1>
              <p className="text-gray-600">Oral Proficiency Interview - computer</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">ACTFL 주관</span>
            <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">CBT 인터뷰</span>
            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">9등급 체계</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">🎤</div>
            <div className="text-sm text-gray-500">문항 수</div>
            <div className="font-bold text-emerald-600">12~15문항</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-sm text-gray-500">시험 시간</div>
            <div className="font-bold text-teal-600">약 40분</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-sm text-gray-500">응시료</div>
            <div className="font-bold text-gray-800">78,100원</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-sm text-gray-500">목표 등급</div>
            <div className="font-bold text-gray-800">IM2+</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link href="/category/language/opic/exam" className="block p-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <h3 className="font-bold text-lg">시험 정보</h3>
                <p className="text-emerald-100 text-sm">문제 유형, 등급 체계</p>
              </div>
            </div>
          </Link>
          <div className="p-6 bg-white rounded-xl border-2 border-emerald-200 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <div>
                <h3 className="font-bold text-lg text-gray-800">등급 기준</h3>
                <p className="text-gray-600 text-sm">IM2+ 대기업 지원 가능</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📚</span>
            <span>유형별 학습하기</span>
          </h2>
          <div className="grid gap-3">
            {subjects.map((subject, index) => (
              <Link
                key={index}
                href={`/category/language/opic/study/${subject.path}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-all border border-emerald-200"
              >
                <span className="text-2xl">{subject.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.desc}</p>
                </div>
                <span className="text-emerald-500">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📖</span>
              <span>OPIc 상세 정보</span>
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-emerald-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{section.title}</span>
                  <span className={`transform transition-transform ${openSection === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openSection === index && (
                  <div className="px-6 pb-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <h3 className="font-bold text-emerald-800 mb-3">💡 OPIc 고득점 TIP</h3>
          <ul className="space-y-2 text-emerald-700 text-sm">
            <li>• Background Survey에서 자신 있는 주제를 전략적으로 선택하세요</li>
            <li>• 자기소개와 자주 나오는 주제 답변은 미리 준비해두세요</li>
            <li>• 답변은 구체적인 예시와 에피소드를 포함해야 합니다</li>
            <li>• 롤플레이는 질문 3개 이상, 예의 바른 표현 사용이 핵심입니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
