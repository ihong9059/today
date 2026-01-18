'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TOEICPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const sections = [
    {
      title: "1. TOEIC 개요",
      content: `TOEIC(Test of English for International Communication)은 영어가 모국어가 아닌 사람들의 일상생활 및 비즈니스 환경에서의 영어 의사소통 능력을 측정하는 시험입니다.

주요 특징:
• ETS(Educational Testing Service) 주관
• 전 세계 160개국 이상에서 시행
• 연간 약 700만 명 이상 응시
• 한국에서 연간 약 200만 명 응시
• 취업, 승진, 졸업요건 등 다양한 목적으로 활용

활용 분야:
• 대기업/공기업 입사 지원 시 필수 스펙
• 해외 파견/주재원 선발
• 대학교 졸업요건
• 승진/인사고과 반영`
    },
    {
      title: "2. 시험 구성",
      content: `시험 형식:
• 총 200문항 (LC 100문항 + RC 100문항)
• 시험시간: 약 2시간 (LC 45분 + RC 75분)
• 만점: 990점 (LC 495점 + RC 495점)
• 응시료: 52,000원

Listening Comprehension (LC) - 100문항, 45분:
• Part 1: 사진 묘사 (6문항)
• Part 2: 질의응답 (25문항)
• Part 3: 짧은 대화 (39문항, 13세트)
• Part 4: 설명문 (30문항, 10세트)

Reading Comprehension (RC) - 100문항, 75분:
• Part 5: 단문 빈칸 채우기 (30문항)
• Part 6: 장문 빈칸 채우기 (16문항, 4지문)
• Part 7: 독해 (54문항, 단일지문/복수지문)`
    },
    {
      title: "3. 점수 체계 및 등급",
      content: `점수 환산:
• 원점수가 아닌 통계적 환산 점수 적용
• LC/RC 각각 5~495점 (5점 단위)
• 총점 10~990점

점수별 수준:
• 900점+: 원어민에 가까운 수준, 통역/번역 가능
• 800~895점: 업무상 의사소통 원활, 대기업 지원 유리
• 700~795점: 일상/업무 기본 의사소통 가능
• 600~695점: 기본적인 의사소통 가능
• 500~595점: 간단한 의사소통 가능
• 500점 미만: 기초 학습 필요

주요 기업 기준:
• 삼성그룹: 700점+ (직군별 상이)
• 현대자동차: 700점+
• LG그룹: 600~700점+
• SK그룹: 700점+
• 공기업: 700~800점+`
    },
    {
      title: "4. 파트별 학습 전략",
      content: `Part 1 (사진 묘사):
• 사진 속 인물 동작, 사물 상태, 배경 파악
• 시제와 태(능동/수동) 구분 연습
• 자주 나오는 표현 암기

Part 2 (질의응답):
• 의문사(Who/What/When/Where/Why/How) 집중
• 간접 응답 유형 파악
• 시제/주어 일치 확인

Part 3 & 4 (대화/설명문):
• 질문 먼저 읽고 키워드 파악
• 장소, 화자 관계, 목적 파악
• Paraphrasing(바꿔 말하기) 익숙해지기

Part 5 (단문 빈칸):
• 품사 문제 (명사/동사/형용사/부사)
• 어휘 문제 (동의어/문맥상 적절한 어휘)
• 문법 문제 (시제/태/관계사/접속사)

Part 6 (장문 빈칸):
• 문맥 흐름 파악
• 문장 삽입 문제 전략
• 시제 일관성 확인

Part 7 (독해):
• 지문 유형별 접근법 숙지
• 시간 배분 (단일지문 2분, 복수지문 4분)
• NOT/TRUE 문제 주의`
    },
    {
      title: "5. LC 청해력 향상법",
      content: `일일 청해 훈련:
• 매일 30분 이상 영어 듣기
• ETS 공식 음원으로 발음/속도 적응
• 받아쓰기(Dictation) 연습

Part별 집중 훈련:
• Part 1: 사진 보며 영어로 묘사 연습
• Part 2: 의문문 패턴 반복 청취
• Part 3-4: 스크립트 없이 듣고 요약

쉐도잉(Shadowing) 연습:
• 음원 듣고 즉시 따라 말하기
• 억양과 발음 모방
• 1.2~1.5배속 청취로 실전 대비

발음 연결음 익히기:
• 연음 (want to → wanna)
• 축약형 (going to → gonna)
• 생략음 패턴 파악`
    },
    {
      title: "6. RC 독해력 향상법",
      content: `어휘력 확장:
• 토익 필수 어휘 3000개 암기
• 비즈니스/일상 표현 숙지
• 동의어/반의어 함께 학습

문법 기초 다지기:
• 5형식 문장 구조 이해
• 시제 12가지 완벽 정리
• 관계사/접속사/전치사 구분

속독 연습:
• 매일 영문 기사 읽기
• 1분당 200단어 이상 목표
• 끊어 읽기로 의미 단위 파악

Part 7 전략:
• 질문 유형별 접근법
• 시간 관리 (54문항 50분 목표)
• 추론/동의어 문제 연습`
    },
    {
      title: "7. 시험 당일 팁",
      content: `시험 전:
• 전날 충분한 수면
• 시험장 위치 미리 확인
• 신분증, 수험표 준비

LC 시간:
• 시작 전 Part 3-4 질문 먼저 읽기
• 마킹은 문제 풀면서 바로
• 못 들은 문제는 빠르게 포기

RC 시간:
• Part 5: 문제당 30초 이내
• Part 6: 세트당 2분 이내
• Part 7: 단일 2분, 복수 4분
• 시간 부족 시 찍기 전략

마킹 주의:
• 빠뜨린 문제 없이 확인
• 마지막 5분은 마킹 검토`
    },
    {
      title: "8. 점수대별 학습법",
      content: `500점 미만 → 600점:
• 기초 문법 집중 학습
• 기본 어휘 1500개 암기
• LC/RC 기초반 교재

600점 → 700점:
• 파트별 유형 분석
• 오답노트 작성
• 실전 모의고사 주 2회

700점 → 800점:
• 취약 파트 집중 보완
• 시간 단축 연습
• 고난도 어휘 학습

800점 → 900점+:
• 실전 감각 유지
• 고급 독해 지문 연습
• LC 만점 목표 훈련`
    },
    {
      title: "9. 추천 학습 자료",
      content: `공식 교재:
• ETS TOEIC 기출문제집 (필수)
• ETS TOEIC 정기시험 기출문제집
• 해커스 토익 실전 1000제

온라인 학습:
• 해커스토익 (hackers.co.kr)
• YBM 토익 (toeic.co.kr)
• 유튜브 토익 강의

앱:
• 산타토익 (AI 맞춤 학습)
• 해커스토익 앱
• Ringle (1:1 영어 회화)

무료 자료:
• ETS 공식 샘플 문제
• 네이버 카페 토익 자료실
• 토익 단어장 앱`
    },
    {
      title: "10. 시험 일정",
      content: `정기시험:
• 매월 1~2회 실시 (일요일)
• 오전 시험: 09:30 입실
• 오후 시험: 14:30 입실

접수 기간:
• 시험일 약 3~4주 전 시작
• 조기 마감 주의 (인기 고사장)

성적 발표:
• 시험일 기준 약 2주 후
• 온라인 성적 조회
• 성적표 발급 (유효기간 2년)

특별시험:
• 기업/단체 위탁 시험
• 수시 시험 가능`
    },
    {
      title: "11. 관련 자격증",
      content: `TOEIC Speaking:
• 영어 말하기 능력 평가
• 8등급 체계 (Level 1~8)
• 기업 채용 시 함께 요구

TOEIC Writing:
• 영어 쓰기 능력 평가
• 에세이, 이메일 작성
• 9등급 체계

OPIc:
• 컴퓨터 기반 인터뷰 테스트
• ACTFL 등급 (IL~AL)
• TOEIC Speaking 대안

기타:
• TEPS: 서울대 개발 영어시험
• IELTS: 유학/이민용
• TOEFL: 미국 유학용`
    }
  ];

  const subjects = [
    { name: "LC (Listening)", path: "listening", icon: "🎧", desc: "Part 1~4 청해 연습 50문항" },
    { name: "RC (Reading)", path: "reading", icon: "📖", desc: "Part 5~7 독해 연습 50문항" },
    { name: "실전 대비", path: "practical", icon: "📝", desc: "파트별 실전 전략 25문항" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            <span>←</span>
            <span>언어 분야로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🇺🇸</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">TOEIC</h1>
              <p className="text-gray-600">Test of English for International Communication</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">ETS 주관</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">국제공인</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">만점 990점</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">🎧</div>
            <div className="text-sm text-gray-500">Listening</div>
            <div className="font-bold text-blue-600">100문항 / 45분</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-sm text-gray-500">Reading</div>
            <div className="font-bold text-indigo-600">100문항 / 75분</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-sm text-gray-500">응시료</div>
            <div className="font-bold text-gray-800">52,000원</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-sm text-gray-500">시험 빈도</div>
            <div className="font-bold text-gray-800">월 1~2회</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link href="/category/language/toeic/exam" className="block p-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <h3 className="font-bold text-lg">시험 정보</h3>
                <p className="text-blue-100 text-sm">파트별 구성, 점수 체계</p>
              </div>
            </div>
          </Link>
          <div className="p-6 bg-white rounded-xl border-2 border-blue-200 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <h3 className="font-bold text-lg text-gray-800">목표 점수</h3>
                <p className="text-gray-600 text-sm">700점+ 대기업 지원 가능</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📚</span>
            <span>파트별 학습하기</span>
          </h2>
          <div className="grid gap-3">
            {subjects.map((subject, index) => (
              <Link
                key={index}
                href={`/category/language/toeic/study/${subject.path}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all border border-blue-200"
              >
                <span className="text-2xl">{subject.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.desc}</p>
                </div>
                <span className="text-blue-500">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📖</span>
              <span>TOEIC 상세 정보</span>
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
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

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">💡 TOEIC 고득점 TIP</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• LC는 매일 30분 이상 꾸준히 듣기 연습이 필수입니다</li>
            <li>• RC Part 5는 30초 이내, Part 7은 시간 배분이 핵심입니다</li>
            <li>• ETS 공식 기출문제로 실전 감각을 익히세요</li>
            <li>• 목표 점수에 따라 취약 파트 집중 공략하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
