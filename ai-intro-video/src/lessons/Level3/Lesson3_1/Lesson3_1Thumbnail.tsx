/**
 * Lesson 3-1: 손실 함수
 * YouTube 썸네일 컴포넌트
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson3_1Thumbnail: React.FC = () => {
  // 손실 지형 곡선 생성
  const generateLossCurve = () => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const x = 50 + i * 5;
      const normalizedX = (i - 50) / 20;
      const y = 400 - 150 * Math.exp(-normalizedX * normalizedX)
                - 60 * Math.exp(-Math.pow(normalizedX + 1.5, 2));
      points.push({ x, y });
    }
    return points;
  };

  const curvePoints = generateLossCurve();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #4c1d1d 50%, #1e1b4b 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: colors.level[3],
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 25,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Level 3
      </div>

      {/* 레슨 번호 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          backgroundColor: colors.gray[800],
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 25,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Lesson 3-1
      </div>

      {/* 손실 지형 그래프 */}
      <svg
        width={600}
        height={300}
        style={{
          position: "absolute",
          top: 100,
          opacity: 0.6,
        }}
      >
        <path
          d={`M ${curvePoints[0].x} ${curvePoints[0].y} ${curvePoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}`}
          stroke={colors.level[3]}
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
        />
        <circle cx={350} cy={250} r={15} fill="#22c55e" />
      </svg>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 90,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "0 4px 20px rgba(239,68,68,0.5)",
          marginTop: 50,
        }}
      >
        손실 함수
      </h1>

      {/* 영문 부제 */}
      <h2
        style={{
          fontSize: 40,
          color: "#f87171",
          fontWeight: "bold",
          marginTop: 15,
        }}
      >
        Loss Function
      </h2>

      {/* 키워드 */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 40,
        }}
      >
        <div
          style={{
            backgroundColor: "#60a5fa30",
            border: "2px solid #60a5fa",
            padding: "10px 25px",
            borderRadius: 10,
            color: "#60a5fa",
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          MSE
        </div>
        <div
          style={{
            backgroundColor: "#a855f730",
            border: "2px solid #a855f7",
            padding: "10px 25px",
            borderRadius: 10,
            color: "#a855f7",
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          Cross-Entropy
        </div>
        <div
          style={{
            backgroundColor: "#22c55e30",
            border: "2px solid #22c55e",
            padding: "10px 25px",
            borderRadius: 10,
            color: "#22c55e",
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          Loss Landscape
        </div>
      </div>

      {/* 하단 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 32,
          color: "#fbbf24",
          fontWeight: "bold",
        }}
      >
        모델이 얼마나 틀렸는지 측정하는 방법!
      </div>
    </AbsoluteFill>
  );
};
