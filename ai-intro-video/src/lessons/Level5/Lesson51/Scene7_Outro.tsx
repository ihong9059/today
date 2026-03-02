/**
 * Scene 7: 아웃트로
 * 정리 및 다음 강의 예고
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 핵심 정리
  const summaryItems = [
    { icon: "📊", text: "이미지 = 픽셀의 격자" },
    { icon: "🎨", text: "흑백 1채널, 컬러 3채널 (RGB)" },
    { icon: "📐", text: "텐서 Shape: (N, C, H, W)" },
    { icon: "⚖️", text: "정규화로 학습 안정화" },
  ];

  // 다음 강의 예고
  const nextOpacity = interpolate(frame, [700, 730], [0, 1], { extrapolateRight: "clamp" });
  const endOpacity = interpolate(frame, [900, 930], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #831843 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-1/scene7.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        핵심 정리
      </h1>

      {/* 요약 카드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 25,
          marginBottom: 50,
        }}
      >
        {summaryItems.map((item, i) => {
          const delay = 60 + i * 60;
          const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 30 });
          return (
            <div
              key={item.text}
              style={{
                backgroundColor: colors.gray[800],
                padding: "25px 35px",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                gap: 20,
                transform: `scale(${Math.max(0, scale)})`,
                border: "2px solid #ec4899",
              }}
            >
              <span style={{ fontSize: 40 }}>{item.icon}</span>
              <span style={{ fontSize: 26, color: colors.white }}>{item.text}</span>
            </div>
          );
        })}
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          opacity: nextOpacity,
          backgroundColor: "#22c55e22",
          padding: "30px 50px",
          borderRadius: 20,
          border: "3px solid #22c55e",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 28, color: "#22c55e", marginBottom: 15 }}>다음 강의</h2>
        <div style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
          합성곱 연산
        </div>
        <div style={{ fontSize: 22, color: colors.gray[400], marginTop: 10 }}>
          CNN의 핵심! 커널이 이미지에서 특징을 추출하는 방법
        </div>
      </div>

      {/* 마무리 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: endOpacity,
          fontSize: 32,
          color: colors.white,
          fontWeight: "bold",
        }}
      >
        수고하셨습니다! 👏
      </div>
    </AbsoluteFill>
  );
};
