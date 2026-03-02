/**
 * Scene 4: 그래디언트
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene4_Gradient: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const defAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const whyAppear = spring({ frame: frame - 250, fps, config: { damping: 12 } });
  const gdAppear = spring({ frame: frame - 400, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-3/scene4.mp3")} />

      {/* 타이틀 */}
      <div style={{
        position: "absolute",
        top: 40,
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
          🧭 그래디언트 (Gradient)
        </h1>
      </div>

      {/* 그래디언트 정의 */}
      <div style={{
        position: "absolute",
        top: 130,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: defAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          border: "3px solid #a855f7",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
          width: 700,
        }}>
          <div style={{ color: "#c4b5fd", fontSize: 26, marginBottom: 15 }}>
            그래디언트 = 모든 편미분을 모아놓은 벡터
          </div>
          <div style={{
            color: colors.white,
            fontSize: 50,
            fontFamily: "monospace",
            fontWeight: "bold",
          }}>
            ∇f = (∂f/∂x, ∂f/∂y)
          </div>
          <div style={{ color: "#fbbf24", fontSize: 22, marginTop: 15 }}>
            "나블라 f" 라고 읽습니다
          </div>
        </div>
      </div>

      {/* 왜 중요한가 */}
      <div style={{
        position: "absolute",
        top: 370,
        left: 100,
        opacity: whyAppear,
        transform: `translateY(${(1 - whyAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          border: "3px solid #22c55e",
          borderRadius: 20,
          padding: 25,
          width: 450,
        }}>
          <h3 style={{ color: "#86efac", fontSize: 28, margin: "0 0 20px 0" }}>
            📈 왜 중요한가?
          </h3>

          {/* 화살표 그림 */}
          <svg width={400} height={120}>
            {/* 등고선 (원) */}
            <ellipse cx={200} cy={60} rx={150} ry={50} fill="none" stroke="#22c55e" strokeWidth={2} opacity={0.3} />
            <ellipse cx={200} cy={60} rx={100} ry={35} fill="none" stroke="#22c55e" strokeWidth={2} opacity={0.5} />
            <ellipse cx={200} cy={60} rx={50} ry={20} fill="none" stroke="#22c55e" strokeWidth={2} opacity={0.7} />

            {/* 점 */}
            <circle cx={250} cy={50} r={8} fill="#fbbf24" />

            {/* 그래디언트 화살표 */}
            <line x1={250} y1={50} x2={320} y2={30} stroke="#ef4444" strokeWidth={4} />
            <polygon points="320,30 310,38 308,28" fill="#ef4444" />
            <text x={325} y={35} fill="#ef4444" fontSize={18}>∇f</text>

            <text x={200} y={110} fill="#d1d5db" fontSize={16} textAnchor="middle">
              가장 빠르게 증가하는 방향!
            </text>
          </svg>
        </div>
      </div>

      {/* 경사하강법 연결 */}
      <div style={{
        position: "absolute",
        top: 370,
        right: 100,
        opacity: gdAppear,
        transform: `translateX(${(1 - gdAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          border: "3px solid #ef4444",
          borderRadius: 20,
          padding: 25,
          width: 450,
        }}>
          <h3 style={{ color: "#fca5a5", fontSize: 28, margin: "0 0 20px 0" }}>
            🔽 경사하강법에서
          </h3>

          <div style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: 20,
            borderRadius: 10,
            textAlign: "center",
            marginBottom: 20,
          }}>
            <div style={{
              color: colors.white,
              fontSize: 32,
              fontFamily: "monospace",
              fontWeight: "bold",
            }}>
              w = w - η × ∇L
            </div>
          </div>

          <div style={{ color: "#d1d5db", fontSize: 20, lineHeight: 1.8 }}>
            <span style={{ color: "#22c55e" }}>∇L의 반대 방향</span><br />
            = 손실이 <span style={{ color: "#fbbf24" }}>가장 빠르게 감소</span>하는 방향!
          </div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div style={{
        position: "absolute",
        bottom: 50,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: interpolate(frame, [470, 500], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        <div style={{
          color: "#fde047",
          fontSize: 26,
          textAlign: "center",
          fontWeight: "bold",
        }}>
          그래디언트 반대 방향 → 손실 감소 → AI 학습!
        </div>
      </div>
    </AbsoluteFill>
  );
};
