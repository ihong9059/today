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
  scene1_intro: { duration: 1141, start: 0 },
  scene2_function_concept: { duration: 1489, start: 1141 },
  scene3_linear_quadratic: { duration: 1458, start: 2630 },
  scene4_exp_log: { duration: 1446, start: 4088 },
  scene5_sigmoid: { duration: 1341, start: 5534 },
  scene6_relu: { duration: 1578, start: 6875 },
  scene7_outro: { duration: 1502, start: 8453 },
};

export const LESSON_2_1_DURATION = 9955;

// ============ COLORS ============
const colors = {
  bg: {
    dark: "#0f172a",
  },
  primary: "#10b981", // Green for Level 2
  secondary: "#059669",
  accent: "#f59e0b",
  tertiary: "#6366f1",
  danger: "#ef4444",
  ai: "#06b6d4",
  math: "#8b5cf6",
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

      {/* 하단 교육 사이트 URL */}
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
  color1 = "#10b981",
  color2 = "#059669",
  color3 = "#0f172a"
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

const MathFormula: React.FC<{
  formula: string;
  fontSize?: number;
  color?: string;
}> = ({ formula, fontSize = 48, color = colors.white }) => (
  <span
    style={{
      fontFamily: "'Times New Roman', serif",
      fontStyle: "italic",
      fontSize,
      color,
      textShadow: `0 0 15px ${colors.math}60`,
    }}
  >
    {formula}
  </span>
);

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 30, 40);
  const titleY = slideUp(frame, 30, 40);
  const badgeOpacity = fadeIn(frame, 80, 30);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-1/scene1_intro.mp3")} />
      <AnimatedBackground color1="#065f46" color2={colors.primary} color3="#0f172a" />
      <Particles count={40} />

      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 100,
          opacity: badgeOpacity,
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
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 2 - Lesson 1</span>
        </div>
      </div>

      {/* 메인 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div style={{ marginBottom: 30 }}>
          <span style={{ fontSize: 120, marginRight: 20 }}>📈</span>
          <GlowText fontSize={90} glowColor={colors.primary}>함수와 그래프</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>
            AI의 기초가 되는 수학 함수들
          </span>
        </div>
      </div>

      {/* 함수 종류 미리보기 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        {[
          { icon: "📏", text: "일차함수" },
          { icon: "🎢", text: "이차함수" },
          { icon: "🚀", text: "지수/로그" },
          { icon: "🔄", text: "활성화 함수" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "20px 35px",
              backgroundColor: `${colors.gray[800]}cc`,
              borderRadius: 15,
              border: `2px solid ${colors.gray[600]}`,
              transform: `scale(${scaleIn(frame, fps, 200 + i * 25)})`,
            }}
          >
            <span style={{ fontSize: 36 }}>{item.icon}</span>
            <span style={{ fontSize: 24, color: colors.white, marginLeft: 15 }}>{item.text}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: FUNCTION CONCEPT (자판기 비유) ============
const Scene2FunctionConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-1/scene2_function_concept.mp3")} />
      <AnimatedBackground color1="#0d9488" color2={colors.ai} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.ai}>🎰 함수란 무엇인가?</GlowText>
      </div>

      {/* 자판기 비유 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 60,
          opacity: fadeIn(frame, 80, 40),
        }}
      >
        {/* 입력 */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              backgroundColor: colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              boxShadow: `0 0 40px ${colors.accent}60`,
              transform: `scale(${scaleIn(frame, fps, 80)})`,
            }}
          >
            💰
          </div>
          <div style={{ fontSize: 32, color: colors.white, marginTop: 20, fontWeight: "bold" }}>입력 (x)</div>
          <div style={{ fontSize: 24, color: colors.gray[300] }}>동전 500원</div>
        </div>

        {/* 화살표 */}
        <div
          style={{
            fontSize: 60,
            color: colors.primary,
            opacity: fadeIn(frame, 150, 30),
          }}
        >
          →
        </div>

        {/* 자판기 (함수) */}
        <div
          style={{
            textAlign: "center",
            opacity: fadeIn(frame, 200, 40),
            transform: `scale(${scaleIn(frame, fps, 200)})`,
          }}
        >
          <Card width={300} borderColor={colors.primary}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 80, marginBottom: 15 }}>🎰</div>
              <div style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>f(x)</div>
              <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 10 }}>함수 = 규칙</div>
            </div>
          </Card>
        </div>

        {/* 화살표 */}
        <div
          style={{
            fontSize: 60,
            color: colors.primary,
            opacity: fadeIn(frame, 250, 30),
          }}
        >
          →
        </div>

        {/* 출력 */}
        <div style={{ textAlign: "center", opacity: fadeIn(frame, 300, 40) }}>
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              backgroundColor: colors.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              boxShadow: `0 0 40px ${colors.primary}60`,
              transform: `scale(${scaleIn(frame, fps, 300)})`,
            }}
          >
            🥤
          </div>
          <div style={{ fontSize: 32, color: colors.white, marginTop: 20, fontWeight: "bold" }}>출력 (y)</div>
          <div style={{ fontSize: 24, color: colors.gray[300] }}>음료수</div>
        </div>
      </div>

      {/* 수학적 표현 */}
      <div
        style={{
          position: "absolute",
          bottom: "22%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 450, 40),
        }}
      >
        <Card width={900} borderColor={colors.math} style={{ margin: "0 auto" }}>
          <div style={{ textAlign: "center" }}>
            <MathFormula formula="y = f(x)" fontSize={56} />
            <div style={{ fontSize: 28, color: colors.gray[300], marginTop: 20 }}>
              "x를 넣으면 규칙 f에 따라 y가 나온다"
            </div>
          </div>
        </Card>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 550, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 50px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.ai} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.primary}60`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
            💡 같은 입력 → 항상 같은 출력! (결정론적)
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: LINEAR & QUADRATIC ============
const Scene3LinearQuadratic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-1/scene3_linear_quadratic.mp3")} />
      <AnimatedBackground color1="#7c2d12" color2={colors.accent} color3="#0f172a" />
      <Particles count={25} />

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
        <GlowText fontSize={64} glowColor={colors.accent}>📏 일차함수 & 이차함수</GlowText>
      </div>

      {/* 비교 카드 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        {/* 일차함수 */}
        <div
          style={{
            opacity: fadeIn(frame, 60, 40),
            transform: `translateX(${interpolate(frame, [60, 100], [-100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px)`,
          }}
        >
          <Card width={700} borderColor={colors.primary}>
            <div style={{ textAlign: "center", marginBottom: 25 }}>
              <span style={{ fontSize: 48 }}>📏</span>
              <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold", marginLeft: 15 }}>일차함수</span>
            </div>

            {/* 수식 */}
            <div
              style={{
                padding: 25,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              <MathFormula formula="y = ax + b" fontSize={52} />
            </div>

            {/* 그래프 시뮬레이션 */}
            <div
              style={{
                height: 150,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                position: "relative",
                overflow: "hidden",
                marginBottom: 20,
              }}
            >
              {/* 축 */}
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, backgroundColor: colors.gray[600] }} />
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, backgroundColor: colors.gray[600] }} />

              {/* 직선 */}
              <svg width="100%" height="100%" style={{ position: "absolute" }}>
                <line
                  x1="50"
                  y1="130"
                  x2="650"
                  y2="20"
                  stroke={colors.primary}
                  strokeWidth="4"
                  style={{
                    strokeDasharray: 700,
                    strokeDashoffset: interpolate(frame, [100, 200], [700, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
                  }}
                />
              </svg>
            </div>

            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 22, color: colors.primary }}>✅ 직선! 신경망의 기본 연산</span>
            </div>
          </Card>
        </div>

        {/* 이차함수 */}
        <div
          style={{
            opacity: fadeIn(frame, 150, 40),
            transform: `translateX(${interpolate(frame, [150, 190], [100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px)`,
          }}
        >
          <Card width={700} borderColor={colors.accent}>
            <div style={{ textAlign: "center", marginBottom: 25 }}>
              <span style={{ fontSize: 48 }}>🎢</span>
              <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold", marginLeft: 15 }}>이차함수</span>
            </div>

            {/* 수식 */}
            <div
              style={{
                padding: 25,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              <MathFormula formula="y = ax² + bx + c" fontSize={48} />
            </div>

            {/* 그래프 시뮬레이션 */}
            <div
              style={{
                height: 150,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                position: "relative",
                overflow: "hidden",
                marginBottom: 20,
              }}
            >
              {/* 축 */}
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, backgroundColor: colors.gray[600] }} />
              <div style={{ position: "absolute", top: "75%", left: 0, right: 0, height: 2, backgroundColor: colors.gray[600] }} />

              {/* 포물선 */}
              <svg width="100%" height="100%" style={{ position: "absolute" }}>
                <path
                  d="M 50,130 Q 350,10 650,130"
                  fill="none"
                  stroke={colors.accent}
                  strokeWidth="4"
                  style={{
                    strokeDasharray: 700,
                    strokeDashoffset: interpolate(frame, [200, 300], [700, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
                  }}
                />
              </svg>
            </div>

            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 22, color: colors.accent }}>✅ 포물선! 손실 함수에 활용</span>
            </div>
          </Card>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.primary}60`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
            🎯 기울기 a가 크면 가파르고, 작으면 완만!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: EXP & LOG ============
const Scene4ExpLog: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-1/scene4_exp_log.mp3")} />
      <AnimatedBackground color1="#581c87" color2={colors.math} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.math}>🚀 지수함수 & 로그함수</GlowText>
      </div>

      {/* 비교 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        {/* 지수함수 */}
        <div
          style={{
            opacity: fadeIn(frame, 60, 40),
            transform: `scale(${scaleIn(frame, fps, 60)})`,
          }}
        >
          <Card width={700} borderColor={colors.danger}>
            <div style={{ textAlign: "center", marginBottom: 25 }}>
              <span style={{ fontSize: 48 }}>🚀</span>
              <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold", marginLeft: 15 }}>지수함수</span>
            </div>

            <div
              style={{
                padding: 25,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              <MathFormula formula="y = eˣ" fontSize={56} />
            </div>

            {/* 그래프 */}
            <div
              style={{
                height: 150,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                position: "relative",
                overflow: "hidden",
                marginBottom: 20,
              }}
            >
              <svg width="100%" height="100%" style={{ position: "absolute" }}>
                <path
                  d="M 50,140 Q 200,135 350,100 T 650,10"
                  fill="none"
                  stroke={colors.danger}
                  strokeWidth="4"
                />
              </svg>
              <div style={{ position: "absolute", right: 70, top: 20, fontSize: 24, color: colors.danger }}>
                폭발적 증가! 📈
              </div>
            </div>

            <div style={{ fontSize: 20, color: colors.gray[300], textAlign: "center" }}>
              소프트맥스(Softmax)에서 사용
            </div>
          </Card>
        </div>

        {/* 로그함수 */}
        <div
          style={{
            opacity: fadeIn(frame, 150, 40),
            transform: `scale(${scaleIn(frame, fps, 150)})`,
          }}
        >
          <Card width={700} borderColor={colors.ai}>
            <div style={{ textAlign: "center", marginBottom: 25 }}>
              <span style={{ fontSize: 48 }}>📉</span>
              <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold", marginLeft: 15 }}>로그함수</span>
            </div>

            <div
              style={{
                padding: 25,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              <MathFormula formula="y = log(x)" fontSize={56} />
            </div>

            {/* 그래프 */}
            <div
              style={{
                height: 150,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                position: "relative",
                overflow: "hidden",
                marginBottom: 20,
              }}
            >
              <svg width="100%" height="100%" style={{ position: "absolute" }}>
                <path
                  d="M 100,140 Q 200,80 350,50 T 650,20"
                  fill="none"
                  stroke={colors.ai}
                  strokeWidth="4"
                />
              </svg>
              <div style={{ position: "absolute", right: 70, top: 30, fontSize: 24, color: colors.ai }}>
                천천히 증가 📊
              </div>
            </div>

            <div style={{ fontSize: 20, color: colors.gray[300], textAlign: "center" }}>
              크로스 엔트로피(Cross-Entropy)에서 사용
            </div>
          </Card>
        </div>
      </div>

      {/* 역함수 관계 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 350, 40),
        }}
      >
        <Card width={800} borderColor={colors.math} style={{ margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
            <span style={{ fontSize: 36, color: colors.danger }}>eˣ</span>
            <span style={{ fontSize: 48 }}>⟷</span>
            <span style={{ fontSize: 36, color: colors.ai }}>log(x)</span>
            <span style={{ fontSize: 28, color: colors.white, marginLeft: 20 }}>서로 역함수!</span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: SIGMOID ============
const Scene5Sigmoid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-1/scene5_sigmoid.mp3")} />
      <AnimatedBackground color1="#1e3a8a" color2="#3b82f6" color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor="#3b82f6">🔄 시그모이드 함수</GlowText>
      </div>

      {/* 메인 컨텐츠 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 50, 40),
        }}
      >
        <Card width={1400} borderColor="#3b82f6">
          <div style={{ display: "flex", gap: 60 }}>
            {/* 왼쪽: 수식 및 설명 */}
            <div style={{ flex: 1 }}>
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <MathFormula formula="σ(x) = 1 / (1 + e⁻ˣ)" fontSize={42} />
              </div>

              <div style={{ marginBottom: 25 }}>
                <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>
                  ✨ 특징
                </div>
                <div style={{ fontSize: 24, color: colors.gray[300], lineHeight: 1.8 }}>
                  • 출력: 항상 <span style={{ color: colors.primary, fontWeight: "bold" }}>0 ~ 1</span> 사이<br />
                  • x가 작으면 → 0에 가까움<br />
                  • x가 크면 → 1에 가까움<br />
                  • S자 커브 모양
                </div>
              </div>
            </div>

            {/* 오른쪽: 그래프 */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  height: 250,
                  backgroundColor: colors.gray[800],
                  borderRadius: 15,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* 축 */}
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, backgroundColor: colors.gray[600] }} />
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, backgroundColor: colors.gray[600] }} />

                {/* 0과 1 레이블 */}
                <div style={{ position: "absolute", left: 10, top: 10, fontSize: 20, color: colors.gray[300] }}>1</div>
                <div style={{ position: "absolute", left: 10, bottom: 10, fontSize: 20, color: colors.gray[300] }}>0</div>

                {/* S커브 */}
                <svg width="100%" height="100%" style={{ position: "absolute" }}>
                  <path
                    d="M 50,230 Q 150,225 250,200 T 350,125 T 450,50 T 600,25"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="5"
                    style={{
                      strokeDasharray: 700,
                      strokeDashoffset: interpolate(frame, [100, 200], [700, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 활용 예시 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: fadeIn(frame, 300, 40),
        }}
      >
        {[
          { icon: "📧", text: "스팸 분류", prob: "0.95" },
          { icon: "🏥", text: "질병 진단", prob: "0.87" },
          { icon: "✅", text: "합격 예측", prob: "0.72" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              transform: `scale(${scaleIn(frame, fps, 300 + i * 40)})`,
            }}
          >
            <Card width={350} borderColor="#3b82f6">
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 48 }}>{item.icon}</span>
                <div style={{ fontSize: 24, color: colors.white, marginTop: 10 }}>{item.text}</div>
                <div style={{ fontSize: 32, color: colors.primary, fontWeight: "bold", marginTop: 10 }}>
                  확률: {item.prob}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: RELU ============
const Scene6ReLU: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-1/scene6_relu.mp3")} />
      <AnimatedBackground color1="#166534" color2={colors.primary} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.primary}>⚡ ReLU 함수</GlowText>
      </div>

      {/* 메인 컨텐츠 */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 50, 40),
        }}
      >
        <Card width={1400} borderColor={colors.primary}>
          <div style={{ display: "flex", gap: 60 }}>
            {/* 왼쪽: 수식 및 설명 */}
            <div style={{ flex: 1 }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 26, color: colors.gray[300], marginBottom: 10 }}>
                  Rectified Linear Unit
                </div>
                <MathFormula formula="ReLU(x) = max(0, x)" fontSize={48} />
              </div>

              <div style={{ marginTop: 25 }}>
                <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>
                  🎯 규칙
                </div>
                <div style={{ fontSize: 26, color: colors.gray[300], lineHeight: 1.8 }}>
                  • x &lt; 0 → <span style={{ color: colors.danger }}>0 출력</span><br />
                  • x ≥ 0 → <span style={{ color: colors.primary }}>x 그대로 출력</span>
                </div>
              </div>
            </div>

            {/* 오른쪽: 그래프 */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  height: 220,
                  backgroundColor: colors.gray[800],
                  borderRadius: 15,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* 축 */}
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, backgroundColor: colors.gray[600] }} />
                <div style={{ position: "absolute", top: "70%", left: 0, right: 0, height: 2, backgroundColor: colors.gray[600] }} />

                {/* ReLU 그래프 */}
                <svg width="100%" height="100%" style={{ position: "absolute" }}>
                  {/* 0 이하 (평평한 부분) */}
                  <line
                    x1="50"
                    y1="154"
                    x2="325"
                    y2="154"
                    stroke={colors.danger}
                    strokeWidth="5"
                    style={{
                      strokeDasharray: 300,
                      strokeDashoffset: interpolate(frame, [80, 150], [300, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
                    }}
                  />
                  {/* 0 이상 (직선 부분) */}
                  <line
                    x1="325"
                    y1="154"
                    x2="600"
                    y2="20"
                    stroke={colors.primary}
                    strokeWidth="5"
                    style={{
                      strokeDasharray: 300,
                      strokeDashoffset: interpolate(frame, [150, 220], [300, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
                    }}
                  />
                </svg>

                {/* 레이블 */}
                <div style={{ position: "absolute", left: 80, top: "65%", fontSize: 20, color: colors.danger }}>y = 0</div>
                <div style={{ position: "absolute", right: 60, top: 30, fontSize: 20, color: colors.primary }}>y = x</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ReLU 장점 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: fadeIn(frame, 350, 40),
        }}
      >
        {[
          { icon: "⚡", title: "계산 빠름", desc: "단순 비교 연산" },
          { icon: "📈", title: "기울기 유지", desc: "양수면 기울기=1" },
          { icon: "🎯", title: "기본 선택", desc: "현대 딥러닝 표준" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              transform: `scale(${scaleIn(frame, fps, 350 + i * 40)})`,
            }}
          >
            <Card width={400} borderColor={colors.primary}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 56 }}>{item.icon}</span>
                <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold", marginTop: 15 }}>{item.title}</div>
                <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 10 }}>{item.desc}</div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 7: OUTRO ============
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summary = [
    { icon: "🎰", text: "함수 = 입력 → 규칙 → 출력 (자판기!)" },
    { icon: "📏", text: "일차함수: 직선, 신경망 기본 연산" },
    { icon: "🎢", text: "이차함수: 포물선, 손실 함수" },
    { icon: "🚀", text: "지수/로그: Softmax, Cross-Entropy" },
    { icon: "🔄", text: "시그모이드: 0~1 확률, 이진 분류" },
    { icon: "⚡", text: "ReLU: 빠르고 효과적, 현대 딥러닝 표준" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-1/scene7_outro.mp3")} />
      <AnimatedBackground color1="#065f46" color2={colors.primary} color3="#0f172a" />
      <Particles count={50} />

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
        <GlowText fontSize={64} glowColor={colors.primary}>🎉 오늘 배운 내용</GlowText>
      </div>

      {/* 요약 - 2열 배치 */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          width: 1500,
        }}
      >
        {summary.map((item, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 40 + i * 35, 30),
              transform: `scale(${scaleIn(frame, fps, 40 + i * 35)})`,
            }}
          >
            <Card width={720} borderColor={colors.primary}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 40 }}>{item.icon}</span>
                <span style={{ fontSize: 24, color: colors.white }}>{item.text}</span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 다음 레슨 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.primary}60`,
          }}
        >
          <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
            👉 다음 레슨: 미분 - AI가 스스로 학습하는 비밀!
          </span>
        </div>
      </div>

      {/* 구독/좋아요 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 500, 40),
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
          <div
            style={{
              padding: "15px 35px",
              backgroundColor: "#ff0000",
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 28 }}>▶</span>
            <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>구독</span>
          </div>
          <div
            style={{
              padding: "15px 35px",
              backgroundColor: colors.gray[700],
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 28 }}>👍</span>
            <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>좋아요</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const Lesson2_1Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_function_concept.start} durationInFrames={SCENE_TIMINGS.scene2_function_concept.duration}>
        <Scene2FunctionConcept />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_linear_quadratic.start} durationInFrames={SCENE_TIMINGS.scene3_linear_quadratic.duration}>
        <Scene3LinearQuadratic />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_exp_log.start} durationInFrames={SCENE_TIMINGS.scene4_exp_log.duration}>
        <Scene4ExpLog />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_sigmoid.start} durationInFrames={SCENE_TIMINGS.scene5_sigmoid.duration}>
        <Scene5Sigmoid />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_relu.start} durationInFrames={SCENE_TIMINGS.scene6_relu.duration}>
        <Scene6ReLU />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>

      {/* 전체 영상에 UTTEC-Lab 로고 및 교육 사이트 URL 오버레이 */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
