/**
 * Lesson 1-4: 퍼셉트론 학습
 * 썸네일 컴포넌트 (1280x720)
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson1_4Thumbnail: React.FC = () => {
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
        Lesson 1-4
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

      {/* 학습 과정 시각화 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 30,
        }}
      >
        {/* 단계 1: 예측 */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "#3b82f630",
            border: "3px solid #3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span style={{ fontSize: 28 }}>🎯</span>
          <span style={{ fontSize: 14, color: "#3b82f6", fontWeight: "bold" }}>예측</span>
        </div>

        <span style={{ fontSize: 36, color: colors.gray[400] }}>→</span>

        {/* 단계 2: 오차 */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "#ef444430",
            border: "3px solid #ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span style={{ fontSize: 28 }}>📊</span>
          <span style={{ fontSize: 14, color: "#ef4444", fontWeight: "bold" }}>오차</span>
        </div>

        <span style={{ fontSize: 36, color: colors.gray[400] }}>→</span>

        {/* 단계 3: 업데이트 */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "#22c55e30",
            border: "3px solid #22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span style={{ fontSize: 28 }}>🔧</span>
          <span style={{ fontSize: 14, color: "#22c55e", fontWeight: "bold" }}>업데이트</span>
        </div>

        <span style={{ fontSize: 36, color: colors.gray[400] }}>→</span>

        {/* 단계 4: 반복 */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "#8b5cf630",
            border: "3px solid #8b5cf6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span style={{ fontSize: 28 }}>🔄</span>
          <span style={{ fontSize: 14, color: "#8b5cf6", fontWeight: "bold" }}>반복</span>
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
        퍼셉트론 학습
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
        학습 규칙 · 가중치 업데이트 · 학습률
      </h2>

      {/* 핵심 공식 */}
      <div
        style={{
          backgroundColor: colors.gray[800] + "90",
          borderRadius: 15,
          padding: "15px 40px",
          fontFamily: "monospace",
          fontSize: 28,
          color: colors.primary[400],
        }}
      >
        w = w + η × error × input
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
