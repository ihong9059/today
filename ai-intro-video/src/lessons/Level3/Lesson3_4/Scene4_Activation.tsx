/**
 * Scene 4: 활성화 함수
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_Activation: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 설명
  const descOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 활성화 함수들
  const reluOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const sigmoidOpacity = interpolate(frame, [220, 250], [0, 1], { extrapolateRight: "clamp" });
  const tanhOpacity = interpolate(frame, [290, 320], [0, 1], { extrapolateRight: "clamp" });

  // ReLU 추천
  const recOpacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-4/scene4.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          opacity: titleOpacity,
        }}
      >
        활성화 함수 (Activation Function)
      </h1>

      {/* 왜 필요한가 */}
      <div
        style={{
          backgroundColor: "#f8717120",
          border: "2px solid #f87171",
          padding: "15px 30px",
          borderRadius: 16,
          textAlign: "center",
          marginBottom: 25,
          opacity: descOpacity,
        }}
      >
        <div style={{ color: "#f87171", fontSize: 24 }}>
          선형 함수만 쌓으면? → 결과도 선형! 😱
        </div>
        <div style={{ color: colors.white, fontSize: 20, marginTop: 8 }}>
          비선형성 추가가 필수!
        </div>
      </div>

      {/* 활성화 함수 비교 */}
      <div
        style={{
          display: "flex",
          gap: 25,
          justifyContent: "center",
        }}
      >
        {/* ReLU */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 20,
            borderRadius: 16,
            width: 280,
            opacity: reluOpacity,
            border: "3px solid #22c55e",
          }}
        >
          <h3 style={{ color: "#22c55e", fontSize: 26, marginBottom: 10 }}>ReLU ⭐</h3>
          <svg width="240" height="100" viewBox="-60 -50 120 100">
            {/* 축 */}
            <line x1="-50" y1="0" x2="50" y2="0" stroke={colors.gray[600]} strokeWidth={1} />
            <line x1="0" y1="-40" x2="0" y2="40" stroke={colors.gray[600]} strokeWidth={1} />
            {/* ReLU */}
            <path d="M -50 0 L 0 0 L 50 -40" stroke="#22c55e" strokeWidth={3} fill="none" />
          </svg>
          <div style={{ color: colors.white, fontSize: 18, textAlign: "center" }}>
            f(x) = max(0, x)
          </div>
          <div style={{ color: colors.gray[400], fontSize: 14, textAlign: "center", marginTop: 5 }}>
            음수→0, 양수→그대로
          </div>
        </div>

        {/* Sigmoid */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 20,
            borderRadius: 16,
            width: 280,
            opacity: sigmoidOpacity,
          }}
        >
          <h3 style={{ color: "#60a5fa", fontSize: 26, marginBottom: 10 }}>Sigmoid</h3>
          <svg width="240" height="100" viewBox="-60 -50 120 100">
            {/* 축 */}
            <line x1="-50" y1="0" x2="50" y2="0" stroke={colors.gray[600]} strokeWidth={1} />
            <line x1="0" y1="-40" x2="0" y2="40" stroke={colors.gray[600]} strokeWidth={1} />
            {/* Sigmoid S자 */}
            <path d="M -50 35 Q -20 35 0 0 Q 20 -35 50 -35" stroke="#60a5fa" strokeWidth={3} fill="none" />
          </svg>
          <div style={{ color: colors.white, fontSize: 18, textAlign: "center" }}>
            σ(x) = 1/(1+e⁻ˣ)
          </div>
          <div style={{ color: colors.gray[400], fontSize: 14, textAlign: "center", marginTop: 5 }}>
            출력: 0~1 사이
          </div>
        </div>

        {/* Tanh */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 20,
            borderRadius: 16,
            width: 280,
            opacity: tanhOpacity,
          }}
        >
          <h3 style={{ color: "#fbbf24", fontSize: 26, marginBottom: 10 }}>Tanh</h3>
          <svg width="240" height="100" viewBox="-60 -50 120 100">
            {/* 축 */}
            <line x1="-50" y1="0" x2="50" y2="0" stroke={colors.gray[600]} strokeWidth={1} />
            <line x1="0" y1="-40" x2="0" y2="40" stroke={colors.gray[600]} strokeWidth={1} />
            {/* Tanh S자 */}
            <path d="M -50 38 Q -15 38 0 0 Q 15 -38 50 -38" stroke="#fbbf24" strokeWidth={3} fill="none" />
          </svg>
          <div style={{ color: colors.white, fontSize: 18, textAlign: "center" }}>
            tanh(x)
          </div>
          <div style={{ color: colors.gray[400], fontSize: 14, textAlign: "center", marginTop: 5 }}>
            출력: -1~1 사이
          </div>
        </div>
      </div>

      {/* ReLU 추천 */}
      <div
        style={{
          backgroundColor: "#22c55e20",
          border: "2px solid #22c55e",
          padding: "20px 40px",
          borderRadius: 16,
          textAlign: "center",
          marginTop: 30,
          opacity: recOpacity,
        }}
      >
        <div style={{ color: "#22c55e", fontSize: 26, fontWeight: "bold" }}>
          현대 딥러닝에서는 ReLU가 가장 인기! 👑
        </div>
        <div style={{ color: colors.gray[300], fontSize: 18, marginTop: 8 }}>
          간단하고 기울기 소실 문제가 적음
        </div>
      </div>
    </AbsoluteFill>
  );
};
