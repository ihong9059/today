'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState } from 'react';

export default function JobInformationStudyPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);

  const toggleTopic = (index: number) => {
    setExpandedTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const topics = [
    {
      title: '직업정보의 개념과 유형',
      questions: [
        { id: 1, question: '직업정보의 정의와 필요성을 설명하시오.', answer: '직업선택에 필요한 체계적 자료, 합리적 의사결정 지원', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보의 정의와 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직업정보의 정의\n2. 필요성과 목적\n3. 직업정보의 기능\n4. 활용 방안\n5. 연습문제 3개' },
        { id: 2, question: '직업정보의 유형(정성적, 정량적)을 설명하시오.', answer: '정성적: 직무내용, 근무환경 / 정량적: 임금, 고용인원', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정성적 정보의 종류\n2. 정량적 정보의 종류\n3. 각 유형의 활용\n4. 통합적 활용 방법\n5. 연습문제 3개' },
        { id: 3, question: '직업정보의 수집방법을 설명하시오.', answer: '문헌조사, 설문조사, 면접조사, 관찰법', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보의 수집방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1차 자료와 2차 자료\n2. 수집방법별 특징\n3. 방법별 장단점\n4. 효과적인 수집 전략\n5. 연습문제 3개' },
        { id: 4, question: '직업정보의 평가기준을 설명하시오.', answer: '정확성, 최신성, 포괄성, 접근성, 활용성', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보의 평가기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 평가기준\n2. 각 기준의 의미\n3. 평가 방법\n4. 품질 개선 방안\n5. 연습문제 3개' },
        { id: 5, question: '직업정보 제공기관과 역할을 설명하시오.', answer: '고용노동부, 한국고용정보원, 민간 취업포털', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보 제공기관과 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공공기관\n2. 민간기관\n3. 기관별 주요 역할\n4. 정보 연계 방안\n5. 연습문제 3개' },
        { id: 6, question: '직업정보의 활용 분야를 설명하시오.', answer: '진로교육, 취업알선, 직업훈련, 고용정책', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보의 활용 분야를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 활용 분야별 특징\n2. 대상별 활용 방법\n3. 효과적인 전달 방법\n4. 활용 사례\n5. 연습문제 3개' },
        { id: 7, question: '직업정보 서비스의 발전 방향을 설명하시오.', answer: 'AI 기반 맞춤형 정보, 빅데이터 활용, 실시간 업데이트', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보 서비스의 발전 방향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현재 서비스 현황\n2. 기술 발전 동향\n3. 미래 서비스 방향\n4. 발전 과제\n5. 연습문제 3개' },
        { id: 8, question: '직업정보와 진로상담의 연계를 설명하시오.', answer: '정보 탐색 → 분석 → 의사결정 지원', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보와 진로상담의 연계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연계의 필요성\n2. 상담 단계별 활용\n3. 효과적인 정보 제공\n4. 상담 사례\n5. 연습문제 3개' },
      ]
    },
    {
      title: '한국표준직업분류(KSCO)',
      questions: [
        { id: 9, question: '한국표준직업분류(KSCO)의 정의와 목적을 설명하시오.', answer: '통계청 고시, 직업을 체계적으로 분류한 국가표준', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 한국표준직업분류의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. KSCO의 정의\n2. 분류의 목적\n3. 활용 분야\n4. 국제표준과의 관계\n5. 연습문제 3개' },
        { id: 10, question: 'KSCO의 분류체계(대분류~세분류)를 설명하시오.', answer: '대분류(10개) → 중분류 → 소분류 → 세분류', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: KSCO의 분류체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분류 단계별 구조\n2. 대분류 10개 항목\n3. 분류 코드 체계\n4. 분류 활용 방법\n5. 연습문제 3개' },
        { id: 11, question: 'KSCO의 대분류 10개 항목을 설명하시오.', answer: '관리자, 전문가, 사무직, 서비스, 판매, 농림어업, 기능원, 장치기계조작, 단순노무, 군인', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: KSCO의 대분류 10개 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 대분류 명칭\n2. 대분류별 특징\n3. 대표 직업 예시\n4. 분류 기준\n5. 연습문제 3개' },
        { id: 12, question: 'KSCO의 분류원칙(직무, 직능수준)을 설명하시오.', answer: '수행 직무 유사성, 직능수준(교육훈련 수준)', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: KSCO의 분류원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직무 기준 분류\n2. 직능수준 기준\n3. 4가지 직능수준\n4. 분류 적용 예시\n5. 연습문제 3개' },
        { id: 13, question: 'KSCO의 개정 연혁과 변화를 설명하시오.', answer: '1963년 제정, 7차 개정(2017년)', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: KSCO의 개정 연혁과 변화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제정 배경\n2. 주요 개정 내용\n3. 최신 개정 변화\n4. 향후 개정 방향\n5. 연습문제 3개' },
        { id: 14, question: 'KSCO와 ISCO(국제표준직업분류)의 관계를 설명하시오.', answer: 'ISCO를 기반으로 한국 실정에 맞게 수정', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: KSCO와 ISCO의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ISCO 개요\n2. KSCO와의 연계\n3. 차이점\n4. 국제 비교 활용\n5. 연습문제 3개' },
        { id: 15, question: 'KSCO의 직업상담 활용방법을 설명하시오.', answer: '직업탐색, 진로설계, 취업알선 시 활용', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: KSCO의 직업상담 활용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상담에서의 활용\n2. 직업탐색 지원\n3. 진로설계 연계\n4. 활용 사례\n5. 연습문제 3개' },
        { id: 16, question: 'KSCO 검색 및 활용 도구를 설명하시오.', answer: '통계청 KSCO 검색시스템, 워크넷 직업분류', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: KSCO 검색 및 활용 도구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온라인 검색 도구\n2. 검색 방법\n3. 결과 해석\n4. 실무 활용 팁\n5. 연습문제 3개' },
      ]
    },
    {
      title: '한국고용직업분류(KECO)',
      questions: [
        { id: 17, question: '한국고용직업분류(KECO)의 정의와 특징을 설명하시오.', answer: '고용노동부 고시, 고용서비스 특화 분류', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 한국고용직업분류의 정의와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. KECO의 정의\n2. 개발 목적\n3. 주요 특징\n4. KSCO와의 차이\n5. 연습문제 3개' },
        { id: 18, question: 'KECO의 분류체계를 설명하시오.', answer: '대분류(11개) → 중분류 → 소분류 → 세분류', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: KECO의 분류체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분류 단계\n2. 대분류 11개 항목\n3. 분류 코드 체계\n4. 활용 방법\n5. 연습문제 3개' },
        { id: 19, question: 'KECO와 KSCO의 차이점을 설명하시오.', answer: 'KECO: 고용서비스 중심, 산업현장 반영 / KSCO: 통계 목적', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: KECO와 KSCO의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 목적의 차이\n2. 분류체계 차이\n3. 활용 분야 차이\n4. 연계 방안\n5. 연습문제 3개' },
        { id: 20, question: 'KECO의 고용서비스 활용을 설명하시오.', answer: '워크넷 직업검색, 취업알선, 직업훈련 연계', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: KECO의 고용서비스 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 워크넷에서의 활용\n2. 취업알선 활용\n3. 직업훈련 연계\n4. 활용 사례\n5. 연습문제 3개' },
        { id: 21, question: '직업사전의 구성과 활용을 설명하시오.', answer: '직업명, 직무개요, 수행직무, 부가정보', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업사전의 구성과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직업사전의 정의\n2. 구성 항목\n3. 정보 활용 방법\n4. 상담에서의 활용\n5. 연습문제 3개' },
        { id: 22, question: '한국직업전망서의 내용과 활용을 설명하시오.', answer: '직업별 전망, 임금, 취업경로, 필요역량', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 한국직업전망서의 내용과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전망서의 구성\n2. 주요 정보 내용\n3. 진로상담 활용\n4. 활용 사례\n5. 연습문제 3개' },
        { id: 23, question: '신직업과 미래직업의 탐색방법을 설명하시오.', answer: '기술발전, 사회변화에 따른 신직업 조사', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 신직업과 미래직업의 탐색방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신직업의 정의\n2. 탐색 방법\n3. 정보 소스\n4. 진로상담 활용\n5. 연습문제 3개' },
        { id: 24, question: '직업분류의 한계와 보완방안을 설명하시오.', answer: '급변하는 직업세계 반영 어려움, 융합직종 분류', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업분류의 한계와 보완방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현행 분류의 한계\n2. 신직업 반영 문제\n3. 보완 방안\n4. 발전 방향\n5. 연습문제 3개' },
      ]
    },
    {
      title: '워크넷과 고용정보시스템',
      questions: [
        { id: 25, question: '워크넷(Work-Net)의 기능과 서비스를 설명하시오.', answer: '구인구직매칭, 직업정보, 직업심리검사, 훈련정보', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 워크넷의 기능과 서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 워크넷 개요\n2. 주요 서비스\n3. 구인구직 매칭\n4. 상담사 활용법\n5. 연습문제 3개' },
        { id: 26, question: '워크넷의 직업심리검사 서비스를 설명하시오.', answer: '직업선호도검사, 직업가치관검사, 성인용 직업적성검사', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 워크넷의 직업심리검사 서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제공 검사 종류\n2. 검사별 특징\n3. 검사 실시 방법\n4. 결과 활용\n5. 연습문제 3개' },
        { id: 27, question: '고용정보시스템의 구성을 설명하시오.', answer: '고용보험, 직업훈련, 외국인고용 정보 통합', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 고용정보시스템의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시스템 개요\n2. 주요 구성요소\n3. 정보 연계\n4. 활용 방안\n5. 연습문제 3개' },
        { id: 28, question: 'HRD-Net(직업훈련포털)의 기능을 설명하시오.', answer: '훈련과정검색, 훈련이력관리, 내일배움카드', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: HRD-Net의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. HRD-Net 개요\n2. 주요 기능\n3. 훈련과정 검색\n4. 상담사 활용법\n5. 연습문제 3개' },
        { id: 29, question: '큐넷(Q-Net)의 자격정보 서비스를 설명하시오.', answer: '국가기술자격 정보, 시험일정, 합격자 발표', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 큐넷의 자격정보 서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Q-Net 개요\n2. 제공 정보\n3. 자격 검색 방법\n4. 상담사 활용법\n5. 연습문제 3개' },
        { id: 30, question: '민간 취업포털의 특성과 활용을 설명하시오.', answer: '사람인, 잡코리아, 인크루트 등 / 채용정보, 기업정보', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 민간 취업포털의 특성과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 취업포털\n2. 포털별 특징\n3. 공공서비스와의 차이\n4. 상담사 활용법\n5. 연습문제 3개' },
        { id: 31, question: '고용서비스 정보화의 발전방향을 설명하시오.', answer: 'AI 매칭, 빅데이터 분석, 모바일 서비스 강화', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 고용서비스 정보화의 발전방향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현재 정보화 수준\n2. 기술 발전 동향\n3. 미래 서비스 방향\n4. 상담사의 역할 변화\n5. 연습문제 3개' },
        { id: 32, question: '고용정보의 개인정보보호를 설명하시오.', answer: '수집, 이용, 제공 시 동의, 안전한 관리', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 고용정보의 개인정보보호를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개인정보보호의 중요성\n2. 관련 법규\n3. 보호 방안\n4. 상담사의 의무\n5. 연습문제 3개' },
      ]
    },
    {
      title: '직업전망과 노동시장 분석',
      questions: [
        { id: 33, question: '직업전망의 개념과 방법을 설명하시오.', answer: '고용인원, 임금, 근무조건 등의 미래 변화 예측', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업전망의 개념과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직업전망의 정의\n2. 전망 요소\n3. 예측 방법\n4. 전망 정보 활용\n5. 연습문제 3개' },
        { id: 34, question: '직업전망 영향요인을 설명하시오.', answer: '기술변화, 인구구조, 산업구조, 정책변화', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업전망 영향요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기술 요인\n2. 사회경제적 요인\n3. 정책적 요인\n4. 요인별 영향 분석\n5. 연습문제 3개' },
        { id: 35, question: '유망직업과 사양직업의 특성을 설명하시오.', answer: '유망: 성장산업, 고부가가치 / 사양: 자동화, 수요감소', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 유망직업과 사양직업의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유망직업의 특성\n2. 사양직업의 특성\n3. 판단 기준\n4. 상담에서의 활용\n5. 연습문제 3개' },
        { id: 36, question: '4차 산업혁명과 직업변화를 설명하시오.', answer: 'AI, 빅데이터, IoT로 인한 일자리 변화', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 4차 산업혁명과 직업변화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 4차 산업혁명의 특징\n2. 직업세계 변화\n3. 신직업 등장\n4. 진로상담 대응\n5. 연습문제 3개' },
        { id: 37, question: '고용구조 분석의 지표를 설명하시오.', answer: '고용률, 실업률, 경제활동참가율, 비정규직 비율', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 고용구조 분석의 지표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 고용지표\n2. 지표별 의미\n3. 산출 방법\n4. 해석 및 활용\n5. 연습문제 3개' },
        { id: 38, question: '산업별 고용동향 분석방법을 설명하시오.', answer: '산업분류별 취업자수, 증감률, 구성비 분석', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 산업별 고용동향 분석방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산업분류 체계\n2. 분석 지표\n3. 동향 해석\n4. 상담 활용\n5. 연습문제 3개' },
        { id: 39, question: '직종별 고용동향 분석방법을 설명하시오.', answer: '직업분류별 취업자수, 임금수준, 증감 추이', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직종별 고용동향 분석방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분석 단위\n2. 주요 분석 지표\n3. 동향 해석\n4. 상담 활용\n5. 연습문제 3개' },
        { id: 40, question: '지역별 고용정보 분석과 활용을 설명하시오.', answer: '지역 노동시장 특성, 산업구조, 취업기회 분석', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 지역별 고용정보 분석과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지역 노동시장 특성\n2. 분석 방법\n3. 정보 소스\n4. 상담 활용\n5. 연습문제 3개' },
      ]
    },
    {
      title: '직업연구와 정보제공',
      questions: [
        { id: 41, question: '직업연구의 방법론을 설명하시오.', answer: '직무분석, 직업조사, 고용동향 조사', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업연구의 방법론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연구 방법 유형\n2. 방법별 특징\n3. 자료 수집\n4. 결과 활용\n5. 연습문제 3개' },
        { id: 42, question: '직무분석(Job Analysis)의 과정을 설명하시오.', answer: '직무 파악 → 자료수집 → 분석 → 직무기술서 작성', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직무분석의 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직무분석의 정의\n2. 분석 과정\n3. 분석 방법\n4. 결과물 활용\n5. 연습문제 3개' },
        { id: 43, question: '직무기술서와 직무명세서의 차이를 설명하시오.', answer: '직무기술서: 직무내용 / 직무명세서: 자격요건', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직무기술서와 직무명세서의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직무기술서의 내용\n2. 직무명세서의 내용\n3. 차이점\n4. 활용 방안\n5. 연습문제 3개' },
        { id: 44, question: 'NCS(국가직무능력표준)의 개념과 활용을 설명하시오.', answer: '산업현장 직무수행에 필요한 능력 표준화', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: NCS의 개념과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. NCS의 정의\n2. 구성 체계\n3. 활용 분야\n4. 진로상담 활용\n5. 연습문제 3개' },
        { id: 45, question: '학과정보와 직업연계 방법을 설명하시오.', answer: '전공분야별 취업 직종, 필요 자격, 진출 분야', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 학과정보와 직업연계 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학과-직업 연계 필요성\n2. 연계 정보 소스\n3. 활용 방법\n4. 상담 사례\n5. 연습문제 3개' },
        { id: 46, question: '직업체험 프로그램의 유형과 효과를 설명하시오.', answer: '현장체험, 멘토링, 직업인 인터뷰, 잡섀도잉', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업체험 프로그램의 유형과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 체험 프로그램 유형\n2. 유형별 특징\n3. 기대 효과\n4. 운영 방법\n5. 연습문제 3개' },
        { id: 47, question: '진로정보 제공 매체의 특성을 설명하시오.', answer: '인쇄물, 영상, 웹사이트, 모바일 앱', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 진로정보 제공 매체의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매체 유형\n2. 매체별 특징\n3. 장단점\n4. 효과적 활용\n5. 연습문제 3개' },
        { id: 48, question: '직업정보 프로그램의 개발과 평가를 설명하시오.', answer: '수요분석 → 개발 → 실행 → 평가 순환', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보 프로그램의 개발과 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개발 과정\n2. 주요 구성요소\n3. 평가 방법\n4. 개선 방안\n5. 연습문제 3개' },
        { id: 49, question: '외국의 직업정보시스템 사례를 설명하시오.', answer: '미국 O*NET, 영국 National Careers Service', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 외국의 직업정보시스템 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미국 O*NET\n2. 영국 NCS\n3. 시스템별 특징\n4. 한국에의 시사점\n5. 연습문제 3개' },
        { id: 50, question: '직업정보 상담사의 역할과 역량을 설명하시오.', answer: '정보수집, 분석, 제공, 활용지도', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보 상담사의 역할과 역량을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상담사의 역할\n2. 필요 역량\n3. 정보 활용 능력\n4. 전문성 개발\n5. 연습문제 3개' },
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-teal-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/education" className="text-gray-600 hover:text-teal-600">교육</a>
            <span className="text-gray-300">›</span>
            <a href="/category/education/career-counselor-2" className="text-gray-600 hover:text-teal-600">직업상담사 2급</a>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">직업정보론</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📊</span>
            <div>
              <h1 className="text-2xl font-bold">직업정보론</h1>
              <p className="text-teal-100">총 {totalQuestions}문항 | 직업분류와 고용정보</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={() => toggleTopic(topicIdx)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-sm">{topicIdx + 1}</div>
                  <span className="font-medium text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-400">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${expandedTopics.includes(topicIdx) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.includes(topicIdx) && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-teal-600">A. {q.answer}</p>
                        </div>
                        <button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition flex-shrink-0">🤖 AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© 2026 자격시험 가이드. 시험 정보는 Q-Net 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
