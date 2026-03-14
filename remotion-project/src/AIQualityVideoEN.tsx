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

// ============ SCENE TIMINGS (30fps based on English audio) ============
export const SCENE_TIMINGS_EN = {
  scene01_opening: { duration: 801, start: 0 },
  scene02_process: { duration: 1391, start: 801 },
  scene03_quality: { duration: 1444, start: 2192 },
  scene04_human: { duration: 2124, start: 3636 },
  scene05_question: { duration: 516, start: 5760 },
  scene06_ai_target: { duration: 2262, start: 6276 },
  scene07_ai_process: { duration: 2529, start: 8538 },
  scene08_production: { duration: 1966, start: 11067 },
  scene09_summary: { duration: 2619, start: 13033 },
  scene10_closing: { duration: 1293, start: 15652 },
};

export const AI_QUALITY_VIDEO_EN_DURATION = 16945;

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
      {/* Left top UTTEC-Lab logo */}
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
      {/* Right top Korea Machinery Engineering logo */}
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
          alt="Korea Machinery Engineering"
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
      <Audio src={staticFile("audio/ai-quality-en/scene01_opening.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#1e40af" color3="#0f172a" />
      <Particles count={30} />

      {/* Title */}
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
          <GlowText fontSize={80} glowColor={colors.industrial.blue}>AI Quality Management System</GlowText>
        </div>
        <div>
          <span style={{ fontSize: 48, color: colors.gray[300] }}>
            Innovation in Battery Recycling Process
          </span>
        </div>
      </div>

      {/* AI Limitations Emphasis */}
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
              What AI Cannot Do
            </div>
            <div style={{ fontSize: 24, color: colors.gray[300] }}>
              Real-time Chemical Analysis
            </div>
          </div>
        </Card>

        <Card width={500} borderColor={colors.success}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 15 }}>
              <span style={{ color: colors.success }}>O</span>
            </div>
            <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>
              What AI Can Do
            </div>
            <div style={{ fontSize: 24, color: colors.gray[300] }}>
              Real-time Particle Size Management
            </div>
          </div>
        </Card>
      </div>

      {/* Core Message */}
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
            Humans define 'what is good', AI 'maintains' it
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
    { name: "Primary Crushing", icon: "🔨", desc: "Module Disassembly\nLarge Fragments" },
    { name: "Secondary Crushing", icon: "⚙️", desc: "Hammer Crusher\n5-20mm Pieces" },
    { name: "Separation", icon: "🌀", desc: "Impact Mill\nMetal Extraction" },
    { name: "Black Mass", icon: "⚫", desc: "Final Powder\nLi/Co/Ni Content" },
  ];

  const activeStep = Math.min(Math.floor(frame / 250), 3);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality-en/scene02_process.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#4338ca" color3="#0f172a" />
      <Particles count={25} color={colors.industrial.orange} />

      {/* Title */}
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
        <GlowText fontSize={64} glowColor={colors.industrial.orange}>Battery Recycling Process</GlowText>
      </div>

      {/* Process Diagram */}
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
                        fontSize: 26,
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

      {/* Quality Factors */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 700, 40),
        }}
      >
        <Card width={1000} borderColor={colors.primary} style={{ display: "inline-block" }}>
          <div style={{ fontSize: 28, color: colors.white, marginBottom: 15, fontWeight: "bold" }}>
            Factors Affecting Quality
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {["Blade Angle", "Rotation Speed", "Feed Rate", "Temperature", "Humidity", "Pressure"].map((item, i) => (
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
      <Audio src={staticFile("audio/ai-quality-en/scene03_quality.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#7c3aed" color3="#0f172a" />
      <Particles count={20} />

      {/* Title */}
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
        <GlowText fontSize={64} glowColor={colors.secondary}>What is Quality?</GlowText>
      </div>

      {/* Good Quality Definition */}
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
            Good Quality = High Recovery Rate
          </div>
          <div style={{ fontSize: 28, color: colors.gray[100], lineHeight: 1.8 }}>
            Lithium, Cobalt, Nickel, Manganese<br />
            <span style={{ color: colors.accent, fontWeight: "bold" }}>How efficiently can we extract them?</span>
          </div>
        </Card>
      </div>

      {/* ICP Analysis */}
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
              ICP-OES Analysis
            </div>
            <div style={{ fontSize: 22, color: colors.gray[300], lineHeight: 1.6 }}>
              Inductively Coupled Plasma<br />
              Optical Emission Spectrometry
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
                Only Humans Can Perform
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Why AI Cannot */}
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
            Why Can't AI Perform Real-time Analysis?
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>⏱️</div>
              <div style={{ fontSize: 20, color: colors.gray[300] }}>Analysis Time</div>
              <div style={{ fontSize: 24, color: colors.accent, fontWeight: "bold" }}>Several Hours</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🧪</div>
              <div style={{ fontSize: 20, color: colors.gray[300] }}>Preprocessing</div>
              <div style={{ fontSize: 24, color: colors.accent, fontWeight: "bold" }}>Sample Dissolution</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>👨‍🔬</div>
              <div style={{ fontSize: 20, color: colors.gray[300] }}>Expertise</div>
              <div style={{ fontSize: 24, color: colors.accent, fontWeight: "bold" }}>Skilled Personnel</div>
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
    { num: 1, title: "Set Conditions", desc: "Blade angle 45°\nSpeed 500RPM", icon: "⚙️" },
    { num: 2, title: "Collect Sample", desc: "Crushed output\nRepresentative sample", icon: "🧫" },
    { num: 3, title: "ICP Analysis", desc: "Li, Co, Ni, Mn\nContent measurement", icon: "🔬" },
    { num: 4, title: "Calculate Rate", desc: "Target vs\nActual recovery", icon: "📊" },
  ];

  const currentStep = Math.min(Math.floor(frame / 400), 3);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality-en/scene04_human.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#059669" color3="#0f172a" />
      <Particles count={25} color={colors.success} />

      {/* Title */}
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
        <GlowText fontSize={60} glowColor={colors.success}>Human Role: Finding Optimal Conditions</GlowText>
      </div>

      {/* Experiment Cycle Diagram */}
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

      {/* Repeat Emphasis */}
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
            🔄 Repeat this process dozens of times
          </span>
        </div>
      </div>

      {/* Result */}
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
          Optimal condition found: <span style={{ color: colors.success, fontWeight: "bold" }}>94% Recovery Rate</span> achieved
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
      <Audio src={staticFile("audio/ai-quality-en/scene05_question.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#7c3aed" color3="#0f172a" />
      <Particles count={30} color={colors.accent} />

      {/* Question */}
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
          Then, What Does AI Learn?
        </GlowText>
      </div>

      {/* Hint */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 250, 40),
        }}
      >
        <Card width={800} borderColor={colors.secondary} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 36, color: colors.gray[100] }}>
              If it can't learn chemical recovery rate directly...
            </span>
            <br />
            <span style={{ fontSize: 40, color: colors.accent, fontWeight: "bold" }}>
              What should it learn instead?
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
      <Audio src={staticFile("audio/ai-quality-en/scene06_ai_target.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#0284c7" color3="#0f172a" />
      <Particles count={25} />

      {/* Title */}
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
        <GlowText fontSize={60} glowColor={colors.industrial.blue}>What AI Learns: Physical Particle Size</GlowText>
      </div>

      {/* Particle Size Visualization */}
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
            Particle Size Distribution
          </div>
          <ParticleSizeChart frame={frame} />
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: colors.gray[400] }}>D10</div>
              <div style={{ fontSize: 28, color: colors.primary, fontWeight: "bold" }}>5μm</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: colors.gray[400] }}>D50 (Median)</div>
              <div style={{ fontSize: 28, color: colors.success, fontWeight: "bold" }}>15μm</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: colors.gray[400] }}>D90</div>
              <div style={{ fontSize: 28, color: colors.accent, fontWeight: "bold" }}>30μm</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Connection */}
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
              Key Discovery
            </div>
            <div style={{ fontSize: 26, color: colors.white, lineHeight: 1.8, marginBottom: 20 }}>
              At specific particle size distribution<br />
              <span style={{ color: colors.accent, fontWeight: "bold" }}>Recovery rate is highest</span>
            </div>
            <div
              style={{
                padding: "20px 30px",
                backgroundColor: `${colors.success}20`,
                borderRadius: 15,
              }}
            >
              <div style={{ fontSize: 20, color: colors.gray[300], marginBottom: 10 }}>Example</div>
              <div style={{ fontSize: 24, color: colors.white }}>
                D50 = 15μm, Deviation = ±2μm
              </div>
              <div style={{ fontSize: 28, color: colors.success, fontWeight: "bold", marginTop: 10 }}>
                → 94% Recovery Rate
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Laser Diffraction Sensor */}
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
                Laser Diffraction Sensor
              </div>
              <div style={{ fontSize: 24, color: colors.gray[300] }}>
                Real-time particle size measurement → Key data for AI learning
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// Particle Size Chart
const ParticleSizeChart: React.FC<{ frame: number }> = ({ frame }) => {
  const animProgress = Math.min(frame / 60, 1);

  return (
    <svg width="640" height="200" viewBox="0 0 640 200">
      {/* Axes */}
      <line x1="40" y1="170" x2="620" y2="170" stroke={colors.gray[600]} strokeWidth="2" />
      <line x1="40" y1="20" x2="40" y2="170" stroke={colors.gray[600]} strokeWidth="2" />

      {/* Normal Distribution Curve */}
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

      {/* D10, D50, D90 Markers */}
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

      {/* Label */}
      <text x="330" y="195" fill={colors.gray[400]} fontSize="14" textAnchor="middle">Particle Size (μm)</text>
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
      title: "Goal Setting",
      desc: "Human Decision",
      details: ["D10 = 5μm", "D50 = 15μm", "D90 = 30μm", "Std Dev ≤ 8μm"],
      color: colors.success,
    },
    {
      num: 2,
      title: "Data Collection",
      desc: "Input/Output Recording",
      details: ["Blade angle, RPM", "Temp, Humidity, Pressure", "→ D10, D50, D90"],
      color: colors.primary,
    },
    {
      num: 3,
      title: "Model Training",
      desc: "Pattern Recognition",
      details: ["Input → Output Prediction", "Error Minimization", "Relationship Learned"],
      color: colors.secondary,
    },
  ];

  const currentStep = Math.min(Math.floor(frame / 600), 2);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality-en/scene07_ai_process.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#7c3aed" color3="#0f172a" />
      <Particles count={20} />

      {/* Title */}
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
        <GlowText fontSize={56} glowColor={colors.secondary}>AI Learning Process</GlowText>
      </div>

      {/* 3 Steps */}
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

      {/* Result */}
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
              Training Complete: AI understands <span style={{ color: colors.accent, fontWeight: "bold" }}>"Equipment Conditions → Particle Size"</span> relationship
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
      <Audio src={staticFile("audio/ai-quality-en/scene08_production.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#0284c7" color3="#0f172a" />
      <Particles count={25} />

      {/* Title */}
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
        <GlowText fontSize={56} glowColor={colors.industrial.blue}>Production Stage: Real-time Control</GlowText>
      </div>

      {/* Real-time Monitoring Dashboard */}
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
            Real-time Particle Size Monitoring
          </div>

          {/* Gauge */}
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 18, color: colors.gray[400] }}>D50 (Current)</span>
                <span
                  style={{
                    fontSize: 24,
                    color: isOutOfRange ? colors.danger : colors.success,
                    fontWeight: "bold",
                  }}
                >
                  {d50Value.toFixed(1)} μm
                </span>
              </div>

              {/* Range Bar */}
              <div
                style={{
                  height: 30,
                  backgroundColor: colors.gray[800],
                  borderRadius: 15,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Normal Range */}
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
                {/* Current Value Pointer */}
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
                <span style={{ fontSize: 14, color: colors.gray[500] }}>5μm</span>
                <span style={{ fontSize: 14, color: colors.success }}>12-18μm (Target)</span>
                <span style={{ fontSize: 14, color: colors.gray[500] }}>30μm</span>
              </div>
            </div>

            {/* Status Display */}
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

      {/* Feedback Control */}
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
            Automatic Feedback Control
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <FeedbackRule
              condition="D50 > 18μm"
              action="Increase RPM"
              color={colors.danger}
            />
            <FeedbackRule
              condition="D50 < 12μm"
              action="Decrease RPM"
              color={colors.primary}
            />
            <FeedbackRule
              condition="High Deviation"
              action="Blade Inspection Alert"
              color={colors.accent}
            />
          </div>
        </Card>
      </div>

      {/* Key Message */}
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
              AI manages <span style={{ color: colors.industrial.blue, fontWeight: "bold" }}>only physical size</span>
            </div>
            <div style={{ fontSize: 22, color: colors.gray[300] }}>
              Chemical recovery rate is still managed by humans through periodic ICP sampling
            </div>
            <div style={{ fontSize: 24, color: colors.success, marginTop: 15, fontWeight: "bold" }}>
              But consistent particle size → Stable recovery rate (correlation verified)
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// Feedback Rule Component
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
    "Design Initial Experiments",
    "Perform ICP Analysis",
    "Calculate/Evaluate Recovery Rate",
    "Determine Optimal Conditions",
    "Set Target Particle Size for AI",
  ];

  const aiTasks = [
    "Real-time Particle Monitoring",
    "Alert on Deviations",
    "Auto-adjust Equipment",
    "Learn Particle Patterns",
    "Early Anomaly Detection",
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality-en/scene09_summary.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#4338ca" color3="#0f172a" />
      <Particles count={20} />

      {/* Title */}
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
        <GlowText fontSize={56} glowColor={colors.primary}>Role Division Summary</GlowText>
      </div>

      {/* Human vs AI */}
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
        {/* Human */}
        <div style={{ opacity: fadeIn(frame, 60, 40) }}>
          <Card width={550} borderColor={colors.success}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 56 }}>👨‍🔬</span>
              <div style={{ fontSize: 32, color: colors.success, fontWeight: "bold", marginTop: 10 }}>
                What Humans Do
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
                What AI Does
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

      {/* Collaboration Result */}
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
              Humans define <span style={{ color: colors.success }}>"what good quality is"</span>,
              AI <span style={{ color: colors.primary }}>"maintains that quality"</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 36, color: colors.success, fontWeight: "bold" }}>Consistent Quality</span>
              </div>
              <div style={{ fontSize: 36, color: colors.gray[500] }}>+</div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 36, color: colors.primary, fontWeight: "bold" }}>High Productivity</span>
              </div>
              <div style={{ fontSize: 36, color: colors.gray[500] }}>+</div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 36, color: colors.accent, fontWeight: "bold" }}>Low Defect Rate</span>
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
    { value: "40%", label: "Particle Deviation Reduced", color: colors.success },
    { value: "60%", label: "Quality Defects Reduced", color: colors.primary },
    { value: "70%", label: "Manual Inspection Saved", color: colors.secondary },
    { value: "15%", label: "Equipment Utilization Up", color: colors.accent },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/ai-quality-en/scene10_closing.mp3")} />
      <AnimatedBackground color1="#0f172a" color2="#7c3aed" color3="#0f172a" />
      <Particles count={35} color={colors.accent} />

      {/* Title */}
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
        <GlowText fontSize={60} glowColor={colors.accent}>Implementation Benefits</GlowText>
      </div>

      {/* Statistics */}
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

      {/* Core Message */}
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
              AI is <span style={{ color: colors.danger }}>not magic</span>
            </div>
            <div style={{ fontSize: 28, color: colors.gray[300], lineHeight: 1.8 }}>
              It can only learn and manage what is measurable<br />
              But within that scope, <span style={{ color: colors.success }}>AI is faster, more accurate, and tireless</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Closing */}
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
            Human Expertise + AI Management = Best Quality & Efficiency
          </span>
        </div>
      </div>

      {/* Thank You */}
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
          Thank you for watching
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const AIQualityVideoEN: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS_EN.scene01_opening.start} durationInFrames={SCENE_TIMINGS_EN.scene01_opening.duration}>
        <Scene01Opening />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene02_process.start} durationInFrames={SCENE_TIMINGS_EN.scene02_process.duration}>
        <Scene02Process />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene03_quality.start} durationInFrames={SCENE_TIMINGS_EN.scene03_quality.duration}>
        <Scene03Quality />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene04_human.start} durationInFrames={SCENE_TIMINGS_EN.scene04_human.duration}>
        <Scene04Human />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene05_question.start} durationInFrames={SCENE_TIMINGS_EN.scene05_question.duration}>
        <Scene05Question />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene06_ai_target.start} durationInFrames={SCENE_TIMINGS_EN.scene06_ai_target.duration}>
        <Scene06AITarget />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene07_ai_process.start} durationInFrames={SCENE_TIMINGS_EN.scene07_ai_process.duration}>
        <Scene07AIProcess />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene08_production.start} durationInFrames={SCENE_TIMINGS_EN.scene08_production.duration}>
        <Scene08Production />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene09_summary.start} durationInFrames={SCENE_TIMINGS_EN.scene09_summary.duration}>
        <Scene09Summary />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene10_closing.start} durationInFrames={SCENE_TIMINGS_EN.scene10_closing.duration}>
        <Scene10Closing />
      </Sequence>

      {/* Global UTTEC-Lab Logo Overlay */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
