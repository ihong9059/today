/**
 * Scene 3: 채널의 이해
 * 흑백 vs 컬러 (RGB)
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Channel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 채널 비교 애니메이션
  const grayscaleOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const rgbOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  // RGB 채널 분리 애니메이션
  const channelSplit = interpolate(frame, [500, 600], [0, 100], { extrapolateRight: "clamp" });

  // 색상 예시
  const colorExamples = [
    { name: "빨강", rgb: [255, 0, 0], color: "#ff0000" },
    { name: "초록", rgb: [0, 255, 0], color: "#00ff00" },
    { name: "파랑", rgb: [0, 0, 255], color: "#0000ff" },
    { name: "흰색", rgb: [255, 255, 255], color: "#ffffff" },
    { name: "노랑", rgb: [255, 255, 0], color: "#ffff00" },
  ];

  const examplesOpacity = interpolate(frame, [800, 830], [0, 1], { extrapolateRight: "clamp" });

  // CIFAR 정보
  const cifarOpacity = interpolate(frame, [1100, 1130], [0, 1], { extrapolateRight: "clamp" });

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
      <Audio src={staticFile("audio/lesson-5-1/scene3.mp3")} />

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
        채널 (Channel)
      </h1>

      <div style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
        {/* 흑백 이미지 */}
        <div
          style={{
            opacity: grayscaleOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              background: "linear-gradient(135deg, #333 0%, #ccc 50%, #666 100%)",
              borderRadius: 16,
              marginBottom: 20,
              border: "3px solid #9ca3af",
            }}
          />
          <h3 style={{ fontSize: 32, color: colors.white, marginBottom: 10 }}>흑백</h3>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "15px 25px",
              borderRadius: 12,
              fontSize: 24,
              color: "#9ca3af",
              fontWeight: "bold",
            }}
          >
            1채널
          </div>
          <div style={{ marginTop: 15, fontSize: 20, color: colors.gray[400] }}>
            밝기만 표현
          </div>
        </div>

        {/* 화살표 */}
        <div
          style={{
            fontSize: 60,
            color: colors.gray[600],
            marginTop: 80,
            opacity: rgbOpacity,
          }}
        >
          →
        </div>

        {/* RGB 이미지 */}
        <div
          style={{
            opacity: rgbOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* RGB 채널 분리 */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <div
              style={{
                width: 60,
                height: 200,
                background: "linear-gradient(to bottom, #ff0000, #330000)",
                borderRadius: 8,
                transform: `translateX(${-channelSplit}px)`,
                opacity: 0.9,
              }}
            />
            <div
              style={{
                width: 60,
                height: 200,
                background: "linear-gradient(to bottom, #00ff00, #003300)",
                borderRadius: 8,
                opacity: 0.9,
              }}
            />
            <div
              style={{
                width: 60,
                height: 200,
                background: "linear-gradient(to bottom, #0000ff, #000033)",
                borderRadius: 8,
                transform: `translateX(${channelSplit}px)`,
                opacity: 0.9,
              }}
            />
          </div>
          <h3 style={{ fontSize: 32, color: colors.white, marginBottom: 10 }}>컬러 (RGB)</h3>
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                backgroundColor: "#ff000033",
                padding: "15px 20px",
                borderRadius: 12,
                fontSize: 20,
                color: "#ff6666",
                fontWeight: "bold",
                border: "2px solid #ff0000",
              }}
            >
              R
            </div>
            <div
              style={{
                backgroundColor: "#00ff0033",
                padding: "15px 20px",
                borderRadius: 12,
                fontSize: 20,
                color: "#66ff66",
                fontWeight: "bold",
                border: "2px solid #00ff00",
              }}
            >
              G
            </div>
            <div
              style={{
                backgroundColor: "#0000ff33",
                padding: "15px 20px",
                borderRadius: 12,
                fontSize: 20,
                color: "#6666ff",
                fontWeight: "bold",
                border: "2px solid #0000ff",
              }}
            >
              B
            </div>
          </div>
          <div
            style={{
              marginTop: 15,
              backgroundColor: colors.gray[800],
              padding: "15px 25px",
              borderRadius: 12,
              fontSize: 24,
              color: "#ec4899",
              fontWeight: "bold",
            }}
          >
            3채널
          </div>
        </div>

        {/* 색상 예시 */}
        <div
          style={{
            opacity: examplesOpacity,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginLeft: 40,
          }}
        >
          <h3 style={{ fontSize: 24, color: "#ec4899", marginBottom: 10 }}>RGB 조합</h3>
          {colorExamples.map((ex, i) => {
            const delay = 830 + i * 30;
            const itemOpacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
            return (
              <div
                key={ex.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  opacity: itemOpacity,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: ex.color,
                    borderRadius: 8,
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                />
                <span style={{ color: colors.white, fontSize: 20, width: 60 }}>{ex.name}</span>
                <span style={{ color: colors.gray[400], fontSize: 18, fontFamily: "monospace" }}>
                  ({ex.rgb.join(", ")})
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CIFAR-10 정보 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: cifarOpacity,
          backgroundColor: colors.gray[800],
          padding: "20px 40px",
          borderRadius: 16,
          border: "2px solid #22c55e",
        }}
      >
        <span style={{ color: "#22c55e", fontSize: 24, fontWeight: "bold" }}>CIFAR-10: </span>
        <span style={{ color: colors.white, fontSize: 24 }}>
          32 × 32 × 3 = <span style={{ color: "#22c55e", fontWeight: "bold" }}>3,072</span>개 값
        </span>
      </div>
    </AbsoluteFill>
  );
};
