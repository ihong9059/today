import { AbsoluteFill, Audio, Sequence, useCurrentFrame, interpolate, staticFile } from "remotion";

const AUDIO_FILES = [
  { id: "ai_1", duration: 139 },
  { id: "ai_2", duration: 255 },
  { id: "ai_3", duration: 208 },
  { id: "ai_4", duration: 241 },
  { id: "ai_5", duration: 193 },
  { id: "ai_6", duration: 163 },
];

const getAudioStart = (index: number) => {
  let start = 0;
  for (let i = 0; i < index; i++) {
    start += AUDIO_FILES[i].duration;
  }
  return start;
};

export const Scene6_AIApplication: React.FC = () => {
  const frame = useCurrentFrame();

  const stages = [
    { title: "데이터 탐색", icon: "🔍", color: "#3b82f6", desc: "평균, 분산, 상관계수로\n데이터 특성 파악", start: getAudioStart(1) },
    { title: "데이터 전처리", icon: "🔧", color: "#22c55e", desc: "정규화, 표준화로\n데이터 변환", start: getAudioStart(2) },
    { title: "모델 평가", icon: "📊", color: "#a855f7", desc: "정확도, 정밀도, 재현율 등\n통계적 지표", start: getAudioStart(3) },
    { title: "배치 정규화", icon: "⚡", color: "#f59e0b", desc: "레이어 출력을\n표준화", start: getAudioStart(4) },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)",
        }}
      />

      {/* 섹션 타이틀 */}
      <div style={{ position: "absolute", top: 40, width: "100%", textAlign: "center" }}>
        <h2 style={{ fontSize: 56, color: "#a855f7", margin: 0 }}>
          AI에서의 통계 활용
        </h2>
        <p style={{ fontSize: 28, color: "#c084fc", marginTop: 10 }}>
          Statistics in AI Pipeline
        </p>
      </div>

      {/* AI 파이프라인 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
          padding: "0 60px",
        }}
      >
        {stages.map((stage, i) => {
          const isActive = frame >= stage.start;
          const cardOpacity = interpolate(frame, [stage.start, stage.start + 50], [0, 1], { extrapolateRight: "clamp" });
          const cardScale = interpolate(frame, [stage.start, stage.start + 30], [0.8, 1], { extrapolateRight: "clamp" });

          return (
            <div
              key={i}
              style={{
                width: 280,
                background: isActive ? `rgba(${stage.color === "#3b82f6" ? "59, 130, 246" : stage.color === "#22c55e" ? "34, 197, 94" : stage.color === "#a855f7" ? "168, 85, 247" : "245, 158, 11"}, 0.15)` : "rgba(55, 65, 81, 0.2)",
                border: `3px solid ${isActive ? stage.color : "#4b5563"}`,
                borderRadius: 20,
                padding: 25,
                opacity: cardOpacity,
                transform: `scale(${cardScale})`,
                textAlign: "center",
              }}
            >
              {/* 단계 번호 */}
              <div
                style={{
                  position: "absolute",
                  top: -15,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: stage.color,
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>{i + 1}</span>
              </div>

              {/* 아이콘 */}
              <div style={{ fontSize: 60, marginTop: 15 }}>{stage.icon}</div>

              {/* 제목 */}
              <h3 style={{ fontSize: 28, color: stage.color, margin: "15px 0 10px" }}>
                {stage.title}
              </h3>

              {/* 설명 */}
              <p style={{ fontSize: 18, color: "#d1d5db", whiteSpace: "pre-line", lineHeight: 1.5 }}>
                {stage.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* 연결선 */}
      <svg
        style={{ position: "absolute", top: "45%", left: "50%", transform: "translateX(-50%)" }}
        width="1100"
        height="50"
        viewBox="0 0 1100 50"
      >
        {[0, 1, 2].map((i) => {
          const startX = 140 + i * 310;
          const endX = startX + 180;
          const arrowProgress = interpolate(frame, [stages[i + 1].start, stages[i + 1].start + 30], [0, 1], { extrapolateRight: "clamp" });

          return (
            <g key={i} opacity={arrowProgress}>
              <line
                x1={startX}
                y1={25}
                x2={endX}
                y2={25}
                stroke="#6b7280"
                strokeWidth="3"
                strokeDasharray="8,4"
              />
              <polygon
                points={`${endX},25 ${endX - 15},15 ${endX - 15},35`}
                fill="#6b7280"
              />
            </g>
          );
        })}
      </svg>

      {/* 하단 강조 */}
      {frame >= getAudioStart(5) && (
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            width: "100%",
            textAlign: "center",
            opacity: interpolate(frame, [getAudioStart(5), getAudioStart(5) + 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3))",
              border: "3px solid #a855f7",
              borderRadius: 20,
              padding: "20px 50px",
            }}
          >
            <span style={{ fontSize: 32, color: "#e879f9" }}>
              통계는 AI 성능 향상의 핵심 도구입니다!
            </span>
          </div>
        </div>
      )}

      {/* 오디오 */}
      {AUDIO_FILES.map((audio, index) => (
        <Sequence key={audio.id} from={getAudioStart(index)} durationInFrames={audio.duration}>
          <Audio src={staticFile(`audio/lesson-2-8/scene6/${audio.id}.mp3`)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
