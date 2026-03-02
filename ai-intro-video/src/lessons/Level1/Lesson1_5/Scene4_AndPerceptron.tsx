/**
 * Lesson 1-5: AND, OR, NOT 게이트
 * Scene 4: 퍼셉트론으로 AND 구현
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_AndPerceptron: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 퍼셉트론 다이어그램 애니메이션
  const diagramScale = spring({ frame: frame - 40, fps, config: { damping: 12 } });

  // 계산 예시 1 (0, 0)
  const calc1Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  // 계산 예시 2 (1, 1)
  const calc2Opacity = interpolate(frame, [320, 350], [0, 1], { extrapolateRight: "clamp" });

  // 결과 하이라이트
  const resultOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1a1a2e 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-5/scene4_and_perceptron.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 48,
          color: colors.white,
          fontWeight: "bold",
          opacity: titleOpacity,
          marginBottom: 30,
        }}
      >
        퍼셉트론으로 AND 구현
      </h2>

      {/* 퍼셉트론 다이어그램 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
          marginBottom: 30,
          transform: `scale(${diagramScale})`,
        }}
      >
        {/* 입력 노드들 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            x₁
          </div>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            x₂
          </div>
        </div>

        {/* 가중치 레이블 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 22,
              color: "#f59e0b",
              fontWeight: "bold",
              backgroundColor: colors.gray[800],
              padding: "8px 15px",
              borderRadius: 8,
            }}
          >
            w₁ = 0.5
          </div>
          <div style={{ fontSize: 36, color: colors.gray[500] }}>→</div>
          <div
            style={{
              fontSize: 22,
              color: "#f59e0b",
              fontWeight: "bold",
              backgroundColor: colors.gray[800],
              padding: "8px 15px",
              borderRadius: 8,
            }}
          >
            w₂ = 0.5
          </div>
        </div>

        {/* 뉴런 */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
          }}
        >
          <span style={{ fontSize: 20, color: colors.white }}>Σ + b</span>
          <span style={{ fontSize: 18, color: "#fbbf24", fontWeight: "bold" }}>b = -0.7</span>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 36, color: colors.gray[400] }}>→</div>

        {/* 출력 */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          y
        </div>
      </div>

      {/* 계산 예시 영역 */}
      <div style={{ display: "flex", gap: 40 }}>
        {/* 계산 1: (0, 0) → 0 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 15,
            padding: 25,
            width: 400,
            opacity: calc1Opacity,
          }}
        >
          <div style={{ fontSize: 24, color: "#3b82f6", fontWeight: "bold", marginBottom: 15 }}>
            입력: (0, 0)
          </div>
          <div style={{ fontSize: 20, color: colors.gray[300], marginBottom: 10 }}>
            z = 0×0.5 + 0×0.5 + (-0.7)
          </div>
          <div style={{ fontSize: 24, color: "#f59e0b", marginBottom: 10 }}>
            z = <span style={{ fontWeight: "bold" }}>-0.7</span>
          </div>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10 }}>
            -0.7 {"<"} 0 이므로
          </div>
          <div style={{ fontSize: 28, color: "#ef4444", fontWeight: "bold" }}>
            출력 = 0 ✓
          </div>
        </div>

        {/* 계산 2: (1, 1) → 1 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 15,
            padding: 25,
            width: 400,
            opacity: calc2Opacity,
          }}
        >
          <div style={{ fontSize: 24, color: "#22c55e", fontWeight: "bold", marginBottom: 15 }}>
            입력: (1, 1)
          </div>
          <div style={{ fontSize: 20, color: colors.gray[300], marginBottom: 10 }}>
            z = 1×0.5 + 1×0.5 + (-0.7)
          </div>
          <div style={{ fontSize: 24, color: "#f59e0b", marginBottom: 10 }}>
            z = <span style={{ fontWeight: "bold" }}>0.3</span>
          </div>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10 }}>
            0.3 {">"} 0 이므로
          </div>
          <div style={{ fontSize: 28, color: "#22c55e", fontWeight: "bold" }}>
            출력 = 1 ✓
          </div>
        </div>
      </div>

      {/* 결과 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          backgroundColor: "#22c55e30",
          border: "2px solid #22c55e",
          borderRadius: 15,
          padding: "20px 40px",
          opacity: resultOpacity,
        }}
      >
        <span style={{ fontSize: 28, color: "#22c55e", fontWeight: "bold" }}>
          모든 경우에서 AND 게이트와 동일한 결과!
        </span>
      </div>
    </AbsoluteFill>
  );
};
