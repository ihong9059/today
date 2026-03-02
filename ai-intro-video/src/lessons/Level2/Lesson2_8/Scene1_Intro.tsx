import { AbsoluteFill, Audio, Sequence, useCurrentFrame, interpolate, staticFile } from "remotion";

const AUDIO_FILES = [
  { id: "intro_1", duration: 181 },
  { id: "intro_2", duration: 175 },
  { id: "intro_3", duration: 87 },
  { id: "intro_4", duration: 226 },
  { id: "intro_5", duration: 195 },
  { id: "intro_6", duration: 238 },
];

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();

  let currentStart = 0;
  const getAudioStart = (index: number) => {
    let start = 0;
    for (let i = 0; i < index; i++) {
      start += AUDIO_FILES[i].duration;
    }
    return start;
  };

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });

  // 통계 아이콘 애니메이션
  const dataIconScale = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  const chartIconScale = interpolate(frame, [130, 160], [0, 1], { extrapolateRight: "clamp" });
  const aiIconScale = interpolate(frame, [160, 190], [0, 1], { extrapolateRight: "clamp" });

  // 데이터 흐름 애니메이션
  const dataFlowProgress = interpolate(frame, [200, 800], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      {/* 배경 그라데이션 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
        }}
      />

      {/* 레슨 번호 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          background: "rgba(168, 85, 247, 0.3)",
          border: "2px solid #a855f7",
          borderRadius: 12,
          padding: "8px 20px",
          opacity: titleOpacity,
        }}
      >
        <span style={{ fontSize: 28, color: "white", fontWeight: "bold" }}>Lesson 2-8</span>
      </div>

      {/* 메인 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <h1 style={{ fontSize: 90, color: "#a855f7", margin: 0, fontWeight: "bold" }}>
          통계 기초
        </h1>
        <p style={{ fontSize: 42, color: "#c084fc", marginTop: 10, opacity: subtitleOpacity }}>
          Statistics Basics
        </p>
      </div>

      {/* 통계 개념 아이콘들 */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        {/* 데이터 수집 */}
        <div style={{ textAlign: "center", transform: `scale(${dataIconScale})` }}>
          <div
            style={{
              width: 120,
              height: 120,
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
            }}
          >
            📊
          </div>
          <p style={{ color: "#93c5fd", fontSize: 24, marginTop: 15 }}>데이터 수집</p>
        </div>

        {/* 분석 */}
        <div style={{ textAlign: "center", transform: `scale(${chartIconScale})` }}>
          <div
            style={{
              width: 120,
              height: 120,
              background: "linear-gradient(135deg, #a855f7, #7c3aed)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
            }}
          >
            📈
          </div>
          <p style={{ color: "#c084fc", fontSize: 24, marginTop: 15 }}>분석</p>
        </div>

        {/* 인사이트 */}
        <div style={{ textAlign: "center", transform: `scale(${aiIconScale})` }}>
          <div
            style={{
              width: 120,
              height: 120,
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
              boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)",
            }}
          >
            💡
          </div>
          <p style={{ color: "#86efac", fontSize: 24, marginTop: 15 }}>인사이트</p>
        </div>
      </div>

      {/* 데이터 흐름 시각화 */}
      <div style={{ position: "absolute", top: "70%", width: "100%", padding: "0 100px" }}>
        <svg width="100%" height="100" viewBox="0 0 1720 100">
          {/* 진행 바 배경 */}
          <rect x="60" y="40" width="1600" height="20" rx="10" fill="rgba(168, 85, 247, 0.2)" />

          {/* 진행 바 */}
          <rect
            x="60"
            y="40"
            width={1600 * dataFlowProgress}
            height="20"
            rx="10"
            fill="url(#progressGradient)"
          />

          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          {/* 단계 마커 */}
          <circle cx="60" cy="50" r="15" fill="#3b82f6" stroke="white" strokeWidth="3" />
          <text x="60" y="90" fill="#93c5fd" fontSize="18" textAnchor="middle">수집</text>

          <circle cx="593" cy="50" r="15" fill={dataFlowProgress > 0.33 ? "#a855f7" : "#374151"} stroke="white" strokeWidth="3" />
          <text x="593" y="90" fill="#c084fc" fontSize="18" textAnchor="middle">정리</text>

          <circle cx="1126" cy="50" r="15" fill={dataFlowProgress > 0.66 ? "#a855f7" : "#374151"} stroke="white" strokeWidth="3" />
          <text x="1126" y="90" fill="#c084fc" fontSize="18" textAnchor="middle">분석</text>

          <circle cx="1660" cy="50" r="15" fill={dataFlowProgress > 0.95 ? "#22c55e" : "#374151"} stroke="white" strokeWidth="3" />
          <text x="1660" y="90" fill="#86efac" fontSize="18" textAnchor="middle">활용</text>
        </svg>
      </div>

      {/* AI 활용 텍스트 */}
      {frame > 500 && (
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            width: "100%",
            textAlign: "center",
            opacity: interpolate(frame, [500, 550], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(168, 85, 247, 0.2)",
              border: "2px solid #a855f7",
              borderRadius: 16,
              padding: "15px 40px",
            }}
          >
            <span style={{ fontSize: 32, color: "#e879f9" }}>
              통계는 AI의 모든 단계에서 활용됩니다
            </span>
          </div>
        </div>
      )}

      {/* 오디오 */}
      {AUDIO_FILES.map((audio, index) => (
        <Sequence key={audio.id} from={getAudioStart(index)} durationInFrames={audio.duration}>
          <Audio src={staticFile(`audio/lesson-2-8/scene1/${audio.id}.mp3`)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
