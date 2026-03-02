import { AbsoluteFill } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Lesson4_6Thumbnail: React.FC = () => {
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
        4-6
      </div>

      {/* Main title */}
      <h1
        style={{
          fontSize: 100,
          color: "white",
          margin: 0,
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        학습 <span style={{ color: LEVEL_COLOR }}>루프</span>
      </h1>

      {/* Training loop visualization */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginTop: 20,
        }}
      >
        {/* Forward */}
        <div
          style={{
            width: 150,
            height: 150,
            backgroundColor: "#1e293b",
            border: `4px solid #10b981`,
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 50 }}>➡️</div>
          <div style={{ color: "#10b981", fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
            순전파
          </div>
        </div>

        <div style={{ fontSize: 48, color: LEVEL_COLOR }}>→</div>

        {/* Loss */}
        <div
          style={{
            width: 150,
            height: 150,
            backgroundColor: "#1e293b",
            border: `4px solid #f43f5e`,
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 50 }}>📉</div>
          <div style={{ color: "#f43f5e", fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
            손실
          </div>
        </div>

        <div style={{ fontSize: 48, color: LEVEL_COLOR }}>→</div>

        {/* Backward */}
        <div
          style={{
            width: 150,
            height: 150,
            backgroundColor: "#1e293b",
            border: `4px solid #8b5cf6`,
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 50 }}>⬅️</div>
          <div style={{ color: "#8b5cf6", fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
            역전파
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          marginTop: 40,
          fontSize: 36,
          color: "#94a3b8",
          textAlign: "center",
        }}
      >
        zero_grad → backward → step
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
