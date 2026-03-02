import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L01_Scene7_Outro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 73초 - AI 조언 추가)
  // 0-10초: 오늘 배운 내용 정리
  // 10-40초: AI 도구 활용 조언 (추가!)
  // 40-55초: 다음 레슨 안내
  // 55-73초: 구독/좋아요 부탁

  const phase1End = 10 * FPS;
  const phase2Start = 10 * FPS;  // AI 조언
  const phase2End = 40 * FPS;
  const phase3Start = 40 * FPS; // 다음 레슨
  const phase3End = 55 * FPS;
  const phase4Start = 55 * FPS; // 구독/좋아요

  const summary = [
    { icon: "🐍", text: "Python 설치" },
    { icon: "💻", text: "VS Code 설정" },
    { icon: "📓", text: "Jupyter Notebook" },
    { icon: "📦", text: "가상환경" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #0f172a 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* 배경 그라데이션 */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.level[0]}15 0%, transparent 50%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Phase 1: 오늘 배운 내용 정리 */}
      {frame < phase1End && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <h2
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 50,
              }}
            >
              ✅ 오늘 배운 내용
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              gap: 30,
              justifyContent: "center",
            }}
          >
            {summary.map((item, idx) => {
              const itemScale = spring({
                frame: frame - 30 - idx * 15,
                fps: FPS,
                config: { damping: 12, stiffness: 100 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${itemScale})`,
                    backgroundColor: colors.gray[800],
                    padding: "25px 35px",
                    borderRadius: 20,
                    border: `2px solid ${colors.level[0]}`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 15 }}>{item.icon}</div>
                  <div style={{ fontSize: 22, color: colors.white, fontWeight: "bold" }}>
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>

          <p
            style={{
              opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              fontSize: 32,
              color: "#22c55e",
              marginTop: 50,
              fontWeight: "bold",
            }}
          >
            🎉 AI 학습 준비 완료!
          </p>
        </div>
      )}

      {/* Phase 2: AI 도구 활용 조언 (NEW!) */}
      {frame >= phase2Start && frame < phase2End && (
        <div
          style={{
            textAlign: "center",
            zIndex: 10,
            maxWidth: 1200,
            padding: "0 40px",
          }}
        >
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
            <h2
              style={{
                fontSize: 44,
                fontWeight: "bold",
                color: "#fbbf24",
                marginBottom: 30,
              }}
            >
              ⚠️ 중요한 조언
            </h2>
            <p
              style={{
                fontSize: 28,
                color: colors.white,
                lineHeight: 1.6,
                marginBottom: 30,
              }}
            >
              설치 중 에러가 발생하면?
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 25,
              justifyContent: "center",
              opacity: interpolate(
                frame,
                [phase2Start + 40, phase2Start + 60],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            {[
              { icon: "🤖", name: "ChatGPT" },
              { icon: "💎", name: "Gemini" },
              { icon: "🧠", name: "Claude" },
            ].map((ai, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: colors.gray[800],
                  padding: "20px 30px",
                  borderRadius: 16,
                  border: `2px solid #fbbf24`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 10 }}>{ai.icon}</div>
                <div style={{ fontSize: 20, color: colors.white, fontWeight: "bold" }}>
                  {ai.name}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              opacity: interpolate(
                frame,
                [phase2Start + 100, phase2Start + 130],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              marginTop: 40,
            }}
          >
            <p
              style={{
                fontSize: 26,
                color: "#a78bfa",
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              "환경 설정은 AI 학습의 첫 번째 고비"
            </p>
            <p
              style={{
                fontSize: 22,
                color: colors.gray[300],
              }}
            >
              문제 해결 능력 = AI 개발 능력
            </p>
          </div>
        </div>
      )}

      {/* Phase 3: 다음 레슨 안내 */}
      {frame >= phase3Start && frame < phase3End && (
        <div
          style={{
            textAlign: "center",
            zIndex: 10,
            transform: `scale(${spring({
              frame: frame - phase3Start,
              fps: FPS,
              config: { damping: 12, stiffness: 80 },
            })})`,
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 30 }}>📚</div>
          <h2
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 20,
            }}
          >
            다음 레슨
          </h2>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "30px 60px",
              borderRadius: 20,
              border: `3px solid ${colors.primary}`,
            }}
          >
            <span
              style={{
                fontSize: 36,
                color: colors.primary,
                fontWeight: "bold",
              }}
            >
              파이썬 기초 문법
            </span>
          </div>
        </div>
      )}

      {/* Phase 4: 구독/좋아요 */}
      {frame >= phase4Start && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase4Start, phase4Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              marginBottom: 40,
            }}
          >
            <p
              style={{
                fontSize: 32,
                color: colors.gray[300],
              }}
            >
              영상이 도움이 되셨다면
            </p>
          </div>

          {/* 액션 버튼들 */}
          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
            }}
          >
            {[
              { icon: "👍", text: "좋아요", delay: 20 },
              { icon: "🔔", text: "구독", delay: 40 },
              { icon: "💬", text: "댓글", delay: 60 },
            ].map((action, idx) => {
              const actionScale = spring({
                frame: frame - phase4Start - action.delay,
                fps: FPS,
                config: { damping: 12, stiffness: 100 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${actionScale})`,
                    backgroundColor: colors.gray[800],
                    padding: "25px 35px",
                    borderRadius: 20,
                    border: `2px solid ${colors.primary}`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 10 }}>{action.icon}</div>
                  <div style={{ fontSize: 22, color: colors.white, fontWeight: "bold" }}>
                    {action.text}
                  </div>
                </div>
              );
            })}
          </div>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase4Start + 100, phase4Start + 130],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 36,
              color: colors.primary,
              marginTop: 50,
              fontWeight: "bold",
            }}
          >
            감사합니다 🙏
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
