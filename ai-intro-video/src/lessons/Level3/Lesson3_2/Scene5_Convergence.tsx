/**
 * Scene 5: 수렴 과정
 * 학습이 진행되는 모습
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_Convergence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 그래프 애니메이션
  const graphOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 단계별 설명
  const step1Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const step2Opacity = interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" });
  const step3Opacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });

  // 경고
  const warningOpacity = interpolate(frame, [530, 560], [0, 1], { extrapolateRight: "clamp" });

  // 학습 곡선 진행
  const curveProgress = interpolate(frame, [100, 600], [0, 1], { extrapolateRight: "clamp" });

  // 학습 곡선 포인트 생성
  const generateLearningCurve = (progress: number) => {
    const points = [];
    const numPoints = Math.floor(progress * 100);
    for (let i = 0; i <= numPoints; i++) {
      const x = 80 + i * 5;
      // 지수적 감소 + 약간의 노이즈
      const y = 80 + 200 * Math.exp(-i / 25) + Math.sin(i * 0.3) * 5;
      points.push({ x, y });
    }
    return points;
  };

  const curvePoints = generateLearningCurve(curveProgress);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[900],
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-2/scene5.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        📈 수렴 과정
      </h1>

      {/* 학습 곡선 그래프 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <svg
          width={600}
          height={300}
          style={{ opacity: graphOpacity }}
        >
          {/* 그리드 */}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={i}
              x1={80}
              y1={80 + i * 50}
              x2={580}
              y2={80 + i * 50}
              stroke={colors.gray[700]}
              strokeWidth={0.5}
              strokeDasharray="5,5"
            />
          ))}

          {/* Y축 */}
          <line x1={80} y1={60} x2={80} y2={280} stroke={colors.gray[500]} strokeWidth={2} />
          <text x={40} y={170} fill={colors.gray[400]} fontSize={16} textAnchor="middle" transform="rotate(-90, 40, 170)">
            손실 (Loss)
          </text>

          {/* X축 */}
          <line x1={80} y1={280} x2={580} y2={280} stroke={colors.gray[500]} strokeWidth={2} />
          <text x={330} y={295} fill={colors.gray[400]} fontSize={16} textAnchor="middle">
            학습 반복 (Epoch)
          </text>

          {/* 학습 곡선 */}
          {curvePoints.length > 1 && (
            <path
              d={`M ${curvePoints[0].x} ${curvePoints[0].y} ${curvePoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}`}
              stroke="#60a5fa"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* 현재 위치 점 */}
          {curvePoints.length > 0 && (
            <circle
              cx={curvePoints[curvePoints.length - 1].x}
              cy={curvePoints[curvePoints.length - 1].y}
              r={8}
              fill="#60a5fa"
            />
          )}

          {/* 수렴 영역 */}
          {curveProgress > 0.7 && (
            <rect
              x={420}
              y={75}
              width={160}
              height={40}
              fill="#22c55e20"
              stroke="#22c55e"
              strokeWidth={1}
              strokeDasharray="5,5"
              rx={5}
            />
          )}
        </svg>
      </div>

      {/* 단계별 설명 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "20px 25px",
            borderRadius: 12,
            opacity: step1Opacity,
            textAlign: "center",
            flex: 1,
            maxWidth: 250,
          }}
        >
          <div style={{ color: "#f87171", fontSize: 22, fontWeight: "bold" }}>① 초반</div>
          <div style={{ color: colors.gray[300], fontSize: 18, marginTop: 8 }}>
            손실 큼, 기울기 큼<br />큰 폭으로 업데이트
          </div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "20px 25px",
            borderRadius: 12,
            opacity: step2Opacity,
            textAlign: "center",
            flex: 1,
            maxWidth: 250,
          }}
        >
          <div style={{ color: "#fbbf24", fontSize: 22, fontWeight: "bold" }}>② 중반</div>
          <div style={{ color: colors.gray[300], fontSize: 18, marginTop: 8 }}>
            기울기 감소<br />업데이트 폭 줄어듦
          </div>
        </div>

        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "20px 25px",
            borderRadius: 12,
            opacity: step3Opacity,
            textAlign: "center",
            flex: 1,
            maxWidth: 250,
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 22, fontWeight: "bold" }}>③ 수렴</div>
          <div style={{ color: colors.gray[300], fontSize: 18, marginTop: 8 }}>
            손실 평평해짐<br />학습 완료!
          </div>
        </div>
      </div>

      {/* 경고 */}
      <div
        style={{
          backgroundColor: "#fbbf2420",
          border: "2px solid #fbbf24",
          padding: "20px 40px",
          borderRadius: 16,
          opacity: warningOpacity,
        }}
      >
        <div style={{ color: "#fbbf24", fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          ⚠️ 주의: 지역 최솟값
        </div>
        <div style={{ color: colors.gray[300], fontSize: 20 }}>
          전역 최솟값이 아닌 작은 골짜기에 빠질 수 있습니다.<br />
          다음 시간에 이를 해결하는 다양한 옵티마이저를 배웁니다!
        </div>
      </div>
    </AbsoluteFill>
  );
};
