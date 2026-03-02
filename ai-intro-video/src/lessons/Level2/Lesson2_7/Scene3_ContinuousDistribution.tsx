import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

export const Scene3_ContinuousDistribution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // 정규분포 곡선 애니메이션
  const curveProgress = interpolate(frame, [30, 120], [0, 1], { extrapolateRight: "clamp" });

  // 설명 텍스트들
  const desc1Opacity = interpolate(frame, [130, 160], [0, 1], { extrapolateRight: "clamp" });
  const desc2Opacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });

  // 예시들
  const example1Opacity = interpolate(frame, [260, 290], [0, 1], { extrapolateRight: "clamp" });
  const example2Opacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const example3Opacity = interpolate(frame, [340, 370], [0, 1], { extrapolateRight: "clamp" });

  // 곡선 아래 채우기
  const fillOpacity = interpolate(frame, [100, 130], [0, 0.3], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Audio src={staticFile("audio/lesson-2-7/scene3.mp3")} />

      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 40%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)",
        }}
      />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <h2 style={{ fontSize: 56, color: "#a855f7", margin: 0 }}>연속 확률분포</h2>
        <p style={{ fontSize: 28, color: "#c084fc", marginTop: 10 }}>
          정규분포 (Normal/Gaussian Distribution)
        </p>
      </div>

      {/* 정규분포 그래프 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <svg width="800" height="350" viewBox="0 0 800 350">
          {/* 그리드 라인 */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`h${i}`}
              x1="80"
              y1={80 + i * 60}
              x2="720"
              y2={80 + i * 60}
              stroke="#333"
              strokeWidth="1"
              opacity={0.5}
            />
          ))}

          {/* 축 */}
          <line x1="80" y1="300" x2="720" y2="300" stroke="#a855f7" strokeWidth="2" />
          <line x1="80" y1="300" x2="80" y2="60" stroke="#a855f7" strokeWidth="2" />

          {/* 곡선 아래 채우기 */}
          <path
            d={`M 80 300 ${Array.from({ length: 129 }, (_, i) => {
              const x = 80 + i * 5;
              const normalX = (x - 400) / 100;
              const y = 300 - 220 * Math.exp(-normalX * normalX / 2);
              return `L ${x} ${y}`;
            }).join(' ')} L 720 300 Z`}
            fill="url(#bellGradient)"
            opacity={fillOpacity}
          />

          {/* 그라데이션 정의 */}
          <defs>
            <linearGradient id="bellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* 정규분포 곡선 */}
          <path
            d={`M 80 300 ${Array.from({ length: Math.floor(129 * curveProgress) }, (_, i) => {
              const x = 80 + i * 5;
              const normalX = (x - 400) / 100;
              const y = 300 - 220 * Math.exp(-normalX * normalX / 2);
              return `L ${x} ${y}`;
            }).join(' ')}`}
            fill="none"
            stroke="#e879f9"
            strokeWidth="4"
          />

          {/* 평균선 */}
          <line
            x1="400"
            y1="80"
            x2="400"
            y2="300"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeDasharray="8,4"
            opacity={desc1Opacity}
          />
          <text x="410" y="95" fill="#fbbf24" fontSize="20" opacity={desc1Opacity}>
            μ (평균)
          </text>

          {/* x축 레이블 */}
          <text x="400" y="330" fill="white" fontSize="16" textAnchor="middle" opacity={desc1Opacity}>0</text>
          <text x="200" y="330" fill="white" fontSize="16" textAnchor="middle" opacity={desc1Opacity}>-2σ</text>
          <text x="300" y="330" fill="white" fontSize="16" textAnchor="middle" opacity={desc1Opacity}>-1σ</text>
          <text x="500" y="330" fill="white" fontSize="16" textAnchor="middle" opacity={desc1Opacity}>+1σ</text>
          <text x="600" y="330" fill="white" fontSize="16" textAnchor="middle" opacity={desc1Opacity}>+2σ</text>
        </svg>
      </div>

      {/* 설명 */}
      <div
        style={{
          position: "absolute",
          top: "62%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "rgba(168, 85, 247, 0.2)",
            border: "2px solid #a855f7",
            borderRadius: 16,
            padding: "15px 30px",
            marginBottom: 15,
            opacity: desc1Opacity,
          }}
        >
          <p style={{ fontSize: 26, color: "white", margin: 0 }}>
            종 모양의 곡선 - 평균을 중심으로 좌우 대칭
          </p>
        </div>

        <p
          style={{
            fontSize: 22,
            color: "#c084fc",
            opacity: desc2Opacity,
          }}
        >
          평균(μ)과 표준편차(σ) 두 개의 값으로 분포를 완전히 설명!
        </p>
      </div>

      {/* 예시들 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            background: "rgba(59, 130, 246, 0.2)",
            border: "2px solid #3b82f6",
            borderRadius: 12,
            padding: "12px 25px",
            opacity: example1Opacity,
          }}
        >
          <span style={{ fontSize: 28, marginRight: 10 }}>📏</span>
          <span style={{ color: "white", fontSize: 20 }}>키</span>
        </div>
        <div
          style={{
            background: "rgba(34, 197, 94, 0.2)",
            border: "2px solid #22c55e",
            borderRadius: 12,
            padding: "12px 25px",
            opacity: example2Opacity,
          }}
        >
          <span style={{ fontSize: 28, marginRight: 10 }}>⚖️</span>
          <span style={{ color: "white", fontSize: 20 }}>몸무게</span>
        </div>
        <div
          style={{
            background: "rgba(249, 115, 22, 0.2)",
            border: "2px solid #f97316",
            borderRadius: 12,
            padding: "12px 25px",
            opacity: example3Opacity,
          }}
        >
          <span style={{ fontSize: 28, marginRight: 10 }}>📝</span>
          <span style={{ color: "white", fontSize: 20 }}>시험 점수</span>
        </div>
      </div>

      {/* 레슨 번호 */}
      <div style={{ position: "absolute", bottom: 30, right: 40, fontSize: 24, color: "#a855f7", opacity: 0.7 }}>
        Lesson 2-7
      </div>
    </AbsoluteFill>
  );
};
