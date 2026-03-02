import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene6_CustomDataset: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const codeSpring = spring({ frame: frame - 30, fps, config: { damping: 15 } });

  // Method highlights
  const initHighlight = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" });
  const lenHighlight = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const getitemHighlight = interpolate(frame, [220, 250], [0, 1], { extrapolateRight: "clamp" });

  // Right panel
  const usageSpring = spring({ frame: frame - 280, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-5/scene6.mp3")} />

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
          <span style={{ color: LEVEL_COLOR }}>커스텀 Dataset</span> 구현
        </h1>
        <p style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>
          나만의 데이터셋 만들기
        </p>
      </div>

      {/* Code block */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 60,
          width: 680,
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
            fontSize: 20,
            border: `2px solid ${LEVEL_COLOR}`,
          }}
        >
          <div>
            <span style={{ color: "#c084fc" }}>class</span>{" "}
            <span style={{ color: "#22d3ee" }}>MyDataset</span>
            <span style={{ color: "white" }}>(Dataset):</span>
          </div>

          {/* __init__ */}
          <div
            style={{
              marginTop: 15,
              padding: "10px 15px",
              backgroundColor: `rgba(249, 115, 22, ${initHighlight * 0.2})`,
              borderRadius: 8,
              border: `2px solid rgba(249, 115, 22, ${initHighlight})`,
            }}
          >
            <span style={{ color: "#c084fc" }}>    def</span>{" "}
            <span style={{ color: "#4ade80" }}>__init__</span>
            <span style={{ color: "white" }}>(self, data, labels):</span>
            <div style={{ marginLeft: 40, color: "white", marginTop: 8 }}>
              self.data = data
            </div>
            <div style={{ marginLeft: 40, color: "white" }}>
              self.labels = labels
            </div>
          </div>

          {/* __len__ */}
          <div
            style={{
              marginTop: 15,
              padding: "10px 15px",
              backgroundColor: `rgba(16, 185, 129, ${lenHighlight * 0.2})`,
              borderRadius: 8,
              border: `2px solid rgba(16, 185, 129, ${lenHighlight})`,
            }}
          >
            <span style={{ color: "#c084fc" }}>    def</span>{" "}
            <span style={{ color: "#4ade80" }}>__len__</span>
            <span style={{ color: "white" }}>(self):</span>
            <div style={{ marginLeft: 40, color: "white", marginTop: 8 }}>
              <span style={{ color: "#c084fc" }}>return</span> len(self.data)
            </div>
          </div>

          {/* __getitem__ */}
          <div
            style={{
              marginTop: 15,
              padding: "10px 15px",
              backgroundColor: `rgba(139, 92, 246, ${getitemHighlight * 0.2})`,
              borderRadius: 8,
              border: `2px solid rgba(139, 92, 246, ${getitemHighlight})`,
            }}
          >
            <span style={{ color: "#c084fc" }}>    def</span>{" "}
            <span style={{ color: "#4ade80" }}>__getitem__</span>
            <span style={{ color: "white" }}>(self, idx):</span>
            <div style={{ marginLeft: 40, color: "white", marginTop: 8 }}>
              <span style={{ color: "#c084fc" }}>return</span> self.data[idx], self.labels[idx]
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Method descriptions */}
      <div
        style={{
          position: "absolute",
          top: 160,
          right: 60,
          width: 420,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            borderLeft: `4px solid ${LEVEL_COLOR}`,
            opacity: initHighlight,
            transform: `translateX(${(1 - initHighlight) * 50}px)`,
          }}
        >
          <h3 style={{ color: LEVEL_COLOR, fontSize: 22, margin: 0 }}>__init__</h3>
          <p style={{ color: "#e2e8f0", fontSize: 18, marginTop: 10, lineHeight: 1.5 }}>
            데이터와 레이블 저장<br/>
            필요한 초기화 작업 수행
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            borderLeft: `4px solid #10b981`,
            opacity: lenHighlight,
            transform: `translateX(${(1 - lenHighlight) * 50}px)`,
          }}
        >
          <h3 style={{ color: "#10b981", fontSize: 22, margin: 0 }}>__len__</h3>
          <p style={{ color: "#e2e8f0", fontSize: 18, marginTop: 10, lineHeight: 1.5 }}>
            데이터 개수 반환<br/>
            DataLoader가 배치 계산에 사용
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            borderLeft: `4px solid #8b5cf6`,
            opacity: getitemHighlight,
            transform: `translateX(${(1 - getitemHighlight) * 50}px)`,
          }}
        >
          <h3 style={{ color: "#8b5cf6", fontSize: 22, margin: 0 }}>__getitem__</h3>
          <p style={{ color: "#e2e8f0", fontSize: 18, marginTop: 10, lineHeight: 1.5 }}>
            idx번째 샘플 반환<br/>
            (데이터, 레이블) 튜플 형태
          </p>
        </div>
      </div>

      {/* Usage example */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 60,
          right: 60,
          transform: `translateY(${(1 - usageSpring) * 50}px)`,
          opacity: usageSpring,
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 20,
            fontFamily: "monospace",
            fontSize: 22,
            border: `2px solid #10b981`,
            display: "flex",
            alignItems: "center",
            gap: 30,
          }}
        >
          <div style={{ color: "#10b981", fontSize: 24, fontWeight: "bold" }}>사용:</div>
          <div style={{ color: "white" }}>
            dataset = <span style={{ color: "#22d3ee" }}>MyDataset</span>(data, labels)
          </div>
          <div style={{ color: "#9ca3af" }}>→</div>
          <div style={{ color: "white" }}>
            loader = <span style={{ color: "#22d3ee" }}>DataLoader</span>(dataset, batch_size=32)
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
        Lesson 4-5 | Custom Dataset
      </div>
    </AbsoluteFill>
  );
};
