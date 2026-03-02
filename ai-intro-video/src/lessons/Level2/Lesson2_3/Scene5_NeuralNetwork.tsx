/**
 * Scene 5: 신경망에서 편미분
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene5_NeuralNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const nnAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const chainAppear = spring({ frame: frame - 250, fps, config: { damping: 12 } });
  const updateAppear = spring({ frame: frame - 450, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-3/scene5.mp3")} />

      {/* 타이틀 */}
      <div style={{
        position: "absolute",
        top: 40,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: titleOpacity,
      }}>
        <h1 style={{
          fontSize: 50,
          color: colors.white,
          fontWeight: "bold",
          margin: 0,
        }}>
          🤖 신경망에서 편미분 활용
        </h1>
      </div>

      {/* 간단한 신경망 */}
      <div style={{
        position: "absolute",
        top: 120,
        left: 80,
        opacity: nnAppear,
        transform: `translateY(${(1 - nnAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          border: "3px solid #3b82f6",
          borderRadius: 20,
          padding: 25,
          width: 480,
        }}>
          <h3 style={{ color: "#93c5fd", fontSize: 26, margin: "0 0 15px 0" }}>
            📊 간단한 신경망
          </h3>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontFamily: "monospace",
            fontSize: 24,
          }}>
            <div style={{ color: "#d1d5db" }}>
              출력: <span style={{ color: "#22c55e" }}>y = wx + b</span>
            </div>
            <div style={{ color: "#d1d5db" }}>
              손실: <span style={{ color: "#ef4444" }}>L = (y - target)²</span>
            </div>
          </div>

          {/* 간단한 다이어그램 */}
          <svg width={420} height={100} style={{ marginTop: 20 }}>
            {/* 입력 */}
            <circle cx={60} cy={50} r={25} fill="#3b82f6" />
            <text x={60} y={55} fill="white" fontSize={20} textAnchor="middle">x</text>

            {/* 가중치 */}
            <line x1={90} y1={50} x2={180} y2={50} stroke="#fbbf24" strokeWidth={3} />
            <text x={135} y={35} fill="#fbbf24" fontSize={18}>w</text>

            {/* 뉴런 */}
            <circle cx={210} cy={50} r={30} fill="#a855f7" />
            <text x={210} y={45} fill="white" fontSize={14}>wx+b</text>
            <text x={210} y={62} fill="white" fontSize={14}>=y</text>

            {/* 출력 */}
            <line x1={245} y1={50} x2={320} y2={50} stroke="#22c55e" strokeWidth={3} />

            {/* 손실 */}
            <rect x={330} y={25} width={80} height={50} rx={10} fill="#ef4444" />
            <text x={370} y={55} fill="white" fontSize={18} textAnchor="middle">Loss</text>
          </svg>
        </div>
      </div>

      {/* 연쇄법칙 적용 */}
      <div style={{
        position: "absolute",
        top: 120,
        right: 80,
        opacity: chainAppear,
        transform: `translateX(${(1 - chainAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          border: "3px solid #fbbf24",
          borderRadius: 20,
          padding: 25,
          width: 480,
        }}>
          <h3 style={{ color: "#fde047", fontSize: 26, margin: "0 0 15px 0" }}>
            ⛓️ 연쇄법칙 적용
          </h3>

          <div style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
          }}>
            <div style={{
              color: colors.white,
              fontSize: 26,
              fontFamily: "monospace",
              textAlign: "center",
            }}>
              ∂L/∂w = ∂L/∂y × ∂y/∂w
            </div>
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: 20,
          }}>
            <div style={{ color: "#d1d5db" }}>
              <span style={{ color: "#22c55e" }}>∂L/∂y</span> = 2(y - target)
            </div>
            <div style={{ color: "#d1d5db" }}>
              <span style={{ color: "#3b82f6" }}>∂y/∂w</span> = x
            </div>
            <div style={{
              marginTop: 10,
              padding: "10px 20px",
              backgroundColor: "rgba(168, 85, 247, 0.3)",
              borderRadius: 10,
              textAlign: "center",
            }}>
              <span style={{ color: "#c4b5fd", fontSize: 22 }}>
                ∂L/∂w = 2(y - target) × x
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 가중치 업데이트 */}
      <div style={{
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: updateAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          border: "3px solid #22c55e",
          borderRadius: 20,
          padding: 25,
          width: 700,
          textAlign: "center",
        }}>
          <h3 style={{ color: "#86efac", fontSize: 26, margin: "0 0 15px 0" }}>
            🔄 가중치 업데이트
          </h3>

          <div style={{
            color: colors.white,
            fontSize: 36,
            fontFamily: "monospace",
            fontWeight: "bold",
            marginBottom: 15,
          }}>
            w = w - η × ∂L/∂w
          </div>

          <div style={{ color: "#fbbf24", fontSize: 22 }}>
            신경망은 이 계산을 수백만 개 파라미터에 자동으로 수행!<br />
            → <span style={{ color: "#22c55e" }}>자동 미분 (Automatic Differentiation)</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
