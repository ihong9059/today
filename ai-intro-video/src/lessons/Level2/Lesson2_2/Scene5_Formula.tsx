/**
 * Scene 5: 경사하강법 수식
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_Formula: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-2/scene5.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        경사하강법 수식
      </h1>

      {/* 메인 수식 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 50,
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            backgroundColor: "#a855f720",
            border: "3px solid #a855f7",
            borderRadius: 20,
            padding: "40px 80px",
          }}
        >
          <div style={{ fontSize: 64, color: colors.white, fontFamily: "monospace", textAlign: "center" }}>
            <span style={{ color: "#22c55e" }}>w</span>
            <span style={{ color: "#6b7280" }}> = </span>
            <span style={{ color: "#a855f7" }}>w</span>
            <span style={{ color: "#6b7280" }}> - </span>
            <span style={{ color: "#fbbf24" }}>η</span>
            <span style={{ color: "#6b7280" }}> × </span>
            <span style={{ color: "#ef4444" }}>∇L</span>
          </div>
        </div>
      </div>

      {/* 수식 설명 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 50 }}>
        {[
          { symbol: "w", name: "가중치", desc: "업데이트할 값", color: "#22c55e", delay: 150 },
          { symbol: "η", name: "학습률", desc: "이동 크기", color: "#fbbf24", delay: 250 },
          { symbol: "∇L", name: "기울기", desc: "미분값", color: "#ef4444", delay: 350 },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              padding: "25px 35px",
              textAlign: "center",
              opacity: interpolate(frame, [item.delay, item.delay + 30], [0, 1], { extrapolateRight: "clamp" }),
              transform: `translateY(${interpolate(frame, [item.delay, item.delay + 30], [30, 0], { extrapolateRight: "clamp" })}px)`,
            }}
          >
            <div style={{ fontSize: 48, color: item.color, fontWeight: "bold", fontFamily: "monospace" }}>
              {item.symbol}
            </div>
            <div style={{ fontSize: 28, color: colors.white, marginTop: 10 }}>{item.name}</div>
            <div style={{ fontSize: 20, color: "#9ca3af" }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* 코드 예시 */}
      <div
        style={{
          backgroundColor: "#1e293b",
          borderRadius: 15,
          padding: 35,
          maxWidth: 800,
          margin: "0 auto",
          opacity: interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ fontSize: 20, color: "#22c55e", marginBottom: 15 }}># Python 코드</div>
        <pre style={{ fontSize: 28, color: colors.white, fontFamily: "monospace", margin: 0, lineHeight: 1.5 }}>
          <span style={{ color: "#9ca3af" }}>learning_rate = </span>
          <span style={{ color: "#fbbf24" }}>0.01</span>{"\n"}
          <span style={{ color: "#9ca3af" }}>gradient = </span>
          <span style={{ color: "#ef4444" }}>compute_gradient</span>
          <span style={{ color: "#9ca3af" }}>(w)</span>{"\n"}
          <span style={{ color: "#22c55e" }}>w</span>
          <span style={{ color: "#9ca3af" }}> = </span>
          <span style={{ color: "#a855f7" }}>w</span>
          <span style={{ color: "#9ca3af" }}> - learning_rate * gradient</span>
        </pre>
      </div>

      {/* 학습률 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ backgroundColor: "#ef444420", border: "2px solid #ef4444", borderRadius: 15, padding: "20px 30px" }}>
          <span style={{ fontSize: 24, color: "#ef4444" }}>⚠️ 학습률 너무 크면 → 최솟값 지나침</span>
        </div>
        <div style={{ backgroundColor: "#fbbf2420", border: "2px solid #fbbf24", borderRadius: 15, padding: "20px 30px" }}>
          <span style={{ fontSize: 24, color: "#fbbf24" }}>⚠️ 학습률 너무 작으면 → 학습 너무 느림</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
