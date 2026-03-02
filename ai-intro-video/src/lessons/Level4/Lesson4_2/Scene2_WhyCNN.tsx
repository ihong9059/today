/**
 * Scene 2: CNN이 필요한 이유
 * MLP의 한계와 CNN의 장점
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_WhyCNN: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // MLP 문제점
  const mlpOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // CNN 장점
  const cnnOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });

  // 이미지 크기 비교
  const comparisonOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-2/scene2.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 52,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        왜 CNN이 필요한가?
      </h2>

      <div style={{ display: "flex", gap: 60, width: "100%", maxWidth: 1600 }}>
        {/* 이미지 크기 비교 */}
        <div
          style={{
            flex: 1,
            opacity: comparisonOpacity,
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          {/* MNIST */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              border: "2px solid #3b82f6",
            }}
          >
            <div style={{ color: "#3b82f6", fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
              MNIST (흑백)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 84,
                  height: 84,
                  backgroundColor: colors.gray[700],
                  border: "1px solid #3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.gray[400],
                  fontSize: 14,
                }}
              >
                28×28
              </div>
              <span style={{ color: colors.white, fontSize: 24 }}>→</span>
              <span style={{ color: colors.white, fontSize: 28, fontWeight: "bold" }}>
                784 입력
              </span>
            </div>
          </div>

          {/* CIFAR-10 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              border: `2px solid ${colors.level[4]}`,
            }}
          >
            <div style={{ color: colors.level[4], fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
              CIFAR-10 (컬러)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 96,
                  height: 96,
                  background: "linear-gradient(45deg, #ef4444, #22c55e, #3b82f6)",
                  border: `1px solid ${colors.level[4]}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.white,
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                32×32×3
              </div>
              <span style={{ color: colors.white, fontSize: 24 }}>→</span>
              <span style={{ color: "#ef4444", fontSize: 28, fontWeight: "bold" }}>
                3,072 입력!
              </span>
            </div>
          </div>
        </div>

        {/* MLP 문제점 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderRadius: 16,
            padding: 30,
            border: "2px solid #ef4444",
            opacity: mlpOpacity,
          }}
        >
          <h3 style={{ color: "#ef4444", fontSize: 32, marginBottom: 25 }}>
            ❌ MLP의 한계
          </h3>
          <ul style={{ color: colors.white, fontSize: 26, lineHeight: 2 }}>
            <li>파라미터가 너무 많아짐</li>
            <li style={{ marginTop: 15 }}>
              공간 정보 무시
              <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 5 }}>
                픽셀 위치 관계가 사라짐
              </div>
            </li>
            <li style={{ marginTop: 15 }}>
              위치 변화에 취약
              <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 5 }}>
                고양이가 좌측/우측에 있으면 다른 패턴
              </div>
            </li>
          </ul>
        </div>

        {/* CNN 장점 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            borderRadius: 16,
            padding: 30,
            border: "2px solid #22c55e",
            opacity: cnnOpacity,
          }}
        >
          <h3 style={{ color: "#22c55e", fontSize: 32, marginBottom: 25 }}>
            ✅ CNN의 해결책
          </h3>
          <ul style={{ color: colors.white, fontSize: 26, lineHeight: 2 }}>
            <li>가중치 공유로 파라미터 감소</li>
            <li style={{ marginTop: 15 }}>
              공간 구조 보존
              <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 5 }}>
                인접 픽셀 관계 유지
              </div>
            </li>
            <li style={{ marginTop: 15 }}>
              위치 불변성
              <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 5 }}>
                어디 있든 같은 특징으로 인식
              </div>
            </li>
          </ul>
        </div>
      </div>
    </AbsoluteFill>
  );
};
