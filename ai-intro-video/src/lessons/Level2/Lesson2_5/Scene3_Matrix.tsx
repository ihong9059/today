/**
 * Scene 3: 행렬이란 무엇인가?
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Matrix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const matrixAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const networkAppear = spring({ frame: frame - 200, fps, config: { damping: 12 } });
  const weightAppear = spring({ frame: frame - 350, fps, config: { damping: 12 } });

  // 행렬 요소 애니메이션
  const rows = [[1, 2, 3], [4, 5, 6]];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-5/scene3.mp3")} />

      {/* 타이틀 */}
      <div style={{
        position: "absolute",
        top: 60,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: titleOpacity,
      }}>
        <h1 style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          margin: 0,
        }}>
          📐 행렬이란 무엇인가?
        </h1>
      </div>

      {/* 행렬 정의 */}
      <div style={{
        position: "absolute",
        top: 180,
        left: 100,
        opacity: matrixAppear,
        transform: `translateY(${(1 - matrixAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          border: "3px solid #22c55e",
          borderRadius: 20,
          padding: "30px 40px",
        }}>
          <h2 style={{ color: "#86efac", fontSize: 32, margin: "0 0 20px 0" }}>
            행렬 = 숫자들을 행과 열로 배열한 것
          </h2>

          {/* 2x3 행렬 시각화 */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              fontSize: 50,
              fontFamily: "monospace",
              color: colors.white,
            }}>
              <span style={{ fontSize: 80 }}>[</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {rows.map((row, rowIdx) => (
                  <div key={rowIdx} style={{ display: "flex", gap: 20 }}>
                    {row.map((num, colIdx) => (
                      <span
                        key={colIdx}
                        style={{
                          width: 50,
                          textAlign: "center",
                          opacity: interpolate(frame, [80 + rowIdx * 30 + colIdx * 15, 110 + rowIdx * 30 + colIdx * 15], [0, 1], { extrapolateRight: "clamp" }),
                          color: rowIdx === 0 ? "#60a5fa" : "#34d399",
                        }}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 80 }}>]</span>
            </div>

            <div style={{ color: "#94a3b8", fontSize: 26 }}>
              <div>← 2행</div>
              <div style={{ marginTop: 10 }}>← 3열</div>
              <div style={{ marginTop: 20, color: "#fbbf24" }}>2×3 행렬</div>
            </div>
          </div>
        </div>
      </div>

      {/* 신경망 시각화 */}
      <div style={{
        position: "absolute",
        top: 180,
        right: 80,
        opacity: networkAppear,
        transform: `translateX(${(1 - networkAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          border: "2px solid #a855f7",
          borderRadius: 20,
          padding: 30,
        }}>
          <h3 style={{ color: "#c4b5fd", fontSize: 26, margin: "0 0 20px 0", textAlign: "center" }}>
            신경망의 한 레이어
          </h3>

          <svg width={350} height={200}>
            {/* 입력 뉴런 (3개) */}
            {[0, 1, 2].map((i) => (
              <g key={`in-${i}`}>
                <circle cx={50} cy={40 + i * 60} r={25} fill="#3b82f6" />
                <text x={50} y={45 + i * 60} fill="white" fontSize={16} textAnchor="middle">x{i + 1}</text>
              </g>
            ))}

            {/* 출력 뉴런 (2개) */}
            {[0, 1].map((i) => (
              <g key={`out-${i}`}>
                <circle cx={300} cy={70 + i * 60} r={25} fill="#22c55e" />
                <text x={300} y={75 + i * 60} fill="white" fontSize={16} textAnchor="middle">y{i + 1}</text>
              </g>
            ))}

            {/* 연결선 (가중치) */}
            {[0, 1, 2].map((i) =>
              [0, 1].map((j) => (
                <line
                  key={`w-${i}-${j}`}
                  x1={75}
                  y1={40 + i * 60}
                  x2={275}
                  y2={70 + j * 60}
                  stroke="#fbbf24"
                  strokeWidth={2}
                  opacity={interpolate(frame, [220 + (i * 2 + j) * 20, 250 + (i * 2 + j) * 20], [0, 0.6], { extrapolateRight: "clamp" })}
                />
              ))
            )}
          </svg>

          <div style={{ color: "#fbbf24", fontSize: 20, textAlign: "center", marginTop: 10 }}>
            3개 입력 × 2개 출력 = 6개 가중치
          </div>
        </div>
      </div>

      {/* 가중치 행렬 설명 */}
      <div style={{
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: weightAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          border: "3px solid #fbbf24",
          borderRadius: 20,
          padding: "25px 40px",
          textAlign: "center",
        }}>
          <h3 style={{ color: "#fde047", fontSize: 30, margin: "0 0 15px 0" }}>
            💡 가중치 행렬 = 신경망 레이어의 연결 정보
          </h3>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            fontFamily: "monospace",
            fontSize: 28,
            color: colors.white,
          }}>
            <span>W =</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 50 }}>[</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <span>w₁₁  w₁₂  w₁₃</span>
                <span>w₂₁  w₂₂  w₂₃</span>
              </div>
              <span style={{ fontSize: 50 }}>]</span>
            </div>
            <span style={{ color: "#94a3b8" }}>2×3 행렬</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
