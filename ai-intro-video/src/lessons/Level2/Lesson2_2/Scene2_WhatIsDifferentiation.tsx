/**
 * Scene 2: 미분이란?
 * 변화율, 접선의 기울기 개념
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_WhatIsDifferentiation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 자동차 애니메이션
  const carProgress = interpolate(frame, [60, 300], [0, 1], { extrapolateRight: "clamp" });
  const carX = 150 + carProgress * 400;

  // 속도 표시
  const speedOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });

  // 그래프 기울기 설명
  const slopeOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-2/scene2.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        미분이란? <span style={{ color: "#a855f7" }}>변화율</span>을 구하는 것!
      </h1>

      <div style={{ display: "flex", gap: 60, marginTop: 40 }}>
        {/* 왼쪽: 자동차 예시 */}
        <div
          style={{
            flex: 1,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 40,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h2 style={{ fontSize: 36, color: "#22c55e", marginBottom: 30 }}>
            실생활 예시: 속도
          </h2>

          {/* 도로 */}
          <div style={{ position: "relative", height: 120, backgroundColor: "#374151", borderRadius: 10 }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 4, backgroundColor: "#fbbf24" }} />

            {/* 자동차 */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: carX,
                transform: "translateY(-50%)",
                fontSize: 50,
              }}
            >
              🚗
            </div>
          </div>

          {/* 속도 설명 */}
          <div
            style={{
              marginTop: 30,
              fontSize: 28,
              color: colors.white,
              opacity: speedOpacity,
            }}
          >
            <div style={{ marginBottom: 15 }}>
              <span style={{ color: "#fbbf24" }}>위치의 변화율</span> = 속도
            </div>
            <div style={{ fontSize: 24, color: "#9ca3af" }}>
              1시간에 60km 이동 → 시속 60km/h
            </div>
          </div>

          {/* 수식 */}
          <div
            style={{
              marginTop: 30,
              padding: 20,
              backgroundColor: "#1f2937",
              borderRadius: 10,
              fontSize: 32,
              color: "#a855f7",
              textAlign: "center",
              opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            속도 = Δ위치 / Δ시간
          </div>
        </div>

        {/* 오른쪽: 그래프 기울기 */}
        <div
          style={{
            flex: 1,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 40,
            opacity: slopeOpacity,
          }}
        >
          <h2 style={{ fontSize: 36, color: "#3b82f6", marginBottom: 30 }}>
            그래프에서의 미분
          </h2>

          <svg width={500} height={280}>
            {/* 좌표축 */}
            <line x1={50} y1={230} x2={450} y2={230} stroke="#6b7280" strokeWidth={2} />
            <line x1={50} y1={230} x2={50} y2={30} stroke="#6b7280" strokeWidth={2} />

            {/* 곡선 */}
            <path
              d="M 50 200 Q 150 180, 250 100 T 450 50"
              stroke="#a855f7"
              strokeWidth={4}
              fill="none"
            />

            {/* 접선 */}
            <line
              x1={150}
              y1={200}
              x2={350}
              y2={80}
              stroke="#22c55e"
              strokeWidth={3}
              strokeDasharray="10,5"
            />

            {/* 접점 */}
            <circle cx={250} cy={140} r={10} fill="#fbbf24" />

            {/* 레이블 */}
            <text x={260} y={125} fill={colors.white} fontSize={20}>접점</text>
            <text x={360} y={90} fill="#22c55e" fontSize={22} fontWeight="bold">접선의 기울기</text>
          </svg>

          {/* 핵심 포인트 */}
          <div style={{ marginTop: 20 }}>
            {[
              { text: "기울기 양수 → 함수 증가", color: "#22c55e", delay: 400 },
              { text: "기울기 음수 → 함수 감소", color: "#ef4444", delay: 500 },
              { text: "기울기 0 → 최솟값/최댓값!", color: "#fbbf24", delay: 600 },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  fontSize: 24,
                  color: item.color,
                  marginBottom: 10,
                  opacity: interpolate(frame, [item.delay, item.delay + 30], [0, 1], { extrapolateRight: "clamp" }),
                }}
              >
                ✓ {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
