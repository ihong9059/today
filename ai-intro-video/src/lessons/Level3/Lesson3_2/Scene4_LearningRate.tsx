/**
 * Scene 4: 학습률
 * 학습률의 역할과 중요성
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_LearningRate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 두 시나리오
  const tooLargeOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });
  const tooSmallOpacity = interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" });

  // 적절한 학습률
  const goodLROpacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });

  // 큰 학습률 애니메이션 (발산)
  const largeLRProgress = interpolate(frame, [150, 350], [0, 1], { extrapolateRight: "clamp" });

  // 작은 학습률 애니메이션 (느린 수렴)
  const smallLRProgress = interpolate(frame, [300, 500], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[900],
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-2/scene4.mp3")} />

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
        학습률 (Learning Rate) η
      </h1>

      {/* 두 시나리오 비교 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* 학습률이 너무 큰 경우 */}
        <div
          style={{
            flex: 1,
            maxWidth: 400,
            opacity: tooLargeOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: "#f8717120",
              border: "2px solid #f87171",
              borderRadius: 16,
              padding: 25,
            }}
          >
            <h3 style={{ color: "#f87171", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
              ❌ 학습률이 너무 크면
            </h3>

            {/* 발산 그래프 */}
            <svg width={340} height={150}>
              <path
                d="M 30 120 Q 100 40 170 100 Q 240 30 310 130"
                stroke={colors.gray[500]}
                strokeWidth={2}
                fill="none"
              />
              {/* 큰 점프 */}
              {largeLRProgress > 0 && (
                <>
                  <circle cx={30 + largeLRProgress * 80} cy={120 - largeLRProgress * 60} r={8} fill="#f87171" />
                  {largeLRProgress > 0.3 && (
                    <circle cx={110 + (largeLRProgress - 0.3) * 150} cy={60 + (largeLRProgress - 0.3) * 100} r={8} fill="#f87171" />
                  )}
                </>
              )}
            </svg>

            <div style={{ color: colors.gray[300], fontSize: 18, marginTop: 15 }}>
              • 최솟값을 지나쳐버림<br />
              • 손실이 오히려 커짐<br />
              • <strong style={{ color: "#f87171" }}>발산!</strong>
            </div>
          </div>
        </div>

        {/* 학습률이 너무 작은 경우 */}
        <div
          style={{
            flex: 1,
            maxWidth: 400,
            opacity: tooSmallOpacity,
          }}
        >
          <div
            style={{
              backgroundColor: "#fbbf2420",
              border: "2px solid #fbbf24",
              borderRadius: 16,
              padding: 25,
            }}
          >
            <h3 style={{ color: "#fbbf24", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
              ⚠️ 학습률이 너무 작으면
            </h3>

            {/* 느린 수렴 그래프 */}
            <svg width={340} height={150}>
              <path
                d="M 30 40 Q 170 120 310 40"
                stroke={colors.gray[500]}
                strokeWidth={2}
                fill="none"
              />
              {/* 작은 점프 */}
              {Array.from({ length: Math.floor(smallLRProgress * 10) }).map((_, i) => (
                <circle
                  key={i}
                  cx={30 + i * 30}
                  cy={40 + Math.sin(i * 0.5) * 30 * (1 - i / 10)}
                  r={6}
                  fill="#fbbf24"
                  opacity={0.5 + i * 0.05}
                />
              ))}
            </svg>

            <div style={{ color: colors.gray[300], fontSize: 18, marginTop: 15 }}>
              • 아주 조금씩만 이동<br />
              • 학습이 너무 오래 걸림<br />
              • <strong style={{ color: "#fbbf24" }}>비효율적!</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 적절한 학습률 */}
      <div
        style={{
          marginTop: 40,
          opacity: goodLROpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#22c55e20",
            border: "2px solid #22c55e",
            borderRadius: 16,
            padding: "25px 40px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            ✓ 적절한 학습률
          </h3>
          <div style={{ color: colors.gray[300], fontSize: 22 }}>
            보통 <code style={{ color: "#22c55e" }}>0.001</code> 또는{" "}
            <code style={{ color: "#22c55e" }}>0.0001</code>로 시작<br />
            학습 곡선을 보면서 조정합니다
          </div>
          <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 15 }}>
            💡 Adam 같은 옵티마이저는 학습률을 자동으로 조절해줍니다!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
