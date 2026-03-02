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

export const L01_Scene5_Jupyter: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 47초)
  // 0-12초: pip install jupyter
  // 12-25초: jupyter notebook 실행
  // 25-40초: 노트북 사용법
  // 40-47초: 셀 실행 결과

  const phase1End = 12 * FPS;
  const phase2Start = 12 * FPS;
  const phase2End = 25 * FPS;
  const phase3Start = 25 * FPS;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #2d1f00 50%, ${colors.gray[900]} 100%)`,
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
          background: `radial-gradient(circle, #F3762620 0%, transparent 60%)`,
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
        <span style={{ fontSize: 36 }}>📓</span>
        <span style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>
          Step 4: Jupyter Notebook
        </span>
      </div>

      {/* Phase 1: 설치 명령어 */}
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
            <div style={{ fontSize: 80, marginBottom: 30 }}>📦</div>
            <h2
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 30,
              }}
            >
              Jupyter 설치
            </h2>

            {/* 터미널 명령어 */}
            <div
              style={{
                opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                backgroundColor: "#0f172a",
                padding: "25px 50px",
                borderRadius: 16,
                border: "2px solid #F37626",
                fontFamily: "monospace",
              }}
            >
              <div style={{ color: "#94a3b8", marginBottom: 10 }}>$ Terminal</div>
              <div style={{ fontSize: 32, color: "#fbbf24" }}>pip install jupyter</div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 2: 실행 */}
      {frame >= phase2Start && frame < phase3Start && (
        <div style={{ textAlign: "center", zIndex: 10 }}>
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
            <div style={{ fontSize: 80, marginBottom: 30 }}>🚀</div>
            <h2
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: colors.white,
                marginBottom: 30,
              }}
            >
              Jupyter 실행
            </h2>

            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase2Start + 40, phase2Start + 70],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: "#0f172a",
                padding: "25px 50px",
                borderRadius: 16,
                border: "2px solid #F37626",
                fontFamily: "monospace",
                marginBottom: 30,
              }}
            >
              <div style={{ color: "#94a3b8", marginBottom: 10 }}>$ Terminal</div>
              <div style={{ fontSize: 32, color: "#fbbf24" }}>jupyter notebook</div>
            </div>

            <p
              style={{
                opacity: interpolate(
                  frame,
                  [phase2Start + 100, phase2Start + 130],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                fontSize: 28,
                color: colors.gray[300],
              }}
            >
              웹 브라우저가 자동으로 열립니다 🌐
            </p>
          </div>
        </div>
      )}

      {/* Phase 3: 노트북 인터페이스 */}
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
            Jupyter 노트북 사용
          </h2>

          {/* Jupyter 노트북 시각화 */}
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase3Start + 30, phase3Start + 60],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              backgroundColor: colors.white,
              borderRadius: 16,
              overflow: "hidden",
              border: "2px solid #e5e7eb",
              textAlign: "left",
            }}
          >
            {/* 툴바 */}
            <div
              style={{
                backgroundColor: "#f5f5f5",
                padding: "10px 20px",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <span style={{ fontSize: 24 }}>📓</span>
              <span style={{ fontSize: 18, color: "#333" }}>Untitled.ipynb</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                <span style={{ fontSize: 20 }}>▶️</span>
                <span style={{ fontSize: 20 }}>⏹️</span>
              </div>
            </div>

            {/* 셀 1: 코드 입력 */}
            <div
              style={{
                borderLeft: "4px solid #F37626",
                margin: "15px",
                backgroundColor: "#f8f8f8",
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  padding: "15px 20px",
                  fontFamily: "monospace",
                  fontSize: 24,
                  color: "#333",
                }}
              >
                <span style={{ color: "#0000ff" }}>print</span>
                <span>(</span>
                <span style={{ color: "#a31515" }}>"Hello from Jupyter!"</span>
                <span>)</span>
              </div>
            </div>

            {/* 셀 1: 출력 */}
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase3Start + 100, phase3Start + 130],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                margin: "0 15px 15px",
                padding: "15px 20px",
                fontFamily: "monospace",
                fontSize: 24,
                color: "#333",
              }}
            >
              Hello from Jupyter!
            </div>
          </div>

          {/* 단축키 설명 */}
          <div
            style={{
              opacity: interpolate(
                frame,
                [phase3Start + 150, phase3Start + 180],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              marginTop: 40,
              display: "flex",
              gap: 30,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: colors.gray[800],
                padding: "15px 30px",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <span
                style={{
                  backgroundColor: "#F37626",
                  padding: "8px 15px",
                  borderRadius: 8,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.white,
                }}
              >
                Shift + Enter
              </span>
              <span style={{ fontSize: 22, color: colors.white }}>셀 실행</span>
            </div>
          </div>

          <p
            style={{
              opacity: interpolate(
                frame,
                [phase3Start + 200, phase3Start + 230],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              fontSize: 26,
              color: colors.gray[300],
              marginTop: 30,
            }}
          >
            코드 작성 → 즉시 실행 → 결과 확인 📊
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
