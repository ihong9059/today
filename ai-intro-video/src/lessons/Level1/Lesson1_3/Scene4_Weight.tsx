/**
 * Scene 4: 가중치 (Weight) 설명
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene4_Weight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const weightExampleReveal = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });
  const highWeightReveal = interpolate(frame, [180, 220], [0, 1], { extrapolateRight: "clamp" });
  const zeroWeightReveal = interpolate(frame, [300, 340], [0, 1], { extrapolateRight: "clamp" });
  const negativeWeightReveal = interpolate(frame, [420, 460], [0, 1], { extrapolateRight: "clamp" });
  const learningReveal = interpolate(frame, [540, 580], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* 타이틀 */}
      <div
        style={{
          opacity: titleOpacity,
          marginBottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 70 }}>⚖️</span>
        <div>
          <h2
            style={{
              fontSize: 64,
              color: "#f97316",
              fontWeight: "bold",
            }}
          >
            구성요소 2: 가중치 (Weight)
          </h2>
          <p
            style={{
              fontSize: 30,
              color: colors.gray[400],
            }}
          >
            각 입력이 얼마나 중요한지를 나타내는 숫자
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 50, width: "100%", justifyContent: "center" }}>
        {/* 왼쪽: 스팸 분류 예시 */}
        <div
          style={{
            opacity: weightExampleReveal,
            backgroundColor: "#f9731615",
            border: "2px solid #f97316",
            borderRadius: 20,
            padding: 35,
            width: 450,
          }}
        >
          <h3
            style={{
              fontSize: 32,
              color: "#f97316",
              fontWeight: "bold",
              marginBottom: 25,
              textAlign: "center",
            }}
          >
            📧 스팸 분류 예시
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { word: "'무료'", weight: "2.0", desc: "스팸 가능성 ↑↑", barWidth: 100 },
              { word: "'당첨'", weight: "1.8", desc: "스팸 가능성 ↑", barWidth: 90 },
              { word: "'안녕하세요'", weight: "0.1", desc: "일반적 표현", barWidth: 10 },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <span style={{ fontSize: 24, color: colors.white, width: 120 }}>{item.word}</span>
                <span style={{ fontSize: 28, color: "#f97316", fontWeight: "bold", width: 50 }}>
                  ×{item.weight}
                </span>
                <div
                  style={{
                    height: 20,
                    width: `${item.barWidth}%`,
                    backgroundColor: "#f97316",
                    borderRadius: 10,
                    maxWidth: 150,
                  }}
                />
                <span style={{ fontSize: 20, color: colors.gray[400] }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 가중치 특성 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 25, width: 500 }}>
          {/* 높은 가중치 */}
          <div
            style={{
              opacity: highWeightReveal,
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              borderRadius: 15,
              padding: 25,
            }}
          >
            <h4 style={{ fontSize: 28, color: "#22c55e", fontWeight: "bold", marginBottom: 10 }}>
              가중치가 높으면?
            </h4>
            <p style={{ fontSize: 24, color: colors.gray[300] }}>
              → 그 입력이 결과에 큰 영향을 미침
            </p>
          </div>

          {/* 0 가중치 */}
          <div
            style={{
              opacity: zeroWeightReveal,
              backgroundColor: colors.gray[800],
              border: `2px solid ${colors.gray[600]}`,
              borderRadius: 15,
              padding: 25,
            }}
          >
            <h4 style={{ fontSize: 28, color: colors.gray[400], fontWeight: "bold", marginBottom: 10 }}>
              가중치가 0이면?
            </h4>
            <p style={{ fontSize: 24, color: colors.gray[400] }}>
              → 그 입력은 완전히 무시됨
            </p>
          </div>

          {/* 음수 가중치 */}
          <div
            style={{
              opacity: negativeWeightReveal,
              backgroundColor: "#ef444420",
              border: "2px solid #ef4444",
              borderRadius: 15,
              padding: 25,
            }}
          >
            <h4 style={{ fontSize: 28, color: "#ef4444", fontWeight: "bold", marginBottom: 10 }}>
              음수 가중치?
            </h4>
            <p style={{ fontSize: 24, color: colors.gray[300] }}>
              → 입력이 높을수록 출력은 낮아짐 (억제 효과)
            </p>
          </div>

          {/* 학습 */}
          <div
            style={{
              opacity: learningReveal,
              backgroundColor: "#8b5cf620",
              border: "2px solid #8b5cf6",
              borderRadius: 15,
              padding: 25,
            }}
          >
            <h4 style={{ fontSize: 28, color: "#8b5cf6", fontWeight: "bold", marginBottom: 10 }}>
              🎓 핵심 포인트
            </h4>
            <p style={{ fontSize: 24, color: colors.gray[300] }}>
              가중치는 <span style={{ color: "#8b5cf6", fontWeight: "bold" }}>학습</span>을 통해 자동 조절됩니다!
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
