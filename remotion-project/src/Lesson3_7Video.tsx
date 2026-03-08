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

export const LESSON_3_7_DURATION = 8846;

const colors = {
  primary: "#a855f7",
  secondary: "#7c3aed",
  accent: "#f59e0b",
  success: "#10b981",
  danger: "#ef4444",
  info: "#3b82f6",
  white: "#ffffff",
  dark: "#1e1b4b",
  gray: { 100: "#f1f5f9", 200: "#e2e8f0", 700: "#334155" },
};

// Scene timings based on audio analysis (updated)
// intro: 812, what: 1549, methods: 1724, learningrate: 1551, tips: 1876, outro: 1334
const SCENE_TIMINGS = {
  intro: { start: 0, duration: 812 },
  what: { start: 812, duration: 1549 },
  methods: { start: 2361, duration: 1724 },
  learningrate: { start: 4085, duration: 1551 },
  tips: { start: 5636, duration: 1876 },
  outro: { start: 7512, duration: 1334 },
};

const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  return (
    <>
      <div style={{ position: "absolute", top: 30, left: 40, zIndex: 1000, opacity: logoOpacity, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 50, height: 50, borderRadius: 12, background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 15px ${colors.primary}60` }}>
          <span style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>U</span>
        </div>
        <span style={{ fontSize: 32, fontWeight: "bold", color: colors.white, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>UTTEC-Lab</span>
      </div>
      <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, zIndex: 1000, opacity: logoOpacity, display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "12px 40px", backgroundColor: "#0f172add", borderRadius: 30, border: `2px solid ${colors.primary}60` }}>
          <span style={{ fontSize: 24, color: colors.gray[100] }}>교육 사이트:</span>
          <span style={{ fontSize: 26, color: colors.accent, fontWeight: "bold", marginLeft: 10 }}>http://uttec-ai.duckdns.org</span>
        </div>
      </div>
    </>
  );
};

// Scene 1: Intro
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, from: 0, to: 1, config: { damping: 12 } });
  const iconScale = spring({ frame: frame - 15, fps, from: 0, to: 1, config: { damping: 10 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        <div style={{ fontSize: 150, marginBottom: 30, transform: `scale(${iconScale})` }}>🎛️</div>
        <h1 style={{ fontSize: 70, color: colors.white, marginBottom: 20, opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * 30}px)` }}>
          하이퍼파라미터 튜닝
        </h1>
        <p style={{ fontSize: 36, color: colors.gray[200], opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }) }}>
          Hyperparameter Tuning
        </p>
      </div>
      <Audio src={staticFile("audio/lesson-3-7/intro.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 2: What are hyperparameters
const WhatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const params = [
    { name: "학습률 (lr)", value: "0.001", color: colors.danger },
    { name: "배치 크기", value: "32", color: colors.info },
    { name: "에포크 수", value: "100", color: colors.success },
    { name: "층의 개수", value: "4", color: colors.accent },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white, marginBottom: 10 }}>하이퍼파라미터란?</h2>
        <p style={{ fontSize: 28, color: colors.gray[200] }}>사람이 설정하는 값 (모델이 학습하지 않음)</p>
      </div>

      <div style={{ position: "absolute", top: 260, left: "50%", transform: "translateX(-50%)", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30, width: 900 }}>
        {params.map((param, i) => {
          const opacity = interpolate(frame, [30 + i * 25, 55 + i * 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "25px 35px", background: "rgba(255,255,255,0.1)", borderRadius: 15, border: `2px solid ${param.color}`, display: "flex", justifyContent: "space-between", alignItems: "center", opacity }}>
              <span style={{ fontSize: 26, color: colors.white }}>{param.name}</span>
              <span style={{ fontSize: 28, color: param.color, fontWeight: "bold", fontFamily: "monospace" }}>{param.value}</span>
            </div>
          );
        })}
      </div>

      {/* Important note */}
      <div style={{ position: "absolute", bottom: 150, left: "50%", transform: "translateX(-50%)", padding: "25px 50px", background: "rgba(168, 85, 247, 0.2)", borderRadius: 15, border: `2px solid ${colors.primary}`, opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <span style={{ fontSize: 28, color: colors.primary }}>💡 적절한 값 선택이 성능에 큰 영향!</span>
      </div>

      <Audio src={staticFile("audio/lesson-3-7/what.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 3: Tuning methods
const MethodsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const methods = [
    { name: "Grid Search", desc: "모든 조합 시도", icon: "🔢", color: colors.info },
    { name: "Random Search", desc: "무작위 샘플링", icon: "🎲", color: colors.accent },
    { name: "Bayesian", desc: "지능적 탐색", icon: "🧠", color: colors.success },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>튜닝 방법</h2>
      </div>

      <div style={{ position: "absolute", top: 230, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 40 }}>
        {methods.map((method, i) => {
          const opacity = interpolate(frame, [30 + i * 40, 60 + i * 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "40px 30px", background: "rgba(255,255,255,0.1)", borderRadius: 20, border: `2px solid ${method.color}`, textAlign: "center", width: 280, opacity, transform: `translateY(${(1 - opacity) * 30}px)` }}>
              <div style={{ fontSize: 70, marginBottom: 20 }}>{method.icon}</div>
              <h3 style={{ fontSize: 28, color: method.color, marginBottom: 10 }}>{method.name}</h3>
              <p style={{ fontSize: 22, color: colors.gray[200] }}>{method.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Comparison visualization */}
      <div style={{ position: "absolute", bottom: 120, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 30, opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ padding: "15px 25px", background: "rgba(59, 130, 246, 0.2)", borderRadius: 10, border: `2px solid ${colors.info}` }}>
          <span style={{ fontSize: 20, color: colors.info }}>Grid: 철저하지만 느림</span>
        </div>
        <div style={{ padding: "15px 25px", background: "rgba(245, 158, 11, 0.2)", borderRadius: 10, border: `2px solid ${colors.accent}` }}>
          <span style={{ fontSize: 20, color: colors.accent }}>Random: 효율적</span>
        </div>
        <div style={{ padding: "15px 25px", background: "rgba(16, 185, 129, 0.2)", borderRadius: 10, border: `2px solid ${colors.success}` }}>
          <span style={{ fontSize: 20, color: colors.success }}>Bayesian: 최적 선택</span>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-3-7/methods.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 4: Learning rate
const LearningRateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const graphProgress = interpolate(frame, [30, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white, marginBottom: 10 }}>학습률 (Learning Rate)</h2>
        <p style={{ fontSize: 28, color: colors.danger }}>가장 중요한 하이퍼파라미터!</p>
      </div>

      {/* Learning rate effect visualization */}
      <svg width="900" height="400" style={{ position: "absolute", top: 230, left: "50%", transform: "translateX(-50%)" }}>
        {/* Axes */}
        <line x1="100" y1="350" x2="800" y2="350" stroke={colors.gray[200]} strokeWidth="2" />
        <line x1="100" y1="50" x2="100" y2="350" stroke={colors.gray[200]} strokeWidth="2" />
        <text x="450" y="390" fill={colors.gray[200]} fontSize="20" textAnchor="middle">Epochs</text>
        <text x="50" y="200" fill={colors.gray[200]} fontSize="20" textAnchor="middle" transform="rotate(-90, 50, 200)">Loss</text>

        {/* Too high (diverges) */}
        {graphProgress > 0 && (
          <path
            d={`M 100 300 Q ${100 + 200 * graphProgress} ${300 - 100 * graphProgress} ${100 + 400 * graphProgress} ${300 + 50 * graphProgress} Q ${100 + 500 * graphProgress} ${350 + 20 * graphProgress} ${100 + 600 * graphProgress} 100`}
            fill="none"
            stroke={colors.danger}
            strokeWidth="3"
          />
        )}

        {/* Just right */}
        {graphProgress > 0 && (
          <path
            d={`M 100 300 Q ${100 + 300 * graphProgress} ${300 - 150 * graphProgress} ${100 + 600 * graphProgress} ${300 - 230 * graphProgress}`}
            fill="none"
            stroke={colors.success}
            strokeWidth="3"
          />
        )}

        {/* Too low */}
        {graphProgress > 0 && (
          <path
            d={`M 100 300 Q ${100 + 300 * graphProgress} ${300 - 30 * graphProgress} ${100 + 600 * graphProgress} ${300 - 50 * graphProgress}`}
            fill="none"
            stroke={colors.accent}
            strokeWidth="3"
          />
        )}

        {/* Legend */}
        <rect x="620" y="80" width="20" height="20" fill={colors.danger} />
        <text x="650" y="95" fill={colors.white} fontSize="16">너무 큼 (발산)</text>
        <rect x="620" y="110" width="20" height="20" fill={colors.success} />
        <text x="650" y="125" fill={colors.white} fontSize="16">적절함 (수렴)</text>
        <rect x="620" y="140" width="20" height="20" fill={colors.accent} />
        <text x="650" y="155" fill={colors.white} fontSize="16">너무 작음 (느림)</text>
      </svg>

      {/* Scheduler mention */}
      <div style={{ position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)", padding: "20px 40px", background: "rgba(168, 85, 247, 0.2)", borderRadius: 15, border: `2px solid ${colors.primary}`, opacity: interpolate(frame, [250, 280], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <span style={{ fontSize: 24, color: colors.primary }}>💡 학습률 스케줄러로 동적 조절!</span>
      </div>

      <Audio src={staticFile("audio/lesson-3-7/learningrate.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 5: Tips
const TipsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tips = [
    { num: "1", text: "학습률 먼저 튜닝", color: colors.danger },
    { num: "2", text: "배치 크기 조절", color: colors.info },
    { num: "3", text: "검증 손실 기준 선택", color: colors.success },
    { num: "4", text: "자동화 도구 활용", color: colors.accent },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>💡 튜닝 팁</h2>
      </div>

      <div style={{ position: "absolute", top: 230, left: "50%", transform: "translateX(-50%)", width: 800 }}>
        {tips.map((tip, i) => {
          const opacity = interpolate(frame, [20 + i * 30, 50 + i * 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 25, marginBottom: 30, opacity }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: tip.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: colors.white, fontWeight: "bold" }}>{tip.num}</div>
              <div style={{ flex: 1, padding: "20px 30px", background: "rgba(255,255,255,0.1)", borderRadius: 12, border: `2px solid ${tip.color}` }}>
                <span style={{ fontSize: 26, color: colors.white }}>{tip.text}</span>
              </div>
            </div>
          );
        })}
      </div>

      <Audio src={staticFile("audio/lesson-3-7/tips.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 6: Outro
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { icon: "🎛️", text: "사람이 설정하는 값" },
    { icon: "🔍", text: "Grid/Random/Bayesian 서치" },
    { icon: "📈", text: "학습률이 가장 중요!" },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)` }}>
      <GlobalOverlay />
      <h2 style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", fontSize: 50, color: colors.white }}>
        📚 오늘 배운 내용
      </h2>

      <div style={{ position: "absolute", top: 230, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", gap: 30, width: 700 }}>
        {items.map((item, i) => {
          const itemOpacity = interpolate(frame, [20 + i * 35, 50 + i * 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "25px 35px", background: "rgba(255,255,255,0.1)", borderRadius: 15, display: "flex", alignItems: "center", gap: 25, opacity: itemOpacity }}>
              <span style={{ fontSize: 50 }}>{item.icon}</span>
              <span style={{ fontSize: 28, color: colors.white }}>{item.text}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 150, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <p style={{ fontSize: 36, color: colors.accent, fontWeight: "bold", opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          💡 체계적인 튜닝으로 최적 성능 달성!
        </p>
      </div>

      <Audio src={staticFile("audio/lesson-3-7/outro.mp3")} />
    </AbsoluteFill>
  );
};

export const Lesson3_7Video: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <IntroScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.what.start} durationInFrames={SCENE_TIMINGS.what.duration}>
        <WhatScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.methods.start} durationInFrames={SCENE_TIMINGS.methods.duration}>
        <MethodsScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.learningrate.start} durationInFrames={SCENE_TIMINGS.learningrate.duration}>
        <LearningRateScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.tips.start} durationInFrames={SCENE_TIMINGS.tips.duration}>
        <TipsScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export default Lesson3_7Video;
