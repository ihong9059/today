'use client';

import { useState, useEffect } from 'react';

export default function WordPracticalStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [progress, setProgress] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    const saved = localStorage.getItem('word-processor-practical-progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const newProgress = { ...progress, [id]: !progress[id] };
    setProgress(newProgress);
    localStorage.setItem('word-processor-practical-progress', JSON.stringify(newProgress));
  };

  const topics = [
    {
      title: '스타일 지정 (25점)',
      questions: [
        { id: 1, question: '제목을 "굴림체, 18pt, 가운데 정렬, 굵게"로 설정하시오.', answer: '서식 도구모음에서 글꼴→굴림, 크기→18, 가운데 정렬(Ctrl+E), 굵게(Ctrl+B)' },
        { id: 2, question: '본문을 "바탕체, 11pt, 양쪽 정렬, 줄간격 160%"로 설정하시오.', answer: '문단 선택 후 글꼴 변경, 문단→줄간격 160% 설정' },
        { id: 3, question: '특정 텍스트에 "밑줄, 빨간색 글자색"을 적용하시오.', answer: '텍스트 선택→Ctrl+U(밑줄)→글꼴 색 빨강 선택' },
        { id: 4, question: '"첫 줄 들여쓰기 2자"를 적용하시오.', answer: '문단 서식→들여쓰기→첫 줄→2자(또는 10mm)' },
        { id: 5, question: '특정 문단에 "글머리 기호(●)"를 적용하시오.', answer: '문단 선택→서식→글머리 기호→●선택' },
      ]
    },
    {
      title: '표 작성 (30점) ⭐',
      questions: [
        { id: 6, question: '5행 4열의 표를 삽입하시오.', answer: '입력→표→5행 4열 지정하여 삽입' },
        { id: 7, question: '첫 번째 행의 4개 셀을 병합하시오.', answer: '셀 선택→표→셀 병합(또는 우클릭→셀 병합)' },
        { id: 8, question: '표의 바깥 테두리를 "이중선, 0.5mm"로 설정하시오.', answer: '표 선택→표 속성→테두리→바깥선→이중선, 굵기 0.5mm' },
        { id: 9, question: '특정 셀에 "회색 10% 배경색"을 적용하시오.', answer: '셀 선택→셀 속성→배경→회색 10% 선택' },
        { id: 10, question: '셀 내용을 "세로 가운데 정렬"로 설정하시오.', answer: '셀 선택→셀 속성→세로 정렬→가운데' },
        { id: 11, question: '표 전체 너비를 "80mm"로 설정하시오.', answer: '표 선택→표 속성→너비 80mm 입력' },
        { id: 12, question: '특정 셀에 대각선을 삽입하시오.', answer: '셀 선택→셀 속성→대각선→왼쪽 위에서 오른쪽 아래' },
        { id: 13, question: '표의 첫 행을 "제목 행으로 반복" 설정하시오.', answer: '첫 행 선택→표→제목 행 반복 체크' },
        { id: 14, question: '셀 여백을 "왼쪽 2mm, 오른쪽 2mm"로 설정하시오.', answer: '셀 선택→셀 속성→여백→왼쪽/오른쪽 2mm' },
        { id: 15, question: '표 아래에 "표 1. 매출 현황" 캡션을 삽입하시오.', answer: '표 선택→입력→캡션→"표 1. 매출 현황" 입력' },
      ]
    },
    {
      title: '그림/차트 삽입 (25점)',
      questions: [
        { id: 16, question: '지정된 위치에 그림 파일을 삽입하시오.', answer: '입력→그림→파일 선택하여 삽입' },
        { id: 17, question: '삽입된 그림 크기를 "가로 50mm, 세로 30mm"로 설정하시오.', answer: '그림 선택→그림 속성→크기→가로 50mm, 세로 30mm' },
        { id: 18, question: '그림 위치를 "글자처럼 취급"으로 설정하시오.', answer: '그림 속성→위치→글자처럼 취급 선택' },
        { id: 19, question: '그림 위치를 "어울림"으로 변경하시오.', answer: '그림 속성→위치→어울림 선택' },
        { id: 20, question: '막대형 차트를 삽입하시오.', answer: '입력→차트→막대형 선택→데이터 입력' },
      ]
    },
    {
      title: '문서 서식 (20점)',
      questions: [
        { id: 21, question: '용지 방향을 "가로"로 변경하시오.', answer: '파일→편집 용지→용지 방향→가로 선택' },
        { id: 22, question: '여백을 "위/아래 20mm, 좌/우 25mm"로 설정하시오.', answer: '파일→편집 용지→여백→상/하 20, 좌/우 25 입력' },
        { id: 23, question: '머리말에 "2026년 분기별 보고서"를 삽입하시오.', answer: '보기→머리말/꼬리말→머리말 영역에 텍스트 입력' },
        { id: 24, question: '꼬리말에 "페이지 번호"를 삽입하시오.', answer: '보기→머리말/꼬리말→꼬리말→쪽 번호 넣기' },
        { id: 25, question: '문서를 2단으로 편집하시오.', answer: '서식→다단→2단 선택' },
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
            <span className="text-violet-600 font-medium">실기 연습</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-3xl">✍️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">실기시험 연습</h1>
              <p className="text-violet-100">문서편집 작업형 | 25문항 학습</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span>학습 진행률</span>
              <span className="font-bold">{completedCount}/{allQuestions.length} ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <div className="bg-red-500/30 rounded-lg p-3 border border-red-300">
            <p className="text-sm font-medium">⚠️ 실기 합격 기준: 70점 이상 (필기 60점보다 높음!)</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 배점 안내 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📊 영역별 배점</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-gray-500">스타일 지정</p>
              <p className="text-2xl font-bold text-blue-600">25점</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg text-center border-2 border-red-200">
              <p className="text-sm text-red-600 font-medium">표 작성 ⭐</p>
              <p className="text-2xl font-bold text-red-600">30점</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-sm text-gray-500">그림/차트</p>
              <p className="text-2xl font-bold text-green-600">25점</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <p className="text-sm text-gray-500">문서 서식</p>
              <p className="text-2xl font-bold text-purple-600">20점</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenTopics(prev =>
                  prev.includes(topicIndex) ? prev.filter(i => i !== topicIndex) : [...prev, topicIndex]
                )}
                className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition ${
                  topicIndex === 1 ? 'bg-red-50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 text-white rounded-lg flex items-center justify-center font-bold text-sm ${
                    topicIndex === 1 ? 'bg-red-500' : 'bg-violet-500'
                  }`}>
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
                          <p className="text-sm text-violet-600 bg-violet-50 px-3 py-2 rounded-lg">💡 {q.answer}</p>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentPrompt(`워드프로세서 실기시험 문제입니다.

문제: ${q.question}

다음 순서로 상세히 설명해주세요:
1. 한글(HWP)에서의 조작 방법 (메뉴 경로 포함)
2. MS Word에서의 조작 방법 (메뉴 경로 포함)
3. 단축키가 있다면 함께 알려주세요
4. 작업 시 주의사항
5. 자주 틀리는 포인트
6. 시간 단축 팁`);
                            setShowAIModal(true);
                          }}
                          className="px-3 py-1 bg-violet-100 text-violet-600 rounded-lg text-sm hover:bg-violet-200 transition"
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

        {/* 실기 TIP */}
        <div className="mt-8 bg-amber-50 rounded-xl p-6 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-4">💡 실기 합격 TIP</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2 text-sm text-amber-900">
              <p>⌨️ <strong>단축키 암기 필수</strong> - 시간 단축의 핵심</p>
              <p>📊 <strong>표 작성 30점</strong> - 가장 배점 높으니 완벽 연습</p>
              <p>💾 <strong>수시로 저장</strong> - Ctrl+S 습관화</p>
            </div>
            <div className="space-y-2 text-sm text-amber-900">
              <p>👀 <strong>문제 꼼꼼히 읽기</strong> - 수치 오류 주의</p>
              <p>⏱️ <strong>시간 배분</strong> - 표 작성에 7~8분 투자</p>
              <p>✅ <strong>최종 검토</strong> - 마지막 3분은 확인용</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <a href="/category/office/word-processor/study/pc-basic" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← PC 운영체제
          </a>
          <a href="/category/office/word-processor" className="px-6 py-3 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600 transition">
            메인으로 돌아가기
          </a>
        </div>
      </main>

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
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
