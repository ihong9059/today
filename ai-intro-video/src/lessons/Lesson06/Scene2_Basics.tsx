/**
 * Lesson 0-6: Matplotlib 기초 - Scene 2: 기본 사용법
 * import, plot, show, title, xlabel, ylabel
 */

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L06_Scene2_Basics: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const importOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const plotOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const labelOpacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });
  const graphOpacity = interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" });

  // 그래프 애니메이션
  const graphProgress = interpolate(frame, [280, 450], [0, 1], { extrapolateRight: "clamp" });

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
        🔧 Matplotlib 기본 사용법
      </h2>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 코드 */}
        <div style={{ flex: 1 }}>
          {/* import */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 15,
              border: "2px solid #22c55e",
              opacity: importOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 18, marginBottom: 10 }}>
              ▸ import 하기
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 22, color: colors.gray[300] }}>
              <span style={{ color: "#c084fc" }}>import</span> matplotlib.pyplot{" "}
              <span style={{ color: "#c084fc" }}>as</span> plt
            </div>
          </div>

          {/* plt.plot */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              marginBottom: 15,
              border: "2px solid #3b82f6",
              opacity: plotOpacity,
            }}
          >
            <div style={{ color: "#3b82f6", fontSize: 18, marginBottom: 10 }}>
              ▸ 선 그래프 그리기
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 20, color: colors.gray[300], lineHeight: 1.6 }}>
              plt.plot([<span style={{ color: "#f97316" }}>1, 2, 3, 4</span>],<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<span style={{ color: "#f97316" }}>10, 20, 25, 30</span>])<br />
              plt.show()
            </div>
          </div>

          {/* 제목/축 이름 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 12,
              padding: 20,
              border: "2px solid #8b5cf6",
              opacity: labelOpacity,
            }}
          >
            <div style={{ color: "#8b5cf6", fontSize: 18, marginBottom: 10 }}>
              ▸ 제목과 축 이름 추가
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300], lineHeight: 1.6 }}>
              plt.title(<span style={{ color: "#22c55e" }}>"My Graph"</span>)<br />
              plt.xlabel(<span style={{ color: "#22c55e" }}>"X축"</span>)<br />
              plt.ylabel(<span style={{ color: "#22c55e" }}>"Y축"</span>)
            </div>
          </div>
        </div>

        {/* 오른쪽: 그래프 미리보기 */}
        <div style={{ flex: 1, opacity: graphOpacity }}>
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: 12,
              padding: 30,
              height: "100%",
            }}
          >
            {/* 그래프 타이틀 */}
            <div style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: colors.gray[800], marginBottom: 20 }}>
              My Graph
            </div>

            {/* 그래프 영역 */}
            <div style={{ position: "relative", height: 300, marginBottom: 20 }}>
              {/* Y축 */}
              <div style={{ position: "absolute", left: 30, top: 0, bottom: 30, width: 2, backgroundColor: colors.gray[400] }} />
              {/* X축 */}
              <div style={{ position: "absolute", left: 30, bottom: 30, right: 20, height: 2, backgroundColor: colors.gray[400] }} />

              {/* 데이터 포인트 및 선 */}
              <svg
                style={{ position: "absolute", left: 30, top: 0, right: 20, bottom: 30 }}
                viewBox="0 0 400 250"
              >
                {/* 선 그래프 */}
                <polyline
                  points={`50,225 150,${225 - 100 * graphProgress} 250,${225 - 125 * graphProgress} 350,${225 - 175 * graphProgress}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
                {/* 데이터 포인트 */}
                {[
                  { x: 50, y: 225 },
                  { x: 150, y: 225 - 100 * graphProgress },
                  { x: 250, y: 225 - 125 * graphProgress },
                  { x: 350, y: 225 - 175 * graphProgress },
                ].map((point, idx) => (
                  <circle
                    key={idx}
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill="#3b82f6"
                    opacity={graphProgress}
                  />
                ))}
              </svg>

              {/* Y축 레이블 */}
              <div style={{ position: "absolute", left: 0, top: "50%", transform: "rotate(-90deg) translateX(-50%)", fontSize: 14, color: colors.gray[600] }}>
                Y축
              </div>
            </div>

            {/* X축 레이블 */}
            <div style={{ textAlign: "center", fontSize: 14, color: colors.gray[600] }}>
              X축
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
