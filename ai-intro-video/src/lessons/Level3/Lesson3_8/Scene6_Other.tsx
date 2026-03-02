/**
 * Scene 6: 기타 정규화 기법
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Other: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const augOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const bnOpacity = interpolate(frame, [210, 240], [0, 1], { extrapolateRight: "clamp" });
  const dataOpacity = interpolate(frame, [360, 390], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-8/scene6.mp3")} />

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
        기타 정규화 기법들
      </h1>

      <div style={{ display: "flex", gap: 25 }}>
        {/* 데이터 증강 */}
        <div
          style={{
            flex: 1,
            backgroundColor: colors.gray[800],
            padding: 25,
            borderRadius: 16,
            opacity: augOpacity,
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
            Data Augmentation
          </div>

          {/* 이미지 변환 예시 */}
          <div style={{ display: "flex", justifyContent: "center", gap: 15, marginBottom: 20 }}>
            <div
              style={{
                width: 70,
                height: 70,
                backgroundColor: "#22c55e30",
                border: "2px solid #22c55e",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 30 }}>🐱</span>
            </div>
            <span style={{ color: colors.white, fontSize: 24, alignSelf: "center" }}>→</span>
            <div
              style={{
                width: 70,
                height: 70,
                backgroundColor: "#22c55e30",
                border: "2px solid #22c55e",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(15deg)",
              }}
            >
              <span style={{ fontSize: 30 }}>🐱</span>
            </div>
            <div
              style={{
                width: 70,
                height: 70,
                backgroundColor: "#22c55e30",
                border: "2px solid #22c55e",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "scaleX(-1)",
              }}
            >
              <span style={{ fontSize: 30 }}>🐱</span>
            </div>
          </div>

          <div style={{ color: colors.white, fontSize: 18, textAlign: "center" }}>
            회전, 뒤집기, 자르기 등으로
          </div>
          <div style={{ color: colors.white, fontSize: 18, textAlign: "center" }}>
            훈련 데이터를 인위적으로 증가!
          </div>
        </div>

        {/* Batch Normalization */}
        <div
          style={{
            flex: 1,
            backgroundColor: colors.gray[800],
            padding: 25,
            borderRadius: 16,
            opacity: bnOpacity,
          }}
        >
          <div style={{ color: "#60a5fa", fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
            Batch Normalization
          </div>

          <div
            style={{
              backgroundColor: colors.gray[900],
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
            }}
          >
            <div style={{ color: colors.white, fontSize: 18, textAlign: "center" }}>
              각 층의 입력을 정규화
            </div>
            <div style={{ color: colors.gray[400], fontSize: 16, textAlign: "center", marginTop: 5 }}>
              평균 0, 분산 1로 변환
            </div>
          </div>

          <div style={{ color: colors.white, fontSize: 18, textAlign: "center", marginBottom: 10 }}>
            • 학습이 빠르고 안정적
          </div>
          <div style={{ color: colors.white, fontSize: 18, textAlign: "center" }}>
            • 정규화 효과도 있음!
          </div>

          <div
            style={{
              backgroundColor: "#1e1e1e",
              padding: 10,
              borderRadius: 8,
              marginTop: 15,
              textAlign: "center",
            }}
          >
            <code style={{ color: colors.gray[300], fontSize: 14 }}>
              nn.BatchNorm2d(64)
            </code>
          </div>
        </div>

        {/* 더 많은 데이터 */}
        <div
          style={{
            flex: 1,
            backgroundColor: colors.gray[800],
            padding: 25,
            borderRadius: 16,
            opacity: dataOpacity,
          }}
        >
          <div style={{ color: "#fbbf24", fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
            More Data!
          </div>

          <div
            style={{
              backgroundColor: "#fbbf2420",
              padding: 20,
              borderRadius: 12,
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            <div style={{ fontSize: 50 }}>📊</div>
          </div>

          <div style={{ color: colors.white, fontSize: 18, textAlign: "center", marginBottom: 10 }}>
            가장 확실한 해결책:
          </div>
          <div style={{ color: "#fbbf24", fontSize: 22, textAlign: "center", fontWeight: "bold" }}>
            더 많은 훈련 데이터 수집!
          </div>
          <div style={{ color: colors.gray[400], fontSize: 16, textAlign: "center", marginTop: 10 }}>
            데이터가 많으면 과적합 자연 감소
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
