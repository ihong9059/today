/**
 * Lesson 1-1 Scene 9: 정리
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene9_Summary: React.FC = () => {
  const frame = useCurrentFrame();

  const summaryPoints = [
    { concept: "AI 정의", content: "인간 지능을 모방한 컴퓨터 시스템", icon: "🧠" },
    { concept: "AI 역사", content: "1950년대 탄생 → 겨울 → 딥러닝 혁명", icon: "📚" },
    { concept: "규칙 기반", content: "전문가가 규칙 작성, 명확하지만 한계", icon: "📋" },
    { concept: "학습 기반", content: "데이터에서 패턴 학습, 유연하지만 블랙박스", icon: "🤖" },
    { concept: "현재 수준", content: "약인공지능 (특정 분야 전문가)", icon: "📍" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-1/scene9_summary.mp3")} />

      {/* 타이틀 */}
      <div
        style={{
          fontSize: 52,
          fontWeight: "bold",
          color: colors.white,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        🎯 오늘 배운 것 정리
      </div>

      {/* 요약 테이블 */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          backgroundColor: `${colors.gray[800]}60`,
          borderRadius: 24,
          overflow: "hidden",
          border: `2px solid ${colors.gray[700]}`,
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            backgroundColor: colors.primary[500] + "40",
            borderBottom: `2px solid ${colors.gray[700]}`,
          }}
        >
          <div style={{ padding: 25, fontSize: 28, fontWeight: "bold", color: colors.primary[300] }}>
            개념
          </div>
          <div style={{ padding: 25, fontSize: 28, fontWeight: "bold", color: colors.primary[300] }}>
            핵심 내용
          </div>
        </div>

        {/* 행들 */}
        {summaryPoints.map((point, i) => {
          const rowOpacity = interpolate(
            frame,
            [i * 30, (i + 1) * 30],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                borderBottom: i < summaryPoints.length - 1 ? `1px solid ${colors.gray[700]}` : "none",
                opacity: rowOpacity,
                transform: `translateX(${interpolate(rowOpacity, [0, 1], [-30, 0])}px)`,
              }}
            >
              <div
                style={{
                  padding: 25,
                  fontSize: 26,
                  color: colors.white,
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  backgroundColor: `${colors.gray[800]}50`,
                }}
              >
                <span style={{ fontSize: 30 }}>{point.icon}</span>
                {point.concept}
              </div>
              <div
                style={{
                  padding: 25,
                  fontSize: 26,
                  color: colors.gray[300],
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {point.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          marginTop: 50,
          textAlign: "center",
          opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#f9731620",
            border: `3px solid #f97316`,
            borderRadius: 20,
            padding: "25px 50px",
          }}
        >
          <p style={{ fontSize: 34, color: "#f97316", fontWeight: "bold" }}>
            💡 핵심: AI는 마법이 아니라 수학입니다!
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
