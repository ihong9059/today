/**
 * Scene 6: PyTorch 구현
 */

import { AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene6_PyTorchCode: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 코드 블록
  const classOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const initOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const forwardOpacity = interpolate(frame, [270, 300], [0, 1], { extrapolateRight: "clamp" });
  const usageOpacity = interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1d3a4c 50%, #1e1b4b 100%)`,
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-4/scene6.mp3")} />

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
        💻 PyTorch 순전파 구현
      </h1>

      <div style={{ display: "flex", gap: 30 }}>
        {/* 코드 */}
        <div style={{ flex: 1.2 }}>
          <div
            style={{
              backgroundColor: "#1e1e1e",
              padding: 22,
              borderRadius: 16,
              border: "2px solid #60a5fa",
            }}
          >
            <pre style={{ color: colors.white, fontSize: 17, margin: 0, lineHeight: 1.5 }}>
              <span style={{ color: "#c586c0", opacity: classOpacity }}>class</span>
              <span style={{ opacity: classOpacity }}> </span>
              <span style={{ color: "#4ec9b0", opacity: classOpacity }}>SimpleNet</span>
              <span style={{ opacity: classOpacity }}>(nn.Module):</span>
              {"\n"}
              <span style={{ opacity: initOpacity }}>    </span>
              <span style={{ color: "#c586c0", opacity: initOpacity }}>def</span>
              <span style={{ color: "#dcdcaa", opacity: initOpacity }}> __init__</span>
              <span style={{ opacity: initOpacity }}>(self):</span>
              {"\n"}
              <span style={{ opacity: initOpacity }}>        super().__init__()</span>
              {"\n"}
              <span style={{ color: "#6a9955", opacity: initOpacity }}>        # 레이어 정의</span>
              {"\n"}
              <span style={{ opacity: initOpacity }}>        self.fc1 = nn.</span>
              <span style={{ color: "#dcdcaa", opacity: initOpacity }}>Linear</span>
              <span style={{ opacity: initOpacity }}>(</span>
              <span style={{ color: "#b5cea8", opacity: initOpacity }}>2</span>
              <span style={{ opacity: initOpacity }}>, </span>
              <span style={{ color: "#b5cea8", opacity: initOpacity }}>4</span>
              <span style={{ opacity: initOpacity }}>)</span>
              {"\n"}
              <span style={{ opacity: initOpacity }}>        self.fc2 = nn.</span>
              <span style={{ color: "#dcdcaa", opacity: initOpacity }}>Linear</span>
              <span style={{ opacity: initOpacity }}>(</span>
              <span style={{ color: "#b5cea8", opacity: initOpacity }}>4</span>
              <span style={{ opacity: initOpacity }}>, </span>
              <span style={{ color: "#b5cea8", opacity: initOpacity }}>1</span>
              <span style={{ opacity: initOpacity }}>)</span>
              {"\n\n"}
              <span style={{ opacity: forwardOpacity }}>    </span>
              <span style={{ color: "#c586c0", opacity: forwardOpacity }}>def</span>
              <span style={{ color: "#dcdcaa", opacity: forwardOpacity }}> forward</span>
              <span style={{ opacity: forwardOpacity }}>(self, x):</span>
              {"\n"}
              <span style={{ color: "#6a9955", opacity: forwardOpacity }}>        # 순전파 정의</span>
              {"\n"}
              <span style={{ opacity: forwardOpacity }}>        x = self.fc1(x)</span>
              <span style={{ color: "#6a9955", opacity: forwardOpacity }}>  # 선형</span>
              {"\n"}
              <span style={{ opacity: forwardOpacity }}>        x = F.</span>
              <span style={{ color: "#dcdcaa", opacity: forwardOpacity }}>relu</span>
              <span style={{ opacity: forwardOpacity }}>(x)</span>
              <span style={{ color: "#6a9955", opacity: forwardOpacity }}>    # 활성화</span>
              {"\n"}
              <span style={{ opacity: forwardOpacity }}>        x = self.fc2(x)</span>
              <span style={{ color: "#6a9955", opacity: forwardOpacity }}>  # 출력층</span>
              {"\n"}
              <span style={{ color: "#c586c0", opacity: forwardOpacity }}>        return</span>
              <span style={{ opacity: forwardOpacity }}> x</span>
            </pre>
          </div>
        </div>

        {/* 설명 */}
        <div style={{ flex: 0.8 }}>
          {/* __init__ 설명 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 18,
              borderRadius: 12,
              marginBottom: 15,
              opacity: initOpacity,
            }}
          >
            <div style={{ color: "#fbbf24", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              __init__ 메서드
            </div>
            <div style={{ color: colors.gray[300], fontSize: 16 }}>
              • 레이어들을 정의<br />
              • nn.Linear(입력, 출력)<br />
              • fc1: 2→4, fc2: 4→1
            </div>
          </div>

          {/* forward 설명 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 18,
              borderRadius: 12,
              marginBottom: 15,
              opacity: forwardOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              forward 메서드
            </div>
            <div style={{ color: colors.gray[300], fontSize: 16 }}>
              • 순전파 과정 정의<br />
              • 레이어 통과 → 활성화<br />
              • 최종 출력 반환
            </div>
          </div>

          {/* 사용 예시 */}
          <div
            style={{
              backgroundColor: "#60a5fa20",
              border: "2px solid #60a5fa",
              padding: 18,
              borderRadius: 12,
              opacity: usageOpacity,
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              사용 방법
            </div>
            <pre style={{ color: colors.white, fontSize: 15, margin: 0 }}>
              model = SimpleNet(){"\n"}
              output = model(input){"\n"}
              <span style={{ color: "#6a9955" }}># 자동으로 forward 호출!</span>
            </pre>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
