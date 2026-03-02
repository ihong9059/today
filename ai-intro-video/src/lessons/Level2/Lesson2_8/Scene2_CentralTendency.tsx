import { AbsoluteFill, Audio, Sequence, useCurrentFrame, interpolate, staticFile } from "remotion";

const AUDIO_FILES = [
  { id: "central_1", duration: 147 },
  { id: "central_2", duration: 167 },
  { id: "central_3", duration: 154 },
  { id: "central_4", duration: 230 },
  { id: "central_5", duration: 171 },
  { id: "central_6", duration: 177 },
  { id: "central_7", duration: 165 },
  { id: "central_8", duration: 205 },
  { id: "central_9", duration: 253 },
  { id: "central_10", duration: 173 },
  { id: "central_11", duration: 152 },
  { id: "central_12", duration: 171 },
];

const getAudioStart = (index: number) => {
  let start = 0;
  for (let i = 0; i < index; i++) {
    start += AUDIO_FILES[i].duration;
  }
  return start;
};

export const Scene2_CentralTendency: React.FC = () => {
  const frame = useCurrentFrame();

  // 평균 설명 시점 (central_2 시작부터)
  const meanStart = getAudioStart(1);
  const meanProgress = interpolate(frame, [meanStart, meanStart + 500], [0, 1], { extrapolateRight: "clamp" });

  // 중앙값 설명 시점 (central_6 시작부터)
  const medianStart = getAudioStart(5);
  const medianProgress = interpolate(frame, [medianStart, medianStart + 400], [0, 1], { extrapolateRight: "clamp" });

  // 최빈값 설명 시점 (central_10 시작부터)
  const modeStart = getAudioStart(9);
  const modeProgress = interpolate(frame, [modeStart, modeStart + 300], [0, 1], { extrapolateRight: "clamp" });

  // 예시 데이터: 시험 점수
  const examScores = [70, 80, 90];
  const mean = examScores.reduce((a, b) => a + b) / examScores.length;

  // 연봉 데이터 (이상치 예시)
  const salaryData = [3000, 3500, 4000, 4500, 50000]; // 단위: 만원
  const salaryMean = salaryData.reduce((a, b) => a + b) / salaryData.length;
  const sortedSalary = [...salaryData].sort((a, b) => a - b);
  const salaryMedian = sortedSalary[Math.floor(sortedSalary.length / 2)];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
        }}
      />

      {/* 섹션 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 56, color: "#3b82f6", margin: 0 }}>
          중심 경향 측정
        </h2>
        <p style={{ fontSize: 28, color: "#93c5fd", marginTop: 10 }}>
          Central Tendency
        </p>
      </div>

      {/* 세 가지 측정값 카드 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {/* 평균 카드 */}
        <div
          style={{
            width: 320,
            background: frame >= meanStart ? "rgba(59, 130, 246, 0.2)" : "rgba(55, 65, 81, 0.3)",
            border: frame >= meanStart ? "3px solid #3b82f6" : "2px solid #4b5563",
            borderRadius: 20,
            padding: 25,
            opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${frame >= meanStart && frame < medianStart ? 1.05 : 1})`,
            transition: "transform 0.3s",
          }}
        >
          <h3 style={{ fontSize: 36, color: "#3b82f6", margin: 0, textAlign: "center" }}>
            평균 (Mean)
          </h3>
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <p style={{ fontSize: 22, color: "#93c5fd" }}>모든 값의 합 ÷ 개수</p>
            {frame >= meanStart + 100 && (
              <div style={{
                marginTop: 15,
                background: "rgba(0,0,0,0.3)",
                borderRadius: 10,
                padding: 15,
                opacity: interpolate(frame, [meanStart + 100, meanStart + 150], [0, 1], { extrapolateRight: "clamp" }),
              }}>
                <p style={{ fontSize: 20, color: "#fbbf24" }}>예시: 70, 80, 90점</p>
                <p style={{ fontSize: 28, color: "#22c55e", marginTop: 10 }}>
                  평균 = {mean}점
                </p>
              </div>
            )}
          </div>
          {frame >= meanStart + 200 && (
            <div
              style={{
                marginTop: 15,
                background: "#1e293b",
                borderRadius: 8,
                padding: 10,
                fontFamily: "monospace",
                opacity: interpolate(frame, [meanStart + 200, meanStart + 250], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <code style={{ color: "#22c55e", fontSize: 18 }}>np.mean(data)</code>
            </div>
          )}
        </div>

        {/* 중앙값 카드 */}
        <div
          style={{
            width: 320,
            background: frame >= medianStart ? "rgba(168, 85, 247, 0.2)" : "rgba(55, 65, 81, 0.3)",
            border: frame >= medianStart ? "3px solid #a855f7" : "2px solid #4b5563",
            borderRadius: 20,
            padding: 25,
            opacity: interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${frame >= medianStart && frame < modeStart ? 1.05 : 1})`,
          }}
        >
          <h3 style={{ fontSize: 36, color: "#a855f7", margin: 0, textAlign: "center" }}>
            중앙값 (Median)
          </h3>
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <p style={{ fontSize: 22, color: "#c084fc" }}>정렬 후 가운데 값</p>
            {frame >= medianStart + 100 && (
              <div style={{
                marginTop: 15,
                background: "rgba(0,0,0,0.3)",
                borderRadius: 10,
                padding: 15,
                opacity: interpolate(frame, [medianStart + 100, medianStart + 150], [0, 1], { extrapolateRight: "clamp" }),
              }}>
                <p style={{ fontSize: 18, color: "#fbbf24" }}>연봉 데이터 (만원)</p>
                <p style={{ fontSize: 16, color: "#9ca3af" }}>3000, 3500, 4000, 4500, 50000</p>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: 10 }}>
                  <div>
                    <p style={{ fontSize: 14, color: "#ef4444" }}>평균</p>
                    <p style={{ fontSize: 20, color: "#ef4444" }}>{salaryMean.toLocaleString()}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, color: "#22c55e" }}>중앙값</p>
                    <p style={{ fontSize: 20, color: "#22c55e" }}>{salaryMedian.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {frame >= medianStart + 250 && (
            <div
              style={{
                marginTop: 15,
                background: "#1e293b",
                borderRadius: 8,
                padding: 10,
                fontFamily: "monospace",
                opacity: interpolate(frame, [medianStart + 250, medianStart + 300], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <code style={{ color: "#a855f7", fontSize: 18 }}>np.median(data)</code>
            </div>
          )}
        </div>

        {/* 최빈값 카드 */}
        <div
          style={{
            width: 320,
            background: frame >= modeStart ? "rgba(34, 197, 94, 0.2)" : "rgba(55, 65, 81, 0.3)",
            border: frame >= modeStart ? "3px solid #22c55e" : "2px solid #4b5563",
            borderRadius: 20,
            padding: 25,
            opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
            transform: `scale(${frame >= modeStart ? 1.05 : 1})`,
          }}
        >
          <h3 style={{ fontSize: 36, color: "#22c55e", margin: 0, textAlign: "center" }}>
            최빈값 (Mode)
          </h3>
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <p style={{ fontSize: 22, color: "#86efac" }}>가장 자주 나타나는 값</p>
            {frame >= modeStart + 100 && (
              <div style={{
                marginTop: 15,
                background: "rgba(0,0,0,0.3)",
                borderRadius: 10,
                padding: 15,
                opacity: interpolate(frame, [modeStart + 100, modeStart + 150], [0, 1], { extrapolateRight: "clamp" }),
              }}>
                <p style={{ fontSize: 18, color: "#fbbf24" }}>선호 색상 조사</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 10 }}>
                  <span style={{ fontSize: 20 }}>🔴 3</span>
                  <span style={{ fontSize: 20, fontWeight: "bold", color: "#22c55e" }}>🔵 7</span>
                  <span style={{ fontSize: 20 }}>🟢 2</span>
                </div>
                <p style={{ fontSize: 18, color: "#22c55e", marginTop: 10 }}>최빈값 = 파랑</p>
              </div>
            )}
          </div>
          {frame >= modeStart + 200 && (
            <div
              style={{
                marginTop: 15,
                background: "#1e293b",
                borderRadius: 8,
                padding: 10,
                fontFamily: "monospace",
                opacity: interpolate(frame, [modeStart + 200, modeStart + 250], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <code style={{ color: "#22c55e", fontSize: 18 }}>stats.mode(data)</code>
            </div>
          )}
        </div>
      </div>

      {/* 하단 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          width: "100%",
          textAlign: "center",
        }}
      >
        {frame >= medianStart + 150 && frame < modeStart && (
          <div
            style={{
              display: "inline-block",
              background: "rgba(239, 68, 68, 0.2)",
              border: "2px solid #ef4444",
              borderRadius: 12,
              padding: "12px 30px",
              opacity: interpolate(frame, [medianStart + 150, medianStart + 200], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <span style={{ fontSize: 26, color: "#fca5a5" }}>
              이상치가 있으면 평균보다 중앙값이 더 대표성이 있습니다!
            </span>
          </div>
        )}
        {frame >= modeStart + 100 && (
          <div
            style={{
              display: "inline-block",
              background: "rgba(34, 197, 94, 0.2)",
              border: "2px solid #22c55e",
              borderRadius: 12,
              padding: "12px 30px",
              opacity: interpolate(frame, [modeStart + 100, modeStart + 150], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <span style={{ fontSize: 26, color: "#86efac" }}>
              최빈값은 범주형 데이터에서 가장 흔한 카테고리를 찾을 때 유용!
            </span>
          </div>
        )}
      </div>

      {/* 오디오 */}
      {AUDIO_FILES.map((audio, index) => (
        <Sequence key={audio.id} from={getAudioStart(index)} durationInFrames={audio.duration}>
          <Audio src={staticFile(`audio/lesson-2-8/scene2/${audio.id}.mp3`)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
