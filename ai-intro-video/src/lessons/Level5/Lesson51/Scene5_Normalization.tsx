/**
 * Scene 5: 정규화
 * 이미지 정규화의 중요성
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_Normalization: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 문제점 설명
  const problemOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 해결책 1
  const solution1Opacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  // 해결책 2
  const solution2Opacity = interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" });

  // ImageNet 값
  const imagenetOpacity = interpolate(frame, [800, 830], [0, 1], { extrapolateRight: "clamp" });

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
      <Audio src={staticFile("audio/lesson-5-1/scene5.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        이미지 정규화
      </h1>

      <div style={{ display: "flex", gap: 50, alignItems: "flex-start" }}>
        {/* 문제점 */}
        <div
          style={{
            opacity: problemOpacity,
            backgroundColor: "#ff000022",
            padding: 30,
            borderRadius: 16,
            border: "2px solid #ef4444",
            width: 350,
          }}
        >
          <h3 style={{ fontSize: 28, color: "#ef4444", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <span>⚠️</span> 원본 픽셀값
          </h3>
          <div style={{ fontFamily: "monospace", fontSize: 36, color: colors.white, marginBottom: 20 }}>
            0 ~ 255
          </div>
          <div style={{ fontSize: 20, color: colors.gray[300], lineHeight: 1.6 }}>
            <div style={{ marginBottom: 8 }}>• 값이 너무 큼</div>
            <div style={{ marginBottom: 8 }}>• 기울기 폭발 위험</div>
            <div>• 학습 불안정</div>
          </div>
        </div>

        {/* 화살표 */}
        <div
          style={{
            fontSize: 60,
            color: "#22c55e",
            marginTop: 100,
            opacity: solution1Opacity,
          }}
        >
          →
        </div>

        {/* 해결책들 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          {/* 방법 1 */}
          <div
            style={{
              opacity: solution1Opacity,
              backgroundColor: "#22c55e22",
              padding: 25,
              borderRadius: 16,
              border: "2px solid #22c55e",
            }}
          >
            <h3 style={{ fontSize: 24, color: "#22c55e", marginBottom: 15 }}>방법 1: [0, 1] 범위</h3>
            <div style={{ fontFamily: "monospace", fontSize: 28, color: colors.white }}>
              pixel / 255.0
            </div>
            <div style={{ marginTop: 10, fontSize: 18, color: colors.gray[400] }}>
              ToTensor()가 자동으로 수행
            </div>
          </div>

          {/* 방법 2 */}
          <div
            style={{
              opacity: solution2Opacity,
              backgroundColor: "#3b82f622",
              padding: 25,
              borderRadius: 16,
              border: "2px solid #3b82f6",
            }}
          >
            <h3 style={{ fontSize: 24, color: "#3b82f6", marginBottom: 15 }}>방법 2: 평균/표준편차</h3>
            <div style={{ fontFamily: "monospace", fontSize: 28, color: colors.white }}>
              (pixel - mean) / std
            </div>
            <div style={{ marginTop: 10, fontSize: 18, color: colors.gray[400] }}>
              평균 0, 분산 1로 정규화
            </div>
          </div>

          {/* ImageNet 값 */}
          <div
            style={{
              opacity: imagenetOpacity,
              backgroundColor: "#ec489922",
              padding: 25,
              borderRadius: 16,
              border: "2px solid #ec4899",
            }}
          >
            <h3 style={{ fontSize: 24, color: "#ec4899", marginBottom: 15 }}>ImageNet 표준값</h3>
            <div style={{ fontFamily: "monospace", fontSize: 20, color: colors.white, lineHeight: 1.8 }}>
              <div>mean = [<span style={{ color: "#ff6666" }}>0.485</span>, <span style={{ color: "#66ff66" }}>0.456</span>, <span style={{ color: "#6666ff" }}>0.406</span>]</div>
              <div>std = [<span style={{ color: "#ff6666" }}>0.229</span>, <span style={{ color: "#66ff66" }}>0.224</span>, <span style={{ color: "#6666ff" }}>0.225</span>]</div>
            </div>
            <div style={{ marginTop: 10, fontSize: 16, color: colors.gray[400] }}>
              대부분의 모델에서 사실상 표준!
            </div>
          </div>
        </div>
      </div>

      {/* 효과 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: imagenetOpacity,
          display: "flex",
          gap: 30,
        }}
      >
        {["학습 안정화", "빠른 수렴", "더 높은 학습률 사용 가능"].map((text, i) => {
          const delay = 900 + i * 30;
          const itemScale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 20 });
          return (
            <div
              key={text}
              style={{
                backgroundColor: colors.gray[800],
                padding: "15px 25px",
                borderRadius: 30,
                fontSize: 22,
                color: "#22c55e",
                fontWeight: "bold",
                transform: `scale(${Math.max(0, itemScale)})`,
              }}
            >
              ✓ {text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
