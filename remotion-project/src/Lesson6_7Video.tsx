import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_6_7_DURATION = 5286;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 841 },
  data: { start: 841, duration: 719 },
  model: { start: 1560, duration: 690 },
  training: { start: 2250, duration: 735 },
  code: { start: 2985, duration: 779 },
  result: { start: 3764, duration: 766 },
  outro: { start: 4530, duration: 756 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#06b6d4",
  secondary: "#0891b2",
  accent: "#0e7490",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
};

const GlobalOverlay: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 12, zIndex: 100 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 50, height: 50, borderRadius: 8 }} />
      <span style={{ color: COLORS.light, fontSize: 24, fontWeight: 700, fontFamily: "Pretendard, sans-serif" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, right: 40, color: "rgba(255,255,255,0.6)", fontSize: 20, fontFamily: "Pretendard, sans-serif", zIndex: 100 }}>
      ai.uttec-lab.com
    </div>
  </>
);

const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);
  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-7/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>😊</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>감성 분석 구현</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>LSTM으로 감정 분류하기</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 6-7
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneData: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-7/data.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>데이터 준비</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>IMDB 데이터셋</h2>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>영화 리뷰 50,000개</li>
              <li>긍정 25,000 / 부정 25,000</li>
              <li>이진 분류 문제</li>
            </ul>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>전처리 과정</h2>
            <div style={{ display: "grid", gap: 15 }}>
              {["토큰화", "정수 인코딩", "패딩 적용", "데이터 분할"].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <div style={{ width: 40, height: 40, background: COLORS.primary, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", color: COLORS.light, fontWeight: 700 }}>{i+1}</div>
                  <span style={{ fontSize: 22, color: COLORS.light }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneModel: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-7/model.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>모델 구조</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
        {[
          { name: "Embedding", desc: "단어 → 벡터", color: "#22c55e" },
          { name: "LSTM", desc: "시퀀스 처리", color: "#3b82f6" },
          { name: "FC Layer", desc: "분류 레이어", color: "#f97316" },
          { name: "Sigmoid", desc: "확률 출력", color: "#ef4444" },
        ].map((layer, i) => (
          <React.Fragment key={i}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 140, height: 100, background: layer.color, borderRadius: 15, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.light }}>{layer.name}</div>
              </div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>{layer.desc}</div>
            </div>
            {i < 3 && <div style={{ fontSize: 40, color: COLORS.primary }}>→</div>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: 50, display: "flex", justifyContent: "center", gap: 40 }}>
        <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 15, padding: 25 }}>
          <div style={{ fontSize: 22, color: COLORS.primary, fontWeight: 600 }}>입력</div>
          <div style={{ fontSize: 20, color: COLORS.light }}>[Batch, Seq_len]</div>
        </div>
        <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 15, padding: 25 }}>
          <div style={{ fontSize: 22, color: COLORS.primary, fontWeight: 600 }}>출력</div>
          <div style={{ fontSize: 20, color: COLORS.light }}>[Batch, 1] (0~1)</div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneTraining: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-7/training.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>학습 설정</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        {[
          { title: "손실 함수", value: "BCELoss", desc: "이진 분류용" },
          { title: "옵티마이저", value: "Adam", desc: "적응적 학습률" },
          { title: "배치 크기", value: "64", desc: "효율적인 학습" },
          { title: "에포크", value: "5~10", desc: "과적합 방지" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(6,182,212,0.1)", borderRadius: 20, padding: 30, border: `2px solid ${COLORS.primary}` }}>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.6)", marginBottom: 10 }}>{item.title}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.primary, marginBottom: 10 }}>{item.value}</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, textAlign: "center", fontSize: 22, color: "rgba(255,255,255,0.7)" }}>
        검증 데이터로 과적합 모니터링
      </div>
    </div>
  </AbsoluteFill>
);

const SceneCode: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-7/code.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>핵심 코드</h1>
      <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 40, fontFamily: "monospace" }}>
        <div style={{ fontSize: 20, color: "#22c55e", marginBottom: 10 }}>class SentimentLSTM(nn.Module):</div>
        <div style={{ fontSize: 18, color: COLORS.light, marginLeft: 30, marginBottom: 5 }}>def __init__(self, vocab_size, embed_dim, hidden_dim):</div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginLeft: 60, marginBottom: 5 }}>self.embedding = nn.Embedding(vocab_size, embed_dim)</div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginLeft: 60, marginBottom: 5 }}>self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)</div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginLeft: 60, marginBottom: 15 }}>self.fc = nn.Linear(hidden_dim, 1)</div>
        <div style={{ fontSize: 18, color: COLORS.light, marginLeft: 30, marginBottom: 5 }}>def forward(self, x):</div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginLeft: 60, marginBottom: 5 }}>x = self.embedding(x)</div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginLeft: 60, marginBottom: 5 }}>_, (hidden, _) = self.lstm(x)</div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginLeft: 60 }}>return torch.sigmoid(self.fc(hidden[-1]))</div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneResult: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-7/result.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>결과 및 개선</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(34,197,94,0.2)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: "#22c55e", marginBottom: 20 }}>기본 성능</h2>
            <div style={{ fontSize: 60, fontWeight: 800, color: "#22c55e", marginBottom: 15 }}>~85%</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>정확도 달성</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>성능 향상 방법</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                "양방향 LSTM 사용",
                "사전학습 임베딩",
                "Dropout 적용",
                "레이어 수 조정"
              ].map((tip, i) => (
                <div key={i} style={{ background: "rgba(6,182,212,0.2)", padding: 15, borderRadius: 10, fontSize: 20, color: COLORS.light }}>
                  ✓ {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-7/outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>Level 6 완료!</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "시퀀스 데이터", desc: "순서가 중요한 데이터 이해" },
          { title: "RNN/LSTM/GRU", desc: "순환 신경망 구조와 원리" },
          { title: "양방향 RNN", desc: "과거와 미래 정보 활용" },
          { title: "Seq2Seq", desc: "시퀀스 변환 모델" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        다음 레벨: <span style={{ fontWeight: 700 }}>Attention과 Transformer</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson6_7Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.data.start} durationInFrames={SCENE_TIMINGS.data.duration}><SceneData /></Sequence>
    <Sequence from={SCENE_TIMINGS.model.start} durationInFrames={SCENE_TIMINGS.model.duration}><SceneModel /></Sequence>
    <Sequence from={SCENE_TIMINGS.training.start} durationInFrames={SCENE_TIMINGS.training.duration}><SceneTraining /></Sequence>
    <Sequence from={SCENE_TIMINGS.code.start} durationInFrames={SCENE_TIMINGS.code.duration}><SceneCode /></Sequence>
    <Sequence from={SCENE_TIMINGS.result.start} durationInFrames={SCENE_TIMINGS.result.duration}><SceneResult /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
