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
  scene1_intro: { duration: 648, start: 0 },
  scene2_mean: { duration: 773, start: 648 },
  scene3_correlation: { duration: 823, start: 1421 },
  scene4_metrics: { duration: 779, start: 2244 },
  scene5_loss: { duration: 714, start: 3023 },
  scene6_outro: { duration: 798, start: 3737 },
};

export const LESSON_2_8_DURATION = 4535;

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
    Level 2-8
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
        <h1 style={{ fontSize: 80, color: "#ff6b35", margin: 0, textShadow: "0 0 30px #ff6b35" }}>
          통계 기초
        </h1>
        <p style={{ fontSize: 36, color: "#888", marginTop: 20 }}>
          Level 2-8 | 데이터에서 인사이트 찾기
        </p>
      </div>

      <div style={{
        opacity: subtitleOpacity,
        textAlign: "center",
        marginBottom: 60,
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(255, 107, 53, 0.2)",
          border: "2px solid #ff6b35",
          padding: "25px 50px",
          borderRadius: 20,
        }}>
          <span style={{ fontSize: 32, color: "#ff6b35" }}>
            📊 데이터에서 의미 찾는 방법
          </span>
        </div>
      </div>

      <div style={{
        opacity: topicsOpacity,
        display: "flex",
        justifyContent: "center",
        gap: 40,
      }}>
        {["평균/분산", "상관관계", "AI 평가지표"].map((topic, i) => (
          <div key={i} style={{
            background: "rgba(255, 107, 53, 0.1)",
            border: "2px solid #ff6b35",
            borderRadius: 15,
            padding: "20px 40px",
            color: "#ff6b35",
            fontSize: 28,
          }}>
            {topic}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Mean and Variance
const Scene2Mean: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const meanOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const varianceOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const stdOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a0a", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#ffc107",
        textAlign: "center",
        marginBottom: 50,
      }}>
        평균과 분산
      </h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 40 }}>
        <div style={{
          opacity: meanOpacity,
          background: "rgba(76, 175, 80, 0.1)",
          border: "3px solid #4caf50",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
          width: 400,
        }}>
          <h3 style={{ color: "#4caf50", fontSize: 36, margin: "0 0 15px 0" }}>평균 (Mean)</h3>
          <div style={{ fontSize: 48, fontFamily: "monospace", color: "white", marginBottom: 15 }}>
            μ = Σx / n
          </div>
          <p style={{ color: "#888", fontSize: 22 }}>
            모든 값의 합 ÷ 개수<br />
            데이터의 <span style={{ color: "#4caf50" }}>중심</span>
          </p>
        </div>

        <div style={{
          opacity: varianceOpacity,
          background: "rgba(255, 107, 53, 0.1)",
          border: "3px solid #ff6b35",
          borderRadius: 20,
          padding: 30,
          textAlign: "center",
          width: 400,
        }}>
          <h3 style={{ color: "#ff6b35", fontSize: 36, margin: "0 0 15px 0" }}>분산 (Variance)</h3>
          <div style={{ fontSize: 48, fontFamily: "monospace", color: "white", marginBottom: 15 }}>
            σ² = Σ(x-μ)²/n
          </div>
          <p style={{ color: "#888", fontSize: 22 }}>
            평균에서 얼마나 떨어져 있는지<br />
            데이터의 <span style={{ color: "#ff6b35" }}>퍼짐</span> 정도
          </p>
        </div>
      </div>

      <div style={{
        opacity: stdOpacity,
        textAlign: "center",
        background: "linear-gradient(135deg, #00d4ff, #0099cc)",
        padding: "20px 40px",
        borderRadius: 15,
        display: "inline-block",
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
      }}>
        <span style={{ fontSize: 28, color: "white" }}>
          📐 표준편차 σ = √분산 (원래 단위와 같아 해석 쉬움!)
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Correlation
const Scene3Correlation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const scaleOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const examplesOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const warningOpacity = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1a28", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#00d4ff",
        textAlign: "center",
        marginBottom: 40,
      }}>
        상관관계
      </h2>

      <div style={{
        opacity: scaleOpacity,
        textAlign: "center",
        marginBottom: 40,
      }}>
        <p style={{ fontSize: 28, color: "#888", marginBottom: 20 }}>
          두 변수가 함께 변하는 정도
        </p>
        <div style={{
          display: "inline-block",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: 20,
          padding: "20px 40px",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}>
            <span style={{ fontSize: 48, color: "#f44336", fontWeight: "bold" }}>-1</span>
            <div style={{
              width: 500,
              height: 30,
              background: "linear-gradient(to right, #f44336, #888, #4caf50)",
              borderRadius: 15,
            }} />
            <span style={{ fontSize: 48, color: "#4caf50", fontWeight: "bold" }}>+1</span>
          </div>
        </div>
      </div>

      <div style={{
        opacity: examplesOpacity,
        display: "flex",
        justifyContent: "center",
        gap: 40,
        marginBottom: 40,
      }}>
        <div style={{
          background: "rgba(76, 175, 80, 0.1)",
          borderRadius: 15,
          padding: 25,
          textAlign: "center",
          border: "2px solid #4caf50",
        }}>
          <div style={{ fontSize: 48 }}>📈📈</div>
          <p style={{ color: "#4caf50", fontSize: 24, marginTop: 10 }}>양의 상관</p>
          <p style={{ color: "#888", fontSize: 18 }}>같이 증가</p>
        </div>
        <div style={{
          background: "rgba(136, 136, 136, 0.1)",
          borderRadius: 15,
          padding: 25,
          textAlign: "center",
          border: "2px solid #888",
        }}>
          <div style={{ fontSize: 48 }}>🔀</div>
          <p style={{ color: "#888", fontSize: 24, marginTop: 10 }}>상관 없음</p>
          <p style={{ color: "#888", fontSize: 18 }}>관계 없음</p>
        </div>
        <div style={{
          background: "rgba(244, 67, 54, 0.1)",
          borderRadius: 15,
          padding: 25,
          textAlign: "center",
          border: "2px solid #f44336",
        }}>
          <div style={{ fontSize: 48 }}>📈📉</div>
          <p style={{ color: "#f44336", fontSize: 24, marginTop: 10 }}>음의 상관</p>
          <p style={{ color: "#888", fontSize: 18 }}>반대로 변함</p>
        </div>
      </div>

      <div style={{
        opacity: warningOpacity,
        textAlign: "center",
        background: "linear-gradient(135deg, #f44336, #c62828)",
        padding: "20px 40px",
        borderRadius: 15,
        display: "inline-block",
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
      }}>
        <span style={{ fontSize: 28, color: "white" }}>
          ⚠️ 상관관계 ≠ 인과관계!
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: AI Metrics
const Scene4Metrics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const accuracyOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const precisionOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });
  const f1Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0a1a", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#e040fb",
        textAlign: "center",
        marginBottom: 40,
      }}>
        AI 평가 지표
      </h2>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 30,
        flexWrap: "wrap",
      }}>
        <div style={{
          opacity: accuracyOpacity,
          background: "rgba(76, 175, 80, 0.1)",
          border: "2px solid #4caf50",
          borderRadius: 20,
          padding: 25,
          textAlign: "center",
          width: 280,
        }}>
          <h3 style={{ color: "#4caf50", fontSize: 28, margin: "0 0 15px 0" }}>정확도 (Accuracy)</h3>
          <div style={{ fontSize: 36, fontFamily: "monospace", color: "white" }}>
            맞춘 수 / 전체
          </div>
          <p style={{ color: "#888", fontSize: 18, marginTop: 15 }}>
            가장 기본적인 지표
          </p>
        </div>

        <div style={{
          opacity: precisionOpacity,
          background: "rgba(0, 212, 255, 0.1)",
          border: "2px solid #00d4ff",
          borderRadius: 20,
          padding: 25,
          textAlign: "center",
          width: 280,
        }}>
          <h3 style={{ color: "#00d4ff", fontSize: 28, margin: "0 0 15px 0" }}>정밀도 (Precision)</h3>
          <div style={{ fontSize: 36, fontFamily: "monospace", color: "white" }}>
            TP / (TP+FP)
          </div>
          <p style={{ color: "#888", fontSize: 18, marginTop: 15 }}>
            양성 예측의 정확성
          </p>
        </div>

        <div style={{
          opacity: precisionOpacity,
          background: "rgba(255, 193, 7, 0.1)",
          border: "2px solid #ffc107",
          borderRadius: 20,
          padding: 25,
          textAlign: "center",
          width: 280,
        }}>
          <h3 style={{ color: "#ffc107", fontSize: 28, margin: "0 0 15px 0" }}>재현율 (Recall)</h3>
          <div style={{ fontSize: 36, fontFamily: "monospace", color: "white" }}>
            TP / (TP+FN)
          </div>
          <p style={{ color: "#888", fontSize: 18, marginTop: 15 }}>
            실제 양성 포착률
          </p>
        </div>

        <div style={{
          opacity: f1Opacity,
          background: "rgba(224, 64, 251, 0.1)",
          border: "2px solid #e040fb",
          borderRadius: 20,
          padding: 25,
          textAlign: "center",
          width: 280,
        }}>
          <h3 style={{ color: "#e040fb", fontSize: 28, margin: "0 0 15px 0" }}>F1 점수</h3>
          <div style={{ fontSize: 36, fontFamily: "monospace", color: "white" }}>
            2×P×R/(P+R)
          </div>
          <p style={{ color: "#888", fontSize: 18, marginTop: 15 }}>
            정밀도와 재현율의 조화평균
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Loss Functions
const Scene5Loss: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const conceptOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const mseOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  const ceOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1a0a", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#4caf50",
        textAlign: "center",
        marginBottom: 40,
      }}>
        손실 함수 (Loss Function)
      </h2>

      <div style={{
        opacity: conceptOpacity,
        textAlign: "center",
        marginBottom: 40,
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(76, 175, 80, 0.2)",
          borderRadius: 15,
          padding: "20px 40px",
        }}>
          <span style={{ fontSize: 32, color: "#4caf50" }}>
            🎯 예측이 얼마나 틀렸는지 측정 → 최소화가 목표!
          </span>
        </div>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 60,
      }}>
        <div style={{
          opacity: mseOpacity,
          background: "rgba(0, 212, 255, 0.1)",
          border: "3px solid #00d4ff",
          borderRadius: 20,
          padding: 40,
          textAlign: "center",
          width: 400,
        }}>
          <h3 style={{ color: "#00d4ff", fontSize: 32, margin: "0 0 20px 0" }}>
            MSE (평균 제곱 오차)
          </h3>
          <div style={{
            fontSize: 42,
            fontFamily: "monospace",
            color: "white",
            marginBottom: 20,
          }}>
            Σ(y - ŷ)² / n
          </div>
          <div style={{
            background: "rgba(0, 212, 255, 0.2)",
            borderRadius: 10,
            padding: "10px 20px",
          }}>
            <span style={{ color: "#00d4ff", fontSize: 24 }}>📈 회귀 문제</span>
          </div>
        </div>

        <div style={{
          opacity: ceOpacity,
          background: "rgba(224, 64, 251, 0.1)",
          border: "3px solid #e040fb",
          borderRadius: 20,
          padding: 40,
          textAlign: "center",
          width: 400,
        }}>
          <h3 style={{ color: "#e040fb", fontSize: 32, margin: "0 0 20px 0" }}>
            Cross Entropy
          </h3>
          <div style={{
            fontSize: 42,
            fontFamily: "monospace",
            color: "white",
            marginBottom: 20,
          }}>
            -Σy·log(ŷ)
          </div>
          <div style={{
            background: "rgba(224, 64, 251, 0.2)",
            borderRadius: 10,
            padding: "10px 20px",
          }}>
            <span style={{ color: "#e040fb", fontSize: 24 }}>🏷️ 분류 문제</span>
          </div>
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
  const levelCompleteOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const endOpacity = interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" });

  const celebrateScale = spring({ frame: frame - 180, fps, config: { damping: 8 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a", padding: 80 }}>
      <h2 style={{
        opacity: titleOpacity,
        fontSize: 64,
        color: "#ff6b35",
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
          { title: "평균/분산", desc: "데이터 특성 파악" },
          { title: "상관관계", desc: "변수 간 관계 분석" },
          { title: "평가 지표", desc: "모델 성능 측정" },
        ].map((item, i) => (
          <div key={i} style={{
            background: "rgba(255, 107, 53, 0.1)",
            border: "2px solid #ff6b35",
            borderRadius: 15,
            padding: "20px 30px",
            textAlign: "center",
            width: 280,
          }}>
            <h3 style={{ color: "#ff6b35", fontSize: 32, margin: "0 0 10px 0" }}>
              {item.title}
            </h3>
            <p style={{ color: "#888", fontSize: 20, margin: 0 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        opacity: levelCompleteOpacity,
        transform: `scale(${celebrateScale})`,
        textAlign: "center",
        marginBottom: 30,
      }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #4caf50, #2e7d32)",
          padding: "30px 60px",
          borderRadius: 20,
          boxShadow: "0 10px 40px rgba(76, 175, 80, 0.4)",
        }}>
          <span style={{ fontSize: 40, color: "white" }}>
            🎉 Level 2 수학 기초 완료!
          </span>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 24, marginTop: 15 }}>
            다음 레벨에서 AI 모델을 직접 만들어봐요!
          </p>
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
          정말 수고하셨습니다! 🏆
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson2_8Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
        <Audio src={staticFile("audio/lesson-2-8/scene1_intro.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2_mean.start} durationInFrames={SCENE_TIMINGS.scene2_mean.duration}>
        <Scene2Mean />
        <Audio src={staticFile("audio/lesson-2-8/scene2_mean.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3_correlation.start} durationInFrames={SCENE_TIMINGS.scene3_correlation.duration}>
        <Scene3Correlation />
        <Audio src={staticFile("audio/lesson-2-8/scene3_correlation.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4_metrics.start} durationInFrames={SCENE_TIMINGS.scene4_metrics.duration}>
        <Scene4Metrics />
        <Audio src={staticFile("audio/lesson-2-8/scene4_metrics.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5_loss.start} durationInFrames={SCENE_TIMINGS.scene5_loss.duration}>
        <Scene5Loss />
        <Audio src={staticFile("audio/lesson-2-8/scene5_loss.mp3")} />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6_outro.start} durationInFrames={SCENE_TIMINGS.scene6_outro.duration}>
        <Scene6Outro />
        <Audio src={staticFile("audio/lesson-2-8/scene6_outro.mp3")} />
      </Sequence>

      <LevelBadge level="2-8" title="통계 기초" />
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
