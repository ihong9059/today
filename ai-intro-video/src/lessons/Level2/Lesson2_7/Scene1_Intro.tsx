import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, from: -50, to: 0, durationInFrames: 30 });

  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });

  // 분포 그래프 등장
  const graphOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const graphScale = spring({ frame: frame - 60, fps, from: 0.5, to: 1, durationInFrames: 40 });

  // 설명 텍스트
  const desc1Opacity = interpolate(frame, [120, 140], [0, 1], { extrapolateRight: "clamp" });
  const desc2Opacity = interpolate(frame, [180, 200], [0, 1], { extrapolateRight: "clamp" });

  // 정규분포 곡선 애니메이션
  const curveProgress = interpolate(frame, [60, 150], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Audio src={staticFile("audio/lesson-2-7/scene1.mp3")} />

      {/* 배경 그라데이션 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)",
        }}
      />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "6%",
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h1 style={{ fontSize: 72, color: "#a855f7", margin: 0, fontWeight: "bold" }}>
          확률분포
        </h1>
        <p
          style={{
            fontSize: 36,
            color: "#e879f9",
            marginTop: 10,
            opacity: subtitleOpacity,
          }}
        >
          Probability Distributions
        </p>
      </div>

      {/* 정규분포 그래프 */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          left: "50%",
          transform: `translateX(-50%) scale(${graphScale})`,
          opacity: graphOpacity,
        }}
      >
        <svg width="600" height="300" viewBox="0 0 600 300">
          {/* 축 */}
          <line x1="50" y1="250" x2="550" y2="250" stroke="#a855f7" strokeWidth="2" />
          <line x1="50" y1="250" x2="50" y2="30" stroke="#a855f7" strokeWidth="2" />

          {/* 정규분포 곡선 */}
          <path
            d={`M 50 250 ${Array.from({ length: 100 }, (_, i) => {
              const x = 50 + (i * 5);
              const normalX = (x - 300) / 80;
              const y = 250 - 200 * Math.exp(-normalX * normalX / 2);
              return `L ${x} ${y}`;
            }).join(' ')}`}
            fill="none"
            stroke="#e879f9"
            strokeWidth="3"
            strokeDasharray={500 * curveProgress}
            strokeDashoffset={0}
          />

          {/* 평균선 */}
          <line
            x1="300"
            y1="50"
            x2="300"
            y2="250"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity={interpolate(frame, [100, 120], [0, 0.8], { extrapolateRight: "clamp" })}
          />
          <text
            x="305"
            y="70"
            fill="#fbbf24"
            fontSize="18"
            opacity={interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" })}
          >
            μ (평균)
          </text>
        </svg>
      </div>

      {/* 설명 텍스트 */}
      <div
        style={{
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: desc1Opacity,
        }}
      >
        <div
          style={{
            background: "rgba(168, 85, 247, 0.2)",
            border: "2px solid #a855f7",
            borderRadius: 16,
            padding: "20px 40px",
            marginBottom: 20,
          }}
        >
          <p style={{ fontSize: 28, color: "white", margin: 0 }}>
            확률분포: 가능한 모든 결과와 그 확률을 보여주는 함수
          </p>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "78%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: desc2Opacity,
        }}
      >
        <p style={{ fontSize: 24, color: "#c084fc", margin: 0 }}>
          AI에서 데이터의 패턴을 이해하는 핵심 도구입니다!
        </p>
      </div>

      {/* 레슨 번호 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          fontSize: 24,
          color: "#a855f7",
          opacity: 0.7,
        }}
      >
        Lesson 2-7
      </div>
    </AbsoluteFill>
  );
};
