import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

export const Scene6_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // 핵심 포인트들
  const points = [
    { text: "확률: 0~1 사이의 가능성", icon: "📊", color: "#22c55e" },
    { text: "조건부 확률: 조건 하에서의 확률", icon: "🔗", color: "#3b82f6" },
    { text: "베이즈 정리: 증거로 가설 업데이트", icon: "🎯", color: "#fbbf24" },
    { text: "AI: 확률로 결정을 내림", icon: "🤖", color: "#ec4899" },
  ];

  // 마무리 메시지
  const messageOpacity = interpolate(frame, [400, 420], [0, 1], { extrapolateRight: "clamp" });
  const messageScale = spring({ frame: frame - 400, fps, from: 0.8, to: 1, durationInFrames: 30 });

  // 다음 강의 예고
  const nextOpacity = interpolate(frame, [500, 520], [0, 1], { extrapolateRight: "clamp" });

  // 마무리
  const endOpacity = interpolate(frame, [600, 620], [0, 1], { extrapolateRight: "clamp" });

  // 펄스 효과
  const pulse = Math.sin(frame * 0.08) * 0.05 + 1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Audio src={staticFile("audio/lesson-2-6/scene6.mp3")} />

      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)",
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
        }}
      >
        <h2 style={{ fontSize: 52, color: "#a855f7", margin: 0 }}>📝 오늘 배운 내용</h2>
      </div>

      {/* 핵심 포인트 */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          right: "10%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 25,
          }}
        >
          {points.map((point, i) => {
            const pointOpacity = interpolate(
              frame,
              [60 + i * 60, 80 + i * 60],
              [0, 1],
              { extrapolateRight: "clamp" }
            );
            const pointX = spring({
              frame: frame - (60 + i * 60),
              fps,
              from: i % 2 === 0 ? -50 : 50,
              to: 0,
              durationInFrames: 30,
            });

            return (
              <div
                key={i}
                style={{
                  opacity: pointOpacity,
                  transform: `translateX(${pointX}px)`,
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, ${point.color}20, ${point.color}10)`,
                    border: `2px solid ${point.color}`,
                    borderRadius: 16,
                    padding: "20px 25px",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <span style={{ fontSize: 40 }}>{point.icon}</span>
                  <div>
                    <p style={{ fontSize: 24, color: "white", margin: 0 }}>
                      <span style={{ color: point.color, fontWeight: "bold" }}>{i + 1}.</span> {point.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: `translateX(-50%) scale(${messageScale * pulse})`,
          opacity: messageOpacity,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))",
            border: "3px solid #e879f9",
            borderRadius: 24,
            padding: "30px 60px",
            boxShadow: "0 0 40px rgba(168, 85, 247, 0.3)",
          }}
        >
          <p style={{ fontSize: 36, color: "white", margin: 0, textAlign: "center" }}>
            🌟 확률은 <span style={{ color: "#fbbf24" }}>AI가 세상을 이해하는 언어</span>입니다!
          </p>
        </div>
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: nextOpacity,
        }}
      >
        <div
          style={{
            background: "rgba(59, 130, 246, 0.15)",
            border: "1px solid #3b82f6",
            borderRadius: 12,
            padding: "15px 40px",
          }}
        >
          <p style={{ fontSize: 26, color: "#60a5fa", margin: 0 }}>
            📚 다음 강의: <span style={{ color: "white" }}>확률분포</span>
          </p>
        </div>
      </div>

      {/* 마무리 인사 */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: endOpacity,
        }}
      >
        <p style={{ fontSize: 36, color: "#22c55e", margin: 0 }}>
          수고하셨습니다! 👏
        </p>
      </div>

      {/* 확률 기호 장식 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          opacity: 0.3,
          transform: `translateY(${Math.sin(frame * 0.05) * 20}px)`,
        }}
      >
        <span style={{ fontSize: 60, color: "#a855f7" }}>P(A)</span>
      </div>

      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "5%",
          opacity: 0.3,
          transform: `translateY(${Math.cos(frame * 0.05) * 20}px)`,
        }}
      >
        <span style={{ fontSize: 60, color: "#3b82f6" }}>P(B|A)</span>
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
        Lesson 2-6
      </div>
    </AbsoluteFill>
  );
};
