import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L02_Scene6_AIUsage: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 71초)
  // 0-35초: 행렬 설명
  // 35-55초: NumPy 언급
  // 55-71초: 이미지 데이터 구조

  const phase2Start = 35 * FPS;
  const phase3Start = 55 * FPS;

  // 3x3 행렬 데이터
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #2d1b4e 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 60,
        paddingTop: 100,
        overflow: "hidden",
      }}
    >
      {/* 섹션 제목 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          display: "flex",
          alignItems: "center",
          gap: 15,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 48 }}>🧠</span>
        <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>AI에서의 실제 활용</span>
      </div>

      <div style={{ display: "flex", gap: 60, marginTop: 30, alignItems: "flex-start" }}>
        {/* 행렬 코드 */}
        <div
          style={{
            transform: `scale(${spring({
              frame: frame - 30,
              fps: FPS,
              config: { damping: 12, stiffness: 100 },
            })})`,
            backgroundColor: colors.gray[800],
            padding: "30px 40px",
            borderRadius: 20,
            border: `3px solid #a78bfa`,
          }}
        >
          <div style={{ fontSize: 24, color: "#a78bfa", fontWeight: "bold", marginBottom: 20 }}>
            2차원 행렬 (3×3)
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 22,
              color: "#fbbf24",
              backgroundColor: colors.gray[900],
              padding: "20px 25px",
              borderRadius: 12,
              lineHeight: 1.8,
            }}
          >
            matrix = [<br />
            &nbsp;&nbsp;[1, 2, 3],<br />
            &nbsp;&nbsp;[4, 5, 6],<br />
            &nbsp;&nbsp;[7, 8, 9]<br />
            ]
          </div>
        </div>

        {/* 행렬 시각화 */}
        <div
          style={{
            opacity: interpolate(
              frame,
              [60, 90],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 15, textAlign: "center" }}>
            시각화
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 16,
              border: `2px solid #a78bfa`,
            }}
          >
            {matrix.flat().map((num, idx) => (
              <div
                key={idx}
                style={{
                  opacity: interpolate(
                    frame,
                    [90 + idx * 10, 100 + idx * 10],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  width: 60,
                  height: 60,
                  backgroundColor: `hsl(${260 + num * 10}, 70%, ${30 + num * 5}%)`,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: "bold",
                  color: colors.white,
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phase 2: NumPy */}
      {frame >= phase2Start && (
        <div
          style={{
            opacity: interpolate(
              frame,
              [phase2Start, phase2Start + 30],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            marginTop: 40,
            backgroundColor: `${colors.primary}20`,
            padding: "25px 40px",
            borderRadius: 16,
            border: `2px solid ${colors.primary}`,
            display: "flex",
            alignItems: "center",
            gap: 30,
          }}
        >
          <span style={{ fontSize: 48 }}>📊</span>
          <div>
            <div style={{ fontSize: 24, color: colors.primary, fontWeight: "bold", marginBottom: 8 }}>
              NumPy 배열로 변환
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 22,
                color: "#4ade80",
              }}
            >
              np.array(matrix) → 효율적인 행렬 연산
            </div>
          </div>
        </div>
      )}

      {/* Phase 3: 이미지 데이터 */}
      {frame >= phase3Start && (
        <div
          style={{
            opacity: interpolate(
              frame,
              [phase3Start, phase3Start + 30],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            marginTop: 40,
            display: "flex",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "25px 35px",
              borderRadius: 16,
              border: `2px solid #f472b6`,
            }}
          >
            <div style={{ fontSize: 20, color: "#f472b6", fontWeight: "bold", marginBottom: 15 }}>
              이미지 = 다차원 배열
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div
                style={{
                  backgroundColor: colors.gray[900],
                  padding: "15px 20px",
                  borderRadius: 10,
                }}
              >
                <div style={{ fontSize: 16, color: colors.gray[400], marginBottom: 5 }}>흑백</div>
                <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.white }}>
                  128 × 128
                </div>
              </div>
              <div
                style={{
                  opacity: interpolate(
                    frame,
                    [phase3Start + 40, phase3Start + 60],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  backgroundColor: colors.gray[900],
                  padding: "15px 20px",
                  borderRadius: 10,
                }}
              >
                <div style={{ fontSize: 16, color: colors.gray[400], marginBottom: 5 }}>컬러</div>
                <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.white }}>
                  128 × 128 × 3
                </div>
              </div>
            </div>
          </div>

          {/* 이미지 시각화 */}
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase3Start + 60, phase3Start + 90],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              display: "flex",
              gap: 15,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                background: "linear-gradient(45deg, #333 25%, #666 25%, #666 50%, #333 50%, #333 75%, #666 75%)",
                backgroundSize: "20px 20px",
                borderRadius: 8,
                border: "2px solid #666",
              }}
            />
            <div
              style={{
                width: 80,
                height: 80,
                background: "linear-gradient(135deg, #ef4444, #fbbf24, #22c55e, #3b82f6)",
                borderRadius: 8,
                border: "2px solid #a78bfa",
              }}
            />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
