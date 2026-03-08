import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_7_1_DURATION = 4499;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 454 },
  rnnLimit: { start: 454, duration: 769 },
  transformer: { start: 1223, duration: 750 },
  architecture: { start: 1973, duration: 627 },
  components: { start: 2600, duration: 679 },
  comparison: { start: 3279, duration: 663 },
  outro: { start: 3942, duration: 557 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#8b5cf6",
  secondary: "#7c3aed",
  accent: "#6d28d9",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
};

const GlobalOverlay: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 12, zIndex: 100 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 50, height: 50, borderRadius: 8 }} />
      <span style={{ color: COLORS.light, fontSize: 24, fontWeight: 700, fontFamily: "Pretendard, sans-serif" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, right: 40, color: "rgba(255,255,255,0.6)", fontSize: 20, fontFamily: "Pretendard, sans-serif", zIndex: 100 }}>
      ai.uttec-lab.com
    </div>
  </>
);

const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);
  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🤖</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>Transformer 개요</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>Attention is All You Need</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 7-1
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneRnnlimit: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/rnn_limit.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>RNN의 한계</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>🤖</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>순차 처리의 문제점</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: 300, height: 300,
              background: "rgba(139,92,246,0.2)",
              borderRadius: 20,
              display: "flex", justifyContent: "center", alignItems: "center",
              border: `3px solid ${COLORS.primary}`,
              transform: `scale(${1 + Math.sin(frame * 0.05) * 0.05})`
            }}>
              <div style={{ fontSize: 120 }}>🤖</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTransformer: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/transformer.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>트랜스포머 등장</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>🤖</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>2017년 구글의 혁신</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: 300, height: 300,
              background: "rgba(139,92,246,0.2)",
              borderRadius: 20,
              display: "flex", justifyContent: "center", alignItems: "center",
              border: `3px solid ${COLORS.primary}`,
              transform: `scale(${1 + Math.sin(frame * 0.05) * 0.05})`
            }}>
              <div style={{ fontSize: 120 }}>🤖</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneArchitecture: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/architecture.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>전체 구조</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>🤖</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>인코더와 디코더</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: 300, height: 300,
              background: "rgba(139,92,246,0.2)",
              borderRadius: 20,
              display: "flex", justifyContent: "center", alignItems: "center",
              border: `3px solid ${COLORS.primary}`,
              transform: `scale(${1 + Math.sin(frame * 0.05) * 0.05})`
            }}>
              <div style={{ fontSize: 120 }}>🤖</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneComponents: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/components.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>핵심 구성요소</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>🤖</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>어텐션과 FFN</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: 300, height: 300,
              background: "rgba(139,92,246,0.2)",
              borderRadius: 20,
              display: "flex", justifyContent: "center", alignItems: "center",
              border: `3px solid ${COLORS.primary}`,
              transform: `scale(${1 + Math.sin(frame * 0.05) * 0.05})`
            }}>
              <div style={{ fontSize: 120 }}>🤖</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneComparison: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/comparison.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>RNN vs Transformer</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>🤖</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>성능 비교</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: 300, height: 300,
              background: "rgba(139,92,246,0.2)",
              borderRadius: 20,
              display: "flex", justifyContent: "center", alignItems: "center",
              border: `3px solid ${COLORS.primary}`,
              transform: `scale(${1 + Math.sin(frame * 0.05) * 0.05})`
            }}>
              <div style={{ fontSize: 120 }}>🤖</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-7-1/outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "RNN의 한계", desc: "순차 처리와 기울기 소실" },
          { title: "트랜스포머", desc: "병렬 처리와 어텐션" },
          { title: "핵심 구조", desc: "인코더-디코더" },
          { title: "성능 향상", desc: "속도와 품질 개선" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        다음 시간: <span style={{ fontWeight: 700 }}>Self-Attention의 원리</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson7_1Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.rnnLimit.start} durationInFrames={SCENE_TIMINGS.rnnLimit.duration}><SceneRnnlimit /></Sequence>
    <Sequence from={SCENE_TIMINGS.transformer.start} durationInFrames={SCENE_TIMINGS.transformer.duration}><SceneTransformer /></Sequence>
    <Sequence from={SCENE_TIMINGS.architecture.start} durationInFrames={SCENE_TIMINGS.architecture.duration}><SceneArchitecture /></Sequence>
    <Sequence from={SCENE_TIMINGS.components.start} durationInFrames={SCENE_TIMINGS.components.duration}><SceneComponents /></Sequence>
    <Sequence from={SCENE_TIMINGS.comparison.start} durationInFrames={SCENE_TIMINGS.comparison.duration}><SceneComparison /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
