import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Img,
  spring,
} from "remotion";

// Duration based on audio analysis
export const LESSON_4_6_DURATION = 6824;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 881 },
  five_steps: { start: 881, duration: 1227 },
  train_function: { start: 2108, duration: 901 },
  validation: { start: 3009, duration: 940 },
  early_stopping: { start: 3949, duration: 940 },
  monitoring: { start: 4889, duration: 908 },
  outro: { start: 5797, duration: 1027 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#f97316",
  secondary: "#ea580c",
  accent: "#fbbf24",
  text: "#f8fafc",
  textSecondary: "#94a3b8",
  codeBackground: "#1e293b",
  gradientStart: "#f97316",
  gradientEnd: "#dc2626",
};

// Global Overlay Component
const GlobalOverlay: React.FC = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 1000,
        }}
      >
        <Img
          src={staticFile("images/logo.png")}
          style={{ width: 50, height: 50, borderRadius: 8 }}
        />
        <span
          style={{
            color: COLORS.text,
            fontSize: 24,
            fontWeight: 700,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          UTTEC-Lab
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          color: COLORS.textSecondary,
          fontSize: 20,
          fontFamily: "Pretendard, sans-serif",
          zIndex: 1000,
        }}
      >
        ai.uttec-lab.com
      </div>
    </>
  );
};

// Scene 1: Intro
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: "clamp" });

  const iconScale = spring({ frame: frame - 15, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 150,
            marginBottom: 30,
            transform: `scale(${iconScale})`,
          }}
        >
          🔄
        </div>
        <div
          style={{
            fontSize: 90,
            fontWeight: 800,
            color: COLORS.text,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 20,
          }}
        >
          학습 루프
        </div>
        <div
          style={{
            fontSize: 40,
            color: COLORS.primary,
            fontWeight: 600,
          }}
        >
          딥러닝의 핵심 사이클 마스터하기
        </div>
        <div
          style={{
            marginTop: 60,
            background: COLORS.codeBackground,
            padding: "25px 50px",
            borderRadius: 20,
            fontSize: 30,
            color: COLORS.accent,
          }}
        >
          📚 시험공부 사이클: 문제풀기 → 채점 → 분석 → 보완 → 반복
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Five Steps
const Scene2FiveSteps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const steps = [
    { num: 1, code: "optimizer.zero_grad()", desc: "그래디언트 초기화", icon: "🧹" },
    { num: 2, code: "output = model(data)", desc: "순전파 (예측)", icon: "➡️" },
    { num: 3, code: "loss = criterion(...)", desc: "손실 계산", icon: "📊" },
    { num: 4, code: "loss.backward()", desc: "역전파 (분석)", icon: "⬅️" },
    { num: 5, code: "optimizer.step()", desc: "가중치 업데이트", icon: "⬆️" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 80 }}>
      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 40,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 70 }}>📝</span> 학습 루프 5단계
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {steps.map((step, i) => {
          const delay = 30 + i * 25;
          const scale = spring({ frame: frame - delay, fps, config: { damping: 12 } });
          const slideX = interpolate(frame, [delay, delay + 20], [-50, 0], { extrapolateRight: "clamp" });
          return (
            <div
              key={step.num}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: COLORS.codeBackground,
                padding: "20px 30px",
                borderRadius: 15,
                transform: `translateX(${slideX}px) scale(${Math.min(scale, 1)})`,
                borderLeft: `4px solid ${COLORS.primary}`,
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 24,
                  fontWeight: 800,
                  color: COLORS.text,
                }}
              >
                {step.num}
              </div>
              <div style={{ fontSize: 40 }}>{step.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 26, color: COLORS.accent, fontFamily: "monospace" }}>{step.code}</div>
                <div style={{ fontSize: 22, color: COLORS.textSecondary }}>{step.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Train Function
const Scene3TrainFunction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const codeLines = [
    "model.train()  # 학습 모드 설정",
    "for data, target in loader:",
    "    data = data.to(device)",
    "    optimizer.zero_grad()",
    "    output = model(data)",
    "    loss = criterion(output, target)",
    "    loss.backward()",
    "    optimizer.step()",
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 80 }}>
      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 40,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 70 }}>⚙️</span> 학습 함수 구현
      </div>

      <div
        style={{
          background: COLORS.codeBackground,
          borderRadius: 20,
          padding: 40,
          fontFamily: "monospace",
        }}
      >
        {codeLines.map((line, i) => {
          const delay = 30 + i * 15;
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
          const indent = line.startsWith("    ") ? 40 : 0;
          return (
            <div
              key={i}
              style={{
                fontSize: 26,
                color: line.includes("#") ? COLORS.textSecondary : COLORS.accent,
                marginBottom: 12,
                opacity,
                paddingLeft: indent,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 30,
          background: "rgba(249, 115, 22, 0.1)",
          borderRadius: 15,
          padding: 25,
          borderLeft: `4px solid ${COLORS.primary}`,
        }}
      >
        <div style={{ fontSize: 26, color: COLORS.text }}>
          💡 <span style={{ color: COLORS.accent }}>loss.item()</span>으로 Python 숫자로 변환해서 기록하세요!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Validation Loop
const Scene4Validation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const differences = [
    { train: "model.train()", val: "model.eval()" },
    { train: "그래디언트 계산 O", val: "torch.no_grad()" },
    { train: "backward() 호출", val: "backward() 없음" },
    { train: "step() 호출", val: "step() 없음" },
    { train: "Dropout 활성화", val: "Dropout 비활성화" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 80 }}>
      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 40,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 70 }}>🧪</span> 검증 루프
      </div>

      <div style={{ display: "flex", gap: 30, marginBottom: 30 }}>
        <div style={{ flex: 1, textAlign: "center", fontSize: 32, fontWeight: 700, color: COLORS.primary }}>
          학습 루프 🏋️
        </div>
        <div style={{ flex: 1, textAlign: "center", fontSize: 32, fontWeight: 700, color: COLORS.accent }}>
          검증 루프 📝
        </div>
      </div>

      {differences.map((diff, i) => {
        const delay = 40 + i * 20;
        const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 30,
              marginBottom: 15,
              opacity,
            }}
          >
            <div
              style={{
                flex: 1,
                background: COLORS.codeBackground,
                padding: "15px 25px",
                borderRadius: 10,
                fontSize: 24,
                color: COLORS.text,
                textAlign: "center",
              }}
            >
              {diff.train}
            </div>
            <div
              style={{
                flex: 1,
                background: `linear-gradient(135deg, ${COLORS.codeBackground}, #2d3748)`,
                padding: "15px 25px",
                borderRadius: 10,
                fontSize: 24,
                color: COLORS.accent,
                textAlign: "center",
                border: `2px solid ${COLORS.accent}`,
              }}
            >
              {diff.val}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Scene 5: Early Stopping
const Scene5EarlyStopping: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Animated patience counter
  const counterProgress = interpolate(frame, [60, 200], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 80 }}>
      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 40,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 70 }}>⏹️</span> 조기 종료 (Early Stopping)
      </div>

      <div
        style={{
          background: COLORS.codeBackground,
          borderRadius: 20,
          padding: 35,
          marginBottom: 40,
        }}
      >
        <div style={{ fontSize: 28, color: COLORS.text, marginBottom: 15 }}>
          검증 손실이 개선되지 않으면 학습을 멈춥니다
        </div>
        <div style={{ fontSize: 24, color: COLORS.textSecondary }}>
          💡 과적합이 시작되면 계속 학습해도 성능이 안 올라요
        </div>
      </div>

      <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
        {["개선됨 ✅", "미개선 ❌", "미개선 ❌", "미개선 ❌", "STOP!"].map((label, i) => {
          const isActive = counterProgress > i / 5;
          const scale = spring({ frame: frame - (60 + i * 30), fps, config: { damping: 12 } });
          return (
            <div
              key={i}
              style={{
                width: 120,
                height: 120,
                borderRadius: 20,
                background: isActive
                  ? i === 4
                    ? `linear-gradient(135deg, #dc2626, ${COLORS.secondary})`
                    : i === 0
                    ? `linear-gradient(135deg, #10b981, #059669)`
                    : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
                  : COLORS.codeBackground,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transform: `scale(${Math.min(scale, 1)})`,
              }}
            >
              <div style={{ fontSize: 18, color: COLORS.text, fontWeight: 600 }}>
                {label}
              </div>
              {i < 4 && (
                <div style={{ fontSize: 14, color: COLORS.textSecondary, marginTop: 5 }}>
                  patience: {i === 0 ? "reset" : i}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 40,
          textAlign: "center",
          fontSize: 26,
          color: COLORS.accent,
        }}
      >
        patience = 3 일 때: 3번 연속 미개선 시 학습 중단
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Monitoring
const Scene6Monitoring: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Animated loss curves
  const graphProgress = interpolate(frame, [40, 180], [0, 1], { extrapolateRight: "clamp" });

  const trainLoss = [0.8, 0.6, 0.45, 0.35, 0.28, 0.22, 0.18, 0.15];
  const valLoss = [0.75, 0.58, 0.48, 0.42, 0.44, 0.48, 0.55, 0.65];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 80 }}>
      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 30,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 70 }}>📈</span> 학습 모니터링
      </div>

      {/* Simple bar chart representation */}
      <div
        style={{
          background: COLORS.codeBackground,
          borderRadius: 20,
          padding: 40,
          marginBottom: 30,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 20, background: COLORS.primary, borderRadius: 5 }} />
            <span style={{ fontSize: 22, color: COLORS.text }}>Train Loss</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 20, background: COLORS.accent, borderRadius: 5 }} />
            <span style={{ fontSize: 22, color: COLORS.text }}>Val Loss</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", height: 200, alignItems: "flex-end" }}>
          {trainLoss.map((t, i) => {
            const show = graphProgress > i / trainLoss.length;
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <div style={{ display: "flex", gap: 4, alignItems: "flex-end" }}>
                  <div
                    style={{
                      width: 30,
                      height: show ? t * 200 : 0,
                      background: COLORS.primary,
                      borderRadius: 5,
                      transition: "height 0.3s",
                    }}
                  />
                  <div
                    style={{
                      width: 30,
                      height: show ? valLoss[i] * 200 : 0,
                      background: COLORS.accent,
                      borderRadius: 5,
                      transition: "height 0.3s",
                    }}
                  />
                </div>
                <span style={{ fontSize: 18, color: COLORS.textSecondary }}>E{i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <div
          style={{
            flex: 1,
            background: "rgba(16, 185, 129, 0.1)",
            padding: 20,
            borderRadius: 15,
            borderLeft: `4px solid #10b981`,
          }}
        >
          <div style={{ fontSize: 22, color: "#10b981" }}>✅ 정상: 둘 다 내려감</div>
        </div>
        <div
          style={{
            flex: 1,
            background: "rgba(220, 38, 38, 0.1)",
            padding: 20,
            borderRadius: 15,
            borderLeft: `4px solid #dc2626`,
          }}
        >
          <div style={{ fontSize: 22, color: "#dc2626" }}>⚠️ 과적합: Train↓ Val↑</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Outro
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const summary = [
    { icon: "📝", text: "5단계: zero_grad → forward → loss → backward → step" },
    { icon: "🧪", text: "검증: eval() + no_grad(), backward/step 없음" },
    { icon: "⏹️", text: "조기 종료: patience로 과적합 방지" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 80 }}>
      <div
        style={{
          fontSize: 70,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 50,
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        🔄 학습 루프 정리
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 25, marginBottom: 50 }}>
        {summary.map((item, i) => {
          const delay = 30 + i * 25;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                background: COLORS.codeBackground,
                borderRadius: 20,
                padding: 35,
                display: "flex",
                alignItems: "center",
                gap: 25,
                opacity,
              }}
            >
              <div style={{ fontSize: 50 }}>{item.icon}</div>
              <div style={{ fontSize: 30, color: COLORS.text }}>{item.text}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 30,
        }}
      >
        <div
          style={{
            fontSize: 36,
            color: COLORS.primary,
            fontWeight: 600,
          }}
        >
          다음 레슨: 모델 저장과 로드 💾
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main Video Component
export const Lesson4_6Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      {/* Audio tracks */}
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <Audio src={staticFile("audio/lesson-4-6/scene1_intro.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.five_steps.start} durationInFrames={SCENE_TIMINGS.five_steps.duration}>
        <Audio src={staticFile("audio/lesson-4-6/scene2_five_steps.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.train_function.start} durationInFrames={SCENE_TIMINGS.train_function.duration}>
        <Audio src={staticFile("audio/lesson-4-6/scene3_train_function.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.validation.start} durationInFrames={SCENE_TIMINGS.validation.duration}>
        <Audio src={staticFile("audio/lesson-4-6/scene4_validation.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.early_stopping.start} durationInFrames={SCENE_TIMINGS.early_stopping.duration}>
        <Audio src={staticFile("audio/lesson-4-6/scene5_early_stopping.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.monitoring.start} durationInFrames={SCENE_TIMINGS.monitoring.duration}>
        <Audio src={staticFile("audio/lesson-4-6/scene6_monitoring.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <Audio src={staticFile("audio/lesson-4-6/scene7_outro.mp3")} />
      </Sequence>

      {/* Visual scenes */}
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <Scene1Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.five_steps.start} durationInFrames={SCENE_TIMINGS.five_steps.duration}>
        <Scene2FiveSteps />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.train_function.start} durationInFrames={SCENE_TIMINGS.train_function.duration}>
        <Scene3TrainFunction />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.validation.start} durationInFrames={SCENE_TIMINGS.validation.duration}>
        <Scene4Validation />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.early_stopping.start} durationInFrames={SCENE_TIMINGS.early_stopping.duration}>
        <Scene5EarlyStopping />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.monitoring.start} durationInFrames={SCENE_TIMINGS.monitoring.duration}>
        <Scene6Monitoring />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <Scene7Outro />
      </Sequence>

      {/* Global overlay */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
