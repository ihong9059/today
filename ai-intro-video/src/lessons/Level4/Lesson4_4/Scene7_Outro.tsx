/**
 * Lesson 4-4 Scene 7: 정리 및 마무리
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const summaryPoints = [
    { num: "1", text: "nn.Module을 상속받아 모델 정의" },
    { num: "2", text: "__init__에서 super().__init__() 호출 후 레이어 정의" },
    { num: "3", text: "forward 메서드에서 순전파 구현" },
    { num: "4", text: "parameters()로 학습 가능한 파라미터 관리" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a1a2e 50%, #16213e 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-4/scene7.mp3")} />

      <h2
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        정리
      </h2>

      {/* 요약 포인트들 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 25,
          width: "80%",
          maxWidth: 900,
        }}
      >
        {summaryPoints.map((point, i) => {
          const pointOpacity = interpolate(
            frame,
            [60 + i * 40, 100 + i * 40],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 25,
                backgroundColor: colors.gray[800],
                padding: "20px 30px",
                borderRadius: 15,
                opacity: pointOpacity,
                transform: `translateX(${interpolate(frame, [60 + i * 40, 100 + i * 40], [-50, 0], { extrapolateRight: "clamp" })}px)`,
                borderLeft: `5px solid ${colors.level[4]}`,
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: colors.level[4],
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  fontWeight: "bold",
                  color: colors.white,
                }}
              >
                {point.num}
              </div>
              <span style={{ fontSize: 26, color: colors.white }}>
                {point.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          marginTop: 60,
          textAlign: "center",
          opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p style={{ fontSize: 28, color: colors.gray[400], marginBottom: 15 }}>
          다음 강의
        </p>
        <div
          style={{
            backgroundColor: colors.level[4],
            padding: "20px 50px",
            borderRadius: 15,
            fontSize: 36,
            fontWeight: "bold",
            color: colors.white,
            boxShadow: `0 0 30px ${colors.level[4]}60`,
          }}
        >
          모델 저장과 로드
        </div>
      </div>

      {/* 레슨 배지 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 24,
          color: colors.gray[500],
          opacity: interpolate(frame, [360, 390], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        Lesson 4-4 완료
      </div>
    </AbsoluteFill>
  );
};
