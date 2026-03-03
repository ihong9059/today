# Lesson 7-1: Attention 메커니즘 - YouTube 메타데이터

## 제목
[AI 기초] 7-1. Attention 메커니즘 - Query, Key, Value의 모든 것 | Transformer 핵심 원리

## 설명
Transformer의 핵심인 Attention 메커니즘을 완전히 이해합니다!
GPT, BERT 등 현대 AI의 기반이 되는 Attention의 원리를 직관적으로 배웁니다.

📚 이 영상에서 배우는 내용:
- Attention이란 무엇인가
- Query, Key, Value 개념 (검색 엔진 비유)
- Q, K, V 생성 방법 (가중치 행렬 W_Q, W_K, W_V)
- Attention Score 계산 (내적 + 스케일링)
- Softmax와 가중 합산 (Context Vector)
- Scaled Dot-Product Attention 공식
- Attention의 3가지 장점 (장거리 의존성, 병렬 처리, 해석 가능성)
- PyTorch로 직접 구현하기

⏱️ 타임라인:
0:00 인트로 - RNN의 한계와 Attention
0:54 Q, K, V 개념 이해하기
1:43 가중치 행렬로 Q, K, V 생성
2:39 Attention Score 계산
3:28 Softmax와 가중 합산
4:16 전체 공식 정리
5:06 Attention의 장점
5:55 PyTorch 구현
6:48 정리 및 다음 강의 예고

🔗 관련 영상:
- 이전: 6-7. 감성 분석 구현
- 다음: 7-2. Self-Attention - 자기 자신을 참조하기

💻 실습 코드:
```python
class ScaledDotProductAttention(nn.Module):
    def forward(self, Q, K, V):
        d_k = K.size(-1)
        scores = torch.matmul(Q, K.transpose(-2, -1))
        scores = scores / math.sqrt(d_k)
        attn_weights = F.softmax(scores, dim=-1)
        output = torch.matmul(attn_weights, V)
        return output
```

📖 핵심 공식:
Attention(Q, K, V) = softmax(QK^T / √d_k) · V

#AI기초 #Attention #Transformer #Query #Key #Value #딥러닝 #파이토치 #GPT #BERT #자연어처리 #NLP

## 태그
AI기초, Attention, Attention 메커니즘, Query Key Value, QKV, Transformer, Scaled Dot-Product Attention, 딥러닝, PyTorch, 파이토치, 자연어처리, NLP, GPT, BERT, 어텐션, 셀프어텐션, 딥러닝 입문, AI 강의, 인공지능 기초

## 썸네일
out/thumbnails/lesson-7-1-thumbnail.png

## 카테고리
교육

## 재생목록
AI 기초 강의 - Level 7: Transformer & LLM 원리
