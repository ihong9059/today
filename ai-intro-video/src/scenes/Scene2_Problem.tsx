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

export const Scene2_Problem: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (초 단위) - Scene2: 67초
  // 0-8: "솔직하게 말씀드릴게요. AI를 독학하려고 하면 정말 많은 벽에 부딪힙니다."
  // 8-20: "유튜브에서 딥러닝 강의를 찾아보면... 편미분, 행렬 곱셈, 체인 룰이 튀어나옵니다."
  // 20-30: "선형대수 강의... 유료 강의를 결제하지만... 금방 지치게 됩니다."
  // 30-45: "더 심각한 문제... AI를 이해하는 사람과 그렇지 않은 사람의 격차..."
  // 45-55: "개발자라면 도태, 기획자/디자이너도 경쟁력 상실, 직장인도 뒤처짐"
  // 55-67: "AI는 더 이상 선택이 아니라 필수입니다."

  // Phase 1: 벽에 부딪히는 이미지 (0-8초)
  const phase1End = 8 * FPS;

  // Phase 2: 유튜브 강의 문제 (8-20초)
  const phase2Start = 8 * FPS;
  const phase2End = 20 * FPS;

  // Phase 3: 유료 강의도 안됨 (20-30초)
  const phase3Start = 20 * FPS;
  const phase3End = 30 * FPS;

  // Phase 4: 격차 문제 (30-45초)
  const phase4Start = 30 * FPS;
  const phase4End = 45 * FPS;

  // Phase 5: 직군별 위험 (45-55초)
  const phase5Start = 45 * FPS;
  const phase5End = 55 * FPS;

  // Phase 6: AI는 필수 (55-67초)
  const phase6Start = 55 * FPS;

  // 수학 공식들 (배경에 떠다니는 효과)
  const formulas = [
    "∂L/∂w = -2Σ(yᵢ - ŷᵢ)xᵢ",
    "σ(x) = 1/(1+e⁻ˣ)",
    "∇f = (∂f/∂x, ∂f/∂y)",
    "P(A|B) = P(B|A)P(A)/P(B)",
    "E[X] = Σxᵢp(xᵢ)",
    "d/dx[f(g(x))] = f'(g(x))·g'(x)",
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1a1a2e 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        overflow: "hidden",
      }}
    >
      {/* 배경 수학 공식 (Phase 2 이후 나타남) */}
      {frame >= phase2Start && frame < phase3End && formulas.map((formula, idx) => {
        const formulaDelay = (idx * 10);
        const formulaOpacity = interpolate(
          frame,
          [phase2Start + formulaDelay, phase2Start + formulaDelay + 30, phase3End - 30, phase3End],
          [0, 0.4, 0.4, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const yOffset = Math.sin((frame + idx * 30) * 0.03) * 15;
        const xPos = ((idx % 3) * 500 + 200);
        const yPos = (Math.floor(idx / 3) * 350 + 150 + yOffset);

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: xPos,
              top: yPos,
              opacity: formulaOpacity,
              fontSize: 28,
              color: "#ef4444",
              fontFamily: "monospace",
              transform: `rotate(${(idx - 2.5) * 8}deg)`,
              textShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
            }}
          >
            {formula}
          </div>
        );
      })}

      {/* Phase 1: AI 독학의 벽 (0-8초) */}
      {frame < phase1End && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 100, marginBottom: 30 }}>🧱</div>
            <h1
              style={{
                fontSize: 64,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 20,
              }}
            >
              AI 독학의 현실
            </h1>
            <p
              style={{
                fontSize: 36,
                color: colors.gray[300],
                lineHeight: 1.5,
              }}
            >
              정말 많은 <span style={{ color: "#ef4444", fontWeight: "bold" }}>벽</span>에 부딪힙니다
            </p>
          </div>
        </div>
      )}

      {/* Phase 2: 유튜브 강의 문제 (8-20초) */}
      {frame >= phase2Start && frame < phase2End && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 40,
            }}
          >
            {/* 유튜브 아이콘과 제목 */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase2Start, phase2Start + 20],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div style={{ fontSize: 60 }}>📺</div>
              <span style={{ fontSize: 36, color: colors.gray[300] }}>
                유튜브 딥러닝 강의
              </span>
            </div>

            {/* 첫 번째 영상 vs 두 번째 영상 비교 */}
            <div
              style={{
                display: "flex",
                gap: 80,
                alignItems: "stretch",
              }}
            >
              {/* 첫 번째 영상 */}
              <div
                style={{
                  opacity: interpolate(
                    frame,
                    [phase2Start + 30, phase2Start + 50],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  backgroundColor: colors.gray[800],
                  padding: "30px 40px",
                  borderRadius: 20,
                  border: `2px solid ${colors.primary}`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 24, color: colors.gray[400], marginBottom: 10 }}>
                  1번 영상
                </div>
                <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
                  "AI란 무엇인가"
                </div>
                <div style={{ fontSize: 48, marginTop: 15 }}>😊</div>
                <div style={{ fontSize: 20, color: colors.primary, marginTop: 10 }}>
                  쉽고 재미있다!
                </div>
              </div>

              {/* 화살표 */}
              <div
                style={{
                  opacity: interpolate(
                    frame,
                    [phase2Start + 60, phase2Start + 80],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  display: "flex",
                  alignItems: "center",
                  fontSize: 60,
                  color: colors.gray[500],
                }}
              >
                →
              </div>

              {/* 두 번째 영상 */}
              <div
                style={{
                  opacity: interpolate(
                    frame,
                    [phase2Start + 90, phase2Start + 110],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  backgroundColor: "#7f1d1d",
                  padding: "30px 40px",
                  borderRadius: 20,
                  border: "2px solid #ef4444",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 24, color: colors.gray[400], marginBottom: 10 }}>
                  2번 영상
                </div>
                <div style={{ fontSize: 28, color: "#ef4444", fontWeight: "bold" }}>
                  편미분, 행렬 곱셈
                  <br />
                  체인 룰...
                </div>
                <div style={{ fontSize: 48, marginTop: 15 }}>😰</div>
                <div style={{ fontSize: 20, color: "#f87171", marginTop: 10 }}>
                  갑자기 어려워!
                </div>
              </div>
            </div>

            <p
              style={{
                opacity: interpolate(
                  frame,
                  [phase2Start + 120, phase2Start + 150],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                fontSize: 28,
                color: colors.gray[400],
                marginTop: 20,
              }}
            >
              "나는 수학을 먼저 공부해야 하나...?"
            </p>
          </div>
        </div>
      )}

      {/* Phase 3: 유료 강의도 실패 (20-30초) */}
      {frame >= phase3Start && frame < phase3End && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 40,
            }}
          >
            {/* 악순환 사이클 */}
            <div
              style={{
                display: "flex",
                gap: 30,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {[
                { icon: "📚", text: "선형대수 강의", delay: 0 },
                { icon: "→", text: "", delay: 15 },
                { icon: "😵", text: "너무 어려움", delay: 30 },
                { icon: "→", text: "", delay: 45 },
                { icon: "💳", text: "유료 강의 결제", delay: 60 },
                { icon: "→", text: "", delay: 75 },
                { icon: "😩", text: "체계 없이 지침", delay: 90 },
              ].map((item, idx) => {
                const itemOpacity = interpolate(
                  frame,
                  [phase3Start + item.delay, phase3Start + item.delay + 20],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                return (
                  <div
                    key={idx}
                    style={{
                      opacity: itemOpacity,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: item.text ? 48 : 36, color: colors.gray[500] }}>
                      {item.icon}
                    </div>
                    {item.text && (
                      <div style={{ fontSize: 20, color: colors.gray[300], marginTop: 10 }}>
                        {item.text}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 결론 메시지 */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase3Start + 120, phase3Start + 150],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: `${colors.gray[800]}ee`,
                padding: "30px 50px",
                borderRadius: 20,
                marginTop: 30,
              }}
            >
              <p style={{ fontSize: 36, color: "#ef4444", fontWeight: "bold", margin: 0 }}>
                결국 포기하게 됩니다
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Phase 4: AI 격차 문제 (30-45초) */}
      {frame >= phase4Start && frame < phase4End && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase4Start, phase4Start + 30],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div style={{ fontSize: 36, color: "#ef4444", marginBottom: 20 }}>
              ⚠️ 더 심각한 문제
            </div>
            <h2
              style={{
                fontSize: 52,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 40,
                lineHeight: 1.4,
              }}
            >
              AI를 이해하는 사람과
              <br />
              그렇지 않은 사람의 <span style={{ color: "#ef4444" }}>격차</span>
            </h2>
          </div>

          {/* 격차 시각화 */}
          <div
            style={{
              display: "flex",
              gap: 100,
              alignItems: "flex-end",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            {/* AI 이해 O */}
            <div
              style={{
                textAlign: "center",
                opacity: interpolate(
                  frame,
                  [phase4Start + 60, phase4Start + 90],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
              }}
            >
              <div
                style={{
                  width: 200,
                  height: interpolate(
                    frame,
                    [phase4Start + 90, phase4Start + 150],
                    [100, 300],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  borderRadius: "20px 20px 0 0",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingTop: 20,
                }}
              >
                <span style={{ fontSize: 60 }}>🚀</span>
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: colors.primary,
                  marginTop: 15,
                  fontWeight: "bold",
                }}
              >
                AI 이해 ✓
              </div>
            </div>

            {/* AI 이해 X */}
            <div
              style={{
                textAlign: "center",
                opacity: interpolate(
                  frame,
                  [phase4Start + 80, phase4Start + 110],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
              }}
            >
              <div
                style={{
                  width: 200,
                  height: interpolate(
                    frame,
                    [phase4Start + 110, phase4Start + 170],
                    [100, 80],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  backgroundColor: "#7f1d1d",
                  borderRadius: "20px 20px 0 0",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingTop: 20,
                }}
              >
                <span style={{ fontSize: 60 }}>😟</span>
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: "#ef4444",
                  marginTop: 15,
                  fontWeight: "bold",
                }}
              >
                AI 이해 ✗
              </div>
            </div>
          </div>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase4Start + 200, phase4Start + 230],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 28,
              color: colors.gray[400],
              marginTop: 40,
            }}
          >
            이 격차는 <span style={{ color: "#ef4444" }}>매일매일</span> 더 벌어지고 있습니다
          </p>
        </div>
      )}

      {/* Phase 5: 직군별 위험 (45-55초) */}
      {frame >= phase5Start && frame < phase5End && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <h2
            style={{
              fontSize: 42,
              color: colors.white,
              marginBottom: 50,
              opacity: interpolate(
                frame,
                [phase5Start, phase5Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            AI를 모르면...
          </h2>
          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
            }}
          >
            {[
              { icon: "👨‍💻", role: "개발자", warning: "도태됩니다", delay: 0 },
              { icon: "📊", role: "기획자/디자이너", warning: "경쟁력 상실", delay: 30 },
              { icon: "👔", role: "직장인", warning: "업무 효율 뒤처짐", delay: 60 },
            ].map((item, idx) => {
              const cardScale = spring({
                frame: frame - phase5Start - item.delay,
                fps: FPS,
                config: { damping: 12, stiffness: 100 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${cardScale})`,
                    backgroundColor: "#7f1d1d",
                    padding: "30px 40px",
                    borderRadius: 20,
                    border: "2px solid #ef4444",
                    textAlign: "center",
                    minWidth: 220,
                  }}
                >
                  <div style={{ fontSize: 56, marginBottom: 15 }}>{item.icon}</div>
                  <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>
                    {item.role}
                  </div>
                  <div style={{ fontSize: 22, color: "#f87171" }}>
                    {item.warning}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Phase 6: AI는 필수 (55-67초) */}
      {frame >= phase6Start && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              transform: `scale(${spring({
                frame: frame - phase6Start,
                fps: FPS,
                config: { damping: 10, stiffness: 80 },
              })})`,
            }}
          >
            <div
              style={{
                backgroundColor: `${colors.gray[800]}ee`,
                padding: "60px 100px",
                borderRadius: 30,
                border: `4px solid ${colors.accent}`,
              }}
            >
              <div style={{ fontSize: 80, marginBottom: 30 }}>⚡</div>
              <h1
                style={{
                  fontSize: 64,
                  fontWeight: "bold",
                  color: colors.white,
                  marginBottom: 20,
                }}
              >
                AI는 더 이상
              </h1>
              <div style={{ display: "flex", gap: 40, justifyContent: "center", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: 48,
                    color: colors.gray[500],
                    textDecoration: "line-through",
                  }}
                >
                  선택
                </span>
                <span style={{ fontSize: 48, color: colors.gray[500] }}>→</span>
                <span
                  style={{
                    fontSize: 56,
                    color: colors.accent,
                    fontWeight: "bold",
                  }}
                >
                  필수
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
