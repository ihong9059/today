/**
 * Scene 3: 연쇄법칙 공식
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene3_ChainRuleFormula: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const formulaAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const step1Appear = spring({ frame: frame - 200, fps, config: { damping: 12 } });
  const step2Appear = spring({ frame: frame - 350, fps, config: { damping: 12 } });
  const resultAppear = spring({ frame: frame - 500, fps, config: { damping: 12 } });
  const exampleAppear = spring({ frame: frame - 700, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-4/scene3.mp3")} />

      {/* 타이틀 */}
      <div style={{
        position: "absolute",
        top: 35,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: titleOpacity,
      }}>
        <h1 style={{
          fontSize: 50,
          color: colors.white,
          fontWeight: "bold",
          margin: 0,
        }}>
          📐 연쇄법칙 공식
        </h1>
      </div>

      {/* 메인 공식 */}
      <div style={{
        position: "absolute",
        top: 110,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: formulaAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(168, 85, 247, 0.3)",
          border: "4px solid #a855f7",
          borderRadius: 20,
          padding: "25px 60px",
          boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
        }}>
          <div style={{
            color: colors.white,
            fontSize: 55,
            fontFamily: "monospace",
            fontWeight: "bold",
            textAlign: "center",
          }}>
            df/dx = df/du × du/dx
          </div>
        </div>
      </div>

      {/* 계산 과정 */}
      <div style={{
        position: "absolute",
        top: 270,
        left: 100,
        display: "flex",
        gap: 30,
      }}>
        {/* Step 1 */}
        <div style={{
          opacity: step1Appear,
          transform: `translateY(${(1 - step1Appear) * 20}px)`,
        }}>
          <div style={{
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            border: "2px solid #3b82f6",
            borderRadius: 15,
            padding: 25,
            width: 280,
          }}>
            <div style={{ color: "#93c5fd", fontSize: 20, marginBottom: 10 }}>
              f = u² 를 u로 미분
            </div>
            <div style={{
              color: "#22c55e",
              fontSize: 36,
              fontFamily: "monospace",
              textAlign: "center",
            }}>
              df/du = 2u
            </div>
          </div>
        </div>

        {/* 곱하기 */}
        <div style={{
          opacity: step2Appear,
          display: "flex",
          alignItems: "center",
          color: "#fbbf24",
          fontSize: 45,
        }}>
          ×
        </div>

        {/* Step 2 */}
        <div style={{
          opacity: step2Appear,
          transform: `translateY(${(1 - step2Appear) * 20}px)`,
        }}>
          <div style={{
            backgroundColor: "rgba(251, 191, 36, 0.2)",
            border: "2px solid #fbbf24",
            borderRadius: 15,
            padding: 25,
            width: 280,
          }}>
            <div style={{ color: "#fde047", fontSize: 20, marginBottom: 10 }}>
              u = x + 2 를 x로 미분
            </div>
            <div style={{
              color: "#22c55e",
              fontSize: 36,
              fontFamily: "monospace",
              textAlign: "center",
            }}>
              du/dx = 1
            </div>
          </div>
        </div>

        {/* 등호 */}
        <div style={{
          opacity: resultAppear,
          display: "flex",
          alignItems: "center",
          color: "#a855f7",
          fontSize: 45,
        }}>
          =
        </div>

        {/* 결과 */}
        <div style={{
          opacity: resultAppear,
          transform: `scale(${resultAppear})`,
        }}>
          <div style={{
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            border: "3px solid #22c55e",
            borderRadius: 15,
            padding: 25,
            width: 280,
          }}>
            <div style={{ color: "#86efac", fontSize: 20, marginBottom: 10 }}>
              최종 결과
            </div>
            <div style={{
              color: colors.white,
              fontSize: 32,
              fontFamily: "monospace",
              textAlign: "center",
            }}>
              2u × 1 = 2(x+2)
            </div>
          </div>
        </div>
      </div>

      {/* 실제 값 계산 */}
      <div style={{
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: exampleAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          border: "3px solid #ef4444",
          borderRadius: 20,
          padding: 25,
          width: 700,
          textAlign: "center",
        }}>
          <h3 style={{ color: "#fca5a5", fontSize: 24, margin: "0 0 15px 0" }}>
            🎯 x = 3일 때 미분값
          </h3>
          <div style={{
            color: colors.white,
            fontSize: 36,
            fontFamily: "monospace",
          }}>
            df/dx = 2(3 + 2) = 2 × 5 = <span style={{ color: "#22c55e" }}>10</span>
          </div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div style={{
        position: "absolute",
        bottom: 30,
        left: 50,
        color: "#c4b5fd",
        fontSize: 22,
      }}>
        💡 바깥 × 안쪽 = 연쇄적으로 미분을 곱한다!
      </div>
    </AbsoluteFill>
  );
};
