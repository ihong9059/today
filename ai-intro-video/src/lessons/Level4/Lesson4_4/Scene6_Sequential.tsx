/**
 * Lesson 4-4 Scene 6: nn.Sequential
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Sequential: React.FC = () => {
  const frame = useCurrentFrame();

  const sequentialLayers = [
    { name: "Linear(784, 256)", color: colors.level[4] },
    { name: "ReLU()", color: "#22c55e" },
    { name: "Linear(256, 128)", color: colors.level[4] },
    { name: "ReLU()", color: "#22c55e" },
    { name: "Linear(128, 10)", color: colors.level[4] },
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
      <Audio src={staticFile("audio/lesson-4-4/scene6.mp3")} />

      {/* 코드 섹션 */}
      <div style={{ flex: 1 }}>
        <h2
          style={{
            fontSize: 48,
            color: colors.level[4],
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          nn.Sequential
        </h2>

        <div
          style={{
            backgroundColor: "#1e1e1e",
            borderRadius: 15,
            padding: 30,
            fontFamily: "monospace",
            fontSize: 24,
            lineHeight: 1.8,
            border: `2px solid ${colors.gray[700]}`,
          }}
        >
          <div style={{ color: "#fbbf24", opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }) }}>
            model = nn.Sequential(
          </div>
          {sequentialLayers.map((layer, i) => (
            <div
              key={i}
              style={{
                paddingLeft: 30,
                color: colors.white,
                opacity: interpolate(frame, [60 + i * 30, 90 + i * 30], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              nn.{layer.name},
            </div>
          ))}
          <div style={{ color: "#fbbf24", opacity: interpolate(frame, [210, 240], [0, 1], { extrapolateRight: "clamp" }) }}>
            )
          </div>
        </div>

        <p
          style={{
            marginTop: 30,
            fontSize: 24,
            color: colors.gray[300],
            opacity: interpolate(frame, [270, 300], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          forward 없이 자동으로 순차 실행
        </p>
      </div>

      {/* 시각화 섹션 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 style={{ fontSize: 28, color: colors.gray[300], marginBottom: 30 }}>
          레이어 순차 실행
        </h3>

        {/* 레이어 박스들 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
          }}
        >
          {sequentialLayers.map((layer, i) => {
            const boxOpacity = interpolate(
              frame,
              [300 + i * 30, 330 + i * 30],
              [0, 1],
              { extrapolateRight: "clamp" }
            );

            // 화살표 애니메이션
            const arrowProgress = interpolate(
              frame,
              [450, 750],
              [0, 5],
              { extrapolateRight: "clamp" }
            );
            const isActive = arrowProgress >= i;

            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: isActive ? layer.color : colors.gray[700],
                    padding: "15px 35px",
                    borderRadius: 12,
                    fontSize: 22,
                    color: colors.white,
                    opacity: boxOpacity,
                    boxShadow: isActive ? `0 0 20px ${layer.color}80` : "none",
                    transition: "all 0.3s",
                  }}
                >
                  {layer.name}
                </div>
                {i < sequentialLayers.length - 1 && (
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
      </div>

      {/* 비교 텍스트 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, color: "#22c55e", marginBottom: 10 }}>단순 순차 연결</div>
          <div style={{ fontSize: 20, color: colors.gray[400] }}>→ Sequential 편리</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, color: "#fbbf24", marginBottom: 10 }}>복잡한 분기</div>
          <div style={{ fontSize: 20, color: colors.gray[400] }}>→ forward 직접 작성</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
