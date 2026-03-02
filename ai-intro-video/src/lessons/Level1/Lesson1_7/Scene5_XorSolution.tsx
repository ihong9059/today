/**
 * Scene 5: XOR 문제 해결
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_XorSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #064e3b 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-7/scene5_xor_solution.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        XOR 문제 해결: 다층 퍼셉트론
      </h2>

      {/* 네트워크 다이어그램 */}
      <div
        style={{
          position: "relative",
          width: 1000,
          height: 450,
        }}
      >
        {/* 연결선 SVG */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {/* 입력 → 은닉층 연결 */}
          <line
            x1="150" y1="150" x2="400" y2="100"
            stroke={interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }) > 0.5 ? "#ef4444" : "#4b5563"}
            strokeWidth="3"
            opacity={interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" })}
          />
          <line
            x1="150" y1="150" x2="400" y2="250"
            stroke={interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }) > 0.5 ? "#22c55e" : "#4b5563"}
            strokeWidth="3"
            opacity={interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" })}
          />
          <line
            x1="150" y1="300" x2="400" y2="100"
            stroke={interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" }) > 0.5 ? "#ef4444" : "#4b5563"}
            strokeWidth="3"
            opacity={interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" })}
          />
          <line
            x1="150" y1="300" x2="400" y2="250"
            stroke={interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" }) > 0.5 ? "#22c55e" : "#4b5563"}
            strokeWidth="3"
            opacity={interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" })}
          />
          {/* 은닉층 → 출력층 연결 */}
          <line
            x1="500" y1="100" x2="750" y2="175"
            stroke="#f59e0b"
            strokeWidth="3"
            opacity={interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" })}
          />
          <line
            x1="500" y1="250" x2="750" y2="175"
            stroke="#f59e0b"
            strokeWidth="3"
            opacity={interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" })}
          />
        </svg>

        {/* 입력층 */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 100,
            display: "flex",
            flexDirection: "column",
            gap: 100,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ position: "absolute", top: -50, color: "#3b82f6", fontSize: 24, fontWeight: "bold", width: 100, textAlign: "center" }}>
            입력
          </div>
          {["x1", "x2"].map((label, i) => (
            <div
              key={label}
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: 28,
                fontWeight: "bold",
                boxShadow: "0 6px 20px rgba(59,130,246,0.5)",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* 은닉층 */}
        <div
          style={{
            position: "absolute",
            left: 350,
            top: 50,
            display: "flex",
            flexDirection: "column",
            gap: 80,
            opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ position: "absolute", top: -50, left: 0, color: "#a855f7", fontSize: 24, fontWeight: "bold", width: 150, textAlign: "center" }}>
            은닉층
          </div>
          {/* NAND */}
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: 20,
                fontWeight: "bold",
                boxShadow: "0 6px 20px rgba(239,68,68,0.5)",
              }}
            >
              NAND
            </div>
            <div style={{ color: colors.gray[400], fontSize: 18 }}>h1</div>
          </div>
          {/* OR */}
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: 24,
                fontWeight: "bold",
                boxShadow: "0 6px 20px rgba(34,197,94,0.5)",
              }}
            >
              OR
            </div>
            <div style={{ color: colors.gray[400], fontSize: 18 }}>h2</div>
          </div>
        </div>

        {/* 출력층 */}
        <div
          style={{
            position: "absolute",
            left: 700,
            top: 125,
            opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ position: "absolute", top: -50, color: "#f59e0b", fontSize: 24, fontWeight: "bold", width: 100, textAlign: "center" }}>
            출력
          </div>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
              boxShadow: "0 6px 20px rgba(245,158,11,0.5)",
            }}
          >
            AND
          </div>
        </div>

        {/* 수식 */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 50,
            backgroundColor: colors.gray[800],
            padding: "20px 30px",
            borderRadius: 15,
            opacity: interpolate(frame, [240, 280], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
            XOR 공식
          </div>
          <div style={{ color: colors.white, fontSize: 20, fontFamily: "monospace" }}>
            XOR(x1, x2) =<br />
            AND(NAND(x1, x2), OR(x1, x2))
          </div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          marginTop: 40,
          fontSize: 32,
          color: "#fcd34d",
          fontWeight: "bold",
          opacity: interpolate(frame, [300, 340], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        3개의 게이트 조합 = XOR 해결!
      </div>
    </AbsoluteFill>
  );
};
