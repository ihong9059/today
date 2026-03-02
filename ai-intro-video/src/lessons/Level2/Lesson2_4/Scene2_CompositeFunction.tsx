/**
 * Scene 2: 합성함수란?
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene2_CompositeFunction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const exampleAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const decomposeAppear = spring({ frame: frame - 200, fps, config: { damping: 12 } });
  const calcAppear = spring({ frame: frame - 400, fps, config: { damping: 12 } });
  const questionAppear = spring({ frame: frame - 600, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-4/scene2.mp3")} />

      {/* 타이틀 */}
      <div style={{
        position: "absolute",
        top: 40,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: titleOpacity,
      }}>
        <h1 style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          margin: 0,
        }}>
          🔗 합성함수란?
        </h1>
      </div>

      {/* 합성함수 예시 */}
      <div style={{
        position: "absolute",
        top: 130,
        left: 80,
        opacity: exampleAppear,
        transform: `translateY(${(1 - exampleAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          border: "3px solid #3b82f6",
          borderRadius: 20,
          padding: 30,
          width: 450,
        }}>
          <h3 style={{ color: "#93c5fd", fontSize: 26, margin: "0 0 20px 0" }}>
            함수 안에 함수!
          </h3>
          <div style={{
            color: colors.white,
            fontSize: 45,
            fontFamily: "monospace",
            textAlign: "center",
            padding: "20px 0",
          }}>
            f(x) = (x + 2)²
          </div>
        </div>
      </div>

      {/* 분해 과정 */}
      <div style={{
        position: "absolute",
        top: 130,
        right: 80,
        opacity: decomposeAppear,
        transform: `translateX(${(1 - decomposeAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          border: "3px solid #22c55e",
          borderRadius: 20,
          padding: 30,
          width: 450,
        }}>
          <h3 style={{ color: "#86efac", fontSize: 26, margin: "0 0 20px 0" }}>
            분해하면...
          </h3>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            fontFamily: "monospace",
            fontSize: 32,
          }}>
            <div style={{ color: "#fbbf24" }}>
              u = x + 2 <span style={{ color: "#d1d5db", fontSize: 20 }}>(안쪽 함수)</span>
            </div>
            <div style={{ color: "#3b82f6" }}>
              f = u² <span style={{ color: "#d1d5db", fontSize: 20 }}>(바깥 함수)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 계산 예시 */}
      <div style={{
        position: "absolute",
        bottom: 200,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: calcAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          border: "3px solid #fbbf24",
          borderRadius: 20,
          padding: 25,
          width: 600,
          textAlign: "center",
        }}>
          <h3 style={{ color: "#fde047", fontSize: 24, margin: "0 0 15px 0" }}>
            📊 x = 3일 때
          </h3>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            fontSize: 28,
            fontFamily: "monospace",
          }}>
            <div style={{ color: "#fbbf24" }}>u = 3 + 2 = 5</div>
            <div style={{ color: "#a855f7", fontSize: 35 }}>→</div>
            <div style={{ color: "#3b82f6" }}>f = 5² = 25</div>
          </div>
        </div>
      </div>

      {/* 핵심 질문 */}
      <div style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: questionAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          border: "3px solid #ef4444",
          borderRadius: 15,
          padding: "15px 40px",
        }}>
          <div style={{
            color: "#fca5a5",
            fontSize: 26,
            fontWeight: "bold",
          }}>
            🤔 이런 함수를 어떻게 미분할까요?
          </div>
        </div>
      </div>

      {/* 연결 화살표 */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" />
          </marker>
        </defs>
        {exampleAppear > 0.5 && decomposeAppear > 0.5 && (
          <line
            x1="540"
            y1="260"
            x2="700"
            y2="260"
            stroke="#a855f7"
            strokeWidth="3"
            markerEnd="url(#arrowhead)"
            opacity={decomposeAppear}
          />
        )}
      </svg>
    </AbsoluteFill>
  );
};
