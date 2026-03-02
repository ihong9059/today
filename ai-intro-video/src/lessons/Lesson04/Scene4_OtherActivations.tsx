import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L04_Scene4_OtherActivations: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const activations = [
    {
      name: "Sigmoid",
      formula: "1 / (1 + e^-x)",
      output: "0 ~ 1",
      useCase: "이진 분류",
      example: "스팸 확률: 0.87",
      color: "#3b82f6",
      delay: 60,
    },
    {
      name: "Softmax",
      formula: "e^xi / Σe^xj",
      output: "합 = 1",
      useCase: "다중 분류",
      example: "고양이 0.7, 개 0.2, 새 0.1",
      color: "#8b5cf6",
      delay: 200,
    },
    {
      name: "ReLU",
      formula: "max(0, x)",
      output: "0 ~ ∞",
      useCase: "은닉층",
      example: "가장 많이 사용!",
      color: "#22c55e",
      delay: 340,
    },
  ];

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
          marginBottom: 40,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        🔄 다양한 활성화 함수들
      </h2>

      {/* Activation function cards */}
      <div style={{ display: "flex", gap: 30 }}>
        {activations.map((act, idx) => {
          const cardOpacity = interpolate(
            frame,
            [act.delay, act.delay + 30],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          const cardY = interpolate(
            frame,
            [act.delay, act.delay + 30],
            [50, 0],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                backgroundColor: colors.gray[800],
                borderRadius: 20,
                padding: 30,
                border: `3px solid ${act.color}`,
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
              }}
            >
              {/* Name */}
              <div style={{
                fontSize: 32,
                fontWeight: "bold",
                color: act.color,
                marginBottom: 20,
              }}>
                {act.name}
              </div>

              {/* Formula */}
              <div style={{
                backgroundColor: colors.gray[700],
                padding: "12px 20px",
                borderRadius: 10,
                marginBottom: 20,
                fontFamily: "monospace",
                fontSize: 20,
                color: colors.white,
              }}>
                f(x) = {act.formula}
              </div>

              {/* Output range */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 15,
              }}>
                <span style={{ color: colors.gray[400], fontSize: 18 }}>출력 범위:</span>
                <span style={{ color: colors.white, fontSize: 18, fontWeight: "bold" }}>{act.output}</span>
              </div>

              {/* Use case */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}>
                <span style={{ color: colors.gray[400], fontSize: 18 }}>사용처:</span>
                <span style={{ color: act.color, fontSize: 18, fontWeight: "bold" }}>{act.useCase}</span>
              </div>

              {/* Example */}
              <div style={{
                backgroundColor: `${act.color}20`,
                padding: "15px 20px",
                borderRadius: 10,
                color: colors.gray[200],
                fontSize: 16,
              }}>
                {act.example}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div
        style={{
          marginTop: 50,
          display: "flex",
          gap: 40,
          opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{
          flex: 1,
          padding: 25,
          backgroundColor: "#22c55e20",
          borderRadius: 16,
          border: "2px solid #22c55e",
        }}>
          <span style={{ color: "#22c55e", fontSize: 22, fontWeight: "bold" }}>
            💡 핵심만 기억하세요!
          </span>
          <p style={{ color: colors.gray[300], fontSize: 18, margin: "10px 0 0 0" }}>
            "활성화 함수 = 신경망에 비선형성 추가"
          </p>
        </div>

        <div style={{
          flex: 1,
          padding: 25,
          backgroundColor: "#3b82f620",
          borderRadius: 16,
          border: "2px solid #3b82f6",
        }}>
          <span style={{ color: "#3b82f6", fontSize: 22, fontWeight: "bold" }}>
            🎯 언제 어떤 걸 쓸까?
          </span>
          <p style={{ color: colors.gray[300], fontSize: 18, margin: "10px 0 0 0" }}>
            은닉층: ReLU | 이진분류: Sigmoid | 다중분류: Softmax
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
