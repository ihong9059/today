/**
 * Scene 6: Softmax 함수
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Softmax: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const formulaOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const exampleOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const resultOpacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });
  const usageOpacity = interpolate(frame, [480, 510], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-7/scene6.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: "#60a5fa",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        Softmax 함수
      </h1>

      <div style={{ display: "flex", gap: 35 }}>
        {/* 왼쪽: 공식과 예시 */}
        <div style={{ flex: 1 }}>
          {/* 공식 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              marginBottom: 20,
              opacity: formulaOpacity,
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 20, marginBottom: 10 }}>공식</div>
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 20,
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              <span style={{ color: colors.white, fontSize: 30, fontFamily: "serif" }}>
                softmax(xᵢ) = eˣⁱ / Σeˣʲ
              </span>
            </div>
          </div>

          {/* 예시 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 16,
              opacity: exampleOpacity,
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 18, marginBottom: 15 }}>
              예시: 3개 클래스 분류
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {/* 입력 */}
              <div>
                <div style={{ color: colors.gray[500], fontSize: 14, marginBottom: 5 }}>입력</div>
                <div style={{ backgroundColor: colors.gray[900], padding: 15, borderRadius: 10 }}>
                  <div style={{ color: colors.white, fontSize: 20 }}>[2.0, 1.0, 0.1]</div>
                </div>
              </div>

              <span style={{ color: colors.gray[400], fontSize: 24 }}>→</span>

              {/* 출력 */}
              <div style={{ opacity: resultOpacity }}>
                <div style={{ color: colors.gray[500], fontSize: 14, marginBottom: 5 }}>Softmax 출력</div>
                <div style={{ backgroundColor: "#60a5fa20", border: "2px solid #60a5fa", padding: 15, borderRadius: 10 }}>
                  <div style={{ color: "#60a5fa", fontSize: 20 }}>[0.66, 0.24, 0.10]</div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 15,
                padding: 10,
                backgroundColor: "#22c55e20",
                borderRadius: 8,
                opacity: resultOpacity,
              }}
            >
              <span style={{ color: "#22c55e", fontSize: 18 }}>
                합 = 0.66 + 0.24 + 0.10 = 1.0 (확률!)
              </span>
            </div>
          </div>
        </div>

        {/* 오른쪽: 용도 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              marginBottom: 20,
              opacity: usageOpacity,
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
              주요 용도
            </div>

            <div
              style={{
                backgroundColor: "#60a5fa20",
                border: "2px solid #60a5fa",
                padding: 15,
                borderRadius: 12,
                marginBottom: 15,
              }}
            >
              <div style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>
                다중 클래스 분류
              </div>
              <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 5 }}>
                개, 고양이, 새 중 어떤 것?
              </div>
            </div>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 12,
                marginBottom: 15,
              }}
            >
              <div style={{ color: colors.white, fontSize: 20 }}>
                • 출력층에서 사용
              </div>
              <div style={{ color: colors.white, fontSize: 20, marginTop: 8 }}>
                • 모든 확률 합 = 1
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#a855f720",
                border: "2px solid #a855f7",
                padding: 15,
                borderRadius: 12,
              }}
            >
              <div style={{ color: "#a855f7", fontSize: 18, fontWeight: "bold" }}>
                PyTorch
              </div>
              <code style={{ color: colors.white, fontSize: 16 }}>
                nn.CrossEntropyLoss()
              </code>
              <div style={{ color: colors.gray[400], fontSize: 14, marginTop: 5 }}>
                Softmax 내장!
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
