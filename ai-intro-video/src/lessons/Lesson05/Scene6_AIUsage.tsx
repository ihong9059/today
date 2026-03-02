/**
 * Lesson 0-5: NumPy 기초 - Scene 6: AI에서의 실제 사용
 * 이미지 처리, 가중치, 정규화 예시
 */

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L05_Scene6_AIUsage: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const imageOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const weightOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const normalizeOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });
  const frameworkOpacity = interpolate(frame, [650, 680], [0, 1], { extrapolateRight: "clamp" });

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
        🤖 NumPy의 AI 실전 활용
      </h2>

      <div style={{ display: "flex", gap: 30 }}>
        {/* 왼쪽 컬럼 */}
        <div style={{ flex: 1 }}>
          {/* 1. 이미지 처리 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              marginBottom: 25,
              border: "2px solid #22c55e",
              opacity: imageOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 26, fontWeight: "bold", marginBottom: 15 }}>
              1️⃣ 이미지 처리
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 15 }}>
              {/* 이미지 아이콘 */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "#22c55e20",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                }}
              >
                🖼️
              </div>
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 20, color: colors.gray[300] }}>
                  image.shape = <span style={{ color: "#22c55e" }}>(28, 28)</span>
                </div>
                <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 5 }}>
                  손글씨 숫자 이미지
                </div>
              </div>
            </div>

            <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300] }}>
              batch.shape = <span style={{ color: "#22c55e" }}>(100, 28, 28)</span>
              <br />
              <span style={{ color: colors.gray[500] }}># 100장 배치</span>
            </div>
          </div>

          {/* 2. 신경망 가중치 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              border: "2px solid #3b82f6",
              opacity: weightOpacity,
            }}
          >
            <div style={{ color: "#3b82f6", fontSize: 26, fontWeight: "bold", marginBottom: 15 }}>
              2️⃣ 신경망 가중치
            </div>

            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              {/* 입력 */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 30,
                    height: 100,
                    backgroundColor: "#3b82f640",
                    borderRadius: 4,
                    marginBottom: 5,
                  }}
                />
                <div style={{ color: "#3b82f6", fontSize: 14 }}>784</div>
              </div>

              <div style={{ color: colors.gray[500], fontSize: 24 }}>×</div>

              {/* 가중치 행렬 */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 100,
                    height: 60,
                    backgroundColor: "#f9731640",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ color: "#f97316", fontSize: 14 }}>W</span>
                </div>
                <div style={{ color: "#f97316", fontSize: 14 }}>(784, 10)</div>
              </div>

              <div style={{ color: colors.gray[500], fontSize: 24 }}>=</div>

              {/* 출력 */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 30,
                    height: 50,
                    backgroundColor: "#22c55e40",
                    borderRadius: 4,
                    marginBottom: 5,
                  }}
                />
                <div style={{ color: "#22c55e", fontSize: 14 }}>10</div>
              </div>
            </div>

            <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 15 }}>
              행렬 곱셈으로 예측값 계산
            </div>
          </div>
        </div>

        {/* 오른쪽 컬럼 */}
        <div style={{ flex: 1 }}>
          {/* 3. 데이터 전처리 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              marginBottom: 25,
              border: "2px solid #8b5cf6",
              opacity: normalizeOpacity,
            }}
          >
            <div style={{ color: "#8b5cf6", fontSize: 26, fontWeight: "bold", marginBottom: 15 }}>
              3️⃣ 데이터 정규화
            </div>

            <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300], lineHeight: 1.8 }}>
              <span style={{ color: colors.gray[500] }}># 0~255 → 0~1</span>
              <br />
              images = images / <span style={{ color: "#8b5cf6" }}>255.0</span>
              <br /><br />
              <span style={{ color: colors.gray[500] }}># 표준화</span>
              <br />
              images = (images - <span style={{ color: "#8b5cf6" }}>mean</span>) / <span style={{ color: "#8b5cf6" }}>std</span>
            </div>
          </div>

          {/* PyTorch/TensorFlow 연결 */}
          <div
            style={{
              backgroundColor: "#f9731620",
              border: "3px solid #f97316",
              borderRadius: 16,
              padding: 25,
              opacity: frameworkOpacity,
            }}
          >
            <div style={{ color: "#f97316", fontSize: 26, fontWeight: "bold", marginBottom: 15 }}>
              💡 딥러닝 프레임워크와 연결
            </div>

            <div style={{ display: "flex", gap: 20, marginBottom: 15 }}>
              <div
                style={{
                  backgroundColor: "#ef444420",
                  border: "2px solid #ef4444",
                  borderRadius: 8,
                  padding: "10px 20px",
                }}
              >
                <span style={{ color: "#ef4444", fontSize: 20, fontWeight: "bold" }}>
                  🔥 PyTorch
                </span>
              </div>
              <div
                style={{
                  backgroundColor: "#f9731620",
                  border: "2px solid #f97316",
                  borderRadius: 8,
                  padding: "10px 20px",
                }}
              >
                <span style={{ color: "#f97316", fontSize: 20, fontWeight: "bold" }}>
                  🧠 TensorFlow
                </span>
              </div>
            </div>

            <div style={{ color: colors.gray[300], fontSize: 18 }}>
              NumPy와 동일한 텐서 연산 사용!
              <br />
              NumPy를 알면 프레임워크도 쉽게 이해
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
