/**
 * Scene 6: PyTorch 코드
 * 실제 구현 방법
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_PyTorchCode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 코드 블록 애니메이션
  const code1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const code2Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });

  // 단계 설명
  const step1Opacity = interpolate(frame, [300, 330], [0, 1], { extrapolateRight: "clamp" });
  const step2Opacity = interpolate(frame, [390, 420], [0, 1], { extrapolateRight: "clamp" });
  const step3Opacity = interpolate(frame, [480, 510], [0, 1], { extrapolateRight: "clamp" });
  const step4Opacity = interpolate(frame, [570, 600], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[900],
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-2/scene6.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        🔥 PyTorch로 구현하기
      </h1>

      <div style={{ display: "flex", gap: 40 }}>
        {/* 왼쪽: 코드 */}
        <div style={{ flex: 1 }}>
          {/* 옵티마이저 설정 */}
          <div
            style={{
              backgroundColor: "#1e293b",
              padding: "20px 25px",
              borderRadius: 12,
              border: "1px solid #334155",
              marginBottom: 20,
              opacity: code1Opacity,
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 18, marginBottom: 12 }}># 옵티마이저 설정</div>
            <pre style={{ margin: 0, fontSize: 20, lineHeight: 1.5 }}>
              <code>
                <span style={{ color: "#c084fc" }}>optimizer</span>
                <span style={{ color: colors.gray[400] }}> = </span>
                <span style={{ color: "#fbbf24" }}>torch.optim.SGD</span>
                <span style={{ color: colors.gray[400] }}>(</span>
                {"\n"}
                <span style={{ color: colors.gray[400] }}>    </span>
                <span style={{ color: colors.white }}>model.parameters()</span>
                <span style={{ color: colors.gray[400] }}>,</span>
                {"\n"}
                <span style={{ color: colors.gray[400] }}>    </span>
                <span style={{ color: "#f87171" }}>lr</span>
                <span style={{ color: colors.gray[400] }}>=</span>
                <span style={{ color: "#22c55e" }}>0.001</span>
                {"\n"}
                <span style={{ color: colors.gray[400] }}>)</span>
              </code>
            </pre>
          </div>

          {/* 학습 루프 */}
          <div
            style={{
              backgroundColor: "#1e293b",
              padding: "20px 25px",
              borderRadius: 12,
              border: "1px solid #334155",
              opacity: code2Opacity,
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 18, marginBottom: 12 }}># 학습 루프</div>
            <pre style={{ margin: 0, fontSize: 18, lineHeight: 1.6 }}>
              <code>
                <span style={{ color: "#c084fc" }}>for</span>
                <span style={{ color: colors.white }}> epoch </span>
                <span style={{ color: "#c084fc" }}>in</span>
                <span style={{ color: colors.white }}> range(100):</span>
                {"\n"}
                <span style={{ color: "#6b7280" }}>    # 1. 기울기 초기화</span>
                {"\n"}
                <span style={{ color: colors.white }}>    optimizer.</span>
                <span style={{ color: "#fbbf24" }}>zero_grad</span>
                <span style={{ color: colors.white }}>()</span>
                {"\n\n"}
                <span style={{ color: "#6b7280" }}>    # 2. 순전파 + 손실 계산</span>
                {"\n"}
                <span style={{ color: colors.white }}>    pred = model(x)</span>
                {"\n"}
                <span style={{ color: colors.white }}>    loss = criterion(pred, y)</span>
                {"\n\n"}
                <span style={{ color: "#6b7280" }}>    # 3. 역전파 (기울기 계산)</span>
                {"\n"}
                <span style={{ color: colors.white }}>    loss.</span>
                <span style={{ color: "#f87171" }}>backward</span>
                <span style={{ color: colors.white }}>()</span>
                {"\n\n"}
                <span style={{ color: "#6b7280" }}>    # 4. 가중치 업데이트</span>
                {"\n"}
                <span style={{ color: colors.white }}>    optimizer.</span>
                <span style={{ color: "#22c55e" }}>step</span>
                <span style={{ color: colors.white }}>()</span>
              </code>
            </pre>
          </div>
        </div>

        {/* 오른쪽: 단계 설명 */}
        <div style={{ width: 380 }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "18px 22px",
              borderRadius: 12,
              marginBottom: 15,
              opacity: step1Opacity,
              borderLeft: "4px solid #c084fc",
            }}
          >
            <div style={{ color: "#c084fc", fontSize: 20, fontWeight: "bold" }}>① zero_grad()</div>
            <div style={{ color: colors.gray[300], fontSize: 17, marginTop: 6 }}>
              이전 기울기 초기화
            </div>
          </div>

          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "18px 22px",
              borderRadius: 12,
              marginBottom: 15,
              opacity: step2Opacity,
              borderLeft: "4px solid #60a5fa",
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 20, fontWeight: "bold" }}>② 순전파 + 손실</div>
            <div style={{ color: colors.gray[300], fontSize: 17, marginTop: 6 }}>
              예측값 계산 → 손실 계산
            </div>
          </div>

          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "18px 22px",
              borderRadius: 12,
              marginBottom: 15,
              opacity: step3Opacity,
              borderLeft: "4px solid #f87171",
            }}
          >
            <div style={{ color: "#f87171", fontSize: 20, fontWeight: "bold" }}>③ backward()</div>
            <div style={{ color: colors.gray[300], fontSize: 17, marginTop: 6 }}>
              역전파로 기울기 계산
            </div>
          </div>

          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "18px 22px",
              borderRadius: 12,
              opacity: step4Opacity,
              borderLeft: "4px solid #22c55e",
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 20, fontWeight: "bold" }}>④ step()</div>
            <div style={{ color: colors.gray[300], fontSize: 17, marginTop: 6 }}>
              w = w - lr × gradient
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
