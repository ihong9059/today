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

export const Scene7_Outro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (초 단위) - Scene7: 27초
  // 0-15: AI 첫걸음 소개 (중학교 수학에서 GPT까지, 무료, 체계적)
  // 15-27: 좋아요, 구독, 알림, 댓글 부탁

  const phase1End = 15 * FPS;
  const phase2Start = 15 * FPS;

  const logoScale = spring({
    frame,
    fps: FPS,
    config: { damping: 12, stiffness: 80 },
  });

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
          background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 50%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Phase 1: 로고와 슬로건 (0-15초) */}
      {frame < phase1End && (
        <div
          style={{
            textAlign: "center",
            zIndex: 10,
            transform: `scale(${logoScale})`,
          }}
        >
          <div
            style={{
              opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ fontSize: 120, marginBottom: 30 }}>🎓</div>
            <h1
              style={{
                fontSize: 96,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 20,
                textShadow: `0 0 60px ${colors.primary}`,
              }}
            >
              AI 첫걸음
            </h1>
          </div>

          <p
            style={{
              opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              fontSize: 42,
              color: colors.primary,
              marginBottom: 40,
            }}
          >
            AI를 시작하는 가장 쉬운 방법
          </p>

          {/* 핵심 키워드 */}
          <div
            style={{
              opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              display: "flex",
              gap: 30,
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            {[
              { text: "중학교 수학", icon: "📐" },
              { text: "→", icon: "" },
              { text: "GPT 원리", icon: "🤖" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {item.icon && <span style={{ fontSize: 36 }}>{item.icon}</span>}
                <span
                  style={{
                    fontSize: item.icon ? 32 : 36,
                    color: item.icon ? colors.white : colors.gray[500],
                    fontWeight: item.icon ? "bold" : "normal",
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* 무료, 체계적 태그 */}
          <div
            style={{
              opacity: interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              display: "flex",
              gap: 20,
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            {[
              { text: "무료", color: "#22c55e" },
              { text: "체계적", color: colors.secondary },
            ].map((tag, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: tag.color,
                  padding: "12px 30px",
                  borderRadius: 30,
                  fontSize: 24,
                  fontWeight: "bold",
                  color: colors.white,
                }}
              >
                {tag.text}
              </div>
            ))}
          </div>

          <p
            style={{
              opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              fontSize: 36,
              color: colors.accent,
              marginTop: 50,
              fontWeight: "bold",
            }}
          >
            지금 바로 시작하세요
          </p>
        </div>
      )}

      {/* Phase 2: 구독/좋아요 안내 (15-27초) */}
      {frame >= phase2Start && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase2Start, phase2Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              marginBottom: 50,
            }}
          >
            <p
              style={{
                fontSize: 36,
                color: colors.gray[300],
                marginBottom: 20,
              }}
            >
              영상이 도움이 되셨다면
            </p>
          </div>

          {/* 액션 버튼들 */}
          <div
            style={{
              display: "flex",
              gap: 50,
              justifyContent: "center",
            }}
          >
            {[
              { icon: "👍", text: "좋아요", delay: 0 },
              { icon: "🔔", text: "구독", delay: 20 },
              { icon: "🔔", text: "알림 설정", delay: 40 },
              { icon: "💬", text: "댓글", delay: 60 },
            ].map((action, idx) => {
              const actionScale = spring({
                frame: frame - phase2Start - action.delay,
                fps: FPS,
                config: { damping: 12, stiffness: 100 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${actionScale})`,
                    backgroundColor: colors.gray[800],
                    padding: "30px 40px",
                    borderRadius: 20,
                    border: `2px solid ${colors.primary}`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 56, marginBottom: 15 }}>{action.icon}</div>
                  <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>
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
                [phase2Start + 120, phase2Start + 150],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 32,
              color: colors.gray[400],
              marginTop: 60,
            }}
          >
            궁금한 점은 댓글로 남겨주세요
          </p>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase2Start + 180, phase2Start + 210],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 42,
              color: colors.primary,
              marginTop: 30,
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
