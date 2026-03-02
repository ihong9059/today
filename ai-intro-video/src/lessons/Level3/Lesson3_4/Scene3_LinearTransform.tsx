/**
 * Scene 3: 선형 변환
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_LinearTransform: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 수식
  const formulaOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 행렬 연산 시각화
  const matrixOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });

  // 예시
  const exampleOpacity = interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" });

  // 결과
  const resultOpacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-4/scene3.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        선형 변환 (Linear Transformation)
      </h1>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 기본 수식 */}
        <div style={{ flex: 1 }}>
          {/* 핵심 공식 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              marginBottom: 20,
              opacity: formulaOpacity,
            }}
          >
            <h3 style={{ color: "#60a5fa", fontSize: 24, marginBottom: 15 }}>기본 연산</h3>
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 20,
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div style={{ color: colors.white, fontSize: 42, fontFamily: "serif" }}>
                z = Wx + b
              </div>
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 15 }}>
              <div style={{ color: "#60a5fa", fontSize: 18 }}>W: 가중치 행렬</div>
              <div style={{ color: "#22c55e", fontSize: 18 }}>x: 입력 벡터</div>
              <div style={{ color: "#fbbf24", fontSize: 18 }}>b: 편향 벡터</div>
            </div>
          </div>

          {/* 행렬 연산 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              opacity: matrixOpacity,
            }}
          >
            <h3 style={{ color: "#fbbf24", fontSize: 22, marginBottom: 15 }}>행렬곱 연산</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
              {/* W 행렬 */}
              <div
                style={{
                  backgroundColor: "#60a5fa30",
                  border: "2px solid #60a5fa",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <div style={{ color: colors.white, fontSize: 16 }}>W (2×3)</div>
              </div>
              <span style={{ color: colors.white, fontSize: 24 }}>×</span>
              {/* x 벡터 */}
              <div
                style={{
                  backgroundColor: "#22c55e30",
                  border: "2px solid #22c55e",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <div style={{ color: colors.white, fontSize: 16 }}>x (3×1)</div>
              </div>
              <span style={{ color: colors.white, fontSize: 24 }}>+</span>
              {/* b 벡터 */}
              <div
                style={{
                  backgroundColor: "#fbbf2430",
                  border: "2px solid #fbbf24",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <div style={{ color: colors.white, fontSize: 16 }}>b (2×1)</div>
              </div>
              <span style={{ color: colors.white, fontSize: 24 }}>=</span>
              {/* z 결과 */}
              <div
                style={{
                  backgroundColor: "#a855f730",
                  border: "2px solid #a855f7",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <div style={{ color: colors.white, fontSize: 16 }}>z (2×1)</div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 예시 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              opacity: exampleOpacity,
            }}
          >
            <h3 style={{ color: "#22c55e", fontSize: 22, marginBottom: 15 }}>구체적인 예시</h3>

            {/* 입력 3개, 출력 2개 */}
            <div style={{ marginBottom: 15 }}>
              <div style={{ color: colors.gray[400], fontSize: 16, marginBottom: 10 }}>
                입력 3개 → 출력 2개
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* W */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#60a5fa", fontSize: 14 }}>W</div>
                  <div
                    style={{
                      backgroundColor: colors.gray[900],
                      padding: 8,
                      borderRadius: 6,
                      fontFamily: "monospace",
                      color: colors.white,
                      fontSize: 14,
                    }}
                  >
                    [0.1 0.2 0.3]<br />
                    [0.4 0.5 0.6]
                  </div>
                </div>

                <span style={{ color: colors.white }}>×</span>

                {/* x */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#22c55e", fontSize: 14 }}>x</div>
                  <div
                    style={{
                      backgroundColor: colors.gray[900],
                      padding: 8,
                      borderRadius: 6,
                      fontFamily: "monospace",
                      color: colors.white,
                      fontSize: 14,
                    }}
                  >
                    [1]<br />
                    [2]<br />
                    [3]
                  </div>
                </div>

                <span style={{ color: colors.white }}>+</span>

                {/* b */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#fbbf24", fontSize: 14 }}>b</div>
                  <div
                    style={{
                      backgroundColor: colors.gray[900],
                      padding: 8,
                      borderRadius: 6,
                      fontFamily: "monospace",
                      color: colors.white,
                      fontSize: 14,
                    }}
                  >
                    [0.1]<br />
                    [0.2]
                  </div>
                </div>
              </div>
            </div>

            {/* 결과 */}
            <div
              style={{
                backgroundColor: "#a855f720",
                border: "2px solid #a855f7",
                padding: 15,
                borderRadius: 10,
                opacity: resultOpacity,
              }}
            >
              <div style={{ color: "#a855f7", fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
                결과 z
              </div>
              <div style={{ color: colors.white, fontSize: 16, fontFamily: "monospace" }}>
                z = [0.1×1 + 0.2×2 + 0.3×3 + 0.1, ...]<br />
                z = [1.5, 3.4]
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
