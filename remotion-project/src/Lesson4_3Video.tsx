import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
} from "remotion";

// Duration based on audio analysis
export const LESSON_4_3_DURATION = 8021;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 775 },
  preprocessing: { start: 775, duration: 1374 },
  embedding: { start: 2149, duration: 1138 },
  lstm: { start: 3287, duration: 1333 },
  model: { start: 4620, duration: 1109 },
  training: { start: 5729, duration: 1091 },
  outro: { start: 6820, duration: 1201 },
};

// Level 4 Color scheme - Orange
const COLORS = {
  primary: "#f97316",
  secondary: "#ea580c",
  accent: "#fbbf24",
  dark: "#1a1a2e",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)",
};

// Global Overlay Component
const GlobalOverlay: React.FC = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          display: "flex",
          alignItems: "center",
          gap: 15,
          zIndex: 100,
        }}
      >
        <Img
          src={staticFile("images/logo.png")}
          style={{ width: 50, height: 50, borderRadius: 8 }}
        />
        <span
          style={{
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 600,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          UTTEC-Lab
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          zIndex: 100,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: 20,
            fontWeight: 500,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          ai.uttec-lab.com
        </span>
      </div>
    </>
  );
};

// Animated title
const AnimatedTitle: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const y = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 100 } });
  const translateY = interpolate(y, [0, 1], [30, 0]);

  return <div style={{ opacity, transform: `translateY(${translateY}px)` }}>{children}</div>;
};

// Scene 1: Intro
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-3/scene1_intro.mp3")} />

      <div style={{ textAlign: "center", opacity: titleOpacity }}>
        <div style={{ fontSize: 40, color: COLORS.light, marginBottom: 20 }}>Level 4 - Lesson 3</div>
        <div
          style={{
            fontSize: 90,
            fontWeight: "bold",
            color: COLORS.light,
            marginBottom: 30,
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          📝 텍스트 분류
        </div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>Sentiment Analysis with LSTM</div>

        <AnimatedTitle delay={60}>
          <div
            style={{
              marginTop: 80,
              display: "flex",
              gap: 30,
              justifyContent: "center",
            }}
          >
            {["토큰화", "임베딩", "LSTM"].map((item) => (
              <div
                key={item}
                style={{
                  padding: "15px 40px",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 50,
                  fontSize: 28,
                  color: COLORS.light,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </AnimatedTitle>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Text Preprocessing
const Scene2Preprocessing: React.FC = () => {
  const frame = useCurrentFrame();

  const steps = [
    { num: "1️⃣", name: "토큰화", desc: "문장 → 단어", ex: '"This movie is great!" → ["this", "movie", "is", "great", "!"]' },
    { num: "2️⃣", name: "인덱싱", desc: "단어 → 숫자", ex: '["this", "movie", ...] → [42, 156, 11, 89]' },
    { num: "3️⃣", name: "임베딩", desc: "숫자 → 벡터", ex: "[42, 156, ...] → [[0.2, -0.1, ...], [0.8, 0.3, ...]]" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-3/scene2_preprocessing.mp3")} />

      <div style={{ padding: 80 }}>
        <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.primary, marginBottom: 50 }}>
          🔄 텍스트 → 숫자 변환 과정
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {steps.map((step, i) => {
            const delay = 60 + i * 90;
            const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
            return (
              <div
                key={step.name}
                style={{
                  display: "flex",
                  gap: 30,
                  background: "rgba(249,115,22,0.1)",
                  borderRadius: 20,
                  padding: 30,
                  borderLeft: `5px solid ${COLORS.primary}`,
                  opacity,
                  transform: `translateX(${(1 - opacity) * -50}px)`,
                }}
              >
                <div style={{ fontSize: 50 }}>{step.num}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 32, color: COLORS.accent, marginBottom: 10 }}>{step.name}</div>
                  <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 10 }}>{step.desc}</div>
                  <div
                    style={{
                      fontSize: 20,
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "monospace",
                      background: "rgba(0,0,0,0.3)",
                      padding: 15,
                      borderRadius: 10,
                    }}
                  >
                    {step.ex}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Embedding
const Scene3Embedding: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-3/scene3_embedding.mp3")} />

      <div style={{ padding: 80 }}>
        <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.primary, marginBottom: 50, textAlign: "center" }}>
          🎯 임베딩 (Embedding)
        </div>

        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "#2d2d44", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 20 }}>숫자 인덱스 vs 의미 벡터</div>
              <div style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 30 }}>
                <div style={{ fontSize: 60, color: "#ff6b6b" }}>42</div>
                <div style={{ fontSize: 40, color: COLORS.primary }}>→</div>
                <div style={{ fontSize: 24, color: "#4ade80", fontFamily: "monospace" }}>[0.2, -0.1, 0.5, ...]</div>
              </div>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
                숫자 42는 의미 정보가 없음
                <br />
                벡터는 단어의 의미를 담고 있음
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ background: "#2d2d44", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 20 }}>비슷한 단어 = 비슷한 벡터</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 30,
                }}
              >
                <div
                  style={{
                    padding: "15px 30px",
                    background: COLORS.gradient,
                    borderRadius: 15,
                    fontSize: 28,
                    color: COLORS.light,
                  }}
                >
                  good
                </div>
                <div style={{ fontSize: 30, color: "#4ade80" }}>≈</div>
                <div
                  style={{
                    padding: "15px 30px",
                    background: COLORS.gradient,
                    borderRadius: 15,
                    fontSize: 28,
                    color: COLORS.light,
                  }}
                >
                  great
                </div>
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: "#4ade80",
                  fontFamily: "monospace",
                  background: "rgba(0,0,0,0.3)",
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                nn.Embedding(10000, 128)
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: LSTM
const Scene4LSTM: React.FC = () => {
  const frame = useCurrentFrame();

  const gates = [
    { icon: "📝", name: "셀 상태", desc: "장기 기억 저장소" },
    { icon: "🗑️", name: "망각 게이트", desc: "불필요한 정보 삭제" },
    { icon: "✍️", name: "입력 게이트", desc: "새 정보 저장 결정" },
    { icon: "📤", name: "출력 게이트", desc: "필요한 정보 출력" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-3/scene4_lstm.mp3")} />

      <div style={{ padding: 80 }}>
        <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.primary, marginBottom: 30 }}>🧠 LSTM</div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.8)", marginBottom: 20 }}>
            RNN 문제: 긴 문장 앞부분을 까먹음 (기울기 소실)
          </div>
          <div style={{ fontSize: 28, color: "#4ade80" }}>LSTM 해결: 수첩에 중요한 정보를 적어둔다 📓</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          {gates.map((gate, i) => {
            const delay = 90 + i * 60;
            const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
            return (
              <div
                key={gate.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  background: "rgba(249,115,22,0.15)",
                  borderRadius: 20,
                  padding: 30,
                  opacity,
                  transform: `scale(${0.9 + opacity * 0.1})`,
                }}
              >
                <div style={{ fontSize: 50 }}>{gate.icon}</div>
                <div>
                  <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 5 }}>{gate.name}</div>
                  <div style={{ fontSize: 22, color: COLORS.light }}>{gate.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Model Structure
const Scene5Model: React.FC = () => {
  const frame = useCurrentFrame();

  const layers = [
    { name: "Embedding", desc: "단어 → 벡터", color: "#3b82f6" },
    { name: "LSTM", desc: "순서 정보 활용", color: "#8b5cf6" },
    { name: "Linear", desc: "긍정/부정 분류", color: "#22c55e" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-3/scene5_model.mp3")} />

      <div style={{ padding: 80 }}>
        <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.primary, marginBottom: 50, textAlign: "center" }}>
          🏗️ 감성 분석 모델 구조
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
          {layers.map((layer, i) => {
            const delay = 30 + i * 60;
            const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
            return (
              <React.Fragment key={layer.name}>
                <div
                  style={{
                    textAlign: "center",
                    opacity,
                    transform: `translateY(${(1 - opacity) * 30}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 200,
                      height: 150,
                      background: `linear-gradient(135deg, ${layer.color}, ${layer.color}88)`,
                      borderRadius: 20,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 15,
                    }}
                  >
                    <div style={{ fontSize: 28, color: COLORS.light, fontWeight: "bold" }}>{layer.name}</div>
                  </div>
                  <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)" }}>{layer.desc}</div>
                </div>
                {i < layers.length - 1 && (
                  <div style={{ fontSize: 40, color: COLORS.primary, opacity }}>→</div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 60,
            textAlign: "center",
            padding: 30,
            background: "rgba(249,115,22,0.1)",
            borderRadius: 20,
          }}
        >
          <div style={{ fontSize: 24, color: COLORS.light }}>
            + Dropout (0.3) 으로 과적합 방지
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Training
const Scene6Training: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-3/scene6_training.mp3")} />

      <div style={{ padding: 80 }}>
        <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.primary, marginBottom: 50 }}>📊 모델 학습</div>

        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "#2d2d44", borderRadius: 20, padding: 40, marginBottom: 30 }}>
              <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 20 }}>데이터 구성</div>
              <div style={{ fontSize: 24, color: COLORS.light, lineHeight: 2 }}>
                📄 텍스트: 영화 리뷰
                <br />
                ✅ 라벨: 긍정(1) / 부정(0)
              </div>
            </div>

            <div style={{ background: "#2d2d44", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 20 }}>학습 설정</div>
              <div style={{ fontSize: 22, color: "#4ade80", fontFamily: "monospace", lineHeight: 2 }}>
                손실: CrossEntropyLoss
                <br />
                최적화: Adam
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(249,115,22,0.3), rgba(234,88,12,0.2))",
                borderRadius: 20,
                padding: 40,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 32, color: COLORS.light, marginBottom: 30 }}>예상 정확도</div>
              <div style={{ fontSize: 80, fontWeight: "bold", color: "#4ade80" }}>85%+</div>
              <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginTop: 20 }}>
                몇 에폭 학습 후
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Outro
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-3/scene7_outro.mp3")} />

      <div style={{ textAlign: "center", padding: 80 }}>
        <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.light, marginBottom: 50 }}>📝 오늘 배운 내용</div>

        <div style={{ display: "flex", gap: 30, marginBottom: 50, opacity }}>
          {[
            { icon: "🔄", title: "전처리", desc: "토큰화→인덱싱→임베딩" },
            { icon: "🧠", title: "LSTM", desc: "장기 기억 처리" },
            { icon: "💬", title: "감성 분석", desc: "긍정/부정 분류" },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 20,
                padding: 30,
              }}
            >
              <div style={{ fontSize: 50, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 28, color: COLORS.light, fontWeight: "bold", marginBottom: 10 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.9)" }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <AnimatedTitle delay={120}>
          <div style={{ fontSize: 36, color: COLORS.light, marginBottom: 20 }}>다음 레슨: nn.Module 기초</div>
          <div style={{ fontSize: 50, color: COLORS.light }}>다음 시간에 만나요! 👋</div>
        </AnimatedTitle>
      </div>
    </AbsoluteFill>
  );
};

// Main Video Component
export const Lesson4_3Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <Scene1Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.preprocessing.start} durationInFrames={SCENE_TIMINGS.preprocessing.duration}>
        <Scene2Preprocessing />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.embedding.start} durationInFrames={SCENE_TIMINGS.embedding.duration}>
        <Scene3Embedding />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.lstm.start} durationInFrames={SCENE_TIMINGS.lstm.duration}>
        <Scene4LSTM />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.model.start} durationInFrames={SCENE_TIMINGS.model.duration}>
        <Scene5Model />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.training.start} durationInFrames={SCENE_TIMINGS.training.duration}>
        <Scene6Training />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <Scene7Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
