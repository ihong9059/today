import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene2_StateDict: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Code blocks animation
  const saveCodeOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const loadCodeOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  // Dictionary visualization
  const dictScale = spring({ frame: frame - 120, fps, from: 0, to: 1, durationInFrames: 30 });

  // Benefits animation
  const benefitsOpacity = interpolate(frame, [600, 640], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-7/scene2.mp3")} />

      {/* Title */}
      <h2
        style={{
          position: "absolute",
          top: 30,
          width: "100%",
          textAlign: "center",
          fontSize: 48,
          color: "white",
          opacity: titleOpacity,
          margin: 0,
        }}
      >
        <span style={{ color: LEVEL_COLOR }}>state_dict</span> 저장 방식
      </h2>

      {/* Recommended badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          backgroundColor: "#10b981",
          padding: "8px 20px",
          borderRadius: 20,
          fontSize: 18,
          fontWeight: "bold",
          color: "white",
          opacity: titleOpacity,
        }}
      >
        권장
      </div>

      {/* Save code block */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 60,
          width: 500,
          opacity: saveCodeOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#10b981",
            padding: "8px 15px",
            borderRadius: "10px 10px 0 0",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          저장 (Save)
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: "0 0 10px 10px",
            fontFamily: "monospace",
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          <div>
            <span style={{ color: "#f472b6" }}>torch</span>
            <span style={{ color: "#e2e8f0" }}>.</span>
            <span style={{ color: "#60a5fa" }}>save</span>
            <span style={{ color: "#e2e8f0" }}>(</span>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: "#e2e8f0" }}>model.</span>
            <span style={{ color: "#10b981" }}>state_dict</span>
            <span style={{ color: "#e2e8f0" }}>()</span>
            <span style={{ color: "#e2e8f0" }}>,</span>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: "#fbbf24" }}>'model.pt'</span>
          </div>
          <div>
            <span style={{ color: "#e2e8f0" }}>)</span>
          </div>
        </div>
      </div>

      {/* Dictionary visualization */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 60,
          width: 380,
          transform: `scale(${dictScale})`,
        }}
      >
        <div
          style={{
            backgroundColor: "#6366f1",
            padding: "8px 15px",
            borderRadius: "10px 10px 0 0",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          state_dict 구조
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 15,
            borderRadius: "0 0 10px 10px",
            fontFamily: "monospace",
            fontSize: 16,
            lineHeight: 1.5,
          }}
        >
          <div style={{ color: "#e2e8f0" }}>{"{"}</div>
          {[
            ["'layer1.weight'", "Tensor(...)"],
            ["'layer1.bias'", "Tensor(...)"],
            ["'layer2.weight'", "Tensor(...)"],
            ["'layer2.bias'", "Tensor(...)"],
          ].map(([key, val], i) => (
            <div key={i} style={{ paddingLeft: 15, color: "#e2e8f0" }}>
              <span style={{ color: "#fbbf24" }}>{key}</span>: {" "}
              <span style={{ color: "#60a5fa" }}>{val}</span>,
            </div>
          ))}
          <div style={{ color: "#e2e8f0" }}>{"}"}</div>
        </div>
      </div>

      {/* Load code block */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 60,
          width: 560,
          opacity: loadCodeOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#60a5fa",
            padding: "8px 15px",
            borderRadius: "10px 10px 0 0",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          로드 (Load)
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: "0 0 10px 10px",
            fontFamily: "monospace",
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          <div style={{ color: "#6b7280", marginBottom: 5 }}># 1. 동일 구조의 모델 생성</div>
          <div>
            <span style={{ color: "#e2e8f0" }}>model = </span>
            <span style={{ color: "#f472b6" }}>MyModel</span>
            <span style={{ color: "#e2e8f0" }}>()</span>
          </div>
          <div style={{ marginTop: 15, color: "#6b7280" }}># 2. 가중치 로드</div>
          <div>
            <span style={{ color: "#e2e8f0" }}>model.</span>
            <span style={{ color: "#10b981" }}>load_state_dict</span>
            <span style={{ color: "#e2e8f0" }}>(</span>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: "#f472b6" }}>torch</span>
            <span style={{ color: "#e2e8f0" }}>.</span>
            <span style={{ color: "#60a5fa" }}>load</span>
            <span style={{ color: "#e2e8f0" }}>(</span>
            <span style={{ color: "#fbbf24" }}>'model.pt'</span>
            <span style={{ color: "#e2e8f0" }}>)</span>
          </div>
          <div>
            <span style={{ color: "#e2e8f0" }}>)</span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div
        style={{
          position: "absolute",
          top: 360,
          right: 60,
          width: 380,
          opacity: benefitsOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#10b981",
            padding: "8px 15px",
            borderRadius: "10px 10px 0 0",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          장점
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: "0 0 10px 10px",
            fontSize: 20,
            lineHeight: 1.8,
          }}
        >
          {["파일 크기 작음", "호환성 우수", "파이썬 버전 독립", "클래스 구조 변경 가능"].map((benefit, i) => (
            <div key={i} style={{ color: "#e2e8f0" }}>
              <span style={{ color: "#10b981", marginRight: 10 }}>✓</span>
              {benefit}
            </div>
          ))}
        </div>
      </div>

      {/* Extension note */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          textAlign: "center",
          fontSize: 22,
          color: "#9ca3af",
        }}
      >
        확장자: <span style={{ color: LEVEL_COLOR }}>.pt</span> 또는{" "}
        <span style={{ color: LEVEL_COLOR }}>.pth</span>
      </div>
    </AbsoluteFill>
  );
};
