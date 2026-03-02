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

export const L04_Scene1_Intro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  const titleSpring = spring({
    frame,
    fps: FPS,
    config: { damping: 15, stiffness: 100 },
  });

  // Function blocks animation
  const functionBlocks = [
    { label: "신경망 층", delay: 60 },
    { label: "손실 계산", delay: 90 },
    { label: "활성화", delay: 120 },
    { label: "전체 모델", delay: 150 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        padding: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Level Badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
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
          레벨 0 · 레슨 4
        </span>
      </div>

      {/* Main Title */}
      <div
        style={{
          transform: `scale(${titleSpring})`,
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        <div style={{ fontSize: 100, marginBottom: 20 }}>🧩</div>
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: colors.white,
            margin: 0,
          }}
        >
          함수
        </h1>
        <p
          style={{
            fontSize: 36,
            color: "#f97316",
            marginTop: 20,
          }}
        >
          AI의 핵심 빌딩 블록
        </p>
      </div>

      {/* Function blocks */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginTop: 40,
        }}
      >
        {functionBlocks.map((block, idx) => {
          const blockOpacity = interpolate(
            frame,
            [block.delay, block.delay + 20],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          const blockY = interpolate(
            frame,
            [block.delay, block.delay + 20],
            [30, 0],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={idx}
              style={{
                opacity: blockOpacity,
                transform: `translateY(${blockY}px)`,
                backgroundColor: colors.gray[800],
                padding: "20px 30px",
                borderRadius: 16,
                border: `2px solid ${colors.level[0]}`,
              }}
            >
              <span style={{ color: colors.white, fontSize: 24 }}>
                {block.label}
              </span>
              <span style={{ color: "#22c55e", fontSize: 24, marginLeft: 10 }}>
                = 함수
              </span>
            </div>
          );
        })}
      </div>

      {/* Key message */}
      <div
        style={{
          opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" }),
          marginTop: 60,
          padding: "25px 50px",
          backgroundColor: "#22c55e20",
          borderRadius: 16,
          border: "2px solid #22c55e",
        }}
      >
        <p style={{ color: "#22c55e", fontSize: 32, margin: 0, fontWeight: "bold" }}>
          "AI = 함수들의 조합"
        </p>
      </div>

      {/* Input -> Output visualization */}
      <div
        style={{
          opacity: interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" }),
          marginTop: 50,
          display: "flex",
          alignItems: "center",
          gap: 30,
        }}
      >
        <div style={{
          backgroundColor: colors.gray[700],
          padding: "15px 30px",
          borderRadius: 12,
        }}>
          <span style={{ color: colors.white, fontSize: 24 }}>입력</span>
        </div>
        <span style={{ color: "#f97316", fontSize: 40 }}>→</span>
        <div style={{
          backgroundColor: colors.level[0],
          padding: "15px 30px",
          borderRadius: 12,
        }}>
          <span style={{ color: colors.white, fontSize: 24 }}>처리</span>
        </div>
        <span style={{ color: "#f97316", fontSize: 40 }}>→</span>
        <div style={{
          backgroundColor: colors.gray[700],
          padding: "15px 30px",
          borderRadius: 12,
        }}>
          <span style={{ color: colors.white, fontSize: 24 }}>출력</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
