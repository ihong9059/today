/**
 * Scene 6: 학습과 예측
 * 훈련 결과와 실제 예측 데모
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Training: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 학습 진행률
  const epoch = Math.min(20, Math.floor(frame / 20));
  const accuracy = Math.min(0.92, 0.4 + epoch * 0.026);
  const progressOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 예측 예시
  const predictionOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });
  const lstmOpacity = interpolate(frame, [750, 780], [0, 1], { extrapolateRight: "clamp" });

  const predictions = [
    { text: "이 영화 너무 재밌어요!", sentiment: "긍정", prob: 0.85, color: "#22c55e" },
    { text: "시간 낭비였어요", sentiment: "부정", prob: 0.15, color: "#ef4444" },
  ];

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
      <Audio src={staticFile("audio/lesson-4-3/scene6.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        학습 & 예측
      </h1>

      {/* 학습 진행률 */}
      <div
        style={{
          opacity: progressOpacity,
          width: "90%",
          maxWidth: 800,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
            훈련 진행
          </span>
          <span style={{ fontSize: 28, color: colors.level[4], fontWeight: "bold" }}>
            Epoch {epoch}/20
          </span>
        </div>

        {/* 프로그레스 바 */}
        <div
          style={{
            backgroundColor: colors.gray[700],
            borderRadius: 12,
            height: 30,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(epoch / 20) * 100}%`,
              height: "100%",
              backgroundColor: colors.level[4],
              borderRadius: 12,
              transition: "width 0.3s",
            }}
          />
        </div>

        {/* 정확도 표시 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
            gap: 40,
          }}
        >
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "15px 30px",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, color: colors.gray[400] }}>정확도</div>
            <div style={{ fontSize: 36, color: "#22c55e", fontWeight: "bold" }}>
              {(accuracy * 100).toFixed(1)}%
            </div>
          </div>

          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "15px 30px",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, color: colors.gray[400] }}>손실</div>
            <div style={{ fontSize: 36, color: "#ef4444", fontWeight: "bold" }}>
              {(0.8 - epoch * 0.035).toFixed(3)}
            </div>
          </div>
        </div>
      </div>

      {/* 예측 예시 */}
      <div
        style={{
          opacity: predictionOpacity,
          width: "90%",
          maxWidth: 900,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: colors.level[4],
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          실제 예측 테스트
        </div>

        <div
          style={{
            display: "flex",
            gap: 30,
            justifyContent: "center",
          }}
        >
          {predictions.map((pred, i) => {
            const delay = 480 + i * 60;
            const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 30 });
            return (
              <div
                key={i}
                style={{
                  backgroundColor: colors.gray[800],
                  padding: 25,
                  borderRadius: 16,
                  border: `3px solid ${pred.color}`,
                  transform: `scale(${Math.max(0, scale)})`,
                  minWidth: 350,
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    color: colors.white,
                    marginBottom: 15,
                  }}
                >
                  "{pred.text}"
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 28,
                      color: pred.color,
                      fontWeight: "bold",
                    }}
                  >
                    {pred.sentiment}
                  </span>
                  <span
                    style={{
                      fontSize: 36,
                      color: pred.color,
                      fontWeight: "bold",
                    }}
                  >
                    {pred.prob.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LSTM 언급 */}
      <div
        style={{
          opacity: lstmOpacity,
          backgroundColor: "rgba(139, 92, 246, 0.2)",
          padding: "20px 40px",
          borderRadius: 16,
          border: "2px solid #8b5cf6",
        }}
      >
        <span style={{ fontSize: 24, color: colors.white }}>
          더 복잡한 문장? → <span style={{ color: "#8b5cf6", fontWeight: "bold" }}>LSTM</span>으로 순서 정보 활용! 🚀
        </span>
      </div>
    </AbsoluteFill>
  );
};
