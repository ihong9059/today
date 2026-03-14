import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// ===================== DURATION & TIMING =====================
export const LESSON_6_3_DURATION = 12147;

const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 1040 },
  scene02_rnn_problem: { start: 1040, duration: 1219 },
  scene03_lstm_analogy: { start: 2259, duration: 1201 },
  scene04_two_states: { start: 3460, duration: 1070 },
  scene05_forget_gate: { start: 4530, duration: 1063 },
  scene06_input_gate: { start: 5593, duration: 959 },
  scene07_cell_update: { start: 6552, duration: 1096 },
  scene08_output_gate: { start: 7648, duration: 842 },
  scene09_lstm_flow: { start: 8490, duration: 1066 },
  scene10_comparison: { start: 9556, duration: 1360 },
  scene11_outro: { start: 10916, duration: 1231 },
};

// ===================== COLORS =====================
const COLORS = {
  background: "#0f172a",
  primary: "#06b6d4",
  secondary: "#0891b2",
  accent: "#22d3ee",
  light: "#ffffff",
  dark: "#164e63",
  forgetGate: "#ef4444",
  inputGate: "#22c55e",
  outputGate: "#a855f7",
  cellState: "#3b82f6",
  hiddenState: "#f59e0b",
};

// ===================== ANIMATION HELPERS =====================
const fadeIn = (frame: number, delay: number = 0) =>
  interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, delay: number = 0) =>
  interpolate(frame - delay, [0, 25], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const scaleIn = (frame: number, fps: number, delay: number = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

// ===================== BACKGROUND =====================
const AnimatedBackground: React.FC<{ variant?: "gradient" | "dark" }> = ({
  variant = "gradient",
}) => {
  const frame = useCurrentFrame();
  const gradientPos = (frame * 0.1) % 100;

  if (variant === "dark") {
    return (
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${COLORS.background} 0%, #1e293b 100%)`,
        }}
      />
    );
  }

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${135 + gradientPos}deg, ${COLORS.background} 0%, #1e3a5f 50%, ${COLORS.dark} 100%)`,
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
        background: `rgba(6, 182, 212, 0.9)`,
        padding: "12px 30px",
        borderRadius: 25,
        zIndex: 100,
      }}
    >
      <span style={{ color: COLORS.light, fontSize: 20, fontWeight: 600 }}>
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
    <AbsoluteFill>
      <AnimatedBackground />
      <GlobalOverlay />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: 60,
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame),
            transform: `translateY(${slideUp(frame)}px) scale(${scaleIn(frame, fps)})`,
          }}
        >
          <h1
            style={{
              fontSize: 90,
              fontWeight: 800,
              color: COLORS.primary,
              textAlign: "center",
              marginBottom: 20,
              textShadow: `0 0 40px ${COLORS.primary}80`,
            }}
          >
            LSTM
          </h1>
          <p
            style={{
              fontSize: 50,
              color: COLORS.light,
              textAlign: "center",
              opacity: 0.9,
            }}
          >
            Long Short-Term Memory
          </p>
        </div>

        <div
          style={{
            marginTop: 50,
            padding: "30px 50px",
            background: "rgba(6, 182, 212, 0.15)",
            borderRadius: 20,
            border: `2px solid ${COLORS.primary}40`,
            opacity: fadeIn(frame, 30),
            transform: `translateY(${slideUp(frame, 30)}px)`,
          }}
        >
          <p
            style={{
              fontSize: 36,
              color: COLORS.accent,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            장기 기억의 비밀
          </p>
        </div>

        <div
          style={{
            marginTop: 40,
            opacity: fadeIn(frame, 50),
            transform: `translateY(${slideUp(frame, 50)}px)`,
          }}
        >
          <p
            style={{
              fontSize: 28,
              color: COLORS.light,
              textAlign: "center",
              opacity: 0.8,
              lineHeight: 1.6,
            }}
          >
            정보를 선택적으로 기억하고, 잊고, 출력하는 구조
          </p>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-6-3/scene01_intro.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 02: RNN Problem
const Scene02RNNProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneGamePeople = ["1", "2", "3", "...", "10"];
  const gradientDegradation = [100, 80, 60, 30, 5];

  return (
    <AbsoluteFill>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 60,
          height: "100%",
        }}
      >
        <h2
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.forgetGate,
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          RNN의 기울기 소실 문제
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            marginBottom: 40,
            opacity: fadeIn(frame, 20),
          }}
        >
          {phoneGamePeople.map((person, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  background: `rgba(6, 182, 212, ${gradientDegradation[Math.min(i, 4)] / 100})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  color: COLORS.light,
                  fontWeight: 600,
                  transform: `scale(${scaleIn(frame, fps, i * 10)})`,
                }}
              >
                {person}
              </div>
              <p style={{ fontSize: 20, color: COLORS.light, marginTop: 8, opacity: 0.7 }}>
                {gradientDegradation[Math.min(i, 4)]}%
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: 28,
            color: COLORS.light,
            textAlign: "center",
            marginBottom: 40,
            opacity: fadeIn(frame, 40),
          }}
        >
          전화기 게임처럼 정보가 전달되면서 점점 희석됩니다
        </p>

        <div
          style={{
            background: "rgba(0,0,0,0.4)",
            borderRadius: 16,
            padding: 30,
            opacity: fadeIn(frame, 60),
          }}
        >
          <p
            style={{
              fontSize: 32,
              color: COLORS.accent,
              fontFamily: "monospace",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            기울기 = W x W x W x ... (T번 반복)
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 60 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 26, color: COLORS.forgetGate, fontFamily: "monospace" }}>
                0.8^20 = 0.012
              </p>
              <p style={{ fontSize: 22, color: COLORS.light, opacity: 0.7 }}>기울기 소실</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 26, color: COLORS.inputGate, fontFamily: "monospace" }}>
                1.2^20 = 38.3
              </p>
              <p style={{ fontSize: 22, color: COLORS.light, opacity: 0.7 }}>기울기 폭발</p>
            </div>
          </div>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-6-3/scene02_rnn_problem.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 03: LSTM Analogy
const Scene03LSTMAnalogy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const components = [
    { name: "셀 상태", icon: "📓", desc: "노트북 페이지", color: COLORS.cellState },
    { name: "망각 게이트", icon: "🧹", desc: "지우개", color: COLORS.forgetGate },
    { name: "입력 게이트", icon: "✏️", desc: "펜", color: COLORS.inputGate },
    { name: "출력 게이트", icon: "🖍️", desc: "형광펜", color: COLORS.outputGate },
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground />
      <GlobalOverlay />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 60,
          height: "100%",
        }}
      >
        <h2
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 30,
            opacity: fadeIn(frame),
          }}
        >
          LSTM = 노트북을 사용하는 학생
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 30,
            width: "90%",
            maxWidth: 1200,
            marginTop: 30,
          }}
        >
          {components.map((comp, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: 20,
                padding: 30,
                border: `2px solid ${comp.color}60`,
                display: "flex",
                alignItems: "center",
                gap: 25,
                opacity: fadeIn(frame, 20 + i * 15),
                transform: `translateY(${slideUp(frame, 20 + i * 15)}px) scale(${scaleIn(frame, fps, 20 + i * 15)})`,
              }}
            >
              <div
                style={{
                  fontSize: 60,
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: `${comp.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {comp.icon}
              </div>
              <div>
                <p style={{ fontSize: 32, color: comp.color, fontWeight: 700 }}>{comp.name}</p>
                <p style={{ fontSize: 26, color: COLORS.light, opacity: 0.8 }}>{comp.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            padding: 25,
            background: "rgba(6, 182, 212, 0.15)",
            borderRadius: 16,
            opacity: fadeIn(frame, 80),
          }}
        >
          <p style={{ fontSize: 26, color: COLORS.light, textAlign: "center" }}>
            일반 RNN은 머릿속에만 담지만, LSTM은 노트북(셀 상태)으로 장기 보관!
          </p>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-6-3/scene03_lstm_analogy.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 04: Two States
const Scene04TwoStates: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cellStateFlow = ["C0", "C1", "C2", "C3", "..."];

  return (
    <AbsoluteFill>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 60,
          height: "100%",
        }}
      >
        <h2
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          LSTM의 두 가지 상태
        </h2>

        <div style={{ display: "flex", gap: 40, marginBottom: 40 }}>
          <div
            style={{
              flex: 1,
              background: `${COLORS.cellState}20`,
              borderRadius: 20,
              padding: 30,
              border: `2px solid ${COLORS.cellState}`,
              opacity: fadeIn(frame, 20),
              transform: `translateY(${slideUp(frame, 20)}px)`,
            }}
          >
            <h3 style={{ fontSize: 36, color: COLORS.cellState, marginBottom: 15 }}>
              셀 상태 (C_t)
            </h3>
            <p style={{ fontSize: 24, color: COLORS.light, opacity: 0.9, lineHeight: 1.6 }}>
              장기 기억 저장소
            </p>
            <p style={{ fontSize: 22, color: COLORS.light, opacity: 0.7, marginTop: 10 }}>
              = 노트북 페이지
            </p>
          </div>

          <div
            style={{
              flex: 1,
              background: `${COLORS.hiddenState}20`,
              borderRadius: 20,
              padding: 30,
              border: `2px solid ${COLORS.hiddenState}`,
              opacity: fadeIn(frame, 35),
              transform: `translateY(${slideUp(frame, 35)}px)`,
            }}
          >
            <h3 style={{ fontSize: 36, color: COLORS.hiddenState, marginBottom: 15 }}>
              은닉 상태 (h_t)
            </h3>
            <p style={{ fontSize: 24, color: COLORS.light, opacity: 0.9, lineHeight: 1.6 }}>
              단기 기억 / 출력
            </p>
            <p style={{ fontSize: 22, color: COLORS.light, opacity: 0.7, marginTop: 10 }}>
              = 머릿속 작업 기억
            </p>
          </div>
        </div>

        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: 16,
            padding: 30,
            opacity: fadeIn(frame, 50),
          }}
        >
          <p style={{ fontSize: 26, color: COLORS.accent, marginBottom: 20, textAlign: "center" }}>
            셀 상태 흐름 (컨베이어 벨트처럼 정보가 거의 그대로 흘러감)
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            {cellStateFlow.map((state, i) => (
              <React.Fragment key={i}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    background: COLORS.cellState,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.light,
                    transform: `scale(${scaleIn(frame, fps, 60 + i * 8)})`,
                  }}
                >
                  {state}
                </div>
                {i < cellStateFlow.length - 1 && (
                  <span style={{ fontSize: 40, color: COLORS.accent }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-6-3/scene04_two_states.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 05: Forget Gate
const Scene05ForgetGate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <AnimatedBackground />
      <GlobalOverlay />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 60,
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 30,
            opacity: fadeIn(frame),
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: COLORS.forgetGate,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              transform: `scale(${scaleIn(frame, fps)})`,
            }}
          >
            🧹
          </div>
          <h2 style={{ fontSize: 56, fontWeight: 700, color: COLORS.forgetGate }}>
            망각 게이트 (Forget Gate)
          </h2>
        </div>

        <p
          style={{
            fontSize: 32,
            color: COLORS.light,
            marginBottom: 40,
            opacity: fadeIn(frame, 15),
          }}
        >
          "이전 기억 중 무엇을 버릴까?"
        </p>

        <div
          style={{
            background: "rgba(0,0,0,0.4)",
            borderRadius: 16,
            padding: 30,
            marginBottom: 30,
            opacity: fadeIn(frame, 30),
          }}
        >
          <p
            style={{
              fontSize: 36,
              color: COLORS.accent,
              fontFamily: "monospace",
              textAlign: "center",
            }}
          >
            f_t = sigmoid(W_f * [h_(t-1), x_t] + b_f)
          </p>
        </div>

        <div style={{ display: "flex", gap: 40, marginBottom: 30 }}>
          <div
            style={{
              padding: 25,
              background: `${COLORS.forgetGate}30`,
              borderRadius: 16,
              opacity: fadeIn(frame, 45),
              transform: `translateY(${slideUp(frame, 45)}px)`,
            }}
          >
            <p style={{ fontSize: 32, color: COLORS.forgetGate, fontWeight: 700 }}>f_t = 0</p>
            <p style={{ fontSize: 24, color: COLORS.light }}>정보 삭제 (잊기)</p>
          </div>
          <div
            style={{
              padding: 25,
              background: `${COLORS.inputGate}30`,
              borderRadius: 16,
              opacity: fadeIn(frame, 55),
              transform: `translateY(${slideUp(frame, 55)}px)`,
            }}
          >
            <p style={{ fontSize: 32, color: COLORS.inputGate, fontWeight: 700 }}>f_t = 1</p>
            <p style={{ fontSize: 24, color: COLORS.light }}>정보 유지 (기억)</p>
          </div>
        </div>

        <div
          style={{
            padding: 25,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 16,
            border: `1px solid ${COLORS.primary}40`,
            opacity: fadeIn(frame, 70),
          }}
        >
          <p style={{ fontSize: 26, color: COLORS.light, textAlign: "center", lineHeight: 1.6 }}>
            예: "나는 서울에 산다. 그녀는 부산에 산다."
          </p>
          <p style={{ fontSize: 22, color: COLORS.light, textAlign: "center", opacity: 0.7, marginTop: 10 }}>
            주어가 바뀌면 - 이전 주어 정보를 잊고 새로운 정보 기억
          </p>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-6-3/scene05_forget_gate.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 06: Input Gate
const Scene06InputGate: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 60,
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 30,
            opacity: fadeIn(frame),
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: COLORS.inputGate,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            ✏️
          </div>
          <h2 style={{ fontSize: 56, fontWeight: 700, color: COLORS.inputGate }}>
            입력 게이트 (Input Gate)
          </h2>
        </div>

        <p
          style={{
            fontSize: 32,
            color: COLORS.light,
            marginBottom: 40,
            opacity: fadeIn(frame, 15),
          }}
        >
          "새로운 정보 중 무엇을 저장할까?"
        </p>

        <div style={{ display: "flex", gap: 30, marginBottom: 30, width: "90%" }}>
          <div
            style={{
              flex: 1,
              background: "rgba(0,0,0,0.4)",
              borderRadius: 16,
              padding: 25,
              opacity: fadeIn(frame, 30),
              transform: `translateY(${slideUp(frame, 30)}px)`,
            }}
          >
            <p style={{ fontSize: 28, color: COLORS.inputGate, fontFamily: "monospace" }}>
              i_t = sigmoid(W_i * [h, x] + b_i)
            </p>
            <p style={{ fontSize: 22, color: COLORS.light, marginTop: 10 }}>
              저장 여부 결정 (0~1)
            </p>
          </div>
          <div
            style={{
              flex: 1,
              background: "rgba(0,0,0,0.4)",
              borderRadius: 16,
              padding: 25,
              opacity: fadeIn(frame, 45),
              transform: `translateY(${slideUp(frame, 45)}px)`,
            }}
          >
            <p style={{ fontSize: 28, color: COLORS.accent, fontFamily: "monospace" }}>
              C_t~ = tanh(W_C * [h, x] + b_C)
            </p>
            <p style={{ fontSize: 22, color: COLORS.light, marginTop: 10 }}>
              저장할 후보 값 (-1~+1)
            </p>
          </div>
        </div>

        <div
          style={{
            padding: 30,
            background: `${COLORS.inputGate}20`,
            borderRadius: 16,
            border: `2px solid ${COLORS.inputGate}`,
            opacity: fadeIn(frame, 60),
            transform: `translateY(${slideUp(frame, 60)}px)`,
          }}
        >
          <p style={{ fontSize: 32, color: COLORS.light, textAlign: "center" }}>
            실제 저장량 = i_t x C_t~
          </p>
          <p
            style={{
              fontSize: 24,
              color: COLORS.light,
              textAlign: "center",
              opacity: 0.7,
              marginTop: 10,
            }}
          >
            문지기가 허락한 만큼만 새 정보가 저장됩니다!
          </p>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-6-3/scene06_input_gate.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 07: Cell Update
const Scene07CellUpdate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <AnimatedBackground />
      <GlobalOverlay />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 60,
          height: "100%",
        }}
      >
        <h2
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.cellState,
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          셀 상태 업데이트
        </h2>

        <div
          style={{
            background: "rgba(0,0,0,0.4)",
            borderRadius: 20,
            padding: 40,
            marginBottom: 40,
            opacity: fadeIn(frame, 20),
            transform: `scale(${scaleIn(frame, fps, 20)})`,
          }}
        >
          <p
            style={{
              fontSize: 48,
              color: COLORS.accent,
              fontFamily: "monospace",
              textAlign: "center",
            }}
          >
            C_t = f_t x C_(t-1) + i_t x C_t~
          </p>
        </div>

        <div style={{ display: "flex", gap: 40, marginBottom: 40 }}>
          <div
            style={{
              padding: 30,
              background: `${COLORS.forgetGate}20`,
              borderRadius: 16,
              border: `2px solid ${COLORS.forgetGate}60`,
              opacity: fadeIn(frame, 40),
              transform: `translateY(${slideUp(frame, 40)}px)`,
            }}
          >
            <p style={{ fontSize: 28, color: COLORS.forgetGate, fontWeight: 700, marginBottom: 10 }}>
              f_t x C_(t-1)
            </p>
            <p style={{ fontSize: 24, color: COLORS.light }}>이전 기억 중 유지할 부분</p>
          </div>
          <div
            style={{
              fontSize: 48,
              color: COLORS.accent,
              display: "flex",
              alignItems: "center",
            }}
          >
            +
          </div>
          <div
            style={{
              padding: 30,
              background: `${COLORS.inputGate}20`,
              borderRadius: 16,
              border: `2px solid ${COLORS.inputGate}60`,
              opacity: fadeIn(frame, 55),
              transform: `translateY(${slideUp(frame, 55)}px)`,
            }}
          >
            <p style={{ fontSize: 28, color: COLORS.inputGate, fontWeight: 700, marginBottom: 10 }}>
              i_t x C_t~
            </p>
            <p style={{ fontSize: 24, color: COLORS.light }}>새로 추가할 정보</p>
          </div>
        </div>

        <div
          style={{
            padding: 30,
            background: "rgba(6, 182, 212, 0.15)",
            borderRadius: 16,
            border: `2px solid ${COLORS.primary}40`,
            opacity: fadeIn(frame, 70),
          }}
        >
          <p style={{ fontSize: 28, color: COLORS.accent, textAlign: "center", fontWeight: 600 }}>
            이것이 LSTM의 핵심!
          </p>
          <p
            style={{
              fontSize: 24,
              color: COLORS.light,
              textAlign: "center",
              opacity: 0.8,
              marginTop: 10,
            }}
          >
            기울기가 셀 상태를 통해 거의 그대로 흘러가서 장기 기억이 가능해집니다
          </p>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-6-3/scene07_cell_update.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 08: Output Gate
const Scene08OutputGate: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 60,
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 30,
            opacity: fadeIn(frame),
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: COLORS.outputGate,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            🖍️
          </div>
          <h2 style={{ fontSize: 56, fontWeight: 700, color: COLORS.outputGate }}>
            출력 게이트 (Output Gate)
          </h2>
        </div>

        <p
          style={{
            fontSize: 32,
            color: COLORS.light,
            marginBottom: 40,
            opacity: fadeIn(frame, 15),
          }}
        >
          "셀 상태 중 무엇을 밖으로 내보낼까?"
        </p>

        <div style={{ display: "flex", gap: 30, marginBottom: 40 }}>
          <div
            style={{
              background: "rgba(0,0,0,0.4)",
              borderRadius: 16,
              padding: 30,
              opacity: fadeIn(frame, 30),
              transform: `translateY(${slideUp(frame, 30)}px)`,
            }}
          >
            <p style={{ fontSize: 30, color: COLORS.outputGate, fontFamily: "monospace" }}>
              o_t = sigmoid(W_o * [h, x] + b_o)
            </p>
            <p style={{ fontSize: 22, color: COLORS.light, marginTop: 10 }}>출력 비율 (0~1)</p>
          </div>
          <div
            style={{
              background: "rgba(0,0,0,0.4)",
              borderRadius: 16,
              padding: 30,
              opacity: fadeIn(frame, 45),
              transform: `translateY(${slideUp(frame, 45)}px)`,
            }}
          >
            <p style={{ fontSize: 30, color: COLORS.hiddenState, fontFamily: "monospace" }}>
              h_t = o_t x tanh(C_t)
            </p>
            <p style={{ fontSize: 22, color: COLORS.light, marginTop: 10 }}>최종 은닉 상태</p>
          </div>
        </div>

        <div
          style={{
            padding: 30,
            background: `${COLORS.outputGate}15`,
            borderRadius: 16,
            border: `2px solid ${COLORS.outputGate}60`,
            opacity: fadeIn(frame, 60),
          }}
        >
          <p style={{ fontSize: 26, color: COLORS.light, textAlign: "center", lineHeight: 1.6 }}>
            셀 상태 전체를 내보내는 게 아니라,
            필요한 부분만 걸러서 은닉 상태로 출력합니다!
          </p>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-6-3/scene08_output_gate.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 09: LSTM Flow
const Scene09LSTMFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { step: "1", name: "Forget", desc: "무엇을 잊을지", color: COLORS.forgetGate },
    { step: "2", name: "Input", desc: "무엇을 저장할지", color: COLORS.inputGate },
    { step: "3", name: "Update", desc: "셀 상태 업데이트", color: COLORS.cellState },
    { step: "4", name: "Output", desc: "무엇을 출력할지", color: COLORS.outputGate },
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground />
      <GlobalOverlay />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 60,
          height: "100%",
        }}
      >
        <h2
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          LSTM 전체 흐름
        </h2>

        <div
          style={{
            padding: 20,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 12,
            marginBottom: 30,
            opacity: fadeIn(frame, 15),
          }}
        >
          <p style={{ fontSize: 26, color: COLORS.accent }}>
            입력: x_t, h_(t-1), C_(t-1)
          </p>
        </div>

        <div style={{ display: "flex", gap: 25, marginBottom: 30 }}>
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                width: 200,
                padding: 25,
                background: `${s.color}20`,
                borderRadius: 16,
                border: `2px solid ${s.color}`,
                textAlign: "center",
                opacity: fadeIn(frame, 30 + i * 12),
                transform: `translateY(${slideUp(frame, 30 + i * 12)}px) scale(${scaleIn(frame, fps, 30 + i * 12)})`,
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: s.color,
                  margin: "0 auto 15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.light,
                }}
              >
                {s.step}
              </div>
              <p style={{ fontSize: 26, color: s.color, fontWeight: 700 }}>{s.name}</p>
              <p style={{ fontSize: 20, color: COLORS.light, opacity: 0.8, marginTop: 8 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: 20,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 12,
            opacity: fadeIn(frame, 80),
          }}
        >
          <p style={{ fontSize: 26, color: COLORS.accent }}>출력: h_t, C_t - 다음 시점으로</p>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-6-3/scene09_lstm_flow.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 10: Comparison
const Scene10Comparison: React.FC = () => {
  const frame = useCurrentFrame();

  const comparisons = [
    { feature: "상태", rnn: "은닉 상태(h) 1개", lstm: "셀(C) + 은닉(h) 2개" },
    { feature: "게이트", rnn: "없음", lstm: "3개 (망각/입력/출력)" },
    { feature: "장기 기억", rnn: "어려움", lstm: "가능" },
    { feature: "파라미터", rnn: "적음", lstm: "많음 (약 4배)" },
    { feature: "사용 시기", rnn: "짧은 시퀀스", lstm: "긴 시퀀스" },
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 60,
          height: "100%",
        }}
      >
        <h2
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          RNN vs LSTM 비교
        </h2>

        <div
          style={{
            width: "95%",
            maxWidth: 1100,
            background: "rgba(0,0,0,0.3)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              background: COLORS.primary,
              padding: 20,
              opacity: fadeIn(frame, 15),
            }}
          >
            <p style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, textAlign: "center" }}>
              특성
            </p>
            <p style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, textAlign: "center" }}>
              RNN
            </p>
            <p style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, textAlign: "center" }}>
              LSTM
            </p>
          </div>

          {comparisons.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                padding: 18,
                borderBottom: `1px solid ${COLORS.primary}30`,
                opacity: fadeIn(frame, 30 + i * 10),
              }}
            >
              <p
                style={{ fontSize: 22, color: COLORS.accent, fontWeight: 600, textAlign: "center" }}
              >
                {row.feature}
              </p>
              <p style={{ fontSize: 22, color: COLORS.light, opacity: 0.8, textAlign: "center" }}>
                {row.rnn}
              </p>
              <p style={{ fontSize: 22, color: COLORS.inputGate, textAlign: "center" }}>
                {row.lstm}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-6-3/scene10_comparison.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 11: Outro
const Scene11Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summaryItems = [
    "기울기 소실: 반복 곱셈으로 기울기 사라짐",
    "셀 상태: 장기 기억 저장소 (컨베이어 벨트)",
    "3개 게이트: 망각(지우개), 입력(펜), 출력(형광펜)",
    "C_t = f_t x C_(t-1) + i_t x C_t~",
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground />
      <GlobalOverlay />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 60,
          height: "100%",
        }}
      >
        <h2
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          오늘 배운 내용 정리
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
          {summaryItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                padding: "15px 30px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                border: `1px solid ${COLORS.primary}40`,
                opacity: fadeIn(frame, 20 + i * 12),
                transform: `translateX(${interpolate(
                  frame - (20 + i * 12),
                  [0, 20],
                  [-50, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )}px)`,
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: COLORS.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: COLORS.light,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: 26, color: COLORS.light }}>{item}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: 30,
            background: `${COLORS.primary}20`,
            borderRadius: 16,
            border: `2px solid ${COLORS.primary}`,
            opacity: fadeIn(frame, 70),
            transform: `scale(${scaleIn(frame, fps, 70)})`,
          }}
        >
          <p style={{ fontSize: 28, color: COLORS.accent, textAlign: "center" }}>
            다음 시간: GRU (Gated Recurrent Unit)
          </p>
          <p style={{ fontSize: 22, color: COLORS.light, textAlign: "center", opacity: 0.8, marginTop: 10 }}>
            LSTM을 더 단순하게 만든 모델
          </p>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-6-3/scene11_outro.mp3")} />
    </AbsoluteFill>
  );
};

// ===================== MAIN COMPONENT =====================
export const Lesson6_3Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene02_rnn_problem.start} durationInFrames={SCENE_TIMINGS.scene02_rnn_problem.duration}>
        <Scene02RNNProblem />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene03_lstm_analogy.start} durationInFrames={SCENE_TIMINGS.scene03_lstm_analogy.duration}>
        <Scene03LSTMAnalogy />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene04_two_states.start} durationInFrames={SCENE_TIMINGS.scene04_two_states.duration}>
        <Scene04TwoStates />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene05_forget_gate.start} durationInFrames={SCENE_TIMINGS.scene05_forget_gate.duration}>
        <Scene05ForgetGate />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene06_input_gate.start} durationInFrames={SCENE_TIMINGS.scene06_input_gate.duration}>
        <Scene06InputGate />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene07_cell_update.start} durationInFrames={SCENE_TIMINGS.scene07_cell_update.duration}>
        <Scene07CellUpdate />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene08_output_gate.start} durationInFrames={SCENE_TIMINGS.scene08_output_gate.duration}>
        <Scene08OutputGate />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene09_lstm_flow.start} durationInFrames={SCENE_TIMINGS.scene09_lstm_flow.duration}>
        <Scene09LSTMFlow />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene10_comparison.start} durationInFrames={SCENE_TIMINGS.scene10_comparison.duration}>
        <Scene10Comparison />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene11_outro.start} durationInFrames={SCENE_TIMINGS.scene11_outro.duration}>
        <Scene11Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
