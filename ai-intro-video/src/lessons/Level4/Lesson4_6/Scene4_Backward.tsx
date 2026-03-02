import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene4_Backward: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Three key lines animation
  const line1 = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const line2 = spring({ frame: frame - 150, fps, config: { damping: 12 } });
  const line3 = spring({ frame: frame - 240, fps, config: { damping: 12 } });

  // Gradient flow animation
  const gradientFlow = interpolate(frame, [180, 300], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-6/scene4.mp3")} />

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
          <span style={{ color: "#8b5cf6" }}>역전파</span> - 핵심 3줄
        </h1>
        <p style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>
          Backward Pass - The Three Essential Lines
        </p>
      </div>

      {/* Three key lines */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 60,
          right: 60,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        {/* Line 1: zero_grad */}
        <div
          style={{
            display: "flex",
            gap: 30,
            alignItems: "center",
            transform: `translateX(${(1 - line1) * -100}px)`,
            opacity: line1,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#f43f5e",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 28,
              fontWeight: "bold",
              color: "white",
            }}
          >
            1
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#1e293b",
              borderRadius: 16,
              padding: 25,
              fontFamily: "monospace",
              fontSize: 26,
              border: `3px solid #f43f5e`,
            }}
          >
            <span style={{ color: "#22d3ee" }}>optimizer</span>
            <span style={{ color: "white" }}>.</span>
            <span style={{ color: "#4ade80" }}>zero_grad</span>
            <span style={{ color: "white" }}>()</span>
          </div>
          <div
            style={{
              width: 350,
              backgroundColor: "#1e293b",
              borderRadius: 16,
              padding: 20,
              borderLeft: `4px solid #f43f5e`,
            }}
          >
            <div style={{ color: "#f43f5e", fontSize: 20, fontWeight: "bold" }}>기울기 초기화</div>
            <div style={{ color: "#9ca3af", fontSize: 18, marginTop: 8 }}>
              이전 배치의 기울기 제거
            </div>
          </div>
        </div>

        {/* Line 2: backward */}
        <div
          style={{
            display: "flex",
            gap: 30,
            alignItems: "center",
            transform: `translateX(${(1 - line2) * -100}px)`,
            opacity: line2,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#8b5cf6",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 28,
              fontWeight: "bold",
              color: "white",
            }}
          >
            2
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#1e293b",
              borderRadius: 16,
              padding: 25,
              fontFamily: "monospace",
              fontSize: 26,
              border: `3px solid #8b5cf6`,
            }}
          >
            <span style={{ color: "#22d3ee" }}>loss</span>
            <span style={{ color: "white" }}>.</span>
            <span style={{ color: "#4ade80" }}>backward</span>
            <span style={{ color: "white" }}>()</span>
          </div>
          <div
            style={{
              width: 350,
              backgroundColor: "#1e293b",
              borderRadius: 16,
              padding: 20,
              borderLeft: `4px solid #8b5cf6`,
            }}
          >
            <div style={{ color: "#8b5cf6", fontSize: 20, fontWeight: "bold" }}>역전파 수행</div>
            <div style={{ color: "#9ca3af", fontSize: 18, marginTop: 8 }}>
              각 파라미터의 기울기 계산
            </div>
          </div>
        </div>

        {/* Line 3: step */}
        <div
          style={{
            display: "flex",
            gap: 30,
            alignItems: "center",
            transform: `translateX(${(1 - line3) * -100}px)`,
            opacity: line3,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#10b981",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 28,
              fontWeight: "bold",
              color: "white",
            }}
          >
            3
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#1e293b",
              borderRadius: 16,
              padding: 25,
              fontFamily: "monospace",
              fontSize: 26,
              border: `3px solid #10b981`,
            }}
          >
            <span style={{ color: "#22d3ee" }}>optimizer</span>
            <span style={{ color: "white" }}>.</span>
            <span style={{ color: "#4ade80" }}>step</span>
            <span style={{ color: "white" }}>()</span>
          </div>
          <div
            style={{
              width: 350,
              backgroundColor: "#1e293b",
              borderRadius: 16,
              padding: 20,
              borderLeft: `4px solid #10b981`,
            }}
          >
            <div style={{ color: "#10b981", fontSize: 20, fontWeight: "bold" }}>가중치 업데이트</div>
            <div style={{ color: "#9ca3af", fontSize: 18, marginTop: 8 }}>
              기울기로 파라미터 조정
            </div>
          </div>
        </div>
      </div>

      {/* Gradient flow visualization */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 60,
          right: 60,
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 20,
            border: `2px solid ${LEVEL_COLOR}`,
          }}
        >
          <div style={{ color: LEVEL_COLOR, fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
            기울기 흐름 (Gradient Flow)
          </div>
          <div
            style={{
              height: 30,
              backgroundColor: "#374151",
              borderRadius: 15,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${gradientFlow}%`,
                height: "100%",
                background: `linear-gradient(90deg, #8b5cf6, ${LEVEL_COLOR}, #10b981)`,
                borderRadius: 15,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              color: "#9ca3af",
              fontSize: 18,
            }}
          >
            <span>Loss</span>
            <span>← 기울기 역방향 전파 →</span>
            <span>Weights</span>
          </div>
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
        Lesson 4-6 | Backward
      </div>
    </AbsoluteFill>
  );
};
