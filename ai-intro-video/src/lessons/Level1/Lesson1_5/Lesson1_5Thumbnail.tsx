/**
 * Lesson 1-5: AND, OR, NOT 게이트
 * 썸네일 컴포넌트 (1280x720)
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson1_5Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 30%, #312e81 70%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      {/* 레슨 번호 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: colors.primary[500],
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 30,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Lesson 1-5
      </div>

      {/* Level 1 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          backgroundColor: "#22c55e",
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 30,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Level 1
      </div>

      {/* 3대 게이트 시각화 */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginBottom: 40,
        }}
      >
        {/* AND 게이트 */}
        <div
          style={{
            width: 140,
            height: 100,
            backgroundColor: "#3b82f630",
            border: "4px solid #3b82f6",
            borderRadius: "0 50px 50px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span style={{ fontSize: 32, fontWeight: "bold", color: "#3b82f6" }}>AND</span>
          <span style={{ fontSize: 14, color: "#93c5fd" }}>둘 다 참</span>
        </div>

        {/* OR 게이트 */}
        <div
          style={{
            width: 140,
            height: 100,
            backgroundColor: "#22c55e30",
            border: "4px solid #22c55e",
            borderRadius: "15px 50px 50px 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span style={{ fontSize: 32, fontWeight: "bold", color: "#22c55e" }}>OR</span>
          <span style={{ fontSize: 14, color: "#86efac" }}>하나라도 참</span>
        </div>

        {/* NOT 게이트 */}
        <div
          style={{
            width: 140,
            height: 100,
            backgroundColor: "#ef444430",
            border: "4px solid #ef4444",
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span style={{ fontSize: 32, fontWeight: "bold", color: "#ef4444" }}>NOT</span>
          <span style={{ fontSize: 14, color: "#fca5a5" }}>반전</span>
        </div>
      </div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 15,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        AND, OR, NOT 게이트
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 34,
          color: colors.primary[300],
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
        }}
      >
        퍼셉트론으로 논리 연산 구현하기
      </h2>

      {/* 핵심 내용 */}
      <div
        style={{
          display: "flex",
          gap: 20,
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800] + "90",
            borderRadius: 12,
            padding: "12px 25px",
            fontSize: 22,
            color: "#3b82f6",
          }}
        >
          진리표
        </div>
        <div
          style={{
            backgroundColor: colors.gray[800] + "90",
            borderRadius: 12,
            padding: "12px 25px",
            fontSize: 22,
            color: "#22c55e",
          }}
        >
          가중치 설정
        </div>
        <div
          style={{
            backgroundColor: colors.gray[800] + "90",
            borderRadius: 12,
            padding: "12px 25px",
            fontSize: 22,
            color: "#ef4444",
          }}
        >
          실제 구현
        </div>
      </div>

      {/* 시리즈 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          color: colors.gray[400],
          fontSize: 22,
        }}
      >
        AI 기초 교육 시리즈
      </div>
    </AbsoluteFill>
  );
};
