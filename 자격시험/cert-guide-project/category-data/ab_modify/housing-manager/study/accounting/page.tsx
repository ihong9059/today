'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AccountingStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('housing-accounting-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('housing-accounting-completed', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const topics = [
    {
      name: '회계의 기초',
      questions: [
        { id: 1, question: '회계의 정의와 목적을 설명하시오.', answer: '회계는 기업의 재무상태와 경영성과를 측정·보고하는 정보시스템으로, 이해관계자의 의사결정에 유용한 정보 제공이 목적', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 회계의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회계의 정의\n2. 회계의 목적\n3. 회계정보 이용자\n4. 공동주택 회계의 특수성\n5. 연습문제 3개' },
        { id: 2, question: '재무회계와 관리회계의 차이점을 설명하시오.', answer: '재무회계는 외부보고 목적(K-IFRS 준수), 관리회계는 내부 의사결정 목적(형식 자유)', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 재무회계와 관리회계의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재무회계의 특징\n2. 관리회계의 특징\n3. 정보이용자 비교\n4. 공동주택 관리회계\n5. 연습문제 3개' },
        { id: 3, question: '회계의 기본가정을 설명하시오.', answer: '기업실체의 가정, 계속기업의 가정, 기간별 보고의 가정, 화폐단위측정의 가정', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 회계의 기본가정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기업실체의 가정\n2. 계속기업의 가정\n3. 기간별 보고의 가정\n4. 화폐단위측정의 가정\n5. 연습문제 3개' },
        { id: 4, question: '발생주의와 현금주의의 차이점을 설명하시오.', answer: '발생주의는 거래 발생 시점 인식, 현금주의는 현금 수수 시점 인식', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 발생주의와 현금주의의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발생주의 개념\n2. 현금주의 개념\n3. 각각의 장단점\n4. 관리비 회계 적용\n5. 연습문제 3개' },
        { id: 5, question: '회계등식이란 무엇인가?', answer: '자산 = 부채 + 자본 (재무상태표 등식)', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 회계등식이란 무엇인가?\n\n다음 순서로 설명해주세요:\n1. 회계등식의 의의\n2. 자산, 부채, 자본의 정의\n3. 거래의 이중성\n4. 실무 적용 예시\n5. 연습문제 3개' },
        { id: 6, question: '회계순환과정을 설명하시오.', answer: '거래발생→분개→전기→시산표작성→결산수정→재무제표작성', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 회계순환과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회계순환과정의 의의\n2. 각 단계별 절차\n3. 분개와 전기\n4. 결산절차\n5. 연습문제 3개' },
        { id: 7, question: '계정과목의 분류를 설명하시오.', answer: '자산계정, 부채계정, 자본계정, 수익계정, 비용계정', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 계정과목의 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재무상태표 계정(자산, 부채, 자본)\n2. 손익계산서 계정(수익, 비용)\n3. 계정과목 체계\n4. 관리비 관련 계정과목\n5. 연습문제 3개' },
        { id: 8, question: '차변과 대변의 의미를 설명하시오.', answer: '차변은 왼쪽(자산증가, 부채감소), 대변은 오른쪽(자산감소, 부채증가)', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 차변과 대변의 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 차변과 대변의 위치\n2. 계정별 증감 기록\n3. 분개의 원칙\n4. 실습 예제\n5. 연습문제 3개' },
        { id: 9, question: '회계기준의 종류와 역할을 설명하시오.', answer: 'K-IFRS(상장기업), 일반기업회계기준(비상장), 공동주택회계처리기준', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 회계기준의 종류와 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회계기준의 필요성\n2. K-IFRS\n3. 일반기업회계기준\n4. 공동주택회계처리기준\n5. 연습문제 3개' },
        { id: 10, question: '회계정보의 질적특성을 설명하시오.', answer: '목적적합성, 신뢰성, 비교가능성, 이해가능성', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 회계정보의 질적특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 목적적합성\n2. 신뢰성(충실한 표현)\n3. 비교가능성\n4. 이해가능성\n5. 연습문제 3개' }
      ]
    },
    {
      name: '재무제표',
      questions: [
        { id: 11, question: '재무상태표의 구성과 작성원칙을 설명하시오.', answer: '자산, 부채, 자본으로 구성, 유동성배열법 적용', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 재무상태표의 구성과 작성원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재무상태표의 의의\n2. 자산·부채·자본의 분류\n3. 유동성배열법\n4. 공동주택 재무상태표\n5. 연습문제 3개' },
        { id: 12, question: '손익계산서의 구성과 형식을 설명하시오.', answer: '수익과 비용을 대응하여 당기순이익 산출, 보고식/계정식', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 손익계산서의 구성과 형식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손익계산서의 의의\n2. 수익과 비용의 인식\n3. 수익비용대응의 원칙\n4. 관리비 수지계산서\n5. 연습문제 3개' },
        { id: 13, question: '현금흐름표의 구성과 작성방법을 설명하시오.', answer: '영업활동, 투자활동, 재무활동으로 구분, 직접법/간접법', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 현금흐름표의 구성과 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금흐름표의 의의\n2. 활동별 분류\n3. 직접법과 간접법\n4. 공동주택 현금흐름\n5. 연습문제 3개' },
        { id: 14, question: '자본변동표의 내용을 설명하시오.', answer: '자본의 크기와 변동 내역을 표시, 당기순이익, 배당금 등 반영', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 자본변동표의 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본변동표의 의의\n2. 자본 구성항목\n3. 변동사유\n4. 공동주택 적용\n5. 연습문제 3개' },
        { id: 15, question: '주석의 역할과 내용을 설명하시오.', answer: '재무제표 보충정보 제공, 회계정책, 우발상황 등 기재', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 주석의 역할과 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주석의 의의\n2. 필수 기재사항\n3. 회계정책 공시\n4. 우발상황 공시\n5. 연습문제 3개' },
        { id: 16, question: '유동자산과 비유동자산의 분류기준을 설명하시오.', answer: '1년 이내 현금화 가능 여부 또는 정상영업주기 기준', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 유동자산과 비유동자산의 분류기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유동성 분류의 의의\n2. 유동자산의 종류\n3. 비유동자산의 종류\n4. 분류 기준\n5. 연습문제 3개' },
        { id: 17, question: '매출총이익과 영업이익의 차이를 설명하시오.', answer: '매출총이익=매출액-매출원가, 영업이익=매출총이익-판관비', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 매출총이익과 영업이익의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출총이익 계산\n2. 영업이익 계산\n3. 판매비와관리비\n4. 이익 분석\n5. 연습문제 3개' },
        { id: 18, question: '충당부채와 우발부채의 차이를 설명하시오.', answer: '충당부채는 부채로 인식, 우발부채는 주석 공시', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 충당부채와 우발부채의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 충당부채 인식요건\n2. 우발부채의 개념\n3. 회계처리 방법\n4. 하자보수충당부채\n5. 연습문제 3개' },
        { id: 19, question: '이연법인세의 개념을 설명하시오.', answer: '회계이익과 과세소득의 차이로 발생하는 일시적 차이의 세효과', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 이연법인세의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이연법인세의 의의\n2. 일시적 차이\n3. 이연법인세자산/부채\n4. 회계처리\n5. 연습문제 3개' },
        { id: 20, question: '포괄손익계산서의 구성을 설명하시오.', answer: '당기순이익과 기타포괄손익을 합산하여 총포괄손익 산출', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 포괄손익계산서의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 포괄손익의 개념\n2. 기타포괄손익 항목\n3. 총포괄손익 계산\n4. 손익계산서와의 관계\n5. 연습문제 3개' }
      ]
    },
    {
      name: '분개와 전기',
      questions: [
        { id: 21, question: '분개의 원칙과 방법을 설명하시오.', answer: '거래를 차변과 대변으로 구분하여 기록, 차변합계=대변합계', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 분개의 원칙과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분개의 의의\n2. 분개의 원칙\n3. 분개 절차\n4. 관리비 분개 예시\n5. 연습문제 3개' },
        { id: 22, question: '현금 수입 거래의 분개를 설명하시오.', answer: '(차) 현금 xxx (대) 매출/수입 xxx', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 현금 수입 거래의 분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금 수입의 종류\n2. 분개 방법\n3. 관리비 수입 분개\n4. 실습 예제\n5. 연습문제 3개' },
        { id: 23, question: '외상거래의 분개를 설명하시오.', answer: '매출채권/매입채무 계정 사용', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 외상거래의 분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외상매출의 분개\n2. 외상매입의 분개\n3. 대금회수/지급 분개\n4. 미수관리비 회계처리\n5. 연습문제 3개' },
        { id: 24, question: '어음거래의 분개를 설명하시오.', answer: '받을어음/지급어음 계정 사용, 할인 시 매출채권처분손실', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 어음거래의 분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 어음의 종류\n2. 어음 수취/발행 분개\n3. 어음 할인 회계처리\n4. 부도어음 처리\n5. 연습문제 3개' },
        { id: 25, question: '급여 지급의 분개를 설명하시오.', answer: '(차) 급여 xxx (대) 현금/예수금 xxx', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 급여 지급의 분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 급여 관련 계정과목\n2. 원천징수 회계처리\n3. 4대보험 처리\n4. 관리직원 급여 분개\n5. 연습문제 3개' },
        { id: 26, question: '감가상각의 분개를 설명하시오.', answer: '(차) 감가상각비 xxx (대) 감가상각누계액 xxx', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 감가상각의 분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감가상각의 의의\n2. 감가상각 방법\n3. 분개 처리\n4. 공동주택 설비 감가상각\n5. 연습문제 3개' },
        { id: 27, question: '수선비와 자본적지출의 회계처리를 설명하시오.', answer: '수선비는 비용처리, 자본적지출은 자산화', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 수선비와 자본적지출의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수익적지출과 자본적지출 구분\n2. 수선비 회계처리\n3. 자본적지출 회계처리\n4. 장기수선충당금\n5. 연습문제 3개' },
        { id: 28, question: '전기의 방법을 설명하시오.', answer: '분개장에서 원장으로 기록을 옮기는 과정', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 전기의 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전기의 의의\n2. 분개장과 원장\n3. 전기 절차\n4. 보조원장\n5. 연습문제 3개' },
        { id: 29, question: '선급비용과 미지급비용의 분개를 설명하시오.', answer: '선급비용은 자산, 미지급비용은 부채로 처리', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 선급비용과 미지급비용의 분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선급비용의 개념과 분개\n2. 미지급비용의 개념과 분개\n3. 결산 시 조정\n4. 관리비 관련 적용\n5. 연습문제 3개' },
        { id: 30, question: '오류 수정 분개를 설명하시오.', answer: '당기 발견 전기 오류는 전기이월이익잉여금 조정', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 오류 수정 분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 오류의 유형\n2. 당기 오류 수정\n3. 전기 오류 수정\n4. 소급재작성\n5. 연습문제 3개' }
      ]
    },
    {
      name: '결산절차',
      questions: [
        { id: 31, question: '시산표의 종류와 작성목적을 설명하시오.', answer: '합계시산표, 잔액시산표로 전기의 정확성 검증', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 시산표의 종류와 작성목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시산표의 의의\n2. 합계시산표\n3. 잔액시산표\n4. 시산표의 한계\n5. 연습문제 3개' },
        { id: 32, question: '결산수정분개의 종류를 설명하시오.', answer: '선급/미수수익 조정, 감가상각, 대손충당금 설정 등', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 결산수정분개의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결산수정의 의의\n2. 발생항목 조정\n3. 이연항목 조정\n4. 평가항목 조정\n5. 연습문제 3개' },
        { id: 33, question: '대손충당금의 설정과 회계처리를 설명하시오.', answer: '매출채권 회수불능 예상액을 충당금으로 설정', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 대손충당금의 설정과 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대손의 개념\n2. 충당금 설정 방법\n3. 대손 발생 시 처리\n4. 미수관리비 대손처리\n5. 연습문제 3개' },
        { id: 34, question: '재고자산 평가방법을 설명하시오.', answer: '선입선출법, 후입선출법, 평균법, 개별법', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 재고자산 평가방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재고자산 평가의 필요성\n2. 선입선출법\n3. 후입선출법\n4. 평균법\n5. 연습문제 3개' },
        { id: 35, question: '감가상각 방법을 비교 설명하시오.', answer: '정액법, 정률법, 생산량비례법 등', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 감가상각 방법을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정액법\n2. 정률법\n3. 생산량비례법\n4. 방법 선택 기준\n5. 연습문제 3개' },
        { id: 36, question: '마감분개의 절차를 설명하시오.', answer: '수익·비용계정을 집합손익계정으로 마감 후 이익잉여금 대체', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 마감분개의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 마감분개의 의의\n2. 수익계정 마감\n3. 비용계정 마감\n4. 손익 대체\n5. 연습문제 3개' },
        { id: 37, question: '정산표의 작성방법을 설명하시오.', answer: '수정전시산표→수정분개→수정후시산표→재무제표', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 정산표의 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정산표의 구조\n2. 작성 절차\n3. 수정분개란 기재\n4. 재무제표란 기재\n5. 연습문제 3개' },
        { id: 38, question: '장부 마감절차를 설명하시오.', answer: '원장 마감, 차기이월 기입', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 장부 마감절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분개장 마감\n2. 원장 마감\n3. 차기이월\n4. 회계장부 보존\n5. 연습문제 3개' },
        { id: 39, question: '재무제표 작성순서를 설명하시오.', answer: '손익계산서→이익잉여금처분계산서→재무상태표', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 재무제표 작성순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손익계산서 작성\n2. 이익잉여금 계산\n3. 재무상태표 작성\n4. 재무제표 간 연결\n5. 연습문제 3개' },
        { id: 40, question: '결산일정과 재무제표 확정절차를 설명하시오.', answer: '결산→감사→이사회 승인→주주총회 확정', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 결산일정과 재무제표 확정절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결산일정\n2. 외부감사\n3. 이사회 승인\n4. 공동주택 결산공개\n5. 연습문제 3개' }
      ]
    },
    {
      name: '공동주택 회계실무',
      questions: [
        { id: 41, question: '공동주택 관리비의 구성항목을 설명하시오.', answer: '일반관리비, 청소비, 경비비, 수선유지비, 승강기유지비, 수도료, 전기료 등', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 공동주택 관리비의 구성항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관리비의 정의\n2. 공용관리비 항목\n3. 개별사용료 항목\n4. 관리비 부과기준\n5. 연습문제 3개' },
        { id: 42, question: '장기수선충당금의 회계처리를 설명하시오.', answer: '매월 적립(부채계정), 사용 시 충당금 감소', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 장기수선충당금의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 장기수선충당금의 의의\n2. 적립 회계처리\n3. 사용 회계처리\n4. 장기수선계획과의 관계\n5. 연습문제 3개' },
        { id: 43, question: '관리비 수납과 미수금 관리를 설명하시오.', answer: '관리비 부과→수납→미수관리비 관리', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 관리비 수납과 미수금 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관리비 부과절차\n2. 수납 회계처리\n3. 미수관리비 관리\n4. 연체료 부과\n5. 연습문제 3개' },
        { id: 44, question: '공동주택 회계감사의 절차를 설명하시오.', answer: '300세대 이상 의무감사, 관리규약에 따른 자체감사', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 공동주택 회계감사의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의무감사 대상\n2. 감사의 종류\n3. 감사절차\n4. 감사보고서\n5. 연습문제 3개' },
        { id: 45, question: '관리비 예산 편성방법을 설명하시오.', answer: '전년도 실적 기준, 물가상승률 반영, 장기수선계획 고려', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 관리비 예산 편성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산 편성의 의의\n2. 편성 절차\n3. 항목별 예산산정\n4. 예산 승인\n5. 연습문제 3개' },
        { id: 46, question: '수선유지비와 장기수선비의 구분을 설명하시오.', answer: '수선유지비는 일상수선(관리비), 장기수선비는 계획수선(충당금)', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 수선유지비와 장기수선비의 구분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수선유지비의 범위\n2. 장기수선비의 범위\n3. 구분 기준\n4. 회계처리 차이\n5. 연습문제 3개' },
        { id: 47, question: '잡수입의 종류와 회계처리를 설명하시오.', answer: '주차료, 광고수입, 이자수입 등, 관리비 차감 또는 별도 적립', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 잡수입의 종류와 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 잡수입의 종류\n2. 수입 인식\n3. 사용용도 결정\n4. 회계처리 방법\n5. 연습문제 3개' },
        { id: 48, question: '관리비 정산의 절차를 설명하시오.', answer: '월별/연간 정산, 예산대비 실적 분석, 잔액 처리', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 관리비 정산의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정산의 의의\n2. 월별 정산\n3. 연간 정산\n4. 과부족 처리\n5. 연습문제 3개' },
        { id: 49, question: '관리비 부과명세서 작성방법을 설명하시오.', answer: '항목별 부과내역, 전용면적/세대수 기준 배분', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 관리비 부과명세서 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부과명세서의 구성\n2. 부과기준 설정\n3. 항목별 배분방법\n4. 명세서 작성실무\n5. 연습문제 3개' },
        { id: 50, question: '공동주택 결산보고서의 구성을 설명하시오.', answer: '재무상태표, 운영성과표, 장기수선충당금 명세 등', prompt: '주택관리사 회계원리 문제입니다.\n\n문제: 공동주택 결산보고서의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결산보고서의 종류\n2. 재무상태표 작성\n3. 관리비운영명세서\n4. 공개절차\n5. 연습문제 3개' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance/housing-manager" className="text-gray-500 hover:text-gray-700">주택관리사(보)</Link>
            <span className="text-gray-300">/</span>
            <span className="text-cyan-600 font-medium">회계원리</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📊 회계원리</h1>
          <p className="text-gray-600">주택관리사(보) 1차 시험 - 회계원리 학습</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">학습 진행률</span>
            <span className="text-cyan-600 font-bold">{completedQuestions.length}/{totalQuestions} ({progress}%)</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <button
                onClick={() => setOpenTopics(prev => prev.includes(topicIdx) ? prev.filter(t => t !== topicIdx) : [...prev, topicIdx])}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{topicIdx + 1}</span>
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm text-gray-500">({topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length})</span>
                </div>
                <span className={`transform transition ${openTopics.includes(topicIdx) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openTopics.includes(topicIdx) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex gap-4">
                        <input
                          type="checkbox"
                          checked={completedQuestions.includes(q.id)}
                          onChange={() => toggleQuestion(q.id)}
                          className="mt-1 w-5 h-5 rounded text-cyan-600 shrink-0"
                        />
                        <div className="flex-1">
                          <p className="font-medium mb-2">{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-2">{q.answer}</p>
                          <button
                            onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="px-3 py-1 bg-cyan-100 text-cyan-600 rounded-lg text-sm hover:bg-cyan-200 transition"
                          >
                            🤖 AI에게 자세히 묻기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/category/insurance/housing-manager" className="text-cyan-600 hover:text-cyan-700 font-medium">
            ← 주택관리사(보) 메인으로
          </Link>
        </div>
      </main>

      {/* AI Modal */}
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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. 주택관리사(보) 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
