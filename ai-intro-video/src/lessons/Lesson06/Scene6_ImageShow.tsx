/**
 * Lesson 0-6: Matplotlib 기초 - Scene 6: 이미지 시각화
 * plt.imshow, cmap, MNIST 예시
 */

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L06_Scene6_ImageShow: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const imshowOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const cmapOpacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });
  const mnistOpacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });
  const gridOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });

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
        🖼️ 이미지 시각화 (imshow)
      </h2>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 코드 */}
        <div style={{ flex: 1 }}>
          {/* imshow 기본 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              border: "2px solid #3b82f6",
              opacity: imshowOpacity,
            }}
          >
            <div style={{ color: "#3b82f6", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              ▸ 이미지 표시하기
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 20, color: colors.gray[300], lineHeight: 1.6 }}>
              plt.imshow(image)<br />
              plt.show()
            </div>
          </div>

          {/* cmap 설명 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              border: "2px solid #8b5cf6",
              opacity: cmapOpacity,
            }}
          >
            <div style={{ color: "#8b5cf6", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              ▸ 흑백 이미지: cmap 설정
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 20, color: colors.gray[300], lineHeight: 1.6 }}>
              plt.imshow(image, <span style={{ color: "#8b5cf6" }}>cmap='gray'</span>)
            </div>
            <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 10 }}>
              cmap = colormap (색상 맵)
            </div>
          </div>

          {/* 축 숨기기 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              border: "2px solid #22c55e",
              opacity: gridOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              ▸ 축 숨기기
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 20, color: colors.gray[300] }}>
              plt.axis(<span style={{ color: "#22c55e" }}>'off'</span>)
            </div>
          </div>
        </div>

        {/* 오른쪽: MNIST 예시 */}
        <div style={{ flex: 1 }}>
          {/* 단일 이미지 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              marginBottom: 20,
              opacity: mnistOpacity,
            }}
          >
            <div style={{ color: "#f97316", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
              MNIST 손글씨 숫자
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
              {/* 이미지 */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  backgroundColor: colors.gray[900],
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 72,
                  fontWeight: "bold",
                  color: colors.gray[300],
                  fontFamily: "monospace",
                }}
              >
                5
              </div>
              <div style={{ color: colors.gray[300], fontSize: 18 }}>
                28 × 28 픽셀<br />
                <span style={{ color: "#f97316" }}>shape: (28, 28)</span>
              </div>
            </div>
          </div>

          {/* 격자 이미지 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              opacity: gridOpacity,
            }}
          >
            <div style={{ color: "#3b82f6", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
              여러 이미지 격자 표시
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div
                  key={n}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: colors.gray[900],
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: colors.gray[400],
                    fontFamily: "monospace",
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
            <div style={{ color: colors.gray[400], fontSize: 14, marginTop: 10 }}>
              subplot으로 3×3 격자
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
