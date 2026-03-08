import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_7_7_DURATION = 3287;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 475 },
  encoderOnly: { start: 475, duration: 470 },
  mlm: { start: 945, duration: 471 },
  nsp: { start: 1416, duration: 458 },
  tokens: { start: 1874, duration: 478 },
  finetuning: { start: 2352, duration: 504 },
  outro: { start: 2856, duration: 431 },
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
      <Audio src={staticFile("audio/lesson-7-7/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>📚</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>BERT 구조</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>Encoder-only 아키텍처</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 7-7
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneEncoderonly: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-7/encoder_only.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>인코더만 사용</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>📚</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>양방향 문맥</div>
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
              <div style={{ fontSize: 120 }}>📚</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMlm: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-7/mlm.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>마스크드 LM</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>📚</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>빈칸 채우기</div>
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
              <div style={{ fontSize: 120 }}>📚</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneNsp: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-7/nsp.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>다음 문장 예측</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>📚</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>문장 관계 이해</div>
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
              <div style={{ fontSize: 120 }}>📚</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTokens: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-7/tokens.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>특수 토큰</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>📚</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>CLS, SEP</div>
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
              <div style={{ fontSize: 120 }}>📚</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneFinetuning: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-7/finetuning.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>파인튜닝</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
              <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>📚</div>
              <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>다양한 작업 적용</div>
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
              <div style={{ fontSize: 120 }}>📚</div>
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
    <Audio src={staticFile("audio/lesson-7-7/outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "Encoder-only", desc: "양방향 문맥 이해" },
          { title: "MLM", desc: "마스크 토큰 예측" },
          { title: "NSP", desc: "문장 관계 학습" },
          { title: "파인튜닝", desc: "다양한 작업 적용" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        다음 시간: <span style={{ fontWeight: 700 }}>LLM 학습과 활용</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson7_7Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.encoderOnly.start} durationInFrames={SCENE_TIMINGS.encoderOnly.duration}><SceneEncoderonly /></Sequence>
    <Sequence from={SCENE_TIMINGS.mlm.start} durationInFrames={SCENE_TIMINGS.mlm.duration}><SceneMlm /></Sequence>
    <Sequence from={SCENE_TIMINGS.nsp.start} durationInFrames={SCENE_TIMINGS.nsp.duration}><SceneNsp /></Sequence>
    <Sequence from={SCENE_TIMINGS.tokens.start} durationInFrames={SCENE_TIMINGS.tokens.duration}><SceneTokens /></Sequence>
    <Sequence from={SCENE_TIMINGS.finetuning.start} durationInFrames={SCENE_TIMINGS.finetuning.duration}><SceneFinetuning /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
