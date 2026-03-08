import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
} from "remotion";

// Duration based on audio analysis
export const LESSON_4_2_DURATION = 9256;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 875 },
  mlp_problem: { start: 875, duration: 1337 },
  cnn_idea: { start: 2212, duration: 1416 },
  layers: { start: 3628, duration: 1616 },
  cifar: { start: 5244, duration: 1346 },
  model: { start: 6590, duration: 1318 },
  outro: { start: 7908, duration: 1348 },
};

// Level 4 Color scheme - Orange
const COLORS = {
  primary: "#f97316",
  secondary: "#ea580c",
  accent: "#fbbf24",
  dark: "#1a1a2e",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)",
};

// Global Overlay Component
const GlobalOverlay: React.FC = () => {
  return (
    <>
      {/* Logo in top-left */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          display: "flex",
          alignItems: "center",
          gap: 15,
          zIndex: 100,
        }}
      >
        <Img
          src={staticFile("images/logo.png")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
          }}
        />
        <span
          style={{
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 600,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          UTTEC-Lab
        </span>
      </div>

      {/* URL in bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          zIndex: 100,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: 20,
            fontWeight: 500,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          ai.uttec-lab.com
        </span>
      </div>
    </>
  );
};

// Title component with animation
const AnimatedTitle: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const y = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const translateY = interpolate(y, [0, 1], [30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
};

// Scene 1: Intro
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.gradient,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-2/scene1_intro.mp3")} />

      <div style={{ textAlign: "center", opacity: titleOpacity }}>
        <div style={{ fontSize: 40, color: COLORS.light, marginBottom: 20 }}>
          Level 4 - Lesson 2
        </div>
        <div
          style={{
            fontSize: 90,
            fontWeight: "bold",
            color: COLORS.light,
            marginBottom: 30,
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          🖼️ 이미지 분류 CNN
        </div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>
          Convolutional Neural Network
        </div>

        <AnimatedTitle delay={60}>
          <div
            style={{
              marginTop: 80,
              padding: "20px 50px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: 20,
              fontSize: 32,
              color: COLORS.light,
            }}
          >
            컴퓨터 비전의 핵심 기술
          </div>
        </AnimatedTitle>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: MLP Problem
const Scene2MLPProblem: React.FC = () => {
  const frame = useCurrentFrame();

  const problem1 = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });
  const problem2 = interpolate(frame, [150, 180], [0, 1], {
    extrapolateRight: "clamp",
  });
  const problem3 = interpolate(frame, [280, 310], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-2/scene2_mlp_problem.mp3")} />

      <div
        style={{
          padding: 80,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: COLORS.primary,
            marginBottom: 50,
          }}
        >
          ⚠️ MLP의 문제점
        </div>

        <div style={{ display: "flex", gap: 40, flex: 1 }}>
          <div
            style={{
              flex: 1,
              background: "rgba(249,115,22,0.1)",
              borderRadius: 20,
              padding: 40,
              border: "2px solid rgba(249,115,22,0.3)",
              opacity: problem1,
              transform: `translateY(${(1 - problem1) * 30}px)`,
            }}
          >
            <div
              style={{ fontSize: 32, color: COLORS.accent, marginBottom: 20 }}
            >
              1️⃣ 공간 정보 손실
            </div>
            <div style={{ fontSize: 26, color: COLORS.light, lineHeight: 1.6 }}>
              이미지를 1차원으로 펼치면
              <br />
              위아래, 좌우 관계 사라짐
            </div>
            <div
              style={{
                marginTop: 20,
                textAlign: "center",
                fontSize: 28,
                color: "#ff6b6b",
              }}
            >
              32×32 → 1024
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: "rgba(249,115,22,0.1)",
              borderRadius: 20,
              padding: 40,
              border: "2px solid rgba(249,115,22,0.3)",
              opacity: problem2,
              transform: `translateY(${(1 - problem2) * 30}px)`,
            }}
          >
            <div
              style={{ fontSize: 32, color: COLORS.accent, marginBottom: 20 }}
            >
              2️⃣ 파라미터 폭발
            </div>
            <div style={{ fontSize: 26, color: COLORS.light, lineHeight: 1.6 }}>
              1024 × 512 =<br />
              <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>
                524,288개
              </span>{" "}
              가중치
            </div>
            <div
              style={{ marginTop: 20, fontSize: 24, color: "rgba(255,255,255,0.7)" }}
            >
              이미지가 커지면 기하급수적 증가
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: "rgba(249,115,22,0.1)",
              borderRadius: 20,
              padding: 40,
              border: "2px solid rgba(249,115,22,0.3)",
              opacity: problem3,
              transform: `translateY(${(1 - problem3) * 30}px)`,
            }}
          >
            <div
              style={{ fontSize: 32, color: COLORS.accent, marginBottom: 20 }}
            >
              3️⃣ 위치 민감
            </div>
            <div style={{ fontSize: 26, color: COLORS.light, lineHeight: 1.6 }}>
              같은 고양이라도
              <br />
              위치가 다르면 다르게 인식
            </div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <span style={{ fontSize: 40 }}>🐱→</span>
              <span style={{ fontSize: 40 }}>←🐱</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: CNN Idea
const Scene3CNNIdea: React.FC = () => {
  const frame = useCurrentFrame();

  const idea1 = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });
  const idea2 = interpolate(frame, [180, 210], [0, 1], {
    extrapolateRight: "clamp",
  });
  const idea3 = interpolate(frame, [320, 350], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-2/scene3_cnn_idea.mp3")} />

      <div style={{ padding: 80 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: COLORS.primary,
            marginBottom: 60,
            textAlign: "center",
          }}
        >
          💡 CNN의 핵심 아이디어
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 40,
              background: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(234,88,12,0.1))",
              borderRadius: 20,
              padding: 40,
              opacity: idea1,
              transform: `translateX(${(1 - idea1) * -50}px)`,
            }}
          >
            <div
              style={{
                fontSize: 80,
                background: COLORS.gradient,
                borderRadius: 20,
                padding: "20px 30px",
              }}
            >
              🔍
            </div>
            <div>
              <div
                style={{
                  fontSize: 36,
                  color: COLORS.accent,
                  marginBottom: 10,
                }}
              >
                지역 연결
              </div>
              <div style={{ fontSize: 28, color: COLORS.light }}>
                작은 영역(3×3)만 보고 공간 정보 보존
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 40,
              background: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(234,88,12,0.1))",
              borderRadius: 20,
              padding: 40,
              opacity: idea2,
              transform: `translateX(${(1 - idea2) * 50}px)`,
            }}
          >
            <div
              style={{
                fontSize: 80,
                background: COLORS.gradient,
                borderRadius: 20,
                padding: "20px 30px",
              }}
            >
              🔗
            </div>
            <div>
              <div
                style={{
                  fontSize: 36,
                  color: COLORS.accent,
                  marginBottom: 10,
                }}
              >
                가중치 공유
              </div>
              <div style={{ fontSize: 28, color: COLORS.light }}>
                같은 필터를 전체에 적용 → 파라미터 대폭 감소
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 40,
              background: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(234,88,12,0.1))",
              borderRadius: 20,
              padding: 40,
              opacity: idea3,
              transform: `translateX(${(1 - idea3) * -50}px)`,
            }}
          >
            <div
              style={{
                fontSize: 80,
                background: COLORS.gradient,
                borderRadius: 20,
                padding: "20px 30px",
              }}
            >
              📊
            </div>
            <div>
              <div
                style={{
                  fontSize: 36,
                  color: COLORS.accent,
                  marginBottom: 10,
                }}
              >
                계층적 학습
              </div>
              <div style={{ fontSize: 28, color: COLORS.light }}>
                낮은 층: 선, 모서리 → 높은 층: 눈, 귀
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: CNN Layers
const Scene4Layers: React.FC = () => {
  const frame = useCurrentFrame();

  const conv = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });
  const pool = interpolate(frame, [200, 230], [0, 1], {
    extrapolateRight: "clamp",
  });
  const bn = interpolate(frame, [350, 380], [0, 1], {
    extrapolateRight: "clamp",
  });
  const order = interpolate(frame, [500, 530], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-2/scene4_layers.mp3")} />

      <div style={{ padding: 80 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: COLORS.primary,
            marginBottom: 50,
          }}
        >
          🧱 CNN 핵심 레이어
        </div>

        <div style={{ display: "flex", gap: 30 }}>
          <div
            style={{
              flex: 1,
              background: "#2d2d44",
              borderRadius: 20,
              padding: 30,
              opacity: conv,
              transform: `scale(${0.9 + conv * 0.1})`,
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: COLORS.accent,
                marginBottom: 15,
              }}
            >
              Conv2d
            </div>
            <div
              style={{
                fontSize: 22,
                color: COLORS.light,
                lineHeight: 1.6,
              }}
            >
              합성곱 레이어
              <br />
              필터가 이미지 위를 이동
              <br />
              특징 추출
            </div>
            <div
              style={{
                marginTop: 15,
                padding: 15,
                background: "rgba(0,0,0,0.3)",
                borderRadius: 10,
                fontFamily: "monospace",
                fontSize: 18,
                color: "#4ade80",
              }}
            >
              kernel=3, padding=1
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: "#2d2d44",
              borderRadius: 20,
              padding: 30,
              opacity: pool,
              transform: `scale(${0.9 + pool * 0.1})`,
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: COLORS.accent,
                marginBottom: 15,
              }}
            >
              MaxPool2d
            </div>
            <div
              style={{
                fontSize: 22,
                color: COLORS.light,
                lineHeight: 1.6,
              }}
            >
              최대 풀링
              <br />
              2×2에서 최대값만
              <br />
              크기 절반으로 감소
            </div>
            <div
              style={{
                marginTop: 15,
                padding: 15,
                background: "rgba(0,0,0,0.3)",
                borderRadius: 10,
                fontFamily: "monospace",
                fontSize: 18,
                color: "#4ade80",
              }}
            >
              32×32 → 16×16
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: "#2d2d44",
              borderRadius: 20,
              padding: 30,
              opacity: bn,
              transform: `scale(${0.9 + bn * 0.1})`,
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: COLORS.accent,
                marginBottom: 15,
              }}
            >
              BatchNorm2d
            </div>
            <div
              style={{
                fontSize: 22,
                color: COLORS.light,
                lineHeight: 1.6,
              }}
            >
              배치 정규화
              <br />
              각 채널 표준화
              <br />
              학습 안정화
            </div>
            <div
              style={{
                marginTop: 15,
                padding: 15,
                background: "rgba(0,0,0,0.3)",
                borderRadius: 10,
                fontFamily: "monospace",
                fontSize: 18,
                color: "#4ade80",
              }}
            >
              μ=0, σ=1
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 50,
            textAlign: "center",
            opacity: order,
          }}
        >
          <div style={{ fontSize: 32, color: COLORS.light, marginBottom: 20 }}>
            일반적인 순서
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              alignItems: "center",
            }}
          >
            {["Conv", "BatchNorm", "ReLU", "MaxPool"].map((layer, i) => (
              <React.Fragment key={layer}>
                <div
                  style={{
                    padding: "15px 30px",
                    background: COLORS.gradient,
                    borderRadius: 15,
                    fontSize: 24,
                    color: COLORS.light,
                    fontWeight: "bold",
                  }}
                >
                  {layer}
                </div>
                {i < 3 && (
                  <span style={{ fontSize: 30, color: COLORS.accent }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: CIFAR-10
const Scene5CIFAR: React.FC = () => {
  const frame = useCurrentFrame();

  const classes = [
    "✈️ 비행기",
    "🚗 자동차",
    "🐦 새",
    "🐱 고양이",
    "🦌 사슴",
    "🐕 개",
    "🐸 개구리",
    "🐴 말",
    "🚢 배",
    "🚛 트럭",
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-2/scene5_cifar.mp3")} />

      <div style={{ padding: 80 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: COLORS.primary,
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          📊 CIFAR-10 데이터셋
        </div>

        <div style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                background: "#2d2d44",
                borderRadius: 20,
                padding: 40,
                marginBottom: 30,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  color: COLORS.accent,
                  marginBottom: 20,
                }}
              >
                데이터셋 정보
              </div>
              <div
                style={{ fontSize: 26, color: COLORS.light, lineHeight: 2 }}
              >
                • 크기: 32 × 32 픽셀
                <br />
                • 채널: RGB 3채널 (컬러)
                <br />
                • 훈련: 50,000장
                <br />• 테스트: 10,000장
              </div>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,115,22,0.3), rgba(234,88,12,0.2))",
                borderRadius: 20,
                padding: 30,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, color: COLORS.light }}>
                MLP 정확도
              </div>
              <div
                style={{
                  fontSize: 50,
                  fontWeight: "bold",
                  color: "#ff6b6b",
                }}
              >
                ~55%
              </div>
              <div
                style={{
                  fontSize: 40,
                  color: COLORS.accent,
                  margin: "10px 0",
                }}
              >
                ↓
              </div>
              <div style={{ fontSize: 28, color: COLORS.light }}>
                CNN 정확도
              </div>
              <div
                style={{
                  fontSize: 50,
                  fontWeight: "bold",
                  color: "#4ade80",
                }}
              >
                85%+
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 25 }}>
              10개 클래스
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 15,
              }}
            >
              {classes.map((cls, i) => {
                const delay = 60 + i * 15;
                const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
                  extrapolateRight: "clamp",
                });
                return (
                  <div
                    key={cls}
                    style={{
                      background: "#2d2d44",
                      borderRadius: 15,
                      padding: "20px 25px",
                      fontSize: 26,
                      color: COLORS.light,
                      opacity,
                      transform: `translateY(${(1 - opacity) * 20}px)`,
                    }}
                  >
                    {cls}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Model Structure
const Scene6Model: React.FC = () => {
  const frame = useCurrentFrame();

  const blocks = [
    { ch: "3→32", size: "32×32→16×16" },
    { ch: "32→64", size: "16×16→8×8" },
    { ch: "64→128", size: "8×8→4×4" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-2/scene6_model.mp3")} />

      <div style={{ padding: 80 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: COLORS.primary,
            marginBottom: 50,
            textAlign: "center",
          }}
        >
          🏗️ CNN 모델 구조
        </div>

        <div style={{ display: "flex", gap: 50 }}>
          {/* Feature Extraction */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 32,
                color: COLORS.accent,
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              특징 추출부
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {blocks.map((block, i) => {
                const delay = 30 + i * 60;
                const opacity = interpolate(
                  frame,
                  [delay, delay + 30],
                  [0, 1],
                  { extrapolateRight: "clamp" }
                );
                return (
                  <div
                    key={i}
                    style={{
                      background: "linear-gradient(135deg, #2d2d44, #3d3d54)",
                      borderRadius: 20,
                      padding: 30,
                      borderLeft: `5px solid ${COLORS.primary}`,
                      opacity,
                      transform: `translateX(${(1 - opacity) * -30}px)`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        color: COLORS.accent,
                        marginBottom: 10,
                      }}
                    >
                      Block {i + 1}
                    </div>
                    <div style={{ fontSize: 22, color: COLORS.light }}>
                      채널: {block.ch}
                    </div>
                    <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>
                      크기: {block.size}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 60,
              color: COLORS.primary,
            }}
          >
            →
          </div>

          {/* Classification */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 32,
                color: COLORS.accent,
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              분류부
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #2d2d44, #3d3d54)",
                borderRadius: 20,
                padding: 40,
                height: "calc(100% - 70px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 25,
                }}
              >
                <div
                  style={{
                    padding: "20px 40px",
                    background: COLORS.gradient,
                    borderRadius: 15,
                    fontSize: 24,
                    color: COLORS.light,
                  }}
                >
                  Flatten
                </div>
                <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)" }}>
                  128 × 4 × 4 = 2048
                </div>
                <div style={{ fontSize: 30, color: COLORS.primary }}>↓</div>
                <div
                  style={{
                    padding: "15px 35px",
                    background: "#3d3d54",
                    borderRadius: 15,
                    fontSize: 24,
                    color: COLORS.light,
                    border: `2px solid ${COLORS.primary}`,
                  }}
                >
                  Linear: 2048 → 256
                </div>
                <div style={{ fontSize: 30, color: COLORS.primary }}>↓</div>
                <div
                  style={{
                    padding: "15px 35px",
                    background: "#3d3d54",
                    borderRadius: 15,
                    fontSize: 24,
                    color: COLORS.light,
                    border: `2px solid ${COLORS.accent}`,
                  }}
                >
                  Linear: 256 → 10
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Outro
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const summaryOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.gradient,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-2/scene7_outro.mp3")} />

      <div style={{ textAlign: "center", padding: 80 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: COLORS.light,
            marginBottom: 50,
          }}
        >
          📝 오늘 배운 내용
        </div>

        <div
          style={{
            display: "flex",
            gap: 30,
            marginBottom: 50,
            opacity: summaryOpacity,
          }}
        >
          {[
            { icon: "🔍", title: "CNN 핵심", desc: "지역 연결, 가중치 공유" },
            { icon: "🧱", title: "레이어", desc: "Conv, Pool, BatchNorm" },
            { icon: "📊", title: "CIFAR-10", desc: "MLP→CNN: +30%↑" },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 20,
                padding: 30,
              }}
            >
              <div style={{ fontSize: 50, marginBottom: 15 }}>{item.icon}</div>
              <div
                style={{
                  fontSize: 28,
                  color: COLORS.light,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.9)" }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <AnimatedTitle delay={120}>
          <div
            style={{
              fontSize: 36,
              color: COLORS.light,
              marginBottom: 20,
            }}
          >
            다음 레슨: 텍스트 분류
          </div>
          <div style={{ fontSize: 50, color: COLORS.light }}>
            다음 시간에 만나요! 👋
          </div>
        </AnimatedTitle>
      </div>
    </AbsoluteFill>
  );
};

// Main Video Component
export const Lesson4_2Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <Sequence
        from={SCENE_TIMINGS.intro.start}
        durationInFrames={SCENE_TIMINGS.intro.duration}
      >
        <Scene1Intro />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.mlp_problem.start}
        durationInFrames={SCENE_TIMINGS.mlp_problem.duration}
      >
        <Scene2MLPProblem />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.cnn_idea.start}
        durationInFrames={SCENE_TIMINGS.cnn_idea.duration}
      >
        <Scene3CNNIdea />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.layers.start}
        durationInFrames={SCENE_TIMINGS.layers.duration}
      >
        <Scene4Layers />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.cifar.start}
        durationInFrames={SCENE_TIMINGS.cifar.duration}
      >
        <Scene5CIFAR />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.model.start}
        durationInFrames={SCENE_TIMINGS.model.duration}
      >
        <Scene6Model />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.outro.start}
        durationInFrames={SCENE_TIMINGS.outro.duration}
      >
        <Scene7Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
