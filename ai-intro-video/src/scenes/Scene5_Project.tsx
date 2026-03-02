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

export const Scene5_Project: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (초 단위) - Scene5: 68초
  // 0-15: 번호판 인식 시스템 소개
  // 15-35: 프로젝트 단계 전반 (요구사항, 데이터, YOLO)
  // 35-50: 프로젝트 단계 후반 (OCR, 파이프라인, 경량화)
  // 50-68: 배포와 포트폴리오 완성

  const phase1End = 15 * FPS;
  const phase2Start = 15 * FPS;
  const phase2End = 35 * FPS;
  const phase3Start = 35 * FPS;
  const phase3End = 50 * FPS;
  const phase4Start = 50 * FPS;

  // 프로젝트 단계 데이터
  const projectSteps = [
    { num: 1, icon: "📋", title: "요구사항 분석", desc: "시스템 설계", phase: 2, delay: 0 },
    { num: 2, icon: "📸", title: "데이터 수집", desc: "라벨링", phase: 2, delay: 30 },
    { num: 3, icon: "🔍", title: "YOLO 검출", desc: "번호판 영역", phase: 2, delay: 60 },
    { num: 4, icon: "📝", title: "CNN OCR", desc: "문자 인식", phase: 3, delay: 0 },
    { num: 5, icon: "🔗", title: "파이프라인", desc: "연결 구축", phase: 3, delay: 30 },
    { num: 6, icon: "⚡", title: "모델 경량화", desc: "속도 최적화", phase: 3, delay: 60 },
    { num: 7, icon: "🌐", title: "웹 API", desc: "Flask/FastAPI", phase: 4, delay: 0 },
    { num: 8, icon: "📄", title: "문서화", desc: "발표 준비", phase: 4, delay: 30 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a1a3e 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        overflow: "hidden",
      }}
    >
      {/* 배경 장식 */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.level[9]}20 0%, transparent 60%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Phase 1: 프로젝트 소개 (0-15초) */}
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
            <div style={{ fontSize: 100, marginBottom: 30 }}>🚗</div>
            <h1
              style={{
                fontSize: 60,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 20,
              }}
            >
              최종 프로젝트
            </h1>
            <h2
              style={{
                fontSize: 52,
                fontWeight: "bold",
                color: colors.level[9],
                marginBottom: 30,
              }}
            >
              번호판 인식 시스템
            </h2>
          </div>

          <div
            style={{
              opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              display: "flex",
              gap: 40,
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            {[
              { icon: "🅿️", text: "주차장 관리" },
              { icon: "📷", text: "과속 단속 카메라" },
              { icon: "🏢", text: "빌딩 출입 관리" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: colors.gray[800],
                  padding: "20px 30px",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <span style={{ fontSize: 36 }}>{item.icon}</span>
                <span style={{ fontSize: 24, color: colors.gray[200] }}>{item.text}</span>
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
            실제 현장에서 사용되는 기술을 직접 구현합니다
          </p>
        </div>
      )}

      {/* Phase 2: 프로젝트 단계 전반 (15-35초) */}
      {frame >= phase2Start && frame < phase2End && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1400 }}>
          <h2
            style={{
              opacity: interpolate(
                frame,
                [phase2Start, phase2Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 42,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 50,
            }}
          >
            📋 프로젝트 진행 단계 (1/2)
          </h2>

          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
            }}
          >
            {projectSteps.filter(s => s.phase === 2).map((step, idx) => {
              const stepScale = spring({
                frame: frame - phase2Start - step.delay,
                fps: FPS,
                config: { damping: 12, stiffness: 100 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${stepScale})`,
                    backgroundColor: colors.gray[800],
                    padding: "40px 50px",
                    borderRadius: 24,
                    border: `3px solid ${colors.level[9]}`,
                    textAlign: "center",
                    minWidth: 200,
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: colors.level[9],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      fontWeight: "bold",
                      color: colors.white,
                      margin: "0 auto 20px",
                    }}
                  >
                    {step.num}
                  </div>
                  <div style={{ fontSize: 48, marginBottom: 15 }}>{step.icon}</div>
                  <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: 20, color: colors.gray[400], marginTop: 10 }}>
                    {step.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Phase 3: 프로젝트 단계 후반 (35-50초) */}
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
            📋 프로젝트 진행 단계 (2/2)
          </h2>

          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
            }}
          >
            {projectSteps.filter(s => s.phase === 3).map((step, idx) => {
              const stepScale = spring({
                frame: frame - phase3Start - step.delay,
                fps: FPS,
                config: { damping: 12, stiffness: 100 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    transform: `scale(${stepScale})`,
                    backgroundColor: colors.gray[800],
                    padding: "40px 50px",
                    borderRadius: 24,
                    border: `3px solid ${colors.level[9]}`,
                    textAlign: "center",
                    minWidth: 200,
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: colors.level[9],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      fontWeight: "bold",
                      color: colors.white,
                      margin: "0 auto 20px",
                    }}
                  >
                    {step.num}
                  </div>
                  <div style={{ fontSize: 48, marginBottom: 15 }}>{step.icon}</div>
                  <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: 20, color: colors.gray[400], marginTop: 10 }}>
                    {step.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Phase 4: 포트폴리오 완성 (50-68초) */}
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
            {/* 배포 단계 표시 */}
            <div
              style={{
                display: "flex",
                gap: 30,
                justifyContent: "center",
                marginBottom: 50,
              }}
            >
              {projectSteps.filter(s => s.phase === 4).map((step, idx) => {
                const stepOpacity = interpolate(
                  frame,
                  [phase4Start + step.delay, phase4Start + step.delay + 20],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                return (
                  <div
                    key={idx}
                    style={{
                      opacity: stepOpacity,
                      backgroundColor: colors.gray[800],
                      padding: "25px 35px",
                      borderRadius: 16,
                      border: `2px solid ${colors.level[9]}`,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 40 }}>{step.icon}</div>
                    <div style={{ fontSize: 22, color: colors.white, marginTop: 10 }}>
                      {step.title}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 포트폴리오 완성 메시지 */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase4Start + 80, phase4Start + 110],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: `${colors.gray[800]}ee`,
                padding: "50px 80px",
                borderRadius: 30,
                border: `4px solid ${colors.primary}`,
              }}
            >
              <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
              <h1
                style={{
                  fontSize: 52,
                  fontWeight: "bold",
                  color: colors.white,
                  marginBottom: 15,
                }}
              >
                프로젝트 완성!
              </h1>
              <p
                style={{
                  fontSize: 32,
                  color: colors.primary,
                  marginBottom: 30,
                }}
              >
                이력서에 당당하게 쓸 수 있는
              </p>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: "bold",
                  color: colors.accent,
                }}
              >
                AI 포트폴리오 완성
              </div>
            </div>

            <p
              style={{
                opacity: interpolate(
                  frame,
                  [phase4Start + 140, phase4Start + 170],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                fontSize: 28,
                color: colors.gray[300],
                marginTop: 40,
              }}
            >
              "직접 만든 AI 프로젝트가 있나요?" → <span style={{ color: colors.primary }}>자신 있게 대답!</span>
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
