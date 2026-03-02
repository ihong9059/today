/**
 * Lesson 4-3: 텍스트 분류
 * 썸네일 컴포넌트
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson4_3Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, #1e3a5f 100%)`,
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
        Lesson 4-3
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

      {/* 텍스트 분류 시각화 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 30,
        }}
      >
        {/* 입력 텍스트 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "15px 25px",
            borderRadius: 12,
            fontSize: 28,
            color: colors.white,
            border: "3px solid white",
          }}
        >
          "재밌어요!"
        </div>

        <div style={{ fontSize: 36, color: colors.white }}>→</div>

        {/* Embedding */}
        <div
          style={{
            display: "flex",
            gap: 5,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 50,
                height: 70 - i * 10,
                backgroundColor: colors.level[4],
                borderRadius: 8,
                opacity: 1 - i * 0.2,
              }}
            />
          ))}
        </div>

        <div style={{ fontSize: 36, color: colors.white }}>→</div>

        {/* 출력 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              backgroundColor: "#22c55e",
              padding: "10px 20px",
              borderRadius: 10,
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            긍정 😊
          </div>
          <div
            style={{
              backgroundColor: "#ef4444",
              padding: "10px 20px",
              borderRadius: 10,
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
              opacity: 0.5,
            }}
          >
            부정 😢
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
          textShadow: "0 4px 20px rgba(249,115,22,0.5)",
          marginBottom: 15,
        }}
      >
        텍스트 분류
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 32,
          color: "#fb923c",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        nn.Embedding으로 감성 분석하기
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
        {["Tokenization", "nn.Embedding", "BCELoss"].map((keyword) => (
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
