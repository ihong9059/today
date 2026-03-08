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
  scene1_intro: { duration: 603, start: 0 },
  scene2_epoch_batch: { duration: 1033, start: 603 },
  scene3_for_loop: { duration: 977, start: 1636 },
  scene4_nested_for: { duration: 951, start: 2613 },
  scene5_early_stopping: { duration: 918, start: 3564 },
  scene6_while_lr: { duration: 1166, start: 4482 },
  scene7_outro: { duration: 960, start: 5648 },
};

export const LESSON_0_3_DURATION = 6608;

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
  loop: "#22c55e",      // 반복문 - 초록
  condition: "#f59e0b", // 조건문 - 주황
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
      <Audio src={staticFile("audio/lesson-0-3/scene1_intro.mp3")} />
      <AnimatedBackground color1="#166534" color2={colors.loop} color3="#0f172a" />
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
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 0 - Lesson 3</span>
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
          <span style={{ fontSize: 120, marginRight: 20 }}>🔄</span>
          <GlowText fontSize={90} glowColor={colors.loop}>조건문과 반복문</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>
            AI 학습의 심장! Epoch, Batch, Early Stopping
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
          { icon: "🔄", text: "for 반복문" },
          { icon: "📦", text: "Batch 처리" },
          { icon: "✋", text: "Early Stop" },
          { icon: "📉", text: "학습률" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "20px 35px",
              backgroundColor: `${colors.gray[800]}cc`,
              borderRadius: 15,
              border: `2px solid ${colors.loop}`,
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

// ============ SCENE 2: EPOCH & BATCH ============
const Scene2EpochBatch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-3/scene2_epoch_batch.mp3")} />
      <AnimatedBackground color1="#1e40af" color2={colors.primary} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.primary}>📖 Epoch와 Batch</GlowText>
      </div>

      {/* Epoch 설명 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          opacity: fadeIn(frame, 60, 40),
          transform: `scale(${scaleIn(frame, fps, 60)})`,
        }}
      >
        <Card width={800} borderColor={colors.loop}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 48, marginRight: 15 }}>🔄</span>
            <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>Epoch</span>
          </div>
          <div style={{ fontSize: 24, color: colors.gray[200], lineHeight: 1.6 }}>
            전체 데이터를 <span style={{ color: colors.loop, fontWeight: "bold" }}>1번 다 보는 것</span>
          </div>
          <div style={{ marginTop: 20, padding: 20, backgroundColor: colors.gray[800], borderRadius: 15 }}>
            <div style={{ fontSize: 20, color: colors.gray[300] }}>예: ChatGPT 학습</div>
            <div style={{ fontSize: 22, color: colors.white, marginTop: 10 }}>
              수십억 문장 × <span style={{ color: colors.loop }}>2~3 Epochs</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Batch 설명 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 100,
          opacity: fadeIn(frame, 200, 40),
          transform: `scale(${scaleIn(frame, fps, 200)})`,
        }}
      >
        <Card width={800} borderColor={colors.accent}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 48, marginRight: 15 }}>📦</span>
            <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>Batch</span>
          </div>
          <div style={{ fontSize: 24, color: colors.gray[200], lineHeight: 1.6 }}>
            한 번에 <span style={{ color: colors.accent, fontWeight: "bold" }}>묶어서 처리</span>하는 단위
          </div>
          <div style={{ marginTop: 20, padding: 20, backgroundColor: colors.gray[800], borderRadius: 15 }}>
            <div style={{ fontSize: 20, color: colors.gray[300] }}>크기 선택</div>
            <div style={{ fontSize: 22, color: colors.white, marginTop: 10 }}>
              <span style={{ color: colors.accent }}>32, 64, 128</span>장씩
            </div>
          </div>
        </Card>
      </div>

      {/* 관계 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 500, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.loop} 0%, ${colors.accent} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.loop}60`,
          }}
        >
          <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>
            1 Epoch = 데이터 전체 ÷ Batch Size
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: FOR LOOP ============
const Scene3ForLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-3/scene3_for_loop.mp3")} />
      <AnimatedBackground color1="#166534" color2={colors.loop} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.loop}>🔄 for 반복문 - AI의 심장</GlowText>
      </div>

      {/* 코드 예시 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 100,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <CodeBlock
          title="epoch_simulation.py"
          code={`score = 50  # 처음 실력: 50점

for epoch in range(1, 6):  # 5번 반복
    score = score + (100 - score) * 0.3
    print(f"Epoch {epoch}: {score:.1f}점")

# 결과: 50 → 65 → 75.5 → 82.9 → 88.0점`}
          width={750}
        />
      </div>

      {/* 학습 곡선 시각화 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: 100,
          opacity: fadeIn(frame, 180, 40),
        }}
      >
        <Card width={700} borderColor={colors.loop}>
          <div style={{ textAlign: "center", marginBottom: 25 }}>
            <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>📈 학습 곡선</span>
          </div>
          {[
            { epoch: 1, score: 50.0, bar: 50 },
            { epoch: 2, score: 65.0, bar: 65 },
            { epoch: 3, score: 75.5, bar: 75 },
            { epoch: 4, score: 82.9, bar: 83 },
            { epoch: 5, score: 88.0, bar: 88 },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                marginBottom: 15,
                opacity: fadeIn(frame, 200 + i * 50, 30),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <span style={{ fontSize: 20, color: colors.gray[400], width: 100 }}>Epoch {item.epoch}</span>
                <div
                  style={{
                    width: `${item.bar * 5}px`,
                    height: 35,
                    background: `linear-gradient(90deg, ${colors.loop} 0%, ${colors.success} 100%)`,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 15,
                  }}
                >
                  <span style={{ fontSize: 18, color: colors.white, fontWeight: "bold" }}>{item.score}점</span>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
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
            background: `linear-gradient(135deg, ${colors.loop} 0%, ${colors.success} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.loop}60`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            🎯 반복할수록 AI가 똑똑해집니다!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: NESTED FOR LOOP ============
const Scene4NestedFor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-3/scene4_nested_for.mp3")} />
      <AnimatedBackground color1="#1e40af" color2={colors.primary} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.primary}>📦 중첩 for - Batch 처리</GlowText>
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
          title="batch_processing.py"
          code={`total_papers = 20
batch_size = 5
epochs = 3

for epoch in range(1, epochs + 1):
    print(f"Epoch {epoch}")

    for i in range(0, total_papers, batch_size):
        batch = papers[i:i+batch_size]
        print(f"  Batch {i//batch_size + 1}: {batch}")

# 총 3 × 4 = 12 Iterations`}
          width={750}
        />
      </div>

      {/* 시각화 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 100,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        <Card width={700} borderColor={colors.accent}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>🔄 Epoch 반복</span>
          </div>
          {[1, 2, 3].map((epoch, i) => (
            <div
              key={i}
              style={{
                marginBottom: 20,
                padding: 20,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                opacity: fadeIn(frame, 250 + i * 100, 40),
              }}
            >
              <div style={{ fontSize: 24, color: colors.loop, fontWeight: "bold", marginBottom: 10 }}>
                Epoch {epoch}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[1, 2, 3, 4].map((batch) => (
                  <div
                    key={batch}
                    style={{
                      padding: "8px 20px",
                      backgroundColor: colors.accent,
                      borderRadius: 8,
                      fontSize: 18,
                      color: colors.white,
                    }}
                  >
                    Batch {batch}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* 하단 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
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
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.primary}60`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            바깥 for = Epoch, 안쪽 for = Batch
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: EARLY STOPPING ============
const Scene5EarlyStopping: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-3/scene5_early_stopping.mp3")} />
      <AnimatedBackground color1="#c2410c" color2={colors.condition} color3="#0f172a" />
      <Particles count={30} color={colors.condition} />

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
        <GlowText fontSize={64} glowColor={colors.condition}>✋ if 조건문 - Early Stopping</GlowText>
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
          title="early_stopping.py"
          code={`best_score = 0
patience = 0
max_patience = 3

for epoch in range(1, 20):
    if score > best_score:
        best_score = score
        patience = 0
    else:
        patience += 1

    if patience >= max_patience:
        print("Early Stopping!")
        break`}
          width={700}
        />
      </div>

      {/* Early Stopping 시각화 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 100,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        <Card width={750} borderColor={colors.condition}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>📊 Early Stop 동작</span>
          </div>
          {[
            { epoch: 1, score: 58, status: "갱신", color: colors.success },
            { epoch: 2, score: 66, status: "갱신", color: colors.success },
            { epoch: 3, score: 71, status: "갱신", color: colors.success },
            { epoch: 4, score: 69, status: "1/3", color: colors.accent },
            { epoch: 5, score: 70, status: "2/3", color: colors.accent },
            { epoch: 6, score: 68, status: "3/3 STOP!", color: colors.danger },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                marginBottom: 12,
                padding: 15,
                backgroundColor: colors.gray[800],
                borderRadius: 10,
                opacity: fadeIn(frame, 250 + i * 60, 30),
              }}
            >
              <span style={{ fontSize: 20, color: colors.gray[400], width: 100 }}>Epoch {item.epoch}</span>
              <span style={{ fontSize: 22, color: colors.white, width: 80 }}>{item.score}점</span>
              <div
                style={{
                  padding: "8px 20px",
                  backgroundColor: item.color,
                  borderRadius: 8,
                  fontSize: 18,
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                {item.status}
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* 하단 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 650, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.condition} 0%, ${colors.danger} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.condition}60`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            🛑 과적합 방지의 핵심 기법!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: WHILE & LR ============
const Scene6WhileLR: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-3/scene6_while_lr.mp3")} />
      <AnimatedBackground color1="#7c3aed" color2={colors.secondary} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.secondary}>🔁 while & 학습률 스케줄링</GlowText>
      </div>

      {/* while 코드 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 100,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <CodeBlock
          title="while_loop.py"
          code={`target = 90
score = 40
epoch = 0

while score < target:
    epoch += 1
    improvement = random.randint(3, 15)
    score = min(score + improvement, 100)
    print(f"Epoch {epoch}: {score}점")

print(f"{epoch}번 만에 목표 달성!")`}
          width={700}
        />
      </div>

      {/* 학습률 스케줄링 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 100,
          opacity: fadeIn(frame, 250, 40),
        }}
      >
        <Card width={750} borderColor={colors.secondary}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>📉 학습률 변화</span>
          </div>
          {[
            { phase: "초반 (1-3)", lr: 0.1, icon: "🏃", desc: "큰 걸음" },
            { phase: "중반 (4-7)", lr: 0.01, icon: "🚶", desc: "중간 걸음" },
            { phase: "후반 (8-10)", lr: 0.001, icon: "🐌", desc: "작은 걸음" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginBottom: 20,
                padding: 20,
                backgroundColor: colors.gray[800],
                borderRadius: 15,
                opacity: fadeIn(frame, 300 + i * 80, 40),
              }}
            >
              <span style={{ fontSize: 40 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, color: colors.gray[400] }}>{item.phase}</div>
                <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold", marginTop: 5 }}>
                  lr = {item.lr}
                </div>
              </div>
              <div
                style={{
                  padding: "10px 25px",
                  backgroundColor: colors.secondary,
                  borderRadius: 10,
                  fontSize: 20,
                  color: colors.white,
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* 하단 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 750, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 50px ${colors.secondary}60`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            점점 작은 걸음으로 정밀하게!
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

  const checkItems = [
    { icon: "✅", text: "for 반복문 → Epoch 반복" },
    { icon: "✅", text: "중첩 for → Batch 처리" },
    { icon: "✅", text: "if 조건문 → Early Stopping" },
    { icon: "✅", text: "while 반복 → 목표까지 학습" },
    { icon: "✅", text: "학습률 스케줄링 → 정밀 조정" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-3/scene7_outro.mp3")} />
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
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
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
            <Card width={750} borderColor={colors.success}>
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
          opacity: fadeIn(frame, 350, 40),
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
            👉 다음 레슨: 함수 - AI의 빌딩 블록
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
          opacity: fadeIn(frame, 450, 40),
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
export const Lesson0_3Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_epoch_batch.start} durationInFrames={SCENE_TIMINGS.scene2_epoch_batch.duration}>
        <Scene2EpochBatch />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_for_loop.start} durationInFrames={SCENE_TIMINGS.scene3_for_loop.duration}>
        <Scene3ForLoop />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_nested_for.start} durationInFrames={SCENE_TIMINGS.scene4_nested_for.duration}>
        <Scene4NestedFor />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_early_stopping.start} durationInFrames={SCENE_TIMINGS.scene5_early_stopping.duration}>
        <Scene5EarlyStopping />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_while_lr.start} durationInFrames={SCENE_TIMINGS.scene6_while_lr.duration}>
        <Scene6WhileLR />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>

      {/* 전체 영상에 UTTEC-Lab 로고 및 교육 사이트 URL 오버레이 */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
