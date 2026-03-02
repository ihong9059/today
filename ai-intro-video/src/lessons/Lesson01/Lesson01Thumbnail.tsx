import { AbsoluteFill } from "remotion";
import { colors } from "../../styles";

export const Lesson01Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* 배경 장식 */}
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

      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: colors.level[0],
          padding: "10px 25px",
          borderRadius: 30,
          fontSize: 24,
          fontWeight: "bold",
          color: colors.white,
        }}
      >
        레벨 0 · 레슨 1
      </div>

      {/* AI 첫걸음 로고 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 28 }}>🎓</span>
        <span style={{ fontSize: 24, fontWeight: "bold", color: colors.white }}>
          AI 첫걸음
        </span>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={{ textAlign: "center", zIndex: 10 }}>
        {/* 파이썬 아이콘 */}
        <div style={{ fontSize: 100, marginBottom: 20 }}>🐍</div>

        {/* 제목 */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: colors.white,
            marginBottom: 15,
            textShadow: `0 0 40px ${colors.level[0]}`,
          }}
        >
          Python 환경 설정
        </h1>

        {/* 부제목 */}
        <p
          style={{
            fontSize: 32,
            color: colors.gray[300],
            marginBottom: 30,
          }}
        >
          AI 학습의 첫 번째 단계
        </p>

        {/* 키워드 태그 */}
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
          }}
        >
          {[
            { text: "Python 설치", icon: "📦" },
            { text: "VS Code", icon: "💻" },
            { text: "Jupyter", icon: "📓" },
            { text: "가상환경", icon: "🔒" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: `${colors.gray[800]}cc`,
                padding: "10px 20px",
                borderRadius: 12,
                border: `2px solid ${colors.level[0]}`,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <span style={{ fontSize: 18, color: colors.white }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 시간 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          backgroundColor: colors.gray[800],
          padding: "8px 20px",
          borderRadius: 8,
          fontSize: 22,
          color: colors.white,
          fontWeight: "bold",
        }}
      >
        약 6분
      </div>

      {/* 무료 배지 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          backgroundColor: "#22c55e",
          padding: "8px 20px",
          borderRadius: 8,
          fontSize: 22,
          color: colors.white,
          fontWeight: "bold",
        }}
      >
        무료
      </div>
    </AbsoluteFill>
  );
};
