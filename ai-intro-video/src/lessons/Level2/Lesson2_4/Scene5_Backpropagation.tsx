/**
 * Scene 5: 역전파 시각화
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene5_Backpropagation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const forwardAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const backwardAppear = spring({ frame: frame - 300, fps, config: { damping: 12 } });
  const summaryAppear = spring({ frame: frame - 550, fps, config: { damping: 12 } });

  // 순전파 애니메이션
  const forwardFlow = interpolate(frame, [100, 250], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // 역전파 애니메이션
  const backwardFlow = interpolate(frame, [350, 500], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-4/scene5.mp3")} />

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
          🔄 순전파 vs 역전파
        </h1>
      </div>

      {/* 순전파 섹션 */}
      <div style={{
        position: "absolute",
        top: 120,
        left: 80,
        opacity: forwardAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          border: "3px solid #3b82f6",
          borderRadius: 20,
          padding: 25,
          width: 450,
        }}>
          <h3 style={{ color: "#93c5fd", fontSize: 26, margin: "0 0 20px 0" }}>
            ➡️ 순전파 (Forward Pass)
          </h3>
          <svg width={400} height={80}>
            {/* 노드들 */}
            <circle cx={50} cy={40} r={25} fill="#3b82f6" />
            <text x={50} y={47} fill="white" fontSize={18} textAnchor="middle">입력</text>

            <circle cx={150} cy={40} r={25} fill="#a855f7" />
            <text x={150} y={47} fill="white" fontSize={18} textAnchor="middle">h</text>

            <circle cx={250} cy={40} r={25} fill="#22c55e" />
            <text x={250} y={47} fill="white" fontSize={18} textAnchor="middle">출력</text>

            <rect x={310} y={15} width={70} height={50} rx={10} fill="#ef4444" />
            <text x={345} y={47} fill="white" fontSize={16} textAnchor="middle">Loss</text>

            {/* 화살표 */}
            <line x1={80} y1={40} x2={120} y2={40} stroke="#fbbf24" strokeWidth={3} />
            <line x1={180} y1={40} x2={220} y2={40} stroke="#fbbf24" strokeWidth={3} />
            <line x1={280} y1={40} x2={310} y2={40} stroke="#fbbf24" strokeWidth={3} />

            {/* 애니메이션 포인트 */}
            <circle cx={80 + forwardFlow * 180} cy={40} r={8} fill="#fbbf24" opacity={forwardFlow > 0 && forwardFlow < 1 ? 1 : 0} />
          </svg>
          <div style={{ color: "#d1d5db", fontSize: 20, marginTop: 10 }}>
            데이터가 앞으로 흘러갑니다
          </div>
        </div>
      </div>

      {/* 역전파 섹션 */}
      <div style={{
        position: "absolute",
        top: 120,
        right: 80,
        opacity: backwardAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          border: "3px solid #ef4444",
          borderRadius: 20,
          padding: 25,
          width: 450,
        }}>
          <h3 style={{ color: "#fca5a5", fontSize: 26, margin: "0 0 20px 0" }}>
            ⬅️ 역전파 (Backward Pass)
          </h3>
          <svg width={400} height={80}>
            {/* 노드들 */}
            <rect x={20} y={15} width={70} height={50} rx={10} fill="#ef4444" />
            <text x={55} y={47} fill="white" fontSize={16} textAnchor="middle">Loss</text>

            <circle cx={150} cy={40} r={25} fill="#22c55e" />
            <text x={150} y={47} fill="white" fontSize={18} textAnchor="middle">출력</text>

            <circle cx={250} cy={40} r={25} fill="#a855f7" />
            <text x={250} y={47} fill="white" fontSize={18} textAnchor="middle">h</text>

            <circle cx={350} cy={40} r={25} fill="#3b82f6" />
            <text x={350} y={47} fill="white" fontSize={18} textAnchor="middle">입력</text>

            {/* 화살표 (역방향) */}
            <line x1={90} y1={40} x2={120} y2={40} stroke="#ef4444" strokeWidth={3} />
            <line x1={180} y1={40} x2={220} y2={40} stroke="#ef4444" strokeWidth={3} />
            <line x1={280} y1={40} x2={320} y2={40} stroke="#ef4444" strokeWidth={3} />

            {/* 애니메이션 포인트 */}
            <circle cx={90 + backwardFlow * 230} cy={40} r={8} fill="#22c55e" opacity={backwardFlow > 0 && backwardFlow < 1 ? 1 : 0} />
          </svg>
          <div style={{ color: "#d1d5db", fontSize: 20, marginTop: 10 }}>
            그래디언트가 뒤로 흘러갑니다
          </div>
        </div>
      </div>

      {/* 핵심 요약 */}
      <div style={{
        position: "absolute",
        bottom: 150,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: summaryAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          border: "3px solid #a855f7",
          borderRadius: 20,
          padding: 30,
          width: 750,
          textAlign: "center",
        }}>
          <h3 style={{ color: "#c4b5fd", fontSize: 26, margin: "0 0 15px 0" }}>
            🎯 핵심 원리
          </h3>
          <div style={{ color: colors.white, fontSize: 24, lineHeight: 1.6 }}>
            각 단계에서 <span style={{ color: "#fbbf24" }}>연쇄법칙</span>으로 그래디언트를 곱해나갑니다<br />
            수백 개의 층도 이 원리로 학습 가능!
          </div>
        </div>
      </div>

      {/* 프레임워크 언급 */}
      <div style={{
        position: "absolute",
        bottom: 50,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: summaryAppear,
      }}>
        <div style={{
          color: "#22c55e",
          fontSize: 24,
          fontWeight: "bold",
        }}>
          ✨ PyTorch, TensorFlow가 이 계산을 자동으로 수행합니다!
        </div>
      </div>
    </AbsoluteFill>
  );
};
