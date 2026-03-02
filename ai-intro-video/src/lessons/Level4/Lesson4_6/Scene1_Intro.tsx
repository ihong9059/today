import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

  // Loop animation
  const loopProgress = interpolate(frame, [0, 180], [0, 360], { extrapolateRight: "extend" });

  // Core elements
  const elem1 = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const elem2 = spring({ frame: frame - 90, fps, config: { damping: 12 } });
  const elem3 = spring({ frame: frame - 120, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-6/scene1.mp3")} />

      {/* Circular loop animation background */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 500,
          height: 500,
          transform: `translate(-50%, -50%) rotate(${loopProgress}deg)`,
          opacity: 0.1,
        }}
      >
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: LEVEL_COLOR,
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-200px)`,
            }}
          />
        ))}
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
          fontSize: 24,
          fontWeight: "bold",
          color: "white",
        }}
      >
        Level 4 - PyTorch 실전
      </div>

      {/* Main title */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          width: "100%",
          textAlign: "center",
          transform: `scale(${titleSpring})`,
        }}
      >
        <h1 style={{ fontSize: 90, color: "white", margin: 0 }}>
          학습 <span style={{ color: LEVEL_COLOR }}>루프</span>
        </h1>
        <p
          style={{
            fontSize: 36,
            color: "#94a3b8",
            marginTop: 20,
            opacity: subtitleOpacity,
          }}
        >
          Training Loop - 모델이 배우는 과정
        </p>
      </div>

      {/* Core elements visualization */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 60,
        }}
      >
        {/* Forward */}
        <div
          style={{
            transform: `scale(${elem1})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 160,
              height: 120,
              backgroundColor: "#1e293b",
              border: `3px solid #10b981`,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 40 }}>➡️</div>
            <div style={{ color: "#10b981", fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
              순전파
            </div>
          </div>
        </div>

        <div style={{ fontSize: 48, color: LEVEL_COLOR, opacity: elem1 }}>→</div>

        {/* Loss */}
        <div
          style={{
            transform: `scale(${elem2})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 160,
              height: 120,
              backgroundColor: "#1e293b",
              border: `3px solid ${LEVEL_COLOR}`,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 40 }}>📊</div>
            <div style={{ color: LEVEL_COLOR, fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
              손실 계산
            </div>
          </div>
        </div>

        <div style={{ fontSize: 48, color: LEVEL_COLOR, opacity: elem2 }}>→</div>

        {/* Backward */}
        <div
          style={{
            transform: `scale(${elem3})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 160,
              height: 120,
              backgroundColor: "#1e293b",
              border: `3px solid #8b5cf6`,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 40 }}>⬅️</div>
            <div style={{ color: "#8b5cf6", fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
              역전파
            </div>
          </div>
        </div>
      </div>

      {/* Loop arrow */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: elem3,
        }}
      >
        <div
          style={{
            width: 600,
            height: 40,
            borderBottom: `3px dashed ${LEVEL_COLOR}`,
            borderLeft: `3px dashed ${LEVEL_COLOR}`,
            borderRight: `3px dashed ${LEVEL_COLOR}`,
            borderRadius: "0 0 30px 30px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -15,
              bottom: -15,
              fontSize: 30,
              color: LEVEL_COLOR,
            }}
          >
            ↑
          </div>
        </div>
      </div>

      {/* Lesson number */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
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
