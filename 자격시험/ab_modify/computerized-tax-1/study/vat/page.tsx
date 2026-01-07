'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VatStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['tax-base']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-tax-1-vat-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('computerized-tax-1-vat-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 과세표준 (1-10)
    { id: 1, topic: 'tax-base', question: '부가가치세 과세표준의 개념과 범위를 설명하시오.', answer: '공급가액 = 거래상대방으로부터 받은 금전적 가치의 합계액', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 부가가치세 과세표준의 개념과 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준의 정의\n2. 과세표준에 포함되는 항목\n3. 과세표준에서 제외되는 항목\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 2, topic: 'tax-base', question: '재화의 공급시기와 과세표준 확정시기를 설명하시오.', answer: '인도일/이용가능일/대가수령일 중 빠른 날', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 재화의 공급시기와 과세표준 확정시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일반적인 공급시기\n2. 특수한 경우의 공급시기\n3. 과세표준 확정시기\n4. 세금계산서 발급시기와의 관계\n5. 연습문제 3개' },
    { id: 3, topic: 'tax-base', question: '용역의 공급시기와 과세표준을 설명하시오.', answer: '용역제공 완료일 또는 대가수령일', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 용역의 공급시기와 과세표준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용역의 공급시기 원칙\n2. 중간지급조건부 용역\n3. 완성도기준지급 용역\n4. 용역의 과세표준\n5. 연습문제 3개' },
    { id: 4, topic: 'tax-base', question: '에누리액과 할인액의 과세표준 처리를 설명하시오.', answer: '에누리: 과세표준 불포함, 매출할인: 공급시기 이후 차감 불가', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 에누리액과 할인액의 과세표준 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 에누리액의 정의와 처리\n2. 환입액(반품)의 처리\n3. 매출할인과의 차이\n4. 수정세금계산서 발급\n5. 연습문제 3개' },
    { id: 5, topic: 'tax-base', question: '부당행위계산 부인에 따른 과세표준 계산을 설명하시오.', answer: '시가보다 낮은 대가: 시가를 과세표준으로 적용', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 부당행위계산 부인에 따른 과세표준 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부당행위계산 부인의 의의\n2. 적용 대상 거래\n3. 시가 적용 기준\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 6, topic: 'tax-base', question: '재화의 수입에 대한 과세표준을 설명하시오.', answer: '관세과세가격 + 관세 + 개별소비세 + 주세 + 교육세 + 농특세', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 재화의 수입에 대한 과세표준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수입재화의 과세표준 구성\n2. 관세과세가격의 의미\n3. 가산세 항목\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 7, topic: 'tax-base', question: '외화표시 과세표준의 환산 방법을 설명하시오.', answer: '공급시기 기준 기준환율/재정환율 적용', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 외화표시 과세표준의 환산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환산 기준시점\n2. 적용 환율 종류\n3. 수출재화의 환산\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 8, topic: 'tax-base', question: '간주공급에 대한 과세표준을 설명하시오.', answer: '자가공급/개인적공급/사업상증여/폐업시잔존재화 = 시가', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 간주공급에 대한 과세표준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 간주공급의 유형\n2. 시가 적용 원칙\n3. 취득가액 적용 조건\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 9, topic: 'tax-base', question: '토지와 건물의 일괄공급 시 과세표준 안분을 설명하시오.', answer: '기준시가 비율로 안분하여 건물분만 과세', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 토지와 건물의 일괄공급 시 과세표준 안분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 토지의 면세 원칙\n2. 안분계산 기준\n3. 기준시가의 의미\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 10, topic: 'tax-base', question: '대손세액공제와 과세표준 수정을 설명하시오.', answer: '대손확정시 대손세액공제, 회수시 매출세액 가산', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 대손세액공제와 과세표준 수정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대손세액공제의 요건\n2. 공제 가능 시기\n3. 대손금 회수시 처리\n4. 계산 및 신고 예시\n5. 연습문제 3개' },

    // 매입세액공제 (11-20)
    { id: 11, topic: 'input-tax', question: '매입세액공제의 기본 요건을 설명하시오.', answer: '사업관련 + 적격증빙(세금계산서 등) + 불공제 해당 없음', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 매입세액공제의 기본 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업관련성 요건\n2. 적격증빙 요건\n3. 공제시기\n4. 불공제 항목 확인\n5. 연습문제 3개' },
    { id: 12, topic: 'input-tax', question: '공제받지 못하는 매입세액의 유형을 설명하시오.', answer: '비영업용 승용차, 접대비, 면세사업, 사업무관 등', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 공제받지 못하는 매입세액의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비영업용 승용차 관련\n2. 접대비 관련\n3. 면세사업 관련\n4. 사업무관 지출\n5. 연습문제 3개' },
    { id: 13, topic: 'input-tax', question: '공통매입세액의 안분계산을 설명하시오.', answer: '과세/면세 공통사용분 = 과세공급가액 비율로 안분', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 공통매입세액의 안분계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공통매입세액의 정의\n2. 안분계산 공식\n3. 면세비율 계산\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 14, topic: 'input-tax', question: '의제매입세액공제 제도를 설명하시오.', answer: '면세농산물 등 구입시 일정률의 매입세액 공제', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 의제매입세액공제 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의제매입세액공제의 취지\n2. 공제대상과 공제율\n3. 한도 계산\n4. 신청 및 계산 예시\n5. 연습문제 3개' },
    { id: 15, topic: 'input-tax', question: '재활용폐자원 매입세액공제를 설명하시오.', answer: '재활용폐자원 중고품 매입시 일정률 공제', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 재활용폐자원 매입세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제 대상 재화\n2. 공제율\n3. 한도 계산\n4. 신청 요건과 절차\n5. 연습문제 3개' },
    { id: 16, topic: 'input-tax', question: '신용카드매출전표 등에 의한 매입세액공제를 설명하시오.', answer: '세금계산서 대신 신용카드전표로 매입세액 공제 가능', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 신용카드매출전표 등에 의한 매입세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제 가능한 증빙 종류\n2. 공제 요건\n3. 공제 제외 대상\n4. 신고 방법\n5. 연습문제 3개' },
    { id: 17, topic: 'input-tax', question: '납부세액 또는 환급세액의 계산 구조를 설명하시오.', answer: '매출세액 - 매입세액 - 기타공제 + 가산세 = 납부(환급)세액', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 납부세액 또는 환급세액의 계산 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출세액 계산\n2. 매입세액 공제\n3. 경감/공제세액\n4. 납부(환급)세액 계산\n5. 연습문제 3개' },
    { id: 18, topic: 'input-tax', question: '비영업용 소형승용차 관련 매입세액 불공제를 설명하시오.', answer: '개별소비세 과세대상 승용차 취득/유지비용 불공제', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 비영업용 소형승용차 관련 매입세액 불공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불공제 대상 차량 범위\n2. 영업용 판단 기준\n3. 공제 가능한 예외\n4. 유지비용 처리\n5. 연습문제 3개' },
    { id: 19, topic: 'input-tax', question: '사업자등록 전 매입세액 공제를 설명하시오.', answer: '등록신청일로부터 20일 이내 역산한 매입세액 공제', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 사업자등록 전 매입세액 공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제 가능 기간\n2. 공제 요건\n3. 세금계산서 기재 방법\n4. 신고 방법\n5. 연습문제 3개' },
    { id: 20, topic: 'input-tax', question: '고정자산 매입세액 정산제도를 설명하시오.', answer: '취득 후 과세/면세 비율 변동시 매입세액 재계산', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 고정자산 매입세액 정산제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정산제도의 취지\n2. 정산 대상과 기간\n3. 정산 계산 방법\n4. 납부/환급 처리\n5. 연습문제 3개' },

    // 간이과세 (21-30)
    { id: 21, topic: 'simplified-tax', question: '간이과세자의 요건과 범위를 설명하시오.', answer: '연 공급대가 8,000만원 미만(부동산임대/과세유흥장소 4,800만원)', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 간이과세자의 요건과 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 간이과세 기준금액\n2. 업종별 차이\n3. 간이과세 배제 사업\n4. 신규사업자 판단\n5. 연습문제 3개' },
    { id: 22, topic: 'simplified-tax', question: '간이과세자의 납부세액 계산을 설명하시오.', answer: '공급대가 x 업종별 부가가치율 x 10% - 공제세액', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 간이과세자의 납부세액 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납부세액 계산 공식\n2. 업종별 부가가치율\n3. 공제세액 계산\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 23, topic: 'simplified-tax', question: '간이과세자의 부가가치율을 업종별로 설명하시오.', answer: '소매업 15%, 제조업 20%, 음식숙박 30%, 서비스업 40%', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 간이과세자의 부가가치율을 업종별로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 업종별 부가가치율\n2. 복수업종 사업자 계산\n3. 부가가치율 적용 예시\n4. 개정 연혁\n5. 연습문제 3개' },
    { id: 24, topic: 'simplified-tax', question: '간이과세자의 세금계산서 발급과 영수증 발급을 설명하시오.', answer: '원칙적 영수증 발급, 세금계산서 발급시 일반과세 적용', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 간이과세자의 세금계산서 발급과 영수증 발급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원칙: 영수증 발급\n2. 세금계산서 발급 가능 조건\n3. 발급시 세액 계산 변경\n4. 매입자발행세금계산서\n5. 연습문제 3개' },
    { id: 25, topic: 'simplified-tax', question: '간이과세자의 납부의무 면제를 설명하시오.', answer: '연 공급대가 4,800만원 미만시 납부의무 면제', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 간이과세자의 납부의무 면제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 면제 기준금액\n2. 신고의무 존속 여부\n3. 매입세액 공제 가능 여부\n4. 적용 예시\n5. 연습문제 3개' },
    { id: 26, topic: 'simplified-tax', question: '일반과세자에서 간이과세자로의 전환을 설명하시오.', answer: '직전연도 공급대가 기준, 7월 1일 전환', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 일반과세자에서 간이과세자로의 전환을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전환 기준과 시기\n2. 재고품 등 매입세액 정산\n3. 신고/납부 방법 변경\n4. 전환 사례\n5. 연습문제 3개' },
    { id: 27, topic: 'simplified-tax', question: '간이과세자에서 일반과세자로의 전환을 설명하시오.', answer: '기준금액 초과시 다음 과세기간부터 일반과세 적용', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 간이과세자에서 일반과세자로의 전환을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전환 사유와 시기\n2. 재고품 등 매입세액 공제\n3. 세금계산서 발급의무\n4. 전환 사례\n5. 연습문제 3개' },
    { id: 28, topic: 'simplified-tax', question: '간이과세자의 신고기한과 신고서 작성을 설명하시오.', answer: '1년 1회 신고(1.1~1.25), 간이과세자 전용 신고서', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 간이과세자의 신고기한과 신고서 작성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고 기간과 기한\n2. 예정부과와 예정신고\n3. 신고서 작성 방법\n4. 첨부 서류\n5. 연습문제 3개' },
    { id: 29, topic: 'simplified-tax', question: '간이과세 배제 사업을 설명하시오.', answer: '광업, 제조업 일부, 부동산매매업, 과세유흥장소 등', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 간이과세 배제 사업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 간이과세 배제 업종\n2. 간이과세 배제 지역\n3. 배제 사유\n4. 일반과세 적용 예시\n5. 연습문제 3개' },
    { id: 30, topic: 'simplified-tax', question: '간이과세자의 재고납부세액을 설명하시오.', answer: '간이과세 전환시 재고품에 대한 매입세액 차액 납부', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 간이과세자의 재고납부세액을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재고납부세액의 의의\n2. 계산 방법\n3. 신고/납부 시기\n4. 계산 예시\n5. 연습문제 3개' },

    // 신고납부 (31-40)
    { id: 31, topic: 'filing-payment', question: '부가가치세 과세기간과 신고기한을 설명하시오.', answer: '1기(1~6월)/2기(7~12월), 확정신고 25일 이내', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 부가가치세 과세기간과 신고기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세기간 구분\n2. 예정신고/확정신고\n3. 신고기한\n4. 납부기한\n5. 연습문제 3개' },
    { id: 32, topic: 'filing-payment', question: '예정신고와 예정고지의 차이를 설명하시오.', answer: '예정신고: 자진신고, 예정고지: 세무서 고지', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 예정신고와 예정고지의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예정신고 대상자\n2. 예정고지 대상자\n3. 고지세액 계산\n4. 환급시 처리\n5. 연습문제 3개' },
    { id: 33, topic: 'filing-payment', question: '영세율 신고와 영세율 첨부서류를 설명하시오.', answer: '수출 등 영세율 적용시 증빙서류 첨부 필수', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 영세율 신고와 영세율 첨부서류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영세율 적용 거래\n2. 첨부서류 종류\n3. 서류 미제출시 불이익\n4. 신고서 작성 방법\n5. 연습문제 3개' },
    { id: 34, topic: 'filing-payment', question: '세금계산서 합계표의 작성과 제출을 설명하시오.', answer: '매출/매입 세금계산서 합계표 각각 제출', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 세금계산서 합계표의 작성과 제출을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출처별 세금계산서합계표\n2. 매입처별 세금계산서합계표\n3. 전자세금계산서 특례\n4. 불성실 가산세\n5. 연습문제 3개' },
    { id: 35, topic: 'filing-payment', question: '전자세금계산서 발급의무와 전송기한을 설명하시오.', answer: '법인/개인 3억 이상: 발급일 다음날까지 전송', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 전자세금계산서 발급의무와 전송기한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전자발급 의무자\n2. 발급 및 전송기한\n3. 세액공제 혜택\n4. 미전송 가산세\n5. 연습문제 3개' },
    { id: 36, topic: 'filing-payment', question: '수정신고와 경정청구의 차이를 설명하시오.', answer: '수정신고: 과소신고 수정, 경정청구: 과다신고 환급 청구', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 수정신고와 경정청구의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수정신고의 요건과 절차\n2. 경정청구의 요건과 기한\n3. 가산세 감면\n4. 각각의 사례\n5. 연습문제 3개' },
    { id: 37, topic: 'filing-payment', question: '환급세액의 발생과 환급 절차를 설명하시오.', answer: '매입세액 > 매출세액인 경우 환급, 30일 이내 지급', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 환급세액의 발생과 환급 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환급세액 발생 사유\n2. 조기환급 대상\n3. 환급 신청 절차\n4. 환급 지연 이자\n5. 연습문제 3개' },
    { id: 38, topic: 'filing-payment', question: '조기환급 신고와 요건을 설명하시오.', answer: '영세율/시설투자 등 매입세액 조기환급 가능', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 조기환급 신고와 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조기환급 대상\n2. 신고 기한\n3. 첨부 서류\n4. 환급 기한\n5. 연습문제 3개' },
    { id: 39, topic: 'filing-payment', question: '부가가치세 신고서 주요 항목 작성을 설명하시오.', answer: '과세표준/매출세액/매입세액/경감공제/납부세액 순서', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 부가가치세 신고서 주요 항목 작성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준 및 매출세액\n2. 매입세액\n3. 경감/공제세액\n4. 차가감납부(환급)세액\n5. 연습문제 3개' },
    { id: 40, topic: 'filing-payment', question: '국세기본법상 납부지연 가산세를 설명하시오.', answer: '미납일수 x 22/100,000 x 미납세액', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 국세기본법상 납부지연 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납부지연 가산세 계산\n2. 일수 계산 방법\n3. 한도 규정\n4. 계산 예시\n5. 연습문제 3개' },

    // 가산세 (41-50)
    { id: 41, topic: 'penalty-tax', question: '사업자등록 관련 가산세를 설명하시오.', answer: '미등록/허위등록: 공급가액의 1%', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 사업자등록 관련 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미등록 가산세\n2. 타인명의등록 가산세\n3. 계산 예시\n4. 면제 사유\n5. 연습문제 3개' },
    { id: 42, topic: 'penalty-tax', question: '세금계산서 미발급 가산세를 설명하시오.', answer: '공급가액의 2% (전자세금계산서 미발급 포함)', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 세금계산서 미발급 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미발급 가산세율\n2. 지연발급 가산세\n3. 가공/위장 세금계산서\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 43, topic: 'penalty-tax', question: '세금계산서 부실기재 가산세를 설명하시오.', answer: '필요적 기재사항 누락/오류: 공급가액의 1%', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 세금계산서 부실기재 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필요적 기재사항\n2. 부실기재 유형\n3. 가산세율\n4. 수정세금계산서와의 관계\n5. 연습문제 3개' },
    { id: 44, topic: 'penalty-tax', question: '전자세금계산서 전송 관련 가산세를 설명하시오.', answer: '지연전송 0.3%, 미전송 0.5%', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 전자세금계산서 전송 관련 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전송기한\n2. 지연전송 가산세\n3. 미전송 가산세\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 45, topic: 'penalty-tax', question: '매출처별 세금계산서합계표 불성실 가산세를 설명하시오.', answer: '미제출/부실기재: 공급가액의 0.5%', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 매출처별 세금계산서합계표 불성실 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미제출 가산세\n2. 부실기재 가산세\n3. 지연제출 감면\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 46, topic: 'penalty-tax', question: '매입처별 세금계산서합계표 불성실 가산세를 설명하시오.', answer: '미제출/부실기재: 공급가액의 0.5%, 매입세액 불공제', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 매입처별 세금계산서합계표 불성실 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가산세 부과 사유\n2. 매입세액 공제 여부\n3. 경정시 공제 가능 여부\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 47, topic: 'penalty-tax', question: '신고불성실 가산세(무신고/과소신고)를 설명하시오.', answer: '무신고: 20%(부정 40%), 과소신고: 10%(부정 40%)', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 신고불성실 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무신고 가산세율\n2. 과소신고 가산세율\n3. 부정행위 가중\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 48, topic: 'penalty-tax', question: '영세율 과세표준 신고불성실 가산세를 설명하시오.', answer: '영세율 과세표준 미신고/과소신고: 0.5%', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 영세율 과세표준 신고불성실 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가산세 부과 사유\n2. 가산세율\n3. 일반 무신고와의 차이\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 49, topic: 'penalty-tax', question: '현금매출명세서 미제출 가산세를 설명하시오.', answer: '미제출/부실기재: 수입금액의 1%', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 현금매출명세서 미제출 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제출 의무자\n2. 제출 기한\n3. 가산세율\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 50, topic: 'penalty-tax', question: '가산세 중복 적용 배제와 감면 규정을 설명하시오.', answer: '동일 사유 중복시 큰 금액만 적용, 기한후신고 감면', prompt: '전산세무 1급 부가가치세 문제입니다.\n\n문제: 가산세 중복 적용 배제와 감면 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중복 적용 배제 원칙\n2. 기한후신고 감면율\n3. 수정신고 감면율\n4. 적용 사례\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'tax-base', name: '과세표준', icon: '📊', count: 10 },
    { id: 'input-tax', name: '매입세액공제', icon: '💰', count: 10 },
    { id: 'simplified-tax', name: '간이과세', icon: '📝', count: 10 },
    { id: 'filing-payment', name: '신고납부', icon: '📋', count: 10 },
    { id: 'penalty-tax', name: '가산세', icon: '⚠️', count: 10 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-tax-1" className="text-gray-500 hover:text-gray-700">전산세무 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500">학습</span>
            <span className="text-gray-300">/</span>
            <span className="text-purple-600 font-medium">부가가치세</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-purple-600 to-violet-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">💸</div>
            <div>
              <h1 className="text-2xl font-bold">부가가치세</h1>
              <p className="text-purple-100">필기시험 5문항 | 과세표준, 매입세액, 간이과세, 신고납부, 가산세</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>학습 진행률</span>
              <span>{completedQuestions.length} / {questions.length} ({progress}%)</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {topics.map(topic => {
            const topicQuestions = questions.filter(q => q.topic === topic.id);
            const completed = topicQuestions.filter(q => completedQuestions.includes(q.id)).length;
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`p-3 rounded-xl text-left transition ${
                  expandedTopics.includes(topic.id)
                    ? 'bg-purple-100 border-2 border-purple-300'
                    : 'bg-white border border-gray-200 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{topic.icon}</span>
                  <span className="font-medium text-sm">{topic.name}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{completed}/{topic.count} 완료</div>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            expandedTopics.includes(topic.id) && (
              <div key={topic.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                  <h2 className="font-bold flex items-center gap-2">
                    <span>{topic.icon}</span> {topic.name}
                  </h2>
                  <span className="text-sm text-gray-500">{topic.count}문항</span>
                </div>
                <div className="divide-y">
                  {questions.filter(q => q.topic === topic.id).map(q => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-purple-500 border-purple-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : ''}`}>
                              {q.id}. {q.question}
                            </p>
                            <button
                              onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition flex-shrink-0"
                            >
                              AI
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{q.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Link href="/category/accounting/computerized-tax-1/study/income-tax" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 소득세
          </Link>
          <Link href="/category/accounting/computerized-tax-1/study/practical" className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            실무연습 →
          </Link>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">2026 자격증 가이드. 전산세무 1급 부가가치세 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
