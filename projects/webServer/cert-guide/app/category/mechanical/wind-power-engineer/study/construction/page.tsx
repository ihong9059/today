'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ConstructionStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '터빈 설치', icon: '🏗️' },
    { id: 1, name: '전기 시공', icon: '🔌' },
    { id: 2, name: '접지 피뢰', icon: '⚡' },
    { id: 3, name: '시운전', icon: '▶️' },
    { id: 4, name: '품질관리', icon: '✅' },
    { id: 5, name: '안전관리', icon: '🛡️' },
    { id: 6, name: '해상시공', icon: '🌊' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '풍력터빈 설치 공정 순서를 설명하시오.', answer: '기초 공사 → 타워 설치 → 나셀 설치 → 로터(허브+블레이드) 설치 → 전기 연결 순서이다.', explanation: '각 단계별 크레인 사양 확인 필요' },
      { id: 2, question: '타워 세그먼트 조립 시 주의사항을 설명하시오.', answer: '플랜지 정렬, 볼트 체결 토크 관리, 그라우팅 시공, 내부 케이블 설치를 확인한다.', explanation: '토크렌치로 규정 토크 확인' },
      { id: 3, question: '나셀 설치 시 주요 점검사항을 설명하시오.', answer: '크레인 용량, 풍속 제한, 요 베어링 정렬, 케이블 연결을 점검한다.', explanation: '풍속 10m/s 이하에서 작업' },
      { id: 4, question: '블레이드 운송 시 고려사항을 설명하시오.', answer: '길이(60m 이상), 도로 폭, 회전 반경, 운송 허가, 에스코트를 고려한다.', explanation: '야간 운송, 경찰 에스코트 필수' },
      { id: 5, question: '블레이드 싱글 리프팅과 번들 리프팅을 비교하시오.', answer: '싱글 리프팅은 하나씩 설치하여 안전하나 시간이 걸리고, 번들은 조립 후 한번에 설치한다.', explanation: '번들: 로터 스타(Star) 조립' },
      { id: 6, question: '크레인 선정 시 고려사항을 설명하시오.', answer: '최대 양중 하중, 작업 반경, 붐 길이, 지반 지지력, 현장 접근성을 고려한다.', explanation: '대형터빈: 1,000톤급 크레인' },
      { id: 7, question: '터빈 설치 시 기상 조건 제한을 설명하시오.', answer: '풍속 10m/s 이하, 강우/강설 없음, 시정 확보, 낙뢰 위험 없음을 확인한다.', explanation: '기상 모니터링 시스템 활용' }
    ],
    1: [
      { id: 8, question: '풍력발전 케이블 종류와 적용 부위를 설명하시오.', answer: '타워 내부(0.6/1kV), 집전계통(22/33kV), 연계선로(154kV 이상)에 각각 적용한다.', explanation: 'XLPE 절연 케이블 주로 사용' },
      { id: 9, question: '케이블 포설 방법과 주의사항을 설명하시오.', answer: '직매, 관로, 트레이 방식이 있으며 허용 곡률반경, 장력 제한을 준수한다.', explanation: '케이블 외경의 8-15배 곡률반경' },
      { id: 10, question: '케이블 접속재 종류와 특징을 설명하시오.', answer: '열수축, 냉간수축, 프리몰드 접속재가 있으며 전압등급에 따라 선정한다.', explanation: '고전압은 프리몰드 선호' },
      { id: 11, question: '타워 내부 케이블 설치 방법을 설명하시오.', answer: '케이블 트레이 또는 행거에 고정하고, 요 비틀림에 대응하는 루프를 형성한다.', explanation: '요 카운터로 비틀림 관리' },
      { id: 12, question: '변압기 설치 및 시험 항목을 설명하시오.', answer: '기초 설치, 오일 주입, 절연저항, 권선저항, 변압비, 무부하 시험을 수행한다.', explanation: '설치 후 24시간 이상 안정화' },
      { id: 13, question: '개폐장치(Switchgear) 설치 시 점검사항을 설명하시오.', answer: '정렬, 접지 연결, 보호계전기 설정, 차단기 동작 시험을 점검한다.', explanation: '가스절연(GIS) 또는 진공차단기' },
      { id: 14, question: '전기 시공 품질관리 항목을 설명하시오.', answer: '절연저항, 접지저항, 케이블 절연, 보호동작, 역률 측정을 확인한다.', explanation: '준공 전 전 항목 시험' }
    ],
    2: [
      { id: 15, question: '풍력터빈 접지시스템의 구성을 설명하시오.', answer: '터빈 기초 접지, 집전계통 접지, 변전소 접지를 상호 연결한다.', explanation: '등전위 본딩 필수' },
      { id: 16, question: '접지저항 측정 방법과 기준을 설명하시오.', answer: '전위강하법, 클램프법으로 측정하며 통합접지 10Ω 이하를 목표로 한다.', explanation: '계절/습도 영향 고려' },
      { id: 17, question: '접지극 종류와 선정 기준을 설명하시오.', answer: '봉접지, 판접지, 매설접지선이 있으며 토양 저항률에 따라 선정한다.', explanation: '저항률 높으면 접지극 증설' },
      { id: 18, question: '풍력터빈 피뢰시스템의 구성을 설명하시오.', answer: '블레이드 리셉터, 다운컨덕터, 스파크갭, 접지시스템으로 구성된다.', explanation: 'IEC 62305, IEC 61400-24 적용' },
      { id: 19, question: '블레이드 피뢰 리셉터의 배치를 설명하시오.', answer: '팁에서 5m 이내에 리셉터를 배치하고, 블레이드 전장에 걸쳐 분산 배치한다.', explanation: '보호 영역(Protection Zone) 확보' },
      { id: 20, question: 'SPD(서지보호장치)의 적용 위치를 설명하시오.', answer: '저압반, 제어반, 통신설비 입구에 SPD를 설치하여 유도 서지를 차단한다.', explanation: 'Type 1, 2, 3 등급별 적용' },
      { id: 21, question: '등전위 본딩의 목적과 방법을 설명하시오.', answer: '기기 간 전위차를 없애 사고를 방지하며, 본딩 도체로 금속부를 연결한다.', explanation: '나셀 내부 모든 금속체 본딩' }
    ],
    3: [
      { id: 22, question: '풍력터빈 시운전 절차를 설명하시오.', answer: '사전 점검 → 무부하 시험 → 부하 시험 → 계통 연계 시험 → 성능 시험 순서이다.', explanation: '제조사 시운전 매뉴얼 준수' },
      { id: 23, question: '시운전 전 사전 점검 항목을 설명하시오.', answer: '볼트 체결, 오일 레벨, 냉각수, 브레이크, 피치/요 시스템을 점검한다.', explanation: '체크리스트 활용 필수' },
      { id: 24, question: '무부하 운전(No-Load Test) 시험 항목을 설명하시오.', answer: '요 동작, 피치 동작, 브레이크 동작, 안전장치를 시험한다.', explanation: '전력 공급 없이 기계 동작 확인' },
      { id: 25, question: '부하 운전(Load Test) 시험 항목을 설명하시오.', answer: '발전 시작, 출력 제어, MPPT 성능, 비상정지를 시험한다.', explanation: '단계적 부하 증가 확인' },
      { id: 26, question: '계통 연계 시험 항목을 설명하시오.', answer: '동기화, 무효전력 제어, 주파수 응답, 보호 협조를 시험한다.', explanation: '계통운영자 입회 시험' },
      { id: 27, question: '출력곡선 검증(Power Curve Test) 방법을 설명하시오.', answer: 'IEC 61400-12-1에 따라 풍속별 출력을 측정하여 보증곡선과 비교한다.', explanation: '최소 3개월 이상 데이터 수집' },
      { id: 28, question: '시운전 완료 후 인수인계 서류를 설명하시오.', answer: '시험 성적서, 준공도면, 매뉴얼, 예비품 목록, 보증서를 인계한다.', explanation: 'O&M 팀 교육 포함' }
    ],
    4: [
      { id: 29, question: '풍력발전 시공 품질관리 체계를 설명하시오.', answer: 'QA/QC 계획 수립, 검사점(ITP) 설정, 부적합 관리, 시정조치를 수행한다.', explanation: 'ISO 9001 기반 품질시스템' },
      { id: 30, question: '기초 공사 품질관리 항목을 설명하시오.', answer: '철근 배근, 콘크리트 배합, 타설, 양생, 앵커볼트 정밀도를 관리한다.', explanation: '설계강도 확인 시험' },
      { id: 31, question: '타워 용접 품질관리 방법을 설명하시오.', answer: 'WPS/PQR 적용, 용접사 자격, NDT(UT, MT, RT) 검사를 수행한다.', explanation: '100% 비파괴검사 요구' },
      { id: 32, question: '볼트 체결 품질관리 방법을 설명하시오.', answer: '토크 관리, 장력 확인, 체결 순서, 마킹을 통해 관리한다.', explanation: '토크-장력 관계 검증' },
      { id: 33, question: '전기공사 검사 및 시험(ITP) 항목을 설명하시오.', answer: '절연저항, 접지저항, 연속성, 극성, 보호동작 시험을 수행한다.', explanation: '홀드포인트(H) 지정' },
      { id: 34, question: '부적합 사항 관리 절차를 설명하시오.', answer: '부적합 식별 → 원인 분석 → 시정조치 → 재검사 → 완료 순서이다.', explanation: 'NCR(부적합보고서) 관리' },
      { id: 35, question: '시공 문서 관리 체계를 설명하시오.', answer: '도면, 시방서, 검사기록, 변경 관리를 체계적으로 유지한다.', explanation: 'As-Built 도면 작성' }
    ],
    5: [
      { id: 36, question: '풍력발전 시공 안전관리 체계를 설명하시오.', answer: 'OHSMS(안전보건경영시스템), 위험성평가, 안전교육, TBM을 시행한다.', explanation: 'ISO 45001 기반' },
      { id: 37, question: '고소작업 안전 대책을 설명하시오.', answer: '안전대 착용, 추락방지대 설치, 안전난간, 승강설비 사용을 준수한다.', explanation: '2m 이상 고소작업 적용' },
      { id: 38, question: '크레인 작업 안전 수칙을 설명하시오.', answer: '자격자 배치, 과부하 금지, 신호수 배치, 작업반경 통제를 준수한다.', explanation: '양중 하중의 80% 이내 작업' },
      { id: 39, question: '전기작업 안전 절차를 설명하시오.', answer: '차단-잠금-태그(LOTO), 무전압 확인, 접지, 절연용 보호구를 적용한다.', explanation: '활선 작업 최소화' },
      { id: 40, question: '제한공간 작업 안전 대책을 설명하시오.', answer: '산소농도 측정, 환기, 감시인 배치, 비상 구조 계획을 수립한다.', explanation: '타워/나셀 내부 작업 해당' },
      { id: 41, question: '악천후 작업 중지 기준을 설명하시오.', answer: '풍속 10m/s 이상, 강우/강설, 낙뢰 시 고소작업 및 양중작업을 중지한다.', explanation: '현장 기상관측 시스템 활용' },
      { id: 42, question: '비상 대응 계획을 설명하시오.', answer: '화재, 추락, 감전, 구조 상황별 대응 절차와 비상 연락망을 수립한다.', explanation: '응급 구조 장비 비치' }
    ],
    6: [
      { id: 43, question: '해상풍력 기초 설치 공정을 설명하시오.', answer: '모노파일: 항타/드릴링 → 트랜지션피스 → 그라우팅 순서이다.', explanation: 'Jack-up 선박 활용' },
      { id: 44, question: '해상풍력 터빈 설치 공정을 설명하시오.', answer: '타워 설치 → 나셀 설치 → 블레이드 설치, 해상 날씨창(Weather Window) 활용한다.', explanation: '유의파고 1.5m 이하 작업' },
      { id: 45, question: '해상 케이블 포설 방법을 설명하시오.', answer: 'Cable Laying Vessel로 포설하고, 제팅/매설/암반 고정으로 보호한다.', explanation: '케이블 매설 깊이 1-2m' },
      { id: 46, question: '해상 작업 안전 관리를 설명하시오.', answer: '선박 안전, 해상 구명설비, 헬기 대피, 기상 모니터링을 시행한다.', explanation: 'STCW 자격 보유자 배치' },
      { id: 47, question: '해상풍력 품질관리 특이사항을 설명하시오.', answer: '해상 환경 부식 관리, 케이블 수밀 시험, 해저 매설 확인을 수행한다.', explanation: 'ROV 활용 해저 검사' },
      { id: 48, question: '해상변전소(OSS) 설치 방법을 설명하시오.', answer: 'Floatover 또는 Heavy Lift로 탑사이드를 설치하고 자켓/기초와 연결한다.', explanation: '대형 중량물 정밀 설치' },
      { id: 49, question: '해상풍력 시운전 특이사항을 설명하시오.', answer: 'CTV/SOV로 접근하고, 해상 날씨 제약을 고려하여 일정을 수립한다.', explanation: 'O&M 모선(SOV) 활용' },
      { id: 50, question: '해상풍력 준공 검사 항목을 설명하시오.', answer: '해저케이블 매설, 세굴방지공, 부유물 확인, 해양환경 영향을 검사한다.', explanation: '해양수산부 준공검사' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`풍력발전설비기사 시험 관련 질문입니다:\n\n${question}\n\n이 문제에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-orange-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/mechanical" className="hover:text-white">기계·전기·전자</Link><span>/</span>
            <Link href="/category/mechanical/wind-power-engineer" className="hover:text-white">풍력발전설비기사</Link><span>/</span>
            <Link href="/category/mechanical/wind-power-engineer/study" className="hover:text-white">학습</Link><span>/</span>
            <span className="text-white">풍력발전설비 시공</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">🔧 풍력발전설비 시공</h1>
          <p className="text-orange-100">터빈 설치, 전기 시공, 시운전, 품질관리</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-orange-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">📚 학습 토픽</h3>
              <div className="space-y-2">
                {topics.map((topic) => (
                  <button key={topic.id} onClick={() => setCurrentTopic(topic.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-orange-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-orange-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-orange-50 rounded-lg"><p className="font-medium text-orange-900">✅ 정답</p><p className="text-orange-800 mt-1">{q.answer}</p></div>
                    <div className="p-4 bg-gray-50 rounded-lg"><p className="font-medium text-gray-700">💡 해설</p><p className="text-gray-600 mt-1">{q.explanation}</p></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">🤖 AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto"><p className="text-gray-700 text-sm whitespace-pre-wrap">{currentPrompt}</p></div>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 rounded-lg font-medium">Claude에서 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg font-medium">ChatGPT에서 질문하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 rounded-lg font-medium">Gemini에서 질문하기</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
