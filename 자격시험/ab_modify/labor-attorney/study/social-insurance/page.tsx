'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SocialInsuranceStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('labor-attorney-social-insurance-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('labor-attorney-social-insurance-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (idx: number) => {
    setOpenTopics(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const topics = [
    {
      title: '국민연금법',
      desc: '가입자, 급여종류, 연금액 산정',
      questions: [
        { id: 1, q: '국민연금의 가입대상과 당연가입자는?', a: '18세 이상 60세 미만 국민, 사업장·지역·임의가입자' },
        { id: 2, q: '국민연금 사업장가입자의 요건은?', a: '1인 이상 사업장 근로자, 공무원연금 등 타 연금 적용자 제외' },
        { id: 3, q: '국민연금 보험료의 부담비율은?', a: '사업장가입자는 사용자·근로자 각 4.5%, 지역가입자는 본인 전액' },
        { id: 4, q: '노령연금의 수급요건은?', a: '가입기간 10년 이상, 60세(점진적 65세) 이상' },
        { id: 5, q: '장애연금의 지급요건은?', a: '가입 중 질병·부상으로 장애 발생, 장애등급 1~3급' },
        { id: 6, q: '유족연금의 수급권자 순위는?', a: '배우자, 자녀, 부모, 손자녀, 조부모 순' },
        { id: 7, q: '반환일시금 지급 사유는?', a: '60세 도달 시 가입기간 10년 미만, 국적 상실, 사망 등' },
        { id: 8, q: '국민연금과 타 급여의 병급 조정은?', a: '산재보험 연금과 병급 시 조정, 공무원연금과는 중복 수급 제한' }
      ]
    },
    {
      title: '국민건강보험법',
      desc: '가입자, 보험료, 급여',
      questions: [
        { id: 9, q: '건강보험 가입자의 종류는?', a: '직장가입자(사업장 근로자, 공무원), 지역가입자(나머지)' },
        { id: 10, q: '건강보험 피부양자의 요건은?', a: '직장가입자의 배우자·직계존비속 등으로 소득·재산 요건 충족' },
        { id: 11, q: '건강보험료 산정기준은?', a: '직장: 보수월액 × 요율, 지역: 소득·재산·자동차 점수' },
        { id: 12, q: '건강보험 급여의 종류는?', a: '요양급여, 요양비, 건강검진, 장제비, 출산비용 등' },
        { id: 13, q: '요양급여의 범위와 제한은?', a: '진찰, 처치, 수술, 입원 등 / 업무상 재해, 미용 등 제외' },
        { id: 14, q: '본인일부부담금이란?', a: '요양급여 비용 중 수급자가 부담하는 비용, 급여비의 20~60%' },
        { id: 15, q: '건강보험심사평가원의 역할은?', a: '요양급여 적정성 평가, 진료비 심사, 의료기관 평가' },
        { id: 16, q: '국민건강보험공단의 업무는?', a: '자격관리, 보험료 부과·징수, 보험급여, 건강증진사업' }
      ]
    },
    {
      title: '고용보험법',
      desc: '피보험자, 실업급여, 육아휴직',
      questions: [
        { id: 17, q: '고용보험 적용대상 근로자는?', a: '모든 사업장 근로자, 일부 제외(공무원, 65세 이상 신규 등)' },
        { id: 18, q: '고용보험료의 부담구조는?', a: '실업급여: 노사 각 0.9%, 고용안정·직업능력개발: 사업주 부담' },
        { id: 19, q: '실업급여의 종류는?', a: '구직급여, 취업촉진수당(조기재취업수당, 직업능력개발수당 등)' },
        { id: 20, q: '구직급여 수급요건은?', a: '피보험기간 180일 이상, 비자발적 이직, 적극적 구직활동' },
        { id: 21, q: '구직급여 지급기간은?', a: '피보험기간·연령에 따라 120일~270일' },
        { id: 22, q: '구직급여 일액 산정방법은?', a: '기초일액(평균임금의 60%) × 소정급여일수' },
        { id: 23, q: '수급자격 제한 사유는?', a: '자발적 이직, 중대한 귀책사유 해고, 정당한 사유 없는 이직' },
        { id: 24, q: '육아휴직급여의 요건과 금액은?', a: '만 8세 이하 자녀, 피보험기간 180일 이상, 통상임금의 80%' },
        { id: 25, q: '출산전후휴가급여의 내용은?', a: '90일 휴가 중 60일분(대규모 기업) 또는 90일분(우선지원) 지원' },
        { id: 26, q: '고용안정사업의 종류는?', a: '고용창출, 고용조정지원, 고령자고용촉진, 장애인고용촉진 등' }
      ]
    },
    {
      title: '산업재해보상보험법',
      desc: '업무상 재해, 보험급여',
      questions: [
        { id: 27, q: '산재보험 적용대상 사업장은?', a: '원칙적으로 모든 사업장, 일부 농림어업 등 제외' },
        { id: 28, q: '업무상 재해의 인정기준은?', a: '업무수행성과 업무기인성 충족, 상당인과관계 존재' },
        { id: 29, q: '업무상 질병의 인정 범위는?', a: '근골격계 질환, 뇌심혈관계 질병, 직업성 암 등 법령에 규정' },
        { id: 30, q: '출퇴근 재해 인정요건은?', a: '통상적인 경로·방법으로 출퇴근 중 발생한 사고, 2018년 도입' },
        { id: 31, q: '요양급여의 내용은?', a: '치료비 전액 지급, 4일 이상 요양 시 지급, 부상 또는 질병 치료' },
        { id: 32, q: '휴업급여의 요건과 금액은?', a: '4일 이상 취업불능 시 평균임금의 70% 지급' },
        { id: 33, q: '장해급여의 종류와 내용은?', a: '장해연금(1~3급) 또는 장해일시금(4~14급), 장해등급별 차등' },
        { id: 34, q: '유족급여의 수급권자와 금액은?', a: '배우자·자녀·부모 등, 유족연금 또는 일시금 선택' },
        { id: 35, q: '상병보상연금의 지급요건은?', a: '2년 경과 후 폐질등급 1~3급, 휴업급여 대신 지급' },
        { id: 36, q: '산재보험의 특별가입제도란?', a: '특수형태근로종사자, 중소기업 사업주 등 임의가입' }
      ]
    },
    {
      title: '사회보험 통합 비교',
      desc: '4대 보험 종합 비교',
      questions: [
        { id: 37, q: '4대 사회보험의 적용 제외 대상을 비교하시오.', a: '각 보험별로 공무원, 65세 이상, 단시간 근로자 등 상이' },
        { id: 38, q: '4대 보험료율을 비교하시오.', a: '국민연금 9%, 건강 7.09%, 고용 1.8%+α, 산재 업종별' },
        { id: 39, q: '보험료 체납 시 제재를 비교하시오.', a: '연체금 부과, 급여 제한, 강제징수 등 보험별 상이' },
        { id: 40, q: '급여 청구권 소멸시효를 비교하시오.', a: '국민연금 5년, 건강 3년, 고용·산재 3년' },
        { id: 41, q: '심사청구·재심사청구 절차를 비교하시오.', a: '각 공단/심사위원회에 심사청구 → 재심사청구 → 행정소송' },
        { id: 42, q: '사업장 취득신고 기한을 비교하시오.', a: '국민연금·건강 14일, 고용·산재 다음 달 15일' },
        { id: 43, q: '두루누리 사회보험 지원제도란?', a: '10인 미만 사업장 저임금 근로자 국민연금·고용보험료 80% 지원' },
        { id: 44, q: '사회보험 일원화(통합징수)의 내용은?', a: '건강보험공단이 4대 보험료 통합 징수' }
      ]
    },
    {
      title: '기타 사회보장법',
      desc: '노인·장애인·기초생활',
      questions: [
        { id: 45, q: '기초연금의 수급요건과 금액은?', a: '65세 이상 소득하위 70%, 최대 월 32만원 내외' },
        { id: 46, q: '국민기초생활보장법의 급여 종류는?', a: '생계, 의료, 주거, 교육, 해산, 장제, 자활급여' },
        { id: 47, q: '장애인연금의 수급요건은?', a: '18세 이상 중증장애인, 소득·재산 기준 충족' },
        { id: 48, q: '노인장기요양보험의 대상과 급여는?', a: '65세 이상 또는 노인성 질환자, 시설·재가급여' },
        { id: 49, q: '근로장려금(EITC)의 내용은?', a: '저소득 근로자 가구에 근로소득 보전, 연 최대 330만원' },
        { id: 50, q: '사회보장기본법의 주요 내용은?', a: '사회보장 기본원칙, 국가·지자체 책임, 사회보장위원회' }
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
            <span className="text-amber-600 font-medium">사회보험법</span>
          </nav>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">🏥 사회보험법 핵심문제</h1>
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
                            setCurrentPrompt(`공인노무사 시험 사회보험법 문제입니다.

문제: ${q.q}

다음 순서로 상세히 설명해주세요:
1. 관련 법령 조문과 요건
2. 실무 적용 사례
3. 다른 보험과의 비교
4. 시험 출제 포인트
5. 최근 개정 동향`);
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
