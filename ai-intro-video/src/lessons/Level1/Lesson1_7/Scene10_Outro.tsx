/**
 * Scene 10: 아웃트로
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene10_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, #0f172a 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-7/scene10_outro.mp3")} />

      {/* 레슨 완료 배지 */}
      <div
        style={{
          backgroundColor: "#22c55e",
          padding: "15px 40px",
          borderRadius: 40,
          color: colors.white,
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        Lesson 1-7 완료!
      </div>

      {/* 제목 */}
      <h2
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 20,
          opacity: titleOpacity,
        }}
      >
        다층 퍼셉트론 기초 완료
      </h2>

      {/* 부제목 */}
      <div
        style={{
          fontSize: 32,
          color: "#60a5fa",
          marginBottom: 50,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        XOR 문제 해결의 핵심을 배웠습니다!
      </div>

      {/* 오늘 배운 것 */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginBottom: 50,
          opacity: interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {[
          { icon: "🏗️", label: "다층 구조" },
          { icon: "🧠", label: "은닉층" },
          { icon: "✅", label: "XOR 해결" },
          { icon: "📈", label: "딥러닝 기초" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              backgroundColor: colors.gray[800],
              padding: "20px 30px",
              borderRadius: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 40 }}>{item.icon}</div>
            <div style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: "#f59e0b" + "30",
          border: "2px solid #f59e0b",
          padding: "25px 50px",
          borderRadius: 20,
          textAlign: "center",
          marginBottom: 40,
          opacity: interpolate(frame, [140, 180], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ color: "#f59e0b", fontSize: 24, marginBottom: 10 }}>다음 시간 예고</div>
        <div style={{ color: colors.white, fontSize: 32, fontWeight: "bold" }}>역전파 알고리즘</div>
        <div style={{ color: colors.gray[300], fontSize: 20, marginTop: 10 }}>
          네트워크를 어떻게 학습시킬까?
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          display: "flex",
          gap: 30,
          opacity: interpolate(frame, [220, 260], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            backgroundColor: "#ef4444",
            padding: "15px 40px",
            borderRadius: 30,
            color: colors.white,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          👍 좋아요
        </div>
        <div
          style={{
            backgroundColor: "#3b82f6",
            padding: "15px 40px",
            borderRadius: 30,
            color: colors.white,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          🔔 구독
        </div>
      </div>

      {/* 시리즈 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          color: colors.gray[400],
          fontSize: 24,
          opacity: interpolate(frame, [280, 320], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        AI 기초 교육 시리즈 | Level 1 - AI 기초 이론
      </div>
    </AbsoluteFill>
  );
};
