/**
 * Scene 6: 역전파 핵심 단계
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Steps: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const step1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const step2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const step3Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const step4Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const step5Opacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const step6Opacity = interpolate(frame, [360, 390], [0, 1], { extrapolateRight: "clamp" });

  const pyOpacity = interpolate(frame, [480, 510], [0, 1], { extrapolateRight: "clamp" });

  const steps = [
    { num: 1, text: "순전파로 예측값 계산", color: "#22c55e", code: "y = model(x)", opacity: step1Opacity },
    { num: 2, text: "손실 계산", color: "#60a5fa", code: "loss = criterion(y, t)", opacity: step2Opacity },
    { num: 3, text: "출력층 기울기 계산", color: "#a855f7", code: "∂L/∂y", opacity: step3Opacity },
    { num: 4, text: "연쇄법칙으로 기울기 전파", color: "#f87171", code: "∂L/∂h, ∂L/∂w...", opacity: step4Opacity },
    { num: 5, text: "모든 가중치의 기울기 획득", color: "#fbbf24", code: "w.grad", opacity: step5Opacity },
    { num: 6, text: "경사하강법으로 업데이트", color: "#22c55e", code: "w = w - η×grad", opacity: step6Opacity },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-5/scene6.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 50,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        역전파 핵심 단계
      </h1>

      <div style={{ display: "flex", gap: 30 }}>
        {/* 왼쪽 3단계 */}
        <div style={{ flex: 1 }}>
          {steps.slice(0, 3).map((step) => (
            <div
              key={step.num}
              style={{
                backgroundColor: colors.gray[800],
                padding: 18,
                borderRadius: 12,
                marginBottom: 15,
                borderLeft: `5px solid ${step.color}`,
                opacity: step.opacity,
                display: "flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <div
                style={{
                  backgroundColor: step.color,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>{step.num}</span>
              </div>
              <div>
                <div style={{ color: colors.white, fontSize: 20 }}>{step.text}</div>
                <div style={{ color: colors.gray[400], fontSize: 14, fontFamily: "monospace", marginTop: 3 }}>
                  {step.code}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽 3단계 */}
        <div style={{ flex: 1 }}>
          {steps.slice(3, 6).map((step) => (
            <div
              key={step.num}
              style={{
                backgroundColor: colors.gray[800],
                padding: 18,
                borderRadius: 12,
                marginBottom: 15,
                borderLeft: `5px solid ${step.color}`,
                opacity: step.opacity,
                display: "flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <div
                style={{
                  backgroundColor: step.color,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>{step.num}</span>
              </div>
              <div>
                <div style={{ color: colors.white, fontSize: 20 }}>{step.text}</div>
                <div style={{ color: colors.gray[400], fontSize: 14, fontFamily: "monospace", marginTop: 3 }}>
                  {step.code}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PyTorch */}
      <div
        style={{
          backgroundColor: "#a855f720",
          border: "3px solid #a855f7",
          padding: 20,
          borderRadius: 16,
          textAlign: "center",
          marginTop: 20,
          opacity: pyOpacity,
        }}
      >
        <div style={{ color: "#a855f7", fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          PyTorch에서는 한 줄로! 🎉
        </div>
        <div
          style={{
            backgroundColor: "#1e1e1e",
            padding: 12,
            borderRadius: 8,
            display: "inline-block",
          }}
        >
          <code style={{ color: colors.white, fontSize: 22 }}>
            loss.<span style={{ color: "#dcdcaa" }}>backward</span>()
          </code>
        </div>
        <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 8 }}>
          autograd가 모든 기울기를 자동 계산!
        </div>
      </div>
    </AbsoluteFill>
  );
};
