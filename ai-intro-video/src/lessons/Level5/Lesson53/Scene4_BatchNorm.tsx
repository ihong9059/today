/**
 * Scene 4: Batch Normalization 원리
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_BatchNorm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 단계별 애니메이션
  const step1Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });
  const step2Opacity = interpolate(frame, [210, 240], [0, 1], { extrapolateRight: "clamp" });
  const step3Opacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c3aed 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-3/scene4.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 15,
          opacity: titleOpacity,
        }}
      >
        📊 Batch Normalization
      </h1>

      <p
        style={{
          fontSize: 24,
          color: "#c4b5fd",
          marginBottom: 40,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        각 미니배치에서 정규화 → 학습 안정화
      </p>

      {/* 3단계 과정 */}
      <div style={{ display: "flex", gap: 30, alignItems: "stretch" }}>
        {/* Step 1: 평균/분산 계산 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 25,
            borderRadius: 16,
            border: "3px solid #3b82f6",
            width: 300,
            opacity: step1Opacity,
          }}
        >
          <div style={{ fontSize: 20, color: "#93c5fd", fontWeight: "bold", marginBottom: 15 }}>
            Step 1: 평균/분산 계산
          </div>
          <div style={{ fontSize: 18, color: colors.white, lineHeight: 1.8 }}>
            <div>μ = (1/m) × Σxᵢ</div>
            <div style={{ color: colors.gray[400], fontSize: 14 }}>배치 평균</div>
            <div style={{ marginTop: 10 }}>σ² = (1/m) × Σ(xᵢ-μ)²</div>
            <div style={{ color: colors.gray[400], fontSize: 14 }}>배치 분산</div>
          </div>
        </div>

        {/* 화살표 */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, color: colors.white, opacity: step2Opacity }}>→</div>

        {/* Step 2: 정규화 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 25,
            borderRadius: 16,
            border: "3px solid #22c55e",
            width: 300,
            opacity: step2Opacity,
          }}
        >
          <div style={{ fontSize: 20, color: "#86efac", fontWeight: "bold", marginBottom: 15 }}>
            Step 2: 정규화
          </div>
          <div style={{ fontSize: 22, color: colors.white, textAlign: "center", marginTop: 20 }}>
            <div style={{ fontFamily: "monospace" }}>x̂ = (x - μ) / √(σ² + ε)</div>
          </div>
          <div style={{ fontSize: 14, color: colors.gray[400], marginTop: 15, textAlign: "center" }}>
            평균 0, 분산 1로 정규화
          </div>
        </div>

        {/* 화살표 */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, color: colors.white, opacity: step3Opacity }}>→</div>

        {/* Step 3: 스케일/시프트 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 25,
            borderRadius: 16,
            border: "3px solid #f59e0b",
            width: 300,
            opacity: step3Opacity,
          }}
        >
          <div style={{ fontSize: 20, color: "#fbbf24", fontWeight: "bold", marginBottom: 15 }}>
            Step 3: 스케일 & 시프트
          </div>
          <div style={{ fontSize: 26, color: colors.white, textAlign: "center", marginTop: 20 }}>
            <div style={{ fontFamily: "monospace" }}>y = γx̂ + β</div>
          </div>
          <div style={{ fontSize: 14, color: colors.gray[400], marginTop: 15, textAlign: "center" }}>
            γ, β는 학습되는 파라미터
          </div>
        </div>
      </div>

      {/* 왜 γ, β가 필요한가? */}
      <div
        style={{
          marginTop: 40,
          backgroundColor: colors.gray[800],
          padding: 20,
          borderRadius: 12,
          border: "2px solid #a78bfa",
          opacity: interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ fontSize: 18, color: colors.white, textAlign: "center" }}>
          💡 <span style={{ color: "#a78bfa" }}>왜 γ, β가 필요할까?</span> → 정규화만 하면 표현력이 제한됨!
          <br />
          네트워크가 필요한 분포를 스스로 학습할 수 있게 해줌
        </div>
      </div>
    </AbsoluteFill>
  );
};
