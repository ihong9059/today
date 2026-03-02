/**
 * Scene 2: XOR 문제 복습
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_Review: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-7/scene2_review.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        지난 시간 복습: XOR 문제
      </h2>

      {/* XOR 좌표 플롯 */}
      <div
        style={{
          display: "flex",
          gap: 100,
          alignItems: "center",
        }}
      >
        {/* 좌표 평면 */}
        <div
          style={{
            width: 400,
            height: 400,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            position: "relative",
            border: `3px solid ${colors.gray[600]}`,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {/* 축 */}
          <div
            style={{
              position: "absolute",
              bottom: 50,
              left: 50,
              width: 300,
              height: 3,
              backgroundColor: colors.gray[500],
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 50,
              left: 50,
              width: 3,
              height: 300,
              backgroundColor: colors.gray[500],
            }}
          />

          {/* x1 축 라벨 */}
          <div style={{ position: "absolute", bottom: 20, right: 50, color: colors.gray[400], fontSize: 20 }}>
            x1
          </div>
          {/* x2 축 라벨 */}
          <div style={{ position: "absolute", top: 50, left: 20, color: colors.gray[400], fontSize: 20 }}>
            x2
          </div>

          {/* 점들 */}
          {/* (0,0) = 0 빨강 */}
          <div
            style={{
              position: "absolute",
              bottom: 35,
              left: 35,
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
              opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            0
          </div>

          {/* (1,0) = 1 녹색 */}
          <div
            style={{
              position: "absolute",
              bottom: 35,
              right: 35,
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
              opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            1
          </div>

          {/* (0,1) = 1 녹색 */}
          <div
            style={{
              position: "absolute",
              top: 35,
              left: 35,
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
              opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            1
          </div>

          {/* (1,1) = 0 빨강 */}
          <div
            style={{
              position: "absolute",
              top: 35,
              right: 35,
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
              opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            0
          </div>

          {/* 분리 불가 표시 - X */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: interpolate(frame, [200, 240], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <line x1="100" y1="100" x2="300" y2="300" stroke="#ef4444" strokeWidth="4" strokeDasharray="10,5" />
            <line x1="100" y1="300" x2="300" y2="100" stroke="#ef4444" strokeWidth="4" strokeDasharray="10,5" />
          </svg>
        </div>

        {/* 설명 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
            opacity: interpolate(frame, [180, 220], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "25px 40px",
              borderRadius: 15,
              borderLeft: "5px solid #ef4444",
            }}
          >
            <div style={{ color: "#ef4444", fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
              핵심 문제
            </div>
            <div style={{ color: colors.white, fontSize: 24 }}>선형 분리 불가능</div>
          </div>

          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "25px 40px",
              borderRadius: 15,
              borderLeft: "5px solid #f59e0b",
            }}
          >
            <div style={{ color: "#f59e0b", fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
              의미
            </div>
            <div style={{ color: colors.white, fontSize: 24 }}>
              하나의 직선으로
              <br />
              분류할 수 없음
            </div>
          </div>

          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "25px 40px",
              borderRadius: 15,
              borderLeft: "5px solid #22c55e",
              opacity: interpolate(frame, [280, 320], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
              해결책?
            </div>
            <div style={{ color: colors.white, fontSize: 24 }}>다층 퍼셉트론!</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
