/**
 * Scene 5: ReLU 함수
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_ReLU: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const formulaOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const graphOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const prosOpacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });
  const consOpacity = interpolate(frame, [510, 540], [0, 1], { extrapolateRight: "clamp" });
  const variantsOpacity = interpolate(frame, [660, 690], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-7/scene5.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: "#22c55e",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        ReLU (Rectified Linear Unit)
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
              marginBottom: 15,
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
                ReLU(x) = max(0, x)
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
            <svg width="100%" height="180" viewBox="0 0 400 180">
              {/* 축 */}
              <line x1="50" y1="130" x2="350" y2="130" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="200" y1="20" x2="200" y2="160" stroke={colors.gray[600]} strokeWidth="2" />

              {/* 라벨 */}
              <text x="360" y="135" fill={colors.gray[400]} fontSize="14">x</text>
              <text x="205" y="15" fill={colors.gray[400]} fontSize="14">y</text>

              {/* ReLU 곡선 */}
              <line x1="50" y1="130" x2="200" y2="130" stroke="#22c55e" strokeWidth="4" />
              <line x1="200" y1="130" x2="350" y2="30" stroke="#22c55e" strokeWidth="4" />
            </svg>
          </div>

          {/* 변형 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 15,
              borderRadius: 12,
              marginTop: 15,
              opacity: variantsOpacity,
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 18, marginBottom: 10 }}>변형</div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ backgroundColor: "#60a5fa30", padding: "8px 15px", borderRadius: 8 }}>
                <span style={{ color: "#60a5fa", fontSize: 16 }}>Leaky ReLU</span>
              </div>
              <div style={{ backgroundColor: "#a855f730", padding: "8px 15px", borderRadius: 8 }}>
                <span style={{ color: "#a855f7", fontSize: 16 }}>ELU</span>
              </div>
              <div style={{ backgroundColor: "#fbbf2430", padding: "8px 15px", borderRadius: 8 }}>
                <span style={{ color: "#fbbf24", fontSize: 16 }}>PReLU</span>
              </div>
            </div>
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
              marginBottom: 15,
              opacity: prosOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
              장점
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>
              • 계산이 매우 빠름!
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>
              • 양수에서 기울기 = 1 (소실 없음)
            </div>
            <div style={{ color: colors.white, fontSize: 20 }}>
              • 현대 딥러닝의 기본!
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
              • 음수 입력 → 항상 0 출력
            </div>
            <div style={{ color: colors.gray[400], fontSize: 18 }}>
              "Dying ReLU" - 뉴런이 죽을 수 있음
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginTop: 10 }}>
              • Leaky ReLU로 해결 가능!
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
