/**
 * Scene 4: 경사하강법 소개
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_GradientDescent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 공 애니메이션 (산에서 내려오는 공)
  const ballProgress = interpolate(frame, [150, 600], [0, 1], { extrapolateRight: "clamp" });

  // 포물선 경로 따라 이동
  const ballX = 150 + ballProgress * 500;
  const ballY = 100 + Math.sin(ballProgress * Math.PI) * -150 + ballProgress * 200;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-2/scene4.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 30,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        AI에서의 미분: <span style={{ color: "#22c55e" }}>경사하강법</span>
      </h1>

      <div style={{ display: "flex", gap: 60, marginTop: 20 }}>
        {/* 왼쪽: 산 시각화 */}
        <div
          style={{
            flex: 1.2,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 40,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h2 style={{ fontSize: 36, color: "#fbbf24", marginBottom: 20 }}>
            산에서 가장 낮은 곳 찾기
          </h2>

          <svg width={700} height={350}>
            {/* 산 모양 (손실 함수) */}
            <path
              d="M 50 300 Q 200 50, 400 250 Q 550 100, 700 300"
              stroke="#a855f7"
              strokeWidth={6}
              fill="none"
            />

            {/* 최솟값 표시 */}
            <circle cx={400} cy={250} r={15} fill="#22c55e" opacity={interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" })} />
            <text x={410} y={290} fill="#22c55e" fontSize={24} fontWeight="bold" opacity={interpolate(frame, [430, 460], [0, 1], { extrapolateRight: "clamp" })}>
              최솟값!
            </text>

            {/* 공 (현재 위치) */}
            <circle
              cx={ballX}
              cy={Math.min(ballY, 250)}
              r={20}
              fill="#ef4444"
            />

            {/* 화살표 (기울기 방향) */}
            {ballProgress < 0.9 && (
              <g opacity={interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" })}>
                <line
                  x1={ballX + 30}
                  y1={Math.min(ballY, 250) - 10}
                  x2={ballX + 80}
                  y2={Math.min(ballY, 250) + 30}
                  stroke="#fbbf24"
                  strokeWidth={4}
                  markerEnd="url(#arrowhead)"
                />
              </g>
            )}

            {/* 화살표 마커 정의 */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
              </marker>
            </defs>
          </svg>

          <div
            style={{
              marginTop: 20,
              fontSize: 26,
              color: "#9ca3af",
              textAlign: "center",
              opacity: interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            기울기의 <span style={{ color: "#ef4444" }}>반대 방향</span>으로 이동 → 낮은 곳으로!
          </div>
        </div>

        {/* 오른쪽: 설명 */}
        <div
          style={{
            flex: 0.8,
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          {/* 핵심 개념 */}
          {[
            { icon: "📍", title: "현재 위치", desc: "손실 함수의 한 점", delay: 100 },
            { icon: "📐", title: "기울기 계산", desc: "미분으로 경사 측정", delay: 200 },
            { icon: "⬇️", title: "반대 방향 이동", desc: "경사 아래로 한 걸음", delay: 300 },
            { icon: "🔄", title: "반복", desc: "최솟값까지 계속", delay: 400 },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                padding: "25px 30px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: interpolate(frame, [item.delay, item.delay + 30], [0, 1], { extrapolateRight: "clamp" }),
                transform: `translateX(${interpolate(frame, [item.delay, item.delay + 30], [50, 0], { extrapolateRight: "clamp" })}px)`,
              }}
            >
              <span style={{ fontSize: 40 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 28, color: "#a855f7", fontWeight: "bold" }}>{item.title}</div>
                <div style={{ fontSize: 22, color: "#9ca3af" }}>{item.desc}</div>
              </div>
            </div>
          ))}

          {/* 왜 반대 방향? */}
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              borderRadius: 15,
              padding: "20px 25px",
              opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 24, color: "#22c55e", fontWeight: "bold" }}>
              💡 왜 반대 방향?
            </div>
            <div style={{ fontSize: 20, color: colors.white, marginTop: 10 }}>
              기울기 양수 = 오른쪽이 높음<br />
              → 낮은 곳(왼쪽)으로 가야함!
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
