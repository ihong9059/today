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

export const LESSON_3_5_DURATION = 8512;

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
// intro: 912, overfitting: 1454, regularization: 1796, validation: 1449, techniques: 1555, outro: 1346
const SCENE_TIMINGS = {
  intro: { start: 0, duration: 912 },
  overfitting: { start: 912, duration: 1454 },
  regularization: { start: 2366, duration: 1796 },
  validation: { start: 4162, duration: 1449 },
  techniques: { start: 5611, duration: 1555 },
  outro: { start: 7166, duration: 1346 },
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
        <div style={{ fontSize: 150, marginBottom: 30, transform: `scale(${iconScale})` }}>⚖️</div>
        <h1 style={{ fontSize: 80, color: colors.white, marginBottom: 20, opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * 30}px)` }}>
          과적합과 정규화
        </h1>
        <p style={{ fontSize: 36, color: colors.gray[200], opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }) }}>
          Overfitting & Regularization
        </p>
      </div>
      <Audio src={staticFile("audio/lesson-3-5/intro.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 2: Overfitting
const OverfittingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const trainAcc = interpolate(frame, [30, 120], [0, 98], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const testAcc = interpolate(frame, [30, 120], [0, 65], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const problemOpacity = interpolate(frame, [200, 230], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white, marginBottom: 10 }}>과적합이란?</h2>
        <p style={{ fontSize: 28, color: colors.gray[200] }}>훈련 데이터에만 너무 잘 맞춰진 상태</p>
      </div>

      {/* Accuracy comparison */}
      <div style={{ position: "absolute", top: 280, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 100 }}>
        {/* Train accuracy */}
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 200, height: 200, borderRadius: "50%", background: `conic-gradient(${colors.success} ${trainAcc * 3.6}deg, ${colors.gray[700]} 0deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 160, height: 160, borderRadius: "50%", background: colors.dark, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 48, color: colors.success, fontWeight: "bold" }}>{Math.round(trainAcc)}%</span>
            </div>
          </div>
          <p style={{ fontSize: 28, color: colors.success, marginTop: 20 }}>훈련 정확도</p>
        </div>

        {/* Test accuracy */}
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 200, height: 200, borderRadius: "50%", background: `conic-gradient(${colors.danger} ${testAcc * 3.6}deg, ${colors.gray[700]} 0deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 160, height: 160, borderRadius: "50%", background: colors.dark, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 48, color: colors.danger, fontWeight: "bold" }}>{Math.round(testAcc)}%</span>
            </div>
          </div>
          <p style={{ fontSize: 28, color: colors.danger, marginTop: 20 }}>테스트 정확도</p>
        </div>
      </div>

      {/* Analogy */}
      <div style={{ position: "absolute", bottom: 150, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: problemOpacity }}>
        <div style={{ padding: "25px 50px", background: "rgba(239, 68, 68, 0.2)", borderRadius: 15, border: `2px solid ${colors.danger}` }}>
          <span style={{ fontSize: 28, color: colors.danger }}>📚 시험 문제를 외웠지만, 응용 문제는 못 푸는 것!</span>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-3-5/overfitting.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 3: Regularization
const RegularizationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const l1Opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const l2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const formulaOpacity = interpolate(frame, [220, 250], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white, marginBottom: 10 }}>정규화 (Regularization)</h2>
        <p style={{ fontSize: 28, color: colors.gray[200] }}>가중치에 제약을 가해 과적합 방지</p>
      </div>

      {/* L1 & L2 comparison */}
      <div style={{ position: "absolute", top: 280, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 80 }}>
        {/* L1 */}
        <div style={{ padding: "40px 50px", background: "rgba(59, 130, 246, 0.15)", borderRadius: 20, border: `2px solid ${colors.info}`, opacity: l1Opacity, width: 350 }}>
          <h3 style={{ fontSize: 36, color: colors.info, marginBottom: 20 }}>L1 정규화</h3>
          <p style={{ fontSize: 24, color: colors.gray[200], marginBottom: 15 }}>|w₁| + |w₂| + ...</p>
          <div style={{ fontSize: 22, color: colors.white }}>
            <p>• 가중치를 0으로 → 희소 모델</p>
            <p>• 불필요한 특성 제거</p>
          </div>
        </div>

        {/* L2 */}
        <div style={{ padding: "40px 50px", background: "rgba(16, 185, 129, 0.15)", borderRadius: 20, border: `2px solid ${colors.success}`, opacity: l2Opacity, width: 350 }}>
          <h3 style={{ fontSize: 36, color: colors.success, marginBottom: 20 }}>L2 정규화</h3>
          <p style={{ fontSize: 24, color: colors.gray[200], marginBottom: 15 }}>w₁² + w₂² + ...</p>
          <div style={{ fontSize: 22, color: colors.white }}>
            <p>• 가중치를 작게 → 단순화</p>
            <p>• 부드러운 결정 경계</p>
          </div>
        </div>
      </div>

      {/* Formula */}
      <div style={{ position: "absolute", bottom: 150, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: formulaOpacity }}>
        <div style={{ padding: "25px 50px", background: "rgba(168, 85, 247, 0.2)", borderRadius: 15, border: `2px solid ${colors.primary}` }}>
          <span style={{ fontSize: 28, color: colors.primary }}>Loss = 원래 손실 + λ × 정규화 항</span>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-3-5/regularization.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 4: Validation
const ValidationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const splitProgress = interpolate(frame, [30, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chartProgress = interpolate(frame, [150, 300], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white, marginBottom: 10 }}>검증 데이터</h2>
        <p style={{ fontSize: 28, color: colors.gray[200] }}>과적합을 감지하는 방법</p>
      </div>

      {/* Data split visualization */}
      <div style={{ position: "absolute", top: 250, left: 150, display: "flex", gap: 10 }}>
        <div style={{ width: 450 * splitProgress, height: 60, background: colors.info, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {splitProgress > 0.5 && <span style={{ fontSize: 22, color: colors.white }}>훈련 (70%)</span>}
        </div>
        <div style={{ width: 200 * splitProgress, height: 60, background: colors.accent, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {splitProgress > 0.5 && <span style={{ fontSize: 22, color: colors.white }}>검증 (15%)</span>}
        </div>
        <div style={{ width: 200 * splitProgress, height: 60, background: colors.success, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {splitProgress > 0.5 && <span style={{ fontSize: 22, color: colors.white }}>테스트 (15%)</span>}
        </div>
      </div>

      {/* Loss curves */}
      <svg width="800" height="350" style={{ position: "absolute", top: 380, left: "50%", transform: "translateX(-50%)" }}>
        {/* Axes */}
        <line x1="80" y1="300" x2="750" y2="300" stroke={colors.gray[200]} strokeWidth="2" />
        <line x1="80" y1="50" x2="80" y2="300" stroke={colors.gray[200]} strokeWidth="2" />
        <text x="400" y="340" fill={colors.gray[200]} fontSize="20" textAnchor="middle">Epochs</text>
        <text x="40" y="180" fill={colors.gray[200]} fontSize="20" textAnchor="middle" transform="rotate(-90, 40, 180)">Loss</text>

        {/* Train loss (decreasing) */}
        {chartProgress > 0 && (
          <path
            d={`M 80 250 Q ${80 + 300 * chartProgress} ${250 - 100 * chartProgress} ${80 + 600 * chartProgress} ${250 - 180 * chartProgress}`}
            fill="none"
            stroke={colors.info}
            strokeWidth="3"
          />
        )}

        {/* Validation loss (U-shaped) */}
        {chartProgress > 0 && (
          <path
            d={`M 80 250 Q ${80 + 200 * chartProgress} ${250 - 120 * chartProgress} ${80 + 350 * chartProgress} ${250 - 100 * chartProgress} Q ${80 + 500 * chartProgress} ${250 - 50 * chartProgress} ${80 + 600 * chartProgress} ${250 + 20 * chartProgress}`}
            fill="none"
            stroke={colors.danger}
            strokeWidth="3"
          />
        )}

        {/* Legend */}
        <rect x="550" y="80" width="20" height="20" fill={colors.info} />
        <text x="580" y="95" fill={colors.white} fontSize="18">훈련 손실</text>
        <rect x="550" y="110" width="20" height="20" fill={colors.danger} />
        <text x="580" y="125" fill={colors.white} fontSize="18">검증 손실</text>

        {/* Overfitting point */}
        {chartProgress > 0.6 && (
          <>
            <circle cx={80 + 350} cy={150} r="8" fill={colors.accent} />
            <text x={80 + 350} y="130" fill={colors.accent} fontSize="16" textAnchor="middle">과적합 시작!</text>
          </>
        )}
      </svg>

      <Audio src={staticFile("audio/lesson-3-5/validation.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 5: Techniques
const TechniquesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const techniques = [
    { icon: "🖼️", title: "데이터 증강", desc: "훈련 데이터 늘리기", color: colors.info },
    { icon: "⏱️", title: "조기 종료", desc: "최적 시점에 멈추기", color: colors.accent },
    { icon: "🤝", title: "앙상블", desc: "여러 모델 결합", color: colors.success },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white, marginBottom: 10 }}>과적합 방지 기법</h2>
      </div>

      <div style={{ position: "absolute", top: 250, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 50 }}>
        {techniques.map((tech, i) => {
          const techOpacity = interpolate(frame, [30 + i * 40, 60 + i * 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "40px", background: "rgba(255,255,255,0.1)", borderRadius: 20, border: `2px solid ${tech.color}`, textAlign: "center", width: 280, opacity: techOpacity, transform: `translateY(${(1 - techOpacity) * 30}px)` }}>
              <div style={{ fontSize: 70, marginBottom: 20 }}>{tech.icon}</div>
              <h3 style={{ fontSize: 32, color: tech.color, marginBottom: 15 }}>{tech.title}</h3>
              <p style={{ fontSize: 22, color: colors.gray[200] }}>{tech.desc}</p>
            </div>
          );
        })}
      </div>

      <Audio src={staticFile("audio/lesson-3-5/techniques.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 6: Outro
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { icon: "📊", text: "과적합 = 훈련에만 맞춤" },
    { icon: "⚖️", text: "L1/L2 정규화로 제약" },
    { icon: "📈", text: "검증 데이터로 감지" },
    { icon: "🎯", text: "일반화가 목표!" },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)` }}>
      <GlobalOverlay />
      <h2 style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", fontSize: 50, color: colors.white }}>
        📚 오늘 배운 내용
      </h2>

      <div style={{ position: "absolute", top: 220, left: "50%", transform: "translateX(-50%)", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30, width: 900 }}>
        {items.map((item, i) => {
          const itemOpacity = interpolate(frame, [20 + i * 25, 45 + i * 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "25px 30px", background: "rgba(255,255,255,0.1)", borderRadius: 15, display: "flex", alignItems: "center", gap: 20, opacity: itemOpacity }}>
              <span style={{ fontSize: 40 }}>{item.icon}</span>
              <span style={{ fontSize: 26, color: colors.white }}>{item.text}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 150, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <p style={{ fontSize: 36, color: colors.accent, fontWeight: "bold", opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          💡 일반화 능력이 좋은 모델을 만드세요!
        </p>
      </div>

      <Audio src={staticFile("audio/lesson-3-5/outro.mp3")} />
    </AbsoluteFill>
  );
};

export const Lesson3_5Video: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <IntroScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.overfitting.start} durationInFrames={SCENE_TIMINGS.overfitting.duration}>
        <OverfittingScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.regularization.start} durationInFrames={SCENE_TIMINGS.regularization.duration}>
        <RegularizationScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.validation.start} durationInFrames={SCENE_TIMINGS.validation.duration}>
        <ValidationScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.techniques.start} durationInFrames={SCENE_TIMINGS.techniques.duration}>
        <TechniquesScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export default Lesson3_5Video;
