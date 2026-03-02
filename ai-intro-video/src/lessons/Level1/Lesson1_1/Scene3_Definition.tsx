/**
 * Lesson 1-1 Scene 3: AI 정의
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Definition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const capabilities = [
    { icon: "📚", title: "학습 (Learning)", desc: "경험에서 지식을 얻음", delay: 120 },
    { icon: "🧩", title: "추론 (Reasoning)", desc: "논리적으로 결론 도출", delay: 180 },
    { icon: "🎯", title: "문제 해결", desc: "목표 달성 방법 찾기", delay: 240 },
    { icon: "👁️", title: "인식 (Perception)", desc: "이미지, 음성 등 이해", delay: 300 },
    { icon: "💬", title: "언어 이해", desc: "자연어 처리", delay: 360 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-1/scene3_definition.mp3")} />

      {/* 타이틀 */}
      <div
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: colors.white,
          marginBottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 50 }}>📦</span>
        <span>인공지능의 정의</span>
      </div>

      <div style={{ display: "flex", gap: 50 }}>
        {/* 왼쪽: 정의 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: `${colors.primary[500]}20`,
              border: `3px solid ${colors.primary[400]}`,
              borderRadius: 24,
              padding: 40,
              marginBottom: 30,
              opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <h3 style={{ fontSize: 36, color: colors.primary[300], marginBottom: 15 }}>
              Artificial Intelligence
            </h3>
            <p style={{ fontSize: 42, color: colors.white, fontWeight: "bold", lineHeight: 1.4 }}>
              인간의 지능을<br />
              기계로 구현한 것
            </p>
          </div>

          {/* 핵심 메시지 */}
          <div
            style={{
              backgroundColor: "#f9731620",
              border: `3px solid #f97316`,
              borderRadius: 20,
              padding: 30,
              opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <p style={{ fontSize: 32, color: "#f97316", fontWeight: "bold", textAlign: "center" }}>
              💡 AI는 마법이 아니라<br />
              데이터에서 패턴을 찾는 수학적 과정입니다!
            </p>
          </div>
        </div>

        {/* 오른쪽: 능력 목록 */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 32, color: colors.gray[300], marginBottom: 25 }}>
            AI가 할 수 있는 것들:
          </h3>
          {capabilities.map((item, i) => {
            const itemOpacity = interpolate(
              frame,
              [item.delay, item.delay + 30],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 20,
                  padding: "15px 25px",
                  backgroundColor: `${colors.gray[800]}80`,
                  borderRadius: 16,
                  borderLeft: `4px solid ${colors.primary[400]}`,
                  opacity: itemOpacity,
                  transform: `translateX(${interpolate(itemOpacity, [0, 1], [50, 0])}px)`,
                }}
              >
                <span style={{ fontSize: 40 }}>{item.icon}</span>
                <div>
                  <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: 24, color: colors.gray[400], marginLeft: 15 }}>
                    {item.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
