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

// ============ SCENE TIMINGS (based on TTS durations) ============
export const SCENE_TIMINGS = {
  scene1_intro: { duration: 660, start: 0 },
  scene2_basics: { duration: 843, start: 660 },
  scene3_charts: { duration: 1089, start: 1503 },
  scene4_customize: { duration: 1013, start: 2592 },
  scene5_subplot: { duration: 1090, start: 3605 },
  scene6_ai_monitor: { duration: 1463, start: 4695 },
  scene7_outro: { duration: 1713, start: 6158 },
};

export const LESSON_0_6_DURATION = 7871;

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
  chart: {
    green: "#22c55e",
    yellow: "#fbbf24",
    orange: "#f97316",
    purple: "#a855f7",
    cyan: "#06b6d4",
  },
  white: "#ffffff",
  gray: {
    100: "#f1f5f9",
    300: "#cbd5e1",
    500: "#64748b",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

// ============ HELPER FUNCTIONS ============
const fadeIn = (frame: number, start: number = 0, duration: number = 30) =>
  interpolate(frame, [start, start + duration], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const slideUp = (frame: number, start: number = 0, duration: number = 30, distance: number = 50) =>
  interpolate(frame, [start, start + duration], [distance, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const scaleIn = (frame: number, fps: number, delay: number = 0) =>
  Math.min(spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 100 } }), 1);

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
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
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

      {/* 하단 교육 사이트 URL */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          zIndex: 1000,
          opacity: logoOpacity,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "12px 40px",
            backgroundColor: `${colors.gray[900]}dd`,
            borderRadius: 30,
            border: `2px solid ${colors.primary}60`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
          }}
        >
          <span style={{ fontSize: 24, color: colors.gray[100], fontWeight: 500 }}>
            교육 사이트:
          </span>
          <span
            style={{
              fontSize: 26,
              color: colors.accent,
              fontWeight: "bold",
              marginLeft: 10,
              textShadow: `0 0 10px ${colors.accent}60`,
            }}
          >
            http://uttec-ai.duckdns.org
          </span>
        </div>
      </div>
    </>
  );
};

// ============ BACKGROUND COMPONENTS ============
const AnimatedBackground: React.FC<{ color1?: string; color2?: string; color3?: string }> = ({
  color1 = "#667eea",
  color2 = "#764ba2",
  color3 = "#1e1b4b"
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
              background: `radial-gradient(circle, ${colors.chart.green}30 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Particles: React.FC<{ count?: number; color?: string }> = ({ count = 30, color = colors.white }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = (i * 137.5) % 1920;
        const baseY = (i * 73.7) % 1080;
        const speed = 0.5 + (i % 5) * 0.3;
        const size = 3 + (i % 4) * 2;

        const x = baseX + Math.sin((frame * speed + i * 50) / 40) * 30;
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
}> = ({ children, fontSize = 72, color = colors.white, glowColor = colors.chart.green }) => (
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
}> = ({ children, width = 400, borderColor = colors.chart.green, glow = true, style = {} }) => (
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

const CodeBlock: React.FC<{ title: string; code: string; width?: number }> = ({ title, code, width = 600 }) => (
  <div
    style={{
      width,
      backgroundColor: "#1e293b",
      borderRadius: 20,
      overflow: "hidden",
      border: `2px solid ${colors.gray[700]}`,
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    }}
  >
    <div
      style={{
        padding: "12px 20px",
        backgroundColor: colors.gray[800],
        borderBottom: `1px solid ${colors.gray[700]}`,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ef4444" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#22c55e" }} />
      </div>
      <span style={{ fontSize: 16, color: colors.gray[400], marginLeft: 10 }}>{title}</span>
    </div>
    <pre
      style={{
        margin: 0,
        padding: 25,
        fontSize: 22,
        lineHeight: 1.6,
        color: colors.gray[100],
        fontFamily: "'Fira Code', 'Consolas', monospace",
        overflow: "hidden",
      }}
    >
      {code}
    </pre>
  </div>
);

// ============ LOSS CURVE VISUALIZATION ============
const LossCurve: React.FC<{ pattern: "normal" | "overfitting" | "high_lr" | "low_lr"; width?: number; height?: number }> = ({
  pattern,
  width = 400,
  height = 300,
}) => {
  const frame = useCurrentFrame();
  const progress = Math.min(frame / 60, 1);

  const epochs = 30;
  const points = Math.floor(epochs * progress);

  const generateData = () => {
    const trainLoss = [];
    const valLoss = [];

    for (let i = 0; i <= points; i++) {
      const e = i / epochs;
      switch (pattern) {
        case "normal":
          trainLoss.push(2.5 * Math.exp(-3 * e) + 0.1);
          valLoss.push(2.5 * Math.exp(-2.8 * e) + 0.15);
          break;
        case "overfitting":
          trainLoss.push(2.5 * Math.exp(-4 * e) + 0.05);
          valLoss.push(e < 0.4 ? 2.5 * Math.exp(-2.5 * e) + 0.15 : 0.3 + (e - 0.4) * 2);
          break;
        case "high_lr":
          trainLoss.push(2.0 + 0.5 * Math.sin(i * 0.5));
          valLoss.push(2.0 + 0.6 * Math.sin(i * 0.5 + 0.3));
          break;
        case "low_lr":
          trainLoss.push(2.5 - 0.5 * e);
          valLoss.push(2.6 - 0.45 * e);
          break;
      }
    }
    return { trainLoss, valLoss };
  };

  const { trainLoss, valLoss } = generateData();

  const scaleX = (x: number) => (x / epochs) * width;
  const scaleY = (y: number) => height - (y / 3) * height;

  const createPath = (data: number[]) => {
    if (data.length === 0) return "";
    let path = `M ${scaleX(0)} ${scaleY(data[0])}`;
    for (let i = 1; i < data.length; i++) {
      path += ` L ${scaleX(i)} ${scaleY(data[i])}`;
    }
    return path;
  };

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      {/* Grid */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`h${i}`}
          x1={0}
          y1={scaleY(i)}
          x2={width}
          y2={scaleY(i)}
          stroke={colors.gray[700]}
          strokeWidth={1}
          opacity={0.3}
        />
      ))}
      {/* Train Loss */}
      <path d={createPath(trainLoss)} stroke="#3b82f6" strokeWidth={3} fill="none" />
      {/* Val Loss */}
      <path d={createPath(valLoss)} stroke="#ef4444" strokeWidth={3} fill="none" strokeDasharray="5,5" />
    </svg>
  );
};

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 30, 40);
  const titleY = slideUp(frame, 30, 40);
  const badgeOpacity = fadeIn(frame, 80, 30);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-6/scene1_intro.mp3")} />
      <AnimatedBackground color1="#166534" color2={colors.chart.green} color3="#0f172a" />
      <Particles count={40} />

      {/* 레벨 배지 */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 100,
          opacity: badgeOpacity,
          transform: `scale(${scaleIn(frame, fps, 80)})`,
        }}
      >
        <div
          style={{
            padding: "15px 40px",
            background: `linear-gradient(135deg, ${colors.gray[700]} 0%, ${colors.gray[800]} 100%)`,
            borderRadius: 20,
            border: `2px solid ${colors.gray[500]}`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 0 - Lesson 6</span>
        </div>
      </div>

      {/* 메인 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div style={{ marginBottom: 30 }}>
          <span style={{ fontSize: 120, marginRight: 20 }}>📊</span>
          <GlowText fontSize={90} glowColor={colors.chart.green}>Matplotlib 기초</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>
            AI의 눈 - 시각화는 선택이 아닌 필수!
          </span>
        </div>
      </div>

      {/* 학습 내용 미리보기 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: fadeIn(frame, 150, 40),
        }}
      >
        {[
          { icon: "📈", text: "기본 플롯" },
          { icon: "📉", text: "Loss Curve" },
          { icon: "📊", text: "다양한 차트" },
          { icon: "🎨", text: "꾸미기" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "20px 35px",
              backgroundColor: `${colors.gray[800]}cc`,
              borderRadius: 15,
              border: `2px solid ${colors.chart.green}`,
              transform: `scale(${scaleIn(frame, fps, 150 + i * 20)})`,
            }}
          >
            <span style={{ fontSize: 36 }}>{item.icon}</span>
            <span style={{ fontSize: 24, color: colors.white, marginLeft: 15 }}>{item.text}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: BASICS ============
const Scene2Basics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-6/scene2_basics.mp3")} />
      <AnimatedBackground color1="#166534" color2={colors.chart.green} color3="#0f172a" />
      <Particles count={25} />

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
        <GlowText fontSize={64} glowColor={colors.chart.green}>📈 기본 그래프 그리기</GlowText>
      </div>

      {/* 기본 함수들 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          display: "flex",
          flexDirection: "column",
          gap: 25,
        }}
      >
        {[
          { func: "plt.plot()", desc: "선 그래프 그리기", delay: 60 },
          { func: "plt.xlabel()", desc: "x축 이름", delay: 150 },
          { func: "plt.ylabel()", desc: "y축 이름", delay: 240 },
          { func: "plt.title()", desc: "그래프 제목", delay: 330 },
          { func: "plt.legend()", desc: "범례 (어떤 선인지)", delay: 420 },
          { func: "plt.grid()", desc: "격자선 표시", delay: 510 },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, item.delay, 40),
              transform: `translateX(${interpolate(frame, [item.delay, item.delay + 40], [-100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px)`,
            }}
          >
            <Card width={500} borderColor={colors.chart.green}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div
                  style={{
                    padding: "10px 20px",
                    backgroundColor: colors.chart.green,
                    borderRadius: 10,
                    fontFamily: "monospace",
                    fontSize: 20,
                    color: colors.white,
                    fontWeight: "bold",
                  }}
                >
                  {item.func}
                </div>
                <span style={{ fontSize: 22, color: colors.gray[300] }}>{item.desc}</span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 코드 예시 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: "20%",
          opacity: fadeIn(frame, 150, 40),
        }}
      >
        <CodeBlock
          title="matplotlib_basic.py"
          code={`import matplotlib.pyplot as plt

epochs = [1, 2, 3, 4, 5]
loss = [2.5, 1.8, 1.2, 0.8, 0.5]

plt.plot(epochs, loss, 'b-o')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.title('Training Loss')
plt.grid(True)
plt.show()`}
          width={650}
        />
      </div>

      {/* 그래프 시각화 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          bottom: 130,
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <Card width={650} borderColor={colors.chart.yellow}>
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>실행 결과</span>
          </div>
          <LossCurve pattern="normal" width={590} height={250} />
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: CHARTS ============
const Scene3Charts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const charts = [
    { type: "scatter", icon: "🔵", name: "산점도", func: "plt.scatter()", use: "데이터 분포 확인" },
    { type: "bar", icon: "📊", name: "막대그래프", func: "plt.bar()", use: "모델 성능 비교" },
    { type: "hist", icon: "📈", name: "히스토그램", func: "plt.hist()", use: "분포 형태 확인" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-6/scene3_charts.mp3")} />
      <AnimatedBackground color1="#ca8a04" color2={colors.chart.yellow} color3="#0f172a" />
      <Particles count={30} />

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
        <GlowText fontSize={64} glowColor={colors.chart.yellow}>📊 다양한 차트</GlowText>
      </div>

      {/* 차트 종류 */}
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
        {charts.map((chart, i) => {
          const delay = 60 + i * 100;
          const scale = scaleIn(frame, fps, delay);
          const opacity = fadeIn(frame, delay, 40);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              <Card width={380} borderColor={colors.chart.yellow}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 72, marginBottom: 15 }}>{chart.icon}</div>
                  <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>
                    {chart.name}
                  </div>
                  <div
                    style={{
                      padding: "10px 20px",
                      backgroundColor: colors.chart.yellow,
                      borderRadius: 10,
                      fontFamily: "monospace",
                      fontSize: 18,
                      color: colors.gray[900],
                      fontWeight: "bold",
                      marginBottom: 15,
                    }}
                  >
                    {chart.func}
                  </div>
                  <div style={{ fontSize: 20, color: colors.gray[300] }}>
                    {chart.use}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* 비유 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
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
            background: `linear-gradient(135deg, ${colors.chart.yellow} 0%, ${colors.chart.orange} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.chart.yellow}60`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.gray[900], fontWeight: "bold" }}>
            🔪 요리사가 재료마다 다른 칼을 쓰듯<br/>
            AI 개발자도 상황에 맞는 그래프를 선택!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: CUSTOMIZE ============
const Scene4Customize: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-6/scene4_customize.mp3")} />
      <AnimatedBackground color1="#7c2d12" color2={colors.chart.orange} color3="#0f172a" />
      <Particles count={25} />

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
        <GlowText fontSize={64} glowColor={colors.chart.orange}>🎨 그래프 꾸미기</GlowText>
      </div>

      {/* 꾸미기 옵션 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 100,
          right: 100,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
        }}
      >
        {[
          { option: "color", desc: "색상 지정", example: "'r', 'blue', '#ff0000'" },
          { option: "linestyle", desc: "선 스타일", example: "'-', '--', ':', '-.'" },
          { option: "marker", desc: "마커 모양", example: "'o', 's', '^', '*'" },
          { option: "linewidth", desc: "선 두께", example: "1, 2, 3, ..." },
          { option: "alpha", desc: "투명도", example: "0.0 ~ 1.0" },
          { option: "fontsize", desc: "폰트 크기", example: "10, 12, 14, ..." },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 60 + i * 80, 40),
              transform: `scale(${scaleIn(frame, fps, 60 + i * 80)})`,
            }}
          >
            <Card width={800} borderColor={colors.chart.orange}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div
                  style={{
                    padding: "15px 25px",
                    backgroundColor: colors.chart.orange,
                    borderRadius: 10,
                    minWidth: 150,
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: 22, color: colors.white, fontWeight: "bold" }}>{item.option}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 24, color: colors.white, marginBottom: 5 }}>{item.desc}</div>
                  <div
                    style={{
                      fontSize: 18,
                      color: colors.gray[400],
                      fontFamily: "monospace",
                    }}
                  >
                    {item.example}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 550, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.chart.orange} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.accent}60`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            ⚠️ 핵심은 예쁨이 아니라 명확함!<br/>
            데이터가 잘 보이도록 꾸미세요
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: SUBPLOT ============
const Scene5Subplot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-6/scene5_subplot.mp3")} />
      <AnimatedBackground color1="#7e22ce" color2={colors.chart.purple} color3="#0f172a" />
      <Particles count={30} />

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
        <GlowText fontSize={64} glowColor={colors.chart.purple}>🎛️ Subplot - 대시보드</GlowText>
      </div>

      {/* 코드 예시 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <CodeBlock
          title="subplot_example.py"
          code={`# 1행 3열 subplot
fig, (ax1, ax2, ax3) = plt.subplots(1, 3)

ax1.plot(epochs, loss)
ax1.set_title('Loss')

ax2.plot(epochs, accuracy)
ax2.set_title('Accuracy')

ax3.plot(epochs, lr)
ax3.set_title('Learning Rate')`}
          width={650}
        />
      </div>

      {/* 대시보드 시각화 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 100,
          right: 100,
          opacity: fadeIn(frame, 250, 40),
        }}
      >
        <Card width={1720} borderColor={colors.chart.purple}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>AI Training Dashboard</span>
          </div>
          <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
            {["Loss", "Accuracy", "Learning Rate"].map((title, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: 20,
                  backgroundColor: colors.gray[800],
                  borderRadius: 15,
                  border: `2px solid ${colors.chart.purple}`,
                }}
              >
                <div style={{ textAlign: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 20, color: colors.chart.purple, fontWeight: "bold" }}>{title}</span>
                </div>
                <LossCurve pattern="normal" width={480} height={200} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 비유 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 100,
          opacity: fadeIn(frame, 450, 40),
        }}
      >
        <Card width={550} borderColor={colors.chart.purple}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🚗</div>
            <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>
              자동차 계기판
            </div>
            <div style={{ fontSize: 22, color: colors.gray[300], lineHeight: 1.6 }}>
              속도, 연료, 엔진 온도를<br/>
              한눈에 보듯이<br/><br/>
              AI도 손실, 정확도, 학습률을<br/>
              한 화면에 봅니다!
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: AI MONITOR ============
const Scene6AIMonitor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const patterns = [
    { name: "정상 학습", type: "normal" as const, color: colors.success, desc: "Train/Val 모두 감소" },
    { name: "과적합", type: "overfitting" as const, color: colors.danger, desc: "Val이 다시 증가" },
    { name: "LR 높음", type: "high_lr" as const, color: colors.chart.orange, desc: "Loss 요동침" },
    { name: "LR 낮음", type: "low_lr" as const, color: colors.chart.purple, desc: "너무 천천히 감소" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-6/scene6_ai_monitor.mp3")} />
      <AnimatedBackground color1="#b91c1c" color2={colors.danger} color3="#0f172a" />
      <Particles count={35} />

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
        <GlowText fontSize={64} glowColor={colors.danger}>📉 Loss Curve - AI의 체온표</GlowText>
      </div>

      {/* 4가지 패턴 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          right: 100,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
        }}
      >
        {patterns.map((pattern, i) => {
          const delay = 80 + i * 120;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 40),
                transform: `scale(${scaleIn(frame, fps, delay)})`,
              }}
            >
              <Card width={850} borderColor={pattern.color}>
                <div style={{ marginBottom: 15 }}>
                  <span
                    style={{
                      fontSize: 26,
                      color: pattern.color,
                      fontWeight: "bold",
                    }}
                  >
                    {i + 1}. {pattern.name}
                  </span>
                  <span style={{ fontSize: 20, color: colors.gray[400], marginLeft: 15 }}>
                    {pattern.desc}
                  </span>
                </div>
                <LossCurve pattern={pattern.type} width={790} height={200} />
              </Card>
            </div>
          );
        })}
      </div>

      {/* 핵심 메시지 */}
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
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.danger} 0%, ${colors.chart.orange} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.danger}60`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            🎯 이 4가지 패턴만 구분해도<br/>
            AI 학습 문제의 90%를 찾을 수 있습니다!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 7: OUTRO ============
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const level0Lessons = [
    { num: "0-1", title: "Python 환경 설정", icon: "🐍" },
    { num: "0-2", title: "변수와 자료형", icon: "📦" },
    { num: "0-3", title: "조건문과 반복문", icon: "🔁" },
    { num: "0-4", title: "함수", icon: "🔧" },
    { num: "0-5", title: "NumPy", icon: "🔢" },
    { num: "0-6", title: "Matplotlib", icon: "📊" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-6/scene7_outro.mp3")} />
      <AnimatedBackground color1="#7c3aed" color2="#2563eb" color3="#0f172a" />
      <Particles count={50} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={80} glowColor={colors.success}>🎉 Level 0 완료!</GlowText>
      </div>

      {/* Level 0 레슨 목록 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 25,
        }}
      >
        {level0Lessons.map((lesson, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 60 + i * 40, 30),
              transform: `scale(${scaleIn(frame, fps, 60 + i * 40)})`,
            }}
          >
            <Card width={550} borderColor={colors.success}>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <span style={{ fontSize: 40 }}>{lesson.icon}</span>
                <div>
                  <div style={{ fontSize: 20, color: colors.success, fontWeight: "bold" }}>{lesson.num}</div>
                  <div style={{ fontSize: 24, color: colors.white }}>{lesson.title}</div>
                </div>
                <span style={{ fontSize: 32, marginLeft: "auto" }}>✅</span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Level 1 예고 */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 40),
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
          <span style={{ fontSize: 42, color: colors.white, fontWeight: "bold" }}>
            🚀 다음: Level 1 - 본격 AI 이론!<br/>
            <span style={{ fontSize: 32, marginTop: 10, display: "block" }}>신경망, 역전파, 경사하강법</span>
          </span>
        </div>
      </div>

      {/* 구독/좋아요 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 500, 40),
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
          <div
            style={{
              padding: "15px 35px",
              backgroundColor: "#ff0000",
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 28 }}>▶</span>
            <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>구독</span>
          </div>
          <div
            style={{
              padding: "15px 35px",
              backgroundColor: colors.gray[700],
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 28 }}>👍</span>
            <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>좋아요</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const Lesson0_6Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_basics.start} durationInFrames={SCENE_TIMINGS.scene2_basics.duration}>
        <Scene2Basics />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_charts.start} durationInFrames={SCENE_TIMINGS.scene3_charts.duration}>
        <Scene3Charts />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_customize.start} durationInFrames={SCENE_TIMINGS.scene4_customize.duration}>
        <Scene4Customize />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_subplot.start} durationInFrames={SCENE_TIMINGS.scene5_subplot.duration}>
        <Scene5Subplot />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_ai_monitor.start} durationInFrames={SCENE_TIMINGS.scene6_ai_monitor.duration}>
        <Scene6AIMonitor />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>

      {/* 전체 영상에 UTTEC-Lab 로고 및 교육 사이트 URL 오버레이 */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
