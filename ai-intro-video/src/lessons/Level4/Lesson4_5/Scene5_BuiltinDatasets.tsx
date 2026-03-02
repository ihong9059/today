import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene5_BuiltinDatasets: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Dataset cards
  const card1 = spring({ frame: frame - 40, fps, config: { damping: 12 } });
  const card2 = spring({ frame: frame - 70, fps, config: { damping: 12 } });
  const card3 = spring({ frame: frame - 100, fps, config: { damping: 12 } });
  const card4 = spring({ frame: frame - 130, fps, config: { damping: 12 } });

  // Code animation
  const codeSpring = spring({ frame: frame - 160, fps, config: { damping: 15 } });

  // Parameter highlights
  const rootHighlight = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });
  const trainHighlight = interpolate(frame, [260, 290], [0, 1], { extrapolateRight: "clamp" });
  const downloadHighlight = interpolate(frame, [320, 350], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-5/scene5.mp3")} />

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
          <span style={{ color: LEVEL_COLOR }}>내장 데이터셋</span>
        </h1>
        <p style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>
          torchvision.datasets - 벤치마크 데이터셋
        </p>
      </div>

      {/* Dataset cards */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 60,
          display: "flex",
          gap: 25,
        }}
      >
        <div
          style={{
            width: 200,
            transform: `scale(${card1})`,
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            border: `3px solid ${LEVEL_COLOR}`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 10 }}>🔢</div>
          <div style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>MNIST</div>
          <div style={{ color: "#9ca3af", fontSize: 16, marginTop: 10 }}>손글씨 숫자<br/>28×28 흑백</div>
          <div style={{ color: LEVEL_COLOR, fontSize: 14, marginTop: 10 }}>70,000장</div>
        </div>

        <div
          style={{
            width: 200,
            transform: `scale(${card2})`,
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            border: `3px solid #10b981`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 10 }}>🖼️</div>
          <div style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>CIFAR-10</div>
          <div style={{ color: "#9ca3af", fontSize: 16, marginTop: 10 }}>10개 클래스<br/>32×32 컬러</div>
          <div style={{ color: "#10b981", fontSize: 14, marginTop: 10 }}>60,000장</div>
        </div>

        <div
          style={{
            width: 200,
            transform: `scale(${card3})`,
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            border: `3px solid #8b5cf6`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 10 }}>👕</div>
          <div style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Fashion</div>
          <div style={{ color: "#9ca3af", fontSize: 16, marginTop: 10 }}>의류 이미지<br/>28×28 흑백</div>
          <div style={{ color: "#8b5cf6", fontSize: 14, marginTop: 10 }}>70,000장</div>
        </div>

        <div
          style={{
            width: 200,
            transform: `scale(${card4})`,
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            border: `3px solid #f43f5e`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 10 }}>📸</div>
          <div style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>ImageNet</div>
          <div style={{ color: "#9ca3af", fontSize: 16, marginTop: 10 }}>1000 클래스<br/>224×224</div>
          <div style={{ color: "#f43f5e", fontSize: 14, marginTop: 10 }}>1,200,000장</div>
        </div>
      </div>

      {/* Code example */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 60,
          right: 60,
          transform: `scale(${codeSpring})`,
          transformOrigin: "bottom center",
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
          <div style={{ color: "#9ca3af" }}>from torchvision import datasets</div>
          <br />
          <div style={{ color: "white" }}>
            train_data = <span style={{ color: "#22d3ee" }}>datasets.MNIST</span>(
          </div>
          <div
            style={{
              marginLeft: 30,
              padding: "5px 10px",
              backgroundColor: `rgba(249, 115, 22, ${rootHighlight * 0.2})`,
              borderRadius: 6,
              display: "inline-block",
            }}
          >
            <span style={{ color: "#fbbf24" }}>root</span>
            <span style={{ color: "white" }}>=</span>
            <span style={{ color: "#a5f3fc" }}>"./data"</span>
            <span style={{ color: "white" }}>,</span>
            <span style={{ color: "#9ca3af", marginLeft: 20 }}># 저장 경로</span>
          </div>
          <br />
          <div
            style={{
              marginLeft: 30,
              padding: "5px 10px",
              backgroundColor: `rgba(16, 185, 129, ${trainHighlight * 0.2})`,
              borderRadius: 6,
              display: "inline-block",
            }}
          >
            <span style={{ color: "#fbbf24" }}>train</span>
            <span style={{ color: "white" }}>=</span>
            <span style={{ color: "#c084fc" }}>True</span>
            <span style={{ color: "white" }}>,</span>
            <span style={{ color: "#9ca3af", marginLeft: 20 }}># 학습용 데이터</span>
          </div>
          <br />
          <div
            style={{
              marginLeft: 30,
              padding: "5px 10px",
              backgroundColor: `rgba(139, 92, 246, ${downloadHighlight * 0.2})`,
              borderRadius: 6,
              display: "inline-block",
            }}
          >
            <span style={{ color: "#fbbf24" }}>download</span>
            <span style={{ color: "white" }}>=</span>
            <span style={{ color: "#c084fc" }}>True</span>
            <span style={{ color: "white" }}>,</span>
            <span style={{ color: "#9ca3af", marginLeft: 20 }}># 자동 다운로드</span>
          </div>
          <br />
          <div style={{ marginLeft: 30, color: "white" }}>
            <span style={{ color: "#fbbf24" }}>transform</span>=transform
          </div>
          <div style={{ color: "white" }}>)</div>
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
        Lesson 4-5 | Built-in Datasets
      </div>
    </AbsoluteFill>
  );
};
