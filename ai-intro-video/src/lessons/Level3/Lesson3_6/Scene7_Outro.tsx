/**
 * Scene 7: 아웃트로
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const point1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const point2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const point3Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const point4Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });

  const pytorchOpacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });
  const nextOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });
  const endOpacity = interpolate(frame, [570, 600], [0, 1], { extrapolateRight: "clamp" });

  const summaryItems = [
    { text: "순전파: 입력 → 은닉층 → 출력 계산", color: "#22c55e", opacity: point1Opacity },
    { text: "손실 계산: L = (y - t)²", color: "#60a5fa", opacity: point2Opacity },
    { text: "역전파: 출력에서 시작, 연쇄법칙 적용", color: "#f87171", opacity: point3Opacity },
    { text: "활성화 함수 미분: σ' = σ × (1-σ)", color: "#a855f7", opacity: point4Opacity },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-6/scene7.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        오늘 배운 내용
      </h1>

      {/* 요약 포인트들 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
          marginBottom: 30,
        }}
      >
        {summaryItems.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: colors.gray[800],
              padding: "16px 35px",
              borderRadius: 16,
              borderLeft: `6px solid ${item.color}`,
              opacity: item.opacity,
              transform: `translateX(${interpolate(item.opacity, [0, 1], [50, 0])}px)`,
            }}
          >
            <span style={{ color: colors.white, fontSize: 24 }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* PyTorch */}
      <div
        style={{
          backgroundColor: "#a855f720",
          border: "2px solid #a855f7",
          padding: 20,
          borderRadius: 16,
          textAlign: "center",
          marginBottom: 25,
          opacity: pytorchOpacity,
        }}
      >
        <div style={{ color: "#a855f7", fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          PyTorch가 이 모든 걸 자동으로!
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
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          border: "2px solid #22c55e",
          padding: "18px 40px",
          borderRadius: 20,
          textAlign: "center",
          marginBottom: 20,
          opacity: nextOpacity,
        }}
      >
        <div style={{ color: "#22c55e", fontSize: 18, marginBottom: 8 }}>
          다음 강의
        </div>
        <div style={{ color: colors.white, fontSize: 28, fontWeight: "bold" }}>
          Lesson 3-7: 활성화 함수
        </div>
        <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 8 }}>
          ReLU, Sigmoid, Tanh의 특징을 알아봐요!
        </div>
      </div>

      {/* 마무리 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: endOpacity,
        }}
      >
        <div style={{ fontSize: 32, color: "#fbbf24", fontWeight: "bold" }}>
          수고하셨습니다!
        </div>
      </div>
    </AbsoluteFill>
  );
};
