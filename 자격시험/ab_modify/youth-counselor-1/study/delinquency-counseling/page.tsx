'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DelinquencyCounselingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-1-delinquency-counseling-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-counselor-1-delinquency-counseling-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const toggleTopic = (index: number) => {
    setExpandedTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const topics = [
    {
      title: '청소년 비행의 이해',
      icon: '📚',
      questions: [
        { id: 1, question: '청소년 비행의 정의와 유형을 설명하시오.', answer: '지위비행, 범죄비행, 우범행위로 구분', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 청소년 비행의 정의와 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비행의 정의\n2. 지위비행의 유형\n3. 범죄비행의 유형\n4. 우범행위의 의미\n5. 연습문제 3개' },
        { id: 2, question: '청소년 비행의 발달적 경로를 설명하시오.', answer: '초기발현형 vs 청소년기한정형 비행', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 청소년 비행의 발달적 경로를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Moffitt의 이중경로 이론\n2. 초기발현형의 특성\n3. 청소년기한정형의 특성\n4. 상담적 함의\n5. 연습문제 3개' },
        { id: 3, question: '비행청소년의 심리적 특성을 설명하시오.', answer: '낮은 자존감, 충동성, 공격성, 공감능력 부족', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비행청소년의 심리적 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인지적 특성\n2. 정서적 특성\n3. 행동적 특성\n4. 관계적 특성\n5. 연습문제 3개' },
        { id: 4, question: '비행청소년의 가정환경 특성을 설명하시오.', answer: '가정폭력, 부모 감독 부재, 역기능적 양육', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비행청소년의 가정환경 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가족 구조 요인\n2. 양육 방식\n3. 가정 내 폭력\n4. 부모-자녀 관계\n5. 연습문제 3개' },
        { id: 5, question: '비행과 또래집단의 관계를 설명하시오.', answer: '비행또래 선택, 비행학습, 집단압력', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비행과 또래집단의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비행또래 영향\n2. 선택효과 vs 사회화효과\n3. 갱단(gang) 문제\n4. 또래관계 개입\n5. 연습문제 3개' },
        { id: 6, question: '학교 부적응과 비행의 관계를 설명하시오.', answer: '학업실패, 학교유대감 약화, 학업중단', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 학교 부적응과 비행의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학교 실패와 비행\n2. 학교유대감 이론\n3. 학업중단과 비행\n4. 학교 기반 예방\n5. 연습문제 3개' }
      ]
    },
    {
      title: '비행이론',
      icon: '🎯',
      questions: [
        { id: 7, question: '긴장이론(Strain Theory)을 설명하시오.', answer: 'Merton, Agnew의 일반긴장이론', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 긴장이론(Strain Theory)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Merton의 아노미 이론\n2. Agnew의 일반긴장이론\n3. 긴장의 유형\n4. 상담적 적용\n5. 연습문제 3개' },
        { id: 8, question: '사회학습이론과 비행을 설명하시오.', answer: 'Bandura, Akers의 차별적 강화이론', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 사회학습이론과 비행을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Bandura의 사회학습이론\n2. Akers의 차별적 강화이론\n3. 비행 학습 과정\n4. 개입 전략\n5. 연습문제 3개' },
        { id: 9, question: '통제이론(Control Theory)을 설명하시오.', answer: 'Hirschi의 사회유대이론, 자기통제이론', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 통제이론(Control Theory)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사회유대이론의 4요소\n2. 자기통제이론\n3. 낮은 자기통제의 특성\n4. 유대강화 개입\n5. 연습문제 3개' },
        { id: 10, question: '낙인이론(Labeling Theory)을 설명하시오.', answer: '비행자 낙인의 2차 비행 유발 효과', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 낙인이론(Labeling Theory)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 낙인이론의 핵심 개념\n2. 1차 비행과 2차 비행\n3. 낙인의 부정적 효과\n4. 다이버전 프로그램\n5. 연습문제 3개' },
        { id: 11, question: '발달적 범죄학 이론을 설명하시오.', answer: '생애과정이론, 발달경로 모델', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 발달적 범죄학 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발달적 접근의 특징\n2. Sampson과 Laub의 이론\n3. 전환점의 중요성\n4. 발달 기반 개입\n5. 연습문제 3개' },
        { id: 12, question: '위험요인-보호요인 모델을 설명하시오.', answer: '다중 위험요인 누적, 보호요인의 완충효과', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 위험요인-보호요인 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위험요인의 유형\n2. 보호요인의 유형\n3. 누적적 위험 모델\n4. 평가와 개입 적용\n5. 연습문제 3개' }
      ]
    },
    {
      title: '소년사법체계',
      icon: '⚖️',
      questions: [
        { id: 13, question: '소년법의 목적과 이념을 설명하시오.', answer: '환경조정과 품행교정을 통한 건전 육성', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 소년법의 목적과 이념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소년법의 목적\n2. 국친사상과 보호주의\n3. 형사사법과의 차이\n4. 최근 동향\n5. 연습문제 3개' },
        { id: 14, question: '소년보호사건의 처리절차를 설명하시오.', answer: '송치/통고 → 조사 → 심리 → 보호처분', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 소년보호사건의 처리절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사건 접수 경로\n2. 조사 절차\n3. 심리 과정\n4. 처분 결정\n5. 연습문제 3개' },
        { id: 15, question: '소년법상 보호처분의 종류와 내용을 설명하시오.', answer: '1호~10호까지 10가지 보호처분', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 소년법상 보호처분의 종류와 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1~4호 처분 (사회 내 처우)\n2. 5~7호 처분 (수강/사회봉사)\n3. 8~10호 처분 (시설 내 처우)\n4. 처분 결정 고려사항\n5. 연습문제 3개' },
        { id: 16, question: '소년분류심사원의 역할과 기능을 설명하시오.', answer: '분류심사, 상담조사, 일시보호', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 소년분류심사원의 역할과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분류심사원의 설치 목적\n2. 분류심사 내용\n3. 상담조사 방법\n4. 처우 의견 제시\n5. 연습문제 3개' },
        { id: 17, question: '소년원의 교육과 처우를 설명하시오.', answer: '인성교육, 학과교육, 직업훈련', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 소년원의 교육과 처우를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소년원의 종류\n2. 교육 프로그램\n3. 상담 및 심리치료\n4. 사회복귀 지원\n5. 연습문제 3개' },
        { id: 18, question: '보호관찰제도와 청소년 보호관찰을 설명하시오.', answer: '지도감독, 원호, 조건부 준수사항', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 보호관찰제도와 청소년 보호관찰을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보호관찰의 정의와 목적\n2. 청소년 보호관찰 특성\n3. 준수사항과 지도\n4. 보호관찰관의 역할\n5. 연습문제 3개' },
        { id: 19, question: '다이버전(Diversion)의 개념과 프로그램을 설명하시오.', answer: '공식절차 이전 대안적 처우', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 다이버전(Diversion)의 개념과 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다이버전의 개념\n2. 다이버전의 유형\n3. 국내 다이버전 프로그램\n4. 효과와 한계\n5. 연습문제 3개' }
      ]
    },
    {
      title: '비행상담의 접근',
      icon: '💬',
      questions: [
        { id: 20, question: '비행청소년 상담의 특성과 원칙을 설명하시오.', answer: '비자발성 극복, 신뢰관계, 강점 발견', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비행청소년 상담의 특성과 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비행상담의 특성\n2. 핵심 원칙\n3. 라포 형성 전략\n4. 초기 저항 다루기\n5. 연습문제 3개' },
        { id: 21, question: '동기강화상담(MI)의 비행상담 적용을 설명하시오.', answer: 'OARS 기술, 변화대화 이끌어내기', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 동기강화상담(MI)의 비행상담 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MI의 기본 원리\n2. OARS 기술\n3. 양가감정 탐색\n4. 비행청소년 적용 사례\n5. 연습문제 3개' },
        { id: 22, question: '인지행동치료(CBT)의 비행상담 적용을 설명하시오.', answer: '인지왜곡 수정, 문제해결훈련, 분노조절', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 인지행동치료(CBT)의 비행상담 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CBT의 기본 원리\n2. 비행 관련 인지왜곡\n3. 개입 기법\n4. 효과성 연구\n5. 연습문제 3개' },
        { id: 23, question: '분노조절 프로그램을 설명하시오.', answer: '분노 인식, 촉발요인, 대처전략 훈련', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 분노조절 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분노와 공격성의 관계\n2. 분노조절 프로그램 구성\n3. 주요 기법\n4. 프로그램 효과\n5. 연습문제 3개' },
        { id: 24, question: '사회기술훈련(SST)의 비행상담 적용을 설명하시오.', answer: '대인관계기술, 자기주장, 갈등해결 훈련', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 사회기술훈련(SST)의 비행상담 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SST의 기본 원리\n2. 비행청소년 대상 SST 내용\n3. 훈련 방법\n4. 효과와 한계\n5. 연습문제 3개' },
        { id: 25, question: '공감능력 향상 프로그램을 설명하시오.', answer: '피해자 입장 이해, 조망수용 훈련', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 공감능력 향상 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공감과 비행의 관계\n2. 프로그램 구성\n3. 주요 활동\n4. 효과 연구\n5. 연습문제 3개' }
      ]
    },
    {
      title: '가족치료와 비행',
      icon: '👨‍👩‍👧‍👦',
      questions: [
        { id: 26, question: '다중체계치료(MST)를 설명하시오.', answer: '가정 기반, 개인-가족-또래-학교-지역사회 다층 개입', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 다중체계치료(MST)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MST의 개념과 특징\n2. 9가지 치료 원칙\n3. 개입 과정\n4. 효과성 연구\n5. 연습문제 3개' },
        { id: 27, question: '기능적 가족치료(FFT)를 설명하시오.', answer: '가족 관계패턴 변화를 통한 비행 감소', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 기능적 가족치료(FFT)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FFT의 개념\n2. 치료 단계\n3. 핵심 기법\n4. 비행청소년 적용\n5. 연습문제 3개' },
        { id: 28, question: '부모훈련 프로그램을 설명하시오.', answer: '긍정적 양육, 일관된 훈육, 모니터링 향상', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 부모훈련 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부모훈련의 목적\n2. 프로그램 내용\n3. 효과적인 양육 기술\n4. 비행예방 효과\n5. 연습문제 3개' },
        { id: 29, question: '비행청소년 가족상담의 접근을 설명하시오.', answer: '가족체계 평가, 의사소통 개선, 역할 재구조화', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비행청소년 가족상담의 접근을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가족상담의 필요성\n2. 가족 평가\n3. 개입 전략\n4. 주의사항\n5. 연습문제 3개' }
      ]
    },
    {
      title: '비행유형별 상담',
      icon: '🔍',
      questions: [
        { id: 30, question: '폭력 비행 청소년의 상담을 설명하시오.', answer: '분노조절, 공격성 감소, 대안적 행동 개발', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 폭력 비행 청소년의 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폭력 비행의 원인\n2. 폭력성 평가\n3. 상담 접근\n4. 재발 예방\n5. 연습문제 3개' },
        { id: 31, question: '절도 비행 청소년의 상담을 설명하시오.', answer: '충동통제, 도덕성 발달, 책임감 교육', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 절도 비행 청소년의 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 절도 비행의 유형과 원인\n2. 동기 탐색\n3. 상담 접근\n4. 재발 예방\n5. 연습문제 3개' },
        { id: 32, question: '성비행 청소년의 상담을 설명하시오.', answer: '성인지 교육, 건전한 성태도, 피해자 공감', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 성비행 청소년의 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성비행의 유형\n2. 성비행 청소년 특성\n3. 상담 접근\n4. 재범 예방\n5. 연습문제 3개' },
        { id: 33, question: '약물 비행 청소년의 상담을 설명하시오.', answer: '약물 사용 평가, 동기강화, 재발 예방', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 약물 비행 청소년의 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 약물 사용 현황\n2. 약물 문제 평가\n3. 상담 접근\n4. 재발 예방\n5. 연습문제 3개' },
        { id: 34, question: '사이버 비행 청소년의 상담을 설명하시오.', answer: '인터넷 범죄, 디지털 윤리, 법적 책임 교육', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 사이버 비행 청소년의 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사이버 비행의 유형\n2. 청소년 특성과 동기\n3. 상담 접근\n4. 디지털 시민성 교육\n5. 연습문제 3개' },
        { id: 35, question: '학교폭력 가해 청소년의 상담을 설명하시오.', answer: '가해 동기 탐색, 피해자 공감, 책임지기', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 학교폭력 가해 청소년의 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가해 청소년의 특성\n2. 가해 동기 탐색\n3. 상담 접근\n4. 피해자 관계 회복\n5. 연습문제 3개' }
      ]
    },
    {
      title: '회복적 사법과 정의',
      icon: '🤝',
      questions: [
        { id: 36, question: '회복적 사법(Restorative Justice)의 개념과 원리를 설명하시오.', answer: '피해자-가해자-지역사회의 관계 회복', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 회복적 사법(Restorative Justice)의 개념과 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회복적 사법의 정의\n2. 핵심 원리\n3. 응보적 사법과의 차이\n4. 청소년 사법에서의 적용\n5. 연습문제 3개' },
        { id: 37, question: '피해자-가해자 조정(VOM)을 설명하시오.', answer: '대면 대화를 통한 피해 회복과 책임 수용', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 피해자-가해자 조정(VOM)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. VOM의 개념\n2. 진행 절차\n3. 조정자의 역할\n4. 효과와 한계\n5. 연습문제 3개' },
        { id: 38, question: '가족집단회의(FGC)를 설명하시오.', answer: '가족과 지역사회가 함께 문제해결책 논의', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 가족집단회의(FGC)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FGC의 개념과 기원\n2. 진행 절차\n3. 참여자 역할\n4. 국내 적용 사례\n5. 연습문제 3개' },
        { id: 39, question: '학교에서의 회복적 생활교육을 설명하시오.', answer: '평화로운 갈등해결, 관계 회복 중심 접근', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 학교에서의 회복적 생활교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회복적 생활교육의 개념\n2. 서클 활동\n3. 갈등조정 절차\n4. 학교폭력 예방 효과\n5. 연습문제 3개' }
      ]
    },
    {
      title: '재범 예방과 사회복귀',
      icon: '🔄',
      questions: [
        { id: 40, question: '비행청소년의 재범 위험요인 평가를 설명하시오.', answer: '정적 요인, 동적 요인, 위험-욕구-반응성 모델', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비행청소년의 재범 위험요인 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재범 위험 평가의 중요성\n2. 정적·동적 위험요인\n3. 평가도구\n4. RNR 모델\n5. 연습문제 3개' },
        { id: 41, question: '비행청소년의 재범 예방 프로그램을 설명하시오.', answer: '인지행동, 직업훈련, 사회기술, 가족 개입', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비행청소년의 재범 예방 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재범 예방의 원칙\n2. 효과적인 프로그램 유형\n3. 증거기반 프로그램\n4. 프로그램 효과 평가\n5. 연습문제 3개' },
        { id: 42, question: '시설 퇴소 후 사회복귀 지원을 설명하시오.', answer: '주거, 학업, 취업, 멘토링 연계', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 시설 퇴소 후 사회복귀 지원을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사회복귀의 어려움\n2. 지원 영역\n3. 연계 체계\n4. 지속적 사례관리\n5. 연습문제 3개' },
        { id: 43, question: '비행청소년 멘토링 프로그램을 설명하시오.', answer: '긍정적 성인 관계, 역할모델, 지지체계 구축', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비행청소년 멘토링 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 멘토링의 중요성\n2. 프로그램 구성\n3. 멘토 역할과 훈련\n4. 효과성 연구\n5. 연습문제 3개' },
        { id: 44, question: '지역사회 기반 비행예방을 설명하시오.', answer: '지역사회 자원 연계, 환경 개선, 주민 참여', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 지역사회 기반 비행예방을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지역사회 비행예방의 의의\n2. 예방 전략\n3. 기관 연계 체계\n4. 성공 사례\n5. 연습문제 3개' }
      ]
    },
    {
      title: '비행상담 윤리와 실제',
      icon: '📋',
      questions: [
        { id: 45, question: '비행상담에서의 비밀보장과 한계를 설명하시오.', answer: '신고의무, 법적 요구, 안전 우선', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비행상담에서의 비밀보장과 한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비밀보장의 원칙\n2. 비밀보장의 예외\n3. 법적 요구 대응\n4. 청소년에게 설명하기\n5. 연습문제 3개' },
        { id: 46, question: '비자발적 내담자 상담의 윤리적 이슈를 설명하시오.', answer: '자기결정권 존중과 사회 보호의 균형', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비자발적 내담자 상담의 윤리적 이슈를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비자발적 상담의 특성\n2. 윤리적 딜레마\n3. 자기결정권과 한계\n4. 윤리적 대처\n5. 연습문제 3개' },
        { id: 47, question: '교정시설 내 상담의 특성과 유의점을 설명하시오.', answer: '기관 환경, 역할 갈등, 전문적 경계', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 교정시설 내 상담의 특성과 유의점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교정시설 상담 환경\n2. 상담사의 역할\n3. 윤리적 이슈\n4. 효과적인 상담 전략\n5. 연습문제 3개' },
        { id: 48, question: '비행상담 기록과 보고의 원칙을 설명하시오.', answer: '객관적 기술, 법적 고려, 비밀 유지', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비행상담 기록과 보고의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기록의 목적\n2. 기록 작성 원칙\n3. 보고서 작성\n4. 기록 보관과 관리\n5. 연습문제 3개' },
        { id: 49, question: '비행상담사의 자기돌봄과 소진 예방을 설명하시오.', answer: '역전이 관리, 슈퍼비전, 경계 설정', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비행상담사의 자기돌봄과 소진 예방을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비행상담의 어려움\n2. 소진의 징후\n3. 자기돌봄 전략\n4. 조직적 지원\n5. 연습문제 3개' },
        { id: 50, question: '비행상담에서 다기관 협력의 중요성과 방법을 설명하시오.', answer: '사법-복지-교육 기관 간 연계', prompt: '청소년상담사 1급 - 비행상담 문제입니다.\n\n문제: 비행상담에서 다기관 협력의 중요성과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다기관 협력의 필요성\n2. 주요 협력 기관\n3. 정보 공유 절차\n4. 사례관리 회의\n5. 연습문제 3개' }
      ]
    }
  ];

  const progress = Math.round((completedQuestions.length / 50) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">홈</Link>
            <span className="mx-2">/</span>
            <Link href="/category/welfare" className="hover:text-gray-700">복지·상담</Link>
            <span className="mx-2">/</span>
            <Link href="/category/welfare/youth-counselor-1" className="hover:text-gray-700">청소년상담사 1급</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">비행상담</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🚨</span>
            <div>
              <h1 className="text-2xl font-bold">비행상담</h1>
              <p className="text-amber-100">선택과목 | 25문항</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span>학습 진행률</span>
              <span className="font-bold">{completedQuestions.length}/50 ({progress}%)</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3">
              <div className="bg-white h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h2 className="font-bold">{topic.title}</h2>
                    <p className="text-sm text-gray-500">{topic.questions.length}문항</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-amber-600">
                    {topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length}
                  </span>
                  <span className={`transform transition ${expandedTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedTopics.includes(topicIndex) && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border transition ${
                        completedQuestions.includes(q.id)
                          ? 'bg-amber-50 border-amber-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-amber-500 border-amber-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-amber-600 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 mb-3">
                            <span className="font-medium text-gray-700">핵심:</span> {q.answer}
                          </p>
                          <button
                            onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="px-3 py-1 bg-amber-100 text-amber-600 rounded-lg text-sm hover:bg-amber-200 transition"
                          >
                            🤖 AI에게 질문하기
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

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/category/welfare/youth-counselor-1/study/crisis-counseling"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← 이전 과목
          </Link>
          <Link
            href="/category/welfare/youth-counselor-1"
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          >
            메인으로 →
          </Link>
        </div>
      </div>

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
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">청소년상담사 1급 - 비행상담 (선택과목)</p>
        </div>
      </footer>
    </div>
  );
}
