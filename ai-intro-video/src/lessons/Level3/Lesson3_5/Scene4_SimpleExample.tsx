/**
 * Scene 4: 간단한 역전파 예시
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_SimpleExample: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 설정
  const setupOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 연쇄법칙 적용
  const chainOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const step1Opacity = interpolate(frame, [270, 300], [0, 1], { extrapolateRight: "clamp" });
  const step2Opacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });

  // 업데이트
  const updateOpacity = interpolate(frame, [460, 490], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-5/scene4.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 50,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        📝 간단한 역전파 예시
      </h1>

      <div style={{ display: "flex", gap: 35 }}>
        {/* 왼쪽: 설정 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 22,
              borderRadius: 16,
              opacity: setupOpacity,
            }}
          >
            <h3 style={{ color: "#60a5fa", fontSize: 22, marginBottom: 15 }}>
              가장 간단한 신경망
            </h3>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
              <div style={{ backgroundColor: "#22c55e", padding: "12px 20px", borderRadius: 10 }}>
                <span style={{ color: colors.white, fontSize: 20 }}>x</span>
              </div>
              <div style={{ color: colors.white, fontSize: 24 }}>×</div>
              <div style={{ backgroundColor: "#fbbf24", padding: "12px 20px", borderRadius: 10 }}>
                <span style={{ color: colors.gray[900], fontSize: 20 }}>w</span>
              </div>
              <div style={{ color: colors.white, fontSize: 24 }}>=</div>
              <div style={{ backgroundColor: "#a855f7", padding: "12px 20px", borderRadius: 10 }}>
                <span style={{ color: colors.white, fontSize: 20 }}>y = wx</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginTop: 15,
              }}
            >
              <div style={{ color: colors.white, fontSize: 18 }}>
                손실: <span style={{ color: "#f87171" }}>L = (y - t)²</span>
              </div>
              <div style={{ color: colors.gray[400], fontSize: 14, marginTop: 5 }}>
                t = 정답
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#fbbf2420",
                border: "2px solid #fbbf24",
                padding: 15,
                borderRadius: 10,
                marginTop: 15,
                textAlign: "center",
              }}
            >
              <div style={{ color: "#fbbf24", fontSize: 20, fontWeight: "bold" }}>
                목표: ∂L/∂w 구하기!
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 계산 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 22,
              borderRadius: 16,
            }}
          >
            <h3 style={{ color: "#f87171", fontSize: 22, marginBottom: 15, opacity: chainOpacity }}>
              연쇄법칙 적용
            </h3>

            {/* 공식 */}
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
                textAlign: "center",
                opacity: chainOpacity,
              }}
            >
              <div style={{ color: colors.white, fontSize: 26, fontFamily: "serif" }}>
                ∂L/∂w = ∂L/∂y × ∂y/∂w
              </div>
            </div>

            {/* Step 1 */}
            <div
              style={{
                backgroundColor: "#a855f720",
                border: "2px solid #a855f7",
                padding: 12,
                borderRadius: 10,
                marginBottom: 10,
                opacity: step1Opacity,
              }}
            >
              <div style={{ color: "#a855f7", fontSize: 16, fontWeight: "bold" }}>∂L/∂y</div>
              <div style={{ color: colors.white, fontSize: 20, marginTop: 5 }}>
                = 2(y - t)
              </div>
            </div>

            {/* Step 2 */}
            <div
              style={{
                backgroundColor: "#22c55e20",
                border: "2px solid #22c55e",
                padding: 12,
                borderRadius: 10,
                marginBottom: 10,
                opacity: step2Opacity,
              }}
            >
              <div style={{ color: "#22c55e", fontSize: 16, fontWeight: "bold" }}>∂y/∂w</div>
              <div style={{ color: colors.white, fontSize: 20, marginTop: 5 }}>
                = x &nbsp; (y = wx이므로)
              </div>
            </div>

            {/* 결과 */}
            <div
              style={{
                backgroundColor: "#f8717120",
                border: "3px solid #f87171",
                padding: 15,
                borderRadius: 10,
                opacity: updateOpacity,
              }}
            >
              <div style={{ color: "#f87171", fontSize: 18, fontWeight: "bold" }}>결과</div>
              <div style={{ color: colors.white, fontSize: 22, marginTop: 5 }}>
                ∂L/∂w = <strong>2(y - t) × x</strong>
              </div>
              <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 8 }}>
                w_new = w - η × ∂L/∂w
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
