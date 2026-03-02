# Lesson 4-3: 텍스트 분류 - YouTube 메타데이터

## 제목
[AI 기초 4-3] 텍스트 분류 - PyTorch nn.Embedding으로 감성 분석하기 | 토큰화, 임베딩, BCELoss

## 설명
```
🎯 이번 강의 목표
- 텍스트 데이터를 숫자로 변환하는 방법 이해
- 토큰화, 어휘 사전, 정수 인코딩 과정 학습
- nn.Embedding으로 단어를 밀집 벡터로 변환
- 평균 풀링 기반 텍스트 분류 모델 구현
- BCELoss로 이진 분류 학습

📚 학습 내용
00:00 인트로 - 텍스트 분류란?
00:27 텍스트 → 숫자 변환 (토큰화, 어휘 사전, 정수 인코딩)
01:03 원핫 인코딩의 한계와 단어 임베딩
01:35 텍스트 분류 모델 구조 (임베딩 → 평균 풀링 → 분류기)
02:07 PyTorch TextClassifier 코드
02:35 학습 및 예측 결과
03:05 정리 및 다음 강의 예고

🔗 관련 링크
- GitHub 실습 코드: [링크 추가 예정]
- 이전 강의: [AI 기초 4-2] 이미지 분류 CNN
- 다음 강의: [AI 기초 4-4] nn.Module 기초

📖 핵심 개념
1. 토큰화 (Tokenization): 문장을 단어 단위로 분리
2. 어휘 사전 (Vocabulary): 단어 → 고유 정수 매핑
3. 정수 인코딩: 문장을 정수 시퀀스로 변환
4. 단어 임베딩: 정수를 밀집 벡터(128차원)로 변환
5. nn.Embedding: PyTorch 임베딩 레이어
6. 평균 풀링: 단어 벡터들의 평균으로 문장 벡터 생성
7. BCELoss: 이진 분류용 손실 함수

💻 예제 코드
```python
import torch
import torch.nn as nn

class TextClassifier(nn.Module):
    def __init__(self, vocab_size, embed_dim):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.fc = nn.Linear(embed_dim, 1)

    def forward(self, x):
        embedded = self.embedding(x)
        pooled = embedded.mean(dim=1)  # 평균 풀링
        return torch.sigmoid(self.fc(pooled))

# 사용 예시
model = TextClassifier(vocab_size=5000, embed_dim=128)
criterion = nn.BCELoss()
```

#AI교육 #딥러닝 #PyTorch #텍스트분류 #감성분석 #NLP #자연어처리 #임베딩 #Embedding #인공지능기초
```

## 태그
AI, 인공지능, 딥러닝, Deep Learning, PyTorch, 파이토치, 텍스트분류, Text Classification, 감성분석, Sentiment Analysis, NLP, 자연어처리, 임베딩, Embedding, nn.Embedding, 토큰화, Tokenization, BCELoss, 이진분류, 신경망, 머신러닝, Machine Learning, AI기초, AI입문

## 카테고리
교육

## 썸네일
out/thumbnails/level-4/lesson-4-3-thumbnail.png

## 영상 길이
약 3분 38초 (6548 프레임 @ 30fps)
