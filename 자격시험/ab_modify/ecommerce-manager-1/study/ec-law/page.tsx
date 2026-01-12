'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ECLawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'ec-law',
      name: '전자상거래법',
      icon: '⚖️',
      questions: [
        { id: 1, q: '전자상거래법의 목적과 적용 범위를 설명하시오.', a: '소비자 보호, 공정거래 확보, 통신판매/전자거래 적용' },
        { id: 2, q: '통신판매업 신고 의무를 설명하시오.', a: '공정위/지자체 신고, 미신고 시 과태료' },
        { id: 3, q: '통신판매업자의 정보 제공 의무를 설명하시오.', a: '상호, 대표자, 주소, 연락처, 사업자등록번호 표시' },
        { id: 4, q: '청약철회권(7일)을 설명하시오.', a: '배송 후 7일 내 철회, 단순변심 가능, 예외 규정' },
        { id: 5, q: '청약철회 예외 사유를 설명하시오.', a: '멸실/훼손, 가치 감소, 주문제작, 복제 가능 상품' },
        { id: 6, q: '환불 의무와 기한을 설명하시오.', a: '상품 회수 후 3영업일 내 환불, 지연 시 이자' },
        { id: 7, q: '교환/반품 비용 부담 원칙을 설명하시오.', a: '판매자 귀책: 판매자 부담, 단순변심: 소비자 부담' },
        { id: 8, q: '전자적 대금결제 시 증거 보존 의무를 설명하시오.', a: '거래 기록 5년 보존, 분쟁 시 입증 자료' },
        { id: 9, q: '허위/과장광고 금지를 설명하시오.', a: '사실과 다른 표시광고 금지, 시정명령/과징금' },
        { id: 10, q: '약관 규제법 적용을 설명하시오.', a: '불공정 약관 무효, 고객 불리 조항 제한' }
      ]
    },
    {
      id: 'privacy',
      name: '개인정보보호',
      icon: '🔐',
      questions: [
        { id: 1, q: '개인정보의 정의를 설명하시오.', a: '살아있는 개인 식별 정보, 이름/주민번호/연락처 등' },
        { id: 2, q: '개인정보 수집/이용 동의 요건을 설명하시오.', a: '목적/항목/보유기간 고지, 명시적 동의 획득' },
        { id: 3, q: '개인정보 제3자 제공 시 의무를 설명하시오.', a: '별도 동의, 제공받는 자/목적/항목 고지' },
        { id: 4, q: '개인정보처리방침 게시 의무를 설명하시오.', a: '처리 목적/항목/기간/파기/권리 등 공개' },
        { id: 5, q: '주민등록번호 수집 제한을 설명하시오.', a: '법령 근거 없이 수집 금지, 대체수단 사용' },
        { id: 6, q: '개인정보 파기 의무를 설명하시오.', a: '보유기간 경과 시 지체없이 파기, 복구 불가 조치' },
        { id: 7, q: '개인정보 유출 통지 의무를 설명하시오.', a: '72시간 내 정보주체/당국 통지' },
        { id: 8, q: '개인정보 보호책임자(CPO) 지정을 설명하시오.', a: '개인정보 보호 업무 총괄, 지정 및 공개 의무' },
        { id: 9, q: '정보주체의 권리를 설명하시오.', a: '열람/정정/삭제/처리정지 요구권' },
        { id: 10, q: '개인정보 안전조치 의무를 설명하시오.', a: '접근통제, 암호화, 접속기록 보관, 보안프로그램' }
      ]
    },
    {
      id: 'consumer',
      name: '소비자보호',
      icon: '🛡️',
      questions: [
        { id: 1, q: '소비자기본법의 목적을 설명하시오.', a: '소비자 권익 증진, 소비생활 향상' },
        { id: 2, q: '소비자의 8대 권리를 설명하시오.', a: '안전/정보/선택/의견반영/피해보상/교육/단체조직/환경권' },
        { id: 3, q: '품질보증기간을 설명하시오.', a: '제품별 보증기간, 무상수리/교환 기준' },
        { id: 4, q: '분쟁해결기준을 설명하시오.', a: '공정위 고시, 교환/환불/배상 기준' },
        { id: 5, q: '소비자분쟁조정위원회를 설명하시오.', a: '소비자-사업자 분쟁 조정, 소액분쟁 해결' },
        { id: 6, q: '집단분쟁조정을 설명하시오.', a: '50인 이상 동일 피해, 일괄 조정' },
        { id: 7, q: '단체소송 제도를 설명하시오.', a: '소비자단체 대표 소송, 금지청구' },
        { id: 8, q: '리콜 제도를 설명하시오.', a: '결함 제품 수거/교환/수리, 자진/강제 리콜' },
        { id: 9, q: '허위/과대광고 규제를 설명하시오.', a: '표시광고법 위반, 시정명령/과징금/형사처벌' },
        { id: 10, q: '방문판매법 주요 내용을 설명하시오.', a: '14일 철회권, 서면계약, 과대광고 금지' }
      ]
    },
    {
      id: 'signature',
      name: '전자서명/인증',
      icon: '✍️',
      questions: [
        { id: 1, q: '전자서명의 법적 효력을 설명하시오.', a: '서명/날인과 동일 효력, 법적 구속력' },
        { id: 2, q: '공동인증서의 특징을 설명하시오.', a: '구 공인인증서, 금융거래/공공서비스 이용' },
        { id: 3, q: '사설인증서의 특징을 설명하시오.', a: 'PASS, 카카오, 네이버 등, 간편 인증' },
        { id: 4, q: 'PKI(공개키기반구조)를 설명하시오.', a: '공개키/개인키 쌍, 암호화/전자서명' },
        { id: 5, q: '전자문서의 효력 요건을 설명하시오.', a: '위변조 방지, 무결성 확보, 본인확인' },
        { id: 6, q: 'eIDAS(EU 전자신원확인) 규정을 설명하시오.', a: '유럽 전자서명/인증 표준, 상호 인정' },
        { id: 7, q: '전자계약의 성립 시점을 설명하시오.', a: '청약+승낙, 도달주의, 전자적 의사표시' },
        { id: 8, q: '타임스탬프의 역할을 설명하시오.', a: '문서 생성 시점 증명, 위변조 방지' },
        { id: 9, q: '본인확인 방법을 설명하시오.', a: '휴대폰인증, 아이핀, 공인인증, 신분증 인증' },
        { id: 10, q: '생체인증의 유형을 설명하시오.', a: '지문, 얼굴, 홍채, 음성, FIDO 표준' }
      ]
    },
    {
      id: 'business',
      name: '통신판매업',
      icon: '📋',
      questions: [
        { id: 1, q: '통신판매업과 통신판매중개업의 차이를 설명하시오.', a: '직접판매 vs 플랫폼 제공, 책임 범위 상이' },
        { id: 2, q: '통신판매중개자의 의무를 설명하시오.', a: '판매자 신원정보 제공, 분쟁해결 협조' },
        { id: 3, q: '부가통신사업 신고를 설명하시오.', a: '온라인 서비스 제공 시 과기부 신고' },
        { id: 4, q: '정보통신망법 주요 내용을 설명하시오.', a: '개인정보보호, 스팸규제, 해킹금지' },
        { id: 5, q: '광고성 정보 전송 규제를 설명하시오.', a: '수신동의, 광고표시, 수신거부, 야간제한' },
        { id: 6, q: '영업비밀 보호를 설명하시오.', a: '부정경쟁방지법, 비밀관리, 경제적 가치' },
        { id: 7, q: '저작권법 적용을 설명하시오.', a: '콘텐츠 무단 사용 금지, 이미지/동영상/글' },
        { id: 8, q: '상표권 보호를 설명하시오.', a: '브랜드 무단 사용 금지, 위조품 판매 금지' },
        { id: 9, q: '도메인 분쟁 해결을 설명하시오.', a: 'UDRP, 인터넷주소분쟁조정위원회' },
        { id: 10, q: '해외직구 관련 법규를 설명하시오.', a: '관세법, 개인통관고유부호, 면세 한도' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('ec-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('ec-law-progress', JSON.stringify(updated));
  };

  const handleAIClick = (question: string, answer: string) => {
    const prompt = `전자상거래관리사 1급 전자상거래 관련법규 과목 문제입니다.

문제: ${question}
정답: ${answer}

다음 형식으로 상세히 설명해주세요:
1. 핵심 개념 정리
2. 상세 설명 (법조문 포함)
3. 실무 적용 사례
4. 시험 출제 포인트
5. 연습문제 3개 (정답 포함)`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/office/ecommerce-1" className="text-gray-600 hover:text-amber-600">전자상거래관리사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-amber-600 font-medium">전자상거래 관련법규</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">⚖️</span></div>
              <div>
                <h1 className="text-2xl font-bold">전자상거래 관련법규</h1>
                <p className="text-amber-200">전자상거래관리사 1급 필기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-amber-200 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map(topic => {
            const topicCompleted = topic.questions.filter(q => completedQuestions[`${topic.id}-${q.id}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedTopics(prev => ({ ...prev, [topic.id]: !prev[topic.id] }))}
                  className="w-full p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>
                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-3">
                    {topic.questions.map(q => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.q}</p>
                              <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.a}</p>
                              <button
                                onClick={() => handleAIClick(q.q, q.a)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
                              >
                                🤖 AI에게 질문하기
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/category/office/ecommerce-1/study/ec-system" className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition">← 전자상거래 시스템관리</Link>
          <Link href="/category/office/ecommerce-1/study/practical" className="px-6 py-3 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition">전자상거래 실무 →</Link>
        </div>
      </main>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div className="text-left"><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
