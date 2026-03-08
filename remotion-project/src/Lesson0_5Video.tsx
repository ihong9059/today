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
  scene1_intro: { duration: 776, start: 0 },
  scene2_array: { duration: 1223, start: 776 },
  scene3_shape: { duration: 1289, start: 1999 },
  scene4_operations: { duration: 1232, start: 3288 },
  scene5_indexing: { duration: 1109, start: 4520 },
  scene6_ai_usage: { duration: 1353, start: 5629 },
  scene7_outro: { duration: 1049, start: 6982 },
};

export const LESSON_0_5_DURATION = 8031;

// ============ COLORS ============
const colors = {
  bg: {
    dark: "#0f172a",
  },
  numpy: {
    primary: "#0ea5e9",   // Cyan blue
    secondary: "#06b6d4", // Teal
    accent: "#14b8a6",    // Light teal
    dark: "#0c4a6e",      // Dark blue
  },
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  accent: "#f59e0b",
  success: "#10b981",
  danger: "#ef4444",
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
            background: `linear-gradient(135deg, ${colors.numpy.primary} 0%, ${colors.numpy.secondary} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 15px ${colors.numpy.primary}60`,
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
            border: `2px solid ${colors.numpy.primary}60`,
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
  color1 = colors.numpy.dark,
  color2 = colors.numpy.primary,
  color3 = colors.bg.dark
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
              background: `radial-gradient(circle, ${colors.numpy.primary}30 0%, transparent 70%)`,
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
}> = ({ children, fontSize = 72, color = colors.white, glowColor = colors.numpy.primary }) => (
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
}> = ({ children, width = 400, borderColor = colors.numpy.primary, glow = true, style = {} }) => (
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

const CodeBlock: React.FC<{ title: string; code: string; width?: number }> = ({ title, code, width = 600 }) => (
  <div
    style={{
      width,
      backgroundColor: "#1e293b",
      borderRadius: 20,
      overflow: "hidden",
      border: `2px solid ${colors.gray[700]}`,
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    }}
  >
    <div
      style={{
        padding: "12px 20px",
        backgroundColor: colors.gray[800],
        borderBottom: `1px solid ${colors.gray[700]}`,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ef4444" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#22c55e" }} />
      </div>
      <span style={{ fontSize: 16, color: colors.gray[400], marginLeft: 10 }}>{title}</span>
    </div>
    <pre
      style={{
        margin: 0,
        padding: 25,
        fontSize: 22,
        lineHeight: 1.6,
        color: colors.gray[100],
        fontFamily: "'Fira Code', 'Consolas', monospace",
        overflow: "hidden",
      }}
    >
      {code}
    </pre>
  </div>
);

// ============ ARRAY VISUALIZATION COMPONENT ============
const ArrayVisualization: React.FC<{
  values: number[];
  title: string;
  color?: string;
  delay?: number;
}> = ({ values, title, color = colors.numpy.primary, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        opacity: fadeIn(frame, delay, 30),
        transform: `scale(${scaleIn(frame, fps, delay)})`,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 15 }}>
        <span style={{ fontSize: 20, color: colors.gray[300] }}>{title}</span>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {values.map((val, i) => (
          <div
            key={i}
            style={{
              width: 70,
              height: 70,
              backgroundColor: `${color}20`,
              border: `3px solid ${color}`,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: colors.white,
              transform: `scale(${scaleIn(frame, fps, delay + i * 10)})`,
            }}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ MATRIX VISUALIZATION COMPONENT ============
const MatrixVisualization: React.FC<{
  matrix: number[][];
  title: string;
  color?: string;
  delay?: number;
}> = ({ matrix, title, color = colors.numpy.primary, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        opacity: fadeIn(frame, delay, 30),
        transform: `scale(${scaleIn(frame, fps, delay)})`,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 15 }}>
        <span style={{ fontSize: 20, color: colors.gray[300] }}>{title}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {matrix.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {row.map((val, j) => (
              <div
                key={j}
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: `${color}20`,
                  border: `2px solid ${color}`,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.white,
                  transform: `scale(${scaleIn(frame, fps, delay + i * 15 + j * 5)})`,
                }}
              >
                {val}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 30, 40);
  const titleY = slideUp(frame, 30, 40);
  const badgeOpacity = fadeIn(frame, 80, 30);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-5/scene1_intro.mp3")} />
      <AnimatedBackground />
      <Particles count={40} color={colors.numpy.secondary} />

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
            background: `linear-gradient(135deg, ${colors.gray[700]} 0%, ${colors.gray[800]} 100%)`,
            borderRadius: 20,
            border: `2px solid ${colors.gray[500]}`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 0 - Lesson 5</span>
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
          <span style={{ fontSize: 120, marginRight: 20 }}>🔢</span>
          <GlowText fontSize={90} glowColor={colors.numpy.primary}>NumPy 기초</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>
            AI의 데이터 언어, 텐서의 세계로!
          </span>
        </div>
      </div>

      {/* 학습 내용 미리보기 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: fadeIn(frame, 150, 40),
        }}
      >
        {[
          { icon: "📊", text: "배열 생성" },
          { icon: "🧱", text: "텐서" },
          { icon: "🔄", text: "Reshape" },
          { icon: "⚡", text: "벡터 연산" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "20px 35px",
              backgroundColor: `${colors.gray[800]}cc`,
              borderRadius: 15,
              border: `2px solid ${colors.numpy.primary}`,
              transform: `scale(${scaleIn(frame, fps, 150 + i * 20)})`,
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

// ============ SCENE 2: ARRAY CREATION ============
const Scene2Array: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-5/scene2_array.mp3")} />
      <AnimatedBackground />
      <Particles count={25} color={colors.numpy.accent} />

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
        <GlowText fontSize={64} glowColor={colors.numpy.primary}>📊 NumPy 배열 생성</GlowText>
      </div>

      {/* 배열 생성 방법들 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 100,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        {[
          { method: "np.array([1,2,3])", desc: "리스트를 배열로", delay: 60 },
          { method: "np.zeros(5)", desc: "0으로 가득 채우기", delay: 180 },
          { method: "np.ones(5)", desc: "1로 가득 채우기", delay: 300 },
          { method: "np.arange(0,10)", desc: "연속된 숫자", delay: 420 },
        ].map((item) => (
          <div
            key={item.method}
            style={{
              opacity: fadeIn(frame, item.delay, 40),
              transform: `translateX(${slideUp(frame, item.delay, 40, -80) * -1}px)`,
            }}
          >
            <Card width={600} borderColor={colors.numpy.primary}>
              <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <div style={{ fontSize: 24, color: colors.numpy.secondary, fontWeight: "bold", fontFamily: "monospace" }}>
                  {item.method}
                </div>
                <div style={{ fontSize: 20, color: colors.gray[300] }}>{item.desc}</div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 배열 시각화 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: "25%",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <ArrayVisualization
          values={[1, 2, 3, 4, 5]}
          title="np.array([1,2,3,4,5])"
          color={colors.numpy.primary}
          delay={100}
        />
        <ArrayVisualization
          values={[2, 4, 6, 8, 10]}
          title="배열 × 2 = 각 원소 × 2"
          color={colors.success}
          delay={550}
        />
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 650, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.numpy.primary} 0%, ${colors.numpy.secondary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.numpy.primary}60`,
          }}
        >
          <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
            💡 for루프 없이 배열 전체를 한번에 계산!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: SHAPE & RESHAPE ============
const Scene3Shape: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-5/scene3_shape.mp3")} />
      <AnimatedBackground color1="#0c4a6e" color2={colors.numpy.primary} color3={colors.bg.dark} />
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
        <GlowText fontSize={64} glowColor={colors.numpy.primary}>🔄 Shape과 Reshape</GlowText>
      </div>

      {/* 1D → 2D 변환 시각화 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 50,
          alignItems: "center",
        }}
      >
        {/* 1D 배열 */}
        <div style={{ opacity: fadeIn(frame, 60, 40) }}>
          <ArrayVisualization
            values={[1, 2, 3, 4, 5, 6]}
            title="1D: (6,)"
            color={colors.numpy.primary}
            delay={60}
          />
        </div>

        {/* 화살표 */}
        <div
          style={{
            fontSize: 60,
            color: colors.numpy.secondary,
            opacity: fadeIn(frame, 200, 40),
          }}
        >
          ↓ reshape(2, 3)
        </div>

        {/* 2D 행렬 */}
        <div style={{ opacity: fadeIn(frame, 280, 40) }}>
          <MatrixVisualization
            matrix={[[1, 2, 3], [4, 5, 6]]}
            title="2D: (2, 3)"
            color={colors.numpy.secondary}
            delay={280}
          />
        </div>
      </div>

      {/* reshape 규칙 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: "25%",
          opacity: fadeIn(frame, 450, 40),
        }}
      >
        <Card width={500} borderColor={colors.accent}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 28, color: colors.accent, fontWeight: "bold" }}>📐 Reshape 규칙</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 15, fontSize: 22, color: colors.gray[200] }}>
            <div>✅ (6,) → (2,3) = 6개</div>
            <div>✅ (6,) → (3,2) = 6개</div>
            <div>❌ (6,) → (2,4) = 8개</div>
            <div style={{ marginTop: 15, padding: "15px", backgroundColor: `${colors.numpy.primary}20`, borderRadius: 10 }}>
              <span style={{ color: colors.numpy.primary }}>💡 원소 개수는 같아야 함!</span>
            </div>
          </div>
        </Card>
      </div>

      {/* -1 자동 계산 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 100,
          opacity: fadeIn(frame, 650, 40),
        }}
      >
        <Card width={700} borderColor={colors.numpy.accent}>
          <div style={{ fontSize: 24, color: colors.white, marginBottom: 15 }}>
            <span style={{ color: colors.numpy.accent, fontWeight: "bold" }}>reshape(-1)</span> = 자동 계산
          </div>
          <div style={{ fontSize: 20, color: colors.gray[300], fontFamily: "monospace" }}>
            image.reshape(-1) → (784,)<br/>
            image.reshape(28, -1) → (28, 28)
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: OPERATIONS & BROADCASTING ============
const Scene4Operations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-5/scene4_operations.mp3")} />
      <AnimatedBackground color1="#134e4a" color2={colors.numpy.accent} color3={colors.bg.dark} />
      <Particles count={25} color={colors.numpy.accent} />

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
        <GlowText fontSize={64} glowColor={colors.numpy.accent}>⚡ 배열 연산과 Broadcasting</GlowText>
      </div>

      {/* for루프 vs NumPy 비교 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          right: 100,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {/* for루프 */}
        <div style={{ opacity: fadeIn(frame, 60, 40) }}>
          <Card width={550} borderColor={colors.danger}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 28, color: colors.danger, fontWeight: "bold" }}>❌ for루프 (느림)</span>
            </div>
            <CodeBlock
              title="Python"
              code={`result = []
for a, b in zip(list_a, list_b):
    result.append(a + b)
# 하나씩 계산...`}
              width={480}
            />
          </Card>
        </div>

        {/* NumPy */}
        <div style={{ opacity: fadeIn(frame, 200, 40) }}>
          <Card width={550} borderColor={colors.success}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 28, color: colors.success, fontWeight: "bold" }}>✅ NumPy (빠름)</span>
            </div>
            <CodeBlock
              title="NumPy"
              code={`result = np_a + np_b
# 한번에 계산!
# 수백만 개도 몇 초!`}
              width={480}
            />
          </Card>
        </div>
      </div>

      {/* Broadcasting 시각화 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 450, 40),
        }}
      >
        <Card width={800} borderColor={colors.numpy.primary}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 28, color: colors.numpy.primary, fontWeight: "bold" }}>📡 Broadcasting</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30, fontSize: 24 }}>
            <div style={{ fontFamily: "monospace", color: colors.white }}>
              [1, 2, 3, 4, 5]
            </div>
            <span style={{ fontSize: 40, color: colors.numpy.secondary }}>+</span>
            <div style={{ fontFamily: "monospace", color: colors.accent }}>
              10
            </div>
            <span style={{ fontSize: 40, color: colors.numpy.secondary }}>=</span>
            <div style={{ fontFamily: "monospace", color: colors.success }}>
              [11, 12, 13, 14, 15]
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 20, fontSize: 20, color: colors.gray[300] }}>
            → 10이 자동으로 [10,10,10,10,10]으로 확장!
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: INDEXING ============
const Scene5Indexing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-5/scene5_indexing.mp3")} />
      <AnimatedBackground />
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
        <GlowText fontSize={64} glowColor={colors.numpy.primary}>🎯 인덱싱과 슬라이싱</GlowText>
      </div>

      {/* 인덱싱 예제 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={900} borderColor={colors.numpy.primary}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
              arr = [10, 20, 30, 40, 50]
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 24, fontFamily: "monospace" }}>
            <div style={{ opacity: fadeIn(frame, 120, 40) }}>
              <span style={{ color: colors.numpy.primary }}>arr[0]</span>
              <span style={{ color: colors.gray[400] }}> = </span>
              <span style={{ color: colors.success }}>10</span>
              <span style={{ color: colors.gray[500], marginLeft: 20 }}>// 첫 번째</span>
            </div>
            <div style={{ opacity: fadeIn(frame, 200, 40) }}>
              <span style={{ color: colors.numpy.primary }}>arr[-1]</span>
              <span style={{ color: colors.gray[400] }}> = </span>
              <span style={{ color: colors.success }}>50</span>
              <span style={{ color: colors.gray[500], marginLeft: 20 }}>// 마지막</span>
            </div>
            <div style={{ opacity: fadeIn(frame, 280, 40) }}>
              <span style={{ color: colors.numpy.primary }}>arr[1:4]</span>
              <span style={{ color: colors.gray[400] }}> = </span>
              <span style={{ color: colors.success }}>[20, 30, 40]</span>
              <span style={{ color: colors.gray[500], marginLeft: 20 }}>// 슬라이싱</span>
            </div>
            <div style={{ opacity: fadeIn(frame, 360, 40) }}>
              <span style={{ color: colors.numpy.primary }}>arr[::2]</span>
              <span style={{ color: colors.gray[400] }}> = </span>
              <span style={{ color: colors.success }}>[10, 30, 50]</span>
              <span style={{ color: colors.gray[500], marginLeft: 20 }}>// 2칸씩</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 2D 인덱싱 */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 500, 40),
        }}
      >
        <Card width={700} borderColor={colors.numpy.secondary}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>2D 배열 인덱싱</span>
          </div>
          <div style={{ fontSize: 24, fontFamily: "monospace" }}>
            <div style={{ color: colors.gray[300], marginBottom: 15 }}>
              matrix = [[1,2,3], [4,5,6], [7,8,9]]
            </div>
            <div style={{ color: colors.numpy.secondary }}>
              matrix[1, 2] = 6
            </div>
            <div style={{ color: colors.gray[500], fontSize: 20, marginTop: 10 }}>
              → 1행 2열 (0부터 시작)
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: AI USAGE ============
const Scene6AIUsage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-5/scene6_ai_usage.mp3")} />
      <AnimatedBackground color1="#7c2d12" color2="#ea580c" color3={colors.bg.dark} />
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
        <GlowText fontSize={64} glowColor="#f97316">🧠 AI에서의 NumPy 활용</GlowText>
      </div>

      {/* AI 데이터 형태들 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          right: 100,
          display: "flex",
          flexDirection: "column",
          gap: 25,
        }}
      >
        {[
          { type: "이미지", shape: "(28, 28, 3)", desc: "높이 × 너비 × RGB", icon: "📷", delay: 60 },
          { type: "가중치", shape: "(784, 128)", desc: "입력 → 뉴런", icon: "⚖️", delay: 180 },
          { type: "배치", shape: "(32, 28, 28, 3)", desc: "32장의 이미지", icon: "📦", delay: 300 },
        ].map((item) => (
          <div
            key={item.type}
            style={{
              opacity: fadeIn(frame, item.delay, 40),
              transform: `translateX(${slideUp(frame, item.delay, 40, -80) * -1}px)`,
            }}
          >
            <Card width={1720} borderColor={colors.numpy.primary}>
              <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
                <div style={{ fontSize: 60 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>{item.type}</div>
                  <div style={{ fontSize: 24, color: colors.numpy.primary, fontFamily: "monospace", marginTop: 5 }}>
                    shape: {item.shape}
                  </div>
                  <div style={{ fontSize: 20, color: colors.gray[400], marginTop: 5 }}>{item.desc}</div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 신경망 공식 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 500, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 70px",
            background: `linear-gradient(135deg, #dc2626 0%, #ea580c 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 60px #ea580c80`,
          }}
        >
          <div style={{ fontSize: 24, color: colors.white, marginBottom: 15 }}>딥러닝의 기본 공식</div>
          <div style={{ fontSize: 48, color: colors.white, fontWeight: "bold", fontFamily: "serif" }}>
            y = ReLU(W·x + b)
          </div>
          <div style={{ fontSize: 20, color: colors.gray[100], marginTop: 15 }}>
            행렬 곱 + 편향 + 활성화 함수
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 7: OUTRO ============
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checkItems = [
    { icon: "✅", text: "NumPy 배열 생성과 연산" },
    { icon: "✅", text: "텐서의 차원과 Shape" },
    { icon: "✅", text: "Reshape와 Broadcasting" },
    { icon: "✅", text: "AI에서의 NumPy 활용" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-5/scene7_outro.mp3")} />
      <AnimatedBackground color1="#7c3aed" color2="#2563eb" color3={colors.bg.dark} />
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
        <GlowText fontSize={64} glowColor={colors.secondary}>🎉 오늘 배운 내용</GlowText>
      </div>

      {/* 체크리스트 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 25,
        }}
      >
        {checkItems.map((item, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 50 + i * 40, 30),
              transform: `scale(${scaleIn(frame, fps, 50 + i * 40)})`,
            }}
          >
            <Card width={700} borderColor={colors.success}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 40 }}>{item.icon}</span>
                <span style={{ fontSize: 28, color: colors.white }}>{item.text}</span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 다음 레슨 */}
      <div
        style={{
          position: "absolute",
          bottom: "22%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 280, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.numpy.primary} 0%, ${colors.numpy.secondary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.numpy.primary}60`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            👉 다음 레슨: Matplotlib으로 데이터 시각화
          </span>
        </div>
      </div>

      {/* 구독/좋아요 */}
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
export const Lesson0_5Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_array.start} durationInFrames={SCENE_TIMINGS.scene2_array.duration}>
        <Scene2Array />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_shape.start} durationInFrames={SCENE_TIMINGS.scene3_shape.duration}>
        <Scene3Shape />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_operations.start} durationInFrames={SCENE_TIMINGS.scene4_operations.duration}>
        <Scene4Operations />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_indexing.start} durationInFrames={SCENE_TIMINGS.scene5_indexing.duration}>
        <Scene5Indexing />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_ai_usage.start} durationInFrames={SCENE_TIMINGS.scene6_ai_usage.duration}>
        <Scene6AIUsage />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>

      {/* 전체 영상에 UTTEC-Lab 로고 및 교육 사이트 URL 오버레이 */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
