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
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #1e1b4b 100%)",
  },
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  accent: "#f59e0b",
  white: "#ffffff",
  gray: {
    100: "#f1f5f9",
    300: "#cbd5e1",
    500: "#64748b",
    700: "#334155",
    900: "#0f172a",
  },
  level: {
    0: "#6b7280", // gray
    1: "#f59e0b", // orange
    2: "#a855f7", // purple
    3: "#ef4444", // red
    4: "#F97316", // orange
    5: "#ec4899", // pink
    6: "#14b8a6", // teal
    7: "#3b82f6", // blue
    8: "#22c55e", // green
    9: "#eab308", // yellow
  },
};

// ============ COMMON COMPONENTS ============

// 떠다니는 AI 아이콘들
const FloatingIcons: React.FC<{ frame: number }> = ({ frame }) => {
  const icons = ["🤖", "🧠", "💡", "⚡", "🎯", "📊", "🔮", "✨"];

  return (
    <>
      {icons.map((icon, i) => {
        const x = 100 + (i % 4) * 450;
        const y = 100 + Math.floor(i / 4) * 400;
        const floatY = Math.sin((frame + i * 30) / 30) * 20;
        const opacity = interpolate(frame, [0, 60], [0, 0.3], { extrapolateRight: "clamp" });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y + floatY,
              fontSize: 60,
              opacity,
              filter: "blur(1px)",
            }}
          >
            {icon}
          </div>
        );
      })}
    </>
  );
};

// 글로우 효과 원
const GlowCircle: React.FC<{ x: number; y: number; color: string; size: number; frame: number; delay?: number }> = ({
  x, y, color, size, frame, delay = 0,
}) => {
  const scale = spring({ frame: frame - delay, fps: 30, config: { damping: 15 } });
  const pulse = 1 + Math.sin(frame / 20) * 0.1;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}60 0%, transparent 70%)`,
        transform: `scale(${scale * pulse})`,
      }}
    />
  );
};

// 레벨 카드 컴포넌트
const LevelCard: React.FC<{
  level: number;
  title: string;
  subtitle: string;
  icon: string;
  frame: number;
  delay: number;
  x: number;
  y: number;
}> = ({ level, title, subtitle, icon, frame, delay, x, y }) => {
  const localFrame = frame - delay;
  const opacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(localFrame, [0, 20], [50, 0], { extrapolateRight: "clamp" });
  const scale = spring({ frame: localFrame, fps: 30, config: { damping: 12 } });
  const color = colors.level[level as keyof typeof colors.level] || colors.primary;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + slideY,
        width: 350,
        padding: 25,
        backgroundColor: colors.gray[900] + "cc",
        borderRadius: 20,
        border: `3px solid ${color}`,
        opacity,
        transform: `scale(${Math.min(scale, 1)})`,
        boxShadow: `0 0 30px ${color}40`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 10 }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            backgroundColor: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
          }}
        >
          {icon}
        </div>
        <div>
          <div style={{ color: color, fontSize: 18, fontWeight: "bold" }}>Level {level}</div>
          <div style={{ color: colors.white, fontSize: 24, fontWeight: "bold" }}>{title}</div>
        </div>
      </div>
      <div style={{ color: colors.gray[300], fontSize: 18, lineHeight: 1.5 }}>{subtitle}</div>
    </div>
  );
};

// 뉴런 애니메이션
const NeuronAnimation: React.FC<{ frame: number; x: number; y: number }> = ({ frame, x, y }) => {
  const pulse = Math.sin(frame / 15) * 0.3 + 1;
  const connections = [
    { dx: -80, dy: -60 },
    { dx: 80, dy: -60 },
    { dx: -100, dy: 40 },
    { dx: 100, dy: 40 },
    { dx: 0, dy: 80 },
  ];

  return (
    <svg width="300" height="250" style={{ position: "absolute", left: x - 150, top: y - 125 }}>
      {/* 연결선 */}
      {connections.map((conn, i) => {
        const signalPos = ((frame + i * 20) % 60) / 60;
        return (
          <g key={i}>
            <line
              x1={150}
              y1={125}
              x2={150 + conn.dx}
              y2={125 + conn.dy}
              stroke={colors.primary}
              strokeWidth={3}
              opacity={0.5}
            />
            <circle
              cx={150 + conn.dx * signalPos}
              cy={125 + conn.dy * signalPos}
              r={6}
              fill={colors.accent}
            />
          </g>
        );
      })}
      {/* 중앙 뉴런 */}
      <circle
        cx={150}
        cy={125}
        r={40 * pulse}
        fill={colors.primary}
        opacity={0.8}
      />
      <circle
        cx={150}
        cy={125}
        r={25}
        fill={colors.white}
      />
      {/* 외부 뉴런들 */}
      {connections.map((conn, i) => (
        <circle
          key={i}
          cx={150 + conn.dx}
          cy={125 + conn.dy}
          r={20}
          fill={colors.secondary}
          opacity={0.7}
        />
      ))}
    </svg>
  );
};

// 로드맵 시각화
const RoadmapVisualization: React.FC<{ frame: number; currentLevel: number }> = ({ frame, currentLevel }) => {
  const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const startX = 160;
  const spacing = 160;

  return (
    <div style={{ position: "absolute", bottom: 80, left: 0, right: 0 }}>
      {/* 연결선 */}
      <svg width="1920" height="100" style={{ position: "absolute", bottom: 30 }}>
        <line
          x1={startX}
          y1={50}
          x2={startX + spacing * 9}
          y2={50}
          stroke={colors.gray[500]}
          strokeWidth={4}
          strokeDasharray="10,10"
        />
        {/* 진행 선 */}
        <line
          x1={startX}
          y1={50}
          x2={startX + spacing * Math.min(currentLevel, 9)}
          y2={50}
          stroke={colors.primary}
          strokeWidth={6}
        />
      </svg>

      {/* 레벨 원들 */}
      {levels.map((level) => {
        const isActive = level <= currentLevel;
        const isCurrent = level === currentLevel;
        const color = colors.level[level as keyof typeof colors.level];
        const bounce = isCurrent ? Math.sin(frame / 10) * 5 : 0;

        return (
          <div
            key={level}
            style={{
              position: "absolute",
              left: startX + spacing * level - 30,
              bottom: 20 + bounce,
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: isActive ? color : colors.gray[700],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: colors.white,
              boxShadow: isCurrent ? `0 0 20px ${color}` : "none",
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

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame() - startFrame;
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });

  // AI 로고들 애니메이션
  const aiLogos = ["ChatGPT", "Claude", "Gemini"];

  return (
    <AbsoluteFill style={{ background: colors.bg.gradient }}>
      <Audio src={staticFile("audio/intro/scene1_intro.mp3")} />
      <FloatingIcons frame={frame} />

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
        <div style={{ fontSize: 32, color: colors.accent, marginBottom: 20, fontWeight: "bold" }}>
          🎓 AI 첫걸음
        </div>
        <h1 style={{ fontSize: 80, color: colors.white, fontWeight: "bold", margin: 0 }}>
          AI를 시작하는
        </h1>
        <h1 style={{ fontSize: 80, color: colors.primary, fontWeight: "bold", margin: 0 }}>
          가장 쉬운 방법
        </h1>
      </div>

      {/* AI 로고 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: subtitleOpacity,
        }}
      >
        {aiLogos.map((logo, i) => {
          const delay = 60 + i * 15;
          const cardScale = spring({ frame: frame - delay, fps, config: { damping: 12 } });

          return (
            <div
              key={logo}
              style={{
                padding: "20px 40px",
                backgroundColor: colors.gray[900] + "aa",
                borderRadius: 15,
                border: `2px solid ${colors.primary}`,
                transform: `scale(${Math.min(cardScale, 1)})`,
              }}
            >
              <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>{logo}</span>
            </div>
          );
        })}
      </div>

      {/* 물음표 애니메이션 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ fontSize: 48, color: colors.gray[300] }}>
          "도대체 AI가 어떻게 작동하는 거지?" 🤔
        </div>
      </div>

      <NeuronAnimation frame={frame} x={1600} y={400} />
    </AbsoluteFill>
  );
};

// ============ SCENE 2: PROBLEM ============
const Scene2Problem: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame() - startFrame;

  // 벽 애니메이션
  const walls = ["📚 수학이 너무 어려워", "💻 코딩을 모르겠어", "😵 체계가 없어", "💸 유료 강의는 비싸"];

  return (
    <AbsoluteFill style={{ background: colors.bg.gradient }}>
      <Audio src={staticFile("audio/intro/scene2_problem.mp3")} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 56, color: colors.white, fontWeight: "bold" }}>
          AI 독학의 벽 🧱
        </h2>
      </div>

      {/* 벽 블록들 */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 30,
          padding: "0 100px",
        }}
      >
        {walls.map((wall, i) => {
          const delay = i * 30;
          const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: "clamp" });
          const scaleX = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: "clamp" });

          return (
            <div
              key={i}
              style={{
                padding: "30px 50px",
                backgroundColor: "#7f1d1d",
                borderRadius: 10,
                border: "3px solid #dc2626",
                opacity,
                transform: `scaleX(${scaleX})`,
              }}
            >
              <span style={{ fontSize: 32, color: colors.white }}>{wall}</span>
            </div>
          );
        })}
      </div>

      {/* 해결책 등장 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(frame, [200, 240], [0.5, 1], { extrapolateRight: "clamp" })})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            backgroundColor: colors.primary,
            borderRadius: 20,
            boxShadow: `0 0 40px ${colors.primary}`,
          }}
        >
          <span style={{ fontSize: 48, color: colors.white, fontWeight: "bold" }}>
            💡 AI 첫걸음이 해결합니다!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: PRINCIPLES ============
const Scene3Principles: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame() - startFrame;

  const principles = [
    { icon: "🎯", title: "핵심만 집중", desc: "실무에 필요한 것만 깊이 있게" },
    { icon: "💡", title: "직관부터 시작", desc: "왜 필요한지 먼저, 수식은 나중에" },
    { icon: "💻", title: "코드로 구현", desc: "직접 만들어보며 체득" },
    { icon: "🆓", title: "완전 무료", desc: "모든 콘텐츠 100% 무료" },
  ];

  return (
    <AbsoluteFill style={{ background: colors.bg.gradient }}>
      <Audio src={staticFile("audio/intro/scene3_principles.mp3")} />

      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center" }}>
        <h2 style={{ fontSize: 56, color: colors.white, fontWeight: "bold" }}>
          AI 첫걸음의 원칙 ✨
        </h2>
      </div>

      <div
        style={{
          position: "absolute",
          top: "22%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          padding: "0 80px",
        }}
      >
        {principles.map((p, i) => {
          const delay = 60 + i * 45;
          const opacity = interpolate(frame - delay, [0, 30], [0, 1], { extrapolateRight: "clamp" });
          const slideY = interpolate(frame - delay, [0, 30], [80, 0], { extrapolateRight: "clamp" });
          const isLast = i === 3;

          return (
            <div
              key={i}
              style={{
                width: 380,
                padding: 35,
                backgroundColor: isLast ? colors.accent + "20" : colors.gray[900] + "cc",
                borderRadius: 25,
                border: `3px solid ${isLast ? colors.accent : colors.primary}`,
                textAlign: "center",
                opacity,
                transform: `translateY(${slideY}px)`,
                boxShadow: isLast ? `0 0 30px ${colors.accent}40` : "none",
              }}
            >
              <div style={{ fontSize: 80, marginBottom: 20 }}>{p.icon}</div>
              <div style={{ fontSize: 36, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 24, color: colors.gray[300], lineHeight: 1.4 }}>{p.desc}</div>
            </div>
          );
        })}
      </div>

      <RoadmapVisualization frame={frame} currentLevel={-1} />
    </AbsoluteFill>
  );
};

// ============ SCENE 4: LEVEL 0-2 ============
const Scene4Level0to2: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame() - startFrame;

  return (
    <AbsoluteFill style={{ background: colors.bg.gradient }}>
      <Audio src={staticFile("audio/intro/scene4_level0to2.mp3")} />

      <div style={{ position: "absolute", top: 50, left: 0, right: 0, textAlign: "center" }}>
        <h2 style={{ fontSize: 48, color: colors.white, fontWeight: "bold" }}>
          학습 과정 소개 📚
        </h2>
      </div>

      <LevelCard
        level={0}
        title="Python 기초"
        subtitle="프로그래밍 입문, 변수, 조건문, 함수, NumPy, Matplotlib"
        icon="🐍"
        frame={frame}
        delay={30}
        x={100}
        y={180}
      />

      <LevelCard
        level={1}
        title="AI 기초 이론"
        subtitle="뉴런, 퍼셉트론, AND/OR/NOT 게이트, XOR 문제"
        icon="🧠"
        frame={frame}
        delay={180}
        x={500}
        y={180}
      />

      <LevelCard
        level={2}
        title="수학 기초"
        subtitle="미분, 편미분, 벡터, 행렬, 확률, 통계"
        icon="📐"
        frame={frame}
        delay={330}
        x={900}
        y={180}
      />

      {/* Python 코드 예시 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: 180,
          width: 450,
          padding: 25,
          backgroundColor: "#1e293b",
          borderRadius: 15,
          fontFamily: "monospace",
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ color: "#94a3b8", fontSize: 16, marginBottom: 10 }}># Python 기초 예시</div>
        <div style={{ color: "#f472b6", fontSize: 20 }}>
          <span style={{ color: "#c084fc" }}>def</span> hello_ai():
        </div>
        <div style={{ color: "#4ade80", fontSize: 20, paddingLeft: 20 }}>
          print(<span style={{ color: "#fbbf24" }}>"Hello, AI!"</span>)
        </div>
      </div>

      {/* 뉴런 시각화 */}
      <NeuronAnimation frame={frame} x={700} y={620} />

      <RoadmapVisualization frame={frame} currentLevel={Math.floor(frame / 200)} />
    </AbsoluteFill>
  );
};

// ============ SCENE 5: LEVEL 3-5 ============
const Scene5Level3to5: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame() - startFrame;

  // 경사하강법 시각화
  const GradientDescent: React.FC = () => {
    const ballPos = (frame % 120) / 120;
    const x = 100 + ballPos * 300;
    const y = 200 - Math.pow(ballPos - 0.5, 2) * 300 + 100;

    return (
      <svg width="500" height="300" style={{ position: "absolute", right: 100, top: 450 }}>
        {/* 곡선 */}
        <path
          d="M 50 250 Q 200 50 350 250"
          stroke={colors.primary}
          strokeWidth={4}
          fill="none"
        />
        {/* 공 */}
        <circle cx={x} cy={y} r={15} fill={colors.accent} />
        {/* 라벨 */}
        <text x={200} y={280} fill={colors.white} fontSize={20} textAnchor="middle">
          경사하강법 (Gradient Descent)
        </text>
      </svg>
    );
  };

  return (
    <AbsoluteFill style={{ background: colors.bg.gradient }}>
      <Audio src={staticFile("audio/intro/scene5_level3to5.mp3")} />

      <div style={{ position: "absolute", top: 50, left: 0, right: 0, textAlign: "center" }}>
        <h2 style={{ fontSize: 48, color: colors.white, fontWeight: "bold" }}>
          딥러닝의 핵심 🔥
        </h2>
      </div>

      <LevelCard
        level={3}
        title="딥러닝 핵심"
        subtitle="손실함수, 경사하강법, 역전파, 활성화함수"
        icon="🔥"
        frame={frame}
        delay={30}
        x={100}
        y={150}
      />

      <LevelCard
        level={4}
        title="실전 프로젝트"
        subtitle="PyTorch, MNIST, 이미지 분류 CNN, 텍스트 분류"
        icon="🚀"
        frame={frame}
        delay={180}
        x={100}
        y={420}
      />

      <LevelCard
        level={5}
        title="CNN & 이미지"
        subtitle="합성곱, 풀링, LeNet, AlexNet, VGG, 전이학습"
        icon="🖼️"
        frame={frame}
        delay={330}
        x={500}
        y={150}
      />

      <GradientDescent />

      {/* CNN 필터 시각화 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: 150,
          opacity: interpolate(frame, [360, 390], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ color: colors.white, fontSize: 20, marginBottom: 15, textAlign: "center" }}>
          CNN 합성곱 연산
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {/* 입력 이미지 */}
          <div
            style={{
              width: 120,
              height: 120,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
            }}
          >
            {Array(16).fill(0).map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: `rgb(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 155})`,
                  borderRadius: 3,
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 40, color: colors.white }}>×</div>
          {/* 커널 */}
          <div
            style={{
              width: 60,
              height: 60,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              border: `3px solid ${colors.accent}`,
              borderRadius: 8,
              padding: 3,
            }}
          >
            {[1, 0, -1, 2, 0, -2, 1, 0, -1].map((v, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: v > 0 ? colors.primary : v < 0 ? "#ef4444" : colors.gray[700],
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.white,
                  fontSize: 12,
                }}
              >
                {v}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 40, color: colors.white }}>=</div>
          {/* 출력 */}
          <div
            style={{
              width: 80,
              height: 80,
              backgroundColor: colors.primary,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              color: colors.white,
              fontWeight: "bold",
            }}
          >
            특징맵
          </div>
        </div>
      </div>

      <RoadmapVisualization frame={frame} currentLevel={3 + Math.floor(frame / 200)} />
    </AbsoluteFill>
  );
};

// ============ SCENE 6: LEVEL 6-8 ============
const Scene6Level6to8: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame() - startFrame;

  // Transformer Self-Attention 시각화
  const SelfAttentionViz: React.FC = () => {
    const words = ["나는", "AI를", "배운다"];
    const attentionFrame = frame % 90;
    const activeWord = Math.floor(attentionFrame / 30);

    return (
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 400,
          width: 500,
          padding: 30,
          backgroundColor: colors.gray[900] + "cc",
          borderRadius: 20,
          border: `2px solid ${colors.primary}`,
          opacity: interpolate(frame, [360, 390], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ color: colors.white, fontSize: 24, marginBottom: 20, textAlign: "center" }}>
          Self-Attention 메커니즘
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
          {words.map((word, i) => (
            <div
              key={i}
              style={{
                padding: "15px 25px",
                backgroundColor: i === activeWord ? colors.primary : colors.gray[700],
                borderRadius: 10,
                color: colors.white,
                fontSize: 24,
                fontWeight: "bold",
                transition: "all 0.3s",
                boxShadow: i === activeWord ? `0 0 20px ${colors.primary}` : "none",
              }}
            >
              {word}
            </div>
          ))}
        </div>
        {/* 어텐션 라인 */}
        <svg width="440" height="60">
          {words.map((_, i) => {
            const opacity = i === activeWord ? 1 : 0.3;
            return (
              <line
                key={i}
                x1={73 + activeWord * 150}
                y1={10}
                x2={73 + i * 150}
                y2={50}
                stroke={colors.accent}
                strokeWidth={3}
                opacity={opacity}
              />
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ background: colors.bg.gradient }}>
      <Audio src={staticFile("audio/intro/scene6_level6to8.mp3")} />

      <div style={{ position: "absolute", top: 50, left: 0, right: 0, textAlign: "center" }}>
        <h2 style={{ fontSize: 48, color: colors.white, fontWeight: "bold" }}>
          최신 AI 기술의 핵심 🤖
        </h2>
      </div>

      <LevelCard
        level={6}
        title="시퀀스 모델"
        subtitle="RNN, LSTM, GRU, 감성 분석"
        icon="📝"
        frame={frame}
        delay={30}
        x={100}
        y={150}
      />

      <LevelCard
        level={7}
        title="Transformer & LLM"
        subtitle="Attention, GPT, BERT, 대형 언어 모델"
        icon="🤖"
        frame={frame}
        delay={180}
        x={100}
        y={420}
      />

      <LevelCard
        level={8}
        title="GPU 프로그래밍"
        subtitle="CUDA, 병렬처리, 커널, 메모리 관리"
        icon="⚡"
        frame={frame}
        delay={330}
        x={500}
        y={150}
      />

      {/* ChatGPT 등 모델 표시 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: 150,
          display: "flex",
          gap: 20,
          opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {["ChatGPT", "Claude", "Gemini"].map((model, i) => (
          <div
            key={model}
            style={{
              padding: "15px 30px",
              backgroundColor: colors.primary,
              borderRadius: 15,
              color: colors.white,
              fontSize: 28,
              fontWeight: "bold",
              boxShadow: `0 0 20px ${colors.primary}60`,
            }}
          >
            {model}
          </div>
        ))}
      </div>

      <SelfAttentionViz />

      <RoadmapVisualization frame={frame} currentLevel={6 + Math.floor(frame / 250)} />
    </AbsoluteFill>
  );
};

// ============ SCENE 7: LEVEL 9 ============
const Scene7Level9: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame() - startFrame;

  // 번호판 인식 파이프라인
  const Pipeline: React.FC = () => {
    const steps = [
      { icon: "📷", label: "이미지 입력" },
      { icon: "🔍", label: "번호판 검출" },
      { icon: "✂️", label: "영역 추출" },
      { icon: "🔤", label: "문자 인식" },
      { icon: "✅", label: "결과 출력" },
    ];

    const activeStep = Math.floor((frame % 150) / 30);

    return (
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 100,
          right: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                width: 150,
                padding: 20,
                backgroundColor: i <= activeStep ? colors.primary : colors.gray[700],
                borderRadius: 15,
                textAlign: "center",
                transition: "all 0.3s",
                boxShadow: i === activeStep ? `0 0 25px ${colors.primary}` : "none",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 10 }}>{step.icon}</div>
              <div style={{ fontSize: 18, color: colors.white, fontWeight: "bold" }}>{step.label}</div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ fontSize: 40, color: i < activeStep ? colors.accent : colors.gray[500] }}>→</div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ background: colors.bg.gradient }}>
      <Audio src={staticFile("audio/intro/scene7_level9.mp3")} />

      <div style={{ position: "absolute", top: 50, left: 0, right: 0, textAlign: "center" }}>
        <h2 style={{ fontSize: 56, color: colors.white, fontWeight: "bold" }}>
          🏆 종합 프로젝트: 번호판 인식 시스템
        </h2>
      </div>

      <LevelCard
        level={9}
        title="종합 프로젝트"
        subtitle="YOLO + CNN OCR + 웹 배포 = 실제 AI 서비스"
        icon="🏆"
        frame={frame}
        delay={30}
        x={100}
        y={150}
      />

      {/* 번호판 예시 */}
      <div
        style={{
          position: "absolute",
          right: 150,
          top: 150,
          padding: "30px 60px",
          backgroundColor: colors.white,
          borderRadius: 15,
          border: "8px solid #1e3a8a",
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ fontSize: 56, color: "#1e3a8a", fontWeight: "bold", fontFamily: "monospace" }}>
          12가 3456
        </div>
      </div>

      <Pipeline />

      {/* 포트폴리오 강조 */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 50px",
            backgroundColor: colors.accent + "30",
            borderRadius: 20,
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
const Scene8Outro: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame() - startFrame;

  const stats = [
    { value: "10", label: "레벨", icon: "📊" },
    { value: "58", label: "레슨", icon: "📚" },
    { value: "50+", label: "시간", icon: "⏱️" },
    { value: "100%", label: "무료", icon: "🆓" },
  ];

  return (
    <AbsoluteFill style={{ background: colors.bg.gradient }}>
      <Audio src={staticFile("audio/intro/scene8_outro.mp3")} />
      <FloatingIcons frame={frame} />

      {/* 통계 */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {stats.map((stat, i) => {
          const delay = i * 20;
          const scale = spring({ frame: frame - delay, fps: 30, config: { damping: 10 } });

          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                transform: `scale(${Math.min(scale, 1)})`,
              }}
            >
              <div style={{ fontSize: 48 }}>{stat.icon}</div>
              <div style={{ fontSize: 72, color: colors.accent, fontWeight: "bold" }}>{stat.value}</div>
              <div style={{ fontSize: 28, color: colors.gray[300] }}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* 명언 */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 60px",
            backgroundColor: colors.gray[900] + "cc",
            borderRadius: 20,
            border: `2px solid ${colors.accent}`,
          }}
        >
          <div style={{ fontSize: 36, color: colors.white, fontStyle: "italic" }}>
            "행운은 준비가 기회를 만났을 때 생겨난다"
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 70px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 40px ${colors.primary}80`,
          }}
        >
          <span style={{ fontSize: 48, color: colors.white, fontWeight: "bold" }}>
            🚀 지금 바로 AI 여정을 시작하세요!
          </span>
        </div>
      </div>

      {/* 구독 요청 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 32, color: colors.gray[300] }}>
          👍 구독과 좋아요도 부탁드립니다!
        </span>
      </div>

      <RoadmapVisualization frame={frame} currentLevel={9} />
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const AIIntroVideo: React.FC = () => {
  return (
    <>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro startFrame={SCENE_TIMINGS.scene1_intro.start} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_problem.start} durationInFrames={SCENE_TIMINGS.scene2_problem.duration}>
        <Scene2Problem startFrame={SCENE_TIMINGS.scene2_problem.start} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_principles.start} durationInFrames={SCENE_TIMINGS.scene3_principles.duration}>
        <Scene3Principles startFrame={SCENE_TIMINGS.scene3_principles.start} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_level0to2.start} durationInFrames={SCENE_TIMINGS.scene4_level0to2.duration}>
        <Scene4Level0to2 startFrame={SCENE_TIMINGS.scene4_level0to2.start} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_level3to5.start} durationInFrames={SCENE_TIMINGS.scene5_level3to5.duration}>
        <Scene5Level3to5 startFrame={SCENE_TIMINGS.scene5_level3to5.start} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_level6to8.start} durationInFrames={SCENE_TIMINGS.scene6_level6to8.duration}>
        <Scene6Level6to8 startFrame={SCENE_TIMINGS.scene6_level6to8.start} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_level9.start} durationInFrames={SCENE_TIMINGS.scene7_level9.duration}>
        <Scene7Level9 startFrame={SCENE_TIMINGS.scene7_level9.start} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene8_outro.start} durationInFrames={SCENE_TIMINGS.scene8_outro.duration}>
        <Scene8Outro startFrame={SCENE_TIMINGS.scene8_outro.start} />
      </Sequence>
    </>
  );
};
