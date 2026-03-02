import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L04_Scene5_LossFunction: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  // Loss decreasing animation
  const lossProgress = interpolate(frame, [400, 600], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        padding: 60,
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: 48,
          color: colors.white,
          marginBottom: 30,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        📉 손실 함수 (Loss Function)
      </h2>

      <div style={{ display: "flex", gap: 50 }}>
        {/* Left: Loss functions */}
        <div style={{ flex: 1 }}>
          {/* Definition */}
          <div
            style={{
              backgroundColor: "#ef444420",
              border: "2px solid #ef4444",
              borderRadius: 16,
              padding: 25,
              marginBottom: 30,
              opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: "#ef4444", fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
              손실 함수란?
            </div>
            <p style={{ color: colors.gray[300], fontSize: 22, margin: 0 }}>
              예측이 <span style={{ color: "#ef4444" }}>얼마나 틀렸는지</span> 측정하는 함수
            </p>
          </div>

          {/* MSE */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              marginBottom: 20,
              opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: "#3b82f6", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
              MSE (Mean Squared Error)
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300], lineHeight: 1.8 }}>
              def mse_loss(pred, target):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;return mean((pred - target)²)
            </div>
            <div style={{
              marginTop: 15,
              padding: "10px 15px",
              backgroundColor: colors.gray[700],
              borderRadius: 8,
              color: "#3b82f6",
              fontSize: 16,
            }}>
              회귀 문제에 사용 (예: 집값 예측)
            </div>
          </div>

          {/* Cross Entropy */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: "#8b5cf6", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
              Cross Entropy
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300], lineHeight: 1.8 }}>
              def ce_loss(pred, target):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;return -sum(target * log(pred))
            </div>
            <div style={{
              marginTop: 15,
              padding: "10px 15px",
              backgroundColor: colors.gray[700],
              borderRadius: 8,
              color: "#8b5cf6",
              fontSize: 16,
            }}>
              분류 문제에 사용 (예: 이미지 분류)
            </div>
          </div>
        </div>

        {/* Right: Learning process */}
        <div style={{ flex: 1 }}>
          {/* Learning = minimizing loss */}
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              borderRadius: 16,
              padding: 25,
              marginBottom: 30,
              opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
              🎯 AI 학습 = 손실 함수 최소화!
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 16, color: colors.gray[300], lineHeight: 2 }}>
              for epoch in range(100):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;prediction = model(data)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#ef4444" }}>loss = loss_fn(pred, target)</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;loss.backward()<br />
              &nbsp;&nbsp;&nbsp;&nbsp;optimizer.step()
            </div>
          </div>

          {/* Loss graph */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              height: 280,
              opacity: interpolate(frame, [380, 400], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 18, marginBottom: 15 }}>
              학습 과정: 손실이 줄어듦
            </div>
            <svg width="100%" height="200" viewBox="0 0 400 180">
              {/* Axes */}
              <line x1="50" y1="150" x2="380" y2="150" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="50" y1="20" x2="50" y2="150" stroke={colors.gray[600]} strokeWidth="2" />

              {/* Labels */}
              <text x="200" y="175" fill={colors.gray[400]} fontSize="14" textAnchor="middle">Epoch</text>
              <text x="25" y="90" fill={colors.gray[400]} fontSize="14" transform="rotate(-90, 25, 90)">Loss</text>

              {/* Loss curve - animated */}
              <path
                d={`M 50 40 Q ${50 + 150 * lossProgress} ${40 + 60 * lossProgress} ${50 + 300 * lossProgress} ${40 + 100 * lossProgress}`}
                stroke="#ef4444"
                strokeWidth="4"
                fill="none"
              />

              {/* Loss values */}
              <text x="60" y="35" fill="#ef4444" fontSize="14" opacity={lossProgress > 0.1 ? 1 : 0}>높음</text>
              <text x={50 + 300 * lossProgress - 20} y={50 + 100 * lossProgress} fill="#22c55e" fontSize="14" opacity={lossProgress > 0.8 ? 1 : 0}>낮음</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div
        style={{
          marginTop: 30,
          padding: 20,
          backgroundColor: "#f9731620",
          borderRadius: 16,
          border: "2px solid #f97316",
          textAlign: "center",
          opacity: interpolate(frame, [650, 680], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ color: "#f97316", fontSize: 24, fontWeight: "bold" }}>
          💡 손실이 크면 많이 틀린 것, 손실이 작으면 잘 맞춘 것!
        </span>
      </div>
    </AbsoluteFill>
  );
};
