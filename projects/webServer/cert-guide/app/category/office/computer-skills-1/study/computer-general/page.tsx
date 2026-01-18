'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function ComputerGeneralStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [progress, setProgress] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    const saved = localStorage.getItem('computer-skills-1-general-progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const newProgress = { ...progress, [id]: !progress[id] };
    setProgress(newProgress);
    localStorage.setItem('computer-skills-1-general-progress', JSON.stringify(newProgress));
  };

  const topics = [
    {
      title: '컴퓨터 시스템',
      questions: [
        { id: 1, question: 'CPU의 구성 요소와 각 역할을 설명하시오.', answer: '제어장치(명령어 해석), 연산장치(ALU, 산술/논리 연산), 레지스터(임시 저장)' },
        { id: 2, question: '폰 노이만 구조의 특징을 설명하시오.', answer: '프로그램 내장 방식, 순차적 명령 실행, CPU-메모리-I/O 구조' },
        { id: 3, question: 'RAM과 ROM의 차이점을 설명하시오.', answer: 'RAM: 휘발성, 읽기/쓰기 가능 / ROM: 비휘발성, 읽기 전용' },
        { id: 4, question: '캐시 메모리의 역할과 적중률을 설명하시오.', answer: 'CPU와 주기억장치 속도 차이 보완, 적중률=캐시 히트 수/전체 접근 수' },
        { id: 5, question: '가상 메모리(Virtual Memory)의 개념을 설명하시오.', answer: '보조기억장치를 주기억장치처럼 사용, 물리 메모리 한계 극복' },
        { id: 6, question: 'SSD와 HDD의 차이점을 설명하시오.', answer: 'SSD: 반도체, 빠름, 무소음 / HDD: 자기 디스크, 대용량, 저렴' },
        { id: 7, question: 'BIOS와 UEFI의 차이점을 설명하시오.', answer: 'UEFI: GUI 지원, 빠른 부팅, 2TB 이상 디스크 지원, 보안 부팅' },
        { id: 8, question: 'USB 3.0과 USB 2.0의 차이점을 설명하시오.', answer: 'USB 3.0: 5Gbps (USB 2.0의 10배), 파란색 단자' },
        { id: 9, question: '32비트와 64비트 시스템의 차이를 설명하시오.', answer: '64비트: 4GB 이상 RAM 사용 가능, 더 빠른 연산 처리' },
        { id: 10, question: '인터럽트(Interrupt)의 종류와 처리 과정을 설명하시오.', answer: '하드웨어/소프트웨어 인터럽트, 현재 작업 중단→ISR 실행→복귀' },
      ]
    },
    {
      title: '운영체제',
      questions: [
        { id: 11, question: '운영체제의 주요 기능 5가지를 나열하시오.', answer: '프로세스 관리, 메모리 관리, 파일 시스템, 장치 관리, 사용자 인터페이스' },
        { id: 12, question: '프로세스와 스레드의 차이를 설명하시오.', answer: '프로세스: 실행 중인 프로그램 / 스레드: 프로세스 내 실행 단위' },
        { id: 13, question: '교착상태(Deadlock)의 발생 조건 4가지를 설명하시오.', answer: '상호배제, 점유대기, 비선점, 순환대기' },
        { id: 14, question: 'FIFO, SJF, Round Robin 스케줄링 차이를 설명하시오.', answer: 'FIFO: 먼저 온 순서, SJF: 짧은 작업 먼저, RR: 시간 할당량' },
        { id: 15, question: '페이징(Paging)과 세그멘테이션의 차이를 설명하시오.', answer: '페이징: 고정 크기 분할 / 세그멘테이션: 가변 크기(논리적 단위)' },
        { id: 16, question: 'FAT32, NTFS, exFAT 파일 시스템을 비교하시오.', answer: 'FAT32: 4GB 파일 제한 / NTFS: 보안, 암호화 / exFAT: 대용량 USB' },
        { id: 17, question: 'Windows 레지스트리의 5가지 루트 키를 나열하시오.', answer: 'HKEY_CLASSES_ROOT, HKEY_CURRENT_USER, HKEY_LOCAL_MACHINE, HKEY_USERS, HKEY_CURRENT_CONFIG' },
        { id: 18, question: 'Windows 작업 관리자의 주요 탭과 기능을 설명하시오.', answer: '프로세스, 성능, 앱 기록, 시작프로그램, 사용자, 세부정보, 서비스' },
        { id: 19, question: '시스템 복원 지점의 용도와 생성 방법을 설명하시오.', answer: '시스템 문제 발생 시 이전 상태로 복구, 제어판→시스템→시스템 보호' },
        { id: 20, question: '안전 모드(Safe Mode)의 종류와 용도를 설명하시오.', answer: '일반/네트워킹/명령프롬프트 모드, 최소 드라이버로 부팅하여 문제 해결' },
      ]
    },
    {
      title: '네트워크',
      questions: [
        { id: 21, question: 'OSI 7계층을 순서대로 나열하고 역할을 설명하시오.', answer: '물리-데이터링크-네트워크-전송-세션-표현-응용' },
        { id: 22, question: 'TCP와 UDP의 차이점을 설명하시오.', answer: 'TCP: 연결형, 신뢰성 / UDP: 비연결형, 빠름 (실시간 스트리밍)' },
        { id: 23, question: 'IP 주소 클래스 A, B, C의 범위를 설명하시오.', answer: 'A: 0~127 / B: 128~191 / C: 192~223' },
        { id: 24, question: '서브넷 마스크 255.255.255.0의 의미를 설명하시오.', answer: '클래스 C, 앞 24비트는 네트워크, 뒤 8비트는 호스트 (254개 호스트)' },
        { id: 25, question: 'DNS의 역할과 동작 과정을 설명하시오.', answer: '도메인 이름→IP 주소 변환, 로컬→루트→TLD→권한 DNS 순서 질의' },
        { id: 26, question: 'DHCP의 역할을 설명하시오.', answer: '클라이언트에게 IP 주소, 서브넷, 게이트웨이, DNS 자동 할당' },
        { id: 27, question: 'HTTP와 HTTPS의 차이점을 설명하시오.', answer: 'HTTPS: SSL/TLS 암호화 적용, 포트 443 (HTTP는 80)' },
        { id: 28, question: 'MAC 주소와 IP 주소의 차이를 설명하시오.', answer: 'MAC: 물리적 주소(48비트, 변경불가) / IP: 논리적 주소(변경가능)' },
        { id: 29, question: '라우터와 스위치의 차이점을 설명하시오.', answer: '라우터: 네트워크 간 연결(L3) / 스위치: 같은 네트워크 연결(L2)' },
        { id: 30, question: 'VPN의 개념과 용도를 설명하시오.', answer: '가상 사설 네트워크, 암호화된 터널로 안전한 원격 접속' },
      ]
    },
    {
      title: '정보보안',
      questions: [
        { id: 31, question: '대칭키와 비대칭키 암호화의 차이를 설명하시오.', answer: '대칭키: 암호화/복호화 같은 키 / 비대칭키: 공개키+개인키 쌍' },
        { id: 32, question: '바이러스, 웜, 트로이목마의 차이를 설명하시오.', answer: '바이러스: 숙주 필요 / 웜: 자가복제 / 트로이목마: 정상 프로그램 위장' },
        { id: 33, question: '랜섬웨어의 특징과 대응 방법을 설명하시오.', answer: '파일 암호화 후 금전 요구, 백업/보안 업데이트/의심 파일 주의' },
        { id: 34, question: 'DDoS 공격의 원리를 설명하시오.', answer: '다수의 좀비 PC로 대량 트래픽 발생시켜 서버 마비' },
        { id: 35, question: '피싱(Phishing)과 스미싱(Smishing)을 설명하시오.', answer: '피싱: 가짜 사이트로 개인정보 탈취 / 스미싱: SMS 이용 피싱' },
        { id: 36, question: '방화벽(Firewall)의 역할을 설명하시오.', answer: '네트워크 트래픽 필터링, 허용/차단 규칙에 따라 접근 통제' },
        { id: 37, question: 'SSL/TLS 인증서의 역할을 설명하시오.', answer: '서버 신원 확인, 데이터 암호화, 무결성 보장' },
        { id: 38, question: '이중 인증(2FA)의 요소 3가지를 설명하시오.', answer: '지식(비밀번호), 소유(휴대폰), 생체(지문)' },
        { id: 39, question: '개인정보보호법의 주요 원칙을 설명하시오.', answer: '목적 명확화, 최소 수집, 처리 제한, 정확성, 안전성 확보' },
        { id: 40, question: '정보보안의 3요소(CIA)를 설명하시오.', answer: '기밀성(Confidentiality), 무결성(Integrity), 가용성(Availability)' },
      ]
    },
    {
      title: '멀티미디어와 최신 IT',
      questions: [
        { id: 41, question: 'JPEG, PNG, GIF 이미지 형식의 특징을 비교하시오.', answer: 'JPEG: 손실압축/사진 / PNG: 무손실/투명 / GIF: 256색/애니메이션' },
        { id: 42, question: 'MP3, AAC, FLAC 오디오 형식을 비교하시오.', answer: 'MP3/AAC: 손실압축 / FLAC: 무손실압축, 고음질' },
        { id: 43, question: 'H.264와 H.265(HEVC) 코덱의 차이를 설명하시오.', answer: 'H.265: H.264 대비 50% 압축률 향상, 4K/8K 영상용' },
        { id: 44, question: '클라우드 서비스 IaaS, PaaS, SaaS를 설명하시오.', answer: 'IaaS: 인프라 / PaaS: 플랫폼 / SaaS: 소프트웨어 제공' },
        { id: 45, question: 'IoT(사물인터넷)의 개념과 예시를 설명하시오.', answer: '사물에 센서/통신 기능 부여하여 인터넷 연결 (스마트홈, 웨어러블)' },
        { id: 46, question: '빅데이터의 3V를 설명하시오.', answer: 'Volume(규모), Velocity(속도), Variety(다양성)' },
        { id: 47, question: 'AI의 머신러닝과 딥러닝의 차이를 설명하시오.', answer: '머신러닝: 알고리즘 학습 / 딥러닝: 신경망 기반, 자동 특징 추출' },
        { id: 48, question: '블록체인의 핵심 특징을 설명하시오.', answer: '분산 원장, 변경 불가능, 투명성, 탈중앙화' },
        { id: 49, question: '5G 통신의 특징 3가지를 설명하시오.', answer: '초고속(20Gbps), 초저지연(1ms), 초연결(100만대/km²)' },
        { id: 50, question: 'AR(증강현실)과 VR(가상현실)의 차이를 설명하시오.', answer: 'AR: 현실+가상 합성 / VR: 완전한 가상 환경 몰입' },
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
            <a href="/category/office/computer-skills-1" className="text-gray-600 hover:text-blue-600">컴활 1급</a>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">컴퓨터 일반</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-3xl">🖥️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">컴퓨터 일반</h1>
              <p className="text-emerald-100">1과목 | 50문항 학습</p>
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
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {topicIndex + 1}
                  </div>
                  <span className="font-bold text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-500">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {openTopics.includes(topicIndex) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-lg border-2 transition ${progress[q.id] ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-transparent'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => saveProgress(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${progress[q.id] ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                        >
                          {progress[q.id] && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">💡 {q.answer}</p>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentPrompt(`컴퓨터활용능력 1급 필기시험 "컴퓨터 일반" 과목 문제입니다.

문제: ${q.question}

다음 순서로 상세히 설명해주세요:
1. 핵심 개념 정리
2. 상세 설명 (예시 포함)
3. 시험 출제 포인트
4. 관련 개념 연결
5. 연습문제 3개 (정답 포함)`);
                            setShowAIModal(true);
                          }}
                          className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-sm hover:bg-emerald-200 transition"
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

        <div className="mt-8 flex justify-between items-center">
          <a href="/category/office/computer-skills-1" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 메인으로</a>
          <a href="/category/office/computer-skills-1/study/spreadsheet" className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition">
            다음: 스프레드시트 일반 →
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
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
