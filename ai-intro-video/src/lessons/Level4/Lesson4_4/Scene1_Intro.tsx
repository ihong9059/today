/**
 * Lesson 4-4 Scene 1: nn.Module 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });

  // nn.Module 박스들 애니메이션
  const moduleBoxes = ["nn.Linear", "nn.Conv2d", "nn.ReLU", "nn.Embedding"];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a1a2e 50%, #16213e 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-4/scene1.mp3")} />

      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: colors.level[4],
          color: colors.white,
          padding: "8px 20px",
          borderRadius: 20,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Lesson 4-4
      </div>

      {/* 메인 타이틀 */}
      <h1
        style={{
          fontSize: 80,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          opacity: titleOpacity,
          textShadow: `0 0 30px ${colors.level[4]}`,
        }}
      >
        nn.Module 기초
      </h1>

      {/* 부제목 */}
      <p
        style={{
          fontSize: 36,
          color: colors.level[4],
          textAlign: "center",
          opacity: subtitleOpacity,
          marginBottom: 60,
        }}
      >
        PyTorch 모델의 기본 클래스
      </p>

      {/* nn.Module을 상속받는 클래스들 시각화 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* nn.Module 중앙 박스 */}
        <div
          style={{
            backgroundColor: colors.level[4],
            padding: "20px 60px",
            borderRadius: 20,
            fontSize: 40,
            fontWeight: "bold",
            color: colors.white,
            opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${interpolate(frame, [90, 120], [0.5, 1], { extrapolateRight: "clamp" })})`,
            boxShadow: `0 0 30px ${colors.level[4]}80`,
          }}
        >
          nn.Module
        </div>

        {/* 화살표들 */}
        <div
          style={{
            display: "flex",
            gap: 100,
            opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                fontSize: 30,
                color: colors.gray[400],
              }}
            >
              ↑
            </div>
          ))}
        </div>

        {/* 자식 클래스들 */}
        <div
          style={{
            display: "flex",
            gap: 30,
          }}
        >
          {moduleBoxes.map((name, i) => {
            const boxOpacity = interpolate(
              frame,
              [180 + i * 30, 210 + i * 30],
              [0, 1],
              { extrapolateRight: "clamp" }
            );
            return (
              <div
                key={name}
                style={{
                  backgroundColor: colors.gray[800],
                  border: `2px solid ${colors.level[4]}`,
                  padding: "15px 25px",
                  borderRadius: 12,
                  fontSize: 28,
                  color: colors.white,
                  opacity: boxOpacity,
                }}
              >
                {name}
              </div>
            );
          })}
        </div>
      </div>

      {/* 키 메시지 */}
      <p
        style={{
          position: "absolute",
          bottom: 80,
          fontSize: 28,
          color: colors.gray[300],
          textAlign: "center",
          opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        모든 신경망 레이어는 nn.Module을 상속받습니다
      </p>
    </AbsoluteFill>
  );
};
