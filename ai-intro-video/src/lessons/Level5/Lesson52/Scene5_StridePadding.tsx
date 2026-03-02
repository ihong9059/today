/**
 * Scene 5: 스트라이드와 패딩
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_StridePadding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c3aed 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-2/scene5.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        스트라이드 & 패딩
      </h1>

      <div style={{ display: "flex", gap: 80 }}>
        {/* 스트라이드 설명 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 40,
            borderRadius: 20,
            border: "3px solid #3b82f6",
            opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [60, 90], [30, 0], { extrapolateRight: "clamp" })}px)`,
            width: 400,
          }}
        >
          <h2 style={{ fontSize: 36, color: "#3b82f6", marginBottom: 20 }}>Stride (스트라이드)</h2>
          <p style={{ fontSize: 22, color: colors.gray[300], lineHeight: 1.6 }}>
            커널이 한 번에 이동하는 칸 수
          </p>

          <div style={{ display: "flex", gap: 30, marginTop: 30, justifyContent: "center" }}>
            {/* Stride 1 */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: colors.gray[400], marginBottom: 10 }}>Stride = 1</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 30px)", gap: 3 }}>
                {Array(16).fill(0).map((_, i) => {
                  const row = Math.floor(i / 4);
                  const col = i % 4;
                  const highlight = (frame > 120) && (row < 2 && col < 2);
                  return (
                    <div
                      key={i}
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: highlight ? "#3b82f6" : colors.gray[700],
                        borderRadius: 4,
                      }}
                    />
                  );
                })}
              </div>
              <div style={{ fontSize: 16, color: "#22c55e", marginTop: 10 }}>출력: 3×3</div>
            </div>

            {/* Stride 2 */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: colors.gray[400], marginBottom: 10 }}>Stride = 2</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 30px)", gap: 3 }}>
                {Array(16).fill(0).map((_, i) => {
                  const row = Math.floor(i / 4);
                  const col = i % 4;
                  const highlight = (frame > 180) && ((row === 0 || row === 2) && (col === 0 || col === 2));
                  return (
                    <div
                      key={i}
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: highlight ? "#3b82f6" : colors.gray[700],
                        borderRadius: 4,
                      }}
                    />
                  );
                })}
              </div>
              <div style={{ fontSize: 16, color: "#f59e0b", marginTop: 10 }}>출력: 2×2</div>
            </div>
          </div>
        </div>

        {/* 패딩 설명 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: 40,
            borderRadius: 20,
            border: "3px solid #22c55e",
            opacity: interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [250, 280], [30, 0], { extrapolateRight: "clamp" })}px)`,
            width: 400,
          }}
        >
          <h2 style={{ fontSize: 36, color: "#22c55e", marginBottom: 20 }}>Padding (패딩)</h2>
          <p style={{ fontSize: 22, color: colors.gray[300], lineHeight: 1.6 }}>
            이미지 테두리에 값을 추가
          </p>

          <div style={{ display: "flex", gap: 30, marginTop: 30, justifyContent: "center" }}>
            {/* No Padding */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: colors.gray[400], marginBottom: 10 }}>패딩 없음</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 30px)", gap: 3 }}>
                {Array(9).fill(0).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: colors.gray[600],
                      borderRadius: 4,
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 16, color: "#ef4444", marginTop: 10 }}>3×3 → 1×1</div>
            </div>

            {/* With Padding */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: colors.gray[400], marginBottom: 10 }}>패딩=1 (Zero)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 24px)", gap: 2 }}>
                {Array(25).fill(0).map((_, i) => {
                  const row = Math.floor(i / 5);
                  const col = i % 5;
                  const isPadding = row === 0 || row === 4 || col === 0 || col === 4;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: isPadding ? "#22c55e33" : colors.gray[600],
                        borderRadius: 3,
                        border: isPadding ? "1px solid #22c55e" : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        color: "#22c55e",
                      }}
                    >
                      {isPadding ? "0" : ""}
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: 16, color: "#22c55e", marginTop: 10 }}>3×3 → 3×3</div>
            </div>
          </div>
        </div>
      </div>

      {/* 핵심 요약 */}
      <div
        style={{
          marginTop: 50,
          display: "flex",
          gap: 40,
          opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ backgroundColor: "#3b82f622", padding: "15px 30px", borderRadius: 12, border: "2px solid #3b82f6" }}>
          <span style={{ fontSize: 22, color: colors.white }}>스트라이드 ↑ = 출력 크기 ↓</span>
        </div>
        <div style={{ backgroundColor: "#22c55e22", padding: "15px 30px", borderRadius: 12, border: "2px solid #22c55e" }}>
          <span style={{ fontSize: 22, color: colors.white }}>패딩 사용 = 크기 유지</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
