/**
 * Scene 6: PyTorch 코드
 * 옵티마이저 비교 및 실습
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_PyTorchCode: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 코드 블록들
  const sgdOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const momentumOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const adamOpacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });

  // 학습 루프
  const loopOpacity = interpolate(frame, [360, 390], [0, 1], { extrapolateRight: "clamp" });

  // 메시지
  const tipOpacity = interpolate(frame, [500, 530], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-3/scene6.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        💻 PyTorch 옵티마이저 비교
      </h1>

      <div style={{ display: "flex", gap: 30 }}>
        {/* 왼쪽: 옵티마이저들 */}
        <div style={{ flex: 1 }}>
          {/* 기본 SGD */}
          <div
            style={{
              backgroundColor: "#1e1e1e",
              padding: 18,
              borderRadius: 12,
              marginBottom: 15,
              border: "2px solid #f87171",
              opacity: sgdOpacity,
            }}
          >
            <div style={{ color: "#f87171", fontSize: 18, marginBottom: 8 }}>
              기본 SGD
            </div>
            <pre style={{ color: colors.white, fontSize: 17, margin: 0 }}>
              <span style={{ color: "#569cd6" }}>optimizer</span> = torch.optim.SGD(
              {"\n"}    model.parameters(),
              {"\n"}    lr=<span style={{ color: "#b5cea8" }}>0.01</span>
              {"\n"})
            </pre>
          </div>

          {/* Momentum SGD */}
          <div
            style={{
              backgroundColor: "#1e1e1e",
              padding: 18,
              borderRadius: 12,
              marginBottom: 15,
              border: "2px solid #22c55e",
              opacity: momentumOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 18, marginBottom: 8 }}>
              SGD + Momentum
            </div>
            <pre style={{ color: colors.white, fontSize: 17, margin: 0 }}>
              <span style={{ color: "#569cd6" }}>optimizer</span> = torch.optim.SGD(
              {"\n"}    model.parameters(),
              {"\n"}    lr=<span style={{ color: "#b5cea8" }}>0.01</span>,
              {"\n"}    <span style={{ color: "#ce9178" }}>momentum=0.9</span>
              {"\n"})
            </pre>
          </div>

          {/* Adam */}
          <div
            style={{
              backgroundColor: "#1e1e1e",
              padding: 18,
              borderRadius: 12,
              border: "2px solid #a855f7",
              opacity: adamOpacity,
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 18, marginBottom: 8 }}>
              Adam ⭐
            </div>
            <pre style={{ color: colors.white, fontSize: 17, margin: 0 }}>
              <span style={{ color: "#569cd6" }}>optimizer</span> = torch.optim.<span style={{ color: "#a855f7" }}>Adam</span>(
              {"\n"}    model.parameters(),
              {"\n"}    lr=<span style={{ color: "#b5cea8" }}>0.001</span>
              {"\n"})
            </pre>
          </div>
        </div>

        {/* 오른쪽: 학습 루프 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: "#1e1e1e",
              padding: 22,
              borderRadius: 16,
              border: "2px solid #60a5fa",
              opacity: loopOpacity,
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 20, marginBottom: 12 }}>
              학습 루프 (공통)
            </div>
            <pre style={{ color: colors.white, fontSize: 18, margin: 0, lineHeight: 1.5 }}>
              <span style={{ color: "#c586c0" }}>for</span> epoch <span style={{ color: "#c586c0" }}>in</span> range(epochs):
              {"\n"}    <span style={{ color: "#c586c0" }}>for</span> x, y <span style={{ color: "#c586c0" }}>in</span> dataloader:
              {"\n"}        <span style={{ color: "#6a9955" }}># 1. 기울기 초기화</span>
              {"\n"}        optimizer.<span style={{ color: "#dcdcaa" }}>zero_grad</span>()
              {"\n"}
              {"\n"}        <span style={{ color: "#6a9955" }}># 2. 순전파</span>
              {"\n"}        pred = <span style={{ color: "#dcdcaa" }}>model</span>(x)
              {"\n"}        loss = <span style={{ color: "#dcdcaa" }}>criterion</span>(pred, y)
              {"\n"}
              {"\n"}        <span style={{ color: "#6a9955" }}># 3. 역전파</span>
              {"\n"}        loss.<span style={{ color: "#dcdcaa" }}>backward</span>()
              {"\n"}
              {"\n"}        <span style={{ color: "#6a9955" }}># 4. 가중치 업데이트</span>
              {"\n"}        optimizer.<span style={{ color: "#dcdcaa" }}>step</span>()
            </pre>
          </div>

          {/* 팁 */}
          <div
            style={{
              backgroundColor: "#fbbf2420",
              border: "2px solid #fbbf24",
              padding: 18,
              borderRadius: 12,
              marginTop: 20,
              textAlign: "center",
              opacity: tipOpacity,
            }}
          >
            <div style={{ color: "#fbbf24", fontSize: 22, fontWeight: "bold" }}>
              💡 한 줄만 바꾸면 다른 옵티마이저 실험 가능!
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
