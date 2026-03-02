/**
 * Scene 6: 시그모이드 함수
 * σ(x) = 1 / (1 + e^(-x))
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_SigmoidFunction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const formulaScale = spring({ frame: frame - 30, fps, from: 0, to: 1, durationInFrames: 30 });

  // 그래프 애니메이션
  const curveProgress = interpolate(frame, [90, 200], [0, 1], { extrapolateRight: "clamp" });

  // 설명 애니메이션
  const rangeOpacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const propertyOpacity = interpolate(frame, [310, 340], [0, 1], { extrapolateRight: "clamp" });
  const aiOpacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });

  // 시그모이드 함수 경로 생성
  const generateSigmoidPath = (progress: number) => {
    const points = [];
    const totalPoints = Math.floor(progress * 100);
    for (let i = 0; i <= totalPoints; i++) {
      const t = (i / 100) * 10 - 5; // -5 to 5
      const x = 280 + t * 35;
      const sigmoid = 1 / (1 + Math.exp(-t));
      const y = 320 - sigmoid * 200;
      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }
    return points.join(' ');
  };

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #134e4a 0%, #1e1b4b 50%, #4c1d95 100%)`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        gap: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-2-1/scene6.mp3")} />

      {/* 왼쪽: 그래프 */}
      <div style={{ flex: 1.2 }}>
        <h2
          style={{
            fontSize: 52,
            color: colors.white,
            fontWeight: "bold",
            marginBottom: 20,
            opacity: titleOpacity,
          }}
        >
          시그모이드 함수
        </h2>

        {/* 수식 */}
        <div
          style={{
            fontSize: 42,
            color: "#2dd4bf",
            fontWeight: "bold",
            marginBottom: 30,
            transform: `scale(${Math.max(0, formulaScale)})`,
            fontFamily: "monospace",
          }}
        >
          σ(x) = 1 / (1 + e<sup style={{ fontSize: 28 }}>-x</sup>)
        </div>

        {/* 그래프 */}
        <svg width={560} height={380}>
          {/* 그리드 */}
          {Array.from({ length: 13 }, (_, i) => (
            <g key={i}>
              <line x1={30 + i * 40} y1={50} x2={30 + i * 40} y2={350} stroke="#374151" strokeWidth={1} />
            </g>
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={30} y1={50 + i * 40} x2={530} y2={50 + i * 40} stroke="#374151" strokeWidth={1} />
          ))}

          {/* 좌표축 */}
          <line x1={30} y1={220} x2={530} y2={220} stroke="#9ca3af" strokeWidth={2} />
          <line x1={280} y1={50} x2={280} y2={350} stroke="#9ca3af" strokeWidth={2} />

          {/* y=0, y=0.5, y=1 기준선 */}
          <line x1={30} y1={320} x2={530} y2={320} stroke="#6b7280" strokeWidth={1} strokeDasharray="4,4" />
          <text x={535} y={325} fill="#9ca3af" fontSize={14}>0</text>
          <line x1={30} y1={220} x2={530} y2={220} stroke="#6b7280" strokeWidth={1} strokeDasharray="4,4" />
          <text x={535} y={225} fill="#9ca3af" fontSize={14}>0.5</text>
          <line x1={30} y1={120} x2={530} y2={120} stroke="#6b7280" strokeWidth={1} strokeDasharray="4,4" />
          <text x={535} y={125} fill="#9ca3af" fontSize={14}>1</text>

          {/* 시그모이드 그래프 */}
          <path
            d={generateSigmoidPath(curveProgress)}
            stroke="#2dd4bf"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />

          {/* (0, 0.5) 점 표시 */}
          {frame > 180 && (
            <g opacity={interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" })}>
              <circle cx={280} cy={220} r={8} fill="#fbbf24" />
              <text x={295} y={215} fill="#fbbf24" fontSize={16}>(0, 0.5)</text>
            </g>
          )}
        </svg>
      </div>

      {/* 오른쪽: 설명 */}
      <div style={{ flex: 0.9 }}>
        <div
          style={{
            padding: "20px 30px",
            backgroundColor: "rgba(45,212,191,0.2)",
            borderRadius: 15,
            border: "2px solid #2dd4bf",
            marginBottom: 20,
            opacity: rangeOpacity,
          }}
        >
          <div style={{ color: "#5eead4", fontSize: 26, fontWeight: "bold", marginBottom: 10 }}>
            출력 범위: 0 ~ 1
          </div>
          <div style={{ color: colors.white, fontSize: 20 }}>
            어떤 입력이든 0과 1 사이로!
          </div>
        </div>

        <div
          style={{
            padding: "20px 30px",
            backgroundColor: "rgba(168,85,247,0.2)",
            borderRadius: 15,
            border: "2px solid #a855f7",
            marginBottom: 20,
            opacity: propertyOpacity,
          }}
        >
          <div style={{ color: "#c084fc", fontSize: 26, fontWeight: "bold", marginBottom: 10 }}>
            S자 곡선 특징
          </div>
          <div style={{ color: colors.white, fontSize: 20, lineHeight: 1.5 }}>
            • 부드러운 전환<br/>
            • 미분 가능<br/>
            • 중심점에서 가장 변화 큼
          </div>
        </div>

        <div
          style={{
            padding: "25px 30px",
            backgroundColor: "rgba(59,130,246,0.2)",
            borderRadius: 15,
            border: "2px solid #3b82f6",
            opacity: aiOpacity,
          }}
        >
          <div style={{ color: "#60a5fa", fontSize: 26, fontWeight: "bold", marginBottom: 10 }}>
            🤖 AI 활용
          </div>
          <div style={{ color: colors.white, fontSize: 20, lineHeight: 1.5 }}>
            <span style={{ color: "#fbbf24" }}>이진 분류</span>의 핵심!<br/>
            고양이(1) vs 강아지(0)<br/>
            스팸(1) vs 정상(0)
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
