/**
 * Scene 2: 토큰화와 어휘 사전
 * 텍스트를 숫자로 변환하는 과정
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_Tokenization: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 토큰화 예시
  const sentence = "이 영화 정말 재밌어요";
  const tokens = ["이", "영화", "정말", "재밌어요"];
  const tokenOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 어휘 사전
  const vocab = [
    { word: "이", idx: 0 },
    { word: "영화", idx: 1 },
    { word: "정말", idx: 2 },
    { word: "재밌어요", idx: 3 },
    { word: "지루해요", idx: 4 },
  ];
  const vocabOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  // 정수 인코딩
  const encodedOpacity = interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-3/scene2.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        텍스트 → 숫자 변환
      </h1>

      {/* Step 1: 토큰화 */}
      <div
        style={{
          opacity: tokenOpacity,
          marginBottom: 40,
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: colors.level[4],
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Step 1: 토큰화
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "20px 30px",
              borderRadius: 12,
              fontSize: 28,
              color: colors.white,
            }}
          >
            "{sentence}"
          </div>

          <span style={{ fontSize: 36, color: colors.white }}>→</span>

          <div style={{ display: "flex", gap: 10 }}>
            {tokens.map((token, i) => {
              const delay = 90 + i * 20;
              const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 20 });
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.level[4],
                    padding: "15px 25px",
                    borderRadius: 10,
                    fontSize: 26,
                    color: colors.white,
                    fontWeight: "bold",
                    transform: `scale(${Math.max(0, scale)})`,
                  }}
                >
                  {token}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step 2: 어휘 사전 */}
      <div
        style={{
          opacity: vocabOpacity,
          marginBottom: 40,
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: colors.level[4],
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Step 2: 어휘 사전 (Vocabulary)
        </div>

        <div
          style={{
            display: "flex",
            gap: 15,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {vocab.map((item, i) => {
            const delay = 330 + i * 15;
            const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 20 });
            return (
              <div
                key={i}
                style={{
                  backgroundColor: colors.gray[800],
                  padding: "15px 25px",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  transform: `scale(${Math.max(0, scale)})`,
                  border: `2px solid ${colors.level[4]}`,
                }}
              >
                <span style={{ fontSize: 24, color: colors.white }}>{item.word}</span>
                <span style={{ fontSize: 20, color: colors.level[4] }}>→</span>
                <span style={{ fontSize: 24, color: "#22c55e", fontWeight: "bold" }}>{item.idx}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 3: 정수 인코딩 */}
      <div
        style={{
          opacity: encodedOpacity,
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: colors.level[4],
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Step 3: 정수 인코딩
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {tokens.map((token, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: colors.level[4],
                  padding: "15px 25px",
                  borderRadius: 10,
                  fontSize: 24,
                  color: colors.white,
                }}
              >
                {token}
              </div>
            ))}
          </div>

          <span style={{ fontSize: 36, color: colors.white }}>→</span>

          <div
            style={{
              backgroundColor: "#22c55e",
              padding: "20px 30px",
              borderRadius: 12,
              display: "flex",
              gap: 15,
            }}
          >
            {[0, 1, 2, 3].map((idx, i) => {
              const delay = 660 + i * 15;
              const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 20 });
              return (
                <span
                  key={i}
                  style={{
                    fontSize: 32,
                    color: colors.white,
                    fontWeight: "bold",
                    transform: `scale(${Math.max(0, scale)})`,
                    display: "inline-block",
                  }}
                >
                  {idx}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
