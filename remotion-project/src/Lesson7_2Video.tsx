import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_7_2_DURATION = 4118;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 428 },
  concept: { start: 428, duration: 555 },
  qkv: { start: 983, duration: 632 },
  calculation: { start: 1615, duration: 633 },
  scaling: { start: 2248, duration: 678 },
  context: { start: 2926, duration: 621 },
  outro: { start: 3547, duration: 571 },
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
      <Audio src={staticFile("audio/lesson-7-2/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔍</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>Self-Attention</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>Q, K, V의 이해</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 7-2
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneConcept: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/concept.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>어텐션 개념</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>🔍</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>중요한 것에 집중</div>
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
              <div style={{ fontSize: 120 }}>🔍</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneQkv: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/qkv.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Q, K, V</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>🔍</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>질의, 키, 값</div>
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
              <div style={{ fontSize: 120 }}>🔍</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCalculation: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/calculation.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>계산 과정</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>🔍</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>내적과 소프트맥스</div>
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
              <div style={{ fontSize: 120 }}>🔍</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneScaling: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scaling.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>스케일링</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>🔍</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>안정적인 학습</div>
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
              <div style={{ fontSize: 120 }}>🔍</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneContext: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/context.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>문맥 이해</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>🔍</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>단어 간 관계</div>
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
              <div style={{ fontSize: 120 }}>🔍</div>
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
    <Audio src={staticFile("audio/lesson-7-2/outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "Self-Attention", desc: "자기 자신을 참조" },
          { title: "Q, K, V", desc: "질의, 키, 값 벡터" },
          { title: "계산 과정", desc: "내적 → 스케일 → 소프트맥스" },
          { title: "문맥 이해", desc: "단어 간 관계 파악" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        다음 시간: <span style={{ fontWeight: 700 }}>Multi-Head Attention</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson7_2Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.concept.start} durationInFrames={SCENE_TIMINGS.concept.duration}><SceneConcept /></Sequence>
    <Sequence from={SCENE_TIMINGS.qkv.start} durationInFrames={SCENE_TIMINGS.qkv.duration}><SceneQkv /></Sequence>
    <Sequence from={SCENE_TIMINGS.calculation.start} durationInFrames={SCENE_TIMINGS.calculation.duration}><SceneCalculation /></Sequence>
    <Sequence from={SCENE_TIMINGS.scaling.start} durationInFrames={SCENE_TIMINGS.scaling.duration}><SceneScaling /></Sequence>
    <Sequence from={SCENE_TIMINGS.context.start} durationInFrames={SCENE_TIMINGS.context.duration}><SceneContext /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
