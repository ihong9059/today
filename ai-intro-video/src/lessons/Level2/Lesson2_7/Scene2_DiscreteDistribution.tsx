import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

export const Scene2_DiscreteDistribution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // 주사위 등장
  const diceOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const diceRotation = frame * 2;

  // 막대 그래프 애니메이션
  const barProgress = interpolate(frame, [90, 180], [0, 1], { extrapolateRight: "clamp" });

  // 동전 등장
  const coinOpacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });
  const coinFlip = interpolate(frame, [200, 280], [0, 360], { extrapolateRight: "clamp" });

  // 베르누이 분포 설명
  const bernoulliOpacity = interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" });

  const barHeight = 120;
  const probability = 1 / 6;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Audio src={staticFile("audio/lesson-2-7/scene2.mp3")} />

      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 30% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
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
        <h2 style={{ fontSize: 56, color: "#a855f7", margin: 0 }}>이산 확률분포</h2>
        <p style={{ fontSize: 28, color: "#c084fc", marginTop: 10 }}>Discrete Probability Distribution</p>
      </div>

      {/* 주사위 섹션 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "8%",
          opacity: diceOpacity,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 50,
            transform: `rotateZ(${diceRotation % 360}deg)`,
            boxShadow: "0 4px 20px rgba(249, 115, 22, 0.4)",
          }}
        >
          🎲
        </div>
        <p style={{ color: "white", fontSize: 20, marginTop: 10, textAlign: "center" }}>주사위</p>
      </div>

      {/* 균등 분포 막대 그래프 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "25%",
          width: "50%",
        }}
      >
        <p style={{ color: "#fbbf24", fontSize: 22, marginBottom: 15, opacity: diceOpacity }}>
          균등 분포 (Uniform Distribution)
        </p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 20, height: 150 }}>
          {[1, 2, 3, 4, 5, 6].map((num, i) => (
            <div key={num} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 60,
                  height: barHeight * barProgress,
                  background: `linear-gradient(180deg, #a855f7, #7c3aed)`,
                  borderRadius: "8px 8px 0 0",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingTop: 8,
                }}
              >
                <span style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                  {barProgress > 0.5 ? `${(probability * 100).toFixed(1)}%` : ""}
                </span>
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: "white",
                  marginTop: 8,
                  opacity: barProgress,
                }}
              >
                {num}
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            color: "#c084fc",
            fontSize: 20,
            marginTop: 15,
            opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          모든 결과의 확률이 동일합니다: P(x) = 1/6
        </p>
      </div>

      {/* 동전 섹션 */}
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "8%",
          opacity: coinOpacity,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            transform: `rotateY(${coinFlip}deg)`,
            boxShadow: "0 4px 20px rgba(251, 191, 36, 0.4)",
          }}
        >
          🪙
        </div>
        <p style={{ color: "white", fontSize: 20, marginTop: 10, textAlign: "center" }}>동전</p>
      </div>

      {/* 베르누이 분포 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "25%",
          opacity: bernoulliOpacity,
        }}
      >
        <p style={{ color: "#fbbf24", fontSize: 22, marginBottom: 15 }}>
          베르누이 분포 (Bernoulli Distribution)
        </p>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          <div
            style={{
              background: "rgba(168, 85, 247, 0.2)",
              border: "2px solid #a855f7",
              borderRadius: 12,
              padding: "15px 30px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 36 }}>앞면</div>
            <div style={{ fontSize: 24, color: "#e879f9", marginTop: 5 }}>P = 0.5</div>
          </div>
          <div style={{ fontSize: 32, color: "#c084fc" }}>또는</div>
          <div
            style={{
              background: "rgba(236, 72, 153, 0.2)",
              border: "2px solid #ec4899",
              borderRadius: 12,
              padding: "15px 30px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 36 }}>뒷면</div>
            <div style={{ fontSize: 24, color: "#f472b6", marginTop: 5 }}>P = 0.5</div>
          </div>
        </div>
        <p style={{ color: "#c084fc", fontSize: 20, marginTop: 15 }}>
          두 가지 결과만 있는 분포입니다
        </p>
      </div>

      {/* 레슨 번호 */}
      <div style={{ position: "absolute", bottom: 30, right: 40, fontSize: 24, color: "#a855f7", opacity: 0.7 }}>
        Lesson 2-7
      </div>
    </AbsoluteFill>
  );
};
