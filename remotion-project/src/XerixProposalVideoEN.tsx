import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ============================================================
// XERIX XPR Enhancement Proposal Video - English Version
// ============================================================

// Scene timings (30fps) — based on actual EN audio durations
export const SCENE_TIMINGS_EN = {
  s01: { duration: 615,  start: 0 },     // 19.99s
  s02: { duration: 1155, start: 615 },   // 37.78s
  s03: { duration: 990,  start: 1770 },  // 32.30s
  s04: { duration: 1140, start: 2760 },  // 37.01s
  s05: { duration: 1200, start: 3900 },  // 39.05s
  s06: { duration: 915,  start: 5100 },  // 29.66s
  s07: { duration: 885,  start: 6015 },  // 28.54s
  s08: { duration: 1005, start: 6900 },  // 32.38s
  s09: { duration: 690,  start: 7905 },  // 21.82s
};

export const XERIX_VIDEO_EN_DURATION = 8595; // ~4:46

const colors = {
  bg: "#0A0E1A",
  bgGradient1: "#0F1729",
  bgGradient2: "#070B14",
  primary: "#00D4FF",
  accent: "#0066FF",
  highlight: "#4FE3FF",
  text: "#FFFFFF",
  textSub: "#B8D4E8",
  gold: "#FFD93D",
  success: "#00E676",
  warn: "#FF9800",
};

const fadeIn = (frame: number, start: number, dur: number) =>
  interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const slideUp = (frame: number, start: number, dur: number, dist = 40) =>
  interpolate(frame, [start, start + dur], [dist, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const scaleIn = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });

const TechBackground: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${colors.bgGradient1} 0%, ${colors.bg} 50%, ${colors.bgGradient2} 100%)`,
        }}
      />
      <svg style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.08 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={`${i * 4.2 + (frame * 0.08) % 4.2}%`}
            x2="100%"
            y2={`${i * 4.2 + (frame * 0.08) % 4.2}%`}
            stroke={colors.primary}
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={`${i * 4.2 + (frame * 0.05) % 4.2}%`}
            y1="0"
            x2={`${i * 4.2 + (frame * 0.05) % 4.2}%`}
            y2="100%"
            stroke={colors.primary}
            strokeWidth="1"
          />
        ))}
      </svg>
      {Array.from({ length: 18 }).map((_, i) => {
        const x = (i * 137.5 + frame * 0.3) % 100;
        const y = (i * 73.7 + frame * 0.2) % 100;
        const size = 2 + (i % 4) * 2;
        return (
          <div
            key={`p-${i}`}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: colors.highlight,
              opacity: 0.3 + Math.sin(frame * 0.05 + i) * 0.2,
              boxShadow: `0 0 ${size * 3}px ${colors.primary}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const NeonText: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, size = 48, color = colors.primary, style }) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 800,
      color,
      textShadow: `0 0 10px ${color}, 0 0 25px ${color}, 0 0 45px ${color}`,
      letterSpacing: -1,
      ...style,
    }}
  >
    {children}
  </div>
);

const HoloCard: React.FC<{
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  borderColor?: string;
}> = ({ children, width = 400, height = "auto", style, borderColor = colors.primary }) => {
  const frame = useCurrentFrame();
  const shimmer = Math.sin(frame * 0.1) * 8;
  return (
    <div
      style={{
        width,
        height,
        background: `linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(0,102,255,0.18) 50%, rgba(79,227,255,0.08) 100%)`,
        border: `2px solid ${borderColor}`,
        borderRadius: 16,
        padding: 24,
        backdropFilter: "blur(10px)",
        boxShadow: `0 0 30px rgba(0,212,255,0.25), inset 0 0 ${20 + shimmer}px rgba(0,212,255,0.08)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const SectionTitle: React.FC<{ label: string; title: React.ReactNode; frameStart?: number }> = ({
  label,
  title,
  frameStart = 0,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        width: "100%",
        textAlign: "center",
        opacity: fadeIn(frame, frameStart, 20),
        transform: `translateY(${slideUp(frame, frameStart, 20)}px)`,
      }}
    >
      <div
        style={{
          fontSize: 18,
          color: colors.highlight,
          letterSpacing: 8,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <NeonText size={64}>{title}</NeonText>
    </div>
  );
};

// ============================================================
// Scene 01 - Opening
// ============================================================
const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = scaleIn(frame, fps, 10);
  const t1 = fadeIn(frame, 25, 20);
  const t2 = fadeIn(frame, 60, 25);
  const t3 = fadeIn(frame, 120, 25);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene01_opening_en.mp3")} />
      <TechBackground />

      <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
        {[
          { x1: 250, y1: 250, x2: 960, y2: 540 },
          { x1: 1670, y1: 250, x2: 960, y2: 540 },
          { x1: 250, y1: 850, x2: 960, y2: 540 },
          { x1: 1670, y1: 850, x2: 960, y2: 540 },
        ].map((l, i) => {
          const p = interpolate(frame, [10 + i * 6, 50 + i * 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x1 + (l.x2 - l.x1) * p}
              y2={l.y1 + (l.y2 - l.y1) * p}
              stroke={colors.primary}
              strokeWidth={2}
              opacity={0.5}
            />
          );
        })}
      </svg>

      {[
        { x: 250, y: 250, label: "STM32" },
        { x: 1670, y: 250, label: "PID" },
        { x: 250, y: 850, label: "MFC" },
        { x: 1670, y: 850, label: "RS485" },
      ].map((n, i) => {
        const s = scaleIn(frame, fps, 20 + i * 5);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: n.x - 60,
              top: n.y - 30,
              width: 120,
              height: 60,
              borderRadius: 30,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${s})`,
              boxShadow: `0 0 25px ${colors.primary}`,
              fontWeight: 700,
              color: "#fff",
              fontSize: 18,
            }}
          >
            {n.label}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${logoScale})`,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 24, color: colors.highlight, letterSpacing: 6, marginBottom: 12, fontWeight: 600 }}>
          PROPOSAL FOR XERIX
        </div>
        <NeonText size={130} color={colors.highlight}>
          XPR
        </NeonText>
        <div style={{ marginTop: 4, opacity: t1 }}>
          <div style={{ fontSize: 38, color: colors.text, fontWeight: 600 }}>Enhancement Proposal</div>
        </div>
        <div style={{ marginTop: 30, opacity: t2 }}>
          <div style={{ fontSize: 26, color: colors.textSub, lineHeight: 1.6 }}>
            MFC / LFC Control Solution
          </div>
        </div>
        <div style={{ marginTop: 40, opacity: t3 }}>
          <div
            style={{
              display: "inline-block",
              padding: "12px 36px",
              borderRadius: 999,
              border: `2px solid ${colors.primary}`,
              background: "rgba(0,212,255,0.1)",
              fontSize: 24,
              color: colors.text,
              fontWeight: 600,
            }}
          >
            Presented by UTTEC Co., Ltd.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 02 - Company Overview
// ============================================================
const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { num: "40+", label: "Years RF Expertise", color: colors.gold, delay: 60 },
    { num: "3,800+", label: "Units Exported to Japan", color: colors.success, delay: 80 },
    { num: "2016", label: "Founded", color: colors.highlight, delay: 100 },
    { num: "4 +", label: "Global Certs (KC·TELEC·CE)", color: colors.primary, delay: 120 },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene02_company_en.mp3")} />
      <TechBackground />
      <SectionTitle label="COMPANY OVERVIEW" title="Who We Are" />

      <div
        style={{
          position: "absolute",
          top: 230,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: fadeIn(frame, 30, 25),
        }}
      >
        <NeonText size={44} color={colors.text}>
          UTTEC Co., Ltd.
        </NeonText>
        <div style={{ fontSize: 22, color: colors.textSub, marginTop: 14, lineHeight: 1.7 }}>
          Wireless Network · Precision Control Solutions
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 420,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, s.delay, 20),
              transform: `scale(${scaleIn(frame, fps, s.delay)})`,
            }}
          >
            <HoloCard width={340} height={220} borderColor={s.color}>
              <div style={{ textAlign: "center" }}>
                <NeonText size={64} color={s.color}>
                  {s.num}
                </NeonText>
                <div style={{ fontSize: 22, color: colors.text, marginTop: 18, fontWeight: 500 }}>{s.label}</div>
              </div>
            </HoloCard>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 200, 25),
        }}
      >
        <HoloCard width={1100} style={{ margin: "0 auto" }}>
          <div style={{ fontSize: 26, color: colors.text, lineHeight: 1.8, textAlign: "center" }}>
            Lighting Control · Smart Farming · Smart Factory · IoT Solutions
            <br />
            <span style={{ color: colors.highlight, fontSize: 22 }}>
              A trusted partner verified in both technology and quality
            </span>
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 03 - Qualification Match
// ============================================================
const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reqs = [
    { title: "STM32 Embedded", detail: "Board Design · Firmware", icon: "🔧", delay: 50 },
    { title: "PID Control", detail: "Motor & Valve Algorithms", icon: "⚙️", delay: 100 },
    { title: "MFC-class Precision", detail: "Industrial Equipment", icon: "📊", delay: 150 },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene03_qualification_en.mp3")} />
      <TechBackground />
      <SectionTitle label="QUALIFICATION MATCH" title="Requirements Met" />

      <div
        style={{
          position: "absolute",
          top: 270,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 25, 20),
        }}
      >
        <div style={{ fontSize: 28, color: colors.textSub }}>
          We meet all <span style={{ color: colors.gold, fontWeight: 700 }}>3 core requirements</span> requested by XERIX
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 380,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {reqs.map((r, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, r.delay, 25),
              transform: `scale(${scaleIn(frame, fps, r.delay)})`,
            }}
          >
            <HoloCard width={420} height={360} borderColor={colors.success}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 80, marginBottom: 14 }}>{r.icon}</div>
                <NeonText size={32} color={colors.text}>
                  {r.title}
                </NeonText>
                <div style={{ fontSize: 20, color: colors.textSub, marginTop: 16, lineHeight: 1.5 }}>{r.detail}</div>
                <div
                  style={{
                    marginTop: 20,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 22px",
                    borderRadius: 999,
                    background: `${colors.success}22`,
                    border: `2px solid ${colors.success}`,
                  }}
                >
                  <span style={{ fontSize: 22, color: colors.success, fontWeight: 700 }}>✓ MET</span>
                </div>
              </div>
            </HoloCard>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 220, 25),
        }}
      >
        <div style={{ fontSize: 26, color: colors.highlight }}>
          ▼ Now we present <span style={{ color: colors.gold }}>3 real development cases</span> as evidence
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 04 - REVITA Case
// ============================================================
const Scene04: React.FC = () => {
  const frame = useCurrentFrame();

  const features = [
    { title: "RS485 Sensor Comm", detail: "MODBUS · Multi-device" },
    { title: "3-Wire Motor Valve", detail: "CR02 / CR03 precision control" },
    { title: "Flow Meter PPI Counting", detail: "Background counting · Low power" },
    { title: "Dual-bank OTA", detail: "Auto rollback on failure" },
    { title: "Remote Diagnostics", detail: "Maintenance without site visit" },
    { title: "Low Power Design", detail: "Solar / battery operation" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene04_revita_en.mp3")} />
      <TechBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <div style={{ fontSize: 18, color: colors.gold, letterSpacing: 6, fontWeight: 700, marginBottom: 6 }}>
          CASE 1 / 3
        </div>
        <NeonText size={62}>REVITA Smart Farm Terminal</NeonText>
        <div style={{ fontSize: 22, color: colors.textSub, marginTop: 12 }}>
          <span style={{ color: colors.gold, fontWeight: 700 }}>Nearly identical control architecture</span> to XPR · Pre-production
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 270,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 24,
          padding: "0 80px",
        }}
      >
        {features.map((f, i) => {
          const delay = 25 + i * 12;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 20),
                transform: `translateY(${slideUp(frame, delay, 20)}px)`,
              }}
            >
              <HoloCard width={550} height={150}>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 12,
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      fontWeight: 800,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 24, color: colors.text, fontWeight: 700 }}>{f.title}</div>
                    <div style={{ fontSize: 17, color: colors.textSub, marginTop: 6 }}>{f.detail}</div>
                  </div>
                </div>
              </HoloCard>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 70,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 200, 25),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 40px",
            borderRadius: 12,
            background: `${colors.success}22`,
            border: `2px solid ${colors.success}`,
          }}
        >
          <span style={{ fontSize: 26, color: colors.success, fontWeight: 700 }}>
            ★ Field-validated assets ready for direct XPR application
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 05 - PID Control Case
// ============================================================
const Scene05: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene05_pid_en.mp3")} />
      <TechBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <div style={{ fontSize: 18, color: colors.gold, letterSpacing: 6, fontWeight: 700, marginBottom: 6 }}>
          CASE 2 / 3
        </div>
        <NeonText size={62}>Smart Factory PID Control</NeonText>
        <div style={{ fontSize: 22, color: colors.textSub, marginTop: 12 }}>
          Rule-based + PID feedback <span style={{ color: colors.gold, fontWeight: 700 }}>dual-stage architecture</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 290,
          left: 100,
          right: 100,
          opacity: fadeIn(frame, 25, 25),
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          {[
            { label: "Material + Target", sub: "Input", color: colors.highlight },
            { label: "Look-up Table", sub: "Stage 1: Base", color: colors.primary },
            { label: "PID Feedback", sub: "Stage 2: Trim", color: colors.accent },
            { label: "Safety Interlock", sub: "Range / Rate Limit", color: colors.warn },
            { label: "Final Output", sub: "Plant Control", color: colors.success },
          ].map((b, i) => {
            const d = 30 + i * 15;
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    flex: 1,
                    opacity: fadeIn(frame, d, 18),
                    transform: `translateY(${slideUp(frame, d, 18)}px)`,
                  }}
                >
                  <HoloCard borderColor={b.color} style={{ minHeight: 130, padding: 18 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 13, color: b.color, fontWeight: 700, letterSpacing: 2 }}>{b.sub}</div>
                      <div style={{ fontSize: 20, color: colors.text, marginTop: 8, fontWeight: 700 }}>{b.label}</div>
                    </div>
                  </HoloCard>
                </div>
                {i < 4 && (
                  <div
                    style={{
                      fontSize: 36,
                      color: colors.primary,
                      opacity: fadeIn(frame, 35 + i * 15, 18),
                    }}
                  >
                    →
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 530,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
          padding: "0 100px",
          opacity: fadeIn(frame, 130, 25),
        }}
      >
        {[
          { k: "Kp / Ki / Kd", v: "Ziegler-Nichols auto-tuning" },
          { k: "Anti-Windup", v: "Integral term clamping" },
          { k: "Safety Interlock", v: "Rate limit · Overload detect" },
        ].map((it, i) => (
          <HoloCard key={i} width={400} borderColor={colors.success}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, color: colors.gold, fontWeight: 700 }}>{it.k}</div>
              <div style={{ fontSize: 18, color: colors.textSub, marginTop: 10 }}>{it.v}</div>
            </div>
          </HoloCard>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 70,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 220, 25),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 40px",
            borderRadius: 12,
            background: `${colors.success}22`,
            border: `2px solid ${colors.success}`,
          }}
        >
          <span style={{ fontSize: 26, color: colors.success, fontWeight: 700 }}>
            ★ PID know-how validated by real field data
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 06 - Power System Case
// ============================================================
const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene06_rftech_en.mp3")} />
      <TechBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <div style={{ fontSize: 18, color: colors.gold, letterSpacing: 6, fontWeight: 700, marginBottom: 6 }}>
          CASE 3 / 3
        </div>
        <NeonText size={62}>Military-grade Power System</NeonText>
        <div style={{ fontSize: 22, color: colors.textSub, marginTop: 12 }}>
          PowerDock Pro · <span style={{ color: colors.gold, fontWeight: 700 }}>High-reliability power design</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 280,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {[
          { num: "DC 24V", lbl: "Input Power", sub: "Matches XPR rating", c: colors.highlight, d: 30 },
          { num: "Multi-Rail", lbl: "Multiple Voltage Lines", sub: "5V · 3.3V · 12V step", c: colors.primary, d: 60 },
          { num: "Peak Mgmt", lbl: "Inrush Control", sub: "Soft-start · MOSFET switching", c: colors.warn, d: 90 },
        ].map((it, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, it.d, 22),
              transform: `scale(${scaleIn(frame, fps, it.d)})`,
            }}
          >
            <HoloCard width={420} height={300} borderColor={it.c}>
              <div style={{ textAlign: "center" }}>
                <NeonText size={42} color={it.c}>
                  {it.num}
                </NeonText>
                <div style={{ fontSize: 24, color: colors.text, marginTop: 18, fontWeight: 700 }}>{it.lbl}</div>
                <div style={{ fontSize: 18, color: colors.textSub, marginTop: 10 }}>{it.sub}</div>
              </div>
            </HoloCard>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 130,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 150, 25),
        }}
      >
        <HoloCard width={1100} style={{ margin: "0 auto" }}>
          <div style={{ fontSize: 24, color: colors.text, lineHeight: 1.7, textAlign: "center" }}>
            Stable supply of multiple voltage rails from DC 24V input —
            <br />
            <span style={{ color: colors.highlight, fontWeight: 700 }}>
              a decisive advantage for the XPR power section
            </span>
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 07 - Deliverables
// ============================================================
const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { t: "Schematic", d: "Source files", icon: "📐" },
    { t: "PCB Artwork", d: "Including Gerber", icon: "🔲" },
    { t: "BOM List", d: "Bill of Materials", icon: "📋" },
    { t: "Firmware", d: "Source + Build guide", icon: "💾" },
    { t: "Prototype", d: "Assembled boards (qty TBD)", icon: "🛠️" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene07_deliverables_en.mp3")} />
      <TechBackground />
      <SectionTitle label="DELIVERABLES" title="What You Get" />

      <div
        style={{
          position: "absolute",
          top: 250,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 25, 20),
        }}
      >
        <div style={{ fontSize: 26, color: colors.textSub }}>
          Every requested deliverable, <span style={{ color: colors.gold, fontWeight: 700 }}>delivered in full</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 350,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 24,
          padding: "0 100px",
        }}
      >
        {items.map((it, i) => {
          const d = 50 + i * 18;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, d, 22),
                transform: `scale(${scaleIn(frame, fps, d)})`,
              }}
            >
              <HoloCard width={340} height={240}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 56, marginBottom: 8 }}>{it.icon}</div>
                  <NeonText size={28} color={colors.highlight}>
                    {it.t}
                  </NeonText>
                  <div style={{ fontSize: 18, color: colors.textSub, marginTop: 12 }}>{it.d}</div>
                </div>
              </HoloCard>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 70,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 200, 25),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 40px",
            borderRadius: 12,
            background: `${colors.gold}22`,
            border: `2px solid ${colors.gold}`,
          }}
        >
          <span style={{ fontSize: 24, color: colors.gold, fontWeight: 700 }}>
            100% IP ownership to XERIX · No additional cost
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 08 - Differentiation
// ============================================================
const Scene08: React.FC = () => {
  const frame = useCurrentFrame();

  const diffs = [
    {
      no: "01",
      title: "Dual-bank OTA",
      sub: "Safe remote firmware updates",
      detail: "Auto-rollback on failure · Update without service interruption",
      color: colors.primary,
    },
    {
      no: "02",
      title: "Remote Diagnostics",
      sub: "Detailed log-based troubleshooting",
      detail: "Drastically lower maintenance cost without site visits",
      color: colors.success,
    },
    {
      no: "03",
      title: "Low-power Design",
      sub: "Verified for 24/7 industrial use",
      detail: "Light/Deep sleep · External power gating",
      color: colors.gold,
    },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene08_advantage_en.mp3")} />
      <TechBackground />
      <SectionTitle label="DIFFERENTIATION" title="Our Advantages" />

      <div
        style={{
          position: "absolute",
          top: 250,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 25, 20),
        }}
      >
        <div style={{ fontSize: 26, color: colors.textSub }}>
          Beyond simple delivery — <span style={{ color: colors.gold, fontWeight: 700 }}>field-proven assets</span> included
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 360,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          padding: "0 80px",
        }}
      >
        {diffs.map((d, i) => {
          const delay = 50 + i * 25;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 22),
                transform: `translateY(${slideUp(frame, delay, 22, 60)}px)`,
              }}
            >
              <HoloCard width={460} height={400} borderColor={d.color}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 60,
                      fontWeight: 900,
                      color: d.color,
                      textShadow: `0 0 25px ${d.color}`,
                      letterSpacing: -2,
                    }}
                  >
                    {d.no}
                  </div>
                  <NeonText size={32} color={colors.text} style={{ marginTop: 4 }}>
                    {d.title}
                  </NeonText>
                  <div style={{ fontSize: 20, color: d.color, marginTop: 12, fontWeight: 600 }}>{d.sub}</div>
                  <div
                    style={{
                      fontSize: 18,
                      color: colors.textSub,
                      marginTop: 18,
                      lineHeight: 1.6,
                      borderTop: `1px solid ${d.color}55`,
                      paddingTop: 16,
                    }}
                  >
                    {d.detail}
                  </div>
                </div>
              </HoloCard>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 09 - Closing
// ============================================================
const Scene09: React.FC = () => {
  const frame = useCurrentFrame();

  const t1 = fadeIn(frame, 10, 25);
  const t2 = fadeIn(frame, 60, 25);
  const t3 = fadeIn(frame, 130, 25);
  const t4 = fadeIn(frame, 250, 25);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene09_closing_en.mp3")} />
      <TechBackground />

      <div
        style={{
          position: "absolute",
          top: 130,
          width: "100%",
          textAlign: "center",
          opacity: t1,
        }}
      >
        <div style={{ fontSize: 24, color: colors.highlight, letterSpacing: 8, fontWeight: 600, marginBottom: 14 }}>
          UTTEC × XERIX
        </div>
        <NeonText size={72}>Building the Future Together</NeonText>
      </div>

      <div
        style={{
          position: "absolute",
          top: 380,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
          opacity: t2,
        }}
      >
        {[
          { v: "40+", l: "Years RF expertise" },
          { v: "PID", l: "Proven control tech" },
          { v: "REVITA", l: "Pre-production asset" },
        ].map((s, i) => (
          <HoloCard key={i} width={340} height={180} borderColor={colors.gold}>
            <div style={{ textAlign: "center" }}>
              <NeonText size={48} color={colors.gold}>
                {s.v}
              </NeonText>
              <div style={{ fontSize: 20, color: colors.text, marginTop: 14 }}>{s.l}</div>
            </div>
          </HoloCard>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: 620,
          width: "100%",
          textAlign: "center",
          opacity: t3,
        }}
      >
        <div style={{ fontSize: 32, color: colors.text, lineHeight: 1.6 }}>
          <span style={{ color: colors.highlight, fontWeight: 700 }}>UTTEC</span> is the most trusted partner
          <br />
          for the XERIX XPR enhancement project
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: t4,
        }}
      >
        <HoloCard width={900} style={{ margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 50 }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 26, color: colors.highlight, fontWeight: 700 }}>UTTEC Co., Ltd.</div>
              <div style={{ fontSize: 18, color: colors.textSub, marginTop: 10, lineHeight: 1.7 }}>
                📍 120 Heungdeok Jungang-ro, Giheung-gu, Yongin, Korea
                <br />
                📞 +82-31-627-2250 · 🌐 www.uttec.co.kr
              </div>
            </div>
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Main Composition
// ============================================================
export const XerixProposalVideoEN: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg, fontFamily: "Inter, sans-serif" }}>
      <Sequence from={SCENE_TIMINGS_EN.s01.start} durationInFrames={SCENE_TIMINGS_EN.s01.duration}>
        <Scene01 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS_EN.s02.start} durationInFrames={SCENE_TIMINGS_EN.s02.duration}>
        <Scene02 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS_EN.s03.start} durationInFrames={SCENE_TIMINGS_EN.s03.duration}>
        <Scene03 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS_EN.s04.start} durationInFrames={SCENE_TIMINGS_EN.s04.duration}>
        <Scene04 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS_EN.s05.start} durationInFrames={SCENE_TIMINGS_EN.s05.duration}>
        <Scene05 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS_EN.s06.start} durationInFrames={SCENE_TIMINGS_EN.s06.duration}>
        <Scene06 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS_EN.s07.start} durationInFrames={SCENE_TIMINGS_EN.s07.duration}>
        <Scene07 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS_EN.s08.start} durationInFrames={SCENE_TIMINGS_EN.s08.duration}>
        <Scene08 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS_EN.s09.start} durationInFrames={SCENE_TIMINGS_EN.s09.duration}>
        <Scene09 />
      </Sequence>
    </AbsoluteFill>
  );
};
