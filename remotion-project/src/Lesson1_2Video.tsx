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
  scene1_intro: { duration: 856, start: 0 },
  scene2_brain: { duration: 979, start: 856 },
  scene3_neuron: { duration: 1171, start: 1835 },
  scene4_threshold: { duration: 1371, start: 3006 },
  scene5_mcp: { duration: 1419, start: 4377 },
  scene6_perceptron: { duration: 1502, start: 5796 },
  scene7_outro: { duration: 1217, start: 7298 },
};

export const LESSON_1_2_DURATION = 8515;

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
  brain: "#ec4899",
  neuron: "#06b6d4",
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

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 30, 40);
  const titleY = slideUp(frame, 30, 40);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-2/scene1_intro.mp3")} />
      <AnimatedBackground color1="#831843" color2={colors.brain} color3="#0f172a" />
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
            background: `linear-gradient(135deg, ${colors.brain} 0%, ${colors.secondary} 100%)`,
            borderRadius: 20,
            border: `2px solid ${colors.white}40`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 1 - Lesson 2</span>
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
          <span style={{ fontSize: 120, marginRight: 20 }}>🧠</span>
          <GlowText fontSize={80} glowColor={colors.brain}>뉴런에서 퍼셉트론으로</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>
            뇌를 수학으로 모델링하다
          </span>
        </div>
      </div>

      {/* 비행기-새 비유 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        <div
          style={{
            textAlign: "center",
            transform: `scale(${scaleIn(frame, fps, 200)})`,
          }}
        >
          <span style={{ fontSize: 64 }}>🐦</span>
          <div style={{ fontSize: 24, color: colors.gray[300], marginTop: 10 }}>새</div>
        </div>
        <div style={{ fontSize: 48, color: colors.accent, alignSelf: "center" }}>→</div>
        <div
          style={{
            textAlign: "center",
            transform: `scale(${scaleIn(frame, fps, 250)})`,
          }}
        >
          <span style={{ fontSize: 64 }}>✈️</span>
          <div style={{ fontSize: 24, color: colors.gray[300], marginTop: 10 }}>비행기</div>
        </div>
        <div style={{ fontSize: 48, color: colors.gray[500], alignSelf: "center", margin: "0 40px" }}>|</div>
        <div
          style={{
            textAlign: "center",
            transform: `scale(${scaleIn(frame, fps, 300)})`,
          }}
        >
          <span style={{ fontSize: 64 }}>🧠</span>
          <div style={{ fontSize: 24, color: colors.gray[300], marginTop: 10 }}>뇌</div>
        </div>
        <div style={{ fontSize: 48, color: colors.accent, alignSelf: "center" }}>→</div>
        <div
          style={{
            textAlign: "center",
            transform: `scale(${scaleIn(frame, fps, 350)})`,
          }}
        >
          <span style={{ fontSize: 64 }}>🤖</span>
          <div style={{ fontSize: 24, color: colors.gray[300], marginTop: 10 }}>AI</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: BRAIN SCALE ============
const Scene2Brain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { icon: "🔵", name: "뉴런", value: "860억 개", compare: "세계 인구의 10배", color: colors.neuron },
    { icon: "🔗", name: "시냅스", value: "100조 개", compare: "은하수 별의 500배", color: colors.brain },
    { icon: "⚡", name: "신호 속도", value: "초속 120m", compare: "KTX의 1.4배", color: colors.accent },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-2/scene2_brain.mp3")} />
      <AnimatedBackground color1="#1e1b4b" color2="#7c3aed" color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.brain}>🧠 우리 뇌의 놀라운 규모</GlowText>
      </div>

      {/* 뇌 아이콘 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.brain} 0%, ${colors.secondary} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 100,
            boxShadow: `0 0 80px ${colors.brain}60`,
            animation: "pulse 2s infinite",
          }}
        >
          🧠
        </div>
      </div>

      {/* 통계 카드 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {stats.map((stat, i) => {
          const delay = 150 + i * 80;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 40),
                transform: `scale(${scaleIn(frame, fps, delay)})`,
              }}
            >
              <Card width={450} borderColor={stat.color}>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: 56 }}>{stat.icon}</span>
                  <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold", marginTop: 10 }}>
                    {stat.name}
                  </div>
                  <div style={{ fontSize: 42, color: stat.color, fontWeight: "bold", marginTop: 10 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 20, color: colors.gray[300], marginTop: 10 }}>
                    {stat.compare}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: NEURON STRUCTURE ============
const Scene3Neuron: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const parts = [
    { name: "수상돌기", role: "신호 수신", icon: "📡", color: colors.neuron },
    { name: "세포체", role: "판단", icon: "🧠", color: colors.brain },
    { name: "축삭돌기", role: "신호 전송", icon: "⚡", color: colors.accent },
    { name: "시냅스", role: "연결", icon: "🔗", color: colors.success },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-2/scene3_neuron.mp3")} />
      <AnimatedBackground color1="#0f4c5c" color2={colors.neuron} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.neuron}>🔬 뉴런의 구조</GlowText>
      </div>

      {/* 뉴런 다이어그램 */}
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
        {parts.map((part, i) => {
          const delay = 80 + i * 100;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 40),
                transform: `scale(${scaleIn(frame, fps, delay)})`,
              }}
            >
              <Card width={350} borderColor={part.color}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 64, marginBottom: 15 }}>{part.icon}</div>
                  <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>{part.name}</div>
                  <div style={{ fontSize: 22, color: part.color, marginTop: 10 }}>{part.role}</div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* 화살표 연결 */}
      <div
        style={{
          position: "absolute",
          top: "58%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 500, 40),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "20px 40px",
            backgroundColor: `${colors.gray[800]}dd`,
            borderRadius: 20,
            border: `2px solid ${colors.gray[600]}`,
          }}
        >
          <span style={{ fontSize: 24, color: colors.white }}>신호 수신</span>
          <span style={{ fontSize: 32, color: colors.accent }}>→</span>
          <span style={{ fontSize: 24, color: colors.white }}>합산</span>
          <span style={{ fontSize: 32, color: colors.accent }}>→</span>
          <span style={{ fontSize: 24, color: colors.white }}>충분하면</span>
          <span style={{ fontSize: 32, color: colors.accent }}>→</span>
          <span style={{ fontSize: 24, color: colors.success, fontWeight: "bold" }}>다음으로!</span>
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
          opacity: fadeIn(frame, 650, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.brain} 0%, ${colors.secondary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.brain}60`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
            💡 이 단순한 원리가 860억 개 모이면 = 인간의 생각!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: THRESHOLD ============
const Scene4Threshold: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-2/scene4_threshold.mp3")} />
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
        <GlowText fontSize={64} glowColor={colors.accent}>⚡ 임계값 (Threshold)</GlowText>
      </div>

      {/* 팝콘 비유 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={650} borderColor={colors.accent}>
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <span style={{ fontSize: 80 }}>🍿</span>
            <div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>팝콘 비유</div>
              <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 10 }}>
                옥수수가 바로 터지지 않음<br />
                <span style={{ color: colors.accent, fontWeight: "bold" }}>180도</span>를 넘어야 펑! 터짐
              </div>
              <div style={{ fontSize: 24, color: colors.accent, marginTop: 15, fontWeight: "bold" }}>
                이 180도가 "임계값"!
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 뉴런에서의 임계값 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 100,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        <Card width={650} borderColor={colors.neuron}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>뉴런도 마찬가지!</span>
          </div>
          <div
            style={{
              padding: 20,
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              fontFamily: "monospace",
            }}
          >
            <div style={{ fontSize: 22, color: colors.gray[100], marginBottom: 10 }}>
              임계값 = 5라면:
            </div>
            <div style={{ fontSize: 20, color: colors.danger }}>신호 2 → 반응 없음 ❌</div>
            <div style={{ fontSize: 20, color: colors.danger }}>신호 4 → 반응 없음 ❌</div>
            <div style={{ fontSize: 20, color: colors.success }}>신호 7 → 발화! ✅</div>
          </div>
        </Card>
      </div>

      {/* AI 연결 */}
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
        <Card width={1200} borderColor={colors.success} style={{ margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
            <span style={{ fontSize: 56 }}>🤖</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 26, color: colors.white, fontWeight: "bold" }}>AI에서의 임계값</div>
              <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 10 }}>
                입력 합이 임계값을 넘으면 <span style={{ color: colors.success }}>YES(1)</span> 출력<br />
                넘지 못하면 <span style={{ color: colors.danger }}>NO(0)</span> 출력
              </div>
            </div>
            <div style={{ fontSize: 24, color: colors.accent, fontWeight: "bold" }}>
              → AI가 "결정"을 내리는<br />가장 기본적인 방법!
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: McCULLOCH-PITTS ============
const Scene5MCP: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-2/scene5_mcp.mp3")} />
      <AnimatedBackground color1="#1e3a5f" color2="#3b82f6" color3="#0f172a" />
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
        <GlowText fontSize={56} glowColor={colors.primary}>🔧 맥컬록-피츠 모델 (1943)</GlowText>
      </div>

      {/* 제작자 */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: 100,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={600} borderColor={colors.primary}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 24, color: colors.gray[300] }}>첫 번째 인공 뉴런의 탄생</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 48 }}>👨‍🔬</span>
              <div style={{ fontSize: 22, color: colors.white, fontWeight: "bold", marginTop: 10 }}>McCulloch</div>
              <div style={{ fontSize: 16, color: colors.gray[300] }}>신경과학자</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 48 }}>👨‍💻</span>
              <div style={{ fontSize: 22, color: colors.white, fontWeight: "bold", marginTop: 10 }}>Pitts</div>
              <div style={{ fontSize: 16, color: colors.gray[300] }}>수학자</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 작동 방식 */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          right: 100,
          opacity: fadeIn(frame, 180, 40),
        }}
      >
        <Card width={650} borderColor={colors.success}>
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 24, color: colors.success, fontWeight: "bold" }}>작동 방식</span>
          </div>
          <div
            style={{
              padding: 20,
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              fontFamily: "monospace",
            }}
          >
            <div style={{ fontSize: 22, color: colors.gray[100] }}>
              1. 입력 신호를 모두 더한다<br />
              2. 합이 임계값보다 큰지 비교<br />
              3. 크면 1, 작으면 0 출력
            </div>
          </div>
        </Card>
      </div>

      {/* 한계 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <Card width={550} borderColor={colors.danger}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 48 }}>⚠️</span>
            <div style={{ fontSize: 26, color: colors.danger, fontWeight: "bold", marginTop: 15 }}>한계 1</div>
            <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 10 }}>
              모든 입력을 똑같이 취급!<br />
              중요도 구분 불가
            </div>
          </div>
        </Card>
        <Card width={550} borderColor={colors.danger}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 48 }}>❌</span>
            <div style={{ fontSize: 26, color: colors.danger, fontWeight: "bold", marginTop: 15 }}>한계 2</div>
            <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 10 }}>
              학습 불가능!<br />
              사람이 직접 임계값 설정
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: PERCEPTRON ============
const Scene6Perceptron: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const innovations = [
    { icon: "⚖️", name: "가중치", desc: "입력마다 중요도 부여", color: colors.primary },
    { icon: "🎯", name: "편향", desc: "기본 성향 설정", color: colors.secondary },
    { icon: "📚", name: "자동 학습", desc: "틀리면 스스로 조정!", color: colors.success },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-2/scene6_perceptron.mp3")} />
      <AnimatedBackground color1="#166534" color2={colors.success} color3="#0f172a" />
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
        <GlowText fontSize={56} glowColor={colors.success}>🚀 퍼셉트론 탄생 (1958)</GlowText>
      </div>

      {/* 제작자 */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 50, 40),
        }}
      >
        <Card width={500} borderColor={colors.success}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, justifyContent: "center" }}>
            <span style={{ fontSize: 56 }}>👨‍🔬</span>
            <div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Frank Rosenblatt</div>
              <div style={{ fontSize: 18, color: colors.gray[300] }}>코넬대학교 심리학자</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 3가지 혁신 */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {innovations.map((item, i) => {
          const delay = 150 + i * 100;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 40),
                transform: `scale(${scaleIn(frame, fps, delay)})`,
              }}
            >
              <Card width={420} borderColor={item.color}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 64, marginBottom: 15 }}>{item.icon}</div>
                  <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>{item.name}</div>
                  <div style={{ fontSize: 20, color: item.color, marginTop: 10 }}>{item.desc}</div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 550, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.success} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.success}60`,
          }}
        >
          <span style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>
            🎯 이것이 바로 "기계 학습(Machine Learning)"의 시작!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 7: OUTRO ============
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summary = [
    { icon: "🧠", text: "뉴런 = 신호 수신 → 합산 → 임계값 넘으면 전달" },
    { icon: "🔧", text: "맥컬록-피츠 (1943) = 뇌를 수학으로 (학습 불가)" },
    { icon: "🚀", text: "퍼셉트론 (1958) = 가중치 + 편향 + 자동 학습!" },
    { icon: "🤖", text: "모든 AI = 퍼셉트론 수십억 개 연결" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-2/scene7_outro.mp3")} />
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

      {/* 요약 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 25,
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
            👉 다음 레슨: 퍼셉트론 구조
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
export const Lesson1_2Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_brain.start} durationInFrames={SCENE_TIMINGS.scene2_brain.duration}>
        <Scene2Brain />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_neuron.start} durationInFrames={SCENE_TIMINGS.scene3_neuron.duration}>
        <Scene3Neuron />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_threshold.start} durationInFrames={SCENE_TIMINGS.scene4_threshold.duration}>
        <Scene4Threshold />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_mcp.start} durationInFrames={SCENE_TIMINGS.scene5_mcp.duration}>
        <Scene5MCP />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_perceptron.start} durationInFrames={SCENE_TIMINGS.scene6_perceptron.duration}>
        <Scene6Perceptron />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};
