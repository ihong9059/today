'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  answer: string;
  prompt: string;
}

interface Topic {
  title: string;
  questions: Question[];
}

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '보건교육 시연 기획',
      questions: [
        { id: 1, question: '교육시연 주제 선정 시 고려사항은?', answer: '대상자 특성, 시간 제약, 학습목표 달성 가능성, 시연 환경을 종합적으로 고려한다.', prompt: '보건교육사 1급 실기 준비: 교육시연 주제 선정 시 고려사항을 상세히 설명해주세요.' },
        { id: 2, question: '10분 교육시연의 구성 방법은?', answer: '도입(2분)-전개(6분)-정리(2분)로 구성하며, 핵심 메시지에 집중한다.', prompt: '보건교육사 1급 실기 준비: 10분 교육시연의 효과적인 구성 방법을 설명해주세요.' },
        { id: 3, question: '교육시연 학습목표 작성법은?', answer: 'ABCD 원칙에 따라 대상자가 교육 후 수행할 수 있는 행동을 구체적으로 진술한다.', prompt: '보건교육사 1급 실기 준비: 교육시연 학습목표 작성법을 예시와 함께 설명해주세요.' },
        { id: 4, question: '도입부에서 주의집중 기법은?', answer: '질문, 사례, 통계, 이미지, 동영상 등을 활용하여 학습 동기를 유발한다.', prompt: '보건교육사 1급 실기 준비: 도입부에서 효과적인 주의집중 기법을 설명해주세요.' },
        { id: 5, question: '교육시연 대본 작성 요령은?', answer: '핵심 키워드 중심, 자연스러운 구어체, 시간 배분 표시, 매체 활용 시점을 포함한다.', prompt: '보건교육사 1급 실기 준비: 교육시연 대본 작성 요령을 설명해주세요.' },
      ],
    },
    {
      title: '교육방법과 매체 활용',
      questions: [
        { id: 6, question: '교육시연에 적합한 교육방법은?', answer: '강의법, 시범, 질의응답, 역할극 등을 목표와 시간에 맞게 선택한다.', prompt: '보건교육사 1급 실기 준비: 교육시연에 적합한 교육방법과 선택 기준을 설명해주세요.' },
        { id: 7, question: 'PPT 슬라이드 제작 원칙은?', answer: '6x6 원칙(줄당 6단어, 슬라이드당 6줄), 시각적 일관성, 핵심 메시지 강조가 중요하다.', prompt: '보건교육사 1급 실기 준비: 효과적인 PPT 슬라이드 제작 원칙을 설명해주세요.' },
        { id: 8, question: '시각자료 활용 시 주의사항은?', answer: '글씨 크기, 색상 대비, 정보량, 저작권을 고려하고 설명과 연계한다.', prompt: '보건교육사 1급 실기 준비: 시각자료 활용 시 주의사항을 설명해주세요.' },
        { id: 9, question: '시범(Demonstration) 진행 방법은?', answer: '전체 시범→단계별 설명→학습자 실습→피드백의 순서로 진행한다.', prompt: '보건교육사 1급 실기 준비: 시범 진행 방법을 단계별로 설명해주세요.' },
        { id: 10, question: '교육매체 선정 기준 ASSURE는?', answer: 'Analyze, State, Select, Utilize, Require, Evaluate의 체계적 접근이다.', prompt: '보건교육사 1급 실기 준비: ASSURE 모형에 따른 교육매체 선정을 설명해주세요.' },
      ],
    },
    {
      title: '발표 기술과 전달력',
      questions: [
        { id: 11, question: '효과적인 음성 사용 기법은?', answer: '적절한 속도, 크기, 억양, 강조, 휴지(pause)를 활용하여 전달력을 높인다.', prompt: '보건교육사 1급 실기 준비: 효과적인 음성 사용 기법을 설명해주세요.' },
        { id: 12, question: '비언어적 커뮤니케이션 활용법은?', answer: '눈맞춤, 제스처, 표정, 자세, 공간 활용으로 메시지를 강화한다.', prompt: '보건교육사 1급 실기 준비: 비언어적 커뮤니케이션 활용법을 설명해주세요.' },
        { id: 13, question: '발표 불안 극복 방법은?', answer: '충분한 연습, 긍정적 자기암시, 호흡법, 사전 환경 점검으로 불안을 관리한다.', prompt: '보건교육사 1급 실기 준비: 발표 불안 극복 방법을 설명해주세요.' },
        { id: 14, question: '청중과의 상호작용 기법은?', answer: '질문, 손들기, 짧은 토의, 반응 확인 등으로 참여를 유도한다.', prompt: '보건교육사 1급 실기 준비: 청중과의 상호작용 기법을 설명해주세요.' },
        { id: 15, question: '시간 관리와 템포 조절법은?', answer: '핵심 내용 우선, 시계 확인, 유연한 조정으로 시간 내 완료한다.', prompt: '보건교육사 1급 실기 준비: 교육시연 시간 관리와 템포 조절법을 설명해주세요.' },
      ],
    },
    {
      title: '학습자 참여 유도',
      questions: [
        { id: 16, question: '효과적인 질문 기법은?', answer: '개방형/폐쇄형, 유도질문, 확인질문을 적절히 활용하여 사고를 촉진한다.', prompt: '보건교육사 1급 실기 준비: 효과적인 질문 기법을 설명해주세요.' },
        { id: 17, question: '학습자 질문에 대한 응답 방법은?', answer: '경청, 명확화, 칭찬, 재질문, 전체 공유 등의 기법을 활용한다.', prompt: '보건교육사 1급 실기 준비: 학습자 질문에 대한 효과적인 응답 방법을 설명해주세요.' },
        { id: 18, question: '소그룹 활동 진행 방법은?', answer: '명확한 지시, 시간 안내, 순회 지도, 결과 공유로 효과적으로 운영한다.', prompt: '보건교육사 1급 실기 준비: 소그룹 활동 진행 방법을 설명해주세요.' },
        { id: 19, question: '동기유발 전략의 유형은?', answer: 'ARCS 모형(주의, 관련성, 자신감, 만족감)을 적용하여 학습동기를 높인다.', prompt: '보건교육사 1급 실기 준비: ARCS 모형에 따른 동기유발 전략을 설명해주세요.' },
        { id: 20, question: '피드백 제공 방법과 원칙은?', answer: '즉각적, 구체적, 긍정적, 건설적 피드백으로 학습을 강화한다.', prompt: '보건교육사 1급 실기 준비: 효과적인 피드백 제공 방법과 원칙을 설명해주세요.' },
      ],
    },
    {
      title: '교육시연 평가와 성찰',
      questions: [
        { id: 21, question: '교육시연 평가 기준은?', answer: '학습목표 달성, 교육내용, 교육방법, 매체활용, 발표력, 시간관리 등이 평가된다.', prompt: '보건교육사 1급 실기 준비: 교육시연 평가 기준을 상세히 설명해주세요.' },
        { id: 22, question: '자기평가와 성찰 방법은?', answer: '녹화 분석, 체크리스트, 성찰일지 작성으로 강점과 개선점을 파악한다.', prompt: '보건교육사 1급 실기 준비: 자기평가와 성찰 방법을 설명해주세요.' },
        { id: 23, question: '동료 피드백 활용 방법은?', answer: '구조화된 피드백 양식을 활용하여 객관적인 관점을 얻고 개선한다.', prompt: '보건교육사 1급 실기 준비: 동료 피드백 활용 방법을 설명해주세요.' },
        { id: 24, question: '교육시연 연습 전략은?', answer: '거울 연습, 녹화 분석, 모의 시연, 피드백 반영의 순환적 연습이 효과적이다.', prompt: '보건교육사 1급 실기 준비: 교육시연 연습 전략을 설명해주세요.' },
        { id: 25, question: '돌발상황 대처 방법은?', answer: '기술적 문제, 시간 초과, 어려운 질문 등에 대한 대비책을 미리 준비한다.', prompt: '보건교육사 1급 실기 준비: 교육시연 중 돌발상황 대처 방법을 설명해주세요.' },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-1-practical-progress');
    if (saved) {
      setCompletedQuestions(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleQuestion = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedQuestions(newCompleted);
    localStorage.setItem('health-educator-1-practical-progress', JSON.stringify([...newCompleted]));
  };

  const toggleTopic = (index: number) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTopics(newExpanded);
  };

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = completedQuestions.size;
  const progressPercentage = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-purple-600">홈</Link>
            <span>›</span>
            <Link href="/category/medical" className="hover:text-purple-600">의료·보건</Link>
            <span>›</span>
            <Link href="/category/medical/health-educator-1" className="hover:text-purple-600">보건교육사 1급</Link>
            <span>›</span>
            <span className="text-purple-600 font-medium">실기</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">🎤 실기시험 학습 가이드</h1>
          <p className="text-sm text-gray-500 mt-1">보건교육사 1급 실기시험 (교육시연)</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">학습 진도</span>
            <span className="text-sm text-gray-500">{completedCount} / {totalQuestions} 완료</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="text-right mt-1 text-sm text-purple-600 font-medium">{progressPercentage}%</div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-purple-700 mb-2">🎯 실기시험 안내</h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• <strong>시험형식:</strong> 보건교육 시연 (발표형)</li>
            <li>• <strong>시험시간:</strong> 준비 10분 + 시연 10분</li>
            <li>• <strong>평가항목:</strong> 교육기획, 교육내용, 교수방법, 매체활용, 발표력</li>
            <li>• <strong>합격기준:</strong> 60점 이상</li>
          </ul>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicCompleted = topic.questions.filter(q => completedQuestions.has(q.id)).length;
            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{expandedTopics.has(topicIndex) ? '📂' : '📁'}</span>
                    <span className="font-medium text-gray-800">{topic.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length}</span>
                    <span className="text-gray-400">{expandedTopics.has(topicIndex) ? '▲' : '▼'}</span>
                  </div>
                </button>
                {expandedTopics.has(topicIndex) && (
                  <div className="p-4 space-y-3">
                    {topic.questions.map((q) => (
                      <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.has(q.id) ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${completedQuestions.has(q.id) ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-300 hover:border-purple-500'}`}
                          >
                            {completedQuestions.has(q.id) && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                            <p className="text-sm text-gray-600 mb-3">{q.answer}</p>
                            <div className="flex gap-2">
                              <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition">Claude</a>
                              <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition">ChatGPT</a>
                              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Gemini</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
