/**
 * Scene 3: 과적합 탐지
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Detection: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const graphOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const signOpacity = interpolate(frame, [210, 240], [0, 1], { extrapolateRight: "clamp" });
  const earlyOpacity = interpolate(frame, [360, 390], [0, 1], { extrapolateRight: "clamp" });

  // 애니메이션 진행
  const progress = interpolate(frame, [90, 450], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-8/scene3.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        과적합 탐지하기
      </h1>

      <div style={{ display: "flex", gap: 35 }}>
        {/* 왼쪽: 그래프 */}
        <div style={{ flex: 1.2 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              opacity: graphOpacity,
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 20, marginBottom: 15, textAlign: "center" }}>
              훈련 vs 검증 손실
            </div>
            <svg width="100%" height="280" viewBox="0 0 450 280">
              {/* 축 */}
              <line x1="50" y1="250" x2="430" y2="250" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="50" y1="30" x2="50" y2="250" stroke={colors.gray[600]} strokeWidth="2" />

              {/* 라벨 */}
              <text x="240" y="275" fill={colors.gray[400]} fontSize="14" textAnchor="middle">Epoch</text>
              <text x="30" y="140" fill={colors.gray[400]} fontSize="14" textAnchor="middle" transform="rotate(-90, 30, 140)">Loss</text>

              {/* 훈련 손실 (계속 감소) */}
              <path
                d={`M 50 50 Q ${50 + 380 * progress} ${50 + 180 * progress}, ${50 + 380 * progress} 230`}
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
              />

              {/* 검증 손실 (감소 후 증가) */}
              <path
                d={`M 50 60 Q ${50 + 150 * Math.min(progress * 2, 1)} ${60 + 80 * Math.min(progress * 2, 1)}, ${50 + 200 * Math.min(progress * 1.5, 1)} ${progress > 0.5 ? 140 - (progress - 0.5) * 100 : 140} Q ${50 + 300 * progress} ${progress > 0.5 ? 140 + (progress - 0.5) * 150 : 140}, ${50 + 380 * progress} ${progress > 0.5 ? 100 + progress * 80 : 140}`}
                fill="none"
                stroke="#f87171"
                strokeWidth="3"
              />

              {/* 범례 */}
              <rect x="280" y="40" width="20" height="4" fill="#22c55e" />
              <text x="305" y="45" fill={colors.gray[300]} fontSize="14">훈련 손실</text>
              <rect x="280" y="60" width="20" height="4" fill="#f87171" />
              <text x="305" y="65" fill={colors.gray[300]} fontSize="14">검증 손실</text>

              {/* 과적합 지점 */}
              {progress > 0.5 && (
                <>
                  <line x1="200" y1="30" x2="200" y2="250" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="210" y="50" fill="#fbbf24" fontSize="14">과적합 시작!</text>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* 오른쪽: 설명 */}
        <div style={{ flex: 1 }}>
          {/* 신호 */}
          <div
            style={{
              backgroundColor: "#f8717120",
              border: "2px solid #f87171",
              padding: 20,
              borderRadius: 16,
              marginBottom: 20,
              opacity: signOpacity,
            }}
          >
            <div style={{ color: "#f87171", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
              과적합 신호
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>
              • 훈련 손실: 계속 감소 ↓
            </div>
            <div style={{ color: colors.white, fontSize: 20 }}>
              • 검증 손실: 감소 후 <span style={{ color: "#f87171" }}>증가 ↑</span>
            </div>
          </div>

          {/* 조기 종료 */}
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              padding: 20,
              borderRadius: 16,
              opacity: earlyOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
              Early Stopping (조기 종료)
            </div>
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 10 }}>
              검증 손실이 올라가기 시작하면 학습 중단!
            </div>
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 12,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <code style={{ color: colors.gray[300], fontSize: 16 }}>
                if val_loss &gt; best_loss: break
              </code>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
