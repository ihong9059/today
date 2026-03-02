/**
 * Lesson 4-1: MNIST 손글씨 분류
 * YouTube 썸네일 (1280x720)
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson4_1Thumbnail: React.FC = () => {
  // 숫자 0-9
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Level 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: colors.level[4],
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 25,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Level 4
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
          border: `2px solid ${colors.level[4]}`,
        }}
      >
        Lesson 4-1
      </div>

      {/* 메인 타이틀 */}
      <h1
        style={{
          fontSize: 80,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 20,
          textShadow: "0 4px 30px rgba(249,115,22,0.6)",
        }}
      >
        MNIST 손글씨 분류
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 36,
          color: "#fb923c",
          fontWeight: "bold",
          marginBottom: 40,
        }}
      >
        딥러닝의 "Hello World"
      </h2>

      {/* MNIST 숫자 그리드 */}
      <div
        style={{
          display: "flex",
          gap: 15,
          marginBottom: 30,
        }}
      >
        {digits.map((digit) => (
          <div
            key={digit}
            style={{
              width: 60,
              height: 60,
              backgroundColor: colors.gray[800],
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: "bold",
              color: colors.white,
              border: `2px solid ${colors.level[4]}`,
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            {digit}
          </div>
        ))}
      </div>

      {/* 정확도 표시 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          padding: "15px 35px",
          borderRadius: 15,
          border: "2px solid #22c55e",
        }}
      >
        <span style={{ fontSize: 32, color: colors.white }}>🎯</span>
        <span style={{ fontSize: 36, color: "#22c55e", fontWeight: "bold" }}>
          98% 정확도 달성!
        </span>
      </div>

      {/* 하단 로고 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: colors.level[4],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
          }}
        >
          🧠
        </div>
        <span style={{ color: colors.gray[300], fontSize: 24 }}>
          AI 기초 교육 시리즈
        </span>
      </div>
    </AbsoluteFill>
  );
};
