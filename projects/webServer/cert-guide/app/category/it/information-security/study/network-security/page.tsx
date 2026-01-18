'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'tcp-ip',
    name: 'TCP/IP 프로토콜 보안',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: 'OSI 7계층 모델을 순서대로 쓰고 각 계층의 역할을 설명하시오.', answer: '물리, 데이터링크, 네트워크, 전송, 세션, 표현, 응용', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: OSI 7계층 모델을 순서대로 쓰고 각 계층의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'TCP 3-Way Handshake 과정을 설명하시오.', answer: 'SYN → SYN-ACK → ACK 순서로 연결 설정', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: TCP 3-Way Handshake 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'TCP와 UDP의 차이점을 설명하시오.', answer: 'TCP: 연결지향/신뢰성, UDP: 비연결/빠른 전송', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: TCP와 UDP의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'ARP(Address Resolution Protocol)의 동작 원리를 설명하시오.', answer: 'IP 주소를 MAC 주소로 변환, 브로드캐스트 요청/유니캐스트 응답', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: ARP(Address Resolution Protocol)의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'ICMP 프로토콜의 역할과 주요 메시지 타입을 설명하시오.', answer: '네트워크 오류/상태 전달, Echo Request(8)/Reply(0), Destination Unreachable(3)', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: ICMP 프로토콜의 역할과 주요 메시지 타입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'DNS의 동작 과정과 보안 위협을 설명하시오.', answer: '도메인→IP 변환, DNS Spoofing/Cache Poisoning 위협', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: DNS의 동작 과정과 보안 위협을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'DHCP의 동작 과정(DORA)을 설명하시오.', answer: 'Discover → Offer → Request → Ack', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: DHCP의 동작 과정(DORA)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'NAT(Network Address Translation)의 종류와 목적을 설명하시오.', answer: 'Static/Dynamic/PAT, 사설IP↔공인IP 변환, IP 절약 및 보안', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: NAT(Network Address Translation)의 종류와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'IPv4와 IPv6의 차이점을 설명하시오.', answer: 'IPv4: 32비트, IPv6: 128비트 / IPSec 기본 지원', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: IPv4와 IPv6의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'SSL/TLS 핸드셰이크 과정을 설명하시오.', answer: 'ClientHello → ServerHello → 인증서교환 → 키교환 → 암호화통신', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: SSL/TLS 핸드셰이크 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'network-attack',
    name: '네트워크 공격 기법',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: 'DoS와 DDoS 공격의 차이를 설명하시오.', answer: 'DoS: 단일 공격자, DDoS: 다수의 분산된 공격자(봇넷)', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: DoS와 DDoS 공격의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'SYN Flood 공격의 원리와 대응방안을 설명하시오.', answer: '다량의 SYN 패킷으로 연결 대기열 소진 / SYN Cookie, 방화벽 설정', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: SYN Flood 공격의 원리와 대응방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'ARP Spoofing 공격의 원리를 설명하시오.', answer: '가짜 ARP Reply로 MAC 테이블 변조, 트래픽 가로채기', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: ARP Spoofing 공격의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'IP Spoofing 공격의 원리와 목적을 설명하시오.', answer: '출발지 IP 위조, 신뢰 관계 악용 또는 추적 회피', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: IP Spoofing 공격의 원리와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'Smurf Attack의 원리를 설명하시오.', answer: '출발지IP 위조 후 브로드캐스트로 ICMP 전송, 증폭 공격', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: Smurf Attack의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'DNS Amplification 공격의 원리를 설명하시오.', answer: 'DNS 응답 크기 증폭을 이용한 DDoS 공격', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: DNS Amplification 공격의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'MITM(Man-in-the-Middle) 공격의 유형을 설명하시오.', answer: 'ARP Spoofing, DNS Spoofing, SSL Stripping', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: MITM(Man-in-the-Middle) 공격의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'Session Hijacking의 원리를 설명하시오.', answer: '세션 ID 탈취 후 정상 사용자로 위장', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: Session Hijacking의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'Port Scanning 기법의 종류를 설명하시오.', answer: 'TCP Connect, SYN Scan, FIN Scan, XMAS Scan, NULL Scan', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: Port Scanning 기법의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'Slowloris 공격의 원리를 설명하시오.', answer: 'HTTP 헤더를 천천히 전송하여 연결 유지, 서버 자원 소진', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: Slowloris 공격의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'firewall',
    name: '방화벽',
    color: 'from-yellow-500 to-yellow-400',
    questions: [
      { id: 1, question: '방화벽의 종류 4가지를 쓰고 각각의 특징을 설명하시오.', answer: '패킷 필터링, 상태 검사, 애플리케이션 게이트웨이, 회선 레벨 게이트웨이', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: 방화벽의 종류 4가지를 쓰고 각각의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '패킷 필터링 방화벽의 장단점을 설명하시오.', answer: '장점: 빠른 속도, 단점: 애플리케이션 레벨 검사 불가', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: 패킷 필터링 방화벽의 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'Stateful Inspection 방화벽의 동작 원리를 설명하시오.', answer: '연결 상태 테이블 유지, 세션 기반 트래픽 검사', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: Stateful Inspection 방화벽의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'DMZ(Demilitarized Zone)의 구성 목적을 설명하시오.', answer: '외부 공개 서버를 내부망과 분리하여 보안 강화', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: DMZ(Demilitarized Zone)의 구성 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'NGFW(차세대 방화벽)의 주요 기능을 설명하시오.', answer: 'Deep Packet Inspection, 애플리케이션 인식, 사용자 인식', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: NGFW(차세대 방화벽)의 주요 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '방화벽 정책의 기본 원칙을 설명하시오.', answer: 'Default Deny(기본 거부), Whitelist 방식 권장', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: 방화벽 정책의 기본 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'UTM(Unified Threat Management)의 개념을 설명하시오.', answer: '방화벽, IDS/IPS, VPN, 안티바이러스 등 통합 보안 장비', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: UTM(Unified Threat Management)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'WAF(Web Application Firewall)의 역할을 설명하시오.', answer: '웹 애플리케이션 공격(SQL Injection, XSS 등) 방어', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: WAF(Web Application Firewall)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'iptables의 기본 체인 3가지를 설명하시오.', answer: 'INPUT(수신), OUTPUT(송신), FORWARD(포워딩)', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: iptables의 기본 체인 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'Bastion Host의 역할을 설명하시오.', answer: '외부와 내부 네트워크 사이의 보안 관문 서버', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: Bastion Host의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'ids-ips',
    name: 'IDS/IPS',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: 'IDS(침입탐지시스템)와 IPS(침입방지시스템)의 차이를 설명하시오.', answer: 'IDS: 탐지 및 알림, IPS: 탐지 및 차단', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: IDS(침입탐지시스템)와 IPS(침입방지시스템)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '오용 탐지(Misuse Detection)와 이상 탐지(Anomaly Detection)의 차이를 설명하시오.', answer: '오용: 시그니처 기반, 이상: 정상 패턴 벗어남 탐지', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: 오용 탐지(Misuse Detection)와 이상 탐지(Anomaly Detection)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'NIDS와 HIDS의 차이를 설명하시오.', answer: 'NIDS: 네트워크 트래픽 모니터링, HIDS: 호스트 활동 모니터링', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: NIDS와 HIDS의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'False Positive와 False Negative의 차이를 설명하시오.', answer: 'FP: 정상을 공격으로 오탐, FN: 공격을 정상으로 미탐', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: False Positive와 False Negative의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'Snort IDS의 룰 구조를 설명하시오.', answer: 'Action Protocol SrcIP SrcPort -> DstIP DstPort (Options)', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: Snort IDS의 룰 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'IDS 회피 기법 3가지를 설명하시오.', answer: '패킷 분할, 암호화, 프로토콜 위장', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: IDS 회피 기법 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'Honeypot의 목적과 종류를 설명하시오.', answer: '공격자 유인 및 분석, Low/High Interaction Honeypot', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: Honeypot의 목적과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'Network TAP의 역할을 설명하시오.', answer: '네트워크 트래픽 미러링을 위한 물리적 장비', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: Network TAP의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'Suricata와 Snort의 차이점을 설명하시오.', answer: 'Suricata: 멀티스레드, GPU 가속 지원 / Snort: 단일 스레드', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: Suricata와 Snort의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'NDR(Network Detection and Response)의 개념을 설명하시오.', answer: '네트워크 트래픽 분석 기반 위협 탐지 및 대응 솔루션', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: NDR(Network Detection and Response)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'vpn-wireless',
    name: 'VPN 및 무선 보안',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: 'VPN의 종류(Site-to-Site, Remote Access)를 설명하시오.', answer: 'Site-to-Site: 네트워크 간 연결, Remote: 개인-네트워크 연결', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: VPN의 종류(Site-to-Site, Remote Access)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'IPSec의 구성요소(AH, ESP)를 설명하시오.', answer: 'AH: 인증/무결성, ESP: 인증/무결성/기밀성', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: IPSec의 구성요소(AH, ESP)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'IPSec의 Transport 모드와 Tunnel 모드의 차이를 설명하시오.', answer: 'Transport: 페이로드만 암호화, Tunnel: 전체 IP 패킷 암호화', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: IPSec의 Transport 모드와 Tunnel 모드의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'IKE(Internet Key Exchange)의 역할을 설명하시오.', answer: 'IPSec에서 보안 연결(SA) 설정 및 키 교환', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: IKE(Internet Key Exchange)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'SSL VPN과 IPSec VPN의 차이를 설명하시오.', answer: 'SSL: 웹 브라우저 기반, IPSec: 전용 클라이언트 필요', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: SSL VPN과 IPSec VPN의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'WEP의 취약점을 설명하시오.', answer: 'IV 재사용, RC4 취약점, 키 관리 문제', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: WEP의 취약점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'WPA, WPA2, WPA3의 차이점을 설명하시오.', answer: 'WPA: TKIP, WPA2: AES-CCMP, WPA3: SAE/Dragonfly', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: WPA, WPA2, WPA3의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '802.1X 인증의 구성요소를 설명하시오.', answer: 'Supplicant(클라이언트), Authenticator(AP), Authentication Server(RADIUS)', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: 802.1X 인증의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'Rogue AP 공격의 위험성과 대응방안을 설명하시오.', answer: '악성 AP로 트래픽 가로채기 / WIPS, AP 모니터링', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: Rogue AP 공격의 위험성과 대응방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'NAC(Network Access Control)의 기능을 설명하시오.', answer: '네트워크 접근 전 보안 상태 검사 및 제어', prompt: `정보보안기사 네트워크 보안 문제입니다.\n\n문제: NAC(Network Access Control)의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function NetworkSecurityPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['tcp-ip']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('info-security-network-security-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('info-security-network-security-progress', JSON.stringify(completedQuestions));
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
            <span className="text-red-600 font-medium">네트워크 보안</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🌐</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">네트워크 보안</h1>
              <p className="text-red-100">정보보안기사 2과목 - TCP/IP, 공격기법, 방화벽, IDS/IPS</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-red-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all" style={{ width: `${getTotalProgress()}%` }} />
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{topic.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">{topic.questions.length}문항</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-white/30 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }} />
                  </div>
                  <span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span>
                  <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                          {completedQuestions[topic.id]?.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2"><span className="text-red-500 mr-2">Q{q.id}.</span>{q.question}</p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border"><span className="font-medium text-green-600">A.</span> {q.answer}</p>
                        </div>
                        <button onClick={() => openAIModal(q.prompt)} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition">🤖 AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
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
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
