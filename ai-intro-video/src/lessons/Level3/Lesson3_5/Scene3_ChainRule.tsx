/**
 * Scene 3: 연쇄법칙 복습
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_ChainRule: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 공식
  const formulaOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 예시
  const exampleOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const step1Opacity = interpolate(frame, [270, 300], [0, 1], { extrapolateRight: "clamp" });
  const step2Opacity = interpolate(frame, [360, 390], [0, 1], { extrapolateRight: "clamp" });
  const resultOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-5/scene3.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        연쇄법칙 (Chain Rule) 복습
      </h1>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 공식 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              marginBottom: 20,
              opacity: formulaOpacity,
            }}
          >
            <h3 style={{ color: "#60a5fa", fontSize: 24, marginBottom: 15 }}>
              합성함수의 미분
            </h3>
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 20,
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div style={{ color: colors.gray[400], fontSize: 18, marginBottom: 10 }}>
                y = f(u), u = g(x) 일 때
              </div>
              <div style={{ color: colors.white, fontSize: 36, fontFamily: "serif" }}>
                dy/dx = dy/du × du/dx
              </div>
            </div>
          </div>

          {/* 시각적 표현 */}
          <div
            style={{
              backgroundColor: "#60a5fa20",
              border: "2px solid #60a5fa",
              padding: 20,
              borderRadius: 16,
              opacity: formulaOpacity,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold" }}>x</div>
              </div>
              <div style={{ color: colors.white, fontSize: 24 }}>→</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#fbbf24", fontSize: 24, fontWeight: "bold" }}>u = g(x)</div>
              </div>
              <div style={{ color: colors.white, fontSize: 24 }}>→</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#a855f7", fontSize: 24, fontWeight: "bold" }}>y = f(u)</div>
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
            }}
          >
            <h3 style={{ color: "#22c55e", fontSize: 24, marginBottom: 15, opacity: exampleOpacity }}>
              예시: y = (2x + 1)²
            </h3>

            {/* 분해 */}
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
                opacity: step1Opacity,
              }}
            >
              <div style={{ color: colors.gray[400], fontSize: 16 }}>Step 1: 분해</div>
              <div style={{ color: colors.white, fontSize: 20, marginTop: 5 }}>
                u = 2x + 1, &nbsp; y = u²
              </div>
            </div>

            {/* 각각 미분 */}
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
                opacity: step2Opacity,
              }}
            >
              <div style={{ color: colors.gray[400], fontSize: 16 }}>Step 2: 각각 미분</div>
              <div style={{ color: "#fbbf24", fontSize: 20, marginTop: 5 }}>
                dy/du = 2u, &nbsp; du/dx = 2
              </div>
            </div>

            {/* 결과 */}
            <div
              style={{
                backgroundColor: "#22c55e20",
                border: "2px solid #22c55e",
                padding: 15,
                borderRadius: 10,
                opacity: resultOpacity,
              }}
            >
              <div style={{ color: "#22c55e", fontSize: 18, fontWeight: "bold" }}>결과</div>
              <div style={{ color: colors.white, fontSize: 22, marginTop: 5 }}>
                dy/dx = 2u × 2 = 4u = <strong>4(2x + 1)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
