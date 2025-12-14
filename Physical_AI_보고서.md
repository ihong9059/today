# Physical AI 보고서

**작성일:** 2025년 12월 15일

---

## 1. Physical AI란?

### 1.1 정의

Physical AI(물리적 AI)는 **로봇, 시각 AI 에이전트, 창고, 공장 및 실제 세계에서 작동하는 기타 자율 시스템에 인공지능을 구현한 것**입니다.

Capgemini의 Pascal Brier는 Physical AI를 **"생각하는 시스템과 행동하는 기계의 교차점"**이라고 설명합니다. 디지털 세계뿐만 아니라 물리적 세계에서 시스템이 작동하도록 만드는 것이 목표입니다.

### 1.2 Embodied AI (체화된 AI)

Embodied AI는 AI를 로봇과 같은 물리적 신체에 통합하여, 인간처럼 환경을 인지하고, 학습하고, 동적으로 상호작용할 수 있게 합니다.

| 구분 | Non-Embodied AI | Embodied AI |
|------|-----------------|-------------|
| 비유 | "통 속의 뇌" (A Brain in a Vat) | "체화된 뇌" (An Embodied Brain) |
| 형태 | 서버에 존재하는 순수 소프트웨어 (예: ChatGPT) | 물리적/가상 신체와 통합된 소프트웨어 |
| 특징 | 텍스트, 이미지 생성 | 인지, 행동, 환경 피드백을 통한 학습 |

---

## 2. 2025년 Physical AI의 중요성

### 2.1 "걷는 AI의 해"

> **"2024년이 말하는 AI의 해였다면, 2025년은 걷는 AI의 해이다."**

Physical AI의 시대가 도래했습니다. 고급 지능이 주입된 로봇들이 실제 세계의 예측 불가능성을 인식하고, 추론하며, 적응할 수 있게 되었습니다.

### 2.2 산업적 영향

NVIDIA CEO Jensen Huang은 CES 2025에서 다음과 같이 강조했습니다:

> **"Physical AI는 50조 달러 규모의 제조업과 물류 산업을 혁신할 것입니다. 자동차, 트럭, 공장, 창고 등 움직이는 모든 것이 로봇화되고 AI로 구현될 것입니다."**

### 2.3 국가 전략적 중요성

중국은 2025년 3월 정부 업무 보고서에서 **Embodied AI를 바이오 제조, 양자 기술, 6G와 함께 미래 산업 구축의 핵심 도구**로 지정했습니다.

---

## 3. 핵심 기술

### 3.1 소프트웨어 정의 로봇 (SDR)

기존의 정적 프로그래밍 대신 **적응형 AI 모델**로 제어되는 로봇입니다.

**주요 기술 구성:**
- **대규모 언어 모델 (LLM)** - 사고 및 추론 능력 제공
- **비전-언어 모델 (VLM)** - 시각적 이해와 언어 처리 통합
- **컴퓨터 비전 & 3D 라이다** - 환경 인식
- **강화 학습** - 가상 환경에서 시행착오를 통한 행동 학습

### 3.2 NVIDIA 핵심 플랫폼

| 플랫폼 | 용도 |
|--------|------|
| **Isaac** | AI 기반 로봇 개발 가속화 (내비게이션, 이동성, 그래스핑, 비전) |
| **Omniverse** | 디지털 트윈 및 시뮬레이션 환경 구축 |
| **Metropolis** | 시각 AI 에이전트 개발, 배포, 확장 |

---

## 4. 주요 응용 분야

### 4.1 제조업

**디지털 트윈 & 공장 최적화:**
- **Caterpillar**: Omniverse를 사용하여 공장과 공급망의 디지털 트윈 생성
- **BMW**: 예측 유지보수, 프로세스 최적화, 가상 커미셔닝에 활용
- **Samsung**: 50,000개 이상의 NVIDIA GPU로 구동되는 반도체 AI 공장 구축

**유럽 제조업:**
- NVIDIA가 독일에 세계 최초의 산업용 AI 클라우드 구축 (10,000 GPU)

### 4.2 물류

- **FedEx**: NVIDIA Metropolis 플랫폼으로 창고 자동화, 자율 차량 내비게이션, 공급망 최적화
- **Amazon Robotics**: Omniverse로 로봇 개발 기간을 수년에서 수개월로 단축

### 4.3 기타 산업

- **농업**: 자율 농기계, 작물 모니터링
- **헬스케어**: 수술 보조 로봇, 환자 케어
- **리테일**: 재고 관리, 고객 서비스

---

## 5. 주요 휴머노이드 로봇 기업 (2025)

### 5.1 주요 기업 및 로봇

| 기업 | 로봇 | 특징 |
|------|------|------|
| **Tesla** | Optimus Gen 2 | 173cm, 57kg, 40+ 액추에이터, 2025년 5,000대 생산 목표 |
| **Figure AI** | Figure 02/03 | Microsoft, NVIDIA, OpenAI 등에서 $700M+ 투자 유치 |
| **Boston Dynamics** | Electric Atlas | 달리기, 점프, 백플립 가능한 고성능 휴머노이드 |
| **Agility Robotics** | Digit | 물류 자재 핸들링, Amazon 창고에서 테스트 중 |
| **Apptronik** | Apollo | 2025년 2월 $350M 시리즈 B, Amazon/Mercedes-Benz/Walmart 파트너십 |
| **Sanctuary AI** | Phoenix | "Carbon" AI 시스템, 의류 접기/정리, 언어 명령 이해 |
| **Unitree Robotics** | G1/H1 | $16,000부터, 가장 저렴한 이족 보행 휴머노이드 |
| **XPeng** | Next-Gen IRON | 인간형 척추, 생체 근육, 82 자유도 |

### 5.2 시장 전망

- **Morgan Stanley 예측**: 2050년까지 전 세계 **10억 대 이상**의 휴머노이드 로봇 보급
- **시장 규모**: 2029년까지 **$130억** 돌파 예상
- **2025년 전환점**: Foundation 모델 성숙, 하드웨어 비용 감소, 2~3세대 플랫폼 준비 완료

---

## 6. 미래 전망

### 6.1 NVIDIA CEO의 비전

> **"다음 AI의 물결은 Physical AI입니다. 물리 법칙을 이해하고, 우리 사이에서 일할 수 있으며, 세계를 인식하는 방법을 이해하는 AI입니다."**
> — Jensen Huang, NVIDIA CEO

### 6.2 주요 투자 동향

- 2025년 미국 생산 시설 확충에 **$1.2조** 투자 발표
- 전자, 제약, 반도체 제조업체 주도
- 인력 부족 문제 해결 및 미국 재산업화 추진

### 6.3 기대 효과

1. **노동력 부족 해결**: 고령화 사회의 인력 공백 보완
2. **생산성 향상**: 24시간 무중단 운영 가능
3. **안전성 개선**: 위험한 작업 환경에서 인간 대체
4. **품질 일관성**: AI 기반 실시간 품질 검사

---

## 7. 결론

Physical AI는 2025년 가장 주목받는 기술 트렌드 중 하나로, 단순한 소프트웨어 AI를 넘어 실제 세계에서 작동하는 지능형 시스템으로의 진화를 의미합니다.

제조업, 물류, 헬스케어 등 다양한 산업에서 Physical AI의 도입이 가속화되고 있으며, 이는 산업 혁명에 버금가는 변화를 가져올 것으로 예상됩니다.

특히 휴머노이드 로봇 분야는 Tesla, Figure AI, Boston Dynamics 등 주요 기업들의 경쟁이 치열해지고 있으며, 2025년은 이러한 기술이 실험실을 벗어나 실제 현장에 배치되기 시작하는 전환점이 될 것입니다.

---

## 참고 자료

- [NVIDIA Physical AI Blog](https://blogs.nvidia.com/blog/three-computers-robotics/)
- [Deloitte - Physical AI and Humanoid Robots](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/physical-ai-humanoid-robots.html)
- [TCS - The Dawn of Physical AI](https://www.tcs.com/what-we-do/industries/manufacturing/white-paper/dawn-of-physical-ai-future-robotics-agi)
- [World Economic Forum - Physical AI Report 2025](https://reports.weforum.org/docs/WEF_Physical_AI_Powering_the_New_Age_of_Industrial_Operations_2025.pdf)
- [NVIDIA US Manufacturing and Robotics](https://nvidianews.nvidia.com/news/nvidia-us-manufacturing-robotics-physical-ai)
- [Top 12 Humanoid Robots of 2025](https://humanoidroboticstechnology.com/articles/top-12-humanoid-robots-of-2025/)
- [Bain & Company - Humanoid Robots Report 2025](https://www.bain.com/insights/humanoid-robots-from-demos-to-deployment-technology-report-2025/)
- [Cambridge Consultants - Physical AI](https://www.cambridgeconsultants.com/physical-ai-and-humanoid-robotics-at-a-turning-point/)

---

*본 보고서는 2025년 12월 15일 기준으로 작성되었습니다.*
