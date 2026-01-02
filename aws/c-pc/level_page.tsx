'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, CheckCircle, Play, Clock, Code } from 'lucide-react';

// 레벨별 강의 데이터
const levelData: { [key: string]: {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgColor: string;
  days: number;
  description: string;
  features: string[];
  lessons: { day: number; title: string; duration: string; description: string; app: string }[];
}} = {
  '초급': {
    id: 'beginner',
    title: 'C언어 초급',
    subtitle: '문법 마스터 (15일)',
    icon: '🔷',
    color: 'from-blue-600 to-indigo-700',
    bgColor: 'bg-blue-600',
    days: 15,
    description: 'C언어 기초 문법부터 포인터, 배열까지. 프로그래밍의 기본기를 탄탄하게!',
    features: ['변수와 자료형', '조건문/반복문', '함수', '배열', '포인터 기초'],
    lessons: [
      { day: 1, title: 'Hello World & 기본 출력', duration: '30분', description: 'C언어 첫 실행, printf 기초', app: '자기소개 프로그램' },
      { day: 2, title: '변수와 자료형', duration: '40분', description: 'int, float, char, double', app: '변수 계산기' },
      { day: 3, title: '입력과 출력', duration: '35분', description: 'scanf, printf 서식 지정자', app: '사용자 정보 입력기' },
      { day: 4, title: '연산자', duration: '40분', description: '산술/비교/논리 연산자', app: '사칙연산 계산기' },
      { day: 5, title: '조건문 (if-else)', duration: '40분', description: '조건 분기, 중첩 조건문', app: '성적 등급 판정기' },
      { day: 6, title: '조건문 (switch)', duration: '35분', description: 'switch-case문', app: '요일 판별기' },
      { day: 7, title: '반복문 (for)', duration: '40분', description: 'for 루프, 중첩 반복문', app: '구구단 출력기' },
      { day: 8, title: '반복문 (while)', duration: '40분', description: 'while, do-while', app: '숫자 맞추기 게임' },
      { day: 9, title: '배열 기초', duration: '45분', description: '1차원 배열, 인덱스', app: '성적 관리 프로그램' },
      { day: 10, title: '문자열 처리', duration: '45분', description: 'char 배열, 문자열 함수', app: '문자열 분석기' },
      { day: 11, title: '함수 기초', duration: '40분', description: '함수 정의, 매개변수, 반환값', app: '함수형 계산기' },
      { day: 12, title: '함수 심화', duration: '45분', description: '재귀함수, 함수 포인터', app: '팩토리얼/피보나치' },
      { day: 13, title: '포인터 기초', duration: '50분', description: '포인터 개념, 주소 연산', app: '포인터 실습' },
      { day: 14, title: '포인터와 배열', duration: '50분', description: '배열과 포인터 관계', app: '배열 정렬 프로그램' },
      { day: 15, title: '초급 종합 프로젝트', duration: '60분', description: '모든 개념 통합', app: '학생 관리 시스템' },
    ]
  },
  '중급': {
    id: 'intermediate',
    title: 'C언어 중급',
    subtitle: '자료구조 & 파일 (30일)',
    icon: '🔶',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-500',
    days: 30,
    description: '구조체, 동적 메모리, 파일 처리, 자료구조까지. 실전 프로그래밍 능력 향상!',
    features: ['구조체/공용체', '동적 메모리', '파일 입출력', '연결 리스트', '스택/큐'],
    lessons: [
      { day: 16, title: '2차원 배열', duration: '45분', description: '다차원 배열 활용', app: '행렬 계산기' },
      { day: 17, title: '구조체 기초', duration: '45분', description: 'struct 정의와 사용', app: '학생 정보 관리' },
      { day: 18, title: '구조체 배열', duration: '45분', description: '구조체 배열 활용', app: '주소록 프로그램' },
      { day: 19, title: '구조체 포인터', duration: '50분', description: '구조체와 포인터', app: '연결된 데이터 처리' },
      { day: 20, title: '공용체와 열거형', duration: '40분', description: 'union, enum', app: '데이터 타입 변환기' },
      { day: 21, title: '동적 메모리 할당', duration: '50분', description: 'malloc, calloc, free', app: '동적 배열 관리' },
      { day: 22, title: '동적 메모리 심화', duration: '50분', description: 'realloc, 메모리 누수', app: '가변 크기 배열' },
      { day: 23, title: '파일 입출력 기초', duration: '45분', description: 'fopen, fclose, fprintf', app: '텍스트 파일 저장' },
      { day: 24, title: '파일 입출력 심화', duration: '50분', description: 'fread, fwrite, 바이너리', app: '바이너리 파일 처리' },
      { day: 25, title: '전처리기', duration: '40분', description: '#define, #include, 매크로', app: '매크로 유틸리티' },
      { day: 26, title: '헤더 파일 분리', duration: '45분', description: '모듈화, 헤더 가드', app: '모듈화된 프로젝트' },
      { day: 27, title: '비트 연산', duration: '45분', description: '비트 연산자, 플래그', app: '비트 플래그 시스템' },
      { day: 28, title: '연결 리스트 기초', duration: '55분', description: '단일 연결 리스트', app: '연결 리스트 구현' },
      { day: 29, title: '연결 리스트 심화', duration: '55분', description: '이중 연결 리스트', app: '이중 연결 리스트' },
      { day: 30, title: '스택 구현', duration: '50분', description: '배열/연결리스트 스택', app: '스택 계산기' },
      { day: 31, title: '큐 구현', duration: '50분', description: '원형 큐, 연결리스트 큐', app: '큐 시뮬레이터' },
      { day: 32, title: '정렬 알고리즘 1', duration: '50분', description: '버블, 선택, 삽입 정렬', app: '정렬 비교 프로그램' },
      { day: 33, title: '정렬 알고리즘 2', duration: '55분', description: '퀵소트, 머지소트', app: '고급 정렬 구현' },
      { day: 34, title: '검색 알고리즘', duration: '45분', description: '선형, 이진 검색', app: '검색 프로그램' },
      { day: 35, title: '해시 테이블', duration: '55분', description: '해시 함수, 충돌 처리', app: '해시 테이블 구현' },
      { day: 36, title: '트리 기초', duration: '55분', description: '이진 트리 개념', app: '이진 트리 구현' },
      { day: 37, title: '이진 탐색 트리', duration: '55분', description: 'BST 삽입, 삭제, 탐색', app: 'BST 구현' },
      { day: 38, title: '그래프 기초', duration: '50분', description: '인접 행렬, 인접 리스트', app: '그래프 표현' },
      { day: 39, title: '그래프 탐색', duration: '55분', description: 'DFS, BFS', app: '그래프 탐색기' },
      { day: 40, title: '문자열 알고리즘', duration: '50분', description: '패턴 매칭', app: '문자열 검색기' },
      { day: 41, title: '메모리 관리', duration: '45분', description: '메모리 구조, 디버깅', app: '메모리 분석 도구' },
      { day: 42, title: '에러 처리', duration: '40분', description: 'errno, 예외 처리', app: '에러 핸들링 시스템' },
      { day: 43, title: '라이브러리 활용', duration: '45분', description: 'stdlib, string, math', app: '수학 라이브러리 활용' },
      { day: 44, title: 'Makefile', duration: '45분', description: '빌드 자동화', app: 'Makefile 프로젝트' },
      { day: 45, title: '중급 종합 프로젝트', duration: '90분', description: '자료구조 활용 프로젝트', app: '도서 관리 시스템' },
    ]
  },
  '고급': {
    id: 'advanced',
    title: 'C언어 고급',
    subtitle: '시스템 & 네트워크 (45일)',
    icon: '🔴',
    color: 'from-red-600 to-purple-700',
    bgColor: 'bg-red-600',
    days: 45,
    description: '시스템 프로그래밍, 네트워크, 멀티스레딩까지. 전문 개발자로 도약!',
    features: ['시스템 콜', '프로세스/스레드', '소켓 프로그래밍', 'IPC', '임베디드 기초'],
    lessons: [
      { day: 46, title: '시스템 프로그래밍 개요', duration: '45분', description: 'POSIX, 시스템 콜', app: '시스템 정보 출력' },
      { day: 47, title: '파일 시스템 1', duration: '50분', description: 'open, read, write, close', app: '저수준 파일 처리' },
      { day: 48, title: '파일 시스템 2', duration: '50분', description: 'stat, 디렉토리 처리', app: '파일 탐색기' },
      { day: 49, title: '프로세스 기초', duration: '55분', description: 'fork, exec, wait', app: '프로세스 생성기' },
      { day: 50, title: '프로세스 관리', duration: '50분', description: 'PID, 프로세스 상태', app: '프로세스 모니터' },
      { day: 51, title: '시그널 처리', duration: '50분', description: 'signal, sigaction', app: '시그널 핸들러' },
      { day: 52, title: '파이프 통신', duration: '50분', description: 'pipe, 익명 파이프', app: '파이프 통신 예제' },
      { day: 53, title: '명명된 파이프', duration: '45분', description: 'FIFO, mkfifo', app: 'FIFO 통신' },
      { day: 54, title: '공유 메모리', duration: '55분', description: 'shmget, shmat', app: '공유 메모리 IPC' },
      { day: 55, title: '메시지 큐', duration: '50분', description: 'msgget, msgsnd, msgrcv', app: '메시지 큐 시스템' },
      { day: 56, title: '세마포어', duration: '55분', description: 'semget, semop', app: '동기화 예제' },
      { day: 57, title: '스레드 기초', duration: '55분', description: 'pthread_create, join', app: '멀티스레드 프로그램' },
      { day: 58, title: '스레드 동기화', duration: '55분', description: 'mutex, 조건 변수', app: '생산자-소비자' },
      { day: 59, title: '스레드 풀', duration: '50분', description: '스레드 풀 구현', app: '스레드 풀 서버' },
      { day: 60, title: '네트워크 기초', duration: '45분', description: 'TCP/IP, 소켓 개념', app: '네트워크 개념 정리' },
      { day: 61, title: 'TCP 서버', duration: '55분', description: 'socket, bind, listen', app: 'TCP 에코 서버' },
      { day: 62, title: 'TCP 클라이언트', duration: '50분', description: 'connect, send, recv', app: 'TCP 클라이언트' },
      { day: 63, title: 'UDP 통신', duration: '50분', description: 'sendto, recvfrom', app: 'UDP 채팅' },
      { day: 64, title: '멀티클라이언트 서버', duration: '60분', description: 'fork/thread 서버', app: '다중 클라이언트 서버' },
      { day: 65, title: 'select/poll', duration: '55분', description: 'I/O 다중화', app: 'select 서버' },
      { day: 66, title: 'epoll', duration: '55분', description: 'epoll 기반 서버', app: 'epoll 서버' },
      { day: 67, title: 'HTTP 프로토콜', duration: '50분', description: 'HTTP 요청/응답 파싱', app: 'HTTP 파서' },
      { day: 68, title: '간단한 웹서버', duration: '60분', description: 'HTTP 서버 구현', app: '미니 웹서버' },
      { day: 69, title: '데이터 직렬화', duration: '50분', description: '바이너리 프로토콜', app: '프로토콜 구현' },
      { day: 70, title: '암호화 기초', duration: '50분', description: 'XOR, 간단한 암호화', app: '암호화 유틸' },
      { day: 71, title: '메모리 매핑', duration: '50분', description: 'mmap, 메모리 매핑 파일', app: '대용량 파일 처리' },
      { day: 72, title: '동적 라이브러리', duration: '50분', description: 'dlopen, dlsym', app: '플러그인 시스템' },
      { day: 73, title: '디버깅 기법', duration: '45분', description: 'gdb, valgrind', app: '디버깅 실습' },
      { day: 74, title: '성능 최적화', duration: '50분', description: '프로파일링, 최적화', app: '성능 분석' },
      { day: 75, title: '임베디드 기초', duration: '50분', description: '크로스 컴파일, 기본 개념', app: '임베디드 Hello World' },
      { day: 76, title: 'GPIO 제어', duration: '55분', description: 'LED, 버튼 제어', app: 'GPIO 프로그램' },
      { day: 77, title: 'UART 통신', duration: '55분', description: '시리얼 통신', app: 'UART 터미널' },
      { day: 78, title: 'I2C 통신', duration: '55분', description: 'I2C 프로토콜', app: 'I2C 센서 읽기' },
      { day: 79, title: 'SPI 통신', duration: '55분', description: 'SPI 프로토콜', app: 'SPI 디바이스 제어' },
      { day: 80, title: '타이머/인터럽트', duration: '55분', description: '타이머, 인터럽트 처리', app: '타이머 프로그램' },
      { day: 81, title: 'ADC/DAC', duration: '50분', description: '아날로그 변환', app: '아날로그 센서 읽기' },
      { day: 82, title: 'PWM 제어', duration: '50분', description: 'PWM 출력', app: 'LED 밝기/모터 제어' },
      { day: 83, title: 'RTOS 개념', duration: '50분', description: '실시간 OS 기초', app: 'RTOS 태스크' },
      { day: 84, title: '커널 모듈 기초', duration: '55분', description: 'Linux 커널 모듈', app: 'Hello 커널 모듈' },
      { day: 85, title: '디바이스 드라이버', duration: '60분', description: 'Character 드라이버', app: '간단한 드라이버' },
      { day: 86, title: '코드 품질', duration: '45분', description: '코딩 표준, 정적 분석', app: '코드 리뷰 도구' },
      { day: 87, title: '최종 프로젝트 설계', duration: '60분', description: '요구사항, 설계', app: '채팅 서버 - 설계' },
      { day: 88, title: '최종 프로젝트 서버', duration: '90분', description: '멀티스레드 서버', app: '채팅 서버 - 서버' },
      { day: 89, title: '최종 프로젝트 클라이언트', duration: '90분', description: '클라이언트 구현', app: '채팅 서버 - 클라이언트' },
      { day: 90, title: '최종 프로젝트 완성', duration: '60분', description: '테스트, 문서화', app: '채팅 서버 - 완성' },
    ]
  }
};

export default function CLangLevelPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const levelInfo = levelData[level];

  const [userName, setUserName] = useState('사용자');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }

    const saved = localStorage.getItem(`c-pc-${level}-completed`);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, [level]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!levelInfo) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">레벨을 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-4">초급, 중급, 고급 중 선택해주세요.</p>
          <Link href="/courses" className="text-blue-600 hover:underline">
            강좌 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const progress = levelInfo.lessons.length > 0
    ? Math.round((completedDays.filter(d => levelInfo.lessons.some(l => l.day === d)).length / levelInfo.lessons.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">내 강의</Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-700">
                <span className="text-gray-300">안녕하세요, {userName}님!</span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white transition px-3 py-2">로그아웃</button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/courses" className="block text-gray-300 hover:text-white px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="block bg-yellow-400 text-slate-900 px-3 py-2 rounded-lg font-semibold">내 강의</Link>
            </div>
          )}
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/courses" className="hover:text-gray-700">강좌 목록</Link>
          <ChevronRight className="w-4 h-4" />
          <span>코딩</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">C언어 (PC) - {level}</span>
        </div>

        {/* 코스 헤더 */}
        <div className={`bg-gradient-to-r ${levelInfo.color} rounded-2xl p-8 mb-8 text-white`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{levelInfo.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{levelInfo.title}</h1>
              <p className="text-white/80">{levelInfo.subtitle}</p>
            </div>
          </div>
          <p className="text-lg text-white/90 mb-6">{levelInfo.description}</p>

          {/* 특징 태그 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {levelInfo.features.map((feature, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {feature}
              </span>
            ))}
          </div>

          {/* 진행률 */}
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>학습 진행률</span>
              <span>{progress}% ({completedDays.filter(d => levelInfo.lessons.some(l => l.day === d)).length}/{levelInfo.lessons.length}일)</span>
            </div>
            <div className="h-3 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 레벨 선택 탭 */}
        <div className="flex gap-2 mb-6">
          {Object.keys(levelData).map((lvl) => (
            <Link
              key={lvl}
              href={`/course/coding/c-pc/${lvl}`}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                lvl === level
                  ? `${levelData[lvl].bgColor} text-white`
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {levelData[lvl].icon} {lvl} ({levelData[lvl].days}일)
            </Link>
          ))}
        </div>

        {/* 학습 방법 안내 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-yellow-900 mb-2">📚 학습 방법</h3>
          <ol className="text-yellow-800 text-sm space-y-1">
            <li>1. 각 Day의 프롬프트를 Claude/Gemini/ChatGPT에 입력</li>
            <li>2. AI가 생성한 코드를 파일별로 저장</li>
            <li>3. VSCode에서 컴파일 후 실행 (gcc main.c -o main && ./main)</li>
            <li>4. 코드를 이해하고 수정해보기</li>
          </ol>
        </div>

        {/* 강의 목록 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className={`p-4 bg-gradient-to-r ${levelInfo.color}`}>
            <h2 className="font-bold text-white flex items-center gap-2">
              <Play className="w-5 h-5" />
              {level} 강의 목록 ({levelInfo.lessons.length}일)
            </h2>
          </div>
          <div className="divide-y">
            {levelInfo.lessons.map((lesson) => {
              const isCompleted = completedDays.includes(lesson.day);
              return (
                <Link
                  key={lesson.day}
                  href={`/course/coding/c-pc/${level}/lesson/${lesson.day}`}
                  className="block p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : `bg-gradient-to-br ${levelInfo.color} text-white`
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-bold text-sm">{lesson.day}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          Day {lesson.day}: {lesson.title}
                        </h3>
                        {isCompleted && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            완료
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{lesson.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Code className="w-3 h-3" />
                          {lesson.app}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Edu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
