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
  scene1_intro: { duration: 509, start: 0 },
  scene2_python_install: { duration: 689, start: 509 },
  scene3_ide_choice: { duration: 961, start: 1198 },
  scene4_vscode: { duration: 864, start: 2159 },
  scene5_jupyter: { duration: 820, start: 3023 },
  scene6_virtualenv: { duration: 1119, start: 3843 },
  scene7_outro: { duration: 694, start: 4962 },
};

export const LESSON_0_1_DURATION = 5656;

// ============ COLORS ============
const colors = {
  bg: {
    dark: "#0f172a",
    gradient1: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  accent: "#f59e0b",
  success: "#10b981",
  danger: "#ef4444",
  python: "#3776ab",
  vscode: "#007acc",
  jupyter: "#f37626",
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
              background: `radial-gradient(circle, ${colors.primary}30 0%, transparent 70%)`,
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

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 30, 40);
  const titleY = slideUp(frame, 30, 40);
  const badgeOpacity = fadeIn(frame, 80, 30);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-1/scene1_intro.mp3")} />
      <AnimatedBackground color1="#1e3a8a" color2={colors.python} color3="#0f172a" />
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
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 0 - Lesson 1</span>
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
          <span style={{ fontSize: 120, marginRight: 20 }}>🐍</span>
          <GlowText fontSize={90} glowColor={colors.python}>Python 환경 설정</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>
            설치부터 가상환경까지, 한번에 끝내기!
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
          { icon: "📥", text: "Python 설치" },
          { icon: "💻", text: "VS Code 설정" },
          { icon: "📓", text: "Jupyter" },
          { icon: "🏠", text: "가상환경" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "20px 35px",
              backgroundColor: `${colors.gray[800]}cc`,
              borderRadius: 15,
              border: `2px solid ${colors.gray[600]}`,
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

// ============ SCENE 2: PYTHON INSTALL ============
const Scene2PythonInstall: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-1/scene2_python_install.mp3")} />
      <AnimatedBackground color1="#1e3a8a" color2={colors.python} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.python}>🔧 Python 설치</GlowText>
      </div>

      {/* 설치 단계 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 100,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        {[
          { step: 1, title: "python.org 접속", desc: "Download 버튼 클릭", delay: 60 },
          { step: 2, title: "설치 시 주의!", desc: "Add Python to PATH 체크", delay: 150, highlight: true },
          { step: 3, title: "설치 확인", desc: "python --version 실행", delay: 280 },
        ].map((item) => (
          <div
            key={item.step}
            style={{
              opacity: fadeIn(frame, item.delay, 40),
              transform: `translateX(${slideUp(frame, item.delay, 40, -80) * -1}px)`,
            }}
          >
            <Card
              width={600}
              borderColor={item.highlight ? colors.accent : colors.python}
              style={item.highlight ? { background: `linear-gradient(180deg, ${colors.gray[900]}ee 0%, ${colors.accent}20 100%)` } : {}}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 15,
                    backgroundColor: item.highlight ? colors.accent : colors.python,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>{item.title}</div>
                  <div style={{ fontSize: 22, color: colors.gray[300], marginTop: 8 }}>{item.desc}</div>
                </div>
                {item.highlight && (
                  <span style={{ fontSize: 40, marginLeft: "auto" }}>⚠️</span>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* PATH 체크박스 시각화 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: "25%",
          opacity: fadeIn(frame, 200, 40),
          transform: `scale(${scaleIn(frame, fps, 200)})`,
        }}
      >
        <Card width={550} borderColor={colors.accent}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 24, color: colors.gray[300] }}>설치 화면</span>
          </div>
          <div
            style={{
              padding: 25,
              backgroundColor: colors.gray[800],
              borderRadius: 15,
              border: `2px solid ${colors.gray[600]}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 20 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 5,
                  backgroundColor: colors.success,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 20, color: colors.white }}>✓</span>
              </div>
              <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>
                Add Python 3.x to PATH
              </span>
              <span style={{ fontSize: 24, color: colors.accent, marginLeft: 10 }}>← 필수!</span>
            </div>
            <div
              style={{
                padding: "15px 30px",
                backgroundColor: colors.primary,
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 22, color: colors.white, fontWeight: "bold" }}>Install Now</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 터미널 예시 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          bottom: 120,
          opacity: fadeIn(frame, 350, 40),
        }}
      >
        <CodeBlock
          title="Terminal"
          code={`> python --version
Python 3.11.5`}
          width={450}
        />
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: IDE CHOICE ============
const Scene3IDEChoice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ides = [
    { name: "VS Code", icon: "💻", color: colors.vscode, features: ["가볍고 빠름", "확장성 뛰어남", "무료"], recommend: true },
    { name: "PyCharm", icon: "🔧", color: "#21d789", features: ["Python 전용", "강력한 기능", "무거움"], recommend: false },
    { name: "Jupyter", icon: "📓", color: colors.jupyter, features: ["셀 단위 실행", "결과 즉시 확인", "AI 학습 최적"], recommend: true },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-1/scene3_ide_choice.mp3")} />
      <AnimatedBackground color1="#1e40af" color2="#7c3aed" color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.secondary}>💻 개발 도구 선택</GlowText>
      </div>

      {/* IDE 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {ides.map((ide, i) => {
          const delay = 60 + i * 80;
          const scale = scaleIn(frame, fps, delay);
          const opacity = fadeIn(frame, delay, 40);

          return (
            <div
              key={ide.name}
              style={{
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              <Card
                width={400}
                borderColor={ide.color}
                style={ide.recommend ? { boxShadow: `0 0 60px ${ide.color}50` } : {}}
              >
                <div style={{ textAlign: "center" }}>
                  {ide.recommend && (
                    <div
                      style={{
                        position: "absolute",
                        top: -15,
                        right: 20,
                        padding: "5px 15px",
                        backgroundColor: colors.accent,
                        borderRadius: 20,
                        fontSize: 16,
                        color: colors.white,
                        fontWeight: "bold",
                      }}
                    >
                      추천!
                    </div>
                  )}
                  <div style={{ fontSize: 72, marginBottom: 15 }}>{ide.icon}</div>
                  <div style={{ fontSize: 36, color: colors.white, fontWeight: "bold", marginBottom: 20 }}>
                    {ide.name}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {ide.features.map((feature, j) => (
                      <div
                        key={j}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: `${ide.color}30`,
                          borderRadius: 10,
                          fontSize: 20,
                          color: colors.gray[100],
                        }}
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* 추천 조합 */}
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
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.primary}60`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            💡 추천: VS Code + Jupyter 조합이 AI 학습에 최적!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: VS CODE ============
const Scene4VSCode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-1/scene4_vscode.mp3")} />
      <AnimatedBackground color1="#0e4a86" color2={colors.vscode} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.vscode}>🖥️ VS Code 설정</GlowText>
      </div>

      {/* 설치 단계 */}
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
          { step: 1, title: "다운로드", desc: "code.visualstudio.com 접속", icon: "📥", delay: 50 },
          { step: 2, title: "Python 확장 설치", desc: "Microsoft 제공 확장", icon: "🔌", delay: 180 },
          { step: 3, title: "첫 코드 실행", desc: "hello.py 생성 및 실행", icon: "▶️", delay: 350 },
        ].map((item) => (
          <div
            key={item.step}
            style={{
              opacity: fadeIn(frame, item.delay, 40),
              transform: `translateX(${interpolate(frame, [item.delay, item.delay + 40], [-100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px)`,
            }}
          >
            <Card width={580} borderColor={colors.vscode}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 15,
                    backgroundColor: colors.vscode,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 18, color: colors.vscode, fontWeight: "bold" }}>Step {item.step}</div>
                  <div style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>{item.title}</div>
                  <div style={{ fontSize: 20, color: colors.gray[300], marginTop: 5 }}>{item.desc}</div>
                </div>
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
          top: "25%",
          opacity: fadeIn(frame, 400, 40),
          transform: `scale(${scaleIn(frame, fps, 400)})`,
        }}
      >
        <CodeBlock
          title="hello.py"
          code={`# 첫 번째 Python 코드
print("Hello, AI!")

# 실행: Ctrl+F5
# 또는 우측 상단 ▶️ 버튼`}
          width={550}
        />
      </div>

      {/* 확장 검색 시각화 */}
      <div
        style={{
          position: "absolute",
          right: 100,
          bottom: 130,
          opacity: fadeIn(frame, 250, 40),
        }}
      >
        <Card width={550} borderColor={colors.gray[600]}>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div
              style={{
                padding: "10px 20px",
                backgroundColor: colors.gray[700],
                borderRadius: 10,
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 20, color: colors.gray[400] }}>🔍</span>
              <span style={{ fontSize: 22, color: colors.white }}>Python</span>
            </div>
          </div>
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 15 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: "#3572a5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 30 }}>🐍</span>
            </div>
            <div>
              <div style={{ fontSize: 22, color: colors.white, fontWeight: "bold" }}>Python</div>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>Microsoft • 확장 설치</div>
            </div>
            <div
              style={{
                marginLeft: "auto",
                padding: "8px 20px",
                backgroundColor: colors.success,
                borderRadius: 8,
              }}
            >
              <span style={{ fontSize: 18, color: colors.white }}>Install</span>
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: JUPYTER ============
const Scene5Jupyter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shortcuts = [
    { key: "Shift + Enter", action: "셀 실행 후 다음 셀로" },
    { key: "Ctrl + Enter", action: "셀 실행 (현재 셀 유지)" },
    { key: "Esc + A", action: "위에 새 셀 추가" },
    { key: "Esc + B", action: "아래에 새 셀 추가" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-1/scene5_jupyter.mp3")} />
      <AnimatedBackground color1="#c04000" color2={colors.jupyter} color3="#0f172a" />
      <Particles count={25} color={colors.jupyter} />

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
        <GlowText fontSize={64} glowColor={colors.jupyter}>📓 Jupyter Notebook</GlowText>
      </div>

      {/* 설치 명령어 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          opacity: fadeIn(frame, 50, 40),
        }}
      >
        <CodeBlock
          title="Terminal"
          code={`# 설치
pip install jupyter

# 실행
jupyter notebook
→ 브라우저가 자동으로 열립니다!`}
          width={600}
        />
      </div>

      {/* 단축키 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 100,
          opacity: fadeIn(frame, 180, 40),
        }}
      >
        <Card width={550} borderColor={colors.jupyter}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>⌨️ 필수 단축키</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {shortcuts.map((shortcut, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  opacity: fadeIn(frame, 200 + i * 40, 30),
                }}
              >
                <div
                  style={{
                    padding: "10px 20px",
                    backgroundColor: colors.gray[700],
                    borderRadius: 10,
                    minWidth: 180,
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: 20, color: colors.white, fontFamily: "monospace", fontWeight: "bold" }}>
                    {shortcut.key}
                  </span>
                </div>
                <span style={{ fontSize: 20, color: colors.gray[300] }}>{shortcut.action}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Jupyter 셀 시각화 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 100,
          right: 100,
          opacity: fadeIn(frame, 350, 40),
        }}
      >
        <Card width={1720} borderColor={colors.jupyter}>
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
            <span style={{ fontSize: 20, color: colors.gray[400] }}>In [1]:</span>
            <div
              style={{
                flex: 1,
                padding: "15px 20px",
                backgroundColor: colors.gray[800],
                borderRadius: 10,
                fontFamily: "monospace",
                fontSize: 22,
                color: colors.white,
              }}
            >
              print("AI 학습 시작!")
            </div>
            <div
              style={{
                padding: "10px 20px",
                backgroundColor: colors.success,
                borderRadius: 10,
              }}
            >
              <span style={{ fontSize: 18, color: colors.white }}>▶ Run</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <span style={{ fontSize: 20, color: colors.gray[400] }}>Out [1]:</span>
            <div
              style={{
                flex: 1,
                padding: "15px 20px",
                backgroundColor: "#1a2e1a",
                borderRadius: 10,
                fontFamily: "monospace",
                fontSize: 22,
                color: colors.success,
              }}
            >
              AI 학습 시작!
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: VIRTUAL ENVIRONMENT ============
const Scene6VirtualEnv: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-1/scene6_virtualenv.mp3")} />
      <AnimatedBackground color1="#166534" color2={colors.success} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.success}>🏠 가상환경 (Virtual Environment)</GlowText>
      </div>

      {/* 왜 필요한가? */}
      <div
        style={{
          position: "absolute",
          top: "17%",
          left: 100,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={700} borderColor={colors.accent}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 28, color: colors.accent, fontWeight: "bold" }}>🤔 왜 필요한가?</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, color: colors.gray[300], marginBottom: 10 }}>프로젝트 A</div>
              <div
                style={{
                  padding: "15px 25px",
                  backgroundColor: colors.primary,
                  borderRadius: 12,
                }}
              >
                <span style={{ fontSize: 22, color: colors.white }}>TensorFlow 2.0</span>
              </div>
            </div>
            <span style={{ fontSize: 40, color: colors.gray[400] }}>⚡</span>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, color: colors.gray[300], marginBottom: 10 }}>프로젝트 B</div>
              <div
                style={{
                  padding: "15px 25px",
                  backgroundColor: colors.danger,
                  borderRadius: 12,
                }}
              >
                <span style={{ fontSize: 22, color: colors.white }}>TensorFlow 1.5</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span style={{ fontSize: 24, color: colors.success }}>→ 가상환경으로 독립된 환경 구축!</span>
          </div>
        </Card>
      </div>

      {/* 명령어들 */}
      <div
        style={{
          position: "absolute",
          top: "17%",
          right: 100,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        <CodeBlock
          title="Terminal"
          code={`# 1. 가상환경 생성
python -m venv myenv

# 2. 활성화 (Windows)
myenv\\Scripts\\activate

# 3. 활성화 (Mac/Linux)
source myenv/bin/activate

# 4. 비활성화
deactivate`}
          width={580}
        />
      </div>

      {/* 프롬프트 변화 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 100,
          right: 100,
          display: "flex",
          justifyContent: "center",
          gap: 80,
          opacity: fadeIn(frame, 450, 40),
        }}
      >
        <Card width={600} borderColor={colors.gray[600]}>
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 22, color: colors.gray[400] }}>비활성화 상태</span>
          </div>
          <div
            style={{
              padding: "15px 25px",
              backgroundColor: colors.gray[800],
              borderRadius: 10,
              fontFamily: "monospace",
            }}
          >
            <span style={{ fontSize: 24, color: colors.gray[100] }}>C:\Users\user&gt;</span>
          </div>
        </Card>
        <Card width={600} borderColor={colors.success}>
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 22, color: colors.success }}>✓ 활성화 상태</span>
          </div>
          <div
            style={{
              padding: "15px 25px",
              backgroundColor: colors.gray[800],
              borderRadius: 10,
              fontFamily: "monospace",
            }}
          >
            <span style={{ fontSize: 24, color: colors.success }}>(myenv)</span>
            <span style={{ fontSize: 24, color: colors.gray[100] }}> C:\Users\user&gt;</span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 7: OUTRO ============
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checkItems = [
    { icon: "✅", text: "Python 설치 완료" },
    { icon: "✅", text: "VS Code + Python 확장 설치" },
    { icon: "✅", text: "Jupyter Notebook 설치" },
    { icon: "✅", text: "가상환경 생성/활성화" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-1/scene7_outro.mp3")} />
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
        <GlowText fontSize={64} glowColor={colors.secondary}>🎉 오늘 배운 내용</GlowText>
      </div>

      {/* 체크리스트 */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 25,
        }}
      >
        {checkItems.map((item, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 50 + i * 40, 30),
              transform: `scale(${scaleIn(frame, fps, 50 + i * 40)})`,
            }}
          >
            <Card width={600} borderColor={colors.success}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 40 }}>{item.icon}</span>
                <span style={{ fontSize: 28, color: colors.white }}>{item.text}</span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 다음 레슨 */}
      <div
        style={{
          position: "absolute",
          bottom: "22%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 280, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.primary}60`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            👉 다음 레슨: 변수와 자료형
          </span>
        </div>
      </div>

      {/* 구독/좋아요 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 350, 40),
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
export const Lesson0_1Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_python_install.start} durationInFrames={SCENE_TIMINGS.scene2_python_install.duration}>
        <Scene2PythonInstall />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_ide_choice.start} durationInFrames={SCENE_TIMINGS.scene3_ide_choice.duration}>
        <Scene3IDEChoice />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_vscode.start} durationInFrames={SCENE_TIMINGS.scene4_vscode.duration}>
        <Scene4VSCode />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_jupyter.start} durationInFrames={SCENE_TIMINGS.scene5_jupyter.duration}>
        <Scene5Jupyter />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_virtualenv.start} durationInFrames={SCENE_TIMINGS.scene6_virtualenv.duration}>
        <Scene6VirtualEnv />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>

      {/* 전체 영상에 UTTEC-Lab 로고 및 교육 사이트 URL 오버레이 */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
