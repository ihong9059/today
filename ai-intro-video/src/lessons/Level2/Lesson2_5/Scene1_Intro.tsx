/**
 * Scene 1: 벡터와 행렬 기초 인트로
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: "clamp" });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });
  const subtitleY = interpolate(frame, [30, 60], [30, 0], { extrapolateRight: "clamp" });

  const iconsProgress = spring({ frame: frame - 60, fps, config: { damping: 15 } });

  const gpuPulse = Math.sin(frame * 0.1) * 0.1 + 1;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-5/scene1.mp3")} />

      {/* 배경 그리드 */}
      <svg width={1920} height={1080} style={{ position: "absolute", opacity: 0.1 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <g key={i}>
            <line x1={i * 96} y1={0} x2={i * 96} y2={1080} stroke="#a855f7" strokeWidth={1} />
            <line x1={0} y1={i * 54} x2={1920} y2={i * 54} stroke="#a855f7" strokeWidth={1} />
          </g>
        ))}
      </svg>

      {/* 배경 행렬 패턴 */}
      <div style={{
        position: "absolute",
        top: 100,
        left: 100,
        opacity: 0.15,
        fontSize: 24,
        fontFamily: "monospace",
        color: "#a855f7",
        lineHeight: 1.5,
      }}>
        {`[1  2  3]\n[4  5  6]\n[7  8  9]`}
      </div>
      <div style={{
        position: "absolute",
        bottom: 150,
        right: 150,
        opacity: 0.15,
        fontSize: 24,
        fontFamily: "monospace",
        color: "#a855f7",
        lineHeight: 1.5,
      }}>
        {`[a  b]\n[c  d]\n[e  f]`}
      </div>

      {/* 레벨 배지 */}
      <div style={{
        position: "absolute",
        top: 40,
        left: 60,
        backgroundColor: "rgba(168, 85, 247, 0.3)",
        padding: "10px 25px",
        borderRadius: 25,
        color: colors.white,
        fontSize: 24,
        fontWeight: "bold",
        border: "2px solid #a855f7",
      }}>
        Level 2 · 수학 기초
      </div>

      {/* 레슨 번호 */}
      <div style={{
        position: "absolute",
        top: 40,
        right: 60,
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: "10px 25px",
        borderRadius: 25,
        color: colors.white,
        fontSize: 24,
        fontWeight: "bold",
      }}>
        Lesson 2-5
      </div>

      {/* 메인 타이틀 */}
      <div style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: `translate(-50%, ${titleY}px)`,
        opacity: titleOpacity,
        textAlign: "center",
      }}>
        <h1 style={{
          fontSize: 90,
          color: colors.white,
          fontWeight: "bold",
          textShadow: "0 4px 30px rgba(168, 85, 247, 0.8)",
          margin: 0,
        }}>
          벡터와 행렬 기초
        </h1>
      </div>

      {/* 서브타이틀 */}
      <div style={{
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: `translate(-50%, ${subtitleY}px)`,
        opacity: subtitleOpacity,
        textAlign: "center",
      }}>
        <h2 style={{
          fontSize: 40,
          color: "#c084fc",
          fontWeight: "bold",
          margin: 0,
        }}>
          + GPU와 HBM의 비밀
        </h2>
      </div>

      {/* 아이콘 그룹 */}
      <div style={{
        position: "absolute",
        bottom: 180,
        left: "50%",
        transform: `translateX(-50%) scale(${iconsProgress})`,
        display: "flex",
        gap: 60,
        alignItems: "center",
      }}>
        {/* 벡터 아이콘 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "rgba(59, 130, 246, 0.3)",
            border: "3px solid #3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontFamily: "monospace",
            color: colors.white,
          }}>
            [1,2,3]
          </div>
          <span style={{ color: "#93c5fd", fontSize: 20 }}>벡터</span>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 40, color: "#a855f7" }}>→</div>

        {/* 행렬 아이콘 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "rgba(34, 197, 94, 0.3)",
            border: "3px solid #22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontSize: 18,
            fontFamily: "monospace",
            color: colors.white,
            lineHeight: 1.3,
          }}>
            <span>[1 2]</span>
            <span>[3 4]</span>
          </div>
          <span style={{ color: "#86efac", fontSize: 20 }}>행렬</span>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 40, color: "#a855f7" }}>→</div>

        {/* GPU 아이콘 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "rgba(251, 191, 36, 0.3)",
            border: "3px solid #fbbf24",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 50,
            transform: `scale(${gpuPulse})`,
          }}>
            🖥️
          </div>
          <span style={{ color: "#fde047", fontSize: 20 }}>GPU</span>
        </div>

        {/* 화살표 */}
        <div style={{ fontSize: 40, color: "#a855f7" }}>→</div>

        {/* HBM 아이콘 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "rgba(239, 68, 68, 0.3)",
            border: "3px solid #ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: "bold",
            color: colors.white,
          }}>
            HBM
          </div>
          <span style={{ color: "#fca5a5", fontSize: 20 }}>고대역폭</span>
        </div>
      </div>

      {/* 하단 메시지 */}
      <div style={{
        position: "absolute",
        bottom: 60,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" }),
        textAlign: "center",
      }}>
        <p style={{
          fontSize: 28,
          color: "#e9d5ff",
          margin: 0,
        }}>
          행렬 연산과 GPU의 관계를 이해하면, AI 하드웨어의 비밀이 풀립니다!
        </p>
      </div>
    </AbsoluteFill>
  );
};
