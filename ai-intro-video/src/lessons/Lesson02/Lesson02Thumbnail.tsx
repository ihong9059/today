import { AbsoluteFill } from "remotion";
import { colors } from "../../styles";

export const Lesson02Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 40%, #2d1b4e 70%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        overflow: "hidden",
      }}
    >
      {/* 배경 장식 */}
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.level[0]}30 0%, transparent 50%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 레벨 배지 - 상단 좌측 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 50,
          backgroundColor: colors.level[0],
          padding: "15px 35px",
          borderRadius: 40,
          fontSize: 32,
          fontWeight: "bold",
          color: colors.white,
          boxShadow: `0 4px 20px ${colors.level[0]}80`,
        }}
      >
        AI 첫걸음 0-2
      </div>

      {/* 메인 아이콘 */}
      <div
        style={{
          fontSize: 180,
          marginBottom: 20,
          filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
        }}
      >
        📦
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 100,
          fontWeight: "bold",
          color: colors.white,
          marginBottom: 20,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        변수와 자료형
      </h1>

      {/* 부제목 */}
      <p
        style={{
          fontSize: 40,
          color: colors.gray[300],
          marginBottom: 40,
        }}
      >
        AI 학습을 위한 Python 기초
      </p>

      {/* 자료형 아이콘들 */}
      <div
        style={{
          display: "flex",
          gap: 25,
          justifyContent: "center",
        }}
      >
        {[
          { icon: "🔢", text: "int/float", color: "#60a5fa" },
          { icon: "📝", text: "str/bool", color: "#a78bfa" },
          { icon: "📋", text: "list", color: "#fbbf24" },
          { icon: "🗂️", text: "dict", color: "#34d399" },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: colors.gray[800],
              padding: "20px 30px",
              borderRadius: 20,
              border: `3px solid ${item.color}`,
              display: "flex",
              alignItems: "center",
              gap: 15,
              boxShadow: `0 4px 15px ${item.color}40`,
            }}
          >
            <span style={{ fontSize: 40 }}>{item.icon}</span>
            <span style={{ fontSize: 26, color: item.color, fontWeight: "bold", fontFamily: "monospace" }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* 강조 문구 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          backgroundColor: "#fbbf2420",
          padding: "15px 35px",
          borderRadius: 20,
          border: "3px solid #fbbf24",
        }}
      >
        <span style={{ fontSize: 32, color: "#fbbf24", fontWeight: "bold" }}>
          외우지 말고 이해하세요!
        </span>
      </div>

      {/* 벡터/행렬 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "15px 25px",
            borderRadius: 15,
            border: `2px solid ${colors.primary}`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.primary }}>벡터 & 행렬</span>
        </div>
        <span style={{ fontSize: 40 }}>📐</span>
      </div>
    </AbsoluteFill>
  );
};
