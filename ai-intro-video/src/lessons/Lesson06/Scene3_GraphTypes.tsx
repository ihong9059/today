/**
 * Lesson 0-6: Matplotlib 기초 - Scene 3: 다양한 그래프 종류
 * plot, scatter, bar, hist
 */

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L06_Scene3_GraphTypes: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const lineOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const scatterOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const barOpacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });
  const histOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });

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
          textAlign: "center",
        }}
      >
        📈 다양한 그래프 종류
      </h2>

      {/* 4개 그래프 그리드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 25,
          flex: 1,
        }}
      >
        {/* 선 그래프 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #22c55e",
            opacity: lineOpacity,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
            <span style={{ fontSize: 32 }}>📉</span>
            <div>
              <div style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold" }}>
                선 그래프 (Line)
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 16, color: colors.gray[400] }}>
                plt.plot(x, y)
              </div>
            </div>
          </div>
          <div style={{ color: colors.gray[300], fontSize: 18 }}>
            시간에 따른 변화 표시<br />
            <span style={{ color: "#22c55e" }}>AI: 손실값 변화 추적</span>
          </div>
          {/* 미니 그래프 */}
          <svg viewBox="0 0 200 60" style={{ width: "100%", height: 50, marginTop: 10 }}>
            <polyline points="10,50 50,40 90,25 130,15 170,10" fill="none" stroke="#22c55e" strokeWidth="2" />
          </svg>
        </div>

        {/* 산점도 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #3b82f6",
            opacity: scatterOpacity,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
            <span style={{ fontSize: 32 }}>⚪</span>
            <div>
              <div style={{ color: "#3b82f6", fontSize: 24, fontWeight: "bold" }}>
                산점도 (Scatter)
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 16, color: colors.gray[400] }}>
                plt.scatter(x, y)
              </div>
            </div>
          </div>
          <div style={{ color: colors.gray[300], fontSize: 18 }}>
            두 변수 사이 관계<br />
            <span style={{ color: "#3b82f6" }}>AI: 데이터 분포 확인</span>
          </div>
          {/* 미니 그래프 */}
          <svg viewBox="0 0 200 60" style={{ width: "100%", height: 50, marginTop: 10 }}>
            {[
              [20, 45], [35, 35], [50, 40], [70, 25], [85, 30],
              [100, 20], [120, 25], [140, 15], [160, 20], [180, 10]
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="5" fill="#3b82f6" />
            ))}
          </svg>
        </div>

        {/* 막대 그래프 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #f97316",
            opacity: barOpacity,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
            <span style={{ fontSize: 32 }}>📊</span>
            <div>
              <div style={{ color: "#f97316", fontSize: 24, fontWeight: "bold" }}>
                막대 그래프 (Bar)
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 16, color: colors.gray[400] }}>
                plt.bar(x, height)
              </div>
            </div>
          </div>
          <div style={{ color: colors.gray[300], fontSize: 18 }}>
            카테고리별 값 비교<br />
            <span style={{ color: "#f97316" }}>AI: 클래스별 데이터 개수</span>
          </div>
          {/* 미니 그래프 */}
          <svg viewBox="0 0 200 60" style={{ width: "100%", height: 50, marginTop: 10 }}>
            {[30, 50, 35, 45, 25].map((h, i) => (
              <rect key={i} x={20 + i * 35} y={60 - h} width="25" height={h} fill="#f97316" />
            ))}
          </svg>
        </div>

        {/* 히스토그램 */}
        <div
          style={{
            backgroundColor: colors.gray[800],
            borderRadius: 16,
            padding: 25,
            border: "3px solid #8b5cf6",
            opacity: histOpacity,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
            <span style={{ fontSize: 32 }}>📶</span>
            <div>
              <div style={{ color: "#8b5cf6", fontSize: 24, fontWeight: "bold" }}>
                히스토그램 (Histogram)
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 16, color: colors.gray[400] }}>
                plt.hist(data)
              </div>
            </div>
          </div>
          <div style={{ color: colors.gray[300], fontSize: 18 }}>
            데이터 분포 시각화<br />
            <span style={{ color: "#8b5cf6" }}>AI: 정규분포 확인</span>
          </div>
          {/* 미니 그래프 - 정규분포 형태 */}
          <svg viewBox="0 0 200 60" style={{ width: "100%", height: 50, marginTop: 10 }}>
            {[15, 30, 45, 55, 50, 40, 25, 12].map((h, i) => (
              <rect key={i} x={15 + i * 22} y={60 - h} width="18" height={h} fill="#8b5cf6" />
            ))}
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
