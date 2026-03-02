# Lesson 4-6: 학습 루프 - YouTube 메타데이터

## 영상 정보
- **레벨**: Level 4 - PyTorch 실전
- **레슨 번호**: 4-6
- **주제**: 학습 루프 (Training Loop)
- **길이**: 약 3분 34초 (6407 프레임 @ 30fps)

## 제목
```
[AI 기초] 4-6. PyTorch 학습 루프 완벽 마스터 - forward, backward, optimizer.step()
```

## 설명
```
PyTorch에서 모델을 학습시키는 Training Loop를 완벽하게 이해합니다.

📚 이번 강의에서 배우는 내용:
• 학습 루프의 기본 구조 - 에폭과 배치의 이중 반복문
• 순전파 (Forward Pass) - model(inputs), criterion(outputs, labels)
• 역전파 핵심 3줄 - zero_grad(), backward(), step()
• 검증 루프 - eval(), no_grad(), train()
• 학습 모니터링 - Loss curve, 과적합 감지

🎯 핵심 코드 (역전파 3줄):
```python
optimizer.zero_grad()  # 기울기 초기화
loss.backward()        # 역전파 수행
optimizer.step()       # 가중치 업데이트
```

📊 학습 과정:
Data → Forward → Loss → Backward → Update → 반복!

💡 실무 팁:
• eval() 모드로 Dropout/BatchNorm 비활성화
• torch.no_grad()로 메모리 절약
• Early Stopping으로 과적합 방지
• TensorBoard/Wandb로 실시간 모니터링

🔗 시리즈 정보:
Level 4: PyTorch 실전 (6/8)
- 4-1: MNIST 손글씨 분류
- 4-2: 이미지 분류 CNN
- 4-3: 텍스트 분류
- 4-4: nn.Module 기초
- 4-5: 데이터 로딩
- 4-6: 학습 루프 ← 현재 강의
- 4-7: 모델 저장과 로드
- 4-8: 전이학습

#PyTorch #딥러닝 #TrainingLoop #역전파 #optimizer #AI기초 #머신러닝
```

## 태그
```
PyTorch, 파이토치, 학습루프, TrainingLoop, 역전파, backward, optimizer, zero_grad, step, forward, 손실함수, CrossEntropyLoss, 검증, eval, no_grad, 딥러닝, AI기초, 머신러닝, 에폭, 배치
```

## 썸네일 텍스트
```
학습 루프
순전파 → 손실 → 역전파
zero_grad → backward → step
```

## 출력 파일
- **영상**: `out/lessons/level-4/lesson-4-6.mp4`
- **썸네일**: `out/thumbnails/level-4/lesson-4-6-thumbnail.png`

## 재생목록
- AI 기초 교육 시리즈
- Level 4: PyTorch 실전

## 카테고리
교육 > 프로그래밍
