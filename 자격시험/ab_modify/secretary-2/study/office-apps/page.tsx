'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OfficeAppsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'computer-basics',
      name: '컴퓨터 기초',
      icon: '🖥️',
      questions: [
        { id: 1, q: '컴퓨터의 구성요소를 설명하시오.', a: 'CPU, 메모리, 저장장치, 입출력장치' },
        { id: 2, q: '운영체제의 역할을 설명하시오.', a: '하드웨어 관리, 응용프로그램 실행, 사용자 인터페이스' },
        { id: 3, q: '파일과 폴더 관리를 설명하시오.', a: '생성, 복사, 이동, 삭제, 이름 변경' },
        { id: 4, q: '파일 확장자를 설명하시오.', a: '.doc(문서), .xls(엑셀), .ppt(파워포인트), .pdf' },
        { id: 5, q: '백업의 중요성을 설명하시오.', a: '데이터 손실 대비, 정기적 백업, 외장매체 활용' },
        { id: 6, q: '압축 파일을 설명하시오.', a: '용량 줄이기, .zip, .rar 형식' },
        { id: 7, q: '바로가기 만들기를 설명하시오.', a: '자주 사용하는 프로그램/파일 빠른 접근' },
        { id: 8, q: '휴지통 사용을 설명하시오.', a: '삭제 파일 임시 보관, 복원 가능' },
        { id: 9, q: '프린터 설정을 설명하시오.', a: '기본 프린터, 인쇄 설정, 용지 크기' },
        { id: 10, q: '단축키 사용을 설명하시오.', a: 'Ctrl+C(복사), Ctrl+V(붙여넣기), Ctrl+S(저장)' }
      ]
    },
    {
      id: 'word-processing',
      name: '문서작성',
      icon: '📝',
      questions: [
        { id: 1, q: '워드프로세서의 기능을 설명하시오.', a: '문서 작성, 편집, 서식, 인쇄' },
        { id: 2, q: '글꼴 서식을 설명하시오.', a: '글꼴, 크기, 굵게, 기울임, 밑줄' },
        { id: 3, q: '단락 서식을 설명하시오.', a: '정렬, 줄간격, 들여쓰기, 여백' },
        { id: 4, q: '표 삽입과 편집을 설명하시오.', a: '행/열 추가, 셀 병합, 테두리, 음영' },
        { id: 5, q: '그림 삽입을 설명하시오.', a: '이미지 삽입, 크기 조절, 위치 지정' },
        { id: 6, q: '머리글/바닥글을 설명하시오.', a: '페이지 상하단 반복 텍스트, 페이지 번호' },
        { id: 7, q: '찾기/바꾸기 기능을 설명하시오.', a: '특정 단어 검색, 일괄 수정' },
        { id: 8, q: '맞춤법 검사를 설명하시오.', a: '오타, 문법 오류 자동 검사' },
        { id: 9, q: '인쇄 미리보기를 설명하시오.', a: '인쇄 전 레이아웃 확인' },
        { id: 10, q: '템플릿 사용을 설명하시오.', a: '미리 만들어진 문서 양식 활용' }
      ]
    },
    {
      id: 'spreadsheet',
      name: '스프레드시트',
      icon: '📊',
      questions: [
        { id: 1, q: '셀과 범위를 설명하시오.', a: '셀: 행과 열의 교차점, 범위: 여러 셀 선택' },
        { id: 2, q: '기본 수식을 설명하시오.', a: '= 으로 시작, +, -, *, / 연산' },
        { id: 3, q: 'SUM 함수를 설명하시오.', a: '합계 계산, =SUM(범위)' },
        { id: 4, q: 'AVERAGE 함수를 설명하시오.', a: '평균 계산, =AVERAGE(범위)' },
        { id: 5, q: '셀 서식을 설명하시오.', a: '숫자 형식, 날짜 형식, 통화 형식' },
        { id: 6, q: '자동 채우기를 설명하시오.', a: '연속 데이터 자동 입력, 드래그' },
        { id: 7, q: '정렬 기능을 설명하시오.', a: '오름차순, 내림차순 정렬' },
        { id: 8, q: '필터 기능을 설명하시오.', a: '조건에 맞는 데이터만 표시' },
        { id: 9, q: '차트 만들기를 설명하시오.', a: '데이터 시각화, 막대/원형/선 차트' },
        { id: 10, q: '인쇄 영역 설정을 설명하시오.', a: '원하는 범위만 인쇄' }
      ]
    },
    {
      id: 'presentation',
      name: '프레젠테이션',
      icon: '📽️',
      questions: [
        { id: 1, q: '프레젠테이션의 목적을 설명하시오.', a: '정보 전달, 설득, 시각적 발표' },
        { id: 2, q: '슬라이드 추가/삭제를 설명하시오.', a: '새 슬라이드, 복제, 삭제' },
        { id: 3, q: '레이아웃 선택을 설명하시오.', a: '제목, 본문, 두 개의 내용 등' },
        { id: 4, q: '텍스트 입력을 설명하시오.', a: '텍스트 상자, 글머리 기호' },
        { id: 5, q: '이미지 삽입을 설명하시오.', a: '사진, 클립아트, 도형' },
        { id: 6, q: '디자인 테마를 설명하시오.', a: '배경, 색상, 글꼴 통일' },
        { id: 7, q: '애니메이션 효과를 설명하시오.', a: '나타내기, 강조, 끝내기 효과' },
        { id: 8, q: '화면 전환을 설명하시오.', a: '슬라이드 간 전환 효과' },
        { id: 9, q: '슬라이드 쇼 실행을 설명하시오.', a: 'F5, 처음부터/현재부터' },
        { id: 10, q: '발표자 노트를 설명하시오.', a: '발표자용 메모, 청중에게 안 보임' }
      ]
    },
    {
      id: 'internet-email',
      name: '인터넷/이메일',
      icon: '🌐',
      questions: [
        { id: 1, q: '웹브라우저를 설명하시오.', a: '인터넷 페이지 보기, Chrome, Edge, Safari' },
        { id: 2, q: 'URL의 구조를 설명하시오.', a: '프로토콜://도메인/경로' },
        { id: 3, q: '북마크(즐겨찾기)를 설명하시오.', a: '자주 방문하는 사이트 저장' },
        { id: 4, q: '검색 엔진 사용을 설명하시오.', a: 'Google, Naver, 키워드 검색' },
        { id: 5, q: '이메일 계정 관리를 설명하시오.', a: '받은편지함, 보낸편지함, 폴더 정리' },
        { id: 6, q: '이메일 작성을 설명하시오.', a: '받는사람, 제목, 본문, 첨부파일' },
        { id: 7, q: 'CC와 BCC를 설명하시오.', a: 'CC: 참조, BCC: 숨은 참조' },
        { id: 8, q: '첨부파일 전송을 설명하시오.', a: '파일 첨부, 용량 제한 확인' },
        { id: 9, q: '스팸 메일 관리를 설명하시오.', a: '스팸 필터, 차단, 신고' },
        { id: 10, q: '이메일 보안을 설명하시오.', a: '피싱 주의, 첨부파일 주의, 비밀번호 관리' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('secretary-2-apps-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('secretary-2-apps-progress', JSON.stringify(updated));
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
    const prompt = `비서 2급 - 사무정보관리 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/office/secretary-2" className="text-pink-600 hover:text-pink-800 flex items-center gap-2">
            ← 비서 2급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">💻 사무정보관리</h1>
          <p className="text-gray-600 mb-4">OA 기초, 문서작성, 정보관리</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-4 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
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
                <button onClick={() => toggleTopic(topic.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
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
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-pink-300'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>{isCompleted && '✓'}</button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button onClick={() => handleAskAI(q.q)} className="mt-2 text-sm text-pink-600 hover:text-pink-800 flex items-center gap-1">🤖 AI에게 자세히 물어보기</button>
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
                  <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                    <span className="text-2xl">🧡</span>
                    <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                  </a>
                  <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                    <span className="text-2xl">💚</span>
                    <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                  </a>
                  <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
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
