'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TOEICSpeakingPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const sections = [
    {
      title: "1. TOEIC Speaking 개요",
      content: `TOEIC Speaking은 ETS에서 개발한 영어 말하기 능력 평가 시험으로, 실제 업무 환경에서의 영어 구술 능력을 측정합니다.

주요 특징:
• ETS(Educational Testing Service) 주관
• 컴퓨터 기반 시험 (CBT)
• 헤드셋 착용 후 마이크에 대고 답변 녹음
• 시험 시간: 약 20분
• 11개 문항으로 구성
• 8등급 체계 (Level 1~8)

활용 분야:
• 대기업/공기업 입사 지원 필수 스펙
• 승진/인사고과 반영
• 해외 파견/주재원 선발
• 글로벌 비즈니스 역량 평가`
    },
    {
      title: "2. 시험 구성",
      content: `시험 형식:
• 총 11문항
• 시험시간: 약 20분
• 응시료: 84,000원
• CBT(Computer Based Test) 방식

문제 유형:
Question 1-2 (Read a text aloud):
• 짧은 지문 소리 내어 읽기
• 준비시간 45초, 답변시간 45초
• 발음, 억양, 강세 평가

Question 3-4 (Describe a picture):
• 사진 보고 묘사하기
• 준비시간 45초, 답변시간 30초
• 문법, 어휘, 내용 일관성 평가

Question 5-7 (Respond to questions):
• 질문에 대한 응답
• 준비시간 없음, 답변시간 15~30초
• 정보 전달 능력 평가

Question 8-10 (Respond using information):
• 제공된 정보 활용하여 응답
• 준비시간 45초, 답변시간 15~30초
• 정보 파악 및 전달 능력 평가

Question 11 (Express an opinion):
• 주어진 주제에 대한 의견 말하기
• 준비시간 45초, 답변시간 60초
• 논리적 표현력 평가`
    },
    {
      title: "3. 등급 체계",
      content: `점수 및 등급:
• Level 8 (200점): Advanced High - 원어민 수준
• Level 7 (170-190점): Advanced Mid - 유창한 의사소통
• Level 6 (140-160점): Advanced Low - 효과적 의사소통
• Level 5 (120-130점): Intermediate High - 원활한 의사소통
• Level 4 (100-110점): Intermediate Mid - 일반적 의사소통
• Level 3 (70-90점): Intermediate Low - 제한적 의사소통
• Level 2 (40-60점): Novice High - 기초적 의사소통
• Level 1 (0-30점): Novice - 의사소통 어려움

기업별 기준:
• 삼성그룹: Level 6 이상
• 현대자동차: Level 5-6 이상
• LG그룹: Level 5-6 이상
• SK그룹: Level 5-6 이상
• 공기업: Level 5-6 이상`
    },
    {
      title: "4. Q1-2 Read a text aloud 전략",
      content: `출제 유형:
• 광고문, 공지사항, 안내문, 뉴스 등
• 60~80단어 분량의 지문

핵심 전략:
• 45초 준비시간에 전체 지문 2회 묵독
• 어려운 단어 발음 미리 확인
• 문장 끊어 읽기 위치 파악
• 의미 단위로 그룹핑하여 읽기

발음 포인트:
• 명확한 발음과 자연스러운 억양
• 문장 끝 인토네이션 주의
• 강세 위치 정확히 파악
• 연음, 축약 자연스럽게 처리

연습 방법:
• 매일 영문 뉴스/광고문 소리 내어 읽기
• 녹음 후 원어민 발음과 비교
• 쉐도잉 연습으로 자연스러움 향상`
    },
    {
      title: "5. Q3-4 Describe a picture 전략",
      content: `출제 유형:
• 실내/실외 장면
• 사람들의 활동 묘사
• 장소, 사물, 상황 설명

답변 구조 (30초):
1. 전체적인 장면 소개 (5초)
2. 주요 인물/사물 묘사 (10초)
3. 세부 사항 설명 (10초)
4. 마무리 (5초)

유용한 표현:
• "In this picture, I can see..."
• "There are several people who..."
• "In the foreground/background..."
• "On the left/right side..."
• "It looks like they are..."

주의사항:
• 추측이 아닌 보이는 것만 묘사
• 현재진행형 시제 주로 사용
• 구체적인 묘사어 활용
• 30초 내에 완결된 답변`
    },
    {
      title: "6. Q5-7 Respond to questions 전략",
      content: `출제 유형:
• 일상생활 관련 질문
• 개인 경험, 선호도
• 상황별 대응 질문

답변 구조:
Q5 (15초): 짧고 직접적인 답변
Q6 (15초): 조금 더 구체적인 답변
Q7 (30초): 상세한 답변 + 이유/예시

핵심 전략:
• 질문 핵심어 빠르게 파악
• 단답이 아닌 완전한 문장으로
• 이유나 예시 추가로 풍성하게
• 시간 내 답변 완료 필수

연습 포인트:
• 자주 나오는 주제 패턴 익히기
• 개인 경험 영어로 정리해두기
• 즉흥 답변 연습 반복`
    },
    {
      title: "7. Q8-10 Respond using information 전략",
      content: `출제 유형:
• 일정표, 표, 차트 정보
• 회의/이벤트/여행 일정
• 전화 문의 상황 시나리오

답변 구조:
Q8 (15초): 간단한 정보 확인
Q9 (15초): 특정 정보 안내
Q10 (30초): 종합적인 정보 설명

핵심 전략:
• 45초 준비시간에 표 전체 파악
• 질문에 해당하는 정보 빠르게 찾기
• 시간, 장소, 가격 등 핵심 정보 정확히
• 불필요한 정보는 생략

유용한 표현:
• "According to the schedule..."
• "The event will take place at..."
• "There are three options..."
• "I'd recommend... because..."`
    },
    {
      title: "8. Q11 Express an opinion 전략",
      content: `출제 유형:
• 일반적인 사회 이슈
• 직장/학교 관련 주제
• 찬반 의견 표현

답변 구조 (60초):
1. 의견 제시 (10초)
2. 이유 1 + 예시 (20초)
3. 이유 2 + 예시 (20초)
4. 결론/재강조 (10초)

템플릿:
"I believe that... for two reasons.
First, ... For example, ...
Second, ... To illustrate, ...
For these reasons, I think..."

고득점 전략:
• 명확한 입장 표명
• 논리적인 이유 2개 이상
• 구체적인 예시 포함
• 다양한 연결어 활용
• 60초 충분히 활용`
    },
    {
      title: "9. 발음/억양 향상법",
      content: `발음 연습:
• 한국인이 틀리기 쉬운 발음 집중
• R/L, P/F, V/B 구분 연습
• TH 발음 (think, this)
• 장모음/단모음 구분

억양 연습:
• 문장 끝 상승/하강 패턴
• 강조하고 싶은 단어 강세
• 의문문/평서문 구분 억양
• 나열할 때의 리듬감

쉐도잉 방법:
• 원어민 음성 1.5초 뒤따라 읽기
• 억양, 강세, 속도 모방
• 매일 10분 이상 꾸준히
• 본인 녹음 후 비교

추천 연습:
• TED 강연 따라하기
• 영어 뉴스 리포트 쉐도잉
• 영화/드라마 대사 연습`
    },
    {
      title: "10. 시험 당일 팁",
      content: `시험 전:
• 목 풀기 (발성 연습)
• 영어로 혼잣말 하며 워밍업
• 신분증, 수험표 확인

시험 중:
• 마이크 위치 적절히 조정
• 일정한 목소리 크기 유지
• 답변 시작/끝 명확히
• 버벅거려도 당황하지 않기

시간 활용:
• 준비시간 100% 활용
• 답변시간 70% 이상 채우기
• 시간 부족 시 핵심만 전달
• 침묵보다는 말하기

마인드셋:
• 완벽한 문법보다 자연스러움
• 자신감 있는 목소리
• 실수해도 계속 진행
• 대화하듯 편안하게`
    },
    {
      title: "11. 학습 자료 및 일정",
      content: `공식 교재:
• ETS TOEIC Speaking 공식 종합서
• 해커스 TOEIC Speaking Start/Basic
• YBM TOEIC Speaking 실전서

온라인 학습:
• ETS 공식 연습 프로그램
• 해커스토익스피킹 (hackers.co.kr)
• YBM 토익스피킹 (toeicswt.co.kr)

시험 일정:
• 매월 2~4회 실시
• 주말(토/일) 진행
• 접수: 시험일 3~4주 전
• 결과: 시험일 기준 약 5일 후

성적 유효기간:
• 발급일로부터 2년`
    }
  ];

  const subjects = [
    { name: "Speaking 연습", path: "speaking", icon: "🎤", desc: "유형별 Speaking 연습 50문항" },
    { name: "실전 대비", path: "practical", icon: "📝", desc: "실전 전략 및 템플릿 25문항" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language" className="text-sky-600 hover:text-sky-800 flex items-center gap-2">
            <span>←</span>
            <span>언어 분야로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🎤</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">TOEIC Speaking</h1>
              <p className="text-gray-600">영어 말하기 능력 평가</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm">ETS 주관</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">CBT 시험</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">8등급 체계</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">🎤</div>
            <div className="text-sm text-gray-500">문항 수</div>
            <div className="font-bold text-sky-600">11문항</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-sm text-gray-500">시험 시간</div>
            <div className="font-bold text-blue-600">약 20분</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-sm text-gray-500">응시료</div>
            <div className="font-bold text-gray-800">84,000원</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-sm text-gray-500">목표 등급</div>
            <div className="font-bold text-gray-800">Level 6+</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link href="/category/language/toeic-speaking/exam" className="block p-6 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl text-white hover:from-sky-600 hover:to-blue-600 transition-all shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <h3 className="font-bold text-lg">시험 정보</h3>
                <p className="text-sky-100 text-sm">문제 유형, 등급 체계</p>
              </div>
            </div>
          </Link>
          <div className="p-6 bg-white rounded-xl border-2 border-sky-200 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <div>
                <h3 className="font-bold text-lg text-gray-800">등급 기준</h3>
                <p className="text-gray-600 text-sm">Level 6+ 대기업 지원 가능</p>
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
                href={`/category/language/toeic-speaking/study/${subject.path}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl hover:from-sky-100 hover:to-blue-100 transition-all border border-sky-200"
              >
                <span className="text-2xl">{subject.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.desc}</p>
                </div>
                <span className="text-sky-500">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-sky-500 to-blue-500 p-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📖</span>
              <span>TOEIC Speaking 상세 정보</span>
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-sky-50 transition-colors"
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

        <div className="mt-8 bg-sky-50 rounded-xl p-6 border border-sky-200">
          <h3 className="font-bold text-sky-800 mb-3">💡 TOEIC Speaking 고득점 TIP</h3>
          <ul className="space-y-2 text-sky-700 text-sm">
            <li>• 매일 영어로 말하는 습관이 가장 중요합니다</li>
            <li>• Q11 의견 말하기는 논리적 구조(의견-이유-예시-결론)를 갖추세요</li>
            <li>• 발음보다 자신감 있는 목소리와 유창성이 더 중요합니다</li>
            <li>• 시간 내 답변 완료하는 연습을 반복하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
