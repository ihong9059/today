/**
 * Lesson 1-4 Scene 4: 오차(Error) 계산
 */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

export const Scene4_Error: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const errorCases = [
    {
      correct: 1,
      predict: 0,
      error: "+1",
      meaning: "더 크게 반응해야 해!",
      color: "#3b82f6",
      emoji: "⬆️",
    },
    {
      correct: 0,
      predict: 1,
      error: "-1",
      meaning: "덜 반응해야 해!",
      color: "#ef4444",
      emoji: "⬇️",
    },
    {
      correct: 1,
      predict: 1,
      error: "0",
      meaning: "완벽해! 그대로 유지",
      color: "#22c55e",
      emoji: "✅",
    },
    {
      correct: 0,
      predict: 0,
      error: "0",
      meaning: "완벽해! 그대로 유지",
      color: "#22c55e",
      emoji: "✅",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #312e81 100%)`,
        padding: 60,
      }}
    >
      {/* 제목 */}
      <div style={{ textAlign: "center", marginBottom: 30, opacity: titleOpacity }}>
        <h1 style={{ fontSize: 60, color: colors.white, marginBottom: 15 }}>
          오차(Error) 계산
        </h1>
        <p style={{ fontSize: 30, color: colors.gray[400] }}>
          학습의 핵심
        </p>
      </div>

      {/* 오차 공식 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: colors.primary[600] + "40",
            border: "3px solid " + colors.primary[500],
            borderRadius: 20,
            padding: "20px 60px",
          }}
        >
          <span style={{ fontSize: 48, color: colors.white, fontFamily: "monospace" }}>
            오차 = 정답 - 예측
          </span>
        </div>
      </div>

      {/* 오차 케이스들 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 25,
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {errorCases.map((ec, i) => {
          const caseStart = 60 + i * 50;
          const caseOpacity = interpolate(frame, [caseStart, caseStart + 30], [0, 1], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                backgroundColor: colors.gray[800] + "90",
                border: `2px solid ${ec.color}`,
                borderRadius: 20,
                padding: 25,
                opacity: caseOpacity,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              {/* 계산 */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 10 }}>
                  정답 = {ec.correct}, 예측 = {ec.predict}
                </div>
                <div style={{ fontSize: 32, color: ec.color, fontWeight: "bold", marginBottom: 10 }}>
                  오차 = {ec.correct} - {ec.predict} = {ec.error}
                </div>
                <div style={{ fontSize: 22, color: colors.white }}>
                  "{ec.meaning}"
                </div>
              </div>

              {/* 이모지 */}
              <div style={{ fontSize: 60 }}>{ec.emoji}</div>
            </div>
          );
        })}
      </div>

      {/* 요약 */}
      <div
        style={{
          textAlign: "center",
          marginTop: 40,
          opacity: interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p style={{ fontSize: 26, color: colors.gray[300] }}>
          오차가 가중치를 어느 방향으로, 얼마나 바꿔야 하는지 알려줍니다!
        </p>
      </div>
    </AbsoluteFill>
  );
};
