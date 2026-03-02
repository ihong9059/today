/**
 * Scene 3: 단어 임베딩
 * 원핫 인코딩의 한계와 nn.Embedding
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Embedding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 원핫 인코딩 문제
  const onehotOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 임베딩 설명
  const embeddingOpacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });

  // nn.Embedding 코드
  const codeOpacity = interpolate(frame, [700, 730], [0, 1], { extrapolateRight: "clamp" });

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
      <Audio src={staticFile("audio/lesson-4-3/scene3.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        단어 임베딩 (Word Embedding)
      </h1>

      {/* 원핫 인코딩의 문제 */}
      <div
        style={{
          opacity: onehotOpacity,
          marginBottom: 30,
          width: "100%",
          maxWidth: 1100,
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#ef4444",
            fontWeight: "bold",
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          ❌ 원핫 인코딩의 문제
        </div>

        <div
          style={{
            display: "flex",
            gap: 30,
            justifyContent: "center",
          }}
        >
          {/* 영화 원핫 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 12,
              border: "2px solid #ef4444",
            }}
          >
            <div style={{ fontSize: 22, color: colors.white, marginBottom: 10 }}>
              "영화" →
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              {[1, 0, 0, 0, 0].map((v, i) => (
                <div
                  key={i}
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: v ? colors.level[4] : colors.gray[700],
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: colors.white,
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* 시네마 원핫 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 12,
              border: "2px solid #ef4444",
            }}
          >
            <div style={{ fontSize: 22, color: colors.white, marginBottom: 10 }}>
              "시네마" →
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              {[0, 0, 1, 0, 0].map((v, i) => (
                <div
                  key={i}
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: v ? colors.level[4] : colors.gray[700],
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: colors.white,
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* 문제 설명 */}
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              padding: 20,
              borderRadius: 12,
              maxWidth: 250,
            }}
          >
            <div style={{ fontSize: 18, color: colors.white, lineHeight: 1.6 }}>
              비슷한 의미인데<br/>
              완전히 다른 벡터!<br/>
              관계 표현 불가 😢
            </div>
          </div>
        </div>
      </div>

      {/* 임베딩 해결책 */}
      <div
        style={{
          opacity: embeddingOpacity,
          marginBottom: 30,
          width: "100%",
          maxWidth: 1100,
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#22c55e",
            fontWeight: "bold",
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          ✅ 임베딩: 밀집 벡터로 표현
        </div>

        <div
          style={{
            display: "flex",
            gap: 30,
            justifyContent: "center",
          }}
        >
          {/* 영화 임베딩 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 12,
              border: "2px solid #22c55e",
            }}
          >
            <div style={{ fontSize: 22, color: colors.white, marginBottom: 10 }}>
              "영화" →
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              {[0.8, 0.3, -0.2, 0.5].map((v, i) => {
                const delay = 430 + i * 10;
                const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 15 });
                return (
                  <div
                    key={i}
                    style={{
                      minWidth: 50,
                      height: 40,
                      backgroundColor: colors.level[4],
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      color: colors.white,
                      transform: `scale(${Math.max(0, scale)})`,
                      padding: "0 8px",
                    }}
                  >
                    {v}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 시네마 임베딩 (비슷함) */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 12,
              border: "2px solid #22c55e",
            }}
          >
            <div style={{ fontSize: 22, color: colors.white, marginBottom: 10 }}>
              "시네마" →
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              {[0.7, 0.4, -0.1, 0.6].map((v, i) => {
                const delay = 470 + i * 10;
                const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 15 });
                return (
                  <div
                    key={i}
                    style={{
                      minWidth: 50,
                      height: 40,
                      backgroundColor: colors.level[4],
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      color: colors.white,
                      transform: `scale(${Math.max(0, scale)})`,
                      padding: "0 8px",
                    }}
                  >
                    {v}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 장점 설명 */}
          <div
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              padding: 20,
              borderRadius: 12,
              maxWidth: 250,
            }}
          >
            <div style={{ fontSize: 18, color: colors.white, lineHeight: 1.6 }}>
              비슷한 의미 =<br/>
              비슷한 벡터!<br/>
              128차원 밀집 표현 ✨
            </div>
          </div>
        </div>
      </div>

      {/* nn.Embedding 코드 */}
      <div
        style={{
          opacity: codeOpacity,
          width: "100%",
          maxWidth: 800,
        }}
      >
        <div
          style={{
            backgroundColor: "#1e1e1e",
            borderRadius: 12,
            padding: 25,
            fontFamily: "monospace",
            border: `2px solid ${colors.level[4]}`,
          }}
        >
          <div style={{ fontSize: 24, color: "#569cd6", marginBottom: 10 }}>
            import torch.nn as nn
          </div>
          <div style={{ fontSize: 24, color: colors.white }}>
            <span style={{ color: "#dcdcaa" }}>embedding</span> ={" "}
            <span style={{ color: "#4ec9b0" }}>nn.Embedding</span>(
          </div>
          <div style={{ fontSize: 22, color: colors.white, paddingLeft: 30 }}>
            num_embeddings=<span style={{ color: "#b5cea8" }}>5000</span>,{" "}
            <span style={{ color: "#6a9955" }}># 어휘 크기</span>
          </div>
          <div style={{ fontSize: 22, color: colors.white, paddingLeft: 30 }}>
            embedding_dim=<span style={{ color: "#b5cea8" }}>128</span>{" "}
            <span style={{ color: "#6a9955" }}># 임베딩 차원</span>
          </div>
          <div style={{ fontSize: 24, color: colors.white }}>)</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
