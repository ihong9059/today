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
// Audio lengths: EN Scene 1(23.1s), 2(58.5s), 3(73.3s), 4(38.7s), 5(55.5s), 6(45.7s), 7(48.2s), 8(55.2s), 9(39.4s), 10(41.3s)
export const SCENE_TIMINGS_EN = {
  scene01_opening: { duration: Math.ceil(23.1 * 30) + 30, start: 0 },
  scene02_principles: { duration: Math.ceil(58.5 * 30) + 30, start: 0 },
  scene03_ball_mill: { duration: Math.ceil(73.3 * 30) + 30, start: 0 },
  scene04_vibratory: { duration: Math.ceil(38.7 * 30) + 30, start: 0 },
  scene05_rotor_cutting: { duration: Math.ceil(55.5 * 30) + 30, start: 0 },
  scene06_jaw_disk: { duration: Math.ceil(45.7 * 30) + 30, start: 0 },
  scene07_cup_beater: { duration: Math.ceil(48.2 * 30) + 30, start: 0 },
  scene08_analysis: { duration: Math.ceil(55.2 * 30) + 30, start: 0 },
  scene09_image_divider: { duration: Math.ceil(39.4 * 30) + 30, start: 0 },
  scene10_closing: { duration: Math.ceil(41.3 * 30) + 30, start: 0 },
};

// Calculate start frames
let currentStart = 0;
for (const key of Object.keys(SCENE_TIMINGS_EN) as (keyof typeof SCENE_TIMINGS_EN)[]) {
  SCENE_TIMINGS_EN[key].start = currentStart;
  currentStart += SCENE_TIMINGS_EN[key].duration;
}

export const FRITSCH_VIDEO_EN_DURATION = currentStart;

// ============ COLORS (FRITSCH Style) ============
const colors = {
  bg: {
    dark: "#0F172A",
  },
  primary: "#8B5CF6",
  secondary: "#3B82F6",
  accent: "#F59E0B",
  success: "#10B981",
  danger: "#EF4444",
  white: "#FFFFFF",
  gray: {
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  } as { [key: number]: string },
  fritsch: {
    blue: "#0066B3",
    darkBlue: "#003366",
    orange: "#F5A623",
    green: "#00A86B",
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
const DigitalGridBackground: React.FC<{ color1?: string; color2?: string }> = ({
  color1 = "#0F172A",
  color2 = "#1E3A8A"
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color1} 100%)`,
        }}
      />
      <svg
        style={{ position: "absolute", inset: 0, opacity: 0.15 }}
        width="1920"
        height="1080"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 54}
            x2="1920"
            y2={i * 54}
            stroke={colors.primary}
            strokeWidth="1"
            opacity={0.3 + Math.sin((frame + i * 10) / 30) * 0.2}
          />
        ))}
        {Array.from({ length: 36 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 54}
            y1="0"
            x2={i * 54}
            y2="1080"
            stroke={colors.primary}
            strokeWidth="1"
            opacity={0.3 + Math.sin((frame + i * 15) / 40) * 0.2}
          />
        ))}
      </svg>
      {[0, 1, 2].map((i) => {
        const x = 400 + Math.sin((frame + i * 100) / 80) * 400;
        const y = 300 + Math.cos((frame + i * 100) / 60) * 250;
        const size = 300 + i * 100;

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
              background: `radial-gradient(circle, ${colors.primary}25 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const NanoParticles: React.FC<{ count?: number; color?: string }> = ({ count = 30, color = colors.white }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = (i * 137.5) % 1920;
        const baseY = (i * 73.7) % 1080;
        const speed = 0.2 + (i % 5) * 0.15;
        const size = 2 + (i % 5) * 1.5;

        const x = baseX + Math.sin((frame * speed + i * 50) / 40) * 40;
        const y = (baseY + frame * speed * 0.5) % 1200 - 60;
        const opacity = 0.1 + Math.sin((frame + i * 20) / 30) * 0.1;

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
              boxShadow: `0 0 ${size * 2}px ${color}`,
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
            padding: "10px 20px",
            background: `linear-gradient(135deg, ${colors.fritsch.blue} 0%, ${colors.fritsch.darkBlue} 100%)`,
            borderRadius: 8,
            boxShadow: `0 4px 15px ${colors.fritsch.blue}60`,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: colors.white,
              fontFamily: "Orbitron, sans-serif",
              letterSpacing: 2,
            }}
          >
            FRITSCH
          </span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 35,
          right: 40,
          zIndex: 1000,
          opacity: logoOpacity,
        }}
      >
        <span
          style={{
            fontSize: 18,
            color: colors.gray[400],
            fontFamily: "Orbitron, sans-serif",
            letterSpacing: 1,
          }}
        >
          Made in Germany
        </span>
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
      fontFamily: "Orbitron, sans-serif",
      textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}60`,
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
}> = ({ children, width = 400, borderColor = colors.primary, glow = true, style = {} }) => (
  <div
    style={{
      width,
      padding: 30,
      backgroundColor: `${colors.gray[900]}ee`,
      borderRadius: 20,
      border: `2px solid ${borderColor}`,
      boxShadow: glow ? `0 0 30px ${borderColor}40, 0 15px 40px rgba(0,0,0,0.5)` : "0 15px 40px rgba(0,0,0,0.5)",
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

  const logoScale = scaleIn(frame, fps, 20);
  const pulseScale = 1 + Math.sin(frame / 15) * 0.03;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-en/fritsch_en_scene01_opening.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#1E3A8A" />
      <NanoParticles count={40} color={colors.primary} />

      <div
        style={{
          position: "absolute",
          top: "25%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 20, 40),
          transform: `scale(${logoScale * pulseScale})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 80px",
            background: `linear-gradient(135deg, ${colors.fritsch.blue} 0%, ${colors.fritsch.darkBlue} 100%)`,
            borderRadius: 20,
            boxShadow: `0 0 60px ${colors.primary}60, 0 20px 60px rgba(0,0,0,0.5)`,
          }}
        >
          <span
            style={{
              fontSize: 96,
              fontWeight: "bold",
              color: colors.white,
              fontFamily: "Orbitron, sans-serif",
              letterSpacing: 8,
            }}
          >
            FRITSCH
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 80, 40),
          transform: `translateY(${slideUp(frame, 80, 40)}px)`,
        }}
      >
        <GlowText fontSize={60} glowColor={colors.primary}>
          The Pinnacle of Nano-Scale Milling
        </GlowText>
      </div>

      <div
        style={{
          position: "absolute",
          top: "65%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 150, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "15px 50px",
            border: `2px solid ${colors.fritsch.orange}`,
            borderRadius: 40,
          }}
        >
          <span
            style={{
              fontSize: 36,
              color: colors.fritsch.orange,
              fontFamily: "Orbitron, sans-serif",
              letterSpacing: 3,
            }}
          >
            Made in Germany
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 250, 40),
        }}
      >
        <span style={{ fontSize: 28, color: colors.gray[400] }}>
          Distributed in Korea by <span style={{ color: colors.white, fontWeight: "bold" }}>Taemyung Science</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: MILLING PRINCIPLES ============
const Scene02Principles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const principles = [
    { name: "Pressure", icon: "⬇️", equipment: "Jaw Crusher", color: colors.danger },
    { name: "Impact", icon: "💥", equipment: "Ball Mill, Cup Mill", color: colors.fritsch.orange },
    { name: "Friction", icon: "🔄", equipment: "Mortar Grinder, Disk Mill", color: colors.success },
    { name: "Shearing", icon: "✂️", equipment: "Fixed/Moving surfaces", color: colors.secondary },
    { name: "Cutting", icon: "🔪", equipment: "Cutting Mill, Knife Mill", color: colors.primary },
  ];

  const activeIndex = Math.min(Math.floor(frame / 300), 4);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-en/fritsch_en_scene02_principles.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#312E81" />
      <NanoParticles count={25} />

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
        <GlowText fontSize={56} glowColor={colors.primary}>Five Principles of Milling</GlowText>
      </div>

      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 25,
          padding: "0 60px",
        }}
      >
        {principles.map((principle, i) => {
          const delay = 60 + i * 150;
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;

          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 30),
                transform: `scale(${scaleIn(frame, fps, delay)})`,
              }}
            >
              <Card
                width={320}
                borderColor={isActive ? principle.color : colors.gray[700]}
                style={{
                  backgroundColor: isCurrent ? `${principle.color}15` : `${colors.gray[900]}ee`,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 10 }}>{principle.icon}</div>
                  <div
                    style={{
                      fontSize: 28,
                      color: isActive ? principle.color : colors.gray[500],
                      fontWeight: "bold",
                      fontFamily: "Orbitron, sans-serif",
                    }}
                  >
                    {principle.name}
                  </div>
                  <div
                    style={{
                      padding: "10px 15px",
                      backgroundColor: colors.gray[800],
                      borderRadius: 10,
                      fontSize: 14,
                      color: isActive ? colors.gray[300] : colors.gray[600],
                      marginTop: 15,
                    }}
                  >
                    {principle.equipment}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

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
        <Card width={900} borderColor={colors.primary} style={{ display: "inline-block" }}>
          <span style={{ fontSize: 26, color: colors.gray[100] }}>
            Understanding milling principles helps you choose the <span style={{ color: colors.primary, fontWeight: "bold" }}>optimal equipment</span>
          </span>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: HIGH-ENERGY BALL MILL ============
const Scene03BallMill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotationAngle = frame * 2;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-en/fritsch_en_scene03_ball_mill.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#1E40AF" />
      <NanoParticles count={30} color={colors.secondary} />

      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={52} glowColor={colors.secondary}>High-Energy Ball Mill</GlowText>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 24, color: colors.gray[400] }}>Planetary Ball Mill - FRITSCH Flagship Product</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 80,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={500} borderColor={colors.secondary}>
          <div style={{ fontSize: 26, color: colors.white, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
            Operating Principle
          </div>
          <svg width="440" height="200" viewBox="0 0 440 200">
            <circle
              cx="220"
              cy="100"
              r="80"
              fill="none"
              stroke={colors.gray[600]}
              strokeWidth="3"
              strokeDasharray="10,5"
            />
            <g transform={`rotate(${rotationAngle}, 220, 100)`}>
              <circle cx="220" cy="100" r="70" fill="none" stroke={colors.secondary} strokeWidth="2" />
              <polygon points="290,100 280,95 280,105" fill={colors.secondary} />
            </g>
            <g transform={`rotate(${-rotationAngle * 1.5}, 160, 100)`}>
              <circle cx="160" cy="100" r="25" fill={colors.primary} opacity="0.5" />
              <circle cx="160" cy="100" r="20" fill="none" stroke={colors.primary} strokeWidth="2" />
            </g>
            <g transform={`rotate(${-rotationAngle * 1.5}, 280, 100)`}>
              <circle cx="280" cy="100" r="25" fill={colors.primary} opacity="0.5" />
              <circle cx="280" cy="100" r="20" fill="none" stroke={colors.primary} strokeWidth="2" />
            </g>
            <text x="220" y="195" fill={colors.gray[300]} fontSize="14" textAnchor="middle">Main-disk revolution / Bowl rotation</text>
          </svg>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: 15 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, color: colors.fritsch.orange, fontWeight: "bold" }}>95G</div>
              <div style={{ fontSize: 14, color: colors.gray[400] }}>Gravitational Acceleration</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, color: colors.success, fontWeight: "bold" }}>1,100 RPM</div>
              <div style={{ fontSize: 14, color: colors.gray[400] }}>Max Speed</div>
            </div>
          </div>
        </Card>
      </div>

      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 80,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        <Card width={550} borderColor={colors.primary}>
          <div style={{ fontSize: 22, color: colors.primary, fontWeight: "bold", marginBottom: 15 }}>
            PULVERISETTE 5, 6, 7 Premium
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 18, color: colors.gray[300], marginBottom: 8 }}>Dry Grinding</div>
              <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>Within 5 μm</div>
            </div>
            <div>
              <div style={{ fontSize: 18, color: colors.gray[300], marginBottom: 8 }}>Wet Grinding</div>
              <div style={{ fontSize: 24, color: colors.success, fontWeight: "bold" }}>0.1 μm (Nano)</div>
            </div>
          </div>
        </Card>

        <Card width={550} borderColor={colors.gray[600]}>
          <div style={{ fontSize: 20, color: colors.white, marginBottom: 15 }}>
            Various Bowl/Ball Materials
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Agate", "Zirconium Oxide", "Tungsten Carbide", "Stainless Steel"].map((material, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 16px",
                  backgroundColor: colors.gray[800],
                  borderRadius: 8,
                  fontSize: 14,
                  color: colors.gray[300],
                  border: `1px solid ${colors.gray[700]}`,
                }}
              >
                {material}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 15, fontSize: 16, color: colors.success }}>
            → Minimizes sample contamination
          </div>
        </Card>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 600, 40),
        }}
      >
        <Card width={1000} borderColor={colors.fritsch.orange} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 28, color: colors.white }}>
              Over{" "}
              <span style={{ color: colors.fritsch.orange, fontWeight: "bold", fontSize: 36 }}>1,000 units</span> installed in Korea
            </span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: VIBRATORY BALL MILL ============
const Scene04Vibratory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const vibrationY = Math.sin(frame / 3) * 5;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-en/fritsch_en_scene04_vibratory.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#065F46" />
      <NanoParticles count={25} color={colors.success} />

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
        <GlowText fontSize={56} glowColor={colors.success}>Vibratory Ball Mill</GlowText>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 24, color: colors.gray[400] }}>Vertical Vibration Milling Equipment</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        <div style={{ opacity: fadeIn(frame, 60, 40) }}>
          <Card width={450} borderColor={colors.success}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>Operating Mechanism</span>
            </div>
            <svg width="390" height="180" viewBox="0 0 390 180">
              <g transform={`translate(0, ${vibrationY})`}>
                <rect x="95" y="50" width="200" height="80" rx="15" fill={colors.gray[700]} stroke={colors.success} strokeWidth="2" />
                <circle cx="145" cy="90" r="12" fill={colors.success} opacity="0.8" />
                <circle cx="195" cy="85" r="15" fill={colors.success} opacity="0.6" />
                <circle cx="245" cy="95" r="10" fill={colors.success} opacity="0.9" />
              </g>
              <line x1="195" y1="145" x2="195" y2="170" stroke={colors.success} strokeWidth="2" markerEnd="url(#arrowEN)" />
              <line x1="195" y1="40" x2="195" y2="15" stroke={colors.success} strokeWidth="2" markerEnd="url(#arrowEN)" />
              <defs>
                <marker id="arrowEN" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill={colors.success} />
                </marker>
              </defs>
              <text x="195" y="178" fill={colors.gray[400]} fontSize="12" textAnchor="middle">Vertical Vibration</text>
            </svg>
          </Card>
        </div>

        <div style={{ opacity: fadeIn(frame, 150, 40) }}>
          <Card width={550} borderColor={colors.primary}>
            <div style={{ fontSize: 24, color: colors.primary, fontWeight: "bold", marginBottom: 20 }}>
              PULVERISETTE 23
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <span style={{ fontSize: 32 }}>🧪</span>
                <div>
                  <div style={{ fontSize: 18, color: colors.gray[400] }}>Grinding Bowl</div>
                  <div style={{ fontSize: 22, color: colors.white }}>5, 10, 15 ml</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <span style={{ fontSize: 32 }}>❄️</span>
                <div>
                  <div style={{ fontSize: 18, color: colors.gray[400] }}>Cryogenic Grinding</div>
                  <div style={{ fontSize: 22, color: colors.white }}>With Liquid Nitrogen</div>
                </div>
              </div>
              <div
                style={{
                  padding: "15px 20px",
                  backgroundColor: `${colors.success}20`,
                  borderRadius: 12,
                  marginTop: 10,
                }}
              >
                <div style={{ fontSize: 18, color: colors.success, marginBottom: 10, fontWeight: "bold" }}>Applications</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Hair", "Bone", "Teeth", "LCD Glass", "Camera", "Keypad"].map((item, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "5px 12px",
                        backgroundColor: colors.gray[800],
                        borderRadius: 6,
                        fontSize: 14,
                        color: colors.gray[200],
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

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
        <span style={{ fontSize: 24, color: colors.gray[300] }}>
          Optimized for <span style={{ color: colors.success }}>small samples (3ml or less)</span> |{" "}
          Essential for <span style={{ color: colors.fritsch.orange }}>RoHS analysis</span> of electronic waste
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: ROTOR & CUTTING MILL ============
const Scene05RotorCutting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotorAngle = frame * 4;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-en/fritsch_en_scene05_rotor_cutting.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#7C2D12" />
      <NanoParticles count={25} color={colors.fritsch.orange} />

      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={52} glowColor={colors.fritsch.orange}>Rotor Mill & Cutting Mill</GlowText>
      </div>

      <div
        style={{
          position: "absolute",
          top: "16%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        <div style={{ opacity: fadeIn(frame, 60, 40), transform: `scale(${scaleIn(frame, fps, 60)})` }}>
          <Card width={520} borderColor={colors.fritsch.orange}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div style={{ fontSize: 22, color: colors.fritsch.orange, fontWeight: "bold" }}>PULVERISETTE 14</div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Rotor Mill</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 15 }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke={colors.gray[700]} strokeWidth="2" />
                <g transform={`rotate(${rotorAngle}, 60, 60)`}>
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <rect
                      key={i}
                      x="55"
                      y="15"
                      width="10"
                      height="25"
                      fill={colors.fritsch.orange}
                      transform={`rotate(${angle}, 60, 60)`}
                      rx="2"
                    />
                  ))}
                </g>
              </svg>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>6,000-20,000</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>RPM</div>
              </div>
            </div>
            <div style={{ padding: "12px", backgroundColor: colors.gray[800], borderRadius: 10 }}>
              <div style={{ fontSize: 16, color: colors.gray[300], marginBottom: 8 }}>Suitable Samples</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["PVC", "PP", "PE", "Rubber", "Polymer"].map((item, i) => (
                  <span key={i} style={{ padding: "4px 10px", backgroundColor: colors.gray[700], borderRadius: 4, fontSize: 13, color: colors.gray[200] }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div style={{ opacity: fadeIn(frame, 200, 40), transform: `scale(${scaleIn(frame, fps, 200)})` }}>
          <Card width={520} borderColor={colors.success}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div style={{ fontSize: 22, color: colors.success, fontWeight: "bold" }}>PULVERISETTE 19</div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Cutting Mill</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>300-3,000</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>RPM</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>70×80</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>mm Max Sample</div>
              </div>
            </div>
            <div style={{ marginBottom: 15 }}>
              <div style={{ fontSize: 16, color: colors.success, marginBottom: 10, fontWeight: "bold" }}>Three Rotor Types</div>
              {[
                { name: "V-cutting Rotor", use: "Pellets, Granules" },
                { name: "Straight Cutting Edge", use: "Wood, Plants" },
                { name: "Disk Milling Cutter", use: "Boards, Chips" },
              ].map((rotor, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    backgroundColor: colors.gray[800],
                    borderRadius: 6,
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 14, color: colors.white }}>{rotor.name}</span>
                  <span style={{ fontSize: 14, color: colors.gray[400] }}>{rotor.use}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 600, 40),
        }}
      >
        <Card width={700} borderColor={colors.secondary} style={{ display: "inline-block" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <span style={{ fontSize: 40 }}>❄️</span>
            <span style={{ fontSize: 22, color: colors.white }}>
              <span style={{ color: colors.secondary, fontWeight: "bold" }}>Liquid Nitrogen</span> cryogenic grinding prevents heat deformation
            </span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: JAW CRUSHER & DISK MILL ============
const Scene06JawDisk: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-en/fritsch_en_scene06_jaw_disk.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#4C1D95" />
      <NanoParticles count={20} color={colors.primary} />

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
        <GlowText fontSize={52} glowColor={colors.primary}>Jaw Crusher & Disk Mill</GlowText>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 24, color: colors.gray[400] }}>Pre-crushing and Intermediate Milling</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        <div style={{ opacity: fadeIn(frame, 60, 30), textAlign: "center" }}>
          <div
            style={{
              width: 100,
              height: 100,
              backgroundColor: colors.gray[700],
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 48 }}>🪨</span>
          </div>
          <div style={{ fontSize: 20, color: colors.white }}>95mm</div>
          <div style={{ fontSize: 14, color: colors.gray[400] }}>Fist-sized</div>
        </div>

        <div style={{ fontSize: 40, color: colors.primary, opacity: fadeIn(frame, 150, 30) }}>→</div>

        <div style={{ opacity: fadeIn(frame, 200, 40), transform: `scale(${scaleIn(frame, fps, 200)})` }}>
          <Card width={320} borderColor={colors.danger}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: colors.danger, fontWeight: "bold" }}>PULVERISETTE 1</div>
              <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>Jaw Crusher</div>
              <div style={{ fontSize: 16, color: colors.gray[300] }}>Up to 200 kg/hour</div>
            </div>
          </Card>
        </div>

        <div style={{ fontSize: 40, color: colors.primary, opacity: fadeIn(frame, 350, 30) }}>→</div>

        <div style={{ opacity: fadeIn(frame, 400, 30), textAlign: "center" }}>
          <div
            style={{
              width: 80,
              height: 80,
              backgroundColor: colors.gray[700],
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 32 }}>⚫</span>
          </div>
          <div style={{ fontSize: 20, color: colors.white }}>1-15mm</div>
          <div style={{ fontSize: 14, color: colors.gray[400] }}>Pea-sized</div>
        </div>

        <div style={{ fontSize: 40, color: colors.primary, opacity: fadeIn(frame, 500, 30) }}>→</div>

        <div style={{ opacity: fadeIn(frame, 550, 40), transform: `scale(${scaleIn(frame, fps, 550)})` }}>
          <Card width={320} borderColor={colors.secondary}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: colors.secondary, fontWeight: "bold" }}>PULVERISETTE 13</div>
              <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold", marginBottom: 10 }}>Disk Mill</div>
              <div style={{ fontSize: 16, color: colors.gray[300] }}>0.1 - 12mm output</div>
            </div>
          </Card>
        </div>

        <div style={{ fontSize: 40, color: colors.primary, opacity: fadeIn(frame, 700, 30) }}>→</div>

        <div style={{ opacity: fadeIn(frame, 750, 30), textAlign: "center" }}>
          <div
            style={{
              width: 60,
              height: 60,
              backgroundColor: colors.success,
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
              opacity: 0.7,
            }}
          >
            <span style={{ fontSize: 24 }}>✓</span>
          </div>
          <div style={{ fontSize: 20, color: colors.success }}>0.1-12mm</div>
          <div style={{ fontSize: 14, color: colors.gray[400] }}>Sugar-sized</div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 900, 40),
        }}
      >
        <Card width={800} borderColor={colors.success} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 24, color: colors.white }}>
              Connect both units for <span style={{ color: colors.success, fontWeight: "bold" }}>continuous processing of large-volume samples</span>
            </span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 7: CUP MILL & CROSS BEATER MILL ============
const Scene07CupBeater: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-en/fritsch_en_scene07_cup_beater.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#1E3A8A" />
      <NanoParticles count={25} />

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
        <GlowText fontSize={52} glowColor={colors.secondary}>Cup Mill & Cross Beater Mill</GlowText>
      </div>

      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        <div style={{ opacity: fadeIn(frame, 60, 40), transform: `scale(${scaleIn(frame, fps, 60)})` }}>
          <Card width={550} borderColor={colors.primary}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 22, color: colors.primary, fontWeight: "bold" }}>PULVERISETTE 9</div>
              <div style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>Cup Mill</div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 18, color: colors.gray[300], marginBottom: 10, textAlign: "center" }}>
                Circular horizontal vibration of ring and puck
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>12mm</div>
                  <div style={{ fontSize: 14, color: colors.gray[400] }}>Input</div>
                </div>
                <div style={{ fontSize: 32, color: colors.primary }}>→</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, color: colors.success, fontWeight: "bold" }}>20 μm</div>
                  <div style={{ fontSize: 14, color: colors.gray[400] }}>Output</div>
                </div>
              </div>
            </div>
            <div style={{ padding: "15px", backgroundColor: `${colors.primary}15`, borderRadius: 12 }}>
              <div style={{ fontSize: 16, color: colors.primary, marginBottom: 10, fontWeight: "bold" }}>Applications</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 15, color: colors.gray[200] }}>Mining: Coal, Ores, Minerals</div>
                <div style={{ fontSize: 15, color: colors.gray[200] }}>Metallurgy: Slag, Cast Iron</div>
                <div style={{ fontSize: 15, color: colors.fritsch.orange }}>Ideal for XRF sample preparation</div>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ opacity: fadeIn(frame, 200, 40), transform: `scale(${scaleIn(frame, fps, 200)})` }}>
          <Card width={550} borderColor={colors.fritsch.orange}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 22, color: colors.fritsch.orange, fontWeight: "bold" }}>PULVERISETTE 16</div>
              <div style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>Cross Beater Mill</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>2,850</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>RPM</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, color: colors.success, fontWeight: "bold" }}>80 L/h</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>Throughput</div>
              </div>
            </div>
            <div style={{ padding: "15px", backgroundColor: `${colors.fritsch.orange}15`, borderRadius: 12 }}>
              <div style={{ fontSize: 16, color: colors.fritsch.orange, marginBottom: 10, fontWeight: "bold" }}>Applications</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 15, color: colors.gray[200] }}>Agriculture: Grain, Seeds</div>
                <div style={{ fontSize: 15, color: colors.gray[200] }}>Geology: Limestone, Potash</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 8: ANALYSIS EQUIPMENT ============
const Scene08Analysis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-en/fritsch_en_scene08_analysis.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#065F46" />
      <NanoParticles count={25} color={colors.success} />

      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={48} glowColor={colors.success}>Analysis Equipment - Sieve Shaker & PSA</GlowText>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 22, color: colors.gray[400] }}>Accurate particle size analysis after milling</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "16%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        <div style={{ opacity: fadeIn(frame, 60, 40), transform: `scale(${scaleIn(frame, fps, 60)})` }}>
          <Card width={520} borderColor={colors.primary}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div style={{ fontSize: 20, color: colors.primary, fontWeight: "bold" }}>ANALYSETTE 3 PRO</div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Sieve Shaker</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>20 μm - 63 mm</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>Measurement Range</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: colors.success }}>✓</span>
                <span style={{ fontSize: 16, color: colors.gray[200] }}>Up to 10 sieves simultaneously</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: colors.success }}>✓</span>
                <span style={{ fontSize: 16, color: colors.gray[200] }}>Dry sieving</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: colors.success }}>✓</span>
                <span style={{ fontSize: 16, color: colors.gray[200] }}>ISO 9001 quality standards</span>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ opacity: fadeIn(frame, 200, 40), transform: `scale(${scaleIn(frame, fps, 200)})` }}>
          <Card width={580} borderColor={colors.success}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div style={{ fontSize: 20, color: colors.success, fontWeight: "bold" }}>ANALYSETTE 22 NeXT</div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Particle Size Analyzer</div>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>Laser Diffraction Method</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, color: colors.secondary, fontWeight: "bold" }}>Micro</div>
                <div style={{ fontSize: 20, color: colors.white }}>0.5 - 1,500 μm</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, color: colors.primary, fontWeight: "bold" }}>Nano</div>
                <div style={{ fontSize: 20, color: colors.white }}>0.01 - 3,800 μm</div>
              </div>
            </div>
            <div
              style={{
                padding: "12px 15px",
                backgroundColor: `${colors.success}15`,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>🟢</span>
                <span style={{ fontSize: 16, color: colors.success }}>Green Laser - Precise analysis</span>
              </div>
            </div>
            <div style={{ fontSize: 15, color: colors.gray[300] }}>
              Auto dispersion, measurement, analysis, rinsing, and reporting
            </div>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 9: IMAGE SIZER & SAMPLE DIVIDER ============
const Scene09ImageDivider: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-en/fritsch_en_scene09_image_divider.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#312E81" />
      <NanoParticles count={25} color={colors.secondary} />

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
        <GlowText fontSize={48} glowColor={colors.secondary}>Image Sizer & Sample Divider</GlowText>
      </div>

      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        <div style={{ opacity: fadeIn(frame, 60, 40), transform: `scale(${scaleIn(frame, fps, 60)})` }}>
          <Card width={550} borderColor={colors.primary}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div style={{ fontSize: 20, color: colors.primary, fontWeight: "bold" }}>ANALYSETTE 28</div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Image Sizer</div>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>Particle Shape and Size Analyzer</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, color: colors.secondary, fontWeight: "bold" }}>5 MP</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>CMOS Camera</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, color: colors.success, fontWeight: "bold" }}>75/sec</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>Image Capture</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, color: colors.fritsch.orange, fontWeight: "bold" }}>5 min</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>Measurement Time</div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {["Powder", "Solid", "Suspension", "Emulsion"].map((item, i) => (
                <span
                  key={i}
                  style={{
                    padding: "6px 14px",
                    backgroundColor: colors.gray[800],
                    borderRadius: 6,
                    fontSize: 14,
                    color: colors.gray[200],
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        </div>

        <div style={{ opacity: fadeIn(frame, 200, 40), transform: `scale(${scaleIn(frame, fps, 200)})` }}>
          <Card width={500} borderColor={colors.success}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div style={{ fontSize: 20, color: colors.success, fontWeight: "bold" }}>LABORETTE 27</div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Sample Divider</div>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>Rotary Cone Sample Divider</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, color: colors.success, fontWeight: "bold" }}>99.9%</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>Accuracy</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, color: colors.white }}>8 / 10 / 30</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>Channels</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, color: colors.white }}>~ 4,000 ml</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>Capacity</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 10: CLOSING ============
const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulseScale = 1 + Math.sin(frame / 20) * 0.02;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-en/fritsch_en_scene10_closing.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#1E3A8A" />
      <NanoParticles count={40} color={colors.primary} />

      <div
        style={{
          position: "absolute",
          top: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 40),
        }}
      >
        <Card width={900} borderColor={colors.fritsch.blue} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>
              Taemyung Science Test Service
            </div>
            <div style={{ fontSize: 22, color: colors.gray[300], lineHeight: 1.6 }}>
              Test service for selecting optimal milling equipment for your samples
            </div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
              {["High-energy Ball Mill", "Cutting Mill", "Disk Mill"].map((item, i) => (
                <span
                  key={i}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: colors.gray[800],
                    borderRadius: 8,
                    fontSize: 18,
                    color: colors.gray[200],
                    border: `1px solid ${colors.fritsch.blue}`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 20, fontSize: 20, color: colors.success }}>
              <span style={{ fontWeight: "bold" }}>One-Step service</span> from grinding to particle size analysis
            </div>
          </div>
        </Card>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 200, 40),
          transform: `scale(${scaleIn(frame, fps, 200) * pulseScale})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 80px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 60px ${colors.primary}60`,
          }}
        >
          <div style={{ fontSize: 36, color: colors.white, fontWeight: "bold", fontFamily: "Orbitron, sans-serif" }}>
            FRITSCH
          </div>
          <div style={{ fontSize: 28, color: colors.gray[200], marginTop: 10 }}>
            The Expert of Milling to Nano-scale
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "70%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <span
          style={{
            fontSize: 32,
            color: colors.fritsch.orange,
            fontFamily: "Orbitron, sans-serif",
            letterSpacing: 4,
          }}
        >
          Made in Germany
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 600, 40),
        }}
      >
        <div style={{ fontSize: 28, color: colors.white, marginBottom: 10 }}>
          Taemyung Science: <span style={{ color: colors.primary, fontWeight: "bold" }}>031-458-0025</span>
        </div>
        <div style={{ fontSize: 24, color: colors.gray[400] }}>www.fritsch.co.kr</div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "2%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 800, 40),
        }}
      >
        <span style={{ fontSize: 22, color: colors.gray[500] }}>Thank you</span>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const FritschVideoEN: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS_EN.scene01_opening.start} durationInFrames={SCENE_TIMINGS_EN.scene01_opening.duration}>
        <Scene01Opening />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene02_principles.start} durationInFrames={SCENE_TIMINGS_EN.scene02_principles.duration}>
        <Scene02Principles />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene03_ball_mill.start} durationInFrames={SCENE_TIMINGS_EN.scene03_ball_mill.duration}>
        <Scene03BallMill />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene04_vibratory.start} durationInFrames={SCENE_TIMINGS_EN.scene04_vibratory.duration}>
        <Scene04Vibratory />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene05_rotor_cutting.start} durationInFrames={SCENE_TIMINGS_EN.scene05_rotor_cutting.duration}>
        <Scene05RotorCutting />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene06_jaw_disk.start} durationInFrames={SCENE_TIMINGS_EN.scene06_jaw_disk.duration}>
        <Scene06JawDisk />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene07_cup_beater.start} durationInFrames={SCENE_TIMINGS_EN.scene07_cup_beater.duration}>
        <Scene07CupBeater />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene08_analysis.start} durationInFrames={SCENE_TIMINGS_EN.scene08_analysis.duration}>
        <Scene08Analysis />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene09_image_divider.start} durationInFrames={SCENE_TIMINGS_EN.scene09_image_divider.duration}>
        <Scene09ImageDivider />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_EN.scene10_closing.start} durationInFrames={SCENE_TIMINGS_EN.scene10_closing.duration}>
        <Scene10Closing />
      </Sequence>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};
