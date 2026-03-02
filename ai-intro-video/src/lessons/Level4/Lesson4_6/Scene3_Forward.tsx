import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene3_Forward: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Flow animation
  const flowProgress = interpolate(frame, [60, 180], [0, 1], { extrapolateRight: "clamp" });

  // Code highlights
  const outputHighlight = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  const lossHighlight = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });

  // Model animation
  const modelSpring = spring({ frame: frame - 40, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-6/scene3.mp3")} />

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
          <span style={{ color: "#10b981" }}>순전파</span> & 손실 계산
        </h1>
        <p style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>
          Forward Pass & Loss Calculation
        </p>
      </div>

      {/* Flow diagram */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Input */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: modelSpring,
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              backgroundColor: "#1e293b",
              border: `3px solid #9ca3af`,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 48 }}>📥</div>
            <div style={{ color: "white", fontSize: 20, marginTop: 10 }}>inputs</div>
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            fontSize: 40,
            color: LEVEL_COLOR,
            opacity: flowProgress,
          }}
        >
          →
        </div>

        {/* Model */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${modelSpring})`,
          }}
        >
          <div
            style={{
              width: 180,
              height: 140,
              backgroundColor: "#1e293b",
              border: `3px solid #10b981`,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 48 }}>🧠</div>
            <div style={{ color: "#10b981", fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
              model(x)
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            fontSize: 40,
            color: LEVEL_COLOR,
            opacity: flowProgress,
          }}
        >
          →
        </div>

        {/* Output */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: flowProgress,
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              backgroundColor: "#1e293b",
              border: `3px solid ${LEVEL_COLOR}`,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 48 }}>📤</div>
            <div style={{ color: LEVEL_COLOR, fontSize: 20, marginTop: 10 }}>outputs</div>
          </div>
        </div>

        {/* Arrow to Loss */}
        <div
          style={{
            fontSize: 40,
            color: LEVEL_COLOR,
            opacity: lossHighlight,
          }}
        >
          →
        </div>

        {/* Loss */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: lossHighlight,
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              backgroundColor: "#1e293b",
              border: `3px solid #f43f5e`,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 48 }}>📉</div>
            <div style={{ color: "#f43f5e", fontSize: 20, marginTop: 10 }}>loss</div>
          </div>
        </div>
      </div>

      {/* Code examples */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 60,
          right: 60,
          display: "flex",
          gap: 30,
        }}
      >
        {/* Forward code */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 25,
            fontFamily: "monospace",
            fontSize: 22,
            border: `2px solid rgba(16, 185, 129, ${outputHighlight})`,
          }}
        >
          <div style={{ color: "#9ca3af", marginBottom: 10 }}># 순전파</div>
          <div>
            <span style={{ color: "#fbbf24" }}>outputs</span>
            <span style={{ color: "white" }}> = </span>
            <span style={{ color: "#22d3ee" }}>model</span>
            <span style={{ color: "white" }}>(inputs)</span>
          </div>
        </div>

        {/* Loss code */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 25,
            fontFamily: "monospace",
            fontSize: 22,
            border: `2px solid rgba(244, 63, 94, ${lossHighlight})`,
          }}
        >
          <div style={{ color: "#9ca3af", marginBottom: 10 }}># 손실 계산</div>
          <div>
            <span style={{ color: "#fbbf24" }}>loss</span>
            <span style={{ color: "white" }}> = </span>
            <span style={{ color: "#22d3ee" }}>criterion</span>
            <span style={{ color: "white" }}>(outputs, labels)</span>
          </div>
        </div>
      </div>

      {/* Loss function note */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: lossHighlight,
        }}
      >
        <span style={{ color: "#9ca3af", fontSize: 20 }}>대표적 손실함수:</span>
        <span
          style={{
            backgroundColor: "#374151",
            padding: "8px 16px",
            borderRadius: 8,
            color: "#f43f5e",
            fontSize: 18,
          }}
        >
          CrossEntropyLoss
        </span>
        <span
          style={{
            backgroundColor: "#374151",
            padding: "8px 16px",
            borderRadius: 8,
            color: "#f43f5e",
            fontSize: 18,
          }}
        >
          MSELoss
        </span>
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
        Lesson 4-6 | Forward
      </div>
    </AbsoluteFill>
  );
};
