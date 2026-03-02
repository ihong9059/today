/**
 * Lesson 1-7: 다층 퍼셉트론
 * 썸네일 컴포넌트 (1280x720)
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson1_7Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 30%, #0f172a 70%, ${colors.gray[900]} 100%)`,
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
        Lesson 1-7
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

      {/* 다층 네트워크 시각화 */}
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        {/* 입력층 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: 20,
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(59,130,246,0.5)",
              }}
            >
              x{i}
            </div>
          ))}
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 36, color: colors.gray[500] }}>→</div>

        {/* 은닉층 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                backgroundColor: "#a855f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: 18,
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(168,85,247,0.5)",
              }}
            >
              h{i}
            </div>
          ))}
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 36, color: colors.gray[500] }}>→</div>

        {/* 출력층 */}
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.white,
            fontSize: 20,
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(34,197,94,0.5)",
          }}
        >
          y
        </div>

        {/* XOR 성공 표시 */}
        <div
          style={{
            marginLeft: 20,
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            color: colors.white,
            fontWeight: "bold",
            border: "3px solid white",
          }}
        >
          ✓
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
        다층 퍼셉트론
      </h1>

      {/* 부제목 */}
      <h2
        style={{
          fontSize: 34,
          color: "#60a5fa",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
        }}
      >
        Multi-Layer Perceptron (MLP)
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
            color: "#a855f7",
          }}
        >
          은닉층
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
          XOR 해결
        </div>
        <div
          style={{
            backgroundColor: colors.gray[800] + "90",
            borderRadius: 12,
            padding: "12px 25px",
            fontSize: 22,
            color: "#f59e0b",
          }}
        >
          딥러닝 기초
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
