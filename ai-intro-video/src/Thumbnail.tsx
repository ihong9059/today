import { AbsoluteFill } from "remotion";
import { colors } from "./styles";

export const Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.gray[900]} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.1,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${colors.primary} 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, ${colors.secondary} 0%, transparent 40%)
          `,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Badge */}
        <div
          style={{
            backgroundColor: colors.accent,
            color: colors.gray[900],
            padding: "8px 24px",
            borderRadius: 20,
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          무료 강의 🎁
        </div>

        {/* Logo */}
        <div style={{ fontSize: 80, marginBottom: 10 }}>🎓</div>

        {/* Title */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: colors.white,
            margin: 0,
            textAlign: "center",
            textShadow: `0 0 40px ${colors.primary}`,
          }}
        >
          AI 첫걸음
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 28,
            color: colors.primary,
            marginTop: 12,
            textAlign: "center",
          }}
        >
          AI를 시작하는 가장 쉬운 방법
        </p>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 30,
          }}
        >
          {[
            { icon: "📚", text: "10 레벨" },
            { icon: "🎯", text: "58 레슨" },
            { icon: "⏱️", text: "50시간+" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: `${colors.gray[800]}cc`,
                padding: "12px 20px",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.white,
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Level icons on sides */}
      <div
        style={{
          position: "absolute",
          left: 40,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {["🐍", "🧠", "📐", "🔥", "🔦"].map((icon, idx) => (
          <div
            key={idx}
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              backgroundColor: colors.level[idx as keyof typeof colors.level],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              opacity: 0.9,
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          right: 40,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {["🖼️", "🔄", "🤖", "⚡", "🚗"].map((icon, idx) => (
          <div
            key={idx}
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              backgroundColor: colors.level[(idx + 5) as keyof typeof colors.level],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              opacity: 0.9,
            }}
          >
            {icon}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
