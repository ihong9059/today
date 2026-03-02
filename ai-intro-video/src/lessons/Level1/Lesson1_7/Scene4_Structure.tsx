/**
 * Scene 4: 다층 퍼셉트론 구조
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_Structure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 각 층의 등장 타이밍
  const inputLayerOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });
  const hiddenLayerOpacity = interpolate(frame, [150, 200], [0, 1], { extrapolateRight: "clamp" });
  const outputLayerOpacity = interpolate(frame, [250, 300], [0, 1], { extrapolateRight: "clamp" });
  const connectionsOpacity = interpolate(frame, [320, 380], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e1b4b 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-7/scene4_structure.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 60,
          opacity: titleOpacity,
        }}
      >
        다층 퍼셉트론 구조
      </h2>

      {/* 네트워크 시각화 */}
      <div
        style={{
          position: "relative",
          width: 1200,
          height: 500,
        }}
      >
        {/* 연결선 (SVG) */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: connectionsOpacity,
          }}
        >
          {/* 입력층 → 은닉층 연결 */}
          {[0, 1].map((i) =>
            [0, 1, 2].map((j) => (
              <line
                key={`i${i}-h${j}`}
                x1={200}
                y1={150 + i * 200}
                x2={500}
                y2={100 + j * 150}
                stroke="#4b5563"
                strokeWidth="2"
              />
            ))
          )}
          {/* 은닉층 → 출력층 연결 */}
          {[0, 1, 2].map((i) => (
            <line
              key={`h${i}-o`}
              x1={600}
              y1={100 + i * 150}
              x2={900}
              y2={250}
              stroke="#4b5563"
              strokeWidth="2"
            />
          ))}
        </svg>

        {/* 입력층 */}
        <div
          style={{
            position: "absolute",
            left: 100,
            top: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 100,
            opacity: inputLayerOpacity,
          }}
        >
          <div style={{ position: "absolute", top: 0, color: "#3b82f6", fontSize: 28, fontWeight: "bold" }}>
            입력층
          </div>
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: 28,
                fontWeight: "bold",
                boxShadow: "0 8px 30px rgba(59,130,246,0.5)",
              }}
            >
              x{i}
            </div>
          ))}
          <div style={{ position: "absolute", bottom: 20, color: colors.gray[400], fontSize: 20 }}>
            데이터 입력
          </div>
        </div>

        {/* 은닉층 */}
        <div
          style={{
            position: "absolute",
            left: 450,
            top: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 50,
            opacity: hiddenLayerOpacity,
          }}
        >
          <div style={{ position: "absolute", top: 0, color: "#a855f7", fontSize: 28, fontWeight: "bold" }}>
            은닉층
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: "#a855f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: 24,
                fontWeight: "bold",
                boxShadow: "0 8px 30px rgba(168,85,247,0.5)",
              }}
            >
              h{i}
            </div>
          ))}
          <div style={{ position: "absolute", bottom: 20, color: colors.gray[400], fontSize: 20 }}>
            중간 계산
          </div>
        </div>

        {/* 출력층 */}
        <div
          style={{
            position: "absolute",
            left: 850,
            top: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: outputLayerOpacity,
          }}
        >
          <div style={{ position: "absolute", top: 0, color: "#22c55e", fontSize: 28, fontWeight: "bold" }}>
            출력층
          </div>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.white,
              fontSize: 28,
              fontWeight: "bold",
              boxShadow: "0 8px 30px rgba(34,197,94,0.5)",
            }}
          >
            y
          </div>
          <div style={{ position: "absolute", bottom: 20, color: colors.gray[400], fontSize: 20 }}>
            최종 결과
          </div>
        </div>

        {/* 층 설명 박스 */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 80,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            opacity: interpolate(frame, [400, 450], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "15px 25px",
              borderRadius: 10,
              borderLeft: "4px solid #a855f7",
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 22, fontWeight: "bold" }}>은닉층 = 핵심!</div>
            <div style={{ color: colors.white, fontSize: 18 }}>복잡한 패턴 학습</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
