/**
 * Lesson 3-3: 경사하강법 변형
 * YouTube 썸네일 컴포넌트
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson3_3Thumbnail: React.FC = () => {
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
        Lesson 3-3
      </div>

      {/* 옵티마이저 아이콘들 */}
      <div
        style={{
          display: "flex",
          gap: 25,
          marginTop: -30,
        }}
      >
        {[
          { name: "SGD", color: "#60a5fa" },
          { name: "Momentum", color: "#22c55e" },
          { name: "Adam", color: "#a855f7" },
        ].map((opt, i) => (
          <div
            key={i}
            style={{
              backgroundColor: `${opt.color}30`,
              border: `3px solid ${opt.color}`,
              padding: "12px 22px",
              borderRadius: 15,
            }}
          >
            <span style={{ color: opt.color, fontSize: 22, fontWeight: "bold" }}>
              {opt.name}
            </span>
          </div>
        ))}
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 85,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "0 4px 20px rgba(168,85,247,0.5)",
          marginTop: 30,
        }}
      >
        옵티마이저
      </h1>

      {/* 영문 부제 */}
      <h2
        style={{
          fontSize: 38,
          color: "#a855f7",
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        Optimization Algorithms
      </h2>

      {/* 키워드 */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 35,
        }}
      >
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
          관성
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
          적응적 학습률
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
        더 빠르고 똑똑한 학습! 🚀
      </div>
    </AbsoluteFill>
  );
};
