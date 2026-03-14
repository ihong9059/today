import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

// Scene timings from audio analysis
const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 726 },
  scene02_problem: { start: 726, duration: 948 },
  scene03_idea: { start: 1674, duration: 1019 },
  scene04_batch_vs_layer: { start: 2693, duration: 1155 },
  scene05_formula: { start: 3848, duration: 1049 },
  scene06_gamma_beta: { start: 4897, duration: 981 },
  scene07_example: { start: 5878, duration: 1390 },
  scene08_where: { start: 7268, duration: 1056 },
  scene09_pre_post: { start: 8324, duration: 963 },
  scene10_benefit: { start: 9287, duration: 1020 },
  scene11_code: { start: 10307, duration: 994 },
  scene12_outro: { start: 11301, duration: 1128 },
};

export const LESSON_7_4_DURATION = 12429;

// Colors
const PURPLE = "#8b5cf6";
const PURPLE_DARK = "#7c3aed";
const BG_DARK = "#0f0a1f";
const TEXT_PRIMARY = "#ffffff";
const TEXT_SECONDARY = "#a78bfa";
const ACCENT_YELLOW = "#fbbf24";
const ACCENT_GREEN = "#22c55e";
const ACCENT_RED = "#ef4444";
const ACCENT_BLUE = "#3b82f6";
const ACCENT_PINK = "#ec4899";

// Animation helpers
const fadeIn = (frame: number, delay = 0, duration = 20) => {
  return interpolate(frame - delay, [0, duration], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
};

const slideUp = (frame: number, delay = 0, duration = 20) => {
  const progress = interpolate(frame - delay, [0, duration], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  return interpolate(progress, [0, 1], [30, 0]);
};

const scaleIn = (frame: number, fps: number, delay = 0) => {
  return spring({ frame: frame - delay, fps, config: { damping: 12 } });
};

// GlobalOverlay Component
const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOpacity = fadeIn(frame, 0);

  return (
    <>
      {/* Top-left UTTEC-Lab logo */}
      <div style={{
        position: "absolute",
        top: 30,
        left: 40,
        zIndex: 1000,
        opacity: logoOpacity,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE_DARK} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
        }}>
          <span style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>U</span>
        </div>
        <span style={{
          fontSize: 22,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          UTTEC-Lab
        </span>
      </div>

      {/* Bottom center education URL */}
      <div style={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        opacity: logoOpacity,
      }}>
        <div style={{
          background: "rgba(139, 92, 246, 0.2)",
          backdropFilter: "blur(10px)",
          padding: "10px 30px",
          borderRadius: 25,
          border: "1px solid rgba(139, 92, 246, 0.3)",
        }}>
          <span style={{
            fontSize: 18,
            color: TEXT_SECONDARY,
            fontWeight: 500,
          }}>
            http://uttec-ai.duckdns.org
          </span>
        </div>
      </div>
    </>
  );
};

// Scene 1: Intro
const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}>
        {/* Title with LayerNorm text */}
        <div style={{
          opacity: fadeIn(frame, 10),
          transform: `translateY(${slideUp(frame, 10)}px)`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 80,
            fontWeight: "bold",
            color: TEXT_PRIMARY,
            marginBottom: 20,
          }}>
            Lesson 7-4
          </div>
          <div style={{
            fontSize: 70,
            fontWeight: "bold",
            background: `linear-gradient(90deg, ${PURPLE} 0%, ${ACCENT_PINK} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Layer Normalization
          </div>
        </div>

        {/* Visualization: Normalize effect */}
        <div style={{
          marginTop: 60,
          display: "flex",
          gap: 20,
          opacity: fadeIn(frame, 40),
        }}>
          {/* Before normalization */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, color: TEXT_SECONDARY, marginBottom: 15 }}>Before</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[120, 30, 200, 5, 80].map((h, i) => (
                <div key={i} style={{
                  width: 30,
                  height: h * 0.6,
                  background: ACCENT_RED,
                  borderRadius: 4,
                  transform: `scaleY(${scaleIn(frame, fps, 50 + i * 5)})`,
                  transformOrigin: "bottom",
                }} />
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div style={{
            display: "flex",
            alignItems: "center",
            opacity: fadeIn(frame, 80),
          }}>
            <span style={{ fontSize: 40, color: ACCENT_YELLOW }}>→</span>
          </div>

          {/* After normalization */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, color: TEXT_SECONDARY, marginBottom: 15 }}>After</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[70, 60, 80, 55, 75].map((h, i) => (
                <div key={i} style={{
                  width: 30,
                  height: h,
                  background: ACCENT_GREEN,
                  borderRadius: 4,
                  transform: `scaleY(${scaleIn(frame, fps, 90 + i * 5)})`,
                  transformOrigin: "bottom",
                }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 50,
          fontSize: 30,
          color: TEXT_SECONDARY,
          opacity: fadeIn(frame, 110),
        }}>
          학습을 안정화하는 핵심 기법
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Problem
const Scene02Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
        height: "100%",
      }}>
        <div style={{
          fontSize: 50,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
          marginBottom: 40,
          opacity: fadeIn(frame, 5),
        }}>
          Internal Covariate Shift
        </div>

        {/* Deep network visualization */}
        <div style={{
          display: "flex",
          gap: 30,
          alignItems: "center",
          opacity: fadeIn(frame, 30),
        }}>
          {/* Layers with unstable outputs */}
          {[1, 2, 3, 4, 5].map((layer, i) => {
            const fluctuation = Math.sin(frame * 0.1 + i * 2) * 20;
            return (
              <div key={i} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `scale(${scaleIn(frame, fps, 40 + i * 10)})`,
              }}>
                <div style={{
                  width: 80,
                  height: 80 + fluctuation,
                  background: `linear-gradient(180deg, ${PURPLE} 0%, ${PURPLE_DARK} 100%)`,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
                }}>
                  <span style={{ color: "white", fontWeight: "bold" }}>L{layer}</span>
                </div>
                {/* Output values fluctuating */}
                <div style={{
                  marginTop: 10,
                  fontSize: 18,
                  color: ACCENT_RED,
                  fontWeight: "bold",
                }}>
                  {(10 + i * 30 + fluctuation).toFixed(0)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Problem description */}
        <div style={{
          marginTop: 50,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          opacity: fadeIn(frame, 90),
        }}>
          <div style={{
            fontSize: 28,
            color: TEXT_PRIMARY,
            textAlign: "center",
          }}>
            레이어가 깊어질수록 값의 분포가 <span style={{ color: ACCENT_RED }}>불안정</span>해짐
          </div>
          <div style={{
            display: "flex",
            gap: 40,
            justifyContent: "center",
            marginTop: 20,
          }}>
            <div style={{
              padding: "15px 25px",
              background: "rgba(239, 68, 68, 0.2)",
              borderRadius: 10,
              border: "1px solid rgba(239, 68, 68, 0.4)",
            }}>
              <span style={{ color: ACCENT_RED, fontSize: 22 }}>학습 속도 저하</span>
            </div>
            <div style={{
              padding: "15px 25px",
              background: "rgba(239, 68, 68, 0.2)",
              borderRadius: 10,
              border: "1px solid rgba(239, 68, 68, 0.4)",
            }}>
              <span style={{ color: ACCENT_RED, fontSize: 22 }}>학습 실패 가능</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Idea
const Scene03Idea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
        height: "100%",
      }}>
        <div style={{
          fontSize: 50,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
          marginBottom: 40,
          opacity: fadeIn(frame, 5),
        }}>
          해결: 정규화 (Normalization)
        </div>

        {/* Before -> After visualization */}
        <div style={{
          display: "flex",
          gap: 80,
          alignItems: "center",
          marginTop: 30,
        }}>
          {/* Before */}
          <div style={{
            textAlign: "center",
            opacity: fadeIn(frame, 20),
          }}>
            <div style={{ fontSize: 24, color: TEXT_SECONDARY, marginBottom: 20 }}>원래 값들</div>
            <div style={{ display: "flex", gap: 15, justifyContent: "center" }}>
              {[100, 5, 200, 50, 150].map((val, i) => (
                <div key={i} style={{
                  padding: "15px 20px",
                  background: ACCENT_RED,
                  borderRadius: 8,
                  transform: `scale(${scaleIn(frame, fps, 30 + i * 8)})`,
                }}>
                  <span style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div style={{
          fontSize: 60,
          color: ACCENT_YELLOW,
          margin: "30px 0",
          opacity: fadeIn(frame, 70),
        }}>
          ↓
        </div>

        {/* After */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: fadeIn(frame, 80),
        }}>
          <div style={{ fontSize: 24, color: TEXT_SECONDARY, marginBottom: 20 }}>정규화 후</div>
          <div style={{
            display: "flex",
            gap: 15,
            justifyContent: "center",
          }}>
            {[0.8, -1.2, 1.5, -0.3, 1.0].map((val, i) => (
              <div key={i} style={{
                padding: "15px 20px",
                background: ACCENT_GREEN,
                borderRadius: 8,
                transform: `scale(${scaleIn(frame, fps, 90 + i * 8)})`,
              }}>
                <span style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 20,
            fontSize: 26,
            color: TEXT_PRIMARY,
          }}>
            평균 = <span style={{ color: ACCENT_YELLOW }}>0</span>, 분산 = <span style={{ color: ACCENT_YELLOW }}>1</span>
          </div>
        </div>

        {/* Normalization types */}
        <div style={{
          marginTop: 40,
          display: "flex",
          gap: 30,
          opacity: fadeIn(frame, 120),
        }}>
          {[
            { name: "Batch Norm", highlight: false },
            { name: "Layer Norm", highlight: true },
            { name: "Instance Norm", highlight: false },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "15px 25px",
              background: item.highlight ? PURPLE : "rgba(139, 92, 246, 0.2)",
              borderRadius: 10,
              border: item.highlight ? "2px solid " + ACCENT_YELLOW : "1px solid rgba(139, 92, 246, 0.4)",
            }}>
              <span style={{ color: "white", fontSize: 22, fontWeight: item.highlight ? "bold" : "normal" }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Batch vs Layer
const Scene04BatchVsLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
        height: "100%",
      }}>
        <div style={{
          fontSize: 48,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
          marginBottom: 50,
          opacity: fadeIn(frame, 5),
        }}>
          BatchNorm vs LayerNorm
        </div>

        <div style={{
          display: "flex",
          gap: 80,
          alignItems: "flex-start",
        }}>
          {/* Batch Norm */}
          <div style={{
            textAlign: "center",
            opacity: fadeIn(frame, 20),
          }}>
            <div style={{ fontSize: 28, color: ACCENT_RED, marginBottom: 20, fontWeight: "bold" }}>
              Batch Normalization
            </div>
            {/* Grid showing batch-wise normalization */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}>
              {[0, 1, 2].map((row) => (
                <div key={row} style={{ display: "flex", gap: 8 }}>
                  {[0, 1, 2, 3].map((col) => (
                    <div key={col} style={{
                      width: 50,
                      height: 50,
                      background: col === 0 ? ACCENT_RED : "rgba(239, 68, 68, 0.3)",
                      borderRadius: 6,
                      transform: `scale(${scaleIn(frame, fps, 30 + row * 10 + col * 5)})`,
                      border: col === 0 ? "2px solid " + ACCENT_YELLOW : "none",
                    }} />
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 15, fontSize: 18, color: TEXT_SECONDARY }}>
              배치 전체 (같은 feature)
            </div>
            {/* Cons */}
            <div style={{
              marginTop: 20,
              padding: "10px 15px",
              background: "rgba(239, 68, 68, 0.15)",
              borderRadius: 8,
              opacity: fadeIn(frame, 80),
            }}>
              <div style={{ color: ACCENT_RED, fontSize: 16 }}>배치 크기에 의존</div>
              <div style={{ color: ACCENT_RED, fontSize: 16 }}>순차 데이터에 약함</div>
            </div>
          </div>

          {/* VS */}
          <div style={{
            fontSize: 40,
            color: ACCENT_YELLOW,
            fontWeight: "bold",
            marginTop: 80,
            opacity: fadeIn(frame, 50),
          }}>
            VS
          </div>

          {/* Layer Norm */}
          <div style={{
            textAlign: "center",
            opacity: fadeIn(frame, 40),
          }}>
            <div style={{ fontSize: 28, color: ACCENT_GREEN, marginBottom: 20, fontWeight: "bold" }}>
              Layer Normalization
            </div>
            {/* Grid showing layer-wise normalization */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}>
              {[0, 1, 2].map((row) => (
                <div key={row} style={{ display: "flex", gap: 8 }}>
                  {[0, 1, 2, 3].map((col) => (
                    <div key={col} style={{
                      width: 50,
                      height: 50,
                      background: row === 0 ? ACCENT_GREEN : "rgba(34, 197, 94, 0.3)",
                      borderRadius: 6,
                      transform: `scale(${scaleIn(frame, fps, 50 + row * 10 + col * 5)})`,
                      border: row === 0 ? "2px solid " + ACCENT_YELLOW : "none",
                    }} />
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 15, fontSize: 18, color: TEXT_SECONDARY }}>
              한 샘플 내 (모든 features)
            </div>
            {/* Pros */}
            <div style={{
              marginTop: 20,
              padding: "10px 15px",
              background: "rgba(34, 197, 94, 0.15)",
              borderRadius: 8,
              opacity: fadeIn(frame, 100),
            }}>
              <div style={{ color: ACCENT_GREEN, fontSize: 16 }}>배치 크기 무관</div>
              <div style={{ color: ACCENT_GREEN, fontSize: 16 }}>트랜스포머에 적합!</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Formula
const Scene05Formula: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
        height: "100%",
      }}>
        <div style={{
          fontSize: 50,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
          marginBottom: 40,
          opacity: fadeIn(frame, 5),
        }}>
          LayerNorm 수식
        </div>

        {/* Step 1: Mean */}
        <div style={{
          marginBottom: 30,
          opacity: fadeIn(frame, 20),
          textAlign: "center",
        }}>
          <div style={{ fontSize: 24, color: TEXT_SECONDARY, marginBottom: 15 }}>1. 평균 계산</div>
          <div style={{
            padding: "20px 40px",
            background: "rgba(139, 92, 246, 0.2)",
            borderRadius: 15,
            border: "1px solid rgba(139, 92, 246, 0.4)",
          }}>
            <span style={{ fontSize: 40, color: TEXT_PRIMARY, fontFamily: "monospace" }}>
              <span style={{ color: ACCENT_YELLOW }}>μ</span> = (1/n) Σ x<sub>i</sub>
            </span>
          </div>
        </div>

        {/* Step 2: Variance */}
        <div style={{
          marginBottom: 30,
          opacity: fadeIn(frame, 50),
          textAlign: "center",
        }}>
          <div style={{ fontSize: 24, color: TEXT_SECONDARY, marginBottom: 15 }}>2. 분산 계산</div>
          <div style={{
            padding: "20px 40px",
            background: "rgba(139, 92, 246, 0.2)",
            borderRadius: 15,
            border: "1px solid rgba(139, 92, 246, 0.4)",
          }}>
            <span style={{ fontSize: 40, color: TEXT_PRIMARY, fontFamily: "monospace" }}>
              <span style={{ color: ACCENT_PINK }}>σ²</span> = (1/n) Σ (x<sub>i</sub> - μ)²
            </span>
          </div>
        </div>

        {/* Step 3: Normalize */}
        <div style={{
          marginBottom: 30,
          opacity: fadeIn(frame, 80),
          textAlign: "center",
        }}>
          <div style={{ fontSize: 24, color: TEXT_SECONDARY, marginBottom: 15 }}>3. 정규화</div>
          <div style={{
            padding: "20px 40px",
            background: "rgba(34, 197, 94, 0.2)",
            borderRadius: 15,
            border: "1px solid rgba(34, 197, 94, 0.4)",
          }}>
            <span style={{ fontSize: 40, color: TEXT_PRIMARY, fontFamily: "monospace" }}>
              <span style={{ color: ACCENT_GREEN }}>x̂</span> = (x - μ) / √(σ² + <span style={{ color: ACCENT_BLUE }}>ε</span>)
            </span>
          </div>
        </div>

        {/* Epsilon note */}
        <div style={{
          marginTop: 20,
          opacity: fadeIn(frame, 110),
          fontSize: 22,
          color: TEXT_SECONDARY,
        }}>
          <span style={{ color: ACCENT_BLUE }}>ε</span> = 작은 값 (0으로 나누기 방지)
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Gamma Beta
const Scene06GammaBeta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
        height: "100%",
      }}>
        <div style={{
          fontSize: 50,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
          marginBottom: 30,
          opacity: fadeIn(frame, 5),
        }}>
          학습 파라미터: γ, β
        </div>

        {/* Why needed */}
        <div style={{
          fontSize: 24,
          color: TEXT_SECONDARY,
          marginBottom: 30,
          opacity: fadeIn(frame, 15),
        }}>
          정규화만으로는 표현력이 제한됨 → 학습 가능한 파라미터 추가!
        </div>

        {/* Final formula */}
        <div style={{
          padding: "30px 60px",
          background: "rgba(139, 92, 246, 0.2)",
          borderRadius: 20,
          border: "2px solid " + PURPLE,
          marginBottom: 40,
          opacity: fadeIn(frame, 30),
        }}>
          <span style={{ fontSize: 50, color: TEXT_PRIMARY, fontFamily: "monospace" }}>
            y = <span style={{ color: ACCENT_YELLOW }}>γ</span> · x̂ + <span style={{ color: ACCENT_PINK }}>β</span>
          </span>
        </div>

        {/* Gamma and Beta explanation */}
        <div style={{
          display: "flex",
          gap: 60,
          marginTop: 20,
        }}>
          {/* Gamma */}
          <div style={{
            textAlign: "center",
            opacity: fadeIn(frame, 50),
            transform: `scale(${scaleIn(frame, fps, 50)})`,
          }}>
            <div style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${ACCENT_YELLOW} 0%, #f59e0b 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              boxShadow: "0 4px 20px rgba(251, 191, 36, 0.4)",
            }}>
              <span style={{ fontSize: 60, fontWeight: "bold", color: "white" }}>γ</span>
            </div>
            <div style={{ fontSize: 26, color: ACCENT_YELLOW, fontWeight: "bold" }}>Scale</div>
            <div style={{ fontSize: 20, color: TEXT_SECONDARY }}>스케일 조절</div>
          </div>

          {/* Beta */}
          <div style={{
            textAlign: "center",
            opacity: fadeIn(frame, 70),
            transform: `scale(${scaleIn(frame, fps, 70)})`,
          }}>
            <div style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${ACCENT_PINK} 0%, #db2777 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              boxShadow: "0 4px 20px rgba(236, 72, 153, 0.4)",
            }}>
              <span style={{ fontSize: 60, fontWeight: "bold", color: "white" }}>β</span>
            </div>
            <div style={{ fontSize: 26, color: ACCENT_PINK, fontWeight: "bold" }}>Shift</div>
            <div style={{ fontSize: 20, color: TEXT_SECONDARY }}>이동(bias)</div>
          </div>
        </div>

        <div style={{
          marginTop: 40,
          fontSize: 24,
          color: ACCENT_GREEN,
          opacity: fadeIn(frame, 90),
        }}>
          학습 과정에서 모델이 최적값을 찾음!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Example
const Scene07Example: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const original = [10, 20, 30, 40];
  const mean = 25;
  const centered = [-15, -5, 5, 15];
  const variance = 125;
  const stdDev = Math.sqrt(variance);
  const normalized = centered.map(v => (v / stdDev).toFixed(2));

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 50,
        height: "100%",
      }}>
        <div style={{
          fontSize: 46,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
          marginBottom: 30,
          opacity: fadeIn(frame, 5),
        }}>
          예시: LayerNorm 계산
        </div>

        {/* Original vector */}
        <div style={{
          marginBottom: 25,
          opacity: fadeIn(frame, 15),
        }}>
          <div style={{ fontSize: 22, color: TEXT_SECONDARY, marginBottom: 10 }}>입력 벡터</div>
          <div style={{ display: "flex", gap: 15 }}>
            {original.map((v, i) => (
              <div key={i} style={{
                width: 70,
                height: 70,
                background: PURPLE,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${scaleIn(frame, fps, 20 + i * 5)})`,
              }}>
                <span style={{ fontSize: 28, color: "white", fontWeight: "bold" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mean calculation */}
        <div style={{
          marginBottom: 25,
          opacity: fadeIn(frame, 40),
          textAlign: "center",
        }}>
          <div style={{
            padding: "10px 25px",
            background: "rgba(251, 191, 36, 0.2)",
            borderRadius: 10,
            display: "inline-block",
          }}>
            <span style={{ fontSize: 24, color: ACCENT_YELLOW }}>
              μ = (10+20+30+40) / 4 = <strong>{mean}</strong>
            </span>
          </div>
        </div>

        {/* Centered values */}
        <div style={{
          marginBottom: 25,
          opacity: fadeIn(frame, 60),
        }}>
          <div style={{ fontSize: 22, color: TEXT_SECONDARY, marginBottom: 10 }}>x - μ</div>
          <div style={{ display: "flex", gap: 15 }}>
            {centered.map((v, i) => (
              <div key={i} style={{
                width: 70,
                height: 70,
                background: ACCENT_BLUE,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${scaleIn(frame, fps, 70 + i * 5)})`,
              }}>
                <span style={{ fontSize: 26, color: "white", fontWeight: "bold" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Variance */}
        <div style={{
          marginBottom: 25,
          opacity: fadeIn(frame, 90),
          textAlign: "center",
        }}>
          <div style={{
            padding: "10px 25px",
            background: "rgba(236, 72, 153, 0.2)",
            borderRadius: 10,
            display: "inline-block",
          }}>
            <span style={{ fontSize: 24, color: ACCENT_PINK }}>
              σ² = {variance}, √σ² ≈ 11.18
            </span>
          </div>
        </div>

        {/* Normalized values */}
        <div style={{
          opacity: fadeIn(frame, 110),
        }}>
          <div style={{ fontSize: 22, color: TEXT_SECONDARY, marginBottom: 10 }}>정규화 결과</div>
          <div style={{ display: "flex", gap: 15 }}>
            {normalized.map((v, i) => (
              <div key={i} style={{
                width: 80,
                height: 70,
                background: ACCENT_GREEN,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${scaleIn(frame, fps, 120 + i * 5)})`,
              }}>
                <span style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 25,
          fontSize: 24,
          color: ACCENT_YELLOW,
          opacity: fadeIn(frame, 140),
        }}>
          평균 = 0, 분산 = 1 달성!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 8: Where
const Scene08Where: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
        height: "100%",
      }}>
        <div style={{
          fontSize: 48,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
          marginBottom: 40,
          opacity: fadeIn(frame, 5),
        }}>
          트랜스포머에서 LayerNorm 위치
        </div>

        {/* Transformer block diagram */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
          opacity: fadeIn(frame, 20),
        }}>
          {/* Input */}
          <div style={{
            padding: "15px 40px",
            background: "rgba(139, 92, 246, 0.3)",
            borderRadius: 10,
            transform: `scale(${scaleIn(frame, fps, 25)})`,
          }}>
            <span style={{ fontSize: 24, color: TEXT_PRIMARY }}>Input</span>
          </div>

          <span style={{ fontSize: 30, color: TEXT_SECONDARY }}>↓</span>

          {/* Multi-Head Attention */}
          <div style={{
            padding: "20px 50px",
            background: ACCENT_BLUE,
            borderRadius: 15,
            transform: `scale(${scaleIn(frame, fps, 35)})`,
          }}>
            <span style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>Multi-Head Attention</span>
          </div>

          <span style={{ fontSize: 30, color: TEXT_SECONDARY }}>↓</span>

          {/* Add & Norm 1 */}
          <div style={{
            padding: "15px 40px",
            background: ACCENT_GREEN,
            borderRadius: 10,
            border: "3px solid " + ACCENT_YELLOW,
            transform: `scale(${scaleIn(frame, fps, 45)})`,
          }}>
            <span style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>Add & LayerNorm</span>
          </div>

          <span style={{ fontSize: 30, color: TEXT_SECONDARY }}>↓</span>

          {/* FFN */}
          <div style={{
            padding: "20px 50px",
            background: ACCENT_PINK,
            borderRadius: 15,
            transform: `scale(${scaleIn(frame, fps, 55)})`,
          }}>
            <span style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>Feed Forward Network</span>
          </div>

          <span style={{ fontSize: 30, color: TEXT_SECONDARY }}>↓</span>

          {/* Add & Norm 2 */}
          <div style={{
            padding: "15px 40px",
            background: ACCENT_GREEN,
            borderRadius: 10,
            border: "3px solid " + ACCENT_YELLOW,
            transform: `scale(${scaleIn(frame, fps, 65)})`,
          }}>
            <span style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>Add & LayerNorm</span>
          </div>
        </div>

        {/* Note */}
        <div style={{
          marginTop: 30,
          fontSize: 22,
          color: TEXT_SECONDARY,
          opacity: fadeIn(frame, 80),
        }}>
          잔차 연결(Add) 후 LayerNorm 적용!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 9: Pre vs Post Norm
const Scene09PrePost: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
        height: "100%",
      }}>
        <div style={{
          fontSize: 48,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
          marginBottom: 50,
          opacity: fadeIn(frame, 5),
        }}>
          Pre-Norm vs Post-Norm
        </div>

        <div style={{
          display: "flex",
          gap: 100,
          alignItems: "flex-start",
        }}>
          {/* Post-Norm (original) */}
          <div style={{
            textAlign: "center",
            opacity: fadeIn(frame, 20),
          }}>
            <div style={{ fontSize: 28, color: ACCENT_BLUE, marginBottom: 25, fontWeight: "bold" }}>
              Post-Norm (원래)
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}>
              <div style={{
                padding: "12px 30px",
                background: "rgba(59, 130, 246, 0.3)",
                borderRadius: 8,
                transform: `scale(${scaleIn(frame, fps, 30)})`,
              }}>
                <span style={{ color: TEXT_PRIMARY }}>Input</span>
              </div>
              <span style={{ color: TEXT_SECONDARY }}>↓</span>
              <div style={{
                padding: "12px 30px",
                background: ACCENT_BLUE,
                borderRadius: 8,
                transform: `scale(${scaleIn(frame, fps, 40)})`,
              }}>
                <span style={{ color: "white" }}>SubLayer</span>
              </div>
              <span style={{ color: TEXT_SECONDARY }}>↓</span>
              <div style={{
                padding: "12px 30px",
                background: ACCENT_YELLOW,
                borderRadius: 8,
                transform: `scale(${scaleIn(frame, fps, 50)})`,
              }}>
                <span style={{ color: BG_DARK, fontWeight: "bold" }}>Add</span>
              </div>
              <span style={{ color: TEXT_SECONDARY }}>↓</span>
              <div style={{
                padding: "12px 30px",
                background: ACCENT_GREEN,
                borderRadius: 8,
                transform: `scale(${scaleIn(frame, fps, 60)})`,
              }}>
                <span style={{ color: "white", fontWeight: "bold" }}>LayerNorm</span>
              </div>
            </div>
          </div>

          {/* Pre-Norm (modern) */}
          <div style={{
            textAlign: "center",
            opacity: fadeIn(frame, 40),
          }}>
            <div style={{ fontSize: 28, color: ACCENT_GREEN, marginBottom: 25, fontWeight: "bold" }}>
              Pre-Norm (최신) ★
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}>
              <div style={{
                padding: "12px 30px",
                background: "rgba(34, 197, 94, 0.3)",
                borderRadius: 8,
                transform: `scale(${scaleIn(frame, fps, 50)})`,
              }}>
                <span style={{ color: TEXT_PRIMARY }}>Input</span>
              </div>
              <span style={{ color: TEXT_SECONDARY }}>↓</span>
              <div style={{
                padding: "12px 30px",
                background: ACCENT_GREEN,
                borderRadius: 8,
                border: "2px solid " + ACCENT_YELLOW,
                transform: `scale(${scaleIn(frame, fps, 60)})`,
              }}>
                <span style={{ color: "white", fontWeight: "bold" }}>LayerNorm</span>
              </div>
              <span style={{ color: TEXT_SECONDARY }}>↓</span>
              <div style={{
                padding: "12px 30px",
                background: ACCENT_BLUE,
                borderRadius: 8,
                transform: `scale(${scaleIn(frame, fps, 70)})`,
              }}>
                <span style={{ color: "white" }}>SubLayer</span>
              </div>
              <span style={{ color: TEXT_SECONDARY }}>↓</span>
              <div style={{
                padding: "12px 30px",
                background: ACCENT_YELLOW,
                borderRadius: 8,
                transform: `scale(${scaleIn(frame, fps, 80)})`,
              }}>
                <span style={{ color: BG_DARK, fontWeight: "bold" }}>Add</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits of Pre-Norm */}
        <div style={{
          marginTop: 40,
          display: "flex",
          gap: 30,
          opacity: fadeIn(frame, 100),
        }}>
          <div style={{
            padding: "12px 20px",
            background: "rgba(34, 197, 94, 0.2)",
            borderRadius: 10,
            border: "1px solid " + ACCENT_GREEN,
          }}>
            <span style={{ color: ACCENT_GREEN }}>더 안정적인 학습</span>
          </div>
          <div style={{
            padding: "12px 20px",
            background: "rgba(34, 197, 94, 0.2)",
            borderRadius: 10,
            border: "1px solid " + ACCENT_GREEN,
          }}>
            <span style={{ color: ACCENT_GREEN }}>깊은 모델에 적합</span>
          </div>
          <div style={{
            padding: "12px 20px",
            background: "rgba(34, 197, 94, 0.2)",
            borderRadius: 10,
            border: "1px solid " + ACCENT_GREEN,
          }}>
            <span style={{ color: ACCENT_GREEN }}>GPT 등 최신 모델 사용</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 10: Benefits
const Scene10Benefit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const benefits = [
    { icon: "✓", title: "학습 안정화", desc: "그래디언트가 안정적" },
    { icon: "⚡", title: "빠른 학습", desc: "높은 학습률 가능" },
    { icon: "📦", title: "배치 무관", desc: "작은 배치도 OK" },
    { icon: "📝", title: "순차 데이터", desc: "NLP에 최적화" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
        height: "100%",
      }}>
        <div style={{
          fontSize: 50,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
          marginBottom: 50,
          opacity: fadeIn(frame, 5),
        }}>
          LayerNorm의 장점
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 40,
        }}>
          {benefits.map((benefit, i) => (
            <div key={i} style={{
              padding: "35px 50px",
              background: "rgba(139, 92, 246, 0.15)",
              borderRadius: 20,
              border: "1px solid rgba(139, 92, 246, 0.3)",
              textAlign: "center",
              transform: `scale(${scaleIn(frame, fps, 20 + i * 15)})`,
              opacity: fadeIn(frame, 20 + i * 15),
            }}>
              <div style={{ fontSize: 50, marginBottom: 15 }}>{benefit.icon}</div>
              <div style={{ fontSize: 28, color: ACCENT_YELLOW, fontWeight: "bold", marginBottom: 10 }}>
                {benefit.title}
              </div>
              <div style={{ fontSize: 20, color: TEXT_SECONDARY }}>
                {benefit.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 11: Code
const Scene11Code: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
        height: "100%",
      }}>
        <div style={{
          fontSize: 50,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
          marginBottom: 40,
          opacity: fadeIn(frame, 5),
        }}>
          PyTorch 코드
        </div>

        {/* Code block */}
        <div style={{
          padding: "40px 60px",
          background: "#1e1e2e",
          borderRadius: 20,
          border: "1px solid rgba(139, 92, 246, 0.3)",
          opacity: fadeIn(frame, 20),
        }}>
          <pre style={{
            fontSize: 28,
            lineHeight: 1.8,
            margin: 0,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            <span style={{ color: "#569cd6" }}>import</span>
            <span style={{ color: TEXT_PRIMARY }}> torch.nn </span>
            <span style={{ color: "#569cd6" }}>as</span>
            <span style={{ color: TEXT_PRIMARY }}> nn</span>
            {"\n\n"}
            <span style={{ color: "#6a9955" }}># LayerNorm 생성</span>
            {"\n"}
            <span style={{ color: TEXT_PRIMARY }}>layer_norm = nn.</span>
            <span style={{ color: ACCENT_YELLOW }}>LayerNorm</span>
            <span style={{ color: TEXT_PRIMARY }}>(</span>
            <span style={{ color: ACCENT_PINK }}>512</span>
            <span style={{ color: TEXT_PRIMARY }}>)</span>
            {"\n\n"}
            <span style={{ color: "#6a9955" }}># 512차원 임베딩에 적용</span>
            {"\n"}
            <span style={{ color: TEXT_PRIMARY }}>output = </span>
            <span style={{ color: ACCENT_GREEN }}>layer_norm</span>
            <span style={{ color: TEXT_PRIMARY }}>(embedding)</span>
          </pre>
        </div>

        {/* What it does */}
        <div style={{
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          gap: 15,
          opacity: fadeIn(frame, 60),
        }}>
          <div style={{ fontSize: 24, color: TEXT_SECONDARY, textAlign: "center" }}>
            nn.LayerNorm이 자동으로:
          </div>
          <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
            {["평균 계산", "분산 계산", "정규화", "γ, β 적용"].map((step, i) => (
              <div key={i} style={{
                padding: "10px 20px",
                background: "rgba(139, 92, 246, 0.2)",
                borderRadius: 10,
                opacity: fadeIn(frame, 80 + i * 10),
              }}>
                <span style={{ color: ACCENT_YELLOW }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 12: Outro
const Scene12Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summary = [
    { title: "LayerNorm", items: ["한 샘플 내 정규화", "평균 0, 분산 1"] },
    { title: "γ, β", items: ["학습 파라미터", "스케일 & 이동"] },
    { title: "트랜스포머", items: ["Attention/FFN 후 적용", "학습 안정화"] },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
        height: "100%",
      }}>
        <div style={{
          fontSize: 50,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
          marginBottom: 40,
          opacity: fadeIn(frame, 5),
        }}>
          오늘 배운 내용
        </div>

        <div style={{
          display: "flex",
          gap: 40,
          marginBottom: 50,
        }}>
          {summary.map((item, i) => (
            <div key={i} style={{
              padding: "30px 40px",
              background: "rgba(139, 92, 246, 0.15)",
              borderRadius: 20,
              border: "1px solid rgba(139, 92, 246, 0.3)",
              textAlign: "center",
              minWidth: 220,
              transform: `scale(${scaleIn(frame, fps, 20 + i * 15)})`,
            }}>
              <div style={{ fontSize: 28, color: ACCENT_YELLOW, fontWeight: "bold", marginBottom: 15 }}>
                {item.title}
              </div>
              {item.items.map((sub, j) => (
                <div key={j} style={{ fontSize: 20, color: TEXT_SECONDARY, marginTop: 8 }}>
                  {sub}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Next lesson teaser */}
        <div style={{
          padding: "25px 50px",
          background: `linear-gradient(90deg, ${PURPLE} 0%, ${PURPLE_DARK} 100%)`,
          borderRadius: 20,
          opacity: fadeIn(frame, 70),
          marginBottom: 30,
        }}>
          <div style={{ fontSize: 26, color: "white", textAlign: "center" }}>
            다음 레슨: <span style={{ color: ACCENT_YELLOW, fontWeight: "bold" }}>잔차 연결 (Residual Connection)</span>
          </div>
          <div style={{ fontSize: 20, color: TEXT_SECONDARY, textAlign: "center", marginTop: 8 }}>
            스킵 커넥션이라고도 해요!
          </div>
        </div>

        {/* Thank you */}
        <div style={{
          fontSize: 60,
          fontWeight: "bold",
          background: `linear-gradient(90deg, ${ACCENT_YELLOW} 0%, ${ACCENT_PINK} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: fadeIn(frame, 90),
          transform: `scale(${scaleIn(frame, fps, 90)})`,
        }}>
          감사합니다!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main component
export const Lesson7_4Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      {/* Scene 1: Intro */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
        <Audio src={staticFile("audio/lesson-7-4/scene01_intro.mp3")} />
      </Sequence>

      {/* Scene 2: Problem */}
      <Sequence from={SCENE_TIMINGS.scene02_problem.start} durationInFrames={SCENE_TIMINGS.scene02_problem.duration}>
        <Scene02Problem />
        <Audio src={staticFile("audio/lesson-7-4/scene02_problem.mp3")} />
      </Sequence>

      {/* Scene 3: Idea */}
      <Sequence from={SCENE_TIMINGS.scene03_idea.start} durationInFrames={SCENE_TIMINGS.scene03_idea.duration}>
        <Scene03Idea />
        <Audio src={staticFile("audio/lesson-7-4/scene03_idea.mp3")} />
      </Sequence>

      {/* Scene 4: Batch vs Layer */}
      <Sequence from={SCENE_TIMINGS.scene04_batch_vs_layer.start} durationInFrames={SCENE_TIMINGS.scene04_batch_vs_layer.duration}>
        <Scene04BatchVsLayer />
        <Audio src={staticFile("audio/lesson-7-4/scene04_batch_vs_layer.mp3")} />
      </Sequence>

      {/* Scene 5: Formula */}
      <Sequence from={SCENE_TIMINGS.scene05_formula.start} durationInFrames={SCENE_TIMINGS.scene05_formula.duration}>
        <Scene05Formula />
        <Audio src={staticFile("audio/lesson-7-4/scene05_formula.mp3")} />
      </Sequence>

      {/* Scene 6: Gamma Beta */}
      <Sequence from={SCENE_TIMINGS.scene06_gamma_beta.start} durationInFrames={SCENE_TIMINGS.scene06_gamma_beta.duration}>
        <Scene06GammaBeta />
        <Audio src={staticFile("audio/lesson-7-4/scene06_gamma_beta.mp3")} />
      </Sequence>

      {/* Scene 7: Example */}
      <Sequence from={SCENE_TIMINGS.scene07_example.start} durationInFrames={SCENE_TIMINGS.scene07_example.duration}>
        <Scene07Example />
        <Audio src={staticFile("audio/lesson-7-4/scene07_example.mp3")} />
      </Sequence>

      {/* Scene 8: Where */}
      <Sequence from={SCENE_TIMINGS.scene08_where.start} durationInFrames={SCENE_TIMINGS.scene08_where.duration}>
        <Scene08Where />
        <Audio src={staticFile("audio/lesson-7-4/scene08_where.mp3")} />
      </Sequence>

      {/* Scene 9: Pre vs Post */}
      <Sequence from={SCENE_TIMINGS.scene09_pre_post.start} durationInFrames={SCENE_TIMINGS.scene09_pre_post.duration}>
        <Scene09PrePost />
        <Audio src={staticFile("audio/lesson-7-4/scene09_pre_post.mp3")} />
      </Sequence>

      {/* Scene 10: Benefits */}
      <Sequence from={SCENE_TIMINGS.scene10_benefit.start} durationInFrames={SCENE_TIMINGS.scene10_benefit.duration}>
        <Scene10Benefit />
        <Audio src={staticFile("audio/lesson-7-4/scene10_benefit.mp3")} />
      </Sequence>

      {/* Scene 11: Code */}
      <Sequence from={SCENE_TIMINGS.scene11_code.start} durationInFrames={SCENE_TIMINGS.scene11_code.duration}>
        <Scene11Code />
        <Audio src={staticFile("audio/lesson-7-4/scene11_code.mp3")} />
      </Sequence>

      {/* Scene 12: Outro */}
      <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
        <Scene12Outro />
        <Audio src={staticFile("audio/lesson-7-4/scene12_outro.mp3")} />
      </Sequence>

      {/* Global Overlay */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
