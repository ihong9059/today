import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene4_Transforms: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Pipeline animation
  const step1 = spring({ frame: frame - 40, fps, config: { damping: 12 } });
  const step2 = spring({ frame: frame - 100, fps, config: { damping: 12 } });
  const step3 = spring({ frame: frame - 160, fps, config: { damping: 12 } });
  const step4 = spring({ frame: frame - 220, fps, config: { damping: 12 } });

  // Arrow animations
  const arrow1 = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" });
  const arrow2 = interpolate(frame, [140, 160], [0, 1], { extrapolateRight: "clamp" });
  const arrow3 = interpolate(frame, [200, 220], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-5/scene4.mp3")} />

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
          <span style={{ color: LEVEL_COLOR }}>transforms</span> - 데이터 전처리
        </h1>
        <p style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>
          이미지를 텐서로 변환하고 정규화
        </p>
      </div>

      {/* Transform pipeline visualization */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Original Image */}
        <div
          style={{
            transform: `scale(${step1})`,
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
              border: `3px solid #9ca3af`,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 64 }}>🖼️</div>
            <div style={{ color: "white", fontSize: 18, marginTop: 10 }}>PIL Image</div>
            <div style={{ color: "#9ca3af", fontSize: 14 }}>(256×256)</div>
          </div>
        </div>

        <div style={{ fontSize: 48, color: LEVEL_COLOR, opacity: arrow1 }}>→</div>

        {/* Resize */}
        <div
          style={{
            transform: `scale(${step2})`,
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
              border: `3px solid #10b981`,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ color: "#10b981", fontSize: 20, fontWeight: "bold" }}>Resize(224)</div>
            <div style={{ fontSize: 48, marginTop: 10 }}>📐</div>
            <div style={{ color: "#9ca3af", fontSize: 14, marginTop: 10 }}>(224×224)</div>
          </div>
        </div>

        <div style={{ fontSize: 48, color: LEVEL_COLOR, opacity: arrow2 }}>→</div>

        {/* ToTensor */}
        <div
          style={{
            transform: `scale(${step3})`,
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
              border: `3px solid #8b5cf6`,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ color: "#8b5cf6", fontSize: 20, fontWeight: "bold" }}>ToTensor()</div>
            <div style={{ fontSize: 48, marginTop: 10 }}>🔢</div>
            <div style={{ color: "#9ca3af", fontSize: 14, marginTop: 10 }}>[0, 1] 범위</div>
          </div>
        </div>

        <div style={{ fontSize: 48, color: LEVEL_COLOR, opacity: arrow3 }}>→</div>

        {/* Normalize */}
        <div
          style={{
            transform: `scale(${step4})`,
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
              border: `3px solid ${LEVEL_COLOR}`,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ color: LEVEL_COLOR, fontSize: 20, fontWeight: "bold" }}>Normalize()</div>
            <div style={{ fontSize: 48, marginTop: 10 }}>📊</div>
            <div style={{ color: "#9ca3af", fontSize: 14, marginTop: 10 }}>평균 0, 분산 1</div>
          </div>
        </div>
      </div>

      {/* Code example */}
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
            padding: 30,
            fontFamily: "monospace",
            fontSize: 22,
            border: `2px solid ${LEVEL_COLOR}`,
          }}
        >
          <div style={{ color: "#9ca3af" }}>from torchvision import transforms</div>
          <br />
          <div style={{ color: "white" }}>
            transform = <span style={{ color: "#22d3ee" }}>transforms.Compose</span>([
          </div>
          <div style={{ marginLeft: 30 }}>
            <span style={{ color: "#10b981" }}>transforms.Resize</span>
            <span style={{ color: "white" }}>(224),</span>
          </div>
          <div style={{ marginLeft: 30 }}>
            <span style={{ color: "#8b5cf6" }}>transforms.ToTensor</span>
            <span style={{ color: "white" }}>(),</span>
          </div>
          <div style={{ marginLeft: 30 }}>
            <span style={{ color: LEVEL_COLOR }}>transforms.Normalize</span>
            <span style={{ color: "white" }}>(mean=[0.485, 0.456, 0.406],</span>
          </div>
          <div style={{ marginLeft: 200, color: "white" }}>
            std=[0.229, 0.224, 0.225])
          </div>
          <div style={{ color: "white" }}>])</div>
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
        Lesson 4-5 | transforms
      </div>
    </AbsoluteFill>
  );
};
