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
  CheckCircle2
} from 'lucide-react';

// 수강 신청 데이터
const enrollmentData: Record<string, string[]> = {
  'test@test.com': ['python-pc'],
};

// 강좌 정보
const courseInfo: Record<string, { title: string; price: number }> = {
  'python-pc': { title: 'Python (PC)', price: 79000 },
};

// 무료 AI 목록
const aiServices = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'bg-green-500 hover:bg-green-600', icon: '🤖' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/', color: 'bg-orange-500 hover:bg-orange-600', icon: '🧠' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/', color: 'bg-blue-500 hover:bg-blue-600', icon: '✨' },
  { id: 'copilot', name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'bg-purple-500 hover:bg-purple-600', icon: '💡' },
];

// ============================================
// Python Day별 레슨 데이터 (AI 학습법 적용)
// ============================================
const lessonDataByDay: Record<number, any> = {
  // ============================================
  // Day 1: 첫 프로그램 실행하기
  // ============================================
  1: {
    day: 1,
    title: '첫 프로그램 실행하기',
    subtitle: 'print() 함수로 화면에 글자를 출력하고, Python 파일을 실행해봅니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '화면에 글자 출력하기',
        description: 'print() 함수를 사용해서 화면에 원하는 글자를 출력합니다.',
        prompt: `"안녕하세요! Python 세계에 오신 것을 환영합니다"를 화면에 출력하는 Python 코드 만들어줘`,
        expectedKeywords: ['print', '따옴표', '출력'],
        quiz: {
          question: 'Python에서 화면에 글자를 출력할 때 사용하는 함수는?',
          options: ['console.log()', 'printf()', 'print()', 'echo()'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '여러 줄 출력하고 파일 실행하기',
        description: 'Python 파일(.py)을 만들고 여러 줄을 출력합니다.',
        prompt: `나의 자기소개를 3줄로 출력하는 Python 코드 만들어줘.
이름, 나이, 취미를 각각 한 줄씩 출력해줘.`,
        expectedKeywords: ['print', '.py', '여러 줄'],
        quiz: {
          question: 'Python 파일의 확장자는 무엇인가요?',
          options: ['.python', '.py', '.pt', '.pyt'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 2, title: '데이터 저장하기 (변수)' },
  },

  // ============================================
  // Day 2: 데이터 저장하기 (변수)
  // ============================================
  2: {
    day: 2,
    title: '데이터 저장하기 (변수)',
    subtitle: '변수에 값을 저장하고 input()으로 사용자 입력을 받습니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '변수에 값 저장하기',
        description: '변수를 사용해서 이름, 나이, 키 등의 데이터를 저장합니다.',
        prompt: `이름, 나이, 키를 각각 변수에 저장하고 출력하는 Python 코드 만들어줘`,
        expectedKeywords: ['변수', '=', 'print'],
        quiz: {
          question: 'Python에서 변수에 값을 저장할 때 사용하는 기호는?',
          options: [':', '==', '=', '->'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '사용자 입력 받기',
        description: 'input() 함수로 사용자에게 값을 입력받습니다.',
        prompt: `사용자에게 이름을 물어보고, "안녕하세요, OOO님!"이라고 인사하는 Python 코드 만들어줘`,
        expectedKeywords: ['input', '변수', 'print'],
        quiz: {
          question: 'input() 함수가 반환하는 자료형은?',
          options: ['int', 'float', 'str', 'bool'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '숫자 입력받아 계산하기',
        description: 'input()으로 받은 값을 숫자로 변환해서 계산합니다.',
        prompt: `태어난 연도를 입력받아서 나이를 계산해 출력하는 Python 코드 만들어줘`,
        expectedKeywords: ['input', 'int', '계산'],
        quiz: {
          question: 'input()으로 받은 "25"를 숫자로 바꾸려면?',
          options: ['str("25")', 'int("25")', 'num("25")', 'float("25")만 가능'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 3, title: '계산하기 (연산자)' },
  },

  // ============================================
  // Day 3: 계산하기 (연산자)
  // ============================================
  3: {
    day: 3,
    title: '계산하기 (연산자)',
    subtitle: '사칙연산과 비교 연산자를 사용해서 계산합니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '사칙연산 하기',
        description: '더하기, 빼기, 곱하기, 나누기 연산을 수행합니다.',
        prompt: `두 숫자를 입력받아서 더하기, 빼기, 곱하기, 나누기 결과를 모두 보여주는 Python 코드 만들어줘`,
        expectedKeywords: ['+', '-', '*', '/'],
        quiz: {
          question: 'Python에서 나머지를 구하는 연산자는?',
          options: ['/', '//', '%', '%%'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '비교하기',
        description: '두 값을 비교해서 True 또는 False 결과를 얻습니다.',
        prompt: `두 숫자를 입력받아서 어느 쪽이 더 큰지, 같은지 비교해서 알려주는 Python 코드 만들어줘`,
        expectedKeywords: ['>', '<', '==', 'True', 'False'],
        quiz: {
          question: 'Python에서 "같다"를 비교할 때 사용하는 기호는?',
          options: ['=', '==', '===', 'equals'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 4, title: '조건에 따라 다르게 (if문)' },
  },

  // ============================================
  // Day 4: 조건에 따라 다르게 (if문)
  // ============================================
  4: {
    day: 4,
    title: '조건에 따라 다르게 (if문)',
    subtitle: 'if, elif, else를 사용해서 조건에 따라 다른 코드를 실행합니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '조건 분기하기',
        description: 'if와 else를 사용해서 조건에 따라 다른 결과를 출력합니다.',
        prompt: `점수를 입력받아서 60점 이상이면 "합격", 미만이면 "불합격"을 출력하는 Python 코드 만들어줘`,
        expectedKeywords: ['if', 'else', ':', '들여쓰기'],
        quiz: {
          question: 'Python if문에서 조건 뒤에 반드시 붙여야 하는 것은?',
          options: ['세미콜론(;)', '콜론(:)', '괄호()', '중괄호{}'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '여러 조건 검사하기 (elif)',
        description: 'elif를 사용해서 여러 조건을 순서대로 검사합니다.',
        prompt: `점수를 입력받아서 90점 이상 A, 80점 이상 B, 70점 이상 C, 60점 이상 D, 그 외 F를 출력하는 Python 코드 만들어줘`,
        expectedKeywords: ['if', 'elif', 'else'],
        quiz: {
          question: 'elif는 무엇의 줄임말인가요?',
          options: ['else if', 'element if', 'elif만 있음', 'else elif'],
          correctAnswer: 0,
        },
      },
    ],
    nextLesson: { day: 5, title: '반복하기 (for문)' },
  },

  // ============================================
  // Day 5: 반복하기 (for문)
  // ============================================
  5: {
    day: 5,
    title: '반복하기 (for문)',
    subtitle: 'for문과 range()를 사용해서 정해진 횟수만큼 반복합니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '정해진 횟수만큼 반복하기',
        description: 'for문과 range()를 사용해서 원하는 만큼 반복합니다.',
        prompt: `"화이팅!"을 5번 출력하는 Python 코드 만들어줘`,
        expectedKeywords: ['for', 'in', 'range'],
        quiz: {
          question: 'range(5)가 만드는 숫자는?',
          options: ['1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '0, 1, 2, 3, 4, 5', '1, 2, 3, 4'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '1부터 N까지 합 구하기',
        description: '반복문으로 누적 계산을 수행합니다.',
        prompt: `1부터 100까지의 합을 구하는 Python 코드 만들어줘`,
        expectedKeywords: ['for', 'range', 'sum', '+='],
        quiz: {
          question: 'range(1, 101)에서 101이 포함되나요?',
          options: ['포함된다', '포함되지 않는다', '경우에 따라 다르다', '에러가 난다'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 6, title: '조건부 반복 (while문)' },
  },

  // ============================================
  // Day 6: 조건부 반복 (while문)
  // ============================================
  6: {
    day: 6,
    title: '조건부 반복 (while문)',
    subtitle: 'while문으로 조건이 참인 동안 반복하고, break로 탈출합니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '조건이 맞는 동안 반복하기',
        description: 'while문을 사용해서 조건이 참인 동안 반복합니다.',
        prompt: `사용자가 "종료"를 입력할 때까지 계속 메시지를 입력받아 출력하는 Python 코드 만들어줘`,
        expectedKeywords: ['while', 'True', '조건'],
        quiz: {
          question: 'while True:는 어떤 상황을 만드나요?',
          options: ['한 번만 실행', '조건부 실행', '무한 반복', '에러 발생'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '숫자 맞추기 게임 만들기',
        description: 'break를 사용해서 반복문을 즉시 종료합니다.',
        prompt: `1부터 10 사이의 숫자를 맞추는 게임을 만들어줘.
정답을 맞출 때까지 계속 입력받고, 맞으면 "정답!"을 출력하고 끝나게 해줘.
힌트로 "더 크게" 또는 "더 작게"를 알려줘.`,
        expectedKeywords: ['while', 'break', 'if'],
        quiz: {
          question: 'break가 하는 일은?',
          options: ['프로그램 종료', '반복문 즉시 종료', '다음 반복으로 넘어가기', '에러 발생'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 7, title: '글자 다루기 (문자열)' },
  },

  // ============================================
  // Day 7: 글자 다루기 (문자열)
  // ============================================
  7: {
    day: 7,
    title: '글자 다루기 (문자열)',
    subtitle: '문자열 슬라이싱과 메서드를 사용해서 글자를 다룹니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '문자열 자르고 붙이기',
        description: '슬라이싱으로 문자열의 일부를 가져옵니다.',
        prompt: `주민등록번호 앞 6자리를 입력받아서 생년월일을 "YYYY년 MM월 DD일" 형식으로 출력하는 Python 코드 만들어줘`,
        expectedKeywords: ['슬라이싱', '[:]', '인덱스'],
        quiz: {
          question: 'text = "Hello"일 때, text[0]의 값은?',
          options: ['H', 'e', 'Hello', '에러'],
          correctAnswer: 0,
        },
      },
      {
        id: 2,
        title: '문자열 변환하기',
        description: '문자열을 대문자/소문자로 바꾸거나 공백을 제거합니다.',
        prompt: `사용자가 입력한 문장을 대문자로 바꿔서 출력하고, 글자 수도 알려주는 Python 코드 만들어줘`,
        expectedKeywords: ['upper', 'lower', 'len'],
        quiz: {
          question: '"hello".upper()의 결과는?',
          options: ['hello', 'HELLO', 'Hello', 'hELLO'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 8, title: '여러 개 저장하기 (리스트)' },
  },

  // ============================================
  // Day 8: 여러 개 저장하기 (리스트)
  // ============================================
  8: {
    day: 8,
    title: '여러 개 저장하기 (리스트)',
    subtitle: '리스트를 만들고 항목을 추가/삭제합니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '리스트 만들고 사용하기',
        description: '리스트에 여러 값을 저장하고 하나씩 출력합니다.',
        prompt: `쇼핑 목록을 리스트로 만들고, 하나씩 출력하는 Python 코드 만들어줘.
목록: 우유, 빵, 계란, 사과`,
        expectedKeywords: ['리스트', '[]', 'for', 'in'],
        quiz: {
          question: '리스트를 만들 때 사용하는 괄호는?',
          options: ['()', '{}', '[]', '<>'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '리스트에 추가하고 삭제하기',
        description: 'append()와 remove()로 리스트를 수정합니다.',
        prompt: `할일 목록 프로그램을 만들어줘.
1. 할일 추가
2. 할일 보기
3. 할일 삭제
4. 종료
메뉴를 선택하면 해당 기능이 실행되도록 해줘.`,
        expectedKeywords: ['append', 'remove', 'while'],
        quiz: {
          question: '리스트 끝에 항목을 추가하는 메서드는?',
          options: ['add()', 'insert()', 'append()', 'push()'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 9, title: '리스트 활용하기' },
  },

  // ============================================
  // Day 9: 리스트 활용하기
  // ============================================
  9: {
    day: 9,
    title: '리스트 활용하기',
    subtitle: '리스트 함수와 리스트 컴프리헨션을 사용합니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '리스트에서 최대/최소 찾기',
        description: 'max(), min(), sum() 함수로 리스트를 계산합니다.',
        prompt: `5개의 점수를 입력받아서 최고점, 최저점, 평균을 구하는 Python 코드 만들어줘`,
        expectedKeywords: ['max', 'min', 'sum', 'len'],
        quiz: {
          question: '[1, 2, 3]의 sum() 결과는?',
          options: ['3', '6', '[1, 2, 3]', '에러'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '리스트 컴프리헨션',
        description: '리스트 컴프리헨션으로 간결하게 리스트를 만듭니다.',
        prompt: `1부터 10까지의 숫자 중에서 짝수만 모은 리스트를 만드는 Python 코드를 리스트 컴프리헨션으로 만들어줘`,
        expectedKeywords: ['컴프리헨션', 'for', 'if', '[]'],
        quiz: {
          question: '[x for x in range(5)]의 결과는?',
          options: ['[1, 2, 3, 4, 5]', '[0, 1, 2, 3, 4]', '[0, 1, 2, 3, 4, 5]', '에러'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 10, title: '키-값 저장하기 (딕셔너리)' },
  },

  // ============================================
  // Day 10: 키-값 저장하기 (딕셔너리)
  // ============================================
  10: {
    day: 10,
    title: '키-값 저장하기 (딕셔너리)',
    subtitle: '딕셔너리로 이름표와 값을 함께 저장합니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '딕셔너리 만들고 사용하기',
        description: '딕셔너리로 구조화된 데이터를 저장합니다.',
        prompt: `학생 정보(이름, 나이, 학년, 반)를 딕셔너리로 저장하고 출력하는 Python 코드 만들어줘`,
        expectedKeywords: ['딕셔너리', '{}', ':', 'key'],
        quiz: {
          question: '딕셔너리를 만들 때 사용하는 괄호는?',
          options: ['[]', '()', '{}', '<>'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '딕셔너리로 데이터 관리하기',
        description: '딕셔너리에 데이터를 추가/수정/검색합니다.',
        prompt: `간단한 전화번호부 프로그램을 만들어줘.
이름을 입력하면 전화번호를 보여주고, 새 연락처도 추가할 수 있게 해줘.`,
        expectedKeywords: ['딕셔너리', 'in', 'keys'],
        quiz: {
          question: '딕셔너리에서 값을 가져올 때 사용하는 것은?',
          options: ['딕셔너리.값', '딕셔너리[키]', '딕셔너리(키)', '딕셔너리->키'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 11, title: '함수 만들기' },
  },

  // ============================================
  // Day 11: 함수 만들기
  // ============================================
  11: {
    day: 11,
    title: '함수 만들기',
    subtitle: 'def로 함수를 정의하고 호출합니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '함수 정의하고 호출하기',
        description: 'def 키워드로 함수를 만들고 호출합니다.',
        prompt: `인사 메시지를 출력하는 함수를 만들고, 3번 호출하는 Python 코드 만들어줘`,
        expectedKeywords: ['def', '함수', '호출'],
        quiz: {
          question: '함수를 정의할 때 사용하는 키워드는?',
          options: ['function', 'func', 'def', 'define'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '매개변수와 반환값',
        description: '함수에 값을 전달하고 결과를 받습니다.',
        prompt: `두 숫자를 받아서 합계를 반환하는 함수를 만들고, 여러 숫자로 테스트하는 Python 코드 만들어줘`,
        expectedKeywords: ['매개변수', 'return', '반환'],
        quiz: {
          question: '함수에서 값을 돌려줄 때 사용하는 키워드는?',
          options: ['give', 'send', 'return', 'output'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 12, title: '함수 활용하기' },
  },

  // ============================================
  // Day 12: 함수 활용하기
  // ============================================
  12: {
    day: 12,
    title: '함수 활용하기',
    subtitle: '기본값 매개변수와 실용적인 함수를 만듭니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '기본값 매개변수',
        description: '매개변수에 기본값을 지정해서 생략 가능하게 합니다.',
        prompt: `이름을 받아서 인사하는 함수를 만들어줘.
이름을 안 주면 "손님"이라고 인사하도록 기본값을 설정해줘.`,
        expectedKeywords: ['기본값', '=', '매개변수'],
        quiz: {
          question: 'def greet(name="손님")에서 greet()을 호출하면?',
          options: ['에러 발생', '"손님"에게 인사', '아무 일도 안 함', 'None 반환'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '실용적인 함수 만들기',
        description: '기능별로 함수를 나눠서 프로그램을 만듭니다.',
        prompt: `간단한 계산기 프로그램을 만들어줘.
덧셈, 뺄셈, 곱셈, 나눗셈 각각을 함수로 만들고,
메뉴에서 선택하면 해당 함수를 호출하도록 해줘.`,
        expectedKeywords: ['함수', 'def', '분리'],
        quiz: {
          question: '기능별로 함수를 나누는 이유는?',
          options: ['필수라서', '관리와 수정이 쉬워서', '속도가 빨라서', '메모리 절약'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 13, title: '모듈 사용하기' },
  },

  // ============================================
  // Day 13: 모듈 사용하기
  // ============================================
  13: {
    day: 13,
    title: '모듈 사용하기',
    subtitle: 'import로 모듈을 가져와서 유용한 기능을 사용합니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '내장 모듈 활용하기',
        description: 'random 모듈로 랜덤 숫자를 생성합니다.',
        prompt: `random 모듈을 사용해서 로또 번호 6개를 생성하는 Python 코드 만들어줘.
1~45 사이의 중복되지 않는 숫자 6개를 오름차순으로 출력해줘.`,
        expectedKeywords: ['import', 'random', 'sample'],
        quiz: {
          question: '모듈을 가져올 때 사용하는 키워드는?',
          options: ['include', 'require', 'import', 'using'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '날짜와 시간 다루기',
        description: 'datetime 모듈로 날짜와 시간을 계산합니다.',
        prompt: `생년월일을 입력받아서 만 나이와 태어난 요일을 알려주는 Python 코드 만들어줘`,
        expectedKeywords: ['datetime', 'date', 'today'],
        quiz: {
          question: '오늘 날짜를 가져오는 방법은?',
          options: ['date.now()', 'datetime.today()', 'datetime.date.today()', 'time.now()'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 14, title: '파일 다루기' },
  },

  // ============================================
  // Day 14: 파일 다루기
  // ============================================
  14: {
    day: 14,
    title: '파일 다루기',
    subtitle: '파일을 읽고 쓰는 방법을 배웁니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '파일 읽기',
        description: '텍스트 파일의 내용을 읽어옵니다.',
        prompt: `텍스트 파일을 읽어서 내용을 출력하고, 줄 수와 글자 수도 알려주는 Python 코드 만들어줘`,
        expectedKeywords: ['open', 'read', 'with'],
        quiz: {
          question: '파일을 읽기 모드로 열 때 사용하는 옵션은?',
          options: ["'w'", "'r'", "'a'", "'x'"],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '파일 쓰기',
        description: '텍스트 파일에 내용을 저장합니다.',
        prompt: `일기장 프로그램을 만들어줘.
오늘 날짜와 함께 일기를 입력받아서 파일에 저장하고,
저장된 일기를 볼 수 있게 해줘.`,
        expectedKeywords: ['open', 'write', 'w', 'a'],
        quiz: {
          question: '파일 끝에 내용을 추가할 때 사용하는 모드는?',
          options: ["'w'", "'r'", "'a'", "'x'"],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 15, title: '미니 프로젝트' },
  },

  // ============================================
  // Day 15: 미니 프로젝트
  // ============================================
  15: {
    day: 15,
    title: '미니 프로젝트',
    subtitle: '배운 모든 것을 조합해서 프로그램을 완성합니다.',
    videoId: 't5wbUqTCHLc',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '프로젝트 선택하기',
        description: '원하는 프로젝트를 선택해서 AI에게 요청합니다.',
        prompt: `영어 단어와 뜻을 저장하고, 퀴즈를 푸는 프로그램을 만들어줘.
- 단어 추가/삭제
- 전체 단어 보기
- 랜덤 퀴즈
- 파일에 저장/불러오기`,
        expectedKeywords: ['프로젝트', '함수', '파일'],
        quiz: {
          question: '프로젝트에서 사용된 개념이 아닌 것은?',
          options: ['리스트', '딕셔너리', '함수', '웹 스크래핑'],
          correctAnswer: 3,
        },
      },
      {
        id: 2,
        title: '프로젝트 구현하기',
        description: '프로젝트를 완성하고 기능을 추가합니다.',
        prompt: `간단한 가계부 프로그램을 만들어줘.
- 수입/지출 추가
- 월별 합계 보기
- 파일에 저장/불러오기`,
        expectedKeywords: ['완성', '기능', '추가'],
        quiz: {
          question: '초급 과정을 완료했습니다! 다음 단계는?',
          options: ['끝', '중급 과정', '처음부터 다시', '다른 언어 배우기'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: null,
  },
}

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
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
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
              <p className="text-3xl font-bold text-blue-600 mb-4">{info.price.toLocaleString()}원</p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
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

  const getFileName = () => {
    return `Python_${level}_Day${day}_목표${goal.id}_${goal.title.replace(/\s+/g, '_')}.txt`;
  };

  const handleSaveAs = async () => {
    if (!aiResult.trim()) return;
    const fileName = getFileName();
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: fileName,
          types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }],
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
    <div ref={sectionRef} className="bg-white rounded-xl border-2 border-yellow-400 shadow-lg overflow-hidden">
      {/* 섹션 헤더 - Python 테마 (노란색) */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
            {goalIndex + 1}
          </div>
          <div>
            <p className="text-yellow-100 text-sm">목표 {goalIndex + 1} / {totalGoals}</p>
            <h3 className="font-bold text-lg">{goal.title}</h3>
          </div>
        </div>
        <p className="text-yellow-100 text-sm mt-2 ml-11">{goal.description}</p>
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
            className="w-full h-36 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none text-gray-800 text-sm font-mono"
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

          <div className="bg-yellow-50 rounded-lg p-3">
            <p className="text-xs text-yellow-700 mb-2 flex items-center gap-1">
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
            placeholder="AI의 답변을 여기에 붙여넣으세요 (Ctrl+V)... 나중에 VS Code에서 실행하여 검증할 수 있습니다."
          />

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveAs}
                disabled={!aiResult.trim()}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  aiResult.trim()
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
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
                  📁 <strong>다운로드</strong>: 기본 다운로드 폴더에 저장됨
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
                let optionClass = 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50';
                if (showQuizResult) {
                  if (idx === goal.quiz.correctAnswer) {
                    optionClass = 'border-green-500 bg-green-50';
                  } else if (idx === selectedAnswer && !isQuizCorrect) {
                    optionClass = 'border-red-500 bg-red-50';
                  }
                } else if (idx === selectedAnswer) {
                  optionClass = 'border-yellow-500 bg-yellow-50';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !showQuizResult && setSelectedAnswer(idx)}
                    disabled={showQuizResult}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${optionClass}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAnswer === idx ? 'border-yellow-500' : 'border-gray-300'}`}>
                        {selectedAnswer === idx && <div className="w-2 h-2 rounded-full bg-yellow-500" />}
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
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
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
export default function PythonPCLessonDayPage() {
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
  const courseId = 'python-pc';

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
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
          <Link href={`/course/coding/python-pc/${level}`} className="text-yellow-600 hover:underline">
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
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mr-2">
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
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* 네비게이션 */}
        <div className="flex items-center gap-2">
          <Link
            href={`/course/coding/python-pc/${level}`}
            className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-200 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            강의 목록으로
          </Link>
          <span className="px-3 py-1.5 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium">Day {day}</span>
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

        {/* 강의 제목 - Python 테마 */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🐍</span>
            <h1 className="text-2xl font-bold">{lessonData.title}</h1>
          </div>
          <p className="text-yellow-100 text-sm">{lessonData.subtitle}</p>

          {/* 진행률 */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>진행률</span>
              <span>{completedGoals.length}/{lessonData.goals.length} 완료</span>
            </div>
            <div className="w-full bg-yellow-700/50 rounded-full h-2">
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
            <Target className="w-5 h-5 text-yellow-600" />
            <h2 className="font-bold text-gray-900">오늘의 학습 목표</h2>
          </div>
          <div className="space-y-2">
            {lessonData.goals.map((goal: any, idx: number) => (
              <div key={goal.id} className="flex items-center gap-3">
                {completedGoals.includes(goal.id) ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : idx === currentGoalIndex ? (
                  <div className="w-5 h-5 border-2 border-yellow-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
                <span className={`text-sm ${completedGoals.includes(goal.id) ? 'text-green-700 line-through' : idx === currentGoalIndex ? 'text-yellow-700 font-medium' : 'text-gray-400'}`}>
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
                href={`/course/coding/python-pc/${level}/lesson/${lessonData.nextLesson.day}`}
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
              href={`/course/coding/python-pc/${level}/lesson/${day - 1}`}
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
              href={`/course/coding/python-pc/${level}/lesson/${day + 1}`}
              className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
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
