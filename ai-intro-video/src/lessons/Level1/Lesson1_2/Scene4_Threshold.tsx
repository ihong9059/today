/**
 * Lesson 1-2 Scene 4: 임계값 개념
 */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

export const Scene4_Threshold: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // 임계값 애니메이션
  const threshold = 5;
  const signal1 = 3;
  const signal2 = 6;

  const example1Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });
  const example2Opacity = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1a365d 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* 제목 */}
      <h2
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        ⚡ 핵심 개념: 임계값 (Threshold)
      </h2>

      {/* 핵심 메시지 */}
      <div
        style={{
          backgroundColor: `${colors.primary[500]}20`,
          border: `2px solid ${colors.primary[400]}`,
          borderRadius: 15,
          padding: "20px 50px",
          marginBottom: 50,
          opacity: interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 28, color: colors.primary[300] }}>
          "충분한 자극이 있어야만 반응한다!"
        </span>
      </div>

      {/* 두 가지 예시 비교 */}
      <div style={{ display: "flex", gap: 80 }}>
        {/* 예시 1: 신호 부족 */}
        <div
          style={{
            backgroundColor: `${colors.gray[800]}80`,
            borderRadius: 20,
            padding: 40,
            width: 450,
            opacity: example1Opacity,
            border: "3px solid #ef4444",
          }}
        >
          <h3 style={{ fontSize: 28, color: "#ef4444", marginBottom: 25, textAlign: "center" }}>
            ❌ 반응 안 함
          </h3>

          {/* 입력 신호 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 18, color: colors.gray[400], marginBottom: 10 }}>입력 신호:</div>
            <div style={{ display: "flex", gap: 10 }}>
              {[1, 1, 1].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    backgroundColor: "#3b82f630",
                    border: "2px solid #3b82f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  1
                </div>
              ))}
            </div>
          </div>

          {/* 계산 */}
          <div style={{ fontSize: 24, color: colors.white, marginBottom: 15 }}>
            합계: <span style={{ color: "#3b82f6", fontWeight: "bold" }}>{signal1}</span>
          </div>
          <div style={{ fontSize: 24, color: colors.white, marginBottom: 15 }}>
            임계값: <span style={{ color: "#f97316", fontWeight: "bold" }}>{threshold}</span>
          </div>
          <div style={{ fontSize: 24, color: "#ef4444", fontWeight: "bold" }}>
            {signal1} &lt; {threshold} → 발화 안 함!
          </div>
        </div>

        {/* 예시 2: 신호 충분 */}
        <div
          style={{
            backgroundColor: `${colors.gray[800]}80`,
            borderRadius: 20,
            padding: 40,
            width: 450,
            opacity: example2Opacity,
            border: "3px solid #22c55e",
          }}
        >
          <h3 style={{ fontSize: 28, color: "#22c55e", marginBottom: 25, textAlign: "center" }}>
            ✓ 발화!
          </h3>

          {/* 입력 신호 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 18, color: colors.gray[400], marginBottom: 10 }}>입력 신호:</div>
            <div style={{ display: "flex", gap: 10 }}>
              {[2, 2, 2].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    backgroundColor: "#22c55e30",
                    border: "2px solid #22c55e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  2
                </div>
              ))}
            </div>
          </div>

          {/* 계산 */}
          <div style={{ fontSize: 24, color: colors.white, marginBottom: 15 }}>
            합계: <span style={{ color: "#22c55e", fontWeight: "bold" }}>{signal2}</span>
          </div>
          <div style={{ fontSize: 24, color: colors.white, marginBottom: 15 }}>
            임계값: <span style={{ color: "#f97316", fontWeight: "bold" }}>{threshold}</span>
          </div>
          <div style={{ fontSize: 24, color: "#22c55e", fontWeight: "bold" }}>
            {signal2} &gt; {threshold} → 발화!
          </div>
        </div>
      </div>

      {/* 비유 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: interpolate(frame, [120, 140], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 50 }}>🔥</span>
        <span style={{ fontSize: 24, color: colors.gray[300] }}>
          불이 붙으려면 충분한 열이 필요한 것처럼, 뉴런도 충분한 신호가 있어야 발화합니다!
        </span>
      </div>
    </AbsoluteFill>
  );
};
