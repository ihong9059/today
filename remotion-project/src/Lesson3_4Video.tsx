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

export const LESSON_3_4_DURATION = 7903;

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
// intro: 869, sigmoid: 1369, relu: 1410, leaky: 1531, softmax: 1478, outro: 1246
const SCENE_TIMINGS = {
  intro: { start: 0, duration: 869 },
  sigmoid: { start: 869, duration: 1369 },
  relu: { start: 2238, duration: 1410 },
  leaky: { start: 3648, duration: 1531 },
  softmax: { start: 5179, duration: 1478 },
  outro: { start: 6657, duration: 1246 },
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
        <div style={{ fontSize: 150, marginBottom: 30, transform: `scale(${iconScale})` }}>⚡</div>
        <h1 style={{ fontSize: 80, color: colors.white, marginBottom: 20, opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * 30}px)` }}>
          활성화 함수 심화
        </h1>
        <p style={{ fontSize: 36, color: colors.gray[200], opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }) }}>
          Activation Functions Deep Dive
        </p>
      </div>
      <Audio src={staticFile("audio/lesson-3-4/intro.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 2: Sigmoid
const SigmoidScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const graphProgress = interpolate(frame, [30, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const issueOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Sigmoid curve points
  const drawSigmoid = () => {
    const points: string[] = [];
    const steps = Math.floor(graphProgress * 100);
    for (let i = 0; i <= steps; i++) {
      const x = (i / 100) * 400 - 200;
      const normalizedX = x / 50;
      const y = 1 / (1 + Math.exp(-normalizedX));
      const screenX = 960 + x;
      const screenY = 450 - y * 200;
      points.push(`${screenX},${screenY}`);
    }
    return points.join(" ");
  };

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white, marginBottom: 10 }}>시그모이드 함수</h2>
        <p style={{ fontSize: 32, color: colors.primary }}>σ(x) = 1 / (1 + e⁻ˣ)</p>
      </div>

      {/* Graph */}
      <svg width="1920" height="1080" style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Axes */}
        <line x1="760" y1="450" x2="1160" y2="450" stroke={colors.gray[200]} strokeWidth="2" />
        <line x1="960" y1="250" x2="960" y2="650" stroke={colors.gray[200]} strokeWidth="2" />
        {/* Labels */}
        <text x="1150" y="480" fill={colors.gray[200]} fontSize="24">x</text>
        <text x="980" y="270" fill={colors.gray[200]} fontSize="24">y</text>
        <text x="1130" y="360" fill={colors.success} fontSize="20">1</text>
        <text x="1130" y="560" fill={colors.gray[200]} fontSize="20">0</text>
        {/* Sigmoid curve */}
        <polyline points={drawSigmoid()} fill="none" stroke={colors.primary} strokeWidth="4" />
        {/* Reference lines */}
        <line x1="760" y1="250" x2="1160" y2="250" stroke={colors.success} strokeWidth="1" strokeDasharray="5,5" opacity={graphProgress} />
        <line x1="760" y1="450" x2="1160" y2="450" stroke={colors.gray[200]} strokeWidth="1" strokeDasharray="5,5" opacity={graphProgress} />
      </svg>

      {/* Info boxes */}
      <div style={{ position: "absolute", bottom: 150, left: 100, display: "flex", gap: 40 }}>
        <div style={{ padding: "25px 40px", background: "rgba(16, 185, 129, 0.2)", borderRadius: 15, border: `2px solid ${colors.success}` }}>
          <span style={{ fontSize: 28, color: colors.success }}>✓ 출력: 0 ~ 1 (확률)</span>
        </div>
        <div style={{ padding: "25px 40px", background: "rgba(239, 68, 68, 0.2)", borderRadius: 15, border: `2px solid ${colors.danger}`, opacity: issueOpacity }}>
          <span style={{ fontSize: 28, color: colors.danger }}>⚠ 그래디언트 소실 문제</span>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-3-4/sigmoid.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 3: ReLU
const ReLUScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const graphProgress = interpolate(frame, [30, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const benefitOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const popularOpacity = interpolate(frame, [250, 280], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white, marginBottom: 10 }}>ReLU</h2>
        <p style={{ fontSize: 32, color: colors.primary }}>f(x) = max(0, x)</p>
      </div>

      {/* Graph */}
      <svg width="1920" height="1080" style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Axes */}
        <line x1="760" y1="450" x2="1160" y2="450" stroke={colors.gray[200]} strokeWidth="2" />
        <line x1="960" y1="250" x2="960" y2="650" stroke={colors.gray[200]} strokeWidth="2" />
        {/* ReLU: flat at y=0 for x<0, diagonal for x>=0 */}
        <line x1="760" y1="450" x2="960" y2="450" stroke={colors.info} strokeWidth="4" opacity={graphProgress} />
        <line x1="960" y1="450" x2={960 + 200 * graphProgress} y2={450 - 200 * graphProgress} stroke={colors.info} strokeWidth="4" />
        {/* Labels */}
        <text x="1150" y="480" fill={colors.gray[200]} fontSize="24">x</text>
        <text x="980" y="270" fill={colors.gray[200]} fontSize="24">y</text>
      </svg>

      {/* Benefits */}
      <div style={{ position: "absolute", bottom: 180, left: 100, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ padding: "20px 35px", background: "rgba(59, 130, 246, 0.2)", borderRadius: 12, border: `2px solid ${colors.info}`, opacity: benefitOpacity }}>
          <span style={{ fontSize: 26, color: colors.info }}>⚡ 계산이 빠름 (max 연산)</span>
        </div>
        <div style={{ padding: "20px 35px", background: "rgba(16, 185, 129, 0.2)", borderRadius: 12, border: `2px solid ${colors.success}`, opacity: benefitOpacity }}>
          <span style={{ fontSize: 26, color: colors.success }}>✓ 그래디언트 소실 해결</span>
        </div>
      </div>

      {/* Most popular badge */}
      <div style={{ position: "absolute", top: 200, right: 100, padding: "30px 50px", background: `linear-gradient(135deg, ${colors.accent} 0%, #d97706 100%)`, borderRadius: 20, transform: "rotate(5deg)", opacity: popularOpacity, boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}>
        <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>🏆 가장 인기!</span>
      </div>

      <Audio src={staticFile("audio/lesson-3-4/relu.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 4: Leaky ReLU
const LeakyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const graphProgress = interpolate(frame, [30, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const comparisonOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white, marginBottom: 10 }}>Leaky ReLU</h2>
        <p style={{ fontSize: 32, color: colors.primary }}>f(x) = x if x {">"} 0, else 0.01x</p>
      </div>

      {/* Graph */}
      <svg width="1920" height="1080" style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Axes */}
        <line x1="760" y1="450" x2="1160" y2="450" stroke={colors.gray[200]} strokeWidth="2" />
        <line x1="960" y1="250" x2="960" y2="650" stroke={colors.gray[200]} strokeWidth="2" />
        {/* Leaky ReLU: small slope for x<0, normal for x>=0 */}
        <line x1={960 - 200 * graphProgress} y1={450 + 20 * graphProgress} x2="960" y2="450" stroke={colors.success} strokeWidth="4" />
        <line x1="960" y1="450" x2={960 + 200 * graphProgress} y2={450 - 200 * graphProgress} stroke={colors.success} strokeWidth="4" />
        {/* ReLU comparison (gray) */}
        <line x1="760" y1="450" x2="960" y2="450" stroke={colors.gray[200]} strokeWidth="2" strokeDasharray="5,5" opacity={comparisonOpacity * 0.5} />
        {/* Labels */}
        <text x="1150" y="480" fill={colors.gray[200]} fontSize="24">x</text>
        <text x="980" y="270" fill={colors.gray[200]} fontSize="24">y</text>
        <text x="800" y="420" fill={colors.success} fontSize="20" opacity={graphProgress}>기울기 0.01</text>
      </svg>

      {/* Info */}
      <div style={{ position: "absolute", bottom: 180, left: 100, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ padding: "20px 35px", background: "rgba(16, 185, 129, 0.2)", borderRadius: 12, border: `2px solid ${colors.success}` }}>
          <span style={{ fontSize: 26, color: colors.success }}>✓ '죽은 뉴런' 문제 방지</span>
        </div>
        <div style={{ padding: "20px 35px", background: "rgba(168, 85, 247, 0.2)", borderRadius: 12, border: `2px solid ${colors.primary}`, opacity: comparisonOpacity }}>
          <span style={{ fontSize: 26, color: colors.primary }}>📊 PReLU, ELU도 유사 아이디어</span>
        </div>
      </div>

      {/* Dead Neuron illustration */}
      <div style={{ position: "absolute", top: 220, right: 120, textAlign: "center", opacity: comparisonOpacity }}>
        <div style={{ fontSize: 60, marginBottom: 10 }}>💀 → 🧠</div>
        <p style={{ fontSize: 22, color: colors.gray[200] }}>죽은 뉴런 → 살아있음!</p>
      </div>

      <Audio src={staticFile("audio/lesson-3-4/leaky.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 5: Softmax
const SoftmaxScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barProgress = interpolate(frame, [40, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sumOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const classes = [
    { name: "고양이", prob: 0.7, color: colors.primary },
    { name: "강아지", prob: 0.2, color: colors.info },
    { name: "토끼", prob: 0.1, color: colors.success },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white, marginBottom: 10 }}>Softmax</h2>
        <p style={{ fontSize: 28, color: colors.primary }}>σ(z)ᵢ = eᶻⁱ / Σeᶻʲ</p>
      </div>

      {/* Probability bars */}
      <div style={{ position: "absolute", top: 280, left: "50%", transform: "translateX(-50%)", width: 800 }}>
        {classes.map((cls, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 28, color: colors.white, width: 120 }}>{cls.name}</span>
            <div style={{ flex: 1, height: 50, background: "rgba(255,255,255,0.1)", borderRadius: 25, overflow: "hidden", marginLeft: 20 }}>
              <div style={{ width: `${cls.prob * barProgress * 100}%`, height: "100%", background: cls.color, borderRadius: 25, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 15 }}>
                {barProgress > 0.5 && <span style={{ fontSize: 22, color: colors.white, fontWeight: "bold" }}>{(cls.prob * 100).toFixed(0)}%</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sum = 1 */}
      <div style={{ position: "absolute", bottom: 220, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: sumOpacity }}>
        <div style={{ padding: "25px 50px", background: "rgba(245, 158, 11, 0.2)", borderRadius: 15, border: `2px solid ${colors.accent}` }}>
          <span style={{ fontSize: 32, color: colors.accent }}>70% + 20% + 10% = <strong>100%</strong></span>
        </div>
        <p style={{ fontSize: 24, color: colors.gray[200], marginTop: 15 }}>모든 확률의 합 = 1</p>
      </div>

      {/* Use case */}
      <div style={{ position: "absolute", top: 220, right: 100, padding: "20px 30px", background: "rgba(168, 85, 247, 0.2)", borderRadius: 15, border: `2px solid ${colors.primary}` }}>
        <span style={{ fontSize: 24, color: colors.primary }}>📌 다중 클래스 분류 필수!</span>
      </div>

      <Audio src={staticFile("audio/lesson-3-4/softmax.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 6: Outro
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { icon: "📊", title: "Sigmoid", desc: "확률 출력 (0~1)", color: colors.danger },
    { icon: "⚡", title: "ReLU", desc: "은닉층 기본 선택", color: colors.info },
    { icon: "🔧", title: "Leaky ReLU", desc: "죽은 뉴런 방지", color: colors.success },
    { icon: "🎯", title: "Softmax", desc: "다중 분류 출력", color: colors.accent },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)` }}>
      <GlobalOverlay />
      <h2 style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", fontSize: 50, color: colors.white }}>
        📚 활성화 함수 선택 가이드
      </h2>

      <div style={{ position: "absolute", top: 220, left: "50%", transform: "translateX(-50%)", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40, width: 1000 }}>
        {items.map((item, i) => {
          const itemOpacity = interpolate(frame, [20 + i * 30, 50 + i * 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "30px", background: "rgba(255,255,255,0.1)", borderRadius: 20, border: `2px solid ${item.color}`, opacity: itemOpacity, transform: `translateY(${(1 - itemOpacity) * 20}px)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 10 }}>
                <span style={{ fontSize: 40 }}>{item.icon}</span>
                <span style={{ fontSize: 32, color: item.color, fontWeight: "bold" }}>{item.title}</span>
              </div>
              <p style={{ fontSize: 24, color: colors.gray[200] }}>{item.desc}</p>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 150, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <p style={{ fontSize: 36, color: colors.accent, fontWeight: "bold", opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          💡 상황에 맞는 활성화 함수를 선택하세요!
        </p>
      </div>

      <Audio src={staticFile("audio/lesson-3-4/outro.mp3")} />
    </AbsoluteFill>
  );
};

export const Lesson3_4Video: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <IntroScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.sigmoid.start} durationInFrames={SCENE_TIMINGS.sigmoid.duration}>
        <SigmoidScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.relu.start} durationInFrames={SCENE_TIMINGS.relu.duration}>
        <ReLUScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.leaky.start} durationInFrames={SCENE_TIMINGS.leaky.duration}>
        <LeakyScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.softmax.start} durationInFrames={SCENE_TIMINGS.softmax.duration}>
        <SoftmaxScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export default Lesson3_4Video;
