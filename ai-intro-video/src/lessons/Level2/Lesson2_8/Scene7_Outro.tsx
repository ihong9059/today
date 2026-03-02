import { AbsoluteFill, Audio, Sequence, useCurrentFrame, interpolate, staticFile } from "remotion";

const AUDIO_FILES = [
  { id: "outro_1", duration: 82 },
  { id: "outro_2", duration: 181 },
  { id: "outro_3", duration: 142 },
  { id: "outro_4", duration: 157 },
  { id: "outro_5", duration: 222 },
  { id: "outro_6", duration: 193 },
  { id: "outro_7", duration: 292 },
  { id: "outro_8", duration: 134 },
  { id: "outro_9", duration: 217 },
  { id: "outro_10", duration: 87 },
];

const getAudioStart = (index: number) => {
  let start = 0;
  for (let i = 0; i < index; i++) {
    start += AUDIO_FILES[i].duration;
  }
  return start;
};

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const summaryItems = [
    { title: "중심 경향", desc: "평균, 중앙값, 최빈값", color: "#3b82f6", start: getAudioStart(1) },
    { title: "산포 측정", desc: "분산, 표준편차", color: "#ec4899", start: getAudioStart(2) },
    { title: "상관계수", desc: "-1 ~ +1 선형 관계", color: "#22c55e", start: getAudioStart(3) },
    { title: "정규화/표준화", desc: "0~1 또는 μ=0, σ=1", color: "#f59e0b", start: getAudioStart(4) },
  ];

  // Level 2 완료 시점 (outro_6 시작)
  const completionStart = getAudioStart(5);
  // Level 3 예고 (outro_9 시작)
  const level3Start = getAudioStart(8);

  const celebrationScale = interpolate(
    frame,
    [completionStart, completionStart + 30, completionStart + 60, completionStart + 90],
    [0, 1.2, 1, 1],
    { extrapolateRight: "clamp" }
  );

  // 파티클 애니메이션
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 1920,
    y: -50 - Math.random() * 100,
    delay: i * 5,
    speed: 2 + Math.random() * 3,
    size: 15 + Math.random() * 20,
    emoji: ["🎉", "✨", "🎊", "⭐", "🌟"][Math.floor(Math.random() * 5)],
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
        }}
      />

      {/* 파티클 (완료 후) */}
      {frame >= completionStart &&
        particles.map((p, i) => {
          const yOffset = ((frame - completionStart - p.delay) * p.speed) % (1080 + 150);
          if (frame < completionStart + p.delay) return null;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: p.x,
                top: yOffset - 50,
                fontSize: p.size,
                opacity: 0.8,
              }}
            >
              {p.emoji}
            </div>
          );
        })}

      {/* 정리 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <h2 style={{ fontSize: 52, color: "#a855f7", margin: 0 }}>
          정리
        </h2>
      </div>

      {/* 요약 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {summaryItems.map((item, i) => {
          const cardOpacity = interpolate(frame, [item.start, item.start + 40], [0, 1], { extrapolateRight: "clamp" });

          return (
            <div
              key={i}
              style={{
                width: 260,
                background: `rgba(${item.color === "#3b82f6" ? "59, 130, 246" : item.color === "#ec4899" ? "236, 72, 153" : item.color === "#22c55e" ? "34, 197, 94" : "245, 158, 11"}, 0.15)`,
                border: `3px solid ${item.color}`,
                borderRadius: 16,
                padding: 20,
                textAlign: "center",
                opacity: cardOpacity,
              }}
            >
              <h3 style={{ fontSize: 26, color: item.color, margin: 0 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 20, color: "#d1d5db", marginTop: 10 }}>
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Level 2 완료 축하 */}
      {frame >= completionStart && (
        <div
          style={{
            position: "absolute",
            top: "42%",
            width: "100%",
            textAlign: "center",
            transform: `scale(${celebrationScale})`,
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.1))",
              border: "4px solid #22c55e",
              borderRadius: 24,
              padding: "30px 60px",
            }}
          >
            <p style={{ fontSize: 72, margin: 0 }}>🎉</p>
            <h2 style={{ fontSize: 48, color: "#22c55e", margin: "15px 0 0" }}>
              Level 2 완료!
            </h2>
            <p style={{ fontSize: 26, color: "#86efac", marginTop: 10 }}>
              수학 기초를 모두 마스터했습니다!
            </p>
          </div>
        </div>
      )}

      {/* Level 2 과목들 */}
      {frame >= completionStart + 100 && (
        <div
          style={{
            position: "absolute",
            top: "68%",
            width: "100%",
            textAlign: "center",
            opacity: interpolate(frame, [completionStart + 100, completionStart + 150], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {["함수", "미분", "편미분", "연쇄법칙", "벡터/행렬", "확률", "확률분포", "통계"].map((topic, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(168, 85, 247, 0.2)",
                  border: "2px solid #a855f7",
                  borderRadius: 10,
                  padding: "8px 16px",
                }}
              >
                <span style={{ fontSize: 20, color: "#c084fc" }}>{topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Level 3 예고 */}
      {frame >= level3Start && (
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            width: "100%",
            textAlign: "center",
            opacity: interpolate(frame, [level3Start, level3Start + 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(239, 68, 68, 0.2)",
              border: "3px solid #ef4444",
              borderRadius: 16,
              padding: "15px 40px",
            }}
          >
            <span style={{ fontSize: 28, color: "#fca5a5" }}>
              🔥 Next: Level 3 - 경사하강법 & 역전파
            </span>
          </div>
        </div>
      )}

      {/* 오디오 */}
      {AUDIO_FILES.map((audio, index) => (
        <Sequence key={audio.id} from={getAudioStart(index)} durationInFrames={audio.duration}>
          <Audio src={staticFile(`audio/lesson-2-8/scene7/${audio.id}.mp3`)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
