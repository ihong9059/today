'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'electrical-safety',
    name: '전기안전 기초',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '감전재해의 종류를 설명하시오.', answer: '직접접촉 감전, 간접접촉 감전, 정전기 감전', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 감전재해의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접접촉 감전\n2. 간접접촉 감전\n3. 정전기 감전\n4. 각 감전의 특징\n5. 예방 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '접지의 목적과 종류를 설명하시오.', answer: '감전 방지, 기기 보호 / 제1종, 제2종, 제3종 접지', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 접지의 목적과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접지의 목적\n2. 제1종 접지\n3. 제2종 접지\n4. 제3종 접지\n5. 접지저항 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '누전차단기의 원리를 설명하시오.', answer: '영상변류기로 누설전류 검출 → 트립코일 작동 → 차단', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 누전차단기의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영상변류기 역할\n2. 누설전류 검출\n3. 트립코일 작동\n4. 정격감도전류\n5. 동작시간\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '정전작업 절차를 설명하시오.', answer: '전원차단 → 개폐기 잠금·표시 → 검전 → 접지 → 작업', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 정전작업 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전원차단\n2. 잠금·표시\n3. 검전\n4. 접지\n5. 작업 및 복구\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '활선작업 시 안전수칙을 설명하시오.', answer: '절연용 보호구 착용, 절연공구 사용, 감시인 배치', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 활선작업 시 안전수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 절연용 보호구\n2. 절연공구 사용\n3. 감시인 배치\n4. 접근 금지 거리\n5. 작업 허가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'electrical-fire',
    name: '전기화재',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '전기화재의 원인을 설명하시오.', answer: '과전류(과부하, 단락), 누전, 접촉불량, 정전기', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 전기화재의 원인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과부하\n2. 단락(합선)\n3. 누전\n4. 접촉불량\n5. 정전기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '과전류 차단장치를 설명하시오.', answer: '퓨즈, 배선용 차단기(NFB), 누전차단기(ELB)', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 과전류 차단장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퓨즈의 원리\n2. NFB의 특성\n3. ELB의 기능\n4. 정격 선정\n5. 설치 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '전기화재 소화방법을 설명하시오.', answer: '전원차단 후 소화, C급 소화기(CO₂, 분말) 사용', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 전기화재 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전원차단 우선\n2. C급 소화기\n3. CO₂ 소화기\n4. 분말 소화기\n5. 물 사용 금지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '정전기 발생 원인과 대책을 설명하시오.', answer: '마찰·박리·분리에 의한 대전 / 접지, 가습, 제전기 사용', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 정전기 발생 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 마찰대전\n2. 박리대전\n3. 접지 설치\n4. 가습\n5. 제전기 사용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '전선의 허용전류를 설명하시오.', answer: '전선의 굵기와 온도에 따라 결정, 과부하 방지', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 전선의 허용전류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허용전류 개념\n2. 전선 굵기\n3. 온도 영향\n4. 과부하 방지\n5. 전선 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'chemical-basic',
    name: '화학물질 안전',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '위험물의 분류를 설명하시오.', answer: '제1류(산화성고체), 제2류(가연성고체), 제3류(자연발화성), 제4류(인화성액체), 제5류(자기반응성), 제6류(산화성액체)', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 위험물의 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제1류 (산화성고체)\n2. 제2류 (가연성고체)\n3. 제3류 (자연발화성)\n4. 제4류 (인화성액체)\n5. 제5,6류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인화점과 발화점을 설명하시오.', answer: '인화점: 점화원 접근 시 발화, 발화점: 자연 발화하는 최저온도', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 인화점과 발화점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인화점 정의\n2. 발화점 정의\n3. 차이점\n4. 측정 방법\n5. 안전관리 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'MSDS의 주요 내용을 설명하시오.', answer: '화학물질명, 유해위험성, 응급조치요령, 취급 및 저장방법, 노출방지 및 보호구', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: MSDS의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화학물질 정보\n2. 유해위험성\n3. 응급조치\n4. 취급·저장\n5. 보호구\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '폭발범위(연소범위)를 설명하시오.', answer: '폭발하한계 ~ 폭발상한계, 이 범위 내에서 점화원 접근 시 폭발', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 폭발범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폭발범위 개념\n2. 폭발하한계\n3. 폭발상한계\n4. 위험도 평가\n5. 안전 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가연성가스 검지기의 종류를 설명하시오.', answer: '접촉연소식, 반도체식, 열전도식', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 가연성가스 검지기의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접촉연소식\n2. 반도체식\n3. 열전도식\n4. 각 방식의 특징\n5. 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'chemical-facility',
    name: '화학설비 안전',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '화학설비의 폭발방지 대책을 설명하시오.', answer: '불활성가스 치환, 농도 관리, 점화원 제거, 환기', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 화학설비의 폭발방지 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불활성가스 치환\n2. 농도 관리\n3. 점화원 제거\n4. 환기 설비\n5. 방폭구조\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '반응폭주의 원인과 대책을 설명하시오.', answer: '온도 상승, 압력 상승, 냉각 실패 / 온도 감시, 긴급냉각, 압력방출', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 반응폭주의 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 반응폭주 개념\n2. 원인\n3. 온도 감시\n4. 긴급냉각\n5. 압력방출\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '정압안전장치(파열판)를 설명하시오.', answer: '설정압력 도달 시 파열되어 압력 방출', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 정압안전장치(파열판)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 파열판 원리\n2. 설정압력\n3. 안전밸브와 차이\n4. 설치 위치\n5. 점검 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '화학물질 저장 시 주의사항을 설명하시오.', answer: '혼합 금지물질 분리, 통풍·환기, 온도 관리, 표지 부착', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 화학물질 저장 시 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분리 저장\n2. 통풍·환기\n3. 온도 관리\n4. 표지 부착\n5. 누출 대비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '국소배기장치의 구성을 설명하시오.', answer: '후드, 덕트, 공기정화장치, 송풍기, 배출구', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 국소배기장치의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 후드의 역할\n2. 덕트의 설계\n3. 공기정화장치\n4. 송풍기 선정\n5. 배출구 위치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'personal-protection',
    name: '개인보호구',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '전기작업용 보호구를 설명하시오.', answer: '절연장갑, 절연화, 절연모, 안전대', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 전기작업용 보호구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 절연장갑\n2. 절연화\n3. 절연모\n4. 안전대\n5. 관리 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '화학물질 취급 시 보호구를 설명하시오.', answer: '보안경, 보호장갑, 방진마스크/방독마스크, 보호복', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 화학물질 취급 시 보호구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보안경\n2. 보호장갑\n3. 방독마스크\n4. 보호복\n5. 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '호흡보호구의 종류를 설명하시오.', answer: '방진마스크, 방독마스크, 송기마스크, 공기호흡기', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 호흡보호구의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방진마스크\n2. 방독마스크\n3. 송기마스크\n4. 공기호흡기\n5. 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '보호장갑의 종류와 용도를 설명하시오.', answer: '내열장갑, 내한장갑, 절연장갑, 내화학장갑, 방진장갑', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 보호장갑의 종류와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내열장갑\n2. 절연장갑\n3. 내화학장갑\n4. 방진장갑\n5. 선정 및 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '안전모의 종류와 성능을 설명하시오.', answer: 'AE형(비전도성), AB형(전기용), ABE형(복합형)', prompt: '산업안전산업기사 전기 및 화학설비안전관리 문제입니다.\n\n문제: 안전모의 종류와 성능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AE형 (비전도성)\n2. AB형 (전기용)\n3. ABE형 (복합형)\n4. 성능 기준\n5. 착용 및 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ElectricalChemicalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('industrial-safety-technician-electrical-chemical-progress');
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
    localStorage.setItem('industrial-safety-technician-electrical-chemical-progress', JSON.stringify(arr));
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
            <Link href="/category/safety/industrial-safety-technician" className="text-gray-600 hover:text-red-600">산업안전산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">전기 및 화학설비안전관리</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚡</span>
            <h1 className="text-2xl font-bold text-gray-800">전기 및 화학설비안전관리 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">산업안전산업기사 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-red-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
