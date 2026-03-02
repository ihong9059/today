import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene6_Tips: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Tips animations
  const tip1Opacity = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });
  const tip2Opacity = interpolate(frame, [280, 320], [0, 1], { extrapolateRight: "clamp" });
  const tip3Opacity = interpolate(frame, [550, 590], [0, 1], { extrapolateRight: "clamp" });
  const tip4Opacity = interpolate(frame, [800, 840], [0, 1], { extrapolateRight: "clamp" });

  const tips = [
    {
      num: 1,
      title: "최고 성능 모델 저장",
      color: "#10b981",
      icon: "🏆",
      description: "검증 손실이 최소일 때만 best_model.pt로 저장",
      code: "if val_loss < best_loss:\n    torch.save(model.state_dict(), 'best_model.pt')",
      opacity: tip1Opacity,
    },
    {
      num: 2,
      title: "주기적 체크포인트",
      color: "#60a5fa",
      icon: "💾",
      description: "N 에폭마다 저장, 최근 K개만 유지",
      code: "if epoch % 10 == 0:\n    torch.save(checkpoint, f'ckpt_{epoch}.pt')",
      opacity: tip2Opacity,
    },
    {
      num: 3,
      title: "배포 시 eval() 호출",
      color: "#8b5cf6",
      icon: "🚀",
      description: "Dropout/BatchNorm을 추론 모드로 전환",
      code: "model.eval()\nwith torch.no_grad():\n    output = model(input)",
      opacity: tip3Opacity,
    },
    {
      num: 4,
      title: "TorchScript 활용",
      color: LEVEL_COLOR,
      icon: "⚡",
      description: "Python 없이 모델 실행 가능 (C++/모바일)",
      code: "scripted = torch.jit.script(model)\nscripted.save('model_scripted.pt')",
      opacity: tip4Opacity,
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-7/scene6.mp3")} />

      {/* Title */}
      <h2
        style={{
          position: "absolute",
          top: 25,
          width: "100%",
          textAlign: "center",
          fontSize: 48,
          color: "white",
          opacity: titleOpacity,
          margin: 0,
        }}
      >
        실무 <span style={{ color: LEVEL_COLOR }}>팁</span>
      </h2>

      {/* Tips grid - 2x2 */}
      <div
        style={{
          position: "absolute",
          top: 90,
          width: "100%",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {tips.map((tip, i) => (
          <div
            key={i}
            style={{
              opacity: tip.opacity,
              backgroundColor: "#1e293b",
              borderRadius: 15,
              border: `3px solid ${tip.color}`,
              overflow: "hidden",
            }}
          >
            {/* Tip header */}
            <div
              style={{
                backgroundColor: tip.color,
                padding: "10px 15px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 24 }}>{tip.icon}</span>
              <span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                {tip.num}. {tip.title}
              </span>
            </div>

            {/* Tip content */}
            <div style={{ padding: 15 }}>
              <div style={{ color: "#9ca3af", fontSize: 16, marginBottom: 10 }}>
                {tip.description}
              </div>
              <div
                style={{
                  backgroundColor: "#0f172a",
                  padding: 12,
                  borderRadius: 8,
                  fontFamily: "monospace",
                  fontSize: 14,
                  lineHeight: 1.4,
                  color: "#e2e8f0",
                  whiteSpace: "pre-wrap",
                }}
              >
                {tip.code}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
