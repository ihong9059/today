'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'situation-handling',
      name: '상황 대처',
      icon: '⚡',
      questions: [
        { id: 1, q: '상사의 급한 약속 변경 시 대처 방법을 설명하시오.', a: '즉시 상대방 연락, 양해 구하기, 대안 일정 제시, 상사 보고' },
        { id: 2, q: '상사 부재 중 중요 전화 처리를 설명하시오.', a: '용건 파악, 메모, 긴급도 판단, 연락 가능 시간 안내, 보고' },
        { id: 3, q: '기밀 문서 분실 시 대응을 설명하시오.', a: '즉시 보고, 수색, 유출 범위 파악, 재발 방지 대책' },
        { id: 4, q: '방문객 대기 중 상사 회의 지연 시 대처를 설명하시오.', a: '양해 구하기, 음료 제공, 예상 시간 안내, 대기 장소 안내' },
        { id: 5, q: 'VIP 방문 시 갑작스러운 일정 변경 대처를 설명하시오.', a: '즉시 관련 부서 통보, 대체 일정 조율, 의전 조정' },
        { id: 6, q: '상사의 건강 문제 발생 시 대응을 설명하시오.', a: '응급조치, 119 신고, 보호자 연락, 일정 조정' },
        { id: 7, q: '기밀 정보 요청 시 대응 방법을 설명하시오.', a: '정중히 거절, 권한 확인, 상사 판단 요청' },
        { id: 8, q: '시스템 장애 시 업무 처리를 설명하시오.', a: 'IT 부서 신고, 백업 자료 활용, 수기 처리, 복구 후 입력' },
        { id: 9, q: '상사 간 갈등 상황에서의 역할을 설명하시오.', a: '중립 유지, 정보 전달 정확히, 양측 일정 조율' },
        { id: 10, q: '불만 고객 방문 시 대응을 설명하시오.', a: '경청, 공감, 사과, 담당자 연결, 상황 보고' }
      ]
    },
    {
      id: 'document-work',
      name: '문서 작성 실무',
      icon: '📄',
      questions: [
        { id: 1, q: '공문서 작성 시 주의사항을 설명하시오.', a: '정확한 용어, 간결한 문장, 결재선, 시행일자' },
        { id: 2, q: '기안문 작성 방법을 설명하시오.', a: '제목, 목적, 내용, 기대효과, 예산, 결재요청' },
        { id: 3, q: '회의록 작성 요령을 설명하시오.', a: '회의정보, 참석자, 안건별 논의내용, 결정사항, 향후일정' },
        { id: 4, q: '보고서 구성을 설명하시오.', a: '제목, 목적, 현황, 분석, 결론, 제언, 첨부' },
        { id: 5, q: '영문 비즈니스 레터 작성을 설명하시오.', a: 'Letterhead, Date, Address, Salutation, Body, Closing' },
        { id: 6, q: '초청장/안내문 작성을 설명하시오.', a: '행사명, 일시, 장소, 프로그램, RSVP' },
        { id: 7, q: '프레젠테이션 자료 작성을 설명하시오.', a: '핵심 메시지, 시각화, 간결한 텍스트, 일관된 디자인' },
        { id: 8, q: '메모 작성 원칙을 설명하시오.', a: '5W1H, 간결, 정확, 수신자, 날짜' },
        { id: 9, q: '결재 서류 준비를 설명하시오.', a: '기안문, 관련 자료, 결재선 확인, 검토' },
        { id: 10, q: '문서 교정 시 확인사항을 설명하시오.', a: '맞춤법, 서식, 날짜, 고유명사, 수치' }
      ]
    },
    {
      id: 'excel-work',
      name: '엑셀 실무',
      icon: '📊',
      questions: [
        { id: 1, q: '엑셀 기본 함수(SUM, AVERAGE)를 설명하시오.', a: 'SUM: 합계, AVERAGE: 평균, 범위 지정' },
        { id: 2, q: 'VLOOKUP 함수를 설명하시오.', a: '세로 검색, 다른 표에서 값 찾기' },
        { id: 3, q: 'IF 함수를 설명하시오.', a: '조건에 따른 결과 반환, 중첩 가능' },
        { id: 4, q: '피벗테이블 활용을 설명하시오.', a: '데이터 요약, 분석, 동적 보고서' },
        { id: 5, q: '차트 작성 방법을 설명하시오.', a: '데이터 선택, 차트 유형, 제목, 범례' },
        { id: 6, q: '조건부 서식을 설명하시오.', a: '조건에 따른 셀 서식 자동 변경' },
        { id: 7, q: '데이터 유효성 검사를 설명하시오.', a: '입력값 제한, 드롭다운 목록' },
        { id: 8, q: '필터와 정렬을 설명하시오.', a: '조건별 데이터 추출, 오름/내림차순' },
        { id: 9, q: '인쇄 설정을 설명하시오.', a: '페이지 설정, 머리글/바닥글, 인쇄 영역' },
        { id: 10, q: '셀 참조($) 사용을 설명하시오.', a: '절대참조, 상대참조, 혼합참조' }
      ]
    },
    {
      id: 'protocol-practice',
      name: '의전 실무',
      icon: '🎩',
      questions: [
        { id: 1, q: 'VIP 영접 절차를 설명하시오.', a: '사전 준비, 영접 장소, 의전차량, 수행원 배치' },
        { id: 2, q: '행사 좌석 배치 계획을 설명하시오.', a: '주빈석, 직급/연령, 문화 고려, 배치도 작성' },
        { id: 3, q: '공식 만찬 준비를 설명하시오.', a: '메뉴, 테이블셋팅, 좌석배치, 식순, 건배' },
        { id: 4, q: '의전 차량 배치를 설명하시오.', a: '호스트 차량, VIP 차량, 수행차량 순서' },
        { id: 5, q: '선물 의전을 설명하시오.', a: '예산, 문화 고려, 포장, 전달 타이밍' },
        { id: 6, q: '국제회의 의전을 설명하시오.', a: '국기 게양, 통역, 좌석 배치, 문화 차이' },
        { id: 7, q: '기념식 행사 진행을 설명하시오.', a: '식순, 내빈 소개, 축사, 기념촬영, 리허설' },
        { id: 8, q: '경조사 의전을 설명하시오.', a: '화환/조화, 경조금, 참석 범위, 조문 예절' },
        { id: 9, q: '공항 영접 의전을 설명하시오.', a: '도착 확인, 영접 장소, 차량 배치, 동선' },
        { id: 10, q: '기자회견 의전을 설명하시오.', a: '장소, 배석, 발언순서, 질의응답, 포토타임' }
      ]
    },
    {
      id: 'english-practice',
      name: '영어 실무',
      icon: '🌐',
      questions: [
        { id: 1, q: '영문 이메일 회신 작성을 설명하시오.', a: 'Thank you for your email. In response to your inquiry...' },
        { id: 2, q: '회의 일정 조율 영문 메일을 작성하시오.', a: 'I would like to schedule a meeting... Would [date] work for you?' },
        { id: 3, q: '출장 일정표 영문 작성을 설명하시오.', a: 'Date, Time, Activity, Location, Contact, Remarks' },
        { id: 4, q: '영문 초청장 작성을 설명하시오.', a: 'You are cordially invited to... RSVP by...' },
        { id: 5, q: '영문 감사 서신 작성을 설명하시오.', a: 'Thank you for your hospitality during our visit...' },
        { id: 6, q: '전화 메시지 영문 기록을 설명하시오.', a: 'While you were out: Caller, Company, Phone, Message' },
        { id: 7, q: '영문 회의록 작성을 설명하시오.', a: 'Meeting Minutes: Date, Attendees, Agenda, Discussion, Action Items' },
        { id: 8, q: '비자 신청 서류 영문 작성을 설명하시오.', a: 'Purpose of visit, Duration, Accommodation, Financial support' },
        { id: 9, q: '영문 보도자료 작성을 설명하시오.', a: 'Headline, Lead paragraph, 5W1H, Quotes, Boilerplate' },
        { id: 10, q: '영문 명함 디자인을 설명하시오.', a: 'Name, Title, Company, Address, Phone, Email, Logo' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('secretary-1-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('secretary-1-practical-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const getTopicProgress = (topicId: string, questionCount: number) => {
    let completed = 0;
    for (let i = 1; i <= questionCount; i++) {
      if (completedQuestions[`${topicId}-${i}`]) completed++;
    }
    return completed;
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;

  const handleAskAI = (question: string) => {
    const prompt = `비서 1급 실기 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/office/secretary-1" className="text-rose-600 hover:text-rose-800 flex items-center gap-2">
            ← 비서 1급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">✍️ 비서실무 (실기)</h1>
          <p className="text-gray-600 mb-4">필답형+작업형 실기 시험 대비</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-4 rounded-full transition-all"
                style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{totalCompleted} / {totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => {
            const progress = getTopicProgress(topic.id, topic.questions.length);
            const isExpanded = expandedTopics[topic.id];

            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <span className="font-semibold text-gray-800">{topic.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{progress}/{topic.questions.length}</span>
                    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-4 space-y-3">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-rose-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleQuestion(topic.id, q.id)}
                              className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button
                                onClick={() => handleAskAI(q.q)}
                                className="mt-2 text-sm text-rose-600 hover:text-rose-800 flex items-center gap-1"
                              >
                                🤖 AI에게 자세히 물어보기
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
                  <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                    <span className="text-2xl">🧡</span>
                    <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                  </a>
                  <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                    <span className="text-2xl">💚</span>
                    <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                  </a>
                  <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                    <span className="text-2xl">💙</span>
                    <div className="text-left"><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
