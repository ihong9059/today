/**
 * Scene 3: 입력 (Input) 설명
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Input: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const exampleReveal = (index: number) => {
    const startFrame = 90 + index * 120;
    return interpolate(frame, [startFrame, startFrame + 45], [0, 1], { extrapolateRight: "clamp" });
  };

  const examples = [
    {
      title: "이미지 인식",
      icon: "🖼️",
      inputs: ["x₁ = 픽셀1 밝기 (0~255)", "x₂ = 픽셀2 밝기 (0~255)", "...", "x₇₈₄ = 마지막 픽셀"],
      color: "#3b82f6",
    },
    {
      title: "스팸 메일 분류",
      icon: "📧",
      inputs: ["x₁ = '무료' 포함? (0/1)", "x₂ = '당첨' 포함? (0/1)", "x₃ = 느낌표 개수"],
      color: "#f97316",
    },
    {
      title: "집값 예측",
      icon: "🏠",
      inputs: ["x₁ = 면적 (㎡)", "x₂ = 방 개수", "x₃ = 역 거리 (km)"],
      color: "#22c55e",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* 타이틀 */}
      <div
        style={{
          opacity: titleOpacity,
          marginBottom: 30,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 70 }}>📥</span>
        <div>
          <h2
            style={{
              fontSize: 64,
              color: "#3b82f6",
              fontWeight: "bold",
            }}
          >
            구성요소 1: 입력 (Input)
          </h2>
          <p
            style={{
              fontSize: 30,
              color: colors.gray[400],
            }}
          >
            퍼셉트론에게 주어지는 정보 또는 데이터
          </p>
        </div>
      </div>

      {/* 입력 예시들 */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 30,
        }}
      >
        {examples.map((ex, i) => (
          <div
            key={i}
            style={{
              opacity: exampleReveal(i),
              transform: `scale(${interpolate(exampleReveal(i), [0, 1], [0.8, 1])})`,
              backgroundColor: `${ex.color}15`,
              border: `2px solid ${ex.color}`,
              borderRadius: 20,
              padding: 30,
              width: 340,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                marginBottom: 25,
              }}
            >
              <span style={{ fontSize: 50 }}>{ex.icon}</span>
              <h3
                style={{
                  fontSize: 32,
                  color: ex.color,
                  fontWeight: "bold",
                }}
              >
                {ex.title}
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ex.inputs.map((input, j) => (
                <div
                  key={j}
                  style={{
                    fontSize: 24,
                    color: colors.gray[300],
                    padding: "10px 15px",
                    backgroundColor: colors.gray[800],
                    borderRadius: 10,
                    fontFamily: "monospace",
                  }}
                >
                  {input}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 메시지 */}
      {frame > 480 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
            opacity: interpolate(frame, [480, 520], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              backgroundColor: "#3b82f620",
              border: "2px solid #3b82f6",
              borderRadius: 15,
              padding: "15px 40px",
            }}
          >
            <span style={{ fontSize: 32, color: "#3b82f6", fontWeight: "bold" }}>
              ⚠️ 입력값 자체는 변하지 않습니다
            </span>
          </div>
          <span style={{ fontSize: 26, color: colors.gray[400] }}>
            입력은 그저 외부에서 주어지는 데이터일 뿐!
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
