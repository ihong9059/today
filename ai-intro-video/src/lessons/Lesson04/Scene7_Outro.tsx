import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L04_Scene7_Outro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  const summaryItems = [
    {
      title: "함수의 기본",
      content: "입력 → 처리 → 출력\n신경망 = 큰 함수",
      icon: "📦",
      color: "#3b82f6",
      delay: 60,
    },
    {
      title: "활성화 함수",
      content: "비선형성 추가\nReLU, Sigmoid, Softmax",
      icon: "⚡",
      color: "#22c55e",
      delay: 150,
    },
    {
      title: "손실 함수",
      content: "예측 오차 측정\n학습 = 손실 최소화",
      icon: "📉",
      color: "#ef4444",
      delay: 240,
    },
    {
      title: "콜백 함수",
      content: "이벤트 시 자동 호출\nEarly Stopping 등",
      icon: "🔔",
      color: "#8b5cf6",
      delay: 330,
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
          textAlign: "center",
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        📝 오늘 배운 내용 정리
      </h2>

      {/* Summary grid */}
      <div style={{ display: "flex", gap: 25, marginBottom: 40 }}>
        {summaryItems.map((item, idx) => {
          const cardOpacity = interpolate(
            frame,
            [item.delay, item.delay + 30],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          const cardScale = interpolate(
            frame,
            [item.delay, item.delay + 30],
            [0.8, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                backgroundColor: colors.gray[800],
                borderRadius: 16,
                padding: 25,
                border: `2px solid ${item.color}`,
                opacity: cardOpacity,
                transform: `scale(${cardScale})`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ color: item.color, fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
                {item.title}
              </div>
              <div style={{ color: colors.gray[300], fontSize: 16, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {item.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI prompt tip */}
      <div
        style={{
          backgroundColor: "#22c55e20",
          border: "2px solid #22c55e",
          borderRadius: 16,
          padding: 30,
          marginBottom: 30,
          opacity: interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ color: "#22c55e", fontSize: 26, fontWeight: "bold", marginBottom: 15 }}>
          💡 문법 외울 필요 없어요!
        </div>
        <div style={{ display: "flex", gap: 30 }}>
          <div style={{
            flex: 1,
            backgroundColor: colors.gray[800],
            padding: 15,
            borderRadius: 10,
          }}>
            <span style={{ color: colors.gray[300], fontSize: 18 }}>
              "ReLU 활성화 함수 구현해줘"
            </span>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: colors.gray[800],
            padding: 15,
            borderRadius: 10,
          }}>
            <span style={{ color: colors.gray[300], fontSize: 18 }}>
              "Cross Entropy 손실 함수 설명해줘"
            </span>
          </div>
        </div>
      </div>

      {/* Next lesson preview */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          opacity: interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{
          backgroundColor: "#f9731620",
          border: "2px solid #f97316",
          borderRadius: 16,
          padding: "20px 40px",
        }}>
          <span style={{ color: "#f97316", fontSize: 22, fontWeight: "bold" }}>
            🔜 다음 레슨: NumPy 기초
          </span>
          <p style={{ color: colors.gray[300], fontSize: 18, margin: "10px 0 0 0" }}>
            신경망이 다루는 텐서 데이터 구조
          </p>
        </div>
      </div>

      {/* Thank you */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [620, 650], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ color: colors.white, fontSize: 36, fontWeight: "bold" }}>
          감사합니다! 🙏
        </span>
      </div>
    </AbsoluteFill>
  );
};
