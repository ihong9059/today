/**
 * Lesson 0-6: Matplotlib 기초 - Scene 7: Outro
 * 요약 및 레벨 0 완료
 */

import { AbsoluteFill, interpolate, useCurrentFrame, spring } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L06_Scene7_Outro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const point1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const point2Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const point3Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const point4Opacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });
  const point5Opacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });
  const celebrateOpacity = interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" });
  const nextOpacity = interpolate(frame, [650, 680], [0, 1], { extrapolateRight: "clamp" });

  const celebrateSpring = spring({
    frame: frame - 550,
    fps: FPS,
    config: { damping: 8, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        padding: 50,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 제목 */}
      <h2
        style={{
          fontSize: 48,
          color: colors.white,
          marginBottom: 30,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        📝 오늘 배운 내용 정리
      </h2>

      {/* 5개 핵심 포인트 */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginBottom: 30 }}>
        {/* 포인트 1 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 12,
            padding: 20,
            width: 300,
            border: "2px solid #22c55e",
            opacity: point1Opacity,
          }}
        >
          <span style={{ fontSize: 28, marginRight: 10 }}>1️⃣</span>
          <span style={{ color: "#22c55e", fontSize: 20, fontWeight: "bold" }}>
            import matplotlib.pyplot as plt
          </span>
        </div>

        {/* 포인트 2 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 12,
            padding: 20,
            width: 300,
            border: "2px solid #3b82f6",
            opacity: point2Opacity,
          }}
        >
          <span style={{ fontSize: 28, marginRight: 10 }}>2️⃣</span>
          <span style={{ color: "#3b82f6", fontSize: 20, fontWeight: "bold" }}>
            plot, scatter, bar, hist
          </span>
        </div>

        {/* 포인트 3 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 12,
            padding: 20,
            width: 300,
            border: "2px solid #f97316",
            opacity: point3Opacity,
          }}
        >
          <span style={{ fontSize: 28, marginRight: 10 }}>3️⃣</span>
          <span style={{ color: "#f97316", fontSize: 20, fontWeight: "bold" }}>
            학습 곡선 (Loss, Accuracy)
          </span>
        </div>

        {/* 포인트 4 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 12,
            padding: 20,
            width: 300,
            border: "2px solid #8b5cf6",
            opacity: point4Opacity,
          }}
        >
          <span style={{ fontSize: 28, marginRight: 10 }}>4️⃣</span>
          <span style={{ color: "#8b5cf6", fontSize: 20, fontWeight: "bold" }}>
            subplot으로 여러 그래프
          </span>
        </div>

        {/* 포인트 5 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 12,
            padding: 20,
            width: 300,
            border: "2px solid #ec4899",
            opacity: point5Opacity,
          }}
        >
          <span style={{ fontSize: 28, marginRight: 10 }}>5️⃣</span>
          <span style={{ color: "#ec4899", fontSize: 20, fontWeight: "bold" }}>
            imshow로 이미지 시각화
          </span>
        </div>
      </div>

      {/* 레벨 0 완료 축하 */}
      <div
        style={{
          backgroundColor: "#22c55e20",
          border: "3px solid #22c55e",
          borderRadius: 20,
          padding: "30px 50px",
          textAlign: "center",
          opacity: celebrateOpacity,
          transform: `scale(${Math.min(celebrateSpring, 1)})`,
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 15 }}>🎉</div>
        <div style={{ fontSize: 36, color: "#22c55e", fontWeight: "bold", marginBottom: 10 }}>
          레벨 0 Python 기초 완료!
        </div>
        <div style={{ fontSize: 22, color: colors.gray[300] }}>
          Python 환경설정부터 시각화까지 기본기를 마스터했습니다
        </div>
      </div>

      {/* 다음 레벨 예고 */}
      <div
        style={{
          marginTop: 30,
          textAlign: "center",
          opacity: nextOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: colors.gray[800],
            borderRadius: 12,
            padding: "15px 40px",
          }}
        >
          <span style={{ color: colors.gray[400], fontSize: 22 }}>다음 레벨:</span>
          <span style={{ color: "#f97316", fontSize: 22, fontWeight: "bold", marginLeft: 15 }}>
            레벨 1 - 딥러닝의 수학적 기초
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
