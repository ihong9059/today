/**
 * Scene 2: 역전파가 왜 필요한가
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_WhyBackprop: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const point1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const point2Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const point3Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });

  // 신경망 시각화
  const nnOpacity = interpolate(frame, [320, 350], [0, 1], { extrapolateRight: "clamp" });

  // 핵심 메시지
  const keyOpacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-5/scene2.mp3")} />

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
        역전파가 왜 필요한가?
      </h1>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 이유들 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 16,
              marginBottom: 15,
              borderLeft: "4px solid #60a5fa",
              opacity: point1Opacity,
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 22, fontWeight: "bold" }}>
              손실을 줄이려면?
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18, marginTop: 8 }}>
              → 가중치를 조절해야 함
            </div>
          </div>

          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 16,
              marginBottom: 15,
              borderLeft: "4px solid #22c55e",
              opacity: point2Opacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 22, fontWeight: "bold" }}>
              경사하강법을 쓰려면?
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18, marginTop: 8 }}>
              → 기울기(∂L/∂w)가 필요
            </div>
          </div>

          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 16,
              borderLeft: "4px solid #fbbf24",
              opacity: point3Opacity,
            }}
          >
            <div style={{ color: "#fbbf24", fontSize: 22, fontWeight: "bold" }}>
              신경망이 복잡하면?
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18, marginTop: 8 }}>
              → 여러 레이어가 연결됨
            </div>
          </div>
        </div>

        {/* 오른쪽: 신경망 시각화 */}
        <div style={{ flex: 1, opacity: nnOpacity }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              height: "100%",
            }}
          >
            <div style={{ color: "#f87171", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
              문제: 복잡한 연결
            </div>
            <svg width="100%" height="200" viewBox="0 0 300 200">
              {/* 입력층 */}
              <circle cx="50" cy="60" r="20" fill="#22c55e" />
              <circle cx="50" cy="140" r="20" fill="#22c55e" />

              {/* 은닉층 */}
              <circle cx="150" cy="40" r="20" fill="#fbbf24" />
              <circle cx="150" cy="100" r="20" fill="#fbbf24" />
              <circle cx="150" cy="160" r="20" fill="#fbbf24" />

              {/* 출력층 */}
              <circle cx="250" cy="100" r="20" fill="#a855f7" />

              {/* 연결선 */}
              <line x1="70" y1="60" x2="130" y2="40" stroke={colors.gray[500]} strokeWidth="2" />
              <line x1="70" y1="60" x2="130" y2="100" stroke={colors.gray[500]} strokeWidth="2" />
              <line x1="70" y1="60" x2="130" y2="160" stroke={colors.gray[500]} strokeWidth="2" />
              <line x1="70" y1="140" x2="130" y2="40" stroke={colors.gray[500]} strokeWidth="2" />
              <line x1="70" y1="140" x2="130" y2="100" stroke={colors.gray[500]} strokeWidth="2" />
              <line x1="70" y1="140" x2="130" y2="160" stroke={colors.gray[500]} strokeWidth="2" />
              <line x1="170" y1="40" x2="230" y2="100" stroke={colors.gray[500]} strokeWidth="2" />
              <line x1="170" y1="100" x2="230" y2="100" stroke={colors.gray[500]} strokeWidth="2" />
              <line x1="170" y1="160" x2="230" y2="100" stroke={colors.gray[500]} strokeWidth="2" />
            </svg>
            <div style={{ color: colors.gray[400], fontSize: 16, textAlign: "center" }}>
              출력의 손실이 입력층 가중치에 어떤 영향?
            </div>
          </div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          backgroundColor: "#f8717120",
          border: "2px solid #f87171",
          padding: "20px 40px",
          borderRadius: 16,
          textAlign: "center",
          marginTop: 25,
          opacity: keyOpacity,
        }}
      >
        <div style={{ color: "#f87171", fontSize: 26, fontWeight: "bold" }}>
          역전파 = 연쇄법칙으로 뒤에서 앞으로 기울기 전달! ⬅️
        </div>
      </div>
    </AbsoluteFill>
  );
};
