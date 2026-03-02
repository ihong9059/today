import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

export const Scene4_BayesTheorem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, from: 0.8, to: 1, durationInFrames: 30 });

  // 핵심 설명
  const descOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });

  // 공식
  const formulaOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" });
  const formulaScale = spring({ frame: frame - 100, fps, from: 0.5, to: 1, durationInFrames: 40 });

  // 각 부분 하이라이트
  const posteriorOpacity = interpolate(frame, [150, 170], [0, 1], { extrapolateRight: "clamp" });
  const likelihoodOpacity = interpolate(frame, [200, 220], [0, 1], { extrapolateRight: "clamp" });
  const priorOpacity = interpolate(frame, [250, 270], [0, 1], { extrapolateRight: "clamp" });

  // 스팸 예시
  const spamExampleOpacity = interpolate(frame, [350, 370], [0, 1], { extrapolateRight: "clamp" });
  const spamScale = spring({ frame: frame - 350, fps, from: 0.8, to: 1, durationInFrames: 30 });

  // 펄스 효과
  const pulse = Math.sin(frame * 0.1) * 0.05 + 1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Audio src={staticFile("audio/lesson-2-6/scene4.mp3")} />

      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 60%)",
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
          transform: `scale(${titleScale})`,
        }}
      >
        <h2 style={{ fontSize: 56, color: "#fbbf24", margin: 0 }}>🌟 베이즈 정리</h2>
        <p style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>Bayes' Theorem - AI의 핵심 도구</p>
      </div>

      {/* 핵심 설명 */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: descOpacity,
        }}
      >
        <div
          style={{
            background: "rgba(251, 191, 36, 0.15)",
            border: "1px solid #fbbf24",
            borderRadius: 12,
            padding: "15px 40px",
          }}
        >
          <p style={{ fontSize: 26, color: "white", margin: 0 }}>
            증거(E)가 주어졌을 때 가설(H)의 확률을 계산
          </p>
        </div>
      </div>

      {/* 공식 */}
      <div
        style={{
          position: "absolute",
          top: "26%",
          left: "50%",
          transform: `translateX(-50%) scale(${formulaScale * pulse})`,
          opacity: formulaOpacity,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))",
            border: "3px solid #fbbf24",
            borderRadius: 24,
            padding: "30px 50px",
            boxShadow: "0 0 40px rgba(251, 191, 36, 0.2)",
          }}
        >
          <div style={{ fontSize: 44, color: "white", fontFamily: "serif", textAlign: "center" }}>
            <span style={{ color: "#22c55e", opacity: posteriorOpacity > 0 ? 1 : 0.6 }}>P(H|E)</span>
            {" = "}
            <span style={{ display: "inline-block" }}>
              <span style={{ color: "#3b82f6", opacity: likelihoodOpacity > 0 ? 1 : 0.6 }}>P(E|H)</span>
              {" × "}
              <span style={{ color: "#ec4899", opacity: priorOpacity > 0 ? 1 : 0.6 }}>P(H)</span>
            </span>
          </div>
          <div style={{ borderTop: "2px solid white", marginTop: 10, paddingTop: 10, textAlign: "center" }}>
            <span style={{ fontSize: 44, color: "#94a3b8" }}>P(E)</span>
          </div>
        </div>
      </div>

      {/* 용어 설명 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "10%",
          right: "10%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ textAlign: "center", opacity: posteriorOpacity }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <span style={{ fontSize: 36, color: "white", fontWeight: "bold" }}>H|E</span>
          </div>
          <p style={{ fontSize: 22, color: "#22c55e", marginTop: 15 }}>사후 확률</p>
          <p style={{ fontSize: 18, color: "#94a3b8" }}>Posterior</p>
        </div>

        <div style={{ textAlign: "center", opacity: likelihoodOpacity }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <span style={{ fontSize: 36, color: "white", fontWeight: "bold" }}>E|H</span>
          </div>
          <p style={{ fontSize: 22, color: "#3b82f6", marginTop: 15 }}>우도</p>
          <p style={{ fontSize: 18, color: "#94a3b8" }}>Likelihood</p>
        </div>

        <div style={{ textAlign: "center", opacity: priorOpacity }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ec4899, #db2777)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <span style={{ fontSize: 36, color: "white", fontWeight: "bold" }}>H</span>
          </div>
          <p style={{ fontSize: 22, color: "#ec4899", marginTop: 15 }}>사전 확률</p>
          <p style={{ fontSize: 18, color: "#94a3b8" }}>Prior</p>
        </div>
      </div>

      {/* 스팸 필터 예시 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: "50%",
          transform: `translateX(-50%) scale(${spamScale})`,
          opacity: spamExampleOpacity,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))",
            border: "2px solid #ef4444",
            borderRadius: 20,
            padding: "25px 50px",
          }}
        >
          <p style={{ fontSize: 28, color: "white", margin: 0, textAlign: "center" }}>
            📧 스팸 필터 예시
          </p>
          <p style={{ fontSize: 24, color: "#fca5a5", marginTop: 15, textAlign: "center" }}>
            "무료"라는 단어가 있을 때 → 스팸일 확률은?
          </p>
          <p style={{ fontSize: 26, color: "#fbbf24", marginTop: 10, textAlign: "center" }}>
            베이즈 정리로 계산! 🎯
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
