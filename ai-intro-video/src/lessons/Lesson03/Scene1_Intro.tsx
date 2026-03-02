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

export const L03_Scene1_Intro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  const logoScale = spring({
    frame,
    fps: FPS,
    config: { damping: 12, stiffness: 80 },
  });

  // 심장 박동 애니메이션
  const heartbeat = Math.sin(frame * 0.15) * 0.1 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a2f4a 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* 배경 원형 장식 */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.level[0]}20 0%, transparent 60%)`,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${heartbeat})`,
        }}
      />

      {/* 반복문 시각화 - 원형 화살표 */}
      <div
        style={{
          position: "absolute",
          opacity: interpolate(frame, [60, 90], [0, 0.3], { extrapolateRight: "clamp" }),
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 400 + i * 100,
              height: 400 + i * 100,
              borderRadius: "50%",
              border: `2px dashed ${colors.level[0]}`,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${frame * (2 - i * 0.3)}deg)`,
            }}
          />
        ))}
      </div>

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
            레벨 0 · 레슨 3
          </span>
        </div>

        {/* 아이콘 - 심장 박동 */}
        <div
          style={{
            opacity: interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" }),
            fontSize: 120,
            marginBottom: 30,
            transform: `scale(${heartbeat})`,
          }}
        >
          🔄
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
          조건문과 반복문
        </h1>

        {/* 부제목 */}
        <p
          style={{
            opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" }),
            fontSize: 36,
            color: "#f97316",
            marginBottom: 40,
            fontWeight: "bold",
          }}
        >
          AI 학습의 심장 ❤️
        </p>

        {/* 핵심 키워드 */}
        <div
          style={{
            opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" }),
            display: "flex",
            gap: 25,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { text: "for / while", icon: "🔁" },
            { text: "if / else", icon: "🔀" },
            { text: "Epoch", icon: "📊" },
            { text: "Early Stop", icon: "⏹️" },
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

        {/* 핵심 메시지 */}
        <p
          style={{
            opacity: interpolate(
              frame,
              [durationInFrames - 400, durationInFrames - 300],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            fontSize: 28,
            color: "#fbbf24",
            marginTop: 50,
          }}
        >
          모든 딥러닝 학습은 반복문 안에서 일어납니다!
        </p>
      </div>
    </AbsoluteFill>
  );
};
