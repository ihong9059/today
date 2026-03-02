/**
 * Scene 6: 정리 및 마무리
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const points = [
    { icon: "📐", title: "편미분", desc: "여러 변수 중 하나에 대해서만 미분", color: "#3b82f6" },
    { icon: "🔢", title: "계산 방법", desc: "다른 변수를 상수로 취급", color: "#22c55e" },
    { icon: "🧭", title: "그래디언트", desc: "모든 편미분을 모은 벡터 (∇f)", color: "#a855f7" },
    { icon: "🔽", title: "경사하강법", desc: "그래디언트 반대 방향으로 학습", color: "#ef4444" },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-3/scene6.mp3")} />

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
        top: 150,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}>
        {points.map((point, i) => {
          const appearFrame = 50 + i * 60;
          const pointAppear = spring({ frame: frame - appearFrame, fps, config: { damping: 12 } });

          return (
            <div
              key={i}
              style={{
                opacity: pointAppear,
                transform: `translateX(${(1 - pointAppear) * 50}px)`,
                display: "flex",
                alignItems: "center",
                gap: 25,
                backgroundColor: `${point.color}20`,
                border: `2px solid ${point.color}`,
                borderRadius: 15,
                padding: "20px 35px",
                width: 700,
              }}
            >
              <div style={{
                fontSize: 45,
                width: 60,
                textAlign: "center",
              }}>
                {point.icon}
              </div>
              <div>
                <div style={{
                  color: point.color,
                  fontSize: 28,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}>
                  {i + 1}. {point.title}
                </div>
                <div style={{ color: "#d1d5db", fontSize: 22 }}>
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
        bottom: 130,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: interpolate(frame, [320, 350], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        <div style={{
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          border: "3px solid #fbbf24",
          borderRadius: 20,
          padding: "25px 50px",
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 30,
            color: "#fde047",
            fontWeight: "bold",
            marginBottom: 10,
          }}>
            💡 핵심 메시지
          </div>
          <div style={{
            fontSize: 26,
            color: colors.white,
          }}>
            신경망의 수백만 개 파라미터 각각에 편미분 적용!
          </div>
        </div>
      </div>

      {/* 다음 강의 예고 */}
      <div style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: interpolate(frame, [380, 410], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        <div style={{
          color: "#c4b5fd",
          fontSize: 24,
        }}>
          다음 강의: Lesson 2-4 연쇄법칙 (Chain Rule) →
        </div>
      </div>

      {/* 배경 장식 */}
      <div style={{
        position: "absolute",
        bottom: 30,
        right: 50,
        fontSize: 30,
        color: "rgba(168, 85, 247, 0.2)",
        fontFamily: "monospace",
      }}>
        ∇f = (∂f/∂x, ∂f/∂y)
      </div>
    </AbsoluteFill>
  );
};
