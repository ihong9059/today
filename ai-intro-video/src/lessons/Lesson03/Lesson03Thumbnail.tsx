import { AbsoluteFill } from "remotion";
import { colors } from "../../styles";

export const Lesson03Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a2f4a 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* 배경 원형 */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.level[0]}30 0%, transparent 60%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 반복문 시각화 - 원형 화살표 */}
      <div style={{ position: "absolute" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 350 + i * 80,
              height: 350 + i * 80,
              borderRadius: "50%",
              border: `3px dashed ${colors.level[0]}60`,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>

      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
        }}
      >
        <span
          style={{
            backgroundColor: colors.level[0],
            padding: "12px 24px",
            borderRadius: 30,
            fontSize: 28,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          레벨 0 · 레슨 3
        </span>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={{ textAlign: "center", zIndex: 10 }}>
        {/* 아이콘 */}
        <div style={{ fontSize: 120, marginBottom: 20 }}>🔄</div>

        {/* 제목 */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: colors.white,
            margin: 0,
            marginBottom: 20,
          }}
        >
          조건문과 반복문
        </h1>

        {/* 부제목 */}
        <p
          style={{
            fontSize: 42,
            color: "#f97316",
            margin: 0,
            fontWeight: "bold",
          }}
        >
          AI 학습의 심장 ❤️
        </p>

        {/* 키워드 */}
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          {["for / while", "Epoch", "Early Stop"].map((text, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: colors.gray[800],
                padding: "12px 24px",
                borderRadius: 30,
                border: `2px solid ${colors.level[0]}`,
              }}
            >
              <span
                style={{
                  color: colors.white,
                  fontSize: 24,
                  fontFamily: "monospace",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
