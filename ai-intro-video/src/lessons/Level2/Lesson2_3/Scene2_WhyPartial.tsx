/**
 * Scene 2: 편미분이 왜 필요한가?
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene2_WhyPartial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const mountainAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const nnAppear = spring({ frame: frame - 300, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-3/scene2.mp3")} />

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
          🤔 편미분이 왜 필요한가?
        </h1>
      </div>

      {/* 등산 비유 */}
      <div style={{
        position: "absolute",
        top: 150,
        left: 100,
        opacity: mountainAppear,
        transform: `translateY(${(1 - mountainAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          border: "3px solid #22c55e",
          borderRadius: 20,
          padding: 30,
          width: 450,
        }}>
          <h2 style={{ color: "#86efac", fontSize: 30, margin: "0 0 20px 0" }}>
            🏔️ 등산 비유
          </h2>

          {/* 산 이미지 (SVG) */}
          <svg width={400} height={150} style={{ marginBottom: 20 }}>
            {/* 산 */}
            <polygon
              points="200,20 350,130 50,130"
              fill="url(#mountainGrad)"
              stroke="#22c55e"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
            </defs>

            {/* 사람 */}
            <circle cx={200} cy={50} r={12} fill="#fbbf24" />
            <line x1={200} y1={62} x2={200} y2={90} stroke="#fbbf24" strokeWidth={3} />

            {/* 화살표들 */}
            <line x1={200} y1={70} x2={260} y2={100} stroke="#ef4444" strokeWidth={3} markerEnd="url(#arrow)" />
            <text x={270} y={105} fill="#ef4444" fontSize={16}>동쪽</text>

            <line x1={200} y1={70} x2={140} y2={100} stroke="#3b82f6" strokeWidth={3} />
            <text x={100} y={105} fill="#3b82f6" fontSize={16}>북쪽</text>

            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
              </marker>
            </defs>
          </svg>

          <div style={{ color: "#d1d5db", fontSize: 20, lineHeight: 1.6 }}>
            어느 방향이 가장 가파른지?<br />
            → <span style={{ color: "#fbbf24" }}>각 방향의 경사를 따로 확인!</span>
          </div>
        </div>
      </div>

      {/* 신경망 적용 */}
      <div style={{
        position: "absolute",
        top: 150,
        right: 100,
        opacity: nnAppear,
        transform: `translateX(${(1 - nnAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          border: "3px solid #a855f7",
          borderRadius: 20,
          padding: 30,
          width: 450,
        }}>
          <h2 style={{ color: "#c4b5fd", fontSize: 30, margin: "0 0 20px 0" }}>
            🧠 신경망에서
          </h2>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}>
            {[
              { var: "W₁", desc: "바꿀 때 손실 변화?" },
              { var: "W₂", desc: "바꿀 때 손실 변화?" },
              { var: "W₃", desc: "바꿀 때 손실 변화?" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                backgroundColor: "rgba(0,0,0,0.2)",
                padding: "12px 20px",
                borderRadius: 10,
              }}>
                <span style={{
                  color: "#fbbf24",
                  fontSize: 26,
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}>
                  {item.var}
                </span>
                <span style={{ color: "#d1d5db", fontSize: 20 }}>
                  {item.desc}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20,
            color: "#22c55e",
            fontSize: 22,
            textAlign: "center",
            fontWeight: "bold",
          }}>
            → 각 가중치에 대해 따로 미분!
          </div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        <div style={{
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          border: "3px solid #fbbf24",
          borderRadius: 15,
          padding: "20px 40px",
          textAlign: "center",
        }}>
          <div style={{ color: "#fde047", fontSize: 28, fontWeight: "bold" }}>
            변수가 여러 개일 때, 하나의 변수에 대해서만 미분
          </div>
          <div style={{ color: "#d1d5db", fontSize: 22, marginTop: 10 }}>
            = 편미분 (Partial Derivative)
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
