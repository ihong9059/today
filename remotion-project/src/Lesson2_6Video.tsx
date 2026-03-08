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
  scene1_intro: { duration: 621, start: 0 },
  scene2_probability: { duration: 779, start: 621 },
  scene3_conditional: { duration: 707, start: 1400 },
  scene4_bayes: { duration: 828, start: 2107 },
  scene5_ai: { duration: 668, start: 2935 },
  scene6_outro: { duration: 673, start: 3603 },
};

export const LESSON_2_6_DURATION = 4276;

// ============ COLORS ============
const colors = {
  primary: "#e040fb",
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
    Level 2-6
  </div>
);



// Scene 1: Intro
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const topicsOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a", padding: 80 }}>
      <div style={{
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        textAlign: "center",
        marginBottom: 50,
      }}>
        <h1 style={{ fontSize: 80, color: "#e040fb", margin: 0, textShadow: "0 0 30px #e040fb" }}>
          확률의 기초
        </h1>
        <p style={{ fontSize: 36, color: "#888", marginTop: 20 }}>
          Level 2-6 | AI의 불확실성 다루기
        </p>
      </div>

      <div style={{
        opacity: subtitleOpacity,
        textAlign: "center",
        marginBottom: 60,
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(224, 64, 251, 0.2)",
          border: "2px solid #e040fb",
          padding: "25px 50px",
          borderRadius: 20,
        }}>
          <span style={{ fontSize: 32, color: "#e040fb" }}>
            🎲 불확실한 세상에서 결정하기
          </span>
        </div>
      </div>

      <div style={{
        opacity: topicsOpacity,
        display: "flex",
        justifyContent: "center",
        gap: 40,
      }}>
        {["확률이란?", "조건부 확률", "베이즈 정리"].map((topic, i) => (
          <div key={i} style={{
            background: "rgba(224, 64, 251, 0.1)",
            border: "2px solid #e040fb",
            borderRadius: 15,
            padding: "20px 40px",
            color: "#e040fb",
            fontSize: 28,
          }}>
            {topic}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Probability Basics
const Scene2Probability: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const scaleOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const examplesOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });

  const markerPos = interpolate(frame, [75, 150], [0, 0.5], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0a28", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#e040fb",
        textAlign: "center",
        marginBottom: 50,
      }}>
        확률이란?
      </h2>

      <div style={{
        opacity: scaleOpacity,
        textAlign: "center",
        marginBottom: 50,
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: 20,
          padding: "30px 60px",
        }}>
          <p style={{ fontSize: 32, color: "#888", marginBottom: 20 }}>
            어떤 일이 일어날 가능성
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            justifyContent: "center",
          }}>
            <span style={{ fontSize: 48, color: "#f44336", fontWeight: "bold" }}>0</span>
            <div style={{
              width: 600,
              height: 40,
              background: "linear-gradient(to right, #f44336, #ffeb3b, #4caf50)",
              borderRadius: 20,
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                left: `${markerPos * 100}%`,
                top: -15,
                transform: "translateX(-50%)",
              }}>
                <div style={{
                  width: 0,
                  height: 0,
                  borderLeft: "15px solid transparent",
                  borderRight: "15px solid transparent",
                  borderTop: "20px solid white",
                }} />
              </div>
            </div>
            <span style={{ fontSize: 48, color: "#4caf50", fontWeight: "bold" }}>1</span>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: 700,
            margin: "20px auto 0",
          }}>
            <span style={{ color: "#f44336", fontSize: 20 }}>절대 안 일어남</span>
            <span style={{ color: "#ffeb3b", fontSize: 20 }}>반반</span>
            <span style={{ color: "#4caf50", fontSize: 20 }}>반드시 일어남</span>
          </div>
        </div>
      </div>

      <div style={{
        opacity: examplesOpacity,
        display: "flex",
        justifyContent: "center",
        gap: 50,
      }}>
        <div style={{
          background: "rgba(224, 64, 251, 0.1)",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 80 }}>🪙</div>
          <p style={{ color: "white", fontSize: 24, marginTop: 15 }}>동전 앞면</p>
          <span style={{ fontSize: 48, color: "#e040fb", fontWeight: "bold" }}>0.5</span>
        </div>
        <div style={{
          background: "rgba(224, 64, 251, 0.1)",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 80 }}>🎲</div>
          <p style={{ color: "white", fontSize: 24, marginTop: 15 }}>주사위 6</p>
          <span style={{ fontSize: 48, color: "#e040fb", fontWeight: "bold" }}>1/6</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Conditional Probability
const Scene3Conditional: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const formulaScale = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const examplesOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1a28", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#00d4ff",
        textAlign: "center",
        marginBottom: 50,
      }}>
        조건부 확률
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
            P(<span style={{ color: "#ff6b35" }}>A</span>|<span style={{ color: "#4caf50" }}>B</span>)
          </div>
          <p style={{ fontSize: 28, color: "#888", marginTop: 20 }}>
            "<span style={{ color: "#4caf50" }}>B</span>가 일어났을 때 <span style={{ color: "#ff6b35" }}>A</span>의 확률"
          </p>
        </div>
      </div>

      <div style={{
        opacity: examplesOpacity,
        display: "flex",
        justifyContent: "center",
        gap: 40,
      }}>
        <div style={{
          background: "rgba(0, 212, 255, 0.1)",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
          border: "2px solid #00d4ff",
        }}>
          <div style={{ fontSize: 60 }}>🌧️ → ☂️</div>
          <p style={{ color: "white", fontSize: 22, marginTop: 15 }}>
            비가 올 때<br />우산 쓸 확률
          </p>
        </div>
        <div style={{
          background: "rgba(0, 212, 255, 0.1)",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
          border: "2px solid #00d4ff",
        }}>
          <div style={{ fontSize: 60 }}>🤒 → 😷</div>
          <p style={{ color: "white", fontSize: 22, marginTop: 15 }}>
            감기 걸렸을 때<br />기침할 확률
          </p>
        </div>
      </div>

      <div style={{
        opacity: examplesOpacity,
        textAlign: "center",
        marginTop: 40,
      }}>
        <span style={{ fontSize: 32, color: "#ff6b35" }}>
          조건이 있으면 확률이 달라져요!
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Bayes' Theorem
const Scene4Bayes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const formulaScale = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const explanationOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const aiOpacity = interpolate(frame, [220, 250], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a0a", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#ffc107",
        textAlign: "center",
        marginBottom: 50,
      }}>
        베이즈 정리
      </h2>

      <div style={{
        transform: `scale(${formulaScale})`,
        textAlign: "center",
        marginBottom: 50,
      }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #2a2a1a, #3d3d2a)",
          borderRadius: 20,
          padding: "40px 60px",
          border: "3px solid #ffc107",
        }}>
          <div style={{ fontSize: 56, fontFamily: "monospace", color: "white" }}>
            P(A|B) = <span style={{ color: "#ffc107" }}>
              <span style={{ display: "inline-block" }}>
                <span>P(B|A) × P(A)</span>
                <div style={{ borderTop: "3px solid #ffc107", marginTop: 5 }}>P(B)</div>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div style={{
        opacity: explanationOpacity,
        textAlign: "center",
        marginBottom: 40,
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(255, 193, 7, 0.1)",
          borderRadius: 15,
          padding: "20px 40px",
        }}>
          <p style={{ fontSize: 32, color: "white", margin: 0 }}>
            🔄 조건부 확률을 <span style={{ color: "#ffc107" }}>뒤집는</span> 공식!
          </p>
          <p style={{ fontSize: 24, color: "#888", marginTop: 15 }}>
            P(A|B)를 알면 → P(B|A)를 계산 가능
          </p>
        </div>
      </div>

      <div style={{
        opacity: aiOpacity,
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
        <span style={{ fontSize: 28, color: "white" }}>
          🎯 증거를 보고 원인을 추정! AI 학습의 핵심 원리
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: AI Application
const Scene5AI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const classificationOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const languageOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const conclusionOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1a1a", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#00d4ff",
        textAlign: "center",
        marginBottom: 50,
      }}>
        AI에서의 확률
      </h2>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 60,
        marginBottom: 40,
      }}>
        <div style={{
          opacity: classificationOpacity,
          background: "rgba(0, 212, 255, 0.1)",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
          border: "2px solid #00d4ff",
          width: 400,
        }}>
          <h3 style={{ color: "#00d4ff", fontSize: 32, margin: "0 0 20px 0" }}>
            🖼️ 이미지 분류
          </h3>
          <div style={{ fontSize: 80, marginBottom: 15 }}>🐱</div>
          <div style={{ textAlign: "left", padding: "0 30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: "white", fontSize: 24 }}>고양이</span>
              <span style={{ color: "#4caf50", fontSize: 24, fontWeight: "bold" }}>90%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "white", fontSize: 24 }}>개</span>
              <span style={{ color: "#f44336", fontSize: 24 }}>10%</span>
            </div>
          </div>
        </div>

        <div style={{
          opacity: languageOpacity,
          background: "rgba(224, 64, 251, 0.1)",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
          border: "2px solid #e040fb",
          width: 400,
        }}>
          <h3 style={{ color: "#e040fb", fontSize: 32, margin: "0 0 20px 0" }}>
            💬 언어 모델
          </h3>
          <p style={{ color: "white", fontSize: 24, marginBottom: 15 }}>
            "오늘 날씨가..."
          </p>
          <div style={{ textAlign: "left", padding: "0 30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: "white", fontSize: 24 }}>좋다</span>
              <span style={{ color: "#4caf50", fontSize: 24, fontWeight: "bold" }}>45%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: "white", fontSize: 24 }}>춥다</span>
              <span style={{ color: "#ffeb3b", fontSize: 24 }}>30%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "white", fontSize: 24 }}>덥다</span>
              <span style={{ color: "#f44336", fontSize: 24 }}>25%</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        opacity: conclusionOpacity,
        textAlign: "center",
        background: "linear-gradient(135deg, #ff6b35, #f7931e)",
        padding: "25px 50px",
        borderRadius: 15,
        display: "inline-block",
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
      }}>
        <span style={{ fontSize: 32, color: "white" }}>
          📊 불확실성을 수치화하는 게 확률!
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
  const nextOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const endOpacity = interpolate(frame, [220, 250], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#e040fb",
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
        marginBottom: 50,
      }}>
        {[
          { title: "확률", desc: "0~1 사이의 가능성" },
          { title: "조건부 확률", desc: "조건이 주어진 확률" },
          { title: "베이즈 정리", desc: "원인을 추정하는 공식" },
        ].map((item, i) => (
          <div key={i} style={{
            background: "rgba(224, 64, 251, 0.1)",
            border: "2px solid #e040fb",
            borderRadius: 15,
            padding: "20px 30px",
            textAlign: "center",
            width: 280,
          }}>
            <h3 style={{ color: "#e040fb", fontSize: 32, margin: "0 0 10px 0" }}>
              {item.title}
            </h3>
            <p style={{ color: "#888", fontSize: 20, margin: 0 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        opacity: nextOpacity,
        textAlign: "center",
        marginBottom: 30,
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(0, 212, 255, 0.2)",
          border: "2px solid #00d4ff",
          padding: "20px 40px",
          borderRadius: 15,
        }}>
          <span style={{ fontSize: 28, color: "#00d4ff" }}>
            다음 시간: 확률분포 - 여러 확률을 한눈에!
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

export const Lesson2_6Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
        <Audio src={staticFile("audio/lesson-2-6/scene1_intro.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_probability.start} durationInFrames={SCENE_TIMINGS.scene2_probability.duration}>
        <Scene2Probability />
        <Audio src={staticFile("audio/lesson-2-6/scene2_probability.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_conditional.start} durationInFrames={SCENE_TIMINGS.scene3_conditional.duration}>
        <Scene3Conditional />
        <Audio src={staticFile("audio/lesson-2-6/scene3_conditional.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_bayes.start} durationInFrames={SCENE_TIMINGS.scene4_bayes.duration}>
        <Scene4Bayes />
        <Audio src={staticFile("audio/lesson-2-6/scene4_bayes.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_ai.start} durationInFrames={SCENE_TIMINGS.scene5_ai.duration}>
        <Scene5AI />
        <Audio src={staticFile("audio/lesson-2-6/scene5_ai.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_outro.start} durationInFrames={SCENE_TIMINGS.scene6_outro.duration}>
        <Scene6Outro />
        <Audio src={staticFile("audio/lesson-2-6/scene6_outro.mp3")} />
      </Sequence>

      <LevelBadge level="2-6" title="확률의 기초" />
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
