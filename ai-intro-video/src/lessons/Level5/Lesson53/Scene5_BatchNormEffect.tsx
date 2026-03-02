/**
 * Scene 5: BatchNorm 효과와 구현
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_BatchNormEffect: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const effects = [
    { icon: "🎯", title: "학습 안정화", desc: "기울기 흐름 개선" },
    { icon: "⚡", title: "빠른 수렴", desc: "높은 학습률 사용 가능" },
    { icon: "🛡️", title: "정규화 효과", desc: "약간의 Dropout 효과" },
    { icon: "🔧", title: "초기화 덜 민감", desc: "가중치 초기화 영향 ↓" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #6d28d9 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-3/scene5.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 52,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        ✨ BatchNorm의 효과
      </h1>

      {/* 효과 4가지 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, marginBottom: 40 }}>
        {effects.map((effect, i) => {
          const opacity = interpolate(frame, [60 + i * 60, 90 + i * 60], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                backgroundColor: colors.gray[800],
                padding: 25,
                borderRadius: 16,
                border: "2px solid #8b5cf6",
                width: 350,
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity,
              }}
            >
              <div style={{ fontSize: 40 }}>{effect.icon}</div>
              <div>
                <div style={{ fontSize: 22, color: colors.white, fontWeight: "bold" }}>{effect.title}</div>
                <div style={{ fontSize: 16, color: colors.gray[400] }}>{effect.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 사용법 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          padding: 30,
          borderRadius: 16,
          border: "3px solid #22c55e",
          opacity: interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ fontSize: 24, color: "#86efac", fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
          📝 사용 순서
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              backgroundColor: "#3b82f6",
              padding: "15px 25px",
              borderRadius: 10,
              fontSize: 22,
              color: colors.white,
              fontWeight: "bold",
            }}
          >
            Conv
          </div>
          <div style={{ fontSize: 30, color: colors.white }}>→</div>
          <div
            style={{
              backgroundColor: "#8b5cf6",
              padding: "15px 25px",
              borderRadius: 10,
              fontSize: 22,
              color: colors.white,
              fontWeight: "bold",
            }}
          >
            BatchNorm
          </div>
          <div style={{ fontSize: 30, color: colors.white }}>→</div>
          <div
            style={{
              backgroundColor: "#22c55e",
              padding: "15px 25px",
              borderRadius: 10,
              fontSize: 22,
              color: colors.white,
              fontWeight: "bold",
            }}
          >
            ReLU
          </div>
        </div>
        <div style={{ fontSize: 16, color: colors.gray[400], marginTop: 15, textAlign: "center" }}>
          합성곱 후 배치놈, 그 다음 활성화 함수
        </div>
      </div>
    </AbsoluteFill>
  );
};
