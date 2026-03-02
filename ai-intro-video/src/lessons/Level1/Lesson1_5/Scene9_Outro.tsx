/**
 * Lesson 1-5: AND, OR, NOT 게이트
 * Scene 9: 아웃트로 (핵심 정리 및 다음 강의 예고)
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene9_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 요약 카드들
  const card1Opacity = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" });
  const card1Scale = spring({ frame: frame - 50, fps, config: { damping: 12 } });

  const card2Opacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  const card2Scale = spring({ frame: frame - 100, fps, config: { damping: 12 } });

  const card3Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const card3Scale = spring({ frame: frame - 150, fps, config: { damping: 12 } });

  const card4Opacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });
  const card4Scale = spring({ frame: frame - 200, fps, config: { damping: 12 } });

  // 다음 강의 예고
  const nextOpacity = interpolate(frame, [280, 320], [0, 1], { extrapolateRight: "clamp" });

  // CTA
  const ctaOpacity = interpolate(frame, [350, 390], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, #312e81 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-5/scene9_outro.mp3")} />

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

      {/* 요약 카드들 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 25, justifyContent: "center", marginBottom: 40 }}>
        {/* 카드 1: 논리 게이트 */}
        <div
          style={{
            width: 420,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 25,
            border: "3px solid #8b5cf6",
            opacity: card1Opacity,
            transform: `scale(${card1Scale})`,
          }}
        >
          <div style={{ fontSize: 22, color: "#8b5cf6", fontWeight: "bold", marginBottom: 10 }}>
            1. 논리 게이트
          </div>
          <div style={{ fontSize: 20, color: colors.gray[300] }}>
            컴퓨터 연산의 기초
            <br />
            AND, OR, NOT으로 모든 연산 가능
          </div>
        </div>

        {/* 카드 2: AND 게이트 */}
        <div
          style={{
            width: 420,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 25,
            border: "3px solid #3b82f6",
            opacity: card2Opacity,
            transform: `scale(${card2Scale})`,
          }}
        >
          <div style={{ fontSize: 22, color: "#3b82f6", fontWeight: "bold", marginBottom: 10 }}>
            2. AND 게이트
          </div>
          <div style={{ fontSize: 20, color: colors.gray[300] }}>
            둘 다 참일 때만 참
            <br />
            w₁=0.5, w₂=0.5, b=-0.7
          </div>
        </div>

        {/* 카드 3: OR 게이트 */}
        <div
          style={{
            width: 420,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 25,
            border: "3px solid #22c55e",
            opacity: card3Opacity,
            transform: `scale(${card3Scale})`,
          }}
        >
          <div style={{ fontSize: 22, color: "#22c55e", fontWeight: "bold", marginBottom: 10 }}>
            3. OR 게이트
          </div>
          <div style={{ fontSize: 20, color: colors.gray[300] }}>
            하나라도 참이면 참
            <br />
            편향만 b=-0.2로 변경
          </div>
        </div>

        {/* 카드 4: NOT 게이트 */}
        <div
          style={{
            width: 420,
            backgroundColor: colors.gray[800],
            borderRadius: 20,
            padding: 25,
            border: "3px solid #ef4444",
            opacity: card4Opacity,
            transform: `scale(${card4Scale})`,
          }}
        >
          <div style={{ fontSize: 22, color: "#ef4444", fontWeight: "bold", marginBottom: 10 }}>
            4. NOT 게이트
          </div>
          <div style={{ fontSize: 20, color: colors.gray[300] }}>
            입력을 반전
            <br />
            음수 가중치(w=-1)로 구현
          </div>
        </div>
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: "#f59e0b30",
          border: "2px solid #f59e0b",
          borderRadius: 20,
          padding: "25px 50px",
          textAlign: "center",
          opacity: nextOpacity,
          marginBottom: 30,
        }}
      >
        <div style={{ fontSize: 24, color: "#fbbf24", marginBottom: 10 }}>
          다음 강의 예고
        </div>
        <div style={{ fontSize: 34, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>
          Lesson 1-6: XOR 문제와 한계
        </div>
        <div style={{ fontSize: 22, color: colors.gray[300] }}>
          퍼셉트론이 해결하지 못하는 문제가 있다?!
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
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

      {/* 시리즈 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          color: colors.gray[400],
          fontSize: 22,
        }}
      >
        AI 기초 교육 시리즈 - Level 1
      </div>
    </AbsoluteFill>
  );
};
