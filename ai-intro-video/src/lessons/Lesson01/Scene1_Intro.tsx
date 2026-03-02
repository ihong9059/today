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

export const L01_Scene1_Intro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 20초)
  // 0-5초: AI 첫걸음 인사
  // 5-12초: 파이썬 환경 설정 소개
  // 12-20초: 파이썬이 AI에서 중요한 이유

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
            레벨 0 · 레슨 1
          </span>
        </div>

        {/* 파이썬 아이콘 */}
        <div
          style={{
            opacity: interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" }),
            fontSize: 120,
            marginBottom: 30,
          }}
        >
          🐍
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
          Python 환경 설정
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
          AI 학습의 첫 번째 단계
        </p>

        {/* 핵심 키워드 */}
        <div
          style={{
            opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            display: "flex",
            gap: 30,
            justifyContent: "center",
          }}
        >
          {[
            { text: "Python 설치", icon: "📦" },
            { text: "IDE 설정", icon: "💻" },
            { text: "Jupyter", icon: "📓" },
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
              <span style={{ fontSize: 22, color: colors.white }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* AI 강조 메시지 */}
        <p
          style={{
            opacity: interpolate(
              frame,
              [durationInFrames - 150, durationInFrames - 100],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            fontSize: 28,
            color: colors.primary,
            marginTop: 50,
          }}
        >
          파이썬은 AI·머신러닝 분야의 필수 언어입니다
        </p>
      </div>
    </AbsoluteFill>
  );
};
