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

export const L04_Scene2_FunctionBasics: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;

  // Code reveal animation
  const codeLines = [
    { text: "def 함수이름(입력):", color: "#22c55e", delay: 30 },
    { text: "    처리", color: colors.gray[300], delay: 60 },
    { text: "    return 출력", color: "#f97316", delay: 90 },
  ];

  // Example function
  const exampleLines = [
    { text: "def add(a, b):", color: "#22c55e", delay: 200 },
    { text: "    return a + b", color: "#f97316", delay: 230 },
    { text: "", color: "", delay: 0 },
    { text: "result = add(3, 5)  # 8", color: "#3b82f6", delay: 280 },
  ];

  // Neural network as function
  const nnLines = [
    { text: "def neural_network(image):", color: "#22c55e", delay: 400 },
    { text: "    features = extract(image)", color: colors.gray[300], delay: 430 },
    { text: "    activated = relu(features)", color: colors.gray[300], delay: 460 },
    { text: "    prediction = classify(activated)", color: colors.gray[300], delay: 490 },
    { text: "    return prediction", color: "#f97316", delay: 520 },
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
          marginBottom: 40,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        📦 함수의 기본: 입력 → 처리 → 출력
      </h2>

      <div style={{ display: "flex", gap: 60 }}>
        {/* Left: Basic syntax */}
        <div style={{ flex: 1 }}>
          {/* Basic function structure */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 30,
              marginBottom: 30,
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 18, marginBottom: 15 }}>
              함수 기본 구조
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 22, lineHeight: 1.8 }}>
              {codeLines.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    opacity: interpolate(frame, [line.delay, line.delay + 15], [0, 1], { extrapolateRight: "clamp" }),
                    color: line.color,
                  }}
                >
                  {line.text}
                </div>
              ))}
            </div>
          </div>

          {/* Example function */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              borderRadius: 16,
              padding: 30,
              opacity: interpolate(frame, [180, 200], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: colors.gray[400], fontSize: 18, marginBottom: 15 }}>
              예시: 더하기 함수
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 22, lineHeight: 1.8 }}>
              {exampleLines.filter(l => l.text).map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    opacity: interpolate(frame, [line.delay, line.delay + 15], [0, 1], { extrapolateRight: "clamp" }),
                    color: line.color,
                  }}
                >
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Neural network as function */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: "#22c55e20",
              border: "2px solid #22c55e",
              borderRadius: 16,
              padding: 30,
              opacity: interpolate(frame, [380, 400], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 22, marginBottom: 20, fontWeight: "bold" }}>
              🧠 신경망도 함수입니다!
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 20, lineHeight: 1.8 }}>
              {nnLines.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    opacity: interpolate(frame, [line.delay, line.delay + 15], [0, 1], { extrapolateRight: "clamp" }),
                    color: line.color,
                  }}
                >
                  {line.text}
                </div>
              ))}
            </div>

            {/* Cat example */}
            <div
              style={{
                marginTop: 30,
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: interpolate(frame, [560, 590], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <span style={{ fontSize: 50 }}>🐱</span>
              <span style={{ color: "#f97316", fontSize: 30 }}>→</span>
              <div style={{
                backgroundColor: colors.gray[700],
                padding: "10px 20px",
                borderRadius: 8,
              }}>
                <span style={{ color: colors.white, fontSize: 24 }}>"고양이"</span>
              </div>
            </div>
          </div>

          {/* Key insight */}
          <div
            style={{
              marginTop: 30,
              padding: 25,
              backgroundColor: "#f9731620",
              borderRadius: 16,
              border: "2px solid #f97316",
              opacity: interpolate(frame, [620, 650], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <p style={{ color: "#f97316", fontSize: 24, margin: 0, fontWeight: "bold" }}>
              💡 AI 모델 = 하나의 거대한 함수
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
