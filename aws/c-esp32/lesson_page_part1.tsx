'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, CheckCircle, Copy, Check, Code, Lightbulb, ExternalLink, FileText, AlertTriangle } from 'lucide-react';

// 포트설명서 참조 안내
const portSpecNote = `
⚠️ 중요: 포트설명서를 AI에게 함께 첨부하세요!

프롬프트와 함께 'ESP32_회로도_분석_보고서.md' 파일을 AI에게 첨부하면
정확한 핀 번호와 Active HIGH 제어 방식을 적용한 코드를 생성합니다.

핀 정보 요약:
- LED: RED(25), YELLOW(26), BLUE(27) - HIGH=켜짐
- SWITCH: GPIO32 - LOW=눌림 (외부 디바운싱)
- BEEP 부저: GPIO14 - 직접 구동
- MELODY 부저: GPIO33 - 트랜지스터 구동
- I2C: SDA(21), SCL(22)
- I2C 장치: AHT20(0x38), OLED(0x3C)
- LoRa UART2: TX(17), RX(16), M0(15), M1(4), AUX(34)
`;

// 초급 과정 Part 1 (Day 1-5): GPIO 기본
export const beginnerPromptsPart1: { [day: number]: { title: string; project: string; prompt: string; files: string[] } } = {
  1: {
    title: '환경설정 및 Hello World',
    project: '시리얼 모니터 출력',
    files: ['main.ino', 'README.md'],
    prompt: `[Day 1] ESP32 Arduino - 환경설정 및 Hello World

프로젝트: 시리얼 모니터 출력

프로젝트 구조:
day01_hello/
├── main.ino              # 메인 프로그램
└── README.md

요구사항:
1. Arduino IDE ESP32 보드 설정 확인
2. Serial.begin(115200)로 시리얼 통신 시작
3. "Hello ESP32!" 메시지 출력
4. 1초 간격으로 카운터 증가 출력
5. 각 파일에 한글 주석 포함

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(Arduino IDE 설정 및 업로드 방법)
===== 파일 끝 =====`
  },
  2: {
    title: 'LED 켜기/끄기',
    project: 'LED 제어',
    files: ['main.ino', 'led_control.h', 'led_control.cpp', 'README.md'],
    prompt: `[Day 2] ESP32 Arduino - LED 켜기/끄기

프로젝트: LED 제어

프로젝트 구조:
day02_led/
├── main.ino              # 메인 프로그램
├── led_control.h         # LED 제어 헤더
├── led_control.cpp       # LED 제어 구현
└── README.md

요구사항:
1. RED LED(GPIO25) 켜기/끄기
2. **중요: Active HIGH 방식** - digitalWrite(pin, HIGH)가 LED 켜짐
3. pinMode(LED_RED, OUTPUT) 설정
4. 1초 간격 깜빡이기
5. 시리얼 모니터에 현재 상태 출력

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.h =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  3: {
    title: '신호등 만들기',
    project: '3색 신호등',
    files: ['main.ino', 'traffic_light.h', 'traffic_light.cpp', 'README.md'],
    prompt: `[Day 3] ESP32 Arduino - 신호등 만들기

프로젝트: 3색 신호등

프로젝트 구조:
day03_traffic/
├── main.ino
├── traffic_light.h
├── traffic_light.cpp
└── README.md

요구사항:
1. 3색 LED 사용: RED(25), YELLOW(26), BLUE(27)
2. **Active HIGH**: digitalWrite(pin, HIGH) = LED 켜짐
3. 신호등 타이밍: 빨강 3초 → 노랑 1초 → 파랑 3초
4. 시리얼 모니터에 현재 신호 상태 출력
5. delay() 함수 활용

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: traffic_light.h =====
(코드)
===== 파일 끝 =====

===== 파일: traffic_light.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  4: {
    title: '버튼 입력 처리',
    project: '버튼으로 LED 토글',
    files: ['main.ino', 'button.h', 'button.cpp', 'led_control.h', 'led_control.cpp', 'README.md'],
    prompt: `[Day 4] ESP32 Arduino - 버튼 입력 처리

프로젝트: 버튼으로 LED 토글

프로젝트 구조:
day04_button/
├── main.ino
├── button.h
├── button.cpp
├── led_control.h
├── led_control.cpp
└── README.md

요구사항:
1. SWITCH(GPIO32) 상태 읽기
2. **Active LOW**: 버튼 누르면 digitalRead() == LOW
3. pinMode(32, INPUT) 설정 (외부 풀업 저항 있음)
4. 버튼 누르면 RED LED 토글
5. 디바운싱 처리 (200ms delay)
6. 시리얼 모니터에 버튼 이벤트 출력

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: button.h =====
(코드)
===== 파일 끝 =====

===== 파일: button.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.h =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  5: {
    title: '버튼 인터럽트와 부저',
    project: '도어벨 시스템',
    files: ['main.ino', 'gpio_handler.h', 'gpio_handler.cpp', 'README.md'],
    prompt: `[Day 5] ESP32 Arduino - 버튼 인터럽트와 부저

프로젝트: 도어벨 시스템

프로젝트 구조:
day05_doorbell/
├── main.ino
├── gpio_handler.h
├── gpio_handler.cpp
└── README.md

요구사항:
1. attachInterrupt() 사용하여 버튼 감지
2. SWITCH(GPIO32) FALLING edge 감지
3. 버튼 누르면 BEEP 부저(GPIO14) 울림 + LED 깜빡임
4. volatile 변수로 인터럽트 플래그 처리
5. ISR 내에서는 최소한의 작업만 수행
6. 디바운싱: millis() 활용

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: gpio_handler.h =====
(코드)
===== 파일 끝 =====

===== 파일: gpio_handler.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  }
};

export default beginnerPromptsPart1;
