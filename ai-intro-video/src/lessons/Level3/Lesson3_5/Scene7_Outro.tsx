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
    { text: "역전파: 출력 → 입력 방향으로 기울기 전파", color: "#f87171", opacity: point1Opacity },
    { text: "연쇄법칙으로 복잡한 신경망도 효율적 계산", color: "#60a5fa", opacity: point2Opacity },
    { text: "뒤 레이어 기울기가 앞 레이어 계산에 필요", color: "#fbbf24", opacity: point3Opacity },
    { text: "PyTorch: loss.backward()가 자동 처리", color: "#a855f7", opacity: point4Opacity },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-5/scene7.mp3")} />

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

      {/* 역전파 흐름 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 15,
          marginBottom: 25,
          opacity: point4Opacity,
        }}
      >
        <div style={{ backgroundColor: "#a855f7", padding: "10px 20px", borderRadius: 10 }}>
          <span style={{ color: colors.white, fontWeight: "bold" }}>L</span>
        </div>
        <span style={{ color: "#f87171", fontSize: 24, alignSelf: "center" }}>⬅</span>
        <div style={{ backgroundColor: "#fbbf24", padding: "10px 20px", borderRadius: 10 }}>
          <span style={{ color: colors.gray[900], fontWeight: "bold" }}>∂L/∂h</span>
        </div>
        <span style={{ color: "#f87171", fontSize: 24, alignSelf: "center" }}>⬅</span>
        <div style={{ backgroundColor: "#22c55e", padding: "10px 20px", borderRadius: 10 }}>
          <span style={{ color: colors.white, fontWeight: "bold" }}>∂L/∂w</span>
        </div>
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          border: "2px solid #22c55e",
          padding: "22px 40px",
          borderRadius: 20,
          textAlign: "center",
          marginBottom: 25,
          opacity: nextOpacity,
        }}
      >
        <div style={{ color: "#22c55e", fontSize: 20, marginBottom: 10 }}>
          다음 강의
        </div>
        <div style={{ color: colors.white, fontSize: 30, fontWeight: "bold" }}>
          Lesson 3-6: 역전파 구현
        </div>
        <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 10 }}>
          손으로 직접 계산하며 더 깊이 이해해봐요! ✍️
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
