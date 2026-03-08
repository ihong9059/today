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
  scene1_intro: { duration: 638, start: 0 },
  scene2_distribution: { duration: 792, start: 638 },
  scene3_normal: { duration: 706, start: 1430 },
  scene4_parameters: { duration: 668, start: 2136 },
  scene5_ai: { duration: 750, start: 2804 },
  scene6_outro: { duration: 717, start: 3554 },
};

export const LESSON_2_7_DURATION = 4271;

// ============ COLORS ============
const colors = {
  primary: "#4caf50",
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
    Level 2-7
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
        <h1 style={{ fontSize: 80, color: "#4caf50", margin: 0, textShadow: "0 0 30px #4caf50" }}>
          확률분포
        </h1>
        <p style={{ fontSize: 36, color: "#888", marginTop: 20 }}>
          Level 2-7 | 여러 확률을 한눈에
        </p>
      </div>

      <div style={{
        opacity: subtitleOpacity,
        textAlign: "center",
        marginBottom: 60,
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(76, 175, 80, 0.2)",
          border: "2px solid #4caf50",
          padding: "25px 50px",
          borderRadius: 20,
        }}>
          <span style={{ fontSize: 32, color: "#4caf50" }}>
            📊 모든 가능한 결과의 확률 보기
          </span>
        </div>
      </div>

      <div style={{
        opacity: topicsOpacity,
        display: "flex",
        justifyContent: "center",
        gap: 40,
      }}>
        {["확률분포란?", "정규분포", "AI 활용"].map((topic, i) => (
          <div key={i} style={{
            background: "rgba(76, 175, 80, 0.1)",
            border: "2px solid #4caf50",
            borderRadius: 15,
            padding: "20px 40px",
            color: "#4caf50",
            fontSize: 28,
          }}>
            {topic}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Distribution Basics
const Scene2Distribution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const diceOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const barsOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  const uniformOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  const barHeights = [1, 2, 3, 4, 5, 6].map((_, i) => {
    const delay = 130 + i * 15;
    return interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a0a", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#ffc107",
        textAlign: "center",
        marginBottom: 50,
      }}>
        확률분포란?
      </h2>

      <div style={{
        opacity: diceOpacity,
        textAlign: "center",
        marginBottom: 40,
      }}>
        <span style={{ fontSize: 80 }}>🎲</span>
        <p style={{ fontSize: 28, color: "#888", marginTop: 10 }}>
          주사위의 확률분포
        </p>
      </div>

      <div style={{
        opacity: barsOpacity,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 30,
        height: 200,
        marginBottom: 40,
      }}>
        {[1, 2, 3, 4, 5, 6].map((num, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <div style={{
              width: 80,
              height: 120 * barHeights[i],
              background: "linear-gradient(to top, #ffc107, #ff9800)",
              borderRadius: "10px 10px 0 0",
            }} />
            <span style={{
              color: "white",
              fontSize: 32,
              marginTop: 10,
              fontWeight: "bold",
            }}>
              {num}
            </span>
            <span style={{ color: "#888", fontSize: 20 }}>1/6</span>
          </div>
        ))}
      </div>

      <div style={{
        opacity: uniformOpacity,
        textAlign: "center",
        background: "linear-gradient(135deg, #4caf50, #2e7d32)",
        padding: "20px 40px",
        borderRadius: 15,
        display: "inline-block",
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
      }}>
        <span style={{ fontSize: 28, color: "white" }}>
          ⚖️ 균등분포: 모든 결과가 같은 확률!
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Normal Distribution
const Scene3Normal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const curveOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const examplesOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });

  // Draw bell curve points
  const curvePoints = Array.from({ length: 100 }, (_, i) => {
    const x = (i / 100) * 600;
    const t = (i - 50) / 15;
    const y = Math.exp(-t * t / 2) * 200;
    return `${x},${250 - y}`;
  }).join(" ");

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1a28", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#00d4ff",
        textAlign: "center",
        marginBottom: 30,
      }}>
        정규분포 (Normal Distribution)
      </h2>

      <div style={{
        opacity: curveOpacity,
        display: "flex",
        justifyContent: "center",
        marginBottom: 40,
      }}>
        <div style={{
          background: "rgba(0, 212, 255, 0.1)",
          borderRadius: 20,
          padding: 30,
          border: "2px solid #00d4ff",
        }}>
          <svg width="600" height="280" viewBox="0 0 600 280">
            <defs>
              <linearGradient id="bellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#0066ff" />
              </linearGradient>
            </defs>
            <polyline
              points={curvePoints}
              fill="none"
              stroke="url(#bellGradient)"
              strokeWidth="4"
            />
            <line x1="300" y1="50" x2="300" y2="250" stroke="#888" strokeDasharray="5,5" />
            <text x="300" y="270" fill="#888" textAnchor="middle" fontSize="20">평균 (μ)</text>
          </svg>
          <p style={{ textAlign: "center", color: "#888", fontSize: 24 }}>
            🔔 종 모양 곡선
          </p>
        </div>
      </div>

      <div style={{
        opacity: examplesOpacity,
        display: "flex",
        justifyContent: "center",
        gap: 40,
      }}>
        {[
          { icon: "📏", text: "사람 키" },
          { icon: "📝", text: "시험 점수" },
          { icon: "📐", text: "측정 오차" },
        ].map((item, i) => (
          <div key={i} style={{
            background: "rgba(0, 212, 255, 0.1)",
            borderRadius: 15,
            padding: "15px 30px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48 }}>{item.icon}</div>
            <p style={{ color: "white", fontSize: 22, marginTop: 10 }}>{item.text}</p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Parameters
const Scene4Parameters: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const muOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const sigmaOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const visualOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0a1a", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#e040fb",
        textAlign: "center",
        marginBottom: 50,
      }}>
        정규분포의 파라미터
      </h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 60, marginBottom: 50 }}>
        <div style={{
          opacity: muOpacity,
          background: "rgba(255, 107, 53, 0.1)",
          border: "3px solid #ff6b35",
          borderRadius: 20,
          padding: 40,
          textAlign: "center",
          width: 350,
        }}>
          <div style={{ fontSize: 80, color: "#ff6b35", fontFamily: "serif", fontStyle: "italic" }}>
            μ
          </div>
          <h3 style={{ color: "#ff6b35", fontSize: 36, margin: "15px 0" }}>평균 (Mean)</h3>
          <p style={{ color: "#888", fontSize: 24 }}>
            분포의 중심 위치
          </p>
        </div>

        <div style={{
          opacity: sigmaOpacity,
          background: "rgba(0, 212, 255, 0.1)",
          border: "3px solid #00d4ff",
          borderRadius: 20,
          padding: 40,
          textAlign: "center",
          width: 350,
        }}>
          <div style={{ fontSize: 80, color: "#00d4ff", fontFamily: "serif", fontStyle: "italic" }}>
            σ
          </div>
          <h3 style={{ color: "#00d4ff", fontSize: 36, margin: "15px 0" }}>표준편차 (Std)</h3>
          <p style={{ color: "#888", fontSize: 24 }}>
            분포의 퍼진 정도
          </p>
        </div>
      </div>

      <div style={{
        opacity: visualOpacity,
        display: "flex",
        justifyContent: "center",
        gap: 60,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 200,
            height: 100,
            background: "linear-gradient(to top, transparent, #4caf50)",
            borderRadius: "100px 100px 0 0",
            margin: "0 auto",
          }} />
          <p style={{ color: "#4caf50", fontSize: 24, marginTop: 10 }}>σ 작음 → 뾰족</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 350,
            height: 80,
            background: "linear-gradient(to top, transparent, #f44336)",
            borderRadius: "175px 175px 0 0",
            margin: "0 auto",
          }} />
          <p style={{ color: "#f44336", fontSize: 24, marginTop: 10 }}>σ 큼 → 넓게 퍼짐</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: AI Application
const Scene5AI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const card1Opacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const card2Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });
  const card3Opacity = interpolate(frame, [135, 165], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1a0a", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#4caf50",
        textAlign: "center",
        marginBottom: 50,
      }}>
        AI에서의 확률분포
      </h2>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 40,
      }}>
        <div style={{
          opacity: card1Opacity,
          background: "rgba(76, 175, 80, 0.1)",
          border: "2px solid #4caf50",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
          width: 320,
        }}>
          <div style={{ fontSize: 60 }}>⚖️</div>
          <h3 style={{ color: "#4caf50", fontSize: 28, margin: "15px 0" }}>가중치 초기화</h3>
          <p style={{ color: "#888", fontSize: 20 }}>
            정규분포로 무작위지만<br />적절한 범위의 초기값 설정
          </p>
        </div>

        <div style={{
          opacity: card2Opacity,
          background: "rgba(255, 193, 7, 0.1)",
          border: "2px solid #ffc107",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
          width: 320,
        }}>
          <div style={{ fontSize: 60 }}>📢</div>
          <h3 style={{ color: "#ffc107", fontSize: 28, margin: "15px 0" }}>노이즈 추가</h3>
          <p style={{ color: "#888", fontSize: 20 }}>
            데이터 증강, 정규화에<br />정규분포 노이즈 활용
          </p>
        </div>

        <div style={{
          opacity: card3Opacity,
          background: "rgba(224, 64, 251, 0.1)",
          border: "2px solid #e040fb",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
          width: 320,
        }}>
          <div style={{ fontSize: 60 }}>🎨</div>
          <h3 style={{ color: "#e040fb", fontSize: 28, margin: "15px 0" }}>생성 모델</h3>
          <p style={{ color: "#888", fontSize: 20 }}>
            확률분포에서 샘플링해<br />새 이미지/텍스트 생성!
          </p>
        </div>
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
        color: "#4caf50",
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
          { title: "확률분포", desc: "모든 결과의 확률 표현" },
          { title: "정규분포", desc: "종 모양의 흔한 분포" },
          { title: "파라미터", desc: "평균(μ)과 표준편차(σ)" },
        ].map((item, i) => (
          <div key={i} style={{
            background: "rgba(76, 175, 80, 0.1)",
            border: "2px solid #4caf50",
            borderRadius: 15,
            padding: "20px 30px",
            textAlign: "center",
            width: 280,
          }}>
            <h3 style={{ color: "#4caf50", fontSize: 32, margin: "0 0 10px 0" }}>
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
            다음 시간: 통계 기초 - 데이터에서 인사이트 찾기
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

export const Lesson2_7Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
        <Audio src={staticFile("audio/lesson-2-7/scene1_intro.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_distribution.start} durationInFrames={SCENE_TIMINGS.scene2_distribution.duration}>
        <Scene2Distribution />
        <Audio src={staticFile("audio/lesson-2-7/scene2_distribution.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_normal.start} durationInFrames={SCENE_TIMINGS.scene3_normal.duration}>
        <Scene3Normal />
        <Audio src={staticFile("audio/lesson-2-7/scene3_normal.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_parameters.start} durationInFrames={SCENE_TIMINGS.scene4_parameters.duration}>
        <Scene4Parameters />
        <Audio src={staticFile("audio/lesson-2-7/scene4_parameters.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_ai.start} durationInFrames={SCENE_TIMINGS.scene5_ai.duration}>
        <Scene5AI />
        <Audio src={staticFile("audio/lesson-2-7/scene5_ai.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_outro.start} durationInFrames={SCENE_TIMINGS.scene6_outro.duration}>
        <Scene6Outro />
        <Audio src={staticFile("audio/lesson-2-7/scene6_outro.mp3")} />
      </Sequence>

      <LevelBadge level="2-7" title="확률분포" />
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
