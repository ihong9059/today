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

export const L03_Scene2_ForLoop: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // 현재 epoch 계산 (애니메이션)
  const currentEpoch = Math.floor(interpolate(frame, [300, 900], [0, 100], { extrapolateRight: "clamp" }));

  // 배치 진행률 (0-1)
  const batchProgress = (frame % 60) / 60;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.gray[900]} 0%, #1a2a3a 100%)`,
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
          🔄 반복문 (for) - AI 학습의 심장
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
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: "#94a3b8", marginBottom: 10 }}># AI 학습의 핵심 구조</div>

            {/* 첫 번째 for 문 */}
            <div
              style={{
                opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
                backgroundColor: frame > 200 ? "#22c55e20" : "transparent",
                padding: "5px 10px",
                borderRadius: 8,
                marginLeft: -10,
              }}
            >
              <span style={{ color: "#c084fc" }}>for</span>
              <span style={{ color: colors.white }}> epoch </span>
              <span style={{ color: "#c084fc" }}>in</span>
              <span style={{ color: "#60a5fa" }}> range</span>
              <span style={{ color: colors.white }}>(</span>
              <span style={{ color: "#f97316" }}>100</span>
              <span style={{ color: colors.white }}>):</span>
            </div>

            {/* 두 번째 for 문 */}
            <div
              style={{
                opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" }),
                backgroundColor: frame > 250 ? "#3b82f620" : "transparent",
                padding: "5px 10px",
                borderRadius: 8,
                marginLeft: 20,
              }}
            >
              <span style={{ color: "#c084fc" }}>for</span>
              <span style={{ color: colors.white }}> batch </span>
              <span style={{ color: "#c084fc" }}>in</span>
              <span style={{ color: colors.white }}> dataloader:</span>
            </div>

            {/* 내부 로직 */}
            <div
              style={{
                opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" }),
                marginLeft: 60,
              }}
            >
              <div style={{ color: colors.white }}>output = model(batch)</div>
              <div style={{ color: colors.white }}>loss = loss_fn(output)</div>
              <div style={{ color: colors.white }}>loss.backward()</div>
              <div style={{ color: colors.white }}>optimizer.step()</div>
            </div>
          </div>

          {/* 설명 */}
          <div
            style={{
              opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" }),
              marginTop: 30,
              color: colors.gray[300],
              fontSize: 20,
            }}
          >
            <div style={{ marginBottom: 15 }}>
              <span style={{ color: "#22c55e", fontWeight: "bold" }}>Epoch</span>: 전체 데이터를 한 번 다 보는 것
            </div>
            <div style={{ marginBottom: 15 }}>
              <span style={{ color: "#3b82f6", fontWeight: "bold" }}>Batch</span>: 한 번에 처리하는 데이터 묶음 (32, 64개)
            </div>
            <div>
              <span style={{ color: "#f97316", fontWeight: "bold" }}>Iteration</span>: 1개 배치를 처리하는 단위
            </div>
          </div>
        </div>

        {/* 오른쪽: 시각화 */}
        <div
          style={{
            flex: 1,
            opacity: interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {/* Epoch 진행 표시 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 30,
              marginBottom: 30,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
              <span style={{ color: colors.white, fontSize: 24 }}>Epoch 진행률</span>
              <span style={{ color: "#22c55e", fontSize: 24, fontFamily: "monospace" }}>{currentEpoch}/100</span>
            </div>
            <div
              style={{
                width: "100%",
                height: 30,
                backgroundColor: colors.gray[700],
                borderRadius: 15,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${currentEpoch}%`,
                  height: "100%",
                  backgroundColor: "#22c55e",
                  borderRadius: 15,
                  transition: "width 0.1s",
                }}
              />
            </div>
          </div>

          {/* Batch 시각화 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 30,
            }}
          >
            <div style={{ color: colors.white, fontSize: 24, marginBottom: 20 }}>
              데이터 배치 처리
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {Array.from({ length: 32 }).map((_, i) => {
                const isProcessed = i < Math.floor(batchProgress * 32);
                return (
                  <div
                    key={i}
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: isProcessed ? "#3b82f6" : colors.gray[700],
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      color: colors.white,
                      transition: "background-color 0.1s",
                    }}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
            <div style={{ color: colors.gray[400], fontSize: 16, marginTop: 15 }}>
              batch_size = 32
            </div>
          </div>

          {/* 왜 배치로 나누는가 */}
          <div
            style={{
              opacity: interpolate(frame, [600, 630], [0, 1], { extrapolateRight: "clamp" }),
              marginTop: 30,
              padding: 20,
              backgroundColor: "#f9731620",
              borderRadius: 12,
              border: "1px solid #f97316",
            }}
          >
            <div style={{ color: "#f97316", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              💡 왜 배치로 나눌까?
            </div>
            <div style={{ color: colors.gray[300], fontSize: 18 }}>
              수백만 개의 이미지를 한 번에 메모리에 올릴 수 없기 때문!
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
