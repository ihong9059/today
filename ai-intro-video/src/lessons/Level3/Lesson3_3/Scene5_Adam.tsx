/**
 * Scene 5: Adam
 * Adaptive Moment Estimation
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_Adam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 이름 설명
  const nameOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 모멘텀 + RMSprop 조합
  const combo1Scale = spring({ frame: frame - 120, fps, config: { damping: 12 } });
  const combo2Scale = spring({ frame: frame - 180, fps, config: { damping: 12 } });
  const plusScale = spring({ frame: frame - 150, fps, config: { damping: 12 } });

  // 수식들
  const formula1Opacity = interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" });
  const formula2Opacity = interpolate(frame, [340, 370], [0, 1], { extrapolateRight: "clamp" });
  const formula3Opacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });

  // 파라미터
  const paramOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });

  // 결론
  const conclusionOpacity = interpolate(frame, [620, 650], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-3/scene5.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
          opacity: titleOpacity,
        }}
      >
        Adam ⭐
      </h1>

      {/* 이름 풀이 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 25,
          opacity: nameOpacity,
        }}
      >
        <span style={{ color: "#a855f7", fontSize: 24 }}>
          <strong>Ada</strong>ptive <strong>M</strong>oment Estimation
        </span>
      </div>

      {/* 모멘텀 + RMSprop */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            backgroundColor: "#22c55e30",
            border: "3px solid #22c55e",
            padding: "15px 30px",
            borderRadius: 16,
            transform: `scale(${combo1Scale})`,
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold" }}>Momentum</div>
          <div style={{ color: colors.gray[400], fontSize: 16 }}>기울기 이동평균</div>
        </div>

        <div
          style={{
            color: colors.white,
            fontSize: 48,
            fontWeight: "bold",
            transform: `scale(${plusScale})`,
          }}
        >
          +
        </div>

        <div
          style={{
            backgroundColor: "#fbbf2430",
            border: "3px solid #fbbf24",
            padding: "15px 30px",
            borderRadius: 16,
            transform: `scale(${combo2Scale})`,
          }}
        >
          <div style={{ color: "#fbbf24", fontSize: 28, fontWeight: "bold" }}>RMSprop</div>
          <div style={{ color: colors.gray[400], fontSize: 16 }}>적응적 학습률</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 수식 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
            }}
          >
            <h3 style={{ color: "#a855f7", fontSize: 24, marginBottom: 15 }}>
              핵심 수식
            </h3>

            {/* m (1차 모멘트) */}
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
                opacity: formula1Opacity,
                borderLeft: "4px solid #22c55e",
              }}
            >
              <div style={{ color: colors.white, fontSize: 24, fontFamily: "serif" }}>
                m = β₁ · m + (1-β₁) · g
              </div>
              <div style={{ color: "#22c55e", fontSize: 14, marginTop: 5 }}>
                1차 모멘트 (Momentum)
              </div>
            </div>

            {/* v (2차 모멘트) */}
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
                opacity: formula2Opacity,
                borderLeft: "4px solid #fbbf24",
              }}
            >
              <div style={{ color: colors.white, fontSize: 24, fontFamily: "serif" }}>
                v = β₂ · v + (1-β₂) · g²
              </div>
              <div style={{ color: "#fbbf24", fontSize: 14, marginTop: 5 }}>
                2차 모멘트 (RMSprop)
              </div>
            </div>

            {/* 가중치 업데이트 */}
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 15,
                borderRadius: 10,
                opacity: formula3Opacity,
                borderLeft: "4px solid #a855f7",
              }}
            >
              <div style={{ color: colors.white, fontSize: 24, fontFamily: "serif" }}>
                w = w - η · m̂ / √(v̂ + ε)
              </div>
              <div style={{ color: "#a855f7", fontSize: 14, marginTop: 5 }}>
                보정 후 업데이트
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 파라미터 & 권장 */}
        <div style={{ flex: 1 }}>
          {/* 기본 파라미터 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 16,
              marginBottom: 20,
              opacity: paramOpacity,
            }}
          >
            <h3 style={{ color: "#60a5fa", fontSize: 24, marginBottom: 15 }}>
              기본 파라미터
            </h3>
            <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
              <div
                style={{
                  backgroundColor: colors.gray[900],
                  padding: "10px 20px",
                  borderRadius: 10,
                }}
              >
                <span style={{ color: "#22c55e" }}>β₁ = </span>
                <span style={{ color: colors.white }}>0.9</span>
              </div>
              <div
                style={{
                  backgroundColor: colors.gray[900],
                  padding: "10px 20px",
                  borderRadius: 10,
                }}
              >
                <span style={{ color: "#fbbf24" }}>β₂ = </span>
                <span style={{ color: colors.white }}>0.999</span>
              </div>
              <div
                style={{
                  backgroundColor: colors.gray[900],
                  padding: "10px 20px",
                  borderRadius: 10,
                }}
              >
                <span style={{ color: "#a855f7" }}>lr = </span>
                <span style={{ color: colors.white }}>0.001</span>
              </div>
            </div>
          </div>

          {/* 권장사항 */}
          <div
            style={{
              backgroundColor: "#a855f720",
              border: "2px solid #a855f7",
              padding: 25,
              borderRadius: 16,
              textAlign: "center",
              opacity: conclusionOpacity,
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 28, fontWeight: "bold" }}>
              딥러닝의 기본 선택! 👑
            </div>
            <div style={{ color: colors.gray[300], fontSize: 20, marginTop: 10 }}>
              복잡한 튜닝 없이도 좋은 성능
            </div>
            <div style={{ color: "#fbbf24", fontSize: 18, marginTop: 10 }}>
              lr=0.001로 시작하면 거의 OK
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
