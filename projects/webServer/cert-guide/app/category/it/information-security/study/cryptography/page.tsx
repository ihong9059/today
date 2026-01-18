'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'symmetric',
    name: '대칭키 암호',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: 'DES(Data Encryption Standard)의 구조와 특징을 설명하시오.', answer: '64비트 블록, 56비트 키, 16라운드 Feistel 구조', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: DES(Data Encryption Standard)의 구조와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'AES(Advanced Encryption Standard)의 구조를 설명하시오.', answer: '128비트 블록, 128/192/256비트 키, SPN 구조, 10/12/14 라운드', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: AES(Advanced Encryption Standard)의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'AES의 4가지 연산(SubBytes, ShiftRows, MixColumns, AddRoundKey)을 설명하시오.', answer: 'SubBytes: S-box 치환, ShiftRows: 행 시프트, MixColumns: 열 혼합, AddRoundKey: 라운드키 XOR', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: AES의 4가지 연산(SubBytes, ShiftRows, MixColumns, AddRoundKey)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'Triple DES(3DES)의 동작 방식을 설명하시오.', answer: 'EDE(암호화-복호화-암호화) 방식, 112비트 또는 168비트 키 사용', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: Triple DES(3DES)의 동작 방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'Feistel 구조와 SPN 구조의 차이를 설명하시오.', answer: 'Feistel: 좌우 분할 교환, SPN: 전체 블록에 치환/순열 적용', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: Feistel 구조와 SPN 구조의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '블록 암호의 운용 모드 5가지를 설명하시오.', answer: 'ECB, CBC, CFB, OFB, CTR', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 블록 암호의 운용 모드 5가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'CBC 모드의 동작 원리와 특징을 설명하시오.', answer: '이전 암호문 블록과 현재 평문 XOR 후 암호화, IV 필요', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: CBC 모드의 동작 원리와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'ECB 모드의 취약점을 설명하시오.', answer: '동일 평문 블록이 동일 암호문 생성, 패턴 노출', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: ECB 모드의 취약점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'SEED와 ARIA 알고리즘의 특징을 설명하시오.', answer: 'SEED: 128비트, Feistel / ARIA: 128/192/256비트, SPN (국내 개발)', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: SEED와 ARIA 알고리즘의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '스트림 암호와 블록 암호의 차이를 설명하시오.', answer: '스트림: 비트/바이트 단위 암호화, 블록: 고정 크기 블록 단위 암호화', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 스트림 암호와 블록 암호의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'asymmetric',
    name: '비대칭키 암호',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: 'RSA 알고리즘의 원리를 설명하시오.', answer: '큰 소수의 곱셈은 쉽지만 소인수분해는 어려운 수학적 원리 이용', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: RSA 알고리즘의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'RSA 키 생성 과정을 설명하시오.', answer: '두 소수 p,q 선택 → n=pq, φ(n) 계산 → e 선택 → d 계산', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: RSA 키 생성 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'Diffie-Hellman 키 교환 프로토콜을 설명하시오.', answer: '이산대수 문제 기반, 안전하지 않은 채널에서 공유 비밀키 생성', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: Diffie-Hellman 키 교환 프로토콜을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'ECC(Elliptic Curve Cryptography)의 장점을 설명하시오.', answer: '짧은 키 길이로 RSA와 동등한 보안성, 모바일/IoT에 적합', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: ECC(Elliptic Curve Cryptography)의 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'ElGamal 암호 알고리즘의 원리를 설명하시오.', answer: '이산대수 문제 기반, Diffie-Hellman을 암호화에 응용', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: ElGamal 암호 알고리즘의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '대칭키와 비대칭키 암호의 장단점을 비교하시오.', answer: '대칭키: 빠름, 키 분배 어려움 / 비대칭키: 느림, 키 분배 용이', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 대칭키와 비대칭키 암호의 장단점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '하이브리드 암호 시스템을 설명하시오.', answer: '대칭키로 데이터 암호화, 비대칭키로 대칭키 암호화', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 하이브리드 암호 시스템을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'DSA(Digital Signature Algorithm)의 동작 원리를 설명하시오.', answer: '이산대수 기반, 전자서명 전용 알고리즘', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: DSA(Digital Signature Algorithm)의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'ECDSA와 RSA 서명의 차이를 설명하시오.', answer: 'ECDSA: 타원곡선 기반, 짧은 서명 / RSA: 소인수분해 기반', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: ECDSA와 RSA 서명의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '공개키 기반구조(PKI)의 구성요소를 설명하시오.', answer: 'CA, RA, CRL, 인증서 저장소, 사용자', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 공개키 기반구조(PKI)의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'hash',
    name: '해시 함수',
    color: 'from-yellow-500 to-yellow-400',
    questions: [
      { id: 1, question: '해시 함수의 특징 5가지를 설명하시오.', answer: '일방향성, 충돌 저항성, 고정 출력 길이, 빠른 연산, 눈사태 효과', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 해시 함수의 특징 5가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'MD5의 특징과 취약점을 설명하시오.', answer: '128비트 출력, 충돌 공격에 취약하여 보안용 사용 금지', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: MD5의 특징과 취약점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'SHA 계열 해시 함수의 종류와 특징을 설명하시오.', answer: 'SHA-1(160비트, 취약), SHA-2(224/256/384/512비트), SHA-3(Keccak)', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: SHA 계열 해시 함수의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '충돌 저항성의 두 가지 유형을 설명하시오.', answer: '약한 충돌 저항성(제2 역상 저항성), 강한 충돌 저항성', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 충돌 저항성의 두 가지 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '생일 공격(Birthday Attack)의 원리를 설명하시오.', answer: '생일 역설 이용, 충돌 쌍 찾기 복잡도를 2^(n/2)로 감소', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 생일 공격(Birthday Attack)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'HMAC의 구조와 용도를 설명하시오.', answer: '해시와 비밀키 조합, 메시지 인증 코드 생성', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: HMAC의 구조와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'Salt의 역할과 필요성을 설명하시오.', answer: '랜덤 값을 패스워드에 추가, 레인보우 테이블 공격 방어', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: Salt의 역할과 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '패스워드 해싱 알고리즘(bcrypt, scrypt, Argon2)을 비교하시오.', answer: 'bcrypt: Blowfish 기반, scrypt: 메모리 하드, Argon2: 최신 표준', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 패스워드 해싱 알고리즘(bcrypt, scrypt, Argon2)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '레인보우 테이블 공격을 설명하시오.', answer: '미리 계산된 해시값 테이블로 패스워드 역추적', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 레인보우 테이블 공격을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'Merkle-Damgard 구조를 설명하시오.', answer: 'MD5, SHA-1/2의 기본 구조, 압축 함수 반복 적용', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: Merkle-Damgard 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'signature',
    name: '전자서명',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: '전자서명의 3가지 기능을 설명하시오.', answer: '인증(Authentication), 무결성(Integrity), 부인방지(Non-repudiation)', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 전자서명의 3가지 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '전자서명 생성 및 검증 과정을 설명하시오.', answer: '생성: 해시→개인키 암호화, 검증: 공개키 복호화→해시 비교', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 전자서명 생성 및 검증 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'X.509 인증서의 주요 필드를 설명하시오.', answer: '버전, 일련번호, 서명알고리즘, 발급자, 유효기간, 주체, 공개키', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: X.509 인증서의 주요 필드를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'CA(Certificate Authority)의 역할을 설명하시오.', answer: '인증서 발급, 관리, 폐기, 신뢰 체인의 기반', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: CA(Certificate Authority)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'CRL(Certificate Revocation List)과 OCSP의 차이를 설명하시오.', answer: 'CRL: 주기적 목록 배포, OCSP: 실시간 상태 조회', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: CRL(Certificate Revocation List)과 OCSP의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '블라인드 서명(Blind Signature)의 원리를 설명하시오.', answer: '서명자가 내용을 모르면서 서명, 전자투표/전자화폐에 활용', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 블라인드 서명(Blind Signature)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '그룹 서명과 링 서명의 차이를 설명하시오.', answer: '그룹: 관리자가 서명자 추적 가능, 링: 추적 불가능', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 그룹 서명과 링 서명의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '타임스탬프 서비스의 목적을 설명하시오.', answer: '문서의 존재 시점 증명, 부인 방지 강화', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 타임스탬프 서비스의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '전자서명법상 공인전자서명의 효력을 설명하시오.', answer: '서명자 본인 확인, 문서 무결성 확인, 법적 효력 인정', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 전자서명법상 공인전자서명의 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '인증서 체인(Certificate Chain)의 개념을 설명하시오.', answer: 'Root CA → 중간 CA → 최종 인증서로 이어지는 신뢰 체계', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: 인증서 체인(Certificate Chain)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'protocol',
    name: '암호 프로토콜',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: 'SSL/TLS 핸드셰이크 과정을 설명하시오.', answer: 'ClientHello → ServerHello → 인증서 교환 → 키 교환 → Finished', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: SSL/TLS 핸드셰이크 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'TLS 1.3의 주요 변경사항을 설명하시오.', answer: '1-RTT 핸드셰이크, 취약 암호 제거, 0-RTT 지원', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: TLS 1.3의 주요 변경사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'IPSec의 두 가지 모드를 설명하시오.', answer: '전송 모드: 페이로드만 암호화, 터널 모드: 전체 패킷 암호화', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: IPSec의 두 가지 모드를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'IPSec의 AH와 ESP 프로토콜을 비교하시오.', answer: 'AH: 인증/무결성만, ESP: 암호화+인증/무결성', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: IPSec의 AH와 ESP 프로토콜을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'IKE(Internet Key Exchange)의 역할을 설명하시오.', answer: 'IPSec SA 설정을 위한 키 교환 및 인증 프로토콜', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: IKE(Internet Key Exchange)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'Kerberos 인증 프로토콜의 동작 원리를 설명하시오.', answer: 'TGT 발급 → 서비스 티켓 발급 → 서비스 접근 (3단계)', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: Kerberos 인증 프로토콜의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'SSH의 인증 방식 3가지를 설명하시오.', answer: '패스워드, 공개키, 호스트 기반 인증', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: SSH의 인증 방식 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'S/MIME의 기능을 설명하시오.', answer: '이메일 암호화, 전자서명, 인증서 기반', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: S/MIME의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'PGP의 웹 오브 트러스트(Web of Trust)를 설명하시오.', answer: 'CA 없이 사용자 간 상호 인증으로 신뢰 구축', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: PGP의 웹 오브 트러스트(Web of Trust)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'HTTPS와 HTTP의 보안 차이를 설명하시오.', answer: 'HTTPS: TLS로 암호화/인증, HTTP: 평문 전송', prompt: `정보보안기사 암호학 문제입니다.\n\n문제: HTTPS와 HTTP의 보안 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function CryptographyPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['symmetric']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('info-security-cryptography-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('info-security-cryptography-progress', JSON.stringify(completedQuestions));
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
            <span className="text-red-600 font-medium">암호학</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🔐</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">암호학</h1>
              <p className="text-red-100">정보보안기사 2과목 - 대칭키, 비대칭키, 해시, 전자서명</p>
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
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
