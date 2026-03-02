/**
 * Lesson 1-2 Scene 5: 맥컬록-피츠 뉴런
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene5_McCullochPitts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const scientists = [
    { name: "워런 맥컬록", role: "신경과학자", icon: "🧠" },
    { name: "월터 피츠", role: "논리학자", icon: "📐" },
  ];

  const features = [
    "여러 입력을 받아서 모두 더함",
    "합이 임계값보다 크면 1 출력",
    "합이 임계값보다 작으면 0 출력",
    "AND, OR 논리 연산 가능!",
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* 제목 */}
      <h2
        style={{
          fontSize: 52,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        📜 1943년: 맥컬록-피츠 뉴런
      </h2>

      {/* 과학자 소개 */}
      <div
        style={{
          display: "flex",
          gap: 60,
          marginBottom: 40,
          opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {scientists.map((sci, i) => (
          <div
            key={i}
            style={{
              backgroundColor: `${colors.gray[800]}80`,
              borderRadius: 15,
              padding: "25px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 50, marginBottom: 10 }}>{sci.icon}</div>
            <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>{sci.name}</div>
            <div style={{ fontSize: 18, color: colors.primary[300] }}>{sci.role}</div>
          </div>
        ))}
      </div>

      {/* 모델 다이어그램 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
          marginBottom: 40,
          opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {/* 입력들 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["x₁", "x₂", "x₃"].map((input, i) => (
            <div
              key={i}
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#3b82f630",
                border: "2px solid #3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                color: "#3b82f6",
              }}
            >
              {input}
            </div>
          ))}
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 40, color: colors.gray[500] }}>→</div>

        {/* 합산 */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "#f9731630",
            border: "3px solid #f97316",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 28, color: "#f97316" }}>Σ</div>
          <div style={{ fontSize: 14, color: colors.gray[400] }}>합산</div>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 40, color: colors.gray[500] }}>→</div>

        {/* 임계값 비교 */}
        <div
          style={{
            backgroundColor: "#8b5cf630",
            border: "3px solid #8b5cf6",
            borderRadius: 15,
            padding: "20px 30px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 20, color: "#8b5cf6" }}>합 ≥ 임계값?</div>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 40, color: colors.gray[500] }}>→</div>

        {/* 출력 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20, color: "#22c55e" }}>Yes:</span>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                color: colors.white,
              }}
            >
              1
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20, color: "#ef4444" }}>No:</span>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                color: colors.white,
              }}
            >
              0
            </div>
          </div>
        </div>
      </div>

      {/* 특징 목록 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {features.map((feature, i) => {
          const featureOpacity = interpolate(
            frame,
            [90 + i * 15, 105 + i * 15],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                opacity: featureOpacity,
              }}
            >
              <span style={{ fontSize: 24, color: "#22c55e" }}>✓</span>
              <span style={{ fontSize: 22, color: colors.gray[300] }}>{feature}</span>
            </div>
          );
        })}
      </div>

      {/* 한계 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          backgroundColor: "#ef444420",
          border: "2px solid #ef4444",
          borderRadius: 15,
          padding: "15px 40px",
          opacity: interpolate(frame, [150, 170], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 24, color: "#ef4444" }}>
          ⚠️ 한계: 학습이 불가능했습니다!
        </span>
      </div>
    </AbsoluteFill>
  );
};
