import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const SCENE_TIMINGS = {
  scene1_intro: { duration: 676, start: 0 },
  scene2_vector: { duration: 850, start: 676 },
  scene3_matrix: { duration: 739, start: 1526 },
  scene4_multiplication: { duration: 686, start: 2265 },
  scene5_neural: { duration: 727, start: 2951 },
  scene6_outro: { duration: 847, start: 3678 },
};

export const LESSON_2_5_DURATION = 4525;

// ============ COLORS ============
const colors = {
  primary: "#ff6b35",
  secondary: "#8b5cf6",
  white: "#ffffff",
  gray: {
    300: "#d1d5db",
  },
  math: "#10b981",
};

// ============ HELPER FUNCTIONS ============
const fadeIn = (frame: number, delay: number = 0, duration: number = 30) =>
  Math.min(Math.max((frame - delay) / duration, 0), 1);

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

      {/* 오른쪽 하단 URL */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          zIndex: 1000,
          opacity: logoOpacity,
          fontSize: 22,
          color: colors.gray[300],
          fontWeight: 500,
        }}
      >
        ai-first-step.uttec-lab.com
      </div>
    </>
  );
};

// ============ LEVEL BADGE ============
const LevelBadge: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 30,
      right: 40,
      backgroundColor: colors.math,
      padding: "10px 25px",
      borderRadius: 25,
      fontSize: 22,
      fontWeight: "bold",
      color: colors.white,
      boxShadow: `0 4px 15px ${colors.math}60`,
      zIndex: 1000,
    }}
  >
    Level 2-5
  </div>
);



// Scene 1: Intro
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: "clamp" });
  const statsScale = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const topicsOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a", padding: 80 }}>
      <div style={{
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        textAlign: "center",
        marginBottom: 50,
      }}>
        <h1 style={{ fontSize: 80, color: "#00d4ff", margin: 0, textShadow: "0 0 30px #00d4ff" }}>
          벡터와 행렬 기초
        </h1>
        <p style={{ fontSize: 36, color: "#888", marginTop: 20 }}>
          Level 2-5 | AI 연산의 핵심
        </p>
      </div>

      <div style={{
        transform: `scale(${statsScale})`,
        textAlign: "center",
        marginBottom: 60,
      }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #ff6b35, #f7931e)",
          padding: "30px 60px",
          borderRadius: 20,
          boxShadow: "0 10px 40px rgba(255, 107, 53, 0.4)",
        }}>
          <span style={{ fontSize: 72, fontWeight: "bold", color: "white" }}>95%</span>
          <p style={{ fontSize: 28, color: "white", margin: "10px 0 0 0" }}>
            AI 연산이 행렬 곱셈!
          </p>
        </div>
      </div>

      <div style={{
        opacity: topicsOpacity,
        display: "flex",
        justifyContent: "center",
        gap: 40,
      }}>
        {["벡터란?", "행렬이란?", "행렬 곱셈"].map((topic, i) => (
          <div key={i} style={{
            background: "rgba(0, 212, 255, 0.1)",
            border: "2px solid #00d4ff",
            borderRadius: 15,
            padding: "20px 40px",
            color: "#00d4ff",
            fontSize: 28,
          }}>
            {topic}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Vector
const Scene2Vector: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const vectorScale = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const examplesOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const dimOpacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1628", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#00d4ff",
        textAlign: "center",
        marginBottom: 50,
      }}>
        벡터(Vector)란?
      </h2>

      <div style={{
        transform: `scale(${vectorScale})`,
        display: "flex",
        justifyContent: "center",
        marginBottom: 50,
      }}>
        <div style={{
          background: "linear-gradient(135deg, #1a1a3e, #2d2d5a)",
          borderRadius: 20,
          padding: 40,
          border: "3px solid #00d4ff",
        }}>
          <div style={{ fontSize: 72, color: "white", fontFamily: "monospace" }}>
            [ 1, 2, 3 ]
          </div>
          <p style={{ color: "#888", fontSize: 24, textAlign: "center", marginTop: 15 }}>
            3차원 벡터
          </p>
        </div>
      </div>

      <div style={{
        opacity: examplesOpacity,
        display: "flex",
        justifyContent: "center",
        gap: 40,
        marginBottom: 40,
      }}>
        {[
          { icon: "🖼️", text: "이미지 픽셀값" },
          { icon: "📝", text: "단어 임베딩" },
          { icon: "🔢", text: "모든 데이터" },
        ].map((item, i) => (
          <div key={i} style={{
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: 15,
            padding: "20px 30px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48 }}>{item.icon}</div>
            <p style={{ color: "#aaa", fontSize: 22, marginTop: 10 }}>{item.text}</p>
          </div>
        ))}
      </div>

      <div style={{
        opacity: dimOpacity,
        textAlign: "center",
        background: "linear-gradient(135deg, #ff6b35, #f7931e)",
        padding: "25px 50px",
        borderRadius: 15,
        display: "inline-block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "fit-content",
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
      }}>
        <span style={{ fontSize: 36, color: "white", fontWeight: "bold" }}>
          GPT 임베딩: 12,288차원!
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Matrix
const Scene3Matrix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const matrixScale = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const labelOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  const nnOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0a28", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#e040fb",
        textAlign: "center",
        marginBottom: 50,
      }}>
        행렬(Matrix)이란?
      </h2>

      <div style={{
        transform: `scale(${matrixScale})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        marginBottom: 50,
      }}>
        <div style={{
          background: "linear-gradient(135deg, #2a1a3e, #3d2d5a)",
          borderRadius: 20,
          padding: 40,
          border: "3px solid #e040fb",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 120, color: "#e040fb" }}>[</span>
            <div>
              {matrix.map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 30, marginBottom: 10 }}>
                  {row.map((val, j) => (
                    <span key={j} style={{
                      fontSize: 56,
                      color: "white",
                      fontFamily: "monospace",
                      width: 60,
                      textAlign: "center",
                    }}>
                      {val}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <span style={{ fontSize: 120, color: "#e040fb" }}>]</span>
          </div>
        </div>

        <div style={{ opacity: labelOpacity, textAlign: "left" }}>
          <div style={{ color: "#ff6b35", fontSize: 32, marginBottom: 15 }}>
            → 2개의 행 (가로)
          </div>
          <div style={{ color: "#00d4ff", fontSize: 32 }}>
            ↓ 3개의 열 (세로)
          </div>
          <div style={{
            marginTop: 30,
            background: "rgba(224, 64, 251, 0.2)",
            padding: "15px 25px",
            borderRadius: 10,
          }}>
            <span style={{ color: "#e040fb", fontSize: 36, fontWeight: "bold" }}>
              2 × 3 행렬
            </span>
          </div>
        </div>
      </div>

      <div style={{
        opacity: nnOpacity,
        textAlign: "center",
        background: "linear-gradient(135deg, #00d4ff, #0099cc)",
        padding: "25px 50px",
        borderRadius: 15,
        display: "inline-block",
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
      }}>
        <span style={{ fontSize: 32, color: "white" }}>
          🧠 신경망의 가중치 = 행렬!
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Matrix Multiplication
const Scene4Multiplication: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const formulaScale = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const ruleOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const highlightOpacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1a0a", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#4caf50",
        textAlign: "center",
        marginBottom: 50,
      }}>
        행렬 곱셈
      </h2>

      <div style={{
        transform: `scale(${formulaScale})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        marginBottom: 50,
      }}>
        <div style={{
          background: "rgba(76, 175, 80, 0.1)",
          border: "3px solid #4caf50",
          borderRadius: 15,
          padding: 30,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 36, color: "#888", marginBottom: 10 }}>A</div>
          <div style={{ fontSize: 48, color: "#ff6b35", fontFamily: "monospace" }}>
            m × n
          </div>
        </div>

        <span style={{ fontSize: 64, color: "#4caf50" }}>×</span>

        <div style={{
          background: "rgba(76, 175, 80, 0.1)",
          border: "3px solid #4caf50",
          borderRadius: 15,
          padding: 30,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 36, color: "#888", marginBottom: 10 }}>B</div>
          <div style={{ fontSize: 48, color: "#00d4ff", fontFamily: "monospace" }}>
            n × p
          </div>
        </div>

        <span style={{ fontSize: 64, color: "#4caf50" }}>=</span>

        <div style={{
          background: "rgba(76, 175, 80, 0.2)",
          border: "3px solid #4caf50",
          borderRadius: 15,
          padding: 30,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 36, color: "#888", marginBottom: 10 }}>C</div>
          <div style={{ fontSize: 48, color: "#4caf50", fontFamily: "monospace" }}>
            m × p
          </div>
        </div>
      </div>

      <div style={{
        opacity: ruleOpacity,
        textAlign: "center",
        marginBottom: 40,
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: 15,
          padding: "20px 40px",
        }}>
          <p style={{ fontSize: 36, color: "white", margin: 0 }}>
            행과 열의 <span style={{ color: "#ff6b35" }}>내적</span>을 계산!
          </p>
        </div>
      </div>

      <div style={{
        opacity: highlightOpacity,
        textAlign: "center",
        background: "linear-gradient(135deg, #f44336, #c62828)",
        padding: "25px 50px",
        borderRadius: 15,
        display: "inline-block",
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
      }}>
        <span style={{ fontSize: 32, color: "white" }}>
          ⚠️ 안쪽 차원 <span style={{ fontFamily: "monospace", fontWeight: "bold" }}>n</span>이 같아야 곱셈 가능!
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Neural Network Application
const Scene5Neural: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const formulaScale = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const labelsOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  const diagramOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#00d4ff",
        textAlign: "center",
        marginBottom: 50,
      }}>
        신경망에서의 행렬
      </h2>

      <div style={{
        transform: `scale(${formulaScale})`,
        textAlign: "center",
        marginBottom: 50,
      }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #1a1a3e, #2d2d5a)",
          borderRadius: 20,
          padding: "40px 80px",
          border: "3px solid #00d4ff",
        }}>
          <div style={{ fontSize: 80, fontFamily: "monospace", color: "white" }}>
            <span style={{ color: "#4caf50" }}>y</span>
            {" = "}
            <span style={{ color: "#ff6b35" }}>W</span>
            {" × "}
            <span style={{ color: "#00d4ff" }}>x</span>
            {" + "}
            <span style={{ color: "#e040fb" }}>b</span>
          </div>
        </div>
      </div>

      <div style={{
        opacity: labelsOpacity,
        display: "flex",
        justifyContent: "center",
        gap: 40,
        marginBottom: 50,
      }}>
        {[
          { var: "W", name: "가중치 행렬", color: "#ff6b35" },
          { var: "x", name: "입력 벡터", color: "#00d4ff" },
          { var: "b", name: "편향 벡터", color: "#e040fb" },
          { var: "y", name: "출력 벡터", color: "#4caf50" },
        ].map((item, i) => (
          <div key={i} style={{
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: 15,
            padding: "15px 25px",
            textAlign: "center",
          }}>
            <span style={{
              fontSize: 40,
              fontFamily: "monospace",
              color: item.color,
              fontWeight: "bold",
            }}>
              {item.var}
            </span>
            <p style={{ color: "#888", fontSize: 20, margin: "10px 0 0 0" }}>
              {item.name}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        opacity: diagramOpacity,
        textAlign: "center",
        background: "linear-gradient(135deg, #4caf50, #2e7d32)",
        padding: "25px 50px",
        borderRadius: 15,
        display: "inline-block",
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
      }}>
        <span style={{ fontSize: 32, color: "white" }}>
          🎯 이게 바로 신경망의 핵심 연산!
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Outro
const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const summaryOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const gpuOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const nextOpacity = interpolate(frame, [220, 250], [0, 1], { extrapolateRight: "clamp" });
  const endOpacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#00d4ff",
        textAlign: "center",
        marginBottom: 40,
      }}>
        오늘 배운 내용
      </h2>

      <div style={{
        opacity: summaryOpacity,
        display: "flex",
        justifyContent: "center",
        gap: 30,
        marginBottom: 40,
      }}>
        {[
          { title: "벡터", desc: "숫자들의 순서 있는 목록" },
          { title: "행렬", desc: "숫자들의 직사각형 배열" },
          { title: "행렬 곱셈", desc: "AI의 핵심 연산" },
        ].map((item, i) => (
          <div key={i} style={{
            background: "rgba(0, 212, 255, 0.1)",
            border: "2px solid #00d4ff",
            borderRadius: 15,
            padding: "20px 30px",
            textAlign: "center",
            width: 280,
          }}>
            <h3 style={{ color: "#00d4ff", fontSize: 32, margin: "0 0 10px 0" }}>
              {item.title}
            </h3>
            <p style={{ color: "#888", fontSize: 20, margin: 0 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        opacity: gpuOpacity,
        textAlign: "center",
        marginBottom: 40,
      }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #4caf50, #2e7d32)",
          padding: "20px 40px",
          borderRadius: 15,
        }}>
          <span style={{ fontSize: 28, color: "white" }}>
            🚀 GPU가 빠른 이유: 행렬 연산 최적화!
          </span>
        </div>
      </div>

      <div style={{
        opacity: nextOpacity,
        textAlign: "center",
        marginBottom: 30,
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(224, 64, 251, 0.2)",
          border: "2px solid #e040fb",
          padding: "20px 40px",
          borderRadius: 15,
        }}>
          <span style={{ fontSize: 28, color: "#e040fb" }}>
            다음 시간: 확률의 기초 - AI의 불확실성 다루기
          </span>
        </div>
      </div>

      <div style={{
        opacity: endOpacity,
        textAlign: "center",
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
      }}>
        <span style={{ fontSize: 48, color: "#fff" }}>
          오늘도 수고하셨습니다! 👏
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson2_5Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
        <Audio src={staticFile("audio/lesson-2-5/scene1_intro.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_vector.start} durationInFrames={SCENE_TIMINGS.scene2_vector.duration}>
        <Scene2Vector />
        <Audio src={staticFile("audio/lesson-2-5/scene2_vector.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_matrix.start} durationInFrames={SCENE_TIMINGS.scene3_matrix.duration}>
        <Scene3Matrix />
        <Audio src={staticFile("audio/lesson-2-5/scene3_matrix.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_multiplication.start} durationInFrames={SCENE_TIMINGS.scene4_multiplication.duration}>
        <Scene4Multiplication />
        <Audio src={staticFile("audio/lesson-2-5/scene4_multiplication.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_neural.start} durationInFrames={SCENE_TIMINGS.scene5_neural.duration}>
        <Scene5Neural />
        <Audio src={staticFile("audio/lesson-2-5/scene5_neural.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_outro.start} durationInFrames={SCENE_TIMINGS.scene6_outro.duration}>
        <Scene6Outro />
        <Audio src={staticFile("audio/lesson-2-5/scene6_outro.mp3")} />
      </Sequence>

      <LevelBadge level="2-5" title="벡터와 행렬" />
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
