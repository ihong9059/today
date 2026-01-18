'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'cloud',
    name: '클라우드 컴퓨팅',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: '클라우드 서비스 모델 IaaS, PaaS, SaaS를 비교 설명하시오.', answer: 'IaaS: 인프라 제공, PaaS: 플랫폼 제공, SaaS: 소프트웨어 제공', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 클라우드 서비스 모델 IaaS, PaaS, SaaS를 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '퍼블릭, 프라이빗, 하이브리드, 멀티 클라우드의 특징을 설명하시오.', answer: '퍼블릭: 공용, 프라이빗: 전용, 하이브리드: 혼합, 멀티: 다중 벤더', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 퍼블릭, 프라이빗, 하이브리드, 멀티 클라우드의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '서버리스(Serverless) 컴퓨팅의 개념과 장단점을 설명하시오.', answer: '서버 관리 불필요, 이벤트 기반, 비용 효율적, 콜드 스타트 단점', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 서버리스(Serverless) 컴퓨팅의 개념과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'Kubernetes의 아키텍처와 주요 컴포넌트를 설명하시오.', answer: 'Master(API서버, etcd, 스케줄러), Worker(kubelet, kube-proxy), Pod', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: Kubernetes의 아키텍처와 주요 컴포넌트를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'Docker 컨테이너와 VM의 차이를 설명하시오.', answer: 'VM: 하이퍼바이저+게스트OS, 컨테이너: 프로세스 격리, 경량화', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: Docker 컨테이너와 VM의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '클라우드 네이티브 애플리케이션의 특징을 설명하시오.', answer: '마이크로서비스, 컨테이너, 동적 오케스트레이션, DevOps, CI/CD', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 클라우드 네이티브 애플리케이션의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '엣지 컴퓨팅(Edge Computing)의 개념과 필요성을 설명하시오.', answer: '데이터 발생지 근처 처리, 지연시간 감소, IoT/자율주행에 필수', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 엣지 컴퓨팅(Edge Computing)의 개념과 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'CDN(Content Delivery Network)의 동작 원리를 설명하시오.', answer: '분산 서버 네트워크, 캐싱으로 콘텐츠 빠른 전달, 지역별 PoP', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: CDN(Content Delivery Network)의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'Auto Scaling의 구현 방식과 정책을 설명하시오.', answer: '수평적 확장, CPU/메모리 기반 정책, 예측적/반응적 스케일링', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: Auto Scaling의 구현 방식과 정책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '클라우드 비용 최적화 전략을 설명하시오.', answer: '예약 인스턴스, 스팟 인스턴스, 자동 스케일링, 리소스 태깅, 비용 모니터링', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 클라우드 비용 최적화 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI/머신러닝',
    color: 'from-purple-500 to-purple-400',
    questions: [
      { id: 1, question: '머신러닝의 3가지 학습 유형을 설명하시오.', answer: '지도학습(레이블O), 비지도학습(레이블X), 강화학습(보상)', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 머신러닝의 3가지 학습 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '딥러닝의 CNN, RNN, Transformer 구조를 비교하시오.', answer: 'CNN: 이미지, RNN: 순차, Transformer: 어텐션 기반 병렬 처리', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 딥러닝의 CNN, RNN, Transformer 구조를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'LLM(Large Language Model)의 특징과 응용을 설명하시오.', answer: '대규모 파라미터, 자연어 이해/생성, GPT/BERT/LLaMA', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: LLM(Large Language Model)의 특징과 응용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'RAG(Retrieval-Augmented Generation)의 원리를 설명하시오.', answer: '검색+생성 결합, 벡터 DB 활용, 환각 감소, 최신 정보 반영', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: RAG(Retrieval-Augmented Generation)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'MLOps의 개념과 구성요소를 설명하시오.', answer: 'ML + DevOps, 데이터/모델/배포 파이프라인, 모니터링, 재학습', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: MLOps의 개념과 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'AI 모델의 공정성(Fairness)과 편향(Bias) 문제를 설명하시오.', answer: '데이터 편향, 알고리즘 편향, 공정성 지표, XAI(설명 가능 AI)', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: AI 모델의 공정성(Fairness)과 편향(Bias) 문제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '연합학습(Federated Learning)의 개념을 설명하시오.', answer: '분산 데이터로 모델 학습, 데이터 이동 없음, 프라이버시 보호', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 연합학습(Federated Learning)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'GPU/TPU의 AI 학습 가속 원리를 설명하시오.', answer: 'GPU: 병렬 연산, TPU: 텐서 연산 특화, CUDA/cuDNN', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: GPU/TPU의 AI 학습 가속 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '모델 경량화 기법(양자화, 프루닝, 지식증류)을 설명하시오.', answer: '양자화: 비트 감소, 프루닝: 파라미터 제거, 지식증류: 작은 모델 학습', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 모델 경량화 기법(양자화, 프루닝, 지식증류)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '생성형 AI(Generative AI)의 종류와 응용을 설명하시오.', answer: 'GAN, VAE, Diffusion Model / 이미지·텍스트·음성 생성', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 생성형 AI(Generative AI)의 종류와 응용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'blockchain',
    name: '블록체인',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: '블록체인의 핵심 구성요소를 설명하시오.', answer: '블록(헤더+바디), 해시 체인, 합의 알고리즘, P2P 네트워크', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 블록체인의 핵심 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '합의 알고리즘 PoW, PoS, PBFT를 비교하시오.', answer: 'PoW: 작업증명, PoS: 지분증명, PBFT: 비잔틴 장애 허용', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 합의 알고리즘 PoW, PoS, PBFT를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '스마트 컨트랙트의 개념과 활용을 설명하시오.', answer: '자동 실행 계약, 이더리움 Solidity, DeFi/NFT/DAO', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 스마트 컨트랙트의 개념과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '퍼블릭, 프라이빗, 컨소시엄 블록체인을 비교하시오.', answer: '퍼블릭: 개방형, 프라이빗: 폐쇄형, 컨소시엄: 허가형', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 퍼블릭, 프라이빗, 컨소시엄 블록체인을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '블록체인 확장성 문제와 해결 방안을 설명하시오.', answer: '레이어2(라이트닝, 롤업), 샤딩, 사이드체인', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 블록체인 확장성 문제와 해결 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'DID(탈중앙화 신원증명)의 원리를 설명하시오.', answer: '블록체인 기반 자기주권 신원, VC/VP, 신원증명서 검증', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: DID(탈중앙화 신원증명)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'CBDC(중앙은행 디지털 화폐)의 특징을 설명하시오.', answer: '중앙은행 발행 디지털 화폐, 법정화폐 대체, 프로그래머블 머니', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: CBDC(중앙은행 디지털 화폐)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'NFT(Non-Fungible Token)의 기술적 특징을 설명하시오.', answer: '대체 불가능 토큰, ERC-721/1155, 메타데이터, 디지털 소유권', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: NFT(Non-Fungible Token)의 기술적 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '영지식 증명(Zero-Knowledge Proof)의 원리를 설명하시오.', answer: '정보 공개 없이 참 증명, zk-SNARK/zk-STARK, 프라이버시 보호', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 영지식 증명(Zero-Knowledge Proof)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '블록체인 기반 공급망 관리의 장점을 설명하시오.', answer: '투명성, 추적성, 위변조 방지, 실시간 모니터링', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 블록체인 기반 공급망 관리의 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'iot-5g',
    name: 'IoT/5G/6G',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: 'IoT 시스템의 계층 구조를 설명하시오.', answer: '인식(센서), 네트워크(통신), 서비스(응용) 계층', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: IoT 시스템의 계층 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'IoT 통신 프로토콜(MQTT, CoAP, LoRa)을 비교하시오.', answer: 'MQTT: Pub/Sub, CoAP: RESTful, LoRa: 장거리 저전력', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: IoT 통신 프로토콜(MQTT, CoAP, LoRa)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '5G의 3대 특징(eMBB, URLLC, mMTC)을 설명하시오.', answer: 'eMBB: 초고속, URLLC: 초저지연, mMTC: 대규모 연결', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 5G의 3대 특징(eMBB, URLLC, mMTC)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '네트워크 슬라이싱(Network Slicing)의 개념을 설명하시오.', answer: '가상화된 독립 네트워크, 용도별 맞춤 QoS, 5G 핵심 기술', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 네트워크 슬라이싱(Network Slicing)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '디지털 트윈(Digital Twin)의 개념과 활용을 설명하시오.', answer: '물리 객체의 가상 복제, 시뮬레이션/예측, 스마트팩토리 활용', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 디지털 트윈(Digital Twin)의 개념과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '6G 기술의 특징과 예상 활용을 설명하시오.', answer: '1Tbps, 1μs 지연, AI 통합, 홀로그램/확장현실, 2030년 상용화', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 6G 기술의 특징과 예상 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'MEC(Multi-access Edge Computing)의 개념을 설명하시오.', answer: '네트워크 엣지 컴퓨팅, 5G 기지국 근접, 초저지연 서비스', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: MEC(Multi-access Edge Computing)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '자율주행 차량의 통신 기술(V2X)을 설명하시오.', answer: 'V2V, V2I, V2P, V2N / DSRC, C-V2X', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 자율주행 차량의 통신 기술(V2X)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'IoT 보안 위협과 대응방안을 설명하시오.', answer: '기기 취약점, 통신 도청, 봇넷 / 암호화, 인증, 펌웨어 업데이트', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: IoT 보안 위협과 대응방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '스마트시티의 구성요소와 핵심 기술을 설명하시오.', answer: '스마트 교통/에너지/환경/안전, IoT/AI/빅데이터/클라우드', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 스마트시티의 구성요소와 핵심 기술을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'quantum',
    name: '양자컴퓨팅/보안',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: '양자 컴퓨터의 동작 원리를 설명하시오.', answer: '큐비트, 중첩, 얽힘, 양자 게이트, 양자 알고리즘', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 양자 컴퓨터의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '양자 우월성(Quantum Supremacy)의 의미를 설명하시오.', answer: '양자 컴퓨터가 고전 컴퓨터 능가, 특정 문제 기하급수적 속도', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 양자 우월성(Quantum Supremacy)의 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '쇼어 알고리즘과 암호 해독 위협을 설명하시오.', answer: '소인수분해 양자 알고리즘, RSA/ECC 위협, 다항시간 해독', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 쇼어 알고리즘과 암호 해독 위협을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '양자내성암호(PQC)의 종류를 설명하시오.', answer: '격자 기반, 코드 기반, 다변수, 해시 기반, NIST 표준화', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 양자내성암호(PQC)의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '양자키분배(QKD)의 원리를 설명하시오.', answer: '양자역학 기반 안전한 키 교환, BB84, 도청 탐지 가능', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 양자키분배(QKD)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '양자 컴퓨터의 유형(초전도, 이온트랩, 광학)을 비교하시오.', answer: '초전도: IBM/Google, 이온트랩: IonQ, 광학: 실온동작', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 양자 컴퓨터의 유형(초전도, 이온트랩, 광학)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '그로버 알고리즘의 특징을 설명하시오.', answer: '양자 검색 알고리즘, O(√N) 복잡도, 대칭키 암호 키 길이 2배 필요', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 그로버 알고리즘의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '양자 컴퓨팅의 한계와 과제를 설명하시오.', answer: '디코히어런스, 오류 보정, 극저온 유지, 큐비트 수 확장', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 양자 컴퓨팅의 한계와 과제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '양자 컴퓨팅의 응용 분야를 설명하시오.', answer: '신약개발, 최적화, 금융 시뮬레이션, 암호 해독, 머신러닝', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 양자 컴퓨팅의 응용 분야를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '양자 시대 대비 암호 전환 전략을 설명하시오.', answer: '암호 인벤토리, 하이브리드 암호, PQC 도입, Crypto-Agility', prompt: `컴퓨터시스템응용기술사 신기술 문제입니다.\n\n문제: 양자 시대 대비 암호 전환 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function EmergingTechPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['cloud']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computer-system-pro-emerging-tech-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('computer-system-pro-emerging-tech-progress', JSON.stringify(completedQuestions));
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
            <a href="/" className="text-gray-600 hover:text-indigo-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-indigo-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/computer-system-pro" className="text-gray-600 hover:text-indigo-600">컴퓨터시스템응용기술사</a>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">신기술 동향</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🚀</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">신기술 동향</h1>
              <p className="text-indigo-100">컴퓨터시스템응용기술사 - 클라우드, AI/ML, 블록체인, IoT, 양자컴퓨팅</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-indigo-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
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
                            <span className="text-indigo-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-sm hover:bg-indigo-200 transition"
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

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
