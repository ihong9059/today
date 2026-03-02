/**
 * Scene 5: 드롭아웃
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_Dropout: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const conceptOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const visualOpacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const codeOpacity = interpolate(frame, [360, 390], [0, 1], { extrapolateRight: "clamp" });
  const warningOpacity = interpolate(frame, [510, 540], [0, 1], { extrapolateRight: "clamp" });

  // 뉴런 드롭 애니메이션
  const dropPhase = Math.floor((frame - 210) / 60) % 3;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-8/scene5.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: "#a855f7",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        Dropout
      </h1>

      <div style={{ display: "flex", gap: 35 }}>
        {/* 왼쪽: 개념과 시각화 */}
        <div style={{ flex: 1 }}>
          {/* 개념 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 16,
              marginBottom: 20,
              opacity: conceptOpacity,
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
              아이디어
            </div>
            <div style={{ color: colors.white, fontSize: 20 }}>
              학습 시 무작위로 뉴런을 꺼버림!
            </div>
            <div style={{ color: colors.gray[400], fontSize: 18, marginTop: 10 }}>
              특정 뉴런에 의존하지 않게 됨
            </div>
          </div>

          {/* 시각화 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 16,
              opacity: visualOpacity,
            }}
          >
            <svg width="100%" height="180" viewBox="0 0 350 180">
              {/* 입력층 */}
              <circle cx="50" cy="50" r="20" fill="#22c55e" />
              <circle cx="50" cy="100" r="20" fill="#22c55e" />
              <circle cx="50" cy="150" r="20" fill="#22c55e" />

              {/* 은닉층 (일부 드롭) */}
              <circle cx="175" cy="40" r="20" fill={dropPhase === 0 ? colors.gray[600] : "#fbbf24"} opacity={dropPhase === 0 ? 0.3 : 1} />
              <circle cx="175" cy="90" r="20" fill={dropPhase === 1 ? colors.gray[600] : "#fbbf24"} opacity={dropPhase === 1 ? 0.3 : 1} />
              <circle cx="175" cy="140" r="20" fill={dropPhase === 2 ? colors.gray[600] : "#fbbf24"} opacity={dropPhase === 2 ? 0.3 : 1} />

              {/* X 표시 */}
              {dropPhase === 0 && (
                <>
                  <line x1="160" y1="25" x2="190" y2="55" stroke="#f87171" strokeWidth="3" />
                  <line x1="190" y1="25" x2="160" y2="55" stroke="#f87171" strokeWidth="3" />
                </>
              )}
              {dropPhase === 1 && (
                <>
                  <line x1="160" y1="75" x2="190" y2="105" stroke="#f87171" strokeWidth="3" />
                  <line x1="190" y1="75" x2="160" y2="105" stroke="#f87171" strokeWidth="3" />
                </>
              )}
              {dropPhase === 2 && (
                <>
                  <line x1="160" y1="125" x2="190" y2="155" stroke="#f87171" strokeWidth="3" />
                  <line x1="190" y1="125" x2="160" y2="155" stroke="#f87171" strokeWidth="3" />
                </>
              )}

              {/* 출력층 */}
              <circle cx="300" cy="90" r="20" fill="#60a5fa" />

              {/* 라벨 */}
              <text x="50" y="175" fill={colors.gray[400]} fontSize="12" textAnchor="middle">입력</text>
              <text x="175" y="175" fill={colors.gray[400]} fontSize="12" textAnchor="middle">은닉층</text>
              <text x="300" y="175" fill={colors.gray[400]} fontSize="12" textAnchor="middle">출력</text>
            </svg>

            <div style={{ color: colors.gray[400], fontSize: 16, textAlign: "center" }}>
              매번 다른 뉴런이 드롭됨 (p=0.2~0.5)
            </div>
          </div>
        </div>

        {/* 오른쪽: 코드와 주의 */}
        <div style={{ flex: 1 }}>
          {/* 코드 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 20,
              borderRadius: 16,
              marginBottom: 15,
              opacity: codeOpacity,
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
              PyTorch 구현
            </div>
            <div
              style={{
                backgroundColor: "#1e1e1e",
                padding: 15,
                borderRadius: 10,
                fontFamily: "monospace",
              }}
            >
              <div style={{ color: colors.white, fontSize: 16 }}>
                self.dropout = nn.Dropout(<span style={{ color: "#fbbf24" }}>p=0.5</span>)
              </div>
              <div style={{ color: colors.gray[500], fontSize: 14, marginTop: 5 }}>
                # 50% 뉴런 드롭
              </div>
            </div>
          </div>

          {/* 주의 */}
          <div
            style={{
              backgroundColor: "#f8717120",
              border: "2px solid #f87171",
              padding: 20,
              borderRadius: 16,
              opacity: warningOpacity,
            }}
          >
            <div style={{ color: "#f87171", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
              중요!
            </div>
            <div style={{ color: colors.white, fontSize: 18, marginBottom: 10 }}>
              • 훈련: 드롭아웃 ON
            </div>
            <div style={{ color: colors.white, fontSize: 18, marginBottom: 10 }}>
              • 테스트: 드롭아웃 OFF
            </div>
            <div
              style={{
                backgroundColor: colors.gray[900],
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <code style={{ color: "#22c55e", fontSize: 16 }}>
                model.eval()  # 테스트 모드
              </code>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
