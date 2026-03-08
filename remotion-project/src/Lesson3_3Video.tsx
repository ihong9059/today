import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const SCENE_TIMINGS = {
  scene1_intro: { duration: 940, start: 0 },
  scene2_forward: { duration: 819, start: 940 },
  scene3_chainrule: { duration: 828, start: 1759 },
  scene4_gradient: { duration: 773, start: 2587 },
  scene5_computation: { duration: 704, start: 3360 },
  scene6_outro: { duration: 906, start: 4064 },
};
export const LESSON_3_3_DURATION = 4970;

const colors = {
  bg: { dark: "#0f172a" }, primary: "#a855f7", secondary: "#7c3aed", accent: "#f59e0b",
  success: "#10b981", danger: "#ef4444", ai: "#06b6d4", white: "#ffffff",
  gray: { 100: "#f1f5f9", 300: "#cbd5e1", 500: "#64748b", 700: "#334155", 800: "#1e293b", 900: "#0f172a" },
};

const fadeIn = (frame: number, start: number = 0, duration: number = 30) => interpolate(frame, [start, start + duration], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
const slideUp = (frame: number, start: number = 0, duration: number = 30, distance: number = 50) => interpolate(frame, [start, start + duration], [distance, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
const scaleIn = (frame: number, fps: number, delay: number = 0) => Math.min(spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 100 } }), 1);

const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOpacity = fadeIn(frame, 0, 30);
  return (
    <>
      <div style={{ position: "absolute", top: 30, left: 40, zIndex: 1000, opacity: logoOpacity, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 50, height: 50, borderRadius: 12, background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 15px ${colors.primary}60` }}>
          <span style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>U</span>
        </div>
        <span style={{ fontSize: 32, fontWeight: "bold", color: colors.white, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>UTTEC-Lab</span>
      </div>
      <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, zIndex: 1000, opacity: logoOpacity, display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "12px 40px", backgroundColor: `${colors.gray[900]}dd`, borderRadius: 30, border: `2px solid ${colors.primary}60` }}>
          <span style={{ fontSize: 24, color: colors.gray[100] }}>교육 사이트:</span>
          <span style={{ fontSize: 26, color: colors.accent, fontWeight: "bold", marginLeft: 10 }}>http://uttec-ai.duckdns.org</span>
        </div>
      </div>
    </>
  );
};

const AnimatedBackground: React.FC<{ color1?: string; color2?: string; color3?: string }> = ({ color1 = colors.primary, color2 = colors.secondary, color3 = "#0f172a" }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)` }} />
      {[0, 1, 2].map((i) => (<div key={i} style={{ position: "absolute", left: 400 + Math.sin((frame + i * 100) / 80) * 300, top: 300 + Math.cos((frame + i * 100) / 60) * 200, width: 400 + i * 100, height: 400 + i * 100, borderRadius: "50%", background: `radial-gradient(circle, ${colors.primary}30 0%, transparent 70%)`, filter: "blur(40px)" }} />))}
    </AbsoluteFill>
  );
};

const Particles: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const frame = useCurrentFrame();
  return (<>{Array.from({ length: count }).map((_, i) => (<div key={i} style={{ position: "absolute", left: ((i * 137.5) % 1920) + Math.sin((frame * (0.5 + (i % 5) * 0.3) + i * 50) / 40) * 30, top: (((i * 73.7) % 1080) + frame * (0.5 + (i % 5) * 0.3) * 0.5) % 1200 - 60, width: 3 + (i % 4) * 2, height: 3 + (i % 4) * 2, borderRadius: "50%", backgroundColor: colors.white, opacity: 0.1 + Math.sin((frame + i * 20) / 30) * 0.1 }} />))}</>);
};

const GlowText: React.FC<{ children: React.ReactNode; fontSize?: number; glowColor?: string }> = ({ children, fontSize = 72, glowColor = colors.primary }) => (
  <span style={{ fontSize, fontWeight: "bold", color: colors.white, textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}60` }}>{children}</span>
);

const Card: React.FC<{ children: React.ReactNode; width?: number | string; borderColor?: string; style?: React.CSSProperties }> = ({ children, width = 400, borderColor = colors.primary, style = {} }) => (
  <div style={{ width, padding: 30, backgroundColor: `${colors.gray[900]}ee`, borderRadius: 24, border: `3px solid ${borderColor}`, boxShadow: `0 0 40px ${borderColor}40`, backdropFilter: "blur(10px)", ...style }}>{children}</div>
);

// Scene 1: Intro
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-3/scene1_intro.mp3")} />
      <AnimatedBackground color1="#4c1d95" color2={colors.primary} color3="#0f172a" />
      <Particles count={40} />
      <div style={{ position: "absolute", top: 100, right: 100, opacity: fadeIn(frame, 80, 30), transform: `scale(${scaleIn(frame, fps, 80)})` }}>
        <div style={{ padding: "15px 40px", background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, borderRadius: 20 }}>
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 3 - Lesson 3</span>
        </div>
      </div>
      <div style={{ position: "absolute", top: "28%", left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 30, 40), transform: `translateY(${slideUp(frame, 30, 40)}px)` }}>
        <div style={{ marginBottom: 30 }}><span style={{ fontSize: 120, marginRight: 20 }}>🔄</span><GlowText fontSize={90}>역전파</GlowText></div>
        <div style={{ marginTop: 30 }}><span style={{ fontSize: 42, color: colors.gray[300] }}>Backpropagation - 딥러닝 학습의 핵심</span></div>
      </div>
      <div style={{ position: "absolute", bottom: "15%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 40, opacity: fadeIn(frame, 200, 40) }}>
        {[{ icon: "➡️", text: "순전파" }, { icon: "⬅️", text: "역전파" }, { icon: "🔗", text: "연쇄법칙" }, { icon: "📊", text: "그래디언트" }].map((item, i) => (
          <div key={i} style={{ padding: "20px 35px", backgroundColor: `${colors.gray[800]}cc`, borderRadius: 15, border: `2px solid ${colors.gray[600]}`, transform: `scale(${scaleIn(frame, fps, 200 + i * 25)})` }}>
            <span style={{ fontSize: 36 }}>{item.icon}</span><span style={{ fontSize: 24, color: colors.white, marginLeft: 15 }}>{item.text}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Forward
const Scene2Forward: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const arrowProgress = Math.min(frame / 200, 1);
  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-3/scene2_forward.mp3")} />
      <AnimatedBackground color1="#065f46" color2={colors.success} color3="#0f172a" />
      <Particles count={30} />
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}><GlowText fontSize={64} glowColor={colors.success}>➡️ 순전파 (Forward Pass)</GlowText></div>
      <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 30, opacity: fadeIn(frame, 80, 40) }}>
        {["입력", "은닉층 1", "은닉층 2", "출력"].map((label, i) => (
          <React.Fragment key={i}>
            <Card width={200} borderColor={i === 0 ? colors.ai : i === 3 ? colors.accent : colors.success} style={{ transform: `scale(${scaleIn(frame, fps, 80 + i * 40)})` }}>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 32, color: colors.white }}>{label}</div></div>
            </Card>
            {i < 3 && <div style={{ fontSize: 48, color: colors.success, opacity: arrowProgress }}>→</div>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: "18%", left: "50%", transform: "translateX(-50%)", opacity: fadeIn(frame, 350, 40) }}>
        <Card width={800} borderColor={colors.accent}><div style={{ textAlign: "center", fontSize: 32, color: colors.white }}>순전파 = 예측 생성 과정</div></Card>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Chain Rule
const Scene3ChainRule: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-3/scene3_chainrule.mp3")} />
      <AnimatedBackground color1="#1e3a8a" color2="#3b82f6" color3="#0f172a" />
      <Particles count={30} />
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}><GlowText fontSize={64} glowColor="#3b82f6">🔗 연쇄 법칙 (Chain Rule)</GlowText></div>
      <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", opacity: fadeIn(frame, 80, 40) }}>
        <Card width={900} borderColor="#3b82f6">
          <div style={{ textAlign: "center" }}>
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: "italic", fontSize: 56, color: colors.white }}>∂L/∂w = ∂L/∂y × ∂y/∂w</span>
            <div style={{ marginTop: 20, fontSize: 28, color: colors.gray[300] }}>각 층의 미분을 곱해서 전파</div>
          </div>
        </Card>
      </div>
      <div style={{ position: "absolute", bottom: "20%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 40, opacity: fadeIn(frame, 300, 40) }}>
        <Card width={350} borderColor={colors.accent}><div style={{ textAlign: "center", fontSize: 28, color: colors.white }}>출력 → 입력 방향</div></Card>
        <Card width={350} borderColor={colors.success}><div style={{ textAlign: "center", fontSize: 28, color: colors.white }}>그래디언트 전파</div></Card>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Gradient
const Scene4Gradient: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-3/scene4_gradient.mp3")} />
      <AnimatedBackground color1="#7c2d12" color2="#ea580c" color3="#0f172a" />
      <Particles count={30} />
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}><GlowText fontSize={64} glowColor="#ea580c">📊 그래디언트란?</GlowText></div>
      <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 60, opacity: fadeIn(frame, 80, 40) }}>
        <Card width={400} borderColor={colors.danger} style={{ transform: `scale(${scaleIn(frame, fps, 80)})` }}>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 64, marginBottom: 15 }}>📈</div><div style={{ fontSize: 28, color: colors.white }}>그래디언트 큼</div><div style={{ fontSize: 24, color: colors.gray[300], marginTop: 10 }}>가중치 영향 ↑</div></div>
        </Card>
        <Card width={400} borderColor={colors.success} style={{ transform: `scale(${scaleIn(frame, fps, 150)})` }}>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 64, marginBottom: 15 }}>📉</div><div style={{ fontSize: 28, color: colors.white }}>그래디언트 작음</div><div style={{ fontSize: 24, color: colors.gray[300], marginTop: 10 }}>가중치 영향 ↓</div></div>
        </Card>
      </div>
      <div style={{ position: "absolute", bottom: "15%", left: "50%", transform: "translateX(-50%)", opacity: fadeIn(frame, 350, 40) }}>
        <Card width={700} borderColor={colors.ai}><div style={{ textAlign: "center" }}><span style={{ fontSize: 32, color: colors.ai }}>loss.backward()</span><span style={{ fontSize: 28, color: colors.white, marginLeft: 15 }}>= 자동 역전파</span></div></Card>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Computation Graph
const Scene5Computation: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-3/scene5_computation.mp3")} />
      <AnimatedBackground color1="#4c1d95" color2={colors.primary} color3="#0f172a" />
      <Particles count={30} />
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}><GlowText fontSize={64}>🗺️ 계산 그래프</GlowText></div>
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 1000, height: 300, opacity: fadeIn(frame, 80, 40) }}>
        <svg width="1000" height="300" viewBox="0 0 1000 300">
          <circle cx="150" cy="150" r="50" fill={colors.ai} /><text x="150" y="160" textAnchor="middle" fill={colors.white} fontSize="24">입력</text>
          <circle cx="400" cy="150" r="50" fill={colors.success} /><text x="400" y="160" textAnchor="middle" fill={colors.white} fontSize="24">연산</text>
          <circle cx="650" cy="150" r="50" fill={colors.success} /><text x="650" y="160" textAnchor="middle" fill={colors.white} fontSize="24">연산</text>
          <circle cx="900" cy="150" r="50" fill={colors.accent} /><text x="900" y="160" textAnchor="middle" fill={colors.white} fontSize="24">출력</text>
          <path d="M 200,150 L 350,150" stroke={colors.success} strokeWidth="4" markerEnd="url(#arrow)" />
          <path d="M 450,150 L 600,150" stroke={colors.success} strokeWidth="4" markerEnd="url(#arrow)" />
          <path d="M 700,150 L 850,150" stroke={colors.success} strokeWidth="4" markerEnd="url(#arrow)" />
          <defs><marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill={colors.success} /></marker></defs>
        </svg>
      </div>
      <div style={{ position: "absolute", bottom: "18%", left: "50%", transform: "translateX(-50%)", opacity: fadeIn(frame, 300, 40) }}>
        <Card width={800} borderColor={colors.primary}><div style={{ textAlign: "center", fontSize: 28, color: colors.white }}>PyTorch가 자동으로 그래프 생성 + 역전파 계산!</div></Card>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Outro
const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-3-3/scene6_outro.mp3")} />
      <AnimatedBackground color1="#4c1d95" color2={colors.primary} color3="#0f172a" />
      <Particles count={40} />
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}><GlowText fontSize={64}>📝 오늘 배운 내용</GlowText></div>
      <div style={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", gap: 25, opacity: fadeIn(frame, 60, 40) }}>
        {[{ icon: "➡️", title: "순전파", desc: "입력→출력, 예측 생성" }, { icon: "⬅️", title: "역전파", desc: "출력→입력, 그래디언트 전파" }, { icon: "🔗", title: "연쇄법칙", desc: "각 층의 미분을 곱함" }, { icon: "🔧", title: "PyTorch", desc: "loss.backward() + optimizer.step()" }].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 30, opacity: fadeIn(frame, 80 + i * 50, 30), transform: `translateX(${slideUp(frame, 80 + i * 50, 30)}px)` }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, backgroundColor: `${colors.primary}40`, border: `3px solid ${colors.primary}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42 }}>{item.icon}</div>
            <div><div style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>{item.title}</div><div style={{ fontSize: 24, color: colors.gray[300], marginTop: 5 }}>{item.desc}</div></div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 120, left: "50%", transform: "translateX(-50%)", opacity: fadeIn(frame, 400, 40) }}>
        <Card width={800} borderColor={colors.accent}><div style={{ textAlign: "center" }}><span style={{ fontSize: 36, color: colors.accent }}>➡️ 다음 시간:</span><span style={{ fontSize: 32, color: colors.white, marginLeft: 20 }}>활성화 함수 심화!</span></div></Card>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson3_3Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <GlobalOverlay />
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}><Scene1Intro /></Sequence>
      <Sequence from={SCENE_TIMINGS.scene2_forward.start} durationInFrames={SCENE_TIMINGS.scene2_forward.duration}><Scene2Forward /></Sequence>
      <Sequence from={SCENE_TIMINGS.scene3_chainrule.start} durationInFrames={SCENE_TIMINGS.scene3_chainrule.duration}><Scene3ChainRule /></Sequence>
      <Sequence from={SCENE_TIMINGS.scene4_gradient.start} durationInFrames={SCENE_TIMINGS.scene4_gradient.duration}><Scene4Gradient /></Sequence>
      <Sequence from={SCENE_TIMINGS.scene5_computation.start} durationInFrames={SCENE_TIMINGS.scene5_computation.duration}><Scene5Computation /></Sequence>
      <Sequence from={SCENE_TIMINGS.scene6_outro.start} durationInFrames={SCENE_TIMINGS.scene6_outro.duration}><Scene6Outro /></Sequence>
    </AbsoluteFill>
  );
};

export default Lesson3_3Video;
