/**
 * Lesson 4-4 Scene 5: 파라미터 관리
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_Parameters: React.FC = () => {
  const frame = useCurrentFrame();

  const parameters = [
    { name: "fc1.weight", shape: "[256, 784]", count: "200,704" },
    { name: "fc1.bias", shape: "[256]", count: "256" },
    { name: "fc2.weight", shape: "[128, 256]", count: "32,768" },
    { name: "fc2.bias", shape: "[128]", count: "128" },
    { name: "fc3.weight", shape: "[10, 128]", count: "1,280" },
    { name: "fc3.bias", shape: "[10]", count: "10" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a1a2e 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-4/scene5.mp3")} />

      <h2
        style={{
          fontSize: 48,
          color: colors.level[4],
          fontWeight: "bold",
          marginBottom: 40,
        }}
      >
        파라미터 관리
      </h2>

      {/* 코드 예시 */}
      <div
        style={{
          display: "flex",
          gap: 40,
          width: "100%",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            backgroundColor: "#1e1e1e",
            borderRadius: 15,
            padding: 25,
            fontFamily: "monospace",
            fontSize: 24,
            border: `2px solid ${colors.gray[700]}`,
            opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <span style={{ color: "#22c55e" }}>model.parameters()</span>
        </div>
        <div
          style={{
            backgroundColor: "#1e1e1e",
            borderRadius: 15,
            padding: 25,
            fontFamily: "monospace",
            fontSize: 24,
            border: `2px solid ${colors.gray[700]}`,
            opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <span style={{ color: "#fbbf24" }}>model.named_parameters()</span>
        </div>
      </div>

      {/* 파라미터 테이블 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          borderRadius: 15,
          padding: 30,
          width: "80%",
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            display: "flex",
            borderBottom: `2px solid ${colors.gray[600]}`,
            paddingBottom: 15,
            marginBottom: 15,
            opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ flex: 2, fontSize: 22, color: colors.gray[400], fontWeight: "bold" }}>
            파라미터 이름
          </div>
          <div style={{ flex: 1, fontSize: 22, color: colors.gray[400], fontWeight: "bold", textAlign: "center" }}>
            Shape
          </div>
          <div style={{ flex: 1, fontSize: 22, color: colors.gray[400], fontWeight: "bold", textAlign: "right" }}>
            개수
          </div>
        </div>

        {/* 데이터 행 */}
        {parameters.map((param, i) => {
          const rowOpacity = interpolate(
            frame,
            [150 + i * 30, 180 + i * 30],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={param.name}
              style={{
                display: "flex",
                padding: "12px 0",
                borderBottom: i < parameters.length - 1 ? `1px solid ${colors.gray[700]}` : "none",
                opacity: rowOpacity,
              }}
            >
              <div style={{ flex: 2, fontSize: 22, color: colors.white, fontFamily: "monospace" }}>
                {param.name}
              </div>
              <div style={{ flex: 1, fontSize: 22, color: colors.level[4], textAlign: "center" }}>
                {param.shape}
              </div>
              <div style={{ flex: 1, fontSize: 22, color: "#22c55e", textAlign: "right" }}>
                {param.count}
              </div>
            </div>
          );
        })}

        {/* 총합 */}
        <div
          style={{
            display: "flex",
            marginTop: 20,
            paddingTop: 20,
            borderTop: `2px solid ${colors.level[4]}`,
            opacity: interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ flex: 2, fontSize: 26, color: colors.white, fontWeight: "bold" }}>
            총 파라미터
          </div>
          <div style={{ flex: 2, fontSize: 26, color: colors.level[4], textAlign: "right", fontWeight: "bold" }}>
            235,146
          </div>
        </div>
      </div>

      {/* requires_grad 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "15px 30px",
            borderRadius: 10,
            fontFamily: "monospace",
            fontSize: 24,
            color: "#fbbf24",
          }}
        >
          param.requires_grad = False
        </div>
        <span style={{ fontSize: 24, color: colors.gray[300] }}>→ 특정 레이어 학습 제외</span>
      </div>
    </AbsoluteFill>
  );
};
