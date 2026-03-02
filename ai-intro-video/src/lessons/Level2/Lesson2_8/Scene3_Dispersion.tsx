import { AbsoluteFill, Audio, Sequence, useCurrentFrame, interpolate, staticFile } from "remotion";

const AUDIO_FILES = [
  { id: "disp_1", duration: 170 },
  { id: "disp_2", duration: 177 },
  { id: "disp_3", duration: 184 },
  { id: "disp_4", duration: 219 },
  { id: "disp_5", duration: 208 },
  { id: "disp_6", duration: 213 },
  { id: "disp_7", duration: 206 },
  { id: "disp_8", duration: 122 },
  { id: "disp_9", duration: 258 },
  { id: "disp_10", duration: 182 },
  { id: "disp_11", duration: 262 },
];

const getAudioStart = (index: number) => {
  let start = 0;
  for (let i = 0; i < index; i++) {
    start += AUDIO_FILES[i].duration;
  }
  return start;
};

export const Scene3_Dispersion: React.FC = () => {
  const frame = useCurrentFrame();

  // 분산 설명 (disp_2부터)
  const varianceStart = getAudioStart(1);
  // 표준편차 설명 (disp_7부터)
  const stdStart = getAudioStart(6);

  // 데이터 시각화
  const dataA = [70, 75, 80, 85, 90]; // 분산 작음
  const dataB = [50, 65, 80, 95, 110]; // 분산 큼
  const meanA = dataA.reduce((a, b) => a + b) / dataA.length;
  const meanB = dataB.reduce((a, b) => a + b) / dataB.length;

  const animProgress = interpolate(frame, [100, 400], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
        }}
      />

      {/* 섹션 타이틀 */}
      <div style={{ position: "absolute", top: 40, width: "100%", textAlign: "center" }}>
        <h2 style={{ fontSize: 56, color: "#ec4899", margin: 0 }}>
          산포 측정
        </h2>
        <p style={{ fontSize: 28, color: "#f9a8d4", marginTop: 10 }}>
          Dispersion Measures
        </p>
      </div>

      {/* 두 개의 데이터 비교 */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        {/* 데이터 A - 분산 작음 */}
        <div style={{ width: 450 }}>
          <h3 style={{ fontSize: 32, color: "#22c55e", textAlign: "center", marginBottom: 20 }}>
            데이터 A (분산 작음)
          </h3>
          <svg width="450" height="150" viewBox="0 0 450 150">
            {/* 평균선 */}
            <line x1="225" y1="20" x2="225" y2="130" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5,5" />
            <text x="225" y="145" fill="#fbbf24" fontSize="14" textAnchor="middle">평균: {meanA}</text>

            {/* 데이터 포인트 */}
            {dataA.map((val, i) => {
              const x = 25 + ((val - 50) / 60) * 400;
              const delay = i * 30;
              const pointOpacity = interpolate(frame, [100 + delay, 130 + delay], [0, 1], { extrapolateRight: "clamp" });
              return (
                <g key={i} opacity={pointOpacity}>
                  <circle cx={x} cy="75" r="15" fill="#22c55e" />
                  <text x={x} y="80" fill="white" fontSize="14" textAnchor="middle">{val}</text>
                </g>
              );
            })}
          </svg>
          <p style={{ fontSize: 22, color: "#86efac", textAlign: "center", marginTop: 10 }}>
            평균 근처에 모여 있음
          </p>
        </div>

        {/* 데이터 B - 분산 큼 */}
        <div style={{ width: 450 }}>
          <h3 style={{ fontSize: 32, color: "#ef4444", textAlign: "center", marginBottom: 20 }}>
            데이터 B (분산 큼)
          </h3>
          <svg width="450" height="150" viewBox="0 0 450 150">
            {/* 평균선 */}
            <line x1="225" y1="20" x2="225" y2="130" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5,5" />
            <text x="225" y="145" fill="#fbbf24" fontSize="14" textAnchor="middle">평균: {meanB}</text>

            {/* 데이터 포인트 */}
            {dataB.map((val, i) => {
              const x = 25 + ((val - 50) / 60) * 400;
              const delay = i * 30;
              const pointOpacity = interpolate(frame, [100 + delay, 130 + delay], [0, 1], { extrapolateRight: "clamp" });
              return (
                <g key={i} opacity={pointOpacity}>
                  <circle cx={x} cy="75" r="15" fill="#ef4444" />
                  <text x={x} y="80" fill="white" fontSize="14" textAnchor="middle">{val}</text>
                </g>
              );
            })}
          </svg>
          <p style={{ fontSize: 22, color: "#fca5a5", textAlign: "center", marginTop: 10 }}>
            평균에서 멀리 퍼져 있음
          </p>
        </div>
      </div>

      {/* 분산과 표준편차 설명 */}
      <div
        style={{
          position: "absolute",
          top: "52%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* 분산 */}
        <div
          style={{
            width: 480,
            background: frame >= varianceStart ? "rgba(236, 72, 153, 0.2)" : "rgba(55, 65, 81, 0.3)",
            border: frame >= varianceStart ? "3px solid #ec4899" : "2px solid #4b5563",
            borderRadius: 20,
            padding: 25,
            opacity: interpolate(frame, [varianceStart, varianceStart + 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h3 style={{ fontSize: 36, color: "#ec4899", margin: 0, textAlign: "center" }}>
            분산 (Variance)
          </h3>

          {/* 수식 */}
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div
              style={{
                background: "rgba(0,0,0,0.4)",
                borderRadius: 12,
                padding: 20,
                display: "inline-block",
              }}
            >
              <span style={{ fontSize: 28, color: "#f9a8d4" }}>
                Var = Σ(xᵢ - μ)² / n
              </span>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 20, color: "#d1d5db", lineHeight: 1.6 }}>
              • 각 값에서 평균을 뺌<br />
              • 차이를 제곱 (음수 방지)<br />
              • 평균을 구함
            </p>
          </div>

          {frame >= varianceStart + 200 && (
            <div
              style={{
                marginTop: 15,
                background: "#1e293b",
                borderRadius: 8,
                padding: 12,
                fontFamily: "monospace",
                textAlign: "center",
                opacity: interpolate(frame, [varianceStart + 200, varianceStart + 250], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <code style={{ color: "#ec4899", fontSize: 22 }}>np.var(data)</code>
            </div>
          )}
        </div>

        {/* 표준편차 */}
        <div
          style={{
            width: 480,
            background: frame >= stdStart ? "rgba(168, 85, 247, 0.2)" : "rgba(55, 65, 81, 0.3)",
            border: frame >= stdStart ? "3px solid #a855f7" : "2px solid #4b5563",
            borderRadius: 20,
            padding: 25,
            opacity: interpolate(frame, [stdStart, stdStart + 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h3 style={{ fontSize: 36, color: "#a855f7", margin: 0, textAlign: "center" }}>
            표준편차 (Std Dev)
          </h3>

          {/* 수식 */}
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div
              style={{
                background: "rgba(0,0,0,0.4)",
                borderRadius: 12,
                padding: 20,
                display: "inline-block",
              }}
            >
              <span style={{ fontSize: 28, color: "#c084fc" }}>
                σ = √Var = √(Σ(xᵢ - μ)² / n)
              </span>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 20, color: "#d1d5db", lineHeight: 1.6 }}>
              • 분산의 제곱근<br />
              • 원래 데이터와 같은 단위<br />
              • 해석이 더 직관적
            </p>
          </div>

          {frame >= stdStart + 200 && (
            <div
              style={{
                marginTop: 15,
                background: "#1e293b",
                borderRadius: 8,
                padding: 12,
                fontFamily: "monospace",
                textAlign: "center",
                opacity: interpolate(frame, [stdStart + 200, stdStart + 250], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <code style={{ color: "#a855f7", fontSize: 22 }}>np.std(data)</code>
            </div>
          )}
        </div>
      </div>

      {/* 예시 설명 */}
      {frame >= stdStart + 300 && (
        <div
          style={{
            position: "absolute",
            bottom: "6%",
            width: "100%",
            textAlign: "center",
            opacity: interpolate(frame, [stdStart + 300, stdStart + 350], [0, 1], { extrapolateRight: "clamp" }),
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
            <span style={{ fontSize: 28, color: "#e879f9" }}>
              예: 키의 표준편차가 5cm → 대부분 평균에서 5cm 이내
            </span>
          </div>
        </div>
      )}

      {/* 오디오 */}
      {AUDIO_FILES.map((audio, index) => (
        <Sequence key={audio.id} from={getAudioStart(index)} durationInFrames={audio.duration}>
          <Audio src={staticFile(`audio/lesson-2-8/scene3/${audio.id}.mp3`)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
