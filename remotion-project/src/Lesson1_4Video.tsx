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
  scene1_intro: { duration: 1236, start: 0 },
  scene2_four_steps: { duration: 1303, start: 1236 },
  scene3_error: { duration: 1369, start: 2539 },
  scene4_weight_update: { duration: 1403, start: 3908 },
  scene5_learning_rate: { duration: 1364, start: 5311 },
  scene6_or_example: { duration: 1672, start: 6675 },
  scene7_outro: { duration: 1205, start: 8347 },
};

export const LESSON_1_4_DURATION = 9552;

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
  learn: "#06b6d4",
  error: "#f97316",
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

// ============ BASKETBALL ANIMATION ============
const BasketballAnimation: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const attempts = [
    { force: 0.3, result: "short" },
    { force: 0.9, result: "over" },
    { force: 0.6, result: "score" },
  ];

  const attemptDuration = 120;
  const currentAttempt = Math.floor(frame / attemptDuration) % 3;
  const attemptFrame = frame % attemptDuration;
  const { force, result } = attempts[currentAttempt];

  const ballProgress = interpolate(attemptFrame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const ballX = interpolate(ballProgress, [0, 1], [400, 700 + force * 200]);
  const ballY = 500 - Math.sin(ballProgress * Math.PI) * (200 + force * 150);

  const rimX = 850;
  const rimY = 350;

  return (
    <div style={{ position: "absolute", right: 100, top: 200 }}>
      {/* Backboard */}
      <div
        style={{
          position: "absolute",
          left: rimX + 30,
          top: rimY - 80,
          width: 20,
          height: 160,
          backgroundColor: colors.gray[300],
          borderRadius: 4,
        }}
      />
      {/* Rim */}
      <div
        style={{
          position: "absolute",
          left: rimX - 40,
          top: rimY,
          width: 80,
          height: 10,
          backgroundColor: colors.danger,
          borderRadius: 5,
        }}
      />
      {/* Net */}
      <div
        style={{
          position: "absolute",
          left: rimX - 30,
          top: rimY + 10,
          width: 60,
          height: 60,
          borderLeft: `3px solid ${colors.white}50`,
          borderRight: `3px solid ${colors.white}50`,
          borderBottom: `3px solid ${colors.white}50`,
          borderRadius: "0 0 30px 30px",
        }}
      />
      {/* Basketball */}
      <div
        style={{
          position: "absolute",
          left: ballX - 25,
          top: ballY - 25,
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: `radial-gradient(circle at 30% 30%, ${colors.accent}, #c2410c)`,
          boxShadow: `0 4px 15px rgba(0,0,0,0.4)`,
        }}
      />
      {/* Result text */}
      {attemptFrame > 70 && (
        <div
          style={{
            position: "absolute",
            left: rimX - 100,
            top: rimY + 100,
            fontSize: 32,
            fontWeight: "bold",
            color: result === "score" ? colors.success : colors.danger,
            opacity: fadeIn(attemptFrame, 70, 15),
          }}
        >
          {result === "short" && "너무 약함!"}
          {result === "over" && "너무 강함!"}
          {result === "score" && "성공!"}
        </div>
      )}
    </div>
  );
};

// ============ LEARNING CYCLE ============
const LearningCycle: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const steps = [
    { label: "1. 예측", icon: "🔮", color: colors.primary },
    { label: "2. 오차 확인", icon: "❌", color: colors.danger },
    { label: "3. 가중치 조정", icon: "⚙️", color: colors.accent },
    { label: "4. 반복", icon: "🔄", color: colors.success },
  ];

  const cycleFrame = frame % 300;
  const activeStep = Math.floor((cycleFrame / 300) * 4);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
      }}
    >
      <div style={{ display: "flex", gap: 40 }}>
        {steps.map((step, i) => {
          const isActive = i === activeStep;
          const scale = scaleIn(frame, fps, i * 30);
          const glow = isActive ? `0 0 30px ${step.color}` : "none";

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                transform: `scale(${scale * (isActive ? 1.1 : 1)})`,
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  backgroundColor: isActive ? step.color : colors.gray[700],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 48,
                  boxShadow: glow,
                  border: `3px solid ${step.color}`,
                  transition: "all 0.3s",
                }}
              >
                {step.icon}
              </div>
              <span
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: isActive ? step.color : colors.gray[300],
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      {/* Arrow connections */}
      <div
        style={{
          display: "flex",
          gap: 80,
          marginTop: -30,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ fontSize: 40, color: colors.gray[500] }}>→</span>
        ))}
      </div>
    </div>
  );
};

// ============ ERROR CALCULATION ============
const ErrorCalculation: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const examples = [
    { target: 1, prediction: 0, error: "+1", meaning: "더 크게 반응해야 해!", color: colors.success },
    { target: 0, prediction: 1, error: "-1", meaning: "너무 민감해!", color: colors.danger },
    { target: 1, prediction: 1, error: "0", meaning: "완벽!", color: colors.primary },
  ];

  const exampleDuration = 180;
  const currentExample = Math.floor(frame / exampleDuration) % 3;
  const { target, prediction, error, meaning, color } = examples[currentExample];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
      }}
    >
      {/* Formula */}
      <div
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: colors.white,
          padding: "20px 60px",
          backgroundColor: `${colors.gray[800]}cc`,
          borderRadius: 20,
          border: `2px solid ${colors.primary}`,
        }}
      >
        오차 = 정답 - 예측
      </div>

      {/* Current Example */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
          fontSize: 56,
          fontWeight: "bold",
        }}
      >
        <span style={{ color: colors.success }}>{target}</span>
        <span style={{ color: colors.gray[500] }}>-</span>
        <span style={{ color: colors.danger }}>{prediction}</span>
        <span style={{ color: colors.gray[500] }}>=</span>
        <span style={{ color }}>{error}</span>
      </div>

      {/* Meaning */}
      <div
        style={{
          fontSize: 36,
          color,
          fontWeight: "bold",
          padding: "15px 40px",
          backgroundColor: `${color}20`,
          borderRadius: 15,
          border: `2px solid ${color}`,
        }}
      >
        {meaning}
      </div>
    </div>
  );
};

// ============ WEIGHT UPDATE FORMULA ============
const WeightUpdateFormula: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const parts = [
    { label: "w_new", color: colors.success, desc: "새 가중치" },
    { label: "w_old", color: colors.gray[300], desc: "이전 가중치" },
    { label: "η", color: colors.accent, desc: "학습률" },
    { label: "error", color: colors.danger, desc: "오차" },
    { label: "input", color: colors.primary, desc: "입력" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
      }}
    >
      {/* Formula */}
      <div
        style={{
          fontSize: 48,
          fontWeight: "bold",
          padding: "30px 60px",
          backgroundColor: `${colors.gray[800]}cc`,
          borderRadius: 20,
          border: `2px solid ${colors.primary}`,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <span style={{ color: colors.success }}>w_new</span>
        <span style={{ color: colors.white }}>=</span>
        <span style={{ color: colors.gray[300] }}>w_old</span>
        <span style={{ color: colors.white }}>+</span>
        <span style={{ color: colors.accent }}>η</span>
        <span style={{ color: colors.white }}>×</span>
        <span style={{ color: colors.danger }}>error</span>
        <span style={{ color: colors.white }}>×</span>
        <span style={{ color: colors.primary }}>input</span>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 40 }}>
        {parts.slice(2).map((part, i) => {
          const scale = scaleIn(frame, fps, 60 + i * 20);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                transform: `scale(${scale})`,
              }}
            >
              <span style={{ fontSize: 36, fontWeight: "bold", color: part.color }}>
                {part.label}
              </span>
              <span style={{ fontSize: 22, color: colors.gray[300] }}>
                {part.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============ LEARNING RATE VISUALIZATION ============
const LearningRateVis: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const rates = [
    { value: 1.0, label: "너무 큼", result: "발산!", color: colors.danger },
    { value: 0.0001, label: "너무 작음", result: "느림...", color: colors.accent },
    { value: 0.1, label: "적당함", result: "성공!", color: colors.success },
  ];

  const rateDuration = 180;
  const currentRate = Math.floor(frame / rateDuration) % 3;
  const { value, label, result, color } = rates[currentRate];

  // Animated walker
  const rateFrame = frame % rateDuration;
  const stepSize = value >= 0.1 ? (value >= 1 ? 100 : 30) : 2;
  const walkerX = 200 + (rateFrame * stepSize * 0.5) % 1000;
  const targetX = 900;

  const isOvershooting = value >= 1.0 && Math.abs(walkerX - targetX) < 150;
  const displayX = isOvershooting ? targetX + (rateFrame % 60 - 30) * 5 : walkerX;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 50,
      }}
    >
      {/* Path visualization */}
      <div
        style={{
          position: "relative",
          width: 1200,
          height: 200,
          backgroundColor: `${colors.gray[800]}50`,
          borderRadius: 20,
        }}
      >
        {/* Path line */}
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 150,
            width: 900,
            height: 4,
            backgroundColor: colors.gray[500],
          }}
        />

        {/* Target (treasure) */}
        <div
          style={{
            position: "absolute",
            top: 70,
            left: targetX - 30,
            fontSize: 60,
          }}
        >
          🎁
        </div>

        {/* Walker */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: Math.min(displayX, 1100) - 25,
            fontSize: 50,
          }}
        >
          🏃
        </div>
      </div>

      {/* Info */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div style={{ fontSize: 40, fontWeight: "bold", color }}>
          학습률: {value} ({label})
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color,
            padding: "15px 50px",
            backgroundColor: `${color}20`,
            borderRadius: 15,
            border: `2px solid ${color}`,
          }}
        >
          {result}
        </div>
      </div>
    </div>
  );
};

// ============ OR GATE LEARNING ============
const ORGateLearning: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const data = [
    { x1: 0, x2: 0, target: 0 },
    { x1: 0, x2: 1, target: 1 },
    { x1: 1, x2: 0, target: 1 },
    { x1: 1, x2: 1, target: 1 },
  ];

  const lr = 0.5;
  const stepDuration = 120;
  const currentStep = Math.floor(frame / stepDuration) % 8;
  const dataIndex = currentStep % 4;
  const epoch = Math.floor(currentStep / 4) + 1;

  // Simplified weight calculation for visualization
  const weights = [
    { w1: 0, w2: 0, b: 0 },
    { w1: 0, w2: 0.5, b: 0.5 },
    { w1: 0.5, w2: 0.5, b: 0.5 },
    { w1: 0.5, w2: 0.5, b: 0.5 },
    { w1: 0.5, w2: 0.5, b: 0.5 },
    { w1: 0.5, w2: 0.5, b: 0.5 },
    { w1: 0.5, w2: 0.5, b: 0.5 },
    { w1: 0.5, w2: 0.5, b: 0.5 },
  ];

  const { w1, w2, b } = weights[Math.min(currentStep, 7)];
  const { x1, x2, target } = data[dataIndex];
  const z = w1 * x1 + w2 * x2 + b;
  const prediction = z > 0 ? 1 : 0;
  const error = target - prediction;
  const isCorrect = error === 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
      }}
    >
      <div style={{ fontSize: 32, fontWeight: "bold", color: colors.gray[300] }}>
        Epoch {epoch} - 데이터 {dataIndex + 1}/4
      </div>

      {/* Current state */}
      <div style={{ display: "flex", gap: 60 }}>
        {/* Weights */}
        <Card width={350}>
          <div style={{ fontSize: 28, fontWeight: "bold", color: colors.primary, marginBottom: 20, textAlign: "center" }}>
            현재 가중치
          </div>
          <div style={{ fontSize: 32, color: colors.white, textAlign: "center" }}>
            w1 = {w1.toFixed(1)}, w2 = {w2.toFixed(1)}
          </div>
          <div style={{ fontSize: 32, color: colors.white, textAlign: "center", marginTop: 10 }}>
            b = {b.toFixed(1)}
          </div>
        </Card>

        {/* Calculation */}
        <Card width={500}>
          <div style={{ fontSize: 28, fontWeight: "bold", color: colors.accent, marginBottom: 20, textAlign: "center" }}>
            계산
          </div>
          <div style={{ fontSize: 28, color: colors.white, textAlign: "center" }}>
            입력: ({x1}, {x2}) → 정답: {target}
          </div>
          <div style={{ fontSize: 28, color: colors.white, textAlign: "center", marginTop: 10 }}>
            z = {w1.toFixed(1)}×{x1} + {w2.toFixed(1)}×{x2} + {b.toFixed(1)} = {z.toFixed(1)}
          </div>
          <div style={{ fontSize: 28, color: colors.white, textAlign: "center", marginTop: 10 }}>
            예측 = {prediction}
          </div>
        </Card>
      </div>

      {/* Result */}
      <div
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: isCorrect ? colors.success : colors.danger,
          padding: "15px 50px",
          backgroundColor: isCorrect ? `${colors.success}20` : `${colors.danger}20`,
          borderRadius: 15,
          border: `2px solid ${isCorrect ? colors.success : colors.danger}`,
        }}
      >
        {isCorrect ? "정답! 수정 불필요" : `오차: ${error > 0 ? "+" : ""}${error} → 가중치 업데이트!`}
      </div>
    </div>
  );
};

// ============ SCENE COMPONENTS ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = scaleIn(frame, fps, 0);
  const subtitleOpacity = fadeIn(frame, 30, 30);

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
          paddingTop: 50,
        }}
      >
        <div style={{ transform: `scale(${titleScale})` }}>
          <GlowText fontSize={90} glowColor={colors.learn}>
            퍼셉트론 학습
          </GlowText>
        </div>

        <div
          style={{
            marginTop: 30,
            opacity: subtitleOpacity,
            fontSize: 42,
            color: colors.gray[300],
          }}
        >
          AI가 배우는 방법을 배워봐요
        </div>

        {frame > 90 && (
          <div style={{ marginTop: 80 }}>
            <BasketballAnimation frame={frame - 90} fps={fps} />
          </div>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene2FourSteps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 0, 30);

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#0d9488" color2="#0891b2" color3="#0f172a" />
      <Particles count={30} color={colors.learn} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 100,
          gap: 60,
        }}
      >
        <div style={{ opacity: titleOpacity }}>
          <GlowText fontSize={64} glowColor={colors.learn}>
            학습의 4단계
          </GlowText>
        </div>

        {frame > 30 && <LearningCycle frame={frame - 30} fps={fps} />}

        {frame > 200 && (
          <Card width={900} style={{ marginTop: 40 }}>
            <div style={{ fontSize: 36, color: colors.white, textAlign: "center" }}>
              <span style={{ color: colors.accent }}>학습 = </span>
              <span>"최적의 </span>
              <span style={{ color: colors.success }}>가중치</span>
              <span>와 </span>
              <span style={{ color: colors.primary }}>편향</span>
              <span>을 찾아가는 과정"</span>
            </div>
          </Card>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene3Error: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 0, 30);

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#b91c1c" color2="#c2410c" color3="#1e1b4b" />
      <Particles count={25} color={colors.error} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 100,
          gap: 50,
        }}
      >
        <div style={{ opacity: titleOpacity }}>
          <GlowText fontSize={64} glowColor={colors.danger}>
            오차(Error) 계산
          </GlowText>
        </div>

        <div
          style={{
            opacity: titleOpacity,
            fontSize: 32,
            color: colors.gray[300],
          }}
        >
          "얼마나 틀렸는지" 측정하기
        </div>

        {frame > 30 && <ErrorCalculation frame={frame - 30} fps={fps} />}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene4WeightUpdate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 0, 30);

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#7c3aed" color2="#6366f1" color3="#1e1b4b" />
      <Particles count={30} color={colors.secondary} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 120,
          gap: 60,
        }}
      >
        <div style={{ opacity: titleOpacity }}>
          <GlowText fontSize={64} glowColor={colors.secondary}>
            가중치 업데이트 공식
          </GlowText>
        </div>

        {frame > 30 && <WeightUpdateFormula frame={frame - 30} fps={fps} />}

        {frame > 200 && (
          <Card width={900}>
            <div style={{ fontSize: 32, color: colors.white, textAlign: "center" }}>
              입력이 <span style={{ color: colors.primary }}>크게 기여</span>했으면 → 해당 가중치를
              <span style={{ color: colors.accent }}> 많이</span> 조정
            </div>
          </Card>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene5LearningRate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 0, 30);

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#d97706" color2="#b45309" color3="#1e1b4b" />
      <Particles count={25} color={colors.accent} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 100,
          gap: 40,
        }}
      >
        <div style={{ opacity: titleOpacity }}>
          <GlowText fontSize={64} glowColor={colors.accent}>
            학습률 (Learning Rate)
          </GlowText>
        </div>

        <div
          style={{
            opacity: titleOpacity,
            fontSize: 32,
            color: colors.gray[300],
          }}
        >
          한 걸음의 크기 결정하기
        </div>

        {frame > 30 && <LearningRateVis frame={frame - 30} fps={fps} />}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene6ORExample: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 0, 30);

  return (
    <AbsoluteFill>
      <AnimatedBackground color1="#059669" color2="#0d9488" color3="#0f172a" />
      <Particles count={30} color={colors.success} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 80,
          gap: 40,
        }}
      >
        <div style={{ opacity: titleOpacity }}>
          <GlowText fontSize={56} glowColor={colors.success}>
            실전: OR 게이트 학습
          </GlowText>
        </div>

        {frame > 30 && <ORGateLearning frame={frame - 30} fps={fps} />}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summaryItems = [
    "학습 = 예측 → 오차 확인 → 가중치 조정 → 반복",
    "오차 = 정답 - 예측 (방향과 크기를 알려줌)",
    "w_new = w_old + η × error × input",
    "학습률은 0.01~0.1 사이가 적당",
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
          gap: 40,
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
                  border: `2px solid ${colors.primary}40`,
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    color: colors.primary,
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: 28, color: colors.white }}>
                  {item}
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
              color: colors.accent,
              fontWeight: "bold",
            }}
          >
            다음 시간: AND, OR, NOT 게이트
          </div>
        )}
      </div>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

// ============ MAIN COMPOSITION ============
export const Lesson1_4Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      {/* Audio tracks */}
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Audio src={staticFile("audio/lesson-1-4/scene1_intro.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene2_four_steps.start} durationInFrames={SCENE_TIMINGS.scene2_four_steps.duration}>
        <Audio src={staticFile("audio/lesson-1-4/scene2_four_steps.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene3_error.start} durationInFrames={SCENE_TIMINGS.scene3_error.duration}>
        <Audio src={staticFile("audio/lesson-1-4/scene3_error.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene4_weight_update.start} durationInFrames={SCENE_TIMINGS.scene4_weight_update.duration}>
        <Audio src={staticFile("audio/lesson-1-4/scene4_weight_update.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene5_learning_rate.start} durationInFrames={SCENE_TIMINGS.scene5_learning_rate.duration}>
        <Audio src={staticFile("audio/lesson-1-4/scene5_learning_rate.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene6_or_example.start} durationInFrames={SCENE_TIMINGS.scene6_or_example.duration}>
        <Audio src={staticFile("audio/lesson-1-4/scene6_or_example.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Audio src={staticFile("audio/lesson-1-4/scene7_outro.mp3")} />
      </Sequence>

      {/* Scene components */}
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene2_four_steps.start} durationInFrames={SCENE_TIMINGS.scene2_four_steps.duration}>
        <Scene2FourSteps />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene3_error.start} durationInFrames={SCENE_TIMINGS.scene3_error.duration}>
        <Scene3Error />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene4_weight_update.start} durationInFrames={SCENE_TIMINGS.scene4_weight_update.duration}>
        <Scene4WeightUpdate />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene5_learning_rate.start} durationInFrames={SCENE_TIMINGS.scene5_learning_rate.duration}>
        <Scene5LearningRate />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene6_or_example.start} durationInFrames={SCENE_TIMINGS.scene6_or_example.duration}>
        <Scene6ORExample />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
