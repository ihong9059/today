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

// ============ SCENE TIMINGS (30fps) ============
export const SCENE_TIMINGS = {
  scene01_opening: { duration: 814, start: 0 },
  scene02_current: { duration: 1046, start: 814 },
  scene03_risk_drone: { duration: 1578, start: 1860 },
  scene04_risk_safety: { duration: 1436, start: 3438 },
  scene05_risk_others: { duration: 1259, start: 4874 },
  scene06_solution_core: { duration: 1580, start: 6133 },
  scene07_solution_safety: { duration: 1374, start: 7713 },
  scene08_solution_cleaning: { duration: 1404, start: 9087 },
  scene09_comparison: { duration: 1394, start: 10491 },
  scene10_closing: { duration: 838, start: 11885 },
};

export const WALL_ROBOT_VIDEO_DURATION = 12723;

// ============ COLORS ============
const colors = {
  bg: { dark: "#0a0f1e", mid: "#111827", light: "#1f2937" },
  primary: "#0ea5e9",
  secondary: "#6366f1",
  accent: "#f59e0b",
  success: "#10b981",
  danger: "#ef4444",
  warning: "#f97316",
  white: "#ffffff",
  gray: {
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  } as { [key: number]: string },
};

// ============ HELPERS ============
const fadeIn = (frame: number, start = 0, duration = 25) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

const fadeOut = (frame: number, start: number, duration = 20) =>
  interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

const slideUp = (frame: number, start = 0, duration = 25, distance = 40) =>
  interpolate(frame, [start, start + duration], [distance, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

const slideLeft = (frame: number, start = 0, duration = 25, distance = 60) =>
  interpolate(frame, [start, start + duration], [distance, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

const scaleIn = (frame: number, fps: number, delay = 0) =>
  Math.min(
    spring({
      frame: Math.max(0, frame - delay),
      fps,
      config: { damping: 12, stiffness: 100 },
    }),
    1
  );

const pulseGlow = (frame: number, speed = 60) =>
  0.5 + 0.5 * Math.sin(frame / speed * Math.PI * 2);

// ============ BACKGROUNDS ============
const AnimatedBackground: React.FC<{
  color1?: string;
  color2?: string;
  color3?: string;
}> = ({ color1 = "#0a0f1e", color2 = "#1e3a5f", color3 = "#0a0f1e" }) => {
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
        const x = 500 + Math.sin((frame + i * 120) / 90) * 300;
        const y = 350 + Math.cos((frame + i * 120) / 70) * 200;
        const size = 500 + i * 80;
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
              background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const DangerBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = pulseGlow(frame, 45);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, #1a0505 0%, #2d0a0a ${30 + pulse * 10}%, #1a0505 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${colors.danger}08 0%, transparent 70%)`,
          opacity: 0.3 + pulse * 0.3,
        }}
      />
    </AbsoluteFill>
  );
};

const SuccessBackground: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, #021a0e 0%, #0a2d1a 50%, #021a0e 100%)`,
        }}
      />
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 300 + i * 800 + Math.sin((frame + i * 100) / 80) * 100,
            top: 200 + Math.cos((frame + i * 100) / 60) * 150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.success}10 0%, transparent 70%)`,
            filter: "blur(50px)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const Particles: React.FC<{ count?: number; color?: string }> = ({
  count = 15,
  color = colors.white,
}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = (i * 137.5) % 1920;
        const baseY = (i * 73.7) % 1080;
        const speed = 0.2 + (i % 5) * 0.15;
        const size = 2 + (i % 3) * 2;
        const x = baseX + Math.sin((frame * speed + i * 50) / 40) * 25;
        const y = (baseY + frame * speed * 0.3) % 1150 - 30;
        const opacity = 0.06 + Math.sin((frame + i * 20) / 30) * 0.06;
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

// ============ UI COMPONENTS ============
const GlowText: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
  glowColor?: string;
}> = ({
  children,
  fontSize = 64,
  color = colors.white,
  glowColor = colors.primary,
}) => (
  <span
    style={{
      fontSize,
      fontWeight: "bold",
      color,
      textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}50`,
    }}
  >
    {children}
  </span>
);

const Card: React.FC<{
  children: React.ReactNode;
  width?: number | string;
  borderColor?: string;
  glow?: boolean;
  style?: React.CSSProperties;
}> = ({
  children,
  width = 400,
  borderColor = colors.primary,
  glow = true,
  style = {},
}) => (
  <div
    style={{
      width,
      padding: 28,
      backgroundColor: `${colors.bg.mid}ee`,
      borderRadius: 20,
      border: `2px solid ${borderColor}60`,
      boxShadow: glow
        ? `0 0 30px ${borderColor}30, 0 15px 40px rgba(0,0,0,0.5)`
        : "0 15px 40px rgba(0,0,0,0.5)",
      backdropFilter: "blur(10px)",
      ...style,
    }}
  >
    {children}
  </div>
);

const DangerBadge: React.FC<{ text: string; frame: number }> = ({
  text,
  frame,
}) => {
  const pulse = pulseGlow(frame, 30);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 24px",
        backgroundColor: `${colors.danger}20`,
        border: `2px solid ${colors.danger}`,
        borderRadius: 30,
        boxShadow: `0 0 ${15 + pulse * 10}px ${colors.danger}40`,
      }}
    >
      <span style={{ fontSize: 22, color: colors.danger }}>&#9888;</span>
      <span
        style={{ fontSize: 22, fontWeight: "bold", color: colors.danger }}
      >
        {text}
      </span>
    </div>
  );
};

const SectionLabel: React.FC<{
  number: string;
  title: string;
  color?: string;
}> = ({ number, title, color = colors.primary }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 14,
        background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 4px 15px ${color}50`,
      }}
    >
      <span
        style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}
      >
        {number}
      </span>
    </div>
    <span
      style={{
        fontSize: 36,
        fontWeight: "bold",
        color: colors.white,
        textShadow: `0 2px 10px rgba(0,0,0,0.5)`,
      }}
    >
      {title}
    </span>
  </div>
);

const CompareRow: React.FC<{
  label: string;
  before: string;
  after: string;
  frame: number;
  delay: number;
}> = ({ label, before, after, frame, delay }) => {
  const opacity = fadeIn(frame, delay, 20);
  const y = slideUp(frame, delay, 20, 20);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        opacity,
        transform: `translateY(${y}px)`,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          width: 200,
          fontSize: 22,
          fontWeight: "bold",
          color: colors.gray[300],
          textAlign: "right",
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          padding: "14px 20px",
          backgroundColor: `${colors.danger}15`,
          border: `1px solid ${colors.danger}40`,
          borderRadius: 12,
          fontSize: 20,
          color: colors.gray[300],
        }}
      >
        {before}
      </div>
      <div style={{ fontSize: 28, color: colors.accent }}>&#10140;</div>
      <div
        style={{
          flex: 1,
          padding: "14px 20px",
          backgroundColor: `${colors.success}15`,
          border: `1px solid ${colors.success}40`,
          borderRadius: 12,
          fontSize: 20,
          color: colors.white,
          fontWeight: "bold",
        }}
      >
        {after}
      </div>
    </div>
  );
};

// ============ GLOBAL OVERLAY ============
const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOpacity = fadeIn(frame, 0, 30);
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 36,
          zIndex: 1000,
          opacity: logoOpacity,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 15px ${colors.primary}50`,
          }}
        >
          <span
            style={{ fontSize: 24, fontWeight: "bold", color: colors.white }}
          >
            D
          </span>
        </div>
        <span
          style={{
            fontSize: 26,
            fontWeight: "bold",
            color: colors.white,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            letterSpacing: 1,
          }}
        >
          DAIDUCK
        </span>
      </div>
      {/* Bottom progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: `${colors.gray[800]}80`,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(frame / WALL_ROBOT_VIDEO_DURATION) * 100}%`,
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
          }}
        />
      </div>
    </>
  );
};

// ============ SCENE 1: OPENING ============
const Scene01Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/wall-robot/scene01_opening.mp3")} />
      <AnimatedBackground color1="#0a0f1e" color2="#0c4a6e" color3="#0a0f1e" />
      <Particles count={20} />

      {/* Building silhouette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: "55%",
          opacity: fadeIn(frame, 0, 40) * 0.15,
          display: "flex",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {[0.85, 1, 0.7, 0.9, 0.6].map((h, i) => (
          <div
            key={i}
            style={{
              width: 120,
              height: `${h * 100}%`,
              backgroundColor: colors.primary,
              borderRadius: "8px 8px 0 0",
              alignSelf: "flex-end",
              opacity: 0.3 + i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Company name */}
      <div
        style={{
          position: "absolute",
          top: "14%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 10, 30),
          transform: `translateY(${slideUp(frame, 10, 30)}px)`,
        }}
      >
        <div style={{ fontSize: 36, color: colors.primary, marginBottom: 12, letterSpacing: 6 }}>
          DAIDUCK HUBIZ
        </div>
        <div style={{ fontSize: 28, color: colors.gray[400] }}>
          대덕휴비즈
        </div>
      </div>

      {/* Main title */}
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 40, 35),
          transform: `translateY(${slideUp(frame, 40, 35)}px)`,
        }}
      >
        <GlowText fontSize={72} glowColor={colors.primary}>
          외벽 청소 로봇
        </GlowText>
        <div style={{ marginTop: 20 }}>
          <span style={{ fontSize: 48, color: colors.gray[300] }}>
            개선 설계 제안서
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: "58%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 120, 30),
        }}
      >
        <div
          style={{
            display: "inline-flex",
            gap: 40,
            padding: "20px 50px",
            backgroundColor: `${colors.bg.mid}dd`,
            borderRadius: 16,
            border: `1px solid ${colors.gray[700]}`,
          }}
        >
          {["현장 안전 강화", "구조 단순화", "신뢰성 향상"].map((t, i) => (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, 150 + i * 30, 25),
                transform: `scale(${scaleIn(frame, fps, 150 + i * 30)})`,
              }}
            >
              <span style={{ fontSize: 28, color: colors.accent, marginRight: 8 }}>&#10003;</span>
              <span style={{ fontSize: 26, color: colors.white }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Date */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 200, 30),
        }}
      >
        <span style={{ fontSize: 22, color: colors.gray[500] }}>2026.04</span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: CURRENT SYSTEM ============
const Scene02Current: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const components = [
    { icon: "&#9881;", label: "H-빔 레일", desc: "수평 이동 (X축)", color: colors.primary },
    { icon: "&#8597;", label: "로프 + 풀리", desc: "수직 하강 (Y축)", color: colors.secondary },
    { icon: "&#9673;", label: "빨판 흡착", desc: "벽면 고정 (Z축)", color: colors.warning },
    { icon: "&#9992;", label: "유선 드론", desc: "세정액 분사", color: colors.danger },
    { icon: "&#128187;", label: "듀얼 CPU", desc: "FreeRTOS + Linux", color: colors.success },
    { icon: "&#128247;", label: "AI 카메라", desc: "오염도 분석", color: colors.accent },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/wall-robot/scene02_current.mp3")} />
      <AnimatedBackground color1="#0a0f1e" color2="#1e293b" color3="#0a0f1e" />
      <Particles count={12} />

      <div
        style={{
          position: "absolute",
          top: "6%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 10, 25),
          transform: `translateY(${slideUp(frame, 10, 25)}px)`,
        }}
      >
        <SectionLabel number="01" title="현행 시스템 구조" />
      </div>

      {/* System diagram */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: "42%",
          height: "75%",
          opacity: fadeIn(frame, 40, 30),
        }}
      >
        <Card width="100%" borderColor={colors.gray[600]} style={{ height: "100%", padding: 24 }}>
          <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 16, textAlign: "center" }}>
            시스템 구성도
          </div>
          {/* Roof */}
          <div style={{
            padding: "12px 20px",
            backgroundColor: `${colors.gray[700]}80`,
            borderRadius: 10,
            border: `1px solid ${colors.gray[600]}`,
            textAlign: "center",
            marginBottom: 8,
          }}>
            <span style={{ fontSize: 18, color: colors.gray[300] }}>&#127968; 건물 옥상 — H-빔 레일</span>
          </div>
          {/* Rope */}
          <div style={{ textAlign: "center", margin: "4px 0" }}>
            <span style={{ fontSize: 16, color: colors.gray[500] }}>&#9474; 로프 (단일) &#9474;</span>
          </div>
          {/* Robot */}
          <div style={{
            padding: "16px 20px",
            backgroundColor: `${colors.primary}15`,
            borderRadius: 12,
            border: `1px solid ${colors.primary}40`,
            marginBottom: 8,
          }}>
            <div style={{ fontSize: 20, fontWeight: "bold", color: colors.white, textAlign: "center", marginBottom: 10 }}>
              &#129302; 청소 로봇 본체
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {["빨판 흡착", "롤러", "카메라 x2"].map((t, i) => (
                <span key={i} style={{
                  fontSize: 14, padding: "4px 12px",
                  backgroundColor: `${colors.gray[800]}`,
                  borderRadius: 8, color: colors.gray[300],
                }}>{t}</span>
              ))}
            </div>
          </div>
          {/* Drone */}
          <div style={{
            padding: "12px 20px",
            backgroundColor: `${colors.danger}10`,
            borderRadius: 10,
            border: `1px dashed ${colors.danger}40`,
            textAlign: "center",
            marginBottom: 8,
          }}>
            <span style={{ fontSize: 18, color: colors.danger }}>&#9992; 유선 드론 — 세정액 분사</span>
          </div>
          {/* Communication */}
          <div style={{
            padding: "10px 20px",
            backgroundColor: `${colors.gray[700]}50`,
            borderRadius: 10,
            textAlign: "center",
          }}>
            <span style={{ fontSize: 16, color: colors.gray[400] }}>Sub CPU &#8596; RS485 &#8596; Main CPU</span>
          </div>
        </Card>
      </div>

      {/* Component cards */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: "45%",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {components.map((comp, i) => (
          <div
            key={i}
            style={{
              width: "47%",
              opacity: fadeIn(frame, 80 + i * 30, 25),
              transform: `translateX(${slideLeft(frame, 80 + i * 30, 25, 30)}px)`,
            }}
          >
            <Card width="100%" borderColor={comp.color} style={{ padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 32 }} dangerouslySetInnerHTML={{ __html: comp.icon }} />
                <div>
                  <div style={{ fontSize: 20, fontWeight: "bold", color: colors.white }}>
                    {comp.label}
                  </div>
                  <div style={{ fontSize: 16, color: colors.gray[400] }}>
                    {comp.desc}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Warning banner */}
      <div
        style={{
          position: "absolute",
          bottom: "6%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 500, 30),
        }}
      >
        <DangerBadge text="구조적 결함 발견 — 현장 투입 시 심각한 안전 문제 우려" frame={frame} />
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: RISK - DRONE ============
const Scene03RiskDrone: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const risks = [
    { icon: "&#127744;", title: "풍속 취약", desc: "고층 강풍에 드론 흔들림 → 정밀 분사 불가" },
    { icon: "&#128279;", title: "케이블 간섭", desc: "드론 유선 + 로프 + 호스 엉킴 위험" },
    { icon: "&#9888;", title: "추락 위험", desc: "드론 추락 시 지상 보행자 안전 위협" },
    { icon: "&#9986;", title: "로프 절단", desc: "프로펠러 회전 중 로프 절단 가능성" },
    { icon: "&#128176;", title: "과잉 설계", desc: "단순 분사 기능에 드론은 불필요한 복잡성" },
    { icon: "&#128295;", title: "유지보수 부담", desc: "모터, 프로펠러, 광섬유 등 고장 포인트 다수" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/wall-robot/scene03_risk_drone.mp3")} />
      <DangerBackground />
      <Particles count={10} color={colors.danger} />

      <div
        style={{
          position: "absolute",
          top: "5%",
          left: 80,
          opacity: fadeIn(frame, 10, 25),
          transform: `translateY(${slideUp(frame, 10, 25)}px)`,
        }}
      >
        <SectionLabel number="!" title="위험 1: 유선 드론 분사 시스템" color={colors.danger} />
        <div style={{ marginLeft: 72, marginTop: 10 }}>
          <DangerBadge text="심각도: 상" frame={frame} />
        </div>
      </div>

      {/* Risk grid */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "5%",
          right: "5%",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
        }}
      >
        {risks.map((risk, i) => (
          <div
            key={i}
            style={{
              width: "30%",
              opacity: fadeIn(frame, 60 + i * 40, 25),
              transform: `translateY(${slideUp(frame, 60 + i * 40, 25, 25)}px) scale(${scaleIn(frame, fps, 60 + i * 40)})`,
            }}
          >
            <Card width="100%" borderColor={colors.danger} style={{ padding: 22 }}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 44 }} dangerouslySetInnerHTML={{ __html: risk.icon }} />
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: colors.danger,
                    marginTop: 10,
                    marginBottom: 8,
                  }}
                >
                  {risk.title}
                </div>
                <div style={{ fontSize: 18, color: colors.gray[300], lineHeight: 1.5 }}>
                  {risk.desc}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Verdict */}
      <div
        style={{
          position: "absolute",
          bottom: "6%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 600, 30),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "18px 50px",
            background: `linear-gradient(135deg, ${colors.danger}20, ${colors.danger}10)`,
            border: `2px solid ${colors.danger}`,
            borderRadius: 16,
          }}
        >
          <span style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>
            &#10060; 결론: 드론 분사 방식은 현장 적용 불가
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: RISK - SAFETY ============
const Scene04RiskSafety: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/wall-robot/scene04_risk_safety.mp3")} />
      <DangerBackground />
      <Particles count={10} color={colors.danger} />

      <div
        style={{
          position: "absolute",
          top: "5%",
          left: 80,
          opacity: fadeIn(frame, 10, 25),
        }}
      >
        <SectionLabel number="!" title="위험 2: 빨판 고정 + 단일 로프" color={colors.danger} />
        <div style={{ marginLeft: 72, marginTop: 10 }}>
          <DangerBadge text="심각도: 상 — 인명사고 위험" frame={frame} />
        </div>
      </div>

      {/* Two columns */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "4%",
          right: "4%",
          display: "flex",
          gap: 30,
        }}
      >
        {/* Suction cup risks */}
        <div style={{ flex: 1, opacity: fadeIn(frame, 40, 30) }}>
          <Card width="100%" borderColor={colors.danger} style={{ padding: 24 }}>
            <div style={{ fontSize: 26, fontWeight: "bold", color: colors.danger, marginBottom: 18, textAlign: "center" }}>
              &#9673; 빨판(흡착판) 문제
            </div>
            {[
              "세정액으로 벽면이 젖으면 흡착력 급격 저하",
              "타일 줄눈, 석재 요철에서 밀착 불가",
              "매 구간 흡착→해제 반복 → 작업 속도 저하",
              "유리 외벽에 빨판 자국 (청소 역행)",
              "지속적 진공 유지에 전력 낭비",
            ].map((text, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: 14,
                  opacity: fadeIn(frame, 80 + i * 35, 20),
                  transform: `translateX(${slideLeft(frame, 80 + i * 35, 20, 20)}px)`,
                }}
              >
                <span style={{ fontSize: 18, color: colors.danger, marginTop: 2 }}>&#10006;</span>
                <span style={{ fontSize: 20, color: colors.gray[200], lineHeight: 1.4 }}>{text}</span>
              </div>
            ))}
          </Card>
        </div>

        {/* Single rope risks */}
        <div style={{ flex: 1, opacity: fadeIn(frame, 60, 30) }}>
          <Card width="100%" borderColor={colors.danger} style={{ padding: 24 }}>
            <div style={{ fontSize: 26, fontWeight: "bold", color: colors.danger, marginBottom: 18, textAlign: "center" }}>
              &#9888; 단일 로프 문제
            </div>

            {/* Fatal risk highlight */}
            <div
              style={{
                padding: "18px 20px",
                backgroundColor: `${colors.danger}20`,
                borderRadius: 14,
                border: `2px solid ${colors.danger}`,
                marginBottom: 18,
                textAlign: "center",
                opacity: fadeIn(frame, 120, 25),
                boxShadow: `0 0 ${15 + pulseGlow(frame, 25) * 10}px ${colors.danger}40`,
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 6 }}>&#9760;</div>
              <div style={{ fontSize: 24, fontWeight: "bold", color: colors.danger }}>
                로프 1개 손상 = 로봇 추락
              </div>
              <div style={{ fontSize: 18, color: colors.gray[300], marginTop: 6 }}>
                고층에서 수십 kg 장비 추락 → 인명사고 직결
              </div>
            </div>

            {[
              "단일 현수점 → 바람에 심한 좌우 요동",
              "로봇 무게 + 세정액 무게 한 점 집중",
              "로봇 자세(회전) 제어 불가능",
            ].map((text, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: 14,
                  opacity: fadeIn(frame, 250 + i * 35, 20),
                }}
              >
                <span style={{ fontSize: 18, color: colors.danger, marginTop: 2 }}>&#10006;</span>
                <span style={{ fontSize: 20, color: colors.gray[200], lineHeight: 1.4 }}>{text}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: RISK - OTHERS ============
const Scene05RiskOthers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const issues = [
    {
      title: "H-빔 레일 설치",
      severity: "중",
      color: colors.warning,
      items: ["건물별 맞춤 시공 필요", "설치에 수 일 소요", "곡면 건물 대응 불가", "설치·철거 모두 고비용"],
    },
    {
      title: "전원·급수 미설계",
      severity: "중",
      color: colors.warning,
      items: ["전원 공급 경로 없음", "급수 호스 길이·압력 문제", "오수 처리 방안 부재"],
    },
    {
      title: "RS485 단일 통신",
      severity: "중",
      color: colors.warning,
      items: ["반이중 → 영상+제어 동시 불가", "대역폭 10Mbps 한계", "단선 시 전체 마비"],
    },
    {
      title: "환경 대응 미비",
      severity: "중",
      color: colors.warning,
      items: ["풍속 작업 기준 없음", "우천 시 중단 기준 없음", "동절기 동결 대응 없음"],
    },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/wall-robot/scene05_risk_others.mp3")} />
      <AnimatedBackground color1="#1a1005" color2="#2d1a05" color3="#1a1005" />
      <Particles count={10} color={colors.warning} />

      <div
        style={{
          position: "absolute",
          top: "5%",
          left: 80,
          opacity: fadeIn(frame, 10, 25),
        }}
      >
        <SectionLabel number="!" title="추가 문제점" color={colors.warning} />
      </div>

      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "4%",
          right: "4%",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {issues.map((issue, i) => (
          <div
            key={i}
            style={{
              width: "48%",
              opacity: fadeIn(frame, 50 + i * 50, 25),
              transform: `translateY(${slideUp(frame, 50 + i * 50, 25, 25)}px)`,
            }}
          >
            <Card width="100%" borderColor={issue.color} style={{ padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 24, fontWeight: "bold", color: colors.white }}>
                  {issue.title}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    padding: "4px 14px",
                    backgroundColor: `${issue.color}25`,
                    border: `1px solid ${issue.color}`,
                    borderRadius: 20,
                    color: issue.color,
                    fontWeight: "bold",
                  }}
                >
                  심각도: {issue.severity}
                </span>
              </div>
              {issue.items.map((item, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 8,
                    opacity: fadeIn(frame, 100 + i * 50 + j * 20, 15),
                  }}
                >
                  <span style={{ color: issue.color, fontSize: 16 }}>&#9679;</span>
                  <span style={{ fontSize: 19, color: colors.gray[300] }}>{item}</span>
                </div>
              ))}
            </Card>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: SOLUTION - CORE ============
const Scene06SolutionCore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/wall-robot/scene06_solution_core.mp3")} />
      <SuccessBackground />
      <Particles count={12} color={colors.success} />

      <div
        style={{
          position: "absolute",
          top: "4%",
          left: 80,
          opacity: fadeIn(frame, 10, 25),
        }}
      >
        <SectionLabel number="&#10003;" title="핵심 개선 1: 드론 제거 + 가이드 휠" color={colors.success} />
      </div>

      {/* Two improvement columns */}
      <div
        style={{
          position: "absolute",
          top: "14%",
          left: "3%",
          right: "3%",
          display: "flex",
          gap: 24,
        }}
      >
        {/* Improvement 1: Nozzle */}
        <div style={{ flex: 1, opacity: fadeIn(frame, 40, 30) }}>
          <Card width="100%" borderColor={colors.success} style={{ padding: 24 }}>
            <div style={{ fontSize: 26, fontWeight: "bold", color: colors.success, marginBottom: 16, textAlign: "center" }}>
              본체 일체형 3종 노즐
            </div>

            {[
              { name: "고압 분사 노즐", desc: "오염물 1차 제거", icon: "&#128167;" },
              { name: "부채꼴 세정 노즐", desc: "세정액 도포", icon: "&#127754;" },
              { name: "린스 노즐", desc: "마무리 헹굼", icon: "&#128166;" },
            ].map((nozzle, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 16px",
                  backgroundColor: `${colors.success}10`,
                  borderRadius: 12,
                  marginBottom: 10,
                  opacity: fadeIn(frame, 80 + i * 40, 20),
                  transform: `translateX(${slideLeft(frame, 80 + i * 40, 20, 20)}px)`,
                }}
              >
                <span style={{ fontSize: 32 }} dangerouslySetInnerHTML={{ __html: nozzle.icon }} />
                <div>
                  <div style={{ fontSize: 22, fontWeight: "bold", color: colors.white }}>{nozzle.name}</div>
                  <div style={{ fontSize: 17, color: colors.gray[400] }}>{nozzle.desc}</div>
                </div>
              </div>
            ))}

            {/* Comparison table */}
            <div style={{ marginTop: 16, opacity: fadeIn(frame, 250, 25) }}>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1, textAlign: "center", padding: 12, backgroundColor: `${colors.danger}15`, borderRadius: 10 }}>
                  <div style={{ fontSize: 16, color: colors.danger, marginBottom: 6 }}>드론 분사</div>
                  <div style={{ fontSize: 18, color: colors.gray[300] }}>부품 다수 / 풍속 취약</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 28, color: colors.success }}>&#10140;</span>
                </div>
                <div style={{ flex: 1, textAlign: "center", padding: 12, backgroundColor: `${colors.success}15`, borderRadius: 10 }}>
                  <div style={{ fontSize: 16, color: colors.success, marginBottom: 6 }}>본체 일체형</div>
                  <div style={{ fontSize: 18, color: colors.white, fontWeight: "bold" }}>노즐 3개 / 풍속 무관</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Improvement 2: Guide Wheel */}
        <div style={{ flex: 1, opacity: fadeIn(frame, 60, 30) }}>
          <Card width="100%" borderColor={colors.success} style={{ padding: 24 }}>
            <div style={{ fontSize: 26, fontWeight: "bold", color: colors.success, marginBottom: 16, textAlign: "center" }}>
              스프링 가압 가이드 휠
            </div>

            {/* Wheel diagram */}
            <div
              style={{
                padding: 16,
                backgroundColor: `${colors.bg.dark}`,
                borderRadius: 14,
                marginBottom: 14,
                textAlign: "center",
                opacity: fadeIn(frame, 120, 25),
              }}
            >
              <div style={{ fontSize: 16, color: colors.gray[400], marginBottom: 8 }}>벽면 밀착 구조</div>
              <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.success, lineHeight: 1.6 }}>
                {"벽면 ║ ◉ 가이드 휠 (상부 2개)"}<br />
                {"     ║  ↕ 스프링 가압"}<br />
                {"     ║ ◉ 가이드 휠 (하부 2개)"}<br />
                {"     ║ [브러시/스퀴지 작업면]"}
              </div>
            </div>

            {[
              { label: "젖은 표면", value: "영향 없음 (기계적 가압)", icon: "&#10003;" },
              { label: "비평탄 표면", value: "스프링 자동 적응", icon: "&#10003;" },
              { label: "이동 속도", value: "연속 이동 가능", icon: "&#10003;" },
              { label: "벽면 자국", value: "없음", icon: "&#10003;" },
              { label: "에너지", value: "진공 펌프 불필요", icon: "&#10003;" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderBottom: i < 4 ? `1px solid ${colors.gray[700]}40` : "none",
                  opacity: fadeIn(frame, 200 + i * 30, 20),
                }}
              >
                <span style={{ fontSize: 18, color: colors.gray[400] }}>{item.label}</span>
                <span style={{ fontSize: 18, color: colors.success, fontWeight: "bold" }}>
                  <span dangerouslySetInnerHTML={{ __html: item.icon }} /> {item.value}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 7: SOLUTION - SAFETY ============
const Scene07SolutionSafety: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/wall-robot/scene07_solution_safety.mp3")} />
      <SuccessBackground />
      <Particles count={12} color={colors.success} />

      <div
        style={{
          position: "absolute",
          top: "4%",
          left: 80,
          opacity: fadeIn(frame, 10, 25),
        }}
      >
        <SectionLabel number="&#10003;" title="핵심 개선 2: 안전 시스템 강화" color={colors.success} />
      </div>

      <div
        style={{
          position: "absolute",
          top: "14%",
          left: "3%",
          right: "3%",
          display: "flex",
          gap: 24,
        }}
      >
        {/* Triple rope system */}
        <div style={{ flex: 1, opacity: fadeIn(frame, 40, 30) }}>
          <Card width="100%" borderColor={colors.primary} style={{ padding: 24 }}>
            <div style={{ fontSize: 26, fontWeight: "bold", color: colors.primary, marginBottom: 16, textAlign: "center" }}>
              이중 로프 + 안전 와이어
            </div>

            <div
              style={{
                padding: 16,
                backgroundColor: `${colors.bg.dark}`,
                borderRadius: 14,
                marginBottom: 16,
                textAlign: "center",
                fontFamily: "monospace",
                fontSize: 17,
                lineHeight: 1.7,
                color: colors.primary,
                opacity: fadeIn(frame, 60, 25),
              }}
            >
              {"      윈치 유닛"}<br />
              {"     ╱    │    ╲"}<br />
              {"  로프A  안전W  로프B"}<br />
              {"   │     │     │"}<br />
              {"  ┌┴─────┴─────┴┐"}<br />
              {"  │  로봇 본체   │"}<br />
              {"  └─────────────┘"}
            </div>

            {[
              { name: "로프 A (좌)", role: "주 현수 + 전원/통신", color: colors.primary },
              { name: "로프 B (우)", role: "주 현수 + 급수호스", color: colors.primary },
              { name: "안전 와이어", role: "독립 안전 (폴-어레스터)", color: colors.accent },
            ].map((rope, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  backgroundColor: `${rope.color}10`,
                  borderRadius: 10,
                  marginBottom: 8,
                  opacity: fadeIn(frame, 120 + i * 35, 20),
                }}
              >
                <span style={{ fontSize: 19, fontWeight: "bold", color: rope.color }}>{rope.name}</span>
                <span style={{ fontSize: 17, color: colors.gray[300] }}>{rope.role}</span>
              </div>
            ))}

            <div
              style={{
                marginTop: 14,
                padding: "14px 18px",
                backgroundColor: `${colors.success}12`,
                borderRadius: 12,
                border: `1px solid ${colors.success}40`,
                textAlign: "center",
                opacity: fadeIn(frame, 280, 25),
              }}
            >
              <span style={{ fontSize: 20, color: colors.success, fontWeight: "bold" }}>
                &#128737; 메인 로프 2개 파단 시에도 추락 방지
              </span>
            </div>
          </Card>
        </div>

        {/* Environment response */}
        <div style={{ flex: 1, opacity: fadeIn(frame, 60, 30) }}>
          <Card width="100%" borderColor={colors.accent} style={{ padding: 24 }}>
            <div style={{ fontSize: 26, fontWeight: "bold", color: colors.accent, marginBottom: 16, textAlign: "center" }}>
              환경 자동 대응 시스템
            </div>

            {[
              { sensor: "풍속계", condition: "10 m/s 이상", action: "자동 일시정지", icon: "&#127744;", color: colors.warning },
              { sensor: "풍속계", condition: "15 m/s 이상", action: "자동 회수", icon: "&#127744;", color: colors.danger },
              { sensor: "우적 센서", condition: "감지 시", action: "작업 중단, 자동 회수", icon: "&#127783;", color: colors.primary },
              { sensor: "온도 센서", condition: "0°C 이하", action: "히터 가동 / 작업 중단", icon: "&#10052;", color: colors.secondary },
              { sensor: "온도 센서", condition: "40°C 이상", action: "냉각 팬 강제 가동", icon: "&#128293;", color: colors.danger },
              { sensor: "LiDAR", condition: "범위 이탈", action: "Z축 자동 보정", icon: "&#128225;", color: colors.success },
            ].map((env, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 12px",
                  borderBottom: i < 5 ? `1px solid ${colors.gray[700]}30` : "none",
                  opacity: fadeIn(frame, 100 + i * 30, 20),
                }}
              >
                <span style={{ fontSize: 24, width: 32 }} dangerouslySetInnerHTML={{ __html: env.icon }} />
                <span style={{ fontSize: 16, color: colors.gray[400], width: 90 }}>{env.condition}</span>
                <span style={{ fontSize: 18, color: env.color, fontWeight: "bold" }}>&#10140; {env.action}</span>
              </div>
            ))}

            <div
              style={{
                marginTop: 16,
                padding: "14px 18px",
                backgroundColor: `${colors.accent}12`,
                borderRadius: 12,
                border: `1px solid ${colors.accent}40`,
                textAlign: "center",
                opacity: fadeIn(frame, 350, 25),
              }}
            >
              <span style={{ fontSize: 20, color: colors.accent, fontWeight: "bold" }}>
                &#9888; 현장 작업자의 안전이 최우선
              </span>
            </div>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 8: SOLUTION - CLEANING ============
const Scene08SolutionCleaning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stages = [
    {
      num: "1",
      title: "고압 분사",
      desc: "오염물 1차 제거 (물리적 수압)",
      icon: "&#128167;",
      color: colors.primary,
    },
    {
      num: "2",
      title: "회전 브러시",
      desc: "세정액 + 브러시 마찰 (화학+물리)",
      icon: "&#128259;",
      color: colors.success,
    },
    {
      num: "3",
      title: "스퀴지 + 오수 흡입",
      desc: "잔여수 제거 + 오수 회수",
      icon: "&#128163;",
      color: colors.accent,
    },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/wall-robot/scene08_solution_cleaning.mp3")} />
      <SuccessBackground />
      <Particles count={12} color={colors.success} />

      <div
        style={{
          position: "absolute",
          top: "4%",
          left: 80,
          opacity: fadeIn(frame, 10, 25),
        }}
      >
        <SectionLabel number="&#10003;" title="핵심 개선 3: 3단계 청소 + 분산 AI" color={colors.success} />
      </div>

      <div
        style={{
          position: "absolute",
          top: "14%",
          left: "3%",
          right: "3%",
          display: "flex",
          gap: 24,
        }}
      >
        {/* 3-stage cleaning */}
        <div style={{ flex: 1.1, opacity: fadeIn(frame, 40, 30) }}>
          <Card width="100%" borderColor={colors.success} style={{ padding: 24 }}>
            <div style={{ fontSize: 26, fontWeight: "bold", color: colors.success, marginBottom: 20, textAlign: "center" }}>
              3단계 원패스 청소 시스템
            </div>

            {stages.map((stage, i) => (
              <div
                key={i}
                style={{
                  opacity: fadeIn(frame, 60 + i * 60, 25),
                  transform: `translateY(${slideUp(frame, 60 + i * 60, 25, 20)}px)`,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "18px 20px",
                    backgroundColor: `${stage.color}12`,
                    borderRadius: 14,
                    border: `1px solid ${stage.color}40`,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${stage.color}, ${stage.color}80)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 26, fontWeight: "bold", color: colors.white }}>{stage.num}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: "bold", color: colors.white, marginBottom: 4 }}>{stage.title}</div>
                    <div style={{ fontSize: 18, color: colors.gray[300] }}>{stage.desc}</div>
                  </div>
                  <span style={{ fontSize: 36, marginLeft: "auto" }} dangerouslySetInnerHTML={{ __html: stage.icon }} />
                </div>
                {i < 2 && (
                  <div style={{ textAlign: "center", padding: "4px 0" }}>
                    <span style={{ fontSize: 20, color: colors.gray[500] }}>&#9660;</span>
                  </div>
                )}
              </div>
            ))}

            <div
              style={{
                marginTop: 10,
                padding: "14px 18px",
                backgroundColor: `${colors.success}12`,
                borderRadius: 12,
                textAlign: "center",
                opacity: fadeIn(frame, 300, 25),
              }}
            >
              <span style={{ fontSize: 20, color: colors.success, fontWeight: "bold" }}>
                &#10003; 1회 하강으로 분사→세정→건조 완료
              </span>
            </div>
          </Card>
        </div>

        {/* Distributed AI */}
        <div style={{ flex: 0.9, opacity: fadeIn(frame, 60, 30) }}>
          <Card width="100%" borderColor={colors.secondary} style={{ padding: 24 }}>
            <div style={{ fontSize: 26, fontWeight: "bold", color: colors.secondary, marginBottom: 20, textAlign: "center" }}>
              분산 AI 처리 아키텍처
            </div>

            {/* Edge AI */}
            <div
              style={{
                padding: "16px 18px",
                backgroundColor: `${colors.primary}12`,
                borderRadius: 12,
                border: `1px solid ${colors.primary}40`,
                marginBottom: 12,
                opacity: fadeIn(frame, 150, 25),
              }}
            >
              <div style={{ fontSize: 20, fontWeight: "bold", color: colors.primary, marginBottom: 8 }}>
                &#129302; 로봇 (엣지 AI)
              </div>
              <div style={{ fontSize: 17, color: colors.gray[300], marginBottom: 4 }}>&#8226; 장애물 감지 (실시간)</div>
              <div style={{ fontSize: 17, color: colors.gray[300], marginBottom: 4 }}>&#8226; 긴급 정지 판단</div>
              <div style={{ fontSize: 17, color: colors.gray[300] }}>&#8226; 벽면 거리 유지</div>
              <div style={{ fontSize: 15, color: colors.primary, marginTop: 8 }}>&#9201; 응답 &lt; 50ms</div>
            </div>

            <div style={{ textAlign: "center", padding: "4px 0" }}>
              <span style={{ fontSize: 18, color: colors.gray[500] }}>&#9474; Ethernet &#9474;</span>
            </div>

            {/* Control PC */}
            <div
              style={{
                padding: "16px 18px",
                backgroundColor: `${colors.secondary}12`,
                borderRadius: 12,
                border: `1px solid ${colors.secondary}40`,
                marginBottom: 12,
                opacity: fadeIn(frame, 220, 25),
              }}
            >
              <div style={{ fontSize: 20, fontWeight: "bold", color: colors.secondary, marginBottom: 8 }}>
                &#128187; 제어 PC (GPU)
              </div>
              <div style={{ fontSize: 17, color: colors.gray[300], marginBottom: 4 }}>&#8226; 오염도 맵 생성</div>
              <div style={{ fontSize: 17, color: colors.gray[300], marginBottom: 4 }}>&#8226; 청소 경로 최적화</div>
              <div style={{ fontSize: 17, color: colors.gray[300] }}>&#8226; 전후 비교 리포트</div>
              <div style={{ fontSize: 15, color: colors.secondary, marginTop: 8 }}>&#9201; 응답 &lt; 2초</div>
            </div>

            {/* Communication */}
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: `${colors.bg.dark}`,
                borderRadius: 12,
                opacity: fadeIn(frame, 300, 25),
              }}
            >
              <div style={{ fontSize: 18, fontWeight: "bold", color: colors.white, marginBottom: 8, textAlign: "center" }}>통신 이중화</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                {["RS485 (제어)", "CAN (백업)", "Ethernet (영상)"].map((t, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 14,
                      padding: "5px 12px",
                      backgroundColor: `${colors.primary}15`,
                      borderRadius: 8,
                      color: colors.gray[300],
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 9: COMPARISON ============
const Scene09Comparison: React.FC = () => {
  const frame = useCurrentFrame();

  const comparisons = [
    { label: "세정액 분사", before: "유선 드론", after: "본체 일체형 노즐 (복잡성 60%↓)" },
    { label: "벽면 고정", before: "빨판 (흡착)", after: "스프링 가이드 휠 (표면 제한 해소)" },
    { label: "현수 방식", before: "단일 로프", after: "이중 로프 + 안전 와이어 (3중화)" },
    { label: "레일 설치", before: "H-빔 고정 (수 일)", after: "모듈형 클램프 (수 시간, 재사용)" },
    { label: "통신", before: "RS485 단일", after: "RS485 + CAN + Ethernet 이중화" },
    { label: "청소 방식", before: "롤러 단일", after: "3단계 원패스 + 오수 회수" },
    { label: "AI 처리", before: "로봇 단독", after: "엣지 + 제어PC 분산 처리" },
    { label: "환경 대응", before: "없음", after: "풍속/우천/온도 자동 대응" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/wall-robot/scene09_comparison.mp3")} />
      <AnimatedBackground color1="#0a0f1e" color2="#1a1a3e" color3="#0a0f1e" />
      <Particles count={12} />

      <div
        style={{
          position: "absolute",
          top: "4%",
          left: 80,
          opacity: fadeIn(frame, 10, 25),
        }}
      >
        <SectionLabel number="VS" title="개선 전후 비교" color={colors.accent} />
      </div>

      {/* Header row */}
      <div
        style={{
          position: "absolute",
          top: "13%",
          left: "4%",
          right: "4%",
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: fadeIn(frame, 30, 20),
        }}
      >
        <div style={{ width: 200, textAlign: "right" }} />
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 22,
            fontWeight: "bold",
            color: colors.danger,
            padding: "8px 0",
          }}
        >
          &#10006; 원본 컨셉
        </div>
        <div style={{ width: 40 }} />
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 22,
            fontWeight: "bold",
            color: colors.success,
            padding: "8px 0",
          }}
        >
          &#10003; 개선 시스템
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "4%",
          right: "4%",
        }}
      >
        {comparisons.map((comp, i) => (
          <CompareRow
            key={i}
            label={comp.label}
            before={comp.before}
            after={comp.after}
            frame={frame}
            delay={40 + i * 30}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 10: CLOSING ============
const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/wall-robot/scene10_closing.mp3")} />
      <AnimatedBackground color1="#0a0f1e" color2="#0c4a6e" color3="#0a0f1e" />
      <Particles count={20} />

      {/* Core message */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 20, 35),
          transform: `translateY(${slideUp(frame, 20, 35)}px)`,
        }}
      >
        <GlowText fontSize={56} glowColor={colors.primary}>
          안전 위험 제거
        </GlowText>
        <div style={{ marginTop: 14 }}>
          <span style={{ fontSize: 36, color: colors.gray[300] }}>
            + 복잡성 감소 + 신뢰성 향상
          </span>
        </div>
      </div>

      {/* Three pillars */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "8%",
          right: "8%",
          display: "flex",
          gap: 30,
          justifyContent: "center",
        }}
      >
        {[
          { icon: "&#128737;", title: "현장 안전", desc: "3중 안전 구조\n환경 자동 대응", color: colors.success },
          { icon: "&#9881;", title: "구조 단순화", desc: "드론 제거\n일체형 설계", color: colors.primary },
          { icon: "&#128200;", title: "운용 효율", desc: "1패스 청소\n분산 AI", color: colors.accent },
        ].map((pillar, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 80 + i * 40, 30),
              transform: `scale(${scaleIn(frame, fps, 80 + i * 40)})`,
            }}
          >
            <Card width={320} borderColor={pillar.color} style={{ padding: 28, textAlign: "center" }}>
              <span style={{ fontSize: 48 }} dangerouslySetInnerHTML={{ __html: pillar.icon }} />
              <div
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: pillar.color,
                  marginTop: 12,
                  marginBottom: 10,
                }}
              >
                {pillar.title}
              </div>
              <div style={{ fontSize: 20, color: colors.gray[300], whiteSpace: "pre-line", lineHeight: 1.5 }}>
                {pillar.desc}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Company */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 300, 30),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 60px",
            backgroundColor: `${colors.bg.mid}dd`,
            borderRadius: 16,
            border: `1px solid ${colors.primary}40`,
          }}
        >
          <div style={{ fontSize: 36, fontWeight: "bold", color: colors.white, marginBottom: 6 }}>
            대덕휴비즈
          </div>
          <div style={{ fontSize: 22, color: colors.primary, letterSpacing: 2 }}>
            DAIDUCK HUBIZ
          </div>
          <div style={{ fontSize: 18, color: colors.gray[400], marginTop: 8 }}>
            감사합니다
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const WallRobotVideo: React.FC = () => {
  const T = SCENE_TIMINGS;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark, fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}>
      <Sequence from={T.scene01_opening.start} durationInFrames={T.scene01_opening.duration}>
        <Scene01Opening />
      </Sequence>
      <Sequence from={T.scene02_current.start} durationInFrames={T.scene02_current.duration}>
        <Scene02Current />
      </Sequence>
      <Sequence from={T.scene03_risk_drone.start} durationInFrames={T.scene03_risk_drone.duration}>
        <Scene03RiskDrone />
      </Sequence>
      <Sequence from={T.scene04_risk_safety.start} durationInFrames={T.scene04_risk_safety.duration}>
        <Scene04RiskSafety />
      </Sequence>
      <Sequence from={T.scene05_risk_others.start} durationInFrames={T.scene05_risk_others.duration}>
        <Scene05RiskOthers />
      </Sequence>
      <Sequence from={T.scene06_solution_core.start} durationInFrames={T.scene06_solution_core.duration}>
        <Scene06SolutionCore />
      </Sequence>
      <Sequence from={T.scene07_solution_safety.start} durationInFrames={T.scene07_solution_safety.duration}>
        <Scene07SolutionSafety />
      </Sequence>
      <Sequence from={T.scene08_solution_cleaning.start} durationInFrames={T.scene08_solution_cleaning.duration}>
        <Scene08SolutionCleaning />
      </Sequence>
      <Sequence from={T.scene09_comparison.start} durationInFrames={T.scene09_comparison.duration}>
        <Scene09Comparison />
      </Sequence>
      <Sequence from={T.scene10_closing.start} durationInFrames={T.scene10_closing.duration}>
        <Scene10Closing />
      </Sequence>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};
