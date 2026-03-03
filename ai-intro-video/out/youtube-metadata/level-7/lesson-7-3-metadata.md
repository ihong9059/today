# Lesson 7-3: Multi-Head Attention - YouTube 메타데이터

## 제목
[AI 기초] 7-3. Multi-Head Attention - 여러 관점에서 정보 수집하기 | GPT-3는 96개 Head!

## 설명
Transformer의 표현력을 높이는 Multi-Head Attention을 배웁니다!
하나의 관점이 아닌 여러 관점에서 동시에 정보를 수집하는 방법을 알아봅니다.

📚 이 영상에서 배우는 내용:
- Multi-Head Attention 개념
- 단일 Head vs Multi-Head 비교
- Multi-Head 구조 (분기 → Attention → Concat)
- 차원 분할로 효율적 계산
- 각 Head의 역할 (자동 학습)
- PyTorch nn.MultiheadAttention 사용법
- 직접 구현하기 (텐서 reshape)
- Head 개수 선택 가이드

⏱️ 타임라인:
0:00 인트로 - Multi-Head 소개
0:33 단일 vs Multi-Head 비교
1:07 Multi-Head 구조
1:47 차원 분할
2:20 각 Head의 역할
2:53 PyTorch API 사용
3:32 직접 구현
4:12 Head 개수 선택
4:48 정리 및 다음 강의 예고

🔗 관련 영상:
- 이전: 7-2. Self-Attention
- 다음: 7-4. Positional Encoding

💻 PyTorch 사용법:
```python
import torch.nn as nn

attn = nn.MultiheadAttention(
    embed_dim=512,
    num_heads=8
)
output, weights = attn(query, key, value)
```

📖 핵심 공식:
MultiHead(Q,K,V) = Concat(head₁,...,headₕ)W^O

#AI기초 #MultiHeadAttention #Transformer #딥러닝 #파이토치 #GPT #BERT #어텐션 #자연어처리 #NLP

## 태그
AI기초, Multi-Head Attention, 멀티헤드어텐션, Transformer, 딥러닝, PyTorch, 파이토치, 자연어처리, NLP, GPT, BERT, 어텐션, 딥러닝 입문, AI 강의, 인공지능 기초, GPT-3

## 썸네일
out/thumbnails/lesson-7-3-thumbnail.png

## 카테고리
교육

## 재생목록
AI 기초 강의 - Level 7: Transformer & LLM 원리
