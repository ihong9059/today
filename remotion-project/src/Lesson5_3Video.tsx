import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_5_3_DURATION = 4569;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 572 },
  pooling: { start: 572, duration: 686 },
  max_pooling: { start: 1258, duration: 552 },
  avg_pooling: { start: 1810, duration: 598 },
  batch_norm: { start: 2408, duration: 616 },
  bn_benefits: { start: 3024, duration: 612 },
  outro: { start: 3636, duration: 933 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#ec4899",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
};

const GlobalOverlay: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 12, zIndex: 100 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 50, height: 50, borderRadius: 8 }} />
      <span style={{ color: COLORS.light, fontSize: 24, fontWeight: 700, fontFamily: "Pretendard, sans-serif" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, right: 40, color: "rgba(255,255,255,0.6)", fontSize: 20, fontFamily: "Pretendard, sans-serif", zIndex: 100 }}>ai.uttec-lab.com</div>
  </>
);

const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);
  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-3/scene1_intro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>📊</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>풀링과 정규화</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>특성 맵 압축과 학습 안정화</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>Level 5-3</div>
      </div>
    </AbsoluteFill>
  );
};

const ScenePooling: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-3/scene2_pooling.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>풀링(Pooling)이란?</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(236,72,153,0.15)", borderRadius: 20, padding: 35, marginBottom: 30 }}>
            <div style={{ fontSize: 28, color: COLORS.light, marginBottom: 15 }}>책의 각 장을 한 문장으로 요약하는 것과 같습니다</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>중요한 핵심만 남기고 세부 사항 생략</div>
          </div>
          <div style={{ display: "grid", gap: 15 }}>
            {[{ icon: "⚡", text: "계산량 감소" }, { icon: "🛡️", text: "과적합 방지" }, { icon: "📍", text: "위치 불변성" }].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 20, display: "flex", alignItems: "center", gap: 15 }}>
                <span style={{ fontSize: 32 }}>{item.icon}</span>
                <span style={{ fontSize: 24, color: COLORS.light }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 22, color: COLORS.light, marginBottom: 15 }}>2×2 풀링, Stride=2</div>
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} style={{ width: 40, height: 40, background: COLORS.primary, borderRadius: 5, opacity: 0.7 + Math.random() * 0.3 }} />
              ))}
            </div>
            <span style={{ fontSize: 40, color: COLORS.primary }}>→</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ width: 40, height: 40, background: "#22c55e", borderRadius: 5 }} />
              ))}
            </div>
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)", marginTop: 15 }}>크기가 절반으로!</div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneMaxPooling: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-3/scene3_max_pooling.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Max Pooling</h1>
      <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 5, border: `3px solid ${COLORS.primary}`, borderRadius: 15, padding: 10 }}>
          {[1, 3, 4, 2].map((v, i) => (
            <div key={i} style={{ width: 80, height: 80, background: v === 4 ? "#22c55e" : "rgba(255,255,255,0.1)", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 36, color: COLORS.light, fontWeight: v === 4 ? 700 : 400 }}>{v}</div>
          ))}
        </div>
        <div style={{ fontSize: 50, color: COLORS.primary }}>→</div>
        <div style={{ width: 100, height: 100, background: "#22c55e", borderRadius: 15, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 48, color: COLORS.light, fontWeight: 700 }}>4</div>
        <div style={{ flex: 1, marginLeft: 40 }}>
          <div style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>영역 내 <span style={{ color: "#22c55e" }}>최댓값</span> 선택</div>
          <div style={{ display: "grid", gap: 15 }}>
            {["가장 강한 특징 보존", "노이즈에 강함", "CNN에서 가장 많이 사용"].map((text, i) => (
              <div key={i} style={{ background: "rgba(34,197,94,0.2)", borderRadius: 10, padding: 15, fontSize: 22, color: COLORS.light }}>✓ {text}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneAvgPooling: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-3/scene4_avg_pooling.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Average Pooling</h1>
      <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 5, border: `3px solid ${COLORS.primary}`, borderRadius: 15, padding: 10 }}>
          {[1, 3, 4, 2].map((v, i) => (
            <div key={i} style={{ width: 80, height: 80, background: "rgba(236,72,153,0.3)", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 36, color: COLORS.light }}>{v}</div>
          ))}
        </div>
        <div style={{ fontSize: 50, color: COLORS.primary }}>→</div>
        <div style={{ width: 100, height: 100, background: COLORS.primary, borderRadius: 15, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 40, color: COLORS.light, fontWeight: 700 }}>2.5</div>
        <div style={{ flex: 1, marginLeft: 40 }}>
          <div style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>영역 내 <span style={{ color: COLORS.primary }}>평균값</span> 계산</div>
          <div style={{ display: "grid", gap: 15 }}>
            {["모든 값 고려", "정보 손실 적음", "Global Average Pooling에 사용"].map((text, i) => (
              <div key={i} style={{ background: "rgba(236,72,153,0.2)", borderRadius: 10, padding: 15, fontSize: 22, color: COLORS.light }}>✓ {text}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneBatchNorm: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-3/scene5_batch_norm.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Batch Normalization</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {[
          { step: "1", title: "평균 계산", formula: "μ = Σxᵢ/m" },
          { step: "2", title: "분산 계산", formula: "σ² = Σ(xᵢ-μ)²/m" },
          { step: "3", title: "정규화", formula: "x̂ = (x-μ)/√σ²" },
          { step: "4", title: "스케일 & 시프트", formula: "y = γx̂ + β" }
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(236,72,153,0.15)", borderRadius: 15, padding: 25, textAlign: "center" }}>
            <div style={{ width: 50, height: 50, background: COLORS.primary, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 15px", fontSize: 24, color: COLORS.light, fontWeight: 700 }}>{item.step}</div>
            <div style={{ fontSize: 22, color: COLORS.light, marginBottom: 10 }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>{item.formula}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, background: "rgba(255,255,255,0.05)", borderRadius: 15, padding: 25, textAlign: "center" }}>
        <span style={{ fontSize: 24, color: COLORS.light }}>γ(감마)와 β(베타)는 <span style={{ color: COLORS.primary, fontWeight: 700 }}>학습 가능한 파라미터</span></span>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneBnBenefits: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-3/scene6_bn_benefits.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Batch Normalization의 효과</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        {[
          { icon: "🚀", title: "학습 속도 향상", desc: "더 큰 학습률 사용 가능" },
          { icon: "🎯", title: "초기화에 덜 민감", desc: "가중치 초기값이 나빠도 OK" },
          { icon: "🛡️", title: "정규화 효과", desc: "약간의 과적합 방지" },
          { icon: "📈", title: "기울기 흐름 개선", desc: "기울기 소실/폭발 완화" }
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(34,197,94,0.15)", borderRadius: 20, padding: 35, display: "flex", alignItems: "flex-start", gap: 20 }}>
            <div style={{ fontSize: 48 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)" }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-3/scene7_outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "Max Pooling", desc: "영역 내 최댓값 선택" },
          { title: "Avg Pooling", desc: "영역 내 평균값 계산" },
          { title: "Batch Norm", desc: "평균 0, 분산 1 정규화" },
          { title: "레이어 순서", desc: "Conv → BN → ReLU → Pool" }
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>다음 시간: <span style={{ fontWeight: 700 }}>CNN 아키텍처</span></div>
    </div>
  </AbsoluteFill>
);

export const Lesson5_3Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.pooling.start} durationInFrames={SCENE_TIMINGS.pooling.duration}><ScenePooling /></Sequence>
    <Sequence from={SCENE_TIMINGS.max_pooling.start} durationInFrames={SCENE_TIMINGS.max_pooling.duration}><SceneMaxPooling /></Sequence>
    <Sequence from={SCENE_TIMINGS.avg_pooling.start} durationInFrames={SCENE_TIMINGS.avg_pooling.duration}><SceneAvgPooling /></Sequence>
    <Sequence from={SCENE_TIMINGS.batch_norm.start} durationInFrames={SCENE_TIMINGS.batch_norm.duration}><SceneBatchNorm /></Sequence>
    <Sequence from={SCENE_TIMINGS.bn_benefits.start} durationInFrames={SCENE_TIMINGS.bn_benefits.duration}><SceneBnBenefits /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
