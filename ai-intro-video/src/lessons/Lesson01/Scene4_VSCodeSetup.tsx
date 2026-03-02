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

export const L01_Scene4_VSCodeSetup: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 57초)
  // 0-12초: VS Code 다운로드
  // 12-28초: Python 확장 설치
  // 28-45초: 첫 번째 코드 작성
  // 45-57초: 실행 및 확인

  const phase1End = 12 * FPS;
  const phase2Start = 12 * FPS;
  const phase2End = 28 * FPS;
  const phase3Start = 28 * FPS;
  const phase3End = 45 * FPS;
  const phase4Start = 45 * FPS;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e2d3d 100%)`,
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
          background: `radial-gradient(circle, #007ACC20 0%, transparent 60%)`,
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
        <span style={{ fontSize: 36 }}>💻</span>
        <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
          Step 3: VS Code 설치
        </span>
      </div>

      {/* Phase 1: 다운로드 */}
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
            <div style={{ fontSize: 100, marginBottom: 30 }}>📥</div>
            <h2
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 20,
              }}
            >
              VS Code 다운로드
            </h2>

            <div
              style={{
                opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                backgroundColor: "#1e293b",
                padding: "20px 40px",
                borderRadius: 16,
                border: "2px solid #007ACC",
                display: "inline-block",
              }}
            >
              <span style={{ fontSize: 32, fontFamily: "monospace", color: "#60a5fa" }}>
                code.visualstudio.com
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Phase 2: Python 확장 설치 */}
      {frame >= phase2Start && frame < phase2End && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1200 }}>
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase2Start, phase2Start + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div style={{ fontSize: 80, marginBottom: 20 }}>🧩</div>
            <h2
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 30,
              }}
            >
              Python 확장 설치
            </h2>
          </div>

          {/* 단계 표시 */}
          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            {[
              { step: 1, text: "확장 아이콘 클릭", icon: "🔧", delay: 30 },
              { step: 2, text: '"Python" 검색', icon: "🔍", delay: 60 },
              { step: 3, text: "Microsoft Python 설치", icon: "✅", delay: 90 },
            ].map((item, idx) => {
              const itemOpacity = interpolate(
                frame,
                [phase2Start + item.delay, phase2Start + item.delay + 30],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={idx}
                  style={{
                    opacity: itemOpacity,
                    backgroundColor: colors.gray[800],
                    padding: "25px 35px",
                    borderRadius: 20,
                    border: `2px solid #007ACC`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "#007ACC",
                      color: colors.white,
                      fontSize: 20,
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 15px",
                    }}
                  >
                    {item.step}
                  </div>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ fontSize: 22, color: colors.white }}>{item.text}</div>
                </div>
              );
            })}
          </div>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase2Start + 140, phase2Start + 170],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 24,
              color: colors.gray[400],
              marginTop: 40,
            }}
          >
            자동완성, 문법 검사, 디버깅 기능 제공
          </p>
        </div>
      )}

      {/* Phase 3-4: 코드 작성 및 실행 */}
      {frame >= phase3Start && (
        <div style={{ textAlign: "center", zIndex: 10, width: "100%", maxWidth: 1200 }}>
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
            🎉 첫 번째 코드 실행
          </h2>

          {/* 코드 에디터 시각화 */}
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase3Start + 30, phase3Start + 60],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              backgroundColor: "#1e1e1e",
              borderRadius: 16,
              overflow: "hidden",
              border: "2px solid #3c3c3c",
              textAlign: "left",
            }}
          >
            {/* 탭바 */}
            <div
              style={{
                backgroundColor: "#2d2d2d",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  backgroundColor: "#1e1e1e",
                  padding: "8px 20px",
                  borderRadius: "8px 8px 0 0",
                  fontSize: 18,
                  color: colors.white,
                }}
              >
                🐍 hello.py
              </div>
            </div>

            {/* 코드 영역 */}
            <div style={{ padding: "30px 40px", fontFamily: "monospace" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ color: "#858585", width: 30 }}>1</span>
                <span>
                  <span style={{ color: "#dcdcaa" }}>print</span>
                  <span style={{ color: colors.white }}>(</span>
                  <span style={{ color: "#ce9178" }}>"Hello, AI!"</span>
                  <span style={{ color: colors.white }}>)</span>
                </span>
              </div>
            </div>

            {/* 출력 영역 */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase4Start, phase4Start + 30],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: "#1a1a1a",
                borderTop: "1px solid #3c3c3c",
                padding: "20px 40px",
              }}
            >
              <div style={{ color: "#858585", fontSize: 16, marginBottom: 10 }}>
                OUTPUT
              </div>
              <div style={{ color: "#4ec9b0", fontSize: 28, fontWeight: "bold" }}>
                Hello, AI!
              </div>
            </div>
          </div>

          {/* 성공 메시지 */}
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase4Start + 60, phase4Start + 90],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <span style={{ fontSize: 48 }}>🎊</span>
            <span style={{ fontSize: 32, color: "#22c55e", fontWeight: "bold" }}>
              VS Code 설정 완료!
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
