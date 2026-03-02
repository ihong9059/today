import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L03_Scene3_EarlyStopping: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  // 시뮬레이션: 손실값 변화
  const lossData = Array.from({ length: 30 }, (_, i) => ({
    epoch: i,
    trainLoss: 1.0 * Math.exp(-i * 0.08) + 0.05,
    valLoss: 1.0 * Math.exp(-i * 0.06) + (i > 15 ? (i - 15) * 0.015 : 0) + 0.08,
  }));

  const currentDataPoint = Math.min(Math.floor(interpolate(frame, [200, 1200], [0, 30], { extrapolateRight: "clamp" })), 29);
  const showOverfit = frame > 800;
  const showEarlyStopping = frame > 1200;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1a2535 100%)`,
        padding: 60,
      }}
    >
      {/* 제목 */}
      <div
        style={{
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
          marginBottom: 30,
        }}
      >
        <h2 style={{ fontSize: 48, color: colors.white, margin: 0 }}>
          🎯 조건문 (if) - Early Stopping
        </h2>
        <p style={{ fontSize: 24, color: colors.gray[400], margin: "15px 0 0 0" }}>
          과적합을 방지하는 핵심 기법
        </p>
      </div>

      <div style={{ display: "flex", gap: 60 }}>
        {/* 왼쪽: 코드 */}
        <div
          style={{
            flex: 1,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: 16,
              padding: 30,
              fontFamily: "monospace",
              fontSize: 20,
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: "#94a3b8", marginBottom: 10 }}># Early Stopping 구현</div>

            <div style={{ color: colors.white }}>
              <span style={{ color: "#c084fc" }}>if</span> val_loss &lt; best_loss:
            </div>
            <div
              style={{
                marginLeft: 30,
                backgroundColor: frame > 300 && !showOverfit ? "#22c55e20" : "transparent",
                padding: "2px 8px",
                borderRadius: 4,
              }}
            >
              <div style={{ color: colors.white }}>best_loss = val_loss</div>
              <div style={{ color: colors.white }}>save_model()</div>
              <div style={{ color: colors.white }}>patience = 0</div>
            </div>

            <div style={{ color: "#c084fc" }}>else:</div>
            <div
              style={{
                marginLeft: 30,
                backgroundColor: showOverfit ? "#ef444420" : "transparent",
                padding: "2px 8px",
                borderRadius: 4,
              }}
            >
              <div style={{ color: colors.white }}>patience += 1</div>
            </div>

            <div style={{ marginTop: 20 }} />

            <div
              style={{
                backgroundColor: showEarlyStopping ? "#f9731620" : "transparent",
                padding: "5px 10px",
                borderRadius: 8,
                marginLeft: -10,
              }}
            >
              <div style={{ color: colors.white }}>
                <span style={{ color: "#c084fc" }}>if</span> patience &gt; 10:
              </div>
              <div style={{ marginLeft: 30 }}>
                <div style={{ color: "#22c55e" }}>print("Early stopping!")</div>
                <div style={{ color: "#f97316" }}>break</div>
              </div>
            </div>
          </div>

          {/* 설명 박스 */}
          <div
            style={{
              opacity: interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" }),
              marginTop: 30,
              padding: 20,
              backgroundColor: colors.gray[800],
              borderRadius: 12,
            }}
          >
            <div style={{ color: colors.white, fontSize: 20, marginBottom: 15 }}>
              💡 왜 Early Stopping이 필요할까?
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18, lineHeight: 1.6 }}>
              더 오래 학습해도 오히려 성능이 나빠집니다.<br/>
              검증 손실이 증가하기 시작하면 멈춰야 합니다!
            </div>
          </div>
        </div>

        {/* 오른쪽: 그래프 */}
        <div
          style={{
            flex: 1,
            opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 30,
              height: 400,
              position: "relative",
            }}
          >
            <div style={{ color: colors.white, fontSize: 22, marginBottom: 20 }}>
              Loss Curve
            </div>

            {/* 그래프 영역 */}
            <div
              style={{
                position: "relative",
                height: 300,
                borderLeft: `2px solid ${colors.gray[600]}`,
                borderBottom: `2px solid ${colors.gray[600]}`,
                marginLeft: 40,
              }}
            >
              {/* Y축 레이블 */}
              <div style={{ position: "absolute", left: -40, top: 0, color: colors.gray[400], fontSize: 14 }}>1.0</div>
              <div style={{ position: "absolute", left: -40, bottom: 0, color: colors.gray[400], fontSize: 14 }}>0.0</div>
              <div style={{ position: "absolute", left: -55, top: "50%", color: colors.gray[400], fontSize: 14, transform: "rotate(-90deg)" }}>Loss</div>

              {/* X축 레이블 */}
              <div style={{ position: "absolute", bottom: -25, left: 0, color: colors.gray[400], fontSize: 14 }}>0</div>
              <div style={{ position: "absolute", bottom: -25, right: 0, color: colors.gray[400], fontSize: 14 }}>30</div>
              <div style={{ position: "absolute", bottom: -25, left: "50%", transform: "translateX(-50%)", color: colors.gray[400], fontSize: 14 }}>Epoch</div>

              {/* Train Loss 선 */}
              <svg
                style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}
              >
                <polyline
                  points={lossData.slice(0, currentDataPoint + 1).map((d, i) =>
                    `${(i / 29) * 100}%,${(1 - d.trainLoss) * 100}%`
                  ).join(" ")}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
              </svg>

              {/* Val Loss 선 */}
              <svg
                style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}
              >
                <polyline
                  points={lossData.slice(0, currentDataPoint + 1).map((d, i) =>
                    `${(i / 29) * 100}%,${(1 - d.valLoss) * 100}%`
                  ).join(" ")}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3"
                />
              </svg>

              {/* 과적합 시작점 표시 */}
              {showOverfit && (
                <div
                  style={{
                    position: "absolute",
                    left: `${(15 / 29) * 100}%`,
                    top: 0,
                    width: 2,
                    height: "100%",
                    borderLeft: "2px dashed #ef4444",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -30,
                      left: 10,
                      color: "#ef4444",
                      fontSize: 14,
                      whiteSpace: "nowrap",
                    }}
                  >
                    과적합 시작!
                  </div>
                </div>
              )}
            </div>

            {/* 범례 */}
            <div style={{ display: "flex", gap: 30, marginTop: 30, marginLeft: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 20, height: 3, backgroundColor: "#3b82f6" }} />
                <span style={{ color: colors.gray[300], fontSize: 16 }}>Train Loss</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 20, height: 3, backgroundColor: "#f97316" }} />
                <span style={{ color: colors.gray[300], fontSize: 16 }}>Validation Loss</span>
              </div>
            </div>
          </div>

          {/* 상태 표시 */}
          <div
            style={{
              marginTop: 30,
              padding: 20,
              backgroundColor: showEarlyStopping ? "#22c55e20" : (showOverfit ? "#ef444420" : colors.gray[800]),
              borderRadius: 12,
              border: `2px solid ${showEarlyStopping ? "#22c55e" : (showOverfit ? "#ef4444" : colors.gray[700])}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
              <span style={{ fontSize: 40 }}>
                {showEarlyStopping ? "⏹️" : (showOverfit ? "⚠️" : "📈")}
              </span>
              <div>
                <div style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>
                  {showEarlyStopping ? "Early Stopping!" : (showOverfit ? "과적합 감지!" : "학습 진행 중...")}
                </div>
                <div style={{ color: colors.gray[300], fontSize: 16 }}>
                  {showEarlyStopping
                    ? "최적의 시점에서 학습 종료"
                    : (showOverfit ? "Val Loss가 증가하기 시작" : "Train Loss와 Val Loss 모두 감소")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
