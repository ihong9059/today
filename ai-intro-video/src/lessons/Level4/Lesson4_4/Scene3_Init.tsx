/**
 * Lesson 4-4 Scene 3: __init__ 메서드
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Init: React.FC = () => {
  const frame = useCurrentFrame();

  const codeLines = [
    { text: "class MLP(nn.Module):", indent: 0, highlight: false },
    { text: "def __init__(self):", indent: 1, highlight: true },
    { text: "super().__init__()  # 필수!", indent: 2, highlight: true },
    { text: "", indent: 0, highlight: false },
    { text: "self.fc1 = nn.Linear(784, 256)", indent: 2, highlight: false },
    { text: "self.fc2 = nn.Linear(256, 128)", indent: 2, highlight: false },
    { text: "self.fc3 = nn.Linear(128, 10)", indent: 2, highlight: false },
  ];

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
      <Audio src={staticFile("audio/lesson-4-4/scene3.mp3")} />

      {/* 코드 섹션 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontSize: 40,
            color: colors.level[4],
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          __init__ 메서드
        </h2>

        {/* 코드 블록 */}
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
              [30 + i * 30, 60 + i * 30],
              [0, 1],
              { extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  paddingLeft: line.indent * 30,
                  opacity: lineOpacity,
                  color: line.highlight ? "#fbbf24" : colors.white,
                  backgroundColor: line.highlight ? "rgba(251, 191, 36, 0.1)" : "transparent",
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                {line.text || "\u00A0"}
              </div>
            );
          })}
        </div>
      </div>

      {/* 설명 섹션 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {/* super().__init__() 설명 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 15,
            padding: 30,
            borderLeft: `5px solid ${colors.level[4]}`,
            opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h3 style={{ fontSize: 28, color: colors.level[4], marginBottom: 15 }}>
            ⚠️ super().__init__() 필수
          </h3>
          <p style={{ fontSize: 22, color: colors.gray[300], lineHeight: 1.6 }}>
            부모 클래스 초기화 없이는<br />
            nn.Module 기능을 사용할 수 없습니다
          </p>
        </div>

        {/* 레이어 정의 설명 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 15,
            padding: 30,
            borderLeft: `5px solid #22c55e`,
            opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h3 style={{ fontSize: 28, color: "#22c55e", marginBottom: 15 }}>
            ✓ self에 레이어 할당
          </h3>
          <p style={{ fontSize: 22, color: colors.gray[300], lineHeight: 1.6 }}>
            self.fc1, self.fc2처럼 할당하면<br />
            자동으로 파라미터가 등록됩니다
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
