import { AbsoluteFill } from "remotion";

export const Lesson2_7Thumbnail: React.FC = () => {
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

      {/* 정규분포 곡선 */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <svg width="800" height="300" viewBox="0 0 800 300">
          {/* 곡선 아래 채우기 */}
          <path
            d={`M 50 280 ${Array.from({ length: 141 }, (_, i) => {
              const x = 50 + i * 5;
              const normalX = (x - 400) / 100;
              const y = 280 - 220 * Math.exp(-normalX * normalX / 2);
              return `L ${x} ${y}`;
            }).join(' ')} L 750 280 Z`}
            fill="url(#bellGradient)"
            opacity={0.4}
          />

          {/* 그라데이션 정의 */}
          <defs>
            <linearGradient id="bellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* 정규분포 곡선 */}
          <path
            d={`M 50 280 ${Array.from({ length: 141 }, (_, i) => {
              const x = 50 + i * 5;
              const normalX = (x - 400) / 100;
              const y = 280 - 220 * Math.exp(-normalX * normalX / 2);
              return `L ${x} ${y}`;
            }).join(' ')}`}
            fill="none"
            stroke="#e879f9"
            strokeWidth="5"
          />

          {/* 평균선 */}
          <line x1="400" y1="60" x2="400" y2="280" stroke="#fbbf24" strokeWidth="3" strokeDasharray="10,5" />
          <text x="415" y="80" fill="#fbbf24" fontSize="28" fontWeight="bold">μ</text>

          {/* σ 표시 */}
          <text x="300" y="290" fill="#c084fc" fontSize="22" textAnchor="middle">-1σ</text>
          <text x="500" y="290" fill="#c084fc" fontSize="22" textAnchor="middle">+1σ</text>
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
          확률분포
        </h1>
        <p
          style={{
            fontSize: 42,
            color: "#e879f9",
            marginTop: 15,
          }}
        >
          Probability Distributions
        </p>
      </div>

      {/* 레벨 2 완료 배지 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.1))",
          border: "2px solid #22c55e",
          borderRadius: 16,
          padding: "12px 30px",
        }}
      >
        <span style={{ fontSize: 28, color: "#22c55e", fontWeight: "bold" }}>
          ✨ Level 2 마지막 강의!
        </span>
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
        <span style={{ fontSize: 28, color: "white", fontWeight: "bold" }}>Lesson 2-7</span>
      </div>

      {/* AI 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          background: "linear-gradient(135deg, #a855f7, #ec4899)",
          borderRadius: 12,
          padding: "8px 20px",
        }}
      >
        <span style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>Level 2 · 수학 기초</span>
      </div>
    </AbsoluteFill>
  );
};
