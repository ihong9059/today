/**
 * Scene 5: 학습 설정
 * 손실함수, 옵티마이저 설정
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_TrainingSetup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 각 설정 항목 등장
  const modelOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const lossOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const optimizerOpacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });
  const dataloaderOpacity = interpolate(frame, [510, 540], [0, 1], { extrapolateRight: "clamp" });

  // 다이어그램 연결선
  const connectionProgress = interpolate(frame, [600, 750], [0, 1], { extrapolateRight: "clamp" });

  const setupItems = [
    {
      title: "모델 초기화",
      code: "model = MNISTClassifier()",
      color: "#fb923c",
      icon: "🧠",
      opacity: modelOpacity,
    },
    {
      title: "손실 함수",
      code: "criterion = nn.CrossEntropyLoss()",
      color: "#ef4444",
      icon: "📉",
      description: "분류 문제의 표준 손실함수",
      opacity: lossOpacity,
    },
    {
      title: "옵티마이저",
      code: "optimizer = optim.Adam(model.parameters(), lr=0.001)",
      color: "#22c55e",
      icon: "⚡",
      description: "Adam: 적응적 학습률",
      opacity: optimizerOpacity,
    },
    {
      title: "데이터로더",
      code: "DataLoader(train_dataset, batch_size=64, shuffle=True)",
      color: "#3b82f6",
      icon: "📦",
      description: "배치 단위로 데이터 공급",
      opacity: dataloaderOpacity,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-1/scene5.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        학습 설정
      </h2>

      {/* 설정 카드 그리드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 40,
          width: "100%",
          maxWidth: 1400,
        }}
      >
        {setupItems.map((item, i) => (
          <div
            key={i}
            style={{
              opacity: item.opacity,
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 30,
              borderLeft: `5px solid ${item.color}`,
              transform: `translateY(${interpolate(
                frame,
                [60 + i * 150, 90 + i * 150],
                [30, 0],
                { extrapolateRight: "clamp" }
              )}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
              <span style={{ fontSize: 36 }}>{item.icon}</span>
              <h3 style={{ color: item.color, fontSize: 30, fontWeight: "bold" }}>
                {item.title}
              </h3>
            </div>

            <div
              style={{
                backgroundColor: "#1e1e3f",
                padding: 15,
                borderRadius: 8,
                fontFamily: "monospace",
                fontSize: 18,
                color: colors.gray[100],
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {item.code}
            </div>

            {item.description && (
              <p style={{ color: colors.gray[400], fontSize: 20, marginTop: 15 }}>
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 학습 흐름 다이어그램 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          alignItems: "center",
          gap: 30,
          opacity: interpolate(frame, [750, 780], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {["데이터", "모델", "손실", "역전파", "업데이트"].map((step, i) => {
          const stepScale = spring({
            frame: frame - (780 + i * 20),
            fps,
            from: 0,
            to: 1,
            durationInFrames: 20
          });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: colors.level[4],
                  color: colors.white,
                  padding: "12px 24px",
                  borderRadius: 25,
                  fontSize: 22,
                  fontWeight: "bold",
                  transform: `scale(${Math.max(0, stepScale)})`,
                }}
              >
                {step}
              </div>
              {i < 4 && (
                <span style={{ color: colors.gray[400], fontSize: 28, margin: "0 5px" }}>
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
