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

  // 정리 항목들
  const summaryItems = [
    { icon: "📝", text: "토큰화 → 어휘 사전 → 정수 인코딩" },
    { icon: "🔢", text: "nn.Embedding으로 밀집 벡터 변환" },
    { icon: "📊", text: "평균 풀링 → 분류기 → 예측" },
  ];

  const summaryOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 다음 강의 예고
  const nextOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });

  // 구독 & 좋아요
  const ctaOpacity = interpolate(frame, [750, 780], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-3/scene7.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
          textShadow: "0 4px 20px rgba(249,115,22,0.5)",
        }}
      >
        오늘의 정리
      </h1>

      {/* 정리 항목 */}
      <div
        style={{
          opacity: summaryOpacity,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginBottom: 50,
        }}
      >
        {summaryItems.map((item, i) => {
          const delay = 90 + i * 40;
          const x = spring({ frame: frame - delay, fps, from: -100, to: 0, durationInFrames: 30 });
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                backgroundColor: "rgba(255,255,255,0.1)",
                padding: "20px 40px",
                borderRadius: 16,
                transform: `translateX(${x}px)`,
                opacity,
                border: `2px solid ${colors.level[4]}`,
              }}
            >
              <span style={{ fontSize: 40 }}>{item.icon}</span>
              <span style={{ fontSize: 28, color: colors.white }}>{item.text}</span>
            </div>
          );
        })}
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          opacity: nextOpacity,
          backgroundColor: colors.level[4],
          padding: "25px 50px",
          borderRadius: 20,
          marginBottom: 40,
        }}
      >
        <div style={{ fontSize: 24, color: colors.white, marginBottom: 10 }}>
          다음 시간
        </div>
        <div style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
          nn.Module 기초 - 커스텀 모듈 만들기
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaOpacity,
          display: "flex",
          gap: 30,
        }}
      >
        <div
          style={{
            backgroundColor: "#ef4444",
            padding: "20px 40px",
            borderRadius: 50,
            display: "flex",
            alignItems: "center",
            gap: 15,
          }}
        >
          <span style={{ fontSize: 32 }}>👍</span>
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>좋아요</span>
        </div>

        <div
          style={{
            backgroundColor: "#ef4444",
            padding: "20px 40px",
            borderRadius: 50,
            display: "flex",
            alignItems: "center",
            gap: 15,
          }}
        >
          <span style={{ fontSize: 32 }}>🔔</span>
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>구독</span>
        </div>
      </div>

      {/* 실습 코드 안내 */}
      <div
        style={{
          opacity: ctaOpacity,
          marginTop: 30,
          fontSize: 22,
          color: colors.gray[400],
        }}
      >
        영상 설명란에서 실습 코드를 확인하세요!
      </div>

      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          gap: 20,
        }}
      >
        <div
          style={{
            backgroundColor: colors.level[4],
            color: colors.white,
            padding: "10px 25px",
            borderRadius: 25,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Lesson 4-3 완료!
        </div>
      </div>
    </AbsoluteFill>
  );
};
