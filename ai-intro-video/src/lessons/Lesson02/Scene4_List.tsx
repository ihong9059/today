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

export const L02_Scene4_List: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 62초)
  // 0-15초: 리스트 기본 설명
  // 15-35초: 벡터 사례
  // 35-50초: RGB 픽셀 예시
  // 50-62초: 2차원 배열 예고

  const phase2Start = 15 * FPS;
  const phase3Start = 35 * FPS;
  const phase4Start = 50 * FPS;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1e1e3f 100%)`,
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
        <span style={{ fontSize: 48 }}>📋</span>
        <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>리스트 (List)</span>
        <span
          style={{
            marginLeft: 20,
            backgroundColor: "#fbbf24",
            padding: "8px 20px",
            borderRadius: 20,
            fontSize: 18,
            fontWeight: "bold",
            color: colors.gray[900],
          }}
        >
          가장 많이 사용!
        </span>
      </div>

      {/* Phase 1: 기본 설명 */}
      <div
        style={{
          transform: `scale(${spring({
            frame: frame - 30,
            fps: FPS,
            config: { damping: 12, stiffness: 100 },
          })})`,
          backgroundColor: colors.gray[800],
          padding: "30px 50px",
          borderRadius: 20,
          border: `3px solid #3b82f6`,
          marginTop: 20,
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 36,
            color: "#4ade80",
          }}
        >
          numbers = [1, 2, 3, 4, 5]
        </div>
      </div>

      {/* Phase 2: 벡터 사례 */}
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
            display: "flex",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "30px 40px",
              borderRadius: 20,
              border: `3px solid #a78bfa`,
            }}
          >
            <div style={{ fontSize: 22, color: "#a78bfa", fontWeight: "bold", marginBottom: 15 }}>
              3차원 좌표 (벡터)
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 28,
                color: "#fbbf24",
                backgroundColor: colors.gray[900],
                padding: "15px 25px",
                borderRadius: 12,
              }}
            >
              position = [3.0, 4.5, 2.1]
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 15 }}>
              {["x", "y", "z"].map((axis, idx) => (
                <span
                  key={idx}
                  style={{
                    opacity: interpolate(
                      frame,
                      [phase2Start + 50 + idx * 15, phase2Start + 65 + idx * 15],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    ),
                    backgroundColor: "#a78bfa30",
                    padding: "8px 20px",
                    borderRadius: 8,
                    fontSize: 20,
                    color: "#a78bfa",
                    fontWeight: "bold",
                  }}
                >
                  {axis}
                </span>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 48, color: colors.gray[500] }}>=</div>

          <div
            style={{
              opacity: interpolate(
                frame,
                [phase2Start + 80, phase2Start + 110],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 80,
            }}
          >
            📐
          </div>
        </div>
      )}

      {/* Phase 3: RGB 픽셀 */}
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
              padding: "30px 40px",
              borderRadius: 20,
              border: `3px solid #ef4444`,
            }}
          >
            <div style={{ fontSize: 22, color: "#ef4444", fontWeight: "bold", marginBottom: 15 }}>
              빨간색 픽셀 (RGB)
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 28,
                color: "#ef4444",
                backgroundColor: colors.gray[900],
                padding: "15px 25px",
                borderRadius: 12,
              }}
            >
              pixel = [255, 0, 0]
            </div>
            <div style={{ display: "flex", gap: 15, marginTop: 15, justifyContent: "center" }}>
              {[
                { label: "R", color: "#ef4444" },
                { label: "G", color: "#22c55e" },
                { label: "B", color: "#3b82f6" },
              ].map((item, idx) => (
                <span
                  key={idx}
                  style={{
                    opacity: interpolate(
                      frame,
                      [phase3Start + 50 + idx * 15, phase3Start + 65 + idx * 15],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    ),
                    backgroundColor: `${item.color}30`,
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontSize: 18,
                    color: item.color,
                    fontWeight: "bold",
                  }}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 48, color: colors.gray[500] }}>=</div>

          <div
            style={{
              opacity: interpolate(
                frame,
                [phase3Start + 80, phase3Start + 110],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              width: 100,
              height: 100,
              backgroundColor: "#ef4444",
              borderRadius: 16,
              boxShadow: "0 0 30px #ef444480",
            }}
          />
        </div>
      )}

      {/* Phase 4: 2차원 배열 예고 */}
      {frame >= phase4Start && (
        <div
          style={{
            opacity: interpolate(
              frame,
              [phase4Start, phase4Start + 30],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            marginTop: 40,
            backgroundColor: `${colors.primary}20`,
            padding: "20px 40px",
            borderRadius: 16,
            border: `2px solid ${colors.primary}`,
          }}
        >
          <p style={{ fontSize: 24, color: colors.white, margin: 0 }}>
            <span style={{ color: colors.primary }}>리스트 안에 리스트</span> = 2차원 배열 (행렬)
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
