import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, from: -50, to: 0, durationInFrames: 30 });

  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });

  // 질문 박스들
  const question1Opacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" });
  const question1X = spring({ frame: frame - 60, fps, from: -100, to: 0, durationInFrames: 30 });

  const question2Opacity = interpolate(frame, [90, 110], [0, 1], { extrapolateRight: "clamp" });
  const question2X = spring({ frame: frame - 90, fps, from: 100, to: 0, durationInFrames: 30 });

  // AI 아이콘 펄스
  const aiPulse = Math.sin(frame * 0.1) * 0.1 + 1;

  // 확률 기호들 애니메이션
  const symbolsOpacity = interpolate(frame, [150, 170], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Audio src={staticFile("audio/lesson-2-6/scene1.mp3")} />

      {/* 배경 그라데이션 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)",
        }}
      />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h1 style={{ fontSize: 72, color: "#a855f7", margin: 0, fontWeight: "bold" }}>
          확률의 기초
        </h1>
        <p
          style={{
            fontSize: 36,
            color: "#e879f9",
            marginTop: 10,
            opacity: subtitleOpacity,
          }}
        >
          Probability Basics
        </p>
      </div>

      {/* AI 아이콘 중앙 */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${aiPulse})`,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #a855f7, #ec4899)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 40px rgba(168, 85, 247, 0.5)",
        }}
      >
        <span style={{ fontSize: 80, color: "white" }}>🤖</span>
      </div>

      {/* 질문 박스들 */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: "15%",
          opacity: question1Opacity,
          transform: `translateX(${question1X}px)`,
        }}
      >
        <div
          style={{
            background: "rgba(168, 85, 247, 0.2)",
            border: "2px solid #a855f7",
            borderRadius: 16,
            padding: "20px 30px",
          }}
        >
          <span style={{ fontSize: 28, color: "white" }}>☁️ 내일 비가 올까?</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "48%",
          right: "15%",
          opacity: question2Opacity,
          transform: `translateX(${-question2X}px)`,
        }}
      >
        <div
          style={{
            background: "rgba(168, 85, 247, 0.2)",
            border: "2px solid #a855f7",
            borderRadius: 16,
            padding: "20px 30px",
          }}
        >
          <span style={{ fontSize: 28, color: "white" }}>📧 이 이메일이 스팸일까?</span>
        </div>
      </div>

      {/* AI 응답 */}
      <div
        style={{
          position: "absolute",
          top: "62%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: symbolsOpacity,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))",
            border: "2px solid #e879f9",
            borderRadius: 20,
            padding: "25px 50px",
          }}
        >
          <p style={{ fontSize: 32, color: "white", margin: 0, textAlign: "center" }}>
            AI는 이런 질문에 <span style={{ color: "#fbbf24", fontWeight: "bold" }}>확률</span>로 답합니다!
          </p>
        </div>
      </div>

      {/* 확률 기호들 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: symbolsOpacity,
        }}
      >
        {["P(A)", "P(B|A)", "∑", "∏"].map((symbol, i) => (
          <div
            key={i}
            style={{
              fontSize: 40,
              color: "#c084fc",
              opacity: 0.7,
              transform: `translateY(${Math.sin(frame * 0.05 + i) * 10}px)`,
            }}
          >
            {symbol}
          </div>
        ))}
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
