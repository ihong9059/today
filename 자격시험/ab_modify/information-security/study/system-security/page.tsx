'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'os-security',
    name: '운영체제 보안',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: 'Windows 운영체제의 주요 보안 기능 5가지를 쓰시오.', answer: 'UAC, BitLocker, Windows Defender, Windows Firewall, NTFS 권한', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Windows 운영체제의 주요 보안 기능 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'Linux의 파일 권한 체계(rwx)를 설명하시오.', answer: 'r(읽기), w(쓰기), x(실행) / 소유자, 그룹, 기타 사용자별 권한 설정', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Linux의 파일 권한 체계(rwx)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'SetUID, SetGID, Sticky Bit의 개념을 설명하시오.', answer: 'SetUID: 소유자 권한 실행, SetGID: 그룹 권한 실행, Sticky Bit: 소유자만 삭제 가능', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: SetUID, SetGID, Sticky Bit의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '/etc/passwd와 /etc/shadow 파일의 역할을 설명하시오.', answer: 'passwd: 사용자 계정 정보, shadow: 암호화된 패스워드 저장', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: /etc/passwd와 /etc/shadow 파일의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'Windows 레지스트리의 5가지 루트 키를 쓰시오.', answer: 'HKEY_CLASSES_ROOT, HKEY_CURRENT_USER, HKEY_LOCAL_MACHINE, HKEY_USERS, HKEY_CURRENT_CONFIG', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Windows 레지스트리의 5가지 루트 키를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'Unix/Linux의 umask 값의 의미를 설명하시오.', answer: '파일/디렉토리 생성 시 기본 권한에서 제외할 권한 지정', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Unix/Linux의 umask 값의 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'Windows의 SAM(Security Account Manager) 파일을 설명하시오.', answer: '사용자 계정 및 암호화된 패스워드 저장 데이터베이스', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Windows의 SAM(Security Account Manager) 파일을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'SELinux의 동작 모드 3가지를 설명하시오.', answer: 'Enforcing(정책 강제), Permissive(경고만), Disabled(비활성화)', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: SELinux의 동작 모드 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'Windows 그룹 정책(GPO)의 역할을 설명하시오.', answer: '도메인 환경에서 사용자/컴퓨터에 대한 보안 설정 중앙 관리', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Windows 그룹 정책(GPO)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'Linux의 PAM(Pluggable Authentication Modules)을 설명하시오.', answer: '인증 모듈을 플러그인 방식으로 추가/변경할 수 있는 프레임워크', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Linux의 PAM(Pluggable Authentication Modules)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'access-control',
    name: '접근 제어',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: 'DAC(임의적 접근 제어)의 개념과 특징을 설명하시오.', answer: '자원 소유자가 접근 권한 결정, 유연하나 보안 취약', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: DAC(임의적 접근 제어)의 개념과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'MAC(강제적 접근 제어)의 개념과 특징을 설명하시오.', answer: '보안 레이블 기반, 시스템이 접근 권한 결정, 군사/정부 기관 사용', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: MAC(강제적 접근 제어)의 개념과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'RBAC(역할 기반 접근 제어)의 구성요소를 설명하시오.', answer: '사용자, 역할, 권한으로 구성, 역할에 권한 할당', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: RBAC(역할 기반 접근 제어)의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'Bell-LaPadula 모델의 원칙을 설명하시오.', answer: 'No Read Up, No Write Down - 기밀성 중심 모델', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Bell-LaPadula 모델의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'Biba 모델의 원칙을 설명하시오.', answer: 'No Read Down, No Write Up - 무결성 중심 모델', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Biba 모델의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'Clark-Wilson 모델의 특징을 설명하시오.', answer: '무결성 중심, 직무 분리, 트랜잭션 기반', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Clark-Wilson 모델의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '최소 권한 원칙(Principle of Least Privilege)을 설명하시오.', answer: '업무 수행에 필요한 최소한의 권한만 부여', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 최소 권한 원칙(Principle of Least Privilege)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '직무 분리(Separation of Duties)의 목적을 설명하시오.', answer: '한 사람이 모든 권한을 갖지 못하도록 분리, 내부 부정 방지', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 직무 분리(Separation of Duties)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'ACL(Access Control List)의 구성요소를 설명하시오.', answer: '주체, 객체, 권한으로 구성된 접근 제어 목록', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: ACL(Access Control List)의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'ABAC(속성 기반 접근 제어)의 개념을 설명하시오.', answer: '주체, 객체, 환경의 속성을 기반으로 접근 결정', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: ABAC(속성 기반 접근 제어)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'vulnerability',
    name: '취약점 분석',
    color: 'from-yellow-500 to-yellow-400',
    questions: [
      { id: 1, question: '버퍼 오버플로우(Buffer Overflow) 공격의 원리를 설명하시오.', answer: '버퍼 크기 초과 데이터 입력으로 리턴 주소 변조', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 버퍼 오버플로우(Buffer Overflow) 공격의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '스택 기반 버퍼 오버플로우 방어 기법 3가지를 쓰시오.', answer: 'Stack Canary, ASLR, DEP/NX bit', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 스택 기반 버퍼 오버플로우 방어 기법 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '포맷 스트링(Format String) 취약점을 설명하시오.', answer: 'printf 등에서 사용자 입력을 포맷 문자열로 사용 시 발생', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 포맷 스트링(Format String) 취약점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'Race Condition 취약점의 개념을 설명하시오.', answer: '동시 실행 시 공유 자원 접근 순서에 따른 보안 취약점', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Race Condition 취약점의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'Privilege Escalation(권한 상승) 공격을 설명하시오.', answer: '일반 사용자 권한에서 관리자 권한을 획득하는 공격', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Privilege Escalation(권한 상승) 공격을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'CVE와 CWE의 차이를 설명하시오.', answer: 'CVE: 개별 취약점 식별번호, CWE: 취약점 유형 분류 체계', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: CVE와 CWE의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'CVSS(Common Vulnerability Scoring System)를 설명하시오.', answer: '취약점 심각도를 0~10 점수로 표현하는 표준 평가 체계', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: CVSS(Common Vulnerability Scoring System)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'Heap Overflow와 Stack Overflow의 차이를 설명하시오.', answer: 'Heap: 동적 메모리 영역 오버플로우, Stack: 스택 영역 오버플로우', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Heap Overflow와 Stack Overflow의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'Use-After-Free 취약점을 설명하시오.', answer: '해제된 메모리를 계속 사용하여 발생하는 취약점', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Use-After-Free 취약점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '취약점 스캐닝 도구 3가지를 쓰시오.', answer: 'Nessus, OpenVAS, Qualys', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 취약점 스캐닝 도구 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'malware',
    name: '악성코드 분석',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: '악성코드의 종류 5가지를 쓰고 각각을 설명하시오.', answer: '바이러스, 웜, 트로이목마, 랜섬웨어, 스파이웨어', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 악성코드의 종류 5가지를 쓰고 각각을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '바이러스와 웜의 차이점을 설명하시오.', answer: '바이러스: 숙주 파일 필요, 웜: 독자 전파 가능', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 바이러스와 웜의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '랜섬웨어의 동작 원리를 설명하시오.', answer: '파일 암호화 후 복호화 대가로 금전 요구', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 랜섬웨어의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '루트킷(Rootkit)의 종류와 특징을 설명하시오.', answer: '커널 레벨, 사용자 레벨 루트킷 / 시스템 깊숙이 은닉', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 루트킷(Rootkit)의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '정적 분석과 동적 분석의 차이를 설명하시오.', answer: '정적: 실행 없이 코드 분석, 동적: 실행하며 행위 분석', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 정적 분석과 동적 분석의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '악성코드 분석에 사용되는 도구 5가지를 쓰시오.', answer: 'IDA Pro, OllyDbg, Wireshark, Process Monitor, VirusTotal', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 악성코드 분석에 사용되는 도구 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '샌드박스(Sandbox) 분석 환경의 목적을 설명하시오.', answer: '격리된 환경에서 악성코드 실행 및 행위 분석', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 샌드박스(Sandbox) 분석 환경의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'APT(Advanced Persistent Threat) 공격의 특징을 설명하시오.', answer: '지능적, 지속적, 표적화된 공격 / 장기간 은밀히 활동', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: APT(Advanced Persistent Threat) 공격의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '봇넷(Botnet)의 구성요소와 동작 방식을 설명하시오.', answer: 'Bot, C&C 서버, 봇마스터로 구성 / 원격 명령 수행', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 봇넷(Botnet)의 구성요소와 동작 방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '파일리스(Fileless) 악성코드의 특징을 설명하시오.', answer: '파일 없이 메모리에서만 동작, 탐지 어려움', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 파일리스(Fileless) 악성코드의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'log-audit',
    name: '로그 분석 및 감사',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: 'Windows 이벤트 로그의 종류 5가지를 쓰시오.', answer: 'Application, Security, System, Setup, Forwarded Events', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Windows 이벤트 로그의 종류 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'Linux의 주요 로그 파일 5가지를 쓰시오.', answer: '/var/log/messages, syslog, auth.log, secure, dmesg', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Linux의 주요 로그 파일 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'Syslog의 구성요소와 Facility Level을 설명하시오.', answer: '메시지 생성기, 수집기, 저장소 / kern, user, mail, auth 등', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Syslog의 구성요소와 Facility Level을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'Syslog Severity Level 8가지를 나열하시오.', answer: 'Emergency, Alert, Critical, Error, Warning, Notice, Info, Debug', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Syslog Severity Level 8가지를 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'Windows Security 로그의 주요 이벤트 ID를 설명하시오.', answer: '4624(로그온 성공), 4625(로그온 실패), 4648(명시적 자격 증명)', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Windows Security 로그의 주요 이벤트 ID를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'SIEM(Security Information and Event Management)의 기능을 설명하시오.', answer: '로그 수집, 상관관계 분석, 실시간 모니터링, 알림 발생', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: SIEM(Security Information and Event Management)의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '로그 무결성 보장 방법 3가지를 쓰시오.', answer: '해시값 저장, 로그 서버 분리, WORM 스토리지 사용', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 로그 무결성 보장 방법 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '감사 추적(Audit Trail)의 목적을 설명하시오.', answer: '시스템 활동 기록으로 보안 사고 추적 및 책임 소재 파악', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 감사 추적(Audit Trail)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'Linux에서 lastlog, wtmp, btmp 파일의 용도를 설명하시오.', answer: 'lastlog: 마지막 로그인, wtmp: 로그인 기록, btmp: 실패 기록', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: Linux에서 lastlog, wtmp, btmp 파일의 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '로그 로테이션(Log Rotation)의 개념과 설정 방법을 설명하시오.', answer: '로그 파일을 주기적으로 순환/삭제, logrotate 설정', prompt: `정보보안기사 시스템 보안 문제입니다.\n\n문제: 로그 로테이션(Log Rotation)의 개념과 설정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function SystemSecurityPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['os-security']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('info-security-system-security-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('info-security-system-security-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleQuestion = (topicId: string, questionId: number) => {
    setCompletedQuestions(prev => {
      const topicCompleted = prev[topicId] || [];
      const newCompleted = topicCompleted.includes(questionId)
        ? topicCompleted.filter(id => id !== questionId)
        : [...topicCompleted, questionId];
      return { ...prev, [topicId]: newCompleted };
    });
  };

  const getTopicProgress = (topicId: string, total: number) => {
    const completed = completedQuestions[topicId]?.length || 0;
    return Math.round((completed / total) * 100);
  };

  const getTotalProgress = () => {
    const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
    const totalCompleted = Object.values(completedQuestions).reduce((acc, arr) => acc + arr.length, 0);
    return Math.round((totalCompleted / totalQuestions) * 100);
  };

  const openAIModal = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

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
            <a href="/" className="text-gray-600 hover:text-red-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-red-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/information-security" className="text-gray-600 hover:text-red-600">정보보안기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">시스템 보안</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🖥️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">시스템 보안</h1>
              <p className="text-red-100">정보보안기사 1과목 - 운영체제, 접근제어, 취약점 분석</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-red-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all"
              style={{ width: `${getTotalProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topics */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{topic.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">
                    {topic.questions.length}문항
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-white/30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }}
                    />
                  </div>
                  <span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span>
                  <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border ${
                        completedQuestions[topic.id]?.includes(q.id)
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(topic.id, q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                            completedQuestions[topic.id]?.includes(q.id)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[topic.id]?.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-red-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition"
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
      </main>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"
                >
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"
                >
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"
                >
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentPrompt);
                  alert('프롬프트가 복사되었습니다!');
                }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition"
              >
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
