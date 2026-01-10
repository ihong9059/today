'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'hydraulic-calc',
    name: '수리계산',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '스프링클러 헤드의 방수량 계산 문제를 풀이하시오.', answer: 'Q=K√P, Q: 방수량(L/min), K: 방수량계수(80), P: 압력(MPa)', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 스프링클러 헤드의 방수량을 계산하시오.\nK=80, 방수압력 P=0.1MPa일 때 방수량 Q는?\n\n다음 순서로 풀이해주세요:\n1. 방수량 공식\n2. 값 대입\n3. 계산 과정\n4. 최종 답\n5. 실무 적용 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '배관 마찰손실수두를 계산하시오.', answer: 'Hazen-Williams: hf=10.67Q^1.85/C^1.85D^4.87×L', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: Hazen-Williams 공식으로 배관 마찰손실을 계산하시오.\nQ=400L/min, C=120, D=100mm, L=50m일 때 손실수두는?\n\n다음 순서로 풀이해주세요:\n1. 단위 환산\n2. 공식 적용\n3. 계산 과정\n4. 최종 답(m)\n5. 압력손실(MPa) 환산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '옥내소화전 펌프 전양정을 산정하시오.', answer: 'H=낙차+배관손실+호스손실+노즐압력', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 옥내소화전 펌프의 전양정을 산정하시오.\n낙차 30m, 배관손실 5m, 호스손실 3m, 노즐압력 0.17MPa\n\n다음 순서로 풀이해주세요:\n1. 각 손실항목 정리\n2. 압력→수두 환산\n3. 합산 계산\n4. 안전율 적용\n5. 최종 펌프양정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '스프링클러 수원 용량을 산정하시오.', answer: '수원(㎥)=80L/min×헤드수×20분÷1000', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 스프링클러 수원 용량을 계산하시오.\n표준헤드 30개, K=80, 방수시간 20분\n\n다음 순서로 풀이해주세요:\n1. 헤드당 방수량\n2. 동시개방 헤드수\n3. 총 방수량\n4. 20분간 소요량\n5. 옥내소화전 겸용 가산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '포소화설비의 약제량을 산정하시오.', answer: '약제량(L)=방호면적(㎡)×방출률(L/min·㎡)×방출시간(min)×혼합비', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 포소화설비의 약제량을 산정하시오.\n방호면적 500㎡, 방출률 8L/min·㎡, 방출시간 10분, 혼합비 3%\n\n다음 순서로 풀이해주세요:\n1. 총 방출량 계산\n2. 혼합비 적용\n3. 약제량 산정\n4. 수원량 산정\n5. 저장탱크 용량\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'design-drawing',
    name: '설계도면',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '스프링클러 설비도면의 범례를 작성하시오.', answer: '헤드(○), 유수검지장치(⊗), 펌프(◎), 배관(실선), 밸브(▽)', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 스프링클러 설비도면의 주요 범례를 그리고 설명하시오.\n\n다음 항목을 포함해주세요:\n1. 헤드 기호\n2. 유수검지장치\n3. 펌프\n4. 밸브류\n5. 배관 표시\n\n실제 도면 작성 예시와 주의사항도 설명해주세요.' },
      { id: 2, question: '옥내소화전 계통도를 작성하시오.', answer: '수조→펌프→주배관→수직배관→각층 소화전함(호스, 노즐)', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 5층 건물의 옥내소화전 계통도를 작성하시오.\n\n다음 내용을 포함해주세요:\n1. 수원 표시\n2. 펌프 위치\n3. 주배관 경로\n4. 수직배관\n5. 각층 소화전 위치\n\n계통도 작성 시 주의사항과 검토사항도 설명해주세요.' },
      { id: 3, question: '배관 평면도에서 구경을 표기하시오.', answer: '관경 표시: φ100(A), φ80(A), φ65(A), φ50(A) 등', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 스프링클러 배관 평면도에 관경을 표기하는 방법을 설명하시오.\n\n다음 내용을 설명해주세요:\n1. 관경 표기법\n2. 호칭경 vs 실제경\n3. 배관 재질 표시\n4. 유량별 관경 선정\n5. 도면 작성 규칙\n\n실무 도면 예시도 제시해주세요.' },
      { id: 4, question: '제연설비 배연구역 구획도를 작성하시오.', answer: '제연구역 표시, 배연기 위치, 급기구 위치, 제연경계 표시', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 지하주차장 제연설비의 배연구역 구획도를 작성하시오.\n\n다음 내용을 포함해주세요:\n1. 제연구역 구획(1000㎡ 이하)\n2. 배연기 위치\n3. 급기구 위치\n4. 제연경계 표시\n5. 풍도 경로\n\n구획 설정 기준과 주의사항도 설명해주세요.' },
      { id: 5, question: '소방펌프실 평면도를 작성하시오.', answer: '펌프, 수조, 제어반, 비상전원, 배관, 밸브 배치', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 소방펌프실 평면도를 작성하고 주요 설비 배치를 설명하시오.\n\n다음 내용을 포함해주세요:\n1. 펌프 배치\n2. 수조 위치\n3. 제어반 위치\n4. 배관 경로\n5. 점검 공간 확보\n\n펌프실 설계 기준과 유지관리 고려사항도 설명해주세요.' }
    ]
  },
  {
    id: 'pipe-calc',
    name: '배관계산',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '스프링클러 배관 구경을 결정하시오.', answer: '수리계산법: Q 산정→속도 제한(V<4m/s)→관경 선정', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 스프링클러 배관의 구경을 수리계산법으로 결정하시오.\n유량 Q=600L/min일 때 적정 관경은?\n\n다음 순서로 풀이해주세요:\n1. 유량 단위 환산(㎥/s)\n2. 유속 제한 확인\n3. 관경 계산\n4. 호칭경 선정\n5. 마찰손실 검토\n\n실무 적용 시 고려사항도 설명해주세요.' },
      { id: 2, question: '배관의 등가관길이를 계산하시오.', answer: '엘보(90°) 0.6m, 티(분기) 1.8m, 게이트밸브 0.2m 등', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 다음 배관의 등가관길이를 계산하시오.\nφ65(A) 배관에 90°엘보 3개, 티(분기) 2개, 게이트밸브 1개\n\n다음 순서로 계산해주세요:\n1. 각 부속품 등가길이\n2. 총 등가길이\n3. 실제 배관길이 합산\n4. 마찰손실 계산\n5. 압력손실 산정\n\n등가관길이표 사용법도 설명해주세요.' },
      { id: 3, question: '배관망의 유량 분배를 계산하시오.', answer: '병렬배관: Q합=Q₁+Q₂, h손실 동일 / 직렬배관: Q동일, h합=h₁+h₂', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 병렬배관의 유량 분배를 계산하시오.\n전체유량 Q=800L/min, 2개 배관으로 분기(φ80, φ65)\n\n다음 순서로 풀이해주세요:\n1. 병렬배관 원리\n2. 손실수두 동일 조건\n3. 각 배관 유량 계산\n4. 유량 합산 검증\n5. 실무 적용\n\n Hardy-Cross법 적용 예시도 설명해주세요.' },
      { id: 4, question: '급수배관의 압력손실을 계산하시오.', answer: '총손실=마찰손실+형상손실, Δp=ρgh(MPa)', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 급수배관의 총 압력손실을 계산하시오.\n마찰손실 8m, 형상손실 2m\n\n다음 순서로 계산해주세요:\n1. 손실수두 합산\n2. 수두→압력 환산\n3. 압력손실(MPa)\n4. 펌프양정 반영\n5. 여유율 적용\n\n실제 설계 시 고려사항도 설명해주세요.' },
      { id: 5, question: '배관 신축이음을 계산하시오.', answer: 'ΔL=α×L×Δt, α: 선팽창계수(강관 11.6×10⁻⁶/°C)', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 배관의 신축량을 계산하고 신축이음 설치 간격을 결정하시오.\n강관 L=50m, 온도차 Δt=40°C\n\n다음 순서로 계산해주세요:\n1. 선팽창계수\n2. 신축량 계산\n3. 신축이음 간격\n4. 고정지지 위치\n5. 가동지지 설치\n\n신축이음 종류와 적용 기준도 설명해주세요.' }
    ]
  },
  {
    id: 'pump-selection',
    name: '펌프선정',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '스프링클러 펌프의 용량을 선정하시오.', answer: 'Q=헤드수×방수량, H=낙차+손실+헤드압력+여유', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 스프링클러 펌프의 용량을 선정하시오.\n동시개방 헤드 30개, 방수량 80L/min, 양정 70m\n\n다음 순서로 계산해주세요:\n1. 정격토출량 Q\n2. 전양정 H\n3. 펌프 동력\n4. 전동기 용량\n5. 펌프 사양 작성\n\n펌프 성능곡선 검토 방법도 설명해주세요.' },
      { id: 2, question: '펌프의 축동력과 전동기 용량을 계산하시오.', answer: 'L(kW)=ρgQH/η÷1000, 전동기=L÷효율×안전율', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 펌프 축동력과 전동기 용량을 계산하시오.\nQ=2400L/min, H=80m, 펌프효율 70%\n\n다음 순서로 계산해주세요:\n1. 유량 단위 환산\n2. 축동력 계산(kW)\n3. 전동기 효율 고려\n4. 안전율 적용\n5. 표준 전동기 선정\n\n전동기 선정 시 주의사항도 설명해주세요.' },
      { id: 3, question: '펌프의 흡입양정과 NPSH를 계산하시오.', answer: 'NPSHa=(Pa-Pv)/ρg-Hs-hfs, NPSHa>NPSHr', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 펌프의 유효 NPSH를 계산하고 캐비테이션 발생 여부를 판단하시오.\n흡입양정 3m, 흡입배관 손실 1m, NPSHr=4m\n\n다음 순서로 계산해주세요:\n1. 대기압 수두\n2. 증기압 수두\n3. NPSHa 계산\n4. NPSHr 비교\n5. 캐비테이션 판정\n\n캐비테이션 방지 대책도 설명해주세요.' },
      { id: 4, question: '직렬 및 병렬 펌프의 합성성능을 계산하시오.', answer: '직렬: H합=H₁+H₂ / 병렬: Q합=Q₁+Q₂', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 동일 펌프 2대를 병렬운전할 때 합성성능을 계산하시오.\n1대 사양: Q=1000L/min, H=60m\n\n다음 내용을 설명해주세요:\n1. 병렬운전 원리\n2. 합성유량\n3. 합성양정\n4. 합성성능곡선\n5. 운전점 변화\n\n직렬운전과의 차이점도 비교 설명해주세요.' },
      { id: 5, question: '펌프 성능시험 결과를 판정하시오.', answer: '체절양정 140~170%, 정격점 100%, 150%점 양정 65% 이상', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 다음 펌프 성능시험 결과의 합격 여부를 판정하시오.\n정격: Q=2000L/min, H=80m\n체절: H=125m, 150%점: Q=3000L/min, H=55m\n\n다음 순서로 판정해주세요:\n1. 체절양정 비율\n2. 150%점 양정 비율\n3. 각 항목 합격 여부\n4. 종합 판정\n5. 불합격 시 조치방법\n\n성능시험 절차와 기준도 설명해주세요.' }
    ]
  },
  {
    id: 'field-practice',
    name: '현장실무',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '스프링클러 배관 시공 순서를 작성하시오.', answer: '배관가공→행거설치→배관조립→수압시험→헤드설치→기능시험', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 스프링클러 배관 시공의 전체 순서를 작성하고 각 단계별 주요 점검사항을 설명하시오.\n\n다음 내용을 포함해주세요:\n1. 배관 가공 및 절단\n2. 행거 설치\n3. 배관 조립 및 용접\n4. 수압시험\n5. 헤드 설치 및 기능시험\n\n각 단계별 시공 기준과 주의사항도 설명해주세요.' },
      { id: 2, question: '소방펌프 설치 및 시운전 절차를 설명하시오.', answer: '기초작업→펌프거치→배관연결→전기배선→수압시험→시운전', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 소방펌프의 설치부터 시운전까지 전체 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기초 콘크리트 작업\n2. 펌프 거치 및 수평조정\n3. 흡입/토출배관 연결\n4. 전기배선 및 제어반\n5. 시운전 및 성능시험\n\n설치 시 주요 점검사항과 시운전 체크리스트도 제시해주세요.' },
      { id: 3, question: '유수검지장치 작동시험 방법을 설명하시오.', answer: '시험밸브 개방→유수검지→압력스위치 작동→경보 발신→표시등 점등', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 습식 유수검지장치의 작동시험 절차와 점검사항을 설명하시오.\n\n다음 내용을 포함해주세요:\n1. 시험 전 준비사항\n2. 시험밸브 개방\n3. 유수검지 확인\n4. 압력스위치 작동\n5. 경보 발신 확인\n\n작동불량 시 원인분석과 조치방법도 설명해주세요.' },
      { id: 4, question: '배관 수압시험 절차를 설명하시오.', answer: '배관충수→공기배출→가압(1.5MPa or 1MPa)→압력유지→누수점검', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 소방배관의 수압시험 절차와 판정기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배관 충수 및 공기 배출\n2. 시험압력 가압\n3. 압력 유지시간\n4. 누수 점검\n5. 합격 판정\n\n시험 시 주의사항과 불합격 시 조치방법도 설명해주세요.' },
      { id: 5, question: '제연설비 풍량측정 및 성능시험을 설명하시오.', answer: '풍속측정(m/s)→풍량계산(㎥/min)→개구부 풍속 확인→차압 측정', prompt: '소방설비기사(기계) 실기 문제입니다.\n\n문제: 제연설비의 풍량측정 방법과 성능시험 절차를 설명하시오.\n\n다음 내용을 포함해주세요:\n1. 풍속 측정 방법\n2. 풍량 계산\n3. 개구부 풍속 확인\n4. 차압 측정\n5. 합격 판정 기준\n\n측정 시 주의사항과 보정 방법도 설명해주세요.' }
    ]
  }
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('fire-equipment-practical-completed');
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
    localStorage.setItem('fire-equipment-practical-completed', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-orange-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/fire-equipment-mechanical" className="text-gray-600 hover:text-orange-600">소방설비기사(기계)</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔧</span>
            <h1 className="text-2xl font-bold text-gray-800">실기 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">소방설비기사(기계) 실기시험 핵심 영역</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-orange-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>
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
