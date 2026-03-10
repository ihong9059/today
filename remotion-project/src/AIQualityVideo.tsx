import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

// ============ SCENE TIMINGS (30fps 기준) ============
export const SCENE_TIMINGS = {
  scene01_opening: { duration: 988, start: 0 },
  scene02_process: { duration: 1648, start: 988 },
  scene03_quality: { duration: 1596, start: 2636 },
  scene04_human: { duration: 2154, start: 4232 },
  scene05_question: { duration: 607, start: 6386 },
  scene06_ai_target: { duration: 2543, start: 6993 },
  scene07_ai_process: { duration: 2706, start: 9536 },
  scene08_production: { duration: 2148, start: 12242 },
  scene09_summary: { duration: 2865, start: 14390 },
  scene10_closing: { duration: 1446, start: 17255 },
};

export const AI_QUALITY_VIDEO_DURATION = 18701;

// ============ COLORS ============
const colors = {
  bg: {
    dark: "#0f172a",
  },
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  accent: "#f59e0b",
  success: "#10b981",
  danger: "#ef4444",
  white: "#ffffff",
  gray: {
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  } as { [key: number]: string },
  industrial: {
    orange: "#ea580c",
    blue: "#0284c7",
    green: "#059669",
    red: "#dc2626",
    yellow: "#d97706",
  },
};

// ============ HELPER FUNCTIONS ============
const fadeIn = (frame: number, start: number = 0, duration: number = 30) =>
  interpolate(frame, [start, start + duration], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const slideUp = (frame: number, start: number = 0, duration: number = 30, distance: number = 50) =>
  interpolate(frame, [start, start + duration], [distance, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const scaleIn = (frame: number, fps: number, delay: number = 0) =>
  Math.min(spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 100 } }), 1);

// ============ BACKGROUND COMPONENTS ============
const AnimatedBackground: React.FC<{ color1?: string; color2?: string; color3?: string }> = ({
  color1 = "#0f172a",
  color2 = "#1e3a8a",
  color3 = "#0f172a"
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`,
        }}
      />
      {[0, 1, 2].map((i) => {
        const x = 400 + Math.sin((frame + i * 100) / 80) * 300;
        const y = 300 + Math.cos((frame + i * 100) / 60) * 200;
        const size = 400 + i * 100;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Particles: React.FC<{ count?: number; color?: string }> = ({ count = 20, color = colors.white }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = (i * 137.5) % 1920;
        const baseY = (i * 73.7) % 1080;
        const speed = 0.3 + (i % 5) * 0.2;
        const size = 2 + (i % 4) * 2;

        const x = baseX + Math.sin((frame * speed + i * 50) / 40) * 30;
        const y = (baseY + frame * speed * 0.3) % 1200 - 60;
        const opacity = 0.08 + Math.sin((frame + i * 20) / 30) * 0.08;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity,
            }}
          />
        );
      })}
    </>
  );
};

// ============ GLOBAL OVERLAY ============
const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOpacity = fadeIn(frame, 0, 30);

  return (
    <>
      {/* 왼쪽 상단 UTTEC-Lab 로고 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          zIndex: 1000,
          opacity: logoOpacity,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${colors.industrial.blue} 0%, ${colors.primary} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 15px ${colors.primary}60`,
          }}
        >
          <span style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>U</span>
        </div>
        <span
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: colors.white,
            textShadow: `0 2px 10px rgba(0,0,0,0.5)`,
            letterSpacing: 1,
          }}
        >
          UTTEC-Lab
        </span>
      </div>
      {/* 오른쪽 상단 한국기계엔지니어링 로고 */}
      <div
        style={{
          position: "absolute",
          top: 25,
          right: 40,
          zIndex: 1000,
          opacity: logoOpacity,
        }}
      >
        <img
          src={staticFile("images/topcrusher-logo.png")}
          alt="한국기계엔지니어링"
          style={{
            height: 60,
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
          }}
        />
      </div>
    </>
  );
};

// ============ UI COMPONENTS ============
const GlowText: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
  glowColor?: string;
}> = ({ children, fontSize = 72, color = colors.white, glowColor = colors.primary }) => (
  <span
    style={{
      fontSize,
      fontWeight: "bold",
      color,
      textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}60`,
    }}
  >
    {children}
  </span>
);

const Card: React.FC<{
  children: React.ReactNode;
  width?: number;
  borderColor?: string;
  glow?: boolean;
  style?: React.CSSProperties;
}> = ({ children, width = 400, borderColor = colors.primary, glow = true, style = {} }) => (
  <div
    style={{
      width,
      padding: 30,
      backgroundColor: `${colors.gray[900]}ee`,
      borderRadius: 24,
      border: `3px solid ${borderColor}`,
      boxShadow: glow ? `0 0 40px ${borderColor}40, 0 20px 60px rgba(0,0,0,0.5)` : "0 20px 60px rgba(0,0,0,0.5)",
      backdropFilter: "blur(10px)",
      ...style,
    }}
  >
    {children}
  </div>
);

// ============ SCENE 1: OPENING ============
const Scene01Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality/scene01_opening.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#1e40af" color3="#0f172a" />
      <Particles count={30} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 20, 40),
          transform: `translateY(${slideUp(frame, 20, 40)}px)`,
        }}
      >
        <div style={{ marginBottom: 30 }}>
          <GlowText fontSize={80} glowColor={colors.industrial.blue}>AI 품질 관리 시스템</GlowText>
        </div>
        <div>
          <span style={{ fontSize: 48, color: colors.gray[300] }}>
            폐배터리 재활용 공정의 혁신
          </span>
        </div>
      </div>

      {/* AI의 한계 강조 */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: fadeIn(frame, 150, 40),
        }}
      >
        <Card width={500} borderColor={colors.danger}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 15 }}>
              <span style={{ color: colors.danger }}>X</span>
            </div>
            <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>
              AI가 할 수 없는 것
            </div>
            <div style={{ fontSize: 24, color: colors.gray[300] }}>
              실시간 화학 성분 분석
            </div>
          </div>
        </Card>

        <Card width={500} borderColor={colors.success}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 15 }}>
              <span style={{ color: colors.success }}>O</span>
            </div>
            <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>
              AI가 할 수 있는 것
            </div>
            <div style={{ fontSize: 24, color: colors.gray[300] }}>
              물리적 크기(입도) 실시간 관리
            </div>
          </div>
        </Card>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            backgroundColor: `${colors.gray[800]}dd`,
            borderRadius: 20,
            border: `2px solid ${colors.accent}`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white }}>
            사람이 '무엇이 좋은지'를 정의하고, AI가 '유지'합니다
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: PROCESS ============
const Scene02Process: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const processes = [
    { name: "1차 파쇄", icon: "🔨", desc: "모듈 해체\n대형 파편" },
    { name: "2차 파분쇄", icon: "⚙️", desc: "조 크러셔\n콘 크러셔" },
    { name: "박리", icon: "🌀", desc: "충격 분리\n집전체/활물질" },
    { name: "블랙매스", icon: "⚫", desc: "최종 분말\n리튬/코발트/니켈" },
  ];

  const activeStep = Math.min(Math.floor(frame / 300), 3);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality/scene02_process.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#4338ca" color3="#0f172a" />
      <Particles count={25} color={colors.industrial.orange} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={64} glowColor={colors.industrial.orange}>폐배터리 재활용 공정</GlowText>
      </div>

      {/* 공정 다이어그램 */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        {processes.map((proc, i) => {
          const delay = 60 + i * 150;
          const opacity = fadeIn(frame, delay, 30);
          const isActive = i <= activeStep;
          const isCurrent = i === activeStep;

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  opacity,
                  transform: `scale(${scaleIn(frame, fps, delay)})`,
                }}
              >
                <Card
                  width={280}
                  borderColor={isActive ? colors.industrial.orange : colors.gray[700]}
                  style={{
                    backgroundColor: isCurrent ? `${colors.industrial.orange}20` : `${colors.gray[900]}ee`,
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 56, marginBottom: 15 }}>{proc.icon}</div>
                    <div
                      style={{
                        fontSize: 28,
                        color: isActive ? colors.white : colors.gray[500],
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      {proc.name}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        color: isActive ? colors.gray[300] : colors.gray[600],
                        whiteSpace: "pre-line",
                        lineHeight: 1.5,
                      }}
                    >
                      {proc.desc}
                    </div>
                  </div>
                </Card>
              </div>

              {i < processes.length - 1 && (
                <div
                  style={{
                    fontSize: 48,
                    color: i < activeStep ? colors.industrial.orange : colors.gray[600],
                    opacity: fadeIn(frame, delay + 100, 30),
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 품질 영향 요소 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 800, 40),
        }}
      >
        <Card width={1000} borderColor={colors.primary} style={{ display: "inline-block" }}>
          <div style={{ fontSize: 28, color: colors.white, marginBottom: 15, fontWeight: "bold" }}>
            품질에 영향을 미치는 요소
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {["칼날 각도", "회전 속도", "투입 속도", "온도", "습도", "압력"].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 24px",
                  backgroundColor: colors.gray[800],
                  borderRadius: 12,
                  border: `2px solid ${colors.primary}`,
                }}
              >
                <span style={{ fontSize: 20, color: colors.gray[100] }}>{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: QUALITY ============
const Scene03Quality: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality/scene03_quality.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#7c3aed" color3="#0f172a" />
      <Particles count={20} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={64} glowColor={colors.secondary}>품질이란 무엇인가?</GlowText>
      </div>

      {/* 좋은 품질 정의 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: 100,
          opacity: fadeIn(frame, 60, 40),
          transform: `translateX(${interpolate(frame, [60, 100], [-100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px)`,
        }}
      >
        <Card width={800} borderColor={colors.success}>
          <div style={{ fontSize: 36, color: colors.success, fontWeight: "bold", marginBottom: 20 }}>
            좋은 품질 = 높은 회수율
          </div>
          <div style={{ fontSize: 28, color: colors.gray[100], lineHeight: 1.8 }}>
            리튬, 코발트, 니켈, 망간을<br />
            <span style={{ color: colors.accent, fontWeight: "bold" }}>얼마나 효율적으로 추출했는가?</span>
          </div>
        </Card>
      </div>

      {/* ICP 분석 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          right: 100,
          opacity: fadeIn(frame, 200, 40),
          transform: `scale(${scaleIn(frame, fps, 200)})`,
        }}
      >
        <Card width={500} borderColor={colors.danger}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 15 }}>🔬</div>
            <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>
              ICP-OES 분석
            </div>
            <div style={{ fontSize: 22, color: colors.gray[300], lineHeight: 1.6 }}>
              유도결합 플라즈마<br />
              광학 발광 분광법
            </div>
            <div
              style={{
                marginTop: 20,
                padding: "15px 25px",
                backgroundColor: `${colors.danger}30`,
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: 24, color: colors.danger, fontWeight: "bold" }}>
                사람만이 수행 가능
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* 측정 불가 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 500, 40),
        }}
      >
        <Card width={1200} borderColor={colors.gray[500]} style={{ display: "inline-block" }}>
          <div style={{ fontSize: 28, color: colors.white, marginBottom: 20, fontWeight: "bold" }}>
            왜 AI가 실시간 분석을 할 수 없는가?
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>⏱️</div>
              <div style={{ fontSize: 20, color: colors.gray[300] }}>분석 시간</div>
              <div style={{ fontSize: 24, color: colors.accent, fontWeight: "bold" }}>수 시간 소요</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🧪</div>
              <div style={{ fontSize: 20, color: colors.gray[300] }}>전처리</div>
              <div style={{ fontSize: 24, color: colors.accent, fontWeight: "bold" }}>샘플 용해 필요</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>👨‍🔬</div>
              <div style={{ fontSize: 20, color: colors.gray[300] }}>전문가</div>
              <div style={{ fontSize: 24, color: colors.accent, fontWeight: "bold" }}>숙련 인력 필수</div>
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: HUMAN ============
const Scene04Human: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { num: 1, title: "조건 설정", desc: "칼날 각도 45도\n회전 속도 500RPM", icon: "⚙️" },
    { num: 2, title: "샘플 채취", desc: "분쇄 결과물\n대표 샘플", icon: "🧫" },
    { num: 3, title: "ICP 분석", desc: "Li, Co, Ni, Mn\n성분 함량", icon: "🔬" },
    { num: 4, title: "회수율 계산", desc: "목표 대비\n실제 회수량", icon: "📊" },
  ];

  const currentStep = Math.min(Math.floor(frame / 400), 3);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality/scene04_human.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#059669" color3="#0f172a" />
      <Particles count={25} color={colors.success} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={60} glowColor={colors.success}>사람의 역할: 최적 조건 탐색</GlowText>
      </div>

      {/* 실험 사이클 다이어그램 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {steps.map((step, i) => {
          const delay = 80 + i * 200;
          const isActive = i <= currentStep;
          const isCurrent = i === currentStep;

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  opacity: fadeIn(frame, delay, 30),
                  transform: `scale(${scaleIn(frame, fps, delay)})`,
                }}
              >
                <Card
                  width={320}
                  borderColor={isActive ? colors.success : colors.gray[700]}
                  style={{
                    backgroundColor: isCurrent ? `${colors.success}20` : `${colors.gray[900]}ee`,
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        margin: "0 auto 15px",
                        borderRadius: "50%",
                        backgroundColor: isActive ? colors.success : colors.gray[700],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                        color: colors.white,
                        fontWeight: "bold",
                      }}
                    >
                      {step.num}
                    </div>
                    <div style={{ fontSize: 40, marginBottom: 10 }}>{step.icon}</div>
                    <div
                      style={{
                        fontSize: 26,
                        color: isActive ? colors.white : colors.gray[500],
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        color: isActive ? colors.gray[300] : colors.gray[600],
                        whiteSpace: "pre-line",
                        lineHeight: 1.5,
                      }}
                    >
                      {step.desc}
                    </div>
                  </div>
                </Card>
              </div>

              {i < steps.length - 1 && (
                <div
                  style={{
                    alignSelf: "center",
                    fontSize: 40,
                    color: i < currentStep ? colors.success : colors.gray[600],
                    opacity: fadeIn(frame, delay + 100, 30),
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 반복 강조 */}
      <div
        style={{
          position: "absolute",
          bottom: "22%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 1000, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 80px",
            background: `linear-gradient(135deg, ${colors.accent}30 0%, ${colors.accent}10 100%)`,
            borderRadius: 25,
            border: `3px solid ${colors.accent}`,
          }}
        >
          <span style={{ fontSize: 44, color: colors.white, fontWeight: "bold" }}>
            🔄 이 과정을 수십~수백 회 반복
          </span>
        </div>
      </div>

      {/* 결과 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 1400, 40),
        }}
      >
        <span style={{ fontSize: 32, color: colors.gray[100] }}>
          최적 조건 발견: <span style={{ color: colors.success, fontWeight: "bold" }}>회수율 94%</span> 달성
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: QUESTION ============
const Scene05Question: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = Math.sin(frame / 15) * 0.05 + 1;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality/scene05_question.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#7c3aed" color3="#0f172a" />
      <Particles count={30} color={colors.accent} />

      {/* 질문 */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 20, 40),
          transform: `scale(${scaleIn(frame, fps, 20) * pulse})`,
        }}
      >
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontSize: 100 }}>🤔</span>
        </div>
        <GlowText fontSize={72} glowColor={colors.accent}>
          그렇다면, AI는 무엇을 학습하는가?
        </GlowText>
      </div>

      {/* 힌트 */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 300, 40),
        }}
      >
        <Card width={800} borderColor={colors.secondary} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 36, color: colors.gray[100] }}>
              화학적 회수율을 직접 학습할 수 없다면...
            </span>
            <br />
            <span style={{ fontSize: 40, color: colors.accent, fontWeight: "bold" }}>
              무엇을 대신 학습해야 할까?
            </span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: AI TARGET ============
const Scene06AITarget: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality/scene06_ai_target.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#0284c7" color3="#0f172a" />
      <Particles count={25} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={60} glowColor={colors.industrial.blue}>AI가 학습하는 것: 물리적 입도</GlowText>
      </div>

      {/* 입도 분포 시각화 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          opacity: fadeIn(frame, 80, 40),
        }}
      >
        <Card width={700} borderColor={colors.industrial.blue}>
          <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold", marginBottom: 20 }}>
            입도 분포 (Particle Size Distribution)
          </div>
          <ParticleSizeChart frame={frame} />
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: colors.gray[400] }}>D10</div>
              <div style={{ fontSize: 28, color: colors.primary, fontWeight: "bold" }}>5um</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: colors.gray[400] }}>D50 (중앙값)</div>
              <div style={{ fontSize: 28, color: colors.success, fontWeight: "bold" }}>15um</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: colors.gray[400] }}>D90</div>
              <div style={{ fontSize: 28, color: colors.accent, fontWeight: "bold" }}>30um</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 핵심 연결고리 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 100,
          opacity: fadeIn(frame, 300, 40),
        }}
      >
        <Card width={550} borderColor={colors.success}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, color: colors.success, fontWeight: "bold", marginBottom: 20 }}>
              핵심 발견
            </div>
            <div style={{ fontSize: 26, color: colors.white, lineHeight: 1.8, marginBottom: 20 }}>
              특정 입도 분포일 때<br />
              <span style={{ color: colors.accent, fontWeight: "bold" }}>회수율이 가장 높다</span>
            </div>
            <div
              style={{
                padding: "20px 30px",
                backgroundColor: `${colors.success}20`,
                borderRadius: 15,
              }}
            >
              <div style={{ fontSize: 20, color: colors.gray[300], marginBottom: 10 }}>예시</div>
              <div style={{ fontSize: 24, color: colors.white }}>
                D50 = 15um, 편차 = ±2um
              </div>
              <div style={{ fontSize: 28, color: colors.success, fontWeight: "bold", marginTop: 10 }}>
                → 회수율 94%
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 레이저 회절 센서 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 600, 40),
        }}
      >
        <Card width={1100} borderColor={colors.primary} style={{ display: "inline-block" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <div style={{ fontSize: 80 }}>📡</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 30, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>
                레이저 회절 센서
              </div>
              <div style={{ fontSize: 24, color: colors.gray[300] }}>
                실시간 입도 측정 가능 → AI 학습의 핵심 데이터
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// 입도 분포 차트
const ParticleSizeChart: React.FC<{ frame: number }> = ({ frame }) => {
  const animProgress = Math.min(frame / 60, 1);

  return (
    <svg width="640" height="200" viewBox="0 0 640 200">
      {/* 축 */}
      <line x1="40" y1="170" x2="620" y2="170" stroke={colors.gray[600]} strokeWidth="2" />
      <line x1="40" y1="20" x2="40" y2="170" stroke={colors.gray[600]} strokeWidth="2" />

      {/* 정규 분포 곡선 */}
      <path
        d={`M 40 170 ${Array.from({ length: 100 }).map((_, i) => {
          const x = 40 + i * 5.8;
          const t = (i - 50) / 15;
          const y = 170 - Math.exp(-t * t / 2) * 130 * animProgress;
          return `L ${x} ${y}`;
        }).join(" ")} L 620 170 Z`}
        fill={`${colors.primary}40`}
        stroke={colors.primary}
        strokeWidth="3"
      />

      {/* D10, D50, D90 마커 */}
      {[
        { x: 140, label: "D10", color: colors.primary },
        { x: 330, label: "D50", color: colors.success },
        { x: 480, label: "D90", color: colors.accent },
      ].map((marker, i) => (
        <g key={i}>
          <line
            x1={marker.x}
            y1={170}
            x2={marker.x}
            y2={30}
            stroke={marker.color}
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity={animProgress}
          />
          <circle cx={marker.x} cy={170} r="6" fill={marker.color} opacity={animProgress} />
        </g>
      ))}

      {/* 라벨 */}
      <text x="330" y="195" fill={colors.gray[400]} fontSize="14" textAnchor="middle">입자 크기 (um)</text>
    </svg>
  );
};

// ============ SCENE 7: AI PROCESS ============
const Scene07AIProcess: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    {
      num: 1,
      title: "목표 설정",
      desc: "사람이 결정",
      details: ["D10 = 5um", "D50 = 15um", "D90 = 30um", "표준편차 ≤ 8um"],
      color: colors.success,
    },
    {
      num: 2,
      title: "데이터 수집",
      desc: "입력/출력 기록",
      details: ["칼날 각도, 회전 속도", "온도, 습도, 압력", "→ D10, D50, D90"],
      color: colors.primary,
    },
    {
      num: 3,
      title: "모델 학습",
      desc: "패턴 파악",
      details: ["입력 → 출력 예측", "오차 최소화", "관계 학습 완료"],
      color: colors.secondary,
    },
  ];

  const currentStep = Math.min(Math.floor(frame / 600), 2);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality/scene07_ai_process.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#7c3aed" color3="#0f172a" />
      <Particles count={20} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={56} glowColor={colors.secondary}>AI 학습 프로세스</GlowText>
      </div>

      {/* 3단계 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {steps.map((step, i) => {
          const delay = 80 + i * 400;
          const isActive = i <= currentStep;
          const isCurrent = i === currentStep;

          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 40),
                transform: `scale(${scaleIn(frame, fps, delay)})`,
              }}
            >
              <Card
                width={400}
                borderColor={isActive ? step.color : colors.gray[700]}
                style={{
                  backgroundColor: isCurrent ? `${step.color}15` : `${colors.gray[900]}ee`,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      margin: "0 auto 15px",
                      borderRadius: "50%",
                      backgroundColor: isActive ? step.color : colors.gray[700],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 32,
                      color: colors.white,
                      fontWeight: "bold",
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      color: isActive ? colors.white : colors.gray[500],
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      color: step.color,
                      marginBottom: 20,
                    }}
                  >
                    {step.desc}
                  </div>
                  <div
                    style={{
                      padding: "15px 20px",
                      backgroundColor: `${colors.gray[800]}`,
                      borderRadius: 12,
                    }}
                  >
                    {step.details.map((detail, j) => (
                      <div
                        key={j}
                        style={{
                          fontSize: 18,
                          color: isActive ? colors.gray[200] : colors.gray[500],
                          marginBottom: j < step.details.length - 1 ? 8 : 0,
                        }}
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* 결과 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 1800, 40),
        }}
      >
        <Card width={1000} borderColor={colors.accent} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 32, color: colors.white }}>
              학습 완료: AI는 <span style={{ color: colors.accent, fontWeight: "bold" }}>"설비 조건 → 입도 분포"</span> 관계를 파악
            </span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 8: PRODUCTION ============
const Scene08Production: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const d50Value = 15 + Math.sin(frame / 30) * 5;
  const isOutOfRange = d50Value < 12 || d50Value > 18;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality/scene08_production.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#0284c7" color3="#0f172a" />
      <Particles count={25} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={56} glowColor={colors.industrial.blue}>양산 단계: 실시간 제어</GlowText>
      </div>

      {/* 실시간 모니터링 대시보드 */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: 100,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={750} borderColor={colors.industrial.blue}>
          <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold", marginBottom: 20 }}>
            실시간 입도 모니터링
          </div>

          {/* 게이지 */}
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 18, color: colors.gray[400] }}>D50 (현재값)</span>
                <span
                  style={{
                    fontSize: 24,
                    color: isOutOfRange ? colors.danger : colors.success,
                    fontWeight: "bold",
                  }}
                >
                  {d50Value.toFixed(1)} um
                </span>
              </div>

              {/* 범위 바 */}
              <div
                style={{
                  height: 30,
                  backgroundColor: colors.gray[800],
                  borderRadius: 15,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* 정상 범위 */}
                <div
                  style={{
                    position: "absolute",
                    left: "30%",
                    right: "30%",
                    top: 0,
                    bottom: 0,
                    backgroundColor: `${colors.success}40`,
                  }}
                />
                {/* 현재 값 포인터 */}
                <div
                  style={{
                    position: "absolute",
                    left: `${((d50Value - 5) / 25) * 100}%`,
                    top: 0,
                    width: 6,
                    height: 30,
                    backgroundColor: isOutOfRange ? colors.danger : colors.success,
                    borderRadius: 3,
                    transition: "left 0.1s",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                <span style={{ fontSize: 14, color: colors.gray[500] }}>5um</span>
                <span style={{ fontSize: 14, color: colors.success }}>12-18um (목표)</span>
                <span style={{ fontSize: 14, color: colors.gray[500] }}>30um</span>
              </div>
            </div>

            {/* 상태 표시 */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                backgroundColor: isOutOfRange ? `${colors.danger}30` : `${colors.success}30`,
                border: `4px solid ${isOutOfRange ? colors.danger : colors.success}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 48 }}>{isOutOfRange ? "⚠️" : "✅"}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 피드백 제어 */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          right: 100,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        <Card width={500} borderColor={colors.accent}>
          <div style={{ fontSize: 26, color: colors.white, fontWeight: "bold", marginBottom: 20 }}>
            자동 피드백 제어
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <FeedbackRule
              condition="D50 > 18um"
              action="회전 속도 ↑"
              color={colors.danger}
            />
            <FeedbackRule
              condition="D50 < 12um"
              action="회전 속도 ↓"
              color={colors.primary}
            />
            <FeedbackRule
              condition="편차 급증"
              action="칼날 점검 알림"
              color={colors.accent}
            />
          </div>
        </Card>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 800, 40),
        }}
      >
        <Card width={1200} borderColor={colors.success} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, color: colors.white, marginBottom: 15 }}>
              AI는 <span style={{ color: colors.industrial.blue, fontWeight: "bold" }}>물리적 크기만</span> 관리합니다
            </div>
            <div style={{ fontSize: 22, color: colors.gray[300] }}>
              화학적 회수율은 여전히 정기적 ICP 샘플링을 통해 사람이 관리
            </div>
            <div style={{ fontSize: 24, color: colors.success, marginTop: 15, fontWeight: "bold" }}>
              하지만 입도가 일정하면 → 회수율도 안정적 (상관관계 확인됨)
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// 피드백 규칙 컴포넌트
const FeedbackRule: React.FC<{ condition: string; action: string; color: string }> = ({
  condition,
  action,
  color,
}) => (
  <div
    style={{
      padding: "15px 20px",
      backgroundColor: `${color}15`,
      borderRadius: 12,
      border: `2px solid ${color}`,
      display: "flex",
      alignItems: "center",
      gap: 15,
    }}
  >
    <div style={{ fontSize: 20, color: colors.gray[300] }}>{condition}</div>
    <div style={{ fontSize: 24, color: colors.gray[400] }}>→</div>
    <div style={{ fontSize: 20, color, fontWeight: "bold" }}>{action}</div>
  </div>
);

// ============ SCENE 9: SUMMARY ============
const Scene09Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const humanTasks = [
    "초기 실험 설계",
    "ICP 성분 분석",
    "회수율 계산/평가",
    "최적 조건 결정",
    "AI 목표 입도 설정",
  ];

  const aiTasks = [
    "실시간 입도 모니터링",
    "편차 발생 시 경고",
    "설비 조건 자동 조정",
    "입도 패턴 학습",
    "이상 징후 조기 감지",
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality/scene09_summary.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#4338ca" color3="#0f172a" />
      <Particles count={20} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={56} glowColor={colors.primary}>역할 분담 정리</GlowText>
      </div>

      {/* 사람 vs AI */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* 사람 */}
        <div style={{ opacity: fadeIn(frame, 60, 40) }}>
          <Card width={550} borderColor={colors.success}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 56 }}>👨‍🔬</span>
              <div style={{ fontSize: 32, color: colors.success, fontWeight: "bold", marginTop: 10 }}>
                사람이 하는 일
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {humanTasks.map((task, i) => {
                const delay = 150 + i * 80;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 15,
                      padding: "12px 20px",
                      backgroundColor: colors.gray[800],
                      borderRadius: 10,
                      opacity: fadeIn(frame, delay, 30),
                      transform: `translateX(${interpolate(frame, [delay, delay + 30], [-50, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px)`,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        backgroundColor: colors.success,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        color: colors.white,
                        fontWeight: "bold",
                      }}
                    >
                      {i + 1}
                    </div>
                    <span style={{ fontSize: 20, color: colors.gray[100] }}>{task}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* AI */}
        <div style={{ opacity: fadeIn(frame, 100, 40) }}>
          <Card width={550} borderColor={colors.primary}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 56 }}>🤖</span>
              <div style={{ fontSize: 32, color: colors.primary, fontWeight: "bold", marginTop: 10 }}>
                AI가 하는 일
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {aiTasks.map((task, i) => {
                const delay = 200 + i * 80;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 15,
                      padding: "12px 20px",
                      backgroundColor: colors.gray[800],
                      borderRadius: 10,
                      opacity: fadeIn(frame, delay, 30),
                      transform: `translateX(${interpolate(frame, [delay, delay + 30], [50, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px)`,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        backgroundColor: colors.primary,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        color: colors.white,
                        fontWeight: "bold",
                      }}
                    >
                      {i + 1}
                    </div>
                    <span style={{ fontSize: 20, color: colors.gray[100] }}>{task}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* 협업 결과 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 1200, 40),
        }}
      >
        <Card width={1100} borderColor={colors.accent} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, color: colors.white, marginBottom: 20 }}>
              사람이 <span style={{ color: colors.success }}>"무엇이 좋은 품질인지"</span> 정의하고,
              AI가 <span style={{ color: colors.primary }}>"그 품질을 유지"</span>합니다
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 36, color: colors.success, fontWeight: "bold" }}>일관된 품질</span>
              </div>
              <div style={{ fontSize: 36, color: colors.gray[500] }}>+</div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 36, color: colors.primary, fontWeight: "bold" }}>높은 생산성</span>
              </div>
              <div style={{ fontSize: 36, color: colors.gray[500] }}>+</div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 36, color: colors.accent, fontWeight: "bold" }}>낮은 불량률</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 10: CLOSING ============
const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: "40%", label: "입도 편차 감소", color: colors.success },
    { value: "60%", label: "품질 불량률 감소", color: colors.primary },
    { value: "70%", label: "수동 점검 시간 절감", color: colors.secondary },
    { value: "15%", label: "설비 가동률 향상", color: colors.accent },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality/scene10_closing.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#7c3aed" color3="#0f172a" />
      <Particles count={35} color={colors.accent} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={60} glowColor={colors.accent}>도입 효과</GlowText>
      </div>

      {/* 통계 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {stats.map((stat, i) => {
          const delay = 60 + i * 60;
          const scale = scaleIn(frame, fps, delay);

          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                transform: `scale(${scale})`,
              }}
            >
              <div
                style={{
                  fontSize: 72,
                  fontWeight: "bold",
                  color: stat.color,
                  textShadow: `0 0 30px ${stat.color}60`,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 10 }}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <Card width={1000} borderColor={colors.accent} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, color: colors.white, marginBottom: 20 }}>
              AI는 <span style={{ color: colors.danger }}>마법이 아닙니다</span>
            </div>
            <div style={{ fontSize: 28, color: colors.gray[300], lineHeight: 1.8 }}>
              측정 가능한 것만 학습하고, 관리할 수 있습니다<br />
              하지만 그 범위 안에서, <span style={{ color: colors.success }}>사람보다 빠르고, 정확하고, 지치지 않습니다</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 마무리 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 700, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 80px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 30,
            boxShadow: `0 0 60px ${colors.primary}80`,
          }}
        >
          <span style={{ fontSize: 40, color: colors.white, fontWeight: "bold" }}>
            사람의 전문 지식 + AI의 실시간 관리 = 최고의 품질과 효율
          </span>
        </div>
      </div>

      {/* 감사 인사 */}
      <div
        style={{
          position: "absolute",
          bottom: "4%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 900, 40),
        }}
      >
        <span style={{ fontSize: 28, color: colors.gray[400] }}>
          시청해 주셔서 감사합니다
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const AIQualityVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene01_opening.start} durationInFrames={SCENE_TIMINGS.scene01_opening.duration}>
        <Scene01Opening />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene02_process.start} durationInFrames={SCENE_TIMINGS.scene02_process.duration}>
        <Scene02Process />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene03_quality.start} durationInFrames={SCENE_TIMINGS.scene03_quality.duration}>
        <Scene03Quality />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene04_human.start} durationInFrames={SCENE_TIMINGS.scene04_human.duration}>
        <Scene04Human />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene05_question.start} durationInFrames={SCENE_TIMINGS.scene05_question.duration}>
        <Scene05Question />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene06_ai_target.start} durationInFrames={SCENE_TIMINGS.scene06_ai_target.duration}>
        <Scene06AITarget />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene07_ai_process.start} durationInFrames={SCENE_TIMINGS.scene07_ai_process.duration}>
        <Scene07AIProcess />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene08_production.start} durationInFrames={SCENE_TIMINGS.scene08_production.duration}>
        <Scene08Production />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene09_summary.start} durationInFrames={SCENE_TIMINGS.scene09_summary.duration}>
        <Scene09Summary />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene10_closing.start} durationInFrames={SCENE_TIMINGS.scene10_closing.duration}>
        <Scene10Closing />
      </Sequence>

      {/* 전체 영상에 UTTEC-Lab 로고 오버레이 */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
