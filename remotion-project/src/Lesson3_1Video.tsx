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
  scene1_intro: { duration: 855, start: 0 },
  scene2_mse: { duration: 1055, start: 855 },
  scene3_crossentropy: { duration: 1087, start: 1910 },
  scene4_comparison: { duration: 975, start: 2997 },
  scene5_landscape: { duration: 946, start: 3972 },
  scene6_outro: { duration: 842, start: 4918 },
};

export const LESSON_3_1_DURATION = 5760;

// ============ COLORS (Purple for Level 3) ============
const colors = {
  bg: {
    dark: "#0f172a",
  },
  primary: "#a855f7", // Purple for Level 3
  secondary: "#7c3aed",
  accent: "#f59e0b",
  tertiary: "#6366f1",
  danger: "#ef4444",
  success: "#10b981",
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
  color1 = colors.primary,
  color2 = colors.secondary,
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
  width?: number | string;
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
      <Audio src={staticFile("audio/lesson-3-1/scene1_intro.mp3")} />
      <AnimatedBackground color1="#4c1d95" color2={colors.primary} color3="#0f172a" />
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
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 3 - Lesson 1</span>
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
          <span style={{ fontSize: 120, marginRight: 20 }}>📝</span>
          <GlowText fontSize={90} glowColor={colors.primary}>손실 함수</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>
            모델의 성적표 - MSE와 Cross-Entropy
          </span>
        </div>
      </div>

      {/* 핵심 키워드 */}
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
          { icon: "📊", text: "MSE" },
          { icon: "🎯", text: "Cross-Entropy" },
          { icon: "⛰️", text: "손실 지형" },
          { icon: "🔄", text: "역전파" },
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

// ============ SCENE 2: MSE ============
const Scene2MSE: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-1/scene2_mse.mp3")} />
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
        <GlowText fontSize={64} glowColor="#3b82f6">📊 MSE (평균 제곱 오차)</GlowText>
      </div>

      {/* 수식 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={800} borderColor="#3b82f6">
          <div style={{ textAlign: "center" }}>
            <MathFormula formula="MSE = (1/n) × Σ(y - ŷ)²" fontSize={56} />
            <div style={{ marginTop: 20, fontSize: 28, color: colors.gray[300] }}>
              예측값과 실제값 차이를 제곱 후 평균
            </div>
          </div>
        </Card>
      </div>

      {/* 예시 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        <Card width={350} borderColor={colors.accent} style={{ transform: `scale(${scaleIn(frame, fps, 200)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>🏠</div>
            <div style={{ fontSize: 28, color: colors.white, marginTop: 15 }}>실제 집값</div>
            <div style={{ fontSize: 42, color: colors.accent, fontWeight: "bold", marginTop: 10 }}>3억원</div>
          </div>
        </Card>
        <Card width={350} borderColor={colors.danger} style={{ transform: `scale(${scaleIn(frame, fps, 250)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>🤖</div>
            <div style={{ fontSize: 28, color: colors.white, marginTop: 15 }}>예측 집값</div>
            <div style={{ fontSize: 42, color: colors.danger, fontWeight: "bold", marginTop: 10 }}>2.8억원</div>
          </div>
        </Card>
        <Card width={350} borderColor={colors.success} style={{ transform: `scale(${scaleIn(frame, fps, 300)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>📝</div>
            <div style={{ fontSize: 28, color: colors.white, marginTop: 15 }}>오차²</div>
            <div style={{ fontSize: 42, color: colors.success, fontWeight: "bold", marginTop: 10 }}>400억²</div>
          </div>
        </Card>
      </div>

      {/* 용도 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 30),
        }}
      >
        <span style={{ fontSize: 32, color: colors.gray[300] }}>
          📈 회귀 문제에 사용: 집값, 주가, 온도 예측
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: CROSS-ENTROPY ============
const Scene3CrossEntropy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-1/scene3_crossentropy.mp3")} />
      <AnimatedBackground color1="#7c2d12" color2="#ea580c" color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor="#ea580c">🎯 Cross-Entropy (교차 엔트로피)</GlowText>
      </div>

      {/* 수식 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={900} borderColor="#ea580c">
          <div style={{ textAlign: "center" }}>
            <MathFormula formula="CE = -Σ y × log(p)" fontSize={56} />
            <div style={{ marginTop: 20, fontSize: 28, color: colors.gray[300] }}>
              정답 확률에 -log를 적용
            </div>
          </div>
        </Card>
      </div>

      {/* 분류 예시 */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 80,
          opacity: fadeIn(frame, 180, 40),
        }}
      >
        {/* 자신있게 맞춤 */}
        <Card width={400} borderColor={colors.success} style={{ transform: `scale(${scaleIn(frame, fps, 180)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 15 }}>🐱</div>
            <div style={{ fontSize: 28, color: colors.white }}>정답: 고양이</div>
            <div style={{ fontSize: 36, color: colors.success, fontWeight: "bold", marginTop: 10 }}>
              예측: 90% 고양이
            </div>
            <div style={{ fontSize: 28, color: colors.gray[300], marginTop: 15 }}>
              손실: <span style={{ color: colors.success }}>낮음 ✓</span>
            </div>
          </div>
        </Card>

        {/* 자신있게 틀림 */}
        <Card width={400} borderColor={colors.danger} style={{ transform: `scale(${scaleIn(frame, fps, 250)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 15 }}>🐱</div>
            <div style={{ fontSize: 28, color: colors.white }}>정답: 고양이</div>
            <div style={{ fontSize: 36, color: colors.danger, fontWeight: "bold", marginTop: 10 }}>
              예측: 10% 고양이
            </div>
            <div style={{ fontSize: 28, color: colors.gray[300], marginTop: 15 }}>
              손실: <span style={{ color: colors.danger }}>높음 ✗</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 핵심 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 30),
        }}
      >
        <span style={{ fontSize: 32, color: colors.gray[300] }}>
          🏷️ 분류 문제에 사용: 이미지 분류, 감정 분석, 스팸 필터
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: COMPARISON ============
const Scene4Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-1/scene4_comparison.mp3")} />
      <AnimatedBackground color1="#4c1d95" color2={colors.primary} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.primary}>⚖️ 언제 뭘 써야 할까?</GlowText>
      </div>

      {/* 비교 테이블 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 80,
          opacity: fadeIn(frame, 80, 40),
        }}
      >
        {/* MSE */}
        <Card width={500} borderColor="#3b82f6" style={{ transform: `scale(${scaleIn(frame, fps, 80)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>📊</div>
            <div style={{ fontSize: 42, color: "#3b82f6", fontWeight: "bold" }}>MSE</div>
            <div style={{ fontSize: 28, color: colors.gray[300], marginTop: 20, marginBottom: 25 }}>
              회귀 문제
            </div>
            <div style={{ fontSize: 26, color: colors.white, lineHeight: 1.8 }}>
              출력이 <span style={{ color: colors.accent }}>연속적인 숫자</span><br />
              집값 예측<br />
              주가 예측<br />
              온도 예측
            </div>
          </div>
        </Card>

        {/* Cross-Entropy */}
        <Card width={500} borderColor="#ea580c" style={{ transform: `scale(${scaleIn(frame, fps, 150)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🎯</div>
            <div style={{ fontSize: 42, color: "#ea580c", fontWeight: "bold" }}>Cross-Entropy</div>
            <div style={{ fontSize: 28, color: colors.gray[300], marginTop: 20, marginBottom: 25 }}>
              분류 문제
            </div>
            <div style={{ fontSize: 26, color: colors.white, lineHeight: 1.8 }}>
              출력이 <span style={{ color: colors.accent }}>카테고리 중 하나</span><br />
              이미지 분류<br />
              스팸 필터<br />
              감정 분석
            </div>
          </div>
        </Card>
      </div>

      {/* 경고 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 350, 40),
        }}
      >
        <Card width={800} borderColor={colors.danger}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 36 }}>⚠️</span>
            <span style={{ fontSize: 32, color: colors.white, marginLeft: 15 }}>
              분류 문제에 MSE를 쓰면 학습이 잘 안 됩니다!
            </span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: LOSS LANDSCAPE ============
const Scene5Landscape: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 공 위치 애니메이션
  const ballProgress = interpolate(frame, [200, 600], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ballX = 300 + ballProgress * 600;
  const ballY = 200 + Math.sin(ballProgress * Math.PI) * 150 + ballProgress * 200;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-1/scene5_landscape.mp3")} />
      <AnimatedBackground color1="#065f46" color2={colors.success} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.success}>⛰️ 손실 지형 (Loss Landscape)</GlowText>
      </div>

      {/* 산 그림 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 1200,
          height: 500,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        {/* 산 SVG */}
        <svg width="1200" height="500" viewBox="0 0 1200 500">
          {/* 산 모양 */}
          <path
            d="M 0,400 Q 200,100 400,350 Q 600,150 800,380 Q 1000,200 1200,400 L 1200,500 L 0,500 Z"
            fill={`${colors.primary}40`}
            stroke={colors.primary}
            strokeWidth="4"
          />
          {/* 최저점 표시 */}
          <circle cx="600" cy="150" r="15" fill={colors.success} />
          <text x="600" y="120" textAnchor="middle" fill={colors.white} fontSize="24" fontWeight="bold">
            최저점 (목표)
          </text>

          {/* 경사하강 화살표 */}
          <path
            d="M 350,280 Q 450,200 550,160"
            fill="none"
            stroke={colors.accent}
            strokeWidth="4"
            strokeDasharray="10,5"
            opacity={fadeIn(frame, 300, 30)}
          />
          <polygon
            points="550,160 530,155 535,175"
            fill={colors.accent}
            opacity={fadeIn(frame, 300, 30)}
          />
        </svg>

        {/* 공 (현재 위치) */}
        <div
          style={{
            position: "absolute",
            left: ballX,
            top: ballY,
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: colors.accent,
            boxShadow: `0 0 30px ${colors.accent}`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <Card width={350} borderColor={colors.primary} style={{ transform: `scale(${scaleIn(frame, fps, 400)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 42 }}>📉</div>
            <div style={{ fontSize: 26, color: colors.white, marginTop: 10 }}>경사하강법</div>
            <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 8 }}>산을 내려가는 방법</div>
          </div>
        </Card>
        <Card width={350} borderColor={colors.accent} style={{ transform: `scale(${scaleIn(frame, fps, 450)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 42 }}>🔙</div>
            <div style={{ fontSize: 26, color: colors.white, marginTop: 10 }}>loss.backward()</div>
            <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 8 }}>방향 계산</div>
          </div>
        </Card>
        <Card width={350} borderColor={colors.success} style={{ transform: `scale(${scaleIn(frame, fps, 500)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 42 }}>🎯</div>
            <div style={{ fontSize: 26, color: colors.white, marginTop: 10 }}>목표</div>
            <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 8 }}>최저점 찾기</div>
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

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-1/scene6_outro.mp3")} />
      <AnimatedBackground color1="#4c1d95" color2={colors.primary} color3="#0f172a" />
      <Particles count={40} />

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
        <GlowText fontSize={64} glowColor={colors.primary}>📝 오늘 배운 내용</GlowText>
      </div>

      {/* 요약 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 30,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        {[
          { icon: "📝", title: "손실 함수", desc: "모델 예측의 오차를 측정하는 채점표" },
          { icon: "📊", title: "MSE", desc: "회귀 문제에 사용 (연속적인 숫자)" },
          { icon: "🎯", title: "Cross-Entropy", desc: "분류 문제에 사용 (카테고리 선택)" },
          { icon: "⛰️", title: "손실 지형", desc: "최저점을 찾는 것이 학습의 목표" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              opacity: fadeIn(frame, 80 + i * 50, 30),
              transform: `translateX(${slideUp(frame, 80 + i * 50, 30)}px)`,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                backgroundColor: `${colors.primary}40`,
                border: `3px solid ${colors.primary}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 42,
              }}
            >
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>{item.title}</div>
              <div style={{ fontSize: 24, color: colors.gray[300], marginTop: 5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 다음 예고 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <Card width={800} borderColor={colors.accent}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 36, color: colors.accent }}>➡️ 다음 시간:</span>
            <span style={{ fontSize: 32, color: colors.white, marginLeft: 20 }}>
              경사하강법으로 산을 내려가는 방법!
            </span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const Lesson3_1Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <GlobalOverlay />

      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_mse.start} durationInFrames={SCENE_TIMINGS.scene2_mse.duration}>
        <Scene2MSE />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_crossentropy.start} durationInFrames={SCENE_TIMINGS.scene3_crossentropy.duration}>
        <Scene3CrossEntropy />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_comparison.start} durationInFrames={SCENE_TIMINGS.scene4_comparison.duration}>
        <Scene4Comparison />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_landscape.start} durationInFrames={SCENE_TIMINGS.scene5_landscape.duration}>
        <Scene5Landscape />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_outro.start} durationInFrames={SCENE_TIMINGS.scene6_outro.duration}>
        <Scene6Outro />
      </Sequence>
    </AbsoluteFill>
  );
};

export default Lesson3_1Video;
