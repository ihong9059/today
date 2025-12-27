'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  Brain,
  Menu,
  X,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Target,
  Lock,
  ShoppingCart,
  Copy,
  ExternalLink,
  Download,
  Save,
  MessageSquare,
  Sparkles,
  BookOpen,
  Play,
  Circle,
  CheckCircle2,
  Cpu
} from 'lucide-react';

// 수강 신청 데이터
const enrollmentData: Record<string, string[]> = {
  'test@test.com': ['esp32-arduino'],
};

// 강좌 정보
const courseInfo: Record<string, { title: string; price: number }> = {
  'esp32-arduino': { title: 'ESP32 Arduino IoT', price: 99000 },
};

// 무료 AI 목록
const aiServices = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'bg-green-500 hover:bg-green-600', icon: '🤖' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/', color: 'bg-orange-500 hover:bg-orange-600', icon: '🧠' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/', color: 'bg-blue-500 hover:bg-blue-600', icon: '✨' },
  { id: 'copilot', name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'bg-purple-500 hover:bg-purple-600', icon: '💡' },
];

// 포트설명서 참조 안내 문구
const PORT_SPEC_NOTICE = `

※ 첨부한 "ESP32_교육보드_포트설명서.md" 파일을 참고하여 핀 번호와 제어 방법을 확인하세요.`;

// ============================================
// ESP32 Arduino Day별 레슨 데이터 (AI 학습법 적용)
// ============================================
const lessonDataByDay: Record<number, any> = {
  // ============================================
  // Day 1: ESP32 소개와 개발환경 설정
  // ============================================
  1: {
    day: 1,
    title: 'ESP32 소개와 개발환경 설정',
    subtitle: 'ESP32의 특징을 이해하고, Arduino IDE를 설치하여 첫 프로그램을 실행합니다.',
    videoId: '4IkqT89qei0',  // 진행방법 동영상 ID
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'ESP32와 Arduino 이해하기',
        description: 'ESP32 마이크로컨트롤러의 특징과 Arduino 프로그래밍 개념을 이해합니다.',
        prompt: `ESP32 마이크로컨트롤러에 대해 설명해줘.
- ESP32가 무엇인지
- 왜 Arduino IDE를 사용하는지
- ESP32로 어떤 것들을 만들 수 있는지
초보자가 이해하기 쉽게 설명해줘.`,
        expectedKeywords: ['마이크로컨트롤러', 'Wi-Fi', '블루투스', 'GPIO'],
        quiz: {
          question: 'ESP32에 내장된 통신 기능이 아닌 것은?',
          options: ['Wi-Fi', '블루투스', 'LoRa', '둘 다 내장'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '시리얼 모니터로 "Hello ESP32" 출력하기',
        description: 'Serial.println()을 사용해서 시리얼 모니터에 메시지를 출력합니다.',
        prompt: `ESP32에서 시리얼 모니터에 "Hello ESP32!"를 출력하는 Arduino 코드를 만들어줘.

요구사항:
1. setup() 함수에서 Serial.begin(115200)으로 시리얼 통신 시작
2. "Hello ESP32!" 메시지 출력
3. 1초마다 "ESP32 is running..."을 반복 출력
4. 코드에 주석으로 각 줄의 의미를 설명해줘` + PORT_SPEC_NOTICE,
        expectedKeywords: ['Serial.begin', 'Serial.println', 'setup', 'loop'],
        quiz: {
          question: 'ESP32에서 시리얼 통신 속도로 주로 사용하는 값은?',
          options: ['9600', '115200', '19200', '4800'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '변수 사용하기',
        description: '변수에 값을 저장하고 시리얼 모니터에 출력합니다.',
        prompt: `ESP32에서 변수를 사용하는 Arduino 코드를 만들어줘.

요구사항:
1. 정수형 변수 count를 0으로 초기화
2. 1초마다 count를 1씩 증가
3. 시리얼 모니터에 "Count: X" 형식으로 출력
4. count가 10이 되면 "10번 도달!" 메시지 출력
5. 각 코드에 주석 달아줘` + PORT_SPEC_NOTICE,
        expectedKeywords: ['int', '변수', '++', 'if'],
        quiz: {
          question: 'Arduino에서 정수형 변수를 선언할 때 사용하는 키워드는?',
          options: ['number', 'integer', 'int', 'num'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 2, title: 'LED 제어하기 - digitalWrite' },
  },

  // ============================================
  // Day 2: LED 제어 기초 - digitalWrite
  // ============================================
  2: {
    day: 2,
    title: 'LED 제어하기 - digitalWrite',
    subtitle: 'GPIO와 디지털 출력을 이해하고, LED를 제어합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'GPIO와 pinMode 이해하기',
        description: 'GPIO 핀의 개념과 pinMode() 함수를 이해합니다.',
        prompt: `Arduino에서 GPIO와 pinMode에 대해 설명해줘.

설명해야 할 내용:
1. GPIO(General Purpose Input/Output)가 무엇인지
2. pinMode() 함수의 역할과 사용법
3. OUTPUT과 INPUT 모드의 차이
4. ESP32 교육보드의 LED 핀 번호 (빨강:25, 노랑:26, 파랑:27)

초보자가 이해하기 쉽게 설명해줘.`,
        expectedKeywords: ['GPIO', 'pinMode', 'OUTPUT', 'INPUT'],
        quiz: {
          question: 'LED를 제어하려면 핀 모드를 어떻게 설정해야 하나요?',
          options: ['INPUT', 'OUTPUT', 'ANALOG', 'SERIAL'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '빨강 LED 깜빡이기',
        description: 'digitalWrite()로 LED를 켜고 끄는 코드를 작성합니다.',
        prompt: `ESP32에서 빨강 LED를 1초 간격으로 깜빡이는 코드를 만들어줘.

요구사항:
1. 빨강 LED 핀은 GPIO 25번 사용
2. #define으로 핀 번호 정의
3. setup()에서 pinMode로 출력 설정
4. loop()에서 1초 켜고, 1초 끄기 반복
5. digitalWrite() 함수 사용
6. 각 줄에 주석으로 설명 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['digitalWrite', 'HIGH', 'LOW', 'delay'],
        quiz: {
          question: 'LED를 켜려면 digitalWrite의 두 번째 인자를 무엇으로 해야 하나요?',
          options: ['ON', 'HIGH', '1', 'TRUE'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '신호등 패턴 만들기',
        description: '3색 LED로 신호등처럼 순차 점등합니다.',
        prompt: `ESP32에서 3색 LED로 신호등 패턴을 만드는 코드를 작성해줘.

요구사항:
1. LED 핀: 빨강(25), 노랑(26), 파랑(27)
2. #define으로 각 핀 번호 정의
3. 신호등 순서: 빨강 2초 → 노랑 1초 → 파랑 2초 → 반복
4. 한 번에 하나의 LED만 켜지도록
5. 각 단계에서 시리얼 모니터에 현재 색상 출력
6. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['LED_RED', 'LED_YELLOW', 'LED_BLUE', 'digitalWrite'],
        quiz: {
          question: 'ESP32 교육보드에서 노랑 LED는 몇 번 핀인가요?',
          options: ['25', '26', '27', '33'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 3, title: 'LED 밝기 제어 - PWM' },
  },

  // ============================================
  // Day 3: LED 밝기 제어 - PWM
  // ============================================
  3: {
    day: 3,
    title: 'LED 밝기 제어 - PWM',
    subtitle: 'PWM의 개념을 이해하고 LED 밝기를 조절합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'PWM의 개념 이해하기',
        description: 'PWM과 듀티 사이클의 개념을 학습합니다.',
        prompt: `PWM(Pulse Width Modulation)에 대해 설명해줘.

설명해야 할 내용:
1. PWM이 무엇인지
2. 듀티 사이클(Duty Cycle)이란
3. PWM으로 LED 밝기를 조절하는 원리
4. analogWrite() 함수의 값 범위 (0~255)

초보자가 이해하기 쉽게 비유를 들어 설명해줘.`,
        expectedKeywords: ['PWM', 'Duty Cycle', 'analogWrite', '0~255'],
        quiz: {
          question: 'analogWrite(pin, 127)을 실행하면 LED 밝기는 어떻게 되나요?',
          options: ['꺼짐', '최대 밝기', '약 50% 밝기', '깜빡임'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: 'LED 페이드 인/아웃',
        description: 'LED가 천천히 밝아졌다 어두워지는 효과를 만듭니다.',
        prompt: `ESP32에서 빨강 LED를 페이드 인/아웃 하는 코드를 만들어줘.

요구사항:
1. 빨강 LED 핀은 GPIO 25번
2. for문으로 0부터 255까지 밝기 증가 (페이드 인)
3. for문으로 255부터 0까지 밝기 감소 (페이드 아웃)
4. 각 단계에서 10ms 딜레이
5. analogWrite() 함수 사용
6. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['analogWrite', 'for', '255', 'delay'],
        quiz: {
          question: 'LED를 최대 밝기로 켜려면 analogWrite의 값을 얼마로 해야 하나요?',
          options: ['100', '127', '200', '255'],
          correctAnswer: 3,
        },
      },
      {
        id: 3,
        title: '숨쉬기 효과 만들기',
        description: '3색 LED가 순서대로 숨쉬는 효과를 만듭니다.',
        prompt: `ESP32에서 3색 LED가 순서대로 숨쉬는 효과를 만드는 코드를 작성해줘.

요구사항:
1. LED 핀: 빨강(25), 노랑(26), 파랑(27)
2. 각 LED가 천천히 밝아졌다가 어두워지는 숨쉬기 효과
3. 빨강 → 노랑 → 파랑 순서로 진행
4. sin() 함수를 사용해서 부드러운 곡선 효과 (선택)
5. 또는 for문으로 간단하게 구현
6. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['analogWrite', 'for', 'LED_RED', 'LED_YELLOW', 'LED_BLUE'],
        quiz: {
          question: 'PWM 값이 0일 때 LED는 어떤 상태인가요?',
          options: ['최대 밝기', '50% 밝기', '꺼짐', '깜빡임'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 4, title: '스위치 입력 - digitalRead' },
  },

  // ============================================
  // Day 4: 스위치 입력 - digitalRead
  // ============================================
  4: {
    day: 4,
    title: '스위치 입력 - digitalRead',
    subtitle: '버튼 입력을 읽어서 LED를 제어합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'digitalRead와 입력 모드 이해하기',
        description: '디지털 입력과 풀업/풀다운 저항의 개념을 학습합니다.',
        prompt: `Arduino에서 디지털 입력과 digitalRead()에 대해 설명해줘.

설명해야 할 내용:
1. digitalRead() 함수의 역할과 반환값 (HIGH/LOW)
2. 풀업 저항과 풀다운 저항이란
3. INPUT과 INPUT_PULLUP 모드의 차이
4. ESP32 교육보드의 스위치 핀 번호 (GPIO 32)

초보자가 이해하기 쉽게 설명해줘.`,
        expectedKeywords: ['digitalRead', 'HIGH', 'LOW', 'INPUT'],
        quiz: {
          question: '버튼이 눌리지 않았을 때 INPUT_PULLUP 모드에서 읽히는 값은?',
          options: ['HIGH', 'LOW', '0', 'NULL'],
          correctAnswer: 0,
        },
      },
      {
        id: 2,
        title: '버튼으로 LED 켜기',
        description: '버튼을 누르면 LED가 켜지는 코드를 작성합니다.',
        prompt: `ESP32에서 버튼을 누르면 빨강 LED가 켜지는 코드를 만들어줘.

요구사항:
1. 스위치 핀: GPIO 32번
2. 빨강 LED 핀: GPIO 25번
3. 스위치는 INPUT 모드로 설정
4. 버튼을 누르면(HIGH) LED 켜기
5. 버튼을 떼면(LOW) LED 끄기
6. if문 사용
7. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['digitalRead', 'SWITCH', 'if', 'digitalWrite'],
        quiz: {
          question: 'ESP32 교육보드의 스위치는 몇 번 핀인가요?',
          options: ['25', '32', '33', '14'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '버튼으로 LED 색상 순환하기',
        description: '버튼을 누를 때마다 LED 색상이 바뀌는 코드를 만듭니다.',
        prompt: `ESP32에서 버튼을 누를 때마다 LED 색상이 순환하는 코드를 만들어줘.

요구사항:
1. 스위치 핀: GPIO 32번
2. LED 핀: 빨강(25), 노랑(26), 파랑(27)
3. 버튼을 누를 때마다: 빨강 → 노랑 → 파랑 → 빨강...
4. 디바운싱을 위해 버튼 상태 변화 감지
5. 변수로 현재 색상 상태 저장
6. 시리얼 모니터에 현재 색상 출력
7. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['digitalRead', 'state', 'if', '색상'],
        quiz: {
          question: '디바운싱(Debouncing)이 필요한 이유는?',
          options: ['LED를 밝게 하기 위해', '버튼의 떨림을 방지하기 위해', '전력을 절약하기 위해', 'Wi-Fi 연결을 위해'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 5, title: '부저 제어 - tone()' },
  },

  // ============================================
  // Day 5: 부저 제어 - tone()
  // ============================================
  5: {
    day: 5,
    title: '부저 제어 - tone()',
    subtitle: '부저로 소리와 멜로디를 연주합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '주파수와 음계 이해하기',
        description: '소리의 주파수와 음계의 관계를 학습합니다.',
        prompt: `소리의 주파수와 음계에 대해 설명해줘.

설명해야 할 내용:
1. 주파수(Hz)와 소리의 높낮이 관계
2. 도레미파솔라시도 각 음의 주파수
3. tone() 함수의 사용법
4. ESP32 교육보드의 부저 핀 (BEEP:14, MELODY:33)

음계 주파수 표도 함께 알려줘.`,
        expectedKeywords: ['주파수', 'Hz', 'tone', '음계'],
        quiz: {
          question: '도(C4)의 주파수는 약 몇 Hz인가요?',
          options: ['100 Hz', '262 Hz', '440 Hz', '1000 Hz'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '도레미파솔라시도 연주하기',
        description: '부저로 음계를 순서대로 연주합니다.',
        prompt: `ESP32에서 부저로 도레미파솔라시도를 연주하는 코드를 만들어줘.

요구사항:
1. 멜로디 부저 핀: GPIO 33번
2. 음계 주파수 배열 정의 (도:262, 레:294, 미:330, 파:349, 솔:392, 라:440, 시:494, 도:523)
3. tone() 함수로 각 음 연주
4. 각 음은 500ms 동안 연주
5. 음 사이에 100ms 쉬기
6. 전체 연주 후 2초 대기 후 반복
7. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['tone', 'melody', '262', '523'],
        quiz: {
          question: 'ESP32 교육보드의 멜로디 부저는 몇 번 핀인가요?',
          options: ['14', '25', '32', '33'],
          correctAnswer: 3,
        },
      },
      {
        id: 3,
        title: '학교종 멜로디 만들기',
        description: '학교종 노래를 부저로 연주합니다.',
        prompt: `ESP32에서 "학교종이 땡땡땡" 멜로디를 연주하는 코드를 만들어줘.

요구사항:
1. 멜로디 부저 핀: GPIO 33번
2. 학교종 악보: 솔솔라라 솔솔미, 솔솔미미 레
3. 음계 주파수: 도262, 레294, 미330, 파349, 솔392, 라440
4. 음표 길이도 배열로 정의
5. for문으로 멜로디 연주
6. noTone()으로 음 사이 끊기
7. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['tone', 'noTone', 'melody', 'duration'],
        quiz: {
          question: '부저 소리를 멈추는 함수는?',
          options: ['stopTone()', 'noTone()', 'endTone()', 'silentTone()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 6, title: '입출력 통합 실습' },
  },

  // ============================================
  // Day 6: 입출력 통합 실습
  // ============================================
  6: {
    day: 6,
    title: '입출력 통합 실습',
    subtitle: '스위치, LED, 부저를 연동하는 프로그램을 만듭니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '버튼 누르면 LED와 부저 동시에 작동',
        description: '버튼 입력으로 LED와 부저를 함께 제어합니다.',
        prompt: `ESP32에서 버튼을 누르면 LED가 켜지고 부저가 울리는 코드를 만들어줘.

요구사항:
1. 스위치 핀: GPIO 32번
2. 빨강 LED 핀: GPIO 25번
3. 비프 부저 핀: GPIO 14번
4. 버튼을 누르면: LED 켜짐 + 비프음(100ms)
5. 버튼을 떼면: LED 꺼짐
6. 비프음은 1000Hz로 100ms만 울리기
7. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['digitalRead', 'digitalWrite', 'tone', 'SWITCH'],
        quiz: {
          question: 'ESP32 교육보드의 비프 부저는 몇 번 핀인가요?',
          options: ['14', '25', '32', '33'],
          correctAnswer: 0,
        },
      },
      {
        id: 2,
        title: '간단한 알람 시스템',
        description: '버튼으로 알람을 설정하고 해제하는 시스템을 만듭니다.',
        prompt: `ESP32로 간단한 알람 시스템을 만들어줘.

요구사항:
1. 버튼을 짧게 누르면: 알람 ON/OFF 토글
2. 알람 ON 상태: 파랑 LED 깜빡임
3. 알람 OFF 상태: 모든 LED 꺼짐
4. 알람 ON에서 버튼 길게 누르면(2초): 경고음 + 빨강 LED
5. 상태 변수로 알람 상태 관리
6. 시리얼 모니터에 상태 출력
7. 코드에 주석 추가

핀 정보:
- 스위치: 32, LED: 빨강25/노랑26/파랑27, 부저: 14(비프)/33(멜로디)`,
        expectedKeywords: ['state', 'toggle', 'millis', 'alarm'],
        quiz: {
          question: '버튼을 길게 눌렀는지 감지하려면 어떤 함수가 유용한가요?',
          options: ['delay()', 'millis()', 'wait()', 'hold()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '반응 속도 테스트 게임',
        description: '랜덤하게 LED가 켜지면 버튼을 누르는 게임을 만듭니다.',
        prompt: `ESP32로 반응 속도 테스트 게임을 만들어줘.

게임 규칙:
1. 랜덤한 시간(1~3초) 후에 빨강 LED가 켜짐
2. LED가 켜지면 최대한 빨리 버튼 누르기
3. 반응 시간을 시리얼 모니터에 표시
4. 성공하면 짧은 성공음, 실패하면(3초 초과) 실패음
5. 5라운드 진행 후 평균 반응 시간 표시

핀 정보:
- 스위치: 32, LED: 빨강25, 부저: 33(멜로디)

random() 함수와 millis() 함수를 사용해줘.`,
        expectedKeywords: ['random', 'millis', '반응시간', 'game'],
        quiz: {
          question: 'Arduino에서 랜덤 숫자를 생성하는 함수는?',
          options: ['rand()', 'random()', 'getRandom()', 'Math.random()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 7, title: 'I2C 통신과 OLED 디스플레이' },
  },

  // ============================================
  // Day 7: I2C 통신과 OLED 디스플레이
  // ============================================
  7: {
    day: 7,
    title: 'I2C 통신과 OLED 디스플레이',
    subtitle: 'I2C 통신을 이해하고 OLED에 텍스트를 출력합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'I2C 통신 이해하기',
        description: 'I2C 통신의 원리와 특징을 학습합니다.',
        prompt: `I2C 통신에 대해 설명해줘.

설명해야 할 내용:
1. I2C 통신이란 무엇인지
2. SDA(데이터), SCL(클럭) 핀의 역할
3. I2C 주소란 무엇인지
4. 여러 장치를 연결할 수 있는 이유
5. ESP32 교육보드의 I2C 핀 (SDA:21, SCL:22)

초보자가 이해하기 쉽게 비유를 들어 설명해줘.`,
        expectedKeywords: ['I2C', 'SDA', 'SCL', '주소'],
        quiz: {
          question: 'I2C 통신에서 데이터를 전송하는 핀은?',
          options: ['SCL', 'SDA', 'TX', 'RX'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'OLED에 텍스트 출력하기',
        description: 'OLED 디스플레이에 Hello를 표시합니다.',
        prompt: `ESP32에서 OLED 디스플레이에 텍스트를 출력하는 코드를 만들어줘.

요구사항:
1. I2C 핀: SDA(21), SCL(22)
2. OLED: 128x64 픽셀, 주소 0x3C
3. Adafruit_SSD1306 라이브러리 사용
4. "Hello!" 와 "ESP32" 두 줄 출력
5. 텍스트 크기 2로 설정
6. Wire.begin()으로 I2C 초기화
7. 코드에 주석 추가

필요한 라이브러리 설치 방법도 알려줘.`,
        expectedKeywords: ['Wire', 'Adafruit_SSD1306', 'display', '0x3C'],
        quiz: {
          question: 'ESP32 교육보드의 I2C SDA 핀은 몇 번인가요?',
          options: ['19', '21', '22', '23'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '내 이름과 카운터 표시하기',
        description: 'OLED에 이름과 숫자 카운터를 표시합니다.',
        prompt: `ESP32에서 OLED에 이름과 카운터를 표시하는 코드를 만들어줘.

요구사항:
1. 첫 줄: "UTTEC Lab" (텍스트 크기 2)
2. 둘째 줄: "Count: X" (X는 0부터 시작)
3. 1초마다 카운트 증가
4. 카운트가 100이 되면 0으로 리셋
5. 화면 업데이트: clearDisplay() → 텍스트 → display()
6. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['clearDisplay', 'setCursor', 'println', 'display'],
        quiz: {
          question: 'OLED 화면을 지우는 함수는?',
          options: ['clear()', 'clearDisplay()', 'reset()', 'erase()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 8, title: 'OLED 그래픽과 애니메이션' },
  },

  // ============================================
  // Day 8: OLED 그래픽과 애니메이션
  // ============================================
  8: {
    day: 8,
    title: 'OLED 그래픽과 애니메이션',
    subtitle: 'OLED에 도형을 그리고 애니메이션을 만듭니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'OLED 좌표계와 도형 그리기',
        description: 'OLED의 좌표계를 이해하고 기본 도형을 그립니다.',
        prompt: `OLED 디스플레이의 좌표계와 도형 그리기 함수에 대해 설명해줘.

설명해야 할 내용:
1. OLED 좌표계 (128x64, 왼쪽 상단이 0,0)
2. 점 그리기: drawPixel(x, y, color)
3. 선 그리기: drawLine(x1, y1, x2, y2, color)
4. 사각형: drawRect(), fillRect()
5. 원: drawCircle(), fillCircle()
6. 삼각형: drawTriangle(), fillTriangle()

각 함수의 파라미터도 설명해줘.`,
        expectedKeywords: ['drawPixel', 'drawLine', 'drawRect', 'drawCircle'],
        quiz: {
          question: 'OLED 128x64 디스플레이에서 오른쪽 하단 모서리의 좌표는?',
          options: ['(128, 64)', '(127, 63)', '(64, 128)', '(0, 0)'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '여러 도형 그리기',
        description: 'OLED에 다양한 도형을 그립니다.',
        prompt: `ESP32에서 OLED에 여러 도형을 그리는 코드를 만들어줘.

요구사항:
1. 왼쪽 위: 빈 사각형 (20x20)
2. 오른쪽 위: 채워진 원 (반지름 15)
3. 아래 중앙: 채워진 삼각형
4. 각 도형 아래에 이름 텍스트
5. 모든 도형을 한 화면에 표시
6. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['drawRect', 'fillCircle', 'fillTriangle', 'setCursor'],
        quiz: {
          question: '채워진 원을 그리는 함수는?',
          options: ['drawCircle()', 'fillCircle()', 'solidCircle()', 'circle()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '공 튀기기 애니메이션',
        description: '화면을 튀어다니는 공 애니메이션을 만듭니다.',
        prompt: `ESP32에서 OLED에 공이 튀어다니는 애니메이션을 만들어줘.

요구사항:
1. 공은 반지름 5의 채워진 원
2. 처음 위치는 화면 중앙
3. x방향, y방향 각각 속도 변수
4. 화면 경계에 닿으면 방향 반전 (튕김)
5. 30ms마다 화면 업데이트
6. 부드럽게 움직이도록
7. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['fillCircle', 'clearDisplay', 'velocity', 'bounce'],
        quiz: {
          question: '애니메이션을 부드럽게 만들려면 어떻게 해야 하나요?',
          options: ['delay를 길게', '화면 업데이트를 자주', '공을 크게', 'LED를 켜서'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 9, title: '온습도 센서 (AHT20)' },
  },

  // ============================================
  // Day 9: 온습도 센서 (AHT20)
  // ============================================
  9: {
    day: 9,
    title: '온습도 센서 (AHT20)',
    subtitle: 'AHT20 센서로 온도와 습도를 측정합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '온습도 센서의 원리',
        description: 'AHT20 센서의 작동 원리를 이해합니다.',
        prompt: `온습도 센서 AHT20에 대해 설명해줘.

설명해야 할 내용:
1. 온도 센서의 작동 원리
2. 습도 센서의 작동 원리
3. AHT20 센서의 특징과 정확도
4. I2C 통신으로 데이터 읽는 방법
5. Adafruit_AHTX0 라이브러리 소개

초보자가 이해하기 쉽게 설명해줘.`,
        expectedKeywords: ['AHT20', '온도', '습도', 'I2C'],
        quiz: {
          question: 'AHT20 센서는 어떤 통신 방식을 사용하나요?',
          options: ['UART', 'SPI', 'I2C', 'Bluetooth'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '온습도 읽어서 시리얼 출력',
        description: 'AHT20에서 온습도를 읽어 시리얼 모니터에 출력합니다.',
        prompt: `ESP32에서 AHT20 센서로 온습도를 읽어 시리얼 모니터에 출력하는 코드를 만들어줘.

요구사항:
1. I2C 핀: SDA(21), SCL(22)
2. Adafruit_AHTX0 라이브러리 사용
3. 2초마다 온도와 습도 측정
4. 시리얼 모니터에 "온도: XX.X °C" 형식으로 출력
5. 시리얼 모니터에 "습도: XX.X %" 형식으로 출력
6. 센서 초기화 실패 시 에러 메시지
7. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['Adafruit_AHTX0', 'getEvent', 'temperature', 'humidity'],
        quiz: {
          question: 'AHT20 센서에서 데이터를 읽는 함수는?',
          options: ['readData()', 'getData()', 'getEvent()', 'measure()'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: 'OLED에 온습도 실시간 표시',
        description: 'OLED 화면에 온습도를 실시간으로 표시합니다.',
        prompt: `ESP32에서 온습도를 OLED에 실시간으로 표시하는 코드를 만들어줘.

요구사항:
1. OLED와 AHT20 모두 I2C 사용 (SDA:21, SCL:22)
2. OLED 상단에 "환경 모니터" 타이틀
3. 온도와 습도를 큰 글씨로 표시
4. 온도 30도 이상이면 "더움!" 표시
5. 습도 70% 이상이면 "습함!" 표시
6. 2초마다 업데이트
7. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['display', 'temperature', 'humidity', 'if'],
        quiz: {
          question: '같은 I2C 버스에 여러 장치를 연결할 수 있는 이유는?',
          options: ['전압이 같아서', '각 장치마다 고유 주소가 있어서', '케이블이 길어서', '속도가 빨라서'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 10, title: 'Wi-Fi 연결하기' },
  },

  // ============================================
  // Day 10: Wi-Fi 연결하기
  // ============================================
  10: {
    day: 10,
    title: 'Wi-Fi 연결하기',
    subtitle: 'ESP32를 Wi-Fi 공유기에 연결합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'Wi-Fi와 IP 주소 이해하기',
        description: 'Wi-Fi와 IP 주소의 개념을 학습합니다.',
        prompt: `Wi-Fi와 IP 주소에 대해 설명해줘.

설명해야 할 내용:
1. Wi-Fi란 무엇인지
2. SSID와 비밀번호란
3. IP 주소의 역할
4. 공유기와 장치의 연결 구조
5. ESP32의 Station 모드와 AP 모드

초보자가 이해하기 쉽게 비유를 들어 설명해줘.`,
        expectedKeywords: ['Wi-Fi', 'SSID', 'IP', 'Station'],
        quiz: {
          question: 'Wi-Fi 네트워크의 이름을 무엇이라고 하나요?',
          options: ['IP', 'MAC', 'SSID', 'DNS'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: 'Wi-Fi에 연결하기',
        description: 'ESP32를 공유기에 연결하고 IP 주소를 확인합니다.',
        prompt: `ESP32를 Wi-Fi에 연결하는 코드를 만들어줘.

요구사항:
1. WiFi.h 라이브러리 사용
2. SSID와 비밀번호는 변수로 정의 (사용자가 수정하도록)
3. WiFi.begin()으로 연결 시작
4. 연결 중에는 "." 출력하며 대기
5. 연결 완료 시 IP 주소 시리얼 출력
6. 연결 실패 시 (30초 타임아웃) 에러 메시지
7. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['WiFi.begin', 'WiFi.status', 'WL_CONNECTED', 'localIP'],
        quiz: {
          question: 'Wi-Fi 연결 성공을 확인하는 상태 값은?',
          options: ['CONNECTED', 'WL_CONNECTED', 'WIFI_OK', 'SUCCESS'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '연결 상태 LED로 표시하기',
        description: 'Wi-Fi 연결 상태를 LED로 표시합니다.',
        prompt: `ESP32에서 Wi-Fi 연결 상태를 LED로 표시하는 코드를 만들어줘.

요구사항:
1. 연결 시도 중: 파랑 LED 깜빡임 (500ms)
2. 연결 성공: 파랑 LED 계속 켜짐
3. 연결 실패: 빨강 LED 켜짐
4. 연결 후 끊어지면: 노랑 LED 깜빡임
5. loop()에서 연결 상태 계속 모니터링
6. 끊어지면 자동 재연결 시도
7. 코드에 주석 추가

LED 핀: 빨강(25), 노랑(26), 파랑(27)`,
        expectedKeywords: ['WiFi.status', 'LED', 'reconnect', 'blink'],
        quiz: {
          question: 'WiFi.status()가 WL_CONNECTED가 아니면 어떤 상태인가요?',
          options: ['연결됨', '연결 안됨 또는 끊어짐', '절전 모드', 'AP 모드'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 11, title: '간단한 웹 서버 만들기' },
  },

  // ============================================
  // Day 11: 간단한 웹 서버 만들기
  // ============================================
  11: {
    day: 11,
    title: '간단한 웹 서버 만들기',
    subtitle: 'ESP32에서 웹 서버를 실행하고 웹 페이지를 띄웁니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'HTTP와 웹 서버 이해하기',
        description: 'HTTP 프로토콜과 웹 서버의 개념을 학습합니다.',
        prompt: `HTTP와 웹 서버에 대해 설명해줘.

설명해야 할 내용:
1. HTTP 프로토콜이란
2. 웹 서버와 클라이언트의 관계
3. 요청(Request)과 응답(Response)
4. 포트 80의 의미
5. ESP32가 웹 서버가 되는 원리

초보자가 이해하기 쉽게 식당 주문에 비유해서 설명해줘.`,
        expectedKeywords: ['HTTP', '웹 서버', '요청', '응답', '포트'],
        quiz: {
          question: '웹 서버의 기본 포트 번호는?',
          options: ['21', '22', '80', '443'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '첫 번째 웹 페이지 만들기',
        description: 'ESP32에서 간단한 웹 페이지를 서빙합니다.',
        prompt: `ESP32에서 간단한 웹 서버를 만들어 웹 페이지를 띄우는 코드를 만들어줘.

요구사항:
1. WebServer 라이브러리 사용
2. Wi-Fi 연결 후 웹 서버 시작
3. "/" 경로에서 HTML 페이지 반환
4. 페이지 내용: "ESP32 웹 서버", "안녕하세요!"
5. 시리얼에 IP 주소 출력 (접속 주소 안내)
6. server.handleClient() 호출
7. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['WebServer', 'server.on', 'server.send', 'handleClient'],
        quiz: {
          question: 'WebServer에서 클라이언트 요청을 처리하는 함수는?',
          options: ['handleRequest()', 'processClient()', 'handleClient()', 'serveClient()'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '온습도 데이터 웹 페이지에 표시',
        description: '센서 데이터를 웹 페이지에 표시합니다.',
        prompt: `ESP32에서 온습도 센서 데이터를 웹 페이지에 표시하는 코드를 만들어줘.

요구사항:
1. AHT20 센서에서 온습도 측정
2. 웹 페이지에 현재 온도와 습도 표시
3. HTML에 한글 표시를 위해 charset='UTF-8' 추가
4. 페이지 새로고침하면 최신 데이터 표시
5. 간단한 스타일 적용 (중앙 정렬, 큰 글씨)
6. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['temperature', 'humidity', 'String', 'HTML'],
        quiz: {
          question: 'HTML에서 한글을 제대로 표시하려면 무엇을 설정해야 하나요?',
          options: ['lang="ko"', 'charset="UTF-8"', 'encoding="korean"', 'font="한글"'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 12, title: 'HTML 기초와 웹 페이지 꾸미기' },
  },

  // ============================================
  // Day 12: HTML 기초와 웹 페이지 꾸미기
  // ============================================
  12: {
    day: 12,
    title: 'HTML 기초와 웹 페이지 꾸미기',
    subtitle: 'HTML과 CSS로 예쁜 웹 페이지를 만듭니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'HTML 기본 태그 배우기',
        description: 'HTML의 기본 구조와 태그를 학습합니다.',
        prompt: `HTML의 기본 구조와 주요 태그에 대해 설명해줘.

설명해야 할 내용:
1. HTML 문서의 기본 구조 (<!DOCTYPE>, <html>, <head>, <body>)
2. 제목 태그 (<h1> ~ <h6>)
3. 문단 태그 (<p>)
4. 줄바꿈 (<br>), 구분선 (<hr>)
5. div와 span의 차이
6. meta 태그 (charset, viewport)

간단한 예제 코드와 함께 설명해줘.`,
        expectedKeywords: ['<html>', '<head>', '<body>', '<h1>', '<p>'],
        quiz: {
          question: '가장 큰 제목을 나타내는 태그는?',
          options: ['<title>', '<h1>', '<header>', '<big>'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'CSS로 스타일 적용하기',
        description: 'CSS를 사용하여 웹 페이지를 꾸밉니다.',
        prompt: `CSS 기초와 ESP32 웹 페이지에 스타일을 적용하는 방법을 설명해줘.

설명해야 할 내용:
1. CSS란 무엇인지
2. <style> 태그 사용법
3. 색상 지정 (color, background)
4. 폰트 크기와 종류 (font-size, font-family)
5. 여백과 정렬 (margin, padding, text-align)
6. 박스 스타일 (border, border-radius)

ESP32 String에 CSS를 포함하는 예제도 보여줘.`,
        expectedKeywords: ['<style>', 'color', 'font-size', 'margin', 'padding'],
        quiz: {
          question: '텍스트 색상을 빨간색으로 바꾸는 CSS 속성은?',
          options: ['text-color: red', 'font-color: red', 'color: red', 'text: red'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '카드 스타일 환경 모니터 페이지',
        description: '온습도를 예쁜 카드 형태로 표시합니다.',
        prompt: `ESP32에서 온습도 데이터를 예쁜 카드 스타일로 표시하는 웹 페이지를 만들어줘.

요구사항:
1. 모바일에서도 보기 좋게 viewport 설정
2. 배경색: 연한 회색 (#f0f0f0)
3. 카드 스타일: 흰색 배경, 둥근 모서리, 그림자
4. 온도 카드: 빨간색 계열 큰 숫자
5. 습도 카드: 파란색 계열 큰 숫자
6. 상단에 "ESP32 환경 모니터" 제목
7. 코드에 주석 추가

String getHTML() 함수로 HTML 반환하도록 만들어줘.`,
        expectedKeywords: ['card', 'border-radius', 'box-shadow', 'viewport'],
        quiz: {
          question: '모바일에서 웹 페이지가 제대로 보이게 하려면 무엇을 설정해야 하나요?',
          options: ['mobile-friendly', 'viewport', 'responsive', 'device-width'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 13, title: '웹으로 LED 제어하기' },
  },

  // ============================================
  // Day 13: 웹으로 LED 제어하기
  // ============================================
  13: {
    day: 13,
    title: '웹으로 LED 제어하기',
    subtitle: '웹 페이지의 버튼으로 LED를 제어합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'URL 파라미터 이해하기',
        description: 'GET 요청과 URL 파라미터를 학습합니다.',
        prompt: `HTTP GET 요청과 URL 파라미터에 대해 설명해줘.

설명해야 할 내용:
1. GET 요청이란
2. URL 파라미터 형식 (?key=value&key2=value2)
3. server.arg() 함수로 파라미터 읽기
4. 예시: /led?color=red&state=on

ESP32 WebServer에서 파라미터를 처리하는 예제도 보여줘.`,
        expectedKeywords: ['GET', 'URL', 'parameter', 'server.arg'],
        quiz: {
          question: 'URL에서 파라미터를 시작하는 기호는?',
          options: ['&', '?', '=', '#'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '웹 버튼으로 LED 켜고 끄기',
        description: 'HTML 버튼으로 LED를 제어합니다.',
        prompt: `ESP32에서 웹 페이지의 버튼으로 빨강 LED를 켜고 끄는 코드를 만들어줘.

요구사항:
1. 메인 페이지에 "LED 켜기", "LED 끄기" 버튼 2개
2. 버튼 클릭 시 /led?state=on 또는 /led?state=off로 이동
3. server.arg("state")로 상태 확인
4. LED 제어 후 메인 페이지로 리다이렉트
5. 현재 LED 상태도 페이지에 표시
6. 버튼 스타일 적용 (크고 보기 좋게)
7. 코드에 주석 추가

빨강 LED 핀: GPIO 25`,
        expectedKeywords: ['server.arg', 'digitalWrite', 'redirect', 'button'],
        quiz: {
          question: 'server.arg("state")는 무엇을 반환하나요?',
          options: ['LED 핀 번호', 'URL의 state 파라미터 값', 'HTTP 상태 코드', '서버 IP'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '3색 LED 제어 페이지',
        description: '웹에서 3색 LED를 각각 제어합니다.',
        prompt: `ESP32에서 웹 페이지로 3색 LED를 각각 제어하는 코드를 만들어줘.

요구사항:
1. 빨강, 노랑, 파랑 LED 각각 ON/OFF 버튼
2. URL 형식: /led?color=red&state=on
3. 각 LED의 현재 상태 표시 (켜짐/꺼짐)
4. LED 색상에 맞는 버튼 색상 스타일
5. 모든 LED 끄기 버튼 추가
6. 반응형 디자인 (모바일에서도 보기 좋게)
7. 코드에 주석 추가

LED 핀: 빨강(25), 노랑(26), 파랑(27)`,
        expectedKeywords: ['color', 'state', 'LED_RED', 'LED_YELLOW', 'LED_BLUE'],
        quiz: {
          question: '/led?color=blue&state=on 요청을 처리하면 어떤 LED가 켜지나요?',
          options: ['빨강', '노랑', '파랑', '전체'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 14, title: '자동 새로고침과 실시간 데이터' },
  },

  // ============================================
  // Day 14: 자동 새로고침과 실시간 데이터
  // ============================================
  14: {
    day: 14,
    title: '자동 새로고침과 실시간 데이터',
    subtitle: '웹 페이지에 실시간 센서 데이터를 표시합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'meta refresh로 자동 새로고침',
        description: 'HTML meta 태그로 페이지를 자동 새로고침합니다.',
        prompt: `HTML meta refresh 태그로 페이지를 자동 새로고침하는 방법을 설명해줘.

설명해야 할 내용:
1. meta http-equiv="refresh" 태그 사용법
2. content 속성으로 새로고침 간격 설정 (초)
3. 자동 새로고침의 장단점
4. ESP32 웹 서버에 적용하는 방법

5초마다 새로고침되는 예제 코드도 보여줘.`,
        expectedKeywords: ['meta', 'refresh', 'content', 'http-equiv'],
        quiz: {
          question: '5초마다 페이지를 새로고침하는 meta 태그는?',
          options: ['<meta refresh="5">', '<meta http-equiv="refresh" content="5">', '<meta auto-refresh="5s">', '<meta reload="5">'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '실시간 온습도 모니터',
        description: '자동으로 업데이트되는 온습도 모니터를 만듭니다.',
        prompt: `ESP32에서 5초마다 자동 새로고침되는 온습도 모니터 웹 페이지를 만들어줘.

요구사항:
1. meta refresh로 5초마다 자동 새로고침
2. 현재 온도와 습도 큰 글씨로 표시
3. 마지막 업데이트 시간 표시 (millis() 활용)
4. 온도 30도 이상이면 "더움!" 경고 표시 (빨간색)
5. 습도 70% 이상이면 "습함!" 경고 표시 (파란색)
6. 카드 스타일 디자인
7. 코드에 주석 추가` + PORT_SPEC_NOTICE,
        expectedKeywords: ['refresh', 'temperature', 'humidity', '경고'],
        quiz: {
          question: '자동 새로고침의 단점은?',
          options: ['배터리 소모가 적음', '페이지 깜빡임', '데이터가 정확함', '서버 부하가 적음'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '온도 경고 시스템',
        description: '온도가 높으면 LED와 부저로 경고합니다.',
        prompt: `ESP32에서 온도가 30도 이상이면 웹과 하드웨어로 경고하는 시스템을 만들어줘.

요구사항:
1. 웹 페이지에 온습도 실시간 표시 (5초 새로고침)
2. 온도 30도 미만: 파랑 LED 켜짐, 정상 표시
3. 온도 30도 이상: 빨강 LED 켜짐 + 비프음 + 웹 경고
4. 웹 페이지 배경색도 온도에 따라 변경 (정상:흰색, 경고:연한빨강)
5. 경고 해제는 자동 (온도가 내려가면)
6. OLED에도 현재 상태 표시
7. 코드에 주석 추가

핀: LED(빨강25, 파랑27), 부저(14), I2C(21,22)`,
        expectedKeywords: ['temperature', '30', 'LED', 'buzzer', '경고'],
        quiz: {
          question: '이 시스템에서 온도가 32도일 때 어떤 LED가 켜지나요?',
          options: ['파랑', '노랑', '빨강', '모두 꺼짐'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 15, title: '종합 프로젝트 - 스마트 환경 모니터' },
  },

  // ============================================
  // Day 15: 종합 프로젝트 - 스마트 환경 모니터
  // ============================================
  15: {
    day: 15,
    title: '종합 프로젝트 - 스마트 환경 모니터',
    subtitle: '지금까지 배운 모든 것을 통합한 프로젝트를 완성합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '프로젝트 설계하기',
        description: '스마트 환경 모니터의 기능을 설계합니다.',
        prompt: `ESP32 스마트 환경 모니터 프로젝트의 기능과 구조를 설계해줘.

프로젝트 요구사항:
1. 온습도 센서로 환경 데이터 측정
2. OLED에 실시간 데이터 표시
3. Wi-Fi 웹 서버로 원격 모니터링
4. 온도 30도 이상 시 경고 (LED + 부저)
5. 웹에서 LED 수동 제어 가능
6. 자동 새로고침 데이터 업데이트

각 기능별로 사용할 핀과 라이브러리를 정리해줘.
시스템 구조도(텍스트)도 그려줘.`,
        expectedKeywords: ['설계', '기능', '핀', '라이브러리'],
        quiz: {
          question: '좋은 프로젝트 설계에서 가장 중요한 것은?',
          options: ['코드를 빨리 작성하는 것', '요구사항을 명확히 정의하는 것', '화려한 디자인', '많은 기능'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '코드 통합하기',
        description: '모든 기능을 하나의 코드로 통합합니다.',
        prompt: `ESP32 스마트 환경 모니터 전체 코드를 만들어줘.

통합할 기능:
1. Wi-Fi 연결 (연결 상태 LED 표시)
2. AHT20 온습도 측정 (2초마다)
3. OLED에 온습도 + 상태 표시
4. 웹 서버: 메인 페이지 (온습도 카드 + LED 제어 버튼)
5. 웹 서버: LED 제어 (/led?color=xxx&state=xxx)
6. 온도 30도 이상: 빨강 LED + 비프음 + 웹 경고
7. 5초마다 웹 페이지 자동 새로고침

핀 정보:
- LED: 빨강(25), 노랑(26), 파랑(27)
- 부저: 비프(14)
- I2C: SDA(21), SCL(22)

코드에 상세한 주석을 달아줘.`,
        expectedKeywords: ['WiFi', 'WebServer', 'AHT20', 'OLED', 'LED'],
        quiz: {
          question: '여러 기능을 통합할 때 가장 주의할 점은?',
          options: ['코드를 길게 작성', '변수명 충돌 방지', '주석 생략', '들여쓰기 무시'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '테스트 및 완성',
        description: '프로젝트를 테스트하고 문서화합니다.',
        prompt: `ESP32 스마트 환경 모니터 프로젝트의 테스트 체크리스트와 사용 설명서를 만들어줘.

테스트 체크리스트:
1. 전원 연결 시 Wi-Fi 연결 확인
2. 시리얼 모니터에 IP 주소 출력 확인
3. OLED에 온습도 표시 확인
4. 웹 페이지 접속 테스트 (PC와 스마트폰)
5. LED 제어 버튼 동작 확인
6. 온도 경고 테스트 (손으로 센서 가열)
7. 자동 새로고침 확인

사용 설명서:
- Wi-Fi 설정 방법
- 웹 접속 방법
- 각 기능 사용법
- 문제 해결 (FAQ)

마크다운 형식으로 작성해줘.`,
        expectedKeywords: ['테스트', '체크리스트', '설명서', 'FAQ'],
        quiz: {
          question: '프로젝트 완성 후 반드시 해야 할 것은?',
          options: ['바로 다음 프로젝트 시작', '테스트와 문서화', '코드 삭제', '전원 차단'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: null,  // 마지막 강의
  },
};

// ============================================
// 수강 신청 안내 컴포넌트
// ============================================
function EnrollmentRequired({ courseId, level }: { courseId: string; level: string }) {
  const info = courseInfo[courseId];
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/courses" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mr-2">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">수강 신청이 필요합니다</h1>
          <p className="text-gray-600 mb-6">이 강의를 시청하려면 먼저 수강 신청을 해주세요.</p>
          {info && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h2>
              <p className="text-3xl font-bold text-teal-600 mb-4">{info.price.toLocaleString()}원</p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              수강 신청하기
            </button>
            <Link href="/login" className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition">
              로그인하기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================
// 개별 목표 섹션 컴포넌트
// ============================================
function GoalSection({
  goal,
  goalIndex,
  totalGoals,
  isActive,
  isCompleted,
  onComplete,
  copyToClipboard,
  courseId,
  level,
  day
}: {
  goal: any;
  goalIndex: number;
  totalGoals: number;
  isActive: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  copyToClipboard: (text: string) => boolean;
  courseId: string;
  level: string;
  day: number;
}) {
  const [prompt, setPrompt] = useState(goal.prompt);
  const [aiResult, setAiResult] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState(false);
  const [downloadedFileName, setDownloadedFileName] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // goal이 변경될 때 상태 초기화 및 스크롤
  useEffect(() => {
    setPrompt(goal.prompt);
    setAiResult('');
    setSelectedAnswer(null);
    setShowQuizResult(false);
    setIsQuizCorrect(false);
    setDownloadedFileName(null);

    // 활성화된 목표로 스크롤
    if (isActive && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [goal.id, isActive]);

  const handleCopyAndOpenAI = (aiUrl: string) => {
    const success = copyToClipboard(prompt);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      window.open(aiUrl, '_blank');
    }
  };

  const handleCopyPrompt = () => {
    const success = copyToClipboard(prompt);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const isArduinoCode = (content: string): boolean => {
    // Arduino 코드 판별: 완전한 Arduino 프로그램인지 확인
    // 1. void setup()과 void loop()가 둘 다 있어야 Arduino 코드
    // 2. 마크다운 문서(설명문)는 제외

    const hasSetup = /void\s+setup\s*\(/.test(content);
    const hasLoop = /void\s+loop\s*\(/.test(content);

    // setup()과 loop() 둘 다 있어야 완전한 Arduino 프로그램
    if (!hasSetup || !hasLoop) {
      return false;
    }

    // 마크다운 문서인지 확인 (설명문은 .md로 저장)
    // ## 또는 ### 헤더가 3개 이상이면 설명 문서로 간주
    const markdownHeaders = (content.match(/^#{1,3}\s+/gm) || []).length;
    if (markdownHeaders >= 3) {
      return false;
    }

    // 코드 블록(```)이 있고, 그 안에만 Arduino 코드가 있으면 설명 문서
    const codeBlockCount = (content.match(/```/g) || []).length;
    if (codeBlockCount >= 2) {
      // 코드 블록 밖에도 setup/loop가 있는지 확인
      const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '');
      const hasSetupOutside = /void\s+setup\s*\(/.test(contentWithoutCodeBlocks);
      const hasLoopOutside = /void\s+loop\s*\(/.test(contentWithoutCodeBlocks);
      if (!hasSetupOutside && !hasLoopOutside) {
        return false; // 코드 블록 안에만 있으면 설명 문서
      }
    }

    return true;
  };

  const getFileName = () => {
    const extension = isArduinoCode(aiResult) ? '.ino' : '.md';
    return `day${day}_${goal.id}${extension}`;
  };

  const handleSaveAs = async () => {
    if (!aiResult.trim()) return;
    const fileName = getFileName();
    const isCode = isArduinoCode(aiResult);
    if ('showSaveFilePicker' in window) {
      try {
        const fileTypes = isCode
          ? [{ description: 'Arduino Files', accept: { 'text/plain': ['.ino'] } }]
          : [{ description: 'Markdown Files', accept: { 'text/markdown': ['.md'] } }];
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: fileName,
          types: fileTypes,
        });
        const writable = await handle.createWritable();
        await writable.write(aiResult);
        await writable.close();
        setDownloadedFileName(fileName);
        setTimeout(() => setDownloadedFileName(null), 5000);
      } catch (err: any) {
        if (err.name !== 'AbortError') console.error('Save failed:', err);
      }
    } else {
      handleDownloadResult();
    }
  };

  const handleDownloadResult = () => {
    if (!aiResult.trim()) return;
    const fileName = getFileName();
    const blob = new Blob([aiResult], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadedFileName(fileName);
    setTimeout(() => setDownloadedFileName(null), 5000);
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === goal.quiz.correctAnswer;
    setIsQuizCorrect(correct);
    setShowQuizResult(true);
    if (correct) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  // 비활성 상태
  if (!isActive && !isCompleted) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 opacity-60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-bold">
            {goalIndex + 1}
          </div>
          <div>
            <h3 className="font-semibold text-gray-500">{goal.title}</h3>
            <p className="text-sm text-gray-400">이전 목표를 완료하면 진행할 수 있습니다</p>
          </div>
        </div>
      </div>
    );
  }

  // 완료된 상태
  if (isCompleted) {
    return (
      <div className="bg-green-50 rounded-xl border border-green-200 p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800">{goal.title}</h3>
            <p className="text-sm text-green-600">✓ 완료됨</p>
          </div>
        </div>
      </div>
    );
  }

  // 활성 상태 (현재 진행 중)
  return (
    <div ref={sectionRef} className="bg-white rounded-xl border-2 border-teal-400 shadow-lg overflow-hidden">
      {/* 섹션 헤더 - ESP32 테마 (청록색) */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
            {goalIndex + 1}
          </div>
          <div>
            <p className="text-teal-100 text-sm">목표 {goalIndex + 1} / {totalGoals}</p>
            <h3 className="font-bold text-lg">{goal.title}</h3>
          </div>
        </div>
        <p className="text-teal-100 text-sm mt-2 ml-11">{goal.description}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Step 1: AI 질문하기 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-800">Step 1: AI에게 질문하기</h4>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-36 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-gray-800 text-sm font-mono"
          />

          <div className="flex items-center gap-2 mt-2 mb-3">
            <button
              onClick={handleCopyPrompt}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                isCopied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Copy className="w-3 h-3" />
              {isCopied ? '복사됨!' : '복사'}
            </button>
          </div>

          <div className="bg-teal-50 rounded-lg p-3">
            <p className="text-xs text-teal-700 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              버튼 클릭 → 질문 복사 → AI 사이트 열림 → Ctrl+V로 붙여넣기
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {aiServices.map((ai) => (
                <button
                  key={ai.id}
                  onClick={() => handleCopyAndOpenAI(ai.url)}
                  className={`${ai.color} text-white px-3 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-1`}
                >
                  <span>{ai.icon}</span>
                  <span>{ai.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: AI 결과 확인 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-800">Step 2: AI 결과 붙여넣기</h4>
          </div>

          <textarea
            value={aiResult}
            onChange={(e) => setAiResult(e.target.value)}
            className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-800 text-sm"
            placeholder="AI의 답변을 여기에 붙여넣으세요 (Ctrl+V)... 나중에 Arduino IDE에서 업로드하여 검증할 수 있습니다."
          />

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveAs}
                disabled={!aiResult.trim()}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  aiResult.trim()
                    ? 'bg-teal-500 text-white hover:bg-teal-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Save className="w-3 h-3" />
                다른 이름으로 저장
              </button>
              <button
                onClick={handleDownloadResult}
                disabled={!aiResult.trim()}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  aiResult.trim()
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Download className="w-3 h-3" />
                다운로드
              </button>
            </div>

            <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
              {downloadedFileName ? (
                <p className="text-green-600 font-medium">
                  ✅ 저장 완료: <span className="font-mono bg-green-100 px-1 rounded">{downloadedFileName}</span>
                </p>
              ) : (
                <p>
                  💾 <strong>다른 이름으로 저장</strong>: 원하는 폴더 선택 가능 (Chrome/Edge)<br/>
                  📁 <strong>다운로드</strong>: 기본 다운로드 폴더에 저장됨<br/>
                  🔌 저장 후 Arduino IDE에서 열어서 ESP32에 업로드하세요!
                </p>
              )}
            </div>
          </div>

          {goal.expectedKeywords && goal.expectedKeywords.length > 0 && (
            <p className="text-xs text-gray-500 mt-3">
              💡 확인 포인트: <span className="font-mono bg-gray-100 px-1 rounded">{goal.expectedKeywords.join(', ')}</span>
            </p>
          )}
        </div>

        {/* Step 3: 퀴즈 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-800">Step 3: 학습 확인 퀴즈</h4>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-3">{goal.quiz.question}</p>
            <div className="space-y-2">
              {goal.quiz.options.map((option: string, idx: number) => {
                let optionClass = 'border-gray-200 hover:border-teal-300 hover:bg-teal-50';
                if (showQuizResult) {
                  if (idx === goal.quiz.correctAnswer) {
                    optionClass = 'border-green-500 bg-green-50';
                  } else if (idx === selectedAnswer && !isQuizCorrect) {
                    optionClass = 'border-red-500 bg-red-50';
                  }
                } else if (idx === selectedAnswer) {
                  optionClass = 'border-teal-500 bg-teal-50';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !showQuizResult && setSelectedAnswer(idx)}
                    disabled={showQuizResult}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${optionClass}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAnswer === idx ? 'border-teal-500' : 'border-gray-300'}`}>
                        {selectedAnswer === idx && <div className="w-2 h-2 rounded-full bg-teal-500" />}
                      </div>
                      <span className="text-gray-700 text-sm">{option}</span>
                      {showQuizResult && idx === goal.quiz.correctAnswer && (
                        <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {!showQuizResult ? (
              <button
                onClick={handleQuizSubmit}
                disabled={selectedAnswer === null}
                className={`mt-4 w-full py-2 rounded-lg font-semibold text-sm transition ${
                  selectedAnswer !== null
                    ? 'bg-teal-500 text-white hover:bg-teal-600'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                정답 확인
              </button>
            ) : (
              <div className={`mt-4 p-3 rounded-lg text-center ${isQuizCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className={`font-bold ${isQuizCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isQuizCorrect ? '🎉 정답입니다! 다음 목표로 이동합니다...' : '❌ 틀렸습니다. 다시 시도해주세요.'}
                </p>
                {!isQuizCorrect && (
                  <button
                    onClick={() => {
                      setShowQuizResult(false);
                      setSelectedAnswer(null);
                    }}
                    className="mt-2 text-sm text-red-600 underline"
                  >
                    다시 시도
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 메인 페이지 컴포넌트
// ============================================
export default function ESP32ArduinoLessonDayPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [completedGoals, setCompletedGoals] = useState<number[]>([]);
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);

  const lessonData = lessonDataByDay[day];
  const courseId = 'esp32-arduino';

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userStr && token) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || '');
        setIsLoggedIn(true);
        const enrolledCourses = enrollmentData[user.email] || [];
        setIsEnrolled(enrolledCourses.includes(courseId));
      } catch (e) {
        setIsLoggedIn(false);
        setIsEnrolled(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsEnrolled(false);
    }
    setIsLoading(false);
  }, []);

  const copyToClipboard = (text: string): boolean => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
      return true;
    } catch (err) {
      textArea.remove();
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleGoalComplete = (goalId: number) => {
    if (!completedGoals.includes(goalId)) {
      setCompletedGoals([...completedGoals, goalId]);
      if (currentGoalIndex < lessonData.goals.length - 1) {
        setCurrentGoalIndex(currentGoalIndex + 1);
      }
    }
  };

  const allGoalsCompleted = lessonData && completedGoals.length === lessonData.goals.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !isEnrolled) {
    return <EnrollmentRequired courseId={courseId} level={level} />;
  }

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 강의입니다</h1>
          <Link href={`/course/coding/c-esp32/${level}`} className="text-teal-600 hover:underline">
            강좌 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/courses" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-lg flex items-center justify-center mr-2">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="bg-teal-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-teal-300 transition">내 강의</Link>
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
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* 네비게이션 */}
        <div className="flex items-center gap-2">
          <Link
            href={`/course/coding/c-esp32/${level}`}
            className="flex items-center gap-1 px-3 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium hover:bg-teal-200 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            강의 목록으로
          </Link>
          <span className="px-3 py-1.5 bg-teal-400 text-teal-900 rounded-full text-sm font-medium">Day {day}</span>
          <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">{level}</span>
        </div>

        {/* 진행방법 동영상 - 접을 수 있는 섹션 */}
        <details className="bg-white rounded-xl shadow-sm">
          <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-50 rounded-xl">
            <Play className="w-5 h-5 text-red-600" />
            <span className="font-bold text-gray-900">진행방법</span>
            <span className="text-sm text-gray-500 ml-2">(처음이시라면 꼭 시청하세요)</span>
          </summary>
          <div className="px-4 pb-4">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${lessonData.videoId}`}
                title={lessonData.videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </details>

        {/* 강의 제목 - ESP32 테마 */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔌</span>
            <h1 className="text-2xl font-bold">{lessonData.title}</h1>
          </div>
          <p className="text-teal-100 text-sm">{lessonData.subtitle}</p>

          {/* 진행률 */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>진행률</span>
              <span>{completedGoals.length}/{lessonData.goals.length} 완료</span>
            </div>
            <div className="w-full bg-teal-700/50 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedGoals.length / lessonData.goals.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 학습 목표 목록 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-teal-600" />
            <h2 className="font-bold text-gray-900">오늘의 학습 목표</h2>
          </div>
          <div className="space-y-2">
            {lessonData.goals.map((goal: any, idx: number) => (
              <div key={goal.id} className="flex items-center gap-3">
                {completedGoals.includes(goal.id) ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : idx === currentGoalIndex ? (
                  <div className="w-5 h-5 border-2 border-teal-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
                <span className={`text-sm ${completedGoals.includes(goal.id) ? 'text-green-700 line-through' : idx === currentGoalIndex ? 'text-teal-700 font-medium' : 'text-gray-400'}`}>
                  {goal.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 목표별 섹션들 */}
        <div className="space-y-4">
          {lessonData.goals.map((goal: any, idx: number) => (
            <GoalSection
              key={goal.id}
              goal={goal}
              goalIndex={idx}
              totalGoals={lessonData.goals.length}
              isActive={idx === currentGoalIndex}
              isCompleted={completedGoals.includes(goal.id)}
              onComplete={() => handleGoalComplete(goal.id)}
              copyToClipboard={copyToClipboard}
              courseId={courseId}
              level={level}
              day={day}
            />
          ))}
        </div>

        {/* 완료 시 다음 강의 */}
        {allGoalsCompleted && (
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-xl font-bold mb-2">Day {day} 학습 완료!</h2>
            <p className="text-green-100 mb-4">모든 목표를 달성했습니다. 훌륭해요!</p>
            {lessonData.nextLesson && (
              <Link
                href={`/course/coding/c-esp32/${level}/lesson/${lessonData.nextLesson.day}`}
                className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                다음 강의: {lessonData.nextLesson.title}
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        )}

        {/* Day 이동 버튼 */}
        <div className="flex justify-between items-center pt-4">
          {day > 1 ? (
            <Link
              href={`/course/coding/c-esp32/${level}/lesson/${day - 1}`}
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Day {day - 1}
            </Link>
          ) : (
            <div />
          )}
          {day < 15 && (
            <Link
              href={`/course/coding/c-esp32/${level}/lesson/${day + 1}`}
              className="flex items-center gap-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
            >
              Day {day + 1}
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
