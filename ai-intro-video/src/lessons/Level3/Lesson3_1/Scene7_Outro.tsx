/**
 * Scene 7: 아웃트로
 * 요약 및 다음 강의 예고
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 요약 포인트들
  const point1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const point2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const point3Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const point4Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });

  // 다음 강의
  const nextOpacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });

  // 마무리
  const endOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });

  const summaryItems = [
    { text: "손실 함수 = 모델이 얼마나 틀렸는지 측정", color: colors.level[3], delay: point1Opacity },
    { text: "회귀 → MSE (평균 제곱 오차)", color: "#60a5fa", delay: point2Opacity },
    { text: "분류 → Cross-Entropy (교차 엔트로피)", color: "#a855f7", delay: point3Opacity },
    { text: "손실 지형에서 가장 낮은 곳 = 최적해", color: "#22c55e", delay: point4Opacity },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #4c1d1d 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-1/scene7.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        📝 오늘 배운 내용
      </h1>

      {/* 요약 포인트들 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 25,
          marginBottom: 50,
        }}
      >
        {summaryItems.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: colors.gray[800],
              padding: "20px 40px",
              borderRadius: 16,
              borderLeft: `6px solid ${item.color}`,
              opacity: item.delay,
              transform: `translateX(${interpolate(item.delay, [0, 1], [50, 0])}px)`,
            }}
          >
            <span style={{ color: colors.white, fontSize: 28 }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: "#60a5fa20",
          border: "2px solid #60a5fa",
          padding: "30px 50px",
          borderRadius: 20,
          textAlign: "center",
          marginBottom: 40,
          opacity: nextOpacity,
        }}
      >
        <div style={{ color: "#60a5fa", fontSize: 24, marginBottom: 10 }}>
          다음 강의
        </div>
        <div style={{ color: colors.white, fontSize: 36, fontWeight: "bold" }}>
          Lesson 3-2: 경사하강법 기본
        </div>
        <div style={{ color: colors.gray[400], fontSize: 22, marginTop: 10 }}>
          손실 지형에서 내리막을 따라 내려가는 알고리즘 🏔️
        </div>
      </div>

      {/* 마무리 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: endOpacity,
        }}
      >
        <div style={{ fontSize: 36, color: "#fbbf24", fontWeight: "bold" }}>
          Level 3 첫 강의 수고하셨습니다! 🎉
        </div>
        <div style={{ fontSize: 28, color: colors.gray[400], marginTop: 15 }}>
          다음 시간에 만나요!
        </div>
      </div>
    </AbsoluteFill>
  );
};
