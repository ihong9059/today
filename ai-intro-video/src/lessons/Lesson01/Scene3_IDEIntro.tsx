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

export const L01_Scene3_IDEIntro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 67초)
  // 0-12초: IDE 소개
  // 12-30초: VS Code 소개
  // 30-48초: PyCharm 소개
  // 48-67초: Jupyter Notebook 소개

  const phase1End = 12 * FPS;
  const phase2Start = 12 * FPS;
  const phase2End = 30 * FPS;
  const phase3Start = 30 * FPS;
  const phase3End = 48 * FPS;
  const phase4Start = 48 * FPS;

  const ideOptions = [
    {
      name: "VS Code",
      icon: "💻",
      color: "#007ACC",
      desc: "마이크로소프트",
      features: ["무료", "가볍고 빠름", "다양한 확장 지원"],
      recommendation: "초보자 ~ 전문가 모두 추천",
    },
    {
      name: "PyCharm",
      icon: "🔧",
      color: "#21D789",
      desc: "JetBrains",
      features: ["파이썬 전용", "강력한 기능", "Community 무료"],
      recommendation: "파이썬 전문 개발자 추천",
    },
    {
      name: "Jupyter",
      icon: "📓",
      color: "#F37626",
      desc: "대화형 노트북",
      features: ["웹 브라우저 실행", "셀 단위 실행", "결과 즉시 확인"],
      recommendation: "데이터 분석 & ML 실습 추천",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a1a2e 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        overflow: "hidden",
      }}
    >
      {/* 섹션 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <span style={{ fontSize: 36 }}>🛠️</span>
        <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
          Step 2: IDE 선택
        </span>
      </div>

      {/* Phase 1: IDE 소개 */}
      {frame < phase1End && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
              transform: `scale(${spring({
                frame,
                fps: FPS,
                config: { damping: 12, stiffness: 80 },
              })})`,
            }}
          >
            <h2
              style={{
                fontSize: 56,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 30,
              }}
            >
              IDE란?
            </h2>

            <p
              style={{
                fontSize: 32,
                color: colors.gray[300],
                marginBottom: 40,
              }}
            >
              <span style={{ color: colors.primary }}>통합 개발 환경</span>
              <br />
              (Integrated Development Environment)
            </p>

            <div
              style={{
                opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                display: "flex",
                gap: 40,
                justifyContent: "center",
              }}
            >
              {["코드 작성", "실행", "디버깅"].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: colors.gray[800],
                    padding: "15px 30px",
                    borderRadius: 12,
                    border: `2px solid ${colors.primary}`,
                  }}
                >
                  <span style={{ fontSize: 24, color: colors.white }}>{item}</span>
                </div>
              ))}
            </div>

            <p
              style={{
                opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                fontSize: 28,
                color: colors.gray[400],
                marginTop: 40,
              }}
            >
              한 곳에서 모든 작업을 수행!
            </p>
          </div>
        </div>
      )}

      {/* Phase 2-4: IDE 카드 표시 */}
      {frame >= phase1End && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1600 }}>
          <h2
            style={{
              opacity: interpolate(
                frame,
                [phase1End, phase1End + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 42,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 50,
            }}
          >
            세 가지 인기 IDE
          </h2>

          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {ideOptions.map((ide, idx) => {
              // 각 IDE 카드 활성화 시점
              const cardStartFrame =
                idx === 0 ? phase2Start :
                idx === 1 ? phase3Start :
                phase4Start;

              const cardOpacity = interpolate(
                frame,
                [cardStartFrame, cardStartFrame + 30],
                [0.3, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              const isActive =
                (idx === 0 && frame >= phase2Start && frame < phase3Start) ||
                (idx === 1 && frame >= phase3Start && frame < phase4Start) ||
                (idx === 2 && frame >= phase4Start);

              const cardScale = isActive ? 1.05 : 1;

              return (
                <div
                  key={idx}
                  style={{
                    opacity: idx === 0 || frame >= (idx === 1 ? phase2End : phase3End) - 10 * FPS ? cardOpacity : 0.3,
                    transform: `scale(${cardScale})`,
                    backgroundColor: colors.gray[800],
                    padding: "30px 40px",
                    borderRadius: 24,
                    border: `3px solid ${isActive ? ide.color : colors.gray[600]}`,
                    textAlign: "center",
                    flex: 1,
                    maxWidth: 400,
                    transition: "transform 0.3s",
                  }}
                >
                  <div style={{ fontSize: 64, marginBottom: 15 }}>{ide.icon}</div>
                  <h3
                    style={{
                      fontSize: 36,
                      fontWeight: "bold",
                      color: ide.color,
                      marginBottom: 10,
                    }}
                  >
                    {ide.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 20,
                      color: colors.gray[400],
                      marginBottom: 20,
                    }}
                  >
                    {ide.desc}
                  </p>

                  {/* 특징 리스트 */}
                  <div style={{ marginBottom: 20 }}>
                    {ide.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          opacity: isActive ? interpolate(
                            frame,
                            [cardStartFrame + 40 + fIdx * 20, cardStartFrame + 60 + fIdx * 20],
                            [0, 1],
                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                          ) : 0.5,
                          fontSize: 20,
                          color: colors.gray[200],
                          padding: "8px 0",
                        }}
                      >
                        ✓ {feature}
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      opacity: isActive ? 1 : 0.5,
                      backgroundColor: `${ide.color}30`,
                      padding: "10px 20px",
                      borderRadius: 20,
                      fontSize: 16,
                      color: ide.color,
                      fontWeight: "bold",
                    }}
                  >
                    {ide.recommendation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
