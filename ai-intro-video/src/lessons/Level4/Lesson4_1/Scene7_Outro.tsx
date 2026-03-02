/**
 * Scene 7: 아웃트로
 * 정리 및 다음 레슨 예고
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, from: -50, to: 0, durationInFrames: 45 });

  // 배운 내용 체크리스트
  const checkItems = [
    "MNIST 데이터셋 이해",
    "nn.Module로 모델 정의",
    "학습 루프 구현",
    "98% 정확도 달성!",
  ];

  // 다음 레슨 예고
  const nextOpacity = interpolate(frame, [480, 510], [0, 1], { extrapolateRight: "clamp" });
  const thanksOpacity = interpolate(frame, [720, 750], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Audio src={staticFile("audio/lesson-4-1/scene7.mp3")} />

      {/* 레슨 완료 배지 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          backgroundColor: "#22c55e",
          color: colors.white,
          padding: "15px 40px",
          borderRadius: 30,
          fontSize: 28,
          fontWeight: "bold",
          opacity: titleOpacity,
        }}
      >
        ✓ Lesson 4-1 완료
      </div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: "0 4px 20px rgba(249,115,22,0.5)",
        }}
      >
        오늘 배운 내용
      </h1>

      {/* 체크리스트 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 25, marginBottom: 60 }}>
        {checkItems.map((item, i) => {
          const delay = 90 + i * 60;
          const itemOpacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
          const checkScale = spring({ frame: frame - delay - 15, fps, from: 0, to: 1, durationInFrames: 20 });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: itemOpacity,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${Math.max(0, checkScale)})`,
                }}
              >
                <span style={{ color: colors.white, fontSize: 24 }}>✓</span>
              </div>
              <span style={{ color: colors.gray[100], fontSize: 32 }}>{item}</span>
            </div>
          );
        })}
      </div>

      {/* 다음 레슨 예고 */}
      <div
        style={{
          opacity: nextOpacity,
          backgroundColor: colors.gray[800],
          padding: "30px 50px",
          borderRadius: 16,
          borderLeft: `5px solid ${colors.level[4]}`,
          marginBottom: 40,
        }}
      >
        <div style={{ color: colors.gray[400], fontSize: 24, marginBottom: 10 }}>
          다음 레슨
        </div>
        <div style={{ color: colors.level[4], fontSize: 36, fontWeight: "bold" }}>
          Lesson 4-2: CNN으로 이미지 분류
        </div>
        <div style={{ color: colors.gray[300], fontSize: 24, marginTop: 10 }}>
          더 복잡한 이미지 패턴 인식하기
        </div>
      </div>

      {/* 감사 인사 */}
      <div
        style={{
          opacity: thanksOpacity,
          fontSize: 42,
          color: colors.white,
          fontWeight: "bold",
        }}
      >
        함께해주셔서 감사합니다! 🙏
      </div>

      {/* 시리즈 로고 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          display: "flex",
          alignItems: "center",
          gap: 15,
          opacity: thanksOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: colors.level[4],
            color: colors.white,
            padding: "10px 25px",
            borderRadius: 20,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          AI 기초 교육
        </div>
        <span style={{ color: colors.gray[400], fontSize: 20 }}>
          Level 4: PyTorch 실전
        </span>
      </div>
    </AbsoluteFill>
  );
};
