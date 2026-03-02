/**
 * Lesson 1-6: XOR 문제와 한계
 * 썸네일 컴포넌트 (1280x720)
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson1_6Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #78350f 30%, #7c2d12 70%, ${colors.gray[900]} 100%)`,
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
        Lesson 1-6
      </div>

      {/* Level 1 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          backgroundColor: "#f59e0b",
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 30,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Level 1
      </div>

      {/* XOR 좌표 시각화 */}
      <div
        style={{
          width: 280,
          height: 280,
          backgroundColor: colors.gray[800],
          borderRadius: 20,
          position: "relative",
          border: `4px solid ${colors.gray[600]}`,
          marginBottom: 30,
        }}
      >
        {/* 축 */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 200,
            height: 3,
            backgroundColor: colors.gray[500],
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 3,
            height: 200,
            backgroundColor: colors.gray[500],
          }}
        />

        {/* 점들 - (0,0) 빨강 */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 30,
            width: 35,
            height: 35,
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            border: "3px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          0
        </div>

        {/* (0,1) 녹색 */}
        <div
          style={{
            position: "absolute",
            bottom: 200,
            left: 30,
            width: 35,
            height: 35,
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            border: "3px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          1
        </div>

        {/* (1,0) 녹색 */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 200,
            width: 35,
            height: 35,
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            border: "3px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          1
        </div>

        {/* (1,1) 빨강 */}
        <div
          style={{
            position: "absolute",
            bottom: 200,
            left: 200,
            width: 35,
            height: 35,
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            border: "3px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          0
        </div>

        {/* X 표시 (분리 불가) */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <line
            x1="40"
            y1="140"
            x2="240"
            y2="140"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeDasharray="8,4"
            opacity={0.6}
          />
        </svg>

        {/* 불가능 표시 */}
        <div
          style={{
            position: "absolute",
            bottom: -15,
            right: -15,
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            color: colors.white,
            fontWeight: "bold",
            border: "3px solid white",
          }}
        >
          ✗
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
        XOR 문제와 한계
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 34,
          color: "#fcd34d",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
        }}
      >
        퍼셉트론이 해결할 수 없는 문제
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
            color: "#f59e0b",
          }}
        >
          선형 분리
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
          AI 겨울
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
          해결책 힌트
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
