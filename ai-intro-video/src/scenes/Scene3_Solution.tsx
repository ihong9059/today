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

export const Scene3_Solution: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (초 단위) - Scene3: 68초
  // 0-10: "AI 첫걸음은 바로 이 문제를 해결하기 위해 만들어졌습니다."
  // 10-22: "첫 번째 원칙, 핵심만 집중합니다..."
  // 22-35: "두 번째 원칙, 직관부터 시작합니다..."
  // 35-50: "세 번째 원칙, 모든 것을 코드로 구현합니다..."
  // 50-68: "그리고 가장 중요한 것. 이 모든 콘텐츠가 완전 무료입니다."

  // Phase 시작점
  const phase1End = 10 * FPS;
  const phase2Start = 10 * FPS;
  const phase2End = 22 * FPS;
  const phase3Start = 22 * FPS;
  const phase3End = 35 * FPS;
  const phase4Start = 35 * FPS;
  const phase4End = 50 * FPS;
  const phase5Start = 50 * FPS;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        overflow: "hidden",
      }}
    >
      {/* 배경 장식 원 */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Phase 1: 도입 (0-10초) */}
      {frame < phase1End && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
              transform: `scale(${spring({
                frame,
                fps: FPS,
                config: { damping: 12, stiffness: 80 },
              })})`,
            }}
          >
            <div style={{ fontSize: 100, marginBottom: 30 }}>💡</div>
            <h1
              style={{
                fontSize: 64,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 20,
              }}
            >
              <span style={{ color: colors.primary }}>AI 첫걸음</span>은
            </h1>
            <p
              style={{
                fontSize: 48,
                color: colors.gray[200],
                lineHeight: 1.5,
              }}
            >
              이 문제를 해결하기 위해
              <br />
              만들어졌습니다
            </p>
          </div>
        </div>
      )}

      {/* Phase 2: 첫 번째 원칙 - 핵심만 집중 (10-22초) */}
      {frame >= phase2Start && frame < phase2End && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1400 }}>
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase2Start, phase2Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: colors.primary,
                padding: "10px 30px",
                borderRadius: 30,
                marginBottom: 30,
              }}
            >
              <span style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>
                원칙 1
              </span>
            </div>

            <h2
              style={{
                fontSize: 56,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 40,
              }}
            >
              🎯 핵심만 집중합니다
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              gap: 60,
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            {/* 제외하는 것 */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase2Start + 40, phase2Start + 60],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: "#7f1d1d",
                padding: "30px 40px",
                borderRadius: 20,
                border: "2px solid #ef4444",
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: 28, color: "#f87171", marginBottom: 20, fontWeight: "bold" }}>
                ❌ 과감히 생략
              </div>
              <ul style={{ margin: 0, padding: 0, paddingLeft: 20, color: colors.gray[300], fontSize: 22, lineHeight: 2 }}>
                <li>학문적으로만 중요한 내용</li>
                <li>실무에서 안 쓰는 내용</li>
                <li>시험용 이론</li>
              </ul>
            </div>

            {/* 집중하는 것 */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase2Start + 70, phase2Start + 90],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: "#14532d",
                padding: "30px 40px",
                borderRadius: 20,
                border: "2px solid #22c55e",
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: 28, color: "#4ade80", marginBottom: 20, fontWeight: "bold" }}>
                ✓ 깊이있게 학습
              </div>
              <ul style={{ margin: 0, padding: 0, paddingLeft: 20, color: colors.gray[300], fontSize: 22, lineHeight: 2 }}>
                <li>진짜 중요한 핵심 개념</li>
                <li>실무에서 쓰는 기술</li>
                <li>반드시 알아야 할 원리</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Phase 3: 두 번째 원칙 - 직관부터 시작 (22-35초) */}
      {frame >= phase3Start && frame < phase3End && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1400 }}>
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase3Start, phase3Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: colors.secondary,
                padding: "10px 30px",
                borderRadius: 30,
                marginBottom: 30,
              }}
            >
              <span style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>
                원칙 2
              </span>
            </div>

            <h2
              style={{
                fontSize: 56,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 40,
              }}
            >
              🧠 직관부터 시작합니다
            </h2>
          </div>

          {/* 학습 흐름 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
              marginTop: 40,
            }}
          >
            {[
              { step: 1, icon: "❓", title: "왜 필요한지", delay: 30 },
              { step: 2, icon: "🎯", title: "어떤 문제를 해결하는지", delay: 60 },
              { step: 3, icon: "💡", title: "자연스럽게 이해", delay: 90 },
              { step: 4, icon: "📐", title: "공식은 따라온다", delay: 120 },
            ].map((item, idx) => {
              const itemOpacity = interpolate(
                frame,
                [phase3Start + item.delay, phase3Start + item.delay + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 30 }}>
                  <div
                    style={{
                      opacity: itemOpacity,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        backgroundColor: colors.gray[700],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 48,
                        marginBottom: 15,
                        border: `3px solid ${colors.secondary}`,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ fontSize: 22, color: colors.gray[200], fontWeight: "bold" }}>
                      {item.title}
                    </div>
                  </div>
                  {idx < 3 && (
                    <div
                      style={{
                        opacity: interpolate(
                          frame,
                          [phase3Start + item.delay + 30, phase3Start + item.delay + 50],
                          [0, 1],
                          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                        ),
                        fontSize: 36,
                        color: colors.secondary,
                      }}
                    >
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase3Start + 160, phase3Start + 190],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 28,
              color: colors.gray[400],
              marginTop: 50,
            }}
          >
            복잡한 수학 공식을 먼저 보여주지 않습니다
          </p>
        </div>
      )}

      {/* Phase 4: 세 번째 원칙 - 코드로 구현 (35-50초) */}
      {frame >= phase4Start && frame < phase4End && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1400 }}>
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase4Start, phase4Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: colors.accent,
                padding: "10px 30px",
                borderRadius: 30,
                marginBottom: 30,
              }}
            >
              <span style={{ fontSize: 28, fontWeight: "bold", color: colors.gray[900] }}>
                원칙 3
              </span>
            </div>

            <h2
              style={{
                fontSize: 56,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 20,
              }}
            >
              💻 모든 것을 코드로 구현합니다
            </h2>
          </div>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase4Start + 30, phase4Start + 50],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 28,
              color: "#ef4444",
              marginBottom: 40,
            }}
          >
            듣기만 하는 강의는 일주일이면 까먹어요
          </p>

          {/* 코드 예시 */}
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase4Start + 60, phase4Start + 90],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              backgroundColor: "#1e293b",
              padding: "30px 50px",
              borderRadius: 20,
              border: `2px solid ${colors.accent}`,
              textAlign: "left",
              fontFamily: "monospace",
              display: "inline-block",
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 20, marginBottom: 15 }}>
              # 직접 구현하며 배우는 내용
            </div>
            <div style={{ color: colors.accent, fontSize: 24, lineHeight: 1.8 }}>
              <div>퍼셉트론 → 다층 퍼셉트론 → CNN</div>
              <div>→ RNN/LSTM → Transformer</div>
            </div>
          </div>

          {/* 구현 범위 */}
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase4Start + 120, phase4Start + 150],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              display: "flex",
              gap: 40,
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            {["퍼셉트론", "역전파", "CNN", "LSTM", "트랜스포머"].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: colors.gray[700],
                  padding: "15px 25px",
                  borderRadius: 12,
                  border: `2px solid ${colors.accent}`,
                }}
              >
                <span style={{ fontSize: 22, color: colors.white }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phase 5: 완전 무료 (50-68초) */}
      {frame >= phase5Start && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              transform: `scale(${spring({
                frame: frame - phase5Start,
                fps: FPS,
                config: { damping: 10, stiffness: 60 },
              })})`,
            }}
          >
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase5Start, phase5Start + 20],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                marginBottom: 30,
              }}
            >
              <span style={{ fontSize: 32, color: colors.gray[300] }}>
                그리고 가장 중요한 것
              </span>
            </div>

            <div
              style={{
                backgroundColor: `${colors.gray[800]}ee`,
                padding: "60px 100px",
                borderRadius: 30,
                border: `4px solid #22c55e`,
              }}
            >
              <div style={{ fontSize: 100, marginBottom: 20 }}>🎁</div>
              <h1
                style={{
                  fontSize: 72,
                  fontWeight: "bold",
                  color: colors.white,
                  marginBottom: 20,
                }}
              >
                이 모든 콘텐츠가
              </h1>
              <div
                style={{
                  fontSize: 80,
                  fontWeight: "bold",
                  color: "#22c55e",
                  textShadow: "0 0 30px rgba(34, 197, 94, 0.5)",
                }}
              >
                100% 완전 무료
              </div>
            </div>

            <p
              style={{
                opacity: interpolate(
                  frame,
                  [phase5Start + 60, phase5Start + 90],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                fontSize: 28,
                color: colors.gray[400],
                marginTop: 40,
              }}
            >
              AI 교육은 누구에게나 열려 있어야 합니다
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
