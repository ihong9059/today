/**
 * Lesson 0-6: Matplotlib 기초 - Scene 4: 학습 곡선
 * Loss curve, Accuracy curve, 과적합 감지
 */

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L06_Scene4_LearningCurve: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const lossOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const accOpacity = interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" });
  const insightOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });
  const codeOpacity = interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" });

  // 그래프 애니메이션
  const graphProgress = interpolate(frame, [100, 350], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        padding: 50,
      }}
    >
      {/* 제목 */}
      <h2
        style={{
          fontSize: 48,
          color: colors.white,
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        📉 학습 곡선 (Learning Curve)
      </h2>

      <div style={{ display: "flex", gap: 30, flex: 1 }}>
        {/* 왼쪽: 손실 곡선 */}
        <div
          style={{
            flex: 1,
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #ef4444",
            opacity: lossOpacity,
          }}
        >
          <div style={{ color: "#ef4444", fontSize: 26, fontWeight: "bold", marginBottom: 15 }}>
            손실 곡선 (Loss Curve)
          </div>

          {/* 그래프 영역 */}
          <div style={{ backgroundColor: colors.white, borderRadius: 8, padding: 15, height: 200 }}>
            <svg viewBox="0 0 300 150" style={{ width: "100%", height: "100%" }}>
              {/* 축 */}
              <line x1="30" y1="130" x2="280" y2="130" stroke={colors.gray[400]} strokeWidth="1" />
              <line x1="30" y1="10" x2="30" y2="130" stroke={colors.gray[400]} strokeWidth="1" />

              {/* 손실 곡선 - 내려감 */}
              <path
                d={`M30,${20 + (1 - graphProgress) * 0} Q100,${30 + 30 * graphProgress} 150,${60 + 30 * graphProgress} T280,${110 + 10 * graphProgress}`}
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
              />

              {/* 레이블 */}
              <text x="150" y="145" textAnchor="middle" fontSize="12" fill={colors.gray[600]}>Epoch</text>
              <text x="15" y="70" textAnchor="middle" fontSize="12" fill={colors.gray[600]} transform="rotate(-90, 15, 70)">Loss</text>
            </svg>
          </div>

          <div style={{ color: colors.gray[300], fontSize: 16, marginTop: 10 }}>
            에포크가 진행될수록 <span style={{ color: "#ef4444" }}>손실값 감소</span>
          </div>
        </div>

        {/* 오른쪽: 정확도 곡선 */}
        <div
          style={{
            flex: 1,
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #22c55e",
            opacity: accOpacity,
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 26, fontWeight: "bold", marginBottom: 15 }}>
            정확도 곡선 (Accuracy)
          </div>

          {/* 그래프 영역 */}
          <div style={{ backgroundColor: colors.white, borderRadius: 8, padding: 15, height: 200 }}>
            <svg viewBox="0 0 300 150" style={{ width: "100%", height: "100%" }}>
              {/* 축 */}
              <line x1="30" y1="130" x2="280" y2="130" stroke={colors.gray[400]} strokeWidth="1" />
              <line x1="30" y1="10" x2="30" y2="130" stroke={colors.gray[400]} strokeWidth="1" />

              {/* 정확도 곡선 - 올라감 */}
              <path
                d={`M30,${120 - (1 - graphProgress) * 0} Q100,${100 - 30 * graphProgress} 150,${70 - 20 * graphProgress} T280,${30 - 5 * graphProgress}`}
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
              />

              {/* 레이블 */}
              <text x="150" y="145" textAnchor="middle" fontSize="12" fill={colors.gray[600]}>Epoch</text>
              <text x="15" y="70" textAnchor="middle" fontSize="12" fill={colors.gray[600]} transform="rotate(-90, 15, 70)">Acc</text>
            </svg>
          </div>

          <div style={{ color: colors.gray[300], fontSize: 16, marginTop: 10 }}>
            에포크가 진행될수록 <span style={{ color: "#22c55e" }}>정확도 증가</span>
          </div>
        </div>
      </div>

      {/* 하단: 인사이트 및 코드 */}
      <div style={{ display: "flex", gap: 30, marginTop: 25 }}>
        {/* 인사이트 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#f9731620",
            border: "2px solid #f97316",
            borderRadius: 12,
            padding: 20,
            opacity: insightOpacity,
          }}
        >
          <div style={{ color: "#f97316", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            💡 학습 곡선이 알려주는 것
          </div>
          <div style={{ color: colors.gray[300], fontSize: 16 }}>
            • 손실이 더 이상 감소 안 함 → <span style={{ color: "#22c55e" }}>학습 완료</span><br />
            • Train vs Val 격차 벌어짐 → <span style={{ color: "#ef4444" }}>과적합 신호</span>
          </div>
        </div>

        {/* 코드 */}
        <div
          style={{
            flex: 1,
            backgroundColor: colors.gray[800],
            borderRadius: 12,
            padding: 20,
            opacity: codeOpacity,
          }}
        >
          <div style={{ fontFamily: "monospace", fontSize: 16, color: colors.gray[300], lineHeight: 1.6 }}>
            plt.plot(epochs, loss, <span style={{ color: "#22c55e" }}>label='Loss'</span>)<br />
            plt.legend()<br />
            plt.show()
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
