/**
 * Lesson 3-2: 경사하강법 기본
 * YouTube 썸네일 컴포넌트
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson3_2Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
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
        Lesson 3-2
      </div>

      {/* 산 그래프 */}
      <svg
        width={500}
        height={200}
        style={{
          position: "absolute",
          top: 120,
          opacity: 0.6,
        }}
      >
        {/* 산 곡선 */}
        <path
          d="M 30 180 Q 150 30 250 150 Q 350 30 470 180"
          stroke="#60a5fa"
          strokeWidth={5}
          fill="none"
        />
        {/* 공 */}
        <circle cx={120} cy={80} r={15} fill="#f87171" />
        {/* 화살표 */}
        <path d="M 140 100 L 200 150" stroke="#22c55e" strokeWidth={4} markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
          </marker>
        </defs>
        {/* 최저점 */}
        <circle cx={250} cy={150} r={10} fill="#22c55e" />
      </svg>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 85,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "0 4px 20px rgba(59,130,246,0.5)",
          marginTop: 80,
        }}
      >
        경사하강법
      </h1>

      {/* 영문 부제 */}
      <h2
        style={{
          fontSize: 38,
          color: "#60a5fa",
          fontWeight: "bold",
          marginTop: 15,
        }}
      >
        Gradient Descent
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
            backgroundColor: "#f8717130",
            border: "2px solid #f87171",
            padding: "10px 25px",
            borderRadius: 10,
            color: "#f87171",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          기울기
        </div>
        <div
          style={{
            backgroundColor: "#fbbf2430",
            border: "2px solid #fbbf24",
            padding: "10px 25px",
            borderRadius: 10,
            color: "#fbbf24",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          학습률
        </div>
        <div
          style={{
            backgroundColor: "#22c55e30",
            border: "2px solid #22c55e",
            padding: "10px 25px",
            borderRadius: 10,
            color: "#22c55e",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          수렴
        </div>
      </div>

      {/* 하단 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 30,
          color: "#fbbf24",
          fontWeight: "bold",
        }}
      >
        손실을 최소화하는 핵심 알고리즘!
      </div>
    </AbsoluteFill>
  );
};
