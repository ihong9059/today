/**
 * Lesson 1-4 Scene 5: 가중치 업데이트 공식
 */

import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

export const Scene5_UpdateRule: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const roles = [
    { symbol: "오차", desc: "방향 결정", detail: "+1이면 증가, -1이면 감소", color: "#ef4444" },
    { symbol: "입력값", desc: "기여도", detail: "입력이 클수록 더 많이 조정", color: "#3b82f6" },
    { symbol: "학습률", desc: "보폭 결정", detail: "한 번에 얼마나 크게 바꿀지", color: "#f97316" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #0f172a 100%)`,
        padding: 60,
      }}
    >
      {/* 제목 */}
      <div style={{ textAlign: "center", marginBottom: 40, opacity: titleOpacity }}>
        <h1 style={{ fontSize: 60, color: colors.white, marginBottom: 15 }}>
          가중치 업데이트 공식
        </h1>
        <p style={{ fontSize: 30, color: colors.gray[400] }}>
          퍼셉트론 학습 규칙
        </p>
      </div>

      {/* 메인 공식 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
          opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: colors.gray[800],
            border: "3px solid " + colors.primary[500],
            borderRadius: 20,
            padding: "30px 50px",
          }}
        >
          <div style={{ fontSize: 42, color: colors.white, fontFamily: "monospace", marginBottom: 15 }}>
            <span style={{ color: "#22c55e" }}>w</span>
            <sub style={{ color: colors.gray[400] }}>new</sub> =
            <span style={{ color: colors.gray[400] }}> w</span>
            <sub style={{ color: colors.gray[500] }}>old</sub> +
            <span style={{ color: "#f97316" }}> η</span> ×
            <span style={{ color: "#ef4444" }}> error</span> ×
            <span style={{ color: "#3b82f6" }}> input</span>
          </div>
          <div style={{ fontSize: 36, color: colors.white, fontFamily: "monospace" }}>
            <span style={{ color: "#22c55e" }}>b</span>
            <sub style={{ color: colors.gray[400] }}>new</sub> =
            <span style={{ color: colors.gray[400] }}> b</span>
            <sub style={{ color: colors.gray[500] }}>old</sub> +
            <span style={{ color: "#f97316" }}> η</span> ×
            <span style={{ color: "#ef4444" }}> error</span>
          </div>
        </div>
      </div>

      {/* 각 요소의 역할 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          marginTop: 40,
        }}
      >
        {roles.map((role, i) => {
          const roleStart = 80 + i * 60;
          const roleOpacity = interpolate(frame, [roleStart, roleStart + 40], [0, 1], {
            extrapolateRight: "clamp",
          });
          const roleTranslateY = interpolate(frame, [roleStart, roleStart + 40], [30, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                backgroundColor: colors.gray[800] + "90",
                border: `2px solid ${role.color}`,
                borderRadius: 20,
                padding: 30,
                width: 280,
                textAlign: "center",
                opacity: roleOpacity,
                transform: `translateY(${roleTranslateY}px)`,
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  backgroundColor: role.color + "30",
                  border: `3px solid ${role.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <span style={{ fontSize: 24, color: role.color, fontWeight: "bold" }}>
                  {role.symbol}
                </span>
              </div>
              <div style={{ fontSize: 28, color: role.color, fontWeight: "bold", marginBottom: 10 }}>
                {role.desc}
              </div>
              <div style={{ fontSize: 18, color: colors.gray[300], lineHeight: 1.4 }}>
                {role.detail}
              </div>
            </div>
          );
        })}
      </div>

      {/* 요약 */}
      <div
        style={{
          textAlign: "center",
          marginTop: 50,
          opacity: interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p style={{ fontSize: 26, color: colors.gray[300] }}>
          이 공식으로 퍼셉트론이 자동으로 최적의 가중치를 찾아갑니다!
        </p>
      </div>
    </AbsoluteFill>
  );
};
