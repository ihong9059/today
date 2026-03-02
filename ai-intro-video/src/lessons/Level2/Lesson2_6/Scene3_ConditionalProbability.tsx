import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

export const Scene3_ConditionalProbability: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // 조건부 확률 표기법
  const notationOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });
  const notationScale = spring({ frame: frame - 40, fps, from: 0.8, to: 1, durationInFrames: 30 });

  // 예시 (비와 우산)
  const exampleOpacity = interpolate(frame, [150, 170], [0, 1], { extrapolateRight: "clamp" });
  const rainOpacity = interpolate(frame, [150, 170], [0, 1], { extrapolateRight: "clamp" });
  const umbrellaOpacity = interpolate(frame, [200, 220], [0, 1], { extrapolateRight: "clamp" });
  const arrowOpacity = interpolate(frame, [220, 240], [0, 1], { extrapolateRight: "clamp" });

  // 공식
  const formulaOpacity = interpolate(frame, [300, 320], [0, 1], { extrapolateRight: "clamp" });

  // AI 중요성
  const importanceOpacity = interpolate(frame, [450, 470], [0, 1], { extrapolateRight: "clamp" });

  // 비 애니메이션
  const rainDrops = Array.from({ length: 15 }, (_, i) => ({
    x: (i * 120 + frame * 2) % 1920,
    y: (frame * 8 + i * 80) % 400,
    opacity: rainOpacity,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Audio src={staticFile("audio/lesson-2-6/scene3.mp3")} />

      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <h2 style={{ fontSize: 52, color: "#a855f7", margin: 0 }}>조건부 확률</h2>
        <p style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>Conditional Probability</p>
      </div>

      {/* 표기법 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: `translateX(-50%) scale(${notationScale})`,
          opacity: notationOpacity,
        }}
      >
        <div
          style={{
            background: "rgba(168, 85, 247, 0.2)",
            border: "2px solid #a855f7",
            borderRadius: 20,
            padding: "25px 50px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 48, color: "white", margin: 0, fontFamily: "serif" }}>
            P(<span style={{ color: "#3b82f6" }}>A</span> | <span style={{ color: "#22c55e" }}>B</span>)
          </p>
          <p style={{ fontSize: 26, color: "#94a3b8", marginTop: 15 }}>
            <span style={{ color: "#22c55e" }}>B</span>가 일어났을 때 <span style={{ color: "#3b82f6" }}>A</span>가 일어날 확률
          </p>
        </div>
      </div>

      {/* 예시 섹션 */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "15%",
          right: "15%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
          opacity: exampleOpacity,
        }}
      >
        {/* 비 */}
        <div style={{ textAlign: "center", opacity: rainOpacity, position: "relative" }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 20,
              background: "linear-gradient(180deg, #475569, #334155)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span style={{ fontSize: 70 }}>🌧️</span>
            {/* 비 방울 애니메이션 */}
            {rainDrops.slice(0, 5).map((drop, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 20 + i * 25,
                  top: (drop.y % 100) + 50,
                  width: 3,
                  height: 15,
                  background: "rgba(59, 130, 246, 0.6)",
                  borderRadius: 3,
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: 28, color: "#3b82f6", marginTop: 20 }}>비가 오는 날</p>
          <p style={{ fontSize: 24, color: "#94a3b8" }}>조건 B</p>
        </div>

        {/* 화살표 */}
        <div style={{ opacity: arrowOpacity }}>
          <svg width="100" height="50" viewBox="0 0 100 50">
            <defs>
              <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <line x1="0" y1="25" x2="70" y2="25" stroke="url(#arrowGrad)" strokeWidth="4" />
            <polygon points="70,15 90,25 70,35" fill="#22c55e" />
          </svg>
          <p style={{ fontSize: 22, color: "#94a3b8", textAlign: "center" }}>조건부</p>
        </div>

        {/* 우산 */}
        <div style={{ textAlign: "center", opacity: umbrellaOpacity }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 20,
              background: "linear-gradient(180deg, #22c55e, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <span style={{ fontSize: 70 }}>☂️</span>
          </div>
          <p style={{ fontSize: 28, color: "#22c55e", marginTop: 20 }}>우산을 들고 있음</p>
          <p style={{ fontSize: 24, color: "#94a3b8" }}>사건 A</p>
        </div>
      </div>

      {/* 공식 */}
      <div
        style={{
          position: "absolute",
          bottom: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: formulaOpacity,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(34, 197, 94, 0.2))",
            border: "2px solid #3b82f6",
            borderRadius: 16,
            padding: "25px 50px",
          }}
        >
          <p style={{ fontSize: 38, color: "white", margin: 0, fontFamily: "serif", textAlign: "center" }}>
            P(A|B) = <span style={{ borderBottom: "2px solid white" }}>P(A ∩ B)</span>
          </p>
          <p style={{ fontSize: 38, color: "white", margin: "5px 0 0 110px", fontFamily: "serif" }}>
            <span style={{ visibility: "hidden" }}>P(A|B) = </span>P(B)
          </p>
        </div>
      </div>

      {/* AI 중요성 */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: importanceOpacity,
        }}
      >
        <div
          style={{
            background: "rgba(168, 85, 247, 0.15)",
            border: "1px solid #a855f7",
            borderRadius: 12,
            padding: "15px 40px",
          }}
        >
          <p style={{ fontSize: 26, color: "#e879f9", margin: 0, textAlign: "center" }}>
            🔄 새로운 정보로 기존 믿음을 업데이트!
          </p>
        </div>
      </div>

      {/* 레슨 번호 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          fontSize: 24,
          color: "#a855f7",
          opacity: 0.7,
        }}
      >
        Lesson 2-6
      </div>
    </AbsoluteFill>
  );
};
