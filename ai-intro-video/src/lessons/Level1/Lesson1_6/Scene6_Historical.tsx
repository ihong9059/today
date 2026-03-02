/**
 * Lesson 1-6: XOR 문제와 한계
 * Scene 6: 역사적 의미
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Historical: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 책 애니메이션
  const bookScale = spring({ frame: frame - 50, fps, config: { damping: 12 } });

  // 타임라인 애니메이션
  const line1Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const line2Opacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });
  const line3Opacity = interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" });

  // 희망 메시지
  const hopeOpacity = interpolate(frame, [350, 390], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #312e81 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-6/scene6_historical.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 48,
          color: colors.white,
          fontWeight: "bold",
          opacity: titleOpacity,
          marginBottom: 30,
        }}
      >
        AI 역사의 중요한 순간
      </h2>

      <div style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
        {/* 책 이미지 */}
        <div
          style={{
            width: 280,
            height: 360,
            backgroundColor: "#7c3aed",
            borderRadius: 10,
            boxShadow: "10px 10px 30px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 25,
            transform: `scale(${bookScale})`,
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 20 }}>📖</div>
          <div
            style={{
              fontSize: 28,
              color: colors.white,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Perceptrons
          </div>
          <div
            style={{
              fontSize: 18,
              color: colors.gray[300],
              textAlign: "center",
              marginTop: 15,
            }}
          >
            Minsky & Papert
            <br />
            1969
          </div>
        </div>

        {/* 타임라인 */}
        <div style={{ flex: 1 }}>
          {/* 1969 - 발표 */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 25,
              opacity: line1Opacity,
            }}
          >
            <div
              style={{
                width: 100,
                backgroundColor: "#f59e0b",
                borderRadius: 10,
                padding: 15,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>1969</span>
            </div>
            <div
              style={{
                backgroundColor: colors.gray[800],
                borderRadius: 10,
                padding: 15,
                flex: 1,
              }}
            >
              <p style={{ fontSize: 22, color: colors.white }}>
                민스키 & 페퍼트, XOR 한계 <span style={{ color: "#ef4444" }}>수학적 증명</span>
              </p>
            </div>
          </div>

          {/* 1970s - AI 겨울 */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 25,
              opacity: line2Opacity,
            }}
          >
            <div
              style={{
                width: 100,
                backgroundColor: "#3b82f6",
                borderRadius: 10,
                padding: 15,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>1970s</span>
            </div>
            <div
              style={{
                backgroundColor: colors.gray[800],
                borderRadius: 10,
                padding: 15,
                flex: 1,
              }}
            >
              <p style={{ fontSize: 22, color: colors.white }}>
                <span style={{ color: "#60a5fa" }}>"AI 겨울"</span> 시작 - 연구 자금 중단
              </p>
              <p style={{ fontSize: 18, color: colors.gray[400], marginTop: 8 }}>
                많은 과학자들이 다른 분야로 떠남
              </p>
            </div>
          </div>

          {/* 약 10년 암흑기 */}
          <div
            style={{
              display: "flex",
              gap: 20,
              opacity: line3Opacity,
            }}
          >
            <div
              style={{
                width: 100,
                backgroundColor: "#6b7280",
                borderRadius: 10,
                padding: 15,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>~10년</span>
            </div>
            <div
              style={{
                backgroundColor: colors.gray[800],
                borderRadius: 10,
                padding: 15,
                flex: 1,
              }}
            >
              <p style={{ fontSize: 22, color: colors.white }}>
                신경망 연구의 <span style={{ color: "#9ca3af" }}>암흑기</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 희망 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          backgroundColor: "#22c55e30",
          border: "2px solid #22c55e",
          borderRadius: 15,
          padding: "20px 50px",
          opacity: hopeOpacity,
        }}
      >
        <span style={{ fontSize: 28, color: "#22c55e", fontWeight: "bold" }}>
          하지만 이 문제에는 해결책이 있었습니다!
        </span>
      </div>
    </AbsoluteFill>
  );
};
