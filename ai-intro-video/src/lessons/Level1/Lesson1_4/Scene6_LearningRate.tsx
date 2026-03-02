/**
 * Lesson 1-4 Scene 6: 학습률 (Learning Rate)
 */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

export const Scene6_LearningRate: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const lrCases = [
    {
      title: "학습률이 너무 크면",
      value: "η = 2.0",
      problem: "목표를 뛰어넘음!",
      result: "불안정, 발산 위험",
      color: "#ef4444",
      emoji: "💥",
    },
    {
      title: "학습률이 너무 작으면",
      value: "η = 0.0001",
      problem: "너무 느림...",
      result: "도달하지만 오래 걸림",
      color: "#eab308",
      emoji: "🐢",
    },
    {
      title: "적절한 학습률",
      value: "η = 0.1",
      problem: "적당한 속도!",
      result: "안정적으로 목표 도달",
      color: "#22c55e",
      emoji: "🎯",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        padding: 60,
      }}
    >
      {/* 제목 */}
      <div style={{ textAlign: "center", marginBottom: 30, opacity: titleOpacity }}>
        <h1 style={{ fontSize: 60, color: colors.white, marginBottom: 15 }}>
          학습률 (Learning Rate)
        </h1>
        <p style={{ fontSize: 30, color: colors.gray[400] }}>
          한 번에 얼마나 크게 바꿀지 결정
        </p>
      </div>

      {/* 산 등반 비유 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
          opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 50 }}>🏔️</span>
        <p style={{ fontSize: 24, color: colors.gray[300], marginTop: 10 }}>
          산 정상(최적의 가중치)에 올라가는 것과 같습니다
        </p>
      </div>

      {/* 학습률 케이스들 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          marginBottom: 40,
        }}
      >
        {lrCases.map((lrc, i) => {
          const caseStart = 60 + i * 70;
          const caseOpacity = interpolate(frame, [caseStart, caseStart + 40], [0, 1], {
            extrapolateRight: "clamp",
          });
          const isGood = i === 2;

          return (
            <div
              key={i}
              style={{
                backgroundColor: isGood ? lrc.color + "20" : colors.gray[800] + "90",
                border: `3px solid ${lrc.color}`,
                borderRadius: 20,
                padding: 30,
                width: 300,
                textAlign: "center",
                opacity: caseOpacity,
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 15 }}>{lrc.emoji}</div>
              <div style={{ fontSize: 22, color: lrc.color, fontWeight: "bold", marginBottom: 10 }}>
                {lrc.title}
              </div>
              <div
                style={{
                  backgroundColor: colors.gray[700],
                  borderRadius: 10,
                  padding: "10px 20px",
                  marginBottom: 15,
                  display: "inline-block",
                }}
              >
                <span style={{ fontSize: 28, color: lrc.color, fontFamily: "monospace" }}>
                  {lrc.value}
                </span>
              </div>
              <div style={{ fontSize: 20, color: colors.white, marginBottom: 10 }}>
                {lrc.problem}
              </div>
              <div style={{ fontSize: 18, color: colors.gray[400] }}>
                {lrc.result}
              </div>
            </div>
          );
        })}
      </div>

      {/* 추천 값 */}
      <div
        style={{
          textAlign: "center",
          opacity: interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#22c55e20",
            border: "2px solid #22c55e",
            borderRadius: 20,
            padding: "20px 50px",
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
            추천: 0.01 ~ 0.1 사이에서 시작!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
