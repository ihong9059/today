/**
 * Scene 8: 실제 예제 - 스팸 분류기
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene8_Example: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const setupReveal = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });
  const mail1Reveal = interpolate(frame, [240, 280], [0, 1], { extrapolateRight: "clamp" });
  const mail2Reveal = interpolate(frame, [450, 490], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 50,
      }}
    >
      {/* 타이틀 */}
      <div
        style={{
          opacity: titleOpacity,
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <span style={{ fontSize: 50 }}>📧</span>
        <h2
          style={{
            fontSize: 52,
            color: colors.white,
            fontWeight: "bold",
          }}
        >
          실제 예제: 스팸 분류 퍼셉트론
        </h2>
      </div>

      <div style={{ display: "flex", gap: 40, width: "100%", justifyContent: "center" }}>
        {/* 설정 정보 */}
        <div
          style={{
            opacity: setupReveal,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 25,
            width: 380,
          }}
        >
          <h3
            style={{
              fontSize: 28,
              color: colors.primary[400],
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            ⚙️ 퍼셉트론 설정
          </h3>

          <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: 22, color: colors.gray[300], marginBottom: 10 }}>입력:</h4>
            <div style={{ fontSize: 20, color: colors.gray[400], paddingLeft: 15 }}>
              x₁ = "무료" 포함? (0/1)
              <br />
              x₂ = "당첨" 포함? (0/1)
              <br />
              x₃ = 느낌표 5개 이상? (0/1)
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: 22, color: "#f97316", marginBottom: 10 }}>가중치:</h4>
            <div style={{ fontSize: 20, color: colors.gray[400], paddingLeft: 15 }}>
              w₁ = 2.0, w₂ = 1.8, w₃ = 1.2
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: 22, color: "#8b5cf6", marginBottom: 10 }}>편향:</h4>
            <div style={{ fontSize: 20, color: colors.gray[400], paddingLeft: 15 }}>
              b = -2.5 (기본: 정상 메일)
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 22, color: "#22c55e", marginBottom: 10 }}>활성화:</h4>
            <div style={{ fontSize: 20, color: colors.gray[400], paddingLeft: 15 }}>
              계단 함수 (z &gt; 0 → 스팸)
            </div>
          </div>
        </div>

        {/* 메일 예제들 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          {/* 메일 1: 스팸 */}
          <div
            style={{
              opacity: mail1Reveal,
              backgroundColor: "#ef444415",
              border: "2px solid #ef4444",
              borderRadius: 20,
              padding: 25,
              width: 600,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
              <span style={{ fontSize: 40 }}>📬</span>
              <div>
                <h3 style={{ fontSize: 26, color: "#ef4444", fontWeight: "bold" }}>
                  메일 1: "무료 쿠폰 당첨!!!!!!"
                </h3>
                <span style={{ fontSize: 20, color: colors.gray[400] }}>
                  x₁=1, x₂=1, x₃=1
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: colors.gray[900],
                borderRadius: 10,
                padding: 20,
                fontFamily: "monospace",
                fontSize: 22,
                color: colors.gray[300],
              }}
            >
              <div>z = 2.0×1 + 1.8×1 + 1.2×1 + (-2.5)</div>
              <div style={{ marginTop: 8 }}>z = 2.0 + 1.8 + 1.2 - 2.5</div>
              <div style={{ marginTop: 8, color: "#ef4444", fontWeight: "bold" }}>
                z = 2.5 &gt; 0 → y = 1
              </div>
            </div>

            <div
              style={{
                marginTop: 15,
                display: "flex",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 30 }}>🚫</span>
              <span style={{ fontSize: 28, color: "#ef4444", fontWeight: "bold" }}>스팸!</span>
            </div>
          </div>

          {/* 메일 2: 정상 */}
          <div
            style={{
              opacity: mail2Reveal,
              backgroundColor: "#22c55e15",
              border: "2px solid #22c55e",
              borderRadius: 20,
              padding: 25,
              width: 600,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
              <span style={{ fontSize: 40 }}>📬</span>
              <div>
                <h3 style={{ fontSize: 26, color: "#22c55e", fontWeight: "bold" }}>
                  메일 2: "회의 일정 공유드립니다"
                </h3>
                <span style={{ fontSize: 20, color: colors.gray[400] }}>
                  x₁=0, x₂=0, x₃=0
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: colors.gray[900],
                borderRadius: 10,
                padding: 20,
                fontFamily: "monospace",
                fontSize: 22,
                color: colors.gray[300],
              }}
            >
              <div>z = 2.0×0 + 1.8×0 + 1.2×0 + (-2.5)</div>
              <div style={{ marginTop: 8 }}>z = 0 + 0 + 0 - 2.5</div>
              <div style={{ marginTop: 8, color: "#22c55e", fontWeight: "bold" }}>
                z = -2.5 ≤ 0 → y = 0
              </div>
            </div>

            <div
              style={{
                marginTop: 15,
                display: "flex",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 30 }}>✉️</span>
              <span style={{ fontSize: 28, color: "#22c55e", fontWeight: "bold" }}>정상 메일!</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
