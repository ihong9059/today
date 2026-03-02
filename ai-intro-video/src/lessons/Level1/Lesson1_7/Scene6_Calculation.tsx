/**
 * Scene 6: 실제 계산 예제
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_Calculation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 계산 단계별 하이라이트
  const step1 = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const step2 = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const step3 = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const step4 = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const step5 = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #312e81 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-7/scene6_calculation.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        계산 예제: 입력 (1, 1)
      </h2>

      <div style={{ display: "flex", gap: 80, alignItems: "flex-start" }}>
        {/* 네트워크 시각화 */}
        <div
          style={{
            position: "relative",
            width: 500,
            height: 400,
          }}
        >
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            {/* 연결선 */}
            <line x1="80" y1="100" x2="200" y2="80" stroke="#4b5563" strokeWidth="2" />
            <line x1="80" y1="100" x2="200" y2="220" stroke="#4b5563" strokeWidth="2" />
            <line x1="80" y1="300" x2="200" y2="80" stroke="#4b5563" strokeWidth="2" />
            <line x1="80" y1="300" x2="200" y2="220" stroke="#4b5563" strokeWidth="2" />
            <line x1="300" y1="80" x2="420" y2="150" stroke="#4b5563" strokeWidth="2" />
            <line x1="300" y1="220" x2="420" y2="150" stroke="#4b5563" strokeWidth="2" />
          </svg>

          {/* 입력 */}
          <div style={{ position: "absolute", left: 20, top: 50 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: step1 > 0.5 ? "#3b82f6" : colors.gray[600],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: 24,
                fontWeight: "bold",
                transition: "background-color 0.3s",
              }}
            >
              1
            </div>
            <div style={{ color: colors.gray[400], fontSize: 16, textAlign: "center", marginTop: 5 }}>x1</div>
          </div>
          <div style={{ position: "absolute", left: 20, top: 250 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: step1 > 0.5 ? "#3b82f6" : colors.gray[600],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              1
            </div>
            <div style={{ color: colors.gray[400], fontSize: 16, textAlign: "center", marginTop: 5 }}>x2</div>
          </div>

          {/* NAND */}
          <div style={{ position: "absolute", left: 170, top: 30 }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: step2 > 0.5 ? "#ef4444" : colors.gray[600],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              NAND
            </div>
            <div
              style={{
                color: step2 > 0.5 ? "#fcd34d" : colors.gray[500],
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {step2 > 0.5 ? "→ 0" : ""}
            </div>
          </div>

          {/* OR */}
          <div style={{ position: "absolute", left: 170, top: 170 }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: step3 > 0.5 ? "#22c55e" : colors.gray[600],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              OR
            </div>
            <div
              style={{
                color: step3 > 0.5 ? "#fcd34d" : colors.gray[500],
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {step3 > 0.5 ? "→ 1" : ""}
            </div>
          </div>

          {/* AND (출력) */}
          <div style={{ position: "absolute", left: 380, top: 100 }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: step4 > 0.5 ? "#f59e0b" : colors.gray[600],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              AND
            </div>
            <div
              style={{
                color: step4 > 0.5 ? "#fcd34d" : colors.gray[500],
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {step4 > 0.5 ? "→ 0" : ""}
            </div>
          </div>
        </div>

        {/* 계산 과정 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          <div
            style={{
              backgroundColor: step1 > 0.5 ? "#3b82f6" : colors.gray[800],
              padding: "15px 30px",
              borderRadius: 12,
              opacity: step1,
            }}
          >
            <div style={{ color: colors.white, fontSize: 24, fontWeight: "bold" }}>
              1. 입력: x1=1, x2=1
            </div>
          </div>

          <div
            style={{
              backgroundColor: step2 > 0.5 ? "#ef4444" : colors.gray[800],
              padding: "15px 30px",
              borderRadius: 12,
              opacity: step2,
            }}
          >
            <div style={{ color: colors.white, fontSize: 24, fontWeight: "bold" }}>
              2. NAND(1,1) = 0
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18 }}>
              둘 다 1이면 0 출력
            </div>
          </div>

          <div
            style={{
              backgroundColor: step3 > 0.5 ? "#22c55e" : colors.gray[800],
              padding: "15px 30px",
              borderRadius: 12,
              opacity: step3,
            }}
          >
            <div style={{ color: colors.white, fontSize: 24, fontWeight: "bold" }}>
              3. OR(1,1) = 1
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18 }}>
              하나라도 1이면 1 출력
            </div>
          </div>

          <div
            style={{
              backgroundColor: step4 > 0.5 ? "#f59e0b" : colors.gray[800],
              padding: "15px 30px",
              borderRadius: 12,
              opacity: step4,
            }}
          >
            <div style={{ color: colors.white, fontSize: 24, fontWeight: "bold" }}>
              4. AND(0,1) = 0
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18 }}>
              둘 다 1이어야 1 출력
            </div>
          </div>

          <div
            style={{
              backgroundColor: step5 > 0.5 ? "#a855f7" : colors.gray[800],
              padding: "20px 30px",
              borderRadius: 12,
              borderLeft: "5px solid #fcd34d",
              opacity: step5,
            }}
          >
            <div style={{ color: "#fcd34d", fontSize: 28, fontWeight: "bold" }}>
              XOR(1,1) = 0 ✓
            </div>
            <div style={{ color: colors.white, fontSize: 20 }}>
              정답! 두 입력이 같으면 0
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
