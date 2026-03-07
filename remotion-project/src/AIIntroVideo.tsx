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
  Easing,
} from "remotion";

// ============ SCENE TIMINGS ============
export const SCENE_TIMINGS = {
  scene1_intro: { duration: 893, start: 0 },
  scene2_problem: { duration: 935, start: 893 },
  scene3_principles: { duration: 1360, start: 1828 },
  scene4_level0to2: { duration: 1881, start: 3188 },
  scene5_level3to5: { duration: 1713, start: 5069 },
  scene6_level6to8: { duration: 1941, start: 6782 },
  scene7_level9: { duration: 1192, start: 8723 },
  scene8_outro: { duration: 1349, start: 9915 },
};

export const INTRO_VIDEO_DURATION = 11264;

// ============ COLORS ============
const colors = {
  bg: {
    dark: "#0f172a",
    gradient1: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    gradient2: "linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #1e1b4b 100%)",
    gradient3: "linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
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
  level: {
    0: "#6b7280",
    1: "#f59e0b",
    2: "#a855f7",
    3: "#ef4444",
    4: "#F97316",
    5: "#ec4899",
    6: "#14b8a6",
    7: "#3b82f6",
    8: "#22c55e",
    9: "#eab308",
  },
};

// ============ HELPER FUNCTIONS ============
const fadeIn = (frame: number, start: number = 0, duration: number = 30) =>
  interpolate(frame, [start, start + duration], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const slideUp = (frame: number, start: number = 0, duration: number = 30, distance: number = 50) =>
  interpolate(frame, [start, start + duration], [distance, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const scaleIn = (frame: number, fps: number, delay: number = 0) =>
  Math.min(spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 100 } }), 1);

// ============ BACKGROUND COMPONENTS ============

// 그라데이션 배경 with 움직이는 원
const AnimatedBackground: React.FC<{ color1?: string; color2?: string; color3?: string }> = ({
  color1 = "#667eea",
  color2 = "#764ba2",
  color3 = "#1e1b4b"
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {/* 기본 그라데이션 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`,
        }}
      />

      {/* 움직이는 빛 효과 */}
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

// 파티클 효과
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

// ============ GLOBAL OVERLAY ============

// UTTEC-Lab 로고 및 교육 사이트 URL 오버레이 (모든 씬에 표시)
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

// ============ UI COMPONENTS ============

// 글로우 텍스트
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

// 카드 컴포넌트
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

// 레벨 배지
const LevelBadge: React.FC<{ level: number; size?: number }> = ({ level, size = 60 }) => {
  const color = colors.level[level as keyof typeof colors.level] || colors.primary;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 4,
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.5,
        fontWeight: "bold",
        color: colors.white,
        boxShadow: `0 0 20px ${color}60`,
      }}
    >
      {level}
    </div>
  );
};

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 애니메이션 타이밍
  const titleOpacity = fadeIn(frame, 20, 40);
  const titleY = slideUp(frame, 20, 40);
  const subtitleOpacity = fadeIn(frame, 60, 40);
  const questionOpacity = fadeIn(frame, 300, 40);
  const aiCardsOpacity = fadeIn(frame, 150, 40);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro/scene1_intro.mp3")} />
      <AnimatedBackground color1="#1e3a8a" color2="#7c3aed" color3="#0f172a" />
      <Particles count={40} />

      {/* 로고/브랜드 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          opacity: fadeIn(frame, 0, 30),
          transform: `scale(${scaleIn(frame, fps, 0)})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 15,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
            }}
          >
            🎓
          </div>
          <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>AI 첫걸음</span>
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
          <GlowText fontSize={90} glowColor={colors.secondary}>AI를 시작하는</GlowText>
        </div>
        <div>
          <GlowText fontSize={100} color={colors.accent} glowColor={colors.accent}>가장 쉬운 방법</GlowText>
        </div>
      </div>

      {/* AI 서비스 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "52%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
          opacity: aiCardsOpacity,
        }}
      >
        {[
          { name: "ChatGPT", icon: "🤖", color: "#10a37f" },
          { name: "Claude", icon: "🧠", color: "#d97706" },
          { name: "Gemini", icon: "✨", color: "#4285f4" },
        ].map((ai, i) => {
          const delay = 150 + i * 20;
          const scale = scaleIn(frame, fps, delay);
          const float = Math.sin((frame + i * 30) / 25) * 8;

          return (
            <div
              key={ai.name}
              style={{
                transform: `scale(${scale}) translateY(${float}px)`,
              }}
            >
              <Card width={220} borderColor={ai.color}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 56, marginBottom: 10 }}>{ai.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>{ai.name}</div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* 궁금증 텍스트 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: questionOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 50px",
            backgroundColor: `${colors.gray[800]}cc`,
            borderRadius: 20,
            border: `2px solid ${colors.gray[500]}`,
          }}
        >
          <span style={{ fontSize: 40, color: colors.gray[100] }}>
            "도대체 AI가 어떻게 작동하는 거지?" 🤔
          </span>
        </div>
      </div>

      {/* 뉴런 네트워크 시각화 */}
      <NeuronNetwork frame={frame} x={1550} y={350} scale={1.2} />
    </AbsoluteFill>
  );
};

// 뉴런 네트워크 애니메이션
const NeuronNetwork: React.FC<{ frame: number; x: number; y: number; scale?: number }> = ({
  frame, x, y, scale = 1
}) => {
  const layers = [3, 5, 5, 3];
  const layerGap = 100;
  const nodeGap = 50;

  return (
    <svg
      width={500 * scale}
      height={350 * scale}
      style={{
        position: "absolute",
        left: x - 250 * scale,
        top: y - 175 * scale,
        opacity: 0.8,
      }}
      viewBox="0 0 500 350"
    >
      {/* 연결선 */}
      {layers.slice(0, -1).map((nodeCount, layerIdx) => {
        const nextNodeCount = layers[layerIdx + 1];
        const x1 = 80 + layerIdx * layerGap;
        const x2 = 80 + (layerIdx + 1) * layerGap;

        return Array.from({ length: nodeCount }).flatMap((_, i) => {
          const y1 = 175 - ((nodeCount - 1) * nodeGap) / 2 + i * nodeGap;

          return Array.from({ length: nextNodeCount }).map((_, j) => {
            const y2 = 175 - ((nextNodeCount - 1) * nodeGap) / 2 + j * nodeGap;
            const signalProgress = ((frame + i * 10 + j * 5) % 60) / 60;
            const opacity = 0.15 + Math.sin(signalProgress * Math.PI) * 0.3;

            return (
              <line
                key={`${layerIdx}-${i}-${j}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={colors.primary}
                strokeWidth={1.5}
                opacity={opacity}
              />
            );
          });
        });
      })}

      {/* 노드 */}
      {layers.map((nodeCount, layerIdx) => {
        const xPos = 80 + layerIdx * layerGap;

        return Array.from({ length: nodeCount }).map((_, i) => {
          const yPos = 175 - ((nodeCount - 1) * nodeGap) / 2 + i * nodeGap;
          const pulse = 1 + Math.sin((frame + layerIdx * 20 + i * 10) / 15) * 0.15;
          const isActive = ((frame + layerIdx * 30 + i * 15) % 120) < 60;

          return (
            <g key={`node-${layerIdx}-${i}`}>
              <circle
                cx={xPos}
                cy={yPos}
                r={18 * pulse}
                fill={isActive ? colors.primary : colors.secondary}
                opacity={0.8}
              />
              <circle
                cx={xPos}
                cy={yPos}
                r={10}
                fill={colors.white}
                opacity={0.9}
              />
            </g>
          );
        });
      })}
    </svg>
  );
};

// ============ SCENE 2: PROBLEM ============
const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const problems = [
    { icon: "📚", text: "수학이 너무 어려워", color: "#dc2626" },
    { icon: "💻", text: "코딩을 모르겠어", color: "#ea580c" },
    { icon: "😵", text: "체계가 없어", color: "#ca8a04" },
    { icon: "💸", text: "유료 강의는 비싸", color: "#9333ea" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro/scene2_problem.mp3")} />
      <AnimatedBackground color1="#1e1b4b" color2="#4c1d95" color3="#0f172a" />
      <Particles count={20} color={colors.danger} />

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
        <GlowText fontSize={72} glowColor={colors.danger}>AI 독학의 벽</GlowText>
        <span style={{ fontSize: 72, marginLeft: 20 }}>🧱</span>
      </div>

      {/* 문제 카드들 - 2x2 그리드 */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateColumns: "repeat(2, 420px)",
          gap: 40,
        }}
      >
        {problems.map((problem, i) => {
          const delay = 60 + i * 45;
          const opacity = fadeIn(frame, delay, 30);
          const scale = scaleIn(frame, fps, delay);
          const shake = frame > delay + 30 ? Math.sin((frame - delay) / 5) * 3 : 0;

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `scale(${scale}) translateX(${shake}px)`,
              }}
            >
              <Card width={420} borderColor={problem.color}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ fontSize: 56 }}>{problem.icon}</div>
                  <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
                    {problem.text}
                  </span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* 해결책 배너 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 40),
          transform: `scale(${scaleIn(frame, fps, 400)})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 80px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 30,
            boxShadow: `0 0 60px ${colors.primary}80`,
          }}
        >
          <span style={{ fontSize: 52, color: colors.white, fontWeight: "bold" }}>
            💡 AI 첫걸음이 해결합니다!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: PRINCIPLES ============
const Scene3Principles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const principles = [
    { icon: "🎯", title: "핵심만 집중", desc: "실무에 필요한 것만\n깊이 있게 학습", color: colors.primary },
    { icon: "💡", title: "직관부터 시작", desc: "왜 필요한지 먼저\n수식은 나중에", color: colors.secondary },
    { icon: "💻", title: "코드로 구현", desc: "직접 만들어보며\n체득하는 실습 중심", color: colors.success },
    { icon: "🆓", title: "완전 무료", desc: "모든 콘텐츠\n100% 무료 제공", color: colors.accent },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro/scene3_principles.mp3")} />
      <AnimatedBackground color1="#0f766e" color2="#1e40af" color3="#0f172a" />
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
        <GlowText fontSize={68} glowColor={colors.success}>AI 첫걸음의 학습 원칙</GlowText>
        <span style={{ fontSize: 68, marginLeft: 20 }}>✨</span>
      </div>

      {/* 원칙 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 35,
          padding: "0 60px",
        }}
      >
        {principles.map((p, i) => {
          const delay = 90 + i * 60;
          const opacity = fadeIn(frame, delay, 40);
          const yOffset = slideUp(frame, delay, 40, 80);
          const isLast = i === 3;
          const pulse = isLast && frame > delay + 40 ? 1 + Math.sin(frame / 15) * 0.03 : 1;

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${yOffset}px) scale(${pulse})`,
              }}
            >
              <Card
                width={400}
                borderColor={p.color}
                glow={true}
                style={{
                  background: isLast
                    ? `linear-gradient(180deg, ${colors.gray[900]}ee 0%, ${p.color}30 100%)`
                    : `${colors.gray[900]}ee`,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      margin: "0 auto 20px",
                      borderRadius: 25,
                      backgroundColor: `${p.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 56,
                    }}
                  >
                    {p.icon}
                  </div>
                  <div style={{ fontSize: 36, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 24, color: colors.gray[300], lineHeight: 1.6, whiteSpace: "pre-line" }}>
                    {p.desc}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* 하단 로드맵 */}
      <LevelRoadmap frame={frame} highlightUpTo={-1} />
    </AbsoluteFill>
  );
};

// 레벨 로드맵 컴포넌트
const LevelRoadmap: React.FC<{ frame: number; highlightUpTo: number }> = ({ frame, highlightUpTo }) => {
  const levels = Array.from({ length: 10 }, (_, i) => i);
  const startX = 160;
  const spacing = 165;

  return (
    <div style={{ position: "absolute", bottom: 50, left: 0, right: 0 }}>
      {/* 연결선 */}
      <svg width="1920" height="80" style={{ position: "absolute", bottom: 35 }}>
        {/* 배경선 */}
        <line
          x1={startX}
          y1={40}
          x2={startX + spacing * 9}
          y2={40}
          stroke={colors.gray[700]}
          strokeWidth={6}
          strokeLinecap="round"
        />
        {/* 진행선 */}
        {highlightUpTo >= 0 && (
          <line
            x1={startX}
            y1={40}
            x2={startX + spacing * Math.min(highlightUpTo, 9)}
            y2={40}
            stroke={colors.primary}
            strokeWidth={6}
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* 레벨 노드 */}
      {levels.map((level) => {
        const isHighlighted = level <= highlightUpTo;
        const isCurrent = level === highlightUpTo;
        const color = colors.level[level as keyof typeof colors.level];
        const bounce = isCurrent ? Math.sin(frame / 10) * 6 : 0;
        const scale = isCurrent ? 1.15 : 1;

        return (
          <div
            key={level}
            style={{
              position: "absolute",
              left: startX + spacing * level - 28,
              bottom: 15 + bounce,
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: isHighlighted ? color : colors.gray[700],
              border: `3px solid ${isHighlighted ? color : colors.gray[600]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: colors.white,
              boxShadow: isCurrent ? `0 0 25px ${color}` : "none",
              transform: `scale(${scale})`,
              transition: "all 0.3s",
            }}
          >
            {level}
          </div>
        );
      })}
    </div>
  );
};

// ============ SCENE 4: LEVEL 0-2 ============
const Scene4Level0to2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const levels = [
    {
      level: 0,
      title: "Python 기초",
      subtitle: "프로그래밍 입문\n변수, 조건문, 반복문, 함수\nNumPy, Matplotlib",
      icon: "🐍",
    },
    {
      level: 1,
      title: "AI 기초 이론",
      subtitle: "뉴런과 퍼셉트론\nAND/OR/NOT 게이트\nXOR 문제 해결",
      icon: "🧠",
    },
    {
      level: 2,
      title: "수학 기초",
      subtitle: "미분과 편미분\n벡터와 행렬 연산\n확률과 통계",
      icon: "📐",
    },
  ];

  // 현재 강조할 레벨 계산
  const currentHighlight = Math.min(Math.floor(frame / 300), 2);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro/scene4_level0to2.mp3")} />
      <AnimatedBackground color1="#1e3a8a" color2="#4338ca" color3="#0f172a" />
      <Particles count={25} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={56}>기초부터 탄탄하게</GlowText>
        <span style={{ fontSize: 56, marginLeft: 15 }}>📚</span>
      </div>

      {/* 레벨 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 80,
          display: "flex",
          flexDirection: "column",
          gap: 25,
        }}
      >
        {levels.map((l, i) => {
          const delay = 60 + i * 180;
          const opacity = fadeIn(frame, delay, 40);
          const xOffset = interpolate(frame, [delay, delay + 40], [-100, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });

          return (
            <div
              key={l.level}
              style={{
                opacity,
                transform: `translateX(${xOffset}px)`,
              }}
            >
              <LevelCardLarge {...l} />
            </div>
          );
        })}
      </div>

      {/* 코드 예시 */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "18%",
          opacity: fadeIn(frame, 120, 40),
          transform: `scale(${scaleIn(frame, fps, 120)})`,
        }}
      >
        <CodeBlock
          title="Python 기초 예시"
          code={`# 첫 번째 AI 프로그램
import numpy as np

def predict(x, w, b):
    return np.dot(x, w) + b

# 학습 시작!
result = predict([1, 2], [0.5, 0.3], 0.1)
print(f"예측값: {result}")`}
        />
      </div>

      {/* 뉴런 시각화 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          bottom: 180,
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <NeuronNetwork frame={frame} x={250} y={100} scale={0.8} />
      </div>

      <LevelRoadmap frame={frame} highlightUpTo={currentHighlight} />
    </AbsoluteFill>
  );
};

// 큰 레벨 카드
const LevelCardLarge: React.FC<{
  level: number;
  title: string;
  subtitle: string;
  icon: string;
}> = ({ level, title, subtitle, icon }) => {
  const color = colors.level[level as keyof typeof colors.level];

  return (
    <Card width={550} borderColor={color}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 20, color, fontWeight: "bold" }}>Level {level}</span>
          </div>
          <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>
            {title}
          </div>
          <div style={{ fontSize: 20, color: colors.gray[300], lineHeight: 1.5, whiteSpace: "pre-line" }}>
            {subtitle}
          </div>
        </div>
      </div>
    </Card>
  );
};

// 코드 블록
const CodeBlock: React.FC<{ title: string; code: string }> = ({ title, code }) => (
  <div
    style={{
      width: 550,
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
        fontSize: 18,
        lineHeight: 1.6,
        color: colors.gray[100],
        fontFamily: "'Fira Code', 'Consolas', monospace",
        overflow: "hidden",
      }}
    >
      {code.split("\n").map((line, i) => (
        <div key={i}>
          {line.startsWith("#") ? (
            <span style={{ color: "#6b7280" }}>{line}</span>
          ) : line.includes("import") ? (
            <>
              <span style={{ color: "#c084fc" }}>import</span>
              <span>{line.slice(6)}</span>
            </>
          ) : line.includes("def ") ? (
            <>
              <span style={{ color: "#c084fc" }}>def</span>
              <span style={{ color: "#60a5fa" }}>{line.slice(3, line.indexOf("("))}</span>
              <span>{line.slice(line.indexOf("("))}</span>
            </>
          ) : line.includes("print") ? (
            <>
              <span style={{ color: "#60a5fa" }}>print</span>
              <span>{line.slice(5)}</span>
            </>
          ) : line.includes("return") ? (
            <>
              <span style={{ color: "#c084fc" }}>return</span>
              <span>{line.slice(6)}</span>
            </>
          ) : (
            <span>{line}</span>
          )}
        </div>
      ))}
    </pre>
  </div>
);

// ============ SCENE 5: LEVEL 3-5 ============
const Scene5Level3to5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const levels = [
    {
      level: 3,
      title: "딥러닝 핵심",
      subtitle: "손실함수와 경사하강법\n역전파 알고리즘\n활성화 함수",
      icon: "🔥",
    },
    {
      level: 4,
      title: "실전 프로젝트",
      subtitle: "PyTorch 프레임워크\nMNIST 손글씨 분류\n이미지/텍스트 분류",
      icon: "🚀",
    },
    {
      level: 5,
      title: "CNN & 이미지",
      subtitle: "합성곱 신경망\nLeNet, AlexNet, VGG\n전이학습",
      icon: "🖼️",
    },
  ];

  const currentHighlight = 3 + Math.min(Math.floor(frame / 280), 2);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro/scene5_level3to5.mp3")} />
      <AnimatedBackground color1="#7c2d12" color2="#9333ea" color3="#0f172a" />
      <Particles count={25} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={56} glowColor={colors.danger}>딥러닝의 핵심</GlowText>
        <span style={{ fontSize: 56, marginLeft: 15 }}>🔥</span>
      </div>

      {/* 레벨 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 80,
          display: "flex",
          flexDirection: "column",
          gap: 25,
        }}
      >
        {levels.map((l, i) => {
          const delay = 60 + i * 170;
          const opacity = fadeIn(frame, delay, 40);
          const xOffset = interpolate(frame, [delay, delay + 40], [-100, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });

          return (
            <div
              key={l.level}
              style={{ opacity, transform: `translateX(${xOffset}px)` }}
            >
              <LevelCardLarge {...l} />
            </div>
          );
        })}
      </div>

      {/* 경사하강법 시각화 */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "20%",
          opacity: fadeIn(frame, 100, 40),
        }}
      >
        <GradientDescentViz frame={frame} />
      </div>

      {/* CNN 시각화 */}
      <div
        style={{
          position: "absolute",
          right: 80,
          bottom: 180,
          opacity: fadeIn(frame, 500, 40),
        }}
      >
        <CNNVisualization frame={frame} />
      </div>

      <LevelRoadmap frame={frame} highlightUpTo={currentHighlight} />
    </AbsoluteFill>
  );
};

// 경사하강법 시각화
const GradientDescentViz: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = (frame % 180) / 180;
  const x = 50 + progress * 400;
  const y = 180 - Math.pow((progress - 0.5) * 2, 2) * 120 - 20;

  return (
    <Card width={550} borderColor={colors.danger}>
      <div style={{ textAlign: "center", marginBottom: 15 }}>
        <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>
          경사하강법 (Gradient Descent)
        </span>
      </div>
      <svg width="500" height="200" viewBox="0 0 500 200">
        {/* 곡선 */}
        <path
          d="M 30 150 Q 150 30 250 180 Q 350 30 470 150"
          stroke={colors.gray[500]}
          strokeWidth={3}
          fill="none"
        />
        {/* 최적점 */}
        <circle cx={250} cy={180} r={8} fill={colors.success} />
        <text x={250} y={200} fill={colors.success} fontSize={14} textAnchor="middle">최적점</text>
        {/* 공 */}
        <circle cx={x} cy={y} r={15} fill={colors.accent}>
          <animate attributeName="r" values="15;18;15" dur="0.5s" repeatCount="indefinite" />
        </circle>
        {/* 화살표 */}
        <line x1={x} y1={y + 20} x2={x + 20} y2={y + 40} stroke={colors.accent} strokeWidth={3} markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.accent} />
          </marker>
        </defs>
      </svg>
    </Card>
  );
};

// CNN 시각화
const CNNVisualization: React.FC<{ frame: number }> = ({ frame }) => {
  const step = Math.floor((frame % 120) / 30);

  return (
    <Card width={550} borderColor={colors.level[5]}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>
          CNN 합성곱 연산
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 25 }}>
        {/* 입력 이미지 */}
        <div>
          <div style={{ fontSize: 14, color: colors.gray[400], marginBottom: 8, textAlign: "center" }}>입력</div>
          <div
            style={{
              width: 100,
              height: 100,
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 2,
              padding: 4,
              backgroundColor: colors.gray[800],
              borderRadius: 8,
            }}
          >
            {Array(25).fill(0).map((_, i) => {
              const isHighlight = Math.floor(i / 5) >= step && Math.floor(i / 5) < step + 3 &&
                                  (i % 5) >= (step % 3) && (i % 5) < (step % 3) + 3;
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: isHighlight ? colors.accent : `hsl(${i * 15}, 70%, ${40 + (i % 5) * 10}%)`,
                    borderRadius: 2,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div style={{ fontSize: 32, color: colors.gray[400] }}>×</div>

        {/* 커널 */}
        <div>
          <div style={{ fontSize: 14, color: colors.gray[400], marginBottom: 8, textAlign: "center" }}>필터</div>
          <div
            style={{
              width: 60,
              height: 60,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              padding: 4,
              backgroundColor: colors.accent,
              borderRadius: 8,
            }}
          >
            {[1, 0, -1, 2, 0, -2, 1, 0, -1].map((v, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: v > 0 ? colors.primary : v < 0 ? colors.danger : colors.gray[700],
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                {v}
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 32, color: colors.gray[400] }}>=</div>

        {/* 출력 */}
        <div>
          <div style={{ fontSize: 14, color: colors.gray[400], marginBottom: 8, textAlign: "center" }}>특징맵</div>
          <div
            style={{
              width: 70,
              height: 70,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              padding: 4,
              backgroundColor: colors.primary,
              borderRadius: 8,
            }}
          >
            {Array(9).fill(0).map((_, i) => {
              const active = i === step;
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: active ? colors.accent : colors.primary,
                    borderRadius: 2,
                    opacity: i <= step ? 1 : 0.3,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ============ SCENE 6: LEVEL 6-8 ============
const Scene6Level6to8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const levels = [
    {
      level: 6,
      title: "시퀀스 모델",
      subtitle: "RNN, LSTM, GRU\n텍스트 감성 분석\n시계열 예측",
      icon: "📝",
    },
    {
      level: 7,
      title: "Transformer & LLM",
      subtitle: "Attention 메커니즘\nGPT, BERT 아키텍처\n대형 언어 모델",
      icon: "🤖",
    },
    {
      level: 8,
      title: "GPU 프로그래밍",
      subtitle: "CUDA 기초\n병렬처리 원리\n커널과 메모리 관리",
      icon: "⚡",
    },
  ];

  const currentHighlight = 6 + Math.min(Math.floor(frame / 300), 2);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro/scene6_level6to8.mp3")} />
      <AnimatedBackground color1="#1e40af" color2="#7c3aed" color3="#0f172a" />
      <Particles count={30} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={56} glowColor={colors.secondary}>최신 AI 기술의 핵심</GlowText>
        <span style={{ fontSize: 56, marginLeft: 15 }}>🤖</span>
      </div>

      {/* 레벨 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 80,
          display: "flex",
          flexDirection: "column",
          gap: 25,
        }}
      >
        {levels.map((l, i) => {
          const delay = 60 + i * 200;
          const opacity = fadeIn(frame, delay, 40);
          const xOffset = interpolate(frame, [delay, delay + 40], [-100, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });

          return (
            <div
              key={l.level}
              style={{ opacity, transform: `translateX(${xOffset}px)` }}
            >
              <LevelCardLarge {...l} />
            </div>
          );
        })}
      </div>

      {/* LLM 모델들 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: "18%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        {["ChatGPT", "Claude", "Gemini", "LLaMA"].map((model, i) => {
          const delay = 200 + i * 30;
          const scale = scaleIn(frame, fps, delay);

          return (
            <div
              key={model}
              style={{
                padding: "18px 40px",
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                borderRadius: 20,
                transform: `scale(${scale})`,
                boxShadow: `0 10px 30px ${colors.primary}40`,
              }}
            >
              <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>{model}</span>
            </div>
          );
        })}
      </div>

      {/* Self-Attention 시각화 */}
      <div
        style={{
          position: "absolute",
          right: 80,
          bottom: 160,
          opacity: fadeIn(frame, 500, 40),
        }}
      >
        <SelfAttentionViz frame={frame} />
      </div>

      <LevelRoadmap frame={frame} highlightUpTo={currentHighlight} />
    </AbsoluteFill>
  );
};

// Self-Attention 시각화
const SelfAttentionViz: React.FC<{ frame: number }> = ({ frame }) => {
  const words = ["나는", "AI를", "배운다"];
  const activeWord = Math.floor((frame % 90) / 30);

  return (
    <Card width={500} borderColor={colors.level[7]}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>
          Self-Attention 메커니즘
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
        {words.map((word, i) => (
          <div
            key={i}
            style={{
              padding: "15px 30px",
              backgroundColor: i === activeWord ? colors.primary : colors.gray[700],
              borderRadius: 12,
              boxShadow: i === activeWord ? `0 0 25px ${colors.primary}` : "none",
              transition: "all 0.3s",
            }}
          >
            <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>{word}</span>
          </div>
        ))}
      </div>

      {/* 어텐션 라인 */}
      <svg width="440" height="50" style={{ display: "block", margin: "0 auto" }}>
        {words.map((_, i) => {
          const startX = 73 + activeWord * 146;
          const endX = 73 + i * 146;
          const opacity = i === activeWord ? 1 : 0.4;
          const strokeWidth = i === activeWord ? 4 : 2;

          return (
            <g key={i}>
              <line
                x1={startX}
                y1={5}
                x2={endX}
                y2={45}
                stroke={colors.accent}
                strokeWidth={strokeWidth}
                opacity={opacity}
              />
              <circle cx={endX} cy={45} r={6} fill={colors.accent} opacity={opacity} />
            </g>
          );
        })}
      </svg>
    </Card>
  );
};

// ============ SCENE 7: LEVEL 9 ============
const Scene7Level9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pipelineSteps = [
    { icon: "📷", label: "이미지 입력" },
    { icon: "🔍", label: "번호판 검출" },
    { icon: "✂️", label: "영역 추출" },
    { icon: "🔤", label: "문자 인식" },
    { icon: "✅", label: "결과 출력" },
  ];

  const activeStep = Math.floor((frame % 150) / 30);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro/scene7_level9.mp3")} />
      <AnimatedBackground color1="#854d0e" color2="#ca8a04" color3="#0f172a" />
      <Particles count={25} color={colors.accent} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={52} glowColor={colors.accent}>🏆 종합 프로젝트: 번호판 인식 시스템</GlowText>
      </div>

      {/* 레벨 9 카드 */}
      <div
        style={{
          position: "absolute",
          top: "17%",
          left: 100,
          opacity: fadeIn(frame, 40, 40),
          transform: `scale(${scaleIn(frame, fps, 40)})`,
        }}
      >
        <LevelCardLarge
          level={9}
          title="종합 프로젝트"
          subtitle="YOLO 객체 검출\nCNN 문자 인식\n웹 서비스 배포"
          icon="🏆"
        />
      </div>

      {/* 번호판 예시 */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: "17%",
          opacity: fadeIn(frame, 80, 40),
          transform: `scale(${scaleIn(frame, fps, 80)})`,
        }}
      >
        <div
          style={{
            padding: "40px 80px",
            backgroundColor: colors.white,
            borderRadius: 20,
            border: "10px solid #1e3a8a",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              fontSize: 72,
              color: "#1e3a8a",
              fontWeight: "bold",
              fontFamily: "'Arial Black', sans-serif",
              letterSpacing: 8,
            }}
          >
            12가 3456
          </div>
        </div>
      </div>

      {/* 파이프라인 */}
      <div
        style={{
          position: "absolute",
          top: "52%",
          left: 100,
          right: 100,
          opacity: fadeIn(frame, 150, 40),
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <span style={{ fontSize: 28, color: colors.gray[300] }}>AI 파이프라인</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {pipelineSteps.map((step, i) => (
            <React.Fragment key={i}>
              <div
                style={{
                  width: 160,
                  padding: 25,
                  backgroundColor: i <= activeStep ? colors.primary : colors.gray[800],
                  borderRadius: 20,
                  textAlign: "center",
                  boxShadow: i === activeStep ? `0 0 30px ${colors.primary}` : "none",
                  transition: "all 0.3s",
                  border: `3px solid ${i <= activeStep ? colors.primary : colors.gray[700]}`,
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 10 }}>{step.icon}</div>
                <div style={{ fontSize: 18, color: colors.white, fontWeight: "bold" }}>{step.label}</div>
              </div>
              {i < pipelineSteps.length - 1 && (
                <div
                  style={{
                    fontSize: 40,
                    color: i < activeStep ? colors.accent : colors.gray[600],
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 포트폴리오 강조 */}
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
            background: `linear-gradient(135deg, ${colors.accent}30 0%, ${colors.accent}10 100%)`,
            borderRadius: 25,
            border: `3px solid ${colors.accent}`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white }}>
            📋 이력서에 쓸 수 있는 AI 포트폴리오 완성!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 8: OUTRO ============
const Scene8Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: "10", label: "레벨", icon: "📊" },
    { value: "58", label: "레슨", icon: "📚" },
    { value: "50+", label: "시간", icon: "⏱️" },
    { value: "100%", label: "무료", icon: "🆓" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro/scene8_outro.mp3")} />
      <AnimatedBackground color1="#7c3aed" color2="#2563eb" color3="#0f172a" />
      <Particles count={50} />

      {/* 통계 */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        {stats.map((stat, i) => {
          const delay = i * 25;
          const scale = scaleIn(frame, fps, delay);
          const isLast = i === 3;

          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                transform: `scale(${scale})`,
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 10 }}>{stat.icon}</div>
              <div
                style={{
                  fontSize: 80,
                  fontWeight: "bold",
                  color: isLast ? colors.accent : colors.white,
                  textShadow: isLast ? `0 0 30px ${colors.accent}` : "none",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 28, color: colors.gray[300] }}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* 명언 */}
      <div
        style={{
          position: "absolute",
          top: "46%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 150, 40),
        }}
      >
        <Card width={900} borderColor={colors.accent} style={{ display: "inline-block" }}>
          <div style={{ fontSize: 40, color: colors.white, fontStyle: "italic", textAlign: "center" }}>
            "행운은 준비가 기회를 만났을 때 생겨난다"
          </div>
        </Card>
      </div>

      {/* CTA */}
      <div
        style={{
          position: "absolute",
          bottom: "22%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 250, 40),
          transform: `scale(${scaleIn(frame, fps, 250)})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 80px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 30,
            boxShadow: `0 0 60px ${colors.primary}80`,
          }}
        >
          <span style={{ fontSize: 52, color: colors.white, fontWeight: "bold" }}>
            🚀 지금 바로 AI 여정을 시작하세요!
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

      <LevelRoadmap frame={frame} highlightUpTo={9} />
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const AIIntroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_problem.start} durationInFrames={SCENE_TIMINGS.scene2_problem.duration}>
        <Scene2Problem />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_principles.start} durationInFrames={SCENE_TIMINGS.scene3_principles.duration}>
        <Scene3Principles />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_level0to2.start} durationInFrames={SCENE_TIMINGS.scene4_level0to2.duration}>
        <Scene4Level0to2 />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_level3to5.start} durationInFrames={SCENE_TIMINGS.scene5_level3to5.duration}>
        <Scene5Level3to5 />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_level6to8.start} durationInFrames={SCENE_TIMINGS.scene6_level6to8.duration}>
        <Scene6Level6to8 />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_level9.start} durationInFrames={SCENE_TIMINGS.scene7_level9.duration}>
        <Scene7Level9 />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene8_outro.start} durationInFrames={SCENE_TIMINGS.scene8_outro.duration}>
        <Scene8Outro />
      </Sequence>

      {/* 전체 영상에 UTTEC-Lab 로고 및 교육 사이트 URL 오버레이 */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
