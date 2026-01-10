'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 1,
    title: '약리학 기초',
    questions: [
      { id: 1, question: '약동학(Pharmacokinetics)의 개념을 설명하시오', answer: '약물이 체내에서 어떻게 처리되는지: 흡수(Absorption), 분포(Distribution), 대사(Metabolism), 배설(Excretion). ADME로 기억합니다.' },
      { id: 2, question: '약력학(Pharmacodynamics)의 개념을 설명하시오', answer: '약물이 신체에 미치는 효과. 수용체 결합(작용제, 길항제), 용량-반응 관계, 치료지수, 부작용을 포함합니다.' },
      { id: 3, question: '약물 투여 경로와 특성을 설명하시오', answer: '경구(PO): 느림, 편리. 정맥(IV): 가장 빠름, 정확. 근육(IM): 중간속도. 피하(SC): 느림. 흡입: 폐로 직접. 설하(SL): 빠른 흡수.' },
      { id: 4, question: '반감기(Half-life)의 의미를 설명하시오', answer: '혈중 약물 농도가 반으로 감소하는 데 걸리는 시간. 5-7 반감기 후 약물이 거의 제거됨. 투여 간격 결정에 중요합니다.' },
      { id: 5, question: '약물 상호작용의 유형을 설명하시오', answer: '길항(효과 감소), 상승(효과 증가), 가산(효과 합산). 흡수, 분포, 대사, 배설 단계에서 발생할 수 있습니다.' },
      { id: 6, question: '약물 계산 공식을 설명하시오', answer: '투여량 = (처방용량 × 희석량) / 약물농도. 점적속도(gtt/min) = (총량 × 점적계수) / 시간(분). IV rate = 용량 / 시간.' },
      { id: 7, question: '응급약물 투여 시 5 Rights를 설명하시오', answer: 'Right Patient(환자), Right Drug(약물), Right Dose(용량), Right Route(경로), Right Time(시간). 투여 전 반드시 확인합니다.' },
      { id: 8, question: '약물의 부작용과 이상반응을 구분하시오', answer: '부작용: 예측 가능한 원치 않는 효과(약리작용 연장). 이상반응: 예측 불가능한 반응(알레르기, 특이체질). 심각도와 대처가 다릅니다.' },
      { id: 9, question: '약물 알레르기 반응의 분류를 설명하시오', answer: 'Type I(즉시형): 아나필락시스. Type II(세포독성): 용혈. Type III(면역복합체): 혈청병. Type IV(지연형): 접촉피부염.' },
      { id: 10, question: '금기(Contraindication)의 의미를 설명하시오', answer: '절대적 금기: 어떤 상황에서도 사용하면 안 됨. 상대적 금기: 위험이 이익을 초과하면 사용하지 않음. 처방 전 확인이 필수입니다.' },
    ]
  },
  {
    id: 2,
    title: '심혈관계 약물',
    questions: [
      { id: 11, question: '에피네프린(Epinephrine)의 작용과 적응증을 설명하시오', answer: '알파(혈관수축), 베타1(심박수·수축력↑), 베타2(기관지확장). 적응증: 심정지, 아나필락시스, 중증 천식. 용량: 심정지 1mg IV, 아나필락시스 0.3-0.5mg IM.' },
      { id: 12, question: '아트로핀(Atropine)의 작용과 적응증을 설명하시오', answer: '항콜린제로 부교감신경 차단. 심박수 증가, 분비 감소. 적응증: 서맥, 유기인 중독. 용량: 서맥 0.5mg IV(최대 3mg), 유기인 2mg IV 반복.' },
      { id: 13, question: '아미오다론(Amiodarone)의 작용과 적응증을 설명하시오', answer: 'Class III 항부정맥제. 적응증: VF/pVT(심정지), 불안정 VT. 용량: 심정지 300mg IV bolus(추가 150mg), 안정 시 150mg/10분.' },
      { id: 14, question: '리도카인(Lidocaine)의 작용과 적응증을 설명하시오', answer: 'Class Ib 항부정맥제, 국소마취제. 적응증: VF/pVT(아미오다론 대안), 심실성 부정맥. 용량: 1-1.5mg/kg IV bolus, 유지 1-4mg/분.' },
      { id: 15, question: '아데노신(Adenosine)의 작용과 적응증을 설명하시오', answer: 'AV 전도 일시 차단. 적응증: SVT(PSVT). 용량: 6mg 급속 IV(1-3초), 효과 없으면 12mg(2회까지). 반감기 10초로 급속 투여 필수.' },
      { id: 16, question: '도파민(Dopamine)의 용량별 작용을 설명하시오', answer: '저용량(1-5mcg/kg/min): 신혈관확장(도파민 수용체). 중용량(5-10): 심박수·수축력↑(베타). 고용량(10-20): 혈관수축(알파).' },
      { id: 17, question: '노르에피네프린(Norepinephrine)의 작용과 적응증을 설명하시오', answer: '강력한 알파 작용(혈관수축), 약한 베타1 작용. 적응증: 패혈성 쇼크(1차 선택), 저혈압. 용량: 0.1-0.5mcg/kg/분으로 시작, 적정.' },
      { id: 18, question: '니트로글리세린(Nitroglycerin)의 작용과 적응증을 설명하시오', answer: '정맥확장(전부하↓) > 동맥확장. 적응증: 협심증, 급성관상동맥증후군, 폐부종. 용량: SL 0.4mg, IV 5-200mcg/분. 금기: 저혈압, PDE-5억제제 사용.' },
      { id: 19, question: '아스피린(Aspirin)의 작용과 적응증을 설명하시오', answer: 'COX 억제로 TXA2 생성 차단, 혈소판 응집 억제. 적응증: ACS, 혈전예방. 용량: ACS 160-325mg 씹어서 복용. 금기: 출혈, 아스피린 알레르기.' },
      { id: 20, question: '헤파린의 작용과 모니터링을 설명하시오', answer: '안티트롬빈 III 활성화로 응고 억제. 적응증: ACS, PE, DVT. 모니터링: aPTT(1.5-2.5배). 해독제: 프로타민. 저분자량 헤파린(LMWH)은 모니터링 불필요.' },
    ]
  },
  {
    id: 3,
    title: '호흡기계 약물',
    questions: [
      { id: 21, question: '살부타몰(Albuterol)의 작용과 용량을 설명하시오', answer: '속효성 베타2 작용제(SABA). 기관지평활근 이완. 적응증: 천식, COPD 급성악화. 용량: 네뷸라이저 2.5-5mg, MDI 2-4 puffs. 부작용: 빈맥, 진전.' },
      { id: 22, question: '이프라트로피움(Ipratropium)의 작용과 용량을 설명하시오', answer: '항콜린제. 기관지확장, 분비 감소. 적응증: COPD, 중증 천식(베타작용제와 병용). 용량: 네뷸라이저 0.5mg. 살부타몰과 병용 시 상승효과.' },
      { id: 23, question: '스테로이드(코르티코스테로이드)의 호흡기 적응증을 설명하시오', answer: '항염증 작용. 적응증: 천식, COPD 악화, 크룹, 아나필락시스. 용량: 메틸프레드니솔론 125mg IV, 덱사메타손 크룹 0.6mg/kg. 효과 발현 4-6시간.' },
      { id: 24, question: '마그네슘 황산염의 호흡기 적응증을 설명하시오', answer: '기관지확장(평활근 이완). 적응증: 중증 천식(베타작용제 불응). 용량: 2g IV/15-20분. 부작용: 저혈압, 서맥. 신기능 저하 시 주의.' },
      { id: 25, question: '산소요법의 종류와 농도를 설명하시오', answer: '비캐뉼라: 1-6L(24-44%). 단순마스크: 6-10L(35-60%). 부분재호흡: 6-10L(35-60%). 비재호흡: 10-15L(60-100%). 벤투리: 정확한 농도 조절.' },
      { id: 26, question: '날록손(Naloxone)의 작용과 적응증을 설명하시오', answer: '아편유사제 길항제(오피오이드 수용체 차단). 적응증: 아편 과량(호흡억제 동반). 용량: 0.4-2mg IV/IM/IN, 반복 가능. 반감기가 짧아 재투여 필요.' },
      { id: 27, question: '플루마제닐(Flumazenil)의 작용과 주의점을 설명하시오', answer: '벤조디아제핀 길항제. 적응증: 벤조디아제핀 과량(진단/치료). 용량: 0.2mg IV, 반복(최대 1mg). 주의: 경련 유발 가능(만성 사용자, 삼환계 항우울제 병용).' },
      { id: 28, question: '레시틴(Racemic Epinephrine)의 적응증을 설명하시오', answer: '점막 혈관수축으로 부종 감소. 적응증: 크룹(후두부종), 기관삽관 후 부종. 용량: 2.25% 0.25-0.5mL 네뷸라이저. 반동 부종 가능.' },
      { id: 29, question: '기관지 확장제의 분류를 설명하시오', answer: 'SABA(속효성 베타): 살부타몰. LABA(지속성 베타): 살메테롤. SAMA(속효성 항콜린): 이프라트로피움. LAMA(지속성 항콜린): 티오트로피움.' },
      { id: 30, question: '흡입 마취제와 진정제의 특성을 비교하시오', answer: '흡입마취: 아산화질소(N2O) - 진통, 진정. 케타민: 해리성 마취, 기관지확장. 프로포폴: 빠른 진정/회복, 저혈압. 에토미데이트: 혈역학 안정.' },
    ]
  },
  {
    id: 4,
    title: '진통제와 진정제',
    questions: [
      { id: 31, question: '모르핀(Morphine)의 작용과 적응증을 설명하시오', answer: '오피오이드 작용제. 진통, 불안감소, 전부하 감소. 적응증: 급성 통증, 폐부종, ACS. 용량: 2-4mg IV. 부작용: 호흡억제, 저혈압, 오심.' },
      { id: 32, question: '펜타닐(Fentanyl)의 특성과 용량을 설명하시오', answer: '합성 오피오이드. 모르핀보다 100배 강력, 빠른 작용(1-2분), 짧은 지속. 적응증: 급성 통증, 진정. 용량: 25-100mcg IV. 흉벽 강직 가능.' },
      { id: 33, question: '케타민(Ketamine)의 작용과 적응증을 설명하시오', answer: 'NMDA 길항제. 해리성 마취, 진통, 기관지확장. 적응증: 소아 진정, 중증 천식, 기관삽관. 용량: 1-2mg/kg IV. 부작용: 분비증가, 악몽.' },
      { id: 34, question: '미다졸람(Midazolam)의 작용과 용량을 설명하시오', answer: '벤조디아제핀. 진정, 항경련, 기억상실. 적응증: 진정, 경련. 용량: 진정 1-2.5mg IV, 경련 5-10mg IM/IN. 호흡억제 주의.' },
      { id: 35, question: '디아제팜(Diazepam)의 작용과 적응증을 설명하시오', answer: '벤조디아제핀. 항경련, 진정, 근이완. 적응증: 경련지속상태, 알코올금단. 용량: 5-10mg IV. IM 흡수 불규칙. 호흡억제 주의.' },
      { id: 36, question: '프로포폴(Propofol)의 특성을 설명하시오', answer: 'GABA 작용. 빠른 진정(30초)과 회복. 적응증: 기관삽관, 진정. 용량: 유도 1-2.5mg/kg IV. 부작용: 저혈압, 주입통증, 프로포폴 주입 증후군.' },
      { id: 37, question: '에토미데이트(Etomidate)의 특성을 설명하시오', answer: '비바비튜레이트 진정제. 혈역학적으로 안정. 적응증: 기관삽관(혈역학 불안정 시). 용량: 0.3mg/kg IV. 부작용: 근간대경련, 부신억제.' },
      { id: 38, question: '석시닐콜린(Succinylcholine)의 작용을 설명하시오', answer: '탈분극성 근이완제. 빠른 작용(30-60초), 짧은 지속(5-10분). 적응증: 신속기관삽관. 용량: 1-1.5mg/kg IV. 금기: 고칼륨혈증, 화상, 악성고열증.' },
      { id: 39, question: '로쿠로니움(Rocuronium)의 작용을 설명하시오', answer: '비탈분극성 근이완제. 작용시간 30-60분. 적응증: 기관삽관, 수술. 용량: 0.6-1.2mg/kg IV. 해독제: 수가마덱스. 석시닐콜린 대안.' },
      { id: 40, question: '통증 평가 도구를 설명하시오', answer: 'NRS(숫자척도): 0-10점. VAS(시각상사척도). Wong-Baker 얼굴 척도(소아). 의식저하 환자: 생리적 지표(활력징후, 표정).' },
    ]
  },
  {
    id: 5,
    title: '기타 응급약물',
    questions: [
      { id: 41, question: '50% 포도당(D50W)의 적응증과 용량을 설명하시오', answer: '적응증: 저혈당(혈당 <70mg/dL). 용량: 25g(50mL) IV push. 혈당 확인 후 투여. 혈관 손상 주의. 의식 있으면 경구 포도당 우선.' },
      { id: 42, question: '글루카곤(Glucagon)의 적응증과 용량을 설명하시오', answer: '간 글리코겐 분해 촉진. 적응증: 저혈당(IV 확보 불가), 베타차단제 과량. 용량: 저혈당 1mg IM/SC, 베타차단제 3-10mg IV.' },
      { id: 43, question: '탄산수소나트륨(Sodium Bicarbonate)의 적응증을 설명하시오', answer: '대사성 산증 교정. 적응증: 고칼륨혈증, 삼환계 항우울제 과량, 장시간 심정지. 용량: 1mEq/kg IV. 과용 시 알칼리증, 저칼륨증.' },
      { id: 44, question: '칼슘제제의 적응증을 설명하시오', answer: '적응증: 고칼륨혈증(심장보호), 저칼슘혈증, 칼슘채널차단제 과량, 고마그네슘혈증. 염화칼슘 10% 10mL IV. 글루콘산칼슘은 말초 가능.' },
      { id: 45, question: '황산마그네슘의 적응증을 설명하시오', answer: '적응증: Torsades de pointes, 자간전증/자간증, 중증 천식, 저마그네슘혈증. 용량: 부정맥 1-2g IV/5-20분. 부작용: 저혈압, 호흡억제.' },
      { id: 46, question: '디곡신(Digoxin)의 작용과 독성을 설명하시오', answer: 'Na-K ATPase 억제→심근 수축력↑, AV 전도↓. 적응증: 심부전, 심방세동. 독성: 오심, 시각장애, 부정맥. 해독제: 디곡신 항체(Fab).' },
      { id: 47, question: '활성탄(Activated Charcoal)의 적응증과 금기를 설명하시오', answer: '독소 흡착. 적응증: 경구 중독(1시간 이내). 금기: 의식저하(흡인위험), 부식제, 금속, 알코올. 용량: 성인 50g, 소아 1g/kg PO.' },
      { id: 48, question: '옥시토신(Oxytocin)의 적응증을 설명하시오', answer: '자궁수축 촉진. 적응증: 산후출혈, 분만유도. 용량: 산후출혈 10-40 units IV infusion. 부작용: 저혈압, 수분저류.' },
      { id: 49, question: '테르부탈린(Terbutaline)의 산과적 적응증을 설명하시오', answer: '베타2 작용제. 자궁이완. 적응증: 조기진통 억제(단기), 자궁과수축. 용량: 0.25mg SC. 부작용: 빈맥, 저칼륨혈증.' },
      { id: 50, question: '응급약물 보관과 관리 원칙을 설명하시오', answer: '유효기간 확인, 적절한 온도 보관, 차광(광분해 약물), 정기 점검, 선입선출. 마약류는 별도 관리. 투여 후 기록 필수.' },
    ]
  }
];

export default function PharmacologyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([1]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('paramedic-1-pharmacology-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('paramedic-1-pharmacology-completed', JSON.stringify(completedQuestions));
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
            <Link href="/" className="text-gray-600 hover:text-purple-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-purple-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/paramedic-1" className="text-gray-600 hover:text-purple-600">응급구조사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-purple-600 font-medium">응급약리학</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">💊</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">응급약리학</h1>
              <p className="text-gray-600">응급구조사 1급 필기시험 대비</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">학습 진행률</span>
              <span className="text-sm font-medium text-purple-600">{completedCount}/{totalQuestions} 완료 ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
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
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.includes(q.id) ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleQuestion(q.id)} className={`mt-1 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${completedQuestions.includes(q.id) ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-300'}`}>
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
