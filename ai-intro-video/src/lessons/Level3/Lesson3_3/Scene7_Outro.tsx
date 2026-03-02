/**
 * Scene 7: 아웃트로
 * 요약 및 다음 강의 예고
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 요약 포인트들
  const point1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const point2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const point3Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const point4Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });

  // 추천
  const recOpacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });

  // 다음 강의
  const nextOpacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });

  // 마무리
  const endOpacity = interpolate(frame, [520, 550], [0, 1], { extrapolateRight: "clamp" });

  const summaryItems = [
    { text: "SGD: 미니배치로 빠르게 학습", color: "#60a5fa", opacity: point1Opacity },
    { text: "Momentum: 관성으로 지그재그 감소", color: "#22c55e", opacity: point2Opacity },
    { text: "RMSprop: 적응적 학습률", color: "#fbbf24", opacity: point3Opacity },
    { text: "Adam: Momentum + RMSprop 결합", color: "#a855f7", opacity: point4Opacity },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-3/scene7.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 35,
          opacity: titleOpacity,
        }}
      >
        📝 오늘 배운 내용
      </h1>

      {/* 요약 포인트들 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
          marginBottom: 25,
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

      {/* 실전 추천 */}
      <div
        style={{
          backgroundColor: "#a855f720",
          border: "2px solid #a855f7",
          padding: "20px 40px",
          borderRadius: 16,
          textAlign: "center",
          marginBottom: 25,
          opacity: recOpacity,
        }}
      >
        <div style={{ color: "#a855f7", fontSize: 28, fontWeight: "bold" }}>
          👑 실전에서는 Adam으로 시작!
        </div>
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          border: "2px solid #60a5fa",
          padding: "22px 40px",
          borderRadius: 20,
          textAlign: "center",
          marginBottom: 25,
          opacity: nextOpacity,
        }}
      >
        <div style={{ color: "#60a5fa", fontSize: 20, marginBottom: 10 }}>
          다음 강의
        </div>
        <div style={{ color: colors.white, fontSize: 30, fontWeight: "bold" }}>
          Lesson 3-4: 순전파 (Forward Propagation)
        </div>
        <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 10 }}>
          입력이 어떻게 출력으로 전달되는지 알아봅니다 🔄
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
          오늘도 수고하셨습니다! 🎉
        </div>
      </div>
    </AbsoluteFill>
  );
};
