/**
 * Scene 2: SGD (Stochastic Gradient Descent)
 * 확률적 경사하강법과 미니배치
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_SGD: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 비교 설명
  const fullBatchOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const sgdOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  // 미니배치
  const miniBatchOpacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });

  // 데이터 포인트 애니메이션
  const dataProgress = interpolate(frame, [90, 170], [0, 1], { extrapolateRight: "clamp" });
  const sgdProgress = interpolate(frame, [210, 280], [0, 1], { extrapolateRight: "clamp" });

  // 추천 메시지
  const recOpacity = interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-3/scene2.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          opacity: titleOpacity,
        }}
      >
        SGD: 확률적 경사하강법
      </h1>

      <div
        style={{
          display: "flex",
          gap: 50,
          marginTop: 30,
          justifyContent: "center",
        }}
      >
        {/* 전체 배치 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 30,
            borderRadius: 20,
            width: 380,
            opacity: fullBatchOpacity,
          }}
        >
          <h3 style={{ color: "#f87171", fontSize: 26, marginBottom: 20 }}>
            기본 경사하강법
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: "50%",
                  backgroundColor: i < Math.floor(dataProgress * 36) ? "#60a5fa" : colors.gray[600],
                  transition: "background-color 0.1s",
                }}
              />
            ))}
          </div>
          <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 15, textAlign: "center" }}>
            전체 데이터로 1번 업데이트
          </div>
        </div>

        {/* SGD */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 30,
            borderRadius: 20,
            width: 380,
            opacity: sgdOpacity,
          }}
        >
          <h3 style={{ color: "#22c55e", fontSize: 26, marginBottom: 20 }}>
            SGD
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {Array.from({ length: 36 }).map((_, i) => {
              const isSelected = Math.floor(sgdProgress * 36) === i;
              return (
                <div
                  key={i}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    backgroundColor: isSelected ? "#22c55e" : colors.gray[600],
                    border: isSelected ? "3px solid #fff" : "none",
                    transform: isSelected ? "scale(1.3)" : "scale(1)",
                  }}
                />
              );
            })}
          </div>
          <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 15, textAlign: "center" }}>
            무작위 1개 샘플로 업데이트
          </div>
        </div>
      </div>

      {/* 미니배치 설명 */}
      <div
        style={{
          backgroundColor: "#60a5fa20",
          border: "2px solid #60a5fa",
          padding: "25px 40px",
          borderRadius: 20,
          marginTop: 40,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 900,
          opacity: miniBatchOpacity,
        }}
      >
        <h3 style={{ color: "#60a5fa", fontSize: 28, marginBottom: 15, textAlign: "center" }}>
          미니배치 (Mini-Batch)
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: 30 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              backgroundColor: colors.gray[700],
              padding: "10px 20px",
              borderRadius: 10,
              fontSize: 22,
              color: colors.white,
            }}>
              배치 크기: 32
            </div>
            <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 8 }}>
              32개 샘플의 평균 기울기
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              backgroundColor: colors.gray[700],
              padding: "10px 20px",
              borderRadius: 10,
              fontSize: 22,
              color: colors.white,
            }}>
              배치 크기: 64
            </div>
            <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 8 }}>
              64개 샘플의 평균 기울기
            </div>
          </div>
        </div>
      </div>

      {/* 추천 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: recOpacity,
        }}
      >
        <div style={{ fontSize: 30, color: "#fbbf24", fontWeight: "bold" }}>
          속도와 안정성의 균형! ⚖️
        </div>
      </div>
    </AbsoluteFill>
  );
};
