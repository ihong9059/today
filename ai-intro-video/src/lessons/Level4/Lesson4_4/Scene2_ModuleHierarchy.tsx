/**
 * Lesson 4-4 Scene 2: nn.Module 역할과 계층 구조
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_ModuleHierarchy: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a1a2e 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-4/scene2.mp3")} />

      {/* 타이틀 */}
      <h2
        style={{
          position: "absolute",
          top: 40,
          fontSize: 48,
          color: colors.white,
          fontWeight: "bold",
        }}
      >
        nn.Module 계층 구조
      </h2>

      {/* 계층 구조 시각화 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          marginTop: 60,
        }}
      >
        {/* nn.Module (최상위) */}
        <div
          style={{
            backgroundColor: colors.level[4],
            padding: "25px 80px",
            borderRadius: 20,
            fontSize: 42,
            fontWeight: "bold",
            color: colors.white,
            opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
            boxShadow: `0 0 40px ${colors.level[4]}60`,
          }}
        >
          nn.Module
        </div>

        {/* 상속 화살표 */}
        <div
          style={{
            display: "flex",
            gap: 150,
            opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                fontSize: 36,
                color: colors.level[4],
              }}
            >
              ↓
            </div>
          ))}
        </div>

        {/* 내장 레이어들 */}
        <div
          style={{
            display: "flex",
            gap: 30,
            opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {["nn.Linear", "nn.Conv2d", "nn.ReLU"].map((name) => (
            <div
              key={name}
              style={{
                backgroundColor: colors.gray[700],
                border: `3px solid ${colors.level[4]}`,
                padding: "18px 35px",
                borderRadius: 15,
                fontSize: 30,
                color: colors.white,
              }}
            >
              {name}
            </div>
          ))}
        </div>

        {/* 구분선 */}
        <div
          style={{
            width: 600,
            height: 2,
            backgroundColor: colors.gray[600],
            opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" }),
          }}
        />

        {/* 커스텀 모델 */}
        <div
          style={{
            opacity: interpolate(frame, [210, 240], [0, 1], { extrapolateRight: "clamp" }),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p style={{ fontSize: 28, color: colors.gray[300] }}>우리가 만드는 커스텀 모델도</p>

          <div
            style={{
              backgroundColor: "#22c55e",
              padding: "20px 50px",
              borderRadius: 15,
              fontSize: 36,
              fontWeight: "bold",
              color: colors.white,
              boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)",
            }}
          >
            class SimpleModel(nn.Module)
          </div>
        </div>
      </div>

      {/* 자동 기능들 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          gap: 40,
          opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {["파라미터 관리", "GPU 이동", "저장/로드"].map((feature, i) => (
          <div
            key={feature}
            style={{
              backgroundColor: colors.gray[800],
              border: `2px solid ${colors.level[4]}`,
              padding: "12px 25px",
              borderRadius: 25,
              fontSize: 24,
              color: colors.white,
              opacity: interpolate(frame, [330 + i * 20, 360 + i * 20], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            ✓ {feature}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
