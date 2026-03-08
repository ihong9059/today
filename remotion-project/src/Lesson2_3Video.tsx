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
  scene1_intro: { duration: 888, start: 0 },
  scene2_multivariable: { duration: 840, start: 888 },
  scene3_partial: { duration: 1018, start: 1728 },
  scene4_gradient: { duration: 1056, start: 2746 },
  scene5_ai_example: { duration: 1031, start: 3802 },
  scene6_outro: { duration: 1103, start: 4833 },
};

export const LESSON_2_3_DURATION = 5936;

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
              background: `radial-gradient(circle, ${colors.math}30 0%, transparent 70%)`,
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
}> = ({ children, fontSize = 72, color = colors.white, glowColor = colors.math }) => (
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
}> = ({ children, width = 400, borderColor = colors.math, glow = true, style = {} }) => (
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
  children: React.ReactNode;
  size?: number;
}> = ({ children, size = 48 }) => (
  <span
    style={{
      fontFamily: "serif",
      fontSize: size,
      color: colors.white,
      fontStyle: "italic",
    }}
  >
    {children}
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
      <Audio src={staticFile("audio/lesson-2-3/scene1_intro.mp3")} />
      <AnimatedBackground color1="#581c87" color2={colors.math} color3="#0f172a" />
      <Particles count={40} />

      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 100,
          opacity: fadeIn(frame, 60, 30),
          transform: `scale(${scaleIn(frame, fps, 60)})`,
        }}
      >
        <div
          style={{
            padding: "15px 40px",
            background: `linear-gradient(135deg, ${colors.math} 0%, ${colors.secondary} 100%)`,
            borderRadius: 20,
            border: `2px solid ${colors.white}40`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 2 - Lesson 3</span>
        </div>
      </div>

      {/* 메인 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div style={{ marginBottom: 30 }}>
          <span style={{ fontSize: 100, marginRight: 20 }}>∂</span>
          <GlowText fontSize={90} glowColor={colors.math}>편미분</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>
            Partial Derivative & Gradient
          </span>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        {[
          { icon: "📊", text: "여러 변수" },
          { icon: "∂", text: "편미분" },
          { icon: "➡️", text: "그래디언트" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "20px 40px",
              backgroundColor: `${colors.gray[800]}cc`,
              borderRadius: 15,
              border: `2px solid ${colors.math}60`,
              transform: `scale(${scaleIn(frame, fps, 200 + i * 30)})`,
            }}
          >
            <span style={{ fontSize: 40 }}>{item.icon}</span>
            <span style={{ fontSize: 28, color: colors.white, marginLeft: 15 }}>{item.text}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: MULTIVARIABLE ============
const Scene2Multivariable: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-3/scene2_multivariable.mp3")} />
      <AnimatedBackground color1="#312e81" color2={colors.math} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.math}>📊 다변수 함수</GlowText>
      </div>

      {/* 수식 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 50, 40),
        }}
      >
        <Card width={700} borderColor={colors.math}>
          <div style={{ textAlign: "center" }}>
            <MathFormula size={56}>f(x, y) = x² + y²</MathFormula>
            <div style={{ marginTop: 15, fontSize: 24, color: colors.gray[300] }}>
              두 개의 변수 x와 y
            </div>
          </div>
        </Card>
      </div>

      {/* 3D 그릇 모양 비유 */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: fadeIn(frame, 150, 40),
        }}
      >
        <Card width={450} borderColor={colors.primary}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 80 }}>🥣</span>
            <div style={{ fontSize: 28, color: colors.white, marginTop: 15 }}>
              3D 그릇 모양
            </div>
            <div style={{ fontSize: 20, color: colors.gray[300], marginTop: 10 }}>
              x, y 위치에 따라 높이(z)가 달라짐
            </div>
          </div>
        </Card>

        <Card width={450} borderColor={colors.accent}>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 30, marginBottom: 15 }}>
              <div>
                <span style={{ fontSize: 50 }}>🧭</span>
                <div style={{ fontSize: 22, color: colors.white }}>동쪽</div>
              </div>
              <div>
                <span style={{ fontSize: 50 }}>🧭</span>
                <div style={{ fontSize: 22, color: colors.white }}>북쪽</div>
              </div>
            </div>
            <div style={{ fontSize: 24, color: colors.gray[300] }}>
              각 방향의 기울기가 따로 필요!
            </div>
          </div>
        </Card>
      </div>

      {/* 핵심 아이디어 */}
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
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.math} 0%, ${colors.secondary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.math}60`,
          }}
        >
          <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
            💡 각 방향으로의 기울기 = 편미분!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: PARTIAL DERIVATIVE ============
const Scene3Partial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-3/scene3_partial.mp3")} />
      <AnimatedBackground color1="#4c1d95" color2={colors.math} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.math}>∂ 편미분 기호</GlowText>
      </div>

      {/* 편미분 설명 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* x로 편미분 */}
        <div
          style={{
            opacity: fadeIn(frame, 80, 40),
            transform: `scale(${scaleIn(frame, fps, 80)})`,
          }}
        >
          <Card width={550} borderColor={colors.primary}>
            <div style={{ textAlign: "center" }}>
              <div style={{ marginBottom: 20 }}>
                <MathFormula size={48}>∂f/∂x</MathFormula>
              </div>
              <div
                style={{
                  padding: 20,
                  backgroundColor: colors.gray[800],
                  borderRadius: 12,
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: 24, color: colors.gray[300], marginBottom: 10 }}>
                  y는 상수로 취급
                </div>
                <MathFormula size={36}>x² + y² → 2x</MathFormula>
              </div>
              <div style={{ fontSize: 22, color: colors.success }}>
                ✅ x 방향의 기울기
              </div>
            </div>
          </Card>
        </div>

        {/* y로 편미분 */}
        <div
          style={{
            opacity: fadeIn(frame, 180, 40),
            transform: `scale(${scaleIn(frame, fps, 180)})`,
          }}
        >
          <Card width={550} borderColor={colors.accent}>
            <div style={{ textAlign: "center" }}>
              <div style={{ marginBottom: 20 }}>
                <MathFormula size={48}>∂f/∂y</MathFormula>
              </div>
              <div
                style={{
                  padding: 20,
                  backgroundColor: colors.gray[800],
                  borderRadius: 12,
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: 24, color: colors.gray[300], marginBottom: 10 }}>
                  x는 상수로 취급
                </div>
                <MathFormula size={36}>x² + y² → 2y</MathFormula>
              </div>
              <div style={{ fontSize: 22, color: colors.success }}>
                ✅ y 방향의 기울기
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <Card width={900} borderColor={colors.success} style={{ margin: "0 auto" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 32, color: colors.white }}>
              🎯 간단하죠? <span style={{ color: colors.accent }}>한 변수만</span> 변한다고 생각하면 됩니다!
            </span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: GRADIENT ============
const Scene4Gradient: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-3/scene4_gradient.mp3")} />
      <AnimatedBackground color1="#1e3a8a" color2={colors.math} color3="#0f172a" />
      <Particles count={35} />

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
        <GlowText fontSize={64} glowColor={colors.math}>➡️ 그래디언트 (Gradient)</GlowText>
      </div>

      {/* 그래디언트 수식 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={900} borderColor={colors.math}>
          <div style={{ textAlign: "center" }}>
            <MathFormula size={52}>∇f = (∂f/∂x, ∂f/∂y)</MathFormula>
            <div style={{ marginTop: 20, fontSize: 26, color: colors.gray[300] }}>
              모든 편미분을 모은 <span style={{ color: colors.accent }}>벡터</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 방향 설명 */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame, 200, 40),
            transform: `scale(${scaleIn(frame, fps, 200)})`,
          }}
        >
          <Card width={450} borderColor={colors.success}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 70 }}>⬆️</span>
              <div style={{ fontSize: 28, color: colors.white, marginTop: 15 }}>
                그래디언트 방향
              </div>
              <div style={{ fontSize: 22, color: colors.success, marginTop: 10 }}>
                가장 가파르게 올라가는 방향
              </div>
            </div>
          </Card>
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 300, 40),
            transform: `scale(${scaleIn(frame, fps, 300)})`,
          }}
        >
          <Card width={450} borderColor={colors.danger}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 70 }}>⬇️</span>
              <div style={{ fontSize: 28, color: colors.white, marginTop: 15 }}>
                그래디언트 반대 방향
              </div>
              <div style={{ fontSize: 22, color: colors.danger, marginTop: 10 }}>
                가장 가파르게 내려가는 방향
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* AI 연결 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 500, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.math} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.primary}60`,
          }}
        >
          <span style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>
            🤖 AI 학습: 손실을 줄이려면 그래디언트 <span style={{ color: colors.accent }}>반대 방향</span>으로!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: AI EXAMPLE ============
const Scene5AIExample: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-3/scene5_ai_example.mp3")} />
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
        <GlowText fontSize={64} glowColor={colors.accent}>🤖 AI에서의 편미분</GlowText>
      </div>

      {/* 신경망 가중치 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={1200} borderColor={colors.accent}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, color: colors.gray[300], marginBottom: 20 }}>
              신경망에는 가중치가 많아요!
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 30 }}>
              {["w₁", "w₂", "w₃", "...", "wₙ"].map((w, i) => (
                <div
                  key={i}
                  style={{
                    padding: "15px 25px",
                    backgroundColor: colors.gray[800],
                    borderRadius: 12,
                    border: `2px solid ${colors.math}`,
                    transform: `scale(${scaleIn(frame, fps, 100 + i * 30)})`,
                  }}
                >
                  <MathFormula size={36}>{w}</MathFormula>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* 편미분 적용 */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: fadeIn(frame, 250, 40),
        }}
      >
        {[
          { formula: "∂L/∂w₁", desc: "w₁이 손실에 미치는 영향" },
          { formula: "∂L/∂w₂", desc: "w₂가 손실에 미치는 영향" },
          { formula: "∂L/∂w₃", desc: "w₃가 손실에 미치는 영향" },
        ].map((item, i) => (
          <Card key={i} width={350} borderColor={colors.math}>
            <div style={{ textAlign: "center" }}>
              <MathFormula size={32}>{item.formula}</MathFormula>
              <div style={{ fontSize: 18, color: colors.gray[300], marginTop: 15 }}>
                {item.desc}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 500, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.success} 0%, ${colors.primary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.success}60`,
          }}
        >
          <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
            🎯 각 가중치를 조금씩 조정 → 전체 손실 감소 = 딥러닝의 핵심!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: OUTRO ============
const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summary = [
    { icon: "✅", text: "편미분: 여러 변수 중 하나만 변화시키며 미분" },
    { icon: "✅", text: "다른 변수들은 상수로 취급" },
    { icon: "✅", text: "그래디언트: 모든 편미분을 모은 벡터" },
    { icon: "✅", text: "AI는 그래디언트 반대 방향으로 학습" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-2-3/scene6_outro.mp3")} />
      <AnimatedBackground color1="#7c3aed" color2="#2563eb" color3="#0f172a" />
      <Particles count={50} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={64} glowColor={colors.math}>🎉 오늘 배운 내용</GlowText>
      </div>

      {/* 요약 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
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
              opacity: fadeIn(frame, 50 + i * 50, 30),
              transform: `scale(${scaleIn(frame, fps, 50 + i * 50)})`,
            }}
          >
            <Card width={900} borderColor={colors.success}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 36 }}>{item.icon}</span>
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
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.math} 0%, ${colors.secondary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.math}60`,
          }}
        >
          <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
            👉 다음 레슨: 연쇄법칙 (Chain Rule)
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
export const Lesson2_3Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_multivariable.start} durationInFrames={SCENE_TIMINGS.scene2_multivariable.duration}>
        <Scene2Multivariable />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_partial.start} durationInFrames={SCENE_TIMINGS.scene3_partial.duration}>
        <Scene3Partial />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_gradient.start} durationInFrames={SCENE_TIMINGS.scene4_gradient.duration}>
        <Scene4Gradient />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_ai_example.start} durationInFrames={SCENE_TIMINGS.scene5_ai_example.duration}>
        <Scene5AIExample />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_outro.start} durationInFrames={SCENE_TIMINGS.scene6_outro.duration}>
        <Scene6Outro />
      </Sequence>

      {/* 전체 영상에 UTTEC-Lab 로고 및 교육 사이트 URL 오버레이 */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
