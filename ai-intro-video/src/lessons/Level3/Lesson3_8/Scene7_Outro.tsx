/**
 * Scene 7: 아웃트로 - Level 3 완료!
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const point1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const point2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const point3Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const point4Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });

  const congratsOpacity = interpolate(frame, [360, 390], [0, 1], { extrapolateRight: "clamp" });
  const congratsScale = spring({ frame: frame - 360, fps, from: 0.5, to: 1, durationInFrames: 30 });

  const nextOpacity = interpolate(frame, [480, 510], [0, 1], { extrapolateRight: "clamp" });

  const summaryItems = [
    { text: "과적합: 훈련 데이터만 잘 맞추는 문제", color: "#f87171", opacity: point1Opacity },
    { text: "Early Stopping: 검증 손실 모니터링", color: "#60a5fa", opacity: point2Opacity },
    { text: "L2 정규화: 가중치에 페널티", color: "#a855f7", opacity: point3Opacity },
    { text: "Dropout: 무작위로 뉴런 끄기", color: "#22c55e", opacity: point4Opacity },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-8/scene7.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 50,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        Level 3 완료!
      </h1>

      {/* 요약 포인트들 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          marginBottom: 25,
        }}
      >
        {summaryItems.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: colors.gray[800],
              padding: "14px 30px",
              borderRadius: 14,
              borderLeft: `5px solid ${item.color}`,
              opacity: item.opacity,
              transform: `translateX(${interpolate(item.opacity, [0, 1], [50, 0])}px)`,
            }}
          >
            <span style={{ color: colors.white, fontSize: 22 }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* 축하 메시지 */}
      <div
        style={{
          backgroundColor: `${colors.level[3]}20`,
          border: `3px solid ${colors.level[3]}`,
          padding: 25,
          borderRadius: 20,
          textAlign: "center",
          marginBottom: 25,
          opacity: congratsOpacity,
          transform: `scale(${congratsScale})`,
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 10 }}>🎉</div>
        <div style={{ color: colors.level[3], fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
          딥러닝 핵심 개념 마스터!
        </div>
        <div style={{ color: colors.white, fontSize: 20 }}>
          손실함수 → 경사하강법 → 순전파/역전파 → 활성화 함수 → 정규화
        </div>
      </div>

      {/* 다음 단계 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          border: "2px solid #22c55e",
          padding: "18px 40px",
          borderRadius: 20,
          textAlign: "center",
          opacity: nextOpacity,
        }}
      >
        <div style={{ color: "#22c55e", fontSize: 18, marginBottom: 8 }}>
          다음 레벨
        </div>
        <div style={{ color: colors.white, fontSize: 26, fontWeight: "bold" }}>
          Level 4: 실전 프로젝트
        </div>
        <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 8 }}>
          배운 내용을 실제 프로젝트에 적용해봅시다!
        </div>
      </div>

      {/* 마무리 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: nextOpacity,
        }}
      >
        <div style={{ fontSize: 30, color: "#fbbf24", fontWeight: "bold" }}>
          정말 수고하셨습니다!
        </div>
      </div>
    </AbsoluteFill>
  );
};
