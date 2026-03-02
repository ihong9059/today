/**
 * Lesson 1-6: XOR 문제와 한계
 * Scene 5: XOR 좌표 플롯
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_XorPlot: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 좌표계 애니메이션
  const plotOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" });

  // 점들 순차 애니메이션
  const dot1Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });
  const dot2Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const dot3Opacity = interpolate(frame, [210, 240], [0, 1], { extrapolateRight: "clamp" });
  const dot4Opacity = interpolate(frame, [270, 300], [0, 1], { extrapolateRight: "clamp" });

  // 실패 시도 선 애니메이션
  const line1Progress = interpolate(frame, [350, 400], [0, 1], { extrapolateRight: "clamp" });
  const line1Opacity = interpolate(frame, [350, 400, 500, 550], [0, 0.7, 0.7, 0.3], { extrapolateRight: "clamp" });
  const line2Progress = interpolate(frame, [450, 500], [0, 1], { extrapolateRight: "clamp" });
  const line2Opacity = interpolate(frame, [450, 500, 600, 650], [0, 0.7, 0.7, 0.3], { extrapolateRight: "clamp" });
  const line3Progress = interpolate(frame, [550, 600], [0, 1], { extrapolateRight: "clamp" });

  // 결론 애니메이션
  const conclusionOpacity = interpolate(frame, [700, 750], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #78350f 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-6/scene5_xor_plot.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 48,
          color: colors.white,
          fontWeight: "bold",
          opacity: titleOpacity,
          marginBottom: 30,
        }}
      >
        XOR을 좌표 평면에 그려보면...
      </h2>

      {/* 큰 XOR 좌표 */}
      <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
        <div
          style={{
            width: 450,
            height: 450,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            position: "relative",
            border: `3px solid ${colors.gray[600]}`,
            opacity: plotOpacity,
          }}
        >
          {/* 축 라벨 */}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 20,
              fontSize: 22,
              color: colors.gray[400],
            }}
          >
            x₁
          </div>
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              fontSize: 22,
              color: colors.gray[400],
            }}
          >
            x₂
          </div>

          {/* 축 */}
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 60,
              width: 340,
              height: 3,
              backgroundColor: colors.gray[500],
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 60,
              width: 3,
              height: 340,
              backgroundColor: colors.gray[500],
            }}
          />

          {/* 점들 */}
          {/* (0, 0) - False */}
          <div
            style={{
              position: "absolute",
              bottom: 50,
              left: 50,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              border: "3px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: "bold",
              color: colors.white,
              opacity: dot1Opacity,
            }}
          >
            0
          </div>

          {/* (0, 1) - True (대각선 위치) */}
          <div
            style={{
              position: "absolute",
              bottom: 340,
              left: 50,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              border: "3px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: "bold",
              color: colors.white,
              opacity: dot2Opacity,
            }}
          >
            1
          </div>

          {/* (1, 0) - True (대각선 위치) */}
          <div
            style={{
              position: "absolute",
              bottom: 50,
              left: 340,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              border: "3px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: "bold",
              color: colors.white,
              opacity: dot3Opacity,
            }}
          >
            1
          </div>

          {/* (1, 1) - False (대각선 위치) */}
          <div
            style={{
              position: "absolute",
              bottom: 340,
              left: 340,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              border: "3px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: "bold",
              color: colors.white,
              opacity: dot4Opacity,
            }}
          >
            0
          </div>

          {/* 시도 선들 (실패) */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {/* 수평선 시도 */}
            <line
              x1="40"
              y1="225"
              x2={40 + 370 * line1Progress}
              y2="225"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="10,5"
              opacity={line1Opacity}
            />
            {/* 수직선 시도 */}
            <line
              x1="225"
              y1="40"
              x2="225"
              y2={40 + 370 * line2Progress}
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="10,5"
              opacity={line2Opacity}
            />
            {/* 대각선 시도 */}
            <line
              x1="40"
              y1="40"
              x2={40 + 370 * line3Progress}
              y2={40 + 370 * line3Progress}
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="10,5"
              opacity={interpolate(frame, [550, 600], [0, 0.7], { extrapolateRight: "clamp" })}
            />
          </svg>
        </div>

        {/* 설명 */}
        <div style={{ maxWidth: 400 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              padding: 25,
              marginBottom: 20,
              opacity: dot4Opacity,
            }}
          >
            <p style={{ fontSize: 24, color: colors.white, marginBottom: 15 }}>
              참(녹색): <span style={{ color: "#22c55e" }}>대각선</span> 위치
            </p>
            <p style={{ fontSize: 24, color: colors.white }}>
              거짓(빨강): <span style={{ color: "#ef4444" }}>반대 대각선</span> 위치
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ef444430",
              border: "2px solid #ef4444",
              borderRadius: 15,
              padding: 25,
              opacity: conclusionOpacity,
            }}
          >
            <p style={{ fontSize: 26, color: "#fca5a5", fontWeight: "bold" }}>
              어떤 직선을 그어도 분리 불가능!
            </p>
            <p style={{ fontSize: 22, color: colors.gray[300], marginTop: 10 }}>
              = 선형 분리 불가능
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
