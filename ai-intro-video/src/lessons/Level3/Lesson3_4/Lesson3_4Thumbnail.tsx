/**
 * Lesson 3-4: 순전파
 * YouTube 썸네일 컴포넌트
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson3_4Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: colors.level[3],
          color: colors.white,
          padding: "10px 25px",
          borderRadius: 25,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Level 3
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
        }}
      >
        Lesson 3-4
      </div>

      {/* 순전파 시각화 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginTop: -20,
        }}
      >
        <div
          style={{
            backgroundColor: "#22c55e",
            width: 60,
            height: 60,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: colors.white, fontSize: 26, fontWeight: "bold" }}>x</span>
        </div>
        <div style={{ color: "#60a5fa", fontSize: 36 }}>→</div>
        <div
          style={{
            backgroundColor: "#fbbf24",
            width: 70,
            height: 70,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: colors.gray[900], fontSize: 26, fontWeight: "bold" }}>h</span>
        </div>
        <div style={{ color: "#60a5fa", fontSize: 36 }}>→</div>
        <div
          style={{
            backgroundColor: "#a855f7",
            width: 60,
            height: 60,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: colors.white, fontSize: 26, fontWeight: "bold" }}>ŷ</span>
        </div>
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 85,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "0 4px 20px rgba(96,165,250,0.5)",
          marginTop: 30,
        }}
      >
        순전파
      </h1>

      {/* 영문 부제 */}
      <h2
        style={{
          fontSize: 38,
          color: "#60a5fa",
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        Forward Propagation
      </h2>

      {/* 키워드 */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 35,
        }}
      >
        <div
          style={{
            backgroundColor: "#60a5fa30",
            border: "2px solid #60a5fa",
            padding: "10px 25px",
            borderRadius: 10,
            color: "#60a5fa",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Wx + b
        </div>
        <div
          style={{
            backgroundColor: "#fbbf2430",
            border: "2px solid #fbbf24",
            padding: "10px 25px",
            borderRadius: 10,
            color: "#fbbf24",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          ReLU
        </div>
      </div>

      {/* 하단 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 30,
          color: "#fbbf24",
          fontWeight: "bold",
        }}
      >
        입력에서 출력으로! 🚀
      </div>
    </AbsoluteFill>
  );
};
