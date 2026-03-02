import { AbsoluteFill, Audio, Sequence, useCurrentFrame, interpolate, staticFile } from "remotion";

const AUDIO_FILES = [
  { id: "norm_1", duration: 131 },
  { id: "norm_2", duration: 152 },
  { id: "norm_3", duration: 203 },
  { id: "norm_4", duration: 173 },
  { id: "norm_5", duration: 213 },
  { id: "norm_6", duration: 217 },
  { id: "norm_7", duration: 252 },
  { id: "norm_8", duration: 172 },
  { id: "norm_9", duration: 171 },
  { id: "norm_10", duration: 229 },
  { id: "norm_11", duration: 118 },
  { id: "norm_12", duration: 217 },
  { id: "norm_13", duration: 229 },
  { id: "norm_14", duration: 159 },
];

const getAudioStart = (index: number) => {
  let start = 0;
  for (let i = 0; i < index; i++) {
    start += AUDIO_FILES[i].duration;
  }
  return start;
};

export const Scene5_Normalization: React.FC = () => {
  const frame = useCurrentFrame();

  // Min-Max 정규화 (norm_3부터)
  const minmaxStart = getAudioStart(2);
  // Z-score 표준화 (norm_7부터)
  const zscoreStart = getAudioStart(6);
  // 왜 필요한가 (norm_11부터)
  const whyStart = getAudioStart(10);

  // 예시 데이터
  const originalData = [60, 70, 80, 90, 100];
  const minVal = Math.min(...originalData);
  const maxVal = Math.max(...originalData);
  const normalizedData = originalData.map(v => ((v - minVal) / (maxVal - minVal)).toFixed(2));

  const mean = originalData.reduce((a, b) => a + b) / originalData.length;
  const variance = originalData.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / originalData.length;
  const std = Math.sqrt(variance);
  const standardizedData = originalData.map(v => ((v - mean) / std).toFixed(2));

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)",
        }}
      />

      {/* 섹션 타이틀 */}
      <div style={{ position: "absolute", top: 30, width: "100%", textAlign: "center" }}>
        <h2 style={{ fontSize: 52, color: "#22c55e", margin: 0 }}>
          정규화와 표준화
        </h2>
        <p style={{ fontSize: 26, color: "#86efac", marginTop: 8 }}>
          Normalization & Standardization
        </p>
      </div>

      {/* 두 방법 비교 */}
      <div
        style={{
          position: "absolute",
          top: "14%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* Min-Max 정규화 */}
        <div
          style={{
            width: 550,
            background: frame >= minmaxStart ? "rgba(34, 197, 94, 0.15)" : "rgba(55, 65, 81, 0.2)",
            border: frame >= minmaxStart && frame < zscoreStart ? "3px solid #22c55e" : "2px solid #4b5563",
            borderRadius: 20,
            padding: 25,
            opacity: interpolate(frame, [minmaxStart, minmaxStart + 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h3 style={{ fontSize: 32, color: "#22c55e", margin: 0, textAlign: "center" }}>
            Min-Max 정규화
          </h3>

          {/* 수식 */}
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div
              style={{
                background: "rgba(0,0,0,0.4)",
                borderRadius: 12,
                padding: 15,
                display: "inline-block",
              }}
            >
              <span style={{ fontSize: 26, color: "#86efac" }}>
                x' = (x - x<sub>min</sub>) / (x<sub>max</sub> - x<sub>min</sub>)
              </span>
            </div>
          </div>

          {/* 결과 범위 */}
          <div style={{ marginTop: 15, textAlign: "center" }}>
            <span style={{ fontSize: 22, color: "#fbbf24" }}>결과: 0 ~ 1 사이</span>
          </div>

          {/* 변환 예시 */}
          {frame >= minmaxStart + 150 && (
            <div
              style={{
                marginTop: 20,
                background: "rgba(0,0,0,0.3)",
                borderRadius: 12,
                padding: 15,
                opacity: interpolate(frame, [minmaxStart + 150, minmaxStart + 200], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <p style={{ fontSize: 18, color: "#9ca3af", marginBottom: 10 }}>시험 점수 변환:</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>원본</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 5 }}>
                    {originalData.map((v, i) => (
                      <span key={i} style={{ fontSize: 18, color: "#ef4444", background: "rgba(239, 68, 68, 0.2)", padding: "4px 8px", borderRadius: 6 }}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
                <span style={{ fontSize: 28, color: "#fbbf24" }}>→</span>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>정규화</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 5 }}>
                    {normalizedData.map((v, i) => (
                      <span key={i} style={{ fontSize: 18, color: "#22c55e", background: "rgba(34, 197, 94, 0.2)", padding: "4px 8px", borderRadius: 6 }}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 코드 */}
          {frame >= minmaxStart + 300 && (
            <div
              style={{
                marginTop: 15,
                background: "#1e293b",
                borderRadius: 8,
                padding: 12,
                fontFamily: "monospace",
                textAlign: "center",
                opacity: interpolate(frame, [minmaxStart + 300, minmaxStart + 350], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <code style={{ color: "#22c55e", fontSize: 16 }}>
                (x - x.min()) / (x.max() - x.min())
              </code>
            </div>
          )}
        </div>

        {/* Z-score 표준화 */}
        <div
          style={{
            width: 550,
            background: frame >= zscoreStart ? "rgba(168, 85, 247, 0.15)" : "rgba(55, 65, 81, 0.2)",
            border: frame >= zscoreStart ? "3px solid #a855f7" : "2px solid #4b5563",
            borderRadius: 20,
            padding: 25,
            opacity: interpolate(frame, [zscoreStart, zscoreStart + 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h3 style={{ fontSize: 32, color: "#a855f7", margin: 0, textAlign: "center" }}>
            Z-score 표준화
          </h3>

          {/* 수식 */}
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div
              style={{
                background: "rgba(0,0,0,0.4)",
                borderRadius: 12,
                padding: 15,
                display: "inline-block",
              }}
            >
              <span style={{ fontSize: 26, color: "#c084fc" }}>
                z = (x - μ) / σ
              </span>
            </div>
          </div>

          {/* 결과 범위 */}
          <div style={{ marginTop: 15, textAlign: "center" }}>
            <span style={{ fontSize: 22, color: "#fbbf24" }}>결과: 평균 0, 표준편차 1</span>
          </div>

          {/* 변환 예시 */}
          {frame >= zscoreStart + 150 && (
            <div
              style={{
                marginTop: 20,
                background: "rgba(0,0,0,0.3)",
                borderRadius: 12,
                padding: 15,
                opacity: interpolate(frame, [zscoreStart + 150, zscoreStart + 200], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <p style={{ fontSize: 18, color: "#9ca3af", marginBottom: 10 }}>시험 점수 변환:</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>원본</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 5 }}>
                    {originalData.map((v, i) => (
                      <span key={i} style={{ fontSize: 18, color: "#ef4444", background: "rgba(239, 68, 68, 0.2)", padding: "4px 8px", borderRadius: 6 }}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
                <span style={{ fontSize: 28, color: "#fbbf24" }}>→</span>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>표준화</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 5 }}>
                    {standardizedData.map((v, i) => (
                      <span key={i} style={{ fontSize: 18, color: "#a855f7", background: "rgba(168, 85, 247, 0.2)", padding: "4px 8px", borderRadius: 6 }}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 코드 */}
          {frame >= zscoreStart + 300 && (
            <div
              style={{
                marginTop: 15,
                background: "#1e293b",
                borderRadius: 8,
                padding: 12,
                fontFamily: "monospace",
                textAlign: "center",
                opacity: interpolate(frame, [zscoreStart + 300, zscoreStart + 350], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <code style={{ color: "#a855f7", fontSize: 16 }}>
                (x - x.mean()) / x.std()
              </code>
            </div>
          )}
        </div>
      </div>

      {/* 왜 필요한가? */}
      {frame >= whyStart && (
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            width: "100%",
            textAlign: "center",
            opacity: interpolate(frame, [whyStart, whyStart + 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(251, 191, 36, 0.15)",
              border: "3px solid #fbbf24",
              borderRadius: 20,
              padding: "20px 50px",
            }}
          >
            <h4 style={{ fontSize: 28, color: "#fbbf24", margin: 0 }}>왜 필요한가?</h4>
            <div style={{ display: "flex", justifyContent: "center", gap: 60, marginTop: 15 }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 36, margin: 0 }}>🎂</p>
                <p style={{ fontSize: 20, color: "#9ca3af", margin: "5px 0 0" }}>나이</p>
                <p style={{ fontSize: 18, color: "#fca5a5" }}>1 ~ 100</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 36, margin: 0 }}>💰</p>
                <p style={{ fontSize: 20, color: "#9ca3af", margin: "5px 0 0" }}>연봉</p>
                <p style={{ fontSize: 18, color: "#fca5a5" }}>1,000만 ~ 10억</p>
              </div>
              <div style={{ textAlign: "center", alignSelf: "center" }}>
                <span style={{ fontSize: 24, color: "#fbbf24" }}>→</span>
              </div>
              <div style={{ textAlign: "center", background: "rgba(34, 197, 94, 0.2)", borderRadius: 12, padding: "10px 20px" }}>
                <p style={{ fontSize: 22, color: "#22c55e", margin: 0 }}>같은 스케일로</p>
                <p style={{ fontSize: 22, color: "#22c55e", margin: 0 }}>변환 필요!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 오디오 */}
      {AUDIO_FILES.map((audio, index) => (
        <Sequence key={audio.id} from={getAudioStart(index)} durationInFrames={audio.duration}>
          <Audio src={staticFile(`audio/lesson-2-8/scene5/${audio.id}.mp3`)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
