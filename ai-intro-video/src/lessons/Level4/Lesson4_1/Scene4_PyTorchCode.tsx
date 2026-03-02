/**
 * Scene 4: PyTorch 코드 구현
 * nn.Module 클래스 정의 시각화
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_PyTorchCode: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 코드 블록 라인별 등장
  const codeLines = [
    { code: "class MNISTClassifier(nn.Module):", indent: 0, delay: 60 },
    { code: "    def __init__(self):", indent: 1, delay: 120 },
    { code: "        super().__init__()", indent: 2, delay: 150 },
    { code: "        self.fc1 = nn.Linear(784, 128)", indent: 2, delay: 210, highlight: true },
    { code: "        self.fc2 = nn.Linear(128, 64)", indent: 2, delay: 270, highlight: true },
    { code: "        self.fc3 = nn.Linear(64, 10)", indent: 2, delay: 330, highlight: true },
    { code: "", indent: 0, delay: 360 },
    { code: "    def forward(self, x):", indent: 1, delay: 390 },
    { code: "        x = x.view(-1, 784)  # Flatten", indent: 2, delay: 450 },
    { code: "        x = F.relu(self.fc1(x))", indent: 2, delay: 510, highlight: true },
    { code: "        x = F.relu(self.fc2(x))", indent: 2, delay: 570, highlight: true },
    { code: "        x = self.fc3(x)  # logits", indent: 2, delay: 630 },
    { code: "        return x", indent: 2, delay: 690 },
  ];

  // 설명 박스 애니메이션
  const linearExplainOpacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });
  const forwardExplainOpacity = interpolate(frame, [690, 720], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a1a2e 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-1/scene4.mp3")} />

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
        PyTorch 모델 구현
      </h2>

      <div style={{ display: "flex", gap: 50, width: "100%", maxWidth: 1600 }}>
        {/* 코드 블록 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#1e1e3f",
            borderRadius: 16,
            padding: 30,
            fontFamily: "monospace",
            fontSize: 22,
            border: `2px solid ${colors.level[4]}`,
          }}
        >
          {codeLines.map((line, i) => {
            const lineOpacity = interpolate(frame, [line.delay, line.delay + 30], [0, 1], { extrapolateRight: "clamp" });
            return (
              <div
                key={i}
                style={{
                  opacity: lineOpacity,
                  color: line.highlight ? "#fb923c" : colors.gray[100],
                  backgroundColor: line.highlight ? "rgba(251, 146, 60, 0.1)" : "transparent",
                  padding: "4px 8px",
                  marginLeft: line.indent * 0,
                  borderRadius: 4,
                  minHeight: 32,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* 키워드 색상 처리 */}
                <span
                  dangerouslySetInnerHTML={{
                    __html: line.code
                      .replace(/class |def /g, '<span style="color: #ff79c6">$&</span>')
                      .replace(/self\./g, '<span style="color: #bd93f9">self.</span>')
                      .replace(/nn\.|F\./g, '<span style="color: #8be9fd">$&</span>')
                      .replace(/Linear|relu|view/g, '<span style="color: #50fa7b">$&</span>')
                      .replace(/#.*/g, '<span style="color: #6272a4">$&</span>')
                      .replace(/\d+/g, '<span style="color: #f1fa8c">$&</span>'),
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 설명 패널 */}
        <div style={{ width: 400, display: "flex", flexDirection: "column", gap: 30 }}>
          {/* nn.Linear 설명 */}
          <div
            style={{
              opacity: linearExplainOpacity,
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 12,
              borderLeft: `4px solid ${colors.level[4]}`,
            }}
          >
            <h3 style={{ color: "#fb923c", fontSize: 26, marginBottom: 15 }}>nn.Linear</h3>
            <p style={{ color: colors.gray[300], fontSize: 20, lineHeight: 1.6 }}>
              완전연결층(Fully Connected)<br/>
              입력 → 출력 뉴런 연결
            </p>
            <div style={{ marginTop: 15, color: colors.gray[400], fontSize: 18 }}>
              784 → 128 → 64 → 10
            </div>
          </div>

          {/* forward 설명 */}
          <div
            style={{
              opacity: forwardExplainOpacity,
              backgroundColor: colors.gray[800],
              padding: 25,
              borderRadius: 12,
              borderLeft: `4px solid #22c55e`,
            }}
          >
            <h3 style={{ color: "#22c55e", fontSize: 26, marginBottom: 15 }}>forward()</h3>
            <p style={{ color: colors.gray[300], fontSize: 20, lineHeight: 1.6 }}>
              데이터 흐름 정의<br/>
              입력 → 레이어 통과 → 출력
            </p>
            <div style={{ marginTop: 15, color: colors.gray[400], fontSize: 18 }}>
              ReLU로 비선형성 추가
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
