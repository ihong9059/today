import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence, staticFile } from "remotion";

export const SCENE_TIMINGS = {
  scene1_intro: { duration: 549, start: 0 },
  scene2_review: { duration: 583, start: 549 },
  scene3_idea: { duration: 516, start: 1132 },
  scene4_structure: { duration: 810, start: 1648 },
  scene5_hidden: { duration: 589, start: 2458 },
  scene6_xor_solved: { duration: 749, start: 3047 },
  scene7_outro: { duration: 683, start: 3796 },
};

export const LESSON_1_7_DURATION = 4479;

// Animated Background
const AnimatedBackground: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg,
        hsl(${220 + Math.sin(frame / 100) * 10}, 70%, 15%) 0%,
        hsl(${260 + Math.cos(frame / 80) * 10}, 60%, 12%) 50%,
        hsl(${200 + Math.sin(frame / 120) * 10}, 65%, 10%) 100%)`,
    }} />
  );
};

// Particles
const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: (i * 137.5) % 100,
    y: (i * 73.7) % 100,
    size: 3 + (i % 3) * 2,
    speed: 0.3 + (i % 5) * 0.1,
  }));

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${(p.y + frame * p.speed) % 120 - 10}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `rgba(100, 180, 255, ${0.3 + Math.sin(frame / 30 + p.id) * 0.2})`,
            boxShadow: `0 0 ${p.size * 2}px rgba(100, 180, 255, 0.3)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

// Glow Text
const GlowText: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, size = 72, color = "#00d4ff", style }) => (
  <div style={{
    fontSize: size,
    fontWeight: 800,
    color,
    textShadow: `0 0 20px ${color}80, 0 0 40px ${color}40, 0 0 60px ${color}20`,
    fontFamily: "'Noto Sans KR', sans-serif",
    ...style,
  }}>
    {children}
  </div>
);

// Card Component
const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div style={{
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: 24,
    padding: "40px 60px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    ...style,
  }}>
    {children}
  </div>
);

// Global Overlay
const GlobalOverlay: React.FC = () => {
  return (
    <>
      <div style={{
        position: "absolute",
        top: 30,
        right: 40,
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 100,
      }}>
        <div style={{
          fontSize: 24,
          fontWeight: 700,
          color: "rgba(255, 255, 255, 0.9)",
          fontFamily: "'Noto Sans KR', sans-serif",
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}>
          UTTEC-Lab
        </div>
      </div>
      <div style={{
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 100,
      }}>
        <div style={{
          fontSize: 20,
          color: "rgba(255, 255, 255, 0.6)",
          fontFamily: "'Noto Sans KR', sans-serif",
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}>
          uttec-lab.com
        </div>
      </div>
    </>
  );
};

// MLP Network Visualization
const MLPNetwork: React.FC<{
  showLayers: number[];
  activeConnections?: number[][];
  highlightNodes?: { layer: number; node: number }[];
}> = ({ showLayers, activeConnections = [], highlightNodes = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const layerX = [400, 700, 1000, 1300];
  const layerColors = ["#4fc3f7", "#81c784", "#ba68c8", "#ffb74d"];
  const layerLabels = ["입력층", "은닉층 1", "은닉층 2", "출력층"];

  return (
    <AbsoluteFill>
      {/* Draw connections first */}
      <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
        {showLayers.map((nodeCount, layerIdx) => {
          if (layerIdx === showLayers.length - 1) return null;
          const nextLayerNodes = showLayers[layerIdx + 1];
          const connections: JSX.Element[] = [];

          for (let i = 0; i < nodeCount; i++) {
            for (let j = 0; j < nextLayerNodes; j++) {
              const x1 = layerX[layerIdx];
              const y1 = 300 + (i - (nodeCount - 1) / 2) * 120;
              const x2 = layerX[layerIdx + 1];
              const y2 = 300 + (j - (nextLayerNodes - 1) / 2) * 120;

              const isActive = activeConnections.some(
                conn => conn[0] === layerIdx && conn[1] === i && conn[2] === j
              );

              const delay = (i + j) * 5;
              const opacity = spring({
                frame: frame - delay,
                fps,
                config: { damping: 20 },
              });

              connections.push(
                <line
                  key={`${layerIdx}-${i}-${j}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isActive ? "#ffeb3b" : "rgba(255, 255, 255, 0.2)"}
                  strokeWidth={isActive ? 3 : 1}
                  opacity={opacity * 0.8}
                />
              );
            }
          }
          return connections;
        })}
      </svg>

      {/* Draw nodes */}
      {showLayers.map((nodeCount, layerIdx) => (
        <div key={layerIdx}>
          {/* Layer label */}
          <div style={{
            position: "absolute",
            left: layerX[layerIdx] - 60,
            top: 80,
            width: 120,
            textAlign: "center",
            color: layerColors[layerIdx],
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "'Noto Sans KR', sans-serif",
          }}>
            {layerLabels[layerIdx]}
          </div>

          {Array.from({ length: nodeCount }, (_, nodeIdx) => {
            const y = 300 + (nodeIdx - (nodeCount - 1) / 2) * 120;
            const isHighlighted = highlightNodes.some(
              h => h.layer === layerIdx && h.node === nodeIdx
            );

            const scale = spring({
              frame: frame - layerIdx * 10 - nodeIdx * 5,
              fps,
              config: { damping: 15 },
            });

            return (
              <div
                key={`${layerIdx}-${nodeIdx}`}
                style={{
                  position: "absolute",
                  left: layerX[layerIdx] - 35,
                  top: y - 35,
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  background: isHighlighted
                    ? `radial-gradient(circle, ${layerColors[layerIdx]} 0%, ${layerColors[layerIdx]}80 100%)`
                    : `radial-gradient(circle, ${layerColors[layerIdx]}60 0%, ${layerColors[layerIdx]}30 100%)`,
                  border: `3px solid ${layerColors[layerIdx]}`,
                  boxShadow: isHighlighted
                    ? `0 0 30px ${layerColors[layerIdx]}, inset 0 0 20px rgba(255,255,255,0.3)`
                    : `0 0 15px ${layerColors[layerIdx]}50`,
                  transform: `scale(${scale})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {layerIdx === 0 && (
                  <span style={{ color: "white", fontSize: 24, fontWeight: 700 }}>
                    x{nodeIdx + 1}
                  </span>
                )}
                {layerIdx === showLayers.length - 1 && (
                  <span style={{ color: "white", fontSize: 24, fontWeight: 700 }}>
                    y
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </AbsoluteFill>
  );
};

// XOR Graph with Two Lines
const XORGraphWithLines: React.FC<{ showLines: number }> = ({ showLines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const points = [
    { x: 0, y: 0, label: "0", color: "#ef5350" },
    { x: 1, y: 0, label: "1", color: "#4fc3f7" },
    { x: 0, y: 1, label: "1", color: "#4fc3f7" },
    { x: 1, y: 1, label: "0", color: "#ef5350" },
  ];

  const scale = 180;
  const offsetX = 860;
  const offsetY = 450;

  return (
    <AbsoluteFill>
      {/* Grid */}
      <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
        <line x1={offsetX - 50} y1={offsetY} x2={offsetX + scale + 50} y2={offsetY} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
        <line x1={offsetX} y1={offsetY + 50} x2={offsetX} y2={offsetY - scale - 50} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />

        {/* Line 1: y = x + 0.5 (separates (0,0) from others on one side) */}
        {showLines >= 1 && (
          <line
            x1={offsetX - 50}
            y1={offsetY - (-0.3) * scale}
            x2={offsetX + scale + 50}
            y2={offsetY - (1.3) * scale}
            stroke="#ffeb3b"
            strokeWidth={3}
            strokeDasharray={showLines === 1 ? `${interpolate(frame % 60, [0, 60], [0, 20])}` : "none"}
          />
        )}

        {/* Line 2: y = x - 0.5 (separates (1,1) from others on other side) */}
        {showLines >= 2 && (
          <line
            x1={offsetX - 50}
            y1={offsetY - (-0.7) * scale}
            x2={offsetX + scale + 50}
            y2={offsetY - (0.7) * scale}
            stroke="#4fc3f7"
            strokeWidth={3}
            strokeDasharray={showLines === 2 ? `${interpolate(frame % 60, [0, 60], [0, 20])}` : "none"}
          />
        )}

        {/* Shaded region between lines */}
        {showLines >= 3 && (
          <polygon
            points={`${offsetX - 50},${offsetY + 0.3 * scale} ${offsetX + 0.7 * scale},${offsetY - scale - 50} ${offsetX + scale + 50},${offsetY - scale - 50} ${offsetX + scale + 50},${offsetY - 0.7 * scale} ${offsetX + 0.3 * scale},${offsetY + 50}`}
            fill="rgba(100, 255, 100, 0.15)"
            stroke="rgba(100, 255, 100, 0.5)"
            strokeWidth={2}
          />
        )}
      </svg>

      {/* Points */}
      {points.map((p, i) => {
        const delay = i * 8;
        const pointScale = spring({
          frame: frame - delay,
          fps,
          config: { damping: 15 },
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: offsetX + p.x * scale - 25,
              top: offsetY - p.y * scale - 25,
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: p.color,
              boxShadow: `0 0 20px ${p.color}`,
              transform: `scale(${pointScale})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "white",
            }}
          >
            {p.label}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// XOR Solution with NAND + OR = XOR
const XORSolution: React.FC<{ step: number }> = ({ step }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gates = [
    { name: "NAND", x: 600, y: 250, color: "#ef5350", active: step >= 1 },
    { name: "OR", x: 600, y: 450, color: "#4fc3f7", active: step >= 2 },
    { name: "AND", x: 900, y: 350, color: "#81c784", active: step >= 3 },
  ];

  return (
    <AbsoluteFill>
      <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
        {/* Input lines */}
        {step >= 1 && (
          <>
            <line x1={350} y1={300} x2={530} y2={250} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
            <line x1={350} y1={400} x2={530} y2={250} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
            <line x1={350} y1={300} x2={530} y2={450} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
            <line x1={350} y1={400} x2={530} y2={450} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
          </>
        )}

        {/* Output lines */}
        {step >= 3 && (
          <>
            <line x1={670} y1={250} x2={830} y2={350} stroke="#ef5350" strokeWidth={3} />
            <line x1={670} y1={450} x2={830} y2={350} stroke="#4fc3f7" strokeWidth={3} />
          </>
        )}

        {/* Final output */}
        {step >= 4 && (
          <line x1={970} y1={350} x2={1100} y2={350} stroke="#81c784" strokeWidth={3} />
        )}
      </svg>

      {/* Input nodes */}
      <div style={{
        position: "absolute",
        left: 280,
        top: 270,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#ffb74d",
        border: "3px solid #ff9800",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        fontWeight: 700,
        color: "white",
      }}>
        x1
      </div>
      <div style={{
        position: "absolute",
        left: 280,
        top: 370,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#ffb74d",
        border: "3px solid #ff9800",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        fontWeight: 700,
        color: "white",
      }}>
        x2
      </div>

      {/* Gates */}
      {gates.map((gate, i) => {
        const scale = gate.active ? spring({
          frame: frame - i * 15,
          fps,
          config: { damping: 15 },
        }) : 0;

        return (
          <div
            key={gate.name}
            style={{
              position: "absolute",
              left: gate.x - 70,
              top: gate.y - 40,
              width: 140,
              height: 80,
              borderRadius: 20,
              background: `${gate.color}30`,
              border: `3px solid ${gate.color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: gate.color,
              transform: `scale(${scale})`,
              boxShadow: `0 0 20px ${gate.color}50`,
            }}
          >
            {gate.name}
          </div>
        );
      })}

      {/* Output */}
      {step >= 4 && (
        <div style={{
          position: "absolute",
          left: 1100,
          top: 310,
          padding: "15px 30px",
          borderRadius: 15,
          background: "rgba(129, 199, 132, 0.3)",
          border: "3px solid #81c784",
          fontSize: 32,
          fontWeight: 700,
          color: "#81c784",
        }}>
          XOR!
        </div>
      )}

      {/* Formula */}
      {step >= 5 && (
        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 150,
          textAlign: "center",
        }}>
          <div style={{
            display: "inline-block",
            padding: "20px 50px",
            borderRadius: 20,
            background: "rgba(255, 235, 59, 0.1)",
            border: "2px solid rgba(255, 235, 59, 0.5)",
          }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#ef5350" }}>NAND</span>
            <span style={{ fontSize: 36, fontWeight: 700, color: "white", margin: "0 20px" }}>∧</span>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#4fc3f7" }}>OR</span>
            <span style={{ fontSize: 36, fontWeight: 700, color: "white", margin: "0 20px" }}>=</span>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#81c784" }}>XOR</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Scene 1: Intro
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", transform: `scale(${titleScale})` }}>
        <GlowText size={100} color="#ba68c8">
          다층 퍼셉트론
        </GlowText>
        <div style={{ marginTop: 30 }}>
          <GlowText size={80} color="#81c784">
            MLP
          </GlowText>
        </div>
        <div style={{
          marginTop: 50,
          fontSize: 40,
          color: "rgba(255, 255, 255, 0.8)",
          fontFamily: "'Noto Sans KR', sans-serif",
          opacity: subtitleOpacity,
        }}>
          Multi-Layer Perceptron
        </div>
        <div style={{
          marginTop: 30,
          fontSize: 32,
          color: "rgba(255, 255, 255, 0.6)",
          fontFamily: "'Noto Sans KR', sans-serif",
          opacity: subtitleOpacity,
        }}>
          Level 1-7: AI 기초 이론
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Review
const Scene2Review: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showLine = frame > 60;
  const showProblem = frame > 150;

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 80, left: 100 }}>
        <GlowText size={56} color="#4fc3f7">복습: 퍼셉트론의 한계</GlowText>
      </div>

      <div style={{ position: "absolute", left: 100, top: 200, width: 450 }}>
        <Card>
          <div style={{ fontSize: 28, color: "white", fontFamily: "'Noto Sans KR', sans-serif", lineHeight: 1.8 }}>
            <div style={{ marginBottom: 20 }}>✓ 퍼셉트론 = 직선 하나</div>
            <div style={{ marginBottom: 20 }}>✓ AND, OR, NOT = ✅</div>
            <div style={{ color: "#ef5350" }}>✗ XOR = ❌</div>
          </div>
        </Card>
      </div>

      <XORGraphWithLines showLines={showProblem ? 0 : 0} />

      {showLine && (
        <div style={{
          position: "absolute",
          right: 150,
          top: 200,
          fontSize: 24,
          color: "rgba(255, 255, 255, 0.8)",
          fontFamily: "'Noto Sans KR', sans-serif",
        }}>
          직선 하나로는 분리 불가!
        </div>
      )}
    </AbsoluteFill>
  );
};

// Scene 3: Idea
const Scene3Idea: React.FC = () => {
  const frame = useCurrentFrame();
  const showLines = frame < 90 ? 0 : frame < 180 ? 1 : frame < 270 ? 2 : 3;

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 80, left: 100 }}>
        <GlowText size={56} color="#ffeb3b">아이디어: 직선 여러 개!</GlowText>
      </div>

      <XORGraphWithLines showLines={showLines} />

      <div style={{ position: "absolute", left: 100, top: 550 }}>
        <Card>
          <div style={{ fontSize: 26, color: "white", fontFamily: "'Noto Sans KR', sans-serif" }}>
            {showLines === 0 && "직선 하나로 안 되면..."}
            {showLines === 1 && "첫 번째 직선을 그으면..."}
            {showLines === 2 && "두 번째 직선을 추가하면..."}
            {showLines >= 3 && "두 직선 사이 영역이 XOR 영역!"}
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Structure
const Scene4Structure: React.FC = () => {
  const frame = useCurrentFrame();

  const showLayers = frame < 100 ? [2] : frame < 200 ? [2, 3] : frame < 300 ? [2, 3, 3] : [2, 3, 3, 1];

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 80, left: 100 }}>
        <GlowText size={56} color="#81c784">MLP의 구조</GlowText>
      </div>

      <MLPNetwork showLayers={showLayers} />

      <div style={{ position: "absolute", bottom: 100, left: 0, right: 0, textAlign: "center" }}>
        <div style={{
          display: "inline-block",
          padding: "20px 50px",
          borderRadius: 20,
          background: "rgba(129, 199, 132, 0.1)",
          border: "2px solid rgba(129, 199, 132, 0.5)",
          fontSize: 28,
          color: "#81c784",
          fontWeight: 700,
          fontFamily: "'Noto Sans KR', sans-serif",
        }}>
          입력층 → 은닉층 → 출력층 = 다층 퍼셉트론!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Hidden Layer
const Scene5Hidden: React.FC = () => {
  const frame = useCurrentFrame();

  const highlightNodes = frame > 150 ? [
    { layer: 1, node: 0 },
    { layer: 1, node: 1 },
    { layer: 1, node: 2 },
  ] : [];

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 80, left: 100 }}>
        <GlowText size={56} color="#ba68c8">은닉층이 핵심!</GlowText>
      </div>

      <MLPNetwork
        showLayers={[2, 3, 1]}
        highlightNodes={highlightNodes}
      />

      <div style={{ position: "absolute", right: 100, top: 200, width: 400 }}>
        <Card>
          <div style={{ fontSize: 24, color: "white", fontFamily: "'Noto Sans KR', sans-serif", lineHeight: 1.8 }}>
            <div style={{ color: "#ba68c8", fontWeight: 700, marginBottom: 15 }}>왜 "은닉"층인가?</div>
            <div>• 외부에서 보이지 않음</div>
            <div>• 중간 계산을 담당</div>
            <div>• 여러 직선을 그림</div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: XOR Solved
const Scene6XORSolved: React.FC = () => {
  const frame = useCurrentFrame();

  const step = frame < 60 ? 1 : frame < 120 ? 2 : frame < 180 ? 3 : frame < 250 ? 4 : 5;

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 80, left: 100 }}>
        <GlowText size={56} color="#81c784">XOR 해결!</GlowText>
      </div>

      <XORSolution step={step} />
    </AbsoluteFill>
  );
};

// Scene 7: Outro
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    "퍼셉트론 여러 개 = MLP",
    "입력층 + 은닉층 + 출력층",
    "은닉층이 복잡한 문제 해결",
    "XOR 문제도 해결!",
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Card style={{ padding: "60px 100px" }}>
        <GlowText size={52} color="#ba68c8" style={{ marginBottom: 50, textAlign: "center" }}>
          오늘 배운 내용
        </GlowText>

        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          {items.map((item, i) => {
            const itemOpacity = spring({
              frame: frame - i * 20,
              fps,
              config: { damping: 20 },
            });

            return (
              <div
                key={i}
                style={{
                  fontSize: 32,
                  color: "white",
                  fontFamily: "'Noto Sans KR', sans-serif",
                  opacity: itemOpacity,
                  transform: `translateX(${(1 - itemOpacity) * 30}px)`,
                }}
              >
                <span style={{ color: "#81c784", marginRight: 15 }}>✓</span>
                {item}
              </div>
            );
          })}
        </div>

        {frame > 200 && (
          <div style={{
            marginTop: 50,
            textAlign: "center",
            fontSize: 28,
            color: "#4fc3f7",
            fontFamily: "'Noto Sans KR', sans-serif",
          }}>
            다음 시간: 역전파 학습
          </div>
        )}
      </Card>
    </AbsoluteFill>
  );
};

// Main Video Component
export const Lesson1_7Video: React.FC = () => {
  return (
    <AbsoluteFill>
      <AnimatedBackground />
      <Particles />

      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
        <Audio src={staticFile("audio/lesson-1-7/scene1_intro.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_review.start} durationInFrames={SCENE_TIMINGS.scene2_review.duration}>
        <Scene2Review />
        <Audio src={staticFile("audio/lesson-1-7/scene2_review.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_idea.start} durationInFrames={SCENE_TIMINGS.scene3_idea.duration}>
        <Scene3Idea />
        <Audio src={staticFile("audio/lesson-1-7/scene3_idea.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_structure.start} durationInFrames={SCENE_TIMINGS.scene4_structure.duration}>
        <Scene4Structure />
        <Audio src={staticFile("audio/lesson-1-7/scene4_structure.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_hidden.start} durationInFrames={SCENE_TIMINGS.scene5_hidden.duration}>
        <Scene5Hidden />
        <Audio src={staticFile("audio/lesson-1-7/scene5_hidden.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_xor_solved.start} durationInFrames={SCENE_TIMINGS.scene6_xor_solved.duration}>
        <Scene6XORSolved />
        <Audio src={staticFile("audio/lesson-1-7/scene6_xor_solved.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
        <Audio src={staticFile("audio/lesson-1-7/scene7_outro.mp3")} />
      </Sequence>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};
