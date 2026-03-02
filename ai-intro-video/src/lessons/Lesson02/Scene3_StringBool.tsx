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

export const L02_Scene3_StringBool: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 39초)
  // 0-18초: 문자열 설명
  // 18-39초: 불리언 설명

  const phase2Start = 18 * FPS;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1a1a2e 100%)`,
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
        <span style={{ fontSize: 48 }}>📝</span>
        <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>문자열과 불리언</span>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div style={{ display: "flex", gap: 60, alignItems: "flex-start", marginTop: 40 }}>
        {/* str 카드 */}
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
            border: `3px solid #a78bfa`,
            width: 420,
          }}
        >
          <div style={{ fontSize: 28, color: "#a78bfa", fontWeight: "bold", marginBottom: 20 }}>
            str (문자열)
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 28,
              color: "#fbbf24",
              backgroundColor: colors.gray[900],
              padding: "20px 30px",
              borderRadius: 12,
              marginBottom: 20,
            }}
          >
            name = "AI"
          </div>
          <p style={{ fontSize: 20, color: colors.gray[300], lineHeight: 1.6 }}>
            텍스트를 저장하는 자료형<br />
            따옴표로 감싸서 표현
          </p>
          <div
            style={{
              opacity: interpolate(
                frame,
                [80, 110],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              marginTop: 20,
              padding: "15px 20px",
              backgroundColor: `#a78bfa20`,
              borderRadius: 12,
            }}
          >
            <span style={{ fontSize: 18, color: "#a78bfa" }}>
              자연어 처리(NLP)의 기본!
            </span>
          </div>
        </div>

        {/* bool 카드 */}
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
            border: `3px solid #34d399`,
            width: 420,
          }}
        >
          <div style={{ fontSize: 28, color: "#34d399", fontWeight: "bold", marginBottom: 20 }}>
            bool (불리언)
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 24,
              color: "#4ade80",
              backgroundColor: colors.gray[900],
              padding: "20px 30px",
              borderRadius: 12,
              marginBottom: 20,
            }}
          >
            is_trained = True
          </div>

          {/* True / False 표시 */}
          <div style={{ display: "flex", gap: 30, marginBottom: 20 }}>
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase2Start + 40, phase2Start + 60],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: "#22c55e30",
                padding: "12px 30px",
                borderRadius: 12,
                border: "2px solid #22c55e",
              }}
            >
              <span style={{ fontSize: 24, color: "#22c55e", fontWeight: "bold" }}>True</span>
            </div>
            <div
              style={{
                opacity: interpolate(
                  frame,
                  [phase2Start + 60, phase2Start + 80],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                backgroundColor: "#ef444430",
                padding: "12px 30px",
                borderRadius: 12,
                border: "2px solid #ef4444",
              }}
            >
              <span style={{ fontSize: 24, color: "#ef4444", fontWeight: "bold" }}>False</span>
            </div>
          </div>

          <p style={{ fontSize: 20, color: colors.gray[300], lineHeight: 1.6 }}>
            참/거짓, 두 가지 값만 가능<br />
            조건 판단에 사용
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
