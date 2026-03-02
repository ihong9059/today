import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });

  // Summary cards
  const card1 = spring({ frame: frame - 40, fps, config: { damping: 12 } });
  const card2 = spring({ frame: frame - 80, fps, config: { damping: 12 } });
  const card3 = spring({ frame: frame - 120, fps, config: { damping: 12 } });

  // Next lesson preview
  const nextOpacity = interpolate(frame, [200, 240], [0, 1], { extrapolateRight: "clamp" });
  const nextScale = spring({ frame: frame - 200, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-5/scene7.mp3")} />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          transform: `scale(${titleSpring})`,
        }}
      >
        <h1 style={{ fontSize: 64, color: "white", margin: 0 }}>
          📦 <span style={{ color: LEVEL_COLOR }}>데이터 로딩</span> 정리
        </h1>
      </div>

      {/* Summary cards */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 80,
          right: 80,
          display: "flex",
          gap: 40,
        }}
      >
        {/* Dataset */}
        <div
          style={{
            flex: 1,
            transform: `scale(${card1})`,
            backgroundColor: "#1e293b",
            padding: 30,
            borderRadius: 20,
            border: `3px solid ${LEVEL_COLOR}`,
          }}
        >
          <div style={{ fontSize: 48, textAlign: "center", marginBottom: 15 }}>📦</div>
          <h3 style={{ color: LEVEL_COLOR, fontSize: 28, textAlign: "center", margin: 0 }}>
            Dataset
          </h3>
          <div style={{ marginTop: 20, color: "#e2e8f0", fontSize: 20, lineHeight: 1.8 }}>
            <div>• 데이터 정의</div>
            <div style={{ color: "#9ca3af", marginLeft: 20 }}>__len__ 구현</div>
            <div style={{ color: "#9ca3af", marginLeft: 20 }}>__getitem__ 구현</div>
          </div>
        </div>

        {/* DataLoader */}
        <div
          style={{
            flex: 1,
            transform: `scale(${card2})`,
            backgroundColor: "#1e293b",
            padding: 30,
            borderRadius: 20,
            border: `3px solid #10b981`,
          }}
        >
          <div style={{ fontSize: 48, textAlign: "center", marginBottom: 15 }}>🔄</div>
          <h3 style={{ color: "#10b981", fontSize: 28, textAlign: "center", margin: 0 }}>
            DataLoader
          </h3>
          <div style={{ marginTop: 20, color: "#e2e8f0", fontSize: 20, lineHeight: 1.8 }}>
            <div>• 배치 단위 로딩</div>
            <div style={{ color: "#9ca3af", marginLeft: 20 }}>batch_size 설정</div>
            <div style={{ color: "#9ca3af", marginLeft: 20 }}>shuffle 설정</div>
          </div>
        </div>

        {/* transforms */}
        <div
          style={{
            flex: 1,
            transform: `scale(${card3})`,
            backgroundColor: "#1e293b",
            padding: 30,
            borderRadius: 20,
            border: `3px solid #8b5cf6`,
          }}
        >
          <div style={{ fontSize: 48, textAlign: "center", marginBottom: 15 }}>🔧</div>
          <h3 style={{ color: "#8b5cf6", fontSize: 28, textAlign: "center", margin: 0 }}>
            transforms
          </h3>
          <div style={{ marginTop: 20, color: "#e2e8f0", fontSize: 20, lineHeight: 1.8 }}>
            <div>• 전처리</div>
            <div style={{ color: "#9ca3af", marginLeft: 20 }}>ToTensor</div>
            <div style={{ color: "#9ca3af", marginLeft: 20 }}>Normalize, Compose</div>
          </div>
        </div>
      </div>

      {/* Data flow diagram */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          opacity: nextOpacity,
        }}
      >
        <div
          style={{
            padding: "12px 24px",
            backgroundColor: "#374151",
            borderRadius: 12,
            color: "white",
            fontSize: 22,
          }}
        >
          Raw Data
        </div>
        <span style={{ color: LEVEL_COLOR, fontSize: 32 }}>→</span>
        <div
          style={{
            padding: "12px 24px",
            backgroundColor: LEVEL_COLOR,
            borderRadius: 12,
            color: "white",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          Dataset
        </div>
        <span style={{ color: LEVEL_COLOR, fontSize: 32 }}>→</span>
        <div
          style={{
            padding: "12px 24px",
            backgroundColor: "#10b981",
            borderRadius: 12,
            color: "white",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          DataLoader
        </div>
        <span style={{ color: LEVEL_COLOR, fontSize: 32 }}>→</span>
        <div
          style={{
            padding: "12px 24px",
            backgroundColor: "#8b5cf6",
            borderRadius: 12,
            color: "white",
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          Model
        </div>
      </div>

      {/* Next lesson preview */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          textAlign: "center",
          opacity: nextOpacity,
          transform: `scale(${nextScale})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#1e293b",
            padding: "15px 40px",
            borderRadius: 30,
            border: `2px solid ${LEVEL_COLOR}`,
          }}
        >
          <span style={{ color: "#9ca3af", fontSize: 22 }}>다음 강의: </span>
          <span style={{ color: LEVEL_COLOR, fontSize: 24, fontWeight: "bold" }}>
            학습 루프 (Training Loop)
          </span>
        </div>
      </div>

      {/* Level badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          backgroundColor: LEVEL_COLOR,
          padding: "8px 20px",
          borderRadius: 20,
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
        }}
      >
        Level 4 - PyTorch 실전
      </div>

      {/* Lesson number */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          color: "#64748b",
          fontSize: 24,
        }}
      >
        Lesson 4-5
      </div>
    </AbsoluteFill>
  );
};
