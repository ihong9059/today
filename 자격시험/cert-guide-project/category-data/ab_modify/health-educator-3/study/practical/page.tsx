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
      title: '보건교육 기획',
      questions: [
        { id: 1, question: '보건교육 기획의 기본 단계는?', answer: '요구도 조사 → 목표 설정 → 내용 구성 → 방법 선정 → 실행 → 평가의 순서로 진행한다.', prompt: '보건교육사 3급 실기 준비: 보건교육 기획의 기본 단계를 설명해주세요.' },
        { id: 2, question: '교육 대상자 분석 방법은?', answer: '연령, 교육수준, 건강상태, 사전 지식, 관심사 등을 파악한다.', prompt: '보건교육사 3급 실기 준비: 교육 대상자 분석 방법을 설명해주세요.' },
        { id: 3, question: '학습목표 작성 시 주의사항은?', answer: '구체적이고 측정 가능하며, 대상자 관점에서 행동으로 진술한다.', prompt: '보건교육사 3급 실기 준비: 학습목표 작성 시 주의사항을 설명해주세요.' },
        { id: 4, question: '교육 내용 선정 기준은?', answer: '대상자 요구, 중요도, 실용성, 시의성, 학습자 수준을 고려한다.', prompt: '보건교육사 3급 실기 준비: 교육 내용 선정 기준을 설명해주세요.' },
        { id: 5, question: '교육 시간 배분 방법은?', answer: '도입(10%), 전개(70-80%), 정리(10-20%)로 배분한다.', prompt: '보건교육사 3급 실기 준비: 교육 시간 배분 방법을 설명해주세요.' },
      ],
    },
    {
      title: '교육방법 활용',
      questions: [
        { id: 6, question: '강의법 활용 시 유의점은?', answer: '일방적 전달을 피하고, 질문, 사례, 시청각 자료를 활용하여 상호작용을 높인다.', prompt: '보건교육사 3급 실기 준비: 강의법 활용 시 유의점을 설명해주세요.' },
        { id: 7, question: '토의 진행 시 주의사항은?', answer: '명확한 주제 제시, 발언 기회 균등, 시간 관리, 정리 및 요약이 중요하다.', prompt: '보건교육사 3급 실기 준비: 토의 진행 시 주의사항을 설명해주세요.' },
        { id: 8, question: '시범 교육의 효과적 진행법은?', answer: '전체 시범 → 단계별 설명 → 학습자 실습 → 피드백 순으로 진행한다.', prompt: '보건교육사 3급 실기 준비: 시범 교육의 효과적 진행법을 설명해주세요.' },
        { id: 9, question: '역할극 활용 방법은?', answer: '상황 설명, 역할 배정, 실연, 디브리핑 순서로 진행하며 안전한 분위기 조성이 중요하다.', prompt: '보건교육사 3급 실기 준비: 역할극 활용 방법을 설명해주세요.' },
        { id: 10, question: '소그룹 활동 운영 방법은?', answer: '명확한 과제 제시, 시간 안내, 순회 지도, 결과 공유로 진행한다.', prompt: '보건교육사 3급 실기 준비: 소그룹 활동 운영 방법을 설명해주세요.' },
      ],
    },
    {
      title: '교육매체 제작과 활용',
      questions: [
        { id: 11, question: 'PPT 제작 원칙은?', answer: '간결한 내용, 적절한 글자 크기, 일관된 디자인, 시각 자료 활용이 중요하다.', prompt: '보건교육사 3급 실기 준비: PPT 제작 원칙을 설명해주세요.' },
        { id: 12, question: '리플릿 제작 시 고려사항은?', answer: '핵심 메시지, 적절한 그림, 가독성 있는 글꼴, 행동 촉구 문구가 필요하다.', prompt: '보건교육사 3급 실기 준비: 리플릿 제작 시 고려사항을 설명해주세요.' },
        { id: 13, question: '동영상 활용 시 유의점은?', answer: '사전 점검, 적절한 길이, 시청 후 토론이나 질문 시간 확보가 필요하다.', prompt: '보건교육사 3급 실기 준비: 동영상 활용 시 유의점을 설명해주세요.' },
        { id: 14, question: '포스터 제작 원칙은?', answer: '눈에 띄는 제목, 핵심 정보만 포함, 적절한 이미지, 행동 촉구 메시지가 필요하다.', prompt: '보건교육사 3급 실기 준비: 포스터 제작 원칙을 설명해주세요.' },
        { id: 15, question: '실물 자료 활용의 장점은?', answer: '구체적 이해, 흥미 유발, 실제 경험 제공으로 학습 효과를 높인다.', prompt: '보건교육사 3급 실기 준비: 실물 자료 활용의 장점을 설명해주세요.' },
      ],
    },
    {
      title: '발표와 커뮤니케이션',
      questions: [
        { id: 16, question: '효과적인 발표 기술은?', answer: '명확한 발음, 적절한 속도, 눈맞춤, 자연스러운 제스처가 중요하다.', prompt: '보건교육사 3급 실기 준비: 효과적인 발표 기술을 설명해주세요.' },
        { id: 17, question: '발표 불안 극복 방법은?', answer: '충분한 연습, 긍정적 자기암시, 호흡 조절, 청중 친밀감 형성이 도움된다.', prompt: '보건교육사 3급 실기 준비: 발표 불안 극복 방법을 설명해주세요.' },
        { id: 18, question: '청중과 상호작용 방법은?', answer: '질문 던지기, 거수 요청, 짧은 활동, 개인 경험 공유 요청 등을 활용한다.', prompt: '보건교육사 3급 실기 준비: 청중과 상호작용 방법을 설명해주세요.' },
        { id: 19, question: '질문 응대 기법은?', answer: '경청, 명확화, 칭찬, 답변, 확인의 순서로 응대한다.', prompt: '보건교육사 3급 실기 준비: 질문 응대 기법을 설명해주세요.' },
        { id: 20, question: '비언어적 커뮤니케이션 활용은?', answer: '표정, 시선, 자세, 제스처, 목소리 톤을 통해 메시지를 강화한다.', prompt: '보건교육사 3급 실기 준비: 비언어적 커뮤니케이션 활용을 설명해주세요.' },
      ],
    },
    {
      title: '교육평가와 개선',
      questions: [
        { id: 21, question: '교육 평가의 종류는?', answer: '진단평가(사전), 형성평가(과정 중), 총괄평가(종료 후)가 있다.', prompt: '보건교육사 3급 실기 준비: 교육 평가의 종류를 설명해주세요.' },
        { id: 22, question: '만족도 조사 방법은?', answer: '설문지, 구두 피드백, 체크리스트 등을 활용하여 교육 만족도를 측정한다.', prompt: '보건교육사 3급 실기 준비: 만족도 조사 방법을 설명해주세요.' },
        { id: 23, question: '학습 성과 측정 방법은?', answer: '지필고사, 실기평가, 관찰, 자가점검 등을 통해 학습 목표 달성을 확인한다.', prompt: '보건교육사 3급 실기 준비: 학습 성과 측정 방법을 설명해주세요.' },
        { id: 24, question: '교육 개선을 위한 피드백 활용은?', answer: '평가 결과를 분석하여 내용, 방법, 매체, 시간 배분 등을 개선한다.', prompt: '보건교육사 3급 실기 준비: 교육 개선을 위한 피드백 활용을 설명해주세요.' },
        { id: 25, question: '자기 성찰의 방법은?', answer: '녹화 분석, 체크리스트 점검, 동료 피드백, 성찰 일지 작성 등이 있다.', prompt: '보건교육사 3급 실기 준비: 자기 성찰의 방법을 설명해주세요.' },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-3-practical-progress');
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
    localStorage.setItem('health-educator-3-practical-progress', JSON.stringify([...newCompleted]));
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
            <Link href="/" className="hover:text-rose-600">홈</Link>
            <span>›</span>
            <Link href="/category/medical" className="hover:text-rose-600">의료·보건</Link>
            <span>›</span>
            <Link href="/category/medical/health-educator-3" className="hover:text-rose-600">보건교육사 3급</Link>
            <span>›</span>
            <span className="text-rose-600 font-medium">실기</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">🎯 실기 학습 가이드</h1>
          <p className="text-sm text-gray-500 mt-1">보건교육사 3급 실기시험</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">학습 진도</span>
            <span className="text-sm text-gray-500">{completedCount} / {totalQuestions} 완료</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="text-right mt-1 text-sm text-rose-600 font-medium">{progressPercentage}%</div>
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-rose-700 mb-2">🎯 실기시험 안내</h3>
          <ul className="text-sm text-rose-800 space-y-1">
            <li>• <strong>시험형식:</strong> 보건교육 실무 능력 평가</li>
            <li>• <strong>평가항목:</strong> 교육 기획, 교육 방법, 매체 활용, 발표력</li>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.has(q.id) ? 'bg-rose-50 border-rose-200' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${completedQuestions.has(q.id) ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300 hover:border-rose-500'}`}
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
