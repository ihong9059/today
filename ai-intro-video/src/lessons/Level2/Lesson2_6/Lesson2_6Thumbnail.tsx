import { AbsoluteFill } from "remotion";

export const Lesson2_6Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0a1e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 배경 그라데이션 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.25) 0%, transparent 70%)",
        }}
      />

      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          background: "linear-gradient(135deg, #a855f7, #7c3aed)",
          padding: "12px 28px",
          borderRadius: 30,
        }}
      >
        <span style={{ fontSize: 28, color: "white", fontWeight: "bold" }}>Level 2</span>
      </div>

      {/* 레슨 번호 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          background: "rgba(168, 85, 247, 0.3)",
          border: "2px solid #a855f7",
          padding: "12px 28px",
          borderRadius: 30,
        }}
      >
        <span style={{ fontSize: 28, color: "#e879f9", fontWeight: "bold" }}>Lesson 6</span>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={{ textAlign: "center", zIndex: 1 }}>
        {/* 아이콘들 */}
        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 30 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)",
            }}
          >
            <span style={{ fontSize: 50 }}>🎲</span>
          </div>

          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(168, 85, 247, 0.5)",
            }}
          >
            <span style={{ fontSize: 60 }}>📊</span>
          </div>

          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)",
            }}
          >
            <span style={{ fontSize: 50 }}>🎯</span>
          </div>
        </div>

        {/* 타이틀 */}
        <h1
          style={{
            fontSize: 90,
            color: "white",
            margin: 0,
            textShadow: "0 0 40px rgba(168, 85, 247, 0.5)",
          }}
        >
          확률의 기초
        </h1>

        <p style={{ fontSize: 40, color: "#e879f9", marginTop: 15 }}>
          Probability Basics
        </p>

        {/* 핵심 공식 */}
        <div
          style={{
            marginTop: 40,
            background: "rgba(168, 85, 247, 0.2)",
            border: "2px solid #a855f7",
            borderRadius: 20,
            padding: "20px 50px",
            display: "inline-block",
          }}
        >
          <p style={{ fontSize: 50, color: "white", margin: 0, fontFamily: "serif" }}>
            P(H|E) = <span style={{ color: "#fbbf24" }}>P(E|H) × P(H)</span> / P(E)
          </p>
        </div>

        {/* 부제목 */}
        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            gap: 30,
          }}
        >
          {["조건부 확률", "베이즈 정리", "소프트맥스"].map((text, i) => (
            <div
              key={i}
              style={{
                background: "rgba(59, 130, 246, 0.2)",
                border: "1px solid #3b82f6",
                borderRadius: 12,
                padding: "10px 25px",
              }}
            >
              <span style={{ fontSize: 26, color: "#60a5fa" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 장식 요소들 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 60,
          fontSize: 50,
          color: "#a855f7",
          opacity: 0.5,
        }}
      >
        P(A)
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 60,
          fontSize: 50,
          color: "#22c55e",
          opacity: 0.5,
        }}
      >
        P(B|A)
      </div>
    </AbsoluteFill>
  );
};
