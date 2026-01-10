'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'classification',
    name: '위험물 분류',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      { id: 1, question: '제1류 위험물(산화성 고체)의 지정수량과 공통성질을 설명하시오.', answer: '무기과산화물 50kg, 염소산염류 50kg, 과염소산염류 50kg 등. 공통성질: 산소 포함, 가열·충격에 분해, 가연물과 혼합 시 위험', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 제1류 위험물(산화성 고체)의 지정수량과 공통성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제1류 위험물의 정의\n2. 주요 품명별 지정수량\n3. 공통 성질\n4. 위험성\n5. 저장·취급 시 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '제2류 위험물(가연성 고체)의 분류와 특성을 설명하시오.', answer: '황화인 100kg, 적린 100kg, 유황 100kg, 금속분 500kg 등. 특성: 낮은 발화점, 산화제와 혼합 위험', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 제2류 위험물(가연성 고체)의 분류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제2류 위험물의 정의\n2. 품명별 지정수량\n3. 발화 특성\n4. 소화 방법\n5. 금속분의 특별 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '제3류 위험물(자연발화성·금수성 물질)의 성질을 설명하시오.', answer: '나트륨 10kg, 황린 20kg, 알킬알루미늄 10kg 등. 공기 중 자연발화, 물과 반응하여 가연성 가스 발생', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 제3류 위험물(자연발화성·금수성 물질)의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제3류 위험물의 정의\n2. 자연발화성 물질\n3. 금수성 물질\n4. 저장 방법(불활성가스 치환)\n5. 누출 시 응급조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '제4류 위험물(인화성 액체)의 인화점과 특수인화물을 설명하시오.', answer: '특수인화물(발화점≤100℃, 인화점<-20℃): 디에틸에테르, 이황화탄소 등 50L. 제1석유류 200L, 제2석유류 1000L', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 제4류 위험물(인화성 액체)의 인화점과 특수인화물을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인화점 정의\n2. 특수인화물 정의 및 예시\n3. 제1~제4석유류 분류\n4. 정전기 발생 주의\n5. 증기 폭발 위험성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '제5류 위험물(자기반응성 물질)과 제6류 위험물(산화성 액체)을 비교하시오.', answer: '제5류: 질산에스테르류, 니트로화합물 등 10kg, 자기연소 가능. 제6류: 과염소산·질산 등 300kg, 강한 산화제', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 제5류 위험물과 제6류 위험물을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 제5류 위험물의 특성\n2. 제6류 위험물의 특성\n3. 지정수량 비교\n4. 소화 방법 차이\n5. 혼재 저장 금지 이유\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'storage-handling',
    name: '저장·취급 기준',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '옥내저장소의 구조 및 설비 기준을 설명하시오.', answer: '지붕·벽·기둥·바닥은 불연재료, 창·출입구에 방화문, 환기설비, 피뢰침, 채광·조명설비 설치', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 옥내저장소의 구조 및 설비 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 건축물 구조 기준\n2. 방화문 설치 기준\n3. 환기설비 기준\n4. 피뢰침 설치 대상\n5. 전기설비 방폭 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '옥외탱크저장소의 보유공지와 방유제를 설명하시오.', answer: '보유공지: 탱크 직경에 따라 3m~30m. 방유제: 용량 110% 이상, 높이 0.5m 이상, 배수설비 설치', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 옥외탱크저장소의 보유공지와 방유제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보유공지의 목적\n2. 보유공지 거리 산정\n3. 방유제 용량 기준\n4. 방유제 구조 기준\n5. 배수설비 설치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '주유취급소의 시설 기준을 설명하시오.', answer: '고정급유설비, 고정주유설비, 전용탱크(지하매설), 방화상 유효한 담·벽 설치, 안전거리 확보', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 주유취급소의 시설 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주유취급소 정의\n2. 고정급유설비 기준\n3. 전용탱크 기준\n4. 안전거리 및 보유공지\n5. 캐노피 설치 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '지하탱크저장소의 구조 기준을 설명하시오.', answer: '탱크 두께 3.2mm 이상, 외면 부식방지 조치, 탱크 주위 모래 충진, 맨홀 설치, 누설검사관 설치', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 지하탱크저장소의 구조 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탱크 두께 및 강도\n2. 부식방지 조치\n3. 모래 충진 기준\n4. 누설검사관 설치\n5. 정기검사 항목\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '이동탱크저장소(탱크로리)의 구조와 안전장치를 설명하시오.', answer: '상치식 탱크, 4kL 이하로 구획, 맨홀, 안전밸브, 방파판, 접지도선, 소화기 설치', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 이동탱크저장소의 구조와 안전장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탱크 구조 기준\n2. 구획 설치 이유\n3. 안전밸브 설치\n4. 정전기 제거 장치\n5. 주입·배출 시 안전조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'transport',
    name: '운반·운송 기준',
    color: 'from-red-500 to-pink-500',
    questions: [
      { id: 1, question: '위험물 운반용기의 기준을 설명하시오.', answer: '견고한 구조, 수납율 98% 이하, 내압시험 합격, 위험물 표지 부착, 수납 위험물 변질방지', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 위험물 운반용기의 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용기 강도 기준\n2. 수납율 제한 이유\n3. 내압시험 기준\n4. 표지 및 주의사항 표시\n5. 용기 재질별 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '위험물 운송 시 적재방법과 주의사항을 설명하시오.', answer: '혼재금지 준수, 운반용기 고정, 통풍유지, 화기 및 출화 위험 제거, 운전자 휴대물품', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 위험물 운송 시 적재방법과 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 혼재금지 물질\n2. 운반용기 고정 방법\n3. 통풍 및 온도 관리\n4. 운전자 휴대 서류\n5. 사고 시 응급조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '위험물 혼재 금지 기준을 설명하시오.', answer: '제1류와 제2·4·5·6류, 제2류와 제3·5류, 제3류와 제4·5·6류, 제5류와 제1·2·3·4·6류 혼재 금지', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 위험물 혼재 금지 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 혼재금지의 목적\n2. 류별 혼재금지 조합\n3. 혼재 가능 조건\n4. 반응 위험성\n5. 운송차량 구획 설치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '위험물 운송차량의 표지와 경계표지를 설명하시오.', answer: '0.3m×0.3m 이상 표지(검정 바탕 황색), 차량 전후면 경계표지(0.3m×0.6m, 검정 바탕 황색 반사)', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 위험물 운송차량의 표지와 경계표지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표지 크기와 색상\n2. 경계표지 크기와 위치\n3. 야간 식별 기준\n4. 표지 기재사항\n5. 미부착 시 벌칙\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 안전운송 5대 수칙을 설명하시오.', answer: '용기 밀전·파손방지, 화기엄금, 환기·온도관리, 혼재금지, 안전교육 이수', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 위험물 안전운송 5대 수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용기 취급 주의사항\n2. 화기 관리\n3. 환기 및 온도 관리\n4. 혼재금지 확인\n5. 운전자 교육 내용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety-management',
    name: '안전관리',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '위험물안전관리자의 선임 기준과 업무를 설명하시오.', answer: '제조소등 설치자가 선임, 위험물기능장·기사·산업기사·기능사 자격, 안전관리·점검·교육 담당', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 위험물안전관리자의 선임 기준과 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 대상 시설\n2. 자격 요건\n3. 선임 시기 및 신고\n4. 주요 업무\n5. 대리자 지정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '제조소등의 정기점검과 정기검사를 비교하시오.', answer: '정기점검: 안전관리자가 실시(1년 1회 이상), 정기검사: 한국소방산업기술원 실시(시설별 상이)', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 제조소등의 정기점검과 정기검사를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 정기점검 대상 및 주기\n2. 정기검사 대상 및 주기\n3. 점검·검사 항목\n4. 기록 보존 기간\n5. 미실시 시 벌칙\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '예방규정의 작성 및 인가를 설명하시오.', answer: '지정수량 3000배 이상 제조소등, 안전관리 조직·점검·교육·훈련 등 포함, 소방서장 인가', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 예방규정의 작성 및 인가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작성 대상 시설\n2. 예방규정 내용\n3. 인가 절차\n4. 변경 시 처리\n5. 미작성 시 벌칙\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '위험물시설의 자체소방대 편성을 설명하시오.', answer: '지정수량 3000배 이상, 소방대장·대원 배치, 화학소방자동차·소방펌프 등 보유, 정기 소방훈련', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 위험물시설의 자체소방대 편성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 편성 대상 시설\n2. 소방대 인원 기준\n3. 소방장비 보유\n4. 정기 훈련 실시\n5. 소방대장 자격\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 취급 시 화기 사용 기준을 설명하시오.', answer: '제조소등에서 화기 사용 금지, 지정된 장소에서만 허용, 위험물 취급 중 흡연 금지, 표지 설치', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 위험물 취급 시 화기 사용 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화기 사용 금지 구역\n2. 화기 사용 허용 조건\n3. 용접·용단 작업 허가\n4. 화기 경계표지 설치\n5. 위반 시 벌칙\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'emergency-response',
    name: '사고대응',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '위험물 화재 시 초기 대응 절차를 설명하시오.', answer: '발견·통보, 초기소화, 인명구조, 확산방지, 소방관서 신고, 상황 기록', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 위험물 화재 시 초기 대응 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발견 및 통보 체계\n2. 초기소화 방법\n3. 인명구조 우선순위\n4. 확산방지 조치\n5. 소방대 인계 사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '위험물 누출 사고 시 응급조치를 설명하시오.', answer: '화기제거, 누출 차단, 흡수재·중화제 사용, 환기, 안전구역 설정, 관련 기관 통보', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 위험물 누출 사고 시 응급조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화기 및 점화원 제거\n2. 누출원 차단 방법\n3. 흡수·중화 조치\n4. 안전구역 설정\n5. 사후 처리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '제4류 위험물(인화성 액체) 화재 시 소화 방법을 설명하시오.', answer: '질식소화(포소화약제, CO2), 냉각소화, 수용성은 내알코올포 사용, 주수 금지(확산 위험)', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 제4류 위험물 화재 시 소화 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적응 소화약제\n2. 포소화약제 적용\n3. 수용성 위험물 소화\n4. 주수 금지 이유\n5. 소화 시 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '위험물 탱크 화재 시 BLEVE 현상과 대응을 설명하시오.', answer: 'BLEVE: 비등 액체 증기 폭발, 탱크 외부 화염에 의한 내부 압력 상승, 냉각 주수, 안전거리 확보', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 위험물 탱크 화재 시 BLEVE 현상과 대응을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BLEVE 발생 메커니즘\n2. 위험 징후\n3. 예방 대책\n4. 발생 시 대응\n5. 안전거리 확보\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 사고 예방을 위한 안전점검 항목을 설명하시오.', answer: '위험물 저장량 확인, 소화설비 작동 점검, 전기설비 점검, 환기설비 점검, 탱크·배관 누설 점검', prompt: '위험물기능장 위험물관리 문제입니다.\n\n문제: 위험물 사고 예방을 위한 안전점검 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일일 점검 항목\n2. 정기 점검 항목\n3. 소화설비 점검\n4. 전기설비 점검\n5. 점검 기록 작성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function HazardousManagementStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-master-hazardous-management-completed');
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
    localStorage.setItem('hazardous-master-hazardous-management-completed', JSON.stringify(arr));
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
            <span className="text-yellow-600 font-medium">위험물관리</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">☢️</span>
            <h1 className="text-2xl font-bold text-gray-800">위험물관리 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">위험물기능장 필기시험 핵심 과목</p>
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
