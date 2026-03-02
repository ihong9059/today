/**
 * Lesson 1-1 Scene 4: AI vs 일반 프로그램
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_VsProgram: React.FC = () => {
  const frame = useCurrentFrame();

  const comparisons = [
    { aspect: "동작 방식", normal: "정해진 규칙만 따름", ai: "데이터에서 스스로 학습" },
    { aspect: "예시", normal: "계산기 (1+1=2)", ai: "사진에서 고양이 인식" },
    { aspect: "유연성", normal: "새 상황에 대응 불가", ai: "처음 보는 데이터도 처리" },
    { aspect: "코드", normal: "모든 규칙 직접 작성", ai: "학습으로 규칙 발견" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-1/scene4_vs_program.mp3")} />

      {/* 타이틀 */}
      <div
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: colors.white,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        🤔 AI vs 일반 프로그램
      </div>

      {/* 비교 테이블 */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          backgroundColor: `${colors.gray[800]}80`,
          borderRadius: 24,
          overflow: "hidden",
          border: `2px solid ${colors.gray[700]}`,
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 2fr",
            backgroundColor: colors.gray[800],
          }}
        >
          <div style={{ padding: 25, fontSize: 28, fontWeight: "bold", color: colors.gray[400] }}>
            구분
          </div>
          <div
            style={{
              padding: 25,
              fontSize: 28,
              fontWeight: "bold",
              color: colors.gray[300],
              backgroundColor: `${colors.gray[700]}50`,
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            <span style={{ fontSize: 32 }}>📟</span>
            일반 프로그램
          </div>
          <div
            style={{
              padding: 25,
              fontSize: 28,
              fontWeight: "bold",
              color: colors.primary[300],
              backgroundColor: `${colors.primary[500]}20`,
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            <span style={{ fontSize: 32 }}>🤖</span>
            AI 프로그램
          </div>
        </div>

        {/* 행들 */}
        {comparisons.map((row, i) => {
          const rowOpacity = interpolate(
            frame,
            [30 + i * 60, 60 + i * 60],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 2fr",
                borderTop: `1px solid ${colors.gray[700]}`,
                opacity: rowOpacity,
                transform: `translateY(${interpolate(rowOpacity, [0, 1], [20, 0])}px)`,
              }}
            >
              <div
                style={{
                  padding: 25,
                  fontSize: 26,
                  fontWeight: "bold",
                  color: colors.gray[400],
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {row.aspect}
              </div>
              <div
                style={{
                  padding: 25,
                  fontSize: 26,
                  color: colors.gray[300],
                  backgroundColor: `${colors.gray[700]}30`,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {row.normal}
              </div>
              <div
                style={{
                  padding: 25,
                  fontSize: 26,
                  color: colors.white,
                  backgroundColor: `${colors.primary[500]}15`,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                ✅ {row.ai}
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
          opacity: interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p
          style={{
            fontSize: 36,
            color: "#22c55e",
            fontWeight: "bold",
          }}
        >
          💡 핵심: AI는 모든 규칙을 직접 작성하는 것이 아니라,<br />
          학습을 통해 스스로 규칙을 발견합니다!
        </p>
      </div>
    </AbsoluteFill>
  );
};
