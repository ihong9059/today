import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L03_Scene4_LRSchedule: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const currentEpoch = Math.min(Math.floor(interpolate(frame, [200, 900], [0, 100], { extrapolateRight: "clamp" })), 99);

  // 학습률 계산
  const getLearningRate = (epoch: number) => {
    const base = 0.01;
    const decayFactor = Math.pow(0.1, Math.floor(epoch / 30));
    return base * decayFactor;
  };

  const currentLR = getLearningRate(currentEpoch);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1f2937 100%)`,
        padding: 60,
      }}
    >
      {/* 제목 */}
      <div
        style={{
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
          marginBottom: 40,
        }}
      >
        <h2 style={{ fontSize: 48, color: colors.white, margin: 0 }}>
          📉 조건문 활용 - 학습률 스케줄링
        </h2>
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
              fontSize: 22,
              lineHeight: 2,
            }}
          >
            <div style={{ color: "#94a3b8", marginBottom: 10 }}># 학습률 감소</div>

            <div
              style={{
                backgroundColor: currentEpoch > 0 && currentEpoch % 30 === 0 ? "#22c55e20" : "transparent",
                padding: "5px 10px",
                borderRadius: 8,
                marginLeft: -10,
              }}
            >
              <span style={{ color: "#c084fc" }}>if</span>
              <span style={{ color: colors.white }}> epoch % 30 == 0 </span>
              <span style={{ color: "#c084fc" }}>and</span>
              <span style={{ color: colors.white }}> epoch &gt; 0:</span>
            </div>

            <div style={{ marginLeft: 30 }}>
              <span style={{ color: colors.white }}>learning_rate *= 0.1</span>
            </div>

            <div style={{ marginTop: 40, color: "#94a3b8" }}># 모델 저장 조건</div>

            <div
              style={{
                backgroundColor: frame > 600 ? "#3b82f620" : "transparent",
                padding: "5px 10px",
                borderRadius: 8,
                marginLeft: -10,
              }}
            >
              <span style={{ color: "#c084fc" }}>if</span>
              <span style={{ color: colors.white }}> loss &lt; 0.01:</span>
            </div>

            <div style={{ marginLeft: 30 }}>
              <span style={{ color: colors.white }}>torch.save(model, </span>
              <span style={{ color: "#22c55e" }}>'best.pt'</span>
              <span style={{ color: colors.white }}>)</span>
            </div>
          </div>

          {/* 설명 */}
          <div
            style={{
              opacity: interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" }),
              marginTop: 30,
              padding: 20,
              backgroundColor: "#8b5cf620",
              borderRadius: 12,
              border: "1px solid #8b5cf6",
            }}
          >
            <div style={{ color: "#8b5cf6", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              💡 왜 학습률을 줄일까?
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18, lineHeight: 1.6 }}>
              처음에는 빠르게 학습하고,<br/>
              후반에는 섬세하게 조절합니다!
            </div>
          </div>
        </div>

        {/* 오른쪽: 시각화 */}
        <div
          style={{
            flex: 1,
            opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {/* 현재 상태 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 30,
              marginBottom: 30,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ color: colors.gray[300], fontSize: 22 }}>현재 Epoch</span>
              <span style={{ color: "#22c55e", fontSize: 28, fontFamily: "monospace", fontWeight: "bold" }}>
                {currentEpoch}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: colors.gray[300], fontSize: 22 }}>Learning Rate</span>
              <span style={{ color: "#f97316", fontSize: 28, fontFamily: "monospace", fontWeight: "bold" }}>
                {currentLR.toFixed(4)}
              </span>
            </div>
          </div>

          {/* 학습률 스케줄 시각화 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 30,
            }}
          >
            <div style={{ color: colors.white, fontSize: 22, marginBottom: 20 }}>
              학습률 변화
            </div>

            <div style={{ display: "flex", alignItems: "end", height: 200, gap: 4 }}>
              {Array.from({ length: 100 }).map((_, i) => {
                const lr = getLearningRate(i);
                const height = (Math.log10(lr) + 4) * 50; // 로그 스케일
                const isHighlighted = i === currentEpoch;
                const isPast = i < currentEpoch;

                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: Math.max(height, 5),
                      backgroundColor: isHighlighted ? "#f97316" : (isPast ? "#3b82f6" : colors.gray[600]),
                      borderRadius: 2,
                      transition: "background-color 0.1s",
                    }}
                  />
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <span style={{ color: colors.gray[400], fontSize: 14 }}>Epoch 0</span>
              <span style={{ color: colors.gray[400], fontSize: 14 }}>30</span>
              <span style={{ color: colors.gray[400], fontSize: 14 }}>60</span>
              <span style={{ color: colors.gray[400], fontSize: 14 }}>90</span>
            </div>

            {/* 감소 포인트 표시 */}
            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: 20,
                flexWrap: "wrap",
              }}
            >
              {[0, 30, 60, 90].map((epoch) => (
                <div
                  key={epoch}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: currentEpoch >= epoch ? "#22c55e20" : colors.gray[700],
                    borderRadius: 8,
                    border: `1px solid ${currentEpoch >= epoch ? "#22c55e" : colors.gray[600]}`,
                  }}
                >
                  <span style={{ color: colors.gray[300], fontSize: 14 }}>Epoch {epoch}: </span>
                  <span style={{ color: "#f97316", fontSize: 14, fontFamily: "monospace" }}>
                    {getLearningRate(epoch).toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
