/**
 * Scene 2: 손실 함수가 왜 필요한가
 * 학습의 목표와 손실 개념 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_WhyLossFunction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 집값 예측 예시 애니메이션
  const exampleOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const actualOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const predictOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const errorOpacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });

  // 손실 개념
  const lossConceptOpacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });
  const goalOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });

  // 애니메이션 효과
  const houseScale = spring({ frame: frame - 60, fps, from: 0, to: 1, durationInFrames: 30 });
  const arrowProgress = interpolate(frame, [270, 320], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[900],
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-1/scene2.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        왜 손실 함수가 필요한가?
      </h1>

      {/* 집값 예측 예시 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 100,
          marginTop: 40,
          opacity: exampleOpacity,
        }}
      >
        {/* 집 아이콘 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${Math.max(0, houseScale)})`,
          }}
        >
          <div style={{ fontSize: 120 }}>🏠</div>
          <div style={{ color: colors.gray[400], fontSize: 24, marginTop: 10 }}>
            집값 예측 모델
          </div>
        </div>

        {/* 예측 vs 실제 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {/* 실제 값 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "20px 40px",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: actualOpacity,
              border: "2px solid #22c55e",
            }}
          >
            <span style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold" }}>실제:</span>
            <span style={{ color: colors.white, fontSize: 36, fontWeight: "bold" }}>5억</span>
          </div>

          {/* 예측 값 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "20px 40px",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: predictOpacity,
              border: "2px solid #f87171",
            }}
          >
            <span style={{ color: "#f87171", fontSize: 28, fontWeight: "bold" }}>예측:</span>
            <span style={{ color: colors.white, fontSize: 36, fontWeight: "bold" }}>4억</span>
          </div>

          {/* 오차 */}
          <div
            style={{
              backgroundColor: "#fbbf2420",
              padding: "20px 40px",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: errorOpacity,
              border: "2px solid #fbbf24",
            }}
          >
            <span style={{ color: "#fbbf24", fontSize: 28, fontWeight: "bold" }}>오차:</span>
            <span style={{ color: "#fbbf24", fontSize: 36, fontWeight: "bold" }}>1억</span>
          </div>
        </div>
      </div>

      {/* 화살표와 Loss */}
      <div
        style={{
          position: "absolute",
          right: 250,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: arrowProgress,
        }}
      >
        <div style={{ fontSize: 80 }}>→</div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 100,
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "center",
          opacity: arrowProgress,
        }}
      >
        <div
          style={{
            backgroundColor: colors.level[3],
            color: colors.white,
            padding: "30px 40px",
            borderRadius: 20,
            fontSize: 42,
            fontWeight: "bold",
          }}
        >
          Loss
        </div>
        <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 15 }}>
          손실
        </div>
      </div>

      {/* 손실 개념 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: lossConceptOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "25px 35px",
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold" }}>손실 작음</div>
          <div style={{ color: colors.gray[300], fontSize: 20, marginTop: 8 }}>= 잘 예측함 ✓</div>
        </div>
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "25px 35px",
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          <div style={{ color: "#f87171", fontSize: 24, fontWeight: "bold" }}>손실 큼</div>
          <div style={{ color: colors.gray[300], fontSize: 20, marginTop: 8 }}>= 많이 틀림 ✗</div>
        </div>
      </div>

      {/* 학습 목표 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: goalOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#22c55e20",
            border: "2px solid #22c55e",
            padding: "15px 40px",
            borderRadius: 12,
          }}
        >
          <span style={{ color: "#22c55e", fontSize: 32, fontWeight: "bold" }}>
            학습의 목표 = 손실을 최소화하는 것!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
