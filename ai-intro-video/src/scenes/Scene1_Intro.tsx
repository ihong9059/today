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

export const Scene1_Intro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (초 단위)
  // 0-3: "안녕하세요, AI 첫걸음에 오신 것을 진심으로 환영합니다."
  // 3-10: "혹시 이런 고민 해보신 적 있으신가요? ChatGPT, GPT-4, 클로드, 제미나이..."
  // 10-18: "매일 새로운 AI가 쏟아지는데, 나만 이 흐름을 모르고 있는 것 같은 불안감."
  // 18-26: "회사에서도, 뉴스에서도 AI 이야기뿐인데, 도대체 이게 어떻게 작동하는 건지..."
  // 26-32: "오늘 이 영상 하나로 그 고민을 완전히 해결해 드리겠습니다."
  // 32-40: "중학교 수학만 알면 시작할 수 있고, 끝까지 따라오시면 실제로 작동하는 AI를 직접 만들 수 있습니다."
  // 40-53: "총 10개 레벨, 58개 레슨, 50시간 이상의 체계적인 커리큘럼을 지금부터 상세히 소개해 드릴게요."

  // 환영 메시지 (0-3초)
  const welcomeOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // AI 서비스 로고들 (3-10초)
  const aiLogos = ["ChatGPT", "GPT-4", "Claude", "Gemini"];
  const logoStartFrame = 3 * FPS;

  // 불안감 키워드 (10-18초)
  const anxietyStartFrame = 10 * FPS;
  const anxietyOpacity = interpolate(
    frame,
    [anxietyStartFrame, anxietyStartFrame + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 질문들 (18-26초)
  const questionsStartFrame = 18 * FPS;

  // 해결 메시지 (26-32초)
  const solutionStartFrame = 26 * FPS;
  const solutionScale = spring({
    frame: frame - solutionStartFrame,
    fps: FPS,
    config: { damping: 12, stiffness: 100 },
  });

  // 핵심 수치 (32-40초)
  const statsStartFrame = 32 * FPS;

  // 커리큘럼 미리보기 (40-53초)
  const curriculumStartFrame = 40 * FPS;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e1b4b 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* 배경 그라데이션 원 */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Phase 1: 환영 메시지 (0-3초) */}
      {frame < 3 * FPS && (
        <div
          style={{
            opacity: welcomeOpacity,
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 20 }}>🎓</div>
          <h1
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 20,
            }}
          >
            AI 첫걸음
          </h1>
          <p style={{ fontSize: 32, color: colors.primary }}>
            에 오신 것을 환영합니다
          </p>
        </div>
      )}

      {/* Phase 2: AI 서비스들 (3-10초) */}
      {frame >= 3 * FPS && frame < 10 * FPS && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <p
            style={{
              fontSize: 36,
              color: colors.gray[300],
              marginBottom: 40,
            }}
          >
            혹시 이런 고민 해보신 적 있으신가요?
          </p>
          <div
            style={{
              display: "flex",
              gap: 30,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {aiLogos.map((logo, idx) => {
              const logoDelay = idx * 15;
              const logoScale = spring({
                frame: frame - logoStartFrame - logoDelay,
                fps: FPS,
                config: { damping: 12, stiffness: 100 },
              });
              return (
                <div
                  key={logo}
                  style={{
                    transform: `scale(${logoScale})`,
                    backgroundColor: colors.gray[800],
                    padding: "20px 40px",
                    borderRadius: 16,
                    border: `2px solid ${colors.primary}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: "bold",
                      color: colors.white,
                    }}
                  >
                    {logo}
                  </span>
                </div>
              );
            })}
          </div>
          <p
            style={{
              fontSize: 28,
              color: colors.gray[400],
              marginTop: 40,
            }}
          >
            매일 새로운 AI가 쏟아지는데...
          </p>
        </div>
      )}

      {/* Phase 3: 불안감 (10-18초) */}
      {frame >= 10 * FPS && frame < 18 * FPS && (
        <div
          style={{
            opacity: anxietyOpacity,
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 120,
              marginBottom: 30,
              filter: "grayscale(50%)",
            }}
          >
            😰
          </div>
          <h2
            style={{
              fontSize: 56,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 20,
              lineHeight: 1.4,
            }}
          >
            나만 뒤처지는 것 같은
            <br />
            <span style={{ color: "#ef4444" }}>불안감</span>
          </h2>
          <p
            style={{
              fontSize: 28,
              color: colors.gray[400],
              marginTop: 30,
            }}
          >
            도대체 어디서부터 시작해야 할지 막막하셨죠?
          </p>
        </div>
      )}

      {/* Phase 4: 질문들 (18-26초) */}
      {frame >= 18 * FPS && frame < 26 * FPS && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            {[
              { icon: "🏢", text: "회사에서도 AI 이야기뿐..." },
              { icon: "📺", text: "뉴스에서도 AI 이야기뿐..." },
              { icon: "❓", text: "도대체 이게 어떻게 작동하는 건지?" },
            ].map((item, idx) => {
              const itemDelay = idx * 20;
              const itemOpacity = interpolate(
                frame,
                [questionsStartFrame + itemDelay, questionsStartFrame + itemDelay + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const itemX = interpolate(
                frame,
                [questionsStartFrame + itemDelay, questionsStartFrame + itemDelay + 20],
                [-50, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={idx}
                  style={{
                    opacity: itemOpacity,
                    transform: `translateX(${itemX}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    backgroundColor: colors.gray[800] + "80",
                    padding: "20px 40px",
                    borderRadius: 16,
                  }}
                >
                  <span style={{ fontSize: 48 }}>{item.icon}</span>
                  <span
                    style={{
                      fontSize: 32,
                      color: colors.gray[200],
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Phase 5: 해결책 제시 (26-32초) */}
      {frame >= 26 * FPS && frame < 32 * FPS && (
        <div
          style={{
            transform: `scale(${solutionScale})`,
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 100,
              marginBottom: 30,
            }}
          >
            💡
          </div>
          <h2
            style={{
              fontSize: 56,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 20,
            }}
          >
            오늘 이 영상 하나로
          </h2>
          <p
            style={{
              fontSize: 48,
              color: colors.accent,
              fontWeight: "bold",
            }}
          >
            그 고민을 완전히 해결해 드리겠습니다
          </p>
        </div>
      )}

      {/* Phase 6: 핵심 약속 (32-40초) */}
      {frame >= 32 * FPS && frame < 40 * FPS && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              display: "flex",
              gap: 60,
              justifyContent: "center",
              marginBottom: 50,
            }}
          >
            {[
              { icon: "📐", text: "중학교 수학만 알면", sub: "시작 가능" },
              { icon: "🚀", text: "끝까지 따라오시면", sub: "AI 직접 제작" },
            ].map((item, idx) => {
              const cardDelay = idx * 30;
              const cardScale = spring({
                frame: frame - statsStartFrame - cardDelay,
                fps: FPS,
                config: { damping: 12, stiffness: 80 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${cardScale})`,
                    backgroundColor: colors.gray[800],
                    padding: "40px 50px",
                    borderRadius: 24,
                    border: `2px solid ${colors.primary}40`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 64, marginBottom: 16 }}>{item.icon}</div>
                  <p
                    style={{
                      fontSize: 28,
                      color: colors.gray[300],
                      marginBottom: 8,
                    }}
                  >
                    {item.text}
                  </p>
                  <p
                    style={{
                      fontSize: 36,
                      fontWeight: "bold",
                      color: colors.primary,
                    }}
                  >
                    {item.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Phase 7: 커리큘럼 미리보기 (40-53초) */}
      {frame >= 40 * FPS && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <h2
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 50,
            }}
          >
            체계적인 커리큘럼
          </h2>
          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            {[
              { number: "10", label: "레벨", color: colors.primary },
              { number: "58", label: "레슨", color: colors.secondary },
              { number: "50+", label: "학습 시간", color: colors.accent },
            ].map((stat, idx) => {
              const statDelay = idx * 15;
              const statScale = spring({
                frame: frame - curriculumStartFrame - statDelay,
                fps: FPS,
                config: { damping: 12, stiffness: 100 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${statScale})`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 72,
                      fontWeight: "bold",
                      color: stat.color,
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      color: colors.gray[400],
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
              fontSize: 32,
              color: colors.gray[300],
            }}
          >
            지금부터 상세히 소개해 드릴게요
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
