'use client';

import { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Topic {
  id: string;
  name: string;
  color: string;
  questions: Question[];
}

export default function PracticalPage() {
  const [activeTopic, setActiveTopic] = useState<string>('cpu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<Record<string, number>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const topics: Topic[] = [
    {
      id: 'cpu',
      name: 'CPU/메모리 실무',
      color: 'from-cyan-500 to-cyan-400',
      questions: [
        { id: 1, question: '명령어 LOAD R1, 100(R2)에서 유효 주소 계산은? (R2=200)', options: ['100', '200', '300', '400'], answer: 2, explanation: '베이스 레지스터 방식: 유효 주소 = 100 + R2 = 100 + 200 = 300' },
        { id: 2, question: '4-way set associative 캐시, 전체 64블록, 주소 비트 12bit일 때 세트 수는?', options: ['4', '8', '16', '32'], answer: 2, explanation: '세트 수 = 전체 블록 / way 수 = 64 / 4 = 16세트' },
        { id: 3, question: '캐시 히트율 95%, 캐시 접근 시간 10ns, 메모리 접근 시간 100ns일 때 평균 접근 시간은?', options: ['14.5ns', '15ns', '19ns', '20ns'], answer: 0, explanation: '평균 = 0.95×10 + 0.05×(10+100) = 9.5 + 5.5 = 15ns (또는 0.95×10 + 0.05×100 = 14.5ns)' },
        { id: 4, question: '5단계 파이프라인에서 분기 예측 실패 시 페널티 사이클 수는?', options: ['1', '2', '3', '4'], answer: 3, explanation: '분기 명령이 EX 단계에서 결정되면 IF, ID, EX 3개 + 1 = 4사이클 손실 (구현에 따라 다름)' },
        { id: 5, question: 'RAID 5에서 4개 디스크, 각 100GB일 때 사용 가능 용량은?', options: ['200GB', '300GB', '400GB', '100GB'], answer: 1, explanation: 'RAID 5: (n-1)×용량 = (4-1)×100 = 300GB (1개 디스크분이 패리티)' }
      ]
    },
    {
      id: 'os',
      name: '운영체제 실무',
      color: 'from-blue-500 to-blue-400',
      questions: [
        { id: 1, question: 'SJF 스케줄링, 도착시간 P1(0,7), P2(2,4), P3(4,1), P4(5,4). P3의 대기시간은?', options: ['0', '3', '7', '11'], answer: 1, explanation: 'P1(0-7)실행, P3(7-8)실행→대기시간=7-4=3, P2(8-12), P4(12-16)' },
        { id: 2, question: 'LRU 페이지 교체, 참조열 7,0,1,2,0,3,0,4, 3프레임 초기 비어있음. 페이지 폴트 수는?', options: ['5', '6', '7', '8'], answer: 1, explanation: '7(F),0(F),1(F),2(F-7out),0(H),3(F-1out),0(H),4(F-2out) = 6번' },
        { id: 3, question: '페이지 크기 4KB, 가상주소 0x12345678의 페이지 번호는?', options: ['0x12345', '0x1234', '0x123456', '0x12345678'], answer: 0, explanation: '4KB=2^12, 하위 12비트가 오프셋. 페이지 번호 = 0x12345678 >> 12 = 0x12345' },
        { id: 4, question: 'SCAN 디스크 스케줄링, 현재 53, 요청 98,183,37,122,14,124,65,67, 헤드 증가방향. 총 이동거리는?', options: ['236', '208', '199', '331'], answer: 0, explanation: '53→65→67→98→122→124→183→37→14 = 130+169 = 약 236 (경계값에 따라 다름)' },
        { id: 5, question: '프로세스 상태: 5개 Ready, 3개 Waiting, 1개 Running. CPU 이용률 최대화를 위해 필요한 것은?', options: ['프로세스 추가', 'CPU 추가', 'I/O 장치 추가', '메모리 추가'], answer: 2, explanation: 'Waiting 프로세스가 있으므로 I/O 병목 가능성. I/O 장치 추가로 대기 감소 가능.' }
      ]
    },
    {
      id: 'network',
      name: '네트워크 실무',
      color: 'from-green-500 to-green-400',
      questions: [
        { id: 1, question: 'IP 주소 192.168.10.0/26의 서브넷 마스크와 호스트 수는?', options: ['255.255.255.192, 62개', '255.255.255.128, 126개', '255.255.255.224, 30개', '255.255.255.240, 14개'], answer: 0, explanation: '/26 = 255.255.255.192, 호스트 비트 6개, 사용 가능 호스트 = 2^6 - 2 = 62개' },
        { id: 2, question: '데이터 1000바이트, 오버헤드 100바이트, 전송률 10Mbps일 때 전송 시간은?', options: ['0.8ms', '0.88ms', '1ms', '1.1ms'], answer: 1, explanation: '총 크기 = 1100바이트 = 8800비트, 시간 = 8800/10,000,000 = 0.88ms' },
        { id: 3, question: 'CRC 생성 다항식 x³+x+1로 데이터 1101을 나눌 때 나머지는?', options: ['001', '010', '011', '100'], answer: 0, explanation: 'G(x)=1011, 데이터 1101000을 1011로 나누면 나머지 001' },
        { id: 4, question: 'Go-Back-N, 윈도우 크기 4, 시퀀스 번호 3비트. 송신 가능한 프레임 수는?', options: ['3', '4', '7', '8'], answer: 1, explanation: 'Go-Back-N에서 윈도우 크기는 2^n-1 이하여야 하지만, 여기서는 윈도우=4로 주어짐' },
        { id: 5, question: '100Mbps 이더넷, 프레임 크기 1500바이트, 처리율 80%일 때 초당 프레임 수는?', options: ['약 6,666', '약 8,333', '약 10,000', '약 5,333'], answer: 0, explanation: '실제 전송률 = 100×0.8 = 80Mbps, 프레임당 12000비트, 80M/12000 ≈ 6,666' }
      ]
    },
    {
      id: 'programming',
      name: '프로그래밍 실무',
      color: 'from-purple-500 to-purple-400',
      questions: [
        { id: 1, question: 'C 코드: int x=10; int *p=&x; *p=20; printf("%d",x); 출력값은?', options: ['10', '20', '주소값', '에러'], answer: 1, explanation: '포인터 p가 x를 가리키고, *p=20으로 x의 값이 20으로 변경됨' },
        { id: 2, question: '재귀함수 f(5) 호출: int f(int n){return n<=1?1:n*f(n-1);} 결과는?', options: ['5', '15', '120', '720'], answer: 2, explanation: 'f(5)=5×f(4)=5×4×f(3)=5×4×3×f(2)=5×4×3×2×f(1)=5×4×3×2×1=120 (팩토리얼)' },
        { id: 3, question: '버블 정렬로 [5,3,8,1,2]를 오름차순 정렬할 때 첫 번째 패스 후 결과는?', options: ['[3,5,1,2,8]', '[1,2,3,5,8]', '[3,5,8,1,2]', '[5,3,8,1,2]'], answer: 0, explanation: '버블 정렬 1회: 5↔3, 8>5 유지, 8↔1, 8↔2 → [3,5,1,2,8]' },
        { id: 4, question: '이진 탐색으로 [1,3,5,7,9,11,13]에서 9를 찾을 때 비교 횟수는?', options: ['1', '2', '3', '4'], answer: 1, explanation: '1차: mid=7(인덱스3), 9>7→오른쪽, 2차: mid=9(인덱스4), 찾음. 2회 비교' },
        { id: 5, question: '스택에 순서대로 A,B,C,D push 후 2번 pop, E push 후 2번 pop. 출력 순서는?', options: ['D,C,E,B', 'A,B,E,D', 'D,C,B,E', 'C,D,B,E'], answer: 0, explanation: 'ABCD push→pop D,C→stack: AB→E push→stack: ABE→pop E,B. 출력: D,C,E,B' }
      ]
    },
    {
      id: 'calc',
      name: '계산 문제',
      color: 'from-orange-500 to-orange-400',
      questions: [
        { id: 1, question: 'IEEE 754 단정도에서 지수 필드 10000010, 실제 지수값은?', options: ['2', '3', '130', '127'], answer: 1, explanation: '바이어스 127, 저장값 130(=10000010), 실제 지수 = 130 - 127 = 3' },
        { id: 2, question: '2의 보수로 표현된 8비트 11111011의 십진수 값은?', options: ['-5', '-4', '251', '-251'], answer: 0, explanation: '최상위 비트 1이므로 음수, 보수 취하면 00000100+1=00000101=5, 따라서 -5' },
        { id: 3, question: 'BCD로 표현된 0011 1001 0111의 십진수 값은?', options: ['397', '925', '0x397', '927'], answer: 0, explanation: 'BCD: 0011=3, 1001=9, 0111=7 → 397' },
        { id: 4, question: '해밍 코드 p1p2d1p4d2d3d4에서 데이터 1011을 인코딩하면?', options: ['0110011', '0111011', '1011011', '0011011'], answer: 1, explanation: 'd1=1,d2=0,d3=1,d4=1. p1=d1⊕d2⊕d4=1⊕0⊕1=0, p2=d1⊕d3⊕d4=1⊕1⊕1=1, p4=d2⊕d3⊕d4=0⊕1⊕1=0 → 0111011' },
        { id: 5, question: 'MIPS = 클럭주파수/(CPI×10^6). 클럭 2GHz, CPI 4일 때 MIPS는?', options: ['250', '500', '1000', '2000'], answer: 1, explanation: 'MIPS = 2×10^9 / (4×10^6) = 500 MIPS' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('co-practical-score');
    if (saved) setScore(JSON.parse(saved));
  }, []);

  const activeTpic = topics.find(t => t.id === activeTopic)!;
  const question = activeTpic.questions[currentQuestion];

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
    if (idx === question.answer) {
      const newScore = { ...score, [activeTopic]: (score[activeTopic] || 0) + 1 };
      setScore(newScore);
      localStorage.setItem('co-practical-score', JSON.stringify(newScore));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < activeTpic.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const nextTopicIdx = topics.findIndex(t => t.id === activeTopic) + 1;
      if (nextTopicIdx < topics.length) {
        setActiveTopic(topics[nextTopicIdx].id);
        setCurrentQuestion(0);
      }
    }
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const generateAIPrompt = () => {
    const prompt = `전자계산기조직응용기사 실기시험 "${activeTpic.name}" 주제에서 다음 문제를 풀이 과정과 함께 자세히 설명해주세요:

문제: ${question.question}

선택지:
${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}

정답: ${question.options[question.answer]}

단계별 풀이 과정, 관련 공식, 그리고 유사한 문제 유형에 대해 설명해주세요.`;
    setAiPrompt(prompt);
    setShowAIModal(true);
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCorrect = Object.values(score).reduce((sum, s) => sum + s, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-cyan-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-cyan-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/computer-organization" className="text-gray-600 hover:text-cyan-600">전자계산기조직응용기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">실기시험</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">✍️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">실기시험 문제풀이</h1>
              <p className="text-cyan-100">전자계산기조직응용기사 - 필답형 실무 문제</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">총 {totalQuestions}문항</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">정답 {totalCorrect}개</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">정답률 {totalQuestions > 0 ? Math.round(totalCorrect / totalQuestions * 100) : 0}%</span>
          </div>
        </div>
      </section>

      <div className="bg-white border-b sticky top-14 z-40 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex">
            {topics.map(topic => (
              <button key={topic.id} onClick={() => { setActiveTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-3 font-medium text-sm border-b-2 transition whitespace-nowrap ${activeTopic === topic.id ? 'border-cyan-500 text-cyan-600 bg-cyan-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {topic.name}
                <span className="ml-1 text-xs text-gray-400">({score[topic.id] || 0}/{topic.questions.length})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className={`bg-gradient-to-r ${activeTpic.color} text-white px-3 py-1 rounded-full text-sm`}>{activeTpic.name}</span>
            <span className="text-gray-500 text-sm">{currentQuestion + 1} / {activeTpic.questions.length}</span>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-6">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult} className={`w-full text-left p-4 rounded-lg border-2 transition ${showResult ? idx === question.answer ? 'border-green-500 bg-green-50' : idx === selectedAnswer ? 'border-red-500 bg-red-50' : 'border-gray-200' : selectedAnswer === idx ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50'}`}>
                <span className="font-medium mr-2">{idx + 1}.</span>
                {option}
              </button>
            ))}
          </div>
          {showResult && (
            <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`font-medium ${selectedAnswer === question.answer ? 'text-green-700' : 'text-red-700'}`}>
                {selectedAnswer === question.answer ? '✓ 정답입니다!' : `✗ 오답입니다. 정답: ${question.options[question.answer]}`}
              </p>
              <p className="text-gray-600 mt-2 text-sm">{question.explanation}</p>
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button onClick={generateAIPrompt} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition flex items-center gap-2">
              🤖 AI 풀이
            </button>
            <button onClick={nextQuestion} disabled={!showResult} className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
              다음 문제 →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="font-medium text-gray-800 mb-4">📊 학습 진도</h4>
          <div className="space-y-3">
            {topics.map(topic => (
              <div key={topic.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{topic.name}</span>
                  <span className="text-gray-500">{score[topic.id] || 0}/{topic.questions.length}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${topic.color} transition-all duration-300`} style={{ width: `${((score[topic.id] || 0) / topic.questions.length) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(aiPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
