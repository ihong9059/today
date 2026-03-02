import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene4_Checkpoint: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // What's in checkpoint
  const checkpointOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });

  // Save code
  const saveOpacity = interpolate(frame, [200, 240], [0, 1], { extrapolateRight: "clamp" });

  // Load code
  const loadOpacity = interpolate(frame, [500, 540], [0, 1], { extrapolateRight: "clamp" });

  // Resume visualization
  const resumeOpacity = interpolate(frame, [700, 740], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-7/scene4.mp3")} />

      {/* Title */}
      <h2
        style={{
          position: "absolute",
          top: 25,
          width: "100%",
          textAlign: "center",
          fontSize: 48,
          color: "white",
          opacity: titleOpacity,
          margin: 0,
        }}
      >
        <span style={{ color: "#8b5cf6" }}>체크포인트</span> 저장
      </h2>

      {/* What's in checkpoint */}
      <div
        style={{
          position: "absolute",
          top: 90,
          right: 40,
          width: 320,
          opacity: checkpointOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#8b5cf6",
            padding: "8px 15px",
            borderRadius: "10px 10px 0 0",
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
          }}
        >
          체크포인트 포함 내용
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 15,
            borderRadius: "0 0 10px 10px",
            fontSize: 18,
            lineHeight: 1.8,
          }}
        >
          {[
            { icon: "🔢", text: "현재 에폭", color: LEVEL_COLOR },
            { icon: "🧠", text: "모델 가중치", color: "#10b981" },
            { icon: "⚡", text: "옵티마이저 상태", color: "#60a5fa" },
            { icon: "📉", text: "손실 값", color: "#f43f5e" },
          ].map((item, i) => (
            <div key={i} style={{ color: "#e2e8f0", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ color: item.color }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Save code */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 40,
          width: 600,
          opacity: saveOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#10b981",
            padding: "8px 15px",
            borderRadius: "10px 10px 0 0",
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
          }}
        >
          체크포인트 저장
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
          <div>
            <span style={{ color: "#f472b6" }}>torch</span>
            <span style={{ color: "#e2e8f0" }}>.</span>
            <span style={{ color: "#60a5fa" }}>save</span>
            <span style={{ color: "#e2e8f0" }}>({"{"}</span>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: "#fbbf24" }}>'epoch'</span>
            <span style={{ color: "#e2e8f0" }}>: epoch,</span>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: "#fbbf24" }}>'model_state_dict'</span>
            <span style={{ color: "#e2e8f0" }}>: model.state_dict(),</span>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: "#fbbf24" }}>'optimizer_state_dict'</span>
            <span style={{ color: "#e2e8f0" }}>: optimizer.state_dict(),</span>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: "#fbbf24" }}>'loss'</span>
            <span style={{ color: "#e2e8f0" }}>: loss,</span>
          </div>
          <div>
            <span style={{ color: "#e2e8f0" }}>{"}"}, </span>
            <span style={{ color: "#fbbf24" }}>'checkpoint.pt'</span>
            <span style={{ color: "#e2e8f0" }}>)</span>
          </div>
        </div>
      </div>

      {/* Load code */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 40,
          width: 600,
          opacity: loadOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#60a5fa",
            padding: "8px 15px",
            borderRadius: "10px 10px 0 0",
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
          }}
        >
          체크포인트 로드
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
          <div>
            <span style={{ color: "#e2e8f0" }}>checkpoint = </span>
            <span style={{ color: "#f472b6" }}>torch</span>
            <span style={{ color: "#e2e8f0" }}>.</span>
            <span style={{ color: "#60a5fa" }}>load</span>
            <span style={{ color: "#e2e8f0" }}>(</span>
            <span style={{ color: "#fbbf24" }}>'checkpoint.pt'</span>
            <span style={{ color: "#e2e8f0" }}>)</span>
          </div>
          <div style={{ marginTop: 10 }}>
            <span style={{ color: "#e2e8f0" }}>model.load_state_dict(checkpoint[</span>
            <span style={{ color: "#fbbf24" }}>'model_state_dict'</span>
            <span style={{ color: "#e2e8f0" }}>])</span>
          </div>
          <div>
            <span style={{ color: "#e2e8f0" }}>optimizer.load_state_dict(checkpoint[</span>
            <span style={{ color: "#fbbf24" }}>'optimizer_state_dict'</span>
            <span style={{ color: "#e2e8f0" }}>])</span>
          </div>
          <div>
            <span style={{ color: "#e2e8f0" }}>epoch = checkpoint[</span>
            <span style={{ color: "#fbbf24" }}>'epoch'</span>
            <span style={{ color: "#e2e8f0" }}>]</span>
          </div>
        </div>
      </div>

      {/* Resume training visualization */}
      <div
        style={{
          position: "absolute",
          top: 360,
          right: 40,
          width: 320,
          opacity: resumeOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: LEVEL_COLOR,
            padding: "8px 15px",
            borderRadius: "10px 10px 0 0",
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          학습 재개 가능!
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: "0 0 10px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
          }}
        >
          {/* Progress bar simulation */}
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ color: "#9ca3af", fontSize: 14 }}>Epoch 50</span>
              <span style={{ color: "#f43f5e", fontSize: 14 }}>중단!</span>
            </div>
            <div
              style={{
                width: "100%",
                height: 12,
                backgroundColor: "#374151",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  backgroundColor: LEVEL_COLOR,
                }}
              />
            </div>
          </div>

          <div style={{ fontSize: 30, color: "#10b981" }}>⬇️</div>

          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ color: "#9ca3af", fontSize: 14 }}>Epoch 51~100</span>
              <span style={{ color: "#10b981", fontSize: 14 }}>재개!</span>
            </div>
            <div
              style={{
                width: "100%",
                height: 12,
                backgroundColor: "#374151",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#10b981",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
