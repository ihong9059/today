/**
 * Lesson 1-1 Scene 7: AI의 두 가지 접근법
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Approaches: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-1/scene7_approaches.mp3")} />

      {/* 타이틀 */}
      <div
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: colors.white,
          marginBottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 50 }}>📦</span>
        <span>3. AI의 두 가지 접근법</span>
      </div>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 규칙 기반 AI */}
        <div
          style={{
            flex: 1,
            backgroundColor: `${colors.gray[700]}30`,
            border: `3px solid ${colors.gray[600]}`,
            borderRadius: 24,
            padding: 35,
            opacity: interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [0, 40], [-50, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 25 }}>
            <span style={{ fontSize: 50 }}>📋</span>
            <h3 style={{ fontSize: 34, color: colors.gray[300], fontWeight: "bold" }}>
              규칙 기반 AI
            </h3>
          </div>
          <p style={{ fontSize: 24, color: colors.gray[400], marginBottom: 20 }}>
            (전문가 시스템)
          </p>

          {/* 예시 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              marginBottom: 25,
              fontFamily: "monospace",
              fontSize: 22,
              color: colors.gray[300],
              opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <p style={{ color: "#f97316", marginBottom: 10 }}>// 스팸 필터 규칙</p>
            <p>IF "무료" in 제목</p>
            <p style={{ paddingLeft: 20 }}>AND "당첨" in 본문:</p>
            <p style={{ paddingLeft: 40, color: "#ef4444" }}>→ 스팸</p>
          </div>

          {/* 장단점 */}
          <div style={{ opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" }) }}>
            <p style={{ fontSize: 24, color: "#22c55e", marginBottom: 10 }}>
              ✅ 장점: 논리가 명확, 설명 가능
            </p>
            <p style={{ fontSize: 24, color: "#ef4444" }}>
              ❌ 단점: 모든 규칙을 사람이 작성해야 함
            </p>
          </div>
        </div>

        {/* 학습 기반 AI */}
        <div
          style={{
            flex: 1,
            backgroundColor: `${colors.primary[500]}15`,
            border: `3px solid ${colors.primary[400]}`,
            borderRadius: 24,
            padding: 35,
            opacity: interpolate(frame, [300, 340], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [300, 340], [50, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 25 }}>
            <span style={{ fontSize: 50 }}>🤖</span>
            <h3 style={{ fontSize: 34, color: colors.primary[300], fontWeight: "bold" }}>
              학습 기반 AI
            </h3>
          </div>
          <p style={{ fontSize: 24, color: colors.primary[400], marginBottom: 20 }}>
            (머신러닝 / 딥러닝)
          </p>

          {/* 예시 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              marginBottom: 25,
              fontSize: 22,
              color: colors.gray[300],
              opacity: interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <p style={{ color: colors.primary[400], marginBottom: 10 }}>📊 데이터로 학습:</p>
            <p>스팸 10,000개 + 정상 10,000개</p>
            <p style={{ marginTop: 10, color: "#22c55e" }}>
              → AI가 스스로 패턴 발견!
            </p>
          </div>

          {/* 장단점 */}
          <div style={{ opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" }) }}>
            <p style={{ fontSize: 24, color: "#22c55e", marginBottom: 10 }}>
              ✅ 장점: 사람이 못 찾는 패턴도 발견
            </p>
            <p style={{ fontSize: 24, color: "#ef4444" }}>
              ❌ 단점: "왜?"를 설명하기 어려움
            </p>
          </div>
        </div>
      </div>

      {/* 비교 결론 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#22c55e20",
            border: `2px solid #22c55e`,
            borderRadius: 16,
            padding: "15px 40px",
          }}
        >
          <p style={{ fontSize: 28, color: "#22c55e", fontWeight: "bold" }}>
            현재 AI의 주류 = 학습 기반 AI (딥러닝)
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
