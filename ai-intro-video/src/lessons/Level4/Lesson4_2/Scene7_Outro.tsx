/**
 * Scene 7: 아웃트로
 * 요약 및 다음 레슨 예고
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const summaryOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const nextOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });
  const subscribeOpacity = interpolate(frame, [700, 730], [0, 1], { extrapolateRight: "clamp" });

  const summaryItems = [
    { icon: "🔲", text: "CNN = 이미지 특화 신경망" },
    { icon: "🔍", text: "Conv2d로 특징 추출" },
    { icon: "📉", text: "MaxPool2d로 크기 축소" },
    { icon: "🎯", text: "FC층으로 최종 분류" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-2/scene7.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 52,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        오늘 배운 내용
      </h2>

      {/* 요약 */}
      <div
        style={{
          display: "flex",
          gap: 30,
          opacity: summaryOpacity,
          marginBottom: 50,
        }}
      >
        {summaryItems.map((item, i) => {
          const delay = 90 + i * 40;
          const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 30 });
          return (
            <div
              key={i}
              style={{
                backgroundColor: colors.gray[800],
                padding: "25px 35px",
                borderRadius: 16,
                textAlign: "center",
                transform: `scale(${Math.max(0, scale)})`,
                border: `2px solid ${colors.level[4]}`,
                minWidth: 200,
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ color: colors.white, fontSize: 22 }}>{item.text}</div>
            </div>
          );
        })}
      </div>

      {/* 다음 레슨 예고 */}
      <div
        style={{
          opacity: nextOpacity,
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          padding: "30px 60px",
          borderRadius: 20,
          border: "2px solid #a855f7",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <div style={{ color: "#a855f7", fontSize: 24, marginBottom: 15 }}>다음 강의</div>
        <div style={{ color: colors.white, fontSize: 36, fontWeight: "bold", marginBottom: 10 }}>
          Lesson 4-3: 텍스트 분류
        </div>
        <div style={{ color: colors.gray[300], fontSize: 22 }}>
          텍스트 데이터를 신경망으로 처리하는 방법
        </div>
      </div>

      {/* 구독 요청 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: subscribeOpacity,
          display: "flex",
          alignItems: "center",
          gap: 30,
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          padding: "25px 50px",
          borderRadius: 20,
          border: "2px solid #22c55e",
        }}
      >
        <span style={{ fontSize: 48 }}>👍</span>
        <div>
          <div style={{ color: colors.white, fontSize: 28, fontWeight: "bold" }}>
            구독과 좋아요 부탁드립니다!
          </div>
          <div style={{ color: colors.gray[300], fontSize: 20 }}>
            영상 설명란에서 실습 코드를 확인하세요
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
