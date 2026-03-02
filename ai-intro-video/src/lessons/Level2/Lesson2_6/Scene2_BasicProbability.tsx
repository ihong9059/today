import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

export const Scene2_BasicProbability: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // 확률 범위 바
  const rangeOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });
  const rangeWidth = interpolate(frame, [50, 120], [0, 100], { extrapolateRight: "clamp" });

  // 동전 던지기
  const coinOpacity = interpolate(frame, [200, 220], [0, 1], { extrapolateRight: "clamp" });
  const coinRotation = frame * 8;

  // 주사위
  const diceOpacity = interpolate(frame, [300, 320], [0, 1], { extrapolateRight: "clamp" });
  const diceRotation = Math.sin(frame * 0.1) * 15;

  // 공식
  const formulaOpacity = interpolate(frame, [400, 420], [0, 1], { extrapolateRight: "clamp" });
  const formulaScale = spring({ frame: frame - 400, fps, from: 0.5, to: 1, durationInFrames: 30 });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Audio src={staticFile("audio/lesson-2-6/scene2.mp3")} />

      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
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
        <h2 style={{ fontSize: 52, color: "#a855f7", margin: 0 }}>확률이란?</h2>
      </div>

      {/* 확률 범위 시각화 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "10%",
          right: "10%",
          opacity: rangeOpacity,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontSize: 32, color: "#94a3b8", width: 80 }}>0</span>
          <div
            style={{
              flex: 1,
              height: 30,
              background: "rgba(168, 85, 247, 0.2)",
              borderRadius: 15,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${rangeWidth}%`,
                height: "100%",
                background: "linear-gradient(90deg, #dc2626, #fbbf24, #22c55e)",
                borderRadius: 15,
              }}
            />
            {/* 마커 */}
            <div
              style={{
                position: "absolute",
                top: -25,
                left: `${rangeWidth / 2}%`,
                transform: "translateX(-50%)",
                fontSize: 20,
                color: "#fbbf24",
              }}
            >
              0.5
            </div>
          </div>
          <span style={{ fontSize: 32, color: "#94a3b8", width: 80, textAlign: "right" }}>1</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: 80, paddingRight: 80 }}>
          <span style={{ fontSize: 22, color: "#dc2626" }}>절대 안 일어남</span>
          <span style={{ fontSize: 22, color: "#22c55e" }}>반드시 일어남</span>
        </div>
      </div>

      {/* 예시 섹션 */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "5%",
          right: "5%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {/* 동전 */}
        <div style={{ textAlign: "center", opacity: coinOpacity }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              transform: `rotateY(${coinRotation}deg)`,
              boxShadow: "0 4px 20px rgba(251, 191, 36, 0.3)",
            }}
          >
            <span style={{ fontSize: 40 }}>₩</span>
          </div>
          <p style={{ fontSize: 26, color: "white", marginTop: 20 }}>동전 던지기</p>
          <p style={{ fontSize: 32, color: "#fbbf24", fontWeight: "bold" }}>P = 1/2 = 0.5</p>
        </div>

        {/* 주사위 */}
        <div style={{ textAlign: "center", opacity: diceOpacity }}>
          <div
            style={{
              width: 100,
              height: 100,
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              transform: `rotate(${diceRotation}deg)`,
              boxShadow: "0 4px 20px rgba(239, 68, 68, 0.3)",
            }}
          >
            <span style={{ fontSize: 50, color: "white" }}>⚀</span>
          </div>
          <p style={{ fontSize: 26, color: "white", marginTop: 20 }}>주사위 (1 나올 확률)</p>
          <p style={{ fontSize: 32, color: "#ef4444", fontWeight: "bold" }}>P = 1/6 ≈ 0.17</p>
        </div>
      </div>

      {/* 공식 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: `translateX(-50%) scale(${formulaScale})`,
          opacity: formulaOpacity,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(139, 92, 246, 0.3))",
            border: "2px solid #a855f7",
            borderRadius: 20,
            padding: "30px 60px",
          }}
        >
          <p style={{ fontSize: 28, color: "#e879f9", margin: 0, marginBottom: 15 }}>확률 공식</p>
          <p style={{ fontSize: 42, color: "white", margin: 0, fontFamily: "serif" }}>
            P(A) = <span style={{ borderTop: "2px solid white", padding: "0 10px" }}>원하는 경우의 수</span>
          </p>
          <p style={{ fontSize: 42, color: "white", margin: 0, marginTop: 5, fontFamily: "serif" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ borderTop: "2px solid white", padding: "0 10px" }}>전체 경우의 수</span>
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
