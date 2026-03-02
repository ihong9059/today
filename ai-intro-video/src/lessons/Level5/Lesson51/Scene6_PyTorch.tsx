/**
 * Scene 6: PyTorch로 이미지 다루기
 * transforms와 데이터 전처리
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_PyTorch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 코드 블록 애니메이션
  const code1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const code2Opacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const code3Opacity = interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" });

  // 파이프라인 설명
  const pipelineOpacity = interpolate(frame, [800, 830], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[900],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-5-1/scene6.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        PyTorch 이미지 처리
      </h1>

      <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
        {/* 코드 블록들 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* ToTensor */}
          <div
            style={{
              opacity: code1Opacity,
              backgroundColor: "#1e1e3f",
              padding: 25,
              borderRadius: 12,
              border: "2px solid #3b82f6",
              fontFamily: "monospace",
            }}
          >
            <div style={{ color: "#9ca3af", fontSize: 16, marginBottom: 10 }}># PIL → Tensor (0~1)</div>
            <div style={{ fontSize: 22, color: colors.white }}>
              <span style={{ color: "#c586c0" }}>transforms</span>.<span style={{ color: "#dcdcaa" }}>ToTensor</span>()
            </div>
          </div>

          {/* Normalize */}
          <div
            style={{
              opacity: code2Opacity,
              backgroundColor: "#1e1e3f",
              padding: 25,
              borderRadius: 12,
              border: "2px solid #22c55e",
              fontFamily: "monospace",
            }}
          >
            <div style={{ color: "#9ca3af", fontSize: 16, marginBottom: 10 }}># 평균/표준편차 정규화</div>
            <div style={{ fontSize: 22, color: colors.white }}>
              <span style={{ color: "#c586c0" }}>transforms</span>.<span style={{ color: "#dcdcaa" }}>Normalize</span>(
            </div>
            <div style={{ fontSize: 20, color: colors.white, marginLeft: 30 }}>
              mean=[<span style={{ color: "#b5cea8" }}>0.485, 0.456, 0.406</span>],
            </div>
            <div style={{ fontSize: 20, color: colors.white, marginLeft: 30 }}>
              std=[<span style={{ color: "#b5cea8" }}>0.229, 0.224, 0.225</span>]
            </div>
            <div style={{ fontSize: 22, color: colors.white }}>)</div>
          </div>

          {/* Compose */}
          <div
            style={{
              opacity: code3Opacity,
              backgroundColor: "#1e1e3f",
              padding: 25,
              borderRadius: 12,
              border: "2px solid #ec4899",
              fontFamily: "monospace",
            }}
          >
            <div style={{ color: "#9ca3af", fontSize: 16, marginBottom: 10 }}># 파이프라인 구성</div>
            <div style={{ fontSize: 22, color: colors.white }}>
              <span style={{ color: "#569cd6" }}>transform</span> = <span style={{ color: "#c586c0" }}>transforms</span>.<span style={{ color: "#dcdcaa" }}>Compose</span>([
            </div>
            <div style={{ fontSize: 20, color: colors.white, marginLeft: 30 }}>
              transforms.ToTensor(),
            </div>
            <div style={{ fontSize: 20, color: colors.white, marginLeft: 30 }}>
              transforms.Normalize(...)
            </div>
            <div style={{ fontSize: 22, color: colors.white }}>])</div>
          </div>
        </div>

        {/* 파이프라인 시각화 */}
        <div
          style={{
            opacity: pipelineOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
          }}
        >
          <h3 style={{ fontSize: 28, color: "#ec4899", marginBottom: 20 }}>전처리 파이프라인</h3>

          {[
            { text: "PIL 이미지", color: "#9ca3af" },
            { text: "↓ ToTensor()", color: "#3b82f6" },
            { text: "Tensor (0~1)", color: "#9ca3af" },
            { text: "↓ Normalize()", color: "#22c55e" },
            { text: "정규화된 Tensor", color: "#9ca3af" },
            { text: "↓ unsqueeze(0)", color: "#fbbf24" },
            { text: "(1, C, H, W)", color: "#ec4899" },
          ].map((item, i) => {
            const delay = 850 + i * 30;
            const itemOpacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  fontSize: item.text.startsWith("↓") ? 24 : 22,
                  color: item.color,
                  fontWeight: item.text.startsWith("↓") ? "normal" : "bold",
                  fontFamily: item.text.includes("(") ? "monospace" : "inherit",
                }}
              >
                {item.text}
              </div>
            );
          })}

          <div
            style={{
              marginTop: 20,
              backgroundColor: colors.gray[800],
              padding: "15px 25px",
              borderRadius: 12,
              fontSize: 20,
              color: colors.gray[300],
            }}
          >
            모델 입력 준비 완료!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
