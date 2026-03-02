import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, from: -50, to: 0, durationInFrames: 30 });

  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });

  // Save/Load icons animation
  const iconScale = spring({ frame: frame - 60, fps, from: 0, to: 1, durationInFrames: 20 });

  // Animated save arrow
  const saveArrowY = interpolate(
    (frame - 90) % 60,
    [0, 30, 60],
    [0, 20, 0],
    { extrapolateRight: "clamp" }
  );

  const loadArrowY = interpolate(
    (frame - 120) % 60,
    [0, 30, 60],
    [20, 0, 20],
    { extrapolateRight: "clamp" }
  );

  const topicsOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-7/scene1.mp3")} />

      {/* Level badge */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          backgroundColor: LEVEL_COLOR,
          padding: "8px 20px",
          borderRadius: 20,
          fontSize: 24,
          fontWeight: "bold",
          color: "white",
        }}
      >
        Level 4
      </div>

      {/* Lesson number */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          color: "#9ca3af",
          fontSize: 24,
        }}
      >
        4-7
      </div>

      {/* Title */}
      <h1
        style={{
          position: "absolute",
          top: 100,
          width: "100%",
          textAlign: "center",
          fontSize: 72,
          color: "white",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          margin: 0,
        }}
      >
        모델 <span style={{ color: LEVEL_COLOR }}>저장</span>과{" "}
        <span style={{ color: "#10b981" }}>로드</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          position: "absolute",
          top: 190,
          width: "100%",
          textAlign: "center",
          fontSize: 28,
          color: "#9ca3af",
          opacity: subtitleOpacity,
          margin: 0,
        }}
      >
        torch.save() & torch.load()
      </p>

      {/* Save/Load visualization */}
      <div
        style={{
          position: "absolute",
          top: 280,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 100,
          transform: `scale(${iconScale})`,
        }}
      >
        {/* Save icon */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              backgroundColor: "#1e293b",
              border: `4px solid ${LEVEL_COLOR}`,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 40 }}>💾</div>
            <div
              style={{
                fontSize: 24,
                color: LEVEL_COLOR,
                transform: `translateY(${saveArrowY}px)`,
              }}
            >
              ↓
            </div>
          </div>
          <div style={{ color: LEVEL_COLOR, fontSize: 24, fontWeight: "bold" }}>Save</div>
        </div>

        {/* .pt file icon */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              backgroundColor: "#1e293b",
              border: "4px solid #6366f1",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 40 }}>📄</div>
            <div style={{ fontSize: 20, color: "#6366f1", fontWeight: "bold" }}>.pt</div>
          </div>
          <div style={{ color: "#6366f1", fontSize: 24, fontWeight: "bold" }}>File</div>
        </div>

        {/* Load icon */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              backgroundColor: "#1e293b",
              border: "4px solid #10b981",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: "#10b981",
                transform: `translateY(${loadArrowY}px)`,
              }}
            >
              ↑
            </div>
            <div style={{ fontSize: 40 }}>📥</div>
          </div>
          <div style={{ color: "#10b981", fontSize: 24, fontWeight: "bold" }}>Load</div>
        </div>
      </div>

      {/* Topics preview */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
          opacity: topicsOpacity,
        }}
      >
        {["state_dict", "전체 모델", "체크포인트"].map((topic, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#1e293b",
              padding: "12px 25px",
              borderRadius: 25,
              fontSize: 22,
              color: "#e2e8f0",
              border: `2px solid ${i === 0 ? LEVEL_COLOR : i === 1 ? "#10b981" : "#8b5cf6"}`,
            }}
          >
            {topic}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
