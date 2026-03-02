/**
 * Lesson 0-5: NumPy 기초 - Scene 2: 텐서란 무엇인가
 * 스칼라, 벡터, 행렬, 3D 텐서 설명
 */

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L05_Scene2_Tensor: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const scalarOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const vectorOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const matrixOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const tensor3dOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        padding: 60,
      }}
    >
      {/* 제목 */}
      <h2
        style={{
          fontSize: 56,
          color: colors.white,
          marginBottom: 40,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        📐 텐서(Tensor)란? - 다차원 배열
      </h2>

      {/* 4개의 텐서 유형 그리드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          flex: 1,
        }}
      >
        {/* 0차원: 스칼라 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #22c55e",
            opacity: scalarOpacity,
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            0차원 - 스칼라 (Scalar)
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <div
              style={{
                width: 80,
                height: 80,
                backgroundColor: "#22c55e40",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                fontWeight: "bold",
                color: "#22c55e",
              }}
            >
              5
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: colors.gray[300], fontSize: 22, marginBottom: 8 }}>
                숫자 하나
              </div>
              <div style={{ color: colors.gray[400], fontSize: 18 }}>
                shape: () - 차원 없음
              </div>
            </div>
          </div>
        </div>

        {/* 1차원: 벡터 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #3b82f6",
            opacity: vectorOpacity,
          }}
        >
          <div style={{ color: "#3b82f6", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            1차원 - 벡터 (Vector)
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#3b82f640",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#3b82f6",
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: colors.gray[300], fontSize: 20 }}>shape: (5,)</div>
            </div>
          </div>
        </div>

        {/* 2차원: 행렬 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #f97316",
            opacity: matrixOpacity,
          }}
        >
          <div style={{ color: "#f97316", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            2차원 - 행렬 (Matrix)
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[[1, 2, 3], [4, 5, 6], [7, 8, 9]].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 5 }}>
                  {row.map((n, j) => (
                    <div
                      key={j}
                      style={{
                        width: 45,
                        height: 45,
                        backgroundColor: "#f9731640",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        fontWeight: "bold",
                        color: "#f97316",
                      }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: colors.gray[300], fontSize: 20 }}>shape: (3, 3)</div>
              <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 5 }}>
                3행 × 3열
              </div>
            </div>
          </div>
        </div>

        {/* 3차원: 이미지 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #8b5cf6",
            opacity: tensor3dOpacity,
          }}
        >
          <div style={{ color: "#8b5cf6", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            3차원 - 컬러 이미지
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
            {/* RGB 레이어 시각화 */}
            <div style={{ position: "relative", width: 130, height: 110 }}>
              {[
                { color: "#ef4444", label: "R", offset: 0 },
                { color: "#22c55e", label: "G", offset: 20 },
                { color: "#3b82f6", label: "B", offset: 40 },
              ].map((layer, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: layer.offset,
                    top: layer.offset,
                    width: 80,
                    height: 60,
                    backgroundColor: `${layer.color}40`,
                    border: `2px solid ${layer.color}`,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    color: layer.color,
                  }}
                >
                  {layer.label}
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: colors.gray[300], fontSize: 20 }}>shape: (3, H, W)</div>
              <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 5 }}>
                채널 × 높이 × 너비
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
