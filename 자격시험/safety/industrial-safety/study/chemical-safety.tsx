'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'hazardous-materials',
    name: '위험물 안전',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '위험물의 분류를 설명하시오.', answer: '1류(산화성고체), 2류(가연성고체), 3류(자연발화/금수성), 4류(인화성액체), 5류(자기반응성), 6류(산화성액체)', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 위험물의 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제1류 위험물\n2. 제2류 위험물\n3. 제3류 위험물\n4. 제4류 위험물\n5. 제5류, 제6류 위험물\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인화점과 발화점의 차이를 설명하시오.', answer: '인화점: 점화원에 의해 점화되는 최저온도, 발화점: 점화원 없이 자연발화되는 온도', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 인화점과 발화점의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인화점 정의\n2. 발화점 정의\n3. 연소점 정의\n4. 측정 방법\n5. 실무 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '폭발한계(LEL, UEL)를 설명하시오.', answer: 'LEL: 폭발하한계, UEL: 폭발상한계, 폭발범위 = UEL - LEL', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 폭발한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폭발하한계(LEL)\n2. 폭발상한계(UEL)\n3. 폭발범위\n4. 위험도 지수\n5. 농도 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'MSDS(물질안전보건자료)의 구성을 설명하시오.', answer: '16개 항목: 화학제품 식별정보, 유해위험성, 구성성분, 응급조치요령 등', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: MSDS의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 16개 항목 개요\n2. 필수 기재 항목\n3. 작성/비치 의무\n4. 교육 요건\n5. 경고표지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 저장소의 안전거리를 설명하시오.', answer: '지정수량에 따라 안전거리 산정, 주거지역/학교 등과의 이격거리', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 위험물 저장소의 안전거리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전거리 산정 기준\n2. 지정수량 개념\n3. 보유공지\n4. 방화벽/방류턱\n5. 환기설비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'explosion-prevention',
    name: '폭발방지',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '폭발의 종류를 분류하시오.', answer: '가스폭발, 분진폭발, 증기운폭발(UVCE), 비등액체팽창증기폭발(BLEVE)', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 폭발의 종류를 분류하시오.\n\n다음 순서로 설명해주세요:\n1. 가스폭발\n2. 분진폭발\n3. 증기운폭발(UVCE)\n4. BLEVE\n5. 예방대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '분진폭발의 조건을 설명하시오.', answer: '가연성분진 + 산소 + 점화원 + 적정농도 + 밀폐공간', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 분진폭발의 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 5가지 조건\n2. 분진폭발 특성\n3. 2차 폭발\n4. 위험 분진 종류\n5. 예방대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '폭발방지대책을 설명하시오.', answer: '불활성화, 폭발억제, 폭발방산구, 압력방출장치', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 폭발방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불활성화(질소 치환)\n2. 폭발억제장치\n3. 폭발방산구\n4. 압력방출장치\n5. 플레임어레스터\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '화염전파방지장치를 설명하시오.', answer: '플레임어레스터, 안전기, 역화방지기', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 화염전파방지장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 플레임어레스터 원리\n2. 안전기 종류\n3. 역화방지기\n4. 설치 위치\n5. 점검 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '긴급차단장치와 인터록 시스템을 설명하시오.', answer: 'ESD(Emergency Shutdown): 비정상 시 자동차단, 인터록: 순차적 안전조건 확인', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 긴급차단장치와 인터록 시스템을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ESD 시스템\n2. 인터록 원리\n3. 안전계장시스템(SIS)\n4. SIL 등급\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'chemical-equipment',
    name: '화학설비 안전',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '화학반응기의 위험성을 설명하시오.', answer: '폭주반응, 이상반응, 과압, 과온, 누출', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 화학반응기의 위험성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폭주반응\n2. 이상반응 원인\n3. 과압/과온 위험\n4. 냉각 시스템\n5. 안전대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '배관의 안전관리를 설명하시오.', answer: '배관표시(색상/흐름방향), 플랜지 관리, 누출점검, 압력시험', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 배관의 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배관 표시(색상)\n2. 플랜지 관리\n3. 누출점검 방법\n4. 압력시험\n5. 보온/보냉\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '펌프의 안전장치를 설명하시오.', answer: '압력방출밸브, 역지밸브, 플랜지 가드, 커플링 커버', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 펌프의 안전장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압력방출밸브\n2. 역지밸브\n3. 회전부 방호\n4. 공동현상(Cavitation)\n5. 점검 항목\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '밸브의 종류와 특성을 설명하시오.', answer: '게이트밸브, 글로브밸브, 볼밸브, 버터플라이밸브, 체크밸브', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 밸브의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 게이트밸브\n2. 글로브밸브\n3. 볼밸브\n4. 체크밸브\n5. 용도별 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '저장탱크의 안전장치를 설명하시오.', answer: '안전밸브, 방류뚝, 통기관, 비상방류설비, 액면계', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 저장탱크의 안전장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전밸브\n2. 방류뚝(Dike)\n3. 통기관(Vent)\n4. 비상방류설비\n5. 액면계/온도계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'toxic-gas',
    name: '독성가스 안전',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '독성가스의 허용농도를 설명하시오.', answer: 'TWA(시간가중평균), STEL(단시간노출기준), C(최고노출기준)', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 독성가스의 허용농도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. TWA 개념\n2. STEL 개념\n3. Ceiling(C) 값\n4. 측정 방법\n5. 주요 가스 허용농도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '가스누출 감지 시스템을 설명하시오.', answer: '가연성가스 감지기, 독성가스 감지기, 산소농도계', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 가스누출 감지 시스템을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가연성가스 감지기\n2. 독성가스 감지기\n3. 산소농도계\n4. 설치 위치\n5. 경보 설정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '밀폐공간 작업 안전조치를 설명하시오.', answer: '산소농도 18%~23.5% 유지, 환기, 가스검지, 감시인 배치', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 밀폐공간 작업 안전조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산소농도 기준\n2. 환기 조치\n3. 가스검지\n4. 감시인 배치\n5. 구조용 장비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '호흡용 보호구의 종류를 설명하시오.', answer: '방진마스크, 방독마스크, 공기호흡기(SCBA), 송기마스크', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 호흡용 보호구의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방진마스크\n2. 방독마스크 종류\n3. 공기호흡기(SCBA)\n4. 송기마스크\n5. 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '화학물질 누출 시 대응절차를 설명하시오.', answer: '누출차단, 대피, 방제, 제독, 복구', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 화학물질 누출 시 대응절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초기대응\n2. 누출차단\n3. 대피 범위\n4. 방제 방법\n5. 복구/보고\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'fire-prevention',
    name: '화재예방',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '화재의 분류(A,B,C,D,K급)를 설명하시오.', answer: 'A급(일반), B급(유류), C급(전기), D급(금속), K급(주방)', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 화재의 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. A급 화재\n2. B급 화재\n3. C급 화재\n4. D급 화재\n5. K급 화재\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '소화약제의 종류와 적응화재를 설명하시오.', answer: '물, 포, CO2, 분말, 할론대체물질, 청정소화약제', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 소화약제의 종류와 적응화재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물 소화약제\n2. 포 소화약제\n3. CO2 소화약제\n4. 분말 소화약제\n5. 청정소화약제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '소화설비의 종류를 설명하시오.', answer: '스프링클러, 물분무, 포소화, CO2소화, 할론소화', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 소화설비의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 스프링클러 설비\n2. 물분무 소화설비\n3. 포소화설비\n4. 가스계 소화설비\n5. 설치 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '화재감지기의 종류를 설명하시오.', answer: '열감지기(정온식/차동식), 연기감지기(광전식/이온화식), 불꽃감지기', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 화재감지기의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열감지기 종류\n2. 연기감지기 종류\n3. 불꽃감지기\n4. 복합형 감지기\n5. 설치 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 제조소의 소화설비 기준을 설명하시오.', answer: '지정수량 배수에 따른 소화설비 종류 결정', prompt: '산업안전기사 화학설비위험방지기술 문제입니다.\n\n문제: 위험물 제조소의 소화설비 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지정수량 배수\n2. 소화난이도 등급\n3. 소화설비 종류\n4. 소화기 배치\n5. 옥외소화전\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ChemicalSafetyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('industrial-safety-chemical-safety-completed');
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
    localStorage.setItem('industrial-safety-chemical-safety-completed', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-red-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/industrial-safety" className="text-gray-600 hover:text-red-600">산업안전기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">화학설비위험방지기술</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🧪</span>
            <h1 className="text-2xl font-bold text-gray-800">화학설비위험방지기술 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">산업안전기사 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-red-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-red-500 text-white hover:bg-red-600'}`}>
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
