/**
 * Scene 2: 경사하강법 직관
 * 산에서 내려가는 비유
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_Intuition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 산 시각화
  const mountainOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 설명 카드들
  const card1Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const card2Opacity = interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" });

  // 기울기 설명
  const gradientOpacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });

  // 결론
  const conclusionOpacity = interpolate(frame, [480, 510], [0, 1], { extrapolateRight: "clamp" });

  // 공 애니메이션
  const ballProgress = interpolate(frame, [100, 500], [0, 1], { extrapolateRight: "clamp" });

  // 산 경사면 위의 공 위치
  const getBallPosition = (t: number) => {
    // 곡선 y = x^2 형태의 간단한 포물선
    const x = 150 + t * 400;
    const normalizedT = (t - 0.5); // -0.5 ~ 0.5
    const y = 280 - 200 * (1 - normalizedT * normalizedT * 4);
    return { x, y: Math.max(80, y) };
  };

  const ballPos = getBallPosition(ballProgress);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[900],
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-2/scene2.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        🏔️ 핵심 아이디어: 산에서 내려가기
      </h1>

      {/* 산 시각화 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 30,
          opacity: mountainOpacity,
        }}
      >
        <svg width={700} height={300}>
          {/* 그리드 */}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={i}
              x1={100}
              y1={80 + i * 40}
              x2={600}
              y2={80 + i * 40}
              stroke={colors.gray[700]}
              strokeWidth={0.5}
              strokeDasharray="5,5"
            />
          ))}

          {/* 산 곡선 (포물선) */}
          <path
            d="M 100 280 Q 200 80 350 250 Q 500 80 600 280"
            stroke="#60a5fa"
            strokeWidth={4}
            fill="none"
          />

          {/* 방향 화살표 */}
          {ballProgress > 0.1 && ballProgress < 0.4 && (
            <path
              d={`M ${ballPos.x + 20} ${ballPos.y - 10} L ${ballPos.x + 50} ${ballPos.y + 30}`}
              stroke="#22c55e"
              strokeWidth={3}
              markerEnd="url(#arrowhead)"
            />
          )}

          {/* 화살표 마커 */}
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

          {/* 공 */}
          <circle
            cx={ballPos.x}
            cy={ballPos.y}
            r={15}
            fill="#f87171"
            filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))"
          />

          {/* 최저점 */}
          <circle cx={350} cy={250} r={8} fill="#22c55e" />
          <text x={350} y={280} fill="#22c55e" fontSize={16} textAnchor="middle">
            목표: 최솟값
          </text>
        </svg>
      </div>

      {/* 설명 카드들 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "25px 35px",
            borderRadius: 16,
            border: "2px solid #60a5fa",
            opacity: card1Opacity,
            maxWidth: 350,
          }}
        >
          <div style={{ color: "#60a5fa", fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
            🦶 한 걸음씩 이동
          </div>
          <div style={{ color: colors.gray[300], fontSize: 20 }}>
            현재 위치에서 가장 가파른 내리막 방향으로 이동
          </div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "25px 35px",
            borderRadius: 16,
            border: "2px solid #22c55e",
            opacity: card2Opacity,
            maxWidth: 350,
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
            📐 기울기(Gradient)
          </div>
          <div style={{ color: colors.gray[300], fontSize: 20 }}>
            내리막 방향을 알려주는 수학적 도구
          </div>
        </div>
      </div>

      {/* 기울기 설명 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: gradientOpacity,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#f87171", fontSize: 28, fontWeight: "bold" }}>기울기 양수 (+)</div>
          <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 8 }}>오른쪽이 높음</div>
          <div style={{ color: "#60a5fa", fontSize: 22, marginTop: 5 }}>← 왼쪽으로!</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold" }}>기울기 음수 (-)</div>
          <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 8 }}>왼쪽이 높음</div>
          <div style={{ color: "#60a5fa", fontSize: 22, marginTop: 5 }}>→ 오른쪽으로!</div>
        </div>
      </div>

      {/* 결론 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: conclusionOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#fbbf2420",
            border: "2px solid #fbbf24",
            padding: "15px 40px",
            borderRadius: 12,
          }}
        >
          <span style={{ color: "#fbbf24", fontSize: 28, fontWeight: "bold" }}>
            기울기의 반대 방향 = 손실이 줄어드는 방향!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
