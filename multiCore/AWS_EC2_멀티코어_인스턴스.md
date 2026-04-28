# AWS EC2 멀티코어 인스턴스 비교

Claude 교육 시스템용 — 학생 수에 따라 코어가 많은 인스턴스 선택 가이드

---

## 1. 용도별 추천 인스턴스 패밀리

| 패밀리 | 용도 | 프로세서 | 특징 |
|--------|------|---------|------|
| **t3/t3a** | 소규모 (3~4명) | Intel/AMD x86 | 버스트 성능, 가장 저렴 |
| **c7g** | CPU 집약 (많은 학생) | Graviton3 (ARM) | 최고 가성비 |
| **c7i** | CPU 집약 | Intel x86 | x86 호환 필요 시 |
| **m7g** | 범용 (RAM 여유) | Graviton3 (ARM) | CPU + RAM 균형 |
| **m7i** | 범용 | Intel x86 | x86 호환 필요 시 |

> Graviton(ARM) 인스턴스가 x86 대비 **~20% 저렴**하고 성능도 우수합니다.
> Claude Code CLI는 ARM(aarch64)에서 정상 동작합니다 (Odroid C2에서 검증됨).

---

## 2. 학생 수별 추천 인스턴스

### 3~4명: 소규모 수업

| 인스턴스 | vCPU | RAM | 시간당 가격 (서울) | 월 예상 (8h/일×20일) |
|---------|------|-----|-----------------|-------------------|
| **t3.xlarge** | 4 | 16GB | ~$0.2080 | ~$33 |
| **t3a.xlarge** | 4 | 16GB | ~$0.1872 | ~$30 |
| **c7g.xlarge** | 4 | 8GB | ~$0.1720 | ~$28 |
| **m7g.xlarge** | 4 | 16GB | ~$0.2040 | ~$33 |

### 8~15명: 중규모 수업

| 인스턴스 | vCPU | RAM | 시간당 가격 (서울) | 월 예상 (8h/일×20일) |
|---------|------|-----|-----------------|-------------------|
| **c7g.2xlarge** | 8 | 16GB | ~$0.3440 | ~$55 |
| **c7g.4xlarge** | 16 | 32GB | ~$0.6880 | ~$110 |
| **m7g.2xlarge** | 8 | 32GB | ~$0.4080 | ~$65 |
| **m7g.4xlarge** | 16 | 64GB | ~$0.8160 | ~$131 |

### 16~31명: 대규모 수업

| 인스턴스 | vCPU | RAM | 시간당 가격 (서울) | 월 예상 (8h/일×20일) |
|---------|------|-----|-----------------|-------------------|
| **c7g.8xlarge** | 32 | 64GB | ~$1.3760 | ~$220 |
| **m7g.8xlarge** | 32 | 128GB | ~$1.6320 | ~$261 |

### 32~63명: 초대규모

| 인스턴스 | vCPU | RAM | 시간당 가격 (서울) | 월 예상 (8h/일×20일) |
|---------|------|-----|-----------------|-------------------|
| **c7g.16xlarge** | 64 | 128GB | ~$2.7520 | ~$440 |
| **m7g.16xlarge** | 64 | 256GB | ~$3.2640 | ~$522 |
| **c7g.metal** | 64 | 128GB | ~$2.7520 | ~$440 |

---

## 3. 가성비 최고 추천

### 교육용 Best Pick: **c7g 시리즈** (Graviton3 ARM)

```
학생 3명  → c7g.xlarge   (4 vCPU,   8GB) → ~$0.17/h
학생 7명  → c7g.2xlarge  (8 vCPU,  16GB) → ~$0.34/h
학생 15명 → c7g.4xlarge  (16 vCPU, 32GB) → ~$0.69/h
학생 31명 → c7g.8xlarge  (32 vCPU, 64GB) → ~$1.38/h
학생 63명 → c7g.16xlarge (64 vCPU,128GB) → ~$2.75/h
```

**이유:**
- Claude Code CLI는 API 호출이 주 작업이라 CPU 부하가 적음
- 코어당 가격이 가장 저렴
- ARM 아키텍처에서 Claude Code 정상 동작 확인됨

---

## 4. 비용 절감 방법

### Spot 인스턴스 (최대 90% 할인)
```
c7g.4xlarge On-Demand: ~$0.69/h
c7g.4xlarge Spot:      ~$0.21/h (약 70% 할인)
```
- 교육용으로 적합 (중단되어도 다시 시작하면 됨)
- 수업 시간 중 중단 가능성은 낮음

### Savings Plans (1년 약정, ~30% 할인)
```
c7g.4xlarge On-Demand: ~$0.69/h
c7g.4xlarge 1yr Plan:  ~$0.44/h
```

### 수업 시간만 사용
```
EC2 스케줄링: 수업 시작 시 자동 시작, 종료 시 자동 중지
→ 월 160시간만 사용 (24×30=720시간 대비 78% 절감)
```

---

## 5. Odroid C2 vs EC2 비교

| 항목 | Odroid C2 (현재) | c7g.4xlarge |
|------|----------------|-------------|
| CPU | Cortex-A53 × 4 | Graviton3 × 16 |
| RAM | 2GB | 32GB |
| 학생 수 | 최대 3명 | 최대 15명 |
| 네트워크 | 가정 인터넷 | AWS 고속 네트워크 |
| 비용 | 전기세만 | ~$0.69/h |
| 안정성 | SD카드 의존 | EBS SSD |
| 관리 | 직접 관리 | AWS 관리 |

---

## 6. 구성 예시 (c7g.4xlarge, 학생 15명)

```
[학생 1~15 브라우저] → [EC2 c7g.4xlarge]
                         ├── Core 0: Nginx + Node.js 웹 서버
                         ├── Core 1: Student 1 Claude
                         ├── Core 2: Student 2 Claude
                         ├── ...
                         └── Core 15: Student 15 Claude

OS: Ubuntu 24.04 ARM64
RAM: 32GB (학생당 ~2GB)
Storage: 30GB EBS gp3
```

### 빠른 시작 (AWS CLI)
```bash
# c7g.4xlarge 인스턴스 시작 (Ubuntu 24.04 ARM64)
aws ec2 run-instances \
  --instance-type c7g.4xlarge \
  --image-id ami-0xxxxx \  # Ubuntu 24.04 ARM64 AMI
  --key-name my-key \
  --security-group-ids sg-xxxxx \
  --region ap-northeast-2

# SSH 접속 후 Odroid C2와 동일한 설정 스크립트 실행
```

---

## 참고 자료

- [AWS EC2 인스턴스 타입](https://aws.amazon.com/ec2/instance-types/)
- [EC2 On-Demand 가격표](https://aws.amazon.com/ec2/pricing/on-demand/)
- [EC2 인스턴스 비교 도구 (Vantage)](https://instances.vantage.sh/)
- [EC2 인스턴스 비교 (CloudPrice)](https://cloudprice.net/aws/ec2)
- [AWS 가격 계산기](https://calculator.aws/)

> 참고: 가격은 서울 리전(ap-northeast-2) 기준 추정치이며, 실제 가격은 AWS 사이트에서 확인하세요.
