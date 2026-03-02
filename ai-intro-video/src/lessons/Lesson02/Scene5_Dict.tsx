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

export const L02_Scene5_Dict: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 나레이션 타임라인 (약 63초)
  // 0-20초: 딕셔너리 기본 설명
  // 20-45초: AI 모델 설정 예시
  // 45-63초: 값 가져오기

  const phase2Start = 20 * FPS;
  const phase3Start = 45 * FPS;

  const configItems = [
    { key: "learning_rate", value: "0.001", color: "#60a5fa" },
    { key: "epochs", value: "100", color: "#f472b6" },
    { key: "batch_size", value: "32", color: "#34d399" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1a2f1a 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 60,
        paddingTop: 100,
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
        <span style={{ fontSize: 48 }}>🗂️</span>
        <span style={{ fontSize: 36, fontWeight: "bold", color: colors.white }}>딕셔너리 (Dictionary)</span>
      </div>

      {/* Phase 1: 기본 설명 */}
      <div
        style={{
          transform: `scale(${spring({
            frame: frame - 30,
            fps: FPS,
            config: { damping: 12, stiffness: 100 },
          })})`,
          backgroundColor: colors.gray[800],
          padding: "30px 50px",
          borderRadius: 20,
          border: `3px solid #22c55e`,
          marginTop: 20,
        }}
      >
        <div style={{ fontSize: 22, color: "#22c55e", fontWeight: "bold", marginBottom: 15 }}>
          키(key) : 값(value) 쌍으로 저장
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 26,
            color: "#fbbf24",
            backgroundColor: colors.gray[900],
            padding: "20px 30px",
            borderRadius: 12,
            lineHeight: 1.8,
          }}
        >
          person = {"{"}<br />
          &nbsp;&nbsp;"name": "홍길동",<br />
          &nbsp;&nbsp;"age": 30<br />
          {"}"}
        </div>
      </div>

      {/* Phase 2: AI 모델 설정 예시 */}
      {frame >= phase2Start && (
        <div
          style={{
            opacity: interpolate(
              frame,
              [phase2Start, phase2Start + 30],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            marginTop: 40,
            display: "flex",
            gap: 40,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "30px 40px",
              borderRadius: 20,
              border: `3px solid ${colors.primary}`,
            }}
          >
            <div style={{ fontSize: 24, color: colors.primary, fontWeight: "bold", marginBottom: 20 }}>
              AI 모델 설정
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 22,
                backgroundColor: colors.gray[900],
                padding: "20px 30px",
                borderRadius: 12,
                lineHeight: 2,
              }}
            >
              <span style={{ color: "#a78bfa" }}>config</span>
              <span style={{ color: colors.white }}> = {"{"}</span>
              <br />
              {configItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    opacity: interpolate(
                      frame,
                      [phase2Start + 50 + idx * 30, phase2Start + 70 + idx * 30],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    ),
                    marginLeft: 30,
                  }}
                >
                  <span style={{ color: "#fbbf24" }}>"{item.key}"</span>
                  <span style={{ color: colors.white }}>: </span>
                  <span style={{ color: item.color }}>{item.value}</span>
                  <span style={{ color: colors.white }}>,</span>
                </div>
              ))}
              <span style={{ color: colors.white }}>{"}"}</span>
            </div>
          </div>

          {/* 설정 항목 시각화 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {configItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  opacity: interpolate(
                    frame,
                    [phase2Start + 80 + idx * 30, phase2Start + 100 + idx * 30],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  backgroundColor: `${item.color}20`,
                  padding: "15px 25px",
                  borderRadius: 12,
                  border: `2px solid ${item.color}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <span style={{ fontSize: 24 }}>
                  {idx === 0 ? "📈" : idx === 1 ? "🔄" : "📦"}
                </span>
                <div>
                  <div style={{ fontSize: 16, color: colors.gray[400] }}>{item.key}</div>
                  <div style={{ fontSize: 22, color: item.color, fontWeight: "bold" }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phase 3: 값 가져오기 */}
      {frame >= phase3Start && (
        <div
          style={{
            opacity: interpolate(
              frame,
              [phase3Start, phase3Start + 30],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            marginTop: 40,
            backgroundColor: colors.gray[800],
            padding: "25px 40px",
            borderRadius: 16,
            border: `2px solid #fbbf24`,
          }}
        >
          <div style={{ fontSize: 20, color: colors.gray[300], marginBottom: 10 }}>
            값 가져오기:
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 26,
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span style={{ color: "#a78bfa" }}>config</span>
            <span style={{ color: colors.white }}>["learning_rate"]</span>
            <span style={{ fontSize: 32, color: colors.gray[500] }}>→</span>
            <span style={{ color: "#60a5fa", fontWeight: "bold" }}>0.001</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
