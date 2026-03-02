import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene2_Structure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Code animation
  const codeSpring = spring({ frame: frame - 30, fps, config: { damping: 15 } });

  // Highlight animations
  const epochHighlight = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" });
  const batchHighlight = interpolate(frame, [160, 190], [0, 1], { extrapolateRight: "clamp" });

  // Epoch counter animation
  const epochNum = Math.floor(frame / 60) % 5;
  const batchNum = Math.floor((frame % 60) / 15) % 4;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-6/scene2.mp3")} />

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
          학습 루프 <span style={{ color: LEVEL_COLOR }}>기본 구조</span>
        </h1>
        <p style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>
          이중 반복문: 에폭 × 배치
        </p>
      </div>

      {/* Code block */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 60,
          width: 700,
          transform: `scale(${codeSpring})`,
          transformOrigin: "top left",
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 30,
            fontFamily: "monospace",
            fontSize: 22,
            border: `2px solid ${LEVEL_COLOR}`,
          }}
        >
          {/* Epoch loop */}
          <div
            style={{
              padding: "10px 15px",
              backgroundColor: `rgba(249, 115, 22, ${epochHighlight * 0.2})`,
              borderRadius: 8,
              border: `2px solid rgba(249, 115, 22, ${epochHighlight})`,
              marginBottom: 10,
            }}
          >
            <span style={{ color: "#c084fc" }}>for</span>{" "}
            <span style={{ color: "#fbbf24" }}>epoch</span>{" "}
            <span style={{ color: "#c084fc" }}>in</span>{" "}
            <span style={{ color: "#22d3ee" }}>range</span>
            <span style={{ color: "white" }}>(num_epochs):</span>
          </div>

          {/* Batch loop */}
          <div
            style={{
              marginLeft: 30,
              padding: "10px 15px",
              backgroundColor: `rgba(16, 185, 129, ${batchHighlight * 0.2})`,
              borderRadius: 8,
              border: `2px solid rgba(16, 185, 129, ${batchHighlight})`,
              marginBottom: 10,
            }}
          >
            <span style={{ color: "#c084fc" }}>for</span>{" "}
            <span style={{ color: "#fbbf24" }}>inputs, labels</span>{" "}
            <span style={{ color: "#c084fc" }}>in</span>{" "}
            <span style={{ color: "white" }}>dataloader:</span>
          </div>

          {/* Training steps */}
          <div style={{ marginLeft: 60, color: "#9ca3af", marginTop: 15 }}>
            # 순전파
          </div>
          <div style={{ marginLeft: 60, color: "white" }}>
            outputs = model(inputs)
          </div>
          <div style={{ marginLeft: 60, color: "#9ca3af", marginTop: 15 }}>
            # 손실 계산
          </div>
          <div style={{ marginLeft: 60, color: "white" }}>
            loss = criterion(outputs, labels)
          </div>
          <div style={{ marginLeft: 60, color: "#9ca3af", marginTop: 15 }}>
            # 역전파
          </div>
          <div style={{ marginLeft: 60, color: "white" }}>
            optimizer.zero_grad()
          </div>
          <div style={{ marginLeft: 60, color: "white" }}>
            loss.backward()
          </div>
          <div style={{ marginLeft: 60, color: "white" }}>
            optimizer.step()
          </div>
        </div>
      </div>

      {/* Right side - visual representation */}
      <div
        style={{
          position: "absolute",
          top: 200,
          right: 60,
          width: 400,
        }}
      >
        {/* Epoch indicator */}
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 25,
            borderRadius: 16,
            marginBottom: 30,
            border: `2px solid ${LEVEL_COLOR}`,
          }}
        >
          <div style={{ color: LEVEL_COLOR, fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
            에폭 (Epoch)
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: n <= epochNum + 1 ? LEVEL_COLOR : "#374151",
                  borderRadius: 12,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {n}
              </div>
            ))}
          </div>
          <div style={{ color: "#9ca3af", fontSize: 18, marginTop: 15 }}>
            전체 데이터 1회 학습 = 1 에폭
          </div>
        </div>

        {/* Batch indicator */}
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 25,
            borderRadius: 16,
            border: `2px solid #10b981`,
          }}
        >
          <div style={{ color: "#10b981", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
            배치 (Batch)
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: i <= batchNum ? "#10b981" : "#374151",
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 18,
                  color: "white",
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div style={{ color: "#9ca3af", fontSize: 18, marginTop: 15 }}>
            한 번에 처리하는 샘플 묶음
          </div>
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
        Lesson 4-6 | Structure
      </div>
    </AbsoluteFill>
  );
};
