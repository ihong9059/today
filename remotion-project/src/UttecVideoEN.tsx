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
// UTTEC Company Introduction Video - English Version
// ============================================================

// Scene timings (30fps) - Based on actual audio duration + buffer
export const SCENE_TIMINGS = {
  scene01_opening: { duration: 450, start: 0 },           // 12.91s + buffer = 15s (450 frames)
  scene02_company: { duration: 1080, start: 450 },        // 33.19s + buffer = 36s (1080 frames)
  scene03_ceo: { duration: 1230, start: 1530 },           // 37.94s + buffer = 41s (1230 frames)
  scene04_blemesh: { duration: 1080, start: 2760 },       // 33.38s + buffer = 36s (1080 frames)
  scene05_products: { duration: 1140, start: 3840 },      // 34.63s + buffer = 38s (1140 frames)
  scene06_japan: { duration: 1140, start: 4980 },         // 35.28s + buffer = 38s (1140 frames)
  scene07_smartfactory: { duration: 990, start: 6120 },   // 30.53s + buffer = 33s (990 frames)
  scene08_closing: { duration: 690, start: 7110 },        // 20.18s + buffer = 23s (690 frames)
};

export const UTTEC_VIDEO_EN_DURATION = 7800; // Total ~4 min 20 sec (7800 frames)

// UTTEC Brand Colors (Blue/Cyan theme)
const colors = {
  bg: "#0A1628",
  bgGradient1: "#0D2137",
  bgGradient2: "#0A1628",
  primary: "#00B4D8",      // Cyan
  accent: "#0077B6",       // Blue
  highlight: "#48CAE4",    // Light cyan
  text: "#FFFFFF",
  textSub: "#90E0EF",
  gold: "#FFD700",
  success: "#00E676",
};

// Animation helper functions
const fadeIn = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fadeOut = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, start: number, duration: number, distance: number = 50) =>
  interpolate(frame, [start, start + duration], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideIn = (frame: number, start: number, duration: number, distance: number = 100) =>
  interpolate(frame, [start, start + duration], [-distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const scaleIn = (frame: number, fps: number, delay: number = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

// Tech Background Component
const TechBackground: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {/* Gradient background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${colors.bgGradient1} 0%, ${colors.bg} 50%, ${colors.bgGradient2} 100%)`,
        }}
      />

      {/* Moving grid */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.1,
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={`${i * 5 + (frame * 0.1) % 5}%`}
            x2="100%"
            y2={`${i * 5 + (frame * 0.1) % 5}%`}
            stroke={colors.primary}
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={`${i * 5 + (frame * 0.05) % 5}%`}
            y1="0"
            x2={`${i * 5 + (frame * 0.05) % 5}%`}
            y2="100%"
            stroke={colors.primary}
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = (i * 137.5 + frame * 0.3) % 100;
        const y = (i * 73.7 + frame * 0.2) % 100;
        const size = 3 + (i % 3) * 2;
        return (
          <div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: colors.highlight,
              opacity: 0.3 + Math.sin(frame * 0.05 + i) * 0.2,
              boxShadow: `0 0 ${size * 2}px ${colors.primary}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Neon Text Component
const NeonText: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, size = 48, color = colors.primary, style }) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 700,
      color: color,
      textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`,
      ...style,
    }}
  >
    {children}
  </div>
);

// Hologram Card Component
const HoloCard: React.FC<{
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}> = ({ children, width = 400, height = "auto", style }) => {
  const frame = useCurrentFrame();
  const shimmer = Math.sin(frame * 0.1) * 10;

  return (
    <div
      style={{
        width,
        height,
        background: `linear-gradient(135deg,
          rgba(0, 180, 216, 0.1) 0%,
          rgba(0, 119, 182, 0.2) 50%,
          rgba(72, 202, 228, 0.1) 100%)`,
        border: `2px solid ${colors.primary}`,
        borderRadius: 16,
        padding: 24,
        backdropFilter: "blur(10px)",
        boxShadow: `0 0 30px rgba(0, 180, 216, 0.3),
                    inset 0 0 ${20 + shimmer}px rgba(0, 180, 216, 0.1)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================
// Scene 1: Opening (0:00 ~ 0:25)
// ============================================================
const Scene01Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = scaleIn(frame, fps, 15);
  const titleOpacity = fadeIn(frame, 30, 20);
  const titleY = slideUp(frame, 30, 20, 30);
  const sloganOpacity = fadeIn(frame, 60, 20);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene01_opening_en.mp3")} />
      <TechBackground />

      {/* IoT Network Animation */}
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        {/* Connection lines */}
        <svg style={{ width: "100%", height: "100%", position: "absolute" }}>
          {[
            { x1: 300, y1: 200, x2: 600, y2: 350 },
            { x1: 600, y1: 350, x2: 960, y2: 540 },
            { x1: 960, y1: 540, x2: 1300, y2: 400 },
            { x1: 1300, y1: 400, x2: 1600, y2: 600 },
            { x1: 960, y1: 540, x2: 700, y2: 700 },
            { x1: 960, y1: 540, x2: 1200, y2: 750 },
          ].map((line, i) => {
            const progress = interpolate(frame, [10 + i * 8, 40 + i * 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x1 + (line.x2 - line.x1) * progress}
                y2={line.y1 + (line.y2 - line.y1) * progress}
                stroke={colors.primary}
                strokeWidth={3}
                opacity={0.6}
              />
            );
          })}
        </svg>

        {/* IoT Nodes */}
        {[
          { x: 300, y: 200, delay: 0, label: "Sensor" },
          { x: 600, y: 350, delay: 8, label: "Gateway" },
          { x: 960, y: 540, delay: 16, label: "Server" },
          { x: 1300, y: 400, delay: 24, label: "Cloud" },
          { x: 1600, y: 600, delay: 32, label: "Mobile" },
          { x: 700, y: 700, delay: 28, label: "Device" },
          { x: 1200, y: 750, delay: 36, label: "Analytics" },
        ].map((node, i) => {
          const nodeScale = scaleIn(frame, fps, node.delay);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: node.x - 40,
                top: node.y - 40,
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${colors.highlight} 0%, ${colors.primary} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${nodeScale})`,
                boxShadow: `0 0 30px ${colors.primary}`,
              }}
            >
              <span style={{ color: colors.bg, fontWeight: 700, fontSize: 12 }}>
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* UTTEC Logo and Text */}
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
        <NeonText size={120} color={colors.highlight}>
          UTTEC
        </NeonText>

        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginTop: 20,
          }}
        >
          <div style={{ fontSize: 36, color: colors.text, fontWeight: 500 }}>
            UTTEC Co., Ltd.
          </div>
        </div>

        <div
          style={{
            opacity: sloganOpacity,
            marginTop: 30,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: colors.textSub,
              letterSpacing: 8,
              fontWeight: 300,
            }}
          >
            Network Solution
          </div>
        </div>
      </div>

      {/* Website */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 90, 20),
        }}
      >
        <span style={{ fontSize: 24, color: colors.textSub }}>
          www.uttec.co.kr
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 2: Company Overview (0:25 ~ 1:15)
// ============================================================
const Scene02Company: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene02_company_en.mp3")} />
      <TechBackground />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
          transform: `translateY(${slideUp(frame, 0, 20)}px)`,
        }}
      >
        <NeonText size={56}>Company Overview</NeonText>
      </div>

      {/* Timeline */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 120,
          opacity: fadeIn(frame, 30, 20),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {/* Founded 2016 */}
          <HoloCard width={280} style={{ transform: `scale(${scaleIn(frame, fps, 40)})` }}>
            <div style={{ textAlign: "center" }}>
              <NeonText size={48} color={colors.gold}>2016</NeonText>
              <div style={{ fontSize: 24, color: colors.text, marginTop: 10 }}>
                Founded
              </div>
              <div style={{ fontSize: 18, color: colors.textSub, marginTop: 8 }}>
                R&D Center Established
              </div>
            </div>
          </HoloCard>

          {/* Patent */}
          <HoloCard width={320} style={{ transform: `scale(${scaleIn(frame, fps, 55)})` }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, color: colors.highlight, marginBottom: 10 }}>
                🏆 Patent Registered
              </div>
              <div style={{ fontSize: 18, color: colors.text, lineHeight: 1.6 }}>
                Dimming Control System<br/>with Multi-Sensors
              </div>
              <div style={{ fontSize: 14, color: colors.textSub, marginTop: 8 }}>
                No. 10-1623345
              </div>
            </div>
          </HoloCard>

          {/* Venture */}
          <HoloCard width={240} style={{ transform: `scale(${scaleIn(frame, fps, 70)})` }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>🚀</div>
              <div style={{ fontSize: 20, color: colors.text }}>
                Venture Certified
              </div>
            </div>
          </HoloCard>
        </div>
      </div>

      {/* Certifications */}
      <div
        style={{
          position: "absolute",
          top: 480,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 90, 25),
        }}
      >
        <div style={{ fontSize: 32, color: colors.text, marginBottom: 40 }}>
          Global Certifications
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 80 }}>
          {[
            { name: "KC", country: "Korea", delay: 100 },
            { name: "TELEC", country: "Japan", delay: 115 },
            { name: "CE", country: "Europe", delay: 130 },
          ].map((cert, i) => (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, cert.delay, 20),
                transform: `scale(${scaleIn(frame, fps, cert.delay)})`,
              }}
            >
              <HoloCard width={200} height={150}>
                <div style={{ textAlign: "center" }}>
                  <NeonText size={40} color={colors.success}>{cert.name}</NeonText>
                  <div style={{ fontSize: 18, color: colors.textSub, marginTop: 10 }}>
                    {cert.country} Certified
                  </div>
                </div>
              </HoloCard>
            </div>
          ))}
        </div>
      </div>

      {/* Japan Patent */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 160, 25),
        }}
      >
        <HoloCard width={500} style={{ margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 48 }}>🇯🇵</div>
            <div>
              <div style={{ fontSize: 22, color: colors.highlight }}>
                Japan Patent Registered
              </div>
              <div style={{ fontSize: 18, color: colors.text, marginTop: 5 }}>
                LED Drive Control System (Patent No. 5982528)
              </div>
            </div>
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 3: CEO & Development Capability (1:15 ~ 2:00)
// ============================================================
const Scene03CEO: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline data
  const timeline = [
    { year: "1985", title: "Samsung Electro", desc: "Audio Deck Development" },
    { year: "1990", title: "CATV System", desc: "Korean CATV (70% MS)" },
    { year: "1995", title: "Satellite STB", desc: "Canada, Korea Skylife" },
    { year: "2000", title: "Digital TV", desc: "German Loewe TV" },
    { year: "2016", title: "UTTEC Founded", desc: "IoT Solutions Business" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene03_ceo_en.mp3")} />
      <TechBackground />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <NeonText size={52}>40 Years of Development Experience</NeonText>
      </div>

      {/* Key highlight */}
      <div
        style={{
          position: "absolute",
          top: 140,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 20, 20),
        }}
      >
        <span
          style={{
            fontSize: 28,
            color: colors.gold,
            background: "rgba(255, 215, 0, 0.1)",
            padding: "8px 30px",
            borderRadius: 30,
            border: `1px solid ${colors.gold}`,
          }}
        >
          Continuous Hardware & Software Development Since 1985
        </span>
      </div>

      {/* Timeline */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1600,
        }}
      >
        {/* Timeline line */}
        <div
          style={{
            position: "absolute",
            top: 45,
            left: 100,
            right: 100,
            height: 4,
            background: colors.primary,
            opacity: 0.5,
          }}
        />

        {/* Timeline items */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 50px" }}>
          {timeline.map((item, i) => {
            const itemDelay = 40 + i * 25;
            const itemOpacity = fadeIn(frame, itemDelay, 20);
            const itemScale = scaleIn(frame, fps, itemDelay);

            return (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  opacity: itemOpacity,
                  transform: `scale(${itemScale})`,
                }}
              >
                {/* Year point */}
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    boxShadow: `0 0 20px ${colors.primary}`,
                  }}
                >
                  <span style={{ fontSize: 20, fontWeight: 700, color: colors.text }}>
                    {item.year}
                  </span>
                </div>

                {/* Description */}
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 20, color: colors.highlight, fontWeight: 600 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 16, color: colors.textSub, marginTop: 8 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Samsung Electro-Mechanics */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 150,
          opacity: fadeIn(frame, 150, 25),
          transform: `translateX(${slideIn(frame, 150, 25)}px)`,
        }}
      >
        <HoloCard width={400}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                background: "#1428A0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>
                SAMSUNG
              </span>
            </div>
            <div>
              <div style={{ fontSize: 22, color: colors.text }}>Samsung Background</div>
              <div style={{ fontSize: 16, color: colors.textSub }}>
                Electronics Development Pioneer
              </div>
            </div>
          </div>
        </HoloCard>
      </div>

      {/* German Loewe */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          right: 150,
          opacity: fadeIn(frame, 170, 25),
          transform: `translateX(${-slideIn(frame, 170, 25)}px)`,
        }}
      >
        <HoloCard width={400}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 48 }}>🇩🇪</div>
            <div>
              <div style={{ fontSize: 22, color: colors.text }}>Loewe TV Development</div>
              <div style={{ fontSize: 16, color: colors.textSub }}>
                German Premium TV Brand
              </div>
            </div>
          </div>
        </HoloCard>
      </div>

      {/* Current Dev Team */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 200, 25),
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            background: "rgba(0, 230, 118, 0.1)",
            border: `2px solid ${colors.success}`,
            borderRadius: 50,
            padding: "15px 40px",
          }}
        >
          <span style={{ fontSize: 36 }}>👨‍💻</span>
          <span style={{ fontSize: 24, color: colors.success }}>
            Currently Operating 3 Expert Developers
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 4: Core Technology - BLE Mesh Network (2:00 ~ 2:50)
// ============================================================
const Scene04BLEMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Mesh network nodes
  const meshNodes = [
    { x: 960, y: 400, type: "gateway", label: "Gateway" },
    { x: 700, y: 300, type: "node", label: "Node 1" },
    { x: 1220, y: 300, type: "node", label: "Node 2" },
    { x: 600, y: 500, type: "node", label: "Node 3" },
    { x: 1320, y: 500, type: "node", label: "Node 4" },
    { x: 500, y: 350, type: "sensor", label: "Sensor" },
    { x: 1420, y: 350, type: "sensor", label: "Sensor" },
    { x: 800, y: 600, type: "sensor", label: "Sensor" },
    { x: 1120, y: 600, type: "sensor", label: "Sensor" },
  ];

  // Connections
  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 5], [2, 6], [3, 7], [4, 8],
    [1, 3], [2, 4], [1, 2], [3, 4],
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene04_blemesh_en.mp3")} />
      <TechBackground />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <NeonText size={52}>Core Technology: BLE Mesh Network</NeonText>
      </div>

      {/* Mesh Network Diagram */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          width: "100%",
          height: 550,
        }}
      >
        {/* Connection lines */}
        <svg style={{ width: "100%", height: "100%", position: "absolute" }}>
          {connections.map(([from, to], i) => {
            const fromNode = meshNodes[from];
            const toNode = meshNodes[to];
            const lineProgress = interpolate(frame, [30 + i * 5, 50 + i * 5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            // Data packet animation
            const packetProgress = ((frame - 60 - i * 10) % 60) / 60;
            const packetX = fromNode.x + (toNode.x - fromNode.x) * packetProgress;
            const packetY = fromNode.y + (toNode.y - fromNode.y) * packetProgress;

            return (
              <g key={i}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={fromNode.x + (toNode.x - fromNode.x) * lineProgress}
                  y2={fromNode.y + (toNode.y - fromNode.y) * lineProgress}
                  stroke={colors.primary}
                  strokeWidth={2}
                  opacity={0.5}
                />
                {frame > 60 + i * 10 && (
                  <circle
                    cx={packetX}
                    cy={packetY}
                    r={4}
                    fill={colors.highlight}
                    opacity={0.8}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {meshNodes.map((node, i) => {
          const nodeScale = scaleIn(frame, fps, 20 + i * 5);
          const size = node.type === "gateway" ? 70 : node.type === "node" ? 50 : 35;
          const bgColor = node.type === "gateway"
            ? colors.gold
            : node.type === "node"
              ? colors.primary
              : colors.highlight;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: node.x - size / 2,
                top: node.y - size / 2,
                width: size,
                height: size,
                borderRadius: "50%",
                background: bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${nodeScale})`,
                boxShadow: `0 0 20px ${bgColor}`,
              }}
            >
              <span
                style={{
                  color: colors.bg,
                  fontSize: node.type === "gateway" ? 12 : 10,
                  fontWeight: 700,
                }}
              >
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Feature cards */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {[
          { icon: "🔐", title: "Encrypted", desc: "Secure Data Transmission", delay: 100 },
          { icon: "🔋", title: "Low Power", desc: "Long Battery Life", delay: 115 },
          { icon: "📡", title: "200m+", desc: "Extended Range", delay: 130 },
          { icon: "🌐", title: "Mesh", desc: "No Dead Zones", delay: 145 },
          { icon: "☀️", title: "Standalone", desc: "Solar + Battery", delay: 160 },
        ].map((feature, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, feature.delay, 20),
              transform: `scale(${scaleIn(frame, fps, feature.delay)})`,
            }}
          >
            <HoloCard width={200} height={160}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>{feature.icon}</div>
                <div style={{ fontSize: 20, color: colors.highlight, fontWeight: 600 }}>
                  {feature.title}
                </div>
                <div style={{ fontSize: 14, color: colors.textSub, marginTop: 5 }}>
                  {feature.desc}
                </div>
              </div>
            </HoloCard>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 5: Applications & Products (2:50 ~ 3:40)
// ============================================================
const Scene05Products: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const categories = [
    {
      title: "Lighting Control",
      icon: "💡",
      items: ["Parking Lot Dimming", "Golf Course Lighting", "Building Security Light"],
      color: colors.gold,
    },
    {
      title: "Parking Systems",
      icon: "🅿️",
      items: ["Empty Space Detection", "Flood Detection", "Bicycle Parking"],
      color: colors.primary,
    },
    {
      title: "Smart Control",
      icon: "🌱",
      items: ["Smart Farm Sensors", "Temp/Humidity/CO2/Light", "Environment Monitoring"],
      color: colors.success,
    },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene05_products_en.mp3")} />
      <TechBackground />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <NeonText size={52}>Applications & Solutions</NeonText>
      </div>

      {/* 3 Business Areas */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {categories.map((cat, i) => {
          const delay = 30 + i * 30;

          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 25),
                transform: `translateY(${slideUp(frame, delay, 25, 40)}px)`,
              }}
            >
              <HoloCard
                width={450}
                height={380}
                style={{ borderColor: cat.color }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 60, marginBottom: 15 }}>{cat.icon}</div>
                  <NeonText size={32} color={cat.color}>{cat.title}</NeonText>

                  <div style={{ marginTop: 25 }}>
                    {cat.items.map((item, j) => {
                      const itemDelay = delay + 20 + j * 10;
                      return (
                        <div
                          key={j}
                          style={{
                            opacity: fadeIn(frame, itemDelay, 15),
                            fontSize: 20,
                            color: colors.text,
                            padding: "12px 0",
                            borderBottom: j < cat.items.length - 1
                              ? `1px solid rgba(255,255,255,0.1)`
                              : "none",
                          }}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </HoloCard>
            </div>
          );
        })}
      </div>

      {/* Major Clients */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 180, 25),
        }}
      >
        <div style={{ fontSize: 24, color: colors.textSub, marginBottom: 25 }}>
          Major Clients
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
          {["Philos GC", "Gwangneung CC", "Hyundai Hillstate", "Lotte World", "Hana Financial"].map((client, i) => (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, 200 + i * 10, 15),
                background: "rgba(255,255,255,0.05)",
                padding: "12px 25px",
                borderRadius: 30,
                border: `1px solid ${colors.primary}`,
              }}
            >
              <span style={{ fontSize: 18, color: colors.text }}>{client}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 6: Japan Export & Global Reference (3:40 ~ 4:20)
// ============================================================
const Scene06Japan: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Export graph animation
  const bar2022Height = interpolate(frame, [60, 100], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bar2023Height = interpolate(frame, [80, 120], [0, 330], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene06_japan_en.mp3")} />
      <TechBackground />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <NeonText size={52}>Japan Export Track Record</NeonText>
        <div style={{ fontSize: 24, color: colors.textSub, marginTop: 10 }}>
          Proven Global Technology
        </div>
      </div>

      {/* Japan Map and Projects */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 100,
          opacity: fadeIn(frame, 30, 25),
        }}
      >
        {/* Japan map symbol */}
        <div
          style={{
            width: 500,
            height: 400,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 180,
              opacity: 0.3,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            🇯🇵
          </div>

          {/* Haneda Airport marker */}
          <div
            style={{
              position: "absolute",
              top: 200,
              right: 80,
              opacity: fadeIn(frame, 50, 20),
              transform: `scale(${scaleIn(frame, fps, 50)})`,
            }}
          >
            <div
              style={{
                background: colors.gold,
                padding: "8px 15px",
                borderRadius: 8,
                boxShadow: `0 0 20px ${colors.gold}`,
              }}
            >
              <span style={{ color: colors.bg, fontWeight: 600, fontSize: 14 }}>
                Haneda Airport<br/>Anamori-inari Sta.
              </span>
            </div>
          </div>

          {/* Nagoya marker */}
          <div
            style={{
              position: "absolute",
              top: 280,
              left: 150,
              opacity: fadeIn(frame, 70, 20),
              transform: `scale(${scaleIn(frame, fps, 70)})`,
            }}
          >
            <div
              style={{
                background: colors.primary,
                padding: "8px 15px",
                borderRadius: 8,
                boxShadow: `0 0 20px ${colors.primary}`,
              }}
            >
              <span style={{ color: colors.bg, fontWeight: 600, fontSize: 14 }}>
                Nagoya<br/>Sakae Station
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Export Growth Graph */}
      <div
        style={{
          position: "absolute",
          top: 180,
          right: 150,
          width: 500,
          height: 400,
          opacity: fadeIn(frame, 40, 25),
        }}
      >
        <div style={{ fontSize: 24, color: colors.text, marginBottom: 30, textAlign: "center" }}>
          Bicycle Parking System Export
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            height: 280,
            gap: 80,
          }}
        >
          {/* 2022 bar */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 100,
                height: bar2022Height,
                background: `linear-gradient(180deg, ${colors.gold}, ${colors.accent})`,
                borderRadius: "8px 8px 0 0",
                boxShadow: `0 0 20px ${colors.gold}`,
              }}
            />
            <div style={{ marginTop: 15 }}>
              <div style={{ fontSize: 20, color: colors.gold, fontWeight: 700 }}>
                500 Units
              </div>
              <div style={{ fontSize: 16, color: colors.textSub }}>2022</div>
            </div>
          </div>

          {/* 2023 bar */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 100,
                height: bar2023Height,
                background: `linear-gradient(180deg, ${colors.highlight}, ${colors.primary})`,
                borderRadius: "8px 8px 0 0",
                boxShadow: `0 0 30px ${colors.primary}`,
              }}
            />
            <div style={{ marginTop: 15 }}>
              <div style={{ fontSize: 20, color: colors.highlight, fontWeight: 700 }}>
                3,300 Units
              </div>
              <div style={{ fontSize: 16, color: colors.textSub }}>2023</div>
            </div>
          </div>
        </div>

        {/* Growth rate */}
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            opacity: fadeIn(frame, 130, 20),
          }}
        >
          <span
            style={{
              fontSize: 32,
              color: colors.success,
              fontWeight: 700,
            }}
          >
            ▲ 560% Growth
          </span>
        </div>
      </div>

      {/* Partners */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 150, 25),
        }}
      >
        <div style={{ fontSize: 22, color: colors.textSub, marginBottom: 20 }}>
          Japan Partners
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 60 }}>
          {["Tokai Giken", "RESTAR"].map((partner, i) => (
            <HoloCard
              key={i}
              width={200}
              style={{
                opacity: fadeIn(frame, 160 + i * 15, 20),
                transform: `scale(${scaleIn(frame, fps, 160 + i * 15)})`,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24 }}>🤝</div>
                <div style={{ fontSize: 20, color: colors.text, marginTop: 10 }}>
                  {partner}
                </div>
              </div>
            </HoloCard>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 7: Smart Factory & Partnership (4:20 ~ 4:50)
// ============================================================
const Scene07SmartFactory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene07_smartfactory_en.mp3")} />
      <TechBackground />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <NeonText size={52}>Smart Factory & AI Innovation</NeonText>
      </div>

      {/* AI Era badge */}
      <div
        style={{
          position: "absolute",
          top: 130,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 20, 20),
        }}
      >
        <span
          style={{
            fontSize: 24,
            color: colors.gold,
            background: "rgba(255, 215, 0, 0.15)",
            padding: "10px 30px",
            borderRadius: 30,
            border: `2px solid ${colors.gold}`,
          }}
        >
          🤖 Expanding Business for the AI Era
        </span>
      </div>

      {/* Smart Factory Diagram */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {/* BLE Mesh Sensors */}
        <div
          style={{
            opacity: fadeIn(frame, 40, 25),
            transform: `translateX(${slideIn(frame, 40, 25)}px)`,
          }}
        >
          <HoloCard width={350} height={280}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 15 }}>📡</div>
              <NeonText size={26} color={colors.primary}>
                BLE Mesh Sensor Network
              </NeonText>
              <div style={{ marginTop: 20, fontSize: 18, color: colors.textSub, lineHeight: 1.8 }}>
                Wireless Sensor Data Collection<br/>
                Real-time Environment Monitoring<br/>
                Equipment Status Surveillance
              </div>
            </div>
          </HoloCard>
        </div>

        {/* Arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            opacity: fadeIn(frame, 70, 20),
          }}
        >
          <div
            style={{
              fontSize: 50,
              color: colors.highlight,
            }}
          >
            ➤
          </div>
        </div>

        {/* AI Analysis */}
        <div
          style={{
            opacity: fadeIn(frame, 60, 25),
            transform: `scale(${scaleIn(frame, fps, 60)})`,
          }}
        >
          <HoloCard width={350} height={280} style={{ borderColor: colors.gold }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 15 }}>🧠</div>
              <NeonText size={26} color={colors.gold}>
                AI-Based Data Analysis
              </NeonText>
              <div style={{ marginTop: 20, fontSize: 18, color: colors.textSub, lineHeight: 1.8 }}>
                Pattern Recognition & Prediction<br/>
                Anomaly Detection<br/>
                Optimization Recommendations
              </div>
            </div>
          </HoloCard>
        </div>

        {/* Arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            opacity: fadeIn(frame, 90, 20),
          }}
        >
          <div style={{ fontSize: 50, color: colors.highlight }}>➤</div>
        </div>

        {/* Smart Factory */}
        <div
          style={{
            opacity: fadeIn(frame, 80, 25),
            transform: `translateX(${-slideIn(frame, 80, 25)}px)`,
          }}
        >
          <HoloCard width={350} height={280} style={{ borderColor: colors.success }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 15 }}>🏭</div>
              <NeonText size={26} color={colors.success}>
                Smart Factory
              </NeonText>
              <div style={{ marginTop: 20, fontSize: 18, color: colors.textSub, lineHeight: 1.8 }}>
                Improved Productivity<br/>
                Automated Quality Control<br/>
                Energy Efficiency Optimization
              </div>
            </div>
          </HoloCard>
        </div>
      </div>

      {/* KRETTO Partnership */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 120, 25),
        }}
      >
        <HoloCard width={800} style={{ margin: "0 auto", borderColor: colors.highlight }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
            <NeonText size={36}>UTTEC</NeonText>
            <div style={{ fontSize: 40, color: colors.gold }}>✕</div>
            <NeonText size={36} color={colors.gold}>KRETTO</NeonText>
          </div>
          <div style={{ fontSize: 22, color: colors.text, marginTop: 20 }}>
            Battery Safety Tech + Wireless Monitoring = Creating New Value
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 8: Closing (4:50 ~ 5:15)
// ============================================================
const Scene08Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("uttec/scene08_closing_en.mp3")} />
      <TechBackground />

      {/* Key Messages */}
      <div
        style={{
          position: "absolute",
          top: 150,
          width: "100%",
          textAlign: "center",
        }}
      >
        {[
          { text: "40 Years of Development Experience", delay: 0 },
          { text: "Global Certifications Achieved", delay: 15 },
          { text: "Proven Japan Export Track Record", delay: 30 },
          { text: "Smart Factory Innovation", delay: 45 },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, item.delay, 20),
              transform: `translateX(${slideIn(frame, item.delay, 20, 50)}px)`,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 36,
                color: colors.text,
                display: "inline-flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <span style={{ color: colors.highlight }}>✓</span>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* UTTEC Logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scaleIn(frame, fps, 80)})`,
          textAlign: "center",
        }}
      >
        <NeonText size={100} color={colors.highlight}>UTTEC</NeonText>
        <div
          style={{
            fontSize: 32,
            color: colors.text,
            marginTop: 20,
            letterSpacing: 10,
            opacity: fadeIn(frame, 100, 20),
          }}
        >
          Network Solution
        </div>
      </div>

      {/* Trust message */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 120, 25),
        }}
      >
        <span
          style={{
            fontSize: 28,
            color: colors.gold,
            fontStyle: "italic",
          }}
        >
          "Your Trusted Technology Partner"
        </span>
      </div>

      {/* Company info */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          opacity: fadeIn(frame, 140, 25),
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 60,
            fontSize: 18,
            color: colors.textSub,
          }}
        >
          <span>📍 Yongin, Gyeonggi, Korea</span>
          <span>📞 +82-31-627-2250</span>
          <span>🌐 www.uttec.co.kr</span>
        </div>
      </div>

      {/* Future together */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 160, 25),
        }}
      >
        <span style={{ fontSize: 24, color: colors.text }}>
          Let's Build the Future Together
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Global Overlay
// ============================================================
const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {/* Top logo (except Scene 1) */}
      {frame > SCENE_TIMINGS.scene01_opening.duration && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 30,
            opacity: 0.7,
          }}
        >
          <span style={{ fontSize: 24, color: colors.highlight, fontWeight: 700 }}>
            UTTEC
          </span>
        </div>
      )}
    </>
  );
};

// ============================================================
// Main Component
// ============================================================
export const UttecVideoEN: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <Sequence
        from={SCENE_TIMINGS.scene01_opening.start}
        durationInFrames={SCENE_TIMINGS.scene01_opening.duration}
      >
        <Scene01Opening />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene02_company.start}
        durationInFrames={SCENE_TIMINGS.scene02_company.duration}
      >
        <Scene02Company />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene03_ceo.start}
        durationInFrames={SCENE_TIMINGS.scene03_ceo.duration}
      >
        <Scene03CEO />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene04_blemesh.start}
        durationInFrames={SCENE_TIMINGS.scene04_blemesh.duration}
      >
        <Scene04BLEMesh />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene05_products.start}
        durationInFrames={SCENE_TIMINGS.scene05_products.duration}
      >
        <Scene05Products />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene06_japan.start}
        durationInFrames={SCENE_TIMINGS.scene06_japan.duration}
      >
        <Scene06Japan />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene07_smartfactory.start}
        durationInFrames={SCENE_TIMINGS.scene07_smartfactory.duration}
      >
        <Scene07SmartFactory />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.scene08_closing.start}
        durationInFrames={SCENE_TIMINGS.scene08_closing.duration}
      >
        <Scene08Closing />
      </Sequence>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};

export default UttecVideoEN;
