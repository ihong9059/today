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

export const L03_Scene7_Outro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  const tableSpring = spring({
    frame: frame - 60,
    fps: FPS,
    config: { damping: 15, stiffness: 100 },
  });

  const summaryItems = [
    { concept: "for + range", aiRole: "Epoch 반복", code: "for epoch in range(100):" },
    { concept: "중첩 for", aiRole: "Batch 처리", code: "for batch in dataloader:" },
    { concept: "if", aiRole: "조건부 저장/종료", code: "if val_loss < best:" },
    { concept: "break", aiRole: "Early Stopping", code: "if patience > 10: break" },
    { concept: "while", aiRole: "목표 기반 학습", code: "while accuracy < 0.95:" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a2f4a 50%, ${colors.gray[900]} 100%)`,
        padding: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 제목 */}
      <div
        style={{
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 56, color: colors.white, margin: 0 }}>
          ✅ 정리: 핵심만 기억하세요!
        </h2>
      </div>

      {/* 요약 테이블 */}
      <div
        style={{
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          transform: `scale(${tableSpring})`,
          backgroundColor: colors.gray[800],
          borderRadius: 20,
          padding: 30,
          width: "90%",
          maxWidth: 1200,
        }}
      >
        {/* 테이블 헤더 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr 2fr",
            gap: 20,
            padding: "15px 20px",
            backgroundColor: colors.level[0],
            borderRadius: 12,
            marginBottom: 15,
          }}
        >
          <div style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>개념</div>
          <div style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>AI에서의 역할</div>
          <div style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>코드 패턴</div>
        </div>

        {/* 테이블 행 */}
        {summaryItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              opacity: interpolate(frame, [80 + idx * 30, 110 + idx * 30], [0, 1], { extrapolateRight: "clamp" }),
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr 2fr",
              gap: 20,
              padding: "15px 20px",
              backgroundColor: idx % 2 === 0 ? colors.gray[700] : colors.gray[750],
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 20, fontWeight: "bold" }}>{item.concept}</div>
            <div style={{ color: colors.gray[300], fontSize: 20 }}>{item.aiRole}</div>
            <div style={{ color: "#f97316", fontSize: 18, fontFamily: "monospace" }}>{item.code}</div>
          </div>
        ))}
      </div>

      {/* AI에게 물어보세요 */}
      <div
        style={{
          opacity: interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" }),
          marginTop: 40,
          padding: 25,
          backgroundColor: "#3b82f620",
          borderRadius: 16,
          border: "2px solid #3b82f6",
          width: "90%",
          maxWidth: 1200,
        }}
      >
        <div style={{ color: "#3b82f6", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
          💬 잊어버렸다면? AI에게 물어보세요!
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 15 }}>
          {[
            "PyTorch에서 학습 루프 코드 작성해줘",
            "Early Stopping 구현 방법 알려줘",
            "for문으로 배치 처리하는 방법?",
            "학습률 스케줄링 코드 예시",
          ].map((query, idx) => (
            <div
              key={idx}
              style={{
                padding: "10px 20px",
                backgroundColor: colors.gray[800],
                borderRadius: 25,
                color: colors.gray[300],
                fontSize: 16,
              }}
            >
              "{query}"
            </div>
          ))}
        </div>
      </div>

      {/* 핵심 메시지 */}
      <div
        style={{
          opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" }),
          marginTop: 40,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 32,
            color: "#fbbf24",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          문법은 잊어도 됩니다.<br/>
          "AI 학습은 반복문 안에서 일어난다"는 것만 기억하세요!
        </p>
      </div>

      {/* 다음 레슨 예고 */}
      <div
        style={{
          opacity: interpolate(frame, [800, 830], [0, 1], { extrapolateRight: "clamp" }),
          marginTop: 40,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 40 }}>👉</span>
        <div>
          <div style={{ color: colors.gray[400], fontSize: 18 }}>다음 레슨</div>
          <div style={{ color: colors.white, fontSize: 28, fontWeight: "bold" }}>
            레슨 0-4: 함수 - AI의 핵심 빌딩 블록
          </div>
        </div>
      </div>

      {/* 마무리 */}
      <div
        style={{
          opacity: interpolate(frame, [durationInFrames - 200, durationInFrames - 100], [0, 1], { extrapolateRight: "clamp" }),
          marginTop: 40,
          fontSize: 36,
          color: colors.white,
        }}
      >
        감사합니다! 🙏
      </div>
    </AbsoluteFill>
  );
};
