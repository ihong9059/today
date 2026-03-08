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
  scene1_intro: { duration: 611, start: 0 },
  scene2_numbers: { duration: 873, start: 611 },
  scene3_string_bool: { duration: 929, start: 1484 },
  scene4_list: { duration: 1068, start: 2413 },
  scene5_dict: { duration: 829, start: 3481 },
  scene6_conversion: { duration: 742, start: 4310 },
  scene7_outro: { duration: 943, start: 5052 },
};

export const LESSON_0_2_DURATION = 5995;

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
  python: "#3776ab",
  white: "#ffffff",
  gray: {
    100: "#f1f5f9",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
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
        fontSize: 20,
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
      <Audio src={staticFile("audio/lesson-0-2/scene1_intro.mp3")} />
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
          <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Level 0 - Lesson 2</span>
        </div>
      </div>

      {/* 메인 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div style={{ marginBottom: 30 }}>
          <span style={{ fontSize: 120, marginRight: 20 }}>🔢</span>
          <GlowText fontSize={90} glowColor={colors.primary}>변수와 자료형</GlowText>
        </div>
        <div style={{ marginTop: 30 }}>
          <span style={{ fontSize: 42, color: colors.gray[300] }}>
            외우지 말고 이해하세요! AI에서 모든 것은 숫자입니다.
          </span>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.accent}40 0%, ${colors.accent}20 100%)`,
            borderRadius: 25,
            border: `3px solid ${colors.accent}`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            💡 "문법은 AI에게 물어보면 됩니다!"
          </span>
        </div>
      </div>

      {/* 학습 내용 미리보기 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 30,
          opacity: fadeIn(frame, 280, 40),
        }}
      >
        {[
          { icon: "🔢", text: "int/float" },
          { icon: "📝", text: "str/bool" },
          { icon: "📦", text: "list" },
          { icon: "📚", text: "dict" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "15px 30px",
              backgroundColor: `${colors.gray[800]}cc`,
              borderRadius: 15,
              border: `2px solid ${colors.gray[600]}`,
              transform: `scale(${scaleIn(frame, fps, 280 + i * 20)})`,
            }}
          >
            <span style={{ fontSize: 32 }}>{item.icon}</span>
            <span style={{ fontSize: 22, color: colors.white, marginLeft: 12 }}>{item.text}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: NUMBERS (int, float) ============
const Scene2Numbers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-2/scene2_numbers.mp3")} />
      <AnimatedBackground color1="#1e3a8a" color2="#3b82f6" color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.primary}>🔢 숫자형 (int, float)</GlowText>
      </div>

      {/* 정수 카드 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 80,
          opacity: fadeIn(frame, 60, 40),
          transform: `scale(${scaleIn(frame, fps, 60)})`,
        }}
      >
        <Card width={500} borderColor={colors.primary}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 32, color: colors.primary, fontWeight: "bold" }}>정수 (int)</span>
          </div>
          <div style={{ fontSize: 22, color: colors.gray[300], marginBottom: 15 }}>소수점이 없는 숫자</div>
          <CodeBlock
            title="Python"
            code={`epochs = 100      # 학습 반복
batch_size = 32   # 배치 크기
num_layers = 3    # 신경망 층`}
            width={440}
          />
        </Card>
      </div>

      {/* 실수 카드 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 80,
          opacity: fadeIn(frame, 180, 40),
          transform: `scale(${scaleIn(frame, fps, 180)})`,
        }}
      >
        <Card width={500} borderColor={colors.accent}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 32, color: colors.accent, fontWeight: "bold" }}>실수 (float)</span>
            <span style={{ fontSize: 20, color: colors.success, marginLeft: 15 }}>AI 핵심!</span>
          </div>
          <div style={{ fontSize: 22, color: colors.gray[300], marginBottom: 15 }}>소수점이 있는 숫자</div>
          <CodeBlock
            title="Python"
            code={`learning_rate = 0.001  # 학습률
loss = 0.342           # 손실값
accuracy = 0.97        # 정확도`}
            width={440}
          />
        </Card>
      </div>

      {/* AI에서의 역할 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(frame, 350, 40),
        }}
      >
        <Card width={1000} borderColor={colors.success}>
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 28, color: colors.success, fontWeight: "bold" }}>🧠 신경망의 모든 것이 숫자!</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {["가중치", "바이어스", "학습률", "손실값", "예측값"].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 25px",
                  backgroundColor: `${colors.success}30`,
                  borderRadius: 12,
                  opacity: fadeIn(frame, 400 + i * 30, 25),
                }}
              >
                <span style={{ fontSize: 22, color: colors.white }}>{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: STRING & BOOL ============
const Scene3StringBool: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-2/scene3_string_bool.mp3")} />
      <AnimatedBackground color1="#7c3aed" color2="#a855f7" color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.secondary}>📝 문자열 & ✓ 불리언</GlowText>
      </div>

      {/* 문자열 카드 */}
      <div
        style={{
          position: "absolute",
          top: "17%",
          left: 80,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={550} borderColor={colors.secondary}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 32, color: colors.secondary, fontWeight: "bold" }}>문자열 (str)</span>
          </div>
          <CodeBlock
            title="Python"
            code={`model_name = "GPT-4"
prompt = "안녕하세요"
file_path = "model.pth"`}
            width={490}
          />
          <div
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: `${colors.accent}20`,
              borderRadius: 12,
              border: `2px solid ${colors.accent}`,
            }}
          >
            <span style={{ fontSize: 20, color: colors.white }}>
              💡 "Hello" → [0.23, -0.15, ...] 임베딩 변환
            </span>
            <div style={{ fontSize: 18, color: colors.accent, marginTop: 8 }}>
              → 결국 텍스트도 숫자가 됩니다!
            </div>
          </div>
        </Card>
      </div>

      {/* 불리언 카드 */}
      <div
        style={{
          position: "absolute",
          top: "17%",
          right: 80,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        <Card width={550} borderColor={colors.success}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 32, color: colors.success, fontWeight: "bold" }}>불리언 (bool)</span>
          </div>
          <CodeBlock
            title="Python"
            code={`is_training = True   # 학습 모드
use_gpu = True       # GPU 사용
use_dropout = False  # 드롭아웃`}
            width={490}
          />
          <div style={{ marginTop: 20, display: "flex", gap: 15 }}>
            <div
              style={{
                flex: 1,
                padding: "12px 20px",
                backgroundColor: `${colors.success}30`,
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 24, color: colors.success, fontWeight: "bold" }}>True</span>
              <div style={{ fontSize: 16, color: colors.gray[300], marginTop: 5 }}>참</div>
            </div>
            <div
              style={{
                flex: 1,
                padding: "12px 20px",
                backgroundColor: `${colors.danger}30`,
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 24, color: colors.danger, fontWeight: "bold" }}>False</span>
              <div style={{ fontSize: 16, color: colors.gray[300], marginTop: 5 }}>거짓</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 활용 예시 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(frame, 380, 40),
        }}
      >
        <Card width={900} borderColor={colors.gray[500]}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 24, color: colors.gray[300] }}>
              🔄 설정 플래그로 활용:
            </span>
            <span style={{ fontSize: 24, color: colors.white, marginLeft: 10 }}>
              is_training=True → model.train() / False → model.eval()
            </span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: LIST ============
const Scene4List: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-2/scene4_list.mp3")} />
      <AnimatedBackground color1="#059669" color2={colors.success} color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor={colors.success}>📦 리스트 (list) - 가장 많이 사용!</GlowText>
      </div>

      {/* 리스트 예시들 */}
      <div
        style={{
          position: "absolute",
          top: "17%",
          left: 80,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={600} borderColor={colors.success}>
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 28, color: colors.success, fontWeight: "bold" }}>벡터처럼 사용!</span>
          </div>
          <CodeBlock
            title="Python"
            code={`# 3차원 좌표 (벡터)
point = [3.0, 4.5, 2.1]

# RGB 픽셀값
red = [255, 0, 0]

# 신경망 층 구성
layers = [784, 128, 64, 10]`}
            width={540}
          />
        </Card>
      </div>

      {/* 벡터 연산 */}
      <div
        style={{
          position: "absolute",
          top: "17%",
          right: 80,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        <Card width={550} borderColor={colors.primary}>
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 28, color: colors.primary, fontWeight: "bold" }}>🧮 벡터 연산</span>
          </div>
          <CodeBlock
            title="Python"
            code={`vector_a = [1, 2, 3]
vector_b = [4, 5, 6]

# 내적 (dot product)
dot = sum(a*b for a,b in
          zip(vector_a, vector_b))
# 결과: 32`}
            width={490}
          />
          <div
            style={{
              marginTop: 15,
              padding: 12,
              backgroundColor: `${colors.accent}20`,
              borderRadius: 10,
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: 20, color: colors.accent }}>AI의 핵심 연산!</span>
          </div>
        </Card>
      </div>

      {/* 신경망 구조 시각화 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(frame, 380, 40),
        }}
      >
        <Card width={1100} borderColor={colors.success}>
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 24, color: colors.white }}>🧠 신경망 구조: </span>
            <span style={{ fontSize: 24, color: colors.success, fontFamily: "monospace" }}>
              layers = [784, 128, 64, 10]
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            {[
              { name: "입력층", neurons: 784, color: colors.primary },
              { name: "은닉층 1", neurons: 128, color: colors.secondary },
              { name: "은닉층 2", neurons: 64, color: colors.secondary },
              { name: "출력층", neurons: 10, color: colors.success },
            ].map((layer, i) => (
              <React.Fragment key={i}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      backgroundColor: layer.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px",
                    }}
                  >
                    <span style={{ fontSize: 22, color: colors.white, fontWeight: "bold" }}>{layer.neurons}</span>
                  </div>
                  <span style={{ fontSize: 18, color: colors.gray[300] }}>{layer.name}</span>
                </div>
                {i < 3 && (
                  <span style={{ fontSize: 30, color: colors.gray[500] }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: DICTIONARY ============
const Scene5Dict: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-2/scene5_dict.mp3")} />
      <AnimatedBackground color1="#0891b2" color2="#06b6d4" color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor="#06b6d4">📊 2차원 리스트 = 행렬!</GlowText>
      </div>

      {/* 행렬 예시 */}
      <div
        style={{
          position: "absolute",
          top: "17%",
          left: 80,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={550} borderColor="#06b6d4">
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 28, color: "#06b6d4", fontWeight: "bold" }}>2x3 행렬</span>
          </div>
          <CodeBlock
            title="Python"
            code={`matrix = [
    [1, 2, 3],
    [4, 5, 6]
]

# 원소 접근: matrix[0][1] = 2`}
            width={490}
          />
        </Card>
      </div>

      {/* 가중치 행렬 */}
      <div
        style={{
          position: "absolute",
          top: "17%",
          right: 80,
          opacity: fadeIn(frame, 180, 40),
        }}
      >
        <Card width={550} borderColor={colors.accent}>
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 28, color: colors.accent, fontWeight: "bold" }}>가중치 행렬 (3x2)</span>
          </div>
          <CodeBlock
            title="Python"
            code={`weights = [
    [0.1, 0.2],
    [0.3, 0.4],
    [0.5, 0.6]
]`}
            width={490}
          />
        </Card>
      </div>

      {/* 차원 시각화 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: fadeIn(frame, 350, 40),
        }}
      >
        {[
          { dim: "1차원", name: "벡터", example: "[1, 2, 3]", color: colors.primary },
          { dim: "2차원", name: "행렬", example: "[[1,2], [3,4]]", color: "#06b6d4" },
          { dim: "3차원+", name: "텐서", example: "R, G, B 채널", color: colors.secondary },
        ].map((item, i) => (
          <Card key={i} width={350} borderColor={item.color}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, color: item.color, fontWeight: "bold", marginBottom: 10 }}>{item.dim}</div>
              <div style={{ fontSize: 36, marginBottom: 10 }}>
                {item.dim === "1차원" ? "📏" : item.dim === "2차원" ? "📊" : "🎨"}
              </div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>{item.name}</div>
              <div style={{ fontSize: 18, color: colors.gray[400], marginTop: 8, fontFamily: "monospace" }}>{item.example}</div>
            </div>
          </Card>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: TYPE CONVERSION ============
const Scene6Conversion: React.FC = () => {
  const frame = useCurrentFrame();

  const conversions = [
    { from: '"42"', func: "int()", to: "42", fromType: "str", toType: "int", fromColor: colors.secondary, toColor: colors.primary },
    { from: "100", func: "float()", to: "100.0", fromType: "int", toType: "float", fromColor: colors.primary, toColor: colors.accent },
    { from: "3.14", func: "str()", to: '"3.14"', fromType: "float", toType: "str", fromColor: colors.accent, toColor: colors.secondary },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-2/scene6_conversion.mp3")} />
      <AnimatedBackground color1="#7c2d12" color2="#f97316" color3="#0f172a" />
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
        <GlowText fontSize={64} glowColor="#f97316">🔄 자료형 변환</GlowText>
      </div>

      {/* 변환 예시들 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 35,
        }}
      >
        {conversions.map((conv, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, 60 + i * 80, 40),
              transform: `translateX(${interpolate(frame, [60 + i * 80, 100 + i * 80], [-100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px)`,
            }}
          >
            <Card width={900} borderColor="#f97316">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16, color: colors.gray[400], marginBottom: 8 }}>{conv.fromType}</div>
                  <div
                    style={{
                      padding: "12px 25px",
                      backgroundColor: `${conv.fromColor}30`,
                      borderRadius: 12,
                      border: `2px solid ${conv.fromColor}`,
                      fontSize: 26,
                      color: colors.white,
                      fontFamily: "monospace",
                    }}
                  >
                    {conv.from}
                  </div>
                </div>
                <div style={{ fontSize: 32, color: colors.gray[400] }}>→</div>
                <div
                  style={{
                    padding: "12px 25px",
                    backgroundColor: `${colors.success}30`,
                    borderRadius: 12,
                    border: `2px solid ${colors.success}`,
                  }}
                >
                  <span style={{ fontSize: 26, color: colors.success, fontWeight: "bold" }}>{conv.func}</span>
                </div>
                <div style={{ fontSize: 32, color: colors.gray[400] }}>→</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16, color: colors.gray[400], marginBottom: 8 }}>{conv.toType}</div>
                  <div
                    style={{
                      padding: "12px 25px",
                      backgroundColor: `${conv.toColor}30`,
                      borderRadius: 12,
                      border: `2px solid ${conv.toColor}`,
                      fontSize: 26,
                      color: colors.white,
                      fontFamily: "monospace",
                    }}
                  >
                    {conv.to}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 실용 예제 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(frame, 350, 40),
        }}
      >
        <Card width={800} borderColor={colors.success}>
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 26, color: colors.success, fontWeight: "bold" }}>📊 실용 예제: 정확도 포맷팅</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, color: colors.gray[300] }}>원본</div>
              <div style={{ fontSize: 36, color: colors.accent, fontFamily: "monospace", marginTop: 8 }}>0.9567</div>
            </div>
            <div style={{ fontSize: 40, color: colors.gray[400] }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, color: colors.gray[300] }}>포맷팅</div>
              <div style={{ fontSize: 36, color: colors.success, fontWeight: "bold", marginTop: 8 }}>95.67%</div>
            </div>
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

  const summaryItems = [
    { type: "int", role: "반복 횟수, 층 수, 인덱스", color: colors.primary },
    { type: "float", role: "가중치, 학습률, 손실값", color: colors.accent },
    { type: "str", role: "텍스트 데이터, 파일 경로", color: colors.secondary },
    { type: "bool", role: "모드 전환, 옵션 설정", color: colors.success },
    { type: "list", role: "벡터, 행렬, 배치 데이터", color: "#06b6d4" },
    { type: "dict", role: "설정값, 결과 저장", color: "#f97316" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/lesson-0-2/scene7_outro.mp3")} />
      <AnimatedBackground color1="#7c3aed" color2="#2563eb" color3="#0f172a" />
      <Particles count={50} />

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
        <GlowText fontSize={64} glowColor={colors.secondary}>📊 오늘 배운 내용 정리</GlowText>
      </div>

      {/* 요약 테이블 */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={1200} borderColor={colors.secondary}>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {summaryItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 30,
                  padding: "15px 25px",
                  backgroundColor: `${item.color}15`,
                  borderRadius: 15,
                  border: `2px solid ${item.color}50`,
                  opacity: fadeIn(frame, 80 + i * 40, 30),
                }}
              >
                <div
                  style={{
                    width: 100,
                    padding: "8px 0",
                    textAlign: "center",
                    backgroundColor: item.color,
                    borderRadius: 10,
                  }}
                >
                  <span style={{ fontSize: 22, color: colors.white, fontWeight: "bold" }}>{item.type}</span>
                </div>
                <span style={{ fontSize: 24, color: colors.white }}>{item.role}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 380, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "25px 60px",
            background: `linear-gradient(135deg, ${colors.accent}40 0%, ${colors.accent}20 100%)`,
            borderRadius: 25,
            border: `3px solid ${colors.accent}`,
          }}
        >
          <span style={{ fontSize: 36, color: colors.white, fontWeight: "bold" }}>
            💡 핵심: "외우지 말고 이해하세요!"
          </span>
        </div>
      </div>

      {/* 다음 레슨 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 450, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 50px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 20,
            boxShadow: `0 0 40px ${colors.primary}60`,
          }}
        >
          <span style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>
            👉 다음 레슨: 조건문과 반복문 (Epoch, Batch, Early Stopping)
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const Lesson0_2Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_numbers.start} durationInFrames={SCENE_TIMINGS.scene2_numbers.duration}>
        <Scene2Numbers />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_string_bool.start} durationInFrames={SCENE_TIMINGS.scene3_string_bool.duration}>
        <Scene3StringBool />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_list.start} durationInFrames={SCENE_TIMINGS.scene4_list.duration}>
        <Scene4List />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_dict.start} durationInFrames={SCENE_TIMINGS.scene5_dict.duration}>
        <Scene5Dict />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_conversion.start} durationInFrames={SCENE_TIMINGS.scene6_conversion.duration}>
        <Scene6Conversion />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7_outro.start} durationInFrames={SCENE_TIMINGS.scene7_outro.duration}>
        <Scene7Outro />
      </Sequence>

      {/* 전체 영상에 UTTEC-Lab 로고 및 교육 사이트 URL 오버레이 */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
