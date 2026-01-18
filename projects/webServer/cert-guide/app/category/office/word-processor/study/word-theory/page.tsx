'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  answer: string;
  prompt: string;
}

export default function WordTheoryStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [progress, setProgress] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    const saved = localStorage.getItem('word-processor-word-theory-progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const newProgress = { ...progress, [id]: !progress[id] };
    setProgress(newProgress);
    localStorage.setItem('word-processor-word-theory-progress', JSON.stringify(newProgress));
  };

  const topics = [
    {
      title: '워드프로세서 개요',
      questions: [
        { id: 1, question: '워드프로세서의 정의와 주요 기능을 설명하시오.', answer: '문서 작성, 편집, 저장, 인쇄를 수행하는 소프트웨어' },
        { id: 2, question: 'OLE(Object Linking and Embedding)의 개념을 설명하시오.', answer: '다른 프로그램의 개체를 문서에 연결하거나 삽입하는 기술' },
        { id: 3, question: 'WYSIWYG의 의미와 장점을 설명하시오.', answer: 'What You See Is What You Get, 화면과 출력물이 동일' },
        { id: 4, question: '워드프로세서의 종류 3가지 이상 나열하시오.', answer: '한글(HWP), MS Word, 한컴오피스 한글, 구글 Docs' },
        { id: 5, question: '문서 템플릿(서식 파일)의 용도를 설명하시오.', answer: '미리 정의된 서식을 적용하여 일관된 문서 작성' },
        { id: 6, question: '워드프로세서와 텍스트 편집기의 차이점을 설명하시오.', answer: '워드프로세서는 서식/레이아웃 지원, 텍스트 편집기는 순수 텍스트만' },
        { id: 7, question: '매크로(Macro)의 정의와 활용법을 설명하시오.', answer: '반복 작업을 자동화하는 명령어 집합, 작업 효율 향상' },
        { id: 8, question: '클립보드(Clipboard)의 기능을 설명하시오.', answer: '복사/잘라내기한 데이터를 임시 저장하는 메모리 영역' },
        { id: 9, question: '실행 취소(Undo)와 다시 실행(Redo)의 차이를 설명하시오.', answer: 'Undo는 이전 작업 취소, Redo는 취소한 작업 다시 실행' },
        { id: 10, question: '자동 저장 기능의 필요성을 설명하시오.', answer: '예기치 않은 오류 시 작업 내용 손실 방지' },
      ]
    },
    {
      title: '문서 작성 및 입력',
      questions: [
        { id: 11, question: '삽입 모드와 수정 모드의 차이를 설명하시오.', answer: '삽입 모드는 기존 글자 밀림, 수정 모드는 기존 글자 덮어쓰기' },
        { id: 12, question: '한글 자판 2벌식과 3벌식의 차이를 설명하시오.', answer: '2벌식은 자음/모음 2벌, 3벌식은 초성/중성/종성 3벌' },
        { id: 13, question: '입력기(IME)의 역할을 설명하시오.', answer: '영문 키보드로 한글 등 다국어를 입력할 수 있게 변환' },
        { id: 14, question: '특수문자 입력 방법 3가지를 설명하시오.', answer: '문자표, 단축키, 자음+한자키 조합' },
        { id: 15, question: '상용구(자동 텍스트)의 기능을 설명하시오.', answer: '자주 사용하는 문구를 등록하여 빠르게 입력' },
        { id: 16, question: '맞춤법 검사 기능의 활용법을 설명하시오.', answer: '문서 내 오타/맞춤법 오류를 자동 검출 및 수정 제안' },
        { id: 17, question: '자동 완성 기능의 장점을 설명하시오.', answer: '반복되는 단어/문장을 예측하여 입력 시간 단축' },
        { id: 18, question: '글자판 배열 중 QWERTY의 특징을 설명하시오.', answer: '가장 널리 사용되는 영문 자판 배열, 타자기에서 유래' },
        { id: 19, question: '음성 인식 입력의 장단점을 설명하시오.', answer: '장점: 빠른 입력, 단점: 인식률 한계, 수정 필요' },
        { id: 20, question: '한자 변환 방법을 설명하시오.', answer: '한글 입력 후 한자 키 또는 F9 키를 눌러 변환' },
      ]
    },
    {
      title: '편집 기능',
      questions: [
        { id: 21, question: '블록 지정의 종류와 방법을 설명하시오.', answer: '드래그, Shift+방향키, Ctrl+A(전체), 더블클릭(단어)' },
        { id: 22, question: '복사(Copy)와 잘라내기(Cut)의 차이를 설명하시오.', answer: '복사는 원본 유지, 잘라내기는 원본 삭제 후 이동' },
        { id: 23, question: '찾기(Find)와 바꾸기(Replace)의 활용법을 설명하시오.', answer: '특정 문자열을 검색하고 다른 문자열로 일괄 변경' },
        { id: 24, question: '이동(Move)과 복사(Copy)의 단축키를 나열하시오.', answer: '이동: Ctrl+X→Ctrl+V, 복사: Ctrl+C→Ctrl+V' },
        { id: 25, question: '선택하여 붙여넣기의 옵션을 설명하시오.', answer: '서식 유지, 텍스트만, 연결하여 붙여넣기 등' },
        { id: 26, question: '다중 선택(Multi-select)의 방법을 설명하시오.', answer: 'Ctrl 키를 누른 상태에서 여러 영역 클릭/드래그' },
        { id: 27, question: '되돌리기(Undo)의 단축키와 제한을 설명하시오.', answer: 'Ctrl+Z, 프로그램별 최대 되돌리기 횟수 제한 있음' },
        { id: 28, question: '삭제(Delete)와 백스페이스(Backspace)의 차이를 설명하시오.', answer: 'Delete는 커서 뒤 삭제, Backspace는 커서 앞 삭제' },
        { id: 29, question: '북마크(책갈피)의 기능을 설명하시오.', answer: '문서 내 특정 위치를 표시하여 빠르게 이동' },
        { id: 30, question: '하이퍼링크 삽입 방법과 용도를 설명하시오.', answer: '텍스트/이미지에 URL 연결, 클릭 시 해당 위치로 이동' },
      ]
    },
    {
      title: '서식 기능',
      questions: [
        { id: 31, question: '글꼴(Font)과 글자 크기(Size)의 단위를 설명하시오.', answer: '글자 크기 단위는 pt(포인트), 1pt = 1/72인치' },
        { id: 32, question: '굵게, 기울임, 밑줄의 단축키를 나열하시오.', answer: 'Ctrl+B(굵게), Ctrl+I(기울임), Ctrl+U(밑줄)' },
        { id: 33, question: '정렬 방식 4가지를 설명하시오.', answer: '왼쪽, 가운데, 오른쪽, 양쪽(배분) 정렬' },
        { id: 34, question: '줄간격과 문단간격의 차이를 설명하시오.', answer: '줄간격은 문단 내 줄 사이, 문단간격은 문단과 문단 사이' },
        { id: 35, question: '들여쓰기와 내어쓰기의 차이를 설명하시오.', answer: '들여쓰기는 첫 줄 안으로, 내어쓰기는 첫 줄 밖으로' },
        { id: 36, question: '글머리 기호와 번호 매기기의 용도를 설명하시오.', answer: '목록 항목을 구분하고 순서를 표시' },
        { id: 37, question: '스타일(Style)의 정의와 장점을 설명하시오.', answer: '서식 모음을 정의하여 일관된 문서 작성, 일괄 변경 용이' },
        { id: 38, question: '탭(Tab)의 종류와 활용법을 설명하시오.', answer: '왼쪽/가운데/오른쪽/소수점 탭으로 정렬 위치 지정' },
        { id: 39, question: '문자 간격과 장평의 차이를 설명하시오.', answer: '문자 간격은 글자 사이 거리, 장평은 글자 폭 비율' },
        { id: 40, question: '형광펜과 글자색의 차이를 설명하시오.', answer: '형광펜은 배경 강조, 글자색은 글자 자체 색상 변경' },
      ]
    },
    {
      title: '표와 차트',
      questions: [
        { id: 41, question: '표(Table) 삽입 방법 2가지를 설명하시오.', answer: '메뉴에서 행/열 지정, 드래그로 크기 지정' },
        { id: 42, question: '셀 병합과 셀 분할의 차이를 설명하시오.', answer: '병합은 여러 셀을 하나로, 분할은 하나의 셀을 여러 개로' },
        { id: 43, question: '표 테두리 스타일 변경 방법을 설명하시오.', answer: '선 종류, 굵기, 색상을 지정하여 테두리 모양 변경' },
        { id: 44, question: '캡션(Caption)의 용도를 설명하시오.', answer: '표나 그림에 제목/번호를 붙여 설명 추가' },
        { id: 45, question: '차트 종류 5가지를 나열하시오.', answer: '막대형, 원형, 꺾은선형, 영역형, 분산형' },
        { id: 46, question: '셀 내 정렬 방법을 설명하시오.', answer: '가로(왼쪽/가운데/오른쪽)와 세로(위/가운데/아래) 조합' },
        { id: 47, question: '표 자동 맞춤 기능을 설명하시오.', answer: '내용/창 너비에 맞게 표 크기 자동 조절' },
        { id: 48, question: '표에서 대각선 긋기의 용도를 설명하시오.', answer: '빈 셀 표시, 행/열 제목 구분 등에 활용' },
        { id: 49, question: '차트 데이터 편집 방법을 설명하시오.', answer: '차트 클릭 후 데이터 시트에서 값 수정' },
        { id: 50, question: '표를 텍스트로, 텍스트를 표로 변환하는 방법을 설명하시오.', answer: '구분 기호(탭, 쉼표 등)를 기준으로 변환' },
      ]
    },
  ];

  const allQuestions = topics.flatMap(t => t.questions);
  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / allQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/office" className="text-gray-600 hover:text-blue-600">사무·행정</a>
            <span className="text-gray-300">›</span>
            <a href="/category/office/word-processor" className="text-gray-600 hover:text-blue-600">워드프로세서</a>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">워드프로세싱 용어</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-3xl">📝</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">워드프로세싱 용어 및 기능</h1>
              <p className="text-blue-100">1과목 | 50문항 학습</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span>학습 진행률</span>
              <span className="font-bold">{completedCount}/{allQuestions.length} ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenTopics(prev =>
                  prev.includes(topicIndex) ? prev.filter(i => i !== topicIndex) : [...prev, topicIndex]
                )}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {topicIndex + 1}
                  </div>
                  <span className="font-bold text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-500">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {openTopics.includes(topicIndex) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-lg border-2 transition ${progress[q.id] ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-transparent'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => saveProgress(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                            progress[q.id] ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
                          }`}
                        >
                          {progress[q.id] && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">💡 {q.answer}</p>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentPrompt(`워드프로세서 필기시험 "워드프로세싱 용어 및 기능" 과목 문제입니다.

문제: ${q.question}

다음 순서로 상세히 설명해주세요:
1. 핵심 개념 정리
2. 상세 설명 (예시 포함)
3. 실제 활용 방법
4. 시험 출제 포인트
5. 관련 개념 연결
6. 연습문제 3개 (정답 포함)`);
                            setShowAIModal(true);
                          }}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition"
                        >
                          🤖 AI
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <a href="/category/office/word-processor" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 메인으로
          </a>
          <a href="/category/office/word-processor/study/pc-basic" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
            다음: PC 운영체제 →
          </a>
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
