import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
} from "remotion";
import { colors } from "../styles";

interface Props {
  durationInFrames: number;
}

export const Scene6_CTA: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (초 단위) - Scene6: 75초
  // 0-18: 정리 (10개 레벨, 58개 레슨, 50시간+, 100% 무료)
  // 18-30: 세네카 명언과 AI 시대 시작
  // 30-50: AI 기회와 위협, 격차 경고
  // 50-75: 지금 시작하자는 CTA

  const phase1End = 18 * FPS;
  const phase2Start = 18 * FPS;
  const phase2End = 30 * FPS;
  const phase3Start = 30 * FPS;
  const phase3End = 50 * FPS;
  const phase4Start = 50 * FPS;

  const stats = [
    { number: "10", label: "레벨", color: colors.primary, delay: 0 },
    { number: "58", label: "레슨", color: colors.secondary, delay: 20 },
    { number: "50+", label: "학습 시간", color: colors.accent, delay: 40 },
    { number: "100%", label: "완전 무료", color: "#22c55e", delay: 60 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e1b4b 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        overflow: "hidden",
      }}
    >
      {/* 배경 그라데이션 원 */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 60%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Phase 1: 핵심 수치 정리 (0-18초) */}
      {frame < phase1End && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <h2
            style={{
              opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
              fontSize: 48,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 60,
            }}
          >
            정리해드릴게요
          </h2>

          <div
            style={{
              display: "flex",
              gap: 60,
              justifyContent: "center",
            }}
          >
            {stats.map((stat, idx) => {
              const statScale = spring({
                frame: frame - stat.delay,
                fps: FPS,
                config: { damping: 12, stiffness: 100 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${statScale})`,
                    backgroundColor: colors.gray[800],
                    padding: "40px 50px",
                    borderRadius: 24,
                    border: `3px solid ${stat.color}`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 64,
                      fontWeight: "bold",
                      color: stat.color,
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      color: colors.gray[300],
                      marginTop: 10,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          <p
            style={{
              opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              fontSize: 32,
              color: colors.gray[300],
              marginTop: 50,
            }}
          >
            유료 부트캠프 수준의 퀄리티를, <span style={{ color: "#22c55e" }}>누구나</span> 접근할 수 있도록
          </p>
        </div>
      )}

      {/* Phase 2: 세네카 명언 (18-30초) */}
      {frame >= phase2Start && frame < phase2End && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase2Start, phase2Start + 30],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              transform: `scale(${spring({
                frame: frame - phase2Start,
                fps: FPS,
                config: { damping: 12, stiffness: 60 },
              })})`,
            }}
          >
            <div style={{ fontSize: 60, marginBottom: 30 }}>💡</div>
            <div
              style={{
                backgroundColor: `${colors.gray[800]}ee`,
                padding: "40px 80px",
                borderRadius: 30,
                border: `2px solid ${colors.primary}40`,
              }}
            >
              <p
                style={{
                  fontSize: 42,
                  color: colors.gray[200],
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                "행운은 <span style={{ color: colors.accent }}>준비</span>가
                <br />
                <span style={{ color: colors.primary }}>기회</span>를 만났을 때 생겨납니다"
              </p>
              <p
                style={{
                  fontSize: 24,
                  color: colors.gray[400],
                }}
              >
                — 세네카
              </p>
            </div>

            <p
              style={{
                opacity: interpolate(
                  frame,
                  [phase2Start + 80, phase2Start + 110],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                fontSize: 32,
                color: colors.primary,
                marginTop: 40,
              }}
            >
              AI 시대는 이미 시작되었습니다
            </p>
          </div>
        </div>
      )}

      {/* Phase 3: 기회와 위협 (30-50초) */}
      {frame >= phase3Start && frame < phase3End && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1400 }}>
          <h2
            style={{
              opacity: interpolate(
                frame,
                [phase3Start, phase3Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 42,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 50,
            }}
          >
            AI 시대, 당신의 선택은?
          </h2>

          <div
            style={{
              display: "flex",
              gap: 80,
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {/* 준비된 사람 */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase3Start + 30, phase3Start + 60],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: "#14532d",
                padding: "40px 60px",
                borderRadius: 24,
                border: "3px solid #22c55e",
                textAlign: "center",
                flex: 1,
                maxWidth: 400,
              }}
            >
              <div style={{ fontSize: 64, marginBottom: 20 }}>🚀</div>
              <h3 style={{ fontSize: 32, color: "#4ade80", marginBottom: 15 }}>
                준비된 사람
              </h3>
              <p style={{ fontSize: 24, color: colors.gray[200], lineHeight: 1.6 }}>
                엄청난 <span style={{ color: "#4ade80", fontWeight: "bold" }}>기회</span>
              </p>
            </div>

            {/* VS */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase3Start + 60, phase3Start + 90],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                display: "flex",
                alignItems: "center",
                fontSize: 48,
                color: colors.gray[500],
              }}
            >
              VS
            </div>

            {/* 준비 안 된 사람 */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase3Start + 90, phase3Start + 120],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: "#7f1d1d",
                padding: "40px 60px",
                borderRadius: 24,
                border: "3px solid #ef4444",
                textAlign: "center",
                flex: 1,
                maxWidth: 400,
              }}
            >
              <div style={{ fontSize: 64, marginBottom: 20 }}>😟</div>
              <h3 style={{ fontSize: 32, color: "#f87171", marginBottom: 15 }}>
                준비 안 된 사람
              </h3>
              <p style={{ fontSize: 24, color: colors.gray[200], lineHeight: 1.6 }}>
                심각한 <span style={{ color: "#f87171", fontWeight: "bold" }}>위협</span>
              </p>
            </div>
          </div>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase3Start + 150, phase3Start + 180],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 28,
              color: "#ef4444",
              marginTop: 50,
            }}
          >
            지금 이 순간에도 누군가는 AI를 배우고 있습니다. 그 사람과의 격차는 더 벌어집니다.
          </p>
        </div>
      )}

      {/* Phase 4: CTA (50-75초) */}
      {frame >= phase4Start && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              transform: `scale(${spring({
                frame: frame - phase4Start,
                fps: FPS,
                config: { damping: 10, stiffness: 60 },
              })})`,
            }}
          >
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase4Start, phase4Start + 30],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                fontSize: 32,
                color: "#ef4444",
                marginBottom: 30,
              }}
            >
              지금 시작하지 않으면, 그 기회는 다른 사람의 것이 됩니다
            </div>

            <div
              style={{
                backgroundColor: `${colors.gray[800]}ee`,
                padding: "60px 100px",
                borderRadius: 30,
                border: `4px solid ${colors.primary}`,
              }}
            >
              <div style={{ fontSize: 80, marginBottom: 20 }}>🎯</div>
              <h1
                style={{
                  fontSize: 64,
                  fontWeight: "bold",
                  color: colors.white,
                  marginBottom: 30,
                }}
              >
                레벨 0부터 차근차근
              </h1>
              <div
                style={{
                  fontSize: 52,
                  fontWeight: "bold",
                  color: colors.primary,
                }}
              >
                함께 시작해요
              </div>
            </div>

            {/* 시작 버튼 */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase4Start + 90, phase4Start + 120],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                transform: `scale(${1 + Math.sin((frame - phase4Start) * 0.1) * 0.03})`,
                marginTop: 50,
                backgroundColor: colors.white,
                color: colors.primary,
                padding: "24px 60px",
                borderRadius: 60,
                fontSize: 32,
                fontWeight: "bold",
                display: "inline-block",
                boxShadow: `0 0 40px ${colors.white}40`,
              }}
            >
              🚀 지금 바로 시작하기
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
