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

// ============ SCENE TIMINGS (frames @ 30fps) ============
// Measured from edge-tts mp3 length + 0.6s padding each
export const SCENE_TIMINGS = {
  s1: { duration: 892,  start: 0 },
  s2: { duration: 1077, start: 892 },
  s3: { duration: 1523, start: 1969 },
  s4: { duration: 1219, start: 3492 },
  s5: { duration: 1194, start: 4711 },
  s6: { duration: 853,  start: 5905 },
  s7: { duration: 1589, start: 6758 },
  s8: { duration: 1307, start: 8347 },
  s9: { duration: 927,  start: 9654 },
};
export const TOOLS_INTRO_DURATION = 10581;

// ============ COLORS ============
const C = {
  bg: "#0f1117",
  panel: "#1e293b",
  white: "#ffffff",
  gray100: "#f1f5f9",
  gray300: "#cbd5e1",
  gray500: "#64748b",
  gray700: "#334155",
  gray800: "#1e293b",
  gray900: "#0f172a",
  primary: "#3b82f6",
  accent: "#f59e0b",
  danger: "#ef4444",
  success: "#10b981",
  // Track colors
  trackA: "#a855f7", // Purple - Daily core
  trackB: "#22c55e", // Green  - Automation
  trackC: "#3b82f6", // Blue   - Infrastructure
  trackD: "#ec4899", // Pink   - Collaboration
  trackE: "#14b8a6", // Teal   - Content/Cloud
};

// ============ 13 TOOLS DATA ============
type Tool = { id: number; name: string; icon: string; track: "A"|"B"|"C"|"D"|"E"; tag: string };
const TOOLS: Tool[] = [
  { id: 1,  name: "Claude Code", icon: "🤖", track: "A", tag: "AI 비서" },
  { id: 2,  name: "Obsidian",    icon: "📝", track: "A", tag: "세컨드 브레인" },
  { id: 3,  name: "VS Code",     icon: "💻", track: "A", tag: "표준 에디터" },
  { id: 4,  name: "Skill",       icon: "⚡", track: "B", tag: "자동화 매크로" },
  { id: 5,  name: "MCP",         icon: "🔌", track: "B", tag: "외부 연결" },
  { id: 6,  name: "GitHub",      icon: "🌳", track: "C", tag: "변경 이력" },
  { id: 7,  name: "SSH",         icon: "🔑", track: "C", tag: "원격 접속" },
  { id: 8,  name: "Tailscale",   icon: "🌐", track: "C", tag: "원클릭 VPN" },
  { id: 9,  name: "Slack",       icon: "💬", track: "D", tag: "알림 허브" },
  { id: 10, name: "Colab",       icon: "🧪", track: "E", tag: "무료 GPU" },
  { id: 11, name: "NotebookLM",  icon: "📚", track: "E", tag: "AI 콘텐츠" },
  { id: 12, name: "Remotion",    icon: "🎬", track: "E", tag: "AI 영상" },
  { id: 13, name: "AWS Cloud",   icon: "☁️", track: "E", tag: "24시간 서버" },
];
const trackColor = (t: Tool["track"]) =>
  ({ A: C.trackA, B: C.trackB, C: C.trackC, D: C.trackD, E: C.trackE }[t]);

// ============ HELPERS ============
const fadeIn = (f: number, s = 0, d = 30) =>
  interpolate(f, [s, s + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const fadeOut = (f: number, s = 0, d = 30) =>
  interpolate(f, [s, s + d], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const slideUp = (f: number, s = 0, d = 30, dist = 50) =>
  interpolate(f, [s, s + d], [dist, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const scaleIn = (f: number, fps: number, delay = 0) =>
  Math.min(spring({ frame: Math.max(0, f - delay), fps, config: { damping: 12, stiffness: 100 } }), 1);

// ============ SHARED BACKGROUND ============
const Backdrop: React.FC<{ c1?: string; c2?: string; c3?: string }> = ({
  c1 = "#1e1b4b", c2 = "#312e81", c3 = "#0f172a",
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`,
        }}
      />
      {[0, 1, 2].map((i) => {
        const x = 400 + Math.sin((f + i * 100) / 80) * 300;
        const y = 300 + Math.cos((f + i * 100) / 60) * 200;
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
              background: `radial-gradient(circle, ${C.primary}25 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Particles: React.FC<{ count?: number; color?: string }> = ({ count = 30, color = C.white }) => {
  const f = useCurrentFrame();
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = (i * 137.5) % 1920;
        const baseY = (i * 73.7) % 1080;
        const speed = 0.5 + (i % 5) * 0.3;
        const size = 3 + (i % 4) * 2;
        const x = baseX + Math.sin((f * speed + i * 50) / 40) * 30;
        const y = (baseY + f * speed * 0.5) % 1200 - 60;
        const opacity = 0.1 + Math.sin((f + i * 20) / 30) * 0.1;
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

// ============ UI PRIMITIVES ============
const Glow: React.FC<{ children: React.ReactNode; size?: number; color?: string; glow?: string }>
  = ({ children, size = 72, color = C.white, glow = C.primary }) => (
  <span style={{ fontSize: size, fontWeight: "bold", color, textShadow: `0 0 20px ${glow}, 0 0 40px ${glow}80` }}>
    {children}
  </span>
);

const Card: React.FC<{ children: React.ReactNode; w?: number; border?: string; style?: React.CSSProperties }>
  = ({ children, w = 400, border = C.primary, style = {} }) => (
  <div
    style={{
      width: w,
      padding: 28,
      backgroundColor: `${C.gray900}ee`,
      borderRadius: 22,
      border: `3px solid ${border}`,
      boxShadow: `0 0 40px ${border}30, 0 20px 60px rgba(0,0,0,0.5)`,
      backdropFilter: "blur(10px)",
      ...style,
    }}
  >
    {children}
  </div>
);

const ToolBadge: React.FC<{ tool: Tool; size?: number }> = ({ tool, size = 110 }) => {
  const color = trackColor(tool.track);
  return (
    <div style={{ width: size, textAlign: "center" }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 22,
          background: `linear-gradient(135deg, ${color}40 0%, ${color}10 100%)`,
          border: `3px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.45,
          boxShadow: `0 0 25px ${color}60`,
          margin: "0 auto",
        }}
      >
        {tool.icon}
      </div>
      <div style={{ fontSize: 18, color: C.white, marginTop: 8, fontWeight: "bold" }}>{tool.name}</div>
    </div>
  );
};

const Subtitle: React.FC<{ text: string; show?: boolean }> = ({ text, show = true }) => {
  const f = useCurrentFrame();
  if (!show) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 70,
        left: 0,
        right: 0,
        textAlign: "center",
        opacity: fadeIn(f, 0, 15),
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "14px 36px",
          backgroundColor: "rgba(0,0,0,0.7)",
          borderRadius: 12,
          border: `1px solid ${C.gray700}`,
          maxWidth: 1500,
        }}
      >
        <span style={{ fontSize: 30, color: C.white, fontWeight: 500, lineHeight: 1.4 }}>{text}</span>
      </div>
    </div>
  );
};

// ============ SCENE 1 — HOOK ============
const Scene1Hook: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = fadeIn(f, 0, 30);
  const titleY = slideUp(f, 0, 30);
  const aiCardsOpacity = fadeIn(f, 90, 40);
  const connectOpacity = fadeIn(f, 600, 40);

  // Stage 1 (0-150f): Title only
  // Stage 2 (90-600f): 9 AI tool logos showering
  // Stage 3 (600+): "도구는 연결될 때 진짜 힘을 발휘합니다"

  const pioneerLogos = [
    { name: "ChatGPT", icon: "🟢", color: "#10a37f" },
    { name: "Midjourney", icon: "🎨", color: "#5865f2" },
    { name: "Claude", icon: "🧠", color: "#d97706" },
    { name: "Suno", icon: "🎵", color: "#ec4899" },
    { name: "Runway", icon: "🎥", color: "#a855f7" },
    { name: "Notion", icon: "📓", color: "#000000" },
    { name: "Obsidian", icon: "💎", color: "#7c3aed" },
    { name: "NotebookLM", icon: "📚", color: "#4285f4" },
    { name: "Slack", icon: "💬", color: "#611f69" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro-tools/scene1_hook.mp3")} />
      <Backdrop c1="#0f0c29" c2="#302b63" c3="#1e1b4b" />
      <Particles count={50} />

      {/* Big question */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity * (f < 600 ? 1 : fadeOut(f, 600, 30)),
          transform: `translateY(${titleY}px)`,
        }}
      >
        <Glow size={84} glow={C.trackA}>AI 시대,</Glow>
        <div style={{ marginTop: 20 }}>
          <Glow size={92} color={C.accent} glow={C.accent}>진짜 변한 게 뭘까요?</Glow>
        </div>
      </div>

      {/* AI tool shower */}
      {f >= 90 && f < 620 && (
        <div
          style={{
            position: "absolute",
            top: "44%",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 20,
            opacity: aiCardsOpacity * (f < 580 ? 1 : fadeOut(f, 580, 30)),
            padding: "0 100px",
          }}
        >
          {pioneerLogos.map((ai, i) => {
            const delay = 100 + i * 18;
            const scale = scaleIn(f, fps, delay);
            const float = Math.sin((f + i * 30) / 20) * 6;
            return (
              <div key={ai.name} style={{ transform: `scale(${scale}) translateY(${float}px)` }}>
                <Card w={170} border={ai.color} style={{ padding: 16 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 48 }}>{ai.icon}</div>
                    <div style={{ fontSize: 20, color: C.white, fontWeight: "bold", marginTop: 6 }}>{ai.name}</div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {/* "수십 개 도구" overlay */}
      {f >= 200 && f < 580 && (
        <div
          style={{
            position: "absolute",
            top: "78%",
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: fadeIn(f, 200, 30),
          }}
        >
          <Glow size={50} color={C.danger} glow={C.danger}>한 달에 수십 개씩 쏟아집니다</Glow>
        </div>
      )}

      {/* Stage 3: Connection message */}
      {f >= 600 && (
        <>
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: 0,
              right: 0,
              textAlign: "center",
              opacity: connectOpacity,
            }}
          >
            <Glow size={66} color={C.gray300} glow={C.trackA}>도구는</Glow>
            <div style={{ marginTop: 30 }}>
              <Glow size={96} color={C.accent} glow={C.trackA}>연결될 때</Glow>
            </div>
            <div style={{ marginTop: 20 }}>
              <Glow size={66} color={C.gray300} glow={C.trackA}>진짜 힘을 발휘합니다</Glow>
            </div>
          </div>
          <NetworkGraph startFrame={620} />
        </>
      )}
    </AbsoluteFill>
  );
};

// Mini network graph at bottom for Scene 1 ending
const NetworkGraph: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const f = useCurrentFrame();
  const op = fadeIn(f, startFrame, 40);
  const cx = 960;
  const cy = 800;
  const R = 180;
  const nodes = Array.from({ length: 8 }, (_, i) => ({
    x: cx + R * Math.cos((i / 8) * 2 * Math.PI),
    y: cy + R * Math.sin((i / 8) * 2 * Math.PI),
    color: i % 2 === 0 ? C.trackA : C.trackB,
  }));

  return (
    <svg width="1920" height="1080" style={{ position: "absolute", top: 0, left: 0, opacity: op }}>
      {nodes.map((n, i) =>
        nodes.map((m, j) =>
          i < j ? (
            <line
              key={`${i}-${j}`}
              x1={n.x} y1={n.y} x2={m.x} y2={m.y}
              stroke={C.primary}
              strokeWidth={1.5}
              opacity={0.3 + Math.sin((f + i * 8 + j * 5) / 25) * 0.2}
            />
          ) : null
        )
      )}
      {/* Center hub */}
      <circle cx={cx} cy={cy} r={28} fill={C.accent} opacity={0.9}>
      </circle>
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={16 + Math.sin((f + i * 12) / 18) * 3} fill={n.color} opacity={0.85} />
      ))}
    </svg>
  );
};

// ============ SCENE 2 — SOLUTION (5 Tracks) ============
const Scene2Solution: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Reveal tracks one by one
  const trackOrder: Array<"A"|"B"|"C"|"D"|"E"> = ["A", "B", "C", "D", "E"];
  const trackDelays: Record<string, number> = { A: 100, B: 280, C: 460, D: 640, E: 820 };
  const trackLabels: Record<string, string> = {
    A: "Track A · 즉시 효용 (1-2일)",
    B: "Track B · 자동화 (1일)",
    C: "Track C · 인프라 (2-3일)",
    D: "Track D · 협업 (0.5일)",
    E: "Track E · 심화 (3-5일)",
  };

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro-tools/scene2_solution.mp3")} />
      <Backdrop c1="#1e3a8a" c2="#3730a3" c3="#0f172a" />
      <Particles count={25} />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(f, 0, 30),
        }}
      >
        <Glow size={64} glow={C.accent}>13개 도구 · 5 Track</Glow>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 30, color: C.gray300 }}>학습 곡선 우선 설계</span>
        </div>
      </div>

      {/* 5 horizontal tracks */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 100,
          right: 100,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {trackOrder.map((tk) => {
          const delay = trackDelays[tk];
          const op = fadeIn(f, delay, 30);
          const xOffset = interpolate(f, [delay, delay + 30], [-80, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const tools = TOOLS.filter((t) => t.track === tk);
          const color = trackColor(tk);
          return (
            <div
              key={tk}
              style={{
                opacity: op,
                transform: `translateX(${xOffset}px)`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                backgroundColor: `${C.gray900}cc`,
                border: `3px solid ${color}`,
                borderRadius: 18,
                padding: "16px 24px",
                boxShadow: `0 0 30px ${color}30`,
              }}
            >
              <div style={{ width: 280, flexShrink: 0 }}>
                <span style={{ fontSize: 28, color, fontWeight: "bold" }}>{trackLabels[tk]}</span>
              </div>
              <div style={{ display: "flex", gap: 16, flex: 1 }}>
                {tools.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 18px",
                      borderRadius: 12,
                      backgroundColor: `${color}25`,
                      border: `2px solid ${color}`,
                    }}
                  >
                    <span style={{ fontSize: 32 }}>{t.icon}</span>
                    <span style={{ fontSize: 22, color: C.white, fontWeight: "bold" }}>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom emphasis */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(f, 940, 30),
          transform: `scale(${scaleIn(f, fps, 940)})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 60px",
            background: `linear-gradient(135deg, ${C.accent}cc 0%, ${C.danger}cc 100%)`,
            borderRadius: 24,
            boxShadow: `0 0 40px ${C.accent}60`,
          }}
        >
          <span style={{ fontSize: 38, color: C.white, fontWeight: "bold" }}>
            ⭐ 3일이면 Track A+B만으로도 일상이 바뀝니다
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3 — TRACK A (Daily Core) ============
const Scene3TrackA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tools = TOOLS.filter((t) => t.track === "A");

  // Show each tool sequentially
  const toolDelays = [50, 410, 760];
  const summaryDelay = 1180;

  const toolDescriptions: Record<number, { line1: string; line2: string }> = {
    1: { line1: "터미널에서 실행되는 AI 비서", line2: "직접 파일 편집 + 명령 실행" },
    2: { line1: "마크다운 메모를 양방향 링크로", line2: "두뇌의 외장 하드" },
    3: { line1: "전 세계 개발자 70% 표준 에디터", line2: "Claude와 한 화면에서 협업" },
  };

  // Demo screen content per tool
  const demoFor = (id: number) => {
    if (id === 1) return <TerminalDemo />;
    if (id === 2) return <ObsidianGraphDemo />;
    return <VSCodeDemo />;
  };

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro-tools/scene3_trackA.mp3")} />
      <Backdrop c1="#581c87" c2="#3730a3" c3="#0f172a" />
      <Particles count={20} color={C.trackA} />

      {/* Track A title */}
      <div style={{ position: "absolute", top: 40, left: 0, right: 0, textAlign: "center", opacity: fadeIn(f, 0, 30) }}>
        <Glow size={56} color={C.trackA} glow={C.trackA}>Track A · 즉시 효용 핵심 3종</Glow>
      </div>

      {/* Sequential tool focus */}
      {tools.map((t, i) => {
        const start = toolDelays[i];
        const next = toolDelays[i + 1] ?? summaryDelay;
        if (f < start || f >= next) return null;
        const local = f - start;
        const op = fadeIn(local, 0, 20) * (f >= next - 30 ? fadeOut(f, next - 30, 30) : 1);
        const desc = toolDescriptions[t.id];
        return (
          <React.Fragment key={t.id}>
            <div
              style={{
                position: "absolute",
                top: 160,
                left: 80,
                opacity: op,
                transform: `scale(${scaleIn(local, fps, 0)})`,
              }}
            >
              <Card w={680} border={trackColor(t.track)} style={{ padding: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 28 }}>
                  <div
                    style={{
                      width: 130,
                      height: 130,
                      borderRadius: 28,
                      background: `linear-gradient(135deg, ${C.trackA}40 0%, ${C.trackA}10 100%)`,
                      border: `4px solid ${C.trackA}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 70,
                    }}
                  >
                    {t.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 26, color: C.trackA, fontWeight: "bold" }}>0{t.id}</div>
                    <div style={{ fontSize: 56, color: C.white, fontWeight: "bold" }}>{t.name}</div>
                  </div>
                </div>
                <div style={{ fontSize: 30, color: C.gray100, lineHeight: 1.5 }}>{desc.line1}</div>
                <div style={{ fontSize: 26, color: C.gray300, marginTop: 10 }}>→ {desc.line2}</div>
              </Card>
            </div>
            <div
              style={{
                position: "absolute",
                top: 160,
                right: 80,
                opacity: op,
                transform: `scale(${scaleIn(local, fps, 8)})`,
              }}
            >
              {demoFor(t.id)}
            </div>
          </React.Fragment>
        );
      })}

      {/* Summary / Track A time */}
      {f >= summaryDelay && (
        <div
          style={{
            position: "absolute",
            top: "32%",
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: fadeIn(f, summaryDelay, 30),
          }}
        >
          <div style={{ marginBottom: 30 }}>
            <Glow size={56} color={C.white} glow={C.trackA}>3가지로 매일이 자동화됩니다</Glow>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 50, marginTop: 50 }}>
            {tools.map((t, i) => {
              const sc = scaleIn(f, fps, summaryDelay + 20 + i * 15);
              const float = Math.sin((f + i * 30) / 20) * 8;
              return (
                <div key={t.id} style={{ transform: `scale(${sc}) translateY(${float}px)` }}>
                  <ToolBadge tool={t} size={150} />
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 70 }}>
            <div
              style={{
                display: "inline-block",
                padding: "18px 50px",
                background: `linear-gradient(135deg, ${C.trackA}cc 0%, ${C.trackA}88 100%)`,
                borderRadius: 18,
                boxShadow: `0 0 30px ${C.trackA}60`,
              }}
            >
              <span style={{ fontSize: 36, color: C.white, fontWeight: "bold" }}>
                ⏱ Track A 학습 시간: 1~2일
              </span>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Demo: Terminal (Claude Code)
const TerminalDemo: React.FC = () => {
  const f = useCurrentFrame();
  const lines = [
    { text: "$ claude", color: "#22c55e", delay: 30 },
    { text: "Welcome to Claude Code", color: "#94a3b8", delay: 60 },
    { text: "> 이 폴더 정리해줘", color: "#fbbf24", delay: 110 },
    { text: "✓ 12개 파일 분류 완료", color: "#22c55e", delay: 170 },
    { text: "✓ 3개 폴더 생성", color: "#22c55e", delay: 200 },
    { text: "✓ README.md 작성", color: "#22c55e", delay: 230 },
  ];
  return (
    <div
      style={{
        width: 720,
        height: 460,
        backgroundColor: "#0a0a0a",
        borderRadius: 16,
        border: `2px solid ${C.gray700}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        overflow: "hidden",
      }}
    >
      <div style={{ height: 36, backgroundColor: "#1f1f1f", display: "flex", alignItems: "center", paddingLeft: 16, gap: 8 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ef4444" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#22c55e" }} />
        <span style={{ fontSize: 14, color: "#737373", marginLeft: 16 }}>~/project — claude</span>
      </div>
      <div style={{ padding: 24, fontFamily: "Consolas, monospace", fontSize: 22, lineHeight: 1.7 }}>
        {lines.map((l, i) =>
          f >= l.delay ? (
            <div key={i} style={{ color: l.color, opacity: fadeIn(f, l.delay, 10) }}>
              {l.text}
            </div>
          ) : null
        )}
        {f >= 240 && f % 30 < 15 && (
          <span style={{ color: "#22c55e", fontSize: 26 }}>▌</span>
        )}
      </div>
    </div>
  );
};

// Demo: Obsidian graph
const ObsidianGraphDemo: React.FC = () => {
  const f = useCurrentFrame();
  const cx = 360;
  const cy = 230;
  const nodes: Array<{ x: number; y: number; color: string; r: number }> = [];
  const N = 18;
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * 2 * Math.PI + f / 200;
    const r = 90 + ((i % 3) * 60);
    nodes.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      color: i % 3 === 0 ? C.trackA : i % 3 === 1 ? C.primary : C.accent,
      r: 8 + (i % 4) * 3,
    });
  }
  return (
    <div
      style={{
        width: 720,
        height: 460,
        backgroundColor: "#1a1a2e",
        borderRadius: 16,
        border: `2px solid ${C.trackA}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ padding: "12px 20px", fontSize: 18, color: C.gray300, borderBottom: `1px solid ${C.gray700}` }}>
        Obsidian — Graph View
      </div>
      <svg width="720" height="420" viewBox="0 0 720 420">
        {nodes.map((n, i) =>
          nodes.map((m, j) =>
            i < j && Math.hypot(n.x - m.x, n.y - m.y) < 200 ? (
              <line
                key={`${i}-${j}`}
                x1={n.x} y1={n.y} x2={m.x} y2={m.y}
                stroke={C.gray500}
                strokeWidth={0.7}
                opacity={0.4}
              />
            ) : null
          )
        )}
        {/* Center node */}
        <circle cx={cx} cy={cy} r={22} fill={C.accent} opacity={0.95} />
        <text x={cx} y={cy + 5} fontSize={11} textAnchor="middle" fill="#000" fontWeight="bold">ME</text>
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity={0.85} />
        ))}
      </svg>
    </div>
  );
};

// Demo: VS Code
const VSCodeDemo: React.FC = () => {
  const f = useCurrentFrame();
  const tabs = ["app.tsx", "Claude Chat"];
  const codeLines = [
    { code: "import React from 'react';", color: "#c084fc", delay: 20 },
    { code: "", color: "#fff", delay: 30 },
    { code: "export const App = () => {", color: "#60a5fa", delay: 50 },
    { code: "  // Claude가 이 컴포넌트를 작성", color: "#6b7280", delay: 90 },
    { code: "  return <h1>안녕하세요</h1>;", color: "#fbbf24", delay: 130 },
    { code: "};", color: "#fff", delay: 160 },
  ];
  const claudeLines = [
    { text: "사용자: React 컴포넌트 만들어줘", color: "#94a3b8", delay: 60 },
    { text: "Claude: 네, app.tsx를 만들겠습니다.", color: "#a3e635", delay: 110 },
    { text: "✓ 6줄 작성 완료", color: "#22c55e", delay: 180 },
  ];
  return (
    <div
      style={{
        width: 720,
        height: 460,
        backgroundColor: "#1e1e1e",
        borderRadius: 16,
        border: `2px solid ${C.gray700}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tab bar */}
      <div style={{ height: 38, backgroundColor: "#252526", display: "flex", borderBottom: `1px solid #3e3e42` }}>
        {tabs.map((t, i) => (
          <div
            key={t}
            style={{
              padding: "8px 24px",
              fontSize: 16,
              color: C.white,
              backgroundColor: i === 0 ? "#1e1e1e" : "transparent",
              borderRight: `1px solid #3e3e42`,
            }}
          >
            {t}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex" }}>
        {/* Left: Editor */}
        <div style={{ flex: 1, padding: 18, fontFamily: "Consolas, monospace", fontSize: 17, lineHeight: 1.7, borderRight: `2px solid ${C.gray700}` }}>
          {codeLines.map((l, i) =>
            f >= l.delay ? (
              <div key={i} style={{ color: l.color, opacity: fadeIn(f, l.delay, 10) }}>
                <span style={{ color: "#6b7280", marginRight: 12 }}>{i + 1}</span>
                {l.code}
              </div>
            ) : null
          )}
        </div>
        {/* Right: Claude panel */}
        <div style={{ width: 300, padding: 16, backgroundColor: "#1a1a1a", fontSize: 14 }}>
          <div style={{ fontSize: 13, color: C.gray500, marginBottom: 12 }}>● Claude Code</div>
          {claudeLines.map((l, i) =>
            f >= l.delay ? (
              <div key={i} style={{ color: l.color, opacity: fadeIn(f, l.delay, 10), marginBottom: 8, lineHeight: 1.5 }}>
                {l.text}
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

// ============ SCENE 4 — TRACK B (Skill + MCP) ============
const Scene4TrackB: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tools = TOOLS.filter((t) => t.track === "B");

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro-tools/scene4_trackB.mp3")} />
      <Backdrop c1="#064e3b" c2="#065f46" c3="#0f172a" />
      <Particles count={20} color={C.trackB} />

      <div style={{ position: "absolute", top: 40, left: 0, right: 0, textAlign: "center", opacity: fadeIn(f, 0, 30) }}>
        <Glow size={56} color={C.trackB} glow={C.trackB}>Track B · Claude 확장</Glow>
      </div>

      {/* Skill (left) */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 80,
          width: 880,
          opacity: fadeIn(f, 60, 30),
          transform: `translateX(${interpolate(f, [60, 90], [-80, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
        }}
      >
        <Card w={880} border={C.trackB}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 22 }}>
            <span style={{ fontSize: 70 }}>{tools[0].icon}</span>
            <div>
              <div style={{ fontSize: 24, color: C.trackB, fontWeight: "bold" }}>04</div>
              <div style={{ fontSize: 50, color: C.white, fontWeight: "bold" }}>Skill</div>
              <div style={{ fontSize: 22, color: C.gray300 }}>Claude의 매크로 — 슬래시 명령으로 자동화</div>
            </div>
          </div>
          <SlashCommandDemo />
        </Card>
      </div>

      {/* MCP (right) */}
      {f >= 600 && (
        <div
          style={{
            position: "absolute",
            top: 170,
            right: 80,
            width: 880,
            opacity: fadeIn(f, 600, 30),
            transform: `translateX(${interpolate(f, [600, 630], [80, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          }}
        >
          <Card w={880} border={C.trackB}>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 22 }}>
              <span style={{ fontSize: 70 }}>{tools[1].icon}</span>
              <div>
                <div style={{ fontSize: 24, color: C.trackB, fontWeight: "bold" }}>05</div>
                <div style={{ fontSize: 50, color: C.white, fontWeight: "bold" }}>MCP</div>
                <div style={{ fontSize: 22, color: C.gray300 }}>외부 서비스에 직접 접근</div>
              </div>
            </div>
            <MCPRadialDemo />
          </Card>
        </div>
      )}

      {/* Track B time */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(f, 1080, 30),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "18px 50px",
            background: `linear-gradient(135deg, ${C.trackB}cc 0%, ${C.trackB}88 100%)`,
            borderRadius: 18,
            boxShadow: `0 0 30px ${C.trackB}60`,
          }}
        >
          <span style={{ fontSize: 34, color: C.white, fontWeight: "bold" }}>⏱ Track B 학습 시간: 1일</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SlashCommandDemo: React.FC = () => {
  const f = useCurrentFrame();
  const items = [
    { text: "→ git pull", delay: 80 },
    { text: "→ 어제 세션 복원", delay: 130 },
    { text: "→ 오늘 할일 표시", delay: 180 },
    { text: "→ Notion 동기화", delay: 230 },
    { text: "→ 작업보고서 생성", delay: 280 },
  ];
  return (
    <div style={{ backgroundColor: "#0a0a0a", borderRadius: 12, padding: 22, fontFamily: "Consolas, monospace" }}>
      <div style={{ fontSize: 28, color: "#fbbf24", marginBottom: 16 }}>/work-start</div>
      {items.map((it, i) =>
        f >= it.delay ? (
          <div
            key={i}
            style={{
              fontSize: 22,
              color: "#22c55e",
              opacity: fadeIn(f, it.delay, 10),
              marginBottom: 8,
            }}
          >
            ✓ {it.text}
          </div>
        ) : null
      )}
      {f >= 340 && (
        <div style={{ fontSize: 24, color: "#fbbf24", marginTop: 20, opacity: fadeIn(f, 340, 20) }}>
          /work-end → 보고서 + 커밋 + 푸시까지 자동
        </div>
      )}
    </div>
  );
};

const MCPRadialDemo: React.FC = () => {
  const f = useCurrentFrame();
  const services = [
    { name: "Notion", icon: "📓", angle: -120 },
    { name: "Calendar", icon: "📅", angle: -60 },
    { name: "Gmail", icon: "✉️", angle: 0 },
    { name: "GitHub", icon: "🌳", angle: 60 },
    { name: "Slack", icon: "💬", angle: 120 },
    { name: "Drive", icon: "📂", angle: 180 },
  ];
  const cx = 410;
  const cy = 200;
  const R = 150;
  return (
    <div style={{ height: 440, position: "relative" }}>
      <svg width="820" height="420" viewBox="0 0 820 420">
        {/* Pulse circles */}
        <circle cx={cx} cy={cy} r={R + (f % 60)} fill="none" stroke={C.trackB} strokeWidth={2} opacity={0.25} />
        {/* Center: Claude */}
        <circle cx={cx} cy={cy} r={50} fill={C.trackB} opacity={0.95} />
        <text x={cx} y={cy + 8} fontSize={20} textAnchor="middle" fill="#fff" fontWeight="bold">Claude</text>
        {/* Services */}
        {services.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const sx = cx + R * Math.cos(rad);
          const sy = cy + R * Math.sin(rad);
          const visible = f >= 60 + i * 25;
          if (!visible) return null;
          const op = fadeIn(f, 60 + i * 25, 15);
          return (
            <g key={s.name} opacity={op}>
              <line x1={cx} y1={cy} x2={sx} y2={sy} stroke={C.accent} strokeWidth={2.5} opacity={0.6} />
              <circle cx={sx} cy={sy} r={32} fill="#ffffff" />
              <text x={sx} y={sy + 12} fontSize={32} textAnchor="middle">{s.icon}</text>
              <text x={sx} y={sy + 60} fontSize={18} textAnchor="middle" fill="#fff" fontWeight="bold">{s.name}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ============ SCENE 5 — TRACK C (Infrastructure) ============
const Scene5TrackC: React.FC = () => {
  const f = useCurrentFrame();
  const tools = TOOLS.filter((t) => t.track === "C");
  const cardDelays = [50, 380, 720];

  const descriptions: Record<number, string> = {
    6: "코드의 타임머신 — 어제 버전으로",
    7: "원격 서버 접속의 열쇠",
    8: "원클릭 VPN — 100대 무료",
  };

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro-tools/scene5_trackC.mp3")} />
      <Backdrop c1="#1e3a8a" c2="#1d4ed8" c3="#0f172a" />
      <Particles count={20} color={C.trackC} />

      <div style={{ position: "absolute", top: 40, left: 0, right: 0, textAlign: "center", opacity: fadeIn(f, 0, 30) }}>
        <Glow size={56} color={C.trackC} glow={C.trackC}>Track C · 인프라 · 원격</Glow>
      </div>

      {/* 3 stacked cards */}
      <div style={{ position: "absolute", top: 160, left: 80, display: "flex", flexDirection: "column", gap: 22 }}>
        {tools.map((t, i) => {
          const start = cardDelays[i];
          const op = fadeIn(f, start, 30);
          const xOffset = interpolate(f, [start, start + 30], [-80, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          return (
            <div key={t.id} style={{ opacity: op, transform: `translateX(${xOffset}px)` }}>
              <Card w={780} border={C.trackC}>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <span style={{ fontSize: 80 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 22, color: C.trackC, fontWeight: "bold" }}>0{t.id}</div>
                    <div style={{ fontSize: 44, color: C.white, fontWeight: "bold" }}>{t.name}</div>
                    <div style={{ fontSize: 24, color: C.gray100, marginTop: 6 }}>{descriptions[t.id]}</div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Right side: Network mesh visual */}
      <div style={{ position: "absolute", top: 180, right: 80, opacity: fadeIn(f, 750, 40) }}>
        <Card w={520} border={C.trackC}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 26, color: C.white, fontWeight: "bold" }}>Tailscale Mesh</span>
          </div>
          <MeshNetwork />
        </Card>
      </div>

      {/* Track C time */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(f, 1050, 30),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "18px 50px",
            background: `linear-gradient(135deg, ${C.trackC}cc 0%, ${C.trackC}88 100%)`,
            borderRadius: 18,
            boxShadow: `0 0 30px ${C.trackC}60`,
          }}
        >
          <span style={{ fontSize: 34, color: C.white, fontWeight: "bold" }}>⏱ Track C 학습 시간: 2~3일</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const MeshNetwork: React.FC = () => {
  const f = useCurrentFrame();
  const devices = [
    { icon: "💻", label: "노트북", x: 230, y: 60 },
    { icon: "🖥️", label: "서버", x: 80,  y: 180 },
    { icon: "📱", label: "휴대폰", x: 380, y: 180 },
    { icon: "🍓", label: "라파", x: 170, y: 300 },
    { icon: "📟", label: "태블릿", x: 290, y: 300 },
  ];
  return (
    <svg width="460" height="360" viewBox="0 0 460 360">
      {/* Mesh lines */}
      {devices.map((a, i) =>
        devices.map((b, j) =>
          i < j ? (
            <line
              key={`${i}-${j}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={C.trackC}
              strokeWidth={2}
              opacity={0.4 + Math.sin((f + i * 10 + j * 7) / 20) * 0.3}
            />
          ) : null
        )
      )}
      {devices.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r={32} fill="#ffffff" stroke={C.trackC} strokeWidth={3} />
          <text x={d.x} y={d.y + 12} fontSize={32} textAnchor="middle">{d.icon}</text>
          <text x={d.x} y={d.y + 60} fontSize={18} textAnchor="middle" fill="#fff" fontWeight="bold">{d.label}</text>
        </g>
      ))}
    </svg>
  );
};

// ============ SCENE 6 — TRACK D (Slack) ============
const Scene6TrackD: React.FC = () => {
  const f = useCurrentFrame();
  const slack = TOOLS.find((t) => t.track === "D")!;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro-tools/scene6_trackD.mp3")} />
      <Backdrop c1="#831843" c2="#9d174d" c3="#0f172a" />
      <Particles count={20} color={C.trackD} />

      <div style={{ position: "absolute", top: 40, left: 0, right: 0, textAlign: "center", opacity: fadeIn(f, 0, 30) }}>
        <Glow size={56} color={C.trackD} glow={C.trackD}>Track D · 팀 협업 허브</Glow>
      </div>

      {/* Big Slack card on left */}
      <div style={{ position: "absolute", top: 180, left: 80, opacity: fadeIn(f, 50, 30) }}>
        <Card w={620} border={C.trackD}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24 }}>
            <span style={{ fontSize: 90 }}>{slack.icon}</span>
            <div>
              <div style={{ fontSize: 26, color: C.trackD, fontWeight: "bold" }}>09</div>
              <div style={{ fontSize: 56, color: C.white, fontWeight: "bold" }}>Slack</div>
            </div>
          </div>
          <div style={{ fontSize: 26, color: C.gray100, lineHeight: 1.6 }}>
            모든 도구의 알림을 한 곳에 모읍니다.
          </div>
          <div style={{ marginTop: 24 }}>
            <span style={{ fontSize: 22, color: C.gray300 }}>채널: </span>
            {["#dev", "#server", "#docs", "#alerts"].map((c, i) => (
              <span
                key={c}
                style={{
                  display: "inline-block",
                  marginRight: 10,
                  padding: "4px 14px",
                  borderRadius: 8,
                  backgroundColor: C.trackD + "30",
                  border: `1px solid ${C.trackD}`,
                  fontSize: 22,
                  color: C.white,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Right side: simulated Slack notifications */}
      <div style={{ position: "absolute", top: 180, right: 80, width: 700, opacity: fadeIn(f, 200, 30) }}>
        <Card w={700} border={C.trackD}>
          <div style={{ marginBottom: 18, fontSize: 22, color: C.gray300, borderBottom: `1px solid ${C.gray700}`, paddingBottom: 12 }}>
            #ops — 자동 알림
          </div>
          <SlackNotifications />
        </Card>
      </div>

      {/* Track D time */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(f, 740, 30),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "18px 50px",
            background: `linear-gradient(135deg, ${C.trackD}cc 0%, ${C.trackD}88 100%)`,
            borderRadius: 18,
            boxShadow: `0 0 30px ${C.trackD}60`,
          }}
        >
          <span style={{ fontSize: 34, color: C.white, fontWeight: "bold" }}>⏱ Track D 학습 시간: 0.5일</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SlackNotifications: React.FC = () => {
  const f = useCurrentFrame();
  const notifs = [
    { source: "GitHub", icon: "🌳", text: "PR #142 머지됨 — main", color: "#1f883d", delay: 60 },
    { source: "AWS", icon: "☁️", text: "EC2 인스턴스 부하 70% ⚠", color: "#ff9900", delay: 130 },
    { source: "Notion", icon: "📓", text: "회의록 페이지 업데이트", color: "#000", delay: 200 },
    { source: "Claude", icon: "🤖", text: "✓ /work-end 완료 — 보고서 작성 + push", color: "#d97706", delay: 280 },
    { source: "Calendar", icon: "📅", text: "오후 3시 미팅 시작 30분 전", color: "#4285f4", delay: 360 },
  ];
  return (
    <div style={{ height: 440 }}>
      {notifs.map((n, i) =>
        f >= n.delay ? (
          <div
            key={i}
            style={{
              opacity: fadeIn(f, n.delay, 15),
              transform: `translateY(${slideUp(f, n.delay, 20, 30)}px)`,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 16px",
              marginBottom: 10,
              backgroundColor: `${C.gray800}`,
              borderRadius: 10,
              borderLeft: `5px solid ${n.color}`,
            }}
          >
            <div style={{ width: 38, height: 38, borderRadius: 8, backgroundColor: n.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              {n.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, color: C.gray300 }}>{n.source}</div>
              <div style={{ fontSize: 22, color: C.white, fontWeight: 500 }}>{n.text}</div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

// ============ SCENE 7 — TRACK E (Content + Cloud) ============
const Scene7TrackE: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tools = TOOLS.filter((t) => t.track === "E");
  const delays = [50, 410, 770, 1130];
  const descriptions: Record<number, { line1: string; line2: string }> = {
    10: { line1: "200만원짜리 GPU를 무료로", line2: "브라우저만 있으면 학습 가능" },
    11: { line1: "100페이지 PDF → 5분 팟캐스트", line2: "보고서가 발표 자료로 자동 변환" },
    12: { line1: "코드로 동영상을 만드는 도구", line2: "이 영상도 Remotion으로 제작 ✨" },
    13: { line1: "24시간 돌리는 클라우드 서버", line2: "프리 티어로 1년간 무료" },
  };

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro-tools/scene7_trackE.mp3")} />
      <Backdrop c1="#134e4a" c2="#0f766e" c3="#0f172a" />
      <Particles count={25} color={C.trackE} />

      <div style={{ position: "absolute", top: 40, left: 0, right: 0, textAlign: "center", opacity: fadeIn(f, 0, 30) }}>
        <Glow size={56} color={C.trackE} glow={C.trackE}>Track E · 콘텐츠 · 클라우드</Glow>
      </div>

      {/* Sequential focus on each tool */}
      {tools.map((t, i) => {
        const start = delays[i];
        const next = delays[i + 1] ?? 1500;
        if (f < start || f >= next) return null;
        const local = f - start;
        const op = fadeIn(local, 0, 20) * (f >= next - 25 ? fadeOut(f, next - 25, 25) : 1);
        const desc = descriptions[t.id];
        return (
          <div
            key={t.id}
            style={{
              position: "absolute",
              top: "20%",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              opacity: op,
              transform: `scale(${scaleIn(local, fps, 0)})`,
            }}
          >
            <Card w={1100} border={C.trackE}>
              <div style={{ display: "flex", alignItems: "center", gap: 36, padding: "20px 0" }}>
                <div
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: 32,
                    background: `linear-gradient(135deg, ${C.trackE}40 0%, ${C.trackE}10 100%)`,
                    border: `5px solid ${C.trackE}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 130,
                    flexShrink: 0,
                  }}
                >
                  {t.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 32, color: C.trackE, fontWeight: "bold" }}>{t.id}</div>
                  <div style={{ fontSize: 80, color: C.white, fontWeight: "bold" }}>{t.name}</div>
                  <div style={{ fontSize: 32, color: C.gray100, marginTop: 14 }}>{desc.line1}</div>
                  <div style={{ fontSize: 26, color: C.gray300, marginTop: 8 }}>→ {desc.line2}</div>
                </div>
              </div>
            </Card>
          </div>
        );
      })}

      {/* Bottom: 4 tool icons together once Scene transitions */}
      {f >= 1300 && (
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: fadeIn(f, 1300, 30),
          }}
        >
          <div style={{ marginBottom: 50 }}>
            <Glow size={50} color={C.white} glow={C.trackE}>필요한 만큼 골라 배우세요</Glow>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 50 }}>
            {tools.map((t, i) => {
              const sc = scaleIn(f, fps, 1320 + i * 12);
              const float = Math.sin((f + i * 30) / 20) * 8;
              return (
                <div key={t.id} style={{ transform: `scale(${sc}) translateY(${float}px)` }}>
                  <ToolBadge tool={t} size={150} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ============ SCENE 8 — CASE STUDY (Before / After) ============
const Scene8Case: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro-tools/scene8_case.mp3")} />
      <Backdrop c1="#1e1b4b" c2="#1e3a8a" c3="#0f172a" />
      <Particles count={20} />

      {/* Title */}
      <div style={{ position: "absolute", top: 40, left: 0, right: 0, textAlign: "center", opacity: fadeIn(f, 0, 30) }}>
        <Glow size={56} glow={C.accent}>실제 사례 · 부품 제조사</Glow>
      </div>

      {/* Before / After split */}
      <div style={{ position: "absolute", top: 160, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 40 }}>
        {/* BEFORE */}
        <div
          style={{
            opacity: fadeIn(f, 60, 30),
            transform: `translateX(${interpolate(f, [60, 90], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          }}
        >
          <Card w={780} border={C.danger} style={{ height: 580 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 44, fontWeight: "bold", color: C.danger }}>BEFORE</span>
            </div>
            <div style={{ fontSize: 32, color: C.white, marginBottom: 24, textAlign: "center", fontWeight: "bold" }}>
              견적 1건당 1시간
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "📚 카탈로그 종이 뒤지기",
                "📊 엑셀에서 단가 계산",
                "✍️ 메일 본문 작성",
                "📤 첨부파일 정리 후 발송",
              ].map((t, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 20px",
                    backgroundColor: `${C.danger}20`,
                    border: `1px solid ${C.danger}`,
                    borderRadius: 12,
                    fontSize: 24,
                    color: C.white,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 30, textAlign: "center" }}>
              <span style={{ fontSize: 80, color: C.danger, fontWeight: "bold" }}>60분</span>
            </div>
          </Card>
        </div>

        {/* AFTER */}
        <div
          style={{
            opacity: fadeIn(f, 480, 30),
            transform: `translateX(${interpolate(f, [480, 510], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          }}
        >
          <Card w={780} border={C.success} style={{ height: 580 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 44, fontWeight: "bold", color: C.success }}>AFTER</span>
            </div>
            <div style={{ fontSize: 32, color: C.white, marginBottom: 24, textAlign: "center", fontWeight: "bold" }}>
              견적 1건당 5분
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "🌐 Web 폼에 사양 입력",
                "🤖 Claude가 자동 추천",
                "📄 견적 PDF 자동 생성",
                "✉️ 메일 자동 발송",
              ].map((t, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 20px",
                    backgroundColor: `${C.success}20`,
                    border: `1px solid ${C.success}`,
                    borderRadius: 12,
                    fontSize: 24,
                    color: C.white,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 30, textAlign: "center" }}>
              <span style={{ fontSize: 80, color: C.success, fontWeight: "bold" }}>5분</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Final emphasis */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(f, 950, 30),
          transform: `scale(${scaleIn(f, fps, 950)})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "22px 60px",
            background: `linear-gradient(135deg, ${C.accent}cc 0%, ${C.danger}cc 100%)`,
            borderRadius: 24,
            boxShadow: `0 0 50px ${C.accent}60`,
          }}
        >
          <span style={{ fontSize: 42, color: C.white, fontWeight: "bold" }}>
            ⭐ 12배 효율 + 외주 사업화 (1건 1,500~2,500만원)
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 9 — CTA ============
const Scene9CTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prereqs = [
    { icon: "🪟", label: "Windows PC" },
    { icon: "🌐", label: "인터넷" },
    { icon: "📧", label: "Google 계정" },
    { icon: "🤖", label: "Claude Pro" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/intro-tools/scene9_cta.mp3")} />
      <Backdrop c1="#0f0c29" c2="#302b63" c3="#1e1b4b" />
      <Particles count={50} />

      {/* Top: 5 Tracks recap with A highlighted */}
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center", opacity: fadeIn(f, 0, 30) }}>
        <Glow size={50} glow={C.accent}>Track A부터 시작하세요</Glow>
      </div>

      <div
        style={{
          position: "absolute",
          top: 170,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 26,
          opacity: fadeIn(f, 30, 30),
        }}
      >
        {(["A", "B", "C", "D", "E"] as const).map((tk, i) => {
          const color = trackColor(tk);
          const isFirst = i === 0;
          const sc = scaleIn(f, fps, 30 + i * 15);
          const arrow = isFirst && f > 100 ? Math.sin(f / 12) * 6 : 0;
          return (
            <div
              key={tk}
              style={{
                width: 200,
                padding: "30px 0",
                backgroundColor: isFirst ? `${color}40` : `${C.gray800}cc`,
                border: `${isFirst ? 5 : 2}px solid ${color}`,
                borderRadius: 18,
                textAlign: "center",
                transform: `scale(${sc}) translateY(${arrow}px)`,
                boxShadow: isFirst ? `0 0 40px ${color}80` : "none",
              }}
            >
              <div style={{ fontSize: 56, color, fontWeight: "bold" }}>{tk}</div>
              <div style={{ fontSize: 18, color: C.gray300, marginTop: 4 }}>
                {tk === "A" ? "1-2일" : tk === "B" ? "1일" : tk === "C" ? "2-3일" : tk === "D" ? "0.5일" : "선택"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prereqs row */}
      <div
        style={{
          position: "absolute",
          top: 470,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(f, 280, 30),
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 32, color: C.gray300, fontWeight: "bold" }}>준비물</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 50 }}>
          {prereqs.map((p, i) => {
            const sc = scaleIn(f, fps, 300 + i * 20);
            return (
              <div key={p.label} style={{ transform: `scale(${sc})`, textAlign: "center" }}>
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 22,
                    backgroundColor: `${C.accent}30`,
                    border: `3px solid ${C.accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 56,
                    margin: "0 auto",
                  }}
                >
                  {p.icon}
                </div>
                <div style={{ fontSize: 22, color: C.white, fontWeight: "bold", marginTop: 12 }}>{p.label}</div>
                <div style={{ fontSize: 18, color: C.success, marginTop: 4 }}>✓</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Final CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(f, 540, 30),
          transform: `scale(${scaleIn(f, fps, 540)})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 80px",
            background: `linear-gradient(135deg, ${C.trackA} 0%, ${C.primary} 100%)`,
            borderRadius: 28,
            boxShadow: `0 0 60px ${C.trackA}80`,
          }}
        >
          <span style={{ fontSize: 56, color: C.white, fontWeight: "bold" }}>
            🚀 지금 시작하세요!
          </span>
        </div>
        <div style={{ marginTop: 30, fontSize: 26, color: C.gray300 }}>
          📁 aiStudy/introductionAi/00_목차.md
        </div>
      </div>

      {/* Tag line */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(f, 700, 30),
        }}
      >
        <span style={{ fontSize: 22, color: C.gray500 }}>제작 · UTTEC-Lab · Remotion + Claude Code</span>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPOSITION ============
export const AIToolsIntroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Sequence from={SCENE_TIMINGS.s1.start} durationInFrames={SCENE_TIMINGS.s1.duration}>
        <Scene1Hook />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s2.start} durationInFrames={SCENE_TIMINGS.s2.duration}>
        <Scene2Solution />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s3.start} durationInFrames={SCENE_TIMINGS.s3.duration}>
        <Scene3TrackA />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s4.start} durationInFrames={SCENE_TIMINGS.s4.duration}>
        <Scene4TrackB />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s5.start} durationInFrames={SCENE_TIMINGS.s5.duration}>
        <Scene5TrackC />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s6.start} durationInFrames={SCENE_TIMINGS.s6.duration}>
        <Scene6TrackD />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s7.start} durationInFrames={SCENE_TIMINGS.s7.duration}>
        <Scene7TrackE />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s8.start} durationInFrames={SCENE_TIMINGS.s8.duration}>
        <Scene8Case />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s9.start} durationInFrames={SCENE_TIMINGS.s9.duration}>
        <Scene9CTA />
      </Sequence>

      {/* Persistent UTTEC-Lab logo top-left */}
      <BrandOverlay />
    </AbsoluteFill>
  );
};

const BrandOverlay: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: 32,
        zIndex: 1000,
        opacity: fadeIn(f, 0, 30),
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: `linear-gradient(135deg, ${C.primary} 0%, ${C.trackA} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 4px 15px ${C.primary}60`,
        }}
      >
        <span style={{ fontSize: 24, fontWeight: "bold", color: C.white }}>U</span>
      </div>
      <span
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: C.white,
          textShadow: `0 2px 10px rgba(0,0,0,0.6)`,
        }}
      >
        UTTEC-Lab
      </span>
    </div>
  );
};
