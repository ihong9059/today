/**
 * Lesson 1-2 Scene 3: 뉴런의 구조
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene3_NeuronStructure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const parts = [
    { name: "수상돌기", english: "Dendrite", role: "신호를 받는 안테나", icon: "📡", color: "#3b82f6" },
    { name: "세포체", english: "Cell Body", role: "신호를 모아 판단하는 본부", icon: "🏢", color: "#22c55e" },
    { name: "축삭돌기", english: "Axon", role: "신호를 보내는 전선", icon: "⚡", color: "#f97316" },
    { name: "시냅스", english: "Synapse", role: "다음 뉴런과 연결되는 단자", icon: "🔌", color: "#8b5cf6" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* 제목 */}
      <h2
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        🔬 뉴런의 구조
      </h2>

      {/* 뉴런 다이어그램 - 간단한 ASCII 스타일 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          marginBottom: 50,
          opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {/* 수상돌기 */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>🌿</div>
          <div style={{ fontSize: 18, color: "#3b82f6" }}>수상돌기</div>
        </div>

        <div style={{ fontSize: 30, color: colors.gray[500] }}>→</div>

        {/* 세포체 */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "#22c55e30",
            border: "4px solid #22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 30 }}>🧠</div>
          <div style={{ fontSize: 14, color: "#22c55e", marginTop: 5 }}>세포체</div>
        </div>

        <div style={{ fontSize: 30, color: colors.gray[500] }}>→</div>

        {/* 축삭돌기 */}
        <div
          style={{
            width: 150,
            height: 20,
            backgroundColor: "#f9731630",
            border: "3px solid #f97316",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 14, color: "#f97316" }}>축삭돌기</span>
        </div>

        <div style={{ fontSize: 30, color: colors.gray[500] }}>→</div>

        {/* 시냅스 */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>🔗</div>
          <div style={{ fontSize: 18, color: "#8b5cf6" }}>시냅스</div>
        </div>
      </div>

      {/* 각 부분 설명 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", maxWidth: 1400 }}>
        {parts.map((part, i) => {
          const cardOpacity = interpolate(
            frame,
            [50 + i * 20, 70 + i * 20],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                backgroundColor: `${part.color}15`,
                border: `2px solid ${part.color}`,
                borderRadius: 16,
                padding: "25px 35px",
                width: 300,
                opacity: cardOpacity,
                transform: `translateY(${interpolate(cardOpacity, [0, 1], [30, 0])}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
                <span style={{ fontSize: 36 }}>{part.icon}</span>
                <div>
                  <div style={{ fontSize: 24, color: part.color, fontWeight: "bold" }}>{part.name}</div>
                  <div style={{ fontSize: 14, color: colors.gray[500] }}>{part.english}</div>
                </div>
              </div>
              <div style={{ fontSize: 18, color: colors.gray[300] }}>{part.role}</div>
            </div>
          );
        })}
      </div>

      {/* 비유 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          backgroundColor: `${colors.primary[500]}20`,
          borderRadius: 15,
          padding: "20px 40px",
          opacity: interpolate(frame, [130, 150], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 22, color: colors.primary[300] }}>
          📱 스마트폰 비유: 메시지 받기 → 읽고 판단 → 답장 보내기 → 상대방에게 도착
        </span>
      </div>
    </AbsoluteFill>
  );
};
