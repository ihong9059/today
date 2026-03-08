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
  scene1_intro: { duration: 995, start: 0 },
  scene2_definition: { duration: 1061, start: 995 },
  scene3_vs_program: { duration: 1071, start: 2056 },
  scene4_two_types: { duration: 1388, start: 3127 },
  scene5_history: { duration: 1429, start: 4515 },
  scene6_current: { duration: 1262, start: 5944 },
  scene7_outro: { duration: 1088, start: 7206 },
};

export const LESSON_1_1_DURATION = 8294;

// ============ COLORS ============
const colors = {
  bg: {
    dark: "#0f172a",
    gradient1: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  accent: "#f59e0b",
  success: "#10b981",
  danger: "#ef4444",
  ai: "#06b6d4",
  brain: "#ec4899",
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

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 30, 40);
  const titleY = slideUp(frame, 30, 40);
  const badgeOpacity = fadeIn(frame, 80, 30);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-1/scene1_intro.mp3")} />
      <AnimatedBackground color1="#1e3a8a" color2={colors.ai} color3="#0f172a" />
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
            background: `linear-gradient(135deg, ${colors.ai} 0%, ${colors.secondary} 100%)`,
            borderRadius: 20,
            border: `2px solid ${colors.white}40`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 1 - Lesson 1</span>
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
          <span style={{ fontSize: 120, marginRight: 20 }}>🤖</span>
          <GlowText fontSize={90} glowColor={colors.ai}>AI란 무엇인가?</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>
            인공지능의 정의, 역사, 그리고 현재
          </span>
        </div>
      </div>

      {/* 일상 속 AI 예시 */}
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
          { icon: "📱", text: "스마트폰 잠금" },
          { icon: "📺", text: "유튜브 추천" },
          { icon: "🗺️", text: "네비게이션" },
          { icon: "📧", text: "스팸 필터" },
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

// ============ SCENE 2: AI DEFINITION ============
const Scene2Definition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const abilities = [
    { icon: "📚", name: "학습", desc: "경험에서 규칙을 스스로 배움", color: colors.primary },
    { icon: "👁️", name: "인식", desc: "이미지, 소리, 글자를 이해", color: colors.ai },
    { icon: "🧠", name: "추론", desc: "배운 것으로 판단함", color: colors.secondary },
    { icon: "✨", name: "생성", desc: "새로운 글, 그림 만듦", color: colors.accent },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-1/scene2_definition.mp3")} />
      <AnimatedBackground color1="#0f766e" color2={colors.ai} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.ai}>🧠 AI의 정의</GlowText>
      </div>

      {/* 메인 정의 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 50, 40),
        }}
      >
        <Card width={1400} borderColor={colors.ai}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 40, color: colors.white, fontWeight: "bold" }}>
              AI(인공지능) = 사람처럼 생각하고 판단하도록 만든 컴퓨터 프로그램
            </span>
          </div>
        </Card>
      </div>

      {/* AI 4가지 능력 */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {abilities.map((ability, i) => {
          const delay = 150 + i * 60;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 40),
                transform: `scale(${scaleIn(frame, fps, delay)})`,
              }}
            >
              <Card width={360} borderColor={ability.color}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 64, marginBottom: 15 }}>{ability.icon}</div>
                  <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>
                    {ability.name}
                  </div>
                  <div style={{ fontSize: 22, color: colors.gray[300] }}>{ability.desc}</div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* 비유 */}
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
            background: `linear-gradient(135deg, ${colors.brain} 0%, ${colors.secondary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.brain}60`,
          }}
        >
          <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
            💡 AI는 "이해"하는 것이 아니라 "패턴"을 찾는 것!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: AI vs PROGRAM ============
const Scene3VsProgram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-1/scene3_vs_program.mp3")} />
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
        <GlowText fontSize={64} glowColor={colors.accent}>⚖️ AI vs 일반 프로그램</GlowText>
      </div>

      {/* 비교 카드 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        {/* 일반 프로그램 */}
        <div
          style={{
            opacity: fadeIn(frame, 60, 40),
            transform: `translateX(${interpolate(frame, [60, 100], [-100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px)`,
          }}
        >
          <Card width={700} borderColor={colors.gray[500]}>
            <div style={{ textAlign: "center", marginBottom: 25 }}>
              <span style={{ fontSize: 48 }}>📟</span>
              <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold", marginLeft: 15 }}>일반 프로그램</span>
            </div>
            <div
              style={{
                padding: 25,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 24, color: colors.gray[300], marginBottom: 15 }}>
                사람이 모든 규칙을 직접 작성
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 22, color: colors.white }}>
                "더하기 버튼 → 두 수를 더해라"<br />
                "빼기 버튼 → 두 수를 빼라"
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 22, color: colors.danger }}>❌ 규칙 밖의 일은 절대 못함!</span>
            </div>
          </Card>
        </div>

        {/* VS */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "35%",
            transform: "translate(-50%, -50%)",
            opacity: fadeIn(frame, 150, 30),
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.danger} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 40px ${colors.accent}60`,
            }}
          >
            <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>VS</span>
          </div>
        </div>

        {/* AI 프로그램 */}
        <div
          style={{
            opacity: fadeIn(frame, 100, 40),
            transform: `translateX(${interpolate(frame, [100, 140], [100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px)`,
          }}
        >
          <Card width={700} borderColor={colors.success}>
            <div style={{ textAlign: "center", marginBottom: 25 }}>
              <span style={{ fontSize: 48 }}>🤖</span>
              <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold", marginLeft: 15 }}>AI 프로그램</span>
            </div>
            <div
              style={{
                padding: 25,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 24, color: colors.gray[300], marginBottom: 15 }}>
                데이터를 주면 스스로 규칙을 찾음
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 22, color: colors.white }}>
                "고양이 사진 1만 장 학습"<br />
                "귀 뾰족 + 수염 → 고양이!"
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 22, color: colors.success }}>✅ 처음 보는 것도 인식 가능!</span>
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
          opacity: fadeIn(frame, 350, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.success} 0%, ${colors.ai} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.success}60`,
          }}
        >
          <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
            🎯 핵심: AI는 스스로 규칙을 발견 = 학습(Training)!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: TWO TYPES ============
const Scene4TwoTypes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-1/scene4_two_types.mp3")} />
      <AnimatedBackground color1="#581c87" color2={colors.secondary} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.secondary}>🔀 AI의 두 가지 방식</GlowText>
      </div>

      {/* 방식 1: 규칙 기반 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          opacity: fadeIn(frame, 60, 40),
          transform: `translateY(${slideUp(frame, 60, 40)}px)`,
        }}
      >
        <Card width={750} borderColor={colors.gray[500]}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
            <div
              style={{
                padding: "10px 25px",
                backgroundColor: colors.gray[700],
                borderRadius: 10,
              }}
            >
              <span style={{ fontSize: 20, color: colors.gray[300] }}>옛날 방식</span>
            </div>
            <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>📋 규칙 기반 AI</span>
          </div>
          <div
            style={{
              padding: 20,
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              fontFamily: "monospace",
              marginBottom: 15,
            }}
          >
            <div style={{ fontSize: 20, color: colors.gray[100] }}>
              규칙 1: "무료" → 스팸<br />
              규칙 2: "당첨" → 스팸<br />
              규칙 3: ....<br />
              규칙 1000: ?????
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>😰</span>
            <span style={{ fontSize: 22, color: colors.danger }}>새 스팸마다 규칙 추가... 끝이 없음!</span>
          </div>
        </Card>
      </div>

      {/* 방식 2: 학습 기반 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 100,
          opacity: fadeIn(frame, 200, 40),
          transform: `translateY(${slideUp(frame, 200, 40)}px)`,
        }}
      >
        <Card width={750} borderColor={colors.success}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
            <div
              style={{
                padding: "10px 25px",
                backgroundColor: colors.success,
                borderRadius: 10,
              }}
            >
              <span style={{ fontSize: 20, color: colors.white, fontWeight: "bold" }}>현재 주류!</span>
            </div>
            <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>🧠 학습 기반 AI</span>
          </div>
          <div
            style={{
              padding: 20,
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              fontFamily: "monospace",
              marginBottom: 15,
            }}
          >
            <div style={{ fontSize: 20, color: colors.gray[100] }}>
              스팸 1만 개 + 정상 1만 개 제공<br />
              → AI가 스스로 패턴 발견!<br />
              → 사람이 못 찾는 것도 발견!
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>🎉</span>
            <span style={{ fontSize: 22, color: colors.success }}>새 스팸? 데이터 추가 + 재학습 = 끝!</span>
          </div>
        </Card>
      </div>

      {/* 강조 화살표 */}
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 15 }}>
          <span style={{ fontSize: 80 }}>⬇️</span>
          <div
            style={{
              padding: "20px 50px",
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              borderRadius: 20,
              boxShadow: `0 0 40px ${colors.primary}60`,
            }}
          >
            <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
              이 강의에서 배울 것 = 학습 기반 AI!
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: HISTORY ============
const Scene5History: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const timeline = [
    { year: "1950", event: "AI 개념 탄생", icon: "💡", color: colors.gray[500] },
    { year: "1960-80", event: "AI 겨울", icon: "❄️", color: colors.ai },
    { year: "2012", event: "딥러닝 혁명", icon: "🚀", color: colors.accent },
    { year: "2016", event: "알파고", icon: "🎯", color: colors.success },
    { year: "2022+", event: "생성형 AI", icon: "✨", color: colors.brain },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-1/scene5_history.mp3")} />
      <AnimatedBackground color1="#1e3a5f" color2="#3b82f6" color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.primary}>📜 AI의 역사</GlowText>
      </div>

      {/* 타임라인 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 100,
          right: 100,
        }}
      >
        {/* 라인 */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 50,
            right: 50,
            height: 6,
            backgroundColor: colors.gray[700],
            borderRadius: 3,
          }}
        />

        {/* 이벤트들 */}
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          {timeline.map((item, i) => {
            const delay = 80 + i * 100;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: fadeIn(frame, delay, 40),
                  transform: `scale(${scaleIn(frame, fps, delay)})`,
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                    boxShadow: `0 0 30px ${item.color}60`,
                    marginBottom: 15,
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>{item.year}</div>
                <div style={{ fontSize: 20, color: colors.gray[300], marginTop: 8, textAlign: "center" }}>
                  {item.event}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 왜 폭발했나? */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: fadeIn(frame, 600, 40),
        }}
      >
        {[
          { icon: "📊", name: "데이터", desc: "인터넷으로 폭발" },
          { icon: "💻", name: "컴퓨팅", desc: "GPU 병렬처리" },
          { icon: "📐", name: "알고리즘", desc: "딥러닝" },
        ].map((item, i) => (
          <Card key={i} width={350} borderColor={colors.accent}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 56 }}>{item.icon}</span>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold", marginTop: 10 }}>{item.name}</div>
              <div style={{ fontSize: 20, color: colors.gray[300], marginTop: 5 }}>{item.desc}</div>
            </div>
          </Card>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: CURRENT STATE ============
const Scene6Current: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const levels = [
    { name: "ANI", title: "약인공지능", desc: "한 가지만 잘하는 AI", status: "✅ 지금 여기!", color: colors.success },
    { name: "AGI", title: "범용인공지능", desc: "사람처럼 뭐든 하는 AI", status: "🔬 연구 중", color: colors.accent },
    { name: "ASI", title: "초인공지능", desc: "인간을 넘어서는 AI", status: "🔮 먼 미래", color: colors.secondary },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-1/scene6_current.mp3")} />
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
        <GlowText fontSize={64} glowColor={colors.success}>📊 현재 AI는 어디까지?</GlowText>
      </div>

      {/* 3단계 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {levels.map((level, i) => {
          const delay = 80 + i * 100;
          const isActive = i === 0;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 40),
                transform: `scale(${scaleIn(frame, fps, delay)})`,
              }}
            >
              <Card
                width={450}
                borderColor={level.color}
                style={isActive ? { boxShadow: `0 0 60px ${level.color}60, 0 0 100px ${level.color}30` } : {}}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: "bold",
                      color: level.color,
                      marginBottom: 10,
                    }}
                  >
                    {level.name}
                  </div>
                  <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>{level.title}</div>
                  <div style={{ fontSize: 20, color: colors.gray[300], marginTop: 10, marginBottom: 20 }}>
                    {level.desc}
                  </div>
                  <div
                    style={{
                      padding: "12px 25px",
                      backgroundColor: isActive ? level.color : colors.gray[700],
                      borderRadius: 12,
                      display: "inline-block",
                    }}
                  >
                    <span style={{ fontSize: 20, color: colors.white, fontWeight: "bold" }}>{level.status}</span>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* ANI 예시 */}
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
        <Card width={1200} borderColor={colors.ai} style={{ margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 40 }}>💬</span>
              <div style={{ fontSize: 22, color: colors.white, marginTop: 10 }}>ChatGPT</div>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>글 쓰기 전문</div>
            </div>
            <div style={{ fontSize: 40, color: colors.gray[500] }}>≠</div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 40 }}>🎮</span>
              <div style={{ fontSize: 22, color: colors.white, marginTop: 10 }}>AlphaGo</div>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>바둑 전문</div>
            </div>
            <div style={{ fontSize: 40, color: colors.gray[500] }}>≠</div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 40 }}>🌐</span>
              <div style={{ fontSize: 22, color: colors.white, marginTop: 10 }}>번역 AI</div>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>번역 전문</div>
            </div>
            <div style={{ fontSize: 40, color: colors.success }}>→</div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 28, color: colors.success, fontWeight: "bold" }}>
                각 분야에서<br />인간 초월!
              </span>
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 7: OUTRO ============
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summary = [
    { icon: "✅", text: "AI = 데이터에서 패턴을 찾는 프로그램" },
    { icon: "✅", text: "AI는 스스로 규칙을 발견 (학습)" },
    { icon: "✅", text: "데이터 + 컴퓨팅 + 알고리즘 = 폭발적 발전" },
    { icon: "✅", text: "현재는 ANI 단계, 각 분야에서 인간 초월" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-1-1/scene7_outro.mp3")} />
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
          top: "22%",
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
            <Card width={800} borderColor={colors.success}>
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
            👉 다음 레슨: 뉴런에서 퍼셉트론으로
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
export const Lesson1_1Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_definition.start} durationInFrames={SCENE_TIMINGS.scene2_definition.duration}>
        <Scene2Definition />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_vs_program.start} durationInFrames={SCENE_TIMINGS.scene3_vs_program.duration}>
        <Scene3VsProgram />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_two_types.start} durationInFrames={SCENE_TIMINGS.scene4_two_types.duration}>
        <Scene4TwoTypes />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_history.start} durationInFrames={SCENE_TIMINGS.scene5_history.duration}>
        <Scene5History />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_current.start} durationInFrames={SCENE_TIMINGS.scene6_current.duration}>
        <Scene6Current />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>

      {/* 전체 영상에 UTTEC-Lab 로고 및 교육 사이트 URL 오버레이 */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
