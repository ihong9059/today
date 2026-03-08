import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const LESSON_4_1_DURATION = 10291;

const colors = {
  primary: "#f97316",
  secondary: "#ea580c",
  accent: "#fbbf24",
  success: "#10b981",
  danger: "#ef4444",
  info: "#3b82f6",
  white: "#ffffff",
  dark: "#1c1917",
  gray: { 100: "#f5f5f4", 200: "#e7e5e4", 700: "#44403c" },
};

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 1181 },
  mnist: { start: 1181, duration: 1552 },
  dataload: { start: 2733, duration: 1531 },
  model: { start: 4264, duration: 1763 },
  training: { start: 6027, duration: 1556 },
  eval: { start: 7583, duration: 1367 },
  outro: { start: 8950, duration: 1341 },
};

const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  return (
    <>
      <div style={{ position: "absolute", top: 30, left: 40, zIndex: 1000, opacity: logoOpacity, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 50, height: 50, borderRadius: 12, background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 15px ${colors.primary}60` }}>
          <span style={{ fontSize: 28, fontWeight: "bold", color: colors.white }}>U</span>
        </div>
        <span style={{ fontSize: 32, fontWeight: "bold", color: colors.white, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>UTTEC-Lab</span>
      </div>
      <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, zIndex: 1000, opacity: logoOpacity, display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "12px 40px", backgroundColor: "#0f172add", borderRadius: 30, border: `2px solid ${colors.primary}60` }}>
          <span style={{ fontSize: 24, color: colors.gray[100] }}>교육 사이트:</span>
          <span style={{ fontSize: 26, color: colors.accent, fontWeight: "bold", marginLeft: 10 }}>http://uttec-ai.duckdns.org</span>
        </div>
      </div>
    </>
  );
};

// Scene 1: Intro
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, from: 0, to: 1, config: { damping: 12 } });
  const iconScale = spring({ frame: frame - 15, fps, from: 0, to: 1, config: { damping: 10 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #7c2d12 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        <div style={{ fontSize: 150, marginBottom: 30, transform: `scale(${iconScale})` }}>🚀</div>
        <h1 style={{ fontSize: 72, color: colors.white, marginBottom: 20, opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * 30}px)` }}>
          MNIST 손글씨 분류
        </h1>
        <p style={{ fontSize: 36, color: colors.gray[200], opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }) }}>
          첫 번째 완전한 딥러닝 프로젝트
        </p>
        <div style={{ marginTop: 30, padding: "15px 30px", backgroundColor: `${colors.primary}30`, borderRadius: 15, display: "inline-block", opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" }) }}>
          <span style={{ fontSize: 28, color: colors.accent }}>Level 4-1 | 실전 프로젝트</span>
        </div>
      </div>
      <Audio src={staticFile("audio/lesson-4-1/scene1_intro.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 2: MNIST 소개
const MNISTScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { label: "전체 이미지", value: "70,000개", icon: "🖼️" },
    { label: "훈련 데이터", value: "60,000개", icon: "📚" },
    { label: "테스트 데이터", value: "10,000개", icon: "✅" },
    { label: "이미지 크기", value: "28×28", icon: "📐" },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #44403c 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>📝 MNIST 데이터셋</h2>
        <p style={{ fontSize: 28, color: colors.gray[200], marginTop: 10 }}>딥러닝의 Hello World</p>
      </div>

      <div style={{ position: "absolute", top: 240, left: "50%", transform: "translateX(-50%)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 25, width: 1100 }}>
        {stats.map((stat, i) => {
          const opacity = interpolate(frame, [20 + i * 20, 50 + i * 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "30px 20px", background: "rgba(255,255,255,0.1)", borderRadius: 15, border: `2px solid ${colors.primary}`, textAlign: "center", opacity, transform: `translateY(${(1 - opacity) * 20}px)` }}>
              <div style={{ fontSize: 50, marginBottom: 10 }}>{stat.icon}</div>
              <div style={{ fontSize: 32, color: colors.accent, fontWeight: "bold", marginBottom: 8 }}>{stat.value}</div>
              <div style={{ fontSize: 20, color: colors.gray[200] }}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 180, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 20 }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, i) => {
          const opacity = interpolate(frame, [120 + i * 8, 140 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={num} style={{ width: 70, height: 70, backgroundColor: "#1f1f1f", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: colors.white, border: `2px solid ${colors.accent}`, opacity }}>
              {num}
            </div>
          );
        })}
      </div>

      <Audio src={staticFile("audio/lesson-4-1/scene2_mnist.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 3: 데이터 로딩
const DataLoadScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { icon: "📦", title: "torch", desc: "핵심 라이브러리" },
    { icon: "🧱", title: "torch.nn", desc: "신경망 레이어" },
    { icon: "⚡", title: "DataLoader", desc: "배치 데이터 공급" },
    { icon: "🖼️", title: "torchvision", desc: "이미지 유틸리티" },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #1e3a5f 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>📥 데이터 로딩</h2>
      </div>

      <div style={{ position: "absolute", top: 220, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 30 }}>
        {steps.map((step, i) => {
          const opacity = interpolate(frame, [30 + i * 25, 60 + i * 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ padding: "30px 35px", background: "rgba(255,255,255,0.1)", borderRadius: 15, border: `2px solid ${colors.info}`, textAlign: "center", width: 200, opacity, transform: `scale(${opacity})` }}>
              <div style={{ fontSize: 50, marginBottom: 15 }}>{step.icon}</div>
              <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold", marginBottom: 8 }}>{step.title}</div>
              <div style={{ fontSize: 18, color: colors.gray[200] }}>{step.desc}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 180, left: "50%", transform: "translateX(-50%)", padding: "25px 50px", background: "rgba(59, 130, 246, 0.2)", borderRadius: 20, border: `2px solid ${colors.info}`, opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ fontSize: 26, color: colors.white, textAlign: "center" }}>
          <span style={{ color: colors.accent }}>transforms.Normalize</span>
          <span style={{ color: colors.gray[200] }}> → 평균 0.1307, 표준편차 0.3081</span>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-4-1/scene3_dataload.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 4: 모델 설계
const ModelScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const layers = [
    { name: "Input", size: "28×28", neurons: "784", color: colors.info },
    { name: "Hidden 1", size: "784→512", neurons: "512", color: colors.primary },
    { name: "Hidden 2", size: "512→256", neurons: "256", color: colors.success },
    { name: "Output", size: "256→10", neurons: "10", color: colors.accent },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #312e81 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>🧠 MLP 모델 설계</h2>
      </div>

      <div style={{ position: "absolute", top: 220, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 30 }}>
        {layers.map((layer, i) => {
          const opacity = interpolate(frame, [30 + i * 30, 60 + i * 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity }}>
                <div style={{ padding: "25px 30px", background: `${layer.color}30`, borderRadius: 15, border: `3px solid ${layer.color}`, textAlign: "center", minWidth: 140 }}>
                  <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold", marginBottom: 8 }}>{layer.name}</div>
                  <div style={{ fontSize: 36, color: layer.color, fontWeight: "bold" }}>{layer.neurons}</div>
                  <div style={{ fontSize: 16, color: colors.gray[200], marginTop: 5 }}>{layer.size}</div>
                </div>
              </div>
              {i < layers.length - 1 && (
                <div style={{ fontSize: 40, color: colors.gray[200], opacity }}>→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 180, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 40, opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ padding: "15px 30px", background: "rgba(16, 185, 129, 0.2)", borderRadius: 12, border: `2px solid ${colors.success}` }}>
          <span style={{ fontSize: 22, color: colors.success }}>✨ ReLU 활성화</span>
        </div>
        <div style={{ padding: "15px 30px", background: "rgba(239, 68, 68, 0.2)", borderRadius: 12, border: `2px solid ${colors.danger}` }}>
          <span style={{ fontSize: 22, color: colors.danger }}>🎲 Dropout 20%</span>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-4-1/scene4_model.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 5: 학습 루프
const TrainingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { num: "1", title: "zero_grad()", desc: "그래디언트 초기화", color: colors.info },
    { num: "2", title: "forward", desc: "순전파", color: colors.primary },
    { num: "3", title: "loss", desc: "손실 계산", color: colors.danger },
    { num: "4", title: "backward()", desc: "역전파", color: colors.success },
    { num: "5", title: "step()", desc: "가중치 업데이트", color: colors.accent },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #14532d 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>🔄 학습 루프 5단계</h2>
      </div>

      <div style={{ position: "absolute", top: 220, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 20 }}>
        {steps.map((step, i) => {
          const opacity = interpolate(frame, [20 + i * 25, 50 + i * 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: step.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, color: colors.white, fontWeight: "bold" }}>{step.num}</div>
                <div style={{ padding: "15px 20px", background: "rgba(255,255,255,0.1)", borderRadius: 12, border: `2px solid ${step.color}`, textAlign: "center", minWidth: 130 }}>
                  <div style={{ fontSize: 18, color: step.color, fontWeight: "bold", marginBottom: 5 }}>{step.title}</div>
                  <div style={{ fontSize: 16, color: colors.gray[200] }}>{step.desc}</div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ fontSize: 30, color: colors.gray[200], opacity }}>→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 180, left: "50%", transform: "translateX(-50%)", padding: "20px 40px", background: "rgba(249, 115, 22, 0.2)", borderRadius: 15, border: `2px solid ${colors.primary}`, opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <span style={{ fontSize: 26, color: colors.accent }}>⚡ 매 배치마다, 매 에폭마다 반복!</span>
      </div>

      <Audio src={staticFile("audio/lesson-4-1/scene5_training.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 6: 평가
const EvalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [60, 200], [0, 98.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, #1e40af 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <h2 style={{ fontSize: 60, color: colors.white }}>📊 모델 평가</h2>
      </div>

      <div style={{ position: "absolute", top: 220, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 50 }}>
        <div style={{ padding: "30px 40px", background: "rgba(59, 130, 246, 0.2)", borderRadius: 20, border: `2px solid ${colors.info}`, textAlign: "center", opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <div style={{ fontSize: 24, color: colors.gray[200], marginBottom: 10 }}>model.eval()</div>
          <div style={{ fontSize: 20, color: colors.info }}>평가 모드 전환</div>
        </div>
        <div style={{ padding: "30px 40px", background: "rgba(16, 185, 129, 0.2)", borderRadius: 20, border: `2px solid ${colors.success}`, textAlign: "center", opacity: interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <div style={{ fontSize: 24, color: colors.gray[200], marginBottom: 10 }}>torch.no_grad()</div>
          <div style={{ fontSize: 20, color: colors.success }}>메모리 절약</div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 400, left: "50%", transform: "translateX(-50%)", textAlign: "center", width: 600 }}>
        <div style={{ fontSize: 32, color: colors.white, marginBottom: 20 }}>테스트 정확도</div>
        <div style={{ height: 40, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 20, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", backgroundColor: colors.success, borderRadius: 20, transition: "width 0.1s" }} />
        </div>
        <div style={{ fontSize: 72, color: colors.success, fontWeight: "bold", marginTop: 20 }}>{progress.toFixed(1)}%</div>
      </div>

      <Audio src={staticFile("audio/lesson-4-1/scene6_eval.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 7: Outro
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const celebrateScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 8 } });

  const items = [
    { icon: "📝", text: "MNIST 데이터셋" },
    { icon: "🧠", text: "MLP 모델 설계" },
    { icon: "🔄", text: "학습 루프 5단계" },
    { icon: "📊", text: "모델 평가" },
  ];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #7c2d12 0%, ${colors.primary} 50%, ${colors.secondary} 100%)` }}>
      <GlobalOverlay />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        <div style={{ fontSize: 120, marginBottom: 20, transform: `scale(${celebrateScale})` }}>🎉</div>
        <h1 style={{ fontSize: 56, color: colors.white, marginBottom: 30, opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          Lesson 4-1 완료!
        </h1>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 30 }}>
          {items.map((item, i) => {
            const opacity = interpolate(frame, [60 + i * 15, 80 + i * 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ padding: "15px 25px", background: "rgba(255,255,255,0.2)", borderRadius: 15, opacity }}>
                <span style={{ fontSize: 24, color: colors.white }}>{item.icon} {item.text}</span>
              </div>
            );
          })}
        </div>

        <div style={{ padding: "20px 40px", background: "rgba(251, 191, 36, 0.3)", borderRadius: 15, border: `2px solid ${colors.accent}`, display: "inline-block", opacity: interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <span style={{ fontSize: 28, color: colors.accent }}>다음: CNN으로 이미지 분류하기! 🖼️</span>
        </div>
      </div>

      <Audio src={staticFile("audio/lesson-4-1/scene7_outro.mp3")} />
    </AbsoluteFill>
  );
};

export const Lesson4_1Video: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <IntroScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.mnist.start} durationInFrames={SCENE_TIMINGS.mnist.duration}>
        <MNISTScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.dataload.start} durationInFrames={SCENE_TIMINGS.dataload.duration}>
        <DataLoadScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.model.start} durationInFrames={SCENE_TIMINGS.model.duration}>
        <ModelScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.training.start} durationInFrames={SCENE_TIMINGS.training.duration}>
        <TrainingScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.eval.start} durationInFrames={SCENE_TIMINGS.eval.duration}>
        <EvalScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export default Lesson4_1Video;
