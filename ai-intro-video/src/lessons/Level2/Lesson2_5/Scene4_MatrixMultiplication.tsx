/**
 * Scene 4: 행렬 곱셈
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene4_MatrixMultiplication: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const multiplyAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const formulaAppear = spring({ frame: frame - 300, fps, config: { damping: 12 } });

  // 행렬 곱셈 애니메이션
  const highlightRow = Math.floor((frame - 100) / 60) % 2;
  const highlightCol = Math.floor((frame - 100) / 30) % 2;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-5/scene4.mp3")} />

      {/* 타이틀 */}
      <div style={{
        position: "absolute",
        top: 50,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: titleOpacity,
      }}>
        <h1 style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          margin: 0,
        }}>
          ✖️ 행렬 곱셈 - AI의 핵심 연산
        </h1>
      </div>

      {/* 행렬 곱셈 시각화 */}
      <div style={{
        position: "absolute",
        top: 160,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: multiplyAppear,
        display: "flex",
        alignItems: "center",
        gap: 30,
      }}>
        {/* 2x3 행렬 A */}
        <div style={{
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          border: "3px solid #3b82f6",
          borderRadius: 15,
          padding: "20px 25px",
        }}>
          <div style={{ color: "#93c5fd", fontSize: 20, marginBottom: 10, textAlign: "center" }}>A (2×3)</div>
          <div style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 32,
            color: colors.white,
          }}>
            <span style={{ fontSize: 60 }}>[</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{
                display: "flex",
                gap: 15,
                backgroundColor: highlightRow === 0 && frame > 100 ? "rgba(59, 130, 246, 0.4)" : "transparent",
                padding: "5px 10px",
                borderRadius: 5,
              }}>
                <span>1</span><span>2</span><span>3</span>
              </div>
              <div style={{
                display: "flex",
                gap: 15,
                backgroundColor: highlightRow === 1 && frame > 100 ? "rgba(59, 130, 246, 0.4)" : "transparent",
                padding: "5px 10px",
                borderRadius: 5,
              }}>
                <span>4</span><span>5</span><span>6</span>
              </div>
            </div>
            <span style={{ fontSize: 60 }}>]</span>
          </div>
        </div>

        <span style={{ fontSize: 50, color: "#a855f7" }}>×</span>

        {/* 3x2 행렬 B */}
        <div style={{
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          border: "3px solid #22c55e",
          borderRadius: 15,
          padding: "20px 25px",
        }}>
          <div style={{ color: "#86efac", fontSize: 20, marginBottom: 10, textAlign: "center" }}>B (3×2)</div>
          <div style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 32,
            color: colors.white,
          }}>
            <span style={{ fontSize: 60 }}>[</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[[1, 2], [3, 4], [5, 6]].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 15 }}>
                  {row.map((num, j) => (
                    <span key={j} style={{
                      backgroundColor: j === highlightCol && frame > 100 ? "rgba(34, 197, 94, 0.4)" : "transparent",
                      padding: "2px 8px",
                      borderRadius: 3,
                    }}>{num}</span>
                  ))}
                </div>
              ))}
            </div>
            <span style={{ fontSize: 60 }}>]</span>
          </div>
        </div>

        <span style={{ fontSize: 50, color: "#a855f7" }}>=</span>

        {/* 결과 2x2 행렬 C */}
        <div style={{
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          border: "3px solid #fbbf24",
          borderRadius: 15,
          padding: "20px 25px",
        }}>
          <div style={{ color: "#fde047", fontSize: 20, marginBottom: 10, textAlign: "center" }}>C (2×2)</div>
          <div style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 32,
            color: colors.white,
          }}>
            <span style={{ fontSize: 60 }}>[</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 15 }}>
                <span style={{ color: "#fbbf24" }}>22</span>
                <span style={{ color: "#fbbf24" }}>28</span>
              </div>
              <div style={{ display: "flex", gap: 15 }}>
                <span style={{ color: "#fbbf24" }}>49</span>
                <span style={{ color: "#fbbf24" }}>64</span>
              </div>
            </div>
            <span style={{ fontSize: 60 }}>]</span>
          </div>
        </div>
      </div>

      {/* 계산 설명 */}
      <div style={{
        position: "absolute",
        top: 450,
        left: 100,
        opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        <div style={{
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          border: "2px solid #a855f7",
          borderRadius: 15,
          padding: "20px 30px",
        }}>
          <div style={{ color: "#c4b5fd", fontSize: 22, marginBottom: 10 }}>계산 방법:</div>
          <div style={{ color: colors.white, fontSize: 20, fontFamily: "monospace" }}>
            C[0,0] = 1×1 + 2×3 + 3×5 = 1 + 6 + 15 = <span style={{ color: "#fbbf24" }}>22</span>
          </div>
        </div>
      </div>

      {/* 신경망 공식 */}
      <div style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: formulaAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          border: "3px solid #ef4444",
          borderRadius: 20,
          padding: "30px 50px",
          textAlign: "center",
        }}>
          <h3 style={{ color: "#fca5a5", fontSize: 28, margin: "0 0 20px 0" }}>
            🧠 신경망에서의 핵심 연산
          </h3>
          <div style={{
            fontSize: 40,
            fontFamily: "monospace",
            color: colors.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}>
            <span style={{ color: "#22c55e" }}>y</span>
            <span>=</span>
            <span style={{ color: "#3b82f6" }}>W</span>
            <span>×</span>
            <span style={{ color: "#fbbf24" }}>x</span>
            <span>+</span>
            <span style={{ color: "#a855f7" }}>b</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 20, marginTop: 15 }}>
            출력 = 가중치 × 입력 + 바이어스
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
