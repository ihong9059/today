'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IndustrialHygieneEngineerPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const sections = [
    {
      title: "1. 자격증 개요",
      content: `산업위생관리기사는 작업환경 측정 및 평가, 유해인자 관리, 근로자 건강보호 등 산업위생 분야의 전문 기술인력을 양성하기 위한 국가기술자격입니다.

주요 업무:
• 작업환경 측정 및 평가
• 유해화학물질, 분진, 소음 등 유해인자 관리
• 작업환경 개선 대책 수립
• 근로자 건강장해 예방 활동
• 산업보건 관련 법규 준수 지도

산업안전보건법 강화와 ESG 경영 확대로 산업위생 전문가에 대한 수요가 꾸준히 증가하고 있습니다.`
    },
    {
      title: "2. 시험 정보",
      content: `시험 구성:
• 필기시험: 5과목, 과목당 20문항 (총 100문항)
• 실기시험: 필답형 (약 3시간)

필기시험 과목:
1. 산업위생학개론
2. 작업환경측정 및 평가
3. 작업환경관리대책
4. 물리적 유해인자관리
5. 산업독성학

합격 기준:
• 필기: 과목당 40점 이상, 전 과목 평균 60점 이상
• 실기: 60점 이상

응시 자격:
• 관련학과 졸업(예정)자
• 기사 수준의 훈련과정 이수자
• 산업기사 + 실무경력 1년
• 실무경력 4년 이상`
    },
    {
      title: "3. 출제 기준 및 경향",
      content: `최근 출제 경향:

산업위생학개론:
• 산업위생의 정의와 역사
• 인간공학 및 작업생리
• 산업위생 프로그램 관리

작업환경측정 및 평가:
• 시료채취 방법 및 분석
• 노출기준 및 평가방법
• 측정기기 원리와 사용법

작업환경관리대책:
• 환기시설 설계 및 관리
• 개인보호구 선정 및 관리
• 행정적 관리대책

물리적 유해인자:
• 소음, 진동 측정 및 관리
• 온열조건, 조명 관리
• 이상기압, 방사선 관리

산업독성학:
• 독성학 기초이론
• 유해물질별 건강영향
• 생물학적 모니터링`
    },
    {
      title: "4. 과목별 학습 전략",
      content: `산업위생학개론 (20%):
• 산업위생의 기본 개념 이해
• 인간공학 기초 학습
• 산업피로와 작업생리 이해

작업환경측정 및 평가 (25%):
• 시료채취 방법(개인, 지역시료)
• TWA, STEL 계산법 숙지
• 측정기기 원리 이해

작업환경관리대책 (20%):
• 환기공학 기초 공식
• 국소배기장치 설계
• 보호구 종류와 선정기준

물리적 유해인자관리 (15%):
• 소음의 합성과 감쇠 계산
• 온열지수(WBGT) 계산
• 조도, 휘도 기준 암기

산업독성학 (20%):
• 독성의 용량-반응 관계
• 주요 유해물질 특성
• 생물학적 모니터링 지표`
    },
    {
      title: "5. 필기시험 준비",
      content: `추천 학습 방법:

1단계 - 기초 이론 학습 (4주):
• 기본서로 전 과목 이론 학습
• 산업안전보건법 숙지
• 핵심 공식 및 기준치 정리

2단계 - 과목별 심화 (4주):
• 측정평가: 계산문제 집중 연습
• 관리대책: 환기공학 공식 암기
• 독성학: 물질별 특성 정리

3단계 - 기출문제 풀이 (3주):
• 최근 5년 기출문제 3회 반복
• 오답노트 작성
• 계산문제 풀이 연습

4단계 - 실전 모의고사 (1주):
• 실전 환경 모의시험
• 시간 배분 연습
• 최종 핵심정리`
    },
    {
      title: "6. 실기시험 준비",
      content: `실기시험 유형:
• 필답형 (주관식)
• 계산문제, 서술형, 단답형 출제
• 시험시간: 약 3시간

주요 출제 영역:
• 작업환경측정 계획 수립
• 측정결과 평가 및 보고서 작성
• 유해인자별 관리대책 수립
• 환기시설 설계 계산
• 법규 적용 문제

합격 전략:
• 계산문제: 공식 정확히 암기, 단위 주의
• 서술형: 핵심 키워드 포함
• 보고서: 법정 양식 숙지
• 관리대책: 공학적/행정적/보호구 구분`
    },
    {
      title: "7. 핵심 암기 사항",
      content: `중요 공식:
• TWA = Σ(C×T)/8 [ppm 또는 mg/m³]
• 노출지수 = C/TLV (1 초과시 노출기준 초과)
• 환기량 Q = VA/t [m³/min]
• 반송속도 V = Q/A [m/s]
• 소음합성 L = 10log(10^L1/10 + 10^L2/10)

핵심 기준치:
• 소음 노출기준: 90dB(A)/8시간
• WBGT 기준: 경작업 30°C, 중등작업 28°C
• 조도기준: 정밀작업 300lx 이상
• 환기횟수: 사무실 4회/hr 이상

주요 약어:
• TWA: 시간가중평균
• STEL: 단시간노출기준
• TLV: 허용농도
• WBGT: 습구흑구온도`
    },
    {
      title: "8. 자주 틀리는 유형",
      content: `주의해야 할 포인트:

1. 노출평가 계산:
• TWA 계산 시 비노출 시간 포함
• 혼합물질 노출지수 합산
• 단위 환산 (ppm ↔ mg/m³)

2. 환기 계산:
• 필요환기량과 반송속도 구분
• 덕트 압력손실 계산
• 제어풍속 기준 적용

3. 소음 관련:
• dB 합성 계산
• 청력보호구 NRR 적용
• 노출시간별 기준 적용

4. 법규 관련:
• 측정주기(6개월/1년) 구분
• 특수건강진단 대상 물질
• 관리대상 유해물질 분류`
    },
    {
      title: "9. 취업 및 진로",
      content: `주요 취업 분야:

작업환경측정기관:
• 지정측정기관
• 환경컨설팅 업체
• 측정 및 분석 전문가

기업체 산업보건팀:
• 대기업 안전보건팀
• 제조업 환경안전팀
• 화학공장 보건관리

공공기관:
• 안전보건공단
• 근로복지공단
• 지방고용노동청

연봉 수준 (경력별):
• 신입: 3,200~3,800만원
• 3년차: 4,000~4,800만원
• 7년차 이상: 5,500만원 이상

자격 활용:
• 작업환경측정기관 기술인력
• 안전보건관리담당자 선임
• 보건관리자 자격`
    },
    {
      title: "10. 관련 자격증",
      content: `상위 자격:
• 산업위생관리기술사: 최고급 기술자격
• 산업보건지도사: 컨설팅 전문가

동급 자격:
• 산업안전기사: 안전관리 분야
• 대기환경기사: 환경측정 분야
• 인간공학기사: 인간공학 분야

하위/연관 자격:
• 산업위생관리산업기사: 실무 기술
• 위험물산업기사: 화학물질 관리
• 산업안전산업기사: 안전관리 실무

추천 취득 순서:
1. 산업위생관리기사 (기본)
2. 산업안전기사 (영역 확대)
3. 산업위생관리기술사 (전문가)`
    },
    {
      title: "11. 학습 자료",
      content: `추천 교재:
• 산업위생관리기사 필기 (성안당)
• 산업위생관리기사 실기 (예문사)
• 산업위생학 (한국산업안전보건공단)

온라인 학습:
• 한국산업인력공단 큐넷
• 안전보건공단 교육센터
• 유튜브 산업위생 강의

참고 자료:
• 산업안전보건법령집
• 작업환경측정 및 지정측정기관 평가 등에 관한 고시
• KOSHA Guide

실습:
• 측정기기 실습교육
• 작업환경측정 현장실습
• 분석실험실 교육`
    }
  ];

  const subjects = [
    { name: "산업위생학개론", path: "work-environment", icon: "📚", desc: "산업위생 기초, 인간공학, 작업생리" },
    { name: "작업환경측정 및 평가", path: "measurement", icon: "📊", desc: "시료채취, 분석, 노출평가" },
    { name: "작업환경관리대책", path: "management", icon: "🌬️", desc: "환기공학, 보호구, 관리방안" },
    { name: "물리적 유해인자관리", path: "physical-hazards", icon: "🔊", desc: "소음, 진동, 온열, 조명, 방사선" },
    { name: "실기(필답형)", path: "practical", icon: "✍️", desc: "측정평가, 관리대책, 계산문제" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/safety" className="text-teal-600 hover:text-teal-800 flex items-center gap-2">
            <span>←</span>
            <span>안전·보건 분야로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🧪</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">산업위생관리기사</h1>
              <p className="text-gray-600">Industrial Hygiene Management Engineer</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">국가기술자격</span>
            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">한국산업인력공단</span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">기사</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link href="/category/safety/industrial-hygiene/exam" className="block p-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-white hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <h3 className="font-bold text-lg">시험 정보</h3>
                <p className="text-teal-100 text-sm">일정, 과목, 합격기준</p>
              </div>
            </div>
          </Link>
          <div className="p-6 bg-white rounded-xl border-2 border-teal-200 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <div>
                <h3 className="font-bold text-lg text-gray-800">합격률</h3>
                <p className="text-gray-600 text-sm">필기 35% / 실기 45%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📚</span>
            <span>과목별 학습하기</span>
          </h2>
          <div className="grid gap-3">
            {subjects.map((subject, index) => (
              <Link
                key={index}
                href={`/category/safety/industrial-hygiene/study/${subject.path}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl hover:from-teal-100 hover:to-cyan-100 transition-all border border-teal-200"
              >
                <span className="text-2xl">{subject.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.desc}</p>
                </div>
                <span className="text-teal-500">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📖</span>
              <span>자격증 상세 정보</span>
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-teal-50 transition-colors"
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

        <div className="mt-8 bg-teal-50 rounded-xl p-6 border border-teal-200">
          <h3 className="font-bold text-teal-800 mb-3">💡 합격 TIP</h3>
          <ul className="space-y-2 text-teal-700 text-sm">
            <li>• TWA, 노출지수 계산은 필기/실기 모두 자주 출제됩니다</li>
            <li>• 환기공학 공식(필요환기량, 반송속도)을 반드시 암기하세요</li>
            <li>• 유해물질별 특성과 허용기준을 정리해 두세요</li>
            <li>• 산업안전보건법 개정 내용을 확인하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
