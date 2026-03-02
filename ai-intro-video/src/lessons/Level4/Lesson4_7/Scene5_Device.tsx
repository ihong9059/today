import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene5_Device: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // GPU to CPU
  const gpuToCpuOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });

  // CPU to GPU
  const cpuToGpuOpacity = interpolate(frame, [300, 340], [0, 1], { extrapolateRight: "clamp" });

  // DataParallel note
  const dpOpacity = interpolate(frame, [550, 590], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-7/scene5.mp3")} />

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
        <span style={{ color: "#10b981" }}>GPU</span> ↔{" "}
        <span style={{ color: "#60a5fa" }}>CPU</span> 모델 이동
      </h2>

      {/* GPU to CPU */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 50,
          width: 520,
          opacity: gpuToCpuOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            marginBottom: 15,
          }}
        >
          <div
            style={{
              backgroundColor: "#10b981",
              padding: "8px 20px",
              borderRadius: 20,
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            GPU
          </div>
          <span style={{ fontSize: 30, color: "#e2e8f0" }}>→</span>
          <div
            style={{
              backgroundColor: "#60a5fa",
              padding: "8px 20px",
              borderRadius: 20,
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            CPU
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 10,
            fontFamily: "monospace",
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          <div style={{ color: "#6b7280", marginBottom: 5 }}># map_location 옵션 사용</div>
          <div>
            <span style={{ color: "#e2e8f0" }}>model.load_state_dict(</span>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: "#f472b6" }}>torch</span>
            <span style={{ color: "#e2e8f0" }}>.</span>
            <span style={{ color: "#60a5fa" }}>load</span>
            <span style={{ color: "#e2e8f0" }}>(</span>
            <span style={{ color: "#fbbf24" }}>'model.pt'</span>
            <span style={{ color: "#e2e8f0" }}>,</span>
          </div>
          <div style={{ paddingLeft: 40 }}>
            <span style={{ color: "#e2e8f0" }}>map_location=</span>
            <span style={{ color: "#fbbf24" }}>'cpu'</span>
            <span style={{ color: "#e2e8f0" }}>)</span>
          </div>
          <div>
            <span style={{ color: "#e2e8f0" }}>)</span>
          </div>
        </div>
      </div>

      {/* CPU to GPU */}
      <div
        style={{
          position: "absolute",
          top: 110,
          right: 50,
          width: 520,
          opacity: cpuToGpuOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            marginBottom: 15,
          }}
        >
          <div
            style={{
              backgroundColor: "#60a5fa",
              padding: "8px 20px",
              borderRadius: 20,
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            CPU
          </div>
          <span style={{ fontSize: 30, color: "#e2e8f0" }}>→</span>
          <div
            style={{
              backgroundColor: "#10b981",
              padding: "8px 20px",
              borderRadius: 20,
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            GPU
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 10,
            fontFamily: "monospace",
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          <div style={{ color: "#6b7280", marginBottom: 5 }}># .to(device) 호출</div>
          <div>
            <span style={{ color: "#e2e8f0" }}>device = </span>
            <span style={{ color: "#f472b6" }}>torch</span>
            <span style={{ color: "#e2e8f0" }}>.</span>
            <span style={{ color: "#60a5fa" }}>device</span>
            <span style={{ color: "#e2e8f0" }}>(</span>
            <span style={{ color: "#fbbf24" }}>'cuda'</span>
            <span style={{ color: "#e2e8f0" }}>)</span>
          </div>
          <div style={{ marginTop: 10 }}>
            <span style={{ color: "#e2e8f0" }}>model.load_state_dict(</span>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: "#f472b6" }}>torch</span>
            <span style={{ color: "#e2e8f0" }}>.</span>
            <span style={{ color: "#60a5fa" }}>load</span>
            <span style={{ color: "#e2e8f0" }}>(</span>
            <span style={{ color: "#fbbf24" }}>'model.pt'</span>
            <span style={{ color: "#e2e8f0" }}>))</span>
          </div>
          <div style={{ marginTop: 10 }}>
            <span style={{ color: "#e2e8f0" }}>model.</span>
            <span style={{ color: "#10b981" }}>to</span>
            <span style={{ color: "#e2e8f0" }}>(device)</span>
          </div>
        </div>
      </div>

      {/* DataParallel note */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          opacity: dpOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#f43f5e",
            padding: "10px 15px",
            borderRadius: "10px 10px 0 0",
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 24 }}>⚠️</span>
          DataParallel 모델 주의
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: "0 0 10px 10px",
            fontSize: 20,
          }}
        >
          <div style={{ color: "#e2e8f0", marginBottom: 15 }}>
            멀티 GPU 학습 시 state_dict 키에{" "}
            <span
              style={{
                fontFamily: "monospace",
                backgroundColor: "#374151",
                padding: "2px 8px",
                borderRadius: 5,
                color: LEVEL_COLOR,
              }}
            >
              module.
            </span>{" "}
            접두사가 붙음
          </div>
          <div
            style={{
              backgroundColor: "#0f172a",
              padding: 15,
              borderRadius: 8,
              fontFamily: "monospace",
              fontSize: 16,
              color: "#e2e8f0",
            }}
          >
            <span style={{ color: "#fbbf24" }}>'module.</span>layer1.weight'
            <span style={{ color: "#9ca3af" }}> →  싱글 GPU에서 키 불일치 발생</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
