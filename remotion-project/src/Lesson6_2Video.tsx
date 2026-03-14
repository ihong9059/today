import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";

// ===================== DURATION & TIMINGS =====================
export const LESSON_6_2_DURATION = 13118;

const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 929 },
  scene02_analogy: { start: 929, duration: 1161 },
  scene03_formula: { start: 2090, duration: 1495 },
  scene04_dimensions: { start: 3585, duration: 1290 },
  scene05_numpy_code: { start: 4875, duration: 1427 },
  scene06_parameter_sharing: { start: 6302, duration: 1558 },
  scene07_unfolding: { start: 7860, duration: 1434 },
  scene08_visualization: { start: 9294, duration: 1193 },
  scene09_architectures: { start: 10487, duration: 1359 },
  scene10_outro: { start: 11846, duration: 1272 },
};

// ===================== COLOR THEME (Cyan for Level 6) =====================
const COLORS = {
  background: "#0f172a",
  primary: "#06b6d4",
  secondary: "#0891b2",
  accent: "#22d3ee",
  light: "#ffffff",
  dark: "#164e63",
  gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
};

// ===================== ANIMATION HELPERS =====================
const fadeIn = (frame: number, delay = 0) =>
  interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: "clamp" });

const slideUp = (frame: number, delay = 0) =>
  interpolate(frame - delay, [0, 25], [40, 0], { extrapolateRight: "clamp" });

const scaleIn = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });

// ===================== ANIMATED BACKGROUND =====================
const AnimatedBackground: React.FC<{ variant?: "gradient" | "dark" }> = ({ variant = "gradient" }) => {
  const frame = useCurrentFrame();
  const gradientAngle = (frame * 0.3) % 360;

  if (variant === "dark") {
    return (
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, ${COLORS.dark} 0%, ${COLORS.background} 100%)`,
        }}
      />
    );
  }

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, ${COLORS.background} 0%, #1e3a5f 50%, ${COLORS.dark} 100%)`,
      }}
    />
  );
};

// ===================== GLOBAL OVERLAY =====================
const GlobalOverlay: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        top: 30,
        left: 40,
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 100,
      }}
    >
      <Img
        src={staticFile("images/logo.png")}
        style={{ width: 50, height: 50, borderRadius: 8 }}
      />
      <span
        style={{
          color: COLORS.light,
          fontSize: 24,
          fontWeight: 700,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        UTTEC-Lab
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(6, 182, 212, 0.9)",
        padding: "12px 30px",
        borderRadius: 25,
        zIndex: 100,
      }}
    >
      <span
        style={{
          color: COLORS.light,
          fontSize: 20,
          fontWeight: 600,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        http://uttec-ai.duckdns.org
      </span>
    </div>
  </>
);

// ===================== SCENE COMPONENTS =====================

// Scene 01: Intro
const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AnimatedBackground />
      <div style={{ textAlign: "center", padding: 60 }}>
        <div
          style={{
            opacity: fadeIn(frame),
            transform: `translateY(${slideUp(frame)}px) scale(${scaleIn(frame, fps)})`,
          }}
        >
          <h1 style={{ fontSize: 80, color: COLORS.primary, marginBottom: 20 }}>
            RNN의 구조와 동작 원리
          </h1>
        </div>
        <div
          style={{
            opacity: fadeIn(frame, 30),
            transform: `translateY(${slideUp(frame, 30)}px)`,
          }}
        >
          <p style={{ fontSize: 36, color: COLORS.light, marginBottom: 40 }}>
            메모장이 실제로 어떻게 작동하는지 알아봅시다!
          </p>
        </div>
        <div
          style={{
            opacity: fadeIn(frame, 60),
            transform: `translateY(${slideUp(frame, 60)}px)`,
            background: "rgba(6, 182, 212, 0.2)",
            padding: "30px 50px",
            borderRadius: 20,
            border: `2px solid ${COLORS.primary}`,
          }}
        >
          <p style={{ fontSize: 32, color: COLORS.accent, fontWeight: 600 }}>
            핵심: RNN은 같은 함수를 반복 적용하면서
          </p>
          <p style={{ fontSize: 32, color: COLORS.accent, fontWeight: 600 }}>
            이전 결과를 다음 입력에 전달하는 구조
          </p>
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 02: Analogy (Novel Reading)
const Scene02Analogy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pages = ["v1", "v2", "v3", "v4"];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AnimatedBackground variant="dark" />
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2
          style={{
            fontSize: 56,
            color: COLORS.primary,
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          비유: 소설을 읽는 사람
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            marginBottom: 40,
          }}
        >
          {pages.map((page, i) => {
            const delay = 30 + i * 25;
            return (
              <div
                key={i}
                style={{
                  opacity: fadeIn(frame, delay),
                  transform: `translateY(${slideUp(frame, delay)}px) scale(${scaleIn(frame, fps, delay)})`,
                  background: COLORS.dark,
                  padding: "30px 40px",
                  borderRadius: 15,
                  border: `2px solid ${COLORS.primary}`,
                }}
              >
                <p style={{ fontSize: 28, color: COLORS.accent }}>문장 {i + 1}</p>
                <p style={{ fontSize: 20, color: COLORS.light, marginTop: 10 }}>→</p>
                <p style={{ fontSize: 28, color: COLORS.light }}>메모장 {page}</p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 150),
            background: "rgba(6, 182, 212, 0.15)",
            padding: 30,
            borderRadius: 15,
          }}
        >
          <p style={{ fontSize: 30, color: COLORS.light }}>
            메모장 = <span style={{ color: COLORS.accent }}>Hidden State (은닉 상태)</span>
          </p>
          <p style={{ fontSize: 30, color: COLORS.light, marginTop: 10 }}>
            업데이트 규칙 = <span style={{ color: COLORS.accent }}>RNN 가중치</span>
          </p>
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 03: Formula
const Scene03Formula: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AnimatedBackground />
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 30,
            opacity: fadeIn(frame),
          }}
        >
          RNN의 핵심 공식
        </h2>

        <div
          style={{
            opacity: fadeIn(frame, 20),
            transform: `translateY(${slideUp(frame, 20)}px)`,
            background: "rgba(0, 0, 0, 0.5)",
            padding: "40px 60px",
            borderRadius: 20,
            border: `3px solid ${COLORS.primary}`,
            marginBottom: 40,
          }}
        >
          <p style={{ fontSize: 42, color: COLORS.accent, fontFamily: "monospace" }}>
            h_t = tanh(W_xh · x_t + W_hh · h_(t-1) + b_h)
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 1200 }}>
          {[
            { symbol: "x_t", desc: "현재 입력 (지금 읽은 단어)" },
            { symbol: "h_(t-1)", desc: "이전 은닉 상태 (이전 메모장)" },
            { symbol: "W_xh", desc: "입력→은닉 변환 가중치" },
            { symbol: "W_hh", desc: "은닉→은닉 연결 가중치" },
            { symbol: "tanh", desc: "활성화 함수 (-1 ~ +1)" },
            { symbol: "h_t", desc: "새로운 은닉 상태 (새 메모장)" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, 40 + i * 15),
                background: "rgba(6, 182, 212, 0.1)",
                padding: "15px 25px",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <span style={{ fontSize: 28, color: COLORS.accent, fontFamily: "monospace", minWidth: 100 }}>
                {item.symbol}
              </span>
              <span style={{ fontSize: 24, color: COLORS.light }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 04: Dimensions Table
const Scene04Dimensions: React.FC = () => {
  const frame = useCurrentFrame();

  const dimensions = [
    { symbol: "x_t", name: "현재 입력", role: "이번에 읽은 데이터", dim: "(input_size,)" },
    { symbol: "h_(t-1)", name: "이전 은닉", role: "지금까지의 요약", dim: "(hidden_size,)" },
    { symbol: "W_xh", name: "입력 가중치", role: "입력 → 은닉 변환", dim: "(hidden, input)" },
    { symbol: "W_hh", name: "순환 가중치", role: "이전 → 현재 연결", dim: "(hidden, hidden)" },
    { symbol: "b_h", name: "편향", role: "기본값 조정", dim: "(hidden_size,)" },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AnimatedBackground variant="dark" />
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          각 기호의 차원
        </h2>

        <div
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            borderRadius: 20,
            padding: 30,
            opacity: fadeIn(frame, 20),
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "100px 150px 250px 200px",
              gap: 10,
              marginBottom: 15,
            }}
          >
            {["기호", "이름", "역할", "차원"].map((header, i) => (
              <div
                key={i}
                style={{
                  fontSize: 24,
                  color: COLORS.accent,
                  fontWeight: 700,
                  padding: "10px 0",
                  borderBottom: `2px solid ${COLORS.primary}`,
                }}
              >
                {header}
              </div>
            ))}
          </div>

          {dimensions.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 150px 250px 200px",
                gap: 10,
                opacity: fadeIn(frame, 40 + i * 20),
                transform: `translateX(${interpolate(frame - 40 - i * 20, [0, 20], [30, 0], { extrapolateRight: "clamp" })}px)`,
              }}
            >
              <div style={{ fontSize: 22, color: COLORS.accent, padding: "12px 0", fontFamily: "monospace" }}>
                {row.symbol}
              </div>
              <div style={{ fontSize: 22, color: COLORS.light, padding: "12px 0" }}>{row.name}</div>
              <div style={{ fontSize: 20, color: COLORS.light, padding: "12px 0", opacity: 0.9 }}>{row.role}</div>
              <div style={{ fontSize: 20, color: "#67e8f9", padding: "12px 0", fontFamily: "monospace" }}>
                {row.dim}
              </div>
            </div>
          ))}
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 05: Numpy Code
const Scene05NumpyCode: React.FC = () => {
  const frame = useCurrentFrame();

  const codeLines = [
    "# 하이퍼파라미터",
    "input_size = 3",
    "hidden_size = 4",
    "seq_len = 5",
    "",
    "# 핵심 순전파 루프",
    "for t in range(seq_len):",
    "    h = np.tanh(",
    "        W_xh @ X[t] +",
    "        W_hh @ h +",
    "        b_h",
    "    )",
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AnimatedBackground />
      <div style={{ display: "flex", gap: 60, padding: 60, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: 48,
              color: COLORS.primary,
              marginBottom: 30,
              opacity: fadeIn(frame),
            }}
          >
            NumPy로 RNN 구현
          </h2>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              padding: 30,
              borderRadius: 15,
              fontFamily: "monospace",
              opacity: fadeIn(frame, 20),
            }}
          >
            {codeLines.map((line, i) => (
              <div
                key={i}
                style={{
                  fontSize: 22,
                  color: line.startsWith("#") ? "#6ee7b7" : COLORS.light,
                  opacity: fadeIn(frame, 30 + i * 8),
                  marginBottom: 4,
                  whiteSpace: "pre",
                }}
              >
                {line || "\u00A0"}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              opacity: fadeIn(frame, 100),
              background: "rgba(6, 182, 212, 0.15)",
              padding: 30,
              borderRadius: 15,
              border: `2px solid ${COLORS.primary}`,
            }}
          >
            <h3 style={{ fontSize: 32, color: COLORS.accent, marginBottom: 20 }}>핵심 포인트</h3>
            <p style={{ fontSize: 26, color: COLORS.light, marginBottom: 15 }}>
              • 같은 W를 매 시점에서 반복 사용
            </p>
            <p style={{ fontSize: 26, color: COLORS.light, marginBottom: 15 }}>
              • 이전 h가 다음 입력으로 전달
            </p>
            <p style={{ fontSize: 26, color: COLORS.accent, fontWeight: 600 }}>
              → 이것이 "순환(Recurrence)"!
            </p>
          </div>
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 06: Parameter Sharing
const Scene06ParameterSharing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { time: "t=0", formula: "h_0 = tanh(W_xh·x_0 + W_hh·h_init + b)" },
    { time: "t=1", formula: "h_1 = tanh(W_xh·x_1 + W_hh·h_0 + b)" },
    { time: "t=2", formula: "h_2 = tanh(W_xh·x_2 + W_hh·h_1 + b)" },
    { time: "t=3", formula: "h_3 = tanh(W_xh·x_3 + W_hh·h_2 + b)" },
  ];

  const benefits = [
    { title: "가변 길이 처리", desc: "5개든 500개든 같은 모델로!" },
    { title: "적은 파라미터", desc: "시점마다 별도 가중치 불필요" },
    { title: "위치 불변 학습", desc: "패턴이 어디든 동일 인식" },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AnimatedBackground variant="dark" />
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 30,
            opacity: fadeIn(frame),
          }}
        >
          파라미터 공유 (Parameter Sharing)
        </h2>

        <div style={{ display: "flex", gap: 40, justifyContent: "center", marginBottom: 40 }}>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              padding: 30,
              borderRadius: 15,
              opacity: fadeIn(frame, 20),
            }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 15,
                  opacity: fadeIn(frame, 40 + i * 20),
                }}
              >
                <span style={{ fontSize: 24, color: COLORS.accent, minWidth: 60 }}>{step.time}</span>
                <span style={{ fontSize: 20, color: COLORS.light, fontFamily: "monospace" }}>
                  {step.formula}
                </span>
              </div>
            ))}
            <div
              style={{
                opacity: fadeIn(frame, 130),
                color: COLORS.accent,
                fontSize: 26,
                marginTop: 20,
                fontWeight: 600,
              }}
            >
              ↑ 모두 같은 W_xh, W_hh 사용!
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {benefits.map((b, i) => (
              <div
                key={i}
                style={{
                  opacity: fadeIn(frame, 160 + i * 25),
                  transform: `scale(${scaleIn(frame, fps, 160 + i * 25)})`,
                  background: "rgba(6, 182, 212, 0.2)",
                  padding: "20px 30px",
                  borderRadius: 12,
                  border: `2px solid ${COLORS.primary}`,
                }}
              >
                <p style={{ fontSize: 26, color: COLORS.accent, fontWeight: 600, marginBottom: 8 }}>
                  {b.title}
                </p>
                <p style={{ fontSize: 22, color: COLORS.light }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 07: Time Unfolding
const Scene07Unfolding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AnimatedBackground />
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          시간 펼치기 (Time Unfolding)
        </h2>

        <div style={{ display: "flex", gap: 60, justifyContent: "center", alignItems: "center" }}>
          {/* Before Unfolding */}
          <div
            style={{
              opacity: fadeIn(frame, 20),
              background: "rgba(0, 0, 0, 0.4)",
              padding: 40,
              borderRadius: 20,
            }}
          >
            <h3 style={{ fontSize: 28, color: COLORS.accent, marginBottom: 30 }}>펼치기 전 (순환)</h3>
            <div
              style={{
                width: 200,
                height: 200,
                border: `4px solid ${COLORS.primary}`,
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <span style={{ fontSize: 32, color: COLORS.light }}>RNN Cell</span>
              {/* Loop arrow */}
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  right: 20,
                  fontSize: 40,
                  color: COLORS.accent,
                  transform: `rotate(${frame * 2}deg)`,
                }}
              >
                ↻
              </div>
            </div>
            <p style={{ fontSize: 20, color: COLORS.light, marginTop: 20 }}>h가 자기 자신에게 돌아감</p>
          </div>

          <div style={{ fontSize: 60, color: COLORS.primary, opacity: fadeIn(frame, 60) }}>→</div>

          {/* After Unfolding */}
          <div
            style={{
              opacity: fadeIn(frame, 80),
              background: "rgba(0, 0, 0, 0.4)",
              padding: 40,
              borderRadius: 20,
            }}
          >
            <h3 style={{ fontSize: 28, color: COLORS.accent, marginBottom: 30 }}>펼친 후 (시간축)</h3>
            <div style={{ display: "flex", gap: 15 }}>
              {[0, 1, 2, 3].map((t) => (
                <div
                  key={t}
                  style={{
                    opacity: fadeIn(frame, 100 + t * 15),
                    transform: `scale(${scaleIn(frame, fps, 100 + t * 15)})`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div style={{ fontSize: 20, color: COLORS.accent }}>x_{t}</div>
                  <div style={{ fontSize: 24 }}>↓</div>
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      border: `2px solid ${COLORS.primary}`,
                      borderRadius: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 14,
                      color: COLORS.light,
                    }}
                  >
                    RNN
                  </div>
                  <div style={{ fontSize: 24 }}>↓</div>
                  <div style={{ fontSize: 20, color: COLORS.light }}>h_{t}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 22, color: COLORS.accent, marginTop: 25, fontWeight: 600 }}>
              모든 블록이 같은 가중치 공유!
            </p>
          </div>
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 08: Visualization
const Scene08Visualization: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AnimatedBackground variant="dark" />
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          은닉 상태 변화 시각화
        </h2>

        <div
          style={{
            opacity: fadeIn(frame, 20),
            background: "rgba(0, 0, 0, 0.4)",
            padding: 40,
            borderRadius: 20,
            marginBottom: 30,
          }}
        >
          {/* Simulated graph */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 200, justifyContent: "center" }}>
            {Array.from({ length: 30 }).map((_, i) => {
              const height = 50 + Math.sin((i / 30) * Math.PI * 3) * 40 + Math.random() * 20;
              const animatedHeight = interpolate(frame - 30 - i * 2, [0, 20], [0, height], {
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={i}
                  style={{
                    width: 20,
                    height: animatedHeight,
                    background: `linear-gradient(to top, ${COLORS.primary}, ${COLORS.accent})`,
                    borderRadius: 3,
                  }}
                />
              );
            })}
          </div>
          <p style={{ fontSize: 22, color: COLORS.light, marginTop: 20 }}>
            Sin 파형 입력에 대한 은닉 유닛들의 반응
          </p>
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 100),
            display: "flex",
            gap: 30,
            justifyContent: "center",
          }}
        >
          <div style={{ background: "rgba(6, 182, 212, 0.2)", padding: "20px 30px", borderRadius: 12 }}>
            <p style={{ fontSize: 24, color: COLORS.light }}>어떤 유닛은 상승 구간에 활성화</p>
          </div>
          <div style={{ background: "rgba(6, 182, 212, 0.2)", padding: "20px 30px", borderRadius: 12 }}>
            <p style={{ fontSize: 24, color: COLORS.light }}>어떤 유닛은 하강 구간에 활성화</p>
          </div>
        </div>

        <p
          style={{
            fontSize: 28,
            color: COLORS.accent,
            marginTop: 30,
            opacity: fadeIn(frame, 140),
            fontWeight: 600,
          }}
        >
          → 은닉 상태가 입력의 특징을 학습합니다!
        </p>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 09: RNN Architectures
const Scene09Architectures: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const architectures = [
    { name: "One-to-One", desc: "입력 1 → 출력 1", example: "일반 신경망", in: 1, out: 1 },
    { name: "One-to-Many", desc: "입력 1 → 출력 N", example: "이미지 캡셔닝", in: 1, out: 4 },
    { name: "Many-to-One", desc: "입력 N → 출력 1", example: "감정 분석", in: 4, out: 1 },
    { name: "Many-to-Many", desc: "입력 N → 출력 N", example: "번역, 품사 태깅", in: 4, out: 4 },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AnimatedBackground />
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          RNN 아키텍처 유형
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, maxWidth: 1200 }}>
          {architectures.map((arch, i) => (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, 30 + i * 25),
                transform: `scale(${scaleIn(frame, fps, 30 + i * 25)})`,
                background: "rgba(0, 0, 0, 0.4)",
                padding: 30,
                borderRadius: 15,
                border: `2px solid ${COLORS.primary}`,
              }}
            >
              <h3 style={{ fontSize: 30, color: COLORS.accent, marginBottom: 15 }}>{arch.name}</h3>
              <p style={{ fontSize: 24, color: COLORS.light, marginBottom: 10 }}>{arch.desc}</p>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 15 }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {Array.from({ length: arch.in }).map((_, j) => (
                    <div
                      key={j}
                      style={{
                        width: 25,
                        height: 25,
                        background: COLORS.secondary,
                        borderRadius: 5,
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: 28, color: COLORS.primary }}>→</span>
                <div style={{ display: "flex", gap: 5 }}>
                  {Array.from({ length: arch.out }).map((_, j) => (
                    <div
                      key={j}
                      style={{
                        width: 25,
                        height: 25,
                        background: COLORS.accent,
                        borderRadius: 5,
                      }}
                    />
                  ))}
                </div>
              </div>
              <p style={{ fontSize: 20, color: "#67e8f9", marginTop: 15 }}>예: {arch.example}</p>
            </div>
          ))}
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// Scene 10: Outro
const Scene10Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summary = [
    { num: 1, text: "RNN 핵심 수식: tanh로 입력과 이전 상태 결합" },
    { num: 2, text: "파라미터 공유: 모든 시점에서 같은 가중치" },
    { num: 3, text: "시간 펼치기: 순환 구조를 시간축으로 전개" },
    { num: 4, text: "다양한 아키텍처: One-to-Many, Many-to-One 등" },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AnimatedBackground variant="dark" />
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          오늘 배운 내용 정리
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
          {summary.map((item, i) => (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, 30 + i * 20),
                transform: `translateX(${interpolate(frame - 30 - i * 20, [0, 20], [-50, 0], { extrapolateRight: "clamp" })}px) scale(${scaleIn(frame, fps, 30 + i * 20)})`,
                background: "rgba(6, 182, 212, 0.15)",
                padding: "20px 40px",
                borderRadius: 15,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  color: COLORS.accent,
                  fontWeight: 700,
                  background: COLORS.dark,
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.num}
              </span>
              <span style={{ fontSize: 26, color: COLORS.light }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 130),
            background: "rgba(6, 182, 212, 0.3)",
            padding: "25px 50px",
            borderRadius: 20,
            border: `2px solid ${COLORS.primary}`,
          }}
        >
          <p style={{ fontSize: 28, color: COLORS.light }}>
            다음 시간: <span style={{ color: COLORS.accent, fontWeight: 700 }}>RNN의 역전파 (BPTT)</span>
          </p>
          <p style={{ fontSize: 24, color: "#a5f3fc", marginTop: 10 }}>시간을 통한 역전파를 직접 구현해 봅니다!</p>
        </div>
      </div>
      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// ===================== MAIN COMPONENT =====================
export const Lesson6_2Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Scene 01: Intro */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
        <Audio src={staticFile("audio/lesson-6-2/scene01_intro.mp3")} />
      </Sequence>

      {/* Scene 02: Analogy */}
      <Sequence from={SCENE_TIMINGS.scene02_analogy.start} durationInFrames={SCENE_TIMINGS.scene02_analogy.duration}>
        <Scene02Analogy />
        <Audio src={staticFile("audio/lesson-6-2/scene02_analogy.mp3")} />
      </Sequence>

      {/* Scene 03: Formula */}
      <Sequence from={SCENE_TIMINGS.scene03_formula.start} durationInFrames={SCENE_TIMINGS.scene03_formula.duration}>
        <Scene03Formula />
        <Audio src={staticFile("audio/lesson-6-2/scene03_formula.mp3")} />
      </Sequence>

      {/* Scene 04: Dimensions */}
      <Sequence from={SCENE_TIMINGS.scene04_dimensions.start} durationInFrames={SCENE_TIMINGS.scene04_dimensions.duration}>
        <Scene04Dimensions />
        <Audio src={staticFile("audio/lesson-6-2/scene04_dimensions.mp3")} />
      </Sequence>

      {/* Scene 05: Numpy Code */}
      <Sequence from={SCENE_TIMINGS.scene05_numpy_code.start} durationInFrames={SCENE_TIMINGS.scene05_numpy_code.duration}>
        <Scene05NumpyCode />
        <Audio src={staticFile("audio/lesson-6-2/scene05_numpy_code.mp3")} />
      </Sequence>

      {/* Scene 06: Parameter Sharing */}
      <Sequence from={SCENE_TIMINGS.scene06_parameter_sharing.start} durationInFrames={SCENE_TIMINGS.scene06_parameter_sharing.duration}>
        <Scene06ParameterSharing />
        <Audio src={staticFile("audio/lesson-6-2/scene06_parameter_sharing.mp3")} />
      </Sequence>

      {/* Scene 07: Unfolding */}
      <Sequence from={SCENE_TIMINGS.scene07_unfolding.start} durationInFrames={SCENE_TIMINGS.scene07_unfolding.duration}>
        <Scene07Unfolding />
        <Audio src={staticFile("audio/lesson-6-2/scene07_unfolding.mp3")} />
      </Sequence>

      {/* Scene 08: Visualization */}
      <Sequence from={SCENE_TIMINGS.scene08_visualization.start} durationInFrames={SCENE_TIMINGS.scene08_visualization.duration}>
        <Scene08Visualization />
        <Audio src={staticFile("audio/lesson-6-2/scene08_visualization.mp3")} />
      </Sequence>

      {/* Scene 09: Architectures */}
      <Sequence from={SCENE_TIMINGS.scene09_architectures.start} durationInFrames={SCENE_TIMINGS.scene09_architectures.duration}>
        <Scene09Architectures />
        <Audio src={staticFile("audio/lesson-6-2/scene09_architectures.mp3")} />
      </Sequence>

      {/* Scene 10: Outro */}
      <Sequence from={SCENE_TIMINGS.scene10_outro.start} durationInFrames={SCENE_TIMINGS.scene10_outro.duration}>
        <Scene10Outro />
        <Audio src={staticFile("audio/lesson-6-2/scene10_outro.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
