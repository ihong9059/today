# Lesson 6-6: 텍스트 전처리 - YouTube 메타데이터

## 제목
[AI 강의] 6-6. 텍스트 전처리 완벽 가이드 - 토큰화, 임베딩, 패딩 | PyTorch NLP 기초

## 설명
텍스트 데이터를 딥러닝 모델에 입력하기 위한 전처리 파이프라인을 완벽하게 이해합니다. 토큰화부터 임베딩, 패딩까지 실전 구현 방법을 배웁니다.

📚 이번 강의 내용:
- 텍스트 전처리 개요: 왜 전처리가 필요한가?
- 토큰화(Tokenization): 공백 분리, 형태소 분석, 서브워드
- 어휘 사전(Vocabulary): 토큰 → 인덱스 매핑
- 임베딩(Embedding): nn.Embedding, 밀집 벡터 변환
- 워드 임베딩의 의미: King - Man + Woman = Queen
- 패딩(Padding): pad_sequence, 배치 처리
- PyTorch 파이프라인: Dataset, DataLoader, collate_fn
- 텍스트 분류 모델 구현

🔧 핵심 코드:
- embedding = nn.Embedding(vocab_size, embed_dim)
- pad_sequence(sequences, batch_first=True)
- build_vocab_from_iterator(tokens)
- DataLoader(dataset, collate_fn=collate_fn)

💡 핵심 포인트:
- 토큰화: 문장을 작은 단위로 분리
- 임베딩: 인덱스를 의미 있는 벡터로 변환
- 패딩: 배치 처리를 위한 길이 통일
- 전처리 = NLP 모델의 기초!

🔗 다음 강의 예고:
- Seq2Seq 모델
- 인코더-디코더 구조

#AI #딥러닝 #NLP #PyTorch #텍스트전처리 #토큰화 #임베딩 #패딩 #자연어처리 #머신러닝 #인공지능 #파이토치강의

## 태그
AI, 딥러닝, NLP, 자연어처리, PyTorch, 텍스트전처리, Tokenization, 토큰화, Embedding, 임베딩, Padding, 패딩, nn.Embedding, Word2Vec, GloVe, 어휘사전, Vocabulary, 형태소분석, 서브워드, BPE, 머신러닝, 인공지능, 파이토치

## 카테고리
교육 > 과학 기술

## 재생목록
AI 기초 교육 - Level 6: 시퀀스 모델 (RNN/LSTM)
