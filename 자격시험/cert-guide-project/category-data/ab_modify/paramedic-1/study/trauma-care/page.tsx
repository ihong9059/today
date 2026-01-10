'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 1,
    title: '외상 평가와 원칙',
    questions: [
      { id: 1, question: '외상의 손상기전(Mechanism of Injury)의 중요성을 설명하시오', answer: '손상 패턴 예측, 잠재적 손상 파악, 이송 결정에 활용. 관통상 vs 둔상, 고에너지 vs 저에너지, 접촉 양상을 파악합니다.' },
      { id: 2, question: '외상환자 1차 평가(Primary Survey)를 설명하시오', answer: 'ABCDE 순서: A(기도+경추보호), B(호흡), C(순환+출혈조절), D(신경학적 평가), E(노출+환경). 생명 위협 시 즉시 처치합니다.' },
      { id: 3, question: '골든아워(Golden Hour)의 개념을 설명하시오', answer: '중증 외상환자가 수상 후 1시간 이내에 결정적 치료를 받아야 생존율이 높아진다는 개념. 현장 시간 최소화(10분 규칙)가 중요합니다.' },
      { id: 4, question: '외상센터 이송 기준을 설명하시오', answer: '생리적: GCS≤13, SBP<90, RR<10 또는 >29. 해부학적: 관통상, 불안정 흉부, 골반골절, 2개 이상 사지골절. 손상기전: 추락 6m이상, 차량변형.' },
      { id: 5, question: '경추 손상 의심 상황과 고정 적응증을 설명하시오', answer: '의심 상황: 의식변화, 목통증, 신경학적 이상, 고에너지 손상, 음주/약물. 모든 다발성 외상, 두부외상, 목 위 손상 시 경추 고정합니다.' },
      { id: 6, question: '외상 환자 출혈 조절 방법을 설명하시오', answer: '직접 압박(가장 중요), 압박드레싱, 지혈대(사지 출혈), 지혈제(외상드레싱), 골반바인더. 맹목적 겸자 사용은 금기입니다.' },
      { id: 7, question: '지혈대(Tourniquet) 적용 원칙을 설명하시오', answer: '적응증: 직접압박으로 조절 안 되는 사지 출혈. 방법: 출혈 부위 상부, 최대한 조임, 적용 시간 기록. 2시간 이내 해제 또는 재평가.' },
      { id: 8, question: '외상 환자 수액 요법의 원칙을 설명하시오', answer: '허용적 저혈압(SBP 80-90mmHg, 두부외상 제외), 과도한 수액은 응고장애와 희석성 빈혈 유발. 따뜻한 수액, 혈액제제 고려.' },
      { id: 9, question: '외상 환자의 저체온 예방을 설명하시오', answer: '외상 삼주(저체온, 산증, 응고장애)의 일부. 젖은 옷 제거, 보온담요, 따뜻한 수액, 환경 온도 조절. 심부체온 36도 이상 유지.' },
      { id: 10, question: '다발성 외상 환자 관리 우선순위를 설명하시오', answer: '생명 위협 순서: 기도폐쇄→긴장성 기흉→대량출혈→심낭압전→개방성 기흉. 동시에 경추 보호, 신속한 이송 결정이 필요합니다.' },
    ]
  },
  {
    id: 2,
    title: '두부 및 안면외상',
    questions: [
      { id: 11, question: '두개내압 상승의 증상과 징후를 설명하시오', answer: '초기: 두통, 오심/구토, 의식변화. 후기: 쿠싱삼징후(고혈압, 서맥, 불규칙호흡), 동공산대, 제뇌/제피질 자세. 뇌탈출 징후입니다.' },
      { id: 12, question: '두부외상의 분류(경증/중등도/중증)를 설명하시오', answer: 'GCS 기준: 경증 14-15, 중등도 9-13, 중증 3-8. 중증은 기관삽관, 과환기 금지(PaCO2 35-40), 즉각적 신경외과 협진이 필요합니다.' },
      { id: 13, question: '뇌진탕의 특성과 관리를 설명하시오', answer: '일시적 신경기능 장애, 의식소실(있거나 없음), 기억상실. 대부분 회복되나 반복 시 누적 손상. 24시간 관찰, 운동 제한이 필요합니다.' },
      { id: 14, question: '경막외출혈(EDH)의 특성을 설명하시오', answer: '중뇌막동맥 손상(측두부 골절). 의식소실→명료(lucid interval)→악화. CT: 볼록렌즈 모양. 응급 수술 필요. 예후는 비교적 양호합니다.' },
      { id: 15, question: '경막하출혈(SDH)의 특성을 설명하시오', answer: '가교정맥 파열. 급성(<72시간): 고에너지 외상, 높은 사망률. 만성: 고령, 경미한 외상. CT: 초승달 모양. 예후는 EDH보다 불량합니다.' },
      { id: 16, question: '두개저골절의 징후를 설명하시오', answer: '배틀 징후(유양돌기 멍), 너구리눈(안와주위 멍), 뇌척수액 비루/이루, 고막혈종. 비인두기도기 금기, 비위관 주의가 필요합니다.' },
      { id: 17, question: '뇌탈출 증후군의 유형을 설명하시오', answer: '천막상 탈출(동측 동공산대→반대측 마비), 천막하 탈출(양측 동공 고정, 의식소실), 편도탈출(호흡정지, 서맥). 응급 감압이 필요합니다.' },
      { id: 18, question: '두부외상 환자의 기도관리 원칙을 설명하시오', answer: '경추 보호 하에 기도 확보. GCS≤8 기관삽관. 과환기 금지(뇌혈류 감소). 탈출 징후 시에만 일시적 과환기(ETCO2 30-35).' },
      { id: 19, question: '안면외상의 기도 관리를 설명하시오', answer: '출혈, 부종, 해부학적 변형으로 기도폐쇄 위험. 흡인, 자세조절, 조기 삽관 고려. LeFort 골절 시 비인두기도기 금기.' },
      { id: 20, question: '안구외상의 평가와 처치를 설명하시오', answer: '시력 확인, 동공반사, 안구운동. 관통상: 보호대로 양안 덮기, 압박 금지. 화학화상: 즉각적 세척(최소 20분). 안압상승, 전방출혈 주의.' },
    ]
  },
  {
    id: 3,
    title: '흉부외상',
    questions: [
      { id: 21, question: '긴장성 기흉의 병태생리와 처치를 설명하시오', answer: '일방향 밸브로 흉강 내 공기 축적→종격동 편위→정맥환류 감소→쇼크. 처치: 바늘감압술(쇄골중앙선 2번째 늑간 또는 중액와선 4-5번째)→흉관삽입.' },
      { id: 22, question: '개방성 기흉의 처치를 설명하시오', answer: '흡인흉부상(sucking chest wound). 처치: 3면 밀봉 드레싱(배출 허용), 밀봉 드레싱. 긴장성 기흉 발생 시 드레싱 일시 제거. 흉관 삽입.' },
      { id: 23, question: '혈흉의 평가와 처치를 설명하시오', answer: '늑간혈관 또는 폐손상. 증상: 호흡곤란, 타진 시 둔탁음, 청진 시 호흡음 감소. 처치: 흉관삽입(5번째 늑간, 중액와선). 대량혈흉(1.5L 이상) 시 수술 고려.' },
      { id: 24, question: '동요흉(Flail chest)의 특성과 처치를 설명하시오', answer: '연속된 3개 이상 늑골의 2곳 이상 골절. 역행호흡운동. 통증으로 환기 제한. 처치: 산소, 진통(늑간신경차단), 양압환기, 체위(손상측 아래).' },
      { id: 25, question: '심낭압전의 3징후(Beck 삼징후)를 설명하시오', answer: '경정맥 팽창(JVD), 저혈압, 심음 감소(distant heart sounds). 관통상 후 발생, 정맥환류 감소로 쇼크. 처치: 심낭천자, 수술.' },
      { id: 26, question: '심장 좌상의 평가를 설명하시오', answer: '둔상에 의한 심근 손상. 흉골골절 동반 가능. 부정맥(PVC, AF), 심전도 이상, 심장효소 상승. 모니터링 24-48시간, 부정맥 치료.' },
      { id: 27, question: '대동맥 손상의 의심 상황을 설명하시오', answer: '고에너지 감속 손상(고속 충돌, 추락). 흉부 X선: 종격동 확장, 대동맥 윤곽 이상. 좌측 혈흉, 상지-하지 혈압 차이. CT 혈관조영으로 확진.' },
      { id: 28, question: '기관/기관지 손상의 증상을 설명하시오', answer: '피하기종(목, 흉부), 지속적 공기누출, 혈담, 호흡곤란. 흉관 삽입 후에도 폐 확장 안 됨. 기관지경으로 확진, 수술적 복원.' },
      { id: 29, question: '횡격막 손상의 특성을 설명하시오', answer: '둔상(좌측 호발, 높은 충돌력), 관통상. 복부 장기가 흉강으로 탈출. 호흡곤란, 청진 시 장음. 흉부 X선, CT로 진단. 수술적 복원.' },
      { id: 30, question: '늑골 골절의 합병증을 설명하시오', answer: '1-2번: 대혈관 손상. 4-9번: 폐좌상, 기/혈흉. 10-12번: 간/비장/신장 손상. 통증으로 무기폐, 폐렴 위험. 적절한 진통이 중요합니다.' },
    ]
  },
  {
    id: 4,
    title: '복부 및 골반외상',
    questions: [
      { id: 31, question: '복부외상의 신체검진 소견을 설명하시오', answer: '시진: 멍, 팽만, 좌상. 청진: 장음 감소/소실. 타진: 둔탁음(혈액), 고음(공기). 촉진: 압통, 반발통, 근육강직. 불안정한 환자는 신속 이송.' },
      { id: 32, question: '실질장기 손상(간, 비장)의 특성을 설명하시오', answer: '간: 우상복부, 출혈 많음. 비장: 좌상복부, 지연성 파열 가능. 둘 다 대량출혈 위험. 안정 시 비수술적 관리, 불안정 시 수술.' },
      { id: 33, question: '중공장기 손상(장, 방광)의 특성을 설명하시오', answer: '천공 시 복막염 발생. 복막자극 징후: 반발통, 근육강직. 장천공: 자유공기. 방광파열: 하복부 압통, 혈뇨. 수술적 복원 필요.' },
      { id: 34, question: '후복막 손상(신장, 췌장)의 특성을 설명하시오', answer: '신장: 옆구리 통증, 혈뇨, 옆구리 멍. 췌장: 상복부 통증, 아밀라제 상승. 후복막은 검진이 어렵고 CT로 평가합니다.' },
      { id: 35, question: '복부관통상의 처치 원칙을 설명하시오', answer: '이물제거 금지, 노출된 장기 덮기(식염수 거즈), 장기 환납 시도 금지. 쇼크 상태면 수액 소생, 신속한 수술실 이송.' },
      { id: 36, question: '복부 팽창성 내출혈(hemoperitoneum)의 평가를 설명하시오', answer: '증상: 복부 팽만, 저혈압, 빈맥. FAST(초음파): 복강 내 유리액 확인. 불안정한 환자는 수술실 직행.' },
      { id: 37, question: '골반골절의 분류와 의의를 설명하시오', answer: '안정: 단일골절. 불안정: 고에너지, 다발골절(open book, lateral compression, vertical shear). 불안정 골절은 대량출혈(3-4L) 가능, 생명위협적.' },
      { id: 38, question: '불안정 골반골절의 처치를 설명하시오', answer: '골반바인더 또는 시트 압박(대전자 레벨), 출혈 조절(혈관조영술, 외고정), 수혈. 비뇨기 손상 동반 주의. 요도카테터 삽입 전 요도손상 배제.' },
      { id: 39, question: '요도손상의 징후를 설명하시오', answer: '요도구 출혈, 음낭/회음부 혈종, 고위치 전립선(직장검사), 요도카테터 삽입 저항. 의심 시 역행성 요도조영술 후 카테터 삽입.' },
      { id: 40, question: '임산부 외상의 특수 고려사항을 설명하시오', answer: '혈액량 증가(30-40%)로 쇼크 징후 지연, 좌측위(대정맥압박 방지), 태아 모니터링. 모체 소생이 우선, 제왕절개는 최후 수단(사후 제왕절개 포함).' },
    ]
  },
  {
    id: 5,
    title: '사지외상 및 고정',
    questions: [
      { id: 41, question: '골절의 일반적 징후를 설명하시오', answer: '통증, 부종, 변형, 기능상실, 점상출혈, 염발음. 의심 시 X선 전 부목고정. 개방성 골절은 감염 고위험으로 항생제, 파상풍 예방.' },
      { id: 42, question: '사지 혈관손상의 6P를 설명하시오', answer: 'Pain(통증), Pallor(창백), Pulselessness(무맥), Paresthesia(감각이상), Paralysis(마비), Poikilothermia(냉감). 혈관 손상의 징후로 응급 수술 필요.' },
      { id: 43, question: '구획증후군의 병태생리와 처치를 설명하시오', answer: '근막 구획 내 압력 상승→순환 장애→근육, 신경 괴사. 5P 증상, 수동신전 시 통증. 처치: 압박제거, 근막절개술. 6시간 이내 치료 필수.' },
      { id: 44, question: '대퇴골 골절의 특성과 처치를 설명하시오', answer: '고에너지 손상, 대량출혈(1-2L), 쇼크 위험. 하지 단축, 외회전. 처치: 견인부목(Traction splint), 수액, 진통. 견인부목은 골반/무릎 손상 시 금기.' },
      { id: 45, question: '경골/비골 골절의 처치를 설명하시오', answer: '피하에 가까워 개방성 골절 흔함. 신경/혈관 손상, 구획증후군 주의. 부목고정(무릎-발목 포함), 거상, 순환 확인.' },
      { id: 46, question: '상지 골절의 부목 적용 원칙을 설명하시오', answer: '손상 부위 상하 관절 포함, 해부학적 위치, 순환 확인(맥박, 감각, 운동). 팔걸이(sling), 판부목, 공기부목 사용.' },
      { id: 47, question: '탈구의 특성과 처치를 설명하시오', answer: '관절면의 완전 이탈. 심한 통증, 변형, 운동불능. 정복 시도는 현장에서 금기(혈관/신경 손상 위험). 발견 위치 그대로 고정, 이송.' },
      { id: 48, question: '절단손상의 처치를 설명하시오', answer: '지혈(직접압박, 지혈대), 쇼크 관리, 절단부위 관리: 식염수 거즈로 감싸고 비닐백에 넣어 얼음물에 보관(직접 닿지 않게). 신속 이송.' },
      { id: 49, question: '압좌손상(Crush injury)의 합병증을 설명하시오', answer: '압좌증후군: 횡문근융해→미오글로빈혈증→급성신부전, 고칼륨혈증(심정지). 처치: 수액(해제 전부터), 중탄산나트륨, 투석 고려.' },
      { id: 50, question: '척추고정 장비와 적용을 설명하시오', answer: '경추보호대(neck collar), 긴척추판(long backboard), KED. 적용: 중립위치, 머리-몸 일직선. Log roll로 이동. 척추판 위 시간 최소화(욕창 예방).' },
    ]
  }
];

export default function TraumaCarePage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([1]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('paramedic-1-trauma-care-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('paramedic-1-trauma-care-completed', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: number) => {
    setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]);
  };

  const toggleQuestion = (questionId: number) => {
    setCompletedQuestions(prev => prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]);
  };

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = completedQuestions.length;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-orange-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/paramedic-1" className="text-gray-600 hover:text-orange-600">응급구조사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">외상처치</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🩹</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">외상처치</h1>
              <p className="text-gray-600">응급구조사 1급 필기시험 대비</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">학습 진행률</span>
              <span className="text-sm font-medium text-orange-600">{completedCount}/{totalQuestions} 완료 ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📘</span>
                  <span className="font-medium text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-500">({topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length})</span>
                </div>
                <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map(q => (
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.includes(q.id) ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleQuestion(q.id)} className={`mt-1 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${completedQuestions.includes(q.id) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300'}`}>
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 bg-white p-3 rounded border">{q.answer}</p>
                          <div className="mt-2 flex gap-2">
                            <a href={`https://claude.ai/new?q=${encodeURIComponent(q.question)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200">Claude</a>
                            <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.question)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">ChatGPT</a>
                            <a href={`https://gemini.google.com/?q=${encodeURIComponent(q.question)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Gemini</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
