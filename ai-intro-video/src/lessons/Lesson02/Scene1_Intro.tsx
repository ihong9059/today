import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L02_Scene1_Intro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 38초)
  // 0-10초: AI 첫걸음 인사
  // 10-25초: 왜 자료형을 알아야 하는가
  // 25-38초: 외우지 말고 이해하자

  const logoScale = spring({
    frame,
    fps: FPS,
    config: { damping: 12, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* 배경 장식 */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.level[0]}20 0%, transparent 60%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 메인 콘텐츠 */}
      <div
        style={{
          textAlign: "center",
          zIndex: 10,
          transform: `scale(${logoScale})`,
        }}
      >
        {/* 레벨 배지 */}
        <div
          style={{
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
            marginBottom: 30,
          }}
        >
          <span
            style={{
              backgroundColor: colors.level[0],
              padding: "12px 30px",
              borderRadius: 30,
              fontSize: 24,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            레벨 0 · 레슨 2
          </span>
        </div>

        {/* 아이콘 */}
        <div
          style={{
            opacity: interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" }),
            fontSize: 120,
            marginBottom: 30,
          }}
        >
          📦
        </div>

        {/* 제목 */}
        <h1
          style={{
            opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }),
            fontSize: 72,
            fontWeight: "bold",
            color: colors.white,
            marginBottom: 20,
          }}
        >
          변수와 자료형
        </h1>

        {/* 부제목 */}
        <p
          style={{
            opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            fontSize: 32,
            color: colors.gray[300],
            marginBottom: 40,
          }}
        >
          AI 내부에서는 모든 것이 숫자입니다
        </p>

        {/* 핵심 키워드 */}
        <div
          style={{
            opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            display: "flex",
            gap: 25,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { text: "int / float", icon: "🔢" },
            { text: "str / bool", icon: "📝" },
            { text: "list", icon: "📋" },
            { text: "dict", icon: "🗂️" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: colors.gray[800],
                padding: "15px 25px",
                borderRadius: 16,
                border: `2px solid ${colors.level[0]}`,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <span style={{ fontSize: 20, color: colors.white, fontFamily: "monospace" }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* AI 강조 메시지 */}
        <p
          style={{
            opacity: interpolate(
              frame,
              [durationInFrames - 300, durationInFrames - 200],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            fontSize: 28,
            color: "#fbbf24",
            marginTop: 50,
          }}
        >
          외우지 마세요. 이해하세요!
        </p>
      </div>
    </AbsoluteFill>
  );
};
