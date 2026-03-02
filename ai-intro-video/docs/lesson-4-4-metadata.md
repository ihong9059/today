# Lesson 4-4: nn.Module 기초 - YouTube 메타데이터

## 제목
[AI 기초 4-4] nn.Module 기초 - PyTorch 커스텀 모델 만들기 | __init__, forward, parameters()

## 설명
```
🎯 이번 강의 목표
- nn.Module의 역할과 계층 구조 이해
- __init__ 메서드에서 레이어 정의하기
- forward 메서드로 순전파 구현하기
- parameters()와 named_parameters()로 파라미터 관리
- nn.Sequential로 간단한 모델 구성하기

📚 학습 내용
00:00 인트로 - nn.Module이란?
00:28 nn.Module 계층 구조
01:06 __init__ 메서드와 super().__init__()
01:41 forward 메서드 구현
02:20 파라미터 관리 (parameters, named_parameters)
03:02 nn.Sequential 사용법
03:35 정리 및 다음 강의 예고

🔗 관련 링크
- GitHub 실습 코드: [링크 추가 예정]
- 이전 강의: [AI 기초 4-3] 텍스트 분류
- 다음 강의: [AI 기초 4-5] 모델 저장과 로드

📖 핵심 개념
1. nn.Module: PyTorch 모든 신경망의 기본 클래스
2. __init__(): 레이어 정의, super().__init__() 필수
3. forward(): 순전파 정의, model(x)로 호출
4. parameters(): 학습 가능한 파라미터 순회
5. named_parameters(): 이름과 함께 파라미터 확인
6. nn.Sequential: 레이어 순차 연결

💻 예제 코드
```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class MLP(nn.Module):
    def __init__(self):
        super().__init__()  # 필수!
        self.fc1 = nn.Linear(784, 256)
        self.fc2 = nn.Linear(256, 128)
        self.fc3 = nn.Linear(128, 10)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        return self.fc3(x)

# 파라미터 개수 확인
model = MLP()
total_params = sum(p.numel() for p in model.parameters())
print(f"총 파라미터: {total_params:,}")
```

#AI교육 #딥러닝 #PyTorch #nnModule #신경망 #커스텀모델 #forward #파라미터 #인공지능기초
```

## 태그
AI, 인공지능, 딥러닝, Deep Learning, PyTorch, 파이토치, nn.Module, 신경망, Neural Network, 커스텀모델, Custom Model, forward, __init__, parameters, named_parameters, nn.Sequential, 모델구현, 머신러닝, Machine Learning, AI기초, AI입문

## 카테고리
교육

## 썸네일
out/thumbnails/level-4/lesson-4-4-thumbnail.png

## 영상 길이
약 4분 7초 (7389 프레임 @ 30fps)
