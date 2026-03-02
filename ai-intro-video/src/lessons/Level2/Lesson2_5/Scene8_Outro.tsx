/**
 * Scene 8: 정리 및 마무리
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene8_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const points = [
    { icon: "📊", title: "벡터", desc: "숫자들의 순서가 있는 목록 → 데이터 표현", color: "#3b82f6" },
    { icon: "📐", title: "행렬", desc: "숫자들을 행과 열로 배열 → 가중치 저장", color: "#22c55e" },
    { icon: "✖️", title: "행렬 곱셈", desc: "신경망의 핵심 연산 (y = Wx + b)", color: "#a855f7" },
    { icon: "🎮", title: "GPU", desc: "행렬 연산을 병렬 처리 → AI 학습 가속", color: "#f97316" },
    { icon: "🧮", title: "HBM", desc: "초고대역폭 메모리 → 메모리 병목 해결", color: "#ef4444" },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-5/scene8.mp3")} />

      {/* 타이틀 */}
      <div style={{
        position: "absolute",
        top: 50,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: titleOpacity,
      }}>
        <h1 style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          margin: 0,
        }}>
          📝 오늘 배운 내용 정리
        </h1>
      </div>

      {/* 요약 포인트들 */}
      <div style={{
        position: "absolute",
        top: 140,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}>
        {points.map((point, i) => {
          const appearFrame = 30 + i * 50;
          const pointAppear = spring({ frame: frame - appearFrame, fps, config: { damping: 12 } });

          return (
            <div
              key={i}
              style={{
                opacity: pointAppear,
                transform: `translateX(${(1 - pointAppear) * 50}px)`,
                display: "flex",
                alignItems: "center",
                gap: 20,
                backgroundColor: `${point.color}20`,
                border: `2px solid ${point.color}`,
                borderRadius: 15,
                padding: "15px 30px",
                width: 800,
              }}
            >
              <div style={{
                fontSize: 40,
                width: 60,
                textAlign: "center",
              }}>
                {point.icon}
              </div>
              <div>
                <div style={{
                  color: point.color,
                  fontSize: 26,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}>
                  {i + 1}. {point.title}
                </div>
                <div style={{ color: "#d1d5db", fontSize: 20 }}>
                  {point.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 핵심 메시지 */}
      <div style={{
        position: "absolute",
        bottom: 120,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        <div style={{
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          border: "3px solid #fbbf24",
          borderRadius: 20,
          padding: "25px 50px",
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 32,
            color: "#fde047",
            fontWeight: "bold",
            marginBottom: 15,
          }}>
            💡 핵심 메시지
          </div>
          <div style={{
            fontSize: 26,
            color: colors.white,
          }}>
            "행렬 연산을 이해하면<br />
            AI 하드웨어가 왜 이렇게 발전했는지 알 수 있습니다!"
          </div>
        </div>
      </div>

      {/* 다음 강의 예고 */}
      <div style={{
        position: "absolute",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        <div style={{
          color: "#c4b5fd",
          fontSize: 22,
        }}>
          다음 강의: Lesson 2-6 확률의 기초 →
        </div>
      </div>

      {/* 배경 장식 */}
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.1,
          pointerEvents: "none",
        }}
      >
        {/* 행렬 패턴 */}
        <text x={100} y={950} fill="#a855f7" fontSize={40} fontFamily="monospace">
          [W × x + b]
        </text>
        <text x={1400} y={900} fill="#a855f7" fontSize={30} fontFamily="monospace">
          GPU → HBM
        </text>
      </svg>
    </AbsoluteFill>
  );
};
