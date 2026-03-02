/**
 * Scene 4: Tanh 함수
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_Tanh: React.FC = () => {
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
      <Audio src={staticFile("audio/lesson-3-7/scene4.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: "#fbbf24",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        Tanh 함수
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
              <span style={{ color: colors.white, fontSize: 32, fontFamily: "serif" }}>
                tanh(x) = (eˣ - e⁻ˣ) / (eˣ + e⁻ˣ)
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
              <text x="45" y="180" fill={colors.gray[400]} fontSize="12">-1</text>

              {/* Tanh 곡선 */}
              <path
                d="M 50 175 Q 100 170, 140 160 Q 180 130, 200 100 Q 220 70, 260 40 Q 300 30, 350 25"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="4"
              />

              {/* 점선 (y=0) */}
              <line x1="50" y1="100" x2="350" y2="100" stroke={colors.gray[500]} strokeWidth="1" strokeDasharray="5,5" />
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
              장점 (vs Sigmoid)
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>
              • 출력이 -1 ~ 1 (0 중심!)
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>
              • 학습이 더 안정적
            </div>
            <div style={{ color: colors.white, fontSize: 20 }}>
              • 시그모이드보다 기울기 더 큼
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
              여전한 단점
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>
              • 양 끝에서 기울기 소실!
            </div>
            <div style={{ color: colors.gray[400], fontSize: 18 }}>
              깊은 네트워크에서 문제 발생
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
