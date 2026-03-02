/**
 * Lesson 1-5: AND, OR, NOT 게이트
 * Scene 6: 퍼셉트론으로 OR 구현
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_OrPerceptron: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 퍼셉트론 다이어그램 애니메이션
  const diagramScale = spring({ frame: frame - 40, fps, config: { damping: 12 } });

  // 계산 예시 1 (0, 0)
  const calc1Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  // 계산 예시 2 (0, 1)
  const calc2Opacity = interpolate(frame, [320, 350], [0, 1], { extrapolateRight: "clamp" });

  // 차이점 하이라이트
  const diffOpacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #064e3b 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-5/scene6_or_perceptron.mp3")} />

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
        퍼셉트론으로 OR 구현
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
              backgroundColor: "#22c55e",
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
              backgroundColor: "#22c55e",
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
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)",
          }}
        >
          <span style={{ fontSize: 20, color: colors.white }}>Σ + b</span>
          <span style={{ fontSize: 18, color: "#fbbf24", fontWeight: "bold" }}>b = -0.2</span>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 36, color: colors.gray[400] }}>→</div>

        {/* 출력 */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "#f59e0b",
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
          <div style={{ fontSize: 24, color: colors.gray[400], fontWeight: "bold", marginBottom: 15 }}>
            입력: (0, 0)
          </div>
          <div style={{ fontSize: 20, color: colors.gray[300], marginBottom: 10 }}>
            z = 0×0.5 + 0×0.5 + (-0.2)
          </div>
          <div style={{ fontSize: 24, color: "#f59e0b", marginBottom: 10 }}>
            z = <span style={{ fontWeight: "bold" }}>-0.2</span>
          </div>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10 }}>
            -0.2 {"<"} 0 이므로
          </div>
          <div style={{ fontSize: 28, color: "#ef4444", fontWeight: "bold" }}>
            출력 = 0 ✓
          </div>
        </div>

        {/* 계산 2: (0, 1) → 1 */}
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
            입력: (0, 1)
          </div>
          <div style={{ fontSize: 20, color: colors.gray[300], marginBottom: 10 }}>
            z = 0×0.5 + 1×0.5 + (-0.2)
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

      {/* AND와의 차이점 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          gap: 30,
          opacity: diffOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#3b82f620",
            border: "2px solid #3b82f6",
            borderRadius: 15,
            padding: "15px 30px",
          }}
        >
          <span style={{ fontSize: 22, color: "#3b82f6" }}>AND: b = -0.7</span>
        </div>
        <div style={{ fontSize: 32, color: colors.gray[400], alignSelf: "center" }}>→</div>
        <div
          style={{
            backgroundColor: "#22c55e30",
            border: "2px solid #22c55e",
            borderRadius: 15,
            padding: "15px 30px",
          }}
        >
          <span style={{ fontSize: 22, color: "#22c55e", fontWeight: "bold" }}>OR: b = -0.2</span>
        </div>
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 15,
            padding: "15px 30px",
          }}
        >
          <span style={{ fontSize: 22, color: colors.white }}>편향만 다름!</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
