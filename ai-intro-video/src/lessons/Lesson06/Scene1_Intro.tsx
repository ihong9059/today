/**
 * Lesson 0-6: Matplotlib 기초 - Scene 1: Intro
 * Matplotlib 소개 및 시각화의 중요성
 */

import { AbsoluteFill, interpolate, useCurrentFrame, spring } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L06_Scene1_Intro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  const titleSpring = spring({
    frame,
    fps: FPS,
    config: { damping: 15, stiffness: 100 },
  });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const reasonsOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateRight: "clamp",
  });

  const whyOpacity = interpolate(frame, [200, 230], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        padding: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span
          style={{
            backgroundColor: colors.level[0],
            padding: "12px 24px",
            borderRadius: 30,
            fontSize: 24,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          레벨 0 · 레슨 6 (마지막)
        </span>
      </div>

      {/* Matplotlib 로고 및 제목 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          marginBottom: 30,
          transform: `scale(${titleSpring})`,
        }}
      >
        <span style={{ fontSize: 120 }}>📊</span>
        <h1
          style={{
            fontSize: 90,
            fontWeight: "bold",
            color: colors.white,
            margin: 0,
          }}
        >
          Matplotlib
        </h1>
      </div>

      {/* 부제목 */}
      <p
        style={{
          fontSize: 38,
          color: "#60a5fa",
          marginBottom: 50,
          opacity: subtitleOpacity,
        }}
      >
        Python 시각화의 표준 라이브러리
      </p>

      {/* 시각화의 중요성 3가지 */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginBottom: 40,
          opacity: reasonsOpacity,
        }}
      >
        {[
          { icon: "👁️", title: "학습 과정 확인", desc: "손실/정확도 모니터링" },
          { icon: "📈", title: "데이터 이해", desc: "분포와 패턴 파악" },
          { icon: "🎯", title: "결과 전달", desc: "설득력 있는 발표" },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: colors.gray[800],
              padding: "25px 35px",
              borderRadius: 16,
              border: `3px solid ${["#22c55e", "#3b82f6", "#f97316"][idx]}`,
              textAlign: "center",
              width: 220,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 10 }}>{item.icon}</div>
            <div
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: ["#22c55e", "#3b82f6", "#f97316"][idx],
                marginBottom: 8,
              }}
            >
              {item.title}
            </div>
            <div style={{ fontSize: 16, color: colors.gray[400] }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          backgroundColor: "#f9731620",
          border: "2px solid #f97316",
          borderRadius: 16,
          padding: "20px 40px",
          opacity: whyOpacity,
        }}
      >
        <span style={{ fontSize: 28, color: "#f97316", fontWeight: "bold" }}>
          💡 오늘 배울 내용: 그래프 그리기부터 AI 학습 곡선까지
        </span>
      </div>
    </AbsoluteFill>
  );
};
