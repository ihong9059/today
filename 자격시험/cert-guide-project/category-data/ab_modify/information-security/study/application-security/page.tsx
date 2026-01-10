'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'web-security',
    name: '웹 보안 (OWASP Top 10)',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: 'OWASP Top 10 2021의 항목을 나열하시오.', answer: 'Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration 등', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: OWASP Top 10 2021의 항목을 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'SQL Injection 공격의 원리와 대응방안을 설명하시오.', answer: '입력값에 SQL 구문 삽입 / Prepared Statement, 입력값 검증', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: SQL Injection 공격의 원리와 대응방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'Blind SQL Injection의 종류를 설명하시오.', answer: 'Boolean-based, Time-based, Error-based', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: Blind SQL Injection의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'XSS(Cross-Site Scripting) 공격의 종류를 설명하시오.', answer: 'Stored XSS, Reflected XSS, DOM-based XSS', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: XSS(Cross-Site Scripting) 공격의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'XSS 공격의 대응방안을 설명하시오.', answer: '출력값 인코딩, CSP 적용, HttpOnly 쿠키', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: XSS 공격의 대응방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'CSRF(Cross-Site Request Forgery) 공격의 원리를 설명하시오.', answer: '사용자 세션을 이용한 의도치 않은 요청 전송', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: CSRF(Cross-Site Request Forgery) 공격의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'CSRF 방어 기법을 설명하시오.', answer: 'CSRF Token, SameSite 쿠키, Referer 검증', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: CSRF 방어 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'SSRF(Server-Side Request Forgery)의 위험성을 설명하시오.', answer: '서버를 통한 내부망 접근, 메타데이터 탈취', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: SSRF(Server-Side Request Forgery)의 위험성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'HTTP Response Splitting 공격을 설명하시오.', answer: 'HTTP 응답 헤더에 개행문자 삽입으로 응답 조작', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: HTTP Response Splitting 공격을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'Clickjacking 공격과 방어 방법을 설명하시오.', answer: '투명 iframe으로 클릭 가로채기 / X-Frame-Options 헤더', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: Clickjacking 공격과 방어 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'secure-coding',
    name: '시큐어 코딩',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: '시큐어 코딩의 7대 보안 약점 유형을 쓰시오.', answer: '입력데이터 검증, 보안기능, 시간 및 상태, 에러처리, 코드품질, 캡슐화, API 오용', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 시큐어 코딩의 7대 보안 약점 유형을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '입력값 검증의 Whitelist와 Blacklist 방식을 비교하시오.', answer: 'Whitelist: 허용값만 통과(권장), Blacklist: 금지값만 차단', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 입력값 검증의 Whitelist와 Blacklist 방식을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '경로 조작(Path Traversal) 취약점을 설명하시오.', answer: '../ 등으로 허용된 경로 외 파일 접근', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 경로 조작(Path Traversal) 취약점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'Command Injection 취약점과 대응방안을 설명하시오.', answer: '시스템 명령어 삽입 / 명령어 사용 금지, 입력값 검증', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: Command Injection 취약점과 대응방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '안전한 패스워드 저장 방법을 설명하시오.', answer: 'Bcrypt, PBKDF2, Argon2 등 솔트+해시', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 안전한 패스워드 저장 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '세션 관리의 보안 고려사항을 설명하시오.', answer: '세션 타임아웃, 재인증, 세션 ID 재생성, HttpOnly', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 세션 관리의 보안 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '에러 메시지 처리의 보안 원칙을 설명하시오.', answer: '상세 에러 숨김, 로깅만 상세, 일반 메시지 표시', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 에러 메시지 처리의 보안 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '하드코딩된 민감정보의 위험성을 설명하시오.', answer: '소스코드 유출 시 비밀정보 노출, 환경변수 사용 권장', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 하드코딩된 민감정보의 위험성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'Insecure Deserialization 취약점을 설명하시오.', answer: '악의적 객체 역직렬화로 원격 코드 실행 가능', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: Insecure Deserialization 취약점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'XML External Entity(XXE) 취약점을 설명하시오.', answer: 'XML 파서가 외부 엔티티를 처리하여 파일 노출', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: XML External Entity(XXE) 취약점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'mobile-security',
    name: '모바일 앱 보안',
    color: 'from-yellow-500 to-yellow-400',
    questions: [
      { id: 1, question: 'OWASP Mobile Top 10의 항목을 나열하시오.', answer: 'Improper Platform Usage, Insecure Data Storage, Insecure Communication 등', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: OWASP Mobile Top 10의 항목을 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '안드로이드 앱 난독화(Obfuscation)의 목적을 설명하시오.', answer: '리버스 엔지니어링 방지, 코드 분석 어렵게 함', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 안드로이드 앱 난독화(Obfuscation)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'iOS Keychain과 Android Keystore의 역할을 설명하시오.', answer: '민감 데이터(키, 토큰)를 안전하게 저장하는 보안 저장소', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: iOS Keychain과 Android Keystore의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '루팅/탈옥 탐지의 필요성을 설명하시오.', answer: '보안 우회 가능, 앱 무결성 훼손 방지', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 루팅/탈옥 탐지의 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'Certificate Pinning의 목적을 설명하시오.', answer: 'MITM 공격 방지, 특정 인증서만 신뢰', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: Certificate Pinning의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '안드로이드 권한(Permission) 모델을 설명하시오.', answer: 'Normal/Dangerous 권한 분류, 런타임 권한 요청', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 안드로이드 권한(Permission) 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '모바일 앱 디컴파일 도구를 설명하시오.', answer: 'jadx, apktool(Android), class-dump, Hopper(iOS)', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 모바일 앱 디컴파일 도구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'WebView 보안 취약점을 설명하시오.', answer: 'JavaScript Interface 노출, 파일 접근, XSS', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: WebView 보안 취약점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'Frida를 이용한 동적 분석을 설명하시오.', answer: '런타임 후킹으로 앱 동작 분석 및 수정', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: Frida를 이용한 동적 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '안전한 데이터 저장 위치를 설명하시오.', answer: 'Internal Storage(앱 전용), Keystore/Keychain 사용', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 안전한 데이터 저장 위치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'code-analysis',
    name: '소스코드 분석',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: 'SAST와 DAST의 차이를 설명하시오.', answer: 'SAST: 정적 분석(소스코드), DAST: 동적 분석(실행 중)', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: SAST와 DAST의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '소스코드 분석 도구 3가지를 쓰시오.', answer: 'SonarQube, Fortify, Checkmarx', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 소스코드 분석 도구 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'IAST(Interactive Application Security Testing)를 설명하시오.', answer: 'SAST+DAST 결합, 런타임 중 코드 분석', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: IAST(Interactive Application Security Testing)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'SCA(Software Composition Analysis)의 목적을 설명하시오.', answer: '오픈소스 라이브러리의 취약점 및 라이선스 분석', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: SCA(Software Composition Analysis)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '코드 리뷰의 보안 체크포인트를 설명하시오.', answer: '입력 검증, 인증/인가, 암호화, 에러처리, 로깅', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 코드 리뷰의 보안 체크포인트를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'Fuzzing 테스트의 개념을 설명하시오.', answer: '무작위/비정상 입력으로 예외 상황 유발', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: Fuzzing 테스트의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '모의해킹(Penetration Testing)의 절차를 설명하시오.', answer: '정보수집 → 취약점 분석 → 공격 → 권한상승 → 보고서', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: 모의해킹(Penetration Testing)의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'White Box, Black Box, Gray Box 테스트의 차이를 설명하시오.', answer: 'White: 내부 정보 있음, Black: 없음, Gray: 일부 정보', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: White Box, Black Box, Gray Box 테스트의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'RASP(Runtime Application Self-Protection)를 설명하시오.', answer: '애플리케이션 내부에서 실시간 공격 탐지/방어', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: RASP(Runtime Application Self-Protection)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'DevSecOps의 개념과 중요성을 설명하시오.', answer: 'DevOps에 보안 통합, CI/CD 파이프라인에 보안 검증', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: DevSecOps의 개념과 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'api-security',
    name: 'API 보안',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: 'API 인증 방식의 종류를 설명하시오.', answer: 'API Key, OAuth 2.0, JWT, Basic Auth', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: API 인증 방식의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'JWT(JSON Web Token)의 구조를 설명하시오.', answer: 'Header.Payload.Signature (Base64 인코딩)', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: JWT(JSON Web Token)의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'Rate Limiting의 목적과 구현 방법을 설명하시오.', answer: 'API 남용 방지, 토큰 버킷/슬라이딩 윈도우 알고리즘', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: Rate Limiting의 목적과 구현 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'OWASP API Security Top 10을 설명하시오.', answer: 'BOLA, Broken Auth, Excessive Data Exposure 등', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: OWASP API Security Top 10을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'CORS(Cross-Origin Resource Sharing)의 보안 설정을 설명하시오.', answer: 'Access-Control-Allow-Origin 헤더로 허용 도메인 지정', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: CORS(Cross-Origin Resource Sharing)의 보안 설정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'API Gateway의 보안 기능을 설명하시오.', answer: '인증, Rate Limiting, 로깅, 트래픽 관리', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: API Gateway의 보안 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'BOLA(Broken Object Level Authorization) 취약점을 설명하시오.', answer: '객체 ID 조작으로 타인 데이터 접근', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: BOLA(Broken Object Level Authorization) 취약점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'GraphQL 보안 고려사항을 설명하시오.', answer: '쿼리 깊이 제한, Introspection 비활성화, Rate Limiting', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: GraphQL 보안 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'API 버전 관리의 보안 중요성을 설명하시오.', answer: '구버전 취약점 관리, 호환성 유지, 점진적 폐기', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: API 버전 관리의 보안 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'API 로깅 및 모니터링의 중요성을 설명하시오.', answer: '이상 탐지, 사고 분석, 컴플라이언스 준수', prompt: `정보보안기사 애플리케이션 보안 문제입니다.\n\n문제: API 로깅 및 모니터링의 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function ApplicationSecurityPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['web-security']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('info-security-application-security-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('info-security-application-security-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: string) => setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]);
  const toggleQuestion = (topicId: string, questionId: number) => setCompletedQuestions(prev => { const tc = prev[topicId] || []; return { ...prev, [topicId]: tc.includes(questionId) ? tc.filter(id => id !== questionId) : [...tc, questionId] }; });
  const getTopicProgress = (topicId: string, total: number) => Math.round(((completedQuestions[topicId]?.length || 0) / total) * 100);
  const getTotalProgress = () => { const total = topics.reduce((a, t) => a + t.questions.length, 0); const comp = Object.values(completedQuestions).reduce((a, arr) => a + arr.length, 0); return Math.round((comp / total) * 100); };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-red-600">홈</a><span className="text-gray-300">›</span><a href="/category/it" className="text-gray-600 hover:text-red-600">IT·정보통신</a><span className="text-gray-300">›</span><a href="/category/it/information-security" className="text-gray-600 hover:text-red-600">정보보안기사</a><span className="text-gray-300">›</span><span className="text-red-600 font-medium">애플리케이션 보안</span></nav></div></header>

      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4"><div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">📱</span></div><div><h1 className="text-2xl font-bold">애플리케이션 보안</h1><p className="text-red-100">정보보안기사 3과목 - 웹 보안, 시큐어 코딩, 모바일 보안</p></div></div></div></section>

      <div className="bg-white border-b"><div className="max-w-6xl mx-auto px-4 py-4"><div className="flex items-center justify-between mb-2"><span className="font-medium text-gray-700">전체 진행률</span><span className="text-red-600 font-bold">{getTotalProgress()}%</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all" style={{ width: `${getTotalProgress()}%` }} /></div></div></div>

      <main className="max-w-6xl mx-auto px-4 py-8"><div className="space-y-4">{topics.map((topic) => (<div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => toggleTopic(topic.id)} className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}><div className="flex items-center gap-3"><span className="font-bold text-lg">{topic.name}</span><span className="bg-white/20 px-2 py-1 rounded text-sm">{topic.questions.length}문항</span></div><div className="flex items-center gap-4"><div className="w-24 bg-white/30 rounded-full h-2"><div className="bg-white h-2 rounded-full" style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }} /></div><span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span><span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span></div></button>{expandedTopics.includes(topic.id) && (<div className="p-4 space-y-3">{topic.questions.map((q) => (<div key={q.id} className={`p-4 rounded-lg border ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions[topic.id]?.includes(q.id) && '✓'}</button><div className="flex-1"><p className="font-medium text-gray-800 mb-2"><span className="text-red-500 mr-2">Q{q.id}.</span>{q.question}</p><p className="text-sm text-gray-600 bg-white p-2 rounded border"><span className="font-medium text-green-600">A.</span> {q.answer}</p></div><button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition">🤖 AI</button></div></div>))}</div>)}</div>))}</div></main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
