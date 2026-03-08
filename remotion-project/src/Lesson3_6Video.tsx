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

export const LESSON_3_6_DURATION = 8314;

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
// intro: 776, batchnorm: 1439, batchnorm_how: 1642, dropout: 1552, pytorch: 1631, outro: 1274
const SCENE_TIMINGS = {
  intro: { start: 0, duration: 776 },
  batchnorm: { start: 776, duration: 1439 },
  batchnorm_how: { start: 2215, duration: 1642 },
  dropout: { start: 3857, duration: 1552 },
  pytorch: { start: 5409, duration: 1631 },
  outro: { start: 7040, duration: 1274 },
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
        <div style={{ fontSize: 150, marginBottom: 30, transform: `scale(${iconScale})` }}>🧹</div>
        <h1 style={{ fontSize: 70, color: colors.white, marginBottom: 20, opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * 30}px)` }}>
          배치 정규화 & 드롭아웃
        </h1>
        <p style={{ fontSize: 36, color: colors.gray[200], opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }) }}>
          BatchNorm & Dropout
        </p>
      </div>
      <Audio src={staticFile("audio/lesson-3-6/intro.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 2: BatchNorm intro
const BatchNormScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const normalizeProgress = interpolate(frame, [60, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Visualize data distribution before and after
  const beforeData = [0.1, 0.8, 0.3, 1.5, -0.2, 2.1, 0.5, 1.2];
  const afterData = beforeData.map(v => (v - 0.7875) / 0.73); // Roughly normalized

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white, marginBottom: 10 }}>배치 정규화</h2>
        <p style={{ fontSize: 28, color: colors.primary }}>Batch Normalization</p>
      </div>

      {/* Before/After visualization */}
      <div style={{ position: "absolute", top: 250, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 100 }}>
        {/* Before */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 24, color: colors.gray[200], marginBottom: 20 }}>정규화 전</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 15, height: 200 }}>
            {beforeData.map((v, i) => (
              <div key={i} style={{ width: 30, height: Math.max(20, (v + 0.5) * 60), background: colors.danger, borderRadius: 5, opacity: 1 - normalizeProgress * 0.5 }} />
            ))}
          </div>
          <p style={{ fontSize: 18, color: colors.gray[200], marginTop: 15 }}>평균: 0.79, 분산: 0.53</p>
        </div>

        {/* Arrow */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 60, color: colors.accent, opacity: normalizeProgress }}>→</div>

        {/* After */}
        <div style={{ textAlign: "center", opacity: normalizeProgress }}>
          <p style={{ fontSize: 24, color: colors.gray[200], marginBottom: 20 }}>정규화 후</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 15, height: 200, justifyContent: "center" }}>
            {afterData.map((v, i) => (
              <div key={i} style={{ width: 30, height: Math.max(20, (v + 2) * 40), background: colors.success, borderRadius: 5 }} />
            ))}
          </div>
          <p style={{ fontSize: 18, color: colors.gray[200], marginTop: 15 }}>평균: 0, 분산: 1</p>
        </div>
      </div>

      {/* Benefits */}
      <div style={{ position: "absolute", bottom: 120, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 30 }}>
        {["빠른 학습", "안정적 수렴", "높은 학습률"].map((benefit, i) => {
          const opacity = interpolate(frame, [200 + i * 30, 230 + i * 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "15px 30px", background: "rgba(16, 185, 129, 0.2)", borderRadius: 25, border: `2px solid ${colors.success}`, opacity }}>
              <span style={{ fontSize: 22, color: colors.success }}>✓ {benefit}</span>
            </div>
          );
        })}
      </div>

      <Audio src={staticFile("audio/lesson-3-6/batchnorm.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 3: BatchNorm How
const BatchNormHowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const step1 = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const step2 = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const step3 = interpolate(frame, [170, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>BatchNorm 동작 원리</h2>
      </div>

      {/* Steps */}
      <div style={{ position: "absolute", top: 230, left: "50%", transform: "translateX(-50%)", width: 1000 }}>
        {/* Step 1 */}
        <div style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 40, opacity: step1 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: colors.info, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: colors.white, fontWeight: "bold" }}>1</div>
          <div style={{ flex: 1, padding: "20px 30px", background: "rgba(59, 130, 246, 0.15)", borderRadius: 15, border: `2px solid ${colors.info}` }}>
            <p style={{ fontSize: 24, color: colors.white }}>미니배치의 <strong style={{ color: colors.info }}>평균(μ)</strong>과 <strong style={{ color: colors.info }}>분산(σ²)</strong> 계산</p>
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 40, opacity: step2 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: colors.success, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: colors.white, fontWeight: "bold" }}>2</div>
          <div style={{ flex: 1, padding: "20px 30px", background: "rgba(16, 185, 129, 0.15)", borderRadius: 15, border: `2px solid ${colors.success}` }}>
            <p style={{ fontSize: 24, color: colors.white }}>정규화: <strong style={{ color: colors.success }}>x̂ = (x - μ) / √(σ² + ε)</strong></p>
          </div>
        </div>

        {/* Step 3 */}
        <div style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 40, opacity: step3 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: colors.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: colors.white, fontWeight: "bold" }}>3</div>
          <div style={{ flex: 1, padding: "20px 30px", background: "rgba(245, 158, 11, 0.15)", borderRadius: 15, border: `2px solid ${colors.accent}` }}>
            <p style={{ fontSize: 24, color: colors.white }}>스케일 & 시프트: <strong style={{ color: colors.accent }}>y = γx̂ + β</strong> (학습 파라미터)</p>
          </div>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-3-6/batchnorm_how.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 4: Dropout
const DropoutScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dropoutProgress = interpolate(frame, [60, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Network nodes (some will be dropped)
  const layers = [
    [0, 1, 2, 3],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2],
  ];
  const droppedNodes = [[1], [0, 3], [1, 4], []]; // Nodes to drop

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white, marginBottom: 10 }}>드롭아웃</h2>
        <p style={{ fontSize: 28, color: colors.primary }}>Dropout</p>
      </div>

      {/* Neural network visualization */}
      <svg width="1000" height="500" style={{ position: "absolute", top: 220, left: "50%", transform: "translateX(-50%)" }}>
        {layers.map((layer, layerIdx) =>
          layer.map((nodeIdx) => {
            const isDropped = droppedNodes[layerIdx].includes(nodeIdx);
            const x = 150 + layerIdx * 250;
            const y = 100 + nodeIdx * 80 + (5 - layer.length) * 40;
            const opacity = isDropped ? 1 - dropoutProgress : 1;
            return (
              <g key={`${layerIdx}-${nodeIdx}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={25}
                  fill={isDropped && dropoutProgress > 0.5 ? colors.danger : colors.info}
                  opacity={opacity}
                />
                {isDropped && dropoutProgress > 0.5 && (
                  <text x={x} y={y + 6} textAnchor="middle" fill={colors.white} fontSize="20">✕</text>
                )}
              </g>
            );
          })
        )}

        {/* Connection lines (simplified) */}
        {dropoutProgress < 0.5 && (
          <g opacity={0.3}>
            {[0, 1, 2, 3].map(i =>
              [0, 1, 2, 3, 4].map(j => (
                <line key={`line-0-${i}-${j}`} x1={175} y1={100 + i * 80 + 40} x2={375} y2={100 + j * 80} stroke={colors.gray[200]} strokeWidth="1" />
              ))
            )}
          </g>
        )}
      </svg>

      {/* Explanation */}
      <div style={{ position: "absolute", bottom: 150, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 40 }}>
        <div style={{ padding: "20px 35px", background: "rgba(239, 68, 68, 0.2)", borderRadius: 15, border: `2px solid ${colors.danger}`, opacity: dropoutProgress }}>
          <span style={{ fontSize: 24, color: colors.danger }}>🎲 무작위 비활성화</span>
        </div>
        <div style={{ padding: "20px 35px", background: "rgba(16, 185, 129, 0.2)", borderRadius: 15, border: `2px solid ${colors.success}`, opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <span style={{ fontSize: 24, color: colors.success }}>🤝 앙상블 효과 → 과적합 방지</span>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-3-6/dropout.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 5: PyTorch
const PyTorchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const codeOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tipOpacity = interpolate(frame, [200, 230], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const codeLines = [
    "import torch.nn as nn",
    "",
    "class MyModel(nn.Module):",
    "    def __init__(self):",
    "        super().__init__()",
    "        self.conv1 = nn.Conv2d(3, 64, 3)",
    "        self.bn1 = nn.BatchNorm2d(64)  # BatchNorm",
    "        self.dropout = nn.Dropout(0.5)  # Dropout",
    "        self.fc = nn.Linear(64, 10)",
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>PyTorch 코드</h2>
      </div>

      {/* Code block */}
      <div style={{ position: "absolute", top: 200, left: "50%", transform: "translateX(-50%)", background: "#1a1a2e", borderRadius: 15, padding: "30px 40px", fontFamily: "monospace", opacity: codeOpacity, border: `2px solid ${colors.primary}` }}>
        {codeLines.map((line, i) => {
          const lineOpacity = interpolate(frame, [40 + i * 8, 50 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const isBatchNorm = line.includes("BatchNorm");
          const isDropout = line.includes("Dropout");
          return (
            <div key={i} style={{ fontSize: 22, color: isBatchNorm ? colors.success : isDropout ? colors.accent : colors.white, opacity: lineOpacity, lineHeight: 1.6, background: isBatchNorm || isDropout ? "rgba(255,255,255,0.1)" : "transparent", padding: isBatchNorm || isDropout ? "2px 8px" : "0", borderRadius: 5 }}>
              {line || " "}
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div style={{ position: "absolute", bottom: 120, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 30, opacity: tipOpacity }}>
        <div style={{ padding: "15px 30px", background: "rgba(245, 158, 11, 0.2)", borderRadius: 15, border: `2px solid ${colors.accent}` }}>
          <span style={{ fontSize: 22, color: colors.accent }}>💡 Dropout: 0.2 ~ 0.5</span>
        </div>
        <div style={{ padding: "15px 30px", background: "rgba(239, 68, 68, 0.2)", borderRadius: 15, border: `2px solid ${colors.danger}` }}>
          <span style={{ fontSize: 22, color: colors.danger }}>⚠️ 테스트 시 model.eval()</span>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-3-6/pytorch.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 6: Outro
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { icon: "📊", title: "BatchNorm", desc: "학습 안정화", color: colors.info },
    { icon: "🎲", title: "Dropout", desc: "과적합 방지", color: colors.accent },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)` }}>
      <GlobalOverlay />
      <h2 style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", fontSize: 50, color: colors.white }}>
        📚 오늘 배운 내용
      </h2>

      <div style={{ position: "absolute", top: 250, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 60 }}>
        {items.map((item, i) => {
          const itemOpacity = interpolate(frame, [20 + i * 40, 50 + i * 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "50px 60px", background: "rgba(255,255,255,0.1)", borderRadius: 25, border: `3px solid ${item.color}`, textAlign: "center", opacity: itemOpacity, transform: `scale(${itemOpacity})` }}>
              <div style={{ fontSize: 80, marginBottom: 20 }}>{item.icon}</div>
              <h3 style={{ fontSize: 36, color: item.color, marginBottom: 15 }}>{item.title}</h3>
              <p style={{ fontSize: 26, color: colors.gray[200] }}>{item.desc}</p>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 150, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <p style={{ fontSize: 36, color: colors.success, fontWeight: "bold", opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          💡 현대 딥러닝의 필수 기법!
        </p>
      </div>

      <Audio src={staticFile("audio/lesson-3-6/outro.mp3")} />
    </AbsoluteFill>
  );
};

export const Lesson3_6Video: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <IntroScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.batchnorm.start} durationInFrames={SCENE_TIMINGS.batchnorm.duration}>
        <BatchNormScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.batchnorm_how.start} durationInFrames={SCENE_TIMINGS.batchnorm_how.duration}>
        <BatchNormHowScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.dropout.start} durationInFrames={SCENE_TIMINGS.dropout.duration}>
        <DropoutScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.pytorch.start} durationInFrames={SCENE_TIMINGS.pytorch.duration}>
        <PyTorchScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export default Lesson3_6Video;
