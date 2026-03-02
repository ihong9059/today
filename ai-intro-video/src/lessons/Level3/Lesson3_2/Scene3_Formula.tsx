/**
 * Scene 3: 경사하강법 공식
 * 핵심 업데이트 공식 설명
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Formula: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 공식 애니메이션
  const formulaOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const formulaScale = spring({ frame: frame - 60, fps, from: 0.8, to: 1, durationInFrames: 30 });

  // 각 요소 설명
  const wNewOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const wOldOpacity = interpolate(frame, [210, 240], [0, 1], { extrapolateRight: "clamp" });
  const etaOpacity = interpolate(frame, [270, 300], [0, 1], { extrapolateRight: "clamp" });
  const gradOpacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });

  // 마이너스 설명
  const minusOpacity = interpolate(frame, [430, 460], [0, 1], { extrapolateRight: "clamp" });

  // 예시
  const exampleOpacity = interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[900],
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-2/scene3.mp3")} />

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
        📐 핵심 공식
      </h1>

      {/* 메인 공식 */}
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
          <div style={{ fontSize: 56, color: colors.white, fontFamily: "serif", textAlign: "center" }}>
            <span style={{ color: "#22c55e" }}>w</span>
            <sub style={{ fontSize: 30 }}>new</sub>
            {" = "}
            <span style={{ color: "#f87171" }}>w</span>
            <sub style={{ fontSize: 30 }}>old</sub>
            {" - "}
            <span style={{ color: "#fbbf24" }}>η</span>
            {" · "}
            <span style={{ color: "#a855f7" }}>∂L/∂w</span>
          </div>
        </div>
      </div>

      {/* 요소 설명 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 25,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "18px 25px",
            borderRadius: 12,
            textAlign: "center",
            opacity: wNewOpacity,
            border: "2px solid #22c55e",
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold" }}>w<sub>new</sub></div>
          <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 6 }}>새 가중치</div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "18px 25px",
            borderRadius: 12,
            textAlign: "center",
            opacity: wOldOpacity,
            border: "2px solid #f87171",
          }}
        >
          <div style={{ color: "#f87171", fontSize: 28, fontWeight: "bold" }}>w<sub>old</sub></div>
          <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 6 }}>현재 가중치</div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "18px 25px",
            borderRadius: 12,
            textAlign: "center",
            opacity: etaOpacity,
            border: "2px solid #fbbf24",
          }}
        >
          <div style={{ color: "#fbbf24", fontSize: 28, fontWeight: "bold" }}>η</div>
          <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 6 }}>학습률</div>
          <div style={{ color: colors.gray[500], fontSize: 14 }}>Learning Rate</div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "18px 25px",
            borderRadius: 12,
            textAlign: "center",
            opacity: gradOpacity,
            border: "2px solid #a855f7",
          }}
        >
          <div style={{ color: "#a855f7", fontSize: 28, fontWeight: "bold" }}>∂L/∂w</div>
          <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 6 }}>기울기</div>
          <div style={{ color: colors.gray[500], fontSize: 14 }}>Gradient</div>
        </div>
      </div>

      {/* 마이너스 설명 */}
      <div
        style={{
          backgroundColor: "#f8717120",
          border: "2px solid #f87171",
          padding: "25px 40px",
          borderRadius: 16,
          marginBottom: 30,
          opacity: minusOpacity,
        }}
      >
        <div style={{ color: "#f87171", fontSize: 26, fontWeight: "bold", marginBottom: 12 }}>
          왜 마이너스(-)를 붙일까요?
        </div>
        <div style={{ color: colors.gray[300], fontSize: 22 }}>
          기울기의 <strong>반대 방향</strong>으로 가야 손실이 줄어들기 때문!
        </div>
        <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 10 }}>
          • 기울기 양수 → 가중치 감소 (왼쪽으로)<br />
          • 기울기 음수 → 가중치 증가 (오른쪽으로)
        </div>
      </div>

      {/* 결론 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: exampleOpacity,
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
          <span style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold" }}>
            이것이 경사하강법의 전부입니다! 🎉
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
