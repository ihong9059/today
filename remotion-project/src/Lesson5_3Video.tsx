import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_5_3_DURATION = 7033;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 497 },
  what_is_pooling: { start: 497, duration: 713 },
  max_pooling: { start: 1210, duration: 761 },
  avg_pooling: { start: 1971, duration: 856 },
  batch_norm_intro: { start: 2827, duration: 743 },
  batch_norm_formula: { start: 3570, duration: 859 },
  batch_norm_effect: { start: 4429, duration: 688 },
  layer_order: { start: 5117, duration: 815 },
  outro: { start: 5932, duration: 1101 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#06b6d4",
  secondary: "#0891b2",
  accent: "#f59e0b",
  success: "#10b981",
  purple: "#8b5cf6",
  pink: "#ec4899",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
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
      <Audio src={staticFile("audio/lesson-5-3/scene1_intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🎯</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>풀링과 정규화</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>Max Pooling, Batch Normalization</div>
        <div style={{ marginTop: 40, display: "flex", gap: 20, justifyContent: "center" }}>
          <div style={{ padding: "15px 30px", background: "rgba(0,0,0,0.3)", borderRadius: 30, fontSize: 24, color: COLORS.light }}>🎯 Pooling</div>
          <div style={{ padding: "15px 30px", background: "rgba(0,0,0,0.3)", borderRadius: 30, fontSize: 24, color: COLORS.light }}>⚖️ Normalization</div>
        </div>
        <div style={{ marginTop: 30, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 5-3
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneWhatIsPooling: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-3/scene2_what_is_pooling.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>📚 풀링(Pooling)이란?</h1>
      <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 30, marginBottom: 40 }}>
        <div style={{ fontSize: 28, color: COLORS.light }}>
          📖 비유: 두꺼운 책의 각 장을 <span style={{ color: COLORS.accent, fontWeight: 700 }}>한 문장으로 요약</span>하는 것!
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30, marginBottom: 40 }}>
        {[
          { icon: "⚡", title: "계산량 감소", desc: "특성 맵 크기 줄임" },
          { icon: "🛡️", title: "과적합 방지", desc: "파라미터 수 감소" },
          { icon: "📍", title: "위치 불변성", desc: "약간의 위치 변화에 강함" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 30, textAlign: "center", border: "2px solid rgba(255,255,255,0.1)" }}>
            <div style={{ fontSize: 50, marginBottom: 15 }}>{item.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 10 }}>{item.title}</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <div style={{ padding: 20, background: COLORS.primary, borderRadius: 15 }}>
          <span style={{ fontSize: 24, color: COLORS.light, fontWeight: 700 }}>4×4 입력</span>
        </div>
        <span style={{ fontSize: 50, color: COLORS.accent }}>→</span>
        <div style={{ padding: 15, background: "rgba(6,182,212,0.3)", borderRadius: 10, border: `3px solid ${COLORS.primary}` }}>
          <span style={{ fontSize: 22, color: COLORS.light }}>2×2 Pooling</span>
        </div>
        <span style={{ fontSize: 50, color: COLORS.accent }}>→</span>
        <div style={{ padding: 20, background: COLORS.success, borderRadius: 15 }}>
          <span style={{ fontSize: 24, color: COLORS.light, fontWeight: 700 }}>2×2 출력</span>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneMaxPooling: React.FC = () => {
  const grid = [[1, 3, 2, 1], [4, 2, 1, 3], [3, 1, 4, 2], [2, 4, 3, 1]];
  const maxValues = [[4, 3], [4, 4]];
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-3/scene3_max_pooling.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>🏆 Max Pooling</h1>
        <div style={{ display: "flex", gap: 80, alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>입력 (4×4)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 70px)", gap: 8 }}>
              {grid.flat().map((val, i) => {
                const row = Math.floor(i / 4);
                const col = i % 4;
                const isMax = val === maxValues[row < 2 ? 0 : 1][col < 2 ? 0 : 1];
                return (
                  <div key={i} style={{ width: 70, height: 70, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: isMax ? COLORS.light : "rgba(255,255,255,0.8)", background: isMax ? COLORS.success : "rgba(255,255,255,0.1)", borderRadius: 10, border: isMax ? `3px solid ${COLORS.success}` : "2px solid rgba(255,255,255,0.2)" }}>
                    {val}
                  </div>
                );
              })}
            </div>
          </div>
          <span style={{ fontSize: 60, color: COLORS.accent }}>→</span>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>Max Pooling 결과 (2×2)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 90px)", gap: 10 }}>
              {maxValues.flat().map((val, i) => (
                <div key={i} style={{ width: 90, height: 90, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 700, color: COLORS.light, background: COLORS.success, borderRadius: 15, boxShadow: `0 4px 20px ${COLORS.success}50` }}>
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
          {["가장 강한 특징 선택", "노이즈에 강함", "CNN 표준 방식"].map((text, i) => (
            <div key={i} style={{ padding: "15px 25px", background: "rgba(16,185,129,0.2)", borderRadius: 15, border: `2px solid ${COLORS.success}60` }}>
              <span style={{ fontSize: 22, color: COLORS.light }}>✓ {text}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneAvgPooling: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-3/scene4_avg_pooling.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.purple, marginBottom: 40 }}>📊 Average Pooling</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: 50, marginBottom: 50 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 80px)", gap: 8 }}>
          {[1, 3, 4, 2].map((val, i) => (
            <div key={i} style={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 700, color: COLORS.light, background: COLORS.purple, borderRadius: 12 }}>
              {val}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, color: COLORS.accent }}>→</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>avg(1,3,4,2)</div>
          <div style={{ width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: 700, color: COLORS.light, background: COLORS.accent, borderRadius: 20, boxShadow: `0 4px 25px ${COLORS.accent}50` }}>
            2.5
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
        <div style={{ flex: 1, maxWidth: 450, padding: 30, background: "rgba(16,185,129,0.15)", borderRadius: 20, border: `2px solid ${COLORS.success}60` }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.success, marginBottom: 20 }}>Max Pooling</div>
          <div style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.8 }}>• 최댓값 선택<br/>• 가장 강한 특징 보존<br/>• 대부분 CNN에서 사용</div>
        </div>
        <div style={{ flex: 1, maxWidth: 450, padding: 30, background: "rgba(139,92,246,0.15)", borderRadius: 20, border: `2px solid ${COLORS.purple}60` }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.purple, marginBottom: 20 }}>Average Pooling</div>
          <div style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.8 }}>• 평균값 계산<br/>• 전체 분포 반영<br/>• GAP: 마지막 층에서 사용</div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneBatchNormIntro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-3/scene5_batch_norm_intro.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.pink, marginBottom: 40 }}>⚖️ Batch Normalization</h1>
      <div style={{ background: "rgba(236,72,153,0.15)", borderRadius: 20, padding: 35, marginBottom: 40 }}>
        <div style={{ fontSize: 26, color: COLORS.light, lineHeight: 1.8 }}>
          🏃 <span style={{ color: COLORS.pink, fontWeight: 700 }}>비유:</span> 마라톤 선수들의 페이스를 매 체크포인트에서 조절하는 것!<br/>
          <span style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>너무 빠른 선수는 늦추고, 너무 느린 선수는 빠르게 → 일정한 속도 유지</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 30 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 20 }}>왜 필요한가?</div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
            • 층이 깊어질수록 값의 분포가 불안정해짐<br/>
            • 앞쪽 층의 작은 변화가 뒤쪽에서 증폭<br/>
            • 학습이 불안정하거나 실패할 수 있음
          </div>
        </div>
        <div style={{ flex: 1, background: "rgba(236,72,153,0.1)", borderRadius: 20, padding: 30 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 20 }}>어떻게 해결?</div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
            • 각 층의 출력을 <span style={{ color: COLORS.pink }}>평균 0, 표준편차 1</span>로 정규화<br/>
            • 값들이 일정한 범위 안에 유지<br/>
            • <span style={{ color: COLORS.accent }}>2015년</span> 제안된 혁신적 기법
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneBatchNormFormula: React.FC = () => {
  const steps = [
    { num: 1, title: "배치 평균 계산", formula: "μ = (1/m) Σ xᵢ", desc: "데이터 평균 구하기" },
    { num: 2, title: "배치 분산 계산", formula: "σ² = (1/m) Σ (xᵢ-μ)²", desc: "분산 계산" },
    { num: 3, title: "정규화", formula: "x̂ = (x-μ) / √(σ²+ε)", desc: "평균 0, 표준편차 1" },
    { num: 4, title: "스케일 & 시프트", formula: "y = γ × x̂ + β", desc: "학습 가능한 파라미터" },
  ];
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-3/scene6_batch_norm_formula.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 52, color: COLORS.purple, marginBottom: 40 }}>📐 Batch Normalization 계산 과정</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25 }}>
          {steps.map((step) => (
            <div key={step.num} style={{ padding: 25, background: "rgba(255,255,255,0.05)", borderRadius: 20, border: `2px solid ${COLORS.purple}40` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
                <div style={{ width: 45, height: 45, borderRadius: "50%", background: COLORS.purple, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: COLORS.light }}>
                  {step.num}
                </div>
                <span style={{ fontSize: 26, fontWeight: 700, color: COLORS.light }}>{step.title}</span>
              </div>
              <div style={{ fontSize: 28, color: COLORS.accent, fontFamily: "monospace", marginBottom: 10 }}>{step.formula}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>{step.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 30, padding: 20, background: "rgba(245,158,11,0.15)", borderRadius: 15, border: `2px solid ${COLORS.accent}40` }}>
          <span style={{ fontSize: 24, color: COLORS.light }}>
            💡 <span style={{ color: COLORS.accent, fontWeight: 700 }}>γ(감마)</span>와 <span style={{ color: COLORS.accent, fontWeight: 700 }}>β(베타)</span>는 학습 가능한 파라미터 → 네트워크가 필요에 따라 조절
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneBatchNormEffect: React.FC = () => {
  const effects = [
    { icon: "🚀", title: "학습 속도 향상", desc: "더 큰 학습률 사용 가능" },
    { icon: "🎯", title: "초기화에 덜 민감", desc: "가중치 초기값 걱정 감소" },
    { icon: "🛡️", title: "정규화 효과", desc: "과적합 방지에 도움" },
    { icon: "📈", title: "기울기 흐름 개선", desc: "깊은 네트워크도 안정적" },
  ];
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-3/scene7_batch_norm_effect.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 52, color: COLORS.pink, marginBottom: 40 }}>✨ Batch Normalization 효과</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          {effects.map((effect, i) => (
            <div key={i} style={{ padding: 30, background: "rgba(255,255,255,0.05)", borderRadius: 20, border: `2px solid ${COLORS.pink}30`, display: "flex", alignItems: "center", gap: 25 }}>
              <div style={{ fontSize: 55 }}>{effect.icon}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 10 }}>{effect.title}</div>
                <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>{effect.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <span style={{ fontSize: 26, color: COLORS.accent }}>→ 대부분의 현대 CNN 구조에서 <span style={{ fontWeight: 700 }}>기본으로 사용</span></span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneLayerOrder: React.FC = () => {
  const layers = [
    { name: "Conv2d", desc: "특징 추출", color: COLORS.primary },
    { name: "BatchNorm2d", desc: "정규화", color: COLORS.pink },
    { name: "ReLU", desc: "비선형성", color: COLORS.success },
    { name: "MaxPool2d", desc: "다운샘플링", color: COLORS.accent },
  ];
  return (
    <AbsoluteFill style={{ background: COLORS.gradient, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-3/scene8_layer_order.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 52, color: COLORS.light, marginBottom: 50 }}>🧱 CNN 블록 구성 순서</h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 15, marginBottom: 50 }}>
          {layers.map((layer, i) => (
            <React.Fragment key={i}>
              <div style={{ padding: "25px 35px", background: layer.color, borderRadius: 20, textAlign: "center", boxShadow: `0 4px 20px ${layer.color}50` }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.light }}>{layer.name}</div>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>{layer.desc}</div>
              </div>
              {i < layers.length - 1 && <span style={{ fontSize: 40, color: COLORS.light }}>→</span>}
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
          <div style={{ flex: 1, maxWidth: 450, padding: 30, background: "rgba(0,0,0,0.3)", borderRadius: 20 }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.primary, marginBottom: 15 }}>앞쪽 블록</div>
            <div style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.8 }}>
              • 선, 엣지 같은 <span style={{ color: COLORS.accent }}>저수준 특징</span> 감지<br/>• 기본적인 패턴 인식
            </div>
          </div>
          <div style={{ flex: 1, maxWidth: 450, padding: 30, background: "rgba(0,0,0,0.3)", borderRadius: 20 }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.pink, marginBottom: 15 }}>뒤쪽 블록</div>
            <div style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.8 }}>
              • 물체, 패턴 같은 <span style={{ color: COLORS.accent }}>고수준 특징</span> 감지<br/>• 복잡한 패턴 인식
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOutro: React.FC = () => {
  const summaryItems = [
    "풀링: 특성 맵 요약, 크기 축소",
    "Max Pooling: 최댓값 선택, CNN 표준",
    "Avg Pooling: 평균 계산, GAP에 사용",
    "Batch Norm: 정규화로 학습 안정화",
    "블록 순서: Conv → BN → ReLU → Pool",
  ];
  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-3/scene9_outro.mp3")} />
      <div style={{ textAlign: "center", padding: 80 }}>
        <h1 style={{ fontSize: 56, color: COLORS.light, marginBottom: 50 }}>📝 오늘의 정리</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          {summaryItems.map((item, i) => (
            <div key={i} style={{ padding: "20px 30px", background: "rgba(255,255,255,0.15)", borderRadius: 15, borderLeft: `5px solid ${COLORS.accent}`, textAlign: "left" }}>
              <span style={{ fontSize: 26, color: COLORS.light }}>✓ {item}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 50, padding: "25px 50px", background: "rgba(0,0,0,0.3)", borderRadius: 20, border: `2px solid ${COLORS.accent}60` }}>
          <span style={{ fontSize: 28, color: COLORS.light }}>
            다음 시간: <span style={{ color: COLORS.accent, fontWeight: 700 }}>CNN 아키텍처 (LeNet, AlexNet, VGG)</span>
          </span>
        </div>
        <div style={{ marginTop: 40, fontSize: 36, color: COLORS.light }}>오늘도 수고하셨습니다! 🎉</div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson5_3Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.what_is_pooling.start} durationInFrames={SCENE_TIMINGS.what_is_pooling.duration}><SceneWhatIsPooling /></Sequence>
    <Sequence from={SCENE_TIMINGS.max_pooling.start} durationInFrames={SCENE_TIMINGS.max_pooling.duration}><SceneMaxPooling /></Sequence>
    <Sequence from={SCENE_TIMINGS.avg_pooling.start} durationInFrames={SCENE_TIMINGS.avg_pooling.duration}><SceneAvgPooling /></Sequence>
    <Sequence from={SCENE_TIMINGS.batch_norm_intro.start} durationInFrames={SCENE_TIMINGS.batch_norm_intro.duration}><SceneBatchNormIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.batch_norm_formula.start} durationInFrames={SCENE_TIMINGS.batch_norm_formula.duration}><SceneBatchNormFormula /></Sequence>
    <Sequence from={SCENE_TIMINGS.batch_norm_effect.start} durationInFrames={SCENE_TIMINGS.batch_norm_effect.duration}><SceneBatchNormEffect /></Sequence>
    <Sequence from={SCENE_TIMINGS.layer_order.start} durationInFrames={SCENE_TIMINGS.layer_order.duration}><SceneLayerOrder /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
