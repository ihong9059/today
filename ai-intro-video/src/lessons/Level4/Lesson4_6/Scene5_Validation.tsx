import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

const LEVEL_COLOR = "#F97316";

export const Scene5_Validation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Mode toggle animation
  const modeToggle = Math.floor(frame / 120) % 2;

  // Code animations
  const code1 = spring({ frame: frame - 40, fps, config: { damping: 12 } });
  const code2 = spring({ frame: frame - 100, fps, config: { damping: 12 } });
  const code3 = spring({ frame: frame - 160, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Audio src={staticFile("audio/lesson-4-6/scene5.mp3")} />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          opacity: titleOpacity,
        }}
      >
        <h1 style={{ fontSize: 56, color: "white", margin: 0 }}>
          <span style={{ color: "#22d3ee" }}>검증</span> 루프
        </h1>
        <p style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>
          Validation Loop - 모델 성능 평가
        </p>
      </div>

      {/* Mode indicator */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "#1e293b",
            borderRadius: 30,
            padding: 5,
          }}
        >
          <div
            style={{
              padding: "12px 30px",
              borderRadius: 25,
              backgroundColor: modeToggle === 0 ? "#10b981" : "transparent",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            train()
          </div>
          <div
            style={{
              padding: "12px 30px",
              borderRadius: 25,
              backgroundColor: modeToggle === 1 ? "#22d3ee" : "transparent",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            eval()
          </div>
        </div>
      </div>

      {/* Key concepts */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 60,
          right: 60,
          display: "flex",
          gap: 30,
        }}
      >
        {/* model.eval() */}
        <div
          style={{
            flex: 1,
            transform: `scale(${code1})`,
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 25,
            border: `3px solid #22d3ee`,
          }}
        >
          <div style={{ fontFamily: "monospace", fontSize: 26, marginBottom: 15 }}>
            <span style={{ color: "#22d3ee" }}>model</span>
            <span style={{ color: "white" }}>.</span>
            <span style={{ color: "#4ade80" }}>eval</span>
            <span style={{ color: "white" }}>()</span>
          </div>
          <div style={{ color: "#22d3ee", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
            평가 모드 전환
          </div>
          <div style={{ color: "#9ca3af", fontSize: 18, lineHeight: 1.6 }}>
            • Dropout 비활성화<br />
            • BatchNorm 고정<br />
            • 추론에 최적화
          </div>
        </div>

        {/* torch.no_grad() */}
        <div
          style={{
            flex: 1,
            transform: `scale(${code2})`,
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 25,
            border: `3px solid #8b5cf6`,
          }}
        >
          <div style={{ fontFamily: "monospace", fontSize: 26, marginBottom: 15 }}>
            <span style={{ color: "#c084fc" }}>with</span>{" "}
            <span style={{ color: "#22d3ee" }}>torch</span>
            <span style={{ color: "white" }}>.</span>
            <span style={{ color: "#4ade80" }}>no_grad</span>
            <span style={{ color: "white" }}>():</span>
          </div>
          <div style={{ color: "#8b5cf6", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
            기울기 계산 생략
          </div>
          <div style={{ color: "#9ca3af", fontSize: 18, lineHeight: 1.6 }}>
            • 메모리 절약<br />
            • 속도 향상<br />
            • 검증/추론 시 필수
          </div>
        </div>

        {/* model.train() */}
        <div
          style={{
            flex: 1,
            transform: `scale(${code3})`,
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 25,
            border: `3px solid #10b981`,
          }}
        >
          <div style={{ fontFamily: "monospace", fontSize: 26, marginBottom: 15 }}>
            <span style={{ color: "#22d3ee" }}>model</span>
            <span style={{ color: "white" }}>.</span>
            <span style={{ color: "#4ade80" }}>train</span>
            <span style={{ color: "white" }}>()</span>
          </div>
          <div style={{ color: "#10b981", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
            학습 모드 복귀
          </div>
          <div style={{ color: "#9ca3af", fontSize: 18, lineHeight: 1.6 }}>
            • Dropout 활성화<br />
            • BatchNorm 업데이트<br />
            • 검증 후 반드시 호출
          </div>
        </div>
      </div>

      {/* Validation loop code */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 60,
          right: 60,
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: 16,
            padding: 25,
            fontFamily: "monospace",
            fontSize: 20,
            border: `2px solid ${LEVEL_COLOR}`,
          }}
        >
          <div style={{ color: "#9ca3af", marginBottom: 10 }}># 검증 루프</div>
          <div>
            <span style={{ color: "#22d3ee" }}>model</span>
            <span style={{ color: "white" }}>.</span>
            <span style={{ color: "#4ade80" }}>eval</span>
            <span style={{ color: "white" }}>()</span>
          </div>
          <div>
            <span style={{ color: "#c084fc" }}>with</span>{" "}
            <span style={{ color: "#22d3ee" }}>torch</span>
            <span style={{ color: "white" }}>.</span>
            <span style={{ color: "#4ade80" }}>no_grad</span>
            <span style={{ color: "white" }}>():</span>
          </div>
          <div style={{ marginLeft: 30 }}>
            <span style={{ color: "#c084fc" }}>for</span>{" "}
            <span style={{ color: "#fbbf24" }}>inputs, labels</span>{" "}
            <span style={{ color: "#c084fc" }}>in</span>{" "}
            <span style={{ color: "white" }}>val_loader:</span>
          </div>
          <div style={{ marginLeft: 60, color: "white" }}>
            outputs = model(inputs)
          </div>
          <div style={{ marginLeft: 60, color: "white" }}>
            loss = criterion(outputs, labels)
          </div>
          <div style={{ marginTop: 10 }}>
            <span style={{ color: "#22d3ee" }}>model</span>
            <span style={{ color: "white" }}>.</span>
            <span style={{ color: "#4ade80" }}>train</span>
            <span style={{ color: "white" }}>()</span>
            <span style={{ color: "#9ca3af" }}>  # 다시 학습 모드로</span>
          </div>
        </div>
      </div>

      {/* Lesson indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 60,
          color: "#64748b",
          fontSize: 24,
        }}
      >
        Lesson 4-6 | Validation
      </div>
    </AbsoluteFill>
  );
};
