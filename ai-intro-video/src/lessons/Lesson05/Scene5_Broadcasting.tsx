/**
 * Lesson 0-5: NumPy 기초 - Scene 5: 브로드캐스팅
 * 서로 다른 shape 배열 간의 연산
 */

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L05_Scene5_Broadcasting: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const example1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const arrowOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const example2Opacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const whyOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        padding: 50,
      }}
    >
      {/* 제목 */}
      <h2
        style={{
          fontSize: 48,
          color: colors.white,
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        📡 브로드캐스팅 (Broadcasting)
      </h2>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 예시 1 - 스칼라 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              border: "2px solid #22c55e",
              opacity: example1Opacity,
              marginBottom: 30,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
              예시 1: 행렬 + 스칼라
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {/* 3x3 행렬 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {[[1, 2, 3], [4, 5, 6], [7, 8, 9]].map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: 5 }}>
                    {row.map((n, j) => (
                      <div
                        key={j}
                        style={{
                          width: 45,
                          height: 45,
                          backgroundColor: colors.gray[700],
                          borderRadius: 6,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 22,
                          color: colors.gray[300],
                        }}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* + 10 */}
              <div style={{ fontSize: 30, color: "#22c55e", fontWeight: "bold" }}>+ 10</div>

              {/* 화살표 */}
              <div
                style={{
                  fontSize: 30,
                  color: colors.gray[500],
                  opacity: arrowOpacity,
                }}
              >
                →
              </div>

              {/* 결과 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  opacity: arrowOpacity,
                }}
              >
                {[[11, 12, 13], [14, 15, 16], [17, 18, 19]].map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: 5 }}>
                    {row.map((n, j) => (
                      <div
                        key={j}
                        style={{
                          width: 45,
                          height: 45,
                          backgroundColor: "#22c55e40",
                          borderRadius: 6,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 22,
                          fontWeight: "bold",
                          color: "#22c55e",
                        }}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 15 }}>
              10이 자동으로 모든 원소에 적용!
            </div>
          </div>

          {/* 예시 2: 행렬 + 벡터 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              border: "2px solid #3b82f6",
              opacity: example2Opacity,
            }}
          >
            <div style={{ color: "#3b82f6", fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
              예시 2: 행렬 + 벡터
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
              {/* 3x3 행렬 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {[[1, 2, 3], [4, 5, 6], [7, 8, 9]].map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: 5 }}>
                    {row.map((n, j) => (
                      <div
                        key={j}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: colors.gray[700],
                          borderRadius: 5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          color: colors.gray[300],
                        }}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 26, color: "#3b82f6" }}>+</div>

              {/* 1x3 벡터 */}
              <div style={{ display: "flex", gap: 5 }}>
                {[10, 20, 30].map((n, j) => (
                  <div
                    key={j}
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#3b82f640",
                      borderRadius: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      color: "#3b82f6",
                    }}
                  >
                    {n}
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 26, color: colors.gray[500] }}>→</div>

              {/* 결과 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {[[11, 22, 33], [14, 25, 36], [17, 28, 39]].map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: 5 }}>
                    {row.map((n, j) => (
                      <div
                        key={j}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#3b82f640",
                          borderRadius: 5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#3b82f6",
                        }}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 왜 중요한가 */}
        <div style={{ flex: 0.8, opacity: whyOpacity }}>
          <div
            style={{
              backgroundColor: "#f9731620",
              border: "3px solid #f97316",
              borderRadius: 16,
              padding: 30,
              height: "100%",
            }}
          >
            <div style={{ color: "#f97316", fontSize: 28, fontWeight: "bold", marginBottom: 25 }}>
              🚀 왜 중요한가?
            </div>

            <div style={{ marginBottom: 25 }}>
              <div style={{ color: "#22c55e", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
                1. 배치 처리
              </div>
              <div style={{ color: colors.gray[300], fontSize: 18 }}>
                100장 이미지에 같은 연산을<br />
                반복문 없이 한 번에!
              </div>
            </div>

            <div style={{ marginBottom: 25 }}>
              <div style={{ color: "#3b82f6", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
                2. 코드 간결화
              </div>
              <div style={{ color: colors.gray[300], fontSize: 18 }}>
                for 루프 없이<br />
                직관적인 연산 표현
              </div>
            </div>

            <div>
              <div style={{ color: "#8b5cf6", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
                3. 속도 향상
              </div>
              <div style={{ color: colors.gray[300], fontSize: 18 }}>
                C로 최적화된<br />
                벡터화 연산 사용
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
