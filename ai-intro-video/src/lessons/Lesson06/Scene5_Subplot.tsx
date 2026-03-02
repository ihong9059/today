/**
 * Lesson 0-6: Matplotlib 기초 - Scene 5: Subplot
 * 여러 그래프를 한 화면에 표시
 */

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L06_Scene5_Subplot: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const code1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const code2Opacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });
  const exampleOpacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });
  const figsizeOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });

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
        🖼️ Subplot - 여러 그래프 한 화면에
      </h2>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 코드 */}
        <div style={{ flex: 1 }}>
          {/* subplot 기본 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              border: "2px solid #3b82f6",
              opacity: code1Opacity,
            }}
          >
            <div style={{ color: "#3b82f6", fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
              방법 1: plt.subplot()
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300], lineHeight: 1.8 }}>
              plt.subplot(<span style={{ color: "#f97316" }}>1, 2, 1</span>)
              <span style={{ color: colors.gray[500] }}> # 1행 2열 중 1번</span><br />
              plt.plot(x, y1)<br /><br />
              plt.subplot(<span style={{ color: "#f97316" }}>1, 2, 2</span>)
              <span style={{ color: colors.gray[500] }}> # 1행 2열 중 2번</span><br />
              plt.plot(x, y2)
            </div>
          </div>

          {/* subplots 방법 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              border: "2px solid #22c55e",
              opacity: code2Opacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
              방법 2: plt.subplots() (더 편리!)
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300], lineHeight: 1.8 }}>
              fig, axes = plt.subplots(<span style={{ color: "#f97316" }}>1, 2</span>)<br /><br />
              axes[<span style={{ color: "#f97316" }}>0</span>].plot(x, loss)<br />
              axes[<span style={{ color: "#f97316" }}>1</span>].plot(x, acc)
            </div>
          </div>

          {/* figsize */}
          <div
            style={{
              backgroundColor: "#8b5cf620",
              border: "2px solid #8b5cf6",
              borderRadius: 12,
              padding: 20,
              opacity: figsizeOpacity,
            }}
          >
            <div style={{ color: "#8b5cf6", fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              💡 크기 조절: figsize
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 16, color: colors.gray[300] }}>
              fig, axes = plt.subplots(1, 2, <span style={{ color: "#8b5cf6" }}>figsize=(12, 4)</span>)
            </div>
          </div>
        </div>

        {/* 오른쪽: 시각적 예시 */}
        <div style={{ flex: 1, opacity: exampleOpacity }}>
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: 12,
              padding: 25,
              height: "100%",
            }}
          >
            <div style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", color: colors.gray[700], marginBottom: 20 }}>
              AI 학습 모니터링 대시보드
            </div>

            <div style={{ display: "flex", gap: 20 }}>
              {/* 손실 그래프 */}
              <div style={{ flex: 1, border: `2px solid ${colors.gray[300]}`, borderRadius: 8, padding: 15 }}>
                <div style={{ fontSize: 14, fontWeight: "bold", color: "#ef4444", marginBottom: 10 }}>
                  Loss
                </div>
                <svg viewBox="0 0 150 80" style={{ width: "100%", height: 80 }}>
                  <polyline
                    points="10,10 40,25 70,45 100,55 130,60"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* 정확도 그래프 */}
              <div style={{ flex: 1, border: `2px solid ${colors.gray[300]}`, borderRadius: 8, padding: 15 }}>
                <div style={{ fontSize: 14, fontWeight: "bold", color: "#22c55e", marginBottom: 10 }}>
                  Accuracy
                </div>
                <svg viewBox="0 0 150 80" style={{ width: "100%", height: 80 }}>
                  <polyline
                    points="10,70 40,55 70,40 100,25 130,15"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            <div style={{ marginTop: 20, textAlign: "center", color: colors.gray[600], fontSize: 14 }}>
              손실과 정확도를 나란히 비교!
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
