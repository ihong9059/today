'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'cryptography',
    name: '암호학 기초',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: '대칭키 암호화와 비대칭키 암호화의 차이를 설명하시오.', answer: '대칭키: 동일 키로 암복호화, 비대칭키: 공개키/개인키 쌍 사용', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 대칭키 암호화와 비대칭키 암호화의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '블록 암호와 스트림 암호의 차이를 설명하시오.', answer: '블록: 고정 크기 블록 단위 암호화, 스트림: 비트/바이트 단위 연속 암호화', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 블록 암호와 스트림 암호의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'DES 알고리즘의 특징을 설명하시오.', answer: '64비트 블록, 56비트 키, 16라운드 Feistel 구조', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: DES 알고리즘의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'AES 알고리즘의 특징을 설명하시오.', answer: '128비트 블록, 128/192/256비트 키, SPN 구조', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: AES 알고리즘의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'RSA 알고리즘의 원리를 설명하시오.', answer: '큰 소수의 곱 인수분해 어려움 기반, 공개키/개인키 생성', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: RSA 알고리즘의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '블록 암호 운용 모드(ECB, CBC, CTR)를 설명하시오.', answer: 'ECB: 독립 암호화, CBC: 이전 블록 XOR, CTR: 카운터 모드', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 블록 암호 운용 모드(ECB, CBC, CTR)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '타원곡선 암호(ECC)의 장점을 설명하시오.', answer: '짧은 키 길이로 높은 보안성, 모바일/IoT 적합', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 타원곡선 암호(ECC)의 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'Diffie-Hellman 키 교환의 원리를 설명하시오.', answer: '이산 대수 문제 기반, 공개 채널에서 비밀 키 공유', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: Diffie-Hellman 키 교환의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'SEED와 ARIA 알고리즘을 설명하시오.', answer: '국내 개발 블록 암호, SEED: 128비트, ARIA: 128/192/256비트', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: SEED와 ARIA 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '양자 컴퓨터가 현재 암호체계에 미치는 영향을 설명하시오.', answer: 'RSA/ECC 무력화 가능, 양자내성암호(PQC) 필요', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 양자 컴퓨터가 현재 암호체계에 미치는 영향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'hash',
    name: '해시 함수',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: '해시 함수의 특성 5가지를 설명하시오.', answer: '일방향성, 충돌저항성, 역상저항성, 제2역상저항성, 결정적', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 해시 함수의 특성 5가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'MD5의 취약점을 설명하시오.', answer: '충돌 공격 가능, 128비트 출력으로 보안 부족', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: MD5의 취약점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'SHA 해시 함수 종류와 출력 길이를 쓰시오.', answer: 'SHA-1(160), SHA-256(256), SHA-384(384), SHA-512(512)', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: SHA 해시 함수 종류와 출력 길이를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'HMAC(Hash-based MAC)의 구조를 설명하시오.', answer: '키와 메시지를 해시 함수에 적용하여 인증 코드 생성', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: HMAC(Hash-based MAC)의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '레인보우 테이블 공격과 방어 방법을 설명하시오.', answer: '미리 계산된 해시값 테이블로 역산 / 솔트(Salt) 사용', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 레인보우 테이블 공격과 방어 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'Bcrypt의 특징을 설명하시오.', answer: 'Salt 내장, Cost Factor로 연산량 조절, 패스워드 해시 전용', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: Bcrypt의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'SHA-3(Keccak)의 특징을 설명하시오.', answer: 'Sponge 구조, SHA-2와 다른 설계, NIST 표준', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: SHA-3(Keccak)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '생일 공격(Birthday Attack)의 원리를 설명하시오.', answer: '충돌 확률이 예상보다 높음, n비트 해시는 2^(n/2) 연산으로 충돌', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 생일 공격(Birthday Attack)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '머클 트리(Merkle Tree)의 구조와 용도를 설명하시오.', answer: '해시 트리 구조, 블록체인에서 트랜잭션 무결성 검증', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 머클 트리(Merkle Tree)의 구조와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'PBKDF2의 목적과 동작 원리를 설명하시오.', answer: '패스워드 기반 키 유도 함수, 반복 해싱으로 연산 비용 증가', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: PBKDF2의 목적과 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'digital-signature',
    name: '전자서명 및 인증서',
    color: 'from-yellow-500 to-yellow-400',
    questions: [
      { id: 1, question: '전자서명의 3가지 요건을 설명하시오.', answer: '인증(서명자 확인), 무결성(변조 방지), 부인방지', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 전자서명의 3가지 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '전자서명 생성 및 검증 과정을 설명하시오.', answer: '생성: 해시→개인키 서명, 검증: 공개키로 복호화→해시 비교', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 전자서명 생성 및 검증 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'X.509 인증서의 구성 항목을 설명하시오.', answer: '버전, 일련번호, 발급자, 유효기간, 주체, 공개키, 서명', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: X.509 인증서의 구성 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'PKI(공개키 기반구조)의 구성요소를 설명하시오.', answer: 'CA(인증기관), RA(등록기관), Repository, 사용자', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: PKI(공개키 기반구조)의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'CRL과 OCSP의 차이를 설명하시오.', answer: 'CRL: 폐기 목록 주기적 발행, OCSP: 실시간 인증서 상태 조회', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: CRL과 OCSP의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '인증서 체인(Certificate Chain)을 설명하시오.', answer: '루트CA → 중간CA → 서버 인증서로 이어지는 신뢰 체인', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 인증서 체인(Certificate Chain)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '공인인증서와 공동인증서의 차이를 설명하시오.', answer: '공인: 법적 효력(2020년 폐지), 공동: 민간 인증서 통합', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 공인인증서와 공동인증서의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'DSA(Digital Signature Algorithm)를 설명하시오.', answer: 'NIST 표준, 이산 대수 문제 기반 전자서명 알고리즘', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: DSA(Digital Signature Algorithm)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'ECDSA의 특징을 설명하시오.', answer: '타원곡선 기반 DSA, 짧은 키 길이로 동등 보안 수준', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: ECDSA의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '타임스탬프(Time Stamp)의 역할을 설명하시오.', answer: '특정 시점에 문서가 존재했음을 증명, 부인방지 강화', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 타임스탬프(Time Stamp)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'key-management',
    name: '키 관리',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: '키 생성 시 고려사항을 설명하시오.', answer: '충분한 키 길이, 안전한 난수 생성기, 엔트로피 확보', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 키 생성 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'KEK(Key Encryption Key)의 역할을 설명하시오.', answer: '다른 키를 암호화하는 키, 키 계층 구조에서 사용', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: KEK(Key Encryption Key)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '키 분배 문제와 해결 방법을 설명하시오.', answer: '안전한 채널 없이 키 공유 어려움 / DH, PKI, 키 서버 활용', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 키 분배 문제와 해결 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'HSM(Hardware Security Module)의 역할을 설명하시오.', answer: '물리적 보안 장치로 키 저장 및 암호 연산 수행', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: HSM(Hardware Security Module)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '키 에스크로(Key Escrow)의 개념을 설명하시오.', answer: '제3자가 키 복구를 위해 키 사본 보관', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 키 에스크로(Key Escrow)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '키 수명 주기(Life Cycle)를 설명하시오.', answer: '생성 → 분배 → 사용 → 저장 → 갱신 → 폐기', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 키 수명 주기(Life Cycle)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'Secret Sharing(비밀 분산)의 개념을 설명하시오.', answer: '비밀을 여러 조각으로 분산, 일정 수 이상 모여야 복원', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: Secret Sharing(비밀 분산)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'KMS(Key Management System)의 기능을 설명하시오.', answer: '키 생성, 저장, 분배, 회전, 폐기 등 중앙 관리', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: KMS(Key Management System)의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '세션 키와 마스터 키의 차이를 설명하시오.', answer: '세션 키: 일회성/임시, 마스터 키: 장기간/키 유도용', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 세션 키와 마스터 키의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '안전한 키 폐기 방법을 설명하시오.', answer: '암호학적 지우기, 물리적 파괴, 다중 덮어쓰기', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 안전한 키 폐기 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'access-model',
    name: '보안 모델 및 아키텍처',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: 'CIA 트라이어드를 설명하시오.', answer: 'Confidentiality(기밀성), Integrity(무결성), Availability(가용성)', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: CIA 트라이어드를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'AAA(Authentication, Authorization, Accounting)를 설명하시오.', answer: '인증: 신원확인, 인가: 권한부여, 계정관리: 활동기록', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: AAA(Authentication, Authorization, Accounting)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '다중 인증(MFA)의 요소를 설명하시오.', answer: '지식(비밀번호), 소유(토큰), 존재(생체), 위치, 행동', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: 다중 인증(MFA)의 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'Zero Trust 보안 모델을 설명하시오.', answer: '절대 신뢰하지 않고 항상 검증, 최소 권한 원칙', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: Zero Trust 보안 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'Defense in Depth(심층 방어)를 설명하시오.', answer: '여러 계층의 보안 통제로 단일 실패점 방지', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: Defense in Depth(심층 방어)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'TCB(Trusted Computing Base)를 설명하시오.', answer: '시스템의 보안 정책을 시행하는 모든 H/W, S/W 집합', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: TCB(Trusted Computing Base)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'Reference Monitor의 역할을 설명하시오.', answer: '모든 접근 요청을 중재하는 추상적 보안 메커니즘', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: Reference Monitor의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'SSO(Single Sign-On)의 장단점을 설명하시오.', answer: '장점: 편의성, 단점: 단일 실패점, 탈취 시 피해 확대', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: SSO(Single Sign-On)의 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'Kerberos 인증 프로토콜의 동작을 설명하시오.', answer: 'TGT 발급 → 서비스 티켓 요청 → 서비스 접근', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: Kerberos 인증 프로토콜의 동작을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'SAML과 OAuth의 차이를 설명하시오.', answer: 'SAML: 인증+인가(SSO), OAuth: 인가 전용(위임)', prompt: `정보보안기사 정보보안 일반 문제입니다.\n\n문제: SAML과 OAuth의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function SecurityGeneralPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['cryptography']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => { const saved = localStorage.getItem('info-security-general-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  useEffect(() => { localStorage.setItem('info-security-general-progress', JSON.stringify(completedQuestions)); }, [completedQuestions]);

  const toggleTopic = (topicId: string) => setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]);
  const toggleQuestion = (topicId: string, questionId: number) => setCompletedQuestions(prev => { const tc = prev[topicId] || []; return { ...prev, [topicId]: tc.includes(questionId) ? tc.filter(id => id !== questionId) : [...tc, questionId] }; });
  const getTopicProgress = (topicId: string, total: number) => Math.round(((completedQuestions[topicId]?.length || 0) / total) * 100);
  const getTotalProgress = () => { const total = topics.reduce((a, t) => a + t.questions.length, 0); const comp = Object.values(completedQuestions).reduce((a, arr) => a + arr.length, 0); return Math.round((comp / total) * 100); };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-red-600">홈</a><span className="text-gray-300">›</span><a href="/category/it" className="text-gray-600 hover:text-red-600">IT·정보통신</a><span className="text-gray-300">›</span><a href="/category/it/information-security" className="text-gray-600 hover:text-red-600">정보보안기사</a><span className="text-gray-300">›</span><span className="text-red-600 font-medium">정보보안 일반</span></nav></div></header>

      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🔑</span></div><div><h1 className="text-2xl font-bold">정보보안 일반</h1><p className="text-red-100">정보보안기사 4과목 - 암호학, 해시, 전자서명, 인증</p></div></div></div></section>

      <div className="bg-white border-b"><div className="max-w-6xl mx-auto px-4 py-4"><div className="flex items-center justify-between mb-2"><span className="font-medium text-gray-700">전체 진행률</span><span className="text-red-600 font-bold">{getTotalProgress()}%</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all" style={{ width: `${getTotalProgress()}%` }} /></div></div></div>

      <main className="max-w-6xl mx-auto px-4 py-8"><div className="space-y-4">{topics.map((topic) => (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}><div className="flex items-center gap-3"><span className="font-bold text-lg">{topic.name}</span><span className="bg-white/20 px-2 py-1 rounded text-sm">{topic.questions.length}문항</span></div><div className="flex items-center gap-4"><div className="w-24 bg-white/30 rounded-full h-2"><div className="bg-white h-2 rounded-full" style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }} /></div><span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span><span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span></div></button>{expandedTopics.includes(topic.id) && (<div className="p-4 space-y-3">{topic.questions.map((q) => (<div key={q.id} className={`p-4 rounded-lg border ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions[topic.id]?.includes(q.id) && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800 mb-2"><span className="text-red-500 mr-2">Q{q.id}.</span>{q.question}</p><p className="text-sm text-gray-600 bg-white p-2 rounded border"><span className="font-medium text-green-600">A.</span> {q.answer}</p></div><button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition">🤖 AI</button></div></div>))}</div>)}</div>))}</div></main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
