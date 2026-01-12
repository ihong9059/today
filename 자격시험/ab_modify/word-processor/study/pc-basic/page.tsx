'use client';

import { useState, useEffect } from 'react';

export default function PCBasicStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [progress, setProgress] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    const saved = localStorage.getItem('word-processor-pc-basic-progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const newProgress = { ...progress, [id]: !progress[id] };
    setProgress(newProgress);
    localStorage.setItem('word-processor-pc-basic-progress', JSON.stringify(newProgress));
  };

  const topics = [
    {
      title: 'PC 운영체제 기초',
      questions: [
        { id: 1, question: '운영체제(OS)의 정의와 주요 역할을 설명하시오.', answer: '하드웨어와 사용자 사이 인터페이스, 자원 관리 및 프로그램 실행 제어' },
        { id: 2, question: '운영체제의 종류 5가지를 나열하시오.', answer: 'Windows, macOS, Linux, Unix, Android' },
        { id: 3, question: '부팅(Booting)의 과정을 순서대로 설명하시오.', answer: '전원→POST→BIOS/UEFI→부트로더→OS 로드→로그인 화면' },
        { id: 4, question: 'BIOS와 UEFI의 차이점을 설명하시오.', answer: 'UEFI는 GUI 지원, 빠른 부팅, 2TB 이상 디스크 지원' },
        { id: 5, question: '커널(Kernel)의 역할을 설명하시오.', answer: '운영체제 핵심, 하드웨어와 소프트웨어 사이 중재' },
        { id: 6, question: '32비트와 64비트 운영체제의 차이를 설명하시오.', answer: '64비트는 4GB 이상 메모리 지원, 처리 속도 향상' },
        { id: 7, question: '멀티태스킹(Multitasking)의 개념을 설명하시오.', answer: '여러 프로그램을 동시에 실행하는 기능' },
        { id: 8, question: '드라이버(Driver)의 역할을 설명하시오.', answer: '운영체제와 하드웨어 장치 사이 통신을 담당하는 소프트웨어' },
        { id: 9, question: '안전 모드(Safe Mode)의 용도를 설명하시오.', answer: '최소 드라이버로 부팅하여 시스템 문제 해결' },
        { id: 10, question: '레지스트리(Registry)의 정의를 설명하시오.', answer: 'Windows 설정 정보를 저장하는 데이터베이스' },
      ]
    },
    {
      title: 'Windows 기본 사용',
      questions: [
        { id: 11, question: '바탕화면의 구성 요소를 설명하시오.', answer: '아이콘, 작업 표시줄, 시작 버튼, 시스템 트레이' },
        { id: 12, question: '작업 표시줄의 기능을 설명하시오.', answer: '실행 중인 프로그램 표시, 빠른 실행, 알림 영역' },
        { id: 13, question: '시작 메뉴의 구성과 활용법을 설명하시오.', answer: '프로그램 목록, 설정, 전원 옵션, 검색 기능 제공' },
        { id: 14, question: '바로 가기 아이콘의 특징을 설명하시오.', answer: '원본 파일의 링크, 화살표 표시, 삭제해도 원본 유지' },
        { id: 15, question: '창 최소화, 최대화, 닫기 버튼의 단축키를 나열하시오.', answer: 'Alt+F4(닫기), Win+D(바탕화면), Win+↑(최대화)' },
        { id: 16, question: 'Alt+Tab의 기능을 설명하시오.', answer: '실행 중인 프로그램 사이 전환' },
        { id: 17, question: '휴지통의 기능과 복원 방법을 설명하시오.', answer: '삭제 파일 임시 보관, 복원/완전삭제 선택 가능' },
        { id: 18, question: '클립보드 기록(Windows+V)의 기능을 설명하시오.', answer: '복사한 항목 기록을 보고 선택하여 붙여넣기' },
        { id: 19, question: '가상 데스크톱(Virtual Desktop)의 활용법을 설명하시오.', answer: 'Win+Tab으로 여러 바탕화면 생성하여 작업 분리' },
        { id: 20, question: '스냅(Snap) 기능의 사용법을 설명하시오.', answer: '창을 화면 모서리로 끌어 자동 정렬' },
      ]
    },
    {
      title: '파일 및 폴더 관리',
      questions: [
        { id: 21, question: '파일과 폴더의 차이를 설명하시오.', answer: '파일은 데이터 저장 단위, 폴더는 파일을 담는 그릇' },
        { id: 22, question: '파일 확장자의 역할과 예시를 설명하시오.', answer: '파일 형식 구분, .docx(문서), .jpg(이미지), .exe(실행)' },
        { id: 23, question: '탐색기(Explorer)의 주요 기능을 설명하시오.', answer: '파일/폴더 탐색, 복사, 이동, 삭제, 이름 변경' },
        { id: 24, question: '경로(Path)의 개념과 표기법을 설명하시오.', answer: '파일 위치 표시, 절대경로(C:\\Users\\...), 상대경로(..\\)' },
        { id: 25, question: '파일 속성(읽기전용, 숨김, 보관)을 설명하시오.', answer: '읽기전용: 수정 불가, 숨김: 기본 비표시, 보관: 백업 필요' },
        { id: 26, question: '파일 검색(*.txt, file?.doc) 와일드카드를 설명하시오.', answer: '*: 모든 문자, ?: 한 글자, 파일 검색 시 활용' },
        { id: 27, question: '압축 파일(ZIP, RAR)의 장점을 설명하시오.', answer: '파일 크기 축소, 여러 파일 하나로 묶기' },
        { id: 28, question: '파일 복사와 이동의 차이를 설명하시오.', answer: '복사: 원본 유지, 이동: 원본 삭제 후 새 위치로' },
        { id: 29, question: 'Shift+Delete의 기능을 설명하시오.', answer: '휴지통 거치지 않고 영구 삭제' },
        { id: 30, question: '드라이브 문자(C:, D:)의 의미를 설명하시오.', answer: '저장장치 구분 기호, C:는 보통 시스템 드라이브' },
      ]
    },
    {
      title: '컴퓨터 구조 및 하드웨어',
      questions: [
        { id: 31, question: 'CPU(중앙처리장치)의 역할을 설명하시오.', answer: '명령어 해석 및 실행, 연산 처리, 컴퓨터의 두뇌' },
        { id: 32, question: 'RAM과 ROM의 차이를 설명하시오.', answer: 'RAM: 휘발성 주기억장치, ROM: 비휘발성 읽기 전용' },
        { id: 33, question: 'HDD와 SSD의 차이점을 설명하시오.', answer: 'HDD: 자기 디스크 방식, SSD: 반도체 방식으로 빠르고 조용' },
        { id: 34, question: '메인보드(Motherboard)의 역할을 설명하시오.', answer: '각 부품 연결 및 데이터 전송 통로' },
        { id: 35, question: 'GPU(그래픽카드)의 역할을 설명하시오.', answer: '화면 출력 처리, 3D 그래픽/영상 연산' },
        { id: 36, question: '입력장치 5가지를 나열하시오.', answer: '키보드, 마우스, 스캐너, 마이크, 웹캠' },
        { id: 37, question: '출력장치 4가지를 나열하시오.', answer: '모니터, 프린터, 스피커, 프로젝터' },
        { id: 38, question: 'USB 포트의 종류와 속도를 설명하시오.', answer: 'USB 2.0(480Mbps), USB 3.0(5Gbps), USB-C(최대 40Gbps)' },
        { id: 39, question: '전원공급장치(PSU)의 역할을 설명하시오.', answer: 'AC 전원을 DC로 변환하여 부품에 전력 공급' },
        { id: 40, question: '쿨링 시스템(공랭, 수랭)의 필요성을 설명하시오.', answer: 'CPU/GPU 발열 제어, 시스템 안정성 유지' },
      ]
    },
    {
      title: '네트워크 및 인터넷',
      questions: [
        { id: 41, question: 'IP 주소의 정의와 형식을 설명하시오.', answer: '네트워크 상 기기 식별 주소, IPv4: 192.168.0.1 형태' },
        { id: 42, question: 'LAN과 WAN의 차이를 설명하시오.', answer: 'LAN: 근거리 네트워크, WAN: 광역 네트워크(인터넷)' },
        { id: 43, question: '공유기(Router)의 역할을 설명하시오.', answer: 'IP 주소 할당, 네트워크 연결, 방화벽 기능' },
        { id: 44, question: 'DNS의 역할을 설명하시오.', answer: '도메인 이름을 IP 주소로 변환 (예: google.com → 142.250.x.x)' },
        { id: 45, question: 'HTTP와 HTTPS의 차이를 설명하시오.', answer: 'HTTPS는 SSL/TLS 암호화 적용으로 보안 강화' },
        { id: 46, question: '웹 브라우저의 종류 5가지를 나열하시오.', answer: 'Chrome, Edge, Firefox, Safari, Opera' },
        { id: 47, question: '쿠키(Cookie)의 역할을 설명하시오.', answer: '웹사이트 접속 정보 저장, 로그인 유지 등' },
        { id: 48, question: '악성코드의 종류를 설명하시오.', answer: '바이러스, 웜, 트로이목마, 랜섬웨어, 스파이웨어' },
        { id: 49, question: '방화벽(Firewall)의 역할을 설명하시오.', answer: '외부 침입 차단, 네트워크 트래픽 필터링' },
        { id: 50, question: '진법 변환 문제: 10진수 13을 2진수로 변환하시오.', answer: '13 = 1101(2), 나누기 2 반복 후 나머지 역순 나열' },
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
            <span className="text-indigo-600 font-medium">PC 운영체제/기본상식</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-3xl">💻</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">PC 운영체제 / PC 기본상식</h1>
              <p className="text-indigo-100">2~3과목 통합 | 50문항 학습</p>
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
                  <div className="w-8 h-8 bg-indigo-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
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
                          <p className="text-sm text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg">💡 {q.answer}</p>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentPrompt(`워드프로세서 필기시험 "PC 운영체제/PC 기본상식" 과목 문제입니다.

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
                          className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-sm hover:bg-indigo-200 transition"
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
          <a href="/category/office/word-processor/study/word-theory" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 워드프로세싱 용어
          </a>
          <a href="/category/office/word-processor/study/word-practical" className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition">
            다음: 실기 연습 →
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
