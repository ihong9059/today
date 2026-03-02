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

export const L02_Scene7_Outro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 60초)
  // 0-15초: 오늘 배운 내용 정리
  // 15-35초: 외우지 말고 이해하자
  // 35-50초: AI에게 물어보세요
  // 50-60초: 구독/좋아요

  const phase1End = 15 * FPS;
  const phase2Start = 15 * FPS;
  const phase2End = 35 * FPS;
  const phase3Start = 35 * FPS;
  const phase3End = 50 * FPS;
  const phase4Start = 50 * FPS;

  const summary = [
    { icon: "🔢", text: "int / float" },
    { icon: "📝", text: "str / bool" },
    { icon: "📋", text: "list" },
    { icon: "🗂️", text: "dict" },
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
              오늘 배운 자료형
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
                  <div style={{ fontSize: 20, color: colors.white, fontWeight: "bold", fontFamily: "monospace" }}>
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Phase 2: 외우지 말고 이해하자 */}
      {frame >= phase2Start && frame < phase2End && (
        <div
          style={{
            textAlign: "center",
            zIndex: 10,
            maxWidth: 1000,
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
                fontSize: 56,
                fontWeight: "bold",
                color: "#fbbf24",
                marginBottom: 40,
              }}
            >
              외우지 마세요!
            </h2>
          </div>

          <div
            style={{
              opacity: interpolate(
                frame,
                [phase2Start + 40, phase2Start + 70],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              display: "flex",
              flexDirection: "column",
              gap: 25,
            }}
          >
            {[
              { text: "리스트 = 벡터", color: "#60a5fa" },
              { text: "리스트 안의 리스트 = 행렬", color: "#a78bfa" },
              { text: "딕셔너리 = 설정값 저장", color: "#34d399" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  opacity: interpolate(
                    frame,
                    [phase2Start + 80 + idx * 30, phase2Start + 100 + idx * 30],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  backgroundColor: colors.gray[800],
                  padding: "20px 40px",
                  borderRadius: 16,
                  border: `2px solid ${item.color}`,
                }}
              >
                <span style={{ fontSize: 28, color: item.color, fontWeight: "bold" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase2Start + 200, phase2Start + 230],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 32,
              color: colors.white,
              marginTop: 40,
            }}
          >
            개념만 이해하면 됩니다!
          </p>
        </div>
      )}

      {/* Phase 3: AI에게 물어보세요 */}
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
          <h2
            style={{
              fontSize: 44,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 30,
            }}
          >
            문법이 헷갈리면?
          </h2>

          <div
            style={{
              display: "flex",
              gap: 25,
              justifyContent: "center",
              marginBottom: 30,
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
                  opacity: interpolate(
                    frame,
                    [phase3Start + 30 + idx * 20, phase3Start + 50 + idx * 20],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  backgroundColor: colors.gray[800],
                  padding: "20px 30px",
                  borderRadius: 16,
                  border: `2px solid ${colors.primary}`,
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
                [phase3Start + 100, phase3Start + 130],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              backgroundColor: colors.gray[800],
              padding: "20px 40px",
              borderRadius: 12,
              display: "inline-block",
            }}
          >
            <span style={{ fontSize: 24, color: "#fbbf24", fontFamily: "monospace" }}>
              "파이썬 리스트 사용법 알려줘"
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
              marginBottom: 30,
            }}
          >
            <div style={{ fontSize: 80, marginBottom: 20 }}>📚</div>
            <p
              style={{
                fontSize: 28,
                color: colors.gray[300],
              }}
            >
              다음 레슨: <span style={{ color: colors.primary, fontWeight: "bold" }}>조건문과 반복문</span>
            </p>
          </div>

          {/* 액션 버튼들 */}
          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            {[
              { icon: "👍", text: "좋아요", delay: 30 },
              { icon: "🔔", text: "구독", delay: 50 },
              { icon: "💬", text: "댓글", delay: 70 },
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
                    padding: "20px 30px",
                    borderRadius: 20,
                    border: `2px solid ${colors.primary}`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 8 }}>{action.icon}</div>
                  <div style={{ fontSize: 18, color: colors.white, fontWeight: "bold" }}>
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
                [phase4Start + 120, phase4Start + 150],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 36,
              color: colors.primary,
              marginTop: 40,
              fontWeight: "bold",
            }}
          >
            감사합니다!
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
