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

export const L01_Scene2_PythonInstall: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 52초)
  // 0-10초: python.org 접속 안내
  // 10-20초: 다운로드 방법
  // 20-35초: Add to PATH 중요성 강조
  // 35-45초: 설치 진행
  // 45-52초: 설치 확인 명령어

  const phase1End = 10 * FPS;
  const phase2Start = 10 * FPS;
  const phase2End = 20 * FPS;
  const phase3Start = 20 * FPS;
  const phase3End = 35 * FPS;
  const phase4Start = 35 * FPS;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a2e44 100%)`,
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
          background: `radial-gradient(circle, #3776ab20 0%, transparent 60%)`,
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
        <span style={{ fontSize: 36 }}>🐍</span>
        <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
          Step 1: Python 설치
        </span>
      </div>

      {/* Phase 1: python.org 접속 */}
      {frame < phase2End && (
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
            <div style={{ fontSize: 80, marginBottom: 30 }}>🌐</div>
            <h2
              style={{
                fontSize: 52,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 20,
              }}
            >
              python.org 접속
            </h2>

            {/* URL 표시 */}
            <div
              style={{
                opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                backgroundColor: "#1e293b",
                padding: "20px 40px",
                borderRadius: 16,
                border: "2px solid #3776ab",
                display: "inline-block",
              }}
            >
              <span style={{ fontSize: 36, fontFamily: "monospace", color: "#fbbf24" }}>
                https://python.org
              </span>
            </div>

            <p
              style={{
                opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                fontSize: 28,
                color: colors.gray[300],
                marginTop: 40,
              }}
            >
              Downloads 메뉴 → 최신 버전 자동 표시
            </p>
          </div>
        </div>
      )}

      {/* Phase 2-3: Add to PATH 강조 */}
      {frame >= phase2End && frame < phase4Start && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1200 }}>
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase2End, phase2End + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div style={{ fontSize: 100, marginBottom: 20 }}>⚠️</div>
            <h2
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: "#ef4444",
                marginBottom: 30,
              }}
            >
              반드시 체크하세요!
            </h2>
          </div>

          {/* 체크박스 시각화 */}
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase2End + 40, phase2End + 70],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              backgroundColor: "#1e293b",
              padding: "40px 60px",
              borderRadius: 20,
              border: "3px solid #22c55e",
              display: "inline-block",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  color: colors.white,
                }}
              >
                ✓
              </div>
              <span
                style={{
                  fontSize: 36,
                  fontFamily: "monospace",
                  color: colors.white,
                }}
              >
                Add Python to PATH
              </span>
            </div>
          </div>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase2End + 100, phase2End + 130],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 26,
              color: colors.gray[400],
              marginTop: 40,
              lineHeight: 1.6,
            }}
          >
            이 옵션을 체크하지 않으면
            <br />
            터미널에서 파이썬을 실행할 수 없습니다
          </p>
        </div>
      )}

      {/* Phase 4: 설치 확인 */}
      {frame >= phase4Start && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1200 }}>
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase4Start, phase4Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div style={{ fontSize: 80, marginBottom: 20 }}>✅</div>
            <h2
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: "#22c55e",
                marginBottom: 40,
              }}
            >
              설치 확인
            </h2>
          </div>

          {/* 터미널 시각화 */}
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase4Start + 40, phase4Start + 70],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              backgroundColor: "#0f172a",
              padding: "30px 50px",
              borderRadius: 16,
              border: "2px solid #475569",
              textAlign: "left",
              fontFamily: "monospace",
            }}
          >
            <div style={{ color: "#94a3b8", marginBottom: 15 }}>$ Terminal</div>
            <div style={{ fontSize: 28, color: "#fbbf24", marginBottom: 10 }}>
              python --version
            </div>
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase4Start + 90, phase4Start + 110],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                fontSize: 28,
                color: "#22c55e",
              }}
            >
              Python 3.12.0
            </div>
          </div>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase4Start + 130, phase4Start + 160],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 26,
              color: colors.gray[300],
              marginTop: 40,
            }}
          >
            버전 정보가 나타나면 설치 성공! 🎉
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
