/**
 * Lesson 0-5: NumPy 기초 - Scene 3: 배열 생성
 * np.array, np.zeros, np.ones, np.arange, np.random
 */

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L05_Scene3_ArrayCreation: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const importOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const arrayOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const zerosOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const onesOpacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });
  const arangeOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });
  const randomOpacity = interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" });

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
        🛠️ NumPy 배열 생성하기
      </h2>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 코드 */}
        <div style={{ flex: 1.2 }}>
          {/* import */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 15,
              opacity: importOpacity,
            }}
          >
            <div style={{ fontFamily: "monospace", fontSize: 24, color: colors.gray[300] }}>
              <span style={{ color: "#c084fc" }}>import</span> numpy{" "}
              <span style={{ color: "#c084fc" }}>as</span> np
            </div>
          </div>

          {/* np.array */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 15,
              border: "2px solid #22c55e",
              opacity: arrayOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 18, marginBottom: 10 }}>
              ▸ np.array() - 리스트에서 생성
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 20, color: colors.gray[300] }}>
              arr = np.array([<span style={{ color: "#f97316" }}>1, 2, 3, 4, 5</span>])
            </div>
          </div>

          {/* np.zeros */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 15,
              border: "2px solid #3b82f6",
              opacity: zerosOpacity,
            }}
          >
            <div style={{ color: "#3b82f6", fontSize: 18, marginBottom: 10 }}>
              ▸ np.zeros() - 0으로 채움
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 20, color: colors.gray[300] }}>
              zeros = np.zeros((<span style={{ color: "#f97316" }}>3, 3</span>))
            </div>
          </div>

          {/* np.ones */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 15,
              border: "2px solid #f97316",
              opacity: onesOpacity,
            }}
          >
            <div style={{ color: "#f97316", fontSize: 18, marginBottom: 10 }}>
              ▸ np.ones() - 1로 채움
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 20, color: colors.gray[300] }}>
              ones = np.ones((<span style={{ color: "#f97316" }}>2, 4</span>))
            </div>
          </div>

          {/* np.arange */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 15,
              border: "2px solid #8b5cf6",
              opacity: arangeOpacity,
            }}
          >
            <div style={{ color: "#8b5cf6", fontSize: 18, marginBottom: 10 }}>
              ▸ np.arange() - 연속 숫자
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 20, color: colors.gray[300] }}>
              seq = np.arange(<span style={{ color: "#f97316" }}>0, 10, 2</span>)
              <span style={{ color: colors.gray[500] }}> # [0,2,4,6,8]</span>
            </div>
          </div>

          {/* np.random */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              border: "2px solid #ec4899",
              opacity: randomOpacity,
            }}
          >
            <div style={{ color: "#ec4899", fontSize: 18, marginBottom: 10 }}>
              ▸ np.random.randn() - 랜덤 (AI 가중치 초기화)
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 20, color: colors.gray[300] }}>
              weights = np.random.randn(<span style={{ color: "#f97316" }}>784, 10</span>)
            </div>
          </div>
        </div>

        {/* 오른쪽: 시각화 */}
        <div style={{ flex: 0.8 }}>
          {/* np.array 결과 */}
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              opacity: arrayOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 16, marginBottom: 10 }}>결과:</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#22c55e40",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#22c55e",
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>

          {/* np.zeros 결과 */}
          <div
            style={{
              backgroundColor: "#3b82f620",
              border: "2px solid #3b82f6",
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              opacity: zerosOpacity,
            }}
          >
            <div style={{ color: "#3b82f6", fontSize: 16, marginBottom: 10 }}>결과: (3,3) 행렬</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[0, 1, 2].map((row) => (
                <div key={row} style={{ display: "flex", gap: 5 }}>
                  {[0, 1, 2].map((col) => (
                    <div
                      key={col}
                      style={{
                        width: 35,
                        height: 35,
                        backgroundColor: "#3b82f640",
                        borderRadius: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        color: "#3b82f6",
                      }}
                    >
                      0
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* 핵심 팁 */}
          <div
            style={{
              backgroundColor: "#f9731620",
              border: "2px solid #f97316",
              borderRadius: 12,
              padding: 20,
              opacity: randomOpacity,
            }}
          >
            <div style={{ color: "#f97316", fontSize: 18, fontWeight: "bold" }}>
              💡 AI에서 자주 사용
            </div>
            <div style={{ color: colors.gray[300], fontSize: 16, marginTop: 10 }}>
              random.randn으로<br />
              신경망 가중치를<br />
              초기화합니다
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
