/**
 * Scene 6: 손실 지형 (Loss Landscape)
 * 3D 지형 시각화 및 전역/지역 최솟값
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_LossLandscape: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 설명
  const descOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 3D 지형 애니메이션
  const landscapeOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });

  // 축 레이블
  const axisOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  // 포인트들
  const globalMinOpacity = interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" });
  const localMinOpacity = interpolate(frame, [380, 410], [0, 1], { extrapolateRight: "clamp" });

  // 결론
  const conclusionOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });

  // 지형 애니메이션 (시간에 따라 약간 움직임)
  const animOffset = Math.sin(frame * 0.02) * 5;

  // 손실 지형 곡선 생성 (다중 골짜기)
  const generateLandscape = () => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const x = 100 + i * 6;
      const normalizedX = (i - 50) / 20;
      // 두 개의 골짜기가 있는 지형
      const y = 200 - 80 * Math.exp(-normalizedX * normalizedX)
                - 40 * Math.exp(-Math.pow(normalizedX + 1.5, 2));
      points.push({ x, y: y + animOffset });
    }
    return points;
  };

  const landscapePoints = generateLandscape();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[900],
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-1/scene6.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          opacity: titleOpacity,
        }}
      >
        손실 지형 (Loss Landscape)
      </h1>

      {/* 설명 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
          opacity: descOpacity,
        }}
      >
        <span style={{ color: colors.gray[400], fontSize: 28 }}>
          가중치에 따른 손실값을 시각화한 것
        </span>
      </div>

      {/* 손실 지형 SVG */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <svg
          width={800}
          height={350}
          style={{ opacity: landscapeOpacity }}
        >
          {/* 배경 그리드 */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={100}
              y1={80 + i * 30}
              x2={700}
              y2={80 + i * 30}
              stroke={colors.gray[700]}
              strokeWidth={0.5}
              strokeDasharray="5,5"
            />
          ))}

          {/* Y축 (손실) */}
          <line x1={100} y1={50} x2={100} y2={300} stroke={colors.gray[500]} strokeWidth={2} />
          {/* X축 (가중치) */}
          <line x1={100} y1={300} x2={700} y2={300} stroke={colors.gray[500]} strokeWidth={2} />

          {/* 축 레이블 */}
          <g style={{ opacity: axisOpacity }}>
            <text x={50} y={180} fill={colors.gray[400]} fontSize={20} textAnchor="middle">
              손실
            </text>
            <text x={700} y={330} fill={colors.gray[400]} fontSize={20}>
              가중치
            </text>
          </g>

          {/* 손실 지형 곡선 */}
          <path
            d={`M ${landscapePoints[0].x} ${landscapePoints[0].y} ${landscapePoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}`}
            stroke={colors.level[3]}
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />

          {/* 지형 아래 그라데이션 채우기 */}
          <path
            d={`M ${landscapePoints[0].x} ${landscapePoints[0].y} ${landscapePoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')} L 700 300 L 100 300 Z`}
            fill="url(#lossGradient)"
            opacity={0.3}
          />

          <defs>
            <linearGradient id="lossGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.level[3]} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* 전역 최솟값 */}
          <g style={{ opacity: globalMinOpacity }}>
            <circle cx={400} cy={120 + animOffset} r={12} fill="#22c55e" />
            <text x={400} y={90} fill="#22c55e" fontSize={18} textAnchor="middle" fontWeight="bold">
              전역 최솟값
            </text>
            <text x={400} y={160 + animOffset} fill="#22c55e" fontSize={14} textAnchor="middle">
              Global Minimum
            </text>
          </g>

          {/* 지역 최솟값 */}
          <g style={{ opacity: localMinOpacity }}>
            <circle cx={220} cy={180 + animOffset} r={10} fill="#fbbf24" />
            <text x={220} y={150} fill="#fbbf24" fontSize={16} textAnchor="middle" fontWeight="bold">
              지역 최솟값
            </text>
            <text x={220} y={220 + animOffset} fill="#fbbf24" fontSize={12} textAnchor="middle">
              Local Minimum
            </text>
          </g>
        </svg>
      </div>

      {/* 설명 카드 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          marginTop: 20,
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "20px 30px",
            borderRadius: 12,
            border: "2px solid #22c55e",
            opacity: globalMinOpacity,
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
            🎯 전역 최솟값
          </div>
          <div style={{ color: colors.gray[300], fontSize: 18 }}>
            가장 낮은 곳 = 최적 성능
          </div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "20px 30px",
            borderRadius: 12,
            border: "2px solid #fbbf24",
            opacity: localMinOpacity,
          }}
        >
          <div style={{ color: "#fbbf24", fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
            ⚠️ 지역 최솟값
          </div>
          <div style={{ color: colors.gray[300], fontSize: 18 }}>
            함정! 더 좋은 곳을 못 찾음
          </div>
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
            backgroundColor: "#60a5fa20",
            border: "2px solid #60a5fa",
            padding: "15px 40px",
            borderRadius: 12,
          }}
        >
          <span style={{ color: "#60a5fa", fontSize: 28, fontWeight: "bold" }}>
            다음 시간: 경사하강법 - 이 지형에서 가장 낮은 곳을 찾아가는 알고리즘! 🏔️
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
