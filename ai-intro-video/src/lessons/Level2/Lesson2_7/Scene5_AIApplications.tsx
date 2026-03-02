import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

export const Scene5_AIApplications: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // 각 응용 분야 등장
  const app1Opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const app1X = spring({ frame: frame - 30, fps, from: -100, to: 0, durationInFrames: 30 });

  const app2Opacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  const app2X = spring({ frame: frame - 100, fps, from: 100, to: 0, durationInFrames: 30 });

  const app3Opacity = interpolate(frame, [170, 200], [0, 1], { extrapolateRight: "clamp" });
  const app3X = spring({ frame: frame - 170, fps, from: -100, to: 0, durationInFrames: 30 });

  const app4Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const app4X = spring({ frame: frame - 240, fps, from: 100, to: 0, durationInFrames: 30 });

  // 결론
  const conclusionOpacity = interpolate(frame, [320, 350], [0, 1], { extrapolateRight: "clamp" });

  // 펄스 효과
  const pulse = Math.sin(frame * 0.08) * 0.05 + 1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Audio src={staticFile("audio/lesson-2-7/scene5.mp3")} />

      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 60%)",
        }}
      />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <h2 style={{ fontSize: 52, color: "#a855f7", margin: 0 }}>AI에서의 확률분포 활용</h2>
      </div>

      {/* 응용 분야 그리드 */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          width: "85%",
        }}
      >
        {/* 1. 가중치 초기화 */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.05))",
            border: "2px solid #a855f7",
            borderRadius: 20,
            padding: 25,
            opacity: app1Opacity,
            transform: `translateX(${app1X}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}
            >
              ⚖️
            </div>
            <h3 style={{ color: "#e879f9", fontSize: 26, margin: 0 }}>가중치 초기화</h3>
          </div>
          <p style={{ color: "white", fontSize: 20, margin: 0, lineHeight: 1.5 }}>
            신경망의 가중치를 <span style={{ color: "#fbbf24" }}>정규분포</span>로 초기화
          </p>
          <div
            style={{
              marginTop: 15,
              padding: "8px 15px",
              background: "rgba(0,0,0,0.3)",
              borderRadius: 8,
              fontFamily: "monospace",
              color: "#22c55e",
              fontSize: 16,
            }}
          >
            W ~ N(0, σ²)
          </div>
        </div>

        {/* 2. 생성 AI */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.05))",
            border: "2px solid #ec4899",
            borderRadius: 20,
            padding: 25,
            opacity: app2Opacity,
            transform: `translateX(${-app2X}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ec4899, #db2777)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}
            >
              🎨
            </div>
            <h3 style={{ color: "#f472b6", fontSize: 26, margin: 0 }}>생성 AI</h3>
          </div>
          <p style={{ color: "white", fontSize: 20, margin: 0, lineHeight: 1.5 }}>
            확률분포에서 <span style={{ color: "#fbbf24" }}>샘플링</span>하여 새 이미지 생성
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
            {["🖼️", "→", "📊", "→", "🎨"].map((emoji, i) => (
              <span
                key={i}
                style={{
                  fontSize: 24,
                  opacity: interpolate(frame, [130 + i * 10, 140 + i * 10], [0, 1], { extrapolateRight: "clamp" }),
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>

        {/* 3. 자연어 처리 */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))",
            border: "2px solid #3b82f6",
            borderRadius: 20,
            padding: 25,
            opacity: app3Opacity,
            transform: `translateX(${app3X}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}
            >
              💬
            </div>
            <h3 style={{ color: "#93c5fd", fontSize: 26, margin: 0 }}>자연어 처리</h3>
          </div>
          <p style={{ color: "white", fontSize: 20, margin: 0, lineHeight: 1.5 }}>
            단어의 <span style={{ color: "#fbbf24" }}>확률분포</span>를 학습
          </p>
          <div
            style={{
              marginTop: 15,
              padding: "8px 15px",
              background: "rgba(0,0,0,0.3)",
              borderRadius: 8,
              color: "#93c5fd",
              fontSize: 16,
            }}
          >
            P(다음 단어 | 이전 단어들)
          </div>
        </div>

        {/* 4. VAE */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.05))",
            border: "2px solid #22c55e",
            borderRadius: 20,
            padding: 25,
            opacity: app4Opacity,
            transform: `translateX(${-app4X}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}
            >
              🔄
            </div>
            <h3 style={{ color: "#86efac", fontSize: 26, margin: 0 }}>VAE (변이형 오토인코더)</h3>
          </div>
          <p style={{ color: "white", fontSize: 20, margin: 0, lineHeight: 1.5 }}>
            잠재 공간을 <span style={{ color: "#fbbf24" }}>정규분포</span>로 모델링
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 15 }}>
            <span style={{ color: "#86efac", fontSize: 16 }}>입력</span>
            <span>→</span>
            <div
              style={{
                padding: "5px 12px",
                background: "rgba(34, 197, 94, 0.3)",
                borderRadius: 6,
                color: "white",
                fontSize: 14,
              }}
            >
              N(μ, σ²)
            </div>
            <span>→</span>
            <span style={{ color: "#86efac", fontSize: 16 }}>출력</span>
          </div>
        </div>
      </div>

      {/* 결론 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: "50%",
          transform: `translateX(-50%) scale(${pulse})`,
          opacity: conclusionOpacity,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))",
            border: "2px solid #e879f9",
            borderRadius: 16,
            padding: "15px 40px",
          }}
        >
          <p style={{ color: "white", fontSize: 24, margin: 0, textAlign: "center" }}>
            확률분포를 이해하면 AI가 어떻게 <span style={{ color: "#fbbf24" }}>데이터를 학습</span>하는지 알 수 있습니다!
          </p>
        </div>
      </div>

      {/* 레슨 번호 */}
      <div style={{ position: "absolute", bottom: 30, right: 40, fontSize: 24, color: "#a855f7", opacity: 0.7 }}>
        Lesson 2-7
      </div>
    </AbsoluteFill>
  );
};
