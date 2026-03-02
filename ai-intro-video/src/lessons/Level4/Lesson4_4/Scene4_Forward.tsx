/**
 * Lesson 4-4 Scene 4: forward 메서드
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_Forward: React.FC = () => {
  const frame = useCurrentFrame();

  const codeLines = [
    { text: "def forward(self, x):", color: "#fbbf24" },
    { text: "    x = self.fc1(x)", color: colors.white },
    { text: "    x = F.relu(x)", color: "#22c55e" },
    { text: "    x = self.fc2(x)", color: colors.white },
    { text: "    x = F.relu(x)", color: "#22c55e" },
    { text: "    x = self.fc3(x)", color: colors.white },
    { text: "    return x", color: "#fbbf24" },
  ];

  // 데이터 흐름 애니메이션
  const flowProgress = interpolate(frame, [300, 600], [0, 1], { extrapolateRight: "clamp" });
  const flowPosition = flowProgress * 5; // 0 ~ 5 단계

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a1a2e 100%)`,
        display: "flex",
        flexDirection: "row",
        padding: 60,
        gap: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-4/scene4.mp3")} />

      {/* 코드 섹션 */}
      <div style={{ flex: 1 }}>
        <h2
          style={{
            fontSize: 40,
            color: colors.level[4],
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          forward 메서드
        </h2>

        <div
          style={{
            backgroundColor: "#1e1e1e",
            borderRadius: 15,
            padding: 30,
            fontFamily: "monospace",
            fontSize: 26,
            lineHeight: 1.8,
            border: `2px solid ${colors.gray[700]}`,
          }}
        >
          {codeLines.map((line, i) => {
            const lineOpacity = interpolate(
              frame,
              [30 + i * 25, 55 + i * 25],
              [0, 1],
              { extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: lineOpacity,
                  color: line.color,
                }}
              >
                {line.text}
              </div>
            );
          })}
        </div>

        {/* model(x) vs model.forward(x) */}
        <div
          style={{
            marginTop: 40,
            opacity: interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 30,
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#22c55e",
                padding: "15px 30px",
                borderRadius: 10,
                fontSize: 28,
                color: colors.white,
                fontFamily: "monospace",
              }}
            >
              model(x) ✓
            </div>
            <span style={{ fontSize: 30, color: colors.gray[400] }}>vs</span>
            <div
              style={{
                backgroundColor: "#ef4444",
                padding: "15px 30px",
                borderRadius: 10,
                fontSize: 28,
                color: colors.white,
                fontFamily: "monospace",
                opacity: 0.6,
              }}
            >
              model.forward(x) ✗
            </div>
          </div>
        </div>
      </div>

      {/* 데이터 흐름 시각화 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 25,
        }}
      >
        <h3 style={{ fontSize: 28, color: colors.gray[300], marginBottom: 20 }}>
          순전파 흐름
        </h3>

        {["입력 x", "fc1 → ReLU", "fc2 → ReLU", "fc3", "출력"].map((step, i) => {
          const isActive = flowPosition >= i;
          const isCurrent = Math.floor(flowPosition) === i;

          return (
            <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: isActive ? colors.level[4] : colors.gray[700],
                  padding: "15px 40px",
                  borderRadius: 12,
                  fontSize: 24,
                  color: colors.white,
                  opacity: interpolate(frame, [150 + i * 30, 180 + i * 30], [0, 1], { extrapolateRight: "clamp" }),
                  transform: isCurrent ? "scale(1.1)" : "scale(1)",
                  boxShadow: isCurrent ? `0 0 20px ${colors.level[4]}` : "none",
                  transition: "all 0.3s",
                }}
              >
                {step}
              </div>
              {i < 4 && (
                <div
                  style={{
                    fontSize: 24,
                    color: isActive ? colors.level[4] : colors.gray[600],
                    margin: "5px 0",
                  }}
                >
                  ↓
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
