import { AbsoluteFill } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Lesson4_5Thumbnail: React.FC = () => {
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
        4-5
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
        데이터 <span style={{ color: LEVEL_COLOR }}>로딩</span>
      </h1>

      {/* Data pipeline visualization */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
          marginTop: 20,
        }}
      >
        {/* Dataset */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 180,
              height: 180,
              backgroundColor: "#1e293b",
              border: `4px solid ${LEVEL_COLOR}`,
              borderRadius: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 72 }}>📦</div>
            <div style={{ color: "white", fontSize: 26, fontWeight: "bold", marginTop: 10 }}>
              Dataset
            </div>
          </div>
        </div>

        <div style={{ fontSize: 64, color: LEVEL_COLOR }}>→</div>

        {/* DataLoader */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 180,
              height: 180,
              backgroundColor: "#1e293b",
              border: `4px solid #10b981`,
              borderRadius: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 72 }}>🔄</div>
            <div style={{ color: "white", fontSize: 26, fontWeight: "bold", marginTop: 10 }}>
              DataLoader
            </div>
          </div>
        </div>

        <div style={{ fontSize: 64, color: LEVEL_COLOR }}>→</div>

        {/* transforms */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 180,
              height: 180,
              backgroundColor: "#1e293b",
              border: `4px solid #8b5cf6`,
              borderRadius: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 72 }}>🔧</div>
            <div style={{ color: "white", fontSize: 26, fontWeight: "bold", marginTop: 10 }}>
              transforms
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          marginTop: 50,
          fontSize: 36,
          color: "#94a3b8",
          textAlign: "center",
        }}
      >
        PyTorch 데이터 파이프라인 완전 정복
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
