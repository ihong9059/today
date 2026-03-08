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
  scene1_intro: { duration: 758, start: 0 },
  scene2_and: { duration: 1193, start: 758 },
  scene3_or: { duration: 1070, start: 1951 },
  scene4_bias: { duration: 1010, start: 3021 },
  scene5_not: { duration: 1410, start: 4031 },
  scene6_comparison: { duration: 1184, start: 5441 },
  scene7_outro: { duration: 1330, start: 6625 },
};

export const LESSON_1_5_DURATION = 7955;

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
  and: "#06b6d4",
  or: "#f97316",
  not: "#ec4899",
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

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          zIndex: 1000,
          opacity: logoOpacity,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "12px 40px",
            backgroundColor: `${colors.gray[900]}dd`,
            borderRadius: 30,
            border: `2px solid ${colors.primary}60`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
          }}
        >
          <span style={{ fontSize: 24, color: colors.gray[100], fontWeight: 500 }}>
            교육 사이트:
          </span>
          <span
            style={{
              fontSize: 26,
              color: colors.accent,
              fontWeight: "bold",
              marginLeft: 10,
              textShadow: `0 0 10px ${colors.accent}60`,
            }}
          >
            http://uttec-ai.duckdns.org
          </span>
        </div>
      </div>
    </>
  );
};

// ============ BACKGROUND COMPONENTS ============
const AnimatedBackground: React.FC<{ color1?: string; color2?: string; color3?: string }> = ({
  color1 = "#667eea",
  color2 = "#764ba2",
  color3 = "#1e1b4b"
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`,
        }}
      />
      {[0, 1, 2].map((i) => {
        const x = 400 + Math.sin((frame + i * 100) / 80) * 300;
        const y = 300 + Math.cos((frame + i * 100) / 60) * 200;
        const size = 400 + i * 100;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${colors.primary}30 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Particles: React.FC<{ count?: number; color?: string }> = ({ count = 30, color = colors.white }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = (i * 137.5) % 1920;
        const baseY = (i * 73.7) % 1080;
        const speed = 0.5 + (i % 5) * 0.3;
        const size = 3 + (i % 4) * 2;

        const x = baseX + Math.sin((frame * speed + i * 50) / 40) * 30;
        const y = (baseY + frame * speed * 0.5) % 1200 - 60;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: 0.4 + (i % 3) * 0.2,
            }}
          />
        );
      })}
    </>
  );
};

// ============ UI COMPONENTS ============
const GlowText: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
  glowColor?: string;
}> = ({ children, fontSize = 72, color = colors.white, glowColor = colors.primary }) => {
  return (
    <span
      style={{
        fontSize,
        fontWeight: "bold",
        color,
        textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}80, 0 0 60px ${glowColor}40`,
      }}
    >
      {children}
    </span>
  );
};

const Card: React.FC<{
  children: React.ReactNode;
  width?: number | string;
  style?: React.CSSProperties;
}> = ({ children, width = 800, style }) => {
  return (
    <div
      style={{
        width,
        padding: 40,
        backgroundColor: `${colors.gray[800]}cc`,
        borderRadius: 24,
        border: `2px solid ${colors.primary}60`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============ TRUTH TABLE ============
const TruthTable: React.FC<{
  gate: "AND" | "OR" | "NOT";
  frame: number;
  fps: number;
  color: string;
}> = ({ gate, frame, fps, color }) => {
  const tables = {
    AND: [
      { x1: 0, x2: 0, out: 0 },
      { x1: 0, x2: 1, out: 0 },
      { x1: 1, x2: 0, out: 0 },
      { x1: 1, x2: 1, out: 1 },
    ],
    OR: [
      { x1: 0, x2: 0, out: 0 },
      { x1: 0, x2: 1, out: 1 },
      { x1: 1, x2: 0, out: 1 },
      { x1: 1, x2: 1, out: 1 },
    ],
    NOT: [
      { x1: 0, x2: null, out: 1 },
      { x1: 1, x2: null, out: 0 },
    ],
  };

  const data = tables[gate];
  const isNot = gate === "NOT";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        backgroundColor: `${colors.gray[800]}dd`,
        padding: 25,
        borderRadius: 20,
        border: `3px solid ${color}`,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
        <span style={{ width: 80, fontSize: 28, fontWeight: "bold", color: colors.gray[300], textAlign: "center" }}>
          x1
        </span>
        {!isNot && (
          <span style={{ width: 80, fontSize: 28, fontWeight: "bold", color: colors.gray[300], textAlign: "center" }}>
            x2
          </span>
        )}
        <span style={{ width: 80, fontSize: 28, fontWeight: "bold", color, textAlign: "center" }}>
          출력
        </span>
      </div>

      {/* Rows */}
      {data.map((row, i) => {
        const rowOpacity = fadeIn(frame, i * 20, 20);
        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 20,
              opacity: rowOpacity,
            }}
          >
            <span style={{ width: 80, fontSize: 32, color: colors.white, textAlign: "center" }}>
              {row.x1}
            </span>
            {!isNot && (
              <span style={{ width: 80, fontSize: 32, color: colors.white, textAlign: "center" }}>
                {row.x2}
              </span>
            )}
            <span
              style={{
                width: 80,
                fontSize: 32,
                fontWeight: "bold",
                color: row.out === 1 ? colors.success : colors.danger,
                textAlign: "center",
              }}
            >
              {row.out}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ============ PERCEPTRON GATE DIAGRAM ============
const GateDiagram: React.FC<{
  gate: "AND" | "OR" | "NOT";
  frame: number;
  fps: number;
  color: string;
}> = ({ gate, frame, fps, color }) => {
  const configs = {
    AND: { w1: 0.5, w2: 0.5, b: -0.7 },
    OR: { w1: 0.5, w2: 0.5, b: -0.2 },
    NOT: { w1: -1, w2: null, b: 0.5 },
  };

  const { w1, w2, b } = configs[gate];
  const isNot = gate === "NOT";
  const scale = scaleIn(frame, fps, 0);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {/* Perceptron box */}
      <div
        style={{
          position: "relative",
          width: 400,
          height: isNot ? 180 : 220,
          backgroundColor: `${colors.gray[800]}cc`,
          borderRadius: 20,
          border: `3px solid ${color}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 15,
        }}
      >
        {/* Inputs */}
        <div style={{ position: "absolute", left: -100, top: isNot ? 70 : 50, display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28, color: colors.white }}>x1</span>
            <div style={{ width: 60, height: 3, backgroundColor: color }} />
          </div>
          {!isNot && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 28, color: colors.white }}>x2</span>
              <div style={{ width: 60, height: 3, backgroundColor: color }} />
            </div>
          )}
        </div>

        {/* Weights */}
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 24, color: colors.gray[300] }}>w1</span>
            <div style={{ fontSize: 32, fontWeight: "bold", color: w1 < 0 ? colors.danger : colors.success }}>
              {w1}
            </div>
          </div>
          {!isNot && (
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 24, color: colors.gray[300] }}>w2</span>
              <div style={{ fontSize: 32, fontWeight: "bold", color: colors.success }}>
                {w2}
              </div>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 24, color: colors.gray[300] }}>b</span>
            <div style={{ fontSize: 32, fontWeight: "bold", color: b < 0 ? colors.danger : colors.success }}>
              {b}
            </div>
          </div>
        </div>

        {/* Output arrow */}
        <div style={{ position: "absolute", right: -100, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 60, height: 3, backgroundColor: color }} />
          <span style={{ fontSize: 28, color: colors.white }}>출력</span>
        </div>
      </div>

      {/* Gate name */}
      <div
        style={{
          fontSize: 36,
          fontWeight: "bold",
          color,
          textShadow: `0 0 15px ${color}60`,
        }}
      >
        {gate} 게이트
      </div>
    </div>
  );
};

// ============ BIAS COMPARISON ============
const BiasComparison: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  return (
    <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
      {/* AND */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          transform: `scale(${scaleIn(frame, fps, 0)})`,
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: `8px solid ${colors.and}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `${colors.and}20`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.gray[300] }}>편향 b</span>
          <span style={{ fontSize: 56, fontWeight: "bold", color: colors.danger }}>-0.7</span>
        </div>
        <span style={{ fontSize: 32, fontWeight: "bold", color: colors.and }}>AND</span>
        <span style={{ fontSize: 24, color: colors.gray[300] }}>엄격!</span>
      </div>

      {/* VS */}
      <div
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: colors.gray[500],
          opacity: fadeIn(frame, 30, 20),
        }}
      >
        vs
      </div>

      {/* OR */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          transform: `scale(${scaleIn(frame, fps, 20)})`,
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: `8px solid ${colors.or}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `${colors.or}20`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.gray[300] }}>편향 b</span>
          <span style={{ fontSize: 56, fontWeight: "bold", color: colors.success }}>-0.2</span>
        </div>
        <span style={{ fontSize: 32, fontWeight: "bold", color: colors.or }}>OR</span>
        <span style={{ fontSize: 24, color: colors.gray[300] }}>관대!</span>
      </div>
    </div>
  );
};

// ============ THREE GATES COMPARISON ============
const ThreeGatesComparison: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const gates = [
    { name: "AND", w1: "0.5", w2: "0.5", b: "-0.7", color: colors.and },
    { name: "OR", w1: "0.5", w2: "0.5", b: "-0.2", color: colors.or },
    { name: "NOT", w1: "-1", w2: "-", b: "0.5", color: colors.not },
  ];

  return (
    <div style={{ display: "flex", gap: 40 }}>
      {gates.map((gate, i) => {
        const scale = scaleIn(frame, fps, i * 30);
        return (
          <div
            key={i}
            style={{
              transform: `scale(${scale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 15,
              padding: 30,
              backgroundColor: `${colors.gray[800]}cc`,
              borderRadius: 20,
              border: `3px solid ${gate.color}`,
              minWidth: 250,
            }}
          >
            <span style={{ fontSize: 36, fontWeight: "bold", color: gate.color }}>
              {gate.name}
            </span>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 20, color: colors.gray[300] }}>w1</span>
                <div style={{ fontSize: 28, fontWeight: "bold", color: gate.w1.startsWith("-") ? colors.danger : colors.white }}>
                  {gate.w1}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 20, color: colors.gray[300] }}>w2</span>
                <div style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>
                  {gate.w2}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 20, color: colors.gray[300] }}>b</span>
                <div style={{ fontSize: 28, fontWeight: "bold", color: gate.b.startsWith("-") ? colors.danger : colors.success }}>
                  {gate.b}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============ SCENE COMPONENTS ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = scaleIn(frame, fps, 0);

  const gates = ["AND", "OR", "NOT"];

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#1e3a8a" color2="#3730a3" color3="#0f172a" />
      <Particles count={40} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 50,
        }}
      >
        <div style={{ transform: `scale(${titleScale})` }}>
          <GlowText fontSize={80} glowColor={colors.primary}>
            논리 게이트
          </GlowText>
        </div>

        <div style={{ display: "flex", gap: 60 }}>
          {gates.map((gate, i) => {
            const gateScale = scaleIn(frame, fps, 30 + i * 20);
            const gateColor = i === 0 ? colors.and : i === 1 ? colors.or : colors.not;
            return (
              <div
                key={i}
                style={{
                  transform: `scale(${gateScale})`,
                  padding: "30px 50px",
                  backgroundColor: `${gateColor}30`,
                  borderRadius: 20,
                  border: `3px solid ${gateColor}`,
                }}
              >
                <span style={{ fontSize: 48, fontWeight: "bold", color: gateColor }}>
                  {gate}
                </span>
              </div>
            );
          })}
        </div>

        {frame > 120 && (
          <div
            style={{
              opacity: fadeIn(frame, 120, 30),
              fontSize: 32,
              color: colors.gray[300],
              textAlign: "center",
            }}
          >
            컴퓨터 모든 계산의 기본!
          </div>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene2And: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#0891b2" color2="#0e7490" color3="#0f172a" />
      <Particles count={30} color={colors.and} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 80,
          gap: 40,
        }}
      >
        <GlowText fontSize={64} glowColor={colors.and}>
          AND 게이트
        </GlowText>

        <div
          style={{
            fontSize: 32,
            color: colors.gray[300],
            opacity: fadeIn(frame, 0, 30),
          }}
        >
          "둘 다 참이어야 참!"
        </div>

        <div style={{ display: "flex", gap: 80, marginTop: 30 }}>
          <TruthTable gate="AND" frame={frame - 30} fps={fps} color={colors.and} />
          {frame > 100 && <GateDiagram gate="AND" frame={frame - 100} fps={fps} color={colors.and} />}
        </div>
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene3Or: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#ea580c" color2="#c2410c" color3="#1e1b4b" />
      <Particles count={30} color={colors.or} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 80,
          gap: 40,
        }}
      >
        <GlowText fontSize={64} glowColor={colors.or}>
          OR 게이트
        </GlowText>

        <div
          style={{
            fontSize: 32,
            color: colors.gray[300],
            opacity: fadeIn(frame, 0, 30),
          }}
        >
          "하나만 참이어도 참!"
        </div>

        <div style={{ display: "flex", gap: 80, marginTop: 30 }}>
          <TruthTable gate="OR" frame={frame - 30} fps={fps} color={colors.or} />
          {frame > 100 && <GateDiagram gate="OR" frame={frame - 100} fps={fps} color={colors.or} />}
        </div>
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene4Bias: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#7c3aed" color2="#6366f1" color3="#1e1b4b" />
      <Particles count={30} color={colors.secondary} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 100,
          gap: 50,
        }}
      >
        <GlowText fontSize={64} glowColor={colors.secondary}>
          AND vs OR: 편향의 차이
        </GlowText>

        <BiasComparison frame={frame - 30} fps={fps} />

        {frame > 200 && (
          <Card width={900}>
            <div style={{ fontSize: 32, color: colors.white, textAlign: "center" }}>
              편향 = <span style={{ color: colors.accent }}>"판단의 엄격함"</span> 조절
            </div>
          </Card>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene5Not: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#db2777" color2="#be185d" color3="#1e1b4b" />
      <Particles count={30} color={colors.not} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 80,
          gap: 40,
        }}
      >
        <GlowText fontSize={64} glowColor={colors.not}>
          NOT 게이트
        </GlowText>

        <div
          style={{
            fontSize: 32,
            color: colors.gray[300],
            opacity: fadeIn(frame, 0, 30),
          }}
        >
          "입력을 반전!"
        </div>

        <div style={{ display: "flex", gap: 80, marginTop: 30 }}>
          <TruthTable gate="NOT" frame={frame - 30} fps={fps} color={colors.not} />
          {frame > 80 && <GateDiagram gate="NOT" frame={frame - 80} fps={fps} color={colors.not} />}
        </div>

        {frame > 200 && (
          <Card width={800}>
            <div style={{ fontSize: 28, color: colors.white, textAlign: "center" }}>
              <span style={{ color: colors.danger }}>음수 가중치(-1)</span> = 입력을 뒤집는 브레이크!
            </div>
          </Card>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene6Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#059669" color2="#047857" color3="#0f172a" />
      <Particles count={35} color={colors.success} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 100,
          gap: 50,
        }}
      >
        <GlowText fontSize={56} glowColor={colors.success}>
          세 게이트 비교
        </GlowText>

        <ThreeGatesComparison frame={frame - 30} fps={fps} />

        {frame > 200 && (
          <Card width={1000}>
            <div style={{ fontSize: 32, color: colors.white, textAlign: "center" }}>
              같은 구조, <span style={{ color: colors.accent }}>숫자만 바꾸면</span> 완전히 다른 논리 연산!
            </div>
          </Card>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summaryItems = [
    { text: "AND: 둘 다 참 → 참 (편향 -0.7, 엄격)", color: colors.and },
    { text: "OR: 하나만 참 → 참 (편향 -0.2, 관대)", color: colors.or },
    { text: "NOT: 입력 반전 (음수 가중치 -1)", color: colors.not },
    { text: "편향 = 판단의 엄격함 조절", color: colors.secondary },
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#1e3a8a" color2="#3730a3" color3="#0f172a" />
      <Particles count={40} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 100,
          gap: 30,
        }}
      >
        <GlowText fontSize={64} glowColor={colors.primary}>
          오늘 배운 내용
        </GlowText>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 30,
          }}
        >
          {summaryItems.map((item, i) => {
            const itemOpacity = fadeIn(frame, 30 + i * 40, 30);
            const itemY = slideUp(frame, 30 + i * 40, 30, 30);

            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateY(${itemY}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "20px 40px",
                  backgroundColor: `${colors.gray[800]}cc`,
                  borderRadius: 15,
                  border: `2px solid ${item.color}40`,
                }}
              >
                <span style={{ fontSize: 32, fontWeight: "bold", color: item.color }}>
                  ✓
                </span>
                <span style={{ fontSize: 26, color: colors.white }}>
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>

        {frame > 250 && (
          <div
            style={{
              marginTop: 40,
              opacity: fadeIn(frame, 250, 30),
              fontSize: 36,
              color: colors.danger,
              fontWeight: "bold",
            }}
          >
            다음 시간: XOR 문제와 한계!
          </div>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// ============ MAIN COMPOSITION ============
export const Lesson1_5Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      {/* Audio tracks */}
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Audio src={staticFile("audio/lesson-1-5/scene1_intro.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene2_and.start} durationInFrames={SCENE_TIMINGS.scene2_and.duration}>
        <Audio src={staticFile("audio/lesson-1-5/scene2_and.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene3_or.start} durationInFrames={SCENE_TIMINGS.scene3_or.duration}>
        <Audio src={staticFile("audio/lesson-1-5/scene3_or.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene4_bias.start} durationInFrames={SCENE_TIMINGS.scene4_bias.duration}>
        <Audio src={staticFile("audio/lesson-1-5/scene4_bias.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene5_not.start} durationInFrames={SCENE_TIMINGS.scene5_not.duration}>
        <Audio src={staticFile("audio/lesson-1-5/scene5_not.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene6_comparison.start} durationInFrames={SCENE_TIMINGS.scene6_comparison.duration}>
        <Audio src={staticFile("audio/lesson-1-5/scene6_comparison.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Audio src={staticFile("audio/lesson-1-5/scene7_outro.mp3")} />
      </Sequence>

      {/* Scene components */}
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene2_and.start} durationInFrames={SCENE_TIMINGS.scene2_and.duration}>
        <Scene2And />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene3_or.start} durationInFrames={SCENE_TIMINGS.scene3_or.duration}>
        <Scene3Or />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene4_bias.start} durationInFrames={SCENE_TIMINGS.scene4_bias.duration}>
        <Scene4Bias />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene5_not.start} durationInFrames={SCENE_TIMINGS.scene5_not.duration}>
        <Scene5Not />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene6_comparison.start} durationInFrames={SCENE_TIMINGS.scene6_comparison.duration}>
        <Scene6Comparison />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
