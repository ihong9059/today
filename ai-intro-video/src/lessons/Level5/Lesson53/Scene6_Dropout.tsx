/**
 * Scene 6: Dropout
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Dropout: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 뉴런 그리드 (5x3)
  const neurons = Array(15).fill(0);

  // 드롭아웃 패턴 (50% 비활성화)
  const dropoutPattern = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1]; // 1=active, 0=dropped

  // 애니메이션: 학습 vs 테스트 모드
  const isTrainingMode = frame < 600;
  const modeProgress = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #dc2626 50%, #7c2d12 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-3/scene6.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 15,
          opacity: titleOpacity,
        }}
      >
        🎲 Dropout
      </h1>

      <p
        style={{
          fontSize: 24,
          color: "#fca5a5",
          marginBottom: 40,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        학습 중 일부 뉴런을 무작위로 비활성화
      </p>

      {/* 뉴런 시각화 */}
      <div style={{ display: "flex", gap: 80, alignItems: "center" }}>
        {/* 훈련 시 */}
        <div
          style={{
            textAlign: "center",
            opacity: modeProgress,
          }}
        >
          <div style={{ fontSize: 24, color: "#f87171", fontWeight: "bold", marginBottom: 20 }}>
            🏋️ 훈련 시 (Dropout 0.5)
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 50px)",
              gap: 10,
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 16,
              border: "3px solid #ef4444",
            }}
          >
            {neurons.map((_, i) => {
              const isActive = dropoutPattern[i] === 1;
              const flickerPhase = Math.floor((frame + i * 30) / 60) % 2;
              const currentActive = isTrainingMode ? (flickerPhase === 0 ? isActive : !isActive) : true;

              return (
                <div
                  key={i}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: currentActive ? "#22c55e" : colors.gray[600],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: colors.white,
                    opacity: currentActive ? 1 : 0.3,
                    transition: "all 0.3s",
                  }}
                >
                  {currentActive ? "●" : "○"}
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 16, color: colors.gray[400], marginTop: 10 }}>
            무작위로 50% 비활성화
          </div>
        </div>

        {/* 테스트 시 */}
        <div
          style={{
            textAlign: "center",
            opacity: interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ fontSize: 24, color: "#86efac", fontWeight: "bold", marginBottom: 20 }}>
            🧪 테스트 시 (model.eval())
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 50px)",
              gap: 10,
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 16,
              border: "3px solid #22c55e",
            }}
          >
            {neurons.map((_, i) => (
              <div
                key={i}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: colors.white,
                }}
              >
                ●
              </div>
            ))}
          </div>
          <div style={{ fontSize: 16, color: colors.gray[400], marginTop: 10 }}>
            모든 뉴런 활성화
          </div>
        </div>
      </div>

      {/* 효과 설명 */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginTop: 40,
          opacity: interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {["과적합 방지", "앙상블 효과", "견고한 특징 학습"].map((text, i) => (
          <div
            key={i}
            style={{
              backgroundColor: colors.gray[800],
              padding: "15px 25px",
              borderRadius: 10,
              fontSize: 18,
              color: colors.white,
              border: "2px solid #f87171",
            }}
          >
            ✓ {text}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
