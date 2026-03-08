import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_7_6_DURATION = 3461;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 466 },
  decoderOnly: { start: 466, duration: 497 },
  causal: { start: 963, duration: 500 },
  scaling: { start: 1463, duration: 530 },
  emergent: { start: 1993, duration: 495 },
  generation: { start: 2488, duration: 519 },
  outro: { start: 3007, duration: 454 },
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
      <Audio src={staticFile("audio/lesson-7-6/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>💬</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>GPT 구조</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>Decoder-only 아키텍처</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 7-6
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneDecoderonly: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-6/decoder_only.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>디코더만 사용</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>💬</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>단방향 생성</div>
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
              <div style={{ fontSize: 120 }}>💬</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCausal: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-6/causal.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>인과적 모델링</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>💬</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>미래 토큰 마스킹</div>
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
              <div style={{ fontSize: 120 }}>💬</div>
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
      <Audio src={staticFile("audio/lesson-7-6/scaling.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>스케일링</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>💬</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>파라미터 증가</div>
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
              <div style={{ fontSize: 120 }}>💬</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneEmergent: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-6/emergent.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>창발적 능력</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>💬</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>예상치 못한 능력</div>
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
              <div style={{ fontSize: 120 }}>💬</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneGeneration: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-6/generation.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>텍스트 생성</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>💬</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>샘플링 전략</div>
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
              <div style={{ fontSize: 120 }}>💬</div>
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
    <Audio src={staticFile("audio/lesson-7-6/outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "Decoder-only", desc: "인코더 없이 디코더만" },
          { title: "인과적 모델링", desc: "왼쪽→오른쪽 생성" },
          { title: "스케일링", desc: "크기와 능력 비례" },
          { title: "창발적 능력", desc: "추론, 코딩 등" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        다음 시간: <span style={{ fontWeight: 700 }}>BERT 구조</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson7_6Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.decoderOnly.start} durationInFrames={SCENE_TIMINGS.decoderOnly.duration}><SceneDecoderonly /></Sequence>
    <Sequence from={SCENE_TIMINGS.causal.start} durationInFrames={SCENE_TIMINGS.causal.duration}><SceneCausal /></Sequence>
    <Sequence from={SCENE_TIMINGS.scaling.start} durationInFrames={SCENE_TIMINGS.scaling.duration}><SceneScaling /></Sequence>
    <Sequence from={SCENE_TIMINGS.emergent.start} durationInFrames={SCENE_TIMINGS.emergent.duration}><SceneEmergent /></Sequence>
    <Sequence from={SCENE_TIMINGS.generation.start} durationInFrames={SCENE_TIMINGS.generation.duration}><SceneGeneration /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
