/**
 * Lesson 1-4 Scene 7: 예시 - OR 게이트 설정
 */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

export const Scene7_ExampleSetup: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const truthTable = [
    { x1: 0, x2: 0, y: 0 },
    { x1: 0, x2: 1, y: 1 },
    { x1: 1, x2: 0, y: 1 },
    { x1: 1, x2: 1, y: 1 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #164e63 100%)`,
        padding: 60,
      }}
    >
      {/* 제목 */}
      <div style={{ textAlign: "center", marginBottom: 30, opacity: titleOpacity }}>
        <h1 style={{ fontSize: 60, color: colors.white, marginBottom: 15 }}>
          실제 예시: OR 게이트 학습
        </h1>
        <p style={{ fontSize: 30, color: colors.gray[400] }}>
          학습 과정을 따라가봅시다
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 80 }}>
        {/* OR 게이트 진리표 */}
        <div
          style={{
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h2 style={{ fontSize: 32, color: colors.primary[300], marginBottom: 20 }}>
            OR 게이트 진리표
          </h2>
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              padding: 20,
              border: "2px solid " + colors.primary[500],
            }}
          >
            {/* 헤더 */}
            <div style={{ display: "flex", marginBottom: 15, borderBottom: "2px solid " + colors.gray[600], paddingBottom: 10 }}>
              <div style={{ width: 80, fontSize: 24, color: colors.primary[400], fontWeight: "bold" }}>x₁</div>
              <div style={{ width: 80, fontSize: 24, color: colors.primary[400], fontWeight: "bold" }}>x₂</div>
              <div style={{ width: 80, fontSize: 24, color: "#22c55e", fontWeight: "bold" }}>출력</div>
            </div>
            {/* 데이터 행 */}
            {truthTable.map((row, i) => {
              const rowOpacity = interpolate(frame, [60 + i * 30, 80 + i * 30], [0, 1], {
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    marginBottom: 10,
                    opacity: rowOpacity,
                  }}
                >
                  <div style={{ width: 80, fontSize: 28, color: colors.white }}>{row.x1}</div>
                  <div style={{ width: 80, fontSize: 28, color: colors.white }}>{row.x2}</div>
                  <div
                    style={{
                      width: 80,
                      fontSize: 28,
                      color: row.y === 1 ? "#22c55e" : colors.gray[400],
                      fontWeight: "bold",
                    }}
                  >
                    {row.y}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 초기 설정 */}
        <div
          style={{
            opacity: interpolate(frame, [180, 220], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h2 style={{ fontSize: 32, color: "#f97316", marginBottom: 20 }}>
            초기 설정
          </h2>
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              padding: 30,
              border: "2px solid #f97316",
            }}
          >
            <div style={{ fontSize: 26, color: colors.white, marginBottom: 20 }}>
              <span style={{ color: colors.gray[400] }}>가중치:</span>
              <span style={{ color: colors.primary[400], marginLeft: 15 }}>w₁ = 0, w₂ = 0</span>
            </div>
            <div style={{ fontSize: 26, color: colors.white, marginBottom: 20 }}>
              <span style={{ color: colors.gray[400] }}>편향:</span>
              <span style={{ color: colors.primary[400], marginLeft: 15 }}>b = 0</span>
            </div>
            <div style={{ fontSize: 26, color: colors.white, marginBottom: 20 }}>
              <span style={{ color: colors.gray[400] }}>학습률:</span>
              <span style={{ color: "#f97316", marginLeft: 15 }}>η = 0.5</span>
            </div>
            <div style={{ fontSize: 26, color: colors.white }}>
              <span style={{ color: colors.gray[400] }}>활성화:</span>
              <span style={{ color: "#22c55e", marginLeft: 15 }}>계단 함수</span>
            </div>
            <div style={{ fontSize: 20, color: colors.gray[400], marginTop: 15 }}>
              (z ≥ 0 이면 1, 아니면 0)
            </div>
          </div>
        </div>
      </div>

      {/* 학습 시작 안내 */}
      <div
        style={{
          textAlign: "center",
          marginTop: 50,
          opacity: interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: colors.primary[600] + "40",
            border: "2px solid " + colors.primary[500],
            borderRadius: 20,
            padding: "20px 50px",
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
            이제 학습을 시작해볼까요? 🚀
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
