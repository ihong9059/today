/**
 * Scene 7: 왜 작동하는가?
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene7_WhyWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c3aed 30%, #1e1b4b 70%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-7/scene7_why_works.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 60,
          opacity: titleOpacity,
        }}
      >
        왜 이것이 작동할까요?
      </h2>

      {/* 핵심 개념 */}
      <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
        {/* 원래 공간 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            opacity: interpolate(frame, [40, 80], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ color: "#ef4444", fontSize: 28, fontWeight: "bold" }}>원래 공간</div>
          <div
            style={{
              width: 300,
              height: 300,
              backgroundColor: colors.gray[800],
              borderRadius: 20,
              position: "relative",
              border: "3px solid #ef4444",
            }}
          >
            {/* XOR 점들 */}
            <div style={{ position: "absolute", bottom: 30, left: 30, width: 40, height: 40, borderRadius: "50%", backgroundColor: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", color: colors.white, fontWeight: "bold" }}>0</div>
            <div style={{ position: "absolute", top: 30, left: 30, width: 40, height: 40, borderRadius: "50%", backgroundColor: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", color: colors.white, fontWeight: "bold" }}>1</div>
            <div style={{ position: "absolute", bottom: 30, right: 30, width: 40, height: 40, borderRadius: "50%", backgroundColor: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", color: colors.white, fontWeight: "bold" }}>1</div>
            <div style={{ position: "absolute", top: 30, right: 30, width: 40, height: 40, borderRadius: "50%", backgroundColor: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", color: colors.white, fontWeight: "bold" }}>0</div>
            {/* X 표시 */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#ef4444", fontSize: 72, fontWeight: "bold" }}>✗</div>
          </div>
          <div style={{ color: colors.gray[400], fontSize: 22 }}>선형 분리 불가능</div>
        </div>

        {/* 화살표 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            opacity: interpolate(frame, [100, 140], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ color: "#a855f7", fontSize: 24, fontWeight: "bold" }}>은닉층</div>
          <div style={{ color: "#a855f7", fontSize: 24, fontWeight: "bold" }}>변환</div>
          <div style={{ fontSize: 72, color: "#a855f7" }}>→</div>
        </div>

        {/* 변환된 공간 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            opacity: interpolate(frame, [160, 200], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold" }}>변환된 공간</div>
          <div
            style={{
              width: 300,
              height: 300,
              backgroundColor: colors.gray[800],
              borderRadius: 20,
              position: "relative",
              border: "3px solid #22c55e",
            }}
          >
            {/* 변환된 점들 - 선형 분리 가능 */}
            <div style={{ position: "absolute", bottom: 30, left: 60, width: 40, height: 40, borderRadius: "50%", backgroundColor: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", color: colors.white, fontWeight: "bold" }}>0</div>
            <div style={{ position: "absolute", bottom: 30, right: 60, width: 40, height: 40, borderRadius: "50%", backgroundColor: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", color: colors.white, fontWeight: "bold" }}>0</div>
            <div style={{ position: "absolute", top: 120, left: "50%", transform: "translateX(-50%)", width: 40, height: 40, borderRadius: "50%", backgroundColor: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", color: colors.white, fontWeight: "bold" }}>1</div>
            <div style={{ position: "absolute", top: 120, left: "30%", width: 40, height: 40, borderRadius: "50%", backgroundColor: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", color: colors.white, fontWeight: "bold" }}>1</div>
            {/* 분리선 */}
            <div style={{ position: "absolute", bottom: 100, left: 20, right: 20, height: 4, backgroundColor: "#fcd34d", borderRadius: 2 }} />
            {/* 체크 표시 */}
            <div style={{ position: "absolute", bottom: 140, right: 20, color: "#22c55e", fontSize: 48, fontWeight: "bold" }}>✓</div>
          </div>
          <div style={{ color: "#22c55e", fontSize: 22, fontWeight: "bold" }}>선형 분리 가능!</div>
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          marginTop: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
          opacity: interpolate(frame, [240, 280], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            backgroundColor: "#a855f7",
            padding: "20px 50px",
            borderRadius: 15,
            color: colors.white,
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          비선형성 + 조합 = 복잡한 문제 해결
        </div>
        <div style={{ color: "#fcd34d", fontSize: 28, fontWeight: "bold" }}>
          심층 신경망의 핵심 원리!
        </div>
      </div>
    </AbsoluteFill>
  );
};
