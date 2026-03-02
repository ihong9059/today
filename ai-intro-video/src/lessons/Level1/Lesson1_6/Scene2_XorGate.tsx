/**
 * Lesson 1-6: XOR 문제와 한계
 * Scene 2: XOR 게이트 설명
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene2_XorGate: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 진리표 행 애니메이션
  const row1Opacity = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" });
  const row2Opacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const row3Opacity = interpolate(frame, [220, 250], [0, 1], { extrapolateRight: "clamp" });
  const row4Opacity = interpolate(frame, [290, 320], [0, 1], { extrapolateRight: "clamp" });

  // 핵심 규칙 애니메이션
  const ruleOpacity = interpolate(frame, [380, 420], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #78350f 100%)`,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-6/scene2_xor_gate.mp3")} />

      {/* 제목 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#f59e0b",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 40, fontWeight: "bold", color: colors.white }}>⊕</span>
        </div>
        <h2 style={{ fontSize: 56, color: colors.white, fontWeight: "bold" }}>
          XOR 게이트
        </h2>
      </div>

      {/* 의미 설명 */}
      <p
        style={{
          fontSize: 28,
          color: "#fbbf24",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        "배타적 OR" (Exclusive OR) - 두 입력이 다를 때만 참!
      </p>

      {/* 진리표 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          borderRadius: 20,
          padding: 30,
          marginBottom: 40,
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            display: "flex",
            borderBottom: `2px solid ${colors.gray[600]}`,
            paddingBottom: 15,
            marginBottom: 15,
          }}
        >
          <div style={{ width: 120, textAlign: "center", fontSize: 26, fontWeight: "bold", color: "#f59e0b" }}>
            입력 A
          </div>
          <div style={{ width: 120, textAlign: "center", fontSize: 26, fontWeight: "bold", color: "#f59e0b" }}>
            입력 B
          </div>
          <div style={{ width: 150, textAlign: "center", fontSize: 26, fontWeight: "bold", color: colors.primary[400] }}>
            출력
          </div>
          <div style={{ width: 200, textAlign: "center", fontSize: 22, fontWeight: "bold", color: colors.gray[400] }}>
            같음/다름
          </div>
        </div>

        {/* Row 1: 0, 0 -> 0 (같음) */}
        <div
          style={{
            display: "flex",
            marginBottom: 12,
            backgroundColor: "#ef444420",
            borderRadius: 10,
            padding: "8px 0",
            opacity: row1Opacity,
          }}
        >
          <div style={{ width: 120, textAlign: "center", fontSize: 30, color: colors.gray[400] }}>0</div>
          <div style={{ width: 120, textAlign: "center", fontSize: 30, color: colors.gray[400] }}>0</div>
          <div style={{ width: 150, textAlign: "center", fontSize: 30, color: "#ef4444", fontWeight: "bold" }}>0</div>
          <div style={{ width: 200, textAlign: "center", fontSize: 22, color: colors.gray[400] }}>같음</div>
        </div>

        {/* Row 2: 0, 1 -> 1 (다름) */}
        <div
          style={{
            display: "flex",
            marginBottom: 12,
            backgroundColor: "#22c55e20",
            borderRadius: 10,
            padding: "8px 0",
            opacity: row2Opacity,
          }}
        >
          <div style={{ width: 120, textAlign: "center", fontSize: 30, color: colors.gray[400] }}>0</div>
          <div style={{ width: 120, textAlign: "center", fontSize: 30, color: "#22c55e", fontWeight: "bold" }}>1</div>
          <div style={{ width: 150, textAlign: "center", fontSize: 30, color: "#22c55e", fontWeight: "bold" }}>1</div>
          <div style={{ width: 200, textAlign: "center", fontSize: 22, color: "#22c55e" }}>다름!</div>
        </div>

        {/* Row 3: 1, 0 -> 1 (다름) */}
        <div
          style={{
            display: "flex",
            marginBottom: 12,
            backgroundColor: "#22c55e20",
            borderRadius: 10,
            padding: "8px 0",
            opacity: row3Opacity,
          }}
        >
          <div style={{ width: 120, textAlign: "center", fontSize: 30, color: "#22c55e", fontWeight: "bold" }}>1</div>
          <div style={{ width: 120, textAlign: "center", fontSize: 30, color: colors.gray[400] }}>0</div>
          <div style={{ width: 150, textAlign: "center", fontSize: 30, color: "#22c55e", fontWeight: "bold" }}>1</div>
          <div style={{ width: 200, textAlign: "center", fontSize: 22, color: "#22c55e" }}>다름!</div>
        </div>

        {/* Row 4: 1, 1 -> 0 (같음) */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#ef444420",
            borderRadius: 10,
            padding: "8px 0",
            opacity: row4Opacity,
          }}
        >
          <div style={{ width: 120, textAlign: "center", fontSize: 30, color: "#22c55e", fontWeight: "bold" }}>1</div>
          <div style={{ width: 120, textAlign: "center", fontSize: 30, color: "#22c55e", fontWeight: "bold" }}>1</div>
          <div style={{ width: 150, textAlign: "center", fontSize: 30, color: "#ef4444", fontWeight: "bold" }}>0</div>
          <div style={{ width: 200, textAlign: "center", fontSize: 22, color: colors.gray[400] }}>같음</div>
        </div>
      </div>

      {/* 핵심 규칙 */}
      <div
        style={{
          backgroundColor: "#f59e0b30",
          border: "3px solid #f59e0b",
          borderRadius: 15,
          padding: "20px 50px",
          opacity: ruleOpacity,
        }}
      >
        <span style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>
          핵심: 둘이 <span style={{ color: "#22c55e" }}>다르면</span> 참, 둘이 <span style={{ color: "#ef4444" }}>같으면</span> 거짓
        </span>
      </div>
    </AbsoluteFill>
  );
};
