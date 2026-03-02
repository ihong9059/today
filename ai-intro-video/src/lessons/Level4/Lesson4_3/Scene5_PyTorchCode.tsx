/**
 * Scene 5: PyTorch 코드
 * TextClassifier 클래스 구현
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_PyTorchCode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const codeOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const highlightEmbedding = interpolate(frame, [150, 180, 300, 330], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const highlightForward = interpolate(frame, [350, 380, 550, 580], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const highlightLoss = interpolate(frame, [600, 630, 800, 830], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  const codeLines = [
    { text: "class TextClassifier(nn.Module):", color: "#4ec9b0" },
    { text: "    def __init__(self, vocab_size, embed_dim):", color: "#dcdcaa" },
    { text: "        super().__init__()", color: "#9cdcfe" },
    { text: "        self.embedding = nn.Embedding(", color: "#9cdcfe", highlight: "embedding" },
    { text: "            vocab_size, embed_dim)", color: "#9cdcfe", highlight: "embedding" },
    { text: "        self.fc = nn.Linear(embed_dim, 1)", color: "#9cdcfe" },
    { text: "", color: "" },
    { text: "    def forward(self, x):", color: "#dcdcaa", highlight: "forward" },
    { text: "        embedded = self.embedding(x)", color: "#9cdcfe", highlight: "forward" },
    { text: "        # 평균 풀링", color: "#6a9955", highlight: "forward" },
    { text: "        pooled = embedded.mean(dim=1)", color: "#9cdcfe", highlight: "forward" },
    { text: "        return torch.sigmoid(self.fc(pooled))", color: "#9cdcfe", highlight: "forward" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e1e1e 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 50,
      }}
    >
      <Audio src={staticFile("audio/lesson-4-3/scene5.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 56,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        PyTorch TextClassifier
      </h1>

      {/* 코드 블록 */}
      <div
        style={{
          opacity: codeOpacity,
          backgroundColor: "#1e1e1e",
          borderRadius: 16,
          padding: 30,
          fontFamily: "'Fira Code', monospace",
          width: "90%",
          maxWidth: 900,
          border: `2px solid ${colors.level[4]}`,
        }}
      >
        {codeLines.map((line, i) => {
          const delay = 90 + i * 10;
          const lineOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });

          let bgColor = "transparent";
          if (line.highlight === "embedding" && highlightEmbedding > 0.5) {
            bgColor = "rgba(249, 115, 22, 0.3)";
          } else if (line.highlight === "forward" && highlightForward > 0.5) {
            bgColor = "rgba(34, 197, 94, 0.3)";
          }

          return (
            <div
              key={i}
              style={{
                fontSize: 22,
                color: line.color || colors.white,
                lineHeight: 1.6,
                opacity: lineOpacity,
                backgroundColor: bgColor,
                padding: line.text ? "2px 8px" : "0",
                borderRadius: 4,
                marginLeft: line.text.startsWith("    ") ? 0 : 0,
                whiteSpace: "pre",
              }}
            >
              {line.text || " "}
            </div>
          );
        })}
      </div>

      {/* 손실 함수 */}
      <div
        style={{
          opacity: highlightLoss,
          marginTop: 30,
          backgroundColor: "#1e1e1e",
          borderRadius: 12,
          padding: 20,
          border: "2px solid #ef4444",
        }}
      >
        <div style={{ fontSize: 24, color: colors.white, fontFamily: "monospace" }}>
          <span style={{ color: "#6a9955" }}># 이진 분류 손실 함수</span>
        </div>
        <div style={{ fontSize: 24, color: colors.white, fontFamily: "monospace", marginTop: 10 }}>
          criterion = <span style={{ color: "#4ec9b0" }}>nn.BCELoss</span>()
        </div>
      </div>

      {/* 설명 박스들 */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 30,
        }}
      >
        <div
          style={{
            opacity: highlightEmbedding,
            backgroundColor: "rgba(249, 115, 22, 0.2)",
            padding: "15px 25px",
            borderRadius: 12,
            border: `2px solid ${colors.level[4]}`,
          }}
        >
          <span style={{ fontSize: 18, color: colors.white }}>
            nn.Embedding: 단어 → 벡터
          </span>
        </div>

        <div
          style={{
            opacity: highlightForward,
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            padding: "15px 25px",
            borderRadius: 12,
            border: "2px solid #22c55e",
          }}
        >
          <span style={{ fontSize: 18, color: colors.white }}>
            mean(dim=1): 평균 풀링
          </span>
        </div>

        <div
          style={{
            opacity: highlightLoss,
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            padding: "15px 25px",
            borderRadius: 12,
            border: "2px solid #ef4444",
          }}
        >
          <span style={{ fontSize: 18, color: colors.white }}>
            BCELoss: Binary Cross Entropy
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
