import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

// ============ SCENE TIMINGS (based on TTS durations) ============
export const SCENE_TIMINGS = {
  scene1_intro: { duration: 804, start: 0 },
  scene2_composite: { duration: 886, start: 804 },
  scene3_formula: { duration: 775, start: 1690 },
  scene4_example: { duration: 944, start: 2465 },
  scene5_backprop: { duration: 778, start: 3409 },
  scene6_outro: { duration: 846, start: 4187 },
};

export const LESSON_2_4_DURATION = 5033;

// ============ COLORS ============
const colors = {
  bg: {
    dark: "#0f172a",
  },
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  accent: "#f59e0b",
  success: "#10b981",
  danger: "#ef4444",
  math: "#a855f7", // Level 2 Purple
  white: "#ffffff",
  gray: {
    100: "#f1f5f9",
    300: "#cbd5e1",
    500: "#64748b",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

// ============ HELPER FUNCTIONS ============
const fadeIn = (frame: number, start: number = 0, duration: number = 30) =>
  interpolate(frame, [start, start + duration], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const slideUp = (frame: number, start: number = 0, duration: number = 30, distance: number = 50) =>
  interpolate(frame, [start, start + duration], [distance, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const scaleIn = (frame: number, fps: number, delay: number = 0) =>
  Math.min(spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 100 } }), 1);

// ============ GLOBAL OVERLAY ============
const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOpacity = fadeIn(frame, 0, 30);

  return (
    <>
      {/* 왼쪽 상단 UTTEC-Lab 로고 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          zIndex: 1000,
          opacity: logoOpacity,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 15px ${colors.primary}60`,
          }}
        >
          <span style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>U</span>
        </div>
        <span
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: colors.white,
            textShadow: `0 2px 10px rgba(0,0,0,0.5)`,
            letterSpacing: 1,
          }}
        >
          UTTEC-Lab
        </span>
      </div>

      {/* 오른쪽 하단 URL */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          zIndex: 1000,
          opacity: logoOpacity,
          fontSize: 22,
          color: colors.gray[300],
          fontWeight: 500,
        }}
      >
        ai-first-step.uttec-lab.com
      </div>
    </>
  );
};

// ============ LEVEL BADGE ============
const LevelBadge: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 30,
      right: 40,
      backgroundColor: colors.math,
      padding: "10px 25px",
      borderRadius: 25,
      fontSize: 22,
      fontWeight: "bold",
      color: colors.white,
      boxShadow: `0 4px 15px ${colors.math}60`,
    }}
  >
    Level 2 · 연쇄법칙
  </div>
);

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Audio src={staticFile("audio/lesson-2-4/scene1_intro.mp3")} />
      <GlobalOverlay />
      <LevelBadge />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0),
          transform: `translateY(${slideUp(frame, 0)}px)`,
        }}
      >
        <h1 style={{ fontSize: 90, fontWeight: "bold", color: colors.white, margin: 0 }}>
          연쇄법칙
        </h1>
        <p style={{ fontSize: 48, color: colors.math, marginTop: 20 }}>
          Chain Rule
        </p>
      </div>

      {/* 도미노 애니메이션 */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {["A", "B", "C"].map((label, i) => {
          const delay = 60 + i * 30;
          const rotation = frame > delay + 30 ? interpolate(frame, [delay + 30, delay + 50], [0, 45], { extrapolateRight: "clamp" }) : 0;

          return (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: fadeIn(frame, delay),
                transform: `scale(${scaleIn(frame, fps, delay)}) rotate(${rotation}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 160,
                  backgroundColor: i === 0 ? colors.primary : i === 1 ? colors.math : colors.accent,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 10px 30px rgba(0,0,0,0.4)`,
                }}
              >
                <span style={{ fontSize: 48, fontWeight: "bold", color: colors.white }}>{label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 화살표 */}
      <div
        style={{
          position: "absolute",
          top: "52%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 140,
          opacity: fadeIn(frame, 120),
        }}
      >
        <span style={{ fontSize: 60, color: colors.accent }}>→</span>
        <span style={{ fontSize: 60, color: colors.accent }}>→</span>
      </div>

      {/* 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 150),
        }}
      >
        <p style={{ fontSize: 36, color: colors.gray[300] }}>
          딥러닝 역전파의 핵심 원리
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: COMPOSITE FUNCTION ============
const Scene2Composite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Audio src={staticFile("audio/lesson-2-4/scene2_composite.mp3")} />
      <GlobalOverlay />
      <LevelBadge />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0),
        }}
      >
        <h2 style={{ fontSize: 60, fontWeight: "bold", color: colors.white }}>
          합성함수란?
        </h2>
      </div>

      {/* 함수 구조 */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: fadeIn(frame, 30),
        }}
      >
        <div
          style={{
            padding: "30px 50px",
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            border: `3px solid ${colors.math}`,
          }}
        >
          <p style={{ fontSize: 48, color: colors.white, margin: 0 }}>
            f(x) = (x + 2)²
          </p>
        </div>
      </div>

      {/* 분해 */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        <div
          style={{
            padding: "25px 40px",
            backgroundColor: colors.primary,
            borderRadius: 15,
            opacity: fadeIn(frame, 90),
            transform: `scale(${scaleIn(frame, fps, 90)})`,
          }}
        >
          <p style={{ fontSize: 32, color: colors.white, margin: 0 }}>안쪽</p>
          <p style={{ fontSize: 40, color: colors.white, margin: "10px 0 0" }}>u = x + 2</p>
        </div>
        <div
          style={{
            padding: "25px 40px",
            backgroundColor: colors.math,
            borderRadius: 15,
            opacity: fadeIn(frame, 120),
            transform: `scale(${scaleIn(frame, fps, 120)})`,
          }}
        >
          <p style={{ fontSize: 32, color: colors.white, margin: 0 }}>바깥</p>
          <p style={{ fontSize: 40, color: colors.white, margin: "10px 0 0" }}>f = u²</p>
        </div>
      </div>

      {/* 흐름도 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          opacity: fadeIn(frame, 180),
        }}
      >
        <span style={{ fontSize: 36, color: colors.white, padding: "15px 30px", backgroundColor: colors.gray[700], borderRadius: 10 }}>x</span>
        <span style={{ fontSize: 40, color: colors.accent }}>→</span>
        <span style={{ fontSize: 36, color: colors.white, padding: "15px 30px", backgroundColor: colors.primary, borderRadius: 10 }}>u</span>
        <span style={{ fontSize: 40, color: colors.accent }}>→</span>
        <span style={{ fontSize: 36, color: colors.white, padding: "15px 30px", backgroundColor: colors.math, borderRadius: 10 }}>f</span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: FORMULA ============
const Scene3Formula: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Audio src={staticFile("audio/lesson-2-4/scene3_formula.mp3")} />
      <GlobalOverlay />
      <LevelBadge />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0),
        }}
      >
        <h2 style={{ fontSize: 60, fontWeight: "bold", color: colors.white }}>
          연쇄법칙 공식
        </h2>
      </div>

      {/* 핵심 공식 */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(frame, 30),
          transform: `scale(${scaleIn(frame, fps, 30)})`,
        }}
      >
        <div
          style={{
            padding: "40px 80px",
            background: `linear-gradient(135deg, ${colors.math}20, ${colors.primary}20)`,
            borderRadius: 25,
            border: `4px solid ${colors.math}`,
          }}
        >
          <p style={{ fontSize: 72, color: colors.white, margin: 0, fontWeight: "bold" }}>
            <span style={{ color: colors.accent }}>df/dx</span> = <span style={{ color: colors.math }}>df/du</span> × <span style={{ color: colors.primary }}>du/dx</span>
          </p>
        </div>
      </div>

      {/* 설명 */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 90),
        }}
      >
        <p style={{ fontSize: 36, color: colors.gray[300], lineHeight: 1.8 }}>
          전체 변화율 = 바깥 함수의 변화율 × 안쪽 함수의 변화율
        </p>
      </div>

      {/* 3단계 합성 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          opacity: fadeIn(frame, 150),
        }}
      >
        <span style={{ fontSize: 28, color: colors.gray[300] }}>x → u → v → f 일 때:</span>
        <span style={{ fontSize: 32, color: colors.accent, marginLeft: 30 }}>df/dx = df/dv × dv/du × du/dx</span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: EXAMPLE ============
const Scene4Example: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { label: "Step 1: 분해", content: "u = x + 2, f = u²", delay: 30 },
    { label: "Step 2: 각각 미분", content: "df/du = 2u, du/dx = 1", delay: 150 },
    { label: "Step 3: 곱하기", content: "df/dx = 2u × 1 = 2(x+2)", delay: 270 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Audio src={staticFile("audio/lesson-2-4/scene4_example.mp3")} />
      <GlobalOverlay />
      <LevelBadge />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0),
        }}
      >
        <h2 style={{ fontSize: 48, fontWeight: "bold", color: colors.white }}>
          예제: f(x) = (x + 2)²
        </h2>
      </div>

      {/* Steps */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              opacity: fadeIn(frame, step.delay),
              transform: `translateX(${slideUp(frame, step.delay, 30, 30)}px)`,
            }}
          >
            <div
              style={{
                padding: "15px 25px",
                backgroundColor: colors.math,
                borderRadius: 10,
                minWidth: 200,
              }}
            >
              <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>{step.label}</span>
            </div>
            <div
              style={{
                padding: "15px 35px",
                backgroundColor: colors.gray[800],
                borderRadius: 10,
              }}
            >
              <span style={{ fontSize: 32, color: colors.white }}>{step.content}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 결과 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(frame, 400),
          transform: `scale(${scaleIn(frame, fps, 400)})`,
        }}
      >
        <div
          style={{
            padding: "25px 50px",
            backgroundColor: colors.success,
            borderRadius: 15,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            x = 3 일 때: 2 × (3+2) = 10 ✓
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: BACKPROPAGATION ============
const Scene5Backprop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Audio src={staticFile("audio/lesson-2-4/scene5_backprop.mp3")} />
      <GlobalOverlay />
      <LevelBadge />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0),
        }}
      >
        <h2 style={{ fontSize: 60, fontWeight: "bold", color: colors.white }}>
          순전파 vs 역전파
        </h2>
      </div>

      {/* 순전파 */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          opacity: fadeIn(frame, 30),
        }}
      >
        <span style={{ fontSize: 32, color: colors.gray[300], width: 150 }}>순전파</span>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 32, color: colors.white, padding: "15px 25px", backgroundColor: colors.primary, borderRadius: 10 }}>입력 x</span>
          <span style={{ fontSize: 40, color: colors.success }}>→</span>
          <span style={{ fontSize: 32, color: colors.white, padding: "15px 25px", backgroundColor: colors.math, borderRadius: 10 }}>은닉층</span>
          <span style={{ fontSize: 40, color: colors.success }}>→</span>
          <span style={{ fontSize: 32, color: colors.white, padding: "15px 25px", backgroundColor: colors.accent, borderRadius: 10 }}>출력 y</span>
        </div>
      </div>

      {/* 역전파 */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          opacity: fadeIn(frame, 120),
        }}
      >
        <span style={{ fontSize: 32, color: colors.gray[300], width: 150 }}>역전파</span>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 32, color: colors.white, padding: "15px 25px", backgroundColor: colors.primary, borderRadius: 10 }}>∂L/∂x</span>
          <span style={{ fontSize: 40, color: colors.danger }}>←</span>
          <span style={{ fontSize: 32, color: colors.white, padding: "15px 25px", backgroundColor: colors.math, borderRadius: 10 }}>∂L/∂h</span>
          <span style={{ fontSize: 40, color: colors.danger }}>←</span>
          <span style={{ fontSize: 32, color: colors.white, padding: "15px 25px", backgroundColor: colors.accent, borderRadius: 10 }}>∂L/∂y</span>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(frame, 210),
          transform: `scale(${scaleIn(frame, fps, 210)})`,
        }}
      >
        <div
          style={{
            padding: "25px 50px",
            background: `linear-gradient(135deg, ${colors.danger}30, ${colors.math}30)`,
            borderRadius: 20,
            border: `3px solid ${colors.danger}`,
          }}
        >
          <p style={{ fontSize: 36, color: colors.white, margin: 0 }}>
            역전파 = <span style={{ color: colors.accent }}>연쇄법칙</span>의 반복 적용!
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: OUTRO ============
const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summaryItems = [
    { icon: "🔗", text: "합성함수: 함수 안에 함수", delay: 30 },
    { icon: "✖️", text: "연쇄법칙: 변화율을 곱한다", delay: 90 },
    { icon: "↩️", text: "역전파: 연쇄법칙 반복 적용", delay: 150 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Audio src={staticFile("audio/lesson-2-4/scene6_outro.mp3")} />
      <GlobalOverlay />
      <LevelBadge />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0),
        }}
      >
        <h2 style={{ fontSize: 60, fontWeight: "bold", color: colors.white }}>
          오늘 배운 내용
        </h2>
      </div>

      {/* Summary */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 25,
        }}
      >
        {summaryItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 25,
              padding: "20px 40px",
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              opacity: fadeIn(frame, item.delay),
              transform: `scale(${scaleIn(frame, fps, item.delay)})`,
            }}
          >
            <span style={{ fontSize: 40 }}>{item.icon}</span>
            <span style={{ fontSize: 32, color: colors.white }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Next Lesson */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(frame, 240),
        }}
      >
        <div
          style={{
            padding: "25px 50px",
            backgroundColor: colors.math,
            borderRadius: 20,
          }}
        >
          <p style={{ fontSize: 32, color: colors.white, margin: 0 }}>
            다음 시간: <span style={{ fontWeight: "bold" }}>벡터와 행렬</span> - AI 연산의 95%!
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const Lesson2_4Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene2_composite.start} durationInFrames={SCENE_TIMINGS.scene2_composite.duration}>
        <Scene2Composite />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene3_formula.start} durationInFrames={SCENE_TIMINGS.scene3_formula.duration}>
        <Scene3Formula />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene4_example.start} durationInFrames={SCENE_TIMINGS.scene4_example.duration}>
        <Scene4Example />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene5_backprop.start} durationInFrames={SCENE_TIMINGS.scene5_backprop.duration}>
        <Scene5Backprop />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene6_outro.start} durationInFrames={SCENE_TIMINGS.scene6_outro.duration}>
        <Scene6Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
