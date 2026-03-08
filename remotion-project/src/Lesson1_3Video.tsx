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
  scene1_intro: { duration: 805, start: 0 },
  scene2_input: { duration: 1037, start: 805 },
  scene3_weight: { duration: 1286, start: 1842 },
  scene4_bias: { duration: 1357, start: 3128 },
  scene5_formula: { duration: 1082, start: 4485 },
  scene6_activation: { duration: 1293, start: 5567 },
  scene7_outro: { duration: 989, start: 6860 },
};

export const LESSON_1_3_DURATION = 7849;

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
  input: "#06b6d4",
  weight: "#ec4899",
  bias: "#f97316",
  activation: "#a855f7",
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
        const opacity = 0.1 + Math.sin((frame + i * 20) / 30) * 0.1;

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
              opacity,
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
}> = ({ children, fontSize = 72, color = colors.white, glowColor = colors.primary }) => (
  <span
    style={{
      fontSize,
      fontWeight: "bold",
      color,
      textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}60`,
    }}
  >
    {children}
  </span>
);

const Card: React.FC<{
  children: React.ReactNode;
  width?: number;
  borderColor?: string;
  glow?: boolean;
  style?: React.CSSProperties;
}> = ({ children, width = 400, borderColor = colors.primary, glow = true, style = {} }) => (
  <div
    style={{
      width,
      padding: 30,
      backgroundColor: `${colors.gray[900]}ee`,
      borderRadius: 24,
      border: `3px solid ${borderColor}`,
      boxShadow: glow ? `0 0 40px ${borderColor}40, 0 20px 60px rgba(0,0,0,0.5)` : "0 20px 60px rgba(0,0,0,0.5)",
      backdropFilter: "blur(10px)",
      ...style,
    }}
  >
    {children}
  </div>
);

// ============ PERCEPTRON DIAGRAM ============
const PerceptronDiagram: React.FC<{ highlightPart?: "input" | "weight" | "bias" | "activation" | "all" }> = ({
  highlightPart = "all"
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getPartStyle = (part: string) => {
    if (highlightPart === "all") return { opacity: 1, filter: "none" };
    if (highlightPart === part) return { opacity: 1, filter: "none" };
    return { opacity: 0.3, filter: "grayscale(100%)" };
  };

  return (
    <div style={{ position: "relative", width: 900, height: 400 }}>
      {/* Input nodes */}
      <div style={{ ...getPartStyle("input"), position: "absolute", left: 0, top: 50 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              marginBottom: 50,
              display: "flex",
              alignItems: "center",
              gap: 20,
              transform: `scale(${scaleIn(frame, fps, i * 15)})`,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${colors.input} 0%, ${colors.primary} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                color: colors.white,
                fontWeight: "bold",
                boxShadow: `0 0 30px ${colors.input}60`,
              }}
            >
              x{i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Weight connections */}
      <svg style={{ ...getPartStyle("weight"), position: "absolute", left: 80, top: 0, width: 400, height: 400 }}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <line
              x1={0}
              y1={90 + i * 130}
              x2={280}
              y2={200}
              stroke={colors.weight}
              strokeWidth={4}
              strokeDasharray={highlightPart === "weight" ? "none" : "none"}
            />
            <text x={140} y={130 + i * 50} fill={colors.weight} fontSize={24} fontWeight="bold">
              w{i + 1}
            </text>
          </g>
        ))}
      </svg>

      {/* Sum node */}
      <div
        style={{
          ...getPartStyle("bias"),
          position: "absolute",
          left: 350,
          top: 150,
          transform: `scale(${scaleIn(frame, fps, 60)})`,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.bias} 0%, ${colors.accent} 100%)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            color: colors.white,
            fontWeight: "bold",
            boxShadow: `0 0 40px ${colors.bias}60`,
          }}
        >
          <span>Σ + b</span>
        </div>
      </div>

      {/* Activation function */}
      <div
        style={{
          ...getPartStyle("activation"),
          position: "absolute",
          left: 550,
          top: 160,
          transform: `scale(${scaleIn(frame, fps, 90)})`,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${colors.activation} 0%, ${colors.secondary} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            color: colors.white,
            fontWeight: "bold",
            boxShadow: `0 0 40px ${colors.activation}60`,
          }}
        >
          f(z)
        </div>
      </div>

      {/* Arrow to activation */}
      <svg style={{ ...getPartStyle("activation"), position: "absolute", left: 470, top: 200, width: 100, height: 30 }}>
        <line x1={0} y1={15} x2={60} y2={15} stroke={colors.activation} strokeWidth={4} />
        <polygon points="60,5 80,15 60,25" fill={colors.activation} />
      </svg>

      {/* Output */}
      <div
        style={{
          ...getPartStyle("activation"),
          position: "absolute",
          left: 700,
          top: 160,
          transform: `scale(${scaleIn(frame, fps, 120)})`,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            color: colors.white,
            fontWeight: "bold",
            boxShadow: `0 0 40px ${colors.success}60`,
          }}
        >
          y
        </div>
      </div>

      {/* Arrow to output */}
      <svg style={{ ...getPartStyle("activation"), position: "absolute", left: 650, top: 200, width: 60, height: 30 }}>
        <line x1={0} y1={15} x2={30} y2={15} stroke={colors.success} strokeWidth={4} />
        <polygon points="30,5 50,15 30,25" fill={colors.success} />
      </svg>
    </div>
  );
};

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 30, 40);
  const titleY = slideUp(frame, 30, 40);

  const parts = [
    { name: "입력", icon: "📥", color: colors.input },
    { name: "가중치", icon: "⚖️", color: colors.weight },
    { name: "편향", icon: "🎯", color: colors.bias },
    { name: "활성화 함수", icon: "⚡", color: colors.activation },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-3/scene1_intro.mp3")} />
      <AnimatedBackground color1="#1e3a5f" color2={colors.secondary} color3="#0f172a" />
      <Particles count={40} />

      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 100,
          opacity: fadeIn(frame, 80, 30),
          transform: `scale(${scaleIn(frame, fps, 80)})`,
        }}
      >
        <div
          style={{
            padding: "15px 40px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 20,
            border: `2px solid ${colors.white}40`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 1 - Lesson 3</span>
        </div>
      </div>

      {/* 메인 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div style={{ marginBottom: 30 }}>
          <span style={{ fontSize: 100, marginRight: 20 }}>🔧</span>
          <GlowText fontSize={80} glowColor={colors.secondary}>퍼셉트론 구조</GlowText>
        </div>
        <div style={{ marginTop: 20 }}>
          <span style={{ fontSize: 38, color: colors.gray[300] }}>
            입력, 가중치, 편향, 활성화 함수 완벽 이해
          </span>
        </div>
      </div>

      {/* 4가지 부품 카드 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {parts.map((part, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 200 + i * 30, 30),
              transform: `scale(${scaleIn(frame, fps, 200 + i * 30)})`,
            }}
          >
            <Card width={280} borderColor={part.color}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 60 }}>{part.icon}</span>
                <div style={{ marginTop: 15, fontSize: 28, color: part.color, fontWeight: "bold" }}>
                  {part.name}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: INPUT ============
const Scene2Input: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const examples = [
    { domain: "스팸 메일", input: "'무료' 있음 → 1", icon: "📧" },
    { domain: "이미지 인식", input: "픽셀 밝기 (0~255)", icon: "🖼️" },
    { domain: "집값 예측", input: "면적, 방 개수", icon: "🏠" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-3/scene2_input.mp3")} />
      <AnimatedBackground color1="#0e4429" color2={colors.input} color3="#0f172a" />
      <Particles count={30} color={colors.input} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <span style={{ fontSize: 60, marginRight: 20 }}>📥</span>
        <GlowText fontSize={64} glowColor={colors.input}>입력 (Input)</GlowText>
      </div>

      {/* 메인 설명 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 60, 30),
        }}
      >
        <span style={{ fontSize: 36, color: colors.gray[300] }}>
          외부에서 받아들이는 데이터 - 퍼셉트론의 "눈과 귀"
        </span>
      </div>

      {/* 예시 카드 */}
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {examples.map((ex, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 120 + i * 40, 30),
              transform: `scale(${scaleIn(frame, fps, 120 + i * 40)})`,
            }}
          >
            <Card width={350} borderColor={colors.input}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 64 }}>{ex.icon}</span>
                <div style={{ marginTop: 15, fontSize: 26, color: colors.input, fontWeight: "bold" }}>
                  {ex.domain}
                </div>
                <div style={{ marginTop: 15, fontSize: 22, color: colors.gray[300] }}>
                  {ex.input}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 중요 포인트 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(frame, 300, 40),
        }}
      >
        <div
          style={{
            padding: "25px 50px",
            background: `linear-gradient(135deg, ${colors.danger}30 0%, ${colors.accent}30 100%)`,
            borderRadius: 20,
            border: `3px solid ${colors.accent}`,
          }}
        >
          <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
            ⚠️ 입력값은 학습해도 변하지 않아요!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: WEIGHT ============
const Scene3Weight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const weights = [
    { word: "'무료'", value: "2.0", meaning: "스팸에 자주 등장", color: colors.danger },
    { word: "'회의'", value: "-0.5", meaning: "정상 메일 가능성 높음", color: colors.success },
    { word: "'안녕'", value: "0.1", meaning: "구분 능력 낮음", color: colors.gray[500] },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-3/scene3_weight.mp3")} />
      <AnimatedBackground color1="#831843" color2={colors.weight} color3="#0f172a" />
      <Particles count={30} color={colors.weight} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <span style={{ fontSize: 60, marginRight: 20 }}>⚖️</span>
        <GlowText fontSize={64} glowColor={colors.weight}>가중치 (Weight)</GlowText>
      </div>

      {/* 맛집 비유 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "5%",
          opacity: fadeIn(frame, 60, 30),
        }}
      >
        <Card width={500} borderColor={colors.weight}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 48 }}>🍽️</span>
            <div style={{ marginTop: 10, fontSize: 24, color: colors.white }}>맛집 추천 비유</div>
            <div style={{ marginTop: 20, fontSize: 20, color: colors.gray[300], lineHeight: 1.6 }}>
              미식가 친구 → 높은 가중치 (신뢰도 높음)<br />
              아무거나 잘 먹는 친구 → 낮은 가중치
            </div>
          </div>
        </Card>
      </div>

      {/* 스팸 필터 예시 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: "5%",
          opacity: fadeIn(frame, 150, 30),
        }}
      >
        <Card width={600} borderColor={colors.weight}>
          <div style={{ fontSize: 26, color: colors.weight, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
            📧 스팸 필터 가중치 예시
          </div>
          {weights.map((w, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 0",
                borderBottom: i < weights.length - 1 ? `1px solid ${colors.gray[700]}` : "none",
                opacity: fadeIn(frame, 200 + i * 40, 30),
              }}
            >
              <span style={{ fontSize: 24, color: colors.white }}>{w.word}</span>
              <span style={{ fontSize: 28, color: w.color, fontWeight: "bold" }}>{w.value}</span>
              <span style={{ fontSize: 18, color: colors.gray[300] }}>{w.meaning}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <div
          style={{
            padding: "25px 50px",
            background: `linear-gradient(135deg, ${colors.weight}40 0%, ${colors.secondary}40 100%)`,
            borderRadius: 20,
            border: `3px solid ${colors.weight}`,
          }}
        >
          <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
            🎯 가중치는 AI가 학습하면서 스스로 조절해요!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: BIAS ============
const Scene4Bias: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-3/scene4_bias.mp3")} />
      <AnimatedBackground color1="#7c2d12" color2={colors.bias} color3="#0f172a" />
      <Particles count={30} color={colors.bias} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <span style={{ fontSize: 60, marginRight: 20 }}>🎯</span>
        <GlowText fontSize={64} glowColor={colors.bias}>편향 (Bias)</GlowText>
      </div>

      {/* 심사위원 비유 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame, 100, 40),
            transform: `scale(${scaleIn(frame, fps, 100)})`,
          }}
        >
          <Card width={400} borderColor={colors.danger}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 80 }}>😠</span>
              <div style={{ marginTop: 15, fontSize: 28, color: colors.danger, fontWeight: "bold" }}>
                까탈스러운 심사위원
              </div>
              <div style={{ marginTop: 20, fontSize: 22, color: colors.gray[300] }}>
                기본: "불합격"에서 시작<br />
                정말 잘해야만 합격
              </div>
              <div style={{ marginTop: 15, fontSize: 24, color: colors.danger, fontWeight: "bold" }}>
                편향 = -5
              </div>
            </div>
          </Card>
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 180, 40),
            transform: `scale(${scaleIn(frame, fps, 180)})`,
          }}
        >
          <Card width={400} borderColor={colors.success}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 80 }}>😊</span>
              <div style={{ marginTop: 15, fontSize: 28, color: colors.success, fontWeight: "bold" }}>
                너그러운 심사위원
              </div>
              <div style={{ marginTop: 20, fontSize: 22, color: colors.gray[300] }}>
                기본: "합격"에서 시작<br />
                심각한 실수만 불합격
              </div>
              <div style={{ marginTop: 15, fontSize: 24, color: colors.success, fontWeight: "bold" }}>
                편향 = +2
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 핵심 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 300, 40),
        }}
      >
        <div style={{ fontSize: 36, color: colors.white, marginBottom: 20 }}>
          편향 = 퍼셉트론의 <span style={{ color: colors.bias, fontWeight: "bold" }}>기본 성향</span> (출발점)
        </div>
        <div style={{ fontSize: 28, color: colors.gray[300] }}>
          "아무 정보가 없을 때 어느 쪽으로 기울어져 있느냐"
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: FORMULA ============
const Scene5Formula: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-3/scene5_formula.mp3")} />
      <AnimatedBackground color1="#1e3a5f" color2="#4f46e5" color3="#0f172a" />
      <Particles count={30} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <span style={{ fontSize: 60, marginRight: 20 }}>📐</span>
        <GlowText fontSize={64} glowColor={colors.primary}>가중합 공식</GlowText>
      </div>

      {/* 공식 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 60, 40),
          transform: `scale(${scaleIn(frame, fps, 60)})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "40px 80px",
            background: `linear-gradient(135deg, ${colors.gray[800]} 0%, ${colors.gray[900]} 100%)`,
            borderRadius: 30,
            border: `4px solid ${colors.primary}`,
            boxShadow: `0 0 60px ${colors.primary}40`,
          }}
        >
          <span style={{ fontSize: 56, color: colors.white, fontFamily: "monospace" }}>
            z = w₁x₁ + w₂x₂ + ... + b
          </span>
        </div>
      </div>

      {/* 예시 계산 */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(frame, 180, 40),
        }}
      >
        <Card width={900} borderColor={colors.accent}>
          <div style={{ fontSize: 28, color: colors.accent, fontWeight: "bold", marginBottom: 25, textAlign: "center" }}>
            📧 스팸 메일 계산 예시
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 24, color: colors.gray[300] }}>"무료" 있음 (x₁ = 1)</span>
            <span style={{ fontSize: 24, color: colors.weight }}>w₁ = 2.0</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 24, color: colors.gray[300] }}>"당첨" 있음 (x₂ = 1)</span>
            <span style={{ fontSize: 24, color: colors.weight }}>w₂ = 1.8</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}>
            <span style={{ fontSize: 24, color: colors.gray[300] }}>편향</span>
            <span style={{ fontSize: 24, color: colors.bias }}>b = -3.0</span>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              background: `${colors.primary}20`,
              borderRadius: 15,
              opacity: fadeIn(frame, 280, 30),
            }}
          >
            <span style={{ fontSize: 32, color: colors.white }}>
              z = (2.0 × 1) + (1.8 × 1) + (-3.0) = <span style={{ color: colors.success, fontWeight: "bold" }}>0.8</span>
            </span>
          </div>
        </Card>
      </div>

      {/* 해석 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 350, 40),
        }}
      >
        <span style={{ fontSize: 30, color: colors.gray[300] }}>
          z &gt; 0 → 스팸 가능성 높음 | z &lt; 0 → 정상 메일 가능성 높음
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: ACTIVATION ============
const Scene6Activation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const functions = [
    {
      name: "계단 함수",
      icon: "📶",
      formula: "0 또는 1",
      desc: "딱딱한 판단",
      color: colors.primary,
    },
    {
      name: "시그모이드",
      icon: "📈",
      formula: "0~1 사이",
      desc: "부드러운 확률",
      color: colors.success,
    },
    {
      name: "ReLU",
      icon: "⚡",
      formula: "max(0, x)",
      desc: "딥러닝 최다 사용",
      color: colors.accent,
    },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-3/scene6_activation.mp3")} />
      <AnimatedBackground color1="#4c1d95" color2={colors.activation} color3="#0f172a" />
      <Particles count={30} color={colors.activation} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <span style={{ fontSize: 60, marginRight: 20 }}>⚡</span>
        <GlowText fontSize={64} glowColor={colors.activation}>활성화 함수</GlowText>
      </div>

      {/* 설명 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 60, 30),
        }}
      >
        <span style={{ fontSize: 32, color: colors.gray[300] }}>
          가중합(z)을 최종 출력으로 변환하는 "판정 기계"
        </span>
      </div>

      {/* 활성화 함수 카드 */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {functions.map((f, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 150 + i * 60, 40),
              transform: `scale(${scaleIn(frame, fps, 150 + i * 60)})`,
            }}
          >
            <Card width={380} borderColor={f.color}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 70 }}>{f.icon}</span>
                <div style={{ marginTop: 15, fontSize: 32, color: f.color, fontWeight: "bold" }}>
                  {f.name}
                </div>
                <div
                  style={{
                    marginTop: 20,
                    padding: "15px",
                    background: `${f.color}20`,
                    borderRadius: 10,
                    fontSize: 26,
                    color: colors.white,
                    fontFamily: "monospace",
                  }}
                >
                  {f.formula}
                </div>
                <div style={{ marginTop: 15, fontSize: 22, color: colors.gray[300] }}>
                  {f.desc}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 다이어그램 흐름 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <div style={{ padding: "15px 30px", background: colors.gray[800], borderRadius: 15, fontSize: 28, color: colors.white }}>
          가중합 z
        </div>
        <span style={{ fontSize: 36, color: colors.accent }}>→</span>
        <div style={{ padding: "15px 30px", background: colors.activation, borderRadius: 15, fontSize: 28, color: colors.white }}>
          활성화 함수
        </div>
        <span style={{ fontSize: 36, color: colors.accent }}>→</span>
        <div style={{ padding: "15px 30px", background: colors.success, borderRadius: 15, fontSize: 28, color: colors.white }}>
          최종 출력 y
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 7: OUTRO ============
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const parts = [
    { name: "입력", desc: "외부 데이터", icon: "📥", color: colors.input },
    { name: "가중치", desc: "중요도", icon: "⚖️", color: colors.weight },
    { name: "편향", desc: "기본 성향", icon: "🎯", color: colors.bias },
    { name: "활성화", desc: "최종 판단", icon: "⚡", color: colors.activation },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-3/scene7_outro.mp3")} />
      <AnimatedBackground color1="#1e1b4b" color2={colors.secondary} color3="#0f172a" />
      <Particles count={40} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={64} glowColor={colors.secondary}>📚 오늘의 정리</GlowText>
      </div>

      {/* 4가지 부품 요약 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {parts.map((part, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 60 + i * 30, 30),
              transform: `scale(${scaleIn(frame, fps, 60 + i * 30)})`,
            }}
          >
            <Card width={260} borderColor={part.color}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 50 }}>{part.icon}</span>
                <div style={{ marginTop: 10, fontSize: 26, color: part.color, fontWeight: "bold" }}>
                  {part.name}
                </div>
                <div style={{ marginTop: 10, fontSize: 20, color: colors.gray[300] }}>
                  {part.desc}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 250, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 60px",
            background: `linear-gradient(135deg, ${colors.primary}40 0%, ${colors.secondary}40 100%)`,
            borderRadius: 25,
            border: `3px solid ${colors.accent}`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            🎯 AI 학습 = 가중치와 편향을 조절하는 과정!
          </span>
        </div>
      </div>

      {/* 다음 시간 예고 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 350, 40),
        }}
      >
        <span style={{ fontSize: 32, color: colors.gray[300] }}>
          다음 시간: <span style={{ color: colors.accent, fontWeight: "bold" }}>퍼셉트론이 어떻게 학습하는지</span> 알아봐요!
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPOSITION ============
export const Lesson1_3Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene2_input.start} durationInFrames={SCENE_TIMINGS.scene2_input.duration}>
        <Scene2Input />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene3_weight.start} durationInFrames={SCENE_TIMINGS.scene3_weight.duration}>
        <Scene3Weight />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene4_bias.start} durationInFrames={SCENE_TIMINGS.scene4_bias.duration}>
        <Scene4Bias />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene5_formula.start} durationInFrames={SCENE_TIMINGS.scene5_formula.duration}>
        <Scene5Formula />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene6_activation.start} durationInFrames={SCENE_TIMINGS.scene6_activation.duration}>
        <Scene6Activation />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>

      {/* Global Overlay */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
