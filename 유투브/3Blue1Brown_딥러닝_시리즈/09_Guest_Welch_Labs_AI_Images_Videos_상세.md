# Guest Video — But how do AI images and videos actually work? 상세 분석

## 영상 정보
- **제목**: But how do AI images and videos actually work? | Guest video by Welch Labs
- **채널**: 3Blue1Brown (Welch Labs 게스트 제작)
- **재생시간**: 37분 20초
- **업로드**: 2025-09-15
- **링크**: https://www.youtube.com/watch?v=iv-5mZ_9CPY

## 한 줄 요약
**Diffusion 모델**의 작동 원리 — **CLIP**(텍스트-이미지 공유 임베딩) + **Brownian motion 역재생** + **Score function** + **Conditioning**. 본 시리즈에서 가장 긴 37분으로 텍스트→비디오 생성의 수학·물리적 본질 시각화.

---

## 구간별 상세 내용

### 1. 인트로 — Diffusion = 물리 + 시간 역재생 (00:00-04:00)
[바로가기](https://www.youtube.com/watch?v=iv-5mZ_9CPY&t=0s)

#### 핵심 메시지
**Diffusion 모델 = 물리의 Brownian motion(브라운 운동)을 시간 역재생, 고차원 공간에서**.

#### 상세 내용
- 우주비행사 비디오를 생성한 모델: **WAN 2.1** (오픈소스)
- 시작은 **순수 노이즈** (난수 발생기 호출)
- 노이즈 → Transformer → "약간 덜 노이즈" → 다시 입력 → 50번 반복 → **선명한 비디오**
- 본 영상은 3부 구성:
  1. **CLIP** (OpenAI 2021) — 텍스트-이미지 공유 임베딩
  2. **Diffusion 과정 자체**
  3. **Conditioning** — 텍스트 프롬프트로 생성 가이드

#### 주요 발언
> "AI systems have become astonishingly good at turning text props into videos. At the core of how these models operate is a deep connection to physics." (00:03)

> "This generation of image and video models works using a process known as diffusion, which is remarkably equivalent to the **Brownian motion** we see as particles diffuse, but with **time run backwards, and in high-dimensional space**." (00:14)

---

### 2. CLIP — 텍스트와 이미지의 공유 임베딩 공간 (04:00-12:00) ★ 핵심 1
[바로가기](https://www.youtube.com/watch?v=iv-5mZ_9CPY&t=240s)

#### 핵심 메시지
**CLIP** (OpenAI 2021) = **텍스트 모델 + 이미지 모델**을 함께 학습 → 같은 의미의 텍스트·이미지가 같은 벡터 방향으로 향하도록.

#### 상세 내용
- **데이터**: 인터넷 4억 개 이미지-캡션 쌍
- **학습 방식 (Contrastive)**:
  - 배치에 (고양이 사진, 강아지 사진, 사람 사진) + 각 캡션
  - 매칭 쌍의 **cosine similarity 최대화**
  - 비매칭 쌍의 cosine similarity 최소화
- **출력**: 512차원 공유 임베딩 벡터
- **Latent Space (잠재 공간)**: 텍스트와 이미지가 같은 방향으로 모임

#### 직관
- "고양이 사진" 텍스트의 벡터 ≈ 고양이 이미지의 벡터
- 두 모달리티의 의미가 같은 기하학적 공간에 매핑
- C in CLIP = **Contrastive**

---

### 3. 토이 예제 — 2D 나선(spiral) 데이터셋 (12:00-17:00)
[바로가기](https://www.youtube.com/watch?v=iv-5mZ_9CPY&t=720s)

#### 핵심 메시지
실제 이미지가 너무 고차원이라 **2D 나선** 데이터로 단순화 → diffusion의 기하학적 직관.

#### 상세 내용
- 2D 점들이 나선을 이룸 (학습 데이터)
- **노이즈 추가 = 2D 평면에서 무작위 걸음(random walk)**
- 100 스텝 후: 점이 원래 위치에서 멀어짐 (Brownian motion)
- **Diffusion 모델 학습**: 100번째 점 → 99번째 점 위치 예측

#### 핵심 통찰
- 한 스텝의 방향은 랜덤이지만, **수많은 학습 데이터의 평균에서 신호 발생**
- 모델은 결국 "원래 나선 방향으로 돌아가라"를 학습

---

### 4. ★ Berkeley팀의 핵심 트릭 — 전체 노이즈 예측 (17:00-22:00)
[바로가기](https://www.youtube.com/watch?v=iv-5mZ_9CPY&t=1020s)

#### 핵심 메시지
한 스텝씩 예측 대신, **현재 점에서 원본 데이터로 향하는 전체 벡터** 예측 → **분산 감소** + 학습 효율 대폭 향상.

#### 상세 내용
- 학습 목표: 100번째 점에서 0번째 점으로 가는 벡터
- 수학적 증명: **한 스텝 예측 = 전체 노이즈 / 스텝 수**
- 전체 노이즈를 직접 예측하면 학습 데이터의 분산 감소 → 같은 데이터로 더 잘 학습
- 이를 **Score Function**이라 부름 — "더 그럴듯한, 덜 노이즈한 데이터로 향하는 방향"

#### 시사점
- 학습 트릭이 단순 직관 → 수학적 증명 → 대폭 성능 향상의 **표준 패턴**
- 사용자(홍광선) microGPT 가이드의 학습 부분 보강 자료

---

### 5. Time-conditioning — 노이즈 양에 따른 다른 방향 (22:00-26:00)
[바로가기](https://www.youtube.com/watch?v=iv-5mZ_9CPY&t=1320s)

#### 핵심 메시지
노이즈 100스텝 후의 점 vs 1스텝 후의 점은 다른 처치 필요 → 모델에 **현재 시간 t**도 입력.

#### 상세 내용
- f(point) → f(point, t)
- t가 클 때 (많이 노이즈) → 큰 방향 변화
- t가 작을 때 (조금 노이즈) → 미세 조정
- 학습 후 시각화: 각 t에 대한 **벡터 필드**가 다름

---

### 6. Conditioning — 텍스트 프롬프트로 생성 가이드 (26:00-32:00) ★ 핵심 2
[바로가기](https://www.youtube.com/watch?v=iv-5mZ_9CPY&t=1560s)

#### 핵심 메시지
CLIP의 텍스트 임베딩을 **추가 조건**으로 입력 → 생성 결과를 프롬프트가 묘사하는 방향으로.

#### 상세 내용
- f(point, t, text_embedding)
- 텍스트 임베딩 = CLIP의 텍스트 모델 출력
- "우주비행사" 텍스트 → 우주비행사 이미지로 향하는 vector field
- "고양이" 텍스트 → 고양이 이미지로 향하는 vector field
- **Classifier-Free Guidance**: 조건 있는 예측 + 조건 없는 예측을 선형 결합 → 강도 조절

---

### 7. 실제 비디오 생성 + 마무리 (32:00-37:20)
[바로가기](https://www.youtube.com/watch?v=iv-5mZ_9CPY&t=1920s)

#### 핵심 메시지
2D 토이 모델 → 실제 모델은 **수백만 차원** + Transformer 구조 사용. WAN 2.1은 비디오 = 시간축 추가.

#### 상세 내용
- 한 비디오 = (높이) × (너비) × (시간) × (RGB) 차원
- 매 프레임이 일관성 있게 noise 제거 → 자연스러운 비디오
- **VAE (Variational Autoencoder)**로 차원 압축 후 latent space에서 diffusion → 효율 향상
- 추론 비용 = LLM과 비교 불가능하게 큼 (수십~수백 GPU 시간)

---

## 전체 사례 모음

| 사례 | 설명 | 시사점 |
|------|------|--------|
| 우주비행사 비디오 → flag/laptop/meeting | 같은 모델이 다양한 prompt로 분기 | conditioning 효과 |
| WAN 2.1 오픈소스 | 닫힌 모델보다 약하지만 사용 가능 | OpenClaude USB와 같은 패턴 |
| CLIP 4억 image-caption pairs | 인터넷 스크랩 학습 | 데이터 규모 = 성능 |
| 2D 나선 토이 예제 | 고차원을 단순화 | 직관 도출 도구 |
| Berkeley 트릭 (전체 노이즈 예측) | 분산 감소로 학습 효율 향상 | 머신러닝 표준 패턴 |
| Brownian motion 역재생 | 물리와의 깊은 연결 | 물리학적 사고가 AI에 적용 |

---

## 전체 인용구 모음

### 물리 연결
> "AI systems have become astonishingly good at turning text props into videos. At the core of how these models operate is a deep connection to physics." (00:03)

> "Brownian motion we see as particles diffuse, but with **time run backwards, and in high-dimensional space**." (00:18)

### 학습 데이터 규모
> "CLIP... trained on a dataset of 400 million image and caption pairs scraped from the internet." (04:02)

### 알고리즘의 우아함
> "It turns out that we can prove that learning to predict the noise added in the final step of our walk is **mathematically equivalent** to learning to predict the total noise added, divided by the number of steps taken." (15:20 근처)

---

## 용어 및 개념 설명

| 용어 | 설명 |
|------|------|
| Diffusion Model | 노이즈 → 이미지/비디오 생성 모델 |
| Brownian Motion | 입자의 무작위 운동 (1827 식물학자 Brown 발견) |
| CLIP | OpenAI 2021, 텍스트-이미지 공유 임베딩 |
| Contrastive Learning | 매칭 쌍 가깝게, 비매칭 쌍 멀게 학습 |
| Cosine Similarity | 벡터 간 각도 cosine으로 유사도 측정 |
| Latent Space | 학습된 고차원 의미 공간 |
| Score Function | 더 그럴듯한 데이터로 향하는 vector field |
| Time-conditioning | 모델에 현재 노이즈 단계 t 입력 |
| Classifier-Free Guidance | 조건 있는/없는 예측 결합으로 강도 조절 |
| WAN 2.1 | 오픈소스 비디오 diffusion 모델 |
| VAE | Variational Autoencoder, 차원 압축 |

---

## UTTEC 사업 적용 시사점

### 🔴 즉시 활용
1. **uttec-edu Track F 14가이드 추가**: "AI 이미지·비디오 생성"은 사용자 Remotion 영상 제작과 연결 (어제 #17 교육 홍보 영상 제작)
2. **강사양성 Day 6/7 추가 슬롯**: 37분 영상 = 별도 슬롯 (선택)
3. **사용자 Remotion 활용 → AI 비디오 워크플로우 비교**: 현재 Remotion으로 코드 기반 영상 제작 → 향후 AI diffusion 모델로 보강 가능

### 🟠 중기 검토
4. **Stage 2~4 영업 자료**: 
   - "AI 비디오 생성 = 50번 반복 노이즈 제거" 메시지
   - 비전공자에게 AI 콘텐츠 생성 비용·시간 설명
5. **WAN 2.1 같은 오픈소스 활용**: 본 영상이 직접 시연 → UTTEC가 고객에게 AI 비디오 데모할 때 사용 가능
6. **CLIP 임베딩**: 사용자 myWiki 이미지 검색·분류에 활용 가능 (Memory MCP + CLIP 결합)

### 🟡 장기 (1분기+)
7. **AI 비디오 생성 컨설팅 사업**: 광고·교육·마케팅 시장 진입 후보 (Stage 5 가능성)
8. **Diffusion 물리 연결**: "물리학과 AI의 통합" 강의 콘텐츠 후보 (호오컨설팅 강연 후보)

### 시리즈 통합 가치
- 본 영상은 **시리즈 마무리 + 다음 단계** 성격
- Chapter 1~7이 LLM 중심이라면, 본 영상은 **다른 모달리티 (이미지·비디오)**로의 확장
- 비디오 길이 37분 = 시리즈 중 가장 김 (그러나 토이 예제 + 시각화로 따라가기 쉬움)

---

*상세 분석 생성일: 2026-05-06*
