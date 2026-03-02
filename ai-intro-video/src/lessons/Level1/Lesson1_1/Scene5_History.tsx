/**
 * Lesson 1-1 Scene 5: AI의 역사
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_History: React.FC = () => {
  const frame = useCurrentFrame();

  const timeline = [
    { era: "1950s", title: "AI의 탄생", events: ["튜링: '기계가 생각할 수 있는가?'", "1956: 인공지능 용어 최초 사용"], color: "#3b82f6", delay: 0 },
    { era: "1960-70s", title: "첫 번째 AI 겨울", events: ["기대에 못 미치는 성과", "자금 지원 급감"], color: "#6b7280", delay: 150 },
    { era: "1980s", title: "전문가 시스템", events: ["규칙 기반 AI 전성기", "지식 입력의 한계"], color: "#f59e0b", delay: 300 },
    { era: "2010s", title: "딥러닝 혁명!", events: ["2012: AlexNet 혁신", "2016: AlphaGo vs 이세돌"], color: "#22c55e", delay: 450 },
    { era: "2020s", title: "생성형 AI 시대", events: ["GPT, Claude, Stable Diffusion", "AI가 창작까지!"], color: "#ec4899", delay: 600 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-1/scene5_history.mp3")} />

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
        <span>2. AI의 역사 - 꿈에서 현실로</span>
      </div>

      {/* 타임라인 */}
      <div style={{ position: "relative", paddingLeft: 100 }}>
        {/* 세로선 */}
        <div
          style={{
            position: "absolute",
            left: 50,
            top: 0,
            bottom: 0,
            width: 4,
            backgroundColor: colors.gray[700],
          }}
        />

        {timeline.map((item, i) => {
          const itemOpacity = interpolate(
            frame,
            [item.delay, item.delay + 60],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: 30,
                opacity: itemOpacity,
                transform: `translateX(${interpolate(itemOpacity, [0, 1], [-50, 0])}px)`,
              }}
            >
              {/* 점 */}
              <div
                style={{
                  position: "absolute",
                  left: 38,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  border: `4px solid ${colors.gray[900]}`,
                }}
              />

              {/* 연도 */}
              <div
                style={{
                  minWidth: 120,
                  fontSize: 28,
                  fontWeight: "bold",
                  color: item.color,
                }}
              >
                {item.era}
              </div>

              {/* 내용 */}
              <div
                style={{
                  backgroundColor: `${item.color}20`,
                  border: `2px solid ${item.color}50`,
                  borderRadius: 16,
                  padding: "20px 30px",
                  flex: 1,
                }}
              >
                <h4 style={{ fontSize: 30, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>
                  {item.title}
                </h4>
                {item.events.map((event, j) => (
                  <p key={j} style={{ fontSize: 24, color: colors.gray[300], marginBottom: 5 }}>
                    • {event}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 현재 위치 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          right: 60,
          opacity: interpolate(frame, [700, 730], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            backgroundColor: "#ec4899",
            color: colors.white,
            padding: "15px 30px",
            borderRadius: 30,
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          📍 우리는 지금 여기 있습니다!
        </div>
      </div>
    </AbsoluteFill>
  );
};
