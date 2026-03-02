/**
 * Scene 2: 신경망 구조 설정
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_Setup: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const networkOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const inputOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const weightsOpacity = interpolate(frame, [270, 300], [0, 1], { extrapolateRight: "clamp" });
  const targetOpacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-6/scene2.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        신경망 구조 설정
      </h1>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 네트워크 다이어그램 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 30,
              borderRadius: 16,
              height: "100%",
              opacity: networkOpacity,
            }}
          >
            <svg width="100%" height="350" viewBox="0 0 400 350">
              {/* 입력층 */}
              <circle cx="70" cy="120" r="35" fill="#22c55e" />
              <text x="70" y="127" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle">x₁</text>
              <circle cx="70" cy="230" r="35" fill="#22c55e" />
              <text x="70" y="237" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle">x₂</text>
              <text x="70" y="300" fill={colors.gray[400]} fontSize="16" textAnchor="middle">입력</text>

              {/* 연결선 - 입력 → 은닉 */}
              <line x1="105" y1="120" x2="165" y2="120" stroke={colors.gray[500]} strokeWidth="2" />
              <line x1="105" y1="120" x2="165" y2="230" stroke={colors.gray[500]} strokeWidth="2" />
              <line x1="105" y1="230" x2="165" y2="120" stroke={colors.gray[500]} strokeWidth="2" />
              <line x1="105" y1="230" x2="165" y2="230" stroke={colors.gray[500]} strokeWidth="2" />

              {/* 가중치 라벨 */}
              <text x="130" y="100" fill="#fbbf24" fontSize="14">w₁</text>
              <text x="145" y="165" fill="#fbbf24" fontSize="14">w₂</text>
              <text x="145" y="190" fill="#fbbf24" fontSize="14">w₃</text>
              <text x="130" y="255" fill="#fbbf24" fontSize="14">w₄</text>

              {/* 은닉층 */}
              <circle cx="200" cy="120" r="35" fill="#fbbf24" />
              <text x="200" y="127" fill={colors.gray[900]} fontSize="22" fontWeight="bold" textAnchor="middle">h₁</text>
              <circle cx="200" cy="230" r="35" fill="#fbbf24" />
              <text x="200" y="237" fill={colors.gray[900]} fontSize="22" fontWeight="bold" textAnchor="middle">h₂</text>
              <text x="200" y="300" fill={colors.gray[400]} fontSize="16" textAnchor="middle">은닉층</text>

              {/* 연결선 - 은닉 → 출력 */}
              <line x1="235" y1="120" x2="295" y2="175" stroke={colors.gray[500]} strokeWidth="2" />
              <line x1="235" y1="230" x2="295" y2="175" stroke={colors.gray[500]} strokeWidth="2" />

              {/* 가중치 라벨 */}
              <text x="260" y="135" fill="#a855f7" fontSize="14">w₅</text>
              <text x="260" y="220" fill="#a855f7" fontSize="14">w₆</text>

              {/* 출력층 */}
              <circle cx="330" cy="175" r="35" fill="#a855f7" />
              <text x="330" y="182" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle">y</text>
              <text x="330" y="300" fill={colors.gray[400]} fontSize="16" textAnchor="middle">출력</text>
            </svg>
          </div>
        </div>

        {/* 오른쪽: 설정값들 */}
        <div style={{ flex: 1 }}>
          {/* 입력 값 */}
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              padding: 20,
              borderRadius: 12,
              marginBottom: 15,
              opacity: inputOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
              입력 값
            </div>
            <div style={{ color: colors.white, fontSize: 26, fontFamily: "monospace" }}>
              x₁ = 0.5, x₂ = 0.3
            </div>
          </div>

          {/* 가중치 */}
          <div
            style={{
              backgroundColor: "#fbbf2420",
              border: "2px solid #fbbf24",
              padding: 20,
              borderRadius: 12,
              marginBottom: 15,
              opacity: weightsOpacity,
            }}
          >
            <div style={{ color: "#fbbf24", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
              가중치
            </div>
            <div style={{ color: colors.white, fontSize: 20, fontFamily: "monospace" }}>
              w₁=0.3, w₂=0.5, w₃=0.4, w₄=0.2
            </div>
            <div style={{ color: colors.white, fontSize: 20, fontFamily: "monospace", marginTop: 5 }}>
              w₅=0.6, w₆=0.7
            </div>
          </div>

          {/* 정답 */}
          <div
            style={{
              backgroundColor: "#f8717120",
              border: "2px solid #f87171",
              padding: 20,
              borderRadius: 12,
              opacity: targetOpacity,
            }}
          >
            <div style={{ color: "#f87171", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
              정답 (target)
            </div>
            <div style={{ color: colors.white, fontSize: 30, fontWeight: "bold" }}>
              t = 1
            </div>
            <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 5 }}>
              네트워크가 1을 출력하도록 학습!
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
