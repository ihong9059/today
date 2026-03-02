/**
 * Lesson 1-5: AND, OR, NOT 게이트
 * Scene 2: 논리 게이트란?
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_LogicGates: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 컴퓨터 그림 애니메이션
  const computerScale = spring({ frame: frame - 40, fps, config: { damping: 12 } });

  // 입력/출력 화살표 애니메이션
  const arrowProgress = interpolate(frame, [80, 130], [0, 1], { extrapolateRight: "clamp" });

  // 게이트 박스들 애니메이션
  const gatesOpacity = interpolate(frame, [150, 190], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1a1a2e 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-5/scene2_logic_gates.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          opacity: titleOpacity,
          marginBottom: 50,
        }}
      >
        논리 게이트란?
      </h2>

      {/* 논리 게이트 개념도 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          marginBottom: 60,
          transform: `scale(${computerScale})`,
        }}
      >
        {/* 입력 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              width: 100,
              height: 60,
              backgroundColor: "#3b82f6",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            0
          </div>
          <div
            style={{
              width: 100,
              height: 60,
              backgroundColor: "#22c55e",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            1
          </div>
        </div>

        {/* 화살표 입력 */}
        <div
          style={{
            fontSize: 48,
            color: colors.gray[400],
            opacity: arrowProgress,
          }}
        >
          →
        </div>

        {/* 논리 게이트 박스 */}
        <div
          style={{
            width: 180,
            height: 140,
            background: `linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)`,
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 40px rgba(99, 102, 241, 0.4)",
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>논리</span>
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>게이트</span>
        </div>

        {/* 화살표 출력 */}
        <div
          style={{
            fontSize: 48,
            color: colors.gray[400],
            opacity: arrowProgress,
          }}
        >
          →
        </div>

        {/* 출력 */}
        <div
          style={{
            width: 100,
            height: 80,
            backgroundColor: "#f59e0b",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 42,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          0/1
        </div>
      </div>

      {/* 3대 게이트 소개 */}
      <div
        style={{
          display: "flex",
          gap: 50,
          opacity: gatesOpacity,
        }}
      >
        {/* AND */}
        <div
          style={{
            width: 200,
            padding: 25,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            border: "3px solid #3b82f6",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 42, fontWeight: "bold", color: "#3b82f6", marginBottom: 10 }}>
            AND
          </div>
          <div style={{ fontSize: 22, color: colors.gray[300] }}>
            둘 다 참일 때만
            <br />
            참
          </div>
        </div>

        {/* OR */}
        <div
          style={{
            width: 200,
            padding: 25,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            border: "3px solid #22c55e",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 42, fontWeight: "bold", color: "#22c55e", marginBottom: 10 }}>
            OR
          </div>
          <div style={{ fontSize: 22, color: colors.gray[300] }}>
            하나라도 참이면
            <br />
            참
          </div>
        </div>

        {/* NOT */}
        <div
          style={{
            width: 200,
            padding: 25,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            border: "3px solid #ef4444",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 42, fontWeight: "bold", color: "#ef4444", marginBottom: 10 }}>
            NOT
          </div>
          <div style={{ fontSize: 22, color: colors.gray[300] }}>
            입력을
            <br />
            반전
          </div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          backgroundColor: colors.gray[800] + "dd",
          padding: "20px 50px",
          borderRadius: 15,
          opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 28, color: colors.primary[300] }}>
          이 세 가지로 모든 논리 연산을 만들 수 있습니다!
        </span>
      </div>
    </AbsoluteFill>
  );
};
