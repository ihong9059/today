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
  scene1_intro: { duration: 941, start: 0 },
  scene2_basics: { duration: 1176, start: 941 },
  scene3_activation: { duration: 2070, start: 2117 },
  scene4_loss: { duration: 1910, start: 4187 },
  scene5_callback: { duration: 1283, start: 6097 },
  scene6_lambda: { duration: 834, start: 7380 },
  scene7_outro: { duration: 1353, start: 8214 },
};

export const LESSON_0_4_DURATION = 9567;

// ============ COLORS ============
const colors = {
  bg: {
    dark: "#0f172a",
    gradient1: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  primary: "#8b5cf6", // purple for functions
  secondary: "#6366f1", // indigo
  accent: "#f59e0b",
  success: "#10b981",
  danger: "#ef4444",
  relu: "#3b82f6", // blue for ReLU
  sigmoid: "#f59e0b", // orange for sigmoid
  loss: "#ef4444", // red for loss
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

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 30, 40);
  const titleY = slideUp(frame, 30, 40);
  const badgeOpacity = fadeIn(frame, 80, 30);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-4/scene1_intro.mp3")} />
      <AnimatedBackground color1="#581c87" color2={colors.primary} color3="#0f172a" />
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
            background: `linear-gradient(135deg, ${colors.gray[700]} 0%, ${colors.gray[800]} 100%)`,
            borderRadius: 20,
            border: `2px solid ${colors.gray[500]}`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 0 - Lesson 4</span>
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
          <span style={{ fontSize: 120, marginRight: 20 }}>⚡</span>
          <GlowText fontSize={90} glowColor={colors.primary}>함수</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>
            AI의 핵심 빌딩 블록 - ReLU, 손실 함수, 콜백
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
          { icon: "🔵", text: "ReLU" },
          { icon: "🟠", text: "Sigmoid" },
          { icon: "📉", text: "손실 함수" },
          { icon: "🔧", text: "콜백" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "20px 35px",
              backgroundColor: `${colors.gray[800]}cc`,
              borderRadius: 15,
              border: `2px solid ${colors.gray[600]}`,
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

// ============ SCENE 2: BASICS ============
const Scene2Basics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-4/scene2_basics.mp3")} />
      <AnimatedBackground color1="#581c87" color2={colors.primary} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.primary}>📦 함수 기초</GlowText>
      </div>

      {/* 함수 구조 다이어그램 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 50, 40),
        }}
      >
        <Card width={800} borderColor={colors.primary}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold", marginBottom: 30 }}>
              함수 = 자판기
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  padding: "20px 40px",
                  backgroundColor: colors.gray[800],
                  borderRadius: 15,
                  fontSize: 28,
                  color: colors.white,
                }}
              >
                동전 넣기 (입력)
              </div>
              <div style={{ fontSize: 40, color: colors.primary }}>↓</div>
              <div
                style={{
                  padding: "20px 40px",
                  backgroundColor: colors.primary,
                  borderRadius: 15,
                  fontSize: 28,
                  color: colors.white,
                }}
              >
                버튼 누르기 (처리)
              </div>
              <div style={{ fontSize: 40, color: colors.primary }}>↓</div>
              <div
                style={{
                  padding: "20px 40px",
                  backgroundColor: colors.success,
                  borderRadius: 15,
                  fontSize: 28,
                  color: colors.white,
                }}
              >
                음료 나옴 (출력)
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 코드 예시 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          bottom: 130,
          opacity: fadeIn(frame, 250, 40),
        }}
      >
        <CodeBlock
          title="함수 정의"
          code={`def greet(name):
    return f"안녕하세요, {name}님!"

# 함수 호출
greet("학생")  # 재사용 가능!`}
          width={600}
        />
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: ACTIVATION ============
const Scene3Activation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-4/scene3_activation.mp3")} />
      <AnimatedBackground color1="#1e3a8a" color2={colors.relu} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.relu}>⚡ 활성화 함수</GlowText>
      </div>

      {/* ReLU 그래프 시각화 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          opacity: fadeIn(frame, 80, 40),
        }}
      >
        <Card width={700} borderColor={colors.relu}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>🔵 ReLU 함수</span>
          </div>
          <div style={{ fontSize: 24, color: colors.gray[300], marginBottom: 20, textAlign: "center" }}>
            음수 → 0, 양수 → 그대로
          </div>
          <div
            style={{
              padding: 30,
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              position: "relative",
              height: 250,
            }}
          >
            {/* 간단한 ReLU 그래프 */}
            <svg width="600" height="250" style={{ position: "absolute", left: 30, top: 0 }}>
              {/* X축 */}
              <line x1="50" y1="125" x2="550" y2="125" stroke={colors.gray[500]} strokeWidth="2" />
              {/* Y축 */}
              <line x1="300" y1="20" x2="300" y2="230" stroke={colors.gray[500]} strokeWidth="2" />

              {/* ReLU 선 (음수 부분) */}
              <line x1="50" y1="125" x2="300" y2="125" stroke={colors.danger} strokeWidth="4" />
              {/* ReLU 선 (양수 부분) */}
              <line x1="300" y1="125" x2="550" y2="20" stroke={colors.success} strokeWidth="4" />

              {/* 원점 */}
              <circle cx="300" cy="125" r="6" fill={colors.white} />
            </svg>
          </div>
          <div style={{ marginTop: 20, fontSize: 20, color: colors.gray[300], textAlign: "center" }}>
            가장 많이 사용되는 활성화 함수!
          </div>
        </Card>
      </div>

      {/* Sigmoid 설명 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: "18%",
          opacity: fadeIn(frame, 300, 40),
        }}
      >
        <Card width={650} borderColor={colors.sigmoid}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 32, color: colors.sigmoid, fontWeight: "bold" }}>🟠 Sigmoid</span>
          </div>
          <div style={{ fontSize: 24, color: colors.gray[300], marginBottom: 20, textAlign: "center" }}>
            0 ~ 1 사이로 변환 (확률!)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {[
              { input: "큰 음수", output: "→ 0에 가까움 (0%)" },
              { input: "0", output: "→ 정확히 0.5 (50%)" },
              { input: "큰 양수", output: "→ 1에 가까움 (100%)" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "15px 25px",
                  backgroundColor: `${colors.sigmoid}20`,
                  borderRadius: 12,
                  fontSize: 22,
                  color: colors.white,
                  opacity: fadeIn(frame, 320 + i * 40, 30),
                }}
              >
                {item.input} <span style={{ color: colors.sigmoid }}>{item.output}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ReLU 코드 */}
      <div
        style={{
          position: "absolute",
          left: 100,
          bottom: 130,
          opacity: fadeIn(frame, 500, 40),
        }}
      >
        <CodeBlock
          title="relu.py"
          code={`def relu(x):
    return max(0, x)  # 간단!

relu(-5)  # 0
relu(5)   # 5`}
          width={500}
        />
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: LOSS ============
const Scene4Loss: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-4/scene4_loss.mp3")} />
      <AnimatedBackground color1="#7f1d1d" color2={colors.loss} color3="#0f172a" />
      <Particles count={25} color={colors.loss} />

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
        <GlowText fontSize={64} glowColor={colors.loss}>📉 손실 함수</GlowText>
      </div>

      {/* 손실 함수 역할 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 50, 40),
        }}
      >
        <Card width={900} borderColor={colors.accent}>
          <div style={{ textAlign: "center", marginBottom: 25 }}>
            <span style={{ fontSize: 32, color: colors.accent, fontWeight: "bold" }}>
              🎯 AI 학습의 나침반
            </span>
          </div>
          <div style={{ fontSize: 26, color: colors.white, lineHeight: 1.6, textAlign: "center" }}>
            예측값 vs 정답 → 얼마나 틀렸는지 계산
            <br />
            <span style={{ color: colors.accent }}>이 숫자(손실)를 줄이는 것이 학습!</span>
          </div>
        </Card>
      </div>

      {/* MSE vs Cross Entropy */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {/* MSE */}
        <div style={{ opacity: fadeIn(frame, 150, 40) }}>
          <Card width={550} borderColor={colors.relu}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, color: colors.relu, fontWeight: "bold", marginBottom: 20 }}>
                🔢 MSE
              </div>
              <div style={{ fontSize: 22, color: colors.gray[300], marginBottom: 15 }}>
                숫자 예측용
              </div>
              <div
                style={{
                  padding: "20px",
                  backgroundColor: colors.gray[800],
                  borderRadius: 12,
                  fontFamily: "monospace",
                  fontSize: 20,
                  color: colors.white,
                  marginBottom: 15,
                }}
              >
                (예측 - 정답)² 의 평균
              </div>
              <div style={{ fontSize: 18, color: colors.gray[400] }}>
                기온, 주가 예측 등
              </div>
            </div>
          </Card>
        </div>

        {/* Cross Entropy */}
        <div style={{ opacity: fadeIn(frame, 250, 40) }}>
          <Card width={550} borderColor={colors.loss}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, color: colors.loss, fontWeight: "bold", marginBottom: 20 }}>
                ❌ Cross Entropy
              </div>
              <div style={{ fontSize: 22, color: colors.gray[300], marginBottom: 15 }}>
                분류 문제용
              </div>
              <div
                style={{
                  padding: "20px",
                  backgroundColor: colors.gray[800],
                  borderRadius: 12,
                  fontFamily: "monospace",
                  fontSize: 20,
                  color: colors.white,
                  marginBottom: 15,
                }}
              >
                -log(정답의 확률)
              </div>
              <div style={{ fontSize: 18, color: colors.gray[400] }}>
                고양이/개 구별, 감정 분석 등
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 학습 과정 */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <Card width={800} borderColor={colors.success}>
          <div style={{ fontSize: 24, color: colors.white, textAlign: "center" }}>
            손실이 <span style={{ color: colors.loss }}>크다</span> → 많이 틀림 → 더 학습 필요
            <br />
            손실이 <span style={{ color: colors.success }}>작다</span> → 거의 맞음 → 학습 잘됨!
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: CALLBACK ============
const Scene5Callback: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-4/scene5_callback.mp3")} />
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
        <GlowText fontSize={64} glowColor={colors.success}>🔧 콜백 함수</GlowText>
      </div>

      {/* 콜백 설명 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 50, 40),
        }}
      >
        <Card width={900} borderColor={colors.accent}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, color: colors.accent, fontWeight: "bold", marginBottom: 20 }}>
              특정 상황에서 자동 실행
            </div>
            <div style={{ fontSize: 26, color: colors.white }}>
              빨래 타이머 알림처럼, 조건 만족 시 자동으로 동작!
            </div>
          </div>
        </Card>
      </div>

      {/* 주요 콜백들 */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        {[
          {
            name: "EarlyStopping",
            desc: "더 안 나아지면 학습 중단",
            icon: "🛑",
            delay: 150
          },
          {
            name: "ModelCheckpoint",
            desc: "최고 성능일 때 모델 저장",
            icon: "💾",
            delay: 250
          },
          {
            name: "LearningRateScheduler",
            desc: "학습률 자동 조정",
            icon: "📊",
            delay: 350
          },
        ].map((callback, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, callback.delay, 40),
              transform: `scale(${scaleIn(frame, fps, callback.delay)})`,
            }}
          >
            <Card width={750} borderColor={colors.success}>
              <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
                <div style={{ fontSize: 48 }}>{callback.icon}</div>
                <div>
                  <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
                    {callback.name}
                  </div>
                  <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 8 }}>
                    {callback.desc}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: LAMBDA ============
const Scene6Lambda: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-4/scene6_lambda.mp3")} />
      <AnimatedBackground color1="#4c1d95" color2={colors.secondary} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.secondary}>λ 람다 함수</GlowText>
      </div>

      {/* 람다 설명 */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 50, 40),
        }}
      >
        <Card width={800} borderColor={colors.secondary}>
          <div style={{ textAlign: "center", marginBottom: 25 }}>
            <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
              이름 없는 간단한 함수
            </span>
          </div>
          <div style={{ fontSize: 24, color: colors.gray[300], textAlign: "center", lineHeight: 1.8 }}>
            한 줄로 간단한 계산을 할 때 유용
            <br />
            리스트 변환, 정렬 기준 지정 등에 활용
          </div>
        </Card>
      </div>

      {/* 코드 예시 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 180,
          opacity: fadeIn(frame, 150, 40),
        }}
      >
        <CodeBlock
          title="lambda.py"
          code={`# 일반 함수
def double(x):
    return x * 2

# 람다 함수
double = lambda x: x * 2

# 활용 예시
nums = [1, 2, 3, 4, 5]
result = list(map(lambda x: x * 2, nums))
# [2, 4, 6, 8, 10]`}
          width={700}
        />
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 7: OUTRO ============
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checkItems = [
    { icon: "✅", text: "함수: 입력 → 처리 → 출력" },
    { icon: "✅", text: "ReLU: 음수→0, 양수→그대로" },
    { icon: "✅", text: "Sigmoid: 0~1 확률 변환" },
    { icon: "✅", text: "손실 함수: 오차 측정" },
    { icon: "✅", text: "콜백: 학습 자동 관리" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-4/scene7_outro.mp3")} />
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
          bottom: "22%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 300, 40),
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
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            👉 다음 레슨: NumPy 기초
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
          opacity: fadeIn(frame, 370, 40),
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
export const Lesson0_4Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_basics.start} durationInFrames={SCENE_TIMINGS.scene2_basics.duration}>
        <Scene2Basics />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_activation.start} durationInFrames={SCENE_TIMINGS.scene3_activation.duration}>
        <Scene3Activation />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_loss.start} durationInFrames={SCENE_TIMINGS.scene4_loss.duration}>
        <Scene4Loss />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_callback.start} durationInFrames={SCENE_TIMINGS.scene5_callback.duration}>
        <Scene5Callback />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_lambda.start} durationInFrames={SCENE_TIMINGS.scene6_lambda.duration}>
        <Scene6Lambda />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>

      {/* 전체 영상에 UTTEC-Lab 로고 및 교육 사이트 URL 오버레이 */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
