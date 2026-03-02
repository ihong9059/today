/**
 * Scene 7: 아웃트로
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const guideOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const reluOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const sigmoidOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const softmaxOpacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const tanhOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  const nextOpacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });
  const endOpacity = interpolate(frame, [540, 570], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-7/scene7.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        활성화 함수 선택 가이드
      </h1>

      {/* 가이드 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          padding: 30,
          borderRadius: 20,
          marginBottom: 30,
          opacity: guideOpacity,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {/* ReLU */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: reluOpacity,
            }}
          >
            <div
              style={{
                backgroundColor: "#22c55e",
                padding: "10px 20px",
                borderRadius: 10,
                minWidth: 100,
                textAlign: "center",
              }}
            >
              <span style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>ReLU</span>
            </div>
            <span style={{ color: colors.white, fontSize: 24 }}>→</span>
            <span style={{ color: colors.gray[300], fontSize: 22 }}>은닉층 기본 선택!</span>
          </div>

          {/* Sigmoid */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: sigmoidOpacity,
            }}
          >
            <div
              style={{
                backgroundColor: "#f87171",
                padding: "10px 20px",
                borderRadius: 10,
                minWidth: 100,
                textAlign: "center",
              }}
            >
              <span style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>Sigmoid</span>
            </div>
            <span style={{ color: colors.white, fontSize: 24 }}>→</span>
            <span style={{ color: colors.gray[300], fontSize: 22 }}>이진 분류 출력층</span>
          </div>

          {/* Softmax */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: softmaxOpacity,
            }}
          >
            <div
              style={{
                backgroundColor: "#60a5fa",
                padding: "10px 20px",
                borderRadius: 10,
                minWidth: 100,
                textAlign: "center",
              }}
            >
              <span style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>Softmax</span>
            </div>
            <span style={{ color: colors.white, fontSize: 24 }}>→</span>
            <span style={{ color: colors.gray[300], fontSize: 22 }}>다중 분류 출력층</span>
          </div>

          {/* Tanh */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: tanhOpacity,
            }}
          >
            <div
              style={{
                backgroundColor: "#fbbf24",
                padding: "10px 20px",
                borderRadius: 10,
                minWidth: 100,
                textAlign: "center",
              }}
            >
              <span style={{ color: colors.gray[900], fontSize: 22, fontWeight: "bold" }}>Tanh</span>
            </div>
            <span style={{ color: colors.white, fontSize: 24 }}>→</span>
            <span style={{ color: colors.gray[300], fontSize: 22 }}>RNN 등 특수 경우</span>
          </div>
        </div>
      </div>

      {/* 다음 강의 예고 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          border: "2px solid #22c55e",
          padding: "18px 40px",
          borderRadius: 20,
          textAlign: "center",
          marginBottom: 20,
          opacity: nextOpacity,
        }}
      >
        <div style={{ color: "#22c55e", fontSize: 18, marginBottom: 8 }}>
          다음 강의
        </div>
        <div style={{ color: colors.white, fontSize: 28, fontWeight: "bold" }}>
          Lesson 3-8: 과적합과 정규화
        </div>
        <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 8 }}>
          Dropout, L2 정규화로 일반화 성능 높이기!
        </div>
      </div>

      {/* 마무리 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: endOpacity,
        }}
      >
        <div style={{ fontSize: 32, color: "#fbbf24", fontWeight: "bold" }}>
          수고하셨습니다!
        </div>
      </div>
    </AbsoluteFill>
  );
};
