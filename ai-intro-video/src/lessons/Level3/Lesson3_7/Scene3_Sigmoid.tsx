/**
 * Scene 3: 시그모이드 함수
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Sigmoid: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const formulaOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const graphOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const prosOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const consOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-7/scene3.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: "#f87171",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        Sigmoid 함수
      </h1>

      <div style={{ display: "flex", gap: 35 }}>
        {/* 왼쪽: 공식과 그래프 */}
        <div style={{ flex: 1 }}>
          {/* 공식 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              marginBottom: 20,
              opacity: formulaOpacity,
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 20, marginBottom: 10 }}>공식</div>
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 20,
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              <span style={{ color: colors.white, fontSize: 36, fontFamily: "serif" }}>
                σ(x) = 1 / (1 + e⁻ˣ)
              </span>
            </div>
          </div>

          {/* 그래프 (SVG) */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 16,
              opacity: graphOpacity,
            }}
          >
            <svg width="100%" height="200" viewBox="0 0 400 200">
              {/* 축 */}
              <line x1="50" y1="100" x2="350" y2="100" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="200" y1="20" x2="200" y2="180" stroke={colors.gray[600]} strokeWidth="2" />

              {/* 라벨 */}
              <text x="360" y="105" fill={colors.gray[400]} fontSize="14">x</text>
              <text x="205" y="15" fill={colors.gray[400]} fontSize="14">y</text>
              <text x="50" y="25" fill={colors.gray[400]} fontSize="12">1</text>
              <text x="50" y="175" fill={colors.gray[400]} fontSize="12">0</text>

              {/* 시그모이드 곡선 */}
              <path
                d="M 50 175 Q 100 175, 140 170 Q 180 160, 200 100 Q 220 40, 260 30 Q 300 25, 350 25"
                fill="none"
                stroke="#f87171"
                strokeWidth="4"
              />

              {/* 점선 (y=0.5) */}
              <line x1="50" y1="100" x2="350" y2="100" stroke={colors.gray[500]} strokeWidth="1" strokeDasharray="5,5" />
              <text x="30" y="105" fill={colors.gray[400]} fontSize="12">0.5</text>
            </svg>
          </div>
        </div>

        {/* 오른쪽: 특징 */}
        <div style={{ flex: 1 }}>
          {/* 장점 */}
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              padding: 20,
              borderRadius: 16,
              marginBottom: 20,
              opacity: prosOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
              장점
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>
              • 출력이 0~1 사이
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>
              • 확률 해석 가능
            </div>
            <div style={{ color: colors.white, fontSize: 20 }}>
              • 미분이 간단: σ'(x) = σ(x)(1-σ(x))
            </div>
          </div>

          {/* 단점 */}
          <div
            style={{
              backgroundColor: "#f8717120",
              border: "2px solid #f87171",
              padding: 20,
              borderRadius: 16,
              opacity: consOpacity,
            }}
          >
            <div style={{ color: "#f87171", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
              단점
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>
              • 기울기 소실 문제!
            </div>
            <div style={{ color: colors.gray[400], fontSize: 18 }}>
              x가 크거나 작으면 기울기 → 0
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginTop: 10 }}>
              • 출력이 0 중심 아님
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
