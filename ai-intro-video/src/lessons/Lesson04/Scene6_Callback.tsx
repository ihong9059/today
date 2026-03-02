import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors } from "../../styles";

interface Props {
  durationInFrames: number;
}

export const L04_Scene6_Callback: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const callbacks = [
    {
      name: "EarlyStopping",
      desc: "과적합 감지 시 학습 조기 종료",
      icon: "🛑",
      color: "#ef4444",
      delay: 350,
    },
    {
      name: "ModelCheckpoint",
      desc: "최고의 모델 자동 저장",
      icon: "💾",
      color: "#3b82f6",
      delay: 420,
    },
    {
      name: "LearningRateScheduler",
      desc: "학습률 동적 조절",
      icon: "📈",
      color: "#22c55e",
      delay: 490,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        padding: 60,
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: 48,
          color: colors.white,
          marginBottom: 30,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        🔔 콜백 함수 (Callback)
      </h2>

      <div style={{ display: "flex", gap: 50 }}>
        {/* Left: Callback definition */}
        <div style={{ flex: 1 }}>
          {/* Definition */}
          <div
            style={{
              backgroundColor: "#8b5cf620",
              border: "2px solid #8b5cf6",
              borderRadius: 16,
              padding: 25,
              marginBottom: 30,
              opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: "#8b5cf6", fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
              콜백 함수란?
            </div>
            <p style={{ color: colors.gray[300], fontSize: 22, margin: 0 }}>
              특정 이벤트 발생 시 <span style={{ color: "#8b5cf6" }}>자동으로 호출</span>되는 함수
            </p>
          </div>

          {/* Custom callback example */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              marginBottom: 20,
              opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 18, marginBottom: 15 }}>
              예시: 에포크 종료 시 로그 출력
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 18, color: colors.gray[300], lineHeight: 1.8 }}>
              <span style={{ color: "#22c55e" }}>def</span> on_epoch_end(epoch, logs):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#3b82f6" }}>print</span>(f"Epoch {"{epoch}"} 완료!")<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#3b82f6" }}>print</span>(f"Loss: {"{logs['loss']}"}")
            </div>
          </div>

          {/* Usage example */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 25,
              opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 18, marginBottom: 15 }}>
              콜백 사용 방법
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 16, color: colors.gray[300], lineHeight: 1.8 }}>
              callbacks = [<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#ef4444" }}>EarlyStopping</span>(patience=5),<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#3b82f6" }}>ModelCheckpoint</span>("best.h5"),<br />
              ]<br /><br />
              model.fit(data, <span style={{ color: "#8b5cf6" }}>callbacks=callbacks</span>)
            </div>
          </div>
        </div>

        {/* Right: Built-in callbacks */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: colors.gray[400],
              fontSize: 20,
              marginBottom: 20,
              opacity: interpolate(frame, [320, 350], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            🎁 Keras 내장 콜백
          </div>

          {callbacks.map((cb, idx) => {
            const cardOpacity = interpolate(
              frame,
              [cb.delay, cb.delay + 30],
              [0, 1],
              { extrapolateRight: "clamp" }
            );
            const cardX = interpolate(
              frame,
              [cb.delay, cb.delay + 30],
              [50, 0],
              { extrapolateRight: "clamp" }
            );

            return (
              <div
                key={idx}
                style={{
                  backgroundColor: colors.gray[800],
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 20,
                  border: `2px solid ${cb.color}`,
                  opacity: cardOpacity,
                  transform: `translateX(${cardX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <span style={{ fontSize: 40 }}>{cb.icon}</span>
                <div>
                  <div style={{ color: cb.color, fontSize: 22, fontWeight: "bold" }}>
                    {cb.name}
                  </div>
                  <div style={{ color: colors.gray[300], fontSize: 18, marginTop: 5 }}>
                    {cb.desc}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Connection to previous lesson */}
          <div
            style={{
              marginTop: 30,
              padding: 20,
              backgroundColor: "#f9731620",
              borderRadius: 16,
              border: "2px solid #f97316",
              opacity: interpolate(frame, [580, 610], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <p style={{ color: "#f97316", fontSize: 20, margin: 0, fontWeight: "bold" }}>
              💡 지난 레슨의 Early Stopping도 콜백!
            </p>
            <p style={{ color: colors.gray[300], fontSize: 16, margin: "10px 0 0 0" }}>
              학습 과정을 세밀하게 제어하는 강력한 도구
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
