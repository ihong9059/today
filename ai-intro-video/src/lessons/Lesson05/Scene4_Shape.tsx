/**
 * Lesson 0-5: NumPy 기초 - Scene 4: Shape과 Reshape
 * 배열의 형태와 변환
 */

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L05_Scene4_Shape: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const shapeExplainOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const example1Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const example2Opacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const reshapeOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });
  const minusOneOpacity = interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        padding: 50,
      }}
    >
      {/* 제목 */}
      <h2
        style={{
          fontSize: 48,
          color: colors.white,
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        📏 Shape - 배열의 형태
      </h2>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: Shape 설명 */}
        <div style={{ flex: 1 }}>
          {/* Shape 개념 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              opacity: shapeExplainOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
              Shape = 각 차원의 크기
            </div>
            <div style={{ color: colors.gray[300], fontSize: 20 }}>
              튜플(tuple) 형태로 표현됩니다
            </div>
          </div>

          {/* 예시 1: (3,) */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 15,
              border: "2px solid #3b82f6",
              opacity: example1Opacity,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ display: "flex", gap: 8 }}>
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: 45,
                      height: 45,
                      backgroundColor: "#3b82f640",
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      fontWeight: "bold",
                      color: "#3b82f6",
                    }}
                  >
                    {n}
                  </div>
                ))}
              </div>
              <div style={{ color: colors.gray[300], fontSize: 20 }}>
                → shape: <span style={{ color: "#3b82f6", fontWeight: "bold" }}>(3,)</span>
              </div>
            </div>
          </div>

          {/* 예시 2: (2,3) */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 15,
              border: "2px solid #f97316",
              opacity: example2Opacity,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {[[1, 2, 3], [4, 5, 6]].map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: 5 }}>
                    {row.map((n, j) => (
                      <div
                        key={j}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#f9731640",
                          borderRadius: 6,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
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
              <div style={{ color: colors.gray[300], fontSize: 20 }}>
                → shape: <span style={{ color: "#f97316", fontWeight: "bold" }}>(2, 3)</span>
                <br />
                <span style={{ fontSize: 16, color: colors.gray[400] }}>2행 × 3열</span>
              </div>
            </div>
          </div>

          {/* 이미지 배치 예시 */}
          <div
            style={{
              backgroundColor: "#8b5cf620",
              border: "2px solid #8b5cf6",
              borderRadius: 12,
              padding: 20,
              opacity: example2Opacity,
            }}
          >
            <div style={{ color: "#8b5cf6", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              📷 이미지 배치 예시
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18 }}>
              shape: (4, 28, 28)<br />
              = 28×28 이미지 <span style={{ color: "#8b5cf6" }}>4장</span>
            </div>
          </div>
        </div>

        {/* 오른쪽: Reshape */}
        <div style={{ flex: 1 }}>
          {/* Reshape 설명 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              border: "2px solid #22c55e",
              opacity: reshapeOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
              🔄 Reshape - 형태 변환
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300], marginBottom: 15 }}>
              arr = np.arange(<span style={{ color: "#f97316" }}>1, 13</span>)
              <span style={{ color: colors.gray[500] }}> # 1~12</span>
            </div>

            {/* 1D -> 2D */}
            <div style={{ marginBottom: 15 }}>
              <div style={{ color: colors.gray[400], fontSize: 16, marginBottom: 5 }}>
                (12,) → (3, 4)
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300] }}>
                arr.reshape(<span style={{ color: "#22c55e" }}>3, 4</span>)
              </div>
            </div>

            {/* 1D -> 3D */}
            <div>
              <div style={{ color: colors.gray[400], fontSize: 16, marginBottom: 5 }}>
                (12,) → (2, 2, 3)
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300] }}>
                arr.reshape(<span style={{ color: "#22c55e" }}>2, 2, 3</span>)
              </div>
            </div>
          </div>

          {/* -1 사용법 */}
          <div
            style={{
              backgroundColor: "#ec489920",
              border: "2px solid #ec4899",
              borderRadius: 12,
              padding: 20,
              opacity: minusOneOpacity,
            }}
          >
            <div style={{ color: "#ec4899", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
              💡 -1: 자동 계산
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 20, color: colors.gray[300], marginBottom: 15 }}>
              arr.reshape(<span style={{ color: "#ec4899" }}>3, -1</span>)
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18 }}>
              12 ÷ 3 = <span style={{ color: "#ec4899", fontWeight: "bold" }}>4</span>
              <br />
              → shape: (3, 4) 자동 계산!
            </div>
          </div>

          {/* AI 활용 */}
          <div
            style={{
              backgroundColor: "#f9731620",
              border: "2px solid #f97316",
              borderRadius: 12,
              padding: 20,
              marginTop: 20,
              opacity: minusOneOpacity,
            }}
          >
            <div style={{ color: "#f97316", fontSize: 18, fontWeight: "bold" }}>
              🤖 AI에서 필수!
            </div>
            <div style={{ color: colors.gray[300], fontSize: 16, marginTop: 8 }}>
              모델 입력에 맞게<br />
              데이터 형태를 조정
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
