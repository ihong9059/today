import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Summary cards animation
  const card1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const card2Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const card3Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const card4Opacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });

  // Next lesson animation
  const nextOpacity = interpolate(frame, [600, 640], [0, 1], { extrapolateRight: "clamp" });

  const summaryCards = [
    {
      title: "state_dict 저장",
      color: LEVEL_COLOR,
      points: ["가중치만 저장", "호환성 우수", "권장 방식"],
      opacity: card1Opacity,
    },
    {
      title: "전체 모델 저장",
      color: "#8b5cf6",
      points: ["구조+가중치", "편리하지만", "호환성 주의"],
      opacity: card2Opacity,
    },
    {
      title: "체크포인트",
      color: "#10b981",
      points: ["학습 상태 전체", "에폭/옵티마이저", "학습 재개 가능"],
      opacity: card3Opacity,
    },
    {
      title: "디바이스 이동",
      color: "#60a5fa",
      points: ["map_location", ".to(device)", "DP 키 주의"],
      opacity: card4Opacity,
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-7/scene7.mp3")} />

      {/* Title */}
      <h2
        style={{
          position: "absolute",
          top: 30,
          width: "100%",
          textAlign: "center",
          fontSize: 52,
          color: "white",
          opacity: titleOpacity,
          margin: 0,
        }}
      >
        정리
      </h2>

      {/* Summary cards */}
      <div
        style={{
          position: "absolute",
          top: 110,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 25,
          padding: "0 40px",
        }}
      >
        {summaryCards.map((card, i) => (
          <div
            key={i}
            style={{
              width: 240,
              opacity: card.opacity,
              backgroundColor: "#1e293b",
              borderRadius: 15,
              border: `3px solid ${card.color}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: card.color,
                padding: "12px 15px",
                textAlign: "center",
              }}
            >
              <span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                {card.title}
              </span>
            </div>
            <div style={{ padding: 15 }}>
              {card.points.map((point, j) => (
                <div
                  key={j}
                  style={{
                    color: "#e2e8f0",
                    fontSize: 18,
                    marginBottom: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: card.color }}>•</span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Code summary */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          backgroundColor: "#1e293b",
          borderRadius: 15,
          padding: 20,
          display: "flex",
          justifyContent: "space-around",
          opacity: card4Opacity,
        }}
      >
        {[
          { label: "저장", code: "torch.save()", color: "#10b981" },
          { label: "로드", code: "torch.load()", color: "#60a5fa" },
          { label: "가중치", code: ".state_dict()", color: LEVEL_COLOR },
          { label: "적용", code: ".load_state_dict()", color: "#8b5cf6" },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ color: "#9ca3af", fontSize: 16, marginBottom: 5 }}>{item.label}</div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 18,
                color: item.color,
                backgroundColor: "#0f172a",
                padding: "8px 15px",
                borderRadius: 8,
              }}
            >
              {item.code}
            </div>
          </div>
        ))}
      </div>

      {/* Next lesson preview */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: nextOpacity,
          textAlign: "center",
        }}
      >
        <div style={{ color: "#9ca3af", fontSize: 22, marginBottom: 15 }}>다음 강의</div>
        <div
          style={{
            backgroundColor: "#1e293b",
            border: `3px solid ${LEVEL_COLOR}`,
            borderRadius: 20,
            padding: "15px 40px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span style={{ fontSize: 36 }}>🔄</span>
          <div>
            <div style={{ color: "#9ca3af", fontSize: 16 }}>4-8</div>
            <div style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>
              <span style={{ color: LEVEL_COLOR }}>전이학습</span> (Transfer Learning)
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
