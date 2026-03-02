/**
 * Scene 5: 편향 (Bias) 설명
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene5_Bias: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const diagramReveal = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });
  const example1Reveal = interpolate(frame, [180, 220], [0, 1], { extrapolateRight: "clamp" });
  const example2Reveal = interpolate(frame, [350, 390], [0, 1], { extrapolateRight: "clamp" });

  // 임계값 시각화
  const thresholdPosition1 = spring({ frame: frame > 180 ? frame - 180 : 0, fps, from: 50, to: 80 });
  const thresholdPosition2 = spring({ frame: frame > 350 ? frame - 350 : 0, fps, from: 50, to: 30 });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* 타이틀 */}
      <div
        style={{
          opacity: titleOpacity,
          marginBottom: 30,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 70 }}>➕</span>
        <div>
          <h2
            style={{
              fontSize: 64,
              color: "#8b5cf6",
              fontWeight: "bold",
            }}
          >
            구성요소 3: 편향 (Bias)
          </h2>
          <p
            style={{
              fontSize: 30,
              color: colors.gray[400],
            }}
          >
            퍼셉트론의 기본 성향 · 활성화 기준점 조절
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 60, marginTop: 20 }}>
        {/* 편향 = -5 예시 */}
        <div
          style={{
            opacity: example1Reveal,
            backgroundColor: "#3b82f615",
            border: "2px solid #3b82f6",
            borderRadius: 20,
            padding: 30,
            width: 480,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 20 }}>
            <span style={{ fontSize: 50 }}>🛡️</span>
            <div>
              <h3 style={{ fontSize: 32, color: "#3b82f6", fontWeight: "bold" }}>
                편향 = -5 (보수적)
              </h3>
              <p style={{ fontSize: 22, color: colors.gray[400] }}>기본적으로 정상 메일로 판정</p>
            </div>
          </div>

          {/* 시각적 게이지 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              padding: 20,
              marginTop: 20,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: colors.gray[400], fontSize: 20 }}>정상</span>
              <span style={{ color: colors.gray[400], fontSize: 20 }}>스팸</span>
            </div>
            <div
              style={{
                height: 30,
                backgroundColor: colors.gray[700],
                borderRadius: 15,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${thresholdPosition1}%`,
                  top: -10,
                  transform: "translateX(-50%)",
                }}
              >
                <div style={{ fontSize: 30 }}>⬇️</div>
                <div
                  style={{
                    fontSize: 18,
                    color: "#3b82f6",
                    fontWeight: "bold",
                    marginTop: 5,
                  }}
                >
                  임계점
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: 22,
                color: colors.gray[300],
                marginTop: 20,
                textAlign: "center",
              }}
            >
              스팸 특징이 충분히 많아야만 스팸으로 판정!
            </p>
          </div>
        </div>

        {/* 편향 = +2 예시 */}
        <div
          style={{
            opacity: example2Reveal,
            backgroundColor: "#ef444415",
            border: "2px solid #ef4444",
            borderRadius: 20,
            padding: 30,
            width: 480,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 20 }}>
            <span style={{ fontSize: 50 }}>⚠️</span>
            <div>
              <h3 style={{ fontSize: 32, color: "#ef4444", fontWeight: "bold" }}>
                편향 = +2 (민감)
              </h3>
              <p style={{ fontSize: 22, color: colors.gray[400] }}>조금만 의심스러워도 스팸!</p>
            </div>
          </div>

          {/* 시각적 게이지 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              padding: 20,
              marginTop: 20,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: colors.gray[400], fontSize: 20 }}>정상</span>
              <span style={{ color: colors.gray[400], fontSize: 20 }}>스팸</span>
            </div>
            <div
              style={{
                height: 30,
                backgroundColor: colors.gray[700],
                borderRadius: 15,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${thresholdPosition2}%`,
                  top: -10,
                  transform: "translateX(-50%)",
                }}
              >
                <div style={{ fontSize: 30 }}>⬇️</div>
                <div
                  style={{
                    fontSize: 18,
                    color: "#ef4444",
                    fontWeight: "bold",
                    marginTop: 5,
                  }}
                >
                  임계점
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: 22,
                color: colors.gray[300],
                marginTop: 20,
                textAlign: "center",
              }}
            >
              조금만 의심스러워도 바로 스팸 처리!
            </p>
          </div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      {frame > 480 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            backgroundColor: "#8b5cf620",
            border: "2px solid #8b5cf6",
            borderRadius: 15,
            padding: "20px 50px",
            opacity: interpolate(frame, [480, 520], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <span style={{ fontSize: 30, color: "#8b5cf6", fontWeight: "bold" }}>
            💡 편향으로 퍼셉트론이 얼마나 쉽게 활성화되는지 조절!
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
