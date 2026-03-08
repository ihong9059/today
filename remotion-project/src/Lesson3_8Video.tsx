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

export const LESSON_3_8_DURATION = 8359;

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
// intro: 858, review: 1380, techniques: 1403, pipeline: 1806, next: 1471, outro: 1441
const SCENE_TIMINGS = {
  intro: { start: 0, duration: 858 },
  review: { start: 858, duration: 1380 },
  techniques: { start: 2238, duration: 1403 },
  pipeline: { start: 3641, duration: 1806 },
  next: { start: 5447, duration: 1471 },
  outro: { start: 6918, duration: 1441 },
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
        <div style={{ fontSize: 150, marginBottom: 30, transform: `scale(${iconScale})` }}>🎯</div>
        <h1 style={{ fontSize: 80, color: colors.white, marginBottom: 20, opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * 30}px)` }}>
          Level 3 종합 실습
        </h1>
        <p style={{ fontSize: 36, color: colors.gray[200], opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }) }}>
          딥러닝 핵심 총정리
        </p>
      </div>
      <Audio src={staticFile("audio/lesson-3-8/intro.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 2: Review
const ReviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { icon: "📉", title: "손실 함수", desc: "오차 측정", color: colors.danger },
    { icon: "⬇️", title: "경사 하강법", desc: "가중치 업데이트", color: colors.info },
    { icon: "🔄", title: "역전파", desc: "그래디언트 계산", color: colors.success },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>📚 학습 복습</h2>
      </div>

      <div style={{ position: "absolute", top: 230, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 40 }}>
        {items.map((item, i) => {
          const opacity = interpolate(frame, [30 + i * 35, 60 + i * 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "40px 35px", background: "rgba(255,255,255,0.1)", borderRadius: 20, border: `2px solid ${item.color}`, textAlign: "center", width: 260, opacity, transform: `translateY(${(1 - opacity) * 30}px)` }}>
              <div style={{ fontSize: 60, marginBottom: 15 }}>{item.icon}</div>
              <h3 style={{ fontSize: 28, color: item.color, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontSize: 22, color: colors.gray[200] }}>{item.desc}</p>
            </div>
          );
        })}
      </div>

      <Audio src={staticFile("audio/lesson-3-8/review.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 3: Techniques
const TechniquesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { icon: "⚡", title: "활성화 함수", color: colors.primary },
    { icon: "⚖️", title: "정규화", color: colors.accent },
    { icon: "🧹", title: "BatchNorm", color: colors.info },
    { icon: "🎲", title: "Dropout", color: colors.success },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>🔧 성능 향상 기법</h2>
      </div>

      <div style={{ position: "absolute", top: 240, left: "50%", transform: "translateX(-50%)", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30, width: 800 }}>
        {items.map((item, i) => {
          const opacity = interpolate(frame, [20 + i * 25, 50 + i * 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "30px 40px", background: "rgba(255,255,255,0.1)", borderRadius: 15, border: `2px solid ${item.color}`, display: "flex", alignItems: "center", gap: 20, opacity }}>
              <span style={{ fontSize: 50 }}>{item.icon}</span>
              <span style={{ fontSize: 28, color: colors.white }}>{item.title}</span>
            </div>
          );
        })}
      </div>

      <Audio src={staticFile("audio/lesson-3-8/techniques.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 4: Pipeline
const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { num: "1", text: "데이터 준비", color: colors.info },
    { num: "2", text: "모델 설계", color: colors.primary },
    { num: "3", text: "손실 함수 선택", color: colors.danger },
    { num: "4", text: "옵티마이저 설정", color: colors.accent },
    { num: "5", text: "학습 & 검증", color: colors.success },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>🔄 학습 파이프라인</h2>
      </div>

      <div style={{ position: "absolute", top: 220, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 15 }}>
        {steps.map((step, i) => {
          const opacity = interpolate(frame, [20 + i * 25, 45 + i * 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: step.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: colors.white, fontWeight: "bold" }}>{step.num}</div>
                <span style={{ fontSize: 18, color: colors.white, textAlign: "center", width: 100 }}>{step.text}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ fontSize: 30, color: colors.gray[200], opacity }}>→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Repeat arrow */}
      <div style={{ position: "absolute", bottom: 200, left: "50%", transform: "translateX(-50%)", opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ padding: "20px 40px", background: "rgba(16, 185, 129, 0.2)", borderRadius: 15, border: `2px solid ${colors.success}` }}>
          <span style={{ fontSize: 26, color: colors.success }}>🔁 반복하며 최적화!</span>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-3-8/pipeline.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 5: Next
const NextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { icon: "🖼️", title: "CNN", desc: "이미지 처리" },
    { icon: "📝", title: "RNN", desc: "시퀀스 처리" },
    { icon: "🤖", title: "Transformer", desc: "최신 아키텍처" },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>🚀 다음 단계: Level 4</h2>
      </div>

      <div style={{ position: "absolute", top: 240, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 40 }}>
        {items.map((item, i) => {
          const opacity = interpolate(frame, [40 + i * 40, 70 + i * 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "40px 50px", background: "rgba(168, 85, 247, 0.15)", borderRadius: 20, border: `2px solid ${colors.primary}`, textAlign: "center", width: 250, opacity, transform: `scale(${opacity})` }}>
              <div style={{ fontSize: 70, marginBottom: 15 }}>{item.icon}</div>
              <h3 style={{ fontSize: 32, color: colors.primary, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontSize: 22, color: colors.gray[200] }}>{item.desc}</p>
            </div>
          );
        })}
      </div>

      <Audio src={staticFile("audio/lesson-3-8/next.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 6: Outro
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const celebrateScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 8 } });
  const textOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #4c1d95 0%, ${colors.primary} 50%, ${colors.secondary} 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        <div style={{ fontSize: 150, marginBottom: 30, transform: `scale(${celebrateScale})` }}>🎉</div>
        <h1 style={{ fontSize: 70, color: colors.white, marginBottom: 20, opacity: textOpacity }}>
          Level 3 완료!
        </h1>
        <p style={{ fontSize: 32, color: colors.gray[200], opacity: textOpacity, marginBottom: 30 }}>
          딥러닝의 핵심 원리를 마스터했습니다!
        </p>
        <div style={{ padding: "20px 50px", background: "rgba(245, 158, 11, 0.3)", borderRadius: 15, border: `2px solid ${colors.accent}`, display: "inline-block", opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <span style={{ fontSize: 28, color: colors.accent }}>다음 레벨에서 만나요! 🚀</span>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-3-8/outro.mp3")} />
    </AbsoluteFill>
  );
};

export const Lesson3_8Video: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <IntroScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.review.start} durationInFrames={SCENE_TIMINGS.review.duration}>
        <ReviewScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.techniques.start} durationInFrames={SCENE_TIMINGS.techniques.duration}>
        <TechniquesScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.pipeline.start} durationInFrames={SCENE_TIMINGS.pipeline.duration}>
        <PipelineScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.next.start} durationInFrames={SCENE_TIMINGS.next.duration}>
        <NextScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export default Lesson3_8Video;
