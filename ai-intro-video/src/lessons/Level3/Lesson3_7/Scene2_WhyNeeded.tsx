/**
 * Scene 2: 왜 활성화 함수가 필요한가?
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_WhyNeeded: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const questionOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const linearOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const problemOpacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });
  const solutionOpacity = interpolate(frame, [480, 510], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-7/scene2.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        왜 활성화 함수가 필요할까?
      </h1>

      {/* 질문 */}
      <div
        style={{
          backgroundColor: "#60a5fa20",
          border: "2px solid #60a5fa",
          padding: 20,
          borderRadius: 16,
          textAlign: "center",
          marginBottom: 30,
          opacity: questionOpacity,
        }}
      >
        <span style={{ color: "#60a5fa", fontSize: 28 }}>
          활성화 함수 없이 선형 변환만 연결하면?
        </span>
      </div>

      <div style={{ display: "flex", gap: 35 }}>
        {/* 왼쪽: 선형 변환 연결 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              opacity: linearOpacity,
            }}
          >
            <h3 style={{ color: "#fbbf24", fontSize: 26, marginBottom: 20 }}>
              선형 변환의 연결
            </h3>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              <div style={{ color: colors.white, fontSize: 24 }}>
                첫 번째 층: <span style={{ color: "#22c55e" }}>y = wx</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              <div style={{ color: colors.white, fontSize: 24 }}>
                두 번째 층: <span style={{ color: "#60a5fa" }}>z = vy</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f8717120",
                border: "2px solid #f87171",
                padding: 15,
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              <div style={{ color: colors.white, fontSize: 24 }}>
                결과: z = v(wx) = <span style={{ color: "#f87171" }}>(vw)x</span>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 문제점과 해결책 */}
        <div style={{ flex: 1 }}>
          {/* 문제점 */}
          <div
            style={{
              backgroundColor: "#f8717120",
              border: "2px solid #f87171",
              padding: 20,
              borderRadius: 16,
              marginBottom: 20,
              opacity: problemOpacity,
            }}
          >
            <div style={{ color: "#f87171", fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
              문제!
            </div>
            <div style={{ color: colors.white, fontSize: 22 }}>
              아무리 층을 쌓아도 결국 하나의 선형 변환!
            </div>
            <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 10 }}>
              표현력이 전혀 증가하지 않음
            </div>
          </div>

          {/* 해결책 */}
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "3px solid #22c55e",
              padding: 20,
              borderRadius: 16,
              opacity: solutionOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
              해결책: 비선형 활성화 함수!
            </div>
            <div style={{ color: colors.white, fontSize: 22 }}>
              y = σ(wx) → z = σ(vy)
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18, marginTop: 10 }}>
              복잡한 패턴 학습 가능!
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
