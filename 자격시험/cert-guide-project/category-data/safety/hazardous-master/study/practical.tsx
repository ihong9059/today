'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'handling',
    name: '위험물 취급 실무',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '위험물 저장탱크의 주입 작업 시 안전조치를 설명하시오.', answer: '접지, 유속 제한(1m/s 이하), 통기관 개방, 탱크 내부 가스 농도 측정, 주입량 확인', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 저장탱크의 주입 작업 시 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주입 전 점검사항\n2. 접지 및 정전기 제거\n3. 유속 제한 이유\n4. 통기관 상태 확인\n5. 주입 중 모니터링\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '위험물 탱크로리 하역 작업 절차를 설명하시오.', answer: '엔진 정지, 접지, 호스 연결, 밸브 개방, 펌프 작동, 잔량 확인, 호스 세정', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 탱크로리 하역 작업 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 하역 전 안전조치\n2. 접지 및 본딩\n3. 호스 연결 점검\n4. 하역 작업 순서\n5. 하역 후 처리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '위험물 저장소의 정전기 제거 방법을 설명하시오.', answer: '접지(10Ω 이하), 본딩, 가습(상대습도 70% 이상), 유속 제한, 제전기 설치, 대전방지제', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 저장소의 정전기 제거 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접지 설치 기준\n2. 본딩 적용\n3. 가습 관리\n4. 유속 제한 기준\n5. 제전기 및 첨가제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '밀폐공간 위험물 탱크 내부 작업 시 안전조치를 설명하시오.', answer: '작업허가서, 가스 농도 측정, 환기, 송기마스크 착용, 감시인 배치, 구조장비 준비', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 밀폐공간 위험물 탱크 내부 작업 시 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업허가 절차\n2. 가스 농도 측정\n3. 환기 실시\n4. 호흡보호구 착용\n5. 비상구조 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 저장소의 온도 관리 실무를 설명하시오.', answer: '온도계 설치, 일일 측정 기록, 냉각설비 작동, 통풍 실시, 이상 온도 시 조치', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 저장소의 온도 관리 실무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온도 측정 지점\n2. 측정 주기 및 기록\n3. 냉각설비 운영\n4. 통풍 관리\n5. 이상 온도 대응\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'inspection',
    name: '안전점검 실무',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      { id: 1, question: '위험물 저장탱크의 일일 점검 항목을 설명하시오.', answer: '외관 점검(부식, 변형), 배관·밸브 누설, 계측기 작동, 소화설비 상태, 주위 정리정돈', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 저장탱크의 일일 점검 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탱크 외관 점검\n2. 배관 및 밸브 점검\n3. 계측기 확인\n4. 안전설비 점검\n5. 점검 기록 작성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '소화기의 점검 방법을 설명하시오.', answer: '외관(손상, 부식), 압력게이지, 안전핀, 호스, 분사 노즐, 설치 위치, 표시, 유효기간', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 소화기의 점검 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외관 점검\n2. 압력게이지 확인\n3. 안전핀 및 봉인\n4. 호스 및 노즐\n5. 설치 위치 및 표시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '옥내소화전의 점검 절차를 설명하시오.', answer: '소화전함 개방, 호스·관창 상태, 밸브 개폐, 방수압력, 소화전펌프 작동, 자동기동', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 옥내소화전의 점검 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소화전함 점검\n2. 호스 및 관창\n3. 밸브 작동\n4. 방수압력 측정\n5. 펌프 자동기동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '위험물 배관의 누설 검사 방법을 설명하시오.', answer: '외관 점검, 압력시험, 비눗물 도포, 가스 검지기, 누설 음 청취, 적외선 열화상', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 배관의 누설 검사 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외관 점검\n2. 압력시험\n3. 비눗물 시험\n4. 가스 검지\n5. 누설 발견 시 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '지하탱크의 누설 검사 방법을 설명하시오.', answer: '액면 측정법, 압력 측정법, 진공 측정법, 누설검사관 활용, 정기검사(5년)', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 지하탱크의 누설 검사 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 액면 측정법\n2. 압력·진공 측정법\n3. 누설검사관 활용\n4. 정기검사 주기\n5. 누설 발견 시 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'emergency',
    name: '사고대응 실무',
    color: 'from-red-500 to-pink-500',
    questions: [
      { id: 1, question: '위험물 화재 발생 시 초기 대응 절차를 설명하시오.', answer: '발견·통보, 자동소화설비 작동 확인, 초기소화, 대피유도, 소방관서 통보, 확산방지', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 화재 발생 시 초기 대응 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발견 및 전파\n2. 자동소화설비 확인\n3. 초기소화 실시\n4. 인명 대피\n5. 소방대 인계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '위험물 누출 사고 시 응급조치를 설명하시오.', answer: '화기제거, 환기, 누출원 차단, 방유제 구축, 흡수재·중화제 사용, 안전구역 설정', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 누출 사고 시 응급조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초기 조치(화기 제거)\n2. 누출원 차단\n3. 방유제 설치\n4. 흡수·중화\n5. 안전구역 및 통보\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '제4류 위험물 화재 시 포소화전 사용 절차를 설명하시오.', answer: '소화전함 개방, 호스 전개, 밸브 개방, 포 방출, 유면 덮개, 소화 확인, 재발화 감시', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 제4류 위험물 화재 시 포소화전 사용 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 포소화전 위치 확인\n2. 호스 연결 및 전개\n3. 포 방출 방법\n4. 유면 덮개 형성\n5. 소화 후 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '위험물 탱크 화재 시 냉각주수 방법을 설명하시오.', answer: '탱크 외벽 냉각, 인접 탱크 냉각, 연속 주수, 온도 모니터링, BLEVE 징후 감시', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 탱크 화재 시 냉각주수 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 냉각 주수 위치\n2. 주수량 및 압력\n3. 인접 탱크 보호\n4. 온도 모니터링\n5. BLEVE 위험 대응\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 사고 시 비상연락 체계를 설명하시오.', answer: '발견자→현장책임자→안전관리자→소방관서(119), 지자체, 본사, 인근 주민 통보', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 사고 시 비상연락 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내부 연락 체계\n2. 소방관서 통보\n3. 지자체 보고\n4. 인근 시설 통보\n5. 언론 대응\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'regulation',
    name: '법규 적용 실무',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '위험물 제조소 설치 허가 절차를 설명하시오.', answer: '설치허가 신청, 심사(설계도서), 현장 확인, 허가증 교부, 완공검사, 사용승인', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 제조소 설치 허가 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허가 신청 서류\n2. 심사 내용\n3. 현장 확인\n4. 완공검사\n5. 사용 승인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '위험물안전관리자 선임 및 신고 절차를 설명하시오.', answer: '자격자 선정, 14일 이내 선임, 선임신고서 제출(소방서), 교육 이수, 업무 수행', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물안전관리자 선임 및 신고 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 시기\n2. 자격 요건 확인\n3. 신고 서류\n4. 교육 이수\n5. 업무 개시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '위험물 저장소의 변경 허가 절차를 설명하시오.', answer: '변경허가 신청, 설계도서 제출, 심사, 허가, 공사, 완공검사', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 저장소의 변경 허가 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변경허가 대상\n2. 신청 서류\n3. 심사 절차\n4. 공사 실시\n5. 완공검사 및 승인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '위험물 제조소등의 정기검사 실시를 설명하시오.', answer: '정기검사 대상(옥외탱크, 이송취급소 등), 검사기관(한국소방산업기술원), 주기별 실시, 합격증', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 제조소등의 정기검사 실시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기검사 대상\n2. 검사 주기\n3. 검사 기관\n4. 검사 항목\n5. 합격증 교부\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 안전교육 이수 의무를 설명하시오.', answer: '안전관리자: 신규(3일), 실무(2일/2년). 탱크시험자: 신규(3일), 실무(1일/3년)', prompt: '위험물기능장 실기 문제입니다.\n\n문제: 위험물 안전교육 이수 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전관리자 교육\n2. 탱크시험자 교육\n3. 교육기관\n4. 교육 내용\n5. 미이수 시 처리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'practical-work',
    name: '실무 작업',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '소화기 점검 및 작동 시험 절차를 설명하시오.', answer: '외관점검, 압력게이지 확인, 안전핀 제거, 호스 방향, 레버 압착, 방사 확인, 복구', prompt: '위험물기능장 실기(작업형) 문제입니다.\n\n문제: 소화기 점검 및 작동 시험 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작동 전 점검\n2. 안전핀 제거\n3. 호스 조작\n4. 방사 시험\n5. 작동 후 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '옥내소화전 방수 시험 절차를 설명하시오.', answer: '소화전함 개방, 호스 연결, 밸브 개방, 펌프 기동 확인, 방수압력 측정, 관창 조작', prompt: '위험물기능장 실기(작업형) 문제입니다.\n\n문제: 옥내소화전 방수 시험 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사전 준비\n2. 호스 연결\n3. 밸브 개방\n4. 펌프 작동 확인\n5. 방수 및 압력 측정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '위험물 탱크 액면계 점검 절차를 설명하시오.', answer: '눈금 확인, 작동 시험, 오차 측정, 청소, 고장 시 교체', prompt: '위험물기능장 실기(작업형) 문제입니다.\n\n문제: 위험물 탱크 액면계 점검 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 액면계 종류\n2. 눈금 확인\n3. 작동 시험\n4. 정확도 검증\n5. 이상 시 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '위험물 저장소 접지 저항 측정 절차를 설명하시오.', answer: '접지저항계 준비, 보조극 설치, 측정(10Ω 이하), 기록, 불량 시 개선', prompt: '위험물기능장 실기(작업형) 문제입니다.\n\n문제: 위험물 저장소 접지 저항 측정 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측정 장비 준비\n2. 보조극 설치\n3. 측정 방법\n4. 판정 기준(10Ω)\n5. 불량 시 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가스 검지기를 이용한 누설 검사 절차를 설명하시오.', answer: '검지기 영점 조정, 교정, 측정 지점 선정, 검지, 농도 기록, 누설 시 조치', prompt: '위험물기능장 실기(작업형) 문제입니다.\n\n문제: 가스 검지기를 이용한 누설 검사 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검지기 준비 및 교정\n2. 측정 지점 선정\n3. 검지 방법\n4. 농도 판정\n5. 누설 발견 시 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-master-practical-completed');
    if (saved) {
      const arr = JSON.parse(saved);
      const obj: Record<string, boolean> = {};
      arr.forEach((key: string) => { obj[key] = true; });
      setCompletedQuestions(obj);
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    const arr = Object.keys(newCompleted).filter(k => newCompleted[k]);
    localStorage.setItem('hazardous-master-practical-completed', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-yellow-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-yellow-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/hazardous-master" className="text-gray-600 hover:text-yellow-600">위험물기능장</Link>
            <span className="text-gray-300">›</span>
            <span className="text-yellow-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🧯</span>
            <h1 className="text-2xl font-bold text-gray-800">실기 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">위험물기능장 실기시험 (필답형 + 작업형)</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-yellow-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">({getCompletedCount(topic.id)}/{topic.questions.length})</span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '▲' : '▼'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => {
                    const key = `${topic.id}-${q.id}`;
                    const isCompleted = completedQuestions[key];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">
                            🧡 Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            💚 ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            💙 Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}>
                            {isCompleted ? '완료 취소' : '✓ 완료'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
