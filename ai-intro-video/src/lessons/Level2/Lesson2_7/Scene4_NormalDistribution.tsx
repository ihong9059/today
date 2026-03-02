import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

export const Scene4_NormalDistribution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // 평균 이동 데모
  const meanShift = interpolate(frame, [30, 120], [0, 1], { extrapolateRight: "clamp" });
  const meanX = 300 + Math.sin(frame * 0.03) * 80;

  // 표준편차 변화 데모
  const stdOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const stdValue = interpolate(frame, [200, 350], [50, 120], { extrapolateRight: "clamp" });

  // 68-95-99.7 법칙
  const ruleOpacity = interpolate(frame, [380, 410], [0, 1], { extrapolateRight: "clamp" });
  const rule68Opacity = interpolate(frame, [430, 460], [0, 1], { extrapolateRight: "clamp" });
  const rule95Opacity = interpolate(frame, [490, 520], [0, 1], { extrapolateRight: "clamp" });
  const rule997Opacity = interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" });

  // 정규분포 곡선 생성 함수
  const generateCurve = (centerX: number, std: number, height: number = 150) => {
    return Array.from({ length: 80 }, (_, i) => {
      const x = 100 + i * 5;
      const normalX = (x - centerX) / std;
      const y = 180 - height * Math.exp(-normalX * normalX / 2);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Audio src={staticFile("audio/lesson-2-7/scene4.mp3")} />

      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "4%",
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <h2 style={{ fontSize: 48, color: "#a855f7", margin: 0 }}>정규분포의 특징</h2>
      </div>

      {/* 상단: 평균 이동 데모 */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "5%",
          width: "42%",
        }}
      >
        <p style={{ color: "#fbbf24", fontSize: 22, marginBottom: 10, opacity: meanShift }}>
          평균(μ)이 바뀌면 분포가 이동
        </p>
        <svg width="500" height="200" viewBox="0 0 500 200">
          {/* 축 */}
          <line x1="50" y1="180" x2="450" y2="180" stroke="#555" strokeWidth="1" />

          {/* 이동하는 곡선 */}
          <path
            d={generateCurve(meanX, 60, 130)}
            fill="none"
            stroke="#e879f9"
            strokeWidth="3"
            opacity={meanShift}
          />

          {/* 평균 표시 */}
          <circle cx={meanX} cy={50} r={6} fill="#fbbf24" opacity={meanShift} />
          <text x={meanX} y={40} fill="#fbbf24" fontSize="14" textAnchor="middle" opacity={meanShift}>
            μ
          </text>
        </svg>
      </div>

      {/* 상단 우측: 표준편차 변화 데모 */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          right: "5%",
          width: "42%",
        }}
      >
        <p style={{ color: "#22c55e", fontSize: 22, marginBottom: 10, opacity: stdOpacity }}>
          표준편차(σ)가 바뀌면 퍼짐 변화
        </p>
        <svg width="500" height="200" viewBox="0 0 500 200">
          {/* 축 */}
          <line x1="50" y1="180" x2="450" y2="180" stroke="#555" strokeWidth="1" />

          {/* 변화하는 곡선 */}
          <path
            d={generateCurve(250, stdValue, 150 * (80 / stdValue))}
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            opacity={stdOpacity}
          />

          {/* 표준편차 표시 */}
          <text x="250" y="195" fill="white" fontSize="12" textAnchor="middle" opacity={stdOpacity}>
            σ = {stdValue.toFixed(0)}
          </text>
        </svg>
        <p style={{ color: "#86efac", fontSize: 16, opacity: stdOpacity, marginTop: -10 }}>
          작으면 뾰족, 크면 납작
        </p>
      </div>

      {/* 하단: 68-95-99.7 법칙 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
        }}
      >
        <p
          style={{
            color: "#fbbf24",
            fontSize: 28,
            textAlign: "center",
            marginBottom: 20,
            opacity: ruleOpacity,
          }}
        >
          68-95-99.7 법칙 (경험적 규칙)
        </p>

        <svg width="100%" height="250" viewBox="0 0 900 250">
          {/* 배경 영역들 */}
          <rect x="150" y="40" width="600" height="160" fill="#22c55e" opacity={rule997Opacity * 0.15} rx="8" />
          <rect x="225" y="40" width="450" height="160" fill="#3b82f6" opacity={rule95Opacity * 0.2} rx="6" />
          <rect x="300" y="40" width="300" height="160" fill="#a855f7" opacity={rule68Opacity * 0.25} rx="4" />

          {/* 정규분포 곡선 */}
          <path
            d={`M 100 200 ${Array.from({ length: 141 }, (_, i) => {
              const x = 100 + i * 5;
              const normalX = (x - 450) / 100;
              const y = 200 - 150 * Math.exp(-normalX * normalX / 2);
              return `L ${x} ${y}`;
            }).join(' ')}`}
            fill="none"
            stroke="#e879f9"
            strokeWidth="3"
            opacity={ruleOpacity}
          />

          {/* 축 */}
          <line x1="100" y1="200" x2="800" y2="200" stroke="#a855f7" strokeWidth="2" opacity={ruleOpacity} />

          {/* 레이블 */}
          <text x="450" y="225" fill="white" fontSize="16" textAnchor="middle" opacity={ruleOpacity}>μ</text>
          <text x="350" y="225" fill="white" fontSize="14" textAnchor="middle" opacity={rule68Opacity}>-1σ</text>
          <text x="550" y="225" fill="white" fontSize="14" textAnchor="middle" opacity={rule68Opacity}>+1σ</text>
          <text x="250" y="225" fill="white" fontSize="14" textAnchor="middle" opacity={rule95Opacity}>-2σ</text>
          <text x="650" y="225" fill="white" fontSize="14" textAnchor="middle" opacity={rule95Opacity}>+2σ</text>
          <text x="150" y="225" fill="white" fontSize="14" textAnchor="middle" opacity={rule997Opacity}>-3σ</text>
          <text x="750" y="225" fill="white" fontSize="14" textAnchor="middle" opacity={rule997Opacity}>+3σ</text>
        </svg>

        {/* 퍼센트 박스들 */}
        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 10 }}>
          <div
            style={{
              background: "rgba(168, 85, 247, 0.3)",
              border: "2px solid #a855f7",
              borderRadius: 10,
              padding: "8px 20px",
              opacity: rule68Opacity,
            }}
          >
            <span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>68%</span>
            <span style={{ color: "#c084fc", fontSize: 16, marginLeft: 8 }}>±1σ</span>
          </div>
          <div
            style={{
              background: "rgba(59, 130, 246, 0.3)",
              border: "2px solid #3b82f6",
              borderRadius: 10,
              padding: "8px 20px",
              opacity: rule95Opacity,
            }}
          >
            <span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>95%</span>
            <span style={{ color: "#93c5fd", fontSize: 16, marginLeft: 8 }}>±2σ</span>
          </div>
          <div
            style={{
              background: "rgba(34, 197, 94, 0.3)",
              border: "2px solid #22c55e",
              borderRadius: 10,
              padding: "8px 20px",
              opacity: rule997Opacity,
            }}
          >
            <span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>99.7%</span>
            <span style={{ color: "#86efac", fontSize: 16, marginLeft: 8 }}>±3σ</span>
          </div>
        </div>
      </div>

      {/* 레슨 번호 */}
      <div style={{ position: "absolute", bottom: 30, right: 40, fontSize: 24, color: "#a855f7", opacity: 0.7 }}>
        Lesson 2-7
      </div>
    </AbsoluteFill>
  );
};
