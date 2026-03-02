/**
 * Scene 3: 편미분 계산하기
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene3_Calculate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const funcAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const xDerivAppear = spring({ frame: frame - 200, fps, config: { damping: 12 } });
  const yDerivAppear = spring({ frame: frame - 500, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-3/scene3.mp3")} />

      {/* 타이틀 */}
      <div style={{
        position: "absolute",
        top: 40,
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
          🧮 편미분 계산하기
        </h1>
      </div>

      {/* 함수 정의 */}
      <div style={{
        position: "absolute",
        top: 120,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: funcAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(59, 130, 246, 0.3)",
          border: "3px solid #3b82f6",
          borderRadius: 15,
          padding: "20px 50px",
          textAlign: "center",
        }}>
          <div style={{ color: "#93c5fd", fontSize: 24, marginBottom: 10 }}>
            예제 함수
          </div>
          <div style={{
            color: colors.white,
            fontSize: 40,
            fontFamily: "monospace",
            fontWeight: "bold",
          }}>
            f(x, y) = x² + 2xy + y²
          </div>
        </div>
      </div>

      {/* x에 대한 편미분 */}
      <div style={{
        position: "absolute",
        top: 260,
        left: 80,
        opacity: xDerivAppear,
        transform: `translateY(${(1 - xDerivAppear) * 30}px)`,
        width: 500,
      }}>
        <div style={{
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          border: "3px solid #22c55e",
          borderRadius: 20,
          padding: 25,
        }}>
          <h3 style={{ color: "#86efac", fontSize: 28, margin: "0 0 20px 0" }}>
            ∂f/∂x (x에 대한 편미분)
          </h3>
          <div style={{ color: "#d1d5db", fontSize: 20, lineHeight: 2 }}>
            <div>y를 <span style={{ color: "#fbbf24" }}>상수</span>로 취급!</div>
            <div style={{ fontFamily: "monospace", marginTop: 10 }}>
              <span style={{ color: "#22c55e" }}>x²</span> → 2x<br />
              <span style={{ color: "#22c55e" }}>2xy</span> → 2y (y는 상수)<br />
              <span style={{ color: "#22c55e" }}>y²</span> → 0 (x 없음)
            </div>
          </div>
          <div style={{
            marginTop: 20,
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: "15px 25px",
            borderRadius: 10,
            textAlign: "center",
          }}>
            <span style={{ color: "#fde047", fontSize: 28, fontFamily: "monospace", fontWeight: "bold" }}>
              ∂f/∂x = 2x + 2y
            </span>
          </div>
        </div>
      </div>

      {/* y에 대한 편미분 */}
      <div style={{
        position: "absolute",
        top: 260,
        right: 80,
        opacity: yDerivAppear,
        transform: `translateX(${(1 - yDerivAppear) * 30}px)`,
        width: 500,
      }}>
        <div style={{
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          border: "3px solid #ef4444",
          borderRadius: 20,
          padding: 25,
        }}>
          <h3 style={{ color: "#fca5a5", fontSize: 28, margin: "0 0 20px 0" }}>
            ∂f/∂y (y에 대한 편미분)
          </h3>
          <div style={{ color: "#d1d5db", fontSize: 20, lineHeight: 2 }}>
            <div>x를 <span style={{ color: "#fbbf24" }}>상수</span>로 취급!</div>
            <div style={{ fontFamily: "monospace", marginTop: 10 }}>
              <span style={{ color: "#ef4444" }}>x²</span> → 0 (y 없음)<br />
              <span style={{ color: "#ef4444" }}>2xy</span> → 2x (x는 상수)<br />
              <span style={{ color: "#ef4444" }}>y²</span> → 2y
            </div>
          </div>
          <div style={{
            marginTop: 20,
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: "15px 25px",
            borderRadius: 10,
            textAlign: "center",
          }}>
            <span style={{ color: "#fde047", fontSize: 28, fontFamily: "monospace", fontWeight: "bold" }}>
              ∂f/∂y = 2x + 2y
            </span>
          </div>
        </div>
      </div>

      {/* 핵심 포인트 */}
      <div style={{
        position: "absolute",
        bottom: 60,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: interpolate(frame, [550, 580], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        <div style={{
          backgroundColor: "rgba(168, 85, 247, 0.3)",
          border: "3px solid #a855f7",
          borderRadius: 15,
          padding: "20px 50px",
          textAlign: "center",
        }}>
          <div style={{ color: "#c4b5fd", fontSize: 26, fontWeight: "bold" }}>
            💡 핵심: 다른 변수를 상수처럼 취급!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
