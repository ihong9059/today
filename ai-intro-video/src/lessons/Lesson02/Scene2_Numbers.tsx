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

export const L02_Scene2_Numbers: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 46초)
  // 0-15초: int 설명
  // 15-30초: float 설명
  // 30-46초: AI에서의 중요성

  const phase1End = 15 * FPS;
  const phase2Start = 15 * FPS;
  const phase2End = 30 * FPS;
  const phase3Start = 30 * FPS;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #0f172a 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        overflow: "hidden",
      }}
    >
      {/* 섹션 제목 */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          display: "flex",
          alignItems: "center",
          gap: 15,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ fontSize: 48 }}>🔢</span>
        <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>숫자 자료형</span>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div style={{ display: "flex", gap: 60, alignItems: "flex-start", marginTop: 40 }}>
        {/* int 카드 */}
        <div
          style={{
            transform: `scale(${spring({
              frame: frame - 20,
              fps: FPS,
              config: { damping: 12, stiffness: 100 },
            })})`,
            backgroundColor: colors.gray[800],
            padding: 40,
            borderRadius: 24,
            border: `3px solid #60a5fa`,
            width: 400,
          }}
        >
          <div style={{ fontSize: 28, color: "#60a5fa", fontWeight: "bold", marginBottom: 20 }}>
            int (정수)
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 32,
              color: "#4ade80",
              backgroundColor: colors.gray[900],
              padding: "20px 30px",
              borderRadius: 12,
              marginBottom: 20,
            }}
          >
            x = 10
          </div>
          <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
            {["1", "2", "3", "-5", "100"].map((num, idx) => (
              <span
                key={idx}
                style={{
                  opacity: interpolate(
                    frame,
                    [40 + idx * 10, 50 + idx * 10],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  backgroundColor: colors.gray[700],
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 20,
                  color: colors.white,
                  fontFamily: "monospace",
                }}
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        {/* float 카드 */}
        <div
          style={{
            transform: `scale(${spring({
              frame: frame - phase2Start - 20,
              fps: FPS,
              config: { damping: 12, stiffness: 100 },
            })})`,
            backgroundColor: colors.gray[800],
            padding: 40,
            borderRadius: 24,
            border: `3px solid #f472b6`,
            width: 400,
          }}
        >
          <div style={{ fontSize: 28, color: "#f472b6", fontWeight: "bold", marginBottom: 20 }}>
            float (실수)
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 32,
              color: "#4ade80",
              backgroundColor: colors.gray[900],
              padding: "20px 30px",
              borderRadius: 12,
              marginBottom: 20,
            }}
          >
            y = 3.14
          </div>
          <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
            {["3.14", "-2.5", "0.001", "1.0"].map((num, idx) => (
              <span
                key={idx}
                style={{
                  opacity: interpolate(
                    frame,
                    [phase2Start + 40 + idx * 10, phase2Start + 50 + idx * 10],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  backgroundColor: colors.gray[700],
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 20,
                  color: colors.white,
                  fontFamily: "monospace",
                }}
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI에서의 중요성 */}
      {frame >= phase3Start && (
        <div
          style={{
            opacity: interpolate(
              frame,
              [phase3Start, phase3Start + 30],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            marginTop: 50,
            backgroundColor: `${colors.primary}20`,
            padding: "30px 50px",
            borderRadius: 20,
            border: `2px solid ${colors.primary}`,
          }}
        >
          <p style={{ fontSize: 26, color: colors.white, textAlign: "center", margin: 0 }}>
            <span style={{ color: colors.primary, fontWeight: "bold" }}>AI에서 가장 많이 사용</span>
            되는 자료형
          </p>
          <div style={{ display: "flex", gap: 40, marginTop: 20, justifyContent: "center" }}>
            {[
              { label: "가중치", icon: "⚖️" },
              { label: "학습률", icon: "📈" },
              { label: "손실값", icon: "📉" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  opacity: interpolate(
                    frame,
                    [phase3Start + 60 + idx * 20, phase3Start + 80 + idx * 20],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 32 }}>{item.icon}</span>
                <span style={{ fontSize: 22, color: colors.gray[300] }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
