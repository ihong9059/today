/**
 * Scene 4: 신경망에서 연쇄법칙
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene4_NeuralNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const nnAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const chainAppear = spring({ frame: frame - 300, fps, config: { damping: 12 } });
  const formulaAppear = spring({ frame: frame - 550, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-4/scene4.mp3")} />

      {/* 타이틀 */}
      <div style={{
        position: "absolute",
        top: 35,
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
          🤖 신경망에서 연쇄법칙
        </h1>
      </div>

      {/* 2층 신경망 다이어그램 */}
      <div style={{
        position: "absolute",
        top: 120,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: nnAppear,
      }}>
        <svg width={800} height={200}>
          {/* 입력 */}
          <circle cx={100} cy={100} r={40} fill="#3b82f6" />
          <text x={100} y={108} fill="white" fontSize={26} textAnchor="middle" fontWeight="bold">x</text>
          <text x={100} y={160} fill="#93c5fd" fontSize={18} textAnchor="middle">입력</text>

          {/* w1 */}
          <line x1={145} y1={100} x2={250} y2={100} stroke="#fbbf24" strokeWidth={4} />
          <text x={197} y={85} fill="#fbbf24" fontSize={22} textAnchor="middle">w₁</text>

          {/* 은닉층 */}
          <circle cx={300} cy={100} r={40} fill="#a855f7" />
          <text x={300} y={108} fill="white" fontSize={26} textAnchor="middle" fontWeight="bold">h</text>
          <text x={300} y={160} fill="#c4b5fd" fontSize={18} textAnchor="middle">은닉층</text>

          {/* w2 */}
          <line x1={345} y1={100} x2={450} y2={100} stroke="#fbbf24" strokeWidth={4} />
          <text x={397} y={85} fill="#fbbf24" fontSize={22} textAnchor="middle">w₂</text>

          {/* 출력 */}
          <circle cx={500} cy={100} r={40} fill="#22c55e" />
          <text x={500} y={108} fill="white" fontSize={26} textAnchor="middle" fontWeight="bold">y</text>
          <text x={500} y={160} fill="#86efac" fontSize={18} textAnchor="middle">출력</text>

          {/* 화살표 */}
          <line x1={545} y1={100} x2={650} y2={100} stroke="#ef4444" strokeWidth={4} />

          {/* 손실 */}
          <rect x={660} y={60} width={100} height={80} rx={15} fill="#ef4444" />
          <text x={710} y={108} fill="white" fontSize={26} textAnchor="middle" fontWeight="bold">Loss</text>
        </svg>
      </div>

      {/* 연쇄법칙 적용 */}
      <div style={{
        position: "absolute",
        top: 340,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: chainAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          border: "3px solid #fbbf24",
          borderRadius: 20,
          padding: 30,
          width: 800,
          textAlign: "center",
        }}>
          <h3 style={{ color: "#fde047", fontSize: 26, margin: "0 0 20px 0" }}>
            ⛓️ w₁에 대한 손실의 미분
          </h3>
          <div style={{
            color: colors.white,
            fontSize: 40,
            fontFamily: "monospace",
            fontWeight: "bold",
          }}>
            ∂L/∂w₁ = <span style={{ color: "#ef4444" }}>∂L/∂y</span> × <span style={{ color: "#22c55e" }}>∂y/∂h</span> × <span style={{ color: "#a855f7" }}>∂h/∂w₁</span>
          </div>
        </div>
      </div>

      {/* 각 부분 설명 */}
      <div style={{
        position: "absolute",
        bottom: 120,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 30,
        opacity: formulaAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          border: "2px solid #ef4444",
          borderRadius: 10,
          padding: "15px 25px",
          textAlign: "center",
        }}>
          <div style={{ color: "#fca5a5", fontSize: 18 }}>손실 → 출력</div>
          <div style={{ color: colors.white, fontSize: 22, fontFamily: "monospace" }}>∂L/∂y</div>
        </div>

        <div style={{ fontSize: 30, color: "#fbbf24", alignSelf: "center" }}>×</div>

        <div style={{
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          border: "2px solid #22c55e",
          borderRadius: 10,
          padding: "15px 25px",
          textAlign: "center",
        }}>
          <div style={{ color: "#86efac", fontSize: 18 }}>출력 → 은닉층</div>
          <div style={{ color: colors.white, fontSize: 22, fontFamily: "monospace" }}>∂y/∂h</div>
        </div>

        <div style={{ fontSize: 30, color: "#fbbf24", alignSelf: "center" }}>×</div>

        <div style={{
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          border: "2px solid #a855f7",
          borderRadius: 10,
          padding: "15px 25px",
          textAlign: "center",
        }}>
          <div style={{ color: "#c4b5fd", fontSize: 18 }}>은닉층 → w₁</div>
          <div style={{ color: colors.white, fontSize: 22, fontFamily: "monospace" }}>∂h/∂w₁</div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div style={{
        position: "absolute",
        bottom: 35,
        left: "50%",
        transform: "translateX(-50%)",
        color: "#22c55e",
        fontSize: 24,
        fontWeight: "bold",
      }}>
        💡 뒤에서 앞으로, 연쇄적으로 미분을 곱해나갑니다!
      </div>
    </AbsoluteFill>
  );
};
