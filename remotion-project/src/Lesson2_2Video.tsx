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
  scene1_intro: { duration: 989, start: 0 },
  scene2_slope: { duration: 1097, start: 989 },
  scene3_derivative: { duration: 1266, start: 2086 },
  scene4_gradient_descent: { duration: 1310, start: 3352 },
  scene5_learning_rate: { duration: 1088, start: 4662 },
  scene6_outro: { duration: 1293, start: 5750 },
};

export const LESSON_2_2_DURATION = 7043;

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

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-2/scene1_intro.mp3")} />
      <AnimatedBackground color1="#065f46" color2={colors.primary} color3="#0f172a" />
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
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 2 - Lesson 2</span>
        </div>
      </div>

      {/* 메인 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div style={{ marginBottom: 30 }}>
          <span style={{ fontSize: 120, marginRight: 20 }}>📉</span>
          <GlowText fontSize={90} glowColor={colors.primary}>미분의 기초</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>
            AI가 스스로 학습하는 비밀: 경사하강법
          </span>
        </div>
      </div>

      {/* 핵심 키워드 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        {[
          { icon: "📐", text: "기울기" },
          { icon: "📉", text: "미분" },
          { icon: "🏔️", text: "경사하강법" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "20px 35px",
              backgroundColor: `${colors.gray[800]}cc`,
              borderRadius: 15,
              border: `2px solid ${colors.gray[600]}`,
              transform: `scale(${scaleIn(frame, fps, 200 + i * 30)})`,
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

// ============ SCENE 2: SLOPE ============
const Scene2Slope: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-2/scene2_slope.mp3")} />
      <AnimatedBackground color1="#7c2d12" color2={colors.accent} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.accent}>📐 기울기란?</GlowText>
      </div>

      {/* 산 비유 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 100,
          opacity: fadeIn(frame, 60, 40),
          transform: `scale(${scaleIn(frame, fps, 60)})`,
        }}
      >
        <Card width={700} borderColor={colors.accent}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 80 }}>🏔️</span>
          </div>
          <div style={{ fontSize: 28, color: colors.white, textAlign: "center" }}>
            산을 오를 때...
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20 }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 48 }}>😰</span>
              <div style={{ fontSize: 22, color: colors.danger, marginTop: 10 }}>급경사 = 힘듦</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 48 }}>😊</span>
              <div style={{ fontSize: 22, color: colors.primary, marginTop: 10 }}>완만 = 쉬움</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 수학적 정의 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: 100,
          opacity: fadeIn(frame, 180, 40),
          transform: `scale(${scaleIn(frame, fps, 180)})`,
        }}
      >
        <Card width={700} borderColor={colors.math}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 28, color: colors.gray[300] }}>기울기 = 변화율</span>
          </div>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <MathFormula formula="기울기 = Δy / Δx" fontSize={52} />
          </div>
          <div style={{ fontSize: 24, color: colors.gray[300], textAlign: "center" }}>
            y의 변화량 / x의 변화량
          </div>
        </Card>
      </div>

      {/* 직선 vs 곡선 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: fadeIn(frame, 350, 40),
        }}
      >
        <Card width={500} borderColor={colors.primary}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 36, color: colors.white }}>직선</span>
            <div style={{ fontSize: 24, color: colors.gray[300], marginTop: 10 }}>
              어디서 재도 기울기 동일!
            </div>
          </div>
        </Card>
        <Card width={500} borderColor={colors.danger}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 36, color: colors.white }}>곡선</span>
            <div style={{ fontSize: 24, color: colors.gray[300], marginTop: 10 }}>
              위치마다 기울기가 다름!
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: DERIVATIVE ============
const Scene3Derivative: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-2/scene3_derivative.mp3")} />
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
        <GlowText fontSize={64} glowColor={colors.math}>📉 미분 = 순간 변화율</GlowText>
      </div>

      {/* 미분 공식 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 80, 40),
        }}
      >
        <Card width={1200} borderColor={colors.math}>
          <div style={{ textAlign: "center" }}>
            <MathFormula formula="f'(x) = lim(h→0) [f(x+h) - f(x)] / h" fontSize={48} />
          </div>
          <div style={{ fontSize: 26, color: colors.gray[300], textAlign: "center", marginTop: 20 }}>
            h가 0으로 갈 때의 평균 변화율의 극한
          </div>
        </Card>
      </div>

      {/* 미분값의 의미 */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: fadeIn(frame, 250, 40),
        }}
      >
        {[
          { sign: "f'(x) > 0", meaning: "증가 중!", color: colors.primary, icon: "📈" },
          { sign: "f'(x) < 0", meaning: "감소 중!", color: colors.danger, icon: "📉" },
          { sign: "f'(x) = 0", meaning: "극값!", color: colors.accent, icon: "⭐" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              transform: `scale(${scaleIn(frame, fps, 250 + i * 40)})`,
            }}
          >
            <Card width={400} borderColor={item.color}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 64 }}>{item.icon}</span>
                <div style={{ marginTop: 15 }}>
                  <MathFormula formula={item.sign} fontSize={36} color={item.color} />
                </div>
                <div style={{ fontSize: 28, color: colors.white, marginTop: 15, fontWeight: "bold" }}>
                  {item.meaning}
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
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 450, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 50px",
            background: `linear-gradient(135deg, ${colors.math} 0%, ${colors.tertiary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.math}60`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
            💡 미분값 = 0인 지점이 최솟값 (또는 최댓값)!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: GRADIENT DESCENT ============
const Scene4GradientDescent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 애니메이션된 공 위치
  const ballProgress = interpolate(frame, [200, 800], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const ballX = 300 + ballProgress * 600;
  const ballY = 400 - Math.sin(ballProgress * Math.PI) * 150 + Math.pow(ballProgress - 0.5, 2) * 300;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-2/scene4_gradient_descent.mp3")} />
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
        <GlowText fontSize={64} glowColor="#3b82f6">🏔️ 경사하강법 (Gradient Descent)</GlowText>
      </div>

      {/* 산 비유 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={700} borderColor="#3b82f6">
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, color: colors.white, marginBottom: 20 }}>
              산꼭대기에서 눈 감고 내려오기
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 48 }}>👟</span>
                <div style={{ fontSize: 20, color: colors.gray[300] }}>1. 경사 느끼기</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 48 }}>⬇️</span>
                <div style={{ fontSize: 20, color: colors.gray[300] }}>2. 내려가기</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 48 }}>🔁</span>
                <div style={{ fontSize: 20, color: colors.gray[300] }}>3. 반복</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 그래프 시뮬레이션 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 100,
          opacity: fadeIn(frame, 150, 40),
        }}
      >
        <Card width={700} borderColor={colors.primary}>
          <div
            style={{
              height: 250,
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* 손실 곡선 */}
            <svg width="100%" height="100%" style={{ position: "absolute" }}>
              <path
                d="M 50,200 Q 150,50 350,180 Q 550,300 650,50"
                fill="none"
                stroke={colors.accent}
                strokeWidth="4"
              />
            </svg>

            {/* 굴러가는 공 */}
            <div
              style={{
                position: "absolute",
                left: ballX - 15,
                top: ballY - 15,
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: colors.primary,
                boxShadow: `0 0 20px ${colors.primary}`,
              }}
            />

            <div style={{ position: "absolute", bottom: 10, right: 20, fontSize: 18, color: colors.gray[300] }}>
              손실(Loss) 곡선
            </div>
          </div>
        </Card>
      </div>

      {/* 가중치 업데이트 공식 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <Card width={1000} borderColor={colors.primary} style={{ margin: "0 auto" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 26, color: colors.gray[300], marginBottom: 15 }}>가중치 업데이트 공식</div>
            <MathFormula formula="w_new = w_old - η × ∂L/∂w" fontSize={48} />
            <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 15 }}>
              새 가중치 = 현재 가중치 - (학습률 × 기울기)
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: LEARNING RATE ============
const Scene5LearningRate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-2/scene5_learning_rate.mp3")} />
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
        <GlowText fontSize={64} glowColor={colors.primary}>⚙️ 학습률 (Learning Rate, η)</GlowText>
      </div>

      {/* 학습률 비교 */}
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
        {/* 너무 큰 학습률 */}
        <div
          style={{
            opacity: fadeIn(frame, 80, 40),
            transform: `scale(${scaleIn(frame, fps, 80)})`,
          }}
        >
          <Card width={550} borderColor={colors.danger}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 32, color: colors.danger, fontWeight: "bold" }}>η 너무 큼</span>
            </div>
            <div
              style={{
                height: 150,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <svg width="100%" height="100%" style={{ position: "absolute" }}>
                <path d="M 50,100 Q 150,30 275,100 Q 400,170 500,100" fill="none" stroke={colors.gray[500]} strokeWidth="3" />
                {/* 튕기는 경로 */}
                <path
                  d="M 100,80 L 200,120 L 300,60 L 400,130 L 450,40"
                  fill="none"
                  stroke={colors.danger}
                  strokeWidth="3"
                  strokeDasharray="8,4"
                />
              </svg>
            </div>
            <div style={{ fontSize: 24, color: colors.danger, textAlign: "center", marginTop: 15 }}>
              😵 왔다 갔다 발산!
            </div>
          </Card>
        </div>

        {/* 적절한 학습률 */}
        <div
          style={{
            opacity: fadeIn(frame, 180, 40),
            transform: `scale(${scaleIn(frame, fps, 180)})`,
          }}
        >
          <Card width={550} borderColor={colors.primary}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 32, color: colors.primary, fontWeight: "bold" }}>η 적절함</span>
            </div>
            <div
              style={{
                height: 150,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <svg width="100%" height="100%" style={{ position: "absolute" }}>
                <path d="M 50,100 Q 150,30 275,100 Q 400,170 500,100" fill="none" stroke={colors.gray[500]} strokeWidth="3" />
                {/* 수렴하는 경로 */}
                <path
                  d="M 100,50 L 180,80 L 240,95 L 275,100"
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="3"
                />
                <circle cx="275" cy="100" r="8" fill={colors.primary} />
              </svg>
            </div>
            <div style={{ fontSize: 24, color: colors.primary, textAlign: "center", marginTop: 15 }}>
              ✅ 안정적으로 수렴!
            </div>
          </Card>
        </div>

        {/* 너무 작은 학습률 */}
        <div
          style={{
            opacity: fadeIn(frame, 280, 40),
            transform: `scale(${scaleIn(frame, fps, 280)})`,
          }}
        >
          <Card width={550} borderColor={colors.accent}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 32, color: colors.accent, fontWeight: "bold" }}>η 너무 작음</span>
            </div>
            <div
              style={{
                height: 150,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <svg width="100%" height="100%" style={{ position: "absolute" }}>
                <path d="M 50,100 Q 150,30 275,100 Q 400,170 500,100" fill="none" stroke={colors.gray[500]} strokeWidth="3" />
                {/* 느린 경로 */}
                <path
                  d="M 100,50 L 110,52 L 120,55 L 130,58"
                  fill="none"
                  stroke={colors.accent}
                  strokeWidth="3"
                />
                <circle cx="130" cy="58" r="6" fill={colors.accent} />
              </svg>
            </div>
            <div style={{ fontSize: 24, color: colors.accent, textAlign: "center", marginTop: 15 }}>
              🐢 너무 느림...
            </div>
          </Card>
        </div>
      </div>

      {/* 권장 학습률 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 450, 40),
        }}
      >
        <Card width={800} borderColor={colors.primary} style={{ margin: "0 auto" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 28, color: colors.white }}>일반적인 학습률 범위:</span>
            <MathFormula formula=" 0.001 ~ 0.1" fontSize={42} color={colors.primary} />
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: OUTRO ============
const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summary = [
    { icon: "📐", text: "미분 = 순간 변화율 (그 점의 기울기)" },
    { icon: "📈", text: "f'(x) > 0: 증가 / f'(x) < 0: 감소 / f'(x) = 0: 극값" },
    { icon: "🏔️", text: "경사하강법: 기울기 반대 방향으로 이동 → 최솟값 도달" },
    { icon: "⚙️", text: "학습률: 너무 크면 발산, 너무 작으면 느림" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-2/scene6_outro.mp3")} />
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

      {/* 요약 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {summary.map((item, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 50 + i * 40, 30),
              transform: `scale(${scaleIn(frame, fps, 50 + i * 40)})`,
            }}
          >
            <Card width={1200} borderColor={colors.primary}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 40 }}>{item.icon}</span>
                <span style={{ fontSize: 26, color: colors.white }}>{item.text}</span>
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
          opacity: fadeIn(frame, 350, 40),
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
            👉 다음 레슨: 편미분 - 여러 파라미터 동시 학습!
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
          opacity: fadeIn(frame, 450, 40),
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
export const Lesson2_2Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_slope.start} durationInFrames={SCENE_TIMINGS.scene2_slope.duration}>
        <Scene2Slope />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_derivative.start} durationInFrames={SCENE_TIMINGS.scene3_derivative.duration}>
        <Scene3Derivative />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_gradient_descent.start} durationInFrames={SCENE_TIMINGS.scene4_gradient_descent.duration}>
        <Scene4GradientDescent />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_learning_rate.start} durationInFrames={SCENE_TIMINGS.scene5_learning_rate.duration}>
        <Scene5LearningRate />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_outro.start} durationInFrames={SCENE_TIMINGS.scene6_outro.duration}>
        <Scene6Outro />
      </Sequence>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};
