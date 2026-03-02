/**
 * Scene 5: 다층 신경망에서의 역전파
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_MultiLayer: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 단계별 애니메이션
  const step1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const step2Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const step3Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const step4Opacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });

  // 핵심 메시지
  const keyOpacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });

  // 기울기 전파 애니메이션
  const gradFlow = interpolate(frame, [90, 400], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-5/scene5.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 50,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        다층 신경망에서의 역전파
      </h1>

      <div style={{ display: "flex", gap: 35 }}>
        {/* 왼쪽: 신경망 시각화 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              height: "100%",
            }}
          >
            <svg width="100%" height="300" viewBox="0 0 350 300">
              {/* 레이어들 */}
              {/* 입력층 */}
              <circle cx="60" cy="100" r="25" fill="#22c55e" />
              <circle cx="60" cy="200" r="25" fill="#22c55e" />
              <text x="60" y="260" fill={colors.gray[400]} fontSize="14" textAnchor="middle">입력</text>

              {/* 은닉층 */}
              <circle cx="175" cy="80" r="25" fill="#fbbf24" />
              <circle cx="175" cy="150" r="25" fill="#fbbf24" />
              <circle cx="175" cy="220" r="25" fill="#fbbf24" />
              <text x="175" y="260" fill={colors.gray[400]} fontSize="14" textAnchor="middle">은닉층</text>

              {/* 출력층 */}
              <circle cx="290" cy="150" r="25" fill="#a855f7" />
              <text x="290" y="260" fill={colors.gray[400]} fontSize="14" textAnchor="middle">출력</text>

              {/* 연결선 */}
              <line x1="85" y1="100" x2="150" y2="80" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="85" y1="100" x2="150" y2="150" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="85" y1="100" x2="150" y2="220" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="85" y1="200" x2="150" y2="80" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="85" y1="200" x2="150" y2="150" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="85" y1="200" x2="150" y2="220" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="200" y1="80" x2="265" y2="150" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="200" y1="150" x2="265" y2="150" stroke={colors.gray[600]} strokeWidth="2" />
              <line x1="200" y1="220" x2="265" y2="150" stroke={colors.gray[600]} strokeWidth="2" />

              {/* 역전파 화살표 */}
              <defs>
                <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#f87171" />
                </marker>
              </defs>

              {/* 기울기 전파 표시 */}
              {gradFlow > 0.2 && (
                <line x1="265" y1="140" x2="205" y2="80" stroke="#f87171" strokeWidth="3"
                  strokeDasharray="8 4" markerEnd="url(#arrowRed)" opacity={Math.min((gradFlow - 0.2) * 2, 1)} />
              )}
              {gradFlow > 0.4 && (
                <line x1="265" y1="150" x2="205" y2="150" stroke="#f87171" strokeWidth="3"
                  strokeDasharray="8 4" markerEnd="url(#arrowRed)" opacity={Math.min((gradFlow - 0.4) * 2, 1)} />
              )}
              {gradFlow > 0.6 && (
                <line x1="265" y1="160" x2="205" y2="220" stroke="#f87171" strokeWidth="3"
                  strokeDasharray="8 4" markerEnd="url(#arrowRed)" opacity={Math.min((gradFlow - 0.6) * 2, 1)} />
              )}
              {gradFlow > 0.8 && (
                <>
                  <line x1="150" y1="80" x2="90" y2="100" stroke="#f87171" strokeWidth="3"
                    strokeDasharray="8 4" markerEnd="url(#arrowRed)" opacity={Math.min((gradFlow - 0.8) * 2, 1)} />
                  <line x1="150" y1="150" x2="90" y2="100" stroke="#f87171" strokeWidth="3"
                    strokeDasharray="8 4" markerEnd="url(#arrowRed)" opacity={Math.min((gradFlow - 0.8) * 2, 1)} />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* 오른쪽: 단계 설명 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 12,
              marginBottom: 12,
              borderLeft: "4px solid #a855f7",
              opacity: step1Opacity,
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 20, fontWeight: "bold" }}>
              ① 출력층에서 시작
            </div>
            <div style={{ color: colors.gray[300], fontSize: 16, marginTop: 5 }}>
              ∂L/∂y 계산 (손실의 출력에 대한 기울기)
            </div>
          </div>

          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 12,
              marginBottom: 12,
              borderLeft: "4px solid #fbbf24",
              opacity: step2Opacity,
            }}
          >
            <div style={{ color: "#fbbf24", fontSize: 20, fontWeight: "bold" }}>
              ② 은닉층으로 전파
            </div>
            <div style={{ color: colors.gray[300], fontSize: 16, marginTop: 5 }}>
              ∂L/∂h = ∂L/∂y × ∂y/∂h
            </div>
          </div>

          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 12,
              marginBottom: 12,
              borderLeft: "4px solid #22c55e",
              opacity: step3Opacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 20, fontWeight: "bold" }}>
              ③ 입력층까지 계속
            </div>
            <div style={{ color: colors.gray[300], fontSize: 16, marginTop: 5 }}>
              ∂L/∂w₁ = ∂L/∂h × ∂h/∂w₁
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f8717120",
              border: "2px solid #f87171",
              padding: 15,
              borderRadius: 12,
              textAlign: "center",
              opacity: step4Opacity,
            }}
          >
            <div style={{ color: "#f87171", fontSize: 20, fontWeight: "bold" }}>
              뒤 레이어의 기울기 → 앞 레이어 계산에 필요!
            </div>
          </div>
        </div>
      </div>

      {/* 핵심 */}
      <div
        style={{
          textAlign: "center",
          marginTop: 20,
          opacity: keyOpacity,
        }}
      >
        <div style={{ fontSize: 28, color: "#fbbf24", fontWeight: "bold" }}>
          그래서 "역"전파! 뒤에서 앞으로 진행 ⬅️
        </div>
      </div>
    </AbsoluteFill>
  );
};
