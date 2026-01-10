'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LaborEconomicsStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('labor-attorney-labor-economics-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('labor-attorney-labor-economics-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (idx: number) => {
    setOpenTopics(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const topics = [
    {
      title: '노동시장 기초',
      desc: '수요와 공급, 균형임금',
      questions: [
        { id: 1, q: '노동의 수요곡선이 우하향하는 이유는?', a: '한계생산체감의 법칙, 임금 상승 시 고용량 감소' },
        { id: 2, q: '노동의 공급곡선이 후방굴절되는 이유는?', a: '임금 상승 시 소득효과가 대체효과보다 커지면 노동공급 감소' },
        { id: 3, q: '노동시장 균형의 조건은?', a: '노동수요량 = 노동공급량인 점에서 균형임금과 고용량 결정' },
        { id: 4, q: '한계생산가치(VMP)란?', a: 'VMP = 한계생산물 × 상품가격, 노동수요의 기준' },
        { id: 5, q: '한계비용가치(MFC)란?', a: '노동 1단위 추가 고용의 총비용 증가분' },
        { id: 6, q: '완전경쟁 노동시장의 특징은?', a: '다수 기업·근로자, 동질적 노동, 완전정보, 자유로운 진출입' },
        { id: 7, q: '수요독점 노동시장의 특징은?', a: '고용자 1인, 임금결정력 보유, 착취 발생 가능' },
        { id: 8, q: '노동조합의 임금효과를 설명하시오.', a: '공급 제한, 수요 증대, 단체교섭으로 임금 상승' }
      ]
    },
    {
      title: '임금결정 이론',
      desc: '임금격차, 보상적 임금격차',
      questions: [
        { id: 9, q: '임금격차의 발생원인은?', a: '인적자본, 직업특성, 차별, 노동시장 분단' },
        { id: 10, q: '보상적 임금격차란?', a: '직업의 비금전적 특성(위험, 불쾌함)에 대한 보상 차이' },
        { id: 11, q: '인적자본이론의 핵심은?', a: '교육·훈련 투자가 생산성과 임금을 높임, Becker' },
        { id: 12, q: '선별가설(신호이론)의 내용은?', a: '교육은 생산성보다 능력을 신호하는 수단, Spence' },
        { id: 13, q: '효율임금이론의 논리는?', a: '시장임금보다 높은 임금이 생산성·충성도 향상' },
        { id: 14, q: '이중노동시장이론의 주장은?', a: '1차(고임금·안정) vs 2차(저임금·불안정) 분단' },
        { id: 15, q: '내부노동시장의 특징은?', a: '기업 내 승진·임금체계, 외부시장과 분리, 장기고용' },
        { id: 16, q: '최저임금제의 경제적 효과는?', a: '고용감소 vs 고용증가 논쟁, 소득분배 개선 효과' }
      ]
    },
    {
      title: '실업',
      desc: '실업의 유형, 실업률, 정책',
      questions: [
        { id: 17, q: '실업률의 정의와 계산은?', a: '실업자/(취업자+실업자) × 100, 경제활동인구 기준' },
        { id: 18, q: '마찰적 실업이란?', a: '일시적 직장 이동 과정의 실업, 정보 불완전' },
        { id: 19, q: '구조적 실업이란?', a: '기술변화·산업구조 변동으로 기술 불일치 발생' },
        { id: 20, q: '경기적 실업이란?', a: '경기침체로 총수요 부족에 따른 실업' },
        { id: 21, q: '자연실업률의 개념은?', a: '마찰적·구조적 실업만 존재하는 완전고용 상태의 실업률' },
        { id: 22, q: '필립스 곡선의 의미는?', a: '실업률과 인플레이션의 단기 역의 관계' },
        { id: 23, q: '이력현상(히스테리시스)이란?', a: '일시적 충격이 영구적 실업률 상승 초래' },
        { id: 24, q: '적극적 노동시장정책(ALMP)의 종류는?', a: '직업훈련, 취업알선, 고용보조금, 창업지원' }
      ]
    },
    {
      title: '노동공급',
      desc: '여가-소득 선택, 노동참가',
      questions: [
        { id: 25, q: '소득효과와 대체효과를 비교하시오.', a: '소득↑→노동↓(소득효과) vs 임금↑→여가기회비용↑→노동↑(대체효과)' },
        { id: 26, q: '여가-소득 모형의 균형조건은?', a: 'MRS(여가,소득) = 임금률 / 무차별곡선과 예산선 접점' },
        { id: 27, q: '노동력 참가율에 영향을 미치는 요인은?', a: '임금, 비근로소득, 인구구조, 사회제도, 문화' },
        { id: 28, q: '추가근로자 효과란?', a: '가구주 실업 시 다른 가족구성원 노동시장 진입' },
        { id: 29, q: '실망실업자 효과란?', a: '불황기 구직 포기로 경활인구 이탈, 실업률 과소 추정' },
        { id: 30, q: '여성 노동참가율 증가 요인은?', a: '교육, 출산율 감소, 서비스업 확대, 사회인식 변화' },
        { id: 31, q: '고령자 노동참가 특성은?', a: '건강, 연금, 퇴직규정, 노동수요 영향' },
        { id: 32, q: '근로시간 결정 요인은?', a: '법정근로시간, 단체협약, 초과근로 선호, 생산성' }
      ]
    },
    {
      title: '노동수요',
      desc: '기업의 고용결정, 노동수요 탄력성',
      questions: [
        { id: 33, q: '단기 노동수요 결정 원리는?', a: 'VMPL = W (한계생산가치 = 임금)에서 고용량 결정' },
        { id: 34, q: '장기 노동수요의 특징은?', a: '자본 조정 가능, 대체효과+규모효과' },
        { id: 35, q: '마샬의 파생수요 법칙 4가지는?', a: '최종재 수요탄력성↑, 대체가능성↑, 비용비중↑, 타요소공급탄력성↑ → 노동수요탄력성↑' },
        { id: 36, q: '노동수요의 임금탄력성이란?', a: '임금 1% 변화에 대한 노동수요량 % 변화' },
        { id: 37, q: '규모효과와 대체효과를 설명하시오.', a: '규모: 비용↑→생산↓→노동↓ / 대체: 상대가격 변화→요소대체' },
        { id: 38, q: '고정비용이 고용에 미치는 영향은?', a: '채용·해고비용으로 고용조정 지연, 노동시간 조정 선호' },
        { id: 39, q: '파견근로, 기간제의 경제적 의미는?', a: '고정비용 회피, 수량적 유연성 확보' },
        { id: 40, q: '기술변화가 노동수요에 미치는 영향은?', a: '숙련편향적 기술변화로 고숙련 수요↑, 저숙련 수요↓' }
      ]
    },
    {
      title: '노사관계 경제학',
      desc: '노조, 단체교섭, 파업',
      questions: [
        { id: 41, q: '노동조합의 경제적 목표는?', a: '임금 극대화, 고용 극대화, 임금총액 극대화 등 다양' },
        { id: 42, q: '노조의 임금프리미엄이란?', a: '노조 가입 근로자가 비가입자보다 받는 추가 임금' },
        { id: 43, q: '노조 양면성(two faces)이란?', a: '독점적 얼굴(비효율) vs 집단적 목소리(효율 제고)' },
        { id: 44, q: '효율적 계약곡선(contract curve)이란?', a: '노사가 임금과 고용을 동시 협상할 때 파레토 최적 조합' },
        { id: 45, q: '노조-비노조 부문 모형의 함의는?', a: '노조부문 임금↑→비노조부문 노동공급↑→임금↓' },
        { id: 46, q: '파업의 경제적 비용은?', a: '생산손실, 임금손실, 거래관계 손상, 사회적 비용' },
        { id: 47, q: 'Hicks의 파업이론을 설명하시오.', a: '양보곡선과 저항곡선의 교차점에서 협상 타결' },
        { id: 48, q: '비대칭정보 파업이론이란?', a: '기업 수익성 정보 비대칭으로 파업 발생, 신호역할' },
        { id: 49, q: '노사협의회의 경제적 기능은?', a: '정보공유, 협력적 노사관계, 생산성 향상' },
        { id: 50, q: '노동시장 유연성과 안정성의 관계는?', a: '유연안정성(flexicurity) 모델: 해고 용이+실업보장+훈련' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm mb-2">
            <Link href="/category/legal/labor-attorney" className="text-gray-500 hover:text-gray-700">공인노무사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-amber-600 font-medium">노동경제학</span>
          </nav>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">📊 노동경제학 핵심문제</h1>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-sm text-gray-600">{completedQuestions.length}/{totalQuestions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {topics.map((topic, tidx) => (
          <div key={tidx} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <button
              onClick={() => toggleTopic(tidx)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold">
                  {tidx + 1}
                </span>
                <div className="text-left">
                  <h2 className="font-bold">{topic.title}</h2>
                  <p className="text-sm text-gray-500">{topic.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length}
                </span>
                <span className={`transform transition ${openTopics.includes(tidx) ? 'rotate-180' : ''}`}>▼</span>
              </div>
            </button>

            {openTopics.includes(tidx) && (
              <div className="border-t divide-y">
                {topic.questions.map((q) => (
                  <div key={q.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleQuestion(q.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                          completedQuestions.includes(q.id) ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-300'
                        }`}
                      >
                        {completedQuestions.includes(q.id) && '✓'}
                      </button>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-2">{q.id}. {q.q}</p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{q.a}</p>
                        <button
                          onClick={() => {
                            setCurrentPrompt(`공인노무사 시험 노동경제학 문제입니다.

문제: ${q.q}

다음 순서로 상세히 설명해주세요:
1. 핵심 개념과 정의
2. 이론적 배경과 모형
3. 그래프를 통한 분석
4. 정책적 시사점
5. 시험 출제 포인트`);
                            setShowAIModal(true);
                          }}
                          className="mt-2 px-3 py-1 bg-amber-100 text-amber-600 rounded-lg text-sm hover:bg-amber-200 transition"
                        >
                          🤖 AI 해설
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인노무사 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
