import { AbsoluteFill } from "remotion";

export const Lesson2_8Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      {/* 배경 그라데이션 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
        }}
      />

      {/* 통계 시각화 - 바 차트 */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <svg width="700" height="280" viewBox="0 0 700 280">
          {/* 축 */}
          <line x1="80" y1="240" x2="620" y2="240" stroke="#4b5563" strokeWidth="3" />
          <line x1="80" y1="40" x2="80" y2="240" stroke="#4b5563" strokeWidth="3" />

          {/* 바 차트 */}
          {[
            { x: 120, h: 80, color: "#3b82f6" },
            { x: 200, h: 140, color: "#22c55e" },
            { x: 280, h: 180, color: "#a855f7" },
            { x: 360, h: 160, color: "#ec4899" },
            { x: 440, h: 100, color: "#f59e0b" },
            { x: 520, h: 60, color: "#ef4444" },
          ].map((bar, i) => (
            <rect
              key={i}
              x={bar.x}
              y={240 - bar.h}
              width="50"
              height={bar.h}
              fill={bar.color}
              rx="5"
            />
          ))}

          {/* 평균선 */}
          <line x1="80" y1="120" x2="620" y2="120" stroke="#fbbf24" strokeWidth="3" strokeDasharray="10,5" />
          <text x="635" y="125" fill="#fbbf24" fontSize="20" fontWeight="bold">μ</text>

          {/* 정규분포 곡선 오버레이 */}
          <path
            d={`M 80 240 ${Array.from({ length: 54 }, (_, i) => {
              const x = 80 + i * 10;
              const normalX = (x - 350) / 100;
              const y = 240 - 180 * Math.exp(-normalX * normalX / 2);
              return `L ${x} ${y}`;
            }).join(' ')}`}
            fill="none"
            stroke="#e879f9"
            strokeWidth="4"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* 메인 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 90,
            color: "#a855f7",
            margin: 0,
            fontWeight: "bold",
            textShadow: "0 0 40px rgba(168, 85, 247, 0.5)",
          }}
        >
          통계 기초
        </h1>
        <p
          style={{
            fontSize: 42,
            color: "#c084fc",
            marginTop: 15,
          }}
        >
          Statistics Basics
        </p>
      </div>

      {/* 통계 아이콘들 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {[
          { icon: "📊", label: "평균/중앙값", color: "#3b82f6" },
          { icon: "📈", label: "분산/표준편차", color: "#ec4899" },
          { icon: "🔗", label: "상관계수", color: "#22c55e" },
          { icon: "⚖️", label: "정규화", color: "#f59e0b" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              background: `rgba(${item.color === "#3b82f6" ? "59,130,246" : item.color === "#ec4899" ? "236,72,153" : item.color === "#22c55e" ? "34,197,94" : "245,158,11"}, 0.2)`,
              border: `2px solid ${item.color}`,
              borderRadius: 12,
              padding: "8px 16px",
            }}
          >
            <span style={{ fontSize: 28 }}>{item.icon}</span>
            <p style={{ fontSize: 16, color: item.color, margin: "5px 0 0" }}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* 레슨 번호 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          background: "rgba(168, 85, 247, 0.3)",
          border: "2px solid #a855f7",
          borderRadius: 12,
          padding: "8px 20px",
        }}
      >
        <span style={{ fontSize: 28, color: "white", fontWeight: "bold" }}>Lesson 2-8</span>
      </div>

      {/* Level 2 완료 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          borderRadius: 12,
          padding: "8px 20px",
        }}
      >
        <span style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>Level 2 Complete!</span>
      </div>
    </AbsoluteFill>
  );
};
