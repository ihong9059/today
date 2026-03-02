/**
 * Scene 3: Momentum
 * 관성을 이용한 최적화
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Momentum: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 공 굴림 애니메이션
  const ballProgress = interpolate(frame, [60, 400], [0, 1], { extrapolateRight: "clamp" });

  // 수식 표시
  const formula1Opacity = interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" });
  const formula2Opacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });

  // 비교
  const comparisonOpacity = interpolate(frame, [480, 510], [0, 1], { extrapolateRight: "clamp" });

  // 코드
  const codeOpacity = interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" });

  // 공의 위치 계산 (곡선 위)
  const ballX = 100 + ballProgress * 500;
  const curve = (x: number) => 200 + Math.sin((x - 100) / 80) * 60 - (x - 100) * 0.15;
  const ballY = curve(ballX);

  // 속도 표시 (프레임에 따라)
  const velocityArrow = interpolate(ballProgress, [0, 0.3, 0.6, 1], [20, 60, 80, 40]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-3/scene3.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          opacity: titleOpacity,
        }}
      >
        Momentum (모멘텀)
      </h1>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 시각화 */}
        <div style={{ flex: 1 }}>
          {/* 공 굴림 애니메이션 */}
          <div
            style={{
              position: "relative",
              height: 280,
              backgroundColor: colors.gray[800],
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 700 280">
              {/* 곡선 (언덕) */}
              <path
                d={`M 50 200 Q 200 80 350 180 Q 500 100 650 200`}
                stroke="#60a5fa"
                strokeWidth={4}
                fill="none"
              />
              {/* 공 */}
              <circle cx={ballX} cy={ballY} r={20} fill="#f87171" />
              {/* 속도 화살표 */}
              <line
                x1={ballX}
                y1={ballY}
                x2={ballX + velocityArrow}
                y2={ballY + velocityArrow * 0.3}
                stroke="#22c55e"
                strokeWidth={4}
                markerEnd="url(#arrowhead)"
              />
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
                </marker>
              </defs>
              {/* 관성 텍스트 */}
              <text x="400" y="40" fill="#22c55e" fontSize="24" fontWeight="bold">
                관성 (Momentum)
              </text>
            </svg>
          </div>

          {/* 비교 */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 20,
              opacity: comparisonOpacity,
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: "#f8717130",
                border: "2px solid #f87171",
                padding: 15,
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div style={{ color: "#f87171", fontSize: 20, fontWeight: "bold" }}>SGD</div>
              <svg width="100" height="60" viewBox="0 0 100 60">
                <path d="M 10 50 L 25 20 L 40 45 L 55 15 L 70 40 L 85 30"
                  stroke="#f87171" strokeWidth={3} fill="none" />
              </svg>
              <div style={{ color: colors.gray[400], fontSize: 14 }}>지그재그</div>
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: "#22c55e30",
                border: "2px solid #22c55e",
                padding: 15,
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div style={{ color: "#22c55e", fontSize: 20, fontWeight: "bold" }}>Momentum</div>
              <svg width="100" height="60" viewBox="0 0 100 60">
                <path d="M 10 50 Q 50 10 90 30"
                  stroke="#22c55e" strokeWidth={3} fill="none" />
              </svg>
              <div style={{ color: colors.gray[400], fontSize: 14 }}>부드러운 곡선</div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 수식 & 코드 */}
        <div style={{ flex: 1 }}>
          {/* 수식 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              marginBottom: 20,
            }}
          >
            <h3 style={{ color: "#60a5fa", fontSize: 24, marginBottom: 15 }}>
              핵심 수식
            </h3>
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
                opacity: formula1Opacity,
              }}
            >
              <div style={{ color: colors.white, fontSize: 26, fontFamily: "serif" }}>
                v<sub>t</sub> = β · v<sub>t-1</sub> + ∇L(w)
              </div>
              <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 8 }}>
                속도 = 0.9 × 이전속도 + 현재기울기
              </div>
            </div>
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                opacity: formula2Opacity,
              }}
            >
              <div style={{ color: colors.white, fontSize: 26, fontFamily: "serif" }}>
                w = w - η · v<sub>t</sub>
              </div>
              <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 8 }}>
                가중치 업데이트
              </div>
            </div>
          </div>

          {/* PyTorch 코드 */}
          <div
            style={{
              backgroundColor: "#1e1e1e",
              padding: 20,
              borderRadius: 16,
              border: "2px solid #22c55e",
              opacity: codeOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 18, marginBottom: 10 }}>
              PyTorch
            </div>
            <pre style={{ color: colors.white, fontSize: 18, margin: 0 }}>
              <span style={{ color: "#569cd6" }}>optimizer</span> = SGD(
              {"\n"}    model.parameters(),
              {"\n"}    lr=<span style={{ color: "#b5cea8" }}>0.01</span>,
              {"\n"}    <span style={{ color: "#ce9178" }}>momentum=0.9</span>
              {"\n"})
            </pre>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
