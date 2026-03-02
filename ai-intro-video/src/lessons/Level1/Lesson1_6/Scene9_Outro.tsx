/**
 * Lesson 1-6: XOR 문제와 한계
 * Scene 9: 아웃트로
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene9_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 요약 포인트들
  const point1 = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" });
  const point2 = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  const point3 = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const point4 = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });

  // 다음 강의 예고
  const nextOpacity = interpolate(frame, [280, 330], [0, 1], { extrapolateRight: "clamp" });
  const nextScale = spring({ frame: frame - 280, fps, config: { damping: 12 } });

  // CTA
  const ctaOpacity = interpolate(frame, [380, 420], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, #312e81 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-6/scene9_outro.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 52,
          color: colors.white,
          fontWeight: "bold",
          opacity: titleOpacity,
          marginBottom: 40,
        }}
      >
        오늘 배운 내용 정리
      </h2>

      {/* 요약 포인트들 */}
      <div style={{ width: "80%", maxWidth: 900 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 20,
            opacity: point1,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            1
          </div>
          <div style={{ fontSize: 26, color: colors.white }}>
            <span style={{ color: "#f59e0b", fontWeight: "bold" }}>XOR</span> = 두 입력이 다를 때만 참
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 20,
            opacity: point2,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "#6366f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            2
          </div>
          <div style={{ fontSize: 26, color: colors.white }}>
            퍼셉트론 = <span style={{ color: "#a5b4fc" }}>선형 분리 가능한 문제</span>만 해결
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 20,
            opacity: point3,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            3
          </div>
          <div style={{ fontSize: 26, color: colors.white }}>
            XOR = <span style={{ color: "#fca5a5" }}>선형 분리 불가능</span> → 단일 퍼셉트론 실패
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: point4,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            4
          </div>
          <div style={{ fontSize: 26, color: colors.white }}>
            해결책 = <span style={{ color: "#86efac", fontWeight: "bold" }}>다층 퍼셉트론!</span>
          </div>
        </div>
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: "#8b5cf630",
          border: "3px solid #8b5cf6",
          borderRadius: 20,
          padding: "25px 50px",
          textAlign: "center",
          marginTop: 40,
          opacity: nextOpacity,
          transform: `scale(${nextScale})`,
        }}
      >
        <div style={{ fontSize: 22, color: "#c4b5fd", marginBottom: 10 }}>
          다음 강의 (Level 1 마지막!)
        </div>
        <div style={{ fontSize: 34, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>
          Lesson 1-7: 다층 퍼셉트론
        </div>
        <div style={{ fontSize: 24, color: "#a5b4fc" }}>
          드디어 XOR을 해결하고, 딥러닝의 시작점을 배웁니다!
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          position: "absolute",
          bottom: 60,
          opacity: ctaOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#ef4444",
            borderRadius: 50,
            padding: "18px 40px",
            fontSize: 26,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          구독
        </div>
        <div
          style={{
            backgroundColor: "#3b82f6",
            borderRadius: 50,
            padding: "18px 40px",
            fontSize: 26,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          좋아요
        </div>
        <div
          style={{
            fontSize: 28,
            color: colors.gray[300],
          }}
        >
          다음 강의에서 만나요!
        </div>
      </div>
    </AbsoluteFill>
  );
};
