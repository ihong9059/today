'use client';

import { useState, useEffect } from 'react';
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
  'test@test.com': ['c-esp32', 'c-pc'],
};

// 강좌 정보
const courseInfo: Record<string, { title: string; price: number }> = {
  'c-pc': { title: 'C 언어 (PC)', price: 79000 },
};

// 무료 AI 목록
const aiServices = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'bg-green-500 hover:bg-green-600', icon: '🤖' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/', color: 'bg-orange-500 hover:bg-orange-600', icon: '🧠' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/', color: 'bg-blue-500 hover:bg-blue-600', icon: '✨' },
  { id: 'copilot', name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'bg-purple-500 hover:bg-purple-600', icon: '💡' },
];

// Day별 레슨 데이터 - 15일 완성 커리큘럼
const lessonDataByDay: Record<number, any> = {
  // === 1주차: 시작하기 ===
  1: {
    day: 1,
    title: 'C 언어 소개와 개발환경 설정',
    subtitle: 'C 언어의 역사와 특징을 이해하고 VS Code 개발환경을 설정합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 1: 개발환경 설정',
    goals: [
      {
        id: 1,
        title: 'C 언어의 역사와 특징 이해하기',
        description: 'C 언어가 언제, 누구에 의해 만들어졌는지, 그리고 C 언어의 주요 특징을 학습합니다.',
        prompt: `C 언어를 처음 배우려고 합니다. 다음 질문에 대해 초보자도 이해할 수 있게 설명해주세요:

1. C 언어는 언제, 누가 만들었나요?
2. C 언어의 가장 큰 특징 3가지는 무엇인가요?
3. C 언어가 다른 프로그래밍 언어에 미친 영향은?

간단한 예시와 함께 설명해주세요.`,
        expectedKeywords: ['Dennis Ritchie', '1972', '컴파일'],
        quiz: {
          question: 'C 언어를 개발한 사람은 누구인가요?',
          options: ['Linus Torvalds', 'Dennis Ritchie', 'Bjarne Stroustrup', 'James Gosling'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'Visual Studio Code 설치 및 설정 배우기',
        description: 'Windows에서 C 언어 개발환경을 구축하는 방법을 학습합니다.',
        prompt: `Windows에서 C 언어 개발환경을 설정하려고 합니다. 다음 질문에 답해주세요:

1. Visual Studio Code를 어디서 다운로드하나요?
2. C 언어 컴파일러(MinGW)는 어떻게 설치하나요?
3. VS Code에서 C 언어 확장 프로그램은 무엇을 설치해야 하나요?
4. 환경변수 PATH 설정은 왜 필요한가요?

단계별로 자세히 설명해주세요.`,
        expectedKeywords: ['VS Code', 'MinGW', 'gcc', 'PATH'],
        quiz: {
          question: 'C 프로그램을 컴파일하기 위해 필요한 것은?',
          options: ['인터프리터', '컴파일러 (gcc)', 'JVM', '브라우저'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '첫 번째 Hello World 프로그램 작성하기',
        description: '간단한 C 프로그램을 작성하고 실행해봅니다.',
        prompt: `C 언어로 첫 번째 프로그램을 작성하려고 합니다. 다음을 설명해주세요:

1. "Hello World"를 출력하는 가장 간단한 C 코드를 보여주세요.
2. #include <stdio.h>는 무엇인가요?
3. main() 함수는 왜 필요한가요?
4. printf() 함수는 어떻게 사용하나요?
5. 코드를 컴파일하고 실행하는 명령어는?

코드 예시와 함께 설명해주세요.`,
        expectedKeywords: ['printf', 'main', 'stdio.h', 'gcc'],
        quiz: {
          question: 'C 언어에서 화면에 출력할 때 사용하는 함수는?',
          options: ['console.log()', 'print()', 'printf()', 'echo()'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 2, title: '프로그램의 기본 구조' },
  },

  2: {
    day: 2,
    title: '프로그램의 기본 구조',
    subtitle: 'C 프로그램의 기본 구조와 주석, 문장의 구성을 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 2: 프로그램 기본 구조',
    goals: [
      {
        id: 1,
        title: 'C 프로그램의 기본 구조 이해하기',
        description: '#include, main 함수, 코드 블록의 역할을 학습합니다.',
        prompt: `C 프로그램의 기본 구조를 배우려고 합니다:

1. #include <stdio.h>에서 #include는 무엇인가요? (전처리기 지시문)
2. int main()에서 int와 main의 의미는?
3. { }로 감싸는 코드 블록의 역할은?
4. return 0;은 무엇을 의미하나요?
5. 세미콜론(;)은 왜 필요한가요?

코드 예시와 함께 설명해주세요.`,
        expectedKeywords: ['main', 'return', 'include', '블록'],
        quiz: {
          question: '프로그램의 시작점이 되는 함수는?',
          options: ['start()', 'main()', 'begin()', 'init()'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '주석 작성 방법 배우기',
        description: '코드에 설명을 추가하는 주석 작성법을 학습합니다.',
        prompt: `C 언어에서 주석을 작성하는 방법을 알려주세요:

1. 한 줄 주석(//)은 어떻게 사용하나요?
2. 여러 줄 주석(/* */)은 어떻게 사용하나요?
3. 주석은 왜 필요한가요?
4. 좋은 주석을 작성하는 팁은?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['주석', '//', '/*', '*/'],
        quiz: {
          question: '문장의 끝을 나타내는 기호는?',
          options: [':', '.', ';', ','],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 3, title: '출력과 이스케이프 문자' },
  },

  3: {
    day: 3,
    title: '출력과 이스케이프 문자',
    subtitle: 'printf 함수와 이스케이프 문자를 활용한 출력을 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 3: 출력과 이스케이프 문자',
    goals: [
      {
        id: 1,
        title: 'printf() 함수 다양하게 활용하기',
        description: 'printf 함수로 여러 줄을 출력하는 방법을 학습합니다.',
        prompt: `printf() 함수를 다양하게 사용하는 방법을 알려주세요:

1. printf로 여러 줄을 출력하는 방법은?
2. 이스케이프 문자란 무엇인가요?
3. \\n (줄바꿈), \\t (탭)의 사용법은?
4. \\\\ (역슬래시), \\" (큰따옴표) 출력 방법은?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['printf', '\\n', '\\t', '이스케이프'],
        quiz: {
          question: '줄바꿈을 나타내는 이스케이프 문자는?',
          options: ['\\t', '\\n', '\\r', '\\b'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '이스케이프 문자 종류 알기',
        description: '다양한 이스케이프 문자를 활용합니다.',
        prompt: `C 언어의 이스케이프 문자 종류를 모두 알려주세요:

1. \\n, \\t, \\r의 차이점은?
2. \\', \\", \\\\는 각각 무엇인가요?
3. %%는 왜 필요한가요?
4. 실무에서 자주 사용하는 이스케이프 문자는?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['\\n', '\\t', '\\\\', '\\"'],
        quiz: {
          question: '탭을 나타내는 이스케이프 문자는?',
          options: ['\\n', '\\t', '\\s', '\\a'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 4, title: '변수와 자료형 (정수)' },
  },

  // === 2주차: 데이터 다루기 ===
  4: {
    day: 4,
    title: '변수와 자료형 (정수)',
    subtitle: '변수의 개념과 정수형 자료형을 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 4: 변수와 정수형',
    goals: [
      {
        id: 1,
        title: '변수의 개념 이해하기',
        description: '변수가 무엇이고 왜 필요한지 학습합니다.',
        prompt: `C 언어의 변수에 대해 설명해주세요:

1. 변수(variable)란 무엇인가요?
2. 변수를 사용하는 이유는?
3. 변수 이름을 짓는 규칙은? (naming convention)
4. 변수 선언과 초기화의 차이는?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['변수', '선언', '초기화', '메모리'],
        quiz: {
          question: '정수를 저장하는 자료형은?',
          options: ['float', 'char', 'int', 'double'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '정수형 자료형 (int) 사용하기',
        description: 'int 자료형으로 정수를 다루는 방법을 학습합니다.',
        prompt: `C 언어의 정수형 자료형에 대해 알려주세요:

1. int 자료형이란?
2. int의 크기와 범위는?
3. %d 서식 지정자 사용법은?
4. short, long, long long의 차이는?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['int', '%d', '정수', '자료형'],
        quiz: {
          question: '정수를 출력하는 서식 지정자는?',
          options: ['%s', '%c', '%d', '%f'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 5, title: '변수와 자료형 (실수, 문자)' },
  },

  5: {
    day: 5,
    title: '변수와 자료형 (실수, 문자)',
    subtitle: '실수형과 문자형 자료형을 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 5: 실수형과 문자형',
    goals: [
      {
        id: 1,
        title: '실수형 자료형 (float, double) 사용하기',
        description: '소수점이 있는 숫자를 다루는 방법을 학습합니다.',
        prompt: `C 언어의 실수형 자료형에 대해 설명해주세요:

1. float과 double의 차이점은?
2. %f 서식 지정자 사용법은?
3. %.2f처럼 소수점 자리수 지정하는 방법은?
4. 실수 연산 시 주의할 점은?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['float', 'double', '%f', '소수점'],
        quiz: {
          question: '실수를 저장하는 자료형 2가지는?',
          options: ['int, char', 'float, double', 'short, long', 'byte, word'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '문자형 자료형 (char) 사용하기',
        description: '한 글자를 저장하는 char 자료형을 학습합니다.',
        prompt: `C 언어의 문자형 자료형에 대해 설명해주세요:

1. char 자료형이란?
2. 문자는 왜 작은따옴표(' ')로 감싸나요?
3. %c 서식 지정자 사용법은?
4. 문자와 ASCII 코드의 관계는?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['char', '%c', '문자', 'ASCII'],
        quiz: {
          question: '문자를 저장하는 자료형은?',
          options: ['int', 'float', 'char', 'string'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 6, title: '연산자' },
  },

  6: {
    day: 6,
    title: '연산자',
    subtitle: '산술, 대입, 증감 연산자를 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 6: 연산자',
    goals: [
      {
        id: 1,
        title: '산술 연산자 사용하기',
        description: '더하기, 빼기, 곱하기, 나누기, 나머지 연산을 학습합니다.',
        prompt: `C 언어의 산술 연산자에 대해 설명해주세요:

1. +, -, *, /, % 연산자 사용법은?
2. 나머지 연산자(%)는 어디에 쓰이나요?
3. 정수 나눗셈과 실수 나눗셈의 차이는?
4. 5/2의 결과가 2인 이유는?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['+', '-', '*', '/', '%'],
        quiz: {
          question: '나머지를 구하는 연산자는?',
          options: ['/', '%', '&', '#'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '복합 대입 연산자와 증감 연산자',
        description: '+=, -=, ++, -- 연산자를 학습합니다.',
        prompt: `C 언어의 복합 대입 연산자와 증감 연산자에 대해 설명해주세요:

1. +=, -=, *=, /= 연산자란?
2. a = a + 5를 짧게 쓰는 방법은?
3. ++와 --는 무엇인가요?
4. 전위 증가(++a)와 후위 증가(a++)의 차이는?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['+=', '++', '--', '복합'],
        quiz: {
          question: 'a = a + 5를 짧게 쓰면?',
          options: ['a += 5', 'a =+ 5', 'a ++ 5', 'a + 5'],
          correctAnswer: 0,
        },
      },
    ],
    nextLesson: { day: 7, title: '조건문 (if-else)' },
  },

  // === 3주차: 흐름 제어 ===
  7: {
    day: 7,
    title: '조건문 (if-else)',
    subtitle: '조건에 따라 코드를 실행하는 if문을 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 7: 조건문',
    goals: [
      {
        id: 1,
        title: 'if문으로 조건 판단하기',
        description: '조건이 참일 때만 실행하는 if문을 학습합니다.',
        prompt: `C 언어의 if문에 대해 설명해주세요:

1. if문의 기본 구조는?
2. 조건식에 사용되는 비교 연산자(==, !=, <, >, <=, >=)는?
3. if-else문은 어떻게 사용하나요?
4. if-else if-else 구조는?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['if', 'else', '조건', '비교'],
        quiz: {
          question: '같음을 비교하는 연산자는?',
          options: ['=', '==', '===', ':='],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '논리 연산자 이해하기',
        description: 'AND, OR, NOT 논리 연산자를 학습합니다.',
        prompt: `C 언어의 논리 연산자에 대해 설명해주세요:

1. && (AND) 연산자는?
2. || (OR) 연산자는?
3. ! (NOT) 연산자는?
4. 여러 조건을 조합하는 방법은?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['&&', '||', '!', '논리'],
        quiz: {
          question: 'AND 논리 연산자는?',
          options: ['&', '&&', 'and', 'AND'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 8, title: '조건문 (switch)' },
  },

  8: {
    day: 8,
    title: '조건문 (switch)',
    subtitle: '값에 따라 분기하는 switch문을 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 8: switch문',
    goals: [
      {
        id: 1,
        title: 'switch문의 구조 이해하기',
        description: 'switch-case 구조를 학습합니다.',
        prompt: `C 언어의 switch문에 대해 설명해주세요:

1. switch문의 기본 구조는?
2. case는 어떻게 사용하나요?
3. break는 왜 필요한가요?
4. default는 언제 실행되나요?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['switch', 'case', 'break', 'default'],
        quiz: {
          question: 'switch문에서 각 경우를 나타내는 키워드는?',
          options: ['when', 'case', 'if', 'match'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'if문과 switch문 비교하기',
        description: '언제 if를 쓰고 언제 switch를 쓰는지 학습합니다.',
        prompt: `if문과 switch문의 차이점을 설명해주세요:

1. switch문은 언제 사용하면 좋나요?
2. if문과 switch문의 장단점은?
3. switch문에서 사용할 수 없는 자료형은?
4. fall-through란 무엇인가요?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['switch', 'if', 'break', 'fall-through'],
        quiz: {
          question: 'case 끝에 반드시 써야 하는 키워드는?',
          options: ['continue', 'break', 'exit', 'stop'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 9, title: '반복문 (for, while)' },
  },

  9: {
    day: 9,
    title: '반복문 (for, while)',
    subtitle: '코드를 반복 실행하는 for문과 while문을 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 9: 반복문',
    goals: [
      {
        id: 1,
        title: 'for문으로 반복 실행하기',
        description: '횟수가 정해진 반복에 for문을 사용합니다.',
        prompt: `C 언어의 for문에 대해 설명해주세요:

1. for문의 기본 구조 for(초기화; 조건; 증감)은?
2. 1부터 10까지 출력하는 for문 예시는?
3. for문의 실행 순서는?
4. 중첩 for문이란?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['for', '초기화', '조건', '증감'],
        quiz: {
          question: 'for문의 3가지 구성요소는?',
          options: ['시작, 끝, 단계', '초기화, 조건, 증감', '입력, 처리, 출력', '선언, 실행, 종료'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'while문과 break, continue',
        description: '조건에 따른 반복과 제어를 학습합니다.',
        prompt: `C 언어의 while문과 반복 제어에 대해 설명해주세요:

1. while문의 기본 구조는?
2. for문과 while문의 차이는?
3. break로 반복문을 빠져나오는 방법은?
4. continue로 다음 반복으로 건너뛰는 방법은?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['while', 'break', 'continue', '반복'],
        quiz: {
          question: '반복문을 강제로 빠져나오는 키워드는?',
          options: ['exit', 'stop', 'break', 'end'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 10, title: '함수 기초' },
  },

  // === 4주차: 함수와 배열 ===
  10: {
    day: 10,
    title: '함수 기초',
    subtitle: '재사용 가능한 코드 블록인 함수를 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 10: 함수',
    goals: [
      {
        id: 1,
        title: '함수의 개념과 필요성 이해하기',
        description: '함수가 무엇이고 왜 필요한지 학습합니다.',
        prompt: `C 언어의 함수에 대해 설명해주세요:

1. 함수(function)란 무엇인가요?
2. 함수를 사용하는 이유는?
3. 함수 선언, 정의, 호출의 차이는?
4. 반환형, 함수이름, 매개변수란?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['함수', '선언', '정의', '호출'],
        quiz: {
          question: '함수가 값을 반환할 때 사용하는 키워드는?',
          options: ['return', 'output', 'send', 'give'],
          correctAnswer: 0,
        },
      },
      {
        id: 2,
        title: '매개변수와 반환값 사용하기',
        description: '함수에 값을 전달하고 결과를 받는 방법을 학습합니다.',
        prompt: `C 언어 함수의 매개변수와 반환값에 대해 설명해주세요:

1. 매개변수(parameter)란?
2. 인자(argument)와 매개변수의 차이는?
3. return문으로 값을 반환하는 방법은?
4. void 함수란?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['매개변수', 'return', 'void', '인자'],
        quiz: {
          question: '반환값이 없는 함수의 반환형은?',
          options: ['null', 'none', 'void', 'empty'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 11, title: '배열 기초' },
  },

  11: {
    day: 11,
    title: '배열 기초',
    subtitle: '같은 타입의 데이터를 여러 개 저장하는 배열을 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 11: 배열',
    goals: [
      {
        id: 1,
        title: '배열의 개념 이해하기',
        description: '배열이 무엇이고 왜 필요한지 학습합니다.',
        prompt: `C 언어의 배열에 대해 설명해주세요:

1. 배열(array)이란 무엇인가요?
2. 배열을 사용하는 이유는?
3. 배열 선언: int arr[5];의 의미는?
4. 인덱스는 왜 0부터 시작하나요?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['배열', '인덱스', '선언', '요소'],
        quiz: {
          question: '배열의 인덱스는 몇부터 시작하나요?',
          options: ['1', '0', '-1', '10'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '배열 요소 접근과 반복문 활용',
        description: '배열을 순회하며 요소를 다루는 방법을 학습합니다.',
        prompt: `C 언어 배열의 활용에 대해 설명해주세요:

1. 배열 요소에 접근하는 방법 arr[i]는?
2. 배열 초기화 int arr[] = {1, 2, 3};은?
3. for문으로 배열을 순회하는 방법은?
4. 배열의 합계와 평균을 구하는 방법은?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['배열', 'for', '인덱스', '순회'],
        quiz: {
          question: 'int arr[10]에서 마지막 요소의 인덱스는?',
          options: ['10', '9', '11', '0'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 12, title: '문자열' },
  },

  12: {
    day: 12,
    title: '문자열',
    subtitle: '문자 배열과 문자열 함수를 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 12: 문자열',
    goals: [
      {
        id: 1,
        title: '문자열의 개념 이해하기',
        description: '문자열이 문자 배열임을 이해합니다.',
        prompt: `C 언어의 문자열에 대해 설명해주세요:

1. 문자열(string)이란 무엇인가요?
2. 문자열과 문자 배열의 관계는?
3. 널 문자('\\0')는 왜 필요한가요?
4. char str[] = "Hello";와 char str[6] = "Hello";의 차이는?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['문자열', '\\0', 'char', '배열'],
        quiz: {
          question: '문자열의 끝을 나타내는 특수 문자는?',
          options: ['\\n', '\\0', '\\t', '\\r'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '문자열 함수 사용하기',
        description: 'strlen, strcpy, strcmp 함수를 학습합니다.',
        prompt: `C 언어의 문자열 함수에 대해 설명해주세요:

1. #include <string.h>는 왜 필요한가요?
2. strlen() 함수로 문자열 길이 구하기
3. strcpy() 함수로 문자열 복사하기
4. strcmp() 함수로 문자열 비교하기
5. strcat() 함수로 문자열 연결하기

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['strlen', 'strcpy', 'strcmp', 'string.h'],
        quiz: {
          question: '문자열 길이를 구하는 함수는?',
          options: ['length()', 'strlen()', 'size()', 'len()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 13, title: '포인터 기초' },
  },

  // === 5주차: 심화 기초 ===
  13: {
    day: 13,
    title: '포인터 기초',
    subtitle: '메모리 주소를 다루는 포인터의 기초를 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 13: 포인터 기초',
    goals: [
      {
        id: 1,
        title: '메모리 주소의 개념 이해하기',
        description: '변수가 메모리에 저장되는 방식을 학습합니다.',
        prompt: `C 언어의 메모리 주소에 대해 설명해주세요:

1. 메모리 주소란 무엇인가요?
2. & (주소 연산자)로 변수의 주소를 구하는 방법은?
3. %p 서식 지정자로 주소를 출력하는 방법은?
4. 각 자료형의 크기(sizeof)와 주소의 관계는?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['주소', '&', '메모리', 'sizeof'],
        quiz: {
          question: '변수의 주소를 구하는 연산자는?',
          options: ['*', '&', '@', '#'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '포인터 변수 선언과 사용하기',
        description: '포인터를 선언하고 역참조하는 방법을 학습합니다.',
        prompt: `C 언어의 포인터에 대해 설명해주세요:

1. 포인터(pointer)란 무엇인가요?
2. int *ptr; 선언의 의미는?
3. * (역참조 연산자)로 값을 읽고 쓰는 방법은?
4. 포인터로 변수의 값을 변경하는 방법은?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['포인터', '*', '역참조', '주소'],
        quiz: {
          question: '포인터가 가리키는 값을 구하는 연산자는?',
          options: ['&', '*', '^', '->'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 14, title: '구조체 기초' },
  },

  14: {
    day: 14,
    title: '구조체 기초',
    subtitle: '여러 자료형을 하나로 묶는 구조체를 학습합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 14: 구조체',
    goals: [
      {
        id: 1,
        title: '구조체의 개념과 필요성 이해하기',
        description: '구조체가 무엇이고 왜 필요한지 학습합니다.',
        prompt: `C 언어의 구조체에 대해 설명해주세요:

1. 구조체(struct)란 무엇인가요?
2. 구조체를 사용하는 이유는?
3. struct 키워드로 구조체를 정의하는 방법은?
4. 구조체 변수를 선언하는 방법은?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['struct', '구조체', '멤버', '정의'],
        quiz: {
          question: '구조체를 정의하는 키워드는?',
          options: ['class', 'struct', 'type', 'define'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '구조체 멤버 접근하기',
        description: '점(.) 연산자로 구조체 멤버에 접근합니다.',
        prompt: `C 언어 구조체의 멤버 접근에 대해 설명해주세요:

1. . (점) 연산자로 멤버에 접근하는 방법은?
2. 구조체를 초기화하는 방법은?
3. 구조체 배열이란?
4. -> 연산자는 언제 사용하나요?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['.', '멤버', '초기화', '접근'],
        quiz: {
          question: '구조체 멤버에 접근하는 연산자는?',
          options: [':', '.', '->', '::'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 15, title: '종합 프로젝트 - 성적 관리 프로그램' },
  },

  15: {
    day: 15,
    title: '종합 프로젝트 - 성적 관리 프로그램',
    subtitle: '15일간 배운 내용을 종합하여 실용적인 프로그램을 작성합니다.',
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 15: 종합 프로젝트',
    goals: [
      {
        id: 1,
        title: '프로그램 구조 설계하기',
        description: '성적 관리 프로그램의 전체 구조를 설계합니다.',
        prompt: `성적 관리 프로그램을 만들려고 합니다:

1. 학생 정보(이름, 국어, 영어, 수학, 평균)를 저장하는 구조체를 정의해주세요.
2. 메뉴 기반 프로그램의 while 루프 구조를 보여주세요.
3. 학생 추가, 전체 보기, 평균 보기 기능을 어떻게 나눌까요?
4. 배열로 여러 학생을 관리하는 방법은?

예시 코드와 함께 설명해주세요.`,
        expectedKeywords: ['struct', 'while', '메뉴', '배열'],
        quiz: {
          question: '이 프로그램에서 사용된 자료구조는?',
          options: ['링크드 리스트', '스택', '구조체 배열', '트리'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '함수로 기능 구현하기',
        description: '각 기능을 함수로 분리하여 구현합니다.',
        prompt: `성적 관리 프로그램의 함수를 구현하려고 합니다:

1. addStudent() 함수로 학생을 추가하는 방법은?
2. showAll() 함수로 전체 학생을 보여주는 방법은?
3. showAverage() 함수로 전체 평균을 계산하는 방법은?
4. 포인터를 사용해서 배열을 수정하는 방법은?

완성된 전체 코드를 보여주세요.`,
        expectedKeywords: ['함수', '포인터', '배열', '구조체'],
        quiz: {
          question: '포인터로 구조체 멤버에 접근하는 연산자는?',
          options: ['.', '->', ':', '::'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '15일 학습 정리',
        description: '15일간 배운 핵심 내용을 정리합니다.',
        prompt: `C 언어 15일 학습을 마무리하며 정리해주세요:

1. 1주차(시작하기): 개발환경, Hello World, 기본 구조
2. 2주차(데이터 다루기): 변수, 자료형, 연산자
3. 3주차(흐름 제어): 조건문, 반복문
4. 4주차(함수와 배열): 함수, 배열, 문자열
5. 5주차(심화 기초): 포인터, 구조체

각 주차의 핵심 개념을 요약해주세요.`,
        expectedKeywords: ['변수', '조건문', '반복문', '함수', '포인터'],
        quiz: {
          question: '메뉴를 반복하기 위해 사용한 반복문은?',
          options: ['for', 'while', 'do-while', 'foreach'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: null, // 마지막 강의
  },
};

// 수강 신청 안내 컴포넌트
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

// 개별 목표 섹션 컴포넌트
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
  const [isResultSaved, setIsResultSaved] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState(false);

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

  const [downloadedFileName, setDownloadedFileName] = useState<string | null>(null);

  // 파일명 생성
  const getFileName = () => {
    return `C언어_${level}_Day${day}_목표${goal.id}_${goal.title.replace(/\s+/g, '_')}.txt`;
  };

  // 다른 이름으로 저장 (File System Access API - Chrome/Edge)
  const handleSaveAs = async () => {
    if (!aiResult.trim()) return;

    const fileName = getFileName();

    // File System Access API 지원 여부 확인
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: fileName,
          types: [{
            description: 'Text Files',
            accept: { 'text/plain': ['.txt'] },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(aiResult);
        await writable.close();
        setDownloadedFileName(fileName);
        setTimeout(() => setDownloadedFileName(null), 5000);
      } catch (err: any) {
        // 사용자가 취소한 경우
        if (err.name !== 'AbortError') {
          console.error('Save failed:', err);
        }
      }
    } else {
      // Fallback: 일반 다운로드
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

  return (
    <div className="bg-white rounded-xl border-2 border-blue-300 shadow-lg overflow-hidden">
      {/* 섹션 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
            {goalIndex + 1}
          </div>
          <div>
            <p className="text-blue-200 text-sm">목표 {goalIndex + 1} / {totalGoals}</p>
            <h3 className="font-bold text-lg">{goal.title}</h3>
          </div>
        </div>
        <p className="text-blue-100 text-sm mt-2 ml-11">{goal.description}</p>
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
            className="w-full h-36 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-800 text-sm font-mono"
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

          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-xs text-purple-700 mb-2 flex items-center gap-1">
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
            placeholder="AI의 답변을 여기에 붙여넣으세요 (Ctrl+V)... 나중에 VS Code에서 컴파일하여 검증할 수 있습니다."
          />

          {/* 저장/다운로드 버튼 */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveAs}
                disabled={!aiResult.trim()}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  aiResult.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
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

            {/* 다운로드 안내 및 파일명 표시 */}
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
                let optionClass = 'border-gray-200 hover:border-blue-300 hover:bg-blue-50';
                if (showQuizResult) {
                  if (idx === goal.quiz.correctAnswer) {
                    optionClass = 'border-green-500 bg-green-50';
                  } else if (idx === selectedAnswer && !isQuizCorrect) {
                    optionClass = 'border-red-500 bg-red-50';
                  }
                } else if (idx === selectedAnswer) {
                  optionClass = 'border-blue-500 bg-blue-50';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !showQuizResult && setSelectedAnswer(idx)}
                    disabled={showQuizResult}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${optionClass}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAnswer === idx ? 'border-blue-500' : 'border-gray-300'}`}>
                        {selectedAnswer === idx && <div className="w-2 h-2 rounded-full bg-blue-500" />}
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
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
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

export default function CPCLessonDayPageV3() {
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
  const courseId = 'c-pc';

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

  // HTTP 환경에서도 동작하는 클립보드 복사 함수
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
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
          <Link href={`/course/coding/c-pc/${level}`} className="text-blue-600 hover:underline">
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
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* 네비게이션 */}
        <div className="flex items-center gap-2">
          <Link
            href={`/course/coding/c-pc/${level}`}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            강의 목록으로
          </Link>
          <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">Day {day}</span>
          <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">{level}</span>
        </div>

        {/* 강의 제목 */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-1">{lessonData.title}</h1>
          <p className="text-blue-200 text-sm">{lessonData.subtitle}</p>

          {/* 진행률 */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>진행률</span>
              <span>{completedGoals.length}/{lessonData.goals.length} 완료</span>
            </div>
            <div className="w-full bg-blue-900/50 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedGoals.length / lessonData.goals.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 학습 목표 목록 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-gray-900">오늘의 학습 목표</h2>
          </div>
          <div className="space-y-2">
            {lessonData.goals.map((goal: any, idx: number) => (
              <div key={goal.id} className="flex items-center gap-3">
                {completedGoals.includes(goal.id) ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : idx === currentGoalIndex ? (
                  <div className="w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
                <span className={`text-sm ${completedGoals.includes(goal.id) ? 'text-green-700 line-through' : idx === currentGoalIndex ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>
                  {goal.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 동영상 (미리보기) */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Play className="w-5 h-5 text-red-600" />
            <h2 className="font-bold text-gray-900">전체 과정 미리보기</h2>
          </div>
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
          <p className="text-sm text-gray-500 mt-2 text-center">{lessonData.videoTitle}</p>
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
            <h2 className="text-xl font-bold mb-2">Day {day} 완료!</h2>
            <p className="text-green-100 mb-4">모든 학습 목표를 달성했습니다!</p>
            {lessonData.nextLesson ? (
              <Link
                href={`/course/coding/c-pc/${level}/lesson/${lessonData.nextLesson.day}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition"
              >
                Day {lessonData.nextLesson.day}: {lessonData.nextLesson.title}
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href={`/course/coding/c-pc/${level}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition"
              >
                강좌 목록으로 돌아가기
              </Link>
            )}
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© 2025 커넥트에이아이. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
