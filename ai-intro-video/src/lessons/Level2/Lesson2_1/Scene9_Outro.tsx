/**
 * Scene 9: 아웃트로
 * 다음 강의 예고 및 구독 요청
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene9_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nextOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const nextScale = spring({ frame, fps, from: 0.8, to: 1, durationInFrames: 30 });

  const conceptOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  const websiteOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const websiteScale = spring({ frame: frame - 150, fps, from: 0.8, to: 1, durationInFrames: 30 });

  const subscribeOpacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const subscribeScale = spring({ frame: frame - 240, fps, from: 0.8, to: 1, durationInFrames: 30 });

  // 구독 버튼 펄스 효과
  const pulse = Math.sin(frame * 0.1) * 0.05 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-1/scene9.mp3")} />

      {/* 다음 강의 예고 */}
      <div
        style={{
          padding: "30px 50px",
          backgroundColor: "rgba(168,85,247,0.3)",
          borderRadius: 20,
          border: "3px solid #a855f7",
          opacity: nextOpacity,
          transform: `scale(${Math.max(0.8, nextScale)})`,
          textAlign: "center",
        }}
      >
        <div style={{ color: "#c084fc", fontSize: 28, marginBottom: 15 }}>
          다음 시간
        </div>
        <div style={{ color: colors.white, fontSize: 48, fontWeight: "bold" }}>
          Lesson 2-2: 미분의 기초
        </div>
      </div>

      {/* 핵심 개념 연결 */}
      <div
        style={{
          display: "flex",
          gap: 30,
          alignItems: "center",
          opacity: conceptOpacity,
        }}
      >
        <div
          style={{
            padding: "20px 30px",
            backgroundColor: "rgba(59,130,246,0.2)",
            borderRadius: 15,
            border: "2px solid #3b82f6",
          }}
        >
          <div style={{ color: "#60a5fa", fontSize: 24 }}>함수의 기울기</div>
        </div>

        <div style={{ color: "#9ca3af", fontSize: 48 }}>→</div>

        <div
          style={{
            padding: "20px 30px",
            backgroundColor: "rgba(34,197,94,0.2)",
            borderRadius: 15,
            border: "2px solid #22c55e",
          }}
        >
          <div style={{ color: "#4ade80", fontSize: 24 }}>경사하강법의 핵심!</div>
        </div>
      </div>

      {/* 웹사이트 안내 */}
      <div
        style={{
          padding: "25px 40px",
          backgroundColor: "rgba(251,191,36,0.2)",
          borderRadius: 20,
          border: "3px solid #fbbf24",
          opacity: websiteOpacity,
          transform: `scale(${Math.max(0.8, websiteScale)})`,
          textAlign: "center",
        }}
      >
        <div style={{ color: "#fcd34d", fontSize: 24, marginBottom: 10 }}>
          📚 더 자세한 학습 자료와 코드 예제
        </div>
        <div style={{ color: colors.white, fontSize: 32, fontWeight: "bold" }}>
          영상 설명란의 웹사이트 링크에서 확인하세요!
        </div>
      </div>

      {/* 구독 & 좋아요 요청 */}
      <div
        style={{
          display: "flex",
          gap: 40,
          opacity: subscribeOpacity,
          transform: `scale(${Math.max(0.8, subscribeScale) * pulse})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            padding: "20px 40px",
            backgroundColor: "#ef4444",
            borderRadius: 50,
            boxShadow: "0 4px 20px rgba(239,68,68,0.5)",
          }}
        >
          <span style={{ fontSize: 36 }}>🔔</span>
          <span style={{ color: colors.white, fontSize: 32, fontWeight: "bold" }}>구독</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            padding: "20px 40px",
            backgroundColor: "#3b82f6",
            borderRadius: 50,
            boxShadow: "0 4px 20px rgba(59,130,246,0.5)",
          }}
        >
          <span style={{ fontSize: 36 }}>👍</span>
          <span style={{ color: colors.white, fontSize: 32, fontWeight: "bold" }}>좋아요</span>
        </div>
      </div>

      {/* 마무리 메시지 */}
      <div
        style={{
          color: colors.white,
          fontSize: 36,
          fontWeight: "bold",
          opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        다음 강의에서 만나요! 👋
      </div>
    </AbsoluteFill>
  );
};
