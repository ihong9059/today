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
  scene1_intro: { duration: 849, start: 0 },
  scene2_sgd: { duration: 958, start: 849 },
  scene3_momentum: { duration: 834, start: 1807 },
  scene4_adam: { duration: 782, start: 2641 },
  scene5_learningrate: { duration: 875, start: 3423 },
  scene6_outro: { duration: 831, start: 4298 },
};

export const LESSON_3_2_DURATION = 5129;

// ============ COLORS ============
const colors = {
  bg: { dark: "#0f172a" },
  primary: "#a855f7",
  secondary: "#7c3aed",
  accent: "#f59e0b",
  success: "#10b981",
  danger: "#ef4444",
  ai: "#06b6d4",
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
      <div style={{ position: "absolute", top: 30, left: 40, zIndex: 1000, opacity: logoOpacity, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 50, height: 50, borderRadius: 12, background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 15px ${colors.primary}60` }}>
          <span style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>U</span>
        </div>
        <span style={{ fontSize: 32, fontWeight: "bold", color: colors.white, textShadow: "0 2px 10px rgba(0,0,0,0.5)", letterSpacing: 1 }}>UTTEC-Lab</span>
      </div>
      <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, zIndex: 1000, opacity: logoOpacity, display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "12px 40px", backgroundColor: `${colors.gray[900]}dd`, borderRadius: 30, border: `2px solid ${colors.primary}60`, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
          <span style={{ fontSize: 24, color: colors.gray[100], fontWeight: 500 }}>교육 사이트:</span>
          <span style={{ fontSize: 26, color: colors.accent, fontWeight: "bold", marginLeft: 10, textShadow: `0 0 10px ${colors.accent}60` }}>http://uttec-ai.duckdns.org</span>
        </div>
      </div>
    </>
  );
};

// ============ BACKGROUND ============
const AnimatedBackground: React.FC<{ color1?: string; color2?: string; color3?: string }> = ({
  color1 = colors.primary, color2 = colors.secondary, color3 = "#0f172a"
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)` }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          position: "absolute",
          left: 400 + Math.sin((frame + i * 100) / 80) * 300,
          top: 300 + Math.cos((frame + i * 100) / 60) * 200,
          width: 400 + i * 100, height: 400 + i * 100, borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.primary}30 0%, transparent 70%)`, filter: "blur(40px)",
        }} />
      ))}
    </AbsoluteFill>
  );
};

const Particles: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = (i * 137.5) % 1920;
        const baseY = (i * 73.7) % 1080;
        const speed = 0.5 + (i % 5) * 0.3;
        return (
          <div key={i} style={{
            position: "absolute",
            left: baseX + Math.sin((frame * speed + i * 50) / 40) * 30,
            top: (baseY + frame * speed * 0.5) % 1200 - 60,
            width: 3 + (i % 4) * 2, height: 3 + (i % 4) * 2, borderRadius: "50%",
            backgroundColor: colors.white, opacity: 0.1 + Math.sin((frame + i * 20) / 30) * 0.1,
          }} />
        );
      })}
    </>
  );
};

// ============ UI COMPONENTS ============
const GlowText: React.FC<{ children: React.ReactNode; fontSize?: number; glowColor?: string }> = ({ children, fontSize = 72, glowColor = colors.primary }) => (
  <span style={{ fontSize, fontWeight: "bold", color: colors.white, textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}60` }}>{children}</span>
);

const Card: React.FC<{ children: React.ReactNode; width?: number | string; borderColor?: string; style?: React.CSSProperties }> = ({ children, width = 400, borderColor = colors.primary, style = {} }) => (
  <div style={{ width, padding: 30, backgroundColor: `${colors.gray[900]}ee`, borderRadius: 24, border: `3px solid ${borderColor}`, boxShadow: `0 0 40px ${borderColor}40, 0 20px 60px rgba(0,0,0,0.5)`, backdropFilter: "blur(10px)", ...style }}>{children}</div>
);

const MathFormula: React.FC<{ formula: string; fontSize?: number }> = ({ formula, fontSize = 48 }) => (
  <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: "italic", fontSize, color: colors.white, textShadow: `0 0 15px ${colors.primary}60` }}>{formula}</span>
);

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-2/scene1_intro.mp3")} />
      <AnimatedBackground color1="#4c1d95" color2={colors.primary} color3="#0f172a" />
      <Particles count={40} />

      <div style={{ position: "absolute", top: 100, right: 100, opacity: fadeIn(frame, 80, 30), transform: `scale(${scaleIn(frame, fps, 80)})` }}>
        <div style={{ padding: "15px 40px", background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, borderRadius: 20, border: `2px solid ${colors.white}40` }}>
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 3 - Lesson 2</span>
        </div>
      </div>

      <div style={{ position: "absolute", top: "28%", left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 30, 40), transform: `translateY(${slideUp(frame, 30, 40)}px)` }}>
        <div style={{ marginBottom: 30 }}>
          <span style={{ fontSize: 120, marginRight: 20 }}>⛰️</span>
          <GlowText fontSize={90}>경사하강법</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>SGD, Momentum, Adam - 최적화 알고리즘</span>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "15%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 40, opacity: fadeIn(frame, 200, 40) }}>
        {[{ icon: "📉", text: "SGD" }, { icon: "🏃", text: "Momentum" }, { icon: "🎯", text: "Adam" }, { icon: "⚡", text: "학습률" }].map((item, i) => (
          <div key={i} style={{ padding: "20px 35px", backgroundColor: `${colors.gray[800]}cc`, borderRadius: 15, border: `2px solid ${colors.gray[600]}`, transform: `scale(${scaleIn(frame, fps, 200 + i * 25)})` }}>
            <span style={{ fontSize: 36 }}>{item.icon}</span>
            <span style={{ fontSize: 24, color: colors.white, marginLeft: 15 }}>{item.text}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: SGD ============
const Scene2SGD: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 공 애니메이션 (지그재그)
  const progress = (frame % 300) / 300;
  const ballX = 200 + progress * 800;
  const ballY = 300 + Math.sin(progress * Math.PI * 4) * 100;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-2/scene2_sgd.mp3")} />
      <AnimatedBackground color1="#1e3a8a" color2="#3b82f6" color3="#0f172a" />
      <Particles count={30} />

      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}>
        <GlowText fontSize={64} glowColor="#3b82f6">📉 SGD (확률적 경사하강법)</GlowText>
      </div>

      <div style={{ position: "absolute", top: "18%", left: "50%", transform: "translateX(-50%)", opacity: fadeIn(frame, 60, 40) }}>
        <Card width={700} borderColor="#3b82f6">
          <div style={{ textAlign: "center" }}>
            <MathFormula formula="w = w - η × ∇L" fontSize={56} />
            <div style={{ marginTop: 20, fontSize: 28, color: colors.gray[300] }}>
              η = 학습률, ∇L = 기울기(그래디언트)
            </div>
          </div>
        </Card>
      </div>

      {/* 지그재그 이동 시각화 */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 1000, height: 300, opacity: fadeIn(frame, 200, 40) }}>
        <svg width="1000" height="300" viewBox="0 0 1000 300">
          <path d="M 100,150 Q 300,50 500,150 Q 700,250 900,150" fill="none" stroke={colors.gray[500]} strokeWidth="3" strokeDasharray="10,5" />
          <circle cx={ballX} cy={ballY} r="20" fill={colors.accent} />
        </svg>
      </div>

      <div style={{ position: "absolute", bottom: "12%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 40, opacity: fadeIn(frame, 350, 40) }}>
        <Card width={350} borderColor={colors.danger} style={{ transform: `scale(${scaleIn(frame, fps, 350)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 42 }}>🐌</div>
            <div style={{ fontSize: 24, color: colors.white, marginTop: 10 }}>느린 수렴</div>
          </div>
        </Card>
        <Card width={350} borderColor={colors.danger} style={{ transform: `scale(${scaleIn(frame, fps, 400)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 42 }}>↔️</div>
            <div style={{ fontSize: 24, color: colors.white, marginTop: 10 }}>지그재그 진동</div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: MOMENTUM ============
const Scene3Momentum: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 공 애니메이션 (부드러운 곡선)
  const progress = Math.min((frame / 400), 1);
  const ballX = 150 + progress * 700;
  const ballY = 280 - Math.sin(progress * Math.PI) * 130;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-2/scene3_momentum.mp3")} />
      <AnimatedBackground color1="#065f46" color2={colors.success} color3="#0f172a" />
      <Particles count={30} />

      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}>
        <GlowText fontSize={64} glowColor={colors.success}>🏃 Momentum (관성)</GlowText>
      </div>

      {/* 굴러가는 공 비유 */}
      <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", width: 900, height: 350, opacity: fadeIn(frame, 80, 40) }}>
        <svg width="900" height="350" viewBox="0 0 900 350">
          {/* 언덕 */}
          <path d="M 50,300 Q 250,100 450,250 Q 650,350 850,200" fill="none" stroke={colors.success} strokeWidth="4" />
          {/* 굴러가는 공 */}
          <circle cx={ballX} cy={ballY} r="25" fill={colors.accent} style={{ filter: "drop-shadow(0 0 20px #f59e0b)" }} />
          {/* 속도 화살표 */}
          {frame > 150 && (
            <path d={`M ${ballX},${ballY} L ${ballX + 60},${ballY - 30}`} stroke={colors.accent} strokeWidth="4" markerEnd="url(#arrowhead)" />
          )}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={colors.accent} />
            </marker>
          </defs>
        </svg>
      </div>

      <div style={{ position: "absolute", bottom: "15%", left: "50%", transform: "translateX(-50%)", opacity: fadeIn(frame, 300, 40) }}>
        <Card width={800} borderColor={colors.success}>
          <div style={{ textAlign: "center" }}>
            <MathFormula formula="v = βv + ∇L,  w = w - ηv" fontSize={42} />
            <div style={{ marginTop: 15, fontSize: 26, color: colors.gray[300] }}>β = 0.9 (모멘텀 계수)</div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: ADAM ============
const Scene4Adam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-2/scene4_adam.mp3")} />
      <AnimatedBackground color1="#7c2d12" color2="#ea580c" color3="#0f172a" />
      <Particles count={30} />

      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}>
        <GlowText fontSize={64} glowColor="#ea580c">🎯 Adam (적응형 학습)</GlowText>
      </div>

      {/* Adam = Momentum + RMSprop */}
      <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 40, opacity: fadeIn(frame, 80, 40) }}>
        <Card width={280} borderColor={colors.success} style={{ transform: `scale(${scaleIn(frame, fps, 80)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>🏃</div>
            <div style={{ fontSize: 28, color: colors.white, marginTop: 10 }}>Momentum</div>
            <div style={{ fontSize: 20, color: colors.gray[300], marginTop: 5 }}>관성</div>
          </div>
        </Card>
        <span style={{ fontSize: 60, color: colors.white }}>+</span>
        <Card width={280} borderColor="#3b82f6" style={{ transform: `scale(${scaleIn(frame, fps, 150)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>📊</div>
            <div style={{ fontSize: 28, color: colors.white, marginTop: 10 }}>RMSprop</div>
            <div style={{ fontSize: 20, color: colors.gray[300], marginTop: 5 }}>적응형 학습률</div>
          </div>
        </Card>
        <span style={{ fontSize: 60, color: colors.white }}>=</span>
        <Card width={280} borderColor="#ea580c" style={{ transform: `scale(${scaleIn(frame, fps, 220)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>🎯</div>
            <div style={{ fontSize: 28, color: "#ea580c", marginTop: 10, fontWeight: "bold" }}>Adam</div>
            <div style={{ fontSize: 20, color: colors.gray[300], marginTop: 5 }}>최고의 조합</div>
          </div>
        </Card>
      </div>

      {/* 장점들 */}
      <div style={{ position: "absolute", bottom: "15%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 30, opacity: fadeIn(frame, 350, 40) }}>
        {["대부분 문제에서 잘 작동", "학습률 자동 조절", "빠른 수렴"].map((text, i) => (
          <div key={i} style={{
            padding: "15px 30px", backgroundColor: `${colors.gray[800]}cc`, borderRadius: 15, border: `2px solid ${colors.success}`,
            transform: `scale(${scaleIn(frame, fps, 350 + i * 40)})`
          }}>
            <span style={{ fontSize: 24, color: colors.white }}>✓ {text}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: LEARNING RATE ============
const Scene5LearningRate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-2/scene5_learningrate.mp3")} />
      <AnimatedBackground color1="#4c1d95" color2={colors.primary} color3="#0f172a" />
      <Particles count={30} />

      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}>
        <GlowText fontSize={64}>⚡ 학습률 (Learning Rate)</GlowText>
      </div>

      {/* 너무 크거나 작거나 */}
      <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 60, opacity: fadeIn(frame, 80, 40) }}>
        <Card width={400} borderColor={colors.danger} style={{ transform: `scale(${scaleIn(frame, fps, 80)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64 }}>🚀</div>
            <div style={{ fontSize: 32, color: colors.danger, marginTop: 15 }}>너무 크면</div>
            <div style={{ fontSize: 24, color: colors.gray[300], marginTop: 10, lineHeight: 1.6 }}>
              골짜기를 지나침<br />손실이 발산
            </div>
          </div>
        </Card>
        <Card width={400} borderColor={colors.success} style={{ transform: `scale(${scaleIn(frame, fps, 150)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64 }}>✓</div>
            <div style={{ fontSize: 32, color: colors.success, marginTop: 15 }}>적절하면</div>
            <div style={{ fontSize: 24, color: colors.gray[300], marginTop: 10, lineHeight: 1.6 }}>
              빠르게 수렴<br />최적점 도달
            </div>
          </div>
        </Card>
        <Card width={400} borderColor={colors.accent} style={{ transform: `scale(${scaleIn(frame, fps, 220)})` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64 }}>🐌</div>
            <div style={{ fontSize: 32, color: colors.accent, marginTop: 15 }}>너무 작으면</div>
            <div style={{ fontSize: 24, color: colors.gray[300], marginTop: 10, lineHeight: 1.6 }}>
              학습이 느림<br />지역 최소점
            </div>
          </div>
        </Card>
      </div>

      {/* 권장 값 */}
      <div style={{ position: "absolute", bottom: "15%", left: "50%", transform: "translateX(-50%)", opacity: fadeIn(frame, 400, 40) }}>
        <Card width={700} borderColor={colors.ai}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 32, color: colors.white }}>💡 권장 시작값: </span>
            <span style={{ fontSize: 42, color: colors.ai, fontWeight: "bold" }}>η = 0.001</span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: OUTRO ============
const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-2/scene6_outro.mp3")} />
      <AnimatedBackground color1="#4c1d95" color2={colors.primary} color3="#0f172a" />
      <Particles count={40} />

      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}>
        <GlowText fontSize={64}>📝 오늘 배운 내용</GlowText>
      </div>

      <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", gap: 25, opacity: fadeIn(frame, 60, 40) }}>
        {[
          { icon: "📉", title: "SGD", desc: "기본적, 느림, 지그재그" },
          { icon: "🏃", title: "Momentum", desc: "관성으로 가속, 안정적" },
          { icon: "🎯", title: "Adam", desc: "적응형 + 관성, 대부분 최고" },
          { icon: "⚡", title: "학습률", desc: "0.001로 시작, 점진적 감소" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 30, opacity: fadeIn(frame, 80 + i * 50, 30), transform: `translateX(${slideUp(frame, 80 + i * 50, 30)}px)` }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, backgroundColor: `${colors.primary}40`, border: `3px solid ${colors.primary}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>{item.title}</div>
              <div style={{ fontSize: 24, color: colors.gray[300], marginTop: 5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 120, left: "50%", transform: "translateX(-50%)", opacity: fadeIn(frame, 400, 40) }}>
        <Card width={800} borderColor={colors.accent}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 36, color: colors.accent }}>➡️ 다음 시간:</span>
            <span style={{ fontSize: 32, color: colors.white, marginLeft: 20 }}>역전파 알고리즘!</span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const Lesson3_2Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <GlobalOverlay />
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}><Scene1Intro /></Sequence>
      <Sequence from={SCENE_TIMINGS.scene2_sgd.start} durationInFrames={SCENE_TIMINGS.scene2_sgd.duration}><Scene2SGD /></Sequence>
      <Sequence from={SCENE_TIMINGS.scene3_momentum.start} durationInFrames={SCENE_TIMINGS.scene3_momentum.duration}><Scene3Momentum /></Sequence>
      <Sequence from={SCENE_TIMINGS.scene4_adam.start} durationInFrames={SCENE_TIMINGS.scene4_adam.duration}><Scene4Adam /></Sequence>
      <Sequence from={SCENE_TIMINGS.scene5_learningrate.start} durationInFrames={SCENE_TIMINGS.scene5_learningrate.duration}><Scene5LearningRate /></Sequence>
      <Sequence from={SCENE_TIMINGS.scene6_outro.start} durationInFrames={SCENE_TIMINGS.scene6_outro.duration}><Scene6Outro /></Sequence>
    </AbsoluteFill>
  );
};

export default Lesson3_2Video;
