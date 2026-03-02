/**
 * Scene 7: 정리 및 마무리
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const summaryItems = [
    { icon: "📈", text: "미분 = 변화율 = 접선의 기울기", delay: 60 },
    { icon: "🧮", text: "기본 공식: xⁿ → n·xⁿ⁻¹, eˣ → eˣ", delay: 180 },
    { icon: "⛰️", text: "경사하강법: 기울기 반대 방향으로 이동", delay: 300 },
    { icon: "⚙️", text: "학습률: 한 번에 이동하는 크기 결정", delay: 420 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #3b1d5c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-2/scene7.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        오늘 배운 내용 정리
      </h1>

      {/* 요약 카드들 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 30,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {summaryItems.map((item, i) => {
          const opacity = interpolate(frame, [item.delay, item.delay + 30], [0, 1], { extrapolateRight: "clamp" });
          const scale = spring({ frame: frame - item.delay, fps, from: 0.8, to: 1, durationInFrames: 30 });

          return (
            <div
              key={i}
              style={{
                backgroundColor: colors.gray[800],
                borderRadius: 20,
                padding: "35px 40px",
                display: "flex",
                alignItems: "center",
                gap: 25,
                opacity,
                transform: `scale(${Math.max(0.8, scale)})`,
                border: "2px solid #a855f730",
              }}
            >
              <span style={{ fontSize: 50 }}>{item.icon}</span>
              <span style={{ fontSize: 28, color: colors.white }}>{item.text}</span>
            </div>
          );
        })}
      </div>

      {/* 핵심 공식 박스 */}
      <div
        style={{
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [540, 570], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            backgroundColor: "#22c55e20",
            border: "3px solid #22c55e",
            borderRadius: 20,
            padding: "30px 60px",
          }}
        >
          <div style={{ fontSize: 36, color: "#22c55e", fontWeight: "bold", textAlign: "center" }}>
            핵심 공식: w = w - η × ∇L
          </div>
          <div style={{ fontSize: 24, color: colors.white, textAlign: "center", marginTop: 15 }}>
            이 간단한 공식이 모든 딥러닝 학습의 핵심!
          </div>
        </div>
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [700, 730], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#a855f720",
            border: "2px solid #a855f7",
            borderRadius: 20,
            padding: "25px 50px",
          }}
        >
          <div style={{ fontSize: 28, color: "#a855f7", fontWeight: "bold" }}>
            📚 다음 강의: 벡터와 행렬
          </div>
          <div style={{ fontSize: 22, color: "#9ca3af", marginTop: 10 }}>
            여러 개의 가중치를 동시에 다루는 방법!
          </div>
        </div>
      </div>

      {/* 마무리 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [800, 830], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 36, color: "#fbbf24", fontWeight: "bold" }}>
          오늘도 수고하셨습니다! 👏
        </span>
      </div>
    </AbsoluteFill>
  );
};
