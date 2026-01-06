'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'process',
    name: '프로세스 관리',
    color: 'from-cyan-600 to-cyan-500',
    questions: [
      { id: 1, question: '프로세스의 5가지 상태(State)를 쓰고 각각을 설명하시오.', answer: '생성(New), 준비(Ready), 실행(Running), 대기(Waiting), 종료(Terminated)', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 프로세스의 5가지 상태(State)를 쓰고 각각을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 상태 전이 다이어그램\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'PCB(Process Control Block)에 저장되는 정보 5가지를 쓰시오.', answer: '프로세스 ID, 프로세스 상태, 프로그램 카운터, CPU 레지스터, 메모리 관리 정보', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: PCB(Process Control Block)에 저장되는 정보 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '문맥 교환(Context Switch)의 개념과 발생 시점을 설명하시오.', answer: 'CPU가 다른 프로세스로 전환할 때 현재 상태를 저장하고 새 프로세스 상태를 복원하는 과정. 인터럽트, 시스템 콜, 타임 슬라이스 만료 시 발생', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 문맥 교환(Context Switch)의 개념과 발생 시점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '프로세스와 스레드의 차이점을 설명하시오.', answer: '프로세스는 독립적 메모리 공간, 스레드는 프로세스 내 코드/데이터/힙 공유하고 스택만 독립. 스레드가 생성/전환 비용 적음', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 프로세스와 스레드의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 비교 표\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'IPC(Inter-Process Communication) 방법 5가지를 쓰시오.', answer: '공유 메모리, 메시지 큐, 파이프, 소켓, 세마포어', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: IPC(Inter-Process Communication) 방법 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'fork() 시스템 콜의 동작과 반환값을 설명하시오.', answer: '현재 프로세스를 복제하여 자식 프로세스 생성. 부모에게는 자식 PID 반환, 자식에게는 0 반환, 실패 시 -1 반환', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: fork() 시스템 콜의 동작과 반환값을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 코드 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '좀비 프로세스(Zombie Process)와 고아 프로세스(Orphan Process)를 설명하시오.', answer: '좀비: 종료되었으나 부모가 wait() 미호출로 PCB 잔존. 고아: 부모가 먼저 종료되어 init이 입양', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 좀비 프로세스(Zombie Process)와 고아 프로세스(Orphan Process)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 해결 방법\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '사용자 모드와 커널 모드의 차이를 설명하시오.', answer: '사용자 모드: 제한된 명령어 실행, 하드웨어 직접 접근 불가. 커널 모드: 모든 명령어 실행 가능, 하드웨어 접근 가능. 시스템 콜로 전환', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 사용자 모드와 커널 모드의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 모드 전환 과정\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '시스템 콜(System Call)의 개념과 종류를 설명하시오.', answer: '응용 프로그램이 커널 서비스를 요청하는 인터페이스. 프로세스 제어, 파일 조작, 장치 관리, 정보 유지, 통신 등', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 시스템 콜(System Call)의 개념과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시스템 콜 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '인터럽트(Interrupt)의 종류와 처리 과정을 설명하시오.', answer: '하드웨어 인터럽트(외부), 소프트웨어 인터럽트(내부/트랩). 처리: 현재 상태 저장→인터럽트 벡터 참조→ISR 실행→상태 복원', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 인터럽트(Interrupt)의 종류와 처리 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 처리 흐름도\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'scheduling',
    name: 'CPU 스케줄링',
    color: 'from-blue-600 to-blue-500',
    questions: [
      { id: 1, question: 'CPU 스케줄링의 목적과 평가 기준 5가지를 쓰시오.', answer: 'CPU 이용률 최대화, 처리량 최대화, 총 처리 시간 최소화, 대기 시간 최소화, 응답 시간 최소화', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: CPU 스케줄링의 목적과 평가 기준 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'FCFS(First Come First Served) 스케줄링의 특징과 단점을 설명하시오.', answer: '도착 순서대로 처리, 비선점형. 단점: 호위 효과(Convoy Effect) - 긴 작업이 짧은 작업을 대기시킴', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: FCFS(First Come First Served) 스케줄링의 특징과 단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 간트 차트 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'SJF(Shortest Job First)와 SRTF의 차이를 설명하시오.', answer: 'SJF: 비선점형, 실행시간 짧은 작업 우선. SRTF: 선점형 SJF, 남은 시간이 더 짧은 작업 도착 시 선점', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: SJF(Shortest Job First)와 SRTF의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 간트 차트 비교\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'Round Robin 스케줄링의 특징과 타임 퀀텀 설정의 중요성을 설명하시오.', answer: '시분할 시스템용, 타임 퀀텀마다 프로세스 교체. 퀀텀 작으면 문맥교환 오버헤드 증가, 크면 FCFS와 유사', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: Round Robin 스케줄링의 특징과 타임 퀀텀 설정의 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 타임 퀀텀별 비교\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '우선순위 스케줄링의 기아(Starvation) 문제와 해결책을 설명하시오.', answer: '낮은 우선순위 프로세스가 무한 대기. 해결: 에이징(Aging) - 대기 시간에 따라 우선순위 증가', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 우선순위 스케줄링의 기아(Starvation) 문제와 해결책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 에이징 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '다단계 큐(Multilevel Queue) 스케줄링을 설명하시오.', answer: '프로세스를 여러 큐로 분류(전경/배경, 시스템/대화형/배치), 각 큐마다 다른 스케줄링 알고리즘 적용', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 다단계 큐(Multilevel Queue) 스케줄링을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 큐 구조 다이어그램\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '다단계 피드백 큐(Multilevel Feedback Queue) 스케줄링의 특징을 설명하시오.', answer: '프로세스가 큐 간 이동 가능. CPU 버스트 시간에 따라 하위 큐로 이동, I/O 바운드는 상위 큐 유지', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 다단계 피드백 큐(Multilevel Feedback Queue) 스케줄링의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 동작 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '선점형과 비선점형 스케줄링의 차이를 설명하시오.', answer: '선점형: 실행 중 CPU 회수 가능(RR, SRTF). 비선점형: 완료까지 실행(FCFS, SJF). 선점형이 응답성 좋으나 오버헤드 있음', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 선점형과 비선점형 스케줄링의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 비교 표\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'CPU 버스트와 I/O 버스트를 설명하고, CPU 바운드와 I/O 바운드 프로세스를 비교하시오.', answer: 'CPU 버스트: CPU 사용 구간, I/O 버스트: I/O 대기 구간. CPU 바운드: 긴 CPU 버스트, I/O 바운드: 잦은 짧은 CPU 버스트', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: CPU 버스트와 I/O 버스트를 설명하고, CPU 바운드와 I/O 바운드 프로세스를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 비교 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '실시간 스케줄링(Rate Monotonic, EDF)을 설명하시오.', answer: 'RM: 주기 짧을수록 높은 우선순위(정적). EDF: 마감시한 가까울수록 높은 우선순위(동적). EDF가 이론적 이용률 높음', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 실시간 스케줄링(Rate Monotonic, EDF)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 비교 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'memory',
    name: '메모리 관리',
    color: 'from-indigo-600 to-indigo-500',
    questions: [
      { id: 1, question: '연속 메모리 할당 방식(First Fit, Best Fit, Worst Fit)을 비교하시오.', answer: 'First Fit: 첫 번째 적합 공간. Best Fit: 가장 작은 적합 공간(외부 단편화). Worst Fit: 가장 큰 공간(큰 조각 남김)', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 연속 메모리 할당 방식(First Fit, Best Fit, Worst Fit)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 비교 표\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '내부 단편화와 외부 단편화를 설명하시오.', answer: '내부 단편화: 할당된 메모리 내 미사용 공간(고정 분할). 외부 단편화: 할당되지 않은 작은 조각들(가변 분할)', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 내부 단편화와 외부 단편화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 해결 방법\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '페이징(Paging) 기법의 개념과 주소 변환 과정을 설명하시오.', answer: '물리 메모리를 고정 크기 프레임으로, 논리 메모리를 페이지로 분할. 페이지 번호→페이지 테이블→프레임 번호+오프셋으로 변환', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 페이징(Paging) 기법의 개념과 주소 변환 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 주소 변환 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '세그먼테이션(Segmentation)의 개념과 페이징과의 차이를 설명하시오.', answer: '논리적 단위(코드, 데이터, 스택)로 분할, 가변 크기. 페이징: 고정 크기, 내부 단편화. 세그먼테이션: 가변 크기, 외부 단편화', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 세그먼테이션(Segmentation)의 개념과 페이징과의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 비교 표\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'TLB(Translation Lookaside Buffer)의 역할을 설명하시오.', answer: '페이지 테이블 캐시. 자주 사용하는 페이지-프레임 매핑 저장하여 주소 변환 속도 향상. TLB 히트 시 메모리 접근 1회로 감소', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: TLB(Translation Lookaside Buffer)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. TLB 히트/미스 과정\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '다단계 페이지 테이블의 필요성과 구조를 설명하시오.', answer: '32비트 주소, 4KB 페이지 시 4MB 페이지 테이블 필요. 2단계로 나누면 사용하는 부분만 메모리에 적재하여 공간 절약', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 다단계 페이지 테이블의 필요성과 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 구조 다이어그램\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '역 페이지 테이블(Inverted Page Table)의 개념과 장단점을 설명하시오.', answer: '물리 프레임 수만큼 엔트리 유지. 장점: 메모리 절약. 단점: 검색 시간 증가(해시 테이블로 해결)', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 역 페이지 테이블(Inverted Page Table)의 개념과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 구조 비교\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '공유 페이지(Shared Page)의 개념과 활용을 설명하시오.', answer: '여러 프로세스가 동일 페이지 공유. 읽기 전용 코드(라이브러리) 공유로 메모리 절약. Copy-on-Write와 연관', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 공유 페이지(Shared Page)의 개념과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '메모리 보호 기법(베이스/리미트 레지스터)을 설명하시오.', answer: '베이스: 프로세스 시작 주소, 리미트: 크기. 논리 주소가 0~리미트 범위인지 확인 후 베이스 더해 물리 주소 생성', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 메모리 보호 기법(베이스/리미트 레지스터)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 주소 변환 과정\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '스와핑(Swapping)의 개념과 문제점을 설명하시오.', answer: '프로세스 전체를 디스크와 메모리 간 이동. 문제점: 전송 시간 오버헤드, 프로세스 크기에 비례. 현대는 페이지 단위 스왑', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 스와핑(Swapping)의 개념과 문제점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 현대적 대안\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'virtual',
    name: '가상 메모리',
    color: 'from-purple-600 to-purple-500',
    questions: [
      { id: 1, question: '가상 메모리(Virtual Memory)의 개념과 장점을 설명하시오.', answer: '물리 메모리보다 큰 프로그램 실행 가능. 요구 페이징으로 필요한 페이지만 적재. 다중 프로그래밍 정도 향상', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 가상 메모리(Virtual Memory)의 개념과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 구현 방식\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '요구 페이징(Demand Paging)의 동작 원리를 설명하시오.', answer: '필요한 페이지만 메모리에 적재. 유효 비트로 적재 여부 표시. 페이지 폴트 시 디스크에서 로드', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 요구 페이징(Demand Paging)의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 동작 흐름도\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '페이지 폴트(Page Fault) 처리 과정을 설명하시오.', answer: '1)트랩 발생 2)유효 참조 확인 3)빈 프레임 찾기 4)디스크에서 페이지 로드 5)페이지 테이블 갱신 6)명령어 재실행', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 페이지 폴트(Page Fault) 처리 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 처리 흐름도\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '페이지 교체 알고리즘 FIFO, LRU, OPT를 비교하시오.', answer: 'FIFO: 먼저 들어온 페이지 교체. LRU: 가장 오래 미사용 페이지 교체. OPT: 가장 오래 미사용될 페이지 교체(이상적)', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 페이지 교체 알고리즘 FIFO, LRU, OPT를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 예시와 비교\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'Belady의 이상 현상(Anomaly)을 설명하시오.', answer: 'FIFO에서 프레임 수 증가 시 페이지 폴트 증가하는 현상. 스택 알고리즘(LRU, OPT)에서는 발생 안 함', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: Belady의 이상 현상(Anomaly)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'LRU 근사 알고리즘(Second Chance, Clock)을 설명하시오.', answer: 'Second Chance: 참조 비트 1이면 0으로 바꾸고 다음으로. Clock: 원형 큐로 Second Chance 구현. LRU보다 오버헤드 적음', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: LRU 근사 알고리즘(Second Chance, Clock)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 동작 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '스래싱(Thrashing)의 원인과 해결책을 설명하시오.', answer: '페이지 폴트 과다로 CPU 이용률 급감. 원인: 과도한 다중 프로그래밍. 해결: 워킹셋, 페이지 폴트 빈도 조절', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 스래싱(Thrashing)의 원인과 해결책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 해결 방법\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '워킹셋(Working Set) 모델을 설명하시오.', answer: '특정 시간 윈도우 내 참조된 페이지 집합. 워킹셋 크기만큼 프레임 할당하여 스래싱 방지', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 워킹셋(Working Set) 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 계산 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '지역성(Locality)의 원리와 종류를 설명하시오.', answer: '시간적 지역성: 최근 참조 데이터 재참조. 공간적 지역성: 인접 데이터 참조. 캐시, 가상 메모리 효율의 근거', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 지역성(Locality)의 원리와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'Copy-on-Write의 개념과 장점을 설명하시오.', answer: 'fork 시 페이지 복사 지연, 쓰기 발생 시에만 복사. 장점: 불필요한 복사 방지, 프로세스 생성 속도 향상', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: Copy-on-Write의 개념과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 동작 과정\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'sync',
    name: '동기화/교착상태',
    color: 'from-rose-600 to-rose-500',
    questions: [
      { id: 1, question: '임계 구역(Critical Section) 문제의 3가지 요구조건을 설명하시오.', answer: '상호 배제: 한 번에 하나만 진입. 진행: 진입 결정 지연 금지. 한정 대기: 무한 대기 방지', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 임계 구역(Critical Section) 문제의 3가지 요구조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '세마포어(Semaphore)의 종류와 연산을 설명하시오.', answer: '이진 세마포어(뮤텍스): 0 또는 1. 카운팅 세마포어: 여러 자원. P(wait): 감소, V(signal): 증가', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 세마포어(Semaphore)의 종류와 연산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 코드 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '뮤텍스(Mutex)와 세마포어의 차이를 설명하시오.', answer: '뮤텍스: 소유권 있음, 락 건 스레드만 해제. 세마포어: 소유권 없음, 다른 스레드도 signal 가능', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 뮤텍스(Mutex)와 세마포어의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 비교 표\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '모니터(Monitor)의 개념과 조건 변수를 설명하시오.', answer: '상호 배제 보장하는 고수준 동기화. 조건 변수: wait()로 대기, signal()로 깨움. 세마포어보다 사용 용이', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 모니터(Monitor)의 개념과 조건 변수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 구조 다이어그램\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '교착상태(Deadlock)의 4가지 필요조건을 설명하시오.', answer: '상호 배제, 점유 대기, 비선점, 순환 대기. 네 조건 모두 만족 시 교착상태 발생 가능', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 교착상태(Deadlock)의 4가지 필요조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '교착상태 예방(Prevention) 기법을 설명하시오.', answer: '4가지 조건 중 하나 이상 불성립하게. 자원 순서 지정(순환대기 방지), 한꺼번에 요청(점유대기 방지) 등', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 교착상태 예방(Prevention) 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 각 조건별 예방\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '교착상태 회피(Avoidance) - 은행원 알고리즘을 설명하시오.', answer: '안전 상태 유지하도록 자원 할당. 최대 요구량 사전 파악, 할당 전 안전성 검사. 오버헤드 크고 최대 요구량 파악 어려움', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 교착상태 회피(Avoidance) - 은행원 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 계산 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '교착상태 탐지(Detection)와 회복(Recovery)을 설명하시오.', answer: '탐지: 자원 할당 그래프, 대기 그래프 분석. 회복: 프로세스 종료, 자원 선점', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 교착상태 탐지(Detection)와 회복(Recovery)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 알고리즘\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '생산자-소비자 문제(Producer-Consumer Problem)를 설명하시오.', answer: '공유 버퍼에 생산자 삽입, 소비자 제거. 세마포어로 해결: empty, full, mutex', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 생산자-소비자 문제(Producer-Consumer Problem)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 해결 코드\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '독자-저자 문제(Readers-Writers Problem)를 설명하시오.', answer: '다수 독자 동시 읽기 가능, 저자는 배타적 접근. 독자 우선, 저자 우선 정책에 따라 기아 가능', prompt: `전자계산기조직응용기사 운영체제 문제입니다.\n\n문제: 독자-저자 문제(Readers-Writers Problem)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 해결 방법\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function OperatingSystemPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('computer-org-os-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => {
      allExpanded[t.id] = true;
    });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('computer-org-os-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-cyan-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it" className="text-gray-600 hover:text-cyan-600">IT·정보통신</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it/computer-organization" className="text-gray-600 hover:text-cyan-600">전자계산기조직응용기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">운영체제</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">⚙️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">운영체제 학습</h1>
                <p className="text-cyan-100">전자계산기조직응용기사 필기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-cyan-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter((q) => completedQuestions[`${topic.id}-${q.id}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={() => toggleTopic(topic.id)} className={`w-full p-4 bg-gradient-to-r ${topic.color} text-white flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>

                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleComplete(topic.id, q.id)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}>
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                              <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                              <div className="flex gap-2 flex-wrap">
                                <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</a>
                                <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</a>
                                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
