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
  scene1_intro: { duration: 642, start: 0 },
  scene2_xor: { duration: 941, start: 642 },
  scene3_problem: { duration: 877, start: 1583 },
  scene4_linear: { duration: 1211, start: 2460 },
  scene5_history: { duration: 814, start: 3671 },
  scene6_solution: { duration: 757, start: 4485 },
  scene7_outro: { duration: 822, start: 5242 },
};

export const LESSON_1_6_DURATION = 6064;

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
  xor: "#ec4899",
  winter: "#0ea5e9",
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

// ============ XOR TRUTH TABLE ============
const XORTruthTable: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const data = [
    { x1: 0, x2: 0, out: 0 },
    { x1: 0, x2: 1, out: 1 },
    { x1: 1, x2: 0, out: 1 },
    { x1: 1, x2: 1, out: 0 },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        backgroundColor: `${colors.gray[800]}dd`,
        padding: 30,
        borderRadius: 20,
        border: `3px solid ${colors.xor}`,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", gap: 30, marginBottom: 15 }}>
        <span style={{ width: 80, fontSize: 28, fontWeight: "bold", color: colors.gray[300], textAlign: "center" }}>
          x1
        </span>
        <span style={{ width: 80, fontSize: 28, fontWeight: "bold", color: colors.gray[300], textAlign: "center" }}>
          x2
        </span>
        <span style={{ width: 100, fontSize: 28, fontWeight: "bold", color: colors.xor, textAlign: "center" }}>
          XOR
        </span>
        <span style={{ width: 150, fontSize: 24, fontWeight: "bold", color: colors.gray[500], textAlign: "center" }}>
          같음/다름
        </span>
      </div>

      {/* Rows */}
      {data.map((row, i) => {
        const rowOpacity = fadeIn(frame, i * 25, 25);
        const isSame = row.x1 === row.x2;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 30,
              opacity: rowOpacity,
              padding: "10px 0",
              borderBottom: i < 3 ? `1px solid ${colors.gray[700]}` : "none",
            }}
          >
            <span style={{ width: 80, fontSize: 32, color: colors.white, textAlign: "center" }}>
              {row.x1}
            </span>
            <span style={{ width: 80, fontSize: 32, color: colors.white, textAlign: "center" }}>
              {row.x2}
            </span>
            <span
              style={{
                width: 100,
                fontSize: 36,
                fontWeight: "bold",
                color: row.out === 1 ? colors.success : colors.danger,
                textAlign: "center",
              }}
            >
              {row.out}
            </span>
            <span
              style={{
                width: 150,
                fontSize: 24,
                color: isSame ? colors.danger : colors.success,
                textAlign: "center",
              }}
            >
              {isSame ? "같음" : "다름!"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ============ XOR COORDINATE GRAPH ============
const XORGraph: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const points = [
    { x: 0, y: 0, out: 0 },
    { x: 0, y: 1, out: 1 },
    { x: 1, y: 0, out: 1 },
    { x: 1, y: 1, out: 0 },
  ];

  const graphSize = 400;
  const padding = 60;

  // Animate failed line attempts
  const lineAngle = (frame % 360) * (Math.PI / 180);
  const lineX1 = graphSize / 2 + Math.cos(lineAngle) * 250;
  const lineY1 = graphSize / 2 + Math.sin(lineAngle) * 250;
  const lineX2 = graphSize / 2 - Math.cos(lineAngle) * 250;
  const lineY2 = graphSize / 2 - Math.sin(lineAngle) * 250;

  return (
    <div
      style={{
        position: "relative",
        width: graphSize + padding * 2,
        height: graphSize + padding * 2,
        backgroundColor: `${colors.gray[800]}cc`,
        borderRadius: 20,
        border: `3px solid ${colors.xor}`,
      }}
    >
      {/* Grid */}
      <svg
        style={{ position: "absolute", top: 0, left: 0 }}
        width={graphSize + padding * 2}
        height={graphSize + padding * 2}
      >
        {/* Axis lines */}
        <line
          x1={padding}
          y1={padding + graphSize}
          x2={padding + graphSize}
          y2={padding + graphSize}
          stroke={colors.gray[500]}
          strokeWidth={2}
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={padding + graphSize}
          stroke={colors.gray[500]}
          strokeWidth={2}
        />

        {/* Grid lines */}
        <line
          x1={padding + graphSize / 2}
          y1={padding}
          x2={padding + graphSize / 2}
          y2={padding + graphSize}
          stroke={colors.gray[700]}
          strokeWidth={1}
          strokeDasharray="5,5"
        />
        <line
          x1={padding}
          y1={padding + graphSize / 2}
          x2={padding + graphSize}
          y2={padding + graphSize / 2}
          stroke={colors.gray[700]}
          strokeWidth={1}
          strokeDasharray="5,5"
        />

        {/* Failed separation line */}
        {frame > 60 && (
          <line
            x1={padding + lineX1}
            y1={padding + lineY1}
            x2={padding + lineX2}
            y2={padding + lineY2}
            stroke={colors.accent}
            strokeWidth={3}
            opacity={0.6}
            strokeDasharray="10,5"
          />
        )}
      </svg>

      {/* Points */}
      {points.map((point, i) => {
        const scale = scaleIn(frame, 30, i * 15);
        const px = padding + point.x * graphSize;
        const py = padding + (1 - point.y) * graphSize;
        const isOne = point.out === 1;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px - 25,
              top: py - 25,
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: isOne ? colors.success : colors.danger,
              transform: `scale(${scale})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 20px ${isOne ? colors.success : colors.danger}80`,
            }}
          >
            <span style={{ fontSize: 24, fontWeight: "bold", color: colors.white }}>
              {point.out}
            </span>
          </div>
        );
      })}

      {/* Labels */}
      <span style={{ position: "absolute", bottom: 15, right: padding + graphSize / 2 - 20, fontSize: 24, color: colors.gray[300] }}>
        x1
      </span>
      <span style={{ position: "absolute", left: 15, top: padding + graphSize / 2 - 12, fontSize: 24, color: colors.gray[300] }}>
        x2
      </span>
    </div>
  );
};

// ============ AI WINTER VISUALIZATION ============
const AIWinter: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const snowflakes = Array.from({ length: 30 }).map((_, i) => ({
    x: (i * 67) % 600,
    delay: i * 10,
  }));

  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 300,
        backgroundColor: `${colors.winter}20`,
        borderRadius: 20,
        overflow: "hidden",
        border: `3px solid ${colors.winter}`,
      }}
    >
      {/* Snowflakes */}
      {snowflakes.map((flake, i) => {
        const y = ((frame - flake.delay) * 2) % 350 - 50;
        const opacity = fadeIn(frame, 0, 30);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: flake.x,
              top: y,
              fontSize: 20,
              opacity: opacity * 0.7,
            }}
          >
            ❄️
          </div>
        );
      })}

      {/* Text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 48, fontWeight: "bold", color: colors.winter }}>
          AI의 겨울
        </span>
        <span style={{ fontSize: 28, color: colors.gray[300] }}>
          1969~1980년대
        </span>
      </div>
    </div>
  );
};

// ============ MLP SOLUTION ============
const MLPSolution: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const layerScale = (delay: number) => scaleIn(frame, fps, delay);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 40,
      }}
    >
      {/* Input Layer */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
          transform: `scale(${layerScale(0)})`,
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: colors.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          x1
        </div>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: colors.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          x2
        </div>
      </div>

      {/* Arrow */}
      <div style={{ fontSize: 40, color: colors.gray[500], transform: `scale(${layerScale(30)})` }}>→</div>

      {/* Hidden Layer */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          transform: `scale(${layerScale(60)})`,
        }}
      >
        <div
          style={{
            padding: "15px 25px",
            backgroundColor: colors.success,
            borderRadius: 15,
            fontSize: 20,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          AND
        </div>
        <div
          style={{
            padding: "15px 25px",
            backgroundColor: colors.danger,
            borderRadius: 15,
            fontSize: 20,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          NAND
        </div>
      </div>

      {/* Arrow */}
      <div style={{ fontSize: 40, color: colors.gray[500], transform: `scale(${layerScale(90)})` }}>→</div>

      {/* Output Layer */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
          transform: `scale(${layerScale(120)})`,
        }}
      >
        <div
          style={{
            padding: "20px 40px",
            backgroundColor: colors.accent,
            borderRadius: 15,
            fontSize: 24,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          OR
        </div>
      </div>

      {/* Arrow */}
      <div style={{ fontSize: 40, color: colors.gray[500], transform: `scale(${layerScale(150)})` }}>→</div>

      {/* Result */}
      <div
        style={{
          padding: "20px 40px",
          backgroundColor: colors.xor,
          borderRadius: 20,
          fontSize: 32,
          fontWeight: "bold",
          color: colors.white,
          transform: `scale(${layerScale(180)})`,
          boxShadow: `0 0 30px ${colors.xor}80`,
        }}
      >
        XOR!
      </div>
    </div>
  );
};

// ============ SCENE COMPONENTS ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = scaleIn(frame, fps, 0);

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#831843" color2="#be185d" color3="#1e1b4b" />
      <Particles count={40} color={colors.xor} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 40,
        }}
      >
        <div style={{ transform: `scale(${titleScale})` }}>
          <GlowText fontSize={80} glowColor={colors.danger}>
            XOR 문제와 한계
          </GlowText>
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 30, 30),
            fontSize: 36,
            color: colors.gray[300],
          }}
        >
          퍼셉트론이 풀 수 없는 문제
        </div>

        {frame > 90 && (
          <div
            style={{
              opacity: fadeIn(frame, 90, 30),
              padding: "20px 50px",
              backgroundColor: `${colors.danger}30`,
              borderRadius: 20,
              border: `3px solid ${colors.danger}`,
            }}
          >
            <span style={{ fontSize: 32, color: colors.danger, fontWeight: "bold" }}>
              ⚠️ AI의 겨울이 시작되다
            </span>
          </div>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene2XOR: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#db2777" color2="#be185d" color3="#1e1b4b" />
      <Particles count={30} color={colors.xor} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 80,
          gap: 40,
        }}
      >
        <GlowText fontSize={64} glowColor={colors.xor}>
          XOR이란?
        </GlowText>

        <div
          style={{
            fontSize: 36,
            color: colors.gray[300],
            opacity: fadeIn(frame, 0, 30),
          }}
        >
          "둘이 <span style={{ color: colors.success }}>다를</span> 때만 참!"
        </div>

        <XORTruthTable frame={frame - 30} fps={fps} />
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene3Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#b91c1c" color2="#991b1b" color3="#1e1b4b" />
      <Particles count={30} color={colors.danger} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 80,
          gap: 40,
        }}
      >
        <GlowText fontSize={64} glowColor={colors.danger}>
          문제 발생!
        </GlowText>

        <Card width={800}>
          <div style={{ fontSize: 28, color: colors.white, textAlign: "center", lineHeight: 1.6 }}>
            <div style={{ opacity: fadeIn(frame, 0, 30) }}>
              퍼셉트론으로 XOR을 풀어볼게요...
            </div>
            {frame > 60 && (
              <div style={{ marginTop: 20, color: colors.danger, opacity: fadeIn(frame, 60, 30) }}>
                ❌ 아무리 시도해도 안 돼요!
              </div>
            )}
            {frame > 120 && (
              <div style={{ marginTop: 20, opacity: fadeIn(frame, 120, 30) }}>
                수학적으로 증명하면, <span style={{ color: colors.accent }}>조건이 모순</span>이에요!
              </div>
            )}
          </div>
        </Card>

        {frame > 180 && (
          <div
            style={{
              opacity: fadeIn(frame, 180, 30),
              fontSize: 40,
              color: colors.danger,
              fontWeight: "bold",
            }}
          >
            😱 해결 불가능!
          </div>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene4Linear: React.FC = () => {
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
          paddingTop: 80,
          gap: 30,
        }}
      >
        <GlowText fontSize={56} glowColor={colors.secondary}>
          선형 분리 불가능
        </GlowText>

        <div
          style={{
            fontSize: 28,
            color: colors.gray[300],
            opacity: fadeIn(frame, 0, 30),
          }}
        >
          직선 하나로는 절대 나눌 수 없어요!
        </div>

        <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
          <XORGraph frame={frame - 30} fps={fps} />

          {frame > 150 && (
            <Card width={400}>
              <div style={{ fontSize: 26, color: colors.white, textAlign: "center" }}>
                <div style={{ color: colors.danger }}>● 빨강 = 출력 0</div>
                <div style={{ color: colors.success, marginTop: 15 }}>● 초록 = 출력 1</div>
                <div style={{ marginTop: 25, color: colors.accent }}>
                  대각선으로 배치되어<br/>직선으로 분리 불가!
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene5History: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#0369a1" color2="#0284c7" color3="#0f172a" />
      <Particles count={40} color={colors.winter} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 80,
          gap: 40,
        }}
      >
        <GlowText fontSize={56} glowColor={colors.winter}>
          AI 역사에 미친 영향
        </GlowText>

        <AIWinter frame={frame - 30} fps={fps} />

        {frame > 120 && (
          <Card width={900}>
            <div style={{ fontSize: 28, color: colors.white, textAlign: "center" }}>
              1969년, 민스키와 페퍼트가 한계를 책으로 발표<br/>
              <span style={{ color: colors.danger }}>"퍼셉트론은 XOR조차 못 푼다!"</span><br/>
              → AI 연구 투자가 급감, 약 10년간 침체
            </div>
          </Card>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene6Solution: React.FC = () => {
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
          paddingTop: 80,
          gap: 40,
        }}
      >
        <GlowText fontSize={56} glowColor={colors.success}>
          해결책: 다층 퍼셉트론!
        </GlowText>

        <div
          style={{
            fontSize: 32,
            color: colors.gray[300],
            opacity: fadeIn(frame, 0, 30),
          }}
        >
          퍼셉트론을 여러 층으로 쌓으면?
        </div>

        <MLPSolution frame={frame - 60} fps={fps} />

        {frame > 250 && (
          <div
            style={{
              opacity: fadeIn(frame, 250, 30),
              fontSize: 28,
              color: colors.accent,
              fontWeight: "bold",
            }}
          >
            직선 여러 개 조합 → 어떤 경계도 가능!
          </div>
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
    { text: "XOR: 둘이 다를 때만 참", color: colors.xor },
    { text: "퍼셉트론 하나 = 직선 하나 = XOR 불가", color: colors.danger },
    { text: "선형 분리 불가능 문제", color: colors.secondary },
    { text: "해결책: 다층 퍼셉트론 (MLP)", color: colors.success },
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
            marginTop: 20,
          }}
        >
          {summaryItems.map((item, i) => {
            const itemOpacity = fadeIn(frame, 30 + i * 35, 30);
            const itemY = slideUp(frame, 30 + i * 35, 30, 30);

            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateY(${itemY}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "18px 40px",
                  backgroundColor: `${colors.gray[800]}cc`,
                  borderRadius: 15,
                  border: `2px solid ${item.color}40`,
                }}
              >
                <span style={{ fontSize: 30, fontWeight: "bold", color: item.color }}>
                  ✓
                </span>
                <span style={{ fontSize: 26, color: colors.white }}>
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>

        {frame > 220 && (
          <div
            style={{
              marginTop: 30,
              opacity: fadeIn(frame, 220, 30),
              fontSize: 36,
              color: colors.accent,
              fontWeight: "bold",
            }}
          >
            다음 시간: 다층 퍼셉트론 (MLP)
          </div>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// ============ MAIN COMPOSITION ============
export const Lesson1_6Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      {/* Audio tracks */}
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Audio src={staticFile("audio/lesson-1-6/scene1_intro.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene2_xor.start} durationInFrames={SCENE_TIMINGS.scene2_xor.duration}>
        <Audio src={staticFile("audio/lesson-1-6/scene2_xor.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene3_problem.start} durationInFrames={SCENE_TIMINGS.scene3_problem.duration}>
        <Audio src={staticFile("audio/lesson-1-6/scene3_problem.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene4_linear.start} durationInFrames={SCENE_TIMINGS.scene4_linear.duration}>
        <Audio src={staticFile("audio/lesson-1-6/scene4_linear.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene5_history.start} durationInFrames={SCENE_TIMINGS.scene5_history.duration}>
        <Audio src={staticFile("audio/lesson-1-6/scene5_history.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene6_solution.start} durationInFrames={SCENE_TIMINGS.scene6_solution.duration}>
        <Audio src={staticFile("audio/lesson-1-6/scene6_solution.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Audio src={staticFile("audio/lesson-1-6/scene7_outro.mp3")} />
      </Sequence>

      {/* Scene components */}
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene2_xor.start} durationInFrames={SCENE_TIMINGS.scene2_xor.duration}>
        <Scene2XOR />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene3_problem.start} durationInFrames={SCENE_TIMINGS.scene3_problem.duration}>
        <Scene3Problem />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene4_linear.start} durationInFrames={SCENE_TIMINGS.scene4_linear.duration}>
        <Scene4Linear />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene5_history.start} durationInFrames={SCENE_TIMINGS.scene5_history.duration}>
        <Scene5History />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene6_solution.start} durationInFrames={SCENE_TIMINGS.scene6_solution.duration}>
        <Scene6Solution />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
