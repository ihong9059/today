/**
 * Lesson 4-2: 이미지 분류 CNN
 * 썸네일 컴포넌트
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson4_2Thumbnail: React.FC = () => {
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
        Lesson 4-2
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

      {/* CNN 시각화 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 30,
        }}
      >
        {/* 입력 이미지 */}
        <div
          style={{
            width: 100,
            height: 100,
            background: "linear-gradient(45deg, #ef4444, #22c55e, #3b82f6)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            border: "3px solid white",
          }}
        >
          🐱
        </div>

        <div style={{ fontSize: 36, color: colors.white }}>→</div>

        {/* Conv 레이어 */}
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
                width: 60,
                height: 80 - i * 10,
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
            backgroundColor: "#22c55e",
            padding: "15px 25px",
            borderRadius: 12,
            color: colors.white,
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          CAT
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
        이미지 분류 CNN
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
        합성곱 신경망으로 CIFAR-10 분류하기
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
        {["Conv2d", "MaxPool2d", "CIFAR-10"].map((keyword) => (
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
