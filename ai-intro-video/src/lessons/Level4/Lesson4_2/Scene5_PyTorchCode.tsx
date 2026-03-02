/**
 * Scene 5: PyTorch CNN 코드
 * CIFAR-10 분류 모델
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_PyTorchCode: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const codeOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const structureOpacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });

  // 코드 하이라이트 애니메이션
  const highlightLine = interpolate(frame, [150, 700], [0, 12], { extrapolateRight: "clamp" });

  const codeLines = [
    { text: "class CIFAR10CNN(nn.Module):", color: "#ff79c6" },
    { text: "    def __init__(self):", color: "#ff79c6" },
    { text: "        super().__init__()", color: colors.gray[100] },
    { text: "        # 합성곱층", color: "#6272a4" },
    { text: "        self.conv1 = nn.Conv2d(3, 16, 3, padding=1)", color: colors.gray[100] },
    { text: "        self.conv2 = nn.Conv2d(16, 32, 3, padding=1)", color: colors.gray[100] },
    { text: "        self.pool = nn.MaxPool2d(2, 2)", color: colors.gray[100] },
    { text: "        # 완전연결층", color: "#6272a4" },
    { text: "        self.fc1 = nn.Linear(32 * 8 * 8, 128)", color: colors.gray[100] },
    { text: "        self.fc2 = nn.Linear(128, 10)", color: colors.gray[100] },
    { text: "", color: colors.gray[100] },
    { text: "    def forward(self, x):", color: "#ff79c6" },
    { text: "        x = self.pool(F.relu(self.conv1(x)))  # 32→16", color: colors.gray[100] },
    { text: "        x = self.pool(F.relu(self.conv2(x)))  # 16→8", color: colors.gray[100] },
    { text: "        x = x.view(-1, 32 * 8 * 8)  # Flatten", color: colors.gray[100] },
    { text: "        x = F.relu(self.fc1(x))", color: colors.gray[100] },
    { text: "        return self.fc2(x)", color: colors.gray[100] },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #7c2d12 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-2/scene5.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 52,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        PyTorch CNN 구현
      </h2>

      <div style={{ display: "flex", gap: 50, width: "100%", maxWidth: 1600 }}>
        {/* 코드 블록 */}
        <div
          style={{
            flex: 2,
            opacity: codeOpacity,
            backgroundColor: "#1e1e3f",
            borderRadius: 12,
            padding: 25,
            fontFamily: "monospace",
            fontSize: 20,
            border: `2px solid ${colors.level[4]}`,
            lineHeight: 1.6,
          }}
        >
          {codeLines.map((line, i) => (
            <div
              key={i}
              style={{
                color: line.color,
                backgroundColor: Math.floor(highlightLine) === i ? "rgba(249, 115, 22, 0.2)" : "transparent",
                padding: "2px 5px",
                borderRadius: 4,
              }}
            >
              {line.text || " "}
            </div>
          ))}
        </div>

        {/* 구조 시각화 */}
        <div
          style={{
            flex: 1,
            opacity: structureOpacity,
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
        >
          <h3 style={{ color: colors.white, fontSize: 28, marginBottom: 10 }}>네트워크 구조</h3>

          {/* 입력 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 15,
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 16 }}>Input</div>
            <div style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>32×32×3</div>
          </div>

          {/* Conv1 + Pool */}
          <div
            style={{
              backgroundColor: "rgba(249, 115, 22, 0.2)",
              padding: 15,
              borderRadius: 8,
              border: `1px solid ${colors.level[4]}`,
            }}
          >
            <div style={{ color: colors.level[4], fontSize: 18, fontWeight: "bold" }}>Conv1 → ReLU → Pool</div>
            <div style={{ color: colors.white, fontSize: 16 }}>3 → 16 채널, 32→16 크기</div>
          </div>

          {/* Conv2 + Pool */}
          <div
            style={{
              backgroundColor: "rgba(249, 115, 22, 0.2)",
              padding: 15,
              borderRadius: 8,
              border: `1px solid ${colors.level[4]}`,
            }}
          >
            <div style={{ color: colors.level[4], fontSize: 18, fontWeight: "bold" }}>Conv2 → ReLU → Pool</div>
            <div style={{ color: colors.white, fontSize: 16 }}>16 → 32 채널, 16→8 크기</div>
          </div>

          {/* Flatten */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 15,
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 18, fontWeight: "bold" }}>Flatten</div>
            <div style={{ color: colors.white, fontSize: 16 }}>32×8×8 = 2048</div>
          </div>

          {/* FC */}
          <div
            style={{
              backgroundColor: "rgba(168, 85, 247, 0.2)",
              padding: 15,
              borderRadius: 8,
              border: "1px solid #a855f7",
            }}
          >
            <div style={{ color: "#a855f7", fontSize: 18, fontWeight: "bold" }}>FC1 → ReLU → FC2</div>
            <div style={{ color: colors.white, fontSize: 16 }}>2048 → 128 → 10</div>
          </div>

          {/* 출력 */}
          <div
            style={{
              backgroundColor: "#22c55e",
              padding: 15,
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            <div style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>10 클래스 출력</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
