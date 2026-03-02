import { AbsoluteFill } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Lesson4_7Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f23",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Level badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          backgroundColor: LEVEL_COLOR,
          padding: "12px 30px",
          borderRadius: 25,
          fontSize: 32,
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
          top: 40,
          right: 40,
          backgroundColor: "#1e293b",
          padding: "12px 30px",
          borderRadius: 25,
          fontSize: 32,
          fontWeight: "bold",
          color: "#9ca3af",
        }}
      >
        4-7
      </div>

      {/* Main title */}
      <h1
        style={{
          fontSize: 100,
          color: "white",
          margin: 0,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        모델 <span style={{ color: LEVEL_COLOR }}>저장</span>과{" "}
        <span style={{ color: "#10b981" }}>로드</span>
      </h1>

      {/* Save/Load visualization */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          marginTop: 20,
        }}
      >
        {/* Save box */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              backgroundColor: "#1e293b",
              border: `4px solid ${LEVEL_COLOR}`,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 50 }}>💾</div>
            <div style={{ fontSize: 22, color: LEVEL_COLOR, fontWeight: "bold" }}>Save</div>
          </div>
        </div>

        {/* Arrow */}
        <div style={{ fontSize: 50, color: "#6366f1" }}>→</div>

        {/* .pt file */}
        <div
          style={{
            width: 140,
            height: 140,
            backgroundColor: "#1e293b",
            border: "4px solid #6366f1",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 50 }}>📄</div>
          <div style={{ fontSize: 22, color: "#6366f1", fontWeight: "bold" }}>.pt</div>
        </div>

        {/* Arrow */}
        <div style={{ fontSize: 50, color: "#6366f1" }}>→</div>

        {/* Load box */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              backgroundColor: "#1e293b",
              border: "4px solid #10b981",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 50 }}>📥</div>
            <div style={{ fontSize: 22, color: "#10b981", fontWeight: "bold" }}>Load</div>
          </div>
        </div>
      </div>

      {/* Methods subtitle */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          gap: 30,
        }}
      >
        {["state_dict", "checkpoint", "TorchScript"].map((method, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#1e293b",
              padding: "12px 25px",
              borderRadius: 20,
              fontSize: 24,
              color: "#e2e8f0",
              fontFamily: "monospace",
            }}
          >
            {method}
          </div>
        ))}
      </div>

      {/* PyTorch badge */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 15,
          backgroundColor: "#1e293b",
          padding: "15px 35px",
          borderRadius: 30,
        }}
      >
        <span style={{ fontSize: 32 }}>🔥</span>
        <span style={{ color: "#f43f5e", fontSize: 28, fontWeight: "bold" }}>PyTorch</span>
        <span style={{ color: "#9ca3af", fontSize: 24 }}>실전 시리즈</span>
      </div>
    </AbsoluteFill>
  );
};
