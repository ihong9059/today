# Lesson 6-4: LSTM - YouTube 메타데이터

## 제목
[AI 강의] 6-4. LSTM 완벽 정복 - 게이트 구조, 셀 상태, 장기 기억 | PyTorch nn.LSTM

## 설명
LSTM(Long Short-Term Memory)의 내부 구조를 완벽하게 이해합니다. 게이트 메커니즘과 셀 상태를 통해 장기 의존성 문제를 해결하는 방법을 배웁니다.

📚 이번 강의 내용:
- LSTM 소개: RNN의 기울기 소실 문제 해결
- 셀 상태(Cell State): 정보 고속도로, 장기 기억
- 망각 게이트(Forget Gate): 불필요한 정보 제거
- 입력 게이트(Input Gate): 새로운 정보 선택적 저장
- 셀 상태 업데이트: C_t = f_t ⊙ C_{t-1} + i_t ⊙ C̃_t
- 출력 게이트(Output Gate): 필요한 정보만 출력
- PyTorch nn.LSTM 구현
- LSTM 분류 모델 만들기

🔧 핵심 코드:
- lstm = nn.LSTM(input_size=10, hidden_size=20, num_layers=2)
- output, (h_n, c_n) = lstm(input, (h_0, c_0))
- h_n: 마지막 은닉 상태, c_n: 마지막 셀 상태
- bidirectional=True로 양방향 LSTM

💡 LSTM의 핵심:
- 셀 상태: 덧셈 연산으로 기울기 유지
- 3개의 게이트: Forget, Input, Output
- 장기/단기 기억 분리: C_t vs h_t
- 선택적 기억: 필요한 정보만 저장/출력

🔗 다음 강의 예고:
- GRU (Gated Recurrent Unit)
- LSTM을 간소화한 구조

#AI #딥러닝 #LSTM #PyTorch #RNN #시퀀스모델 #자연어처리 #게이트 #셀상태 #머신러닝 #인공지능 #파이토치강의

## 태그
AI, 딥러닝, LSTM, Long Short-Term Memory, PyTorch, RNN, 게이트, Forget Gate, Input Gate, Output Gate, Cell State, 셀상태, 시퀀스모델, 자연어처리, 감성분석, nn.LSTM, 장기의존성, 기울기소실, 머신러닝, 인공지능, 파이토치

## 카테고리
교육 > 과학 기술

## 재생목록
AI 기초 교육 - Level 6: 시퀀스 모델 (RNN/LSTM)
