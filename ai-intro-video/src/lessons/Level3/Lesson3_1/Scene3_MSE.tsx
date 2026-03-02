/**
 * Scene 3: MSE (평균 제곱 오차)
 * MSE 공식과 특징 설명
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_MSE: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const formulaOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 공식 분해 애니메이션
  const step1Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const step2Opacity = interpolate(frame, [230, 260], [0, 1], { extrapolateRight: "clamp" });
  const step3Opacity = interpolate(frame, [310, 340], [0, 1], { extrapolateRight: "clamp" });

  // 왜 제곱하는가
  const reason1Opacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });
  const reason2Opacity = interpolate(frame, [520, 550], [0, 1], { extrapolateRight: "clamp" });

  // 사용 예시
  const usageOpacity = interpolate(frame, [650, 680], [0, 1], { extrapolateRight: "clamp" });

  const formulaScale = spring({ frame: frame - 60, fps, from: 0.8, to: 1, durationInFrames: 30 });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[900],
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-1/scene3.mp3")} />

      {/* 제목 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        <h1
          style={{
            fontSize: 64,
            color: colors.white,
            fontWeight: "bold",
          }}
        >
          MSE
        </h1>
        <span style={{ color: colors.gray[400], fontSize: 36 }}>
          Mean Squared Error
        </span>
      </div>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 42,
          color: "#60a5fa",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        평균 제곱 오차
      </h2>

      {/* MSE 공식 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 50,
          opacity: formulaOpacity,
          transform: `scale(${formulaScale})`,
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "40px 80px",
            borderRadius: 20,
            border: "3px solid #60a5fa",
          }}
        >
          <div style={{ fontSize: 48, color: colors.white, fontFamily: "serif", textAlign: "center" }}>
            MSE = <span style={{ color: "#60a5fa" }}>1/n</span> Σ (<span style={{ color: "#22c55e" }}>ŷ</span> - <span style={{ color: "#f87171" }}>y</span>)²
          </div>
        </div>
      </div>

      {/* 공식 분해 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 30, marginBottom: 40 }}>
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "20px 30px",
            borderRadius: 12,
            textAlign: "center",
            opacity: step1Opacity,
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 32, fontWeight: "bold" }}>ŷ</div>
          <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 8 }}>예측값</div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "20px 30px",
            borderRadius: 12,
            textAlign: "center",
            opacity: step1Opacity,
          }}
        >
          <div style={{ color: "#f87171", fontSize: 32, fontWeight: "bold" }}>y</div>
          <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 8 }}>실제값</div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "20px 30px",
            borderRadius: 12,
            textAlign: "center",
            opacity: step2Opacity,
          }}
        >
          <div style={{ color: "#fbbf24", fontSize: 32, fontWeight: "bold" }}>(ŷ - y)²</div>
          <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 8 }}>오차의 제곱</div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "20px 30px",
            borderRadius: 12,
            textAlign: "center",
            opacity: step3Opacity,
          }}
        >
          <div style={{ color: "#60a5fa", fontSize: 32, fontWeight: "bold" }}>1/n Σ</div>
          <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 8 }}>평균</div>
        </div>
      </div>

      {/* 왜 제곱하는가? */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 60,
          right: 60,
        }}
      >
        <h3
          style={{
            color: "#fbbf24",
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 20,
            opacity: reason1Opacity,
          }}
        >
          왜 제곱을 할까요?
        </h3>

        <div style={{ display: "flex", gap: 40 }}>
          <div
            style={{
              flex: 1,
              backgroundColor: colors.gray[800],
              padding: "25px 30px",
              borderRadius: 16,
              opacity: reason1Opacity,
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
              ① 방향 제거
            </div>
            <div style={{ color: colors.gray[300], fontSize: 20 }}>
              +1 오차와 -1 오차가<br />상쇄되면 안 됨!
            </div>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: colors.gray[800],
              padding: "25px 30px",
              borderRadius: 16,
              opacity: reason2Opacity,
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
              ② 큰 오차에 패널티
            </div>
            <div style={{ color: colors.gray[300], fontSize: 20 }}>
              오차 2배 → 손실 4배!<br />큰 오차를 더 심하게 처벌
            </div>
          </div>
        </div>
      </div>

      {/* 사용 예시 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: usageOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#60a5fa20",
            border: "2px solid #60a5fa",
            padding: "15px 40px",
            borderRadius: 12,
          }}
        >
          <span style={{ color: "#60a5fa", fontSize: 28, fontWeight: "bold" }}>
            📊 회귀 문제에 사용: 집값 예측, 온도 예측, 주가 예측
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
