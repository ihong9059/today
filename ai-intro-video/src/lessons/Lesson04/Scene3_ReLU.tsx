import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L04_Scene3_ReLU: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  // ReLU graph animation
  const graphProgress = interpolate(frame, [100, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Linear vs nonlinear comparison
  const linearOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const nonlinearOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });

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
        ⚡ 활성화 함수 - ReLU
      </h2>

      <div style={{ display: "flex", gap: 50 }}>
        {/* Left: ReLU explanation and graph */}
        <div style={{ flex: 1 }}>
          {/* ReLU definition */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              marginBottom: 30,
              opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 24, marginBottom: 15, fontWeight: "bold" }}>
              ReLU (Rectified Linear Unit)
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 26, color: colors.white }}>
              def relu(x): return max(0, x)
            </div>
            <div style={{ marginTop: 20, color: colors.gray[300], fontSize: 20 }}>
              음수 → 0, 양수 → 그대로
            </div>
          </div>

          {/* ReLU Graph */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 30,
              height: 300,
              position: "relative",
              opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 18, marginBottom: 10 }}>
              ReLU 그래프
            </div>

            {/* Graph SVG */}
            <svg width="100%" height="250" viewBox="0 0 400 200">
              {/* Axes */}
              <line x1="50" y1="100" x2="350" y2="100" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="200" y1="20" x2="200" y2="180" stroke={colors.gray[600]} strokeWidth="2" />

              {/* Labels */}
              <text x="360" y="105" fill={colors.gray[400]} fontSize="14">x</text>
              <text x="205" y="15" fill={colors.gray[400]} fontSize="14">y</text>
              <text x="195" y="115" fill={colors.gray[400]} fontSize="12">0</text>

              {/* ReLU line - animated */}
              <line
                x1="50"
                y1="100"
                x2={50 + 150 * graphProgress}
                y2="100"
                stroke="#3b82f6"
                strokeWidth="4"
              />
              <line
                x1="200"
                y1="100"
                x2={200 + 150 * graphProgress}
                y2={100 - 80 * graphProgress}
                stroke="#22c55e"
                strokeWidth="4"
              />
            </svg>

            {/* Examples */}
            <div style={{
              display: "flex",
              gap: 40,
              marginTop: 10,
              opacity: interpolate(frame, [220, 250], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              <div style={{ color: "#3b82f6", fontSize: 18 }}>
                relu(-5) = 0
              </div>
              <div style={{ color: "#22c55e", fontSize: 18 }}>
                relu(3) = 3
              </div>
            </div>
          </div>
        </div>

        {/* Right: Why nonlinearity? */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: "#ef444420",
              border: "2px solid #ef4444",
              borderRadius: 16,
              padding: 25,
              marginBottom: 20,
              opacity: linearOpacity,
            }}
          >
            <div style={{ color: "#ef4444", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
              ❌ 활성화 함수 없이 (선형만)
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300], lineHeight: 1.8 }}>
              layer1 = x * w1<br />
              layer2 = layer1 * w2<br />
              <span style={{ color: "#ef4444" }}>
                = x * (w1 * w2) = x * w<br />
                → 하나의 선형 함수!
              </span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              borderRadius: 16,
              padding: 25,
              marginBottom: 20,
              opacity: nonlinearOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
              ✅ 활성화 함수 있으면 (비선형)
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300], lineHeight: 1.8 }}>
              layer1 = relu(x * w1)<br />
              layer2 = relu(layer1 * w2)<br />
              <span style={{ color: "#22c55e" }}>
                → 복잡한 패턴 학습 가능!
              </span>
            </div>
          </div>

          {/* Key insight */}
          <div
            style={{
              padding: 25,
              backgroundColor: "#f9731620",
              borderRadius: 16,
              border: "2px solid #f97316",
              opacity: interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <p style={{ color: "#f97316", fontSize: 22, margin: 0, fontWeight: "bold" }}>
              💡 ReLU = 딥러닝 혁명의 핵심
            </p>
            <p style={{ color: colors.gray[300], fontSize: 18, margin: "10px 0 0 0" }}>
              이 단순한 함수가 복잡한 AI를 가능하게 했습니다
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
