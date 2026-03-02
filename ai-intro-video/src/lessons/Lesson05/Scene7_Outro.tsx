/**
 * Lesson 0-5: NumPy 기초 - Scene 7: Outro
 * 요약 및 다음 레슨 예고
 */

import { AbsoluteFill, interpolate, useCurrentFrame, spring } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L05_Scene7_Outro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const point1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const point2Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const point3Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const point4Opacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });
  const insightOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });
  const nextOpacity = interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" });

  const celebrateSpring = spring({
    frame: frame - 450,
    fps: FPS,
    config: { damping: 8, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        padding: 60,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 제목 */}
      <h2
        style={{
          fontSize: 56,
          color: colors.white,
          marginBottom: 40,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        📝 오늘 배운 내용 정리
      </h2>

      {/* 4개 핵심 포인트 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 25,
          flex: 1,
        }}
      >
        {/* 포인트 1 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #22c55e",
            opacity: point1Opacity,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 10 }}>
            <span style={{ fontSize: 36 }}>1️⃣</span>
            <span style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold" }}>
              NumPy = AI의 기반
            </span>
          </div>
          <div style={{ color: colors.gray[300], fontSize: 20 }}>
            대규모 숫자 연산을 빠르고 효율적으로 처리
          </div>
        </div>

        {/* 포인트 2 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #3b82f6",
            opacity: point2Opacity,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 10 }}>
            <span style={{ fontSize: 36 }}>2️⃣</span>
            <span style={{ color: "#3b82f6", fontSize: 28, fontWeight: "bold" }}>
              텐서 = 다차원 배열
            </span>
          </div>
          <div style={{ color: colors.gray[300], fontSize: 20 }}>
            스칼라 → 벡터 → 행렬 → 3D+ 텐서
          </div>
        </div>

        {/* 포인트 3 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #f97316",
            opacity: point3Opacity,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 10 }}>
            <span style={{ fontSize: 36 }}>3️⃣</span>
            <span style={{ color: "#f97316", fontSize: 28, fontWeight: "bold" }}>
              Shape & Reshape
            </span>
          </div>
          <div style={{ color: colors.gray[300], fontSize: 20 }}>
            배열 형태 확인 및 자유로운 변환
          </div>
        </div>

        {/* 포인트 4 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #8b5cf6",
            opacity: point4Opacity,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 10 }}>
            <span style={{ fontSize: 36 }}>4️⃣</span>
            <span style={{ color: "#8b5cf6", fontSize: 28, fontWeight: "bold" }}>
              브로드캐스팅
            </span>
          </div>
          <div style={{ color: colors.gray[300], fontSize: 20 }}>
            다른 shape끼리도 자동으로 연산 가능
          </div>
        </div>
      </div>

      {/* 핵심 인사이트 */}
      <div
        style={{
          backgroundColor: "#22c55e20",
          border: "3px solid #22c55e",
          borderRadius: 16,
          padding: "25px 40px",
          marginTop: 30,
          textAlign: "center",
          opacity: insightOpacity,
          transform: `scale(${Math.min(celebrateSpring, 1)})`,
        }}
      >
        <span style={{ fontSize: 28, color: "#22c55e", fontWeight: "bold" }}>
          💡 NumPy를 이해하면 딥러닝의 데이터 흐름이 눈에 보입니다!
        </span>
      </div>

      {/* 다음 레슨 예고 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 30,
          opacity: nextOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 12,
            padding: "15px 30px",
          }}
        >
          <span style={{ color: colors.gray[400], fontSize: 20 }}>다음 레슨:</span>
          <span style={{ color: "#f97316", fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
            조건문 - AI의 의사결정
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
