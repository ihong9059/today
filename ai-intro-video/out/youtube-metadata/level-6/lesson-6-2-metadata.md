# Lesson 6-2: RNN 기본 구조 - YouTube 메타데이터

## 제목
[AI 강의] 6-2. RNN 기본 구조 - 은닉 상태, 시간 펼치기, PyTorch nn.RNN 구현

## 설명
RNN(Recurrent Neural Network)의 기본 구조를 배워봅니다. 순환 구조, 은닉 상태, 시간 펼치기 개념을 이해하고 PyTorch로 직접 구현해봅니다.

📚 이번 강의 내용:
- RNN이란? 기존 신경망과의 차이점
- 순환 구조와 파라미터 공유
- 은닉 상태(Hidden State)의 역할
- 은닉 상태 계산 공식: h_t = tanh(W_hh·h_{t-1} + W_xh·x_t + b)
- 시간 펼치기(Unfolding) 개념
- PyTorch nn.RNN 구현
- 다양한 RNN 구조: One-to-Many, Many-to-One, Many-to-Many
- 양방향 RNN (Bidirectional RNN)

🔧 핵심 코드:
- nn.RNN(input_size, hidden_size, num_layers)
- output, hidden = rnn(x, h0)
- 은닉 상태 초기화: h0 = torch.zeros(num_layers, batch, hidden_size)
- 양방향 설정: nn.RNN(bidirectional=True)

💡 핵심 개념:
- 은닉 상태: 이전 시점 정보를 기억하는 메모리
- 파라미터 공유: 모든 시점에서 동일한 가중치 사용
- 시간 펼치기: 순환 구조를 시간축으로 펼쳐서 이해
- 역전파: BPTT(Backpropagation Through Time)

🔗 다음 강의 예고:
- RNN의 한계: 기울기 소실, 장기 의존성 문제
- 해결책: LSTM, GRU

#AI #딥러닝 #RNN #PyTorch #은닉상태 #HiddenState #시퀀스모델 #순환신경망 #머신러닝 #인공지능 #파이토치강의

## 태그
AI, 딥러닝, RNN, Recurrent Neural Network, 순환신경망, Hidden State, 은닉상태, 시간펼치기, Unfolding, PyTorch, nn.RNN, 시퀀스모델, Bidirectional, 양방향RNN, BPTT, 머신러닝, 인공지능, 파이토치

## 카테고리
교육 > 과학 기술

## 재생목록
AI 기초 교육 - Level 6: 시퀀스 모델 (RNN/LSTM)
