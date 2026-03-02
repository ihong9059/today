/**
 * Scene 2: 순전파 전체 흐름
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_Overview: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 단계별 강조
  const step1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const step2Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const step3Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const step4Opacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });

  // 데이터 흐름 애니메이션
  const flowProgress = interpolate(frame, [60, 400], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-4/scene2.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        순전파 전체 흐름
      </h1>

      {/* 신경망 시각화 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          marginBottom: 30,
        }}
      >
        {/* 입력층 */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              backgroundColor: "#22c55e",
              width: 70,
              height: 70,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: step1Opacity > 0.5 ? "4px solid #fff" : "none",
            }}
          >
            <span style={{ color: colors.white, fontSize: 24, fontWeight: "bold" }}>x</span>
          </div>
          <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 8 }}>입력</div>
        </div>

        <svg width="80" height="40">
          <line x1="0" y1="20" x2={80 * Math.min(flowProgress * 4, 1)} y2="20" stroke="#60a5fa" strokeWidth={3} />
        </svg>

        {/* 레이어 1 */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              backgroundColor: colors.gray[700],
              padding: "15px 20px",
              borderRadius: 12,
              border: step2Opacity > 0.5 ? "3px solid #60a5fa" : "none",
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 18 }}>W₁x + b₁</div>
            <div style={{ color: "#fbbf24", fontSize: 16, marginTop: 5 }}>σ(·)</div>
          </div>
          <div style={{ color: colors.gray[400], fontSize: 14, marginTop: 8 }}>레이어 1</div>
        </div>

        <svg width="60" height="40">
          <line x1="0" y1="20" x2={60 * Math.min(flowProgress * 4 - 1, 1)} y2="20" stroke="#60a5fa" strokeWidth={3} />
        </svg>

        {/* 은닉층 */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              backgroundColor: "#fbbf24",
              width: 70,
              height: 70,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: step3Opacity > 0.5 ? "4px solid #fff" : "none",
            }}
          >
            <span style={{ color: colors.gray[900], fontSize: 24, fontWeight: "bold" }}>h</span>
          </div>
          <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 8 }}>은닉층</div>
        </div>

        <svg width="60" height="40">
          <line x1="0" y1="20" x2={60 * Math.min(flowProgress * 4 - 2, 1)} y2="20" stroke="#60a5fa" strokeWidth={3} />
        </svg>

        {/* 레이어 2 */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              backgroundColor: colors.gray[700],
              padding: "15px 20px",
              borderRadius: 12,
              border: step4Opacity > 0.5 ? "3px solid #a855f7" : "none",
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 18 }}>W₂h + b₂</div>
            <div style={{ color: "#fbbf24", fontSize: 16, marginTop: 5 }}>σ(·)</div>
          </div>
          <div style={{ color: colors.gray[400], fontSize: 14, marginTop: 8 }}>레이어 2</div>
        </div>

        <svg width="60" height="40">
          <line x1="0" y1="20" x2={60 * Math.min(flowProgress * 4 - 3, 1)} y2="20" stroke="#60a5fa" strokeWidth={3} />
        </svg>

        {/* 출력층 */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              backgroundColor: "#a855f7",
              width: 70,
              height: 70,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: step4Opacity > 0.5 ? "4px solid #fff" : "none",
            }}
          >
            <span style={{ color: colors.white, fontSize: 24, fontWeight: "bold" }}>ŷ</span>
          </div>
          <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 8 }}>출력</div>
        </div>
      </div>

      {/* 단계별 설명 */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 30,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "15px 25px",
            borderRadius: 12,
            borderLeft: "4px solid #22c55e",
            opacity: step1Opacity,
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 18, fontWeight: "bold" }}>① 입력</div>
          <div style={{ color: colors.gray[300], fontSize: 16 }}>x 데이터 입력</div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "15px 25px",
            borderRadius: 12,
            borderLeft: "4px solid #60a5fa",
            opacity: step2Opacity,
          }}
        >
          <div style={{ color: "#60a5fa", fontSize: 18, fontWeight: "bold" }}>② 선형변환</div>
          <div style={{ color: colors.gray[300], fontSize: 16 }}>Wx + b</div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "15px 25px",
            borderRadius: 12,
            borderLeft: "4px solid #fbbf24",
            opacity: step3Opacity,
          }}
        >
          <div style={{ color: "#fbbf24", fontSize: 18, fontWeight: "bold" }}>③ 활성화</div>
          <div style={{ color: colors.gray[300], fontSize: 16 }}>σ(z) → h</div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "15px 25px",
            borderRadius: 12,
            borderLeft: "4px solid #a855f7",
            opacity: step4Opacity,
          }}
        >
          <div style={{ color: "#a855f7", fontSize: 18, fontWeight: "bold" }}>④ 반복</div>
          <div style={{ color: colors.gray[300], fontSize: 16 }}>출력층까지</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
