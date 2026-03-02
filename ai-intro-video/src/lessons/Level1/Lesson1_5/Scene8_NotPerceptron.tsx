/**
 * Lesson 1-5: AND, OR, NOT 게이트
 * Scene 8: 퍼셉트론으로 NOT 구현
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene8_NotPerceptron: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 퍼셉트론 다이어그램 애니메이션
  const diagramScale = spring({ frame: frame - 40, fps, config: { damping: 12 } });

  // 핵심 포인트 애니메이션
  const keyPointOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });

  // 계산 예시 1 (0)
  const calc1Opacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });

  // 계산 예시 2 (1)
  const calc2Opacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });

  // 결론 애니메이션
  const conclusionOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #7f1d1d 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-5/scene8_not_perceptron.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 48,
          color: colors.white,
          fontWeight: "bold",
          opacity: titleOpacity,
          marginBottom: 25,
        }}
      >
        퍼셉트론으로 NOT 구현
      </h2>

      {/* 퍼셉트론 다이어그램 (단일 입력) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          marginBottom: 25,
          transform: `scale(${diagramScale})`,
        }}
      >
        {/* 입력 노드 (하나만) */}
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          x
        </div>

        {/* 가중치 레이블 */}
        <div
          style={{
            fontSize: 26,
            color: "#f59e0b",
            fontWeight: "bold",
            backgroundColor: colors.gray[800],
            padding: "12px 20px",
            borderRadius: 10,
            border: "2px solid #f59e0b",
          }}
        >
          w = -1
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 40, color: colors.gray[400] }}>→</div>

        {/* 뉴런 */}
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)",
          }}
        >
          <span style={{ fontSize: 22, color: colors.white }}>Σ + b</span>
          <span style={{ fontSize: 20, color: "#fbbf24", fontWeight: "bold" }}>b = 0.5</span>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 40, color: colors.gray[400] }}>→</div>

        {/* 출력 */}
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            backgroundColor: "#f59e0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          y
        </div>
      </div>

      {/* 핵심 포인트: 음수 가중치 */}
      <div
        style={{
          backgroundColor: "#ef444440",
          border: "2px solid #ef4444",
          borderRadius: 15,
          padding: "15px 40px",
          marginBottom: 30,
          opacity: keyPointOpacity,
        }}
      >
        <span style={{ fontSize: 26, color: colors.white }}>
          핵심: <span style={{ color: "#fbbf24", fontWeight: "bold" }}>음수 가중치(-1)</span>가 입력을 뒤집음!
        </span>
      </div>

      {/* 계산 예시 영역 */}
      <div style={{ display: "flex", gap: 50 }}>
        {/* 계산 1: 0 → 1 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 15,
            padding: 25,
            width: 380,
            opacity: calc1Opacity,
          }}
        >
          <div style={{ fontSize: 26, color: colors.gray[400], fontWeight: "bold", marginBottom: 15 }}>
            입력: 0
          </div>
          <div style={{ fontSize: 22, color: colors.gray[300], marginBottom: 10 }}>
            z = 0 × (-1) + 0.5
          </div>
          <div style={{ fontSize: 26, color: "#f59e0b", marginBottom: 10 }}>
            z = <span style={{ fontWeight: "bold" }}>0.5</span>
          </div>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10 }}>
            0.5 {">"} 0 이므로
          </div>
          <div style={{ fontSize: 30, color: "#22c55e", fontWeight: "bold" }}>
            출력 = 1 ✓
          </div>
          <div style={{ fontSize: 20, color: "#fca5a5", marginTop: 10 }}>
            0 → 1로 반전!
          </div>
        </div>

        {/* 계산 2: 1 → 0 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 15,
            padding: 25,
            width: 380,
            opacity: calc2Opacity,
          }}
        >
          <div style={{ fontSize: 26, color: "#22c55e", fontWeight: "bold", marginBottom: 15 }}>
            입력: 1
          </div>
          <div style={{ fontSize: 22, color: colors.gray[300], marginBottom: 10 }}>
            z = 1 × (-1) + 0.5
          </div>
          <div style={{ fontSize: 26, color: "#f59e0b", marginBottom: 10 }}>
            z = <span style={{ fontWeight: "bold" }}>-0.5</span>
          </div>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10 }}>
            -0.5 {"<"} 0 이므로
          </div>
          <div style={{ fontSize: 30, color: "#ef4444", fontWeight: "bold" }}>
            출력 = 0 ✓
          </div>
          <div style={{ fontSize: 20, color: "#fca5a5", marginTop: 10 }}>
            1 → 0으로 반전!
          </div>
        </div>
      </div>

      {/* 결론 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          backgroundColor: colors.gray[800] + "dd",
          borderRadius: 15,
          padding: "18px 45px",
          opacity: conclusionOpacity,
        }}
      >
        <span style={{ fontSize: 26, color: colors.primary[300] }}>
          음수 가중치로 입력값을 뒤집는 것이 NOT의 핵심!
        </span>
      </div>
    </AbsoluteFill>
  );
};
