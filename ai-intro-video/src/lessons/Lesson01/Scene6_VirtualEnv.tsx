import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L01_Scene6_VirtualEnv: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 73초)
  // 0-18초: 가상환경 개념 설명
  // 18-35초: 왜 필요한지 예시
  // 35-55초: 가상환경 생성 명령어
  // 55-73초: 활성화/비활성화

  const phase1End = 18 * FPS;
  const phase2Start = 18 * FPS;
  const phase2End = 35 * FPS;
  const phase3Start = 35 * FPS;
  const phase3End = 55 * FPS;
  const phase4Start = 55 * FPS;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a2f1a 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        overflow: "hidden",
      }}
    >
      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, #22c55e15 0%, transparent 60%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 섹션 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <span style={{ fontSize: 36 }}>📦</span>
        <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
          Step 5: 가상환경
        </span>
      </div>

      {/* Phase 1: 가상환경 개념 */}
      {frame < phase1End && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
              transform: `scale(${spring({
                frame,
                fps: FPS,
                config: { damping: 12, stiffness: 80 },
              })})`,
            }}
          >
            <div style={{ fontSize: 100, marginBottom: 30 }}>🔒</div>
            <h2
              style={{
                fontSize: 52,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 20,
              }}
            >
              가상환경이란?
            </h2>

            <p
              style={{
                opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                fontSize: 32,
                color: colors.gray[300],
                lineHeight: 1.6,
              }}
            >
              프로젝트별로
              <br />
              <span style={{ color: "#22c55e", fontWeight: "bold" }}>독립적인 파이썬 환경</span>을
              <br />
              만드는 기능
            </p>
          </div>
        </div>
      )}

      {/* Phase 2: 왜 필요한지 */}
      {frame >= phase2Start && frame < phase2End && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1400 }}>
          <h2
            style={{
              opacity: interpolate(
                frame,
                [phase2Start, phase2Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 42,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 40,
            }}
          >
            왜 필요할까요? 🤔
          </h2>

          <div
            style={{
              display: "flex",
              gap: 60,
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {/* 프로젝트 A */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase2Start + 40, phase2Start + 70],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: colors.gray[800],
                padding: "30px 50px",
                borderRadius: 20,
                border: "3px solid #3b82f6",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 15 }}>📁</div>
              <h3 style={{ fontSize: 28, color: "#3b82f6", marginBottom: 15 }}>
                프로젝트 A
              </h3>
              <div
                style={{
                  backgroundColor: "#1e293b",
                  padding: "15px 25px",
                  borderRadius: 12,
                  fontFamily: "monospace",
                  fontSize: 22,
                  color: colors.white,
                }}
              >
                TensorFlow <span style={{ color: "#22c55e" }}>2.0</span>
              </div>
            </div>

            {/* 충돌 표시 */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase2Start + 100, phase2Start + 130],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 48, color: "#ef4444" }}>⚠️</div>
            </div>

            {/* 프로젝트 B */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase2Start + 70, phase2Start + 100],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: colors.gray[800],
                padding: "30px 50px",
                borderRadius: 20,
                border: "3px solid #a855f7",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 15 }}>📁</div>
              <h3 style={{ fontSize: 28, color: "#a855f7", marginBottom: 15 }}>
                프로젝트 B
              </h3>
              <div
                style={{
                  backgroundColor: "#1e293b",
                  padding: "15px 25px",
                  borderRadius: 12,
                  fontFamily: "monospace",
                  fontSize: 22,
                  color: colors.white,
                }}
              >
                TensorFlow <span style={{ color: "#f97316" }}>1.5</span>
              </div>
            </div>
          </div>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase2Start + 150, phase2Start + 180],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 26,
              color: "#22c55e",
              marginTop: 40,
            }}
          >
            가상환경으로 버전 충돌 방지! ✓
          </p>
        </div>
      )}

      {/* Phase 3: 생성 명령어 */}
      {frame >= phase3Start && frame < phase4Start && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1000 }}>
          <h2
            style={{
              opacity: interpolate(
                frame,
                [phase3Start, phase3Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 42,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 40,
            }}
          >
            가상환경 만들기
          </h2>

          <div
            style={{
              opacity: interpolate(
                frame,
                [phase3Start + 30, phase3Start + 60],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              backgroundColor: "#0f172a",
              padding: "30px 50px",
              borderRadius: 16,
              border: "2px solid #22c55e",
              fontFamily: "monospace",
              textAlign: "left",
            }}
          >
            <div style={{ color: "#94a3b8", marginBottom: 15 }}>$ Terminal</div>
            <div style={{ fontSize: 32, color: "#fbbf24" }}>
              python -m venv <span style={{ color: "#22c55e" }}>myenv</span>
            </div>
          </div>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase3Start + 100, phase3Start + 130],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 24,
              color: colors.gray[400],
              marginTop: 30,
            }}
          >
            <span style={{ color: "#22c55e" }}>myenv</span>는 원하는 이름으로 변경 가능
          </p>
        </div>
      )}

      {/* Phase 4: 활성화/비활성화 */}
      {frame >= phase4Start && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1200 }}>
          <h2
            style={{
              opacity: interpolate(
                frame,
                [phase4Start, phase4Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 42,
              fontWeight: "bold",
              color: colors.white,
              marginBottom: 40,
            }}
          >
            활성화 & 비활성화
          </h2>

          <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
            {/* Windows */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase4Start + 30, phase4Start + 60],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: colors.gray[800],
                padding: "25px 35px",
                borderRadius: 16,
                border: "2px solid #0ea5e9",
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: 24, color: "#0ea5e9", marginBottom: 15, fontWeight: "bold" }}>
                🪟 Windows
              </div>
              <div
                style={{
                  backgroundColor: "#0f172a",
                  padding: "15px 20px",
                  borderRadius: 8,
                  fontFamily: "monospace",
                  fontSize: 20,
                  color: "#fbbf24",
                }}
              >
                myenv\Scripts\activate
              </div>
            </div>

            {/* Mac/Linux */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase4Start + 60, phase4Start + 90],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: colors.gray[800],
                padding: "25px 35px",
                borderRadius: 16,
                border: "2px solid #a855f7",
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: 24, color: "#a855f7", marginBottom: 15, fontWeight: "bold" }}>
                🍎 Mac / Linux
              </div>
              <div
                style={{
                  backgroundColor: "#0f172a",
                  padding: "15px 20px",
                  borderRadius: 8,
                  fontFamily: "monospace",
                  fontSize: 20,
                  color: "#fbbf24",
                }}
              >
                source myenv/bin/activate
              </div>
            </div>
          </div>

          {/* 활성화 표시 */}
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase4Start + 120, phase4Start + 150],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              marginTop: 40,
              backgroundColor: "#0f172a",
              padding: "20px 40px",
              borderRadius: 12,
              display: "inline-block",
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: "#22c55e" }}>(myenv)</span>
            <span style={{ color: colors.white }}> $ </span>
            <span style={{ color: "#94a3b8" }}>← 활성화 완료!</span>
          </div>

          {/* 비활성화 */}
          <p
            style={{
              opacity: interpolate(
                frame,
                [phase4Start + 180, phase4Start + 210],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 24,
              color: colors.gray[400],
              marginTop: 30,
            }}
          >
            비활성화: <span style={{ color: "#fbbf24", fontFamily: "monospace" }}>deactivate</span>
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
