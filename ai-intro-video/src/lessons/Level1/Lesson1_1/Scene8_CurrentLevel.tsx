/**
 * Lesson 1-1 Scene 8: 현재 AI 수준
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene8_CurrentLevel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const levels = [
    {
      name: "초인공지능 (ASI)",
      desc: "모든 면에서 인간을 초월",
      status: "아직 SF의 영역",
      color: "#ef4444",
      icon: "🚀",
      delay: 300,
    },
    {
      name: "범용 인공지능 (AGI)",
      desc: "인간처럼 다양한 영역에서 활동",
      status: "현재 연구 목표",
      color: "#f97316",
      icon: "🎯",
      delay: 200,
    },
    {
      name: "약인공지능 (ANI)",
      desc: "특정 분야에서만 뛰어남",
      status: "현재 모든 AI가 여기!",
      color: "#22c55e",
      icon: "📍",
      delay: 100,
      current: true,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-1/scene8_current_level.mp3")} />

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
        <span>4. 현재 AI는 어디까지 왔나?</span>
      </div>

      <div style={{ display: "flex", gap: 60 }}>
        {/* 왼쪽: 피라미드 */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 32, color: colors.gray[300], marginBottom: 30 }}>
            AI의 세 가지 수준
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {levels.map((level, i) => {
              const levelOpacity = interpolate(
                frame,
                [level.delay, level.delay + 40],
                [0, 1],
                { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
              );

              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: level.current ? `${level.color}30` : `${colors.gray[800]}80`,
                    border: level.current ? `3px solid ${level.color}` : `2px solid ${colors.gray[700]}`,
                    borderRadius: 20,
                    padding: 30,
                    opacity: levelOpacity,
                    transform: `translateX(${interpolate(levelOpacity, [0, 1], [-50, 0])}px) scale(${level.current ? 1.02 : 1})`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 10 }}>
                    <span style={{ fontSize: 36 }}>{level.icon}</span>
                    <h4 style={{ fontSize: 30, color: level.color, fontWeight: "bold" }}>
                      {level.name}
                    </h4>
                  </div>
                  <p style={{ fontSize: 24, color: colors.gray[300], marginBottom: 8 }}>
                    {level.desc}
                  </p>
                  <p
                    style={{
                      fontSize: 22,
                      color: level.current ? level.color : colors.gray[500],
                      fontWeight: level.current ? "bold" : "normal",
                    }}
                  >
                    → {level.status}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 오른쪽: 현재 AI 능력 */}
        <div
          style={{
            flex: 1,
            opacity: interpolate(frame, [400, 440], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <h3 style={{ fontSize: 32, color: colors.gray[300], marginBottom: 30 }}>
            현재 AI (약인공지능) 예시
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {[
              { icon: "🎮", text: "바둑 AI (AlphaGo)", color: "#3b82f6" },
              { icon: "🌐", text: "번역 AI (Google Translate)", color: "#22c55e" },
              { icon: "🎨", text: "이미지 생성 AI (DALL-E)", color: "#f97316" },
              { icon: "💬", text: "대화 AI (ChatGPT, Claude)", color: "#ec4899" },
              { icon: "🚗", text: "자율주행 AI (Tesla)", color: "#8b5cf6" },
            ].map((item, i) => {
              const itemOpacity = interpolate(
                frame,
                [450 + i * 40, 480 + i * 40],
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
                    padding: "15px 25px",
                    backgroundColor: `${item.color}20`,
                    borderRadius: 16,
                    borderLeft: `4px solid ${item.color}`,
                    opacity: itemOpacity,
                    transform: `translateX(${interpolate(itemOpacity, [0, 1], [30, 0])}px)`,
                  }}
                >
                  <span style={{ fontSize: 32 }}>{item.icon}</span>
                  <span style={{ fontSize: 26, color: colors.white }}>{item.text}</span>
                </div>
              );
            })}
          </div>

          <p
            style={{
              marginTop: 30,
              fontSize: 24,
              color: colors.gray[400],
              textAlign: "center",
              opacity: interpolate(frame, [700, 730], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            모두 특정 분야에서만 뛰어난 "전문가" AI입니다
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
