/**
 * Scene 4: 텍스트 분류 모델 구조
 * 임베딩 → 평균 풀링 → 분류기
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_ModelArchitecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 모델 구조 단계별 애니메이션
  const inputOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const embeddingOpacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });
  const poolingOpacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });
  const outputOpacity = interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" });
  const resultOpacity = interpolate(frame, [750, 780], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-3/scene4.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        텍스트 분류 모델 구조
      </h1>

      {/* 모델 파이프라인 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 25,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* 입력 문장 */}
        <div
          style={{
            opacity: inputOpacity,
            backgroundColor: colors.gray[800],
            padding: 20,
            borderRadius: 12,
            border: `2px solid ${colors.level[4]}`,
          }}
        >
          <div style={{ fontSize: 18, color: colors.level[4], marginBottom: 10, fontWeight: "bold" }}>
            입력 문장
          </div>
          <div style={{ fontSize: 22, color: colors.white }}>
            "이 영화 재밌어요"
          </div>
          <div style={{ fontSize: 16, color: colors.gray[400], marginTop: 10 }}>
            [0, 1, 3]
          </div>
        </div>

        <span style={{ fontSize: 36, color: colors.white, opacity: inputOpacity }}>→</span>

        {/* 임베딩 층 */}
        <div
          style={{
            opacity: embeddingOpacity,
            backgroundColor: colors.level[4],
            padding: 20,
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 18, color: colors.white, marginBottom: 10, fontWeight: "bold" }}>
            nn.Embedding
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {["이", "영화", "재밌어요"].map((word, i) => {
              const delay = 230 + i * 30;
              const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 20 });
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    transform: `scale(${Math.max(0, scale)})`,
                  }}
                >
                  <span style={{ fontSize: 16, color: colors.white, width: 70 }}>{word}</span>
                  <div
                    style={{
                      display: "flex",
                      gap: 3,
                    }}
                  >
                    {[1, 2, 3, 4].map((v) => (
                      <div
                        key={v}
                        style={{
                          width: 25,
                          height: 25,
                          backgroundColor: "rgba(255,255,255,0.3)",
                          borderRadius: 4,
                        }}
                      />
                    ))}
                    <span style={{ color: colors.white, fontSize: 14 }}>...128</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <span style={{ fontSize: 36, color: colors.white, opacity: embeddingOpacity }}>→</span>

        {/* 평균 풀링 */}
        <div
          style={{
            opacity: poolingOpacity,
            backgroundColor: "#22c55e",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 18, color: colors.white, marginBottom: 10, fontWeight: "bold" }}>
            평균 풀링
          </div>
          <div style={{ fontSize: 14, color: colors.white, marginBottom: 15 }}>
            3개 단어 벡터 평균
          </div>
          <div
            style={{
              display: "flex",
              gap: 3,
            }}
          >
            {[1, 2, 3, 4].map((v) => (
              <div
                key={v}
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: "rgba(255,255,255,0.4)",
                  borderRadius: 4,
                }}
              />
            ))}
            <span style={{ color: colors.white, fontSize: 14 }}>...128</span>
          </div>
          <div style={{ fontSize: 14, color: colors.white, marginTop: 10 }}>
            → 문장 벡터 (1 × 128)
          </div>
        </div>

        <span style={{ fontSize: 36, color: colors.white, opacity: poolingOpacity }}>→</span>

        {/* 완전연결층 + Sigmoid */}
        <div
          style={{
            opacity: outputOpacity,
            backgroundColor: "#8b5cf6",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 18, color: colors.white, marginBottom: 10, fontWeight: "bold" }}>
            Linear + Sigmoid
          </div>
          <div style={{ fontSize: 14, color: colors.white }}>
            128 → 1
          </div>
          <div style={{ fontSize: 14, color: colors.white, marginTop: 10 }}>
            확률 출력
          </div>
        </div>

        <span style={{ fontSize: 36, color: colors.white, opacity: outputOpacity }}>→</span>

        {/* 결과 */}
        <div
          style={{
            opacity: resultOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: "#22c55e",
              padding: "20px 30px",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
              0.85
            </div>
            <div style={{ fontSize: 18, color: colors.white }}>
              긍정 85%
            </div>
          </div>
        </div>
      </div>

      {/* 설명 */}
      <div
        style={{
          opacity: resultOpacity,
          marginTop: 40,
          display: "flex",
          gap: 30,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            padding: "15px 25px",
            borderRadius: 12,
            border: "2px solid #22c55e",
          }}
        >
          <span style={{ fontSize: 20, color: colors.white }}>
            0.8 이상 → 80% 긍정 😊
          </span>
        </div>
        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            padding: "15px 25px",
            borderRadius: 12,
            border: "2px solid #ef4444",
          }}
        >
          <span style={{ fontSize: 20, color: colors.white }}>
            0.2 이하 → 80% 부정 😢
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
