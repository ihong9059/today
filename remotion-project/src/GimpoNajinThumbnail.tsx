import { AbsoluteFill } from "remotion";
import React from "react";

const COLORS = {
  yellow: "#FFD43B",
  sky: "#74C0FC",
  red: "#FF6B6B",
  textMain: "#212529",
  textSub: "#495057",
};

export const GimpoNajinThumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #FFF9DB 0%, #FFE066 30%, #74C0FC 70%, #B5E48C 100%)",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      {/* 별 장식 */}
      {Array.from({ length: 25 }).map((_, i) => {
        const x = (i * 173) % 1920;
        const y = (i * 91) % 1080;
        const size = 24 + (i % 4) * 12;
        const rot = (i * 37) % 360;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              fontSize: size,
              transform: `rotate(${rot}deg)`,
              opacity: 0.45,
              pointerEvents: "none",
            }}
          >
            {i % 2 === 0 ? "✨" : "⭐"}
          </div>
        );
      })}

      {/* 상단 학교명 */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.textSub,
        }}
      >
        김포나진초등학교 5·6학년
      </div>

      {/* 메인 제목 */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 180,
            fontWeight: 900,
            color: COLORS.red,
            lineHeight: 1.05,
            textShadow: "0 8px 30px rgba(255, 107, 107, 0.35)",
          }}
        >
          AI 바이브코딩
        </div>
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            color: COLORS.textMain,
            marginTop: 16,
            lineHeight: 1.1,
          }}
        >
          4주 여행 시작!
        </div>
      </div>

      {/* 4주 이모지 카드 */}
      <div
        style={{
          position: "absolute",
          top: 620,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {[
          { week: 1, emoji: "💡", color: COLORS.yellow },
          { week: 2, emoji: "📺", color: COLORS.sky },
          { week: 3, emoji: "🔘", color: "#B197FC" },
          { week: 4, emoji: "🎨", color: COLORS.red },
        ].map((w) => (
          <div
            key={w.week}
            style={{
              width: 260,
              padding: "32px 16px",
              background: "white",
              borderRadius: 36,
              border: `6px solid ${w.color}`,
              boxShadow: `0 16px 40px ${w.color}66`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 800, color: w.color }}>Week {w.week}</div>
            <div style={{ fontSize: 120, lineHeight: 1, marginTop: 8 }}>{w.emoji}</div>
          </div>
        ))}
      </div>

      {/* 하단 강사 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 36,
          fontWeight: 600,
          color: COLORS.textMain,
        }}
      >
        👨‍🏫 홍광선 선생님 · ㈜유티텍
      </div>
    </AbsoluteFill>
  );
};
