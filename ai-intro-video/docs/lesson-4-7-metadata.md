# Lesson 4-7: 모델 저장과 로드 - YouTube 메타데이터

## 영상 정보
- **레벨**: Level 4 - PyTorch 실전
- **레슨 번호**: 4-7
- **주제**: 모델 저장과 로드 (Model Save & Load)
- **길이**: 약 4분 17초 (7732 프레임 @ 30fps)

## 제목
```
[AI 기초] 4-7. PyTorch 모델 저장과 로드 완벽 가이드 - state_dict, checkpoint, TorchScript
```

## 설명
```
PyTorch에서 학습한 모델을 저장하고 불러오는 방법을 완벽하게 이해합니다.

📚 이번 강의에서 배우는 내용:
• state_dict 저장 - 가중치만 저장하는 권장 방식
• 전체 모델 저장 - 구조와 가중치 함께 저장 (편리하지만 주의 필요)
• 체크포인트 저장 - 에폭, 옵티마이저 상태 등 학습 전체 저장
• GPU ↔ CPU 디바이스 이동 - map_location, .to(device)
• 실무 팁 - 최고 성능 모델 저장, 주기적 체크포인트

🎯 핵심 코드:
```python
# 저장 (권장)
torch.save(model.state_dict(), 'model.pt')

# 로드
model.load_state_dict(torch.load('model.pt'))

# 체크포인트
torch.save({
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss,
}, 'checkpoint.pt')
```

📊 저장 방식 비교:
• state_dict: 가중치만, 호환성 좋음, 권장
• 전체 모델: 편리하지만 Pickle 의존
• 체크포인트: 학습 재개 가능

💡 실무 팁:
• 검증 손실 최소일 때 best_model.pt 저장
• N 에폭마다 체크포인트, 최근 K개만 유지
• 배포 시 model.eval() 필수
• TorchScript로 Python 없이 실행 가능

🔗 시리즈 정보:
Level 4: PyTorch 실전 (7/8)
- 4-1: MNIST 손글씨 분류
- 4-2: 이미지 분류 CNN
- 4-3: 텍스트 분류
- 4-4: nn.Module 기초
- 4-5: 데이터 로딩
- 4-6: 학습 루프
- 4-7: 모델 저장과 로드 ← 현재 강의
- 4-8: 전이학습

#PyTorch #딥러닝 #모델저장 #state_dict #checkpoint #TorchScript #AI기초 #머신러닝
```

## 태그
```
PyTorch, 파이토치, 모델저장, 모델로드, state_dict, checkpoint, 체크포인트, TorchScript, torch.save, torch.load, load_state_dict, 딥러닝, AI기초, 머신러닝, GPU, CPU, map_location
```

## 썸네일 텍스트
```
모델 저장과 로드
💾 Save → 📄 .pt → 📥 Load
state_dict / checkpoint / TorchScript
```

## 출력 파일
- **영상**: `out/lessons/level-4/lesson-4-7.mp4`
- **썸네일**: `out/thumbnails/level-4/lesson-4-7-thumbnail.png`

## 재생목록
- AI 기초 교육 시리즈
- Level 4: PyTorch 실전

## 카테고리
교육 > 프로그래밍
