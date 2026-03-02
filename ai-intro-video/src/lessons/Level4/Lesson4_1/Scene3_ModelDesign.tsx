/**
 * Scene 3: 신경망 구조 설계
 * 784 → 128 → 64 → 10 구조 시각화
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene3_ModelDesign: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 각 레이어 등장 타이밍
  const layer1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const layer2Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const layer3Opacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const layer4Opacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });

  // 연결선 애니메이션
  const conn1Progress = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const conn2Progress = interpolate(frame, [270, 300], [0, 1], { extrapolateRight: "clamp" });
  const conn3Progress = interpolate(frame, [390, 420], [0, 1], { extrapolateRight: "clamp" });

  // 활성화 함수 설명
  const reluOpacity = interpolate(frame, [540, 570], [0, 1], { extrapolateRight: "clamp" });
  const softmaxOpacity = interpolate(frame, [720, 750], [0, 1], { extrapolateRight: "clamp" });

  const layers = [
    { neurons: 8, label: "784", name: "입력층", color: "#fb923c" },
    { neurons: 6, label: "128", name: "은닉층 1", color: "#22c55e" },
    { neurons: 5, label: "64", name: "은닉층 2", color: "#3b82f6" },
    { neurons: 4, label: "10", name: "출력층", color: "#a855f7" },
  ];

  const layerOpacities = [layer1Opacity, layer2Opacity, layer3Opacity, layer4Opacity];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Audio src={staticFile("audio/lesson-4-1/scene3.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          position: "absolute",
          top: 60,
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          opacity: titleOpacity,
        }}
      >
        신경망 구조 설계
      </h2>

      {/* 신경망 시각화 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 100,
          marginTop: 40,
        }}
      >
        {layers.map((layer, layerIdx) => (
          <div
            key={layerIdx}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: layerOpacities[layerIdx],
            }}
          >
            {/* 뉴런들 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {Array.from({ length: layer.neurons }).map((_, i) => {
                const delay = [60, 180, 300, 420][layerIdx] + i * 5;
                const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 20 });
                return (
                  <div
                    key={i}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: layer.color,
                      transform: `scale(${Math.max(0, scale)})`,
                      boxShadow: `0 0 15px ${layer.color}50`,
                    }}
                  />
                );
              })}
              {/* 생략 표시 */}
              {layer.neurons < 10 && (
                <div style={{ color: colors.gray[400], fontSize: 24, textAlign: "center" }}>
                  ⋮
                </div>
              )}
            </div>

            {/* 레이어 정보 */}
            <div
              style={{
                marginTop: 20,
                textAlign: "center",
              }}
            >
              <div style={{ color: layer.color, fontSize: 32, fontWeight: "bold" }}>
                {layer.label}
              </div>
              <div style={{ color: colors.gray[300], fontSize: 20 }}>
                {layer.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 활성화 함수 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          display: "flex",
          gap: 60,
        }}
      >
        <div
          style={{
            opacity: reluOpacity,
            backgroundColor: colors.gray[800],
            padding: "20px 35px",
            borderRadius: 12,
            borderLeft: `4px solid #22c55e`,
          }}
        >
          <span style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold" }}>ReLU</span>
          <span style={{ color: colors.gray[300], fontSize: 24, marginLeft: 15 }}>
            은닉층 활성화
          </span>
        </div>

        <div
          style={{
            opacity: softmaxOpacity,
            backgroundColor: colors.gray[800],
            padding: "20px 35px",
            borderRadius: 12,
            borderLeft: `4px solid #a855f7`,
          }}
        >
          <span style={{ color: "#a855f7", fontSize: 28, fontWeight: "bold" }}>Softmax</span>
          <span style={{ color: colors.gray[300], fontSize: 24, marginLeft: 15 }}>
            출력층 (확률 분포)
          </span>
        </div>
      </div>

      {/* 화살표 표시 (레이어 사이) */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {/* Layer 1 → 2 */}
        <line
          x1="420" y1="400" x2="520" y2="400"
          stroke="#fb923c"
          strokeWidth={3}
          strokeDasharray={`${conn1Progress * 100}, 100`}
          opacity={0.7}
        />
        {/* Layer 2 → 3 */}
        <line
          x1="640" y1="400" x2="740" y2="400"
          stroke="#22c55e"
          strokeWidth={3}
          strokeDasharray={`${conn2Progress * 100}, 100`}
          opacity={0.7}
        />
        {/* Layer 3 → 4 */}
        <line
          x1="860" y1="400" x2="960" y2="400"
          stroke="#3b82f6"
          strokeWidth={3}
          strokeDasharray={`${conn3Progress * 100}, 100`}
          opacity={0.7}
        />
      </svg>
    </AbsoluteFill>
  );
};
