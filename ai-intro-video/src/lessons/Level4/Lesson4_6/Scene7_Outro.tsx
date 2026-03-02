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
  const card4 = spring({ frame: frame - 160, fps, config: { damping: 12 } });

  // Next lesson preview
  const nextOpacity = interpolate(frame, [200, 240], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-6/scene7.mp3")} />

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
          🔄 <span style={{ color: LEVEL_COLOR }}>학습 루프</span> 정리
        </h1>
      </div>

      {/* Summary cards */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 60,
          right: 60,
          display: "flex",
          gap: 25,
        }}
      >
        {/* Structure */}
        <div
          style={{
            flex: 1,
            transform: `scale(${card1})`,
            backgroundColor: "#1e293b",
            padding: 25,
            borderRadius: 20,
            border: `3px solid ${LEVEL_COLOR}`,
          }}
        >
          <div style={{ fontSize: 40, textAlign: "center", marginBottom: 15 }}>🔁</div>
          <h3 style={{ color: LEVEL_COLOR, fontSize: 24, textAlign: "center", margin: 0 }}>
            이중 반복문
          </h3>
          <div style={{ marginTop: 15, color: "#e2e8f0", fontSize: 18, lineHeight: 1.6 }}>
            <div>• 에폭 루프</div>
            <div style={{ color: "#9ca3af", marginLeft: 15 }}>전체 데이터 순회</div>
            <div>• 배치 루프</div>
            <div style={{ color: "#9ca3af", marginLeft: 15 }}>미니배치 처리</div>
          </div>
        </div>

        {/* Forward */}
        <div
          style={{
            flex: 1,
            transform: `scale(${card2})`,
            backgroundColor: "#1e293b",
            padding: 25,
            borderRadius: 20,
            border: `3px solid #10b981`,
          }}
        >
          <div style={{ fontSize: 40, textAlign: "center", marginBottom: 15 }}>➡️</div>
          <h3 style={{ color: "#10b981", fontSize: 24, textAlign: "center", margin: 0 }}>
            순전파
          </h3>
          <div style={{ marginTop: 15, color: "#e2e8f0", fontSize: 18, lineHeight: 1.6 }}>
            <div>• model(inputs)</div>
            <div style={{ color: "#9ca3af", marginLeft: 15 }}>예측값 계산</div>
            <div>• criterion()</div>
            <div style={{ color: "#9ca3af", marginLeft: 15 }}>손실 측정</div>
          </div>
        </div>

        {/* Backward */}
        <div
          style={{
            flex: 1,
            transform: `scale(${card3})`,
            backgroundColor: "#1e293b",
            padding: 25,
            borderRadius: 20,
            border: `3px solid #8b5cf6`,
          }}
        >
          <div style={{ fontSize: 40, textAlign: "center", marginBottom: 15 }}>⬅️</div>
          <h3 style={{ color: "#8b5cf6", fontSize: 24, textAlign: "center", margin: 0 }}>
            역전파 3줄
          </h3>
          <div style={{ marginTop: 15, color: "#e2e8f0", fontSize: 18, lineHeight: 1.6 }}>
            <div>• zero_grad()</div>
            <div>• backward()</div>
            <div>• step()</div>
          </div>
        </div>

        {/* Validation */}
        <div
          style={{
            flex: 1,
            transform: `scale(${card4})`,
            backgroundColor: "#1e293b",
            padding: 25,
            borderRadius: 20,
            border: `3px solid #22d3ee`,
          }}
        >
          <div style={{ fontSize: 40, textAlign: "center", marginBottom: 15 }}>✅</div>
          <h3 style={{ color: "#22d3ee", fontSize: 24, textAlign: "center", margin: 0 }}>
            검증
          </h3>
          <div style={{ marginTop: 15, color: "#e2e8f0", fontSize: 18, lineHeight: 1.6 }}>
            <div>• model.eval()</div>
            <div>• torch.no_grad()</div>
            <div>• model.train()</div>
          </div>
        </div>
      </div>

      {/* Training loop flow */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
          opacity: nextOpacity,
        }}
      >
        <div style={{ padding: "10px 20px", backgroundColor: LEVEL_COLOR, borderRadius: 10, color: "white", fontSize: 20 }}>
          Data
        </div>
        <span style={{ color: LEVEL_COLOR, fontSize: 28 }}>→</span>
        <div style={{ padding: "10px 20px", backgroundColor: "#10b981", borderRadius: 10, color: "white", fontSize: 20 }}>
          Forward
        </div>
        <span style={{ color: LEVEL_COLOR, fontSize: 28 }}>→</span>
        <div style={{ padding: "10px 20px", backgroundColor: "#f43f5e", borderRadius: 10, color: "white", fontSize: 20 }}>
          Loss
        </div>
        <span style={{ color: LEVEL_COLOR, fontSize: 28 }}>→</span>
        <div style={{ padding: "10px 20px", backgroundColor: "#8b5cf6", borderRadius: 10, color: "white", fontSize: 20 }}>
          Backward
        </div>
        <span style={{ color: LEVEL_COLOR, fontSize: 28 }}>→</span>
        <div style={{ padding: "10px 20px", backgroundColor: "#22d3ee", borderRadius: 10, color: "white", fontSize: 20 }}>
          Update
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
            모델 저장과 로드
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
        Lesson 4-6
      </div>
    </AbsoluteFill>
  );
};
