import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

  // Data flow animation
  const dataFlow = interpolate(frame, [0, 120], [0, 360], { extrapolateRight: "extend" });

  // Pipeline blocks animation
  const block1 = spring({ frame: frame - 50, fps, config: { damping: 15 } });
  const block2 = spring({ frame: frame - 70, fps, config: { damping: 15 } });
  const block3 = spring({ frame: frame - 90, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-5/scene1.mp3")} />

      {/* Animated data particles background */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: LEVEL_COLOR,
            opacity: 0.3,
            left: `${(i * 5 + dataFlow * 0.1) % 100}%`,
            top: `${20 + Math.sin(i + dataFlow * 0.02) * 30}%`,
          }}
        />
      ))}

      {/* Level badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          backgroundColor: LEVEL_COLOR,
          padding: "8px 20px",
          borderRadius: 20,
          fontSize: 24,
          fontWeight: "bold",
          color: "white",
        }}
      >
        Level 4 - PyTorch 실전
      </div>

      {/* Main title */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          width: "100%",
          textAlign: "center",
          transform: `scale(${titleSpring})`,
        }}
      >
        <h1 style={{ fontSize: 90, color: "white", margin: 0 }}>
          데이터 <span style={{ color: LEVEL_COLOR }}>로딩</span>
        </h1>
        <p
          style={{
            fontSize: 36,
            color: "#94a3b8",
            marginTop: 20,
            opacity: subtitleOpacity,
          }}
        >
          Dataset, DataLoader, transforms
        </p>
      </div>

      {/* Data pipeline visualization */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Raw Data */}
        <div
          style={{
            transform: `scale(${block1})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 160,
              height: 100,
              backgroundColor: "#1e293b",
              border: `3px solid ${LEVEL_COLOR}`,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 36 }}>📁</div>
            <div style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Raw Data</div>
          </div>
        </div>

        {/* Arrow 1 */}
        <div
          style={{
            fontSize: 48,
            color: LEVEL_COLOR,
            opacity: block1,
          }}
        >
          →
        </div>

        {/* Dataset */}
        <div
          style={{
            transform: `scale(${block2})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 160,
              height: 100,
              backgroundColor: "#1e293b",
              border: `3px solid #10b981`,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 36 }}>📦</div>
            <div style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Dataset</div>
          </div>
        </div>

        {/* Arrow 2 */}
        <div
          style={{
            fontSize: 48,
            color: LEVEL_COLOR,
            opacity: block2,
          }}
        >
          →
        </div>

        {/* DataLoader */}
        <div
          style={{
            transform: `scale(${block3})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 160,
              height: 100,
              backgroundColor: "#1e293b",
              border: `3px solid #8b5cf6`,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 36 }}>🔄</div>
            <div style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>DataLoader</div>
          </div>
        </div>

        {/* Arrow 3 */}
        <div
          style={{
            fontSize: 48,
            color: LEVEL_COLOR,
            opacity: block3,
          }}
        >
          →
        </div>

        {/* Model */}
        <div
          style={{
            transform: `scale(${block3})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 160,
              height: 100,
              backgroundColor: "#1e293b",
              border: `3px solid #f43f5e`,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 36 }}>🧠</div>
            <div style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Model</div>
          </div>
        </div>
      </div>

      {/* Lesson number */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          color: "#64748b",
          fontSize: 24,
        }}
      >
        Lesson 4-5
      </div>
    </AbsoluteFill>
  );
};
