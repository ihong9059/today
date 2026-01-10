'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'generation',
    name: '발전공학',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '화력발전소의 열효율을 높이기 위한 방법 3가지를 설명하시오.',
        answer: '재열사이클, 재생사이클, 복합사이클',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 화력발전소의 열효율을 높이기 위한 방법 3가지를 설명하시오.

다음 순서로 설명해주세요:
1. 재열사이클 (Reheat Cycle)
2. 재생사이클 (Regenerative Cycle)
3. 복합사이클 (Combined Cycle)
4. 각 방법의 효율 향상 원리
5. 실제 적용 사례

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 2,
        question: '수력발전소의 이론 출력 공식을 유도하시오.',
        answer: 'P = 9.8QH [kW]',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 수력발전소의 이론 출력 공식을 유도하시오.

다음 순서로 설명해주세요:
1. 위치에너지: E = mgh
2. 유량 Q[m³/s]와 질량의 관계
3. 단위 시간당 에너지 = 출력
4. P = 9.8QH 유도
5. 효율을 고려한 실제 출력

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 3,
        question: '원자력발전소에서 핵연료 1kg이 완전 핵분열 시 발생하는 에너지를 구하시오.',
        answer: 'E ≈ 8.2 × 10¹³ J (석탄 약 3,000톤 해당)',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 원자력발전소에서 핵연료 1kg이 완전 핵분열 시 발생하는 에너지를 구하시오.

다음 순서로 설명해주세요:
1. 질량-에너지 등가: E = mc²
2. 핵분열 시 질량결손
3. 에너지 계산
4. 화석연료와 비교
5. 실제 발전 효율

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 4,
        question: '태양광 발전의 발전량에 영향을 주는 요소들을 설명하시오.',
        answer: '일사량, 설치각도, 온도, 모듈효율, 그림자',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 태양광 발전의 발전량에 영향을 주는 요소들을 설명하시오.

다음 순서로 설명해주세요:
1. 일사량 (kWh/m²)
2. 설치 각도와 방위각
3. 온도 계수
4. 모듈 효율
5. 시스템 손실

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 5,
        question: '풍력발전의 출력은 풍속의 몇 승에 비례하는가?',
        answer: '풍속의 3승에 비례 (P ∝ v³)',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 풍력발전의 출력은 풍속의 몇 승에 비례하는가?

다음 순서로 설명해주세요:
1. 풍력 에너지: E = (1/2)mv²
2. 단위 시간당 공기 질량
3. 출력 공식: P = (1/2)ρAv³
4. 베츠 한계 (59.3%)
5. 풍속 증가의 중요성

비슷한 유형의 연습문제 2개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'transmission',
    name: '송전공학',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 1,
        question: '송전 전압을 높이면 송전 손실이 감소하는 이유를 설명하시오.',
        answer: '손실 P = I²R, 전압 2배 → 전류 1/2배 → 손실 1/4배',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 송전 전압을 높이면 송전 손실이 감소하는 이유를 설명하시오.

다음 순서로 설명해주세요:
1. 전력 P = VI 관계
2. 전압 상승 시 전류 감소
3. 손실 Ploss = I²R 관계
4. 전압 n배 → 손실 1/n²배
5. 초고압 송전의 경제성

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 2,
        question: '송전선로의 코로나 현상을 설명하고 방지대책을 제시하시오.',
        answer: '전선 주위 공기 이온화 현상, 복도체 사용이 주요 대책',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 송전선로의 코로나 현상을 설명하고 방지대책을 제시하시오.

다음 순서로 설명해주세요:
1. 코로나 발생 원리
2. 임계 전압 (Peek 공식)
3. 코로나 손실
4. 통신 장해
5. 방지대책 (복도체, 굵은 전선)

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 3,
        question: '송전선로의 전압강하율 계산 공식을 쓰시오.',
        answer: 'ε = (Vs - Vr)/Vr × 100 [%]',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 송전선로의 전압강하율 계산 공식을 쓰시오.

다음 순서로 설명해주세요:
1. 전압강하율 정의
2. 공식: ε = (Vs - Vr)/Vr × 100
3. 근사식: ε ≈ (PRcosφ + PXsinφ)/V²
4. 역률과 전압강하 관계
5. 허용 전압강하율

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 4,
        question: '페란티 현상이 발생하는 조건과 대책을 설명하시오.',
        answer: '경부하 시 수전단 전압 > 송전단 전압, 분로리액터로 해결',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 페란티 현상이 발생하는 조건과 대책을 설명하시오.

다음 순서로 설명해주세요:
1. 페란티 현상 정의
2. 발생 조건 (경부하, 긴 선로)
3. 충전전류에 의한 전압상승
4. 분로리액터 설치
5. 조상설비 운용

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 5,
        question: 'ACSR 전선의 특징과 구성을 설명하시오.',
        answer: '알루미늄 피복 강심 연선, 중심에 강선으로 인장강도 확보',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: ACSR 전선의 특징과 구성을 설명하시오.

다음 순서로 설명해주세요:
1. ACSR 명칭 (Aluminum Conductor Steel Reinforced)
2. 구조: 강심 + 알루미늄 피복
3. 장점: 인장강도, 도전율
4. 용도: 송전선로
5. 단점과 대안 (ACSS 등)

비슷한 유형의 연습문제 2개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'distribution',
    name: '배전공학',
    color: 'from-orange-500 to-amber-500',
    questions: [
      {
        id: 1,
        question: '배전방식 중 루프(환상)배전과 방사상배전의 장단점을 비교하시오.',
        answer: '루프: 신뢰성 높음/비용 높음, 방사상: 간단/정전범위 넓음',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 배전방식 중 루프(환상)배전과 방사상배전의 장단점을 비교하시오.

다음 순서로 설명해주세요:
1. 방사상 배전 특징
2. 루프 배전 특징
3. 신뢰성 비교
4. 경제성 비교
5. 적용 장소

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 2,
        question: '변압기의 병렬운전 조건 4가지를 쓰시오.',
        answer: '극성 동일, 권수비 동일, %임피던스 동일, 위상각 동일',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 변압기의 병렬운전 조건 4가지를 쓰시오.

다음 순서로 설명해주세요:
1. 극성 일치
2. 권수비 일치 (전압비)
3. %임피던스 일치
4. 위상각 일치
5. 조건 불일치 시 문제점

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 3,
        question: '수용률, 부하율, 부등률의 정의와 공식을 쓰시오.',
        answer: '수용률=최대/설비, 부하율=평균/최대, 부등률=개별합/합성최대',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 수용률, 부하율, 부등률의 정의와 공식을 쓰시오.

다음 순서로 설명해주세요:
1. 수용률 = 최대수용전력/설비용량
2. 부하율 = 평균전력/최대전력
3. 부등률 = 개별최대합/합성최대
4. 각각의 의미
5. 실제 활용

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 4,
        question: '역률 개선의 효과 5가지를 설명하시오.',
        answer: '손실감소, 전압강하개선, 설비용량여유, 전기요금절감, 전력품질향상',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 역률 개선의 효과 5가지를 설명하시오.

다음 순서로 설명해주세요:
1. 전력손실 감소
2. 전압강하 개선
3. 설비용량 여유 확보
4. 전기요금 절감
5. 전력품질 향상

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 5,
        question: '역률 0.8에서 1.0으로 개선 시 전력손실 감소율을 구하시오.',
        answer: '손실감소율 = 1 - (0.8)² = 36%',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 역률 0.8에서 1.0으로 개선 시 전력손실 감소율을 구하시오.

다음 순서로 설명해주세요:
1. 손실 P = I²R
2. 전류 I = P/(Vcosφ)
3. 손실비 = (cosφ1/cosφ2)²
4. 계산: 1 - (0.8/1.0)² = 0.36
5. 역률 개선의 경제성

비슷한 유형의 연습문제 2개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'protection',
    name: '보호계전기',
    color: 'from-red-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '과전류계전기(OCR)의 동작원리와 정정요소를 설명하시오.',
        answer: '탭(동작전류), 레버(동작시간) 정정',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 과전류계전기(OCR)의 동작원리와 정정요소를 설명하시오.

다음 순서로 설명해주세요:
1. OCR 동작원리
2. 탭(Tap) 정정 - 동작전류
3. 레버(Lever) 정정 - 동작시간
4. 한시특성곡선
5. 협조 보호

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 2,
        question: '차동계전기(비율차동계전기)의 동작원리를 설명하시오.',
        answer: '양단 CT 전류차이로 내부고장 검출, 억제코일로 오동작 방지',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 차동계전기(비율차동계전기)의 동작원리를 설명하시오.

다음 순서로 설명해주세요:
1. 차동계전기 원리
2. 동작코일과 억제코일
3. 비율 특성
4. 내부고장과 외부고장 구분
5. 변압기 보호 적용

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 3,
        question: '거리계전기의 동작원리와 특성을 설명하시오.',
        answer: '임피던스(거리)로 고장점 판별, Zone별 동작시간 설정',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 거리계전기의 동작원리와 특성을 설명하시오.

다음 순서로 설명해주세요:
1. 거리계전기 원리
2. 임피던스 측정
3. Zone1, Zone2, Zone3 설정
4. 방향성 판별
5. 송전선로 보호

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 4,
        question: '피뢰기의 역할과 종류를 설명하시오.',
        answer: '이상전압 억제, 산화아연(ZnO) 피뢰기가 주류',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 피뢰기의 역할과 종류를 설명하시오.

다음 순서로 설명해주세요:
1. 피뢰기 역할
2. 직렬갭형 (SiC)
3. 갭레스형 (ZnO)
4. 제한전압과 방전전류
5. 설치 위치

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 5,
        question: '접지저항 측정방법과 허용 접지저항값을 설명하시오.',
        answer: '3전극법, 특고압 10Ω 이하, 고압 75Ω 이하',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 접지저항 측정방법과 허용 접지저항값을 설명하시오.

다음 순서로 설명해주세요:
1. 3전극법(Kohlrausch법)
2. 전위강하법
3. 접지저항 허용값 (종별)
4. 접지저항 저감 방법
5. 접지 목적 (감전방지, 기기보호)

비슷한 유형의 연습문제 2개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'substation',
    name: '변전설비',
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '가스절연개폐장치(GIS)의 장점 5가지를 쓰시오.',
        answer: '축소형, 밀폐형(오염방지), 안전성, 저소음, 저유지보수',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 가스절연개폐장치(GIS)의 장점 5가지를 쓰시오.

다음 순서로 설명해주세요:
1. 축소 설치 (면적 1/10~1/20)
2. 밀폐구조 (오염, 염해 방지)
3. 안전성 향상
4. 저소음, 환경친화
5. 유지보수 간편

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 2,
        question: 'SF6 가스의 특성과 절연파괴 특성을 설명하시오.',
        answer: '불활성, 절연내력 공기의 2~3배, 소호능력 우수',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: SF6 가스의 특성과 절연파괴 특성을 설명하시오.

다음 순서로 설명해주세요:
1. SF6 가스 화학적 특성
2. 절연내력 (공기의 2~3배)
3. 소호능력
4. 단점 (온실가스)
5. 대체 가스 연구

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 3,
        question: '단로기(DS)와 차단기(CB)의 차이점을 설명하시오.',
        answer: '단로기: 무부하개폐, 차단기: 부하전류/고장전류 차단',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 단로기(DS)와 차단기(CB)의 차이점을 설명하시오.

다음 순서로 설명해주세요:
1. 단로기(DS) 역할
2. 차단기(CB) 역할
3. 차단용량 차이
4. 개폐 순서
5. 인터록 장치

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 4,
        question: '변압기 냉각방식의 종류를 설명하시오.',
        answer: 'ONAN, ONAF, OFAF, ODAF 등',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 변압기 냉각방식의 종류를 설명하시오.

다음 순서로 설명해주세요:
1. ONAN (Oil Natural Air Natural)
2. ONAF (Oil Natural Air Forced)
3. OFAF (Oil Forced Air Forced)
4. ODAF (Oil Directed Air Forced)
5. 용량별 적용

비슷한 유형의 연습문제 2개도 만들어주세요.`
      },
      {
        id: 5,
        question: '변전소 모선방식 중 복모선 방식의 특징을 설명하시오.',
        answer: '2개 모선, 모선고장 시 무정전 전환, 신뢰성 높음',
        prompt: `전기산업기사 전력공학 문제입니다.

문제: 변전소 모선방식 중 복모선 방식의 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 복모선 구성
2. 장점 (신뢰성)
3. 모선연락차단기 역할
4. 단모선과 비교
5. 적용 변전소

비슷한 유형의 연습문제 2개도 만들어주세요.`
      }
    ]
  }
];

export default function ElectricCraftsmanPowerStudyPage() {
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const [activeQuestionId, setActiveQuestionId] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  const activeTopic = topics.find(t => t.id === activeTopicId)!;
  const activeQuestion = activeTopic.questions.find(q => q.id === activeQuestionId)!;

  useEffect(() => {
    const saved = localStorage.getItem('electric-craftsman-power-completed');
    if (saved) {
      setCompletedQuestions(new Set(JSON.parse(saved)));
    }
  }, []);

  const markComplete = () => {
    const key = `${activeTopicId}-${activeQuestionId}`;
    const newCompleted = new Set(completedQuestions);
    newCompleted.add(key);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('electric-craftsman-power-completed', JSON.stringify([...newCompleted]));
  };

  const getCompletedCount = (topicId: string) => {
    return [...completedQuestions].filter(key => key.startsWith(topicId)).length;
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(activeQuestion.prompt);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-orange-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical" className="text-gray-600 hover:text-orange-600">기계·제어</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/electric-craftsman" className="text-gray-600 hover:text-orange-600">전기산업기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">전력공학</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚡</span>
            <h1 className="text-2xl font-bold text-gray-800">전력공학 학습하기</h1>
          </div>
          <p className="text-gray-600">전기산업기사 필기시험 핵심 과목</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-bold text-gray-800 mb-4">📚 학습 주제</h3>
              <div className="space-y-2">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setActiveTopicId(topic.id);
                      setActiveQuestionId(1);
                      setShowAnswer(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      activeTopicId === topic.id
                        ? `bg-gradient-to-r ${topic.color} text-white`
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{topic.name}</span>
                      <span className={`text-xs ${activeTopicId === topic.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {getCompletedCount(topic.id)}/{topic.questions.length}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">{activeTopic.name}</h3>
                <span className="text-sm text-gray-500">
                  {activeQuestionId} / {activeTopic.questions.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeTopic.questions.map((q) => {
                  const isCompleted = completedQuestions.has(`${activeTopicId}-${q.id}`);
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setActiveQuestionId(q.id);
                        setShowAnswer(false);
                      }}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        activeQuestionId === q.id
                          ? 'bg-orange-500 text-white'
                          : isCompleted
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {isCompleted ? '✓' : q.id}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">문제 {activeQuestionId}</h4>
                <p className="text-gray-700 text-lg leading-relaxed">{activeQuestion.question}</p>
              </div>

              <div className="border-t pt-4">
                {!showAnswer ? (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    정답 보기
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-bold text-green-700">정답: </span>
                      <span className="text-green-800">{activeQuestion.answer}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={copyPrompt}
                        className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-indigo-600 transition-all"
                      >
                        📋 AI 학습 프롬프트 복사
                      </button>
                      <button
                        onClick={markComplete}
                        className="flex-1 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                      >
                        ✓ 학습 완료
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (activeQuestionId > 1) {
                    setActiveQuestionId(activeQuestionId - 1);
                    setShowAnswer(false);
                  }
                }}
                disabled={activeQuestionId === 1}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← 이전 문제
              </button>
              <button
                onClick={() => {
                  if (activeQuestionId < activeTopic.questions.length) {
                    setActiveQuestionId(activeQuestionId + 1);
                    setShowAnswer(false);
                  }
                }}
                disabled={activeQuestionId === activeTopic.questions.length}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음 문제 →
              </button>
            </div>

            {showAnswer && (
              <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-3">🤖 AI 학습 프롬프트</h4>
                <p className="text-sm text-purple-700 mb-4">
                  아래 프롬프트를 Claude나 ChatGPT에 붙여넣어 상세한 풀이를 받아보세요!
                </p>
                <pre className="bg-white p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap border overflow-x-auto">
                  {activeQuestion.prompt}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
