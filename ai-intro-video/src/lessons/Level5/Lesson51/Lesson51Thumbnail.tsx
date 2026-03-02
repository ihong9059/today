/**
 * Lesson 5-1: 컴퓨터 비전 소개
 * YouTube 썸네일 컴포넌트
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson51Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #831843 50%, #1e3a5f 100%)`,
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
          backgroundColor: "#ec4899",
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 25,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Lesson 5-1
      </div>

      {/* Level 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          backgroundColor: "#ec4899",
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 25,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Level 5
      </div>

      {/* 아이콘 */}
      <div style={{ fontSize: 100, marginBottom: 20 }}>👁️</div>

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          textShadow: "0 4px 20px rgba(236,72,153,0.5)",
        }}
      >
        컴퓨터 비전 소개
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 32,
          color: "#f9a8d4",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        이미지가 숫자로 변하는 마법
      </h2>

      {/* 하단 키워드 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          gap: 20,
        }}
      >
        {["픽셀", "RGB", "텐서", "정규화"].map((keyword) => (
          <div
            key={keyword}
            style={{
              backgroundColor: colors.gray[800],
              padding: "12px 24px",
              borderRadius: 30,
              fontSize: 22,
              color: colors.white,
              border: "2px solid #ec4899",
              fontWeight: "bold",
            }}
          >
            {keyword}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
