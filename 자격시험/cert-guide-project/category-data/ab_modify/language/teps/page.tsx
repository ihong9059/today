'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TEPSPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const sections = [
    {
      title: "1. TEPS 개요",
      content: `TEPS(Test of English Proficiency developed by Seoul National University)는 서울대학교 언어교육원에서 개발한 영어능력 검정시험입니다.

주요 특징:
• 서울대학교 언어교육원 개발/주관
• 한국인 영어학습자 특성 반영
• 실제 영어 사용 능력 측정
• 국내 공신력 있는 영어시험
• 공무원, 대학원 입시에 활용

활용 분야:
• 5급/7급/9급 공무원 시험 영어 대체
• 대학원 입학 영어 요건
• 국비 유학생 선발
• 각종 공기업/기관 채용
• 졸업/학점 인정`
    },
    {
      title: "2. 시험 구성 (New TEPS)",
      content: `시험 형식:
• 총 135문항
• 시험시간: 105분
• 만점: 600점
• 응시료: 44,000원

영역별 구성:
청해 (Listening) - 40문항, 40분:
• Part 1: 한 문장 듣고 응답 (10문항)
• Part 2: 짧은 대화 (10문항)
• Part 3: 긴 대화 (10문항)
• Part 4: 담화 (10문항)

어휘 (Vocabulary) - 30문항, 25분:
• Part 1: 대화문 빈칸 (15문항)
• Part 2: 단문 빈칸 (15문항)

문법 (Grammar) - 30문항, 25분:
• Part 1: 대화문 빈칸 (15문항)
• Part 2: 단문 빈칸 (15문항)

독해 (Reading) - 35문항, 40분:
• Part 1: 빈칸 완성 (10문항)
• Part 2: 독해 (25문항)`
    },
    {
      title: "3. 점수 체계 및 등급",
      content: `점수 환산:
• 총점 600점 만점
• 각 영역 점수 합산
• 청해 240점 + 어휘 60점 + 문법 60점 + 독해 240점

등급 체계:
• 1+ (526~600점): 원어민 수준
• 1 (453~525점): 고급
• 2+ (387~452점): 중상급
• 2 (327~386점): 중급
• 3+ (268~326점): 중하급
• 3 (212~267점): 초급
• 4+ (163~211점): 초급 미만
• 4 (0~162점): 기초

공무원 영어 대체 기준:
• 5급: 340점 이상
• 7급: 340점 이상
• 9급: 268점 이상
• 경찰: 268점 이상`
    },
    {
      title: "4. 청해 학습 전략",
      content: `Part 1 (한 문장 응답):
• 의문사(Who/What/When/Where/Why/How) 집중
• 시제와 주어 일치 확인
• 빠른 선택지 파악
• 간접 응답 유형 주의

Part 2 (짧은 대화):
• 대화 흐름 파악
• 마지막 문장에 집중
• 상황/장소 추론
• 화자 의도 파악

Part 3 (긴 대화):
• 대화 주제 빠르게 파악
• 세부 정보 메모
• 질문 유형 예측
• 바꿔 말하기(Paraphrasing) 익히기

Part 4 (담화):
• 담화 유형별 특징 파악
• 주제문/핵심어 포착
• 강의, 뉴스, 안내문 등 유형 익숙해지기`
    },
    {
      title: "5. 어휘 학습 전략",
      content: `어휘력 확장:
• TEPS 필수 어휘 3000개 암기
• 동의어/반의어 함께 학습
• 접두사/접미사 활용 단어 확장
• 문맥 속 어휘 이해 연습

Part 1 (대화문 빈칸):
• 대화 상황 파악
• 구어체 표현 숙지
• 관용표현/숙어 암기
• 어감(Collocation) 익히기

Part 2 (단문 빈칸):
• 문장 구조 분석
• 품사별 위치 파악
• 문맥상 적절한 어휘 선택
• 학술적/격식체 어휘

효과적인 암기법:
• 예문과 함께 암기
• 어원 학습으로 연관 어휘 확장
• 주제별/카테고리별 정리
• 반복 복습 (에빙하우스 망각 곡선)`
    },
    {
      title: "6. 문법 학습 전략",
      content: `핵심 문법 항목:
• 시제 (현재/과거/미래/완료)
• 조동사 (can/could/may/might/must)
• 관계사 (관계대명사/관계부사)
• 접속사 (등위/종속/상관)
• 가정법 (가정법 과거/과거완료)
• 분사 (현재분사/과거분사)

Part 1 (대화문 빈칸):
• 구어체 문법 특징
• 생략/도치 표현
• 의문문/응답 패턴
• 시제 일치

Part 2 (단문 빈칸):
• 문장 구조 분석
• 수일치 (주어-동사)
• 병렬 구조
• 어순 배열

고득점 전략:
• 기출 문법 패턴 분석
• 자주 틀리는 문법 정리
• 문장 성분 분석 연습`
    },
    {
      title: "7. 독해 학습 전략",
      content: `Part 1 (빈칸 완성):
• 글의 논리적 흐름 파악
• 연결어/접속사 활용
• 전후 문맥 단서 찾기
• 대명사 지시 대상 확인

Part 2 (독해):
• 주제/요지 파악
• 세부 정보 확인
• 추론 문제 전략
• NOT/TRUE 문제 접근법

지문 유형별 접근:
• 설명문: 정의, 예시, 비교 파악
• 논설문: 주장, 근거, 반론 파악
• 기사문: 육하원칙 확인
• 실용문: 목적, 대상, 내용 파악

속독 연습:
• 1분당 150단어 이상 목표
• 의미 단위로 끊어 읽기
• 스키밍/스캐닝 기술`
    },
    {
      title: "8. 시험 당일 팁",
      content: `시험 전:
• 전날 충분한 수면
• 신분증, 수험표 준비
• 시험장 위치 미리 확인
• 아침 식사 가볍게

시간 배분:
• 청해: 음원 속도에 맞춰 진행
• 어휘: 문항당 50초 이내
• 문법: 문항당 50초 이내
• 독해: 지문당 3~4분

마킹 전략:
• 듣기는 바로바로 마킹
• 모르는 문제는 표시 후 넘기기
• 마지막 5분은 마킹 검토
• 빈칸 없이 모두 마킹

컨디션 관리:
• 105분 집중력 유지
• 중간에 스트레칭
• 긴장 시 심호흡`
    },
    {
      title: "9. 점수대별 학습법",
      content: `300점 미만 → 350점:
• 기초 문법 집중 학습
• 기본 어휘 2000개 암기
• 청해 기초 훈련
• 기출 유형 파악

350점 → 400점:
• 취약 영역 집중 보완
• 실전 모의고사 주 2회
• 오답노트 작성
• 시간 관리 연습

400점 → 450점:
• 고급 어휘/문법 학습
• 독해 속도 향상
• 실전 감각 유지
• 취약 유형 반복

450점+ 목표:
• 원서 읽기로 실력 유지
• 고난도 문제 집중 연습
• 시간 단축 훈련
• 만점 영역 확보`
    },
    {
      title: "10. TOEIC vs TEPS 비교",
      content: `시험 특성:
• TOEIC: 비즈니스 영어 중심
• TEPS: 학술/일반 영어 중심

문제 난이도:
• TOEIC: 상대적으로 쉬움
• TEPS: 상대적으로 어려움

시험 시간:
• TOEIC: 2시간 (120분)
• TEPS: 1시간 45분 (105분)

점수 환산 (대략적):
• TEPS 600 ≒ TOEIC 990
• TEPS 500 ≒ TOEIC 900
• TEPS 400 ≒ TOEIC 800
• TEPS 300 ≒ TOEIC 700

활용 분야:
• TOEIC: 기업 채용
• TEPS: 공무원, 대학원`
    },
    {
      title: "11. 시험 일정 및 접수",
      content: `정기시험:
• 매월 2~3회 실시
• 주로 토요일 또는 일요일
• 오전/오후 시험 선택

접수 방법:
• TEPS 공식 홈페이지 접수
• 시험일 약 3주 전 시작
• 조기 마감 주의

성적 발표:
• 시험일 기준 약 2주 후
• 온라인 성적 조회
• 성적표 발급 (유효기간 2년)

응시 자격:
• 제한 없음
• 신분증 지참 필수

접수 사이트:
• www.teps.or.kr`
    }
  ];

  const subjects = [
    { name: "청해 (Listening)", path: "listening", icon: "🎧", desc: "Part 1~4 청해 연습 50문항" },
    { name: "어휘 (Vocabulary)", path: "vocabulary", icon: "📚", desc: "필수 어휘 연습 50문항" },
    { name: "문법 (Grammar)", path: "grammar", icon: "📝", desc: "핵심 문법 연습 50문항" },
    { name: "독해 (Reading)", path: "reading", icon: "📖", desc: "독해 전략 연습 50문항" },
    { name: "실전 대비", path: "practical", icon: "🎯", desc: "파트별 실전 전략 25문항" }
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
            <span className="text-5xl">📘</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">TEPS</h1>
              <p className="text-gray-600">Test of English Proficiency (서울대)</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm">서울대 개발</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">공무원 영어대체</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">만점 600점</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-sm text-gray-500">총 문항</div>
            <div className="font-bold text-sky-600">135문항</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-sm text-gray-500">시험 시간</div>
            <div className="font-bold text-blue-600">105분</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-sm text-gray-500">응시료</div>
            <div className="font-bold text-gray-800">44,000원</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-sm text-gray-500">시험 빈도</div>
            <div className="font-bold text-gray-800">월 2~3회</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link href="/category/language/teps/exam" className="block p-6 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl text-white hover:from-sky-600 hover:to-blue-600 transition-all shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <h3 className="font-bold text-lg">시험 정보</h3>
                <p className="text-sky-100 text-sm">영역별 구성, 점수 체계</p>
              </div>
            </div>
          </Link>
          <div className="p-6 bg-white rounded-xl border-2 border-sky-200 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <h3 className="font-bold text-lg text-gray-800">목표 점수</h3>
                <p className="text-gray-600 text-sm">공무원 340점+ / 대학원 400점+</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📚</span>
            <span>영역별 학습하기</span>
          </h2>
          <div className="grid gap-3">
            {subjects.map((subject, index) => (
              <Link
                key={index}
                href={`/category/language/teps/study/${subject.path}`}
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
              <span>TEPS 상세 정보</span>
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
          <h3 className="font-bold text-sky-800 mb-3">💡 TEPS 고득점 TIP</h3>
          <ul className="space-y-2 text-sky-700 text-sm">
            <li>• TEPS는 TOEIC보다 어휘/문법 난이도가 높으므로 철저한 준비 필요</li>
            <li>• 청해는 한 번만 들려주므로 집중력이 매우 중요합니다</li>
            <li>• 어휘는 구어체/문어체 구분하여 학습하세요</li>
            <li>• 문법은 문장 구조 분석 능력이 핵심입니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
