/**
 * Scene 7: 아웃트로 - 정리 및 다음 강의 예고
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const summaryItems = [
    { title: "풀링", items: ["Max Pool: 최대값 선택", "Avg Pool: 평균값", "GAP: FC 대체"], color: "#3b82f6" },
    { title: "BatchNorm", items: ["학습 안정화", "Conv → BN → ReLU"], color: "#8b5cf6" },
    { title: "Dropout", items: ["무작위 비활성화", "model.eval() 필수"], color: "#ef4444" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #059669 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-3/scene7.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        🎯 핵심 정리
      </h1>

      {/* 요약 카드들 */}
      <div style={{ display: "flex", gap: 30, marginBottom: 50 }}>
        {summaryItems.map((item, i) => {
          const opacity = interpolate(frame, [60 + i * 90, 90 + i * 90], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                backgroundColor: colors.gray[800],
                padding: 25,
                borderRadius: 16,
                border: `3px solid ${item.color}`,
                width: 280,
                opacity,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  color: item.color,
                  fontWeight: "bold",
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                {item.title}
              </div>
              {item.items.map((text, j) => (
                <div
                  key={j}
                  style={{
                    fontSize: 18,
                    color: colors.white,
                    padding: "8px 0",
                    borderBottom: j < item.items.length - 1 ? `1px solid ${colors.gray[700]}` : "none",
                  }}
                >
                  • {text}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          padding: 30,
          borderRadius: 20,
          border: "3px solid #f59e0b",
          textAlign: "center",
          opacity: interpolate(frame, [360, 390], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10 }}>🔜 다음 강의</div>
        <div style={{ fontSize: 32, color: "#fbbf24", fontWeight: "bold" }}>
          CNN 아키텍처
        </div>
        <div style={{ fontSize: 18, color: colors.gray[300], marginTop: 10 }}>
          LeNet부터 VGG까지, 유명한 CNN 구조들
        </div>
      </div>

      {/* 수고하셨습니다 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          fontSize: 28,
          color: colors.white,
          opacity: interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        수고하셨습니다! 👏
      </div>
    </AbsoluteFill>
  );
};
