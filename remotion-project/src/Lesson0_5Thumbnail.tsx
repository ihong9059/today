import React from "react";
import { AbsoluteFill } from "remotion";

const colors = {
  numpy: {
    primary: "#0ea5e9",
    secondary: "#06b6d4",
    accent: "#14b8a6",
    dark: "#0c4a6e",
  },
  white: "#ffffff",
  gray: {
    800: "#1e293b",
    900: "#0f172a",
  },
};

export const Lesson0_5Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.numpy.dark} 0%, ${colors.numpy.primary} 50%, ${colors.gray[900]} 100%)`,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* 배경 장식 */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.numpy.primary}40 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.numpy.secondary}30 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 50,
          padding: "15px 35px",
          background: `${colors.gray[900]}dd`,
          borderRadius: 20,
          border: `3px solid ${colors.numpy.primary}`,
          boxShadow: `0 0 30px ${colors.numpy.primary}60`,
        }}
      >
        <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>
          Level 0
        </span>
      </div>

      {/* 레슨 번호 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          right: 50,
          padding: "15px 35px",
          background: `linear-gradient(135deg, ${colors.numpy.primary} 0%, ${colors.numpy.secondary} 100%)`,
          borderRadius: 20,
          boxShadow: `0 0 40px ${colors.numpy.primary}80`,
        }}
      >
        <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>
          Lesson 5
        </span>
      </div>

      {/* 메인 아이콘 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 80,
          fontSize: 180,
        }}
      >
        🔢
      </div>

      {/* 메인 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: 80,
          right: 80,
        }}
      >
        <div
          style={{
            fontSize: 110,
            fontWeight: "bold",
            color: colors.white,
            textShadow: `0 0 40px ${colors.numpy.primary}, 0 4px 20px rgba(0,0,0,0.5)`,
            lineHeight: 1.2,
          }}
        >
          NumPy 기초
        </div>
        <div
          style={{
            fontSize: 48,
            color: colors.numpy.accent,
            marginTop: 20,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          AI의 데이터 언어, 텐서의 세계
        </div>
      </div>

      {/* 배열 시각화 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: 80,
          display: "flex",
          gap: 15,
        }}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            style={{
              width: 90,
              height: 90,
              backgroundColor: `${colors.numpy.primary}30`,
              border: `4px solid ${colors.numpy.primary}`,
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              fontWeight: "bold",
              color: colors.white,
              boxShadow: `0 0 20px ${colors.numpy.primary}40`,
            }}
          >
            {num}
          </div>
        ))}
      </div>

      {/* 핵심 키워드 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          right: 80,
          display: "flex",
          gap: 20,
        }}
      >
        {["배열", "텐서", "Reshape", "Broadcasting"].map((keyword) => (
          <div
            key={keyword}
            style={{
              padding: "12px 28px",
              backgroundColor: `${colors.gray[800]}dd`,
              borderRadius: 15,
              border: `2px solid ${colors.numpy.secondary}`,
              boxShadow: `0 0 15px ${colors.numpy.secondary}30`,
            }}
          >
            <span style={{ fontSize: 24, color: colors.white, fontWeight: 500 }}>
              {keyword}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
