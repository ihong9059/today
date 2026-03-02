import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene2_Dataset: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const codeSpring = spring({ frame: frame - 30, fps, config: { damping: 15 } });

  // Method highlights
  const lenHighlight = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const getitemHighlight = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });

  // Right panel animation
  const panel1 = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const panel2 = spring({ frame: frame - 150, fps, config: { damping: 12 } });
  const panel3 = spring({ frame: frame - 240, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-5/scene2.mp3")} />

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
          <span style={{ color: LEVEL_COLOR }}>Dataset</span> 클래스
        </h1>
        <p style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>
          데이터를 정의하는 추상 인터페이스
        </p>
      </div>

      {/* Code block */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 60,
          width: 600,
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
          <div style={{ color: "#9ca3af" }}>from torch.utils.data import Dataset</div>
          <br />
          <div>
            <span style={{ color: "#c084fc" }}>class</span>{" "}
            <span style={{ color: "#22d3ee" }}>MyDataset</span>
            <span style={{ color: "white" }}>(</span>
            <span style={{ color: "#fbbf24" }}>Dataset</span>
            <span style={{ color: "white" }}>):</span>
          </div>

          {/* __len__ method */}
          <div
            style={{
              marginTop: 20,
              padding: "10px 15px",
              backgroundColor: `rgba(249, 115, 22, ${lenHighlight * 0.2})`,
              borderRadius: 8,
              border: `2px solid rgba(249, 115, 22, ${lenHighlight})`,
            }}
          >
            <span style={{ color: "#c084fc" }}>    def</span>{" "}
            <span style={{ color: "#4ade80" }}>__len__</span>
            <span style={{ color: "white" }}>(self):</span>
            <div style={{ marginLeft: 40, color: "#9ca3af", marginTop: 5 }}>
              # 데이터 개수 반환
            </div>
            <div style={{ marginLeft: 40, color: "white", marginTop: 5 }}>
              <span style={{ color: "#c084fc" }}>return</span> len(self.data)
            </div>
          </div>

          {/* __getitem__ method */}
          <div
            style={{
              marginTop: 20,
              padding: "10px 15px",
              backgroundColor: `rgba(249, 115, 22, ${getitemHighlight * 0.2})`,
              borderRadius: 8,
              border: `2px solid rgba(249, 115, 22, ${getitemHighlight})`,
            }}
          >
            <span style={{ color: "#c084fc" }}>    def</span>{" "}
            <span style={{ color: "#4ade80" }}>__getitem__</span>
            <span style={{ color: "white" }}>(self, idx):</span>
            <div style={{ marginLeft: 40, color: "#9ca3af", marginTop: 5 }}>
              # idx번째 샘플 반환
            </div>
            <div style={{ marginLeft: 40, color: "white", marginTop: 5 }}>
              <span style={{ color: "#c084fc" }}>return</span> self.data[idx]
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Method explanations */}
      <div
        style={{
          position: "absolute",
          top: 180,
          right: 60,
          width: 480,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        {/* Dataset concept */}
        <div
          style={{
            transform: `translateX(${(1 - panel1) * 100}px)`,
            opacity: panel1,
            backgroundColor: "#1e293b",
            padding: 25,
            borderRadius: 16,
            borderLeft: `4px solid ${LEVEL_COLOR}`,
          }}
        >
          <h3 style={{ color: LEVEL_COLOR, fontSize: 24, margin: 0 }}>Dataset이란?</h3>
          <p style={{ color: "#e2e8f0", fontSize: 20, marginTop: 15, lineHeight: 1.6 }}>
            데이터를 담는 컨테이너<br />
            PyTorch가 데이터를 읽을 수 있게 해주는 인터페이스
          </p>
        </div>

        {/* __len__ explanation */}
        <div
          style={{
            transform: `translateX(${(1 - panel2) * 100}px)`,
            opacity: panel2,
            backgroundColor: "#1e293b",
            padding: 25,
            borderRadius: 16,
            borderLeft: `4px solid #10b981`,
          }}
        >
          <h3 style={{ color: "#10b981", fontSize: 24, margin: 0 }}>__len__(self)</h3>
          <p style={{ color: "#e2e8f0", fontSize: 20, marginTop: 15, lineHeight: 1.6 }}>
            전체 데이터 개수를 반환<br />
            len(dataset) 호출 시 실행됨
          </p>
        </div>

        {/* __getitem__ explanation */}
        <div
          style={{
            transform: `translateX(${(1 - panel3) * 100}px)`,
            opacity: panel3,
            backgroundColor: "#1e293b",
            padding: 25,
            borderRadius: 16,
            borderLeft: `4px solid #8b5cf6`,
          }}
        >
          <h3 style={{ color: "#8b5cf6", fontSize: 24, margin: 0 }}>__getitem__(self, idx)</h3>
          <p style={{ color: "#e2e8f0", fontSize: 20, marginTop: 15, lineHeight: 1.6 }}>
            idx번째 데이터 샘플 반환<br />
            dataset[0] 형태로 접근 가능
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
        Lesson 4-5 | Dataset
      </div>
    </AbsoluteFill>
  );
};
