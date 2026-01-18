'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'isms',
    name: '정보보호 관리체계',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: 'ISMS-P의 정의와 인증 대상을 설명하시오.', answer: '정보보호 및 개인정보보호 관리체계, 정보통신서비스 제공자 등', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: ISMS-P의 정의와 인증 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'ISMS-P 인증 기준의 3개 영역을 설명하시오.', answer: '관리체계 수립 및 운영, 보호대책 요구사항, 개인정보 처리 단계별 요구사항', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: ISMS-P 인증 기준의 3개 영역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'ISO 27001의 구성과 특징을 설명하시오.', answer: '정보보안 국제표준, PDCA 사이클, 114개 통제항목', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: ISO 27001의 구성과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'ISO 27001과 ISMS-P의 차이를 설명하시오.', answer: 'ISO 27001: 국제표준, ISMS-P: 국내 법적 의무 인증', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: ISO 27001과 ISMS-P의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '정보보호 정책의 구성요소를 설명하시오.', answer: '목적, 범위, 역할과 책임, 위반 시 제재 조항', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 정보보호 정책의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '정보보호 조직의 역할을 설명하시오.', answer: 'CISO, 정보보호위원회, 정보보호 담당자, 현업 부서', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 정보보호 조직의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'CISO의 역할과 자격 요건을 설명하시오.', answer: '정보보호 총괄 책임자, 관련 학력/경력 요건', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: CISO의 역할과 자격 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '정보자산 분류 및 관리 방법을 설명하시오.', answer: '식별→분류→라벨링→취급 기준 수립→주기적 검토', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 정보자산 분류 및 관리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '정보보호 인식 교육의 중요성을 설명하시오.', answer: '인적 보안의 핵심, 보안 문화 형성, 사고 예방', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 정보보호 인식 교육의 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '내부 감사의 목적과 절차를 설명하시오.', answer: '보안 통제 효과성 검증, 계획→실행→보고→후속조치', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 내부 감사의 목적과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'risk',
    name: '위험 분석 및 평가',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: '위험(Risk)의 구성요소를 설명하시오.', answer: '자산, 위협, 취약점, 영향 / 위험 = 위협 × 취약점 × 자산가치', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 위험(Risk)의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '위험 분석 방법론의 종류를 설명하시오.', answer: '정성적(High/Medium/Low), 정량적(금액 환산), 혼합 방식', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 위험 분석 방법론의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '위험 처리 전략 4가지를 설명하시오.', answer: '위험 수용, 위험 회피, 위험 전가(보험), 위험 감소(통제)', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 위험 처리 전략 4가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'ALE(연간예상손실액) 계산 공식을 설명하시오.', answer: 'ALE = SLE(단일손실예상액) × ARO(연간발생율)', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: ALE(연간예상손실액) 계산 공식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '위험 평가 절차를 설명하시오.', answer: '범위정의 → 자산식별 → 위협/취약점 분석 → 위험 산정 → 대책 수립', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 위험 평가 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '잔여 위험(Residual Risk)의 개념을 설명하시오.', answer: '보안 통제 적용 후에도 남아있는 위험', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 잔여 위험(Residual Risk)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '위험 허용 수준(Risk Appetite)을 설명하시오.', answer: '조직이 수용 가능한 위험의 범위와 수준', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 위험 허용 수준(Risk Appetite)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '위협 모델링(Threat Modeling)의 목적을 설명하시오.', answer: '시스템의 잠재적 위협을 체계적으로 식별하고 대응책 마련', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 위협 모델링(Threat Modeling)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'STRIDE 위협 모델을 설명하시오.', answer: 'Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: STRIDE 위협 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '보안 투자 대비 효과(ROI) 계산 방법을 설명하시오.', answer: 'ROI = (ALE 감소액 - 투자비용) / 투자비용', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 보안 투자 대비 효과(ROI) 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'bcp',
    name: '업무연속성 관리',
    color: 'from-yellow-500 to-yellow-400',
    questions: [
      { id: 1, question: 'BCP(업무연속성계획)의 정의와 목적을 설명하시오.', answer: '재해 발생 시 핵심 업무의 연속성 확보를 위한 계획', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: BCP(업무연속성계획)의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'DRP(재해복구계획)와 BCP의 관계를 설명하시오.', answer: 'DRP는 IT 시스템 복구, BCP는 전체 업무 연속성 포함', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: DRP(재해복구계획)와 BCP의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'BIA(업무영향분석)의 목적과 산출물을 설명하시오.', answer: '핵심 업무 식별, RTO/RPO 산정, 복구 우선순위 결정', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: BIA(업무영향분석)의 목적과 산출물을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'RTO와 RPO의 차이를 설명하시오.', answer: 'RTO: 복구목표시간, RPO: 복구목표시점(데이터 손실 허용)', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: RTO와 RPO의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '재해복구센터의 유형(Hot/Warm/Cold)을 설명하시오.', answer: 'Hot: 즉시 운영, Warm: 수 시간 내, Cold: 장비 없는 공간', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 재해복구센터의 유형(Hot/Warm/Cold)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '백업 전략(Full/Incremental/Differential)을 설명하시오.', answer: 'Full: 전체, Incremental: 증분, Differential: 차등', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 백업 전략(Full/Incremental/Differential)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '3-2-1 백업 규칙을 설명하시오.', answer: '3개 복사본, 2개 다른 매체, 1개 오프사이트 보관', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 3-2-1 백업 규칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'DR 테스트의 유형을 설명하시오.', answer: '테이블탑, 워크스루, 시뮬레이션, 병행, 전환 테스트', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: DR 테스트의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'ISO 22301의 목적을 설명하시오.', answer: '업무연속성관리시스템(BCMS) 국제표준', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: ISO 22301의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '클라우드 환경에서의 DR 전략을 설명하시오.', answer: 'Pilot Light, Warm Standby, Multi-Site Active-Active', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 클라우드 환경에서의 DR 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'privacy-law',
    name: '개인정보보호법',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: '개인정보의 정의와 예시를 설명하시오.', answer: '살아있는 개인을 식별할 수 있는 정보(이름, 주민번호, 영상 등)', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 개인정보의 정의와 예시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '개인정보 처리 원칙 8가지를 쓰시오.', answer: '적법성, 목적제한, 최소수집, 정확성, 안전성, 공개성, 권리보장, 책임성', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 개인정보 처리 원칙 8가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '민감정보의 정의와 종류를 설명하시오.', answer: '사상, 신념, 건강, 성생활, 유전정보, 범죄경력, 생체인식정보 등', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 민감정보의 정의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '개인정보 수집·이용의 법적 근거를 설명하시오.', answer: '동의, 법률 규정, 계약 이행, 정당한 이익 등', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 개인정보 수집·이용의 법적 근거를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '개인정보 제3자 제공 시 동의 항목을 쓰시오.', answer: '제공받는 자, 목적, 항목, 보유기간, 동의 거부권 및 불이익', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 개인정보 제3자 제공 시 동의 항목을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '개인정보 안전성 확보조치를 설명하시오.', answer: '관리적, 기술적, 물리적 조치(접근권한, 암호화, 접근기록 등)', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 개인정보 안전성 확보조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '개인정보 파기의 원칙과 방법을 설명하시오.', answer: '목적 달성 후 지체없이 파기, 복원 불가능한 방법(완전삭제, 파쇄)', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 개인정보 파기의 원칙과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '개인정보 영향평가(PIA)의 대상과 절차를 설명하시오.', answer: '공공기관 5만명 이상, 계획→분석→평가→개선', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 개인정보 영향평가(PIA)의 대상과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '정보주체의 권리 5가지를 쓰시오.', answer: '열람권, 정정권, 삭제권, 처리정지권, 손해배상청구권', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 정보주체의 권리 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '개인정보 유출 시 대응 절차를 설명하시오.', answer: '신고(72시간 내), 정보주체 통지, 피해최소화, 재발방지', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 개인정보 유출 시 대응 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'it-law',
    name: '정보통신망법 및 기타 법규',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: '정보통신망법의 주요 내용을 설명하시오.', answer: '정보통신서비스 제공자 의무, 개인정보보호, 불법정보 유통 금지', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 정보통신망법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '정보통신기반보호법의 목적을 설명하시오.', answer: '주요정보통신기반시설의 보호 및 침해사고 대응', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 정보통신기반보호법의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '전자서명법의 주요 내용을 설명하시오.', answer: '전자서명의 효력, 공인인증제도 폐지(2020), 다양한 전자서명 인정', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 전자서명법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '정보보호산업법의 목적을 설명하시오.', answer: '정보보호 산업 육성 및 경쟁력 강화', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 정보보호산업법의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '클라우드컴퓨팅법의 주요 내용을 설명하시오.', answer: '클라우드 서비스 신뢰성, 이용자 보호, 보안인증제', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 클라우드컴퓨팅법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '사이버보안 관련 국제 협약을 설명하시오.', answer: '부다페스트 협약(사이버범죄), GDPR(EU 개인정보)', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 사이버보안 관련 국제 협약을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'GDPR의 주요 원칙을 설명하시오.', answer: '적법성, 목적제한, 최소화, 정확성, 보관제한, 무결성/기밀성, 책임성', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: GDPR의 주요 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '개인정보의 국외 이전 요건을 설명하시오.', answer: '정보주체 동의 또는 적절한 보호조치(계약, 인증 등)', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 개인정보의 국외 이전 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '정보보안 관련 행정처분 종류를 설명하시오.', answer: '과태료, 과징금, 시정명령, 영업정지, 형사처벌', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 정보보안 관련 행정처분 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '개인정보보호 감독기구의 역할을 설명하시오.', answer: '개인정보보호위원회: 정책 수립, 조사, 시정조치, 분쟁조정', prompt: `정보보안기사 정보보안 관리 및 법규 문제입니다.\n\n문제: 개인정보보호 감독기구의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function SecurityManagementPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['isms']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => { const saved = localStorage.getItem('info-security-management-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  useEffect(() => { localStorage.setItem('info-security-management-progress', JSON.stringify(completedQuestions)); }, [completedQuestions]);

  const toggleTopic = (topicId: string) => setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]);
  const toggleQuestion = (topicId: string, questionId: number) => setCompletedQuestions(prev => { const tc = prev[topicId] || []; return { ...prev, [topicId]: tc.includes(questionId) ? tc.filter(id => id !== questionId) : [...tc, questionId] }; });
  const getTopicProgress = (topicId: string, total: number) => Math.round(((completedQuestions[topicId]?.length || 0) / total) * 100);
  const getTotalProgress = () => { const total = topics.reduce((a, t) => a + t.questions.length, 0); const comp = Object.values(completedQuestions).reduce((a, arr) => a + arr.length, 0); return Math.round((comp / total) * 100); };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-red-600">홈</a><span className="text-gray-300">›</span><a href="/category/it" className="text-gray-600 hover:text-red-600">IT·정보통신</a><span className="text-gray-300">›</span><a href="/category/it/information-security" className="text-gray-600 hover:text-red-600">정보보안기사</a><span className="text-gray-300">›</span><span className="text-red-600 font-medium">정보보안 관리 및 법규</span></nav></div></header>

      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">📋</span></div><div><h1 className="text-2xl font-bold">정보보안 관리 및 법규</h1><p className="text-red-100">정보보안기사 5과목 - ISMS-P, 위험관리, 법규</p></div></div></div></section>

      <div className="bg-white border-b"><div className="max-w-6xl mx-auto px-4 py-4"><div className="flex items-center justify-between mb-2"><span className="font-medium text-gray-700">전체 진행률</span><span className="text-red-600 font-bold">{getTotalProgress()}%</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all" style={{ width: `${getTotalProgress()}%` }} /></div></div></div>

      <main className="max-w-6xl mx-auto px-4 py-8"><div className="space-y-4">{topics.map((topic) => (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}><div className="flex items-center gap-3"><span className="font-bold text-lg">{topic.name}</span><span className="bg-white/20 px-2 py-1 rounded text-sm">{topic.questions.length}문항</span></div><div className="flex items-center gap-4"><div className="w-24 bg-white/30 rounded-full h-2"><div className="bg-white h-2 rounded-full" style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }} /></div><span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span><span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span></div></button>{expandedTopics.includes(topic.id) && (<div className="p-4 space-y-3">{topic.questions.map((q) => (<div key={q.id} className={`p-4 rounded-lg border ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions[topic.id]?.includes(q.id) && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800 mb-2"><span className="text-red-500 mr-2">Q{q.id}.</span>{q.question}</p><p className="text-sm text-gray-600 bg-white p-2 rounded border"><span className="font-medium text-green-600">A.</span> {q.answer}</p></div><button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition">🤖 AI</button></div></div>))}</div>)}</div>))}</div></main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
