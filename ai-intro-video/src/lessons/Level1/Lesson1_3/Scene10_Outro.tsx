/**
 * Scene 10: 아웃트로 - 다음 강의 예고
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene10_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summaryOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const nextReveal = interpolate(frame, [120, 160], [0, 1], { extrapolateRight: "clamp" });
  const ctaReveal = interpolate(frame, [300, 340], [0, 1], { extrapolateRight: "clamp" });

  // 펄스 애니메이션
  const pulse = Math.sin(frame * 0.1) * 0.1 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          display: "flex",
          gap: 20,
        }}
      >
        <div
          style={{
            backgroundColor: colors.primary[500],
            color: colors.white,
            padding: "12px 30px",
            borderRadius: 30,
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          Lesson 1-3 완료!
        </div>
      </div>

      {/* 요약 메시지 */}
      <div
        style={{
          opacity: summaryOpacity,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 56,
            color: colors.white,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          퍼셉트론의 내부 구조를 마스터했습니다!
        </h2>
        <div style={{ display: "flex", gap: 25, justifyContent: "center" }}>
          {["입력", "가중치", "편향", "활성화 함수"].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: colors.primary[500] + "30",
                border: `2px solid ${colors.primary[500]}`,
                borderRadius: 15,
                padding: "12px 25px",
                fontSize: 26,
                color: colors.primary[300],
                fontWeight: "bold",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          opacity: nextReveal,
          backgroundColor: "#22c55e15",
          border: "3px solid #22c55e",
          borderRadius: 25,
          padding: "40px 60px",
          marginBottom: 40,
          textAlign: "center",
          transform: `scale(${interpolate(nextReveal, [0, 1], [0.9, 1])})`,
        }}
      >
        <span style={{ fontSize: 30, color: colors.gray[400] }}>다음 강의</span>
        <h3
          style={{
            fontSize: 48,
            color: "#22c55e",
            fontWeight: "bold",
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          Lesson 1-4: 퍼셉트론 학습
        </h3>
        <p style={{ fontSize: 26, color: colors.gray[300] }}>
          가중치 업데이트 규칙, 학습률, 실제 학습 과정
        </p>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "#22c55e",
            fontWeight: "bold",
          }}
        >
          "퍼셉트론의 진정한 힘은 학습에서 나옵니다!"
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaReveal,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 25,
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <div
            style={{
              backgroundColor: "#ef4444",
              color: colors.white,
              padding: "15px 35px",
              borderRadius: 15,
              fontSize: 28,
              fontWeight: "bold",
              transform: `scale(${pulse})`,
            }}
          >
            👍 좋아요
          </div>
          <div
            style={{
              backgroundColor: "#3b82f6",
              color: colors.white,
              padding: "15px 35px",
              borderRadius: 15,
              fontSize: 28,
              fontWeight: "bold",
              transform: `scale(${pulse})`,
            }}
          >
            🔔 구독
          </div>
        </div>

        <p style={{ fontSize: 26, color: colors.gray[400] }}>
          더 자세한 학습 자료는 영상 설명의 웹사이트 링크에서 확인하세요!
        </p>
      </div>

      {/* 시리즈 표시 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          color: colors.gray[500],
          fontSize: 24,
        }}
      >
        AI 기초 교육 시리즈 | Level 1
      </div>
    </AbsoluteFill>
  );
};
