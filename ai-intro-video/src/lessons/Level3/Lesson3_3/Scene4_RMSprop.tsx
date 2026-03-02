/**
 * Scene 4: RMSprop
 * 적응적 학습률
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_RMSprop: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 설명
  const desc1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const desc2Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });

  // 수식
  const formula1Opacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });
  const formula2Opacity = interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" });

  // 시각화
  const vizOpacity = interpolate(frame, [380, 410], [0, 1], { extrapolateRight: "clamp" });

  // 엡실론
  const epsOpacity = interpolate(frame, [480, 510], [0, 1], { extrapolateRight: "clamp" });

  // 결론
  const conclusionOpacity = interpolate(frame, [560, 590], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-3/scene4.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        RMSprop
      </h1>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 설명 & 시각화 */}
        <div style={{ flex: 1 }}>
          {/* 핵심 아이디어 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              marginBottom: 20,
            }}
          >
            <h3 style={{ color: "#fbbf24", fontSize: 26, marginBottom: 15 }}>
              적응적 학습률 (Adaptive Learning Rate)
            </h3>
            <div
              style={{
                padding: "12px 20px",
                backgroundColor: colors.gray[900],
                borderRadius: 10,
                marginBottom: 10,
                opacity: desc1Opacity,
              }}
            >
              <span style={{ color: "#f87171", fontSize: 20 }}>기울기 큰 방향</span>
              <span style={{ color: colors.gray[400], fontSize: 20 }}> → 학습률 ↓</span>
            </div>
            <div
              style={{
                padding: "12px 20px",
                backgroundColor: colors.gray[900],
                borderRadius: 10,
                opacity: desc2Opacity,
              }}
            >
              <span style={{ color: "#22c55e", fontSize: 20 }}>기울기 작은 방향</span>
              <span style={{ color: colors.gray[400], fontSize: 20 }}> → 학습률 ↑</span>
            </div>
          </div>

          {/* 시각화 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 16,
              opacity: vizOpacity,
            }}
          >
            <h3 style={{ color: "#60a5fa", fontSize: 22, marginBottom: 15 }}>
              가중치별 다른 학습률
            </h3>
            <div style={{ display: "flex", gap: 15, justifyContent: "center" }}>
              {[
                { name: "w₁", freq: "자주 업데이트", lr: "작은 lr", color: "#f87171" },
                { name: "w₂", freq: "보통", lr: "중간 lr", color: "#fbbf24" },
                { name: "w₃", freq: "드물게 업데이트", lr: "큰 lr", color: "#22c55e" },
              ].map((w, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.gray[900],
                    padding: 15,
                    borderRadius: 12,
                    textAlign: "center",
                    border: `2px solid ${w.color}`,
                  }}
                >
                  <div style={{ color: w.color, fontSize: 28, fontWeight: "bold" }}>{w.name}</div>
                  <div style={{ color: colors.gray[400], fontSize: 14, marginTop: 5 }}>{w.freq}</div>
                  <div style={{ color: colors.white, fontSize: 16, marginTop: 5 }}>{w.lr}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 수식 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
            }}
          >
            <h3 style={{ color: "#fbbf24", fontSize: 24, marginBottom: 20 }}>
              핵심 수식
            </h3>

            {/* 수식 1: s 업데이트 */}
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 20,
                borderRadius: 12,
                marginBottom: 15,
                opacity: formula1Opacity,
              }}
            >
              <div style={{ color: colors.white, fontSize: 28, fontFamily: "serif" }}>
                s = β · s + (1-β) · g²
              </div>
              <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 10 }}>
                기울기 제곱의 이동평균 (β ≈ 0.9)
              </div>
            </div>

            {/* 수식 2: 가중치 업데이트 */}
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 20,
                borderRadius: 12,
                marginBottom: 15,
                opacity: formula2Opacity,
              }}
            >
              <div style={{ color: colors.white, fontSize: 28, fontFamily: "serif" }}>
                w = w - η · g / √(s + ε)
              </div>
              <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 10 }}>
                s로 기울기를 정규화
              </div>
            </div>

            {/* 엡실론 설명 */}
            <div
              style={{
                backgroundColor: "#fbbf2420",
                border: "2px solid #fbbf24",
                padding: 15,
                borderRadius: 12,
                opacity: epsOpacity,
              }}
            >
              <div style={{ color: "#fbbf24", fontSize: 20, fontWeight: "bold" }}>
                ε (엡실론) = 10⁻⁸
              </div>
              <div style={{ color: colors.gray[300], fontSize: 16, marginTop: 5 }}>
                0으로 나누는 것을 방지하는 작은 수
              </div>
            </div>
          </div>

          {/* 결론 */}
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              padding: 20,
              borderRadius: 16,
              marginTop: 20,
              textAlign: "center",
              opacity: conclusionOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 26, fontWeight: "bold" }}>
              학습이 훨씬 안정적! 📊
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
