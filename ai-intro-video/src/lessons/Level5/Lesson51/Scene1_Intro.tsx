/**
 * Scene 1: 인트로
 * 컴퓨터 비전 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, from: -50, to: 0, durationInFrames: 45 });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const badgeScale = spring({ frame: frame - 60, fps, from: 0, to: 1, durationInFrames: 30 });

  // 아이콘 애니메이션
  const iconOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });

  // 응용 분야 카드
  const applications = [
    { icon: "🚗", text: "자율주행" },
    { icon: "👤", text: "얼굴인식" },
    { icon: "🏥", text: "의료영상" },
    { icon: "📝", text: "OCR" },
  ];

  const messageOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #831843 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Audio src={staticFile("audio/lesson-5-1/scene1.mp3")} />

      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          backgroundColor: "#ec4899",
          color: colors.white,
          padding: "12px 30px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: "bold",
          transform: `scale(${Math.max(0, badgeScale)})`,
        }}
      >
        Lesson 5-1
      </div>

      {/* Level 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          backgroundColor: "#ec4899",
          color: colors.white,
          padding: "12px 30px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: "bold",
          transform: `scale(${Math.max(0, badgeScale)})`,
        }}
      >
        Level 5 : CNN & 이미지 처리
      </div>

      {/* 큰 아이콘 */}
      <div
        style={{
          fontSize: 120,
          marginBottom: 20,
          opacity: iconOpacity,
        }}
      >
        👁️
      </div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: 90,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 20,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: "0 4px 20px rgba(236,72,153,0.5)",
        }}
      >
        컴퓨터 비전 소개
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 42,
          color: "#f9a8d4",
          fontWeight: "bold",
          opacity: subtitleOpacity,
          marginBottom: 50,
        }}
      >
        컴퓨터가 이미지를 이해하는 방법
      </h2>

      {/* 응용 분야 카드 */}
      <div
        style={{
          display: "flex",
          gap: 30,
          opacity: iconOpacity,
        }}
      >
        {applications.map((app, i) => {
          const delay = 150 + i * 30;
          const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 25 });
          return (
            <div
              key={app.text}
              style={{
                backgroundColor: colors.gray[800],
                padding: "25px 35px",
                borderRadius: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                transform: `scale(${Math.max(0, scale)})`,
                border: "2px solid #ec4899",
              }}
            >
              <span style={{ fontSize: 50 }}>{app.icon}</span>
              <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>
                {app.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* 학습 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: messageOpacity,
          fontSize: 32,
          color: colors.gray[300],
          textAlign: "center",
        }}
      >
        이미지가 어떻게 숫자로 표현되는지 알아봅시다!
      </div>
    </AbsoluteFill>
  );
};
