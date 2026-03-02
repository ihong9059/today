/**
 * Scene 7: 아웃트로
 * 요약 및 다음 강의 예고
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 요약 포인트들
  const point1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const point2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const point3Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const point4Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });

  // 공식
  const formulaOpacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });

  // 다음 강의
  const nextOpacity = interpolate(frame, [430, 460], [0, 1], { extrapolateRight: "clamp" });

  // 마무리
  const endOpacity = interpolate(frame, [530, 560], [0, 1], { extrapolateRight: "clamp" });

  const summaryItems = [
    { text: "기울기의 반대 방향으로 이동 → 손실 감소", color: "#60a5fa", delay: point1Opacity },
    { text: "학습률이 너무 크면 발산, 작으면 느림", color: "#fbbf24", delay: point2Opacity },
    { text: "학습이 진행되면 손실이 줄어들다 수렴", color: "#22c55e", delay: point3Opacity },
    { text: "PyTorch: zero_grad → forward → backward → step", color: "#a855f7", delay: point4Opacity },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-2/scene7.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 40,
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
          gap: 20,
          marginBottom: 30,
        }}
      >
        {summaryItems.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: colors.gray[800],
              padding: "18px 35px",
              borderRadius: 16,
              borderLeft: `6px solid ${item.color}`,
              opacity: item.delay,
              transform: `translateX(${interpolate(item.delay, [0, 1], [50, 0])}px)`,
            }}
          >
            <span style={{ color: colors.white, fontSize: 26 }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* 핵심 공식 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 30,
          opacity: formulaOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "20px 50px",
            borderRadius: 16,
            border: "2px solid #60a5fa",
          }}
        >
          <div style={{ color: colors.white, fontSize: 36, fontFamily: "serif", textAlign: "center" }}>
            w<sub>new</sub> = w<sub>old</sub> - η · ∂L/∂w
          </div>
        </div>
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: "#a855f720",
          border: "2px solid #a855f7",
          padding: "25px 40px",
          borderRadius: 20,
          textAlign: "center",
          marginBottom: 30,
          opacity: nextOpacity,
        }}
      >
        <div style={{ color: "#a855f7", fontSize: 22, marginBottom: 10 }}>
          다음 강의
        </div>
        <div style={{ color: colors.white, fontSize: 32, fontWeight: "bold" }}>
          Lesson 3-3: 경사하강법 변형
        </div>
        <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 10 }}>
          SGD, Momentum, Adam - 더 똑똑한 옵티마이저들 🚀
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
        <div style={{ fontSize: 34, color: "#fbbf24", fontWeight: "bold" }}>
          오늘도 수고하셨습니다! 🎉
        </div>
        <div style={{ fontSize: 26, color: colors.gray[400], marginTop: 12 }}>
          다음 시간에 만나요!
        </div>
      </div>
    </AbsoluteFill>
  );
};
