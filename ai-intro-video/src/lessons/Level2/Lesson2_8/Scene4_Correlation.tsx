import { AbsoluteFill, Audio, Sequence, useCurrentFrame, interpolate, staticFile } from "remotion";

const AUDIO_FILES = [
  { id: "corr_1", duration: 98 },
  { id: "corr_2", duration: 213 },
  { id: "corr_3", duration: 154 },
  { id: "corr_4", duration: 168 },
  { id: "corr_5", duration: 166 },
  { id: "corr_6", duration: 160 },
  { id: "corr_7", duration: 142 },
  { id: "corr_8", duration: 199 },
  { id: "corr_9", duration: 183 },
  { id: "corr_10", duration: 185 },
  { id: "corr_11", duration: 239 },
  { id: "corr_12", duration: 157 },
];

const getAudioStart = (index: number) => {
  let start = 0;
  for (let i = 0; i < index; i++) {
    start += AUDIO_FILES[i].duration;
  }
  return start;
};

export const Scene4_Correlation: React.FC = () => {
  const frame = useCurrentFrame();

  // 양의 상관 (corr_3부터)
  const positiveStart = getAudioStart(2);
  // 음의 상관 (corr_6부터)
  const negativeStart = getAudioStart(5);
  // 무상관 (corr_9부터)
  const noCorrelationStart = getAudioStart(8);
  // 주의점 (corr_10부터)
  const cautionStart = getAudioStart(9);

  // 산점도 데이터 생성
  const generatePositiveData = () => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      const x = 50 + i * 15 + (Math.random() - 0.5) * 20;
      const y = 30 + i * 12 + (Math.random() - 0.5) * 30;
      points.push({ x: Math.min(350, x), y: Math.min(250, Math.max(30, y)) });
    }
    return points;
  };

  const generateNegativeData = () => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      const x = 50 + i * 15 + (Math.random() - 0.5) * 20;
      const y = 250 - i * 12 + (Math.random() - 0.5) * 30;
      points.push({ x: Math.min(350, x), y: Math.max(30, Math.min(250, y)) });
    }
    return points;
  };

  const generateNoCorrelationData = () => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      const x = 50 + Math.random() * 300;
      const y = 30 + Math.random() * 220;
      points.push({ x, y });
    }
    return points;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
        }}
      />

      {/* 섹션 타이틀 */}
      <div style={{ position: "absolute", top: 30, width: "100%", textAlign: "center" }}>
        <h2 style={{ fontSize: 52, color: "#3b82f6", margin: 0 }}>
          상관계수
        </h2>
        <p style={{ fontSize: 26, color: "#93c5fd", marginTop: 8 }}>
          Correlation Coefficient
        </p>
      </div>

      {/* 상관계수 척도 */}
      <div
        style={{
          position: "absolute",
          top: "14%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <svg width="800" height="80" viewBox="0 0 800 80">
          {/* 그라데이션 바 */}
          <defs>
            <linearGradient id="corrGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          <rect x="50" y="25" width="700" height="20" rx="10" fill="url(#corrGradient)" />

          {/* 눈금 */}
          <text x="50" y="65" fill="#ef4444" fontSize="20" textAnchor="middle">-1</text>
          <text x="400" y="65" fill="#6b7280" fontSize="20" textAnchor="middle">0</text>
          <text x="750" y="65" fill="#22c55e" fontSize="20" textAnchor="middle">+1</text>

          <text x="50" y="18" fill="#fca5a5" fontSize="14" textAnchor="middle">완벽한 음의 상관</text>
          <text x="400" y="18" fill="#9ca3af" fontSize="14" textAnchor="middle">무상관</text>
          <text x="750" y="18" fill="#86efac" fontSize="14" textAnchor="middle">완벽한 양의 상관</text>
        </svg>
      </div>

      {/* 세 가지 상관관계 그래프 */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {/* 양의 상관 */}
        <div
          style={{
            width: 400,
            background: frame >= positiveStart ? "rgba(34, 197, 94, 0.15)" : "rgba(55, 65, 81, 0.2)",
            border: frame >= positiveStart && frame < negativeStart ? "3px solid #22c55e" : "2px solid #4b5563",
            borderRadius: 16,
            padding: 20,
            opacity: interpolate(frame, [positiveStart, positiveStart + 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h3 style={{ fontSize: 28, color: "#22c55e", margin: 0, textAlign: "center" }}>
            양의 상관 (r ≈ +1)
          </h3>
          <svg width="360" height="280" viewBox="0 0 360 280" style={{ marginTop: 10 }}>
            {/* 축 */}
            <line x1="40" y1="250" x2="350" y2="250" stroke="#4b5563" strokeWidth="2" />
            <line x1="40" y1="250" x2="40" y2="20" stroke="#4b5563" strokeWidth="2" />
            <text x="350" y="270" fill="#9ca3af" fontSize="14">X</text>
            <text x="20" y="25" fill="#9ca3af" fontSize="14">Y</text>

            {/* 추세선 */}
            <line x1="50" y1="240" x2="340" y2="40" stroke="#22c55e" strokeWidth="3" strokeDasharray="8,4" />

            {/* 데이터 포인트 */}
            {generatePositiveData().map((point, i) => {
              const delay = i * 10;
              const opacity = interpolate(frame, [positiveStart + 50 + delay, positiveStart + 80 + delay], [0, 1], { extrapolateRight: "clamp" });
              return (
                <circle
                  key={i}
                  cx={point.x}
                  cy={250 - point.y}
                  r="8"
                  fill="#22c55e"
                  opacity={opacity}
                />
              );
            })}
          </svg>
          <p style={{ fontSize: 18, color: "#86efac", textAlign: "center", marginTop: 5 }}>
            예: 키 ↑ → 몸무게 ↑
          </p>
        </div>

        {/* 음의 상관 */}
        <div
          style={{
            width: 400,
            background: frame >= negativeStart ? "rgba(239, 68, 68, 0.15)" : "rgba(55, 65, 81, 0.2)",
            border: frame >= negativeStart && frame < noCorrelationStart ? "3px solid #ef4444" : "2px solid #4b5563",
            borderRadius: 16,
            padding: 20,
            opacity: interpolate(frame, [negativeStart, negativeStart + 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h3 style={{ fontSize: 28, color: "#ef4444", margin: 0, textAlign: "center" }}>
            음의 상관 (r ≈ -1)
          </h3>
          <svg width="360" height="280" viewBox="0 0 360 280" style={{ marginTop: 10 }}>
            {/* 축 */}
            <line x1="40" y1="250" x2="350" y2="250" stroke="#4b5563" strokeWidth="2" />
            <line x1="40" y1="250" x2="40" y2="20" stroke="#4b5563" strokeWidth="2" />
            <text x="350" y="270" fill="#9ca3af" fontSize="14">X</text>
            <text x="20" y="25" fill="#9ca3af" fontSize="14">Y</text>

            {/* 추세선 */}
            <line x1="50" y1="40" x2="340" y2="240" stroke="#ef4444" strokeWidth="3" strokeDasharray="8,4" />

            {/* 데이터 포인트 */}
            {generateNegativeData().map((point, i) => {
              const delay = i * 10;
              const opacity = interpolate(frame, [negativeStart + 50 + delay, negativeStart + 80 + delay], [0, 1], { extrapolateRight: "clamp" });
              return (
                <circle
                  key={i}
                  cx={point.x}
                  cy={250 - point.y}
                  r="8"
                  fill="#ef4444"
                  opacity={opacity}
                />
              );
            })}
          </svg>
          <p style={{ fontSize: 18, color: "#fca5a5", textAlign: "center", marginTop: 5 }}>
            예: 운동 ↑ → 체지방 ↓
          </p>
        </div>

        {/* 무상관 */}
        <div
          style={{
            width: 400,
            background: frame >= noCorrelationStart ? "rgba(107, 114, 128, 0.15)" : "rgba(55, 65, 81, 0.2)",
            border: frame >= noCorrelationStart ? "3px solid #6b7280" : "2px solid #4b5563",
            borderRadius: 16,
            padding: 20,
            opacity: interpolate(frame, [noCorrelationStart, noCorrelationStart + 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h3 style={{ fontSize: 28, color: "#9ca3af", margin: 0, textAlign: "center" }}>
            무상관 (r ≈ 0)
          </h3>
          <svg width="360" height="280" viewBox="0 0 360 280" style={{ marginTop: 10 }}>
            {/* 축 */}
            <line x1="40" y1="250" x2="350" y2="250" stroke="#4b5563" strokeWidth="2" />
            <line x1="40" y1="250" x2="40" y2="20" stroke="#4b5563" strokeWidth="2" />
            <text x="350" y="270" fill="#9ca3af" fontSize="14">X</text>
            <text x="20" y="25" fill="#9ca3af" fontSize="14">Y</text>

            {/* 데이터 포인트 */}
            {generateNoCorrelationData().map((point, i) => {
              const delay = i * 10;
              const opacity = interpolate(frame, [noCorrelationStart + 50 + delay, noCorrelationStart + 80 + delay], [0, 1], { extrapolateRight: "clamp" });
              return (
                <circle
                  key={i}
                  cx={point.x}
                  cy={250 - point.y}
                  r="8"
                  fill="#6b7280"
                  opacity={opacity}
                />
              );
            })}
          </svg>
          <p style={{ fontSize: 18, color: "#9ca3af", textAlign: "center", marginTop: 5 }}>
            선형 관계 없음
          </p>
        </div>
      </div>

      {/* 주의 사항 */}
      {frame >= cautionStart && (
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            width: "100%",
            textAlign: "center",
            opacity: interpolate(frame, [cautionStart, cautionStart + 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(251, 191, 36, 0.2)",
              border: "3px solid #fbbf24",
              borderRadius: 16,
              padding: "15px 40px",
            }}
          >
            <span style={{ fontSize: 26, color: "#fcd34d" }}>
              ⚠️ 상관관계 ≠ 인과관계!
            </span>
            <p style={{ fontSize: 20, color: "#fde68a", marginTop: 10, marginBottom: 0 }}>
              아이스크림 🍦 판매 ↑ & 익사 사고 ↑ → 둘 다 여름이 원인!
            </p>
          </div>
        </div>
      )}

      {/* 코드 */}
      {frame >= 200 && frame < cautionStart && (
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            width: "100%",
            textAlign: "center",
            opacity: interpolate(frame, [200, 250], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#1e293b",
              borderRadius: 12,
              padding: "15px 30px",
              fontFamily: "monospace",
            }}
          >
            <code style={{ color: "#3b82f6", fontSize: 24 }}>corr = np.corrcoef(x, y)[0, 1]</code>
          </div>
        </div>
      )}

      {/* 오디오 */}
      {AUDIO_FILES.map((audio, index) => (
        <Sequence key={audio.id} from={getAudioStart(index)} durationInFrames={audio.duration}>
          <Audio src={staticFile(`audio/lesson-2-8/scene4/${audio.id}.mp3`)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
