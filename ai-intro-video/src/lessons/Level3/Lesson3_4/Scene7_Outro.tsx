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

  const nextOpacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });
  const endOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });

  const summaryItems = [
    { text: "순전파: 입력 → 출력으로 데이터 전달", color: "#22c55e", opacity: point1Opacity },
    { text: "각 레이어: z = Wx + b (선형 변환)", color: "#60a5fa", opacity: point2Opacity },
    { text: "활성화 함수로 비선형성 추가", color: "#fbbf24", opacity: point3Opacity },
    { text: "PyTorch: forward 메서드에서 정의", color: "#a855f7", opacity: point4Opacity },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-4/scene7.mp3")} />

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

      {/* 순전파 흐름 요약 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 15,
          marginBottom: 30,
          opacity: point4Opacity,
        }}
      >
        <div style={{ backgroundColor: "#22c55e", padding: "10px 20px", borderRadius: 10 }}>
          <span style={{ color: colors.white, fontWeight: "bold" }}>x</span>
        </div>
        <span style={{ color: "#60a5fa", fontSize: 24, alignSelf: "center" }}>→</span>
        <div style={{ backgroundColor: colors.gray[700], padding: "10px 20px", borderRadius: 10 }}>
          <span style={{ color: colors.white }}>Wx+b</span>
        </div>
        <span style={{ color: "#60a5fa", fontSize: 24, alignSelf: "center" }}>→</span>
        <div style={{ backgroundColor: "#fbbf24", padding: "10px 20px", borderRadius: 10 }}>
          <span style={{ color: colors.gray[900], fontWeight: "bold" }}>σ</span>
        </div>
        <span style={{ color: "#60a5fa", fontSize: 24, alignSelf: "center" }}>→</span>
        <div style={{ backgroundColor: "#a855f7", padding: "10px 20px", borderRadius: 10 }}>
          <span style={{ color: colors.white, fontWeight: "bold" }}>ŷ</span>
        </div>
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          border: "2px solid #f87171",
          padding: "22px 40px",
          borderRadius: 20,
          textAlign: "center",
          marginBottom: 25,
          opacity: nextOpacity,
        }}
      >
        <div style={{ color: "#f87171", fontSize: 20, marginBottom: 10 }}>
          다음 강의
        </div>
        <div style={{ color: colors.white, fontSize: 30, fontWeight: "bold" }}>
          Lesson 3-5: 역전파 이론 (Backpropagation)
        </div>
        <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 10 }}>
          출력에서 입력으로 기울기가 전달되는 과정! ⬅️
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
