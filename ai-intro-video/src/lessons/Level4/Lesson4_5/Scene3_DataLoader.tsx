import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene3_DataLoader: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Batch animation
  const batchCycle = Math.floor(frame / 60) % 4;
  const batchProgress = interpolate(frame % 60, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // Code spring
  const codeSpring = spring({ frame: frame - 30, fps, config: { damping: 15 } });

  // Feature cards
  const card1 = spring({ frame: frame - 80, fps, config: { damping: 12 } });
  const card2 = spring({ frame: frame - 120, fps, config: { damping: 12 } });
  const card3 = spring({ frame: frame - 160, fps, config: { damping: 12 } });
  const card4 = spring({ frame: frame - 200, fps, config: { damping: 12 } });

  // Sample data items
  const allData = ["🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🍒", "🥝", "🍌", "🍉", "🍈", "🫐"];
  const batchSize = 3;
  const currentBatch = allData.slice(batchCycle * batchSize, (batchCycle + 1) * batchSize);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-5/scene3.mp3")} />

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
          <span style={{ color: LEVEL_COLOR }}>DataLoader</span>
        </h1>
        <p style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>
          배치 단위로 데이터 공급
        </p>
      </div>

      {/* Batch visualization */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 60,
          width: 500,
        }}
      >
        {/* All data */}
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            marginBottom: 20,
          }}
        >
          <div style={{ color: "#9ca3af", fontSize: 18, marginBottom: 15 }}>전체 데이터 (12개)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {allData.map((item, idx) => (
              <div
                key={idx}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: currentBatch.includes(item) ? LEVEL_COLOR : "#374151",
                  borderRadius: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                  transition: "background-color 0.3s",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Current batch */}
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            border: `3px solid ${LEVEL_COLOR}`,
          }}
        >
          <div style={{ color: LEVEL_COLOR, fontSize: 20, marginBottom: 15, fontWeight: "bold" }}>
            현재 배치 (batch_size=3)
          </div>
          <div style={{ display: "flex", gap: 15, justifyContent: "center" }}>
            {currentBatch.map((item, idx) => (
              <div
                key={idx}
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: LEVEL_COLOR,
                  borderRadius: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 48,
                  transform: `scale(${batchProgress})`,
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div style={{ color: "#9ca3af", fontSize: 18, marginTop: 15, textAlign: "center" }}>
            배치 {batchCycle + 1} / 4
          </div>
        </div>
      </div>

      {/* Code block */}
      <div
        style={{
          position: "absolute",
          top: 160,
          right: 60,
          width: 520,
          transform: `scale(${codeSpring})`,
          transformOrigin: "top right",
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 25,
            fontFamily: "monospace",
            fontSize: 20,
            border: `2px solid ${LEVEL_COLOR}`,
          }}
        >
          <div style={{ color: "#9ca3af" }}>from torch.utils.data import DataLoader</div>
          <br />
          <div style={{ color: "white" }}>
            loader = <span style={{ color: "#22d3ee" }}>DataLoader</span>(
          </div>
          <div style={{ marginLeft: 30, color: "white" }}>
            dataset,
          </div>
          <div style={{ marginLeft: 30 }}>
            <span style={{ color: "#fbbf24" }}>batch_size</span>
            <span style={{ color: "white" }}>=32,</span>
          </div>
          <div style={{ marginLeft: 30 }}>
            <span style={{ color: "#fbbf24" }}>shuffle</span>
            <span style={{ color: "white" }}>=</span>
            <span style={{ color: "#c084fc" }}>True</span>
            <span style={{ color: "white" }}>,</span>
          </div>
          <div style={{ marginLeft: 30 }}>
            <span style={{ color: "#fbbf24" }}>num_workers</span>
            <span style={{ color: "white" }}>=4</span>
          </div>
          <div style={{ color: "white" }}>)</div>
        </div>
      </div>

      {/* Feature cards */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 60,
          right: 60,
          display: "flex",
          gap: 25,
        }}
      >
        <div
          style={{
            flex: 1,
            transform: `translateY(${(1 - card1) * 50}px)`,
            opacity: card1,
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            borderTop: `4px solid ${LEVEL_COLOR}`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>📦</div>
          <div style={{ color: LEVEL_COLOR, fontSize: 20, fontWeight: "bold" }}>batch_size</div>
          <div style={{ color: "#9ca3af", fontSize: 16, marginTop: 8 }}>한 번에 처리할 샘플 수</div>
        </div>

        <div
          style={{
            flex: 1,
            transform: `translateY(${(1 - card2) * 50}px)`,
            opacity: card2,
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            borderTop: `4px solid #10b981`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>🔀</div>
          <div style={{ color: "#10b981", fontSize: 20, fontWeight: "bold" }}>shuffle</div>
          <div style={{ color: "#9ca3af", fontSize: 16, marginTop: 8 }}>매 에폭마다 섞기</div>
        </div>

        <div
          style={{
            flex: 1,
            transform: `translateY(${(1 - card3) * 50}px)`,
            opacity: card3,
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            borderTop: `4px solid #8b5cf6`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>⚡</div>
          <div style={{ color: "#8b5cf6", fontSize: 20, fontWeight: "bold" }}>num_workers</div>
          <div style={{ color: "#9ca3af", fontSize: 16, marginTop: 8 }}>병렬 로딩 프로세스</div>
        </div>

        <div
          style={{
            flex: 1,
            transform: `translateY(${(1 - card4) * 50}px)`,
            opacity: card4,
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            borderTop: `4px solid #f43f5e`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>📌</div>
          <div style={{ color: "#f43f5e", fontSize: 20, fontWeight: "bold" }}>drop_last</div>
          <div style={{ color: "#9ca3af", fontSize: 16, marginTop: 8 }}>남은 샘플 버리기</div>
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
        Lesson 4-5 | DataLoader
      </div>
    </AbsoluteFill>
  );
};
