import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

export const Scene6_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ frame, fps, from: 0.8, to: 1, durationInFrames: 30 });

  // 요약 포인트들
  const point1Opacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" });
  const point2Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });
  const point3Opacity = interpolate(frame, [140, 170], [0, 1], { extrapolateRight: "clamp" });
  const point4Opacity = interpolate(frame, [190, 220], [0, 1], { extrapolateRight: "clamp" });

  // Level 2 완료 축하
  const celebrationOpacity = interpolate(frame, [280, 320], [0, 1], { extrapolateRight: "clamp" });
  const celebrationScale = spring({ frame: frame - 280, fps, from: 0.5, to: 1, durationInFrames: 40 });

  // 다음 레벨 안내
  const nextLevelOpacity = interpolate(frame, [380, 420], [0, 1], { extrapolateRight: "clamp" });

  // 수고 메시지
  const endOpacity = interpolate(frame, [450, 490], [0, 1], { extrapolateRight: "clamp" });

  // 반짝이는 효과
  const sparkle = Math.sin(frame * 0.15) * 0.3 + 0.7;

  const summaryPoints = [
    { num: "1", text: "확률분포: 모든 결과와 확률을 나타내는 함수", color: "#a855f7" },
    { num: "2", text: "이산 분포(정해진 값) vs 연속 분포(연속적인 값)", color: "#ec4899" },
    { num: "3", text: "정규분포: 평균과 표준편차로 정의되는 종 모양 곡선", color: "#3b82f6" },
    { num: "4", text: "AI: 가중치 초기화, 생성 모델 등에서 활용", color: "#22c55e" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Audio src={staticFile("audio/lesson-2-7/scene6.mp3")} />

      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
        }}
      />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <h2 style={{ fontSize: 52, color: "#a855f7", margin: 0 }}>오늘 배운 내용 정리</h2>
      </div>

      {/* 요약 포인트들 */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
        }}
      >
        {summaryPoints.map((point, i) => {
          const opacities = [point1Opacity, point2Opacity, point3Opacity, point4Opacity];
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginBottom: 18,
                opacity: opacities[i],
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${point.color}, ${point.color}88)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: "bold",
                  color: "white",
                  boxShadow: `0 0 20px ${point.color}44`,
                }}
              >
                {point.num}
              </div>
              <p style={{ color: "white", fontSize: 24, margin: 0, flex: 1 }}>{point.text}</p>
            </div>
          );
        })}
      </div>

      {/* Level 2 완료 축하 */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: `translateX(-50%) scale(${celebrationScale})`,
          opacity: celebrationOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))",
            border: "3px solid #e879f9",
            borderRadius: 24,
            padding: "25px 60px",
            boxShadow: `0 0 ${30 * sparkle}px rgba(168, 85, 247, 0.4)`,
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 10 }}>🎉</div>
          <h3 style={{ fontSize: 36, color: "#fbbf24", margin: 0 }}>
            레벨 2 수학 기초 완료!
          </h3>
          <p style={{ fontSize: 22, color: "#e879f9", marginTop: 10 }}>
            Level 2: Math Foundations - Complete!
          </p>
        </div>
      </div>

      {/* 다음 레벨 안내 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: nextLevelOpacity,
        }}
      >
        <div
          style={{
            background: "rgba(59, 130, 246, 0.2)",
            border: "2px solid #3b82f6",
            borderRadius: 16,
            padding: "15px 40px",
          }}
        >
          <p style={{ color: "white", fontSize: 24, margin: 0, textAlign: "center" }}>
            🚀 다음 레벨에서는 더 깊은 내용을 배워볼 거예요!
          </p>
        </div>
      </div>

      {/* 수고 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "6%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: endOpacity,
        }}
      >
        <p
          style={{
            fontSize: 32,
            color: "#22c55e",
            margin: 0,
            textAlign: "center",
            textShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
          }}
        >
          수고하셨습니다! 👏
        </p>
      </div>

      {/* 레슨 번호 */}
      <div style={{ position: "absolute", bottom: 30, right: 40, fontSize: 24, color: "#a855f7", opacity: 0.7 }}>
        Lesson 2-7
      </div>
    </AbsoluteFill>
  );
};
