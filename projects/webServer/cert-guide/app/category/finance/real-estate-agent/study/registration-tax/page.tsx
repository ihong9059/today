'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function RegistrationTaxStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['registration-general']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('realtor-regtax-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('realtor-regtax-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 부동산등기법 총론 (1-5)
    { id: 1, topic: 'registration-general', question: '등기의 효력(공신력, 대항력, 권리추정력)을 설명하시오.', answer: '우리나라는 공신력 불인정, 대항력 인정', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 등기의 효력(공신력, 대항력, 권리추정력)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 2, topic: 'registration-general', question: '등기절차의 종류(신청주의, 직권주의, 촉탁등기)를 설명하시오.', answer: '원칙적 신청주의, 예외적 직권·촉탁', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 등기절차의 종류(신청주의, 직권주의, 촉탁등기)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 3, topic: 'registration-general', question: '등기의 순위와 순위번호의 결정 방법을 설명하시오.', answer: '동일구 접수순위, 이구간 기재순위', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 등기의 순위와 순위번호의 결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 4, topic: 'registration-general', question: '등기기록의 구조(표제부, 갑구, 을구)를 설명하시오.', answer: '표제부(표시), 갑구(소유권), 을구(소유권 외)', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 등기기록의 구조(표제부, 갑구, 을구)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 5, topic: 'registration-general', question: '등기관의 처분에 대한 이의신청과 등기관의 조사권한을 설명하시오.', answer: '등기관 처분에 불복시 관할 지방법원에 이의', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 등기관의 처분에 대한 이의신청과 등기관의 조사권한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },

    // 소유권 등기 (6-10)
    { id: 6, topic: 'ownership', question: '소유권보존등기의 신청권자와 절차를 설명하시오.', answer: '대장상 소유자, 확정판결 받은 자 등', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 소유권보존등기의 신청권자와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 7, topic: 'ownership', question: '소유권이전등기의 신청인과 공동신청 원칙을 설명하시오.', answer: '등기권리자와 의무자 공동신청', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 소유권이전등기의 신청인과 공동신청 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 8, topic: 'ownership', question: '가등기의 효력과 본등기 전환 절차를 설명하시오.', answer: '가등기 순위보전효, 본등기시 순위확보', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 가등기의 효력과 본등기 전환 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 9, topic: 'ownership', question: '상속등기와 유증등기의 차이점을 설명하시오.', answer: '상속: 단독신청, 유증: 공동신청', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 상속등기와 유증등기의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 10, topic: 'ownership', question: '등기명의인표시변경등기와 경정등기의 차이를 설명하시오.', answer: '표시변경: 사후변경, 경정: 처음부터 착오', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 등기명의인표시변경등기와 경정등기의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },

    // 용익권/담보권 등기 (11-15)
    { id: 11, topic: 'servitude-security', question: '지상권등기의 존속기간과 지료에 관한 사항을 설명하시오.', answer: '건물 30년, 공작물 15년, 수목 10년', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 지상권등기의 존속기간과 지료에 관한 사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 12, topic: 'servitude-security', question: '저당권설정등기의 필수적 기재사항을 설명하시오.', answer: '채권액, 채무자, 변제기, 이자', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 저당권설정등기의 필수적 기재사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 13, topic: 'servitude-security', question: '전세권등기의 존속기간과 갱신에 관해 설명하시오.', answer: '최장 10년, 갱신시에도 10년 초과 불가', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 전세권등기의 존속기간과 갱신에 관해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 14, topic: 'servitude-security', question: '근저당권의 특징과 피담보채권 범위를 설명하시오.', answer: '채권최고액 한도 내 불특정 채권 담보', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 근저당권의 특징과 피담보채권 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 15, topic: 'servitude-security', question: '지역권과 임차권등기의 성립요건을 설명하시오.', answer: '지역권: 요역지·승역지 관계, 임차권: 합의시 등기', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 지역권과 임차권등기의 성립요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },

    // 공간정보관리법 (16-20)
    { id: 16, topic: 'spatial-info', question: '지적공부의 종류와 기재사항을 설명하시오.', answer: '토지대장, 임야대장, 지적도, 임야도 등', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 지적공부의 종류와 기재사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 17, topic: 'spatial-info', question: '토지이동의 종류(신규등록, 분할, 합병 등)를 설명하시오.', answer: '신규등록, 등록전환, 분할, 합병, 지목변경', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 토지이동의 종류(신규등록, 분할, 합병 등)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 18, topic: 'spatial-info', question: '지목의 종류와 지목변경 절차를 설명하시오.', answer: '28개 지목, 토지소유자 60일 내 신청', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 지목의 종류와 지목변경 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 19, topic: 'spatial-info', question: '축척변경과 등록전환의 개념과 절차를 설명하시오.', answer: '축척변경: 지적도 축척 변경, 등록전환: 임야→토지대장', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 축척변경과 등록전환의 개념과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 20, topic: 'spatial-info', question: '지적측량의 종류와 측량대행자를 설명하시오.', answer: '기초측량, 세부측량 / 한국국토정보공사', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 지적측량의 종류와 측량대행자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },

    // 부동산실명법 (21-25)
    { id: 21, topic: 'real-name', question: '명의신탁의 유형(계약, 중간생략, 3자간)을 설명하시오.', answer: '계약명의신탁, 중간생략등기형, 3자간 명의신탁', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 명의신탁의 유형(계약, 중간생략, 3자간)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 22, topic: 'real-name', question: '명의신탁 금지 위반의 효과와 예외사항을 설명하시오.', answer: '무효, 과징금·이행강제금·형사처벌', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 명의신탁 금지 위반의 효과와 예외사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 23, topic: 'real-name', question: '부동산실명법상 과징금과 이행강제금을 설명하시오.', answer: '과징금: 부동산가액 30%, 이행강제금: 매년 10%', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 부동산실명법상 과징금과 이행강제금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 24, topic: 'real-name', question: '장기미등기에 대한 제재 내용을 설명하시오.', answer: '3년 내 미등기시 과징금·이행강제금', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 장기미등기에 대한 제재 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 25, topic: 'real-name', question: '종교단체, 종중 등 명의신탁 예외 인정 사례를 설명하시오.', answer: '종중·배우자·종교단체는 유예기간 후 적용', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 종교단체, 종중 등 명의신탁 예외 인정 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },

    // 취득세 (26-30)
    { id: 26, topic: 'acquisition-tax', question: '취득세의 과세대상과 취득의 개념을 설명하시오.', answer: '부동산, 차량, 기계장비, 골프회원권 등', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 취득세의 과세대상과 취득의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 27, topic: 'acquisition-tax', question: '취득세 표준세율과 중과세율을 설명하시오.', answer: '유상 4%, 무상 3.5%, 원시취득 2.8%', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 취득세 표준세율과 중과세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 28, topic: 'acquisition-tax', question: '취득세의 비과세와 감면 사항을 설명하시오.', answer: '국가, 신탁재산, 환매권 행사 등', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 취득세의 비과세와 감면 사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 29, topic: 'acquisition-tax', question: '취득세 과세표준의 산정방법을 설명하시오.', answer: '사실상 취득가격, 시가표준액 적용', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 취득세 과세표준의 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 30, topic: 'acquisition-tax', question: '취득세 신고납부 절차와 가산세를 설명하시오.', answer: '취득일로부터 60일 내 신고납부', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 취득세 신고납부 절차와 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },

    // 재산세 (31-35)
    { id: 31, topic: 'property-tax', question: '재산세의 과세대상과 과세기준일을 설명하시오.', answer: '토지, 건축물, 주택, 항공기, 선박 / 6월 1일', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 재산세의 과세대상과 과세기준일을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 32, topic: 'property-tax', question: '재산세의 세율 체계(표준세율, 특례세율)를 설명하시오.', answer: '주택 0.1~0.4%, 건축물 0.25%, 토지 0.2~0.4%', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 재산세의 세율 체계(표준세율, 특례세율)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 33, topic: 'property-tax', question: '토지의 분리과세·별도합산·종합합산 과세를 설명하시오.', answer: '분리과세: 전·답, 별도합산: 사업용, 종합합산: 나대지', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 토지의 분리과세·별도합산·종합합산 과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 34, topic: 'property-tax', question: '재산세 과세표준과 세부담상한제를 설명하시오.', answer: '공정시장가액비율 적용, 상한 150%', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 재산세 과세표준과 세부담상한제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 35, topic: 'property-tax', question: '재산세의 납기와 분납제도를 설명하시오.', answer: '7월, 9월 분납 / 500만원 초과시 분할납부', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 재산세의 납기와 분납제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },

    // 양도소득세 (36-40)
    { id: 36, topic: 'transfer-tax', question: '양도소득세의 과세대상과 양도의 개념을 설명하시오.', answer: '토지·건물·부동산권리·주식 등 자산의 양도', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 양도소득세의 과세대상과 양도의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 37, topic: 'transfer-tax', question: '양도차익 계산 구조(양도가액-취득가액-필요경비)를 설명하시오.', answer: '양도가액 - 취득가액 - 필요경비 = 양도차익', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 양도차익 계산 구조(양도가액-취득가액-필요경비)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 38, topic: 'transfer-tax', question: '장기보유특별공제의 적용요건과 공제율을 설명하시오.', answer: '3년 이상 보유시 6~30%, 1세대1주택 최대 80%', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 장기보유특별공제의 적용요건과 공제율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 39, topic: 'transfer-tax', question: '1세대1주택 비과세 요건을 설명하시오.', answer: '2년 이상 보유(조정대상지역 거주), 실거래가 12억 이하', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 1세대1주택 비과세 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 40, topic: 'transfer-tax', question: '양도소득세 세율과 중과세를 설명하시오.', answer: '기본 6~45%, 다주택 중과 +20%p', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 양도소득세 세율과 중과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },

    // 종합부동산세 (41-45)
    { id: 41, topic: 'comprehensive-tax', question: '종합부동산세의 과세대상과 납세의무자를 설명하시오.', answer: '주택·토지 / 6월 1일 현재 소유자', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 종합부동산세의 과세대상과 납세의무자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 42, topic: 'comprehensive-tax', question: '주택분 종합부동산세의 합산과세와 과세표준을 설명하시오.', answer: '인별 합산, 공제금액 6억(1세대1주택 11억)', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 주택분 종합부동산세의 합산과세와 과세표준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 43, topic: 'comprehensive-tax', question: '종합부동산세의 세율 체계를 설명하시오.', answer: '주택 0.5~2.7%, 토지 0.75~2%', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 종합부동산세의 세율 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 44, topic: 'comprehensive-tax', question: '세부담상한과 재산세 공제에 관해 설명하시오.', answer: '전년도 세액 대비 상한 적용, 재산세 공제', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 세부담상한과 재산세 공제에 관해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 45, topic: 'comprehensive-tax', question: '종합부동산세 신고납부와 분납에 관해 설명하시오.', answer: '12월 1일~15일 납부, 500만원 초과시 분납', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 종합부동산세 신고납부와 분납에 관해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },

    // 등록면허세 (46-50)
    { id: 46, topic: 'registration-license', question: '등록면허세의 과세대상과 납세의무자를 설명하시오.', answer: '등기·등록을 받는 자', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 등록면허세의 과세대상과 납세의무자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 47, topic: 'registration-license', question: '부동산 등기에 관한 등록세율을 설명하시오.', answer: '소유권 이전 2%, 저당권 0.2%, 전세권 0.2%', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 부동산 등기에 관한 등록세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 48, topic: 'registration-license', question: '등록면허세의 중과세 대상을 설명하시오.', answer: '대도시 내 법인 본점·지점 설치 등 3배', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 등록면허세의 중과세 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 49, topic: 'registration-license', question: '면허세의 과세대상과 세율을 설명하시오.', answer: '각종 면허에 대해 1~5종 구분, 종별 세액', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 면허세의 과세대상과 세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
    { id: 50, topic: 'registration-license', question: '등록면허세의 비과세와 감면을 설명하시오.', answer: '국가·지방자치단체, 비영리사업자 등', prompt: '공인중개사 공시법·세법 문제입니다.\n\n문제: 등록면허세의 비과세와 감면을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 법조문\n3. 계산 방법(세법)\n4. 실무 적용\n5. 기출 포인트' },
  ];

  const topics = [
    { id: 'registration-general', name: '부동산등기법 총론', icon: '📋', count: 5 },
    { id: 'ownership', name: '소유권 등기', icon: '🏠', count: 5 },
    { id: 'servitude-security', name: '용익권/담보권 등기', icon: '🔒', count: 5 },
    { id: 'spatial-info', name: '공간정보관리법', icon: '🗺️', count: 5 },
    { id: 'real-name', name: '부동산실명법', icon: '📝', count: 5 },
    { id: 'acquisition-tax', name: '취득세', icon: '💰', count: 5 },
    { id: 'property-tax', name: '재산세', icon: '🏢', count: 5 },
    { id: 'transfer-tax', name: '양도소득세', icon: '📈', count: 5 },
    { id: 'comprehensive-tax', name: '종합부동산세', icon: '🏘️', count: 5 },
    { id: 'registration-license', name: '등록면허세', icon: '📄', count: 5 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance" className="text-gray-500 hover:text-gray-700">금융</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance/real-estate-agent" className="text-gray-500 hover:text-gray-700">공인중개사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">공시법·세법</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📋</div>
            <div>
              <h1 className="text-2xl font-bold">부동산공시법 및 세법</h1>
              <p className="text-teal-100">2차 시험 30문항 | 등기법, 지적법, 부동산 세법</p>
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
                    ? 'bg-teal-100 border-2 border-teal-300'
                    : 'bg-white border border-gray-200 hover:border-teal-200'
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
                              ? 'bg-teal-500 border-teal-500 text-white'
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
                              onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition flex-shrink-0"
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
          <Link href="/category/finance/real-estate-agent/study/public-law" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 부동산공법
          </Link>
          <Link href="/category/finance/real-estate-agent" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
            메인으로 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인중개사 공시법·세법 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
