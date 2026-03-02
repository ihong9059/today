/**
 * Lesson 4-4: nn.Module 기초
 * 썸네일 컴포넌트
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson4_4Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a1a2e 50%, #16213e 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: colors.level[4],
          color: colors.white,
          padding: "8px 20px",
          borderRadius: 20,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Lesson 4-4
      </div>

      {/* Level 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          backgroundColor: colors.level[4],
          color: colors.white,
          padding: "8px 20px",
          borderRadius: 20,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Level 4
      </div>

      {/* nn.Module 계층 구조 시각화 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
          marginBottom: 40,
        }}
      >
        {/* nn.Module 최상위 */}
        <div
          style={{
            backgroundColor: colors.level[4],
            padding: "18px 50px",
            borderRadius: 15,
            fontSize: 36,
            fontWeight: "bold",
            color: colors.white,
            boxShadow: `0 0 30px ${colors.level[4]}80`,
          }}
        >
          nn.Module
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 30, color: colors.level[4] }}>↓</div>

        {/* 커스텀 모델 */}
        <div
          style={{
            backgroundColor: "#22c55e",
            padding: "15px 40px",
            borderRadius: 12,
            fontSize: 28,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          class MyModel
        </div>

        {/* 메서드들 */}
        <div
          style={{
            display: "flex",
            gap: 15,
            marginTop: 10,
          }}
        >
          <div
            style={{
              backgroundColor: colors.gray[700],
              padding: "10px 20px",
              borderRadius: 8,
              fontSize: 22,
              color: "#fbbf24",
              fontFamily: "monospace",
            }}
          >
            __init__()
          </div>
          <div
            style={{
              backgroundColor: colors.gray[700],
              padding: "10px 20px",
              borderRadius: 8,
              fontSize: 22,
              color: "#fbbf24",
              fontFamily: "monospace",
            }}
          >
            forward()
          </div>
        </div>
      </div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          textShadow: `0 4px 20px ${colors.level[4]}80`,
          marginBottom: 15,
        }}
      >
        nn.Module 기초
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 32,
          color: colors.level[4],
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        커스텀 모델의 기본 클래스
      </h2>

      {/* 키워드 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          display: "flex",
          gap: 15,
        }}
      >
        {["__init__", "forward", "parameters()"].map((keyword) => (
          <span
            key={keyword}
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: colors.white,
              padding: "8px 20px",
              borderRadius: 20,
              fontSize: 22,
            }}
          >
            {keyword}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
