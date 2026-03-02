/**
 * Lesson 1-4 Scene 10: 아웃트로
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene10_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const summaryItems = [
    { key: "학습", value: "최적의 가중치/편향 찾기" },
    { key: "오차", value: "정답 - 예측, 방향 결정" },
    { key: "공식", value: "w = w + η × error × input" },
    { key: "학습률", value: "조정 크기 결정 (0.01~0.1)" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        padding: 50,
      }}
    >
      {/* 제목 */}
      <div style={{ textAlign: "center", marginBottom: 30, opacity: titleOpacity }}>
        <h1 style={{ fontSize: 55, color: colors.white, marginBottom: 10 }}>
          오늘 배운 내용 정리
        </h1>
      </div>

      {/* 요약 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 25,
          marginBottom: 40,
        }}
      >
        {summaryItems.map((item, i) => {
          const itemStart = 30 + i * 40;
          const itemOpacity = interpolate(frame, [itemStart, itemStart + 30], [0, 1], {
            extrapolateRight: "clamp",
          });
          const itemScale = spring({
            frame: frame - itemStart,
            fps,
            config: { damping: 12 },
          });

          return (
            <div
              key={i}
              style={{
                backgroundColor: colors.gray[800] + "90",
                border: "2px solid " + colors.primary[500],
                borderRadius: 20,
                padding: 25,
                width: 220,
                textAlign: "center",
                opacity: itemOpacity,
                transform: `scale(${Math.min(itemScale, 1)})`,
              }}
            >
              <div style={{ fontSize: 50, marginBottom: 10 }}>
                {i === 0 ? "🎓" : i === 1 ? "📊" : i === 2 ? "📐" : "⚡"}
              </div>
              <div style={{ fontSize: 24, color: colors.primary[300], fontWeight: "bold", marginBottom: 10 }}>
                {item.key}
              </div>
              <div style={{ fontSize: 18, color: colors.gray[300] }}>
                {item.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          textAlign: "center",
          marginTop: 30,
          opacity: interpolate(frame, [200, 240], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#22c55e20",
            border: "2px solid #22c55e",
            borderRadius: 20,
            padding: "25px 50px",
          }}
        >
          <span style={{ fontSize: 28, color: colors.gray[400] }}>다음 강의</span>
          <h3
            style={{
              fontSize: 42,
              color: "#22c55e",
              fontWeight: "bold",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Lesson 1-5: AND, OR, NOT 게이트
          </h3>
          <p style={{ fontSize: 22, color: colors.gray[300] }}>
            퍼셉트론으로 논리 게이트 직접 구현하기!
          </p>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 30,
          opacity: interpolate(frame, [280, 320], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            backgroundColor: "#ef4444",
            borderRadius: 50,
            padding: "15px 40px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 30 }}>👍</span>
          <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>좋아요</span>
        </div>
        <div
          style={{
            backgroundColor: "#ef4444",
            borderRadius: 50,
            padding: "15px 40px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 30 }}>🔔</span>
          <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>구독</span>
        </div>
      </div>

      {/* 시리즈 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          color: colors.gray[500],
          fontSize: 20,
        }}
      >
        AI 기초 교육 시리즈 - Level 1
      </div>
    </AbsoluteFill>
  );
};
