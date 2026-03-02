import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene6_Monitoring: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Loss curve animation
  const curveProgress = interpolate(frame, [30, 200], [0, 1], { extrapolateRight: "clamp" });

  // Generate loss values
  const generateLossPoints = (progress: number, isVal: boolean) => {
    const points = [];
    const steps = 20;
    for (let i = 0; i <= steps * progress; i++) {
      const x = 100 + (i / steps) * 500;
      const decay = Math.exp(-i / (steps * 0.3));
      const noise = isVal ? Math.sin(i * 0.5) * 0.1 + 0.15 : Math.sin(i * 0.3) * 0.05;
      const y = 250 - (1 - decay - noise) * 180;
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  // Info cards animation
  const card1 = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const card2 = spring({ frame: frame - 120, fps, config: { damping: 12 } });
  const card3 = spring({ frame: frame - 180, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-6/scene6.mp3")} />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          opacity: titleOpacity,
        }}
      >
        <h1 style={{ fontSize: 56, color: "white", margin: 0 }}>
          학습 <span style={{ color: LEVEL_COLOR }}>모니터링</span>
        </h1>
        <p style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>
          손실 추적 & 과적합 감지
        </p>
      </div>

      {/* Loss chart */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 60,
          width: 700,
          height: 350,
          backgroundColor: "#1e293b",
          borderRadius: 16,
          padding: 20,
          border: `2px solid ${LEVEL_COLOR}`,
        }}
      >
        <div style={{ color: LEVEL_COLOR, fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
          Loss Curve
        </div>

        <svg width="100%" height="280" viewBox="0 0 650 280">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="80"
              y1={50 + i * 50}
              x2="620"
              y2={50 + i * 50}
              stroke="#374151"
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          <line x1="80" y1="250" x2="620" y2="250" stroke="#9ca3af" strokeWidth="2" />
          <line x1="80" y1="50" x2="80" y2="250" stroke="#9ca3af" strokeWidth="2" />

          {/* Labels */}
          <text x="350" y="275" fill="#9ca3af" fontSize="16" textAnchor="middle">
            Epoch
          </text>
          <text x="40" y="150" fill="#9ca3af" fontSize="16" textAnchor="middle" transform="rotate(-90, 40, 150)">
            Loss
          </text>

          {/* Training loss curve */}
          <polyline
            points={generateLossPoints(curveProgress, false)}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
          />

          {/* Validation loss curve */}
          <polyline
            points={generateLossPoints(curveProgress, true)}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="3"
            strokeDasharray="8,4"
          />
        </svg>

        {/* Legend */}
        <div style={{ display: "flex", gap: 30, marginTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 4, backgroundColor: "#10b981" }} />
            <span style={{ color: "#10b981", fontSize: 16 }}>Train Loss</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 4, backgroundColor: "#f43f5e", borderTop: "4px dashed #f43f5e" }} />
            <span style={{ color: "#f43f5e", fontSize: 16 }}>Val Loss</span>
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div
        style={{
          position: "absolute",
          top: 160,
          right: 60,
          width: 400,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            transform: `translateX(${(1 - card1) * 100}px)`,
            opacity: card1,
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            borderLeft: `4px solid #10b981`,
          }}
        >
          <h3 style={{ color: "#10b981", fontSize: 22, margin: 0 }}>손실 감소</h3>
          <p style={{ color: "#e2e8f0", fontSize: 18, marginTop: 10, lineHeight: 1.5 }}>
            손실이 점점 줄어들면<br />학습이 잘 되고 있는 것
          </p>
        </div>

        <div
          style={{
            transform: `translateX(${(1 - card2) * 100}px)`,
            opacity: card2,
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            borderLeft: `4px solid #f43f5e`,
          }}
        >
          <h3 style={{ color: "#f43f5e", fontSize: 22, margin: 0 }}>과적합 감지</h3>
          <p style={{ color: "#e2e8f0", fontSize: 18, marginTop: 10, lineHeight: 1.5 }}>
            Train↓ Val↑ 이면 과적합<br />
            Early Stopping 적용
          </p>
        </div>

        <div
          style={{
            transform: `translateX(${(1 - card3) * 100}px)`,
            opacity: card3,
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            borderLeft: `4px solid #8b5cf6`,
          }}
        >
          <h3 style={{ color: "#8b5cf6", fontSize: 22, margin: 0 }}>시각화 도구</h3>
          <p style={{ color: "#e2e8f0", fontSize: 18, marginTop: 10, lineHeight: 1.5 }}>
            TensorBoard, Wandb로<br />
            학습 과정 실시간 모니터링
          </p>
        </div>
      </div>

      {/* Lesson indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 60,
          color: "#64748b",
          fontSize: 24,
        }}
      >
        Lesson 4-6 | Monitoring
      </div>
    </AbsoluteFill>
  );
};
