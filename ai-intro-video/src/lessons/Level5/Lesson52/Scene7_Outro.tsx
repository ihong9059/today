/**
 * Scene 7: 아웃트로 - 정리 및 다음 강의 예고
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const summaryItems = [
    { icon: "🔲", text: "커널 = 특징 추출 필터" },
    { icon: "✖️", text: "합성곱 = 겹쳐서 곱하고 더하기" },
    { icon: "👟", text: "스트라이드 = 이동 간격" },
    { icon: "🔳", text: "패딩 = 테두리 확장" },
  ];

  const nextOpacity = interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" });
  const endOpacity = interpolate(frame, [800, 830], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c3aed 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-2/scene7.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        핵심 정리
      </h1>

      {/* 요약 카드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 25,
          marginBottom: 50,
        }}
      >
        {summaryItems.map((item, i) => {
          const delay = 60 + i * 60;
          const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 30 });
          return (
            <div
              key={item.text}
              style={{
                backgroundColor: colors.gray[800],
                padding: "25px 35px",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                gap: 20,
                transform: `scale(${Math.max(0, scale)})`,
                border: "2px solid #8b5cf6",
              }}
            >
              <span style={{ fontSize: 40 }}>{item.icon}</span>
              <span style={{ fontSize: 24, color: colors.white }}>{item.text}</span>
            </div>
          );
        })}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          backgroundColor: "#8b5cf622",
          padding: "20px 40px",
          borderRadius: 16,
          border: "2px solid #8b5cf6",
          marginBottom: 40,
          opacity: interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p style={{ fontSize: 26, color: colors.white, margin: 0, textAlign: "center" }}>
          CNN은 최적의 커널 값을 <span style={{ color: "#8b5cf6", fontWeight: "bold" }}>자동으로 학습</span>합니다!
        </p>
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          opacity: nextOpacity,
          backgroundColor: "#22c55e22",
          padding: "30px 50px",
          borderRadius: 20,
          border: "3px solid #22c55e",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 28, color: "#22c55e", marginBottom: 15 }}>다음 강의</h2>
        <div style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
          풀링과 배치 정규화
        </div>
        <div style={{ fontSize: 22, color: colors.gray[400], marginTop: 10 }}>
          특징 맵을 효율적으로 줄이는 방법
        </div>
      </div>

      {/* 마무리 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: endOpacity,
          fontSize: 32,
          color: colors.white,
          fontWeight: "bold",
        }}
      >
        수고하셨습니다! 👏
      </div>
    </AbsoluteFill>
  );
};
